import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormControl, ReactiveFormsModule, FormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';
import { Component } from '@angular/core';

import { FormCheckbox } from './form-checkbox';

/**
 * Tests unitarios para FormCheckbox
 *
 * Cobertura:
 * - Creación del componente
 * - Inputs: label, id, disabled, error
 * - ControlValueAccessor: writeValue, onChange, onTouched, setDisabledState
 * - Getter wrapperClasses
 * - Interacción con Reactive Forms
 * - Accesibilidad
 */
describe('FormCheckbox', () => {
  let component: FormCheckbox;
  let fixture: ComponentFixture<FormCheckbox>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FormCheckbox, ReactiveFormsModule]
    }).compileComponents();

    fixture = TestBed.createComponent(FormCheckbox);
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

    it('debería tener valores por defecto correctos', () => {
      expect(component.label).toBe('');
      expect(component.id).toBe('');
      expect(component.disabled).toBe(false);
      expect(component.error).toBe('');
      expect(component.checked).toBe(false);
    });
  });

  // ===========================================================================
  // INPUTS
  // ===========================================================================

  describe('Inputs', () => {
    it('debería mostrar label', () => {
      component.label = 'Acepto términos';
      fixture.detectChanges();

      const labelEl = fixture.debugElement.query(By.css('.form-checkbox__text'));
      expect(labelEl.nativeElement.textContent).toContain('Acepto términos');
    });

    it('debería establecer el id del checkbox', () => {
      component.id = 'terms-checkbox';
      fixture.detectChanges();

      const inputEl = fixture.debugElement.query(By.css('.form-checkbox__input'));
      expect(inputEl.nativeElement.id).toBe('terms-checkbox');
    });

    it('debería deshabilitar el checkbox cuando disabled=true', () => {
      component.disabled = true;
      fixture.detectChanges();

      const inputEl = fixture.debugElement.query(By.css('.form-checkbox__input'));
      expect(inputEl.nativeElement.disabled).toBe(true);
    });

    it('debería mostrar mensaje de error', () => {
      component.error = 'Debes aceptar los términos';
      fixture.detectChanges();

      const errorEl = fixture.debugElement.query(By.css('.form-checkbox__error'));
      expect(errorEl).toBeTruthy();
      expect(errorEl.nativeElement.textContent).toContain('Debes aceptar los términos');
    });

    it('debería NO mostrar mensaje de error si está vacío', () => {
      component.error = '';
      fixture.detectChanges();

      const errorEl = fixture.debugElement.query(By.css('.form-checkbox__error'));
      expect(errorEl).toBeNull();
    });
  });

  // ===========================================================================
  // CONTROLVALUEACCESSOR
  // ===========================================================================

  describe('ControlValueAccessor', () => {
    describe('writeValue', () => {
      it('debería establecer checked=true cuando recibe true', () => {
        component.writeValue(true);
        expect(component.checked).toBe(true);
      });

      it('debería establecer checked=false cuando recibe false', () => {
        component.checked = true;
        component.writeValue(false);
        expect(component.checked).toBe(false);
      });

      it('debería convertir valores truthy a true', () => {
        component.writeValue(1 as any);
        expect(component.checked).toBe(true);
      });

      it('debería convertir valores falsy a false', () => {
        component.writeValue(null as any);
        expect(component.checked).toBe(false);

        component.writeValue(undefined as any);
        expect(component.checked).toBe(false);

        component.writeValue(0 as any);
        expect(component.checked).toBe(false);
      });
    });

    describe('registerOnChange', () => {
      it('debería registrar función onChange', () => {
        const fn = jasmine.createSpy('onChange');
        component.registerOnChange(fn);

        expect(component.onChange).toBe(fn);
      });
    });

    describe('registerOnTouched', () => {
      it('debería registrar función onTouched', () => {
        const fn = jasmine.createSpy('onTouched');
        component.registerOnTouched(fn);

        expect(component.onTouched).toBe(fn);
      });
    });

    describe('setDisabledState', () => {
      it('debería establecer disabled=true', () => {
        component.setDisabledState(true);
        expect(component.disabled).toBe(true);
      });

      it('debería establecer disabled=false', () => {
        component.disabled = true;
        component.setDisabledState(false);
        expect(component.disabled).toBe(false);
      });
    });
  });

  // ===========================================================================
  // MÉTODO onCheckboxChange
  // ===========================================================================

  describe('onCheckboxChange', () => {
    it('debería actualizar checked al cambiar', () => {
      const inputEl = fixture.debugElement.query(By.css('.form-checkbox__input'));

      inputEl.nativeElement.checked = true;
      inputEl.nativeElement.dispatchEvent(new Event('change'));

      expect(component.checked).toBe(true);
    });

    it('debería llamar onChange con el nuevo valor', () => {
      const onChangeSpy = jasmine.createSpy('onChange');
      component.registerOnChange(onChangeSpy);

      const inputEl = fixture.debugElement.query(By.css('.form-checkbox__input'));
      inputEl.nativeElement.checked = true;
      inputEl.nativeElement.dispatchEvent(new Event('change'));

      expect(onChangeSpy).toHaveBeenCalledWith(true);
    });

    it('debería llamar onTouched', () => {
      const onTouchedSpy = jasmine.createSpy('onTouched');
      component.registerOnTouched(onTouchedSpy);

      const inputEl = fixture.debugElement.query(By.css('.form-checkbox__input'));
      inputEl.nativeElement.checked = true;
      inputEl.nativeElement.dispatchEvent(new Event('change'));

      expect(onTouchedSpy).toHaveBeenCalled();
    });

    it('debería manejar toggle de true a false', () => {
      component.checked = true;
      fixture.detectChanges();

      const inputEl = fixture.debugElement.query(By.css('.form-checkbox__input'));
      inputEl.nativeElement.checked = false;
      inputEl.nativeElement.dispatchEvent(new Event('change'));

      expect(component.checked).toBe(false);
    });
  });

  // ===========================================================================
  // GETTER wrapperClasses
  // ===========================================================================

  describe('wrapperClasses getter', () => {
    it('debería incluir clase base "form-checkbox"', () => {
      expect(component.wrapperClasses).toContain('form-checkbox');
    });

    it('debería incluir clase error cuando hay error', () => {
      component.error = 'Error';
      expect(component.wrapperClasses).toContain('form-checkbox--error');
    });

    it('debería NO incluir clase error cuando no hay error', () => {
      component.error = '';
      expect(component.wrapperClasses).not.toContain('form-checkbox--error');
    });

    it('debería incluir clase disabled cuando está deshabilitado', () => {
      component.disabled = true;
      expect(component.wrapperClasses).toContain('form-checkbox--disabled');
    });

    it('debería NO incluir clase disabled cuando está habilitado', () => {
      component.disabled = false;
      expect(component.wrapperClasses).not.toContain('form-checkbox--disabled');
    });

    it('debería incluir clase checked cuando está marcado', () => {
      component.checked = true;
      expect(component.wrapperClasses).toContain('form-checkbox--checked');
    });

    it('debería NO incluir clase checked cuando no está marcado', () => {
      component.checked = false;
      expect(component.wrapperClasses).not.toContain('form-checkbox--checked');
    });

    it('debería manejar múltiples estados combinados', () => {
      component.error = 'Error';
      component.disabled = true;
      component.checked = true;

      const classes = component.wrapperClasses;
      expect(classes).toContain('form-checkbox');
      expect(classes).toContain('form-checkbox--error');
      expect(classes).toContain('form-checkbox--disabled');
      expect(classes).toContain('form-checkbox--checked');
    });
  });

  // ===========================================================================
  // INTEGRACIÓN CON REACTIVE FORMS
  // ===========================================================================

  describe('Integración con Reactive Forms', () => {
    @Component({
      template: `<app-form-checkbox [formControl]="control" label="Test"></app-form-checkbox>`,
      standalone: true,
      imports: [FormCheckbox, ReactiveFormsModule]
    })
    class TestHostComponent {
      control = new FormControl(false);
    }

    let hostFixture: ComponentFixture<TestHostComponent>;
    let hostComponent: TestHostComponent;

    beforeEach(async () => {
      // Reset para poder reconfigurar TestBed
      TestBed.resetTestingModule();
      await TestBed.configureTestingModule({
        imports: [TestHostComponent]
      }).compileComponents();

      hostFixture = TestBed.createComponent(TestHostComponent);
      hostComponent = hostFixture.componentInstance;
      hostFixture.detectChanges();
    });

    it('debería sincronizar con FormControl inicial false', () => {
      const checkbox = hostFixture.debugElement.query(By.directive(FormCheckbox));
      expect(checkbox.componentInstance.checked).toBe(false);
    });

    it('debería sincronizar con FormControl inicial true', () => {
      hostComponent.control.setValue(true);
      hostFixture.detectChanges();

      const checkbox = hostFixture.debugElement.query(By.directive(FormCheckbox));
      expect(checkbox.componentInstance.checked).toBe(true);
    });

    it('debería actualizar FormControl cuando se hace click', () => {
      const inputEl = hostFixture.debugElement.query(By.css('.form-checkbox__input'));
      inputEl.nativeElement.checked = true;
      inputEl.nativeElement.dispatchEvent(new Event('change'));

      expect(hostComponent.control.value).toBe(true);
    });

    it('debería deshabilitarse cuando FormControl está disabled', () => {
      hostComponent.control.disable();
      hostFixture.detectChanges();

      const checkbox = hostFixture.debugElement.query(By.directive(FormCheckbox));
      expect(checkbox.componentInstance.disabled).toBe(true);
    });
  });

  // ===========================================================================
  // VISUAL FEEDBACK (Checkmark SVG)
  // ===========================================================================

  describe('Visual feedback', () => {
    it('debería mostrar checkmark SVG cuando checked=true', () => {
      component.checked = true;
      fixture.detectChanges();

      const svg = fixture.debugElement.query(By.css('.form-checkbox__check'));
      expect(svg).toBeTruthy();
    });

    it('debería ocultar checkmark SVG cuando checked=false', () => {
      component.checked = false;
      fixture.detectChanges();

      const svg = fixture.debugElement.query(By.css('.form-checkbox__check'));
      expect(svg).toBeNull();
    });
  });
});
