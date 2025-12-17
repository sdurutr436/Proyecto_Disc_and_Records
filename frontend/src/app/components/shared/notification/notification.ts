import { Component, Input, Output, EventEmitter, OnInit, OnDestroy, signal } from '@angular/core';
import { CommonModule } from '@angular/common';

/**
 * Notification Component - Componente de Notificación/Toast
 *
 * RESPONSABILIDADES (Solo Presentación):
 * - ✅ Renderizar la UI de la notificación
 * - ✅ Mostrar animaciones de entrada/salida
 * - ✅ Emitir evento cuando se cierra (dismissed)
 * - ✅ Gestionar auto-dismiss con timer
 * - ✅ Aplicar clases CSS según type y position
 * - ❌ NO crear notificaciones (lo hace el servicio)
 * - ❌ NO manipular DOM fuera de su elemento
 * - ❌ NO contener lógica de negocio
 *
 * PATRÓN: COMPONENTE DE PRESENTACIÓN (Presentational Component)
 *
 * Este componente es "tonto" (dumb component):
 * - Recibe datos por @Input
 * - Emite eventos por @Output
 * - No tiene lógica de negocio
 * - No interactúa con servicios (excepto ser creado por uno)
 *
 * FLUJO DE VIDA:
 * 1. NotificationService crea el componente dinámicamente
 * 2. NotificationService configura los @Input (type, title, message, etc.)
 * 3. ngOnInit() se ejecuta:
 *    - Inicia animación de entrada (isVisible = true)
 *    - Configura timer de auto-dismiss si está activado
 * 4. Usuario puede cerrar manualmente haciendo click en ✕
 * 5. Timer expira o usuario cierra manualmente
 * 6. onDismiss() ejecuta:
 *    - Inicia animación de salida (isVisible = false)
 *    - Emite evento dismissed después de animación
 * 7. NotificationService escucha dismissed y elimina del DOM
 *
 * @example
 * ```typescript
 * // El servicio lo usa así:
 * const componentRef = createComponent(Notification, {...});
 * componentRef.setInput('type', 'success');
 * componentRef.setInput('title', 'Guardado');
 * componentRef.setInput('message', 'Los cambios se guardaron');
 * componentRef.setInput('duration', 5000);
 * componentRef.instance.dismissed.subscribe(() => {
 *   // Eliminar del DOM
 * });
 * ```
 */
@Component({
  selector: 'app-notification',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './notification.html',
  styleUrl: './notification.scss'
})
export class Notification implements OnInit, OnDestroy {
  /**
   * INPUTS: Configuración de la notificación
   * Estos valores son inyectados por NotificationService con setInput()
   */

  /** Tipo de notificación: determina color e icono */
  @Input() type: 'success' | 'error' | 'warning' | 'info' = 'info';

  /** Título principal de la notificación */
  @Input() title: string = '';

  /** Mensaje descriptivo */
  @Input() message: string = '';

  /** Icono personalizado (opcional, si no se proporciona usa defaultIcon) */
  @Input() icon: string = '';

  /** Posición en la pantalla */
  @Input() position: 'top-right' | 'top-left' | 'bottom-right' | 'bottom-left' = 'top-right';

  /** Si debe cerrarse automáticamente */
  @Input() autoDismiss: boolean = true;

  /** Duración en ms antes de auto-dismiss */
  @Input() duration: number = 5000;

  /**
   * Índice de apilado para notificaciones estáticas (usadas en templates)
   * El servicio dinámico NO usa esto - calcula posiciones él mismo
   * -1 significa que no se usa apilado estático
   */
  @Input() stackIndex: number = -1;

  /**
   * OUTPUT: Evento emitido cuando se cierra la notificación
   * NotificationService se subscribe a este evento para eliminar del DOM
   */
  @Output() dismissed = new EventEmitter<void>();

  /**
   * ESTADO INTERNO: Control de visibilidad para animaciones
   * Signal moderno de Angular para reactividad
   */
  isVisible = signal(false);

  /**
   * ESTADO INTERNO: Control de pausa del timer
   * True cuando el mouse está sobre la notificación
   */
  isPaused = signal(false);

  /**
   * TIMER: ID del timeout para auto-dismiss
   * Lo guardamos para poder cancelarlo si se cierra manualmente
   */
  private timeoutId?: number;

  /**
   * TIMER: Tiempo restante en ms
   * Se usa para reanudar el timer después de pausar
   */
  private remainingTime: number = 0;

  /**
   * TIMER: Timestamp cuando se pausa
   * Se usa para calcular el tiempo transcurrido
   */
  private pausedAt: number = 0;

  /**
   * LIFECYCLE: Inicialización del componente
   *
   * WORKFLOW:
   * 1. Espera 10ms y activa animación de entrada (isVisible = true)
   * 2. Si autoDismiss está activado, configura timer
   * 3. Cuando expira el timer, llama a onDismiss()
   */
  ngOnInit(): void {
    // Trigger animación de entrada después de un breve delay
    // Esto permite que el componente se renderice antes de animar
    setTimeout(() => {
      this.isVisible.set(true);
    }, 10);

    // Inicializar tiempo restante
    this.remainingTime = this.duration;

    // Configurar auto-dismiss si está activado
    if (this.autoDismiss && this.duration > 0) {
      this.startTimer();
    }
  }

