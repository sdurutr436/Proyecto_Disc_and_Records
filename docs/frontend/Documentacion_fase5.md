# Fase 5 - Comunicación HTTP y Servicios (Frontend)

> **Proyecto:** Discs & Records  
> **Tipo:** Aplicación web estilo Letterboxd para música  
> **Fecha:** 12 de enero de 2026

---

## Índice

1. [Configuración de HttpClient](#1-configuración-de-httpclient)
2. [Servicio Base HTTP](#2-servicio-base-http)
3. [Interceptores HTTP](#3-interceptores-http)
4. [Operaciones CRUD Completas](#4-operaciones-crud-completas)
5. [Manejo de Respuestas](#5-manejo-de-respuestas)
6. [Estados de Carga y Error](#6-estados-de-carga-y-error)
7. [Catálogo de Endpoints](#7-catálogo-de-endpoints)
8. [Modelos e Interfaces](#8-modelos-e-interfaces)
9. [Estrategia de Manejo de Errores](#9-estrategia-de-manejo-de-errores)
10. [Buenas Prácticas](#10-buenas-prácticas)

---

## 1. Configuración de HttpClient

### 1.1 Configuración en app.config.ts

**Ubicación:** `frontend/src/app/app.config.ts`

Angular 17+ utiliza `provideHttpClient()` con interceptores funcionales en lugar del módulo `HttpClientModule`.

```typescript
import { ApplicationConfig } from '@angular/core';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import {
  headersInterceptor,
  authInterceptor,
  loggingInterceptor,
  errorInterceptor
} from './interceptors';

export const appConfig: ApplicationConfig = {
  providers: [
    // Configuración de HttpClient con interceptores
    provideHttpClient(
      withInterceptors([
        headersInterceptor,   // 1️⃣ Headers comunes
        authInterceptor,      // 2️⃣ Autenticación
        loggingInterceptor,   // 3️⃣ Logging (desarrollo)
        errorInterceptor      // 4️⃣ Manejo de errores (último)
      ])
    )
  ]
};
```

### 1.2 Orden de Interceptores

El orden de los interceptores es **crítico**:

```
Petición Saliente →
  1. headersInterceptor   (añade Content-Type, Accept, X-Request-ID)
  2. authInterceptor      (añade Bearer token)
  3. loggingInterceptor   (registra petición en console)
  4. errorInterceptor     (captura errores al volver)
← Respuesta/Error
```

| Orden | Interceptor | Propósito |
|-------|-------------|-----------|
| 1º | `headersInterceptor` | Añadir headers antes que otros los vean |
| 2º | `authInterceptor` | Añadir token después de headers base |
| 3º | `loggingInterceptor` | Registrar petición completa |
| 4º | `errorInterceptor` | Capturar TODOS los errores (último) |

---

## 2. Servicio Base HTTP

### 2.1 Arquitectura BaseHttpService

**Ubicación:** `frontend/src/app/services/base-http.service.ts`

El patrón **herencia** permite que todos los servicios HTTP compartan lógica común:

```
┌─────────────────────────────────────────────────────────────────┐
│                    BaseHttpService                               │
│  - buildUrl()                                                    │
│  - get<T>(), post<T>(), put<T>(), patch<T>(), delete<T>()       │
│  - handleError(), shouldRetry()                                  │
│  - timeout, retry logic                                          │
└──────────────────────────┬──────────────────────────────────────┘
                           │ extends
           ┌───────────────┼───────────────┐
           ↓               ↓               ↓
    ┌─────────────┐ ┌─────────────┐ ┌─────────────┐
    │AlbumService │ │ArtistService│ │ SongService │
    └─────────────┘ └─────────────┘ └─────────────┘
```

### 2.2 Implementación de BaseHttpService

```typescript
// frontend/src/app/services/base-http.service.ts

export abstract class BaseHttpService {
  protected http = inject(HttpClient);
  protected baseUrl = API_CONFIG.baseUrl;

  /**
   * Construye la URL completa para una petición
   */
  protected buildUrl(endpoint: string): string {
    if (endpoint.startsWith('http://') || endpoint.startsWith('https://')) {
      return endpoint;
    }
    const normalizedEndpoint = endpoint.startsWith('/') ? endpoint : `/${endpoint}`;
    return `${this.baseUrl}${normalizedEndpoint}`;
  }

  /**
   * GET - Obtener recursos
   */
  protected get<T>(endpoint: string, options?: HttpOptions): Observable<T> {
    const url = this.buildUrl(endpoint);

    return this.http.get<T>(url, options).pipe(
      timeout(API_CONFIG.timeout),           // ⏱️ Timeout configurable
      retry({
        count: API_CONFIG.maxRetries,
        delay: (error, retryCount) => {
          if (this.shouldRetry(error)) {
            console.warn(`Retrying (${retryCount}/${API_CONFIG.maxRetries}):`, url);
            return timer(API_CONFIG.retryDelay * retryCount);
          }
          return throwError(() => error);
        }
      }),
      catchError((error) => this.handleError(error, 'GET', url))
    );
  }

  /**
   * POST - Crear recursos
   */
  protected post<T>(endpoint: string, body: any, options?: HttpOptions): Observable<T> {
    const url = this.buildUrl(endpoint);
    return this.http.post<T>(url, body, options).pipe(
      timeout(API_CONFIG.timeout),
      catchError((error) => this.handleError(error, 'POST', url))
    );
  }

  /**
   * PUT - Actualizar recursos completos
   */
  protected put<T>(endpoint: string, body: any, options?: HttpOptions): Observable<T> {
    const url = this.buildUrl(endpoint);
    return this.http.put<T>(url, body, options).pipe(
      timeout(API_CONFIG.timeout),
      catchError((error) => this.handleError(error, 'PUT', url))
    );
  }

  /**
   * PATCH - Actualizar recursos parcialmente
   */
  protected patch<T>(endpoint: string, body: any, options?: HttpOptions): Observable<T> {
    const url = this.buildUrl(endpoint);
    return this.http.patch<T>(url, body, options).pipe(
      timeout(API_CONFIG.timeout),
      catchError((error) => this.handleError(error, 'PATCH', url))
    );
  }

  /**
   * DELETE - Eliminar recursos
   */
  protected delete<T>(endpoint: string, options?: HttpOptions): Observable<T> {
    const url = this.buildUrl(endpoint);
    return this.http.delete<T>(url, options).pipe(
      timeout(API_CONFIG.timeout),
      catchError((error) => this.handleError(error, 'DELETE', url))
    );
  }
}
```

### 2.3 Configuración de API

**Ubicación:** `frontend/src/app/config/api.config.ts`

```typescript
export const API_CONFIG = {
  /**
   * URL base del backend (auto-detecta entorno)
   * - localhost:4200 → http://localhost:8080/api
   * - DigitalOcean → https://discs-n-records-ksgvk.ondigitalocean.app/api
   */
  baseUrl: getBaseUrl(),

  /** Timeout para peticiones HTTP (ms) */
  timeout: 30000,

  /** Número de reintentos para peticiones fallidas */
  maxRetries: 2,

  /** Delay entre reintentos (ms) */
  retryDelay: 1000,

  /** Versión de la API */
  apiVersion: 'v1',
} as const;
```

---

## 3. Interceptores HTTP

### 3.1 Headers Interceptor

**Ubicación:** `frontend/src/app/interceptors/headers.interceptor.ts`

Añade headers comunes a TODAS las peticiones HTTP:

```typescript
export const headersInterceptor: HttpInterceptorFn = (req, next) => {
  const headers: Record<string, string> = {};

  // Content-Type: Solo si hay body y no es FormData
  if (req.body && !(req.body instanceof FormData)) {
    if (!req.headers.has('Content-Type')) {
      headers['Content-Type'] = 'application/json';
    }
  }

  // Accept: Indicar que esperamos JSON
  if (!req.headers.has('Accept')) {
    headers['Accept'] = 'application/json';
  }

  // X-Requested-With: Identificar peticiones AJAX
  headers['X-Requested-With'] = 'XMLHttpRequest';

  // X-Request-ID: Trazabilidad (relacionar logs frontend/backend)
  headers['X-Request-ID'] = generateRequestId();

  // X-App-Version: Versión de la aplicación
  headers['X-App-Version'] = getAppVersion();

  // Clonar petición con nuevos headers
  const modifiedReq = req.clone({ setHeaders: headers });
  return next(modifiedReq);
};
```

**Headers añadidos:**

| Header | Valor | Propósito |
|--------|-------|-----------|
| `Content-Type` | `application/json` | Formato del body (si no es FormData) |
| `Accept` | `application/json` | Formato esperado de respuesta |
| `X-Requested-With` | `XMLHttpRequest` | Identificar peticiones AJAX |
| `X-Request-ID` | `timestamp-random` | Trazabilidad en logs |
| `X-App-Version` | `1.0.0` | Versión del cliente |

### 3.2 Auth Interceptor

**Ubicación:** `frontend/src/app/interceptors/auth.interceptor.ts`

Añade automáticamente el token JWT a las peticiones:

```typescript
export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const appState = inject(AppStateService);
  const currentUser = appState.currentUser();

  // Obtener token del usuario o de localStorage
  let token = currentUser?.token;

  if (!token) {
    try {
      token = localStorage.getItem(STORAGE_KEYS.authToken) || undefined;
    } catch (e) {
      console.warn('Error accediendo a localStorage:', e);
    }
  }

  // Sin token, continuar sin modificar
  if (!token) {
    return next(req);
  }

  // Clonar petición con header Authorization
  const authReq = req.clone({
    setHeaders: {
      Authorization: `Bearer ${token}`
    }
  });

  return next(authReq);
};
```

**Flujo de autenticación:**

```
┌─────────────┐     ┌────────────────┐     ┌─────────────┐
│  Petición   │ ──▶ │ authInterceptor│ ──▶ │   Backend   │
│ (sin token) │     │ añade Bearer   │     │ verifica JWT│
└─────────────┘     └────────────────┘     └─────────────┘
```

### 3.3 Logging Interceptor

**Ubicación:** `frontend/src/app/interceptors/logging.interceptor.ts`

Registra todas las peticiones y respuestas para debugging:

```typescript
export const loggingInterceptor: HttpInterceptorFn = (req, next) => {
  // Solo en desarrollo
  if (isProduction()) {
    return next(req);
  }

  const startTime = Date.now();
  const method = req.method;
  const url = req.urlWithParams;

  // Log de petición saliente
  console.group(`🚀 ${method} ${url}`);
  console.log('📤 Request:', {
    method,
    url: req.url,
    params: serializeParams(req),
    headers: getRelevantHeaders(req),
    body: req.body || null,
    timestamp: new Date().toISOString()
  });
  console.groupEnd();

  // Observar respuesta
  return next(req).pipe(
    tap({
      next: (event) => {
        if (event instanceof HttpResponse) {
          const elapsedTime = Date.now() - startTime;
          console.group(`✅ ${event.status} ${method} ${url}`);
          console.log('📥 Response:', {
            status: `${event.status} ${event.statusText}`,
            time: `${elapsedTime}ms`,
            body: event.body
          });
          console.groupEnd();
        }
      },
      error: (error) => {
        const elapsedTime = Date.now() - startTime;
        console.group(`❌ ${error.status} ${method} ${url}`);
        console.error('📥 Error:', {
          status: error.status,
          time: `${elapsedTime}ms`,
          message: error.message
        });
        console.groupEnd();
      }
    })
  );
};
```

**Información registrada:**

| Tipo | Datos |
|------|-------|
| **Request** | Método, URL, params, headers, body, timestamp |
| **Response** | Status, tiempo de respuesta, body |
| **Error** | Status, tiempo, mensaje de error |

### 3.4 Error Interceptor

**Ubicación:** `frontend/src/app/interceptors/error.interceptor.ts`

Manejo centralizado de TODOS los errores HTTP:

```typescript
export const errorInterceptor: HttpInterceptorFn = (req, next) => {
  const router = inject(Router);
  const notificationStream = inject(NotificationStreamService);
  const eventBus = inject(EventBusService);
  const appState = inject(AppStateService);

  return next(req).pipe(
    catchError((error: HttpErrorResponse) => {
      // Log del error
      console.error('❌ HTTP Error:', {
        status: error.status,
        url: error.url,
        message: error.message
      });

      // Manejar según código de estado
      handleErrorByStatus(error, router, notificationStream, eventBus, appState);

      // Re-lanzar para que servicios puedan manejarlo también
      return throwError(() => error);
    })
  );
};
```

**Manejo por código de estado:**

| Status | Acción | Mensaje |
|--------|--------|---------|
| `0` | Notificación | "No se puede conectar con el servidor" |
| `400` | Notificación | Mensaje del backend o genérico |
| `401` | Logout + Redirect | "Tu sesión ha expirado" |
| `403` | Notificación | "No tienes permisos" |
| `404` | Notificación | "Recurso no encontrado" |
| `409` | Notificación | "El recurso ya existe" |
| `422` | Notificación | "Datos de validación incorrectos" |
| `429` | Notificación | "Demasiadas peticiones" |
| `500` | Notificación | "Error interno del servidor" |
| `502` | Notificación | "Servidor no disponible" |
| `503` | Notificación | "Servicio no disponible" |

---

## 4. Operaciones CRUD Completas

### 4.1 GET - Obtener Recursos

**Listado con paginación:**

```typescript
// AlbumService
getAllAlbums(page: number = 0, size: number = 12): Observable<PageResponse<Album>> {
  return this.get<PageResponse<AlbumResponse>>(API_ENDPOINTS.albumes.getPaginado, {
    params: { page, size, sortBy: 'id', sortDir: 'asc' }
  }).pipe(
    map(response => ({
      ...response,
      content: response.content.map(a => this.mapToFrontend(a))
    }))
  );
}
```

**Obtener por ID:**

```typescript
getAlbumById(id: string): Observable<Album | null> {
  return this.get<AlbumResponse>(API_ENDPOINTS.albumes.getById(parseInt(id))).pipe(
    map(response => this.mapToFrontend(response)),
    catchError(error => {
      if (error.status === 404) return of(null);
      return throwError(() => error);
    })
  );
}
```

**Búsqueda con query params:**

```typescript
searchAlbums(query: string): Observable<Album[]> {
  return this.get<AlbumResponse[]>(API_ENDPOINTS.albumes.buscar, {
    params: { titulo: query }
  }).pipe(
    map(albums => albums.map(a => this.mapToFrontend(a)))
  );
}
```

### 4.2 POST - Crear Recursos

```typescript
createAlbum(albumData: CreateAlbumDTO): Observable<Album> {
  return this.post<AlbumResponse>(API_ENDPOINTS.albumes.create, albumData).pipe(
    map(response => this.mapToFrontend(response)),
    tap(album => {
      this.notificationStream.success('Álbum creado', `"${album.title}" añadido`);
    })
  );
}
```

### 4.3 PUT - Actualizar Completo

```typescript
updateAlbum(id: number, albumData: CreateAlbumDTO): Observable<Album> {
  return this.put<AlbumResponse>(API_ENDPOINTS.albumes.update(id), albumData).pipe(
    map(response => this.mapToFrontend(response)),
    tap(album => {
      this.notificationStream.success('Álbum actualizado', `"${album.title}" modificado`);
    })
  );
}
```

### 4.4 PATCH - Actualizar Parcialmente

```typescript
patchReview(albumId: number, userId: number, updates: UpdateResenaDTO): Observable<Review> {
  return this.patch<ResenaAlbumResponse>(
    API_ENDPOINTS.resenas.albumUpdate(albumId, userId),
    updates
  ).pipe(
    map(response => mapResenaToLegacy(response))
  );
}
```

### 4.5 DELETE - Eliminar Recursos

```typescript
deleteAlbum(id: number): Observable<void> {
  return this.delete<void>(API_ENDPOINTS.albumes.delete(id)).pipe(
    tap(() => {
      this.notificationStream.success('Álbum eliminado', 'El álbum ha sido eliminado');
    })
  );
}
```

### 4.6 FormData para Upload de Archivos

```typescript
uploadAvatar(file: File): Observable<{ url: string }> {
  const formData = new FormData();
  formData.append('avatar', file);

  // NO añadir Content-Type - el browser lo gestiona con boundary
  return this.http.post<{ url: string }>(`${this.baseUrl}/usuarios/avatar`, formData);
}
```

---

## 5. Manejo de Respuestas

### 5.1 Tipado con Interfaces TypeScript

```typescript
// Respuesta del backend (DTO exacto)
export interface AlbumResponse {
  id: number;
  tituloAlbum: string;
  anioSalida: number;
  portadaUrl: string | null;
  puntuacionMedia: number | null;
  artista: ArtistaResponse;
}

// Modelo del frontend
export interface Album {
  id: string;
  title: string;
  artist: string;
  artistId: string;
  coverUrl: string;
  releaseYear: number;
  averageRating: number;
}
```

### 5.2 Transformación con map()

```typescript
private mapToFrontend(backend: AlbumResponse): Album {
  return {
    id: String(backend.id),
    title: backend.tituloAlbum,
    artist: backend.artista?.nombreArtista || 'Desconocido',
    artistId: String(backend.artista?.id || 0),
    coverUrl: backend.portadaUrl || 'https://placeholder.com/400',
    releaseYear: backend.anioSalida,
    averageRating: backend.puntuacionMedia ?? 0,
  };
}
```

### 5.3 Manejo de Errores con catchError

```typescript
getAlbumById(id: string): Observable<Album | null> {
  return this.get<AlbumResponse>(API_ENDPOINTS.albumes.getById(parseInt(id))).pipe(
    map(response => this.mapToFrontend(response)),
    catchError((error: HttpErrorResponse) => {
      if (error.status === 404) {
        // 404 es esperado, devolver null
        return of(null);
      }
      // Otros errores, re-lanzar
      console.error('Error obteniendo álbum:', error);
      return throwError(() => error);
    })
  );
}
```

### 5.4 Retry Logic para Peticiones Fallidas

```typescript
// En BaseHttpService
protected get<T>(endpoint: string, options?: HttpOptions): Observable<T> {
  return this.http.get<T>(url, options).pipe(
    timeout(API_CONFIG.timeout),
    retry({
      count: API_CONFIG.maxRetries,   // 2 reintentos
      delay: (error, retryCount) => {
        // Solo reintentar en errores recuperables
        if (this.shouldRetry(error)) {
          console.warn(`Retry ${retryCount}/${API_CONFIG.maxRetries}`);
          return timer(API_CONFIG.retryDelay * retryCount); // Delay exponencial
        }
        return throwError(() => error);
      }
    }),
    catchError((error) => this.handleError(error, 'GET', url))
  );
}

private shouldRetry(error: HttpErrorResponse): boolean {
  // Reintentar solo en:
  // - Error de red (status 0)
  // - Errores del servidor (5xx)
  return error.status === 0 || (error.status >= 500 && error.status < 600);
}
```

---

## 6. Estados de Carga y Error

### 6.1 LoadingService

**Ubicación:** `frontend/src/app/services/loading.ts`

```typescript
@Injectable({ providedIn: 'root' })
export class LoadingService {
  /** Contador de operaciones activas */
  private activeOperations = signal(0);

  /** Mensaje de carga actual */
  private loadingMessage = signal('Cargando...');

  /** Progreso actual (0-100, -1 = indeterminado) */
  private currentProgress = signal(-1);

  /** Signal computado: hay alguna operación activa */
  readonly isLoading = computed(() => this.activeOperations() > 0);

  /** Inicia una operación de carga */
  start(message: string = 'Cargando...'): void {
    this.activeOperations.update(count => count + 1);
    this.loadingMessage.set(message);
  }

  /** Detiene una operación de carga */
  stop(): void {
    this.activeOperations.update(count => Math.max(0, count - 1));
  }

  /** Establece progreso (para uploads) */
  setProgress(percent: number): void {
    this.currentProgress.set(Math.min(100, Math.max(0, percent)));
  }
}
```

**Uso en componentes:**

```typescript
@Component({
  template: `
    @if (loadingService.isLoading()) {
      <app-spinner [message]="loadingService.message()" />
    }
  `
})
export class MyComponent {
  loadingService = inject(LoadingService);

  async loadData(): Promise<void> {
    this.loadingService.start('Cargando álbumes...');
    try {
      const albums = await firstValueFrom(this.albumService.getAll());
      this.albums.set(albums);
    } finally {
      this.loadingService.stop();
    }
  }
}
```

### 6.2 NotificationStreamService

**Ubicación:** `frontend/src/app/services/notification-stream.ts`

Patrón **Observable/Subject** para notificaciones desacopladas:

```typescript
@Injectable({ providedIn: 'root' })
export class NotificationStreamService {
  private notificationSubject = new Subject<NotificationConfig>();
  notifications$ = this.notificationSubject.asObservable();

  /** Notificación de éxito */
  success(title: string, message: string, duration?: number): void {
    this.notify({ type: 'success', title, message, duration });
  }

  /** Notificación de error */
  error(title: string, message: string, duration?: number): void {
    this.notify({
      type: 'error',
      title,
      message,
      duration: duration ?? 8000  // Errores duran más
    });
  }

  /** Notificación de advertencia */
  warning(title: string, message: string, duration?: number): void {
    this.notify({ type: 'warning', title, message, duration });
  }

  /** Notificación informativa */
  info(title: string, message: string, duration?: number): void {
    this.notify({ type: 'info', title, message, duration });
  }
}
```

**Flujo de notificaciones:**

```
┌───────────────┐     ┌────────────────────────┐     ┌────────────────┐
│  Componente A │ ──▶ │ NotificationStreamSvc  │ ──▶ │ NotificationSvc│
│  notify()     │     │ Subject<Config>        │     │ createComponent│
└───────────────┘     └────────────────────────┘     └────────────────┘
                              │ Observable                  │
                              ↓                             ↓
                      ┌───────────────┐              ┌──────────────┐
                      │  Analytics    │              │  DOM Render  │
                      │  (suscriptor) │              │  (visual)    │
                      └───────────────┘              └──────────────┘
```

### 6.3 Empty State

```html
<!-- Cuando no hay datos -->
@if (albumState.isEmpty()) {
  <div class="empty-state">
    <svg class="empty-state__icon"><!-- icono --></svg>
    <h3>No hay álbumes</h3>
    <p>Aún no se han añadido álbumes a la colección</p>
    <button (click)="openCreateModal()">Añadir álbum</button>
  </div>
}
```

### 6.4 Success Feedback

```typescript
// Después de operación exitosa
createAlbum(data: CreateAlbumDTO): Observable<Album> {
  return this.post<AlbumResponse>(API_ENDPOINTS.albumes.create, data).pipe(
    map(response => this.mapToFrontend(response)),
    tap(album => {
      // Feedback visual inmediato
      this.notificationStream.success(
        'Álbum creado',
        `"${album.title}" se ha añadido correctamente`
      );

      // Actualizar lista local (optimistic update)
      this.albumState.addToList(album);
    })
  );
}
```

---

## 7. Catálogo de Endpoints

### 7.1 Endpoints de Autenticación

**Controller:** `AuthController`

| Método | Endpoint | Descripción | Auth |
|--------|----------|-------------|------|
| `POST` | `/auth/login` | Iniciar sesión | ❌ |
| `POST` | `/auth/register` | Registrar usuario | ❌ |
| `GET` | `/auth/me` | Usuario actual | ✅ |

### 7.2 Endpoints de Álbumes

**Controller:** `AlbumController`

| Método | Endpoint | Descripción | Auth |
|--------|----------|-------------|------|
| `GET` | `/albumes` | Listar todos | ❌ |
| `GET` | `/albumes/paginado` | Listar paginado | ❌ |
| `GET` | `/albumes/{id}` | Obtener por ID | ❌ |
| `GET` | `/albumes/buscar?titulo=` | Buscar por título | ❌ |
| `GET` | `/albumes/artista/{id}` | Álbumes de artista | ❌ |
| `POST` | `/albumes` | Crear | ✅ ADMIN/MOD |
| `PUT` | `/albumes/{id}` | Actualizar | ✅ ADMIN/MOD |
| `DELETE` | `/albumes/{id}` | Eliminar | ✅ ADMIN |

### 7.3 Endpoints de Artistas

**Controller:** `ArtistaController`

| Método | Endpoint | Descripción | Auth |
|--------|----------|-------------|------|
| `GET` | `/artistas` | Listar todos | ❌ |
| `GET` | `/artistas/paginado` | Listar paginado | ❌ |
| `GET` | `/artistas/{id}` | Obtener por ID | ❌ |
| `GET` | `/artistas/buscar?nombre=` | Buscar por nombre | ❌ |
| `GET` | `/artistas/{id}/albumes` | Álbumes del artista | ❌ |
| `POST` | `/artistas` | Crear | ✅ ADMIN/MOD |
| `PUT` | `/artistas/{id}` | Actualizar | ✅ ADMIN/MOD |
| `DELETE` | `/artistas/{id}` | Eliminar | ✅ ADMIN |

### 7.4 Endpoints de Canciones

**Controller:** `CancionController`

| Método | Endpoint | Descripción | Auth |
|--------|----------|-------------|------|
| `GET` | `/canciones` | Listar todos | ❌ |
| `GET` | `/canciones/paginado` | Listar paginado | ❌ |
| `GET` | `/canciones/{id}` | Obtener por ID | ❌ |
| `GET` | `/canciones/buscar?titulo=` | Buscar | ❌ |
| `POST` | `/canciones` | Crear | ✅ ADMIN/MOD |
| `PUT` | `/canciones/{id}` | Actualizar | ✅ ADMIN/MOD |
| `DELETE` | `/canciones/{id}` | Eliminar | ✅ ADMIN |

### 7.5 Endpoints de Reseñas

**Controller:** `ResenaController`

| Método | Endpoint | Descripción | Auth |
|--------|----------|-------------|------|
| `GET` | `/resenas/albumes/{albumId}` | Reseñas de álbum | ❌ |
| `GET` | `/resenas/albumes/usuario/{userId}` | Reseñas del usuario | ❌ |
| `POST` | `/resenas/albumes` | Crear reseña | ✅ |
| `PUT` | `/resenas/albumes/{albumId}/usuario/{userId}` | Actualizar | ✅ Autor/Admin |
| `DELETE` | `/resenas/albumes/{albumId}/usuario/{userId}` | Eliminar | ✅ Autor/Admin |

### 7.6 Endpoints de Usuarios

**Controller:** `UsuarioController`

| Método | Endpoint | Descripción | Auth |
|--------|----------|-------------|------|
| `GET` | `/usuarios` | Listar todos | ✅ ADMIN |
| `GET` | `/usuarios/{id}` | Obtener por ID | ✅ |
| `GET` | `/usuarios/{id}/estadisticas` | Estadísticas | ✅ |
| `PUT` | `/usuarios/{id}` | Actualizar | ✅ Propio/Admin |
| `DELETE` | `/usuarios/{id}` | Eliminar | ✅ ADMIN |

---

## 8. Modelos e Interfaces

### 8.1 Modelos del Backend (DTOs)

```typescript
// frontend/src/app/models/data.models.ts

/** Respuesta de artista */
export interface ArtistaResponse {
  id: number;
  nombreArtista: string;
  puntuacionMedia: number | null;
}

/** Respuesta de álbum */
export interface AlbumResponse {
  id: number;
  tituloAlbum: string;
  anioSalida: number;
  portadaUrl: string | null;
  puntuacionMedia: number | null;
  artista: ArtistaResponse;
}

/** Respuesta de canción */
export interface CancionResponse {
  id: number;
  tituloCancion: string;
  anioSalida: number;
  puntuacionMedia: number | null;
  artista: ArtistaResponse;
}

/** Respuesta de reseña de álbum */
export interface ResenaAlbumResponse {
  usuarioId: number;
  nombreUsuario: string;
  avatarUsuario: string | null;
  albumId: number;
  tituloAlbum: string;
  portadaUrl: string | null;
  puntuacion: number;
  textoResena: string;
  fechaResena: string;
  escuchado: boolean;
}

/** Respuesta paginada */
export interface PageResponse<T> {
  content: T[];
  page: number;
  size: number;
  totalElements: number;
  totalPages: number;
  first: boolean;
  last: boolean;
}

/** Respuesta de autenticación */
export interface AuthResponse {
  token: string;
  tipo: string;
  id: number;
  nombreUsuario: string;
  mail: string;
  role: string;
}
```

### 8.2 DTOs para Crear/Actualizar

```typescript
/** DTO para crear álbum */
export interface CreateAlbumDTO {
  tituloAlbum: string;
  anioSalida: number;
  portadaUrl?: string;
  idArtista: number;
}

/** DTO para crear artista */
export interface CreateArtistaDTO {
  nombreArtista: string;
}

/** DTO para crear reseña */
export interface CreateResenaAlbumDTO {
  usuarioId: number;
  albumId: number;
  puntuacion: number;
  textoResena: string;
}

/** DTO para actualizar reseña */
export interface UpdateResenaDTO {
  puntuacion?: number;
  textoResena?: string;
}

/** DTO para login */
export interface LoginRequestDTO {
  mail: string;
  password: string;
}

/** DTO para registro */
export interface RegisterRequestDTO {
  nombreUsuario: string;
  mail: string;
  password: string;
}
```

### 8.3 Modelos del Frontend

```typescript
/** Modelo frontend de álbum */
export interface Album {
  id: string;
  title: string;
  artist: string;
  artistId: string;
  coverUrl: string;
  releaseYear: number;
  genre: string;
  tracks: number;
  duration: string;
  label: string;
  description: string;
  averageRating: number;
  totalReviews: number;
}

/** Modelo frontend de artista */
export interface Artist {
  id: string;
  name: string;
  bio: string;
  photoUrl: string;
  genre: string;
  activeYears: string;
  albums: number;
  monthlyListeners: number;
}

/** Modelo frontend de reseña */
export interface Review {
  id: string;
  userId: string;
  userName: string;
  userAvatar: string;
  rating: number;
  content: string;
  date: Date;
  likes: number;
}
```

### 8.4 Funciones de Mapeo

```typescript
/** Mapea respuesta backend a modelo frontend */
export function mapAlbumResponseToLegacy(response: AlbumResponse): Album {
  return {
    id: String(response.id),
    title: response.tituloAlbum,
    artist: response.artista?.nombreArtista || 'Desconocido',
    artistId: String(response.artista?.id || 0),
    coverUrl: response.portadaUrl || 'https://placeholder.com/400',
    releaseYear: response.anioSalida,
    genre: '',
    tracks: 0,
    duration: '',
    label: '',
    description: '',
    averageRating: response.puntuacionMedia ?? 0,
    totalReviews: 0
  };
}

export function mapResenaToLegacy(response: ResenaAlbumResponse): Review {
  return {
    id: `${response.albumId}-${response.usuarioId}`,
    userId: String(response.usuarioId),
    userName: response.nombreUsuario,
    userAvatar: response.avatarUsuario || 'https://placeholder.com/avatar',
    rating: response.puntuacion,
    content: response.textoResena,
    date: new Date(response.fechaResena),
    likes: 0
  };
}
```

---

## 9. Estrategia de Manejo de Errores

### 9.1 Niveles de Manejo de Errores

```
┌─────────────────────────────────────────────────────────────────┐
│ NIVEL 1: Interceptor (Global)                                   │
│ - 401: Logout automático + redirect a login                     │
│ - 5xx: Notificación genérica de error del servidor             │
│ - 0: Error de red - notificación de conexión                    │
└─────────────────────────────────────────────────────────────────┘
                              │
                              ↓
┌─────────────────────────────────────────────────────────────────┐
│ NIVEL 2: BaseHttpService                                        │
│ - Retry automático para errores recuperables                    │
│ - Timeout de peticiones                                         │
│ - Logging de errores                                            │
└─────────────────────────────────────────────────────────────────┘
                              │
                              ↓
┌─────────────────────────────────────────────────────────────────┐
│ NIVEL 3: Servicio específico                                    │
│ - 404: Retornar null en lugar de error                          │
│ - Transformar errores a formato específico                      │
│ - Fallback a datos mock si backend no disponible                │
└─────────────────────────────────────────────────────────────────┘
                              │
                              ↓
┌─────────────────────────────────────────────────────────────────┐
│ NIVEL 4: Componente                                             │
│ - Mostrar estado de error en UI                                 │
│ - Botón de reintentar                                           │
│ - Mensajes específicos del contexto                             │
└─────────────────────────────────────────────────────────────────┘
```

### 9.2 Patrones de Manejo

**Patrón 1: Fallback a null para 404**

```typescript
getById(id: string): Observable<Album | null> {
  return this.get<AlbumResponse>(endpoint).pipe(
    map(r => this.mapToFrontend(r)),
    catchError(error => {
      if (error.status === 404) return of(null);
      return throwError(() => error);
    })
  );
}
```

**Patrón 2: Fallback a mock data**

```typescript
getAllAlbums(): Observable<Album[]> {
  return this.get<AlbumResponse[]>(endpoint).pipe(
    map(albums => albums.map(a => this.mapToFrontend(a))),
    catchError(error => {
      console.warn('Backend no disponible, usando datos mock');
      return of(this.getMockAlbums());
    })
  );
}
```

**Patrón 3: Retry con backoff exponencial**

```typescript
retry({
  count: 3,
  delay: (error, retryCount) => {
    // 1s, 2s, 4s
    const delay = 1000 * Math.pow(2, retryCount - 1);
    return timer(delay);
  }
})
```

**Patrón 4: Error handling en componente**

```typescript
@Component({
  template: `
    @if (error()) {
      <div class="error-banner">
        <span>{{ error() }}</span>
        <button (click)="retry()">Reintentar</button>
      </div>
    }
  `
})
export class AlbumListComponent {
  error = signal<string | null>(null);

  loadAlbums(): void {
    this.albumService.getAll().subscribe({
      next: albums => this.albums.set(albums),
      error: err => this.error.set(err.message || 'Error desconocido')
    });
  }
}
```

---

## 10. Buenas Prácticas

### 10.1 Checklist de Implementación

| Práctica | Estado | Ubicación |
|----------|--------|-----------|
| ✅ provideHttpClient() standalone | Implementado | `app.config.ts` |
| ✅ Interceptores funcionales | Implementado | `interceptors/` |
| ✅ BaseHttpService con herencia | Implementado | `base-http.service.ts` |
| ✅ Timeout configurable | Implementado | `API_CONFIG.timeout` |
| ✅ Retry con backoff | Implementado | `BaseHttpService.get()` |
| ✅ Tipado estricto con interfaces | Implementado | `data.models.ts` |
| ✅ Mapeo backend → frontend | Implementado | `mapToFrontend()` |
| ✅ Manejo centralizado de errores | Implementado | `errorInterceptor` |
| ✅ Token JWT automático | Implementado | `authInterceptor` |
| ✅ LoadingService con Signals | Implementado | `loading.ts` |
| ✅ NotificationStreamService | Implementado | `notification-stream.ts` |
| ✅ Configuración por entorno | Implementado | `getBaseUrl()` |

### 10.2 Estructura de Archivos

```
frontend/src/app/
├── config/
│   └── api.config.ts         # URL base, endpoints, constantes
├── interceptors/
│   ├── index.ts              # Barrel export
│   ├── auth.interceptor.ts   # Añade token JWT
│   ├── error.interceptor.ts  # Manejo global de errores
│   ├── headers.interceptor.ts # Headers comunes
│   └── logging.interceptor.ts # Logging de peticiones
├── models/
│   └── data.models.ts        # Interfaces y DTOs
└── services/
    ├── base-http.service.ts  # Clase base HTTP
    ├── album.service.ts      # Servicio de álbumes
    ├── artist.service.ts     # Servicio de artistas
    ├── song.service.ts       # Servicio de canciones
    ├── auth.ts               # Servicio de autenticación
    ├── loading.ts            # Estado de carga
    └── notification-stream.ts # Notificaciones
```

### 10.3 Diagrama de Flujo HTTP

```
┌─────────────────────────────────────────────────────────────────────────┐
│                              COMPONENTE                                  │
│  albumService.getAlbums().subscribe(albums => this.albums = albums)     │
└───────────────────────────────────┬─────────────────────────────────────┘
                                    │
                                    ↓
┌─────────────────────────────────────────────────────────────────────────┐
│                            AlbumService                                  │
│  extends BaseHttpService                                                 │
│  this.get<AlbumResponse[]>('/albumes')                                   │
└───────────────────────────────────┬─────────────────────────────────────┘
                                    │
                                    ↓
┌─────────────────────────────────────────────────────────────────────────┐
│                          BaseHttpService                                 │
│  buildUrl() → timeout() → retry() → catchError()                        │
└───────────────────────────────────┬─────────────────────────────────────┘
                                    │
                                    ↓
┌─────────────────────────────────────────────────────────────────────────┐
│                            HttpClient                                    │
│  (provisto por Angular)                                                  │
└───────────────────────────────────┬─────────────────────────────────────┘
                                    │
                                    ↓
┌─────────────────────────────────────────────────────────────────────────┐
│                        CADENA DE INTERCEPTORES                           │
│  1. headersInterceptor  →  Añade Content-Type, Accept, X-Request-ID     │
│  2. authInterceptor     →  Añade Authorization: Bearer {token}          │
│  3. loggingInterceptor  →  console.log petición y respuesta             │
│  4. errorInterceptor    →  catchError manejo global                     │
└───────────────────────────────────┬─────────────────────────────────────┘
                                    │
                                    ↓
┌─────────────────────────────────────────────────────────────────────────┐
│                              BACKEND                                     │
│  Spring Boot - localhost:8080/api                                        │
└─────────────────────────────────────────────────────────────────────────┘
```

---

## Resumen

Esta fase implementa un sistema completo de comunicación HTTP que incluye:

1. **HttpClient moderno** con `provideHttpClient()` y interceptores funcionales
2. **Servicio base HTTP** con retry, timeout y manejo de errores centralizado
3. **4 interceptores** en cadena: headers, auth, logging, error
4. **Operaciones CRUD completas** con tipado estricto
5. **Transformación de datos** entre DTOs del backend y modelos del frontend
6. **Estados de carga y notificaciones** con Angular Signals
7. **Catálogo completo de endpoints** documentados
8. **Estrategia de manejo de errores** en 4 niveles

El resultado es una arquitectura HTTP robusta, mantenible y bien documentada que facilita la comunicación con el backend Spring Boot.
