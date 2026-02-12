import { Component, Input, ViewChild, ElementRef, AfterViewInit, OnDestroy, ChangeDetectorRef, Renderer2, inject } from '@angular/core';

/**
 * Carousel Component
 *
 * BLOQUE 1 - MANIPULACIÓN DEL DOM:
 * - @ViewChild para obtener referencia al track del carousel (1.1)
 * - Renderer2 para modificar estilos de forma segura (1.2)
 *
 * ELEMENTO ACCEDIDO: carouselTrack - El contenedor de slides
 * USO: Control de scroll horizontal y efectos visuales
 * CICLO DE VIDA: ngAfterViewInit (cuando el DOM está disponible)
 */
@Component({
  selector: 'app-carousel',
  standalone: true,
  imports: [],
  templateUrl: './carousel.html',
  styleUrl: './carousel.scss'
})
export class Carousel implements AfterViewInit, OnDestroy {
  /**
   * MEJORA 1.2: Inyectamos Renderer2 para manipulación segura del DOM
   * Renderer2 es la forma recomendada en Angular para:
   * - Compatibilidad con SSR (Server-Side Rendering)
   * - Seguridad (no expone nativeElement directamente)
   * - Abstracción del DOM para diferentes plataformas
   */
  private renderer = inject(Renderer2);

  @Input() title: string = '';
  @Input() itemsToShow: number = 4;

  /**
   * Número de filas a mostrar en el carrusel (default: 1)
   * Para mostrar múltiples filas de elementos
   */
  @Input() rows: number = 1;

  /**
   * ID único para el carrusel, usado para accesibilidad.
   * Se puede pasar externamente para que coincida con aria-labelledby
   * de la sección padre. Si no se proporciona, se genera uno aleatorio.
   */
  @Input() titleId: string = Math.random().toString(36).substr(2, 9);

  /**
   * MEJORA 1.1: ViewChild con ElementRef tipado
   * Referencia al contenedor de slides del carousel
   * Se accede en ngAfterViewInit cuando el DOM está disponible
   */
  @ViewChild('carouselTrack') carouselTrack!: ElementRef<HTMLDivElement>;

  currentIndex: number = 0;
  canScrollLeft: boolean = false;
  canScrollRight: boolean = true;

  private resizeObserver?: ResizeObserver;
  private mutationObserver?: MutationObserver;
  private scrollHandler = () => this.updateScrollButtons();

  constructor(private cdr: ChangeDetectorRef) {}

  ngAfterViewInit(): void {
    const track = this.carouselTrack?.nativeElement;
    if (!track) return;

    // Listener de scroll para actualizar botones en tiempo real
    track.addEventListener('scroll', this.scrollHandler, { passive: true });

    // ResizeObserver para detectar cambios de tamaño
    if (typeof ResizeObserver !== 'undefined') {
      this.resizeObserver = new ResizeObserver(() => {
        this.updateScrollButtons();
      });
      this.resizeObserver.observe(track);
    }

    // MutationObserver para detectar cuando se añaden/quitan elementos
    if (typeof MutationObserver !== 'undefined') {
      this.mutationObserver = new MutationObserver(() => {
        setTimeout(() => this.updateScrollButtons(), 100);
      });
      this.mutationObserver.observe(track, { childList: true, subtree: true });
    }

    // Actualización inicial con delays para esperar carga de imágenes
    setTimeout(() => this.updateScrollButtons(), 100);
    setTimeout(() => this.updateScrollButtons(), 500);
    setTimeout(() => this.updateScrollButtons(), 1000);
  }

  ngOnDestroy(): void {
    const track = this.carouselTrack?.nativeElement;
    if (track) {
      track.removeEventListener('scroll', this.scrollHandler);
    }
    this.resizeObserver?.disconnect();
    this.mutationObserver?.disconnect();
  }

  scrollLeft(): void {
    const track = this.carouselTrack?.nativeElement;
    if (!track) return;

    const scrollAmount = track.offsetWidth * 0.8;
    track.scrollBy({
      left: -scrollAmount,
      behavior: 'smooth'
    });
  }

  scrollRight(): void {
    const track = this.carouselTrack?.nativeElement;
    if (!track) return;

    const scrollAmount = track.offsetWidth * 0.8;
    track.scrollBy({
      left: scrollAmount,
      behavior: 'smooth'
    });
  }

  private updateScrollButtons(): void {
    if (!this.carouselTrack?.nativeElement) return;

    const track = this.carouselTrack.nativeElement;
    const scrollLeft = Math.round(track.scrollLeft);
    const scrollWidth = track.scrollWidth;
    const clientWidth = track.clientWidth;
    const maxScroll = scrollWidth - clientWidth;

    // Hay contenido para scroll si el contenido es más ancho que el contenedor
    const hasScrollableContent = scrollWidth > clientWidth + 5;

    // Puede hacer scroll a la izquierda si no está al principio
    this.canScrollLeft = scrollLeft > 5;

    // Puede hacer scroll a la derecha si hay contenido y no está al final
    this.canScrollRight = hasScrollableContent && scrollLeft < maxScroll - 5;

    // Forzar detección de cambios
    this.cdr.detectChanges();
  }

  /**
   * MANIPULACIÓN DOM AVANZADA: Modificar estilos dinámicamente
   * MEJORA 1.2: Usamos Renderer2.addClass/removeClass en lugar de classList.toggle
   * Esto garantiza compatibilidad con SSR y mejora la seguridad
   */
  toggleHighlight(): void {
    if (!this.carouselTrack) return;

    const track = this.carouselTrack.nativeElement;
    const hasClass = track.classList.contains('carousel__track--highlighted');

    // Usamos Renderer2 para toggle seguro de clases
    if (hasClass) {
      this.renderer.removeClass(track, 'carousel__track--highlighted');
    } else {
      this.renderer.addClass(track, 'carousel__track--highlighted');
    }
  }

  /**
   * MANIPULACIÓN DOM: Cambiar opacidad dinámicamente
   * MEJORA 1.2: Usamos Renderer2.setStyle en lugar de nativeElement.style
   * Renderer2 es la forma segura y recomendada para modificar estilos en Angular
   */
  setOpacity(value: number): void {
    if (!this.carouselTrack) return;

    const track = this.carouselTrack.nativeElement;
    // Usamos Renderer2 para establecer estilos de forma segura
    this.renderer.setStyle(track, 'opacity', value.toString());
    this.renderer.setStyle(track, 'transition', 'opacity 0.3s ease');
  }
}
