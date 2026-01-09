import { CanDeactivateFn } from '@angular/router';
import { inject } from '@angular/core';
import { NotificationStreamService } from '../services/notification-stream';

/**
 * Interfaz que deben implementar los componentes con formularios
 * para ser protegidos por unsavedChangesGuard
 *
 * IMPLEMENTACIÓN EN COMPONENTE:
 * ```typescript
 * export class SettingsProfileComponent implements CanComponentDeactivate {
 *   profileForm = new FormGroup({...});
 *
 *   canDeactivate(): boolean | Promise<boolean> {
 *     // Si el formulario no está sucio, permitir navegación
 *     if (!this.profileForm.dirty) {
 *       return true;
 *     }
 *
 *     // Si está sucio, pedir confirmación
 *     return confirm('¿Deseas salir sin guardar los cambios?');
 *   }
 * }
 * ```
 */
export interface CanComponentDeactivate {
  canDeactivate: () => boolean | Promise<boolean>;
}

/**
 * Unsaved Changes Guard - Previene pérdida de datos en formularios
 *
 * PROPÓSITO:
 * - Detectar cuando un formulario tiene cambios sin guardar
 * - Pedir confirmación antes de abandonar la página
 * - Evitar pérdida accidental de datos del usuario
 *
 * USO EN RUTAS:
 * ```typescript
 * {
 *   path: 'settings/profile',
 *   component: SettingsProfileComponent,
 *   canDeactivate: [unsavedChangesGuard]
 * }
 * ```
 *
 * FLUJO:
 * 1. Usuario edita formulario
 * 2. Usuario intenta navegar a otra página
 * 3. Guard pregunta al componente: ¿tienes cambios sin guardar?
 * 4a. Si NO hay cambios: permite navegación
 * 4b. Si HAY cambios:
 *     - Muestra confirmación al usuario
 *     - Si acepta: permite navegación (datos se pierden)
 *     - Si cancela: permanece en la página
 *
 * VARIANTES DE IMPLEMENTACIÓN:
 *
 * 1. Simple (confirm nativo):
 * ```typescript
 * canDeactivate(): boolean {
 *   if (this.form.dirty) {
 *     return confirm('¿Salir sin guardar?');
 *   }
 *   return true;
 * }
 * ```
 *
 * 2. Modal personalizado:
 * ```typescript
 * async canDeactivate(): Promise<boolean> {
 *   if (!this.form.dirty) return true;
 *
 *   const modal = this.modalService.open(ConfirmModal, {
 *     title: 'Cambios sin guardar',
 *     message: '¿Deseas salir sin guardar?'
 *   });
 *
 *   return await modal.result;
 * }
 * ```
 *
 * 3. Con auto-guardado:
 * ```typescript
 * async canDeactivate(): Promise<boolean> {
 *   if (!this.form.dirty) return true;
 *
 *   const result = confirm('¿Guardar cambios antes de salir?');
 *   if (result) {
 *     await this.save();
 *   }
 *   return true;
 * }
 * ```
 *
 * MEJORES PRÁCTICAS:
 * - ✅ Usar form.dirty para detectar cambios
 * - ✅ Resetear form.dirty después de guardar exitosamente
 * - ✅ Mostrar mensaje claro al usuario
 * - ✅ Considerar UX: no abusar de confirmaciones
 * - ⚠️ El navegador también muestra confirmación al cerrar tab (beforeunload)
 */
export const unsavedChangesGuard: CanDeactivateFn<CanComponentDeactivate> = (
  component: CanComponentDeactivate
): boolean | Promise<boolean> => {
  // Si el componente no implementa canDeactivate, permitir navegación
  if (!component.canDeactivate) {
    return true;
  }

  // Delegar decisión al componente
  return component.canDeactivate();
};


/**
 * Advanced Unsaved Changes Guard - Con notificación personalizada
 *
 * Esta versión es más sofisticada y muestra notificaciones
 * en lugar de usar confirm() nativo.
 *
 * USO:
 * ```typescript
 * {
 *   path: 'settings/profile',
 *   component: SettingsProfileComponent,
 *   canDeactivate: [advancedUnsavedChangesGuard]
 * }
 * ```
 *
 * REQUIERE que el componente implemente:
 * ```typescript
 * interface CanComponentDeactivateAdvanced {
 *   hasUnsavedChanges(): boolean;
 *   getSaveConfirmMessage?(): string;
 * }
 * ```
 */
export interface CanComponentDeactivateAdvanced {
  hasUnsavedChanges(): boolean;
  getSaveConfirmMessage?(): string;
}

export const advancedUnsavedChangesGuard: CanDeactivateFn<CanComponentDeactivateAdvanced> = (
  component: CanComponentDeactivateAdvanced
): boolean | Promise<boolean> => {
  // Si no hay cambios, permitir navegación
  if (!component.hasUnsavedChanges || !component.hasUnsavedChanges()) {
    return true;
  }

  // Obtener mensaje personalizado o usar default
  const message = component.getSaveConfirmMessage
    ? component.getSaveConfirmMessage()
    : '¿Deseas salir sin guardar los cambios realizados? Los cambios se perderán.';

  // Mostrar confirmación nativa
  return confirm(message);
};
