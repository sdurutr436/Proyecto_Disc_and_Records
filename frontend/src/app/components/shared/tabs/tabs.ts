import { Component, input, output, ViewChild, ViewChildren, QueryList, ElementRef, AfterViewInit, OnDestroy, Renderer2, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LucideAngularModule, Disc3, LayoutGrid } from 'lucide-angular';

/**
 * Representa la estructura de datos para una pestaña individual.
 */
export interface Tab {
  /** Identificador único del tab (string o número). */
  id: string | number;
  /** Texto a mostrar en el botón de la pestaña. */
  label: string;
  /** Nombre del icono Lucide (opcional). */
  icon?: string;
  /** Si es true, la pestaña aparecerá deshabilitada y no será clicable. */
  disabled?: boolean;
}

/**
 * Componente de pestañas reutilizable simplificado.
 * Basado en el diseño neobrutalista usado en el panel de Admin.
 * Soporta scroll horizontal con rueda del ratón y drag-to-scroll.
 *
 * BLOQUE 3.4 - TABS ACCESIBLES:
 * - Navegación por teclado: ArrowLeft, ArrowRight, Home, End
 * - Roles ARIA: tablist, tab, aria-selected, aria-controls
 * - Roving tabindex para gestión de foco
 * - Transición visual al cambiar de tab
 *
 * EVENTOS SOPORTADOS (BLOQUE 2.2):
 * - (keydown.arrowleft): Navegar al tab anterior
 * - (keydown.arrowright): Navegar al tab siguiente
 * - (keydown.home): Ir al primer tab
 * - (keydown.end): Ir al último tab
 *
 * @example
 * <app-tabs
 *   [tabs]="myTabs"
 *   [activeTabId]="currentTab()"
 *   (tabChange)="handleTabChange($event)"
 * />
 */
@Component({
  selector: 'app-tabs',
  imports: [CommonModule, LucideAngularModule],
  templateUrl: './tabs.html',
  styleUrl: './tabs.scss',
  standalone: true
})
export class Tabs implements AfterViewInit, OnDestroy {
  private renderer = inject(Renderer2);
  private listeners: (() => void)[] = [];

  // Variables para drag-to-scroll
  private isDown = false;
  private startX = 0;
  private scrollLeft = 0;
  private isDragging = false;

  /**
   * MEJORA 1.1: ViewChild para el contenedor de navegación
   * Usado para scroll horizontal y drag-to-scroll
   */
  @ViewChild('tabsNav') tabsNav!: ElementRef<HTMLElement>;

  /**
   * MEJORA 1.1: ViewChildren para referencias a los botones de tabs
   * Usado para navegación por teclado y gestión de foco
   */
  @ViewChildren('tabButton') tabButtons!: QueryList<ElementRef<HTMLButtonElement>>;

  // ========================================================================
  // INPUTS & OUTPUTS
  // ========================================================================

  /** Signal Input: Lista de pestañas a renderizar. Requerido. */
  tabs = input.required<Tab[]>();

  /** Signal Input: ID de la pestaña actualmente activa. Requerido. */
  activeTabId = input.required<string | number>();

  /** Output: Emite cuando el usuario cambia de pestaña. */
  tabChange = output<string | number>();

  /**
   * Índice del tab actualmente enfocado (para roving tabindex)
   */
  focusedIndex = signal<number>(0);

  // ========================================================================
  // LIFECYCLE
  // ========================================================================

  ngAfterViewInit() {
    this.setupScrollBehavior();
    // Sincronizar focusedIndex con el tab activo
    this.syncFocusWithActive();
  }

  ngOnDestroy() {
    this.listeners.forEach(unlisten => unlisten());
  }

  // ========================================================================
  // PUBLIC METHODS
  // ========================================================================

  /**
   * Maneja el click en una pestaña.
   * @param tabId - El ID de la pestaña seleccionada.
   */
  selectTab(tabId: string | number) {
    // No seleccionar si estamos arrastrando
    if (this.isDragging) return;

    const tab = this.tabs().find(t => t.id === tabId);
    if (tab && !tab.disabled) {
      this.tabChange.emit(tabId);
    }
  }

  /**
   * Comprueba si una pestaña específica está activa.
   * @param tabId - El ID de la pestaña a verificar.
   */
  isActive(tabId: string | number): boolean {
    return this.activeTabId() === tabId;
  }

  // ========================================================================
  // BLOQUE 2.2 & 3.4: NAVEGACIÓN POR TECLADO
  // ========================================================================

