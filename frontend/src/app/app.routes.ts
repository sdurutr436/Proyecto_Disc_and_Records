import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./pages/home/home').then(m => m.Home),
    title: 'Inicio - Discs & Records'
  },
  {
    path: 'search',
    loadComponent: () => import('./pages/search-results/search-results'),
    title: 'Resultados de Búsqueda - Discs & Records'
  },
  {
    path: 'profile',
    loadComponent: () => import('./pages/profile/profile'),
    title: 'Perfil de Usuario - Discs & Records'
  },
  {
    path: 'style-guide',
    loadComponent: () => import('./pages/style-guide/style-guide').then(m => m.StyleGuide),
    title: 'Guía de Estilo - Discs & Records'
  },
  {
    path: '404',
    loadComponent: () => import('./pages/not-found/not-found'),
    title: '404 - Página No Encontrada'
  },
  {
    path: '**',
    loadComponent: () => import('./pages/not-found/not-found'),
    title: '404 - Página No Encontrada'
  }
];
