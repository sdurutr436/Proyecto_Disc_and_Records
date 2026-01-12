import { Injectable, signal, computed, inject, DestroyRef } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { Observable, BehaviorSubject, Subject, debounceTime, distinctUntilChanged, switchMap, tap, catchError, of, finalize, map } from 'rxjs';
import { Album, AlbumResponse, PageResponse } from '../models/data.models';
import { BaseHttpService } from './base-http.service';
import { API_ENDPOINTS } from '../config/api.config';
import { NotificationStreamService } from './notification-stream';
import { EventBusService, EventType } from './event-bus';

/**
 * Estado de paginación
 */
export interface PaginationState {
  page: number;
  size: number;
  totalElements: number;
  totalPages: number;
  isFirst: boolean;
  isLast: boolean;
}

/**
 * Filtros de búsqueda para álbumes
 */
export interface AlbumFilters {
  search: string;
  genre?: string;
  year?: number;
  sortBy: 'id' | 'tituloAlbum' | 'anioSalida' | 'puntuacionMedia';
  sortDir: 'asc' | 'desc';
}

/**
 * AlbumStateService - Servicio de Estado Reactivo para Álbumes
 *
 * PROPÓSITO:
 * - Centralizar el estado de álbumes con Angular Signals (moderno)
 * - Actualización automática sin recargas de página
 * - Paginación y scroll infinito
 * - Caché inteligente de datos
 * - Sincronización tras operaciones CRUD
 *
 * BACKEND ENDPOINTS:
 * - GET /api/albumes - Lista todos
 * - GET /api/albumes/paginado - Lista paginada
 * - GET /api/albumes/{id} - Obtener por ID
 * - GET /api/albumes/buscar?titulo=xxx - Buscar por título
 * - POST /api/albumes - Crear (ADMIN/MODERATOR)
 * - PUT /api/albumes/{id} - Actualizar (ADMIN/MODERATOR)
 * - DELETE /api/albumes/{id} - Eliminar (ADMIN)
 *
 * PATRÓN: Signals + BehaviorSubject híbrido
 * - Signals: Para estado sincrónico y computed values
 * - BehaviorSubject: Para triggers de búsqueda con debounce
 */
@Injectable({
  providedIn: 'root'
})
export class AlbumStateService extends BaseHttpService {
  private destroyRef = inject(DestroyRef);
  private notifications = inject(NotificationStreamService);
  private eventBus = inject(EventBusService);

  // ==========================================================================
  // ESTADO PRINCIPAL (Signals)
  // ==========================================================================

  /** Lista de álbumes cargados (acumulativo para infinite scroll) */
  private _albums = signal<Album[]>([]);
  readonly albums = this._albums.asReadonly();

  /** Álbum actualmente seleccionado/visualizado */
  private _selectedAlbum = signal<Album | null>(null);
  readonly selectedAlbum = this._selectedAlbum.asReadonly();

  /** Estado de carga */
  private _isLoading = signal<boolean>(false);
  readonly isLoading = this._isLoading.asReadonly();

  /** Estado de carga para más datos (infinite scroll) */
  private _isLoadingMore = signal<boolean>(false);
  readonly isLoadingMore = this._isLoadingMore.asReadonly();

  /** Error actual */
  private _error = signal<string | null>(null);
  readonly error = this._error.asReadonly();

  /** Estado de paginación */
  private _pagination = signal<PaginationState>({
    page: 0,
    size: 12,
    totalElements: 0,
    totalPages: 0,
    isFirst: true,
    isLast: true
  });
  readonly pagination = this._pagination.asReadonly();

  /** Filtros actuales */
  private _filters = signal<AlbumFilters>({
    search: '',
    sortBy: 'id',
    sortDir: 'asc'
  });
  readonly filters = this._filters.asReadonly();

  // ==========================================================================
  // COMPUTED SIGNALS
  // ==========================================================================

  /** Indica si hay más páginas disponibles */
  readonly hasMore = computed(() => !this._pagination().isLast);

  /** Número total de álbumes */
  readonly totalAlbums = computed(() => this._pagination().totalElements);

  /** Indica si la lista está vacía */
  readonly isEmpty = computed(() =>
    !this._isLoading() && this._albums().length === 0
  );

  /** Álbumes filtrados por búsqueda local (para filtrado rápido) */
  readonly filteredAlbums = computed(() => {
    const albums = this._albums();
    const search = this._filters().search.toLowerCase();

    if (!search) return albums;

    return albums.filter(album =>
      album.title.toLowerCase().includes(search) ||
      album.artist.toLowerCase().includes(search)
    );
  });

  // ==========================================================================
  // BÚSQUEDA CON DEBOUNCE (BehaviorSubject)
  // ==========================================================================

