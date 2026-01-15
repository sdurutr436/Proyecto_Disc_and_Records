import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { provideHttpClient } from '@angular/common/http';

import { LoginForm } from './login-form';
import { AuthService } from '../../../services/auth';

/**
 * Tests unitarios para el componente LoginForm
 *
 * Cobertura:
 * - Creación del componente
 * - Validación de formulario reactivo
 * - Validación de email
 * - Validación de contraseña
 * - Estado de envío
 * - Interacción con AuthService
 * - Outputs para navegación entre modales
 */
describe('LoginForm', () => {
  let component: LoginForm;
  let fixture: ComponentFixture<LoginForm>;
  let authServiceSpy: jasmine.SpyObj<AuthService>;

  beforeEach(async () => {
    authServiceSpy = jasmine.createSpyObj('AuthService', ['login']);
    authServiceSpy.login.and.returnValue(Promise.resolve({ success: true, message: 'OK' }));

    await TestBed.configureTestingModule({
      imports: [LoginForm, ReactiveFormsModule],
      providers: [
        provideHttpClient(),
        { provide: AuthService, useValue: authServiceSpy }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(LoginForm);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  // ==========================================================================
  // TESTS DE CREACIÓN
  // ==========================================================================

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have a form with email and password controls', () => {
    expect(component.loginForm).toBeDefined();
    expect(component.emailControl).toBeDefined();
    expect(component.passwordControl).toBeDefined();
  });

  it('should initialize with empty form', () => {
    expect(component.emailControl.value).toBe('');
    expect(component.passwordControl.value).toBe('');
  });

  it('should not be submitting initially', () => {
    expect(component.isSubmitting()).toBe(false);
  });

  // ==========================================================================
  // TESTS DE VALIDACIÓN DE EMAIL
  // ==========================================================================

  it('should mark email as invalid when empty', () => {
    component.emailControl.setValue('');
    component.emailControl.markAsTouched();

    expect(component.emailControl.valid).toBe(false);
    expect(component.emailControl.hasError('required')).toBe(true);
  });

  it('should mark email as invalid with incorrect format', () => {
    component.emailControl.setValue('invalid-email');
    component.emailControl.markAsTouched();

    expect(component.emailControl.valid).toBe(false);
    expect(component.emailControl.hasError('email')).toBe(true);
  });

  it('should mark email as valid with correct format', () => {
    component.emailControl.setValue('test@example.com');

    expect(component.emailControl.valid).toBe(true);
  });

  it('should accept various valid email formats', () => {
    const validEmails = [
      'user@domain.com',
      'user.name@domain.com',
      'user+tag@domain.org',
      'user@sub.domain.com'
    ];

    validEmails.forEach(email => {
      component.emailControl.setValue(email);
      expect(component.emailControl.valid).toBe(true, `${email} should be valid`);
    });
  });

  // ==========================================================================
  // TESTS DE VALIDACIÓN DE CONTRASEÑA
  // ==========================================================================

  it('should mark password as invalid when empty', () => {
    component.passwordControl.setValue('');
    component.passwordControl.markAsTouched();

    expect(component.passwordControl.valid).toBe(false);
    expect(component.passwordControl.hasError('required')).toBe(true);
  });

  it('should mark password as invalid when less than 8 characters', () => {
    component.passwordControl.setValue('short');
    component.passwordControl.markAsTouched();

    expect(component.passwordControl.valid).toBe(false);
    expect(component.passwordControl.hasError('minlength')).toBe(true);
  });

  it('should mark password as valid with 8+ characters', () => {
    component.passwordControl.setValue('validpassword');

    expect(component.passwordControl.valid).toBe(true);
  });

  it('should accept exactly 8 character password', () => {
    component.passwordControl.setValue('12345678');

    expect(component.passwordControl.valid).toBe(true);
  });

  // ==========================================================================
  // TESTS DE VALIDACIÓN DEL FORMULARIO COMPLETO
  // ==========================================================================

  it('should mark form as invalid when empty', () => {
    expect(component.loginForm.valid).toBe(false);
  });

  it('should mark form as valid with correct data', () => {
    component.emailControl.setValue('test@example.com');
    component.passwordControl.setValue('validpassword');

    expect(component.loginForm.valid).toBe(true);
  });

  it('should mark all fields as touched on submit', () => {
    expect(component.emailControl.touched).toBe(false);
    expect(component.passwordControl.touched).toBe(false);

    component.onSubmit();

    expect(component.emailControl.touched).toBe(true);
    expect(component.passwordControl.touched).toBe(true);
  });

  // ==========================================================================
  // TESTS DE ENVÍO DE FORMULARIO
  // ==========================================================================

  it('should not call authService when form is invalid', () => {
    component.onSubmit();

    expect(authServiceSpy.login).not.toHaveBeenCalled();
  });

  it('should call authService when form is valid', fakeAsync(() => {
    component.emailControl.setValue('test@example.com');
    component.passwordControl.setValue('validpassword');

    component.onSubmit();

    expect(authServiceSpy.login).toHaveBeenCalledWith({
      email: 'test@example.com',
      password: 'validpassword'
    });

    tick();
  }));

  it('should set isSubmitting to true during submission', fakeAsync(() => {
    // Hacer que login sea lento
    authServiceSpy.login.and.returnValue(
      new Promise(resolve => setTimeout(() => resolve({ success: true, message: 'OK' }), 100))
    );

    component.emailControl.setValue('test@example.com');
    component.passwordControl.setValue('validpassword');

    component.onSubmit();

    expect(component.isSubmitting()).toBe(true);

    tick(100);

    expect(component.isSubmitting()).toBe(false);
  }));

  it('should emit onLoginSuccess on successful login', fakeAsync(() => {
    const successSpy = jasmine.createSpy('onLoginSuccess');
    component.onLoginSuccess.subscribe(successSpy);

    component.emailControl.setValue('test@example.com');
    component.passwordControl.setValue('validpassword');

    component.onSubmit();
    tick();

    expect(successSpy).toHaveBeenCalled();
  }));

  it('should not emit onLoginSuccess on failed login', fakeAsync(() => {
    authServiceSpy.login.and.returnValue(Promise.resolve({ success: false, message: 'Invalid credentials' }));

    const successSpy = jasmine.createSpy('onLoginSuccess');
    component.onLoginSuccess.subscribe(successSpy);

    component.emailControl.setValue('test@example.com');
    component.passwordControl.setValue('validpassword');

    component.onSubmit();
    tick();

    expect(successSpy).not.toHaveBeenCalled();
  }));

  it('should reset form on successful login', fakeAsync(() => {
    component.emailControl.setValue('test@example.com');
    component.passwordControl.setValue('validpassword');

    component.onSubmit();
    tick();

    expect(component.emailControl.value).toBeNull();
    expect(component.passwordControl.value).toBeNull();
  }));

  it('should handle login error gracefully', fakeAsync(() => {
    authServiceSpy.login.and.returnValue(Promise.reject(new Error('Network error')));

    component.emailControl.setValue('test@example.com');
    component.passwordControl.setValue('validpassword');

    // No debería lanzar excepción
    expect(() => {
      component.onSubmit();
      tick();
    }).not.toThrow();

    expect(component.isSubmitting()).toBe(false);
  }));

  // ==========================================================================
  // TESTS DE OUTPUTS
  // ==========================================================================

  it('should have onForgotPassword output', () => {
    expect(component.onForgotPassword).toBeDefined();
  });

  it('should have onRegister output', () => {
    expect(component.onRegister).toBeDefined();
  });

  it('should have onLoginSuccess output', () => {
    expect(component.onLoginSuccess).toBeDefined();
  });
});
