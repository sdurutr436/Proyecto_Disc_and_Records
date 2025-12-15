import { Component, signal, input, output, HostListener, effect } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-modal',
  imports: [CommonModule],
  templateUrl: './modal.html',
  styleUrl: './modal.scss',
})
export class Modal {
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

  constructor() {
    // Sincronizar isVisible con isOpen usando effect
    effect(() => {
      if (this.isOpen()) {
        this.open();
      } else {
        this.close();
      }
    });
  }

  /**
   * Abrir modal
   */
  open() {
    this.isVisible.set(true);
    // Prevenir scroll del body cuando el modal está abierto
    document.body.style.overflow = 'hidden';
  }

  /**
   * Cerrar modal
   */
  close() {
    this.isVisible.set(false);
    // Restaurar scroll del body
    document.body.style.overflow = '';
    // Emitir evento de cierre al padre
    this.onClose.emit();
  }

  /**
   * Cerrar al hacer click en el overlay (fuera del contenido)
   */
  onOverlayClick(event: MouseEvent) {
    const target = event.target as HTMLElement;
    // Solo cerrar si el click fue directamente en el overlay, no en el contenido
    if (target.classList.contains('modal__overlay')) {
      this.close();
    }
  }

  /**
   * Cerrar modal al presionar ESC
   */
  @HostListener('document:keydown.escape')
  onEscapeKey() {
    if (this.isVisible()) {
      this.close();
    }
  }

  /**
   * Trap focus: prevenir que el foco salga del modal
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
    if (event.shiftKey && document.activeElement === firstElement) {
      event.preventDefault();
      lastElement?.focus();
    }
    // Si Tab en el último elemento, ir al primero
    else if (!event.shiftKey && document.activeElement === lastElement) {
      event.preventDefault();
      firstElement?.focus();
    }
  }
}
