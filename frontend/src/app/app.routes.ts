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
    path: 'settings',
    loadComponent: () => import('./pages/settings/settings'),
    title: 'Ajustes de Perfil - Discs & Records'
  },
  {
    path: 'style-guide',
    loadComponent: () => import('./pages/style-guide/style-guide').then(m => m.StyleGuide),
    title: 'Guía de Estilo - Discs & Records'
  },
  {
    path: 'album/:id',
    loadComponent: () => import('./pages/detail/detail').then(m => m.DetailComponent),
    title: 'Detalle de Álbum - Discs & Records'
  },
  {
    path: 'artist/:id',
    loadComponent: () => import('./pages/detail/detail').then(m => m.DetailComponent),
    title: 'Detalle de Artista - Discs & Records'
  },
  {
    path: 'song/:id',
    loadComponent: () => import('./pages/detail/detail').then(m => m.DetailComponent),
    title: 'Detalle de Canción - Discs & Records'
  },
  {
    path: 'admin',
    loadComponent: () => import('./pages/admin/admin'),
    title: 'Panel de Administración - Discs & Records'
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
