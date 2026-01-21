import { FormControl, FormGroup, FormBuilder } from '@angular/forms';
import { nif, telefono, codigoPostal, getFormatErrorMessage } from './spanish-formats.validator';

describe('Spanish Format Validators', () => {
  // =========================================================================
  // NIF Validator
  // =========================================================================
  describe('nif()', () => {
    const validator = nif();

    it('should return null for empty value', () => {
      const control = new FormControl('');
      expect(validator(control)).toBeNull();
    });

    it('should return null for null value', () => {
      const control = new FormControl(null);
      expect(validator(control)).toBeNull();
    });

    // NIFs válidos calculados con el algoritmo:
    // 00000000 % 23 = 0 → T
    // 00000001 % 23 = 1 → R
    it('should return null for valid NIF 00000000T', () => {
      const control = new FormControl('00000000T');
      expect(validator(control)).toBeNull();
    });

    it('should return null for valid NIF lowercase 00000001r', () => {
      const control = new FormControl('00000001r');
      expect(validator(control)).toBeNull();
    });

    it('should return null for valid NIF with spaces', () => {
      const control = new FormControl('  00000000T  ');
      expect(validator(control)).toBeNull();
    });

    it('should return error for invalid NIF format (no letter)', () => {
      const control = new FormControl('12345678');
      expect(validator(control)).toEqual({ invalidNif: true });
    });

    it('should return error for invalid NIF format (too short)', () => {
      const control = new FormControl('1234567Z');
      expect(validator(control)).toEqual({ invalidNif: true });
    });

    it('should return error for invalid NIF format (too long)', () => {
      const control = new FormControl('123456789Z');
      expect(validator(control)).toEqual({ invalidNif: true });
    });

    it('should return error for invalid NIF letter', () => {
      const control = new FormControl('12345678A');
      // La letra correcta para 12345678 no es A
      expect(validator(control)).toEqual({ invalidNif: true });
    });

    it('should return null for NIF 00000023T (23 % 23 = 0 -> T)', () => {
      const control = new FormControl('00000023T');
      expect(validator(control)).toBeNull();
    });

    it('should return null for NIF 00000001R (1 % 23 = 1 -> R)', () => {
      const control = new FormControl('00000001R');
      expect(validator(control)).toBeNull();
    });

    it('should return error for invalid characters', () => {
      const control = new FormControl('1234567XZ');
      expect(validator(control)).toEqual({ invalidNif: true });
    });

    it('should return error for alphabetic input', () => {
      const control = new FormControl('ABCDEFGHZ');
      expect(validator(control)).toEqual({ invalidNif: true });
    });
  });

  // =========================================================================
  // Telefono Validator
  // =========================================================================
  describe('telefono()', () => {
    const validator = telefono();

    it('should return null for empty value', () => {
      const control = new FormControl('');
      expect(validator(control)).toBeNull();
    });

    it('should return null for null value', () => {
      const control = new FormControl(null);
      expect(validator(control)).toBeNull();
    });

    it('should return null for valid mobile starting with 6', () => {
      const control = new FormControl('612345678');
      expect(validator(control)).toBeNull();
    });

    it('should return null for valid mobile starting with 7', () => {
      const control = new FormControl('712345678');
      expect(validator(control)).toBeNull();
    });

    it('should return error for landline starting with 9', () => {
      const control = new FormControl('912345678');
      expect(validator(control)).toEqual({ invalidTelefono: true });
    });

    it('should return error for number starting with 8', () => {
      const control = new FormControl('812345678');
      expect(validator(control)).toEqual({ invalidTelefono: true });
    });

    it('should return error for too short number', () => {
      const control = new FormControl('61234567');
      expect(validator(control)).toEqual({ invalidTelefono: true });
    });

    it('should return error for too long number', () => {
      const control = new FormControl('6123456789');
      expect(validator(control)).toEqual({ invalidTelefono: true });
    });

    it('should return error for number with letters', () => {
      const control = new FormControl('6123456AB');
      expect(validator(control)).toEqual({ invalidTelefono: true });
    });

    it('should return error for number with spaces', () => {
      const control = new FormControl('612 345 678');
      expect(validator(control)).toEqual({ invalidTelefono: true });
    });

    it('should return error for number with dashes', () => {
      const control = new FormControl('612-345-678');
      expect(validator(control)).toEqual({ invalidTelefono: true });
    });

    it('should return null for 600000000', () => {
      const control = new FormControl('600000000');
      expect(validator(control)).toBeNull();
    });

    it('should return null for 799999999', () => {
      const control = new FormControl('799999999');
      expect(validator(control)).toBeNull();
    });
  });

  // =========================================================================
  // Codigo Postal Validator
  // =========================================================================
  describe('codigoPostal()', () => {
    const validator = codigoPostal();

    it('should return null for empty value', () => {
      const control = new FormControl('');
      expect(validator(control)).toBeNull();
    });

    it('should return null for null value', () => {
      const control = new FormControl(null);
      expect(validator(control)).toBeNull();
    });

    it('should return null for valid CP 28001 (Madrid)', () => {
      const control = new FormControl('28001');
      expect(validator(control)).toBeNull();
    });

    it('should return null for valid CP 08001 (Barcelona)', () => {
      const control = new FormControl('08001');
      expect(validator(control)).toBeNull();
    });

    it('should return null for valid CP 41001 (Sevilla)', () => {
      const control = new FormControl('41001');
      expect(validator(control)).toBeNull();
    });

    it('should return null for valid CP 52999 (Melilla max)', () => {
      const control = new FormControl('52999');
      expect(validator(control)).toBeNull();
    });

    it('should return null for valid CP 00001', () => {
      const control = new FormControl('00001');
      expect(validator(control)).toBeNull();
    });

    it('should return error for CP > 52999', () => {
      const control = new FormControl('53000');
      expect(validator(control)).toEqual({ invalidCP: true });
    });

    it('should return error for CP > 99999', () => {
      const control = new FormControl('99999');
      expect(validator(control)).toEqual({ invalidCP: true });
    });

    it('should return error for too short CP', () => {
      const control = new FormControl('2800');
      expect(validator(control)).toEqual({ invalidCP: true });
    });

    it('should return error for too long CP', () => {
      const control = new FormControl('280001');
      expect(validator(control)).toEqual({ invalidCP: true });
    });

    it('should return error for CP with letters', () => {
      const control = new FormControl('2800A');
      expect(validator(control)).toEqual({ invalidCP: true });
    });

    it('should return error for CP with spaces', () => {
      const control = new FormControl('28 001');
      expect(validator(control)).toEqual({ invalidCP: true });
    });
  });

  // =========================================================================
  // getFormatErrorMessage
  // =========================================================================
  describe('getFormatErrorMessage()', () => {
    it('should return correct message for invalidNif', () => {
      const message = getFormatErrorMessage('invalidNif');
      expect(message).toBe('NIF inválido. Formato: 12345678Z');
    });

    it('should return correct message for invalidTelefono', () => {
      const message = getFormatErrorMessage('invalidTelefono');
      expect(message).toBe('Teléfono inválido. Formato: 6XX XXX XXX o 7XX XXX XXX');
    });

    it('should return correct message for invalidCP', () => {
      const message = getFormatErrorMessage('invalidCP');
      expect(message).toBe('Código postal inválido. Debe ser 5 dígitos (ej: 28001)');
    });

    it('should return default message for unknown error', () => {
      const message = getFormatErrorMessage('unknownError');
      expect(message).toBe('Formato inválido');
    });
  });

  // =========================================================================
  // Integration Tests
  // =========================================================================
  describe('Integration with FormGroup', () => {
    let fb: FormBuilder;

    beforeEach(() => {
      fb = new FormBuilder();
    });

    it('should validate form with all Spanish validators', () => {
      const form = fb.group({
        nif: ['00000000T', [nif()]],
        telefono: ['612345678', [telefono()]],
        codigoPostal: ['28001', [codigoPostal()]]
      });

      expect(form.valid).toBeTrue();
      expect(form.get('nif')?.errors).toBeNull();
      expect(form.get('telefono')?.errors).toBeNull();
      expect(form.get('codigoPostal')?.errors).toBeNull();
    });

    it('should detect invalid values in form', () => {
      const form = fb.group({
        nif: ['12345678A', [nif()]],
        telefono: ['912345678', [telefono()]],
        codigoPostal: ['99999', [codigoPostal()]]
      });

      expect(form.valid).toBeFalse();
      expect(form.get('nif')?.errors).toEqual({ invalidNif: true });
      expect(form.get('telefono')?.errors).toEqual({ invalidTelefono: true });
      expect(form.get('codigoPostal')?.errors).toEqual({ invalidCP: true });
    });
  });
});
