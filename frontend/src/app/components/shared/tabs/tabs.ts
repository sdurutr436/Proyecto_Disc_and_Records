import { Component, input, signal, output } from '@angular/core';
import { CommonModule } from '@angular/common';

/**
 * Representa la estructura de datos para una pestaña individual.
 */
export interface Tab {
  /** Identificador único del tab (string o número). */
  id: string | number;
  /** Texto a mostrar en el botón de la pestaña. */
  label: string;
  /** Si es true, la pestaña aparecerá deshabilitada y no será clicable. */
  disabled?: boolean;
}

/**
 * Componente de pestañas reutilizable simplificado.
 * Basado en el diseño neobrutalista usado en el panel de Admin.
 *
 * @example
 * <app-tabs
 *   [tabs]="myTabs"
 *   [activeTabId]="currentTab()"
 *   (tabChange)="handleTabChange($event)"
 * />
 */
@Component({
  selector: 'app-tabs',
  imports: [CommonModule],
  templateUrl: './tabs.html',
  styleUrl: './tabs.scss',
  standalone: true
})
export class Tabs {
  // ========================================================================
  // INPUTS & OUTPUTS
  // ========================================================================

  /** Signal Input: Lista de pestañas a renderizar. Requerido. */
  tabs = input.required<Tab[]>();

  /** Signal Input: ID de la pestaña actualmente activa. Requerido. */
  activeTabId = input.required<string | number>();

  /** Output: Emite cuando el usuario cambia de pestaña. */
  tabChange = output<string | number>();

  // ========================================================================
  // PUBLIC METHODS
  // ========================================================================

  /**
   * Maneja el click en una pestaña.
   * @param tabId - El ID de la pestaña seleccionada.
   */
  selectTab(tabId: string | number) {
    const tab = this.tabs().find(t => t.id === tabId);
    if (tab && !tab.disabled) {
      this.tabChange.emit(tabId);
    }
  }

  /**
   * Comprueba si una pestaña específica está activa.
   * @param tabId - El ID de la pestaña a verificar.
   */
  isActive(tabId: string | number): boolean {
    return this.activeTabId() === tabId;
  }
}
