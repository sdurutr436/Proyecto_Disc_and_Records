import { Injectable, inject } from '@angular/core';
import { Observable, of, map, catchError } from 'rxjs';
import { Song, Review } from '../models/data.models';
import { BaseHttpService } from './base-http.service';
import { DeezerService, DeezerTrack } from './deezer.service';
import { API_ENDPOINTS } from '../config/api.config';

/**
 * SongService - Servicio híbrido de gestión de canciones
 *
 * ARQUITECTURA HÍBRIDA:
 * - Deezer API: Datos de canciones (tracks), metadatos, búsqueda
 * - Backend propio: Reseñas de usuarios, ratings personalizados
 *
 * Las canciones se obtienen de Deezer API (tracks) y las reseñas/ratings
 * del backend propio, combinando ambas fuentes.
 */
@Injectable({
  providedIn: 'root'
})
export class SongService extends BaseHttpService {
  private readonly deezer = inject(DeezerService);

  // Flag para alternar entre Deezer y mock
  private readonly USE_DEEZER = true;

  // ==============================================
  // MÉTODOS PÚBLICOS - DEEZER + BACKEND
  // ==============================================

  /**
   * Obtiene tracks populares del chart
   */
  getPopularTracks(limit: number = 50): Observable<Song[]> {
    if (this.USE_DEEZER) {
      return this.deezer.getChartTracks(limit).pipe(
        map(tracks => tracks.map((t, i) => this.mapDeezerTrackToSong(t, i + 1))),
        catchError(() => of([]))
      );
    }
    return of([]);
  }

  /**
   * Obtiene canciones de un álbum desde Deezer
   */
  getAlbumTracks(albumId: string): Observable<Song[]> {
    if (!this.USE_DEEZER) {
      return this.getAlbumTracksMock(albumId);
    }

    return this.deezer.getAlbumTracks(albumId).pipe(
      map(tracks => tracks.map((t, i) => this.mapDeezerTrackToSong(t, i + 1))),
      catchError(error => {
        console.error('Error obteniendo tracks de Deezer:', error);
        return this.getAlbumTracksMock(albumId);
      })
    );
  }

  /**
   * Busca canciones por término usando Deezer
   */
  searchSongs(query: string): Observable<Song[]> {
    if (!this.USE_DEEZER || !query.trim()) {
      return of([]);
    }

    return this.deezer.searchTracks(query, 25).pipe(
      map(tracks => tracks.map((t, i) => this.mapDeezerTrackToSong(t, i + 1))),
      catchError(error => {
        console.error('Error buscando tracks en Deezer:', error);
        return of([]);
      })
    );
  }

  /**
   * Obtiene una canción por su ID de Deezer
   */
  getSongById(id: string): Observable<Song | null> {
    if (!this.USE_DEEZER) {
      return this.getSongByIdMock(id);
    }

    return this.deezer.getTrackById(id).pipe(
      map(track => track ? this.mapDeezerTrackToSong(track, 1) : null),
      catchError(error => {
        console.error('Error obteniendo track de Deezer:', error);
        return this.getSongByIdMock(id);
      })
    );
  }

  /**
   * Obtiene las top tracks de un artista
   */
  getArtistTopTracks(artistId: string): Observable<Song[]> {
    if (!this.USE_DEEZER) {
      return of([]);
    }

    return this.deezer.getArtistTopTracks(artistId, 10).pipe(
      map(tracks => tracks.map((t, i) => this.mapDeezerTrackToSong(t, i + 1))),
      catchError(error => {
        console.error('Error obteniendo top tracks del artista:', error);
        return of([]);
      })
    );
  }

  // ==============================================
  // RESEÑAS - BACKEND PROPIO
  // ==============================================

  /**
   * Obtiene las reseñas de una canción desde el backend
   */
  getSongReviews(songId: string): Observable<Review[]> {
    return this.get<Review[]>(API_ENDPOINTS.songs.getReviews(songId)).pipe(
      catchError(error => {
        console.error('Error obteniendo reseñas del backend:', error);
        return of([]);
      })
    );
  }

  /**
   * Añade una reseña a una canción
   */
  addSongReview(songId: string, review: Partial<Review>): Observable<Review> {
    const reviewData = {
      ...review,
      songId,
      date: new Date()
    };
    return this.post<Review>(API_ENDPOINTS.songs.addReview(songId), reviewData);
  }

  /**
   * Actualiza una reseña
   */
  updateReview(cancionId: number, usuarioId: number, review: Review): Observable<Review> {
    return this.put<Review>(API_ENDPOINTS.resenas.cancionUpdate(cancionId, usuarioId), review);
  }

  /**
   * Elimina una reseña
   */
  deleteReview(cancionId: number, usuarioId: number): Observable<void> {
    return this.delete<void>(API_ENDPOINTS.resenas.cancionDelete(cancionId, usuarioId));
  }

  // ==============================================
  // OPERACIONES CRUD BACKEND (Para canciones propias)
  // ==============================================

  /**
   * Obtiene todas las canciones del backend
   */
  getAllSongsFromBackend(): Observable<Song[]> {
    return this.get<Song[]>(API_ENDPOINTS.songs.getAll);
  }

  /**
   * Crea una nueva canción en el backend
   */
  createSong(song: Omit<Song, 'id'>): Observable<Song> {
    return this.post<Song>(API_ENDPOINTS.songs.create, song);
  }

  /**
   * Actualiza una canción en el backend
   */
  updateSong(id: string, song: Song): Observable<Song> {
    return this.put<Song>(API_ENDPOINTS.songs.update(id), song);
  }

  /**
   * Elimina una canción del backend
   */
  deleteSong(id: string): Observable<void> {
    return this.delete<void>(API_ENDPOINTS.songs.delete(id));
  }

  // ==============================================
  // MAPEO DEEZER → MODELO LOCAL
  // ==============================================

  /**
   * Mapea un track de Deezer al modelo Song local
   */
  private mapDeezerTrackToSong(track: DeezerTrack, trackNumber: number): Song {
    const album = track.album;
    const artist = track.artist;

    return {
      id: String(track.id),
      title: track.title,
      artist: artist?.name || 'Artista Desconocido',
      artistId: String(artist?.id || ''),
      album: album?.title || '',
      albumId: String(album?.id || ''),
      duration: this.deezer.formatDuration(track.duration),
      releaseYear: album?.release_date
        ? this.deezer.extractYear(album.release_date)
        : new Date().getFullYear(),
      genre: '',
      coverUrl: album?.cover_medium || album?.cover || '',
      previewUrl: track.preview || '',
      spotifyUrl: track.link || '',
      trackNumber: track.track_position || trackNumber,
      discNumber: track.disk_number || 1,
      explicit: track.explicit_lyrics || false,
      popularity: track.rank || 0,
      averageRating: 0,
      totalReviews: 0,
      description: ''
    };
  }

  // ==============================================
  // MÉTODOS MOCK (Fallback para desarrollo)
  // ==============================================

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
      description: 'Una obra maestra del rock progresivo.',
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
      description: 'Un himno pacifista que trasciende generaciones.',
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
      description: 'Una de las canciones más reconocibles de la historia del pop.',
      averageRating: 4.7,
      totalReviews: 4123
    }
  ];

  private getAlbumTracksMock(albumId: string): Observable<Song[]> {
    return of(this.mockSongs.filter(s => s.albumId === albumId));
  }

  private getSongByIdMock(id: string): Observable<Song | null> {
    const song = this.mockSongs.find(s => s.id === id);
    return of(song || null);
  }
}
