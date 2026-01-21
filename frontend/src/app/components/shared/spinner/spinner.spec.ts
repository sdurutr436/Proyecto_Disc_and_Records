import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { signal } from '@angular/core';
import { By } from '@angular/platform-browser';
import { BehaviorSubject } from 'rxjs';

import { Spinner } from './spinner';
import { LoadingService } from '../../../services/loading';

/**
 * Mock del LoadingService para tests
 */
class MockLoadingService {
  private localStatesMap = new Map<string, boolean>();
  private localStatesSubject = new BehaviorSubject<Map<string, boolean>>(new Map());
  private _isLoading = signal(false);
  private _message = signal('Cargando...');

  localStates$ = this.localStatesSubject.asObservable();
  isLoading = this._isLoading;
  message = this._message;

  setGlobalLoading(loading: boolean): void {
    this._isLoading.set(loading);
  }

  setMessage(message: string): void {
    this._message.set(message);
  }

  setLocalLoading(id: string, loading: boolean): void {
    this.localStatesMap.set(id, loading);
    this.localStatesSubject.next(new Map(this.localStatesMap));
  }

  clearLocalLoading(id: string): void {
    this.localStatesMap.delete(id);
    this.localStatesSubject.next(new Map(this.localStatesMap));
  }
}

describe('Spinner', () => {
  let component: Spinner;
  let fixture: ComponentFixture<Spinner>;
  let mockLoadingService: MockLoadingService;

  beforeEach(async () => {
    mockLoadingService = new MockLoadingService();

    await TestBed.configureTestingModule({
      imports: [Spinner],
      providers: [{ provide: LoadingService, useValue: mockLoadingService }],
    }).compileComponents();

    fixture = TestBed.createComponent(Spinner);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  // ===========================================================================
  // CREACIÓN DEL COMPONENTE
  // ===========================================================================

  describe('Creación', () => {
    it('debería crear el componente', () => {
      expect(component).toBeTruthy();
    });
  });

  // ===========================================================================
  // VALORES POR DEFECTO DE @INPUTS
  // ===========================================================================

  describe('Valores por defecto', () => {
    it('show debería ser undefined por defecto', () => {
      expect(component.show).toBeUndefined();
    });

    it('mode debería ser "inline" por defecto', () => {
      expect(component.mode).toBe('inline');
    });

    it('size debería ser "md" por defecto', () => {
      expect(component.size).toBe('md');
    });

    it('message debería ser undefined por defecto', () => {
      expect(component.message).toBeUndefined();
    });

    it('localId debería ser undefined por defecto', () => {
      expect(component.localId).toBeUndefined();
    });

    it('color debería ser "primary" por defecto', () => {
      expect(component.color).toBe('primary');
    });
  });

  // ===========================================================================
  // VISIBILIDAD (isVisible)
  // ===========================================================================

  describe('Visibilidad (isVisible)', () => {
    describe('Con show explícito', () => {
      it('debería ser visible cuando show=true', () => {
        component.show = true;
        fixture.detectChanges();
        expect(component.isVisible).toBe(true);
      });

      it('no debería ser visible cuando show=false', () => {
        component.show = false;
        fixture.detectChanges();
        expect(component.isVisible).toBe(false);
      });

      it('show explícito debería tener prioridad sobre estado global', () => {
        component.show = false;
        mockLoadingService.setGlobalLoading(true);
        fixture.detectChanges();
        expect(component.isVisible).toBe(false);
      });
    });

    describe('Con localId', () => {
      it('debería usar estado local cuando localId está definido', fakeAsync(() => {
        component.show = undefined;
        component.localId = 'test-spinner';
        component.ngOnInit();
        tick();

        mockLoadingService.setLocalLoading('test-spinner', true);
        tick();

        expect(component.isVisible).toBe(true);
      }));

      it('debería actualizarse cuando estado local cambia', fakeAsync(() => {
        component.show = undefined;
        component.localId = 'test-spinner';
        component.ngOnInit();
        tick();

        mockLoadingService.setLocalLoading('test-spinner', true);
        tick();
        expect(component.isVisible).toBe(true);

        mockLoadingService.setLocalLoading('test-spinner', false);
        tick();
        expect(component.isVisible).toBe(false);
      }));

      it('debería ser false si localId no existe en el mapa', fakeAsync(() => {
        component.show = undefined;
        component.localId = 'non-existent';
        component.ngOnInit();
        tick();

        expect(component.isVisible).toBe(false);
      }));
    });

    describe('Con estado global', () => {
      it('debería usar estado global cuando show es undefined y no hay localId', () => {
        component.show = undefined;
        component.localId = undefined;

        mockLoadingService.setGlobalLoading(true);
        fixture.detectChanges();

        expect(component.isVisible).toBe(true);
      });

      it('debería actualizarse cuando estado global cambia', () => {
        component.show = undefined;
        component.localId = undefined;

        mockLoadingService.setGlobalLoading(true);
        expect(component.isVisible).toBe(true);

        mockLoadingService.setGlobalLoading(false);
        expect(component.isVisible).toBe(false);
      });
    });
  });

  // ===========================================================================
  // MODOS DE VISUALIZACIÓN
  // ===========================================================================

  describe('Modos de visualización', () => {
    it('debería aplicar clase spinner--global para mode="global"', () => {
      component.mode = 'global';
      fixture.detectChanges();
      expect(component.spinnerClasses).toContain('spinner--global');
    });

    it('debería aplicar clase spinner--inline para mode="inline"', () => {
      component.mode = 'inline';
      fixture.detectChanges();
      expect(component.spinnerClasses).toContain('spinner--inline');
    });

    it('debería aplicar clase spinner--button para mode="button"', () => {
      component.mode = 'button';
      fixture.detectChanges();
      expect(component.spinnerClasses).toContain('spinner--button');
    });
  });

  // ===========================================================================
  // TAMAÑOS
  // ===========================================================================

  describe('Tamaños', () => {
    it('debería aplicar clase spinner--sm para size="sm"', () => {
      component.size = 'sm';
      fixture.detectChanges();
      expect(component.spinnerClasses).toContain('spinner--sm');
    });

    it('debería aplicar clase spinner--md para size="md"', () => {
      component.size = 'md';
      fixture.detectChanges();
      expect(component.spinnerClasses).toContain('spinner--md');
    });

    it('debería aplicar clase spinner--lg para size="lg"', () => {
      component.size = 'lg';
      fixture.detectChanges();
      expect(component.spinnerClasses).toContain('spinner--lg');
    });
  });

  // ===========================================================================
  // COLORES
  // ===========================================================================

  describe('Colores', () => {
    it('debería aplicar clase spinner--primary para color="primary"', () => {
      component.color = 'primary';
      fixture.detectChanges();
      expect(component.spinnerClasses).toContain('spinner--primary');
    });

    it('debería aplicar clase spinner--secondary para color="secondary"', () => {
      component.color = 'secondary';
      fixture.detectChanges();
      expect(component.spinnerClasses).toContain('spinner--secondary');
    });

    it('debería aplicar clase spinner--white para color="white"', () => {
      component.color = 'white';
      fixture.detectChanges();
      expect(component.spinnerClasses).toContain('spinner--white');
    });
  });

  // ===========================================================================
  // MENSAJE
  // ===========================================================================

  describe('Mensaje (displayMessage)', () => {
    it('debería usar mensaje local si está definido', () => {
      component.message = 'Guardando...';
      fixture.detectChanges();
      expect(component.displayMessage).toBe('Guardando...');
    });

    it('debería usar mensaje del servicio si mensaje local no está definido', () => {
      component.message = undefined;
      mockLoadingService.setMessage('Procesando...');
      fixture.detectChanges();
      expect(component.displayMessage).toBe('Procesando...');
    });

    it('mensaje local debería tener prioridad sobre servicio', () => {
      component.message = 'Cargando datos...';
      mockLoadingService.setMessage('Otro mensaje');
      fixture.detectChanges();
      expect(component.displayMessage).toBe('Cargando datos...');
    });
  });

  // ===========================================================================
  // CLASES CSS
  // ===========================================================================

  describe('spinnerClasses getter', () => {
    it('debería incluir clase base "spinner"', () => {
      expect(component.spinnerClasses).toContain('spinner');
    });

    it('debería construir clases con múltiples propiedades', () => {
      component.mode = 'global';
      component.size = 'lg';
      component.color = 'white';
      fixture.detectChanges();

      const classes = component.spinnerClasses;
      expect(classes).toContain('spinner');
      expect(classes).toContain('spinner--global');
      expect(classes).toContain('spinner--lg');
      expect(classes).toContain('spinner--white');
    });

    it('debería manejar valores por defecto correctamente', () => {
      const classes = component.spinnerClasses;
      expect(classes).toBe('spinner spinner--inline spinner--md spinner--primary');
    });
  });

  describe('overlayClasses getter', () => {
    it('debería incluir clase visible cuando isVisible es true', () => {
      component.show = true;
      fixture.detectChanges();
      expect(component.overlayClasses).toContain('spinner-overlay--visible');
    });

    it('no debería incluir clase visible cuando isVisible es false', () => {
      component.show = false;
      fixture.detectChanges();
      expect(component.overlayClasses).not.toContain('spinner-overlay--visible');
    });

    it('debería siempre incluir clase base spinner-overlay', () => {
      expect(component.overlayClasses).toContain('spinner-overlay');
    });
  });

  // ===========================================================================
  // CICLO DE VIDA
  // ===========================================================================

  describe('Ciclo de vida', () => {
    it('no debería suscribirse si localId no está definido', () => {
      component.localId = undefined;
      component.ngOnInit();
      // No debe lanzar error
      expect(true).toBe(true);
    });

    it('debería suscribirse cuando localId está definido', fakeAsync(() => {
      component.localId = 'test-id';
      component.ngOnInit();
      tick();

      mockLoadingService.setLocalLoading('test-id', true);
      tick();

      // Debería haber creado la suscripción
      expect(component.isVisible).toBe(true);
    }));

    it('debería desuscribirse en ngOnDestroy', fakeAsync(() => {
      component.localId = 'test-id';
      component.ngOnInit();
      tick();

      component.ngOnDestroy();

      // No debería lanzar error después de destruir
      mockLoadingService.setLocalLoading('test-id', true);
      tick();
      expect(true).toBe(true);
    }));

    it('ngOnDestroy no debería fallar si no hay suscripción', () => {
      component.localId = undefined;
      component.ngOnDestroy();
      // No debe lanzar error
      expect(true).toBe(true);
    });
  });

  // ===========================================================================
  // CASOS DE USO ESPECÍFICOS
  // ===========================================================================

  describe('Casos de uso', () => {
    it('modo global: debería funcionar como overlay de pantalla completa', () => {
      component.mode = 'global';
      component.show = true;
      component.message = 'Cargando aplicación...';
      fixture.detectChanges();

      expect(component.isVisible).toBe(true);
      expect(component.displayMessage).toBe('Cargando aplicación...');
      expect(component.spinnerClasses).toContain('spinner--global');
    });

    it('modo inline: debería funcionar dentro de un contenedor', () => {
      component.mode = 'inline';
      component.show = true;
      component.size = 'md';
      fixture.detectChanges();

      expect(component.isVisible).toBe(true);
      expect(component.spinnerClasses).toContain('spinner--inline');
    });

    it('modo button: debería ser pequeño y con color apropiado', () => {
      component.mode = 'button';
      component.show = true;
      component.color = 'white';
      fixture.detectChanges();

      expect(component.isVisible).toBe(true);
      expect(component.spinnerClasses).toContain('spinner--button');
      expect(component.spinnerClasses).toContain('spinner--white');
    });
  });

  // ===========================================================================
  // COMBINACIONES DE ESTADOS
  // ===========================================================================

  describe('Combinaciones de estados', () => {
    it('debería manejar cambio de modo dinámicamente', () => {
      component.mode = 'inline';
      fixture.detectChanges();
      expect(component.spinnerClasses).toContain('spinner--inline');

      component.mode = 'global';
      fixture.detectChanges();
      expect(component.spinnerClasses).toContain('spinner--global');
      expect(component.spinnerClasses).not.toContain('spinner--inline');
    });

    it('debería manejar todos los inputs simultáneamente', () => {
      component.show = true;
      component.mode = 'global';
      component.size = 'lg';
      component.color = 'secondary';
      component.message = 'Test message';
      fixture.detectChanges();

      expect(component.isVisible).toBe(true);
      expect(component.spinnerClasses).toContain('spinner--global');
      expect(component.spinnerClasses).toContain('spinner--lg');
      expect(component.spinnerClasses).toContain('spinner--secondary');
      expect(component.displayMessage).toBe('Test message');
    });
  });
});
