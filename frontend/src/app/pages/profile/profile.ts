import { Component, signal, inject, OnInit, ChangeDetectionStrategy, DestroyRef, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, ActivatedRoute } from '@angular/router';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { Card } from '../../components/shared/card/card';
import { Button } from '../../components/shared/button/button';
import { RatingComponent } from '../../components/shared/rating/rating';
import { Badge } from '../../components/shared/badge/badge';
import { Tabs, Tab } from '../../components/shared/tabs/tabs';
import { SearchBar } from '../../components/shared/search-bar/search-bar';
import { Carousel } from '../../components/shared/carousel/carousel';
import { ReviewStateService } from '../../services/review-state.service';
import { AppStateService } from '../../services/app-state';
import { Review, Album } from '../../models/data.models';
import {
  calculateGenreStats,
  paginateReviews,
  filterAlbums,
  MOCK_USER_ALBUMS,
  MOCK_USER_REVIEWS,
  GenreStats,
  PaginatedReviews
} from '../../services/mock-data';

type TabType = 'reviews' | 'albums';

/**
 * Tipo extendido de Review para incluir información del álbum
 * Usado en la plantilla para mostrar datos del álbum al que pertenece la reseña
 */
type ReviewWithAlbumData = Review & {
  albumImageUrl: string;
  albumTitle: string;
  albumArtist: string;
};

/**
 * Interfaz para PaginatedReviewsWithAlbumData
 * Personalizada para usar ReviewWithAlbumData en lugar de Review
 */
