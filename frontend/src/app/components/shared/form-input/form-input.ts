import { Component, Input, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormControl } from '@angular/forms';

let nextUniqueId = 0;

/**
 * FormInput - Componente Atómico Reutilizable
 *
 * Componente de input que soporta FormControl reactivo con validaciones.
 * Sigue el patrón de diseño atómico para eliminar duplicación de código.
 *
 * @example
 * <app-form-input
 *   [control]="emailControl"
 *   label="Correo electrónico"
 *   type="email"
 *   id="login-email"
 *   placeholder="tu@email.com"
 *   helpText="Introduce tu correo"
 *   [required]="true"
 *   [autocomplete]="'email'">
 * </app-form-input>
 */
@Component({
  selector: 'app-form-input',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './form-input.html',
  styleUrl: './form-input.scss',
})
export class FormInput {
  // FormControl reactivo (requerido)
  @Input() control!: FormControl;

  // Propiedades del input
  @Input() label: string = '';
  @Input() type: string = 'text';
  @Input() id: string = '';
  @Input() placeholder: string = '';
  @Input() required: boolean = false;
  @Input() disabled: boolean = false;
  @Input() autocomplete: string = '';

  // Mensajes de ayuda
  @Input() helpText: string = '';

  // ID único para asociar label e input
  inputId = '';

  ngOnInit() {
    // Usar el ID proporcionado o generar uno único
    this.inputId = this.id || `form-input-${nextUniqueId++}`;
  }

  // Computed para verificar si el control tiene errores y ha sido tocado
  get hasError(): boolean {
    return !!(this.control && this.control.invalid && this.control.touched);
  }

  // Computed para verificar si el control es válido
  get hasSuccess(): boolean {
    return !!(this.control && this.control.valid && this.control.touched);
  }

  // Obtener el primer mensaje de error del control
  get errorMessage(): string {
    if (!this.control || !this.control.errors || !this.control.touched) {
      return '';
    }

    const errors = this.control.errors;

    // Mapeo de errores comunes a mensajes en español
    if (errors['required']) {
      return `${this.label} es requerido`;
    }
    if (errors['email']) {
      return 'Email debe ser válido (ej: usuario@dominio.com)';
    }
    if (errors['minlength']) {
      return `Mínimo ${errors['minlength'].requiredLength} caracteres`;
    }
    if (errors['maxlength']) {
      return `Máximo ${errors['maxlength'].requiredLength} caracteres`;
    }
    if (errors['pattern']) {
      return 'Formato inválido';
    }
    if (errors['passwordStrength']) {
      return errors['passwordStrength'];
    }
    if (errors['emailTaken']) {
      return 'Este email ya está registrado';
    }
    if (errors['usernameTaken']) {
      return 'Este nombre de usuario ya está en uso';
    }

    // Error genérico
    return 'Campo inválido';
  }
}