  /** Subject para trigger de búsqueda con debounce */
  private searchTrigger$ = new BehaviorSubject<string>('');

  /** Subject para trigger de carga de más datos */
  private loadMoreTrigger$ = new Subject<void>();

  constructor() {
    super();
    this.setupSearchSubscription();
    this.setupLoadMoreSubscription();
    this.setupEventListeners();
  }

  /**
   * Configura la suscripción de búsqueda con debounce
   */
  private setupSearchSubscription(): void {
    this.searchTrigger$.pipe(
      debounceTime(300), // Espera 300ms después del último input
      distinctUntilChanged(), // Solo si el valor cambió
      tap(query => {
        this._filters.update(f => ({ ...f, search: query }));
        this._isLoading.set(true);
        this._error.set(null);
        // Reset de paginación en nueva búsqueda
        this._pagination.update(p => ({ ...p, page: 0 }));
        this._albums.set([]); // Limpiar resultados anteriores
      }),
      switchMap(query => this.fetchAlbums(query, 0)),
      takeUntilDestroyed(this.destroyRef)
    ).subscribe({
      next: (response) => this.handleAlbumsResponse(response, false),
      error: (err) => this.handleFetchError(err)
    });
  }

  /**
   * Configura la suscripción para cargar más datos (infinite scroll)
   */
  private setupLoadMoreSubscription(): void {
    this.loadMoreTrigger$.pipe(
      tap(() => this._isLoadingMore.set(true)),
      switchMap(() => {
        const nextPage = this._pagination().page + 1;
        return this.fetchAlbums(this._filters().search, nextPage);
      }),
      takeUntilDestroyed(this.destroyRef)
    ).subscribe({
      next: (response) => this.handleAlbumsResponse(response, true),
      error: (err) => this.handleFetchError(err)
    });
  }

  /**
   * Escucha eventos del EventBus para sincronizar estado
   */
  private setupEventListeners(): void {
    // Actualizar cuando se añade/quita de favoritos
    this.eventBus.on<{ albumId: string }>(EventType.ALBUM_ADDED_TO_FAVORITES)
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe();

    this.eventBus.on<{ albumId: string }>(EventType.ALBUM_REMOVED_FROM_FAVORITES)
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe();
  }

  // ==========================================================================
  // MÉTODOS PÚBLICOS - LECTURA
  // ==========================================================================

  /**
   * Buscar álbumes con debounce automático
   * @param query - Término de búsqueda
   */
  search(query: string): void {
    this.searchTrigger$.next(query);
  }

  /**
   * Cargar más álbumes (infinite scroll)
   * Solo carga si hay más páginas y no está cargando
   */
  loadMore(): void {
    if (this.hasMore() && !this._isLoadingMore() && !this._isLoading()) {
      this.loadMoreTrigger$.next();
    }
  }

  /**
   * Recargar lista completa (mantiene filtros actuales)
   */
  refresh(): void {
    this._albums.set([]);
    this._pagination.update(p => ({ ...p, page: 0 }));
    this.searchTrigger$.next(this._filters().search);
  }

  /**
   * Obtener un álbum por ID
   * Primero busca en caché, luego en servidor
   */
  getById(id: string): Observable<Album | null> {
    // Buscar en caché primero
    const cached = this._albums().find(a => a.id === id);
    if (cached) {
      this._selectedAlbum.set(cached);
      return of(cached);
    }

    // Si no está en caché, obtener del servidor
    return this.get<Album>(API_ENDPOINTS.albums.getById(id)).pipe(
      tap(album => {
        if (album) {
          this._selectedAlbum.set(album);
          // Añadir a caché si no existe
          this._albums.update(albums => {
            if (!albums.find(a => a.id === id)) {
              return [...albums, album];
            }
            return albums;
          });
        }
      }),
      catchError(err => {
        this._error.set('Error al cargar el álbum');
        return of(null);
      })
    );
  }

  /**
   * Actualizar filtros de ordenación
   */
  updateSort(sortBy: AlbumFilters['sortBy'], sortDir: AlbumFilters['sortDir']): void {
    this._filters.update(f => ({ ...f, sortBy, sortDir }));
    this.refresh();
  }

  /**
   * Limpiar búsqueda y filtros
   */
  clearFilters(): void {
    this._filters.set({
      search: '',
      sortBy: 'id',
      sortDir: 'asc'
    });
    this.refresh();
  }

  // ==========================================================================
  // MÉTODOS PÚBLICOS - CRUD (Actualizan estado automáticamente)
  // ==========================================================================

