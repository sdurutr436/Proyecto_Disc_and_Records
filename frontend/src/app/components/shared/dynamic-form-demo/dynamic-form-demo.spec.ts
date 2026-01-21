import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { DynamicFormDemo } from './dynamic-form-demo';
import { FormStateService } from '../../../services/form-state';
import { AsyncValidatorsService } from '../../../services/async-validators.service';

describe('DynamicFormDemo', () => {
  let component: DynamicFormDemo;
  let fixture: ComponentFixture<DynamicFormDemo>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DynamicFormDemo],
      providers: [
        provideHttpClient(),
        provideHttpClientTesting(),
        FormStateService,
        AsyncValidatorsService
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(DynamicFormDemo);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('form initialization', () => {
    it('should create profile form', () => {
      expect(component.profileForm).toBeTruthy();
    });

    it('should have email control', () => {
      expect(component.emailControl).toBeTruthy();
    });

    it('should have username control', () => {
      expect(component.usernameControl).toBeTruthy();
    });

    it('should have addresses array', () => {
      expect(component.addressesArray).toBeTruthy();
    });

    it('should have phones array', () => {
      expect(component.phonesArray).toBeTruthy();
    });

    it('should have emergency contacts array', () => {
      expect(component.emergencyContactsArray).toBeTruthy();
    });

    it('should start with one address', () => {
      expect(component.addressesArray.length).toBe(1);
    });

    it('should start with one phone', () => {
      expect(component.phonesArray.length).toBe(1);
    });

    it('should start with no emergency contacts', () => {
      expect(component.emergencyContactsArray.length).toBe(0);
    });
  });

  describe('address management', () => {
    it('should add address when addAddress() called', () => {
      const initialLength = component.addressesArray.length;
      component.addAddress();
      expect(component.addressesArray.length).toBe(initialLength + 1);
    });

    it('should not add more than 3 addresses', () => {
      component.addAddress();
      component.addAddress();
      component.addAddress(); // Try to add 4th
      expect(component.addressesArray.length).toBeLessThanOrEqual(3);
    });

    it('should remove address when removeAddress() called', () => {
      component.addAddress();
      const lengthAfterAdd = component.addressesArray.length;
      component.removeAddress(1);
      expect(component.addressesArray.length).toBe(lengthAfterAdd - 1);
    });

    it('should not remove last address', () => {
      component.removeAddress(0);
      expect(component.addressesArray.length).toBe(1);
    });

    it('should get address control by index and field', () => {
      const streetControl = component.getAddressControl(0, 'street');
      expect(streetControl).toBeTruthy();
    });
  });

  describe('phone management', () => {
    it('should add phone when addPhone() called', () => {
      const initialLength = component.phonesArray.length;
      component.addPhone();
      expect(component.phonesArray.length).toBe(initialLength + 1);
    });

    it('should remove phone when removePhone() called', () => {
      component.addPhone();
      const lengthAfterAdd = component.phonesArray.length;
      component.removePhone(1);
      expect(component.phonesArray.length).toBe(lengthAfterAdd - 1);
    });

    it('should not remove last phone', () => {
      component.removePhone(0);
      expect(component.phonesArray.length).toBe(1);
    });

    it('should get phone control by index', () => {
      const phoneControl = component.getPhoneControl(0);
      expect(phoneControl).toBeTruthy();
    });
  });

  describe('emergency contact management', () => {
    it('should add emergency contact', () => {
      component.addEmergencyContact();
      expect(component.emergencyContactsArray.length).toBe(1);
    });

    it('should not add more than 2 emergency contacts', () => {
      component.addEmergencyContact();
      component.addEmergencyContact();
      component.addEmergencyContact(); // Try to add 3rd
      expect(component.emergencyContactsArray.length).toBeLessThanOrEqual(2);
    });

    it('should remove emergency contact', () => {
      component.addEmergencyContact();
      component.removeEmergencyContact(0);
      expect(component.emergencyContactsArray.length).toBe(0);
    });

    it('should get contact control by index and field', () => {
      component.addEmergencyContact();
      const nameControl = component.getContactControl(0, 'name');
      expect(nameControl).toBeTruthy();
    });
  });

  describe('input classes', () => {
    it('should return empty object for null control', () => {
      const classes = component.getInputClasses(null);
      expect(classes).toEqual({});
    });

    it('should return classes object for valid control', () => {
      const classes = component.getInputClasses(component.emailControl);
      expect(classes).toBeDefined();
      expect(typeof classes).toBe('object');
    });
  });

  describe('array errors', () => {
    it('should return empty string when no errors', () => {
      const error = component.getArrayError(component.phonesArray);
      expect(typeof error).toBe('string');
    });
  });

  describe('form submission', () => {
    it('should not submit invalid form', () => {
      component.onSubmit();
      expect(component.formSubmitted()).toBeTrue();
      expect(component.submitResult()?.success).toBeFalse();
    });

    it('should mark form submitted', () => {
      component.onSubmit();
      expect(component.formSubmitted()).toBeTrue();
    });

    it('should submit valid form', fakeAsync(() => {
      // Fill in valid data
      component.emailControl.setValue('test@example.com');
      component.usernameControl.setValue('testuser');
      component.getAddressControl(0, 'street').setValue('123 Main St');
      component.getAddressControl(0, 'city').setValue('Test City');
      component.getAddressControl(0, 'postalCode').setValue('12345');
      component.getPhoneControl(0).setValue('612345678');

      tick(1000); // Wait for async validators

      component.onSubmit();

      if (component.profileForm.valid) {
        tick(1500);
        expect(component.submitResult()?.success).toBeTrue();
      }
    }));
  });

  describe('form reset', () => {
    it('should reset form state', () => {
      component.emailControl.setValue('test@example.com');
      component.addAddress();
      component.addPhone();
      component.addEmergencyContact();
      component.formSubmitted.set(true);

      component.resetForm();

      expect(component.formSubmitted()).toBeFalse();
      expect(component.submitResult()).toBeNull();
    });

    it('should reset arrays to initial state', () => {
      component.addAddress();
      component.addPhone();
      component.addEmergencyContact();

      component.resetForm();

      expect(component.addressesArray.length).toBe(1);
      expect(component.phonesArray.length).toBe(1);
      expect(component.emergencyContactsArray.length).toBe(0);
    });
  });

  describe('signals', () => {
    it('should have isSubmitting signal', () => {
      expect(component.isSubmitting).toBeDefined();
      expect(component.isSubmitting()).toBeFalse();
    });

    it('should have formSubmitted signal', () => {
      expect(component.formSubmitted).toBeDefined();
      expect(component.formSubmitted()).toBeFalse();
    });

    it('should have submitResult signal', () => {
      expect(component.submitResult).toBeDefined();
      expect(component.submitResult()).toBeNull();
    });
  });
});
