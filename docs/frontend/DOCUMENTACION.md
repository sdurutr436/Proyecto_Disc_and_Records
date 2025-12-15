# Documentación Técnica Frontend - Disc and Records

**Proyecto:** Disc and Records  
**Última actualización:** 15 de diciembre de 2025  
**Versión:** 1.0

---

## Índice General

### Bloque 1: Fundamentos y Funcionalidad Core

#### Fase 1: Manipulación del DOM y Eventos
1.1 [Resumen Ejecutivo](#resumen-ejecutivo)
1.2 [Patterns Implementados](#patterns-implementados)
1.3 [Diagramas de Flujo](#diagramas-de-flujo)
1.4 [Sistema de Eventos](#sistema-de-eventos)
1.5 [Manipulación del DOM](#manipulación-del-dom)
1.6 [Componentes Interactivos](#componentes-interactivos)
1.7 [Gestión de Estado](#gestión-de-estado)
1.8 [Ejemplos de Código](#ejemplos-de-código)
1.9 [Compatibilidad de Navegadores](#compatibilidad-de-navegadores)
1.10 [Best Practices](#best-practices-implementadas)

#### Fase 2: Componentes Interactivos y Comunicación
2.1 [Servicios de Comunicación](#servicios-de-comunicación)
2.2 [EventBusService - Comunicación entre Componentes](#eventbusservice)
2.3 [AppStateService - Estado Global](#appstateservice)
2.4 [NotificationStreamService - Patrón Observable](#notificationstreamservice)
2.5 [Workflows de Comunicación](#workflows-de-comunicación)
2.6 [Patrones de Uso](#patrones-de-uso)
2.7 [Separación de Responsabilidades](#27-separación-de-responsabilidades)
2.8 [Sistema de Notificaciones/Toasts](#28-sistema-de-notificacionestoasts)

#### Fase 3: [Título Fase 3]
*Pendiente de implementación*

#### Fase 4: [Título Fase 4]
*Pendiente de implementación*

#### Fase 5: [Título Fase 5]
*Pendiente de implementación*

---

# Sección 1: Manipulación del DOM y Eventos

## Resumen Ejecutivo

El proyecto implementa una arquitectura moderna de eventos basada en Angular Signals para gestión de estado reactivo, @HostListener para eventos globales, y ViewChild/ElementRef para acceso directo al DOM.

### Características clave:
- Sistema de eventos reactivo con Angular Signals
- Manipulación directa del DOM cuando es necesario
- Componentes interactivos accesibles (teclado, mouse, touch)
- Gestión avanzada de eventos (preventDefault, stopPropagation)
- Theme switcher con persistencia en localStorage

---

## Patterns Implementados

### 1. **Signal-Based State Management**

Usamos Angular Signals para estado reactivo en lugar de propiedades tradicionales con change detection.

**Ventajas:**
- Reactividad automática
- Mejor rendimiento
- Código más declarativo
- Fácil de testear

**Ejemplo en Modal:**
```typescript
export class Modal {
  isOpen = input<boolean>(false);  // Input signal
  isVisible = signal(false);       // Signal interno

  constructor() {
    effect(() => {
      if (this.isOpen()) {
        this.open();
      }
    });
  }
}
```

### 2. **@HostListener for Global Events**

Para eventos que afectan a todo el documento (ESC, click fuera, resize).

**Ejemplo en Header:**
```typescript
export class Header {
  @HostListener('document:keydown.escape')
  onEscapeKey() {
    if (this.isMenuOpen()) {
      this.closeMenu();
    }
  }

  @HostListener('document:click', ['$event'])
  onDocumentClick(event: MouseEvent) {
    const target = event.target as HTMLElement;
    if (!target.closest('.header-nav__mobile')) {
      this.closeMenu();
    }
  }
}
```

### 3. ViewChild/ElementRef for DOM Access

Para acceder y manipular elementos del DOM cuando sea necesario.

**Ejemplo en Carousel:**
```typescript
export class Carousel {
  @ViewChild('carouselTrack') carouselTrack!: ElementRef<HTMLDivElement>;

  scrollRight(): void {
    const track = this.carouselTrack.nativeElement;
    track.scrollBy({ left: scrollAmount, behavior: 'smooth' });
  }
}
```

---

## Diagramas de Flujo

### Flujo 1: Modal - Apertura y Cierre con ESC

```
┌─────────────────────────────────────────────────────┐
│ Usuario: Hace clic en botón "Abrir Modal"          │
└────────────────┬────────────────────────────────────┘
                 ↓
┌─────────────────────────────────────────────────────┐
│ Componente Padre: Cambia signal isOpen(true)       │
└────────────────┬────────────────────────────────────┘
                 ↓
┌─────────────────────────────────────────────────────┐
│ Modal: effect() detecta cambio en isOpen()         │
└────────────────┬────────────────────────────────────┘
                 ↓
┌─────────────────────────────────────────────────────┐
│ Modal: Llama a open()                               │
│ • isVisible.set(true)                               │
│ • document.body.style.overflow = 'hidden'           │
└────────────────┬────────────────────────────────────┘
                 ↓
┌─────────────────────────────────────────────────────┐
│ Template: Muestra modal con overlay                 │
└─────────────────────────────────────────────────────┘
                 
                 
┌─────────────────────────────────────────────────────┐
│ Usuario: Presiona tecla ESC                         │
└────────────────┬────────────────────────────────────┘
                 ↓
┌─────────────────────────────────────────────────────┐
│ @HostListener: Detecta 'document:keydown.escape'   │
└────────────────┬────────────────────────────────────┘
                 ↓
┌─────────────────────────────────────────────────────┐
│ Modal: onEscapeKey() ejecuta                        │
│ • Verifica if (isVisible())                         │
└────────────────┬────────────────────────────────────┘
                 ↓
┌─────────────────────────────────────────────────────┐
│ Modal: Llama a close()                              │
│ • isVisible.set(false)                              │
│ • document.body.style.overflow = ''                 │
│ • onClose.emit()                                    │
└────────────────┬────────────────────────────────────┘
                 ↓
┌─────────────────────────────────────────────────────┐
│ Template: Oculta modal automáticamente              │
└─────────────────────────────────────────────────────┘
```

### Flujo 2: Theme Switcher - Detección y Aplicación

```
┌─────────────────────────────────────────────────────┐
│ Aplicación: Se inicia (constructor ThemeService)   │
└────────────────┬────────────────────────────────────┘
                 ↓
┌─────────────────────────────────────────────────────┐
│ ThemeService: Llama a loadTheme()                   │
└────────────────┬────────────────────────────────────┘
                 ↓
┌─────────────────────────────────────────────────────┐
│ ThemeService: Busca en localStorage                 │
│ ¿Hay tema guardado?                                 │
└────────┬────────────────────────┬───────────────────┘
         │ Sí                     │ No
         ↓                        ↓
┌────────────────┐      ┌─────────────────────────────┐
│ Usa tema       │      │ Detecta preferencia sistema │
│ guardado       │      │ matchMedia(prefers-dark)    │
└────────┬───────┘      └────────┬────────────────────┘
         │                       │
         └───────────┬───────────┘
                     ↓
┌─────────────────────────────────────────────────────┐
│ ThemeService: setTheme(theme)                       │
│ • currentTheme.set(theme)                           │
│ • applyTheme(theme)                                 │
└────────────────┬────────────────────────────────────┘
                 ↓
┌─────────────────────────────────────────────────────┐
│ DOM: Aplica data-theme al <html>                    │
│ • document.documentElement.setAttribute(...)        │
└────────────────┬────────────────────────────────────┘
                 ↓
┌─────────────────────────────────────────────────────┐
│ CSS: Variables cambian automáticamente              │
│ html[data-theme="dark"] { --color-... }             │
└─────────────────────────────────────────────────────┘


┌─────────────────────────────────────────────────────┐
│ Usuario: Hace clic en botón toggle tema            │
└────────────────┬────────────────────────────────────┘
                 ↓
┌─────────────────────────────────────────────────────┐
│ Header: toggleTheme()                               │
└────────────────┬────────────────────────────────────┘
                 ↓
┌─────────────────────────────────────────────────────┐
│ ThemeService: toggleTheme()                         │
│ • Calcula nuevo tema (light ↔ dark)                │
│ • setTheme(newTheme)                                │
│ • saveToLocalStorage(newTheme)                      │
└────────────────┬────────────────────────────────────┘
                 ↓
┌─────────────────────────────────────────────────────┐
│ Signal: currentTheme() actualizado                  │
└────────────────┬────────────────────────────────────┘
                 ↓
┌─────────────────────────────────────────────────────┐
│ Template Header: Icono cambia automáticamente       │
│ *ngIf="themeService.currentTheme() === 'light'"    │
└─────────────────────────────────────────────────────┘
```

### Flujo 3: NotificationService - Creación Dinámica en DOM

```
┌─────────────────────────────────────────────────────┐
│ Componente: Llama a notificationService.show()     │
└────────────────┬────────────────────────────────────┘
                 ↓
┌─────────────────────────────────────────────────────┐
│ NotificationService: createComponent()              │
│ • Crea instancia de Notification                    │
└────────────────┬────────────────────────────────────┘
                 ↓
┌─────────────────────────────────────────────────────┐
│ NotificationService: Configura inputs              │
│ • componentRef.setInput('type', ...)                │
│ • componentRef.setInput('title', ...)               │
│ • componentRef.setInput('message', ...)             │
└────────────────┬────────────────────────────────────┘
                 ↓
┌─────────────────────────────────────────────────────┐
│ NotificationService: Suscribe a evento dismissed   │
│ • componentRef.instance.dismissed.subscribe()       │
└────────────────┬────────────────────────────────────┘
                 ↓
┌─────────────────────────────────────────────────────┐
│ Angular: Añade al árbol de change detection        │
│ • appRef.attachView(componentRef.hostView)          │
└────────────────┬────────────────────────────────────┘
                 ↓
┌─────────────────────────────────────────────────────┐
│ DOM: Inserta elemento HTML                          │
│ • document.body.appendChild(domElem)                │
└────────────────┬────────────────────────────────────┘
                 ↓
┌─────────────────────────────────────────────────────┐
│ Pantalla: Notificación aparece con animación       │
└─────────────────────────────────────────────────────┘


┌─────────────────────────────────────────────────────┐
│ Usuario: Hace clic en botón X o timeout vence      │
└────────────────┬────────────────────────────────────┘
                 ↓
┌─────────────────────────────────────────────────────┐
│ Notification: dismissed.emit()                      │
└────────────────┬────────────────────────────────────┘
                 ↓
┌─────────────────────────────────────────────────────┐
│ NotificationService: remove(componentRef)           │
└────────────────┬────────────────────────────────────┘
                 ↓
┌─────────────────────────────────────────────────────┐
│ DOM: Elimina elemento HTML                          │
│ • domElem.parentNode.removeChild(domElem)           │
└────────────────┬────────────────────────────────────┘
                 ↓
┌─────────────────────────────────────────────────────┐
│ Angular: Limpia referencias                         │
│ • appRef.detachView(componentRef.hostView)          │
│ • componentRef.destroy()                            │
└────────────────┬────────────────────────────────────┘
                 ↓
┌─────────────────────────────────────────────────────┐
│ Pantalla: Notificación desaparece                   │
└─────────────────────────────────────────────────────┘
```

---

## Sistema de Eventos

### Event Binding en Templates

Usamos la sintaxis de Angular para binding de eventos:

```html
<!-- Click events -->
<button (click)="openModal()">Abrir</button>

<!-- Keyboard events -->
<input (keydown.enter)="onSubmit()" />

<!-- Mouse events -->
<div (mouseenter)="showTooltip()" (mouseleave)="hideTooltip()"></div>

<!-- Custom events -->
<app-modal (onClose)="closeModal()"></app-modal>
```

### Prevención de Comportamientos Por Defecto

**Caso de uso:** Trap focus en Modal

```typescript
@HostListener('keydown', ['$event'])
onKeydown(event: KeyboardEvent) {
  if (event.key === 'Tab') {
    event.preventDefault();  // ⚠️ Prevenir navegación normal
    // Lógica personalizada de navegación
  }
}
```

### Detención de Propagación

**Caso de uso:** Acciones en Cards

```typescript
onActionClick(action: CardAction, event: Event): void {
  event.preventDefault();       // No navegar si es un link
  event.stopPropagation();      // No activar eventos del card padre
  action.callback?.();
}
```

### Eventos de Teclado Globales

Implementados en componentes que requieren cerrar con ESC:

- **Modal:** ESC cierra el modal
- **Header (menú móvil):** ESC cierra el menú
- **Tabs:** Flechas izquierda/derecha navegan entre tabs

---

## Manipulación del DOM

### 1. Acceso con ViewChild

```typescript
@ViewChild('carouselTrack') carouselTrack!: ElementRef<HTMLDivElement>;

ngAfterViewInit() {
  const element = this.carouselTrack.nativeElement;
  // Ahora podemos manipular el elemento
}
```

### 2. Modificación de Estilos Dinámicos

**Ejemplo:** Modificar estilos del carousel programáticamente

```typescript
toggleHighlight(): void {
  const track = this.carouselTrack.nativeElement;
  
  // MANIPULACIÓN DIRECTA: modificar estilos
  if (track.style.boxShadow === '') {
    track.style.boxShadow = '0 0 20px rgba(255, 215, 0, 0.6)';
    track.style.border = '2px solid gold';
    track.style.transition = 'all 0.3s ease';
  } else {
    track.style.boxShadow = '';
    track.style.border = '';
  }
}

setOpacity(value: number): void {
  this.carouselTrack.nativeElement.style.opacity = value.toString();
}
```

### 3. Creación Dinámica de Componentes

**NotificationService:** Crea y destruye componentes en el DOM

```typescript
@Injectable({ providedIn: 'root' })
export class NotificationService {
  show(config: NotificationConfig): void {
    // 1. Crear componente dinámicamente
    const componentRef = createComponent(Notification, {
      environmentInjector: this.injector,
    });

    // 2. Configurar inputs
    componentRef.setInput('type', config.type);
    componentRef.setInput('title', config.title);

    // 3. Añadir al árbol de Angular
    this.appRef.attachView(componentRef.hostView);

    // 4. MANIPULACIÓN DIRECTA: appendChild al DOM
    const domElem = (componentRef.hostView as any).rootNodes[0];
    document.body.appendChild(domElem);
  }

  private remove(componentRef: ComponentRef<Notification>): void {
    const domElem = (componentRef.hostView as any).rootNodes[0];
    
    // MANIPULACIÓN DIRECTA: removeChild del DOM
    if (domElem?.parentNode) {
      domElem.parentNode.removeChild(domElem);
    }
    
    this.appRef.detachView(componentRef.hostView);
    componentRef.destroy();
  }
}
```

---

## Componentes Interactivos

### Modal

**Características:**
- Cierre con ESC
- Cierre al hacer click en overlay
- Trap focus (Tab/Shift+Tab)
- Previene scroll del body cuando está abierto

**Eventos manejados:**
- `keydown.escape`: Cierra el modal
- `keydown` (Tab): Mantiene el focus dentro del modal
- `click` en overlay: Cierra el modal

### Accordion

**Características:**
- Modo single: Solo un item abierto
- Modo multiple: Varios items abiertos
- Estado en Signal (Set de IDs)

**Lógica:**
```typescript
toggle(itemId: string | number) {
  const currentOpen = new Set(this.openItems());
  
  if (currentOpen.has(itemId)) {
    currentOpen.delete(itemId);
  } else {
    if (this.mode() === 'single') {
      currentOpen.clear();  // Cerrar todos en modo single
    }
    currentOpen.add(itemId);
  }
  
  this.openItems.set(currentOpen);
}
```

### Tabs

**Características:**
- Navegación con flechas del teclado
- Soporte para tabs deshabilitados
- Estado activo con signal

**Eventos:**
```typescript
@HostListener('keydown.arrowleft')
onArrowLeft() {
  this.navigateTabs(-1);
}

@HostListener('keydown.arrowright')
onArrowRight() {
  this.navigateTabs(1);
}
```

### Tooltip

**Características:**
- Aparece al hover con delay configurable
- Desaparece al salir
- Posicionamiento dinámico (top/bottom/left/right)

**Eventos:**
```typescript
@HostListener('mouseenter')
onMouseEnter() {
  this.showTimeout = setTimeout(() => {
    this.isVisible.set(true);
  }, this.showDelay());
}

@HostListener('mouseleave')
onMouseLeave() {
  this.hideTimeout = setTimeout(() => {
    this.isVisible.set(false);
  }, this.hideDelay());
}
```

---

## Gestión de Estado

### ThemeService

Servicio global para gestión del tema (claro/oscuro):

```typescript
@Injectable({ providedIn: 'root' })
export class ThemeService {
  currentTheme = signal<Theme>('light');

  constructor() {
    this.loadTheme();
  }

  detectSystemPreference(): Theme {
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)');
    return prefersDark.matches ? 'dark' : 'light';
  }

  loadTheme(): void {
    const savedTheme = localStorage.getItem('app-theme');
    
    if (savedTheme) {
      this.setTheme(savedTheme as Theme);
    } else {
      this.setTheme(this.detectSystemPreference());
    }

    // Escuchar cambios del sistema
    window.matchMedia('(prefers-color-scheme: dark)')
      .addEventListener('change', (e) => {
        if (!localStorage.getItem('app-theme')) {
          this.setTheme(e.matches ? 'dark' : 'light');
        }
      });
  }

  toggleTheme(): void {
    const newTheme = this.currentTheme() === 'light' ? 'dark' : 'light';
    this.setTheme(newTheme);
    localStorage.setItem('app-theme', newTheme);
  }

  private applyTheme(theme: Theme): void {
    if (theme === 'dark') {
      document.documentElement.setAttribute('data-theme', 'dark');
    } else {
      document.documentElement.removeAttribute('data-theme');
    }
  }
}
```

**Uso en componentes:**
```typescript
export class Header {
  themeService = inject(ThemeService);

  toggleTheme() {
    this.themeService.toggleTheme();
  }
}
```

**En template:**
```html
<button (click)="toggleTheme()">
  <svg *ngIf="themeService.currentTheme() === 'light'">
    <!-- Icono de sol -->
  </svg>
  <svg *ngIf="themeService.currentTheme() === 'dark'">
    <!-- Icono de luna -->
  </svg>
</button>
```

---

## Ejemplos de Código

### Ejemplo Completo: Modal con Todos los Patterns

```typescript
import { Component, signal, input, output, HostListener, effect } from '@angular/core';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.html',
})
export class Modal {
  // PATTERN: Input/Output Signals
  isOpen = input<boolean>(false);
  title = input<string>('');
  onClose = output<void>();

  // PATTERN: Internal Signal
  isVisible = signal(false);

  constructor() {
    // PATTERN: Effect para sincronizar signals
    effect(() => {
      if (this.isOpen()) {
        this.open();
      } else {
        this.close();
      }
    });
  }

  open() {
    this.isVisible.set(true);
    // PATTERN: Manipulación DOM directa
    document.body.style.overflow = 'hidden';
  }

  close() {
    this.isVisible.set(false);
    document.body.style.overflow = '';
    this.onClose.emit();
  }

  // PATTERN: @HostListener para evento global
  @HostListener('document:keydown.escape')
  onEscapeKey() {
    if (this.isVisible()) {
      this.close();
    }
  }

  // PATTERN: Prevención de propagación
  onOverlayClick(event: MouseEvent) {
    const target = event.target as HTMLElement;
    if (target.classList.contains('modal__overlay')) {
      this.close();
    }
  }

  // PATTERN: preventDefault para Tab trap
  @HostListener('keydown', ['$event'])
  onKeydown(event: KeyboardEvent) {
    if (event.key !== 'Tab') return;

    const focusableElements = this.getFocusableElements();
    const first = focusableElements[0];
    const last = focusableElements[focusableElements.length - 1];

    if (event.shiftKey && document.activeElement === first) {
      event.preventDefault();
      last?.focus();
    } else if (!event.shiftKey && document.activeElement === last) {
      event.preventDefault();
      first?.focus();
    }
  }
}
```

---

## Compatibilidad de Navegadores

| Característica | Chrome | Firefox | Safari | Edge |
|----------------|--------|---------|--------|------|
| Angular Signals | ✅ 119+ | ✅ 119+ | ✅ 17+ | ✅ 119+ |
| @HostListener | ✅ Todos | ✅ Todos | ✅ Todos | ✅ Todos |
| ViewChild/ElementRef | ✅ Todos | ✅ Todos | ✅ Todos | ✅ Todos |
| matchMedia | ✅ Todos | ✅ Todos | ✅ Todos | ✅ Todos |
| localStorage | ✅ Todos | ✅ Todos | ✅ Todos | ✅ Todos |
| createComponent | ✅ 14+ | ✅ 14+ | ✅ 14+ | ✅ 14+ |

**Nota:** Todas las características son compatibles con navegadores modernos (últimas 2 versiones).

---

## Best Practices Implementadas

### 1. Accesibilidad
- Navegación por teclado en todos los componentes
- Trap focus en modales
- Aria labels en botones
- ESC cierra elementos interactivos

### 2. Performance
- Signals en lugar de change detection tradicional
- Debounce/throttle en eventos frecuentes (scroll)
- Lazy loading de componentes pesados
- Cleanup de event listeners en ngOnDestroy

### 3. Mantenibilidad
- Separación de concerns (services vs components)
- Código DRY (servicios reutilizables)
- TypeScript estricto
- Naming conventions consistentes

---

## Conclusión Sección 1

Esta arquitectura de eventos proporciona una base sólida para aplicaciones Angular modernas, combinando lo mejor de:

- **Reactividad:** Con Angular Signals
- **Control:** Con acceso directo al DOM cuando es necesario
- **Accesibilidad:** Con soporte completo de teclado
- **Performance:** Con técnicas optimizadas

El código es escalable, mantenible y sigue las mejores prácticas de Angular 18+.

---

**Última actualización:** 15 de diciembre de 2025  
**Responsable:** Sergio Durán  
**Estado:** Completado

---

# Sección 2: Componentes Interactivos y Comunicación

## Servicios de Comunicación

Esta sección documenta los servicios implementados para la comunicación entre componentes y gestión de estado global en la aplicación.

### Arquitectura de Comunicación

El proyecto implementa una arquitectura híbrida que combina:

1. **Angular Signals** para estado reactivo (AppStateService)
2. **RxJS Observables/Subjects** para comunicación basada en eventos (EventBusService)
3. **Patrón Publisher-Subscriber** para notificaciones (NotificationStreamService)

```
┌─────────────────────────────────────────────────────────────┐
│                    ARQUITECTURA GENERAL                      │
├─────────────────────────────────────────────────────────────┤
│                                                              │
│  Componente A          Componente B          Componente C   │
│       ↓                     ↓                     ↓          │
│       └─────────┬───────────┴──────────┬────────┘          │
│                 ↓                      ↓                     │
│         EventBusService        AppStateService              │
│         (Eventos)              (Estado)                     │
│                 ↓                      ↓                     │
│         RxJS Observables       Angular Signals              │
│                                                              │
│                 ↓                                           │
│         NotificationStreamService                           │
│         (Notificaciones)                                    │
│                 ↓                                           │
│         NotificationService                                 │
│         (Renderizado DOM)                                   │
└─────────────────────────────────────────────────────────────┘
```

---

## EventBusService

### Descripción

EventBusService implementa el patrón Publisher-Subscriber usando RxJS para permitir comunicación desacoplada entre componentes que no tienen relación directa padre-hijo.

### Características Principales

- Comunicación hermano-hermano sin cadenas de @Input/@Output
- Sistema de eventos tipado con enum EventType
- Filtrado de eventos por tipo
- Logging automático en desarrollo
- Estadísticas de suscripciones

### Tipos de Eventos Disponibles

```typescript
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

### Estructura de un Evento

```typescript
interface AppEvent<T = any> {
  type: EventType;          // Tipo del evento
  payload?: T;              // Datos asociados
  timestamp: number;        // Momento de emisión
  source?: string;          // Componente origen (opcional)
}
```

### Workflow - Emisión de Evento

```
┌─────────────────────────────────────────────────────────────┐
│ WORKFLOW: Emisión de Evento                                 │
└─────────────────────────────────────────────────────────────┘

Componente A                                    Componente B
    |                                                |
    | 1. emit(event)                                 |
    ↓                                                |
EventBusService                                      |
    |                                                |
    | 2. next() al Subject                           |
    ↓                                                |
Subject interno                                      |
    |                                                |
    | 3. Propaga a todos los observadores            |
    ↓                                                ↓
Observable stream ─────────────────────→  4. on(EventType).subscribe()
                                                    |
                                                    | 5. Ejecuta handler
                                                    ↓
                                          Actualiza UI / Ejecuta lógica
```

### API Pública

#### emit(event: AppEvent)

Emite un evento en el bus.

```typescript
// Ejemplo: Notificar que se agregó un álbum a favoritos
eventBus.emit({
  type: EventType.ALBUM_ADDED_TO_FAVORITES,
  payload: { albumId: 123, albumTitle: 'Dark Side of the Moon' },
  source: 'AlbumDetailComponent'
});
```

#### on(eventType: EventType): Observable

Suscribe a eventos de un tipo específico.

```typescript
// Ejemplo: Escuchar cuando se agregan álbumes a favoritos
this.subscription = eventBus
  .on(EventType.ALBUM_ADDED_TO_FAVORITES)
  .subscribe(event => {
    console.log('Álbum agregado:', event.payload.albumId);
    this.updateFavoritesCounter();
  });
```

#### onMultiple(eventTypes: EventType[]): Observable

Suscribe a múltiples tipos de eventos.

```typescript
// Ejemplo: Escuchar eventos relacionados con favoritos
eventBus
  .onMultiple([
    EventType.ALBUM_ADDED_TO_FAVORITES,
    EventType.ALBUM_REMOVED_FROM_FAVORITES
  ])
  .subscribe(event => {
    this.refreshFavoritesList();
  });
```

### Ejemplo Completo

```typescript
import { Component, OnInit, OnDestroy, inject } from '@angular/core';
import { EventBusService, EventType } from '@services/event-bus';
import { Subscription } from 'rxjs';

export class FavoritesCounterComponent implements OnInit, OnDestroy {
  private eventBus = inject(EventBusService);
  private subscription?: Subscription;
  
  count = signal(0);

  ngOnInit() {
    // Suscribirse a eventos de favoritos
    this.subscription = this.eventBus
      .onMultiple([
        EventType.ALBUM_ADDED_TO_FAVORITES,
        EventType.ALBUM_REMOVED_FROM_FAVORITES
      ])
      .subscribe(() => {
        this.updateCount();
      });
  }

  ngOnDestroy() {
    // CRÍTICO: Limpiar suscripción
    this.subscription?.unsubscribe();
  }

  private updateCount() {
    // Actualizar contador
    this.count.update(c => c + 1);
  }
}
```

### Buenas Prácticas

1. **Siempre hacer unsubscribe en ngOnDestroy** para evitar memory leaks
2. **Usar tipos específicos en payload** para type safety
3. **Incluir source en desarrollo** para facilitar debugging
4. **No abusar del EventBus** - para relaciones padre-hijo usar @Input/@Output
5. **Preferir AppStateService para estado persistente**

---

## AppStateService

### Descripción

AppStateService gestiona el estado global de la aplicación usando Angular Signals, proporcionando reactividad automática y persistencia en localStorage.

### Características Principales

- Estado reactivo con Angular Signals
- Persistencia automática en localStorage
- Computed signals para datos derivados
- Effects para sincronización automática
- API simple y type-safe

### Estado Gestionado

```typescript
// Autenticación
currentUser: Signal<User | null>
isAuthenticated: Signal<boolean>
userName: Signal<string>

// Búsqueda
searchQuery: Signal<string>
searchResults: Signal<SearchResult>
isSearching: Signal<boolean>

// Favoritos
favorites: Signal<Album[]>
favoriteIds: Signal<Set<number>>
favoritesCount: Signal<number>

// UI
sidebarOpen: Signal<boolean>
loading: Signal<boolean>

// Preferencias
userPreferences: Signal<UserPreferences>
```

### Workflow - Actualización de Estado

```
┌─────────────────────────────────────────────────────────────┐
│ WORKFLOW: Actualización de Estado Global                    │
└─────────────────────────────────────────────────────────────┘

Componente
    |
    | 1. setUser(user)
    ↓
AppStateService
    |
    | 2. currentUser.set(user)
    ↓
Signal actualizado
    |
    ├─→ 3a. effect() detecta cambio
    │       └─→ 4a. Persiste en localStorage
    │
    └─→ 3b. Todos los componentes suscritos
            └─→ 4b. Se actualizan automáticamente
```

### Workflow - Persistencia

```
┌─────────────────────────────────────────────────────────────┐
│ WORKFLOW: Persistencia Automática                           │
└─────────────────────────────────────────────────────────────┘

1. AppStateService se inicia
   ↓
2. constructor() ejecuta loadPersistedState()
   ↓
3. Lee localStorage
   ├─→ app-user
   ├─→ app-favorites
   └─→ app-preferences
   ↓
4. Actualiza signals con datos recuperados
   ↓
5. Establece effects() para cambios futuros
   ↓
6. Cuando un signal cambia:
   effect() → localStorage.setItem()
```

### API Pública

#### Autenticación

```typescript
// Establecer usuario
appState.setUser(user: User): void

// Cerrar sesión
appState.logout(): void

// Actualizar usuario
appState.updateUser(updates: Partial<User>): void
```

#### Favoritos

```typescript
// Agregar a favoritos
appState.addToFavorites(album: Album): void

// Remover de favoritos
appState.removeFromFavorites(albumId: number): void

// Verificar si está en favoritos
appState.isFavorite(albumId: number): boolean

// Limpiar favoritos
appState.clearFavorites(): void
```

#### Búsqueda

```typescript
// Iniciar búsqueda
appState.startSearch(query: string): void

// Establecer resultados
appState.setSearchResults(results: SearchResult): void

// Limpiar búsqueda
appState.clearSearch(): void
```

#### Preferencias

```typescript
// Actualizar preferencias
appState.updatePreferences(updates: Partial<UserPreferences>): void
```

### Ejemplo Completo

```typescript
import { Component, inject, computed } from '@angular/core';
import { AppStateService } from '@services/app-state';

export class HeaderComponent {
  private appState = inject(AppStateService);

  // Computed se actualiza automáticamente
  userName = computed(() => {
    const user = this.appState.currentUser();
    return user ? user.username : 'Guest';
  });

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

### Ventajas de Signals vs BehaviorSubject

| Característica | Signals | BehaviorSubject |
|----------------|---------|-----------------|
| Sintaxis | Más simple | Más verbose |
| Performance | Mejor | Bueno |
| Subscribe/Unsubscribe | No necesario | Requerido |
| Computed values | Nativo | Requiere pipe |
| Change detection | Optimizado | Estándar |

---

## NotificationStreamService

### Descripción

NotificationStreamService implementa el patrón Observable para el sistema de notificaciones, permitiendo que múltiples componentes emitan notificaciones de forma desacoplada.

### Arquitectura

```
Componente A          Componente B
    |                      |
    | notify()             | notify()
    ↓                      ↓
    NotificationStreamService
           |
           | Subject → Observable
           ↓
    NotificationService
           |
           | createComponent()
           ↓
         DOM
```

### Workflow Completo

```
┌─────────────────────────────────────────────────────────────┐
│ WORKFLOW: Sistema de Notificaciones                         │
└─────────────────────────────────────────────────────────────┘

1. Componente ejecuta acción
   ↓
2. Componente llama a notificationStream.success()
   ↓
3. NotificationStreamService.notify(config)
   ↓
4. Subject.next(config)
   ↓
5. Observable emite config
   ↓
6. Constructor suscrito ejecuta NotificationService.show()
   ↓
7. NotificationService crea componente dinámicamente
   ↓
8. createComponent(Notification)
   ↓
9. document.body.appendChild(element)
   ↓
10. Notificación aparece en pantalla
    ↓
11. Después de X segundos o click en X
    ↓
12. dismissed.emit()
    ↓
13. removeChild(element)
    ↓
14. Notificación desaparece
```

### API Pública

#### notify(config: NotificationConfig)

Emite una notificación en el stream.

```typescript
notificationStream.notify({
  type: 'success',
  title: 'Guardado',
  message: 'Los cambios se guardaron correctamente',
  duration: 5000,
  position: 'top-right'
});
```

#### Métodos de Conveniencia

```typescript
// Éxito
notificationStream.success('Título', 'Mensaje');

// Error
notificationStream.error('Título', 'Mensaje', 8000);

// Advertencia
notificationStream.warning('Título', 'Mensaje');

// Información
notificationStream.info('Título', 'Mensaje');
```

### Ejemplo Completo

```typescript
import { Component, inject } from '@angular/core';
import { NotificationStreamService } from '@services/notification-stream';
import { AppStateService } from '@services/app-state';
import { EventBusService, EventType } from '@services/event-bus';

export class AlbumFormComponent {
  private notificationStream = inject(NotificationStreamService);
  private appState = inject(AppStateService);
  private eventBus = inject(EventBusService);

  async onSave(albumData: any) {
    try {
      // Guardar álbum
      const album = await this.saveAlbum(albumData);

      // Actualizar estado
      this.appState.addToFavorites(album);

      // Emitir evento
      this.eventBus.emit({
        type: EventType.ALBUM_ADDED_TO_FAVORITES,
        payload: { albumId: album.id }
      });

      // Notificación de éxito
      this.notificationStream.success(
        'Guardado',
        'El álbum se guardó correctamente'
      );
    } catch (error) {
      // Notificación de error
      this.notificationStream.error(
        'Error',
        'No se pudo guardar el álbum',
        10000 // Más tiempo para errores
      );
    }
  }

  private async saveAlbum(data: any) {
    // Lógica de guardado...
    return data;
  }
}
```

---

## Workflows de Comunicación

### Workflow 1: Agregar Álbum a Favoritos

```
┌─────────────────────────────────────────────────────────────┐
│ Usuario hace click en "Agregar a favoritos"                 │
└────────────────┬────────────────────────────────────────────┘
                 ↓
┌─────────────────────────────────────────────────────────────┐
│ AlbumCardComponent.onToggleFavorite()                       │
└────────────────┬────────────────────────────────────────────┘
                 ↓
┌─────────────────────────────────────────────────────────────┐
│ AppStateService.addToFavorites(album)                       │
│ • favorites.set([...current, album])                        │
│ • effect() → localStorage.setItem()                         │
└────────────────┬────────────────────────────────────────────┘
                 ↓
┌─────────────────────────────────────────────────────────────┐
│ EventBusService.emit(ALBUM_ADDED_TO_FAVORITES)              │
│ • Subject.next(event)                                       │
└────────────────┬────────────────────────────────────────────┘
                 ↓
┌─────────────────────────────────────────────────────────────┐
│ NotificationStreamService.success()                         │
│ • Subject.next(config)                                      │
│ • NotificationService.show()                                │
└────────────────┬────────────────────────────────────────────┘
                 ↓
┌─────────────────────────────────────────────────────────────┐
│ RESULTADOS:                                                  │
│ • FavoritesPageComponent se actualiza (Signal)              │
│ • HeaderComponent actualiza contador (Signal)               │
│ • FavoritesCounterComponent actualiza (EventBus)            │
│ • Notificación aparece en pantalla                          │
└─────────────────────────────────────────────────────────────┘
```

### Workflow 2: Login de Usuario

```
┌─────────────────────────────────────────────────────────────┐
│ Usuario envía formulario de login                           │
└────────────────┬────────────────────────────────────────────┘
                 ↓
┌─────────────────────────────────────────────────────────────┐
│ LoginComponent.onSubmit()                                   │
│ • Valida credenciales con backend                           │
└────────────────┬────────────────────────────────────────────┘
                 ↓
┌─────────────────────────────────────────────────────────────┐
│ AppStateService.setUser(user)                               │
│ • currentUser.set(user)                                     │
│ • effect() → localStorage.setItem('app-user')               │
└────────────────┬────────────────────────────────────────────┘
                 ↓
┌─────────────────────────────────────────────────────────────┐
│ EventBusService.emit(USER_LOGIN)                            │
└────────────────┬────────────────────────────────────────────┘
                 ↓
┌─────────────────────────────────────────────────────────────┐
│ NotificationStreamService.success('Bienvenido')             │
└────────────────┬────────────────────────────────────────────┘
                 ↓
┌─────────────────────────────────────────────────────────────┐
│ RESULTADOS:                                                  │
│ • HeaderComponent muestra nombre (computed)                 │
│ • ProfileComponent se actualiza (Signal)                    │
│ • Router navega a /dashboard                                │
│ • Notificación de bienvenida                                │
└─────────────────────────────────────────────────────────────┘
```

---

## Patrones de Uso

### Patrón 1: Comunicación Hermano-Hermano

**Cuándo usar:** Dos componentes no relacionados necesitan comunicarse.

```typescript
// ComponenteA.ts - Emisor
export class ComponenteA {
  private eventBus = inject(EventBusService);

  onAction() {
    this.eventBus.emit({
      type: EventType.CUSTOM_EVENT,
      payload: { data: 'algo' }
    });
  }
}

// ComponenteB.ts - Receptor
export class ComponenteB implements OnInit, OnDestroy {
  private eventBus = inject(EventBusService);
  private subscription?: Subscription;

  ngOnInit() {
    this.subscription = this.eventBus
      .on(EventType.CUSTOM_EVENT)
      .subscribe(event => {
        // Reaccionar al evento
      });
  }

  ngOnDestroy() {
    this.subscription?.unsubscribe();
  }
}
```

### Patrón 2: Estado Compartido

**Cuándo usar:** Múltiples componentes necesitan acceder al mismo dato.

```typescript
// Componente A - Escritura
export class ComponenteA {
  private appState = inject(AppStateService);

  onUpdate() {
    this.appState.setUser(newUser);
  }
}

// Componente B - Lectura
export class ComponenteB {
  private appState = inject(AppStateService);

  // Actualización automática
  user = this.appState.currentUser;
}
```

### Patrón 3: Acción con Feedback

**Cuándo usar:** Acción del usuario necesita confirmación visual.

```typescript
export class MiComponente {
  private notificationStream = inject(NotificationStreamService);

  async onAction() {
    try {
      await this.performAction();
      this.notificationStream.success('Éxito', 'Operación completada');
    } catch (error) {
      this.notificationStream.error('Error', error.message);
    }
  }
}
```

### Patrón 4: Workflow Completo

**Cuándo usar:** Acción compleja que requiere múltiples servicios.

```typescript
export class ComplexComponent {
  private eventBus = inject(EventBusService);
  private appState = inject(AppStateService);
  private notificationStream = inject(NotificationStreamService);

  async onComplexAction(data: any) {
    try {
      // 1. Actualizar estado
      this.appState.setLoading(true);

      // 2. Ejecutar acción
      const result = await this.performAction(data);

      // 3. Actualizar estado global
      this.appState.addToFavorites(result);

      // 4. Emitir evento
      this.eventBus.emit({
        type: EventType.ACTION_COMPLETED,
        payload: result
      });

      // 5. Feedback visual
      this.notificationStream.success('Completado', 'Acción exitosa');

    } catch (error) {
      this.notificationStream.error('Error', error.message);
    } finally {
      this.appState.setLoading(false);
    }
  }
}
```

---

## Comparación de Enfoques

### EventBus vs AppState

| Característica | EventBus | AppState |
|----------------|----------|----------|
| **Propósito** | Eventos puntuales | Estado persistente |
| **Tecnología** | RxJS Subject | Angular Signals |
| **Persistencia** | No | Sí (localStorage) |
| **Cleanup** | Requiere unsubscribe | Automático |
| **Uso típico** | Click, acción, evento | Usuario, config, datos |

### Cuándo usar cada uno

**Usar EventBus cuando:**
- Componente A necesita notificar a B sobre una acción
- No hay relación padre-hijo
- El evento es puntual (no persiste)

**Usar AppState cuando:**
- Múltiples componentes necesitan el mismo dato
- Los datos deben persistir entre sesiones
- Necesitas computed values reactivos

**Usar NotificationStream cuando:**
- Necesitas mostrar feedback visual
- Diferentes componentes pueden generar notificaciones
- Quieres centralizar el sistema de notificaciones

---

## Conclusión Sección 2

Los servicios de comunicación implementados proporcionan una arquitectura robusta y escalable para:

- **Comunicación desacoplada** entre componentes
- **Estado global reactivo** con persistencia
- **Sistema de notificaciones** centralizado
- **Workflows complejos** bien estructurados

La combinación de Signals (reactividad) y RxJS (eventos) ofrece lo mejor de ambos mundos: simplicidad y potencia.

---

## 2.7 Separación de Responsabilidades

### Principio: Single Responsibility Principle (SRP)

La arquitectura del proyecto implementa una clara separación entre componentes de presentación y servicios de lógica de negocio.

#### Reglas de Diseño

**Componentes:**
- ✅ Gestión de presentación UI
- ✅ Captura de input del usuario
- ✅ Navegación entre páginas
- ✅ Estado de loading/disabled
- ❌ Validación de datos
- ❌ Llamadas HTTP
- ❌ Lógica de negocio
- ❌ Gestión de autenticación

**Servicios:**
- ✅ Lógica de validación
- ✅ Reglas de negocio
- ✅ Comunicación con backend
- ✅ Gestión de tokens/sesiones
- ✅ Coordinación entre servicios
- ❌ Manipulación directa del DOM
- ❌ Navegación (Router)

---

### ValidationService - Validación Centralizada

**Archivo:** `frontend/src/app/services/validation.ts`

#### Propósito

Centralizar toda la lógica de validación de formularios para:
- Eliminar código duplicado entre componentes
- Facilitar testing de reglas de negocio
- Mantener validaciones consistentes
- Simplificar componentes

#### Diagrama de Flujo

```
┌─────────────────────────────────────────────────────────────┐
│ Usuario escribe en campo de formulario                      │
└────────────────┬────────────────────────────────────────────┘
                 ↓
┌─────────────────────────────────────────────────────────────┐
│ LoginComponent.onEmailChange(event)                         │
│ • Extrae valor del input                                    │
│ • this.email.set(value)                                     │
└────────────────┬────────────────────────────────────────────┘
                 ↓
┌─────────────────────────────────────────────────────────────┐
│ ValidationService.validateEmail(value)                      │
│ • Verifica campo no vacío                                   │
│ • Aplica regex: /^[^\s@]+@[^\s@]+\.[a-zA-Z]{2,}$/          │
│ • Retorna { isValid, errorMessage }                         │
└────────────────┬────────────────────────────────────────────┘
                 ↓
┌─────────────────────────────────────────────────────────────┐
│ LoginComponent procesa resultado                            │
│ • this.emailError.set(result.errorMessage)                  │
│ • UI se actualiza automáticamente (Signal)                  │
└─────────────────────────────────────────────────────────────┘
```

#### API Pública

##### validateEmail(email: string): ValidationResult

```typescript
const result = validationService.validateEmail('user@example.com');

if (!result.isValid) {
  console.error(result.errorMessage);
  // Output: "Correo inválido. Debe tener @ y dominio..."
}
```

**Reglas de negocio:**
- Debe contener @
- Debe tener dominio con al menos .xx
- No debe contener espacios

##### validatePassword(password: string): ValidationResult

```typescript
const result = validationService.validatePassword('MyPass123!');

// Reglas:
// - Mínimo 8 caracteres
// - Al menos una mayúscula
// - Al menos un carácter especial
```

##### validateUsername(username: string): ValidationResult

```typescript
const result = validationService.validateUsername('john_doe_2024');

// Reglas:
// - Entre 3 y 20 caracteres
// - Solo letras, números y guiones bajos
// - Sin espacios
```

##### validatePasswordConfirmation(password, confirmPassword): ValidationResult

```typescript
const result = validationService.validatePasswordConfirmation(
  'MyPass123!',
  'MyPass123!'
);

// Verifica que ambas contraseñas sean idénticas
```

##### validateLoginForm(email, password): FormValidationResult

```typescript
const result = validationService.validateLoginForm(
  'user@example.com',
  'password123'
);

if (result.isValid) {
  // Proceder con login
} else {
  // Mostrar errores individuales
  console.log(result.errors.email.errorMessage);
  console.log(result.errors.password.errorMessage);
}
```

##### validateRegisterForm(data): FormValidationResult

```typescript
const result = validationService.validateRegisterForm({
  username: 'john_doe',
  email: 'john@example.com',
  password: 'MyPass123!',
  confirmPassword: 'MyPass123!'
});

// Valida todos los campos a la vez
// Retorna objeto con todos los errores
```

---

### AuthService - Autenticación y Sesiones

**Archivo:** `frontend/src/app/services/auth.ts`

#### Propósito

Centralizar toda la lógica de autenticación:
- Login/Logout/Register
- Gestión de tokens
- Coordinación con AppState
- Emisión de eventos
- Feedback visual (notificaciones)

#### Diagrama de Flujo: Login

```
┌─────────────────────────────────────────────────────────────┐
│ Usuario hace submit del formulario de login                 │
└────────────────┬────────────────────────────────────────────┘
                 ↓
┌─────────────────────────────────────────────────────────────┐
│ LoginComponent.onSubmit()                                   │
│ • Obtiene email y password de Signals                       │
│ • Llama a authService.login({ email, password })            │
└────────────────┬────────────────────────────────────────────┘
                 ↓
┌─────────────────────────────────────────────────────────────┐
│ AuthService.login(credentials)                              │
│ 1. Hace llamada HTTP a backend (o simula)                   │
│    POST /api/login { email, password }                      │
└────────────────┬────────────────────────────────────────────┘
                 ↓
┌─────────────────────────────────────────────────────────────┐
│ Backend responde con { success, user, token }               │
└────────────────┬────────────────────────────────────────────┘
                 ↓
┌─────────────────────────────────────────────────────────────┐
│ Si success === true:                                         │
│ 1. appState.setUser(user)                                   │
│ 2. localStorage.setItem('auth-token', token)                │
│ 3. eventBus.emit(USER_LOGIN, { userId, username })          │
│ 4. notificationStream.success('Bienvenido', '...')          │
└────────────────┬────────────────────────────────────────────┘
                 ↓
┌─────────────────────────────────────────────────────────────┐
│ AuthService retorna { success: true, user, token }          │
└────────────────┬────────────────────────────────────────────┘
                 ↓
┌─────────────────────────────────────────────────────────────┐
│ LoginComponent recibe resultado                             │
│ • Si success: router.navigate(['/dashboard'])               │
│ • Si !success: muestra error en UI                          │
└─────────────────────────────────────────────────────────────┘
                 ↓
┌─────────────────────────────────────────────────────────────┐
│ EFECTOS EN CASCADA:                                          │
│ • HeaderComponent actualiza con nombre usuario (Signal)     │
│ • FavoritesComponent carga favoritos del usuario (Event)    │
│ • Notificación aparece en pantalla (NotificationStream)     │
└─────────────────────────────────────────────────────────────┘
```

#### API Pública

##### login(credentials): Promise<AuthResponse>

```typescript
const result = await authService.login({
  email: 'user@example.com',
  password: 'MyPass123!'
});

if (result.success) {
  router.navigate(['/dashboard']);
} else {
  console.error(result.message);
}
```

**Workflow interno:**
1. Llamada HTTP a backend
2. Actualiza AppState con usuario
3. Guarda token en localStorage
4. Emite evento USER_LOGIN
5. Muestra notificación de bienvenida

##### register(data): Promise<AuthResponse>

```typescript
const result = await authService.register({
  username: 'john_doe',
  email: 'john@example.com',
  password: 'MyPass123!'
});

if (result.success) {
  router.navigate(['/login']);
}
```

**Workflow interno:**
1. Llamada HTTP POST /api/register
2. Si éxito: notificación "Cuenta creada"
3. Opcionalmente: login automático

##### logout(): void

```typescript
authService.logout();
// El servicio se encarga de todo
```

**Workflow interno:**
1. appState.logout()
2. localStorage.removeItem('auth-token')
3. eventBus.emit(USER_LOGOUT)
4. notificationStream.info('Sesión cerrada', '...')

##### isAuthenticated(): boolean

```typescript
// Para guards de rutas
if (!authService.isAuthenticated()) {
  router.navigate(['/login']);
}
```

##### getCurrentUser(): User | null

```typescript
const user = authService.getCurrentUser();
console.log(user?.username);
```

##### requestPasswordReset(email): Promise<AuthResponse>

```typescript
await authService.requestPasswordReset('user@example.com');
// Envía email con instrucciones
```

---

### Comparación: Antes vs Después

#### ANTES (Anti-patrón)

```typescript
// LoginComponent tiene DEMASIADAS responsabilidades
export class LoginComponentOLD {
  // ❌ Validación en componente
  validateEmail(email: string): boolean {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[a-zA-Z]{2,}$/;
    return emailRegex.test(email);
  }

  // ❌ Llamada HTTP en componente
  // ❌ Gestión de token en componente
  // ❌ Gestión de estado en componente
  async onSubmit(): Promise<void> {
    if (!this.validateEmail(this.email())) return;

    const response: any = await this.http.post('/api/login', {
      email: this.email(),
      password: this.password(),
    }).toPromise();

    localStorage.setItem('user', JSON.stringify(response.user));
    localStorage.setItem('token', response.token);

    alert('¡Bienvenido!');
    this.router.navigate(['/dashboard']);
  }
}
```

**Problemas:**
- Código duplicado (RegisterComponent tiene las mismas validaciones)
- Difícil de testear (necesita mockear HTTP, localStorage, router)
- Componente muy grande y complejo
- Lógica de negocio mezclada con presentación

#### DESPUÉS (Patrón correcto)

```typescript
// LoginComponent solo presenta
export class LoginComponentNEW {
  private validationService = inject(ValidationService);
  private authService = inject(AuthService);
  private router = inject(Router);

  // ✅ Delegación a ValidationService
  onEmailChange(event: Event): void {
    const value = (event.target as HTMLInputElement).value;
    this.email.set(value);

    const result = this.validationService.validateEmail(value);
    this.emailError.set(result.isValid ? '' : result.errorMessage);
  }

  // ✅ Delegación a AuthService
  async onSubmit(): Promise<void> {
    const result = await this.authService.login({
      email: this.email(),
      password: this.password(),
    });

    if (result.success) {
      this.router.navigate(['/dashboard']);
    }
  }
}
```

**Beneficios:**
- Sin código duplicado
- Fácil de testear (mockear solo servicios)
- Componente simple (3 métodos vs 7)
- Lógica de negocio en servicios reutilizables

---

### Tabla Comparativa: Responsabilidades

| Responsabilidad | Antes | Después |
|----------------|-------|---------|
| **Presentación UI** | LoginComponent | LoginComponent |
| **Validación email** | LoginComponent | ValidationService |
| **Validación password** | LoginComponent | ValidationService |
| **Llamada HTTP login** | LoginComponent | AuthService |
| **Gestión de token** | LoginComponent | AuthService |
| **Actualizar AppState** | LoginComponent | AuthService |
| **Emitir eventos** | LoginComponent | AuthService |
| **Notificaciones** | LoginComponent | AuthService (vía NotificationStream) |
| **Navegación** | LoginComponent | LoginComponent |

### Resultado

**Componente LoginComponent:**
- **Antes:** 8 responsabilidades
- **Después:** 2 responsabilidades (presentación + navegación)

**Servicios creados:**
- ValidationService: 5 responsabilidades de validación
- AuthService: 5 responsabilidades de autenticación

---

### Testing: Comparación

#### Antes (Difícil)

```typescript
describe('LoginComponentOLD', () => {
  it('should validate email', () => {
    const component = new LoginComponentOLD(mockHttp, mockRouter);
    
    // ❌ Testeando lógica de negocio en componente
    expect(component.validateEmail('invalid')).toBe(false);
  });

  it('should login', async () => {
    // ❌ Necesita mockear HTTP, localStorage, router...
    mockHttp.post.mockReturnValue(of({ user: {}, token: 'abc' }));
    
    await component.onSubmit();
    
    expect(localStorage.setItem).toHaveBeenCalled();
    expect(mockRouter.navigate).toHaveBeenCalled();
  });
});
```

#### Después (Fácil)

```typescript
// Test de ValidationService (aislado)
describe('ValidationService', () => {
  it('should validate email', () => {
    const service = new ValidationService();
    
    // ✅ Testear lógica pura
    const result = service.validateEmail('invalid');
    expect(result.isValid).toBe(false);
    expect(result.errorMessage).toBe('Correo inválido...');
  });
});

// Test de AuthService (aislado)
describe('AuthService', () => {
  it('should login', async () => {
    const service = new AuthService(mockHttp, mockAppState, mockEventBus);
    
    // ✅ Testear lógica de autenticación aislada
    const result = await service.login({ email: 'test@example.com', password: 'pass' });
    
    expect(result.success).toBe(true);
    expect(mockAppState.setUser).toHaveBeenCalled();
  });
});

// Test de LoginComponent (delegación)
describe('LoginComponentNEW', () => {
  it('should delegate to services', async () => {
    const component = new LoginComponentNEW();
    
    // ✅ Solo testear que delega correctamente
    await component.onSubmit();
    
    expect(mockAuthService.login).toHaveBeenCalledWith({
      email: component.email(),
      password: component.password(),
    });
  });
});
```

---

### Workflow Completo: Registro de Usuario

```
┌─────────────────────────────────────────────────────────────┐
│ Usuario completa formulario de registro                     │
│ • Username: john_doe                                         │
│ • Email: john@example.com                                    │
│ • Password: MyPass123!                                       │
│ • Confirm: MyPass123!                                        │
└────────────────┬────────────────────────────────────────────┘
                 ↓
┌─────────────────────────────────────────────────────────────┐
│ RegisterComponent.onSubmit()                                │
│ • Obtiene todos los valores de Signals                      │
└────────────────┬────────────────────────────────────────────┘
                 ↓
┌─────────────────────────────────────────────────────────────┐
│ ValidationService.validateRegisterForm({...})               │
│ • validateUsername('john_doe')                              │
│ • validateEmail('john@example.com')                         │
│ • validatePassword('MyPass123!')                            │
│ • validatePasswordConfirmation('MyPass123!', 'MyPass123!')  │
│                                                              │
│ Retorna: { isValid: true, errors: {...} }                   │
└────────────────┬────────────────────────────────────────────┘
                 ↓
┌─────────────────────────────────────────────────────────────┐
│ Si !isValid: RegisterComponent muestra errores en UI        │
│ • usernameError.set(errors.username.errorMessage)           │
│ • emailError.set(errors.email.errorMessage)                 │
│ • ... etc                                                    │
│ TERMINA FLUJO                                                │
└─────────────────────────────────────────────────────────────┘
                 ↓
┌─────────────────────────────────────────────────────────────┐
│ Si isValid: AuthService.register({...})                     │
│ 1. POST /api/register { username, email, password }         │
└────────────────┬────────────────────────────────────────────┘
                 ↓
┌─────────────────────────────────────────────────────────────┐
│ Backend responde { success, user?, token? }                 │
└────────────────┬────────────────────────────────────────────┘
                 ↓
┌─────────────────────────────────────────────────────────────┐
│ Si success:                                                  │
│ 1. notificationStream.success('Cuenta creada', '...')       │
│ 2. (Opcional) Login automático:                             │
│    • appState.setUser(user)                                 │
│    • localStorage.setItem('auth-token', token)              │
│    • eventBus.emit(USER_LOGIN)                              │
└────────────────┬────────────────────────────────────────────┘
                 ↓
┌─────────────────────────────────────────────────────────────┐
│ RegisterComponent recibe resultado                          │
│ • Si success: router.navigate(['/login'])                   │
│   o router.navigate(['/dashboard']) si login automático     │
└─────────────────────────────────────────────────────────────┘
```

---

### Resumen: Separación de Responsabilidades

#### Principios Implementados

1. **Single Responsibility Principle (SRP)**
   - Cada clase tiene una única razón para cambiar
   - Componentes: solo presentación
   - Servicios: solo lógica de negocio

2. **Don't Repeat Yourself (DRY)**
   - Sin código duplicado entre componentes
   - Validaciones centralizadas
   - Lógica reutilizable

3. **Dependency Injection**
   - Servicios inyectados con `inject()`
   - Fácil de testear con mocks
   - Loose coupling

4. **Separation of Concerns**
   - UI separada de lógica
   - Datos separados de presentación
   - Comunicación separada de negocio

#### Archivos Relacionados

- **ValidationService:** `frontend/src/app/services/validation.ts`
- **AuthService:** `frontend/src/app/services/auth.ts`
- **Ejemplos de refactorización:** `frontend/src/app/services/REFACTORIZACION_EJEMPLOS.ts`

#### Ventajas de esta Arquitectura

1. **Testabilidad:** Servicios testeables en aislamiento
2. **Mantenibilidad:** Cambios localizados en servicios
3. **Reutilización:** Validaciones usables en múltiples componentes
4. **Escalabilidad:** Fácil agregar nuevos servicios
5. **Claridad:** Componentes simples y fáciles de entender

---

## 2.8 Sistema de Notificaciones/Toasts

### Descripción General

El sistema de notificaciones implementa un patrón de arquitectura de tres capas:

1. **NotificationService** (Gestión DOM) - Crea/destruye componentes dinámicamente
2. **Notification Component** (Presentación) - Renderiza y anima toasts
3. **NotificationStreamService** (Comunicación) - Observable para desacoplamiento

```
┌─────────────────────────────────────────────────────────────┐
│                    CAPA DE NEGOCIO                          │
│  (Componentes, Servicios de Autenticación, etc.)           │
│                                                              │
│  - AlbumComponent                                           │
│  - AuthService                                              │
│  - ValidationService                                        │
└──────────────┬──────────────────────────────────────────────┘
               │ Llama a notify()
               ↓
┌─────────────────────────────────────────────────────────────┐
│            CAPA DE COMUNICACIÓN (Opcional)                  │
│                                                              │
│  NotificationStreamService (RxJS Subject/Observable)        │
│  - notify(config)                                           │
│  - success(), error(), warning(), info()                    │
│  - Observable stream para múltiples suscriptores           │
└──────────────┬──────────────────────────────────────────────┘
               │ Emite evento en stream
               ↓
┌─────────────────────────────────────────────────────────────┐
│              CAPA DE GESTIÓN DEL DOM                        │
│                                                              │
│  NotificationService (Manipulación DOM)                     │
│  - show(config)                                             │
│  - createComponent() → Notification Component               │
│  - appendChild() al body                                    │
│  - removeChild() después de dismiss                         │
└──────────────┬──────────────────────────────────────────────┘
               │ Crea componente dinámico
               ↓
┌─────────────────────────────────────────────────────────────┐
│              CAPA DE PRESENTACIÓN                           │
│                                                              │
│  Notification Component (UI)                                │
│  - Renderiza HTML/CSS                                       │
│  - Animaciones entrada/salida                               │
│  - Timer de auto-dismiss                                    │
│  - Emite evento dismissed                                   │
└─────────────────────────────────────────────────────────────┘
```

### Separación de Responsabilidades en Notificaciones

| Capa | Responsable de | NO Responsable de |
|------|---|---|
| **NotificationService** | Crear componentes dinámicamente, Manipular DOM (appendChild/removeChild), Gestionar ciclo de vida, API conveniente (success, error, etc.) | Renderizar HTML/CSS, Manejar animaciones, Lógica de negocio |
| **Notification Component** | Renderizar UI, Animaciones CSS, Timer de auto-dismiss, Emitir evento dismissed | Crear otras notificaciones, Manipular DOM externo, Contener lógica de negocio |
| **Componentes de Negocio** | Lógica de aplicación, Llamar a notify(), Decidir cuándo notificar | Crear componentes visuales, Manipular DOM, Gestionar timers |

### Workflow Completo de Notificación

```
Usuario ejecuta acción
    ↓
Componente llama: notificationService.success('Título', 'Mensaje')
    ↓
NotificationService.show(config)
    ├─ createComponent(Notification)
    ├─ componentRef.setInput('type', 'success')
    ├─ componentRef.setInput('title', 'Título')
    ├─ componentRef.setInput('message', 'Mensaje')
    ├─ componentRef.setInput('position', 'top-right')
    ├─ componentRef.setInput('duration', 5000)
    ├─ componentRef.setInput('autoDismiss', true)
    ├─ suscribirse a dismissed event
    ├─ appRef.attachView(componentRef.hostView)
    └─ document.body.appendChild(element)
    ↓
Notification Component ngOnInit()
    ├─ Espera 10ms para activar animación
    ├─ isVisible.set(true) - Inicia animación entrada
    └─ Inicia timer de 5000ms
    ↓
Notificación aparece en pantalla con animación
    ↓
[Usuario ve la notificación durante 5 segundos]
    ↓
Timer vence O usuario hace click en X
    ↓
Notification Component onDismiss()
    ├─ isVisible.set(false) - Inicia animación salida
    └─ Emite dismissed event después de 300ms
    ↓
NotificationService recibe dismissed
    ├─ removeChild(element)
    ├─ appRef.detachView(componentRef.hostView)
    ├─ componentRef.destroy()
    └─ Remover de array de activas
    ↓
Notificación desaparece de pantalla
```

### Tipos de Notificaciones

#### Success (verde con icono ✓)
- Duración: 5000ms
- Uso: Operaciones exitosas
- Ejemplo: "Guardado correctamente"

#### Error (rojo con icono ✕)
- Duración: 8000ms (más tiempo para leer)
- Uso: Errores y fallos
- Ejemplo: "No se pudo guardar el álbum"

#### Warning (amarillo/naranja con icono ⚠)
- Duración: 6000ms
- Uso: Advertencias y precauciones
- Ejemplo: "Este álbum ya está en favoritos"

#### Info (azul con icono ℹ)
- Duración: 5000ms
- Uso: Información general
- Ejemplo: "Hay 3 álbumes nuevos"

### API de NotificationService

#### show(config: NotificationConfig): void

Método principal para mostrar notificación con configuración completa.

```typescript
notificationService.show({
  type: 'success',
  title: 'Guardado',
  message: 'Los cambios se guardaron correctamente',
  position: 'top-right',
  duration: 5000,
  autoDismiss: true,
  icon: '✓'
});
```

#### success(title: string, message: string, duration?: number): void

Atajo para notificaciones de éxito.

```typescript
notificationService.success('Guardado', 'Los cambios se guardaron correctamente');
```

#### error(title: string, message: string, duration?: number): void

Atajo para notificaciones de error (duración por defecto: 8000ms).

```typescript
notificationService.error('Error', 'No se pudo guardar el álbum', 10000);
```

#### warning(title: string, message: string, duration?: number): void

Atajo para advertencias.

```typescript
notificationService.warning('Atención', 'Este álbum ya está en favoritos');
```

#### info(title: string, message: string, duration?: number): void

Atajo para información general.

```typescript
notificationService.info('Actualización', 'Hay 3 álbumes nuevos disponibles');
```

#### persistent(type, title, message): void

Notificación que NO se cierra automáticamente. El usuario debe cerrarla manualmente.

```typescript
notificationService.persistent('error', 'Conexión perdida', 'No se puede conectar al servidor');
```

#### clearAll(): void

Elimina todas las notificaciones activas.

```typescript
notificationService.clearAll();
```

#### getActiveCount(): number

Retorna el número de notificaciones actualmente en pantalla.

```typescript
const count = notificationService.getActiveCount();
console.log(`${count} notificaciones activas`);
```

### Interfaz NotificationConfig

```typescript
interface NotificationConfig {
  type: 'success' | 'error' | 'warning' | 'info';
  title: string;
  message: string;
  position?: 'top-right' | 'top-left' | 'bottom-right' | 'bottom-left';
  duration?: number;
  autoDismiss?: boolean;
  icon?: string;
}
```

### Ejemplos de Uso

#### Ejemplo 1: Notificación Simple

```typescript
export class AlbumComponent {
  private notificationService = inject(NotificationService);

  onSave() {
    this.notificationService.success(
      'Guardado',
      'El álbum se guardó correctamente'
    );
  }
}
```

#### Ejemplo 2: Notificación con Manejo de Errores

```typescript
async onSaveAlbum(albumData: any) {
  try {
    await this.albumService.save(albumData);
    this.notificationService.success(
      'Guardado',
      'El álbum se guardó correctamente'
    );
  } catch (error: any) {
    this.notificationService.error(
      'Error',
      error.message || 'No se pudo guardar el álbum',
      10000
    );
  }
}
```

#### Ejemplo 3: Notificación Persistente

```typescript
checkConnection() {
  if (!this.isConnected) {
    this.notificationService.persistent(
      'error',
      'Conexión perdida',
      'No se puede conectar al servidor. La notificación persistirá hasta que se reconecte.'
    );
  }
}
```

#### Ejemplo 4: Configuración Avanzada

```typescript
onAddToFavorites(album: Album) {
  this.notificationService.show({
    type: 'success',
    title: 'Agregado a Favoritos',
    message: `${album.title} se agregó a tus favoritos`,
    position: 'bottom-right',
    duration: 3000,
    autoDismiss: true,
    icon: '💿'
  });
}
```

#### Ejemplo 5: Múltiples Notificaciones Secuenciales

```typescript
async onComplexWorkflow() {
  this.notificationService.info('Iniciando', 'Procesando datos...');
  
  await this.step1();
  this.notificationService.info('Paso 1', 'Datos procesados');
  
  await this.step2();
  this.notificationService.info('Paso 2', 'Validación completada');
  
  await this.step3();
  this.notificationService.success('Completado', 'Operación exitosa');
}
```

#### Ejemplo 6: Limpiar Notificaciones

```typescript
onLogout() {
  this.authService.logout();
  this.notificationService.clearAll();
  this.router.navigate(['/login']);
}
```

#### Ejemplo 7: Integración con AuthService

```typescript
// En AuthService
async login(credentials: LoginCredentials): Promise<AuthResponse> {
  try {
    const response = await this.http.post('/api/login', credentials).toPromise();
    
    this.appState.setUser(response.user);
    localStorage.setItem('auth-token', response.token);
    
    this.notificationService.success(
      'Bienvenido',
      `Hola, ${response.user.username}`
    );
    
    return response;
  } catch (error: any) {
    this.notificationService.error(
      'Error de login',
      error.message || 'Credenciales inválidas',
      8000
    );
    throw error;
  }
}
```

### API de Notification Component

#### Inputs

```typescript
@Input() type: 'success' | 'error' | 'warning' | 'info' = 'info';
@Input() title: string = '';
@Input() message: string = '';
@Input() icon: string = '';
@Input() position: 'top-right' | 'top-left' | 'bottom-right' | 'bottom-left';
@Input() autoDismiss: boolean = true;
@Input() duration: number = 5000;
```

#### Outputs

```typescript
@Output() dismissed = new EventEmitter<void>();
```

#### Lifecycle Hooks

**ngOnInit:**
- Espera 10ms para permitir que Angular renderice
- Establece isVisible.set(true) para animación de entrada
- Si autoDismiss, inicia timer de duration ms

**ngOnDestroy:**
- Limpia timeout para prevenir memory leaks

#### Propiedades Computadas

```typescript
// Clases CSS dinámicas basadas en tipo y estado
notificationClasses: string

// Icono por defecto según tipo
defaultIcon: string
```

### Testing del Sistema

```typescript
describe('NotificationService', () => {
  let service: NotificationService;

  beforeEach(() => {
    service = new NotificationService(mockAppRef, mockInjector);
  });

  it('should create notification component', () => {
    service.show({
      type: 'success',
      title: 'Test',
      message: 'Testing'
    });

    expect(service.getActiveCount()).toBe(1);
  });

  it('should remove notification on dismiss', (done) => {
    service.show({
      type: 'info',
      title: 'Test',
      message: 'Testing'
    });

    setTimeout(() => {
      expect(service.getActiveCount()).toBe(0);
      done();
    }, 5100);
  });

  it('should clear all notifications', () => {
    service.success('Test 1', 'Message 1');
    service.info('Test 2', 'Message 2');
    service.warning('Test 3', 'Message 3');

    expect(service.getActiveCount()).toBe(3);

    service.clearAll();

    expect(service.getActiveCount()).toBe(0);
  });
});
```

### Best Practices

**DO:**
- Usar métodos de conveniencia (success, error, etc.) para casos comunes
- Mostrar mensajes de error detallados para mejor UX
- Aumentar duración para errores críticos (8000-10000ms)
- Usar notificaciones persistentes para conectividad
- Limpiar notificaciones al hacer logout

**DON'T:**
- No mostrar múltiples notificaciones del mismo tipo simultáneamente (agruparlas)
- No usar notificaciones para casos que necesitan acción inmediata (usar Modales)
- No abusar de los iconos personalizados
- No cambiar duración sin razón específica

### Características Especiales

#### Observable Stream

El servicio expone un Observable para que otros componentes observen notificaciones:

```typescript
notificationService.notification$.subscribe(config => {
  console.log('Notificación mostrada:', config);
  // Útil para analytics, logging, etc.
});
```

#### Posicionamiento Flexible

4 posiciones disponibles:
- top-right (por defecto)
- top-left
- bottom-right
- bottom-left

#### Iconos Personalizables

```typescript
notificationService.show({
  type: 'success',
  title: 'Música agregada',
  message: 'Nueva canción en tu playlist',
  icon: '🎵'
});
```

#### Gestión Automática

- El sistema apila notificaciones automáticamente
- Cada notificación se gestiona independientemente
- clearAll() permite limpiar todas a la vez
- Limpieza automática de memory en ngOnDestroy

---

**Última actualización:** 15 de diciembre de 2025
**Responsable:** Sergio Durán
**Estado Fase 2:** Completado (Parte 3 - Sistema de Notificaciones)
