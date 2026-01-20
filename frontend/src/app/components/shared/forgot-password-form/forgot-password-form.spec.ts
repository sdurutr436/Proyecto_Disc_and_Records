import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';

import { ForgotPasswordForm } from './forgot-password-form';

describe('ForgotPasswordForm', () => {
  let component: ForgotPasswordForm;
  let fixture: ComponentFixture<ForgotPasswordForm>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ForgotPasswordForm, ReactiveFormsModule]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ForgotPasswordForm);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  describe('Initialization', () => {
    it('should create', () => {
      expect(component).toBeTruthy();
    });

    it('should initialize form with email control', () => {
      expect(component.forgotForm).toBeTruthy();
      expect(component.emailControl).toBeTruthy();
    });

    it('should start with email field empty', () => {
      expect(component.emailControl.value).toBe('');
    });

    it('should start with isSubmitting as false', () => {
      expect(component.isSubmitting()).toBeFalse();
    });

    it('should start with emailSent as false', () => {
      expect(component.emailSent()).toBeFalse();
    });
  });

  describe('Form Validation', () => {
    it('should require email', () => {
      component.emailControl.setValue('');
      expect(component.emailControl.hasError('required')).toBeTrue();
      expect(component.forgotForm.valid).toBeFalse();
    });

    it('should validate email format', () => {
      component.emailControl.setValue('invalid-email');
      expect(component.emailControl.hasError('email')).toBeTrue();
      expect(component.forgotForm.valid).toBeFalse();
    });

    it('should accept valid email', () => {
      component.emailControl.setValue('user@example.com');
      expect(component.emailControl.valid).toBeTrue();
      expect(component.forgotForm.valid).toBeTrue();
    });

    it('should accept email with subdomain', () => {
      component.emailControl.setValue('user@mail.example.com');
      expect(component.emailControl.valid).toBeTrue();
    });
  });

  describe('Form Submission', () => {
    it('should mark form as touched on submit', () => {
      expect(component.forgotForm.touched).toBeFalse();

      component.onSubmit();

      expect(component.forgotForm.touched).toBeTrue();
    });

    it('should not submit if email is invalid', () => {
      component.emailControl.setValue('invalid');
      component.onSubmit();

      expect(component.isSubmitting()).toBeFalse();
    });

    it('should set isSubmitting to true during submission', () => {
      component.emailControl.setValue('user@example.com');
      component.onSubmit();

      expect(component.isSubmitting()).toBeTrue();
    });

    it('should set emailSent to true after successful submission', fakeAsync(() => {
      component.emailControl.setValue('user@example.com');
      component.onSubmit();

      expect(component.emailSent()).toBeFalse();

      tick(1500);

      expect(component.isSubmitting()).toBeFalse();
      expect(component.emailSent()).toBeTrue();
    }));

    it('should log email to console on submit', fakeAsync(() => {
      spyOn(console, 'log');
      component.emailControl.setValue('test@example.com');
      component.onSubmit();

      expect(console.log).toHaveBeenCalledWith('Recuperar contraseña para:', 'test@example.com');

      tick(1500);
    }));
  });

  describe('Send Another Email', () => {
    it('should reset form when sendAnother is called', fakeAsync(() => {
      // First submit
      component.emailControl.setValue('user@example.com');
      component.onSubmit();
      tick(1500);

      expect(component.emailSent()).toBeTrue();

      // Send another
      component.sendAnother();

      expect(component.emailSent()).toBeFalse();
      expect(component.emailControl.value).toBeNull();
      expect(component.forgotForm.untouched).toBeTrue();
    }));

    it('should reset emailSent signal', () => {
      component.emailSent.set(true);

      component.sendAnother();

      expect(component.emailSent()).toBeFalse();
    });
  });

  describe('Navigation Outputs', () => {
    it('should have onBackToLogin output', () => {
      expect(component.onBackToLogin).toBeDefined();
    });

    it('should emit when onBackToLogin is triggered', () => {
      let emitted = false;
      component.onBackToLogin.subscribe(() => {
        emitted = true;
      });

      component.onBackToLogin.emit();

      expect(emitted).toBeTrue();
    });
  });

  describe('Email Control Getter', () => {
    it('should return email FormControl', () => {
      const control = component.emailControl;
      expect(control).toBeTruthy();
      expect(control.value).toBe('');
    });

    it('should be the same reference as form control', () => {
      component.emailControl.setValue('test@test.com');
      expect(component.forgotForm.get('email')?.value).toBe('test@test.com');
    });
  });
});
