/**
 * ============================================================================
 * TESTS EXHAUSTIVOS: Password Strength Validator
 * ============================================================================
 *
 * PROPÓSITO DE ESTOS TESTS:
 * Verificar que el validador de contraseñas fuertes funciona correctamente
 * evaluando todos los requisitos de seguridad:
 * - Longitud mínima (12 caracteres)
 * - Al menos una mayúscula (A-Z)
 * - Al menos una minúscula (a-z)
 * - Al menos un número (0-9)
 * - Al menos un carácter especial (!@#$%^&*(),.?":{}|<>)
 *
 * COBERTURA:
 * - ✅ Casos válidos (contraseñas que cumplen todos los requisitos)
 * - ✅ Casos inválidos por cada requisito individual
 * - ✅ Combinaciones de errores múltiples
 * - ✅ Edge cases (vacío, null, undefined)
 * - ✅ Longitudes límite (11, 12, 13 caracteres)
 * - ✅ Caracteres especiales diversos
 * - ✅ Mensajes de error amigables
 *
 * METODOLOGÍA:
 * Se usa AAA (Arrange-Act-Assert) en cada test:
 * - Arrange: Preparar el control con el valor a testear
 * - Act: Ejecutar el validador
 * - Assert: Verificar el resultado esperado
 *
 * @author Tests exhaustivos para Discs & Records
 * @version 2.0.0
 */

import { FormControl } from '@angular/forms';
import { passwordStrength, getPasswordErrorMessage } from './password-strength.validator';

