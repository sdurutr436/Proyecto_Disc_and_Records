import {
  Component,
  Input,
  Output,
  EventEmitter,
  ElementRef,
  inject,
  OnInit,
  OnDestroy,
  signal,
  ChangeDetectionStrategy,
  PLATFORM_ID
} from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { Spinner } from '../spinner/spinner';

/**
 * InfiniteScrollComponent - Componente de Scroll Infinito
 *
 * PROPÓSITO:
 * - Detectar cuando el usuario llega al final de una lista
 * - Emitir evento para cargar más datos
 * - Mostrar estado de carga durante la carga
 * - Conservar posición de scroll durante la carga
 *
 * ARQUITECTURA:
 * - Usa Intersection Observer API (más eficiente que scroll events)
 * - El "sentinel" es un elemento invisible al final de la lista
 * - Cuando el sentinel entra en viewport, se emite evento de carga
 *
 * USO:
 * ```html
 * <div class="album-list">
 *   @for (album of albums(); track album.id) {
 *     <app-album-card [album]="album" />
 *   }
 *
 *   <app-infinite-scroll
 *     [loading]="isLoadingMore()"
 *     [hasMore]="hasMoreAlbums()"
 *     (loadMore)="loadMoreAlbums()"
 *   />
 * </div>
 * ```
 */
@Component({
  selector: 'app-infinite-scroll',
  standalone: true,
  imports: [CommonModule, Spinner],
  template: `
    <div class="infinite-scroll" #sentinel>
      <!-- Estado de carga -->
      @if (loading) {
        <div class="infinite-scroll__loading">
          <app-spinner [size]="'md'"></app-spinner>
          <span class="infinite-scroll__text">{{ loadingText }}</span>
        </div>
      }

      <!-- No hay más resultados -->
      @if (!loading && !hasMore && showEndMessage) {
        <div class="infinite-scroll__end">
          <span class="infinite-scroll__text">{{ endText }}</span>
        </div>
      }

      <!-- Error de carga -->
      @if (error()) {
        <div class="infinite-scroll__error">
          <span class="infinite-scroll__text">{{ error() }}</span>
          <button
            type="button"
            class="infinite-scroll__retry"
            (click)="retry()"
          >
            Reintentar
          </button>
        </div>
      }
    </div>
  `,
  styles: [`
    .infinite-scroll {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      padding: 2rem 1rem;
      min-height: 60px;
      width: 100%;
    }

    .infinite-scroll__loading {
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 0.75rem;
    }

    .infinite-scroll__text {
      color: var(--color-text-secondary, #666);
      font-size: 0.875rem;
    }

    .infinite-scroll__end {
      padding: 1rem;
      border-top: 1px solid var(--color-border, #eee);
      width: 100%;
      text-align: center;
    }

    .infinite-scroll__error {
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 0.5rem;
      color: var(--color-error, #dc3545);
    }

    .infinite-scroll__retry {
      padding: 0.5rem 1rem;
      background: var(--color-primary, #007bff);
      color: white;
      border: none;
      border-radius: 4px;
      cursor: pointer;
      font-size: 0.875rem;
      transition: background 0.2s;

      &:hover {
        background: var(--color-primary-dark, #0056b3);
      }
    }
  `],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class InfiniteScrollComponent implements OnInit, OnDestroy {
  private elementRef = inject(ElementRef);
  private platformId = inject(PLATFORM_ID);

  /** Indica si se están cargando más datos */
  @Input() loading = false;

  /** Indica si hay más datos disponibles */
  @Input() hasMore = true;

  /** Distancia en px antes de llegar al final para disparar la carga */
  @Input() threshold = 100;

  /** Texto mostrado durante la carga */
  @Input() loadingText = 'Cargando más...';

  /** Texto mostrado cuando no hay más resultados */
  @Input() endText = 'No hay más resultados';

  /** Mostrar mensaje cuando no hay más resultados */
  @Input() showEndMessage = true;

  /** Deshabilitar el scroll infinito */
  @Input() disabled = false;

  /** Evento emitido cuando se debe cargar más datos */
  @Output() loadMore = new EventEmitter<void>();

  /** Señal de error */
  error = signal<string | null>(null);

  private observer: IntersectionObserver | null = null;
  private sentinelElement: HTMLElement | null = null;

  ngOnInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      this.setupIntersectionObserver();
    }
  }

  ngOnDestroy(): void {
    this.disconnectObserver();
  }

  /**
   * Configura el Intersection Observer para detectar el scroll
   */
  private setupIntersectionObserver(): void {
    // Configuración del observer
    const options: IntersectionObserverInit = {
      root: null, // viewport
      rootMargin: `${this.threshold}px`,
      threshold: 0
    };

    // Crear el observer
    this.observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting && !this.loading && this.hasMore && !this.disabled) {
          this.triggerLoadMore();
        }
      });
    }, options);

    // Observar el elemento sentinel
    this.sentinelElement = this.elementRef.nativeElement;
    if (this.sentinelElement) {
      this.observer.observe(this.sentinelElement);
    }
  }

  /**
   * Desconecta el observer
   */
  private disconnectObserver(): void {
    if (this.observer) {
      this.observer.disconnect();
      this.observer = null;
    }
  }

  /**
   * Dispara la carga de más datos
   */
  private triggerLoadMore(): void {
    this.error.set(null);
    this.loadMore.emit();
  }

  /**
   * Reintentar carga tras error
   */
  retry(): void {
    this.error.set(null);
    this.loadMore.emit();
  }

  /**
   * Método público para establecer error (desde componente padre)
   */
  setError(message: string): void {
    this.error.set(message);
  }
}
