import { Component, signal, inject, HostListener } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { ThemeService } from '../../../services/theme';
import { StyleGuideNavigationService, StyleGuideSection } from '../../../services/style-guide-navigation';

@Component({
  selector: 'app-main',
  imports: [CommonModule],
  templateUrl: './main.html',
  styleUrl: './main.scss',
})
export class Main {
  themeService = inject(ThemeService);
  private router = inject(Router);
  private styleGuideNav = inject(StyleGuideNavigationService);

  // Sidebar lateral
  sidebarOpen = signal(false);

  // Menú móvil del nav
  isMenuOpen = signal(false);

  toggleSidebar(): void {
    this.sidebarOpen.update((open) => !open);
  }

  closeSidebar(): void {
    this.sidebarOpen.set(false);
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

  navigateToSection(section: StyleGuideSection): void {
    // Cambiar la sección activa
    this.styleGuideNav.setSection(section);
    // Navegar a style-guide si no estamos ya ahí
    this.router.navigate(['/style-guide']);
    // Cerrar el sidebar
    this.closeSidebar();
  }

  /**
   * Cerrar sidebar y menú móvil al presionar ESC
   */
  @HostListener('document:keydown.escape')
  onEscapeKey(): void {
    if (this.sidebarOpen()) {
      this.closeSidebar();
    }
    if (this.isMenuOpen()) {
      this.closeMenu();
    }
  }

  /**
   * Cerrar sidebar al hacer click fuera
   */
  @HostListener('document:click', ['$event'])
  onDocumentClick(event: MouseEvent): void {
    if (!this.sidebarOpen()) return;

    const target = event.target as HTMLElement;
    const sidebar = target.closest('.main-sidebar');

    // Si el click NO es dentro de .main-sidebar, cerrar
    if (!sidebar) {
      this.closeSidebar();
    }
  }
}