  /**
   * LIFECYCLE: Limpieza del componente
   * Cancela el timer si existe para evitar memory leaks
   */
  ngOnDestroy(): void {
    if (this.timeoutId) {
      clearTimeout(this.timeoutId);
    }
  }

  /**
   * HANDLER: Cerrar notificación
   *
   * WORKFLOW:
   * 1. Desactiva visibilidad para animación de salida
   * 2. Espera 300ms (duración de la animación CSS)
   * 3. Emite evento dismissed
   * 4. Cancela timer si existe
   * 5. NotificationService recibe el evento y elimina del DOM
   *
   * Puede ser llamado por:
   * - Click del usuario en el botón ✕
   * - Timer de auto-dismiss
   */
  onDismiss(): void {
    // Iniciar animación de salida
    this.isVisible.set(false);

    // Esperar a que termine la animación antes de emitir
    // IMPORTANTE: Este delay debe coincidir con la duración en notification.scss
    setTimeout(() => {
      this.dismissed.emit();

      // Limpiar timer si existe
      if (this.timeoutId) {
        clearTimeout(this.timeoutId);
      }
    }, 300); // Duración de la animación CSS (transition: all 0.3s)
  }

  /**
   * COMPUTED: Clases CSS dinámicas
   * Genera string de clases según el estado del componente
   *
   * @returns String con todas las clases CSS
   *
   * @example
   * "notification notification--success notification--top-right notification--visible"
   */
  get notificationClasses(): string {
    let classes = 'notification';
    classes += ` notification--${this.type}`;
    classes += ` notification--${this.position}`;
    if (this.isVisible()) {
      classes += ' notification--visible';
    }
    return classes;
  }

  /**
   * COMPUTED: Estilos inline para posicionamiento de apilado estático
   * Solo se aplica si stackIndex >= 0 (notificaciones en template)
   * Las notificaciones dinámicas (servicio) no usan esto
   *
   * @returns Objeto de estilos para [ngStyle]
   */
  get stackStyles(): { [key: string]: string } {
    // Si no hay stackIndex definido, no aplicar estilos de apilado
    if (this.stackIndex < 0) {
      return {};
    }

    const INITIAL_OFFSET = 20; // Margen inicial desde el borde
    const NOTIFICATION_HEIGHT = 92; // Altura real de notificación (min-height 60 + padding + border)
    const GAP = 12; // Espacio entre notificaciones

    const offset = INITIAL_OFFSET + (this.stackIndex * (NOTIFICATION_HEIGHT + GAP));

    // Aplicar al eje vertical según la posición
    if (this.position.startsWith('top')) {
      return { 'top': `${offset}px` };
    } else {
      return { 'bottom': `${offset}px` };
    }
  }

  /**
   * COMPUTED: Icono por defecto según tipo
   * Si no se proporciona icono personalizado, usa estos
   *
   * @returns Emoji/símbolo para mostrar
   */
  get defaultIcon(): string {
    // Si hay icono personalizado, usarlo
    if (this.icon) {
      return this.icon;
    }

    // Iconos por defecto según el tipo
    switch (this.type) {
      case 'success':
        return '✓'; // Check mark
      case 'error':
        return '✕'; // X mark
      case 'warning':
        return '⚠'; // Warning triangle
      case 'info':
        return 'ℹ'; // Info symbol
      default:
        return 'ℹ';
    }
  }

  /**
   * MÉTODO PRIVADO: Iniciar timer de auto-dismiss
   */
  private startTimer(): void {
    this.timeoutId = window.setTimeout(() => {
      this.onDismiss();
    }, this.remainingTime);
  }

  /**
   * MÉTODO PRIVADO: Pausar timer
   * Guarda el tiempo restante para poder reanudar después
   */
  private pauseTimer(): void {
    if (this.timeoutId) {
      clearTimeout(this.timeoutId);
      this.timeoutId = undefined;
      this.pausedAt = Date.now();
    }
  }

  /**
   * MÉTODO PRIVADO: Reanudar timer
   * Calcula el tiempo que pasó desde la pausa y ajusta remainingTime
   */
  private resumeTimer(): void {
    if (this.pausedAt > 0) {
      const elapsed = Date.now() - this.pausedAt;
      this.remainingTime = Math.max(0, this.remainingTime - elapsed);
      this.pausedAt = 0;

      if (this.remainingTime > 0) {
        this.startTimer();
      }
    }
  }

  /**
   * HANDLER: Mouse entra en la notificación
   * Pausa el timer de auto-dismiss
   */
  onMouseEnter(): void {
    if (this.autoDismiss) {
      this.isPaused.set(true);
      this.pauseTimer();
    }
  }

  /**
   * HANDLER: Mouse sale de la notificación
   * Reanuda el timer de auto-dismiss
   */
  onMouseLeave(): void {
    if (this.autoDismiss) {
      this.isPaused.set(false);
      this.resumeTimer();
    }
  }
}
