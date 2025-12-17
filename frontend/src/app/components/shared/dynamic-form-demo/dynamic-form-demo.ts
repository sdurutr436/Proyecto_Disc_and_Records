import { Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  ReactiveFormsModule,
  FormBuilder,
  FormGroup,
  FormArray,
  FormControl,
  Validators
} from '@angular/forms';

import { FormStateService } from '../../../services/form-state';
import { AsyncValidatorsService } from '../../../services/async-validators.service';
import {
  minArrayLength,
  maxArrayLength,
  uniqueItems,
  completeAddress,
  validContact,
  getArrayValidatorErrorMessage,
  telefono
} from '../../../validators';

/**
 * DynamicFormDemo Component
 *
 * PROPOSITO:
 * Componente de demostracion que implementa todos los requisitos de la rubrica:
 *
 * 1. VALIDACION DE CADA ELEMENTO DEL ARRAY
 *    - Lista de direcciones con validacion individual
 *    - Lista de telefonos con validacion de formato
 *    - Items de contacto con validacion de grupo
 *
 * 2. GESTION DE ESTADOS DE FORMULARIO
 *    - Mostrar errores solo despues de touched/dirty
 *    - Deshabilitar submit si formulario invalido
 *    - Loading states durante validacion asincrona
 *    - Feedback visual de validacion (error/success/pending)
 *
 * ARQUITECTURA:
 * - Usa FormStateService para gestion centralizada de estados
 * - Usa AsyncValidatorsService para validaciones asincronas
 * - Usa validadores personalizados de array-item.validators
 */
@Component({
  selector: 'app-dynamic-form-demo',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './dynamic-form-demo.html',
  styleUrl: './dynamic-form-demo.scss'
})
export class DynamicFormDemo {

  // Inyeccion de servicios
  private fb = inject(FormBuilder);
  private asyncValidators = inject(AsyncValidatorsService);
  formState = inject(FormStateService);

  // Formulario principal
  profileForm: FormGroup;

  // Estados del componente
  isSubmitting = signal(false);
  formSubmitted = signal(false);
  submitResult = signal<{ success: boolean; message: string } | null>(null);

  constructor() {
    this.profileForm = this.buildForm();
  }

  /**
   * Construccion del formulario con todos los tipos de validacion
   */
  private buildForm(): FormGroup {
    return this.fb.group({
      // Campo con validacion asincrona
      email: ['', {
        validators: [Validators.required, Validators.email],
        asyncValidators: [this.asyncValidators.emailUnique()],
        updateOn: 'blur'
      }],

      // Campo con validacion asincrona
      username: ['', {
        validators: [
          Validators.required,
          Validators.minLength(3),
          Validators.maxLength(20)
        ],
        asyncValidators: [this.asyncValidators.usernameAvailable()],
        updateOn: 'blur'
      }],

      // FormArray de direcciones con validacion individual
      addresses: this.fb.array(
        [this.createAddressGroup()],
        [minArrayLength(1), maxArrayLength(3)]
      ),

      // FormArray de telefonos con validacion de formato
      phones: this.fb.array(
        [this.createPhoneControl()],
        [minArrayLength(1), uniqueItems()]
      ),

      // FormArray de contactos de emergencia
      emergencyContacts: this.fb.array(
        [],
        [maxArrayLength(2)]
      )
    });
  }

  // ===========================================================================
  // GETTERS PARA FORMARRAY
  // ===========================================================================

  get addressesArray(): FormArray {
    return this.profileForm.get('addresses') as FormArray;
  }

  get phonesArray(): FormArray {
    return this.profileForm.get('phones') as FormArray;
  }

  get emergencyContactsArray(): FormArray {
    return this.profileForm.get('emergencyContacts') as FormArray;
  }

  get emailControl(): FormControl {
    return this.profileForm.get('email') as FormControl;
  }

  get usernameControl(): FormControl {
    return this.profileForm.get('username') as FormControl;
  }

  // ===========================================================================
  // FACTORY METHODS PARA CREAR ELEMENTOS
  // ===========================================================================

  /**
   * Crea un FormGroup para una direccion
   * Incluye validador de grupo completeAddress()
   */
  private createAddressGroup(): FormGroup {
    return this.fb.group({
      street: ['', Validators.required],
      city: ['', Validators.required],
      postalCode: ['', [Validators.required, Validators.pattern(/^\d{5}$/)]]
    }, { validators: completeAddress() });
  }

