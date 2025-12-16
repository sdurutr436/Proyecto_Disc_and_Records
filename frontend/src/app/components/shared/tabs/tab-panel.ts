import { Component, input, signal, WritableSignal } from '@angular/core';
import { CommonModule } from '@angular/common';

/**
 * TabPanel - Panel de contenido para usar con TabGroup/ResponsiveTabs
 *
 * Este componente representa el contenido de una pestaña individual.
 * Usa ng-content para proyectar contenido HTML complejo.
 * El padre (TabGroup o ResponsiveTabs) controla la visibilidad mediante setActive().
 *
 * @example
 * ```html
 * <app-tab-panel id="foundations" label="Fundamentos">
 *   <h3>Tipografía</h3>
 *   <p>Contenido complejo con componentes...</p>
 * </app-tab-panel>
 * ```
 */
@Component({
  selector: 'app-tab-panel',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div
      class="tab-panel"
      [class.tab-panel--active]="isActive()"
      [attr.id]="'panel-' + id()"
      role="tabpanel"
      [attr.aria-labelledby]="'tab-' + id()">
      <ng-content></ng-content>
    </div>
  `,
  styles: [`
    .tab-panel {
      display: none;
      animation: fadeIn 0.3s ease;
    }

    .tab-panel--active {
      display: block;
    }

    @keyframes fadeIn {
      from {
        opacity: 0;
        transform: translateY(0.5rem);
      }
      to {
        opacity: 1;
        transform: translateY(0);
      }
    }
  `]
})
export class TabPanel {
  /** ID único del panel */
  id = input.required<string>();

  /** Label que se mostrará en la pestaña */
  label = input.required<string>();

  /** Si la pestaña está deshabilitada */
  disabled = input<boolean>(false);

  /** Signal interno para controlar visibilidad (controlado por el padre) */
  private _isActive: WritableSignal<boolean> = signal(false);

  /** Getter público para el estado activo */
  isActive = this._isActive.asReadonly();

  /** Método para que el padre controle la visibilidad */
  setActive(value: boolean): void {
    this._isActive.set(value);
  }
}
