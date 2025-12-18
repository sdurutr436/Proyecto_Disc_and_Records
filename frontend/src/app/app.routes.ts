import { Routes } from '@angular/router';
import { authGuard } from './guards/auth.guard';
import { unsavedChangesGuard } from './guards/unsaved-changes.guard';
import { albumResolver, albumsListResolver } from './resolvers/album.resolver';

/**
 * CONFIGURACIÓN DE RUTAS - FASE 4
 *
 * ESTRUCTURA:
 * - Rutas principales (home, albums, about, style-guide)
 * - Rutas con parámetros (/albums/:id)
 * - Rutas hijas anidadas (albums con children)
 * - Lazy loading para optimización
 * - Guards para protección (authGuard, unsavedChangesGuard)
 * - Resolvers para precarga de datos
 * - Data para breadcrumbs dinámicos
 * - Ruta wildcard 404 al final
 *
 * LAZY LOADING:
 * Todas las rutas usan loadComponent() para cargar componentes bajo demanda.
 * Esto divide el bundle en chunks más pequeños, mejorando el tiempo de carga inicial.
 *
 * GUARDS:
 * - authGuard: Verifica autenticación antes de permitir acceso
 * - unsavedChangesGuard: Previene navegación con cambios sin guardar
 *
 * RESOLVERS:
 * - albumResolver: Precarga datos de un álbum específico
 * - albumsListResolver: Precarga lista de álbumes
 *
 * BREADCRUMBS:
 * La propiedad 'data.breadcrumb' se usa para generar breadcrumbs automáticamente
 */

export const routes: Routes = [
  // ==========================================
  // RUTA PRINCIPAL - HOME
  // ==========================================
  {
    path: '',
    loadComponent: () => import('./pages/home/home').then(m => m.Home),
    title: 'Inicio - Discs & Records',
    data: { breadcrumb: 'Inicio' }
  },

  // ==========================================
  // RUTAS DE ÁLBUMES (CON LAZY LOADING)
  // ==========================================
  {
    path: 'albums',
    data: { breadcrumb: 'Álbumes' },
    children: [
      // Lista de álbumes
      {
        path: '',
        loadComponent: () => import('./pages/albums/album-list/album-list').then(m => m.AlbumList),
        title: 'Catálogo de Álbumes - Discs & Records',
        resolve: {
          albums: albumsListResolver // Precarga lista de álbumes
        }
      },

      // Crear nuevo álbum (protegido con authGuard)
      {
        path: 'new',
        loadComponent: () => import('./pages/albums/album-form/album-form').then(m => m.AlbumForm),
        title: 'Nuevo Álbum - Discs & Records',
        canActivate: [authGuard], // Requiere autenticación
        canDeactivate: [unsavedChangesGuard], // Previene salir con cambios sin guardar
        data: { breadcrumb: 'Nuevo Álbum' }
      },

      // Detalle de álbum con parámetro :id
      {
        path: ':id',
        loadComponent: () => import('./pages/albums/album-detail/album-detail').then(m => m.AlbumDetail),
        title: 'Detalle de Álbum - Discs & Records',
        resolve: {
          album: albumResolver // Precarga datos del álbum
        },
        data: { breadcrumb: 'Detalle' }
      },

      // Editar álbum (protegido con authGuard)
      {
        path: ':id/edit',
        loadComponent: () => import('./pages/albums/album-form/album-form').then(m => m.AlbumForm),
        title: 'Editar Álbum - Discs & Records',
        canActivate: [authGuard], // Requiere autenticación
        canDeactivate: [unsavedChangesGuard], // Previene salir con cambios sin guardar
        data: { breadcrumb: 'Editar' }
      }
    ]
  },

  // ==========================================
  // RUTA ABOUT
  // ==========================================
  {
    path: 'about',
    loadComponent: () => import('./pages/about/about').then(m => m.About),
    title: 'Sobre Nosotros - Discs & Records',
    data: { breadcrumb: 'Sobre Nosotros' }
  },

  // ==========================================
  // RUTA STYLE GUIDE (GUÍA DE ESTILO)
  // ==========================================
  {
    path: 'style-guide',
    loadComponent: () => import('./pages/style-guide/style-guide').then(m => m.StyleGuide),
    title: 'Guía de Estilo - Discs & Records',
    data: { breadcrumb: 'Guía de Estilo' }
  },

  // ==========================================
  // RUTA 404 - NOT FOUND
  // Debe ir al final para que no capture otras rutas
  // ==========================================
  {
    path: '404',
    loadComponent: () => import('./pages/not-found/not-found').then(m => m.NotFound),
    title: '404 - Página No Encontrada - Discs & Records'
  },

  // ==========================================
  // WILDCARD - REDIRIGE A 404
  // Captura cualquier ruta no definida
  // ==========================================
  {
    path: '**',
    redirectTo: '/404'
  }
];
