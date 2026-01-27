import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LucideAngularModule, CheckCircle, XCircle, AlertTriangle, Info } from 'lucide-angular';

@Component({
  selector: 'app-alert',
  standalone: true,
  imports: [CommonModule, LucideAngularModule],
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

  // Iconos Lucide
  readonly CheckCircle = CheckCircle;
  readonly XCircle = XCircle;
  readonly AlertTriangle = AlertTriangle;
  readonly Info = Info;

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

  get lucideIcon(): any {
    switch (this.type) {
      case 'success': return this.CheckCircle;
      case 'error': return this.XCircle;
      case 'warning': return this.AlertTriangle;
      case 'info': return this.Info;
      default: return this.Info;
    }
  }

  get defaultIcon(): string {
    // Fallback emoji si Lucide falla
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

