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
import { Album, Artist, Song, Track, Review } from '../../models/data.models';
import { AlbumService } from '../../services/album.service';
import { ArtistService } from '../../services/artist.service';
import { SongService } from '../../services/song.service';

// Type para el item unificado (puede ser Album, Artist o Song)
type DetailItem = Album | Artist | Song;

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
  reviewText = signal<string>('');
  isWritingReview = signal<boolean>(false);
  isLoadingReviews = signal<boolean>(false);

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

  // Computed
  hasUserRated = computed(() => this.userRating() > 0);
  canSubmitReview = computed(() =>
    this.reviewText().trim().length >= 50 && this.userRating() > 0
  );

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private viewportScroller: ViewportScroller,
    private albumService: AlbumService,
    private artistService: ArtistService,
    private songService: SongService
  ) {}

  ngOnInit(): void {
    // ✅ DATOS YA PRECARGADOS POR RESOLVER
    // Los datos vienen del resolver configurado en app.routes.ts
    const resolvedData = this.route.snapshot.data;

    // Determinar tipo de item según qué resolver se ejecutó
    if (resolvedData['album']) {
      const album = resolvedData['album'] as Album;
      this.item.set(album);
      this.loadAlbumDetails(album.id);
    } else if (resolvedData['artist']) {
      const artist = resolvedData['artist'] as Artist;
      this.item.set(artist);
      this.loadArtistDetails(artist.id);
    } else if (resolvedData['song']) {
      const song = resolvedData['song'] as Song;
      this.item.set(song);
      this.loadSongDetails(song.id);
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

  /**
   * Carga detalles adicionales de un álbum (tracks y reviews)
   */
  loadAlbumDetails(albumId: string): void {
    // Cargar tracks
    this.albumService.getAlbumTracks(albumId).subscribe({
      next: (tracks) => {
        this.trackList.set(tracks);
        const tracklistItems: AccordionItem[] = [{
          id: 'tracklist',
          title: `Lista de canciones (${tracks.length})`,
          content: this.generateTracklistHTML(tracks),
          isOpen: true
        }];
        this.tracklistAccordionItems.set(tracklistItems);
      },
      error: (err) => console.error('Error loading tracks:', err)
    });

    // Cargar reviews
    this.loadReviews(albumId, 'album');
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
   * Carga reseñas según el tipo de item
   */
  loadReviews(itemId: string, type: 'album' | 'artist' | 'song'): void {
    this.isLoadingReviews.set(true);

    let reviewsObservable;
    switch (type) {
      case 'album':
        reviewsObservable = this.albumService.getAlbumReviews(itemId);
        break;
      case 'song':
        reviewsObservable = this.songService.getSongReviews(itemId);
        break;
      default:
        // Artists no tienen reviews aún
        this.isLoadingReviews.set(false);
        return;
    }

    reviewsObservable.subscribe({
      next: (loadedReviews) => {
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
      },
      error: (err) => {
        console.error('Error loading reviews:', err);
        this.isLoadingReviews.set(false);
      }
    });
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
    this.userRating.set(rating);
    // TODO: Enviar rating al backend
    console.log('Rating set:', rating);
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
      userAvatar: 'assets/profile-placeholder.svg',
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
        albumTitle: this.itemTitle()
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
