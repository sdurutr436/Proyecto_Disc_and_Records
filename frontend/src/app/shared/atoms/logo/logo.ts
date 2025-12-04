import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-logo',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './logo.html',
  styleUrl: './logo.scss'
})
export class Logo {
  @Input() size: 'small' | 'medium' | 'large' = 'medium';
  @Input() linkTo: string = '/';
  @Input() altText: string = 'Discs & Records - Ir al inicio';
  @Input() showFullText: boolean = true;
}
