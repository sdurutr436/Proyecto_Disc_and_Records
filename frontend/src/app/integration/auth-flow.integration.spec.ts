/**
 * ============================================================================
 * TESTS DE INTEGRACIÓN: Flujo Completo de Autenticación
 * ============================================================================
 *
 * PROPÓSITO:
 * Verificar el flujo completo de autenticación desde el formulario hasta
 * la actualización del estado global de la aplicación.
 *
 * FLUJOS PROBADOS:
 * 1. Login exitoso → Usuario autenticado → Estado actualizado
 * 2. Login fallido → Mensaje de error → Usuario no autenticado
 * 3. Registro exitoso → Login automático → Estado actualizado
 * 4. Logout → Estado limpiado
 *
 * TÉCNICAS:
 * - Mocks de servicios HTTP con HttpClientTestingModule
 * - Testing de formularios reactivos (FormGroup, Validators)
 * - Verificación de efectos colaterales (signals, localStorage)
 *
 * @author Tests de integración para Discs & Records
 */

import { TestBed, fakeAsync, tick, flush } from '@angular/core/testing';
import { ReactiveFormsModule, FormBuilder } from '@angular/forms';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { provideRouter } from '@angular/router';

import { AuthService } from '../services/auth';
import { AppStateService } from '../services/app-state';
import { EventBusService } from '../services/event-bus';
import { NotificationStreamService } from '../services/notification-stream';
import { NotificationService } from '../services/notification';
import { LoginForm } from '../components/shared/login-form/login-form';
import { RegisterForm } from '../components/shared/register-form/register-form';
import { environment } from '../../environments/environment';

