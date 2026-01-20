import { FormControl, ValidationErrors } from '@angular/forms';
import { fakeAsync, tick } from '@angular/core/testing';
import { from, isObservable, Observable } from 'rxjs';
import { emailUnique, usernameAvailable, getAsyncErrorMessage } from './async.validators';

// Helper para convertir el resultado del validator a Observable
function toObservable(result: Observable<ValidationErrors | null> | Promise<ValidationErrors | null>): Observable<ValidationErrors | null> {
  return isObservable(result) ? result : from(result);
}

describe('Async Validators', () => {
  // =========================================================================
  // emailUnique
  // =========================================================================
  describe('emailUnique()', () => {
    it('should return null for empty email', fakeAsync(() => {
      const control = new FormControl('');
      const validator = emailUnique();
      let result: any;

      toObservable(validator(control)).subscribe(res => result = res);
      tick(2000);

      expect(result).toBeNull();
    }));

    it('should return null for whitespace-only email', fakeAsync(() => {
      const control = new FormControl('   ');
      const validator = emailUnique();
      let result: any;

      toObservable(validator(control)).subscribe(res => result = res);
      tick(2000);

      expect(result).toBeNull();
    }));

    it('should return emailTaken for admin@discandrecords.com', fakeAsync(() => {
      const control = new FormControl('admin@discandrecords.com');
      const validator = emailUnique();
      let result: any;

      toObservable(validator(control)).subscribe(res => result = res);
      tick(3000);

      expect(result).toEqual({ emailTaken: true });
    }));

    it('should return emailTaken for test@example.com', fakeAsync(() => {
      const control = new FormControl('test@example.com');
      const validator = emailUnique();
      let result: any;

      toObservable(validator(control)).subscribe(res => result = res);
      tick(3000);

      expect(result).toEqual({ emailTaken: true });
    }));

    it('should return emailTaken for usuario@discandrecords.com', fakeAsync(() => {
      const control = new FormControl('usuario@discandrecords.com');
      const validator = emailUnique();
      let result: any;

      toObservable(validator(control)).subscribe(res => result = res);
      tick(3000);

      expect(result).toEqual({ emailTaken: true });
    }));

    it('should return emailTaken for demo@demo.com', fakeAsync(() => {
      const control = new FormControl('demo@demo.com');
      const validator = emailUnique();
      let result: any;

      toObservable(validator(control)).subscribe(res => result = res);
      tick(3000);

      expect(result).toEqual({ emailTaken: true });
    }));

    it('should return null for available email', fakeAsync(() => {
      const control = new FormControl('newuser@gmail.com');
      const validator = emailUnique();
      let result: any;

      toObservable(validator(control)).subscribe(res => result = res);
      tick(3000);

      expect(result).toBeNull();
    }));

    it('should be case insensitive', fakeAsync(() => {
      const control = new FormControl('ADMIN@DISCANDRECORDS.COM');
      const validator = emailUnique();
      let result: any;

      toObservable(validator(control)).subscribe(res => result = res);
      tick(3000);

      expect(result).toEqual({ emailTaken: true });
    }));

    it('should accept excludeUserId parameter', fakeAsync(() => {
      const control = new FormControl('admin@discandrecords.com');
      const validator = emailUnique('user123');
      let result: any;

      toObservable(validator(control)).subscribe(res => result = res);
      tick(3000);

      // La simulación no usa excludeUserId, pero el validador lo acepta
      expect(result).toEqual({ emailTaken: true });
    }));

    it('should trim whitespace from email', fakeAsync(() => {
      const control = new FormControl('  admin@discandrecords.com  ');
      const validator = emailUnique();
      let result: any;

      toObservable(validator(control)).subscribe(res => result = res);
      tick(3000);

      expect(result).toEqual({ emailTaken: true });
    }));
  });

  // =========================================================================
  // usernameAvailable
  // =========================================================================
  describe('usernameAvailable()', () => {
    it('should return null for empty username', fakeAsync(() => {
      const control = new FormControl('');
      const validator = usernameAvailable();
      let result: any;

      toObservable(validator(control)).subscribe(res => result = res);
      tick(2000);

      expect(result).toBeNull();
    }));

    it('should return null for short username (< 3 chars)', fakeAsync(() => {
      const control = new FormControl('ab');
      const validator = usernameAvailable();
      let result: any;

      toObservable(validator(control)).subscribe(res => result = res);
      tick(2000);

      expect(result).toBeNull();
    }));

    it('should return usernameTaken for admin', fakeAsync(() => {
      const control = new FormControl('admin');
      const validator = usernameAvailable();
      let result: any;

      toObservable(validator(control)).subscribe(res => result = res);
      tick(2000);

      expect(result).toEqual({ usernameTaken: true });
    }));

    it('should return usernameTaken for administrator', fakeAsync(() => {
      const control = new FormControl('administrator');
      const validator = usernameAvailable();
      let result: any;

      toObservable(validator(control)).subscribe(res => result = res);
      tick(2000);

      expect(result).toEqual({ usernameTaken: true });
    }));

    it('should return usernameTaken for root', fakeAsync(() => {
      const control = new FormControl('root');
      const validator = usernameAvailable();
      let result: any;

      toObservable(validator(control)).subscribe(res => result = res);
      tick(2000);

      expect(result).toEqual({ usernameTaken: true });
    }));

    it('should return usernameTaken for superuser', fakeAsync(() => {
      const control = new FormControl('superuser');
      const validator = usernameAvailable();
      let result: any;

      toObservable(validator(control)).subscribe(res => result = res);
      tick(2000);

      expect(result).toEqual({ usernameTaken: true });
    }));

    it('should return usernameTaken for discandrecords', fakeAsync(() => {
      const control = new FormControl('discandrecords');
      const validator = usernameAvailable();
      let result: any;

      toObservable(validator(control)).subscribe(res => result = res);
      tick(2000);

      expect(result).toEqual({ usernameTaken: true });
    }));

    it('should return usernameTaken for moderator', fakeAsync(() => {
      const control = new FormControl('moderator');
      const validator = usernameAvailable();
      let result: any;

      toObservable(validator(control)).subscribe(res => result = res);
      tick(2000);

      expect(result).toEqual({ usernameTaken: true });
    }));

    it('should return usernameTaken for support', fakeAsync(() => {
      const control = new FormControl('support');
      const validator = usernameAvailable();
      let result: any;

      toObservable(validator(control)).subscribe(res => result = res);
      tick(2000);

      expect(result).toEqual({ usernameTaken: true });
    }));

    it('should return null for available username', fakeAsync(() => {
      const control = new FormControl('newuser123');
      const validator = usernameAvailable();
      let result: any;

      toObservable(validator(control)).subscribe(res => result = res);
      tick(2000);

      expect(result).toBeNull();
    }));

    it('should be case insensitive', fakeAsync(() => {
      const control = new FormControl('ADMIN');
      const validator = usernameAvailable();
      let result: any;

      toObservable(validator(control)).subscribe(res => result = res);
      tick(2000);

      expect(result).toEqual({ usernameTaken: true });
    }));

    it('should trim whitespace', fakeAsync(() => {
      const control = new FormControl('  admin  ');
      const validator = usernameAvailable();
      let result: any;

      toObservable(validator(control)).subscribe(res => result = res);
      tick(2000);

      expect(result).toEqual({ usernameTaken: true });
    }));
  });

  // =========================================================================
  // getAsyncErrorMessage
  // =========================================================================
  describe('getAsyncErrorMessage()', () => {
    it('should return message for emailTaken', () => {
      const message = getAsyncErrorMessage('emailTaken');
      expect(message).toBe('Este email ya está registrado. ¿Olvidaste tu contraseña?');
    });

    it('should return message for usernameTaken', () => {
      const message = getAsyncErrorMessage('usernameTaken');
      expect(message).toBe('Este nombre de usuario no está disponible. Prueba otro.');
    });

    it('should return default message for unknown error', () => {
      const message = getAsyncErrorMessage('unknownError');
      expect(message).toBe('Error de validación');
    });
  });

  // =========================================================================
  // Integration with FormControl
  // =========================================================================
  describe('FormControl Integration', () => {
    it('should set pending state during email validation', fakeAsync(() => {
      const validator = emailUnique();
      const control = new FormControl('newuser@test.com', {
        asyncValidators: [validator]
      });

      // Control should be pending initially
      expect(control.pending).toBeTrue();

      tick(3000);

      expect(control.pending).toBeFalse();
      expect(control.errors).toBeNull();
      expect(control.valid).toBeTrue();
    }));

    it('should mark control invalid for taken email', fakeAsync(() => {
      const validator = emailUnique();
      const control = new FormControl('admin@discandrecords.com', {
        asyncValidators: [validator]
      });

      tick(3000);

      expect(control.errors).toEqual({ emailTaken: true });
      expect(control.valid).toBeFalse();
    }));

    it('should set pending state during username validation', fakeAsync(() => {
      const validator = usernameAvailable();
      const control = new FormControl('availableuser', {
        asyncValidators: [validator]
      });

      expect(control.pending).toBeTrue();

      tick(2000);

      expect(control.pending).toBeFalse();
      expect(control.errors).toBeNull();
    }));

    it('should mark control invalid for taken username', fakeAsync(() => {
      const validator = usernameAvailable();
      const control = new FormControl('admin', {
        asyncValidators: [validator]
      });

      tick(2000);

      expect(control.errors).toEqual({ usernameTaken: true });
      expect(control.valid).toBeFalse();
    }));
  });
});
