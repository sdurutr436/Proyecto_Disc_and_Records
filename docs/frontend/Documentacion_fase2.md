# Fase 2 - Componentes interactivos y comunicación (Frontend)

> **Proyecto:** Discs & Records  
> **Tipo:** Aplicación web estilo Letterboxd para música  
> **Fecha:** 17 de diciembre de 2025

---

## Índice

1. [Servicios de comunicación](#servicios-de-comunicación)
2. [Servicio de estado global](#servicio-de-estado-global)
3. [Sistema de notificaciones](#sistema-de-notificaciones)
4. [Gestión de loading states](#gestión-de-loading-states)
5. [Separación de responsabilidades](#separación-de-responsabilidades)
6. [Arquitectura de servicios](#arquitectura-de-servicios)
7. [Patrones de comunicación](#patrones-de-comunicación)
8. [Buenas prácticas](#buenas-prácticas)

---

## Servicios de comunicación

En esta fase se han introducido servicios específicos para coordinar componentes hermanos y gestionar flujo de datos y eventos de forma desacoplada. Se usan tanto **RxJS** (Subject/Observable) como **Angular Signals** según el tipo de información (eventos puntuales vs estado persistente).

### EventBusService - Bus de eventos global

**Ubicación:** `services/event-bus.ts`

#### Rol en la arquitectura

El `EventBusService` actúa como un "bus de eventos" global para comunicación uno-a-muchos entre componentes no relacionados en el árbol de componentes. Implementa el patrón **Publish-Subscribe** usando RxJS.

```
Componente A (hermano)          Componente B (hermano)
      |                                 |
      | emit(event)                     | on(EventType) - subscribe
      ↓                                 ↓
  EventBusService (Subject)
      |
      └─→ Observable ─→ Todos los suscriptores reciben el evento
```

#### Patrón Observable/Subject

**Implementación interna:**
- Mantiene un `Subject<AppEvent>` privado donde se publican todos los eventos
- Expone un `Observable<AppEvent>` filtrable mediante operadores RxJS (`filter`, etc)
- Cada evento incluye: `type`, `payload`, `timestamp` y opcionalmente `source` (para debugging)

**API pública:**

```typescript
// Emitir un evento
eventBus.emit({
  type: EventType.ALBUM_ADDED_TO_FAVORITES,
  payload: { albumId: 123 },
  source: 'AlbumDetailComponent'
});

// Suscribirse a un tipo específico
eventBus.on(EventType.ALBUM_ADDED_TO_FAVORITES).subscribe(event => {
  this.updateFavoritesCount(event.payload.albumId);
});

// Suscribirse a múltiples tipos
eventBus.onMultiple([
  EventType.ALBUM_ADDED_TO_FAVORITES,
  EventType.ALBUM_REMOVED_FROM_FAVORITES
]).subscribe(event => {
  this.refreshFavorites();
});
```

#### Tipos de evento soportados

El servicio define un enum `EventType` con los siguientes eventos:

**Eventos de usuario:**
- `USER_LOGIN` - Usuario inicia sesión
- `USER_LOGOUT` - Usuario cierra sesión
- `USER_PROFILE_UPDATED` - Perfil actualizado

**Eventos de álbumes:**
- `ALBUM_ADDED_TO_FAVORITES` - Álbum agregado a favoritos
- `ALBUM_REMOVED_FROM_FAVORITES` - Álbum removido de favoritos
- `ALBUM_RATED` - Álbum calificado

**Eventos de búsqueda:**
- `SEARCH_QUERY_CHANGED` - Query de búsqueda modificado
- `SEARCH_RESULTS_READY` - Resultados disponibles

**Eventos de playlists:**
- `PLAYLIST_CREATED` - Playlist creado
- `PLAYLIST_UPDATED` - Playlist actualizado
- `PLAYLIST_DELETED` - Playlist eliminado

**Eventos de UI:**
- `MODAL_OPENED` - Modal abierto
- `MODAL_CLOSED` - Modal cerrado
- `SIDEBAR_TOGGLED` - Sidebar alternado

**Eventos de notificación:**
- `NOTIFICATION_SHOW` - Notificación mostrada
- `NOTIFICATION_DISMISSED` - Notificación descartada

#### Casos de uso

**Ejemplo 1: Actualizar contador de favoritos**
```typescript
// Componente AlbumCard emite evento al agregar favorito
onAddToFavorites() {
  this.eventBus.emit({
    type: EventType.ALBUM_ADDED_TO_FAVORITES,
    payload: { albumId: this.album.id }
  });
}

// Componente FavoritesCounter (hermano) escucha y actualiza
ngOnInit() {
  this.subscription = this.eventBus
    .on(EventType.ALBUM_ADDED_TO_FAVORITES)
    .subscribe(() => this.count++);
}
```

**Ejemplo 2: Sincronizar UI después de login**
```typescript
// AuthService emite evento después de login exitoso
this.eventBus.emit({
  type: EventType.USER_LOGIN,
  payload: { userId: user.id, username: user.username },
  source: 'AuthService'
});

// Header escucha y actualiza avatar
this.eventBus.on(EventType.USER_LOGIN).subscribe(event => {
  this.showUserMenu = true;
  this.username = event.payload.username;
});
```

#### Ventajas del patrón

- **Desacoplamiento total:** Componentes no necesitan referencias entre sí
- **No requiere cadena de @Input/@Output:** Evita prop drilling
- **Escalable:** Fácil agregar nuevos suscriptores sin modificar emisores
- **Testeable:** Fácil de mockear en tests unitarios

#### Consideraciones importantes

**Memory leaks:** Siempre hacer `unsubscribe()` en `ngOnDestroy()`:
```typescript
ngOnDestroy() {
  this.subscription?.unsubscribe();
}
```

**No abusar:** Para relaciones padre-hijo simples, usar `@Input/@Output`

**Estado persistente:** Para datos que persisten (usuario actual, favoritos), usar `AppStateService` en su lugar

#### Debugging y estadísticas

En modo desarrollo, el servicio registra todos los eventos en consola:
```
[EventBus] Evento emitido: {
  type: "ALBUM_ADDED_TO_FAVORITES",
  payload: { albumId: 123 },
  timestamp: "2025-12-17T10:30:00.000Z",
  source: "AlbumDetailComponent"
}
```

---

### NotificationStreamService - Canal de notificaciones

**Ubicación:** `services/notification-stream.ts`

#### Rol en la arquitectura

Servicio especializado que implementa el patrón **Observable/Subject** para el sistema de notificaciones. Actúa como "fachada" entre lógica de negocio y sistema de toasts, proporcionando una API simplificada.

```
Componente/Servicio
      |
      | notify(config)
      ↓
NotificationStreamService (Subject)
      |
      | Observable stream
      ↓
NotificationService
      |
      | createComponent()
      ↓
DOM (Toast renderizado)
```

#### Implementación del patrón Observable

**Estructura interna:**
```typescript
private notificationSubject = new Subject<NotificationConfig>();
notifications$: Observable<NotificationConfig> = 
  this.notificationSubject.asObservable();
```

**Workflow completo:**
1. Componente/servicio llama a `notify(config)` o método de conveniencia
2. Config se valida y completa con valores por defecto
3. Se emite en el Subject
4. NotificationService (suscrito en constructor) recibe el evento
5. NotificationService crea componente visual dinámicamente
6. Toast aparece en pantalla con animación
7. Auto-dismiss después de `duration` ms o click en X

#### API simplificada

**Métodos de conveniencia:**
```typescript
// Éxito
notificationStream.success(
  'Guardado',
  'Los cambios se guardaron correctamente'
);

// Error
notificationStream.error(
  'Error',
  'No se pudo conectar con el servidor'
);

// Advertencia
notificationStream.warning(
  'Atención',
  'Tienes cambios sin guardar'
);

// Información
notificationStream.info(
  'Actualización',
  'Hay 3 álbumes nuevos disponibles'
);

// Configuración completa
notificationStream.notify({
  type: 'success',
  title: 'Éxito',
  message: 'Operación completada',
  duration: 5000,
  position: 'top-right'
});
```

#### Ventajas del patrón Observable

- **Desacoplamiento:** Componentes no conocen `NotificationService` directamente
- **Reactivo:** Se pueden aplicar operadores RxJS (throttle, debounce, filter)
- **Testeable:** Fácil de mockear el stream en tests
- **Escalable:** Múltiples suscriptores pueden procesar notificaciones (analytics, logging)
- **Centralizado:** Un solo punto para todas las notificaciones

#### Estadísticas y analytics

El servicio mantiene estadísticas internas:
```typescript
private stats = {
  totalNotifications: 0,
  byType: {
    success: 0,
    error: 0,
    warning: 0,
    info: 0
  }
};
```

Esto permite análisis como:
- Cantidad de errores mostrados al usuario
- Tipos de notificaciones más comunes
- Detección de problemas UX (muchos errores = problema de integración)

---

## Servicio de estado global

### AppStateService - Estado compartido con Signals

**Ubicación:** `services/app-state.ts`

#### Propósito

Mantener **estado global compartido** accesible desde cualquier componente usando **Angular Signals** para reactividad automática. Persiste datos críticos en `localStorage`.

```
Componente A                    Componente B
   |                                 |
   | Lee: appState.currentUser()    | Lee: appState.currentUser()
   ↓                                 ↓
          AppStateService (Signals)
                  |
                  | Actualización de signal
                  ↓
          Ambos componentes se actualizan automáticamente
```

#### Diferencia con EventBusService

| Aspecto | EventBusService | AppStateService |
|---------|----------------|-----------------|
| **Propósito** | Eventos puntuales | Estado persistente |
| **Ejemplo** | "Usuario hizo click" | "Usuario actual" |
| **Tecnología** | RxJS Subject/Observable | Angular Signals |
| **Suscripción** | Manual (subscribe/unsubscribe) | Automática |
| **Uso** | Notificaciones, coordinación | Datos compartidos, configuración |

#### Ventajas de Signals

- ✅ **Reactividad automática:** Componentes se actualizan sin subscribe/unsubscribe
- ✅ **Mejor performance:** Más eficiente que BehaviorSubject
- ✅ **API más simple:** Menos código boilerplate
- ✅ **Type-safe:** TypeScript infiere tipos automáticamente
- ✅ **Integración nativa:** Parte del core de Angular

#### Estado gestionado

**1. Autenticación**
```typescript
// Signals
currentUser = signal<User | null>(null);

// Computed (derivados)
isAuthenticated = computed(() => this.currentUser() !== null);
userName = computed(() => {
  const user = this.currentUser();
  return user ? user.username : 'Guest';
});

// Métodos
setUser(user: User): void
logout(): void
updateUser(updates: Partial<User>): void
```

**Ejemplo de uso:**
```typescript
// En Header component
userName = this.appState.userName(); // Se actualiza automáticamente

// En Login component
onLoginSuccess(user: User) {
  this.appState.setUser(user);
  // Header se actualiza automáticamente, sin comunicación explícita
}
```

**2. Búsqueda**
```typescript
// Signals
searchQuery = signal<string>('');
searchResults = signal<SearchResult>({ albums: [], artists: [], songs: [], total: 0 });
isSearching = signal<boolean>(false);

// Métodos
setSearchQuery(query: string): void
setSearchResults(results: SearchResult): void
startSearch(query: string): void
clearSearch(): void
```

**3. Favoritos**
```typescript
// Signals
favorites = signal<Album[]>([]);

// Computed
favoriteIds = computed(() => new Set(this.favorites().map(a => a.id)));
favoritesCount = computed(() => this.favorites().length);

// Métodos
addToFavorites(album: Album): void
removeFromFavorites(albumId: number): void
isFavorite(albumId: number): boolean
clearFavorites(): void
```

**Ejemplo de uso:**
```typescript
// En AlbumCard component
isFavorite = computed(() => 
  this.appState.favoriteIds().has(this.album.id)
);

// Reactivo: cuando se agrega/remueve favorito, isFavorite se actualiza
```

**4. Preferencias de usuario**
```typescript
userPreferences = signal<UserPreferences>({
  language: 'es',
  notifications: true,
  autoplay: false,
  volume: 70
});

// Método
updatePreferences(updates: Partial<UserPreferences>): void
```

**5. Estado de UI**
```typescript
sidebarOpen = signal<boolean>(false);
loading = signal<boolean>(false);

// Métodos
toggleSidebar(): void
setLoading(loading: boolean): void
```

#### Persistencia automática con Effects

El servicio usa **Angular effects** para persistir automáticamente cambios críticos:

```typescript
constructor() {
  // Cargar estado al iniciar
  this.loadPersistedState();

  // Effect: Persistir usuario cuando cambia
  effect(() => {
    const user = this.currentUser();
    if (user) {
      localStorage.setItem('app-user', JSON.stringify(user));
    } else {
      localStorage.removeItem('app-user');
    }
  });

  // Effect: Persistir favoritos cuando cambian
  effect(() => {
    const favorites = this.favorites();
    localStorage.setItem('app-favorites', JSON.stringify(favorites));
  });

  // Effect: Persistir preferencias cuando cambian
  effect(() => {
    const prefs = this.userPreferences();
    localStorage.setItem('app-preferences', JSON.stringify(prefs));
  });
}
```

**Workflow de persistencia:**
1. Al iniciar la app, se carga estado desde `localStorage`
2. Cuando un signal cambia, el effect se ejecuta automáticamente
3. Datos se guardan en `localStorage`
4. Si hay error, se ignora silenciosamente (no rompe la app)
5. Al volver a cargar la app, estado se restaura

#### Casos de uso completos

**Caso 1: Sistema de favoritos completo**
```typescript
// En AlbumDetailComponent
onToggleFavorite() {
  const albumId = this.album.id;
  
  if (this.appState.isFavorite(albumId)) {
    this.appState.removeFromFavorites(albumId);
    this.notificationStream.info('Removido', 'Álbum removido de favoritos');
  } else {
    this.appState.addToFavorites(this.album);
    this.notificationStream.success('Agregado', 'Álbum agregado a favoritos');
  }
}

// En FavoritesPage
favoriteAlbums = this.appState.favorites;
count = this.appState.favoritesCount;
// Ambos se actualizan automáticamente cuando cambian favoritos
```

**Caso 2: Autenticación y navegación**
```typescript
// En AuthService
async login(credentials: LoginCredentials) {
  const response = await this.http.post('/api/login', credentials);
  
  if (response.success) {
    // Actualiza estado global
    this.appState.setUser(response.user);
    
    // Emite evento para componentes que necesiten reaccionar
    this.eventBus.emit({
      type: EventType.USER_LOGIN,
      payload: { userId: response.user.id }
    });
    
    return true;
  }
  return false;
}

// En Header component
isLoggedIn = this.appState.isAuthenticated;
userName = this.appState.userName;
// Se actualizan automáticamente después del login
```

---

## Sistema de notificaciones

### Arquitectura completa del sistema

El sistema de notificaciones se compone de tres capas:

```
┌─────────────────────────────────────────────────┐
│         COMPONENTES / SERVICIOS                 │
│  (AuthService, AlbumService, Components, etc.)  │
└─────────────────┬───────────────────────────────┘
                  │ success() / error() / etc.
                  ↓
┌─────────────────────────────────────────────────┐
│      NotificationStreamService (Fachada)        │
│  - API simplificada                              │
│  - Observable stream                             │
│  - Estadísticas                                  │
└─────────────────┬───────────────────────────────┘
                  │ Observable<NotificationConfig>
                  ↓
┌─────────────────────────────────────────────────┐
│      NotificationService (Gestión DOM)          │
│  - Creación dinámica de componentes             │
│  - Posicionamiento                               │
│  - Auto-dismiss                                  │
└─────────────────┬───────────────────────────────┘
                  │ createComponent()
                  ↓
┌─────────────────────────────────────────────────┐
│      Notification Component (Visual)            │
│  - Renderizado del toast                        │
│  - Animaciones                                   │
│  - Evento @Output dismissed                     │
└─────────────────────────────────────────────────┘
```

### Componentes del sistema

#### 1. NotificationStreamService (Fachada)

**Responsabilidad:** API simplificada para emitir notificaciones

```typescript
// Métodos de conveniencia
success(title: string, message: string): void
error(title: string, message: string): void
warning(title: string, message: string): void
info(title: string, message: string): void

// Método completo
notify(config: NotificationConfig): void
```

**Uso en servicios:**
```typescript
@Injectable()
export class AuthService {
  constructor(private notificationStream: NotificationStreamService) {}
  
  async login(credentials: LoginCredentials) {
    const response = await this.http.post('/api/login', credentials);
    
    if (response.success) {
      this.notificationStream.success(
        'Bienvenido',
        `¡Hola ${response.user.username}!`
      );
    } else {
      this.notificationStream.error(
        'Error de autenticación',
        'Credenciales incorrectas'
      );
    }
  }
}
```

#### 2. NotificationService (Gestión DOM)

**Ubicación:** `services/notification.ts`

**Responsabilidad:** Crear y destruir componentes de notificación dinámicamente en el DOM

**Workflow de creación:**
1. Recibe config desde NotificationStreamService
2. Crea componente `Notification` usando `createComponent()`
3. Configura inputs (type, title, message, duration, position)
4. Se suscribe al evento `dismissed` del componente
5. Obtiene elemento HTML del componente
6. Añade al DOM con `document.body.appendChild()`
7. Calcula posición basada en otras notificaciones activas
8. Muestra con animación

**Workflow de destrucción:**
1. Componente emite evento `dismissed` (por timeout o click en X)
2. NotificationService escucha el evento
3. Remueve elemento del DOM con `removeChild()`
4. Destruye componente con `destroy()`
5. Actualiza posiciones de notificaciones restantes

**Gestión de posiciones:**
```typescript
private updatePositions(): void {
  // Agrupa notificaciones por posición (top-right, top-left, etc.)
  const grouped: { [key: string]: ComponentRef<Notification>[] } = {};
  
  this.notifications.forEach(ref => {
    const position = ref.instance.position || 'top-right';
    if (!grouped[position]) grouped[position] = [];
    grouped[position].push(ref);
  });

  // Para cada grupo, calcula offset acumulativo
  Object.keys(grouped).forEach(posKey => {
    const group = grouped[posKey];
    let activeOffset = 20; // Margen inicial
    const gap = 16; // Espacio entre notificaciones

    group.forEach(ref => {
      const domElem = (ref.hostView as any).rootNodes[0];
      const elementHeight = domElem.scrollHeight || 80;

      // Aplicar posición
      if (posKey.startsWith('top')) {
        domElem.style.top = `${activeOffset}px`;
      } else {
        domElem.style.bottom = `${activeOffset}px`;
      }

      // Acumular para la siguiente
      activeOffset += elementHeight + gap;
    });
  });
}
```

#### 3. Notification Component (Visual)

**Responsabilidad:** Renderizar el toast con estilos y animaciones

**Características:**
- 4 tipos visuales: success, error, warning, info
- Auto-dismiss configurable
- Animación de entrada/salida
- Botón de cierre manual
- Barra de progreso (opcional)
- Icono según tipo
- Posicionamiento configurable

**Inputs:**
```typescript
@Input() type: 'success' | 'error' | 'warning' | 'info' = 'info';
@Input() title: string = '';
@Input() message: string = '';
@Input() duration: number = 5000;
@Input() position: 'top-right' | 'top-left' | 'bottom-right' | 'bottom-left' = 'top-right';
@Input() autoDismiss: boolean = true;
```

**Output:**
```typescript
@Output() dismissed = new EventEmitter<void>();
```

### Tipos de notificación

#### Success (Éxito)
- **Color:** Verde (`var(--color-success)`)
- **Icono:** ✓
- **Duración:** 5000ms (default)
- **Uso:** Confirmación de operaciones exitosas

```typescript
notificationStream.success(
  'Guardado',
  'Los cambios se guardaron correctamente'
);
```

#### Error
- **Color:** Rojo (`var(--color-error)`)
- **Icono:** ✕
- **Duración:** 8000ms (más largo para asegurar lectura)
- **Uso:** Errores de validación, fallos de red

```typescript
notificationStream.error(
  'Error',
  'No se pudo conectar con el servidor'
);
```

#### Warning (Advertencia)
- **Color:** Amarillo (`var(--color-warning)`)
- **Icono:** ⚠
- **Duración:** 6000ms
- **Uso:** Advertencias, confirmaciones necesarias

```typescript
notificationStream.warning(
  'Atención',
  'Tienes cambios sin guardar'
);
```

#### Info (Información)
- **Color:** Azul (`var(--color-info)`)
- **Icono:** ℹ
- **Duración:** 5000ms
- **Uso:** Mensajes informativos, actualizaciones

```typescript
notificationStream.info(
  'Actualización',
  'Hay 3 álbumes nuevos disponibles'
);
```

### Auto-dismiss configurable

Cada notificación puede configurar su duración:

```typescript
// Notificación de error que dura más tiempo
notificationStream.notify({
  type: 'error',
  title: 'Error crítico',
  message: 'Operación fallida',
  duration: 10000 // 10 segundos
});

// Notificación persistente (sin auto-dismiss)
notificationStream.notify({
  type: 'warning',
  title: 'Acción requerida',
  message: 'Debes confirmar para continuar',
  autoDismiss: false // Usuario debe cerrar manualmente
});
```

### Posicionamiento

Las notificaciones soportan 4 posiciones:
- `top-right` (default)
- `top-left`
- `bottom-right`
- `bottom-left`

```typescript
notificationStream.notify({
  type: 'info',
  title: 'Mensaje',
  message: 'Contenido',
  position: 'bottom-left'
});
```

### Ejemplo de integración completa

```typescript
@Injectable()
export class AlbumService {
  constructor(
    private http: HttpClient,
    private notificationStream: NotificationStreamService,
    private appState: AppStateService,
    private eventBus: EventBusService
  ) {}

  async addToFavorites(album: Album): Promise<boolean> {
    try {
      // Llamada al backend
      const response = await this.http.post(`/api/favorites`, album).toPromise();

      if (response.success) {
        // Actualizar estado global
        this.appState.addToFavorites(album);

        // Emitir evento
        this.eventBus.emit({
          type: EventType.ALBUM_ADDED_TO_FAVORITES,
          payload: { albumId: album.id }
        });

        // Notificar éxito
        this.notificationStream.success(
          'Agregado a favoritos',
          `${album.title} fue agregado a tus favoritos`
        );

        return true;
      }

      return false;
    } catch (error) {
      // Notificar error
      this.notificationStream.error(
        'Error',
        'No se pudo agregar el álbum a favoritos'
      );
      return false;
    }
  }
}
```

---

## Gestión de loading states

### LoadingService - Estados de carga

**Ubicación:** `services/loading.ts`

#### Propósito

Servicio centralizado para gestionar **estados de carga global y local**. Permite mostrar spinners, barras de progreso y estados de carga en botones/componentes específicos.

#### Arquitectura

```
┌─────────────────────────────────────────────────┐
│              COMPONENTES / SERVICIOS            │
│   (AlbumService, AuthService, Components)       │
└────────────────┬────────────────────────────────┘
                 │ start() / stop() / startLocal()
                 ↓
┌─────────────────────────────────────────────────┐
│           LoadingService                        │
│  - isLoading (Signal)                           │
│  - progress (Signal)                            │
│  - localStates (Map)                            │
└────────────────┬────────────────────────────────┘
                 │ Signals/Observables
                 ↓
┌─────────────────────────────────────────────────┐
│              UI COMPONENTS                      │
│  - Spinner (global overlay)                     │
│  - ProgressBar                                  │
│  - Button (loading local)                       │
└─────────────────────────────────────────────────┘
```

### Estados de carga global

**Spinner global durante operaciones async:**

```typescript
// Signals
activeOperations = signal(0); // Contador de operaciones activas
loadingMessage = signal('Cargando...');
currentProgress = signal(-1); // -1 = indeterminado, 0-100 = porcentaje

// Computed
isLoading = computed(() => this.activeOperations() > 0);
message = computed(() => this.loadingMessage());
progress = computed(() => this.currentProgress());
```

**API básica:**

```typescript
// Iniciar carga global
loadingService.start('Guardando álbum...');

// Detener carga
loadingService.stop();

// Actualizar progreso
loadingService.setProgress(50);
loadingService.incrementProgress(10);

// Detener todas las operaciones (logout, error crítico)
loadingService.stopAll();
```

**Uso en servicios:**

```typescript
@Injectable()
export class AlbumService {
  constructor(private loadingService: LoadingService) {}

  async getAlbums(): Promise<Album[]> {
    this.loadingService.start('Cargando álbumes...');
    
    try {
      const albums = await this.http.get<Album[]>('/api/albums').toPromise();
      return albums;
    } finally {
      this.loadingService.stop();
    }
  }

  // Con progreso
  async uploadFile(file: File): Promise<void> {
    this.loadingService.start('Subiendo archivo...');
    
    const totalChunks = Math.ceil(file.size / CHUNK_SIZE);
    let uploadedChunks = 0;

    for (const chunk of chunks) {
      await this.uploadChunk(chunk);
      uploadedChunks++;
      
      const progress = (uploadedChunks / totalChunks) * 100;
      this.loadingService.setProgress(progress);
    }

    this.loadingService.stop();
  }
}
```

**Componente de Spinner global:**

```typescript
@Component({
  selector: 'app-spinner',
  template: `
    @if (loadingService.isLoading()) {
      <div class="spinner-overlay">
        <div class="spinner-container">
          <div class="spinner"></div>
          <p>{{ loadingService.message() }}</p>
          
          @if (loadingService.progress() >= 0) {
            <div class="progress-bar">
              <div 
                class="progress-bar__fill" 
                [style.width.%]="loadingService.progress()">
              </div>
            </div>
          }
        </div>
      </div>
    }
  `
})
export class SpinnerComponent {
  loadingService = inject(LoadingService);
}
```

### Loading local en componentes específicos

**Estado por identificador:**

```typescript
// Map de estados locales
private localStates = new Map<string, boolean>();

// Subject para notificar cambios
private localStatesSubject = new BehaviorSubject<Map<string, boolean>>(new Map());

// Observable
localStates$ = this.localStatesSubject.asObservable();
```

**API de loading local:**

```typescript
// Iniciar loading para un componente
loadingService.startLocal('save-button');

// Detener loading
loadingService.stopLocal('save-button');

// Verificar si está cargando
if (loadingService.isLocalLoading('save-button')) {
  return; // Evitar doble click
}

// Limpiar estado
loadingService.clearLocal('save-button');
```

**Uso en botones:**

```typescript
@Component({
  selector: 'app-save-button',
  template: `
    <button 
      [disabled]="isLoading()"
      (click)="onSave()">
      @if (isLoading()) {
        <span class="spinner-small"></span>
      }
      {{ isLoading() ? 'Guardando...' : 'Guardar' }}
    </button>
  `
})
export class SaveButtonComponent {
  private loadingService = inject(LoadingService);
  private albumService = inject(AlbumService);
  
  isLoading = computed(() => 
    this.loadingService.isLocalLoading('save-button-' + this.albumId)
  );

  async onSave() {
    const id = 'save-button-' + this.albumId;
    
    if (this.loadingService.isLocalLoading(id)) {
      return; // Evitar doble click
    }

    this.loadingService.startLocal(id);
    
    try {
      await this.albumService.save(this.album);
    } finally {
      this.loadingService.stopLocal(id);
    }
  }
}
```

### Métodos de conveniencia

Para simplificar el código, LoadingService proporciona wrappers:

**Loading global automático:**

```typescript
// Sin wrapper
async getAlbums() {
  this.loadingService.start('Cargando...');
  try {
    return await this.http.get('/api/albums').toPromise();
  } finally {
    this.loadingService.stop();
  }
}

// Con wrapper
async getAlbums() {
  return await this.loadingService.withLoading(
    this.http.get('/api/albums').toPromise(),
    'Cargando álbumes...'
  );
}
```

**Loading local automático:**

```typescript
// Sin wrapper
async onSave() {
  this.loadingService.startLocal('save-btn');
  try {
    await this.albumService.save(this.album);
  } finally {
    this.loadingService.stopLocal('save-btn');
  }
}

// Con wrapper
async onSave() {
  await this.loadingService.withLocalLoading(
    'save-btn',
    this.albumService.save(this.album)
  );
}
```

### Contador de operaciones simultáneas

El servicio soporta múltiples operaciones simultáneas sin conflictos:

```typescript
// Operación 1 inicia
loadingService.start(); // activeOperations = 1, spinner visible

// Operación 2 inicia (mientras 1 sigue activa)
loadingService.start(); // activeOperations = 2, spinner sigue visible

// Operación 1 termina
loadingService.stop(); // activeOperations = 1, spinner sigue visible

// Operación 2 termina
loadingService.stop(); // activeOperations = 0, spinner se oculta
```

---

## Separación de responsabilidades

### Principio fundamental

El código frontend aplica el principio de **Separación de Responsabilidades** (Separation of Concerns):

**COMPONENTES:**
- ✅ Gestionan presentación y estados visuales
- ✅ Capturan entrada del usuario (formularios, clicks)
- ✅ Renderizan templates con datos
- ✅ Manejan navegación entre páginas
- ❌ NO contienen lógica de negocio
- ❌ NO hacen llamadas HTTP directas
- ❌ NO manipulan localStorage
- ❌ NO calculan reglas de negocio

**SERVICIOS:**
- ✅ Encapsulan lógica de negocio
- ✅ Gestionan comunicación con backend
- ✅ Coordinan estado global
- ✅ Implementan validaciones complejas
- ✅ Manejan persistencia (localStorage, IndexedDB)
- ❌ NO renderizan UI
- ❌ NO manejan eventos del DOM directamente

### Anti-patrón vs Patrón correcto

#### ❌ ANTI-PATRÓN: Componente con todo

```typescript
@Component({
  selector: 'app-login',
  template: '...'
})
export class LoginComponent {
  constructor(private http: HttpClient, private router: Router) {}

  // ❌ Componente hace llamada HTTP
  // ❌ Componente gestiona estado global
  // ❌ Componente muestra notificaciones
  // ❌ Lógica mezclada con presentación
  async onSubmit() {
    if (!this.email || !this.password) {
      alert('Completa todos los campos');
      return;
    }

    const response = await this.http.post('/api/login', {
      email: this.email,
      password: this.password
    }).toPromise();

    if (response.success) {
      localStorage.setItem('user', JSON.stringify(response.user));
      localStorage.setItem('token', response.token);
      this.router.navigate(['/dashboard']);
      alert('Bienvenido!');
    } else {
      alert('Credenciales incorrectas');
    }
  }
}
```

**Problemas:**
- Difícil de testear (HTTP, localStorage, alert)
- Lógica duplicada si hay otro componente de login
- Imposible reutilizar lógica de autenticación
- Viola Single Responsibility Principle

#### ✅ PATRÓN CORRECTO: Separación de responsabilidades

```typescript
// COMPONENTE: Solo presentación
@Component({
  selector: 'app-login',
  template: '...'
})
export class LoginComponent {
  private authService = inject(AuthService);
  private router = inject(Router);

  email = signal('');
  password = signal('');
  isLoading = signal(false);

  async onSubmit() {
    // Componente solo coordina, no implementa lógica
    this.isLoading.set(true);
    
    const result = await this.authService.login({
      email: this.email(),
      password: this.password()
    });

    this.isLoading.set(false);

    if (result.success) {
      this.router.navigate(['/dashboard']);
    }
  }
}

// SERVICIO: Lógica de negocio
@Injectable({ providedIn: 'root' })
export class AuthService {
  private http = inject(HttpClient);
  private appState = inject(AppStateService);
  private eventBus = inject(EventBusService);
  private notificationStream = inject(NotificationStreamService);

  async login(credentials: LoginCredentials): Promise<AuthResponse> {
    try {
      const response = await this.http.post('/api/login', credentials).toPromise();

      if (response.success) {
        // Servicio gestiona estado global
        this.appState.setUser(response.user);
        this.saveToken(response.token);

        // Servicio emite eventos
        this.eventBus.emit({
          type: EventType.USER_LOGIN,
          payload: { userId: response.user.id }
        });

        // Servicio muestra notificaciones
        this.notificationStream.success(
          'Bienvenido',
          `¡Hola ${response.user.username}!`
        );

        return response;
      }

      this.notificationStream.error('Error', 'Credenciales incorrectas');
      return response;

    } catch (error) {
      this.notificationStream.error('Error', 'No se pudo conectar');
      return { success: false, message: error.message };
    }
  }

  private saveToken(token: string): void {
    localStorage.setItem('auth-token', token);
  }
}
```

**Beneficios:**
- ✅ Componente simple, fácil de testear
- ✅ Lógica reutilizable en otros componentes
- ✅ Fácil mockear AuthService en tests
- ✅ Centralización de lógica de autenticación
- ✅ Cumple Single Responsibility Principle

### Coordinación entre servicios

Los servicios se coordinan entre sí, no los componentes:

```typescript
@Injectable()
export class AuthService {
  // Inyecta otros servicios
  constructor(
    private appState: AppStateService,
    private eventBus: EventBusService,
    private notificationStream: NotificationStreamService,
    private loadingService: LoadingService
  ) {}

  async login(credentials: LoginCredentials) {
    // 1. Loading global
    this.loadingService.start('Iniciando sesión...');

    try {
      const response = await this.http.post('/api/login', credentials);

      if (response.success) {
        // 2. Actualizar estado global
        this.appState.setUser(response.user);

        // 3. Emitir evento
        this.eventBus.emit({
          type: EventType.USER_LOGIN,
          payload: { userId: response.user.id }
        });

        // 4. Notificación
        this.notificationStream.success('Bienvenido', '...');

        return response;
      }

      this.notificationStream.error('Error', '...');
      return response;

    } finally {
      // 5. Detener loading
      this.loadingService.stop();
    }
  }
}
```

**El componente solo hace:**
```typescript
async onSubmit() {
  const result = await this.authService.login(this.credentials);
  
  if (result.success) {
    this.router.navigate(['/dashboard']);
  }
}
```

---

## Arquitectura de servicios

### Diagrama de arquitectura

```
┌─────────────────────────────────────────────────────────────────┐
│                      CAPA DE PRESENTACIÓN                        │
│                        (Componentes)                             │
│  ┌────────────┐  ┌────────────┐  ┌────────────┐  ┌───────────┐ │
│  │   Header   │  │   Login    │  │AlbumDetail │  │  Profile  │ │
│  └──────┬─────┘  └──────┬─────┘  └──────┬─────┘  └─────┬─────┘ │
└─────────┼────────────────┼────────────────┼─────────────┼───────┘
          │ inject()       │ inject()       │ inject()    │ inject()
          ↓                ↓                ↓             ↓
┌─────────────────────────────────────────────────────────────────┐
│                    CAPA DE SERVICIOS                             │
│  ┌──────────────────────────────────────────────────────────┐   │
│  │           SERVICIOS DE DOMINIO (Lógica de negocio)       │   │
│  │  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐   │   │
│  │  │ AuthService  │  │ AlbumService │  │ UserService  │   │   │
│  │  └───────┬──────┘  └───────┬──────┘  └───────┬──────┘   │   │
│  └──────────┼─────────────────┼─────────────────┼──────────┘   │
│             │ coordina        │ coordina        │ coordina     │
│  ┌──────────┼─────────────────┼─────────────────┼──────────┐   │
│  │          │    SERVICIOS DE INFRAESTRUCTURA    │          │   │
│  │  ┌───────▼──────┐  ┌───────▼──────┐  ┌───────▼──────┐  │   │
│  │  │ AppState     │  │  EventBus    │  │Notification  │  │   │
│  │  │ Service      │  │  Service     │  │ Stream       │  │   │
│  │  │ (Signals)    │  │ (RxJS)       │  │ Service      │  │   │
│  │  └──────────────┘  └──────────────┘  └──────────────┘  │   │
│  │  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐  │   │
│  │  │  Loading     │  │    Theme     │  │Notification  │  │   │
│  │  │  Service     │  │   Service    │  │  Service     │  │   │
│  │  └──────────────┘  └──────────────┘  └──────────────┘  │   │
│  └──────────────────────────────────────────────────────────┘   │
└─────────────────────────────────────────────────────────────────┘
          │                     │                    │
          ↓                     ↓                    ↓
┌─────────────────────────────────────────────────────────────────┐
│                  CAPA DE PERSISTENCIA Y APIs                     │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐          │
│  │ localStorage │  │  HTTP Client │  │  DOM APIs    │          │
│  └──────────────┘  └──────────────┘  └──────────────┘          │
└─────────────────────────────────────────────────────────────────┘
```

### Clasificación de servicios

#### 1. Servicios de Infraestructura (Base)

**AppStateService** - Estado global con Signals
- Gestiona datos compartidos entre componentes
- Persistencia automática en localStorage
- Reactividad con Angular Signals
- No depende de otros servicios de infraestructura

**EventBusService** - Bus de eventos
- Comunicación desacoplada entre componentes
- Patrón Publish-Subscribe con RxJS
- No depende de otros servicios

**LoadingService** - Estados de carga
- Loading global (spinner overlay)
- Loading local (botones, componentes)
- Contador de operaciones simultáneas
- Signals + BehaviorSubject

**ThemeService** - Gestión de temas
- Dark/Light mode
- Detección de preferencia del sistema
- Persistencia en localStorage
- Aplicación de `data-theme` en DOM

**NotificationService** - Creación de toasts (DOM)
- Crea componentes dinámicamente
- Manipulación directa del DOM
- Gestión de posicionamiento
- Auto-dismiss configurable

**NotificationStreamService** - Stream de notificaciones
- Fachada sobre NotificationService
- Patrón Observable/Subject
- API simplificada (success, error, etc.)
- Coordina con NotificationService

#### 2. Servicios de Dominio (Lógica de negocio)

**AuthService** - Autenticación y autorización
- Login, registro, logout
- Gestión de tokens
- Coordina: AppState, EventBus, NotificationStream, LoadingService
- Simulación de backend (temporal)

**AlbumService** (futuro)
- CRUD de álbumes
- Gestión de favoritos
- Búsqueda y filtrado
- Coordina servicios de infraestructura

**UserService** (futuro)
- Gestión de perfil
- Preferencias
- Estadísticas

### Patrones de inyección

Todos los servicios usan `providedIn: 'root'` para ser singletons:

```typescript
@Injectable({
  providedIn: 'root'
})
export class AuthService {
  // Será una única instancia en toda la app
}
```

**Inyección de dependencias:**

```typescript
// Forma tradicional (constructor)
constructor(
  private appState: AppStateService,
  private eventBus: EventBusService
) {}

// Forma moderna (inject function)
private appState = inject(AppStateService);
private eventBus = inject(EventBusService);
```

### Flujo de datos completo

**Ejemplo: Agregar álbum a favoritos**

```
1. Usuario click en botón ❤️
   ↓
2. AlbumDetailComponent.onToggleFavorite()
   ↓
3. AlbumService.addToFavorites(album)
   ├─→ LoadingService.startLocal('fav-btn')
   ├─→ HTTP POST /api/favorites
   ├─→ AppStateService.addToFavorites(album)
   │   └─→ Effect persiste en localStorage
   ├─→ EventBusService.emit(ALBUM_ADDED)
   │   └─→ FavoritesCounter.subscription actualiza count
   ├─→ NotificationStreamService.success()
   │   └─→ NotificationService.show()
   │       └─→ Toast aparece en pantalla
   └─→ LoadingService.stopLocal('fav-btn')
   ↓
4. Componente actualiza automáticamente (signals)
   - AlbumCard: isFavorite() = true
   - FavoritesPage: favorites() incluye nuevo álbum
   - Header: favoritesCount() incrementa
```

---

## Patrones de comunicación

### Resumen de patrones implementados

| Patrón | Tecnología | Uso | Ejemplo |
|--------|-----------|-----|---------|
| **@Input/@Output** | Angular | Padre ↔ Hijo | Header → Modal |
| **Signals** | Angular | Estado local reactivo | currentUser, favorites |
| **Subject/Observable** | RxJS | Eventos puntuales | EventBus, NotificationStream |
| **BehaviorSubject** | RxJS | Estado con replay | Loading local states |
| **Service Singleton** | Angular DI | Estado/lógica compartida | AppState, Auth |
| **Event Emitter** | Angular | Eventos de componentes | Modal.closed, Notification.dismissed |

### Cuándo usar cada patrón

#### 1. @Input/@Output
**Usar cuando:** Comunicación directa padre-hijo

```typescript
// Padre
<app-modal [isOpen]="isModalOpen" (onClose)="handleClose()">

// Hijo
@Input() isOpen: boolean;
@Output() onClose = new EventEmitter<void>();
```

**Ventajas:**
- Simple y directo
- Type-safe
- Fácil de debuggear

**Desventajas:**
- Solo funciona con relación directa
- Prop drilling en componentes profundos

#### 2. Signals (AppStateService)
**Usar cuando:** Estado global que persiste y se comparte

```typescript
// Estado
currentUser = signal<User | null>(null);

// Lectura reactiva
userName = computed(() => this.appState.currentUser()?.username ?? 'Guest');

// Actualización
this.appState.setUser(user);
```

**Ventajas:**
- Reactividad automática
- No requiere subscribe/unsubscribe
- Mejor performance que Observables
- API simple

**Desventajas:**
- No soporta operadores RxJS
- Menos flexible que Observables

#### 3. Subject/Observable (EventBusService)
**Usar cuando:** Eventos puntuales entre componentes no relacionados

```typescript
// Emisor
eventBus.emit({
  type: EventType.ALBUM_RATED,
  payload: { albumId: 123, rating: 5 }
});

// Receptor
eventBus.on(EventType.ALBUM_RATED).subscribe(event => {
  this.handleRating(event.payload);
});
```

**Ventajas:**
- Desacoplamiento total
- Soporta operadores RxJS (filter, map, debounce)
- Múltiples suscriptores
- Fácil de testear

**Desventajas:**
- Requiere unsubscribe manual
- Menos type-safe que signals
- Puede complicarse con muchos eventos

#### 4. BehaviorSubject (LoadingService)
**Usar cuando:** Estado con valor inicial y replay para nuevos suscriptores

```typescript
private localStatesSubject = new BehaviorSubject<Map<string, boolean>>(new Map());
localStates$ = this.localStatesSubject.asObservable();
```

**Ventajas:**
- Nuevos suscriptores reciben último valor
- Mantiene estado actual
- Compatible con async pipe

**Desventajas:**
- Más boilerplate que signals
- Requiere unsubscribe

#### 5. Service Singleton
**Usar cuando:** Lógica de negocio o estado que necesita ser compartido

```typescript
@Injectable({ providedIn: 'root' })
export class AuthService {
  // Una sola instancia en toda la app
}
```

**Ventajas:**
- Reutilizable en toda la app
- Testeable con mocks
- Centraliza lógica de negocio

### Matriz de decisión

| Escenario | Solución |
|-----------|----------|
| Padre necesita pasar dato a hijo | `@Input` |
| Hijo necesita notificar al padre | `@Output` |
| Estado global que persiste | `AppStateService` (Signals) |
| Evento puntual entre hermanos | `EventBusService` (Subject) |
| Notificar a múltiples suscriptores | `EventBusService` o `NotificationStreamService` |
| Lógica de negocio compartida | Service con `providedIn: 'root'` |
| Estado de carga | `LoadingService` (Signals + BehaviorSubject) |
| Tema/configuración global | `ThemeService` (Signals + localStorage) |

---

## Buenas prácticas

### 1. Limpieza de suscripciones

Siempre hacer `unsubscribe()` en `ngOnDestroy()`:

```typescript
export class MyComponent implements OnDestroy {
  private subscription: Subscription;

  ngOnInit() {
    this.subscription = this.eventBus
      .on(EventType.SOME_EVENT)
      .subscribe(event => {
        // ...
      });
  }

  ngOnDestroy() {
    this.subscription?.unsubscribe();
  }
}
```

**Alternativa con takeUntil:**
```typescript
export class MyComponent implements OnDestroy {
  private destroy$ = new Subject<void>();

  ngOnInit() {
    this.eventBus
      .on(EventType.SOME_EVENT)
      .pipe(takeUntil(this.destroy$))
      .subscribe(event => {
        // ...
      });
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
```

### 2. Preferir Signals sobre Observables cuando sea posible

```typescript
// ❌ Más complejo
private userSubject = new BehaviorSubject<User | null>(null);
user$ = this.userSubject.asObservable();

// ✅ Más simple
user = signal<User | null>(null);
```

### 3. Componentes delgados, servicios gruesos

```typescript
// ❌ Componente con lógica
onSubmit() {
  if (!this.validateEmail(this.email)) return;
  if (!this.validatePassword(this.password)) return;
  
  const hashedPassword = this.hashPassword(this.password);
  // más lógica...
}

// ✅ Componente delega
onSubmit() {
  this.authService.login({
    email: this.email(),
    password: this.password()
  });
}
```

### 4. Usar computed para valores derivados

```typescript
// ❌ Calcular en cada acceso
getUserName() {
  const user = this.appState.currentUser();
  return user ? user.username : 'Guest';
}

// ✅ Computed (solo recalcula cuando cambia currentUser)
userName = computed(() => {
  const user = this.appState.currentUser();
  return user ? user.username : 'Guest';
});
```

### 5. Tipado fuerte en eventos

```typescript
// ❌ Any payload
interface AppEvent {
  type: EventType;
  payload: any;
}

// ✅ Genérico tipado
interface AppEvent<T = any> {
  type: EventType;
  payload?: T;
}

// Uso
eventBus.on<{ albumId: number }>(EventType.ALBUM_RATED)
  .subscribe(event => {
    console.log(event.payload.albumId); // TypeScript sabe el tipo
  });
```

### 6. Servicios de fachada para APIs complejas

```typescript
// En lugar de que componentes usen NotificationService directamente
// Usar NotificationStreamService como fachada

// ❌ Componente usa API compleja
this.notificationService.show({
  type: 'success',
  title: 'Guardado',
  message: 'Cambios guardados',
  duration: 5000,
  position: 'top-right'
});

// ✅ Componente usa API simple
this.notificationStream.success('Guardado', 'Cambios guardados');
```

### 7. Documentación de workflows

Documentar workflows complejos en comentarios:

```typescript
/**
 * WORKFLOW: Login de Usuario
 *
 * 1. Componente llama a login()
 * 2. Servicio valida datos
 * 3. Servicio hace llamada a backend
 * 4. Si éxito:
 *    a. Actualiza AppState con usuario
 *    b. Persiste token
 *    c. Emite evento USER_LOGIN
 *    d. Muestra notificación
 * 5. Retorna resultado al componente
 * 6. Componente navega a dashboard
 */
async login(credentials: LoginCredentials) {
  // ...
}
```

### 8. Manejo de errores centralizado

```typescript
// En servicios, siempre manejar errores y notificar
async login(credentials: LoginCredentials) {
  try {
    const response = await this.http.post('/api/login', credentials);
    // ...
    return response;
  } catch (error) {
    // Notificar al usuario
    this.notificationStream.error(
      'Error',
      'No se pudo conectar con el servidor'
    );
    
    // Retornar resultado con error
    return {
      success: false,
      message: error.message
    };
  }
}
```

---

## Compatibilidad de APIs y navegadores

### APIs utilizadas

| API / Patrón | Chrome | Firefox | Edge | Safari | Uso |
|---|---:|---:|---:|---:|---|
| Angular Signals | Sí | Sí | Sí | Sí | AppStateService, LoadingService |
| RxJS Subject/Observable | Sí | Sí | Sí | Sí | EventBusService, NotificationStreamService |
| BehaviorSubject | Sí | Sí | Sí | Sí | LoadingService (local states) |
| Dependency Injection | Sí | Sí | Sí | Sí | Todos los servicios |
| localStorage | Sí | Sí | Sí | Sí | Persistencia (AppState, Auth, Theme) |
| createComponent() | Sí | Sí | Sí | Sí | NotificationService (toasts dinámicos) |
| @Input/@Output | Sí | Sí | Sí | Sí | Comunicación padre-hijo |
| Promises (async/await) | Sí | Sí | Sí | Sí | Servicios async |

**Notas:**
- Todas las APIs usadas son estándar de Angular y soportadas por todos los navegadores modernos
- localStorage tiene límite de ~5MB por dominio
- Signals es API estable desde Angular 16+

---

## Conclusión

La Fase 2 implementa una arquitectura robusta de **comunicación y gestión de estado** que cumple con los principios de separación de responsabilidades y buenas prácticas de Angular:

✅ **Servicios de comunicación:** EventBusService y NotificationStreamService implementan patrón Observable/Subject  
✅ **Estado global:** AppStateService con Angular Signals para reactividad automática  
✅ **Sistema de notificaciones:** Arquitectura completa con 3 capas (Stream → Service → Component)  
✅ **Loading states:** Global y local con LoadingService  
✅ **Separación clara:** Componentes = presentación, Servicios = lógica de negocio  
✅ **Patrones modernos:** Signals, Observables, Dependency Injection  
✅ **Coordinación:** Servicios se coordinan entre sí sin acoplar componentes  

La arquitectura está lista para escalar con nuevas funcionalidades manteniendo el código organizado, testeable y mantenible.
