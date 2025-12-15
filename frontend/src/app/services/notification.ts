import { Injectable, ApplicationRef, createComponent, EnvironmentInjector, ComponentRef } from '@angular/core';
import { Subject, Observable } from 'rxjs';
import { Notification } from '../components/shared/notification/notification';

/**
 * Configuración de notificación
 */
export interface NotificationConfig {
  type: 'success' | 'error' | 'warning' | 'info';
  title: string;
  message: string;
  duration?: number;
  position?: 'top-right' | 'top-left' | 'bottom-right' | 'bottom-left';
  autoDismiss?: boolean;
  icon?: string;
}

/**
 * NotificationService - Servicio Centralizado de Notificaciones
 *
 * PROPÓSITO:
 * - Gestionar la creación dinámica de componentes de notificación
 * - Manipular el DOM para insertar/eliminar notificaciones
 * - Proporcionar API simple para mostrar diferentes tipos de notificaciones
 * - Coordinar auto-dismiss configurable
 *
 * PATRÓN: SEPARACIÓN DE RESPONSABILIDADES
 *
 * COMPONENTE (Notification):
 * - ✅ Renderiza la UI de la notificación
 * - ✅ Muestra animaciones
 * - ✅ Emite evento cuando se cierra
 * - ❌ NO crea notificaciones
 * - ❌ NO manipula el DOM fuera de su elemento
 *
 * SERVICIO (NotificationService):
 * - ✅ Crea componentes dinámicamente
 * - ✅ Manipula el DOM (appendChild, removeChild)
 * - ✅ Gestiona el ciclo de vida de las notificaciones
 * - ✅ Proporciona API conveniente (success, error, etc.)
 * - ❌ NO renderiza UI
 * - ❌ NO maneja animaciones CSS
 *
 * FLUJO COMPLETO:
 * 1. Código llama a notificationService.success('Título', 'Mensaje')
 * 2. Servicio crea componente Notification dinámicamente
 * 3. Servicio configura inputs del componente
 * 4. Servicio hace appendChild al body
 * 5. Componente muestra animación de entrada
 * 6. Componente auto-dismiss después de duration
 * 7. Componente emite evento dismissed
 * 8. Servicio escucha evento y hace removeChild del DOM
 * 9. Servicio destruye el componente
 *
 * @example
 * ```typescript
 * // En cualquier componente o servicio
 * export class MyComponent {
 *   private notificationService = inject(NotificationService);
 *
 *   onSave() {
 *     this.notificationService.success('Guardado', 'Los cambios se guardaron correctamente');
 *   }
 *
 *   onError() {
 *     this.notificationService.error('Error', 'No se pudo guardar', 10000);
 *   }
 * }
 * ```
 */
@Injectable({
  providedIn: 'root',
})
export class NotificationService {
  /**
   * Lista de notificaciones activas en el DOM
   * Almacena ComponentRef para poder destruirlas después
   */
  private notifications: ComponentRef<Notification>[] = [];

  /**
   * Subject para emitir eventos de notificaciones
   * Permite a otros servicios/componentes escuchar cuando se muestran notificaciones
   */
  private notificationSubject = new Subject<NotificationConfig>();

  /**
   * Observable público para subscripciones externas
   */
  public notification$: Observable<NotificationConfig> = this.notificationSubject.asObservable();

  constructor(
    private appRef: ApplicationRef,
    private injector: EnvironmentInjector
  ) {}

