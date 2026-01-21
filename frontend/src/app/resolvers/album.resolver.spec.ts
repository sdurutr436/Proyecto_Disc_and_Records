import { TestBed, fakeAsync, tick } from '@angular/core/testing';
import { Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable, of, throwError } from 'rxjs';
import { albumResolver } from './album.resolver';
import { AlbumService } from '../services/album.service';
import { LoadingService } from '../services/loading';
import { NotificationStreamService } from '../services/notification-stream';
import { BreadcrumbService } from '../services/breadcrumb.service';
import { Album } from '../models/data.models';

describe('albumResolver', () => {
  let albumServiceSpy: jasmine.SpyObj<AlbumService>;
  let loadingServiceSpy: jasmine.SpyObj<LoadingService>;
  let notificationStreamSpy: jasmine.SpyObj<NotificationStreamService>;
  let breadcrumbServiceSpy: jasmine.SpyObj<BreadcrumbService>;
  let routerSpy: jasmine.SpyObj<Router>;

  const mockAlbum: Album = {
    id: '123',
    title: 'Test Album',
    artist: 'Test Artist',
    artistId: '456',
    coverUrl: 'https://example.com/cover.jpg',
    releaseYear: 2023,
    genre: 'Rock',
    tracks: 10,
    duration: '45:30',
    label: 'Test Label',
    description: 'Test description',
    averageRating: 4.5,
    totalReviews: 100
  };

  beforeEach(() => {
    albumServiceSpy = jasmine.createSpyObj('AlbumService', ['getAlbumById']);
    loadingServiceSpy = jasmine.createSpyObj('LoadingService', ['start', 'stop']);
    notificationStreamSpy = jasmine.createSpyObj('NotificationStreamService', ['error']);
    breadcrumbServiceSpy = jasmine.createSpyObj('BreadcrumbService', ['updateCurrentBreadcrumb']);
    routerSpy = jasmine.createSpyObj('Router', ['navigate']);

    TestBed.configureTestingModule({
      providers: [
        { provide: AlbumService, useValue: albumServiceSpy },
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

  it('should return album when found', fakeAsync(() => {
    albumServiceSpy.getAlbumById.and.returnValue(of(mockAlbum));
    const route = createMockRoute('123');

    let result: Album | null | undefined;
    TestBed.runInInjectionContext(() => {
      const resolver$ = albumResolver(route, mockState) as Observable<Album | null>;
      resolver$.subscribe((album: Album | null) => result = album);
    });
    tick();

    expect(result).toEqual(mockAlbum);
    expect(loadingServiceSpy.start).toHaveBeenCalledWith('Cargando álbum...');
    expect(breadcrumbServiceSpy.updateCurrentBreadcrumb).toHaveBeenCalledWith('Test Album');
    expect(loadingServiceSpy.stop).toHaveBeenCalled();
  }));

  it('should navigate to 404 when id is null', fakeAsync(() => {
    const route = createMockRoute(null);

    let result: Album | null = null;
    TestBed.runInInjectionContext(() => {
      const resolver$ = albumResolver(route, mockState) as Observable<Album | null>;
      resolver$.subscribe((album: Album | null) => result = album);
    });
    tick();

    expect(result).toBeNull();
    expect(notificationStreamSpy.error).toHaveBeenCalledWith('ID inválido', 'El ID del álbum no es válido');
    expect(routerSpy.navigate).toHaveBeenCalledWith(['/404']);
  }));

  it('should handle error and navigate to 404', fakeAsync(() => {
    albumServiceSpy.getAlbumById.and.returnValue(throwError(() => new Error('Not found')));
    const route = createMockRoute('999');

    let result: Album | null = null;
    TestBed.runInInjectionContext(() => {
      const resolver$ = albumResolver(route, mockState) as Observable<Album | null>;
      resolver$.subscribe((album: Album | null) => result = album);
    });
    tick(600);

    expect(result).toBeNull();
    expect(notificationStreamSpy.error).toHaveBeenCalledWith('Error', 'No se pudo cargar el álbum. Redirigiendo...');
    expect(routerSpy.navigate).toHaveBeenCalledWith(['/404']);
    expect(loadingServiceSpy.stop).toHaveBeenCalled();
  }));

  it('should start loading at the beginning', fakeAsync(() => {
    albumServiceSpy.getAlbumById.and.returnValue(of(mockAlbum));
    const route = createMockRoute('123');

    TestBed.runInInjectionContext(() => {
      const resolver$ = albumResolver(route, mockState) as Observable<Album | null>;
      resolver$.subscribe();
    });
    tick();

    expect(loadingServiceSpy.start).toHaveBeenCalledWith('Cargando álbum...');
  }));

  it('should stop loading in finalize', fakeAsync(() => {
    albumServiceSpy.getAlbumById.and.returnValue(of(mockAlbum));
    const route = createMockRoute('123');

    TestBed.runInInjectionContext(() => {
      const resolver$ = albumResolver(route, mockState) as Observable<Album | null>;
      resolver$.subscribe();
    });
    tick();

    expect(loadingServiceSpy.stop).toHaveBeenCalled();
  }));
});
