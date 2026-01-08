import { Component, input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-rating',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './rating.html',
  styleUrls: ['./rating.scss'],
})
export class RatingComponent {
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
   * Obtiene array de números para iterar estrellas
   */
  protected getStars(): number[] {
    return Array.from({ length: this.maxStars() }, (_, i) => i + 1);
  }
}
