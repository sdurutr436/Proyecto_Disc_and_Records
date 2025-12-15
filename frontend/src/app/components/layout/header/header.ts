import { Component, signal, HostListener, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ThemeService } from '../../../services/theme';

@Component({
  selector: 'app-header',
  imports: [CommonModule],
  templateUrl: './header.html',
  styleUrl: './header.scss',
})
export class Header {
  isMenuOpen = signal(false);
  themeService = inject(ThemeService);

  toggleMenu() {
    this.isMenuOpen.set(!this.isMenuOpen());
  }

  closeMenu() {
    this.isMenuOpen.set(false);
  }

  /**
   * Toggle entre tema claro y oscuro
   */
  toggleTheme() {
    this.themeService.toggleTheme();
  }

  /**
   * Cerrar menú al presionar ESC
   */
  @HostListener('document:keydown.escape')
  onEscapeKey() {
    if (this.isMenuOpen()) {
      this.closeMenu();
    }
  }

  /**
   * Cerrar menú al hacer click fuera del menú móvil
   */
  @HostListener('document:click', ['$event'])
  onDocumentClick(event: MouseEvent) {
    if (!this.isMenuOpen()) return;

    const target = event.target as HTMLElement;
    const mobileNav = target.closest('.header-nav__mobile');

    // Si el click NO es dentro de .header-nav__mobile, cerrar
    if (!mobileNav) {
      this.closeMenu();
    }
  }
}
