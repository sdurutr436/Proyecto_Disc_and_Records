import { Injectable } from '@angular/core';
import { Observable, of, delay, throwError } from 'rxjs';
import { Artist, Album } from '../models/data.models';

/**
 * Servicio para gestionar datos de artistas
 * TODO: Reemplazar datos mock con llamadas HTTP reales al backend
 */
@Injectable({
  providedIn: 'root'
})
export class ArtistService {

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

  /**
   * Obtiene un artista por su ID
   * Simula latencia de red con delay
   */
  getArtistById(id: string): Observable<Artist | null> {
    const artist = this.mockArtists.find(a => a.id === id);

    if (!artist) {
      return throwError(() => new Error(`Artist with id ${id} not found`)).pipe(delay(300));
    }

    return of(artist).pipe(delay(500));
  }

  /**
   * Obtiene los álbumes de un artista
   */
  getArtistAlbums(artistId: string): Observable<Album[]> {
    // TODO: Implementar cuando tengamos datos relacionales
    return of([]).pipe(delay(300));
  }

  /**
   * Busca artistas por término
   */
  searchArtists(query: string): Observable<Artist[]> {
    const results = this.mockArtists.filter(artist =>
      artist.name.toLowerCase().includes(query.toLowerCase()) ||
      artist.genre.toLowerCase().includes(query.toLowerCase())
    );
    return of(results).pipe(delay(400));
  }

  /**
   * Obtiene todos los artistas
   */
  getAllArtists(): Observable<Artist[]> {
    return of(this.mockArtists).pipe(delay(300));
  }
}
