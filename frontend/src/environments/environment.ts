/**
 * Configuración de entorno de desarrollo
 *
 * USE_MOCK_DATA: Activa datos mock para desarrollo UI/UX sin backend
 */
export const environment = {
  production: false,

  /**
   * Activa datos mock para desarrollo UI/UX
   * - true: Usa datos estáticos sin llamar al backend ni Deezer
   * - false: Usa el backend real y Deezer API
   */
  useMockData: true
};
