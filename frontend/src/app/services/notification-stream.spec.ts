/**
 * ============================================================================
 * TESTS EXHAUSTIVOS: NotificationStreamService
 * ============================================================================
 *
 * PROPÓSITO DE ESTOS TESTS:
 * Verificar que el servicio de stream de notificaciones funciona correctamente:
 * - Emisión de notificaciones al Subject
 * - Métodos de conveniencia (success, error, warning, info)
 * - Observable notifications$ emite correctamente
 * - Estadísticas de notificaciones
 * - Integración con NotificationService
 *
 * COBERTURA:
 * - ✅ notify() emite notificaciones
 * - ✅ success(), error(), warning(), info()
 * - ✅ Observable notifications$ funciona
 * - ✅ Valores por defecto (duration, position)
 * - ✅ Estadísticas (getStats, resetStats)
 * - ✅ Múltiples suscriptores
 *
 * @author Tests exhaustivos para Discs & Records
 * @version 2.0.0
 */

import { TestBed } from '@angular/core/testing';
import { NotificationStreamService } from './notification-stream';
import { NotificationService, NotificationConfig } from './notification';

describe('NotificationStreamService', () => {

  let service: NotificationStreamService;
  let mockNotificationService: jasmine.SpyObj<NotificationService>;

  beforeEach(() => {
    mockNotificationService = jasmine.createSpyObj('NotificationService', ['show']);

    TestBed.configureTestingModule({
      providers: [
        NotificationStreamService,
        { provide: NotificationService, useValue: mockNotificationService }
      ]
    });

    service = TestBed.inject(NotificationStreamService);
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

    it('should have notifications$ observable', () => {
      expect(service.notifications$).toBeDefined();
      expect(typeof service.notifications$.subscribe).toBe('function');
    });
  });

  /**
   * ══════════════════════════════════════════════════════════════════════════
   * GRUPO 2: Método notify()
   * ══════════════════════════════════════════════════════════════════════════
   */
  describe('notify()', () => {
    it('should emit notification to stream', (done) => {
      // Arrange
      const config: NotificationConfig = {
        type: 'success',
        title: 'Test',
        message: 'Test message'
      };

      // Suscribirse para verificar emisión
      service.notifications$.subscribe(emitted => {
        expect(emitted.type).toBe('success');
        expect(emitted.title).toBe('Test');
        done();
      });

      // Act
      service.notify(config);
    });

    it('should call NotificationService.show()', () => {
      // Arrange
      const config: NotificationConfig = {
        type: 'info',
        title: 'Title',
        message: 'Message'
      };

      // Act
      service.notify(config);

      // Assert
      expect(mockNotificationService.show).toHaveBeenCalled();
    });

    it('should set default duration to 5000ms', (done) => {
      // Arrange
      const config: NotificationConfig = {
        type: 'info',
        title: 'Title',
        message: 'Message'
        // Sin duration
      };

      service.notifications$.subscribe(emitted => {
        expect(emitted.duration).toBe(5000);
        done();
      });

      // Act
      service.notify(config);
    });

    it('should set default position to top-right', (done) => {
      // Arrange
      const config: NotificationConfig = {
        type: 'info',
        title: 'Title',
        message: 'Message'
        // Sin position
      };

      service.notifications$.subscribe(emitted => {
        expect(emitted.position).toBe('top-right');
        done();
      });

      // Act
      service.notify(config);
    });

    it('should use custom duration when provided', (done) => {
      // Arrange
      const config: NotificationConfig = {
        type: 'info',
        title: 'Title',
        message: 'Message',
        duration: 10000
      };

      service.notifications$.subscribe(emitted => {
        expect(emitted.duration).toBe(10000);
        done();
      });

      // Act
      service.notify(config);
    });

    it('should use custom position when provided', (done) => {
      // Arrange
      const config: NotificationConfig = {
        type: 'info',
        title: 'Title',
        message: 'Message',
        position: 'bottom-left'
      };

      service.notifications$.subscribe(emitted => {
        expect(emitted.position).toBe('bottom-left');
        done();
      });

      // Act
      service.notify(config);
    });
  });

  /**
   * ══════════════════════════════════════════════════════════════════════════
   * GRUPO 3: Método success()
   * ══════════════════════════════════════════════════════════════════════════
   */
  describe('success()', () => {
    it('should emit success notification', (done) => {
      service.notifications$.subscribe(emitted => {
        expect(emitted.type).toBe('success');
        expect(emitted.title).toBe('Éxito');
        expect(emitted.message).toBe('Operación completada');
        done();
      });

      service.success('Éxito', 'Operación completada');
    });

    it('should use default duration', (done) => {
      service.notifications$.subscribe(emitted => {
        expect(emitted.duration).toBe(5000);
        done();
      });

      service.success('Title', 'Message');
    });

    it('should use custom duration when provided', (done) => {
      service.notifications$.subscribe(emitted => {
        expect(emitted.duration).toBe(3000);
        done();
      });

      service.success('Title', 'Message', 3000);
    });
  });

  /**
   * ══════════════════════════════════════════════════════════════════════════
   * GRUPO 4: Método error()
   * ══════════════════════════════════════════════════════════════════════════
   */
  describe('error()', () => {
    it('should emit error notification', (done) => {
      service.notifications$.subscribe(emitted => {
        expect(emitted.type).toBe('error');
        expect(emitted.title).toBe('Error');
        expect(emitted.message).toBe('Algo salió mal');
        done();
      });

      service.error('Error', 'Algo salió mal');
    });

    it('should use 8000ms duration by default (longer for errors)', (done) => {
      service.notifications$.subscribe(emitted => {
        expect(emitted.duration).toBe(8000);
        done();
      });

      service.error('Title', 'Message');
    });

    it('should use custom duration when provided', (done) => {
      service.notifications$.subscribe(emitted => {
        expect(emitted.duration).toBe(15000);
        done();
      });

      service.error('Title', 'Message', 15000);
    });
  });

  /**
   * ══════════════════════════════════════════════════════════════════════════
   * GRUPO 5: Método warning()
   * ══════════════════════════════════════════════════════════════════════════
   */
  describe('warning()', () => {
    it('should emit warning notification', (done) => {
      service.notifications$.subscribe(emitted => {
        expect(emitted.type).toBe('warning');
        expect(emitted.title).toBe('Advertencia');
        expect(emitted.message).toBe('Ten cuidado');
        done();
      });

      service.warning('Advertencia', 'Ten cuidado');
    });

    it('should use default duration', (done) => {
      service.notifications$.subscribe(emitted => {
        expect(emitted.duration).toBe(5000);
        done();
      });

      service.warning('Title', 'Message');
    });
  });

  /**
   * ══════════════════════════════════════════════════════════════════════════
   * GRUPO 6: Método info()
   * ══════════════════════════════════════════════════════════════════════════
   */
  describe('info()', () => {
    it('should emit info notification', (done) => {
      service.notifications$.subscribe(emitted => {
        expect(emitted.type).toBe('info');
        expect(emitted.title).toBe('Información');
        expect(emitted.message).toBe('Dato importante');
        done();
      });

      service.info('Información', 'Dato importante');
    });

    it('should use default duration', (done) => {
      service.notifications$.subscribe(emitted => {
        expect(emitted.duration).toBe(5000);
        done();
      });

      service.info('Title', 'Message');
    });
  });

  /**
   * ══════════════════════════════════════════════════════════════════════════
   * GRUPO 7: Estadísticas
   * ══════════════════════════════════════════════════════════════════════════
   */
  describe('Estadísticas', () => {

    beforeEach(() => {
      service.resetStats();
    });

    it('should track total notifications', () => {
      // Act
      service.success('T1', 'M1');
      service.error('T2', 'M2');
      service.warning('T3', 'M3');

      // Assert
      const stats = service.getStats();
      expect(stats.totalNotifications).toBe(3);
    });

    it('should track notifications by type', () => {
      // Act
      service.success('T', 'M');
      service.success('T', 'M');
      service.error('T', 'M');
      service.warning('T', 'M');
      service.info('T', 'M');

      // Assert
      const stats = service.getStats();
      expect(stats.byType.success).toBe(2);
      expect(stats.byType.error).toBe(1);
      expect(stats.byType.warning).toBe(1);
      expect(stats.byType.info).toBe(1);
    });

    it('should reset statistics', () => {
      // Arrange
      service.success('T', 'M');
      service.error('T', 'M');

      // Act
      service.resetStats();

      // Assert
      const stats = service.getStats();
      expect(stats.totalNotifications).toBe(0);
      expect(stats.byType.success).toBe(0);
      expect(stats.byType.error).toBe(0);
    });

    it('should return a copy of stats (not reference)', () => {
      // Arrange
      service.success('T', 'M');
      const stats1 = service.getStats();

      // Act
      service.success('T', 'M');
      const stats2 = service.getStats();

      // Assert - stats1 no debería cambiar
      expect(stats1.totalNotifications).toBe(1);
      expect(stats2.totalNotifications).toBe(2);
    });
  });

  /**
   * ══════════════════════════════════════════════════════════════════════════
   * GRUPO 8: Observable Behavior
   * ══════════════════════════════════════════════════════════════════════════
   */
  describe('Observable Behavior', () => {

    it('should allow multiple subscribers', () => {
      // Arrange
      let count1 = 0;
      let count2 = 0;

      service.notifications$.subscribe(() => count1++);
      service.notifications$.subscribe(() => count2++);

      // Act
      service.success('T', 'M');

      // Assert
      expect(count1).toBe(1);
      expect(count2).toBe(1);
    });

    it('should emit to all subscribers', () => {
      // Arrange
      const received: NotificationConfig[] = [];

      service.notifications$.subscribe(n => received.push(n));
      service.notifications$.subscribe(n => received.push(n));

      // Act
      service.info('Test', 'Message');

      // Assert - dos suscriptores reciben la misma notificación
      expect(received.length).toBe(2);
      expect(received[0]).toEqual(received[1]);
    });

    it('should emit notifications in order', () => {
      // Arrange
      const titles: string[] = [];
      service.notifications$.subscribe(n => titles.push(n.title));

      // Act
      service.success('First', 'M');
      service.warning('Second', 'M');
      service.error('Third', 'M');

      // Assert
      expect(titles).toEqual(['First', 'Second', 'Third']);
    });
  });

  /**
   * ══════════════════════════════════════════════════════════════════════════
   * GRUPO 9: Edge Cases
   * ══════════════════════════════════════════════════════════════════════════
   */
  describe('Edge Cases', () => {

    it('should handle empty title', (done) => {
      service.notifications$.subscribe(emitted => {
        expect(emitted.title).toBe('');
        done();
      });

      service.success('', 'Message');
    });

    it('should handle empty message', (done) => {
      service.notifications$.subscribe(emitted => {
        expect(emitted.message).toBe('');
        done();
      });

      service.info('Title', '');
    });

    it('should handle very long message', (done) => {
      const longMessage = 'A'.repeat(1000);

      service.notifications$.subscribe(emitted => {
        expect(emitted.message).toBe(longMessage);
        done();
      });

      service.info('Title', longMessage);
    });

    it('should handle special characters in title/message', (done) => {
      service.notifications$.subscribe(emitted => {
        expect(emitted.title).toBe('¡Título con ñ y €!');
        expect(emitted.message).toBe('<script>alert("XSS")</script>');
        done();
      });

      service.info('¡Título con ñ y €!', '<script>alert("XSS")</script>');
    });

    it('should handle rapid fire notifications', () => {
      // Arrange
      let count = 0;
      service.notifications$.subscribe(() => count++);

      // Act - 100 notificaciones rápidas
      for (let i = 0; i < 100; i++) {
        service.info(`Notification ${i}`, 'Message');
      }

      // Assert
      expect(count).toBe(100);
    });

    it('should handle zero duration', (done) => {
      service.notifications$.subscribe(emitted => {
        expect(emitted.duration).toBe(0);
        done();
      });

      service.success('Title', 'Message', 0);
    });
  });

  /**
   * ══════════════════════════════════════════════════════════════════════════
   * GRUPO 10: Integración con NotificationService
   * ══════════════════════════════════════════════════════════════════════════
   */
  describe('Integración con NotificationService', () => {

    it('should call NotificationService.show for each notification', () => {
      // Act
      service.success('T1', 'M1');
      service.error('T2', 'M2');
      service.warning('T3', 'M3');
      service.info('T4', 'M4');

      // Assert
      expect(mockNotificationService.show).toHaveBeenCalledTimes(4);
    });

    it('should pass complete config to NotificationService', () => {
      // Act
      service.success('Title', 'Message', 3000);

      // Assert
      expect(mockNotificationService.show).toHaveBeenCalledWith(
        jasmine.objectContaining({
          type: 'success',
          title: 'Title',
          message: 'Message',
          duration: 3000
        })
      );
    });
  });
});
