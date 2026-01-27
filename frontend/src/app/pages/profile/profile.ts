import { Component, signal, inject, OnInit, ChangeDetectionStrategy, DestroyRef, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, ActivatedRoute } from '@angular/router';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { Card, CardAction } from '../../components/shared/card/card';
import { Button } from '../../components/shared/button/button';
import { RatingComponent } from '../../components/shared/rating/rating';
import { Tabs, Tab } from '../../components/shared/tabs/tabs';
import { SearchBar } from '../../components/shared/search-bar/search-bar';
import { Carousel } from '../../components/shared/carousel/carousel';
import { ReviewStateService } from '../../services/review-state.service';
import { AppStateService } from '../../services/app-state';
import { ListaAlbumService } from '../../services/lista-album.service';
import { Review, Album, AlbumEnLista, mapResenaToLegacy, UsuarioResponse } from '../../models/data.models';
import { environment } from '../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { API_CONFIG } from '../../config/api.config';
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
  private listaAlbumService = inject(ListaAlbumService);
  private http = inject(HttpClient);
  private destroyRef = inject(DestroyRef);

  // ========================================
  // SIGNALS - MODO PÚBLICO VS PROPIO
  // ========================================
  isPublicProfile = signal<boolean>(false);
  viewingUserId = signal<number | null>(null);
  isOwnProfile = computed(() => {
    const currentUser = this.appState.currentUser();
    const viewingId = this.viewingUserId();
    return !this.isPublicProfile() || (currentUser && viewingId === currentUser.id);
  });

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
    avatarUrl: 'assets/profile-placeholder.svg',
    memberSince: '2023-01-15'
  });

  // ========================================
  // SIGNALS - GÉNEROS (1/3 izquierda)
  // ========================================
  genreStats = signal<GenreStats[]>([]);

  // ========================================
  // COMPUTED - BADGES Y ACTIONS PARA CARD PROFILE
  // ========================================
  /**
   * Genera los badges de géneros en formato string[] para el card component
   * Muestra top 5 géneros con porcentaje
   */
  genreBadges = computed((): string[] => {
    return this.genreStats().map(genre => `${genre.name} ${genre.percentage}%`);
  });

  /**
   * Genera las acciones para el card de perfil
   * Solo muestra "Editar" si es el perfil propio
   */
  profileActions = computed((): CardAction[] => {
    if (!this.isOwnProfile()) {
      return [];
    }
    return [
      {
        label: '✏️ Editar Perfil',
        variant: 'primary',
        callback: () => this.editProfile()
      }
    ];
  });

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
    // Scroll al inicio de la página
    window.scrollTo({ top: 0, behavior: 'auto' });

    // Detectar si es perfil público (ruta /user/:id)
    const routeData = this.route.snapshot.data;
    const isPublic = routeData['isPublicProfile'] === true;
    this.isPublicProfile.set(isPublic);

    if (isPublic) {
      // Obtener ID del usuario de la URL
      const userId = this.route.snapshot.paramMap.get('id');
      if (userId) {
        const numericId = parseInt(userId, 10);
        this.viewingUserId.set(numericId);
        this.loadPublicUserData(numericId);
      }
    } else {
      // Perfil propio
      this.loadUserData();
    }

    this.calculateGenresFromAlbums();
  }

  /**
   * Cargar datos de un usuario público desde el backend
   */
  private loadPublicUserData(userId: number): void {
    if (environment.useMockData) {
      // Modo mock - simular datos
      this.userProfile.set({
        name: `Usuario ${userId}`,
        avatarUrl: 'assets/profile-placeholder.svg',
        memberSince: '2023-01-15'
      });
      setTimeout(() => this.isLoading.set(false), 300);
      return;
    }

    // Cargar usuario real desde backend
    this.http.get<UsuarioResponse>(`${API_CONFIG.baseUrl}/usuarios/${userId}`)
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe({
        next: (user) => {
          this.userProfile.set({
            name: user.nombreUsuario,
            avatarUrl: user.avatar || 'assets/profile-placeholder.svg',
            memberSince: user.fechaRegistro
          });

          // Cargar álbumes y reseñas del usuario
          this.loadUserAlbumsAndReviews(userId);
        },
        error: () => {
          // Usuario no encontrado - redirigir a 404
          this.router.navigate(['/not-found']);
        }
      });
  }

  /**
   * Cargar álbumes y reseñas de un usuario desde el backend
   */
  private loadUserAlbumsAndReviews(userId: number): void {
    if (environment.useMockData) {
      this.isLoading.set(false);
      return;
    }

    // Cargar lista de álbumes
    this.listaAlbumService.getListaUsuario(userId).subscribe({
      next: (albums) => {
        const mappedAlbums: Album[] = albums.map(a => ({
          id: String(a.albumId),
          title: a.titulo,
          artist: a.artista || 'Desconocido',
          artistId: '',
          coverUrl: a.portadaUrl || 'assets/album-placeholder.svg',
          releaseYear: a.anio,
          genre: '',
          tracks: 0,
          duration: '',
          label: '',
          description: '',
          averageRating: a.puntuacion ?? 0,
          totalReviews: 0
        }));
        this.allUserAlbums.set(mappedAlbums);
        this.calculateGenresFromAlbums();
      }
    });

    // Cargar reseñas del usuario
    this.listaAlbumService.getResenasUsuario(userId).subscribe({
      next: (resenas) => {
        const reviews: ReviewWithAlbumData[] = resenas.map(r => ({
          id: `${r.usuarioId}-${r.albumId}`,
          userId: String(r.usuarioId),
          userName: r.nombreUsuario,
          userAvatar: r.avatarUsuario || 'assets/profile-placeholder.svg',
          rating: r.puntuacion,
          content: r.textoResena,
          date: new Date(r.fechaResena),
          likes: 0,
          albumImageUrl: r.portadaUrl || 'assets/album-placeholder.svg',
          albumTitle: r.tituloAlbum,
          albumArtist: ''
        }));
        this.allUserReviews.set(reviews);
      },
      complete: () => this.isLoading.set(false)
    });
  }

  /**
   * Cargar datos del usuario propio desde los servicios
   */
  private loadUserData(): void {
    const user = this.appState.currentUser();

    if (user) {
      this.viewingUserId.set(user.id);
      this.userProfile.set({
        name: user.username,
        avatarUrl: user.avatarUrl || 'assets/profile-placeholder.svg',
        memberSince: '2023-01-15' // TODO: obtener fecha de registro desde backend
      });

      // Cargar datos reales si no estamos en modo mock
      if (!environment.useMockData) {
        this.loadUserAlbumsAndReviews(user.id);
        return;
      }
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