  /**
   * Crea un FormControl para un telefono
   * Usa el validador telefono() de spanish-formats
   */
  private createPhoneControl(): FormControl {
    return this.fb.control('', [Validators.required, telefono()]);
  }

  /**
   * Crea un FormGroup para un contacto de emergencia
   * Incluye validador de grupo validContact()
   */
  private createEmergencyContactGroup(): FormGroup {
    return this.fb.group({
      name: ['', Validators.required],
      phone: ['', telefono()],
      email: ['', Validators.email]
    }, { validators: validContact() });
  }

  // ===========================================================================
  // METODOS PARA AGREGAR/ELIMINAR ELEMENTOS
  // ===========================================================================

  addAddress(): void {
    if (this.addressesArray.length < 3) {
      this.addressesArray.push(this.createAddressGroup());
    }
  }

  removeAddress(index: number): void {
    if (this.addressesArray.length > 1) {
      this.addressesArray.removeAt(index);
    }
  }

  addPhone(): void {
    this.phonesArray.push(this.createPhoneControl());
  }

  removePhone(index: number): void {
    if (this.phonesArray.length > 1) {
      this.phonesArray.removeAt(index);
    }
  }

  addEmergencyContact(): void {
    if (this.emergencyContactsArray.length < 2) {
      this.emergencyContactsArray.push(this.createEmergencyContactGroup());
    }
  }

  removeEmergencyContact(index: number): void {
    this.emergencyContactsArray.removeAt(index);
  }

  // ===========================================================================
  // METODOS DE AYUDA PARA EL TEMPLATE
  // ===========================================================================

  /**
   * Obtiene un control de direccion por indice y campo
   */
  getAddressControl(index: number, field: string): FormControl {
    return this.addressesArray.at(index).get(field) as FormControl;
  }

  /**
   * Obtiene un control de telefono por indice
   */
  getPhoneControl(index: number): FormControl {
    return this.phonesArray.at(index) as FormControl;
  }

  /**
   * Obtiene un control de contacto por indice y campo
   */
  getContactControl(index: number, field: string): FormControl {
    return this.emergencyContactsArray.at(index).get(field) as FormControl;
  }

  /**
   * Verifica si se debe mostrar error para un control
   */
  shouldShowError(control: FormControl | null): boolean {
    return this.formState.shouldShowErrorsCombined(control, this.formSubmitted());
  }

  /**
   * Obtiene las clases CSS para feedback visual
   */
  getInputClasses(control: FormControl | null): Record<string, boolean> {
    if (!control) return {};

    const isPending = control.status === 'PENDING';
    const showError = this.shouldShowError(control);
    const showSuccess = control.valid && control.touched && !isPending;

    return {
      'form-field__input--error': showError,
      'form-field__input--success': showSuccess,
      'form-field__input--pending': isPending
    };
  }

  /**
   * Obtiene el mensaje de error para un array
   */
  getArrayError(array: FormArray): string {
    if (!array.errors) return '';

    const errorKey = Object.keys(array.errors)[0];
    return getArrayValidatorErrorMessage(errorKey, array.errors[errorKey]);
  }

  // ===========================================================================
  // SUBMIT
  // ===========================================================================

  onSubmit(): void {
    this.formSubmitted.set(true);
    this.submitResult.set(null);

    // Marcar todos los controles como touched para mostrar errores
    this.profileForm.markAllAsTouched();
    this.formState.markArrayAsTouched(this.addressesArray);
    this.formState.markArrayAsTouched(this.phonesArray);
    this.formState.markArrayAsTouched(this.emergencyContactsArray);

    // Verificar validez
    if (this.profileForm.invalid) {
      this.submitResult.set({
        success: false,
        message: 'Por favor, corrige los errores del formulario'
      });
      return;
    }

    // Simular envio
    this.isSubmitting.set(true);

    setTimeout(() => {
      this.isSubmitting.set(false);
      this.submitResult.set({
        success: true,
        message: 'Perfil guardado correctamente'
      });
      console.log('Datos del formulario:', this.profileForm.value);
    }, 1500);
  }

  /**
   * Resetea el formulario
   */
  resetForm(): void {
    this.profileForm.reset();
    this.formSubmitted.set(false);
    this.submitResult.set(null);

    // Resetear arrays a estado inicial
    while (this.addressesArray.length > 1) {
      this.addressesArray.removeAt(1);
    }
    while (this.phonesArray.length > 1) {
      this.phonesArray.removeAt(1);
    }
    while (this.emergencyContactsArray.length > 0) {
      this.emergencyContactsArray.removeAt(0);
    }
  }
}
