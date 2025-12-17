# Documentación Técnica Frontend — Fase 3: Formularios Reactivos

**Proyecto:** Disc and Records  \
**Fase:** 3 - Formularios Reactivos Avanzados  \
**Versión:** 1.1  \
**Última actualización:** 17 de diciembre de 2025  \
**Responsable:** Sergio Durán  \

---

## Índice

- [1. FormBuilder, FormGroup y FormControl](#1-formbuilder-formgroup-y-formcontrol)
  - [1.1 Conceptos fundamentales](#11-conceptos-fundamentales)
  - [1.2 Guía de uso](#12-guía-de-uso)
  - [1.3 Implementación en componentes](#13-implementación-en-componentes)
- [2. Validadores síncronos integrados](#2-validadores-síncronos-integrados)
  - [2.1 Catálogo de validadores](#21-catálogo-de-validadores)
  - [2.2 Ejemplos por caso de uso](#22-ejemplos-por-caso-de-uso)
- [3. Validadores custom de grupo](#3-validadores-custom-de-grupo)
- [4. Validadores personalizados (funciones reutilizables)](#4-validadores-personalizados-funciones-reutilizables)
  - [4.1 Validador de contraseña fuerte](#41-validador-de-contraseña-fuerte)
  - [4.2 Validador de confirmación de contraseña](#42-validador-de-confirmación-de-contraseña)
  - [4.3 Validador de formatos personalizados (NIF, teléfono, código postal)](#43-validador-de-formatos-personalizados-nif-teléfono-código-postal)
- [5. Validadores Cross-Field Avanzados](#5-validadores-cross-field-avanzados)
  - [5.1 Validador: Al Menos Uno Requerido](#51-validador-al-menos-uno-requerido)
  - [5.2 Validador: Rango de Fechas](#52-validador-rango-de-fechas)
- [6. FormArray - Colecciones dinámicas de controles](#6-formarray---colecciones-dinámicas-de-controles)
  - [6.1 Ejemplo básico - Lista de géneros favoritos](#61-ejemplo-básico---lista-de-géneros-favoritos)
  - [6.2 Validación en FormArray](#62-validación-en-formarray)
- [7. Validación asíncrona](#7-validación-asíncrona)
  - [7.1 Validador de Email Único](#71-validador-de-email-único)
  - [7.2 Validador de Username Disponible](#72-validador-de-username-disponible)
  - [7.3 Servicio AsyncValidatorsService](#73-servicio-asyncvalidatorsservice-inyectable)
  - [7.4 Uso en FormBuilder con updateOn: 'blur'](#74-uso-en-formbuilder-con-updateon-blur)
  - [7.5 Template con Estados de Loading](#75-template-con-estados-de-loading)
  - [7.6 Configuración Avanzada y Mejores Prácticas](#76-configuración-avanzada-y-mejores-prácticas)
  - [7.7 Estados del FormControl/FormGroup](#77-estados-del-formcontrolformgroup)
- [8. Catálogo de validadores implementados](#8-catálogo-de-validadores-implementados)
  - [8.1 Ubicación de archivos](#81-ubicación-de-archivos)
  - [8.2 Validadores Síncronos](#82-validadores-síncronos)
  - [8.3 Validadores Cross-Field](#83-validadores-cross-field)
  - [8.4 Validadores Asíncronos](#84-validadores-asíncronos)
  - [8.5 Helpers para Templates](#85-helpers-para-templates)
- [9. Integración en componentes reales del proyecto](#9-integración-en-componentes-reales-del-proyecto)
  - [9.1 LoginForm - Formulario reactivo con validación simple](#91-loginform---formulario-reactivo-con-validación-simple)
  - [9.2 RegisterForm - Validadores custom y grupo](#92-registerform---validadores-custom-y-grupo)
  - [9.3 Patrón completo - Inyección de ValidationService](#93-patrón-completo---inyección-de-validationservice)
- [10. Resumen de cambios](#10-resumen-de-cambios)
- [11. Checklist de validación según rúbrica](#11-checklist-de-validación-según-rúbrica)
- [12. Validacion de elementos de array](#12-validacion-de-elementos-de-array)
  - [12.1 Validadores de coleccion](#121-validadores-de-coleccion)
  - [12.2 Validadores de elemento individual](#122-validadores-de-elemento-individual)
  - [12.3 Mensajes de error para validadores de array](#123-mensajes-de-error-para-validadores-de-array)
- [13. Gestion de estados de formulario](#13-gestion-de-estados-de-formulario)
  - [13.1 FormStateService](#131-formstateservice)
  - [13.2 Mostrar errores solo despues de touched/dirty](#132-mostrar-errores-solo-despues-de-toucheddirty)
  - [13.3 Deshabilitar submit si formulario invalido](#133-deshabilitar-submit-si-formulario-invalido)
  - [13.4 Loading states durante validacion asincrona](#134-loading-states-durante-validacion-asincrona)
  - [13.5 Feedback visual de validacion](#135-feedback-visual-de-validacion)
  - [13.6 Estilos CSS para feedback visual](#136-estilos-css-para-feedback-visual)
- [14. Gestion de FormArray con FormStateService](#14-gestion-de-formarray-con-formstateservice)
  - [14.1 Metodos especificos para FormArray](#141-metodos-especificos-para-formarray)
  - [14.2 Ejemplo completo de FormArray con validacion](#142-ejemplo-completo-de-formarray-con-validacion)
- [15. Catalogo actualizado de validadores](#15-catalogo-actualizado-de-validadores)
  - [15.1 Ubicacion de archivos](#151-ubicacion-de-archivos)
  - [15.2 Validadores de Array](#152-validadores-de-array)
  - [15.3 Servicios relacionados](#153-servicios-relacionados)
- [16. Componente de demostracion](#16-componente-de-demostracion)

---

## 1. FormBuilder, FormGroup y FormControl

### 1.1 Conceptos fundamentales

#### FormGroup
Contenedor de múltiples FormControls que representa un formulario completo o sección del mismo.

```typescript
/**
 * FormGroup agrupa FormControls relacionados
 * Proporciona métodos para validar y acceder al estado de todo el formulario
 */
const loginForm = new FormGroup({
  email: new FormControl(''),
  password: new FormControl('')
});

// Acceder a valor completo
console.log(loginForm.value); // { email: '', password: '' }

// Verificar si es válido
console.log(loginForm.valid); // boolean

// Marcar como tocado (después de interacción del usuario)
loginForm.markAllAsTouched();
```

#### FormControl
Representa un campo de entrada individual con su valor, estado de validación y estado de interacción.

```typescript
/**
 * FormControl mantiene el estado de un campo específico
 */
const emailControl = new FormControl('', [Validators.required, Validators.email]);

// Estado del control
emailControl.value;        // valor actual
emailControl.valid;        // booleano
emailControl.invalid;      // booleano
emailControl.touched;      // si el usuario interactuó
emailControl.untouched;    // si no ha sido tocado
emailControl.errors;       // { required: true, email: true, ... }
emailControl.status;       // 'VALID' | 'INVALID' | 'PENDING' | 'DISABLED'
```

#### FormBuilder
Factory que simplifica la creación de FormGroups y FormControls mediante sintaxis más limpia.

```typescript
/**
 * FormBuilder.group() crea un FormGroup de forma más legible
 * que usar new FormGroup() directamente
 */
const loginForm = this.formBuilder.group({
  email: ['', [Validators.required, Validators.email]],
  password: ['', [Validators.required, Validators.minLength(8)]]
});

// Equivalente a:
const loginFormVerbose = new FormGroup({
  email: new FormControl('', [Validators.required, Validators.email]),
  password: new FormControl('', [Validators.required, Validators.minLength(8)])
});
```

### 1.2 Guía de uso

#### Paso 1: Inyectar FormBuilder
```typescript
import { FormBuilder, FormGroup } from '@angular/forms';

export class LoginForm {
  loginForm: FormGroup;

  constructor(private formBuilder: FormBuilder) {
    this.initializeForm();
  }
}
```

#### Paso 2: Construir el formulario en el constructor o método
```typescript
private initializeForm(): void {
  this.loginForm = this.formBuilder.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(8)]]
  });
}
```

#### Paso 3: Acceder a campos específicos
```typescript
// Obtener un control específico
const emailControl = this.loginForm.get('email');

// Acceder a su valor
const emailValue = emailControl?.value;

// Verificar si tiene errores
const hasEmailError = emailControl?.invalid && emailControl?.touched;

// Obtener errores específicos
const emailErrors = emailControl?.errors; // { required: true } o { email: true }
```

#### Paso 4: En el template
```html
<form [formGroup]="loginForm" (ngSubmit)="onSubmit()">
  <!-- FormControl vinculado al input -->
  <input 
    type="email" 
    [formControl]="loginForm.get('email')"
    placeholder="tu@email.com">

  <!-- Mostrar errores si el campo es inválido y tocado -->
  @if (loginForm.get('email')?.invalid && loginForm.get('email')?.touched) {
    <div class="error-message">
      @if (loginForm.get('email')?.hasError('required')) {
        Email es requerido
      }
      @if (loginForm.get('email')?.hasError('email')) {
        Email inválido
      }
    </div>
  }

  <!-- Deshabilitar submit si formulario es inválido -->
  <button [disabled]="loginForm.invalid">Enviar</button>
</form>
```

### 1.3 Implementación en componentes

#### Componentes afectados
- `LoginForm` - 2 campos (email, password)
- `RegisterForm` - 4 campos (username, email, password, confirmPassword)
- `ForgotPasswordForm` - 1 campo (email)

#### Cambio estructural: Antes vs. Después

**ANTES (Template-driven con Signals):**
```typescript
export class LoginForm {
  email = signal('');
  password = signal('');
  emailError = signal(false);
  passwordError = signal(false);

  onEmailChange(event: Event) {
    const target = event.target as HTMLInputElement;
    this.email.set(target.value);
    if (this.formSubmitted()) {
      // validación manual...
    }
  }

  onSubmit(event: Event) {
    event.preventDefault();
    // validación manual...
  }
}
```

**DESPUÉS (Formulario reactivo):**
```typescript
export class LoginForm {
  loginForm: FormGroup;

  constructor(private formBuilder: FormBuilder) {
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(8)]]
    });
  }

  onSubmit(): void {
    if (this.loginForm.valid) {
      const formData = this.loginForm.value;
      // Enviar datos al servidor...
    }
  }
}
```

---

## 2. Validadores síncronos integrados

### 2.1 Catálogo de validadores

Angular proporciona validadores síncronos predefinidos en `@angular/forms`:

| Validador | Parámetro | Descripción | Uso |
|-----------|-----------|-------------|-----|
| `required` | - | Campo no puede estar vacío | `Validators.required` |
| `email` | - | Debe ser un email válido | `Validators.email` |
| `minLength(n)` | `n: number` | Longitud mínima de caracteres | `Validators.minLength(8)` |
| `maxLength(n)` | `n: number` | Longitud máxima de caracteres | `Validators.maxLength(20)` |
| `pattern(regex)` | `regex: string \| RegExp` | Debe cumplir patrón regex | `Validators.pattern(/^[a-zA-Z0-9]+$/)` |
| `min(n)` | `n: number` | Valor mínimo (numérico) | `Validators.min(0)` |
| `max(n)` | `n: number` | Valor máximo (numérico) | `Validators.max(100)` |
| `requiredTrue` | - | Checkbox debe estar marcado | `Validators.requiredTrue` |

### 2.2 Ejemplos por caso de uso

#### LoginForm
```typescript
/**
 * Estructura de validación para login
 * - Email: requerido + formato email válido
 * - Contraseña: requerido + mínimo 8 caracteres
 */
this.loginForm = this.formBuilder.group({
  email: [
    '',
    [
      Validators.required,
      Validators.email
    ]
  ],
  password: [
    '',
    [
      Validators.required,
      Validators.minLength(8)
    ]
  ]
});
```

Mensajes de error asociados:
```html
<!-- Email errors -->
@if (loginForm.get('email')?.hasError('required')) {
  <p class="error">Email es requerido</p>
}

@if (loginForm.get('email')?.hasError('email')) {
  <p class="error">Email debe ser válido (ej: usuario@dominio.com)</p>
}

<!-- Password errors -->
@if (loginForm.get('password')?.hasError('required')) {
  <p class="error">Contraseña es requerida</p>
}

@if (loginForm.get('password')?.hasError('minlength')) {
  <p class="error">Contraseña debe tener al menos 8 caracteres</p>
}
```

#### RegisterForm
```typescript
/**
 * Estructura de validación para registro
 * - Username: requerido + alfanuméricos/guiones + 3-20 caracteres
 * - Email: requerido + formato válido
 * - Password: requerido + mínimo 8 caracteres + patrón (mayúscula + especial)
 * - ConfirmPassword: requerido
 */
this.registerForm = this.formBuilder.group({
  username: [
    '',
    [
      Validators.required,
      Validators.minLength(3),
      Validators.maxLength(20),
      Validators.pattern(/^[a-zA-Z0-9_]+$/)
    ]
  ],
  email: [
    '',
    [
      Validators.required,
      Validators.email
    ]
  ],
  password: [
    '',
    [
      Validators.required,
      Validators.minLength(8),
      Validators.pattern(/^(?=.*[A-Z])(?=.*[!@#$%^&*])/)
    ]
  ],
  confirmPassword: [
    '',
    [Validators.required]
  ]
}, { 
  validators: this.passwordMatchValidator()  // Validador a nivel de grupo
});
```

Patrón explicado:
- `^[a-zA-Z0-9_]+$` - Solo letras mayúsculas/minúsculas, números y guiones bajos
- `^(?=.*[A-Z])(?=.*[!@#$%^&*])/` - Lookahead: contiene mayúscula Y carácter especial

#### ForgotPasswordForm
```typescript
/**
 * Estructura de validación para recuperación de contraseña
 * - Email: requerido + formato válido
 */
this.forgotForm = this.formBuilder.group({
  email: [
    '',
    [
      Validators.required,
      Validators.email
    ]
  ]
});
```

---

## 3. Validadores custom de grupo

Los validadores de grupo se aplican a nivel de FormGroup y permiten validar relaciones entre campos:

```typescript
/**
 * Validador Custom: Coincidencia de contraseñas
 * 
 * PROPÓSITO:
 * Verificar que password y confirmPassword tengan el mismo valor
 * 
 * TIPO: Validador de grupo (FormGroup level)
 * 
 * RETORNA:
 * - null: contraseñas coinciden (válido)
 * - { passwordMismatch: true }: no coinciden (inválido)
 */
private passwordMatchValidator(): ValidatorFn {
  return (group: AbstractControl): ValidationErrors | null => {
    const password = group.get('password')?.value;
    const confirmPassword = group.get('confirmPassword')?.value;

    // Si alguno está vacío, Validators.required se encarga
    if (!password || !confirmPassword) {
      return null;
    }

    return password === confirmPassword
      ? null
      : { passwordMismatch: true };
  };
}

// Aplicar al FormGroup
this.registerForm = this.formBuilder.group({
  password: ['', [Validators.required, Validators.minLength(8)]],
  confirmPassword: ['', [Validators.required]]
}, { 
  validators: this.passwordMatchValidator()  // ← Validador de grupo
});
```

Acceso en el template:
```html
<!-- Verificar error a nivel de FormGroup -->
@if (registerForm.hasError('passwordMismatch')) {
  <p class="error">Las contraseñas no coinciden</p>
}
```

---

## 4. Validadores personalizados

Los validadores personalizados son **funciones reutilizables** que retornan `ValidatorFn` y pueden aplicarse a cualquier `FormControl` o `FormGroup`.

### 4.1 Validador de contraseña fuerte

**Propósito:** Asegurar que las contraseñas cumplan con requisitos mínimos de seguridad.

**Requisitos:**
- Mínimo 12 caracteres
- Al menos una letra mayúscula
- Al menos una letra minúscula
- Al menos un número
- Al menos un carácter especial

**Ubicación:** `frontend/src/app/validators/password-strength.validator.ts`

**Implementación:**
```typescript
// validators/password-strength.validator.ts
export function passwordStrength(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const value = control.value;
    if (!value) return null;

    const hasUpper = /[A-Z]/.test(value);
    const hasLower = /[a-z]/.test(value);
    const hasNumber = /\d/.test(value);
    const hasSpecial = /[!@#$%^&*(),.?":{}|<>]/.test(value);
    const minLength = value.length >= 12;

    const errors: ValidationErrors = {};
    if (!hasUpper) errors['noUppercase'] = true;
    if (!hasLower) errors['noLowercase'] = true;
    if (!hasNumber) errors['noNumber'] = true;
    if (!hasSpecial) errors['noSpecial'] = true;
    if (!minLength) errors['minLength'] = { requiredLength: 12, actualLength: value.length };

    return Object.keys(errors).length ? errors : null;
  };
}
```

**Uso en FormBuilder:**
```typescript
import { passwordStrength, getPasswordErrorMessage } from '@app/validators';

this.form = this.formBuilder.group({
  password: ['', [Validators.required, passwordStrength()]]
});

// En el componente - obtener errores de contraseña
getPasswordErrors(): string[] {
  const errors = this.form.get('password')?.errors;
  return errors ? Object.keys(errors) : [];
}
```

**Uso en template:**
```html
<form [formGroup]="form">
  <input formControlName="password" type="password">

  <!-- Mostrar errores específicos -->
  @for (error of getPasswordErrors(); track error) {
    <div class="error">
      {{ getPasswordErrorMessage(error) }}
    </div>
  }
</form>

<!-- Template detail -->
@if (form.get('password')?.errors?.['noUppercase']) {
  <div class="error">Debe contener mayúsculas</div>
}
@if (form.get('password')?.errors?.['noLowercase']) {
  <div class="error">Debe contener minúsculas</div>
}
@if (form.get('password')?.errors?.['noNumber']) {
  <div class="error">Debe contener números</div>
}
@if (form.get('password')?.errors?.['noSpecial']) {
  <div class="error">Debe contener caracteres especiales (!@#$%)</div>
}
@if (form.get('password')?.errors?.['minLength']) {
  <div class="error">Mínimo 12 caracteres</div>
}
```

### 4.2 Validador de confirmación de contraseña

**Propósito:** Garantizar que el usuario confirme correctamente su contraseña (cross-field validation).

**Ubicación:** `frontend/src/app/validators/password-match.validator.ts`

**Implementación:**
```typescript
// validators/password-match.validator.ts
export function passwordMatch(controlName: string, matchControlName: string): ValidatorFn {
  return (group: AbstractControl): ValidationErrors | null => {
    const control = group.get(controlName);
    const matchControl = group.get(matchControlName);

    if (!control || !matchControl) return null;
    if (matchControl.errors && !matchControl.touched) return null;

    return control.value === matchControl.value
      ? null
      : { mismatch: true };
  };
}
```

**Uso en FormBuilder:**
```typescript
import { passwordMatch, getPasswordMatchErrorMessage } from '@app/validators';

this.registerForm = this.formBuilder.group({
  password: ['', [Validators.required, passwordStrength()]],
  confirmPassword: ['', Validators.required]
}, { 
  validators: passwordMatch('password', 'confirmPassword')
});
```

**Uso en template:**
```html
<form [formGroup]="registerForm">
  <input formControlName="password" type="password" placeholder="Contraseña">
  <input formControlName="confirmPassword" type="password" placeholder="Confirmar contraseña">

  <!-- Error a nivel de FormGroup (cross-field) -->
  @if (registerForm.errors?.['mismatch'] && registerForm.get('confirmPassword')?.touched) {
    <div class="error">{{ getPasswordMatchErrorMessage() }}</div>
  }
</form>
```

### 4.3 Validador de formatos personalizados (NIF, teléfono, código postal)

**Ubicación:** `frontend/src/app/validators/spanish-formats.validator.ts`

#### Validador NIF/DNI:
```typescript
export function nif(): ValidatorFn {
  return (control): ValidationErrors | null => {
    const nifUpper = control.value?.toUpperCase();
    const nifRegex = /^[0-9]{8}[TRWAGMYFPDXBCSQVJHZTKB]$/;
    if (!nifRegex.test(nifUpper)) return { invalidNif: true };

    const letters = 'TRWAGMYFPDXBCSQVJHZTKB';
    const position = parseInt(nifUpper.substring(0, 8)) % 23;
    return letters[position] === nifUpper[8] ? null : { invalidNif: true };
  };
}
```

#### Validador Teléfono:
```typescript
export function telefono(): ValidatorFn {
  return (control): ValidationErrors | null => {
    return /^[67][0-9]{8}$/.test(control.value) ? null : { invalidTelefono: true };
  };
}
```

#### Validador Código Postal:
```typescript
export function codigoPostal(): ValidatorFn {
  return (control): ValidationErrors | null => {
    const cp = control.value;
    if (!/^\d{5}$/.test(cp)) return { invalidCP: true };
    
    const numCP = parseInt(cp, 10);
    return numCP > 52999 ? { invalidCP: true } : null;
  };
}
```

**Uso en FormBuilder:**
```typescript
import { nif, telefono, codigoPostal, getFormatErrorMessage } from '@app/validators';

this.addressForm = this.formBuilder.group({
  nif: ['', [Validators.required, nif()]],
  phone: ['', [Validators.required, telefono()]],
  zipCode: ['', [Validators.required, codigoPostal()]]
});
```

**Uso en template:**
```html
<input formControlName="nif">
@if (form.get('nif')?.errors?.['invalidNif']) {
  <div class="error">{{ getFormatErrorMessage('invalidNif') }}</div>
}

<input formControlName="phone">
@if (form.get('phone')?.errors?.['invalidTelefono']) {
  <div class="error">{{ getFormatErrorMessage('invalidTelefono') }}</div>
}

<input formControlName="zipCode">
@if (form.get('zipCode')?.errors?.['invalidCP']) {
  <div class="error">{{ getFormatErrorMessage('invalidCP') }}</div>
}
```

---

## 5. Validadores Cross-Field Avanzados

Los validadores cross-field se aplican a nivel `FormGroup` para validaciones que involucran múltiples campos.

**Ubicación:** `frontend/src/app/validators/cross-field.validators.ts`

### 5.1 Validador: Al Menos Uno Requerido

```typescript
export function atLeastOneRequired(...fields: string[]): ValidatorFn {
  return (group: AbstractControl): ValidationErrors | null => {
    const hasOne = fields.some(field => {
      const control = group.get(field);
      return control && control.value && control.value.toString().trim().length > 0;
    });

    return hasOne ? null : { atLeastOneRequired: { fields } };
  };
}
```

**Uso:**
```typescript
this.contactForm = this.fb.group({
  phone: [''],
  email: ['']
}, {
  validators: atLeastOneRequired('phone', 'email')
});
```

**Template:**
```html
@if (contactForm.errors?.['atLeastOneRequired']) {
  <div class="error">
    Complete al menos: {{ contactForm.errors['atLeastOneRequired'].fields.join(', ') }}
  </div>
}
```

### 5.2 Validador: Rango de Fechas

```typescript
export function validDateRange(startField: string, endField: string): ValidatorFn {
  return (group: AbstractControl): ValidationErrors | null => {
    const startControl = group.get(startField);
    const endControl = group.get(endField);

    if (!startControl?.value || !endControl?.value) return null;

    const startDate = new Date(startControl.value);
    const endDate = new Date(endControl.value);

    return startDate < endDate ? null : { invalidRange: true };
  };
}
```

---

## 6. FormArray - Colecciones dinámicas de controles

FormArray permite gestionar colecciones dinámicas de FormControls o FormGroups, ideal para:
- Listas de ítems añadibles/eliminables dinámicamente
- Múltiples direcciones
- Líneas de un carrito de compras

### 6.1 Ejemplo básico - Lista de géneros favoritos:

```typescript
/**
 * FormArray - Gestor de colecciones dinámicas
 * 
 * PROPÓSITO:
 * Manejar listas de controles que se pueden añadir/eliminar en tiempo de ejecución
 * 
 * CASOS DE USO:
 * - Lista de géneros musicales favoritos (múltiples selecciones)
 * - Direcciones múltiples del usuario
 * - Líneas dinámicas de compra
 * - Teléfonos de contacto alternativos
 */
this.musicForm = this.formBuilder.group({
  username: ['', Validators.required],
  favoriteGenres: this.formBuilder.array([
    this.formBuilder.control('', Validators.required)
  ])
});

// Acceso a FormArray
get genresArray(): FormArray {
  return this.musicForm.get('favoriteGenres') as FormArray;
}

// Añadir nuevo género
addGenre(): void {
  this.genresArray.push(
    this.formBuilder.control('', Validators.required)
  );
}

// Eliminar género por índice
removeGenre(index: number): void {
  this.genresArray.removeAt(index);
}

// Obtener todos los géneros
getGenres(): any[] {
  return this.genresArray.value;
}
```

**Uso en template:**
```html
<form [formGroup]="musicForm">
  <input 
    type="text" 
    formControlName="username" 
    placeholder="Nombre de usuario">

  <fieldset formArrayName="favoriteGenres">
    <!-- Iterar sobre cada género dinámico -->
    @for (genre of genresArray.controls; let i = $index) {
      <div class="genre-item">
        <select [formControl]="genre">
          <option value="">Seleccionar género</option>
          <option value="rock">Rock</option>
          <option value="jazz">Jazz</option>
          <option value="classical">Clásica</option>
          <option value="pop">Pop</option>
        </select>

        <!-- Botón para eliminar este género -->
        <button 
          type="button" 
          (click)="removeGenre(i)"
          class="btn-delete">
          ✕
        </button>
      </div>
    }
  </fieldset>

  <!-- Botón para añadir nuevo género -->
  <button 
    type="button" 
    (click)="addGenre()"
    class="btn-add">
    + Añadir otro género
  </button>

  <button 
    type="submit" 
    [disabled]="musicForm.invalid">
    Guardar
  </button>
</form>
```

### 6.2 Validación en FormArray:

```typescript
// Validador personalizado para FormArray
/**
 * Verificar que al menos un elemento está seleccionado
 * 
 * Útil para asegurar que el usuario selecciona al menos un género
 */
requireCheckedToTrue(): ValidatorFn {
  return (formArray: AbstractControl) => {
    const array = formArray as FormArray;
    const checked = array.controls.some(control => control.value);
    return checked ? null : { requireCheckedToTrue: true };
  };
}

// Aplicar al FormArray
this.musicForm = this.formBuilder.group({
  username: ['', Validators.required],
  favoriteGenres: this.formBuilder.array(
    [this.formBuilder.control('')],
    this.requireCheckedToTrue()
  )
});

// En template - mostrar error si FormArray es inválido
@if (musicForm.get('favoriteGenres')?.hasError('requireCheckedToTrue')) {
  <p class="error">Debes seleccionar al menos un género</p>
}
```

---

## 7. Validación asíncrona

La validación asíncrona permite verificar datos contra un servidor (ej: comprobar si un usuario existe).

**Archivos implementados:**
- `frontend/src/app/validators/async.validators.ts` - Funciones ValidatorFn asíncronas
- `frontend/src/app/services/async-validators.service.ts` - Servicio inyectable

### 7.1 Validador de Email Único

**Ubicación:** `frontend/src/app/validators/async.validators.ts`

```typescript
import { AbstractControl, AsyncValidatorFn, ValidationErrors } from '@angular/forms';
import { Observable, of, timer } from 'rxjs';
import { map, switchMap, take, catchError } from 'rxjs/operators';

/**
 * Validador Asíncrono: Email Único
 *
 * Verifica que el email no esté ya registrado en el sistema.
 * Incluye debounce de 500ms para evitar spam de llamadas API.
 *
 * @param excludeUserId - ID del usuario actual (para edición de perfil)
 * @returns AsyncValidatorFn
 */
export function emailUnique(excludeUserId?: string): AsyncValidatorFn {
  return (control: AbstractControl): Observable<ValidationErrors | null> => {
    const email = control.value?.trim().toLowerCase();

    if (!email) return of(null);

    return timer(500).pipe( // Debounce de 500ms
      switchMap(() => {
        // PRODUCCIÓN: llamada HTTP real
        // return this.http.get<boolean>(`/api/users/email-exists/${email}`)

        // SIMULACIÓN: emails ya registrados
        const registeredEmails = ['admin@discandrecords.com', 'test@example.com'];
        return of(registeredEmails.includes(email)).pipe(
          map(exists => exists ? { emailTaken: true } : null),
          catchError(() => of(null)) // Error de red no bloquea
        );
      }),
      take(1)
    );
  };
}
```

### 7.2 Validador de Username Disponible

```typescript
/**
 * Validador Asíncrono: Username Disponible
 *
 * Verifica que el nombre de usuario esté disponible.
 * Solo valida si el username tiene al menos 3 caracteres.
 */
export function usernameAvailable(): AsyncValidatorFn {
  return (control: AbstractControl): Observable<ValidationErrors | null> => {
    const username = control.value?.trim().toLowerCase();

    if (!username || username.length < 3) return of(null);

    return timer(300).pipe( // Debounce de 300ms
      switchMap(() => {
        const takenUsernames = ['admin', 'root', 'superuser', 'moderator'];
        return of(takenUsernames.includes(username)).pipe(
          map(isTaken => isTaken ? { usernameTaken: true } : null),
          catchError(() => of(null))
        );
      }),
      take(1)
    );
  };
}
```

### 7.3 Servicio AsyncValidatorsService (Inyectable)

**Ubicación:** `frontend/src/app/services/async-validators.service.ts`

```typescript
@Injectable({ providedIn: 'root' })
export class AsyncValidatorsService {
  private readonly defaultDebounceTime = 500;

  /**
   * Validador de Email Único como método del servicio
   */
  emailUnique(excludeUserId?: string, debounceMs?: number): AsyncValidatorFn {
    const debounce = debounceMs ?? this.defaultDebounceTime;

    return (control: AbstractControl): Observable<ValidationErrors | null> => {
      const email = control.value?.trim().toLowerCase();
      if (!email) return of(null);

      return defer(() => timer(debounce)).pipe(
        switchMap(() => this.checkEmailAvailability(email, excludeUserId)),
        take(1)
      );
    };
  }

  /**
   * Validador de Username Disponible como método del servicio
   */
  usernameAvailable(debounceMs?: number): AsyncValidatorFn {
    const debounce = debounceMs ?? this.defaultDebounceTime;

    return (control: AbstractControl): Observable<ValidationErrors | null> => {
      const username = control.value?.trim().toLowerCase();
      if (!username || username.length < 3) return of(null);

      return defer(() => timer(debounce)).pipe(
        switchMap(() => this.checkUsernameAvailability(username)),
        take(1)
      );
    };
  }

  private checkEmailAvailability(email: string, excludeUserId?: string): Observable<ValidationErrors | null> {
    // En producción: this.http.get<boolean>(`/api/users/email-exists/${email}`)
    const registeredEmails = ['admin@discandrecords.com', 'test@example.com'];
    return of(registeredEmails.includes(email)).pipe(
      delay(300 + Math.random() * 500),
      map(exists => exists ? { emailTaken: true } : null),
      catchError(() => of(null))
    );
  }

  private checkUsernameAvailability(username: string): Observable<ValidationErrors | null> {
    const takenUsernames = ['admin', 'root', 'superuser'];
    return of(takenUsernames.includes(username)).pipe(
      delay(200 + Math.random() * 400),
      map(isTaken => isTaken ? { usernameTaken: true } : null),
      catchError(() => of(null))
    );
  }
}
```

### 7.4 Uso en FormBuilder con updateOn: 'blur'

```typescript
// register-form.component.ts
import { AsyncValidatorsService } from '../../services/async-validators.service';
import { emailUnique, usernameAvailable } from '../../validators';

export class RegisterFormComponent {
  registerForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private asyncValidators: AsyncValidatorsService
  ) {
    this.registerForm = this.fb.group({
      // Usando funciones directas
      email: ['', {
        validators: [Validators.required, Validators.email],
        asyncValidators: [emailUnique()],
        updateOn: 'blur' // Solo valida al salir del campo
      }],

      // Usando servicio inyectable
      username: ['', {
        validators: [Validators.required, Validators.minLength(3)],
        asyncValidators: [this.asyncValidators.usernameAvailable()],
        updateOn: 'blur'
      }]
    });
  }

  // Helpers para template
  get email() { return this.registerForm.get('email'); }
  get username() { return this.registerForm.get('username'); }
}
```

### 7.5 Template con Estados de Loading

```html
<form [formGroup]="registerForm" (ngSubmit)="onSubmit()">
  <!-- Email con validación asíncrona -->
  <div class="field">
    <label for="email">Email</label>
    <input 
      type="email" 
      id="email"
      formControlName="email" 
      placeholder="tu@email.com">

    @if (email?.pending) {
      <span class="loading">⏳ Verificando email...</span>
    }

    @if (email?.errors?.['emailTaken'] && !email?.pending) {
      <span class="error">
        Este email ya está registrado. ¿Olvidaste tu contraseña?
      </span>
    }
  </div>

  <!-- Username con validación asíncrona -->
  <div class="field">
    <label for="username">Nombre de usuario</label>
    <input 
      type="text" 
      id="username"
      formControlName="username" 
      placeholder="tu_usuario">

    @if (username?.pending) {
      <span class="loading">⏳ Comprobando disponibilidad...</span>
    }

    @if (username?.errors?.['usernameTaken'] && !username?.pending) {
      <span class="error">
        Este nombre de usuario no está disponible. Prueba otro.
      </span>
    }
  </div>

  <!-- Submit deshabilitado mientras hay validación pendiente -->
  <button 
    type="submit" 
    [disabled]="registerForm.invalid || registerForm.pending">
    Crear cuenta
  </button>
</form>
```

### 7.6 Configuración Avanzada y Mejores Prácticas

| Propiedad | Efecto | Recomendado |
|-----------|--------|-------------|
| `updateOn: 'blur'` | Valida al salir del campo | ✅ Async validators |
| `updateOn: 'submit'` | Solo al enviar form | Performance crítico |
| `debounceTime: 500` | Espera escritura | 300-800ms |
| `pending: true` | Muestra loading | Durante async |

**CSS para feedback visual:**

```scss
.field {
  .loading {
    color: var(--color-info);
    font-style: italic;
    font-size: 0.875rem;
  }

  .error {
    color: var(--color-danger);
    font-size: 0.875rem;
  }

  input.ng-invalid.ng-dirty.ng-touched + .error {
    display: block;
  }

  input.ng-pending {
    border-color: var(--color-info);
  }
}
```

### 7.7 Estados del FormControl/FormGroup

```typescript
/**
 * Estados de validación en tiempo real
 */
control.status   // 'VALID' | 'INVALID' | 'PENDING' | 'DISABLED'
control.pending  // boolean - Hay validación asíncrona en curso

formGroup.valid     // false si hay algún control inválido
formGroup.invalid   // true si hay algún control inválido
formGroup.pending   // true si hay validación asíncrona en curso
formGroup.pristine  // true si no ha sido modificado
formGroup.dirty     // true si ha sido modificado
formGroup.touched   // true si el usuario interactuó
formGroup.untouched // true si no ha sido tocado
```

---

## 8. Catálogo de validadores implementados

### 8.1 Ubicación de archivos

| Archivo | Tipo | Descripción |
|---------|------|-------------|
| `validators/password-strength.validator.ts` | Síncrono | Validador de contraseña fuerte |
| `validators/password-match.validator.ts` | Cross-field | Confirmación de contraseña |
| `validators/spanish-formats.validator.ts` | Síncrono | NIF, teléfono, código postal |
| `validators/cross-field.validators.ts` | Cross-field | atLeastOneRequired, validDateRange |
| `validators/async.validators.ts` | Asíncrono | emailUnique, usernameAvailable |
| `validators/index.ts` | Export | Exportación centralizada |
| `services/async-validators.service.ts` | Servicio | Validadores asíncronos inyectables |

### 8.2 Validadores Síncronos

| Función | Propósito | Retorna |
|---------|-----------|---------|
| `passwordStrength()` | 12+ chars, mayúscula, minúscula, número, especial | `{ noUppercase, noLowercase, noNumber, noSpecial, minLength }` |
| `nif()` | NIF/DNI español con algoritmo mod-23 | `{ invalidNif: true }` |
| `telefono()` | Teléfono móvil español (6XX/7XX) | `{ invalidPhone: true }` |
| `codigoPostal()` | Código postal español (00000-52999) | `{ invalidPostalCode: true }` |

### 8.3 Validadores Cross-Field

| Función | Propósito | Retorna |
|---------|-----------|---------|
| `passwordMatch(control, match)` | Verifica coincidencia de contraseñas | `{ mismatch: true }` |
| `atLeastOneRequired(...fields)` | Al menos un campo con valor | `{ atLeastOneRequired: { fields } }` |
| `validDateRange(start, end)` | Fecha inicio < fecha fin | `{ invalidRange: true }` |

### 8.4 Validadores Asíncronos

| Función | Propósito | Retorna |
|---------|-----------|---------|
| `emailUnique(excludeId?)` | Verifica email no registrado | `{ emailTaken: true }` |
| `usernameAvailable()` | Verifica username disponible | `{ usernameTaken: true }` |
| `AsyncValidatorsService.emailUnique()` | Versión inyectable | `{ emailTaken: true }` |
| `AsyncValidatorsService.usernameAvailable()` | Versión inyectable | `{ usernameTaken: true }` |
| `AsyncValidatorsService.artistNameAvailable()` | Nombre de artista único | `{ artistExists: true }` |

### 8.5 Helpers para Templates

| Función | Propósito | Uso |
|---------|-----------|-----|
| `getPasswordErrorMessage(error)` | Mensaje para errores de password | Templates |
| `getPasswordMatchErrorMessage(error)` | Mensaje para mismatch | Templates |
| `getFormatErrorMessage(error)` | Mensaje para NIF/teléfono/CP | Templates |
| `getCrossFieldErrorMessage(error, obj?)` | Mensaje para cross-field | Templates |
| `getAsyncErrorMessage(error)` | Mensaje para async validators | Templates |

---

## 9. Integración en componentes reales del proyecto

### 9.1 LoginForm - Formulario reactivo con validación simple

**Ubicación:** `frontend/src/app/components/shared/login-form/`

**Implementación:**
```typescript
export class LoginForm {
  /**
   * FormGroup - Contenedor de controles del formulario
   * Agrupa email y password en una sola entidad
   * Proporciona métodos para validar todo el formulario de una vez
   */
  loginForm: FormGroup;

  constructor(private formBuilder: FormBuilder) {
    this.loginForm = this.formBuilder.group({
      email: [
        '',
        [
          Validators.required,
          Validators.email
        ]
      ],
      password: [
        '',
        [
          Validators.required,
          Validators.minLength(8)
        ]
      ]
    });
  }

  /**
   * Getters para acceder a los FormControls
   * Devuelven los controles tipados evitando null
   * Usados en el template: [formControl]="emailControl"
   */
  get emailControl(): FormControl {
    return this.loginForm.get('email') as FormControl;
  }

  get passwordControl(): FormControl {
    return this.loginForm.get('password') as FormControl;
  }

  /**
   * Manejo del submit
   * 
   * FLUJO:
   * 1. Marcar como tocado (para mostrar errores)
   * 2. Validar el formulario completo
   * 3. Si es válido: obtener valores y procesar
   * 4. Si es inválido: errores ya están visibles
   */
  onSubmit(): void {
    this.loginForm.markAllAsTouched();

    if (this.loginForm.valid) {
      this.isSubmitting.set(true);

      const formData = this.loginForm.value;
      // { email: 'usuario@ejemplo.com', password: 'MiPassword123!' }

      // Simular llamada a API
      setTimeout(() => {
        this.isSubmitting.set(false);
        alert('¡Inicio de sesión exitoso!');
      }, 1000);
    }
  }
}
```

**Template:**
```html
<form [formGroup]="loginForm" (ngSubmit)="onSubmit()">
  <!-- Email input con validación en tiempo real -->
  <div class="form-group">
    <label for="email">Email</label>
    <input
      id="email"
      type="email"
      [formControl]="emailControl"
      placeholder="tu@email.com"
      class="form-input"
      [class.form-input--error]="emailControl.invalid && emailControl.touched">

    <!-- Errores específicos -->
    @if (emailControl.hasError('required') && emailControl.touched) {
      <span class="error">Email es requerido</span>
    }
    @if (emailControl.hasError('email') && emailControl.touched) {
      <span class="error">Email inválido</span>
    }
  </div>

  <!-- Password input -->
  <div class="form-group">
    <label for="password">Contraseña</label>
    <input
      id="password"
      type="password"
      [formControl]="passwordControl"
      placeholder="••••••••"
      class="form-input"
      [class.form-input--error]="passwordControl.invalid && passwordControl.touched">

    @if (passwordControl.hasError('required') && passwordControl.touched) {
      <span class="error">Contraseña es requerida</span>
    }
    @if (passwordControl.hasError('minlength') && passwordControl.touched) {
      <span class="error">Mínimo 8 caracteres</span>
    }
  </div>

  <!-- Submit - deshabilitado mientras hay errores -->
  <button 
    type="submit" 
    [disabled]="loginForm.invalid || isSubmitting()"
    class="btn">
    {{ isSubmitting() ? 'Iniciando sesión...' : 'Iniciar sesión' }}
  </button>
</form>
```

### 9.2 RegisterForm - Validadores custom y grupo

**Ubicación:** `frontend/src/app/components/shared/register-form/`

**Características avanzadas:**
- Validador custom a nivel de grupo (passwordMatchValidator)
- Múltiples validadores en cascada
- Feedback en tiempo real
- Patrones regex personalizados

**Implementación:**
```typescript
export class RegisterForm {
  registerForm: FormGroup;
  
  constructor(private formBuilder: FormBuilder) {
    this.registerForm = this.formBuilder.group({
      username: [
        '',
        [
          Validators.required,
          Validators.minLength(3),
          Validators.maxLength(20),
          Validators.pattern(/^[a-zA-Z0-9_]+$/)
        ]
      ],
      email: [
        '',
        [
          Validators.required,
          Validators.email
        ]
      ],
      password: [
        '',
        [
          Validators.required,
          Validators.minLength(8),
          Validators.pattern(/^(?=.*[A-Z])(?=.*[!@#$%^&*])/)
        ]
      ],
      confirmPassword: [
        '',
        [Validators.required]
      ]
    }, { 
      validators: this.passwordMatchValidator()  // Validador de grupo
    });
  }

  /**
   * Validador Custom: Coincidencia de contraseñas
   * 
   * Nivel: FormGroup (valida relación entre campos)
   * 
   * RETORNA:
   * - null: válido (contraseñas coinciden)
   * - { passwordMismatch: true }: inválido (no coinciden)
   */
  private passwordMatchValidator(): ValidatorFn {
    return (group: AbstractControl): ValidationErrors | null => {
      const password = group.get('password')?.value;
      const confirmPassword = group.get('confirmPassword')?.value;

      if (!password || !confirmPassword) {
        return null; // Validators.required lo maneja
      }

      return password === confirmPassword
        ? null
        : { passwordMismatch: true };
    };
  }

  onSubmit(): void {
    this.registerForm.markAllAsTouched();

    if (this.registerForm.valid) {
      this.isSubmitting.set(true);

      const formData = this.registerForm.value;
      // { username, email, password, confirmPassword }

      setTimeout(() => {
        this.isSubmitting.set(false);
        alert('¡Registro exitoso!');
      }, 1000);
    }
  }
}
```

### 9.3 Patrón completo - Inyección de ValidationService

Para reutilizar lógica de validación entre componentes, se recomienda inyectar `ValidationService`:

```typescript
export class MyFormComponent {
  myForm: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private validationService: ValidationService
  ) {
    this.myForm = this.formBuilder.group({
      email: [
        '',
        [Validators.required],
        [this.validationService.validateEmailAsync()]  // Validador asíncrono
      ]
    });
  }

  // Usar métodos del servicio para validación manual
  checkEmail(email: string): void {
    const result = this.validationService.validateEmail(email);
    if (!result.isValid) {
      console.error(result.errorMessage);
    }
  }

  // Obtener feedback de contraseña
  getPasswordFeedback(password: string): void {
    const strength = this.validationService.getPasswordStrength(password);
    console.log(`Fortaleza: ${strength.score}/5`);
  }
}
```

---

## 11. Checklist de validación según rúbrica

✅ **Validadores personalizados:**
- ✅ Validador de contraseña fuerte (12+ caracteres, mayúscula, minúscula, número, especial)
- ✅ Validador de confirmación de contraseña (coincidencia)
- ✅ Validadores de formato (NIF con mod-23, teléfono 6XX/7XX, código postal 00000-52999)

✅ **FormArray:**
- ✅ Implementación con métodos add/remove
- ✅ Validación a nivel de array
- ✅ Ejemplos con lista de géneros musicales

✅ **Validación asíncrona:**
- ✅ `emailUnique()` - Verificar email no registrado con debounce 500ms
- ✅ `usernameAvailable()` - Verificar disponibilidad de username con debounce 300ms
- ✅ `AsyncValidatorsService` - Servicio inyectable para validadores async
- ✅ Manejo de estado `pending` en templates
- ✅ Configuración `updateOn: 'blur'` para optimización

✅ **Documentación:**
- ✅ Catálogo completo de validadores (síncronos, cross-field, async)
- ✅ Guía de uso de FormArray con ejemplos
- ✅ Ejemplos detallados de validación asíncrona
- ✅ Patrones de integración en componentes reales

---

## 10. Resumen de cambios

- ✅ FormBuilder para construcción declarativa de formularios
- ✅ FormGroup para agrupar FormControls relacionados
- ✅ FormControl para campos individuales con validación integrada
- ✅ Validadores síncronos predefinidos de Angular (`required`, `email`, `minLength`, `maxLength`, `pattern`)
- ✅ Validadores custom a nivel de grupo (passwordMatchValidator)
- ✅ Validadores personalizados de negocio (NIF, teléfono, código postal, contraseña fuerte)
- ✅ FormArray para colecciones dinámicas de controles
- ✅ Validación asíncrona con AsyncValidatorFn
- ✅ Integración con observables y debounceTime para optimización

---

## 12. Validacion de elementos de array

### 12.1 Validadores de coleccion

Los validadores de coleccion se aplican al FormArray completo y validan propiedades de la coleccion en su conjunto.

**Ubicacion:** `frontend/src/app/validators/array-item.validators.ts`

#### minArrayLength

Valida que el FormArray tenga un numero minimo de elementos.

```typescript
import { minArrayLength } from '@app/validators';

// Al menos 1 direccion requerida
addresses: this.fb.array(
  [this.createAddressGroup()],
  [minArrayLength(1)]
)

// Error generado: { minArrayLength: { required: 1, actual: 0 } }
```

#### maxArrayLength

Valida que el FormArray no exceda un numero maximo de elementos.

```typescript
import { maxArrayLength } from '@app/validators';

// Maximo 5 telefonos
phones: this.fb.array([], [maxArrayLength(5)])

// Error generado: { maxArrayLength: { max: 5, actual: 6 } }
```

#### arrayLengthRange

Valida que el FormArray tenga entre min y max elementos.

```typescript
import { arrayLengthRange } from '@app/validators';

// Entre 1 y 3 direcciones
addresses: this.fb.array([], [arrayLengthRange(1, 3)])
```

#### uniqueItems

Valida que no haya elementos duplicados en el array.

```typescript
import { uniqueItems } from '@app/validators';

// Telefonos unicos (FormArray de FormControl)
phones: this.fb.array([], [uniqueItems()])

// Emails unicos dentro de FormGroups
contacts: this.fb.array([], [uniqueItems('email')])
```

#### atLeastOneValidItem

Valida que al menos un elemento del array tenga un valor valido.

```typescript
import { atLeastOneValidItem } from '@app/validators';

genres: this.fb.array([
  this.fb.control(''),
  this.fb.control('')
], [atLeastOneValidItem()])
```

### 12.2 Validadores de elemento individual

Los validadores de elemento se aplican a cada FormGroup dentro del FormArray.

#### completeAddress

Valida que un FormGroup de direccion tenga todos los campos requeridos.

```typescript
import { completeAddress } from '@app/validators';

private createAddressGroup(): FormGroup {
  return this.fb.group({
    street: ['', Validators.required],
    city: ['', Validators.required],
    postalCode: ['', [Validators.required, Validators.pattern(/^\d{5}$/)]]
  }, { validators: completeAddress() });
}

// Error: { completeAddress: { missingFields: ['calle', 'ciudad'], message: 'Faltan: calle, ciudad' } }
```

#### validInvoiceItem

Valida que un item de factura tenga descripcion, cantidad y precio validos.

```typescript
import { validInvoiceItem } from '@app/validators';

private createInvoiceItem(): FormGroup {
  return this.fb.group({
    description: ['', Validators.required],
    quantity: [1, [Validators.required, Validators.min(1)]],
    price: [0, [Validators.required, Validators.min(0)]]
  }, { validators: validInvoiceItem() });
}
```

#### validContact

Valida que un contacto tenga nombre y al menos un metodo de contacto (telefono o email).

```typescript
import { validContact } from '@app/validators';

private createContactGroup(): FormGroup {
  return this.fb.group({
    name: ['', Validators.required],
    phone: [''],
    email: ['', Validators.email]
  }, { validators: validContact() });
}

// Error: { missingContactMethod: { message: 'Se requiere telefono o email' } }
```

### 12.3 Mensajes de error para validadores de array

```typescript
import { getArrayValidatorErrorMessage } from '@app/validators';

// En el componente
getArrayError(array: FormArray): string {
  if (!array.errors) return '';

  const errorKey = Object.keys(array.errors)[0];
  return getArrayValidatorErrorMessage(errorKey, array.errors[errorKey]);
}

// En el template
@if (addressesArray.errors && addressesArray.touched) {
  <p class="error">{{ getArrayError(addressesArray) }}</p>
}
```

---

## 13. Gestion de estados de formulario

### 13.1 FormStateService

Servicio centralizado para gestionar estados de validacion, interaccion y feedback visual.

**Ubicacion:** `frontend/src/app/services/form-state.ts`

#### Inyeccion del servicio

```typescript
import { FormStateService } from '@app/services/form-state';

export class MyComponent {
  formState = inject(FormStateService);

  myForm: FormGroup;
}
```

### 13.2 Mostrar errores solo despues de touched/dirty

Los errores solo deben mostrarse cuando el usuario ha interactuado con el campo.

#### Metodo shouldShowErrors

```typescript
/**
 * Determina si se deben mostrar errores para un control
 *
 * LOGICA:
 * Los errores solo se muestran cuando:
 * 1. El control tiene errores (invalid)
 * 2. El usuario ha interactuado (touched) O ha modificado el valor (dirty)
 */
shouldShowErrors(control: AbstractControl | null): boolean {
  if (!control) return false;
  return control.invalid && (control.touched || control.dirty);
}
```

#### Uso en el componente

```typescript
// En el componente
shouldShowError(controlName: string): boolean {
  const control = this.myForm.get(controlName);
  return this.formState.shouldShowErrors(control);
}

// Combinado con estado de submit
shouldShowErrorCombined(control: FormControl): boolean {
  return this.formState.shouldShowErrorsCombined(control, this.formSubmitted());
}
```

#### Uso en el template

```html
<!-- Solo muestra error si touched o dirty -->
@if (formState.shouldShowErrors(emailControl)) {
  <p class="error" role="alert">
    @if (emailControl.hasError('required')) {
      El email es requerido
    }
  </p>
}

<!-- Muestra error si touched, dirty O si se intento submit -->
@if (shouldShowErrorCombined(emailControl)) {
  <p class="error" role="alert">...</p>
}
```

### 13.3 Deshabilitar submit si formulario invalido

#### Metodo isSubmitDisabled

```typescript
/**
 * Determina si el boton de submit debe estar deshabilitado
 *
 * LOGICA:
 * El submit se deshabilita si:
 * 1. El formulario es invalido
 * 2. Hay validaciones asincronas pendientes (pending)
 * 3. Se esta procesando un envio (isSubmitting)
 */
isSubmitDisabled(form: FormGroup, isSubmitting: boolean = false): boolean {
  return form.invalid || form.pending || isSubmitting;
}
```

#### Uso en el template

```html
<button
  type="submit"
  [disabled]="formState.isSubmitDisabled(myForm, isSubmitting())"
  [attr.aria-busy]="isSubmitting()">
  @if (isSubmitting()) {
    <span class="spinner"></span>
    Guardando...
  } @else {
    Guardar
  }
</button>
```

### 13.4 Loading states durante validacion asincrona

#### Detectar estado pending

```typescript
/**
 * Verifica si un control tiene validacion asincrona pendiente
 */
isValidationPending(control: AbstractControl | null): boolean {
  if (!control) return false;
  return control.status === 'PENDING';
}
```

#### Template con indicador de carga

```html
<div class="form-field">
  <input
    type="email"
    formControlName="email"
    [class.input--pending]="emailControl.status === 'PENDING'" />

  <!-- Indicador de validacion asincrona -->
  @if (emailControl.status === 'PENDING') {
    <span class="loading-indicator" aria-live="polite">
      <span class="spinner spinner--small"></span>
      Verificando disponibilidad...
    </span>
  }

  <!-- Indicador de exito (solo si valido y no pending) -->
  @if (emailControl.valid && emailControl.touched && emailControl.status !== 'PENDING') {
    <span class="success-icon" aria-label="Valido">&#10003;</span>
  }
</div>
```

### 13.5 Feedback visual de validacion

#### Metodo getValidationClasses

```typescript
/**
 * Obtiene las clases CSS para feedback visual de un control
 */
getValidationClasses(control: AbstractControl | null, baseClass: string): Record<string, boolean> {
  if (!control) return {};

  const showError = this.shouldShowErrors(control);
  const showSuccess = this.isValidAndTouched(control);
  const isPending = this.isValidationPending(control);

  return {
    [`${baseClass}--error`]: showError,
    [`${baseClass}--success`]: showSuccess && !isPending,
    [`${baseClass}--pending`]: isPending,
    [`${baseClass}--touched`]: control.touched,
    [`${baseClass}--dirty`]: control.dirty
  };
}
```

#### Metodo getFeedbackState

```typescript
/**
 * Obtiene el estado de feedback para un control
 * @returns 'error' | 'success' | 'pending' | 'neutral'
 */
getFeedbackState(control: AbstractControl | null): 'error' | 'success' | 'pending' | 'neutral' {
  if (!control) return 'neutral';

  if (this.isValidationPending(control)) return 'pending';
  if (this.shouldShowErrors(control)) return 'error';
  if (this.isValidAndTouched(control)) return 'success';
  return 'neutral';
}
```

#### Uso en el template

```html
<!-- Usando ngClass con getValidationClasses -->
<input
  type="email"
  formControlName="email"
  class="form-input"
  [ngClass]="formState.getValidationClasses(emailControl, 'form-input')" />

<!-- Usando getFeedbackState para iconos -->
@switch (formState.getFeedbackState(emailControl)) {
  @case ('pending') {
    <span class="spinner"></span>
  }
  @case ('error') {
    <span class="icon-error">!</span>
  }
  @case ('success') {
    <span class="icon-success">&#10003;</span>
  }
}
```

### 13.6 Estilos CSS para feedback visual

```scss
// Variables de colores
$color-success: #28a745;
$color-error: #dc3545;
$color-pending: #6c757d;
$transition: 0.15s ease-in-out;

.form-input {
  border: 2px solid #ced4da;
  transition: border-color $transition, box-shadow $transition;

  &:focus {
    border-color: #3d5a80;
    box-shadow: 0 0 0 3px rgba(#3d5a80, 0.1);
  }

  // Estado de error
  &--error {
    border-color: $color-error;
    background-color: rgba($color-error, 0.02);

    &:focus {
      box-shadow: 0 0 0 3px rgba($color-error, 0.1);
    }
  }

  // Estado de exito
  &--success {
    border-color: $color-success;
    background-color: rgba($color-success, 0.02);

    &:focus {
      box-shadow: 0 0 0 3px rgba($color-success, 0.1);
    }
  }

  // Estado de validacion pendiente
  &--pending {
    border-color: $color-pending;
    background-color: rgba($color-pending, 0.02);
  }
}

// Mensajes de error
.form-error {
  margin-top: 0.25rem;
  padding: 0.25rem 0.5rem;
  font-size: 0.8125rem;
  color: $color-error;
  background-color: rgba($color-error, 0.05);
  border-left: 3px solid $color-error;
}

// Indicador de carga
.loading-indicator {
  display: flex;
  align-items: center;
  gap: 0.25rem;
  font-size: 0.75rem;
  color: $color-pending;
}

// Icono de exito
.success-icon {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 20px;
  height: 20px;
  background-color: $color-success;
  color: white;
  border-radius: 50%;
  font-size: 0.75rem;
}
```

---

## 14. Gestion de FormArray con FormStateService

### 14.1 Metodos especificos para FormArray

#### shouldShowArrayItemErrors

```typescript
/**
 * Verifica si un elemento de FormArray debe mostrar errores
 */
shouldShowArrayItemErrors(formArray: FormArray, index: number): boolean {
  const control = formArray.at(index);
  return this.shouldShowErrors(control);
}
```

#### getArrayItemsState

```typescript
/**
 * Obtiene el estado de todos los elementos de un FormArray
 */
getArrayItemsState(formArray: FormArray): ArrayItemState[] {
  return formArray.controls.map((control, index) => ({
    index,
    valid: control.valid,
    invalid: control.invalid,
    touched: control.touched,
    dirty: control.dirty,
    pending: control.pending,
    showError: this.shouldShowErrors(control),
    errors: control.errors
  }));
}
```

#### markArrayAsTouched

```typescript
/**
 * Marca todos los elementos de un FormArray como touched
 * Util para mostrar todos los errores al intentar submit
 */
markArrayAsTouched(formArray: FormArray): void {
  formArray.controls.forEach(control => {
    control.markAsTouched();
    if (control instanceof FormGroup) {
      Object.values(control.controls).forEach(c => c.markAsTouched());
    }
  });
}
```

### 14.2 Ejemplo completo de FormArray con validacion

```typescript
@Component({
  selector: 'app-addresses-form',
  template: `
    <form [formGroup]="form" (ngSubmit)="onSubmit()">
      <!-- Error a nivel de array -->
      @if (addressesArray.errors && addressesArray.touched) {
        <p class="error">{{ getArrayError(addressesArray) }}</p>
      }

      <div formArrayName="addresses">
        @for (address of addressesArray.controls; track $index; let i = $index) {
          <div [formGroupName]="i" class="address-item">
            <span>Direccion {{ i + 1 }}</span>

            <input formControlName="street" placeholder="Calle"
              [class.input--error]="shouldShowError(getControl(i, 'street'))" />

            @if (shouldShowError(getControl(i, 'street'))) {
              <span class="error">La calle es requerida</span>
            }

            <input formControlName="city" placeholder="Ciudad"
              [class.input--error]="shouldShowError(getControl(i, 'city'))" />

            <button type="button" (click)="removeAddress(i)"
              [disabled]="addressesArray.length <= 1">
              Eliminar
            </button>
          </div>
        }
      </div>

      <button type="button" (click)="addAddress()"
        [disabled]="addressesArray.length >= 3">
        + Agregar direccion
      </button>

      <button type="submit"
        [disabled]="formState.isSubmitDisabled(form, isSubmitting())">
        Guardar
      </button>
    </form>
  `
})
export class AddressesFormComponent {
  formState = inject(FormStateService);
  private fb = inject(FormBuilder);

  form = this.fb.group({
    addresses: this.fb.array(
      [this.createAddress()],
      [minArrayLength(1), maxArrayLength(3)]
    )
  });

  formSubmitted = signal(false);
  isSubmitting = signal(false);

  get addressesArray(): FormArray {
    return this.form.get('addresses') as FormArray;
  }

  private createAddress(): FormGroup {
    return this.fb.group({
      street: ['', Validators.required],
      city: ['', Validators.required]
    }, { validators: completeAddress() });
  }

  getControl(index: number, field: string): FormControl {
    return this.addressesArray.at(index).get(field) as FormControl;
  }

  shouldShowError(control: FormControl): boolean {
    return this.formState.shouldShowErrorsCombined(control, this.formSubmitted());
  }

  addAddress(): void {
    this.addressesArray.push(this.createAddress());
  }

  removeAddress(index: number): void {
    this.addressesArray.removeAt(index);
  }

  onSubmit(): void {
    this.formSubmitted.set(true);
    this.form.markAllAsTouched();
    this.formState.markArrayAsTouched(this.addressesArray);

    if (this.form.valid) {
      this.isSubmitting.set(true);
      // Logica de envio...
    }
  }
}
```

---

## 15. Catalogo actualizado de validadores

### 15.1 Ubicacion de archivos

| Archivo | Descripcion |
|---------|-------------|
| `validators/index.ts` | Indice de exportaciones |
| `validators/password-strength.validator.ts` | Validador de fuerza de contrasena |
| `validators/password-match.validator.ts` | Validador de coincidencia de contrasenas |
| `validators/spanish-formats.validator.ts` | NIF, telefono, codigo postal |
| `validators/cross-field.validators.ts` | Validadores de grupo |
| `validators/async.validators.ts` | Validadores asincronos |
| `validators/array-item.validators.ts` | Validadores de elementos de array |

### 15.2 Validadores de Array

| Validador | Tipo | Descripcion |
|-----------|------|-------------|
| `minArrayLength(n)` | Coleccion | Minimo n elementos |
| `maxArrayLength(n)` | Coleccion | Maximo n elementos |
| `arrayLengthRange(min, max)` | Coleccion | Entre min y max elementos |
| `atLeastOneValidItem()` | Coleccion | Al menos un elemento valido |
| `allItemsValid()` | Coleccion | Todos los elementos validos |
| `uniqueItems(field?)` | Coleccion | Sin elementos duplicados |
| `completeAddress()` | Elemento | Direccion con todos los campos |
| `validInvoiceItem()` | Elemento | Item de factura valido |
| `validContact()` | Elemento | Contacto con nombre y medio de contacto |

### 15.3 Servicios relacionados

| Servicio | Descripcion |
|----------|-------------|
| `FormStateService` | Gestion de estados de formulario |
| `AsyncValidatorsService` | Validadores asincronos inyectables |
| `ValidationService` | Validacion de campos individuales |
| `LoadingService` | Estados de carga global y local |

---

## 16. Componente de demostracion

Se ha implementado un componente de demostracion que integra todos los conceptos:

**Ubicacion:** `frontend/src/app/components/shared/dynamic-form-demo/`

**Archivos:**
- `dynamic-form-demo.ts` - Logica del componente
- `dynamic-form-demo.html` - Template con todos los patrones
- `dynamic-form-demo.scss` - Estilos con feedback visual

**Caracteristicas demostradas:**
- FormArray de direcciones con validacion individual
- FormArray de telefonos con validacion de formato
- FormArray de contactos de emergencia con validacion de grupo
- Validacion asincrona de email y username
- Feedback visual completo (error, success, pending)
- Deshabilitar submit cuando invalido o pending
- Mostrar errores solo despues de interaccion


