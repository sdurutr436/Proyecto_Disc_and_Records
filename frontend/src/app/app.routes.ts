import { Routes } from '@angular/router';
import { authGuard, adminGuard } from './guards/auth.guard';
import { unsavedChangesGuard } from './guards/unsaved-changes.guard';

/**
 * Configuración de rutas con Lazy Loading y Guards
 *
 * LAZY LOADING:
 * - Todas las rutas usan loadComponent() para carga perezosa
 * - Los componentes se cargan solo cuando el usuario navega a esa ruta
 *
 * METADATA DE PRECARGA:
 * - preload: true -> Precarga con estrategia custom
 * - critical: true -> Precarga incluso en conexiones lentas
 * - delay: number -> Milisegundos a esperar antes de precargar
 *
 * GUARDS (Protección de rutas):
 * - authGuard: Requiere autenticación, redirige a home si no autenticado
 * - adminGuard: Requiere rol admin, debe aplicarse DESPUÉS de authGuard
 * - unsavedChangesGuard: Previene pérdida de datos en formularios
 *
 * CHUNKING:
 * - Angular automáticamente genera chunks separados por cada loadComponent
 * - Verifica en build: npm run build (ver lazy chunks)
 */
export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./pages/home/home').then(m => m.Home),
    title: 'Inicio - Discs & Records',
    data: { preload: true, critical: true } // ✅ Precarga inmediata - página principal
  },
  {
    path: 'search',
    loadComponent: () => import('./pages/search-results/search-results'),
    title: 'Resultados de Búsqueda - Discs & Records',
    data: { preload: true, critical: true, delay: 1000 } // ✅ Precarga con delay - función crítica
  },
  {
    path: 'profile',
    loadComponent: () => import('./pages/profile/profile'),
    title: 'Perfil de Usuario - Discs & Records',
    canActivate: [authGuard], // 🔒 Requiere autenticación
    data: { preload: true, critical: true, delay: 2000 }
  },
  {
    path: 'settings',
    loadComponent: () => import('./pages/settings/settings'),
    canActivate: [authGuard], // 🔒 Requiere autenticación
    data: { preload: true, delay: 3000 },
    children: [
      {
        path: '',
        redirectTo: 'profile',
        pathMatch: 'full'
      },
      {
        path: 'profile',
        loadComponent: () => import('./pages/settings/profile/profile'),
        title: 'Perfil - Ajustes',
        canDeactivate: [unsavedChangesGuard] // ⚠️ Protege formulario
      },
      {
        path: 'account',
        loadComponent: () => import('./pages/settings/account/account'),
        title: 'Cuenta - Ajustes',
        canDeactivate: [unsavedChangesGuard] // ⚠️ Protege formulario
      },
      {
        path: 'preferences',
        loadComponent: () => import('./pages/settings/preferences/preferences'),
        title: 'Preferencias - Ajustes',
        canDeactivate: [unsavedChangesGuard] // ⚠️ Protege formulario
      },
      {
        path: 'security',
        loadComponent: () => import('./pages/settings/security/security'),
        title: 'Seguridad - Ajustes',
        canDeactivate: [unsavedChangesGuard]
      }
    ]
  },
  {
    path: 'style-guide',
    loadComponent: () => import('./pages/style-guide/style-guide').then(m => m.StyleGuide),
    title: 'Guía de Estilo - Discs & Records'
    // ❌ Sin precarga - solo para desarrollo
  },
  {
    path: 'album/:id',
    loadComponent: () => import('./pages/detail/detail').then(m => m.DetailComponent),
    title: 'Detalle de Álbum - Discs & Records',
    data: { preload: true, critical: true, delay: 1500 } // ✅ Precarga - función principal
  },
  {
    path: 'artist/:id',
    loadComponent: () => import('./pages/detail/detail').then(m => m.DetailComponent),
    title: 'Detalle de Artista - Discs & Records',
    data: { preload: true, critical: true, delay: 1500 } // ✅ Precarga - función principal
  },
  {
    path: 'song/:id',
    loadComponent: () => import('./pages/detail/detail').then(m => m.DetailComponent),
    title: 'Detalle de Canción - Discs & Records',
    data: { preload: true, critical: true, delay: 1500 }
  },
  {
    path: 'admin',
    loadComponent: () => import('./pages/admin/admin'),
    title: 'Panel de Administración - Discs & Records',
    canActivate: [authGuard, adminGuard],
    data: { preload: false },
    children: [
      {
        path: '',
        redirectTo: 'albums',
        pathMatch: 'full'
      },
      {
        path: 'albums',
        loadComponent: () => import('./pages/admin/albums/albums'),
        title: 'Gestión de Álbumes - Admin'
      },
      {
        path: 'users',
        loadComponent: () => import('./pages/admin/users/users'),
        title: 'Gestión de Usuarios - Admin'
      },
      {
        path: 'genres',
        loadComponent: () => import('./pages/admin/genres/genres'),
        title: 'Gestión de Géneros - Admin'
      },
      {
        path: 'reviews',
        loadComponent: () => import('./pages/admin/reviews/reviews'),
        title: 'Moderación de Reseñas - Admin'
      }
    ]
  },
  {
    path: '404',
    loadComponent: () => import('./pages/not-found/not-found'),
    title: '404 - Página No Encontrada'
    // ❌ Sin precarga - página de error
  },
  {
    path: '**',
    loadComponent: () => import('./pages/not-found/not-found'),
    title: '404 - Página No Encontrada'
  }
];
