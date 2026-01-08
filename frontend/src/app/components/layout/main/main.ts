import { Component, signal, inject, HostListener } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { ThemeService } from '../../../services/theme';

@Component({
  selector: 'app-main',
  imports: [CommonModule, RouterLink],
  templateUrl: './main.html',
  styleUrl: './main.scss',
})
export class Main {
  themeService = inject(ThemeService);

  // Menú móvil del nav
  isMenuOpen = signal(false);

  toggleMenu(): void {
    this.isMenuOpen.update((open) => !open);
  }

  closeMenu(): void {
    this.isMenuOpen.set(false);
  }

  toggleTheme(): void {
    this.themeService.toggleTheme();
  }

  /**
   * Obtener el label de accesibilidad para el botón de tema
   */
  getThemeLabel(): string {
    const current = this.themeService.currentTheme();
    switch (current) {
      case 'light':
        return 'Cambiar a modo oscuro azul';
      case 'dark':
        return 'Cambiar a modo oscuro escala de grises';
      case 'dark-gray':
        return 'Cambiar a modo claro';
      default:
        return 'Cambiar tema';
    }
  }

  /**
   * Obtener el texto descriptivo del tema actual (para móvil)
   */
  getThemeText(): string {
    const current = this.themeService.currentTheme();
    switch (current) {
      case 'light':
        return 'MODO CLARO';
      case 'dark':
        return 'MODO OSCURO AZUL';
      case 'dark-gray':
        return 'MODO OSCURO GRIS';
      default:
        return 'MODO CLARO';
    }
  }

  /**
   * Cerrar menú móvil al presionar ESC
   */
  @HostListener('document:keydown.escape')
  onEscapeKey(): void {
    if (this.isMenuOpen()) {
      this.closeMenu();
    }
  }
}
