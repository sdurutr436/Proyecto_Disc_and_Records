import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

/**
 * Validador Cross-Field: Mínimo Total
 * 
 * Valida que el resultado de una operación matemática supere un mínimo.
 * Uso común: garantizar que precio * cantidad >= mínimo
 * 
 * @param minValue - Valor mínimo requerido
 * @param priceField - Nombre del campo con el precio
 * @param quantityField - Nombre del campo con la cantidad
 * 
 * @example
 * ```typescript
 * this.orderForm = this.fb.group({
 *   price: [0, [Validators.required, Validators.min(0)]],
 *   quantity: [1, [Validators.required, Validators.min(1)]]
 * }, {
 *   validators: totalMinimo(100, 'price', 'quantity')
 * });
 * 
 * // Error: { totalMinimo: { min: 100, actual: 50 } }
 * ```
 */
export function totalMinimo(
  minValue: number, 
  priceField: string = 'price', 
  quantityField: string = 'quantity'
): ValidatorFn {
  return (group: AbstractControl): ValidationErrors | null => {
    const priceControl = group.get(priceField);
    const quantityControl = group.get(quantityField);

    // Si alguno no existe o está vacío, skip
    if (!priceControl?.value || !quantityControl?.value) return null;

    const price = parseFloat(priceControl.value);
    const quantity = parseFloat(quantityControl.value);
    const total = price * quantity;

    return total >= minValue 
      ? null 
      : { 
          totalMinimo: { 
            min: minValue, 
            actual: total 
          } 
        };
  };
}

/**
 * Validador Cross-Field: Fecha Mayor
 * 
 * Valida que un campo de fecha sea mayor que otro.
 * Uso común: garantizar que fecha de nacimiento sea anterior a edad mínima
 * 
 * @param controlName - Campo a validar (fecha de nacimiento)
 * @param minAgeField - Campo de comparación (edad mínima)
 * 
 * @example
 * ```typescript
 * this.form = this.fb.group({
 *   birthdate: ['', Validators.required],
 *   minAge: [18]
 * }, {
 *   validators: edadMayor('birthdate', 'minAge')
 * });
 * ```
 */
export function edadMayor(controlName: string, minAgeField: string): ValidatorFn {
  return (group: AbstractControl): ValidationErrors | null => {
    const control = group.get(controlName);
    const minAgeControl = group.get(minAgeField);

    // Si alguno no existe o está vacío, skip
    if (!control?.value || !minAgeControl?.value) return null;

    const birthYear = parseInt(control.value.split('-')[0], 10);
    const currentYear = new Date().getFullYear();
    const age = currentYear - birthYear;
    const minAge = parseInt(minAgeControl.value, 10);

    return age >= minAge 
      ? null 
      : { edadMenor: { minAge, actualAge: age } };
  };
}

/**
 * Validador Cross-Field: Al Menos Uno Requerido
 * 
 * Valida que al menos uno de los campos especificados tenga valor.
 * Uso común: teléfono OR email, inicio OR fin, etc.
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
 * @param startField - Nombre del campo de inicio
 * @param endField - Nombre del campo de fin
 * 
 * @example
 * ```typescript
 * this.eventForm = this.fb.group({
 *   startDate: ['', Validators.required],
 *   endDate: ['', Validators.required]
 * }, {
 *   validators: validDateRange('startDate', 'endDate')
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
    'totalMinimo': `Total mínimo: ${errorObj?.min}€ (actual: ${errorObj?.actual}€)`,
    'edadMenor': `Debe ser mayor de ${errorObj?.minAge} años (actual: ${errorObj?.actualAge} años)`,
    'atLeastOneRequired': `Complete al menos uno de: ${errorObj?.fields?.join(', ')}`,
    'invalidRange': 'La fecha de inicio debe ser anterior a la fecha de fin'
  };
  return messages[error] || 'Error en validación';
}
