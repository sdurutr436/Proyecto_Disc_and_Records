import { Injectable } from '@angular/core';
import { Observable, of, delay, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Song, Review } from '../models/data.models';
import { BaseHttpService } from './base-http.service';
import { API_ENDPOINTS } from '../config/api.config';

/**
 * SongService - Servicio de gestión de canciones
 *
 * ARQUITECTURA: Hereda de BaseHttpService
 * - Métodos HTTP listos para producción (comentados)
 * - Datos mock para desarrollo (activos)
 * - Fácil cambio entre mock y API real
 *
 * MIGRACIÓN A API REAL:
 * 1. Descomentar métodos HTTP (getSongByIdHttp, etc.)
 * 2. Cambiar los métodos públicos para usar las versiones HTTP
 * 3. Eliminar o comentar datos mock
 *
 * @example
 * ```typescript
 * // Desarrollo (actual)
 * getSongById(id: string) {
 *   return this.getSongByIdMock(id);
 * }
 *
 * // Producción (cuando backend esté listo)
 * getSongById(id: string) {
 *   return this.getSongByIdHttp(id);
 * }
 * ```
 */
@Injectable({
  providedIn: 'root'
})
export class SongService extends BaseHttpService {

  // Datos mock para desarrollo
  private mockSongs: Song[] = [
    {
      id: 'song-1',
      title: 'Bohemian Rhapsody',
      artist: 'Queen',
      artistId: 'artist-4',
      album: 'A Night at the Opera',
      albumId: '4',
      duration: '5:55',
      releaseYear: 1975,
      genre: 'Rock',
      coverUrl: 'https://picsum.photos/seed/song1/400/400',
      description: 'Una obra maestra del rock progresivo. Considerada una de las mejores canciones de todos los tiempos.',
      averageRating: 4.9,
      totalReviews: 5421
    },
    {
      id: 'song-2',
      title: 'Imagine',
      artist: 'John Lennon',
      artistId: 'artist-5',
      album: 'Imagine',
      albumId: '5',
      duration: '3:03',
      releaseYear: 1971,
      genre: 'Rock',
      coverUrl: 'https://picsum.photos/seed/song2/400/400',
      description: 'Un himno pacifista que trasciende generaciones. La canción más icónica de John Lennon en solitario.',
      averageRating: 4.8,
      totalReviews: 3892
    },
    {
      id: 'song-3',
      title: 'Billie Jean',
      artist: 'Michael Jackson',
      artistId: 'artist-3',
      album: 'Thriller',
      albumId: '3',
      duration: '4:54',
      releaseYear: 1982,
      genre: 'Pop',
      coverUrl: 'https://picsum.photos/seed/song3/400/400',
      description: 'El video musical revolucionó MTV. Una de las canciones más reconocibles de la historia del pop.',
      averageRating: 4.7,
      totalReviews: 4123
    }
  ];

  private mockReviews: { [songId: string]: Review[] } = {
    'song-1': [
      {
        id: 'rs1-1',
        userId: 'u2',
        userName: 'Sarah Rock',
        userAvatar: 'https://i.pravatar.cc/150?img=2',
        rating: 5,
        content: 'Simplemente perfecta. La voz de Freddie Mercury es inigualable.',
        date: new Date('2024-02-10'),
        likes: 89
      }
    ]
  };

  // ==============================================
  // MÉTODOS PÚBLICOS (Actualmente usan MOCK)
  // ==============================================

  /**
   * Obtiene una canción por su ID
   *
   * ACTUAL: Usa datos mock
   * PRODUCCIÓN: Cambiar a getSongByIdHttp(id)
   */
  getSongById(id: string): Observable<Song | null> {
    return this.getSongByIdMock(id);
    // return this.getSongByIdHttp(id); // ⬅️ Descomentar para usar API real
  }

  /**
   * Obtiene las reseñas de una canción
   *
   * ACTUAL: Usa datos mock
   * PRODUCCIÓN: Cambiar a getSongReviewsHttp(songId)
   */
  getSongReviews(songId: string): Observable<Review[]> {
    return this.getSongReviewsMock(songId);
    // return this.getSongReviewsHttp(songId); // ⬅️ Descomentar para usar API real
  }

