import { Component, OnInit, OnDestroy, signal, computed } from '@angular/core';
import { CommonModule, ViewportScroller } from '@angular/common';
import { ActivatedRoute, Router, RouterModule, NavigationExtras } from '@angular/router';
import { Subscription } from 'rxjs';
import { FormsModule } from '@angular/forms';
import { Accordion, AccordionItem } from '../../components/shared/accordion/accordion';
import { Button } from '../../components/shared/button/button';
import { Spinner } from '../../components/shared/spinner/spinner';
import { Alert } from '../../components/shared/alert/alert';
import { FormTextarea } from '../../components/shared/form-textarea/form-textarea';
import { RatingComponent } from '../../components/shared/rating/rating';

// Interfaces
interface DetailItem {
  id: string;
  title: string;
  artist: string;
  artistId: string;
  coverUrl: string;
  releaseYear: number;
  genre: string;
  tracks: number;
  duration: string;
  label: string;
  description: string;
  averageRating: number;
  totalReviews: number;
}

interface Track {
  id: string;
  number: number;
  title: string;
  duration: string;
}

interface Review {
  id: string;
  userId: string;
  userName: string;
  userAvatar: string;
  rating: number;
  content: string;
  date: Date;
  likes: number;
}

@Component({
  selector: 'app-detail',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    RouterModule,
    Accordion,
    Button,
    Spinner,
    Alert,
    FormTextarea,
    RatingComponent
  ],
  templateUrl: './detail.html',
  styleUrl: './detail.scss'
})
export class DetailComponent implements OnInit, OnDestroy {
  private fragmentSubscription?: Subscription;

  // Signals
  item = signal<DetailItem | null>(null);
  trackList = signal<Track[]>([]);
  tracklistAccordionItems = signal<AccordionItem[]>([]);
  reviews = signal<Review[]>([]);
  reviewsAccordionItems = signal<AccordionItem[]>([]);
  userRating = signal<number>(0);
  hoveredStar = signal<number>(0);
  reviewText = signal<string>('');
  isWritingReview = signal<boolean>(false);
  isLoadingReviews = signal<boolean>(false);

