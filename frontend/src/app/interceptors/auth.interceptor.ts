import { HttpInterceptorFn, HttpRequest, HttpHandlerFn, HttpEvent } from '@angular/common/http';
import { inject } from '@angular/core';
import { Observable } from 'rxjs';
import { AppStateService } from '../services/app-state';
import { STORAGE_KEYS } from '../config/api.config';

/**
 * AuthInterceptor - Interceptor de Autenticación
 *
 * PROPÓSITO:
 * - Añadir automáticamente el token JWT a todas las peticiones HTTP
 * - Evitar añadir token manualmente en cada servicio
 * - Centralizar la lógica de autenticación
 *
 * FUNCIONAMIENTO:
 * 1. Intercepta TODAS las peticiones HTTP salientes
 * 2. Verifica si existe un token de autenticación
 * 3. Si existe, clona la petición y añade el header Authorization
 * 4. Si no existe, deja pasar la petición sin modificar
 *
 * PATRÓN: INTERCEPTOR (funcional)
 * Angular 17+ usa functional interceptors en lugar de class-based
 *
 * VENTAJAS:
 * - Automático: No olvidar añadir token en servicios
 * - Centralizado: Un solo lugar para gestionar autenticación
 * - DRY: No repetir código en cada petición
 * - Seguro: Token no expuesto en código de componentes
 *
 * @example
 * Configuración en app.config.ts:
 * ```typescript
 * provideHttpClient(
 *   withInterceptors([authInterceptor])
 * )
 * ```
 */
export const authInterceptor: HttpInterceptorFn = (
  req: HttpRequest<unknown>,
  next: HttpHandlerFn
): Observable<HttpEvent<unknown>> => {

  // Inyectar AppStateService para obtener el usuario actual
  const appState = inject(AppStateService);
  const currentUser = appState.currentUser();

  // Obtener token del usuario o de localStorage como fallback
  let token = currentUser?.token;

  if (!token) {
    // Fallback: intentar obtener de localStorage
    try {
      token = localStorage.getItem(STORAGE_KEYS.authToken) || undefined;
    } catch (e) {
      console.warn('Error accediendo a localStorage:', e);
    }
  }

  // Si no hay token, continuar sin modificar la petición
  if (!token) {
    return next(req);
  }

  // Clonar la petición y añadir el header Authorization
  // IMPORTANTE: Las peticiones HTTP son inmutables, debemos clonar
  const authReq = req.clone({
    setHeaders: {
      Authorization: `Bearer ${token}`
    }
  });

  // Log solo en desarrollo
  if (!isProduction()) {
    console.debug('🔒 Auth interceptor: Token añadido a la petición', {
      url: req.url,
      method: req.method,
      hasToken: !!token
    });
  }

  // Continuar con la petición modificada
  return next(authReq);
};

/**
 * Helper para determinar si estamos en producción
 */
function isProduction(): boolean {
  // En Angular 17+, usar import.meta.env o variable de entorno
  return false; // Por ahora siempre en desarrollo
}
