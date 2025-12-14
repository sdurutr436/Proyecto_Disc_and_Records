import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-button',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './button.html',
  styleUrl: './button.scss',
})
export class Button {
  @Input() variant: 'primary' | 'secondary' | 'ghost' | 'danger' = 'primary';
  @Input() size: 'sm' | 'md' | 'lg' = 'md';
  @Input() disabled: boolean = false;
  @Input() type: 'button' | 'submit' | 'reset' = 'button';
  @Input() href?: string; // Si se proporciona, se renderiza como enlace
  @Input() fullWidth: boolean = false;

  @Output() clicked = new EventEmitter<Event>();

  onClick(event: Event): void {
    if (!this.disabled) {
      this.clicked.emit(event);
    }
  }

  get isLink(): boolean {
    return !!this.href;
  }

  get buttonClasses(): string {
    const classes = ['button'];

    classes.push(`button--${this.variant}`);
    classes.push(`button--${this.size}`);

    if (this.disabled) {
      classes.push('button--disabled');
    }

    if (this.fullWidth) {
      classes.push('button--full-width');
    }

    return classes.join(' ');
  }
}
