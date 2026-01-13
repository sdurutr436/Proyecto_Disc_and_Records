import { Component, signal, HostListener, inject, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { ThemeService } from '../../../services/theme';
import { AuthService } from '../../../services/auth';
import { AppStateService } from '../../../services/app-state';
import { Modal } from '../../shared/modal/modal';
import { LoginForm } from '../../shared/login-form/login-form';
import { RegisterForm } from '../../shared/register-form/register-form';
import { ForgotPasswordForm } from '../../shared/forgot-password-form/forgot-password-form';

/**
 * Tipos de modal disponibles para autenticación
 */
type AuthModalType = 'none' | 'login' | 'register' | 'forgot-password';

@Component({
  selector: 'app-header',
  imports: [CommonModule, Modal, LoginForm, RegisterForm, ForgotPasswordForm],
  templateUrl: './header.html',
  styleUrl: './header.scss',
})
export class Header implements OnInit, OnDestroy {
  private router = inject(Router);
  authService = inject(AuthService);
  appState = inject(AppStateService);

  isMenuOpen = signal(false);
  themeService = inject(ThemeService);

  /**
   * Estado del modal activo
   * Controla cuál de los 3 modales de autenticación está visible
   */
  activeModal = signal<AuthModalType>('none');

  ngOnInit() {
    // Escuchar el evento personalizado desde cualquier componente
    if (typeof window !== 'undefined') {
      window.addEventListener('open-register-modal', this.handleOpenRegisterModal);
      window.addEventListener('open-login-modal', this.handleOpenLoginModal);
    }
  }

  ngOnDestroy() {
    // Limpiar el listener al destruir el componente
    if (typeof window !== 'undefined') {
      window.removeEventListener('open-register-modal', this.handleOpenRegisterModal);
      window.removeEventListener('open-login-modal', this.handleOpenLoginModal);
    }
  }

  /**
   * Manejador del evento personalizado de registro
   */
  private handleOpenRegisterModal = () => {
    this.openRegisterModal();
  };

  /**
   * Manejador del evento personalizado de login
   */
  private handleOpenLoginModal = () => {
    this.openLoginModal();
  };

  // ============================================
  // MÉTODOS DE NAVEGACIÓN
  // ============================================

  /**
   * Navegar a la página principal
   */
  navigateToHome() {
    this.router.navigate(['/']);
  }

  /**
   * Navegar al perfil del usuario
   */
  navigateToProfile() {
    this.router.navigate(['/profile']);
  }

  /**
   * Cerrar sesión
   */
  logout() {
    this.authService.logout();
    this.router.navigate(['/']);
  }

  /**
   * Callback cuando el login es exitoso
   * Cierra el modal automáticamente
   */
  onLoginSuccess() {
    this.closeAuthModal();
  }

  // ============================================
  // MÉTODOS DEL MENÚ MÓVIL
  // ============================================

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

  // ============================================
  // MÉTODOS DE MODALES DE AUTENTICACIÓN
  // ============================================

  /**
   * Abrir modal de login
   */
  openLoginModal() {
    this.activeModal.set('login');
  }

  /**
   * Abrir modal de registro
   */
  openRegisterModal() {
    this.activeModal.set('register');
  }

  /**
   * Abrir modal de recuperar contraseña
   */
  openForgotPasswordModal() {
    this.activeModal.set('forgot-password');
  }

  /**
   * Cerrar cualquier modal activo
   */
  closeAuthModal() {
    this.activeModal.set('none');
  }

  /**
   * Navegar de un modal a otro
   * Usado por los links dentro de los formularios
   */
  navigateToModal(modalType: AuthModalType) {
    this.activeModal.set(modalType);
  }

  // ============================================
  // EVENT LISTENERS
  // ============================================

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
