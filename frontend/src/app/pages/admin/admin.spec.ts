import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { provideRouter } from '@angular/router';
import AdminComponent from './admin';
import { AlbumStateService } from '../../services/album-state.service';
import { signal } from '@angular/core';

describe('AdminComponent', () => {
  let component: AdminComponent;
  let fixture: ComponentFixture<AdminComponent>;
  let mockAlbumState: jasmine.SpyObj<AlbumStateService>;

  beforeEach(async () => {
    mockAlbumState = jasmine.createSpyObj('AlbumStateService', [], {
      albums: signal([])
    });

    await TestBed.configureTestingModule({
      imports: [AdminComponent],
      providers: [
        { provide: AlbumStateService, useValue: mockAlbumState },
        provideRouter([])
      ],
      schemas: [NO_ERRORS_SCHEMA]
    }).compileComponents();

    fixture = TestBed.createComponent(AdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  describe('Creación', () => {
    it('debería crear el componente', () => {
      expect(component).toBeTruthy();
    });
  });

  describe('Estado inicial', () => {
    it('debería tener albums como tab activo por defecto', () => {
      expect(component.activeTab()).toBe('albums');
    });

    it('debería tener stats iniciales en 0', () => {
      const stats = component.stats();
      expect(stats.totalAlbums).toBe(0);
      expect(stats.totalUsers).toBe(0);
      expect(stats.totalReviews).toBe(0);
      expect(stats.totalGenres).toBe(0);
    });
  });

  describe('Tabs', () => {
    it('debería tener 4 tabs', () => {
      expect(component.tabs.length).toBe(4);
    });

    it('debería tener tab de álbumes', () => {
      expect(component.tabs.find(t => t.id === 'albums')).toBeTruthy();
    });

    it('debería tener tab de usuarios', () => {
      expect(component.tabs.find(t => t.id === 'users')).toBeTruthy();
    });

    it('debería tener tab de géneros', () => {
      expect(component.tabs.find(t => t.id === 'genres')).toBeTruthy();
    });

    it('debería tener tab de reseñas', () => {
      expect(component.tabs.find(t => t.id === 'reviews')).toBeTruthy();
    });
  });

  describe('onTabChange', () => {
    it('debería cambiar a tab users', () => {
      component.onTabChange('users');
      expect(component.activeTab()).toBe('users');
    });

    it('debería cambiar a tab genres', () => {
      component.onTabChange('genres');
      expect(component.activeTab()).toBe('genres');
    });

    it('debería cambiar a tab reviews', () => {
      component.onTabChange('reviews');
      expect(component.activeTab()).toBe('reviews');
    });

    it('debería cambiar a tab albums', () => {
      component.onTabChange('albums');
      expect(component.activeTab()).toBe('albums');
    });
  });

  describe('loadData', () => {
    it('debería cargar datos al inicializar', () => {
      spyOn(component, 'loadData');
      component.ngOnInit();
      expect(component.loadData).toHaveBeenCalled();
    });

    it('debería actualizar albums signal', () => {
      component.loadData();
      expect(component.albums()).toEqual([]);
    });
  });

  describe('Métodos CRUD', () => {
    it('debería tener método createAlbum', () => {
      spyOn(console, 'log');
      component.createAlbum();
      expect(console.log).toHaveBeenCalledWith('Crear álbum');
    });

    it('debería tener método editAlbum', () => {
      spyOn(console, 'log');
      component.editAlbum('1');
      expect(console.log).toHaveBeenCalledWith('Editar álbum:', '1');
    });
  });

  describe('Signals', () => {
    it('debería tener signal users', () => {
      expect(component.users()).toEqual([]);
    });

    it('debería tener signal genres', () => {
      expect(component.genres()).toEqual([]);
    });

    it('debería tener signal reviews', () => {
      expect(component.reviews()).toEqual([]);
    });
  });
});