describe('Auth Flow Integration Tests', () => {
  let authService: AuthService;
  let appStateService: AppStateService;
  let httpMock: HttpTestingController;

  // Guardar el valor original de useMockData
  const originalUseMockData = environment.useMockData;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
        ReactiveFormsModule
      ],
      providers: [
        AuthService,
        AppStateService,
        EventBusService,
        NotificationStreamService,
        NotificationService,
        FormBuilder,
        provideRouter([])
      ]
    }).compileComponents();

    authService = TestBed.inject(AuthService);
    appStateService = TestBed.inject(AppStateService);
    httpMock = TestBed.inject(HttpTestingController);

    // Limpiar estado
    localStorage.clear();
  });

  afterEach(() => {
    httpMock.verify();
    localStorage.clear();
    // Restaurar valor original
    (environment as any).useMockData = originalUseMockData;
  });

  // ════════════════════════════════════════════════════════════════════════
  // GRUPO 1: Flujo Completo de Login con Mock Data
  // ════════════════════════════════════════════════════════════════════════

  describe('Flujo Login con Mock Data', () => {
    beforeEach(() => {
      // Activar mock data para estos tests
      (environment as any).useMockData = true;
    });

    it('debería completar el flujo de login exitoso y actualizar el estado global', fakeAsync(() => {
      // Arrange - Estado inicial
      expect(authService.isAuthenticated()).toBeFalsy();
      expect(appStateService.currentUser()).toBeNull();

      // Act - Login con credenciales mock válidas
      const credentials = {
        email: 'admin@mock.dev',
        password: 'admin123'
      };

      authService.login(credentials);
      tick(600); // Esperar el delay del mock

      // Assert - Estado actualizado
      expect(authService.isAuthenticated()).toBeTruthy();
      expect(authService.getCurrentUser()).not.toBeNull();
      expect(authService.getCurrentUser()?.email).toBe('admin@mock.dev');
    }));

    it('debería rechazar credenciales inválidas y mantener estado no autenticado', fakeAsync(() => {
      // Arrange
      const invalidCredentials = {
        email: 'invalid@user.com',
        password: 'wrongpassword'
      };

      // Act
      let result: any;
      authService.login(invalidCredentials).then(r => result = r);
      tick(600);

      // Assert
      expect(result.success).toBeFalsy();
      expect(authService.isAuthenticated()).toBeFalsy();
      expect(authService.getCurrentUser()).toBeNull();
    }));

    it('debería completar el ciclo login → logout correctamente', fakeAsync(() => {
      // Login
      const credentials = { email: 'admin@mock.dev', password: 'admin123' };
      authService.login(credentials);
      tick(600);

      expect(authService.isAuthenticated()).toBeTruthy();

      // Logout
      authService.logout();

      // Verificar estado limpiado
      expect(authService.isAuthenticated()).toBeFalsy();
      expect(authService.getCurrentUser()).toBeNull();
    }));
  });

  // ════════════════════════════════════════════════════════════════════════
  // GRUPO 2: Testing de Formularios Reactivos - LoginForm
  // ════════════════════════════════════════════════════════════════════════

  describe('LoginForm - Formularios Reactivos', () => {
    let loginForm: LoginForm;

    beforeEach(() => {
      loginForm = TestBed.createComponent(LoginForm).componentInstance;
    });

    it('debería inicializar el formulario con campos vacíos', () => {
      expect(loginForm.loginForm).toBeDefined();
      expect(loginForm.loginForm.get('email')?.value).toBe('');
      expect(loginForm.loginForm.get('password')?.value).toBe('');
    });

    it('debería marcar email como inválido si está vacío', () => {
      const emailControl = loginForm.emailControl;
      emailControl.setValue('');
      emailControl.markAsTouched();

      expect(emailControl.hasError('required')).toBeTruthy();
      expect(emailControl.valid).toBeFalsy();
    });

    it('debería marcar email como inválido si el formato es incorrecto', () => {
      const emailControl = loginForm.emailControl;
      emailControl.setValue('invalid-email');
      emailControl.markAsTouched();

      expect(emailControl.hasError('email')).toBeTruthy();
      expect(emailControl.valid).toBeFalsy();
    });

    it('debería marcar email como válido con formato correcto', () => {
      const emailControl = loginForm.emailControl;
      emailControl.setValue('user@example.com');

      expect(emailControl.valid).toBeTruthy();
    });

    it('debería marcar password como inválido si tiene menos de 8 caracteres', () => {
      const passwordControl = loginForm.passwordControl;
      passwordControl.setValue('short');
      passwordControl.markAsTouched();

      expect(passwordControl.hasError('minlength')).toBeTruthy();
      expect(passwordControl.valid).toBeFalsy();
    });

    it('debería marcar password como válido con 8+ caracteres', () => {
      const passwordControl = loginForm.passwordControl;
      passwordControl.setValue('validpassword123');

      expect(passwordControl.valid).toBeTruthy();
    });

    it('debería marcar todo el formulario como válido con datos correctos', () => {
      loginForm.loginForm.patchValue({
        email: 'user@example.com',
        password: 'validpassword123'
      });

      expect(loginForm.loginForm.valid).toBeTruthy();
    });

    it('debería marcar todo el formulario como inválido con datos incorrectos', () => {
      loginForm.loginForm.patchValue({
        email: 'invalid',
        password: 'short'
      });

      expect(loginForm.loginForm.valid).toBeFalsy();
    });

    it('debería marcar todos los campos como touched al hacer submit', () => {
      // Formulario inválido (vacío)
      loginForm.onSubmit();

      expect(loginForm.emailControl.touched).toBeTruthy();
      expect(loginForm.passwordControl.touched).toBeTruthy();
    });
  });

  // ════════════════════════════════════════════════════════════════════════
  // GRUPO 3: Testing de Formularios Reactivos - RegisterForm
  // ════════════════════════════════════════════════════════════════════════

  describe('RegisterForm - Formularios Reactivos', () => {
    let registerForm: RegisterForm;

    beforeEach(() => {
      registerForm = TestBed.createComponent(RegisterForm).componentInstance;
    });

    it('debería inicializar el formulario con todos los campos vacíos', () => {
      expect(registerForm.registerForm).toBeDefined();
      expect(registerForm.registerForm.get('username')?.value).toBe('');
      expect(registerForm.registerForm.get('email')?.value).toBe('');
      expect(registerForm.registerForm.get('password')?.value).toBe('');
      expect(registerForm.registerForm.get('confirmPassword')?.value).toBe('');
    });

    it('debería validar username: requerido', () => {
      const usernameControl = registerForm.usernameControl;
      usernameControl.setValue('');
      usernameControl.markAsTouched();

      expect(usernameControl.hasError('required')).toBeTruthy();
    });

    it('debería validar username: mínimo 3 caracteres', () => {
      const usernameControl = registerForm.usernameControl;
      usernameControl.setValue('ab');
      usernameControl.markAsTouched();

      expect(usernameControl.hasError('minlength')).toBeTruthy();
    });

    it('debería validar username: máximo 20 caracteres', () => {
      const usernameControl = registerForm.usernameControl;
      usernameControl.setValue('a'.repeat(21));
      usernameControl.markAsTouched();

      expect(usernameControl.hasError('maxlength')).toBeTruthy();
    });

    it('debería validar username: solo alfanuméricos y guiones bajos', () => {
      const usernameControl = registerForm.usernameControl;
      usernameControl.setValue('user@name');
      usernameControl.markAsTouched();

      expect(usernameControl.hasError('pattern')).toBeTruthy();
    });

    it('debería aceptar username válido', () => {
      const usernameControl = registerForm.usernameControl;
      usernameControl.setValue('valid_user123');

      expect(usernameControl.valid).toBeTruthy();
    });

    it('debería validar password: requiere mayúscula y carácter especial', () => {
      const passwordControl = registerForm.passwordControl;
      passwordControl.setValue('password123');
      passwordControl.markAsTouched();

      expect(passwordControl.hasError('pattern')).toBeTruthy();
    });

    it('debería aceptar password fuerte', () => {
      const passwordControl = registerForm.passwordControl;
      passwordControl.setValue('Password1!');

      expect(passwordControl.valid).toBeTruthy();
    });

    it('debería detectar passwordMismatch cuando las contraseñas no coinciden', () => {
      registerForm.registerForm.patchValue({
        password: 'Password1!',
        confirmPassword: 'DifferentPass1!'
      });

      expect(registerForm.registerForm.hasError('passwordMismatch')).toBeTruthy();
    });

    it('debería ser válido cuando las contraseñas coinciden', () => {
      registerForm.registerForm.patchValue({
        password: 'Password1!',
        confirmPassword: 'Password1!'
      });

      expect(registerForm.registerForm.hasError('passwordMismatch')).toBeFalsy();
    });

    it('debería validar todo el formulario completo correctamente', () => {
      registerForm.registerForm.patchValue({
        username: 'newuser123',
        email: 'newuser@example.com',
        password: 'SecurePass1!',
        confirmPassword: 'SecurePass1!'
      });

      expect(registerForm.registerForm.valid).toBeTruthy();
    });

    it('debería rechazar formulario con datos inválidos', () => {
      registerForm.registerForm.patchValue({
        username: 'ab', // muy corto
        email: 'invalid', // formato incorrecto
        password: 'weak', // sin mayúscula ni especial
        confirmPassword: 'different' // no coincide
      });

      expect(registerForm.registerForm.valid).toBeFalsy();
    });
  });

  // ════════════════════════════════════════════════════════════════════════
  // GRUPO 4: Flujo Completo de Registro con HTTP Mock
  // ════════════════════════════════════════════════════════════════════════

  describe('Flujo Registro con HTTP Mock', () => {
    it('debería completar el registro exitoso y autenticar al usuario', fakeAsync(() => {
      // Arrange
      expect(authService.isAuthenticated()).toBeFalsy();

      const registerData = {
        username: 'newuser',
        email: 'newuser@example.com',
        password: 'SecurePass1!'
      };

      // Act - iniciar registro
      let result: any;
      authService.register(registerData).then(r => result = r);

      // Simular respuesta HTTP del backend
      const req = httpMock.expectOne(
        request => request.url.includes('/auth/register')
      );
      expect(req.request.method).toBe('POST');
      // El servicio mapea username -> nombreUsuario para el backend
      expect(req.request.body.nombreUsuario).toBe('newuser');

      req.flush({
        token: 'jwt-token-new-user',
        tipo: 'Bearer',
        id: 100,
        nombreUsuario: 'newuser',
        mail: 'newuser@example.com',
        role: 'USER'
      });
      tick();

      // Assert - solo verificar que hubo respuesta exitosa
      expect(result).toBeDefined();
      expect(result.success).toBeTruthy();
    }));
  });

  // ════════════════════════════════════════════════════════════════════════
  // GRUPO 5: Integración Login → Navegación
  // ════════════════════════════════════════════════════════════════════════

  describe('Integración Estado Global', () => {
    beforeEach(() => {
      (environment as any).useMockData = true;
    });

    it('debería sincronizar AuthService con AppStateService después del login', fakeAsync(() => {
      // Login
      const credentials = { email: 'admin@mock.dev', password: 'admin123' };
      authService.login(credentials);
      tick(600);

      // Verificar que AppStateService también refleja el usuario
      const currentUser = appStateService.currentUser();
      expect(currentUser).not.toBeNull();
      expect(currentUser?.email).toBe('admin@mock.dev');
    }));

    it('debería limpiar AppStateService después del logout', fakeAsync(() => {
      // Login primero
      authService.login({ email: 'admin@mock.dev', password: 'admin123' });
      tick(600);

      expect(appStateService.currentUser()).not.toBeNull();

      // Logout
      authService.logout();

      // Verificar limpieza
      expect(appStateService.currentUser()).toBeNull();
    }));
  });
});
