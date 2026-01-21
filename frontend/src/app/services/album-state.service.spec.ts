import { TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { provideHttpClient } from '@angular/common/http';
import { AlbumStateService, PaginationState, AlbumFilters } from './album-state.service';
import { NotificationStreamService } from './notification-stream';
import { EventBusService, EventType } from './event-bus';
import { Album, PageResponse } from '../models/data.models';
import { Subject } from 'rxjs';

describe('AlbumStateService', () => {
  let service: AlbumStateService;
  let httpMock: HttpTestingController;
  let notificationSpy: jasmine.SpyObj<NotificationStreamService>;
  let eventBusSpy: jasmine.SpyObj<EventBusService>;
  let eventSubject: Subject<any>;

  const mockAlbum: Album = {
    id: '1',
    title: 'Test Album',
    artist: 'Test Artist',
    artistId: '10',
    coverUrl: 'https://example.com/cover.jpg',
    releaseYear: 2023,
    genre: 'Rock',
    tracks: 10,
    duration: '45:30',
    label: 'Test Label',
    description: 'Description',
    averageRating: 4.5,
    totalReviews: 100
  };

  const mockPageResponse: PageResponse<any> = {
    content: [
      { id: 1, tituloAlbum: 'Test Album', artista: { nombreArtista: 'Test Artist', id: 10 },
        caratulaUrl: 'cover.jpg', anioSalida: 2023, duracionTotal: 2730, pistas: 10,
        sello: 'Label', descripcion: 'Desc', generos: [{ id: 1, nombreGenero: 'Rock' }],
        puntuacionMedia: 4.5, numResenas: 100 }
    ],
    totalElements: 50,
    totalPages: 5,
    size: 12,
    page: 0,
    first: true,
    last: false
  };

  beforeEach(() => {
    eventSubject = new Subject();
    notificationSpy = jasmine.createSpyObj('NotificationStreamService', ['error', 'success']);
    eventBusSpy = jasmine.createSpyObj('EventBusService', ['on', 'emit']);
    eventBusSpy.on.and.returnValue(eventSubject.asObservable());

    TestBed.configureTestingModule({
      providers: [
        provideHttpClient(),
        provideHttpClientTesting(),
        AlbumStateService,
        { provide: NotificationStreamService, useValue: notificationSpy },
        { provide: EventBusService, useValue: eventBusSpy }
      ]
    });

    service = TestBed.inject(AlbumStateService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  describe('Initial State', () => {
    it('should be created', () => {
      expect(service).toBeTruthy();
    });

    it('should have empty albums initially', () => {
      expect(service.albums()).toEqual([]);
    });

    it('should have null selectedAlbum initially', () => {
      expect(service.selectedAlbum()).toBeNull();
    });

    it('should not be loading initially', () => {
      expect(service.isLoading()).toBeFalse();
    });

    it('should have default pagination', () => {
      const pagination = service.pagination();
      expect(pagination.page).toBe(0);
      expect(pagination.size).toBe(12);
      expect(pagination.isFirst).toBeTrue();
    });

    it('should have default filters', () => {
      const filters = service.filters();
      expect(filters.search).toBe('');
      expect(filters.sortBy).toBe('id');
      expect(filters.sortDir).toBe('asc');
    });
  });

  describe('Computed Signals', () => {
    it('hasMore should return false when isLast is true', () => {
      expect(service.hasMore()).toBeFalse();
    });

    it('totalAlbums should return totalElements from pagination', () => {
      expect(service.totalAlbums()).toBe(0);
    });

    it('isEmpty should return true when not loading and no albums', () => {
      expect(service.isEmpty()).toBeTrue();
    });
  });

  describe('search()', () => {
    it('should accept search query', () => {
      expect(() => service.search('test')).not.toThrow();
    });
  });

  describe('loadMore()', () => {
    it('should not throw when called', () => {
      expect(() => service.loadMore()).not.toThrow();
    });
  });

  describe('refresh()', () => {
    it('should not throw when called', () => {
      expect(() => service.refresh()).not.toThrow();
    });
  });

  describe('getById()', () => {
    it('should return observable', () => {
      const result = service.getById('1');
      expect(result).toBeTruthy();
      expect(result.subscribe).toBeDefined();
    });
  });

  describe('updateSort()', () => {
    it('should accept sort parameters', () => {
      expect(() => service.updateSort('tituloAlbum', 'desc')).not.toThrow();
    });
  });

  describe('clearFilters()', () => {
    it('should not throw when called', () => {
      expect(() => service.clearFilters()).not.toThrow();
    });
  });

  describe('filteredAlbums computed', () => {
    it('should return all albums when no search', () => {
      expect(service.filteredAlbums()).toEqual([]);
    });
  });

  describe('Event Bus Integration', () => {
    it('should subscribe to ALBUM_ADDED_TO_FAVORITES event', () => {
      expect(eventBusSpy.on).toHaveBeenCalledWith(EventType.ALBUM_ADDED_TO_FAVORITES);
    });

    it('should subscribe to ALBUM_REMOVED_FROM_FAVORITES event', () => {
      expect(eventBusSpy.on).toHaveBeenCalledWith(EventType.ALBUM_REMOVED_FROM_FAVORITES);
    });
  });
});
