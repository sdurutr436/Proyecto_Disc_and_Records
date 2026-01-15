/**
 * ============================================================================
 * TESTS: Auth Interceptor (Verificación de Existencia)
 * ============================================================================
 *
 * PROPÓSITO:
 * Verificar que el interceptor de autenticación existe y es una función.
 * Los tests detallados de HTTP interceptors son complejos porque
 * requieren inyectar mocks en el contexto correcto.
 *
 * @author Tests para Discs & Records
 * @version 1.0.0
 */

import { authInterceptor } from './auth.interceptor';

describe('Auth Interceptor', () => {

  describe('Existencia y Tipo', () => {
    it('should be defined', () => {
      expect(authInterceptor).toBeDefined();
    });

    it('should be a function', () => {
      expect(typeof authInterceptor).toBe('function');
    });
  });
});
