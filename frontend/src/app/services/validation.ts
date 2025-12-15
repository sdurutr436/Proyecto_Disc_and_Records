import { Injectable } from '@angular/core';

/**
 * Interfaz de resultado de validación
 * Proporciona información detallada sobre el resultado
 */
export interface ValidationResult {
  isValid: boolean;
  errorMessage: string;
}

/**
 * ValidationService - Servicio de Validación de Formularios
 *
 * PROPÓSITO:
 * - Centralizar toda la lógica de validación de formularios
 * - Extraer lógica de negocio fuera de los componentes
 * - Reutilizar validaciones entre diferentes componentes
 * - Mantener las reglas de validación en un solo lugar
 *
 * PATRÓN: SEPARACIÓN DE RESPONSABILIDADES
 *
 * ANTES (Anti-patrón):
 * ```typescript
 * // LoginComponent tiene lógica de validación
 * export class LoginComponent {
 *   validateEmail(email: string): boolean {
 *     const emailRegex = /^[^\s@]+@[^\s@]+\.[a-zA-Z]{2,}$/;
 *     return emailRegex.test(email);
 *   }
 * }
 *
 * // RegisterComponent DUPLICA la misma lógica
 * export class RegisterComponent {
 *   validateEmail(email: string): boolean {
 *     const emailRegex = /^[^\s@]+@[^\s@]+\.[a-zA-Z]{2,}$/;
 *     return emailRegex.test(email);
 *   }
 * }
 * ```
 *
 * DESPUÉS (Patrón correcto):
 * ```typescript
 * // ValidationService centraliza la lógica
 * export class ValidationService {
 *   validateEmail(email: string): ValidationResult {
 *     // Lógica una sola vez
 *   }
 * }
 *
 * // LoginComponent solo presenta
 * export class LoginComponent {
 *   private validationService = inject(ValidationService);
 *
 *   onEmailChange(value: string) {
 *     const result = this.validationService.validateEmail(value);
 *     this.emailError.set(result.isValid);
 *   }
 * }
 * ```
 *
 * VENTAJAS:
 * - DRY (Don't Repeat Yourself) - Sin código duplicado
 * - Single Responsibility - Componente solo presenta, servicio valida
 * - Testable - Fácil de testear validaciones sin componentes
 * - Mantenible - Cambiar una regla actualiza todos los componentes
 */
@Injectable({
  providedIn: 'root',
})
export class ValidationService {

  /**
   * VALIDACIÓN: Email
   *
   * REGLAS DE NEGOCIO:
   * - Debe contener @
   * - Debe tener dominio con al menos .xx (dos letras)
   * - No debe contener espacios
   *
   * @param email - Email a validar
   * @returns ValidationResult con estado y mensaje de error
   *
   * @example
   * ```typescript
   * const result = validationService.validateEmail('user@example.com');
   * if (!result.isValid) {
   *   console.error(result.errorMessage);
   * }
   * ```
   */
  validateEmail(email: string): ValidationResult {
    // Validar campo requerido
    if (!email || email.trim().length === 0) {
      return {
        isValid: false,
        errorMessage: 'El correo electrónico es requerido',
      };
    }

    // Validar formato con regex
    const emailRegex = /^[^\s@]+@[^\s@]+\.[a-zA-Z]{2,}$/;

    if (!emailRegex.test(email)) {
      return {
        isValid: false,
        errorMessage: 'Correo inválido. Debe tener @ y dominio terminado en .xx (ej: .es, .com)',
      };
    }

    return {
      isValid: true,
      errorMessage: '',
    };
  }

  /**
   * VALIDACIÓN: Nombre de usuario
   *
   * REGLAS DE NEGOCIO:
   * - Entre 3 y 20 caracteres
   * - Solo letras, números y guiones bajos
   * - NO se permiten espacios
   *
   * @param username - Nombre de usuario a validar
   * @returns ValidationResult
   */
  validateUsername(username: string): ValidationResult {
    if (!username || username.trim().length === 0) {
      return {
        isValid: false,
        errorMessage: 'El nombre de usuario es requerido',
      };
    }

    // Verificar longitud
    if (username.length < 3 || username.length > 20) {
      return {
        isValid: false,
        errorMessage: 'El nombre de usuario debe tener entre 3 y 20 caracteres',
      };
    }

    // Verificar caracteres permitidos (sin espacios)
    const usernameRegex = /^[a-zA-Z0-9_]{3,20}$/;

    if (!usernameRegex.test(username) || /\s/.test(username)) {
      return {
        isValid: false,
        errorMessage: 'Solo letras, números y guiones bajos, sin espacios',
      };
    }

    return {
      isValid: true,
      errorMessage: '',
    };
  }

