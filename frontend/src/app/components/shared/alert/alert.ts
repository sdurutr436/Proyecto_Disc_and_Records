import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-alert',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './alert.html',
  styleUrl: './alert.scss',
})
export class Alert {
  @Input() type: 'success' | 'error' | 'warning' | 'info' = 'info';
  @Input() title: string = '';
  @Input() message: string = '';
  @Input() icon: string = '';
  @Input() dismissible: boolean = false;
  @Output() dismissed = new EventEmitter<void>();

  isVisible: boolean = true;

  onDismiss(): void {
    this.isVisible = false;
    this.dismissed.emit();
  }

  get alertClasses(): string {
    let classes = 'alert';
    classes += ` alert--${this.type}`;
    if (!this.isVisible) classes += ' alert--hidden';
    return classes;
  }

  get defaultIcon(): string {
    if (this.icon) return this.icon;

    switch (this.type) {
      case 'success': return '✓';
      case 'error': return '✕';
      case 'warning': return '⚠';
      case 'info': return 'ℹ';
      default: return 'ℹ';
    }
  }
}

