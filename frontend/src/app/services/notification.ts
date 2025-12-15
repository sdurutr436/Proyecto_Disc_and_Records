import { Injectable, ApplicationRef, createComponent, EnvironmentInjector, ComponentRef } from '@angular/core';
import { Notification } from '../components/shared/notification/notification';

export interface NotificationConfig {
  type: 'success' | 'error' | 'warning' | 'info';
  title: string;
  message: string;
  duration?: number;
  position?: 'top-right' | 'top-left' | 'bottom-right' | 'bottom-left';
}

@Injectable({
  providedIn: 'root',
})
export class NotificationService {
  private notifications: ComponentRef<Notification>[] = [];

  constructor(
    private appRef: ApplicationRef,
    private injector: EnvironmentInjector
  ) {}

  /**
   * Mostrar notificación creando dinámicamente el componente en el DOM
   * Esta es la técnica de manipulación avanzada del DOM
   */
  show(config: NotificationConfig): void {
    // 1. Crear el componente dinámicamente
    const componentRef = createComponent(Notification, {
      environmentInjector: this.injector,
    });

    // 2. Configurar los inputs del componente
    componentRef.setInput('type', config.type);
    componentRef.setInput('title', config.title);
    componentRef.setInput('message', config.message);
    componentRef.setInput('position', config.position || 'top-right');
    componentRef.setInput('duration', config.duration || 5000);
    componentRef.setInput('autoDismiss', true);

    // 3. Suscribirse al evento de cierre
    componentRef.instance.dismissed.subscribe(() => {
      this.remove(componentRef);
    });

    // 4. Añadir al árbol de Angular para detección de cambios
    this.appRef.attachView(componentRef.hostView);

    // 5. MANIPULACIÓN DIRECTA DEL DOM: Obtener el elemento HTML y añadirlo al body
    const domElem = (componentRef.hostView as any).rootNodes[0] as HTMLElement;
    document.body.appendChild(domElem);

    // 6. Guardar referencia para poder eliminarlo después
    this.notifications.push(componentRef);
  }

  /**
   * Eliminar notificación del DOM
   * MANIPULACIÓN DIRECTA: removeChild del DOM
   */
  private remove(componentRef: ComponentRef<Notification>): void {
    // 1. Obtener el elemento del DOM
    const domElem = (componentRef.hostView as any).rootNodes[0] as HTMLElement;

    // 2. MANIPULACIÓN DIRECTA DEL DOM: Remover del body
    if (domElem && domElem.parentNode) {
      domElem.parentNode.removeChild(domElem);
    }

    // 3. Limpiar de Angular
    this.appRef.detachView(componentRef.hostView);
    componentRef.destroy();

    // 4. Remover de la lista
    const index = this.notifications.indexOf(componentRef);
    if (index !== -1) {
      this.notifications.splice(index, 1);
    }
  }

  /**
   * Limpiar todas las notificaciones
   */
  clearAll(): void {
    this.notifications.forEach(ref => {
      const domElem = (ref.hostView as any).rootNodes[0] as HTMLElement;
      if (domElem && domElem.parentNode) {
        domElem.parentNode.removeChild(domElem);
      }
      this.appRef.detachView(ref.hostView);
      ref.destroy();
    });
    this.notifications = [];
  }
}
