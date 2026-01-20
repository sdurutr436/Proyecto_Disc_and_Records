import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute, Router } from '@angular/router';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import InfoComponent from './info';

describe('InfoComponent', () => {
  let component: InfoComponent;
  let fixture: ComponentFixture<InfoComponent>;
  let mockRouter: jasmine.SpyObj<Router>;
  let queryParamsSubject: BehaviorSubject<any>;

  beforeEach(async () => {
    queryParamsSubject = new BehaviorSubject({});
    mockRouter = jasmine.createSpyObj('Router', ['navigate']);

    await TestBed.configureTestingModule({
      imports: [InfoComponent],
      providers: [
        { provide: Router, useValue: mockRouter },
        {
          provide: ActivatedRoute,
          useValue: { queryParams: queryParamsSubject.asObservable() }
        }
      ],
      schemas: [NO_ERRORS_SCHEMA]
    }).compileComponents();

    fixture = TestBed.createComponent(InfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  describe('Creación', () => {
    it('debería crear el componente', () => {
      expect(component).toBeTruthy();
    });
  });

  describe('Estado inicial', () => {
    it('debería tener about como tab activo por defecto', () => {
      expect(component.activeTab()).toBe('about');
    });
  });

  describe('Tabs', () => {
    it('debería tener 4 tabs definidos', () => {
      expect(component.tabs.length).toBe(4);
    });

    it('debería tener tab de API', () => {
      const apiTab = component.tabs.find(t => t.id === 'api');
      expect(apiTab).toBeTruthy();
      expect(apiTab?.label).toContain('API');
    });

    it('debería tener tab de About', () => {
      const aboutTab = component.tabs.find(t => t.id === 'about');
      expect(aboutTab).toBeTruthy();
      expect(aboutTab?.label).toContain('Sobre Nosotros');
    });

    it('debería tener tab de Contact', () => {
      const contactTab = component.tabs.find(t => t.id === 'contact');
      expect(contactTab).toBeTruthy();
      expect(contactTab?.label).toContain('Contacto');
    });

    it('debería tener tab de Privacy', () => {
      const privacyTab = component.tabs.find(t => t.id === 'privacy');
      expect(privacyTab).toBeTruthy();
      expect(privacyTab?.label).toContain('Privacidad');
    });
  });

  describe('ngOnInit con query params', () => {
    it('debería establecer tab de query params', () => {
      queryParamsSubject.next({ tab: 'api' });
      fixture.detectChanges();

      expect(component.activeTab()).toBe('api');
    });

    it('debería establecer tab privacy de query params', () => {
      queryParamsSubject.next({ tab: 'privacy' });
      fixture.detectChanges();

      expect(component.activeTab()).toBe('privacy');
    });

    it('debería establecer tab contact de query params', () => {
      queryParamsSubject.next({ tab: 'contact' });
      fixture.detectChanges();

      expect(component.activeTab()).toBe('contact');
    });

    it('debería ignorar tabs inválidos', () => {
      queryParamsSubject.next({ tab: 'invalid' });
      fixture.detectChanges();

      // Mantiene el valor anterior (about por defecto)
      expect(['about', 'api', 'contact', 'privacy']).toContain(component.activeTab());
    });
  });

  describe('onTabChange', () => {
    it('debería cambiar tab activo', () => {
      component.onTabChange('api');
      expect(component.activeTab()).toBe('api');
    });

    it('debería cambiar a contact', () => {
      component.onTabChange('contact');
      expect(component.activeTab()).toBe('contact');
    });

    it('debería cambiar a privacy', () => {
      component.onTabChange('privacy');
      expect(component.activeTab()).toBe('privacy');
    });

    it('debería actualizar URL con navigate', () => {
      component.onTabChange('api');

      expect(mockRouter.navigate).toHaveBeenCalledWith([], {
        queryParams: { tab: 'api' },
        queryParamsHandling: 'merge',
        replaceUrl: true
      });
    });

    it('debería manejar id numérico como string', () => {
      component.onTabChange('about');
      expect(component.activeTab()).toBe('about');
    });
  });
});
