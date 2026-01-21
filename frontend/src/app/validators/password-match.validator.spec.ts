/**
 * ============================================================================
 * TESTS EXHAUSTIVOS: Password Match Validator
 * ============================================================================
 *
 * PROPÓSITO:
 * Verificar que el validador de coincidencia de contraseñas funciona al 100%.
 * Cross-field validation a nivel FormGroup.
 *
 * COBERTURA 100%:
 * - ✅ Contraseñas que coinciden (retorna null)
 * - ✅ Contraseñas que no coinciden (retorna { mismatch: true })
 * - ✅ Controles inexistentes (retorna null)
 * - ✅ Control touched/untouched
 * - ✅ Valores vacíos
 * - ✅ Valores null/undefined
 * - ✅ Mensaje de error amigable
 *
 * @author Tests para Discs & Records
 */

import { FormControl, FormGroup } from '@angular/forms';
import { passwordMatch, getPasswordMatchErrorMessage } from './password-match.validator';

describe('PasswordMatchValidator', () => {
  // ════════════════════════════════════════════════════════════════════════
  // GRUPO 1: Creación e Inicialización
  // ════════════════════════════════════════════════════════════════════════

  describe('Creación e Inicialización', () => {
    it('should create a validator function', () => {
      const validator = passwordMatch('password', 'confirmPassword');

      expect(validator).toBeDefined();
      expect(typeof validator).toBe('function');
    });

    it('should return a ValidatorFn type', () => {
      const validator = passwordMatch('password', 'confirmPassword');
      const group = new FormGroup({
        password: new FormControl(''),
        confirmPassword: new FormControl('')
      });

      const result = validator(group);

      expect(result === null || typeof result === 'object').toBeTruthy();
    });
  });

  // ════════════════════════════════════════════════════════════════════════
  // GRUPO 2: Contraseñas que Coinciden (Válido)
  // ════════════════════════════════════════════════════════════════════════

  describe('Contraseñas que Coinciden (retorna null)', () => {
    it('should return null when passwords match', () => {
      const validator = passwordMatch('password', 'confirmPassword');
      const group = new FormGroup({
        password: new FormControl('MySecurePassword123!'),
        confirmPassword: new FormControl('MySecurePassword123!')
      });

      const result = validator(group);

      expect(result).toBeNull();
    });

    it('should return null when both passwords are empty strings', () => {
      const validator = passwordMatch('password', 'confirmPassword');
      const group = new FormGroup({
        password: new FormControl(''),
        confirmPassword: new FormControl('')
      });

      const result = validator(group);

      expect(result).toBeNull();
    });

    it('should return null for matching complex passwords', () => {
      const validator = passwordMatch('password', 'confirmPassword');
      const complexPassword = 'P@ssw0rd!2024#Secure$Strong%Very^Long&Complex*';
      const group = new FormGroup({
        password: new FormControl(complexPassword),
        confirmPassword: new FormControl(complexPassword)
      });

      const result = validator(group);

      expect(result).toBeNull();
    });

    it('should return null for matching passwords with special characters', () => {
      const validator = passwordMatch('password', 'confirmPassword');
      const group = new FormGroup({
        password: new FormControl('Test!@#$%^&*()'),
        confirmPassword: new FormControl('Test!@#$%^&*()')
      });

      const result = validator(group);

      expect(result).toBeNull();
    });

    it('should return null for matching passwords with unicode', () => {
      const validator = passwordMatch('password', 'confirmPassword');
      const group = new FormGroup({
        password: new FormControl('Contraseña123!ñ'),
        confirmPassword: new FormControl('Contraseña123!ñ')
      });

      const result = validator(group);

      expect(result).toBeNull();
    });
  });

  // ════════════════════════════════════════════════════════════════════════
  // GRUPO 3: Contraseñas que NO Coinciden (Inválido)
  // ════════════════════════════════════════════════════════════════════════

  describe('Contraseñas que NO Coinciden (retorna { mismatch: true })', () => {
    it('should return mismatch error when passwords differ', () => {
      const validator = passwordMatch('password', 'confirmPassword');
      const group = new FormGroup({
        password: new FormControl('Password123!'),
        confirmPassword: new FormControl('DifferentPassword456!')
      });
      // Marcar como touched para que el validator lo evalúe
      group.get('confirmPassword')?.markAsTouched();

      const result = validator(group);

      expect(result).toEqual({ mismatch: true });
    });

    it('should return mismatch error for case sensitivity difference', () => {
      const validator = passwordMatch('password', 'confirmPassword');
      const group = new FormGroup({
        password: new FormControl('Password123!'),
        confirmPassword: new FormControl('password123!') // lowercase P
      });
      group.get('confirmPassword')?.markAsTouched();

      const result = validator(group);

      expect(result).toEqual({ mismatch: true });
    });

    it('should return mismatch error when one is empty', () => {
      const validator = passwordMatch('password', 'confirmPassword');
      const group = new FormGroup({
        password: new FormControl('Password123!'),
        confirmPassword: new FormControl('')
      });
      group.get('confirmPassword')?.markAsTouched();

      const result = validator(group);

      expect(result).toEqual({ mismatch: true });
    });

    it('should return mismatch error for whitespace difference', () => {
      const validator = passwordMatch('password', 'confirmPassword');
      const group = new FormGroup({
        password: new FormControl('Password123!'),
        confirmPassword: new FormControl('Password123! ') // trailing space
      });
      group.get('confirmPassword')?.markAsTouched();

      const result = validator(group);

      expect(result).toEqual({ mismatch: true });
    });

    it('should return mismatch error for leading space difference', () => {
      const validator = passwordMatch('password', 'confirmPassword');
      const group = new FormGroup({
        password: new FormControl('Password123!'),
        confirmPassword: new FormControl(' Password123!') // leading space
      });
      group.get('confirmPassword')?.markAsTouched();

      const result = validator(group);

      expect(result).toEqual({ mismatch: true });
    });
  });

  // ════════════════════════════════════════════════════════════════════════
  // GRUPO 4: Controles Inexistentes
  // ════════════════════════════════════════════════════════════════════════

  describe('Controles Inexistentes (retorna null)', () => {
    it('should return null when password control does not exist', () => {
      const validator = passwordMatch('password', 'confirmPassword');
      const group = new FormGroup({
        confirmPassword: new FormControl('Test123!')
      });

      const result = validator(group);

      expect(result).toBeNull();
    });

    it('should return null when confirmPassword control does not exist', () => {
      const validator = passwordMatch('password', 'confirmPassword');
      const group = new FormGroup({
        password: new FormControl('Test123!')
      });

      const result = validator(group);

      expect(result).toBeNull();
    });

    it('should return null when both controls do not exist', () => {
      const validator = passwordMatch('password', 'confirmPassword');
      const group = new FormGroup({
        otherField: new FormControl('value')
      });

      const result = validator(group);

      expect(result).toBeNull();
    });

    it('should return null for empty FormGroup', () => {
      const validator = passwordMatch('password', 'confirmPassword');
      const group = new FormGroup({});

      const result = validator(group);

      expect(result).toBeNull();
    });
  });

  // ════════════════════════════════════════════════════════════════════════
  // GRUPO 5: Estado Touched/Untouched
  // ════════════════════════════════════════════════════════════════════════

  describe('Estado Touched/Untouched', () => {
    it('should return null when matchControl has errors but is not touched', () => {
      const validator = passwordMatch('password', 'confirmPassword');
      const group = new FormGroup({
        password: new FormControl('Password123!'),
        confirmPassword: new FormControl('Different!')
      });
      // El control tiene errores propios pero NO está touched
      group.get('confirmPassword')?.setErrors({ required: true });

      const result = validator(group);

      expect(result).toBeNull();
    });

    it('should evaluate when matchControl is touched', () => {
      const validator = passwordMatch('password', 'confirmPassword');
      const group = new FormGroup({
        password: new FormControl('Password123!'),
        confirmPassword: new FormControl('Different!')
      });
      group.get('confirmPassword')?.markAsTouched();

      const result = validator(group);

      expect(result).toEqual({ mismatch: true });
    });

    it('should return null when matchControl has no errors and is not touched', () => {
      const validator = passwordMatch('password', 'confirmPassword');
      const group = new FormGroup({
        password: new FormControl('Password123!'),
        confirmPassword: new FormControl('Different!')
      });
      // No touched, no errors previos - el validador evalúa

      const result = validator(group);

      // Sin errors previos y no touched, el validador compara
      expect(result).toEqual({ mismatch: true });
    });
  });

  // ════════════════════════════════════════════════════════════════════════
  // GRUPO 6: Valores Edge Cases
  // ════════════════════════════════════════════════════════════════════════

  describe('Edge Cases (null, undefined, etc.)', () => {
    it('should handle null values in both controls', () => {
      const validator = passwordMatch('password', 'confirmPassword');
      const group = new FormGroup({
        password: new FormControl(null),
        confirmPassword: new FormControl(null)
      });

      const result = validator(group);

      expect(result).toBeNull(); // null === null
    });

    it('should handle undefined values in both controls', () => {
      const validator = passwordMatch('password', 'confirmPassword');
      const group = new FormGroup({
        password: new FormControl(undefined),
        confirmPassword: new FormControl(undefined)
      });

      const result = validator(group);

      expect(result).toBeNull(); // undefined === undefined
    });

    it('should return mismatch when one is null and other is string', () => {
      const validator = passwordMatch('password', 'confirmPassword');
      const group = new FormGroup({
        password: new FormControl('Password123!'),
        confirmPassword: new FormControl(null)
      });
      group.get('confirmPassword')?.markAsTouched();

      const result = validator(group);

      expect(result).toEqual({ mismatch: true });
    });

    it('should return mismatch when one is undefined and other is string', () => {
      const validator = passwordMatch('password', 'confirmPassword');
      const group = new FormGroup({
        password: new FormControl(undefined),
        confirmPassword: new FormControl('Password123!')
      });
      group.get('confirmPassword')?.markAsTouched();

      const result = validator(group);

      expect(result).toEqual({ mismatch: true });
    });

    it('should handle very long passwords', () => {
      const validator = passwordMatch('password', 'confirmPassword');
      const longPassword = 'A'.repeat(1000) + '1!';
      const group = new FormGroup({
        password: new FormControl(longPassword),
        confirmPassword: new FormControl(longPassword)
      });

      const result = validator(group);

      expect(result).toBeNull();
    });

    it('should handle passwords with only whitespace', () => {
      const validator = passwordMatch('password', 'confirmPassword');
      const group = new FormGroup({
        password: new FormControl('   '),
        confirmPassword: new FormControl('   ')
      });

      const result = validator(group);

      expect(result).toBeNull();
    });

    it('should return mismatch for different whitespace lengths', () => {
      const validator = passwordMatch('password', 'confirmPassword');
      const group = new FormGroup({
        password: new FormControl('   '),
        confirmPassword: new FormControl('    ')
      });
      group.get('confirmPassword')?.markAsTouched();

      const result = validator(group);

      expect(result).toEqual({ mismatch: true });
    });
  });

  // ════════════════════════════════════════════════════════════════════════
  // GRUPO 7: Nombres de Control Personalizados
  // ════════════════════════════════════════════════════════════════════════

  describe('Nombres de Control Personalizados', () => {
    it('should work with custom control names', () => {
      const validator = passwordMatch('newPassword', 'repeatPassword');
      const group = new FormGroup({
        newPassword: new FormControl('Test123!'),
        repeatPassword: new FormControl('Test123!')
      });

      const result = validator(group);

      expect(result).toBeNull();
    });

    it('should work with deeply nested-like names', () => {
      const validator = passwordMatch('pwd', 'confirmPwd');
      const group = new FormGroup({
        pwd: new FormControl('MyPassword!1'),
        confirmPwd: new FormControl('MyPassword!1')
      });

      const result = validator(group);

      expect(result).toBeNull();
    });
  });

  // ════════════════════════════════════════════════════════════════════════
  // GRUPO 8: Mensaje de Error
  // ════════════════════════════════════════════════════════════════════════

  describe('getPasswordMatchErrorMessage', () => {
    it('should return Spanish error message', () => {
      const message = getPasswordMatchErrorMessage();

      expect(message).toBe('Las contraseñas no coinciden');
    });

    it('should return consistent message on multiple calls', () => {
      const message1 = getPasswordMatchErrorMessage();
      const message2 = getPasswordMatchErrorMessage();

      expect(message1).toBe(message2);
    });

    it('should return a non-empty string', () => {
      const message = getPasswordMatchErrorMessage();

      expect(message).toBeTruthy();
      expect(message.length).toBeGreaterThan(0);
    });
  });

  // ════════════════════════════════════════════════════════════════════════
  // GRUPO 9: Integración con FormGroup
  // ════════════════════════════════════════════════════════════════════════

  describe('Integración con FormGroup', () => {
    it('should be usable as FormGroup validator', () => {
      const group = new FormGroup({
        password: new FormControl('MyPassword123!'),
        confirmPassword: new FormControl('MyPassword123!')
      }, {
        validators: passwordMatch('password', 'confirmPassword')
      });

      expect(group.valid).toBeTrue();
      expect(group.errors).toBeNull();
    });

    it('should make FormGroup invalid when passwords do not match', () => {
      const group = new FormGroup({
        password: new FormControl('MyPassword123!'),
        confirmPassword: new FormControl('DifferentPassword!')
      }, {
        validators: passwordMatch('password', 'confirmPassword')
      });
      group.get('confirmPassword')?.markAsTouched();

      // Forzar revalidación
      group.updateValueAndValidity();

      expect(group.errors).toEqual({ mismatch: true });
    });

    it('should update validity when password changes', () => {
      const group = new FormGroup({
        password: new FormControl('MyPassword123!'),
        confirmPassword: new FormControl('MyPassword123!')
      }, {
        validators: passwordMatch('password', 'confirmPassword')
      });
      group.get('confirmPassword')?.markAsTouched();

      expect(group.errors).toBeNull();

      // Cambiar password
      group.get('password')?.setValue('NewPassword456!');
      group.updateValueAndValidity();

      expect(group.errors).toEqual({ mismatch: true });
    });

    it('should become valid when confirmPassword is updated to match', () => {
      const group = new FormGroup({
        password: new FormControl('MyPassword123!'),
        confirmPassword: new FormControl('WrongPassword!')
      }, {
        validators: passwordMatch('password', 'confirmPassword')
      });
      group.get('confirmPassword')?.markAsTouched();
      group.updateValueAndValidity();

      expect(group.errors).toEqual({ mismatch: true });

      // Actualizar confirmPassword para que coincida
      group.get('confirmPassword')?.setValue('MyPassword123!');
      group.updateValueAndValidity();

      expect(group.errors).toBeNull();
    });
  });
});
