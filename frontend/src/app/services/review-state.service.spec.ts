import { TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { provideHttpClient } from '@angular/common/http';
import { signal } from '@angular/core';
import { Subject } from 'rxjs';
import { ReviewStateService } from './review-state.service';
import { NotificationStreamService } from './notification-stream';
import { EventBusService, EventType } from './event-bus';
import { AppStateService } from './app-state';
import { Review } from '../models/data.models';

describe('ReviewStateService', () => {
  let service: ReviewStateService;
  let httpMock: HttpTestingController;
  let notificationSpy: jasmine.SpyObj<NotificationStreamService>;
  let eventBusSpy: jasmine.SpyObj<EventBusService>;
  let appStateSpy: jasmine.SpyObj<AppStateService>;
  let eventSubject: Subject<any>;

  const mockReview: Review = {
    id: '1',
    albumId: '100',
    userId: '10',
    userName: 'Test User',
    userAvatar: 'https://example.com/avatar.jpg',
    rating: 4,
    content: 'Great album!',
    date: new Date().toISOString(),
    likes: 0
  };

  const mockResenaResponse = {
    id: 1,
    usuarioId: 10,
    usuarioNombre: 'Test User',
    albumId: 100,
    puntuacion: 4,
    comentario: 'Great album!',
    fechaCreacion: new Date().toISOString(),
    fechaActualizacion: new Date().toISOString()
  };

  beforeEach(() => {
    eventSubject = new Subject();
    notificationSpy = jasmine.createSpyObj('NotificationStreamService', ['error', 'success']);
    eventBusSpy = jasmine.createSpyObj('EventBusService', ['on', 'emit']);
    eventBusSpy.on.and.returnValue(eventSubject.asObservable());
    appStateSpy = jasmine.createSpyObj('AppStateService', [], {
      currentUser: signal(null)
    });

    TestBed.configureTestingModule({
      providers: [
        provideHttpClient(),
        provideHttpClientTesting(),
        ReviewStateService,
        { provide: NotificationStreamService, useValue: notificationSpy },
        { provide: EventBusService, useValue: eventBusSpy },
        { provide: AppStateService, useValue: appStateSpy }
      ]
    });

    service = TestBed.inject(ReviewStateService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  describe('Initial State', () => {
    it('should be created', () => {
      expect(service).toBeTruthy();
    });

    it('should have empty userReviews initially', () => {
      expect(service.userReviews()).toEqual([]);
    });

    it('should not be submitting initially', () => {
      expect(service.isSubmitting()).toBeFalse();
    });

    it('should have null error initially', () => {
      expect(service.error()).toBeNull();
    });
  });

  describe('Computed Signals', () => {
    it('userReviewsCount should return 0 when no reviews', () => {
      expect(service.userReviewsCount()).toBe(0);
    });

    it('userAverageRating should return 0 when no reviews', () => {
      expect(service.userAverageRating()).toBe(0);
    });
  });

  describe('getReviewsForAlbum()', () => {
    it('should return empty array and trigger load if not cached', () => {
      const reviews = service.getReviewsForAlbum('100');
      expect(reviews).toEqual([]);

      // Should have triggered a load
      const req = httpMock.expectOne(r => r.url.includes('/api/resenas/albumes/100'));
      req.flush([mockResenaResponse]);
    });
  });

  describe('loadReviewsForAlbum()', () => {
    it('should fetch reviews from server', fakeAsync(() => {
      service.loadReviewsForAlbum('100');

      const req = httpMock.expectOne(r => r.url.includes('/api/resenas/albumes/100'));
      expect(req.request.method).toBe('GET');
      req.flush([mockResenaResponse]);

      tick();
    }));

    it('should not load if already loading', fakeAsync(() => {
      service.loadReviewsForAlbum('100');
      service.loadReviewsForAlbum('100'); // Second call should be ignored

      const req = httpMock.expectOne(r => r.url.includes('/api/resenas/albumes/100'));
      req.flush([mockResenaResponse]);
      tick();
    }));
  });

  describe('hasUserReviewed()', () => {
    it('should return false when user is not logged in', () => {
      expect(service.hasUserReviewed('100')).toBeFalse();
    });
  });

  describe('getUserReviewForAlbum()', () => {
    it('should return null when user is not logged in', () => {
      expect(service.getUserReviewForAlbum('100')).toBeNull();
    });
  });

  describe('isLoadingAlbum()', () => {
    it('should return false initially', () => {
      expect(service.isLoadingAlbum('100')).toBeFalse();
    });

    it('should return true while loading', fakeAsync(() => {
      service.loadReviewsForAlbum('100');
      expect(service.isLoadingAlbum('100')).toBeTrue();

      const req = httpMock.expectOne(r => r.url.includes('/api/resenas/albumes/100'));
      req.flush([]);
      tick();

      expect(service.isLoadingAlbum('100')).toBeFalse();
    }));
  });

  describe('Event Bus Integration', () => {
    it('should subscribe to USER_LOGIN event', () => {
      expect(eventBusSpy.on).toHaveBeenCalledWith(EventType.USER_LOGIN);
    });
  });

  describe('refreshAlbumReviews()', () => {
    it('should trigger refresh for album', fakeAsync(() => {
      service.refreshAlbumReviews('100');

      const req = httpMock.expectOne(r => r.url.includes('/api/resenas/albumes/100'));
      req.flush([mockResenaResponse]);
      tick();
    }));
  });
});
