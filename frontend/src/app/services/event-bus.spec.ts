/**
 * ============================================================================
 * TESTS EXHAUSTIVOS: EventBusService
 * ============================================================================
 *
 * PROPÓSITO DE ESTOS TESTS:
 * Verificar que el servicio de bus de eventos funciona correctamente:
 * - Emisión de eventos con emit()
 * - Suscripción a eventos específicos con on()
 * - Suscripción a múltiples eventos con onMultiple()
 * - Obtención de todos los eventos con getAllEvents()
 * - Estadísticas del servicio
 *
 * COBERTURA:
 * - ✅ emit() emite eventos correctamente
 * - ✅ on() filtra por tipo de evento
 * - ✅ onMultiple() filtra por múltiples tipos
 * - ✅ getAllEvents() retorna todos los eventos
 * - ✅ Timestamps automáticos
 * - ✅ Payload de eventos
 * - ✅ Múltiples suscriptores
 * - ✅ Estadísticas
 *
 * @author Tests exhaustivos para Discs & Records
 * @version 2.0.0
 */

import { TestBed } from '@angular/core/testing';
import { EventBusService, EventType, AppEvent } from './event-bus';

describe('EventBusService', () => {

  let service: EventBusService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [EventBusService]
    });

    service = TestBed.inject(EventBusService);
  });

  /**
   * ══════════════════════════════════════════════════════════════════════════
   * GRUPO 1: Creación del Servicio
   * ══════════════════════════════════════════════════════════════════════════
   */
  describe('Creación del Servicio', () => {
    it('should be created', () => {
      expect(service).toBeTruthy();
    });
  });

  /**
   * ══════════════════════════════════════════════════════════════════════════
   * GRUPO 2: Método emit()
   * ══════════════════════════════════════════════════════════════════════════
   */
  describe('emit()', () => {

    it('should emit event to subscribers', (done) => {
      // Arrange
      service.on(EventType.USER_LOGIN).subscribe(event => {
        expect(event.type).toBe(EventType.USER_LOGIN);
        done();
      });

      // Act
      service.emit({ type: EventType.USER_LOGIN });
    });

    it('should include payload in emitted event', (done) => {
      // Arrange
      const payload = { userId: 123, username: 'testuser' };

      service.on(EventType.USER_LOGIN).subscribe(event => {
        expect(event.payload).toEqual(payload);
        done();
      });

      // Act
      service.emit({ type: EventType.USER_LOGIN, payload });
    });

    it('should add timestamp automatically', (done) => {
      // Arrange
      const before = Date.now();

      service.on(EventType.USER_LOGOUT).subscribe(event => {
        expect(event.timestamp).toBeGreaterThanOrEqual(before);
        expect(event.timestamp).toBeLessThanOrEqual(Date.now());
        done();
      });

      // Act
      service.emit({ type: EventType.USER_LOGOUT });
    });

    it('should use custom timestamp if provided', (done) => {
      // Arrange
      const customTimestamp = 1234567890;

      service.on(EventType.USER_LOGOUT).subscribe(event => {
        expect(event.timestamp).toBe(customTimestamp);
        done();
      });

      // Act
      service.emit({ type: EventType.USER_LOGOUT, timestamp: customTimestamp });
    });

    it('should include source information', (done) => {
      // Arrange
      service.on(EventType.SIDEBAR_TOGGLED).subscribe(event => {
        expect(event.source).toBe('HeaderComponent');
        done();
      });

      // Act
      service.emit({
        type: EventType.SIDEBAR_TOGGLED,
        source: 'HeaderComponent'
      });
    });
  });

  /**
   * ══════════════════════════════════════════════════════════════════════════
   * GRUPO 3: Método on() - Suscripción Filtrada
   * ══════════════════════════════════════════════════════════════════════════
   */
  describe('on() - Suscripción Filtrada', () => {

    it('should only receive events of specified type', () => {
      // Arrange
      const received: AppEvent[] = [];
      service.on(EventType.USER_LOGIN).subscribe(event => received.push(event));

      // Act - emitir varios tipos de eventos
      service.emit({ type: EventType.USER_LOGIN, payload: { id: 1 } });
      service.emit({ type: EventType.USER_LOGOUT }); // No debería recibir
      service.emit({ type: EventType.USER_LOGIN, payload: { id: 2 } });
      service.emit({ type: EventType.ALBUM_RATED }); // No debería recibir

      // Assert
      expect(received.length).toBe(2);
      expect(received[0].payload.id).toBe(1);
      expect(received[1].payload.id).toBe(2);
    });

    it('should allow multiple subscribers to same event type', () => {
      // Arrange
      let count1 = 0;
      let count2 = 0;

      service.on(EventType.ALBUM_ADDED_TO_FAVORITES).subscribe(() => count1++);
      service.on(EventType.ALBUM_ADDED_TO_FAVORITES).subscribe(() => count2++);

      // Act
      service.emit({ type: EventType.ALBUM_ADDED_TO_FAVORITES });

      // Assert
      expect(count1).toBe(1);
      expect(count2).toBe(1);
    });

    it('should properly type the payload', (done) => {
      // Arrange
      interface RatingPayload {
        albumId: number;
        rating: number;
      }

      service.on<RatingPayload>(EventType.ALBUM_RATED).subscribe(event => {
        // TypeScript sabe que payload tiene albumId y rating
        expect(event.payload?.albumId).toBe(123);
        expect(event.payload?.rating).toBe(5);
        done();
      });

      // Act
      service.emit({
        type: EventType.ALBUM_RATED,
        payload: { albumId: 123, rating: 5 }
      });
    });
  });

  /**
   * ══════════════════════════════════════════════════════════════════════════
   * GRUPO 4: Método onMultiple()
   * ══════════════════════════════════════════════════════════════════════════
   */
  describe('onMultiple() - Suscripción a Múltiples Eventos', () => {

    it('should receive events of multiple types', () => {
      // Arrange
      const received: AppEvent[] = [];
      service.onMultiple([
        EventType.ALBUM_ADDED_TO_FAVORITES,
        EventType.ALBUM_REMOVED_FROM_FAVORITES
      ]).subscribe(event => received.push(event));

      // Act
      service.emit({ type: EventType.ALBUM_ADDED_TO_FAVORITES, payload: 'added' });
      service.emit({ type: EventType.USER_LOGIN }); // No debería recibir
      service.emit({ type: EventType.ALBUM_REMOVED_FROM_FAVORITES, payload: 'removed' });

      // Assert
      expect(received.length).toBe(2);
      expect(received[0].payload).toBe('added');
      expect(received[1].payload).toBe('removed');
    });

    it('should filter out unspecified event types', () => {
      // Arrange
      let count = 0;
      service.onMultiple([EventType.USER_LOGIN, EventType.USER_LOGOUT])
        .subscribe(() => count++);

      // Act
      service.emit({ type: EventType.USER_LOGIN });
      service.emit({ type: EventType.ALBUM_RATED }); // Ignorado
      service.emit({ type: EventType.PLAYLIST_CREATED }); // Ignorado
      service.emit({ type: EventType.USER_LOGOUT });

      // Assert
      expect(count).toBe(2);
    });

    it('should work with single event type (same as on())', () => {
      // Arrange
      let received = false;
      service.onMultiple([EventType.MODAL_OPENED]).subscribe(() => received = true);

      // Act
      service.emit({ type: EventType.MODAL_OPENED });

      // Assert
      expect(received).toBeTruthy();
    });

    it('should work with empty array (receives nothing)', () => {
      // Arrange
      let count = 0;
      service.onMultiple([]).subscribe(() => count++);

      // Act
      service.emit({ type: EventType.USER_LOGIN });
      service.emit({ type: EventType.USER_LOGOUT });

      // Assert
      expect(count).toBe(0);
    });
  });

  /**
   * ══════════════════════════════════════════════════════════════════════════
   * GRUPO 5: Método getAllEvents()
   * ══════════════════════════════════════════════════════════════════════════
   */
  describe('getAllEvents()', () => {

    it('should receive all events', () => {
      // Arrange
      const received: AppEvent[] = [];
      service.getAllEvents().subscribe(event => received.push(event));

      // Act
      service.emit({ type: EventType.USER_LOGIN });
      service.emit({ type: EventType.ALBUM_RATED });
      service.emit({ type: EventType.PLAYLIST_CREATED });
      service.emit({ type: EventType.SIDEBAR_TOGGLED });

      // Assert
      expect(received.length).toBe(4);
    });

    it('should include events of all types', () => {
      // Arrange
      const types: EventType[] = [];
      service.getAllEvents().subscribe(event => types.push(event.type));

      // Act
      service.emit({ type: EventType.USER_LOGIN });
      service.emit({ type: EventType.ALBUM_RATED });
      service.emit({ type: EventType.NOTIFICATION_SHOW });

      // Assert
      expect(types).toContain(EventType.USER_LOGIN);
      expect(types).toContain(EventType.ALBUM_RATED);
      expect(types).toContain(EventType.NOTIFICATION_SHOW);
    });
  });

  /**
   * ══════════════════════════════════════════════════════════════════════════
   * GRUPO 6: Estadísticas
   * ══════════════════════════════════════════════════════════════════════════
   */
  describe('getStats()', () => {

    it('should track subscription count', () => {
      // Arrange
      const initialStats = service.getStats();
      const initialCount = initialStats.subscriptionCount;

      // Act
      service.on(EventType.USER_LOGIN).subscribe(() => {});
      service.on(EventType.USER_LOGOUT).subscribe(() => {});
      service.on(EventType.ALBUM_RATED).subscribe(() => {});

      // Assert
      const stats = service.getStats();
      expect(stats.subscriptionCount).toBe(initialCount + 3);
    });
  });

  /**
   * ══════════════════════════════════════════════════════════════════════════
   * GRUPO 7: Eventos del Dominio (Tipos Específicos)
   * ══════════════════════════════════════════════════════════════════════════
   */
  describe('Eventos del Dominio', () => {

    it('should handle USER_LOGIN event', (done) => {
      service.on(EventType.USER_LOGIN).subscribe(event => {
        expect(event.payload.username).toBe('testuser');
        done();
      });

      service.emit({
        type: EventType.USER_LOGIN,
        payload: { userId: 1, username: 'testuser' }
      });
    });

    it('should handle USER_LOGOUT event', (done) => {
      service.on(EventType.USER_LOGOUT).subscribe(event => {
        expect(event.type).toBe(EventType.USER_LOGOUT);
        done();
      });

      service.emit({ type: EventType.USER_LOGOUT });
    });

    it('should handle ALBUM_ADDED_TO_FAVORITES event', (done) => {
      service.on(EventType.ALBUM_ADDED_TO_FAVORITES).subscribe(event => {
        expect(event.payload.albumId).toBe(456);
        done();
      });

      service.emit({
        type: EventType.ALBUM_ADDED_TO_FAVORITES,
        payload: { albumId: 456 }
      });
    });

    it('should handle ALBUM_RATED event', (done) => {
      service.on(EventType.ALBUM_RATED).subscribe(event => {
        expect(event.payload.rating).toBe(5);
        done();
      });

      service.emit({
        type: EventType.ALBUM_RATED,
        payload: { albumId: 123, rating: 5 }
      });
    });

    it('should handle SEARCH_QUERY_CHANGED event', (done) => {
      service.on(EventType.SEARCH_QUERY_CHANGED).subscribe(event => {
        expect(event.payload.query).toBe('Beatles');
        done();
      });

      service.emit({
        type: EventType.SEARCH_QUERY_CHANGED,
        payload: { query: 'Beatles' }
      });
    });

    it('should handle SIDEBAR_TOGGLED event', (done) => {
      service.on(EventType.SIDEBAR_TOGGLED).subscribe(event => {
        expect(event.payload.isOpen).toBe(true);
        done();
      });

      service.emit({
        type: EventType.SIDEBAR_TOGGLED,
        payload: { isOpen: true }
      });
    });
  });

  /**
   * ══════════════════════════════════════════════════════════════════════════
   * GRUPO 8: Edge Cases
   * ══════════════════════════════════════════════════════════════════════════
   */
  describe('Edge Cases', () => {

    it('should handle event with undefined payload', (done) => {
      service.on(EventType.USER_LOGOUT).subscribe(event => {
        expect(event.payload).toBeUndefined();
        done();
      });

      service.emit({ type: EventType.USER_LOGOUT });
    });

    it('should handle event with null payload', (done) => {
      service.on(EventType.USER_LOGOUT).subscribe(event => {
        expect(event.payload).toBeNull();
        done();
      });

      service.emit({ type: EventType.USER_LOGOUT, payload: null });
    });

    it('should handle event with complex nested payload', (done) => {
      const complexPayload = {
        user: {
          id: 1,
          profile: {
            name: 'Test',
            preferences: {
              darkMode: true,
              language: 'es'
            }
          }
        },
        albums: [1, 2, 3]
      };

      service.on(EventType.USER_LOGIN).subscribe(event => {
        expect(event.payload).toEqual(complexPayload);
        done();
      });

      service.emit({ type: EventType.USER_LOGIN, payload: complexPayload });
    });

    it('should handle rapid fire events', () => {
      // Arrange
      let count = 0;
      service.on(EventType.NOTIFICATION_SHOW).subscribe(() => count++);

      // Act - 100 eventos rápidos
      for (let i = 0; i < 100; i++) {
        service.emit({
          type: EventType.NOTIFICATION_SHOW,
          payload: { message: `Notification ${i}` }
        });
      }

      // Assert
      expect(count).toBe(100);
    });

    it('should emit events in order', () => {
      // Arrange
      const order: number[] = [];
      service.on(EventType.ALBUM_RATED).subscribe(event => {
        order.push(event.payload.order);
      });

      // Act
      service.emit({ type: EventType.ALBUM_RATED, payload: { order: 1 } });
      service.emit({ type: EventType.ALBUM_RATED, payload: { order: 2 } });
      service.emit({ type: EventType.ALBUM_RATED, payload: { order: 3 } });

      // Assert
      expect(order).toEqual([1, 2, 3]);
    });

    it('should work without any subscribers', () => {
      // Act & Assert - no debería lanzar error
      expect(() => {
        service.emit({ type: EventType.USER_LOGIN });
      }).not.toThrow();
    });
  });
});
