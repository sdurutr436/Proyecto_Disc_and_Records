/**
 * ============================================================================
 * TESTS DE INTEGRACIÓN: Flujo de Búsqueda y Navegación a Álbumes
 * ============================================================================
 *
 * PROPÓSITO:
 * Verificar el flujo completo desde la búsqueda hasta la visualización del detalle:
 * 1. Usuario busca un álbum
 * 2. Se muestran resultados de Deezer
 * 3. Usuario selecciona un álbum
 * 4. Se importa el álbum al backend
 * 5. Se navega al detalle del álbum
 *
 * TÉCNICAS:
 * - Mocks de servicios HTTP (HttpClientTestingModule)
 * - Testing de Observables con fakeAsync/tick
 * - Verificación de interacciones entre servicios
 *
 * @author Tests de integración para Discs & Records
 */

import { TestBed, fakeAsync, tick, flush } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { Router, provideRouter } from '@angular/router';
import { of, throwError } from 'rxjs';

import { DeezerService, DeezerAlbum, DeezerArtist } from '../services/deezer.service';
import { AlbumService } from '../services/album.service';
import { AlbumNavigationService } from '../services/album-navigation.service';
import { NotificationStreamService } from '../services/notification-stream';
import { environment } from '../../environments/environment';
import { API_CONFIG } from '../config/api.config';

