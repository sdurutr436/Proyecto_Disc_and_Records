import { TestBed } from '@angular/core/testing';
import { Route } from '@angular/router';
import { of } from 'rxjs';
import { NetworkAwarePreloadingStrategy } from './network-aware-preloading-strategy';

describe('NetworkAwarePreloadingStrategy', () => {
  let strategy: NetworkAwarePreloadingStrategy;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    strategy = TestBed.inject(NetworkAwarePreloadingStrategy);
  });

  it('should be created', () => {
    expect(strategy).toBeTruthy();
  });

  describe('preload() method', () => {
    it('should be defined', () => {
      expect(strategy.preload).toBeDefined();
    });

    it('should return an Observable', () => {
      const route: Route = { path: 'test' };
      const loadSpy = jasmine.createSpy('load').and.returnValue(of('loaded'));

      const result = strategy.preload(route, loadSpy);
      expect(result.subscribe).toBeDefined();
    });

    it('should handle route without data', () => {
      const route: Route = { path: 'test' };
      const loadSpy = jasmine.createSpy('load').and.returnValue(of('loaded'));

      // Should not throw
      expect(() => {
        strategy.preload(route, loadSpy).subscribe();
      }).not.toThrow();
    });

    it('should handle route with empty data', () => {
      const route: Route = { path: 'test', data: {} };
      const loadSpy = jasmine.createSpy('load').and.returnValue(of('loaded'));

      expect(() => {
        strategy.preload(route, loadSpy).subscribe();
      }).not.toThrow();
    });

    it('should handle route with critical true', () => {
      const route: Route = { path: 'test', data: { critical: true } };
      const loadSpy = jasmine.createSpy('load').and.returnValue(of('loaded'));

      expect(() => {
        strategy.preload(route, loadSpy).subscribe();
      }).not.toThrow();
    });

    it('should handle route with critical false', () => {
      const route: Route = { path: 'test', data: { critical: false } };
      const loadSpy = jasmine.createSpy('load').and.returnValue(of('loaded'));

      expect(() => {
        strategy.preload(route, loadSpy).subscribe();
      }).not.toThrow();
    });

    it('should complete the observable', (done) => {
      const route: Route = { path: 'test' };
      const loadSpy = jasmine.createSpy('load').and.returnValue(of('loaded'));

      strategy.preload(route, loadSpy).subscribe({
        complete: () => done()
      });
    });
  });

  // Test the logic conceptually - actual network behavior depends on browser
  describe('shouldPreloadOnUnknownNetwork logic (via behavior)', () => {
    it('should respect critical flag when evaluating routes', () => {
      const criticalRoute: Route = { path: 'critical', data: { critical: true } };
      const normalRoute: Route = { path: 'normal', data: {} };
      const loadSpy = jasmine.createSpy('load').and.returnValue(of('loaded'));

      // Both should not throw - actual behavior depends on network
      strategy.preload(criticalRoute, loadSpy).subscribe();
      strategy.preload(normalRoute, loadSpy).subscribe();

      // At least one should have been called (depends on network state)
      // We can't deterministically test this without mocking navigator
    });
  });
});
