# Fase 7 - Testing y Cobertura de Codigo (Frontend)

> **Proyecto:** Discs & Records  
> **Tipo:** Aplicacion web estilo Letterboxd para musica  
> **Fecha:** 20 de enero de 2026

---

## Indice

1. [Introduccion](#1-introduccion)
2. [Configuracion del Entorno de Testing](#2-configuracion-del-entorno-de-testing)
3. [Arquitectura de Tests](#3-arquitectura-de-tests)
4. [Tests Unitarios de Componentes](#4-tests-unitarios-de-componentes)
5. [Tests Unitarios de Servicios](#5-tests-unitarios-de-servicios)
6. [Tests de Validadores](#6-tests-de-validadores)
7. [Tests de Resolvers y Guards](#7-tests-de-resolvers-y-guards)
8. [Tests de Integracion](#8-tests-de-integracion)
9. [Patrones de Mocking](#9-patrones-de-mocking)
10. [Cobertura de Codigo](#10-cobertura-de-codigo)
11. [Compatibilidad Cross-Browser](#11-compatibilidad-cross-browser)
12. [Optimizacion de Rendimiento](#12-optimizacion-de-rendimiento)
13. [Build de Produccion](#13-build-de-produccion)
14. [Buenas Practicas](#14-buenas-practicas)

---

## 1. Introduccion

Esta documentacion cubre la implementacion completa del sistema de testing para el frontend de Discs & Records. Se ha seguido una estrategia de cobertura incremental mediante "lotes" de tests, priorizando archivos con mas de 100 lineas y menos del 30% de cobertura.

### 1.1 Requisitos de la Rubrica

- Tests unitarios para componentes principales
- Tests unitarios para servicios HTTP y de estado
- Tests de validadores sincronos y asincronos
- Tests de resolvers y guards de rutas
- Tests de integracion para flujos completos
- Cobertura minima del 70% en lineas de codigo
- Configuracion para CI/CD

### 1.2 Resultados Finales de Cobertura

| Metrica | Valor | Objetivo |
|---------|-------|----------|
| Tests totales | 2325 | - |
| Tests exitosos | 2325 (100%) | 100% |
| Cobertura de lineas | 71.36% | 70% |
| Cobertura de statements | 70.58% | 70% |
| Cobertura de branches | 60.08% | 50% |
| Cobertura de funciones | 65.42% | 60% |

---

## 2. Configuracion del Entorno de Testing

### 2.1 Requisitos Previos

- Node.js >= 18.x
- npm >= 9.x
- Angular CLI >= 20.x
- Karma + Jasmine (incluidos en Angular)

### 2.2 Scripts Disponibles

```bash
# Ejecutar tests en modo watch (desarrollo)
npm test

# Ejecutar tests una sola vez con cobertura
npm run test:coverage

# Ejecutar tests para CI/CD (headless)
npm run test:ci

# Ejecutar linting
npm run lint

# Analizar tamano de bundles
npm run build:analyze
```

### 2.3 Configuracion de Karma

**Ubicacion:** `karma.conf.js`

```typescript
module.exports = function (config) {
  config.set({
    basePath: '',
    frameworks: ['jasmine', '@angular-devkit/build-angular'],
    plugins: [
      require('karma-jasmine'),
      require('karma-chrome-launcher'),
      require('karma-jasmine-html-reporter'),
      require('karma-coverage')
    ],
    client: {
      jasmine: {
        random: false // Tests en orden determinista
      },
      clearContext: false
    },
    coverageReporter: {
      dir: require('path').join(__dirname, './coverage'),
      subdir: '.',
      reporters: [
        { type: 'html' },
        { type: 'text-summary' },
        { type: 'lcovonly' }
      ]
    },
    reporters: ['progress', 'kjhtml'],
    browsers: ['ChromeHeadless'],
    restartOnFileChange: true
  });
};
```

---

## 3. Arquitectura de Tests

### 3.1 Estructura de Archivos

```
frontend/src/app/
├── components/
│   └── shared/
│       ├── input/
│       │   ├── input.ts
│       │   └── input.spec.ts
│       ├── tabs/
│       │   ├── tab-group.ts
│       │   ├── tab-group.spec.ts
│       │   ├── tab-panel.ts
│       │   ├── tab-panel.spec.ts
│       │   ├── responsive-tabs.ts
│       │   └── responsive-tabs.spec.ts
│       └── ...
├── services/
│   ├── album.service.ts
│   ├── album.service.spec.ts
│   ├── artist.service.ts
│   ├── artist.service.spec.ts
│   ├── song.service.ts
│   ├── song.service.spec.ts
│   └── ...
├── validators/
│   ├── password-strength.validator.ts
│   ├── password-strength.validator.spec.ts
│   ├── spanish-formats.validator.ts
│   ├── spanish-formats.validator.spec.ts
│   └── ...
├── resolvers/
│   ├── album.resolver.ts
│   ├── album.resolver.spec.ts
│   └── ...
└── guards/
    ├── auth.guard.ts
    ├── auth.guard.spec.ts
    └── ...
```

### 3.2 Convencion de Nombrado

- Archivo de test: `[nombre-componente].spec.ts`
- Suite de tests: `describe('[NombreComponente]', () => {...})`
- Caso de test: `it('should [comportamiento esperado]', () => {...})`

---

## 4. Tests Unitarios de Componentes

### 4.1 Componentes Testeados

#### Home Component (`home.spec.ts`)

| Test | Descripcion |
|------|-------------|
| Creacion del componente | Verifica instanciacion correcta |
| Estado de carga inicial | isLoading debe ser true al inicio |
| Carga de albumes desde servicio | Llama a AlbumService.getNewReleases |
| Manejo de respuesta vacia | Muestra mensaje cuando no hay datos |
| Manejo de errores de carga | Gestiona errores HTTP correctamente |
| Navegacion a detalles de album | Navega a /album/:id |
| Funcion de busqueda | Emite evento de busqueda |
| Apertura de modal de registro | Abre modal cuando no autenticado |
| TrackBy para optimizacion | trackByAlbumId retorna id correcto |
| Estado de autenticacion | Refleja estado de AppStateService |

#### Header Component (`header.spec.ts`)

| Test | Descripcion |
|------|-------------|
| Estado inicial del menu | Menu cerrado por defecto |
| Toggle del menu movil | Alterna isMenuOpen |
| Toggle de tema claro/oscuro | Cambia entre light/dark |
| Gestion de modales de autenticacion | Abre/cierra login, register, forgot |
| Navegacion entre modales | Transiciones entre modales |
| Eventos de teclado (ESC) | Cierra menu con Escape |
| Click fuera del menu | Cierra menu al click exterior |

#### LoginForm Component (`login-form.spec.ts`)

| Test | Descripcion |
|------|-------------|
| Controles del formulario | email y password existen |
| Validacion de email vacio | Error required |
| Validacion de formato de email | Error email |
| Validacion de contrasena vacia | Error required |
| Validacion de longitud minima | Error minlength |
| Formulario invalido cuando vacio | form.invalid = true |
| No llamar servicio si formulario invalido | AuthService no se llama |
| Estado isSubmitting durante envio | Indica carga en progreso |
| Evento onLoginSuccess | Emite al login exitoso |
| Reset del formulario tras exito | Limpia campos |
| Manejo de errores | Muestra notificacion de error |

#### RegisterForm Component (`register-form.spec.ts`)

| Test | Descripcion |
|------|-------------|
| Validacion de username | required, minLength(3), maxLength(20), pattern |
| Validacion de email | required, email |
| Validacion de contrasena (complejidad) | passwordStrength validator |
| Validacion de confirmacion | passwordMatch validator |
| Proceso de registro completo | Flujo end-to-end |
| Eventos de salida | onRegisterSuccess, onSwitchToLogin |

#### ForgotPasswordForm Component (`forgot-password-form.spec.ts`)

| Test | Descripcion |
|------|-------------|
| Creacion del componente | Instanciacion correcta |
| Validacion de email vacio | Error required |
| Validacion de formato de email | Error email |
| Estado isSubmitting | Indica envio en progreso |
| Envio exitoso | Muestra mensaje de confirmacion |
| Manejo de errores | Email no encontrado |
| Evento onSwitchToLogin | Navegacion a login |

### 4.2 Patron de Test de Componente

```typescript
describe('MiComponente', () => {
  let component: MiComponente;
  let fixture: ComponentFixture<MiComponente>;
  let mockService: jasmine.SpyObj<MiService>;

  beforeEach(async () => {
    mockService = jasmine.createSpyObj('MiService', ['metodo1', 'metodo2']);
    
    await TestBed.configureTestingModule({
      imports: [MiComponente],
      providers: [
        { provide: MiService, useValue: mockService }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(MiComponente);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call service on init', () => {
    mockService.metodo1.and.returnValue(of(mockData));
    fixture.detectChanges();
    expect(mockService.metodo1).toHaveBeenCalled();
  });
});
```

---

## 5. Tests Unitarios de Servicios

### 5.1 Servicios Testeados

#### AuthService (`auth.service.spec.ts`)

| Test | Descripcion |
|------|-------------|
| Creacion del servicio | Inyeccion correcta |
| Login con mock data | environment.useMockData = true |
| Login con HTTP real | Llamada a backend |
| Manejo de credenciales invalidas | Error 401 |
| Logout completo | Limpia token y estado |
| Emision de eventos de logout | EventBus emite USER_LOGOUT |
| Estado de autenticacion | isAuthenticated signal |
| Restauracion de sesion | Token en localStorage |
| Limpieza de token invalido | JWT expirado |
| Registro de usuarios | POST /auth/register |
| Manejo de errores de registro | Email duplicado |

#### AlbumService (`album.service.spec.ts`)

| Test | Descripcion |
|------|-------------|
| getNewReleases con mock | Datos de MockDeezerService |
| getNewReleases con Deezer real | Llamada a DeezerService |
| Fallback a mock si Deezer falla | Manejo de errores |
| Mapeo de Deezer a modelo frontend | Transformacion de datos |
| Busqueda de albumes | searchAlbums() |
| Obtencion por ID | getAlbumById() |
| Obtencion de tracks | getAlbumTracks() |
| Obtencion de resenas | getAlbumReviews() |

#### ArtistService (`artist.service.spec.ts`)

| Test | Descripcion |
|------|-------------|
| Creacion del servicio | Inyeccion correcta |
| getChartArtists con mock | Artistas populares |
| getArtistById | Artista por ID |
| searchArtists | Busqueda de artistas |
| getArtistAlbums | Albumes del artista |
| getArtistTopTracks | Canciones top |
| Mapeo DeezerArtist a Artist | Transformacion de datos |
| getBestArtistPicture | Seleccion de imagen |

#### SongService (`song.service.spec.ts`)

| Test | Descripcion |
|------|-------------|
| Creacion del servicio | Inyeccion correcta |
| getChartTracks con mock | Canciones populares |
| getSongById | Cancion por ID |
| searchTracks | Busqueda de canciones |
| getTrackLyrics | Letras de cancion |
| Mapeo DeezerTrack a Song | Transformacion de datos |
| formatDuration | Formato mm:ss |

### 5.2 Patron de Mocking para Servicios con DeezerService

Los servicios que usan `DeezerService` y `MockDeezerService` requieren un patron especifico de mocking:

```typescript
describe('ArtistService', () => {
  let service: ArtistService;
  let deezerSpy: jasmine.SpyObj<DeezerService>;
  let mockDeezerSpy: jasmine.SpyObj<MockDeezerService>;

  const mockDeezerArtist: DeezerArtist = {
    id: 123,
    name: 'Test Artist',
    picture: 'https://example.com/artist.jpg',
    picture_small: 'https://example.com/artist-small.jpg',
    picture_medium: 'https://example.com/artist-medium.jpg',
    picture_big: 'https://example.com/artist-big.jpg',
    picture_xl: 'https://example.com/artist-xl.jpg',
    nb_album: 10,
    nb_fan: 1000000
  };

  beforeEach(() => {
    deezerSpy = jasmine.createSpyObj('DeezerService', [
      'getChartArtists', 'getArtistById', 'searchArtists',
      'getArtistAlbums', 'getArtistTopTracks', 'formatDuration',
      'getBestAlbumCover', 'getBestArtistPicture', 'extractYear'
    ]);

    mockDeezerSpy = jasmine.createSpyObj('MockDeezerService', [
      'getChartArtists', 'getArtistById', 'searchArtists',
      'getArtistAlbums', 'getArtistTopTracks', 'formatDuration',
      'getBestAlbumCover', 'getBestArtistPicture', 'extractYear'
    ]);

    // Configurar retornos por defecto
    mockDeezerSpy.getChartArtists.and.returnValue(of({ data: [mockDeezerArtist] }));
    mockDeezerSpy.getBestArtistPicture.and.returnValue('https://example.com/artist.jpg');

    TestBed.configureTestingModule({
      providers: [
        { provide: MockDeezerService, useValue: mockDeezerSpy },
        { provide: DeezerService, useValue: deezerSpy },
        ArtistService
      ]
    });

    // Activar modo mock
    environment.useMockData = true;
    service = TestBed.inject(ArtistService);
  });

  it('should get chart artists from mock service', (done) => {
    service.getChartArtists().subscribe(artists => {
      expect(artists.length).toBe(1);
      expect(artists[0].name).toBe('Test Artist');
      done();
    });
  });
});
```

---

## 6. Tests de Validadores

### 6.1 Validadores Sincronos

#### Password Strength Validator (`password-strength.validator.spec.ts`)

| Test | Descripcion |
|------|-------------|
| Contrasena vacia | Retorna null (sin error) |
| Contrasena corta | Error minLength |
| Sin mayusculas | Error noUppercase |
| Sin minusculas | Error noLowercase |
| Sin numeros | Error noNumber |
| Sin caracteres especiales | Error noSpecial |
| Contrasena valida | Retorna null |

#### Spanish Formats Validator (`spanish-formats.validator.spec.ts`)

| Test | Descripcion |
|------|-------------|
| NIF valido (DNI) | 12345678Z valido |
| NIF invalido (letra incorrecta) | Error nifInvalid |
| NIE valido | X1234567L valido |
| Telefono valido (+34) | +34 612345678 |
| Telefono valido (sin prefijo) | 612345678 |
| Codigo postal valido | 28001 (Madrid) |
| Codigo postal invalido | 00000 error |

#### Cross-Field Validators (`cross-field.validators.spec.ts`)

| Test | Descripcion |
|------|-------------|
| passwordMatch valido | password === confirmPassword |
| passwordMatch invalido | Error passwordMismatch |
| dateRange valido | startDate < endDate |
| dateRange invalido | Error dateRangeInvalid |
| requiredIf condicion true | Campo requerido |
| requiredIf condicion false | Campo opcional |

### 6.2 Validadores Asincronos

#### Async Validators (`async.validators.spec.ts`)

| Test | Descripcion |
|------|-------------|
| emailExists (existe) | Error emailTaken |
| emailExists (no existe) | Retorna null |
| usernameExists (existe) | Error usernameTaken |
| usernameExists (no existe) | Retorna null |
| Debounce de 300ms | Espera antes de validar |
| Cancelacion de peticiones | switchMap cancela anteriores |

---

## 7. Tests de Resolvers y Guards

### 7.1 Resolvers

#### Album Resolver (`album.resolver.spec.ts`)

| Test | Descripcion |
|------|-------------|
| Resuelve album por ID | Retorna Observable Album |
| Manejo de album no encontrado | Navega a 404 |
| Manejo de errores HTTP | Notifica error |

#### Artist Resolver (`artist.resolver.spec.ts`)

| Test | Descripcion |
|------|-------------|
| Resuelve artista por ID | Retorna Observable Artist |
| Manejo de artista no encontrado | Navega a 404 |

#### Song Resolver (`song.resolver.spec.ts`)

| Test | Descripcion |
|------|-------------|
| Resuelve cancion por ID | Retorna Observable Song |
| Manejo de cancion no encontrada | Navega a 404 |

### 7.2 Guards

#### Auth Guard (`auth.guard.spec.ts`)

| Test | Descripcion |
|------|-------------|
| Usuario autenticado | Permite acceso (true) |
| Usuario no autenticado | Redirige a login |
| Preserva URL destino | returnUrl en queryParams |

#### Admin Guard (`admin.guard.spec.ts`)

| Test | Descripcion |
|------|-------------|
| Usuario admin | Permite acceso |
| Usuario no admin | Redirige a home |
| Usuario no autenticado | Redirige a login |

---

## 8. Tests de Integracion

### 8.1 Flujo de Autenticacion (`auth-flow.integration.spec.ts`)

```typescript
describe('Auth Flow Integration', () => {
  it('should complete login flow with HTTP', fakeAsync(() => {
    // 1. Usuario ingresa credenciales
    // 2. AuthService llama a backend
    // 3. Token se guarda en localStorage
    // 4. AppStateService actualiza estado
    // 5. EventBus emite USER_LOGIN
    // 6. Header muestra menu de usuario
  }));

  it('should handle login failure', fakeAsync(() => {
    // 1. Credenciales invalidas
    // 2. Backend retorna 401
    // 3. NotificationService muestra error
    // 4. Formulario permite reintento
  }));

  it('should restore session on page reload', fakeAsync(() => {
    // 1. Token valido en localStorage
    // 2. AuthService valida token
    // 3. Estado se restaura
    // 4. Usuario permanece autenticado
  }));
});
```

### 8.2 Flujo de Busqueda (`search-flow.integration.spec.ts`)

```typescript
describe('Search Flow Integration', () => {
  it('should search and display results', fakeAsync(() => {
    // 1. Usuario escribe en SearchBar
    // 2. Debounce de 300ms
    // 3. AlbumStateService busca
    // 4. Resultados se muestran en grid
    // 5. Click navega a detalle
  }));

  it('should handle empty results', fakeAsync(() => {
    // 1. Busqueda sin resultados
    // 2. Mensaje "No se encontraron resultados"
    // 3. Sugerencias alternativas
  }));
});
```

---

## 9. Patrones de Mocking

### 9.1 Mocking de Servicios con inject()

Angular 20 usa `inject()` en lugar de constructor injection. Esto requiere configuracion especifica en TestBed:

```typescript
// Servicio que usa inject()
@Injectable({ providedIn: 'root' })
export class MiServicio {
  private http = inject(HttpClient);
  private deezer = inject(DeezerService);
  
  getData(): Observable<Data> {
    return this.deezer.fetchData();
  }
}

// Test del servicio
describe('MiServicio', () => {
  let service: MiServicio;
  let deezerSpy: jasmine.SpyObj<DeezerService>;

  beforeEach(() => {
    deezerSpy = jasmine.createSpyObj('DeezerService', ['fetchData']);
    
    TestBed.configureTestingModule({
      providers: [
        { provide: DeezerService, useValue: deezerSpy },
        MiServicio
      ]
    });

    service = TestBed.inject(MiServicio);
  });
});
```

### 9.2 Mocking de HttpClient

```typescript
describe('HttpService', () => {
  let service: MiService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [MiService]
    });

    service = TestBed.inject(MiService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should make GET request', () => {
    service.getData().subscribe(data => {
      expect(data).toEqual(mockData);
    });

    const req = httpMock.expectOne('/api/data');
    expect(req.request.method).toBe('GET');
    req.flush(mockData);
  });
});
```

### 9.3 Mocking de Router

```typescript
describe('Navegacion', () => {
  let router: jasmine.SpyObj<Router>;

  beforeEach(() => {
    router = jasmine.createSpyObj('Router', ['navigate', 'navigateByUrl']);
    
    TestBed.configureTestingModule({
      providers: [
        { provide: Router, useValue: router }
      ]
    });
  });

  it('should navigate to album detail', () => {
    component.goToAlbum('123');
    expect(router.navigate).toHaveBeenCalledWith(['/album', '123']);
  });
});
```

### 9.4 Mocking de Signals

```typescript
describe('Signal Testing', () => {
  it('should update computed signal', () => {
    const items = signal<Item[]>([]);
    const count = computed(() => items().length);

    expect(count()).toBe(0);

    items.set([{ id: 1 }, { id: 2 }]);
    expect(count()).toBe(2);
  });
});
```

---

## 10. Cobertura de Codigo

### 10.1 Objetivo de Cobertura

| Metrica | Minimo | Actual |
|---------|--------|--------|
| Lineas | 70% | 71.36% |
| Statements | 70% | 70.58% |
| Branches | 50% | 60.08% |
| Funciones | 60% | 65.42% |

### 10.2 Ejecutar Tests con Cobertura

```bash
npm run test:coverage
```

El reporte de cobertura se genera en `coverage/` y puede visualizarse abriendo `coverage/index.html`.

### 10.3 Areas Cubiertas

| Area | Cobertura |
|------|-----------|
| Componentes principales | 72% |
| Servicios de datos | 75% |
| Servicios de estado | 68% |
| Validadores | 85% |
| Resolvers | 70% |
| Guards | 65% |
| Utilidades | 60% |

### 10.4 Archivos con Mayor Cobertura

| Archivo | Lineas |
|---------|--------|
| password-strength.validator.ts | 95% |
| spanish-formats.validator.ts | 92% |
| auth.service.ts | 88% |
| album.service.ts | 85% |
| login-form.ts | 82% |

---

## 11. Compatibilidad Cross-Browser

### 11.1 Navegadores Objetivo

| Navegador | Versiones | Estado |
|-----------|-----------|--------|
| Chrome | Ultimas 2 | Soportado |
| Firefox | Ultimas 2 | Soportado |
| Safari | Ultimas 2 | Soportado |
| Edge | Ultimas 2 | Soportado |
| iOS Safari | Ultimas 2 | Soportado |
| Android Chrome | Ultimas 2 | Soportado |
| IE 11 | - | No soportado |

### 11.2 Configuracion de Browserslist

```
# .browserslistrc
last 2 Chrome versions
last 2 Firefox versions
last 2 Safari versions
last 2 Edge versions
last 2 iOS versions
last 2 ChromeAndroid versions
not IE 11
not < 0.5%
not dead
```

### 11.3 Verificar Navegadores Compilados

```bash
npx browserslist
```

### 11.4 Polyfills Incluidos

Angular 20 incluye automaticamente los polyfills necesarios:

- `zone.js` - Deteccion de cambios de Angular
- No se requiere `core-js` para ES5 (navegadores modernos)

### 11.5 Compatibilidad de Features

| Feature | Chrome | Firefox | Safari | Edge | Notas |
|---------|--------|---------|--------|------|-------|
| CSS Grid | Si | Si | Si | Si | Completo |
| Flexbox | Si | Si | Si | Si | Completo |
| CSS Variables | Si | Si | Si | Si | Completo |
| ES2022 | Si | Si | Si | Si | Con transpilacion |
| Signals | Si | Si | Si | Si | Angular nativo |

---

## 12. Optimizacion de Rendimiento

### 12.1 Lazy Loading Verificado

Todas las rutas usan `loadComponent()` para carga perezosa:

```typescript
// app.routes.ts
{
  path: '',
  loadComponent: () => import('./pages/home/home').then(m => m.Home),
}
```

### 12.2 Verificar Chunks Generados

```bash
npm run build:prod
```

Salida esperada:

```
Initial chunk files:
- main.xxxxx.js (~200KB)
- polyfills.xxxxx.js (~35KB)
- styles.xxxxx.css (~50KB)

Lazy chunk files:
- home.xxxxx.js
- search-results.xxxxx.js
- profile.xxxxx.js
- admin.xxxxx.js
```

### 12.3 Budgets de Produccion

```json
// angular.json
"budgets": [
  {
    "type": "initial",
    "maximumWarning": "2MB",
    "maximumError": "5MB"
  },
  {
    "type": "anyComponentStyle",
    "maximumWarning": "32kB",
    "maximumError": "64kB"
  }
]
```

### 12.4 Optimizaciones Implementadas

1. **ChangeDetectionStrategy.OnPush** - En componentes principales
2. **TrackBy en @for** - Para listas de albumes
3. **takeUntilDestroyed** - Para subscripciones RxJS
4. **Tree Shaking** - Automatico en produccion
5. **Minificacion** - Scripts y estilos
6. **Inlining Critical CSS** - Para First Contentful Paint

---

## 13. Build de Produccion

### 13.1 Comando de Build

```bash
npm run build:prod
```

### 13.2 Configuracion de Produccion

```json
// angular.json - production config
{
  "outputHashing": "all",
  "optimization": {
    "scripts": true,
    "styles": {
      "minify": true,
      "inlineCritical": true
    },
    "fonts": true
  },
  "namedChunks": false,
  "aot": true
}
```

### 13.3 Verificacion Post-Build

1. **Sin errores ni warnings**
   ```bash
   npm run build:prod 2>&1 | grep -E "(error|warning)"
   ```

2. **Tamano de bundles**
   ```bash
   ls -la dist/Proyecto_Disc_and_Records/browser/*.js
   ```

3. **Assets copiados**
   ```bash
   ls -la dist/Proyecto_Disc_and_Records/browser/assets/
   ```

### 13.4 Despliegue

El build genera archivos estaticos en `dist/Proyecto_Disc_and_Records/browser/`.

Para SPA routing, configurar el servidor para redirigir todas las rutas a `index.html`:

**Nginx:**
```nginx
location / {
  try_files $uri $uri/ /index.html;
}
```

**Docker:**
Ver `nginx.prod.conf` para configuracion completa.

---

## 14. Buenas Practicas

### 14.1 Estructura de Tests

```typescript
describe('ComponentName', () => {
  // Arrange - configuracion comun
  let component: Component;
  let fixture: ComponentFixture<Component>;

  beforeEach(async () => {
    // Setup de TestBed
  });

  describe('initialization', () => {
    it('should create', () => {});
    it('should have default values', () => {});
  });

  describe('user interactions', () => {
    it('should handle click', () => {});
    it('should validate input', () => {});
  });

  describe('error handling', () => {
    it('should show error message', () => {});
    it('should recover from error', () => {});
  });
});
```

### 14.2 AAA Pattern

```typescript
it('should add item to list', () => {
  // Arrange
  const item = { id: 1, name: 'Test' };
  
  // Act
  component.addItem(item);
  
  // Assert
  expect(component.items()).toContain(item);
});
```

### 14.3 Evitar Anti-Patterns

**No hacer:**
```typescript
// Anti-pattern: test demasiado grande
it('should do everything', () => {
  // 100 lineas de codigo
});
```

**Hacer:**
```typescript
// Patron correcto: tests pequenos y enfocados
it('should validate email format', () => {
  component.email.setValue('invalid');
  expect(component.email.hasError('email')).toBeTrue();
});

it('should accept valid email', () => {
  component.email.setValue('user@example.com');
  expect(component.email.valid).toBeTrue();
});
```

### 14.4 Async Testing

```typescript
// Con fakeAsync
it('should debounce search', fakeAsync(() => {
  component.search('test');
  tick(300); // Esperar debounce
  expect(service.search).toHaveBeenCalledWith('test');
}));

// Con done callback
it('should fetch data', (done) => {
  service.getData().subscribe(data => {
    expect(data).toBeDefined();
    done();
  });
});

// Con async/await
it('should load component', async () => {
  await fixture.whenStable();
  expect(component.isLoaded()).toBeTrue();
});
```

### 14.5 Limpieza de Recursos

```typescript
describe('Component with subscriptions', () => {
  let subscription: Subscription;

  afterEach(() => {
    subscription?.unsubscribe();
  });

  it('should subscribe to observable', () => {
    subscription = service.data$.subscribe(data => {
      expect(data).toBeDefined();
    });
  });
});
```

---

## Anexo: Ejecucion de Tests

### Desarrollo

```bash
npm test
```

### CI/CD

```bash
npm run test:ci
```

### Con Cobertura

```bash
npm run test:coverage
```

### Solo un archivo especifico

```bash
ng test --include="**/home.spec.ts"
```

---

*Documentacion generada: Enero 2026*  
*Version Angular: 20.3.0*  
*Cobertura final: 71.36% lineas*
