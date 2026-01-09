/**
 * Guards Index - Exportaciones centralizadas
 *
 * Facilita la importación de guards en app.routes.ts y otros módulos.
 *
 * USO:
 * ```typescript
 * import { authGuard, adminGuard, unsavedChangesGuard } from './guards';
 * ```
 */

export { authGuard, adminGuard } from './auth.guard';
export {
  unsavedChangesGuard,
  advancedUnsavedChangesGuard,
  type CanComponentDeactivate,
  type CanComponentDeactivateAdvanced
} from './unsaved-changes.guard';
