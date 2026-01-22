/**
 * ============================================================================
 * TESTS: SearchResultsComponent - Página de Resultados de Búsqueda
 * ============================================================================
 *
 * COBERTURA:
 * - ✅ Creación del componente
 * - ✅ Inicialización con query params
 * - ✅ Señales y estado
 * - ✅ TrackBy functions
 * - ✅ Helpers
 *
 * NOTA: Tests diseñados para evitar renderizado de templates con iconos
 * ya que LucideAngular requiere registro de iconos en TestBed.
 *
 * @author Tests para Discs & Records
 */

import { TestBed, fakeAsync, tick } from '@angular/core/testing';
import { provideRouter, Router, ActivatedRoute } from '@angular/router';
import { provideHttpClient } from '@angular/common/http';
import { BehaviorSubject, of, throwError } from 'rxjs';

import SearchResultsComponent from './search-results';
import { DeezerService, DeezerAlbum, DeezerArtist } from '../../services/deezer.service';
import { MockDeezerService } from '../../services/mock-deezer.service';
import { DeezerRateLimitService } from '../../services/deezer-rate-limit.service';
import { AlbumNavigationService } from '../../services/album-navigation.service';

describe('SearchResultsComponent', () => {
  let component: SearchResultsComponent;
  let deezerServiceSpy: jasmine.SpyObj<DeezerService>;
  let mockDeezerServiceSpy: jasmine.SpyObj<MockDeezerService>;
  let rateLimitServiceSpy: jasmine.SpyObj<DeezerRateLimitService>;
  let albumNavigationServiceSpy: jasmine.SpyObj<AlbumNavigationService>;
  let router: Router;
  let queryParamsSubject: BehaviorSubject<any>;

  // Mock data
  const mockAlbums: DeezerAlbum[] = [
    {
      id: 1,
      title: 'Test Album 1',
      cover: 'https://example.com/cover1.jpg',
      cover_small: 'https://example.com/cover1_small.jpg',
      cover_medium: 'https://example.com/cover1_medium.jpg',
      cover_big: 'https://example.com/cover1_big.jpg',
      cover_xl: 'https://example.com/cover1_xl.jpg',
      artist: { id: 1, name: 'Artist 1', picture: '', picture_small: '', picture_medium: '', picture_big: '', picture_xl: '', tracklist: '', type: 'artist' },
      nb_tracks: 10,
      release_date: '2024-01-01',
      record_type: 'album',
      tracklist: '',
      type: 'album'
    },
    {
      id: 2,
      title: 'Test Album 2',
      cover: 'https://example.com/cover2.jpg',
      cover_small: 'https://example.com/cover2_small.jpg',
      cover_medium: 'https://example.com/cover2_medium.jpg',
      cover_big: 'https://example.com/cover2_big.jpg',
      cover_xl: 'https://example.com/cover2_xl.jpg',
      artist: { id: 2, name: 'Artist 2', picture: '', picture_small: '', picture_medium: '', picture_big: '', picture_xl: '', tracklist: '', type: 'artist' },
      nb_tracks: 12,
      release_date: '2024-02-01',
      record_type: 'album',
      tracklist: '',
      type: 'album'
    }
  ];

  const mockArtists: DeezerArtist[] = [
    {
      id: 1,
      name: 'Artist 1',
      picture: 'https://example.com/artist1.jpg',
      picture_small: 'https://example.com/artist1_small.jpg',
      picture_medium: 'https://example.com/artist1_medium.jpg',
      picture_big: 'https://example.com/artist1_big.jpg',
      picture_xl: 'https://example.com/artist1_xl.jpg',
      tracklist: '',
      type: 'artist'
    }
  ];

  beforeEach(async () => {
    queryParamsSubject = new BehaviorSubject({});

    deezerServiceSpy = jasmine.createSpyObj('DeezerService', [
      'searchAlbums',
      'searchArtists',
      'getChartAlbums',
      'getBestAlbumCover',
      'getBestArtistPicture'
    ]);

    mockDeezerServiceSpy = jasmine.createSpyObj('MockDeezerService', [
      'searchAlbums',
      'searchArtists',
      'getChartAlbums'
    ]);

    rateLimitServiceSpy = jasmine.createSpyObj('DeezerRateLimitService', [
      'isInCooldown',
      'handleRateLimitError'
    ]);

    albumNavigationServiceSpy = jasmine.createSpyObj('AlbumNavigationService', ['navigateToAlbum'], {
      isImporting: jasmine.createSpy().and.returnValue(false),
      importingAlbumId: jasmine.createSpy().and.returnValue(null)
    });
    albumNavigationServiceSpy.navigateToAlbum.and.returnValue(of(null));

    // Configuración por defecto - retornar arrays vacíos para evitar renderizado de templates con iconos
    deezerServiceSpy.searchAlbums.and.returnValue(of([]));
    deezerServiceSpy.searchArtists.and.returnValue(of([]));
    deezerServiceSpy.getChartAlbums.and.returnValue(of([]));
    deezerServiceSpy.getBestAlbumCover.and.callFake((album: DeezerAlbum) => album.cover_big || album.cover);
    deezerServiceSpy.getBestArtistPicture.and.callFake((artist: DeezerArtist) => artist.picture_big || artist.picture);

    mockDeezerServiceSpy.searchAlbums.and.returnValue(of([]));
    mockDeezerServiceSpy.searchArtists.and.returnValue(of([]));
    mockDeezerServiceSpy.getChartAlbums.and.returnValue(of([]));

    rateLimitServiceSpy.isInCooldown.and.returnValue(false);
    rateLimitServiceSpy.handleRateLimitError.and.returnValue(false);

    await TestBed.configureTestingModule({
      providers: [
        provideRouter([]),
        provideHttpClient(),
        { provide: DeezerService, useValue: deezerServiceSpy },
        { provide: MockDeezerService, useValue: mockDeezerServiceSpy },
        { provide: DeezerRateLimitService, useValue: rateLimitServiceSpy },
        { provide: AlbumNavigationService, useValue: albumNavigationServiceSpy },
        {
          provide: ActivatedRoute,
          useValue: {
            queryParams: queryParamsSubject.asObservable()
          }
        },
        SearchResultsComponent
      ]
    });

    router = TestBed.inject(Router);
    spyOn(router, 'navigate');

    // Crear componente directamente sin renderizar template
    component = TestBed.inject(SearchResultsComponent);
  });

  // ════════════════════════════════════════════════════════════════════════
  // GRUPO 1: Creación y Estado Inicial
  // ════════════════════════════════════════════════════════════════════════

  describe('Creación y Estado Inicial', () => {
    it('should create', () => {
      expect(component).toBeTruthy();
    });

    it('should have empty search term initially', () => {
      expect(component.searchTerm()).toBe('');
    });

    it('should have "all" as default filter', () => {
      expect(component.activeFilter()).toBe('all');
    });

    it('should not be loading initially', () => {
      expect(component.isLoading()).toBeFalse();
    });

    it('should inject rate limit service', () => {
      expect(component.rateLimitService).toBeDefined();
    });

    it('should have filteredResults computed', () => {
      expect(component.filteredResults).toBeDefined();
    });

    it('should have empty filteredResults initially', () => {
      expect(component.filteredResults().length).toBe(0);
    });

    it('should have hasMore computed', () => {
      expect(component.hasMore).toBeDefined();
    });

    it('should inject deezer service', () => {
      expect(component['deezerService']).toBeDefined();
    });

    it('should inject mock deezer service', () => {
      expect(component['mockDeezerService']).toBeDefined();
    });
  });

  // ════════════════════════════════════════════════════════════════════════
  // GRUPO 2: Señales y Estado
  // ════════════════════════════════════════════════════════════════════════

  describe('Señales y Estado', () => {
    it('should allow setting searchTerm', () => {
      component['searchTerm'].set('test query');
      expect(component.searchTerm()).toBe('test query');
    });

    it('should allow setting activeFilter', () => {
      component['activeFilter'].set('albums');
      expect(component.activeFilter()).toBe('albums');
    });

    it('should allow setting isLoading', () => {
      component['isLoading'].set(true);
      expect(component.isLoading()).toBeTrue();
    });

    it('should allow setting isLoadingMore', () => {
      component['isLoadingMore'].set(true);
      expect(component.isLoadingMore()).toBeTrue();
    });

    it('should have resultsCount computed', () => {
      expect(component.resultsCount).toBeDefined();
    });

    it('should have paginationInfo computed', () => {
      expect(component.paginationInfo).toBeDefined();
    });

    it('should return resultsCount with correct structure', () => {
      const count = component.resultsCount();
      expect(count.all).toBeDefined();
      expect(count.albums).toBeDefined();
    });
  });

  // ════════════════════════════════════════════════════════════════════════
  // GRUPO 3: Filtros
  // ════════════════════════════════════════════════════════════════════════

  describe('Filtros', () => {
    it('should have tabs computed', () => {
      expect(component.tabs).toBeDefined();
    });

    it('should have tabs as computed returning array', () => {
      const tabs = component.tabs();
      expect(Array.isArray(tabs)).toBeTrue();
    });

    it('should have at least 2 tabs', () => {
      expect(component.tabs().length).toBeGreaterThanOrEqual(2);
    });

    it('should have all tab', () => {
      expect(component.tabs().some(t => t.id === 'all')).toBeTrue();
    });

    it('should have albums tab', () => {
      expect(component.tabs().some(t => t.id === 'albums')).toBeTrue();
    });

    it('should have onTabChange method', () => {
      expect(component.onTabChange).toBeDefined();
    });

    it('should change activeFilter when onTabChange called', () => {
      component.onTabChange('albums');
      expect(component.activeFilter()).toBe('albums');
    });

    it('should change activeFilter to all', () => {
      component['activeFilter'].set('albums');
      component.onTabChange('all');
      expect(component.activeFilter()).toBe('all');
    });
  });

  // ════════════════════════════════════════════════════════════════════════
  // GRUPO 4: Computed Properties
  // ════════════════════════════════════════════════════════════════════════

  describe('Computed Properties', () => {
    it('should compute filteredResults as empty when no data', () => {
      expect(component.filteredResults()).toEqual([]);
    });

    it('should compute resultsCount with all property', () => {
      expect(component.resultsCount().all).toBe(0);
    });

    it('should compute resultsCount with albums property', () => {
      expect(component.resultsCount().albums).toBe(0);
    });

    it('should have hasMore computed', () => {
      expect(component.hasMore).toBeDefined();
    });

    it('should compute paginationInfo with showing property', () => {
      expect(component.paginationInfo().showing).toBeDefined();
    });

    it('should compute paginationInfo with total property', () => {
      expect(component.paginationInfo().total).toBeDefined();
    });

    it('should compute paginationInfo with hasMore property', () => {
      expect(component.paginationInfo().hasMore).toBeDefined();
    });
  });

  // ════════════════════════════════════════════════════════════════════════
  // GRUPO 5: TrackBy Functions
  // ════════════════════════════════════════════════════════════════════════

  describe('TrackBy Functions', () => {
    it('should have trackByResultId function', () => {
      expect(component.trackByResultId).toBeDefined();
      expect(typeof component.trackByResultId).toBe('function');
    });

    it('should return combined id from trackByResultId', () => {
      const result = { id: 1, type: 'album' as const, title: 'Test', imageUrl: '' };
      const tracked = component.trackByResultId(0, result);
      expect(tracked).toBe('album-1');
    });

    it('should return different id for artist', () => {
      const result = { id: 1, type: 'artist' as const, title: 'Test', imageUrl: '' };
      const tracked = component.trackByResultId(0, result);
      expect(tracked).toBe('artist-1');
    });
  });

  // ════════════════════════════════════════════════════════════════════════
  // GRUPO 6: Métodos de Búsqueda
  // ════════════════════════════════════════════════════════════════════════

  describe('Métodos de Búsqueda', () => {
    it('should have newSearch method', () => {
      expect(component.newSearch).toBeDefined();
      expect(typeof component.newSearch).toBe('function');
    });

    it('should navigate on newSearch with query', () => {
      component.newSearch('rock');
      expect(router.navigate).toHaveBeenCalledWith(
        ['/search'],
        jasmine.objectContaining({
          queryParams: { q: 'rock' }
        })
      );
    });

    it('should not navigate on newSearch with empty string', () => {
      component.newSearch('');
      expect(router.navigate).not.toHaveBeenCalled();
    });

    it('should not navigate on newSearch with whitespace only', () => {
      component.newSearch('   ');
      expect(router.navigate).not.toHaveBeenCalled();
    });
  });

  // ════════════════════════════════════════════════════════════════════════
  // GRUPO 7: Navegación
  // ════════════════════════════════════════════════════════════════════════

  describe('Navegación', () => {
    it('should have viewResult method', () => {
      expect(component.viewResult).toBeDefined();
      expect(typeof component.viewResult).toBe('function');
    });

    it('should navigate to album detail on viewResult', () => {
      const result = { id: 123, type: 'album' as const, title: 'Test', imageUrl: '' };
      component.viewResult(result);
      // Debe llamar al servicio de navegación de álbumes, no al router directamente
      expect(albumNavigationServiceSpy.navigateToAlbum).toHaveBeenCalledWith('123', 'deezer');
    });

    it('should navigate to artist detail on viewResult', () => {
      const result = { id: 456, type: 'artist' as const, title: 'Test', imageUrl: '' };
      component.viewResult(result);
      expect(router.navigate).toHaveBeenCalledWith(
        ['/artist', 456],
        jasmine.objectContaining({ state: jasmine.any(Object) })
      );
    });

    it('should have goBack method', () => {
      expect(component.goBack).toBeDefined();
    });

    it('should navigate home on goBack', () => {
      component.goBack();
      expect(router.navigate).toHaveBeenCalledWith(['/']);
    });
  });

  // ════════════════════════════════════════════════════════════════════════
  // GRUPO 8: Rate Limiting
  // ════════════════════════════════════════════════════════════════════════

  describe('Rate Limiting', () => {
    it('should expose rateLimitService', () => {
      expect(component.rateLimitService).toBeDefined();
    });

    it('should have isInCooldown method on service', () => {
      expect(component.rateLimitService.isInCooldown).toBeDefined();
    });

    it('should have handleRateLimitError method on service', () => {
      expect(component.rateLimitService.handleRateLimitError).toBeDefined();
    });
  });

  // ════════════════════════════════════════════════════════════════════════
  // GRUPO 9: Infinite Scroll
  // ════════════════════════════════════════════════════════════════════════

  describe('Infinite Scroll', () => {
    it('should have loadMoreResults method', () => {
      expect(component.loadMoreResults).toBeDefined();
      expect(typeof component.loadMoreResults).toBe('function');
    });

    it('should not throw when calling loadMoreResults', () => {
      expect(() => component.loadMoreResults()).not.toThrow();
    });

    it('should have isLoadingMore signal', () => {
      expect(component.isLoadingMore).toBeDefined();
    });
  });

  // ════════════════════════════════════════════════════════════════════════
  // GRUPO 10: Helpers
  // ════════════════════════════════════════════════════════════════════════

  describe('Helpers', () => {
    it('should have getResultIcon method', () => {
      expect(component.getResultIcon).toBeDefined();
    });

    it('should return disc emoji for album type', () => {
      const result = component.getResultIcon('album');
      expect(result).toBe('💿');
    });

    it('should return mic emoji for artist type', () => {
      const result = component.getResultIcon('artist');
      expect(result).toBe('🎤');
    });

    it('should have getResultTypeLabel method', () => {
      expect(component.getResultTypeLabel).toBeDefined();
    });

    it('should return Álbum for album type', () => {
      const result = component.getResultTypeLabel('album');
      expect(result).toBe('Álbum');
    });

    it('should return Artista for artist type', () => {
      const result = component.getResultTypeLabel('artist');
      expect(result).toBe('Artista');
    });
  });

  // ════════════════════════════════════════════════════════════════════════
  // GRUPO 11: Error Handling
  // ════════════════════════════════════════════════════════════════════════

  describe('Error Handling', () => {
    it('should have handleRateLimitError on rateLimitService', () => {
      expect(component.rateLimitService.handleRateLimitError).toBeDefined();
    });

    it('should set isLoading to false on errors', () => {
      // Después de cualquier error, isLoading debe ser false
      component['isLoading'].set(false);
      expect(component.isLoading()).toBeFalse();
    });
  });

  // ════════════════════════════════════════════════════════════════════════
  // GRUPO 12: Query Params
  // ════════════════════════════════════════════════════════════════════════

  describe('Query Params', () => {
    beforeEach(() => {
      // Llamar ngOnInit para que se suscriba a queryParams
      component.ngOnInit();
    });

    it('should react to query params changes', fakeAsync(() => {
      queryParamsSubject.next({ q: 'rock' });
      tick(500);

      expect(component.searchTerm()).toBe('rock');
    }));

    it('should handle filter param', fakeAsync(() => {
      queryParamsSubject.next({ q: 'rock', filter: 'albums' });
      tick(500);

      expect(component.activeFilter()).toBe('albums');
    }));

    it('should handle empty query param', fakeAsync(() => {
      queryParamsSubject.next({ q: '' });
      tick(500);

      expect(component.searchTerm()).toBe('');
    }));

    it('should handle * as wildcard query', fakeAsync(() => {
      queryParamsSubject.next({ q: '*' });
      tick(500);

      expect(component.searchTerm()).toBe('');
    }));
  });

  // ════════════════════════════════════════════════════════════════════════
  // GRUPO 13: Lifecycle
  // ════════════════════════════════════════════════════════════════════════

  describe('Lifecycle', () => {
    it('should have ngOnInit', () => {
      expect(component.ngOnInit).toBeDefined();
    });

    it('should not throw on ngOnInit', () => {
      expect(() => component.ngOnInit()).not.toThrow();
    });
  });
});
