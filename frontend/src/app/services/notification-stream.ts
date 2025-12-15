import { Injectable } from '@angular/core';
import { Subject, Observable } from 'rxjs';
import { NotificationService, NotificationConfig } from './notification';

/**
 * NotificationStreamService - Servicio de Notificaciones con Patrón Observable
 *
 * PROPÓSITO:
 * - Implementar patrón Observable/Subject para sistema de notificaciones
 * - Permitir que múltiples componentes emitan notificaciones de forma desacoplada
 * - Centralizar el manejo de notificaciones en un stream reactivo
 *
 * ARQUITECTURA:
 * ```
 * Componente A                    Componente B
 *    |                                 |
 *    | notify()                        | notify()
 *    ↓                                 ↓
 *      NotificationStreamService (Subject)
 *                   |
 *                   | Observable stream
 *                   ↓
 *           NotificationService
 *                   |
 *                   | createComponent()
 *                   ↓
 *              DOM (Render)
 * ```
 *
 * WORKFLOW COMPLETO:
 * 1. Componente llama a notificationStream.notify(config)
 * 2. Evento se emite en el Subject
 * 3. NotificationService escucha el stream y crea el componente visual
 * 4. Notificación aparece en pantalla
 * 5. Después de X segundos o click en X, se destruye
 *
 * DIFERENCIA CON NotificationService:
 * - NotificationService: Crea y destruye componentes en el DOM (imperativo)
 * - NotificationStreamService: Stream reactivo de notificaciones (declarativo)
 *
 * VENTAJA DEL PATRÓN OBSERVABLE:
 * - Desacoplamiento: componentes no conocen NotificationService directamente
 * - Reactivo: puedes aplicar operadores RxJS (throttle, debounce, filter)
 * - Testable: fácil de mockear en tests
 * - Escalable: puedes tener múltiples suscriptores al stream
 *
 * CASO DE USO:
 * ```typescript
 * // Componente emite notificación sin conocer la implementación
 * this.notificationStream.notify({
 *   type: 'success',
 *   title: 'Guardado',
 *   message: 'Los cambios se guardaron correctamente'
 * });
 *
 * // Otro servicio puede escuchar y registrar todas las notificaciones
 * this.notificationStream.notifications$.subscribe(config => {
 *   this.analyticsService.track('notification_shown', config);
 * });
 * ```
 */
@Injectable({
  providedIn: 'root',
})
export class NotificationStreamService {
  /**
   * Subject privado que actúa como el stream de notificaciones
   * Cada vez que se emite una notificación, este Subject la propaga
   */
  private notificationSubject = new Subject<NotificationConfig>();

  /**
   * Observable público del stream de notificaciones
   * Los suscriptores reciben cada notificación emitida
   */
  notifications$: Observable<NotificationConfig> =
    this.notificationSubject.asObservable();

  /**
   * Estadísticas del servicio
   */
  private stats = {
    totalNotifications: 0,
    byType: {
      success: 0,
      error: 0,
      warning: 0,
      info: 0,
    },
  };

  /**
   * CONSTRUCTOR
   *
   * WORKFLOW DE INICIALIZACIÓN:
   * 1. Se inyecta NotificationService (el que crea componentes visuales)
   * 2. Se suscribe al stream de notificaciones
   * 3. Por cada notificación en el stream, llama a NotificationService.show()
   * 4. Esto conecta el patrón Observable con la creación visual de componentes
   */
  constructor(private notificationService: NotificationService) {
    // Conectar el stream con el servicio visual
    this.notifications$.subscribe(config => {
      // Delegar al servicio que maneja el DOM
      this.notificationService.show(config);

      // Actualizar estadísticas
      this.updateStats(config);

      // Log en desarrollo
      if (!this.isProduction()) {
        console.log('[NotificationStream] Notificación emitida:', config);
      }
    });
  }

  /**
   * Emitir una notificación en el stream
   *
   * WORKFLOW:
   * 1. Componente llama a notify(config)
   * 2. Config se valida (valores por defecto si faltan)
   * 3. Se emite en el Subject
   * 4. Todos los suscriptores reciben la notificación
   * 5. Constructor la captura y llama a NotificationService.show()
   *
   * @param config - Configuración de la notificación
   *
   * @example
   * ```typescript
   * // Notificación simple
   * this.notificationStream.notify({
   *   type: 'success',
   *   title: 'Éxito',
   *   message: 'Operación completada'
   * });
   *
   * // Notificación con configuración completa
   * this.notificationStream.notify({
   *   type: 'error',
   *   title: 'Error',
   *   message: 'No se pudo conectar con el servidor',
   *   duration: 10000,
   *   position: 'top-center'
   * });
   * ```
   */
  notify(config: NotificationConfig): void {
    // Validar y establecer valores por defecto
    const completeConfig: NotificationConfig = {
      type: config.type,
      title: config.title,
      message: config.message,
      duration: config.duration ?? 5000,
      position: config.position ?? 'top-right',
    };

    // Emitir en el stream
    this.notificationSubject.next(completeConfig);
  }

  /**
   * Métodos de conveniencia para tipos específicos de notificación
   * Simplifican el código del llamador
   */

  /**
   * Emitir notificación de éxito
   *
   * @example
   * ```typescript
   * this.notificationStream.success('Guardado', 'Los cambios se guardaron');
   * ```
   */
  success(title: string, message: string, duration?: number): void {
    this.notify({
      type: 'success',
      title,
      message,
      duration,
    });
  }

  /**
   * Emitir notificación de error
   *
   * @example
   * ```typescript
   * this.notificationStream.error('Error', 'No se pudo conectar');
   * ```
   */
  error(title: string, message: string, duration?: number): void {
    this.notify({
      type: 'error',
      title,
      message,
      duration: duration ?? 8000, // Errores duran más por defecto
    });
  }

  /**
   * Emitir notificación de advertencia
   *
   * @example
   * ```typescript
   * this.notificationStream.warning('Advertencia', 'Sesión por expirar');
   * ```
   */
  warning(title: string, message: string, duration?: number): void {
    this.notify({
      type: 'warning',
      title,
      message,
      duration,
    });
  }

  /**
   * Emitir notificación informativa
   *
   * @example
   * ```typescript
   * this.notificationStream.info('Nueva función', 'Ahora puedes exportar playlists');
   * ```
   */
  info(title: string, message: string, duration?: number): void {
    this.notify({
      type: 'info',
      title,
      message,
      duration,
    });
  }

  /**
   * Obtener estadísticas del servicio
   * Útil para debugging y analytics
   *
   * @example
   * ```typescript
   * const stats = this.notificationStream.getStats();
   * console.log(`Total notificaciones: ${stats.totalNotifications}`);
   * console.log(`Errores: ${stats.byType.error}`);
   * ```
   */
  getStats() {
    return { ...this.stats };
  }

  /**
   * Resetear estadísticas
   */
  resetStats(): void {
    this.stats = {
      totalNotifications: 0,
      byType: {
        success: 0,
        error: 0,
        warning: 0,
        info: 0,
      },
    };
  }

  /**
   * Actualizar estadísticas internas
   */
  private updateStats(config: NotificationConfig): void {
    this.stats.totalNotifications++;
    this.stats.byType[config.type]++;
  }

  /**
   * Verificar si estamos en producción
   */
  private isProduction(): boolean {
    return typeof window !== 'undefined' &&
           (window as any).location?.hostname !== 'localhost';
  }
}
