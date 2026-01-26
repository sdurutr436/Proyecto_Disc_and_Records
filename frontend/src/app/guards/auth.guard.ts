import { inject } from '@angular/core';
import { Router, CanActivateFn, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { AuthService } from '../services/auth';
import { NotificationStreamService } from '../services/notification-stream';

/**
 * Auth Init Guard - Bloquea activación de rutas hasta que restoreSession() termine
 *
 * PROPÓSITO:
 * - Prevenir race condition: evitar que componentes disparen peticiones HTTP
 *   antes de que se valide la sesión del usuario
 * - Esperar a que AuthService.restoreSession() termine (éxito o fallo)
 * - Si falla con 403, limpiar estado y permitir solo navegación pública
 *
 * USO EN RUTAS:
 * ```typescript
 * {
 *   path: '',
 *   component: Home,
 *   canActivate: [authInitGuard]  // Aplicar en ruta raíz
 * }
 * ```
 *
 * FLUJO:
 * 1. Usuario carga la aplicación
 * 2. Guard intercepta activación de ruta
 * 3. Espera (await) a que restoreSession() termine
 * 4a. Si hay sesión válida: permite activación (return true)
 * 4b. Si NO hay sesión (403/sin token): limpia estado, siempre permite navegación
 *     (la ruta ya está configurada como pública, no hace falta redirigir)
 * 5. Componente se monta solo DESPUÉS de que la validación haya terminado
 *
 * IMPORTANTE:
 * - NO redirige (siempre return true) porque la ruta raíz es pública
 * - Para rutas protegidas, usar authGuard (que sí redirige si no autenticado)
 * - Solo asegura que la validación de sesión termine ANTES del montaje del componente
 */
let authInitPromise: Promise<boolean> | null = null;

export const authInitGuard: CanActivateFn = async (
  route: ActivatedRouteSnapshot,
  state: RouterStateSnapshot
): Promise<boolean> => {
  const authService = inject(AuthService);

  // Ejecutar restoreSession() solo una vez (primera navegación)
  // Guardamos la promesa para reutilizarla en navegaciones subsiguientes
  if (!authInitPromise) {
    authInitPromise = authService.restoreSession();
  }

  // Esperar a que termine la restauración de sesión
  const sessionRestored = await authInitPromise;

  // Siempre permitir navegación (la validación ya terminó)
  // Si falló, el token ya está limpio y AppState refleja "sin sesión"
  // Si tuvo éxito, el usuario está autenticado y AppState tiene los datos
  return true;
};

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

  // Verificar si el usuario tiene rol de administrador o moderador
  if (user && (user.role === 'admin' || user.role === 'moderator')) {
    return true; // ✅ Es admin/moderator - permitir acceso
  }

  // ❌ No tiene permisos - bloquear acceso
  notificationStream.error(
    'Acceso denegado',
    'No tienes permisos para acceder a esta sección'
  );

  router.navigate(['/']);
  return false;
};
