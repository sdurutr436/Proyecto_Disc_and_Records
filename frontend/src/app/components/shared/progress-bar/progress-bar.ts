/**
 * ProgressBar Component - Barra de Progreso
 *
 * PROPÓSITO:
 * Muestra el progreso de operaciones largas como subida de archivos,
 * procesamiento de datos, etc.
 *
 * MODOS:
 * - determinate: Muestra porcentaje específico (0-100)
 * - indeterminate: Animación continua sin porcentaje
 *
 * USO:
 * ```html
 * <!-- Progreso determinado -->
 * <app-progress-bar [value]="75" [showLabel]="true"></app-progress-bar>
 *
 * <!-- Progreso indeterminado -->
 * <app-progress-bar [indeterminate]="true"></app-progress-bar>
 *
 * <!-- Vinculado al LoadingService -->
 * <app-progress-bar [useService]="true"></app-progress-bar>
 * ```
 */

import { Component, Input, inject, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoadingService } from '../../../services/loading';

@Component({
  selector: 'app-progress-bar',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './progress-bar.html',
  styleUrl: './progress-bar.scss',
})
export class ProgressBar {
  private loadingService = inject(LoadingService);

  /**
   * Valor del progreso (0-100)
   */
  @Input() value: number = 0;

  /**
   * Si es true, muestra animación indeterminada
   */
  @Input() indeterminate: boolean = false;

  /**
   * Si es true, muestra el porcentaje como texto
   */
  @Input() showLabel: boolean = false;

  /**
   * Tamaño de la barra
   */
  @Input() size: 'sm' | 'md' | 'lg' = 'md';

  /**
   * Variante de color
   */
  @Input() variant: 'primary' | 'secondary' | 'success' | 'warning' | 'error' = 'primary';

  /**
   * Si es true, usa el valor del LoadingService
   */
  @Input() useService: boolean = false;

  /**
   * Texto personalizado para la etiqueta
   */
  @Input() label?: string;

  /**
   * Si es true, muestra barra con rayas animadas
   */
  @Input() striped: boolean = false;

  /**
   * Obtiene el valor actual del progreso
   */
  get currentValue(): number {
    if (this.useService) {
      const serviceValue = this.loadingService.progress();
      return serviceValue >= 0 ? serviceValue : 0;
    }
    return Math.min(100, Math.max(0, this.value));
  }

  /**
   * Determina si debe mostrar modo indeterminado
   */
  get isIndeterminate(): boolean {
    if (this.useService) {
      return this.loadingService.progress() < 0;
    }
    return this.indeterminate;
  }

  /**
   * Texto de la etiqueta
   */
  get labelText(): string {
    if (this.label) {
      return this.label;
    }
    return `${Math.round(this.currentValue)}%`;
  }

  /**
   * Clases CSS dinámicas para el contenedor
   */
  get containerClasses(): string {
    const classes = ['progress-bar'];
    classes.push(`progress-bar--${this.size}`);
    classes.push(`progress-bar--${this.variant}`);

    if (this.isIndeterminate) {
      classes.push('progress-bar--indeterminate');
    }

    if (this.striped) {
      classes.push('progress-bar--striped');
    }

    return classes.join(' ');
  }

  /**
   * Estilo inline para el ancho de la barra
   */
  get progressStyle(): { [key: string]: string } {
    if (this.isIndeterminate) {
      return {};
    }
    return {
      width: `${this.currentValue}%`,
    };
  }
}
