# Fase 1 - Manipulación del DOM y eventos (Frontend)

> **Proyecto:** Discs & Records
> **Tipo:** Aplicación web estilo Letterboxd para música
> **Fecha:** 17 de diciembre de 2025

---

## Manipulación del DOM en componentes
En el frontend (Angular), la manipulación del DOM se concentra en componentes UI reutilizables donde se necesita scroll nativo, control de foco o estados visuales reactivos.
Los ejemplos siguientes muestran acceso al DOM con `ViewChild`/`ElementRef` y cambios puntuales en estilos/atributos cuando el comportamiento lo requiere.

### Acceso al DOM con ViewChild y ElementRef
El componente `Tabs` obtiene una referencia al contenedor de navegación para controlar su scroll horizontal (drag-to-scroll y wheel).
```ts
@ViewChild('tabsNav') tabsNav!: ElementRef<HTMLElement>;
```

### Modificación dinámica de propiedades/estilos
En el carrusel se aplican estilos de forma dinámica cuando la UI lo necesita (por ejemplo, un highlight temporal o cambios de opacidad).
Este patrón se usa de manera limitada y controlada, priorizando el renderizado declarativo de Angular.

## Creación y eliminación programática (toasts)
El sistema de notificaciones crea componentes en tiempo de ejecución y los inserta directamente en `document.body`, retirándolos cuando el componente emite `dismissed` (patrón típico de *toast*). [file:9]

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

---

## Sistema de eventos
La interacción se implementa combinando:
- Event binding en templates (principalmente `click`).
- `@HostListener` para eventos a nivel de componente o documento (ESC, click fuera, hover).
- Listeners controlados con `Renderer2.listen`/`addEventListener` cuando se necesita scroll/drag con configuraciones específicas (por ejemplo `{ passive: false }`).

### Eventos de teclado
Los modales se cierran con `ESC` desde el propio componente `Modal`, evitando duplicar la lógica en el layout.
```ts
@HostListener('document:keydown.escape')
onEscapeKey() {
  if (this.isVisible()) {
    this.close();
  }
}
```

El componente `Tabs` permite navegación por teclado (flecha izquierda/derecha), delegando la lógica en un método común que hace wrap-around y salta pestañas deshabilitadas.
```ts
@HostListener('keydown.arrowleft')
onArrowLeft() { this.navigateTabs(-1); }

@HostListener('keydown.arrowright')
onArrowRight() { this.navigateTabs(1); }
```

### Eventos de mouse
El tooltip se muestra/oculta con hover y permite delays configurables para mejorar la experiencia (evita parpadeos).
```ts
@HostListener('mouseenter')
onMouseEnter() {
  this.showTimeout = setTimeout(() => this.isVisible.set(true), this.showDelay());
}

@HostListener('mouseleave')
onMouseLeave() {
  this.hideTimeout = setTimeout(() => this.isVisible.set(false), this.hideDelay());
}
```

### Prevenir comportamiento por defecto
En `Tabs` se usa `preventDefault()` para dos casos típicos:
- Evitar selección de texto durante drag-to-scroll.
- Bloquear el scroll vertical de la página cuando se traduce `wheel` vertical a scroll horizontal.

```ts
// Dentro de mousemove durante drag
e.preventDefault();

// Wheel handler con passive:false
e.preventDefault();
slider.scrollLeft += e.deltaY;
```

---

## Componentes interactivos
### Menú hamburguesa (layout)
El menú móvil se gestiona desde `Header` con estado reactivo (`signal`) y se cierra en dos escenarios:
- Al pulsar `ESC`.
- Al hacer click fuera del contenedor del menú móvil.

### Modales
El layout integra tres modales (login/register/forgot-password) y delega el comportamiento de cierre en el propio componente `Modal` (overlay + ESC) mediante `onClose`.
Además, el modal bloquea el scroll del body mientras está abierto para evitar scroll del contenido de fondo.

### Acordeones
El acordeón soporta dos modos:
- `single`: solo una sección abierta.
- `multiple`: varias secciones abiertas simultáneamente.

```ts
toggle(itemId: string | number) {
  const currentOpen = new Set(this.openItems());
  if (currentOpen.has(itemId)) currentOpen.delete(itemId);
  else {
    if (this.mode() === 'single') currentOpen.clear();
    currentOpen.add(itemId);
  }
  this.openItems.set(currentOpen);
}
```

### Tabs
Las pestañas combinan interacción por click, navegación por teclado y scroll horizontal cuando el listado de tabs excede el ancho disponible (drag/wheel).

### Tooltips
Los tooltips se renderizan/ocultan por estado (`signal`) controlado por `mouseenter/mouseleave` con delays.

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
- Los componentes con interacción avanzada limpian listeners en `ngOnDestroy` para evitar memory leaks (ej. `Tabs`).

### Diagrama de flujo (eventos principales)
```mermaid
flowchart TD
  U[Usuario] -->|Click abrir modal| H[Header: activeModal]
  H -->|isOpen=true| M[Modal: open()]
  U -->|ESC| E[Modal: document keydown.escape]
  E -->|close + onClose.emit| H
  U -->|Hover| T[Tooltip: mouseenter/mouseleave]
  U -->|Wheel/Drag| TB[Tabs: listeners DOM]
  U -->|Toggle| TS[ThemeService]
```

### Compatibilidad navegadores (eventos/APIs usados)
| Evento / API | Chrome | Firefox | Edge | Safari | Uso |
|---|---:|---:|---:|---:|---|
| click | Sí | Sí | Sí | Sí | Menús, tabs, modales, theme toggle. |
| mouseenter / mouseleave | Sí | Sí | Sí | Sí | Tooltip. |
| document:click | Sí | Sí | Sí | Sí | Click fuera (menú). |
| document:keydown.escape | Sí | Sí | Sí | Sí | Cierre por ESC (menú/modal). |
| keydown (Tab) | Sí | Sí | Sí | Sí | Trap focus modal. |
| mousedown/mousemove/mouseup/mouseleave | Sí | Sí | Sí | Sí | Drag-to-scroll tabs. |
| wheel + passive:false | Sí | Sí | Sí | Sí | Scroll horizontal tabs. |
| matchMedia(prefers-color-scheme) | Sí | Sí | Sí | Sí | Tema por sistema. |
| localStorage | Sí | Sí | Sí | Sí | Persistencia tema. |