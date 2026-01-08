import { Component, signal, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { FormControl, FormGroup, Validators, ReactiveFormsModule, AbstractControl, ValidationErrors } from '@angular/forms';
import { Button } from '../../components/shared/button/button';
import { FormInput } from '../../components/shared/form-input/form-input';
import { Modal } from '../../components/shared/modal/modal';

interface SettingsForm {
  username: FormControl<string>;
  email: FormControl<string>;
  currentPassword: FormControl<string>;
  newPassword: FormControl<string>;
  confirmPassword: FormControl<string>;
}

interface Preferences {
  emailNotifications: boolean;
  reviewNotifications: boolean;
  profileVisibility: 'public' | 'private' | 'friends';
  language: 'es' | 'en';
}

@Component({
  selector: 'app-settings',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, Button, FormInput, Modal],
  templateUrl: './settings.html',
  styleUrls: ['./settings.scss']
})
export default class SettingsComponent {
  private router = new Router();

  isLoading = signal(false);
  successMessage = signal<string | null>(null);
  errorMessage = signal<string | null>(null);

  // Tab activa
  activeTab = signal<'perfil' | 'cuenta' | 'preferencias' | 'seguridad'>('perfil');

  // Modales
  showDeleteModal = signal(false);
  showPasswordModal = signal(false);

  // Foto de perfil actual (mock)
  currentAvatar = signal('assets/profile-placeholder.jpg');

  // Preferencias
  preferences = signal<Preferences>({
    emailNotifications: true,
    reviewNotifications: true,
    profileVisibility: 'public',
    language: 'es'
  });

  // Información de seguridad
  lastPasswordChange = signal('15 de diciembre, 2025');
  accountCreated = signal('3 de enero, 2025');
  activeSessions = signal(2);

  /**
   * Validador personalizado para fortaleza de contraseña
   */
  private passwordStrengthValidator(control: AbstractControl): ValidationErrors | null {
    const value = control.value;
    if (!value) return null;

    const hasUpperCase = /[A-Z]/.test(value);
    const hasLowerCase = /[a-z]/.test(value);
    const hasNumeric = /[0-9]/.test(value);
    const hasMinLength = value.length >= 8;

    const passwordValid = hasUpperCase && hasLowerCase && hasNumeric && hasMinLength;

    return !passwordValid ? { passwordStrength: true } : null;
  }

  /**
   * Computed que devuelve los requisitos de contraseña
   */
  passwordRequirements = computed(() => {
    const password = this.settingsForm.controls.newPassword.value;
    return {
      minLength: password.length >= 8,
      hasUpperCase: /[A-Z]/.test(password),
      hasLowerCase: /[a-z]/.test(password),
      hasNumber: /[0-9]/.test(password)
    };
  });

  // Formulario de ajustes
  settingsForm = new FormGroup<SettingsForm>({
    username: new FormControl('PerreteGordete', {
      nonNullable: true,
      validators: [
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(20),
        Validators.pattern(/^[a-zA-Z0-9_]+$/)
      ]
    }),
    email: new FormControl('perrete@example.com', {
      nonNullable: true,
      validators: [Validators.required, Validators.email]
    }),
    currentPassword: new FormControl('', {
      nonNullable: true,
      validators: []
    }),
    newPassword: new FormControl('', {
      nonNullable: true,
      validators: [this.passwordStrengthValidator.bind(this)]
    }),
    confirmPassword: new FormControl('', {
      nonNullable: true,
      validators: []
    })
  });

