import { Injectable, signal, computed, effect } from '@angular/core';

/**
 * Interfaz de usuario autenticado
 */
export interface User {
  id: number;
  username: string;
  email: string;
  role?: 'user' | 'moderator' | 'admin';
  avatarUrl?: string;
  token?: string; // Token JWT opcional
  preferences: UserPreferences;
}

/**
 * Preferencias del usuario
 */
export interface UserPreferences {
  language: 'es' | 'en' | 'fr';
  notifications: boolean;
  autoplay: boolean;
  volume: number; // 0-100
}

/**
 * Interfaz de álbum
 */
export interface Album {
  id: number;
  title: string;
  artist: string;
  coverUrl: string;
  releaseYear: number;
  rating?: number;
}

/**
 * Interfaz de resultado de búsqueda
 */
export interface SearchResult {
  albums: Album[];
  artists: any[];
  songs: any[];
  total: number;
}

/**
 * AppStateService - Servicio de Estado Global
 *
 * PROPÓSITO:
 * - Mantener estado compartido accesible desde cualquier componente
 * - Usar Angular Signals para reactividad automática
 * - Persistir datos críticos en localStorage
 *
 * ARQUITECTURA:
 * ```
 * Componente A                    Componente B
 *    |                                 |
 *    | Lee: appState.currentUser()    | Lee: appState.currentUser()
 *    ↓                                 ↓
 *           AppStateService (Signals)
 *                   |
 *                   | Actualización de signal
 *                   ↓
 *           Ambos componentes se actualizan automáticamente
 * ```
 *
 * DIFERENCIA CON EventBusService:
 * - EventBus: Para eventos puntuales (usuario hizo click, se cerró modal)
 * - AppState: Para datos que persisten (usuario actual, configuración, favoritos)
 *
 * VENTAJAS DE SIGNALS:
 * - Reactividad automática (los componentes se actualizan solos)
 * - No requiere subscribe/unsubscribe
 * - Mejor performance que BehaviorSubject
 * - API más simple
 *
 * CASO DE USO:
 * ```typescript
 * // Componente Header lee el usuario
 * userName = computed(() => {
 *   const user = this.appState.currentUser();
 *   return user ? user.username : 'Guest';
 * });
 *
 * // Componente Login actualiza el usuario
 * onLoginSuccess(user: User) {
 *   this.appState.setUser(user);
 *   // Header se actualiza automáticamente!
 * }
 * ```
 */
@Injectable({
  providedIn: 'root',
})
export class AppStateService {
  /**
   * SECCIÓN: AUTENTICACIÓN
   */

  /**
   * Usuario actualmente autenticado (null si no hay sesión)
   */
  currentUser = signal<User | null>(null);

  /**
   * Computed: Verifica si hay un usuario autenticado
   * Se recalcula automáticamente cuando currentUser cambia
   */
  isAuthenticated = computed(() => this.currentUser() !== null);

  /**
   * Computed: Obtiene el nombre del usuario o 'Guest'
   */
  userName = computed(() => {
    const user = this.currentUser();
    return user ? user.username : 'Guest';
  });

  /**
   * SECCIÓN: BÚSQUEDA
   */

  /**
   * Query actual de búsqueda
   */
  searchQuery = signal<string>('');

  /**
   * Resultados de la última búsqueda
   */
  searchResults = signal<SearchResult>({
    albums: [],
    artists: [],
    songs: [],
    total: 0,
  });

  /**
   * Indica si hay una búsqueda en progreso
   */
  isSearching = signal<boolean>(false);

  /**
   * SECCIÓN: FAVORITOS
   */

  /**
   * Lista de álbumes favoritos del usuario
   */
  favorites = signal<Album[]>([]);

  /**
   * Computed: IDs de favoritos (para verificaciones rápidas)
   */
  favoriteIds = computed(() => {
    return new Set(this.favorites().map(album => album.id));
  });

  /**
   * Computed: Cantidad de favoritos
   */
  favoritesCount = computed(() => this.favorites().length);

  /**
   * SECCIÓN: UI GLOBAL
   */

