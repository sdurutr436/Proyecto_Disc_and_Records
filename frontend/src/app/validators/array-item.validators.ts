import { AbstractControl, FormArray, FormGroup, ValidationErrors, ValidatorFn } from '@angular/forms';

/**
 * Validadores de Elementos de Array (FormArray Item Validators)
 *
 * PROPOSITO:
 * Proporcionar validadores especificos para elementos individuales
 * dentro de un FormArray, asi como validaciones a nivel de coleccion.
 *
 * CASOS DE USO:
 * - Lista de direcciones (validar cada direccion individualmente)
 * - Lista de telefonos (validar formato de cada telefono)
 * - Items de factura (validar cantidad y precio de cada linea)
 * - Contactos de emergencia (validar que cada contacto tenga nombre y telefono)
 *
 * ESTRUCTURA:
 * 1. Validadores de coleccion (se aplican al FormArray completo)
 * 2. Validadores de elemento (se aplican a cada FormControl/FormGroup del array)
 * 3. Funciones helper para crear FormGroups con validacion
 */

// =============================================================================
// VALIDADORES DE COLECCION (FormArray level)
// =============================================================================

/**
 * Validador: Minimo de elementos requeridos
 *
 * Valida que el FormArray tenga al menos un numero minimo de elementos.
 *
 * @param min - Numero minimo de elementos requeridos
 * @returns ValidatorFn
 *
 * @example
 * ```typescript
 * // Al menos 1 direccion requerida
 * addresses: this.fb.array([], minArrayLength(1))
 *
 * // Error: { minArrayLength: { required: 1, actual: 0 } }
 * ```
 */
export function minArrayLength(min: number): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const array = control as FormArray;

    if (array.length < min) {
      return {
        minArrayLength: {
          required: min,
          actual: array.length
        }
      };
    }

    return null;
  };
}

/**
 * Validador: Maximo de elementos permitidos
 *
 * Valida que el FormArray no exceda un numero maximo de elementos.
 *
 * @param max - Numero maximo de elementos permitidos
 * @returns ValidatorFn
 *
 * @example
 * ```typescript
 * // Maximo 5 telefonos
 * phones: this.fb.array([], maxArrayLength(5))
 *
 * // Error: { maxArrayLength: { max: 5, actual: 6 } }
 * ```
 */
export function maxArrayLength(max: number): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const array = control as FormArray;

    if (array.length > max) {
      return {
        maxArrayLength: {
          max: max,
          actual: array.length
        }
      };
    }

    return null;
  };
}

/**
 * Validador: Rango de elementos
 *
 * Valida que el FormArray tenga entre min y max elementos.
 *
 * @param min - Numero minimo de elementos
 * @param max - Numero maximo de elementos
 * @returns ValidatorFn
 *
 * @example
 * ```typescript
 * // Entre 1 y 3 direcciones
 * addresses: this.fb.array([], arrayLengthRange(1, 3))
 * ```
 */
export function arrayLengthRange(min: number, max: number): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const array = control as FormArray;

    if (array.length < min) {
      return {
        arrayLengthRange: {
          min,
          max,
          actual: array.length,
          message: `Se requieren al menos ${min} elementos`
        }
      };
    }

    if (array.length > max) {
      return {
        arrayLengthRange: {
          min,
          max,
          actual: array.length,
          message: `Maximo ${max} elementos permitidos`
        }
      };
    }

    return null;
  };
}

/**
 * Validador: Al menos un elemento valido
 *
 * Valida que al menos un elemento del array tenga un valor valido.
 *
 * @returns ValidatorFn
 *
 * @example
 * ```typescript
 * // Al menos un genero debe estar seleccionado
 * genres: this.fb.array([
 *   this.fb.control(''),
 *   this.fb.control('')
 * ], atLeastOneValidItem())
 * ```
 */
export function atLeastOneValidItem(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const array = control as FormArray;

    const hasValidItem = array.controls.some(c => {
      if (c instanceof FormGroup) {
        return c.valid && Object.values(c.value).some(v => v !== '' && v !== null);
      }
      return c.valid && c.value !== '' && c.value !== null;
    });

    return hasValidItem ? null : { atLeastOneValidItem: true };
  };
}

/**
 * Validador: Todos los elementos validos
 *
 * Valida que todos los elementos del array sean validos.
 * Util cuando se quiere un mensaje personalizado a nivel de array.
 *
 * @returns ValidatorFn
 *
 * @example
 * ```typescript
 * phones: this.fb.array([], allItemsValid())
 * ```
 */
export function allItemsValid(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const array = control as FormArray;

    const invalidCount = array.controls.filter(c => c.invalid).length;

    if (invalidCount > 0) {
      return {
        allItemsValid: {
          invalidCount,
          message: `${invalidCount} elemento(s) tienen errores`
        }
      };
    }

    return null;
  };
}

/**
 * Validador: Elementos unicos
 *
 * Valida que no haya elementos duplicados en el array.
 *
 * @param fieldName - Nombre del campo a comparar (para FormGroup) o undefined para FormControl
 * @returns ValidatorFn
 *
 * @example
 * ```typescript
 * // Telefonos unicos
 * phones: this.fb.array([], uniqueItems())
 *
 * // Emails unicos dentro de un FormGroup
 * contacts: this.fb.array([], uniqueItems('email'))
 * ```
 */
