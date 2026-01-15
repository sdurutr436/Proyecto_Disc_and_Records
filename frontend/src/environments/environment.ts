/**
 * Configuración de entorno de desarrollo
 *
 * ╔════════════════════════════════════════════════════════════════════════════╗
 * ║                        🎭 MODO MOCK / PRODUCCIÓN                           ║
 * ╠════════════════════════════════════════════════════════════════════════════╣
 * ║  Para cambiar entre datos mock y backend real, modifica useMockData:       ║
 * ║                                                                            ║
 * ║    useMockData: true   → Datos mock (sin backend, desarrollo UI/UX)       ║
 * ║    useMockData: false  → Backend real + Deezer API                        ║
 * ║                                                                            ║
 * ╚════════════════════════════════════════════════════════════════════════════╝
 */
export const environment = {
  production: false,

  /**
   * 🎛️ INTERRUPTOR PRINCIPAL
   *
   * Activa/desactiva datos mock para desarrollo UI/UX
   *
   * @value true  - Usa datos estáticos (6 artistas, 12 álbumes, etc.)
   *                No requiere backend ni conexión a Deezer
   *
   * @value false - Usa el backend real y Deezer API
   *                Requiere que el servidor Spring Boot esté corriendo
   */
  useMockData: true
};
