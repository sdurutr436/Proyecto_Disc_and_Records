import { Component, signal, input, output, HostListener, effect, Renderer2, inject } from '@angular/core';
import { CommonModule } from '@angular/common';

/**
 * Modal Component
 *
 * BLOQUE 3.2 - MODAL ACCESIBLE:
 * - Cierre con ESC y click en overlay
 * - stopPropagation en contenido para evitar cierre accidental
 * - Focus trap: el foco no sale del modal mientras está abierto
 * - Focus restore: devuelve el foco al elemento que abrió el modal
 * - Bloqueo de scroll del body durante apertura
 *
 * EVENTOS SOPORTADOS (BLOQUE 2.2/2.4):
 * - document:keydown.escape: cierre global con ESC
 * - keydown (Tab): trap de foco dentro del modal
 * - click (overlay): cierre al hacer click fuera del contenido
 *
 * BLOQUE 2.3 - preventDefault/stopPropagation:
 * - stopPropagation en contenido del modal
 * - preventDefault en Tab para trap de foco
 */
@Component({
  selector: 'app-modal',
  imports: [CommonModule],
  templateUrl: './modal.html',
  styleUrl: './modal.scss',
})
export class Modal {
  /**
   * MEJORA 1.2: Inyectamos Renderer2 para manipulación segura del DOM
   */
  private renderer = inject(Renderer2);

  /**
   * Señal para controlar si el modal está abierto.
   * Se puede pasar desde el componente padre.
   */
  isOpen = input<boolean>(false);

  /**
   * Título del modal (opcional)
   */
  title = input<string>('');

  /**
   * Evento que se emite cuando el modal se cierra
   */
  onClose = output<void>();

  /**
   * Signal interna para controlar animaciones
   */
  isVisible = signal(false);

  /**
   * Flag para distinguir cierre por usuario vs cierre por input
   */
  private closedByUser = false;

  /**
   * MEJORA 3.2: Referencia al elemento que tenía el foco antes de abrir el modal
   * Se usa para restaurar el foco al cerrar
   */
  private previouslyFocusedElement: HTMLElement | null = null;

  constructor() {
    // Sincronizar isVisible con isOpen usando effect
    effect(() => {
      if (this.isOpen()) {
        this.open();
      } else {
        // Cierre por cambio de input, no emitir evento
        this.closeWithoutEmit();
      }
    });
  }

  /**
   * Abrir modal
   * MEJORA 3.2: Guarda el elemento activo para restaurar foco al cerrar
   */
  open() {
    // Guardar referencia al elemento que tenía el foco
    this.previouslyFocusedElement = document.activeElement as HTMLElement;

    this.isVisible.set(true);
    this.closedByUser = false;

    // Prevenir scroll del body cuando el modal está abierto
    // MEJORA 1.2: Usamos Renderer2 para modificar estilos de forma segura
    this.renderer.setStyle(document.body, 'overflow', 'hidden');

    // Enfocar el primer elemento focusable del modal después de renderizar
    setTimeout(() => this.focusFirstElement(), 50);
  }

  /**
   * Cerrar modal (por acción del usuario)
   * MEJORA 3.2: Restaura el foco al elemento que abrió el modal
   */
  close() {
    this.isVisible.set(false);

    // Restaurar scroll del body
    this.renderer.removeStyle(document.body, 'overflow');

    // MEJORA 3.2: Restaurar foco al elemento anterior
    this.restoreFocus();

    // Emitir evento de cierre al padre
    this.onClose.emit();
  }

  /**
   * Cerrar modal sin emitir evento (por cambio de input)
   */
  private closeWithoutEmit() {
    this.isVisible.set(false);
    this.renderer.removeStyle(document.body, 'overflow');
    this.restoreFocus();
  }

  /**
   * MEJORA 3.2: Restaurar foco al elemento que abrió el modal
   * Mejora la accesibilidad al devolver al usuario al punto de partida
   */
  private restoreFocus(): void {
    if (this.previouslyFocusedElement && typeof this.previouslyFocusedElement.focus === 'function') {
      // Pequeño delay para asegurar que el modal se ha cerrado
      setTimeout(() => {
        this.previouslyFocusedElement?.focus();
        this.previouslyFocusedElement = null;
      }, 50);
    }
  }

  /**
   * Enfocar el primer elemento focusable del modal
   */
  private focusFirstElement(): void {
    const modalElement = document.querySelector('.modal__content');
    if (!modalElement) return;

    const focusableElements = modalElement.querySelectorAll(
      'a[href], button:not([disabled]), textarea:not([disabled]), input:not([disabled]), select:not([disabled]), [tabindex]:not([tabindex="-1"])'
    );

    const firstElement = focusableElements[0] as HTMLElement;
    firstElement?.focus();
  }

  /**
   * Cerrar al hacer click en el overlay (fuera del contenido)
   * El cierre se maneja aquí, no en el contenido gracias a stopPropagation
   */
  onOverlayClick(event: MouseEvent) {
    const target = event.target as HTMLElement;
    // Solo cerrar si el click fue directamente en el overlay, no en el contenido
    if (target.classList.contains('modal__overlay')) {
      this.close();
    }
  }

  /**
   * MEJORA 2.3: stopPropagation en el contenido del modal
   * Evita que clicks dentro del contenido cierren el modal
   */
  onContentClick(event: MouseEvent): void {
    // stopPropagation evita que el evento llegue al overlay
    // Así, clicks en botones, inputs, etc. no cierran el modal
    event.stopPropagation();
  }

  /**
   * Cerrar modal al presionar ESC
   * BLOQUE 2.4: HostListener para evento global de teclado
   */
  @HostListener('document:keydown.escape')
  onEscapeKey() {
    if (this.isVisible()) {
      this.close();
    }
  }

  /**
   * Trap focus: prevenir que el foco salga del modal
   * BLOQUE 2.3: Usa preventDefault para evitar navegación fuera del modal
   */
  @HostListener('keydown', ['$event'])
  onKeydown(event: KeyboardEvent) {
    if (!this.isVisible() || event.key !== 'Tab') return;

    const modalElement = document.querySelector('.modal__content');
    if (!modalElement) return;

    const focusableElements = modalElement.querySelectorAll(
      'a[href], button:not([disabled]), textarea:not([disabled]), input:not([disabled]), select:not([disabled]), [tabindex]:not([tabindex="-1"])'
    );

    const firstElement = focusableElements[0] as HTMLElement;
    const lastElement = focusableElements[focusableElements.length - 1] as HTMLElement;

    // Si Shift+Tab en el primer elemento, ir al último
    // preventDefault evita que el foco salga del modal
    if (event.shiftKey && document.activeElement === firstElement) {
      event.preventDefault();
      lastElement?.focus();
    }
    // Si Tab en el último elemento, ir al primero
    // preventDefault evita que el foco salga del modal
    else if (!event.shiftKey && document.activeElement === lastElement) {
      event.preventDefault();
      firstElement?.focus();
    }
  }
}