  /**
   * Estado del sidebar (abierto/cerrado)
   */
  sidebarOpen = signal<boolean>(false);

  /**
   * Indica si hay una operación de red en progreso
   */
  loading = signal<boolean>(false);

  /**
   * Preferencias de usuario (separadas para facilitar actualizaciones)
   */
  userPreferences = signal<UserPreferences>({
    language: 'es',
    notifications: true,
    autoplay: false,
    volume: 70,
  });

  /**
   * CONSTRUCTOR
   *
   * WORKFLOW DE INICIALIZACIÓN:
   * 1. Se crea el servicio (providedIn: 'root' = singleton)
   * 2. Se cargan datos desde localStorage si existen
   * 3. Se establecen effects para persistir cambios
   */
  constructor() {
    // Cargar estado persistido
    this.loadPersistedState();

    // Effect: Persistir usuario cuando cambia
    effect(() => {
      const user = this.currentUser();
      if (user) {
        this.persistUser(user);
      } else {
        this.clearPersistedUser();
      }
    });

    // Effect: Persistir favoritos cuando cambian
    effect(() => {
      const favorites = this.favorites();
      this.persistFavorites(favorites);
    });

    // Effect: Persistir preferencias cuando cambian
    effect(() => {
      const prefs = this.userPreferences();
      this.persistPreferences(prefs);
    });
  }

  /**
   * MÉTODOS: AUTENTICACIÓN
   */

  /**
   * Establecer usuario autenticado
   *
   * @param user - Datos del usuario
   *
   * @example
   * ```typescript
   * // En LoginComponent después de login exitoso
   * this.appState.setUser({
   *   id: 123,
   *   username: 'johndoe',
   *   email: 'john@example.com',
   *   preferences: {...}
   * });
   * ```
   */
  setUser(user: User): void {
    this.currentUser.set(user);
  }

  /**
   * Cerrar sesión (limpiar usuario)
   *
   * @example
   * ```typescript
   * // En LogoutButton
   * this.appState.logout();
   * this.router.navigate(['/login']);
   * ```
   */
  logout(): void {
    this.currentUser.set(null);
    this.favorites.set([]);
  }

  /**
   * Actualizar datos del usuario
   *
   * @param updates - Campos a actualizar
   */
  updateUser(updates: Partial<User>): void {
    const current = this.currentUser();
    if (current) {
      this.currentUser.set({ ...current, ...updates });
    }
  }

  /**
   * MÉTODOS: BÚSQUEDA
   */

  /**
   * Actualizar query de búsqueda
   */
  setSearchQuery(query: string): void {
    this.searchQuery.set(query);
  }

  /**
   * Establecer resultados de búsqueda
   */
  setSearchResults(results: SearchResult): void {
    this.searchResults.set(results);
    this.isSearching.set(false);
  }

  /**
   * Iniciar búsqueda (marca como loading)
   */
  startSearch(query: string): void {
    this.searchQuery.set(query);
    this.isSearching.set(true);
  }

  /**
   * Limpiar búsqueda
   */
  clearSearch(): void {
    this.searchQuery.set('');
    this.searchResults.set({
      albums: [],
      artists: [],
      songs: [],
      total: 0,
    });
    this.isSearching.set(false);
  }

  /**
   * MÉTODOS: FAVORITOS
   */

  /**
   * Agregar álbum a favoritos
   *
   * WORKFLOW:
   * 1. Verificar que el álbum no esté ya en favoritos
   * 2. Agregar al array de favoritos
   * 3. Signal se actualiza
   * 4. Effect persiste en localStorage
   * 5. Todos los componentes suscritos se actualizan
   *
   * @param album - Álbum a agregar
   *
   * @example
   * ```typescript
   * // En AlbumDetailComponent
   * onAddToFavorites() {
   *   this.appState.addToFavorites(this.album);
   *   this.notificationService.show({
   *     type: 'success',
   *     message: 'Álbum agregado a favoritos'
   *   });
   * }
   * ```
   */
  addToFavorites(album: Album): void {
    const current = this.favorites();

    // Evitar duplicados
    if (current.some(fav => fav.id === album.id)) {
      console.warn('Álbum ya está en favoritos:', album.id);
      return;
    }

    this.favorites.set([...current, album]);
  }

