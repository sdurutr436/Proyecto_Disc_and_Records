/**
 * Spinner Component - Indicador de Carga Visual
 *
 * PROPÓSITO:
 * Componente visual para indicar estados de carga.
 * Puede usarse como overlay global o inline en componentes.
 *
 * MODOS:
 * - global: Overlay de pantalla completa con backdrop
 * - inline: Spinner pequeño dentro de un contenedor
 * - button: Spinner mini para dentro de botones
 *
 * USO:
 * ```html
 * <!-- Global overlay -->
 * <app-spinner [show]="isLoading" mode="global" message="Cargando..."></app-spinner>
 *
 * <!-- Inline en contenedor -->
 * <app-spinner [show]="isLoading" mode="inline" size="md"></app-spinner>
 *
 * <!-- En botón -->
 * <button>
 *   <app-spinner [show]="isSaving" mode="button"></app-spinner>
 *   Guardar
 * </button>
 * ```
 */

import { Component, Input, inject, computed, signal, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoadingService } from '../../../services/loading';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-spinner',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './spinner.html',
  styleUrl: './spinner.scss',
})
export class Spinner implements OnInit, OnDestroy {
  private loadingService = inject(LoadingService);

  /**
   * Controla la visibilidad del spinner
   * Si no se proporciona, usa el estado global del LoadingService
   */
  @Input() show?: boolean;

  /**
   * Modo de visualización
   * - global: Overlay de pantalla completa
   * - inline: Spinner dentro de contenedor
   * - button: Spinner pequeño para botones
   */
  @Input() mode: 'global' | 'inline' | 'button' = 'inline';

  /**
   * Tamaño del spinner
   */
  @Input() size: 'sm' | 'md' | 'lg' = 'md';

  /**
   * Mensaje a mostrar (solo en modo global)
   */
  @Input() message?: string;

  /**
   * ID para loading local (opcional)
   * Si se proporciona, el spinner se vincula al estado local de ese ID
   */
  @Input() localId?: string;

  /**
   * Color del spinner
   */
  @Input() color: 'primary' | 'secondary' | 'white' = 'primary';

  /** Suscripción para limpieza */
  private subscription?: Subscription;

  /** Estado local para cuando se usa localId */
  private localLoading = signal(false);

  ngOnInit(): void {
    // Si hay localId, suscribirse a cambios locales
    if (this.localId) {
      this.subscription = this.loadingService.localStates$.subscribe((states) => {
        this.localLoading.set(states.get(this.localId!) ?? false);
      });
    }
  }

  ngOnDestroy(): void {
    this.subscription?.unsubscribe();
  }

  /**
   * Determina si el spinner debe mostrarse
   */
  get isVisible(): boolean {
    // Si show está definido explícitamente, usarlo
    if (this.show !== undefined) {
      return this.show;
    }

    // Si hay localId, usar estado local
    if (this.localId) {
      return this.localLoading();
    }

    // Por defecto, usar estado global
    return this.loadingService.isLoading();
  }

  /**
   * Obtiene el mensaje a mostrar
   */
  get displayMessage(): string {
    return this.message ?? this.loadingService.message();
  }

  /**
   * Clases CSS dinámicas
   */
  get spinnerClasses(): string {
    const classes = ['spinner'];
    classes.push(`spinner--${this.mode}`);
    classes.push(`spinner--${this.size}`);
    classes.push(`spinner--${this.color}`);
    return classes.join(' ');
  }

  /**
   * Clases para el overlay (solo modo global)
   */
  get overlayClasses(): string {
    return this.isVisible ? 'spinner-overlay spinner-overlay--visible' : 'spinner-overlay';
  }
}
