# Documentación Técnica Frontend — Fase 3: Formularios Reactivos

**Proyecto:** Disc and Records  \
**Fase:** 3 - Formularios Reactivos Avanzados  \
**Versión:** 1.0  \
**Última actualización:** 16 de diciembre de 2025  \
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
- [4. Validadores personalizados](#4-validadores-personalizados)
  - [4.1 Validador de contraseña fuerte](#41-validador-de-contraseña-fuerte)
  - [4.2 Validador de confirmación de contraseña](#42-validador-de-confirmación-de-contraseña)
  - [4.3 Validador de formatos personalizados (NIF, teléfono, código postal)](#43-validador-de-formatos-personalizados-nif-teléfono-código-postal)
- [5. FormArray - Colecciones dinámicas de controles](#5-formarray---colecciones-dinámicas-de-controles)
  - [5.1 Ejemplo básico - Lista de géneros favoritos](#51-ejemplo-básico---lista-de-géneros-favoritos)
  - [5.2 Validación en FormArray](#52-validación-en-formarray)
- [6. Validación asíncrona](#6-validación-asíncrona)
  - [6.1 Validador asíncrono personalizado](#61-validador-asíncrono-personalizado)
  - [6.2 Integración en FormControl](#62-integración-en-formcontrol)
  - [6.3 Uso en template - mostrar estado pendiente](#63-uso-en-template---mostrar-estado-pendiente)
  - [6.4 Estados del FormControl/FormGroup](#64-estados-del-formcontrolformgroup)
- [7. Catálogo de validadores implementados](#7-catálogo-de-validadores-implementados)
- [8. Resumen de cambios](#8-resumen-de-cambios)
- [9. Integración en componentes reales del proyecto](#9-integración-en-componentes-reales-del-proyecto)
  - [9.1 LoginForm - Formulario reactivo con validación simple](#91-loginform---formulario-reactivo-con-validación-simple)
  - [9.2 RegisterForm - Validadores custom y grupo](#92-registerform---validadores-custom-y-grupo)
  - [9.3 Patrón completo - Inyección de ValidationService](#93-patrón-completo---inyección-de-validationservice)
- [10. Checklist de validación según rúbrica](#10-checklist-de-validación-según-rúbrica)

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

Los validadores personalizados permiten implementar lógica de validación específica del negocio que no cubren los validadores predefinidos de Angular.

### 4.1 Validador de contraseña fuerte

**Propósito:** Asegurar que las contraseñas cumplan con requisitos mínimos de seguridad.

**Requisitos:**
- Mínimo 8 caracteres
- Al menos una letra mayúscula
- Al menos un carácter especial

**Implementación en `ValidationService`:**
```typescript
/**
 * VALIDACIÓN: Contraseña
 *
 * REGLAS DE NEGOCIO:
 * - Mínimo 8 caracteres
 * - Al menos una letra mayúscula
 * - Al menos un carácter especial
 *
 * @param password - Contraseña a validar
 * @returns ValidationResult
 */
validatePassword(password: string): ValidationResult {
  if (!password || password.length === 0) {
    return {
      isValid: false,
      errorMessage: 'La contraseña es requerida',
    };
  }

  // Verificar longitud mínima
  if (password.length < 8) {
    return {
      isValid: false,
      errorMessage: 'La contraseña debe tener al menos 8 caracteres',
    };
  }

  // Verificar mayúscula
  if (!/[A-Z]/.test(password)) {
    return {
      isValid: false,
      errorMessage: 'La contraseña debe contener al menos una mayúscula',
    };
  }

  // Verificar carácter especial
  if (!/[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(password)) {
    return {
      isValid: false,
      errorMessage: 'La contraseña debe contener al menos un carácter especial',
    };
  }

  return {
    isValid: true,
    errorMessage: '',
  };
}
```

**Uso en formularios:**
```typescript
this.registerForm = this.formBuilder.group({
  password: [
    '',
    [
      Validators.required,
      Validators.minLength(8),
      Validators.pattern(/^(?=.*[A-Z])(?=.*[!@#$%^&*])/)
    ]
  ]
});
```

**Feedback de fortaleza en tiempo real:**
```typescript
/**
 * VALIDACIÓN: Contraseña con requisitos de fortaleza
 * Proporciona feedback detallado sobre qué falta
 *
 * @param password - Contraseña a validar
 * @returns Objeto con detalles de cada requisito
 */
getPasswordStrength(password: string): {
  hasMinLength: boolean;
  hasUpperCase: boolean;
  hasLowerCase: boolean;
  hasNumber: boolean;
  hasSpecialChar: boolean;
  score: number; // 0-5
} {
  return {
    hasMinLength: password.length >= 8,
    hasUpperCase: /[A-Z]/.test(password),
    hasLowerCase: /[a-z]/.test(password),
    hasNumber: /[0-9]/.test(password),
    hasSpecialChar: /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(password),
    score: [
      password.length >= 8,
      /[A-Z]/.test(password),
      /[a-z]/.test(password),
      /[0-9]/.test(password),
      /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(password),
    ].filter(Boolean).length,
  };
}
```

### 4.2 Validador de confirmación de contraseña

**Propósito:** Garantizar que el usuario confirme correctamente su contraseña al registrarse.

**Implementación como validador de grupo:**
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
```

**Servicio de validación (nivel campo):**
```typescript
/**
 * VALIDACIÓN: Confirmación de contraseña
 *
 * REGLAS DE NEGOCIO:
 * - Debe ser igual a la contraseña original
 * - No puede estar vacía
 *
 * @param password - Contraseña original
 * @param confirmPassword - Confirmación de contraseña
 * @returns ValidationResult
 */
validatePasswordConfirmation(
  password: string,
  confirmPassword: string
): ValidationResult {
  if (!confirmPassword || confirmPassword.length === 0) {
    return {
      isValid: false,
      errorMessage: 'Debe confirmar la contraseña',
    };
  }

  if (password !== confirmPassword) {
    return {
      isValid: false,
      errorMessage: 'Las contraseñas no coinciden',
    };
  }

  return {
    isValid: true,
    errorMessage: '',
  };
}
```

**Uso en template:**
```html
<!-- Error a nivel de FormGroup -->
@if (registerForm.hasError('passwordMismatch') && registerForm.get('confirmPassword')?.touched) {
  <p class="error">Las contraseñas no coinciden</p>
}
```

### 4.3 Validador de formatos personalizados (NIF, teléfono, código postal)

**Propósito:** Validar formatos específicos españoles como NIF/DNI, teléfonos y códigos postales.

**Implementación en `ValidationService`:**

#### Validador de NIF/DNI:
```typescript
/**
 * VALIDACIÓN: NIF/DNI Español
 *
 * REGLAS DE NEGOCIO:
 * - Formato: 12345678A (8 dígitos + 1 letra)
 * - Letra calculada según algoritmo mod 23
 *
 * @param nif - NIF a validar
 * @returns ValidationResult
 */
validateNIF(nif: string): ValidationResult {
  if (!nif || nif.trim().length === 0) {
    return {
      isValid: false,
      errorMessage: 'El NIF es requerido',
    };
  }

  // Formato básico: 8 dígitos + 1 letra
  const nifRegex = /^[0-9]{8}[A-Z]$/;
  if (!nifRegex.test(nif.toUpperCase())) {
    return {
      isValid: false,
      errorMessage: 'Formato NIF inválido (ej: 12345678A)',
    };
  }

  // Validar letra según algoritmo
  const number = parseInt(nif.substring(0, 8), 10);
  const letters = 'TRWAGMYFPDXBNJZSQVHLCKE';
  const expectedLetter = letters[number % 23];

  if (nif.charAt(8).toUpperCase() !== expectedLetter) {
    return {
      isValid: false,
      errorMessage: 'Letra de NIF incorrecta',
    };
  }

  return {
    isValid: true,
    errorMessage: '',
  };
}
```

#### Validador de Teléfono:
```typescript
/**
 * VALIDACIÓN: Teléfono móvil español
 *
 * REGLAS DE NEGOCIO:
 * - Formato: +34 6XX XXX XXX o 6XX XXX XXX
 * - Comienza con 6 (móvil) o 9 (fijo)
 * - 9 dígitos sin prefijo
 *
 * @param phone - Teléfono a validar
 * @returns ValidationResult
 */
validatePhoneNumber(phone: string): ValidationResult {
  if (!phone || phone.trim().length === 0) {
    return {
      isValid: false,
      errorMessage: 'El teléfono es requerido',
    };
  }

  // Remover espacios, guiones, paréntesis y +34
  const cleanedPhone = phone
    .replace(/[\s\-().]/g, '')
    .replace(/^(34|\+34)/, '');

  // Validar formato: 9 dígitos comenzando con 6 o 9
  const phoneRegex = /^[69]\d{8}$/;
  if (!phoneRegex.test(cleanedPhone)) {
    return {
      isValid: false,
      errorMessage: 'Teléfono inválido (ej: 612 345 678 o +34 612 345 678)',
    };
  }

  return {
    isValid: true,
    errorMessage: '',
  };
}
```

#### Validador de Código Postal:
```typescript
/**
 * VALIDACIÓN: Código postal español
 *
 * REGLAS DE NEGOCIO:
 * - Formato: 5 dígitos (00000-52999)
 * - Válido solo para provincias existentes
 *
 * @param zipCode - Código postal a validar
 * @returns ValidationResult
 */
validateZipCode(zipCode: string): ValidationResult {
  if (!zipCode || zipCode.trim().length === 0) {
    return {
      isValid: false,
      errorMessage: 'El código postal es requerido',
    };
  }

  // Formato: exactamente 5 dígitos
  const zipCodeRegex = /^\d{5}$/;
  if (!zipCodeRegex.test(zipCode)) {
    return {
      isValid: false,
      errorMessage: 'Código postal inválido (debe ser 5 dígitos, ej: 28001)',
    };
  }

  // Validar rango: códigos españoles válidos (00000-52999)
  const code = parseInt(zipCode, 10);
  if (code > 52999) {
    return {
      isValid: false,
      errorMessage: 'Código postal español no válido',
    };
  }

  return {
    isValid: true,
    errorMessage: '',
  };
}
```

**Uso en formularios reactivos:**
```typescript
this.addressForm = this.formBuilder.group({
  nif: [
    '',
    [Validators.required, Validators.pattern(/^[0-9]{8}[A-Z]$/)]
  ],
  phone: [
    '',
    [Validators.required, Validators.pattern(/^[69]\d{8}$/)]
  ],
  zipCode: [
    '',
    [Validators.required, Validators.pattern(/^\d{5}$/)]
  ]
});
```

---

## 5. FormArray - Colecciones dinámicas de controles

FormArray permite gestionar colecciones dinámicas de FormControls o FormGroups, ideal para:
- Listas de ítems añadibles/eliminables dinámicamente
- Múltiples direcciones
- Líneas de un carrito de compras

### 5.1 Ejemplo básico - Lista de géneros favoritos:

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

### 5.2 Validación en FormArray:

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

## 6. Validación asíncrona

La validación asíncrona permite verificar datos contra un servidor (ej: comprobar si un usuario existe).

### 6.1 Validador asíncrono personalizado:

```typescript
/**
 * Validador Asíncrono: Verificar disponibilidad de username
 * 
 * PROPÓSITO:
 * Hacer una llamada HTTP para verificar si un nombre de usuario ya existe
 * 
 * RETORNA:
 * - Observable<null>: usuario disponible (válido)
 * - Observable<{ usernameTaken: true }>: usuario en uso (inválido)
 */
validateUsernameAsync(): AsyncValidatorFn {
  return (control: AbstractControl): Observable<ValidationErrors | null> => {
    if (!control.value) {
      return of(null); // Si está vacío, skipear validación asíncrona
    }

    return this.apiService.checkUsernameAvailability(control.value).pipe(
      map(response => {
        return response.isAvailable ? null : { usernameTaken: true };
      }),
      debounceTime(300), // Esperar 300ms después del último evento
      first(), // Completar después del primer resultado
      catchError(() => of(null)) // Si hay error de red, permitir
    );
  };
}
```

### 6.2 Integración en FormControl:

```typescript
/**
 * Añadir validador asíncrono al FormControl
 * 
 * SINTAXIS:
 * formBuilder.control(
 *   valor_inicial,
 *   [validadores_síncronos],
 *   [validadores_asíncronos]  ← AsyncValidatorFn[]
 * )
 */
this.registerForm = this.formBuilder.group({
  username: [
    '',
    // Validadores síncronos
    [
      Validators.required,
      Validators.minLength(3),
      Validators.maxLength(20),
      Validators.pattern(/^[a-zA-Z0-9_]+$/)
    ],
    // Validadores asíncronos
    [this.validateUsernameAsync()]
  ],
  email: [
    '',
    [Validators.required, Validators.email],
    [this.validateEmailAsync()] // Verificar si email ya está registrado
  ]
});
```

### 6.3 Uso en template - mostrar estado pendiente:

```html
<form [formGroup]="registerForm">
  <!-- Input con estado pendiente (validación asíncrona en curso) -->
  <input 
    type="text" 
    formControlName="username" 
    placeholder="Nombre de usuario">

  <!-- Estados de validación -->
  @if (registerForm.get('username')?.pending) {
    <span class="validating">
      ⏳ Verificando disponibilidad...
    </span>
  }

  @if (registerForm.get('username')?.hasError('required')) {
    <span class="error">Username es requerido</span>
  }

  @if (registerForm.get('username')?.hasError('usernameTaken')) {
    <span class="error">Este usuario ya está en uso</span>
  }

  <!-- El submit está deshabilitado mientras hay validación asíncrona pendiente -->
  <button [disabled]="registerForm.invalid || registerForm.pending">
    Registrarse
  </button>
</form>
```

### 6.4 Estados del FormControl/FormGroup:

```typescript
/**
 * Estados de validación en tiempo real
 */
control.status // 'VALID' | 'INVALID' | 'PENDING' | 'DISABLED'
control.pending // boolean - Hay validación asíncrona en curso

formGroup.valid     // false si hay algún control inválido
formGroup.invalid   // true si hay algún control inválido
formGroup.pending   // true si hay validación asíncrona en curso
formGroup.pristine  // true si no ha sido modificado
formGroup.dirty     // true si ha sido modificado
formGroup.touched   // true si el usuario interactuó
formGroup.untouched // true si no ha sido tocado
```

---

## 7. Catálogo de validadores implementados

### Ubicación: `frontend/src/app/services/validation.ts`

#### Validadores de campo simple:

| Método | Propósito | Ejemplo |
|--------|-----------|---------|
| `validateEmail()` | Valida formato de email | `usuario@dominio.com` |
| `validatePassword()` | Verifica fortaleza (8 caracteres, mayúscula, especial) | `MiPass123!` |
| `validateUsername()` | 3-20 caracteres, solo alfanuméricos y guiones | `usuario_123` |
| `validatePasswordConfirmation()` | Comprueba coincidencia de contraseñas | Iguales a password |
| `validateNIF()` | Valida NIF/DNI español | `12345678A` |
| `validatePhoneNumber()` | Teléfono móvil español (6XX XXX XXX) | `612345678` |
| `validateZipCode()` | Código postal español (5 dígitos) | `28001` |

#### Validadores de formulario completo:

| Método | Propósito | Retorna |
|--------|-----------|---------|
| `validateLoginForm()` | Valida email y contraseña juntos | `{ isValid: boolean, errors: { email, password } }` |
| `validateRegisterForm()` | Valida todos los campos de registro | `{ isValid: boolean, errors: { username, email, password, confirmPassword } }` |

#### Utilidades:

| Método | Propósito | Retorna |
|--------|-----------|---------|
| `getPasswordStrength()` | Análisis detallado de fortaleza | `{ hasMinLength, hasUpperCase, hasNumber, hasSpecialChar, score: 0-5 }` |

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

## 10. Checklist de validación según rúbrica

✅ **Validadores personalizados:**
- ✅ Validador de contraseña fuerte (8+ caracteres, mayúscula, especial)
- ✅ Validador de confirmación de contraseña (coincidencia)
- ✅ Validadores de formato (NIF, teléfono, código postal)

✅ **FormArray:**
- ✅ Implementación con métodos add/remove
- ✅ Validación a nivel de array
- ✅ Ejemplos con lista de géneros y direcciones

✅ **Validación asíncrona:**
- ✅ AsyncValidatorFn personalizado
- ✅ Integración con debounceTime
- ✅ Manejo de estado pendiente (pending)
- ✅ Ejemplo: verificar disponibilidad de username

✅ **Documentación:**
- ✅ Catálogo completo de validadores implementados
- ✅ Guía de uso de FormArray con ejemplos
- ✅ Ejemplos de validación asíncrona
- ✅ Patrones de integración en componentes reales

---

## 8. Resumen de cambios

- ✅ FormBuilder para construcción declarativa de formularios
- ✅ FormGroup para agrupar FormControls relacionados
- ✅ FormControl para campos individuales con validación integrada
- ✅ Validadores síncronos predefinidos de Angular (`required`, `email`, `minLength`, `maxLength`, `pattern`)
- ✅ Validadores custom a nivel de grupo (passwordMatchValidator)
- ✅ Validadores personalizados de negocio (NIF, teléfono, código postal, contraseña fuerte)
- ✅ FormArray para colecciones dinámicas de controles
- ✅ Validación asíncrona con AsyncValidatorFn
- ✅ Integración con observables y debounceTime para optimización
