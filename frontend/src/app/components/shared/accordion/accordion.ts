import { Component, input, signal, ViewChildren, QueryList, ElementRef, AfterViewInit } from '@angular/core';
import { CommonModule } from '@angular/common';

export interface AccordionItem {
  id: string | number;
  title: string;
  content: string;
  isOpen?: boolean;
}

/**
 * Accordion Component
 *
 * BLOQUE 3.3 - ACCORDION ACCESIBLE:
 * - Navegación por teclado: ArrowUp, ArrowDown, Home, End
 * - Tabindex dinámico para gestión de foco
 * - Modo single o multiple para controlar apertura
 * - ARIA attributes para accesibilidad
 *
 * EVENTOS SOPORTADOS (BLOQUE 2.2):
 * - (keydown.arrowup): Navegar al header anterior
 * - (keydown.arrowdown): Navegar al header siguiente
 * - (keydown.home): Ir al primer header
 * - (keydown.end): Ir al último header
 * - (keydown.enter): Toggle del item actual
 * - (keydown.space): Toggle del item actual
 */
@Component({
  selector: 'app-accordion',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './accordion.html',
  styleUrl: './accordion.scss',
})
export class Accordion implements AfterViewInit {
  /**
   * MEJORA 1.1: ViewChildren para obtener referencias a los headers del accordion
   * Usado para navegación por teclado y gestión de foco
   */
  @ViewChildren('accordionHeader') accordionHeaders!: QueryList<ElementRef<HTMLButtonElement>>;

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

  /**
   * Índice del header actualmente enfocado (para navegación por teclado)
   */
  focusedIndex = signal<number>(0);

  ngAfterViewInit() {
    // Inicializar items abiertos por defecto
    const initialOpen = new Set<string | number>();
    this.items().forEach(item => {
      if (item.isOpen) {
        initialOpen.add(item.id);
      }
    });
    if (initialOpen.size > 0) {
      this.openItems.set(initialOpen);
    }
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

  // =========================================================================
  // BLOQUE 2.2 & 3.3: NAVEGACIÓN POR TECLADO
  // =========================================================================

  /**
   * Navegar al header anterior (ArrowUp)
   * Implementa wrap-around: del primero va al último
   */
  navigateUp(currentIndex: number): void {
    const headers = this.accordionHeaders?.toArray();
    if (!headers?.length) return;

    // Wrap-around: si estamos en el primero, ir al último
    const newIndex = currentIndex === 0 ? headers.length - 1 : currentIndex - 1;
    this.focusHeader(newIndex);
  }

  /**
   * Navegar al header siguiente (ArrowDown)
   * Implementa wrap-around: del último va al primero
   */
  navigateDown(currentIndex: number): void {
    const headers = this.accordionHeaders?.toArray();
    if (!headers?.length) return;

    // Wrap-around: si estamos en el último, ir al primero
    const newIndex = currentIndex === headers.length - 1 ? 0 : currentIndex + 1;
    this.focusHeader(newIndex);
  }

  /**
   * Ir al primer header (Home)
   */
  navigateToFirst(): void {
    this.focusHeader(0);
  }

  /**
   * Ir al último header (End)
   */
  navigateToLast(): void {
    const headers = this.accordionHeaders?.toArray();
    if (!headers?.length) return;
    this.focusHeader(headers.length - 1);
  }

  /**
   * Enfocar un header específico por índice
   */
  private focusHeader(index: number): void {
    const headers = this.accordionHeaders?.toArray();
    if (!headers?.length || index < 0 || index >= headers.length) return;

    this.focusedIndex.set(index);
    headers[index].nativeElement.focus();
  }

  /**
   * Handler para eventos de teclado en headers
   * BLOQUE 2.2: Eventos específicos de teclado
   */
  onHeaderKeydown(event: KeyboardEvent, index: number, itemId: string | number): void {
    switch (event.key) {
      case 'ArrowUp':
        // preventDefault evita scroll de la página
        event.preventDefault();
        this.navigateUp(index);
        break;
      case 'ArrowDown':
        // preventDefault evita scroll de la página
        event.preventDefault();
        this.navigateDown(index);
        break;
      case 'Home':
        // preventDefault evita scroll al inicio de la página
        event.preventDefault();
        this.navigateToFirst();
        break;
      case 'End':
        // preventDefault evita scroll al final de la página
        event.preventDefault();
        this.navigateToLast();
        break;
      case 'Enter':
      case ' ':
        // Space y Enter togglean el accordion
        event.preventDefault();
        this.toggle(itemId);
        break;
    }
  }

  /**
   * Actualizar índice enfocado cuando un header recibe foco
   */
  onHeaderFocus(index: number): void {
    this.focusedIndex.set(index);
  }

  /**
   * Obtener tabindex dinámico para roving tabindex pattern
   * Solo el header enfocado tiene tabindex="0", los demás "-1"
   */
  getTabIndex(index: number): number {
    return this.focusedIndex() === index ? 0 : -1;
  }
}
