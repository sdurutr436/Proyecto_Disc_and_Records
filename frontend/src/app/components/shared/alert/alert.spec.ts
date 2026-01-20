import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';

import { Alert } from './alert';

describe('Alert', () => {
  let component: Alert;
  let fixture: ComponentFixture<Alert>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Alert],
    }).compileComponents();

    fixture = TestBed.createComponent(Alert);
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

    it('debería renderizar elemento con role="alert"', () => {
      const alertEl = fixture.debugElement.query(By.css('[role="alert"]'));
      expect(alertEl).toBeTruthy();
    });
  });

  // ===========================================================================
  // VALORES POR DEFECTO DE @INPUTS
  // ===========================================================================

  describe('Valores por defecto', () => {
    it('type debería ser "info" por defecto', () => {
      expect(component.type).toBe('info');
    });

    it('title debería ser string vacío por defecto', () => {
      expect(component.title).toBe('');
    });

    it('message debería ser string vacío por defecto', () => {
      expect(component.message).toBe('');
    });

    it('icon debería ser string vacío por defecto', () => {
      expect(component.icon).toBe('');
    });

    it('dismissible debería ser false por defecto', () => {
      expect(component.dismissible).toBe(false);
    });

    it('isVisible debería ser true por defecto', () => {
      expect(component.isVisible).toBe(true);
    });
  });

  // ===========================================================================
  // TIPOS DE ALERTA
  // ===========================================================================

  describe('Tipos de alerta', () => {
    const types = ['success', 'error', 'warning', 'info'] as const;

    types.forEach((type) => {
      it(`debería aplicar clase alert--${type} para type="${type}"`, () => {
        component.type = type;
        fixture.detectChanges();
        expect(component.alertClasses).toContain(`alert--${type}`);
      });
    });
  });

  // ===========================================================================
  // ICONOS POR DEFECTO
  // ===========================================================================

  describe('Iconos por defecto (defaultIcon)', () => {
    it('debería retornar "✓" para type="success"', () => {
      component.type = 'success';
      expect(component.defaultIcon).toBe('✓');
    });

    it('debería retornar "✕" para type="error"', () => {
      component.type = 'error';
      expect(component.defaultIcon).toBe('✕');
    });

    it('debería retornar "⚠" para type="warning"', () => {
      component.type = 'warning';
      expect(component.defaultIcon).toBe('⚠');
    });

    it('debería retornar "ℹ" para type="info"', () => {
      component.type = 'info';
      expect(component.defaultIcon).toBe('ℹ');
    });

    it('debería retornar "ℹ" para tipo desconocido (fallback)', () => {
      // Forzar tipo inválido para probar el default del switch
      (component as any).type = 'unknown';
      expect(component.defaultIcon).toBe('ℹ');
    });

    it('debería usar icono personalizado si se proporciona', () => {
      component.icon = '🔔';
      expect(component.defaultIcon).toBe('🔔');
    });

    it('icono personalizado debería tener prioridad sobre icono por defecto', () => {
      component.type = 'success';
      component.icon = '🎉';
      expect(component.defaultIcon).toBe('🎉');
    });
  });

  // ===========================================================================
  // CONTENIDO (TITLE Y MESSAGE)
  // ===========================================================================

  describe('Contenido', () => {
    it('debería mostrar el título cuando se proporciona', () => {
      component.title = 'Éxito';
      fixture.detectChanges();
      const titleEl = fixture.debugElement.query(By.css('.alert__title'));
      expect(titleEl).toBeTruthy();
      expect(titleEl.nativeElement.textContent).toContain('Éxito');
    });

    it('no debería mostrar título cuando está vacío', () => {
      component.title = '';
      fixture.detectChanges();
      const titleEl = fixture.debugElement.query(By.css('.alert__title'));
      expect(titleEl).toBeFalsy();
    });

    it('debería mostrar el mensaje cuando se proporciona', () => {
      component.message = 'Operación completada correctamente';
      fixture.detectChanges();
      const messageEl = fixture.debugElement.query(By.css('.alert__message'));
      expect(messageEl).toBeTruthy();
      expect(messageEl.nativeElement.textContent).toContain('Operación completada correctamente');
    });

    it('no debería mostrar mensaje cuando está vacío', () => {
      component.message = '';
      fixture.detectChanges();
      const messageEl = fixture.debugElement.query(By.css('.alert__message'));
      expect(messageEl).toBeFalsy();
    });

    it('debería mostrar título y mensaje juntos', () => {
      component.title = 'Error';
      component.message = 'No se pudo completar la operación';
      fixture.detectChanges();

      const titleEl = fixture.debugElement.query(By.css('.alert__title'));
      const messageEl = fixture.debugElement.query(By.css('.alert__message'));

      expect(titleEl.nativeElement.textContent).toContain('Error');
      expect(messageEl.nativeElement.textContent).toContain('No se pudo completar la operación');
    });
  });

  // ===========================================================================
  // FUNCIONALIDAD DISMISSIBLE
  // ===========================================================================

  describe('Funcionalidad dismissible', () => {
    it('no debería mostrar botón de cerrar cuando dismissible=false', () => {
      component.dismissible = false;
      fixture.detectChanges();
      const dismissBtn = fixture.debugElement.query(By.css('.alert__dismiss'));
      expect(dismissBtn).toBeFalsy();
    });

    it('debería mostrar botón de cerrar cuando dismissible=true', () => {
      component.dismissible = true;
      fixture.detectChanges();
      const dismissBtn = fixture.debugElement.query(By.css('.alert__dismiss'));
      expect(dismissBtn).toBeTruthy();
    });

    it('el botón de cerrar debería tener aria-label', () => {
      component.dismissible = true;
      fixture.detectChanges();
      const dismissBtn = fixture.debugElement.query(By.css('.alert__dismiss'));
      expect(dismissBtn.nativeElement.getAttribute('aria-label')).toBe('Cerrar alerta');
    });

    it('debería ocultar la alerta al hacer click en cerrar', () => {
      component.dismissible = true;
      fixture.detectChanges();

      expect(component.isVisible).toBe(true);

      const dismissBtn = fixture.debugElement.query(By.css('.alert__dismiss'));
      dismissBtn.nativeElement.click();
      fixture.detectChanges();

      expect(component.isVisible).toBe(false);
    });

    it('debería emitir evento dismissed al cerrar', () => {
      component.dismissible = true;
      fixture.detectChanges();

      const dismissSpy = spyOn(component.dismissed, 'emit');
      const dismissBtn = fixture.debugElement.query(By.css('.alert__dismiss'));

      dismissBtn.nativeElement.click();

      expect(dismissSpy).toHaveBeenCalled();
    });

    it('no debería renderizar el contenedor cuando isVisible=false', () => {
      component.isVisible = false;
      fixture.detectChanges();
      const alertEl = fixture.debugElement.query(By.css('[role="alert"]'));
      expect(alertEl).toBeFalsy();
    });
  });

  // ===========================================================================
  // MÉTODO onDismiss
  // ===========================================================================

  describe('Método onDismiss', () => {
    it('debería establecer isVisible a false', () => {
      component.isVisible = true;
      component.onDismiss();
      expect(component.isVisible).toBe(false);
    });

    it('debería emitir evento dismissed', () => {
      const dismissSpy = spyOn(component.dismissed, 'emit');
      component.onDismiss();
      expect(dismissSpy).toHaveBeenCalled();
    });

    it('debería funcionar múltiples veces sin error', () => {
      component.onDismiss();
      component.onDismiss();
      expect(component.isVisible).toBe(false);
    });
  });

  // ===========================================================================
  // ALERTCLASSES GETTER
  // ===========================================================================

  describe('alertClasses getter', () => {
    it('debería incluir clase base "alert"', () => {
      expect(component.alertClasses).toContain('alert');
    });

    it('debería incluir clase de tipo', () => {
      component.type = 'warning';
      fixture.detectChanges();
      expect(component.alertClasses).toContain('alert--warning');
    });

    it('debería incluir clase hidden cuando isVisible=false', () => {
      component.isVisible = false;
      expect(component.alertClasses).toContain('alert--hidden');
    });

    it('no debería incluir clase hidden cuando isVisible=true', () => {
      component.isVisible = true;
      expect(component.alertClasses).not.toContain('alert--hidden');
    });

    it('debería construir clases correctamente', () => {
      component.type = 'error';
      component.isVisible = true;
      fixture.detectChanges();

      expect(component.alertClasses).toBe('alert alert--error');
    });
  });

  // ===========================================================================
  // RENDERIZADO DE ICONO
  // ===========================================================================

  describe('Renderizado de icono', () => {
    it('debería mostrar icono en el DOM', () => {
      component.type = 'success';
      fixture.detectChanges();
      const iconEl = fixture.debugElement.query(By.css('.alert__icon'));
      expect(iconEl).toBeTruthy();
      expect(iconEl.nativeElement.textContent).toContain('✓');
    });

    it('debería mostrar icono personalizado en el DOM', () => {
      component.icon = '🚀';
      fixture.detectChanges();
      const iconEl = fixture.debugElement.query(By.css('.alert__icon'));
      expect(iconEl.nativeElement.textContent).toContain('🚀');
    });
  });

  // ===========================================================================
  // CASOS DE USO COMPLETOS
  // ===========================================================================

  describe('Casos de uso completos', () => {
    it('alerta de éxito completa', () => {
      component.type = 'success';
      component.title = 'Guardado';
      component.message = 'Los cambios se han guardado correctamente';
      component.dismissible = true;
      fixture.detectChanges();

      expect(component.defaultIcon).toBe('✓');
      expect(component.alertClasses).toContain('alert--success');

      const titleEl = fixture.debugElement.query(By.css('.alert__title'));
      const messageEl = fixture.debugElement.query(By.css('.alert__message'));
      const dismissBtn = fixture.debugElement.query(By.css('.alert__dismiss'));

      expect(titleEl.nativeElement.textContent).toContain('Guardado');
      expect(messageEl.nativeElement.textContent).toContain('Los cambios se han guardado correctamente');
      expect(dismissBtn).toBeTruthy();
    });

    it('alerta de error no descartable', () => {
      component.type = 'error';
      component.title = 'Error crítico';
      component.message = 'No se puede continuar';
      component.dismissible = false;
      fixture.detectChanges();

      expect(component.defaultIcon).toBe('✕');
      expect(component.alertClasses).toContain('alert--error');

      const dismissBtn = fixture.debugElement.query(By.css('.alert__dismiss'));
      expect(dismissBtn).toBeFalsy();
    });

    it('alerta solo con mensaje', () => {
      component.type = 'info';
      component.message = 'Información importante';
      fixture.detectChanges();

      const titleEl = fixture.debugElement.query(By.css('.alert__title'));
      const messageEl = fixture.debugElement.query(By.css('.alert__message'));

      expect(titleEl).toBeFalsy();
      expect(messageEl.nativeElement.textContent).toContain('Información importante');
    });

    it('alerta solo con título', () => {
      component.type = 'warning';
      component.title = '¡Atención!';
      fixture.detectChanges();

      const titleEl = fixture.debugElement.query(By.css('.alert__title'));
      const messageEl = fixture.debugElement.query(By.css('.alert__message'));

      expect(titleEl.nativeElement.textContent).toContain('¡Atención!');
      expect(messageEl).toBeFalsy();
    });
  });

  // ===========================================================================
  // ACCESIBILIDAD
  // ===========================================================================

  describe('Accesibilidad', () => {
    it('debería tener role="alert" para lectores de pantalla', () => {
      fixture.detectChanges();
      const alertEl = fixture.debugElement.query(By.css('[role="alert"]'));
      expect(alertEl).toBeTruthy();
    });

    it('botón de cerrar debería ser de tipo "button"', () => {
      component.dismissible = true;
      fixture.detectChanges();
      const dismissBtn = fixture.debugElement.query(By.css('.alert__dismiss'));
      expect(dismissBtn.nativeElement.type).toBe('button');
    });
  });
});
