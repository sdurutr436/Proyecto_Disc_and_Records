import { API_CONFIG, API_ENDPOINTS, API_HEADERS, STORAGE_KEYS } from './api.config';

describe('API Configuration', () => {
  describe('API_CONFIG', () => {
    it('should have baseUrl defined', () => {
      expect(API_CONFIG.baseUrl).toBeDefined();
      expect(typeof API_CONFIG.baseUrl).toBe('string');
    });

    it('should have timeout set to 20000ms', () => {
      expect(API_CONFIG.timeout).toBe(20000);
    });

    it('should have maxRetries set to 2', () => {
      expect(API_CONFIG.maxRetries).toBe(2);
    });

    it('should have retryDelay set to 1000ms', () => {
      expect(API_CONFIG.retryDelay).toBe(1000);
    });

    it('should have apiVersion set to v1', () => {
      expect(API_CONFIG.apiVersion).toBe('v1');
    });
  });

  describe('API_ENDPOINTS.auth', () => {
    it('should have login endpoint', () => {
      expect(API_ENDPOINTS.auth.login).toBe('/auth/login');
    });

    it('should have register endpoint', () => {
      expect(API_ENDPOINTS.auth.register).toBe('/auth/register');
    });

    it('should have me endpoint', () => {
      expect(API_ENDPOINTS.auth.me).toBe('/auth/me');
    });

    it('should have forgotPassword endpoint', () => {
      expect(API_ENDPOINTS.auth.forgotPassword).toBe('/auth/forgot-password');
    });
  });

  describe('API_ENDPOINTS.usuarios', () => {
    it('should have getAll endpoint', () => {
      expect(API_ENDPOINTS.usuarios.getAll).toBe('/usuarios');
    });

    it('should have getPaginado endpoint', () => {
      expect(API_ENDPOINTS.usuarios.getPaginado).toBe('/usuarios/paginado');
    });

    it('should generate getById endpoint with id', () => {
      expect(API_ENDPOINTS.usuarios.getById(1)).toBe('/usuarios/1');
      expect(API_ENDPOINTS.usuarios.getById(123)).toBe('/usuarios/123');
    });

    it('should have create endpoint', () => {
      expect(API_ENDPOINTS.usuarios.create).toBe('/usuarios');
    });

    it('should generate update endpoint with id', () => {
      expect(API_ENDPOINTS.usuarios.update(5)).toBe('/usuarios/5');
    });

    it('should generate delete endpoint with id', () => {
      expect(API_ENDPOINTS.usuarios.delete(10)).toBe('/usuarios/10');
    });

    it('should generate getEstadisticas endpoint with id', () => {
      expect(API_ENDPOINTS.usuarios.getEstadisticas(1)).toBe('/usuarios/1/estadisticas');
    });
  });

  describe('API_ENDPOINTS.albumes', () => {
    it('should have getAll endpoint', () => {
      expect(API_ENDPOINTS.albumes.getAll).toBe('/albumes');
    });

    it('should have getPaginado endpoint', () => {
      expect(API_ENDPOINTS.albumes.getPaginado).toBe('/albumes/paginado');
    });

    it('should generate getById endpoint', () => {
      expect(API_ENDPOINTS.albumes.getById(101)).toBe('/albumes/101');
    });

    it('should have create endpoint', () => {
      expect(API_ENDPOINTS.albumes.create).toBe('/albumes');
    });

    it('should generate update endpoint', () => {
      expect(API_ENDPOINTS.albumes.update(50)).toBe('/albumes/50');
    });

    it('should generate delete endpoint', () => {
      expect(API_ENDPOINTS.albumes.delete(25)).toBe('/albumes/25');
    });

    it('should have buscar endpoint', () => {
      expect(API_ENDPOINTS.albumes.buscar).toBe('/albumes/buscar');
    });

    it('should generate getByArtista endpoint', () => {
      expect(API_ENDPOINTS.albumes.getByArtista(1)).toBe('/albumes/artista/1');
    });
  });

  describe('API_ENDPOINTS.artistas', () => {
    it('should have getAll endpoint', () => {
      expect(API_ENDPOINTS.artistas.getAll).toBe('/artistas');
    });

    it('should have getPaginado endpoint', () => {
      expect(API_ENDPOINTS.artistas.getPaginado).toBe('/artistas/paginado');
    });

    it('should generate getById endpoint', () => {
      expect(API_ENDPOINTS.artistas.getById(1)).toBe('/artistas/1');
    });

    it('should have create endpoint', () => {
      expect(API_ENDPOINTS.artistas.create).toBe('/artistas');
    });

    it('should generate update endpoint', () => {
      expect(API_ENDPOINTS.artistas.update(5)).toBe('/artistas/5');
    });

    it('should generate delete endpoint', () => {
      expect(API_ENDPOINTS.artistas.delete(10)).toBe('/artistas/10');
    });

    it('should have buscar endpoint', () => {
      expect(API_ENDPOINTS.artistas.buscar).toBe('/artistas/buscar');
    });

    it('should generate getAlbumes endpoint', () => {
      expect(API_ENDPOINTS.artistas.getAlbumes(1)).toBe('/artistas/1/albumes');
    });

    it('should generate getCanciones endpoint', () => {
      expect(API_ENDPOINTS.artistas.getCanciones(2)).toBe('/artistas/2/canciones');
    });
  });

  describe('API_ENDPOINTS.canciones', () => {
    it('should have getAll endpoint', () => {
      expect(API_ENDPOINTS.canciones.getAll).toBe('/canciones');
    });

    it('should have getPaginado endpoint', () => {
      expect(API_ENDPOINTS.canciones.getPaginado).toBe('/canciones/paginado');
    });

    it('should generate getById endpoint', () => {
      expect(API_ENDPOINTS.canciones.getById(1001)).toBe('/canciones/1001');
    });

    it('should have create endpoint', () => {
      expect(API_ENDPOINTS.canciones.create).toBe('/canciones');
    });

    it('should generate update endpoint', () => {
      expect(API_ENDPOINTS.canciones.update(500)).toBe('/canciones/500');
    });

    it('should generate delete endpoint', () => {
      expect(API_ENDPOINTS.canciones.delete(100)).toBe('/canciones/100');
    });

    it('should have buscar endpoint', () => {
      expect(API_ENDPOINTS.canciones.buscar).toBe('/canciones/buscar');
    });

    it('should generate getByArtista endpoint', () => {
      expect(API_ENDPOINTS.canciones.getByArtista(1)).toBe('/canciones/artista/1');
    });
  });

  describe('API_ENDPOINTS.resenas', () => {
    describe('Album reviews', () => {
      it('should generate albumesByAlbum endpoint', () => {
        expect(API_ENDPOINTS.resenas.albumesByAlbum(101)).toBe('/resenas/albumes/101');
      });

      it('should generate albumesByUsuario endpoint', () => {
        expect(API_ENDPOINTS.resenas.albumesByUsuario(1)).toBe('/resenas/albumes/usuario/1');
      });

      it('should generate albumGetOne endpoint', () => {
        expect(API_ENDPOINTS.resenas.albumGetOne(101, 1)).toBe('/resenas/albumes/101/usuario/1');
      });

      it('should have albumCreate endpoint', () => {
        expect(API_ENDPOINTS.resenas.albumCreate).toBe('/resenas/albumes');
      });

      it('should generate albumUpdate endpoint', () => {
        expect(API_ENDPOINTS.resenas.albumUpdate(101, 1)).toBe('/resenas/albumes/101/usuario/1');
      });

      it('should generate albumDelete endpoint', () => {
        expect(API_ENDPOINTS.resenas.albumDelete(101, 1)).toBe('/resenas/albumes/101/usuario/1');
      });
    });

    describe('Song reviews', () => {
      it('should generate cancionesByCancion endpoint', () => {
        expect(API_ENDPOINTS.resenas.cancionesByCancion(1001)).toBe('/resenas/canciones/1001');
      });

      it('should generate cancionesByUsuario endpoint', () => {
        expect(API_ENDPOINTS.resenas.cancionesByUsuario(1)).toBe('/resenas/canciones/usuario/1');
      });

      it('should generate cancionGetOne endpoint', () => {
        expect(API_ENDPOINTS.resenas.cancionGetOne(1001, 1)).toBe('/resenas/canciones/1001/usuario/1');
      });

      it('should have cancionCreate endpoint', () => {
        expect(API_ENDPOINTS.resenas.cancionCreate).toBe('/resenas/canciones');
      });

      it('should generate cancionUpdate endpoint', () => {
        expect(API_ENDPOINTS.resenas.cancionUpdate(1001, 1)).toBe('/resenas/canciones/1001/usuario/1');
      });

      it('should generate cancionDelete endpoint', () => {
        expect(API_ENDPOINTS.resenas.cancionDelete(1001, 1)).toBe('/resenas/canciones/1001/usuario/1');
      });
    });
  });

  describe('API_ENDPOINTS.generos', () => {
    it('should have getAll endpoint', () => {
      expect(API_ENDPOINTS.generos.getAll).toBe('/generos');
    });

    it('should generate getById endpoint', () => {
      expect(API_ENDPOINTS.generos.getById(1)).toBe('/generos/1');
    });

    it('should have create endpoint', () => {
      expect(API_ENDPOINTS.generos.create).toBe('/generos');
    });

    it('should generate update endpoint', () => {
      expect(API_ENDPOINTS.generos.update(5)).toBe('/generos/5');
    });

    it('should generate delete endpoint', () => {
      expect(API_ENDPOINTS.generos.delete(10)).toBe('/generos/10');
    });
  });

  describe('API_ENDPOINTS.albums (legacy)', () => {
    it('should have getAll endpoint', () => {
      expect(API_ENDPOINTS.albums.getAll).toBe('/albumes');
    });

    it('should generate getById endpoint with string id', () => {
      expect(API_ENDPOINTS.albums.getById('101')).toBe('/albumes/101');
    });

    it('should have create endpoint', () => {
      expect(API_ENDPOINTS.albums.create).toBe('/albumes');
    });

    it('should generate update endpoint with string id', () => {
      expect(API_ENDPOINTS.albums.update('50')).toBe('/albumes/50');
    });

    it('should generate delete endpoint with string id', () => {
      expect(API_ENDPOINTS.albums.delete('25')).toBe('/albumes/25');
    });

    it('should have search endpoint', () => {
      expect(API_ENDPOINTS.albums.search).toBe('/albumes/buscar');
    });

    it('should generate getTracks endpoint', () => {
      expect(API_ENDPOINTS.albums.getTracks('101')).toBe('/albumes/101/tracks');
    });

    it('should generate getReviews endpoint', () => {
      expect(API_ENDPOINTS.albums.getReviews('101')).toBe('/resenas/albumes/101');
    });

    it('should generate addReview endpoint', () => {
      expect(API_ENDPOINTS.albums.addReview('101')).toBe('/resenas/albumes');
    });
  });

  describe('API_ENDPOINTS.artists (legacy)', () => {
    it('should have getAll endpoint', () => {
      expect(API_ENDPOINTS.artists.getAll).toBe('/artistas');
    });

    it('should generate getById endpoint with string id', () => {
      expect(API_ENDPOINTS.artists.getById('1')).toBe('/artistas/1');
    });

    it('should have create endpoint', () => {
      expect(API_ENDPOINTS.artists.create).toBe('/artistas');
    });

    it('should generate update endpoint', () => {
      expect(API_ENDPOINTS.artists.update('5')).toBe('/artistas/5');
    });

    it('should generate delete endpoint', () => {
      expect(API_ENDPOINTS.artists.delete('10')).toBe('/artistas/10');
    });

    it('should have search endpoint', () => {
      expect(API_ENDPOINTS.artists.search).toBe('/artistas/buscar');
    });

    it('should generate getAlbums endpoint', () => {
      expect(API_ENDPOINTS.artists.getAlbums('1')).toBe('/artistas/1/albumes');
    });
  });

  describe('API_ENDPOINTS.songs (legacy)', () => {
    it('should have getAll endpoint', () => {
      expect(API_ENDPOINTS.songs.getAll).toBe('/canciones');
    });

    it('should generate getById endpoint with string id', () => {
      expect(API_ENDPOINTS.songs.getById('1001')).toBe('/canciones/1001');
    });

    it('should have create endpoint', () => {
      expect(API_ENDPOINTS.songs.create).toBe('/canciones');
    });

    it('should generate update endpoint', () => {
      expect(API_ENDPOINTS.songs.update('500')).toBe('/canciones/500');
    });

    it('should generate delete endpoint', () => {
      expect(API_ENDPOINTS.songs.delete('100')).toBe('/canciones/100');
    });

    it('should have search endpoint', () => {
      expect(API_ENDPOINTS.songs.search).toBe('/canciones/buscar');
    });

    it('should generate getReviews endpoint', () => {
      expect(API_ENDPOINTS.songs.getReviews('1001')).toBe('/resenas/canciones/1001');
    });

    it('should generate addReview endpoint', () => {
      expect(API_ENDPOINTS.songs.addReview('1001')).toBe('/resenas/canciones');
    });
  });

  describe('API_ENDPOINTS.users (legacy)', () => {
    it('should have getAll endpoint', () => {
      expect(API_ENDPOINTS.users.getAll).toBe('/usuarios');
    });

    it('should generate getById endpoint', () => {
      expect(API_ENDPOINTS.users.getById('1')).toBe('/usuarios/1');
    });

    it('should have create endpoint', () => {
      expect(API_ENDPOINTS.users.create).toBe('/usuarios');
    });

    it('should generate update endpoint', () => {
      expect(API_ENDPOINTS.users.update('5')).toBe('/usuarios/5');
    });

    it('should generate delete endpoint', () => {
      expect(API_ENDPOINTS.users.delete('10')).toBe('/usuarios/10');
    });

    it('should have profile endpoint', () => {
      expect(API_ENDPOINTS.users.profile).toBe('/usuarios/profile');
    });

    it('should have updateProfile endpoint', () => {
      expect(API_ENDPOINTS.users.updateProfile).toBe('/usuarios/profile');
    });

    it('should have changePassword endpoint', () => {
      expect(API_ENDPOINTS.users.changePassword).toBe('/usuarios/change-password');
    });
  });

  describe('API_ENDPOINTS.search', () => {
    it('should have global search endpoint', () => {
      expect(API_ENDPOINTS.search.global).toBe('/search');
    });

    it('should have suggestions endpoint', () => {
      expect(API_ENDPOINTS.search.suggestions).toBe('/search/suggestions');
    });
  });

  describe('API_ENDPOINTS.validation', () => {
    it('should have emailExists endpoint', () => {
      expect(API_ENDPOINTS.validation.emailExists).toBe('/validation/email');
    });

    it('should have usernameExists endpoint', () => {
      expect(API_ENDPOINTS.validation.usernameExists).toBe('/validation/username');
    });
  });

  describe('API_HEADERS', () => {
    it('should have contentType header', () => {
      expect(API_HEADERS.contentType).toBe('Content-Type');
    });

    it('should have authorization header', () => {
      expect(API_HEADERS.authorization).toBe('Authorization');
    });

    it('should have accept header', () => {
      expect(API_HEADERS.accept).toBe('Accept');
    });

    it('should have xRequestId header', () => {
      expect(API_HEADERS.xRequestId).toBe('X-Request-ID');
    });
  });

  describe('STORAGE_KEYS', () => {
    it('should have authToken key', () => {
      expect(STORAGE_KEYS.authToken).toBe('disc_and_records_token');
    });

    it('should have refreshToken key', () => {
      expect(STORAGE_KEYS.refreshToken).toBe('disc_and_records_refresh_token');
    });

    it('should have user key', () => {
      expect(STORAGE_KEYS.user).toBe('disc_and_records_user');
    });
  });
});
