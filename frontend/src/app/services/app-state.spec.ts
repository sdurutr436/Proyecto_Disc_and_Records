/**
 * ============================================================================
 * TESTS: AppStateService
 * ============================================================================
 *
 * PROPÓSITO:
 * Verificar que el servicio de estado global funciona correctamente:
 * - Estado de usuario (currentUser, isAuthenticated)
 * - Estado de búsqueda
 * - Favoritos y carrito
 * - Computed signals
 *
 * @author Tests para Discs & Records MVP
 */

import { TestBed } from '@angular/core/testing';
import { AppStateService, User } from './app-state';

describe('AppStateService', () => {
  let service: AppStateService;

  // Usuario mock para tests
  const mockUser: User = {
    id: 1,
    username: 'TestUser',
    email: 'test@example.com',
    role: 'user',
    preferences: {
      language: 'es',
      notifications: true,
      autoplay: false,
      volume: 70
    }
  };

  beforeEach(() => {
    localStorage.clear();

    TestBed.configureTestingModule({
      providers: [AppStateService]
    });

    service = TestBed.inject(AppStateService);
  });

  afterEach(() => {
    localStorage.clear();
  });

  /**
   * GRUPO 1: Creación del servicio
   */
  describe('Creación', () => {
    it('should be created', () => {
      expect(service).toBeTruthy();
    });

    it('should have currentUser signal', () => {
      expect(service.currentUser).toBeDefined();
    });

    it('should have isAuthenticated computed signal', () => {
      expect(service.isAuthenticated).toBeDefined();
    });

    it('should have searchQuery signal', () => {
      expect(service.searchQuery).toBeDefined();
    });
  });

  /**
   * GRUPO 2: Estado inicial
   */
  describe('Estado Inicial', () => {
    it('should have null currentUser initially', () => {
      expect(service.currentUser()).toBeNull();
    });

    it('should have isAuthenticated = false initially', () => {
      expect(service.isAuthenticated()).toBeFalse();
    });

    it('should have userName = "Guest" when not authenticated', () => {
      expect(service.userName()).toBe('Guest');
    });

    it('should have empty searchQuery initially', () => {
      expect(service.searchQuery()).toBe('');
    });

    it('should have isSearching = false initially', () => {
      expect(service.isSearching()).toBeFalse();
    });
  });

  /**
   * GRUPO 3: setUser - Establecer usuario
   */
  describe('setUser', () => {
    it('should set currentUser', () => {
      service.setUser(mockUser);
      expect(service.currentUser()).toEqual(mockUser);
    });

    it('should update isAuthenticated to true', () => {
      service.setUser(mockUser);
      expect(service.isAuthenticated()).toBeTrue();
    });

    it('should update userName', () => {
      service.setUser(mockUser);
      expect(service.userName()).toBe('TestUser');
    });

    it('should handle user with minimal data', () => {
      const minimalUser: User = {
        id: 2,
        username: 'Minimal',
        email: 'minimal@test.com',
        preferences: {
          language: 'es',
          notifications: true,
          autoplay: false,
          volume: 50
        }
      };

      service.setUser(minimalUser);
      expect(service.currentUser()?.username).toBe('Minimal');
    });
  });

  /**
   * GRUPO 4: logout - Limpiar usuario
   */
  describe('logout', () => {
    it('should clear currentUser', () => {
      service.setUser(mockUser);
      service.logout();
      expect(service.currentUser()).toBeNull();
    });

    it('should update isAuthenticated to false', () => {
      service.setUser(mockUser);
      service.logout();
      expect(service.isAuthenticated()).toBeFalse();
    });

    it('should reset userName to Guest', () => {
      service.setUser(mockUser);
      service.logout();
      expect(service.userName()).toBe('Guest');
    });

    it('should work even if no user was set', () => {
      expect(() => service.logout()).not.toThrow();
      expect(service.currentUser()).toBeNull();
    });
  });

  /**
   * GRUPO 5: Búsqueda
   */
  describe('Búsqueda', () => {
    it('should update searchQuery', () => {
      service.searchQuery.set('radiohead');
      expect(service.searchQuery()).toBe('radiohead');
    });

    it('should update isSearching', () => {
      service.isSearching.set(true);
      expect(service.isSearching()).toBeTrue();

      service.isSearching.set(false);
      expect(service.isSearching()).toBeFalse();
    });

    it('should update searchResults', () => {
      const results = {
        albums: [{ id: 1, title: 'OK Computer', artist: 'Radiohead', coverUrl: '', releaseYear: 1997 }],
        artists: [],
        songs: [],
        total: 1
      };

      service.searchResults.set(results);
      expect(service.searchResults().total).toBe(1);
      expect(service.searchResults().albums.length).toBe(1);
    });
  });

  /**
   * GRUPO 6: Ciclo completo login/logout
   */
  describe('Ciclo Login/Logout', () => {
    it('should handle full authentication cycle', () => {
      // Estado inicial
      expect(service.isAuthenticated()).toBeFalse();
      expect(service.userName()).toBe('Guest');

      // Login
      service.setUser(mockUser);
      expect(service.isAuthenticated()).toBeTrue();
      expect(service.userName()).toBe('TestUser');
      expect(service.currentUser()?.email).toBe('test@example.com');

      // Logout
      service.logout();
      expect(service.isAuthenticated()).toBeFalse();
      expect(service.userName()).toBe('Guest');
      expect(service.currentUser()).toBeNull();
    });

    it('should handle multiple login/logout cycles', () => {
      for (let i = 0; i < 3; i++) {
        service.setUser({ ...mockUser, username: `User${i}` });
        expect(service.isAuthenticated()).toBeTrue();

        service.logout();
        expect(service.isAuthenticated()).toBeFalse();
      }
    });
  });

  /**
   * GRUPO 7: Verificación de rol
   */
  describe('Verificación de Rol', () => {
    it('should have no role when not authenticated', () => {
      expect(service.currentUser()?.role).toBeUndefined();
    });

    it('should have user role for regular user', () => {
      service.setUser(mockUser);
      expect(service.currentUser()?.role).toBe('user');
    });

    it('should have admin role for admin user', () => {
      const adminUser: User = {
        ...mockUser,
        role: 'admin'
      };
      service.setUser(adminUser);
      expect(service.currentUser()?.role).toBe('admin');
    });

    it('should have moderator role for moderator user', () => {
      const modUser: User = {
        ...mockUser,
        role: 'moderator'
      };
      service.setUser(modUser);
      expect(service.currentUser()?.role).toBe('moderator');
    });
  });
});
