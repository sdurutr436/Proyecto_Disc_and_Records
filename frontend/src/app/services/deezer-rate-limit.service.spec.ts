import { TestBed, fakeAsync, tick, discardPeriodicTasks } from '@angular/core/testing';
import { HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { DeezerRateLimitService } from './deezer-rate-limit.service';

describe('DeezerRateLimitService', () => {
  let service: DeezerRateLimitService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DeezerRateLimitService);
  });

  afterEach(() => {
    service.endCooldown();
  });

  describe('initial state', () => {
    it('should be created', () => {
      expect(service).toBeTruthy();
    });

    it('should not be in cooldown initially', () => {
      expect(service.isInCooldown()).toBeFalse();
    });

    it('should have 0 cooldown remaining initially', () => {
      expect(service.cooldownRemaining()).toBe(0);
    });

    it('should have null status message initially', () => {
      expect(service.statusMessage()).toBeNull();
    });
  });

  describe('isInCooldown()', () => {
    it('should return false when not in cooldown', () => {
      expect(service.isInCooldown()).toBeFalse();
    });

    it('should return true when in cooldown', () => {
      service.startCooldown(5);
      expect(service.isInCooldown()).toBeTrue();
    });
  });

  describe('handleRateLimitError()', () => {
    it('should return false for non-rate-limit errors', () => {
      const error = new HttpErrorResponse({ status: 404 });
      expect(service.handleRateLimitError(error)).toBeFalse();
    });

    it('should return false for 500 errors', () => {
      const error = new HttpErrorResponse({ status: 500 });
      expect(service.handleRateLimitError(error)).toBeFalse();
    });

    it('should return true for 429 errors', () => {
      const error = new HttpErrorResponse({ status: 429 });
      expect(service.handleRateLimitError(error)).toBeTrue();
    });

    it('should return true for 503 errors', () => {
      const error = new HttpErrorResponse({ status: 503 });
      expect(service.handleRateLimitError(error)).toBeTrue();
    });

    it('should start cooldown on 429 error', () => {
      const error = new HttpErrorResponse({ status: 429 });
      service.handleRateLimitError(error);
      expect(service.isInCooldown()).toBeTrue();
    });

    it('should start cooldown on 503 error', () => {
      const error = new HttpErrorResponse({ status: 503 });
      service.handleRateLimitError(error);
      expect(service.isInCooldown()).toBeTrue();
    });

    it('should use Retry-After header if present', () => {
      const headers = new HttpHeaders().set('Retry-After', '10');
      const error = new HttpErrorResponse({ status: 429, headers });
      service.handleRateLimitError(error);
      expect(service.cooldownRemaining()).toBe(10);
    });

    it('should use retryAfterSeconds from body if present', () => {
      const error = new HttpErrorResponse({
        status: 429,
        error: { error: { retryAfterSeconds: 15 } }
      });
      service.handleRateLimitError(error);
      expect(service.cooldownRemaining()).toBe(15);
    });

    it('should use default 5s if no retry info', () => {
      const error = new HttpErrorResponse({ status: 429 });
      service.handleRateLimitError(error);
      expect(service.cooldownRemaining()).toBe(5);
    });
  });

  describe('startCooldown()', () => {
    it('should set inCooldown to true', () => {
      service.startCooldown(10);
      expect(service.inCooldown()).toBeTrue();
    });

    it('should set cooldownRemaining to provided seconds', () => {
      service.startCooldown(10);
      expect(service.cooldownRemaining()).toBe(10);
    });

    it('should update status message', () => {
      service.startCooldown(10);
      expect(service.statusMessage()).toContain('10');
    });
  });

  describe('endCooldown()', () => {
    it('should set inCooldown to false', () => {
      service.startCooldown(10);
      service.endCooldown();
      expect(service.isInCooldown()).toBeFalse();
    });

    it('should reset cooldownRemaining to 0', () => {
      service.startCooldown(10);
      service.endCooldown();
      expect(service.cooldownRemaining()).toBe(0);
    });

    it('should clear status message', () => {
      service.startCooldown(10);
      service.endCooldown();
      expect(service.statusMessage()).toBeNull();
    });
  });

  describe('cooldown countdown', () => {
    it('should start countdown when cooldown begins', fakeAsync(() => {
      service.startCooldown(5);
      expect(service.cooldownRemaining()).toBe(5);
      discardPeriodicTasks();
    }));

    it('should decrement cooldown over time', fakeAsync(() => {
      service.startCooldown(5);
      tick(1000);
      expect(service.cooldownRemaining()).toBeLessThanOrEqual(4);
      service.endCooldown();
      discardPeriodicTasks();
    }));

    it('should end cooldown when countdown reaches 0', fakeAsync(() => {
      service.startCooldown(2);
      tick(3000);
      expect(service.isInCooldown()).toBeFalse();
      discardPeriodicTasks();
    }));
  });

  describe('statusMessage signal', () => {
    it('should return null when not in cooldown', () => {
      expect(service.statusMessage()).toBeNull();
    });

    it('should include remaining seconds when in cooldown', () => {
      service.startCooldown(30);
      expect(service.statusMessage()).toContain('30');
    });

    it('should mention rate limiting', () => {
      service.startCooldown(5);
      expect(service.statusMessage()).toContain('búsquedas');
    });
  });
});
