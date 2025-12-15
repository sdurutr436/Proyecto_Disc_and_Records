import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';

/**
 * ForgotPasswordForm Component
 *
 * PROPÓSITO:
 * Componente de formulario reactivo para recuperación de contraseña.
 * Implementa validación síncrona simple con FormBuilder.
 *
 * ESTRUCTURA:
 * FormGroup: forgotForm
 *   - email: requerido + email válido
 *
 * ESTADOS ESPECIALES:
 * - emailSent: indica si el email fue enviado exitosamente
 *   Permite mostrar confirmación al usuario y opción de enviar otro
 *
 * PATRÓN: FORMULARIOS REACTIVOS SIMPLES
 * Este formulario tiene un único campo, demostrando cómo usar FormBuilder
 * incluso en casos simples (vs usar un solo FormControl).
 */
@Component({
  selector: 'app-forgot-password-form',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './forgot-password-form.html',
  styleUrl: './forgot-password-form.scss',
})
export class ForgotPasswordForm {
  /**
   * FormGroup - Contenedor del formulario de recuperación
   */
  forgotForm: FormGroup;

  /**
   * Estado de envío
   */
  isSubmitting = signal(false);

  /**
   * Estado de email enviado
   * Cuando es true, muestra confirmación y opción para enviar otro
   */
  emailSent = signal(false);

  /**
   * Constructor
   */
  constructor(private formBuilder: FormBuilder) {
    /**
     * Inicialización del formulario
     * Solo requiere validadores simples: required y email
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
  }

  /**
   * Manejo del submit
   */
  onSubmit(): void {
    /**
     * Marcar como tocado
     * Dispara la visualización de errores
     */
    this.forgotForm.markAllAsTouched();

    /**
     * Validar el formulario
     */
    if (this.forgotForm.valid) {
      this.isSubmitting.set(true);

      /**
       * Obtener el email
       */
      const formData = this.forgotForm.value;

      // Aquí iría la lógica de envío de email de recuperación
      console.log('Recuperar contraseña para:', formData.email);

      // Simular llamada a API
      setTimeout(() => {
        this.isSubmitting.set(false);
        this.emailSent.set(true);
      }, 1500);
    }
  }

  /**
   * Resetear formulario para enviar otro email
   *
   * FLUJO:
   * 1. Limpiar el valor del input
   * 2. Resetear el estado del FormGroup
   * 3. Ocultar el mensaje de confirmación
   *
   * NOTA: reset() también marca como untouched y valid
   */
  sendAnother(): void {
    /**
     * Resetear el FormGroup
     * - Limpia todos los valores
     * - Marca todos como untouched
     * - Establece el estado como valid
     */
    this.forgotForm.reset();

    /**
     * Ocultar mensaje de confirmación
     */
    this.emailSent.set(false);
  }
}
