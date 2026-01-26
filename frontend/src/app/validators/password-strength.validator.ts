import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

/**
 * Validador: Contraseña Fuerte
 *
 * REQUISITOS:
 * - Mínimo 12 caracteres
 * - Al menos una mayúscula
 * - Al menos una minúscula
 * - Al menos un número
 * - Al menos un carácter especial
 *
 * RETORNA:
 * - null: contraseña válida
 * - { noUppercase: true, noLowercase: true, ... }: errores específicos
 *
 * @example
 * ```typescript
 * password: ['', [Validators.required, passwordStrength()]]
 * ```
 */
export function passwordStrength(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const value = control.value;

    // Si está vacío, skip (Validators.required lo maneja)
    if (!value) return null;

    const hasUpperCase = /[A-Z]/.test(value);
    const hasLowerCase = /[a-z]/.test(value);
    const hasNumber = /\d/.test(value);
    // Lista ampliada de caracteres especiales: ! @ # $ % ^ & * ( ) - _ = + [ ] { } | ; : ' " , . < > ? / ` ~
    const hasSpecialChar = /[!@#$%^&*()\-_=+\[\]{}|;:'",.<>?\/`~]/.test(value);
    const minLength = value.length >= 12;

    const errors: ValidationErrors = {};

    if (!hasUpperCase) errors['noUppercase'] = true;
    if (!hasLowerCase) errors['noLowercase'] = true;
    if (!hasNumber) errors['noNumber'] = true;
    if (!hasSpecialChar) errors['noSpecial'] = true;
    if (!minLength) errors['minLength'] = { requiredLength: 12, actualLength: value.length };

    return Object.keys(errors).length ? errors : null;
  };
}

/**
 * Obtener mensaje amigable para errores de contraseña
 *
 * @param error - Clave del error
 * @returns Mensaje en español
 */
export function getPasswordErrorMessage(error: string): string {
  const messages: { [key: string]: string } = {
    'noUppercase': 'Debe contener al menos una mayúscula (A-Z)',
    'noLowercase': 'Debe contener al menos una minúscula (a-z)',
    'noNumber': 'Debe contener al menos un número (0-9)',
    'noSpecial': 'Debe contener al menos un carácter especial (!@#$%^&*()-_=+[]{}|;:,./<>?`~)',
    'minLength': 'Debe tener al menos 12 caracteres'
  };
  return messages[error] || 'Error en contraseña';
}
