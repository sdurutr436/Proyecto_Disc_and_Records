import { DestroyRef, inject, Directive } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { Observable, Subject, MonoTypeOperatorFunction, OperatorFunction } from 'rxjs';
import { takeUntil, tap, finalize } from 'rxjs/operators';

/**
 * Utilidades para gestión de memoria y limpieza de suscripciones
 *
 * Angular 17+ provee takeUntilDestroyed() que simplifica enormemente
 * la gestión de suscripciones. Este archivo provee helpers adicionales.
 *
 * MÉTODOS RECOMENDADOS (de mejor a peor):
 *
 * 1. Async Pipe (MEJOR) - Angular gestiona todo automáticamente
 *    ```html
 *    {{ albums$ | async }}
 *    @for (album of (albums$ | async) ?? []; track album.id) { }
 *    ```
 *
 * 2. Signals (RECOMENDADO en Angular 17+) - No requiere unsubscribe
 *    ```typescript
 *    albums = signal<Album[]>([]);
 *    filteredAlbums = computed(() => this.albums().filter(...));
 *    ```
 *
 * 3. takeUntilDestroyed() - Para suscripciones manuales
 *    ```typescript
 *    private destroyRef = inject(DestroyRef);
 *
 *    ngOnInit() {
 *      this.service.getData().pipe(
 *        takeUntilDestroyed(this.destroyRef)
 *      ).subscribe();
 *    }
 *    ```
 *
 * 4. Subject + takeUntil (Legacy) - Para Angular < 16
 *    ```typescript
 *    private destroy$ = new Subject<void>();
 *
 *    ngOnInit() {
 *      this.service.getData().pipe(
 *        takeUntil(this.destroy$)
 *      ).subscribe();
 *    }
 *
 *    ngOnDestroy() {
 *      this.destroy$.next();
 *      this.destroy$.complete();
 *    }
 *    ```
 */

/**
 * Helper para crear un operador takeUntil con un Subject
 * Útil para componentes que no pueden usar DestroyRef
 *
 * @example
 * ```typescript
 * export class MyComponent implements OnDestroy {
 *   private destroy$ = new Subject<void>();
 *
 *   ngOnInit() {
 *     this.data$.pipe(
 *       untilDestroyed(this.destroy$)
 *     ).subscribe();
 *   }
 *
 *   ngOnDestroy() {
 *     this.destroy$.next();
 *     this.destroy$.complete();
 *   }
 * }
 * ```
 */
export function untilDestroyed<T>(destroy$: Subject<void>): MonoTypeOperatorFunction<T> {
  return (source: Observable<T>) => source.pipe(takeUntil(destroy$));
}

/**
 * Clase base para componentes con gestión automática de suscripciones
 *
 * @deprecated Usar takeUntilDestroyed() de @angular/core/rxjs-interop en su lugar
 *
 * @example
 * ```typescript
 * @Component({...})
 * export class MyComponent extends AutoUnsubscribe implements OnInit, OnDestroy {
 *   ngOnInit() {
 *     this.data$.pipe(
 *       takeUntil(this.destroy$)
 *     ).subscribe();
 *   }
 *
 *   // ngOnDestroy se hereda automáticamente
 * }
 * ```
 */
@Directive()
export abstract class AutoUnsubscribe {
  protected destroy$ = new Subject<void>();

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}

/**
 * Operador que loguea el ciclo de vida de una suscripción
 * Útil para debugging de memory leaks
 *
 * @example
 * ```typescript
 * this.data$.pipe(
 *   debugSubscription('AlbumData'),
 *   takeUntilDestroyed(this.destroyRef)
 * ).subscribe();
 * ```
 */
export function debugSubscription<T>(name: string): MonoTypeOperatorFunction<T> {
  return (source: Observable<T>) => {
    let subscriptionCount = 0;

    return source.pipe(
      tap({
        subscribe: () => {
          subscriptionCount++;
          console.log(`[${name}] 🟢 Subscribed (active: ${subscriptionCount})`);
        }
      }),
      finalize(() => {
        subscriptionCount--;
        console.log(`[${name}] 🔴 Unsubscribed (active: ${subscriptionCount})`);
      })
    );
  };
}

/**
 * Factory para crear un helper de destroy con logging opcional
 *
 * @example
 * ```typescript
 * @Component({...})
 * export class MyComponent implements OnInit, OnDestroy {
 *   private destroy = createDestroyHelper('MyComponent');
 *
 *   ngOnInit() {
 *     this.data$.pipe(
 *       this.destroy.takeUntil()
 *     ).subscribe();
 *   }
 *
 *   ngOnDestroy() {
 *     this.destroy.complete();
 *   }
 * }
 * ```
 */
export function createDestroyHelper(componentName?: string) {
  const destroy$ = new Subject<void>();
  const isDebug = false; // Cambiar a true para debugging

  return {
    /**
     * Operador para añadir a pipes
     */
    takeUntil<T>(): MonoTypeOperatorFunction<T> {
      return (source: Observable<T>) => {
        if (isDebug && componentName) {
          return source.pipe(
            debugSubscription(componentName),
            takeUntil(destroy$)
          );
        }
        return source.pipe(takeUntil(destroy$));
      };
    },

    /**
     * Llamar en ngOnDestroy
     */
    complete(): void {
      if (isDebug && componentName) {
        console.log(`[${componentName}] 💀 Component destroyed`);
      }
      destroy$.next();
      destroy$.complete();
    }
  };
}

/**
 * Hook personalizado para usar con inject() en componentes standalone
 * Proporciona una forma moderna de gestionar el ciclo de vida
 *
 * @example
 * ```typescript
 * @Component({...})
 * export class MyComponent implements OnInit {
 *   private lifecycle = useComponentLifecycle();
 *
 *   ngOnInit() {
 *     this.data$.pipe(
 *       this.lifecycle.takeUntilDestroyed()
 *     ).subscribe();
 *   }
 * }
 * ```
 */
export function useComponentLifecycle() {
  const destroyRef = inject(DestroyRef);

  return {
    /**
     * Operador que desuscribe automáticamente cuando el componente se destruye
     */
    takeUntilDestroyed<T>(): MonoTypeOperatorFunction<T> {
      return takeUntilDestroyed(destroyRef);
    },

    /**
     * DestroyRef para uso directo
     */
    destroyRef
  };
}

/**
 * Decorator experimental para auto-unsubscribe
 *
 * @experimental No usar en producción
 *
 * @example
 * ```typescript
 * @Component({...})
 * export class MyComponent {
 *   @AutoUnsubscribeDecorator()
 *   subscription = this.data$.subscribe();
 * }
 * ```
 */
export function AutoUnsubscribeDecorator() {
  return function (target: any, propertyKey: string) {
    const originalOnDestroy = target.ngOnDestroy;

    target.ngOnDestroy = function () {
      const subscription = this[propertyKey];
      if (subscription && typeof subscription.unsubscribe === 'function') {
        subscription.unsubscribe();
      }

      if (originalOnDestroy) {
        originalOnDestroy.call(this);
      }
    };
  };
}
