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
 * - Métodos HTTP listos para producción (comentados)
 * - Datos mock para desarrollo (activos)
 * - Fácil cambio entre mock y API real
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
  // MÉTODOS PÚBLICOS (Actualmente usan MOCK)
  // ==============================================

  /**
   * Obtiene un artista por su ID
   *
   * ACTUAL: Usa datos mock
   * PRODUCCIÓN: Cambiar a getArtistByIdHttp(id)
   */
  getArtistById(id: string): Observable<Artist | null> {
    return this.getArtistByIdMock(id);
    // return this.getArtistByIdHttp(id); // ⬅️ Descomentar para usar API real
  }

  /**
   * Obtiene los álbumes de un artista
   *
   * ACTUAL: Usa datos mock
   * PRODUCCIÓN: Cambiar a getArtistAlbumsHttp(artistId)
   */
  getArtistAlbums(artistId: string): Observable<Album[]> {
    return this.getArtistAlbumsMock(artistId);
    // return this.getArtistAlbumsHttp(artistId); // ⬅️ Descomentar para usar API real
  }

  /**
   * Busca artistas por término
   *
   * ACTUAL: Usa datos mock
   * PRODUCCIÓN: Cambiar a searchArtistsHttp(query)
   */
  searchArtists(query: string): Observable<Artist[]> {
    return this.searchArtistsMock(query);
    // return this.searchArtistsHttp(query); // ⬅️ Descomentar para usar API real
  }

  /**
   * Obtiene todos los artistas
   *
   * ACTUAL: Usa datos mock
   * PRODUCCIÓN: Cambiar a getAllArtistsHttp()
   */
  getAllArtists(): Observable<Artist[]> {
    return this.getAllArtistsMock();
    // return this.getAllArtistsHttp(); // ⬅️ Descomentar para usar API real
  }

  // ==============================================
  // MÉTODOS HTTP (Listos para producción)
  // ==============================================

  /**
   * [HTTP] Obtiene un artista por su ID desde la API
   *
   * Endpoint: GET /api/artists/:id
   *
   * @param id - ID del artista
   * @returns Observable con el artista o null si no existe
   */
  private getArtistByIdHttp(id: string): Observable<Artist | null> {
    return this.get<Artist>(API_ENDPOINTS.artists.getById(id)).pipe(
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
   * [HTTP] Obtiene los álbumes de un artista desde la API
   *
   * Endpoint: GET /api/artists/:id/albums
   */
  private getArtistAlbumsHttp(artistId: string): Observable<Album[]> {
    return this.get<Album[]>(API_ENDPOINTS.artists.getAlbums(artistId));
  }

  /**
   * [HTTP] Busca artistas desde la API
   *
   * Endpoint: GET /api/artists/search?q=query
   */
  private searchArtistsHttp(query: string): Observable<Artist[]> {
    return this.get<Artist[]>(API_ENDPOINTS.artists.search, {
      params: { q: query }
    });
  }

  /**
   * [HTTP] Obtiene todos los artistas desde la API
   *
   * Endpoint: GET /api/artists
   */
  private getAllArtistsHttp(): Observable<Artist[]> {
    return this.get<Artist[]>(API_ENDPOINTS.artists.getAll);
  }

  // ==============================================
  // MÉTODOS MOCK (Desarrollo)
  // ==============================================

  /**
   * [MOCK] Obtiene un artista por su ID
   * Simula latencia de red con delay
   */
  private getArtistByIdMock(id: string): Observable<Artist | null> {
    const artist = this.mockArtists.find(a => a.id === id);

    if (!artist) {
      return throwError(() => new Error(`Artist with id ${id} not found`)).pipe(delay(300));
    }

    return of(artist).pipe(delay(500));
  }

  /**
   * [MOCK] Obtiene los álbumes de un artista
   */
  private getArtistAlbumsMock(artistId: string): Observable<Album[]> {
    // TODO: Implementar cuando tengamos datos relacionales
    return of([]).pipe(delay(300));
  }

  /**
   * [MOCK] Busca artistas por término
   */
  private searchArtistsMock(query: string): Observable<Artist[]> {
    const results = this.mockArtists.filter(artist =>
      artist.name.toLowerCase().includes(query.toLowerCase()) ||
      artist.genre.toLowerCase().includes(query.toLowerCase())
    );
    return of(results).pipe(delay(400));
  }

  /**
   * [MOCK] Obtiene todos los artistas
   */
  private getAllArtistsMock(): Observable<Artist[]> {
    return of(this.mockArtists).pipe(delay(300));
  }
}
