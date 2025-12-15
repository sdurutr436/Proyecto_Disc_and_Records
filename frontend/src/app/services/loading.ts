/**
 * LoadingService - Gestión de Estados de Carga
 *
 * PROPÓSITO:
 * Servicio centralizado para gestionar estados de carga global y local
 * en la aplicación. Permite mostrar/ocultar spinners y barras de progreso.
 *
 * CARACTERÍSTICAS:
 * - Estado de carga global (overlay completo)
 * - Estados de carga locales (por identificador)
 * - Contador de operaciones simultáneas
 * - Observable para suscripción reactiva
 * - Barra de progreso con porcentaje
 *
 * ARQUITECTURA:
 * ┌─────────────────────────────────────────────────────────────┐
 * │                    COMPONENTES                               │
 * │  (AlbumService, AuthService, HttpInterceptor, etc.)         │
 * └──────────────┬──────────────────────────────────────────────┘
 *                │ start() / stop()
 *                ↓
 * ┌─────────────────────────────────────────────────────────────┐
 * │                  LoadingService                              │
 * │  - isLoading$ (Observable<boolean>)                         │
 * │  - progress$ (Observable<number>)                           │
 * │  - localStates (Map<string, boolean>)                       │
 * └──────────────┬──────────────────────────────────────────────┘
 *                │ Signals/Observables
 *                ↓
 * ┌─────────────────────────────────────────────────────────────┐
 * │              UI COMPONENTS                                   │
 * │  - Spinner (global overlay)                                  │
 * │  - ProgressBar (barra de progreso)                          │
 * │  - Button (loading local)                                    │
 * └─────────────────────────────────────────────────────────────┘
 */

import { Injectable, signal, computed } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

/**
 * Configuración para operaciones de carga
 */
export interface LoadingConfig {
  /** Identificador único para loading local */
  id?: string;
  /** Mensaje a mostrar durante la carga */
  message?: string;
  /** Si es true, bloquea interacción con la UI */
  blocking?: boolean;
}

/**
 * Estado de una operación de carga
 */
export interface LoadingState {
  isLoading: boolean;
  message: string;
  progress: number;
}

@Injectable({ providedIn: 'root' })
export class LoadingService {
  // =========================================================================
  // ESTADO GLOBAL
  // =========================================================================

  /**
   * Contador de operaciones activas
   * Permite múltiples operaciones simultáneas sin conflictos
   */
  private activeOperations = signal(0);

  /**
   * Mensaje de carga actual
   */
  private loadingMessage = signal('Cargando...');

  /**
   * Progreso actual (0-100)
   * -1 indica progreso indeterminado
   */
  private currentProgress = signal(-1);

  /**
   * Signal computado: indica si hay alguna operación activa
   */
  readonly isLoading = computed(() => this.activeOperations() > 0);

  /**
   * Signal computado: mensaje actual de carga
   */
  readonly message = computed(() => this.loadingMessage());

  /**
   * Signal computado: progreso actual
   */
  readonly progress = computed(() => this.currentProgress());

  // =========================================================================
  // ESTADO LOCAL (Por componente/operación)
  // =========================================================================

  /**
   * Map de estados locales por ID
   * Permite que botones/componentes tengan su propio estado de carga
   */
  private localStates = new Map<string, boolean>();

  /**
   * Subject para notificar cambios en estados locales
   */
  private localStatesSubject = new BehaviorSubject<Map<string, boolean>>(
    new Map()
  );

  /**
   * Observable de estados locales
   */
  readonly localStates$ = this.localStatesSubject.asObservable();

  // =========================================================================
  // MÉTODOS PÚBLICOS - LOADING GLOBAL
  // =========================================================================

  /**
   * Inicia una operación de carga global
   *
   * WORKFLOW:
   * 1. Incrementa contador de operaciones
   * 2. Actualiza mensaje si se proporciona
   * 3. UI muestra spinner automáticamente
   *
   * @param message - Mensaje opcional a mostrar
   *
   * @example
   * ```typescript
   * loadingService.start('Guardando álbum...');
   * await albumService.save(album);
   * loadingService.stop();
   * ```
   */
  start(message: string = 'Cargando...'): void {
    this.activeOperations.update((count) => count + 1);
    this.loadingMessage.set(message);
    this.currentProgress.set(-1); // Indeterminado
  }

