import { Injectable } from '@angular/core';
import { Observable, of, delay, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Artist, Album } from '../models/data.models';
import { BaseHttpService } from './base-http.service';
import { API_ENDPOINTS } from '../config/api.config';

/**
 * ArtistService - Servicio de gestión de artistas
 *
 * ARQUITECTURA: Hereda de BaseHttpService
 * - Operaciones CRUD completas (GET, POST, PUT, PATCH, DELETE)
 * - Métodos HTTP listos para producción (comentados)
 * - Datos mock para desarrollo (activos)
 * - Búsqueda y filtrado de artistas
 *
 * MIGRACIÓN A API REAL:
 * 1. Descomentar métodos HTTP (getArtistByIdHttp, etc.)
 * 2. Cambiar los métodos públicos para usar las versiones HTTP
 * 3. Eliminar o comentar datos mock
 *
 * @example
 * ```typescript
 * // Desarrollo (actual)
 * getArtistById(id: string) {
 *   return this.getArtistByIdMock(id);
 * }
 *
 * // Producción (cuando backend esté listo)
 * getArtistById(id: string) {
 *   return this.getArtistByIdHttp(id);
 * }
 * ```
 */
@Injectable({
  providedIn: 'root'
})
export class ArtistService extends BaseHttpService {

  // Datos mock para desarrollo
  private mockArtists: Artist[] = [
    {
      id: 'artist-1',
      name: 'Pink Floyd',
      bio: 'Pink Floyd es una banda de rock progresivo inglesa formada en Londres en 1965. Conocidos por su música psicodélica y experimental, letras filosóficas y elaborados espectáculos en vivo.',
      photoUrl: 'https://picsum.photos/seed/artist1/400/400',
      genre: 'Progressive Rock',
      activeYears: '1965-1995, 2005-2014',
      albums: 15,
      monthlyListeners: 25000000
    },
    {
      id: 'artist-2',
      name: 'The Beatles',
      bio: 'The Beatles fueron una banda de rock inglesa formada en Liverpool en 1960. Son considerados la banda más influyente de todos los tiempos.',
      photoUrl: 'https://picsum.photos/seed/artist2/400/400',
      genre: 'Rock',
      activeYears: '1960-1970',
      albums: 13,
      monthlyListeners: 35000000
    },
    {
      id: 'artist-3',
      name: 'Michael Jackson',
      bio: 'El Rey del Pop. Icono cultural y uno de los artistas más significativos del siglo XX.',
      photoUrl: 'https://picsum.photos/seed/artist3/400/400',
      genre: 'Pop',
      activeYears: '1964-2009',
      albums: 10,
      monthlyListeners: 30000000
    }
  ];

  // ==============================================
  // MÉTODOS PÚBLICOS - OPERACIONES CRUD
  // ==============================================

  /**
   * [GET] Obtiene todos los artistas
   */
  getAllArtists(): Observable<Artist[]> {
    return this.getAllArtistsMock();
    // return this.getAllArtistsHttp(); // ⬅️ Descomentar para usar API real
  }

  /**
   * [GET] Obtiene un artista por su ID
   */
  getArtistById(id: string): Observable<Artist | null> {
    return this.getArtistByIdMock(id);
    // return this.getArtistByIdHttp(id); // ⬅️ Descomentar para usar API real
  }

  /**
   * [POST] Crea un nuevo artista
   */
  createArtist(artist: Omit<Artist, 'id'>): Observable<Artist> {
    return this.createArtistMock(artist);
    // return this.createArtistHttp(artist); // ⬅️ Descomentar para usar API real
  }

  /**
   * [PUT] Actualiza un artista completo
   */
  updateArtist(id: string, artist: Artist): Observable<Artist> {
    return this.updateArtistMock(id, artist);
    // return this.updateArtistHttp(id, artist); // ⬅️ Descomentar para usar API real
  }

  /**
   * [PATCH] Actualiza parcialmente un artista
   */
  patchArtist(id: string, updates: Partial<Artist>): Observable<Artist> {
    return this.patchArtistMock(id, updates);
    // return this.patchArtistHttp(id, updates); // ⬅️ Descomentar para usar API real
  }

  /**
   * [DELETE] Elimina un artista
   */
  deleteArtist(id: string): Observable<void> {
    return this.deleteArtistMock(id);
    // return this.deleteArtistHttp(id); // ⬅️ Descomentar para usar API real
  }

  /**
   * [GET] Busca artistas por término
   */
  searchArtists(query: string): Observable<Artist[]> {
    return this.searchArtistsMock(query);
    // return this.searchArtistsHttp(query); // ⬅️ Descomentar para usar API real
  }

