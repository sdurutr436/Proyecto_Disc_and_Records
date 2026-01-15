/**
 * ============================================================================
 * TESTS: Auth Guards (authGuard, adminGuard)
 * ============================================================================
 *
 * PROPÓSITO:
 * Verificar que los guards de autenticación funcionan correctamente.
 * Tests básicos que verifican la existencia y funcionalidad core.
 *
 * NOTA: Estos guards son funcionales (Angular 15+), no clases.
 *
 * @author Tests para Discs & Records MVP
 */

import { authGuard, adminGuard } from './auth.guard';

describe('Auth Guards', () => {

  /**
   * GRUPO 1: authGuard - Existencia y tipo
   */
  describe('authGuard', () => {
    it('should be defined', () => {
      expect(authGuard).toBeDefined();
    });

    it('should be a function (functional guard)', () => {
      expect(typeof authGuard).toBe('function');
    });
  });

  /**
   * GRUPO 2: adminGuard - Existencia y tipo
   */
  describe('adminGuard', () => {
    it('should be defined', () => {
      expect(adminGuard).toBeDefined();
    });

    it('should be a function (functional guard)', () => {
      expect(typeof adminGuard).toBe('function');
    });
  });
});
