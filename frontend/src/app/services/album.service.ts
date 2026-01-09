import { Injectable } from '@angular/core';
import { Observable, of, delay, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { Album, Track, Review } from '../models/data.models';
import { BaseHttpService } from './base-http.service';
import { API_ENDPOINTS } from '../config/api.config';

/**
 * AlbumService - Servicio de gestión de álbumes
 *
 * ARQUITECTURA: Hereda de BaseHttpService
 * - Métodos HTTP listos para producción (comentados)
 * - Datos mock para desarrollo (activos)
 * - Fácil cambio entre mock y API real
 *
 * MIGRACIÓN A API REAL:
 * 1. Descomentar métodos HTTP (getAlbumByIdHttp, etc.)
 * 2. Cambiar los métodos públicos para usar las versiones HTTP
 * 3. Eliminar o comentar datos mock
 *
 * @example
 * ```typescript
 * // Desarrollo (actual)
 * getAlbumById(id: string) {
 *   return this.getAlbumByIdMock(id);
 * }
 *
 * // Producción (cuando backend esté listo)
 * getAlbumById(id: string) {
 *   return this.getAlbumByIdHttp(id);
 * }
 * ```
 */
@Injectable({
  providedIn: 'root'
})
export class AlbumService extends BaseHttpService {

  // Datos mock para desarrollo
  private mockAlbums: Album[] = [
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
      description: 'Uno de los álbumes más icónicos e influyentes de la historia del rock progresivo. Explora temas de conflicto, avaricia, tiempo y salud mental.',
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
      description: 'El undécimo álbum de estudio de The Beatles. Considerado uno de los mejores álbumes de todos los tiempos.',
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
      description: 'El álbum más vendido de todos los tiempos. Revolucionó la industria musical y estableció nuevos estándares de producción.',
      averageRating: 4.7,
      totalReviews: 3421
    }
  ];

  private mockTracks: { [albumId: string]: Track[] } = {
    '1': [
      { id: 't1-1', number: 1, title: 'Speak to Me', duration: '1:30' },
      { id: 't1-2', number: 2, title: 'Breathe', duration: '2:43' },
      { id: 't1-3', number: 3, title: 'On the Run', duration: '3:30' },
      { id: 't1-4', number: 4, title: 'Time', duration: '6:53' },
      { id: 't1-5', number: 5, title: 'The Great Gig in the Sky', duration: '4:36' }
    ],
    '2': [
      { id: 't2-1', number: 1, title: 'Come Together', duration: '4:20' },
      { id: 't2-2', number: 2, title: 'Something', duration: '3:03' },
      { id: 't2-3', number: 3, title: 'Here Comes the Sun', duration: '3:05' }
    ],
    '3': [
      { id: 't3-1', number: 1, title: 'Wanna Be Startin\' Somethin\'', duration: '6:03' },
      { id: 't3-2', number: 2, title: 'Thriller', duration: '5:57' },
      { id: 't3-3', number: 3, title: 'Beat It', duration: '4:18' }
    ]
  };

  private mockReviews: { [albumId: string]: Review[] } = {
    '1': [
      {
        id: 'r1-1',
        userId: 'u1',
        userName: 'John Music',
        userAvatar: 'https://i.pravatar.cc/150?img=1',
        rating: 5,
        content: 'Una obra maestra absoluta. Cada canción es un viaje emocional.',
        date: new Date('2024-01-15'),
        likes: 42
      }
    ]
  };

  // ==============================================
  // MÉTODOS PÚBLICOS (Actualmente usan MOCK)
  // ==============================================

  /**
   * Obtiene un álbum por su ID
   *
   * ACTUAL: Usa datos mock
   * PRODUCCIÓN: Cambiar a getAlbumByIdHttp(id)
   */
  getAlbumById(id: string): Observable<Album | null> {
    return this.getAlbumByIdMock(id);
    // return this.getAlbumByIdHttp(id); // ⬅️ Descomentar para usar API real
  }

  // ==============================================
  // MÉTODOS HTTP (Listos para producción)
  // ==============================================

  /**
   * [HTTP] Obtiene un álbum por su ID desde la API
   *
   * Endpoint: GET /api/albums/:id
   *
   * @param id - ID del álbum
   * @returns Observable con el álbum o null si no existe
   */
  private getAlbumByIdHttp(id: string): Observable<Album | null> {
    return this.get<Album>(API_ENDPOINTS.albums.getById(id)).pipe(
      catchError(error => {
        // Si es 404, retornar null en lugar de error
        if (error.status === 404) {
          return of(null);
        }
        return throwError(() => error);
      })
    );
  }

  // ==============================================
  // MÉTODOS MOCK (Desarrollo)
  // ==============================================

  /**
   * [MOCK] Obtiene un álbum por su ID
   * Simula latencia de red con delay
   */
  private getAlbumByIdMock(id: string): Observable<Album | null> {
    const album = this.mockAlbums.find(a => a.id === id);

    if (!album) {
      return throwError(() => new Error(`Album with id ${id} not found`)).pipe(delay(300));
    }

    return of(album).pipe(delay(500)); // Simula latencia de red
  }

  /**
   * Obtiene las canciones de un álbum
   *
   * ACTUAL: Usa datos mock
   * PRODUCCIÓN: Cambiar a getAlbumTracksHttp(albumId)
   */
  getAlbumTracks(albumId: string): Observable<Track[]> {
    return this.getAlbumTracksMock(albumId);
    // return this.getAlbumTracksHttp(albumId); // ⬅️ Descomentar para usar API real
  }

  /**
   * Obtiene las reseñas de un álbum
   *
   * ACTUAL: Usa datos mock
   * PRODUCCIÓN: Cambiar a getAlbumReviewsHttp(albumId)
   */
  getAlbumReviews(albumId: string): Observable<Review[]> {
    return this.getAlbumReviewsMock(albumId);
    // return this.getAlbumReviewsHttp(albumId); // ⬅️ Descomentar para usar API real
  }

  /**
   * Busca álbumes por término
   *
   * ACTUAL: Usa datos mock
   * PRODUCCIÓN: Cambiar a searchAlbumsHttp(query)
   */
  searchAlbums(query: string): Observable<Album[]> {
    return this.searchAlbumsMock(query);
    // return this.searchAlbumsHttp(query); // ⬅️ Descomentar para usar API real
  }

  /**
   * Obtiene todos los álbumes
   *
   * ACTUAL: Usa datos mock
   * PRODUCCIÓN: Cambiar a getAllAlbumsHttp()
   */
  getAllAlbums(): Observable<Album[]> {
    return this.getAllAlbumsMock();
    // return this.getAllAlbumsHttp(); // ⬅️ Descomentar para usar API real
  }

  /**
   * Añade una reseña a un álbum
   *
   * PRODUCCIÓN: Usar cuando el backend esté listo
   */
  addAlbumReview(albumId: string, review: Partial<Review>): Observable<Review> {
    return this.post<Review>(API_ENDPOINTS.albums.addReview(albumId), review);
  }

  // ==============================================
  // MÉTODOS HTTP (Listos para producción)
  // ==============================================

  /**
   * [HTTP] Obtiene las canciones de un álbum desde la API
   */
  private getAlbumTracksHttp(albumId: string): Observable<Track[]> {
    return this.get<Track[]>(API_ENDPOINTS.albums.getTracks(albumId));
  }

  /**
   * [HTTP] Obtiene las reseñas de un álbum desde la API
   */
  private getAlbumReviewsHttp(albumId: string): Observable<Review[]> {
    return this.get<Review[]>(API_ENDPOINTS.albums.getReviews(albumId));
  }

  /**
   * [HTTP] Busca álbumes desde la API
   */
  private searchAlbumsHttp(query: string): Observable<Album[]> {
    return this.get<Album[]>(API_ENDPOINTS.albums.search, {
      params: { q: query }
    });
  }

  /**
   * [HTTP] Obtiene todos los álbumes desde la API
   */
  private getAllAlbumsHttp(): Observable<Album[]> {
    return this.get<Album[]>(API_ENDPOINTS.albums.getAll);
  }

  // ==============================================
  // MÉTODOS MOCK (Desarrollo)
  // ==============================================

  /**
   * [MOCK] Obtiene las canciones de un álbum
   */
  private getAlbumTracksMock(albumId: string): Observable<Track[]> {
    const tracks = this.mockTracks[albumId] || [];
    return of(tracks).pipe(delay(300));
  }

  /**
   * [MOCK] Obtiene las reseñas de un álbum
   */
  private getAlbumReviewsMock(albumId: string): Observable<Review[]> {
    const reviews = this.mockReviews[albumId] || [];
    return of(reviews).pipe(delay(300));
  }

  /**
   * [MOCK] Busca álbumes por término
   */
  private searchAlbumsMock(query: string): Observable<Album[]> {
    const results = this.mockAlbums.filter(album =>
      album.title.toLowerCase().includes(query.toLowerCase()) ||
      album.artist.toLowerCase().includes(query.toLowerCase()) ||
      album.genre.toLowerCase().includes(query.toLowerCase())
    );
    return of(results).pipe(delay(400));
  }

  /**
   * [MOCK] Obtiene todos los álbumes
   */
  private getAllAlbumsMock(): Observable<Album[]> {
    return of(this.mockAlbums).pipe(delay(300));
  }
}
