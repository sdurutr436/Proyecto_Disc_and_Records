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
 * - Operaciones CRUD completas (GET, POST, PUT, PATCH, DELETE)
 * - Métodos HTTP listos para producción (comentados)
 * - Datos mock para desarrollo (activos)
 * - Gestión de reseñas de canciones
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
  // MÉTODOS PÚBLICOS - OPERACIONES CRUD
  // ==============================================

  /**
   * [GET] Obtiene todas las canciones
   */
  getAllSongs(): Observable<Song[]> {
    return this.getAllSongsMock();
    // return this.getAllSongsHttp(); // ⬅️ Descomentar para usar API real
  }

  /**
   * [GET] Obtiene una canción por su ID
   */
  getSongById(id: string): Observable<Song | null> {
    return this.getSongByIdMock(id);
    // return this.getSongByIdHttp(id); // ⬅️ Descomentar para usar API real
  }

  /**
   * [POST] Crea una nueva canción
   */
  createSong(song: Omit<Song, 'id'>): Observable<Song> {
    return this.createSongMock(song);
    // return this.createSongHttp(song); // ⬅️ Descomentar para usar API real
  }

  /**
   * [PUT] Actualiza una canción completa
   */
  updateSong(id: string, song: Song): Observable<Song> {
    return this.updateSongMock(id, song);
    // return this.updateSongHttp(id, song); // ⬅️ Descomentar para usar API real
  }

  /**
   * [PATCH] Actualiza parcialmente una canción
   */
  patchSong(id: string, updates: Partial<Song>): Observable<Song> {
    return this.patchSongMock(id, updates);
    // return this.patchSongHttp(id, updates); // ⬅️ Descomentar para usar API real
  }

  /**
   * [DELETE] Elimina una canción
   */
  deleteSong(id: string): Observable<void> {
    return this.deleteSongMock(id);
    // return this.deleteSongHttp(id); // ⬅️ Descomentar para usar API real
  }

  /**
   * [GET] Busca canciones por término
   */
  searchSongs(query: string): Observable<Song[]> {
    return this.searchSongsMock(query);
    // return this.searchSongsHttp(query); // ⬅️ Descomentar para usar API real
  }

  /**
   * [GET] Obtiene las reseñas de una canción
   */
  getSongReviews(songId: string): Observable<Review[]> {
    return this.getSongReviewsMock(songId);
    // return this.getSongReviewsHttp(songId); // ⬅️ Descomentar para usar API real
  }

  /**
   * [POST] Añade una reseña a una canción
   */
  addSongReview(songId: string, review: Partial<Review>): Observable<Review> {
    return this.addSongReviewMock(songId, review);
    // return this.addSongReviewHttp(songId, review); // ⬅️ Descomentar para usar API real
  }

  // ==============================================
  // MÉTODOS HTTP (Listos para producción)
  // ==============================================

  private getAllSongsHttp(): Observable<Song[]> {
    return this.get<Song[]>(API_ENDPOINTS.songs.getAll);
  }

  private getSongByIdHttp(id: string): Observable<Song | null> {
    return this.get<Song>(API_ENDPOINTS.songs.getById(id)).pipe(
      catchError(error => {
        if (error.status === 404) {
          return of(null);
        }
        return throwError(() => error);
      })
    );
  }

  private createSongHttp(song: Omit<Song, 'id'>): Observable<Song> {
    return this.post<Song>(API_ENDPOINTS.songs.create, song);
  }

  private updateSongHttp(id: string, song: Song): Observable<Song> {
    return this.put<Song>(API_ENDPOINTS.songs.update(id), song);
  }

  private patchSongHttp(id: string, updates: Partial<Song>): Observable<Song> {
    return this.patch<Song>(API_ENDPOINTS.songs.update(id), updates);
  }

  private deleteSongHttp(id: string): Observable<void> {
    return this.delete<void>(API_ENDPOINTS.songs.delete(id));
  }

  private searchSongsHttp(query: string): Observable<Song[]> {
    return this.get<Song[]>(API_ENDPOINTS.songs.search, {
      params: { q: query }
    });
  }

  private getSongReviewsHttp(songId: string): Observable<Review[]> {
    return this.get<Review[]>(API_ENDPOINTS.songs.getReviews(songId));
  }

  private addSongReviewHttp(songId: string, review: Partial<Review>): Observable<Review> {
    return this.post<Review>(API_ENDPOINTS.songs.addReview(songId), review);
  }

  // ==============================================
  // MÉTODOS MOCK (Desarrollo)
  // ==============================================

  private getAllSongsMock(): Observable<Song[]> {
    return of(this.mockSongs).pipe(delay(300));
  }

  private getSongByIdMock(id: string): Observable<Song | null> {
    const song = this.mockSongs.find(s => s.id === id);

    if (!song) {
      return throwError(() => new Error(`Song with id ${id} not found`)).pipe(delay(300));
    }

    return of(song).pipe(delay(500));
  }

  private createSongMock(song: Omit<Song, 'id'>): Observable<Song> {
    const newSong: Song = {
      ...song,
      id: `song-${Date.now()}`
    };

    this.mockSongs.push(newSong);

    return of(newSong).pipe(delay(400));
  }

  private updateSongMock(id: string, song: Song): Observable<Song> {
    const index = this.mockSongs.findIndex(s => s.id === id);

    if (index === -1) {
      return throwError(() => new Error(`Song with id ${id} not found`)).pipe(delay(300));
    }

    this.mockSongs[index] = { ...song, id };

    return of(this.mockSongs[index]).pipe(delay(400));
  }

  private patchSongMock(id: string, updates: Partial<Song>): Observable<Song> {
    const index = this.mockSongs.findIndex(s => s.id === id);

    if (index === -1) {
      return throwError(() => new Error(`Song with id ${id} not found`)).pipe(delay(300));
    }

    this.mockSongs[index] = {
      ...this.mockSongs[index],
      ...updates,
      id
    };

    return of(this.mockSongs[index]).pipe(delay(400));
  }

  private deleteSongMock(id: string): Observable<void> {
    const index = this.mockSongs.findIndex(s => s.id === id);

    if (index === -1) {
      return throwError(() => new Error(`Song with id ${id} not found`)).pipe(delay(300));
    }

    this.mockSongs.splice(index, 1);

    return of(void 0).pipe(delay(400));
  }

  private searchSongsMock(query: string): Observable<Song[]> {
    const results = this.mockSongs.filter(song =>
      song.title.toLowerCase().includes(query.toLowerCase()) ||
      song.artist.toLowerCase().includes(query.toLowerCase()) ||
      song.album.toLowerCase().includes(query.toLowerCase()) ||
      song.genre.toLowerCase().includes(query.toLowerCase())
    );
    return of(results).pipe(delay(400));
  }

  private getSongReviewsMock(songId: string): Observable<Review[]> {
    const reviews = this.mockReviews[songId] || [];
    return of(reviews).pipe(delay(300));
  }

  private addSongReviewMock(songId: string, review: Partial<Review>): Observable<Review> {
    const newReview: Review = {
      id: `review-${Date.now()}`,
      userId: 'mock-user-id',
      userName: 'Usuario Mock',
      userAvatar: 'https://i.pravatar.cc/150?img=10',
      rating: review.rating || 5,
      content: review.content || '',
      date: new Date(),
      likes: 0,
      ...review
    };

    if (!this.mockReviews[songId]) {
      this.mockReviews[songId] = [];
    }
    this.mockReviews[songId].push(newReview);

    return of(newReview).pipe(delay(400));
  }
}
