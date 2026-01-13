import { Routes } from '@angular/router';
import { authGuard, adminGuard } from './guards/auth.guard';
import { unsavedChangesGuard } from './guards/unsaved-changes.guard';
import { albumResolver, artistResolver, songResolver } from './resolvers';

/**
 * Configuración de rutas con Lazy Loading, Guards y Resolvers
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
 * RESOLVERS (Precarga de datos):
 * - albumResolver: Carga datos de álbum antes de mostrar página
 * - artistResolver: Carga datos de artista antes de mostrar página
 * - songResolver: Carga datos de canción antes de mostrar página
 * - Integran LoadingService para mostrar estado durante navegación
 * - Manejan errores y redirigen a 404 si el recurso no existe
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
    data: { preload: true, critical: true, delay: 1000, breadcrumb: 'Búsqueda' } // ✅ Precarga con delay - función crítica
  },
  {
    path: 'roadmap',
    loadComponent: () => import('./pages/roadmap/roadmap'),
    title: 'Próximamente - Discs & Records',
    data: { preload: false, breadcrumb: 'Próximamente' }
  },
  {
    path: 'info',
    loadComponent: () => import('./pages/info/info'),
    title: 'Información - Discs & Records',
    data: { preload: false, breadcrumb: 'Información' }
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
    data: { preload: true, delay: 3000, breadcrumb: 'Ajustes' },
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
        data: { breadcrumb: 'Mi Perfil' },
        canDeactivate: [unsavedChangesGuard] // ⚠️ Protege formulario
      },
      {
        path: 'account',
        loadComponent: () => import('./pages/settings/account/account'),
        title: 'Cuenta - Ajustes',
        data: { breadcrumb: 'Cuenta' },
        canDeactivate: [unsavedChangesGuard] // ⚠️ Protege formulario
      },
      {
        path: 'preferences',
        loadComponent: () => import('./pages/settings/preferences/preferences'),
        title: 'Preferencias - Ajustes',
        data: { breadcrumb: 'Preferencias' },
        canDeactivate: [unsavedChangesGuard] // ⚠️ Protege formulario
      },
      {
        path: 'security',
        loadComponent: () => import('./pages/settings/security/security'),
        title: 'Seguridad - Ajustes',
        data: { breadcrumb: 'Seguridad' },
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
    resolve: { album: albumResolver }, // 🔄 Precarga datos de álbum
    data: { preload: true, critical: true, delay: 1500 }
  },
  {
    path: 'artist/:id',
    loadComponent: () => import('./pages/detail/detail').then(m => m.DetailComponent),
    title: 'Detalle de Artista - Discs & Records',
    resolve: { artist: artistResolver }, // 🔄 Precarga datos de artista
    data: { preload: true, critical: true, delay: 1500 }
  },
  {
    path: 'song/:id',
    loadComponent: () => import('./pages/detail/detail').then(m => m.DetailComponent),
    title: 'Detalle de Canción - Discs & Records',
    resolve: { song: songResolver }, // 🔄 Precarga datos de canción
    data: { preload: true, critical: true, delay: 1500 }
  },
  {
    path: 'admin',
    loadComponent: () => import('./pages/admin/admin'),
    title: 'Panel de Administración - Discs & Records',
    canActivate: [authGuard, adminGuard],
    data: { preload: false, breadcrumb: 'Administración' },
    children: [
      {
        path: '',
        redirectTo: 'albums',
        pathMatch: 'full'
      },
      {
        path: 'albums',
        loadComponent: () => import('./pages/admin/albums/albums'),
        title: 'Gestión de Álbumes - Admin',
        data: { breadcrumb: 'Álbumes' }
      },
      {
        path: 'users',
        loadComponent: () => import('./pages/admin/users/users'),
        title: 'Gestión de Usuarios - Admin',
        data: { breadcrumb: 'Usuarios' }
      },
      {
        path: 'genres',
        loadComponent: () => import('./pages/admin/genres/genres'),
        title: 'Gestión de Géneros - Admin',
        data: { breadcrumb: 'Géneros' }
      },
      {
        path: 'reviews',
        loadComponent: () => import('./pages/admin/reviews/reviews'),
        title: 'Moderación de Reseñas - Admin',
        data: { breadcrumb: 'Reseñas' }
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
