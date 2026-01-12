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

  // Datos del usuario (se cargan desde AppStateService)
  userProfile = signal({
    name: '',
    avatarUrl: 'assets/profile-placeholder.svg',
    memberSince: '',
    totalReviews: 0,
    totalAlbums: 0
  });

  // Géneros favoritos (se cargarán dinámicamente)
  favoriteGenres = signal<string[]>([]);

  // Reseñas del usuario (se cargan desde ReviewStateService)
  reviews = signal<Review[]>([]);

  // Álbumes escuchados (se cargan desde el backend)
  albums = signal<Album[]>([]);

  ngOnInit(): void {
    this.loadUserData();
  }

  /**
   * Cargar datos del usuario desde los servicios
   */
  private loadUserData(): void {
    const user = this.appState.currentUser();

    if (user) {
      this.userProfile.set({
        name: user.username,
        avatarUrl: user.avatarUrl || 'assets/profile-placeholder.svg',
        memberSince: '', // TODO: obtener fecha de registro desde backend
        totalReviews: this.reviewState.userReviewsCount(),
        totalAlbums: 0 // Se actualizará cuando tengamos endpoint de álbumes escuchados
      });

      // Cargar reseñas del usuario
      this.reviewState.loadUserReviews(user.id);
    }

    // Finalizar carga
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
