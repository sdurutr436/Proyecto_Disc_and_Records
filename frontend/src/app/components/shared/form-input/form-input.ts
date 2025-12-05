import { Component, Input, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

let nextUniqueId = 0;

@Component({
  selector: 'app-form-input',
  imports: [CommonModule, FormsModule],
  templateUrl: './form-input.html',
  styleUrl: './form-input.scss',
})
export class FormInput {
  // Propiedades del input
  @Input() label: string = '';
  @Input() type: string = 'text';
  @Input() name: string = '';
  @Input() placeholder: string = '';
  @Input() required: boolean = false;
  @Input() disabled: boolean = false;
  @Input() value: string = '';
  
  // Mensajes de ayuda y error
  @Input() helpText: string = '';
  @Input() errorMessage: string = '';
  
  // Estado del input
  @Input() hasError: boolean = false;
  @Input() hasSuccess: boolean = false;
  
  // ID único para asociar label e input
  inputId = `form-input-${nextUniqueId++}`;
  
  // Signal para el valor actual (opcional, para reactividad)
  currentValue = signal(this.value);
  
  ngOnInit() {
    this.currentValue.set(this.value);
  }
  
  onInputChange(event: Event) {
    const target = event.target as HTMLInputElement;
    this.currentValue.set(target.value);
  }
}
