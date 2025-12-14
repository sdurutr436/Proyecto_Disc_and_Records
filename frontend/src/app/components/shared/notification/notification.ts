import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-notification',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './notification.html',
  styleUrl: './notification.scss'
})
export class Notification implements OnInit {
  @Input() type: 'success' | 'error' | 'warning' | 'info' = 'info';
  @Input() title: string = '';
  @Input() message: string = '';
  @Input() icon: string = '';
  @Input() position: 'top-right' | 'top-left' | 'bottom-right' | 'bottom-left' = 'top-right';
  @Input() autoDismiss: boolean = true;
  @Input() duration: number = 5000; // 5 segundos por defecto
  @Output() dismissed = new EventEmitter<void>();

  isVisible: boolean = false;
  private timeoutId?: number;

  ngOnInit(): void {
    // Trigger animación de entrada
    setTimeout(() => {
      this.isVisible = true;
    }, 10);

    // Auto-dismiss si está activado
    if (this.autoDismiss) {
      this.timeoutId = window.setTimeout(() => {
        this.onDismiss();
      }, this.duration);
    }
  }

  onDismiss(): void {
    this.isVisible = false;

    // Esperar a que termine la animación antes de emitir
    setTimeout(() => {
      this.dismissed.emit();
      if (this.timeoutId) {
        clearTimeout(this.timeoutId);
      }
    }, 300); // Duración de la animación
  }

  get notificationClasses(): string {
    let classes = 'notification';
    classes += ` notification--${this.type}`;
    classes += ` notification--${this.position}`;
    if (this.isVisible) classes += ' notification--visible';
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
