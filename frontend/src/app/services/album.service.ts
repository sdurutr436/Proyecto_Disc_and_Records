import { Injectable, inject } from '@angular/core';
import { Observable, of, throwError } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { Album, Track, Review, AlbumResponse, AlbumStats, AlbumImportResponse, mapAlbumResponseToLegacy } from '../models/data.models';
import { BaseHttpService } from './base-http.service';
import { API_CONFIG, API_ENDPOINTS } from '../config/api.config';
import { DeezerService, DeezerAlbum } from './deezer.service';
import { MockDeezerService } from './mock-deezer.service';
import { environment } from '../../environments/environment';

/**
 * AlbumService - Servicio de gestión de álbumes
 *
 * ARQUITECTURA: HIDRATACIÓN ANTICIPADA (Eager Hydration)
 *
 * CAMBIO DE PARADIGMA:
 * - ANTES: Deezer proxy para todo, datos efímeros
 * - AHORA: Deezer solo para búsqueda, BD local para persistencia
 *
 * FLUJO NUEVO:
 * 1. Búsqueda → Deezer API (datos efímeros, IDs de Deezer)
 * 2. Clic en Card → importFromDeezer() → BD local (ID interno)
 * 3. Vista Detalle → getAlbumByIdLocal() → BD local (NUNCA Deezer)
 * 4. Añadir a Lista → Ya existe en BD, solo crear relación
 *
 * El "puente" es el método importFromDeezer() que:
 * - Verifica si el álbum existe en BD local
 * - Si no existe, lo importa de Deezer
 * - Devuelve siempre un álbum con ID interno
 */
@Injectable({
  providedIn: 'root'
})
export class AlbumService extends BaseHttpService {
  private deezer = inject(DeezerService);
  private mockDeezer = inject(MockDeezerService);

  private get useMock(): boolean {
    return environment.useMockData;
  }

  // ==========================================================================
  // IMPORTACIÓN DESDE DEEZER (HIDRATACIÓN ANTICIPADA)
  // ==========================================================================

  /**
   * Importa un álbum de Deezer a la BD local o recupera el existente.
   *
   * ESTE ES EL MÉTODO CLAVE DEL PATRÓN DE HIDRATACIÓN ANTICIPADA.
   *
   * Se llama cuando el usuario hace clic en una card de búsqueda.
   * El backend verifica si el álbum existe y lo importa si es necesario.
   *
   * @param deezerId ID del álbum en Deezer (ej: "302127")
   * @returns Album con ID interno para navegación a /album/{id_local}
   */
  importFromDeezer(deezerId: string): Observable<Album> {
    if (this.useMock) {
      // En modo mock, simular importación con datos locales
      return this.mockDeezer.getAlbumById(deezerId).pipe(
        map(album => album ? this.mapDeezerAlbumToAlbum(album) : null),
        map(album => {
          if (!album) {
            throw new Error('Álbum no encontrado en mock');
          }
          return album;
        })
      );
    }

    const url = `${API_CONFIG.baseUrl}${API_ENDPOINTS.albumes.importFromDeezer(deezerId)}`;

    return this.get<AlbumResponse>(url).pipe(
      tap(response => {
        console.log(`✅ Álbum importado/recuperado: ID local ${response.id} (Deezer: ${deezerId})`);
      }),
      map(response => mapAlbumResponseToLegacy(response)),
      catchError(error => {
        console.error('❌ Error importando álbum de Deezer:', error);

        // Manejar errores específicos
        if (error.status === 503) {
          // Deezer rate limit o no disponible
          throw new Error('Deezer no responde temporalmente. Por favor, intenta más tarde.');
        }
        if (error.status === 400) {
          throw new Error('ID de álbum inválido');
        }

        throw error;
      })
    );
  }

  /**
   * Obtiene un álbum de la BD LOCAL por su ID interno.
   *
   * IMPORTANTE: Este método SOLO consulta la BD local.
   * Para álbumes de Deezer, usar importFromDeezer() primero.
   *
   * @param id ID interno del álbum (número)
   * @returns Album local o null si no existe
   */
  getAlbumByIdLocal(id: number): Observable<Album | null> {
    if (this.useMock) {
      return this.mockDeezer.getAlbumById(String(id)).pipe(
        map(album => album ? this.mapDeezerAlbumToAlbum(album) : null)
      );
    }

    return this.get<AlbumResponse>(`${API_CONFIG.baseUrl}${API_ENDPOINTS.albumes.getById(id)}`).pipe(
      map(response => mapAlbumResponseToLegacy(response)),
      catchError(error => {
        if (error.status === 404) {
          return of(null);
        }
        return throwError(() => error);
      })
    );
  }

