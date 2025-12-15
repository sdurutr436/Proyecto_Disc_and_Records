import { Component, input, signal, HostListener } from '@angular/core';
import { CommonModule } from '@angular/common';

export interface Tab {
  id: string | number;
  label: string;
  content: string;
  disabled?: boolean;
}

@Component({
  selector: 'app-tabs',
  imports: [CommonModule],
  templateUrl: './tabs.html',
  styleUrl: './tabs.scss',
})
export class Tabs {
  /**
   * Array de tabs a mostrar
   */
  tabs = input.required<Tab[]>();

  /**
   * ID del tab activo inicialmente (opcional)
   */
  initialActiveTab = input<string | number | undefined>(undefined);

  /**
   * Signal para controlar qué tab está activo
   */
  activeTabId = signal<string | number | null>(null);

  constructor() {
    // Inicializar el tab activo cuando se carga el componente
    setTimeout(() => {
      const initial = this.initialActiveTab();
      const tabsList = this.tabs();

      if (initial !== undefined) {
        this.activeTabId.set(initial);
      } else if (tabsList.length > 0) {
        // Si no hay initial, activar el primer tab no deshabilitado
        const firstEnabled = tabsList.find(t => !t.disabled);
        if (firstEnabled) {
          this.activeTabId.set(firstEnabled.id);
        }
      }
    });
  }

  /**
   * Cambiar al tab especificado
   */
  selectTab(tabId: string | number) {
    const tab = this.tabs().find(t => t.id === tabId);
    if (tab && !tab.disabled) {
      this.activeTabId.set(tabId);
    }
  }

  /**
   * Verificar si un tab está activo
   */
  isActive(tabId: string | number): boolean {
    return this.activeTabId() === tabId;
  }

  /**
   * Obtener el contenido del tab activo
   */
  getActiveContent(): string {
    const activeId = this.activeTabId();
    const activeTab = this.tabs().find(t => t.id === activeId);
    return activeTab?.content || '';
  }

  /**
   * Navegación con teclado: flechas izquierda/derecha
   */
  @HostListener('keydown.arrowleft')
  onArrowLeft() {
    this.navigateTabs(-1);
  }

  @HostListener('keydown.arrowright')
  onArrowRight() {
    this.navigateTabs(1);
  }

  /**
   * Navegar entre tabs con dirección (1 = siguiente, -1 = anterior)
   */
  private navigateTabs(direction: number) {
    const tabsList = this.tabs();
    const currentId = this.activeTabId();
    const currentIndex = tabsList.findIndex(t => t.id === currentId);

    if (currentIndex === -1) return;

    // Buscar el siguiente tab no deshabilitado
    let nextIndex = currentIndex + direction;

    // Hacer wrap-around (circular)
    if (nextIndex < 0) nextIndex = tabsList.length - 1;
    if (nextIndex >= tabsList.length) nextIndex = 0;

    // Evitar tabs deshabilitados
    let attempts = 0;
    while (tabsList[nextIndex]?.disabled && attempts < tabsList.length) {
      nextIndex += direction;
      if (nextIndex < 0) nextIndex = tabsList.length - 1;
      if (nextIndex >= tabsList.length) nextIndex = 0;
      attempts++;
    }

    if (!tabsList[nextIndex]?.disabled) {
      this.selectTab(tabsList[nextIndex].id);
    }
  }
}
