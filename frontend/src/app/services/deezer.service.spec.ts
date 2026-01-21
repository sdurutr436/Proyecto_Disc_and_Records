/**
 * ============================================================================
 * TESTS EXHAUSTIVOS: DeezerService
 * ============================================================================
 *
 * PROPÓSITO:
 * Verificar el correcto funcionamiento del servicio de integración con Deezer API:
 * - Construcción de URLs con proxy backend
 * - Obtención de charts (álbumes, artistas, tracks)
 * - Búsqueda de contenido
 * - Manejo de errores
 * - Utilidades de mapeo (formatDuration, extractYear, etc.)
 *
 * ESTRATEGIA:
 * - HttpClientTestingModule para simular respuestas de la API
 * - Tests de todas las operaciones HTTP
 * - Tests de funciones utilitarias
 *
 * @author Tests para Discs & Records
 */

import { TestBed, fakeAsync, tick } from '@angular/core/testing';
import { provideHttpClient } from '@angular/common/http';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';

import { DeezerService, DeezerAlbum, DeezerArtist, DeezerTrack, DeezerChart } from './deezer.service';
import { API_CONFIG } from '../config/api.config';

describe('DeezerService', () => {
  let service: DeezerService;
  let httpMock: HttpTestingController;

  // ════════════════════════════════════════════════════════════════════════
  // DATOS DE PRUEBA
  // ════════════════════════════════════════════════════════════════════════

  const mockArtist: DeezerArtist = {
    id: 123,
    name: 'Test Artist',
    picture: 'http://cdn.deezer.com/artist/123.jpg',
    picture_small: 'http://cdn.deezer.com/artist/123_s.jpg',
    picture_medium: 'http://cdn.deezer.com/artist/123_m.jpg',
    picture_big: 'http://cdn.deezer.com/artist/123_b.jpg',
    picture_xl: 'http://cdn.deezer.com/artist/123_xl.jpg',
    nb_album: 10,
    nb_fan: 100000,
    tracklist: 'http://api.deezer.com/artist/123/top',
    type: 'artist'
  };

  const mockAlbum: DeezerAlbum = {
    id: 456,
    title: 'Test Album',
    cover: 'http://cdn.deezer.com/album/456.jpg',
    cover_small: 'http://cdn.deezer.com/album/456_s.jpg',
    cover_medium: 'http://cdn.deezer.com/album/456_m.jpg',
    cover_big: 'http://cdn.deezer.com/album/456_b.jpg',
    cover_xl: 'http://cdn.deezer.com/album/456_xl.jpg',
    release_date: '2023-06-15',
    record_type: 'album',
    tracklist: 'http://api.deezer.com/album/456/tracks',
    type: 'album',
    nb_tracks: 12,
    artist: mockArtist
  };

  const mockTrack: DeezerTrack = {
    id: 789,
    readable: true,
    title: 'Test Track',
    title_short: 'Test',
    link: 'http://deezer.com/track/789',
    duration: 245,
    track_position: 1,
    disk_number: 1,
    rank: 500000,
    explicit_lyrics: false,
    preview: 'http://cdn.deezer.com/preview/789.mp3',
    artist: mockArtist,
    type: 'track'
  };

  const mockChart: DeezerChart = {
    tracks: { data: [mockTrack] },
    albums: { data: [mockAlbum] },
    artists: { data: [mockArtist] },
    playlists: { data: [] }
  };

  // ════════════════════════════════════════════════════════════════════════
  // CONFIGURACIÓN
  // ════════════════════════════════════════════════════════════════════════

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        DeezerService,
        provideHttpClient(),
        provideHttpClientTesting()
      ]
    });

    service = TestBed.inject(DeezerService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
    service.clearCache();
  });

  // ════════════════════════════════════════════════════════════════════════
  // GRUPO 1: Creación del Servicio
  // ════════════════════════════════════════════════════════════════════════

  describe('Creación del Servicio', () => {
    it('should be created', () => {
      expect(service).toBeTruthy();
    });

    it('should be an instance of DeezerService', () => {
      expect(service).toBeInstanceOf(DeezerService);
    });
  });

  // ════════════════════════════════════════════════════════════════════════
  // GRUPO 2: Charts
  // ════════════════════════════════════════════════════════════════════════

  describe('Charts', () => {
    describe('getChart', () => {
      it('should fetch chart data', fakeAsync(() => {
        let result: DeezerChart | null = null;
        service.getChart().subscribe(chart => {
          result = chart;
        });
        tick();

        const req = httpMock.expectOne(req => req.url.includes('/api/deezer/chart'));
        expect(req.request.method).toBe('GET');
        req.flush(mockChart);

        expect(result).not.toBeNull();
        expect(result!.albums.data.length).toBe(1);
        expect(result!.artists.data.length).toBe(1);
        expect(result!.tracks.data.length).toBe(1);
      }));

      it('should return empty chart on error', fakeAsync(() => {
        let result: DeezerChart | null = null;
        service.getChart().subscribe(chart => {
          result = chart;
        });
        tick();

        const req = httpMock.expectOne(req => req.url.includes('/api/deezer/chart'));
        req.flush('Error', { status: 500, statusText: 'Server Error' });

        expect(result).not.toBeNull();
        expect(result!.albums.data).toEqual([]);
        expect(result!.artists.data).toEqual([]);
        expect(result!.tracks.data).toEqual([]);
      }));
    });

    describe('getChartCached', () => {
      it('should return cached chart on subsequent calls', fakeAsync(() => {
        // Primera llamada
        service.getChartCached().subscribe();
        tick();

        const req = httpMock.expectOne(req => req.url.includes('/api/deezer/chart'));
        req.flush(mockChart);

        // Segunda llamada - debería usar caché
        let secondResult: DeezerChart | null = null;
        service.getChartCached().subscribe(chart => {
          secondResult = chart;
        });
        tick();

        // No debería haber otra petición HTTP
        httpMock.expectNone(req => req.url.includes('/api/deezer/chart'));
        expect(secondResult).not.toBeNull();
      }));
    });

    describe('getChartAlbums', () => {
      it('should fetch chart albums with default limit', fakeAsync(() => {
        let result: DeezerAlbum[] = [];
        service.getChartAlbums().subscribe(albums => {
          result = albums;
        });
        tick();

        const req = httpMock.expectOne(req =>
          req.url.includes('/api/deezer/chart/0/albums') &&
          req.url.includes('limit=50')
        );
        req.flush({ data: [mockAlbum] });

        expect(result.length).toBe(1);
        expect(result[0].title).toBe('Test Album');
      }));

      it('should fetch chart albums with custom limit', fakeAsync(() => {
        service.getChartAlbums(10).subscribe();
        tick();

        const req = httpMock.expectOne(req =>
          req.url.includes('limit=10')
        );
        req.flush({ data: [] });
      }));

      it('should fetch chart albums with index offset', fakeAsync(() => {
        service.getChartAlbums(50, 25).subscribe();
        tick();

        const req = httpMock.expectOne(req =>
          req.url.includes('index=25')
        );
        req.flush({ data: [] });
      }));

      it('should return empty array on error', fakeAsync(() => {
        let result: DeezerAlbum[] = [];
        service.getChartAlbums().subscribe(albums => {
          result = albums;
        });
        tick();

        const req = httpMock.expectOne(req => req.url.includes('/chart/0/albums'));
        req.flush('Error', { status: 500, statusText: 'Server Error' });

        expect(result).toEqual([]);
      }));
    });

    describe('getChartArtists', () => {
      it('should fetch chart artists', fakeAsync(() => {
        let result: DeezerArtist[] = [];
        service.getChartArtists(20).subscribe(artists => {
          result = artists;
        });
        tick();

        const req = httpMock.expectOne(req =>
          req.url.includes('/chart/0/artists') &&
          req.url.includes('limit=20')
        );
        req.flush({ data: [mockArtist] });

        expect(result.length).toBe(1);
        expect(result[0].name).toBe('Test Artist');
      }));
    });

    describe('getChartTracks', () => {
      it('should fetch chart tracks', fakeAsync(() => {
        let result: DeezerTrack[] = [];
        service.getChartTracks(30).subscribe(tracks => {
          result = tracks;
        });
        tick();

        const req = httpMock.expectOne(req =>
          req.url.includes('/chart/0/tracks') &&
          req.url.includes('limit=30')
        );
        req.flush({ data: [mockTrack] });

        expect(result.length).toBe(1);
        expect(result[0].title).toBe('Test Track');
      }));
    });
  });

  // ════════════════════════════════════════════════════════════════════════
  // GRUPO 3: Álbumes
  // ════════════════════════════════════════════════════════════════════════

  describe('Albums', () => {
    describe('getAlbumById', () => {
      it('should fetch album by numeric ID', fakeAsync(() => {
        let result: DeezerAlbum | null = null;
        service.getAlbumById(456).subscribe(album => {
          result = album;
        });
        tick();

        const req = httpMock.expectOne(req => req.url.includes('/album/456'));
        req.flush(mockAlbum);

        expect(result).not.toBeNull();
        expect(result!.title).toBe('Test Album');
      }));

      it('should fetch album by string ID', fakeAsync(() => {
        service.getAlbumById('456').subscribe();
        tick();

        const req = httpMock.expectOne(req => req.url.includes('/album/456'));
        req.flush(mockAlbum);
      }));

      it('should return null on error', fakeAsync(() => {
        let result: DeezerAlbum | null = undefined as any;
        service.getAlbumById(999).subscribe(album => {
          result = album;
        });
        tick();

        const req = httpMock.expectOne(req => req.url.includes('/album/999'));
        req.flush('Not found', { status: 404, statusText: 'Not Found' });

        expect(result).toBeNull();
      }));
    });

    describe('searchAlbums', () => {
      it('should search albums with query', fakeAsync(() => {
        let result: DeezerAlbum[] = [];
        service.searchAlbums('radiohead', 10).subscribe(albums => {
          result = albums;
        });
        tick();

        const req = httpMock.expectOne(req =>
          req.url.includes('/search/album') &&
          req.url.includes('q=radiohead') &&
          req.url.includes('limit=10')
        );
        req.flush({ data: [mockAlbum], total: 1 });

        expect(result.length).toBe(1);
      }));

      it('should encode special characters in query', fakeAsync(() => {
        service.searchAlbums('rock & roll').subscribe();
        tick();

        const req = httpMock.expectOne(req =>
          req.url.includes('q=rock%20%26%20roll')
        );
        req.flush({ data: [], total: 0 });
      }));

      it('should return empty array for empty query', fakeAsync(() => {
        let result: DeezerAlbum[] = [];
        service.searchAlbums('').subscribe(albums => {
          result = albums;
        });
        tick();

        httpMock.expectNone(req => req.url.includes('/search'));
        expect(result).toEqual([]);
      }));

      it('should return empty array for whitespace query', fakeAsync(() => {
        let result: DeezerAlbum[] = [];
        service.searchAlbums('   ').subscribe(albums => {
          result = albums;
        });
        tick();

        httpMock.expectNone(req => req.url.includes('/search'));
        expect(result).toEqual([]);
      }));
    });

    describe('getAlbumTracks', () => {
      it('should fetch album tracks', fakeAsync(() => {
        let result: DeezerTrack[] = [];
        service.getAlbumTracks(456).subscribe(tracks => {
          result = tracks;
        });
        tick();

        const req = httpMock.expectOne(req =>
          req.url.includes('/album/456/tracks')
        );
        req.flush({ data: [mockTrack] });

        expect(result.length).toBe(1);
        expect(result[0].title).toBe('Test Track');
      }));

      it('should return empty array on error', fakeAsync(() => {
        let result: DeezerTrack[] = [];
        service.getAlbumTracks(999).subscribe(tracks => {
          result = tracks;
        });
        tick();

        const req = httpMock.expectOne(req => req.url.includes('/album/999/tracks'));
        req.flush('Error', { status: 500, statusText: 'Error' });

        expect(result).toEqual([]);
      }));
    });
  });

  // ════════════════════════════════════════════════════════════════════════
  // GRUPO 4: Artistas
  // ════════════════════════════════════════════════════════════════════════

  describe('Artists', () => {
    describe('getArtistById', () => {
      it('should fetch artist by ID', fakeAsync(() => {
        let result: DeezerArtist | null = null;
        service.getArtistById(123).subscribe(artist => {
          result = artist;
        });
        tick();

        const req = httpMock.expectOne(req => req.url.includes('/artist/123'));
        req.flush(mockArtist);

        expect(result).not.toBeNull();
        expect(result!.name).toBe('Test Artist');
      }));

      it('should return null on error', fakeAsync(() => {
        let result: DeezerArtist | null = undefined as any;
        service.getArtistById(999).subscribe(artist => {
          result = artist;
        });
        tick();

        const req = httpMock.expectOne(req => req.url.includes('/artist/999'));
        req.flush('Not found', { status: 404, statusText: 'Not Found' });

        expect(result).toBeNull();
      }));
    });

    describe('searchArtists', () => {
      it('should search artists with query', fakeAsync(() => {
        let result: DeezerArtist[] = [];
        service.searchArtists('beatles').subscribe(artists => {
          result = artists;
        });
        tick();

        const req = httpMock.expectOne(req =>
          req.url.includes('/search/artist') &&
          req.url.includes('q=beatles')
        );
        req.flush({ data: [mockArtist], total: 1 });

        expect(result.length).toBe(1);
      }));

      it('should return empty array for empty query', fakeAsync(() => {
        let result: DeezerArtist[] = [];
        service.searchArtists('').subscribe(artists => {
          result = artists;
        });
        tick();

        httpMock.expectNone(req => req.url.includes('/search'));
        expect(result).toEqual([]);
      }));
    });

    describe('getArtistAlbums', () => {
      it('should fetch artist albums', fakeAsync(() => {
        let result: DeezerAlbum[] = [];
        service.getArtistAlbums(123, 10).subscribe(albums => {
          result = albums;
        });
        tick();

        const req = httpMock.expectOne(req =>
          req.url.includes('/artist/123/albums') &&
          req.url.includes('limit=10')
        );
        req.flush({ data: [mockAlbum] });

        expect(result.length).toBe(1);
      }));
    });

    describe('getArtistTopTracks', () => {
      it('should fetch artist top tracks', fakeAsync(() => {
        let result: DeezerTrack[] = [];
        service.getArtistTopTracks(123, 5).subscribe(tracks => {
          result = tracks;
        });
        tick();

        const req = httpMock.expectOne(req =>
          req.url.includes('/artist/123/top') &&
          req.url.includes('limit=5')
        );
        req.flush({ data: [mockTrack] });

        expect(result.length).toBe(1);
      }));
    });
  });

  // ════════════════════════════════════════════════════════════════════════
  // GRUPO 5: Tracks
  // ════════════════════════════════════════════════════════════════════════

  describe('Tracks', () => {
    describe('getTrackById', () => {
      it('should fetch track by ID', fakeAsync(() => {
        let result: DeezerTrack | null = null;
        service.getTrackById(789).subscribe(track => {
          result = track;
        });
        tick();

        const req = httpMock.expectOne(req => req.url.includes('/track/789'));
        req.flush(mockTrack);

        expect(result).not.toBeNull();
        expect(result!.title).toBe('Test Track');
      }));
    });

    describe('searchTracks', () => {
      it('should search tracks with query', fakeAsync(() => {
        let result: DeezerTrack[] = [];
        service.searchTracks('love song').subscribe(tracks => {
          result = tracks;
        });
        tick();

        const req = httpMock.expectOne(req =>
          req.url.includes('/search/track') &&
          req.url.includes('q=love%20song')
        );
        req.flush({ data: [mockTrack], total: 1 });

        expect(result.length).toBe(1);
      }));

      it('should return empty array for empty query', fakeAsync(() => {
        let result: DeezerTrack[] = [];
        service.searchTracks('').subscribe(tracks => {
          result = tracks;
        });
        tick();

        httpMock.expectNone(req => req.url.includes('/search'));
        expect(result).toEqual([]);
      }));
    });
  });

  // ════════════════════════════════════════════════════════════════════════
  // GRUPO 6: Búsqueda Global
  // ════════════════════════════════════════════════════════════════════════

  describe('Global Search', () => {
    describe('search', () => {
      it('should perform global search', fakeAsync(() => {
        let result: any = null;
        service.search('rock music').subscribe(data => {
          result = data;
        });
        tick();

        const req = httpMock.expectOne(req =>
          req.url.includes('/search') &&
          req.url.includes('q=rock%20music')
        );
        req.flush({ data: [mockTrack], total: 1 });

        expect(result).not.toBeNull();
        expect(result.tracks.length).toBe(1);
      }));

      it('should return empty results for empty query', fakeAsync(() => {
        let result: any = null;
        service.search('').subscribe(data => {
          result = data;
        });
        tick();

        httpMock.expectNone(req => req.url.includes('/search'));
        expect(result.albums).toEqual([]);
        expect(result.artists).toEqual([]);
        expect(result.tracks).toEqual([]);
      }));
    });
  });

  // ════════════════════════════════════════════════════════════════════════
  // GRUPO 7: Géneros
  // ════════════════════════════════════════════════════════════════════════

  describe('Genres', () => {
    describe('getGenres', () => {
      it('should fetch all genres', fakeAsync(() => {
        const mockGenres = [
          { id: 1, name: 'Rock', picture: 'http://example.com/rock.jpg' },
          { id: 2, name: 'Pop', picture: 'http://example.com/pop.jpg' }
        ];

        let result: any[] = [];
        service.getGenres().subscribe(genres => {
          result = genres;
        });
        tick();

        const req = httpMock.expectOne(req => req.url.includes('/genre'));
        req.flush({ data: mockGenres });

        expect(result.length).toBe(2);
        expect(result[0].name).toBe('Rock');
      }));

      it('should return empty array on error', fakeAsync(() => {
        let result: any[] = [];
        service.getGenres().subscribe(genres => {
          result = genres;
        });
        tick();

        const req = httpMock.expectOne(req => req.url.includes('/genre'));
        req.flush('Error', { status: 500, statusText: 'Error' });

        expect(result).toEqual([]);
      }));
    });
  });

  // ════════════════════════════════════════════════════════════════════════
  // GRUPO 8: Utilidades
  // ════════════════════════════════════════════════════════════════════════

  describe('Utility Methods', () => {
    describe('getBestAlbumCover', () => {
      it('should return cover_big when preferBig is true', () => {
        const result = service.getBestAlbumCover(mockAlbum, true);
        expect(result).toBe(mockAlbum.cover_big);
      });

      it('should prefer cover_xl when cover_big is missing', () => {
        const albumWithoutBig: DeezerAlbum = {
          ...mockAlbum,
          cover_big: ''
        };
        const result = service.getBestAlbumCover(albumWithoutBig);
        expect(result).toBe(mockAlbum.cover_xl);
      });

      it('should fallback to cover_medium', () => {
        const albumMinimal: DeezerAlbum = {
          ...mockAlbum,
          cover_big: '',
          cover_xl: ''
        };
        const result = service.getBestAlbumCover(albumMinimal);
        expect(result).toBe(mockAlbum.cover_medium);
      });

      it('should return placeholder when no cover available', () => {
        const albumNoCover: DeezerAlbum = {
          ...mockAlbum,
          cover: '',
          cover_small: '',
          cover_medium: '',
          cover_big: '',
          cover_xl: ''
        };
        const result = service.getBestAlbumCover(albumNoCover);
        expect(result).toBe('assets/album-placeholder.svg');
      });
    });

    describe('getBestArtistPicture', () => {
      it('should return picture_big when preferBig is true', () => {
        const result = service.getBestArtistPicture(mockArtist, true);
        expect(result).toBe(mockArtist.picture_big);
      });

      it('should fallback through picture sizes', () => {
        const artistMinimal: DeezerArtist = {
          ...mockArtist,
          picture_big: '',
          picture_xl: ''
        };
        const result = service.getBestArtistPicture(artistMinimal);
        expect(result).toBe(mockArtist.picture_medium);
      });

      it('should return placeholder when no picture available', () => {
        const artistNoPicture: DeezerArtist = {
          ...mockArtist,
          picture: '',
          picture_small: '',
          picture_medium: '',
          picture_big: '',
          picture_xl: ''
        };
        const result = service.getBestArtistPicture(artistNoPicture);
        expect(result).toBe('assets/artist-placeholder.svg');
      });
    });

    describe('formatDuration', () => {
      it('should format duration correctly', () => {
        expect(service.formatDuration(0)).toBe('0:00');
        expect(service.formatDuration(45)).toBe('0:45');
        expect(service.formatDuration(60)).toBe('1:00');
        expect(service.formatDuration(125)).toBe('2:05');
        expect(service.formatDuration(3661)).toBe('61:01');
      });

      it('should pad seconds with leading zero', () => {
        expect(service.formatDuration(65)).toBe('1:05');
        expect(service.formatDuration(309)).toBe('5:09');
      });
    });

    describe('extractYear', () => {
      it('should extract year from date string', () => {
        expect(service.extractYear('2023-06-15')).toBe(2023);
        expect(service.extractYear('1999-01-01')).toBe(1999);
        expect(service.extractYear('2000-12-31')).toBe(2000);
      });

      it('should return current year for empty string', () => {
        const currentYear = new Date().getFullYear();
        expect(service.extractYear('')).toBe(currentYear);
      });
    });

    describe('clearCache', () => {
      it('should clear the chart cache', fakeAsync(() => {
        // Primera llamada - llena el caché
        service.getChartCached().subscribe();
        tick();

        const req1 = httpMock.expectOne(req => req.url.includes('/api/deezer/chart'));
        req1.flush(mockChart);

        // Limpiar caché
        service.clearCache();

        // Segunda llamada - debería hacer nueva petición
        service.getChartCached().subscribe();
        tick();

        const req2 = httpMock.expectOne(req => req.url.includes('/api/deezer/chart'));
        req2.flush(mockChart);
      }));
    });
  });

  // ════════════════════════════════════════════════════════════════════════
  // GRUPO 9: Manejo de errores
  // ════════════════════════════════════════════════════════════════════════

  describe('Error Handling', () => {
    it('should handle network errors gracefully', fakeAsync(() => {
      let result: DeezerAlbum[] = [];
      service.getChartAlbums().subscribe(albums => {
        result = albums;
      });
      tick();

      const req = httpMock.expectOne(req => req.url.includes('/chart/0/albums'));
      req.error(new ProgressEvent('Network error'));

      expect(result).toEqual([]);
    }));

    it('should handle 404 errors', fakeAsync(() => {
      let result: DeezerAlbum | null = undefined as any;
      service.getAlbumById(99999).subscribe(album => {
        result = album;
      });
      tick();

      const req = httpMock.expectOne(req => req.url.includes('/album/99999'));
      req.flush('Not found', { status: 404, statusText: 'Not Found' });

      expect(result).toBeNull();
    }));

    it('should handle 500 errors', fakeAsync(() => {
      let result: DeezerArtist[] = [];
      service.getChartArtists().subscribe(artists => {
        result = artists;
      });
      tick();

      const req = httpMock.expectOne(req => req.url.includes('/chart/0/artists'));
      req.flush('Server error', { status: 500, statusText: 'Internal Server Error' });

      expect(result).toEqual([]);
    }));
  });
});
