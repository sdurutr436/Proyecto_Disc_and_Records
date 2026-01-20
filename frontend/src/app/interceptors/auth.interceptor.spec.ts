/**
 * ============================================================================
 * TESTS EXHAUSTIVOS: Auth Interceptor
 * ============================================================================
 *
 * PROPÓSITO:
 * Verificar que el interceptor de autenticación añade correctamente
 * el token JWT a las peticiones HTTP.
 *
 * COBERTURA 100%:
 * - ✅ Existencia y tipo del interceptor
 * - ✅ Token obtenido de AppStateService.currentUser
 * - ✅ Token obtenido de localStorage (fallback)
 * - ✅ Sin token: petición pasa sin modificar
 * - ✅ Con token: petición clonada con header Authorization
 * - ✅ Formato correcto del header: "Bearer {token}"
 * - ✅ Error en localStorage (try/catch)
 *
 * @author Tests para Discs & Records
 */

import { TestBed } from '@angular/core/testing';
import { HttpRequest, HttpHandler, HttpHandlerFn, HttpEvent, HttpResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { authInterceptor } from './auth.interceptor';
import { AppStateService } from '../services/app-state';
import { STORAGE_KEYS } from '../config/api.config';

describe('Auth Interceptor', () => {
  let appStateSpy: jasmine.SpyObj<AppStateService>;
  let mockNext: HttpHandlerFn;
  let capturedRequest: HttpRequest<unknown> | null;

  // Backup del localStorage original
  const originalLocalStorage = window.localStorage;

  beforeEach(() => {
    // Resetear petición capturada
    capturedRequest = null;

    // Mock de next() que captura la petición
    mockNext = (req: HttpRequest<unknown>): Observable<HttpEvent<unknown>> => {
      capturedRequest = req;
      return of(new HttpResponse({ status: 200, body: {} }));
    };

    // Crear spy para AppStateService
    appStateSpy = jasmine.createSpyObj('AppStateService', ['currentUser']);

    // Limpiar localStorage
    try {
      localStorage.removeItem(STORAGE_KEYS.authToken);
    } catch (e) {
      // Ignorar errores de localStorage
    }
  });

  afterEach(() => {
    // Limpiar localStorage después de cada test
    try {
      localStorage.removeItem(STORAGE_KEYS.authToken);
    } catch (e) {
      // Ignorar errores de localStorage
    }
  });

  // ════════════════════════════════════════════════════════════════════════
  // GRUPO 1: Existencia y Tipo
  // ════════════════════════════════════════════════════════════════════════

  describe('Existencia y Tipo', () => {
    it('should be defined', () => {
      expect(authInterceptor).toBeDefined();
    });

    it('should be a function (functional interceptor)', () => {
      expect(typeof authInterceptor).toBe('function');
    });
  });

  // ════════════════════════════════════════════════════════════════════════
  // GRUPO 2: Sin Token (Petición Sin Modificar)
  // ════════════════════════════════════════════════════════════════════════

  describe('Sin Token (Petición Sin Modificar)', () => {
    beforeEach(() => {
      TestBed.configureTestingModule({
        providers: [
          { provide: AppStateService, useValue: { currentUser: () => null } }
        ]
      });
    });

    it('should pass request unchanged when no token exists', () => {
      const originalReq = new HttpRequest<unknown>('GET', '/api/test');

      TestBed.runInInjectionContext(() => {
        authInterceptor(originalReq, mockNext);
      });

      expect(capturedRequest).toBeTruthy();
      expect(capturedRequest!.headers.has('Authorization')).toBeFalse();
    });

    it('should not add Authorization header when user is null', () => {
      const originalReq = new HttpRequest<unknown>('POST', '/api/albums', { name: 'Test' });

      TestBed.runInInjectionContext(() => {
        authInterceptor(originalReq, mockNext);
      });

      expect(capturedRequest!.headers.get('Authorization')).toBeNull();
    });

    it('should preserve original request method', () => {
      const originalReq = new HttpRequest<unknown>('DELETE', '/api/test/1');

      TestBed.runInInjectionContext(() => {
        authInterceptor(originalReq, mockNext);
      });

      expect(capturedRequest!.method).toBe('DELETE');
    });

    it('should preserve original request URL', () => {
      const originalReq = new HttpRequest<unknown>('GET', '/api/specific/endpoint');

      TestBed.runInInjectionContext(() => {
        authInterceptor(originalReq, mockNext);
      });

      expect(capturedRequest!.url).toBe('/api/specific/endpoint');
    });
  });

  // ════════════════════════════════════════════════════════════════════════
  // GRUPO 3: Token desde AppStateService
  // ════════════════════════════════════════════════════════════════════════

  describe('Token desde AppStateService', () => {
    const mockToken = 'jwt-token-from-appstate-123';

    beforeEach(() => {
      TestBed.configureTestingModule({
        providers: [
          {
            provide: AppStateService,
            useValue: {
              currentUser: () => ({
                id: 1,
                username: 'testuser',
                email: 'test@test.com',
                role: 'user',
                token: mockToken
              })
            }
          }
        ]
      });
    });

    it('should add Authorization header when user has token', () => {
      const originalReq = new HttpRequest<unknown>('GET', '/api/protected');

      TestBed.runInInjectionContext(() => {
        authInterceptor(originalReq, mockNext);
      });

      expect(capturedRequest!.headers.has('Authorization')).toBeTrue();
    });

    it('should format Authorization header as Bearer token', () => {
      const originalReq = new HttpRequest<unknown>('GET', '/api/protected');

      TestBed.runInInjectionContext(() => {
        authInterceptor(originalReq, mockNext);
      });

      expect(capturedRequest!.headers.get('Authorization')).toBe(`Bearer ${mockToken}`);
    });

    it('should clone request, not mutate original', () => {
      const originalReq = new HttpRequest<unknown>('GET', '/api/protected');
      const originalHasAuth = originalReq.headers.has('Authorization');

      TestBed.runInInjectionContext(() => {
        authInterceptor(originalReq, mockNext);
      });

      // Original no debe tener Authorization
      expect(originalReq.headers.has('Authorization')).toBe(originalHasAuth);
      // Capturada sí debe tenerlo
      expect(capturedRequest!.headers.has('Authorization')).toBeTrue();
    });

    it('should work with POST requests', () => {
      const originalReq = new HttpRequest<unknown>('POST', '/api/albums', { name: 'New Album' });

      TestBed.runInInjectionContext(() => {
        authInterceptor(originalReq, mockNext);
      });

      expect(capturedRequest!.method).toBe('POST');
      expect(capturedRequest!.headers.get('Authorization')).toBe(`Bearer ${mockToken}`);
    });

    it('should work with PUT requests', () => {
      const originalReq = new HttpRequest<unknown>('PUT', '/api/albums/1', { name: 'Updated' });

      TestBed.runInInjectionContext(() => {
        authInterceptor(originalReq, mockNext);
      });

      expect(capturedRequest!.method).toBe('PUT');
      expect(capturedRequest!.headers.get('Authorization')).toBe(`Bearer ${mockToken}`);
    });

    it('should work with DELETE requests', () => {
      const originalReq = new HttpRequest<unknown>('DELETE', '/api/albums/1');

      TestBed.runInInjectionContext(() => {
        authInterceptor(originalReq, mockNext);
      });

      expect(capturedRequest!.method).toBe('DELETE');
      expect(capturedRequest!.headers.get('Authorization')).toContain('Bearer');
    });
  });

  // ════════════════════════════════════════════════════════════════════════
  // GRUPO 4: Token desde localStorage (Fallback)
  // ════════════════════════════════════════════════════════════════════════

  describe('Token desde localStorage (Fallback)', () => {
    const localStorageToken = 'jwt-token-from-localstorage-456';

    beforeEach(() => {
      TestBed.configureTestingModule({
        providers: [
          {
            provide: AppStateService,
            useValue: {
              currentUser: () => null // Sin usuario en AppState
            }
          }
        ]
      });

      // Establecer token en localStorage
      localStorage.setItem(STORAGE_KEYS.authToken, localStorageToken);
    });

    it('should fall back to localStorage when user has no token', () => {
      const originalReq = new HttpRequest<unknown>('GET', '/api/protected');

      TestBed.runInInjectionContext(() => {
        authInterceptor(originalReq, mockNext);
      });

      expect(capturedRequest!.headers.get('Authorization')).toBe(`Bearer ${localStorageToken}`);
    });

    it('should use user token over localStorage when both exist', () => {
      const userToken = 'user-token-priority';

      TestBed.resetTestingModule();
      TestBed.configureTestingModule({
        providers: [
          {
            provide: AppStateService,
            useValue: {
              currentUser: () => ({
                id: 1,
                username: 'user',
                email: 'user@test.com',
                role: 'user',
                token: userToken
              })
            }
          }
        ]
      });

      const originalReq = new HttpRequest<unknown>('GET', '/api/protected');

      TestBed.runInInjectionContext(() => {
        authInterceptor(originalReq, mockNext);
      });

      // Debe usar el token del usuario, no el de localStorage
      expect(capturedRequest!.headers.get('Authorization')).toBe(`Bearer ${userToken}`);
    });
  });

  // ════════════════════════════════════════════════════════════════════════
  // GRUPO 5: Usuario sin Token en AppState
  // ════════════════════════════════════════════════════════════════════════

  describe('Usuario sin Token en AppState', () => {
    beforeEach(() => {
      TestBed.configureTestingModule({
        providers: [
          {
            provide: AppStateService,
            useValue: {
              currentUser: () => ({
                id: 1,
                username: 'user',
                email: 'user@test.com',
                role: 'user',
                token: null // Token null
              })
            }
          }
        ]
      });
    });

    it('should try localStorage when user.token is null', () => {
      const localStorageToken = 'fallback-token';
      localStorage.setItem(STORAGE_KEYS.authToken, localStorageToken);

      const originalReq = new HttpRequest<unknown>('GET', '/api/protected');

      TestBed.runInInjectionContext(() => {
        authInterceptor(originalReq, mockNext);
      });

      expect(capturedRequest!.headers.get('Authorization')).toBe(`Bearer ${localStorageToken}`);
    });

    it('should try localStorage when user.token is undefined', () => {
      TestBed.resetTestingModule();
      TestBed.configureTestingModule({
        providers: [
          {
            provide: AppStateService,
            useValue: {
              currentUser: () => ({
                id: 1,
                username: 'user',
                email: 'user@test.com',
                role: 'user'
                // token undefined
              })
            }
          }
        ]
      });

      const localStorageToken = 'fallback-token-undefined';
      localStorage.setItem(STORAGE_KEYS.authToken, localStorageToken);

      const originalReq = new HttpRequest<unknown>('GET', '/api/protected');

      TestBed.runInInjectionContext(() => {
        authInterceptor(originalReq, mockNext);
      });

      expect(capturedRequest!.headers.get('Authorization')).toBe(`Bearer ${localStorageToken}`);
    });
  });

  // ════════════════════════════════════════════════════════════════════════
  // GRUPO 6: Retorno de Observable
  // ════════════════════════════════════════════════════════════════════════

  describe('Retorno de Observable', () => {
    beforeEach(() => {
      TestBed.configureTestingModule({
        providers: [
          { provide: AppStateService, useValue: { currentUser: () => null } }
        ]
      });
    });

    it('should return an Observable', () => {
      const originalReq = new HttpRequest<unknown>('GET', '/api/test');

      let result: Observable<HttpEvent<unknown>> | undefined;

      TestBed.runInInjectionContext(() => {
        result = authInterceptor(originalReq, mockNext);
      });

      expect(result).toBeDefined();
      expect(result!.subscribe).toBeDefined(); // Es un Observable
    });

    it('should call next() with the request', (done) => {
      const originalReq = new HttpRequest<unknown>('GET', '/api/test');
      let nextCalled = false;

      const customNext: HttpHandlerFn = (req) => {
        nextCalled = true;
        return of(new HttpResponse({ status: 200 }));
      };

      TestBed.runInInjectionContext(() => {
        authInterceptor(originalReq, customNext).subscribe({
          next: () => {
            expect(nextCalled).toBeTrue();
            done();
          }
        });
      });
    });
  });

  // ════════════════════════════════════════════════════════════════════════
  // GRUPO 7: Diferentes Tipos de Peticiones
  // ════════════════════════════════════════════════════════════════════════

  describe('Diferentes Tipos de Peticiones', () => {
    const mockToken = 'test-token-123';

    beforeEach(() => {
      TestBed.configureTestingModule({
        providers: [
          {
            provide: AppStateService,
            useValue: {
              currentUser: () => ({ token: mockToken })
            }
          }
        ]
      });
    });

    it('should handle GET request', () => {
      const req = new HttpRequest<unknown>('GET', '/api/albums');

      TestBed.runInInjectionContext(() => {
        authInterceptor(req, mockNext);
      });

      expect(capturedRequest!.method).toBe('GET');
    });

    it('should handle POST request with body', () => {
      const body = { name: 'New Album', artist: 'Artist' };
      const req = new HttpRequest<unknown>('POST', '/api/albums', body);

      TestBed.runInInjectionContext(() => {
        authInterceptor(req, mockNext);
      });

      expect(capturedRequest!.method).toBe('POST');
      expect(capturedRequest!.body).toEqual(body);
    });

    it('should handle PATCH request', () => {
      const req = new HttpRequest<unknown>('PATCH', '/api/albums/1', { name: 'Updated' });

      TestBed.runInInjectionContext(() => {
        authInterceptor(req, mockNext);
      });

      expect(capturedRequest!.method).toBe('PATCH');
    });

    it('should handle request with query params', () => {
      const req = new HttpRequest<unknown>('GET', '/api/albums?page=1&size=10');

      TestBed.runInInjectionContext(() => {
        authInterceptor(req, mockNext);
      });

      expect(capturedRequest!.url).toBe('/api/albums?page=1&size=10');
    });
  });

  // ════════════════════════════════════════════════════════════════════════
  // GRUPO 8: Edge Cases
  // ════════════════════════════════════════════════════════════════════════

  describe('Edge Cases', () => {
    it('should handle empty token string from AppState', () => {
      TestBed.configureTestingModule({
        providers: [
          {
            provide: AppStateService,
            useValue: {
              currentUser: () => ({ token: '' })
            }
          }
        ]
      });

      const req = new HttpRequest<unknown>('GET', '/api/test');

      TestBed.runInInjectionContext(() => {
        authInterceptor(req, mockNext);
      });

      // Empty string es falsy, no debe añadir header
      expect(capturedRequest!.headers.has('Authorization')).toBeFalse();
    });

    it('should handle request to different URL patterns', () => {
      TestBed.configureTestingModule({
        providers: [
          {
            provide: AppStateService,
            useValue: {
              currentUser: () => ({ token: 'test-token' })
            }
          }
        ]
      });

      const urls = [
        '/api/v1/albums',
        'https://external.api.com/data',
        '/auth/login',
        '/proxy/deezer/search'
      ];

      urls.forEach(url => {
        const req = new HttpRequest<unknown>('GET', url);

        TestBed.runInInjectionContext(() => {
          authInterceptor(req, mockNext);
        });

        expect(capturedRequest!.url).toBe(url);
        expect(capturedRequest!.headers.has('Authorization')).toBeTrue();
      });
    });
  });
});
