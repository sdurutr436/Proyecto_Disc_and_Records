import { TestBed } from '@angular/core/testing';
import { Route } from '@angular/router';
import { of } from 'rxjs';
import { CustomPreloadingStrategy } from './custom-preloading-strategy';

describe('CustomPreloadingStrategy', () => {
  let strategy: CustomPreloadingStrategy;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    strategy = TestBed.inject(CustomPreloadingStrategy);
  });

  it('should be created', () => {
    expect(strategy).toBeTruthy();
  });

  describe('preload()', () => {
    it('should not preload route without data.preload', () => {
      const route: Route = { path: 'test' };
      const loadSpy = jasmine.createSpy('load').and.returnValue(of('loaded'));

      let result: any;
      strategy.preload(route, loadSpy).subscribe(r => result = r);

      expect(loadSpy).not.toHaveBeenCalled();
      expect(result).toBeNull();
    });

    it('should not preload route with preload = false', () => {
      const route: Route = { path: 'test', data: { preload: false } };
      const loadSpy = jasmine.createSpy('load').and.returnValue(of('loaded'));

      let result: any;
      strategy.preload(route, loadSpy).subscribe(r => result = r);

      expect(loadSpy).not.toHaveBeenCalled();
      expect(result).toBeNull();
    });

    it('should preload route with preload = true immediately', () => {
      const route: Route = { path: 'test', data: { preload: true } };
      const loadSpy = jasmine.createSpy('load').and.returnValue(of('loaded'));

      let result: any;
      strategy.preload(route, loadSpy).subscribe(r => result = r);

      expect(loadSpy).toHaveBeenCalled();
      expect(result).toBe('loaded');
    });

    it('should delay preload when delay is specified', (done) => {
      const route: Route = { path: 'test', data: { preload: true, delay: 50 } };
      const loadSpy = jasmine.createSpy('load').and.returnValue(of('loaded'));

      let loaded = false;
      strategy.preload(route, loadSpy).subscribe(r => {
        loaded = true;
        expect(r).toBe('loaded');
        done();
      });

      // Should not load immediately
      expect(loadSpy).not.toHaveBeenCalled();
      expect(loaded).toBeFalse();
    });

    it('should use delay of 0 when not specified (immediate load)', () => {
      const route: Route = { path: 'test', data: { preload: true } };
      const loadSpy = jasmine.createSpy('load').and.returnValue(of('loaded'));

      strategy.preload(route, loadSpy).subscribe();

      expect(loadSpy).toHaveBeenCalledTimes(1);
    });

    it('should handle empty data object', () => {
      const route: Route = { path: 'test', data: {} };
      const loadSpy = jasmine.createSpy('load').and.returnValue(of('loaded'));

      let result: any;
      strategy.preload(route, loadSpy).subscribe(r => result = r);

      expect(loadSpy).not.toHaveBeenCalled();
      expect(result).toBeNull();
    });

    it('should handle undefined data', () => {
      const route: Route = { path: 'test', data: undefined };
      const loadSpy = jasmine.createSpy('load').and.returnValue(of('loaded'));

      let result: any;
      strategy.preload(route, loadSpy).subscribe(r => result = r);

      expect(loadSpy).not.toHaveBeenCalled();
      expect(result).toBeNull();
    });
  });
});
