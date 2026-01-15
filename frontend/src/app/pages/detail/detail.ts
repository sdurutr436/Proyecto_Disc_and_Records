import { Component, OnInit, OnDestroy, signal, computed, inject, effect } from '@angular/core';
import { CommonModule, ViewportScroller } from '@angular/common';
import { ActivatedRoute, Router, RouterModule, NavigationExtras } from '@angular/router';
import { Subscription, forkJoin, of } from 'rxjs';
import { FormsModule } from '@angular/forms';
import { Button } from '../../components/shared/button/button';
import { Spinner } from '../../components/shared/spinner/spinner';
import { Alert } from '../../components/shared/alert/alert';
import { FormTextarea } from '../../components/shared/form-textarea/form-textarea';
import { RatingComponent } from '../../components/shared/rating/rating';
import { Badge } from '../../components/shared/badge/badge';
import { Tabs, Tab } from '../../components/shared/tabs/tabs';
import { InfiniteScrollComponent } from '../../components/shared/infinite-scroll/infinite-scroll';
import { Album, Artist, Song, Track, Review, ResenaAlbumResponse, mapResenaToLegacy, AlbumStats } from '../../models/data.models';
import { AlbumService } from '../../services/album.service';
import { ArtistService } from '../../services/artist.service';
import { SongService } from '../../services/song.service';
import { ListaAlbumService } from '../../services/lista-album.service';
import { ReviewStateService } from '../../services/review-state.service';
import { AppStateService } from '../../services/app-state';
import { NotificationStreamService } from '../../services/notification-stream';
import { environment } from '../../../environments/environment';

// Type para el item unificado (puede ser Album, Artist o Song)
type DetailItem = Album | Artist | Song;

// Interface para estadísticas
interface DetailStats {
  averageRating: number;
  totalRatings: number;
  totalReviews: number;
}

// Interface para reseña del usuario
interface UserReview {
  text: string;
  date: Date;
  rating: number;
}

@Component({
  selector: 'app-detail',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    RouterModule,
    Button,
    Spinner,
    Alert,
    FormTextarea,
    RatingComponent,
    Badge,
    Tabs,
    InfiniteScrollComponent
  ],
  templateUrl: './detail.html',
  styleUrl: './detail.scss'
})
export class DetailComponent implements OnInit, OnDestroy {
  private fragmentSubscription?: Subscription;

  // ========================================
  // SERVICIOS INYECTADOS
  // ========================================
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private viewportScroller = inject(ViewportScroller);
  private albumService = inject(AlbumService);
  private artistService = inject(ArtistService);
  private songService = inject(SongService);
  private listaAlbumService = inject(ListaAlbumService);
  private reviewStateService = inject(ReviewStateService);
  private appState = inject(AppStateService);
  private notifications = inject(NotificationStreamService);

  // ========================================
  // SIGNALS - Estado principal
  // ========================================
  item = signal<DetailItem | null>(null);
  trackList = signal<Track[]>([]);
  reviews = signal<Review[]>([]);
  userRating = signal<number>(0);
  reviewText = signal<string>('');
  isWritingReview = signal<boolean>(false);
  isLoadingReviews = signal<boolean>(false);

  // ========================================
  // SIGNALS - Estado del usuario (mock)
  // ========================================
  isInUserList = signal<boolean>(false);
  userReview = signal<UserReview | null>(null);

  // ========================================
  // SIGNALS - Estadísticas
  // ========================================
  stats = signal<DetailStats>({
    averageRating: 0,
    totalRatings: 0,
    totalReviews: 0
  });

  // ========================================
  // SIGNALS - Control de carga
  // ========================================
  isLoadingEstado = signal<boolean>(false);
  isSubmittingRating = signal<boolean>(false);
  needsListFirst = signal<boolean>(false);

  // ========================================
  // SIGNALS - Tabs
  // ========================================
  activeTabId = signal<string | number>('info');
  detailTabs = signal<Tab[]>([
    { id: 'info', label: 'Información' },
    { id: 'tracks', label: 'Canciones' },
    { id: 'reviews', label: 'Reseñas' }
  ]);

  // ========================================
  // SIGNALS - Infinite scroll para reseñas
  // ========================================
  displayedReviews = signal<Review[]>([]);
  hasMoreReviews = signal<boolean>(true);
  isLoadingMoreReviews = signal<boolean>(false);
  private reviewsPageSize = 5;
  private reviewsPage = 0;

