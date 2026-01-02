import { Injectable, signal } from '@angular/core';

export type Theme = 'light' | 'dark' | 'dark-gray';

@Injectable({
  providedIn: 'root',
})
export class ThemeService {
  private readonly STORAGE_KEY = 'app-theme';

  /**
   * Signal reactivo para el tema actual
   */
  currentTheme = signal<Theme>('light');

  constructor() {
    // Cargar tema al iniciar el servicio
    this.loadTheme();
  }

  /**
   * Detectar preferencia de tema del sistema
   */
  detectSystemPreference(): Theme {
    if (typeof window === 'undefined') return 'light';

    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)');
    // Si el usuario prefiere oscuro, usar el nuevo modo dark-gray por defecto
    return prefersDark.matches ? 'dark-gray' : 'light';
  }

  /**
   * Cargar tema desde localStorage o usar preferencia del sistema
   */
  loadTheme(): void {
    const savedTheme = this.getFromLocalStorage();

    if (savedTheme) {
      this.setTheme(savedTheme);
    } else {
      // Si no hay tema guardado, usar preferencia del sistema
      const systemTheme = this.detectSystemPreference();
      this.setTheme(systemTheme);
    }

    // Escuchar cambios en la preferencia del sistema
    if (typeof window !== 'undefined') {
      window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
        // Solo actualizar si no hay tema guardado (usuario no ha elegido manualmente)
        if (!this.getFromLocalStorage()) {
          this.setTheme(e.matches ? 'dark-gray' : 'light');
        }
      });
    }
  }

  /**
   * Cambiar el tema actual
   */
  setTheme(theme: Theme): void {
    this.currentTheme.set(theme);
    this.applyTheme(theme);
  }

  /**
   * Rotación entre los 3 modos: light -> dark -> dark-gray -> light...
   */
  toggleTheme(): void {
    const currentTheme = this.currentTheme();
    let newTheme: Theme;

    switch (currentTheme) {
      case 'light':
        newTheme = 'dark';
        break;
      case 'dark':
        newTheme = 'dark-gray';
        break;
      case 'dark-gray':
        newTheme = 'light';
        break;
      default:
        newTheme = 'light';
    }

    this.setTheme(newTheme);
    this.saveToLocalStorage(newTheme);
  }

  /**
   * Aplicar tema al documento
   */
  private applyTheme(theme: Theme): void {
    if (typeof document === 'undefined') return;

    const root = document.documentElement;

    if (theme === 'dark') {
      root.setAttribute('data-theme', 'dark');
    } else if (theme === 'dark-gray') {
      root.setAttribute('data-theme', 'dark-gray');
    } else {
      root.removeAttribute('data-theme');
    }
  }

  /**
   * Guardar tema en localStorage
   */
  private saveToLocalStorage(theme: Theme): void {
    if (typeof localStorage === 'undefined') return;
    localStorage.setItem(this.STORAGE_KEY, theme);
  }

  /**
   * Obtener tema desde localStorage
   */
  private getFromLocalStorage(): Theme | null {
    if (typeof localStorage === 'undefined') return null;

    const saved = localStorage.getItem(this.STORAGE_KEY);
    if (saved === 'light' || saved === 'dark' || saved === 'dark-gray') {
      return saved;
    }
    return null;
  }
}
