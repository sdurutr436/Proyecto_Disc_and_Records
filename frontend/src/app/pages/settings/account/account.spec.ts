import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import SettingsAccountComponent from './account';

describe('SettingsAccountComponent', () => {
  let component: SettingsAccountComponent;
  let fixture: ComponentFixture<SettingsAccountComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SettingsAccountComponent, ReactiveFormsModule],
      schemas: [NO_ERRORS_SCHEMA]
    }).compileComponents();

    fixture = TestBed.createComponent(SettingsAccountComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  describe('Creación', () => {
    it('debería crear el componente', () => {
      expect(component).toBeTruthy();
    });
  });

  describe('Estado inicial', () => {
    it('debería tener isLoading en false', () => {
      expect(component.isLoading()).toBeFalse();
    });

    it('debería tener successMessage en null', () => {
      expect(component.successMessage()).toBeNull();
    });

    it('debería tener errorMessage en null', () => {
      expect(component.errorMessage()).toBeNull();
    });

    it('debería tener showPasswordModal en false', () => {
      expect(component.showPasswordModal()).toBeFalse();
    });
  });

  describe('emailForm', () => {
    it('debería tener email con valor inicial', () => {
      expect(component.emailForm.get('email')?.value).toBe('perrete@example.com');
    });

    it('debería ser válido con email correcto', () => {
      component.emailForm.patchValue({ email: 'test@example.com' });
      expect(component.emailForm.valid).toBeTrue();
    });

    it('debería ser inválido con email incorrecto', () => {
      component.emailForm.patchValue({ email: 'invalid-email' });
      expect(component.emailForm.valid).toBeFalse();
    });

    it('debería ser inválido si email vacío', () => {
      component.emailForm.patchValue({ email: '' });
      expect(component.emailForm.get('email')?.hasError('required')).toBeTrue();
    });
  });

  describe('passwordForm', () => {
    it('debería existir', () => {
      expect(component.passwordForm).toBeTruthy();
    });

    it('debería tener currentPassword', () => {
      expect(component.passwordForm.get('currentPassword')).toBeTruthy();
    });

    it('debería tener newPassword', () => {
      expect(component.passwordForm.get('newPassword')).toBeTruthy();
    });

    it('debería tener confirmPassword', () => {
      expect(component.passwordForm.get('confirmPassword')).toBeTruthy();
    });

    it('debería requerir minLength de 8 para newPassword', () => {
      component.passwordForm.patchValue({ newPassword: '123' });
      expect(component.passwordForm.get('newPassword')?.hasError('minlength')).toBeTrue();
    });

    it('debería ser válido con password de 8+ caracteres', () => {
      component.passwordForm.patchValue({ newPassword: '12345678' });
      expect(component.passwordForm.get('newPassword')?.hasError('minlength')).toBeFalse();
    });
  });

  describe('passwordStrength', () => {
    it('debería calcular fortaleza de contraseña', () => {
      expect(typeof component.passwordStrength()).toBe('number');
    });
  });

  describe('CanComponentDeactivate', () => {
    it('debería implementar canDeactivate', () => {
      expect(component.canDeactivate).toBeDefined();
    });

    it('debería permitir salir si formularios están pristine', () => {
      component.emailForm.markAsPristine();
      component.passwordForm.markAsPristine();
      expect(component.canDeactivate()).toBeTrue();
    });
  });
});
