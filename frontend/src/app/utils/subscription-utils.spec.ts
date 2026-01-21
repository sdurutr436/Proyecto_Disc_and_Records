import { Subject, of, delay, interval } from 'rxjs';
import { take } from 'rxjs/operators';
import {
  untilDestroyed,
  AutoUnsubscribe,
  debugSubscription,
  createDestroyHelper
} from './subscription-utils';

describe('subscription-utils', () => {

  describe('untilDestroyed()', () => {
    it('should complete observable when destroy$ emits', (done) => {
      const destroy$ = new Subject<void>();
      let completed = false;
      let emitCount = 0;

      interval(10).pipe(
        untilDestroyed(destroy$)
      ).subscribe({
        next: () => emitCount++,
        complete: () => {
          completed = true;
          expect(emitCount).toBeGreaterThan(0);
          expect(completed).toBeTrue();
          done();
        }
      });

      setTimeout(() => {
        destroy$.next();
        destroy$.complete();
      }, 50);
    });

    it('should allow emissions before destroy', (done) => {
      const destroy$ = new Subject<void>();
      const values: number[] = [];

      of(1, 2, 3).pipe(
        untilDestroyed(destroy$)
      ).subscribe({
        next: (v) => values.push(v),
        complete: () => {
          expect(values).toEqual([1, 2, 3]);
          done();
        }
      });
    });
  });

  describe('AutoUnsubscribe', () => {
    class TestComponent extends AutoUnsubscribe {
      public getDestroy$() {
        return this.destroy$;
      }
    }

    it('should create destroy$ subject', () => {
      const component = new TestComponent();
      expect(component.getDestroy$()).toBeTruthy();
      expect(component.getDestroy$() instanceof Subject).toBeTrue();
    });

    it('should emit and complete on ngOnDestroy', (done) => {
      const component = new TestComponent();
      let emitted = false;

      component.getDestroy$().subscribe({
        next: () => emitted = true,
        complete: () => {
          expect(emitted).toBeTrue();
          done();
        }
      });

      component.ngOnDestroy();
    });
  });

  describe('debugSubscription()', () => {
    it('should not modify the stream values', (done) => {
      const values: number[] = [];

      of(1, 2, 3).pipe(
        debugSubscription('Test')
      ).subscribe({
        next: (v) => values.push(v),
        complete: () => {
          expect(values).toEqual([1, 2, 3]);
          done();
        }
      });
    });

    it('should log subscription events', (done) => {
      spyOn(console, 'log');

      of(1).pipe(
        debugSubscription('TestSubscription')
      ).subscribe({
        complete: () => {
          expect(console.log).toHaveBeenCalled();
          done();
        }
      });
    });
  });

  describe('createDestroyHelper()', () => {
    it('should create a destroy helper object', () => {
      const helper = createDestroyHelper('TestComponent');
      expect(helper).toBeTruthy();
      expect(helper.takeUntil).toBeDefined();
      expect(helper.complete).toBeDefined();
    });

    it('should provide takeUntil operator', (done) => {
      const helper = createDestroyHelper('TestComponent');
      let completed = false;

      interval(10).pipe(
        helper.takeUntil()
      ).subscribe({
        complete: () => {
          completed = true;
          expect(completed).toBeTrue();
          done();
        }
      });

      setTimeout(() => {
        helper.complete();
      }, 50);
    });

    it('should work without component name', () => {
      const helper = createDestroyHelper();
      expect(helper).toBeTruthy();
      expect(helper.complete).toBeDefined();
    });

    it('should not throw when complete is called', () => {
      const helper = createDestroyHelper('Test');
      expect(() => helper.complete()).not.toThrow();
    });

    it('should allow calling complete multiple times', () => {
      const helper = createDestroyHelper('Test');
      helper.complete();
      expect(() => helper.complete()).not.toThrow();
    });
  });
});
