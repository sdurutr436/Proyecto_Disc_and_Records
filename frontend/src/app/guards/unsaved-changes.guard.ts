import { CanDeactivateFn } from '@angular/router';

/**
 * Interfaz para componentes que pueden tener cambios sin guardar
 */
export interface CanComponentDeactivate {
  canDeactivate: () => boolean;
}

/**
 * UnsavedChangesGuard - Guard para prevenir navegación con cambios sin guardar
 *
 * PROPÓSITO:
 * - Prevenir que el usuario abandone una página con cambios sin guardar
 * - Mostrar confirmación antes de permitir la navegación
 * - Evitar pérdida de datos accidental
 *
 * FLUJO:
 * 1. Usuario intenta navegar fuera de la página
 * 2. Guard llama al método canDeactivate() del componente
 * 3. Si devuelve false, se muestra confirmación
 * 4. Usuario decide si continuar o cancelar
 *
 * USO EN COMPONENTE:
 * ```typescript
 * export class AlbumFormComponent implements CanComponentDeactivate {
 *   hasUnsavedChanges = signal(false);
 *
 *   canDeactivate(): boolean {
 *     if (this.hasUnsavedChanges()) {
 *       return confirm('¿Quieres salir sin guardar?');
 *     }
 *     return true;
 *   }
 * }
 * ```
 *
 * USO EN RUTA:
 * ```typescript
 * {
 *   path: 'albums/new',
 *   component: AlbumFormComponent,
 *   canDeactivate: [unsavedChangesGuard]
 * }
 * ```
 *
 * VENTAJAS:
 * - Mejora UX evitando pérdida de datos
 * - Lógica reutilizable para múltiples formularios
 * - Integración con navegación del navegador (back button)
 *
 * CONSIDERACIONES:
 * - El diálogo de confirmación es bloqueante
 * - No funciona si el usuario cierra la pestaña/navegador
 * - Para esos casos, usar el evento beforeunload del navegador
 */
export const unsavedChangesGuard: CanDeactivateFn<CanComponentDeactivate> = (component) => {
  // Si el componente implementa canDeactivate, usarlo
  if (component.canDeactivate) {
    const canLeave = component.canDeactivate();

    if (!canLeave) {
      console.warn('[UnsavedChangesGuard] Navegación bloqueada. El usuario tiene cambios sin guardar.');
    } else {
      console.log('[UnsavedChangesGuard] Navegación permitida. No hay cambios sin guardar.');
    }

    return canLeave;
  }

  // Si el componente no implementa canDeactivate, permitir navegación
  return true;
};
