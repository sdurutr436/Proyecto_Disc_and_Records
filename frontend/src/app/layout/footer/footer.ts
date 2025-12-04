import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Logo } from '../../shared/atoms/logo/logo';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [CommonModule, Logo],
  templateUrl: './footer.html',
  styleUrl: './footer.scss'
})
export class Footer {
  currentYear = new Date().getFullYear();
}
