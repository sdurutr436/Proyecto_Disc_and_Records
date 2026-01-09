import { Injectable, signal } from '@angular/core';
import { Router, NavigationEnd, ActivatedRoute, ActivatedRouteSnapshot } from '@angular/router';
import { filter, map } from 'rxjs/operators';
import { BreadcrumbItem } from '../components/shared/breadcrumbs/breadcrumbs';

@Injectable({
  providedIn: 'root'
})
export class BreadcrumbService {
  breadcrumbs = signal<BreadcrumbItem[]>([]);

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) {
    this.initBreadcrumbs();
  }

  private initBreadcrumbs(): void {
    // Escuchar cambios de navegación
    this.router.events
      .pipe(
        filter(event => event instanceof NavigationEnd),
        map(() => this.buildBreadcrumbs(this.activatedRoute.root))
      )
      .subscribe(breadcrumbs => {
        this.breadcrumbs.set(breadcrumbs);
      });

    // Generar breadcrumbs iniciales
    const initialBreadcrumbs = this.buildBreadcrumbs(this.activatedRoute.root);
    this.breadcrumbs.set(initialBreadcrumbs);
  }

  private buildBreadcrumbs(
    route: ActivatedRoute,
    url: string = '',
    breadcrumbs: BreadcrumbItem[] = []
  ): BreadcrumbItem[] {
    // Siempre incluir home como primer breadcrumb
    if (breadcrumbs.length === 0) {
      breadcrumbs.push({
        label: 'Inicio',
        url: '/'
      });
    }

    // Si no hay hijos, retornar breadcrumbs actuales
    const children: ActivatedRoute[] = route.children;
    if (children.length === 0) {
      return breadcrumbs;
    }

    // Procesar cada hijo
    for (const child of children) {
      // Obtener el segmento de ruta
      const routeURL: string = child.snapshot.url
        .map(segment => segment.path)
        .join('/');

      // Si no hay URL, continuar con los hijos
      if (routeURL === '') {
        return this.buildBreadcrumbs(child, url, breadcrumbs);
      }

      // Construir URL completa
      url += `/${routeURL}`;

      // Obtener label desde data.breadcrumb o generar uno
      const label = this.getBreadcrumbLabel(child.snapshot);

      // Solo agregar si no es una redirección o ruta especial
      if (label && !this.shouldSkipBreadcrumb(routeURL)) {
        breadcrumbs.push({
          label,
          url
        });
      }

      // Continuar con los hijos
      return this.buildBreadcrumbs(child, url, breadcrumbs);
    }

    return breadcrumbs;
  }

  private getBreadcrumbLabel(snapshot: ActivatedRouteSnapshot): string {
    // 1. Prioridad: data.breadcrumb definido en ruta
    if (snapshot.data['breadcrumb']) {
      return snapshot.data['breadcrumb'];
    }

    // 2. Extraer desde title (quitar sufijo " - Discs & Records")
    if (snapshot.title) {
      return snapshot.title.replace(' - Discs & Records', '').split(' - ')[0];
    }

    // 3. Generar desde URL
    const path = snapshot.url[0]?.path;
    if (!path) return '';

    // Si es ID numérico, intentar obtener nombre desde resolver data
    if (/^\d+$/.test(path)) {
      const itemData = snapshot.data['album'] || snapshot.data['artist'] || snapshot.data['song'];
      if (itemData) {
        return itemData.title || itemData.name || path;
      }
      return `#${path}`;
    }

    // Capitalizar primera letra y reemplazar guiones
    return path
      .split('-')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');
  }

  private shouldSkipBreadcrumb(routeURL: string): boolean {
    // Rutas que no deben aparecer en breadcrumbs
    const skipRoutes = ['404', 'style-guide'];
    return skipRoutes.some(skip => routeURL.includes(skip));
  }

  /**
   * Actualizar breadcrumb dinámicamente (útil después de resolver data)
   */
  updateCurrentBreadcrumb(label: string): void {
    const current = this.breadcrumbs();
    if (current.length > 0) {
      current[current.length - 1].label = label;
      this.breadcrumbs.set([...current]);
    }
  }

  /**
   * Agregar breadcrumb personalizado
   */
  addBreadcrumb(breadcrumb: BreadcrumbItem): void {
    this.breadcrumbs.set([...this.breadcrumbs(), breadcrumb]);
  }

  /**
   * Resetear breadcrumbs
   */
  reset(): void {
    this.breadcrumbs.set([{
      label: 'Inicio',
      url: '/'
    }]);
  }
}
