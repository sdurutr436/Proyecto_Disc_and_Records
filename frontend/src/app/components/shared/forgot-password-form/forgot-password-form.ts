import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-forgot-password-form',
  imports: [CommonModule, FormsModule],
  templateUrl: './forgot-password-form.html',
  styleUrl: './forgot-password-form.scss',
})
export class ForgotPasswordForm {
  // Valor del formulario
  email = signal('');
  
  // Estados de validación
  emailError = signal(false);
  emailErrorMessage = signal('');
  
  // Estados del formulario
  isSubmitting = signal(false);
  formSubmitted = signal(false);
  emailSent = signal(false);
  
  // Validación de email
  validateEmail(email: string): boolean {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }
  
  // Manejo de cambio en email
  onEmailChange(event: Event) {
    const target = event.target as HTMLInputElement;
    this.email.set(target.value);
    
    if (this.formSubmitted()) {
      if (!target.value) {
        this.emailError.set(true);
        this.emailErrorMessage.set('El correo electrónico es requerido');
      } else if (!this.validateEmail(target.value)) {
        this.emailError.set(true);
        this.emailErrorMessage.set('Introduce un correo electrónico válido');
      } else {
        this.emailError.set(false);
        this.emailErrorMessage.set('');
      }
    }
  }
  
  // Manejo del submit
  onSubmit(event: Event) {
    event.preventDefault();
    this.formSubmitted.set(true);
    
    // Validar email
    if (!this.email()) {
      this.emailError.set(true);
      this.emailErrorMessage.set('El correo electrónico es requerido');
      return;
    } else if (!this.validateEmail(this.email())) {
      this.emailError.set(true);
      this.emailErrorMessage.set('Introduce un correo electrónico válido');
      return;
    } else {
      this.emailError.set(false);
      this.emailErrorMessage.set('');
    }
    
    // Si la validación pasa, procesar el formulario
    this.isSubmitting.set(true);
    
    // Aquí iría la lógica de recuperación de contraseña
    console.log('Recuperar contraseña para:', this.email());
    
    // Simular llamada a API
    setTimeout(() => {
      this.isSubmitting.set(false);
      this.emailSent.set(true);
    }, 1500);
  }
  
  // Resetear formulario para enviar otro email
  sendAnother() {
    this.email.set('');
    this.emailError.set(false);
    this.emailErrorMessage.set('');
    this.formSubmitted.set(false);
    this.emailSent.set(false);
  }
}