  // Computed
  hasUserRated = computed(() => this.userRating() > 0);
  canSubmitReview = computed(() =>
    this.reviewText().trim().length >= 50 && this.userRating() > 0
  );
  displayRating = computed(() =>
    this.hoveredStar() > 0 ? this.hoveredStar() : this.userRating()
  );

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private viewportScroller: ViewportScroller
  ) {}

  ngOnInit(): void {
    const itemId = this.route.snapshot.paramMap.get('id');
    if (itemId) {
      this.loadItemData(itemId);
      this.loadReviews(itemId);
    }

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

  loadItemData(itemId: string): void {
    // TODO: Reemplazar con llamada al servicio real
    // Datos de ejemplo
    this.item.set({
      id: itemId,
      title: 'The Dark Side of the Moon',
      artist: 'Pink Floyd',
      artistId: 'artist-1',
      coverUrl: 'https://picsum.photos/seed/album1/400/400',
      releaseYear: 1973,
      genre: 'Progressive Rock',
      tracks: 10,
      duration: '42:59',
      label: 'Harvest Records',
      description: 'The Dark Side of the Moon es el octavo álbum de estudio de la banda británica de rock progresivo Pink Floyd. Fue lanzado el 1 de marzo de 1973 y es uno de los álbumes más vendidos e influyentes de todos los tiempos.',
      averageRating: 4.7,
      totalReviews: 1248
    });

    // Cargar lista de canciones
    const tracks: Track[] = [
      { id: 'track-1', number: 1, title: 'Speak to Me', duration: '1:30' },
      { id: 'track-2', number: 2, title: 'Breathe', duration: '2:43' },
      { id: 'track-3', number: 3, title: 'On the Run', duration: '3:36' },
      { id: 'track-4', number: 4, title: 'Time', duration: '6:53' },
      { id: 'track-5', number: 5, title: 'The Great Gig in the Sky', duration: '4:36' },
      { id: 'track-6', number: 6, title: 'Money', duration: '6:23' },
      { id: 'track-7', number: 7, title: 'Us and Them', duration: '7:49' },
      { id: 'track-8', number: 8, title: 'Any Colour You Like', duration: '3:26' },
      { id: 'track-9', number: 9, title: 'Brain Damage', duration: '3:49' },
      { id: 'track-10', number: 10, title: 'Eclipse', duration: '2:03' }
    ];
    this.trackList.set(tracks);

    // Create accordion items for tracklist
    const tracklistItems: AccordionItem[] = [{
      id: 'tracklist',
      title: `Lista de canciones (${tracks.length})`,
      content: this.generateTracklistHTML(tracks),
      isOpen: true
    }];
    this.tracklistAccordionItems.set(tracklistItems);
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

  loadReviews(itemId: string): void {
    this.isLoadingReviews.set(true);

    // TODO: Reemplazar con llamada al servicio real
    setTimeout(() => {
      const loadedReviews: Review[] = [
        {
          id: '1',
          userId: 'user-1',
          userName: 'Carlos Méndez',
          userAvatar: 'https://picsum.photos/seed/user1/100/100',
          rating: 5,
          content: 'Una obra maestra absoluta. Cada canción fluye perfectamente hacia la siguiente. El uso de sintetizadores y efectos de sonido fue revolucionario para su época. Time y Money son mis favoritas.',
          date: new Date('2024-01-15'),
          likes: 42
        },
        {
          id: '2',
          userId: 'user-2',
          userName: 'María García',
          userAvatar: 'https://picsum.photos/seed/user2/100/100',
          rating: 5,
          content: 'Este álbum cambió mi vida. La primera vez que lo escuché completo fue una experiencia trascendental. Breathe, The Great Gig in the Sky y Eclipse son perfectas.',
          date: new Date('2024-01-10'),
          likes: 38
        },
        {
          id: '3',
          userId: 'user-3',
          userName: 'Pedro Sánchez',
          userAvatar: 'https://picsum.photos/seed/user3/100/100',
          rating: 4,
          content: 'Excelente álbum conceptual. La producción es impecable. Aunque algunos pasajes instrumentales se me hacen un poco largos, la cohesión general es impresionante.',
          date: new Date('2024-01-05'),
          likes: 15
        }
      ];
      this.reviews.set(loadedReviews);

      // Create accordion items for reviews
      const reviewsItems: AccordionItem[] = [{
        id: 'reviews',
        title: `Reseñas (${loadedReviews.length})`,
        content: this.generateReviewsHTML(loadedReviews),
        isOpen: true
      }];
      this.reviewsAccordionItems.set(reviewsItems);

      this.isLoadingReviews.set(false);
    }, 500);
  }

  generateReviewsHTML(reviews: Review[]): string {
    return reviews.map(review => {
      const stars = '★'.repeat(review.rating) + '☆'.repeat(5 - review.rating);
      const dateStr = review.date.toLocaleDateString('es-ES', { year: 'numeric', month: 'long', day: 'numeric' });

      return `<div class="review-card">
        <div class="review-card__header">
          <img src="${review.userAvatar}" alt="${review.userName}" class="review-card__avatar" />
          <div class="review-card__user-info">
            <h5 class="review-card__user-name">${review.userName}</h5>
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
    this.userRating.set(rating);
    // TODO: Enviar rating al backend
    console.log('Rating set:', rating);
  }

  hoverStar(star: number): void {
    this.hoveredStar.set(star);
  }

  resetHover(): void {
    this.hoveredStar.set(0);
  }

  getStarClass(starNumber: number): string {
    const rating = this.displayRating();
    if (starNumber <= rating) {
      return 'star--filled';
    }
    return 'star--empty';
  }

  // Review system
  toggleReviewForm(): void {
    this.isWritingReview.set(!this.isWritingReview());
  }

  submitReview(): void {
    if (!this.canSubmitReview()) return;

    const newReview: Review = {
      id: Date.now().toString(),
      userId: 'current-user',
      userName: 'Usuario Actual',
      userAvatar: 'https://picsum.photos/seed/currentuser/100/100',
      rating: this.userRating(),
      content: this.reviewText(),
      date: new Date(),
      likes: 0
    };

    // TODO: Enviar reseña al backend
    console.log('Submitting review:', newReview);

    // Añadir a la lista local
    this.reviews.update(reviews => [newReview, ...reviews]);

    // Reset form
    this.reviewText.set('');
    this.isWritingReview.set(false);
  }

  cancelReview(): void {
    this.reviewText.set('');
    this.isWritingReview.set(false);
  }

  likeReview(reviewId: string): void {
    // TODO: Implementar like en backend
    this.reviews.update(reviews =>
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
        albumTitle: this.item()?.title
      }
    };
    this.router.navigate(['/artist', artistId], extras);
  }

  /**
   * Navegar al perfil de usuario con estado
   */
  goToUser(userId: string): void {
    const extras: NavigationExtras = {
      state: {
        fromReview: true,
        albumId: this.item()?.id
      }
    };
    this.router.navigate(['/profile', userId], extras);
  }

  /**
   * Compartir enlace directo a las reseñas
   */
  shareReviewsLink(): void {
    const url = `${window.location.origin}/album/${this.item()?.id}#reviews`;
    navigator.clipboard.writeText(url);
    // TODO: Mostrar notificación de copiado
  }
}
