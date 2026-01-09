import { HttpInterceptorFn, HttpRequest, HttpHandlerFn, HttpEvent } from '@angular/common/http';
import { Observable } from 'rxjs';

/**
 * HeadersInterceptor - Interceptor de Headers Comunes
 *
 * PROPÓSITO:
 * - Añadir headers comunes a TODAS las peticiones HTTP
 * - Evitar repetir headers en cada servicio
 * - Configuración centralizada de headers
 *
 * HEADERS AÑADIDOS:
 * - Content-Type: application/json (para peticiones con body)
 * - Accept: application/json (indicar que esperamos JSON)
 * - X-Requested-With: XMLHttpRequest (identificar peticiones AJAX)
 * - X-Request-ID: UUID único por petición (para debugging y trazabilidad)
 * - X-App-Version: Versión de la aplicación
 *
 * PATRÓN: INTERCEPTOR
 * Modifica todas las peticiones salientes
 *
 * VENTAJAS:
 * - Consistente: Mismos headers en toda la app
 * - Mantenible: Cambiar headers en un solo lugar
 * - Trazabilidad: X-Request-ID permite seguir peticiones en logs
 * - Compatible: Evita problemas CORS y de formato
 *
 * @example
 * Configuración en app.config.ts:
 * ```typescript
 * provideHttpClient(
 *   withInterceptors([
 *     headersInterceptor,  // Primero para que otros interceptores vean los headers
 *     authInterceptor,
 *     loggingInterceptor,
 *     errorInterceptor
 *   ])
 * )
 * ```
 */
export const headersInterceptor: HttpInterceptorFn = (
  req: HttpRequest<unknown>,
  next: HttpHandlerFn
): Observable<HttpEvent<unknown>> => {

  // Preparar headers a añadir
  const headers: Record<string, string> = {};

  // Content-Type: Solo si la petición tiene body y no es FormData
  if (req.body && !(req.body instanceof FormData)) {
    // Solo añadir si no está ya definido
    if (!req.headers.has('Content-Type')) {
      headers['Content-Type'] = 'application/json';
    }
  }

  // Accept: Indicar que esperamos JSON
  if (!req.headers.has('Accept')) {
    headers['Accept'] = 'application/json';
  }

  // X-Requested-With: Identificar que es una petición AJAX/XHR
  // Útil para backends que necesitan diferenciar peticiones normales de AJAX
  headers['X-Requested-With'] = 'XMLHttpRequest';

  // X-Request-ID: Identificador único para trazabilidad
  // Permite relacionar logs del frontend con logs del backend
  headers['X-Request-ID'] = generateRequestId();

  // X-App-Version: Versión de la aplicación
  // Útil para debugging y para que el backend sepa qué versión usa el cliente
  headers['X-App-Version'] = getAppVersion();

  // Clonar la petición con los nuevos headers
  const modifiedReq = req.clone({
    setHeaders: headers
  });

  // Continuar con la petición modificada
  return next(modifiedReq);
};

/**
 * Genera un ID único para la petición
 * Formato: timestamp-random
 *
 * @returns ID único de petición
 *
 * @example
 * '1704830400000-a1b2c3d4'
 */
function generateRequestId(): string {
  const timestamp = Date.now();
  const random = Math.random().toString(36).substring(2, 10);
  return `${timestamp}-${random}`;
}

/**
 * Obtiene la versión de la aplicación
 * En producción, esto debería venir de package.json o variable de entorno
 *
 * @returns Versión de la aplicación
 */
function getAppVersion(): string {
  // TODO: Obtener versión real de package.json o variable de entorno
  return '1.0.0';
}
