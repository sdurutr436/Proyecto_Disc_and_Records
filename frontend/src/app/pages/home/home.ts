import { Component, signal, inject, output, OnInit, ChangeDetectionStrategy, DestroyRef } from '@angular/core';
import { Router } from '@angular/router';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { Carousel } from '../../components/shared/carousel/carousel';
import { Card } from '../../components/shared/card/card';
import { SearchBar } from '../../components/shared/search-bar/search-bar';
import { Button } from '../../components/shared/button/button';
import { RatingComponent } from '../../components/shared/rating/rating';
import { AlbumStateService } from '../../services/album-state.service';
import { AlbumService } from '../../services/album.service';
import { ReviewStateService } from '../../services/review-state.service';
import { AppStateService } from '../../services/app-state';

// Interfaz para álbum en la vista
interface AlbumView {
  id: number | string;
  title: string;
  artist: string;
  imageUrl: string;
  rating?: number;
  reviewCount?: number;
}

/**
 * HomeComponent - Página Principal
 *
 * OPTIMIZACIONES IMPLEMENTADAS:
 * - ChangeDetectionStrategy.OnPush para mejor rendimiento
 * - TrackBy en @for para evitar re-renders innecesarios
 * - Integración con Deezer API para álbumes reales
 * - Integración con servicio de búsqueda con debounce
 */
@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    Carousel,
    Card,
    SearchBar,
    Button,
    RatingComponent
  ],
  templateUrl: './home.html',
  styleUrl: './home.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class Home implements OnInit {
  private router = inject(Router);
  private albumService = inject(AlbumService);
  private albumState = inject(AlbumStateService);
  private reviewState = inject(ReviewStateService);
  private appState = inject(AppStateService);
  private destroyRef = inject(DestroyRef);

  // Output para comunicación con el componente padre (si se necesita)
  registerRequest = output<void>();

  // Estado de carga inicial
  isLoading = signal<boolean>(true);

  // Álbumes de Deezer (se cargan dinámicamente)
  trendingAlbums = signal<AlbumView[]>([]);
  recentReviews = signal<AlbumView[]>([]);

  ngOnInit(): void {
    this.loadAlbums();
  }

  /**
   * Cargar álbumes reales desde Deezer
   */
  private loadAlbums(): void {
    this.albumService.getNewReleases()
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe({
        next: (albums) => {
          // Dividir álbumes en dos grupos para los carruseles
          const albumViews: AlbumView[] = albums.map(album => ({
            id: album.id,
            title: album.title,
            artist: album.artist,
            imageUrl: album.coverUrl,
            rating: album.averageRating || 4.5, // Rating por defecto si no hay
            reviewCount: album.totalReviews || 0
          }));

          // Primeros 25 álbumes para "Trending"
          this.trendingAlbums.set(albumViews.slice(0, 25));

          // Siguientes 25 álbumes para "Recent Reviews"
          this.recentReviews.set(albumViews.slice(25, 50));

          this.isLoading.set(false);
        },
        error: (error) => {
          console.error('Error cargando álbumes de Deezer:', error);
          this.trendingAlbums.set([]);
          this.recentReviews.set([]);
          this.isLoading.set(false);
        }
      });
  }

  /**
   * TrackBy function para álbumes - OPTIMIZACIÓN DE RENDIMIENTO
   * Evita re-renders innecesarios en listas grandes
   */
  trackByAlbumId(index: number, album: AlbumView): number | string {
    return album.id;
  }

  /**
   * Manejar búsqueda
   */
  handleSearch(searchTerm: string): void {
    console.log('Buscando:', searchTerm);
    // El SearchBar ya navega a /search, pero podemos hacer lógica adicional
    this.albumState.search(searchTerm);
  }

  /**
   * Manejar búsqueda instantánea (mientras escribe)
   */
  handleInstantSearch(searchTerm: string): void {
    // Para búsquedas instantáneas en la home
    console.log('Búsqueda instantánea:', searchTerm);
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
  viewAlbumDetails(albumId: number | string): void {
    this.router.navigate(['/album', albumId]);
  }
}

