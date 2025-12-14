import { Component, Input, forwardRef } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { CommonModule } from '@angular/common';

export interface RadioOption {
  value: string | number;
  label: string;
}

@Component({
  selector: 'app-form-radio-group',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './form-radio-group.html',
  styleUrl: './form-radio-group.scss',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => FormRadioGroup),
      multi: true
    }
  ]
})
export class FormRadioGroup implements ControlValueAccessor {
  @Input() label: string = '';
  @Input() name: string = '';
  @Input() options: RadioOption[] = [];
  @Input() disabled: boolean = false;
  @Input() error: string = '';
  @Input() inline: boolean = false;

  value: string | number = '';

  // ControlValueAccessor implementation
  onChange: any = () => {};
  onTouched: any = () => {};

  writeValue(value: string | number): void {
    this.value = value || '';
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    this.disabled = isDisabled;
  }

  onRadioChange(event: Event): void {
    const target = event.target as HTMLInputElement;
    this.value = target.value;
    this.onChange(this.value);
    this.onTouched();
  }

  isChecked(optionValue: string | number): boolean {
    return this.value === optionValue;
  }

  get wrapperClasses(): string {
    let classes = 'form-radio-group';
    if (this.error) classes += ' form-radio-group--error';
    if (this.disabled) classes += ' form-radio-group--disabled';
    if (this.inline) classes += ' form-radio-group--inline';
    return classes;
  }
}
