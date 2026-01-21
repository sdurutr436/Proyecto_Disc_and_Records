import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormSelect, SelectOption } from './form-select';
import { Component, viewChild } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';

@Component({
  standalone: true,
  imports: [FormSelect, ReactiveFormsModule],
  template: `
    <app-form-select
      [label]="label"
      [id]="id"
      [placeholder]="placeholder"
      [options]="options"
      [disabled]="isDisabled"
      [error]="error"
      [hint]="hint"
      [formControl]="control"
    />
  `
})
class TestHostComponent {
  select = viewChild(FormSelect);
  control = new FormControl('');
  label = 'Country';
  id = 'country';
  placeholder = 'Select a country';
  options: SelectOption[] = [
    { value: 'es', label: 'Spain' },
    { value: 'fr', label: 'France' },
    { value: 'de', label: 'Germany' }
  ];
  isDisabled = false;
  error = '';
  hint = '';
}

describe('FormSelect', () => {
  let component: FormSelect;
  let fixture: ComponentFixture<FormSelect>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FormSelect]
    }).compileComponents();
  });

  describe('Creación', () => {
    it('debería crear el componente', () => {
      fixture = TestBed.createComponent(FormSelect);
      component = fixture.componentInstance;
      expect(component).toBeTruthy();
    });
  });

  describe('Estado inicial', () => {
    beforeEach(() => {
      fixture = TestBed.createComponent(FormSelect);
      component = fixture.componentInstance;
    });

    it('debería tener label vacío por defecto', () => {
      expect(component.label).toBe('');
    });

    it('debería tener id vacío por defecto', () => {
      expect(component.id).toBe('');
    });

    it('debería tener placeholder por defecto', () => {
      expect(component.placeholder).toBe('Selecciona una opción');
    });

    it('debería tener options vacío por defecto', () => {
      expect(component.options).toEqual([]);
    });

    it('debería tener disabled false por defecto', () => {
      expect(component.disabled).toBeFalse();
    });

    it('debería tener value vacío por defecto', () => {
      expect(component.value).toBe('');
    });

    it('debería tener isFocused false por defecto', () => {
      expect(component.isFocused).toBeFalse();
    });
  });

  describe('ControlValueAccessor', () => {
    beforeEach(() => {
      fixture = TestBed.createComponent(FormSelect);
      component = fixture.componentInstance;
    });

    describe('writeValue', () => {
      it('debería escribir valor string', () => {
        component.writeValue('es');
        expect(component.value).toBe('es');
      });

      it('debería escribir valor numérico', () => {
        component.writeValue(1);
        expect(component.value).toBe(1);
      });

      it('debería manejar null convirtiéndolo a string vacío', () => {
        component.writeValue(null as any);
        expect(component.value).toBe('');
      });

      it('debería manejar undefined convirtiéndolo a string vacío', () => {
        component.writeValue(undefined as any);
        expect(component.value).toBe('');
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
      it('debería establecer disabled true', () => {
        component.setDisabledState(true);
        expect(component.disabled).toBeTrue();
      });

      it('debería establecer disabled false', () => {
        component.setDisabledState(false);
        expect(component.disabled).toBeFalse();
      });
    });
  });

  describe('Eventos', () => {
    beforeEach(() => {
      fixture = TestBed.createComponent(FormSelect);
      component = fixture.componentInstance;
    });

    describe('onSelectChange', () => {
      it('debería actualizar value y llamar onChange', () => {
        const fn = jasmine.createSpy('onChange');
        component.registerOnChange(fn);

        const event = { target: { value: 'fr' } } as unknown as Event;
        component.onSelectChange(event);

        expect(component.value).toBe('fr');
        expect(fn).toHaveBeenCalledWith('fr');
      });
    });

    describe('onFocus', () => {
      it('debería establecer isFocused true', () => {
        component.onFocus();
        expect(component.isFocused).toBeTrue();
      });
    });

    describe('onBlur', () => {
      it('debería establecer isFocused false', () => {
        component.isFocused = true;
        component.onBlur();
        expect(component.isFocused).toBeFalse();
      });

      it('debería llamar onTouched', () => {
        const fn = jasmine.createSpy('onTouched');
        component.registerOnTouched(fn);

        component.onBlur();

        expect(fn).toHaveBeenCalled();
      });
    });
  });

  describe('wrapperClasses', () => {
    beforeEach(() => {
      fixture = TestBed.createComponent(FormSelect);
      component = fixture.componentInstance;
    });

    it('debería retornar clase base', () => {
      expect(component.wrapperClasses).toBe('form-select');
    });

    it('debería agregar clase error', () => {
      component.error = 'Error message';
      expect(component.wrapperClasses).toContain('form-select--error');
    });

    it('debería agregar clase disabled', () => {
      component.disabled = true;
      expect(component.wrapperClasses).toContain('form-select--disabled');
    });

    it('debería agregar clase focused', () => {
      component.isFocused = true;
      expect(component.wrapperClasses).toContain('form-select--focused');
    });

    it('debería combinar múltiples clases', () => {
      component.error = 'Error';
      component.disabled = true;

      expect(component.wrapperClasses).toContain('form-select--error');
      expect(component.wrapperClasses).toContain('form-select--disabled');
    });
  });

  describe('Con Host Component', () => {
    let hostFixture: ComponentFixture<TestHostComponent>;
    let hostComponent: TestHostComponent;

    beforeEach(async () => {
      hostFixture = TestBed.createComponent(TestHostComponent);
      hostComponent = hostFixture.componentInstance;
      hostFixture.detectChanges();
    });

    it('debería crear select dentro del host', () => {
      expect(hostComponent.select()).toBeTruthy();
    });

    it('debería recibir label del host', () => {
      expect(hostComponent.select()!.label).toBe('Country');
    });

    it('debería recibir id del host', () => {
      expect(hostComponent.select()!.id).toBe('country');
    });

    it('debería recibir placeholder del host', () => {
      expect(hostComponent.select()!.placeholder).toBe('Select a country');
    });

    it('debería recibir options del host', () => {
      expect(hostComponent.select()!.options.length).toBe(3);
    });

    it('debería sincronizar con FormControl', () => {
      hostComponent.control.setValue('de');
      hostFixture.detectChanges();

      expect(hostComponent.select()!.value).toBe('de');
    });

    it('debería propagar cambios al FormControl', () => {
      const event = { target: { value: 'fr' } } as unknown as Event;
      hostComponent.select()!.onSelectChange(event);

      expect(hostComponent.control.value).toBe('fr');
    });

    it('debería recibir error del host', () => {
      hostComponent.error = 'Selection required';
      hostFixture.detectChanges();

      expect(hostComponent.select()!.error).toBe('Selection required');
    });

    it('debería recibir hint del host', () => {
      hostComponent.hint = 'Choose your country';
      hostFixture.detectChanges();

      expect(hostComponent.select()!.hint).toBe('Choose your country');
    });

    describe('Options con valores numéricos', () => {
      it('debería aceptar options con value numérico', () => {
        hostComponent.options = [
          { value: 1, label: 'Option 1' },
          { value: 2, label: 'Option 2' }
        ];
        hostFixture.detectChanges();

        expect(hostComponent.select()!.options[0].value).toBe(1);
      });
    });
  });
});