  /**
   * Maneja el cambio de foto de perfil
   */
  onAvatarChange(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files[0]) {
      const file = input.files[0];

      // Validar tamaño (max 2MB)
      if (file.size > 2 * 1024 * 1024) {
        this.errorMessage.set('La imagen no puede superar los 2MB');
        setTimeout(() => this.errorMessage.set(null), 3000);
        return;
      }

      // Validar tipo
      if (!file.type.match(/image\/(jpeg|jpg|png|gif)/)) {
        this.errorMessage.set('Solo se permiten imágenes JPG, PNG o GIF');
        setTimeout(() => this.errorMessage.set(null), 3000);
        return;
      }

      const reader = new FileReader();

      reader.onload = (e: ProgressEvent<FileReader>) => {
        if (e.target?.result) {
          this.currentAvatar.set(e.target.result as string);
          this.successMessage.set('Foto de perfil actualizada (temporal)');
          setTimeout(() => this.successMessage.set(null), 3000);
        }
      };

      reader.readAsDataURL(file);
    }
  }

  /**
   * Guarda los cambios del perfil
   */
  onSaveProfile(): void {
    if (this.settingsForm.invalid) {
      this.errorMessage.set('Por favor, corrige los errores del formulario');
      setTimeout(() => this.errorMessage.set(null), 3000);
      return;
    }

    this.isLoading.set(true);

    // Simular llamada a API
    setTimeout(() => {
      this.isLoading.set(false);
      this.successMessage.set('Perfil actualizado correctamente');
      setTimeout(() => this.successMessage.set(null), 3000);

      console.log('Perfil guardado:', {
        username: this.settingsForm.value.username,
        email: this.settingsForm.value.email,
        avatar: this.currentAvatar()
      });
    }, 1000);
  }

  /**
   * Cambia la contraseña
   */
  onChangePassword(): void {
    const { currentPassword, newPassword, confirmPassword } = this.settingsForm.value;

    if (!currentPassword || !newPassword || !confirmPassword) {
      this.errorMessage.set('Completa todos los campos de contraseña');
      setTimeout(() => this.errorMessage.set(null), 3000);
      return;
    }

    // Validar fortaleza
    const requirements = this.passwordRequirements();
    if (!requirements.minLength || !requirements.hasUpperCase ||
        !requirements.hasLowerCase || !requirements.hasNumber) {
      this.errorMessage.set('La contraseña no cumple los requisitos de seguridad');
      setTimeout(() => this.errorMessage.set(null), 3000);
      return;
    }

    if (newPassword !== confirmPassword) {
      this.errorMessage.set('Las contraseñas no coinciden');
      setTimeout(() => this.errorMessage.set(null), 3000);
      return;
    }

    // Validar que la nueva contraseña sea diferente
    if (currentPassword === newPassword) {
      this.errorMessage.set('La nueva contraseña debe ser diferente a la actual');
      setTimeout(() => this.errorMessage.set(null), 3000);
      return;
    }

    // Mostrar modal de confirmación
    this.showPasswordModal.set(true);
  }

  /**
   * Inicia el cambio de contraseña (validaciones)
   */
  onPasswordChange(): void {
    const currentPassword = this.settingsForm.controls.currentPassword.value;
    const newPassword = this.settingsForm.controls.newPassword.value;
    const confirmPassword = this.settingsForm.controls.confirmPassword.value;

    // Validar contraseña actual
    if (!currentPassword) {
      this.errorMessage.set('Debes ingresar tu contraseña actual');
      setTimeout(() => this.errorMessage.set(null), 3000);
      return;
    }

    if (newPassword !== confirmPassword) {
      this.errorMessage.set('Las contraseñas no coinciden');
      setTimeout(() => this.errorMessage.set(null), 3000);
      return;
    }

    // Validar que la nueva contraseña sea diferente
    if (currentPassword === newPassword) {
      this.errorMessage.set('La nueva contraseña debe ser diferente a la actual');
      setTimeout(() => this.errorMessage.set(null), 3000);
      return;
    }

    // Mostrar modal de confirmación
    this.showPasswordModal.set(true);
  }

  /**
   * Confirma el cambio de contraseña
   */
  confirmPasswordChange(): void {
    this.showPasswordModal.set(false);
    this.isLoading.set(true);

    // Simular llamada a API
    setTimeout(() => {
      this.isLoading.set(false);
      this.successMessage.set('Contraseña actualizada correctamente');
      this.lastPasswordChange.set(new Date().toLocaleDateString('es-ES', {
        day: 'numeric',
        month: 'long',
        year: 'numeric'
      }));
      setTimeout(() => this.successMessage.set(null), 3000);

      // Limpiar campos de contraseña
      this.settingsForm.patchValue({
        currentPassword: '',
        newPassword: '',
        confirmPassword: ''
      });
    }, 1000);
  }

  /**
   * Actualiza una preferencia específica
   */
  updatePreference<K extends keyof Preferences>(key: K, value: Preferences[K]): void {
    this.preferences.update(prefs => ({ ...prefs, [key]: value }));
    this.successMessage.set('Preferencia actualizada');
    setTimeout(() => this.successMessage.set(null), 2000);
  }

  /**
   * Muestra modal de confirmación para eliminar cuenta
   */
  onDeleteAccount(): void {
    this.showDeleteModal.set(true);
  }

  /**
   * Confirma la eliminación de cuenta
   */
  confirmDeleteAccount(): void {
    this.showDeleteModal.set(false);
    this.isLoading.set(true);

    // Simular llamada a API
    setTimeout(() => {
      this.isLoading.set(false);
      console.log('Cuenta eliminada');
      // Redirigir al login o home
      this.router.navigate(['/']);
    }, 1500);
  }

  /**
   * Guarda los cambios generales (username/email)
   */
  onSubmit(): void {
    this.isLoading.set(true);

    // Simular llamada a API
    setTimeout(() => {
      this.isLoading.set(false);
      this.successMessage.set('Cambios guardados correctamente');
      setTimeout(() => this.successMessage.set(null), 3000);
    }, 1000);
  }

  /**
   * Cancela y vuelve al perfil
   */
  onCancel(): void {
    this.router.navigate(['/profile']);
  }

  /**
   * Cambia la tab activa
   */
  setActiveTab(tab: 'perfil' | 'cuenta' | 'preferencias' | 'seguridad'): void {
    this.activeTab.set(tab);
  }

  /**
   * Verifica si una tab está activa
   */
  isTabActive(tab: string): boolean {
    return this.activeTab() === tab;
  }
}
