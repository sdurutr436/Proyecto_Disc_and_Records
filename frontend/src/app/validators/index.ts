/**
 * Índice de Validadores Personalizados
 * 
 * Archivo centralizado para importar todos los validadores reutilizables
 * siguiendo el patrón de Angular Reactive Forms
 */

// Validadores de Campo Individual
export {
  passwordStrength,
  getPasswordErrorMessage
} from './password-strength.validator';

export {
  passwordMatch,
  getPasswordMatchErrorMessage
} from './password-match.validator';

export {
  nif,
  telefono,
  codigoPostal,
  getFormatErrorMessage
} from './spanish-formats.validator';

// Validadores Cross-Field
export {
  totalMinimo,
  edadMayor,
  atLeastOneRequired,
  validDateRange,
  getCrossFieldErrorMessage
} from './cross-field.validators';
