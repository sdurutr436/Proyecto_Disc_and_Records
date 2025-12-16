import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

/**
 * Validador Cross-Field: Al Menos Uno Requerido
 *
 * Valida que al menos uno de los campos especificados tenga valor.
 *
 * CASOS DE USO EN DISCO AND RECORDS:
 * - Teléfono OR email (al menos uno de contacto)
 * - Descripción OR notas del álbum
 * - Inicio OR fin de grabación
 *
 * @param fields - Nombres de los campos
 *
 * @example
 * ```typescript
 * this.contactForm = this.fb.group({
 *   phone: [''],
 *   email: ['']
 * }, {
 *   validators: atLeastOneRequired('phone', 'email')
 * });
 *
 * // Error si ambos están vacíos:
 * // { atLeastOneRequired: { fields: ['phone', 'email'] } }
 * ```
 */
export function atLeastOneRequired(...fields: string[]): ValidatorFn {
  return (group: AbstractControl): ValidationErrors | null => {
    const hasOne = fields.some(field => {
      const control = group.get(field);
      return control && control.value && control.value.toString().trim().length > 0;
    });

    return hasOne
      ? null
      : { atLeastOneRequired: { fields } };
  };
}

/**
 * Validador Cross-Field: Rango de Fechas Válido
 *
 * Valida que la fecha de inicio sea anterior a la fecha de fin.
 *
 * CASOS DE USO EN DISCO AND RECORDS:
 * - Rango de años de grabación de un álbum
 * - Periodo de un tour o gira
 * - Rango de fechas de eventos
 *
 * @param startField - Nombre del campo de inicio (año/fecha)
 * @param endField - Nombre del campo de fin (año/fecha)
 *
 * @example
 * ```typescript
 * this.albumForm = this.fb.group({
 *   recordingStartYear: ['2020', Validators.required],
 *   recordingEndYear: ['2021', Validators.required]
 * }, {
 *   validators: validDateRange('recordingStartYear', 'recordingEndYear')
 * });
 * ```
 */
export function validDateRange(startField: string, endField: string): ValidatorFn {
  return (group: AbstractControl): ValidationErrors | null => {
    const startControl = group.get(startField);
    const endControl = group.get(endField);

    // Si alguno no existe o está vacío, skip
    if (!startControl?.value || !endControl?.value) return null;

    const startDate = new Date(startControl.value);
    const endDate = new Date(endControl.value);

    return startDate < endDate
      ? null
      : { invalidRange: true };
  };
}

/**
 * Obtener mensajes amigables para errores cross-field
 */
export function getCrossFieldErrorMessage(error: string, errorObj?: any): string {
  const messages: { [key: string]: string } = {
    'atLeastOneRequired': `Complete al menos uno de: ${errorObj?.fields?.join(', ')}`,
    'invalidRange': 'La fecha de inicio debe ser anterior a la fecha de fin'
  };
  return messages[error] || 'Error en validación';
}
