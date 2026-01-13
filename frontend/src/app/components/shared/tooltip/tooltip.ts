import { Component, input, signal, HostListener, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';

type TooltipPosition = 'top' | 'bottom' | 'left' | 'right';

/**
 * Contador global para generar IDs únicos de tooltips
 */
let tooltipIdCounter = 0;

/**
 * Tooltip Component
 *
 * BLOQUE 3.5 - TOOLTIP ACCESIBLE:
 * - Soporte de foco con focusin/focusout para accesibilidad por teclado
 * - aria-describedby para vincular elemento con tooltip
 * - Delays configurables para mejor UX
 * - Animación suave de entrada/salida
 *
 * EVENTOS SOPORTADOS (BLOQUE 2.2):
 * - mouseenter/mouseleave: hover con ratón
 * - focusin/focusout: navegación por teclado
 *
 * @example
 * ```html
 * <app-tooltip text="Información adicional" position="top">
 *   <button>Hover o enfoca aquí</button>
 * </app-tooltip>
 * ```
 */
@Component({
  selector: 'app-tooltip',
  imports: [CommonModule],
  templateUrl: './tooltip.html',
  styleUrl: './tooltip.scss',
})
export class Tooltip implements OnDestroy {
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

  /**
   * ID único para aria-describedby
   * Permite vincular el tooltip con el elemento que lo describe
   */
  readonly tooltipId = `tooltip-${++tooltipIdCounter}`;

  private showTimeout: ReturnType<typeof setTimeout> | null = null;
  private hideTimeout: ReturnType<typeof setTimeout> | null = null;

  // =========================================================================
  // BLOQUE 2.2: EVENTOS DE MOUSE
  // =========================================================================

  /**
   * Mostrar tooltip al hacer hover
   */
  @HostListener('mouseenter')
  onMouseEnter() {
    this.scheduleShow();
  }

  /**
   * Ocultar tooltip al quitar el hover
   */
  @HostListener('mouseleave')
  onMouseLeave() {
    this.scheduleHide();
  }

  // =========================================================================
  // BLOQUE 2.2 & 3.5: EVENTOS DE FOCUS (Accesibilidad)
  // =========================================================================

  /**
   * Mostrar tooltip cuando un elemento hijo recibe foco
   * MEJORA 3.5: Permite navegación por teclado accesible
   */
  @HostListener('focusin')
  onFocusIn() {
    this.scheduleShow();
  }

  /**
   * Ocultar tooltip cuando el foco sale del elemento
   */
  @HostListener('focusout')
  onFocusOut() {
    this.scheduleHide();
  }

  // =========================================================================
  // MÉTODOS PRIVADOS
  // =========================================================================

  /**
   * Programar la aparición del tooltip con delay
   */
  private scheduleShow(): void {
    // Cancelar cualquier hideTimeout pendiente
    this.clearHideTimeout();

    // Mostrar tooltip después del delay
    this.showTimeout = setTimeout(() => {
      this.isVisible.set(true);
    }, this.showDelay());
  }

  /**
   * Programar la ocultación del tooltip con delay
   */
  private scheduleHide(): void {
    // Cancelar cualquier showTimeout pendiente
    this.clearShowTimeout();

    // Ocultar tooltip después del delay
    this.hideTimeout = setTimeout(() => {
      this.isVisible.set(false);
    }, this.hideDelay());
  }

  /**
   * Limpiar timeout de mostrar
   */
  private clearShowTimeout(): void {
    if (this.showTimeout) {
      clearTimeout(this.showTimeout);
      this.showTimeout = null;
    }
  }

  /**
   * Limpiar timeout de ocultar
   */
  private clearHideTimeout(): void {
    if (this.hideTimeout) {
      clearTimeout(this.hideTimeout);
      this.hideTimeout = null;
    }
  }

  /**
   * Limpiar timeouts al destruir el componente
   * Evita memory leaks y llamadas a componentes destruidos
   */
  ngOnDestroy() {
    this.clearShowTimeout();
    this.clearHideTimeout();
  }
}
