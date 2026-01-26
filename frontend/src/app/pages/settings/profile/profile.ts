import { Component, signal, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormControl, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Alert } from '../../../components/shared/alert/alert';
import { Button } from '../../../components/shared/button/button';
import { FormInput } from '../../../components/shared/form-input/form-input';
import { CanComponentDeactivate } from '../../../guards/unsaved-changes.guard';
import { AppStateService } from '../../../services/app-state';
import { API_CONFIG, API_ENDPOINTS } from '../../../config/api.config';

@Component({
  selector: 'app-settings-profile',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, Alert, Button, FormInput],
  templateUrl: './profile.html',
  styleUrl: './profile.scss'
})
export default class SettingsProfileComponent implements CanComponentDeactivate, OnInit {
  private readonly appState = inject(AppStateService);
  private readonly http = inject(HttpClient);

  isLoading = signal(false);
  successMessage = signal<string | null>(null);
  errorMessage = signal<string | null>(null);

  // Foto de perfil actual
  currentAvatar = signal('assets/profile-placeholder.svg');

  // Formulario de perfil
  profileForm = new FormGroup({
    username: new FormControl('', {
      nonNullable: true,
      validators: [
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(20),
        Validators.pattern(/^[a-zA-Z0-9_]+$/)
      ]
    })
  });

  ngOnInit(): void {
    const user = this.appState.currentUser();
    if (user) {
      this.profileForm.patchValue({ username: user.username });
      this.currentAvatar.set(user.avatarUrl || 'assets/profile-placeholder.svg');
      this.profileForm.markAsPristine();
    }
  }

  /**
   * Maneja el cambio de foto de perfil
   */
  onAvatarChange(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files[0]) {
      const file = input.files[0];

      // Validar tamaño (max 200KB para el backend)
      if (file.size > 200 * 1024) {
        this.errorMessage.set('La imagen no puede superar los 200KB');
        setTimeout(() => this.errorMessage.set(null), 3000);
        return;
      }

      // Validar tipo
      if (!file.type.match(/image\/(jpeg|jpg|png|gif|webp)/)) {
        this.errorMessage.set('Solo se permiten imágenes JPG, PNG, GIF o WebP');
        setTimeout(() => this.errorMessage.set(null), 3000);
        return;
      }

      // Subir al backend
      const formData = new FormData();
      formData.append('file', file);

      this.isLoading.set(true);

      this.http.post<{ avatar: string }>(
        `${API_CONFIG.baseUrl}${API_ENDPOINTS.usuarios.uploadAvatar}`,
        formData
      ).subscribe({
        next: (response) => {
          // El backend devuelve el avatar en base64
          const avatarUrl = response.avatar || `data:${file.type};base64,${response.avatar}`;
          this.currentAvatar.set(avatarUrl);
          this.appState.updateUser({ avatarUrl });
          this.successMessage.set('Foto de perfil actualizada correctamente');
          setTimeout(() => this.successMessage.set(null), 3000);
          this.isLoading.set(false);
        },
        error: (error) => {
          console.error('Error subiendo avatar:', error);
          // Fallback: guardar solo localmente si falla el backend
          const reader = new FileReader();
          reader.onload = (e: ProgressEvent<FileReader>) => {
            if (e.target?.result) {
              const avatarBase64 = e.target.result as string;
              this.currentAvatar.set(avatarBase64);
              this.appState.updateUser({ avatarUrl: avatarBase64 });
              this.successMessage.set('Foto actualizada (solo localmente)');
              setTimeout(() => this.successMessage.set(null), 3000);
            }
          };
          reader.readAsDataURL(file);
          this.isLoading.set(false);
        }
      });
    }
  }

  /**
   * Guarda los cambios del perfil
   */
  onSubmit(): void {
    if (this.profileForm.invalid) {
      this.errorMessage.set('Por favor, corrige los errores del formulario');
      setTimeout(() => this.errorMessage.set(null), 3000);
      return;
    }

    this.isLoading.set(true);

    // Simular llamada a API
    setTimeout(() => {
      this.isLoading.set(false);
      this.profileForm.markAsPristine();
      this.successMessage.set('Perfil actualizado correctamente');
      setTimeout(() => this.successMessage.set(null), 3000);

      console.log('Perfil guardado:', {
        username: this.profileForm.value.username,
        avatar: this.currentAvatar()
      });
    }, 1000);
  }

  canDeactivate(): boolean {
    if (!this.profileForm.dirty) {
      return true;
    }
    return confirm('Deseas salir sin guardar los cambios en tu perfil?');
  }
}
