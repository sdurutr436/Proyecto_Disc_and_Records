# Fase 6 - Gestión de Estado Reactivo y Optimización (Frontend)

> **Proyecto:** Discs & Records  
> **Tipo:** Aplicación web estilo Letterboxd para música  
> **Fecha:** 12 de enero de 2026

---

## Índice

1. [Patrón de Gestión de Estado](#1-patrón-de-gestión-de-estado)
2. [Actualización Dinámica sin Recargas](#2-actualización-dinámica-sin-recargas)
3. [Optimización de Rendimiento](#3-optimización-de-rendimiento)
4. [Paginación y Scroll Infinito](#4-paginación-y-scroll-infinito)
5. [Búsqueda y Filtrado en Tiempo Real](#5-búsqueda-y-filtrado-en-tiempo-real)
6. [Integración con API Externa (Deezer)](#6-integración-con-api-externa-deezer)
7. [Comparativa de Opciones Evaluadas](#7-comparativa-de-opciones-evaluadas)
8. [Buenas Prácticas Aplicadas](#8-buenas-prácticas-aplicadas)

---

## 1. Patrón de Gestión de Estado

### 1.1 Patrón Elegido: Angular Signals (Híbrido con BehaviorSubject)

**Decisión:** Implementación de **Angular Signals** como patrón principal de estado, complementado con **BehaviorSubject** para casos específicos que requieren operaciones RxJS avanzadas.

**Ubicación principal:** `frontend/src/app/services/`

### 1.2 Justificación de la Elección

| Criterio | Signals | BehaviorSubject | NgRx |
|----------|---------|-----------------|------|
| **Curva de aprendizaje** | ✅ Baja | ⚠️ Media | ❌ Alta |
| **Boilerplate** | ✅ Mínimo | ⚠️ Moderado | ❌ Alto |
| **Rendimiento** | ✅ Óptimo (granular) | ⚠️ Bueno | ⚠️ Bueno |
| **Integración Angular** | ✅ Nativo (v17+) | ✅ Nativo | ⚠️ Librería externa |
| **Debugging** | ✅ Simple | ⚠️ Medio | ✅ DevTools |
| **Escalabilidad** | ⚠️ Media-Alta | ⚠️ Media | ✅ Alta |

**Razones de la elección:**

1. **Modernidad**: Signals es la dirección oficial de Angular (v17+)
2. **Rendimiento granular**: Solo se actualizan los componentes afectados
3. **Simplicidad**: Menos código que NgRx, más legible que BehaviorSubject
4. **Computed values**: Derivación automática de estado sin suscripciones manuales
5. **Integración con OnPush**: Funciona perfectamente con ChangeDetectionStrategy.OnPush

### 1.3 Estructura del Estado

```
frontend/src/app/services/
├── album-state.service.ts      # Estado de álbumes (Signals + BehaviorSubject)
├── review-state.service.ts     # Estado de reseñas (Signals)
├── app-state.ts                # Estado global de la aplicación
├── album.service.ts            # Servicio de datos (Deezer API)
├── artist.service.ts           # Servicio de artistas
├── song.service.ts             # Servicio de canciones
├── deezer.service.ts           # Integración con Deezer API
└── event-bus.ts                # Sistema de eventos entre servicios
```

### 1.4 Implementación del Servicio de Estado

**AlbumStateService - Servicio Principal de Estado**

```typescript
// frontend/src/app/services/album-state.service.ts

@Injectable({ providedIn: 'root' })
export class AlbumStateService extends BaseHttpService {
  private destroyRef = inject(DestroyRef);

  // ==========================================================================
  // ESTADO PRINCIPAL (Signals)
  // ==========================================================================

  /** Lista de álbumes cargados (acumulativo para infinite scroll) */
  private _albums = signal<Album[]>([]);
  readonly albums = this._albums.asReadonly();

  /** Álbum actualmente seleccionado */
  private _selectedAlbum = signal<Album | null>(null);
  readonly selectedAlbum = this._selectedAlbum.asReadonly();

  /** Estado de carga */
  private _isLoading = signal<boolean>(false);
  readonly isLoading = this._isLoading.asReadonly();

  /** Estado de carga para infinite scroll */
  private _isLoadingMore = signal<boolean>(false);
  readonly isLoadingMore = this._isLoadingMore.asReadonly();

  /** Estado de paginación */
  private _pagination = signal<PaginationState>({
    page: 0,
    size: 12,
    totalElements: 0,
    totalPages: 0,
    isFirst: true,
    isLast: true
  });
  readonly pagination = this._pagination.asReadonly();

  // ==========================================================================
  // COMPUTED SIGNALS (Valores derivados automáticos)
  // ==========================================================================

  /** Indica si hay más páginas disponibles */
  readonly hasMore = computed(() => !this._pagination().isLast);

  /** Número total de álbumes */
  readonly totalAlbums = computed(() => this._pagination().totalElements);

  /** Indica si la lista está vacía */
  readonly isEmpty = computed(() => 
    !this._isLoading() && this._albums().length === 0
  );

  /** Álbumes filtrados por búsqueda local */
  readonly filteredAlbums = computed(() => {
    const albums = this._albums();
    const search = this._filters().search.toLowerCase();
    
    if (!search) return albums;
    
    return albums.filter(album =>
      album.title.toLowerCase().includes(search) ||
      album.artist.toLowerCase().includes(search)
    );
  });
}
```

**Patrón híbrido: BehaviorSubject para debounce**

```typescript
// Dentro de AlbumStateService

// BehaviorSubject para búsqueda con debounce
private searchTrigger$ = new BehaviorSubject<string>('');

private setupSearchSubscription(): void {
  this.searchTrigger$.pipe(
    debounceTime(300),           // Espera 300ms
    distinctUntilChanged(),      // Solo si cambió
    tap(query => {
      this._isLoading.set(true);
      this._albums.set([]);      // Limpiar resultados
    }),
    switchMap(query => this.fetchAlbums(query, 0)),
    takeUntilDestroyed(this.destroyRef)
  ).subscribe({
    next: (response) => this.handleAlbumsResponse(response, false),
    error: (err) => this.handleFetchError(err)
  });
}

// Método público que dispara la búsqueda
search(query: string): void {
  this.searchTrigger$.next(query);
}
```

---

## 2. Actualización Dinámica sin Recargas

### 2.1 Actualizar Listas Después de CRUD

Las operaciones CRUD actualizan automáticamente las listas sin recargar la página:

```typescript
// frontend/src/app/services/album-state.service.ts

/**
 * Crear un nuevo álbum
 * Actualiza la lista automáticamente tras éxito
 */
create(albumData: Partial<Album>): Observable<Album> {
  return this.post<Album>(API_ENDPOINTS.albums.create, albumData).pipe(
    tap(createdAlbum => {
      // Añadir al inicio de la lista (sin recargar)
      this._albums.update(albums => [createdAlbum, ...albums]);
      
      // Actualizar contadores
      this._pagination.update(p => ({
        ...p,
        totalElements: p.totalElements + 1
      }));
      
      // Notificar éxito
      this.notifications.success('Álbum creado', `"${createdAlbum.title}" añadido`);
    })
  );
}

/**
 * Actualizar un álbum existente
 * Actualiza la lista automáticamente
 */
update(id: string, albumData: Partial<Album>): Observable<Album> {
  return this.put<Album>(API_ENDPOINTS.albums.update(id), albumData).pipe(
    tap(updatedAlbum => {
      // Actualizar en la lista (sin recargar)
      this._albums.update(albums =>
        albums.map(a => a.id === id ? { ...a, ...updatedAlbum } : a)
      );
      
      // Actualizar seleccionado si aplica
      if (this._selectedAlbum()?.id === id) {
        this._selectedAlbum.set(updatedAlbum);
      }
    })
  );
}

/**
 * Eliminar un álbum
 * Elimina de la lista automáticamente
 */
deleteAlbum(id: string): Observable<void> {
  return this.delete<void>(API_ENDPOINTS.albums.delete(id)).pipe(
    tap(() => {
      // Eliminar de la lista (sin recargar)
      this._albums.update(albums => albums.filter(a => a.id !== id));
      
      // Actualizar contadores
      this._pagination.update(p => ({
        ...p,
        totalElements: Math.max(0, p.totalElements - 1)
      }));
    })
  );
}
```

### 2.2 Actualizar Contadores en Tiempo Real

Los contadores se actualizan automáticamente usando **computed signals**:

```typescript
// frontend/src/app/services/review-state.service.ts

/** Total de reseñas del usuario (se actualiza solo) */
readonly userReviewsCount = computed(() => this._userReviews().length);

/** Promedio de puntuaciones del usuario */
readonly userAverageRating = computed(() => {
  const reviews = this._userReviews();
  if (reviews.length === 0) return 0;
  const sum = reviews.reduce((acc, r) => acc + r.rating, 0);
  return Math.round((sum / reviews.length) * 10) / 10;
});
```

**Uso en componentes:**

```typescript
// El contador se actualiza automáticamente cuando cambian las reseñas
@Component({
  template: `
    <span>{{ reviewState.userReviewsCount() }} reseñas</span>
    <span>Promedio: {{ reviewState.userAverageRating() }}/5</span>
  `
})
export class ProfileComponent {
  reviewState = inject(ReviewStateService);
}
```

### 2.3 Refrescar Datos sin Perder Scroll Position

El **infinite scroll** conserva automáticamente la posición de scroll:

```typescript
// frontend/src/app/services/album-state.service.ts

/**
 * Cargar más álbumes (infinite scroll)
 * Los nuevos datos se AÑADEN a la lista existente
 */
loadMore(): void {
  if (this.hasMore() && !this._isLoadingMore() && !this._isLoading()) {
    this.loadMoreTrigger$.next();
  }
}

private handleAlbumsResponse(response: PageResponse<Album>, append: boolean): void {
  if (append) {
    // AÑADIR a lista existente (mantiene scroll)
    this._albums.update(albums => [...albums, ...response.content]);
  } else {
    // REEMPLAZAR lista (nueva búsqueda)
    this._albums.set(response.content);
  }
  
  this._pagination.set({
    page: response.page,
    size: response.size,
    totalElements: response.totalElements,
    totalPages: response.totalPages,
    isFirst: response.first,
    isLast: response.last
  });
  
  this._isLoading.set(false);
  this._isLoadingMore.set(false);
}
```

---

## 3. Optimización de Rendimiento

### 3.1 OnPush ChangeDetectionStrategy

Todos los componentes principales usan `OnPush` para evitar detección de cambios innecesaria:

```typescript
// frontend/src/app/pages/home/home.ts

@Component({
  selector: 'app-home',
  standalone: true,
  templateUrl: './home.html',
  changeDetection: ChangeDetectionStrategy.OnPush  // ✅ Optimización
})
export class Home implements OnInit {
  // Signals funcionan perfectamente con OnPush
  trendingAlbums = signal<AlbumView[]>([]);
  isLoading = signal<boolean>(true);
}
```

**Componentes con OnPush:**

| Componente | Ubicación |
|------------|-----------|
| `Home` | `pages/home/home.ts` |
| `SearchResultsComponent` | `pages/search-results/search-results.ts` |
| `SearchBar` | `components/shared/search-bar/search-bar.ts` |
| `InfiniteScrollComponent` | `components/shared/infinite-scroll/infinite-scroll.ts` |
| `Card` | `components/shared/card/card.ts` |
| `Spinner` | `components/shared/spinner/spinner.ts` |

### 3.2 TrackBy en Listas

Todas las listas grandes usan `track` para evitar re-renders innecesarios:

```html
<!-- frontend/src/app/pages/home/home.html -->

<!-- Angular 17+ @for syntax con track -->
@for (album of trendingAlbums(); track album.id) {
  <app-card
    [title]="album.title"
    [subtitle]="album.artist"
    [imageUrl]="album.imageUrl"
    (click)="viewAlbumDetails(album.id)"
  />
}
```

```typescript
// Función trackBy para compatibilidad
trackByAlbumId(index: number, album: AlbumView): number | string {
  return album.id;
}
```

### 3.3 Unsubscribe Automático con takeUntilDestroyed

Todas las suscripciones usan `takeUntilDestroyed` para evitar memory leaks:

```typescript
// frontend/src/app/pages/home/home.ts

export class Home implements OnInit {
  private destroyRef = inject(DestroyRef);

  ngOnInit(): void {
    this.loadAlbums();
  }

  private loadAlbums(): void {
    this.albumService.getNewReleases()
      .pipe(takeUntilDestroyed(this.destroyRef))  // ✅ Auto-unsubscribe
      .subscribe({
        next: (albums) => {
          this.trendingAlbums.set(albumViews.slice(0, 25));
          this.isLoading.set(false);
        },
        error: (error) => {
          console.error('Error:', error);
          this.loadMockData();
        }
      });
  }
}
```

**Patrón alternativo con Subject (componentes legacy):**

```typescript
// Para componentes que no pueden usar DestroyRef
export class SearchBar implements OnInit, OnDestroy {
  private destroy$ = new Subject<void>();

  ngOnInit(): void {
    this.searchInput$.pipe(
      debounceTime(300),
      takeUntil(this.destroy$)  // ✅ Limpieza manual
    ).subscribe(/* ... */);
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
```

### 3.4 Async Pipe Implícito con Signals

Los Signals se usan directamente en templates sin async pipe:

```html
<!-- NO necesita async pipe -->
@if (isLoading()) {
  <app-spinner />
}

@for (album of albums(); track album.id) {
  <app-card [album]="album" />
}
```

---

## 4. Paginación y Scroll Infinito

### 4.1 Componente InfiniteScrollComponent

**Ubicación:** `frontend/src/app/components/shared/infinite-scroll/infinite-scroll.ts`

**Características:**
- Usa **Intersection Observer API** (más eficiente que scroll events)
- Elemento "sentinel" invisible al final de la lista
- Estados de carga, error y fin de resultados
- Conserva posición de scroll automáticamente

```typescript
@Component({
  selector: 'app-infinite-scroll',
  standalone: true,
  template: `
    <div class="infinite-scroll" #sentinel>
      @if (loading) {
        <div class="infinite-scroll__loading">
          <app-spinner [size]="'md'"></app-spinner>
          <span>{{ loadingText }}</span>
        </div>
      }

      @if (!loading && !hasMore && showEndMessage) {
        <div class="infinite-scroll__end">
          <span>{{ endText }}</span>
        </div>
      }

      @if (error()) {
        <div class="infinite-scroll__error">
          <span>{{ error() }}</span>
          <button (click)="retry()">Reintentar</button>
        </div>
      }
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class InfiniteScrollComponent implements OnInit, OnDestroy {
  @Input() loading = false;
  @Input() hasMore = true;
  @Input() threshold = 100;  // px antes del final
  @Output() loadMore = new EventEmitter<void>();

  private observer: IntersectionObserver | null = null;

  ngOnInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      this.setupIntersectionObserver();
    }
  }

  private setupIntersectionObserver(): void {
    const options: IntersectionObserverInit = {
      root: null,
      rootMargin: `${this.threshold}px`,
      threshold: 0
    };

    this.observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting && !this.loading && this.hasMore) {
          this.loadMore.emit();
        }
      });
    }, options);

    this.observer.observe(this.elementRef.nativeElement);
  }

  ngOnDestroy(): void {
    this.observer?.disconnect();
  }
}
```

### 4.2 Uso del Infinite Scroll

```html
<!-- frontend/src/app/pages/search-results/search-results.html -->

<div class="results-grid">
  @for (result of filteredResults(); track result.id) {
    <app-card
      [title]="result.title"
      [subtitle]="result.subtitle"
      [imageUrl]="result.imageUrl"
    />
  }
</div>

<!-- Componente de infinite scroll al final -->
<app-infinite-scroll
  [loading]="isLoadingMore()"
  [hasMore]="hasMore()"
  [loadingText]="'Cargando más resultados...'"
  [endText]="'No hay más resultados'"
  (loadMore)="loadMoreResults()"
/>
```

### 4.3 Estado de Paginación

```typescript
export interface PaginationState {
  page: number;        // Página actual (0-indexed)
  size: number;        // Elementos por página
  totalElements: number;
  totalPages: number;
  isFirst: boolean;
  isLast: boolean;
}
```

---

## 5. Búsqueda y Filtrado en Tiempo Real

### 5.1 SearchBar con Debounce

**Ubicación:** `frontend/src/app/components/shared/search-bar/search-bar.ts`

```typescript
@Component({
  selector: 'app-search-bar',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SearchBar implements OnInit, OnDestroy {
  @Output() onSearch = new EventEmitter<string>();
  @Output() onSearchInstant = new EventEmitter<string>();
  
  @Input() instant = false;      // Búsqueda mientras escribes
  @Input() debounceMs = 300;     // Tiempo de debounce
  @Input() minChars = 2;         // Mínimo de caracteres
  
  private searchInput$ = new Subject<string>();
  private destroy$ = new Subject<void>();

  ngOnInit(): void {
    this.setupDebounce();
  }

  private setupDebounce(): void {
    this.searchInput$.pipe(
      debounceTime(this.debounceMs),     // ✅ 300ms de espera
      distinctUntilChanged(),             // ✅ Solo si cambió
      filter(term => {
        if (!term.trim()) {
          this.onSearchInstant.emit('');
          return false;
        }
        return term.trim().length >= this.minChars;
      }),
      takeUntil(this.destroy$)
    ).subscribe(term => {
      if (this.instant) {
        this.onSearchInstant.emit(term);
        this.albumState.search(term);     // Actualiza servicio de estado
      }
    });
  }

  updateSearchTerm(value: string): void {
    this.searchTerm.set(value);
    this.searchInput$.next(value);        // Emitir para debounce
  }
}
```

### 5.2 Actualización sin Flickering

El debounce y el manejo de estado evitan flickering:

```typescript
// AlbumStateService - Búsqueda con debounce
private setupSearchSubscription(): void {
  this.searchTrigger$.pipe(
    debounceTime(300),
    distinctUntilChanged(),
    tap(query => {
      this._isLoading.set(true);     // Mostrar loading
      this._error.set(null);
      this._pagination.update(p => ({ ...p, page: 0 }));
      this._albums.set([]);          // Limpiar antes de nueva búsqueda
    }),
    switchMap(query => this.fetchAlbums(query, 0)),  // ✅ Cancela peticiones anteriores
    takeUntilDestroyed(this.destroyRef)
  ).subscribe({
    next: (response) => this.handleAlbumsResponse(response, false),
    error: (err) => this.handleFetchError(err)
  });
}
```

**Características anti-flickering:**

| Técnica | Descripción |
|---------|-------------|
| `debounceTime(300)` | Espera 300ms antes de buscar |
| `distinctUntilChanged()` | Ignora valores duplicados |
| `switchMap()` | Cancela peticiones anteriores |
| Loading state | Muestra spinner durante carga |

---

## 6. Integración con API Externa (Deezer)

### 6.1 Arquitectura Híbrida

La aplicación usa una arquitectura híbrida:

```
┌─────────────────────────────────────────────────────────────┐
│                        FRONTEND                             │
├─────────────────────────────────────────────────────────────┤
│  AlbumService / ArtistService / SongService                 │
│  (Servicios de alto nivel)                                  │
├─────────────────┬───────────────────────────────────────────┤
│  DeezerService  │  Backend API (Spring Boot)                │
│  ┌────────────┐ │  ┌────────────────────────────┐           │
│  │ Álbumes    │ │  │ Reseñas de usuarios        │           │
│  │ Artistas   │ │  │ Ratings personalizados     │           │
│  │ Canciones  │ │  │ Favoritos                  │           │
│  │ Charts     │ │  │ Autenticación              │           │
│  └────────────┘ │  └────────────────────────────┘           │
│  (Datos públicos)│  (Datos de usuario)                      │
└─────────────────┴───────────────────────────────────────────┘
```

### 6.2 DeezerService

**Ubicación:** `frontend/src/app/services/deezer.service.ts`

**Ventajas de Deezer sobre Spotify:**

| Característica | Deezer | Spotify |
|----------------|--------|---------|
| **Autenticación** | ❌ No requiere | ✅ Requiere OAuth |
| **Rate limiting** | 50 req/5 seg | Más estricto |
| **API pública** | ✅ Sí | ❌ Cerrada (2026) |
| **Datos disponibles** | Álbumes, artistas, tracks, charts | Similar |
| **Imágenes** | HD (cover_xl) | HD |
| **Preview audio** | 30 segundos | 30 segundos |

```typescript
// frontend/src/app/services/deezer.service.ts

const DEEZER_CONFIG = {
  apiBaseUrl: 'https://api.deezer.com',
  corsProxy: 'https://corsproxy.io/?',  // Para desarrollo local
};

@Injectable({ providedIn: 'root' })
export class DeezerService {
  private readonly http = inject(HttpClient);
  private chartCache$: Observable<DeezerChart> | null = null;

  /**
   * Obtiene 50 álbumes del chart (populares)
   */
  getChartAlbums(limit: number = 50): Observable<DeezerAlbum[]> {
    const url = this.buildUrl(`/chart/0/albums?limit=${limit}`);
    return this.http.get<{ data: DeezerAlbum[] }>(url).pipe(
      map(response => response.data || []),
      catchError(() => of([]))
    );
  }

  /**
   * Busca álbumes por query
   */
  searchAlbums(query: string, limit: number = 25): Observable<DeezerAlbum[]> {
    const url = this.buildUrl(`/search/album?q=${encodeURIComponent(query)}&limit=${limit}`);
    return this.http.get<{ data: DeezerAlbum[] }>(url).pipe(
      map(response => response.data || []),
      catchError(() => of([]))
    );
  }

  /**
   * Construye URL con CORS proxy si es necesario
   */
  private buildUrl(endpoint: string): string {
    const url = `${DEEZER_CONFIG.apiBaseUrl}${endpoint}`;
    if (window.location.hostname === 'localhost') {
      return `${DEEZER_CONFIG.corsProxy}${encodeURIComponent(url)}`;
    }
    return url;
  }
}
```

### 6.3 Mapeo Deezer → Modelo Frontend

```typescript
// frontend/src/app/services/album.service.ts

private mapDeezerAlbumToAlbum(deezerAlbum: DeezerAlbum): Album {
  return {
    id: String(deezerAlbum.id),
    title: deezerAlbum.title,
    artist: deezerAlbum.artist?.name || 'Artista Desconocido',
    artistId: String(deezerAlbum.artist?.id || ''),
    coverUrl: this.deezer.getBestAlbumCover(deezerAlbum),
    releaseYear: this.deezer.extractYear(deezerAlbum.release_date),
    genre: deezerAlbum.genres?.data?.[0]?.name || '',
    tracks: deezerAlbum.nb_tracks || 0,
    duration: '',
    label: deezerAlbum.label || '',
    description: '',
    averageRating: 0,           // Viene del backend
    totalReviews: deezerAlbum.fans || 0
  };
}
```

---

## 7. Comparativa de Opciones Evaluadas

### 7.1 Gestión de Estado

| Opción | Pros | Contras | Decisión |
|--------|------|---------|----------|
| **Angular Signals** | Nativo, moderno, granular, OnPush | Nuevo (v17+) | ✅ **Elegido** |
| **BehaviorSubject** | Familiar, RxJS completo | Más boilerplate | ✅ Complemento |
| **NgRx** | DevTools, escalable | Mucho boilerplate | ❌ Descartado |
| **Akita** | Simple, moderno | Librería externa | ❌ Descartado |

### 7.2 API de Música

| API | Autenticación | Rate Limit | Estado | Decisión |
|-----|---------------|------------|--------|----------|
| **Deezer** | ❌ No requiere | 50/5seg | ✅ Abierta | ✅ **Elegida** |
| **Spotify** | ✅ OAuth | Estricto | ❌ Cerrada (2026) | ❌ Descartada |
| **Last.fm** | 🔑 API Key | Moderado | ✅ Abierta | ⚠️ Alternativa |
| **MusicBrainz** | ❌ No requiere | Muy bajo | ✅ Abierta | ⚠️ Sin imágenes |

### 7.3 Infinite Scroll

| Técnica | Rendimiento | Complejidad | Decisión |
|---------|-------------|-------------|----------|
| **Intersection Observer** | ✅ Excelente | ⚠️ Media | ✅ **Elegida** |
| **Scroll Events** | ❌ Pobre | ✅ Baja | ❌ Descartada |
| **Virtual Scroll** | ✅ Excelente | ❌ Alta | ⚠️ Futuro |

---

## 8. Buenas Prácticas Aplicadas

### 8.1 Checklist de Optimización

| Práctica | Estado | Ubicación |
|----------|--------|-----------|
| ✅ OnPush en componentes | Implementado | Todos los componentes principales |
| ✅ TrackBy en listas | Implementado | `home.html`, `search-results.html` |
| ✅ takeUntilDestroyed | Implementado | Todos los servicios |
| ✅ Signals para estado | Implementado | `*-state.service.ts` |
| ✅ Computed para derivados | Implementado | `hasMore`, `isEmpty`, etc. |
| ✅ Debounce en búsqueda | Implementado | `SearchBar`, 300ms |
| ✅ switchMap para cancelar | Implementado | Búsquedas HTTP |
| ✅ shareReplay para caché | Implementado | `DeezerService` |
| ✅ Intersection Observer | Implementado | `InfiniteScrollComponent` |

### 8.2 Estructura de Archivos

```
frontend/src/app/
├── services/
│   ├── album-state.service.ts    # Estado con Signals
│   ├── review-state.service.ts   # Estado de reseñas
│   ├── album.service.ts          # Datos (Deezer + Backend)
│   ├── artist.service.ts         # Datos de artistas
│   ├── song.service.ts           # Datos de canciones
│   ├── deezer.service.ts         # API Deezer
│   └── event-bus.ts              # Comunicación entre servicios
├── components/shared/
│   ├── search-bar/               # Búsqueda con debounce
│   ├── infinite-scroll/          # Scroll infinito
│   ├── spinner/                  # Loading states
│   └── card/                     # Tarjetas reutilizables
└── pages/
    ├── home/                     # Página principal
    └── search-results/           # Resultados de búsqueda
```

### 8.3 Diagrama de Flujo de Datos

```
┌─────────────┐      ┌─────────────────┐      ┌──────────────┐
│   Usuario   │──────│   Componente    │──────│   Servicio   │
│  (Acción)   │      │   (Template)    │      │   de Estado  │
└─────────────┘      └─────────────────┘      └──────────────┘
                              │                      │
                              │ signal()             │ signal.set()
                              │ computed()           │ signal.update()
                              ▼                      ▼
                     ┌─────────────────┐      ┌──────────────┐
                     │   UI Actualiza  │◀─────│  API/Backend │
                     │   (OnPush)      │      │  (HTTP)      │
                     └─────────────────┘      └──────────────┘
```

---

## Resumen

Esta fase implementa un sistema de gestión de estado moderno y eficiente usando:

1. **Angular Signals** como patrón principal (complementado con BehaviorSubject para debounce)
2. **Actualización reactiva** sin recargas de página
3. **Optimización agresiva** con OnPush, trackBy, y limpieza automática de suscripciones
4. **Infinite scroll** con Intersection Observer
5. **Búsqueda en tiempo real** con debounce de 300ms
6. **Integración con Deezer API** para datos musicales reales

El resultado es una aplicación fluida, sin flickering, que conserva el estado del usuario y se actualiza en tiempo real.
