import { Component, OnInit, OnDestroy, signal, computed, inject, ChangeDetectionStrategy, DestroyRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router, NavigationExtras } from '@angular/router';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { Card } from '../../components/shared/card/card';
import { SearchBar } from '../../components/shared/search-bar/search-bar';
import { Button } from '../../components/shared/button/button';
import { Spinner } from '../../components/shared/spinner/spinner';
import { RatingComponent } from '../../components/shared/rating/rating';
import { InfiniteScrollComponent } from '../../components/shared/infinite-scroll/infinite-scroll';
import { AlbumStateService } from '../../services/album-state.service';
import { AppStateService } from '../../services/app-state';

type FilterType = 'all' | 'albums' | 'artists' | 'users' | 'reviews';

interface SearchResultItem {
  id: number | string;
  type: 'album' | 'artist' | 'user' | 'review';
  title: string;
  subtitle?: string;
  imageUrl: string;
  rating?: number;
  reviewCount?: number;
  description?: string;
}

/**
 * SearchResultsComponent - Página de Resultados de Búsqueda
 *
 * OPTIMIZACIONES IMPLEMENTADAS:
 * - ChangeDetectionStrategy.OnPush para mejor rendimiento
 * - TrackBy en @for para evitar re-renders innecesarios
 * - Conexión con AlbumStateService para datos reactivos
 * - Infinite scroll para paginación automática
 * - Debounce en búsqueda (a través de SearchBar)
 * - Conservación de scroll position durante carga
 */
