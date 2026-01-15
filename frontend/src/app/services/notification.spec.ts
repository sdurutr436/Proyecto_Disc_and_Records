/**
 * ============================================================================
 * TESTS: NotificationService
 * ============================================================================
 *
 * PROPÓSITO:
 * Verificar que el servicio de notificaciones funciona correctamente:
 * - Creación de notificaciones (success, error, warning, info)
 * - Configuración de duración y posición
 * - Observable de notificaciones
 *
 * @author Tests para Discs & Records MVP
 */

import { TestBed } from '@angular/core/testing';
import { NotificationService, NotificationConfig } from './notification';

describe('NotificationService', () => {
  let service: NotificationService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [NotificationService]
    });

    service = TestBed.inject(NotificationService);
  });

  afterEach(() => {
    // Limpiar notificaciones después de cada test
    service.clearAll();
  });

  /**
   * GRUPO 1: Creación del servicio
   */
  describe('Creación', () => {
    it('should be created', () => {
      expect(service).toBeTruthy();
    });

    it('should have notification$ observable', () => {
      expect(service.notification$).toBeDefined();
    });
  });

  /**
   * GRUPO 2: Métodos de conveniencia
   */
  describe('Métodos de Conveniencia', () => {
    it('should have success method', () => {
      expect(typeof service.success).toBe('function');
    });

    it('should have error method', () => {
      expect(typeof service.error).toBe('function');
    });

    it('should have warning method', () => {
      expect(typeof service.warning).toBe('function');
    });

    it('should have info method', () => {
      expect(typeof service.info).toBe('function');
    });

    it('should have show method', () => {
      expect(typeof service.show).toBe('function');
    });
  });

  /**
   * GRUPO 3: Observable de notificaciones
   */
  describe('Observable', () => {
    it('should emit notification on success', (done) => {
      service.notification$.subscribe((notification: NotificationConfig) => {
        expect(notification.type).toBe('success');
        expect(notification.title).toBe('Test Title');
        done();
      });

      service.success('Test Title', 'Test Message');
    });

    it('should emit notification on error', (done) => {
      service.notification$.subscribe((notification: NotificationConfig) => {
        expect(notification.type).toBe('error');
        done();
      });

      service.error('Error Title', 'Error Message');
    });

    it('should emit notification on warning', (done) => {
      service.notification$.subscribe((notification: NotificationConfig) => {
        expect(notification.type).toBe('warning');
        done();
      });

      service.warning('Warning Title', 'Warning Message');
    });

    it('should emit notification on info', (done) => {
      service.notification$.subscribe((notification: NotificationConfig) => {
        expect(notification.type).toBe('info');
        done();
      });

      service.info('Info Title', 'Info Message');
    });
  });

  /**
   * GRUPO 4: Configuración de notificaciones
   */
  describe('Configuración', () => {
    it('should accept custom duration', (done) => {
      service.notification$.subscribe((notification: NotificationConfig) => {
        expect(notification.duration).toBe(10000);
        done();
      });

      service.success('Title', 'Message', 10000);
    });

    it('should use show method with full config', (done) => {
      const config: NotificationConfig = {
        type: 'info',
        title: 'Custom',
        message: 'Custom Message',
        duration: 3000,
        position: 'top-left'
      };

      service.notification$.subscribe((notification: NotificationConfig) => {
        expect(notification.title).toBe('Custom');
        expect(notification.position).toBe('top-left');
        done();
      });

      service.show(config);
    });
  });

  /**
   * GRUPO 5: Limpieza de notificaciones
   */
  describe('Limpieza', () => {
    it('should have clearAll method', () => {
      expect(typeof service.clearAll).toBe('function');
    });

    it('should not throw when clearing empty notifications', () => {
      expect(() => service.clearAll()).not.toThrow();
    });
  });
});
