import {
  Component,
  ContentChildren,
  QueryList,
  AfterContentInit,
  signal,
  input,
  ViewChild,
  ElementRef,
  AfterViewInit,
  OnDestroy,
  Renderer2,
  inject
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { TabPanel } from './tab-panel';

/**
 * TabGroup - Contenedor de pestañas con proyección de contenido
 *
 * A diferencia del componente Tabs original que usa strings,
 * este componente permite proyectar contenido HTML complejo
 * usando TabPanel como hijos.
 *
 * CARACTERÍSTICAS:
 * - Proyección de contenido con ng-content
 * - Flex-wrap en navegación para muchas pestañas
 * - Navegación por teclado (arrows)
 * - Drag-to-scroll en navegación
 *
 * @example
 * ```html
 * <app-tab-group>
 *   <app-tab-panel id="tab1" label="Primera">
 *     <h3>Contenido complejo</h3>
 *     <app-button>Botón dentro del tab</app-button>
 *   </app-tab-panel>
 *   <app-tab-panel id="tab2" label="Segunda">
 *     <p>Más contenido...</p>
 *   </app-tab-panel>
 * </app-tab-group>
 * ```
 */
@Component({
  selector: 'app-tab-group',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './tab-group.html',
  styleUrl: './tab-group.scss'
})
export class TabGroup implements AfterContentInit, AfterViewInit, OnDestroy {

  /** Query de todos los TabPanel hijos */
  @ContentChildren(TabPanel) tabPanels!: QueryList<TabPanel>;

  /** Referencia al contenedor de navegación */
  @ViewChild('tabsNav') tabsNav!: ElementRef<HTMLElement>;

  /** ID de la pestaña activa inicialmente */
  initialActiveTab = input<string | undefined>(undefined);

  /** Modo de layout: 'wrap' permite flex-wrap, 'scroll' usa scroll horizontal */
  layoutMode = input<'wrap' | 'scroll'>('wrap');

  /** Signal: ID del tab activo */
  activeTabId = signal<string>('');

  /** Lista de tabs para el template */
  tabs = signal<{ id: string; label: string; disabled: boolean }[]>([]);

  private renderer = inject(Renderer2);
  private listeners: (() => void)[] = [];

  // Variables para drag-to-scroll
  private isDown = false;
  private startX = 0;
  private scrollLeft = 0;
  private isDragging = false;

  ngAfterContentInit() {
    this.initializeTabs();

    // Escuchar cambios en los tabs (añadir/eliminar dinámicamente)
    this.tabPanels.changes.subscribe(() => {
      this.initializeTabs();
    });
  }

  ngAfterViewInit() {
    if (this.layoutMode() === 'scroll') {
      this.setupScrollBehavior();
    }
  }

  ngOnDestroy() {
    this.listeners.forEach(unlisten => unlisten());
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
    } else if (panels.length > 0) {
      const firstEnabled = panels.find(p => !p.disabled());
      if (firstEnabled) {
        this.activeTabId.set(firstEnabled.id());
      }
    }
  }

  /**
   * Seleccionar una pestaña
   */
  selectTab(tabId: string) {
    if (this.isDragging) return;

    const tab = this.tabs().find(t => t.id === tabId);
    if (tab && !tab.disabled) {
      this.activeTabId.set(tabId);
    }
  }

  /**
   * Verificar si una pestaña está activa
   */
  isActive(tabId: string): boolean {
    return this.activeTabId() === tabId;
  }

  /**
   * Verificar si un panel debe mostrarse
   */
  isPanelActive(panelId: string): boolean {
    return this.activeTabId() === panelId;
  }

  /**
   * Configura el comportamiento de scroll horizontal
   */
  private setupScrollBehavior() {
    if (!this.tabsNav) return;
    const slider = this.tabsNav.nativeElement;

    // Mousedown
    this.listeners.push(this.renderer.listen(slider, 'mousedown', (e: MouseEvent) => {
      this.isDown = true;
      this.isDragging = false;
      slider.classList.add('active');
      this.startX = e.pageX - slider.offsetLeft;
      this.scrollLeft = slider.scrollLeft;
    }));

    // Mouseleave & Mouseup
    const stopDragging = () => {
      this.isDown = false;
      slider.classList.remove('active');
      setTimeout(() => this.isDragging = false, 50);
    };

    this.listeners.push(this.renderer.listen(slider, 'mouseleave', stopDragging));
    this.listeners.push(this.renderer.listen(slider, 'mouseup', stopDragging));

    // Mousemove
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

    // Wheel scroll horizontal
    const wheelHandler = (e: WheelEvent) => {
      if (Math.abs(e.deltaY) > Math.abs(e.deltaX)) {
        e.preventDefault();
        slider.scrollLeft += e.deltaY;
      }
    };
    slider.addEventListener('wheel', wheelHandler, { passive: false });
    this.listeners.push(() => slider.removeEventListener('wheel', wheelHandler));
  }
}
