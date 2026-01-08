import { Component, signal, inject, output } from '@angular/core';
import { Carousel } from '../../components/shared/carousel/carousel';
import { Card } from '../../components/shared/card/card';
import { SearchBar } from '../../components/shared/search-bar/search-bar';
import { Button } from '../../components/shared/button/button';
import { RatingComponent } from '../../components/shared/rating/rating';

// Mock data para álbumes (temporal hasta conectar con el backend)
interface Album {
  id: number;
  title: string;
  artist: string;
  imageUrl: string;
  rating?: number;
  reviewCount?: number;
}

@Component({
  selector: 'app-home',
  imports: [Carousel, Card, SearchBar, Button, RatingComponent],
  templateUrl: './home.html',
  styleUrl: './home.scss',
})
export class Home {
  // Output para comunicación con el componente padre (si se necesita)
  registerRequest = output<void>();

  // Mock data para los carruseles
  trendingAlbums = signal<Album[]>([
    {
      id: 1,
      title: 'Random Access Memories',
      artist: 'Daft Punk',
      imageUrl: '/assets/album-placeholder.jpg',
      rating: 4.5,
    },
    {
      id: 2,
      title: 'The Dark Side of the Moon',
      artist: 'Pink Floyd',
      imageUrl: '/assets/album-placeholder.jpg',
      rating: 5.0,
    },
    {
      id: 3,
      title: 'Abbey Road',
      artist: 'The Beatles',
      imageUrl: '/assets/album-placeholder.jpg',
      rating: 4.8,
    },
    {
      id: 4,
      title: 'Thriller',
      artist: 'Michael Jackson',
      imageUrl: '/assets/album-placeholder.jpg',
      rating: 4.7,
    },
    {
      id: 5,
      title: 'Back in Black',
      artist: 'AC/DC',
      imageUrl: '/assets/album-placeholder.jpg',
      rating: 4.6,
    },
    {
      id: 6,
      title: 'The Wall',
      artist: 'Pink Floyd',
      imageUrl: '/assets/album-placeholder.jpg',
      rating: 4.9,
    },
  ]);

  recentReviews = signal<Album[]>([
    {
      id: 7,
      title: 'OK Computer',
      artist: 'Radiohead',
      imageUrl: '/assets/album-placeholder.jpg',
      reviewCount: 156,
    },
    {
      id: 8,
      title: 'Rumours',
      artist: 'Fleetwood Mac',
      imageUrl: '/assets/album-placeholder.jpg',
      reviewCount: 203,
    },
    {
      id: 9,
      title: 'Nevermind',
      artist: 'Nirvana',
      imageUrl: '/assets/album-placeholder.jpg',
      reviewCount: 189,
    },
    {
      id: 10,
      title: 'Led Zeppelin IV',
      artist: 'Led Zeppelin',
      imageUrl: '/assets/album-placeholder.jpg',
      reviewCount: 167,
    },
    {
      id: 11,
      title: 'The Joshua Tree',
      artist: 'U2',
      imageUrl: '/assets/album-placeholder.jpg',
      reviewCount: 145,
    },
    {
      id: 12,
      title: 'Hotel California',
      artist: 'Eagles',
      imageUrl: '/assets/album-placeholder.jpg',
      reviewCount: 178,
    },
  ]);

  /**
   * Manejar búsqueda
   */
  handleSearch(searchTerm: string): void {
    console.log('Buscando:', searchTerm);
    // TODO: Implementar lógica de búsqueda cuando se conecte con el backend
  }

  /**
   * Abrir modal de registro
   * Por ahora solo emite evento, pero esto debería integrarse con el Header
   */
  openRegisterModal(): void {
    // Disparar el custom event que el header puede escuchar
    if (typeof window !== 'undefined') {
      window.dispatchEvent(new CustomEvent('open-register-modal'));
    }
  }

  /**
   * Ver detalles del álbum
   */
  viewAlbumDetails(albumId: number): void {
    console.log('Ver álbum:', albumId);
    // TODO: Navegar a la página de detalles del álbum
  }
}

