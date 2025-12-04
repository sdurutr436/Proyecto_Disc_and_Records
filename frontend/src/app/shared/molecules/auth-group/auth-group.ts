import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { Logo } from '../../atoms/logo/logo';

@Component({
  selector: 'app-auth-group',
  standalone: true,
  imports: [CommonModule, RouterLink, Logo],
  templateUrl: './auth-group.html',
  styleUrl: './auth-group.scss'
})
export class AuthGroup {}
