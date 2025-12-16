import {
  Component,
  input,
  signal,
  HostListener,
  ViewChild,
  ElementRef,
  AfterViewInit,
  OnDestroy,
  Renderer2,
  inject
} from '@angular/core';
import { CommonModule } from '@angular/common';

/**
 * Representa la estructura de datos para una pestaña individual.
 */
export interface Tab {
  /** Identificador único del tab (string o número). */
  id: string | number;
  /** Texto a mostrar en el botón de la pestaña. */
  label: string;
  /** Contenido asociado a la pestaña (puede ser HTML o texto plano según implementación). */
  content: string;
  /** Si es true, la pestaña aparecerá deshabilitada y no será clicable. */
  disabled?: boolean;
}

/**
 * Componente de pestañas reutilizable con soporte para navegación por teclado,
 * arrastre lateral (drag-to-scroll) y rueda del ratón.
 *
 * @example
 * <app-tabs [tabs]="myTabs" [initialActiveTab]="1"></app-tabs>
 */
@Component({
  selector: 'app-tabs',
  imports: [CommonModule],
  templateUrl: './tabs.html',
  styleUrl: './tabs.scss',
})
export class Tabs implements AfterViewInit, OnDestroy {
  // ========================================================================
  // INPUTS & STATE
  // ========================================================================

  /** Signal Input: Lista de pestañas a renderizar. Requerido. */
  tabs = input.required<Tab[]>();

  /** Signal Input: ID de la pestaña que debe estar activa al inicio. Opcional. */
  initialActiveTab = input<string | number | undefined>(undefined);

  /** Signal: Almacena el ID de la pestaña actualmente activa. */
  activeTabId = signal<string | number | null>(null);

  // ========================================================================
  // DOM ELEMENTS & SCROLL LOGIC
  // ========================================================================

  /** Referencia al contenedor de navegación para manipular el scroll nativo. */
  @ViewChild('tabsNav') tabsNav!: ElementRef<HTMLElement>;

  /** Inyectamos Renderer2 para añadir listeners de forma segura (best practice en Angular). */
  private renderer = inject(Renderer2);

  /** Almacena las funciones de limpieza de los event listeners para evitar memory leaks. */
  private listeners: (() => void)[] = [];

  // Variables de estado para la lógica de "drag-to-scroll"
  private isDown = false;       // ¿El botón del ratón está presionado?
  private startX = 0;           // Posición X inicial del ratón al hacer click
  private scrollLeft = 0;       // Posición de scroll inicial al hacer click
  private isDragging = false;   // ¿Se considera que el usuario está arrastrando? (vs click simple)

  // ========================================================================
  // LIFECYCLE HOOKS
  // ========================================================================

  constructor() {
    // Inicialización de la pestaña activa.
    // Usamos setTimeout para asegurar que los Inputs ya estén resueltos.
    setTimeout(() => {
      this.initializeActiveTab();
    });
  }

  /**
   * Configura los eventos nativos del DOM una vez que la vista está inicializada.
   * Se usa para la lógica de scroll que no es fácil de manejar solo con templates.
   */
  ngAfterViewInit() {
    this.setupScrollBehavior();
  }

  /**
   * Limpia los event listeners cuando el componente se destruye.
   */
  ngOnDestroy() {
    this.listeners.forEach(unlisten => unlisten());
  }

  // ========================================================================
  // PUBLIC API (MÉTODOS USADOS EN EL TEMPLATE)
  // ========================================================================

  /**
   * Cambia la pestaña activa.
   * @param tabId - El ID de la pestaña a seleccionar.
   */
  selectTab(tabId: string | number) {
    // Si el usuario estaba arrastrando, ignoramos el evento click final para no cambiar de tab accidentalmente.
    if (this.isDragging) return;

    const tab = this.tabs().find(t => t.id === tabId);
    if (tab && !tab.disabled) {
      this.activeTabId.set(tabId);
    }
  }

  /**
   * Comprueba si una pestaña específica está activa.
   * @param tabId - El ID de la pestaña a verificar.
   */
  isActive(tabId: string | number): boolean {
    return this.activeTabId() === tabId;
  }

  /**
   * Devuelve el contenido de la pestaña activa actual.
   */
  getActiveContent(): string {
    const activeId = this.activeTabId();
    const activeTab = this.tabs().find(t => t.id === activeId);
    return activeTab?.content || '';
  }

  // ========================================================================
  // PRIVATE METHODS & LOGIC
  // ========================================================================

