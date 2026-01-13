import { Injectable } from '@angular/core';
import { Observable, of, delay } from 'rxjs';
import {
  MOCK_ALBUMS,
  MOCK_ARTISTS,
  MOCK_TRACKS,
  MOCK_REVIEWS,
  MOCK_ALBUM_STATS,
  DEFAULT_ALBUM_STATS
} from './mock-data';
import { DeezerAlbum, DeezerArtist, DeezerTrack, DeezerChart } from './deezer.service';
import { Review, AlbumStats } from '../models/data.models';

/**
 * MockDeezerService - Servicio de datos mock para desarrollo UI/UX
 *
 * Reemplaza DeezerService para evitar consumir tokens de la API.
 * Usa datos estáticos con delays simulados para parecer realista.
 */
@Injectable({
  providedIn: 'root'
})
export class MockDeezerService {
  private readonly SIMULATED_DELAY = 300; // ms

  // ==========================================================================
  // CHART DATA
  // ==========================================================================

  getChart(): Observable<DeezerChart> {
    const chart: DeezerChart = {
      tracks: { data: Object.values(MOCK_TRACKS).flat().slice(0, 20) },
      albums: { data: MOCK_ALBUMS },
      artists: { data: MOCK_ARTISTS },
      playlists: { data: [] }
    };
    return of(chart).pipe(delay(this.SIMULATED_DELAY));
  }

  getChartAlbums(limit: number = 50): Observable<DeezerAlbum[]> {
    const albums = MOCK_ALBUMS.slice(0, limit);
    return of(albums).pipe(delay(this.SIMULATED_DELAY));
  }

  getChartArtists(limit: number = 50): Observable<DeezerArtist[]> {
    const artists = MOCK_ARTISTS.slice(0, limit);
    return of(artists).pipe(delay(this.SIMULATED_DELAY));
  }

  getChartTracks(limit: number = 50): Observable<DeezerTrack[]> {
    const tracks = Object.values(MOCK_TRACKS).flat().slice(0, limit);
    return of(tracks).pipe(delay(this.SIMULATED_DELAY));
  }

  // ==========================================================================
  // ALBUM DATA
  // ==========================================================================

  getAlbumById(id: string): Observable<DeezerAlbum | null> {
    const numId = parseInt(id, 10);
    const album = MOCK_ALBUMS.find(a => a.id === numId) || null;
    if (album) {
      // Añadir tracks al álbum
      const albumWithTracks = {
        ...album,
        tracks: { data: MOCK_TRACKS[album.id] || [] }
      };
      return of(albumWithTracks).pipe(delay(this.SIMULATED_DELAY));
    }
    return of(null).pipe(delay(this.SIMULATED_DELAY));
  }

  getAlbumTracks(albumId: string): Observable<DeezerTrack[]> {
    const numId = parseInt(albumId, 10);
    const tracks = MOCK_TRACKS[numId] || [];
    return of(tracks).pipe(delay(this.SIMULATED_DELAY));
  }

  // ==========================================================================
  // ARTIST DATA
  // ==========================================================================

  getArtistById(id: string): Observable<DeezerArtist | null> {
    const numId = parseInt(id, 10);
    const artist = MOCK_ARTISTS.find(a => a.id === numId) || null;
    return of(artist).pipe(delay(this.SIMULATED_DELAY));
  }

  getArtistAlbums(artistId: string, limit: number = 25): Observable<DeezerAlbum[]> {
    const numId = parseInt(artistId, 10);
    const albums = MOCK_ALBUMS.filter(a => a.artist.id === numId).slice(0, limit);
    return of(albums).pipe(delay(this.SIMULATED_DELAY));
  }

  getArtistTopTracks(artistId: string, limit: number = 10): Observable<DeezerTrack[]> {
    const numId = parseInt(artistId, 10);
    const artistAlbums = MOCK_ALBUMS.filter(a => a.artist.id === numId);
    const tracks = artistAlbums.flatMap(album => MOCK_TRACKS[album.id] || []).slice(0, limit);
    return of(tracks).pipe(delay(this.SIMULATED_DELAY));
  }

  // ==========================================================================
  // TRACK DATA
  // ==========================================================================

  getTrackById(id: string): Observable<DeezerTrack | null> {
    const numId = parseInt(id, 10);
    const allTracks = Object.values(MOCK_TRACKS).flat();
    const track = allTracks.find(t => t.id === numId) || null;
    return of(track).pipe(delay(this.SIMULATED_DELAY));
  }

  // ==========================================================================
  // SEARCH
  // ==========================================================================

  searchAlbums(query: string, limit: number = 25): Observable<DeezerAlbum[]> {
    const q = query.toLowerCase();
    const results = MOCK_ALBUMS.filter(a =>
      a.title.toLowerCase().includes(q) ||
      a.artist.name.toLowerCase().includes(q)
    ).slice(0, limit);
    return of(results).pipe(delay(this.SIMULATED_DELAY));
  }

  searchArtists(query: string, limit: number = 25): Observable<DeezerArtist[]> {
    const q = query.toLowerCase();
    const results = MOCK_ARTISTS.filter(a =>
      a.name.toLowerCase().includes(q)
    ).slice(0, limit);
    return of(results).pipe(delay(this.SIMULATED_DELAY));
  }

  searchTracks(query: string, limit: number = 25): Observable<DeezerTrack[]> {
    const q = query.toLowerCase();
    const allTracks = Object.values(MOCK_TRACKS).flat();
    const results = allTracks.filter(t =>
      t.title.toLowerCase().includes(q) ||
      t.artist.name.toLowerCase().includes(q)
    ).slice(0, limit);
    return of(results).pipe(delay(this.SIMULATED_DELAY));
  }

  // ==========================================================================
  // REVIEWS & STATS (MOCK BACKEND)
  // ==========================================================================

  getAlbumReviews(albumId: string): Observable<Review[]> {
    const reviews = MOCK_REVIEWS.filter(r => r.albumId === albumId);
    return of(reviews).pipe(delay(this.SIMULATED_DELAY));
  }

  getAlbumStats(albumId: string): Observable<AlbumStats> {
    const stats = MOCK_ALBUM_STATS[albumId] || DEFAULT_ALBUM_STATS;
    return of(stats).pipe(delay(this.SIMULATED_DELAY));
  }

  // ==========================================================================
  // UTILITY
  // ==========================================================================

  formatDuration(seconds: number): string {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  }

  getBestAlbumCover(album: DeezerAlbum, preferBig: boolean = true): string {
    if (preferBig && album.cover_big) return album.cover_big;
    if (album.cover_xl) return album.cover_xl;
    if (album.cover_big) return album.cover_big;
    if (album.cover_medium) return album.cover_medium;
    return album.cover || 'assets/album-placeholder.svg';
  }

  getBestArtistPicture(artist: DeezerArtist, preferBig: boolean = true): string {
    if (preferBig && artist.picture_big) return artist.picture_big;
    if (artist.picture_xl) return artist.picture_xl;
    if (artist.picture_big) return artist.picture_big;
    if (artist.picture_medium) return artist.picture_medium;
    return artist.picture || 'assets/artist-placeholder.svg';
  }

  extractYear(releaseDate: string): number {
    if (!releaseDate) return new Date().getFullYear();
    return parseInt(releaseDate.substring(0, 4), 10);
  }
}