describe('PasswordStrengthValidator', () => {
  /**
   * GRUPO 1: Tests de Creación e Inicialización
   *
   * Verifican que el validador se crea correctamente y es una función válida
   */
  describe('Creación e Inicialización', () => {
    it('should create a validator function', () => {
      // Arrange & Act
      const validator = passwordStrength();

      // Assert
      expect(validator).toBeDefined();
      expect(typeof validator).toBe('function');
    });

    it('should return a ValidatorFn type', () => {
      // Arrange
      const validator = passwordStrength();
      const control = new FormControl('');

      // Act
      const result = validator(control);

      // Assert - debe retornar null o ValidationErrors
      expect(result === null || typeof result === 'object').toBeTruthy();
    });
  });

  /**
   * GRUPO 2: Tests de Contraseñas Válidas
   *
   * Verifican que contraseñas que cumplen TODOS los requisitos
   * son aceptadas (validador retorna null)
   */
  describe('Contraseñas Válidas (retorna null)', () => {
    it('should accept password with all requirements met - basic', () => {
      // Arrange - contraseña que cumple todos los requisitos
      const validator = passwordStrength();
      const control = new FormControl('MyPassword1!');

      // Act
      const result = validator(control);

      // Assert - null significa válido
      expect(result).toBeNull();
    });

    it('should accept password with exactly 12 characters (mínimo requerido)', () => {
      // Arrange - exactamente en el límite de longitud
      const validator = passwordStrength();
      const control = new FormControl('Abcdefgh12!@'); // 12 caracteres

      // Act
      const result = validator(control);

      // Assert
      expect(result).toBeNull();
    });

    it('should accept password with more than 12 characters', () => {
      // Arrange - por encima del límite
      const validator = passwordStrength();
      const control = new FormControl('MyVeryLongPassword123!@#'); // 24 caracteres

      // Act
      const result = validator(control);

      // Assert
      expect(result).toBeNull();
    });

    it('should accept password with multiple uppercase letters', () => {
      // Arrange
      const validator = passwordStrength();
      const control = new FormControl('ABCDEFGHIJ1!k'); // Múltiples mayúsculas

      // Act
      const result = validator(control);

      // Assert
      expect(result).toBeNull();
    });

    it('should accept password with multiple numbers', () => {
      // Arrange
      const validator = passwordStrength();
      const control = new FormControl('Password12345!'); // Múltiples números

      // Act
      const result = validator(control);

      // Assert
      expect(result).toBeNull();
    });

    it('should accept password with multiple special characters', () => {
      // Arrange
      const validator = passwordStrength();
      const control = new FormControl('Pass!@#$%^1a'); // Múltiples especiales

      // Act
      const result = validator(control);

      // Assert
      expect(result).toBeNull();
    });

    it('should accept complex real-world password', () => {
      // Arrange - contraseña típica que un usuario podría crear
      const validator = passwordStrength();
      const control = new FormControl('MiContraseña2024!Segura');

      // Act
      const result = validator(control);

      // Assert
      expect(result).toBeNull();
    });

    it('should accept password with special characters from the allowed set', () => {
      // Arrange - probar diferentes caracteres especiales válidos
      // NOTA: La contraseña base debe tener 12+ caracteres con mayúscula, minúscula, número y especial
      const specialChars = ['!', '@', '#', '$', '%', '^', '&', '*', '(', ')', ',', '.', '?', '"', ':', '{', '}', '|', '<', '>'];
      const validator = passwordStrength();

      specialChars.forEach(char => {
        // Act - "Abcdefghij1" tiene 11 chars + 1 especial = 12 chars mínimo requerido
        const control = new FormControl(`Abcdefghij1${char}`);
        const result = validator(control);

        // Assert
        expect(result).toBeNull(`Password with special char '${char}' should be valid`);
      });
    });
  });

  /**
   * GRUPO 3: Tests de Contraseñas Inválidas - Sin Mayúsculas
   *
   * Verifican que contraseñas sin letras mayúsculas son rechazadas
   */
  describe('Contraseñas Sin Mayúsculas (error noUppercase)', () => {
    it('should reject password without uppercase letters', () => {
      // Arrange - todo minúsculas
      const validator = passwordStrength();
      const control = new FormControl('mypassword123!');

      // Act
      const result = validator(control);

      // Assert
      expect(result).not.toBeNull();
      expect(result!['noUppercase']).toBeTruthy();
    });

    it('should only have noUppercase error when other requirements met', () => {
      // Arrange - solo falta mayúscula
      const validator = passwordStrength();
      const control = new FormControl('mypassword12!');

      // Act
      const result = validator(control);

      // Assert - verificar que SOLO tiene error de mayúscula
      expect(result!['noUppercase']).toBeTruthy();
      expect(result!['noLowercase']).toBeFalsy();
      expect(result!['noNumber']).toBeFalsy();
      expect(result!['noSpecial']).toBeFalsy();
      // minLength puede estar o no dependiendo de la longitud
    });

    it('should reject password with only numbers and lowercase', () => {
      // Arrange
      const validator = passwordStrength();
      const control = new FormControl('abcdefghij12');

      // Act
      const result = validator(control);

      // Assert
      expect(result!['noUppercase']).toBeTruthy();
      expect(result!['noSpecial']).toBeTruthy();
    });
  });

  /**
   * GRUPO 4: Tests de Contraseñas Inválidas - Sin Minúsculas
   *
   * Verifican que contraseñas sin letras minúsculas son rechazadas
   */
  describe('Contraseñas Sin Minúsculas (error noLowercase)', () => {
    it('should reject password without lowercase letters', () => {
      // Arrange - todo mayúsculas
      const validator = passwordStrength();
      const control = new FormControl('MYPASSWORD123!');

      // Act
      const result = validator(control);

      // Assert
      expect(result).not.toBeNull();
      expect(result!['noLowercase']).toBeTruthy();
    });

    it('should reject uppercase-only with numbers and special', () => {
      // Arrange
      const validator = passwordStrength();
      const control = new FormControl('ABCDEFGH12!@');

      // Act
      const result = validator(control);

      // Assert
      expect(result!['noLowercase']).toBeTruthy();
      expect(result!['noUppercase']).toBeFalsy();
      expect(result!['noNumber']).toBeFalsy();
      expect(result!['noSpecial']).toBeFalsy();
    });
  });

  /**
   * GRUPO 5: Tests de Contraseñas Inválidas - Sin Números
   *
   * Verifican que contraseñas sin dígitos numéricos son rechazadas
   */
  describe('Contraseñas Sin Números (error noNumber)', () => {
    it('should reject password without numbers', () => {
      // Arrange - sin números
      const validator = passwordStrength();
      const control = new FormControl('MyPasswordABC!');

      // Act
      const result = validator(control);

      // Assert
      expect(result).not.toBeNull();
      expect(result!['noNumber']).toBeTruthy();
    });

    it('should reject letter-only password with special', () => {
      // Arrange
      const validator = passwordStrength();
      const control = new FormControl('MyPassword!!');

      // Act
      const result = validator(control);

      // Assert
      expect(result!['noNumber']).toBeTruthy();
    });

    it('should correctly identify missing number even with all other requirements', () => {
      // Arrange - cumple todo excepto número
      const validator = passwordStrength();
      const control = new FormControl('AbCdEfGhIjKl!@');

      // Act
      const result = validator(control);

      // Assert
      expect(result!['noNumber']).toBeTruthy();
      expect(result!['noUppercase']).toBeFalsy();
      expect(result!['noLowercase']).toBeFalsy();
      expect(result!['noSpecial']).toBeFalsy();
    });
  });

  /**
   * GRUPO 6: Tests de Contraseñas Inválidas - Sin Caracteres Especiales
   *
   * Verifican que contraseñas sin caracteres especiales son rechazadas
   */
  describe('Contraseñas Sin Caracteres Especiales (error noSpecial)', () => {
    it('should reject password without special characters', () => {
      // Arrange - sin especiales
      const validator = passwordStrength();
      const control = new FormControl('MyPassword1234');

      // Act
      const result = validator(control);

      // Assert
      expect(result).not.toBeNull();
      expect(result!['noSpecial']).toBeTruthy();
    });

    it('should reject alphanumeric-only password', () => {
      // Arrange
      const validator = passwordStrength();
      const control = new FormControl('Abc123456789');

      // Act
      const result = validator(control);

      // Assert
      expect(result!['noSpecial']).toBeTruthy();
    });

    it('should not consider space as special character', () => {
      // Arrange - espacio NO es un carácter especial válido
      const validator = passwordStrength();
      const control = new FormControl('My Password 1');

      // Act
      const result = validator(control);

      // Assert - espacio no cumple requisito de especial
      expect(result!['noSpecial']).toBeTruthy();
    });

    it('should not consider underscore as special character from the defined set', () => {
      // Arrange - underscore no está en la lista de especiales definidos
      const validator = passwordStrength();
      const control = new FormControl('My_Password_1');

      // Act
      const result = validator(control);

      // Assert - underscore no está en [!@#$%^&*(),.?":{}|<>]
      expect(result!['noSpecial']).toBeTruthy();
    });
  });

  /**
   * GRUPO 7: Tests de Contraseñas Inválidas - Longitud Insuficiente
   *
   * Verifican que contraseñas con menos de 12 caracteres son rechazadas
   */
  describe('Contraseñas con Longitud Insuficiente (error minLength)', () => {
    it('should reject password with 11 characters (just below minimum)', () => {
      // Arrange - un carácter por debajo del mínimo
      const validator = passwordStrength();
      const control = new FormControl('Abcdefgh1!@'); // 11 caracteres

      // Act
      const result = validator(control);

      // Assert
      expect(result).not.toBeNull();
      expect(result!['minLength']).toBeTruthy();
      expect(result!['minLength'].requiredLength).toBe(12);
      expect(result!['minLength'].actualLength).toBe(11);
    });

    it('should reject password with 1 character', () => {
      // Arrange
      const validator = passwordStrength();
      const control = new FormControl('A');

      // Act
      const result = validator(control);

      // Assert
      expect(result!['minLength']).toBeTruthy();
      expect(result!['minLength'].actualLength).toBe(1);
    });

    it('should reject password with 6 characters', () => {
      // Arrange - contraseña típica pero corta
      const validator = passwordStrength();
      const control = new FormControl('Pass1!');

      // Act
      const result = validator(control);

      // Assert
      expect(result!['minLength']).toBeTruthy();
      expect(result!['minLength'].actualLength).toBe(6);
    });

    it('should include correct length info in error object', () => {
      // Arrange
      const validator = passwordStrength();
      const control = new FormControl('Short1!Aa');

      // Act
      const result = validator(control);

      // Assert
      expect(result!['minLength']).toEqual({
        requiredLength: 12,
        actualLength: 9
      });
    });
  });

  /**
   * GRUPO 8: Tests de Errores Múltiples
   *
   * Verifican que el validador detecta múltiples errores simultáneamente
   */
  describe('Errores Múltiples Simultáneos', () => {
    it('should detect all errors in a completely invalid password', () => {
      // Arrange - contraseña que falla en todo
      const validator = passwordStrength();
      const control = new FormControl('abc'); // corta, sin mayúscula, sin número, sin especial

      // Act
      const result = validator(control);

      // Assert
      expect(result!['noUppercase']).toBeTruthy();
      expect(result!['noNumber']).toBeTruthy();
      expect(result!['noSpecial']).toBeTruthy();
      expect(result!['minLength']).toBeTruthy();
    });

    it('should detect two errors: no uppercase and no special', () => {
      // Arrange
      const validator = passwordStrength();
      const control = new FormControl('mypassword12');

      // Act
      const result = validator(control);

      // Assert
      expect(result!['noUppercase']).toBeTruthy();
      expect(result!['noSpecial']).toBeTruthy();
      expect(result!['noLowercase']).toBeFalsy();
      expect(result!['noNumber']).toBeFalsy();
    });

    it('should count number of errors correctly', () => {
      // Arrange - 3 errores
      const validator = passwordStrength();
      const control = new FormControl('ABCDEFGHIJKL'); // sin minúscula, sin número, sin especial

      // Act
      const result = validator(control);
      const errorCount = Object.keys(result!).length;

      // Assert
      expect(errorCount).toBe(3);
    });

    it('should detect minLength along with other errors', () => {
      // Arrange - corta Y sin requisitos
      const validator = passwordStrength();
      const control = new FormControl('abc1'); // 4 chars, sin mayúscula, sin especial

      // Act
      const result = validator(control);

      // Assert
      expect(result!['minLength']).toBeTruthy();
      expect(result!['noUppercase']).toBeTruthy();
      expect(result!['noSpecial']).toBeTruthy();
    });
  });

  /**
   * GRUPO 9: Tests de Edge Cases
   *
   * Verifican comportamiento en casos límite y especiales
   */
  describe('Edge Cases y Casos Especiales', () => {
    it('should return null for empty string (skip validation)', () => {
      // Arrange - string vacío, se espera que skip ya que Validators.required lo maneja
      const validator = passwordStrength();
      const control = new FormControl('');

      // Act
      const result = validator(control);

      // Assert - null porque está vacío y required lo debe manejar
      expect(result).toBeNull();
    });

    it('should return null for null value', () => {
      // Arrange
      const validator = passwordStrength();
      const control = new FormControl(null);

      // Act
      const result = validator(control);

      // Assert
      expect(result).toBeNull();
    });

    it('should return null for undefined value', () => {
      // Arrange
      const validator = passwordStrength();
      const control = new FormControl(undefined);

      // Act
      const result = validator(control);

      // Assert
      expect(result).toBeNull();
    });

    it('should handle password with unicode characters', () => {
      // Arrange - caracteres unicode
      const validator = passwordStrength();
      const control = new FormControl('Contraseña123!');

      // Act
      const result = validator(control);

      // Assert - ñ cuenta como minúscula
      expect(result).toBeNull();
    });

    it('should handle password with emojis (as special chars)', () => {
      // Arrange - emojis
      const validator = passwordStrength();
      const control = new FormControl('Password123🔒');

      // Act
      const result = validator(control);

      // Assert - emoji no está en la lista de especiales definidos
      // Por lo tanto debería fallar en noSpecial
      expect(result!['noSpecial']).toBeTruthy();
    });

    it('should handle very long passwords', () => {
      // Arrange - contraseña muy larga
      const validator = passwordStrength();
      const longPassword = 'A'.repeat(100) + 'a'.repeat(100) + '1!' + '0'.repeat(100);
      const control = new FormControl(longPassword);

      // Act
      const result = validator(control);

      // Assert - debería ser válida
      expect(result).toBeNull();
    });

    it('should handle password with only spaces', () => {
      // Arrange
      const validator = passwordStrength();
      const control = new FormControl('            '); // 12 espacios

      // Act
      const result = validator(control);

      // Assert - espacios no cumplen ningún requisito excepto longitud
      expect(result!['noUppercase']).toBeTruthy();
      expect(result!['noLowercase']).toBeTruthy();
      expect(result!['noNumber']).toBeTruthy();
      expect(result!['noSpecial']).toBeTruthy();
    });
  });

  /**
   * GRUPO 10: Tests de Mensajes de Error
   *
   * Verifican que getPasswordErrorMessage retorna mensajes correctos
   */
  describe('getPasswordErrorMessage Function', () => {
    it('should return correct message for noUppercase error', () => {
      // Act
      const message = getPasswordErrorMessage('noUppercase');

      // Assert
      expect(message).toBe('Debe contener al menos una mayúscula (A-Z)');
    });

    it('should return correct message for noLowercase error', () => {
      // Act
      const message = getPasswordErrorMessage('noLowercase');

      // Assert
      expect(message).toBe('Debe contener al menos una minúscula (a-z)');
    });

    it('should return correct message for noNumber error', () => {
      // Act
      const message = getPasswordErrorMessage('noNumber');

      // Assert
      expect(message).toBe('Debe contener al menos un número (0-9)');
    });

    it('should return correct message for noSpecial error', () => {
      // Act
      const message = getPasswordErrorMessage('noSpecial');

      // Assert
      expect(message).toBe('Debe contener al menos un carácter especial (!@#$%^&*)');
    });

    it('should return correct message for minLength error', () => {
      // Act
      const message = getPasswordErrorMessage('minLength');

      // Assert
      expect(message).toBe('Debe tener al menos 12 caracteres');
    });

    it('should return generic message for unknown error', () => {
      // Act
      const message = getPasswordErrorMessage('unknownError');

      // Assert
      expect(message).toBe('Error en contraseña');
    });

    it('should return generic message for empty string', () => {
      // Act
      const message = getPasswordErrorMessage('');

      // Assert
      expect(message).toBe('Error en contraseña');
    });
  });

  /**
   * GRUPO 11: Tests de Rendimiento
   *
   * Verifican que el validador funciona eficientemente
   */
  describe('Rendimiento', () => {
    it('should validate quickly for normal passwords', () => {
      // Arrange
      const validator = passwordStrength();
      const control = new FormControl('MyPassword123!');

      // Act & Assert - debe completar rápidamente
      const start = performance.now();
      for (let i = 0; i < 1000; i++) {
        validator(control);
      }
      const end = performance.now();

      // 1000 validaciones deberían tomar menos de 100ms
      expect(end - start).toBeLessThan(100);
    });

    it('should handle repeated validations without memory issues', () => {
      // Arrange
      const validator = passwordStrength();

      // Act - muchas validaciones con diferentes valores
      for (let i = 0; i < 100; i++) {
        const control = new FormControl(`Password${i}!Aa`);
        validator(control);
      }

      // Assert - si llegamos aquí sin error, pasó
      expect(true).toBeTruthy();
    });
  });

  /**
   * GRUPO 12: Tests de Integración con FormControl
   *
   * Verifican que el validador funciona correctamente integrado con FormControl
   */
  describe('Integración con FormControl', () => {
    it('should work when assigned to FormControl validators', () => {
      // Arrange
      const control = new FormControl('', [passwordStrength()]);

      // Act
      control.setValue('weakpass');

      // Assert
      expect(control.valid).toBeFalsy();
      expect(control.errors).not.toBeNull();
    });

    it('should make FormControl valid with strong password', () => {
      // Arrange
      const control = new FormControl('', [passwordStrength()]);

      // Act
      control.setValue('StrongPassword1!');

      // Assert
      expect(control.valid).toBeTruthy();
      expect(control.errors).toBeNull();
    });

    it('should update validity when value changes', () => {
      // Arrange
      const control = new FormControl('', [passwordStrength()]);

      // Act 1 - valor inválido
      control.setValue('weak');
      expect(control.valid).toBeFalsy();

      // Act 2 - valor válido
      control.setValue('StrongPassword1!');
      expect(control.valid).toBeTruthy();

      // Act 3 - volver a inválido
      control.setValue('weak');
      expect(control.valid).toBeFalsy();
    });

    it('should work with multiple validators on same control', () => {
      // Arrange
      const control = new FormControl('', [
        passwordStrength(),
        // Simular otro validador que siempre pasa
        () => null
      ]);

      // Act
      control.setValue('weakpass');

      // Assert - debe tener errores del passwordStrength
      expect(control.errors).not.toBeNull();
    });
  });
});
