/**
 * ============================================================================
 * TESTS: LoadingService
 * ============================================================================
 *
 * PROPÓSITO:
 * Verificar que el servicio de loading funciona correctamente:
 * - Estados de carga global
 * - Contador de operaciones activas
 * - Estados de carga locales
 * - Progreso con porcentaje
 *
 * @author Tests para Discs & Records MVP
 */

import { TestBed } from '@angular/core/testing';
import { LoadingService } from './loading';

describe('LoadingService', () => {
  let service: LoadingService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [LoadingService]
    });

    service = TestBed.inject(LoadingService);
  });

  /**
   * GRUPO 1: Creación del servicio
   */
  describe('Creación', () => {
    it('should be created', () => {
      expect(service).toBeTruthy();
    });

    it('should have isLoading signal', () => {
      expect(service.isLoading).toBeDefined();
    });

    it('should have message signal', () => {
      expect(service.message).toBeDefined();
    });

    it('should have progress signal', () => {
      expect(service.progress).toBeDefined();
    });

    it('should start with isLoading = false', () => {
      expect(service.isLoading()).toBeFalse();
    });

    it('should have default message', () => {
      expect(service.message()).toBeTruthy();
    });

    it('should have progress = -1 (indeterminate) initially', () => {
      expect(service.progress()).toBe(-1);
    });
  });

  /**
   * GRUPO 2: start/stop - Estado de carga global
   */
  describe('start/stop', () => {
    it('should set isLoading to true when start is called', () => {
      service.start();
      expect(service.isLoading()).toBeTrue();
    });

    it('should set isLoading to false when stop is called', () => {
      service.start();
      service.stop();
      expect(service.isLoading()).toBeFalse();
    });

    it('should accept custom message on start', () => {
      service.start('Procesando...');
      expect(service.message()).toBe('Procesando...');
    });

    it('should handle multiple start calls (counter)', () => {
      service.start();
      service.start();
      service.start();

      // Debería seguir en loading
      expect(service.isLoading()).toBeTrue();

      // Necesita 3 stops para terminar
      service.stop();
      expect(service.isLoading()).toBeTrue();

      service.stop();
      expect(service.isLoading()).toBeTrue();

      service.stop();
      expect(service.isLoading()).toBeFalse();
    });

    it('should not go negative when stop called without start', () => {
      service.stop();
      service.stop();

      // No debería causar problemas
      expect(service.isLoading()).toBeFalse();
    });
  });

  /**
   * GRUPO 3: Estados de carga locales
   */
  describe('Estados Locales', () => {
    it('should set local loading state with ID', () => {
      service.startLocal('button-1');
      expect(service.isLocalLoading('button-1')).toBeTrue();
    });

    it('should clear local loading state', () => {
      service.startLocal('button-1');
      service.stopLocal('button-1');
      expect(service.isLocalLoading('button-1')).toBeFalse();
    });

    it('should track multiple local states independently', () => {
      service.startLocal('button-1');
      service.startLocal('button-2');

      expect(service.isLocalLoading('button-1')).toBeTrue();
      expect(service.isLocalLoading('button-2')).toBeTrue();

      service.stopLocal('button-1');
      expect(service.isLocalLoading('button-1')).toBeFalse();
      expect(service.isLocalLoading('button-2')).toBeTrue();
    });

    it('should return false for non-existent local state', () => {
      expect(service.isLocalLoading('non-existent')).toBeFalse();
    });
  });

  /**
   * GRUPO 4: Progreso
   */
  describe('Progreso', () => {
    it('should set progress value', () => {
      service.setProgress(50);
      expect(service.progress()).toBe(50);
    });

    it('should clamp progress to 0-100 range', () => {
      service.setProgress(-10);
      expect(service.progress()).toBeGreaterThanOrEqual(0);

      service.setProgress(150);
      expect(service.progress()).toBeLessThanOrEqual(100);
    });

    it('should reset progress on stop', () => {
      service.start();
      service.setProgress(75);
      service.stop();

      // Progreso debería resetearse a indeterminado
      expect(service.progress()).toBe(-1);
    });
  });

  /**
   * GRUPO 5: stopAll - Parar todas las operaciones
   */
  describe('stopAll', () => {
    it('should clear all loading states', () => {
      service.start();
      service.start();
      service.startLocal('local-1');
      service.startLocal('local-2');

      service.stopAll();

      expect(service.isLoading()).toBeFalse();
      expect(service.isLocalLoading('local-1')).toBeFalse();
      expect(service.isLocalLoading('local-2')).toBeFalse();
    });
  });
});