  /**
   * MÉTODO PRINCIPAL: Mostrar notificación
   *
   * WORKFLOW:
   * 1. Crear componente dinámicamente con createComponent()
   * 2. Configurar inputs del componente (type, title, message, etc.)
   * 3. Subscribirse al evento dismissed del componente
   * 4. Añadir al árbol de Angular (attachView)
   * 5. Manipular DOM: appendChild al body
   * 6. Emitir evento en el Subject para observadores
   * 7. Guardar referencia para limpieza posterior
   *
   * @param config - Configuración de la notificación
   *
   * @example
   * ```typescript
   * notificationService.show({
   *   type: 'success',
   *   title: 'Guardado',
   *   message: 'Los cambios se guardaron correctamente',
   *   duration: 5000,
   *   position: 'top-right'
   * });
   * ```
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
    componentRef.setInput('autoDismiss', config.autoDismiss !== false);

    if (config.icon) {
      componentRef.setInput('icon', config.icon);
    }

    // 3. Suscribirse al evento de cierre
    componentRef.instance.dismissed.subscribe(() => {
      this.remove(componentRef);
    });

    // 4. Añadir al árbol de Angular para detección de cambios
    this.appRef.attachView(componentRef.hostView);

    // 5. MANIPULACIÓN DIRECTA DEL DOM: Obtener el elemento HTML y añadirlo al body
    const domElem = (componentRef.hostView as any).rootNodes[0] as HTMLElement;
    document.body.appendChild(domElem);

    // 6. Emitir evento para observadores externos
    this.notificationSubject.next(config);

    // 7. Guardar referencia para poder eliminarlo después
    this.notifications.push(componentRef);
  }

  /**
   * MÉTODO PRIVADO: Eliminar notificación del DOM
   *
   * WORKFLOW:
   * 1. Obtener elemento HTML del ComponentRef
   * 2. Manipular DOM: removeChild del parent
   * 3. Desconectar de Angular (detachView)
   * 4. Destruir componente (destroy)
   * 5. Remover de la lista de notificaciones activas
   *
   * @param componentRef - Referencia al componente a eliminar
   */
  private remove(componentRef: ComponentRef<Notification>): void {
    // 1. Obtener el elemento del DOM
    const domElem = (componentRef.hostView as any).rootNodes[0] as HTMLElement;

    // 2. MANIPULACIÓN DIRECTA DEL DOM: Remover del body
    if (domElem && domElem.parentNode) {
      domElem.parentNode.removeChild(domElem);
    }

    // 3. Limpiar de Angular (detach del árbol de change detection)
    this.appRef.detachView(componentRef.hostView);

    // 4. Destruir el componente liberando recursos
    componentRef.destroy();

    // 5. Remover de la lista de notificaciones activas
    const index = this.notifications.indexOf(componentRef);
    if (index !== -1) {
      this.notifications.splice(index, 1);
    }
  }

  /**
   * Limpiar todas las notificaciones activas
   * Útil al navegar entre páginas o al cerrar sesión
   *
   * @example
   * ```typescript
   * // Al cerrar sesión
   * notificationService.clearAll();
   * ```
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

  // ==========================================================================
  // MÉTODOS DE CONVENIENCIA
  // Proporcionan API simple para los casos más comunes
  // ==========================================================================

  /**
   * Mostrar notificación de ÉXITO
   *
   * @param title - Título de la notificación
   * @param message - Mensaje descriptivo
   * @param duration - Duración en ms (default: 5000)
   *
   * @example
   * ```typescript
   * notificationService.success('Guardado', 'Los cambios se guardaron correctamente');
   * ```
   */
  success(title: string, message: string, duration: number = 5000): void {
    this.show({
      type: 'success',
      title,
      message,
      duration,
      position: 'top-right',
    });
  }

  /**
   * Mostrar notificación de ERROR
   * Por defecto dura más tiempo (8000ms) para asegurar que el usuario la vea
   *
   * @param title - Título del error
   * @param message - Mensaje descriptivo del error
   * @param duration - Duración en ms (default: 8000)
   *
   * @example
   * ```typescript
   * notificationService.error('Error', 'No se pudo guardar el álbum', 10000);
   * ```
   */
  error(title: string, message: string, duration: number = 8000): void {
    this.show({
      type: 'error',
      title,
      message,
      duration,
      position: 'top-right',
    });
  }

  /**
   * Mostrar notificación de ADVERTENCIA
   *
   * @param title - Título de la advertencia
   * @param message - Mensaje descriptivo
   * @param duration - Duración en ms (default: 6000)
   *
   * @example
   * ```typescript
   * notificationService.warning('Atención', 'Este álbum ya está en favoritos');
   * ```
   */
  warning(title: string, message: string, duration: number = 6000): void {
    this.show({
      type: 'warning',
      title,
      message,
      duration,
      position: 'top-right',
    });
  }

  /**
   * Mostrar notificación INFORMATIVA
   *
   * @param title - Título de la información
   * @param message - Mensaje descriptivo
   * @param duration - Duración en ms (default: 5000)
   *
   * @example
   * ```typescript
   * notificationService.info('Actualización', 'Hay 3 álbumes nuevos disponibles');
   * ```
   */
  info(title: string, message: string, duration: number = 5000): void {
    this.show({
      type: 'info',
      title,
      message,
      duration,
      position: 'top-right',
    });
  }

  /**
   * Mostrar notificación PERSISTENTE (sin auto-dismiss)
   * El usuario debe cerrarla manualmente
   *
   * @param type - Tipo de notificación
   * @param title - Título
   * @param message - Mensaje
   *
   * @example
   * ```typescript
   * // Para errores críticos que requieren acción del usuario
   * notificationService.persistent('error', 'Conexión perdida', 'No se puede conectar al servidor');
   * ```
   */
  persistent(
    type: 'success' | 'error' | 'warning' | 'info',
    title: string,
    message: string
  ): void {
    this.show({
      type,
      title,
      message,
      autoDismiss: false, // No se cierra automáticamente
    });
  }

  /**
   * Obtener número de notificaciones activas
   * Útil para debugging o mostrar contador
   *
   * @returns Cantidad de notificaciones en pantalla
   */
  getActiveCount(): number {
    return this.notifications.length;
  }
}