  /**
   * Remover álbum de favoritos
   *
   * @param albumId - ID del álbum a remover
   */
  removeFromFavorites(albumId: number): void {
    const current = this.favorites();
    this.favorites.set(current.filter(album => album.id !== albumId));
  }

  /**
   * Verificar si un álbum está en favoritos
   *
   * @param albumId - ID del álbum
   * @returns true si está en favoritos
   */
  isFavorite(albumId: number): boolean {
    return this.favoriteIds().has(albumId);
  }

  /**
   * Limpiar todos los favoritos
   */
  clearFavorites(): void {
    this.favorites.set([]);
  }

  /**
   * MÉTODOS: PREFERENCIAS
   */

  /**
   * Actualizar preferencias del usuario
   *
   * @param updates - Preferencias a actualizar
   */
  updatePreferences(updates: Partial<UserPreferences>): void {
    const current = this.userPreferences();
    this.userPreferences.set({ ...current, ...updates });
  }

  /**
   * MÉTODOS: UI
   */

  /**
   * Toggle del sidebar
   */
  toggleSidebar(): void {
    this.sidebarOpen.update(open => !open);
  }

  /**
   * Establecer estado de carga global
   */
  setLoading(loading: boolean): void {
    this.loading.set(loading);
  }

  /**
   * MÉTODOS: PERSISTENCIA
   */

  /**
   * Cargar estado persistido desde localStorage
   *
   * WORKFLOW DE CARGA:
   * 1. Al iniciar la app, se ejecuta este método
   * 2. Lee localStorage para cada clave
   * 3. Parsea JSON y valida datos
   * 4. Actualiza signals con datos recuperados
   * 5. Si hay error, ignora y usa valores por defecto
   */
  private loadPersistedState(): void {
    try {
      // Cargar usuario
      const userJson = localStorage.getItem('app-user');
      if (userJson) {
        const user = JSON.parse(userJson);
        this.currentUser.set(user);
      }

      // Cargar favoritos
      const favoritesJson = localStorage.getItem('app-favorites');
      if (favoritesJson) {
        const favorites = JSON.parse(favoritesJson);
        this.favorites.set(favorites);
      }

      // Cargar preferencias
      const preferencesJson = localStorage.getItem('app-preferences');
      if (preferencesJson) {
        const preferences = JSON.parse(preferencesJson);
        this.userPreferences.set(preferences);
      }
    } catch (error) {
      console.error('Error cargando estado persistido:', error);
    }
  }

  /**
   * Persistir usuario en localStorage
   */
  private persistUser(user: User): void {
    try {
      localStorage.setItem('app-user', JSON.stringify(user));
    } catch (error) {
      console.error('Error persistiendo usuario:', error);
    }
  }

  /**
   * Limpiar usuario de localStorage
   */
  private clearPersistedUser(): void {
    try {
      localStorage.removeItem('app-user');
    } catch (error) {
      console.error('Error limpiando usuario:', error);
    }
  }

  /**
   * Persistir favoritos en localStorage
   */
  private persistFavorites(favorites: Album[]): void {
    try {
      localStorage.setItem('app-favorites', JSON.stringify(favorites));
    } catch (error) {
      console.error('Error persistiendo favoritos:', error);
    }
  }

  /**
   * Persistir preferencias en localStorage
   */
  private persistPreferences(preferences: UserPreferences): void {
    try {
      localStorage.setItem('app-preferences', JSON.stringify(preferences));
    } catch (error) {
      console.error('Error persistiendo preferencias:', error);
    }
  }

  /**
   * Limpiar todo el estado persistido (útil para logout completo)
   */
  clearAllPersistedState(): void {
    try {
      localStorage.removeItem('app-user');
      localStorage.removeItem('app-favorites');
      localStorage.removeItem('app-preferences');
    } catch (error) {
      console.error('Error limpiando estado:', error);
    }
  }
}
