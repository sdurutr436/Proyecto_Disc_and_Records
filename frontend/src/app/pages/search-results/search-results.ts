import {
  Component,
  OnInit,
  signal,
  computed,
  inject,
  ChangeDetectionStrategy,
  DestroyRef
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router, NavigationExtras } from '@angular/router';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { forkJoin, of, Subject, EMPTY } from 'rxjs';
import { debounceTime, distinctUntilChanged, switchMap, catchError, tap, filter } from 'rxjs/operators';

import { Card } from '../../components/shared/card/card';
import { SearchBar } from '../../components/shared/search-bar/search-bar';
import { Spinner } from '../../components/shared/spinner/spinner';
import { InfiniteScrollComponent } from '../../components/shared/infinite-scroll/infinite-scroll';
import { Tabs, Tab } from '../../components/shared/tabs/tabs';
import { Button } from '../../components/shared/button/button';
import { DeezerService, DeezerAlbum, DeezerArtist } from '../../services/deezer.service';
import { MockDeezerService } from '../../services/mock-deezer.service';
import { DeezerRateLimitService } from '../../services/deezer-rate-limit.service';
import { AlbumNavigationService } from '../../services/album-navigation.service';
import { LucideAngularModule, Disc, Mic } from 'lucide-angular';

// Tipos de filtro disponibles
type FilterType = 'all' | 'albums';

// Interfaz unificada para resultados de búsqueda
interface SearchResultItem {
  id: number | string;
  type: 'album' | 'artist';
  title: string;
  subtitle?: string;
  imageUrl: string;
  rating?: number;
}

// Constantes de paginación
const PAGE_SIZE = 25;
const INITIAL_LOAD = 25;
const SEARCH_LIMIT = 50;
const DEBOUNCE_TIME_MS = 300;
const LOAD_MORE_DELAY_MS = 300;

/**
 * SearchResultsComponent - Página de Resultados de Búsqueda Optimizada
 *
 * CARACTERÍSTICAS:
 * - Búsqueda real contra API de Deezer
 * - Tabs para filtrar por tipo (Todos, Álbumes, Artistas)
 * - Paginación con scroll infinito (25 + 25 items)
 * - ChangeDetectionStrategy.OnPush para rendimiento
 * - Debounce en búsqueda para evitar peticiones excesivas
 * - TrackBy para optimizar renderizado de listas
 */
