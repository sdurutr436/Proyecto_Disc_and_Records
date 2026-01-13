# Fase 1 - Manipulación del DOM y eventos (Frontend)

> **Proyecto:** Discs & Records
> **Tipo:** Aplicación web estilo Letterboxd para música
> **Fecha:** 17 de diciembre de 2025 (Actualizado: 13 de enero de 2026)

---

## Índice

1. [Manipulación del DOM en componentes](#manipulación-del-dom-en-componentes)
2. [Tabla ViewChild/ElementRef](#tabla-viewchildelementref)
3. [Renderer2 - Buenas prácticas](#renderer2---buenas-prácticas)
4. [Creación y eliminación programática (toasts)](#creación-y-eliminación-programática-toasts)
5. [Sistema de eventos](#sistema-de-eventos)
6. [Tabla de eventos en templates](#tabla-de-eventos-en-templates)
7. [Tabla HostListener global](#tabla-hostlistener-global)
8. [Componentes interactivos](#componentes-interactivos)
9. [Theme Switcher](#theme-switcher)
10. [Arquitectura de eventos](#arquitectura-de-eventos-readme-técnico)

---

## Manipulación del DOM en componentes
En el frontend (Angular), la manipulación del DOM se concentra en componentes UI reutilizables donde se necesita scroll nativo, control de foco o estados visuales reactivos.
Los ejemplos siguientes muestran acceso al DOM con `ViewChild`/`ElementRef` y cambios puntuales en estilos/atributos cuando el comportamiento lo requiere.

### Acceso al DOM con ViewChild y ElementRef
El componente `Tabs` obtiene una referencia al contenedor de navegación para controlar su scroll horizontal (drag-to-scroll y wheel).
```ts
@ViewChild('tabsNav') tabsNav!: ElementRef<HTMLElement>;
```

### Modificación dinámica de propiedades/estilos con Renderer2
En lugar de manipular directamente `classList` o `style`, usamos `Renderer2` para garantizar compatibilidad con SSR y seguridad:
```ts
// ❌ Antes (manipulación directa)
slider.classList.add('tabs--grabbing');
element.style.opacity = '0.5';

// ✅ Ahora (con Renderer2)
this.renderer.addClass(slider, 'tabs--grabbing');
this.renderer.setStyle(element, 'opacity', '0.5');
```

---

## Tabla ViewChild/ElementRef

| Componente | Elemento | Uso | Ciclo de vida |
|------------|----------|-----|---------------|
| `Tabs` | `tabsNav` (nav container) | Scroll horizontal, drag-to-scroll | `ngAfterViewInit` |
| `Tabs` | `tabButtons` (QueryList) | Navegación por teclado, gestión de foco | `ngAfterViewInit` |
| `TabGroup` | `tabsNav` (nav container) | Scroll horizontal, drag-to-scroll | `ngAfterViewInit` |
| `ResponsiveTabs` | `tabsNav` (nav container) | Scroll horizontal en modo tabs | `ngAfterViewInit` |
| `Carousel` | `carouselTrack` (div) | Scroll suave, efectos visuales | `ngAfterViewInit` |
| `Accordion` | `accordionHeaders` (QueryList) | Navegación por teclado, foco | `ngAfterViewInit` |
| `InfiniteScroll` | `elementRef` (host) | Observer de intersección | `ngAfterViewInit` |
| `Notification` | `elementRef` (host) | Medir altura para apilado | `ngAfterViewInit` |

---

## Renderer2 - Buenas prácticas

### ¿Por qué usar Renderer2?

| Característica | Manipulación directa | Renderer2 |
|----------------|---------------------|-----------|
| **Compatibilidad SSR** | ❌ No | ✅ Sí |
| **Seguridad XSS** | ❌ Expone nativeElement | ✅ Abstrae el DOM |
| **Plataforma universal** | ❌ Solo navegador | ✅ Web Workers, etc. |
| **Testing** | ❌ Difícil de mockear | ✅ Fácil de testear |

### Métodos principales de Renderer2

```ts
// Clases CSS
renderer.addClass(element, 'active');
renderer.removeClass(element, 'active');

// Estilos inline
renderer.setStyle(element, 'opacity', '0.5');
renderer.removeStyle(element, 'opacity');

// Atributos
renderer.setAttribute(element, 'aria-expanded', 'true');
renderer.removeAttribute(element, 'aria-expanded');

// Listeners (con cleanup automático)
const unlisten = renderer.listen(element, 'click', handler);
// En ngOnDestroy: unlisten();
```

---

## Creación y eliminación programática (toasts)
El sistema de notificaciones crea componentes en tiempo de ejecución y los inserta directamente en `document.body`, retirándolos cuando el componente emite `dismissed` (patrón típico de *toast*).

```ts
// Crear + insertar
const componentRef = createComponent(Notification, { environmentInjector: this.injector });
this.appRef.attachView(componentRef.hostView);
const domElem = (componentRef.hostView as any).rootNodes[0] as HTMLElement;
document.body.appendChild(domElem);

// Eliminar + limpiar
componentRef.instance.dismissed.subscribe(() => this.remove(componentRef));
this.appRef.detachView(componentRef.hostView);
componentRef.destroy();
```

### Limpieza en ngOnDestroy

Es fundamental limpiar listeners y timeouts para evitar memory leaks:

```ts
ngOnDestroy() {
  // Limpiar listeners de Renderer2
  this.listeners.forEach(unlisten => unlisten());
  
  // Limpiar timeouts
  if (this.showTimeout) clearTimeout(this.showTimeout);
  if (this.hideTimeout) clearTimeout(this.hideTimeout);
}
```

---

## Sistema de eventos
La interacción se implementa combinando:
- Event binding en templates (click, keydown, focus, blur).
- `@HostListener` para eventos a nivel de componente o documento (ESC, click fuera, hover).
- Listeners controlados con `Renderer2.listen` cuando se necesita scroll/drag con configuraciones específicas.

---

## Tabla de eventos en templates

| Template | Evento | Handler | Resultado |
|----------|--------|---------|-----------|
| `accordion.html` | `(click)` | `toggle(item.id)` | Expande/colapsa sección |
| `accordion.html` | `(keydown)` | `onHeaderKeydown($event, i, item.id)` | Navegación ArrowUp/Down/Home/End |
| `accordion.html` | `(focus)` | `onHeaderFocus(i)` | Actualiza índice enfocado |
| `tabs.html` | `(click)` | `selectTab(tab.id)` | Selecciona pestaña |
| `tabs.html` | `(keydown)` | `onTabKeydown($event, i)` | Navegación ArrowLeft/Right/Home/End |
| `tabs.html` | `(focus)` | `onTabFocus(i)` | Actualiza índice enfocado |
| `modal.html` | `(click)` overlay | `onOverlayClick($event)` | Cierra modal |
| `modal.html` | `(click)` content | `onContentClick($event)` | stopPropagation |
| `header.html` | `(click)` | `toggleMenu()` | Abre/cierra menú móvil |
| `header.html` | `(click)` | `toggleTheme()` | Cambia tema claro/oscuro |

---

## Tabla HostListener global

| Componente | Evento global | Función | Descripción |
|------------|---------------|---------|-------------|
| `Modal` | `document:keydown.escape` | `onEscapeKey()` | Cierra modal con ESC |
| `Modal` | `keydown` (Tab) | `onKeydown($event)` | Focus trap dentro del modal |
| `Header` | `document:keydown.escape` | `onEscapeKey()` | Cierra menú móvil con ESC |
| `Header` | `document:click` | `onDocumentClick($event)` | Cierra menú al click fuera |
| `Tooltip` | `mouseenter` | `onMouseEnter()` | Muestra tooltip |
| `Tooltip` | `mouseleave` | `onMouseLeave()` | Oculta tooltip |
| `Tooltip` | `focusin` | `onFocusIn()` | Muestra tooltip (accesibilidad) |
| `Tooltip` | `focusout` | `onFocusOut()` | Oculta tooltip |
| `ResponsiveTabs` | `window:resize` | `onResize()` | Detecta cambio viewport |

---

## Componentes interactivos

### Menú hamburguesa (layout)
El menú móvil se gestiona desde `Header` con estado reactivo (`signal`) y se cierra en dos escenarios:
- Al pulsar `ESC`.
- Al hacer click fuera del contenedor del menú móvil.

### Modales
El layout integra tres modales (login/register/forgot-password) con las siguientes mejoras de accesibilidad:
- **Focus restore**: Al cerrar, el foco vuelve al elemento que abrió el modal.
- **Focus trap**: Tab/Shift+Tab navegan solo dentro del modal.
- **stopPropagation**: Clicks en el contenido no cierran el modal.
- Cierre con ESC y click en overlay.

### Acordeones
El acordeón soporta navegación completa por teclado:
- **ArrowUp/ArrowDown**: Navegar entre headers (con wrap-around).
- **Home/End**: Ir al primer/último header.
- **Enter/Space**: Toggle del item.
- **Roving tabindex**: Solo el header enfocado tiene tabindex=0.

Modos soportados:
- `single`: solo una sección abierta.
- `multiple`: varias secciones abiertas simultáneamente.

### Tabs
Las pestañas implementan el patrón WAI-ARIA:
- **role="tablist"** en el contenedor.
- **role="tab"** en cada botón.
- **aria-selected** indica el tab activo.
- **ArrowLeft/ArrowRight**: Navegar entre tabs.
- **Home/End**: Ir al primer/último tab habilitado.
- Salta automáticamente tabs deshabilitados.

### Tooltips
Los tooltips son accesibles por teclado:
- **focusin/focusout**: Mismo comportamiento que hover.
- **aria-describedby**: Vincula contenido con tooltip.
- **role="tooltip"** para identificación.
- Delays configurables para mejor UX.

---

## Theme Switcher
El cambio de tema se centraliza en `ThemeService`, que cubre:
- Preferencia del sistema con `matchMedia(prefers-color-scheme)`.
- Toggle manual entre claro/oscuro.
- Persistencia en `localStorage`.
- Aplicación del atributo `data-theme="dark"` en `document.documentElement` para activar el tema.

```ts
detectSystemPreference(): Theme {
  const prefersDark = window.matchMedia('(prefers-color-scheme: dark)');
  return prefersDark.matches ? 'dark' : 'light';
}

toggleTheme(): void {
  const newTheme: Theme = this.currentTheme() === 'light' ? 'dark' : 'light';
  this.setTheme(newTheme);
  this.saveToLocalStorage(newTheme);
}
```

---

## Arquitectura de eventos (README técnico)
Para mantener consistencia y evitar duplicidad de lógica:
- Los componentes encapsulan su comportamiento (ej. `Modal` maneja ESC/overlay/focus).
- El layout orquesta estado y composición (ej. `Header` decide qué modal está abierto).
- Los componentes con interacción avanzada limpian listeners en `ngOnDestroy` para evitar memory leaks.

### Diagrama de flujo de eventos

```
┌─────────────────────────────────────────────────────────────────────────┐
│                        FLUJO DE EVENTOS                                 │
├─────────────────────────────────────────────────────────────────────────┤
│                                                                         │
│  USUARIO                                                                │
│     │                                                                   │
│     ▼                                                                   │
│  ┌──────────────────┐                                                   │
│  │   Evento DOM     │  click, keydown, focus, mouseenter...            │
│  └────────┬─────────┘                                                   │
│           │                                                             │
│           ▼                                                             │
│  ┌──────────────────┐                                                   │
│  │  Template HTML   │  (click)="handler($event)"                       │
│  │  Event Binding   │  (keydown.enter)="submit()"                      │
│  └────────┬─────────┘                                                   │
│           │                                                             │
│           ▼                                                             │
│  ┌──────────────────┐                                                   │
│  │  Componente TS   │  Handler procesa evento                          │
│  │  (Handler)       │  Valida, transforma datos                        │
│  └────────┬─────────┘                                                   │
│           │                                                             │
│           ▼                                                             │
│  ┌──────────────────┐                                                   │
│  │  Estado (Signal) │  signal.set(), signal.update()                   │
│  │  o Servicio      │  service.method()                                │
│  └────────┬─────────┘                                                   │
│           │                                                             │
│           ▼                                                             │
│  ┌──────────────────┐                                                   │
│  │  Vista (DOM)     │  Actualización reactiva automática               │
│  │  Actualizada     │  Change Detection de Angular                     │
│  └──────────────────┘                                                   │
│                                                                         │
└─────────────────────────────────────────────────────────────────────────┘
```

### Leyenda del diagrama

| Elemento | Descripción |
|----------|-------------|
| **Usuario** | Interactúa con la interfaz mediante ratón, teclado o touch |
| **Evento DOM** | Evento nativo del navegador capturado por Angular |
| **Template** | Binding de evento en HTML con sintaxis `(evento)` |
| **Componente** | Clase TypeScript que procesa el evento |
| **Estado** | Signals o servicios que almacenan datos reactivos |
| **Vista** | DOM actualizado automáticamente por Angular |

---

## Compatibilidad navegadores (eventos/APIs usados)

| Evento / API | Chrome | Firefox | Edge | Safari | Versión mínima | Uso |
|---|:---:|:---:|:---:|:---:|---|---|
| click | ✅ | ✅ | ✅ | ✅ | Todos | Menús, tabs, modales, theme toggle |
| mouseenter / mouseleave | ✅ | ✅ | ✅ | ✅ | Todos | Tooltip |
| focusin / focusout | ✅ | ✅ | ✅ | ✅ | Todos | Tooltip accesible |
| document:click | ✅ | ✅ | ✅ | ✅ | Todos | Click fuera (menú) |
| document:keydown.escape | ✅ | ✅ | ✅ | ✅ | Todos | Cierre por ESC |
| keydown (Tab) | ✅ | ✅ | ✅ | ✅ | Todos | Trap focus modal |
| keydown (Arrows) | ✅ | ✅ | ✅ | ✅ | Todos | Navegación accordion/tabs |
| mousedown/move/up | ✅ | ✅ | ✅ | ✅ | Todos | Drag-to-scroll tabs |
| wheel + passive:false | ✅ | ✅ | ✅ | ✅ | Todos | Scroll horizontal tabs |
| matchMedia | ✅ | ✅ | ✅ | ✅ | Chrome 9+ | Tema por sistema |
| localStorage | ✅ | ✅ | ✅ | ✅ | Todos | Persistencia tema |
| ResizeObserver | ✅ | ✅ | ✅ | ✅ | Chrome 64+ | Carousel responsive |
| IntersectionObserver | ✅ | ✅ | ✅ | ✅ | Chrome 51+ | Infinite scroll |

### Fallbacks

- **ResizeObserver**: Si no está disponible, se usa `window.resize` como fallback.
- **IntersectionObserver**: Polyfill disponible para navegadores antiguos.
- **CSS animations**: Degradación graceful a transiciones simples.