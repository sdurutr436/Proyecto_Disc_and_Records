import {
  Component,
  ContentChildren,
  QueryList,
  AfterContentInit,
  signal,
  input,
  HostListener,
  ViewChild,
  ElementRef,
  AfterViewInit,
  OnDestroy,
  Renderer2,
  inject,
  effect
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { TabPanel } from './tab-panel';

/**
 * ResponsiveTabs - Tabs en desktop, Accordion en móvil/tablet
 *
 * Componente que adapta su presentación según el viewport:
 * - Desktop (>768px): Muestra navegación por tabs con flex-wrap
 * - Tablet/Móvil (<=768px): Muestra accordion expandible
 *
 * @example
 * ```html
 * <app-responsive-tabs [breakpoint]="768">
 *   <app-tab-panel id="foundations" label="Fundamentos">
 *     <h3>Tipografía y colores</h3>
 *   </app-tab-panel>
 *   <app-tab-panel id="atoms" label="Átomos">
 *     <h3>Botones y badges</h3>
 *   </app-tab-panel>
 * </app-responsive-tabs>
 * ```
 */
@Component({
  selector: 'app-responsive-tabs',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './responsive-tabs.html',
  styleUrl: './responsive-tabs.scss'
})
export class ResponsiveTabs implements AfterContentInit, AfterViewInit, OnDestroy {

  /** Query de todos los TabPanel hijos */
  @ContentChildren(TabPanel) tabPanels!: QueryList<TabPanel>;

  /** Referencia al contenedor de navegación */
  @ViewChild('tabsNav') tabsNav!: ElementRef<HTMLElement>;

  /** Breakpoint para cambiar a accordion (en px) */
  breakpoint = input<number>(768);

  /** ID de la pestaña activa inicialmente */
  initialActiveTab = input<string | undefined>(undefined);

  /** Signal: modo actual (tabs o accordion) */
  displayMode = signal<'tabs' | 'accordion'>('tabs');

  /** Signal: ID del tab/accordion activo */
  activeTabId = signal<string>('');

  /** Signal: IDs de accordions abiertos (modo accordion permite múltiples) */
  openAccordions = signal<Set<string>>(new Set());

  /** Lista de tabs para el template */
  tabs = signal<{ id: string; label: string; disabled: boolean }[]>([]);

  private renderer = inject(Renderer2);
  private listeners: (() => void)[] = [];

  // Variables para drag-to-scroll
  private isDown = false;
  private startX = 0;
  private scrollLeft = 0;
  private isDragging = false;

  constructor() {
    this.checkViewport();

    // Effect para sincronizar la visibilidad de los paneles
    effect(() => {
      const mode = this.displayMode();
      const activeId = this.activeTabId();
      const openSet = this.openAccordions();

      // Sincronizar paneles
      this.syncPanelVisibility(mode, activeId, openSet);
    });
  }

  @HostListener('window:resize')
  onResize() {
    this.checkViewport();
  }

  ngAfterContentInit() {
    this.initializeTabs();

    this.tabPanels.changes.subscribe(() => {
      this.initializeTabs();
    });
  }

  ngAfterViewInit() {
    this.setupScrollBehavior();
  }

  ngOnDestroy() {
    this.listeners.forEach(unlisten => unlisten());
  }

  /**
   * Detecta el viewport y establece el modo de visualización
   */
  private checkViewport() {
    const isMobile = window.innerWidth <= this.breakpoint();
    this.displayMode.set(isMobile ? 'accordion' : 'tabs');
  }

  /**
   * Inicializa la lista de tabs desde los TabPanel proyectados
   */
  private initializeTabs() {
    const panels = this.tabPanels.toArray();

    this.tabs.set(panels.map(panel => ({
      id: panel.id(),
      label: panel.label(),
      disabled: panel.disabled()
    })));

    // Establecer tab activo inicial
    const initial = this.initialActiveTab();
    if (initial && panels.some(p => p.id() === initial)) {
      this.activeTabId.set(initial);
      // En modo accordion, también abrirlo
      this.openAccordions.update(set => {
        set.add(initial);
        return new Set(set);
      });
    } else if (panels.length > 0) {
      const firstEnabled = panels.find(p => !p.disabled());
      if (firstEnabled) {
        this.activeTabId.set(firstEnabled.id());
        this.openAccordions.update(set => {
          set.add(firstEnabled.id());
          return new Set(set);
        });
      }
    }

    // Sincronizar visibilidad de paneles despues del render
    setTimeout(() => {
      this.syncPanelVisibility(this.displayMode(), this.activeTabId(), this.openAccordions());
    }, 0);
  }

  /**
   * Seleccionar una pestana (modo tabs)
   */
  selectTab(tabId: string) {
    if (this.isDragging) return;

    const tab = this.tabs().find(t => t.id === tabId);
    if (tab && !tab.disabled) {
      this.activeTabId.set(tabId);
      // Sincronizar visibilidad inmediatamente
      this.syncPanelVisibility(this.displayMode(), tabId, this.openAccordions());
    }
  }

  /**
   * Toggle accordion (modo accordion) - SINGLE MODE
   * Solo permite una pestaña abierta a la vez
   */
  toggleAccordion(tabId: string) {
    const tab = this.tabs().find(t => t.id === tabId);
    if (!tab || tab.disabled) return;

    this.openAccordions.update(set => {
      if (set.has(tabId)) {
        // Si ya está abierto, cerrarlo
        set.delete(tabId);
      } else {
        // SINGLE MODE: Cerrar todos los demás y abrir solo este
        set.clear();
        set.add(tabId);
      }
      return new Set(set);
    });

    // También actualizar el tab activo
    this.activeTabId.set(tabId);
  }

  /**
   * Verificar si una pestaña está activa (modo tabs)
   */
  isActive(tabId: string): boolean {
    return this.activeTabId() === tabId;
  }

  /**
   * Verificar si un accordion está abierto (modo accordion)
   */
  isAccordionOpen(tabId: string): boolean {
    return this.openAccordions().has(tabId);
  }

  /**
   * Verificar si un panel debe mostrarse (depende del modo)
   */
  isPanelVisible(panelId: string): boolean {
    if (this.displayMode() === 'tabs') {
      return this.activeTabId() === panelId;
    } else {
      return this.openAccordions().has(panelId);
    }
  }

  /**
   * Configura el comportamiento de scroll horizontal (modo tabs)
   */
  private setupScrollBehavior() {
    if (!this.tabsNav) return;
    const slider = this.tabsNav.nativeElement;

    // Solo configurar si estamos en modo tabs
    if (this.displayMode() !== 'tabs') return;

    this.listeners.push(this.renderer.listen(slider, 'mousedown', (e: MouseEvent) => {
      this.isDown = true;
      this.isDragging = false;
      slider.classList.add('active');
      this.startX = e.pageX - slider.offsetLeft;
      this.scrollLeft = slider.scrollLeft;
    }));

    const stopDragging = () => {
      this.isDown = false;
      slider.classList.remove('active');
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

  /**
   * Sincroniza la visibilidad de los TabPanel según el modo y estado actual
   */
  private syncPanelVisibility(mode: 'tabs' | 'accordion', activeId: string, openSet: Set<string>): void {
    if (!this.tabPanels) return;

    this.tabPanels.forEach(panel => {
      if (mode === 'tabs') {
        // En modo tabs, solo el activo es visible
        panel.setActive(panel.id() === activeId);
      } else {
        // En modo accordion, los que estén en el set son visibles
        panel.setActive(openSet.has(panel.id()));
      }
    });
  }
}
