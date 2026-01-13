import { Injectable, inject } from '@angular/core';
import { Observable, of, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { Artist, Album, ArtistaResponse, mapArtistaResponseToLegacy } from '../models/data.models';
import { BaseHttpService } from './base-http.service';
import { API_CONFIG, API_ENDPOINTS } from '../config/api.config';
import { DeezerService, DeezerArtist, DeezerAlbum } from './deezer.service';
import { MockDeezerService } from './mock-deezer.service';
import { environment } from '../../environments/environment';

/**
 * ArtistService - Servicio de gestión de artistas
 *
 * ARQUITECTURA HÍBRIDA:
 * - Datos de Deezer para artistas reales
 * - Backend propio para artistas personalizados y relaciones
 */
@Injectable({
  providedIn: 'root'
})
export class ArtistService extends BaseHttpService {
  private deezer = inject(DeezerService);
  private mockDeezer = inject(MockDeezerService);

  private get useMock(): boolean {
    return environment.useMockData;
  }

  // ==========================================================================
  // MÉTODOS PRINCIPALES
  // ==========================================================================

  /**
   * Obtiene artistas populares del chart
   */
  getPopularArtists(limit: number = 25): Observable<Artist[]> {
    const source = this.useMock ? this.mockDeezer : this.deezer;
    return source.getChartArtists(limit).pipe(
      map(artists => artists.map(a => this.mapDeezerArtistToArtist(a))),
      catchError(() => of([]))
    );
  }

  /**
   * Obtiene un artista por su ID
   */
  getArtistById(id: string): Observable<Artist | null> {
    if (this.useMock) {
      return this.mockDeezer.getArtistById(id).pipe(
        map(artist => artist ? this.mapDeezerArtistToArtist(artist) : null)
      );
    }
    return this.deezer.getArtistById(id).pipe(
      map(artist => artist ? this.mapDeezerArtistToArtist(artist) : null),
      catchError(() => this.getArtistByIdBackend(id))
    );
  }

  /**
   * Busca artistas por término
   */
  searchArtists(query: string): Observable<Artist[]> {
    const source = this.useMock ? this.mockDeezer : this.deezer;
    return source.searchArtists(query, 25).pipe(
      map(artists => artists.map(a => this.mapDeezerArtistToArtist(a))),
      catchError(() => of([]))
    );
  }

  /**
   * Obtiene los álbumes de un artista
   */
  getArtistAlbums(artistId: string): Observable<Album[]> {
    const source = this.useMock ? this.mockDeezer : this.deezer;
    return source.getArtistAlbums(artistId, 25).pipe(
      map(albums => albums.map(a => this.mapDeezerAlbumToAlbum(a))),
      catchError(() => of([]))
    );
  }

  /**
   * Obtiene los top tracks de un artista
   */
  getArtistTopTracks(artistId: string): Observable<any[]> {
    const source = this.useMock ? this.mockDeezer : this.deezer;
    return source.getArtistTopTracks(artistId, 10).pipe(
      map(tracks => tracks.map(t => ({
        id: String(t.id),
        title: t.title,
        duration: source.formatDuration(t.duration),
        previewUrl: t.preview,
        coverUrl: t.album?.cover_medium || ''
      }))),
      catchError(() => of([]))
    );
  }

  /**
   * Obtiene todos los artistas (desde backend)
   */
  getAllArtists(): Observable<Artist[]> {
    return this.get<ArtistaResponse[]>(`${API_CONFIG.baseUrl}${API_ENDPOINTS.artistas.getAll}`).pipe(
      map(artistas => artistas.map(a => mapArtistaResponseToLegacy(a))),
      catchError(() => of([]))
    );
  }

  // ==========================================================================
  // OPERACIONES CRUD (Backend)
  // ==========================================================================

  /**
   * Crea un nuevo artista
   */
  createArtist(artist: Omit<Artist, 'id'>): Observable<Artist> {
    const dto = { nombreArtista: artist.name };

    return this.post<ArtistaResponse>(`${API_CONFIG.baseUrl}${API_ENDPOINTS.artistas.create}`, dto).pipe(
      map(response => mapArtistaResponseToLegacy(response))
    );
  }

  /**
   * Actualiza un artista
   */
  updateArtist(id: string, artist: Artist): Observable<Artist> {
    const numericId = parseInt(id, 10);
    const dto = { nombreArtista: artist.name };

    return this.put<ArtistaResponse>(`${API_CONFIG.baseUrl}${API_ENDPOINTS.artistas.update(numericId)}`, dto).pipe(
      map(response => mapArtistaResponseToLegacy(response))
    );
  }

  /**
   * Actualiza parcialmente un artista
   */
  patchArtist(id: string, updates: Partial<Artist>): Observable<Artist> {
    const numericId = parseInt(id, 10);
    const dto: any = {};
    if (updates.name) dto.nombreArtista = updates.name;

    return this.patch<ArtistaResponse>(`${API_CONFIG.baseUrl}${API_ENDPOINTS.artistas.update(numericId)}`, dto).pipe(
      map(response => mapArtistaResponseToLegacy(response))
    );
  }

  /**
   * Elimina un artista
   */
  deleteArtist(id: string): Observable<void> {
    const numericId = parseInt(id, 10);
    return this.delete<void>(`${API_CONFIG.baseUrl}${API_ENDPOINTS.artistas.delete(numericId)}`);
  }

  // ==========================================================================
  // MÉTODOS DE BACKEND
  // ==========================================================================

  private getArtistByIdBackend(id: string): Observable<Artist | null> {
    const numericId = parseInt(id, 10);
    if (isNaN(numericId)) {
      return of(null);
    }

    return this.get<ArtistaResponse>(`${API_CONFIG.baseUrl}${API_ENDPOINTS.artistas.getById(numericId)}`).pipe(
      map(response => mapArtistaResponseToLegacy(response)),
      catchError(error => {
        if (error.status === 404) {
          return of(null);
        }
        return throwError(() => error);
      })
    );
  }

  // ==========================================================================
  // MAPEO DEEZER → MODELO FRONTEND
  // ==========================================================================

  private mapDeezerArtistToArtist(deezerArtist: DeezerArtist): Artist {
    return {
      id: String(deezerArtist.id),
      name: deezerArtist.name,
      bio: '',
      photoUrl: this.deezer.getBestArtistPicture(deezerArtist),
      genre: '',
      activeYears: '',
      albums: deezerArtist.nb_album || 0,
      monthlyListeners: deezerArtist.nb_fan || 0
    };
  }

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
}
