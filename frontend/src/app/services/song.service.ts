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

  // ==============================================
  // MÉTODOS PÚBLICOS - DEEZER + BACKEND
  // ==============================================

  /**
   * Obtiene tracks populares del chart
   */
  getPopularTracks(limit: number = 50): Observable<Song[]> {
    return this.deezer.getChartTracks(limit).pipe(
      map(tracks => tracks.map((t, i) => this.mapDeezerTrackToSong(t, i + 1))),
      catchError(() => of([]))
    );
  }

  /**
   * Obtiene canciones de un álbum desde Deezer
   */
  getAlbumTracks(albumId: string): Observable<Song[]> {
    return this.deezer.getAlbumTracks(albumId).pipe(
      map(tracks => tracks.map((t, i) => this.mapDeezerTrackToSong(t, i + 1))),
      catchError(error => {
        console.error('Error obteniendo tracks de Deezer:', error);
        return of([]);
      })
    );
  }

  /**
   * Busca canciones por término usando Deezer
   */
  searchSongs(query: string): Observable<Song[]> {
    if (!query.trim()) {
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
    return this.deezer.getTrackById(id).pipe(
      map(track => track ? this.mapDeezerTrackToSong(track, 1) : null),
      catchError(error => {
        console.error('Error obteniendo track de Deezer:', error);
        return of(null);
      })
    );
  }

  /**
   * Obtiene las top tracks de un artista
   */
  getArtistTopTracks(artistId: string): Observable<Song[]> {
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
}
