/**
 * Configuración centralizada de API y endpoints
 *
 * PROPÓSITO:
 * - Centralizar todas las URLs de la API
 * - Facilitar cambio entre entornos (dev, staging, prod)
 * - Evitar URLs hardcodeadas en servicios
 * - Configuración global de timeouts y retry
 *
 * USO:
 * ```typescript
 * constructor(private http: HttpClient) {}
 *
 * getAlbums() {
 *   return this.http.get(`${API_CONFIG.baseUrl}${API_ENDPOINTS.albums.getAll}`);
 * }
 * ```
 */

/**
 * Determina la URL base del backend según el entorno
 */
function getBaseUrl(): string {
  if (typeof window === 'undefined') {
    return '/api'; // SSR fallback
  }

  const hostname = window.location.hostname;
  const port = window.location.port;

  // Desarrollo local con ng serve (puerto 4200)
  if (port === '4200') {
    return 'http://localhost:8080/api';
  }

  // Docker local (localhost puerto 80) - usa el backend en puerto 8080
  if (hostname === 'localhost' || hostname === '127.0.0.1') {
    return 'http://localhost:8080/api';
  }

  // DigitalOcean producción - usa la URL del backend de DigitalOcean
  if (hostname.includes('ondigitalocean.app')) {
    return 'https://discs-n-records-ksgvk.ondigitalocean.app/api';
  }

  // Fallback: mismo origen con /api
  return '/api';
}

/**
 * Configuración base de la API
 */
export const API_CONFIG = {
  /**
   * URL base del backend
   * Detecta automáticamente el entorno:
   * - localhost:4200 (ng serve): http://localhost:8080/api
   * - localhost:80 (Docker): http://localhost:8080/api
   * - DigitalOcean: https://discs-n-records-ksgvk.ondigitalocean.app/api
   */
  baseUrl: getBaseUrl(),

  /**
   * Timeout para peticiones HTTP (ms)
   * Reducido a 20s: mejor fallar rápido y mostrar error que esperar mucho
   */
  timeout: 20000,

  /**
   * Número de reintentos para peticiones fallidas
   */
  maxRetries: 2,

  /**
   * Delay entre reintentos (ms)
   */
  retryDelay: 1000,

  /**
   * Versión de la API
   */
  apiVersion: 'v1',
} as const;

/**
 * Endpoints organizados por recursos
 *
 * IMPORTANTE: Estos endpoints corresponden EXACTAMENTE a los
 * controladores del backend Spring Boot:
 * - AlbumController: /api/albumes
 * - ArtistaController: /api/artistas
 * - CancionController: /api/canciones
 * - ResenaController: /api/resenas
 * - AuthController: /api/auth
 * - UsuarioController: /api/usuarios
 * - GeneroController: /api/generos
 */
