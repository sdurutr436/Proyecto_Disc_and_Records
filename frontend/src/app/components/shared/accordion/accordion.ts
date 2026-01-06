import { Component, input, signal } from '@angular/core';
import { CommonModule } from '@angular/common';

export interface AccordionItem {
  id: string | number;
  title: string;
  content: string;
  isOpen?: boolean;
}

@Component({
  selector: 'app-accordion',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './accordion.html',
  styleUrl: './accordion.scss',
})
export class Accordion {
  /**
   * Array de items del accordion
   */
  items = input.required<AccordionItem[]>();

  /**
   * Modo del accordion:
   * - 'single': solo un item abierto a la vez
   * - 'multiple': múltiples items pueden estar abiertos simultáneamente
   */
  mode = input<'single' | 'multiple'>('single');

  /**
   * IDs de los items que están abiertos actualmente
   */
  openItems = signal<Set<string | number>>(new Set());

  constructor() {
    // Inicializar items abiertos por defecto
    // Los items con isOpen: true se abren al inicio
  }

  /**
   * Toggle de un item del accordion
   */
  toggle(itemId: string | number) {
    const currentOpen = new Set(this.openItems());

    if (currentOpen.has(itemId)) {
      // Si ya está abierto, cerrarlo
      currentOpen.delete(itemId);
    } else {
      // Si está cerrado, abrirlo
      if (this.mode() === 'single') {
        // En modo 'single', cerrar todos los demás
        currentOpen.clear();
      }
      currentOpen.add(itemId);
    }

    this.openItems.set(currentOpen);
  }

  /**
   * Verificar si un item está abierto
   */
  isOpen(itemId: string | number): boolean {
    return this.openItems().has(itemId);
  }
}