@Component({
  selector: 'app-search-results',
  standalone: true,
  imports: [
    CommonModule,
    Card,
    SearchBar,
    Button,
    Spinner,
    RatingComponent,
    InfiniteScrollComponent
  ],
  templateUrl: './search-results.html',
  styleUrls: ['./search-results.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export default class SearchResultsComponent implements OnInit {
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private albumState = inject(AlbumStateService);
  private appState = inject(AppStateService);
  private destroyRef = inject(DestroyRef);

  searchTerm = signal<string>('');
  activeFilter = signal<FilterType>('all');

  // Estado de carga (conectado al servicio)
  isLoading = this.albumState.isLoading;
  isLoadingMore = this.albumState.isLoadingMore;
  hasMore = this.albumState.hasMore;

  // Resultados de búsqueda (se cargan desde el servicio)
  allResults = signal<SearchResultItem[]>([]);

  // Computed: filtrar resultados según el filtro activo
  filteredResults = computed(() => {
    const filter = this.activeFilter();
    const results = this.allResults();

    if (filter === 'all') {
      return results;
    }

    return results.filter(item => {
      switch (filter) {
        case 'albums':
          return item.type === 'album';
        case 'artists':
          return item.type === 'artist';
        case 'users':
          return item.type === 'user';
        case 'reviews':
          return item.type === 'review';
        default:
          return true;
      }
    });
  });

  // Computed: contar resultados por tipo
  resultsCount = computed(() => {
    const results = this.allResults();
    return {
      all: results.length,
      albums: results.filter(r => r.type === 'album').length,
      artists: results.filter(r => r.type === 'artist').length,
      users: results.filter(r => r.type === 'user').length,
      reviews: results.filter(r => r.type === 'review').length
    };
  });

  // Computed: paginación info
  paginationInfo = computed(() => this.albumState.pagination());

  ngOnInit(): void {
    // Suscribirse a cambios en query params (q y filter)
    this.route.queryParams.pipe(
      takeUntilDestroyed(this.destroyRef)
    ).subscribe(params => {
      // Leer término de búsqueda
      const query = params['q'] || '';
      this.searchTerm.set(query);

      // Leer filtro de query params si existe
      const filter = params['filter'] as FilterType;
      if (filter && ['albums', 'artists', 'users', 'reviews'].includes(filter)) {
        this.activeFilter.set(filter);
      } else {
        this.activeFilter.set('all');
      }

      if (query) {
        this.performSearch(query);
      }
    });

    // Leer estado de navegación (NavigationExtras state)
    const navState = history.state;
    if (navState?.previousSearch) {
      console.log('Volviendo de:', navState.previousSearch);
    }
  }

  // ==========================================================================
  // TRACKBY FUNCTIONS - OPTIMIZACIÓN DE RENDIMIENTO
  // ==========================================================================

  /**
   * TrackBy para resultados - evita re-renders innecesarios
   */
  trackByResultId(index: number, result: SearchResultItem): number | string {
    return result.id;
  }

  // ==========================================================================
  // BÚSQUEDA Y FILTRADO
  // ==========================================================================

  performSearch(query: string): void {
    // Usar el servicio de estado para búsqueda reactiva
    this.albumState.search(query);

    // El servicio actualiza isLoading automáticamente
    // y emite resultados a través de signals

    // TODO: Cuando el backend esté listo, mapear resultados del servicio
    // this.allResults.set(this.albumState.albums().map(album => ({
    //   id: album.id,
    //   type: 'album' as const,
    //   title: album.title,
    //   subtitle: album.artist,
    //   imageUrl: album.coverUrl,
    //   rating: album.averageRating,
    //   reviewCount: album.totalReviews
    // })));
  }

  setFilter(filter: FilterType): void {
    this.activeFilter.set(filter);
  }

  isFilterActive(filter: FilterType): boolean {
    return this.activeFilter() === filter;
  }

  // ==========================================================================
  // INFINITE SCROLL
  // ==========================================================================

  /**
   * Cargar más resultados (infinite scroll)
   */
  loadMoreResults(): void {
    if (this.hasMore() && !this.isLoadingMore()) {
      this.albumState.loadMore();
    }
  }

  // ==========================================================================
  // HELPERS
  // ==========================================================================

  getResultIcon(type: string): string {
    switch (type) {
      case 'album':
        return '💿';
      case 'artist':
        return '🎤';
      case 'user':
        return '👤';
      case 'review':
        return '📝';
      default:
        return '🔍';
    }
  }

  getResultTypeLabel(type: string): string {
    switch (type) {
      case 'album':
        return 'Álbum';
      case 'artist':
        return 'Artista';
      case 'user':
        return 'Usuario';
      case 'review':
        return 'Reseña';
      default:
        return '';
    }
  }

  // ============================================
  // NAVEGACIÓN PROGRAMÁTICA
  // ============================================

  /**
   * Navegar al resultado con NavigationExtras state
   * Pasa información del contexto de búsqueda para uso en la página destino
   */
  viewResult(result: SearchResultItem): void {
    // NavigationExtras con state para pasar datos entre rutas
    const extras: NavigationExtras = {
      state: {
        fromSearch: true,
        searchTerm: this.searchTerm(),
        resultPosition: this.filteredResults().indexOf(result) + 1,
        totalResults: this.filteredResults().length
      }
    };

    switch (result.type) {
      case 'album':
        // Navegar con fragment para ir directamente a info
        this.router.navigate(['/album', result.id], {
          ...extras,
          fragment: 'info'
        });
        break;
      case 'artist':
        this.router.navigate(['/artist', result.id], extras);
        break;
      case 'user':
        this.router.navigate(['/profile', result.id], extras);
        break;
      case 'review':
        // Navegar al álbum y scroll directo a reviews
        this.router.navigate(['/album', result.id], {
          ...extras,
          fragment: 'reviews'
        });
        break;
    }
  }

  /**
   * Nueva búsqueda con queryParamsHandling para preservar parámetros
   */
  newSearch(query: string): void {
    if (query.trim()) {
      const extras: NavigationExtras = {
        queryParams: { q: query },
        // 'merge' preserva otros query params existentes
        queryParamsHandling: 'merge',
        // No añadir al historial cada búsqueda intermedia
        replaceUrl: false
      };
      this.router.navigate(['/search'], extras);
    }
  }

  /**
   * Aplicar filtro actualizando query params
   */
  applyFilterWithQueryParams(filter: FilterType): void {
    this.setFilter(filter);

    // Actualizar URL con filtro actual sin perder el término de búsqueda
    const extras: NavigationExtras = {
      queryParams: { filter: filter === 'all' ? null : filter },
      queryParamsHandling: 'merge',
      replaceUrl: true // Reemplazar en historial, no apilar
    };
    this.router.navigate([], extras);
  }

  goBack(): void {
    this.router.navigate(['/']);
  }
}