  /**
   * Handler para eventos de teclado en tabs
   * Implementa navegación accesible según WAI-ARIA Authoring Practices
   */
  onTabKeydown(event: KeyboardEvent, index: number): void {
    const enabledTabs = this.getEnabledTabsIndices();
    if (enabledTabs.length === 0) return;

    switch (event.key) {
      case 'ArrowLeft':
        // preventDefault evita scroll horizontal de la página
        event.preventDefault();
        this.navigateTabs(-1, index, enabledTabs);
        break;
      case 'ArrowRight':
        // preventDefault evita scroll horizontal de la página
        event.preventDefault();
        this.navigateTabs(1, index, enabledTabs);
        break;
      case 'Home':
        // Ir al primer tab habilitado
        event.preventDefault();
        this.focusAndSelectTab(enabledTabs[0]);
        break;
      case 'End':
        // Ir al último tab habilitado
        event.preventDefault();
        this.focusAndSelectTab(enabledTabs[enabledTabs.length - 1]);
        break;
    }
  }

  /**
   * Navegar entre tabs, saltando los deshabilitados
   * @param direction - Dirección (-1 para izquierda, 1 para derecha)
   */
  private navigateTabs(direction: number, currentIndex: number, enabledTabs: number[]): void {
    const currentEnabledIndex = enabledTabs.indexOf(currentIndex);
    if (currentEnabledIndex === -1) return;

    // Calcular nuevo índice con wrap-around
    let newEnabledIndex = currentEnabledIndex + direction;
    if (newEnabledIndex < 0) {
      newEnabledIndex = enabledTabs.length - 1;
    } else if (newEnabledIndex >= enabledTabs.length) {
      newEnabledIndex = 0;
    }

    this.focusAndSelectTab(enabledTabs[newEnabledIndex]);
  }

  /**
   * Enfocar y seleccionar un tab por índice
   */
  private focusAndSelectTab(index: number): void {
    const buttons = this.tabButtons?.toArray();
    if (!buttons?.length || index < 0 || index >= buttons.length) return;

    const tab = this.tabs()[index];
    if (tab && !tab.disabled) {
      this.focusedIndex.set(index);
      buttons[index].nativeElement.focus();
      this.tabChange.emit(tab.id);
    }
  }

  /**
   * Obtener índices de tabs habilitados
   */
  private getEnabledTabsIndices(): number[] {
    return this.tabs()
      .map((tab, index) => ({ tab, index }))
      .filter(({ tab }) => !tab.disabled)
      .map(({ index }) => index);
  }

  /**
   * Sincronizar focusedIndex con el tab activo
   */
  private syncFocusWithActive(): void {
    const activeIndex = this.tabs().findIndex(t => t.id === this.activeTabId());
    if (activeIndex >= 0) {
      this.focusedIndex.set(activeIndex);
    }
  }

  /**
   * Handler cuando un tab recibe foco
   */
  onTabFocus(index: number): void {
    this.focusedIndex.set(index);
  }

  /**
   * Obtener tabindex para roving tabindex pattern
   */
  getTabIndex(index: number): number {
    // El tab activo o el enfocado tiene tabindex 0, los demás -1
    const isActiveTab = this.tabs()[index]?.id === this.activeTabId();
    return isActiveTab ? 0 : -1;
  }

  // ========================================================================
  // PRIVATE METHODS - Scroll Behavior
  // ========================================================================

  /**
   * Configura el comportamiento de scroll horizontal con rueda y drag
   */
  private setupScrollBehavior() {
    if (!this.tabsNav) return;
    const slider = this.tabsNav.nativeElement;

    // Scroll horizontal con rueda del ratón (vertical -> horizontal)
    this.listeners.push(this.renderer.listen(slider, 'wheel', (e: WheelEvent) => {
      // Si hay scroll horizontal posible, convertir scroll vertical a horizontal
      if (slider.scrollWidth > slider.clientWidth) {
        e.preventDefault();
        slider.scrollLeft += e.deltaY;
      }
    }));

    // Drag-to-scroll con ratón
    // MEJORA 1.2: Usamos Renderer2.addClass para manipular clases de forma segura (SSR-compatible)
    this.listeners.push(this.renderer.listen(slider, 'mousedown', (e: MouseEvent) => {
      this.isDown = true;
      this.isDragging = false;
      this.renderer.addClass(slider, 'tabs--grabbing');
      this.startX = e.pageX - slider.offsetLeft;
      this.scrollLeft = slider.scrollLeft;
    }));

    // MEJORA 1.2: Usamos Renderer2.removeClass para quitar clases de forma segura
    const stopDragging = () => {
      this.isDown = false;
      this.renderer.removeClass(slider, 'tabs--grabbing');
      setTimeout(() => this.isDragging = false, 50);
    };

    this.listeners.push(this.renderer.listen(slider, 'mouseleave', stopDragging));
    this.listeners.push(this.renderer.listen(slider, 'mouseup', stopDragging));

    this.listeners.push(this.renderer.listen(slider, 'mousemove', (e: MouseEvent) => {
      if (!this.isDown) return;
      e.preventDefault();
      const x = e.pageX - slider.offsetLeft;
      const walk = (x - this.startX) * 2;
      slider.scrollLeft = this.scrollLeft - walk;
      if (Math.abs(walk) > 5) {
        this.isDragging = true;
      }
    }));
  }
}