  /**
   * Crear un nuevo álbum
   * Actualiza la lista automáticamente tras éxito
   */
  create(albumData: Partial<Album>): Observable<Album> {
    return this.post<Album>(API_ENDPOINTS.albums.create, albumData).pipe(
      tap(createdAlbum => {
        // Añadir a la lista al inicio
        this._albums.update(albums => [createdAlbum, ...albums]);
        // Actualizar contadores
        this._pagination.update(p => ({
          ...p,
          totalElements: p.totalElements + 1
        }));
        // Notificar éxito
        this.notifications.success('Álbum creado', `"${createdAlbum.title}" añadido correctamente`);
        // Emitir evento
        this.eventBus.emit({ type: EventType.ALBUM_RATED, payload: { album: createdAlbum } });
      }),
      catchError(err => {
        this.notifications.error('Error', 'No se pudo crear el álbum');
        throw err;
      })
    );
  }

  /**
   * Actualizar un álbum existente
   * Actualiza la lista automáticamente tras éxito
   */
  update(id: string, albumData: Partial<Album>): Observable<Album> {
    return this.put<Album>(API_ENDPOINTS.albums.update(id), albumData).pipe(
      tap(updatedAlbum => {
        // Actualizar en la lista
        this._albums.update(albums =>
          albums.map(a => a.id === id ? { ...a, ...updatedAlbum } : a)
        );
        // Actualizar seleccionado si aplica
        if (this._selectedAlbum()?.id === id) {
          this._selectedAlbum.set(updatedAlbum);
        }
        this.notifications.success('Álbum actualizado', `"${updatedAlbum.title}" modificado correctamente`);
      }),
      catchError(err => {
        this.notifications.error('Error', 'No se pudo actualizar el álbum');
        throw err;
      })
    );
  }

  /**
   * Eliminar un álbum
   * Actualiza la lista automáticamente tras éxito
   */
  deleteAlbum(id: string): Observable<void> {
    const albumToDelete = this._albums().find(a => a.id === id);

    return this.http.delete<void>(this.buildUrl(API_ENDPOINTS.albumes.delete(parseInt(id)))).pipe(
      tap(() => {
        // Remover de la lista
        this._albums.update(albums => albums.filter(a => a.id !== id));
        // Actualizar contadores
        this._pagination.update(p => ({
          ...p,
          totalElements: Math.max(0, p.totalElements - 1)
        }));
        // Limpiar seleccionado si aplica
        if (this._selectedAlbum()?.id === id) {
          this._selectedAlbum.set(null);
        }
        this.notifications.success('Álbum eliminado',
          albumToDelete ? `"${albumToDelete.title}" eliminado` : 'Álbum eliminado correctamente'
        );
      }),
      catchError(err => {
        this.notifications.error('Error', 'No se pudo eliminar el álbum');
        throw err;
      })
    );
  }

  // ==========================================================================
  // MÉTODOS PRIVADOS
  // ==========================================================================

  /**
   * Fetch de álbumes desde el backend con paginación
   *
   * Backend endpoint: GET /api/albumes/paginado
   * Params: page, size, sortBy, sortDir
   * Response: PageResponseDTO<AlbumResponseDTO>
   */
  private fetchAlbums(query: string, page: number): Observable<PageResponse<AlbumResponse>> {
    const { size, sortBy, sortDir } = {
      size: this._pagination().size,
      sortBy: this._filters().sortBy,
      sortDir: this._filters().sortDir
    };

    const params: Record<string, string | number> = {
      page,
      size,
      sortBy,
      sortDir
    };

    // Si hay búsqueda, usar endpoint de búsqueda
    if (query && query.trim()) {
      return this.get<AlbumResponse[]>(API_ENDPOINTS.albumes.buscar, {
        params: { titulo: query }
      }).pipe(
        map(albums => ({
          content: albums,
          page: 0,
          size: albums.length,
          totalElements: albums.length,
          totalPages: 1,
          first: true,
          last: true
        })),
        catchError(err => {
          console.warn('Error en búsqueda, usando datos mock:', err);
          return of(this.getMockPageResponse(page, size));
        }),
        finalize(() => {
          this._isLoading.set(false);
          this._isLoadingMore.set(false);
        })
      );
    }

    // Sin búsqueda, usar endpoint paginado
    return this.get<PageResponse<AlbumResponse>>(API_ENDPOINTS.albumes.getPaginado, { params }).pipe(
      catchError(err => {
        console.warn('Backend no disponible, usando datos mock:', err);
        return of(this.getMockPageResponse(page, size));
      }),
      finalize(() => {
        this._isLoading.set(false);
        this._isLoadingMore.set(false);
      })
    );
  }

  /**
   * Procesa la respuesta de álbumes
   */
  private handleAlbumsResponse(response: PageResponse<AlbumResponse>, append: boolean): void {
    // Mapear respuesta del backend a modelo frontend
    const albums = response.content.map(album => this.mapBackendToFrontend(album));

    if (append) {
      // Añadir a lista existente (infinite scroll)
      this._albums.update(current => [...current, ...albums]);
    } else {
      // Reemplazar lista (nueva búsqueda)
      this._albums.set(albums);
    }

    // Actualizar paginación
    this._pagination.set({
      page: response.page,
      size: response.size,
      totalElements: response.totalElements,
      totalPages: response.totalPages,
      isFirst: response.first,
      isLast: response.last
    });

    this._isLoading.set(false);
    this._isLoadingMore.set(false);
  }

