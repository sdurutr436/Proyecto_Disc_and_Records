import { TestBed } from '@angular/core/testing';
import { HttpClient, provideHttpClient, withInterceptors } from '@angular/common/http';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { headersInterceptor } from './headers.interceptor';

describe('HeadersInterceptor', () => {
  let httpClient: HttpClient;
  let httpTesting: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        provideHttpClient(withInterceptors([headersInterceptor])),
        provideHttpClientTesting()
      ]
    });

    httpClient = TestBed.inject(HttpClient);
    httpTesting = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpTesting.verify();
  });

  describe('Headers comunes', () => {
    it('debería añadir header Accept', () => {
      httpClient.get('/api/test').subscribe();

      const req = httpTesting.expectOne('/api/test');
      expect(req.request.headers.get('Accept')).toBe('application/json');
      req.flush({});
    });

    it('debería añadir header X-Requested-With', () => {
      httpClient.get('/api/test').subscribe();

      const req = httpTesting.expectOne('/api/test');
      expect(req.request.headers.get('X-Requested-With')).toBe('XMLHttpRequest');
      req.flush({});
    });

    it('debería añadir header X-Request-ID', () => {
      httpClient.get('/api/test').subscribe();

      const req = httpTesting.expectOne('/api/test');
      const requestId = req.request.headers.get('X-Request-ID');
      expect(requestId).toBeTruthy();
      expect(requestId).toMatch(/^\d+-[a-z0-9]+$/);
      req.flush({});
    });

    it('debería añadir header X-App-Version', () => {
      httpClient.get('/api/test').subscribe();

      const req = httpTesting.expectOne('/api/test');
      expect(req.request.headers.get('X-App-Version')).toBe('1.0.0');
      req.flush({});
    });
  });

  describe('Content-Type', () => {
    it('debería añadir Content-Type para peticiones con body JSON', () => {
      httpClient.post('/api/test', { data: 'test' }).subscribe();

      const req = httpTesting.expectOne('/api/test');
      expect(req.request.headers.get('Content-Type')).toBe('application/json');
      req.flush({});
    });

    it('no debería añadir Content-Type para peticiones GET', () => {
      httpClient.get('/api/test').subscribe();

      const req = httpTesting.expectOne('/api/test');
      // GET sin body no debería tener Content-Type
      expect(req.request.headers.has('Content-Type')).toBeFalse();
      req.flush({});
    });

    it('debería añadir Content-Type para PUT con body', () => {
      httpClient.put('/api/test', { update: true }).subscribe();

      const req = httpTesting.expectOne('/api/test');
      expect(req.request.headers.get('Content-Type')).toBe('application/json');
      req.flush({});
    });

    it('debería añadir Content-Type para PATCH con body', () => {
      httpClient.patch('/api/test', { field: 'value' }).subscribe();

      const req = httpTesting.expectOne('/api/test');
      expect(req.request.headers.get('Content-Type')).toBe('application/json');
      req.flush({});
    });
  });

  describe('No sobrescribir headers existentes', () => {
    it('no debería sobrescribir Accept si ya existe', () => {
      httpClient.get('/api/test', {
        headers: { Accept: 'text/html' }
      }).subscribe();

      const req = httpTesting.expectOne('/api/test');
      expect(req.request.headers.get('Accept')).toBe('text/html');
      req.flush({});
    });

    it('no debería sobrescribir Content-Type si ya existe', () => {
      httpClient.post('/api/test', { data: 'test' }, {
        headers: { 'Content-Type': 'text/plain' }
      }).subscribe();

      const req = httpTesting.expectOne('/api/test');
      expect(req.request.headers.get('Content-Type')).toBe('text/plain');
      req.flush({});
    });
  });

  describe('Diferentes métodos HTTP', () => {
    it('debería funcionar con DELETE', () => {
      httpClient.delete('/api/test/1').subscribe();

      const req = httpTesting.expectOne('/api/test/1');
      expect(req.request.headers.get('Accept')).toBe('application/json');
      expect(req.request.headers.get('X-Requested-With')).toBe('XMLHttpRequest');
      req.flush({});
    });

    it('debería generar X-Request-ID único por petición', () => {
      httpClient.get('/api/test1').subscribe();
      httpClient.get('/api/test2').subscribe();

      const req1 = httpTesting.expectOne('/api/test1');
      const req2 = httpTesting.expectOne('/api/test2');

      const id1 = req1.request.headers.get('X-Request-ID');
      const id2 = req2.request.headers.get('X-Request-ID');

      expect(id1).not.toBe(id2);

      req1.flush({});
      req2.flush({});
    });
  });
});
