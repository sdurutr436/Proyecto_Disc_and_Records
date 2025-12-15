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

## Integración con ValidationService

Los validadores custom más complejos se extraen a `ValidationService` para reutilización:

```typescript
// En ValidationService (validadores custom)
passwordMatchValidator(): ValidatorFn {
  return (group: AbstractControl): ValidationErrors | null => {
    const password = group.get('password')?.value;
    const confirmPassword = group.get('confirmPassword')?.value;
    return password === confirmPassword ? null : { passwordMismatch: true };
  };
}

// En RegisterForm
this.registerForm = this.formBuilder.group({
  // ... otros campos ...
}, { 
  validators: inject(ValidationService).passwordMatchValidator()
});
```

---

## Resumen de cambios

- ✅ FormBuilder para construcción declarativa de formularios
- ✅ FormGroup para agrupar FormControls relacionados
- ✅ FormControl para campos individuales con validación integrada
- ✅ Validadores síncronos predefinidos de Angular (`required`, `email`, `minLength`, `maxLength`, `pattern`)
- ✅ Validadores custom extraídos a ValidationService para reutilización