  /**
   * Busca canciones por término
   *
   * ACTUAL: Usa datos mock
   * PRODUCCIÓN: Cambiar a searchSongsHttp(query)
   */
  searchSongs(query: string): Observable<Song[]> {
    return this.searchSongsMock(query);
    // return this.searchSongsHttp(query); // ⬅️ Descomentar para usar API real
  }

  /**
   * Obtiene todas las canciones
   *
   * ACTUAL: Usa datos mock
   * PRODUCCIÓN: Cambiar a getAllSongsHttp()
   */
  getAllSongs(): Observable<Song[]> {
    return this.getAllSongsMock();
    // return this.getAllSongsHttp(); // ⬅️ Descomentar para usar API real
  }

  /**
   * Añade una reseña a una canción
   *
   * PRODUCCIÓN: Usar cuando el backend esté listo
   */
  addSongReview(songId: string, review: Partial<Review>): Observable<Review> {
    return this.post<Review>(API_ENDPOINTS.songs.addReview(songId), review);
  }

  // ==============================================
  // MÉTODOS HTTP (Listos para producción)
  // ==============================================

  /**
   * [HTTP] Obtiene una canción por su ID desde la API
   *
   * Endpoint: GET /api/songs/:id
   *
   * @param id - ID de la canción
   * @returns Observable con la canción o null si no existe
   */
  private getSongByIdHttp(id: string): Observable<Song | null> {
    return this.get<Song>(API_ENDPOINTS.songs.getById(id)).pipe(
      catchError(error => {
        // Si es 404, retornar null en lugar de error
        if (error.status === 404) {
          return of(null);
        }
        return throwError(() => error);
      })
    );
  }

  /**
   * [HTTP] Obtiene las reseñas de una canción desde la API
   *
   * Endpoint: GET /api/songs/:id/reviews
   */
  private getSongReviewsHttp(songId: string): Observable<Review[]> {
    return this.get<Review[]>(API_ENDPOINTS.songs.getReviews(songId));
  }

  /**
   * [HTTP] Busca canciones desde la API
   *
   * Endpoint: GET /api/songs/search?q=query
   */
  private searchSongsHttp(query: string): Observable<Song[]> {
    return this.get<Song[]>(API_ENDPOINTS.songs.search, {
      params: { q: query }
    });
  }

  /**
   * [HTTP] Obtiene todas las canciones desde la API
   *
   * Endpoint: GET /api/songs
   */
  private getAllSongsHttp(): Observable<Song[]> {
    return this.get<Song[]>(API_ENDPOINTS.songs.getAll);
  }

  // ==============================================
  // MÉTODOS MOCK (Desarrollo)
  // ==============================================

  /**
   * [MOCK] Obtiene una canción por su ID
   * Simula latencia de red con delay
   */
  private getSongByIdMock(id: string): Observable<Song | null> {
    const song = this.mockSongs.find(s => s.id === id);

    if (!song) {
      return throwError(() => new Error(`Song with id ${id} not found`)).pipe(delay(300));
    }

    return of(song).pipe(delay(500));
  }

  /**
   * [MOCK] Obtiene las reseñas de una canción
   */
  private getSongReviewsMock(songId: string): Observable<Review[]> {
    const reviews = this.mockReviews[songId] || [];
    return of(reviews).pipe(delay(300));
  }

  /**
   * [MOCK] Busca canciones por término
   */
  private searchSongsMock(query: string): Observable<Song[]> {
    const results = this.mockSongs.filter(song =>
      song.title.toLowerCase().includes(query.toLowerCase()) ||
      song.artist.toLowerCase().includes(query.toLowerCase()) ||
      song.album.toLowerCase().includes(query.toLowerCase()) ||
      song.genre.toLowerCase().includes(query.toLowerCase())
    );
    return of(results).pipe(delay(400));
  }

  /**
   * [MOCK] Obtiene todas las canciones
   */
  private getAllSongsMock(): Observable<Song[]> {
    return of(this.mockSongs).pipe(delay(300));
  }
}
