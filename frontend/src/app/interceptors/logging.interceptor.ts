import { HttpInterceptorFn, HttpRequest, HttpHandlerFn, HttpEvent, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

/**
 * LoggingInterceptor - Interceptor de Logging HTTP
 *
 * PROPÓSITO:
 * - Registrar todas las peticiones y respuestas HTTP
 * - Facilitar debugging y troubleshooting
 * - Medir performance de peticiones
 * - Auditoría de llamadas API
 *
 * INFORMACIÓN REGISTRADA:
 * - Método HTTP y URL
 * - Headers de petición (sin token por seguridad)
 * - Body de petición (en POST/PUT/PATCH)
 * - Status code de respuesta
 * - Tiempo de respuesta
 * - Tamaño de respuesta (si está disponible)
 *
 * PATRÓN: INTERCEPTOR + OBSERVER
 * Usa tap() para observar sin modificar el stream
 *
 * CONFIGURACIÓN:
 * Solo activo en desarrollo. En producción se puede desactivar
 * o enviar logs a servicio de monitorización (Sentry, LogRocket, etc.)
 *
 * @example
 * Configuración en app.config.ts:
 * ```typescript
 * provideHttpClient(
 *   withInterceptors([
 *     authInterceptor,
 *     loggingInterceptor,  // Antes del errorInterceptor para ver todos los logs
 *     errorInterceptor
 *   ])
 * )
 * ```
 */
export const loggingInterceptor: HttpInterceptorFn = (
  req: HttpRequest<unknown>,
  next: HttpHandlerFn
): Observable<HttpEvent<unknown>> => {

  // Solo en desarrollo
  if (isProduction()) {
    return next(req);
  }

  const startTime = Date.now();
  const method = req.method;
  const url = req.urlWithParams;

  // Log de petición saliente
  console.group(`🚀 ${method} ${url}`);
  console.log('📤 Request:', {
    method,
    url: req.url,
    params: req.params.keys().length > 0 ? serializeParams(req) : null,
    headers: getRelevantHeaders(req),
    body: req.body || null,
    timestamp: new Date().toISOString()
  });
  console.groupEnd();

  // Continuar con la petición y observar la respuesta
  return next(req).pipe(
    tap({
      next: (event) => {
        // Solo loggear respuestas completas
        if (event instanceof HttpResponse) {
          const elapsedTime = Date.now() - startTime;
          const status = event.status;
          const statusText = event.statusText;

          // Color según status code
          const statusColor = getStatusColor(status);
          const timeColor = getTimeColor(elapsedTime);

          console.group(`%c✅ ${status} ${method} ${url}`, `color: ${statusColor}; font-weight: bold`);
          console.log('📥 Response:', {
            status: `${status} ${statusText}`,
            time: `%c${elapsedTime}ms`,
            headers: getRelevantResponseHeaders(event),
            body: event.body,
            timestamp: new Date().toISOString()
          }, `color: ${timeColor}; font-weight: bold`);
          console.groupEnd();
        }
      },
      error: (error: any) => {
        const elapsedTime = Date.now() - startTime;
        const status = error.status || 'Network Error';

        console.group(`%c❌ ${status} ${method} ${url}`, 'color: #ef4444; font-weight: bold');
        console.error('📥 Error Response:', {
          status: error.status,
          statusText: error.statusText,
          time: `${elapsedTime}ms`,
          message: error.message,
          error: error.error,
          timestamp: new Date().toISOString()
        });
        console.groupEnd();
      }
    })
  );
};

/**
 * Serializa los parámetros de query string
 */
function serializeParams(req: HttpRequest<unknown>): Record<string, string> {
  const params: Record<string, string> = {};
  req.params.keys().forEach(key => {
    params[key] = req.params.get(key) || '';
  });
  return params;
}

/**
 * Obtiene headers relevantes (excluye Authorization por seguridad)
 */
function getRelevantHeaders(req: HttpRequest<unknown>): Record<string, string> {
  const headers: Record<string, string> = {};

  req.headers.keys().forEach(key => {
    // No loggear Authorization por seguridad
    if (key.toLowerCase() === 'authorization') {
      headers[key] = '[REDACTED]';
    } else {
      headers[key] = req.headers.get(key) || '';
    }
  });

  return headers;
}

/**
 * Obtiene headers relevantes de la respuesta
 */
function getRelevantResponseHeaders(response: HttpResponse<unknown>): Record<string, string> {
  const headers: Record<string, string> = {};

  // Headers comunes de interés
  const relevantHeaders = ['content-type', 'content-length', 'cache-control', 'etag', 'x-request-id'];

  relevantHeaders.forEach(headerName => {
    const value = response.headers.get(headerName);
    if (value) {
      headers[headerName] = value;
    }
  });

  return headers;
}

/**
 * Obtiene color según el status code
 */
function getStatusColor(status: number): string {
  if (status >= 200 && status < 300) return '#10b981'; // Verde
  if (status >= 300 && status < 400) return '#3b82f6'; // Azul
  if (status >= 400 && status < 500) return '#f59e0b'; // Naranja
  if (status >= 500) return '#ef4444'; // Rojo
  return '#6b7280'; // Gris
}

/**
 * Obtiene color según el tiempo de respuesta
 */
function getTimeColor(ms: number): string {
  if (ms < 100) return '#10b981';  // Verde (rápido)
  if (ms < 500) return '#f59e0b';  // Naranja (medio)
  return '#ef4444';                // Rojo (lento)
}

/**
 * Helper para determinar si estamos en producción
 */
function isProduction(): boolean {
  return false; // Por ahora siempre en desarrollo
}