@Component({
  selector: 'app-search-results',
  standalone: true,
  imports: [
    CommonModule,
    Card,
    SearchBar,
    Spinner,
    InfiniteScrollComponent,
    Tabs,
    Button,
    LucideAngularModule
  ],
  templateUrl: './search-results.html',
  styleUrls: ['./search-results.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export default class SearchResultsComponent implements OnInit {
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private deezerService = inject(DeezerService);
  private mockDeezerService = inject(MockDeezerService);
  private destroyRef = inject(DestroyRef);

  /** Servicio de rate limiting de Deezer */
  rateLimitService = inject(DeezerRateLimitService);

  /** Servicio de navegación de álbumes (Hidratación Anticipada) */
  private albumNavigationService = inject(AlbumNavigationService);

  // Lucide icons
  readonly Disc = Disc;
  readonly Mic = Mic;

  // ==========================================================================
  // ESTADO DE LA PÁGINA
  // ==========================================================================

  /** Término de búsqueda actual */
  searchTerm = signal<string>('');

  /** Filtro activo (tab seleccionado) */
  activeFilter = signal<FilterType>('all');

  /** Estado de carga inicial */
  isLoading = signal<boolean>(false);

  /** Estado de carga de más resultados */
  isLoadingMore = signal<boolean>(false);

  /** Resultados de álbumes (completos para paginación) */
  private allAlbums = signal<SearchResultItem[]>([]);

  /** Resultados de artistas (completos para paginación) */
  private allArtists = signal<SearchResultItem[]>([]);

  /** Offset actual para paginación visual */
  private currentOffset = signal<number>(INITIAL_LOAD);

  /** Offset actual para paginación de API (búsqueda general) */
  private apiOffset = signal<number>(0);

  /** Indica si es búsqueda general (query '*') */
  private isGeneralSearch = signal<boolean>(false);

  /** Indica si hay más resultados disponibles en la API */
  private hasMoreFromApi = signal<boolean>(true);

  /** Último query buscado (para evitar duplicados) */
  private lastSearchedQuery = signal<string>('');

  /** Subject para búsqueda reactiva */
  private searchSubject = new Subject<string>();

  // ==========================================================================
  // TABS CONFIGURATION
  // ==========================================================================

  /** Configuración de pestañas */
  tabs = computed<Tab[]>(() => {
    const counts = this.resultsCount();
    return [
      { id: 'all', label: `Todos (${counts.all})`, icon: 'layout-grid' },
      { id: 'albums', label: `Álbumes (${counts.albums})`, icon: 'disc-3' }
    ];
  });

  // ==========================================================================
  // COMPUTED PROPERTIES
  // ==========================================================================

  /** Todos los resultados combinados */
  private allResults = computed<SearchResultItem[]>(() => {
    return [...this.allAlbums(), ...this.allArtists()];
  });

  /** Resultados visibles según paginación y filtro */
  filteredResults = computed<SearchResultItem[]>(() => {
    const filter = this.activeFilter();
    const offset = this.currentOffset();

    let results: SearchResultItem[];

    switch (filter) {
      case 'albums':
        results = this.allAlbums();
        break;
      default:
        results = this.allResults();
    }

    // Retornar solo los primeros 'offset' items (paginación)
    return results.slice(0, offset);
  });

  /** Conteo de resultados por tipo */
  resultsCount = computed(() => ({
    all: this.allAlbums().length,
    albums: this.allAlbums().length
  }));

  /** ¿Hay más resultados para cargar? */
  hasMore = computed<boolean>(() => {
    const filter = this.activeFilter();
    const offset = this.currentOffset();

    if (this.isGeneralSearch()) {
      const hasLocalMore = offset < this.allAlbums().length;
      return hasLocalMore || this.hasMoreFromApi();
    }

    switch (filter) {
      case 'albums':
        return offset < this.allAlbums().length;
      default:
        return offset < this.allResults().length;
    }
  });

  /** Información de paginación */
  paginationInfo = computed(() => ({
    showing: this.filteredResults().length,
    total: this.resultsCount()[this.activeFilter()],
    hasMore: this.hasMore()
  }));

  // ==========================================================================
  // LIFECYCLE
  // ==========================================================================

  ngOnInit(): void {
    this.setupSearchSubscription();
    this.subscribeToRouteParams();
  }

  /**
   * Configura la suscripción reactiva para búsqueda con debounce
   * Incluye protección contra rate limiting
   */
  private setupSearchSubscription(): void {
    this.searchSubject.pipe(
      debounceTime(DEBOUNCE_TIME_MS),
      distinctUntilChanged(),
      // Filtrar si estamos en cooldown
      filter(() => !this.rateLimitService.isInCooldown()),
      // Filtrar si es la misma query que ya buscamos
      filter(query => query !== this.lastSearchedQuery()),
      tap((query) => {
        this.isLoading.set(true);
        this.resetPagination();
        this.lastSearchedQuery.set(query);
      }),
      switchMap(query => this.executeSearch(query)),
      takeUntilDestroyed(this.destroyRef)
    ).subscribe();
  }

  /**
   * Suscribirse a cambios en query params
   */
  private subscribeToRouteParams(): void {
    this.route.queryParams.pipe(
      takeUntilDestroyed(this.destroyRef)
    ).subscribe(params => {
      const query = params['q'] || '';
      const filter = params['filter'] as FilterType;

      // Si es '*', mostramos "Todos los álbumes" como título
      this.searchTerm.set(query === '*' ? '' : query);

      if (filter && ['albums', 'artists'].includes(filter)) {
        this.activeFilter.set(filter);
      } else {
        this.activeFilter.set('all');
      }

      if (query) {
        this.searchSubject.next(query);
      }
    });
  }

  // ==========================================================================
  // BÚSQUEDA
  // ==========================================================================

  /**
   * Ejecuta búsqueda paralela de álbumes y artistas
   * Si query es '*', carga todos los álbumes del chart con paginación infinita
   * Incluye manejo de rate limiting
   */
  private executeSearch(query: string) {
    if (!query.trim()) {
      this.clearResults();
      return of(null);
    }

    // No buscar si estamos en cooldown
    if (this.rateLimitService.isInCooldown()) {
      this.isLoading.set(false);
      return EMPTY;
    }

    // Búsqueda especial: '*' carga todos los álbumes populares con paginación
    if (query === '*') {
      this.isGeneralSearch.set(true);
      this.apiOffset.set(0);
      this.hasMoreFromApi.set(true);

      return this.deezerService.getChartAlbums(SEARCH_LIMIT, 0).pipe(
        tap((albums) => {
          const mappedAlbums = albums.map(album => this.mapAlbumToResult(album));
          this.allAlbums.set(mappedAlbums);
          this.allArtists.set([]); // No mostramos artistas en modo "todos"
          this.apiOffset.set(SEARCH_LIMIT);
          this.hasMoreFromApi.set(albums.length >= SEARCH_LIMIT);
          this.isLoading.set(false);
        }),
        catchError(() => {
          console.warn('⚠️ Deezer no disponible, usando datos de ejemplo');
          // Fallback a mock data cuando Deezer falla
          return this.mockDeezerService.getChartAlbums(SEARCH_LIMIT).pipe(
            tap((albums) => {
              const mappedAlbums = albums.map(album => this.mapAlbumToResult(album));
              this.allAlbums.set(mappedAlbums);
              this.allArtists.set([]);
              this.hasMoreFromApi.set(false); // Mock no tiene paginación
              this.isLoading.set(false);
            }),
            catchError(() => {
              this.isLoading.set(false);
              return of(null);
            })
          );
        })
      );
    }

    // Búsqueda normal: no es infinita
    this.isGeneralSearch.set(false);
    this.hasMoreFromApi.set(false);

    // Búsqueda paralela: SEARCH_LIMIT álbumes + SEARCH_LIMIT artistas
    return forkJoin({
      albums: this.deezerService.searchAlbums(query, SEARCH_LIMIT).pipe(
        catchError(() => {
          console.warn('⚠️ Deezer searchAlbums falló, usando mock');
          return this.mockDeezerService.searchAlbums(query, SEARCH_LIMIT);
        })
      ),
      artists: this.deezerService.searchArtists(query, SEARCH_LIMIT).pipe(
        catchError(() => {
          console.warn('⚠️ Deezer searchArtists falló, usando mock');
          return this.mockDeezerService.searchArtists(query, SEARCH_LIMIT);
        })
      )
    }).pipe(
      tap(({ albums, artists }) => {
        // Mapear resultados a formato unificado
        const mappedAlbums = albums.map(album => this.mapAlbumToResult(album));
        const mappedArtists = artists.map(artist => this.mapArtistToResult(artist));

        this.allAlbums.set(mappedAlbums);
        this.allArtists.set(mappedArtists);
        this.isLoading.set(false);
      }),
      catchError(error => {
        console.error('Error en búsqueda:', error);
        this.isLoading.set(false);
        return of(null);
      })
    );
  }

  /**
   * Mapea álbum de Deezer a formato de resultado
   * NOTA: No incluimos fans - las métricas vienen del backend propio
   */
  private mapAlbumToResult(album: DeezerAlbum): SearchResultItem {
    return {
      id: album.id,
      type: 'album',
      title: album.title,
      subtitle: album.artist?.name || 'Artista desconocido',
      imageUrl: this.deezerService.getBestAlbumCover(album)
    };
  }

  /**
   * Mapea artista de Deezer a formato de resultado
   * NOTA: No incluimos fans - las métricas vienen del backend propio
   */
  private mapArtistToResult(artist: DeezerArtist): SearchResultItem {
    return {
      id: artist.id,
      type: 'artist',
      title: artist.name,
      subtitle: '',
      imageUrl: this.deezerService.getBestArtistPicture(artist)
    };
  }

  /**
   * Limpia todos los resultados
   */
  private clearResults(): void {
    this.allAlbums.set([]);
    this.allArtists.set([]);
    this.isLoading.set(false);
    this.resetPagination();
    this.isGeneralSearch.set(false);
    this.hasMoreFromApi.set(false);
    this.apiOffset.set(0);
  }

  /**
   * Reinicia la paginación
   */
  private resetPagination(): void {
    this.currentOffset.set(INITIAL_LOAD);
  }

  // ==========================================================================
  // PAGINACIÓN (INFINITE SCROLL)
  // ==========================================================================

  /**
   * Cargar más resultados (scroll infinito)
   * En búsqueda general, carga más desde la API de Deezer
   * Respeta el cooldown de rate limiting
   */
  loadMoreResults(): void {
    // No cargar si estamos en cooldown
    if (this.rateLimitService.isInCooldown()) {
      return;
    }

    if (!this.hasMore() || this.isLoadingMore()) return;

    this.isLoadingMore.set(true);
    const filter = this.activeFilter();

    if (this.isGeneralSearch() && (filter === 'albums' || filter === 'all')) {
      if (this.currentOffset() >= this.allAlbums().length && this.hasMoreFromApi()) {
        this.loadMoreFromApi();
        return;
      }
    }

    setTimeout(() => {
      this.currentOffset.update(offset => offset + PAGE_SIZE);
      this.isLoadingMore.set(false);
    }, LOAD_MORE_DELAY_MS);
  }

  /**
   * Cargar más álbumes desde la API de Deezer (búsqueda general)
   * Incluye manejo de errores de rate limiting
   */
  private loadMoreFromApi(): void {
    // No cargar si estamos en cooldown
    if (this.rateLimitService.isInCooldown()) {
      this.isLoadingMore.set(false);
      return;
    }

    const currentApiOffset = this.apiOffset();

    this.deezerService.getChartAlbums(SEARCH_LIMIT, currentApiOffset).pipe(
      takeUntilDestroyed(this.destroyRef)
    ).subscribe({
      next: (albums) => {
        if (albums.length > 0) {
          const mappedAlbums = albums.map(album => this.mapAlbumToResult(album));
          // Añadir a los álbumes existentes
          this.allAlbums.update(existing => [...existing, ...mappedAlbums]);
          this.apiOffset.update(offset => offset + SEARCH_LIMIT);
          this.hasMoreFromApi.set(albums.length >= SEARCH_LIMIT);
        } else {
          this.hasMoreFromApi.set(false);
        }
        this.currentOffset.update(offset => offset + PAGE_SIZE);
        this.isLoadingMore.set(false);
      },
      error: (error) => {
        console.error('Error cargando más álbumes:', error);
        // Manejar rate limiting
        if (this.rateLimitService.handleRateLimitError(error)) {
          // Parar el scroll infinito durante cooldown
          this.hasMoreFromApi.set(false);
        }
        this.isLoadingMore.set(false);
      }
    });
  }

  // ==========================================================================
  // TABS & FILTROS
  // ==========================================================================

  /**
   * Cambiar tab/filtro activo
   */
  onTabChange(tabId: string | number): void {
    const filter = tabId as FilterType;
    this.activeFilter.set(filter);
    this.resetPagination();

    // Actualizar URL sin recargar
    this.updateQueryParams(filter);
  }

  /**
   * Actualiza query params en la URL
   */
  private updateQueryParams(filter: FilterType): void {
    const extras: NavigationExtras = {
      queryParams: { filter: filter === 'all' ? null : filter },
      queryParamsHandling: 'merge',
      replaceUrl: true
    };
    this.router.navigate([], extras);
  }

  // ==========================================================================
  // BÚSQUEDA DESDE BARRA
  // ==========================================================================

  /**
   * Nueva búsqueda desde la barra de búsqueda
   */
  newSearch(query: string): void {
    if (query.trim()) {
      this.router.navigate(['/search'], {
        queryParams: { q: query },
        queryParamsHandling: 'merge',
        replaceUrl: false
      });
    }
  }

  // ==========================================================================
  // NAVEGACIÓN
  // ==========================================================================

  /**
   * Ver detalle de un resultado.
   *
   * PATRÓN: HIDRATACIÓN ANTICIPADA
   *
   * Para álbumes de Deezer:
   * 1. Llama al AlbumNavigationService
   * 2. El servicio importa el álbum a BD local (si no existe)
   * 3. Navega usando el ID interno (local)
   *
   * Para artistas: navegación directa (TODO: implementar importación de artistas)
   */
  viewResult(result: SearchResultItem): void {
    if (result.type === 'album') {
      // Usar el servicio de navegación para manejar la importación
      // Los resultados de búsqueda siempre vienen de Deezer
      this.albumNavigationService.navigateToAlbum(String(result.id), 'deezer')
        .subscribe({
          error: (err) => console.error('Error navegando a álbum:', err)
        });
    } else {
      // Artistas: navegación directa por ahora
      const extras: NavigationExtras = {
        state: {
          fromSearch: true,
          searchTerm: this.searchTerm()
        }
      };
      this.router.navigate(['/artist', result.id], extras);
    }
  }

  /**
   * Getter para exponer el estado de importación en la UI
   */
  get isImporting(): boolean {
    return this.albumNavigationService.isImporting();
  }

  /**
   * Getter para el ID del álbum que se está importando
   */
  get importingAlbumId(): string | null {
    return this.albumNavigationService.importingAlbumId();
  }

  /**
   * Volver a la página anterior
   */
  goBack(): void {
    this.router.navigate(['/']);
  }

  // ==========================================================================
  // TRACKBY (OPTIMIZACIÓN)
  // ==========================================================================

  /**
   * TrackBy para lista de resultados
   */
  trackByResultId(index: number, result: SearchResultItem): string {
    return `${result.type}-${result.id}`;
  }

  // ==========================================================================
  // HELPERS
  // ==========================================================================

  /**
   * Obtiene el icono Lucide según el tipo
   */
  getResultIcon(type: string): any {
    return type === 'album' ? this.Disc : this.Mic;
  }

  /**
   * Obtiene el fallback emoji según el tipo
   */
  getResultIconFallback(type: string): string {
    return type === 'album' ? '💿' : '🎤';
  }

  /**
   * Obtiene el label del tipo
   */
  getResultTypeLabel(type: string): string {
    return type === 'album' ? 'Álbum' : 'Artista';
  }
}