export function uniqueItems(fieldName?: string): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const array = control as FormArray;
    const values: any[] = [];
    const duplicates: number[] = [];

    array.controls.forEach((c, index) => {
      let value: any;

      if (fieldName && c instanceof FormGroup) {
        value = c.get(fieldName)?.value;
      } else {
        value = c.value;
      }

      // Ignorar valores vacios
      if (value === '' || value === null || value === undefined) {
        return;
      }

      const normalizedValue = typeof value === 'string' ? value.toLowerCase().trim() : value;

      if (values.includes(normalizedValue)) {
        duplicates.push(index);
      } else {
        values.push(normalizedValue);
      }
    });

    if (duplicates.length > 0) {
      return {
        uniqueItems: {
          duplicateIndices: duplicates,
          message: 'Hay elementos duplicados'
        }
      };
    }

    return null;
  };
}

// =============================================================================
// VALIDADORES DE ELEMENTO (FormGroup dentro de FormArray)
// =============================================================================

/**
 * Validador: Direccion completa
 *
 * Valida que un FormGroup de direccion tenga todos los campos requeridos.
 *
 * @returns ValidatorFn
 *
 * @example
 * ```typescript
 * // Cada direccion debe tener calle, ciudad y codigo postal
 * this.fb.group({
 *   street: [''],
 *   city: [''],
 *   postalCode: ['']
 * }, { validators: completeAddress() })
 * ```
 */
export function completeAddress(): ValidatorFn {
  return (group: AbstractControl): ValidationErrors | null => {
    const formGroup = group as FormGroup;

    const street = formGroup.get('street')?.value?.trim();
    const city = formGroup.get('city')?.value?.trim();
    const postalCode = formGroup.get('postalCode')?.value?.trim();

    const errors: string[] = [];

    if (!street) errors.push('calle');
    if (!city) errors.push('ciudad');
    if (!postalCode) errors.push('codigo postal');

    if (errors.length > 0) {
      return {
        completeAddress: {
          missingFields: errors,
          message: `Faltan: ${errors.join(', ')}`
        }
      };
    }

    return null;
  };
}

/**
 * Validador: Item de factura valido
 *
 * Valida que un item de factura tenga descripcion, cantidad y precio.
 *
 * @returns ValidatorFn
 *
 * @example
 * ```typescript
 * this.fb.group({
 *   description: [''],
 *   quantity: [1],
 *   price: [0]
 * }, { validators: validInvoiceItem() })
 * ```
 */
export function validInvoiceItem(): ValidatorFn {
  return (group: AbstractControl): ValidationErrors | null => {
    const formGroup = group as FormGroup;

    const description = formGroup.get('description')?.value?.trim();
    const quantity = formGroup.get('quantity')?.value;
    const price = formGroup.get('price')?.value;

    const errors: ValidationErrors = {};

    if (!description) {
      errors['missingDescription'] = true;
    }

    if (quantity === null || quantity === undefined || quantity < 1) {
      errors['invalidQuantity'] = { min: 1, actual: quantity };
    }

    if (price === null || price === undefined || price < 0) {
      errors['invalidPrice'] = { min: 0, actual: price };
    }

    return Object.keys(errors).length ? errors : null;
  };
}

/**
 * Validador: Contacto valido
 *
 * Valida que un contacto tenga nombre y al menos un metodo de contacto.
 *
 * @returns ValidatorFn
 *
 * @example
 * ```typescript
 * this.fb.group({
 *   name: [''],
 *   phone: [''],
 *   email: ['']
 * }, { validators: validContact() })
 * ```
 */
export function validContact(): ValidatorFn {
  return (group: AbstractControl): ValidationErrors | null => {
    const formGroup = group as FormGroup;

    const name = formGroup.get('name')?.value?.trim();
    const phone = formGroup.get('phone')?.value?.trim();
    const email = formGroup.get('email')?.value?.trim();

    const errors: ValidationErrors = {};

    if (!name) {
      errors['missingName'] = true;
    }

    if (!phone && !email) {
      errors['missingContactMethod'] = {
        message: 'Se requiere telefono o email'
      };
    }

    return Object.keys(errors).length ? errors : null;
  };
}

// =============================================================================
// HELPERS PARA MENSAJES DE ERROR
// =============================================================================

/**
 * Obtiene mensaje de error para validadores de array
 *
 * @param errorKey - Clave del error
 * @param errorValue - Valor del error
 * @returns Mensaje de error formateado
 */
export function getArrayValidatorErrorMessage(
  errorKey: string,
  errorValue?: any
): string {
  const messages: Record<string, string | ((val: any) => string)> = {
    'minArrayLength': (val) =>
      `Se requieren al menos ${val.required} elemento(s). Actual: ${val.actual}`,
    'maxArrayLength': (val) =>
      `Maximo ${val.max} elemento(s) permitidos. Actual: ${val.actual}`,
    'arrayLengthRange': (val) =>
      val.message || `Se requieren entre ${val.min} y ${val.max} elementos`,
    'atLeastOneValidItem':
      'Al menos un elemento debe tener un valor valido',
    'allItemsValid': (val) =>
      val.message || `${val.invalidCount} elemento(s) tienen errores`,
    'uniqueItems':
      'No se permiten elementos duplicados',
    'completeAddress': (val) =>
      val.message || 'La direccion esta incompleta',
    'missingDescription':
      'La descripcion es requerida',
    'invalidQuantity': (val) =>
      `La cantidad debe ser al menos ${val.min}`,
    'invalidPrice': (val) =>
      `El precio debe ser al menos ${val.min}`,
    'missingName':
      'El nombre es requerido',
    'missingContactMethod':
      'Se requiere al menos un telefono o email'
  };

  const message = messages[errorKey];

  if (typeof message === 'function') {
    return message(errorValue);
  }

  return message || 'Error de validacion';
}
