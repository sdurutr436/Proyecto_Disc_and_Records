import { Injectable, signal, computed } from '@angular/core';
import { FormGroup, FormArray, AbstractControl } from '@angular/forms';

/**
 * FormStateService - Gestión Centralizada de Estados de Formulario
 *
 * PROPOSITO:
 * Servicio que centraliza la logica de gestion de estados de formularios reactivos,
 * incluyendo estados de validacion, interaccion del usuario y feedback visual.
 *
 * RESPONSABILIDADES:
 * - Determinar cuando mostrar errores (touched/dirty)
 * - Gestionar estados de loading durante validacion asincrona
 * - Proporcionar feedback visual consistente
 * - Controlar habilitacion/deshabilitacion de submit
 *
 * PATRON: SEPARACION DE RESPONSABILIDADES
 * Los componentes delegan la logica de estado al servicio,
 * manteniendo su codigo limpio y enfocado en la presentacion.
 */
@Injectable({
  providedIn: 'root'
})
export class FormStateService {

  // =========================================================================
  // ESTADO DE VALIDACION ASINCRONA
  // =========================================================================

  /**
   * Map de controles en estado de validacion asincrona
   * Clave: identificador unico del control
   * Valor: true si esta validando
   */
  private asyncValidatingControls = new Map<string, boolean>();

  /**
   * Signal para notificar cambios en validaciones asincronas
   */
  private asyncValidatingCount = signal(0);

  /**
   * Computed: indica si hay alguna validacion asincrona en curso
   */
  readonly isAsyncValidating = computed(() => this.asyncValidatingCount() > 0);

  // =========================================================================
  // METODOS: VISIBILIDAD DE ERRORES
  // =========================================================================

  /**
   * Determina si se deben mostrar errores para un control
   *
   * LOGICA:
   * Los errores solo se muestran cuando:
   * 1. El control tiene errores (invalid)
   * 2. El usuario ha interactuado (touched) O ha modificado el valor (dirty)
   *
   * @param control - AbstractControl a evaluar
   * @returns true si se deben mostrar los errores
   *
   * @example
   * ```typescript
   * // En el componente
   * shouldShowError(controlName: string): boolean {
   *   const control = this.myForm.get(controlName);
   *   return control ? this.formStateService.shouldShowErrors(control) : false;
   * }
   *
   * // En el template
   * @if (shouldShowError('email')) {
   *   <span class="error">{{ getErrorMessage('email') }}</span>
   * }
   * ```
   */
  shouldShowErrors(control: AbstractControl | null): boolean {
    if (!control) return false;
    return control.invalid && (control.touched || control.dirty);
  }

  /**
   * Determina si mostrar errores despues de un intento de submit
   *
   * LOGICA:
   * Muestra errores si:
   * 1. El control es invalido
   * 2. Se ha intentado enviar el formulario (submitted = true)
   *
   * @param control - AbstractControl a evaluar
   * @param submitted - Si el formulario ha sido enviado
   * @returns true si se deben mostrar los errores
   */
  shouldShowErrorsOnSubmit(control: AbstractControl | null, submitted: boolean): boolean {
    if (!control) return false;
    return control.invalid && submitted;
  }

  /**
   * Determina si mostrar errores combinando ambas estrategias
   *
   * Muestra errores si:
   * 1. El control es invalido Y (touched/dirty O submitted)
   *
   * @param control - AbstractControl a evaluar
   * @param submitted - Si el formulario ha sido enviado
   * @returns true si se deben mostrar los errores
   */
  shouldShowErrorsCombined(control: AbstractControl | null, submitted: boolean): boolean {
    if (!control) return false;
    return control.invalid && (control.touched || control.dirty || submitted);
  }

  // =========================================================================
  // METODOS: ESTADO DEL FORMULARIO
  // =========================================================================

  /**
   * Determina si el boton de submit debe estar deshabilitado
   *
   * LOGICA:
   * El submit se deshabilita si:
   * 1. El formulario es invalido
   * 2. Hay validaciones asincronas pendientes (pending)
   * 3. Se esta procesando un envio (isSubmitting)
   *
   * @param form - FormGroup a evaluar
   * @param isSubmitting - Si se esta procesando el envio
   * @returns true si el submit debe estar deshabilitado
   *
   * @example
   * ```html
   * <button
   *   type="submit"
   *   [disabled]="formStateService.isSubmitDisabled(myForm, isSubmitting())">
   *   Enviar
   * </button>
   * ```
   */
  isSubmitDisabled(form: FormGroup, isSubmitting: boolean = false): boolean {
    return form.invalid || form.pending || isSubmitting;
  }

