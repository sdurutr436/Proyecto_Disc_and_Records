import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-login-form',
  imports: [CommonModule, FormsModule],
  templateUrl: './login-form.html',
  styleUrl: './login-form.scss',
})
export class LoginForm {
  // Valores del formulario
  email = signal('');
  password = signal('');
  
  // Estados de validación
  emailError = signal(false);
  emailErrorMessage = signal('');
  passwordError = signal(false);
  passwordErrorMessage = signal('');
  
  // Estado del formulario
  isSubmitting = signal(false);
  formSubmitted = signal(false);
  
  // Validación de email
  validateEmail(email: string): boolean {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }
  
  // Validación de contraseña
  validatePassword(password: string): boolean {
    return password.length >= 8;
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
  
  // Manejo de cambio en contraseña
  onPasswordChange(event: Event) {
    const target = event.target as HTMLInputElement;
    this.password.set(target.value);
    
    if (this.formSubmitted()) {
      if (!target.value) {
        this.passwordError.set(true);
        this.passwordErrorMessage.set('La contraseña es requerida');
      } else if (!this.validatePassword(target.value)) {
        this.passwordError.set(true);
        this.passwordErrorMessage.set('La contraseña debe tener al menos 8 caracteres');
      } else {
        this.passwordError.set(false);
        this.passwordErrorMessage.set('');
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
    } else if (!this.validateEmail(this.email())) {
      this.emailError.set(true);
      this.emailErrorMessage.set('Introduce un correo electrónico válido');
    } else {
      this.emailError.set(false);
      this.emailErrorMessage.set('');
    }
    
    // Validar contraseña
    if (!this.password()) {
      this.passwordError.set(true);
      this.passwordErrorMessage.set('La contraseña es requerida');
    } else if (!this.validatePassword(this.password())) {
      this.passwordError.set(true);
      this.passwordErrorMessage.set('La contraseña debe tener al menos 8 caracteres');
    } else {
      this.passwordError.set(false);
      this.passwordErrorMessage.set('');
    }
    
    // Si no hay errores, procesar el formulario
    if (!this.emailError() && !this.passwordError()) {
      this.isSubmitting.set(true);
      
      // Aquí iría la lógica de autenticación
      console.log('Login:', {
        email: this.email(),
        password: this.password()
      });
      
      // Simular llamada a API
      setTimeout(() => {
        this.isSubmitting.set(false);
        alert('¡Inicio de sesión exitoso!');
      }, 1000);
    }
  }
}