  // ========================================
  // DATOS MOCK - Canciones del álbum
  // ========================================
  private mockTracks: Track[] = [
    { id: '1', number: 1, title: 'Intro - The Beginning', duration: '1:45' },
    { id: '2', number: 2, title: 'Rise of the Phoenix', duration: '4:32' },
    { id: '3', number: 3, title: 'Midnight Dreams', duration: '3:58' },
    { id: '4', number: 4, title: 'Electric Sunset', duration: '5:12' },
    { id: '5', number: 5, title: 'Lost in Time', duration: '4:21' },
    { id: '6', number: 6, title: 'Neon Lights', duration: '3:47' },
    { id: '7', number: 7, title: 'The Journey Home', duration: '6:03' },
    { id: '8', number: 8, title: 'Starlight Boulevard', duration: '4:15' },
    { id: '9', number: 9, title: 'Echoes of Yesterday', duration: '3:52' },
    { id: '10', number: 10, title: 'Final Chapter', duration: '5:28' }
  ];

  // ========================================
  // DATOS MOCK - Reseñas de la comunidad
  // ========================================
  private mockReviews: Review[] = [
    { id: '1', userId: 'user1', userName: 'MusicLover92', userAvatar: 'assets/profile-placeholder.svg', rating: 5, content: 'Una obra maestra absoluta. Cada canción es perfecta y el álbum fluye de manera increíble.', date: new Date('2024-12-15'), likes: 45 },
    { id: '2', userId: 'user2', userName: 'VinylCollector', userAvatar: 'assets/profile-placeholder.svg', rating: 4, content: 'Gran producción y letras profundas. Solo le quito una estrella porque algunas canciones se sienten repetitivas.', date: new Date('2024-11-28'), likes: 23 },
    { id: '3', userId: 'user3', userName: 'RetroWave', userAvatar: 'assets/profile-placeholder.svg', rating: 5, content: 'Este álbum me transporta a otra época. La mezcla de estilos es arriesgada pero funciona perfectamente.', date: new Date('2024-10-05'), likes: 67 },
    { id: '4', userId: 'user4', userName: 'CriticalEar', userAvatar: 'assets/profile-placeholder.svg', rating: 3, content: 'Bueno, pero no excepcional. Esperaba más innovación considerando el tiempo entre este y su último trabajo.', date: new Date('2024-09-18'), likes: 12 },
    { id: '5', userId: 'user5', userName: 'SoundExplorer', userAvatar: 'assets/profile-placeholder.svg', rating: 5, content: 'Increíble desde la primera escucha. Los arreglos son complejos pero accesibles. Álbum del año sin duda.', date: new Date('2024-08-22'), likes: 89 },
    { id: '6', userId: 'user6', userName: 'MelodyHunter', userAvatar: 'assets/profile-placeholder.svg', rating: 4, content: 'Muy buen álbum con momentos brillantes. La producción es impecable aunque algunos tracks se sienten como relleno.', date: new Date('2024-07-10'), likes: 31 },
    { id: '7', userId: 'user7', userName: 'BassDropper', userAvatar: 'assets/profile-placeholder.svg', rating: 5, content: 'Los bajos en este álbum son una locura. Cada canción tiene una línea de bajo que te engancha inmediatamente.', date: new Date('2024-06-05'), likes: 54 },
    { id: '8', userId: 'user8', userName: 'AcousticSoul', userAvatar: 'assets/profile-placeholder.svg', rating: 2, content: 'No es para mí. Demasiado producido y artificial. Echo de menos el sonido más orgánico de sus primeros trabajos.', date: new Date('2024-05-20'), likes: 8 }
  ];

  // ========================================
  // HELPER - Validación de IDs numéricos
  // ========================================

  /**
   * Parsea un ID string a número, devuelve null si no es válido
   */
  private parseNumericId(id: string): number | null {
    const parsed = parseInt(id, 10);
    return isNaN(parsed) ? null : parsed;
  }

  // Computed properties para acceso seguro a propiedades de diferentes tipos
  itemTitle = computed(() => {
    const item = this.item();
    if (!item) return '';
    if ('title' in item) return item.title;
    if ('name' in item) return item.name;
    return '';
  });

  itemArtist = computed(() => {
    const item = this.item();
    if (!item) return '';
    if ('artist' in item) return item.artist;
    return '';
  });

