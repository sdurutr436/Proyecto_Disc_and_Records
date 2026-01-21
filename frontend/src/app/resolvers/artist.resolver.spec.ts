import { TestBed, fakeAsync, tick } from '@angular/core/testing';
import { Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable, of, throwError } from 'rxjs';
import { artistResolver } from './artist.resolver';
import { ArtistService } from '../services/artist.service';
import { LoadingService } from '../services/loading';
import { NotificationStreamService } from '../services/notification-stream';
import { BreadcrumbService } from '../services/breadcrumb.service';
import { Artist } from '../models/data.models';

describe('artistResolver', () => {
  let artistServiceSpy: jasmine.SpyObj<ArtistService>;
  let loadingServiceSpy: jasmine.SpyObj<LoadingService>;
  let notificationStreamSpy: jasmine.SpyObj<NotificationStreamService>;
  let breadcrumbServiceSpy: jasmine.SpyObj<BreadcrumbService>;
  let routerSpy: jasmine.SpyObj<Router>;

  const mockArtist: Artist = {
    id: '456',
    name: 'Test Artist',
    bio: 'Test bio',
    photoUrl: 'https://example.com/photo.jpg',
    genre: 'Rock',
    activeYears: '2000-present',
    albums: 5,
    monthlyListeners: 1000000
  };

  beforeEach(() => {
    artistServiceSpy = jasmine.createSpyObj('ArtistService', ['getArtistById']);
    loadingServiceSpy = jasmine.createSpyObj('LoadingService', ['start', 'stop']);
    notificationStreamSpy = jasmine.createSpyObj('NotificationStreamService', ['error']);
    breadcrumbServiceSpy = jasmine.createSpyObj('BreadcrumbService', ['updateCurrentBreadcrumb']);
    routerSpy = jasmine.createSpyObj('Router', ['navigate']);

    TestBed.configureTestingModule({
      providers: [
        { provide: ArtistService, useValue: artistServiceSpy },
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

  it('should return artist when found', fakeAsync(() => {
    artistServiceSpy.getArtistById.and.returnValue(of(mockArtist));
    const route = createMockRoute('456');

    let result: Artist | null | undefined;
    TestBed.runInInjectionContext(() => {
      const resolver$ = artistResolver(route, mockState) as Observable<Artist | null>;
      resolver$.subscribe((artist: Artist | null) => result = artist);
    });
    tick();

    expect(result).toEqual(mockArtist);
    expect(loadingServiceSpy.start).toHaveBeenCalledWith('Cargando artista...');
    expect(breadcrumbServiceSpy.updateCurrentBreadcrumb).toHaveBeenCalledWith('Test Artist');
    expect(loadingServiceSpy.stop).toHaveBeenCalled();
  }));

  it('should navigate to 404 when id is null', fakeAsync(() => {
    const route = createMockRoute(null);

    let result: Artist | null = null;
    TestBed.runInInjectionContext(() => {
      const resolver$ = artistResolver(route, mockState) as Observable<Artist | null>;
      resolver$.subscribe((artist: Artist | null) => result = artist);
    });
    tick();

    expect(result).toBeNull();
    expect(notificationStreamSpy.error).toHaveBeenCalledWith('ID inválido', 'El ID del artista no es válido');
    expect(routerSpy.navigate).toHaveBeenCalledWith(['/404']);
  }));

  it('should handle error and navigate to 404', fakeAsync(() => {
    artistServiceSpy.getArtistById.and.returnValue(throwError(() => new Error('Not found')));
    const route = createMockRoute('999');

    let result: Artist | null = null;
    TestBed.runInInjectionContext(() => {
      const resolver$ = artistResolver(route, mockState) as Observable<Artist | null>;
      resolver$.subscribe((artist: Artist | null) => result = artist);
    });
    tick(600);

    expect(result).toBeNull();
    expect(notificationStreamSpy.error).toHaveBeenCalledWith('Error', 'No se pudo cargar el artista. Redirigiendo...');
    expect(routerSpy.navigate).toHaveBeenCalledWith(['/404']);
    expect(loadingServiceSpy.stop).toHaveBeenCalled();
  }));

  it('should start loading at the beginning', fakeAsync(() => {
    artistServiceSpy.getArtistById.and.returnValue(of(mockArtist));
    const route = createMockRoute('456');

    TestBed.runInInjectionContext(() => {
      const resolver$ = artistResolver(route, mockState) as Observable<Artist | null>;
      resolver$.subscribe();
    });
    tick();

    expect(loadingServiceSpy.start).toHaveBeenCalledWith('Cargando artista...');
  }));

  it('should stop loading in finalize', fakeAsync(() => {
    artistServiceSpy.getArtistById.and.returnValue(of(mockArtist));
    const route = createMockRoute('456');

    TestBed.runInInjectionContext(() => {
      const resolver$ = artistResolver(route, mockState) as Observable<Artist | null>;
      resolver$.subscribe();
    });
    tick();

    expect(loadingServiceSpy.stop).toHaveBeenCalled();
  }));
});
