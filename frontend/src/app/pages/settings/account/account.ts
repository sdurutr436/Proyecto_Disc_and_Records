import { Component, signal, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormControl, FormGroup, Validators, ReactiveFormsModule, AbstractControl, ValidationErrors } from '@angular/forms';
import { Alert } from '../../../components/shared/alert/alert';
import { Button } from '../../../components/shared/button/button';
import { FormInput } from '../../../components/shared/form-input/form-input';
import { Modal } from '../../../components/shared/modal/modal';
import { ProgressBar } from '../../../components/shared/progress-bar/progress-bar';

@Component({
  selector: 'app-settings-account',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, Alert, Button, FormInput, Modal, ProgressBar],
  templateUrl: './account.html',
  styleUrl: './account.scss'
})
export default class SettingsAccountComponent {
  isLoading = signal(false);
  successMessage = signal<string | null>(null);
  errorMessage = signal<string | null>(null);
  showPasswordModal = signal(false);

  // Formulario de email separado
  emailForm = new FormGroup({
    email: new FormControl('perrete@example.com', {
      nonNullable: true,
      validators: [Validators.required, Validators.email]
    })
  });

  // Formulario de contraseña separado
  passwordForm = new FormGroup({
    currentPassword: new FormControl('', {
      nonNullable: true,
      validators: [Validators.required]
    }),
    newPassword: new FormControl('', {
      nonNullable: true,
      validators: [Validators.required, Validators.minLength(8)]
    }),
    confirmPassword: new FormControl('', {
      nonNullable: true,
      validators: [Validators.required]
    })
  }, { validators: this.passwordMatchValidator });

  /**
   * Validador de coincidencia de contraseñas
   */
  private passwordMatchValidator(group: AbstractControl): ValidationErrors | null {
    const newPassword = group.get('newPassword')?.value;
    const confirmPassword = group.get('confirmPassword')?.value;
    return newPassword === confirmPassword ? null : { passwordMismatch: true };
  }

  /**
   * Calcula la fortaleza de la contraseña (0-100)
   */
  passwordStrength = computed(() => {
    const password = this.passwordForm.controls.newPassword.value;
    if (!password) return 0;

    let strength = 0;
    if (password.length >= 8) strength += 25;
    if (/[A-Z]/.test(password)) strength += 25;
    if (/[a-z]/.test(password)) strength += 25;
    if (/[0-9]/.test(password)) strength += 15;
    if (/[^a-zA-Z0-9]/.test(password)) strength += 10;

    return Math.min(strength, 100);
  });

  /**
   * Etiqueta de fortaleza
   */
  passwordStrengthLabel = computed(() => {
    const strength = this.passwordStrength();
    if (strength < 25) return 'Muy débil';
    if (strength < 50) return 'Débil';
    if (strength < 75) return 'Aceptable';
    return 'Fuerte';
  });

  /**
   * Variante de color para el progress bar
   */
  passwordStrengthVariant = computed((): 'error' | 'warning' | 'success' => {
    const strength = this.passwordStrength();
    if (strength < 50) return 'error';
    if (strength < 75) return 'warning';
    return 'success';
  });

  /**
   * Guarda los cambios del email
   */
  onSubmitEmail(): void {
    if (this.emailForm.invalid) {
      this.errorMessage.set('Por favor, ingresa un email válido');
      setTimeout(() => this.errorMessage.set(null), 3000);
      return;
    }

    this.isLoading.set(true);
    setTimeout(() => {
      this.isLoading.set(false);
      this.successMessage.set('Email actualizado correctamente');
      this.emailForm.markAsPristine();
      setTimeout(() => this.successMessage.set(null), 3000);
    }, 1000);
  }

  /**
   * Inicia el cambio de contraseña
   */
  onPasswordChange(): void {
    if (this.passwordForm.invalid) {
      if (this.passwordForm.hasError('passwordMismatch')) {
        this.errorMessage.set('Las contraseñas no coinciden');
      } else {
        this.errorMessage.set('Por favor, completa todos los campos correctamente');
      }
      setTimeout(() => this.errorMessage.set(null), 3000);
      return;
    }

    this.showPasswordModal.set(true);
  }

  /**
   * Confirma el cambio de contraseña
   */
  confirmPasswordChange(): void {
    this.showPasswordModal.set(false);
    this.isLoading.set(true);

    setTimeout(() => {
      this.isLoading.set(false);
      this.successMessage.set('Contraseña actualizada correctamente');
      this.passwordForm.reset();
      setTimeout(() => this.successMessage.set(null), 3000);
    }, 1000);
  }
}