  itemArtistId = computed(() => {
    const item = this.item();
    if (!item) return '';
    if ('artistId' in item) return item.artistId;
    return '';
  });

  itemCoverUrl = computed(() => {
    const item = this.item();
    if (!item) return '';
    if ('coverUrl' in item) return item.coverUrl;
    if ('photoUrl' in item) return item.photoUrl;
    return '';
  });

  itemType = computed((): 'album' | 'artist' | 'song' | null => {
    const item = this.item();
    if (!item) return null;
    if ('title' in item && 'tracks' in item && 'label' in item) return 'album';
    if ('name' in item && 'bio' in item) return 'artist';
    if ('title' in item && 'album' in item) return 'song';
    return null;
  });

  itemGenre = computed(() => {
    const item = this.item();
    if (!item) return '';
    if ('genre' in item) return item.genre;
    return '';
  });

  itemDescription = computed(() => {
    const item = this.item();
    if (!item) return '';
    if ('description' in item && item.description) return item.description;
    if ('bio' in item && item.bio) return item.bio;
    return 'No hay descripción disponible para este elemento.';
  });

  // Computed
  hasUserRated = computed(() => this.userRating() > 0);
  hasUserReview = computed(() => this.userReview() !== null);
  canSubmitReview = computed(() =>
    this.reviewText().trim().length >= 50 && this.userRating() > 0
  );

  // Verificar si el usuario está logueado
  isLoggedIn = computed(() => !!this.appState.currentUser());

  // Computed para mostrar contenido según tab activo
  isInfoTab = computed(() => this.activeTabId() === 'info');
  isTracksTab = computed(() => this.activeTabId() === 'tracks');
  isReviewsTab = computed(() => this.activeTabId() === 'reviews');

  constructor() {
    // Effect para recargar estado cuando cambia el usuario
    effect(() => {
      const user = this.appState.currentUser();
      const item = this.item();
      if (user && item && this.itemType() === 'album') {
        this.loadUserAlbumState(item.id);
      }
    });
  }

  ngOnInit(): void {
    // ✅ DATOS YA PRECARGADOS POR RESOLVER
    // Los datos vienen del resolver configurado en app.routes.ts
    const resolvedData = this.route.snapshot.data;

    // Determinar tipo de item según qué resolver se ejecutó
    if (resolvedData['album']) {
      const album = resolvedData['album'] as Album;
      this.item.set(album);
      this.loadAlbumDetails(album.id);
      // Cargar estado del usuario para este álbum
      this.loadUserAlbumState(album.id);
      // Cargar estadísticas reales del álbum
      this.loadAlbumStats(album.id);
    } else if (resolvedData['artist']) {
      const artist = resolvedData['artist'] as Artist;
      this.item.set(artist);
      this.loadArtistDetails(artist.id);
    } else if (resolvedData['song']) {
      const song = resolvedData['song'] as Song;
      this.item.set(song);
      this.loadSongDetails(song.id);
    }

    // Cargar primera página de reseñas para infinite scroll
    this.loadMoreReviews();

    // Leer estado pasado via NavigationExtras
    const navigationState = history.state;
    if (navigationState?.fromSearch) {
      console.log('Navegación desde búsqueda:', navigationState.searchTerm);
    }

    // Suscribirse a cambios en el fragment para scroll automático
    this.fragmentSubscription = this.route.fragment.subscribe(fragment => {
      if (fragment) {
        // Pequeño delay para asegurar que el DOM esté renderizado
        setTimeout(() => this.scrollToSection(fragment), 100);
      }
    });
  }

  ngOnDestroy(): void {
    this.fragmentSubscription?.unsubscribe();
  }

  // ========================================
  // CARGA DE DATOS - REAL Y MOCK
  // ========================================

