import { Component, input, output, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LucideAngularModule, Star } from 'lucide-angular';

@Component({
  selector: 'app-rating',
  standalone: true,
  imports: [CommonModule, LucideAngularModule],
  templateUrl: './rating.html',
  styleUrls: ['./rating.scss'],
})
export class RatingComponent {
  // Lucide icons
  readonly Star = Star;

  /**
   * Valor de rating (0-5)
   */
  rating = input.required<number>();

  /**
   * Número máximo de estrellas a mostrar
   */
  maxStars = input<number>(5);

  /**
   * Tamaño del rating
   */
  size = input<'small' | 'medium' | 'large'>('medium');

  /**
   * Mostrar el valor numérico junto a las estrellas
   */
  showValue = input<boolean>(false);

  /**
   * Modo interactivo (permite hacer click)
   */
  interactive = input<boolean>(false);

  /**
   * Evento emitido cuando se selecciona un rating
   */
  ratingChange = output<number>();

  /**
   * Estrella sobre la que está el hover (para preview)
   */
  protected hoveredStar = signal<number>(0);

  /**
   * Rating a mostrar (con preview de hover)
   */
  protected displayRating(): number {
    return this.hoveredStar() > 0 ? this.hoveredStar() : this.rating();
  }

  /**
   * Obtiene array de números para iterar estrellas
   */
  protected getStars(): number[] {
    return Array.from({ length: this.maxStars() }, (_, i) => i + 1);
  }

  /**
   * Maneja click en estrella
   */
  protected onStarClick(star: number): void {
    if (this.interactive()) {
      this.ratingChange.emit(star);
    }
  }

  /**
   * Maneja hover sobre estrella
   */
  protected onStarHover(star: number): void {
    if (this.interactive()) {
      this.hoveredStar.set(star);
    }
  }

  /**
   * Resetea el hover
   */
  protected onMouseLeave(): void {
    if (this.interactive()) {
      this.hoveredStar.set(0);
    }
  }
}
