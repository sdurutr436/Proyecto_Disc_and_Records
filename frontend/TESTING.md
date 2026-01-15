# Testing Guide - Discs & Records Frontend

## 📊 Estado Actual

- **Total Tests**: 103
- **Tests Exitosos**: 103 ✅
- **Tests Fallidos**: 0
- **Coverage Statements**: ~29%
- **Coverage Branches**: ~13%
- **Coverage Functions**: ~20%
- **Coverage Lines**: ~30%

## 🧪 Tipos de Tests

### Tests de Componentes

| Componente | Archivo | # Tests | Estado |
|------------|---------|---------|--------|
| Home | `pages/home/home.spec.ts` | 18+ | ✅ |
| Header | `components/layout/header/header.spec.ts` | 20+ | ✅ |
| LoginForm | `components/shared/login-form/login-form.spec.ts` | 25+ | ✅ |
| RegisterForm | `components/shared/register-form/register-form.spec.ts` | 25+ | ✅ |
| Sidebar | `components/layout/sidebar/sidebar.spec.ts` | 1 | ✅ |
| Footer | `components/layout/footer/footer.spec.ts` | 1 | ✅ |
| Main | `components/layout/main/main.spec.ts` | 1 | ✅ |
| App | `app.spec.ts` | 2 | ✅ |

### Cobertura por Área

- **Formularios Reactivos**: Alta cobertura en validación
- **Navegación**: Verificada en Header y Home
- **Estado de Autenticación**: Probado con mocks
- **Manejo de Errores**: Incluido en tests de componentes

## 🛠️ Comandos Disponibles

```bash
# Ejecutar tests en modo watch
npm test

# Ejecutar tests una vez (CI mode)
npm run test:ci

# Ejecutar tests con coverage
npm run test:coverage

# Build de producción
npm run build:prod

# Analizar bundles
npm run build:analyze
```

## 📝 Cómo Escribir Tests

### Patrón Básico para Componentes Standalone

```typescript
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { provideHttpClient } from '@angular/common/http';

import { MyComponent } from './my-component';

describe('MyComponent', () => {
  let component: MyComponent;
  let fixture: ComponentFixture<MyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MyComponent],
      providers: [
        provideRouter([]),
        provideHttpClient()
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(MyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
```

### Mocking Servicios con Spies

```typescript
// Crear spy objeto
const authServiceSpy = jasmine.createSpyObj('AuthService', ['login', 'logout'], {
  isAuthenticated: signal(false),
  currentUser: signal(null)
});

// Configurar retornos
authServiceSpy.login.and.returnValue(of({ success: true }));

// Usar en providers
providers: [
  { provide: AuthService, useValue: authServiceSpy }
]
```

### Testing de Formularios Reactivos

```typescript
it('should validate required field', () => {
  const control = component.form.get('email');
  control?.setValue('');
  expect(control?.hasError('required')).toBeTruthy();
});

it('should validate email format', () => {
  const control = component.form.get('email');
  control?.setValue('invalid');
  expect(control?.hasError('email')).toBeTruthy();
  
  control?.setValue('valid@email.com');
  expect(control?.valid).toBeTruthy();
});
```

### Testing con HttpTestingController

```typescript
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

beforeEach(() => {
  TestBed.configureTestingModule({
    imports: [HttpClientTestingModule],
    providers: [MyService]
  });
  
  httpMock = TestBed.inject(HttpTestingController);
  service = TestBed.inject(MyService);
});

afterEach(() => {
  httpMock.verify(); // Verificar que no hay requests pendientes
});

it('should make HTTP request', () => {
  service.getData().subscribe(data => {
    expect(data).toEqual(mockData);
  });
  
  const req = httpMock.expectOne('/api/data');
  expect(req.request.method).toBe('GET');
  req.flush(mockData);
});
```

## 🔧 Providers Comunes Necesarios

### Para componentes con Router
```typescript
import { provideRouter } from '@angular/router';
providers: [provideRouter([])]
```

### Para componentes con HttpClient
```typescript
import { provideHttpClient } from '@angular/common/http';
providers: [provideHttpClient()]
```

### Para componentes con Lucide Icons
```typescript
import { LUCIDE_ICONS, LucideIconProvider, Home, User, ... } from 'lucide-angular';
providers: [
  {
    provide: LUCIDE_ICONS,
    multi: true,
    useValue: new LucideIconProvider({ Home, User, ... })
  }
]
```

## 🎯 Buenas Prácticas

1. **Aislar tests**: Cada test debe ser independiente
2. **Usar AAA**: Arrange, Act, Assert
3. **Mockear dependencias externas**: HTTP, servicios, etc.
4. **Testear el comportamiento, no la implementación**
5. **Nombres descriptivos**: `should do X when Y`
6. **Cleanup**: Usar `afterEach` para limpiar estado

## 🌐 Verificación Cross-Browser

Configuración en `.browserslistrc`:
```
last 2 Chrome versions
last 2 Firefox versions
last 2 Safari versions
last 2 Edge versions
iOS >= 14
Android >= 80
```

### Compatibilidad Verificada
- ✅ Chrome (últimas 2 versiones)
- ✅ Firefox (últimas 2 versiones)
- ✅ Safari (últimas 2 versiones)
- ✅ Edge (últimas 2 versiones)
- ✅ iOS Safari 14+
- ✅ Android Chrome 80+

## 🚀 Optimizaciones de Producción

Build de producción incluye:
- ✅ Tree shaking
- ✅ Minificación
- ✅ Compresión de assets
- ✅ Source maps ocultos
- ✅ Lazy loading de rutas
- ✅ Preconnect para APIs externas

### Límites de Bundle
- Initial bundle: < 600KB (warning), < 1MB (error)
- Component styles: < 32KB (warning), < 64KB (error)

## 📈 Mejorar Cobertura

Para aumentar la cobertura, considerar añadir tests para:
- Más servicios (DeezerService, MockDeezerService)
- Componentes de páginas (AlbumDetail, Profile, etc.)
- Guards y interceptors
- Utils y helpers
