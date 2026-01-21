import { TestBed, fakeAsync, tick } from '@angular/core/testing';
import { provideHttpClient } from '@angular/common/http';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { of } from 'rxjs';
import { ArtistService } from './artist.service';
import { DeezerService, DeezerArtist, DeezerAlbum, DeezerTrack } from './deezer.service';
import { MockDeezerService } from './mock-deezer.service';
import { API_CONFIG, API_ENDPOINTS } from '../config/api.config';
import { environment } from '../../environments/environment';

describe('ArtistService', () => {
  let service: ArtistService;
  let httpMock: HttpTestingController;
  let mockDeezerSpy: jasmine.SpyObj<MockDeezerService>;
  let deezerSpy: jasmine.SpyObj<DeezerService>;
  let originalUseMockData: boolean;

  const mockDeezerArtist = {
    id: 1,
    name: 'Test Artist',
    picture: 'https://example.com/picture.jpg',
    picture_small: 'https://example.com/small.jpg',
    picture_medium: 'https://example.com/medium.jpg',
    picture_big: 'https://example.com/big.jpg',
    picture_xl: 'https://example.com/xl.jpg',
    nb_album: 10,
    nb_fan: 500000
  } as DeezerArtist;

  const mockDeezerAlbum = {
    id: 101,
    title: 'Test Album',
    cover: 'https://example.com/cover.jpg',
    cover_small: '',
    cover_medium: '',
    cover_big: '',
    cover_xl: '',
    artist: mockDeezerArtist
  } as DeezerAlbum;

  const mockDeezerTrack = {
    id: 1001,
    readable: true,
    title: 'Test Song',
    title_short: 'Test Song',
    link: 'https://deezer.com/track/1001',
    duration: 200,
    rank: 100,
    explicit_lyrics: false,
    preview: 'https://preview.url',
    type: 'track',
    artist: mockDeezerArtist,
    album: mockDeezerAlbum
  } as DeezerTrack;

  beforeEach(() => {
    originalUseMockData = environment.useMockData;
    (environment as any).useMockData = true;

    mockDeezerSpy = jasmine.createSpyObj('MockDeezerService', [
      'getChartArtists', 'getArtistById', 'searchArtists', 'getArtistAlbums', 'getArtistTopTracks',
      'formatDuration', 'getBestAlbumCover', 'getBestArtistPicture', 'extractYear'
    ]);
    deezerSpy = jasmine.createSpyObj('DeezerService', [
      'getChartArtists', 'getArtistById', 'searchArtists', 'getArtistAlbums', 'getArtistTopTracks',
      'formatDuration', 'getBestAlbumCover', 'getBestArtistPicture', 'extractYear'
    ]);

    // Default mock returns for MockDeezerService (used when useMockData=true)
    mockDeezerSpy.getChartArtists.and.returnValue(of([mockDeezerArtist]));
    mockDeezerSpy.getArtistById.and.returnValue(of(mockDeezerArtist));
    mockDeezerSpy.searchArtists.and.returnValue(of([mockDeezerArtist]));
    mockDeezerSpy.getArtistAlbums.and.returnValue(of([mockDeezerAlbum]));
    mockDeezerSpy.getArtistTopTracks.and.returnValue(of([mockDeezerTrack]));
    mockDeezerSpy.formatDuration.and.returnValue('3:20');
    mockDeezerSpy.getBestAlbumCover.and.returnValue('https://example.com/cover.jpg');
    mockDeezerSpy.getBestArtistPicture.and.returnValue('https://example.com/artist.jpg');
    mockDeezerSpy.extractYear.and.returnValue(2023);

    // Also configure DeezerService spy (fallback or when useMockData=false)
    deezerSpy.getChartArtists.and.returnValue(of([mockDeezerArtist]));
    deezerSpy.getArtistById.and.returnValue(of(mockDeezerArtist));
    deezerSpy.searchArtists.and.returnValue(of([mockDeezerArtist]));
    deezerSpy.getArtistAlbums.and.returnValue(of([mockDeezerAlbum]));
    deezerSpy.getArtistTopTracks.and.returnValue(of([mockDeezerTrack]));
    deezerSpy.formatDuration.and.returnValue('3:20');
    deezerSpy.getBestAlbumCover.and.returnValue('https://example.com/cover.jpg');
    deezerSpy.getBestArtistPicture.and.returnValue('https://example.com/artist.jpg');
    deezerSpy.extractYear.and.returnValue(2023);

    TestBed.configureTestingModule({
      providers: [
        provideHttpClient(),
        provideHttpClientTesting(),
        { provide: MockDeezerService, useValue: mockDeezerSpy },
        { provide: DeezerService, useValue: deezerSpy },
        ArtistService
      ]
    });
    service = TestBed.inject(ArtistService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
    (environment as any).useMockData = originalUseMockData;
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('getPopularArtists()', () => {
    it('should return artists array', (done) => {
      service.getPopularArtists().subscribe(artists => {
        expect(Array.isArray(artists)).toBeTrue();
        expect(artists.length).toBeGreaterThan(0);
        done();
      });
    });

    it('should accept limit parameter', (done) => {
      service.getPopularArtists(10).subscribe(artists => {
        expect(Array.isArray(artists)).toBeTrue();
        expect(mockDeezerSpy.getChartArtists).toHaveBeenCalledWith(10);
        done();
      });
    });
  });

  describe('getArtistById()', () => {
    it('should return artist by id', (done) => {
      service.getArtistById('1').subscribe(artist => {
        expect(artist).not.toBeNull();
        expect(artist?.name).toBe('Test Artist');
        done();
      });
    });

    it('should return null when artist not found', (done) => {
      mockDeezerSpy.getArtistById.and.returnValue(of(null as any));
      service.getArtistById('999').subscribe(artist => {
        expect(artist).toBeNull();
        done();
      });
    });
  });

  describe('searchArtists()', () => {
    it('should return artists matching query', (done) => {
      service.searchArtists('test').subscribe(artists => {
        expect(Array.isArray(artists)).toBeTrue();
        expect(artists.length).toBeGreaterThan(0);
        expect(mockDeezerSpy.searchArtists).toHaveBeenCalledWith('test', 25);
        done();
      });
    });

    it('should return empty array on empty query', (done) => {
      mockDeezerSpy.searchArtists.and.returnValue(of([]));
      service.searchArtists('').subscribe(artists => {
        expect(Array.isArray(artists)).toBeTrue();
        done();
      });
    });
  });

  describe('getArtistAlbums()', () => {
    it('should return albums array', (done) => {
      service.getArtistAlbums('1').subscribe(albums => {
        expect(Array.isArray(albums)).toBeTrue();
        expect(albums.length).toBeGreaterThan(0);
        expect(mockDeezerSpy.getArtistAlbums).toHaveBeenCalledWith('1', 25);
        done();
      });
    });
  });

  describe('getArtistTopTracks()', () => {
    it('should return tracks array', (done) => {
      service.getArtistTopTracks('1').subscribe(tracks => {
        expect(Array.isArray(tracks)).toBeTrue();
        expect(tracks.length).toBeGreaterThan(0);
        expect(mockDeezerSpy.getArtistTopTracks).toHaveBeenCalledWith('1', 10);
        done();
      });
    });
  });

  describe('getAllArtists()', () => {
    it('should make GET request to backend', () => {
      service.getAllArtists().subscribe();
      const req = httpMock.expectOne(`${API_CONFIG.baseUrl}${API_ENDPOINTS.artistas.getAll}`);
      expect(req.request.method).toBe('GET');
      req.flush([]);
    });

    it('should map backend response to Artist array', fakeAsync(() => {
      const mockResponse = [
        { id: 1, nombreArtista: 'Artist 1', puntuacionMedia: 4.5 },
        { id: 2, nombreArtista: 'Artist 2', puntuacionMedia: null }
      ];

      let result: any;
      service.getAllArtists().subscribe(artists => result = artists);

      httpMock.expectOne(`${API_CONFIG.baseUrl}${API_ENDPOINTS.artistas.getAll}`).flush(mockResponse);
      tick();

      expect(result.length).toBe(2);
      expect(result[0].name).toBe('Artist 1');
    }));
  });

  describe('createArtist()', () => {
    it('should make POST request', () => {
      const newArtist = { name: 'New Artist', bio: '', photoUrl: '', genre: '', activeYears: '', albums: 0, monthlyListeners: 0 };

      service.createArtist(newArtist).subscribe();

      const req = httpMock.expectOne(`${API_CONFIG.baseUrl}${API_ENDPOINTS.artistas.create}`);
      expect(req.request.method).toBe('POST');
      expect(req.request.body).toEqual({ nombreArtista: 'New Artist' });
      req.flush({ id: 1, nombreArtista: 'New Artist', puntuacionMedia: null });
    });
  });

  describe('updateArtist()', () => {
    it('should make PUT request with correct URL', () => {
      const artist = { id: '5', name: 'Updated Artist', bio: '', photoUrl: '', genre: '', activeYears: '', albums: 0, monthlyListeners: 0 };

      service.updateArtist('5', artist).subscribe();

      const req = httpMock.expectOne(`${API_CONFIG.baseUrl}${API_ENDPOINTS.artistas.update(5)}`);
      expect(req.request.method).toBe('PUT');
      req.flush({ id: 5, nombreArtista: 'Updated Artist', puntuacionMedia: null });
    });
  });

  describe('patchArtist()', () => {
    it('should make PATCH request with partial data', () => {
      service.patchArtist('5', { name: 'Patched Name' }).subscribe();

      const req = httpMock.expectOne(`${API_CONFIG.baseUrl}${API_ENDPOINTS.artistas.update(5)}`);
      expect(req.request.method).toBe('PATCH');
      expect(req.request.body).toEqual({ nombreArtista: 'Patched Name' });
      req.flush({ id: 5, nombreArtista: 'Patched Name', puntuacionMedia: null });
    });
  });

  describe('deleteArtist()', () => {
    it('should make DELETE request with correct URL', () => {
      service.deleteArtist('5').subscribe();

      const req = httpMock.expectOne(`${API_CONFIG.baseUrl}${API_ENDPOINTS.artistas.delete(5)}`);
      expect(req.request.method).toBe('DELETE');
      req.flush(null);
    });
  });
});