describe('Search & Album Flow Integration Tests', () => {
  let deezerService: DeezerService;
  let albumService: AlbumService;
  let albumNavigationService: AlbumNavigationService;
  let notificationService: NotificationStreamService;
  let httpMock: HttpTestingController;
  let router: Router;

  // Mock data para Deezer
  const mockDeezerArtist: DeezerArtist = {
    id: 27,
    name: 'Daft Punk',
    picture: 'https://api.deezer.com/artist/27/image',
    picture_small: 'https://e-cdns-images.dzcdn.net/images/artist/small.jpg',
    picture_medium: 'https://e-cdns-images.dzcdn.net/images/artist/medium.jpg',
    picture_big: 'https://e-cdns-images.dzcdn.net/images/artist/big.jpg',
    picture_xl: 'https://e-cdns-images.dzcdn.net/images/artist/xl.jpg',
    tracklist: 'https://api.deezer.com/artist/27/top',
    type: 'artist'
  };

  const mockDeezerAlbums: DeezerAlbum[] = [
    {
      id: 302127,
      title: 'Discovery',
      cover: 'https://api.deezer.com/album/302127/image',
      cover_small: 'https://e-cdns-images.dzcdn.net/images/cover/small.jpg',
      cover_medium: 'https://e-cdns-images.dzcdn.net/images/cover/medium.jpg',
      cover_big: 'https://e-cdns-images.dzcdn.net/images/cover/big.jpg',
      cover_xl: 'https://e-cdns-images.dzcdn.net/images/cover/xl.jpg',
      release_date: '2001-03-07',
      record_type: 'album',
      tracklist: 'https://api.deezer.com/album/302127/tracks',
      artist: mockDeezerArtist,
      type: 'album',
      nb_tracks: 14
    },
    {
      id: 6575789,
      title: 'Random Access Memories',
      cover: 'https://api.deezer.com/album/6575789/image',
      cover_small: 'https://e-cdns-images.dzcdn.net/images/cover/small2.jpg',
      cover_medium: 'https://e-cdns-images.dzcdn.net/images/cover/medium2.jpg',
      cover_big: 'https://e-cdns-images.dzcdn.net/images/cover/big2.jpg',
      cover_xl: 'https://e-cdns-images.dzcdn.net/images/cover/xl2.jpg',
      release_date: '2013-05-17',
      record_type: 'album',
      tracklist: 'https://api.deezer.com/album/6575789/tracks',
      artist: mockDeezerArtist,
      type: 'album',
      nb_tracks: 13
    }
  ];

  // Mock de álbum local (respuesta del backend con estructura AlbumResponse)
  const mockLocalAlbumResponse = {
    id: 42,
    tituloAlbum: 'Discovery',
    anioSalida: 2001,
    portadaUrl: 'https://e-cdns-images.dzcdn.net/images/cover/big.jpg',
    puntuacionMedia: 4.8,
    artista: {
      id: 1,
      nombreArtista: 'Daft Punk'
    }
  };

  beforeEach(async () => {
    // Desactivar mock mode para probar las llamadas HTTP reales
    (environment as any).useMockData = false;

    await TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        DeezerService,
        AlbumService,
        AlbumNavigationService,
        NotificationStreamService,
        provideRouter([
          { path: 'album/:id', component: class {} as any },
          { path: '404', component: class {} as any }
        ])
      ]
    }).compileComponents();

    deezerService = TestBed.inject(DeezerService);
    albumService = TestBed.inject(AlbumService);
    albumNavigationService = TestBed.inject(AlbumNavigationService);
    notificationService = TestBed.inject(NotificationStreamService);
    httpMock = TestBed.inject(HttpTestingController);
    router = TestBed.inject(Router);

    spyOn(router, 'navigate');
  });

  afterEach(() => {
    httpMock.verify();
  });

  // ════════════════════════════════════════════════════════════════════════
  // GRUPO 1: Búsqueda de Álbumes con Mock HTTP
  // ════════════════════════════════════════════════════════════════════════

  describe('Búsqueda de Álbumes (Deezer API)', () => {
    it('debería buscar álbumes y devolver resultados correctamente', fakeAsync(() => {
      // Arrange
      const searchQuery = 'Daft Punk';
      let results: DeezerAlbum[] = [];

      // Act
      deezerService.searchAlbums(searchQuery).subscribe(albums => {
        results = albums;
      });

      // Simular respuesta HTTP - usar URL directa porque el servicio codifica los params en la URL
      const req = httpMock.expectOne(
        request => request.url.includes('/deezer/search/album') &&
                   request.url.includes('q=Daft')
      );
      expect(req.request.method).toBe('GET');

      req.flush({ data: mockDeezerAlbums, total: 2 });
      tick();

      // Assert
      expect(results.length).toBe(2);
      expect(results[0].title).toBe('Discovery');
      expect(results[1].title).toBe('Random Access Memories');
    }));

    it('debería manejar errores de búsqueda gracefully', fakeAsync(() => {
      // Arrange
      const searchQuery = 'test';
      let results: DeezerAlbum[] = [];
      let errorOccurred = false;

      // Act
      deezerService.searchAlbums(searchQuery).subscribe({
        next: albums => results = albums,
        error: () => errorOccurred = true
      });

      // Simular error HTTP
      const req = httpMock.expectOne(
        request => request.url.includes('/deezer/search/album')
      );
      req.flush('Error', { status: 500, statusText: 'Server Error' });
      tick();

      // Assert - debería devolver array vacío, no error
      expect(results.length).toBe(0);
      expect(errorOccurred).toBeFalsy();
    }));

    it('debería buscar artistas correctamente', fakeAsync(() => {
      // Arrange
      const searchQuery = 'Daft Punk';
      let results: DeezerArtist[] = [];

      // Act
      deezerService.searchArtists(searchQuery).subscribe(artists => {
        results = artists;
      });

      // Simular respuesta HTTP
      const req = httpMock.expectOne(
        request => request.url.includes('/deezer/search/artist')
      );
      req.flush({ data: [mockDeezerArtist], total: 1 });
      tick();

      // Assert
      expect(results.length).toBe(1);
      expect(results[0].name).toBe('Daft Punk');
    }));
  });

  // ════════════════════════════════════════════════════════════════════════
  // GRUPO 2: Importación de Álbum desde Deezer
  // ════════════════════════════════════════════════════════════════════════

  describe('Importación de Álbum (Backend API)', () => {
    it('debería importar un álbum de Deezer al backend', fakeAsync(() => {
      // Arrange
      const deezerId = '302127';
      let importedAlbum: any = null;

      // Act
      albumService.importFromDeezer(deezerId).subscribe(album => {
        importedAlbum = album;
      });

      // Simular respuesta del backend - la URL es /albumes/deezer/{id}
      const req = httpMock.expectOne(
        request => request.url.includes(`/albumes/deezer/${deezerId}`)
      );
      expect(req.request.method).toBe('GET');

      req.flush(mockLocalAlbumResponse);
      tick();

      // Assert
      expect(importedAlbum).not.toBeNull();
      expect(importedAlbum.id).toBe('42'); // ID local del backend
      expect(importedAlbum.title).toBe('Discovery');
    }));

    it('debería manejar error de importación', fakeAsync(() => {
      // Arrange
      const deezerId = 'invalid';
      let errorOccurred = false;

      // Act
      albumService.importFromDeezer(deezerId).subscribe({
        next: () => {},
        error: () => errorOccurred = true
      });

      // Simular error HTTP
      const req = httpMock.expectOne(
        request => request.url.includes(`/albumes/deezer/${deezerId}`)
      );
      req.flush({ message: 'Álbum no encontrado' }, { status: 404, statusText: 'Not Found' });
      tick();

      // Assert
      expect(errorOccurred).toBeTruthy();
    }));
  });

  // ════════════════════════════════════════════════════════════════════════
  // GRUPO 3: Flujo Completo de Navegación
  // ════════════════════════════════════════════════════════════════════════

  describe('Navegación a Álbum', () => {
    it('debería navegar directamente para álbumes locales', fakeAsync(() => {
      // Arrange
      const localId = '42';

      // Act
      albumNavigationService.navigateToAlbum(localId, 'local');
      tick();

      // Assert
      expect(router.navigate).toHaveBeenCalledWith(['/album', '42']);
    }));

    it('debería actualizar estados durante la navegación', fakeAsync(() => {
      // Estado inicial
      expect(albumNavigationService.isImporting()).toBeFalsy();
      expect(albumNavigationService.importingAlbumId()).toBeNull();

      // Navegar a álbum local (no debería cambiar isImporting)
      albumNavigationService.navigateToAlbum('42', 'local');
      tick();

      // Los álbumes locales no activan isImporting
      expect(albumNavigationService.isImporting()).toBeFalsy();
    }));
  });

  // ════════════════════════════════════════════════════════════════════════
  // GRUPO 4: Obtener Álbum Local por ID
  // ════════════════════════════════════════════════════════════════════════

  describe('Obtener Álbum Local', () => {
    it('debería obtener álbum por ID local', fakeAsync(() => {
      // Arrange
      const albumId = 42;
      let album: any = null;

      // Act
      albumService.getAlbumByIdLocal(albumId).subscribe(a => {
        album = a;
      });

      // Simular respuesta HTTP
      const req = httpMock.expectOne(
        request => request.url.includes(`/albumes/${albumId}`)
      );
      expect(req.request.method).toBe('GET');

      req.flush(mockLocalAlbumResponse);
      tick();

      // Assert
      expect(album).not.toBeNull();
      expect(album.id).toBe('42');
      expect(album.title).toBe('Discovery');
    }));

    it('debería manejar álbum no encontrado', fakeAsync(() => {
      // Arrange
      const albumId = 999;
      let album: any = 'initial';

      // Act
      albumService.getAlbumByIdLocal(albumId).subscribe(a => {
        album = a;
      });

      // Simular respuesta vacía/null
      const req = httpMock.expectOne(
        request => request.url.includes(`/albumes/${albumId}`)
      );
      req.flush(null, { status: 404, statusText: 'Not Found' });
      tick();

      // Assert - debería devolver null
      expect(album).toBeNull();
    }));
  });

  // ════════════════════════════════════════════════════════════════════════
  // GRUPO 5: Charts de Deezer
  // ════════════════════════════════════════════════════════════════════════

  describe('Charts de Deezer', () => {
    it('debería obtener álbumes del chart', fakeAsync(() => {
      // Arrange
      let chartAlbums: DeezerAlbum[] = [];

      // Act
      deezerService.getChartAlbums().subscribe(albums => {
        chartAlbums = albums;
      });

      // Simular respuesta HTTP - la URL es /deezer/chart/0/albums
      const req = httpMock.expectOne(
        request => request.url.includes('/deezer/chart/0/albums')
      );
      req.flush({ data: mockDeezerAlbums });
      tick();

      // Assert
      expect(chartAlbums.length).toBe(2);
    }));
  });
});
