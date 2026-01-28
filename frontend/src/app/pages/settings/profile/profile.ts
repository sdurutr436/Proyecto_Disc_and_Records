import { Component, signal, inject, OnInit, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormControl, FormGroup, Validators, ReactiveFormsModule, FormsModule, AbstractControl, ValidationErrors } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { LucideAngularModule, User, Mail, Lock, Image, Trash2, AlertTriangle } from 'lucide-angular';
import { Alert } from '../../../components/shared/alert/alert';
import { Button } from '../../../components/shared/button/button';
import { FormInput } from '../../../components/shared/form-input/form-input';
import { Modal } from '../../../components/shared/modal/modal';
import { Card } from '../../../components/shared/card/card';
import { CanComponentDeactivate } from '../../../guards/unsaved-changes.guard';
import { AppStateService } from '../../../services/app-state';
import { AuthService } from '../../../services/auth';
import { NotificationStreamService } from '../../../services/notification-stream';
import { API_CONFIG, API_ENDPOINTS } from '../../../config/api.config';

@Component({
  selector: 'app-settings-profile',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, FormsModule, LucideAngularModule, Alert, Button, FormInput, Modal, Card],
  templateUrl: './profile.html',
  styleUrl: './profile.scss'
})
export default class SettingsProfileComponent implements CanComponentDeactivate, OnInit {
  private readonly appState = inject(AppStateService);
  private readonly http = inject(HttpClient);
  private readonly authService = inject(AuthService);
  private readonly notificationStream = inject(NotificationStreamService);
  private readonly router = inject(Router);

  // Estados generales
  isLoading = signal(false);

  // Iconos Lucide
  readonly User = User;
  readonly Mail = Mail;
  readonly Lock = Lock;
  readonly Image = Image;
  readonly Trash2 = Trash2;
  readonly AlertTriangle = AlertTriangle;

  // Foto de perfil
  currentAvatar = signal('assets/profile-placeholder.svg');
  selectedAvatarFile = signal<File | null>(null);
  previewAvatarUrl = signal<string | null>(null);

  // Modal de confirmación para eliminar cuenta
  showDeleteModal = signal(false);
  deleteConfirmationText = signal('');
  canDeleteAccount = computed(() => this.deleteConfirmationText().trim().toLowerCase() === 'eliminar');

  // Formulario de datos (username y email)
  dataForm = new FormGroup({
    username: new FormControl('', {
      nonNullable: true,
      validators: [
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(50),
        Validators.pattern(/^[a-zA-Z0-9_]+$/)
      ]
    }),
    email: new FormControl('', {
      nonNullable: true,
      validators: [Validators.required, Validators.email]
    })
  });