  /**
   * Detiene una operación de carga global
   *
   * WORKFLOW:
   * 1. Decrementa contador de operaciones
   * 2. Si llega a 0, UI oculta spinner
   *
   * @example
   * ```typescript
   * loadingService.stop();
   * ```
   */
  stop(): void {
    this.activeOperations.update((count) => Math.max(0, count - 1));

    // Si no hay operaciones, resetear estado
    if (this.activeOperations() === 0) {
      this.currentProgress.set(-1);
    }
  }

  /**
   * Fuerza la detención de todas las operaciones
   * Usar con precaución (por ejemplo, al hacer logout)
   *
   * @example
   * ```typescript
   * // Al cerrar sesión
   * loadingService.stopAll();
   * ```
   */
  stopAll(): void {
    this.activeOperations.set(0);
    this.currentProgress.set(-1);
    this.localStates.clear();
    this.localStatesSubject.next(new Map());
  }

  // =========================================================================
  // MÉTODOS PÚBLICOS - PROGRESO
  // =========================================================================

  /**
   * Establece el progreso de la operación actual
   *
   * @param percent - Porcentaje de progreso (0-100)
   *
   * @example
   * ```typescript
   * loadingService.start('Subiendo archivo...');
   * loadingService.setProgress(25);
   * // ... más operaciones
   * loadingService.setProgress(50);
   * loadingService.setProgress(100);
   * loadingService.stop();
   * ```
   */
  setProgress(percent: number): void {
    this.currentProgress.set(Math.min(100, Math.max(0, percent)));
  }

  /**
   * Incrementa el progreso actual
   *
   * @param amount - Cantidad a incrementar
   *
   * @example
   * ```typescript
   * loadingService.incrementProgress(10);
   * ```
   */
  incrementProgress(amount: number): void {
    const current = this.currentProgress();
    if (current >= 0) {
      this.setProgress(current + amount);
    }
  }

  // =========================================================================
  // MÉTODOS PÚBLICOS - LOADING LOCAL
  // =========================================================================

  /**
   * Inicia loading local para un componente específico
   *
   * WORKFLOW:
   * 1. Guarda estado en Map con ID
   * 2. Emite cambio en Subject
   * 3. Componente suscrito se actualiza
   *
   * @param id - Identificador único del componente
   *
   * @example
   * ```typescript
   * // En botón de guardar
   * loadingService.startLocal('save-button');
   * await save();
   * loadingService.stopLocal('save-button');
   * ```
   */
  startLocal(id: string): void {
    this.localStates.set(id, true);
    this.localStatesSubject.next(new Map(this.localStates));
  }

  /**
   * Detiene loading local para un componente específico
   *
   * @param id - Identificador único del componente
   */
  stopLocal(id: string): void {
    this.localStates.set(id, false);
    this.localStatesSubject.next(new Map(this.localStates));
  }

  /**
   * Verifica si un componente específico está en loading
   *
   * @param id - Identificador del componente
   * @returns true si está cargando
   *
   * @example
   * ```typescript
   * if (loadingService.isLocalLoading('save-button')) {
   *   return; // No hacer nada si ya está cargando
   * }
   * ```
   */
  isLocalLoading(id: string): boolean {
    return this.localStates.get(id) ?? false;
  }

  /**
   * Limpia el estado local de un componente
   *
   * @param id - Identificador del componente
   */
  clearLocal(id: string): void {
    this.localStates.delete(id);
    this.localStatesSubject.next(new Map(this.localStates));
  }

  // =========================================================================
  // MÉTODOS DE CONVENIENCIA
  // =========================================================================

  /**
   * Ejecuta una operación async con loading automático
   *
   * @param operation - Promesa a ejecutar
   * @param message - Mensaje de carga
   * @returns Resultado de la operación
   *
   * @example
   * ```typescript
   * const albums = await loadingService.withLoading(
   *   albumService.getAll(),
   *   'Cargando álbumes...'
   * );
   * ```
   */
  async withLoading<T>(operation: Promise<T>, message?: string): Promise<T> {
    this.start(message);
    try {
      return await operation;
    } finally {
      this.stop();
    }
  }

  /**
   * Ejecuta una operación async con loading local automático
   *
   * @param id - Identificador del componente
   * @param operation - Promesa a ejecutar
   * @returns Resultado de la operación
   *
   * @example
   * ```typescript
   * await loadingService.withLocalLoading(
   *   'save-button',
   *   albumService.save(album)
   * );
   * ```
   */
  async withLocalLoading<T>(id: string, operation: Promise<T>): Promise<T> {
    this.startLocal(id);
    try {
      return await operation;
    } finally {
      this.stopLocal(id);
    }
  }
}
