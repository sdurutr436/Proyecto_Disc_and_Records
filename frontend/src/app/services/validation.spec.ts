import { TestBed } from '@angular/core/testing';
import { ValidationService, ValidationResult } from './validation';

describe('ValidationService', () => {
  let service: ValidationService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ValidationService);
  });

  describe('Creación', () => {
    it('debería crear el servicio', () => {
      expect(service).toBeTruthy();
    });
  });

  // ==========================================================================
  // validateEmail
  // ==========================================================================
  describe('validateEmail', () => {
    describe('Emails válidos', () => {
      it('debería validar email correcto simple', () => {
        const result = service.validateEmail('user@example.com');
        expect(result.isValid).toBeTrue();
        expect(result.errorMessage).toBe('');
      });

      it('debería validar email con dominio .es', () => {
        const result = service.validateEmail('usuario@correo.es');
        expect(result.isValid).toBeTrue();
      });

      it('debería validar email con subdominio', () => {
        const result = service.validateEmail('user@mail.example.com');
        expect(result.isValid).toBeTrue();
      });

      it('debería validar email con números', () => {
        const result = service.validateEmail('user123@example.com');
        expect(result.isValid).toBeTrue();
      });

      it('debería validar email con puntos en usuario', () => {
        const result = service.validateEmail('user.name@example.com');
        expect(result.isValid).toBeTrue();
      });

      it('debería validar email con guión en usuario', () => {
        const result = service.validateEmail('user-name@example.com');
        expect(result.isValid).toBeTrue();
      });
    });

    describe('Emails inválidos', () => {
      it('debería rechazar email vacío', () => {
        const result = service.validateEmail('');
        expect(result.isValid).toBeFalse();
        expect(result.errorMessage).toContain('requerido');
      });

      it('debería rechazar email solo espacios', () => {
        const result = service.validateEmail('   ');
        expect(result.isValid).toBeFalse();
      });

      it('debería rechazar email sin @', () => {
        const result = service.validateEmail('userexample.com');
        expect(result.isValid).toBeFalse();
        expect(result.errorMessage).toContain('inválido');
      });

      it('debería rechazar email sin dominio', () => {
        const result = service.validateEmail('user@');
        expect(result.isValid).toBeFalse();
      });

      it('debería rechazar email sin extensión válida', () => {
        const result = service.validateEmail('user@example.c');
        expect(result.isValid).toBeFalse();
      });

      it('debería rechazar email con espacios', () => {
        const result = service.validateEmail('user @example.com');
        expect(result.isValid).toBeFalse();
      });

      it('debería rechazar email con doble @', () => {
        const result = service.validateEmail('user@@example.com');
        expect(result.isValid).toBeFalse();
      });
    });
  });

  // ==========================================================================
  // validateUsername
  // ==========================================================================
  describe('validateUsername', () => {
    describe('Usernames válidos', () => {
      it('debería validar username simple', () => {
        const result = service.validateUsername('usuario');
        expect(result.isValid).toBeTrue();
      });

      it('debería validar username con números', () => {
        const result = service.validateUsername('user123');
        expect(result.isValid).toBeTrue();
      });

      it('debería validar username con underscore', () => {
        const result = service.validateUsername('user_name');
        expect(result.isValid).toBeTrue();
      });

      it('debería validar username de 3 caracteres', () => {
        const result = service.validateUsername('abc');
        expect(result.isValid).toBeTrue();
      });

      it('debería validar username de 20 caracteres', () => {
        const result = service.validateUsername('a'.repeat(20));
        expect(result.isValid).toBeTrue();
      });
    });

    describe('Usernames inválidos', () => {
      it('debería rechazar username vacío', () => {
        const result = service.validateUsername('');
        expect(result.isValid).toBeFalse();
        expect(result.errorMessage).toContain('requerido');
      });

      it('debería rechazar username menor a 3 caracteres', () => {
        const result = service.validateUsername('ab');
        expect(result.isValid).toBeFalse();
        expect(result.errorMessage).toContain('3');
      });

      it('debería rechazar username mayor a 20 caracteres', () => {
        const result = service.validateUsername('a'.repeat(21));
        expect(result.isValid).toBeFalse();
        expect(result.errorMessage).toContain('20');
      });

      it('debería rechazar username con espacios', () => {
        const result = service.validateUsername('user name');
        expect(result.isValid).toBeFalse();
        expect(result.errorMessage).toContain('sin espacios');
      });

      it('debería rechazar username con caracteres especiales', () => {
        const result = service.validateUsername('user@name');
        expect(result.isValid).toBeFalse();
      });

      it('debería rechazar username con guión', () => {
        const result = service.validateUsername('user-name');
        expect(result.isValid).toBeFalse();
      });
    });
  });

  // ==========================================================================
  // validatePassword
  // ==========================================================================
  describe('validatePassword', () => {
    describe('Contraseñas válidas', () => {
      it('debería validar contraseña con todos los requisitos', () => {
        const result = service.validatePassword('Password1!');
        expect(result.isValid).toBeTrue();
      });

      it('debería validar contraseña con diferentes caracteres especiales', () => {
        expect(service.validatePassword('Password1@').isValid).toBeTrue();
        expect(service.validatePassword('Password1#').isValid).toBeTrue();
        expect(service.validatePassword('Password1$').isValid).toBeTrue();
      });
    });

    describe('Contraseñas inválidas', () => {
      it('debería rechazar contraseña vacía', () => {
        const result = service.validatePassword('');
        expect(result.isValid).toBeFalse();
        expect(result.errorMessage).toContain('requerida');
      });

      it('debería rechazar contraseña menor a 8 caracteres', () => {
        const result = service.validatePassword('Pass1!');
        expect(result.isValid).toBeFalse();
        expect(result.errorMessage).toContain('8 caracteres');
      });

      it('debería rechazar contraseña sin mayúscula', () => {
        const result = service.validatePassword('password1!');
        expect(result.isValid).toBeFalse();
        expect(result.errorMessage).toContain('mayúscula');
      });

      it('debería rechazar contraseña sin carácter especial', () => {
        const result = service.validatePassword('Password1');
        expect(result.isValid).toBeFalse();
        expect(result.errorMessage).toContain('especial');
      });
    });
  });

  // ==========================================================================
  // validatePasswordConfirmation
  // ==========================================================================
  describe('validatePasswordConfirmation', () => {
    it('debería validar cuando las contraseñas coinciden', () => {
      const result = service.validatePasswordConfirmation('Password1!', 'Password1!');
      expect(result.isValid).toBeTrue();
    });

    it('debería rechazar confirmación vacía', () => {
      const result = service.validatePasswordConfirmation('Password1!', '');
      expect(result.isValid).toBeFalse();
      expect(result.errorMessage).toContain('confirmar');
    });

    it('debería rechazar cuando las contraseñas no coinciden', () => {
      const result = service.validatePasswordConfirmation('Password1!', 'Password2!');
      expect(result.isValid).toBeFalse();
      expect(result.errorMessage).toContain('no coinciden');
    });
  });

  // ==========================================================================
  // getPasswordStrength
  // ==========================================================================
  describe('getPasswordStrength', () => {
    it('debería retornar score 0 para contraseña vacía', () => {
      const strength = service.getPasswordStrength('');
      expect(strength.score).toBe(0);
      expect(strength.hasMinLength).toBeFalse();
      expect(strength.hasUpperCase).toBeFalse();
      expect(strength.hasLowerCase).toBeFalse();
      expect(strength.hasNumber).toBeFalse();
      expect(strength.hasSpecialChar).toBeFalse();
    });

    it('debería detectar longitud mínima', () => {
      const strength = service.getPasswordStrength('12345678');
      expect(strength.hasMinLength).toBeTrue();
    });

    it('debería detectar mayúsculas', () => {
      const strength = service.getPasswordStrength('Password');
      expect(strength.hasUpperCase).toBeTrue();
    });

    it('debería detectar minúsculas', () => {
      const strength = service.getPasswordStrength('password');
      expect(strength.hasLowerCase).toBeTrue();
    });

    it('debería detectar números', () => {
      const strength = service.getPasswordStrength('pass123');
      expect(strength.hasNumber).toBeTrue();
    });

    it('debería detectar caracteres especiales', () => {
      const strength = service.getPasswordStrength('pass!');
      expect(strength.hasSpecialChar).toBeTrue();
    });

    it('debería retornar score 5 para contraseña completa', () => {
      const strength = service.getPasswordStrength('Password1!');
      expect(strength.score).toBe(5);
    });

    it('debería retornar score correcto para contraseña parcial', () => {
      const strength = service.getPasswordStrength('password');
      expect(strength.score).toBe(2); // minLength + lowercase
    });
  });

  // ==========================================================================
  // validateLoginForm
  // ==========================================================================
  describe('validateLoginForm', () => {
    it('debería validar formulario de login correcto', () => {
      const result = service.validateLoginForm('user@example.com', 'Password1!');
      expect(result.isValid).toBeTrue();
    });

    it('debería rechazar login con email inválido', () => {
      const result = service.validateLoginForm('invalid', 'Password1!');
      expect(result.isValid).toBeFalse();
      expect(result.errors.email.isValid).toBeFalse();
    });

    it('debería rechazar login con password inválido', () => {
      const result = service.validateLoginForm('user@example.com', 'weak');
      expect(result.isValid).toBeFalse();
      expect(result.errors.password.isValid).toBeFalse();
    });

    it('debería rechazar login con ambos campos inválidos', () => {
      const result = service.validateLoginForm('', '');
      expect(result.isValid).toBeFalse();
      expect(result.errors.email.isValid).toBeFalse();
      expect(result.errors.password.isValid).toBeFalse();
    });

    it('debería retornar errores detallados', () => {
      const result = service.validateLoginForm('', '');
      expect(result.errors.email.errorMessage).toBeTruthy();
      expect(result.errors.password.errorMessage).toBeTruthy();
    });
  });

  // ==========================================================================
  // validateRegisterForm
  // ==========================================================================
  describe('validateRegisterForm', () => {
    const validData = {
      username: 'testuser',
      email: 'test@example.com',
      password: 'Password1!',
      confirmPassword: 'Password1!'
    };

    it('debería validar formulario de registro correcto', () => {
      const result = service.validateRegisterForm(validData);
      expect(result.isValid).toBeTrue();
    });

    it('debería rechazar username inválido', () => {
      const result = service.validateRegisterForm({ ...validData, username: 'ab' });
      expect(result.isValid).toBeFalse();
      expect(result.errors.username.isValid).toBeFalse();
    });

    it('debería rechazar email inválido', () => {
      const result = service.validateRegisterForm({ ...validData, email: 'invalid' });
      expect(result.isValid).toBeFalse();
      expect(result.errors.email.isValid).toBeFalse();
    });

    it('debería rechazar password inválido', () => {
      const result = service.validateRegisterForm({ ...validData, password: 'weak', confirmPassword: 'weak' });
      expect(result.isValid).toBeFalse();
      expect(result.errors.password.isValid).toBeFalse();
    });

    it('debería rechazar confirmación no coincidente', () => {
      const result = service.validateRegisterForm({ ...validData, confirmPassword: 'Different1!' });
      expect(result.isValid).toBeFalse();
      expect(result.errors.confirmPassword.isValid).toBeFalse();
    });

    it('debería rechazar formulario vacío', () => {
      const result = service.validateRegisterForm({
        username: '',
        email: '',
        password: '',
        confirmPassword: ''
      });
      expect(result.isValid).toBeFalse();
      expect(result.errors.username.isValid).toBeFalse();
      expect(result.errors.email.isValid).toBeFalse();
      expect(result.errors.password.isValid).toBeFalse();
      expect(result.errors.confirmPassword.isValid).toBeFalse();
    });
  });
});
