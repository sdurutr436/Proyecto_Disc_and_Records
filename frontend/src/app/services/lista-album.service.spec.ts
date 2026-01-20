import { TestBed } from '@angular/core/testing';
import { provideHttpClient } from '@angular/common/http';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { ListaAlbumService } from './lista-album.service';
import { AppStateService } from './app-state';
import { NotificationStreamService } from './notification-stream';
import { AlbumEnLista, EstadoAlbumUsuario } from '../models/data.models';
import { signal, WritableSignal } from '@angular/core';
import { environment } from '../../environments/environment';

describe('ListaAlbumService', () => {
  let service: ListaAlbumService;
  let httpTesting: HttpTestingController;
  let mockAppState: jasmine.SpyObj<AppStateService>;
  let mockNotifications: jasmine.SpyObj<NotificationStreamService>;
  let currentUserSignal: WritableSignal<any>;

  const mockUser = { id: 1, username: 'testuser' };

  const mockAlbumEnLista: AlbumEnLista = {
    albumId: 123,
    titulo: 'Test Album',
    portadaUrl: 'cover.jpg',
    artista: 'Test Artist',
    anio: 2024,
    puntuacion: 5,
    tieneResena: true,
    fechaAgregada: '2024-01-01',
    fechaResena: null
  };

  beforeEach(() => {
    currentUserSignal = signal(mockUser);

    mockAppState = jasmine.createSpyObj('AppStateService', [], {
      currentUser: currentUserSignal
    });

    mockNotifications = jasmine.createSpyObj('NotificationStreamService', [
      'success', 'error', 'warning', 'info'
    ]);

    TestBed.configureTestingModule({
      providers: [
        provideHttpClient(),
        provideHttpClientTesting(),
        ListaAlbumService,
        { provide: AppStateService, useValue: mockAppState },
        { provide: NotificationStreamService, useValue: mockNotifications }
      ]
    });

    service = TestBed.inject(ListaAlbumService);
    httpTesting = TestBed.inject(HttpTestingController);

    // Forzar modo real (no mock)
    (environment as any).useMockData = false;
  });

  afterEach(() => {
    httpTesting.verify();
  });

  describe('Creación', () => {
    it('debería crear el servicio', () => {
      expect(service).toBeTruthy();
    });
  });

  // ==========================================================================
  // LISTA DE ÁLBUMES
  // ==========================================================================
  describe('getListaUsuario', () => {
    it('debería obtener lista de álbumes del usuario', () => {
      service.getListaUsuario(1).subscribe(albums => {
        expect(albums.length).toBe(1);
        expect(albums[0].titulo).toBe('Test Album');
      });

      const req = httpTesting.expectOne(r => r.url.includes('/usuarios/1/lista'));
      expect(req.request.params.get('page')).toBe('0');
      expect(req.request.params.get('size')).toBe('20');
      req.flush([mockAlbumEnLista]);
    });

    it('debería usar paginación personalizada', () => {
      service.getListaUsuario(1, 2, 10).subscribe();

      const req = httpTesting.expectOne(r => r.url.includes('/usuarios/1/lista'));
      expect(req.request.params.get('page')).toBe('2');
      expect(req.request.params.get('size')).toBe('10');
      req.flush([]);
    });

    it('debería retornar array vacío en error', () => {
      service.getListaUsuario(1).subscribe(albums => {
        expect(albums).toEqual([]);
      });

      const req = httpTesting.expectOne(r => r.url.includes('/usuarios/1/lista'));
      req.error(new ProgressEvent('error'));
    });
  });

  describe('estaEnLista', () => {
    it('debería verificar si álbum está en lista (true)', () => {
      service.estaEnLista(1, 123).subscribe(result => {
        expect(result).toBeTrue();
      });

      const req = httpTesting.expectOne(r => r.url.includes('/usuarios/1/lista/123/existe'));
      req.flush({ enLista: true });
    });

    it('debería verificar si álbum está en lista (false)', () => {
      service.estaEnLista(1, 123).subscribe(result => {
        expect(result).toBeFalse();
      });

      const req = httpTesting.expectOne(r => r.url.includes('/usuarios/1/lista/123/existe'));
      req.flush({ enLista: false });
    });

    it('debería retornar false en error', () => {
      service.estaEnLista(1, 123).subscribe(result => {
        expect(result).toBeFalse();
      });

      const req = httpTesting.expectOne(r => r.url.includes('/usuarios/1/lista/123/existe'));
      req.error(new ProgressEvent('error'));
    });
  });

  describe('getEstadoAlbum', () => {
    it('debería obtener estado del álbum', () => {
      service.getEstadoAlbum(1, 123).subscribe(estado => {
        expect(estado).toBeTruthy();
        expect(estado?.enLista).toBeTrue();
        expect(estado?.puntuacion).toBe(5);
        expect(estado?.tieneResena).toBeTrue();
      });

      const req = httpTesting.expectOne(r => r.url.includes('/usuarios/1/lista/123'));
      req.flush(mockAlbumEnLista);
    });

    it('debería retornar null en error 404', () => {
      service.getEstadoAlbum(1, 999).subscribe(estado => {
        expect(estado).toBeNull();
      });

      const req = httpTesting.expectOne(r => r.url.includes('/usuarios/1/lista/999'));
      req.flush(null, { status: 404, statusText: 'Not Found' });
    });

    it('debería retornar null en otros errores', () => {
      service.getEstadoAlbum(1, 123).subscribe(estado => {
        expect(estado).toBeNull();
      });

      const req = httpTesting.expectOne(r => r.url.includes('/usuarios/1/lista/123'));
      req.flush(null, { status: 500, statusText: 'Server Error' });
    });
  });

  // ==========================================================================
  // AGREGAR/QUITAR
  // ==========================================================================
  describe('agregarALista', () => {
    it('debería agregar álbum a la lista', () => {
      service.agregarALista(123).subscribe(result => {
        expect(result).toBeTruthy();
      });

      const req = httpTesting.expectOne(r => r.url.includes('/usuarios/1/lista'));
      expect(req.request.method).toBe('POST');
      expect(req.request.body.albumId).toBe(123);
      req.flush(mockAlbumEnLista);

      expect(mockNotifications.success).toHaveBeenCalledWith('Añadido', jasmine.any(String));
    });

    it('debería mostrar warning si no hay usuario', () => {
      currentUserSignal.set(null);

      service.agregarALista(123).subscribe(result => {
        expect(result).toBeNull();
      });

      httpTesting.expectNone(r => r.url.includes('/lista'));
      expect(mockNotifications.warning).toHaveBeenCalled();
    });

    it('debería manejar error al agregar', () => {
      service.agregarALista(123).subscribe(result => {
        expect(result).toBeNull();
      });

      const req = httpTesting.expectOne(r => r.url.includes('/usuarios/1/lista'));
      req.flush({ message: 'Error' }, { status: 400, statusText: 'Bad Request' });

      expect(mockNotifications.error).toHaveBeenCalled();
    });
  });

  describe('agregarAlbumDeezer', () => {
    const deezerData = {
      albumId: 123,
      tituloAlbum: 'Test Album',
      portadaUrl: 'cover.jpg',
      anioSalida: 2024,
      artistaId: 1,
      nombreArtista: 'Test Artist'
    };

    it('debería agregar álbum de Deezer', () => {
      service.agregarAlbumDeezer(deezerData).subscribe(result => {
        expect(result).toBeTruthy();
      });

      const req = httpTesting.expectOne(r => r.url.includes('/lista/deezer'));
      expect(req.request.method).toBe('POST');
      expect(req.request.body.albumId).toBe(123);
      expect(req.request.body.tituloAlbum).toBe('Test Album');
      req.flush(mockAlbumEnLista);
    });

    it('debería validar título vacío', () => {
      service.agregarAlbumDeezer({ ...deezerData, tituloAlbum: '' }).subscribe(result => {
        expect(result).toBeNull();
      });

      httpTesting.expectNone(r => r.url.includes('/lista/deezer'));
      expect(mockNotifications.error).toHaveBeenCalledWith('Validación', jasmine.any(String));
    });

    it('debería validar nombre de artista vacío', () => {
      service.agregarAlbumDeezer({ ...deezerData, nombreArtista: '' }).subscribe(result => {
        expect(result).toBeNull();
      });

      httpTesting.expectNone(r => r.url.includes('/lista/deezer'));
    });

    it('debería validar albumId inválido', () => {
      service.agregarAlbumDeezer({ ...deezerData, albumId: 0 }).subscribe(result => {
        expect(result).toBeNull();
      });

      httpTesting.expectNone(r => r.url.includes('/lista/deezer'));
    });

    it('debería manejar error 409 (conflicto)', () => {
      service.agregarAlbumDeezer(deezerData).subscribe();

      const req = httpTesting.expectOne(r => r.url.includes('/lista/deezer'));
      req.flush({ message: 'Ya está en lista' }, { status: 409, statusText: 'Conflict' });

      expect(mockNotifications.error).toHaveBeenCalled();
    });
  });

  describe('quitarDeLista', () => {
    it('debería quitar álbum de la lista', () => {
      service.quitarDeLista(123).subscribe(result => {
        expect(result).toBeTrue();
      });

      const req = httpTesting.expectOne(r => r.url.includes('/usuarios/1/lista/123'));
      expect(req.request.method).toBe('DELETE');
      req.flush(null);

      expect(mockNotifications.info).toHaveBeenCalledWith('Quitado', jasmine.any(String));
    });

    it('debería retornar false si no hay usuario', () => {
      currentUserSignal.set(null);

      service.quitarDeLista(123).subscribe(result => {
        expect(result).toBeFalse();
      });

      httpTesting.expectNone(r => r.url.includes('/lista'));
    });

    it('debería manejar error al quitar', () => {
      service.quitarDeLista(123).subscribe(result => {
        expect(result).toBeFalse();
      });

      const req = httpTesting.expectOne(r => r.url.includes('/usuarios/1/lista/123'));
      req.error(new ProgressEvent('error'));

      expect(mockNotifications.error).toHaveBeenCalled();
    });
  });

  // ==========================================================================
  // PUNTUACIÓN
  // ==========================================================================
  describe('puntuarAlbum', () => {
    it('debería puntuar álbum', () => {
      service.puntuarAlbum(123, 5).subscribe(result => {
        expect(result).toBeTruthy();
      });

      const req = httpTesting.expectOne(r => r.url.includes('/usuarios/1/lista/123/puntuacion'));
      expect(req.request.method).toBe('POST');
      expect(req.request.body.puntuacion).toBe(5);
      req.flush(mockAlbumEnLista);

      expect(mockNotifications.success).toHaveBeenCalledWith('Puntuado', jasmine.any(String));
    });

    it('debería mostrar warning si no hay usuario', () => {
      currentUserSignal.set(null);

      service.puntuarAlbum(123, 5).subscribe(result => {
        expect(result).toBeNull();
      });

      expect(mockNotifications.warning).toHaveBeenCalled();
    });

    it('debería manejar error al puntuar', () => {
      service.puntuarAlbum(123, 5).subscribe(result => {
        expect(result).toBeNull();
      });

      const req = httpTesting.expectOne(r => r.url.includes('/puntuacion'));
      req.flush({ message: 'Error' }, { status: 400, statusText: 'Bad Request' });

      expect(mockNotifications.error).toHaveBeenCalled();
    });
  });

  describe('quitarPuntuacion', () => {
    it('debería quitar puntuación', () => {
      service.quitarPuntuacion(123).subscribe(result => {
        expect(result).toBeTruthy();
      });

      const req = httpTesting.expectOne(r => r.url.includes('/usuarios/1/lista/123/puntuacion'));
      expect(req.request.method).toBe('DELETE');
      req.flush(mockAlbumEnLista);
    });

    it('debería retornar null si no hay usuario', () => {
      currentUserSignal.set(null);

      service.quitarPuntuacion(123).subscribe(result => {
        expect(result).toBeNull();
      });

      httpTesting.expectNone(r => r.url.includes('/puntuacion'));
    });
  });

  // ==========================================================================
  // RESEÑAS
  // ==========================================================================
  describe('escribirResena', () => {
    it('debería escribir reseña', () => {
      service.escribirResena(123, 'Gran álbum', 5).subscribe(result => {
        expect(result).toBeTruthy();
      });

      const req = httpTesting.expectOne(r => r.url.includes('/resenas/albumes'));
      expect(req.request.method).toBe('POST');
      expect(req.request.body.textoResena).toBe('Gran álbum');
      expect(req.request.body.puntuacion).toBe(5);
      req.flush({ id: 1, textoResena: 'Gran álbum' });

      expect(mockNotifications.success).toHaveBeenCalled();
    });

    it('debería manejar puntuación undefined', () => {
      service.escribirResena(123, 'Reseña sin puntuación').subscribe();

      const req = httpTesting.expectOne(r => r.url.includes('/resenas/albumes'));
      expect(req.request.body.puntuacion).toBe(0);
      req.flush({ id: 1 });
    });

    it('debería mostrar warning si no hay usuario', () => {
      currentUserSignal.set(null);

      service.escribirResena(123, 'Test').subscribe(result => {
        expect(result).toBeNull();
      });

      expect(mockNotifications.warning).toHaveBeenCalled();
    });
  });

  describe('getResenasAlbum', () => {
    it('debería obtener reseñas del álbum', () => {
      service.getResenasAlbum(123).subscribe(resenas => {
        expect(resenas.length).toBe(1);
      });

      const req = httpTesting.expectOne(r => r.url.includes('/resenas/albumes/123'));
      req.flush([{ id: 1, textoResena: 'Test' }]);
    });

    it('debería retornar array vacío en error', () => {
      service.getResenasAlbum(123).subscribe(resenas => {
        expect(resenas).toEqual([]);
      });

      const req = httpTesting.expectOne(r => r.url.includes('/resenas/albumes/123'));
      req.error(new ProgressEvent('error'));
    });
  });

  describe('getResenasUsuario', () => {
    it('debería obtener reseñas del usuario', () => {
      service.getResenasUsuario(1).subscribe(resenas => {
        expect(resenas.length).toBe(1);
      });

      const req = httpTesting.expectOne(r => r.url.includes('/resenas/albumes/usuario/1'));
      req.flush([{ id: 1, textoResena: 'Test' }]);
    });

    it('debería retornar array vacío en error', () => {
      service.getResenasUsuario(1).subscribe(resenas => {
        expect(resenas).toEqual([]);
      });

      const req = httpTesting.expectOne(r => r.url.includes('/resenas/albumes/usuario/1'));
      req.error(new ProgressEvent('error'));
    });
  });

  // ==========================================================================
  // ESTADÍSTICAS
  // ==========================================================================
  describe('contarAlbumes', () => {
    it('debería contar álbumes del usuario', () => {
      service.contarAlbumes(1).subscribe(count => {
        expect(count).toBe(42);
      });

      const req = httpTesting.expectOne(r => r.url.includes('/usuarios/1/lista/count'));
      req.flush({ total: 42 });
    });

    it('debería retornar 0 en error', () => {
      service.contarAlbumes(1).subscribe(count => {
        expect(count).toBe(0);
      });

      const req = httpTesting.expectOne(r => r.url.includes('/usuarios/1/lista/count'));
      req.error(new ProgressEvent('error'));
    });
  });
});
