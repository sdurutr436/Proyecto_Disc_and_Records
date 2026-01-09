import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { Alert } from '../../../components/shared/alert/alert';
import { Button } from '../../../components/shared/button/button';
import { FormCheckbox } from '../../../components/shared/form-checkbox/form-checkbox';
import { FormRadioGroup, RadioOption } from '../../../components/shared/form-radio-group/form-radio-group';
import { FormSelect, SelectOption } from '../../../components/shared/form-select/form-select';
import { CanComponentDeactivate } from '../../../guards/unsaved-changes.guard';

@Component({
  selector: 'app-settings-preferences',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    Alert,
    Button,
    FormCheckbox,
    FormRadioGroup,
    FormSelect
  ],
  templateUrl: './preferences.html',
  styleUrl: './preferences.scss'
})
export default class SettingsPreferencesComponent implements CanComponentDeactivate {
  successMessage = signal<string | null>(null);

  // Opciones para radio group de visibilidad
  visibilityOptions: RadioOption[] = [
    { value: 'public', label: 'Público - Cualquier usuario puede ver tu perfil' },
    { value: 'friends', label: 'Solo Amigos - Solo tus amigos pueden verte' },
    { value: 'private', label: 'Privado - Nadie puede ver tu perfil' }
  ];

  // Opciones para select de idioma
  languageOptions: SelectOption[] = [
    { value: 'es', label: 'Español' },
    { value: 'en', label: 'English' }
  ];

  // Formulario reactivo
  preferencesForm = new FormGroup({
    emailNotifications: new FormControl(true, { nonNullable: true }),
    reviewNotifications: new FormControl(true, { nonNullable: true }),
    profileVisibility: new FormControl<string>('public', { nonNullable: true }),
    language: new FormControl<string>('es', { nonNullable: true })
  });

  /**
   * Guarda las preferencias
   */
  onSubmit(): void {
    if (this.preferencesForm.valid) {
      console.log('Preferencias guardadas:', this.preferencesForm.value);
      this.successMessage.set('Preferencias guardadas correctamente');
      this.preferencesForm.markAsPristine();
      setTimeout(() => this.successMessage.set(null), 3000);
    }
  }

  /**
   * Guard de navegación - Previene pérdida de datos
   */
  canDeactivate(): boolean {
    if (!this.preferencesForm.dirty) {
      return true;
    }

    return confirm('¿Deseas salir sin guardar los cambios en preferencias?');
  }
}
