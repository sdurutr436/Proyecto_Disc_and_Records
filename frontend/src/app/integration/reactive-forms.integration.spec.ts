/**
 * ============================================================================
 * TESTS DE INTEGRACIÓN: Formularios Reactivos Avanzados
 * ============================================================================
 *
 * PROPÓSITO:
 * Testing exhaustivo de formularios reactivos con:
 * - Validadores síncronos y asíncronos
 * - Validadores cross-field
 * - Estados de formulario (pristine, dirty, touched, valid)
 * - Interacción con servicios HTTP
 *
 * @author Tests de integración para Discs & Records
 */

import { TestBed, fakeAsync, tick, flush, ComponentFixture } from '@angular/core/testing';
import { ReactiveFormsModule, FormBuilder, FormGroup, FormControl, Validators, AbstractControl, ValidationErrors } from '@angular/forms';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { CommonModule } from '@angular/common';
import { Component, signal } from '@angular/core';
import { Observable, of, delay } from 'rxjs';
import { map } from 'rxjs/operators';

import { nif, telefono, codigoPostal } from '../validators/spanish-formats.validator';
import { passwordMatch } from '../validators/password-match.validator';
import { passwordStrength } from '../validators/password-strength.validator';
import { atLeastOneRequired, validDateRange } from '../validators/cross-field.validators';

// ════════════════════════════════════════════════════════════════════════
// COMPONENTE DE PRUEBA: Formulario de Perfil de Usuario
// ════════════════════════════════════════════════════════════════════════

