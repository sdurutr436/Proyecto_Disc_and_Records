import { TestBed, fakeAsync, tick, flush } from '@angular/core/testing';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { provideHttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BaseHttpService, HttpOptions } from './base-http.service';
import { Observable } from 'rxjs';
import { API_CONFIG } from '../config/api.config';

// Clase concreta para probar la clase abstracta BaseHttpService
@Injectable({ providedIn: 'root' })
class TestHttpService extends BaseHttpService {
  // Exponemos los métodos protegidos para testing
  testGet<T>(endpoint: string, options?: HttpOptions): Observable<T> {
    return this.get<T>(endpoint, options);
  }

  testPost<T>(endpoint: string, body: any, options?: HttpOptions): Observable<T> {
    return this.post<T>(endpoint, body, options);
  }

  testPut<T>(endpoint: string, body: any, options?: HttpOptions): Observable<T> {
    return this.put<T>(endpoint, body, options);
  }

  testPatch<T>(endpoint: string, body: any, options?: HttpOptions): Observable<T> {
    return this.patch<T>(endpoint, body, options);
  }

  testDelete<T>(endpoint: string, options?: HttpOptions): Observable<T> {
    return this.delete<T>(endpoint, options);
  }

  testBuildUrl(endpoint: string): string {
    return this.buildUrl(endpoint);
  }
}

