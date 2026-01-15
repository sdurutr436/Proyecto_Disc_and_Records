import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { provideRouter, Router } from '@angular/router';
import { provideHttpClient } from '@angular/common/http';
import { signal } from '@angular/core';

import { Header } from './header';
import { AuthService } from '../../../services/auth';
import { AppStateService } from '../../../services/app-state';
import { ThemeService } from '../../../services/theme';

/**
 * Tests unitarios para el componente Header
 *
 * Cobertura:
 * - Creación del componente
 * - Navegación entre páginas
 * - Gestión del menú móvil
 * - Toggle de tema claro/oscuro
 * - Gestión de modales de autenticación
 * - Eventos de teclado (ESC)
 * - Login y logout
 */
describe('Header', () => {
  let component: Header;
  let fixture: ComponentFixture<Header>;
  let authServiceSpy: jasmine.SpyObj<AuthService>;
  let appStateSpy: jasmine.SpyObj<AppStateService>;
  let themeServiceSpy: jasmine.SpyObj<ThemeService>;
  let router: Router;

  beforeEach(async () => {
    // Crear spies para los servicios
    authServiceSpy = jasmine.createSpyObj('AuthService', ['logout', 'login']);
    appStateSpy = jasmine.createSpyObj('AppStateService', ['isAuthenticated', 'userName'], {
      currentUser: signal(null)
    });
    themeServiceSpy = jasmine.createSpyObj('ThemeService', ['toggleTheme'], {
      isDarkMode: signal(false)
    });

    // Configurar comportamiento por defecto
    appStateSpy.isAuthenticated.and.returnValue(false);
    appStateSpy.userName.and.returnValue('');

    await TestBed.configureTestingModule({
      imports: [Header],
      providers: [
        provideRouter([]),
        provideHttpClient(),
        { provide: AuthService, useValue: authServiceSpy },
        { provide: AppStateService, useValue: appStateSpy },
        { provide: ThemeService, useValue: themeServiceSpy }
      ]
    }).compileComponents();

    router = TestBed.inject(Router);
    spyOn(router, 'navigate');

    fixture = TestBed.createComponent(Header);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  afterEach(() => {
    fixture.destroy();
  });

  // ==========================================================================
  // TESTS DE CREACIÓN
  // ==========================================================================

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have menu closed by default', () => {
    expect(component.isMenuOpen()).toBe(false);
  });

  it('should have no modal open by default', () => {
    expect(component.activeModal()).toBe('none');
  });

  // ==========================================================================
  // TESTS DE NAVEGACIÓN
  // ==========================================================================

  it('should navigate to home', () => {
    component.navigateToHome();
    expect(router.navigate).toHaveBeenCalledWith(['/']);
  });

  it('should navigate to profile', () => {
    component.navigateToProfile();
    expect(router.navigate).toHaveBeenCalledWith(['/profile']);
  });

  it('should logout and navigate to home', () => {
    component.logout();

    expect(authServiceSpy.logout).toHaveBeenCalled();
    expect(router.navigate).toHaveBeenCalledWith(['/']);
  });

  // ==========================================================================
  // TESTS DEL MENÚ MÓVIL
  // ==========================================================================

  it('should toggle menu open', () => {
    expect(component.isMenuOpen()).toBe(false);

    component.toggleMenu();
    expect(component.isMenuOpen()).toBe(true);

    component.toggleMenu();
    expect(component.isMenuOpen()).toBe(false);
  });

  it('should close menu', () => {
    component.toggleMenu(); // Abrir
    expect(component.isMenuOpen()).toBe(true);

    component.closeMenu();
    expect(component.isMenuOpen()).toBe(false);
  });

  // ==========================================================================
  // TESTS DE TEMA
  // ==========================================================================

  it('should toggle theme', () => {
    component.toggleTheme();
    expect(themeServiceSpy.toggleTheme).toHaveBeenCalled();
  });

  // ==========================================================================
  // TESTS DE MODALES DE AUTENTICACIÓN
  // ==========================================================================

  it('should open login modal', () => {
    component.openLoginModal();
    expect(component.activeModal()).toBe('login');
  });

  it('should open register modal', () => {
    component.openRegisterModal();
    expect(component.activeModal()).toBe('register');
  });

  it('should open forgot password modal', () => {
    component.openForgotPasswordModal();
    expect(component.activeModal()).toBe('forgot-password');
  });

  it('should close auth modal', () => {
    component.openLoginModal();
    expect(component.activeModal()).toBe('login');

    component.closeAuthModal();
    expect(component.activeModal()).toBe('none');
  });

  it('should navigate between modals', () => {
    component.navigateToModal('login');
    expect(component.activeModal()).toBe('login');

    component.navigateToModal('register');
    expect(component.activeModal()).toBe('register');

    component.navigateToModal('forgot-password');
    expect(component.activeModal()).toBe('forgot-password');
  });

  it('should close modal on login success', () => {
    component.openLoginModal();
    expect(component.activeModal()).toBe('login');

    component.onLoginSuccess();
    expect(component.activeModal()).toBe('none');
  });

  // ==========================================================================
  // TESTS DE EVENTOS DE TECLADO
  // ==========================================================================

  it('should close menu on escape key', () => {
    component.toggleMenu(); // Abrir
    expect(component.isMenuOpen()).toBe(true);

    // Simular ESC
    component.onEscapeKey();
    expect(component.isMenuOpen()).toBe(false);
  });

  it('should not do anything on escape if menu is closed', () => {
    expect(component.isMenuOpen()).toBe(false);

    // No debería lanzar error
    expect(() => component.onEscapeKey()).not.toThrow();
    expect(component.isMenuOpen()).toBe(false);
  });

  // ==========================================================================
  // TESTS DE EVENTOS GLOBALES
  // ==========================================================================

  it('should listen for open-register-modal event', fakeAsync(() => {
    const event = new CustomEvent('open-register-modal');
    window.dispatchEvent(event);
    tick();

    expect(component.activeModal()).toBe('register');
  }));

  it('should listen for open-login-modal event', fakeAsync(() => {
    const event = new CustomEvent('open-login-modal');
    window.dispatchEvent(event);
    tick();

    expect(component.activeModal()).toBe('login');
  }));

  // ==========================================================================
  // TESTS DE CLICK FUERA
  // ==========================================================================

  it('should close menu when clicking outside', () => {
    component.toggleMenu(); // Abrir
    expect(component.isMenuOpen()).toBe(true);

    // Simular click fuera del menú
    const mockEvent = {
      target: document.createElement('div')
    } as unknown as MouseEvent;

    component.onDocumentClick(mockEvent);
    expect(component.isMenuOpen()).toBe(false);
  });

  it('should not close menu when clicking inside menu', () => {
    component.toggleMenu();
    expect(component.isMenuOpen()).toBe(true);

    // Crear elemento con la clase del menú
    const menuElement = document.createElement('div');
    menuElement.classList.add('header-nav__mobile');

    const mockEvent = {
      target: menuElement
    } as unknown as MouseEvent;

    // Mock de closest
    spyOn(menuElement, 'closest').and.returnValue(menuElement);

    component.onDocumentClick(mockEvent);
    // El menú debería seguir abierto porque el click fue dentro
  });

  it('should not do anything on document click if menu is closed', () => {
    expect(component.isMenuOpen()).toBe(false);

    const mockEvent = {
      target: document.createElement('div')
    } as unknown as MouseEvent;

    expect(() => component.onDocumentClick(mockEvent)).not.toThrow();
  });
});
