import { Injectable } from '@angular/core';
import { Subject, Observable, filter } from 'rxjs';

/**
 * Tipos de eventos que pueden circular por el EventBus
 *
 * WORKFLOW:
 * 1. Un componente emite un evento con emit()
 * 2. El evento se publica en el Subject interno
 * 3. Otros componentes suscritos reciben el evento
 * 4. Se ejecutan sus handlers correspondientes
 */
export enum EventType {
  // Eventos de usuario
  USER_LOGIN = 'USER_LOGIN',
  USER_LOGOUT = 'USER_LOGOUT',
  USER_PROFILE_UPDATED = 'USER_PROFILE_UPDATED',

  // Eventos de búsqueda
  SEARCH_QUERY_CHANGED = 'SEARCH_QUERY_CHANGED',
  SEARCH_RESULTS_READY = 'SEARCH_RESULTS_READY',

  // Eventos de álbumes
  ALBUM_ADDED_TO_FAVORITES = 'ALBUM_ADDED_TO_FAVORITES',
  ALBUM_REMOVED_FROM_FAVORITES = 'ALBUM_REMOVED_FROM_FAVORITES',
  ALBUM_RATED = 'ALBUM_RATED',

  // Eventos de playlist
  PLAYLIST_CREATED = 'PLAYLIST_CREATED',
  PLAYLIST_UPDATED = 'PLAYLIST_UPDATED',
  PLAYLIST_DELETED = 'PLAYLIST_DELETED',

  // Eventos de UI
  MODAL_OPENED = 'MODAL_OPENED',
  MODAL_CLOSED = 'MODAL_CLOSED',
  SIDEBAR_TOGGLED = 'SIDEBAR_TOGGLED',

  // Eventos de notificación
  NOTIFICATION_SHOW = 'NOTIFICATION_SHOW',
  NOTIFICATION_DISMISSED = 'NOTIFICATION_DISMISSED',
}

/**
 * Estructura de un evento del EventBus
 *
 * @template T - Tipo del payload que transporta el evento
 */
export interface AppEvent<T = any> {
  /** Tipo de evento (del enum EventType) */
  type: EventType;

  /** Datos asociados al evento */
  payload?: T;

  /** Timestamp de cuando se emitió el evento */
  timestamp: number;

  /** ID del componente que emitió el evento (opcional, para debugging) */
  source?: string;
}

/**
 * EventBusService - Servicio de comunicación entre componentes
 *
 * PROPÓSITO:
 * - Permite comunicación desacoplada entre componentes que no tienen relación padre-hijo
 * - Útil para componentes hermanos o componentes en diferentes ramas del árbol
 * - Implementa patrón Publish-Subscribe usando RxJS
 *
 * ARQUITECTURA:
 * ```
 * Componente A (hermano)          Componente B (hermano)
 *       |                                 |
 *       | emit(event)                     | on(EventType) - subscribe
 *       ↓                                 ↓
 *   EventBusService (Subject)
 *       |
 *       └─→ Observable ─→ Todos los suscriptores reciben el evento
 * ```
 *
 * CASO DE USO:
 * ```typescript
 * // Componente A quiere notificar que el usuario agregó un álbum a favoritos
 * eventBus.emit({
 *   type: EventType.ALBUM_ADDED_TO_FAVORITES,
 *   payload: { albumId: 123 }
 * });
 *
 * // Componente B (hermano de A) escucha y actualiza su UI
 * eventBus.on(EventType.ALBUM_ADDED_TO_FAVORITES).subscribe(event => {
 *   this.updateFavoritesCount(event.payload.albumId);
 * });
 * ```
 *
 * VENTAJAS:
 * - Desacoplamiento total entre componentes
 * - No necesita cadena de @Input/@Output
 * - Escalable para arquitecturas complejas
 *
 * ADVERTENCIAS:
 * - Siempre hacer unsubscribe() en ngOnDestroy() para evitar memory leaks
 * - No abusar: para relaciones simples padre-hijo usar @Input/@Output
 * - Para estado global persistente, usar AppStateService en su lugar
 */
@Injectable({
  providedIn: 'root',
})
export class EventBusService {
  /**
   * Subject privado que actúa como el "bus" de eventos
   * Un Subject es tanto Observable (puedes suscribirte) como Observer (puedes emitir)
   */
  private eventSubject = new Subject<AppEvent>();