  /**
   * Verifica si un control tiene validacion asincrona pendiente
   *
   * @param control - AbstractControl a verificar
   * @returns true si esta en estado pending
   */
  isValidationPending(control: AbstractControl | null): boolean {
    if (!control) return false;
    return control.status === 'PENDING';
  }

  /**
   * Verifica si un control es valido y ha sido tocado
   *
   * Util para mostrar feedback positivo (icono de check, borde verde)
   *
   * @param control - AbstractControl a verificar
   * @returns true si es valido y tocado
   */
  isValidAndTouched(control: AbstractControl | null): boolean {
    if (!control) return false;
    return control.valid && control.touched;
  }

  // =========================================================================
  // METODOS: FORMARRAY
  // =========================================================================

  /**
   * Verifica si un elemento de FormArray debe mostrar errores
   *
   * @param formArray - FormArray padre
   * @param index - Indice del elemento
   * @returns true si el elemento debe mostrar errores
   */
  shouldShowArrayItemErrors(formArray: FormArray, index: number): boolean {
    const control = formArray.at(index);
    return this.shouldShowErrors(control);
  }

  /**
   * Obtiene el estado de todos los elementos de un FormArray
   *
   * @param formArray - FormArray a evaluar
   * @returns Array con el estado de cada elemento
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

  /**
   * Marca todos los elementos de un FormArray como touched
   *
   * Util para mostrar todos los errores al intentar submit
   *
   * @param formArray - FormArray a marcar
   */
  markArrayAsTouched(formArray: FormArray): void {
    formArray.controls.forEach(control => {
      control.markAsTouched();
      if (control instanceof FormGroup) {
        Object.values(control.controls).forEach(c => c.markAsTouched());
      }
    });
  }

  // =========================================================================
  // METODOS: VALIDACION ASINCRONA
  // =========================================================================

  /**
   * Registra el inicio de una validacion asincrona
   *
   * @param controlId - Identificador unico del control
   */
  startAsyncValidation(controlId: string): void {
    if (!this.asyncValidatingControls.get(controlId)) {
      this.asyncValidatingControls.set(controlId, true);
      this.asyncValidatingCount.update(c => c + 1);
    }
  }

  /**
   * Registra el fin de una validacion asincrona
   *
   * @param controlId - Identificador unico del control
   */
  endAsyncValidation(controlId: string): void {
    if (this.asyncValidatingControls.get(controlId)) {
      this.asyncValidatingControls.set(controlId, false);
      this.asyncValidatingCount.update(c => Math.max(0, c - 1));
    }
  }

  /**
   * Verifica si un control especifico esta validando
   *
   * @param controlId - Identificador del control
   * @returns true si esta validando
   */
  isControlValidating(controlId: string): boolean {
    return this.asyncValidatingControls.get(controlId) ?? false;
  }

  /**
   * Limpia todos los estados de validacion asincrona
   */
  clearAsyncValidationStates(): void {
    this.asyncValidatingControls.clear();
    this.asyncValidatingCount.set(0);
  }

  // =========================================================================
  // METODOS: FEEDBACK VISUAL
  // =========================================================================

  /**
   * Obtiene las clases CSS para feedback visual de un control
   *
   * @param control - AbstractControl a evaluar
   * @param baseClass - Clase base del componente (ej: 'form-input')
   * @returns Objeto con clases condicionales
   *
   * @example
   * ```html
   * <input
   *   [ngClass]="formStateService.getValidationClasses(emailControl, 'form-input')">
   * ```
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

  /**
   * Obtiene el estado de feedback para un control
   *
   * @param control - AbstractControl a evaluar
   * @returns Estado del feedback: 'error' | 'success' | 'pending' | 'neutral'
   */
  getFeedbackState(control: AbstractControl | null): 'error' | 'success' | 'pending' | 'neutral' {
    if (!control) return 'neutral';

    if (this.isValidationPending(control)) return 'pending';
    if (this.shouldShowErrors(control)) return 'error';
    if (this.isValidAndTouched(control)) return 'success';
    return 'neutral';
  }
}

/**
 * Interfaz para el estado de un elemento de FormArray
 */
export interface ArrayItemState {
  index: number;
  valid: boolean;
  invalid: boolean;
  touched: boolean;
  dirty: boolean;
  pending: boolean;
  showError: boolean;
  errors: Record<string, any> | null;
}
