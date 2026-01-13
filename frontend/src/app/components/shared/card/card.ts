import { Component, Input, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
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
  imports: [CommonModule, LucideAngularModule],
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

  // Acciones y badges
  @Input() actions: CardAction[] = [];
  @Input() badges: string[] = [];

  // Links para variante polaroid
  @Input() titleLink: string = '';
  @Input() subtitleLink: string = '';

  get cardClasses(): string {
    const classes = ['card'];

    if (this.variant === 'vinilo') {
      classes.push('card--vinilo');
    }

    if (this.hoverEffect === 'lift') {
      classes.push('card--hover-lift');
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
