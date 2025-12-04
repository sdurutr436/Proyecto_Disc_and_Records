import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthGroup } from '../../shared/molecules/auth-group/auth-group';
import { NavBar, NavItem } from '../../shared/molecules/nav-bar/nav-bar';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, AuthGroup, NavBar],
  templateUrl: './header.html',
  styleUrl: './header.scss'
})
export class Header {
  navItems: NavItem[] = [
    { label: 'Inicio', route: '/' },
    { label: 'Álbumes', route: '/albumes' },
    { label: 'Canciones', route: '/canciones' },
    { label: 'Artistas', route: '/artistas' },
    { label: 'Mi Colección', route: '/coleccion' }
  ];
}
