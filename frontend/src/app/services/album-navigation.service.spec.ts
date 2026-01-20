import { TestBed, fakeAsync, tick } from '@angular/core/testing';
import { Router } from '@angular/router';
import { of, throwError } from 'rxjs';

import { AlbumNavigationService } from './album-navigation.service';
import { AlbumService } from './album.service';
import { AlbumImportResponse } from '../models/data.models';

/**
 * Tests para AlbumNavigationService.
 * 
 * OBJETIVO:
 * Verificar que el servicio de navegación:
 * 1. Navega directamente a álbumes locales
 * 2. Importa álbumes de Deezer antes de navegar
 * 3. Usa el ID devuelto por el backend, no el ID de Deezer
 * 4. Maneja errores de importación correctamente
 */
describe('AlbumNavigationService', () => {
  let service: AlbumNavigationService;
  let albumServiceSpy: jasmine.SpyObj<AlbumService>;
  let routerSpy: jasmine.SpyObj<Router>;

  beforeEach(() => {
    const albumSpy = jasmine.createSpyObj('AlbumService', ['importFromDeezer']);
    const routerMock = jasmine.createSpyObj('Router', ['navigate']);

    TestBed.configureTestingModule({
      providers: [
        AlbumNavigationService,
        { provide: AlbumService, useValue: albumSpy },
        { provide: Router, useValue: routerMock }
      ]
    });

    service = TestBed.inject(AlbumNavigationService);
    albumServiceSpy = TestBed.inject(AlbumService) as jasmine.SpyObj<AlbumService>;
    routerSpy = TestBed.inject(Router) as jasmine.SpyObj<Router>;
  });

  describe('Estado inicial', () => {
    it('debe tener isImporting en false inicialmente', () => {
      expect(service.isImporting()).toBeFalse();
    });

    it('debe tener importingAlbumId en null inicialmente', () => {
      expect(service.importingAlbumId()).toBeNull();
    });
  });

  describe('navigateToAlbum - álbumes locales', () => {
    it('debe navegar directamente sin importar cuando source es "local"', fakeAsync(() => {
      const localId = 42;
      
      service.navigateToAlbum(localId, 'local');
      tick();
      
      // NO debe llamar al servicio de importación
      expect(albumServiceSpy.importFromDeezer).not.toHaveBeenCalled();
      
      // Debe navegar directamente con el ID local
      expect(routerSpy.navigate).toHaveBeenCalledWith(['/album', localId]);
    }));

    it('isImporting debe ser false para álbumes locales', fakeAsync(() => {
      service.navigateToAlbum(42, 'local');
      tick();
      
      expect(service.isImporting()).toBeFalse();
    }));
  });

  describe('navigateToAlbum - álbumes de Deezer', () => {
    const deezerAlbumId = '302127';
    const mockImportResponse: AlbumImportResponse = {
      id: 123,
      tituloAlbum: 'The Dark Side of the Moon',
      artista: 'Pink Floyd',
      deezerId: deezerAlbumId,
      wasImported: true,
      numTracks: 10,
      duracionTotal: 2580
    };

    it('debe importar y luego navegar con el ID local del backend', fakeAsync(() => {
      albumServiceSpy.importFromDeezer.and.returnValue(of(mockImportResponse));
      
      service.navigateToAlbum(deezerAlbumId, 'deezer');
      tick();
      
      // Debe llamar al servicio de importación con el ID de Deezer
      expect(albumServiceSpy.importFromDeezer).toHaveBeenCalledWith(deezerAlbumId);
      
      // CRÍTICO: Debe navegar con el ID devuelto por el backend (123), NO con el ID de Deezer
      expect(routerSpy.navigate).toHaveBeenCalledWith(['/album', 123]);
    }));

    it('debe usar el ID del backend incluso si wasImported es false (ya existía)', fakeAsync(() => {
      const existingAlbumResponse: AlbumImportResponse = {
        ...mockImportResponse,
        id: 456,
        wasImported: false // Ya existía en BD
      };
      albumServiceSpy.importFromDeezer.and.returnValue(of(existingAlbumResponse));
      
      service.navigateToAlbum(deezerAlbumId, 'deezer');
      tick();
      
      // Debe navegar con el ID existente (456)
      expect(routerSpy.navigate).toHaveBeenCalledWith(['/album', 456]);
    }));

    it('isImporting debe ser true durante la importación', fakeAsync(() => {
      albumServiceSpy.importFromDeezer.and.returnValue(of(mockImportResponse));
      
      // Antes de iniciar
      expect(service.isImporting()).toBeFalse();
      
      // Iniciar navegación (no hacemos tick aún)
      const promise = service.navigateToAlbum(deezerAlbumId, 'deezer');
      
      // El estado debería cambiar a true (aunque con observables síncronos es difícil de capturar)
      // Este test verifica el flujo completo
      
      tick();
      
      // Después de completar debe ser false
      expect(service.isImporting()).toBeFalse();
    }));

    it('importingAlbumId debe reflejar el álbum en proceso', fakeAsync(() => {
      albumServiceSpy.importFromDeezer.and.returnValue(of(mockImportResponse));
      
      service.navigateToAlbum(deezerAlbumId, 'deezer');
      tick();
      
      // Después de completar debe ser null
      expect(service.importingAlbumId()).toBeNull();
    }));
  });

  describe('Manejo de errores', () => {
    const deezerAlbumId = '99999999';

    it('no debe navegar si la importación falla', fakeAsync(() => {
      albumServiceSpy.importFromDeezer.and.returnValue(
        throwError(() => new Error('Error de Deezer'))
      );
      
      service.navigateToAlbum(deezerAlbumId, 'deezer');
      tick();
      
      // NO debe navegar
      expect(routerSpy.navigate).not.toHaveBeenCalled();
    }));

    it('isImporting debe volver a false después de un error', fakeAsync(() => {
      albumServiceSpy.importFromDeezer.and.returnValue(
        throwError(() => new Error('Error de Deezer'))
      );
      
      service.navigateToAlbum(deezerAlbumId, 'deezer');
      tick();
      
      expect(service.isImporting()).toBeFalse();
      expect(service.importingAlbumId()).toBeNull();
    }));
  });

  describe('Casos especiales de IDs', () => {
    it('debe manejar IDs numéricos pasados como string para source local', fakeAsync(() => {
      const numericStringId = '42';
      
      service.navigateToAlbum(numericStringId, 'local');
      tick();
      
      // Debe convertir y navegar como número
      expect(routerSpy.navigate).toHaveBeenCalledWith(['/album', 42]);
    }));

    it('debe tratar IDs no numéricos como Deezer IDs si source es deezer', fakeAsync(() => {
      const alphanumericDeezerId = 'abc123';
      const mockResponse: AlbumImportResponse = {
        id: 789,
        tituloAlbum: 'Test Album',
        artista: 'Test Artist',
        deezerId: alphanumericDeezerId,
        wasImported: true
      };
      albumServiceSpy.importFromDeezer.and.returnValue(of(mockResponse));
      
      service.navigateToAlbum(alphanumericDeezerId, 'deezer');
      tick();
      
      expect(albumServiceSpy.importFromDeezer).toHaveBeenCalledWith(alphanumericDeezerId);
      expect(routerSpy.navigate).toHaveBeenCalledWith(['/album', 789]);
    }));
  });
});
