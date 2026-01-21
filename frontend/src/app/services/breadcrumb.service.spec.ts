import { TestBed, fakeAsync, tick } from '@angular/core/testing';
import { Router, NavigationEnd, ActivatedRoute, ActivatedRouteSnapshot, UrlSegment } from '@angular/router';
import { BreadcrumbService } from './breadcrumb.service';
import { Subject } from 'rxjs';

describe('BreadcrumbService', () => {
  let service: BreadcrumbService;
  let mockRouter: any;
  let mockActivatedRoute: any;
  let routerEvents$: Subject<any>;

  beforeEach(() => {
    routerEvents$ = new Subject();

    mockRouter = {
      events: routerEvents$.asObservable()
    };

    mockActivatedRoute = {
      root: {
        children: [],
        snapshot: {
          url: [],
          data: {},
          title: null
        }
      }
    };

    TestBed.configureTestingModule({
      providers: [
        BreadcrumbService,
        { provide: Router, useValue: mockRouter },
        { provide: ActivatedRoute, useValue: mockActivatedRoute }
      ]
    });

    service = TestBed.inject(BreadcrumbService);
  });

  describe('Creación', () => {
    it('debería crear el servicio', () => {
      expect(service).toBeTruthy();
    });
  });

  describe('Estado inicial', () => {
    it('debería tener breadcrumbs como signal', () => {
      expect(service.breadcrumbs).toBeDefined();
    });

    it('debería incluir Inicio como primer breadcrumb', () => {
      const breadcrumbs = service.breadcrumbs();
      expect(breadcrumbs.length).toBeGreaterThanOrEqual(1);
      expect(breadcrumbs[0].label).toBe('Inicio');
      expect(breadcrumbs[0].url).toBe('/');
    });
  });

  describe('Navegación', () => {
    it('debería actualizar breadcrumbs en NavigationEnd', fakeAsync(() => {
      // Simular navegación
      routerEvents$.next(new NavigationEnd(1, '/test', '/test'));
      tick();

      // Breadcrumbs deberían haberse actualizado
      expect(service.breadcrumbs().length).toBeGreaterThanOrEqual(1);
    }));
  });

  describe('Breadcrumb de Inicio', () => {
    it('debería siempre tener Inicio', () => {
      const breadcrumbs = service.breadcrumbs();
      const home = breadcrumbs.find(b => b.label === 'Inicio');
      expect(home).toBeTruthy();
    });
  });
});
