# Arquitectura de Eventos y Manipulación del DOM

## Fecha: 15 de diciembre de 2025

Este documento describe la arquitectura de eventos y manipulación del DOM implementada en la Fase 1 del proyecto Disc and Records.

---

## 📋 Índice

1. [Resumen Ejecutivo](#resumen-ejecutivo)
2. [Patterns Implementados](#patterns-implementados)
3. [Sistema de Eventos](#sistema-de-eventos)
4. [Manipulación del DOM](#manipulación-del-dom)
5. [Componentes Interactivos](#componentes-interactivos)
6. [Gestión de Estado](#gestión-de-estado)
7. [Ejemplos de Código](#ejemplos-de-código)

---

## Resumen Ejecutivo

El proyecto implementa una arquitectura moderna de eventos basada en **Angular Signals** para gestión de estado reactivo, **@HostListener** para eventos globales, y **ViewChild/ElementRef** para acceso directo al DOM.

### Características clave:
- ✅ Sistema de eventos reactivo con Angular Signals
- ✅ Manipulación directa del DOM cuando es necesario
- ✅ Componentes interactivos accesibles (teclado, mouse, touch)
- ✅ Gestión avanzada de eventos (preventDefault, stopPropagation)
- ✅ Theme switcher con persistencia en localStorage

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

### 3. **ViewChild/ElementRef for DOM Access**

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
- ✅ Navegación por teclado en todos los componentes
- ✅ Trap focus en modales
- ✅ Aria labels en botones
- ✅ ESC cierra elementos interactivos

### 2. Performance
- ✅ Signals en lugar de change detection tradicional
- ✅ Debounce/throttle en eventos frecuentes (scroll)
- ✅ Lazy loading de componentes pesados
- ✅ Cleanup de event listeners en ngOnDestroy

### 3. Mantenibilidad
- ✅ Separación de concerns (services vs components)
- ✅ Código DRY (servicios reutilizables)
- ✅ TypeScript estricto
- ✅ Naming conventions consistentes

---

## Conclusión

Esta arquitectura de eventos proporciona una base sólida para aplicaciones Angular modernas, combinando lo mejor de:

- **Reactividad:** Con Angular Signals
- **Control:** Con acceso directo al DOM cuando es necesario
- **Accesibilidad:** Con soporte completo de teclado
- **Performance:** Con técnicas optimizadas

El código es escalable, mantenible y sigue las mejores prácticas de Angular 18+.

---

**Última actualización:** 15 de diciembre de 2025  
**Autor:** Sergio  
**Versión:** 1.0
