import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth';

/**
 * AuthGuard - Guard para proteger rutas que requieren autenticación
 *
 * PROPÓSITO:
 * - Verificar si el usuario está autenticado antes de permitir el acceso a una ruta
 * - Redirigir a la página de inicio si no está autenticado
 *
 * USO:
 * ```typescript
 * {
 *   path: 'albums/new',
 *   component: AlbumFormComponent,
 *   canActivate: [authGuard]
 * }
 * ```
 *
 * NOTA:
 * Este es un guard funcional (función en lugar de clase)
 * que es el enfoque recomendado en Angular moderno
 */
export const authGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);

  const isAuthenticated = authService.isAuthenticated();

  if (!isAuthenticated) {
    console.warn('[AuthGuard] Acceso denegado. Usuario no autenticado.');
    console.log('[AuthGuard] Redirigiendo a la página de inicio...');

    // Guardar la URL original para redirección posterior al login
    const returnUrl = state.url;

    // Redirigir al home con query param de returnUrl
    router.navigate(['/'], {
      queryParams: { returnUrl }
    });

    return false;
  }

  console.log('[AuthGuard] Acceso permitido. Usuario autenticado.');
  return true;
};

/**
 * AdminGuard - Guard para proteger rutas de administrador
 *
 * PROPÓSITO:
 * - Verificar si el usuario tiene rol de administrador
 * - Redirigir si no tiene permisos suficientes
 *
 * USO:
 * ```typescript
 * {
 *   path: 'admin',
 *   component: AdminPanelComponent,
 *   canActivate: [authGuard, adminGuard]
 * }
 * ```
 */
export const adminGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);

  const currentUser = authService.getCurrentUser();

  // TODO: Implementar verificación de rol de administrador cuando se agregue a la interfaz User
  if (!currentUser) {
    console.warn('[AdminGuard] Acceso denegado. Usuario no autenticado.');
    router.navigate(['/']);
    return false;
  }

  console.log('[AdminGuard] Acceso permitido.');
  return true;
};
