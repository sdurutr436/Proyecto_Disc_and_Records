import { Component, signal, inject, HostListener, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterLink } from '@angular/router';
import { ThemeService } from '../../../services/theme';
import { AuthService } from '../../../services/auth';
import { AppStateService } from '../../../services/app-state';
import { Breadcrumbs } from '../../shared/breadcrumbs/breadcrumbs';
import { BreadcrumbService } from '../../../services/breadcrumb.service';

@Component({
  selector: 'app-main',
  imports: [CommonModule, RouterLink, Breadcrumbs],
  templateUrl: './main.html',
  styleUrl: './main.scss',
})
export class Main {
  private router = inject(Router);
  themeService = inject(ThemeService);
  breadcrumbService = inject(BreadcrumbService);
  private authService = inject(AuthService);
  appState = inject(AppStateService);

  // Menú móvil del nav
  isMenuOpen = signal(false);

  /**
   * Computed: Verificar si el usuario actual es administrador o moderador
   */
  isAdmin = computed(() => {
    const user = this.appState.currentUser();
    return user?.role === 'admin' || user?.role === 'moderator';
  });

  /**
   * Navegar a Mi Lista:
   * - Si está autenticado: va al perfil, pestaña de álbumes
   * - Si no está autenticado: abre el modal de login
   */
  navigateToMyList(): void {
    this.closeMenu();
    if (this.appState.isAuthenticated()) {
      // Navegar al perfil con el tab de álbumes
      this.router.navigate(['/profile'], { queryParams: { tab: 'albums' } });
    } else {
      // Disparar evento para abrir modal de login
      if (typeof window !== 'undefined') {
        window.dispatchEvent(new CustomEvent('open-login-modal'));
      }
    }
  }

  /**
   * Navegar a la búsqueda de todos los álbumes
   */
  navigateToAllAlbums(): void {
    this.closeMenu();
    // Navegar a búsqueda con query especial para mostrar todos
    this.router.navigate(['/search'], { queryParams: { q: '*', filter: 'albums' } });
  }

  /**
   * Navegar a la página de Roadmap/Próximamente
   */
  navigateToRoadmap(): void {
    this.closeMenu();
    this.router.navigate(['/roadmap']);
  }

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
        return 'Cambiar a modo oscuro';
      case 'dark':
        return 'Cambiar a modo escala de grises';
      case 'grayscale':
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
        return 'MODO OSCURO';
      case 'grayscale':
        return 'ESCALA DE GRISES';
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
