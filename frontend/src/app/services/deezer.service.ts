import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { map, catchError, shareReplay } from 'rxjs/operators';

/**
 * Configuración de Deezer API
 *
 * VENTAJAS DE DEEZER:
 * - No requiere autenticación para datos públicos
 * - Sin límites estrictos de rate (50 requests/5 segundos)
 * - Datos completos: álbumes, artistas, tracks, charts
 * - Imágenes de alta calidad
 * - Preview de 30 segundos de canciones
 *
 * @see https://developers.deezer.com/api
 */
const DEEZER_CONFIG = {
  apiBaseUrl: 'https://api.deezer.com',
  // CORS proxy necesario porque Deezer no permite CORS desde localhost
  corsProxy: 'https://corsproxy.io/?',
};

/**
 * Interfaces para respuestas de Deezer API
 */
export interface DeezerArtist {
  id: number;
  name: string;
  picture: string;
  picture_small: string;
  picture_medium: string;
  picture_big: string;
  picture_xl: string;
  nb_album?: number;
  nb_fan?: number;
  tracklist: string;
  type: 'artist';
}

export interface DeezerAlbum {
  id: number;
  title: string;
  upc?: string;
  cover: string;
  cover_small: string;
  cover_medium: string;
  cover_big: string;
  cover_xl: string;
  genre_id?: number;
  genres?: { data: { id: number; name: string }[] };
  label?: string;
  nb_tracks?: number;
  duration?: number;
  fans?: number;
  release_date: string;
  record_type: 'album' | 'single' | 'ep' | 'compile';
  available?: boolean;
  tracklist: string;
  explicit_lyrics?: boolean;
  explicit_content_lyrics?: number;
  explicit_content_cover?: number;
  contributors?: DeezerArtist[];
  artist: DeezerArtist;
  type: 'album';
  tracks?: { data: DeezerTrack[] };
}

export interface DeezerTrack {
  id: number;
  readable: boolean;
  title: string;
  title_short: string;
  title_version?: string;
  isrc?: string;
  link: string;
  duration: number;
  track_position?: number;
  disk_number?: number;
  rank: number;
  explicit_lyrics: boolean;
  explicit_content_lyrics?: number;
  explicit_content_cover?: number;
  preview: string;
  md5_image?: string;
  artist: DeezerArtist;
  album?: DeezerAlbum;
  type: 'track';
}

export interface DeezerChart {
  tracks: { data: DeezerTrack[] };
  albums: { data: DeezerAlbum[] };
  artists: { data: DeezerArtist[] };
  playlists: { data: any[] };
}

export interface DeezerSearchResponse<T> {
  data: T[];
  total: number;
  next?: string;
  prev?: string;
}

/**
 * DeezerService - Servicio de integración con Deezer API
 *
 * PROPÓSITO:
 * - Obtener datos reales de álbumes, artistas y canciones desde Deezer
 * - No requiere autenticación para datos públicos
 * - Reemplaza la necesidad de Spotify API
 *
 * ENDPOINTS PRINCIPALES:
 * - /chart: Top álbumes, artistas y tracks
 * - /search: Búsqueda de álbumes, artistas, tracks
 * - /album/{id}: Detalles de un álbum
 * - /artist/{id}: Detalles de un artista
 * - /track/{id}: Detalles de una canción
 *
 * NOTA: Usa CORS proxy para evitar problemas de CORS en desarrollo
 */
@Injectable({
  providedIn: 'root'
})
export class DeezerService {
  private readonly http = inject(HttpClient);

  // Caché para chart data
  private chartCache$: Observable<DeezerChart> | null = null;

  // ==========================================================================
  // MÉTODOS PRIVADOS - UTILIDADES
  // ==========================================================================

  /**
   * Construye la URL con proxy CORS
   *
   * Usamos corsproxy.io en todos los entornos porque:
   * - Deezer no tiene headers CORS (Access-Control-Allow-Origin)
   * - Deezer bloquea peticiones desde servidores (anti-bot)
   * - corsproxy.io simula un navegador real y funciona en producción
   */
  private buildUrl(endpoint: string): string {
    const normalizedEndpoint = endpoint.startsWith('/') ? endpoint : `/${endpoint}`;
    const fullUrl = `${DEEZER_CONFIG.apiBaseUrl}${normalizedEndpoint}`;

    // Usar proxy CORS en todos los entornos (browser)
    if (typeof window !== 'undefined') {
      return `${DEEZER_CONFIG.corsProxy}${encodeURIComponent(fullUrl)}`;
    }

    // Fallback para SSR (no aplica en este proyecto)
    return fullUrl;
  }

  // ==========================================================================
  // CHARTS - ÁLBUMES POPULARES (Equivalente a "New Releases")
  // ==========================================================================