  /**
   * Mapea respuesta del backend (AlbumResponseDTO) al modelo del frontend
   *
   * Backend DTO:
   * - id: Long
   * - tituloAlbum: String
   * - anioSalida: Integer
   * - portadaUrl: String
   * - puntuacionMedia: BigDecimal
   * - artista: ArtistaResponseDTO (id, nombreArtista, puntuacionMedia)
   */
  private mapBackendToFrontend(backendAlbum: AlbumResponse): Album {
    return {
      id: String(backendAlbum.id),
      title: backendAlbum.tituloAlbum,
      artist: backendAlbum.artista?.nombreArtista || 'Artista desconocido',
      artistId: String(backendAlbum.artista?.id || 0),
      coverUrl: backendAlbum.portadaUrl || 'https://picsum.photos/seed/album' + backendAlbum.id + '/400/400',
      releaseYear: backendAlbum.anioSalida,
      genre: '', // No disponible en DTO actual - añadir endpoint si necesario
      tracks: 0, // No disponible en DTO actual
      duration: '', // No disponible en DTO actual
      label: '', // No disponible en DTO actual
      description: '', // No disponible en DTO actual
      averageRating: backendAlbum.puntuacionMedia ?? 0,
      totalReviews: 0 // No disponible en DTO actual - añadir a endpoint
    };
  }

  /**
   * Maneja errores de peticiones (uso interno)
   */
  private handleFetchError(err: any): void {
    console.error('AlbumStateService error:', err);
    this._error.set('Error al cargar los álbumes');
    this._isLoading.set(false);
    this._isLoadingMore.set(false);
    this.notifications.error('Error', 'No se pudieron cargar los álbumes');
  }

  /**
   * Genera respuesta mock para desarrollo (simula respuesta del backend)
   */
  private getMockPageResponse(page: number, size: number): PageResponse<AlbumResponse> {
    // Mock albums en formato backend
    const mockAlbumsBackend: AlbumResponse[] = [
      {
        id: 1,
        tituloAlbum: 'The Dark Side of the Moon',
        anioSalida: 1973,
        portadaUrl: 'https://picsum.photos/seed/album1/400/400',
        puntuacionMedia: 4.8,
        artista: { id: 1, nombreArtista: 'Pink Floyd', puntuacionMedia: 4.7 }
      },
      {
        id: 2,
        tituloAlbum: 'Abbey Road',
        anioSalida: 1969,
        portadaUrl: 'https://picsum.photos/seed/album2/400/400',
        puntuacionMedia: 4.9,
        artista: { id: 2, nombreArtista: 'The Beatles', puntuacionMedia: 4.8 }
      },
      {
        id: 3,
        tituloAlbum: 'Thriller',
        anioSalida: 1982,
        portadaUrl: 'https://picsum.photos/seed/album3/400/400',
        puntuacionMedia: 4.7,
        artista: { id: 3, nombreArtista: 'Michael Jackson', puntuacionMedia: 4.6 }
      },
      {
        id: 4,
        tituloAlbum: 'Rumours',
        anioSalida: 1977,
        portadaUrl: 'https://picsum.photos/seed/album4/400/400',
        puntuacionMedia: 4.6,
        artista: { id: 4, nombreArtista: 'Fleetwood Mac', puntuacionMedia: 4.5 }
      },
      {
        id: 5,
        tituloAlbum: 'Back in Black',
        anioSalida: 1980,
        portadaUrl: 'https://picsum.photos/seed/album5/400/400',
        puntuacionMedia: 4.5,
        artista: { id: 5, nombreArtista: 'AC/DC', puntuacionMedia: 4.4 }
      },
      {
        id: 6,
        tituloAlbum: 'Nevermind',
        anioSalida: 1991,
        portadaUrl: 'https://picsum.photos/seed/album6/400/400',
        puntuacionMedia: 4.7,
        artista: { id: 6, nombreArtista: 'Nirvana', puntuacionMedia: 4.6 }
      }
    ];

    const startIndex = page * size;
    const endIndex = Math.min(startIndex + size, mockAlbumsBackend.length);
    const content = mockAlbumsBackend.slice(startIndex, endIndex);

    return {
      content,
      page,
      size,
      totalElements: mockAlbumsBackend.length,
      totalPages: Math.ceil(mockAlbumsBackend.length / size),
      first: page === 0,
      last: endIndex >= mockAlbumsBackend.length
    };
  }
}
