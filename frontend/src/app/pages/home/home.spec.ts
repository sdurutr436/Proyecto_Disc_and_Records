import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { provideRouter, Router } from '@angular/router';
import { provideHttpClient } from '@angular/common/http';
import { of, throwError } from 'rxjs';

import { Home } from './home';
import { AlbumService } from '../../services/album.service';
import { AlbumStateService } from '../../services/album-state.service';
import { ReviewStateService } from '../../services/review-state.service';
import { AppStateService } from '../../services/app-state';

/**
 * Tests unitarios para el componente Home
 *
 * Cobertura:
 * - Creación del componente
 * - Carga de álbumes desde el servicio
 * - Manejo de estados de carga
 * - Interacción con carruseles
 * - Navegación a detalles de álbum
 * - Apertura de modal de registro
 */
describe('Home', () => {
  let component: Home;
  let fixture: ComponentFixture<Home>;
  let albumServiceSpy: jasmine.SpyObj<AlbumService>;
  let albumStateSpy: jasmine.SpyObj<AlbumStateService>;
  let appStateSpy: jasmine.SpyObj<AppStateService>;
  let router: Router;

  // Mock data para álbumes
  const mockAlbums = [
    {
      id: '1',
      title: 'Test Album 1',
      artist: 'Test Artist 1',
      coverUrl: 'https://example.com/cover1.jpg',
      averageRating: 4.5,
      totalReviews: 10
    },
    {
      id: '2',
      title: 'Test Album 2',
      artist: 'Test Artist 2',
      coverUrl: 'https://example.com/cover2.jpg',
      averageRating: 3.8,
      totalReviews: 5
    }
  ];

  beforeEach(async () => {
    // Crear spies para los servicios
    albumServiceSpy = jasmine.createSpyObj('AlbumService', ['getNewReleases']);
    albumStateSpy = jasmine.createSpyObj('AlbumStateService', ['search']);
    appStateSpy = jasmine.createSpyObj('AppStateService', ['isAuthenticated']);

    // Configurar comportamiento por defecto
    albumServiceSpy.getNewReleases.and.returnValue(of(mockAlbums as any));
    appStateSpy.isAuthenticated.and.returnValue(false);

    await TestBed.configureTestingModule({
      imports: [Home],
      providers: [
        provideRouter([]),
        provideHttpClient(),
        { provide: AlbumService, useValue: albumServiceSpy },
        { provide: AlbumStateService, useValue: albumStateSpy },
        { provide: AppStateService, useValue: appStateSpy },
        ReviewStateService
      ]
    }).compileComponents();

    router = TestBed.inject(Router);
    spyOn(router, 'navigate');

    fixture = TestBed.createComponent(Home);
    component = fixture.componentInstance;
  });

  // ==========================================================================
  // TESTS DE CREACIÓN
  // ==========================================================================

  it('should create', () => {
    fixture.detectChanges();
    expect(component).toBeTruthy();
  });

  it('should have initial loading state as true', () => {
    // Antes de detectChanges, el estado debe ser true
    expect(component.isLoading()).toBe(true);
  });

  // ==========================================================================
  // TESTS DE CARGA DE DATOS
  // ==========================================================================

  it('should load albums on init', fakeAsync(() => {
    fixture.detectChanges();
    tick();

    expect(albumServiceSpy.getNewReleases).toHaveBeenCalled();
    expect(component.isLoading()).toBe(false);
  }));

  it('should populate trendingAlbums after loading', fakeAsync(() => {
    fixture.detectChanges();
    tick();

    expect(component.trendingAlbums().length).toBeGreaterThan(0);
  }));

  it('should handle empty album response', fakeAsync(() => {
    albumServiceSpy.getNewReleases.and.returnValue(of([]));

    fixture.detectChanges();
    tick();

    expect(component.trendingAlbums().length).toBe(0);
    expect(component.recentReviews().length).toBe(0);
    expect(component.isLoading()).toBe(false);
  }));

  it('should handle error when loading albums', fakeAsync(() => {
    albumServiceSpy.getNewReleases.and.returnValue(throwError(() => new Error('Network error')));

    fixture.detectChanges();
    tick();

    expect(component.trendingAlbums().length).toBe(0);
    expect(component.isLoading()).toBe(false);
  }));

  // ==========================================================================
  // TESTS DE NAVEGACIÓN
  // ==========================================================================

  it('should navigate to album details', () => {
    fixture.detectChanges();
    component.viewAlbumDetails('123');

    expect(router.navigate).toHaveBeenCalledWith(['/album', '123']);
  });

  it('should navigate to album details with numeric id', () => {
    fixture.detectChanges();
    component.viewAlbumDetails(456);

    expect(router.navigate).toHaveBeenCalledWith(['/album', 456]);
  });

  // ==========================================================================
  // TESTS DE BÚSQUEDA
  // ==========================================================================

  it('should handle search', () => {
    fixture.detectChanges();
    component.handleSearch('test query');

    expect(albumStateSpy.search).toHaveBeenCalledWith('test query');
  });

  it('should handle instant search', () => {
    fixture.detectChanges();
    // Instant search solo hace console.log, verificamos que no lance error
    expect(() => component.handleInstantSearch('test')).not.toThrow();
  });

  // ==========================================================================
  // TESTS DE MODAL DE REGISTRO
  // ==========================================================================

  it('should dispatch custom event when opening register modal', () => {
    fixture.detectChanges();
    const dispatchSpy = spyOn(window, 'dispatchEvent');

    component.openRegisterModal();

    expect(dispatchSpy).toHaveBeenCalledWith(
      jasmine.objectContaining({ type: 'open-register-modal' })
    );
  });

  // ==========================================================================
  // TESTS DE TRACKBY
  // ==========================================================================

  it('should track albums by id', () => {
    const album = { id: 'test-id', title: 'Test', artist: 'Artist', imageUrl: '' };
    const result = component.trackByAlbumId(0, album);

    expect(result).toBe('test-id');
  });

  it('should track albums with numeric id', () => {
    const album = { id: 123, title: 'Test', artist: 'Artist', imageUrl: '' };
    const result = component.trackByAlbumId(0, album);

    expect(result).toBe(123);
  });

  // ==========================================================================
  // TESTS DE AUTENTICACIÓN
  // ==========================================================================

  it('should return false for isAuthenticated when user is not logged in', () => {
    appStateSpy.isAuthenticated.and.returnValue(false);
    fixture.detectChanges();

    expect(component.isAuthenticated).toBe(false);
  });

  it('should return true for isAuthenticated when user is logged in', () => {
    appStateSpy.isAuthenticated.and.returnValue(true);
    fixture.detectChanges();

    expect(component.isAuthenticated).toBe(true);
  });
});
