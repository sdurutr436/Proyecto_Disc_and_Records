import { Component, Input, ViewChild, ElementRef, AfterViewInit } from '@angular/core';

@Component({
  selector: 'app-carousel',
  standalone: true,
  imports: [],
  templateUrl: './carousel.html',
  styleUrl: './carousel.scss'
})
export class Carousel implements AfterViewInit {
  @Input() title: string = '';
  @Input() itemsToShow: number = 4; // Cuántas cards mostrar a la vez
  @ViewChild('carouselTrack') carouselTrack!: ElementRef<HTMLDivElement>;

  currentIndex: number = 0;
  canScrollLeft: boolean = false;
  canScrollRight: boolean = true;

  ngAfterViewInit(): void {
    // Detectar si hay scroll disponible después de que el contenido se renderice
    setTimeout(() => {
      this.updateScrollButtons();
    }, 300);

    // También actualizar cuando cambie el tamaño de la ventana
    if (typeof window !== 'undefined') {
      window.addEventListener('resize', () => this.updateScrollButtons());
    }
  }

  scrollLeft(): void {
    const track = this.carouselTrack.nativeElement;
    const scrollAmount = track.offsetWidth / this.itemsToShow;

    track.scrollBy({
      left: -scrollAmount,
      behavior: 'smooth'
    });

    setTimeout(() => {
      this.updateScrollButtons();
    }, 300);
  }

  scrollRight(): void {
    const track = this.carouselTrack.nativeElement;
    const scrollAmount = track.offsetWidth / this.itemsToShow;

    track.scrollBy({
      left: scrollAmount,
      behavior: 'smooth'
    });

    setTimeout(() => {
      this.updateScrollButtons();
    }, 300);
  }

  private updateScrollButtons(): void {
    if (!this.carouselTrack) return;

    const track = this.carouselTrack.nativeElement;

    // Puede hacer scroll a la izquierda si no está al principio
    this.canScrollLeft = track.scrollLeft > 10;

    // Puede hacer scroll a la derecha si no está al final
    const maxScroll = track.scrollWidth - track.clientWidth;
    this.canScrollRight = track.scrollLeft < maxScroll - 10;
  }
}