export const API_ENDPOINTS = {
  /**
   * Endpoints de autenticación
   * Controller: AuthController
   */
  auth: {
    login: '/auth/login',
    register: '/auth/register',
    me: '/auth/me', // Endpoint para obtener usuario actual (requiere token)
    forgotPassword: '/auth/forgot-password', // TODO: Implementar en backend
  },

  /**
   * Endpoints de usuarios
   * Controller: UsuarioController
   */
  usuarios: {
    getAll: '/usuarios',
    getPaginado: '/usuarios/paginado',
    getById: (id: number) => `/usuarios/${id}`,
    create: '/usuarios',
    update: (id: number) => `/usuarios/${id}`,
    delete: (id: number) => `/usuarios/${id}`,
    getEstadisticas: (id: number) => `/usuarios/${id}/estadisticas`,
  },

  /**
   * Endpoints de álbumes
   * Controller: AlbumController
   */
  albumes: {
    getAll: '/albumes',
    getPaginado: '/albumes/paginado',
    getById: (id: number) => `/albumes/${id}`,
    create: '/albumes',
    update: (id: number) => `/albumes/${id}`,
    delete: (id: number) => `/albumes/${id}`,
    buscar: '/albumes/buscar', // ?titulo=xxx
    getByArtista: (artistaId: number) => `/albumes/artista/${artistaId}`,
  },

  /**
   * Endpoints de artistas
   * Controller: ArtistaController
   */
  artistas: {
    getAll: '/artistas',
    getPaginado: '/artistas/paginado',
    getById: (id: number) => `/artistas/${id}`,
    create: '/artistas',
    update: (id: number) => `/artistas/${id}`,
    delete: (id: number) => `/artistas/${id}`,
    buscar: '/artistas/buscar', // ?nombre=xxx
    getAlbumes: (id: number) => `/artistas/${id}/albumes`,
    getCanciones: (id: number) => `/artistas/${id}/canciones`,
  },

  /**
   * Endpoints de canciones
   * Controller: CancionController
   */
  canciones: {
    getAll: '/canciones',
    getPaginado: '/canciones/paginado',
    getById: (id: number) => `/canciones/${id}`,
    create: '/canciones',
    update: (id: number) => `/canciones/${id}`,
    delete: (id: number) => `/canciones/${id}`,
    buscar: '/canciones/buscar', // ?titulo=xxx
    getByArtista: (artistaId: number) => `/canciones/artista/${artistaId}`,
  },

  /**
   * Endpoints de reseñas
   * Controller: ResenaController
   */
  resenas: {
    // Reseñas de álbumes
    albumesByAlbum: (albumId: number) => `/resenas/albumes/${albumId}`,
    albumesByUsuario: (usuarioId: number) => `/resenas/albumes/usuario/${usuarioId}`,
    albumGetOne: (albumId: number, usuarioId: number) => `/resenas/albumes/${albumId}/usuario/${usuarioId}`,
    albumCreate: '/resenas/albumes',
    albumUpdate: (albumId: number, usuarioId: number) => `/resenas/albumes/${albumId}/usuario/${usuarioId}`,
    albumDelete: (albumId: number, usuarioId: number) => `/resenas/albumes/${albumId}/usuario/${usuarioId}`,

    // Reseñas de canciones
    cancionesByCancion: (cancionId: number) => `/resenas/canciones/${cancionId}`,
    cancionesByUsuario: (usuarioId: number) => `/resenas/canciones/usuario/${usuarioId}`,
    cancionGetOne: (cancionId: number, usuarioId: number) => `/resenas/canciones/${cancionId}/usuario/${usuarioId}`,
    cancionCreate: '/resenas/canciones',
    cancionUpdate: (cancionId: number, usuarioId: number) => `/resenas/canciones/${cancionId}/usuario/${usuarioId}`,
    cancionDelete: (cancionId: number, usuarioId: number) => `/resenas/canciones/${cancionId}/usuario/${usuarioId}`,
  },

  /**
   * Endpoints de géneros
   * Controller: GeneroController
   */
  generos: {
    getAll: '/generos',
    getById: (id: number) => `/generos/${id}`,
    create: '/generos',
    update: (id: number) => `/generos/${id}`,
    delete: (id: number) => `/generos/${id}`,
  },

  // ==========================================================================
  // ENDPOINTS LEGACY (Mantener para retrocompatibilidad durante migración)
  // TODO: Eliminar después de migrar todos los componentes
  // ==========================================================================

  /** @deprecated Usar 'albumes' */
  albums: {
    getAll: '/albumes',
    getById: (id: string) => `/albumes/${id}`,
    create: '/albumes',
    update: (id: string) => `/albumes/${id}`,
    delete: (id: string) => `/albumes/${id}`,
    search: '/albumes/buscar',
    getTracks: (id: string) => `/albumes/${id}/tracks`,
    getReviews: (id: string) => `/resenas/albumes/${id}`,
    addReview: (id: string) => `/resenas/albumes`,
  },

  /** @deprecated Usar 'artistas' */
  artists: {
    getAll: '/artistas',
    getById: (id: string) => `/artistas/${id}`,
    create: '/artistas',
    update: (id: string) => `/artistas/${id}`,
    delete: (id: string) => `/artistas/${id}`,
    search: '/artistas/buscar',
    getAlbums: (id: string) => `/artistas/${id}/albumes`,
  },

  /** @deprecated Usar 'canciones' */
  songs: {
    getAll: '/canciones',
    getById: (id: string) => `/canciones/${id}`,
    create: '/canciones',
    update: (id: string) => `/canciones/${id}`,
    delete: (id: string) => `/canciones/${id}`,
    search: '/canciones/buscar',
    getReviews: (id: string) => `/resenas/canciones/${id}`,
    addReview: (id: string) => `/resenas/canciones`,
  },

  /** @deprecated Usar 'usuarios' */
  users: {
    getAll: '/usuarios',
    getById: (id: string) => `/usuarios/${id}`,
    create: '/usuarios',
    update: (id: string) => `/usuarios/${id}`,
    delete: (id: string) => `/usuarios/${id}`,
    profile: '/usuarios/profile',
    updateProfile: '/usuarios/profile',
    changePassword: '/usuarios/change-password',
  },

  /**
   * Endpoints de búsqueda global
   * TODO: Implementar en backend si se necesita
   */
  search: {
    global: '/search',
    suggestions: '/search/suggestions',
  },

  /**
   * Endpoints de validaciones asíncronas
   * TODO: Implementar en backend si se necesita
   */
  validation: {
    emailExists: '/validation/email',
    usernameExists: '/validation/username',
  },
} as const;

/**
 * Headers comunes de la aplicación
 */
export const API_HEADERS = {
  contentType: 'Content-Type',
  authorization: 'Authorization',
  accept: 'Accept',
  xRequestId: 'X-Request-ID',
} as const;

/**
 * Claves de localStorage para tokens y datos
 */
export const STORAGE_KEYS = {
  authToken: 'disc_and_records_token',
  refreshToken: 'disc_and_records_refresh_token',
  user: 'disc_and_records_user',
} as const;
