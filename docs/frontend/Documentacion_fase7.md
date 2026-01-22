# Fase 7 - Testing, Optimizacion y Despliegue (Frontend)

> **Proyecto:** Discs & Records  
> **Tipo:** Aplicacion web estilo Letterboxd para musica  
> **Fecha:** 20 de enero de 2026 (Actualizado: 22 de enero de 2026)

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
14. [Despliegue en Produccion](#14-despliegue-en-produccion)
15. [Documentacion Tecnica Final](#15-documentacion-tecnica-final)
16. [Buenas Practicas](#16-buenas-practicas)

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

### 12.1 Resumen de Metricas

| Metrica | Objetivo | Resultado | Estado |
|---------|----------|-----------|--------|
| Initial Bundle | < 500 kB | 490.43 kB | PASS |
| Transfer Size | < 150 kB | 134.56 kB | PASS |
| Lazy Chunks | Implementados | 27+ chunks | PASS |
| Tree Shaking | Habilitado | Produccion | PASS |
| Code Splitting | Habilitado | @defer + routes | PASS |

### 12.2 Analisis del Bundle Inicial

```
Initial chunk files   | Names          |  Raw size | Transfer size
──────────────────────┼────────────────┼───────────┼──────────────
chunk-5J5HJDRF.js     | angular-core   | 202.93 kB |  58.64 kB
chunk-CFRPSS3S.js     | rxjs+common    |  92.40 kB |  23.31 kB
main-UMIB4FSC.js      | main           |  47.05 kB |  10.33 kB
polyfills-5CFQRCPP.js | polyfills      |  34.59 kB |  11.33 kB
chunk-*.js (15 mas)   | varios         | 113.46 kB |  31.95 kB
styles-FW4JHBEB.css   | styles         |   4.97 kB |   1.14 kB
──────────────────────┴────────────────┼───────────┼──────────────
                      TOTAL INICIAL    | 490.43 kB | 134.56 kB
```

### 12.3 Lazy Loading Verificado

Todas las rutas usan `loadComponent()` para carga perezosa:

```typescript
// app.routes.ts
{
  path: '',
  loadComponent: () => import('./pages/home/home').then(m => m.Home),
  data: { preload: true, critical: true }
}
```

**Lazy Chunks Generados:**

| Chunk | Tamano | Descripcion |
|-------|--------|-------------|
| style-guide | 119.63 kB | Guia de estilo (solo desarrollo) |
| detail | 44.62 kB | Pagina de detalle de album |
| search-results | 21.61 kB | Resultados de busqueda |
| profile | 19.07 kB | Perfil de usuario |
| settings | 13.56 kB | Configuracion |
| home | 13.75 kB | Pagina principal |
| + 27 mas | ~150 kB | Otros componentes |

### 12.4 Estrategia de Precarga Adaptativa

```typescript
// NetworkAwarePreloadingStrategy
// Ubicacion: frontend/src/app/strategies/network-aware-preloading.strategy.ts

// Comportamiento segun conexion:
// - 4G/WiFi: precarga todo marcado con preload:true
// - 3G: solo precarga rutas critical:true
// - 2G/slow-2g: no precarga nada
// - saveData:true: respeta preferencia del usuario
```

### 12.5 @defer para Componentes Modales

Los formularios de autenticacion se cargan con `@defer` para reducir el bundle inicial:

```html
<!-- header.html - Modal de Login -->
<app-modal [isOpen]="activeModal() === 'login'">
  @defer (when activeModal() === 'login') {
    <app-login-form></app-login-form>
  } @loading {
    <div class="modal-loading">
      <span class="modal-loading__spinner"></span>
      <span>Cargando...</span>
    </div>
  }
</app-modal>
```

**Impacto de @defer:**

| Antes | Despues | Reduccion |
|-------|---------|-----------|
| 549.15 kB | 490.43 kB | -58.72 kB (10.7%) |

### 12.6 Tree Shaking

Todos los servicios usan `providedIn: 'root'` para tree-shaking automatico:

```typescript
@Injectable({ providedIn: 'root' })
export class AlbumService { ... }
```

### 12.7 Optimizaciones Adicionales

**Imagenes:**
- Formatos WebP para todas las imagenes
- `srcset` para responsive images
- `fetchpriority="high"` para LCP
- `loading="lazy"` para imagenes below-the-fold

**CSS:**
- CSS critico inlineado (`inlineCritical: true`)
- Minificacion de estilos
- Variables CSS para theming (sin duplicacion)

**JavaScript:**
- AOT compilation
- Minificacion y mangling
- Subresource Integrity habilitado
- Output hashing para cache-busting

### 12.8 Historial de Optimizaciones

| Fecha | Cambio | Antes | Despues | Reduccion |
|-------|--------|-------|---------|-----------|
| 2026-01-22 | @defer en formularios auth | 549.15 kB | 490.43 kB | -58.72 kB |
| 2026-01-22 | Budget ajustado a 500KB | 600 kB | 500 kB | Objetivo reducido |
| 2026-01-22 | Correccion warnings SCSS | 3 warnings | 0 warnings | Sass 3.0 ready |
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
  "aot": true,
  "subresourceIntegrity": true
}
```

### 13.3 Budgets Configurados

```json
{
  "budgets": [
    {
      "type": "initial",
      "maximumWarning": "500kB",
      "maximumError": "750kB"
    },
    {
      "type": "anyComponentStyle",
      "maximumWarning": "16kB",
      "maximumError": "32kB"
    }
  ]
}
```

### 13.4 Verificacion Post-Build

```bash
# 1. Build sin errores
npm run build:prod

# 2. Analisis de bundles con source-map-explorer
npm run build:analyze

# 3. Verificar base-href
cat dist/Proyecto_Disc_and_Records/browser/index.html | grep "base href"
# Resultado esperado: <base href="/">
```

### 13.5 Estructura del Build

```
dist/Proyecto_Disc_and_Records/browser/
├── index.html                 # Punto de entrada SPA
├── main-XXXXXXXX.js           # Codigo principal
├── polyfills-XXXXXXXX.js      # Polyfills
├── styles-XXXXXXXX.css        # Estilos globales
├── chunk-XXXXXXXX.js          # Lazy chunks (27+)
├── assets/
│   ├── fonts/                 # Tipografias
│   ├── images/                # Imagenes WebP
│   └── silhouettes/           # Siluetas para perfil
├── 3rdpartylicenses.txt       # Licencias de dependencias
└── favicon.ico                # Favicon
```

---

## 14. Despliegue en Produccion

### 14.1 Plataforma de Despliegue

**DigitalOcean App Platform** con arquitectura de microservicios:

| Componente | Tecnologia | Puerto |
|------------|------------|--------|
| Frontend | Nginx + Angular | 80 |
| Backend | Spring Boot | 8080 |
| Database | MariaDB Managed | 25060 |

### 14.2 Configuracion de Nginx para SPA

**Ubicacion:** `frontend/nginx.conf`

```nginx
server {
    listen 80;
    server_name localhost;
    root /usr/share/nginx/html;
    index index.html;

    # Gzip compression
    gzip on;
    gzip_vary on;
    gzip_min_length 1024;
    gzip_types text/plain text/css text/javascript 
               application/javascript application/json;

    # Cache de assets estaticos
    location ~* \.(js|css|png|jpg|jpeg|gif|ico|svg|woff|woff2)$ {
        expires 1y;
        add_header Cache-Control "public, immutable";
    }

    # SPA fallback - CRITICO para rutas de Angular
    location / {
        try_files $uri $uri/ /index.html;
    }

    # Security headers
    add_header X-Frame-Options "SAMEORIGIN" always;
    add_header X-Content-Type-Options "nosniff" always;
    add_header X-XSS-Protection "1; mode=block" always;
}
```

### 14.3 Deteccion Automatica de API

**Ubicacion:** `frontend/src/app/config/api.config.ts`

```typescript
function getBaseUrl(): string {
  const hostname = window.location.hostname;
  const port = window.location.port;

  // Desarrollo local con ng serve
  if (port === '4200') {
    return 'http://localhost:8080/api';
  }

  // Docker local
  if (hostname === 'localhost' || hostname === '127.0.0.1') {
    return 'http://localhost:8080/api';
  }

  // DigitalOcean produccion
  if (hostname.includes('ondigitalocean.app')) {
    return 'https://discs-n-records-ksgvk.ondigitalocean.app/api';
  }

  // Fallback: mismo origen
  return '/api';
}
```

### 14.4 Dockerfile Multi-Stage

**Ubicacion:** `frontend/Dockerfile`

```dockerfile
# Stage 1: Build
FROM node:22-alpine AS builder
WORKDIR /app
COPY package*.json ./
RUN npm ci --prefer-offline --no-audit
COPY . .
RUN npm run build -- --configuration=production

# Stage 2: Serve con Nginx
FROM nginx:alpine-slim AS production
COPY nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=builder /app/dist/Proyecto_Disc_and_Records/browser \
     /usr/share/nginx/html
EXPOSE 80
HEALTHCHECK --interval=30s --timeout=5s --start-period=30s --retries=5 \
  CMD wget --no-verbose --tries=1 --spider http://localhost:80/ || exit 1
CMD ["nginx", "-g", "daemon off;"]
```

### 14.5 Verificacion Post-Despliegue

| Verificacion | URL | Esperado |
|--------------|-----|----------|
| Home | `/` | 200 OK, renderiza Home |
| Ruta SPA | `/buscar` | 200 OK, renderiza Search |
| API Health | `/api/actuator/health` | 200 OK, status UP |
| Assets | `/assets/images/logo.webp` | 200 OK, imagen |
| 404 Handling | `/ruta-inexistente` | Renderiza NotFound |

### 14.6 URL de Produccion

```
https://discs-n-records-ksgvk.ondigitalocean.app/
```

---

## 15. Documentacion Tecnica Final

### 15.1 Arquitectura del Proyecto

```
Proyecto_Disc_and_Records/
├── frontend/                    # Angular 20 + SCSS
│   ├── src/
│   │   ├── app/
│   │   │   ├── components/      # Componentes reutilizables
│   │   │   ├── pages/           # Paginas/rutas
│   │   │   ├── services/        # Servicios y estado
│   │   │   ├── guards/          # Route guards
│   │   │   ├── resolvers/       # Data resolvers
│   │   │   ├── validators/      # Validadores de formularios
│   │   │   ├── interceptors/    # HTTP interceptors
│   │   │   ├── models/          # Interfaces y tipos
│   │   │   └── config/          # Configuracion API
│   │   └── styles/              # SCSS global (ITCSS)
│   ├── Dockerfile               # Build multi-stage
│   └── nginx.conf               # Config servidor
├── backend/                     # Spring Boot 3.5
│   └── src/main/java/           # API REST
├── docs/                        # Documentacion
│   ├── frontend/                # Fases 1-7 frontend
│   ├── backend/                 # Documentacion backend
│   └── design/                  # Documentacion diseno
└── docker-compose.yml           # Orquestacion local
```

### 15.2 Stack Tecnologico

**Frontend:**

| Tecnologia | Version | Proposito |
|------------|---------|-----------|
| Angular | 20.3.9 | Framework SPA |
| TypeScript | 5.9.2 | Lenguaje tipado |
| SCSS | Dart Sass 3.0 | Preprocesador CSS |
| RxJS | 7.8.x | Programacion reactiva |
| Karma + Jasmine | Latest | Testing unitario |
| Nginx | Alpine | Servidor produccion |

**Backend:**

| Tecnologia | Version | Proposito |
|------------|---------|-----------|
| Spring Boot | 3.5.6 | Framework REST |
| Java | 21 LTS | Lenguaje |
| Maven | 3.9.x | Build tool |
| MariaDB | 11 | Base de datos |
| JPA/Hibernate | 6.x | ORM |

### 15.3 Decisiones Tecnicas Justificadas

#### Angular Signals vs NgRx

**Decision:** Angular Signals con BehaviorSubject hibrido.

**Justificacion:**
- Signals es la direccion oficial de Angular 17+
- Menor boilerplate que NgRx
- Rendimiento granular (solo actualiza componentes afectados)
- `computed()` para valores derivados sin suscripciones

#### Lazy Loading Completo

**Decision:** Todas las rutas usan `loadComponent()`.

**Justificacion:**
- Bundle inicial < 500KB
- Carga bajo demanda mejora FCP/LCP
- Preloading adaptativo segun conexion

#### @defer para Modales

**Decision:** Formularios de auth con @defer.

**Justificacion:**
- Reduccion de 58KB en bundle inicial
- Solo carga cuando usuario abre modal
- Spinner de loading para UX

#### SCSS con ITCSS

**Decision:** Arquitectura ITCSS para estilos.

**Justificacion:**
- Escalabilidad en proyectos grandes
- Especificidad controlada
- Separacion clara de responsabilidades

#### Standalone Components

**Decision:** 100% standalone components.

**Justificacion:**
- Mejor tree-shaking
- Imports explicitos
- Patron recomendado Angular 17+

### 15.4 Guia de Contribucion

#### Requisitos Previos

```bash
# Node.js 18+
node --version

# Angular CLI
npm install -g @angular/cli

# Clonar repositorio
git clone https://github.com/sdurutr436/Proyecto_Disc_and_Records.git
cd Proyecto_Disc_and_Records/frontend
npm install
```

#### Flujo de Desarrollo

```bash
# 1. Crear rama desde master
git checkout -b feature/nueva-funcionalidad

# 2. Desarrollo con hot-reload
npm start

# 3. Ejecutar tests
npm test

# 4. Verificar cobertura
npm run test:coverage

# 5. Build de produccion
npm run build:prod

# 6. Commit con convencion
git commit -m "feat(componente): descripcion breve"

# 7. Push y Pull Request
git push origin feature/nueva-funcionalidad
```

#### Convencion de Commits

```
tipo(scope): descripcion

Tipos validos:
- feat: Nueva funcionalidad
- fix: Correccion de bug
- docs: Documentacion
- style: Formato (sin cambio de codigo)
- refactor: Refactorizacion
- perf: Mejora de rendimiento
- test: Tests
- build: Build/dependencias
- ci: CI/CD
- chore: Mantenimiento
```

### 15.5 Changelog de Versiones

#### v1.0.0 (22 Enero 2026)

**Features:**
- Sistema de autenticacion completo (login, registro, recuperacion)
- Catalogo de albumes con integracion Deezer API
- Sistema de resenas y puntuaciones
- Perfil de usuario con estadisticas
- Busqueda con debounce y resultados en tiempo real
- Theme switcher (light/dark mode)
- Scroll infinito con paginacion

**Optimizaciones:**
- Bundle inicial 490.43 kB (objetivo < 500 kB)
- 27+ lazy chunks generados
- @defer para modales de autenticacion
- Preloading adaptativo segun conexion

**Testing:**
- 2325 tests unitarios (100% passing)
- 71.36% cobertura de lineas
- Compatibilidad cross-browser verificada

**Despliegue:**
- DigitalOcean App Platform
- Nginx con SPA routing
- HTTPS con certificado automatico

### 15.6 Estructura de Documentacion

```
docs/
├── frontend/
│   ├── Documentacion_fase1.md   # DOM y eventos
│   ├── Documentacion_fase2.md   # Componentes y comunicacion
│   ├── DOCUMENTACION_FASE3.md   # Formularios reactivos
│   ├── Documentacion_fase4.md   # Enrutamiento
│   ├── Documentacion_fase5.md   # HTTP y servicios
│   ├── Documentacion_fase6.md   # Estado y optimizacion
│   ├── Documentacion_fase7.md   # Testing y despliegue (actual)
│   └── PERFORMANCE_OPTIMIZATION.md  # Metricas de rendimiento
├── backend/
│   ├── DOCUMENTACION.md         # API REST y modelo de datos
│   └── DEEZER_PROXY.md          # Integracion Deezer
├── design/
│   └── DOCUMENTACION.md         # Diseno visual y CSS
└── devops/
    └── DOCUMENTACION.md         # Docker y despliegue
```

---

## 16. Buenas Practicas

### 16.1 Estructura de Tests

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

### 16.2 AAA Pattern

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

### 16.3 Evitar Anti-Patterns

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

### 16.4 Async Testing

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

### 16.5 Limpieza de Recursos

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

## Anexo A: Ejecucion de Tests

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

## Anexo B: Capturas de Verificacion

### B.1 Cobertura de Codigo

![Reporte de cobertura de codigo](../design/img-fase7/cobertura-codigo.png)

*Captura del reporte HTML de cobertura mostrando 71.36% en lineas.*

### B.2 Tests Pasando

![Tests unitarios pasando](../design/img-fase7/tests-passing.png)

*Captura de terminal mostrando 2325 tests SUCCESS.*

### B.3 Build de Produccion

![Build de produccion sin errores](../design/img-fase7/build-production.png)

*Captura del output de ng build mostrando bundle inicial de 490.43 kB.*

### B.4 Lazy Chunks Generados

![Lazy chunks generados](../design/img-fase7/lazy-chunks.png)

*Captura mostrando los 27+ lazy chunks generados por el build.*

### B.5 Compatibilidad Cross-Browser

![Tests en Chrome](../design/img-fase7/cross-browser-chrome.png)

*Captura de tests ejecutandose en Chrome Headless.*

![Tests en Firefox](../design/img-fase7/cross-browser-firefox.png)

*Captura de tests ejecutandose en Firefox Headless.*

### B.6 Lighthouse Performance

![Lighthouse Performance Score](../design/img-fase7/lighthouse-performance.png)

*Captura de auditoria Lighthouse mostrando score de Performance.*

### B.7 Source Map Explorer

![Analisis de bundles](../design/img-fase7/source-map-explorer.png)

*Captura del treemap de source-map-explorer mostrando distribucion del bundle.*

### B.8 Despliegue en DigitalOcean

![App desplegada en DigitalOcean](../design/img-fase7/digitalocean-deploy.png)

*Captura del dashboard de DigitalOcean App Platform mostrando estado healthy.*

![Aplicacion en produccion](../design/img-fase7/app-produccion.png)

*Captura de la aplicacion funcionando en la URL de produccion.*

---

*Documentacion generada: Enero 2026*  
*Actualizado: 22 Enero 2026*  
*Version Angular: 20.3.9*  
*Cobertura final: 71.36% lineas*  
*Bundle inicial: 490.43 kB*
