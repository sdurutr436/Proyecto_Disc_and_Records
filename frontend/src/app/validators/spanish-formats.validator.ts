import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

/**
 * Validador: NIF/DNI Español
 * 
 * Valida el formato y la letra de control de un NIF/DNI español.
 * 
 * FORMATO VÁLIDO: 12345678A (8 dígitos + 1 letra)
 * 
 * ALGORITMO:
 * 1. Validar patrón (8 dígitos + 1 letra)
 * 2. Calcular: número % 23
 * 3. Verificar que la letra corresponda al algoritmo mod 23
 * 
 * @example
 * ```typescript
 * nif: ['', [Validators.required, nif()]]
 * ```
 */
export function nif(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const value = control.value;
    
    // Si está vacío, skip
    if (!value) return null;

    const nifUpper = value.toUpperCase().trim();
    
    // Validar formato: 8 dígitos + 1 letra
    const nifRegex = /^[0-9]{8}[TRWAGMYFPDXBCSQVJHZTKB]$/;
    if (!nifRegex.test(nifUpper)) {
      return { invalidNif: true };
    }

    // Validar letra de control
    const letters = 'TRWAGMYFPDXBCSQVJHZTKB';
    const position = parseInt(nifUpper.substring(0, 8), 10) % 23;
    const expectedLetter = letters[position];
    const actualLetter = nifUpper[8];

    return expectedLetter === actualLetter 
      ? null 
      : { invalidNif: true };
  };
}

/**
 * Validador: Teléfono Móvil Español
 * 
 * Valida números de teléfono móvil españoles.
 * 
 * FORMATO VÁLIDO: 6XXXXXXXX o 7XXXXXXXX (9 dígitos comenzando con 6 o 7)
 * - 6XXXXXXXX: números móviles
 * - 7XXXXXXXX: números antiguos de telefonía móvil
 * 
 * @example
 * ```typescript
 * telefono: ['', [telefono()]]
 * ```
 */
export function telefono(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const value = control.value;
    
    // Si está vacío, skip
    if (!value) return null;

    // Validar formato: 9 dígitos comenzando con 6 o 7
    const telefonoRegex = /^[67][0-9]{8}$/;
    
    return telefonoRegex.test(value) 
      ? null 
      : { invalidTelefono: true };
  };
}

/**
 * Validador: Código Postal Español
 * 
 * Valida códigos postales españoles de 5 dígitos.
 * 
 * FORMATO VÁLIDO: 5 dígitos (00000-52999)
 * - Rango: 01000-52999 (códigos válidos según provincias)
 * 
 * @example
 * ```typescript
 * codigoPostal: ['', [codigoPostal()]]
 * ```
 */
export function codigoPostal(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const value = control.value;
    
    // Si está vacío, skip
    if (!value) return null;

    // Validar formato: exactamente 5 dígitos
    const cpRegex = /^\d{5}$/;
    if (!cpRegex.test(value)) {
      return { invalidCP: true };
    }

    // Validar rango (códigos españoles válidos)
    const numCP = parseInt(value, 10);
    if (numCP > 52999) {
      return { invalidCP: true };
    }

    return null;
  };
}

/**
 * Obtener mensajes amigables para errores de formato
 */
export function getFormatErrorMessage(error: string): string {
  const messages: { [key: string]: string } = {
    'invalidNif': 'NIF inválido. Formato: 12345678Z',
    'invalidTelefono': 'Teléfono inválido. Formato: 6XX XXX XXX o 7XX XXX XXX',
    'invalidCP': 'Código postal inválido. Debe ser 5 dígitos (ej: 28001)'
  };
  return messages[error] || 'Formato inválido';
}
