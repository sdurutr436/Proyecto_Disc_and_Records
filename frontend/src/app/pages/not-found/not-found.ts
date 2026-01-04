import { Component, OnInit, signal } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { Button } from '../../components/shared/button/button';

interface QuickLink {
  label: string;
  icon: string;
  route: string;
  description: string;
}

@Component({
  selector: 'app-not-found',
  standalone: true,
  imports: [CommonModule, Button],
  templateUrl: './not-found.html',
  styleUrls: ['./not-found.scss']
})
export default class NotFoundComponent implements OnInit {
  // Mensajes simples y directos
  private errorMessages = [
    'Página no encontrada',
    'Esta página no existe',
    'No encontramos lo que buscas',
    'Ruta no disponible'
  ];

  private errorSubtitles = [
    'La página que intentas visitar no está disponible',
    'Verifica la URL o regresa a la página principal',
    'Puede que la página haya sido movida o eliminada',
    'Utiliza las opciones de abajo para continuar navegando'
  ];

  currentMessage = signal<string>('');
  currentSubtitle = signal<string>('');

  // SVG icons para enlaces rápidos
  private readonly icons = {
    home: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path><polyline points="9 22 9 12 15 12 15 22"></polyline></svg>',
    search: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="11" cy="11" r="8"></circle><path d="m21 21-4.35-4.35"></path></svg>',
    user: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"></path><circle cx="12" cy="7" r="4"></circle></svg>',
    palette: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="13.5" cy="6.5" r=".5"></circle><circle cx="17.5" cy="10.5" r=".5"></circle><circle cx="8.5" cy="7.5" r=".5"></circle><circle cx="6.5" cy="12.5" r=".5"></circle><path d="M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10c.926 0 1.648-.746 1.648-1.688 0-.437-.18-.835-.437-1.125-.29-.289-.438-.652-.438-1.125a1.64 1.64 0 0 1 1.668-1.668h1.996c3.051 0 5.555-2.503 5.555-5.554C21.965 6.012 17.461 2 12 2z"></path></svg>'
  };

  // Enlaces rápidos para ayudar al usuario
  quickLinks: QuickLink[] = [
    {
      label: 'Inicio',
      icon: this.icons.home,
      route: '/',
      description: 'Volver a la página principal'
    },
    {
      label: 'Buscar',
      icon: this.icons.search,
      route: '/search',
      description: 'Buscar álbumes y artistas'
    },
    {
      label: 'Mi Perfil',
      icon: this.icons.user,
      route: '/profile',
      description: 'Ver mi perfil y reseñas'
    },
    {
      label: 'Guía de Estilo',
      icon: this.icons.palette,
      route: '/style-guide',
      description: 'Ver componentes y diseño'
    }
  ];

  constructor(private router: Router) {}

  ngOnInit(): void {
    // Seleccionar mensaje aleatorio
    const randomMessage = this.errorMessages[Math.floor(Math.random() * this.errorMessages.length)];
    const randomSubtitle = this.errorSubtitles[Math.floor(Math.random() * this.errorSubtitles.length)];

    this.currentMessage.set(randomMessage);
    this.currentSubtitle.set(randomSubtitle);
  }

  navigateTo(route: string): void {
    this.router.navigate([route]);
  }

  goBack(): void {
    window.history.back();
  }
}
