import { Component, OnInit, signal, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { Card } from '../../components/shared/card/card';
import { SearchBar } from '../../components/shared/search-bar/search-bar';

type FilterType = 'all' | 'albums' | 'artists' | 'users' | 'reviews';

interface SearchResultItem {
  id: number;
  type: 'album' | 'artist' | 'user' | 'review';
  title: string;
  subtitle?: string;
  imageUrl: string;
  rating?: number;
  reviewCount?: number;
  description?: string;
}

@Component({
  selector: 'app-search-results',
  standalone: true,
  imports: [CommonModule, Card, SearchBar],
  templateUrl: './search-results.html',
  styleUrls: ['./search-results.scss']
})
export default class SearchResultsComponent implements OnInit {
  searchTerm = signal<string>('');
  activeFilter = signal<FilterType>('all');
  isLoading = signal<boolean>(false);

  // Mock data - En producción vendría del backend
  allResults = signal<SearchResultItem[]>([
    {
      id: 1,
      type: 'album',
      title: 'Random Access Memories',
      subtitle: 'Daft Punk',
      imageUrl: 'https://via.placeholder.com/200',
      rating: 5,
      reviewCount: 342
    },
    {
      id: 2,
      type: 'album',
      title: 'The Dark Side of the Moon',
      subtitle: 'Pink Floyd',
      imageUrl: 'https://via.placeholder.com/200',
      rating: 5,
      reviewCount: 521
    },
    {
      id: 3,
      type: 'artist',
      title: 'Daft Punk',
      subtitle: 'Artista',
      imageUrl: 'https://via.placeholder.com/200',
      description: 'Dúo francés de música electrónica'
    },
    {
      id: 4,
      type: 'user',
      title: 'PerreteGordete',
      subtitle: 'Usuario',
      imageUrl: 'https://via.placeholder.com/200',
      description: 'Miembro desde Enero 2025'
    },
    {
      id: 5,
      type: 'review',
      title: 'Reseña de "Thriller"',
      subtitle: 'por MusicLover123',
      imageUrl: 'https://via.placeholder.com/200',
      rating: 4,
      description: 'El rey del pop en su máximo esplendor. Temas inolvidables que han marcado generaciones...'
    },
    {
      id: 6,
      type: 'album',
      title: 'Avantasia',
      subtitle: 'Avantasia',
      imageUrl: 'https://via.placeholder.com/200',
      rating: 5,
      reviewCount: 89
    },
    {
      id: 7,
      type: 'album',
      title: 'Hammer King',
      subtitle: 'Hammer King',
      imageUrl: 'https://via.placeholder.com/200',
      rating: 4,
      reviewCount: 45
    },
    {
      id: 8,
      type: 'artist',
      title: 'Pink Floyd',
      subtitle: 'Artista',
      imageUrl: 'https://via.placeholder.com/200',
      description: 'Banda británica de rock progresivo'
    }
  ]);

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

  constructor(
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    // Obtener el término de búsqueda de los query params
    this.route.queryParams.subscribe(params => {
      const query = params['q'] || '';
      this.searchTerm.set(query);

      if (query) {
        this.performSearch(query);
      }
    });
  }

  performSearch(query: string): void {
    this.isLoading.set(true);

    // Simular llamada al backend
    setTimeout(() => {
      // En producción, aquí harías la llamada HTTP real
      // Por ahora usamos mock data
      this.isLoading.set(false);
    }, 500);
  }

  setFilter(filter: FilterType): void {
    this.activeFilter.set(filter);
  }

  isFilterActive(filter: FilterType): boolean {
    return this.activeFilter() === filter;
  }

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

  viewResult(result: SearchResultItem): void {
    switch (result.type) {
      case 'album':
        this.router.navigate(['/album', result.id]);
        break;
      case 'artist':
        this.router.navigate(['/artist', result.id]);
        break;
      case 'user':
        this.router.navigate(['/profile', result.id]);
        break;
      case 'review':
        this.router.navigate(['/review', result.id]);
        break;
    }
  }

  newSearch(query: string): void {
    if (query.trim()) {
      this.router.navigate(['/search'], { queryParams: { q: query } });
    }
  }

  goBack(): void {
    this.router.navigate(['/']);
  }
}
