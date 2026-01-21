import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormTextarea } from './form-textarea';
import { Component, viewChild } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';

@Component({
  standalone: true,
  imports: [FormTextarea, ReactiveFormsModule],
  template: `
    <app-form-textarea
      [label]="label"
      [id]="id"
      [placeholder]="placeholder"
      [rows]="rows"
      [disabled]="isDisabled"
      [error]="error"
      [hint]="hint"
      [formControl]="control"
    />
  `
})
class TestHostComponent {
  textarea = viewChild(FormTextarea);
  control = new FormControl('');
  label = 'Description';
  id = 'description';
  placeholder = 'Enter description';
  rows = 4;
  isDisabled = false;
  error = '';
  hint = '';
}

describe('FormTextarea', () => {
  let component: FormTextarea;
  let fixture: ComponentFixture<FormTextarea>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FormTextarea]
    }).compileComponents();
  });

  describe('Creación', () => {
    it('debería crear el componente', () => {
      fixture = TestBed.createComponent(FormTextarea);
      component = fixture.componentInstance;
      expect(component).toBeTruthy();
    });
  });

  describe('Estado inicial', () => {
    beforeEach(() => {
      fixture = TestBed.createComponent(FormTextarea);
      component = fixture.componentInstance;
    });

    it('debería tener label vacío por defecto', () => {
      expect(component.label).toBe('');
    });

    it('debería tener id vacío por defecto', () => {
      expect(component.id).toBe('');
    });

    it('debería tener placeholder vacío por defecto', () => {
      expect(component.placeholder).toBe('');
    });

    it('debería tener rows 4 por defecto', () => {
      expect(component.rows).toBe(4);
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
      fixture = TestBed.createComponent(FormTextarea);
      component = fixture.componentInstance;
    });

    describe('writeValue', () => {
      it('debería escribir valor string', () => {
        component.writeValue('test content');
        expect(component.value).toBe('test content');
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
      fixture = TestBed.createComponent(FormTextarea);
      component = fixture.componentInstance;
    });

    describe('onInputChange', () => {
      it('debería actualizar value y llamar onChange', () => {
        const fn = jasmine.createSpy('onChange');
        component.registerOnChange(fn);

        const event = { target: { value: 'new content' } } as unknown as Event;
        component.onInputChange(event);

        expect(component.value).toBe('new content');
        expect(fn).toHaveBeenCalledWith('new content');
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
      fixture = TestBed.createComponent(FormTextarea);
      component = fixture.componentInstance;
    });

    it('debería retornar clase base', () => {
      expect(component.wrapperClasses).toBe('form-textarea');
    });

    it('debería agregar clase error', () => {
      component.error = 'Error message';
      expect(component.wrapperClasses).toContain('form-textarea--error');
    });

    it('debería agregar clase disabled', () => {
      component.disabled = true;
      expect(component.wrapperClasses).toContain('form-textarea--disabled');
    });

    it('debería agregar clase focused', () => {
      component.isFocused = true;
      expect(component.wrapperClasses).toContain('form-textarea--focused');
    });

    it('debería combinar múltiples clases', () => {
      component.error = 'Error';
      component.isFocused = true;

      expect(component.wrapperClasses).toContain('form-textarea--error');
      expect(component.wrapperClasses).toContain('form-textarea--focused');
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

    it('debería crear textarea dentro del host', () => {
      expect(hostComponent.textarea()).toBeTruthy();
    });

    it('debería recibir label del host', () => {
      expect(hostComponent.textarea()!.label).toBe('Description');
    });

    it('debería recibir id del host', () => {
      expect(hostComponent.textarea()!.id).toBe('description');
    });

    it('debería recibir placeholder del host', () => {
      expect(hostComponent.textarea()!.placeholder).toBe('Enter description');
    });

    it('debería recibir rows del host', () => {
      expect(hostComponent.textarea()!.rows).toBe(4);
    });

    it('debería sincronizar con FormControl', () => {
      hostComponent.control.setValue('Form value');
      hostFixture.detectChanges();

      expect(hostComponent.textarea()!.value).toBe('Form value');
    });

    it('debería propagar cambios al FormControl', () => {
      const event = { target: { value: 'User input' } } as unknown as Event;
      hostComponent.textarea()!.onInputChange(event);

      expect(hostComponent.control.value).toBe('User input');
    });

    it('debería recibir error del host', () => {
      hostComponent.error = 'Required field';
      hostFixture.detectChanges();

      expect(hostComponent.textarea()!.error).toBe('Required field');
    });

    it('debería recibir hint del host', () => {
      hostComponent.hint = 'Max 500 characters';
      hostFixture.detectChanges();

      expect(hostComponent.textarea()!.hint).toBe('Max 500 characters');
    });
  });
});
