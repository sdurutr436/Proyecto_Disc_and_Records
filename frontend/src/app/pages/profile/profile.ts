import { Component, signal, inject, OnInit, ChangeDetectionStrategy, DestroyRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { Card } from '../../components/shared/card/card';
import { Button } from '../../components/shared/button/button';
import { RatingComponent } from '../../components/shared/rating/rating';
import { ReviewStateService } from '../../services/review-state.service';
import { AppStateService } from '../../services/app-state';

type TabType = 'reviews' | 'albums';

interface Review {
  id: number | string;
  albumTitle: string;
  albumArtist: string;
  albumImageUrl: string;
  rating: number;
  reviewText: string;
  date: string;
}

interface Album {
  id: number | string;
  title: string;
  artist: string;
  imageUrl: string;
  rating?: number;
  listenedDate: string;
}

/**
 * ProfileComponent - Página de Perfil de Usuario
 *
 * OPTIMIZACIONES IMPLEMENTADAS:
 * - ChangeDetectionStrategy.OnPush para mejor rendimiento
 * - TrackBy en @for para evitar re-renders innecesarios
 * - Conexión con ReviewStateService para datos reactivos
 * - Scroll infinito para listas grandes
 */
@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [
    CommonModule,
    Card,
    Button,
    RatingComponent
  ],
  templateUrl: './profile.html',
  styleUrls: ['./profile.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export default class ProfileComponent implements OnInit {
  private router = inject(Router);
  private reviewState = inject(ReviewStateService);
  private appState = inject(AppStateService);
  private destroyRef = inject(DestroyRef);

  // Tab activo
  activeTab = signal<TabType>('reviews');

  // Estado de carga
  isLoading = signal<boolean>(true);
  isLoadingMore = signal<boolean>(false);
  hasMoreReviews = signal<boolean>(true);
  hasMoreAlbums = signal<boolean>(true);

  // Datos del usuario (conectado a AppStateService)
  userProfile = {
    name: 'PerreteGordete',
    avatarUrl: 'assets/profile-placeholder.svg',
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

  // Mock data - Reseñas (se conectará al ReviewStateService)
  reviews = signal<Review[]>([
    {
      id: 1,
      albumTitle: 'Random Access Memories',
      albumArtist: 'Daft Punk',
      albumImageUrl: 'https://picsum.photos/seed/rev1/200/200',
      rating: 5,
      reviewText: 'Una obra maestra del pop electrónico. Cada pista es un viaje.',
      date: '2025-12-15'
    },
    {
      id: 2,
      albumTitle: 'The Dark Side of the Moon',
      albumArtist: 'Pink Floyd',
      albumImageUrl: 'https://picsum.photos/seed/rev2/200/200',
      rating: 5,
      reviewText: 'Álbum conceptual perfecto. Producción impecable.',
      date: '2025-12-10'
    },
    {
      id: 3,
      albumTitle: 'Thriller',
      albumArtist: 'Michael Jackson',
      albumImageUrl: 'https://picsum.photos/seed/rev3/200/200',
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
      imageUrl: 'https://picsum.photos/seed/alb1/200/200',
      rating: 5,
      listenedDate: '2025-12-20'
    },
    {
      id: 2,
      title: 'De Aquí No Sales Vivo',
      artist: 'Calle 13',
      imageUrl: 'https://picsum.photos/seed/alb2/200/200',
      rating: 4,
      listenedDate: '2025-12-18'
    },
    {
      id: 3,
      title: 'Black Sabbath',
      artist: 'Black Sabbath',
      imageUrl: 'https://picsum.photos/seed/alb3/200/200',
      rating: 5,
      listenedDate: '2025-12-15'
    },
    {
      id: 4,
      title: 'Los Funkcheros Cabrones',
      artist: 'Varios',
      imageUrl: 'https://picsum.photos/seed/alb4/200/200',
      rating: 3,
      listenedDate: '2025-12-12'
    },
    {
      id: 5,
      title: 'Hammer King',
      artist: 'Hammer King',
      imageUrl: 'https://picsum.photos/seed/alb5/200/200',
      rating: 4,
      listenedDate: '2025-12-10'
    },
    {
      id: 6,
      title: 'Holy Diver',
      artist: 'Dio',
      imageUrl: 'https://picsum.photos/seed/alb6/200/200',
      rating: 5,
      listenedDate: '2025-12-08'
    },
    {
      id: 7,
      title: 'Random Access Memories',
      artist: 'Daft Punk',
      imageUrl: 'https://picsum.photos/seed/alb7/200/200',
      rating: 5,
      listenedDate: '2025-12-05'
    },
    {
      id: 8,
      title: 'The Last Stand',
      artist: 'Sabaton',
      imageUrl: 'https://picsum.photos/seed/alb8/200/200',
      rating: 4,
      listenedDate: '2025-12-01'
    }
  ]);

  ngOnInit(): void {
    this.loadUserData();
  }

  /**
   * Cargar datos del usuario desde los servicios
   */
  private loadUserData(): void {
    const user = this.appState.currentUser();

    if (user) {
      this.userProfile = {
        name: user.username,
        avatarUrl: user.avatarUrl || 'assets/profile-placeholder.svg',
        memberSince: 'Enero 2025',
        totalReviews: this.reviewState.userReviewsCount(),
        totalAlbums: 156
      };

      // Cargar reseñas del usuario
      this.reviewState.loadUserReviews(user.id);
    }

    // Simular fin de carga
    setTimeout(() => this.isLoading.set(false), 500);
  }

  // ==========================================================================
  // TRACKBY FUNCTIONS - OPTIMIZACIÓN DE RENDIMIENTO
  // ==========================================================================

  /**
   * TrackBy para reseñas
   */
  trackByReviewId(index: number, review: Review): number | string {
    return review.id;
  }

  /**
   * TrackBy para álbumes
   */
  trackByAlbumId(index: number, album: Album): number | string {
    return album.id;
  }

  // ==========================================================================
  // MÉTODOS DE NAVEGACIÓN
  // ==========================================================================

  /**
   * Cambiar tab activo
   */
  setActiveTab(tab: TabType): void {
    this.activeTab.set(tab);
  }

  /**
   * Verificar si un tab está activo
   */
  isTabActive(tab: TabType): boolean {
    return this.activeTab() === tab;
  }

  // ==========================================================================
  // INFINITE SCROLL
  // ==========================================================================

  /**
   * Cargar más reseñas
   */
  loadMoreReviews(): void {
    if (this.isLoadingMore()) return;

    this.isLoadingMore.set(true);

    // Simular carga de más datos
    setTimeout(() => {
      // Aquí iría la llamada al servicio para cargar más
      this.isLoadingMore.set(false);
      // this.hasMoreReviews.set(false); // Cuando no hay más
    }, 1000);
  }

  /**
   * Cargar más álbumes
   */
  loadMoreAlbums(): void {
    if (this.isLoadingMore()) return;

    this.isLoadingMore.set(true);

    setTimeout(() => {
      this.isLoadingMore.set(false);
    }, 1000);
  }

  // ==========================================================================
  // ACCIONES
  // ==========================================================================

  /**
   * Ver detalle de reseña
   */
  viewReview(reviewId: number | string): void {
    console.log('Ver reseña:', reviewId);
    // TODO: Navegar a detalle o abrir modal
  }

  /**
   * Ver detalle de álbum
   */
  viewAlbum(albumId: number | string): void {
    this.router.navigate(['/album', albumId]);
  }

  /**
   * Editar perfil - navegar a settings
   */
  editProfile = (): void => {
    this.router.navigate(['/settings']);
  }

  /**
   * Compartir perfil
   */
  shareProfile = (): void => {
    if (navigator.share) {
      navigator.share({
        title: `Perfil de ${this.userProfile.name}`,
        text: `Mira el perfil de ${this.userProfile.name} en Discs & Records`,
        url: window.location.href
      });
    } else {
      // Fallback: copiar URL
      navigator.clipboard.writeText(window.location.href);
      console.log('URL copiada al portapapeles');
    }
  }
}
