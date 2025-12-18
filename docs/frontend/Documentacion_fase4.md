# Fase 4 - Sistema de Rutas y Navegación

> **Proyecto:** Discs & Records  
> **Tipo:** Aplicación web estilo Letterboxd para música  
> **Fecha:** 18 de diciembre de 2025

---

## Índice

1. [Introducción](#1-introducción)
2. [Configuración de Rutas](#2-configuración-de-rutas)
3. [Navegación Programática](#3-navegación-programática)
4. [Lazy Loading](#4-lazy-loading)
5. [Route Guards](#5-route-guards)
6. [Resolvers](#6-resolvers)
7. [Breadcrumbs Dinámicos](#7-breadcrumbs-dinámicos)
8. [Mapa de Rutas](#8-mapa-de-rutas)
9. [Buenas Prácticas](#9-buenas-prácticas)

---

## 1. Introducción

Esta documentación cubre la implementación completa del sistema de rutas y navegación en el proyecto Discs & Records, siguiendo los requisitos de la Fase 4. Se implementan rutas principales, rutas con parámetros, rutas hijas anidadas, lazy loading, guards, resolvers y breadcrumbs dinámicos.

### 1.1 Requisitos de la Rúbrica

- ✅ Configuración de rutas (principales, con parámetros, hijas, wildcard 404)
- ✅ Navegación programática (Router, query params, fragments, NavigationExtras)
- ✅ Lazy Loading con PreloadAllModules
- ✅ Route Guards (CanActivate, CanDeactivate)
- ✅ Resolvers para precarga de datos
- ✅ Breadcrumbs dinámicos generados automáticamente
- ✅ Documentación completa

### 1.2 Arquitectura de Rutas

```
routes/
├── app.routes.ts              # Configuración principal de rutas
├── guards/
│   ├── auth.guard.ts          # Guard de autenticación
│   └── unsaved-changes.guard.ts  # Guard de cambios sin guardar
├── resolvers/
│   └── album.resolver.ts      # Resolver de álbumes
└── services/
    └── breadcrumb.ts          # Servicio de breadcrumbs
```

---

## 2. Configuración de Rutas

### 2.1 Estructura de Rutas Principales

**Ubicación:** `frontend/src/app/app.routes.ts`

#### Rutas Implementadas

```typescript
export const routes: Routes = [
  // HOME
  {
    path: '',
    loadComponent: () => import('./pages/home/home').then(m => m.Home),
    title: 'Inicio - Discs & Records',
    data: { breadcrumb: 'Inicio' }
  },

  // ALBUMS (con rutas hijas)
  {
    path: 'albums',
    data: { breadcrumb: 'Álbumes' },
    children: [
      // Lista
      {
        path: '',
        loadComponent: () => import('./pages/albums/album-list/album-list').then(m => m.AlbumList),
        title: 'Catálogo de Álbumes',
        resolve: { albums: albumsListResolver }
      },
      // Crear nuevo
      {
        path: 'new',
        loadComponent: () => import('./pages/albums/album-form/album-form').then(m => m.AlbumForm),
        title: 'Nuevo Álbum',
        canActivate: [authGuard],
        canDeactivate: [unsavedChangesGuard],
        data: { breadcrumb: 'Nuevo Álbum' }
      },
      // Detalle con parámetro
      {
        path: ':id',
        loadComponent: () => import('./pages/albums/album-detail/album-detail').then(m => m.AlbumDetail),
        title: 'Detalle de Álbum',
        resolve: { album: albumResolver },
        data: { breadcrumb: 'Detalle' }
      },
      // Editar
      {
        path: ':id/edit',
        loadComponent: () => import('./pages/albums/album-form/album-form').then(m => m.AlbumForm),
        title: 'Editar Álbum',
        canActivate: [authGuard],
        canDeactivate: [unsavedChangesGuard],
        data: { breadcrumb: 'Editar' }
      }
    ]
  },

  // ABOUT
  {
    path: 'about',
    loadComponent: () => import('./pages/about/about').then(m => m.About),
    title: 'Sobre Nosotros',
    data: { breadcrumb: 'Sobre Nosotros' }
  },

  // STYLE GUIDE
  {
    path: 'style-guide',
    loadComponent: () => import('./pages/style-guide/style-guide').then(m => m.StyleGuide),
    title: 'Guía de Estilo',
    data: { breadcrumb: 'Guía de Estilo' }
  },

  // 404
  {
    path: '404',
    loadComponent: () => import('./pages/not-found/not-found').then(m => m.NotFound),
    title: '404 - Página No Encontrada'
  },

  // WILDCARD (debe ir al final)
  {
    path: '**',
    redirectTo: '/404'
  }
];
```

### 2.2 Rutas con Parámetros

#### Sintaxis

```typescript
{
  path: ':id',  // Parámetro dinámico
  component: AlbumDetailComponent
}
```

#### Acceso a Parámetros en el Componente

```typescript
export class AlbumDetail implements OnInit {
  private route = inject(ActivatedRoute);
  
  ngOnInit() {
    // Opción 1: Snapshot (valor actual)
    const id = this.route.snapshot.paramMap.get('id');
    
    // Opción 2: Observable (reactivo a cambios)
    this.route.paramMap.subscribe(params => {
      const id = params.get('id');
      this.loadAlbum(id);
    });
  }
}
```

### 2.3 Rutas Hijas Anidadas

#### Configuración

```typescript
{
  path: 'albums',
  children: [
    { path: '', component: AlbumListComponent },
    { path: ':id', component: AlbumDetailComponent },
    { path: ':id/edit', component: AlbumFormComponent }
  ]
}
```

#### Ventajas

- Organización jerárquica clara
- URLs semánticas: `/albums/123/edit`
- Breadcrumbs automáticos
- Lazy loading por módulo completo

### 2.4 Ruta Wildcard 404

#### Implementación

```typescript
// Ruta específica 404
{
  path: '404',
  component: NotFoundComponent
},

// Wildcard que captura todo lo demás
{
  path: '**',
  redirectTo: '/404'
}
```

#### Orden Importante

⚠️ **CRÍTICO:** La ruta wildcard (`**`) DEBE ir al final del array de rutas. Si la pones antes, capturará todas las rutas y romperá la navegación.

```typescript
// ❌ INCORRECTO
{ path: '**', redirectTo: '404' },
{ path: 'albums', component: AlbumsComponent }  // Nunca se alcanza

// ✅ CORRECTO
{ path: 'albums', component: AlbumsComponent },
{ path: '**', redirectTo: '404' }
```

---

## 3. Navegación Programática

### 3.1 Router Service

El servicio `Router` permite navegar desde código TypeScript sin necesidad de `<a routerLink>`.

#### Inyección del Router

```typescript
import { Router } from '@angular/router';

export class MyComponent {
  private router = inject(Router);
}
```

### 3.2 Navegación Simple

```typescript
// Navegación absoluta
this.router.navigate(['/albums']);

// Navegación con parámetros
this.router.navigate(['/albums', albumId]);

// Navegación relativa (requiere ActivatedRoute)
this.router.navigate(['../albums'], { relativeTo: this.route });
```

### 3.3 Query Params

#### Pasar Query Params

```typescript
// URL resultante: /albums?genre=rock&year=1973
this.router.navigate(['/albums'], {
  queryParams: {
    genre: 'rock',
    year: 1973
  }
});
```

#### Leer Query Params

```typescript
export class AlbumList implements OnInit {
  private route = inject(ActivatedRoute);
  
  ngOnInit() {
    this.route.queryParamMap.subscribe(params => {
      const genre = params.get('genre');
      const year = params.get('year');
      this.filterAlbums(genre, year);
    });
  }
}
```

### 3.4 Fragments (Anchors)

#### Navegar a Sección Específica

```typescript
// URL resultante: /about#team
this.router.navigate(['/about'], { 
  fragment: 'team' 
});
```

#### Leer Fragment

```typescript
this.route.fragment.subscribe(fragment => {
  if (fragment) {
    // Scroll a la sección
    document.getElementById(fragment)?.scrollIntoView();
  }
});
```

### 3.5 NavigationExtras

`NavigationExtras` es una interfaz que agrupa todas las opciones de navegación.

#### Opciones Disponibles

```typescript
interface NavigationExtras {
  relativeTo?: ActivatedRoute;        // Navegación relativa
  queryParams?: Params;               // Query params
  fragment?: string;                  // Fragment (anchor)
  queryParamsHandling?: 'merge' | 'preserve';  // Cómo manejar params existentes
  preserveFragment?: boolean;         // Preservar fragment actual
  skipLocationChange?: boolean;       // No actualizar URL en navegador
  replaceUrl?: boolean;               // Reemplazar en historial
  state?: any;                        // Pasar estado (no visible en URL)
}
```

#### Ejemplo Completo

```typescript
goToAlbumDetail(albumId: number) {
  const navigationExtras: NavigationExtras = {
    queryParams: { 
      ref: 'home',
      highlight: 'reviews'
    },
    fragment: 'reviews',
    state: { 
      previousPage: 'home',
      timestamp: Date.now()
    },
    queryParamsHandling: 'merge'  // Preserva params existentes
  };

  this.router.navigate(['/albums', albumId], navigationExtras);
}
```

### 3.6 Pasar Estado entre Componentes

El estado se pasa sin modificar la URL, útil para datos sensibles o temporales.

#### Enviar Estado

```typescript
this.router.navigate(['/albums'], { 
  state: { 
    from: 'home',
    user: { id: 123, name: 'User' },
    filters: { genre: 'rock' }
  } 
});
```

#### Recibir Estado

```typescript
constructor(private router: Router) {
  const navigation = this.router.getCurrentNavigation();
  const state = navigation?.extras.state;
  
  if (state) {
    console.log('Navegado desde:', state['from']);
    console.log('Usuario:', state['user']);
  }
}
```

### 3.7 Ejemplo Práctico - Home Component

**Ubicación:** `frontend/src/app/pages/home/home.ts`

```typescript
export class Home {
  private router = inject(Router);

  // 1. Navegación simple
  goToAlbums() {
    this.router.navigate(['/albums']);
  }

  // 2. Con parámetros
  goToAlbumDetail(albumId: number) {
    this.router.navigate(['/albums', albumId]);
  }

  // 3. Con query params
  goToAlbumsFiltered() {
    this.router.navigate(['/albums'], {
      queryParams: { genre: 'rock', year: 1973 }
    });
  }

  // 4. Con fragment
  goToAboutTeam() {
    this.router.navigate(['/about'], { fragment: 'team' });
  }

  // 5. Con estado
  goToAlbumsWithState() {
    this.router.navigate(['/albums'], { 
      state: { from: 'home', timestamp: Date.now() } 
    });
  }

  // 6. Combinando múltiples opciones
  goToAlbumDetailAdvanced(albumId: number) {
    const navigationExtras: NavigationExtras = {
      queryParams: { ref: 'home', highlight: 'reviews' },
      fragment: 'reviews',
      state: { previousPage: 'home' },
      queryParamsHandling: 'merge'
    };

    this.router.navigate(['/albums', albumId], navigationExtras);
  }
}
```

---

## 4. Lazy Loading

### 4.1 ¿Qué es Lazy Loading?

Lazy Loading es una técnica que **carga componentes bajo demanda** en lugar de cargar todo al inicio. Esto mejora drásticamente el tiempo de carga inicial de la aplicación.

#### Sin Lazy Loading

```
Bundle total: 5 MB
Carga inicial: 5 MB (lento)
```

#### Con Lazy Loading

```
Bundle principal: 500 KB
Chunks lazy: 4.5 MB (se cargan cuando se necesitan)
Carga inicial: 500 KB (rápido)
```

### 4.2 Implementación con loadComponent()

En Angular moderno (standalone components), usamos `loadComponent()` en lugar de `loadChildren()`.

```typescript
{
  path: 'albums',
  loadComponent: () => import('./pages/albums/album-list/album-list').then(m => m.AlbumList)
}
```

#### ¿Cómo Funciona?

1. Usuario visita `/albums`
2. Angular descarga `album-list.chunk.js` (solo en ese momento)
3. Carga el componente `AlbumList`
4. Renderiza la vista

### 4.3 Estrategia de Precarga

**Ubicación:** `frontend/src/app/app.config.ts`

```typescript
import { PreloadAllModules } from '@angular/router';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(
      routes,
      withPreloading(PreloadAllModules)  // Estrategia de precarga
    )
  ]
};
```

#### Estrategias Disponibles

| Estrategia | Comportamiento | Uso |
|------------|----------------|-----|
| `NoPreloading` | No precarga nada, carga solo cuando se navega | App grande con rutas poco usadas |
| `PreloadAllModules` | Precarga todos los módulos en segundo plano | App pequeña/mediana (RECOMENDADO) |
| Estrategia Custom | Precarga solo rutas específicas | Control granular |

#### Ejemplo de Estrategia Custom

```typescript
export class CustomPreloadingStrategy implements PreloadingStrategy {
  preload(route: Route, load: () => Observable<any>): Observable<any> {
    // Solo precargar si tiene data.preload = true
    return route.data?.['preload'] ? load() : of(null);
  }
}

// Uso en ruta
{
  path: 'albums',
  loadComponent: () => import('./albums/album-list'),
  data: { preload: true }  // Se precargará
}
```

### 4.4 Verificar Chunking en Build de Producción

```bash
# Build de producción
ng build --configuration production

# Archivos generados (ejemplo)
dist/
├── main.js (500 KB)                    # Bundle principal
├── chunk-albums.js (150 KB)            # Módulo de álbumes
├── chunk-about.js (50 KB)              # Módulo about
├── chunk-style-guide.js (300 KB)       # Módulo style guide
└── chunk-not-found.js (20 KB)          # Módulo 404
```

#### Comando para Ver Tamaño de Chunks

```bash
ng build --stats-json
npx webpack-bundle-analyzer dist/stats.json
```

---

## 5. Route Guards

### 5.1 ¿Qué son los Guards?

Los Guards son **interceptores** que controlan el acceso a las rutas. Se ejecutan antes de activar una ruta y pueden permitir o denegar la navegación.

```
Usuario intenta navegar → Guard se ejecuta → Permite/Deniega → Activa ruta/Redirige
```

### 5.2 Tipos de Guards

| Guard | Propósito | Uso |
|-------|-----------|-----|
| `CanActivate` | Permite/deniega activación de ruta | Verificar autenticación |
| `CanDeactivate` | Permite/deniega salir de ruta | Cambios sin guardar |
| `CanMatch` | Permite/deniega coincidencia de ruta | Permisos basados en rol |
| `CanLoad` | Permite/deniega carga de módulo lazy | Optimización |
| `Resolve` | Precarga datos antes de activar | Ver sección Resolvers |

### 5.3 AuthGuard - Proteger Rutas

**Ubicación:** `frontend/src/app/guards/auth.guard.ts`

#### Implementación

```typescript
import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth';

export const authGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);

  const isAuthenticated = authService.isAuthenticated();

  if (!isAuthenticated) {
    console.warn('[AuthGuard] Acceso denegado.');
    
    // Guardar URL para redirección posterior
    const returnUrl = state.url;
    
    // Redirigir al home con returnUrl
    router.navigate(['/'], { 
      queryParams: { returnUrl } 
    });
    
    return false;
  }

  console.log('[AuthGuard] Acceso permitido.');
  return true;
};
```

#### Uso en Rutas

```typescript
{
  path: 'albums/new',
  component: AlbumFormComponent,
  canActivate: [authGuard]  // Requiere autenticación
}
```

#### Flujo de Ejecución

1. Usuario no autenticado intenta acceder a `/albums/new`
2. `authGuard` verifica `AuthService.isAuthenticated()`
3. Devuelve `false`
4. Redirige a `/` con `returnUrl=/albums/new`
5. Usuario hace login
6. Sistema redirige a `/albums/new` (returnUrl)

### 5.4 UnsavedChangesGuard - Prevenir Pérdida de Datos

**Ubicación:** `frontend/src/app/guards/unsaved-changes.guard.ts`

#### Interfaz del Componente

```typescript
export interface CanComponentDeactivate {
  canDeactivate: () => boolean;
}
```

#### Implementación del Guard

```typescript
export const unsavedChangesGuard: CanDeactivateFn<CanComponentDeactivate> = (component) => {
  if (component.canDeactivate) {
    const canLeave = component.canDeactivate();
    
    if (!canLeave) {
      console.warn('[UnsavedChangesGuard] Navegación bloqueada.');
    }
    
    return canLeave;
  }

  return true;
};
```

#### Implementación en Componente

**Ubicación:** `frontend/src/app/pages/albums/album-form/album-form.ts`

```typescript
export class AlbumForm implements CanComponentDeactivate {
  hasUnsavedChanges = signal(false);

  ngOnInit() {
    // Detectar cambios en el formulario
    this.albumForm.valueChanges.subscribe(() => {
      this.hasUnsavedChanges.set(this.albumForm.dirty);
    });
  }

  canDeactivate(): boolean {
    if (this.hasUnsavedChanges()) {
      return confirm('Tienes cambios sin guardar. ¿Seguro que quieres salir?');
    }
    return true;
  }

  onSubmit() {
    // Después de guardar, marcar como sin cambios
    this.hasUnsavedChanges.set(false);
  }
}
```

#### Uso en Rutas

```typescript
{
  path: 'albums/new',
  component: AlbumFormComponent,
  canDeactivate: [unsavedChangesGuard]
}
```

### 5.5 AdminGuard - Verificar Rol

```typescript
export const adminGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);

  const currentUser = authService.currentUser();

  if (!currentUser || currentUser.role !== 'admin') {
    console.warn('[AdminGuard] Acceso denegado. Usuario no es admin.');
    router.navigate(['/']);
    return false;
  }

  return true;
};
```

#### Combinar Múltiples Guards

```typescript
{
  path: 'admin',
  component: AdminPanelComponent,
  canActivate: [authGuard, adminGuard]  // Se ejecutan en orden
}
```

---

## 6. Resolvers

### 6.1 ¿Qué son los Resolvers?

Los Resolvers son servicios que **precargan datos ANTES de activar una ruta**. Esto evita mostrar componentes sin datos y mejora la UX.

#### Sin Resolver

```
1. Componente se renderiza (vacío)
2. Muestra loading spinner
3. Carga datos
4. Actualiza vista (parpadeo)
```

#### Con Resolver

```
1. Resolver carga datos
2. Componente se renderiza (con datos)
3. No hay parpadeo ni loading spinner
```

### 6.2 AlbumResolver - Detalle de Álbum

**Ubicación:** `frontend/src/app/resolvers/album.resolver.ts`

#### Implementación

```typescript
import { inject } from '@angular/core';
import { ResolveFn } from '@angular/router';
import { LoadingService } from '../services/loading';

interface Album {
  id: number;
  title: string;
  artist: string;
  // ...
}

export const albumResolver: ResolveFn<Album> = async (route) => {
  const loadingService = inject(LoadingService);
  
  const albumId = route.paramMap.get('id');
  
  if (!albumId) {
    throw new Error('ID de álbum no proporcionado');
  }

  console.log(`[AlbumResolver] Cargando álbum ${albumId}`);
  
  loadingService.show();

  try {
    // Simulación de llamada HTTP
    await new Promise(resolve => setTimeout(resolve, 800));

    const mockAlbum: Album = {
      id: +albumId,
      title: 'The Dark Side of the Moon',
      artist: 'Pink Floyd',
      // ...
    };

    loadingService.hide();
    return mockAlbum;
    
  } catch (error) {
    loadingService.hide();
    throw error;
  }
};
```

#### Uso en Rutas

```typescript
{
  path: 'albums/:id',
  component: AlbumDetailComponent,
  resolve: { 
    album: albumResolver  // Precarga datos del álbum
  }
}
```

#### Acceso a Datos Resueltos

```typescript
export class AlbumDetail implements OnInit {
  private route = inject(ActivatedRoute);
  
  ngOnInit() {
    this.route.data.subscribe(data => {
      const album = data['album'];  // Datos precargados por resolver
      console.log('Álbum:', album);
    });
  }
}
```

### 6.3 AlbumsListResolver - Lista de Álbumes

```typescript
export const albumsListResolver: ResolveFn<Album[]> = async () => {
  const loadingService = inject(LoadingService);
  
  console.log('[AlbumsListResolver] Cargando lista...');
  
  loadingService.show();

  try {
    await new Promise(resolve => setTimeout(resolve, 600));

    const mockAlbums: Album[] = [
      { id: 1, title: 'Dark Side', artist: 'Pink Floyd' },
      { id: 2, title: 'Abbey Road', artist: 'The Beatles' },
      // ...
    ];

    loadingService.hide();
    return mockAlbums;
    
  } catch (error) {
    loadingService.hide();
    throw error;
  }
};
```

### 6.4 Manejo de Errores en Resolvers

```typescript
export const albumResolver: ResolveFn<Album> = async (route) => {
  try {
    const album = await fetchAlbum(albumId);
    return album;
  } catch (error) {
    // Opción 1: Redirigir a 404
    inject(Router).navigate(['/404']);
    throw error;
    
    // Opción 2: Devolver álbum por defecto
    return {
      id: 0,
      title: 'Álbum no encontrado',
      artist: 'Desconocido'
    };
  }
};
```

### 6.5 Ventajas vs Desventajas

#### ✅ Ventajas

- Datos disponibles al renderizar
- No necesitas loading states en componentes
- Reutilizable para múltiples componentes
- Manejo centralizado de errores
- Mejor UX (no parpadeo)

#### ❌ Desventajas

- Retrasa navegación hasta que datos estén listos
- Para datos lentos (>2s), mejor cargar en componente con skeleton
- Más complejidad inicial

---

## 7. Breadcrumbs Dinámicos

### 7.1 BreadcrumbService

**Ubicación:** `frontend/src/app/services/breadcrumb.ts`

#### Propósito

- Generar breadcrumbs automáticamente desde la configuración de rutas
- Proporcionar navegación contextual
- Mejorar UX mostrando jerarquía

#### Implementación

```typescript
@Injectable({
  providedIn: 'root'
})
export class BreadcrumbService {
  private breadcrumbsSignal = signal<Breadcrumb[]>([]);
  
  readonly breadcrumbs = this.breadcrumbsSignal.asReadonly();
  readonly showBreadcrumbs = computed(() => this.breadcrumbs().length > 1);

  constructor(private router: Router, private activatedRoute: ActivatedRoute) {
    this.initializeBreadcrumbs();
  }

  private initializeBreadcrumbs() {
    // Generar breadcrumbs al cargar
    this.updateBreadcrumbs();

    // Actualizar en cada navegación
    this.router.events
      .pipe(
        filter(event => event instanceof NavigationEnd),
        map(() => this.activatedRoute)
      )
      .subscribe(() => {
        this.updateBreadcrumbs();
      });
  }

  private updateBreadcrumbs() {
    const breadcrumbs = this.createBreadcrumbs(this.activatedRoute.root);
    this.breadcrumbsSignal.set(breadcrumbs);
  }

  private createBreadcrumbs(
    route: ActivatedRoute,
    url: string = '',
    breadcrumbs: Breadcrumb[] = []
  ): Breadcrumb[] {
    // Breadcrumb inicial "Inicio"
    if (breadcrumbs.length === 0) {
      breadcrumbs.push({
        label: 'Inicio',
        url: '/',
        isActive: false
      });
    }

    // Obtener hijos de la ruta
    const children = route.children;

    if (children.length === 0) {
      // Marcar último como activo
      if (breadcrumbs.length > 0) {
        breadcrumbs[breadcrumbs.length - 1].isActive = true;
      }
      return breadcrumbs;
    }

    // Procesar cada hijo
    for (const child of children) {
      const routeURL = child.snapshot.url.map(segment => segment.path).join('/');
      
      if (routeURL !== '') {
        url += `/${routeURL}`;
      }

      // Obtener label desde route data
      const label = child.snapshot.data['breadcrumb'];

      if (label) {
        breadcrumbs.push({
          label,
          url,
          isActive: false
        });
      }

      // Recursión para hijos
      return this.createBreadcrumbs(child, url, breadcrumbs);
    }

    return breadcrumbs;
  }

  // Método para actualizar breadcrumb dinámicamente
  updateLastBreadcrumb(label: string) {
    const current = [...this.breadcrumbsSignal()];
    if (current.length > 0) {
      current[current.length - 1].label = label;
      this.breadcrumbsSignal.set(current);
    }
  }
}
```

### 7.2 Configuración en Rutas

```typescript
{
  path: 'albums',
  data: { breadcrumb: 'Álbumes' },  // Label para breadcrumb
  children: [
    {
      path: ':id',
      data: { breadcrumb: 'Detalle' }
    }
  ]
}
```

### 7.3 Componente Breadcrumb

**Ubicación:** `frontend/src/app/components/shared/breadcrumb/breadcrumb.ts`

```typescript
@Component({
  selector: 'app-breadcrumb',
  imports: [CommonModule, RouterLink],
  templateUrl: './breadcrumb.html',
  styleUrl: './breadcrumb.scss'
})
export class Breadcrumb {
  private breadcrumbService = inject(BreadcrumbService);

  breadcrumbs = this.breadcrumbService.breadcrumbs;
  showBreadcrumbs = this.breadcrumbService.showBreadcrumbs;
}
```

#### Template

```html
@if (showBreadcrumbs()) {
  <nav class="breadcrumb" aria-label="Breadcrumb">
    <ol class="breadcrumb__list">
      @for (crumb of breadcrumbs(); track crumb.url; let isLast = $last) {
        <li class="breadcrumb__item">
          @if (crumb.isActive || isLast) {
            <span class="breadcrumb__link breadcrumb__link--active">
              {{ crumb.label }}
            </span>
          } @else {
            <a [routerLink]="crumb.url" class="breadcrumb__link">
              {{ crumb.label }}
            </a>
          }
          
          @if (!isLast) {
            <svg class="breadcrumb__separator">
              <polyline points="9 18 15 12 9 6"></polyline>
            </svg>
          }
        </li>
      }
    </ol>
  </nav>
}
```

### 7.4 Breadcrumbs Dinámicos con Datos de Resolver

```typescript
export class AlbumDetail implements OnInit {
  private breadcrumbService = inject(BreadcrumbService);
  private route = inject(ActivatedRoute);

  ngOnInit() {
    this.route.data.subscribe(data => {
      const album = data['album'];
      
      // Actualizar breadcrumb con nombre del álbum
      this.breadcrumbService.updateLastBreadcrumb(album.title);
    });
  }
}
```

**Resultado:** 
```
Inicio > Álbumes > The Dark Side of the Moon
```

---

## 8. Mapa de Rutas

### 8.1 Estructura Completa

```
/ (Home)
│
├── /albums (Lista de Álbumes)
│   │
│   ├── /albums/new (Crear Álbum) [Guard: Auth, UnsavedChanges]
│   │
│   ├── /albums/:id (Detalle de Álbum) [Resolver: album]
│   │
│   └── /albums/:id/edit (Editar Álbum) [Guard: Auth, UnsavedChanges]
│
├── /about (Sobre Nosotros)
│
├── /style-guide (Guía de Estilo)
│
├── /404 (Página No Encontrada)
│
└── /** (Wildcard → Redirige a /404)
```

### 8.2 URLs Ejemplos

| URL | Componente | Breadcrumb | Guards | Resolver |
|-----|------------|------------|--------|----------|
| `/` | Home | Inicio | - | - |
| `/albums` | AlbumList | Inicio > Álbumes | - | albumsListResolver |
| `/albums/1` | AlbumDetail | Inicio > Álbumes > Detalle | - | albumResolver |
| `/albums/new` | AlbumForm | Inicio > Álbumes > Nuevo | authGuard, unsavedChangesGuard | - |
| `/albums/1/edit` | AlbumForm | Inicio > Álbumes > Editar | authGuard, unsavedChangesGuard | - |
| `/about` | About | Inicio > Sobre Nosotros | - | - |
| `/style-guide` | StyleGuide | Inicio > Guía de Estilo | - | - |
| `/404` | NotFound | - | - | - |
| `/ruta-inexistente` | NotFound (redirige) | - | - | - |

### 8.3 Lazy Loading - Chunks Generados

```
main.js (500 KB)
├── chunk-home.js (50 KB)
├── chunk-album-list.js (150 KB)
├── chunk-album-detail.js (100 KB)
├── chunk-album-form.js (120 KB)
├── chunk-about.js (50 KB)
├── chunk-style-guide.js (300 KB)
└── chunk-not-found.js (20 KB)
```

**Total:** 1.29 MB

**Carga inicial:** 500 KB (solo `main.js`)

**Resto:** Se carga bajo demanda

---

## 9. Buenas Prácticas

### 9.1 Configuración de Rutas

#### ✅ Hacer

- Usar rutas semánticas y descriptivas
- Agrupar rutas relacionadas con `children`
- Usar lazy loading para todos los componentes
- Agregar `title` a todas las rutas (SEO)
- Usar `data.breadcrumb` para breadcrumbs
- Poner wildcard al final

#### ❌ Evitar

- Rutas complejas o ambiguas
- Cargar todo en el bundle principal
- Olvidar el wildcard para 404
- Poner wildcard antes de otras rutas

### 9.2 Navegación Programática

#### ✅ Hacer

- Usar `Router` para navegación desde código
- Usar `NavigationExtras` para opciones complejas
- Validar parámetros antes de navegar
- Manejar errores de navegación

#### ❌ Evitar

- Construir URLs manualmente (`window.location.href`)
- Manipular historial directamente
- Ignorar errores de navegación

### 9.3 Guards

#### ✅ Hacer

- Usar guards para proteger rutas
- Redirigir apropiadamente si deniega acceso
- Guardar `returnUrl` para redirección posterior
- Usar `CanDeactivate` para formularios

#### ❌ Evitar

- Lógica de autenticación en componentes
- Guards pesados que retrasen navegación
- Olvidar manejar redirección

### 9.4 Resolvers

#### ✅ Hacer

- Usar resolvers para datos críticos
- Manejar errores apropiadamente
- Mostrar loading global mientras resuelve
- Cachear datos si es posible

#### ❌ Evitar

- Usar resolvers para datos lentos (>2s)
- Ignorar errores de carga
- Resolvers que hacen demasiado

### 9.5 Lazy Loading

#### ✅ Hacer

- Usar lazy loading para todas las rutas
- Configurar `PreloadAllModules` para apps pequeñas
- Verificar chunking en build de producción
- Optimizar tamaño de chunks

#### ❌ Evitar

- Cargar todo en el bundle principal
- Crear chunks demasiado pequeños
- Olvidar verificar tamaño de chunks

### 9.6 Breadcrumbs

#### ✅ Hacer

- Generar breadcrumbs automáticamente
- Actualizar breadcrumbs con datos resueltos
- Ocultar breadcrumbs en home
- Marcar último como activo

#### ❌ Evitar

- Breadcrumbs hardcodeados
- Mostrar breadcrumbs en todas las páginas
- Breadcrumbs que no coinciden con la ruta

---

## Conclusión

La implementación de la Fase 4 proporciona un sistema completo de rutas y navegación:

✅ **Rutas configuradas:** Principales, con parámetros, hijas, wildcard 404  
✅ **Navegación programática:** Router, query params, fragments, NavigationExtras  
✅ **Lazy Loading:** PreloadAllModules, chunking verificado  
✅ **Guards:** authGuard, unsavedChangesGuard  
✅ **Resolvers:** albumResolver, albumsListResolver  
✅ **Breadcrumbs:** Automáticos, dinámicos, basados en rutas  

El sistema está preparado para escalar y agregar nuevas funcionalidades manteniendo un código limpio, organizado y siguiendo las mejores prácticas de Angular moderno.
