import { HttpClient, HttpErrorResponse, HttpHeaders, HttpParams } from '@angular/common/http';
import { inject } from '@angular/core';
import { Observable, throwError, timer } from 'rxjs';
import { catchError, retry, timeout, map } from 'rxjs/operators';
import { API_CONFIG } from '../config/api.config';

/**
 * Opciones para peticiones HTTP
 */
export interface HttpOptions {
  headers?: HttpHeaders | { [header: string]: string | string[] };
  params?: HttpParams | { [param: string]: string | number | boolean | ReadonlyArray<string | number | boolean> };
  observe?: 'body';
  reportProgress?: boolean;
  responseType?: 'json';
  withCredentials?: boolean;
}

/**
 * Opciones internas para HttpClient (compatibilidad total)
 */
interface InternalHttpOptions {
  headers?: HttpHeaders | { [header: string]: string | string[] };
  params?: HttpParams | { [param: string]: string | number | boolean | ReadonlyArray<string | number | boolean> };
  observe?: 'body' | 'events' | 'response';
  reportProgress?: boolean;
  responseType?: 'json' | 'text' | 'blob' | 'arraybuffer';
  withCredentials?: boolean;
}

/**
 * Respuesta estándar de la API
 * Adapta este tipo según tu backend
 */
export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  message?: string;
  error?: string;
  timestamp?: string;
}

/**
 * BaseHttpService - Servicio Base para HTTP
 *
 * PROPÓSITO:
 * - Centralizar lógica común de peticiones HTTP
 * - Manejo de errores consistente
 * - Retry automático en fallos temporales
 * - Timeout configurable
 * - Construcción de URLs completas
 * - Logging unificado
 *
 * PATRÓN: HERENCIA
 * Todos los servicios HTTP deben extender esta clase
 *
 * VENTAJAS:
 * - DRY: No repetir código en cada servicio
 * - Consistencia: Todos los servicios se comportan igual
 * - Mantenibilidad: Cambios en un solo lugar
 * - Testing: Más fácil de mockear
 *
 * @example
 * ```typescript
 * @Injectable({ providedIn: 'root' })
 * export class AlbumService extends BaseHttpService {
 *   getAlbums(): Observable<Album[]> {
 *     return this.get<Album[]>(API_ENDPOINTS.albums.getAll);
 *   }
 *
 *   getAlbumById(id: string): Observable<Album> {
 *     return this.get<Album>(API_ENDPOINTS.albums.getById(id));
 *   }
 *
 *   createAlbum(album: Album): Observable<Album> {
 *     return this.post<Album>(API_ENDPOINTS.albums.create, album);
 *   }
 * }
 * ```
 */
export abstract class BaseHttpService {
  protected http = inject(HttpClient);
  protected baseUrl = API_CONFIG.baseUrl;

  /**
   * Construye la URL completa para una petición
   *
   * @param endpoint - Endpoint relativo (ej: '/albums' o '/albums/123')
   * @returns URL completa (ej: 'http://localhost:8080/api/albums')
   */
  protected buildUrl(endpoint: string): string {
    if (endpoint.startsWith('http://') || endpoint.startsWith('https://')) {
      return endpoint;
    }

    if (this.baseUrl !== '/' && endpoint.startsWith(this.baseUrl)) {
      return endpoint;
    }

    const normalizedEndpoint = endpoint.startsWith('/') ? endpoint : `/${endpoint}`;

    return `${this.baseUrl}${normalizedEndpoint}`;
  }

  /**
   * GET - Obtener recursos
   *
   * @param endpoint - Endpoint relativo o URL completa
   * @param options - Opciones HTTP (headers, params, etc.)
   * @returns Observable con los datos del tipo T
   *
   * @example
   * ```typescript
   * // Simple
   * this.get<Album[]>('/albums')
   *
   * // Con parámetros
   * this.get<Album[]>('/albums', {
   *   params: { page: 1, limit: 10 }
   * })
   *
   * // Con headers personalizados
   * this.get<Album>('/albums/123', {
   *   headers: { 'X-Custom-Header': 'value' }
   * })
   * ```
   */
  protected get<T>(endpoint: string, options?: HttpOptions): Observable<T> {
    const url = this.buildUrl(endpoint);

    return this.http.get<T>(url, options).pipe(
      timeout(API_CONFIG.timeout),
      retry({
        count: API_CONFIG.maxRetries,
        delay: (error: HttpErrorResponse, retryCount: number) => {
          // Solo reintentar en errores de red o servidor (5xx)
          if (this.shouldRetry(error)) {
            console.warn(`Retrying request (${retryCount}/${API_CONFIG.maxRetries}):`, url);
            return timer(API_CONFIG.retryDelay * retryCount);
          }
          return throwError(() => error);
        }
      }),
      catchError((error: HttpErrorResponse) => this.handleError(error, 'GET', url))
    );
  }

