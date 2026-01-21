import { TestBed, fakeAsync, tick, flush } from '@angular/core/testing';
import { FormControl, ReactiveFormsModule, ValidationErrors } from '@angular/forms';
import { from, isObservable, Observable } from 'rxjs';
import { AsyncValidatorsService } from './async-validators.service';

// Helper para convertir el resultado del validator a Observable
function toObservable(result: Observable<ValidationErrors | null> | Promise<ValidationErrors | null>): Observable<ValidationErrors | null> {
  return isObservable(result) ? result : from(result);
}

describe('AsyncValidatorsService', () => {
  let service: AsyncValidatorsService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ReactiveFormsModule],
      providers: [AsyncValidatorsService]
    });
    service = TestBed.inject(AsyncValidatorsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  // =========================================================================
  // emailUnique
  // =========================================================================
  describe('emailUnique', () => {
    it('should return null for empty value', fakeAsync(() => {
      const control = new FormControl('');
      const validator = service.emailUnique();
      let result: any;

      toObservable(validator(control)).subscribe(res => result = res);
      tick(1000);

      expect(result).toBeNull();
    }));

    it('should return null for whitespace-only value', fakeAsync(() => {
      const control = new FormControl('   ');
      const validator = service.emailUnique();
      let result: any;

      toObservable(validator(control)).subscribe(res => result = res);
      tick(1000);

      expect(result).toBeNull();
    }));

    it('should return emailTaken error for registered email', fakeAsync(() => {
      const control = new FormControl('admin@discandrecords.com');
      const validator = service.emailUnique();
      let result: any;

      toObservable(validator(control)).subscribe(res => result = res);
      tick(2000);

      expect(result).toEqual({ emailTaken: true });
    }));

    it('should return emailTaken for test@example.com', fakeAsync(() => {
      const control = new FormControl('test@example.com');
      const validator = service.emailUnique();
      let result: any;

      toObservable(validator(control)).subscribe(res => result = res);
      tick(2000);

      expect(result).toEqual({ emailTaken: true });
    }));

    it('should return null for available email', fakeAsync(() => {
      const control = new FormControl('newuser@gmail.com');
      const validator = service.emailUnique();
      let result: any;

      toObservable(validator(control)).subscribe(res => result = res);
      tick(2000);

      expect(result).toBeNull();
    }));

    it('should be case insensitive', fakeAsync(() => {
      const control = new FormControl('ADMIN@DISCANDRECORDS.COM');
      const validator = service.emailUnique();
      let result: any;

      toObservable(validator(control)).subscribe(res => result = res);
      tick(2000);

      expect(result).toEqual({ emailTaken: true });
    }));

    it('should accept custom debounce time', fakeAsync(() => {
      const control = new FormControl('admin@discandrecords.com');
      const validator = service.emailUnique(undefined, 100);
      let result: any;

      toObservable(validator(control)).subscribe(res => result = res);
      tick(2000);

      expect(result).toEqual({ emailTaken: true });
    }));

    it('should accept excludeUserId parameter', fakeAsync(() => {
      const control = new FormControl('admin@discandrecords.com');
      const validator = service.emailUnique('user123');
      let result: any;

      toObservable(validator(control)).subscribe(res => result = res);
      tick(2000);

      // El email sigue marcado como taken (simulación no usa excludeUserId)
      expect(result).toEqual({ emailTaken: true });
    }));

    it('should return null for soporte@discandrecords.com (registered)', fakeAsync(() => {
      const control = new FormControl('soporte@discandrecords.com');
      const validator = service.emailUnique();
      let result: any;

      toObservable(validator(control)).subscribe(res => result = res);
      tick(2000);

      expect(result).toEqual({ emailTaken: true });
    }));
  });

  // =========================================================================
  // usernameAvailable
  // =========================================================================
  describe('usernameAvailable', () => {
    it('should return null for empty value', fakeAsync(() => {
      const control = new FormControl('');
      const validator = service.usernameAvailable();
      let result: any;

      toObservable(validator(control)).subscribe(res => result = res);
      tick(1000);

      expect(result).toBeNull();
    }));

    it('should return null for short username (< 3 chars)', fakeAsync(() => {
      const control = new FormControl('ab');
      const validator = service.usernameAvailable();
      let result: any;

      toObservable(validator(control)).subscribe(res => result = res);
      tick(1000);

      expect(result).toBeNull();
    }));

    it('should return usernameTaken for admin', fakeAsync(() => {
      const control = new FormControl('admin');
      const validator = service.usernameAvailable();
      let result: any;

      toObservable(validator(control)).subscribe(res => result = res);
      tick(2000);

      expect(result).toEqual({ usernameTaken: true });
    }));

    it('should return usernameTaken for root', fakeAsync(() => {
      const control = new FormControl('root');
      const validator = service.usernameAvailable();
      let result: any;

      toObservable(validator(control)).subscribe(res => result = res);
      tick(2000);

      expect(result).toEqual({ usernameTaken: true });
    }));

    it('should return usernameTaken for moderator', fakeAsync(() => {
      const control = new FormControl('moderator');
      const validator = service.usernameAvailable();
      let result: any;

      toObservable(validator(control)).subscribe(res => result = res);
      tick(2000);

      expect(result).toEqual({ usernameTaken: true });
    }));

    it('should return null for available username', fakeAsync(() => {
      const control = new FormControl('newuser123');
      const validator = service.usernameAvailable();
      let result: any;

      toObservable(validator(control)).subscribe(res => result = res);
      tick(2000);

      expect(result).toBeNull();
    }));

    it('should be case insensitive', fakeAsync(() => {
      const control = new FormControl('ADMIN');
      const validator = service.usernameAvailable();
      let result: any;

      toObservable(validator(control)).subscribe(res => result = res);
      tick(2000);

      expect(result).toEqual({ usernameTaken: true });
    }));

    it('should accept custom debounce time', fakeAsync(() => {
      const control = new FormControl('admin');
      const validator = service.usernameAvailable(100);
      let result: any;

      toObservable(validator(control)).subscribe(res => result = res);
      tick(2000);

      expect(result).toEqual({ usernameTaken: true });
    }));

    it('should return usernameTaken for support', fakeAsync(() => {
      const control = new FormControl('support');
      const validator = service.usernameAvailable();
      let result: any;

      toObservable(validator(control)).subscribe(res => result = res);
      tick(2000);

      expect(result).toEqual({ usernameTaken: true });
    }));

    it('should return usernameTaken for discandrecords', fakeAsync(() => {
      const control = new FormControl('discandrecords');
      const validator = service.usernameAvailable();
      let result: any;

      toObservable(validator(control)).subscribe(res => result = res);
      tick(2000);

      expect(result).toEqual({ usernameTaken: true });
    }));
  });

  // =========================================================================
  // artistNameAvailable
  // =========================================================================
  describe('artistNameAvailable', () => {
    it('should return null for empty value', fakeAsync(() => {
      const control = new FormControl('');
      const validator = service.artistNameAvailable();
      let result: any;

      toObservable(validator(control)).subscribe(res => result = res);
      tick(1000);

      expect(result).toBeNull();
    }));

    it('should return null for short name (< 2 chars)', fakeAsync(() => {
      const control = new FormControl('a');
      const validator = service.artistNameAvailable();
      let result: any;

      toObservable(validator(control)).subscribe(res => result = res);
      tick(1000);

      expect(result).toBeNull();
    }));

    it('should return artistExists for The Beatles', fakeAsync(() => {
      const control = new FormControl('the beatles');
      const validator = service.artistNameAvailable();
      let result: any;

      toObservable(validator(control)).subscribe(res => result = res);
      tick(2000);

      expect(result).toEqual({ artistExists: true });
    }));

    it('should return artistExists for Queen', fakeAsync(() => {
      const control = new FormControl('queen');
      const validator = service.artistNameAvailable();
      let result: any;

      toObservable(validator(control)).subscribe(res => result = res);
      tick(2000);

      expect(result).toEqual({ artistExists: true });
    }));

    it('should return artistExists for Pink Floyd', fakeAsync(() => {
      const control = new FormControl('pink floyd');
      const validator = service.artistNameAvailable();
      let result: any;

      toObservable(validator(control)).subscribe(res => result = res);
      tick(2000);

      expect(result).toEqual({ artistExists: true });
    }));

    it('should return artistExists for Led Zeppelin', fakeAsync(() => {
      const control = new FormControl('led zeppelin');
      const validator = service.artistNameAvailable();
      let result: any;

      toObservable(validator(control)).subscribe(res => result = res);
      tick(2000);

      expect(result).toEqual({ artistExists: true });
    }));

    it('should return null for new artist', fakeAsync(() => {
      const control = new FormControl('New Band 2024');
      const validator = service.artistNameAvailable();
      let result: any;

      toObservable(validator(control)).subscribe(res => result = res);
      tick(2000);

      expect(result).toBeNull();
    }));

    it('should be case insensitive', fakeAsync(() => {
      const control = new FormControl('THE BEATLES');
      const validator = service.artistNameAvailable();
      let result: any;

      toObservable(validator(control)).subscribe(res => result = res);
      tick(2000);

      expect(result).toEqual({ artistExists: true });
    }));

    it('should accept custom debounce time', fakeAsync(() => {
      const control = new FormControl('queen');
      const validator = service.artistNameAvailable(100);
      let result: any;

      toObservable(validator(control)).subscribe(res => result = res);
      tick(2000);

      expect(result).toEqual({ artistExists: true });
    }));

    it('should return artistExists for The Rolling Stones', fakeAsync(() => {
      const control = new FormControl('the rolling stones');
      const validator = service.artistNameAvailable();
      let result: any;

      toObservable(validator(control)).subscribe(res => result = res);
      tick(2000);

      expect(result).toEqual({ artistExists: true });
    }));
  });

  // =========================================================================
  // Edge Cases
  // =========================================================================
  describe('Edge Cases', () => {
    it('should trim whitespace from email', fakeAsync(() => {
      const control = new FormControl('  admin@discandrecords.com  ');
      const validator = service.emailUnique();
      let result: any;

      toObservable(validator(control)).subscribe(res => result = res);
      tick(2000);

      expect(result).toEqual({ emailTaken: true });
    }));

    it('should trim whitespace from username', fakeAsync(() => {
      const control = new FormControl('  admin  ');
      const validator = service.usernameAvailable();
      let result: any;

      toObservable(validator(control)).subscribe(res => result = res);
      tick(2000);

      expect(result).toEqual({ usernameTaken: true });
    }));

    it('should trim whitespace from artist name', fakeAsync(() => {
      const control = new FormControl('  queen  ');
      const validator = service.artistNameAvailable();
      let result: any;

      toObservable(validator(control)).subscribe(res => result = res);
      tick(2000);

      expect(result).toEqual({ artistExists: true });
    }));

    it('should handle null control value', fakeAsync(() => {
      const control = new FormControl(null);
      const validator = service.emailUnique();
      let result: any;

      toObservable(validator(control)).subscribe(res => result = res);
      tick(1000);

      expect(result).toBeNull();
    }));

    it('should handle undefined control value', fakeAsync(() => {
      const control = new FormControl(undefined);
      const validator = service.usernameAvailable();
      let result: any;

      toObservable(validator(control)).subscribe(res => result = res);
      tick(1000);

      expect(result).toBeNull();
    }));
  });

  // =========================================================================
  // Integration with FormControl
  // =========================================================================
  describe('FormControl Integration', () => {
    it('should work as asyncValidator on FormControl for email', fakeAsync(() => {
      const emailValidator = service.emailUnique(undefined, 100);
      const control = new FormControl('newuser@test.com', {
        asyncValidators: [emailValidator]
      });

      tick(2000);

      expect(control.errors).toBeNull();
      expect(control.valid).toBeTrue();
    }));

    it('should mark control invalid for taken email', fakeAsync(() => {
      const emailValidator = service.emailUnique(undefined, 100);
      const control = new FormControl('admin@discandrecords.com', {
        asyncValidators: [emailValidator]
      });

      tick(2000);

      expect(control.errors).toEqual({ emailTaken: true });
      expect(control.valid).toBeFalse();
    }));

    it('should work as asyncValidator on FormControl for username', fakeAsync(() => {
      const usernameValidator = service.usernameAvailable(100);
      const control = new FormControl('availableuser', {
        asyncValidators: [usernameValidator]
      });

      tick(2000);

      expect(control.errors).toBeNull();
      expect(control.valid).toBeTrue();
    }));

    it('should mark control invalid for taken username', fakeAsync(() => {
      const usernameValidator = service.usernameAvailable(100);
      const control = new FormControl('admin', {
        asyncValidators: [usernameValidator]
      });

      tick(2000);

      expect(control.errors).toEqual({ usernameTaken: true });
      expect(control.valid).toBeFalse();
    }));
  });
});
