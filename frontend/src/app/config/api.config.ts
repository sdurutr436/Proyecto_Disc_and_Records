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