  // ==========================================================================
  // MÉTODOS PRINCIPALES - DEEZER + BACKEND (o MOCK)
  // ==========================================================================

  /**
   * Obtiene 50 álbumes populares de Deezer (Charts) o mock
   * Con fallback automático a mock si Deezer falla
   */
  getNewReleases(): Observable<Album[]> {
    if (this.useMock) {
      return this.mockDeezer.getChartAlbums(50).pipe(
        map(albums => albums.map(da => this.mapDeezerAlbumToAlbum(da)))
      );
    }
    return this.deezer.getChartAlbums(50).pipe(
      map(deezerAlbums => deezerAlbums.map(da => this.mapDeezerAlbumToAlbum(da))),
      catchError(error => {
        console.warn('⚠️ Deezer no disponible, usando datos de ejemplo:', error?.message || error);
        // Fallback a mock data cuando Deezer falla
        return this.mockDeezer.getChartAlbums(50).pipe(
          map(albums => albums.map(da => this.mapDeezerAlbumToAlbum(da)))
        );
      })
    );
  }

  /**
   * Obtiene un álbum por su ID (compatibilidad legacy)
   * @deprecated Usar getAlbumByIdLocal() o importFromDeezer() según contexto
   */
  getAlbumById(id: string): Observable<Album | null> {
    if (this.useMock) {
      return this.mockDeezer.getAlbumById(id).pipe(
        map(album => album ? this.mapDeezerAlbumToAlbum(album) : null)
      );
    }
    return this.deezer.getAlbumById(id).pipe(
      map(deezerAlbum => deezerAlbum ? this.mapDeezerAlbumToAlbum(deezerAlbum) : null),
      catchError(() => this.getAlbumByIdBackend(id))
    );
  }

  /**
   * Busca álbumes por término
   */
  searchAlbums(query: string): Observable<Album[]> {
    if (this.useMock) {
      return this.mockDeezer.searchAlbums(query, 25).pipe(
        map(albums => albums.map(da => this.mapDeezerAlbumToAlbum(da)))
      );
    }
    return this.deezer.searchAlbums(query, 25).pipe(
      map(deezerAlbums => deezerAlbums.map(da => this.mapDeezerAlbumToAlbum(da))),
      catchError(() => of([]))
    );
  }

  /**
   * Obtiene las canciones de un álbum
   */
  getAlbumTracks(albumId: string): Observable<Track[]> {
    const source = this.useMock ? this.mockDeezer : this.deezer;
    return source.getAlbumTracks(albumId).pipe(
      map(tracks => tracks.map((t, index) => ({
        id: String(t.id),
        number: t.track_position || index + 1,
        title: t.title,
        duration: source.formatDuration(t.duration)
      }))),
      catchError(() => of([]))
    );
  }

  /**
   * Obtiene las reseñas de un álbum desde el backend o mock
   */
  getAlbumReviews(albumId: string): Observable<Review[]> {
    if (this.useMock) {
      return this.mockDeezer.getAlbumReviews(albumId);
    }
    return this.getAlbumReviewsBackend(albumId);
  }

  /**
   * Obtiene las estadísticas de un álbum desde el backend o mock
   * (reviewCount, ratingCount, averageRating, listenedCount)
   *
   * Estas métricas vienen del backend propio, NO de Deezer.
   */
  getAlbumStats(albumId: string): Observable<AlbumStats> {
    if (this.useMock) {
      return this.mockDeezer.getAlbumStats(albumId);
    }
    const numericId = parseInt(albumId, 10);
    if (isNaN(numericId)) {
      return of({ reviewCount: 0, ratingCount: 0, averageRating: null, listenedCount: 0 });
    }

    return this.get<AlbumStats>(`${API_CONFIG.baseUrl}/albumes/${numericId}/stats`).pipe(
      catchError(() => of({ reviewCount: 0, ratingCount: 0, averageRating: null, listenedCount: 0 }))
    );
  }

  /**
   * Obtiene todos los álbumes (para admin/listados)
   */
  getAllAlbums(): Observable<Album[]> {
    return this.getNewReleases();
  }

  // ==========================================================================
  // MÉTODOS DE BACKEND (API propia)
  // ==========================================================================

