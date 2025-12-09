import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-register-form',
  imports: [CommonModule, FormsModule],
  templateUrl: './register-form.html',
  styleUrl: './register-form.scss',
})
export class RegisterForm {
  // Valores del formulario
  username = signal('');
  email = signal('');
  password = signal('');
  confirmPassword = signal('');
  
  // Estados de validación
  usernameError = signal(false);
  usernameErrorMessage = signal('');
  emailError = signal(false);
  emailErrorMessage = signal('');
  passwordError = signal(false);
  passwordErrorMessage = signal('');
  confirmPasswordError = signal(false);
  confirmPasswordErrorMessage = signal('');
  
  // Estado del formulario
  isSubmitting = signal(false);
  formSubmitted = signal(false);
  
  // Validación de nombre de usuario
  validateUsername(username: string): boolean {
    // Solo letras, números y guiones bajos, entre 3 y 20 caracteres
    const usernameRegex = /^[a-zA-Z0-9_]{3,20}$/;
    return usernameRegex.test(username);
  }
  
  // Validación de email
  validateEmail(email: string): boolean {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }
  
  // Validación de contraseña
  validatePassword(password: string): boolean {
    return password.length >= 8;
  }
  
  // Validación de confirmación de contraseña
  validateConfirmPassword(password: string, confirmPassword: string): boolean {
    return password === confirmPassword && confirmPassword.length > 0;
  }
  
  // Manejo de cambio en nombre de usuario
  onUsernameChange(event: Event) {
    const target = event.target as HTMLInputElement;
    this.username.set(target.value);
    
    if (this.formSubmitted()) {
      if (!target.value) {
        this.usernameError.set(true);
        this.usernameErrorMessage.set('El nombre de usuario es requerido');
      } else if (!this.validateUsername(target.value)) {
        this.usernameError.set(true);
        this.usernameErrorMessage.set('Solo letras, números y guiones bajos (3-20 caracteres)');
      } else {
        this.usernameError.set(false);
        this.usernameErrorMessage.set('');
      }
    }
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
        
        // Re-validar confirmación si ya tiene valor
        if (this.confirmPassword()) {
          if (!this.validateConfirmPassword(target.value, this.confirmPassword())) {
            this.confirmPasswordError.set(true);
            this.confirmPasswordErrorMessage.set('Las contraseñas no coinciden');
          } else {
            this.confirmPasswordError.set(false);
            this.confirmPasswordErrorMessage.set('');
          }
        }
      }
    }
  }
  
  // Manejo de cambio en confirmación de contraseña
  onConfirmPasswordChange(event: Event) {
    const target = event.target as HTMLInputElement;
    this.confirmPassword.set(target.value);
    
    if (this.formSubmitted()) {
      if (!target.value) {
        this.confirmPasswordError.set(true);
        this.confirmPasswordErrorMessage.set('Confirma tu contraseña');
      } else if (!this.validateConfirmPassword(this.password(), target.value)) {
        this.confirmPasswordError.set(true);
        this.confirmPasswordErrorMessage.set('Las contraseñas no coinciden');
      } else {
        this.confirmPasswordError.set(false);
        this.confirmPasswordErrorMessage.set('');
      }
    }
  }
  
  // Manejo del submit
  onSubmit(event: Event) {
    event.preventDefault();
    this.formSubmitted.set(true);
    
    let hasErrors = false;
    
    // Validar nombre de usuario
    if (!this.username()) {
      this.usernameError.set(true);
      this.usernameErrorMessage.set('El nombre de usuario es requerido');
      hasErrors = true;
    } else if (!this.validateUsername(this.username())) {
      this.usernameError.set(true);
      this.usernameErrorMessage.set('Solo letras, números y guiones bajos (3-20 caracteres)');
      hasErrors = true;
    } else {
      this.usernameError.set(false);
      this.usernameErrorMessage.set('');
    }
    
    // Validar email
    if (!this.email()) {
      this.emailError.set(true);
      this.emailErrorMessage.set('El correo electrónico es requerido');
      hasErrors = true;
    } else if (!this.validateEmail(this.email())) {
      this.emailError.set(true);
      this.emailErrorMessage.set('Introduce un correo electrónico válido');
      hasErrors = true;
    } else {
      this.emailError.set(false);
      this.emailErrorMessage.set('');
    }
    
    // Validar contraseña
    if (!this.password()) {
      this.passwordError.set(true);
      this.passwordErrorMessage.set('La contraseña es requerida');
      hasErrors = true;
    } else if (!this.validatePassword(this.password())) {
      this.passwordError.set(true);
      this.passwordErrorMessage.set('La contraseña debe tener al menos 8 caracteres');
      hasErrors = true;
    } else {
      this.passwordError.set(false);
      this.passwordErrorMessage.set('');
    }
    
    // Validar confirmación de contraseña
    if (!this.confirmPassword()) {
      this.confirmPasswordError.set(true);
      this.confirmPasswordErrorMessage.set('Confirma tu contraseña');
      hasErrors = true;
    } else if (!this.validateConfirmPassword(this.password(), this.confirmPassword())) {
      this.confirmPasswordError.set(true);
      this.confirmPasswordErrorMessage.set('Las contraseñas no coinciden');
      hasErrors = true;
    } else {
      this.confirmPasswordError.set(false);
      this.confirmPasswordErrorMessage.set('');
    }
    
    // Si no hay errores, procesar el formulario
    if (!hasErrors) {
      this.isSubmitting.set(true);
      
      // Aquí iría la lógica de registro
      console.log('Registro:', {
        username: this.username(),
        email: this.email(),
        password: this.password()
      });
      
      // Simular llamada a API
      setTimeout(() => {
        this.isSubmitting.set(false);
        alert('¡Registro exitoso! Bienvenido a Discs & Records');
      }, 1500);
    }
  }
}
