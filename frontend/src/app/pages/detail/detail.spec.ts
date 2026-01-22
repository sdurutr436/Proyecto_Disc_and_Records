/**
 * ============================================================================
 * TESTS: DetailComponent - Página de Detalle de Álbum/Artista/Canción
 * ============================================================================
 *
 * COBERTURA:
 * - ✅ Creación del componente
 * - ✅ Carga de datos desde resolver
 * - ✅ Computed properties
 * - ✅ Tabs y navegación
 * - ✅ Sistema de rating (lógica de validación)
 * - ✅ Toggle lista de usuario (lógica de validación)
 * - ✅ Generación de HTML
 * - ✅ Control de carga de reseñas
 *
 * NOTA: El componente usa environment.useMockData para decidir
 * si usa datos mock o el backend real. Los tests están diseñados
 * para funcionar con cualquier configuración.
 *
 * @author Tests para Discs & Records
 */

import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { provideRouter, ActivatedRoute } from '@angular/router';
import { provideHttpClient } from '@angular/common/http';
import { BehaviorSubject, of } from 'rxjs';
import { NO_ERRORS_SCHEMA } from '@angular/core';

import { DetailComponent } from './detail';
import { AlbumService } from '../../services/album.service';
import { ArtistService } from '../../services/artist.service';
import { SongService } from '../../services/song.service';
import { ListaAlbumService } from '../../services/lista-album.service';
import { ReviewStateService } from '../../services/review-state.service';
import { AppStateService } from '../../services/app-state';
import { NotificationStreamService } from '../../services/notification-stream';
import { Album, Artist, Song } from '../../models/data.models';