  /**
   * Carga el estado del álbum para el usuario actual (en lista, puntuación, reseña)
   */
  private loadUserAlbumState(albumId: string): void {
    const user = this.appState.currentUser();
    if (!user) {
      // Usuario no logueado - resetear estados
      this.isInUserList.set(false);
      this.userRating.set(0);
      this.userReview.set(null);
      return;
    }

    if (environment.useMockData) {
      // Modo mock - usar datos simulados
      this.loadUserStateMock();
      return;
    }

    const albumIdNum = parseInt(albumId, 10);
    if (isNaN(albumIdNum)) {
      // ID no numérico (ej: álbumes de Deezer sin sincronizar)
      this.isInUserList.set(false);
      this.userRating.set(0);
      return;
    }

    this.isLoadingEstado.set(true);

    // Cargar estado del álbum para el usuario
    this.listaAlbumService.getEstadoAlbum(user.id, albumIdNum).subscribe({
      next: (estado) => {
        if (estado) {
          this.isInUserList.set(estado.enLista);
          this.userRating.set(estado.puntuacion ?? 0);
        } else {
          this.isInUserList.set(false);
          this.userRating.set(0);
        }
        this.isLoadingEstado.set(false);
      },
      error: () => {
        this.isInUserList.set(false);
        this.userRating.set(0);
        this.isLoadingEstado.set(false);
      }
    });

    // Cargar reseña del usuario si existe
    const existingReview = this.reviewStateService.getUserReviewForAlbum(albumId);
    if (existingReview) {
      this.userReview.set({
        text: existingReview.content,
        date: typeof existingReview.date === 'string' ? new Date(existingReview.date) : existingReview.date,
        rating: existingReview.rating
      });
    } else {
      this.userReview.set(null);
    }
  }

  /**
   * Carga estadísticas del álbum desde el backend
   */
  private loadAlbumStats(albumId: string): void {
    if (environment.useMockData) {
      // Modo mock - usar datos simulados
      this.stats.set({
        averageRating: 4.2,
        totalRatings: 1247,
        totalReviews: 89
      });
      return;
    }

    // Cargar stats reales desde el backend
    this.albumService.getAlbumStats(albumId).subscribe({
      next: (albumStats: AlbumStats) => {
        this.stats.set({
          averageRating: albumStats.averageRating ?? 0,
          totalRatings: albumStats.ratingCount,
          totalReviews: albumStats.reviewCount
        });
      },
      error: () => {
        // En caso de error, mantener stats en 0
        this.stats.set({ averageRating: 0, totalRatings: 0, totalReviews: 0 });
      }
    });
  }

  /**
   * Carga estado mock del usuario (para desarrollo)
   */
  private loadUserStateMock(): void {
    // Simular que el usuario ya ha interactuado con el álbum
    this.userRating.set(4);
    this.isInUserList.set(true);

    // Simular que el usuario ya tiene una reseña
    this.userReview.set({
      text: 'Este álbum ha sido una de las mejores sorpresas del año. La producción es impecable y cada canción tiene su propia identidad mientras mantiene la coherencia del conjunto. Recomendado al 100%.',
      date: new Date('2024-12-20'),
      rating: 4
    });
  }

  /**
   * Carga más reseñas para el infinite scroll
   */
  loadMoreReviews(): void {
    if (this.isLoadingMoreReviews() || !this.hasMoreReviews()) return;
    const item = this.item();
    if (!item) return;

    this.isLoadingMoreReviews.set(true);

    if (environment.useMockData) {
      // Modo mock - usar datos simulados
      this.loadMoreReviewsMock();
      return;
    }

    // Cargar reseñas reales del backend
    const albumIdNum = this.parseNumericId(item.id);
    if (!albumIdNum) {
      this.displayedReviews.set([]);
      this.hasMoreReviews.set(false);
      this.isLoadingMoreReviews.set(false);
      return;
    }

    this.listaAlbumService.getResenasAlbum(albumIdNum).subscribe({
      next: (resenas: ResenaAlbumResponse[]) => {
        const reviews = resenas.map(r => mapResenaToLegacy(r));
        this.displayedReviews.set(reviews);
        this.reviews.set(reviews);
        this.hasMoreReviews.set(false); // El backend ya devuelve todas (sin paginación por ahora)
        this.isLoadingMoreReviews.set(false);
      },
      error: () => {
        this.displayedReviews.set([]);
        this.hasMoreReviews.set(false);
        this.isLoadingMoreReviews.set(false);
      }
    });
  }

  /**
   * Carga más reseñas mock
   */
  private loadMoreReviewsMock(): void {
    // Simular carga asíncrona
    setTimeout(() => {
      const start = this.reviewsPage * this.reviewsPageSize;
      const end = start + this.reviewsPageSize;
      const newReviews = this.mockReviews.slice(start, end);

      if (newReviews.length > 0) {
        this.displayedReviews.update(current => [...current, ...newReviews]);
        this.reviewsPage++;
      }

      if (end >= this.mockReviews.length) {
        this.hasMoreReviews.set(false);
      }

      this.isLoadingMoreReviews.set(false);
    }, 800);
  }

