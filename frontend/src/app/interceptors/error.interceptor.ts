import { HttpInterceptorFn, HttpRequest, HttpHandlerFn, HttpEvent, HttpErrorResponse } from '@angular/common/http';
import { inject } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Router } from '@angular/router';
import { NotificationStreamService } from '../services/notification-stream';
import { EventBusService, EventType } from '../services/event-bus';
import { AppStateService } from '../services/app-state';
import { environment } from '../../environments/environment';

/**
 * ErrorInterceptor - Interceptor de Manejo de Errores HTTP
 *
 * PROPÓSITO:
 * - Capturar y manejar TODOS los errores HTTP de forma centralizada
 * - Proporcionar experiencia de usuario consistente ante errores
 * - Automatizar acciones según tipo de error (logout en 401, etc.)
 * - Evitar código duplicado de manejo de errores en servicios
 *
 * CASOS DE USO:
 * - 401 Unauthorized: Cerrar sesión automáticamente
 * - 403 Forbidden: Mostrar mensaje de permisos insuficientes
 * - 404 Not Found: Mostrar mensaje de recurso no encontrado
 * - 500+ Server Error: Mostrar mensaje genérico de error
 * - 0 Network Error: Mostrar mensaje de error de conexión
 *
 * PATRÓN: INTERCEPTOR + OBSERVER
 * Usa catchError de RxJS para capturar errores en el stream
 *
 * VENTAJAS:
 * - Centralizado: Un solo lugar para manejar errores
 * - Consistente: Misma experiencia en toda la app
 * - Automático: No olvidar manejar errores en servicios
 * - Mantenible: Fácil cambiar comportamiento global
 *
 * @example
 * Configuración en app.config.ts:
 * ```typescript
 * provideHttpClient(
 *   withInterceptors([authInterceptor, errorInterceptor])
 * )
 * ```
 */
export const errorInterceptor: HttpInterceptorFn = (
  req: HttpRequest<unknown>,
  next: HttpHandlerFn
): Observable<HttpEvent<unknown>> => {

  const router = inject(Router);
  const notificationStream = inject(NotificationStreamService);
  const eventBus = inject(EventBusService);
  const appState = inject(AppStateService);

  return next(req).pipe(
    catchError((error: HttpErrorResponse) => {

      // En modo mock, ignorar errores de conexión (status 0) y 404
      // ya que el backend no está disponible y es esperado
      if (environment.useMockData && (error.status === 0 || error.status === 404)) {
        // No mostrar notificación, solo re-lanzar el error silenciosamente
        return throwError(() => error);
      }

      // 404 en endpoints de "check existencia" de lista de álbumes es esperado
      // Significa "no está en la lista", no es un error real de aplicación
      // Detectar: /usuarios/{id}/lista/{albumId} pero NO /lista/deezer
      const isListaCheckEndpoint = error.url && (
        /\/usuarios\/\d+\/lista\/\d+$/.test(error.url) ||
        (error.url.includes('/lista/') && !error.url.includes('/lista/deezer') && error.url.match(/\/lista\/\d+(\/existe)?$/))
      );
      if (error.status === 404 && isListaCheckEndpoint) {
        // Silenciar completamente: no log, no notificación
        // El servicio capturará esto con su propio catchError y retornará null/false
        return throwError(() => error);
      }

      // Log del error (solo en desarrollo y no en modo mock)
      if (!isProduction() && !environment.useMockData) {
        console.error('❌ HTTP Error intercepted:', {
          status: error.status,
          statusText: error.statusText,
          url: error.url,
          message: error.message,
          error: error.error
        });
      }

      // Manejar según el código de estado
      handleErrorByStatus(error, router, notificationStream, eventBus, appState);

      // Re-lanzar el error para que los servicios puedan manejarlo también si lo necesitan
      return throwError(() => error);
    })
  );
};

/**
 * Maneja el error según su código de estado HTTP
 */
function handleErrorByStatus(
  error: HttpErrorResponse,
  router: Router,
  notificationStream: NotificationStreamService,
  eventBus: EventBusService,
  appState: AppStateService
): void {

  let message = '';
  let shouldNavigate = false;
  let navigationPath = '';

  switch (error.status) {
    case 0:
      // Error de red - sin conexión al servidor
      message = '❌ No se puede conectar con el servidor. Verifica tu conexión a internet.';
      break;

    case 400:
      // Bad Request - petición inválida
      message = extractErrorMessage(error) || '⚠️ Petición inválida. Verifica los datos enviados.';
      break;

    case 401:
      // Unauthorized - no autenticado
      message = '🔒 Tu sesión ha expirado. Por favor, inicia sesión nuevamente.';

      // Cerrar sesión automáticamente
      appState.logout();
      eventBus.emit({
        type: EventType.USER_LOGOUT,
        source: 'ErrorInterceptor'
      });

      // Redirigir a login
      shouldNavigate = true;
      navigationPath = '/login';
      break;

    case 403:
      // Forbidden - sin permisos
      message = '🚫 No tienes permisos para realizar esta acción.';
      break;

    case 404:
      // Not Found - recurso no encontrado
      message = extractErrorMessage(error) || '🔍 Recurso no encontrado.';
      break;

    case 409:
      // Conflict - conflicto (ej: email ya existe)
      message = extractErrorMessage(error) || '⚠️ El recurso ya existe o hay un conflicto.';
      break;

    case 422:
      // Unprocessable Entity - validación fallida
      message = extractErrorMessage(error) || '⚠️ Los datos proporcionados no son válidos.';
      break;

    case 429:
      // Too Many Requests - rate limit
      message = '⏱️ Demasiadas peticiones. Por favor, espera un momento antes de intentar de nuevo.';
      break;

    case 500:
      // Internal Server Error
      message = '💥 Error interno del servidor. Nuestro equipo ha sido notificado.';
      break;

    case 502:
      // Bad Gateway
      message = '🔧 El servidor está experimentando problemas. Intenta de nuevo más tarde.';
      break;

    case 503:
      // Service Unavailable
      message = '🚧 Servicio temporalmente no disponible. Intenta de nuevo más tarde.';
      break;

    case 504:
      // Gateway Timeout
      message = '⏱️ El servidor tardó demasiado en responder. Intenta de nuevo.';
      break;

    default:
      // Error desconocido
      if (error.status >= 500) {
        message = `💥 Error del servidor (${error.status}). Por favor, intenta más tarde.`;
      } else {
        message = extractErrorMessage(error) || `❌ Ocurrió un error inesperado (${error.status}).`;
      }
  }

  // Mostrar notificación al usuario
  if (message) {
    notificationStream.error(
      'Error',
      message,
      error.status === 401 ? 5000 : 4000
    );
  }

  // Navegar si es necesario
  if (shouldNavigate && navigationPath) {
    setTimeout(() => {
      router.navigate([navigationPath]);
    }, 500); // Pequeño delay para que se vea la notificación
  }
}

/**
 * Extrae el mensaje de error del backend si existe
 */
function extractErrorMessage(error: HttpErrorResponse): string | null {
  // Intentar extraer mensaje del backend
  if (error.error) {
    if (typeof error.error === 'string') {
      return error.error;
    }

    if (error.error.message) {
      return error.error.message;
    }

    if (error.error.error) {
      return error.error.error;
    }

    // Si el error tiene un array de errores de validación
    if (Array.isArray(error.error.errors) && error.error.errors.length > 0) {
      return error.error.errors.map((e: any) => e.message || e).join(', ');
    }
  }

  return null;
}

/**
 * Helper para determinar si estamos en producción
 */
function isProduction(): boolean {
  return false; // Por ahora siempre en desarrollo
}
