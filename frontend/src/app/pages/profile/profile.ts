import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Card } from '../../components/shared/card/card';

type TabType = 'reviews' | 'albums';

interface Review {
  id: number;
  albumTitle: string;
  albumArtist: string;
  albumImageUrl: string;
  rating: number;
  reviewText: string;
  date: string;
}

interface Album {
  id: number;
  title: string;
  artist: string;
  imageUrl: string;
  rating?: number;
  listenedDate: string;
}

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [CommonModule, Card],
  templateUrl: './profile.html',
  styleUrls: ['./profile.scss']
})
export default class ProfileComponent {
  // Tab activo
  activeTab = signal<TabType>('reviews');

  // Datos del usuario
  userProfile = {
    name: 'PerreteGordete',
    avatarUrl: 'assets/profile-placeholder.jpg',
    memberSince: 'Enero 2025',
    totalReviews: 42,
    totalAlbums: 156
  };

  // Géneros favoritos (badges)
  favoriteGenres = [
    'Heavy Metal 50%',
    'J-Pop 25%',
    'Pop Internacional 7%',
    'Metal 8%',
    'Rock 10%'
  ];

  // Mock data - Reseñas
  reviews = signal<Review[]>([
    {
      id: 1,
      albumTitle: 'Random Access Memories',
      albumArtist: 'Daft Punk',
      albumImageUrl: 'https://via.placeholder.com/200',
      rating: 5,
      reviewText: 'Una obra maestra del pop electrónico. Cada pista es un viaje.',
      date: '2025-12-15'
    },
    {
      id: 2,
      albumTitle: 'The Dark Side of the Moon',
      albumArtist: 'Pink Floyd',
      albumImageUrl: 'https://via.placeholder.com/200',
      rating: 5,
      reviewText: 'Álbum conceptual perfecto. Producción impecable.',
      date: '2025-12-10'
    },
    {
      id: 3,
      albumTitle: 'Thriller',
      albumArtist: 'Michael Jackson',
      albumImageUrl: 'https://via.placeholder.com/200',
      rating: 4,
      reviewText: 'El rey del pop en su máximo esplendor. Temas inolvidables.',
      date: '2025-12-05'
    }
  ]);

  // Mock data - Álbumes escuchados
  albums = signal<Album[]>([
    {
      id: 1,
      title: 'Avantasia',
      artist: 'Avantasia',
      imageUrl: 'https://via.placeholder.com/200',
      rating: 5,
      listenedDate: '2025-12-20'
    },
    {
      id: 2,
      title: 'De Aquí No Sales Vivo',
      artist: 'Calle 13',
      imageUrl: 'https://via.placeholder.com/200',
      rating: 4,
      listenedDate: '2025-12-18'
    },
    {
      id: 3,
      title: 'Black Sabbath',
      artist: 'Black Sabbath',
      imageUrl: 'https://via.placeholder.com/200',
      rating: 5,
      listenedDate: '2025-12-15'
    },
    {
      id: 4,
      title: 'Los Funkcheros Cabrones',
      artist: 'Varios',
      imageUrl: 'https://via.placeholder.com/200',
      rating: 3,
      listenedDate: '2025-12-12'
    },
    {
      id: 5,
      title: 'Hammer King',
      artist: 'Hammer King',
      imageUrl: 'https://via.placeholder.com/200',
      rating: 4,
      listenedDate: '2025-12-10'
    },
    {
      id: 6,
      title: 'Holy Diver',
      artist: 'Dio',
      imageUrl: 'https://via.placeholder.com/200',
      rating: 5,
      listenedDate: '2025-12-08'
    },
    {
      id: 7,
      title: 'Random Access Memories',
      artist: 'Daft Punk',
      imageUrl: 'https://via.placeholder.com/200',
      rating: 5,
      listenedDate: '2025-12-05'
    },
    {
      id: 8,
      title: 'The Last Stand',
      artist: 'Sabaton',
      imageUrl: 'https://via.placeholder.com/200',
      rating: 4,
      listenedDate: '2025-12-01'
    }
  ]);

  // Cambiar tab activo
  setActiveTab(tab: TabType): void {
    this.activeTab.set(tab);
  }

  // Verificar si un tab está activo
  isTabActive(tab: TabType): boolean {
    return this.activeTab() === tab;
  }

  // Handlers para las acciones
  viewReview(reviewId: number): void {
    console.log('Ver reseña:', reviewId);
  }

  viewAlbum(albumId: number): void {
    console.log('Ver álbum:', albumId);
  }

  editProfile = (): void => {
    console.log('Editar perfil');
  }

  shareProfile = (): void => {
    console.log('Compartir perfil');
  }
}