  /**
   * POST - Crear recursos
   *
   * @param endpoint - Endpoint relativo o URL completa
   * @param body - Datos a enviar
   * @param options - Opciones HTTP
   * @returns Observable con los datos del tipo T
   *
   * @example
   * ```typescript
   * this.post<Album>('/albums', {
   *   title: 'New Album',
   *   artist: 'Artist Name',
   *   year: 2024
   * })
   * ```
   */
  protected post<T>(endpoint: string, body: any, options?: HttpOptions): Observable<T> {
    const url = this.buildUrl(endpoint);

    return this.http.post<T>(url, body, options).pipe(
      timeout(API_CONFIG.timeout),
      catchError((error: HttpErrorResponse) => this.handleError(error, 'POST', url))
    );
  }

  /**
   * PUT - Actualizar recursos completos
   *
   * @param endpoint - Endpoint relativo o URL completa
   * @param body - Datos a actualizar
   * @param options - Opciones HTTP
   * @returns Observable con los datos del tipo T
   *
   * @example
   * ```typescript
   * this.put<Album>('/albums/123', updatedAlbum)
   * ```
   */
  protected put<T>(endpoint: string, body: any, options?: HttpOptions): Observable<T> {
    const url = this.buildUrl(endpoint);

    return this.http.put<T>(url, body, options).pipe(
      timeout(API_CONFIG.timeout),
      catchError((error: HttpErrorResponse) => this.handleError(error, 'PUT', url))
    );
  }

  /**
   * PATCH - Actualizar recursos parcialmente
   *
   * @param endpoint - Endpoint relativo o URL completa
   * @param body - Datos parciales a actualizar
   * @param options - Opciones HTTP
   * @returns Observable con los datos del tipo T
   *
   * @example
   * ```typescript
   * this.patch<Album>('/albums/123', { title: 'New Title' })
   * ```
   */
  protected patch<T>(endpoint: string, body: any, options?: HttpOptions): Observable<T> {
    const url = this.buildUrl(endpoint);

    return this.http.patch<T>(url, body, options).pipe(
      timeout(API_CONFIG.timeout),
      catchError((error: HttpErrorResponse) => this.handleError(error, 'PATCH', url))
    );
  }

  /**
   * DELETE - Eliminar recursos
   *
   * @param endpoint - Endpoint relativo o URL completa
   * @param options - Opciones HTTP
   * @returns Observable con los datos del tipo T
   *
   * @example
   * ```typescript
   * this.delete<void>('/albums/123')
   * ```
   */
  protected delete<T>(endpoint: string, options?: HttpOptions): Observable<T> {
    const url = this.buildUrl(endpoint);

    return this.http.delete<T>(url, options).pipe(
      timeout(API_CONFIG.timeout),
      catchError((error: HttpErrorResponse) => this.handleError(error, 'DELETE', url))
    );
  }

  /**
   * Determina si se debe reintentar una petición fallida
   *
   * @param error - Error HTTP
   * @returns true si se debe reintentar
   */
  private shouldRetry(error: HttpErrorResponse): boolean {
    // Reintentar solo en:
    // - Errores de red (status 0)
    // - Errores del servidor (5xx)
    // - Timeout (504)

    if (error.status === 0) return true; // Error de red
    if (error.status >= 500 && error.status < 600) return true; // 5xx

    return false;
  }

  /**
   * Manejo centralizado de errores HTTP
   *
   * @param error - Error HTTP
   * @param method - Método HTTP
   * @param url - URL de la petición
   * @returns Observable que emite el error
   */
  private handleError(error: HttpErrorResponse, method: string, url: string): Observable<never> {
    let errorMessage = 'Ocurrió un error desconocido';

    if (error.error instanceof ErrorEvent) {
      // Error del lado del cliente
      errorMessage = `Error de red: ${error.error.message}`;
      console.error('Client-side error:', error.error);
    } else {
      // Error del lado del servidor
      errorMessage = this.getServerErrorMessage(error);
      console.error(
        `Backend returned code ${error.status}, ` +
        `method: ${method}, ` +
        `URL: ${url}, ` +
        `body was:`, error.error
      );
    }

    // Retornar observable con error amigable
    return throwError(() => ({
      status: error.status,
      message: errorMessage,
      originalError: error,
      timestamp: new Date().toISOString(),
    }));
  }

  /**
   * Extrae mensaje de error del servidor
   *
   * @param error - Error HTTP
   * @returns Mensaje de error amigable
   */
  private getServerErrorMessage(error: HttpErrorResponse): string {
    // Intentar extraer mensaje del backend
    if (error.error?.message) {
      return error.error.message;
    }

    if (error.error?.error) {
      return error.error.error;
    }

    // Mensajes por código de estado
    switch (error.status) {
      case 400:
        return 'Petición inválida. Por favor, verifica los datos enviados.';
      case 401:
        return 'No autorizado. Por favor, inicia sesión.';
      case 403:
        return 'No tienes permisos para realizar esta acción.';
      case 404:
        return 'Recurso no encontrado.';
      case 409:
        return 'Conflicto. El recurso ya existe.';
      case 422:
        return 'Datos de validación incorrectos.';
      case 429:
        return 'Demasiadas peticiones. Por favor, espera un momento.';
      case 500:
        return 'Error interno del servidor. Por favor, intenta más tarde.';
      case 503:
        return 'Servicio no disponible. Por favor, intenta más tarde.';
      default:
        return `Error del servidor (${error.status}). Por favor, intenta más tarde.`;
    }
  }
}