@Component({
  selector: 'test-profile-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  template: `
    <form [formGroup]="profileForm">
      <input formControlName="nombre" />
      <input formControlName="apellidos" />
      <input formControlName="email" />
      <input formControlName="telefono" />
      <input formControlName="dni" />
    </form>
  `
})
class TestProfileFormComponent {
  profileForm: FormGroup;

  constructor(private fb: FormBuilder) {
    this.profileForm = this.fb.group({
      nombre: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(50)]],
      apellidos: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(100)]],
      email: ['', [Validators.required, Validators.email]],
      telefono: ['', [telefono()]],
      dni: ['', [nif()]]
    });
  }
}

// ════════════════════════════════════════════════════════════════════════
// COMPONENTE DE PRUEBA: Formulario de Contraseña
// ════════════════════════════════════════════════════════════════════════

@Component({
  selector: 'test-password-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  template: `
    <form [formGroup]="passwordForm">
      <input formControlName="currentPassword" type="password" />
      <input formControlName="newPassword" type="password" />
      <input formControlName="confirmPassword" type="password" />
    </form>
  `
})
class TestPasswordFormComponent {
  passwordForm: FormGroup;

  constructor(private fb: FormBuilder) {
    this.passwordForm = this.fb.group({
      currentPassword: ['', [Validators.required]],
      newPassword: ['', [
        Validators.required,
        Validators.minLength(8),
        passwordStrength()
      ]],
      confirmPassword: ['', [Validators.required]]
    }, {
      validators: passwordMatch('newPassword', 'confirmPassword')
    });
  }
}

// ════════════════════════════════════════════════════════════════════════
// TESTS DE INTEGRACIÓN
// ════════════════════════════════════════════════════════════════════════

describe('Reactive Forms Integration Tests', () => {
  let fb: FormBuilder;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        ReactiveFormsModule,
        HttpClientTestingModule,
        TestProfileFormComponent,
        TestPasswordFormComponent
      ],
      providers: [FormBuilder]
    }).compileComponents();

    fb = TestBed.inject(FormBuilder);
  });

  // ════════════════════════════════════════════════════════════════════════
  // GRUPO 1: Estados del Formulario
  // ════════════════════════════════════════════════════════════════════════

  describe('Estados del Formulario', () => {
    let component: TestProfileFormComponent;
    let fixture: ComponentFixture<TestProfileFormComponent>;

    beforeEach(() => {
      fixture = TestBed.createComponent(TestProfileFormComponent);
      component = fixture.componentInstance;
      fixture.detectChanges();
    });

    it('debería iniciar con estado pristine', () => {
      expect(component.profileForm.pristine).toBeTruthy();
      expect(component.profileForm.dirty).toBeFalsy();
    });

    it('debería cambiar a dirty cuando se modifica un campo', () => {
      const nombreControl = component.profileForm.get('nombre');
      nombreControl?.setValue('Juan');
      nombreControl?.markAsDirty();

      expect(component.profileForm.dirty).toBeTruthy();
      expect(component.profileForm.pristine).toBeFalsy();
    });

    it('debería iniciar sin campos touched', () => {
      expect(component.profileForm.touched).toBeFalsy();
      expect(component.profileForm.untouched).toBeTruthy();
    });

    it('debería marcar campo como touched al hacer blur', () => {
      const nombreControl = component.profileForm.get('nombre');
      nombreControl?.markAsTouched();

      expect(nombreControl?.touched).toBeTruthy();
      expect(component.profileForm.touched).toBeTruthy();
    });

    it('debería resetear el formulario a estado inicial', () => {
      // Modificar el formulario
      component.profileForm.patchValue({
        nombre: 'Juan',
        email: 'juan@example.com'
      });
      component.profileForm.markAllAsTouched();

      // Resetear
      component.profileForm.reset();

      // Verificar estado inicial
      expect(component.profileForm.pristine).toBeTruthy();
      expect(component.profileForm.untouched).toBeTruthy();
      expect(component.profileForm.get('nombre')?.value).toBe(null);
    });

    it('debería ser inválido cuando campos requeridos están vacíos', () => {
      expect(component.profileForm.valid).toBeFalsy();
      expect(component.profileForm.invalid).toBeTruthy();
    });

    it('debería ser válido cuando todos los campos requeridos están completos', () => {
      component.profileForm.patchValue({
        nombre: 'Juan',
        apellidos: 'García López',
        email: 'juan@example.com'
      });

      expect(component.profileForm.valid).toBeTruthy();
    });
  });

  // ════════════════════════════════════════════════════════════════════════
  // GRUPO 2: Validadores de Formatos Españoles
  // ════════════════════════════════════════════════════════════════════════

  describe('Validadores de Formatos Españoles', () => {
    describe('Validador NIF/DNI', () => {
      it('debería aceptar NIF válido', () => {
        const control = new FormControl('00000000T', [nif()]);
        expect(control.valid).toBeTruthy();
      });

      it('debería aceptar NIF en minúsculas', () => {
        const control = new FormControl('00000001r', [nif()]);
        expect(control.valid).toBeTruthy();
      });

      it('debería rechazar NIF con longitud incorrecta', () => {
        const control = new FormControl('1234567Z', [nif()]);
        expect(control.hasError('invalidNif')).toBeTruthy();
      });

      it('debería rechazar NIF con letra incorrecta', () => {
        const control = new FormControl('00000023X', [nif()]);
        // El NIF 00000023 debería tener la letra W según el algoritmo
        expect(control.hasError('invalidNif')).toBeTruthy();
      });

      it('debería aceptar campo vacío (validación opcional)', () => {
        const control = new FormControl('', [nif()]);
        expect(control.valid).toBeTruthy();
      });
    });

    describe('Validador Teléfono', () => {
      it('debería aceptar móvil que empieza con 6', () => {
        const control = new FormControl('612345678', [telefono()]);
        expect(control.valid).toBeTruthy();
      });

      it('debería aceptar móvil que empieza con 7', () => {
        const control = new FormControl('712345678', [telefono()]);
        expect(control.valid).toBeTruthy();
      });

      it('debería rechazar fijo que empieza con 9', () => {
        const control = new FormControl('912345678', [telefono()]);
        // Solo acepta 6 y 7 según el validador
        expect(control.hasError('invalidTelefono')).toBeTruthy();
      });

      it('debería rechazar teléfono con longitud incorrecta', () => {
        const control = new FormControl('61234567', [telefono()]);
        expect(control.hasError('invalidTelefono')).toBeTruthy();
      });

      it('debería rechazar teléfono que empieza con 0', () => {
        const control = new FormControl('012345678', [telefono()]);
        expect(control.hasError('invalidTelefono')).toBeTruthy();
      });
    });
  });

  // ════════════════════════════════════════════════════════════════════════
  // GRUPO 3: Validadores Cross-Field
  // ════════════════════════════════════════════════════════════════════════

  describe('Validadores Cross-Field', () => {
    describe('Password Match', () => {
      let component: TestPasswordFormComponent;
      let fixture: ComponentFixture<TestPasswordFormComponent>;

      beforeEach(() => {
        fixture = TestBed.createComponent(TestPasswordFormComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
      });

      it('debería detectar cuando las contraseñas coinciden', () => {
        component.passwordForm.patchValue({
          currentPassword: 'OldPass1!',
          newPassword: 'NewPass1!',
          confirmPassword: 'NewPass1!'
        });
        component.passwordForm.get('confirmPassword')?.markAsTouched();

        expect(component.passwordForm.hasError('mismatch')).toBeFalsy();
      });

      it('debería detectar cuando las contraseñas NO coinciden', () => {
        component.passwordForm.patchValue({
          currentPassword: 'OldPass1!',
          newPassword: 'NewPass1!',
          confirmPassword: 'DifferentPass1!'
        });
        component.passwordForm.get('confirmPassword')?.markAsTouched();

        expect(component.passwordForm.hasError('mismatch')).toBeTruthy();
      });

      it('debería validar contraseña fuerte', () => {
        const newPasswordControl = component.passwordForm.get('newPassword');

        // Contraseña muy corta
        newPasswordControl?.setValue('weak');
        expect(newPasswordControl?.hasError('minlength')).toBeTruthy();

        // Contraseña sin requisitos de fortaleza (sin especial, sin mayúscula)
        newPasswordControl?.setValue('weakpassword123');
        // El validador passwordStrength produce errores específicos
        expect(newPasswordControl?.hasError('noUppercase') || newPasswordControl?.hasError('noSpecial')).toBeTruthy();

        // Contraseña fuerte (12+ chars, mayúscula, minúscula, número, especial)
        newPasswordControl?.setValue('StrongPass123!');
        expect(newPasswordControl?.valid).toBeTruthy();
      });
    });

    describe('At Least One Required', () => {
      it('debería pasar si al menos un campo tiene valor', () => {
        const form = fb.group({
          email: ['test@example.com'],
          telefono: ['']
        }, {
          validators: atLeastOneRequired('email', 'telefono')
        });

        expect(form.hasError('atLeastOneRequired')).toBeFalsy();
      });

      it('debería fallar si todos los campos están vacíos', () => {
        const form = fb.group({
          email: [''],
          telefono: ['']
        }, {
          validators: atLeastOneRequired('email', 'telefono')
        });

        expect(form.hasError('atLeastOneRequired')).toBeTruthy();
      });
    });

    describe('Valid Date Range', () => {
      it('debería aceptar rango válido (inicio antes de fin)', () => {
        const form = fb.group({
          startDate: ['2020-01-01'],
          endDate: ['2021-12-31']
        }, {
          validators: validDateRange('startDate', 'endDate')
        });

        expect(form.hasError('invalidRange')).toBeFalsy();
      });

      it('debería rechazar rango inválido (fin antes de inicio)', () => {
        const form = fb.group({
          startDate: ['2021-12-31'],
          endDate: ['2020-01-01']
        }, {
          validators: validDateRange('startDate', 'endDate')
        });

        expect(form.hasError('invalidRange')).toBeTruthy();
      });
    });
  });

  // ════════════════════════════════════════════════════════════════════════
  // GRUPO 4: Formularios Dinámicos
  // ════════════════════════════════════════════════════════════════════════

  describe('Formularios Dinámicos', () => {
    it('debería añadir controles dinámicamente', () => {
      const form: FormGroup = fb.group({
        nombre: ['', Validators.required]
      }) as FormGroup;

      expect(form.contains('email')).toBeFalsy();

      // Añadir control dinámicamente
      (form as FormGroup<any>).addControl('email', fb.control('', [Validators.required, Validators.email]));

      expect(form.contains('email')).toBeTruthy();
      expect(form.get('email')?.hasError('required')).toBeTruthy();
    });

    it('debería eliminar controles dinámicamente', () => {
      const form: FormGroup = fb.group({
        nombre: ['', Validators.required],
        email: ['', Validators.email]
      }) as FormGroup;

      expect(form.contains('email')).toBeTruthy();

      // Eliminar control
      (form as FormGroup<any>).removeControl('email');

      expect(form.contains('email')).toBeFalsy();
    });

    it('debería habilitar/deshabilitar controles', () => {
      const form = fb.group({
        nombre: ['', Validators.required],
        email: [{ value: '', disabled: true }]
      });

      expect(form.get('email')?.disabled).toBeTruthy();

      // Habilitar
      form.get('email')?.enable();
      expect(form.get('email')?.disabled).toBeFalsy();

      // Deshabilitar
      form.get('email')?.disable();
      expect(form.get('email')?.disabled).toBeTruthy();
    });

    it('debería aplicar validadores condicionalmente', () => {
      const form = fb.group({
        tipoContacto: ['email'],
        email: [''],
        telefono: ['']
      });

      // Inicialmente sin validadores
      expect(form.get('email')?.hasError('required')).toBeFalsy();

      // Aplicar validador condicional
      form.get('email')?.setValidators([Validators.required, Validators.email]);
      form.get('email')?.updateValueAndValidity();

      expect(form.get('email')?.hasError('required')).toBeTruthy();

      // Quitar validadores
      form.get('email')?.clearValidators();
      form.get('email')?.updateValueAndValidity();

      expect(form.get('email')?.hasError('required')).toBeFalsy();
    });
  });

  // ════════════════════════════════════════════════════════════════════════
  // GRUPO 5: FormArrays
  // ════════════════════════════════════════════════════════════════════════

  describe('FormArrays', () => {
    it('debería crear un FormArray de canciones', () => {
      const form = fb.group({
        albumTitle: ['Discovery', Validators.required],
        tracks: fb.array([
          fb.group({ title: ['One More Time'], duration: ['5:20'] }),
          fb.group({ title: ['Aerodynamic'], duration: ['3:32'] })
        ])
      });

      const tracks = form.get('tracks') as any;
      expect(tracks.length).toBe(2);
      expect(tracks.at(0).get('title')?.value).toBe('One More Time');
    });

    it('debería añadir elementos al FormArray', () => {
      const form = fb.group({
        tracks: fb.array([])
      });

      const tracks = form.get('tracks') as any;
      expect(tracks.length).toBe(0);

      // Añadir track
      tracks.push(fb.group({ title: ['Digital Love'], duration: ['4:58'] }));

      expect(tracks.length).toBe(1);
      expect(tracks.at(0).get('title')?.value).toBe('Digital Love');
    });

    it('debería eliminar elementos del FormArray', () => {
      const form = fb.group({
        tracks: fb.array([
          fb.group({ title: ['Track 1'] }),
          fb.group({ title: ['Track 2'] }),
          fb.group({ title: ['Track 3'] })
        ])
      });

      const tracks = form.get('tracks') as any;
      expect(tracks.length).toBe(3);

      // Eliminar el segundo track
      tracks.removeAt(1);

      expect(tracks.length).toBe(2);
      expect(tracks.at(0).get('title')?.value).toBe('Track 1');
      expect(tracks.at(1).get('title')?.value).toBe('Track 3');
    });

    it('debería validar todos los elementos del FormArray', () => {
      const form = fb.group({
        tracks: fb.array([
          fb.group({ title: ['', Validators.required] }),
          fb.group({ title: ['Valid Track'] })
        ])
      });

      const tracks = form.get('tracks') as any;

      // El primer track está inválido (título vacío)
      expect(tracks.at(0).valid).toBeFalsy();
      expect(tracks.at(1).valid).toBeTruthy();

      // El array completo es inválido si algún elemento lo es
      expect(tracks.valid).toBeFalsy();
    });
  });

  // ════════════════════════════════════════════════════════════════════════
  // GRUPO 6: Valores y Patching
  // ════════════════════════════════════════════════════════════════════════

  describe('Valores y Patching', () => {
    it('debería usar patchValue para actualización parcial', () => {
      const form = fb.group({
        nombre: [''],
        apellidos: [''],
        email: ['']
      });

      // patchValue solo actualiza los campos proporcionados
      form.patchValue({
        nombre: 'Juan',
        email: 'juan@example.com'
      });

      expect(form.get('nombre')?.value).toBe('Juan');
      expect(form.get('apellidos')?.value).toBe('');
      expect(form.get('email')?.value).toBe('juan@example.com');
    });

    it('debería usar setValue para actualización completa', () => {
      const form = fb.group({
        nombre: [''],
        apellidos: [''],
        email: ['']
      });

      // setValue requiere todos los campos
      form.setValue({
        nombre: 'Juan',
        apellidos: 'García',
        email: 'juan@example.com'
      });

      expect(form.get('nombre')?.value).toBe('Juan');
      expect(form.get('apellidos')?.value).toBe('García');
      expect(form.get('email')?.value).toBe('juan@example.com');
    });

    it('debería obtener valores sin campos deshabilitados con getRawValue', () => {
      const form = fb.group({
        nombre: ['Juan'],
        email: [{ value: 'juan@example.com', disabled: true }]
      });

      // value excluye campos deshabilitados
      expect(form.value.email).toBeUndefined();

      // getRawValue incluye todos los campos
      expect(form.getRawValue().email).toBe('juan@example.com');
    });
  });
});
