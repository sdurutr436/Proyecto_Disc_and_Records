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
 * Configuración base de la API
 */
export const API_CONFIG = {
  /**
   * URL base del backend
   * Detecta automáticamente si está en Docker o desarrollo local
   *
   * LÓGICA:
   * - Si el host es 'localhost': usa 'http://localhost:8080/api' (desarrollo)
   * - Si el host es diferente: usa 'http://backend:8080/api' (Docker)
   * - En producción, puede sobrescribirse con variable de entorno
   */
  baseUrl: typeof window !== 'undefined' && window.location.hostname !== 'localhost' 
    ? 'http://backend:8080/api' 
    : 'http://localhost:8080/api',

  /**
   * Timeout para peticiones HTTP (ms)
   */
  timeout: 30000,

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
 * Facilita el mantenimiento y evita typos
 */
export const API_ENDPOINTS = {
  /**
   * Endpoints de autenticación
   */
  auth: {
    login: '/auth/login',
    logout: '/auth/logout',
    register: '/auth/register',
    refresh: '/auth/refresh',
    me: '/auth/me',
    forgotPassword: '/auth/forgot-password',
    resetPassword: '/auth/reset-password',
  },

  /**
   * Endpoints de usuarios
   */
  users: {
    getAll: '/users',
    getById: (id: string) => `/users/${id}`,
    create: '/users',
    update: (id: string) => `/users/${id}`,
    delete: (id: string) => `/users/${id}`,
    profile: '/users/profile',
    updateProfile: '/users/profile',
    changePassword: '/users/change-password',
  },

  /**
   * Endpoints de álbumes
   */
  albums: {
    getAll: '/albums',
    getById: (id: string) => `/albums/${id}`,
    create: '/albums',
    update: (id: string) => `/albums/${id}`,
    delete: (id: string) => `/albums/${id}`,
    search: '/albums/search',
    getTracks: (id: string) => `/albums/${id}/tracks`,
    getReviews: (id: string) => `/albums/${id}/reviews`,
    addReview: (id: string) => `/albums/${id}/reviews`,
  },

  /**
   * Endpoints de artistas
   */
  artists: {
    getAll: '/artists',
    getById: (id: string) => `/artists/${id}`,
    create: '/artists',
    update: (id: string) => `/artists/${id}`,
    delete: (id: string) => `/artists/${id}`,
    search: '/artists/search',
    getAlbums: (id: string) => `/artists/${id}/albums`,
  },

  /**
   * Endpoints de canciones
   */
  songs: {
    getAll: '/songs',
    getById: (id: string) => `/songs/${id}`,
    create: '/songs',
    update: (id: string) => `/songs/${id}`,
    delete: (id: string) => `/songs/${id}`,
    search: '/songs/search',
    getReviews: (id: string) => `/songs/${id}/reviews`,
    addReview: (id: string) => `/songs/${id}/reviews`,
  },

  /**
   * Endpoints de búsqueda global
   */
  search: {
    global: '/search',
    suggestions: '/search/suggestions',
  },

  /**
   * Endpoints de validaciones asíncronas
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