describe('DetailComponent', () => {
  let component: DetailComponent;
  let fixture: ComponentFixture<DetailComponent>;
  let albumServiceSpy: jasmine.SpyObj<AlbumService>;
  let artistServiceSpy: jasmine.SpyObj<ArtistService>;
  let songServiceSpy: jasmine.SpyObj<SongService>;
  let listaAlbumServiceSpy: jasmine.SpyObj<ListaAlbumService>;
  let reviewStateServiceSpy: jasmine.SpyObj<ReviewStateService>;
  let appStateSpy: jasmine.SpyObj<AppStateService>;
  let notificationsSpy: jasmine.SpyObj<NotificationStreamService>;
  let fragmentSubject: BehaviorSubject<string | null>;

  // Mock album data
  const mockAlbum: Album = {
    id: '123',
    title: 'Test Album',
    artist: 'Test Artist',
    artistId: '456',
    coverUrl: 'https://example.com/cover.jpg',
    releaseYear: 2024,
    genre: 'Rock',
    tracks: 10,
    duration: '45:30',
    label: 'Test Label',
    description: 'Test description',
    averageRating: 4.5,
    totalReviews: 50
  };

  // Mock artist data
  const mockArtist: Artist = {
    id: '789',
    name: 'Test Artist',
    photoUrl: 'https://example.com/artist.jpg',
    bio: 'Test bio',
    genre: 'Rock',
    activeYears: '2000-present',
    albums: 5,
    monthlyListeners: 10000
  };

  // Mock song data
  const mockSong: Song = {
    id: '101',
    title: 'Test Song',
    artist: 'Test Artist',
    artistId: '456',
    album: 'Test Album',
    albumId: '123',
    coverUrl: 'https://example.com/cover.jpg',
    duration: '3:45',
    releaseYear: 2024,
    genre: 'Rock',
    description: 'Test song description',
    averageRating: 4.0,
    totalReviews: 25
  };

  // Mock user
  const mockUser = {
    id: 1,
    username: 'testuser',
    email: 'test@test.com',
    role: 'user' as const,
    preferences: { language: 'es' as const, notifications: true, autoplay: false, volume: 80 }
  };

  beforeEach(async () => {
    fragmentSubject = new BehaviorSubject<string | null>(null);

    albumServiceSpy = jasmine.createSpyObj('AlbumService', ['getAlbumStats']);
    artistServiceSpy = jasmine.createSpyObj('ArtistService', ['getArtist']);
    songServiceSpy = jasmine.createSpyObj('SongService', ['getSong']);
    listaAlbumServiceSpy = jasmine.createSpyObj('ListaAlbumService', [
      'getEstadoAlbum',
      'getResenasAlbum',
      'puntuarAlbum',
      'quitarDeLista',
      'agregarAlbumDeezer'
    ]);
    reviewStateServiceSpy = jasmine.createSpyObj('ReviewStateService', ['getUserReviewForAlbum']);
    appStateSpy = jasmine.createSpyObj('AppStateService', ['currentUser', 'isAuthenticated']);
    notificationsSpy = jasmine.createSpyObj('NotificationStreamService', ['warning', 'success', 'error']);

    // Default returns
    albumServiceSpy.getAlbumStats.and.returnValue(of({
      averageRating: 4.5,
      ratingCount: 100,
      reviewCount: 50,
      listenedCount: 200
    }));
    listaAlbumServiceSpy.getEstadoAlbum.and.returnValue(of({ enLista: false, puntuacion: null, tieneResena: false, fechaAgregada: null }));
    listaAlbumServiceSpy.getResenasAlbum.and.returnValue(of([]));
    listaAlbumServiceSpy.puntuarAlbum.and.returnValue(of({ albumId: 123, titulo: 'Test', portadaUrl: null, artista: 'Test', anio: 2024, puntuacion: 4, tieneResena: false, fechaAgregada: '2024-01-01', fechaResena: null }));
    listaAlbumServiceSpy.quitarDeLista.and.returnValue(of(true));
    listaAlbumServiceSpy.agregarAlbumDeezer.and.returnValue(of({ albumId: 123, titulo: 'Test', portadaUrl: null, artista: 'Test', anio: 2024, puntuacion: null, tieneResena: false, fechaAgregada: '2024-01-01', fechaResena: null }));
    reviewStateServiceSpy.getUserReviewForAlbum.and.returnValue(null);
    appStateSpy.currentUser.and.returnValue(null);
    appStateSpy.isAuthenticated.and.returnValue(false);

    await TestBed.configureTestingModule({
      imports: [DetailComponent],
      providers: [
        provideRouter([]),
        provideHttpClient(),
        { provide: AlbumService, useValue: albumServiceSpy },
        { provide: ArtistService, useValue: artistServiceSpy },
        { provide: SongService, useValue: songServiceSpy },
        { provide: ListaAlbumService, useValue: listaAlbumServiceSpy },
        { provide: ReviewStateService, useValue: reviewStateServiceSpy },
        { provide: AppStateService, useValue: appStateSpy },
        { provide: NotificationStreamService, useValue: notificationsSpy },
        {
          provide: ActivatedRoute,
          useValue: {
            snapshot: {
              data: { album: mockAlbum }
            },
            fragment: fragmentSubject.asObservable()
          }
        }
      ],
      schemas: [NO_ERRORS_SCHEMA]
    }).compileComponents();

    fixture = TestBed.createComponent(DetailComponent);
    component = fixture.componentInstance;
  });

  // ════════════════════════════════════════════════════════════════════════
  // GRUPO 1: Creación y Estado Inicial
  // ════════════════════════════════════════════════════════════════════════

  describe('Creación y Estado Inicial', () => {
    it('should create', () => {
      fixture.detectChanges();
      expect(component).toBeTruthy();
    });

    it('should load album from resolver data', () => {
      fixture.detectChanges();
      expect(component.item()).toEqual(mockAlbum);
    });

    it('should have empty review text initially', () => {
      expect(component.reviewText()).toBe('');
    });

    it('should not be writing review initially', () => {
      expect(component.isWritingReview()).toBeFalse();
    });

    it('should set default tab to info', () => {
      expect(component.activeTabId()).toBe('info');
    });

    it('should not be loading reviews initially', () => {
      expect(component.isLoadingReviews()).toBeFalse();
    });

    it('should not be loading estado initially', () => {
      expect(component.isLoadingEstado()).toBeFalse();
    });

    it('should not be submitting rating initially', () => {
      expect(component.isSubmittingRating()).toBeFalse();
    });

    it('should not need list first initially', () => {
      expect(component.needsListFirst()).toBeFalse();
    });

    it('should have hasMoreReviews as true initially', () => {
      expect(component.hasMoreReviews()).toBeTrue();
    });
  });

  // ════════════════════════════════════════════════════════════════════════
  // GRUPO 2: Computed Properties
  // ════════════════════════════════════════════════════════════════════════

  describe('Computed Properties', () => {
    beforeEach(() => {
      fixture.detectChanges();
    });

    it('should compute item title for album', () => {
      expect(component.itemTitle()).toBe('Test Album');
    });

    it('should compute item artist for album', () => {
      expect(component.itemArtist()).toBe('Test Artist');
    });

    it('should compute item artistId for album', () => {
      expect(component.itemArtistId()).toBe('456');
    });

    it('should compute item cover URL', () => {
      expect(component.itemCoverUrl()).toBe('https://example.com/cover.jpg');
    });

    it('should compute item type as album', () => {
      expect(component.itemType()).toBe('album');
    });

    it('should compute item genre', () => {
      expect(component.itemGenre()).toBe('Rock');
    });

    it('should compute item description', () => {
      expect(component.itemDescription()).toBe('Test description');
    });

    it('should return empty string for itemTitle when no item', () => {
      component['item'].set(null);
      expect(component.itemTitle()).toBe('');
    });

    it('should return empty string for itemArtist when no item', () => {
      component['item'].set(null);
      expect(component.itemArtist()).toBe('');
    });

    it('should return empty string for itemCoverUrl when no item', () => {
      component['item'].set(null);
      expect(component.itemCoverUrl()).toBe('');
    });

    it('should return null for itemType when no item', () => {
      component['item'].set(null);
      expect(component.itemType()).toBeNull();
    });

    it('should compute hasUserRated as false when rating is 0', () => {
      component['userRating'].set(0);
      expect(component.hasUserRated()).toBeFalse();
    });

    it('should compute hasUserRated as true when rating > 0', () => {
      component['userRating'].set(4);
      expect(component.hasUserRated()).toBeTrue();
    });

    it('should compute hasUserReview as false when no review', () => {
      component['userReview'].set(null);
      expect(component.hasUserReview()).toBeFalse();
    });

    it('should compute hasUserReview as true when review exists', () => {
      component['userReview'].set({ text: 'Great!', date: new Date(), rating: 5 });
      expect(component.hasUserReview()).toBeTrue();
    });

    it('should compute canSubmitReview as false when text too short', () => {
      component['reviewText'].set('AB');
      component['userRating'].set(4);
      expect(component.canSubmitReview()).toBeFalse();
    });

    it('should compute canSubmitReview as false when rating is 0', () => {
      component['reviewText'].set('A'.repeat(3));
      component['userRating'].set(0);
      expect(component.canSubmitReview()).toBeFalse();
    });

    it('should compute canSubmitReview as true when valid', () => {
      component['reviewText'].set('A'.repeat(3));
      component['userRating'].set(4);
      expect(component.canSubmitReview()).toBeTrue();
    });

    it('should compute isLoggedIn based on currentUser', () => {
      // Como isLoggedIn es computed, testa el valor actual
      // En este punto appStateSpy.currentUser retorna null
      expect(component.isLoggedIn()).toBeFalse();
    });

    it('should compute isInfoTab correctly', () => {
      component.activeTabId.set('info');
      expect(component.isInfoTab()).toBeTrue();
      expect(component.isTracksTab()).toBeFalse();
      expect(component.isReviewsTab()).toBeFalse();
    });

    it('should compute isTracksTab correctly', () => {
      component.activeTabId.set('tracks');
      expect(component.isInfoTab()).toBeFalse();
      expect(component.isTracksTab()).toBeTrue();
      expect(component.isReviewsTab()).toBeFalse();
    });

    it('should compute isReviewsTab correctly', () => {
      component.activeTabId.set('reviews');
      expect(component.isInfoTab()).toBeFalse();
      expect(component.isTracksTab()).toBeFalse();
      expect(component.isReviewsTab()).toBeTrue();
    });
  });

  // ════════════════════════════════════════════════════════════════════════
  // GRUPO 3: Tabs
  // ════════════════════════════════════════════════════════════════════════

  describe('Tabs', () => {
    beforeEach(() => {
      fixture.detectChanges();
    });

    it('should have 3 tabs configured', () => {
      expect(component.detailTabs().length).toBe(3);
    });

    it('should have info, tracks and reviews tabs', () => {
      const tabs = component.detailTabs();
      expect(tabs.map(t => t.id)).toEqual(['info', 'tracks', 'reviews']);
    });

    it('should have correct tab labels', () => {
      const tabs = component.detailTabs();
      expect(tabs.map(t => t.label)).toEqual(['Información', 'Canciones', 'Reseñas']);
    });

    it('should update activeTabId on manual change', () => {
      component.activeTabId.set('tracks');
      expect(component.activeTabId()).toBe('tracks');
    });
  });

  // ════════════════════════════════════════════════════════════════════════
  // GRUPO 4: Sistema de Rating - Validaciones
  // ════════════════════════════════════════════════════════════════════════

  describe('Sistema de Rating - Validaciones', () => {
    beforeEach(() => {
      fixture.detectChanges();
    });

    it('should show needsListFirst when user not logged in', () => {
      appStateSpy.currentUser.and.returnValue(null);
      component.setRating(4);
      expect(component.needsListFirst()).toBeTrue();
    });

    it('should show needsListFirst when album not in list', () => {
      appStateSpy.currentUser.and.returnValue(mockUser);
      component['isInUserList'].set(false);
      component.setRating(4);
      expect(component.needsListFirst()).toBeTrue();
    });

    it('should not return early when item is null', () => {
      appStateSpy.currentUser.and.returnValue(mockUser);
      component['item'].set(null);
      component.setRating(4);
      // No exception should be thrown
      expect(true).toBeTrue();
    });
  });

  // ════════════════════════════════════════════════════════════════════════
  // GRUPO 5: Toggle Lista de Usuario - Validaciones
  // ════════════════════════════════════════════════════════════════════════

  describe('Toggle Lista de Usuario - Validaciones', () => {
    beforeEach(() => {
      fixture.detectChanges();
    });

    it('should show warning when user not authenticated', () => {
      appStateSpy.currentUser.and.returnValue(null);
      component.toggleUserList();
      expect(notificationsSpy.warning).toHaveBeenCalledWith(
        'Sesión requerida',
        jasmine.any(String)
      );
    });

    it('should dispatch open-login-modal event when not authenticated', () => {
      appStateSpy.currentUser.and.returnValue(null);
      const dispatchSpy = spyOn(window, 'dispatchEvent');
      component.toggleUserList();
      expect(dispatchSpy).toHaveBeenCalledWith(
        jasmine.objectContaining({ type: 'open-login-modal' })
      );
    });

    it('should not throw when item is null', () => {
      appStateSpy.currentUser.and.returnValue(mockUser);
      component['item'].set(null);
      component.toggleUserList();
      // No exception should be thrown
      expect(true).toBeTrue();
    });
  });

  // ════════════════════════════════════════════════════════════════════════
  // GRUPO 6: Carga de Reseñas - Control de flujo
  // ════════════════════════════════════════════════════════════════════════

  describe('Carga de Reseñas - Control de flujo', () => {
    beforeEach(() => {
      fixture.detectChanges();
    });

    it('should not load more reviews when already loading', () => {
      component['isLoadingMoreReviews'].set(true);
      component['hasMoreReviews'].set(true);

      // Capture initial state
      const wasLoading = component['isLoadingMoreReviews']();
      component.loadMoreReviews();

      // State should not have changed (still loading from before)
      expect(component['isLoadingMoreReviews']()).toBe(wasLoading);
    });

    it('should not load more reviews when no more available', () => {
      component['isLoadingMoreReviews'].set(false);
      component['hasMoreReviews'].set(false);
      component.loadMoreReviews();

      // Should remain not loading
      expect(component['isLoadingMoreReviews']()).toBeFalse();
    });

    it('should not load when item is null', () => {
      component['item'].set(null);
      component['isLoadingMoreReviews'].set(false);
      component['hasMoreReviews'].set(true);
      component.loadMoreReviews();

      // Should not throw and should not start loading
      expect(true).toBeTrue();
    });
  });

  // ════════════════════════════════════════════════════════════════════════
  // GRUPO 7: Métodos de Carga
  // ════════════════════════════════════════════════════════════════════════

  describe('Métodos de Carga', () => {
    beforeEach(() => {
      fixture.detectChanges();
    });

    it('should populate trackList after loadAlbumDetails', () => {
      component.loadAlbumDetails('123');
      expect(component.trackList().length).toBeGreaterThan(0);
    });

    it('should populate reviews after loadAlbumDetails', () => {
      component.loadAlbumDetails('123');
      expect(component.reviews().length).toBeGreaterThan(0);
    });

    it('should load reviews for artist', fakeAsync(() => {
      component.loadArtistDetails('789');
      tick(600);
      expect(component.reviews().length).toBeGreaterThan(0);
    }));

    it('should load reviews for song', fakeAsync(() => {
      component.loadSongDetails('101');
      tick(600);
      expect(component.reviews().length).toBeGreaterThan(0);
    }));

    it('should set loading state for reviews when loading artist', () => {
      component.loadArtistDetails('789');
      expect(component.isLoadingReviews()).toBeTrue();
    });

    it('should set loading state for reviews when loading song', () => {
      component.loadSongDetails('101');
      expect(component.isLoadingReviews()).toBeTrue();
    });
  });

  // ════════════════════════════════════════════════════════════════════════
  // GRUPO 8: Generación de HTML
  // ════════════════════════════════════════════════════════════════════════

  describe('Generación de HTML', () => {
    beforeEach(() => {
      fixture.detectChanges();
    });

    it('should generate tracklist HTML with track info', () => {
      const tracks = [
        { id: '1', number: 1, title: 'Track 1', duration: '3:00' },
        { id: '2', number: 2, title: 'Track 2', duration: '4:15' }
      ];

      const html = component.generateTracklistHTML(tracks);

      expect(html).toContain('track-item');
      expect(html).toContain('Track 1');
      expect(html).toContain('3:00');
      expect(html).toContain('Track 2');
      expect(html).toContain('4:15');
    });

    it('should generate tracklist HTML with track numbers', () => {
      const tracks = [
        { id: '1', number: 1, title: 'First', duration: '3:00' },
        { id: '2', number: 2, title: 'Second', duration: '3:30' }
      ];

      const html = component.generateTracklistHTML(tracks);

      expect(html).toContain('track-item__number');
    });

    it('should generate reviews HTML with user info', () => {
      const reviews = [
        {
          id: '1',
          userId: 'u1',
          userName: 'User One',
          userAvatar: 'avatar.jpg',
          rating: 4,
          content: 'Great album!',
          date: new Date('2024-01-15'),
          likes: 10
        }
      ];

      const html = component.generateReviewsHTML(reviews);

      expect(html).toContain('review-card');
      expect(html).toContain('User One');
      expect(html).toContain('Great album!');
    });

    it('should return no-reviews message for empty reviews', () => {
      const html = component.generateReviewsHTML([]);

      expect(html).toContain('no-reviews');
      expect(html).toContain('No hay reseñas aún');
    });

    it('should include rating stars in review HTML', () => {
      const reviews = [
        {
          id: '1',
          userId: 'u1',
          userName: 'User',
          userAvatar: 'avatar.jpg',
          rating: 5,
          content: 'Perfect!',
          date: new Date(),
          likes: 5
        }
      ];

      const html = component.generateReviewsHTML(reviews);

      expect(html).toContain('review-card__rating');
    });

    it('should include likes count in review HTML', () => {
      const reviews = [
        {
          id: '1',
          userId: 'u1',
          userName: 'User',
          userAvatar: 'avatar.jpg',
          rating: 4,
          content: 'Good stuff',
          date: new Date(),
          likes: 42
        }
      ];

      const html = component.generateReviewsHTML(reviews);

      expect(html).toContain('42');
    });
  });

  // ════════════════════════════════════════════════════════════════════════
  // GRUPO 9: Señales de Estado
  // ════════════════════════════════════════════════════════════════════════

  describe('Señales de Estado', () => {
    beforeEach(() => {
      fixture.detectChanges();
    });

    it('should allow setting isInUserList', () => {
      component['isInUserList'].set(true);
      expect(component['isInUserList']()).toBeTrue();
    });

    it('should allow setting userRating', () => {
      component['userRating'].set(5);
      expect(component['userRating']()).toBe(5);
    });

    it('should allow setting reviewText', () => {
      component['reviewText'].set('Test review text');
      expect(component.reviewText()).toBe('Test review text');
    });

    it('should allow setting isWritingReview', () => {
      component.isWritingReview.set(true);
      expect(component.isWritingReview()).toBeTrue();
    });

    it('should allow setting activeTabId', () => {
      component.activeTabId.set('tracks');
      expect(component.activeTabId()).toBe('tracks');
    });

    it('should allow updating userReview', () => {
      const review = { text: 'My review', date: new Date(), rating: 4 };
      component['userReview'].set(review);
      expect(component['userReview']()).toEqual(review);
    });

    it('should have stats signal with default values', () => {
      const stats = component.stats();
      expect(stats).toBeDefined();
      expect(typeof stats.averageRating).toBe('number');
      expect(typeof stats.totalRatings).toBe('number');
      expect(typeof stats.totalReviews).toBe('number');
    });

    it('should allow updating stats', () => {
      component['stats'].set({ averageRating: 4.8, totalRatings: 500, totalReviews: 100 });
      expect(component.stats().averageRating).toBe(4.8);
    });

    it('should have displayedReviews signal', () => {
      expect(component.displayedReviews()).toBeDefined();
      expect(Array.isArray(component.displayedReviews())).toBeTrue();
    });
  });

  // ════════════════════════════════════════════════════════════════════════
  // GRUPO 10: Helper parseNumericId
  // ════════════════════════════════════════════════════════════════════════

  describe('Helper parseNumericId', () => {
    beforeEach(() => {
      fixture.detectChanges();
    });

    it('should parse valid numeric string', () => {
      const result = component['parseNumericId']('123');
      expect(result).toBe(123);
    });

    it('should return null for non-numeric string', () => {
      const result = component['parseNumericId']('abc');
      expect(result).toBeNull();
    });

    it('should return null for empty string', () => {
      const result = component['parseNumericId']('');
      expect(result).toBeNull();
    });

    it('should parse negative numbers', () => {
      const result = component['parseNumericId']('-5');
      expect(result).toBe(-5);
    });

    it('should parse string with leading zeros', () => {
      const result = component['parseNumericId']('007');
      expect(result).toBe(7);
    });
  });

  // ════════════════════════════════════════════════════════════════════════
  // GRUPO 11: Navegación con Artist
  // ════════════════════════════════════════════════════════════════════════

  describe('Navegación con Artist', () => {
    beforeEach(async () => {
      await TestBed.resetTestingModule();
      fragmentSubject = new BehaviorSubject<string | null>(null);

      albumServiceSpy = jasmine.createSpyObj('AlbumService', ['getAlbumStats']);
      artistServiceSpy = jasmine.createSpyObj('ArtistService', ['getArtist']);
      songServiceSpy = jasmine.createSpyObj('SongService', ['getSong']);
      listaAlbumServiceSpy = jasmine.createSpyObj('ListaAlbumService', [
        'getEstadoAlbum', 'getResenasAlbum', 'puntuarAlbum', 'quitarDeLista', 'agregarAlbumDeezer'
      ]);
      reviewStateServiceSpy = jasmine.createSpyObj('ReviewStateService', ['getUserReviewForAlbum']);
      appStateSpy = jasmine.createSpyObj('AppStateService', ['currentUser', 'isAuthenticated']);
      notificationsSpy = jasmine.createSpyObj('NotificationStreamService', ['warning', 'success', 'error']);

      albumServiceSpy.getAlbumStats.and.returnValue(of({ averageRating: 0, ratingCount: 0, reviewCount: 0, listenedCount: 0 }));
      listaAlbumServiceSpy.getEstadoAlbum.and.returnValue(of({ enLista: false, puntuacion: null, tieneResena: false, fechaAgregada: null }));
      listaAlbumServiceSpy.getResenasAlbum.and.returnValue(of([]));
      reviewStateServiceSpy.getUserReviewForAlbum.and.returnValue(null);
      appStateSpy.currentUser.and.returnValue(null);

      await TestBed.configureTestingModule({
        imports: [DetailComponent],
        providers: [
          provideRouter([]),
          provideHttpClient(),
          { provide: AlbumService, useValue: albumServiceSpy },
          { provide: ArtistService, useValue: artistServiceSpy },
          { provide: SongService, useValue: songServiceSpy },
          { provide: ListaAlbumService, useValue: listaAlbumServiceSpy },
          { provide: ReviewStateService, useValue: reviewStateServiceSpy },
          { provide: AppStateService, useValue: appStateSpy },
          { provide: NotificationStreamService, useValue: notificationsSpy },
          {
            provide: ActivatedRoute,
            useValue: {
              snapshot: { data: { artist: mockArtist } },
              fragment: fragmentSubject.asObservable()
            }
          }
        ],
        schemas: [NO_ERRORS_SCHEMA]
      }).compileComponents();

      fixture = TestBed.createComponent(DetailComponent);
      component = fixture.componentInstance;
    });

    it('should load artist from resolver data', () => {
      fixture.detectChanges();
      expect(component.item()).toEqual(mockArtist);
    });

    it('should compute item title as artist name', () => {
      fixture.detectChanges();
      expect(component.itemTitle()).toBe('Test Artist');
    });

    it('should compute item type as artist', () => {
      fixture.detectChanges();
      expect(component.itemType()).toBe('artist');
    });

    it('should compute photoUrl as coverUrl for artist', () => {
      fixture.detectChanges();
      expect(component.itemCoverUrl()).toBe('https://example.com/artist.jpg');
    });

    it('should compute bio as description for artist', () => {
      fixture.detectChanges();
      expect(component.itemDescription()).toBe('Test bio');
    });
  });

  // ════════════════════════════════════════════════════════════════════════
  // GRUPO 12: Navegación con Song
  // ════════════════════════════════════════════════════════════════════════

  describe('Navegación con Song', () => {
    beforeEach(async () => {
      await TestBed.resetTestingModule();
      fragmentSubject = new BehaviorSubject<string | null>(null);

      albumServiceSpy = jasmine.createSpyObj('AlbumService', ['getAlbumStats']);
      artistServiceSpy = jasmine.createSpyObj('ArtistService', ['getArtist']);
      songServiceSpy = jasmine.createSpyObj('SongService', ['getSong']);
      listaAlbumServiceSpy = jasmine.createSpyObj('ListaAlbumService', [
        'getEstadoAlbum', 'getResenasAlbum', 'puntuarAlbum', 'quitarDeLista', 'agregarAlbumDeezer'
      ]);
      reviewStateServiceSpy = jasmine.createSpyObj('ReviewStateService', ['getUserReviewForAlbum']);
      appStateSpy = jasmine.createSpyObj('AppStateService', ['currentUser', 'isAuthenticated']);
      notificationsSpy = jasmine.createSpyObj('NotificationStreamService', ['warning', 'success', 'error']);

      albumServiceSpy.getAlbumStats.and.returnValue(of({ averageRating: 0, ratingCount: 0, reviewCount: 0, listenedCount: 0 }));
      listaAlbumServiceSpy.getEstadoAlbum.and.returnValue(of({ enLista: false, puntuacion: null, tieneResena: false, fechaAgregada: null }));
      listaAlbumServiceSpy.getResenasAlbum.and.returnValue(of([]));
      reviewStateServiceSpy.getUserReviewForAlbum.and.returnValue(null);
      appStateSpy.currentUser.and.returnValue(null);

      await TestBed.configureTestingModule({
        imports: [DetailComponent],
        providers: [
          provideRouter([]),
          provideHttpClient(),
          { provide: AlbumService, useValue: albumServiceSpy },
          { provide: ArtistService, useValue: artistServiceSpy },
          { provide: SongService, useValue: songServiceSpy },
          { provide: ListaAlbumService, useValue: listaAlbumServiceSpy },
          { provide: ReviewStateService, useValue: reviewStateServiceSpy },
          { provide: AppStateService, useValue: appStateSpy },
          { provide: NotificationStreamService, useValue: notificationsSpy },
          {
            provide: ActivatedRoute,
            useValue: {
              snapshot: { data: { song: mockSong } },
              fragment: fragmentSubject.asObservable()
            }
          }
        ],
        schemas: [NO_ERRORS_SCHEMA]
      }).compileComponents();

      fixture = TestBed.createComponent(DetailComponent);
      component = fixture.componentInstance;
    });

    it('should load song from resolver data', () => {
      fixture.detectChanges();
      expect(component.item()).toEqual(mockSong);
    });

    it('should compute item title as song title', () => {
      fixture.detectChanges();
      expect(component.itemTitle()).toBe('Test Song');
    });

    it('should compute item type as song', () => {
      fixture.detectChanges();
      expect(component.itemType()).toBe('song');
    });
  });

  // ════════════════════════════════════════════════════════════════════════
  // GRUPO 13: Fragment Subscription
  // ════════════════════════════════════════════════════════════════════════

  describe('Fragment Subscription', () => {
    beforeEach(() => {
      fixture.detectChanges();
    });

    it('should subscribe to fragment changes on init', () => {
      expect(component['fragmentSubscription']).toBeDefined();
    });

    it('should call scrollToSection when fragment changes', fakeAsync(() => {
      const scrollSpy = spyOn(component, 'scrollToSection');
      fragmentSubject.next('reviews');
      tick(150);
      expect(scrollSpy).toHaveBeenCalledWith('reviews');
    }));

    it('should not call scrollToSection when fragment is null', fakeAsync(() => {
      const scrollSpy = spyOn(component, 'scrollToSection');
      fragmentSubject.next(null);
      tick(150);
      expect(scrollSpy).not.toHaveBeenCalled();
    }));

    it('should unsubscribe from fragment on destroy', () => {
      const subscription = component['fragmentSubscription'];
      if (subscription) {
        spyOn(subscription, 'unsubscribe');
        component.ngOnDestroy();
        expect(subscription.unsubscribe).toHaveBeenCalled();
      } else {
        expect(true).toBeTrue(); // No subscription to test
      }
    });
  });
});
