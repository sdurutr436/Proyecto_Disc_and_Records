import { Component, EventEmitter, Output, Input, signal, inject, OnInit, OnDestroy, ChangeDetectionStrategy } from '@angular/core';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { Subject, debounceTime, distinctUntilChanged, takeUntil, filter } from 'rxjs';
import { AlbumStateService } from '../../../services/album-state.service';
import { Spinner } from '../spinner/spinner';

/**
 * SearchBar - Barra de búsqueda con debounce y búsqueda en tiempo real
 *
 * CARACTERÍSTICAS:
 * - Debounce de 300ms para evitar peticiones excesivas
 * - Búsqueda instantánea mientras escribes (opcional)
 * - Navegación a resultados con Enter
 * - Loading state durante búsqueda
 * - Sin flickering gracias al debounce
 *
 * MODOS DE USO:
 * 1. instant=true: Busca mientras escribes (para listas filtradas)
 * 2. instant=false: Solo busca al presionar Enter o click (default)
 */
@Component({
  selector: 'app-search-bar',
  standalone: true,
  imports: [FormsModule, Spinner],
  templateUrl: './search-bar.html',
  styleUrl: './search-bar.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SearchBar implements OnInit, OnDestroy {
  /** Evento emitido cuando se realiza una búsqueda */
  @Output() onSearch = new EventEmitter<string>();

  /** Evento emitido en cada cambio (con debounce) para búsqueda instantánea */
  @Output() onSearchInstant = new EventEmitter<string>();

  /** Si es true, emite búsquedas mientras se escribe (con debounce) */
  @Input() instant = false;

  /** Placeholder personalizado */
  @Input() placeholder = 'Busca artistas, álbumes...';

  /** Tiempo de debounce en ms */
  @Input() debounceMs = 300;

  /** Número mínimo de caracteres para buscar */
  @Input() minChars = 2;

  /** Si es true, navega automáticamente a /search */
  @Input() navigateOnSearch = true;

  private router = inject(Router);
  private albumState = inject(AlbumStateService);
  private destroy$ = new Subject<void>();

  /** Término de búsqueda actual */
  searchTerm = signal<string>('');

  /** Estado de carga */
  isSearching = signal<boolean>(false);

  /** Subject para manejar el debounce */
  private searchInput$ = new Subject<string>();

  ngOnInit(): void {
    this.setupDebounce();
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  /**
   * Configura el debounce para búsqueda instantánea
   */
  private setupDebounce(): void {
    this.searchInput$.pipe(
      debounceTime(this.debounceMs),
      distinctUntilChanged(),
      filter(term => {
        // Si está vacío, emitir para limpiar resultados
        if (!term.trim()) {
          this.onSearchInstant.emit('');
          this.isSearching.set(false);
          return false;
        }
        // Solo buscar si supera el mínimo de caracteres
        return term.trim().length >= this.minChars;
      }),
      takeUntil(this.destroy$)
    ).subscribe(term => {
      if (this.instant) {
        this.isSearching.set(true);
        this.onSearchInstant.emit(term);
        // También actualizar el servicio de estado
        this.albumState.search(term);

        // Simular fin de búsqueda (el servicio real lo maneja)
        setTimeout(() => this.isSearching.set(false), 500);
      }
    });
  }

  /**
   * Emitir evento de búsqueda al presionar Enter o hacer clic en el botón
   */
  handleSearch(): void {
    const term = this.searchTerm().trim();
    if (term && term.length >= this.minChars) {
      this.isSearching.set(true);
      this.onSearch.emit(term);

      // Actualizar servicio de estado
      this.albumState.search(term);

      // Navegar a la página de resultados si está habilitado
      if (this.navigateOnSearch) {
        this.router.navigate(['/search'], { queryParams: { q: term } });
      }

      setTimeout(() => this.isSearching.set(false), 500);
    }
  }

  /**
   * Manejar tecla Enter en el input
   */
  handleKeyPress(event: KeyboardEvent): void {
    if (event.key === 'Enter') {
      this.handleSearch();
    }
  }

  /**
   * Actualizar el término de búsqueda y emitir al subject
   */
  updateSearchTerm(value: string): void {
    this.searchTerm.set(value);
    // Emitir al subject para debounce
    this.searchInput$.next(value);
  }

  /**
   * Limpiar búsqueda
   */
  clearSearch(): void {
    this.searchTerm.set('');
    this.onSearch.emit('');
    this.onSearchInstant.emit('');
    this.albumState.clearFilters();
    this.isSearching.set(false);
  }
}
