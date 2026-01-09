import {
  BehaviorSubject,
  Injectable,
  __async,
  computed,
  setClassMetadata,
  signal,
  ɵɵdefineInjectable
} from "./chunk-PFYGRVXA.js";

// src/app/services/loading.ts
var LoadingService = class _LoadingService {
  // =========================================================================
  // ESTADO GLOBAL
  // =========================================================================
  /**
   * Contador de operaciones activas
   * Permite múltiples operaciones simultáneas sin conflictos
   */
  activeOperations = signal(0, ...ngDevMode ? [{ debugName: "activeOperations" }] : []);
  /**
   * Mensaje de carga actual
   */
  loadingMessage = signal("Cargando...", ...ngDevMode ? [{ debugName: "loadingMessage" }] : []);
  /**
   * Progreso actual (0-100)
   * -1 indica progreso indeterminado
   */
  currentProgress = signal(-1, ...ngDevMode ? [{ debugName: "currentProgress" }] : []);
  /**
   * Signal computado: indica si hay alguna operación activa
   */
  isLoading = computed(() => this.activeOperations() > 0, ...ngDevMode ? [{ debugName: "isLoading" }] : []);
  /**
   * Signal computado: mensaje actual de carga
   */
  message = computed(() => this.loadingMessage(), ...ngDevMode ? [{ debugName: "message" }] : []);
  /**
   * Signal computado: progreso actual
   */
  progress = computed(() => this.currentProgress(), ...ngDevMode ? [{ debugName: "progress" }] : []);
  // =========================================================================
  // ESTADO LOCAL (Por componente/operación)
  // =========================================================================
  /**
   * Map de estados locales por ID
   * Permite que botones/componentes tengan su propio estado de carga
   */
  localStates = /* @__PURE__ */ new Map();
  /**
   * Subject para notificar cambios en estados locales
   */
  localStatesSubject = new BehaviorSubject(/* @__PURE__ */ new Map());
  /**
   * Observable de estados locales
   */
  localStates$ = this.localStatesSubject.asObservable();
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
  start(message = "Cargando...") {
    this.activeOperations.update((count) => count + 1);
    this.loadingMessage.set(message);
    this.currentProgress.set(-1);
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
  stop() {
    this.activeOperations.update((count) => Math.max(0, count - 1));
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
  stopAll() {
    this.activeOperations.set(0);
    this.currentProgress.set(-1);
    this.localStates.clear();
    this.localStatesSubject.next(/* @__PURE__ */ new Map());
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
  setProgress(percent) {
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
  incrementProgress(amount) {
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
  startLocal(id) {
    this.localStates.set(id, true);
    this.localStatesSubject.next(new Map(this.localStates));
  }
  /**
   * Detiene loading local para un componente específico
   *
   * @param id - Identificador único del componente
   */
  stopLocal(id) {
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
  isLocalLoading(id) {
    return this.localStates.get(id) ?? false;
  }
  /**
   * Limpia el estado local de un componente
   *
   * @param id - Identificador del componente
   */
  clearLocal(id) {
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
  withLoading(operation, message) {
    return __async(this, null, function* () {
      this.start(message);
      try {
        return yield operation;
      } finally {
        this.stop();
      }
    });
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
  withLocalLoading(id, operation) {
    return __async(this, null, function* () {
      this.startLocal(id);
      try {
        return yield operation;
      } finally {
        this.stopLocal(id);
      }
    });
  }
  static \u0275fac = function LoadingService_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _LoadingService)();
  };
  static \u0275prov = /* @__PURE__ */ \u0275\u0275defineInjectable({ token: _LoadingService, factory: _LoadingService.\u0275fac, providedIn: "root" });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(LoadingService, [{
    type: Injectable,
    args: [{ providedIn: "root" }]
  }], null, null);
})();

export {
  LoadingService
};
//# sourceMappingURL=chunk-MBYWNRDU.js.map
