/**
 * ============================================================================
 * TESTS: ThemeService
 * ============================================================================
 *
 * PROPÓSITO:
 * Verificar que el servicio de temas funciona correctamente:
 * - Cambio entre temas (light, dark, dark-gray)
 * - Persistencia en localStorage
 * - Detección de preferencia del sistema
 * - Toggle cíclico de temas
 *
 * @author Tests para Discs & Records MVP
 */

import { TestBed } from '@angular/core/testing';
import { ThemeService, Theme } from './theme';

describe('ThemeService', () => {
  let service: ThemeService;

  beforeEach(() => {
    // Limpiar localStorage antes de cada test
    localStorage.clear();

    TestBed.configureTestingModule({
      providers: [ThemeService]
    });

    service = TestBed.inject(ThemeService);
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

    it('should have a currentTheme signal', () => {
      expect(service.currentTheme).toBeDefined();
    });

    it('should initialize with a valid theme', () => {
      const theme = service.currentTheme();
      expect(['light', 'dark', 'dark-gray']).toContain(theme);
    });
  });

  /**
   * GRUPO 2: setTheme - Cambio de tema
   */
  describe('setTheme', () => {
    it('should change theme to light', () => {
      service.setTheme('light');
      expect(service.currentTheme()).toBe('light');
    });

    it('should change theme to dark', () => {
      service.setTheme('dark');
      expect(service.currentTheme()).toBe('dark');
    });

    it('should change theme to dark-gray', () => {
      service.setTheme('dark-gray');
      expect(service.currentTheme()).toBe('dark-gray');
    });

    it('should apply data-theme attribute for dark theme', () => {
      service.setTheme('dark');
      expect(document.documentElement.getAttribute('data-theme')).toBe('dark');
    });

    it('should apply data-theme attribute for dark-gray theme', () => {
      service.setTheme('dark-gray');
      expect(document.documentElement.getAttribute('data-theme')).toBe('dark-gray');
    });

    it('should remove data-theme attribute for light theme', () => {
      service.setTheme('dark');
      service.setTheme('light');
      expect(document.documentElement.getAttribute('data-theme')).toBeNull();
    });
  });

  /**
   * GRUPO 3: toggleTheme - Rotación cíclica
   */
  describe('toggleTheme', () => {
    it('should toggle from light to dark', () => {
      service.setTheme('light');
      service.toggleTheme();
      expect(service.currentTheme()).toBe('dark');
    });

    it('should toggle from dark to dark-gray', () => {
      service.setTheme('dark');
      service.toggleTheme();
      expect(service.currentTheme()).toBe('dark-gray');
    });

    it('should toggle from dark-gray to light', () => {
      service.setTheme('dark-gray');
      service.toggleTheme();
      expect(service.currentTheme()).toBe('light');
    });

    it('should complete full cycle: light -> dark -> dark-gray -> light', () => {
      service.setTheme('light');

      service.toggleTheme();
      expect(service.currentTheme()).toBe('dark');

      service.toggleTheme();
      expect(service.currentTheme()).toBe('dark-gray');

      service.toggleTheme();
      expect(service.currentTheme()).toBe('light');
    });

    it('should save theme to localStorage when toggling', () => {
      service.setTheme('light');
      service.toggleTheme();

      const saved = localStorage.getItem('app-theme');
      expect(saved).toBe('dark');
    });
  });

  /**
   * GRUPO 4: Persistencia en localStorage
   */
  describe('LocalStorage Persistence', () => {
    it('should persist theme when toggling', () => {
      service.toggleTheme();
      service.toggleTheme();

      const saved = localStorage.getItem('app-theme');
      expect(saved).toBeTruthy();
    });

    it('should restore theme from localStorage on new service instance', () => {
      // Guardar un tema
      localStorage.setItem('app-theme', 'dark-gray');

      // Crear nueva instancia
      const newService = new ThemeService();

      expect(newService.currentTheme()).toBe('dark-gray');
    });
  });

  /**
   * GRUPO 5: detectSystemPreference
   */
  describe('detectSystemPreference', () => {
    it('should return a valid theme', () => {
      const result = service.detectSystemPreference();
      expect(['light', 'dark', 'dark-gray']).toContain(result);
    });
  });
});