  /**
   * Carga detalles adicionales de un álbum (tracks y reviews) - Usa datos mock
   */
  loadAlbumDetails(albumId: string): void {
    // Usar datos mock para tracks
    this.trackList.set(this.mockTracks);

    // Usar datos mock para reviews
    this.reviews.set(this.mockReviews);
  }

  /**
   * Carga detalles adicionales de un artista
   */
  loadArtistDetails(artistId: string): void {
    // TODO: Cargar álbumes del artista si es necesario
    this.loadReviews(artistId, 'artist');
  }

  /**
   * Carga detalles adicionales de una canción
   */
  loadSongDetails(songId: string): void {
    this.loadReviews(songId, 'song');
  }

  // MÉTODO LEGACY - Ya no se usa, datos vienen del resolver
  loadItemData(itemId: string): void {
    console.warn('loadItemData() is deprecated. Data should come from resolver.');
  }

  generateTracklistHTML(tracks: Track[]): string {
    return tracks.map(track =>
      `<div class="track-item" data-track-id="${track.id}">
        <span class="track-item__number">${track.number}.</span>
        <span class="track-item__title">${track.title}</span>
        <span class="track-item__duration">${track.duration}</span>
      </div>`
    ).join('');
  }

  /**
   * Carga reseñas según el tipo de item - Usa datos mock
   */
  loadReviews(itemId: string, type: 'album' | 'artist' | 'song'): void {
    this.isLoadingReviews.set(true);

    // Simular carga asíncrona con datos mock
    setTimeout(() => {
      this.reviews.set(this.mockReviews);
      this.isLoadingReviews.set(false);
    }, 500);
  }
  generateReviewsHTML(reviews: Review[]): string {
    if (reviews.length === 0) {
      return '<p class="no-reviews">No hay reseñas aún. ¡Sé el primero en escribir una!</p>';
    }

    return reviews.map(review => {
      const stars = '★'.repeat(review.rating) + '☆'.repeat(5 - review.rating);
      const dateObj = typeof review.date === 'string' ? new Date(review.date) : review.date;
      const dateStr = dateObj.toLocaleDateString('es-ES', { year: 'numeric', month: 'long', day: 'numeric' });
      const userName = review.userName || review.username || 'Usuario';

      return `<div class="review-card">
        <div class="review-card__header">
          <img src="${review.userAvatar}" alt="${userName}" class="review-card__avatar" />
          <div class="review-card__user-info">
            <h5 class="review-card__user-name">${userName}</h5>
            <div class="review-card__meta">
              <span class="review-card__rating">${stars}</span>
              <span class="review-card__date">${dateStr}</span>
            </div>
          </div>
        </div>
        <p class="review-card__content">${review.content}</p>
        <div class="review-card__footer">
          <button class="review-card__like-btn">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
            </svg>
            <span>${review.likes}</span>
          </button>
        </div>
      </div>`;
    }).join('');
  }

  // Rating system
  setRating(rating: number): void {
    const user = this.appState.currentUser();
    const item = this.item();

    if (!user) {
      // Usuario no logueado - mostrar mensaje
      this.needsListFirst.set(true);
      return;
    }

    if (!item) return;

    // Si no está en la lista, no puede puntuar
    if (!this.isInUserList()) {
      this.needsListFirst.set(true);
      return;
    }

    // Si está en modo mock, solo actualizar localmente
    if (environment.useMockData) {
      this.userRating.set(rating);
      console.log('Rating set (mock):', rating);
      return;
    }

    // Guardar en el backend
    const albumIdNum = this.parseNumericId(item.id);
    if (!albumIdNum) {
      this.needsListFirst.set(true);
      return;
    }

    this.isSubmittingRating.set(true);
    this.listaAlbumService.puntuarAlbum(albumIdNum, rating).subscribe({
      next: (result) => {
        if (result) {
          this.userRating.set(rating);
          // Recargar estadísticas del álbum
          this.loadAlbumStats(item.id);
        }
        this.isSubmittingRating.set(false);
      },
      error: () => {
        this.isSubmittingRating.set(false);
      }
    });
  }

