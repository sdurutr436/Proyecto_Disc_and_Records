import { Component, Input, inject } from '@angular/core';
import { CommonModule, NgOptimizedImage } from '@angular/common';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { LucideAngularModule } from 'lucide-angular';


// Interfaz para las acciones de los botones
export interface CardAction {
  label: string;
  icon?: string; // SVG o emoji
  variant: 'primary' | 'secondary' | 'contrast' | 'accent';
  callback?: () => void;
}

@Component({
  selector: 'app-card',
  imports: [CommonModule, LucideAngularModule, NgOptimizedImage],
  templateUrl: './card.html',
  styleUrl: './card.scss',
})
export class Card {
  private sanitizer = inject(DomSanitizer);

  // Contenido
  @Input() title: string = '';
  @Input() subtitle: string = '';
  @Input() imageUrl: string = '';
  @Input() imageAlt: string = '';
  @Input() placeholderIcon: string = ''; // SVG string for custom placeholder

  // Optimización de imágenes: prioridad alta para LCP
  @Input() priority: boolean = false;

  // Getter para sanitizar el SVG
  get safePlaceholderIcon(): SafeHtml {
    return this.sanitizer.bypassSecurityTrustHtml(this.placeholderIcon);
  }

  // Configuración de imagen
  @Input() imageShape: 'square' | 'circle' = 'square';
  @Input() imageSize: 'small' | 'medium' | 'large' = 'medium';

  // Variantes de diseño
  @Input() variant: 'normal' | 'vinilo' = 'normal';
  @Input() hoverEffect: 'none' | 'lift' = 'lift';
  @Input() layout: 'vertical' | 'horizontal' = 'vertical';

  // Tipo de card
  @Input() cardType: 'polaroid' | 'profile' = 'polaroid';

  // Tamaño de card: normal (default) o mini (versión compacta para listados)
  @Input() size: 'normal' | 'mini' = 'normal';

  // Acciones y badges
  @Input() actions: CardAction[] = [];
  @Input() badges: string[] = [];

  // Links para variante polaroid
  @Input() titleLink: string = '';
  @Input() subtitleLink: string = '';

  /**
   * ID único para cada card, usado para accesibilidad (aria-describedby)
   * Vincula la imagen con su descripción textual (H45 WCAG)
   */
  cardId: string = 'card-desc-' + Math.random().toString(36).substr(2, 9);

  get cardClasses(): string {
    const classes = ['card'];

    if (this.variant === 'vinilo') {
      classes.push('card--vinilo');
    }

    if (this.hoverEffect === 'lift') {
      classes.push('card--hover-lift');
    }

    if (this.size === 'mini') {
      classes.push('card--mini');
    }

    classes.push(`card--${this.cardType}`);
    classes.push(`card--${this.layout}`);

    return classes.join(' ');
  }

  get imageClasses(): string {
    const classes = ['card__image'];
    classes.push(`card__image--${this.imageShape}`);
    classes.push(`card__image--${this.imageSize}`);
    return classes.join(' ');
  }

  onActionClick(action: CardAction, event: Event): void {
    event.preventDefault();
    event.stopPropagation();
    if (action.callback) {
      action.callback();
    }
  }
}
