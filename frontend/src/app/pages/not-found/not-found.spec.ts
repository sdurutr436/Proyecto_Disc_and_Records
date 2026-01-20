import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import NotFoundComponent from './not-found';

describe('NotFoundComponent', () => {
  let component: NotFoundComponent;
  let fixture: ComponentFixture<NotFoundComponent>;
  let mockRouter: jasmine.SpyObj<Router>;

  beforeEach(async () => {
    mockRouter = jasmine.createSpyObj('Router', ['navigate']);

    await TestBed.configureTestingModule({
      imports: [NotFoundComponent],
      providers: [
        { provide: Router, useValue: mockRouter }
      ],
      schemas: [NO_ERRORS_SCHEMA]
    }).compileComponents();

    fixture = TestBed.createComponent(NotFoundComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  describe('Creación', () => {
    it('debería crear el componente', () => {
      expect(component).toBeTruthy();
    });
  });

  describe('Mensajes aleatorios', () => {
    it('debería establecer mensaje actual en ngOnInit', () => {
      expect(component.currentMessage()).toBeTruthy();
    });

    it('debería establecer subtítulo actual en ngOnInit', () => {
      expect(component.currentSubtitle()).toBeTruthy();
    });

    it('debería tener mensaje no vacío', () => {
      expect(component.currentMessage().length).toBeGreaterThan(0);
    });

    it('debería tener subtítulo no vacío', () => {
      expect(component.currentSubtitle().length).toBeGreaterThan(0);
    });
  });

  describe('QuickLinks', () => {
    it('debería tener quickLinks definidos', () => {
      expect(component.quickLinks).toBeDefined();
    });

    it('debería tener 4 quickLinks', () => {
      expect(component.quickLinks.length).toBe(4);
    });

    it('debería incluir link de Inicio', () => {
      const homeLink = component.quickLinks.find(l => l.label === 'Inicio');
      expect(homeLink).toBeTruthy();
      expect(homeLink?.route).toBe('/');
    });

    it('debería incluir link de Buscar', () => {
      const searchLink = component.quickLinks.find(l => l.label === 'Buscar');
      expect(searchLink).toBeTruthy();
      expect(searchLink?.route).toBe('/search');
    });

    it('debería incluir link de Mi Perfil', () => {
      const profileLink = component.quickLinks.find(l => l.label === 'Mi Perfil');
      expect(profileLink).toBeTruthy();
      expect(profileLink?.route).toBe('/profile');
    });

    it('debería incluir link de Guía de Estilo', () => {
      const styleLink = component.quickLinks.find(l => l.label === 'Guía de Estilo');
      expect(styleLink).toBeTruthy();
      expect(styleLink?.route).toBe('/style-guide');
    });

    it('cada quickLink debería tener icon', () => {
      component.quickLinks.forEach(link => {
        expect(link.icon).toBeTruthy();
        expect(link.icon).toContain('<svg');
      });
    });

    it('cada quickLink debería tener description', () => {
      component.quickLinks.forEach(link => {
        expect(link.description).toBeTruthy();
      });
    });
  });

  describe('Navegación', () => {
    it('debería navegar a ruta con navigateTo', () => {
      component.navigateTo('/home');
      expect(mockRouter.navigate).toHaveBeenCalledWith(['/home']);
    });

    it('debería navegar a profile', () => {
      component.navigateTo('/profile');
      expect(mockRouter.navigate).toHaveBeenCalledWith(['/profile']);
    });

    it('debería navegar a search', () => {
      component.navigateTo('/search');
      expect(mockRouter.navigate).toHaveBeenCalledWith(['/search']);
    });
  });

  describe('goBack', () => {
    it('debería llamar a window.history.back', () => {
      spyOn(window.history, 'back');

      component.goBack();

      expect(window.history.back).toHaveBeenCalled();
    });
  });
});