  /**
   * Toggle lista del usuario - Añadir o quitar de la lista
   */
  toggleUserList(): void {
    const user = this.appState.currentUser();
    const item = this.item();

    if (!user) {
      // Usuario no autenticado - mostrar mensaje y abrir modal de login
      this.notifications.warning(
        'Sesión requerida',
        'Debes iniciar sesión o registrarte para añadir álbumes a tu lista'
      );
      // Disparar evento para abrir modal de login (escuchado por Header)
      if (typeof window !== 'undefined') {
        window.dispatchEvent(new CustomEvent('open-login-modal'));
      }
      return;
    }

    if (!item) return;

    if (environment.useMockData) {
      this.isInUserList.update(current => !current);
      console.log('Lista actualizada (mock):', this.isInUserList());
      return;
    }

    const albumIdNum = this.parseNumericId(item.id);
    if (!albumIdNum) return;

    if (this.isInUserList()) {
      // Quitar de la lista
      this.listaAlbumService.quitarDeLista(albumIdNum).subscribe({
        next: (success) => {
          if (success) {
            this.isInUserList.set(false);
            // La puntuación y reseña se ocultan pero no se eliminan
          }
        }
      });
    } else {
      // Añadir a la lista - usar el nuevo método con datos completos de Deezer
      // Cast a Album porque solo se puede agregar álbumes a la lista
      const album = item as Album;

      // DEBUG: Ver todos los datos del álbum
      console.log('🔍 DEBUG - Album completo:', {
        id: album.id,
        title: album.title,
        artist: album.artist,
        artistId: album.artistId,
        artistIdType: typeof album.artistId,
        coverUrl: album.coverUrl,
        releaseYear: album.releaseYear
      });

      // Parsear artistaId correctamente - puede venir como string de Deezer
      // El artistId de Deezer viene del campo album.artistId (string)
      const artistaIdParsed = this.parseNumericId(album.artistId);

      // DEBUG: Ver resultado del parsing
      console.log('🔍 DEBUG - artistaId parsed:', artistaIdParsed, 'from:', album.artistId);

      // Validar que tengamos un artistaId válido
      if (!artistaIdParsed || artistaIdParsed <= 0) {
        console.warn('⚠️ artistaId inválido:', album.artistId, '-> parsed:', artistaIdParsed);
      }

      // Construir datos del álbum con validaciones robustas
      const albumData = {
        albumId: albumIdNum,
        tituloAlbum: (album.title || 'Álbum desconocido').trim(),
        portadaUrl: album.coverUrl?.trim() || undefined, // undefined si vacío (no null)
        anioSalida: album.releaseYear || new Date().getFullYear(),
        // artistaId: DEBE ser el ID del artista de Deezer (no del álbum)
        // Si no tenemos artistId válido, es un error - no usar albumId como fallback
        artistaId: artistaIdParsed || 0, // 0 hará fallar la validación del backend (correcto)
        nombreArtista: (album.artist || 'Artista desconocido').trim()
      };

      // Log para debugging
      console.debug('Añadiendo álbum de Deezer:', albumData);

      this.listaAlbumService.agregarAlbumDeezer(albumData).subscribe({
        next: (result) => {
          if (result !== null) {
            this.isInUserList.set(true);
            this.needsListFirst.set(false);
          }
        },
        error: (error) => {
          console.error('Error al añadir álbum:', error);
        }
      });
    }
  }

  /**
   * Cambiar pestaña activa
   */
  onTabChange(tabId: string | number): void {
    this.activeTabId.set(tabId);
  }

  // Review system
  toggleReviewForm(): void {
    this.isWritingReview.set(!this.isWritingReview());
  }

  /**
   * Iniciar escritura de reseña (carga texto existente si hay)
   */
  startWritingReview(): void {
    // Verificar autenticación antes de abrir el formulario
    if (!this.appState.currentUser()) {
      this.notifications.warning(
        'Sesión requerida',
        'Debes iniciar sesión o registrarte para escribir una reseña'
      );
      // Disparar evento para abrir modal de login (escuchado por Header)
      if (typeof window !== 'undefined') {
        window.dispatchEvent(new CustomEvent('open-login-modal'));
      }
      return;
    }

    // Verificar que el álbum esté en la lista
    if (!this.isInUserList()) {
      this.notifications.info(
        'Añade a tu lista primero',
        'Debes añadir el álbum a tu lista antes de escribir una reseña'
      );
      return;
    }

    if (this.hasUserReview()) {
      this.reviewText.set(this.userReview()!.text);
    }
    this.isWritingReview.set(true);
  }

