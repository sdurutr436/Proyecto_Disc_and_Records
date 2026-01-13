import { Component, input, output, ViewChild, ElementRef, AfterViewInit, OnDestroy, Renderer2, inject } from '@angular/core';
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

  /** Referencia al contenedor de navegación */
  @ViewChild('tabsNav') tabsNav!: ElementRef<HTMLElement>;
  // ========================================================================
  // INPUTS & OUTPUTS
  // ========================================================================

  /** Signal Input: Lista de pestañas a renderizar. Requerido. */
  tabs = input.required<Tab[]>();

  /** Signal Input: ID de la pestaña actualmente activa. Requerido. */
  activeTabId = input.required<string | number>();

  /** Output: Emite cuando el usuario cambia de pestaña. */
  tabChange = output<string | number>();

  // ========================================================================
  // LIFECYCLE
  // ========================================================================

  ngAfterViewInit() {
    this.setupScrollBehavior();
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
    this.listeners.push(this.renderer.listen(slider, 'mousedown', (e: MouseEvent) => {
      this.isDown = true;
      this.isDragging = false;
      slider.classList.add('tabs--grabbing');
      this.startX = e.pageX - slider.offsetLeft;
      this.scrollLeft = slider.scrollLeft;
    }));

    const stopDragging = () => {
      this.isDown = false;
      slider.classList.remove('tabs--grabbing');
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
