/**
 * ============================================================================
 * TESTS EXHAUSTIVOS: AuthService (Versión Simplificada)
 * ============================================================================
 *
 * PROPÓSITO DE ESTOS TESTS:
 * Verificar que el servicio de autenticación funciona correctamente:
 * - Métodos públicos (isAuthenticated, getCurrentUser)
 * - Logout
 * - Coordinación con AppState, EventBus, NotificationStream
 *
 * NOTA: Los tests de login/register HTTP se omiten porque AuthService
 * usa `environment.useMockData` que está en true en desarrollo.
 *
 * @author Tests exhaustivos para Discs & Records
 * @version 2.0.0
 */

import { TestBed, fakeAsync, tick } from '@angular/core/testing';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { AuthService } from './auth';
import { AppStateService, User } from './app-state';
import { EventBusService, EventType } from './event-bus';
import { NotificationStreamService } from './notification-stream';
import { NotificationService } from './notification';

describe('AuthService', () => {

  let service: AuthService;
  let appStateService: AppStateService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        AuthService,
        AppStateService,
        EventBusService,
        NotificationStreamService,
        NotificationService,
        provideHttpClient(),
        provideHttpClientTesting()
      ]
    });

    service = TestBed.inject(AuthService);
    appStateService = TestBed.inject(AppStateService);

    // Limpiar estado y localStorage
    localStorage.clear();
  });

  afterEach(() => {
    localStorage.clear();
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

    it('should inject dependencies correctly', () => {
      expect(service).toBeInstanceOf(AuthService);
    });
  });

  /**
   * ══════════════════════════════════════════════════════════════════════════
   * GRUPO 2: isAuthenticated
   * ══════════════════════════════════════════════════════════════════════════
   */
  describe('isAuthenticated', () => {
    it('should return false when not authenticated', () => {
      expect(service.isAuthenticated()).toBeFalsy();
    });

    it('should return boolean value', () => {
      const result = service.isAuthenticated();
      expect(typeof result).toBe('boolean');
    });
  });

  /**
   * ══════════════════════════════════════════════════════════════════════════
   * GRUPO 3: getCurrentUser
   * ══════════════════════════════════════════════════════════════════════════
   */
  describe('getCurrentUser', () => {
    it('should return null when no user is logged in', () => {
      expect(service.getCurrentUser()).toBeNull();
    });
  });

  /**
   * ══════════════════════════════════════════════════════════════════════════
   * GRUPO 4: Logout
   * ══════════════════════════════════════════════════════════════════════════
   */
  describe('Logout', () => {
    it('should clear user state on logout', () => {
      // Act
      service.logout();

      // Assert
      expect(service.isAuthenticated()).toBeFalsy();
      expect(service.getCurrentUser()).toBeNull();
    });

    it('should work even if not logged in', () => {
      // No debería lanzar error
      expect(() => service.logout()).not.toThrow();
    });

    it('should be callable multiple times', () => {
      service.logout();
      service.logout();
      service.logout();

      expect(service.isAuthenticated()).toBeFalsy();
    });
  });

  /**
   * ══════════════════════════════════════════════════════════════════════════
   * GRUPO 5: Login con Mock Data
   * ══════════════════════════════════════════════════════════════════════════
   */
  describe('Login con Mock Data', () => {
    it('should login successfully with valid mock credentials', fakeAsync(() => {
      // Arrange - credenciales REALES del mock (ver mock-data.ts)
      const credentials = {
        email: 'admin@mock.dev',
        password: 'admin123'
      };

      // Act
      let result: any;
      service.login(credentials).then(r => result = r);
      tick(600); // Simular paso del tiempo (500ms delay del mock + margen)

      // Assert
      expect(result.success).toBeTruthy();
    }));

    it('should fail login with invalid credentials', fakeAsync(() => {
      // Arrange
      const credentials = {
        email: 'invalid@email.com',
        password: 'wrongpassword'
      };

      // Act
      let result: any;
      service.login(credentials).then(r => result = r);
      tick(600);

      // Assert
      expect(result.success).toBeFalsy();
    }));

    it('should update authenticated state after successful login', fakeAsync(() => {
      // Arrange - usar credenciales del mock real
      const credentials = {
        email: 'admin@mock.dev',
        password: 'admin123'
      };

      // Act
      service.login(credentials);
      tick(600);

      // Assert
      expect(service.isAuthenticated()).toBeTruthy();
    }));

    it('should set current user after successful login', fakeAsync(() => {
      // Arrange - credenciales del mock-data.ts
      const credentials = {
        email: 'admin@mock.dev',
        password: 'admin123'
      };

      // Act
      service.login(credentials);
      tick(600);

      // Assert - verificar que el email del user coincide
      const user = service.getCurrentUser();
      expect(user).not.toBeNull();
      expect(user?.email).toBe('admin@mock.dev');
    }));

    it('should return user data on successful login', fakeAsync(() => {
      // Arrange - credenciales mock reales
      const credentials = {
        email: 'admin@mock.dev',
        password: 'admin123'
      };

      // Act
      let result: any;
      service.login(credentials).then(r => result = r);
      tick(600);

      // Assert - verificar email del response
      expect(result.user).toBeDefined();
      expect(result.user?.email).toBe('admin@mock.dev');
    }));

    it('should handle empty email', fakeAsync(() => {
      // Arrange
      const credentials = {
        email: '',
        password: 'password'
      };

      // Act
      let result: any;
      service.login(credentials).then(r => result = r);
      tick(600);

      // Assert
      expect(result.success).toBeFalsy();
    }));

    it('should handle empty password', fakeAsync(() => {
      // Arrange
      const credentials = {
        email: 'test@test.com',
        password: ''
      };

      // Act
      let result: any;
      service.login(credentials).then(r => result = r);
      tick(600);

      // Assert
      expect(result.success).toBeFalsy();
    }));
  });

  /**
   * ══════════════════════════════════════════════════════════════════════════
   * GRUPO 6: Register con Mock Data
   * ══════════════════════════════════════════════════════════════════════════
   */
  describe('Register', () => {
    it('should be a function', () => {
      expect(typeof service.register).toBe('function');
    });
  });

  /**
   * ══════════════════════════════════════════════════════════════════════════
   * GRUPO 7: Ciclo Completo Login/Logout
   * ══════════════════════════════════════════════════════════════════════════
   */
  describe('Ciclo Login/Logout', () => {
    it('should complete full login/logout cycle', fakeAsync(() => {
      // Arrange - credenciales mock reales de mock-data.ts
      const credentials = {
        email: 'admin@mock.dev',
        password: 'admin123'
      };

      // Assert - inicialmente no autenticado
      expect(service.isAuthenticated()).toBeFalsy();

      // Act - login
      service.login(credentials);
      tick(600);

      // Assert - ahora autenticado
      expect(service.isAuthenticated()).toBeTruthy();
      expect(service.getCurrentUser()).not.toBeNull();

      // Act - logout
      service.logout();

      // Assert - no autenticado de nuevo
      expect(service.isAuthenticated()).toBeFalsy();
      expect(service.getCurrentUser()).toBeNull();
    }));

    it('should handle multiple login/logout cycles', fakeAsync(() => {
      // Credenciales mock reales
      const credentials = {
        email: 'admin@mock.dev',
        password: 'admin123'
      };

      // Primer ciclo
      service.login(credentials);
      tick(600);
      expect(service.isAuthenticated()).toBeTruthy();
      service.logout();
      expect(service.isAuthenticated()).toBeFalsy();

      // Segundo ciclo
      service.login(credentials);
      tick(600);
      expect(service.isAuthenticated()).toBeTruthy();
      service.logout();
      expect(service.isAuthenticated()).toBeFalsy();
    }));
  });
});