  submitReview(): void {
    if (!this.canSubmitReview()) return;

    const user = this.appState.currentUser();
    const item = this.item();

    if (!user || !item) return;

    // Si no está en la lista, no puede reseñar
    if (!this.isInUserList()) {
      this.needsListFirst.set(true);
      return;
    }

    if (environment.useMockData) {
      // Modo mock
      const newUserReview: UserReview = {
        text: this.reviewText(),
        date: new Date(),
        rating: this.userRating()
      };

      this.userReview.set(newUserReview);
      console.log('Reseña guardada (mock):', newUserReview);

      // Reset form
      this.reviewText.set('');
      this.isWritingReview.set(false);
      return;
    }

    // Guardar en backend
    const albumIdNum = this.parseNumericId(item.id);
    if (!albumIdNum) return;

    this.listaAlbumService.escribirResena(albumIdNum, this.reviewText(), this.userRating()).subscribe({
      next: (result) => {
        if (result) {
          const newUserReview: UserReview = {
            text: this.reviewText(),
            date: new Date(),
            rating: this.userRating()
          };
          this.userReview.set(newUserReview);

          // Recargar reseñas y estadísticas
          this.loadMoreReviews();
          this.loadAlbumStats(item.id);
        }

        // Reset form
        this.reviewText.set('');
        this.isWritingReview.set(false);
      },
      error: () => {
        // El servicio ya muestra notificación de error
      }
    });
  }

  cancelReview(): void {
    this.reviewText.set('');
    this.isWritingReview.set(false);
  }

  likeReview(reviewId: string): void {
    this.displayedReviews.update(reviews =>
      reviews.map(review =>
        review.id === reviewId
          ? { ...review, likes: review.likes + 1 }
          : review
      )
    );
  }

  // ============================================
  // NAVEGACIÓN PROGRAMÁTICA
  // ============================================

  /**
   * Scroll a una sección específica usando fragments
   * Ejemplo: /album/123#reviews -> scroll a sección reviews
   */
  scrollToSection(sectionId: string): void {
    this.viewportScroller.scrollToAnchor(sectionId);
  }

  /**
   * Navegar a sección con fragment (actualiza URL)
   */
  navigateToSection(section: 'info' | 'tracks' | 'reviews'): void {
    const extras: NavigationExtras = {
      fragment: section,
      // No añadir al historial para cada sección
      replaceUrl: true
    };
    this.router.navigate([], extras);
  }

  /**
   * Navegar al artista con estado adicional
   */
  goToArtist(artistId: string): void {
    const extras: NavigationExtras = {
      state: {
        fromAlbum: this.item()?.id,
        albumTitle: this.itemTitle()
      }
    };
    this.router.navigate(['/artist', artistId], extras);
  }

  /**
   * Navegar al perfil de usuario público
   */
  goToUser(userId: string): void {
    const extras: NavigationExtras = {
      state: {
        fromReview: true,
        albumId: this.item()?.id
      }
    };
    // Usar ruta /user/:id para perfiles públicos
    this.router.navigate(['/user', userId], extras);
  }

  /**
   * Compartir enlace directo a las reseñas
   */
  shareReviewsLink(): void {
    const url = `${window.location.origin}/album/${this.item()?.id}#reviews`;
    navigator.clipboard.writeText(url);
    console.log('Enlace copiado:', url);
  }

  /**
   * Formatear fecha para mostrar
   */
  formatDate(date: Date | string): string {
    const dateObj = typeof date === 'string' ? new Date(date) : date;
    return dateObj.toLocaleDateString('es-ES', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  }

  /**
   * Generar estrellas para rating
   */
  getStarsDisplay(rating: number): string {
    return '★'.repeat(rating) + '☆'.repeat(5 - rating);
  }

  // ============================================
  // MODALES DE AUTENTICACIÓN
  // ============================================

  /**
   * Abrir modal de login (dispara evento escuchado por Header)
   */
  openLoginModal(): void {
    if (typeof window !== 'undefined') {
      window.dispatchEvent(new CustomEvent('open-login-modal'));
    }
  }

  /**
   * Abrir modal de registro (dispara evento escuchado por Header)
   */
  openRegisterModal(): void {
    if (typeof window !== 'undefined') {
      window.dispatchEvent(new CustomEvent('open-register-modal'));
    }
  }
}
