import { FormControl, FormGroup, FormBuilder, FormArray, Validators } from '@angular/forms';
import {
  minArrayLength,
  maxArrayLength,
  arrayLengthRange,
  atLeastOneValidItem,
  allItemsValid,
  uniqueItems,
  completeAddress,
  validInvoiceItem,
  validContact,
  getArrayValidatorErrorMessage
} from './array-item.validators';

describe('Array Item Validators', () => {
  let fb: FormBuilder;

  beforeEach(() => {
    fb = new FormBuilder();
  });

  // =========================================================================
  // minArrayLength
  // =========================================================================
  describe('minArrayLength()', () => {
    it('should return null when array has minimum elements', () => {
      const array = fb.array([
        fb.control('item1'),
        fb.control('item2')
      ]);

      const validator = minArrayLength(2);
      expect(validator(array)).toBeNull();
    });

    it('should return null when array exceeds minimum', () => {
      const array = fb.array([
        fb.control('item1'),
        fb.control('item2'),
        fb.control('item3')
      ]);

      const validator = minArrayLength(2);
      expect(validator(array)).toBeNull();
    });

    it('should return error when array is below minimum', () => {
      const array = fb.array([
        fb.control('item1')
      ]);

      const validator = minArrayLength(2);
      expect(validator(array)).toEqual({
        minArrayLength: { required: 2, actual: 1 }
      });
    });

    it('should return error for empty array', () => {
      const array = fb.array([]);

      const validator = minArrayLength(1);
      expect(validator(array)).toEqual({
        minArrayLength: { required: 1, actual: 0 }
      });
    });
  });

  // =========================================================================
  // maxArrayLength
  // =========================================================================
  describe('maxArrayLength()', () => {
    it('should return null when array is below max', () => {
      const array = fb.array([
        fb.control('item1'),
        fb.control('item2')
      ]);

      const validator = maxArrayLength(5);
      expect(validator(array)).toBeNull();
    });

    it('should return null when array equals max', () => {
      const array = fb.array([
        fb.control('item1'),
        fb.control('item2'),
        fb.control('item3')
      ]);

      const validator = maxArrayLength(3);
      expect(validator(array)).toBeNull();
    });

    it('should return error when array exceeds max', () => {
      const array = fb.array([
        fb.control('item1'),
        fb.control('item2'),
        fb.control('item3'),
        fb.control('item4')
      ]);

      const validator = maxArrayLength(3);
      expect(validator(array)).toEqual({
        maxArrayLength: { max: 3, actual: 4 }
      });
    });
  });

  // =========================================================================
  // arrayLengthRange
  // =========================================================================
  describe('arrayLengthRange()', () => {
    it('should return null when array is within range', () => {
      const array = fb.array([
        fb.control('item1'),
        fb.control('item2')
      ]);

      const validator = arrayLengthRange(1, 3);
      expect(validator(array)).toBeNull();
    });

    it('should return null when array equals min', () => {
      const array = fb.array([fb.control('item1')]);

      const validator = arrayLengthRange(1, 3);
      expect(validator(array)).toBeNull();
    });

    it('should return null when array equals max', () => {
      const array = fb.array([
        fb.control('item1'),
        fb.control('item2'),
        fb.control('item3')
      ]);

      const validator = arrayLengthRange(1, 3);
      expect(validator(array)).toBeNull();
    });

    it('should return error when array is below min', () => {
      const array = fb.array([]);

      const validator = arrayLengthRange(1, 3);
      expect(validator(array)).toEqual({
        arrayLengthRange: {
          min: 1,
          max: 3,
          actual: 0,
          message: 'Se requieren al menos 1 elementos'
        }
      });
    });

    it('should return error when array exceeds max', () => {
      const array = fb.array([
        fb.control('item1'),
        fb.control('item2'),
        fb.control('item3'),
        fb.control('item4')
      ]);

      const validator = arrayLengthRange(1, 3);
      expect(validator(array)).toEqual({
        arrayLengthRange: {
          min: 1,
          max: 3,
          actual: 4,
          message: 'Maximo 3 elementos permitidos'
        }
      });
    });
  });

  // =========================================================================
  // atLeastOneValidItem
  // =========================================================================
  describe('atLeastOneValidItem()', () => {
    it('should return null when at least one control has value', () => {
      const array = fb.array([
        fb.control(''),
        fb.control('valid value')
      ]);

      const validator = atLeastOneValidItem();
      expect(validator(array)).toBeNull();
    });

    it('should return error when all controls are empty', () => {
      const array = fb.array([
        fb.control(''),
        fb.control('')
      ]);

      const validator = atLeastOneValidItem();
      expect(validator(array)).toEqual({ atLeastOneValidItem: true });
    });

    it('should return error when all controls are null', () => {
      const array = fb.array([
        fb.control(null),
        fb.control(null)
      ]);

      const validator = atLeastOneValidItem();
      expect(validator(array)).toEqual({ atLeastOneValidItem: true });
    });

    it('should work with FormGroups', () => {
      const array = fb.array([
        fb.group({ name: [''] }),
        fb.group({ name: ['John'] })
      ]);

      const validator = atLeastOneValidItem();
      expect(validator(array)).toBeNull();
    });

    it('should return error when all FormGroups are empty', () => {
      const array = fb.array([
        fb.group({ name: [''], email: [''] }),
        fb.group({ name: [''], email: [''] })
      ]);

      const validator = atLeastOneValidItem();
      expect(validator(array)).toEqual({ atLeastOneValidItem: true });
    });
  });

  // =========================================================================
  // allItemsValid
  // =========================================================================
  describe('allItemsValid()', () => {
    it('should return null when all items are valid', () => {
      const array = fb.array([
        fb.control('value1'),
        fb.control('value2')
      ]);

      const validator = allItemsValid();
      expect(validator(array)).toBeNull();
    });

    it('should return error when some items are invalid', () => {
      const array = fb.array([
        fb.control('valid', [Validators.required]),
        fb.control('', [Validators.required])
      ]);

      const validator = allItemsValid();
      expect(validator(array)).toEqual({
        allItemsValid: {
          invalidCount: 1,
          message: '1 elemento(s) tienen errores'
        }
      });
    });

    it('should count multiple invalid items', () => {
      const array = fb.array([
        fb.control('', [Validators.required]),
        fb.control('', [Validators.required]),
        fb.control('valid', [Validators.required])
      ]);

      const validator = allItemsValid();
      expect(validator(array)).toEqual({
        allItemsValid: {
          invalidCount: 2,
          message: '2 elemento(s) tienen errores'
        }
      });
    });
  });

  // =========================================================================
  // uniqueItems
  // =========================================================================
  describe('uniqueItems()', () => {
    it('should return null when all items are unique', () => {
      const array = fb.array([
        fb.control('item1'),
        fb.control('item2'),
        fb.control('item3')
      ]);

      const validator = uniqueItems();
      expect(validator(array)).toBeNull();
    });

    it('should return error when items are duplicated', () => {
      const array = fb.array([
        fb.control('item1'),
        fb.control('item1')
      ]);

      const validator = uniqueItems();
      expect(validator(array)).toEqual({
        uniqueItems: {
          duplicateIndices: [1],
          message: 'Hay elementos duplicados'
        }
      });
    });

    it('should be case insensitive', () => {
      const array = fb.array([
        fb.control('Item'),
        fb.control('ITEM')
      ]);

      const validator = uniqueItems();
      expect(validator(array)).toEqual({
        uniqueItems: {
          duplicateIndices: [1],
          message: 'Hay elementos duplicados'
        }
      });
    });

    it('should ignore empty values', () => {
      const array = fb.array([
        fb.control(''),
        fb.control(''),
        fb.control('item1')
      ]);

      const validator = uniqueItems();
      expect(validator(array)).toBeNull();
    });

    it('should work with fieldName for FormGroups', () => {
      const array = fb.array([
        fb.group({ email: ['a@test.com'] }),
        fb.group({ email: ['b@test.com'] })
      ]);

      const validator = uniqueItems('email');
      expect(validator(array)).toBeNull();
    });

    it('should detect duplicates in FormGroups', () => {
      const array = fb.array([
        fb.group({ email: ['a@test.com'] }),
        fb.group({ email: ['a@test.com'] })
      ]);

      const validator = uniqueItems('email');
      expect(validator(array)).toEqual({
        uniqueItems: {
          duplicateIndices: [1],
          message: 'Hay elementos duplicados'
        }
      });
    });

    it('should handle null values', () => {
      const array = fb.array([
        fb.control(null),
        fb.control(null),
        fb.control('item')
      ]);

      const validator = uniqueItems();
      expect(validator(array)).toBeNull();
    });
  });

  // =========================================================================
  // completeAddress
  // =========================================================================
  describe('completeAddress()', () => {
    it('should return null for complete address', () => {
      const group = fb.group({
        street: ['123 Main St'],
        city: ['Madrid'],
        postalCode: ['28001']
      });

      const validator = completeAddress();
      expect(validator(group)).toBeNull();
    });

    it('should return error for missing street', () => {
      const group = fb.group({
        street: [''],
        city: ['Madrid'],
        postalCode: ['28001']
      });

      const validator = completeAddress();
      const result = validator(group);
      expect(result?.['completeAddress']?.['missingFields']).toContain('calle');
    });

    it('should return error for missing city', () => {
      const group = fb.group({
        street: ['123 Main St'],
        city: [''],
        postalCode: ['28001']
      });

      const validator = completeAddress();
      const result = validator(group);
      expect(result?.['completeAddress']?.['missingFields']).toContain('ciudad');
    });

    it('should return error for missing postal code', () => {
      const group = fb.group({
        street: ['123 Main St'],
        city: ['Madrid'],
        postalCode: ['']
      });

      const validator = completeAddress();
      const result = validator(group);
      expect(result?.['completeAddress']?.['missingFields']).toContain('codigo postal');
    });

    it('should list all missing fields', () => {
      const group = fb.group({
        street: [''],
        city: [''],
        postalCode: ['']
      });

      const validator = completeAddress();
      const result = validator(group);
      expect(result?.['completeAddress']?.['missingFields']).toEqual(['calle', 'ciudad', 'codigo postal']);
    });
  });

  // =========================================================================
  // validInvoiceItem
  // =========================================================================
  describe('validInvoiceItem()', () => {
    it('should return null for valid invoice item', () => {
      const group = fb.group({
        description: ['Product A'],
        quantity: [2],
        price: [10.50]
      });

      const validator = validInvoiceItem();
      expect(validator(group)).toBeNull();
    });

    it('should return error for missing description', () => {
      const group = fb.group({
        description: [''],
        quantity: [2],
        price: [10.50]
      });

      const validator = validInvoiceItem();
      expect(validator(group)?.['missingDescription']).toBeTrue();
    });

    it('should return error for invalid quantity', () => {
      const group = fb.group({
        description: ['Product A'],
        quantity: [0],
        price: [10.50]
      });

      const validator = validInvoiceItem();
      expect(validator(group)?.['invalidQuantity']).toEqual({ min: 1, actual: 0 });
    });

    it('should return error for negative quantity', () => {
      const group = fb.group({
        description: ['Product A'],
        quantity: [-1],
        price: [10.50]
      });

      const validator = validInvoiceItem();
      expect(validator(group)?.['invalidQuantity']).toEqual({ min: 1, actual: -1 });
    });

    it('should return error for negative price', () => {
      const group = fb.group({
        description: ['Product A'],
        quantity: [2],
        price: [-5]
      });

      const validator = validInvoiceItem();
      expect(validator(group)?.['invalidPrice']).toEqual({ min: 0, actual: -5 });
    });

    it('should allow zero price', () => {
      const group = fb.group({
        description: ['Free Item'],
        quantity: [1],
        price: [0]
      });

      const validator = validInvoiceItem();
      expect(validator(group)).toBeNull();
    });
  });

  // =========================================================================
  // validContact
  // =========================================================================
  describe('validContact()', () => {
    it('should return null for contact with name and phone', () => {
      const group = fb.group({
        name: ['John Doe'],
        phone: ['612345678'],
        email: ['']
      });

      const validator = validContact();
      expect(validator(group)).toBeNull();
    });

    it('should return null for contact with name and email', () => {
      const group = fb.group({
        name: ['John Doe'],
        phone: [''],
        email: ['john@example.com']
      });

      const validator = validContact();
      expect(validator(group)).toBeNull();
    });

    it('should return null for contact with all fields', () => {
      const group = fb.group({
        name: ['John Doe'],
        phone: ['612345678'],
        email: ['john@example.com']
      });

      const validator = validContact();
      expect(validator(group)).toBeNull();
    });

    it('should return error for missing name', () => {
      const group = fb.group({
        name: [''],
        phone: ['612345678'],
        email: ['']
      });

      const validator = validContact();
      expect(validator(group)?.['missingName']).toBeTrue();
    });

    it('should return error for missing contact method', () => {
      const group = fb.group({
        name: ['John Doe'],
        phone: [''],
        email: ['']
      });

      const validator = validContact();
      expect(validator(group)?.['missingContactMethod']).toEqual({
        message: 'Se requiere telefono o email'
      });
    });

    it('should return multiple errors', () => {
      const group = fb.group({
        name: [''],
        phone: [''],
        email: ['']
      });

      const validator = validContact();
      const result = validator(group);
      expect(result?.['missingName']).toBeTrue();
      expect(result?.['missingContactMethod']).toBeTruthy();
    });
  });

  // =========================================================================
  // getArrayValidatorErrorMessage
  // =========================================================================
  describe('getArrayValidatorErrorMessage()', () => {
    it('should return message for minArrayLength', () => {
      const message = getArrayValidatorErrorMessage('minArrayLength', { required: 2, actual: 1 });
      expect(message).toBe('Se requieren al menos 2 elemento(s). Actual: 1');
    });

    it('should return message for maxArrayLength', () => {
      const message = getArrayValidatorErrorMessage('maxArrayLength', { max: 3, actual: 5 });
      expect(message).toBe('Maximo 3 elemento(s) permitidos. Actual: 5');
    });

    it('should return message for arrayLengthRange', () => {
      const message = getArrayValidatorErrorMessage('arrayLengthRange', { min: 1, max: 3, message: 'Custom msg' });
      expect(message).toBe('Custom msg');
    });

    it('should return message for atLeastOneValidItem', () => {
      const message = getArrayValidatorErrorMessage('atLeastOneValidItem');
      expect(message).toBe('Al menos un elemento debe tener un valor valido');
    });

    it('should return message for allItemsValid', () => {
      const message = getArrayValidatorErrorMessage('allItemsValid', { invalidCount: 2, message: '2 elemento(s) tienen errores' });
      expect(message).toBe('2 elemento(s) tienen errores');
    });

    it('should return message for uniqueItems', () => {
      const message = getArrayValidatorErrorMessage('uniqueItems');
      expect(message).toBe('No se permiten elementos duplicados');
    });

    it('should return message for completeAddress', () => {
      const message = getArrayValidatorErrorMessage('completeAddress', { message: 'Faltan: calle' });
      expect(message).toBe('Faltan: calle');
    });

    it('should return message for missingDescription', () => {
      const message = getArrayValidatorErrorMessage('missingDescription');
      expect(message).toBe('La descripcion es requerida');
    });

    it('should return message for invalidQuantity', () => {
      const message = getArrayValidatorErrorMessage('invalidQuantity', { min: 1 });
      expect(message).toBe('La cantidad debe ser al menos 1');
    });

    it('should return message for invalidPrice', () => {
      const message = getArrayValidatorErrorMessage('invalidPrice', { min: 0 });
      expect(message).toBe('El precio debe ser al menos 0');
    });

    it('should return message for missingName', () => {
      const message = getArrayValidatorErrorMessage('missingName');
      expect(message).toBe('El nombre es requerido');
    });

    it('should return message for missingContactMethod', () => {
      const message = getArrayValidatorErrorMessage('missingContactMethod');
      expect(message).toBe('Se requiere al menos un telefono o email');
    });

    it('should return default message for unknown error', () => {
      const message = getArrayValidatorErrorMessage('unknownError');
      expect(message).toBe('Error de validacion');
    });
  });
});
