/**
 * ============================================================================
 * TESTS: Error Interceptor (Verificación de Existencia)
 * ============================================================================
 *
 * PROPÓSITO:
 * Verificar que el interceptor de errores existe y es una función.
 *
 * @author Tests para Discs & Records
 * @version 1.0.0
 */

import { errorInterceptor } from './error.interceptor';

describe('Error Interceptor', () => {

  describe('Existencia y Tipo', () => {
    it('should be defined', () => {
      expect(errorInterceptor).toBeDefined();
    });

    it('should be a function', () => {
      expect(typeof errorInterceptor).toBe('function');
    });
  });
});
