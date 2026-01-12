import { Component, Input, ViewChild, ElementRef, AfterViewInit, OnDestroy, ChangeDetectorRef } from '@angular/core';

@Component({
  selector: 'app-carousel',
  standalone: true,
  imports: [],
  templateUrl: './carousel.html',
  styleUrl: './carousel.scss'
})
export class Carousel implements AfterViewInit, OnDestroy {
  @Input() title: string = '';
  @Input() itemsToShow: number = 4;
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
   * Añade un efecto de highlight al track del carousel
   * NOTA: Mejor práctica es usar clases CSS en lugar de manipular estilos inline
   */
  toggleHighlight(): void {
    if (!this.carouselTrack) return;

    const track = this.carouselTrack.nativeElement;

    // Mejor práctica: toggle de clase CSS en lugar de manipular estilos
    track.classList.toggle('carousel__track--highlighted');
  }

  /**
   * MANIPULACIÓN DOM: Cambiar opacidad dinámicamente
   */
  setOpacity(value: number): void {
    if (!this.carouselTrack) return;

    // MANIPULACIÓN DIRECTA: modificar estilo de opacidad
    this.carouselTrack.nativeElement.style.opacity = value.toString();
    this.carouselTrack.nativeElement.style.transition = 'opacity 0.3s ease';
  }
}
