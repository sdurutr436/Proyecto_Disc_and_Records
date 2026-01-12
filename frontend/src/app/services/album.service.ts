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

  // Flag para elegir fuente de datos
  private readonly USE_DEEZER = true; // true = Deezer, false = mock data
  private readonly USE_BACKEND_REVIEWS = true; // true = backend, false = mock

  // ==========================================================================
  // MÉTODOS PRINCIPALES - DEEZER + BACKEND
  // ==========================================================================

  /**
   * Obtiene 50 álbumes populares de Deezer (Charts)
   * Equivalente a "New Releases" pero con los más populares
   */
  getNewReleases(): Observable<Album[]> {
    if (this.USE_DEEZER) {
      return this.deezer.getChartAlbums(50).pipe(
        map(deezerAlbums => deezerAlbums.map(da => this.mapDeezerAlbumToAlbum(da))),
        catchError(error => {
          console.error('Error obteniendo álbumes de Deezer:', error);
          return this.getAllAlbumsMock();
        })
      );
    }
    return this.getAllAlbumsMock();
  }

  /**
   * Obtiene un álbum por su ID
   * Primero intenta Deezer, luego el backend local
   */
  getAlbumById(id: string): Observable<Album | null> {
    if (this.USE_DEEZER) {
      return this.deezer.getAlbumById(id).pipe(
        map(deezerAlbum => deezerAlbum ? this.mapDeezerAlbumToAlbum(deezerAlbum) : null),
        catchError(() => this.getAlbumByIdBackend(id))
      );
    }
    return this.getAlbumByIdBackend(id);
  }

  /**
   * Busca álbumes por término
   */
  searchAlbums(query: string): Observable<Album[]> {
    if (this.USE_DEEZER) {
      return this.deezer.searchAlbums(query, 25).pipe(
        map(deezerAlbums => deezerAlbums.map(da => this.mapDeezerAlbumToAlbum(da))),
        catchError(() => this.searchAlbumsMock(query))
      );
    }
    return this.searchAlbumsMock(query);
  }

  /**
   * Obtiene las canciones de un álbum de Deezer
   */
  getAlbumTracks(albumId: string): Observable<Track[]> {
    if (this.USE_DEEZER) {
      return this.deezer.getAlbumTracks(albumId).pipe(
        map(tracks => tracks.map((t, index) => ({
          id: String(t.id),
          number: t.track_position || index + 1,
          title: t.title,
          duration: this.deezer.formatDuration(t.duration)
        }))),
        catchError(() => this.getAlbumTracksMock(albumId))
      );
    }
    return this.getAlbumTracksMock(albumId);
  }

  /**
   * Obtiene las reseñas de un álbum desde el backend
   * Las reseñas son datos propios, no de Deezer
   */
  getAlbumReviews(albumId: string): Observable<Review[]> {
    if (this.USE_BACKEND_REVIEWS) {
      return this.getAlbumReviewsBackend(albumId);
    }
    return this.getAlbumReviewsMock(albumId);
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
        userAvatar: r.avatarUsuario || 'https://i.pravatar.cc/150',
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

  // ==========================================================================
  // MÉTODOS MOCK (Fallback para desarrollo sin conexión)
  // ==========================================================================

  private getAllAlbumsMock(): Observable<Album[]> {
    const mockAlbums: Album[] = [
      {
        id: '1',
        title: 'The Dark Side of the Moon',
        artist: 'Pink Floyd',
        artistId: 'artist-1',
        coverUrl: 'https://picsum.photos/seed/album1/400/400',
        releaseYear: 1973,
        genre: 'Progressive Rock',
        tracks: 10,
        duration: '42:49',
        label: 'Harvest Records',
        description: 'Uno de los álbumes más icónicos de la historia del rock.',
        averageRating: 4.8,
        totalReviews: 1523
      },
      {
        id: '2',
        title: 'Abbey Road',
        artist: 'The Beatles',
        artistId: 'artist-2',
        coverUrl: 'https://picsum.photos/seed/album2/400/400',
        releaseYear: 1969,
        genre: 'Rock',
        tracks: 17,
        duration: '47:23',
        label: 'Apple Records',
        description: 'El undécimo álbum de estudio de The Beatles.',
        averageRating: 4.9,
        totalReviews: 2104
      },
      {
        id: '3',
        title: 'Thriller',
        artist: 'Michael Jackson',
        artistId: 'artist-3',
        coverUrl: 'https://picsum.photos/seed/album3/400/400',
        releaseYear: 1982,
        genre: 'Pop',
        tracks: 9,
        duration: '42:16',
        label: 'Epic Records',
        description: 'El álbum más vendido de todos los tiempos.',
        averageRating: 4.7,
        totalReviews: 3421
      }
    ];

    return of(mockAlbums);
  }

  private searchAlbumsMock(query: string): Observable<Album[]> {
    return this.getAllAlbumsMock().pipe(
      map(albums => albums.filter(a =>
        a.title.toLowerCase().includes(query.toLowerCase()) ||
        a.artist.toLowerCase().includes(query.toLowerCase())
      ))
    );
  }

  private getAlbumTracksMock(albumId: string): Observable<Track[]> {
    const mockTracks: { [key: string]: Track[] } = {
      '1': [
        { id: 't1-1', number: 1, title: 'Speak to Me', duration: '1:30' },
        { id: 't1-2', number: 2, title: 'Breathe', duration: '2:43' },
        { id: 't1-3', number: 3, title: 'On the Run', duration: '3:30' },
        { id: 't1-4', number: 4, title: 'Time', duration: '6:53' },
        { id: 't1-5', number: 5, title: 'The Great Gig in the Sky', duration: '4:36' }
      ]
    };

    return of(mockTracks[albumId] || []);
  }

  private getAlbumReviewsMock(albumId: string): Observable<Review[]> {
    const mockReviews: Review[] = [
      {
        id: 'r1',
        userId: 'u1',
        userName: 'John Music',
        userAvatar: 'https://i.pravatar.cc/150?img=1',
        rating: 5,
        content: 'Una obra maestra absoluta.',
        date: new Date('2024-01-15'),
        likes: 42
      }
    ];

    return of(albumId === '1' ? mockReviews : []);
  }
}
