import { Injectable } from '@angular/core';
import { Observable, of, delay, throwError } from 'rxjs';
import { Song, Review } from '../models/data.models';

/**
 * Servicio para gestionar datos de canciones
 * TODO: Reemplazar datos mock con llamadas HTTP reales al backend
 */
@Injectable({
  providedIn: 'root'
})
export class SongService {

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

  /**
   * Obtiene una canción por su ID
   * Simula latencia de red con delay
   */
  getSongById(id: string): Observable<Song | null> {
    const song = this.mockSongs.find(s => s.id === id);

    if (!song) {
      return throwError(() => new Error(`Song with id ${id} not found`)).pipe(delay(300));
    }

    return of(song).pipe(delay(500));
  }

  /**
   * Obtiene las reseñas de una canción
   */
  getSongReviews(songId: string): Observable<Review[]> {
    const reviews = this.mockReviews[songId] || [];
    return of(reviews).pipe(delay(300));
  }

  /**
   * Busca canciones por término
   */
  searchSongs(query: string): Observable<Song[]> {
    const results = this.mockSongs.filter(song =>
      song.title.toLowerCase().includes(query.toLowerCase()) ||
      song.artist.toLowerCase().includes(query.toLowerCase()) ||
      song.album.toLowerCase().includes(query.toLowerCase()) ||
      song.genre.toLowerCase().includes(query.toLowerCase())
    );
    return of(results).pipe(delay(400));
  }

  /**
   * Obtiene todas las canciones
   */
  getAllSongs(): Observable<Song[]> {
    return of(this.mockSongs).pipe(delay(300));
  }
}