  /**
   * VALIDACIÓN: Contraseña
   *
   * REGLAS DE NEGOCIO:
   * - Mínimo 8 caracteres
   * - Al menos una letra mayúscula
   * - Al menos un carácter especial
   *
   * @param password - Contraseña a validar
   * @returns ValidationResult
   */
  validatePassword(password: string): ValidationResult {
    if (!password || password.length === 0) {
      return {
        isValid: false,
        errorMessage: 'La contraseña es requerida',
      };
    }

    // Verificar longitud mínima
    if (password.length < 8) {
      return {
        isValid: false,
        errorMessage: 'La contraseña debe tener al menos 8 caracteres',
      };
    }

    // Verificar mayúscula
    if (!/[A-Z]/.test(password)) {
      return {
        isValid: false,
        errorMessage: 'La contraseña debe contener al menos una mayúscula',
      };
    }

    // Verificar carácter especial
    if (!/[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(password)) {
      return {
        isValid: false,
        errorMessage: 'La contraseña debe contener al menos un carácter especial',
      };
    }

    return {
      isValid: true,
      errorMessage: '',
    };
  }

  /**
   * VALIDACIÓN: Confirmación de contraseña
   *
   * REGLAS DE NEGOCIO:
   * - Debe ser igual a la contraseña original
   * - No puede estar vacía
   *
   * @param password - Contraseña original
   * @param confirmPassword - Confirmación de contraseña
   * @returns ValidationResult
   */
  validatePasswordConfirmation(
    password: string,
    confirmPassword: string
  ): ValidationResult {
    if (!confirmPassword || confirmPassword.length === 0) {
      return {
        isValid: false,
        errorMessage: 'Debe confirmar la contraseña',
      };
    }

    if (password !== confirmPassword) {
      return {
        isValid: false,
        errorMessage: 'Las contraseñas no coinciden',
      };
    }

    return {
      isValid: true,
      errorMessage: '',
    };
  }

  /**
   * VALIDACIÓN: Contraseña con requisitos de fortaleza
   * Proporciona feedback detallado sobre qué falta
   *
   * @param password - Contraseña a validar
   * @returns Objeto con detalles de cada requisito
   */
  getPasswordStrength(password: string): {
    hasMinLength: boolean;
    hasUpperCase: boolean;
    hasLowerCase: boolean;
    hasNumber: boolean;
    hasSpecialChar: boolean;
    score: number; // 0-5
  } {
    return {
      hasMinLength: password.length >= 8,
      hasUpperCase: /[A-Z]/.test(password),
      hasLowerCase: /[a-z]/.test(password),
      hasNumber: /[0-9]/.test(password),
      hasSpecialChar: /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(password),
      score: [
        password.length >= 8,
        /[A-Z]/.test(password),
        /[a-z]/.test(password),
        /[0-9]/.test(password),
        /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(password),
      ].filter(Boolean).length,
    };
  }

  /**
   * VALIDACIÓN: Validar formulario completo de login
   * Valida múltiples campos a la vez
   *
   * @param email - Email del usuario
   * @param password - Contraseña del usuario
   * @returns Objeto con resultados de todas las validaciones
   */
  validateLoginForm(email: string, password: string): {
    isValid: boolean;
    errors: {
      email: ValidationResult;
      password: ValidationResult;
    };
  } {
    const emailResult = this.validateEmail(email);
    const passwordResult = this.validatePassword(password);

    return {
      isValid: emailResult.isValid && passwordResult.isValid,
      errors: {
        email: emailResult,
        password: passwordResult,
      },
    };
  }

  /**
   * VALIDACIÓN: Validar formulario completo de registro
   *
   * @param data - Datos del formulario de registro
   * @returns Objeto con resultados de todas las validaciones
   */
  validateRegisterForm(data: {
    username: string;
    email: string;
    password: string;
    confirmPassword: string;
  }): {
    isValid: boolean;
    errors: {
      username: ValidationResult;
      email: ValidationResult;
      password: ValidationResult;
      confirmPassword: ValidationResult;
    };
  } {
    const usernameResult = this.validateUsername(data.username);
    const emailResult = this.validateEmail(data.email);
    const passwordResult = this.validatePassword(data.password);
    const confirmPasswordResult = this.validatePasswordConfirmation(
      data.password,
      data.confirmPassword
    );

    return {
      isValid:
        usernameResult.isValid &&
        emailResult.isValid &&
        passwordResult.isValid &&
        confirmPasswordResult.isValid,
      errors: {
        username: usernameResult,
        email: emailResult,
        password: passwordResult,
        confirmPassword: confirmPasswordResult,
      },
    };
  }
}
