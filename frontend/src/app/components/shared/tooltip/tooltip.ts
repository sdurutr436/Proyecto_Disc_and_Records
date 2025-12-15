import { Component, input, signal, HostListener } from '@angular/core';
import { CommonModule } from '@angular/common';

type TooltipPosition = 'top' | 'bottom' | 'left' | 'right';

@Component({
  selector: 'app-tooltip',
  imports: [CommonModule],
  templateUrl: './tooltip.html',
  styleUrl: './tooltip.scss',
})
export class Tooltip {
  /**
   * Texto del tooltip
   */
  text = input.required<string>();

  /**
   * Posición del tooltip relativa al elemento
   */
  position = input<TooltipPosition>('top');

  /**
   * Delay en milisegundos antes de mostrar el tooltip
   */
  showDelay = input<number>(300);

  /**
   * Delay en milisegundos antes de ocultar el tooltip
   */
  hideDelay = input<number>(0);

  /**
   * Signal para controlar la visibilidad del tooltip
   */
  isVisible = signal(false);

  private showTimeout: any;
  private hideTimeout: any;

  /**
   * Mostrar tooltip al hacer hover
   */
  @HostListener('mouseenter')
  onMouseEnter() {
    // Cancelar cualquier hideTimeout pendiente
    if (this.hideTimeout) {
      clearTimeout(this.hideTimeout);
      this.hideTimeout = null;
    }

    // Mostrar tooltip después del delay
    this.showTimeout = setTimeout(() => {
      this.isVisible.set(true);
    }, this.showDelay());
  }

  /**
   * Ocultar tooltip al quitar el hover
   */
  @HostListener('mouseleave')
  onMouseLeave() {
    // Cancelar cualquier showTimeout pendiente
    if (this.showTimeout) {
      clearTimeout(this.showTimeout);
      this.showTimeout = null;
    }

    // Ocultar tooltip después del delay
    this.hideTimeout = setTimeout(() => {
      this.isVisible.set(false);
    }, this.hideDelay());
  }

  /**
   * Limpiar timeouts al destruir el componente
   */
  ngOnDestroy() {
    if (this.showTimeout) clearTimeout(this.showTimeout);
    if (this.hideTimeout) clearTimeout(this.hideTimeout);
  }
}
