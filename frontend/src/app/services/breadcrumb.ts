import { Injectable, signal, computed } from '@angular/core';
import { Router, NavigationEnd, ActivatedRoute } from '@angular/router';
import { filter, map } from 'rxjs/operators';

/**
 * Interfaz para un elemento de breadcrumb
 */
export interface Breadcrumb {
  label: string;
  url: string;
  isActive: boolean;
}

/**
 * BreadcrumbService - Servicio para generar breadcrumbs dinámicos desde las rutas
 *
 * PROPÓSITO:
 * - Generar breadcrumbs automáticamente basándose en la configuración de rutas
 * - Proporcionar navegación contextual para el usuario
 * - Mejorar UX mostrando jerarquía de navegación
 *
 * CONFIGURACIÓN EN RUTAS:
 * ```typescript
 * {
 *   path: 'albums',
 *   data: { breadcrumb: 'Álbumes' },
 *   children: [
 *     {
 *       path: ':id',
 *       data: { breadcrumb: 'Detalle' }
 *     }
 *   ]
 * }
 * ```
 *
 * USO EN COMPONENTE:
 * ```typescript
 * export class BreadcrumbComponent {
 *   private breadcrumbService = inject(BreadcrumbService);
 *   breadcrumbs = this.breadcrumbService.breadcrumbs;
 * }
 * ```
 *
 * FUNCIONALIDADES:
 * - ✅ Generación automática desde rutas
 * - ✅ Soporte para rutas anidadas
 * - ✅ Breadcrumb "Inicio" siempre presente
 * - ✅ Actualización automática en navegación
 * - ✅ Marca el último breadcrumb como activo
 *
 * EJEMPLO DE OUTPUT:
 * Inicio > Álbumes > Detalle de Álbum
 */
@Injectable({
  providedIn: 'root'
})
export class BreadcrumbService {
  private breadcrumbsSignal = signal<Breadcrumb[]>([]);

  /**
   * Signal de solo lectura para los breadcrumbs actuales
   */
  readonly breadcrumbs = this.breadcrumbsSignal.asReadonly();

  /**
   * Computed que devuelve true si hay más de 1 breadcrumb
   * Útil para ocultar el componente en la página de inicio
   */
  readonly showBreadcrumbs = computed(() => this.breadcrumbs().length > 1);

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) {
    this.initializeBreadcrumbs();
  }

  /**
   * Inicializa el servicio y escucha cambios de navegación
   */
  private initializeBreadcrumbs() {
    // Generar breadcrumbs al cargar la aplicación
    this.updateBreadcrumbs();

    // Actualizar breadcrumbs en cada navegación
    this.router.events
      .pipe(
        filter(event => event instanceof NavigationEnd),
        map(() => this.activatedRoute)
      )
      .subscribe(() => {
        this.updateBreadcrumbs();
      });
  }

  /**
   * Actualiza los breadcrumbs basándose en la ruta actual
   */
  private updateBreadcrumbs() {
    const breadcrumbs = this.createBreadcrumbs(this.activatedRoute.root);
    this.breadcrumbsSignal.set(breadcrumbs);

    console.log('[BreadcrumbService] Breadcrumbs actualizados:', breadcrumbs);
  }

  /**
   * Crea breadcrumbs recursivamente desde la ruta raíz
   */
  private createBreadcrumbs(
    route: ActivatedRoute,
    url: string = '',
    breadcrumbs: Breadcrumb[] = []
  ): Breadcrumb[] {
    // Breadcrumb inicial "Inicio"
    if (breadcrumbs.length === 0) {
      breadcrumbs.push({
        label: 'Inicio',
        url: '/',
        isActive: false
      });
    }

    // Obtener hijos de la ruta actual
    const children = route.children;

    // Si no hay hijos, retornar breadcrumbs actuales
    if (children.length === 0) {
      // Marcar el último como activo
      if (breadcrumbs.length > 0) {
        breadcrumbs[breadcrumbs.length - 1].isActive = true;
      }
      return breadcrumbs;
    }

    // Procesar cada hijo
    for (const child of children) {
      // Construir URL del segmento actual
      const routeURL = child.snapshot.url.map(segment => segment.path).join('/');

      if (routeURL !== '') {
        url += `/${routeURL}`;
      }

      // Obtener label del breadcrumb desde route data
      const label = child.snapshot.data['breadcrumb'];

      // Si hay label, agregar breadcrumb
      if (label) {
        breadcrumbs.push({
          label,
          url,
          isActive: false
        });
      }

      // Recursión para hijos del hijo
      return this.createBreadcrumbs(child, url, breadcrumbs);
    }

    return breadcrumbs;
  }

  /**
   * Método para agregar breadcrumb personalizado manualmente
   * Útil para breadcrumbs dinámicos (ej: nombre de álbum)
   */
  addCustomBreadcrumb(label: string, url: string) {
    const current = this.breadcrumbsSignal();

    // Desmarcar el último como activo
    if (current.length > 0) {
      current[current.length - 1].isActive = false;
    }

    // Agregar nuevo breadcrumb
    this.breadcrumbsSignal.set([
      ...current,
      { label, url, isActive: true }
    ]);
  }

  /**
   * Actualiza el label del último breadcrumb
   * Útil para breadcrumbs dinámicos después de cargar datos
   */
  updateLastBreadcrumb(label: string) {
    const current = [...this.breadcrumbsSignal()];

    if (current.length > 0) {
      current[current.length - 1].label = label;
      this.breadcrumbsSignal.set(current);
    }
  }

  /**
   * Limpia todos los breadcrumbs excepto "Inicio"
   */
  clear() {
    this.breadcrumbsSignal.set([{
      label: 'Inicio',
      url: '/',
      isActive: true
    }]);
  }
}
