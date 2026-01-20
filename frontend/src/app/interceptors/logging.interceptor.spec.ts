import { TestBed } from '@angular/core/testing';
import { HttpClient, provideHttpClient, withInterceptors, HttpErrorResponse } from '@angular/common/http';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { loggingInterceptor } from './logging.interceptor';

describe('LoggingInterceptor', () => {
  let httpClient: HttpClient;
  let httpTesting: HttpTestingController;
  let consoleSpy: {
    group: jasmine.Spy;
    groupEnd: jasmine.Spy;
    log: jasmine.Spy;
    error: jasmine.Spy;
  };

  beforeEach(() => {
    consoleSpy = {
      group: spyOn(console, 'group'),
      groupEnd: spyOn(console, 'groupEnd'),
      log: spyOn(console, 'log'),
      error: spyOn(console, 'error')
    };

    TestBed.configureTestingModule({
      providers: [
        provideHttpClient(withInterceptors([loggingInterceptor])),
        provideHttpClientTesting()
      ]
    });

    httpClient = TestBed.inject(HttpClient);
    httpTesting = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpTesting.verify();
  });

  describe('Logging de peticiones', () => {
    it('debería loggear petición GET', () => {
      httpClient.get('/api/test').subscribe();

      const req = httpTesting.expectOne('/api/test');

      expect(consoleSpy.group).toHaveBeenCalled();
      expect(consoleSpy.log).toHaveBeenCalled();

      req.flush({});
    });

    it('debería loggear petición POST con body', () => {
      httpClient.post('/api/test', { data: 'value' }).subscribe();

      const req = httpTesting.expectOne('/api/test');

      expect(consoleSpy.group).toHaveBeenCalled();

      req.flush({ success: true });
    });

    it('debería cerrar grupo de console después de petición', () => {
      httpClient.get('/api/test').subscribe();

      const req = httpTesting.expectOne('/api/test');
      req.flush({});

      expect(consoleSpy.groupEnd).toHaveBeenCalled();
    });
  });

  describe('Logging de respuestas exitosas', () => {
    it('debería loggear respuesta 200', () => {
      httpClient.get('/api/test').subscribe();

      const req = httpTesting.expectOne('/api/test');
      req.flush({ result: 'ok' }, { status: 200, statusText: 'OK' });

      expect(consoleSpy.group).toHaveBeenCalled();
    });

    it('debería loggear respuesta 201 Created', () => {
      httpClient.post('/api/test', {}).subscribe();

      const req = httpTesting.expectOne('/api/test');
      req.flush({ id: 1 }, { status: 201, statusText: 'Created' });

      expect(consoleSpy.group).toHaveBeenCalled();
    });
  });

  describe('Logging de errores', () => {
    it('debería loggear error 500', () => {
      httpClient.get('/api/error').subscribe({
        error: () => {}
      });

      const req = httpTesting.expectOne('/api/error');
      req.flush('Server Error', { status: 500, statusText: 'Internal Server Error' });

      expect(consoleSpy.error).toHaveBeenCalled();
    });

    it('debería loggear error 404', () => {
      httpClient.get('/api/notfound').subscribe({
        error: () => {}
      });

      const req = httpTesting.expectOne('/api/notfound');
      req.flush('Not Found', { status: 404, statusText: 'Not Found' });

      expect(consoleSpy.error).toHaveBeenCalled();
    });

    it('debería loggear error 401', () => {
      httpClient.get('/api/unauthorized').subscribe({
        error: () => {}
      });

      const req = httpTesting.expectOne('/api/unauthorized');
      req.flush('Unauthorized', { status: 401, statusText: 'Unauthorized' });

      expect(consoleSpy.error).toHaveBeenCalled();
    });
  });

  describe('Peticiones con parámetros', () => {
    it('debería loggear petición con query params', () => {
      httpClient.get('/api/search', {
        params: { q: 'test', page: '1' }
      }).subscribe();

      const req = httpTesting.expectOne(r => r.url === '/api/search');

      expect(consoleSpy.group).toHaveBeenCalled();

      req.flush({ results: [] });
    });
  });

  describe('Diferentes métodos HTTP', () => {
    it('debería loggear PUT', () => {
      httpClient.put('/api/item/1', { name: 'updated' }).subscribe();

      const req = httpTesting.expectOne('/api/item/1');
      expect(consoleSpy.group).toHaveBeenCalled();
      req.flush({});
    });

    it('debería loggear PATCH', () => {
      httpClient.patch('/api/item/1', { field: 'value' }).subscribe();

      const req = httpTesting.expectOne('/api/item/1');
      expect(consoleSpy.group).toHaveBeenCalled();
      req.flush({});
    });

    it('debería loggear DELETE', () => {
      httpClient.delete('/api/item/1').subscribe();

      const req = httpTesting.expectOne('/api/item/1');
      expect(consoleSpy.group).toHaveBeenCalled();
      req.flush({});
    });
  });

  describe('Seguridad en logs', () => {
    it('no debería exponer token de autorización en logs', () => {
      httpClient.get('/api/secure', {
        headers: { Authorization: 'Bearer secret-token' }
      }).subscribe();

      const req = httpTesting.expectOne('/api/secure');

      // El interceptor debería redactar el token
      const logCalls = consoleSpy.log.calls.allArgs();
      const hasExposedToken = logCalls.some(args =>
        JSON.stringify(args).includes('secret-token')
      );
      expect(hasExposedToken).toBeFalse();

      req.flush({});
    });
  });
});