  /**
   * Observable público para suscripciones
   * Los componentes se suscriben a este Observable para recibir eventos
   */
  private events$: Observable<AppEvent> = this.eventSubject.asObservable();

  /**
   * Registro de suscripciones activas (para debugging y estadísticas)
   */
  private subscriptionCount = 0;

  constructor() {
    // Logging en desarrollo para ver el flujo de eventos
    if (!this.isProduction()) {
      this.events$.subscribe(event => {
        console.log('[EventBus] Evento emitido:', {
          type: event.type,
          payload: event.payload,
          timestamp: new Date(event.timestamp).toISOString(),
          source: event.source || 'unknown',
        });
      });
    }
  }

  /**
   * Emitir un evento en el bus
   *
   * WORKFLOW:
   * 1. Componente llama a emit() con el tipo y payload
   * 2. Se crea un objeto AppEvent con timestamp
   * 3. Se publica en el Subject
   * 4. Todos los observadores suscritos reciben el evento
   *
   * @param event - Evento a emitir (puede ser partial, se completa automáticamente)
   *
   * @example
   * ```typescript
   * // Forma simple
   * eventBus.emit({
   *   type: EventType.ALBUM_RATED,
   *   payload: { albumId: 123, rating: 5 }
   * });
   *
   * // Con información de source para debugging
   * eventBus.emit({
   *   type: EventType.USER_LOGOUT,
   *   source: 'HeaderComponent'
   * });
   * ```
   */
  emit(event: Omit<AppEvent, 'timestamp'> & { timestamp?: number }): void {
    const completeEvent: AppEvent = {
      ...event,
      timestamp: event.timestamp || Date.now(),
    };

    this.eventSubject.next(completeEvent);
  }

  /**
   * Suscribirse a un tipo específico de evento
   *
   * WORKFLOW:
   * 1. Componente llama a on(EventType)
   * 2. Se filtra el stream de eventos para solo ese tipo
   * 3. Componente recibe un Observable con solo esos eventos
   * 4. Componente se suscribe y recibe notificaciones
   *
   * @param eventType - Tipo de evento a escuchar
   * @returns Observable que emite solo eventos del tipo especificado
   *
   * @example
   * ```typescript
   * // En el componente
   * ngOnInit() {
   *   this.subscription = this.eventBus
   *     .on(EventType.ALBUM_ADDED_TO_FAVORITES)
   *     .subscribe(event => {
   *       console.log('Álbum agregado:', event.payload.albumId);
   *       this.updateUI();
   *     });
   * }
   *
   * ngOnDestroy() {
   *   // CRÍTICO: Siempre limpiar suscripciones
   *   this.subscription.unsubscribe();
   * }
   * ```
   */
  on<T = any>(eventType: EventType): Observable<AppEvent<T>> {
    this.subscriptionCount++;

    return this.events$.pipe(
      filter((event): event is AppEvent<T> => event.type === eventType)
    );
  }

  /**
   * Suscribirse a múltiples tipos de eventos
   *
   * @param eventTypes - Array de tipos de eventos a escuchar
   * @returns Observable que emite eventos de cualquiera de los tipos especificados
   *
   * @example
   * ```typescript
   * // Escuchar varios eventos relacionados con favoritos
   * this.eventBus
   *   .onMultiple([
   *     EventType.ALBUM_ADDED_TO_FAVORITES,
   *     EventType.ALBUM_REMOVED_FROM_FAVORITES
   *   ])
   *   .subscribe(event => {
   *     this.refreshFavorites();
   *   });
   * ```
   */
  onMultiple(eventTypes: EventType[]): Observable<AppEvent> {
    return this.events$.pipe(
      filter(event => eventTypes.includes(event.type))
    );
  }

  /**
   * Obtener el stream completo de eventos (sin filtrar)
   * Útil para logging centralizado o auditoría
   *
   * @example
   * ```typescript
   * // Logger service que registra todos los eventos
   * eventBus.getAllEvents().subscribe(event => {
   *   this.logToAnalytics(event);
   * });
   * ```
   */
  getAllEvents(): Observable<AppEvent> {
    return this.events$;
  }

  /**
   * Obtener estadísticas del EventBus (para debugging)
   */
  getStats(): { subscriptionCount: number } {
    return {
      subscriptionCount: this.subscriptionCount,
    };
  }

  /**
   * Verificar si estamos en producción
   */
  private isProduction(): boolean {
    return typeof window !== 'undefined' &&
           (window as any).location?.hostname !== 'localhost';
  }
}
