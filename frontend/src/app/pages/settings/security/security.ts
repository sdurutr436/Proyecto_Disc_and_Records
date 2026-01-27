import { Component, signal, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { Alert } from '../../../components/shared/alert/alert';
import { Badge } from '../../../components/shared/badge/badge';
import { Button } from '../../../components/shared/button/button';
import { Modal } from '../../../components/shared/modal/modal';
import { CanComponentDeactivate } from '../../../guards/unsaved-changes.guard';
import { AuthService } from '../../../services/auth';

@Component({
  selector: 'app-settings-security',
  standalone: true,
  imports: [CommonModule, Alert, Badge, Button, Modal],
  templateUrl: './security.html',
  styleUrl: './security.scss'
})
export default class SettingsSecurityComponent implements CanComponentDeactivate {
  private router = inject(Router);
  private authService = inject(AuthService);

  isLoading = signal(false);
  showDeleteModal = signal(false);

  // Información de seguridad
  lastPasswordChange = signal('15 de diciembre, 2025');
  accountCreated = signal('3 de enero, 2025');
  activeSessions = signal(2);

  /**
   * Muestra modal de confirmación para eliminar cuenta
   */
  onDeleteAccount(): void {
    this.showDeleteModal.set(true);
  }

  /**
   * Confirma la eliminación de cuenta
   */
  async confirmDeleteAccount(): Promise<void> {
    this.showDeleteModal.set(false);
    this.isLoading.set(true);

    try {
      const result = await this.authService.deleteAccount();

      if (result.success) {
        // Redirigir a home después de eliminar cuenta
        setTimeout(() => {
          this.isLoading.set(false);
          this.router.navigate(['/']);
        }, 1000);
      } else {
        this.isLoading.set(false);
      }
    } catch (error) {
      console.error('Error eliminando cuenta:', error);
      this.isLoading.set(false);
    }
  }

  /**
   * Guard de navegación
   * En este caso, no hay formularios, así que siempre permitir
   */
  canDeactivate(): boolean {
    return true;
  }
}
