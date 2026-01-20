import { TestBed } from '@angular/core/testing';
import {
  unsavedChangesGuard,
  advancedUnsavedChangesGuard,
  CanComponentDeactivate,
  CanComponentDeactivateAdvanced
} from './unsaved-changes.guard';
import { ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';

describe('UnsavedChangesGuard', () => {
  let mockRoute: ActivatedRouteSnapshot;
  let mockState: RouterStateSnapshot;
  let mockNextState: RouterStateSnapshot;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    mockRoute = {} as ActivatedRouteSnapshot;
    mockState = {} as RouterStateSnapshot;
    mockNextState = {} as RouterStateSnapshot;
  });

  describe('unsavedChangesGuard', () => {
    it('debería permitir navegación si componente no implementa canDeactivate', () => {
      const component = {} as CanComponentDeactivate;

      const result = TestBed.runInInjectionContext(() =>
        unsavedChangesGuard(component, mockRoute, mockState, mockNextState)
      );

      expect(result).toBeTrue();
    });

    it('debería retornar true cuando canDeactivate retorna true', () => {
      const component: CanComponentDeactivate = {
        canDeactivate: () => true
      };

      const result = TestBed.runInInjectionContext(() =>
        unsavedChangesGuard(component, mockRoute, mockState, mockNextState)
      );

      expect(result).toBeTrue();
    });

    it('debería retornar false cuando canDeactivate retorna false', () => {
      const component: CanComponentDeactivate = {
        canDeactivate: () => false
      };

      const result = TestBed.runInInjectionContext(() =>
        unsavedChangesGuard(component, mockRoute, mockState, mockNextState)
      );

      expect(result).toBeFalse();
    });

    it('debería manejar Promise que resuelve a true', async () => {
      const component: CanComponentDeactivate = {
        canDeactivate: () => Promise.resolve(true)
      };

      const result = TestBed.runInInjectionContext(() =>
        unsavedChangesGuard(component, mockRoute, mockState, mockNextState)
      );

      await expectAsync(result as Promise<boolean>).toBeResolvedTo(true);
    });

    it('debería manejar Promise que resuelve a false', async () => {
      const component: CanComponentDeactivate = {
        canDeactivate: () => Promise.resolve(false)
      };

      const result = TestBed.runInInjectionContext(() =>
        unsavedChangesGuard(component, mockRoute, mockState, mockNextState)
      );

      await expectAsync(result as Promise<boolean>).toBeResolvedTo(false);
    });
  });

  describe('advancedUnsavedChangesGuard', () => {
    it('debería permitir navegación si no hay hasUnsavedChanges', () => {
      const component = {} as CanComponentDeactivateAdvanced;

      const result = TestBed.runInInjectionContext(() =>
        advancedUnsavedChangesGuard(component, mockRoute, mockState, mockNextState)
      );

      expect(result).toBeTrue();
    });

    it('debería permitir navegación si hasUnsavedChanges retorna false', () => {
      const component: CanComponentDeactivateAdvanced = {
        hasUnsavedChanges: () => false
      };

      const result = TestBed.runInInjectionContext(() =>
        advancedUnsavedChangesGuard(component, mockRoute, mockState, mockNextState)
      );

      expect(result).toBeTrue();
    });

    it('debería usar mensaje por defecto cuando no hay getSaveConfirmMessage', () => {
      spyOn(window, 'confirm').and.returnValue(true);
      const component: CanComponentDeactivateAdvanced = {
        hasUnsavedChanges: () => true
      };

      TestBed.runInInjectionContext(() =>
        advancedUnsavedChangesGuard(component, mockRoute, mockState, mockNextState)
      );

      expect(window.confirm).toHaveBeenCalledWith(
        '¿Deseas salir sin guardar los cambios realizados? Los cambios se perderán.'
      );
    });

    it('debería usar mensaje personalizado de getSaveConfirmMessage', () => {
      spyOn(window, 'confirm').and.returnValue(true);
      const component: CanComponentDeactivateAdvanced = {
        hasUnsavedChanges: () => true,
        getSaveConfirmMessage: () => 'Mensaje personalizado'
      };

      TestBed.runInInjectionContext(() =>
        advancedUnsavedChangesGuard(component, mockRoute, mockState, mockNextState)
      );

      expect(window.confirm).toHaveBeenCalledWith('Mensaje personalizado');
    });

    it('debería permitir navegación si usuario confirma', () => {
      spyOn(window, 'confirm').and.returnValue(true);
      const component: CanComponentDeactivateAdvanced = {
        hasUnsavedChanges: () => true
      };

      const result = TestBed.runInInjectionContext(() =>
        advancedUnsavedChangesGuard(component, mockRoute, mockState, mockNextState)
      );

      expect(result).toBeTrue();
    });

    it('debería bloquear navegación si usuario cancela', () => {
      spyOn(window, 'confirm').and.returnValue(false);
      const component: CanComponentDeactivateAdvanced = {
        hasUnsavedChanges: () => true
      };

      const result = TestBed.runInInjectionContext(() =>
        advancedUnsavedChangesGuard(component, mockRoute, mockState, mockNextState)
      );

      expect(result).toBeFalse();
    });
  });
});
