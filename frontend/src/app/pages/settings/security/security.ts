import { Component, signal, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { Alert } from '../../../components/shared/alert/alert';
import { Badge } from '../../../components/shared/badge/badge';
import { Button } from '../../../components/shared/button/button';
import { Modal } from '../../../components/shared/modal/modal';
import { CanComponentDeactivate } from '../../../guards/unsaved-changes.guard';

@Component({
  selector: 'app-settings-security',
  standalone: true,
  imports: [CommonModule, Alert, Badge, Button, Modal],
  templateUrl: './security.html',
  styleUrl: './security.scss'
})
export default class SettingsSecurityComponent implements CanComponentDeactivate {
  private router = inject(Router);

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
  confirmDeleteAccount(): void {
    this.showDeleteModal.set(false);
    this.isLoading.set(true);

    // Simular llamada a API
    setTimeout(() => {
      this.isLoading.set(false);
      console.log('Cuenta eliminada');
      this.router.navigate(['/']);
    }, 1500);
  }

  /**
   * Guard de navegación
   * En este caso, no hay formularios, así que siempre permitir
   */
  canDeactivate(): boolean {
    return true;
  }
}
