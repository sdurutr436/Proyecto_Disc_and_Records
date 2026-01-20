import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormRadioGroup, RadioOption } from './form-radio-group';
import { Component, viewChild } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';

@Component({
  standalone: true,
  imports: [FormRadioGroup, ReactiveFormsModule],
  template: `
    <app-form-radio-group
      [label]="label"
      [name]="name"
      [options]="options"
      [disabled]="isDisabled"
      [error]="error"
      [inline]="inline"
      [formControl]="control"
    />
  `
})
class TestHostComponent {
  radioGroup = viewChild(FormRadioGroup);
  control = new FormControl('');
  label = 'Gender';
  name = 'gender';
  options: RadioOption[] = [
    { value: 'male', label: 'Male' },
    { value: 'female', label: 'Female' },
    { value: 'other', label: 'Other' }
  ];
  isDisabled = false;
  error = '';
  inline = false;
}

describe('FormRadioGroup', () => {
  let component: FormRadioGroup;
  let fixture: ComponentFixture<FormRadioGroup>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FormRadioGroup]
    }).compileComponents();
  });

  describe('Creación', () => {
    it('debería crear el componente', () => {
      fixture = TestBed.createComponent(FormRadioGroup);
      component = fixture.componentInstance;
      expect(component).toBeTruthy();
    });
  });

  describe('Estado inicial', () => {
    beforeEach(() => {
      fixture = TestBed.createComponent(FormRadioGroup);
      component = fixture.componentInstance;
    });

    it('debería tener label vacío por defecto', () => {
      expect(component.label).toBe('');
    });

    it('debería tener name vacío por defecto', () => {
      expect(component.name).toBe('');
    });

    it('debería tener options vacío por defecto', () => {
      expect(component.options).toEqual([]);
    });

    it('debería tener disabled false por defecto', () => {
      expect(component.disabled).toBeFalse();
    });

    it('debería tener error vacío por defecto', () => {
      expect(component.error).toBe('');
    });

    it('debería tener inline false por defecto', () => {
      expect(component.inline).toBeFalse();
    });

    it('debería tener value vacío por defecto', () => {
      expect(component.value).toBe('');
    });
  });

  describe('ControlValueAccessor', () => {
    beforeEach(() => {
      fixture = TestBed.createComponent(FormRadioGroup);
      component = fixture.componentInstance;
    });

    describe('writeValue', () => {
      it('debería escribir valor string', () => {
        component.writeValue('male');
        expect(component.value).toBe('male');
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
      fixture = TestBed.createComponent(FormRadioGroup);
      component = fixture.componentInstance;
    });

    describe('onRadioChange', () => {
      it('debería actualizar value y llamar onChange y onTouched', () => {
        const onChangeFn = jasmine.createSpy('onChange');
        const onTouchedFn = jasmine.createSpy('onTouched');
        component.registerOnChange(onChangeFn);
        component.registerOnTouched(onTouchedFn);

        const event = { target: { value: 'female' } } as unknown as Event;
        component.onRadioChange(event);

        expect(component.value).toBe('female');
        expect(onChangeFn).toHaveBeenCalledWith('female');
        expect(onTouchedFn).toHaveBeenCalled();
      });
    });
  });

  describe('isChecked', () => {
    beforeEach(() => {
      fixture = TestBed.createComponent(FormRadioGroup);
      component = fixture.componentInstance;
    });

    it('debería retornar true si el valor coincide', () => {
      component.value = 'male';
      expect(component.isChecked('male')).toBeTrue();
    });

    it('debería retornar false si el valor no coincide', () => {
      component.value = 'male';
      expect(component.isChecked('female')).toBeFalse();
    });

    it('debería funcionar con valores numéricos', () => {
      component.value = 1;
      expect(component.isChecked(1)).toBeTrue();
      expect(component.isChecked(2)).toBeFalse();
    });
  });

  describe('wrapperClasses', () => {
    beforeEach(() => {
      fixture = TestBed.createComponent(FormRadioGroup);
      component = fixture.componentInstance;
    });

    it('debería retornar clase base', () => {
      expect(component.wrapperClasses).toBe('form-radio-group');
    });

    it('debería agregar clase error', () => {
      component.error = 'Error message';
      expect(component.wrapperClasses).toContain('form-radio-group--error');
    });

    it('debería agregar clase disabled', () => {
      component.disabled = true;
      expect(component.wrapperClasses).toContain('form-radio-group--disabled');
    });

    it('debería agregar clase inline', () => {
      component.inline = true;
      expect(component.wrapperClasses).toContain('form-radio-group--inline');
    });

    it('debería combinar múltiples clases', () => {
      component.error = 'Error';
      component.inline = true;

      expect(component.wrapperClasses).toContain('form-radio-group--error');
      expect(component.wrapperClasses).toContain('form-radio-group--inline');
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

    it('debería crear radio group dentro del host', () => {
      expect(hostComponent.radioGroup()).toBeTruthy();
    });

    it('debería recibir label del host', () => {
      expect(hostComponent.radioGroup()!.label).toBe('Gender');
    });

    it('debería recibir name del host', () => {
      expect(hostComponent.radioGroup()!.name).toBe('gender');
    });

    it('debería recibir options del host', () => {
      expect(hostComponent.radioGroup()!.options.length).toBe(3);
    });

    it('debería sincronizar con FormControl', () => {
      hostComponent.control.setValue('female');
      hostFixture.detectChanges();

      expect(hostComponent.radioGroup()!.value).toBe('female');
    });

    it('debería propagar cambios al FormControl', () => {
      const event = { target: { value: 'other' } } as unknown as Event;
      hostComponent.radioGroup()!.onRadioChange(event);

      expect(hostComponent.control.value).toBe('other');
    });

    it('debería recibir error del host', () => {
      hostComponent.error = 'Selection required';
      hostFixture.detectChanges();

      expect(hostComponent.radioGroup()!.error).toBe('Selection required');
    });

    it('debería recibir inline del host', () => {
      hostComponent.inline = true;
      hostFixture.detectChanges();

      expect(hostComponent.radioGroup()!.inline).toBeTrue();
    });

    describe('isChecked con FormControl', () => {
      it('debería marcar opción seleccionada', () => {
        hostComponent.control.setValue('male');
        hostFixture.detectChanges();

        expect(hostComponent.radioGroup()!.isChecked('male')).toBeTrue();
        expect(hostComponent.radioGroup()!.isChecked('female')).toBeFalse();
      });
    });

    describe('Options con valores numéricos', () => {
      it('debería aceptar options con value numérico', () => {
        hostComponent.options = [
          { value: 1, label: 'Option 1' },
          { value: 2, label: 'Option 2' }
        ];
        hostFixture.detectChanges();

        expect(hostComponent.radioGroup()!.options[0].value).toBe(1);
      });
    });
  });
});