  /**
   * Lógica inicial para determinar qué pestaña mostrar primero.
   */
  private initializeActiveTab() {
    const initial = this.initialActiveTab();
    const tabsList = this.tabs();

    if (initial !== undefined) {
      this.activeTabId.set(initial);
    } else if (tabsList.length > 0) {
      // Si no hay initial, activamos la primera que no esté deshabilitada
      const firstEnabled = tabsList.find(t => !t.disabled);
      if (firstEnabled) {
        this.activeTabId.set(firstEnabled.id);
      }
    }
  }

  /**
   * Configura todos los listeners para drag-to-scroll y wheel-scroll.
   */
  private setupScrollBehavior() {
    if (!this.tabsNav) return;
    const slider = this.tabsNav.nativeElement;

    // 1. MOUSEDOWN: Inicia el proceso de arrastre
    this.listeners.push(this.renderer.listen(slider, 'mousedown', (e: MouseEvent) => {
      this.isDown = true;
      this.isDragging = false; // Reseteamos flag
      slider.classList.add('active'); // Clase visual para cursor 'grabbing'
      this.startX = e.pageX - slider.offsetLeft;
      this.scrollLeft = slider.scrollLeft;
    }));

    // 2. MOUSELEAVE & MOUSEUP: Finaliza el arrastre
    const stopDragging = () => {
      this.isDown = false;
      slider.classList.remove('active');
      // Pequeño delay para evitar que el evento 'click' del botón se dispare inmediatamente si fue un arrastre
      setTimeout(() => this.isDragging = false, 50);
    };

    this.listeners.push(this.renderer.listen(slider, 'mouseleave', stopDragging));
    this.listeners.push(this.renderer.listen(slider, 'mouseup', stopDragging));

    // 3. MOUSEMOVE: Ejecuta el scroll mientras se arrastra
    this.listeners.push(this.renderer.listen(slider, 'mousemove', (e: MouseEvent) => {
      if (!this.isDown) return;

      e.preventDefault(); // Evita selección de texto y comportamientos nativos
      const x = e.pageX - slider.offsetLeft;
      const walk = (x - this.startX) * 2; // Velocidad de desplazamiento (* 2 para que sea más ágil)
      slider.scrollLeft = this.scrollLeft - walk;

      // Si nos hemos movido más de 5px, confirmamos que es una intención de arrastre
      if (Math.abs(walk) > 5) {
        this.isDragging = true;
      }
    }));

    // 4. WHEEL: Convierte scroll vertical en horizontal
    // Nota: Usamos addEventListener nativo aquí porque necesitamos { passive: false }
    const wheelHandler = (e: WheelEvent) => {
      // Solo intervenimos si el movimiento es vertical (deltaY)
      if (Math.abs(e.deltaY) > Math.abs(e.deltaX)) {
        e.preventDefault(); // Bloquea el scroll de la página
        slider.scrollLeft += e.deltaY; // Aplica el movimiento al eje horizontal
      }
    };

    slider.addEventListener('wheel', wheelHandler, { passive: false });

    // Guardamos la función de limpieza manual para el evento wheel
    this.listeners.push(() => {
      slider.removeEventListener('wheel', wheelHandler);
    });
  }

  // ========================================================================
  // KEYBOARD NAVIGATION
  // ========================================================================

  @HostListener('keydown.arrowleft')
  onArrowLeft() {
    this.navigateTabs(-1);
  }

  @HostListener('keydown.arrowright')
  onArrowRight() {
    this.navigateTabs(1);
  }

  /**
   * Lógica centralizada para navegación circular (wrap-around) saltando deshabilitados.
   * @param direction - 1 para siguiente, -1 para anterior.
   */
  private navigateTabs(direction: number) {
    const tabsList = this.tabs();
    const currentId = this.activeTabId();
    const currentIndex = tabsList.findIndex(t => t.id === currentId);

    if (currentIndex === -1) return;

    let nextIndex = currentIndex + direction;

    // Wrap-around logic
    if (nextIndex < 0) nextIndex = tabsList.length - 1;
    if (nextIndex >= tabsList.length) nextIndex = 0;

    // Skip disabled tabs
    let attempts = 0;
    while (tabsList[nextIndex]?.disabled && attempts < tabsList.length) {
      nextIndex += direction;
      if (nextIndex < 0) nextIndex = tabsList.length - 1;
      if (nextIndex >= tabsList.length) nextIndex = 0;
      attempts++;
    }

    if (!tabsList[nextIndex]?.disabled) {
      this.selectTab(tabsList[nextIndex].id);
      // Opcional: Hacer focus en el botón del tab nuevo para accesibilidad
      // this.focusTab(tabsList[nextIndex].id);
    }
  }
}