interface PaginatedReviewsWithAlbumData extends Omit<PaginatedReviews, 'reviews'> {
  reviews: ReviewWithAlbumData[];
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
    RatingComponent,
    Badge,
    Tabs,
    SearchBar,
    Carousel
  ],
  templateUrl: './profile.html',
  styleUrls: ['./profile.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export default class ProfileComponent implements OnInit {
  private router = inject(Router);
  private route = inject(ActivatedRoute);
  private reviewState = inject(ReviewStateService);
  private appState = inject(AppStateService);
  private destroyRef = inject(DestroyRef);

  // ========================================
  // SIGNALS - ESTADO PRINCIPAL
  // ========================================

  // Tab activo
  activeTab = signal<TabType>('reviews');

  // Estado de carga
  isLoading = signal<boolean>(true);

  // Datos del usuario
  userProfile = signal({
    name: 'Usuario Mock',
    avatarUrl: 'https://picsum.photos/seed/user/200',
    memberSince: '2023-01-15'
  });

  // ========================================
  // SIGNALS - GÉNEROS (1/3 izquierda)
  // ========================================
  genreStats = signal<GenreStats[]>([]);

  // ========================================
  // SIGNALS - RESEÑAS CON PAGINACIÓN (Tab 1)
  // ========================================
  allUserReviews = signal<ReviewWithAlbumData[]>(MOCK_USER_REVIEWS as ReviewWithAlbumData[]);
  currentReviewPage = signal<number>(1);
  reviewsPageSize = signal<number>(3);

  paginatedReviews = computed((): PaginatedReviewsWithAlbumData => {
    const paginated = paginateReviews(
      this.allUserReviews(),
      this.currentReviewPage(),
      this.reviewsPageSize()
    );
    return paginated as PaginatedReviewsWithAlbumData;
  });

  currentReviews = computed(() => this.paginatedReviews().reviews);
  totalReviewPages = computed(() => this.paginatedReviews().totalPages);

  // ========================================
  // SIGNALS - ÁLBUMES CON BÚSQUEDA (Tab 2)
  // ========================================
  allUserAlbums = signal<Album[]>(MOCK_USER_ALBUMS);
  albumSearchTerm = signal<string>('');

  filteredAlbums = computed(() => {
    return filterAlbums(this.allUserAlbums(), this.albumSearchTerm());
  });

  // ========================================
  // SIGNALS - TABS CONFIGURATION
  // ========================================
  profileTabs = signal<Tab[]>([
    { id: 'reviews', label: 'Reseñas' },
    { id: 'albums', label: 'Álbumes' }
  ]);

  // ========================================
  // COMPUTED - ESTADO VACÍO
  // ========================================
  hasReviews = computed(() => this.allUserReviews().length > 0);
  hasAlbums = computed(() => this.allUserAlbums().length > 0);
  hasFilteredAlbums = computed(() => this.filteredAlbums().length > 0);

  ngOnInit(): void {
    this.loadUserData();
    this.calculateGenresFromAlbums();
  }

  /**
   * Cargar datos del usuario desde los servicios
   */
  private loadUserData(): void {
    const user = this.appState.currentUser();

    if (user) {
      this.userProfile.set({
        name: user.username,
        avatarUrl: user.avatarUrl || 'https://picsum.photos/seed/user/200',
        memberSince: '2023-01-15' // TODO: obtener fecha de registro desde backend
      });
    }

    // Simular carga
    setTimeout(() => this.isLoading.set(false), 300);
  }

  /**
   * Calcular estadísticas de géneros desde los álbumes del usuario
   */
  private calculateGenresFromAlbums(): void {
    const stats = calculateGenreStats(this.allUserAlbums());
    this.genreStats.set(stats);
  }

  // ==========================================================================
  // MÉTODOS - NAVEGACIÓN DE TABS
  // ==========================================================================

  /**
   * Cambiar tab activo
   */
  onTabChange(tabId: string | number): void {
    this.activeTab.set(tabId as TabType);
  }

  /**
   * Verificar si un tab está activo
   */
  isTabActive(tab: TabType): boolean {
    return this.activeTab() === tab;
  }

  // ==========================================================================
  // MÉTODOS - PAGINACIÓN DE RESEÑAS (TAB 1)
  // ==========================================================================

  /**
   * Ir a página anterior de reseñas
   */
  previousReviewPage(): void {
    const current = this.currentReviewPage();
    if (current > 1) {
      this.currentReviewPage.set(current - 1);
      this.scrollToReviews();
    }
  }

  /**
   * Ir a página siguiente de reseñas
   */
  nextReviewPage(): void {
    const current = this.currentReviewPage();
    const total = this.totalReviewPages();
    if (current < total) {
      this.currentReviewPage.set(current + 1);
      this.scrollToReviews();
    }
  }

  /**
   * Scroll suave a la sección de reseñas
   */
  private scrollToReviews(): void {
    setTimeout(() => {
      const element = document.querySelector('.profile-reviews');
      if (element) {
        element.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }, 100);
  }

  /**
   * Determinar si el botón anterior está deshabilitado
   */
  canPreviousReview = computed(() => this.currentReviewPage() > 1);

  /**
   * Determinar si el botón siguiente está deshabilitado
   */
  canNextReview = computed(() => this.currentReviewPage() < this.totalReviewPages());

  // ==========================================================================
  // MÉTODOS - BÚSQUEDA DE ÁLBUMES (TAB 2)
  // ==========================================================================

  /**
   * Actualizar término de búsqueda de álbumes
   * Emitido por el componente search-bar
   */
  onSearchAlbums(searchTerm: string): void {
    this.albumSearchTerm.set(searchTerm);
  }

  /**
   * Formatear fecha de reseña
   */
  formatDate(date: string | Date): string {
    const dateObj = typeof date === 'string' ? new Date(date) : date;
    return dateObj.toLocaleDateString('es-ES', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  }

  /**
   * Ver detalle de reseña (click en card)
   */
  viewReview(reviewId: string | number): void {
    console.log('Ver reseña:', reviewId);
  }

  /**
   * Ver detalle de álbum
   */
  viewAlbum(albumId: string | number): void {
    this.router.navigate(['/album', albumId]);
  }

  /**
   * Editar perfil
   */
  editProfile = (): void => {
    this.router.navigate(['/settings/profile']);
  };

  // ==========================================================================
  // TRACKBY FUNCTIONS - OPTIMIZACIÓN DE RENDIMIENTO
  // ==========================================================================

  trackByReviewId(index: number, review: Review): string | number {
    return review.id;
  }

  trackByAlbumId(index: number, album: Album): string | number {
    return album.id;
  }

  trackByGenreIndex(index: number): number {
    return index;
  }
}
