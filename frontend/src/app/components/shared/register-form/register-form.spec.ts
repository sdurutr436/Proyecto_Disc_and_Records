import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { provideHttpClient } from '@angular/common/http';

import { RegisterForm } from './register-form';
import { AuthService } from '../../../services/auth';

/**
 * Tests unitarios para RegisterForm
 *
 * Cobertura:
 * - Creación del componente
 * - Validación de username
 * - Validación de email
 * - Validación de contraseña (complejidad)
 * - Validación de confirmación de contraseña
 * - Validación cruzada (password match)
 * - Proceso de registro
 */
describe('RegisterForm', () => {
  let component: RegisterForm;
  let fixture: ComponentFixture<RegisterForm>;
  let authServiceSpy: jasmine.SpyObj<AuthService>;

  beforeEach(async () => {
    authServiceSpy = jasmine.createSpyObj('AuthService', ['register']);
    authServiceSpy.register.and.returnValue(Promise.resolve({ success: true, message: 'OK' }));

    await TestBed.configureTestingModule({
      imports: [RegisterForm, ReactiveFormsModule],
      providers: [
        provideHttpClient(),
        { provide: AuthService, useValue: authServiceSpy }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(RegisterForm);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  // ==========================================================================
  // TESTS DE CREACIÓN
  // ==========================================================================

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have a form with all required controls', () => {
    expect(component.registerForm).toBeDefined();
    expect(component.usernameControl).toBeDefined();
    expect(component.emailControl).toBeDefined();
    expect(component.passwordControl).toBeDefined();
    expect(component.confirmPasswordControl).toBeDefined();
  });

  it('should initialize with empty form', () => {
    expect(component.usernameControl.value).toBe('');
    expect(component.emailControl.value).toBe('');
    expect(component.passwordControl.value).toBe('');
    expect(component.confirmPasswordControl.value).toBe('');
  });

  // ==========================================================================
  // TESTS DE VALIDACIÓN DE USERNAME
  // ==========================================================================

  describe('Username Validation', () => {
    it('should require username', () => {
      component.usernameControl.setValue('');
      component.usernameControl.markAsTouched();

      expect(component.usernameControl.hasError('required')).toBe(true);
    });

    it('should require minimum 3 characters', () => {
      component.usernameControl.setValue('ab');
      component.usernameControl.markAsTouched();

      expect(component.usernameControl.hasError('minlength')).toBe(true);
    });

    it('should allow maximum 20 characters', () => {
      component.usernameControl.setValue('a'.repeat(21));
      component.usernameControl.markAsTouched();

      expect(component.usernameControl.hasError('maxlength')).toBe(true);
    });

    it('should only allow alphanumeric and underscores', () => {
      component.usernameControl.setValue('user@name');
      component.usernameControl.markAsTouched();

      expect(component.usernameControl.hasError('pattern')).toBe(true);
    });

    it('should accept valid username', () => {
      component.usernameControl.setValue('valid_user123');

      expect(component.usernameControl.valid).toBe(true);
    });

    it('should accept username with underscore', () => {
      component.usernameControl.setValue('user_name');

      expect(component.usernameControl.valid).toBe(true);
    });
  });

  // ==========================================================================
  // TESTS DE VALIDACIÓN DE EMAIL
  // ==========================================================================

  describe('Email Validation', () => {
    it('should require email', () => {
      component.emailControl.setValue('');
      component.emailControl.markAsTouched();

      expect(component.emailControl.hasError('required')).toBe(true);
    });

    it('should validate email format', () => {
      component.emailControl.setValue('invalid-email');
      component.emailControl.markAsTouched();

      expect(component.emailControl.hasError('email')).toBe(true);
    });

    it('should accept valid email', () => {
      component.emailControl.setValue('test@example.com');

      expect(component.emailControl.valid).toBe(true);
    });
  });

  // ==========================================================================
  // TESTS DE VALIDACIÓN DE CONTRASEÑA
  // ==========================================================================

  describe('Password Validation', () => {
    it('should require password', () => {
      component.passwordControl.setValue('');
      component.passwordControl.markAsTouched();

      expect(component.passwordControl.hasError('required')).toBe(true);
    });

    it('should require minimum 8 characters', () => {
      component.passwordControl.setValue('Short1!');
      component.passwordControl.markAsTouched();

      expect(component.passwordControl.hasError('minlength')).toBe(true);
    });

    it('should require at least one uppercase letter', () => {
      component.passwordControl.setValue('password123!');
      component.passwordControl.markAsTouched();

      expect(component.passwordControl.hasError('pattern')).toBe(true);
    });

    it('should require at least one special character', () => {
      component.passwordControl.setValue('Password123');
      component.passwordControl.markAsTouched();

      expect(component.passwordControl.hasError('pattern')).toBe(true);
    });

    it('should accept valid password', () => {
      component.passwordControl.setValue('ValidPass123!');

      expect(component.passwordControl.valid).toBe(true);
    });

    it('should accept password with various special characters', () => {
      const validPasswords = [
        'Password1!',
        'Password1@',
        'Password1#',
        'Password1$',
        'Password1%',
        'Password1^',
        'Password1&',
        'Password1*',
        'Password1-',
        'Password1_',
        'Password1=',
        'Password1+',
        'Password1[',
        'Password1]',
        'Password1{',
        'Password1}',
        'Password1|',
        'Password1;',
        'Password1:',
        'Password1,',
        'Password1.',
        'Password1/',
        'Password1<',
        'Password1>',
        'Password1?',
        'Password1`',
        'Password1~'
      ];

      validPasswords.forEach(password => {
        component.passwordControl.setValue(password);
        expect(component.passwordControl.valid).toBe(true, `${password} should be valid`);
      });
    });
  });

  // ==========================================================================
  // TESTS DE VALIDACIÓN DE CONFIRMACIÓN DE CONTRASEÑA
  // ==========================================================================

  describe('Confirm Password Validation', () => {
    it('should require confirm password', () => {
      component.confirmPasswordControl.setValue('');
      component.confirmPasswordControl.markAsTouched();

      expect(component.confirmPasswordControl.hasError('required')).toBe(true);
    });

    it('should detect password mismatch', () => {
      component.passwordControl.setValue('ValidPass123!');
      component.confirmPasswordControl.setValue('DifferentPass123!');
      component.registerForm.markAllAsTouched();

      expect(component.registerForm.hasError('passwordMismatch')).toBe(true);
    });

    it('should accept matching passwords', () => {
      component.passwordControl.setValue('ValidPass123!');
      component.confirmPasswordControl.setValue('ValidPass123!');

      expect(component.registerForm.hasError('passwordMismatch')).toBe(false);
    });

    it('should not show mismatch error when passwords are empty', () => {
      component.passwordControl.setValue('');
      component.confirmPasswordControl.setValue('');

      expect(component.registerForm.hasError('passwordMismatch')).toBe(false);
    });
  });

  // ==========================================================================
  // TESTS DE FORMULARIO COMPLETO
  // ==========================================================================

  describe('Full Form Validation', () => {
    it('should be invalid when empty', () => {
      expect(component.registerForm.valid).toBe(false);
    });

    it('should be valid with all correct data', () => {
      component.usernameControl.setValue('validuser');
      component.emailControl.setValue('test@example.com');
      component.passwordControl.setValue('ValidPass123!');
      component.confirmPasswordControl.setValue('ValidPass123!');

      expect(component.registerForm.valid).toBe(true);
    });

    it('should mark all fields as touched on submit', async () => {
      expect(component.usernameControl.touched).toBe(false);

      await component.onSubmit();

      expect(component.usernameControl.touched).toBe(true);
      expect(component.emailControl.touched).toBe(true);
      expect(component.passwordControl.touched).toBe(true);
      expect(component.confirmPasswordControl.touched).toBe(true);
    });
  });

  // ==========================================================================
  // TESTS DE ENVÍO
  // ==========================================================================

  describe('Form Submission', () => {
    const validFormData = {
      username: 'newuser',
      email: 'new@example.com',
      password: 'ValidPass123!',
      confirmPassword: 'ValidPass123!'
    };

    function fillValidForm() {
      component.usernameControl.setValue(validFormData.username);
      component.emailControl.setValue(validFormData.email);
      component.passwordControl.setValue(validFormData.password);
      component.confirmPasswordControl.setValue(validFormData.confirmPassword);
    }

    it('should not call authService when form is invalid', async () => {
      await component.onSubmit();

      expect(authServiceSpy.register).not.toHaveBeenCalled();
    });

    it('should call authService when form is valid', fakeAsync(() => {
      fillValidForm();

      component.onSubmit();
      tick();

      expect(authServiceSpy.register).toHaveBeenCalledWith({
        username: validFormData.username,
        email: validFormData.email,
        password: validFormData.password
      });
    }));

    it('should set isSubmitting during submission', fakeAsync(() => {
      authServiceSpy.register.and.returnValue(
        new Promise(resolve => setTimeout(() => resolve({ success: true, message: 'OK' }), 100))
      );
      fillValidForm();

      component.onSubmit();

      expect(component.isSubmitting()).toBe(true);

      tick(100);

      expect(component.isSubmitting()).toBe(false);
    }));

    it('should emit onRegisterSuccess on successful registration', fakeAsync(() => {
      fillValidForm();
      const successSpy = jasmine.createSpy('onRegisterSuccess');
      component.onRegisterSuccess.subscribe(successSpy);

      component.onSubmit();
      tick();

      expect(successSpy).toHaveBeenCalled();
    }));

    it('should reset form on successful registration', fakeAsync(() => {
      fillValidForm();

      component.onSubmit();
      tick();

      expect(component.usernameControl.value).toBeNull();
      expect(component.emailControl.value).toBeNull();
    }));

    it('should not emit onRegisterSuccess on failed registration', fakeAsync(() => {
      authServiceSpy.register.and.returnValue(Promise.resolve({ success: false, message: 'Error' }));
      fillValidForm();
      const successSpy = jasmine.createSpy('onRegisterSuccess');
      component.onRegisterSuccess.subscribe(successSpy);

      component.onSubmit();
      tick();

      expect(successSpy).not.toHaveBeenCalled();
    }));

    it('should handle registration error gracefully', fakeAsync(() => {
      authServiceSpy.register.and.returnValue(Promise.reject(new Error('Network error')));
      fillValidForm();

      expect(() => {
        component.onSubmit();
        tick();
      }).not.toThrow();

      expect(component.isSubmitting()).toBe(false);
    }));
  });

  // ==========================================================================
  // TESTS DE OUTPUTS
  // ==========================================================================

  describe('Outputs', () => {
    it('should have onLogin output', () => {
      expect(component.onLogin).toBeDefined();
    });

    it('should have onRegisterSuccess output', () => {
      expect(component.onRegisterSuccess).toBeDefined();
    });
  });
});
