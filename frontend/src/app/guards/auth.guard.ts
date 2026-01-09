import { inject } from '@angular/core';
import { Router, CanActivateFn, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { AuthService } from '../services/auth';
import { NotificationStreamService } from '../services/notification-stream';

/**
 * Auth Guard - Protección de rutas que requieren autenticación
 *
 * PROPÓSITO:
 * - Proteger rutas privadas (profile, settings, admin)
 * - Redirigir a home si no está autenticado
 * - Mostrar notificación al usuario
 *
 * PATRÓN: Functional Guard (Angular 15+)
 * - Usa CanActivateFn en lugar de class guard
 * - Más simple y con mejor tree-shaking
 *
 * USO EN RUTAS:
 * ```typescript
 * {
 *   path: 'profile',
 *   component: ProfileComponent,
 *   canActivate: [authGuard]
 * }
 * ```
 *
 * FLUJO:
 * 1. Usuario intenta acceder a ruta protegida
 * 2. Guard verifica si está autenticado con AuthService
 * 3a. Si autenticado: permite acceso (return true)
 * 3b. Si NO autenticado:
 *     - Muestra notificación de error
 *     - Guarda URL original en query params (returnUrl)
 *     - Redirige a home
 *     - Bloquea acceso (return false)
 *
 * CARACTERÍSTICAS:
 * - ✅ Guarda returnUrl para redirigir después del login
 * - ✅ Notifica al usuario por qué fue bloqueado
 * - ✅ Funciona con lazy loading
 * - ✅ Type-safe con CanActivateFn
 */
export const authGuard: CanActivateFn = (
  route: ActivatedRouteSnapshot,
  state: RouterStateSnapshot
): boolean => {
  const authService = inject(AuthService);
  const router = inject(Router);
  const notificationStream = inject(NotificationStreamService);

  // Verificar si el usuario está autenticado
  if (authService.isAuthenticated()) {
    return true; // ✅ Permitir acceso
  }

  // ❌ No autenticado - bloquear acceso
  notificationStream.warning(
    'Acceso restringido',
    'Debes iniciar sesión para acceder a esta página'
  );

  // Guardar URL original para redirigir después del login
  // Ejemplo: /profile -> home?returnUrl=/profile
  router.navigate(['/'], {
    queryParams: { returnUrl: state.url }
  });

  return false;
};


/**
 * Admin Guard - Protección de rutas exclusivas para administradores
 *
 * PROPÓSITO:
 * - Proteger panel de administración
 * - Verificar rol de administrador
 * - Redirigir si no tiene permisos
 *
 * USO:
 * ```typescript
 * {
 *   path: 'admin',
 *   component: AdminComponent,
 *   canActivate: [authGuard, adminGuard] // ⚠️ Aplicar authGuard primero
 * }
 * ```
 *
 * FLUJO:
 * 1. authGuard ya verificó autenticación
 * 2. adminGuard verifica rol 'admin'
 * 3a. Si es admin: permite acceso
 * 3b. Si NO es admin: notifica y redirige a home
 */
export const adminGuard: CanActivateFn = (
  route: ActivatedRouteSnapshot,
  state: RouterStateSnapshot
): boolean => {
  const authService = inject(AuthService);
  const router = inject(Router);
  const notificationStream = inject(NotificationStreamService);

  const user = authService.getCurrentUser();

  // Verificar si el usuario tiene rol de administrador
  if (user && user.role === 'admin') {
    return true; // ✅ Es admin - permitir acceso
  }

  // ❌ No es admin - bloquear acceso
  notificationStream.error(
    'Acceso denegado',
    'No tienes permisos de administrador para acceder a esta sección'
  );

  router.navigate(['/']);
  return false;
};
