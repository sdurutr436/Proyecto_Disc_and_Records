import {
  mapAlbumResponseToLegacy,
  mapArtistaResponseToLegacy,
  mapResenaToLegacy,
  AlbumResponse,
  ArtistaResponse,
  ResenaAlbumResponse
} from './data.models';

describe('Data Model Mappers', () => {

  describe('mapAlbumResponseToLegacy()', () => {
    const mockArtista: ArtistaResponse = {
      id: 1,
      nombreArtista: 'Test Artist',
      puntuacionMedia: 4.5
    };

    const mockAlbum: AlbumResponse = {
      id: 100,
      tituloAlbum: 'Test Album',
      anioSalida: 2023,
      portadaUrl: 'http://example.com/cover.jpg',
      puntuacionMedia: 4.2,
      artista: mockArtista
    };

    it('should map id to string', () => {
      const result = mapAlbumResponseToLegacy(mockAlbum);
      expect(result.id).toBe('100');
    });

    it('should map tituloAlbum to title', () => {
      const result = mapAlbumResponseToLegacy(mockAlbum);
      expect(result.title).toBe('Test Album');
    });

    it('should map artista.nombreArtista to artist', () => {
      const result = mapAlbumResponseToLegacy(mockAlbum);
      expect(result.artist).toBe('Test Artist');
    });

    it('should map artista.id to artistId as string', () => {
      const result = mapAlbumResponseToLegacy(mockAlbum);
      expect(result.artistId).toBe('1');
    });

    it('should map portadaUrl to coverUrl', () => {
      const result = mapAlbumResponseToLegacy(mockAlbum);
      expect(result.coverUrl).toBe('http://example.com/cover.jpg');
    });

    it('should use placeholder when portadaUrl is null', () => {
      const albumWithoutCover = { ...mockAlbum, portadaUrl: null };
      const result = mapAlbumResponseToLegacy(albumWithoutCover);
      expect(result.coverUrl).toContain('placeholder');
    });

    it('should map anioSalida to releaseYear', () => {
      const result = mapAlbumResponseToLegacy(mockAlbum);
      expect(result.releaseYear).toBe(2023);
    });

    it('should map puntuacionMedia to averageRating', () => {
      const result = mapAlbumResponseToLegacy(mockAlbum);
      expect(result.averageRating).toBe(4.2);
    });

    it('should use 0 when puntuacionMedia is null', () => {
      const albumWithoutRating = { ...mockAlbum, puntuacionMedia: null };
      const result = mapAlbumResponseToLegacy(albumWithoutRating);
      expect(result.averageRating).toBe(0);
    });

    it('should set default values for unavailable fields', () => {
      const result = mapAlbumResponseToLegacy(mockAlbum);
      expect(result.genre).toBe('');
      expect(result.tracks).toBe(0);
      expect(result.duration).toBe('');
      expect(result.label).toBe('');
      expect(result.description).toBe('');
      expect(result.totalReviews).toBe(0);
    });
  });

  describe('mapArtistaResponseToLegacy()', () => {
    const mockArtista: ArtistaResponse = {
      id: 5,
      nombreArtista: 'Rock Band',
      puntuacionMedia: 4.8
    };

    it('should map id to string', () => {
      const result = mapArtistaResponseToLegacy(mockArtista);
      expect(result.id).toBe('5');
    });

    it('should map nombreArtista to name', () => {
      const result = mapArtistaResponseToLegacy(mockArtista);
      expect(result.name).toBe('Rock Band');
    });

    it('should use placeholder for photoUrl', () => {
      const result = mapArtistaResponseToLegacy(mockArtista);
      expect(result.photoUrl).toContain('placeholder');
    });

    it('should set default values for unavailable fields', () => {
      const result = mapArtistaResponseToLegacy(mockArtista);
      expect(result.bio).toBe('');
      expect(result.genre).toBe('');
      expect(result.activeYears).toBe('');
      expect(result.albums).toBe(0);
      expect(result.monthlyListeners).toBe(0);
    });
  });

  describe('mapResenaToLegacy()', () => {
    const mockResena: ResenaAlbumResponse = {
      usuarioId: 10,
      nombreUsuario: 'John Doe',
      avatarUsuario: 'http://example.com/avatar.jpg',
      albumId: 100,
      tituloAlbum: 'Test Album',
      portadaUrl: 'http://example.com/cover.jpg',
      puntuacion: 5,
      textoResena: 'Great album!',
      fechaResena: '2023-12-15T10:30:00Z',
      escuchado: true
    };

    it('should create composite id from usuarioId and albumId', () => {
      const result = mapResenaToLegacy(mockResena);
      expect(result.id).toBe('10-100');
    });

    it('should map usuarioId to userId as string', () => {
      const result = mapResenaToLegacy(mockResena);
      expect(result.userId).toBe('10');
    });

    it('should map nombreUsuario to userName', () => {
      const result = mapResenaToLegacy(mockResena);
      expect(result.userName).toBe('John Doe');
    });

    it('should map avatarUsuario to userAvatar', () => {
      const result = mapResenaToLegacy(mockResena);
      expect(result.userAvatar).toBe('http://example.com/avatar.jpg');
    });

    it('should use placeholder when avatarUsuario is null', () => {
      const resenaWithoutAvatar = { ...mockResena, avatarUsuario: null };
      const result = mapResenaToLegacy(resenaWithoutAvatar);
      expect(result.userAvatar).toContain('placeholder');
    });

    it('should map puntuacion to rating', () => {
      const result = mapResenaToLegacy(mockResena);
      expect(result.rating).toBe(5);
    });

    it('should map textoResena to content', () => {
      const result = mapResenaToLegacy(mockResena);
      expect(result.content).toBe('Great album!');
    });

    it('should convert fechaResena to Date', () => {
      const result = mapResenaToLegacy(mockResena);
      expect(result.date instanceof Date).toBeTrue();
    });

    it('should parse date correctly', () => {
      const result = mapResenaToLegacy(mockResena);
      const dateValue = result.date as Date;
      expect(dateValue.getFullYear()).toBe(2023);
      expect(dateValue.getMonth()).toBe(11); // December is 11
      expect(dateValue.getDate()).toBe(15);
    });

    it('should set likes to 0', () => {
      const result = mapResenaToLegacy(mockResena);
      expect(result.likes).toBe(0);
    });
  });
});
