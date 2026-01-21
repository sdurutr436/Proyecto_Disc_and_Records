import { Injectable, signal } from '@angular/core';

export type Theme = 'light' | 'dark' | 'grayscale';

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
    // Inicializar tema al crear el servicio
    this.initTheme();
  }

  /**
   * Detectar preferencia de tema del sistema operativo
   * @returns 'dark' si el usuario prefiere modo oscuro, 'light' en caso contrario
   */
  private detectSystemPreference(): Theme {
    if (typeof window === 'undefined') return 'light';

    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)');
    return prefersDark.matches ? 'dark' : 'light';
  }

  /**
   * Inicializar el tema:
   * 1. Recuperar de localStorage si existe
   * 2. Si no existe, detectar preferencia del sistema
   * 3. Aplicar el tema seleccionado
   */
  initTheme(): void {
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
          this.setTheme(e.matches ? 'dark' : 'light');
        }
      });
    }
  }

  /**
   * Establecer un tema específico
   * @param theme - El tema a aplicar ('light', 'dark', o 'grayscale')
   */
  setTheme(theme: Theme): void {
    this.currentTheme.set(theme);
    this.applyTheme(theme);
  }

  /**
   * Rotar al siguiente tema en el ciclo: Light -> Dark -> Grayscale -> Light
   * Este método es llamado por el botón del header/nav para cambiar de tema
   */
  nextTheme(): void {
    const currentTheme = this.currentTheme();
    let newTheme: Theme;

    switch (currentTheme) {
      case 'light':
        newTheme = 'dark';
        break;
      case 'dark':
        newTheme = 'grayscale';
        break;
      case 'grayscale':
        newTheme = 'light';
        break;
      default:
        newTheme = 'light';
    }

    this.setTheme(newTheme);
    this.saveToLocalStorage(newTheme);
  }

  /**
   * Alias de nextTheme() para mantener retrocompatibilidad
   * @deprecated Usar nextTheme() en su lugar
   */
  toggleTheme(): void {
    this.nextTheme();
  }

  /**
   * Aplicar tema al documento HTML mediante el atributo data-theme
   * @param theme - El tema a aplicar
   */
  private applyTheme(theme: Theme): void {
    if (typeof document === 'undefined') return;

    const root = document.documentElement;

    // Aplicar el atributo data-theme según el tema seleccionado
    if (theme === 'light') {
      // Light mode: sin atributo (usa :root por defecto)
      root.removeAttribute('data-theme');
    } else {
      // Dark o Grayscale: aplicar atributo correspondiente
      root.setAttribute('data-theme', theme);
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
   * Valida que el valor guardado sea un tema válido
   */
  private getFromLocalStorage(): Theme | null {
    if (typeof localStorage === 'undefined') return null;

    const saved = localStorage.getItem(this.STORAGE_KEY);
    if (saved === 'light' || saved === 'dark' || saved === 'grayscale') {
      return saved;
    }
    return null;
  }
}
