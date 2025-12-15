import { Component, signal, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, FormControl, Validators, AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

/**
 * RegisterForm Component
 *
 * PROPÓSITO:
 * Componente de formulario reactivo para registro de nuevos usuarios.
 * Implementa validación síncrona con FormBuilder, validadores integrados y validadores custom.
 *
 * ESTRUCTURA:
 * FormGroup: registerForm
 *   - username: requerido + patrón (alfanuméricos + guiones) + 3-20 caracteres
 *   - email: requerido + email válido
 *   - password: requerido + mínimo 8 caracteres + patrón (mayúscula + especial)
 *   - confirmPassword: requerido
 *   - Validador de grupo: passwordMatchValidator (verifica que password y confirmPassword coincidan)
 *
 * PATRÓN: FORMULARIOS REACTIVOS CON VALIDADORES CUSTOM
 * - Validadores integrados para reglas simples
 * - Validadores custom para reglas de negocio complejas
 * - Validador de grupo para validaciones cross-field
 *
 * VENTAJAS:
 * - Separación clara entre campos
 * - Validación a nivel de grupo (password match)
 * - Reutilización de validadores
 * - Mejor UX: errores específicos por campo y error
 */
@Component({
  selector: 'app-register-form',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './register-form.html',
  styleUrl: './register-form.scss',
})
export class RegisterForm {
  /**
   * FormGroup - Contenedor de controles del formulario de registro
   */
  registerForm: FormGroup;

  /**
   * Estado de envío
   */
  isSubmitting = signal(false);

  /**
   * Constructor
   */
  constructor(private formBuilder: FormBuilder) {
    this.registerForm = this.buildForm();
  }

  /**
   * Construcción del formulario
   * Separado en método para mayor claridad
   *
   * REGLAS DE VALIDACIÓN:
   * - username: alfanuméricos + guiones bajos, 3-20 caracteres
   * - email: formato email válido
   * - password: 8+ caracteres, con mayúscula y carácter especial
   * - confirmPassword: debe coincidir con password
   */
  private buildForm(): FormGroup {
    return this.formBuilder.group(
      {
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
            /**
             * Patrón de contraseña fuerte
             * (?=.*[A-Z]) - Lookahead: contiene al menos una mayúscula
             * (?=.*[!@#$%^&*]) - Lookahead: contiene al menos un carácter especial
             */
            Validators.pattern(/^(?=.*[A-Z])(?=.*[!@#$%^&*])/)
          ]
        ],
        confirmPassword: [
          '',
          [Validators.required]
        ]
      },
      /**
       * VALIDADOR DE GRUPO
       * Se aplica a nivel de FormGroup (no a un campo individual)
       * Permite validar relaciones entre múltiples campos
       *
       * En este caso: validar que password y confirmPassword coincidan
       */
      { validators: this.passwordMatchValidator() }
    );
  }

  /**
   * Getters para acceder a los FormControls
   * Devuelven los controles tipados evitando null
   * Usados en el template: [formControl]="usernameControl"
   */
  get usernameControl(): FormControl {
    return this.registerForm.get('username') as FormControl;
  }

  get emailControl(): FormControl {
    return this.registerForm.get('email') as FormControl;
  }

  get passwordControl(): FormControl {
    return this.registerForm.get('password') as FormControl;
  }

  get confirmPasswordControl(): FormControl {
    return this.registerForm.get('confirmPassword') as FormControl;
  }

  /**
   * Validador Custom: Coincidencia de contraseñas
   *
   * PROPÓSITO:
   * Verificar que el campo password y confirmPassword tengan el mismo valor
   *
   * TIPO: Validador de grupo (FormGroup level)
   * Acceso: group.get('password') y group.get('confirmPassword')
   *
   * RETORNA:
   * - null: contraseñas coinciden (válido)
   * - { passwordMismatch: true }: no coinciden (inválido)
   *
   * NOTA: En el template, acceder con:
   * registerForm.hasError('passwordMismatch')
   */
  private passwordMatchValidator(): ValidatorFn {
    return (group: AbstractControl): ValidationErrors | null => {
      const password = group.get('password')?.value;
      const confirmPassword = group.get('confirmPassword')?.value;

      /**
       * Si alguno de los campos está vacío, no validar
       * (Validators.required se encargará de eso)
       */
      if (!password || !confirmPassword) {
        return null;
      }

      /**
       * Validar coincidencia
       */
      return password === confirmPassword
        ? null
        : { passwordMismatch: true };
    };
  }

  /**
   * Manejo del submit
   *
   * FLUJO:
   * 1. Marcar todos los campos como tocados (para mostrar errores)
   * 2. Verificar si el formulario es válido (todos los campos + validadores de grupo)
   * 3. Si es válido: obtener valores y procesar
   * 4. Si es inválido: mostrar errores (ya están visibles por markAllAsTouched)
   */
  onSubmit(): void {
    /**
     * Marcar todos los campos como tocados
     * Esto hace que los errores sean visibles en el template
     * (los validadores de Angular solo muestran errores en campos "touched")
     */
    this.registerForm.markAllAsTouched();

    /**
     * Validar el formulario completo
     * Verifica:
     * 1. Todos los campos son válidos
     * 2. No hay errores a nivel de grupo (ej: passwordMismatch)
     */
    if (this.registerForm.valid) {
      this.isSubmitting.set(true);

      /**
       * Obtener datos del formulario
       * {
       *   username: 'usuario123',
       *   email: 'usuario@ejemplo.com',
       *   password: 'MiPassword123!',
       *   confirmPassword: 'MiPassword123!'
       * }
       */
      const formData = this.registerForm.value;

      // Aquí iría la lógica de registro (inyectar AuthService)
      console.log('Registro:', formData);

      // Simular llamada a API
      setTimeout(() => {
        this.isSubmitting.set(false);
        alert('¡Registro exitoso! Bienvenido a Discs & Records');
      }, 1500);
    }
  }
}
