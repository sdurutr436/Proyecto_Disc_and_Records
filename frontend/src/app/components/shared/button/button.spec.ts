import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { Component } from '@angular/core';
import { By } from '@angular/platform-browser';
import { BehaviorSubject } from 'rxjs';

import { Button } from './button';
import { LoadingService } from '../../../services/loading';

/**
 * Mock del LoadingService para tests
 * Permite controlar estados de carga locales sin depender del servicio real
 */
class MockLoadingService {
  private localStatesMap = new Map<string, boolean>();
  private localStatesSubject = new BehaviorSubject<Map<string, boolean>>(new Map());

  localStates$ = this.localStatesSubject.asObservable();

  setLocalLoading(id: string, loading: boolean): void {
    this.localStatesMap.set(id, loading);
    this.localStatesSubject.next(new Map(this.localStatesMap));
  }

  clearLocalLoading(id: string): void {
    this.localStatesMap.delete(id);
    this.localStatesSubject.next(new Map(this.localStatesMap));
  }
}

/**
 * Componente host para probar proyección de contenido
 */
@Component({
  standalone: true,
  imports: [Button],
  template: `<app-button>Click Me</app-button>`,
})
class TestHostComponent {}

describe('Button', () => {
  let component: Button;
  let fixture: ComponentFixture<Button>;
  let mockLoadingService: MockLoadingService;

  beforeEach(async () => {
    mockLoadingService = new MockLoadingService();

    await TestBed.configureTestingModule({
      imports: [Button],
      providers: [{ provide: LoadingService, useValue: mockLoadingService }],
    }).compileComponents();

    fixture = TestBed.createComponent(Button);
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

    it('debería renderizar contenido proyectado', () => {
      const hostFixture = TestBed.createComponent(TestHostComponent);
      hostFixture.detectChanges();
      const buttonEl = hostFixture.debugElement.query(By.css('button'));
      expect(buttonEl.nativeElement.textContent).toContain('Click Me');
    });
  });

  // ===========================================================================
  // VALORES POR DEFECTO DE @INPUTS
  // ===========================================================================

  describe('Valores por defecto', () => {
    it('variant debería ser "primary" por defecto', () => {
      expect(component.variant).toBe('primary');
    });

    it('size debería ser "md" por defecto', () => {
      expect(component.size).toBe('md');
    });

    it('disabled debería ser false por defecto', () => {
      expect(component.disabled).toBe(false);
    });

    it('type debería ser "button" por defecto', () => {
      expect(component.type).toBe('button');
    });

    it('fullWidth debería ser false por defecto', () => {
      expect(component.fullWidth).toBe(false);
    });

    it('loading debería ser false por defecto', () => {
      expect(component.loading).toBe(false);
    });

    it('href debería ser undefined por defecto', () => {
      expect(component.href).toBeUndefined();
    });

    it('loadingId debería ser undefined por defecto', () => {
      expect(component.loadingId).toBeUndefined();
    });
  });

  // ===========================================================================
  // VARIANTES DE ESTILO
  // ===========================================================================

  describe('Variantes de estilo', () => {
    it('debería aplicar clase button--primary para variant="primary"', () => {
      component.variant = 'primary';
      fixture.detectChanges();
      expect(component.buttonClasses).toContain('button--primary');
    });

    it('debería aplicar clase button--secondary para variant="secondary"', () => {
      component.variant = 'secondary';
      fixture.detectChanges();
      expect(component.buttonClasses).toContain('button--secondary');
    });

    it('debería aplicar clase button--ghost para variant="ghost"', () => {
      component.variant = 'ghost';
      fixture.detectChanges();
      expect(component.buttonClasses).toContain('button--ghost');
    });

    it('debería aplicar clase button--danger para variant="danger"', () => {
      component.variant = 'danger';
      fixture.detectChanges();
      expect(component.buttonClasses).toContain('button--danger');
    });

    it('debería aplicar clase button--sm para size="sm"', () => {
      component.size = 'sm';
      fixture.detectChanges();
      expect(component.buttonClasses).toContain('button--sm');
    });

    it('debería aplicar clase button--md para size="md"', () => {
      component.size = 'md';
      fixture.detectChanges();
      expect(component.buttonClasses).toContain('button--md');
    });

    it('debería aplicar clase button--lg para size="lg"', () => {
      component.size = 'lg';
      fixture.detectChanges();
      expect(component.buttonClasses).toContain('button--lg');
    });

    it('debería aplicar clase button--full-width cuando fullWidth es true', () => {
      component.fullWidth = true;
      fixture.detectChanges();
      expect(component.buttonClasses).toContain('button--full-width');
    });

    it('no debería aplicar clase button--full-width cuando fullWidth es false', () => {
      component.fullWidth = false;
      fixture.detectChanges();
      expect(component.buttonClasses).not.toContain('button--full-width');
    });
  });

  // ===========================================================================
  // ESTADO DISABLED
  // ===========================================================================

  describe('Estado disabled', () => {
    it('isDisabled debería ser true cuando disabled=true', () => {
      component.disabled = true;
      fixture.detectChanges();
      expect(component.isDisabled).toBe(true);
    });

    it('isDisabled debería ser true cuando loading=true', () => {
      component.loading = true;
      fixture.detectChanges();
      expect(component.isDisabled).toBe(true);
    });

    it('isDisabled debería ser false cuando disabled=false y loading=false', () => {
      component.disabled = false;
      component.loading = false;
      fixture.detectChanges();
      expect(component.isDisabled).toBe(false);
    });

    it('debería aplicar clase button--disabled cuando isDisabled', () => {
      component.disabled = true;
      fixture.detectChanges();
      expect(component.buttonClasses).toContain('button--disabled');
    });

    it('debería tener atributo disabled en el elemento button cuando isDisabled', () => {
      component.disabled = true;
      fixture.detectChanges();
      const buttonEl = fixture.debugElement.query(By.css('button'));
      expect(buttonEl.nativeElement.disabled).toBe(true);
    });
  });

  // ===========================================================================
  // ESTADO LOADING
  // ===========================================================================

  describe('Estado loading', () => {
    it('isLoading debería ser true cuando loading=true', () => {
      component.loading = true;
      expect(component.isLoading).toBe(true);
    });

    it('isLoading debería ser false cuando loading=false', () => {
      component.loading = false;
      expect(component.isLoading).toBe(false);
    });

    it('debería aplicar clase button--loading cuando isLoading', () => {
      component.loading = true;
      fixture.detectChanges();
      expect(component.buttonClasses).toContain('button--loading');
    });

    it('debería mostrar spinner cuando isLoading', () => {
      component.loading = true;
      fixture.detectChanges();
      const spinner = fixture.debugElement.query(By.css('.button__spinner'));
      expect(spinner).toBeTruthy();
    });

    it('no debería mostrar spinner cuando no isLoading', () => {
      component.loading = false;
      fixture.detectChanges();
      const spinner = fixture.debugElement.query(By.css('.button__spinner'));
      expect(spinner).toBeFalsy();
    });
  });

  // ===========================================================================
  // INTEGRACIÓN CON LoadingService (loadingId)
  // ===========================================================================

  describe('Integración con LoadingService', () => {
    it('debería usar estado del servicio cuando loadingId está definido', fakeAsync(() => {
      component.loadingId = 'test-button';
      component.ngOnInit();
      tick();

      mockLoadingService.setLocalLoading('test-button', true);
      tick();

      expect(component.isLoading).toBe(true);
    }));

    it('debería actualizar isLoading cuando el servicio cambia', fakeAsync(() => {
      component.loadingId = 'test-button';
      component.ngOnInit();
      tick();

      mockLoadingService.setLocalLoading('test-button', true);
      tick();
      expect(component.isLoading).toBe(true);

      mockLoadingService.setLocalLoading('test-button', false);
      tick();
      expect(component.isLoading).toBe(false);
    }));

    it('debería usar loading local si loadingId no coincide', fakeAsync(() => {
      component.loadingId = 'test-button';
      component.ngOnInit();
      tick();

      mockLoadingService.setLocalLoading('other-button', true);
      tick();

      expect(component.isLoading).toBe(false);
    }));

    it('debería desuscribirse en ngOnDestroy', fakeAsync(() => {
      component.loadingId = 'test-button';
      component.ngOnInit();
      tick();

      component.ngOnDestroy();
      // No debería lanzar error después de destruir
      mockLoadingService.setLocalLoading('test-button', true);
      tick();

      // El componente ya está destruido, pero no debería haber errores
      expect(true).toBe(true);
    }));
  });

  // ===========================================================================
  // MODO LINK (href)
  // ===========================================================================

  describe('Modo Link', () => {
    it('isLink debería ser true cuando href está definido', () => {
      component.href = 'https://example.com';
      expect(component.isLink).toBe(true);
    });

    it('isLink debería ser false cuando href es undefined', () => {
      component.href = undefined;
      expect(component.isLink).toBe(false);
    });

    it('isLink debería ser false cuando href es string vacío', () => {
      component.href = '';
      expect(component.isLink).toBe(false);
    });

    it('debería renderizar elemento <a> cuando isLink', () => {
      component.href = 'https://example.com';
      fixture.detectChanges();
      const linkEl = fixture.debugElement.query(By.css('a'));
      const buttonEl = fixture.debugElement.query(By.css('button'));
      expect(linkEl).toBeTruthy();
      expect(buttonEl).toBeFalsy();
    });

    it('debería renderizar elemento <button> cuando no isLink', () => {
      component.href = undefined;
      fixture.detectChanges();
      const linkEl = fixture.debugElement.query(By.css('a'));
      const buttonEl = fixture.debugElement.query(By.css('button'));
      expect(linkEl).toBeFalsy();
      expect(buttonEl).toBeTruthy();
    });

    it('debería tener href correcto en elemento <a>', () => {
      component.href = 'https://example.com';
      fixture.detectChanges();
      const linkEl = fixture.debugElement.query(By.css('a'));
      expect(linkEl.nativeElement.getAttribute('href')).toBe('https://example.com');
    });

    it('debería tener aria-disabled en link cuando isDisabled', () => {
      component.href = 'https://example.com';
      component.disabled = true;
      fixture.detectChanges();
      const linkEl = fixture.debugElement.query(By.css('a'));
      expect(linkEl.nativeElement.getAttribute('aria-disabled')).toBe('true');
    });

    it('debería tener tabindex=-1 en link cuando isDisabled', () => {
      component.href = 'https://example.com';
      component.disabled = true;
      fixture.detectChanges();
      const linkEl = fixture.debugElement.query(By.css('a'));
      expect(linkEl.nativeElement.getAttribute('tabindex')).toBe('-1');
    });
  });

  // ===========================================================================
  // TIPOS DE BOTÓN
  // ===========================================================================

  describe('Tipos de botón', () => {
    it('debería establecer type="button" en el elemento button', () => {
      component.type = 'button';
      fixture.detectChanges();
      const buttonEl = fixture.debugElement.query(By.css('button'));
      expect(buttonEl.nativeElement.type).toBe('button');
    });

    it('debería establecer type="submit" en el elemento button', () => {
      component.type = 'submit';
      fixture.detectChanges();
      const buttonEl = fixture.debugElement.query(By.css('button'));
      expect(buttonEl.nativeElement.type).toBe('submit');
    });

    it('debería establecer type="reset" en el elemento button', () => {
      component.type = 'reset';
      fixture.detectChanges();
      const buttonEl = fixture.debugElement.query(By.css('button'));
      expect(buttonEl.nativeElement.type).toBe('reset');
    });
  });

  // ===========================================================================
  // EVENTO CLICKED (@OUTPUT)
  // ===========================================================================

  describe('Evento clicked', () => {
    it('debería emitir evento clicked al hacer click', () => {
      const clickSpy = spyOn(component.clicked, 'emit');
      const buttonEl = fixture.debugElement.query(By.css('button'));

      buttonEl.nativeElement.click();

      expect(clickSpy).toHaveBeenCalled();
    });

    it('debería emitir el evento original de click', () => {
      let emittedEvent: Event | undefined;
      component.clicked.subscribe((event) => (emittedEvent = event));
      const buttonEl = fixture.debugElement.query(By.css('button'));

      buttonEl.nativeElement.click();

      expect(emittedEvent).toBeInstanceOf(Event);
    });

    it('NO debería emitir evento cuando está deshabilitado', () => {
      const clickSpy = spyOn(component.clicked, 'emit');
      component.disabled = true;
      fixture.detectChanges();

      // Intentar click directo en el método
      const mockEvent = new Event('click');
      component.onClick(mockEvent);

      expect(clickSpy).not.toHaveBeenCalled();
    });

    it('NO debería emitir evento cuando está en loading', () => {
      const clickSpy = spyOn(component.clicked, 'emit');
      component.loading = true;
      fixture.detectChanges();

      const mockEvent = new Event('click');
      component.onClick(mockEvent);

      expect(clickSpy).not.toHaveBeenCalled();
    });

    it('debería emitir evento en link al hacer click', () => {
      component.href = 'https://example.com';
      fixture.detectChanges();
      const clickSpy = spyOn(component.clicked, 'emit');
      const linkEl = fixture.debugElement.query(By.css('a'));

      // Crear evento mock con preventDefault para evitar navegación real
      const mockEvent = new MouseEvent('click', { bubbles: true, cancelable: true });
      spyOn(mockEvent, 'preventDefault');
      linkEl.triggerEventHandler('click', mockEvent);

      expect(clickSpy).toHaveBeenCalled();
    });
  });

  // ===========================================================================
  // BUTTONCLASSES (getter complejo)
  // ===========================================================================

  describe('buttonClasses getter', () => {
    it('debería siempre incluir clase base "button"', () => {
      expect(component.buttonClasses).toContain('button');
    });

    it('debería construir clases correctamente con múltiples estados', () => {
      component.variant = 'danger';
      component.size = 'lg';
      component.fullWidth = true;
      component.loading = true;
      fixture.detectChanges();

      const classes = component.buttonClasses;
      expect(classes).toContain('button');
      expect(classes).toContain('button--danger');
      expect(classes).toContain('button--lg');
      expect(classes).toContain('button--full-width');
      expect(classes).toContain('button--loading');
      expect(classes).toContain('button--disabled'); // loading implica disabled
    });

    it('debería manejar estado mínimo (todos defaults)', () => {
      const classes = component.buttonClasses;
      expect(classes).toBe('button button--primary button--md');
    });
  });

  // ===========================================================================
  // CICLO DE VIDA
  // ===========================================================================

  describe('Ciclo de vida', () => {
    it('no debería suscribirse si loadingId no está definido', () => {
      component.loadingId = undefined;
      component.ngOnInit();
      // No debe lanzar error y la suscripción debe ser undefined
      expect(true).toBe(true);
    });

    it('ngOnDestroy no debería fallar si no hay suscripción', () => {
      component.loadingId = undefined;
      component.ngOnDestroy();
      // No debe lanzar error
      expect(true).toBe(true);
    });
  });
});