  /**
   * Obtiene el chart global de Deezer (álbumes, artistas, tracks populares)
   */
  getChart(): Observable<DeezerChart> {
    const url = this.buildUrl('/chart');
    return this.http.get<DeezerChart>(url).pipe(
      catchError(error => {
        console.error('Error obteniendo chart de Deezer:', error);
        return of({
          tracks: { data: [] },
          albums: { data: [] },
          artists: { data: [] },
          playlists: { data: [] }
        });
      })
    );
  }

  /**
   * Obtiene charts con caché (shareReplay)
   * Evita múltiples peticiones al cargar la página
   */
  getChartCached(): Observable<DeezerChart> {
    if (!this.chartCache$) {
      this.chartCache$ = this.getChart().pipe(
        shareReplay(1)
      );
    }
    return this.chartCache$;
  }

  /**
   * Obtiene álbumes del chart (equivalente a getNewReleases de Spotify)
   */
  getChartAlbums(limit: number = 50): Observable<DeezerAlbum[]> {
    const url = this.buildUrl(`/chart/0/albums?limit=${limit}`);
    return this.http.get<{ data: DeezerAlbum[] }>(url).pipe(
      map(response => response.data || []),
      catchError(error => {
        console.error('Error obteniendo álbumes del chart:', error);
        return of([]);
      })
    );
  }

  /**
   * Obtiene artistas del chart
   */
  getChartArtists(limit: number = 50): Observable<DeezerArtist[]> {
    const url = this.buildUrl(`/chart/0/artists?limit=${limit}`);
    return this.http.get<{ data: DeezerArtist[] }>(url).pipe(
      map(response => response.data || []),
      catchError(error => {
        console.error('Error obteniendo artistas del chart:', error);
        return of([]);
      })
    );
  }

  /**
   * Obtiene tracks del chart
   */
  getChartTracks(limit: number = 50): Observable<DeezerTrack[]> {
    const url = this.buildUrl(`/chart/0/tracks?limit=${limit}`);
    return this.http.get<{ data: DeezerTrack[] }>(url).pipe(
      map(response => response.data || []),
      catchError(error => {
        console.error('Error obteniendo tracks del chart:', error);
        return of([]);
      })
    );
  }

  // ==========================================================================
  // ÁLBUMES
  // ==========================================================================

  /**
   * Obtiene un álbum por su ID
   */
  getAlbumById(albumId: number | string): Observable<DeezerAlbum | null> {
    const url = this.buildUrl(`/album/${albumId}`);
    return this.http.get<DeezerAlbum>(url).pipe(
      catchError(error => {
        console.error('Error obteniendo álbum:', error);
        return of(null);
      })
    );
  }

  /**
   * Busca álbumes por query
   */
  searchAlbums(query: string, limit: number = 25): Observable<DeezerAlbum[]> {
    if (!query.trim()) {
      return of([]);
    }

    const url = this.buildUrl(`/search/album?q=${encodeURIComponent(query)}&limit=${limit}`);
    return this.http.get<DeezerSearchResponse<DeezerAlbum>>(url).pipe(
      map(response => response.data || []),
      catchError(error => {
        console.error('Error buscando álbumes:', error);
        return of([]);
      })
    );
  }

  /**
   * Obtiene los tracks de un álbum
   */
  getAlbumTracks(albumId: number | string): Observable<DeezerTrack[]> {
    const url = this.buildUrl(`/album/${albumId}/tracks?limit=100`);
    return this.http.get<{ data: DeezerTrack[] }>(url).pipe(
      map(response => response.data || []),
      catchError(error => {
        console.error('Error obteniendo tracks del álbum:', error);
        return of([]);
      })
    );
  }

  // ==========================================================================
  // ARTISTAS
  // ==========================================================================

  /**
   * Obtiene un artista por su ID
   */
  getArtistById(artistId: number | string): Observable<DeezerArtist | null> {
    const url = this.buildUrl(`/artist/${artistId}`);
    return this.http.get<DeezerArtist>(url).pipe(
      catchError(error => {
        console.error('Error obteniendo artista:', error);
        return of(null);
      })
    );
  }

  /**
   * Busca artistas por query
   */
  searchArtists(query: string, limit: number = 25): Observable<DeezerArtist[]> {
    if (!query.trim()) {
      return of([]);
    }

    const url = this.buildUrl(`/search/artist?q=${encodeURIComponent(query)}&limit=${limit}`);
    return this.http.get<DeezerSearchResponse<DeezerArtist>>(url).pipe(
      map(response => response.data || []),
      catchError(error => {
        console.error('Error buscando artistas:', error);
        return of([]);
      })
    );
  }

