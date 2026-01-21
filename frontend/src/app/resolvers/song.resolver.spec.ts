import { TestBed, fakeAsync, tick } from '@angular/core/testing';
import { Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable, of, throwError } from 'rxjs';
import { songResolver } from './song.resolver';
import { SongService } from '../services/song.service';
import { LoadingService } from '../services/loading';
import { NotificationStreamService } from '../services/notification-stream';
import { BreadcrumbService } from '../services/breadcrumb.service';
import { Song } from '../models/data.models';

describe('songResolver', () => {
  let songServiceSpy: jasmine.SpyObj<SongService>;
  let loadingServiceSpy: jasmine.SpyObj<LoadingService>;
  let notificationStreamSpy: jasmine.SpyObj<NotificationStreamService>;
  let breadcrumbServiceSpy: jasmine.SpyObj<BreadcrumbService>;
  let routerSpy: jasmine.SpyObj<Router>;

  const mockSong: Song = {
    id: '789',
    title: 'Test Song',
    artist: 'Test Artist',
    artistId: '456',
    album: 'Test Album',
    albumId: '123',
    duration: '3:30',
    releaseYear: 2023,
    genre: 'Rock',
    coverUrl: 'https://example.com/cover.jpg',
    description: 'Test description',
    averageRating: 4.5,
    totalReviews: 50,
    previewUrl: 'https://example.com/preview.mp3'
  };

  beforeEach(() => {
    songServiceSpy = jasmine.createSpyObj('SongService', ['getSongById']);
    loadingServiceSpy = jasmine.createSpyObj('LoadingService', ['start', 'stop']);
    notificationStreamSpy = jasmine.createSpyObj('NotificationStreamService', ['error']);
    breadcrumbServiceSpy = jasmine.createSpyObj('BreadcrumbService', ['updateCurrentBreadcrumb']);
    routerSpy = jasmine.createSpyObj('Router', ['navigate']);

    TestBed.configureTestingModule({
      providers: [
        { provide: SongService, useValue: songServiceSpy },
        { provide: LoadingService, useValue: loadingServiceSpy },
        { provide: NotificationStreamService, useValue: notificationStreamSpy },
        { provide: BreadcrumbService, useValue: breadcrumbServiceSpy },
        { provide: Router, useValue: routerSpy }
      ]
    });
  });

  function createMockRoute(id: string | null): ActivatedRouteSnapshot {
    return {
      paramMap: {
        get: (key: string) => id
      }
    } as unknown as ActivatedRouteSnapshot;
  }

  const mockState = {} as RouterStateSnapshot;

  it('should return song when found', fakeAsync(() => {
    songServiceSpy.getSongById.and.returnValue(of(mockSong));
    const route = createMockRoute('789');

    let result: Song | null | undefined;
    TestBed.runInInjectionContext(() => {
      const resolver$ = songResolver(route, mockState) as Observable<Song | null>;
      resolver$.subscribe((song: Song | null) => result = song);
    });
    tick();

    expect(result).toEqual(mockSong);
    expect(loadingServiceSpy.start).toHaveBeenCalledWith('Cargando canción...');
    expect(breadcrumbServiceSpy.updateCurrentBreadcrumb).toHaveBeenCalledWith('Test Song');
    expect(loadingServiceSpy.stop).toHaveBeenCalled();
  }));

  it('should navigate to 404 when id is null', fakeAsync(() => {
    const route = createMockRoute(null);

    let result: Song | null = null;
    TestBed.runInInjectionContext(() => {
      const resolver$ = songResolver(route, mockState) as Observable<Song | null>;
      resolver$.subscribe((song: Song | null) => result = song);
    });
    tick();

    expect(result).toBeNull();
    expect(notificationStreamSpy.error).toHaveBeenCalledWith('ID inválido', 'El ID de la canción no es válido');
    expect(routerSpy.navigate).toHaveBeenCalledWith(['/404']);
  }));

  it('should handle error and navigate to 404', fakeAsync(() => {
    songServiceSpy.getSongById.and.returnValue(throwError(() => new Error('Not found')));
    const route = createMockRoute('999');

    let result: Song | null = null;
    TestBed.runInInjectionContext(() => {
      const resolver$ = songResolver(route, mockState) as Observable<Song | null>;
      resolver$.subscribe((song: Song | null) => result = song);
    });
    tick(600);

    expect(result).toBeNull();
    expect(notificationStreamSpy.error).toHaveBeenCalledWith('Error', 'No se pudo cargar la canción. Redirigiendo...');
    expect(routerSpy.navigate).toHaveBeenCalledWith(['/404']);
    expect(loadingServiceSpy.stop).toHaveBeenCalled();
  }));

  it('should start loading at the beginning', fakeAsync(() => {
    songServiceSpy.getSongById.and.returnValue(of(mockSong));
    const route = createMockRoute('789');

    TestBed.runInInjectionContext(() => {
      const resolver$ = songResolver(route, mockState) as Observable<Song | null>;
      resolver$.subscribe();
    });
    tick();

    expect(loadingServiceSpy.start).toHaveBeenCalledWith('Cargando canción...');
  }));

  it('should stop loading in finalize', fakeAsync(() => {
    songServiceSpy.getSongById.and.returnValue(of(mockSong));
    const route = createMockRoute('789');

    TestBed.runInInjectionContext(() => {
      const resolver$ = songResolver(route, mockState) as Observable<Song | null>;
      resolver$.subscribe();
    });
    tick();

    expect(loadingServiceSpy.stop).toHaveBeenCalled();
  }));
});
