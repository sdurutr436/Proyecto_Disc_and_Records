/**
 * ============================================================================
 * TESTS EXHAUSTIVOS: Auth Guards (authGuard, adminGuard)
 * ============================================================================
 *
 * PROPÓSITO:
 * Verificar que los guards de autenticación funcionan correctamente al 100%.
 *
 * COBERTURA 100%:
 * - ✅ authGuard: Usuario autenticado (retorna true)
 * - ✅ authGuard: Usuario NO autenticado (redirige, retorna false)
 * - ✅ adminGuard: Usuario admin (retorna true)
 * - ✅ adminGuard: Usuario moderator (retorna true)
 * - ✅ adminGuard: Usuario normal (redirige, retorna false)
 * - ✅ adminGuard: Usuario null (redirige, retorna false)
 * - ✅ Verificación de notificaciones
 * - ✅ Verificación de redirecciones con returnUrl
 *
 * @author Tests para Discs & Records
 */

import { TestBed } from '@angular/core/testing';
import { Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { authGuard, adminGuard } from './auth.guard';
import { AuthService } from '../services/auth';
import { NotificationStreamService } from '../services/notification-stream';
import { User, UserPreferences } from '../services/app-state';

// Helper para crear usuario válido
function createMockUser(overrides: Partial<User> = {}): User {
  const defaultPreferences: UserPreferences = {
    language: 'es',
    notifications: true,
    autoplay: false,
    volume: 80
  };

  return {
    id: 1,
    username: 'testuser',
    email: 'test@test.com',
    role: 'user',
    preferences: defaultPreferences,
    ...overrides
  };
}

describe('Auth Guards', () => {
  let authServiceSpy: jasmine.SpyObj<AuthService>;
  let routerSpy: jasmine.SpyObj<Router>;
  let notificationSpy: jasmine.SpyObj<NotificationStreamService>;
  let mockRoute: ActivatedRouteSnapshot;
  let mockState: RouterStateSnapshot;

  beforeEach(() => {
    authServiceSpy = jasmine.createSpyObj('AuthService', ['isAuthenticated', 'getCurrentUser']);
    routerSpy = jasmine.createSpyObj('Router', ['navigate']);
    notificationSpy = jasmine.createSpyObj('NotificationStreamService', ['warning', 'error']);

    TestBed.configureTestingModule({
      providers: [
        { provide: AuthService, useValue: authServiceSpy },
        { provide: Router, useValue: routerSpy },
        { provide: NotificationStreamService, useValue: notificationSpy }
      ]
    });

    mockRoute = {} as ActivatedRouteSnapshot;
    mockState = {
      url: '/protected-route'
    } as RouterStateSnapshot;
  });

  // ════════════════════════════════════════════════════════════════════════
  // GRUPO 1: authGuard - Existencia y Tipo
  // ════════════════════════════════════════════════════════════════════════

  describe('authGuard - Existencia', () => {
    it('should be defined', () => {
      expect(authGuard).toBeDefined();
    });

    it('should be a function (functional guard)', () => {
      expect(typeof authGuard).toBe('function');
    });
  });

  // ════════════════════════════════════════════════════════════════════════
  // GRUPO 2: authGuard - Usuario Autenticado
  // ════════════════════════════════════════════════════════════════════════

  describe('authGuard - Usuario Autenticado', () => {
    it('should return true when user is authenticated', () => {
      authServiceSpy.isAuthenticated.and.returnValue(true);

      const result = TestBed.runInInjectionContext(() =>
        authGuard(mockRoute, mockState)
      );

      expect(result).toBeTrue();
    });

    it('should not navigate when user is authenticated', () => {
      authServiceSpy.isAuthenticated.and.returnValue(true);

      TestBed.runInInjectionContext(() =>
        authGuard(mockRoute, mockState)
      );

      expect(routerSpy.navigate).not.toHaveBeenCalled();
    });

    it('should not show notification when user is authenticated', () => {
      authServiceSpy.isAuthenticated.and.returnValue(true);

      TestBed.runInInjectionContext(() =>
        authGuard(mockRoute, mockState)
      );

      expect(notificationSpy.warning).not.toHaveBeenCalled();
    });
  });

  // ════════════════════════════════════════════════════════════════════════
  // GRUPO 3: authGuard - Usuario NO Autenticado
  // ════════════════════════════════════════════════════════════════════════

  describe('authGuard - Usuario NO Autenticado', () => {
    it('should return false when user is not authenticated', () => {
      authServiceSpy.isAuthenticated.and.returnValue(false);

      const result = TestBed.runInInjectionContext(() =>
        authGuard(mockRoute, mockState)
      );

      expect(result).toBeFalse();
    });

    it('should navigate to home with returnUrl when not authenticated', () => {
      authServiceSpy.isAuthenticated.and.returnValue(false);

      TestBed.runInInjectionContext(() =>
        authGuard(mockRoute, mockState)
      );

      expect(routerSpy.navigate).toHaveBeenCalledWith(['/'], {
        queryParams: { returnUrl: '/protected-route' }
      });
    });

    it('should show warning notification when not authenticated', () => {
      authServiceSpy.isAuthenticated.and.returnValue(false);

      TestBed.runInInjectionContext(() =>
        authGuard(mockRoute, mockState)
      );

      expect(notificationSpy.warning).toHaveBeenCalledWith(
        'Acceso restringido',
        'Debes iniciar sesión para acceder a esta página'
      );
    });

    it('should preserve the original URL in returnUrl', () => {
      authServiceSpy.isAuthenticated.and.returnValue(false);
      const customState = { url: '/profile/settings' } as RouterStateSnapshot;

      TestBed.runInInjectionContext(() =>
        authGuard(mockRoute, customState)
      );

      expect(routerSpy.navigate).toHaveBeenCalledWith(['/'], {
        queryParams: { returnUrl: '/profile/settings' }
      });
    });

    it('should handle complex URLs with query params', () => {
      authServiceSpy.isAuthenticated.and.returnValue(false);
      const customState = { url: '/admin/users?page=2&sort=name' } as RouterStateSnapshot;

      TestBed.runInInjectionContext(() =>
        authGuard(mockRoute, customState)
      );

      expect(routerSpy.navigate).toHaveBeenCalledWith(['/'], {
        queryParams: { returnUrl: '/admin/users?page=2&sort=name' }
      });
    });
  });

  // ════════════════════════════════════════════════════════════════════════
  // GRUPO 4: adminGuard - Existencia y Tipo
  // ════════════════════════════════════════════════════════════════════════

  describe('adminGuard - Existencia', () => {
    it('should be defined', () => {
      expect(adminGuard).toBeDefined();
    });

    it('should be a function (functional guard)', () => {
      expect(typeof adminGuard).toBe('function');
    });
  });

  // ════════════════════════════════════════════════════════════════════════
  // GRUPO 5: adminGuard - Usuario Admin
  // ════════════════════════════════════════════════════════════════════════

  describe('adminGuard - Usuario Admin', () => {
    it('should return true when user has admin role', () => {
      authServiceSpy.getCurrentUser.and.returnValue(createMockUser({ role: 'admin' }));

      const result = TestBed.runInInjectionContext(() =>
        adminGuard(mockRoute, mockState)
      );

      expect(result).toBeTrue();
    });

    it('should not navigate when user is admin', () => {
      authServiceSpy.getCurrentUser.and.returnValue(createMockUser({ role: 'admin' }));

      TestBed.runInInjectionContext(() =>
        adminGuard(mockRoute, mockState)
      );

      expect(routerSpy.navigate).not.toHaveBeenCalled();
    });

    it('should not show error notification when user is admin', () => {
      authServiceSpy.getCurrentUser.and.returnValue(createMockUser({ role: 'admin' }));

      TestBed.runInInjectionContext(() =>
        adminGuard(mockRoute, mockState)
      );

      expect(notificationSpy.error).not.toHaveBeenCalled();
    });
  });

  // ════════════════════════════════════════════════════════════════════════
  // GRUPO 6: adminGuard - Usuario Moderator
  // ════════════════════════════════════════════════════════════════════════

  describe('adminGuard - Usuario Moderator', () => {
    it('should return true when user has moderator role', () => {
      authServiceSpy.getCurrentUser.and.returnValue(createMockUser({ role: 'moderator' }));

      const result = TestBed.runInInjectionContext(() =>
        adminGuard(mockRoute, mockState)
      );

      expect(result).toBeTrue();
    });

    it('should not navigate when user is moderator', () => {
      authServiceSpy.getCurrentUser.and.returnValue(createMockUser({ role: 'moderator' }));

      TestBed.runInInjectionContext(() =>
        adminGuard(mockRoute, mockState)
      );

      expect(routerSpy.navigate).not.toHaveBeenCalled();
    });
  });

  // ════════════════════════════════════════════════════════════════════════
  // GRUPO 7: adminGuard - Usuario Normal (Sin Permisos)
  // ════════════════════════════════════════════════════════════════════════

  describe('adminGuard - Usuario Normal (Sin Permisos)', () => {
    it('should return false when user has user role', () => {
      authServiceSpy.getCurrentUser.and.returnValue(createMockUser({ role: 'user' }));

      const result = TestBed.runInInjectionContext(() =>
        adminGuard(mockRoute, mockState)
      );

      expect(result).toBeFalse();
    });

    it('should navigate to home when user has no admin/moderator role', () => {
      authServiceSpy.getCurrentUser.and.returnValue(createMockUser({ role: 'user' }));

      TestBed.runInInjectionContext(() =>
        adminGuard(mockRoute, mockState)
      );

      expect(routerSpy.navigate).toHaveBeenCalledWith(['/']);
    });

    it('should show error notification when access denied', () => {
      authServiceSpy.getCurrentUser.and.returnValue(createMockUser({ role: 'user' }));

      TestBed.runInInjectionContext(() =>
        adminGuard(mockRoute, mockState)
      );

      expect(notificationSpy.error).toHaveBeenCalledWith(
        'Acceso denegado',
        'No tienes permisos para acceder a esta sección'
      );
    });
  });

  // ════════════════════════════════════════════════════════════════════════
  // GRUPO 8: adminGuard - Usuario Null
  // ════════════════════════════════════════════════════════════════════════

  describe('adminGuard - Usuario Null', () => {
    it('should return false when getCurrentUser returns null', () => {
      authServiceSpy.getCurrentUser.and.returnValue(null);

      const result = TestBed.runInInjectionContext(() =>
        adminGuard(mockRoute, mockState)
      );

      expect(result).toBeFalse();
    });

    it('should navigate to home when user is null', () => {
      authServiceSpy.getCurrentUser.and.returnValue(null);

      TestBed.runInInjectionContext(() =>
        adminGuard(mockRoute, mockState)
      );

      expect(routerSpy.navigate).toHaveBeenCalledWith(['/']);
    });

    it('should show error notification when user is null', () => {
      authServiceSpy.getCurrentUser.and.returnValue(null);

      TestBed.runInInjectionContext(() =>
        adminGuard(mockRoute, mockState)
      );

      expect(notificationSpy.error).toHaveBeenCalledWith(
        'Acceso denegado',
        'No tienes permisos para acceder a esta sección'
      );
    });
  });

  // ════════════════════════════════════════════════════════════════════════
  // GRUPO 9: adminGuard - Roles Edge Cases
  // ════════════════════════════════════════════════════════════════════════

  describe('adminGuard - Edge Cases de Roles', () => {
    it('should return false for undefined role', () => {
      authServiceSpy.getCurrentUser.and.returnValue(createMockUser({ role: undefined }));

      const result = TestBed.runInInjectionContext(() =>
        adminGuard(mockRoute, mockState)
      );

      expect(result).toBeFalse();
    });

    it('should redirect and show error for undefined role', () => {
      authServiceSpy.getCurrentUser.and.returnValue(createMockUser({ role: undefined }));

      TestBed.runInInjectionContext(() =>
        adminGuard(mockRoute, mockState)
      );

      expect(routerSpy.navigate).toHaveBeenCalledWith(['/']);
      expect(notificationSpy.error).toHaveBeenCalled();
    });
  });
});