  // Formulario de contraseña
  passwordForm = new FormGroup({
    currentPassword: new FormControl('', {
      nonNullable: true,
      validators: [Validators.required]
    }),
    newPassword: new FormControl('', {
      nonNullable: true,
      validators: [Validators.required, Validators.minLength(6), Validators.maxLength(100)]
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
    // Solo validar si ambos campos tienen valor
    if (!newPassword || !confirmPassword) return null;
    return newPassword === confirmPassword ? null : { passwordMismatch: true };
  }

  /**
   * Computed: Verifica si hay error de coincidencia de contraseñas
   * SÚPER DINÁMICO - Se actualiza AL INSTANTE
   */
  hasPasswordMismatch = computed(() => {
    const form = this.passwordForm;
    const newPassword = form.controls.newPassword.value;
    const confirmPassword = form.controls.confirmPassword.value;

    // Si ambos campos tienen contenido Y no coinciden = ALARMA INMEDIATA
    if (newPassword && confirmPassword && newPassword.length > 0 && confirmPassword.length > 0) {
      return newPassword !== confirmPassword;
    }

    return false;
  });

  ngOnInit(): void {
    const user = this.appState.currentUser();
    if (user) {
      this.dataForm.patchValue({
        username: user.username,
        email: user.email
      });
      this.currentAvatar.set(user.avatarUrl || 'assets/profile-placeholder.svg');
      this.dataForm.markAsPristine();
    }

    // 🚨 LISTENERS SÚPER DINÁMICOS PARA VALIDACIÓN INSTANTÁNEA 🚨
    // Escuchar cambios en AMBOS campos de contraseña para validación inmediata
    this.passwordForm.controls.newPassword.valueChanges.subscribe(() => {
      // Forzar revalidación inmediata
      this.passwordForm.controls.confirmPassword.updateValueAndValidity({ emitEvent: false });
    });

    this.passwordForm.controls.confirmPassword.valueChanges.subscribe(() => {
      // Forzar revalidación inmediata
      this.passwordForm.controls.newPassword.updateValueAndValidity({ emitEvent: false });
    });
  }

  /**
   * Actualiza el nombre de usuario
   */
  async onUpdateUsername(): Promise<void> {
    if (this.dataForm.controls.username.invalid) {
      this.notificationStream.error('Validación', 'Por favor, ingresa un nombre de usuario válido');
      return;
    }

    this.isLoading.set(true);

    try {
      const response = await this.http.put<{ id: number; nombreUsuario: string; mail: string; avatarUrl: string }>(
        `${API_CONFIG.baseUrl}/usuarios/me/username`,
        { nombreUsuario: this.dataForm.value.username }
      ).toPromise();

      if (response) {
        this.appState.updateUser({ username: response.nombreUsuario });
        this.dataForm.controls.username.markAsPristine();
        this.notificationStream.success('Éxito', 'Nombre de usuario actualizado correctamente');
      }
    } catch (error: any) {
      console.error('Error actualizando nombre de usuario:', error);
      if (error.status === 409 || error.error?.message?.includes('duplicado')) {
        this.notificationStream.warning('Advertencia', 'Este nombre de usuario ya está en uso');
      } else {
        this.notificationStream.error('Error', 'No se pudo actualizar el nombre de usuario');
      }
    } finally {
      this.isLoading.set(false);
    }
  }

  /**
   * Actualiza el email
   */
  async onUpdateEmail(): Promise<void> {
    if (this.dataForm.controls.email.invalid) {
      this.notificationStream.error('Validación', 'Por favor, ingresa un email válido');
      return;
    }

    this.isLoading.set(true);

    try {
      const response = await this.http.put<{ id: number; nombreUsuario: string; mail: string; avatarUrl: string }>(
        `${API_CONFIG.baseUrl}/usuarios/me/email`,
        { mail: this.dataForm.value.email }
      ).toPromise();

      if (response) {
        this.appState.updateUser({ email: response.mail });
        this.dataForm.controls.email.markAsPristine();
        this.notificationStream.success('Éxito', 'Email actualizado correctamente');
      }
    } catch (error: any) {
      console.error('Error actualizando email:', error);
      if (error.status === 409 || error.error?.message?.includes('duplicado')) {
        this.notificationStream.warning('Advertencia', 'Este email ya está registrado');
      } else {
        this.notificationStream.error('Error', 'No se pudo actualizar el email');
      }
    } finally {
      this.isLoading.set(false);
    }
  }

  /**
   * Cambia la contraseña con validaciones correctas:
   * - Verifica contraseña actual
   * - Valida que nueva === confirmar (en el formulario)
   * - Si nueva === actual, muestra INFO (no ERROR)
   */
  async onChangePassword(): Promise<void> {
    const { currentPassword, newPassword, confirmPassword } = this.passwordForm.value;

    // Validar que los campos no estén vacíos
    if (!currentPassword || !newPassword || !confirmPassword) {
      this.notificationStream.error('Validación', 'Todos los campos son obligatorios');
      return;
    }

    // La validación de coincidencia ahora se hace en el formulario (passwordMismatch)
    // Pero por seguridad, también lo verificamos aquí
    if (this.passwordForm.hasError('passwordMismatch')) {
      // No mostramos toast porque el error ya se ve en el formulario
      return;
    }

    this.isLoading.set(true);

    try {
      await this.http.put<void>(
        `${API_CONFIG.baseUrl}/usuarios/me/password`,
        {
          contrasenaActual: currentPassword,
          contrasenaNueva: newPassword
        }
      ).toPromise();

      this.passwordForm.reset();
      this.notificationStream.success('Éxito', 'Contraseña actualizada correctamente');
    } catch (error: any) {
      console.error('Error cambiando contraseña:', error);

      // Manejo consistente de errores
      if (error.status === 401 || error.error?.message?.includes('incorrecta')) {
        this.notificationStream.error('Error', 'La contraseña actual es incorrecta');
      } else if (error.status === 400 && error.error?.message?.includes('diferente')) {
        // Si nueva === actual, mostrar INFO (no ERROR)
        this.notificationStream.info('Información', 'La nueva contraseña debe ser diferente a la actual');
      } else {
        this.notificationStream.error('Error', 'No se pudo cambiar la contraseña');
      }
    } finally {
      this.isLoading.set(false);
    }
  }

  /**
   * Selecciona un archivo de avatar y muestra preview
   */
  onAvatarFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files[0]) {
      const file = input.files[0];

      // Validar tamaño (max 2MB)
      if (file.size > 2 * 1024 * 1024) {
        this.notificationStream.error('Validación', 'La imagen no puede superar los 2MB');
        return;
      }

      // Validar tipo
      if (!file.type.match(/image\/(jpeg|jpg|png|gif|webp)/)) {
        this.notificationStream.error('Validación', 'Solo se permiten imágenes JPG, PNG, GIF o WebP');
        return;
      }

      // Guardar archivo y crear preview
      this.selectedAvatarFile.set(file);

      const reader = new FileReader();
      reader.onload = (e: ProgressEvent<FileReader>) => {
        if (e.target?.result) {
          this.previewAvatarUrl.set(e.target.result as string);
        }
      };
      reader.readAsDataURL(file);
    }
  }

  /**
   * Activa el input file oculto
   */
  triggerFileInput(): void {
    const fileInput = document.getElementById('avatar-file-input') as HTMLInputElement;
    if (fileInput) {
      fileInput.click();
    }
  }

  /**
   * Guarda el avatar seleccionado
   */
  async onSaveAvatar(): Promise<void> {
    const file = this.selectedAvatarFile();
    if (!file) {
      this.notificationStream.warning('Advertencia', 'Por favor, selecciona una imagen primero');
      return;
    }

    this.isLoading.set(true);

    const formData = new FormData();
    formData.append('file', file);

    try {
      const response = await this.http.post<{ avatar: string }>(
        `${API_CONFIG.baseUrl}${API_ENDPOINTS.usuarios.uploadAvatar}`,
        formData
      ).toPromise();

      if (response) {
        const avatarUrl = response.avatar.startsWith('data:') ? response.avatar : `data:image/jpeg;base64,${response.avatar}`;
        this.currentAvatar.set(avatarUrl);
        this.appState.updateUser({ avatarUrl });
        this.selectedAvatarFile.set(null);
        this.previewAvatarUrl.set(null);

        // Resetear el input file para permitir nueva selección
        const fileInput = document.getElementById('avatar-file-input') as HTMLInputElement;
        if (fileInput) {
          fileInput.value = '';
        }

        this.notificationStream.success('Éxito', 'Foto de perfil actualizada correctamente');

        // Forzar actualización de UI en toda la app
        window.dispatchEvent(new Event('storage'));
      }
    } catch (error: any) {
      console.error('Error subiendo avatar:', error);
      this.notificationStream.error('Error', 'No se pudo actualizar la foto de perfil');
    } finally {
      this.isLoading.set(false);
    }
  }

  /**
   * Elimina el avatar actual
   */
  async onDeleteAvatar(): Promise<void> {
    this.isLoading.set(true);

    try {
      await this.http.delete<void>(
        `${API_CONFIG.baseUrl}/usuarios/me/avatar`
      ).toPromise();

      this.currentAvatar.set('assets/profile-placeholder.svg');
      this.appState.updateUser({ avatarUrl: 'assets/profile-placeholder.svg' });
      this.selectedAvatarFile.set(null);
      this.previewAvatarUrl.set(null);

      // Resetear el input file para permitir nueva selección
      const fileInput = document.getElementById('avatar-file-input') as HTMLInputElement;
      if (fileInput) {
        fileInput.value = '';
      }

      this.notificationStream.success('Éxito', 'Foto de perfil eliminada correctamente');

      // Forzar actualización de UI en toda la app
      window.dispatchEvent(new Event('storage'));
    } catch (error: any) {
      console.error('Error eliminando avatar:', error);
      this.notificationStream.error('Error', 'No se pudo eliminar la foto de perfil');
    } finally {
      this.isLoading.set(false);
    }
  }

  /**
   * Abre el modal de confirmación para eliminar cuenta
   */
  openDeleteModal(): void {
    this.showDeleteModal.set(true);
    this.deleteConfirmationText.set('');
  }

  /**
   * Cierra el modal de confirmación
   */
  closeDeleteModal(): void {
    this.showDeleteModal.set(false);
    this.deleteConfirmationText.set('');
  }

  /**
   * Elimina la cuenta del usuario después de doble confirmación
   */
  async onDeleteAccount(): Promise<void> {
    if (!this.canDeleteAccount()) {
      this.notificationStream.error('Validación', 'Por favor, escribe "eliminar" para confirmar');
      return;
    }

    this.isLoading.set(true);

    try {
      await this.http.delete<void>(
        `${API_CONFIG.baseUrl}/usuarios/me`
      ).toPromise();

      this.notificationStream.success('Éxito', 'Cuenta eliminada correctamente');
      this.closeDeleteModal();

      // Limpiar completamente la sesión antes de redirigir
      this.authService.logout();

      // Redirigir inmediatamente después de logout
      setTimeout(() => {
        this.router.navigate(['/']);
      }, 500);
    } catch (error: any) {
      console.error('Error eliminando cuenta:', error);
      this.notificationStream.error('Error', 'No se pudo eliminar la cuenta');
      this.isLoading.set(false);
    }
  }

  canDeactivate(): boolean {
    if (!this.dataForm.dirty && !this.passwordForm.dirty && !this.selectedAvatarFile()) {
      return true;
    }
    return confirm('¿Deseas salir sin guardar los cambios?');
  }
}