describe('BaseHttpService', () => {
  let service: TestHttpService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        provideHttpClient(),
        provideHttpClientTesting(),
        TestHttpService
      ]
    });
    service = TestBed.inject(TestHttpService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  describe('buildUrl()', () => {
    it('should append endpoint to base URL', () => {
      const url = service.testBuildUrl('/albums');
      expect(url).toBe(`${API_CONFIG.baseUrl}/albums`);
    });

    it('should add leading slash if missing', () => {
      const url = service.testBuildUrl('albums');
      expect(url).toBe(`${API_CONFIG.baseUrl}/albums`);
    });

    it('should return full URL as-is if starts with http://', () => {
      const fullUrl = 'http://external.api.com/data';
      const url = service.testBuildUrl(fullUrl);
      expect(url).toBe(fullUrl);
    });

    it('should return full URL as-is if starts with https://', () => {
      const fullUrl = 'https://external.api.com/data';
      const url = service.testBuildUrl(fullUrl);
      expect(url).toBe(fullUrl);
    });
  });

  describe('get()', () => {
    it('should make GET request to correct URL', () => {
      service.testGet<any>('/albums').subscribe();
      const req = httpMock.expectOne(`${API_CONFIG.baseUrl}/albums`);
      expect(req.request.method).toBe('GET');
      req.flush([]);
    });

    it('should return data on success', () => {
      const mockData = [{ id: 1, title: 'Album 1' }];
      let result: any;

      service.testGet<any>('/albums').subscribe(data => result = data);
      httpMock.expectOne(`${API_CONFIG.baseUrl}/albums`).flush(mockData);

      expect(result).toEqual(mockData);
    });

    it('should pass query params', () => {
      service.testGet<any>('/albums', { params: { page: '1', limit: '10' } }).subscribe();
      const req = httpMock.expectOne(r => r.url === `${API_CONFIG.baseUrl}/albums`);

      expect(req.request.params.get('page')).toBe('1');
      expect(req.request.params.get('limit')).toBe('10');
      req.flush([]);
    });
  });

  describe('post()', () => {
    it('should make POST request with body', () => {
      const body = { title: 'New Album' };

      service.testPost<any>('/albums', body).subscribe();
      const req = httpMock.expectOne(`${API_CONFIG.baseUrl}/albums`);

      expect(req.request.method).toBe('POST');
      expect(req.request.body).toEqual(body);
      req.flush({ id: 1, ...body });
    });

    it('should return created resource', () => {
      const body = { title: 'New Album' };
      let result: any;

      service.testPost<any>('/albums', body).subscribe(data => result = data);
      httpMock.expectOne(`${API_CONFIG.baseUrl}/albums`).flush({ id: 1, title: 'New Album' });

      expect(result.id).toBe(1);
    });
  });

  describe('put()', () => {
    it('should make PUT request with body', () => {
      const body = { id: 1, title: 'Updated Album' };

      service.testPut<any>('/albums/1', body).subscribe();
      const req = httpMock.expectOne(`${API_CONFIG.baseUrl}/albums/1`);

      expect(req.request.method).toBe('PUT');
      expect(req.request.body).toEqual(body);
      req.flush(body);
    });
  });

  describe('patch()', () => {
    it('should make PATCH request with partial body', () => {
      const body = { title: 'Partial Update' };

      service.testPatch<any>('/albums/1', body).subscribe();
      const req = httpMock.expectOne(`${API_CONFIG.baseUrl}/albums/1`);

      expect(req.request.method).toBe('PATCH');
      expect(req.request.body).toEqual(body);
      req.flush({ id: 1, ...body });
    });
  });

  describe('delete()', () => {
    it('should make DELETE request', () => {
      service.testDelete<any>('/albums/1').subscribe();
      const req = httpMock.expectOne(`${API_CONFIG.baseUrl}/albums/1`);

      expect(req.request.method).toBe('DELETE');
      req.flush(null);
    });
  });

  describe('error handling', () => {
    it('should handle 400 Bad Request', fakeAsync(() => {
      let error: any;

      service.testGet<any>('/albums').subscribe({
        error: (e) => error = e
      });

      httpMock.expectOne(`${API_CONFIG.baseUrl}/albums`).flush(
        { message: 'Invalid data' },
        { status: 400, statusText: 'Bad Request' }
      );
      flush();

      expect(error.status).toBe(400);
    }));

    it('should handle 401 Unauthorized', fakeAsync(() => {
      let error: any;

      service.testPost<any>('/albums', {}).subscribe({
        error: (e) => error = e
      });

      httpMock.expectOne(`${API_CONFIG.baseUrl}/albums`).flush(
        null,
        { status: 401, statusText: 'Unauthorized' }
      );
      flush();

      expect(error.status).toBe(401);
      expect(error.message).toContain('autorizado');
    }));

    it('should handle 403 Forbidden', fakeAsync(() => {
      let error: any;

      service.testDelete<any>('/albums/1').subscribe({
        error: (e) => error = e
      });

      httpMock.expectOne(`${API_CONFIG.baseUrl}/albums/1`).flush(
        null,
        { status: 403, statusText: 'Forbidden' }
      );
      flush();

      expect(error.status).toBe(403);
      expect(error.message).toContain('permiso');
    }));

    it('should handle 404 Not Found', fakeAsync(() => {
      let error: any;

      service.testGet<any>('/albums/999').subscribe({
        error: (e) => error = e
      });

      httpMock.expectOne(`${API_CONFIG.baseUrl}/albums/999`).flush(
        null,
        { status: 404, statusText: 'Not Found' }
      );
      flush();

      expect(error.status).toBe(404);
      expect(error.message).toContain('no encontrado');
    }));

    it('should handle 409 Conflict', fakeAsync(() => {
      let error: any;

      service.testPost<any>('/albums', { title: 'Duplicate' }).subscribe({
        error: (e) => error = e
      });

      httpMock.expectOne(`${API_CONFIG.baseUrl}/albums`).flush(
        null,
        { status: 409, statusText: 'Conflict' }
      );
      flush();

      expect(error.status).toBe(409);
      expect(error.message).toContain('existe');
    }));

    it('should handle 429 Too Many Requests', fakeAsync(() => {
      let error: any;

      service.testGet<any>('/albums').subscribe({
        error: (e) => error = e
      });

      httpMock.expectOne(`${API_CONFIG.baseUrl}/albums`).flush(
        null,
        { status: 429, statusText: 'Too Many Requests' }
      );
      flush();

      expect(error.status).toBe(429);
      expect(error.message).toContain('peticiones');
    }));

    it('should include timestamp in error response', fakeAsync(() => {
      let error: any;

      service.testPost<any>('/albums', {}).subscribe({
        next: () => {},
        error: (e) => error = e
      });

      httpMock.expectOne(`${API_CONFIG.baseUrl}/albums`).flush(
        null,
        { status: 400, statusText: 'Bad Request' }
      );
      tick();
      flush();

      expect(error).toBeDefined();
      expect(error.timestamp).toBeDefined();
    }));

    it('should use backend message if provided', fakeAsync(() => {
      let error: any;

      service.testGet<any>('/albums').subscribe({
        error: (e) => error = e
      });

      httpMock.expectOne(`${API_CONFIG.baseUrl}/albums`).flush(
        { message: 'Custom backend error' },
        { status: 400, statusText: 'Bad Request' }
      );
      flush();

      expect(error.message).toBe('Custom backend error');
    }));
  });
});