  /**
   * [GET] Obtiene los álbumes de un artista
   */
  getArtistAlbums(artistId: string): Observable<Album[]> {
    return this.getArtistAlbumsMock(artistId);
    // return this.getArtistAlbumsHttp(artistId); // ⬅️ Descomentar para usar API real
  }

  // ==============================================
  // MÉTODOS HTTP (Listos para producción)
  // ==============================================

  private getAllArtistsHttp(): Observable<Artist[]> {
    return this.get<Artist[]>(API_ENDPOINTS.artists.getAll);
  }

  private getArtistByIdHttp(id: string): Observable<Artist | null> {
    return this.get<Artist>(API_ENDPOINTS.artists.getById(id)).pipe(
      catchError(error => {
        if (error.status === 404) {
          return of(null);
        }
        return throwError(() => error);
      })
    );
  }

  private createArtistHttp(artist: Omit<Artist, 'id'>): Observable<Artist> {
    return this.post<Artist>(API_ENDPOINTS.artists.create, artist);
  }

  private updateArtistHttp(id: string, artist: Artist): Observable<Artist> {
    return this.put<Artist>(API_ENDPOINTS.artists.update(id), artist);
  }

  private patchArtistHttp(id: string, updates: Partial<Artist>): Observable<Artist> {
    return this.patch<Artist>(API_ENDPOINTS.artists.update(id), updates);
  }

  private deleteArtistHttp(id: string): Observable<void> {
    return this.delete<void>(API_ENDPOINTS.artists.delete(id));
  }

  private searchArtistsHttp(query: string): Observable<Artist[]> {
    return this.get<Artist[]>(API_ENDPOINTS.artists.search, {
      params: { q: query }
    });
  }

  private getArtistAlbumsHttp(artistId: string): Observable<Album[]> {
    return this.get<Album[]>(API_ENDPOINTS.artists.getAlbums(artistId));
  }

  // ==============================================
  // MÉTODOS MOCK (Desarrollo)
  // ==============================================

  private getAllArtistsMock(): Observable<Artist[]> {
    return of(this.mockArtists).pipe(delay(300));
  }

  private getArtistByIdMock(id: string): Observable<Artist | null> {
    const artist = this.mockArtists.find(a => a.id === id);

    if (!artist) {
      return throwError(() => new Error(`Artist with id ${id} not found`)).pipe(delay(300));
    }

    return of(artist).pipe(delay(500));
  }

  private createArtistMock(artist: Omit<Artist, 'id'>): Observable<Artist> {
    const newArtist: Artist = {
      ...artist,
      id: `artist-${Date.now()}`
    };

    this.mockArtists.push(newArtist);

    return of(newArtist).pipe(delay(400));
  }

  private updateArtistMock(id: string, artist: Artist): Observable<Artist> {
    const index = this.mockArtists.findIndex(a => a.id === id);

    if (index === -1) {
      return throwError(() => new Error(`Artist with id ${id} not found`)).pipe(delay(300));
    }

    this.mockArtists[index] = { ...artist, id };

    return of(this.mockArtists[index]).pipe(delay(400));
  }

  private patchArtistMock(id: string, updates: Partial<Artist>): Observable<Artist> {
    const index = this.mockArtists.findIndex(a => a.id === id);

    if (index === -1) {
      return throwError(() => new Error(`Artist with id ${id} not found`)).pipe(delay(300));
    }

    this.mockArtists[index] = {
      ...this.mockArtists[index],
      ...updates,
      id
    };

    return of(this.mockArtists[index]).pipe(delay(400));
  }

  private deleteArtistMock(id: string): Observable<void> {
    const index = this.mockArtists.findIndex(a => a.id === id);

    if (index === -1) {
      return throwError(() => new Error(`Artist with id ${id} not found`)).pipe(delay(300));
    }

    this.mockArtists.splice(index, 1);

    return of(void 0).pipe(delay(400));
  }

  private searchArtistsMock(query: string): Observable<Artist[]> {
    const results = this.mockArtists.filter(artist =>
      artist.name.toLowerCase().includes(query.toLowerCase()) ||
      artist.genre.toLowerCase().includes(query.toLowerCase())
    );
    return of(results).pipe(delay(400));
  }

  private getArtistAlbumsMock(artistId: string): Observable<Album[]> {
    // TODO: Implementar cuando tengamos datos relacionales
    return of([]).pipe(delay(300));
  }
}
