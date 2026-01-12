/**
 * Utilidades del Proyecto
 *
 * Este módulo exporta todas las utilidades y helpers
 * para uso común en la aplicación.
 */

// Gestión de suscripciones y memoria
export {
  AutoUnsubscribe,
  untilDestroyed,
  debugSubscription,
  createDestroyHelper,
  useComponentLifecycle,
  AutoUnsubscribeDecorator
} from './subscription-utils';
