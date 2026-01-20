import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule, FormControl, Validators } from '@angular/forms';
import { By } from '@angular/platform-browser';

import { FormInput } from './form-input';

/**
 * Tests unitarios para FormInput
 *
 * Cobertura:
 * - Creación del componente
 * - Inputs: label, type, placeholder, required, disabled, helpText, autocomplete
 * - Control interno vs externo (FormControl)
 * - Getters: activeControl, hasError, hasSuccess, errorMessage
 * - Generación de ID único
 * - Mensajes de error personalizados
 */
describe('FormInput', () => {
  let component: FormInput;
  let fixture: ComponentFixture<FormInput>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FormInput, ReactiveFormsModule]
    }).compileComponents();

    fixture = TestBed.createComponent(FormInput);
    component = fixture.componentInstance;
  });

  // ===========================================================================
  // CREACIÓN DEL COMPONENTE
  // ===========================================================================

  describe('Creación', () => {
    it('debería crear el componente', () => {
      fixture.detectChanges();
      expect(component).toBeTruthy();
    });

    it('debería tener valores por defecto correctos', () => {
      expect(component.label).toBe('');
      expect(component.type).toBe('text');
      expect(component.placeholder).toBe('');
      expect(component.required).toBe(false);
      expect(component.disabled).toBe(false);
      expect(component.helpText).toBe('');
      expect(component.autocomplete).toBe('');
    });
  });

  // ===========================================================================
  // INPUTS
  // ===========================================================================

  describe('Inputs', () => {
    beforeEach(() => {
      fixture.detectChanges();
    });

    it('debería aceptar label personalizado', () => {
      component.label = 'Correo electrónico';
      fixture.detectChanges();

      const labelEl = fixture.debugElement.query(By.css('.form-input__label'));
      expect(labelEl.nativeElement.textContent).toContain('Correo electrónico');
    });

    it('debería establecer el tipo de input', () => {
      component.type = 'email';
      fixture.detectChanges();

      const inputEl = fixture.debugElement.query(By.css('.form-input__input'));
      expect(inputEl.nativeElement.type).toBe('email');
    });

    it('debería aceptar type="password"', () => {
      component.type = 'password';
      fixture.detectChanges();

      const inputEl = fixture.debugElement.query(By.css('.form-input__input'));
      expect(inputEl.nativeElement.type).toBe('password');
    });

    it('debería establecer placeholder', () => {
      component.placeholder = 'Escribe aquí...';
      fixture.detectChanges();

      const inputEl = fixture.debugElement.query(By.css('.form-input__input'));
      expect(inputEl.nativeElement.placeholder).toBe('Escribe aquí...');
    });

    it('debería mostrar asterisco cuando required=true', () => {
      component.required = true;
      fixture.detectChanges();

      const requiredEl = fixture.debugElement.query(By.css('.form-input__required'));
      expect(requiredEl).toBeTruthy();
      expect(requiredEl.nativeElement.textContent).toBe('*');
    });

    it('debería NO mostrar asterisco cuando required=false', () => {
      component.required = false;
      fixture.detectChanges();

      const requiredEl = fixture.debugElement.query(By.css('.form-input__required'));
      expect(requiredEl).toBeNull();
    });

    it('debería establecer autocomplete', () => {
      component.autocomplete = 'email';
      fixture.detectChanges();

      const inputEl = fixture.debugElement.query(By.css('.form-input__input'));
      expect(inputEl.nativeElement.getAttribute('autocomplete')).toBe('email');
    });

    it('debería NO establecer autocomplete si está vacío', () => {
      component.autocomplete = '';
      fixture.detectChanges();

      const inputEl = fixture.debugElement.query(By.css('.form-input__input'));
      expect(inputEl.nativeElement.getAttribute('autocomplete')).toBeNull();
    });

    it('debería mostrar helpText cuando no hay error', () => {
      component.helpText = 'Mínimo 8 caracteres';
      fixture.detectChanges();

      const helpEl = fixture.debugElement.query(By.css('.form-input__help'));
      expect(helpEl).toBeTruthy();
      expect(helpEl.nativeElement.textContent).toContain('Mínimo 8 caracteres');
    });
  });

  // ===========================================================================
  // GENERACIÓN DE ID ÚNICO
  // ===========================================================================

  describe('Generación de ID único', () => {
    it('debería usar el id proporcionado', () => {
      component.id = 'custom-id';
      fixture.detectChanges();

      expect(component.inputId).toBe('custom-id');
    });

    it('debería generar id único si no se proporciona', () => {
      component.id = '';
      fixture.detectChanges();

      expect(component.inputId).toMatch(/^form-input-\d+$/);
    });

    it('debería asociar label con input mediante for/id', () => {
      component.id = 'test-input';
      fixture.detectChanges();

      const labelEl = fixture.debugElement.query(By.css('.form-input__label'));
      const inputEl = fixture.debugElement.query(By.css('.form-input__input'));

      expect(labelEl.nativeElement.getAttribute('for')).toBe('test-input');
      expect(inputEl.nativeElement.id).toBe('test-input');
    });
  });

  // ===========================================================================
  // CONTROL EXTERNO VS INTERNO
  // ===========================================================================

  describe('Control externo vs interno', () => {
    it('debería usar control externo si se proporciona', () => {
      const externalControl = new FormControl('valor inicial');
      component.control = externalControl;
      fixture.detectChanges();

      expect(component.activeControl).toBe(externalControl);
      expect(component.activeControl.value).toBe('valor inicial');
    });

    it('debería usar control interno si no se proporciona control externo', () => {
      component.control = undefined;
      fixture.detectChanges();

      expect(component.activeControl).toBeDefined();
      expect(component.activeControl.value).toBe('');
    });

    it('debería reflejar cambios del control externo', () => {
      const externalControl = new FormControl('');
      component.control = externalControl;
      fixture.detectChanges();

      externalControl.setValue('nuevo valor');
      fixture.detectChanges();

      const inputEl = fixture.debugElement.query(By.css('.form-input__input'));
      expect(inputEl.nativeElement.value).toBe('nuevo valor');
    });

    it('debería deshabilitar el control cuando disabled=true', () => {
      const externalControl = new FormControl('');
      component.control = externalControl;
      component.disabled = true;
      fixture.detectChanges();

      expect(component.activeControl.disabled).toBe(true);
    });
  });

  // ===========================================================================
  // GETTERS DE ESTADO
  // ===========================================================================

  describe('Getter hasError', () => {
    it('debería retornar false si el control es válido', () => {
      const control = new FormControl('test@email.com', [Validators.required, Validators.email]);
      component.control = control;
      fixture.detectChanges();

      expect(component.hasError).toBe(false);
    });

    it('debería retornar false si el control no ha sido tocado', () => {
      const control = new FormControl('', [Validators.required]);
      component.control = control;
      fixture.detectChanges();

      expect(control.touched).toBe(false);
      expect(component.hasError).toBe(false);
    });

    it('debería retornar true si el control es inválido Y tocado', () => {
      const control = new FormControl('', [Validators.required]);
      control.markAsTouched();
      component.control = control;
      fixture.detectChanges();

      expect(component.hasError).toBe(true);
    });
  });

  describe('Getter hasSuccess', () => {
    it('debería retornar false si el control no ha sido tocado', () => {
      const control = new FormControl('test@email.com', [Validators.required]);
      component.control = control;
      fixture.detectChanges();

      expect(component.hasSuccess).toBe(false);
    });

    it('debería retornar true si el control es válido Y tocado', () => {
      const control = new FormControl('test@email.com', [Validators.required]);
      control.markAsTouched();
      component.control = control;
      fixture.detectChanges();

      expect(component.hasSuccess).toBe(true);
    });

    it('debería retornar false si el control es inválido', () => {
      const control = new FormControl('', [Validators.required]);
      control.markAsTouched();
      component.control = control;
      fixture.detectChanges();

      expect(component.hasSuccess).toBe(false);
    });
  });

  // ===========================================================================
  // MENSAJES DE ERROR
  // ===========================================================================

  describe('Getter errorMessage', () => {
    // NOTA: No llamamos fixture.detectChanges() aquí porque algunos tests
    // necesitan configurar el control ANTES de la primera detección de cambios

    it('debería retornar vacío si no hay errores', () => {
      // Crear fixture fresco
      const freshFixture = TestBed.createComponent(FormInput);
      const freshComponent = freshFixture.componentInstance;

      const control = new FormControl('test@email.com', [Validators.required]);
      control.markAsTouched();
      freshComponent.control = control;
      freshFixture.detectChanges();

      expect(freshComponent.errorMessage).toBe('');
    });

    it('debería retornar vacío si control no ha sido tocado', () => {
      const freshFixture = TestBed.createComponent(FormInput);
      const freshComponent = freshFixture.componentInstance;

      const control = new FormControl('', [Validators.required]);
      freshComponent.control = control;
      freshFixture.detectChanges();

      expect(freshComponent.errorMessage).toBe('');
    });

    it('debería retornar mensaje de required', () => {
      const freshFixture = TestBed.createComponent(FormInput);
      const freshComponent = freshFixture.componentInstance;

      freshComponent.label = 'Email';
      const control = new FormControl('', [Validators.required]);
      control.markAsTouched();
      freshComponent.control = control;
      freshFixture.detectChanges();

      expect(freshComponent.errorMessage).toBe('Email es requerido');
    });

    it('debería retornar mensaje de email inválido', () => {
      const freshFixture = TestBed.createComponent(FormInput);
      const freshComponent = freshFixture.componentInstance;

      const control = new FormControl('no-es-email', [Validators.email]);
      control.markAsTouched();
      freshComponent.control = control;
      freshFixture.detectChanges();

      expect(freshComponent.errorMessage).toBe('Email debe ser válido (ej: usuario@dominio.com)');
    });

    it('debería retornar mensaje de minlength', () => {
      const freshFixture = TestBed.createComponent(FormInput);
      const freshComponent = freshFixture.componentInstance;

      const control = new FormControl('abc', [Validators.minLength(8)]);
      control.markAsTouched();
      freshComponent.control = control;
      freshFixture.detectChanges();

      expect(freshComponent.errorMessage).toBe('Mínimo 8 caracteres');
    });

    it('debería retornar mensaje de maxlength', () => {
      const freshFixture = TestBed.createComponent(FormInput);
      const freshComponent = freshFixture.componentInstance;

      const control = new FormControl('texto muy largo', [Validators.maxLength(5)]);
      control.markAsTouched();
      freshComponent.control = control;
      freshFixture.detectChanges();

      expect(freshComponent.errorMessage).toBe('Máximo 5 caracteres');
    });

    it('debería retornar mensaje de pattern', () => {
      const freshFixture = TestBed.createComponent(FormInput);
      const freshComponent = freshFixture.componentInstance;

      const control = new FormControl('abc', [Validators.pattern(/^\d+$/)]);
      control.markAsTouched();
      freshComponent.control = control;
      freshFixture.detectChanges();

      expect(freshComponent.errorMessage).toBe('Formato inválido');
    });

    it('debería retornar mensaje de passwordStrength personalizado', () => {
      // Solo probar la lógica del getter, sin detectar cambios
      const control = new FormControl('');
      control.setErrors({ passwordStrength: 'La contraseña debe contener mayúsculas' });
      control.markAsTouched();
      component.control = control;

      expect(component.errorMessage).toBe('La contraseña debe contener mayúsculas');
    });

    it('debería retornar mensaje de emailTaken', () => {
      // Solo probar la lógica del getter, sin detectar cambios
      const control = new FormControl('');
      control.setErrors({ emailTaken: true });
      control.markAsTouched();
      component.control = control;

      expect(component.errorMessage).toBe('Este email ya está registrado');
    });

    it('debería retornar mensaje de usernameTaken', () => {
      // Solo probar la lógica del getter, sin detectar cambios
      const control = new FormControl('');
      control.setErrors({ usernameTaken: true });
      control.markAsTouched();
      component.control = control;

      expect(component.errorMessage).toBe('Este nombre de usuario ya está en uso');
    });

    it('debería retornar mensaje genérico para errores desconocidos', () => {
      // Solo probar la lógica del getter, sin detectar cambios
      const control = new FormControl('');
      control.setErrors({ customError: true });
      control.markAsTouched();
      component.control = control;

      expect(component.errorMessage).toBe('Campo inválido');
    });
  });

  // ===========================================================================
  // CLASES CSS DINÁMICAS
  // ===========================================================================

  describe('Clases CSS dinámicas', () => {
    it('debería añadir clase error cuando hasError=true', () => {
      const control = new FormControl('', [Validators.required]);
      control.markAsTouched();
      component.control = control;
      fixture.detectChanges();

      const inputEl = fixture.debugElement.query(By.css('.form-input__input'));
      expect(inputEl.nativeElement.classList).toContain('form-input__input--error');
    });

    it('debería añadir clase success cuando hasSuccess=true', () => {
      const control = new FormControl('valor válido', [Validators.required]);
      control.markAsTouched();
      component.control = control;
      fixture.detectChanges();

      const inputEl = fixture.debugElement.query(By.css('.form-input__input'));
      expect(inputEl.nativeElement.classList).toContain('form-input__input--success');
    });

    it('debería NO tener clases de estado si no ha sido tocado', () => {
      const control = new FormControl('', [Validators.required]);
      component.control = control;
      fixture.detectChanges();

      const inputEl = fixture.debugElement.query(By.css('.form-input__input'));
      expect(inputEl.nativeElement.classList).not.toContain('form-input__input--error');
      expect(inputEl.nativeElement.classList).not.toContain('form-input__input--success');
    });
  });

  // ===========================================================================
  // ACCESIBILIDAD
  // ===========================================================================

  describe('Accesibilidad', () => {
    it('debería establecer aria-invalid cuando hay error', () => {
      const control = new FormControl('', [Validators.required]);
      control.markAsTouched();
      component.control = control;
      fixture.detectChanges();

      const inputEl = fixture.debugElement.query(By.css('.form-input__input'));
      expect(inputEl.nativeElement.getAttribute('aria-invalid')).toBe('true');
    });

    it('debería tener aria-describedby cuando hay helpText', () => {
      component.helpText = 'Texto de ayuda';
      component.id = 'test-input';
      fixture.detectChanges();

      const inputEl = fixture.debugElement.query(By.css('.form-input__input'));
      expect(inputEl.nativeElement.getAttribute('aria-describedby')).toBe('test-input-description');
    });

    it('debería tener aria-describedby cuando hay error', () => {
      const control = new FormControl('', [Validators.required]);
      control.markAsTouched();
      component.control = control;
      component.id = 'test-input';
      fixture.detectChanges();

      const inputEl = fixture.debugElement.query(By.css('.form-input__input'));
      expect(inputEl.nativeElement.getAttribute('aria-describedby')).toBe('test-input-description');
    });

    it('debería tener role="alert" en mensaje de error', () => {
      const control = new FormControl('', [Validators.required]);
      control.markAsTouched();
      component.control = control;
      component.label = 'Campo';
      fixture.detectChanges();

      const errorEl = fixture.debugElement.query(By.css('.form-input__error'));
      expect(errorEl.nativeElement.getAttribute('role')).toBe('alert');
    });

    it('debería tener aria-label en asterisco de requerido', () => {
      component.required = true;
      fixture.detectChanges();

      const requiredEl = fixture.debugElement.query(By.css('.form-input__required'));
      expect(requiredEl.nativeElement.getAttribute('aria-label')).toBe('Campo requerido');
    });
  });

  // ===========================================================================
  // MOSTRAR ERROR VS HELP TEXT (EXCLUSIVIDAD)
  // ===========================================================================

  describe('Error vs Help Text', () => {
    it('debería mostrar error y NO helpText cuando hay error', () => {
      const control = new FormControl('', [Validators.required]);
      control.markAsTouched();
      component.control = control;
      component.label = 'Campo';
      component.helpText = 'Texto de ayuda';
      fixture.detectChanges();

      const errorEl = fixture.debugElement.query(By.css('.form-input__error'));
      const helpEl = fixture.debugElement.query(By.css('.form-input__help'));

      expect(errorEl).toBeTruthy();
      expect(helpEl).toBeNull();
    });

    it('debería mostrar helpText y NO error cuando es válido', () => {
      const control = new FormControl('valor válido', [Validators.required]);
      control.markAsTouched();
      component.control = control;
      component.helpText = 'Texto de ayuda';
      fixture.detectChanges();

      const errorEl = fixture.debugElement.query(By.css('.form-input__error'));
      const helpEl = fixture.debugElement.query(By.css('.form-input__help'));

      expect(errorEl).toBeNull();
      expect(helpEl).toBeTruthy();
    });
  });
});
