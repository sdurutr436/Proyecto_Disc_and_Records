import { TestBed } from '@angular/core/testing';
import { FormBuilder, FormControl, FormGroup, FormArray, Validators } from '@angular/forms';
import { FormStateService } from './form-state';

describe('FormStateService', () => {
  let service: FormStateService;
  let fb: FormBuilder;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FormStateService);
    fb = TestBed.inject(FormBuilder);
  });

  afterEach(() => {
    service.clearAsyncValidationStates();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('shouldShowErrors()', () => {
    it('should return false for null control', () => {
      expect(service.shouldShowErrors(null)).toBeFalse();
    });

    it('should return false for valid control', () => {
      const control = new FormControl('valid');
      expect(service.shouldShowErrors(control)).toBeFalse();
    });

    it('should return false for invalid but untouched control', () => {
      const control = new FormControl('', Validators.required);
      expect(service.shouldShowErrors(control)).toBeFalse();
    });

    it('should return true for invalid and touched control', () => {
      const control = new FormControl('', Validators.required);
      control.markAsTouched();
      expect(service.shouldShowErrors(control)).toBeTrue();
    });

    it('should return true for invalid and dirty control', () => {
      const control = new FormControl('', Validators.required);
      control.markAsDirty();
      expect(service.shouldShowErrors(control)).toBeTrue();
    });
  });

  describe('shouldShowErrorsOnSubmit()', () => {
    it('should return false for null control', () => {
      expect(service.shouldShowErrorsOnSubmit(null, true)).toBeFalse();
    });

    it('should return false if not submitted', () => {
      const control = new FormControl('', Validators.required);
      expect(service.shouldShowErrorsOnSubmit(control, false)).toBeFalse();
    });

    it('should return true for invalid control when submitted', () => {
      const control = new FormControl('', Validators.required);
      expect(service.shouldShowErrorsOnSubmit(control, true)).toBeTrue();
    });

    it('should return false for valid control when submitted', () => {
      const control = new FormControl('valid');
      expect(service.shouldShowErrorsOnSubmit(control, true)).toBeFalse();
    });
  });

  describe('shouldShowErrorsCombined()', () => {
    it('should return false for null control', () => {
      expect(service.shouldShowErrorsCombined(null, false)).toBeFalse();
    });

    it('should return true if invalid and touched', () => {
      const control = new FormControl('', Validators.required);
      control.markAsTouched();
      expect(service.shouldShowErrorsCombined(control, false)).toBeTrue();
    });

    it('should return true if invalid and dirty', () => {
      const control = new FormControl('', Validators.required);
      control.markAsDirty();
      expect(service.shouldShowErrorsCombined(control, false)).toBeTrue();
    });

    it('should return true if invalid and submitted', () => {
      const control = new FormControl('', Validators.required);
      expect(service.shouldShowErrorsCombined(control, true)).toBeTrue();
    });
  });

  describe('isSubmitDisabled()', () => {
    it('should return true for invalid form', () => {
      const form = fb.group({ name: ['', Validators.required] });
      expect(service.isSubmitDisabled(form)).toBeTrue();
    });

    it('should return false for valid form', () => {
      const form = fb.group({ name: ['John'] });
      expect(service.isSubmitDisabled(form)).toBeFalse();
    });

    it('should return true when submitting', () => {
      const form = fb.group({ name: ['John'] });
      expect(service.isSubmitDisabled(form, true)).toBeTrue();
    });
  });

  describe('isValidationPending()', () => {
    it('should return false for null control', () => {
      expect(service.isValidationPending(null)).toBeFalse();
    });

    it('should return false for non-pending control', () => {
      const control = new FormControl('value');
      expect(service.isValidationPending(control)).toBeFalse();
    });
  });

  describe('isValidAndTouched()', () => {
    it('should return false for null control', () => {
      expect(service.isValidAndTouched(null)).toBeFalse();
    });

    it('should return false for valid but untouched control', () => {
      const control = new FormControl('valid');
      expect(service.isValidAndTouched(control)).toBeFalse();
    });

    it('should return true for valid and touched control', () => {
      const control = new FormControl('valid');
      control.markAsTouched();
      expect(service.isValidAndTouched(control)).toBeTrue();
    });

    it('should return false for invalid and touched control', () => {
      const control = new FormControl('', Validators.required);
      control.markAsTouched();
      expect(service.isValidAndTouched(control)).toBeFalse();
    });
  });

  describe('FormArray methods', () => {
    let formArray: FormArray;

    beforeEach(() => {
      formArray = fb.array([
        fb.control('', Validators.required),
        fb.control('valid'),
        fb.control('', Validators.required)
      ]);
    });

    describe('shouldShowArrayItemErrors()', () => {
      it('should return false for untouched invalid item', () => {
        expect(service.shouldShowArrayItemErrors(formArray, 0)).toBeFalse();
      });

      it('should return true for touched invalid item', () => {
        formArray.at(0).markAsTouched();
        expect(service.shouldShowArrayItemErrors(formArray, 0)).toBeTrue();
      });
    });

    describe('getArrayItemsState()', () => {
      it('should return state for all items', () => {
        const states = service.getArrayItemsState(formArray);
        expect(states.length).toBe(3);
      });

      it('should include index in state', () => {
        const states = service.getArrayItemsState(formArray);
        expect(states[0].index).toBe(0);
        expect(states[1].index).toBe(1);
      });

      it('should include valid state', () => {
        const states = service.getArrayItemsState(formArray);
        expect(states[0].valid).toBeFalse();
        expect(states[1].valid).toBeTrue();
      });
    });

    describe('markArrayAsTouched()', () => {
      it('should mark all controls as touched', () => {
        service.markArrayAsTouched(formArray);
        expect(formArray.at(0).touched).toBeTrue();
        expect(formArray.at(1).touched).toBeTrue();
        expect(formArray.at(2).touched).toBeTrue();
      });

      it('should mark nested FormGroup controls as touched', () => {
        const nestedArray = fb.array([
          fb.group({ name: [''], email: [''] })
        ]);
        service.markArrayAsTouched(nestedArray);
        const group = nestedArray.at(0) as FormGroup;
        expect(group.get('name')?.touched).toBeTrue();
        expect(group.get('email')?.touched).toBeTrue();
      });
    });
  });

  describe('async validation tracking', () => {
    it('should start with no async validations', () => {
      expect(service.isAsyncValidating()).toBeFalse();
    });

    it('should track async validation start', () => {
      service.startAsyncValidation('email');
      expect(service.isAsyncValidating()).toBeTrue();
    });

    it('should track async validation end', () => {
      service.startAsyncValidation('email');
      service.endAsyncValidation('email');
      expect(service.isAsyncValidating()).toBeFalse();
    });

    it('should track multiple async validations', () => {
      service.startAsyncValidation('email');
      service.startAsyncValidation('username');
      expect(service.isAsyncValidating()).toBeTrue();

      service.endAsyncValidation('email');
      expect(service.isAsyncValidating()).toBeTrue();

      service.endAsyncValidation('username');
      expect(service.isAsyncValidating()).toBeFalse();
    });

    it('should check if specific control is validating', () => {
      expect(service.isControlValidating('email')).toBeFalse();
      service.startAsyncValidation('email');
      expect(service.isControlValidating('email')).toBeTrue();
    });

    it('should clear all validation states', () => {
      service.startAsyncValidation('email');
      service.startAsyncValidation('username');
      service.clearAsyncValidationStates();
      expect(service.isAsyncValidating()).toBeFalse();
    });

    it('should not decrement below zero', () => {
      service.endAsyncValidation('nonexistent');
      expect(service.isAsyncValidating()).toBeFalse();
    });
  });

  describe('getValidationClasses()', () => {
    it('should return empty object for null control', () => {
      const classes = service.getValidationClasses(null, 'input');
      expect(classes).toEqual({});
    });

    it('should add error class for invalid touched control', () => {
      const control = new FormControl('', Validators.required);
      control.markAsTouched();
      const classes = service.getValidationClasses(control, 'input');
      expect(classes['input--error']).toBeTrue();
    });

    it('should add success class for valid touched control', () => {
      const control = new FormControl('valid');
      control.markAsTouched();
      const classes = service.getValidationClasses(control, 'input');
      expect(classes['input--success']).toBeTrue();
    });

    it('should add touched class', () => {
      const control = new FormControl('value');
      control.markAsTouched();
      const classes = service.getValidationClasses(control, 'input');
      expect(classes['input--touched']).toBeTrue();
    });

    it('should add dirty class', () => {
      const control = new FormControl('value');
      control.markAsDirty();
      const classes = service.getValidationClasses(control, 'input');
      expect(classes['input--dirty']).toBeTrue();
    });
  });

  describe('getFeedbackState()', () => {
    it('should return neutral for null control', () => {
      expect(service.getFeedbackState(null)).toBe('neutral');
    });

    it('should return error for invalid touched control', () => {
      const control = new FormControl('', Validators.required);
      control.markAsTouched();
      expect(service.getFeedbackState(control)).toBe('error');
    });

    it('should return success for valid touched control', () => {
      const control = new FormControl('valid');
      control.markAsTouched();
      expect(service.getFeedbackState(control)).toBe('success');
    });

    it('should return neutral for untouched control', () => {
      const control = new FormControl('value');
      expect(service.getFeedbackState(control)).toBe('neutral');
    });
  });
});