  /**
   * Obtiene un álbum del backend por ID
   */
  private getAlbumByIdBackend(id: string): Observable<Album | null> {
    const numericId = parseInt(id, 10);
    if (isNaN(numericId)) {
      return of(null);
    }

    return this.get<AlbumResponse>(`${API_CONFIG.baseUrl}${API_ENDPOINTS.albumes.getById(numericId)}`).pipe(
      map(response => mapAlbumResponseToLegacy(response)),
      catchError(error => {
        if (error.status === 404) {
          return of(null);
        }
        return throwError(() => error);
      })
    );
  }

  /**
   * Obtiene reseñas del backend
   */
  private getAlbumReviewsBackend(albumId: string): Observable<Review[]> {
    const numericId = parseInt(albumId, 10);
    if (isNaN(numericId)) {
      return of([]);
    }

    return this.get<any[]>(`${API_CONFIG.baseUrl}${API_ENDPOINTS.resenas.albumesByAlbum(numericId)}`).pipe(
      map(resenas => resenas.map(r => ({
        id: `${r.usuarioId}-${r.albumId}`,
        userId: String(r.usuarioId),
        userName: r.nombreUsuario,
        userAvatar: r.avatarUsuario || 'assets/profile-placeholder.svg',
        rating: r.puntuacion,
        content: r.textoResena,
        date: new Date(r.fechaResena),
        likes: 0
      }))),
      catchError(() => of([]))
    );
  }

  // ==========================================================================
  // MAPEO DEEZER → MODELO FRONTEND
  // ==========================================================================

  /**
   * Convierte un álbum de Deezer al modelo Album del frontend
   *
   * NOTA: averageRating y totalReviews se inicializan a 0.
   * Estas métricas deben obtenerse del endpoint /api/albumes/{id}/stats
   * del backend propio, NO de Deezer (fans no es lo mismo que reviews).
   */
  private mapDeezerAlbumToAlbum(deezerAlbum: DeezerAlbum): Album {
    const source = this.useMock ? this.mockDeezer : this.deezer;

    // Intentar obtener género de genres.data, si no existe, usar genre_id
    let genre = deezerAlbum.genres?.data?.[0]?.name || '';
    if (!genre && deezerAlbum.genre_id) {
      genre = DeezerService.getGenreName(deezerAlbum.genre_id);
    }

    return {
      id: String(deezerAlbum.id),
      title: deezerAlbum.title,
      artist: deezerAlbum.artist?.name || 'Artista Desconocido',
      artistId: String(deezerAlbum.artist?.id || ''),
      coverUrl: source.getBestAlbumCover(deezerAlbum),
      releaseYear: source.extractYear(deezerAlbum.release_date),
      genre: genre,
      tracks: deezerAlbum.nb_tracks || 0,
      duration: '',
      label: deezerAlbum.label || '',
      description: '',
      averageRating: 0, // Se obtiene de /api/albumes/{id}/stats
      totalReviews: 0   // Se obtiene de /api/albumes/{id}/stats
    };
  }

  // ==========================================================================
  // OPERACIONES CRUD (Backend)
  // ==========================================================================

  /**
   * Crea un nuevo álbum en el backend
   */
  createAlbum(album: Omit<Album, 'id'>): Observable<Album> {
    const dto = {
      tituloAlbum: album.title,
      anioSalida: album.releaseYear,
      portadaUrl: album.coverUrl,
      idArtista: parseInt(album.artistId, 10) || 1
    };

    return this.post<AlbumResponse>(`${API_CONFIG.baseUrl}${API_ENDPOINTS.albumes.create}`, dto).pipe(
      map(response => mapAlbumResponseToLegacy(response))
    );
  }

  /**
   * Actualiza un álbum existente
   */
  updateAlbum(id: string, album: Album): Observable<Album> {
    const numericId = parseInt(id, 10);
    const dto = {
      tituloAlbum: album.title,
      anioSalida: album.releaseYear,
      portadaUrl: album.coverUrl,
      idArtista: parseInt(album.artistId, 10) || 1
    };

    return this.put<AlbumResponse>(`${API_CONFIG.baseUrl}${API_ENDPOINTS.albumes.update(numericId)}`, dto).pipe(
      map(response => mapAlbumResponseToLegacy(response))
    );
  }

  /**
   * Elimina un álbum
   */
  deleteAlbum(id: string): Observable<void> {
    const numericId = parseInt(id, 10);
    return this.delete<void>(`${API_CONFIG.baseUrl}${API_ENDPOINTS.albumes.delete(numericId)}`);
  }
}
