import { Component, Input, Output, EventEmitter, inject, OnInit, OnDestroy, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoadingService } from '../../../services/loading';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-button',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './button.html',
  styleUrl: './button.scss',
})
export class Button implements OnInit, OnDestroy {
  private loadingService = inject(LoadingService);
  private subscription?: Subscription;

  @Input() variant: 'primary' | 'secondary' | 'ghost' | 'danger' = 'primary';
  @Input() size: 'sm' | 'md' | 'lg' = 'md';
  @Input() disabled: boolean = false;
  @Input() type: 'button' | 'submit' | 'reset' = 'button';
  @Input() href?: string;
  @Input() fullWidth: boolean = false;

  /**
   * Estado de carga local del botón
   * Si es true, muestra spinner y deshabilita el botón
   */
  @Input() loading: boolean = false;

  /**
   * ID para vincular con LoadingService
   * Si se proporciona, el botón usa el estado del servicio
   */
  @Input() loadingId?: string;

  @Output() clicked = new EventEmitter<Event>();

  /** Estado interno de loading cuando se usa loadingId */
  private serviceLoading = signal(false);

  ngOnInit(): void {
    if (this.loadingId) {
      this.subscription = this.loadingService.localStates$.subscribe((states) => {
        this.serviceLoading.set(states.get(this.loadingId!) ?? false);
      });
    }
  }

  ngOnDestroy(): void {
    this.subscription?.unsubscribe();
  }

  onClick(event: Event): void {
    if (!this.isDisabled) {
      this.clicked.emit(event);
    }
  }

  get isLink(): boolean {
    return !!this.href;
  }

  /**
   * Determina si el botón está en estado de carga
   */
  get isLoading(): boolean {
    if (this.loadingId) {
      return this.serviceLoading();
    }
    return this.loading;
  }

  /**
   * Determina si el botón debe estar deshabilitado
   */
  get isDisabled(): boolean {
    return this.disabled || this.isLoading;
  }

  get buttonClasses(): string {
    const classes = ['button'];

    classes.push(`button--${this.variant}`);
    classes.push(`button--${this.size}`);

    if (this.isDisabled) {
      classes.push('button--disabled');
    }

    if (this.isLoading) {
      classes.push('button--loading');
    }

    if (this.fullWidth) {
      classes.push('button--full-width');
    }

    return classes.join(' ');
  }
}
