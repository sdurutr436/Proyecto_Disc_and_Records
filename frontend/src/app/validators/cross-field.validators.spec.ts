import { FormControl, FormGroup, FormBuilder } from '@angular/forms';
import { atLeastOneRequired, validDateRange, getCrossFieldErrorMessage } from './cross-field.validators';

describe('Cross-Field Validators', () => {
  let fb: FormBuilder;

  beforeEach(() => {
    fb = new FormBuilder();
  });

  // =========================================================================
  // atLeastOneRequired
  // =========================================================================
  describe('atLeastOneRequired()', () => {
    it('should return null when first field has value', () => {
      const group = fb.group({
        phone: ['612345678'],
        email: ['']
      });

      const validator = atLeastOneRequired('phone', 'email');
      expect(validator(group)).toBeNull();
    });

    it('should return null when second field has value', () => {
      const group = fb.group({
        phone: [''],
        email: ['test@example.com']
      });

      const validator = atLeastOneRequired('phone', 'email');
      expect(validator(group)).toBeNull();
    });

    it('should return null when both fields have values', () => {
      const group = fb.group({
        phone: ['612345678'],
        email: ['test@example.com']
      });

      const validator = atLeastOneRequired('phone', 'email');
      expect(validator(group)).toBeNull();
    });

    it('should return error when both fields are empty', () => {
      const group = fb.group({
        phone: [''],
        email: ['']
      });

      const validator = atLeastOneRequired('phone', 'email');
      expect(validator(group)).toEqual({
        atLeastOneRequired: { fields: ['phone', 'email'] }
      });
    });

    it('should return error when both fields are whitespace only', () => {
      const group = fb.group({
        phone: ['   '],
        email: ['  ']
      });

      const validator = atLeastOneRequired('phone', 'email');
      expect(validator(group)).toEqual({
        atLeastOneRequired: { fields: ['phone', 'email'] }
      });
    });

    it('should work with three fields', () => {
      const group = fb.group({
        phone: [''],
        email: [''],
        fax: ['']
      });

      const validator = atLeastOneRequired('phone', 'email', 'fax');
      expect(validator(group)).toEqual({
        atLeastOneRequired: { fields: ['phone', 'email', 'fax'] }
      });
    });

    it('should return null when one of three fields has value', () => {
      const group = fb.group({
        phone: [''],
        email: [''],
        fax: ['123456789']
      });

      const validator = atLeastOneRequired('phone', 'email', 'fax');
      expect(validator(group)).toBeNull();
    });

    it('should handle missing fields gracefully', () => {
      const group = fb.group({
        phone: ['']
      });

      const validator = atLeastOneRequired('phone', 'nonexistent');
      expect(validator(group)).toEqual({
        atLeastOneRequired: { fields: ['phone', 'nonexistent'] }
      });
    });

    it('should work with numeric values (non-zero)', () => {
      const group = fb.group({
        count: [1],
        total: ['']
      });

      const validator = atLeastOneRequired('count', 'total');
      expect(validator(group)).toBeNull();
    });

    it('should treat 0 as falsy value', () => {
      const group = fb.group({
        count: [0],
        total: ['']
      });

      const validator = atLeastOneRequired('count', 'total');
      // 0 is falsy in JavaScript, so the validator treats it as empty
      expect(validator(group)).toEqual({
        atLeastOneRequired: { fields: ['count', 'total'] }
      });
    });
  });

  // =========================================================================
  // validDateRange
  // =========================================================================
  describe('validDateRange()', () => {
    it('should return null when start date is before end date', () => {
      const group = fb.group({
        startDate: ['2020-01-01'],
        endDate: ['2021-01-01']
      });

      const validator = validDateRange('startDate', 'endDate');
      expect(validator(group)).toBeNull();
    });

    it('should return error when start date is after end date', () => {
      const group = fb.group({
        startDate: ['2022-01-01'],
        endDate: ['2021-01-01']
      });

      const validator = validDateRange('startDate', 'endDate');
      expect(validator(group)).toEqual({ invalidRange: true });
    });

    it('should return error when start date equals end date', () => {
      const group = fb.group({
        startDate: ['2021-01-01'],
        endDate: ['2021-01-01']
      });

      const validator = validDateRange('startDate', 'endDate');
      expect(validator(group)).toEqual({ invalidRange: true });
    });

    it('should return null when start date is empty', () => {
      const group = fb.group({
        startDate: [''],
        endDate: ['2021-01-01']
      });

      const validator = validDateRange('startDate', 'endDate');
      expect(validator(group)).toBeNull();
    });

    it('should return null when end date is empty', () => {
      const group = fb.group({
        startDate: ['2020-01-01'],
        endDate: ['']
      });

      const validator = validDateRange('startDate', 'endDate');
      expect(validator(group)).toBeNull();
    });

    it('should return null when both dates are empty', () => {
      const group = fb.group({
        startDate: [''],
        endDate: ['']
      });

      const validator = validDateRange('startDate', 'endDate');
      expect(validator(group)).toBeNull();
    });

    it('should work with year values', () => {
      const group = fb.group({
        startYear: ['2020'],
        endYear: ['2021']
      });

      const validator = validDateRange('startYear', 'endYear');
      expect(validator(group)).toBeNull();
    });

    it('should return error with invalid year range', () => {
      const group = fb.group({
        startYear: ['2022'],
        endYear: ['2020']
      });

      const validator = validDateRange('startYear', 'endYear');
      expect(validator(group)).toEqual({ invalidRange: true });
    });

    it('should work with ISO date strings', () => {
      const group = fb.group({
        startDate: ['2020-06-15T10:00:00Z'],
        endDate: ['2020-06-15T11:00:00Z']
      });

      const validator = validDateRange('startDate', 'endDate');
      expect(validator(group)).toBeNull();
    });

    it('should handle missing fields gracefully', () => {
      const group = fb.group({
        startDate: ['2020-01-01']
      });

      const validator = validDateRange('startDate', 'nonexistent');
      // nonexistent control is undefined, so no value -> skip
      expect(validator(group)).toBeNull();
    });
  });

  // =========================================================================
  // getCrossFieldErrorMessage
  // =========================================================================
  describe('getCrossFieldErrorMessage()', () => {
    it('should return correct message for atLeastOneRequired', () => {
      const errorObj = { fields: ['phone', 'email'] };
      const message = getCrossFieldErrorMessage('atLeastOneRequired', errorObj);
      expect(message).toBe('Complete al menos uno de: phone, email');
    });

    it('should return correct message for invalidRange', () => {
      const message = getCrossFieldErrorMessage('invalidRange');
      expect(message).toBe('La fecha de inicio debe ser anterior a la fecha de fin');
    });

    it('should return default message for unknown error', () => {
      const message = getCrossFieldErrorMessage('unknownError');
      expect(message).toBe('Error en validación');
    });

    it('should handle undefined fields gracefully', () => {
      const message = getCrossFieldErrorMessage('atLeastOneRequired', undefined);
      expect(message).toBe('Complete al menos uno de: undefined');
    });
  });

  // =========================================================================
  // Integration Tests
  // =========================================================================
  describe('Integration with FormGroup', () => {
    it('should apply both validators to a form', () => {
      const form = fb.group({
        phone: [''],
        email: ['test@example.com'],
        startDate: ['2020-01-01'],
        endDate: ['2021-01-01']
      }, {
        validators: [
          atLeastOneRequired('phone', 'email'),
          validDateRange('startDate', 'endDate')
        ]
      });

      expect(form.valid).toBeTrue();
    });

    it('should detect atLeastOneRequired error', () => {
      const form = fb.group({
        phone: [''],
        email: ['']
      }, {
        validators: [atLeastOneRequired('phone', 'email')]
      });

      expect(form.valid).toBeFalse();
      expect(form.errors).toEqual({
        atLeastOneRequired: { fields: ['phone', 'email'] }
      });
    });

    it('should detect invalidRange error', () => {
      const form = fb.group({
        startDate: ['2022-01-01'],
        endDate: ['2020-01-01']
      }, {
        validators: [validDateRange('startDate', 'endDate')]
      });

      expect(form.valid).toBeFalse();
      expect(form.errors).toEqual({ invalidRange: true });
    });
  });
});
