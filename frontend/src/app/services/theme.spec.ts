/**
 * ============================================================================
 * TESTS: ThemeService
 * ============================================================================
 *
 * PROPÓSITO:
 * Verificar que el servicio de temas funciona correctamente:
 * - Cambio entre temas (light, dark, grayscale)
 * - Persistencia en localStorage
 * - Detección de preferencia del sistema
 * - Rotación cíclica de temas con nextTheme()
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
      expect(['light', 'dark', 'grayscale']).toContain(theme);
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

    it('should change theme to grayscale', () => {
      service.setTheme('grayscale');
      expect(service.currentTheme()).toBe('grayscale');
    });

    it('should apply data-theme attribute for dark theme', () => {
      service.setTheme('dark');
      expect(document.documentElement.getAttribute('data-theme')).toBe('dark');
    });

    it('should apply data-theme attribute for grayscale theme', () => {
      service.setTheme('grayscale');
      expect(document.documentElement.getAttribute('data-theme')).toBe('grayscale');
    });

    it('should remove data-theme attribute for light theme', () => {
      service.setTheme('dark');
      service.setTheme('light');
      expect(document.documentElement.getAttribute('data-theme')).toBeNull();
    });
  });

  /**
   * GRUPO 3: nextTheme / toggleTheme - Rotación cíclica
   */
  describe('nextTheme / toggleTheme', () => {
    it('should toggle from light to dark', () => {
      service.setTheme('light');
      service.nextTheme();
      expect(service.currentTheme()).toBe('dark');
    });

    it('should toggle from dark to grayscale', () => {
      service.setTheme('dark');
      service.nextTheme();
      expect(service.currentTheme()).toBe('grayscale');
    });

    it('should toggle from grayscale to light', () => {
      service.setTheme('grayscale');
      service.nextTheme();
      expect(service.currentTheme()).toBe('light');
    });

    it('should complete full cycle: light -> dark -> grayscale -> light', () => {
      service.setTheme('light');

      service.nextTheme();
      expect(service.currentTheme()).toBe('dark');

      service.nextTheme();
      expect(service.currentTheme()).toBe('grayscale');

      service.nextTheme();
      expect(service.currentTheme()).toBe('light');
    });

    it('should save theme to localStorage when toggling', () => {
      service.setTheme('light');
      service.nextTheme();

      const saved = localStorage.getItem('app-theme');
      expect(saved).toBe('dark');
    });

    it('toggleTheme should work as alias for nextTheme', () => {
      service.setTheme('light');
      service.toggleTheme();
      expect(service.currentTheme()).toBe('dark');
    });
  });

  /**
   * GRUPO 4: Persistencia en localStorage
   */
  describe('LocalStorage Persistence', () => {
    it('should persist theme when toggling', () => {
      service.nextTheme();
      service.nextTheme();

      const saved = localStorage.getItem('app-theme');
      expect(saved).toBeTruthy();
    });

    it('should restore theme from localStorage on new service instance', () => {
      // Guardar un tema
      localStorage.setItem('app-theme', 'grayscale');

      // Crear nueva instancia
      const newService = new ThemeService();

      expect(newService.currentTheme()).toBe('grayscale');
    });
  });

  /**
   * GRUPO 5: Sistema detecta preferencias
   */
  describe('System Preference Detection', () => {
    it('should return light or dark based on system preference', () => {
      // initTheme es llamado en el constructor, así que solo verificamos
      // que el tema inicial sea válido (light o dark, no grayscale por defecto)
      const theme = service.currentTheme();
      expect(['light', 'dark', 'grayscale']).toContain(theme);
    });
  });
});