  /**
   * Obtiene los álbumes de un artista
   */
  getArtistAlbums(artistId: number | string, limit: number = 25): Observable<DeezerAlbum[]> {
    const url = this.buildUrl(`/artist/${artistId}/albums?limit=${limit}`);
    return this.http.get<{ data: DeezerAlbum[] }>(url).pipe(
      map(response => response.data || []),
      catchError(error => {
        console.error('Error obteniendo álbumes del artista:', error);
        return of([]);
      })
    );
  }

  /**
   * Obtiene los top tracks de un artista
   */
  getArtistTopTracks(artistId: number | string, limit: number = 10): Observable<DeezerTrack[]> {
    const url = this.buildUrl(`/artist/${artistId}/top?limit=${limit}`);
    return this.http.get<{ data: DeezerTrack[] }>(url).pipe(
      map(response => response.data || []),
      catchError(error => {
        console.error('Error obteniendo top tracks del artista:', error);
        return of([]);
      })
    );
  }

  // ==========================================================================
  // TRACKS / CANCIONES
  // ==========================================================================

  /**
   * Obtiene un track por su ID
   */
  getTrackById(trackId: number | string): Observable<DeezerTrack | null> {
    const url = this.buildUrl(`/track/${trackId}`);
    return this.http.get<DeezerTrack>(url).pipe(
      catchError(error => {
        console.error('Error obteniendo track:', error);
        return of(null);
      })
    );
  }

  /**
   * Busca tracks por query
   */
  searchTracks(query: string, limit: number = 25): Observable<DeezerTrack[]> {
    if (!query.trim()) {
      return of([]);
    }

    const url = this.buildUrl(`/search/track?q=${encodeURIComponent(query)}&limit=${limit}`);
    return this.http.get<DeezerSearchResponse<DeezerTrack>>(url).pipe(
      map(response => response.data || []),
      catchError(error => {
        console.error('Error buscando tracks:', error);
        return of([]);
      })
    );
  }

  // ==========================================================================
  // BÚSQUEDA GLOBAL
  // ==========================================================================

  /**
   * Búsqueda global (álbumes, artistas, tracks)
   */
  search(query: string, limit: number = 25): Observable<{
    albums: DeezerAlbum[];
    artists: DeezerArtist[];
    tracks: DeezerTrack[];
  }> {
    if (!query.trim()) {
      return of({ albums: [], artists: [], tracks: [] });
    }

    const url = this.buildUrl(`/search?q=${encodeURIComponent(query)}&limit=${limit}`);
    return this.http.get<DeezerSearchResponse<DeezerTrack>>(url).pipe(
      map(response => ({
        albums: [],
        artists: [],
        tracks: response.data || []
      })),
      catchError(error => {
        console.error('Error en búsqueda global:', error);
        return of({ albums: [], artists: [], tracks: [] });
      })
    );
  }

  // ==========================================================================
  // GÉNEROS
  // ==========================================================================

  /**
   * Obtiene todos los géneros disponibles
   */
  getGenres(): Observable<{ id: number; name: string; picture: string }[]> {
    const url = this.buildUrl('/genre');
    return this.http.get<{ data: { id: number; name: string; picture: string }[] }>(url).pipe(
      map(response => response.data || []),
      catchError(error => {
        console.error('Error obteniendo géneros:', error);
        return of([]);
      })
    );
  }

  // ==========================================================================
  // UTILIDADES DE MAPEO
  // ==========================================================================

  /**
   * Obtiene la mejor imagen disponible de un álbum
   * Prioriza cover_big (500x500), luego cover_medium (250x250)
   */
  getBestAlbumCover(album: DeezerAlbum, preferBig: boolean = true): string {
    if (preferBig && album.cover_big) return album.cover_big;
    if (album.cover_xl) return album.cover_xl;
    if (album.cover_big) return album.cover_big;
    if (album.cover_medium) return album.cover_medium;
    return album.cover || 'https://picsum.photos/seed/default/400/400';
  }

  /**
   * Obtiene la mejor imagen de un artista
   */
  getBestArtistPicture(artist: DeezerArtist, preferBig: boolean = true): string {
    if (preferBig && artist.picture_big) return artist.picture_big;
    if (artist.picture_xl) return artist.picture_xl;
    if (artist.picture_big) return artist.picture_big;
    if (artist.picture_medium) return artist.picture_medium;
    return artist.picture || 'https://picsum.photos/seed/artist/400/400';
  }

  /**
   * Convierte duración de segundos a formato mm:ss
   */
  formatDuration(seconds: number): string {
    const minutes = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${minutes}:${secs.toString().padStart(2, '0')}`;
  }

  /**
   * Extrae el año de release_date
   */
  extractYear(releaseDate: string): number {
    if (!releaseDate) return new Date().getFullYear();
    return parseInt(releaseDate.substring(0, 4), 10);
  }

  /**
   * Limpia el caché
   */
  clearCache(): void {
    this.chartCache$ = null;
  }
}
