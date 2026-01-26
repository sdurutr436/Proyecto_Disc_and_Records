import { Component, signal, output, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, FormControl, Validators, AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';
import { FormInput } from '../form-input/form-input';
import { AuthService } from '../../../services/auth';

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
 * NAVEGACIÓN ENTRE MODALES:
 * - onLogin: emite cuando el usuario quiere ir al login
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
  imports: [CommonModule, ReactiveFormsModule, FormInput],
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
   * Servicio de autenticación
   */
  private authService = inject(AuthService);

  // ============================================
  // OUTPUTS PARA NAVEGACIÓN ENTRE MODALES
  // ============================================

  /**
   * Emite cuando el usuario hace click en "¿Ya tienes cuenta? Inicia sesión"
   */
  onLogin = output<void>();

  /**
   * Emite cuando el registro es exitoso y se debe cerrar el modal
   */
  onRegisterSuccess = output<void>();

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
             * (?=.*[!@#$%^&*()\-_=+\[\]{}|;:'",.<>?/`~]) - Lookahead: contiene al menos un carácter especial
             * Lista ampliada: ! @ # $ % ^ & * ( ) - _ = + [ ] { } | ; : ' " , . < > ? / ` ~
             */
            Validators.pattern(/^(?=.*[A-Z])(?=.*[!@#$%^&*()\-_=+\[\]{}|;:'",.<>?\/`~])/)
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
   * 3. Si es válido: llamar al AuthService para registrar al usuario
   * 4. Si el registro es exitoso: emitir evento para cerrar modal
   * 5. Si es inválido: mostrar errores (ya están visibles por markAllAsTouched)
   */
  async onSubmit(): Promise<void> {
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

      try {
        /**
         * Obtener datos del formulario
         */
        const { username, email, password } = this.registerForm.value;

        /**
         * Llamar al AuthService para registrar al usuario
         */
        const result = await this.authService.register({
          username,
          email,
          password
        });

        /**
         * Si el registro es exitoso, emitir evento para cerrar el modal
         * El AuthService ya se encarga de:
         * - Mostrar notificación de éxito
         * - Iniciar sesión automáticamente (si el backend devuelve token)
         * - Actualizar el estado global de la aplicación
         */
        if (result.success) {
          this.onRegisterSuccess.emit();

          // Limpiar el formulario
          this.registerForm.reset();
        }
      } catch (error) {
        console.error('Error en registro:', error);
      } finally {
        this.isSubmitting.set(false);
      }
    }
  }
}
