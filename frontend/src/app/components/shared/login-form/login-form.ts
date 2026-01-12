import { Component, signal, output, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { FormInput } from '../form-input/form-input';
import { AuthService } from '../../../services/auth';

/**
 * LoginForm Component
 *
 * PROPÓSITO:
 * Componente de formulario reactivo para autenticación de usuarios.
 * Implementa validación síncrona con FormBuilder y validadores integrados de Angular.
 *
 * ESTRUCTURA:
 * - FormGroup: loginForm
 *   - email: requerido + email válido
 *   - password: requerido + mínimo 8 caracteres
 *
 * PATRÓN: FORMULARIOS REACTIVOS
 * Migración de template-driven (Signals) a formularios reactivos (FormBuilder + FormGroup)
 *
 * NAVEGACIÓN ENTRE MODALES:
 * - onForgotPassword: emite cuando el usuario quiere recuperar contraseña
 * - onRegister: emite cuando el usuario quiere crear una cuenta
 *
 * VENTAJAS:
 * - Validación centralizada en el componente (no dispersa en templates)
 * - Mejor control sobre dependencias entre campos
 * - Más testeable
 * - Mejor rendimiento en formularios complejos
 * - Reutilización de validadores
 *
 * FLUJO:
 * 1. Constructor: inicializa FormGroup con FormBuilder
 * 2. onSubmit(): verifica si es válido antes de procesar
 * 3. Template: accede a errores mediante loginForm.get('campo')?.errors
 */
@Component({
  selector: 'app-login-form',
  imports: [CommonModule, ReactiveFormsModule, FormInput],
  templateUrl: './login-form.html',
  styleUrl: './login-form.scss',
})
export class LoginForm {
  /**
   * Inyección de AuthService para autenticación real
   */
  private authService = inject(AuthService);

  /**
   * FormGroup - Contenedor de controles del formulario
   * Agrupa email y password en una sola entidad
   * Proporciona métodos para validar todo el formulario de una vez
   */
  loginForm: FormGroup;

  /**
   * Estado de envío
   * Signal que indica si el formulario está siendo procesado
   * Desactiva el botón de submit mientras se envía la solicitud
   */
  isSubmitting = signal(false);

  // ============================================
  // OUTPUTS PARA NAVEGACIÓN ENTRE MODALES
  // ============================================

  /**
   * Emite cuando el usuario hace click en "¿Olvidaste tu contraseña?"
   */
  onForgotPassword = output<void>();

  /**
   * Emite cuando el usuario hace click en "¿No tienes cuenta? Crea una"
   */
  onRegister = output<void>();

  /**
   * Emite cuando el login es exitoso para que el header cierre el modal
   */
  onLoginSuccess = output<void>();

  /**
   * Constructor
   * Inyecta FormBuilder para crear el FormGroup de forma declarativa
   */
  constructor(private formBuilder: FormBuilder) {
    /**
     * Inicialización del formulario con FormBuilder
     *
     * Sintaxis:
     * [valor_inicial, [validadores]]
     *
     * Validadores utilizados:
     * - Validators.required: campo no puede estar vacío
     * - Validators.email: debe ser un email válido (RFC5322 simplificado)
     * - Validators.minLength(8): contraseña debe tener al menos 8 caracteres
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
   * ANTES (Template-driven):
   * - Validación manual en cada método onChange
   * - Estado disperso en múltiples signals
   * - Lógica repetida para validar
   *
   * DESPUÉS (Reactivo):
   * - Validación automática en FormGroup
   * - Un solo check: if (this.loginForm.valid)
   * - Acceso simplificado a errores: this.loginForm.get('email')?.errors
   */
  onSubmit(): void {
    /**
     * Marcar todos los campos como tocados
     * Esto dispara la visualización de errores en el template
     * (los errores solo se muestran si el campo fue tocado)
     */
    this.loginForm.markAllAsTouched();

    /**
     * Validación del formulario completo
     * El formulario es válido si TODOS los campos son válidos
     * y NO HAY errores a nivel de grupo (si los hubiera)
     */
    if (this.loginForm.valid) {
      this.isSubmitting.set(true);

      /**
       * Obtener valores del formulario
       * this.loginForm.value devuelve objeto con todas las propiedades
       * {
       *   email: 'usuario@ejemplo.com',
       *   password: '12345678'
       * }
       */
      const formData = this.loginForm.value;

      // Llamar al AuthService para autenticación real
      this.authService.login({
        email: formData.email,
        password: formData.password
      }).then(result => {
        this.isSubmitting.set(false);
        if (result.success) {
          // Emitir evento de éxito para que el header cierre el modal
          this.onLoginSuccess.emit();
          // Limpiar el formulario
          this.loginForm.reset();
        }
      }).catch(() => {
        this.isSubmitting.set(false);
      });
    }
  }
}
