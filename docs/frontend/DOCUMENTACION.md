# Documentación Técnica Frontend — Disc and Records

**Proyecto:** Disc and Records  \
**Versión:** 1.0  \
**Última actualización:** 15 de diciembre de 2025  \
**Responsable:** Sergio Durán  \

---

## Índice

- [1. Visión general](#1-visión-general)
- [2. Arquitectura](#2-arquitectura)
- [3. Patrones UI (eventos + DOM)](#3-patrones-ui-eventos--dom)
- [4. Componentes interactivos](#4-componentes-interactivos)
- [5. Servicios](#5-servicios)
  - [5.1 EventBusService](#51-eventbusservice)
  - [5.2 AppStateService](#52-appstateservice)
  - [5.3 NotificationStreamService](#53-notificationstreamservice)
  - [5.4 NotificationService](#54-notificationservice)
  - [5.5 ThemeService](#55-themeservice)
  - [5.6 ValidationService](#56-validationservice)
  - [5.7 AuthService](#57-authservice)
  - [5.8 LoadingService](#58-loadingservice)
- [6. Workflows clave](#6-workflows-clave)
- [7. Compatibilidad](#7-compatibilidad)
- [8. Buenas prácticas](#8-buenas-prácticas)

---

## 1. Visión general

Este frontend usa Angular Signals para estado reactivo, `@HostListener` para eventos globales, y `ViewChild/ElementRef` para acceso directo al DOM cuando es necesario.

Objetivos:
- Mantener componentes principalmente de presentación y mover lógica a servicios.
- Proveer comunicación desacoplada entre componentes no relacionados (eventos).
- Centralizar estado global (usuario, favoritos, búsqueda, preferencias) con persistencia.
- Unificar el feedback de acciones con notificaciones/toasts reutilizables.

---

## 2. Arquitectura

Arquitectura híbrida (según el tipo de problema):
- **Estado (state):** `AppStateService` + Angular Signals para “estado actual” y datos compartidos (persistentes).
- **Eventos (eventos puntuales):** `EventBusService` (RxJS) para comunicación desacoplada entre componentes sin relación directa.
- **Notificaciones (feedback UI):** `NotificationStreamService` → `NotificationService` (render).

Esquema general:

- **Eventos (RxJS)**
  - Componente A/B/C → `EventBusService` → componentes interesados
- **Estado (Signals + persistencia)**
  - Componentes → `AppStateService` → UI reactiva + `localStorage`
- **Notificaciones (stream + render)**
  - Componentes → `NotificationStreamService` → `NotificationService` → DOM (toasts)

### 2.1 Decisión rápida (qué usar)

- ¿Es un dato compartido y duradero (usuario, favoritos, preferencias, query)? → `AppStateService`.
- ¿Es un “suceso” puntual que otros deben reaccionar (se agregó favorito, se abrió modal)? → `EventBusService`.
- ¿Es feedback visual (success/error/warning/info)? → `NotificationStreamService` (y render con `NotificationService`).

---

## 3. Patrones UI (eventos + DOM)

### 3.1 Signals (estado reactivo en componentes)

Patrón típico:
- Input signal para controlar estado desde el padre.
- Signal interno para estado local.
- `effect()` para sincronizar señales y ejecutar efectos colaterales (p. ej. bloquear scroll).

Ejemplo (Modal):

```ts
export class Modal {
  isOpen = input<boolean>(false);
  isVisible = signal(false);
  onClose = output<void>();

  constructor() {
    effect(() => {
      if (this.isOpen()) this.open();
      else this.close();
    });
  }

  open() {
    this.isVisible.set(true);
    document.body.style.overflow = 'hidden';
  }

  close() {
    this.isVisible.set(false);
    document.body.style.overflow = '';
    this.onClose.emit();
  }
}
```

### 3.2 @HostListener (eventos globales)

Uso recomendado para:
- ESC para cerrar modales/menú móvil.
- Click fuera para cerrar overlays.
- Flechas para navegar tabs.

Ejemplo:

```ts
@HostListener('document:keydown.escape')
onEscapeKey() {
  if (this.isVisible()) this.close();
}
```

### 3.3 Control de eventos (preventDefault / stopPropagation)

- `preventDefault()`: evitar comportamiento por defecto (p. ej. Tab trap en modal).
- `stopPropagation()`: evitar que un click “suba” a un contenedor con handlers.

Ejemplo (acciones en card):

```ts
onActionClick(action: CardAction, event: Event): void {
  event.preventDefault();
  event.stopPropagation();
  action.callback?.();
}
```

### 3.4 ViewChild/ElementRef (DOM puntual)

Usar solo cuando:
- Necesitas scroll programático/mediciones.
- Estás integrando lógica de UI no trivial.
- Creas componentes dinámicos (toasts).

Ejemplo (Carousel):

```ts
@ViewChild('carouselTrack') carouselTrack!: ElementRef<HTMLDivElement>;

scrollRight(): void {
  this.carouselTrack.nativeElement.scrollBy({ left: 200, behavior: 'smooth' });
}
```

---

## 4. Componentes interactivos

### 4.1 Modal

Características:
- Cierre con ESC.
- Cierre al hacer click en overlay.
- Trap focus (Tab/Shift+Tab).
- Bloqueo de scroll del body cuando está abierto.

Flujo resumido (apertura/cierre):
- Padre cambia `isOpen(true/false)`.
- `effect()` abre/cierra.
- ESC dispara `@HostListener` → `close()` → emite `onClose`.

### 4.2 Accordion

Características:
- Modo **single**: solo un item abierto.
- Modo **multiple**: varios items abiertos.
- Estado con Signal (Set de IDs).

### 4.3 Tabs

Características:
- Navegación con flechas izquierda/derecha.
- Soporte para tabs deshabilitados.
- Estado activo con Signal.

### 4.4 Tooltip

Características:
- Hover con delay configurable.
- Ocultación con delay configurable.
- Posicionamiento dinámico (top/bottom/left/right).

---

## 5. Servicios

## 5.1 EventBusService

### Descripción

Implementa Publisher–Subscriber con RxJS para comunicación desacoplada entre componentes no relacionados (sin cadenas de `@Input/@Output`).

### Tipos de eventos

Ejemplo de enum:

```ts
export enum EventType {
  // Autenticación
  USER_LOGIN = 'USER_LOGIN',
  USER_LOGOUT = 'USER_LOGOUT',
  USER_PROFILE_UPDATED = 'USER_PROFILE_UPDATED',

  // Búsqueda
  SEARCH_QUERY_CHANGED = 'SEARCH_QUERY_CHANGED',
  SEARCH_RESULTS_READY = 'SEARCH_RESULTS_READY',

  // Álbumes
  ALBUM_ADDED_TO_FAVORITES = 'ALBUM_ADDED_TO_FAVORITES',
  ALBUM_REMOVED_FROM_FAVORITES = 'ALBUM_REMOVED_FROM_FAVORITES',
  ALBUM_RATED = 'ALBUM_RATED',

  // UI
  MODAL_OPENED = 'MODAL_OPENED',
  MODAL_CLOSED = 'MODAL_CLOSED',
  SIDEBAR_TOGGLED = 'SIDEBAR_TOGGLED',
}
```

### Contrato de evento

```ts
interface AppEvent<T = any> {
  type: EventType;
  payload?: T;
  timestamp: number;
  source?: string;
}
```

### API pública

Emitir:

```ts
eventBus.emit({
  type: EventType.ALBUM_ADDED_TO_FAVORITES,
  payload: { albumId: 123, albumTitle: 'Dark Side of the Moon' },
  source: 'AlbumDetailComponent',
  timestamp: Date.now(),
});
```

Escuchar un tipo:

```ts
this.sub = eventBus
  .on(EventType.ALBUM_ADDED_TO_FAVORITES)
  .subscribe(event => {
    this.updateFavoritesCounter();
  });
```

Escuchar múltiples tipos:

```ts
this.sub = eventBus
  .onMultiple([
    EventType.ALBUM_ADDED_TO_FAVORITES,
    EventType.ALBUM_REMOVED_FROM_FAVORITES
  ])
  .subscribe(() => this.refreshFavoritesList());
```

### Buenas prácticas (EventBus)

- Unsubscribe en `ngOnDestroy` (crítico).
- No usar EventBus para estado (para eso AppState).
- Mantener payloads tipados (evitar `any` en código de negocio).
- Usar `source` solo para debugging (no como lógica de negocio).

---

## 5.2 AppStateService

### Descripción

Gestor de estado global con Angular Signals + persistencia en `localStorage` mediante `effect()`.

### Estado gestionado (ejemplo)

- Autenticación: `currentUser`, `isAuthenticated`, `userName`
- Búsqueda: `searchQuery`, `searchResults`, `isSearching`
- Favoritos: `favorites`, `favoriteIds`, `favoritesCount`
- UI: `sidebarOpen`, `loading`
- Preferencias: `userPreferences`

### API pública (resumen)

Autenticación:
- `setUser(user: User)`
- `logout()`
- `updateUser(updates: Partial<User>)`

Favoritos:
- `addToFavorites(album: Album)`
- `removeFromFavorites(albumId: number)`
- `isFavorite(albumId: number): boolean`
- `clearFavorites()`

Búsqueda:
- `startSearch(query: string)`
- `setSearchResults(results: SearchResult)`
- `clearSearch()`

Preferencias:
- `updatePreferences(updates: Partial<UserPreferences>)`

### Ejemplo completo (Header con AppStateService)

```ts
import { Component, computed, inject } from '@angular/core';
import { AppStateService } from '@services/app-state';

export class HeaderComponent {
  private appState = inject(AppStateService);

  // Computed se actualiza automáticamente cuando cambia currentUser()
  userName = computed(() => this.appState.currentUser()?.username ?? 'Guest');

  // Signals expuestos por el estado global
  isAuthenticated = this.appState.isAuthenticated;
  favoritesCount = this.appState.favoritesCount;

  onLogout() {
    this.appState.logout();
  }
}
```

```html
<!-- Template se actualiza automáticamente -->
<header>
  @if (isAuthenticated()) {
    <span>Hola, {{ userName() }}</span>
    <span>Favoritos: {{ favoritesCount() }}</span>
    <button (click)="onLogout()">Cerrar sesión</button>
  } @else {
    <a href="/login">Iniciar sesión</a>
  }
</header>
```

#### Signals vs BehaviorSubject (cuándo preferir)

- **Signals**: estado “actual” (no stream), computed nativos, menos boilerplate.
- **RxJS (BehaviorSubject/Observables)**: streams/eventos, composición compleja, o pipelines async.

---

## 5.3 NotificationStreamService

### Descripción

Stream para emitir notificaciones desde cualquier componente de forma desacoplada.

### API típica

- `notify(config)`
- `success(title, message, duration?)`
- `error(title, message, duration?)`
- `warning(title, message, duration?)`
- `info(title, message, duration?)`

### Ejemplo

```ts
notificationStream.success(
  'Guardado',
  'Los cambios se guardaron correctamente'
);
```

---

## 5.4 NotificationService

### Descripción

Renderiza toasts creando componentes dinámicamente y gestionando su ciclo de vida (`attachView` / `detachView` / `destroy`).

### Puntos clave

- `createComponent(Notification)`
- `setInput(...)` para configurar type/title/message/etc.
- Insertar en DOM (p. ej. `document.body.appendChild`)
- Escuchar `dismissed` → limpiar DOM y destruir componente

---

## 5.5 ThemeService

### Descripción

Gestiona tema claro/oscuro con Signal y persistencia.

- Detecta preferencia del sistema (`prefers-color-scheme`).
- Si hay tema guardado en `localStorage`, lo respeta.
- Aplica un atributo (p. ej. `data-theme`) para activar variables CSS.

### Ejemplo de aplicación

- dark → `document.documentElement.setAttribute('data-theme', 'dark')`
- light → `document.documentElement.removeAttribute('data-theme')`

---

## 5.6 ValidationService

### Descripción

Centraliza validaciones para eliminar duplicación y mantener reglas consistentes.

Incluye típicamente:
- `validateEmail`
- `validatePassword`
- `validateUsername`
- Validación de formularios completos (login/register)

---

## 5.7 AuthService

### Descripción

Centraliza autenticación:
- login / logout / register
- gestión de token
- coordinación con AppState (user, isAuthenticated)
- (opcional) emisión de eventos (EventBus) y notificaciones (NotificationStream)

---

## 5.8 LoadingService

### Descripción

Centraliza estados de carga:
- Loading global (overlay)
- Loading local (por id: botones/componentes)
- (opcional) progreso 0–100 para progress bar

Ejemplo (loading local):

```ts
await this.loadingService.withLocalLoading(
  'save-btn',
  this.albumService.save(album)
);
```

---

## 6. Workflows clave

### 6.1 Agregar álbum a favoritos

Flujo recomendado:
1) UI dispara acción (toggle favorito).
2) `AppStateService.addToFavorites/removeFromFavorites`:
   - actualiza signals (UI reacciona)
   - persiste en localStorage (effect)
3) `EventBusService.emit(ALBUM_ADDED_TO_FAVORITES / ALBUM_REMOVED_FROM_FAVORITES)`:
   - otros componentes reaccionan (contadores, listados, etc.)
4) `NotificationStreamService.success/info`:
   - feedback visual inmediato

### 6.2 Login de usuario

Flujo recomendado:
1) LoginComponent valida con `ValidationService`.
2) `AuthService.login`:
   - persiste token (si aplica)
   - actualiza `AppState.setUser(...)`
3) (Opcional) EventBus emit `USER_LOGIN`.
4) Notification success/error.

---

## 7. Compatibilidad

Orientado a navegadores modernos:
- Angular Signals: Chrome/Edge/Firefox actuales y Safari moderno.
- `@HostListener`, `ViewChild/ElementRef`, `matchMedia`, `localStorage`: soporte amplio en navegadores actuales.

Nota: objetivo = últimas 2 versiones de navegadores principales.

---

## 8. Buenas prácticas

### 8.1 Accesibilidad

- Soporte de teclado (tabs con flechas, modales con ESC).
- Trap focus en modales.
- ARIA labels en botones cuando aplique.
- Asegurar orden de tabulación y foco visible.

### 8.2 Performance

- Preferir Signals para estado local y global.
- Debounce/throttle en eventos frecuentes (scroll/resize) si se usan.
- Lazy loading en partes pesadas cuando aplique.
- Limpiar listeners/suscripciones en ngOnDestroy (especialmente RxJS).

### 8.3 Mantenibilidad

- Separación de responsabilidades (componentes vs servicios).
- DRY: validaciones centralizadas y servicios reutilizables.
- Tipado estricto en payloads/eventos/modelos.
- Naming consistente y estructura de carpetas clara.