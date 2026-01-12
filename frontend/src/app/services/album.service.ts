import { Injectable, inject } from '@angular/core';
import { Observable, of, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { Album, Track, Review, AlbumResponse, mapAlbumResponseToLegacy } from '../models/data.models';
import { BaseHttpService } from './base-http.service';
import { API_CONFIG, API_ENDPOINTS } from '../config/api.config';
import { DeezerService, DeezerAlbum } from './deezer.service';

/**
 * AlbumService - Servicio de gestión de álbumes
 *
 * ARQUITECTURA HÍBRIDA:
 * - Datos de Deezer para contenido real (álbumes, artistas, canciones)
 * - Backend propio para datos de usuario (reseñas, ratings, etc.)
 *
 * FLUJO DE DATOS:
 * 1. Deezer API → Datos de álbumes reales (imágenes, artistas, tracks)
 * 2. Backend API → Reseñas, puntuaciones de usuarios, favoritos
 * 3. Frontend → Combina ambas fuentes para la UI
 */
@Injectable({
  providedIn: 'root'
})
export class AlbumService extends BaseHttpService {
  private deezer = inject(DeezerService);

  // ==========================================================================
  // MÉTODOS PRINCIPALES - DEEZER + BACKEND
  // ==========================================================================

  /**
   * Obtiene 50 álbumes populares de Deezer (Charts)
   */
  getNewReleases(): Observable<Album[]> {
    return this.deezer.getChartAlbums(50).pipe(
      map(deezerAlbums => deezerAlbums.map(da => this.mapDeezerAlbumToAlbum(da))),
      catchError(error => {
        console.error('Error obteniendo álbumes de Deezer:', error);
        return of([]);
      })
    );
  }

  /**
   * Obtiene un álbum por su ID
   */
  getAlbumById(id: string): Observable<Album | null> {
    return this.deezer.getAlbumById(id).pipe(
      map(deezerAlbum => deezerAlbum ? this.mapDeezerAlbumToAlbum(deezerAlbum) : null),
      catchError(() => this.getAlbumByIdBackend(id))
    );
  }

  /**
   * Busca álbumes por término
   */
  searchAlbums(query: string): Observable<Album[]> {
    return this.deezer.searchAlbums(query, 25).pipe(
      map(deezerAlbums => deezerAlbums.map(da => this.mapDeezerAlbumToAlbum(da))),
      catchError(() => of([]))
    );
  }

  /**
   * Obtiene las canciones de un álbum de Deezer
   */
  getAlbumTracks(albumId: string): Observable<Track[]> {
    return this.deezer.getAlbumTracks(albumId).pipe(
      map(tracks => tracks.map((t, index) => ({
        id: String(t.id),
        number: t.track_position || index + 1,
        title: t.title,
        duration: this.deezer.formatDuration(t.duration)
      }))),
      catchError(() => of([]))
    );
  }

  /**
   * Obtiene las reseñas de un álbum desde el backend
   */
  getAlbumReviews(albumId: string): Observable<Review[]> {
    return this.getAlbumReviewsBackend(albumId);
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
   */
  private mapDeezerAlbumToAlbum(deezerAlbum: DeezerAlbum): Album {
    return {
      id: String(deezerAlbum.id),
      title: deezerAlbum.title,
      artist: deezerAlbum.artist?.name || 'Artista Desconocido',
      artistId: String(deezerAlbum.artist?.id || ''),
      coverUrl: this.deezer.getBestAlbumCover(deezerAlbum),
      releaseYear: this.deezer.extractYear(deezerAlbum.release_date),
      genre: deezerAlbum.genres?.data?.[0]?.name || '',
      tracks: deezerAlbum.nb_tracks || 0,
      duration: '',
      label: deezerAlbum.label || '',
      description: '',
      averageRating: 0,
      totalReviews: deezerAlbum.fans || 0
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
