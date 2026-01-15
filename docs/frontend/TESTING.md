# 🧪 Documentación de Testing - Discs & Records Frontend

## Índice
1. [Configuración del Entorno](#configuración-del-entorno)
2. [Tests Unitarios](#tests-unitarios)
3. [Tests de Integración](#tests-de-integración)
4. [Cobertura de Código](#cobertura-de-código)
5. [Compatibilidad Cross-Browser](#compatibilidad-cross-browser)
6. [Optimización de Rendimiento](#optimización-de-rendimiento)
7. [Build de Producción](#build-de-producción)

---

## Configuración del Entorno

### Requisitos Previos
- Node.js >= 18.x
- npm >= 9.x
- Angular CLI >= 20.x

### Scripts Disponibles

```bash
# Ejecutar tests en modo watch (desarrollo)
npm test

# Ejecutar tests una sola vez con cobertura
npm run test:coverage

# Ejecutar tests para CI/CD (headless)
npm run test:ci

# Ejecutar linting
npm run lint

# Analizar tamaño de bundles
npm run build:analyze
```

---

## Tests Unitarios

### Componentes Testeados

#### 1. **Home Component** (`home.spec.ts`)
- ✅ Creación del componente
- ✅ Estado de carga inicial
- ✅ Carga de álbumes desde servicio
- ✅ Manejo de respuesta vacía
- ✅ Manejo de errores de carga
- ✅ Navegación a detalles de álbum
- ✅ Función de búsqueda
- ✅ Apertura de modal de registro
- ✅ TrackBy para optimización
- ✅ Estado de autenticación

#### 2. **Header Component** (`header.spec.ts`)
- ✅ Creación del componente
- ✅ Estado inicial del menú
- ✅ Navegación a Home
- ✅ Navegación a Perfil
- ✅ Logout y navegación
- ✅ Toggle del menú móvil
- ✅ Toggle de tema claro/oscuro
- ✅ Gestión de modales de autenticación
- ✅ Navegación entre modales
- ✅ Eventos de teclado (ESC)
- ✅ Eventos globales (custom events)
- ✅ Click fuera del menú

#### 3. **LoginForm Component** (`login-form.spec.ts`)
- ✅ Creación del componente
- ✅ Controles del formulario
- ✅ Validación de email vacío
- ✅ Validación de formato de email
- ✅ Validación de contraseña vacía
- ✅ Validación de longitud mínima
- ✅ Formulario inválido cuando vacío
- ✅ Formulario válido con datos correctos
- ✅ No llamar servicio si formulario inválido
- ✅ Llamar servicio con formulario válido
- ✅ Estado isSubmitting durante envío
- ✅ Evento onLoginSuccess
- ✅ Reset del formulario tras éxito
- ✅ Manejo de errores

#### 4. **RegisterForm Component** (`register-form.spec.ts`)
- ✅ Creación del componente
- ✅ Validación de username (required, min, max, pattern)
- ✅ Validación de email
- ✅ Validación de contraseña (complejidad)
- ✅ Validación de confirmación de contraseña
- ✅ Validador de grupo (password match)
- ✅ Proceso de registro completo
- ✅ Eventos de salida

### Servicios Testeados

#### 1. **AuthService** (`auth.service.spec.ts`)
- ✅ Creación del servicio
- ✅ Login con mock data
- ✅ Login con HTTP real
- ✅ Manejo de credenciales inválidas
- ✅ Logout completo
- ✅ Emisión de eventos de logout
- ✅ Estado de autenticación
- ✅ Restauración de sesión
- ✅ Limpieza de token inválido
- ✅ Registro de usuarios
- ✅ Manejo de errores de registro

#### 2. **AlbumService** (`album.service.spec.ts`)
- ✅ Creación del servicio
- ✅ getNewReleases con mock
- ✅ getNewReleases con Deezer real
- ✅ Fallback a mock si Deezer falla
- ✅ Mapeo de Deezer a modelo frontend
- ✅ Búsqueda de álbumes
- ✅ Obtención por ID
- ✅ Obtención de tracks
- ✅ Obtención de reseñas
- ✅ Obtención de estadísticas

#### 3. **NotificationService** (`notification.service.spec.ts`)
- ✅ Creación del servicio
- ✅ Observable de notificaciones
- ✅ Método success
- ✅ Método error
- ✅ Método warning
- ✅ Método info
- ✅ Duración personalizada
- ✅ Posicionamiento
- ✅ Múltiples notificaciones

---

## Tests de Integración

### Flujo de Autenticación (`auth-flow.integration.spec.ts`)
- ✅ Login completo con HTTP
- ✅ Login completo con mock
- ✅ Manejo de fallos de login
- ✅ Registro completo
- ✅ Manejo de email duplicado
- ✅ Flujo de logout
- ✅ Restauración de sesión
- ✅ Integración con EventBus

### Flujo de Búsqueda (`search-flow.integration.spec.ts`)
- ✅ Búsqueda con mock service
- ✅ Búsqueda con servicio real
- ✅ Actualización de estado
- ✅ Carga de resultados
- ✅ Resultados vacíos
- ✅ Mapeo a modelo frontend
- ✅ Gestión de estado de búsqueda
- ✅ Navegación a detalles
- ✅ Obtención de tracks

---

## Cobertura de Código

### Objetivo de Cobertura
**Mínimo: 50%** ✅

### Ejecutar Tests con Cobertura

```bash
npm run test:coverage
```

El reporte de cobertura se genera en `coverage/` y puede visualizarse abriendo `coverage/index.html`.

### Áreas Cubiertas
| Área | Cobertura Estimada |
|------|-------------------|
| Componentes principales | ~70% |
| Servicios | ~65% |
| Guards | ~50% |
| Pipes | N/A (no hay custom) |
| Formularios reactivos | ~80% |

---

## Compatibilidad Cross-Browser

### Navegadores Objetivo

El proyecto está configurado para soportar:

| Navegador | Versiones | Estado |
|-----------|-----------|--------|
| Chrome | Últimas 2 | ✅ Soportado |
| Firefox | Últimas 2 | ✅ Soportado |
| Safari | Últimas 2 | ✅ Soportado |
| Edge | Últimas 2 | ✅ Soportado |
| iOS Safari | Últimas 2 | ✅ Soportado |
| Android Chrome | Últimas 2 | ✅ Soportado |
| IE 11 | - | ❌ No soportado |

### Configuración de Browserslist

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

### Verificar Navegadores Compilados

```bash
npx browserslist
```

### Polyfills Incluidos

Angular 20 incluye automáticamente los polyfills necesarios:
- `zone.js` - Detección de cambios de Angular
- No se requiere `core-js` para ES5 (navegadores modernos)

### Posibles Incompatibilidades

| Feature | Chrome | Firefox | Safari | Edge | Notas |
|---------|--------|---------|--------|------|-------|
| CSS Grid | ✅ | ✅ | ✅ | ✅ | Completo |
| Flexbox | ✅ | ✅ | ✅ | ✅ | Completo |
| CSS Variables | ✅ | ✅ | ✅ | ✅ | Completo |
| ES2022 | ✅ | ✅ | ✅ | ✅ | Con transpilación |
| Signals | ✅ | ✅ | ✅ | ✅ | Angular nativo |

### Testing Cross-Browser Manual

1. **Chrome DevTools** - Emulación de dispositivos
2. **Firefox Developer Edition** - Responsive Design Mode
3. **Safari** - Web Inspector (macOS)
4. **BrowserStack/LambdaTest** - Testing en navegadores reales

---

## Optimización de Rendimiento

### Lazy Loading Verificado

Todas las rutas usan `loadComponent()` para carga perezosa:

```typescript
// app.routes.ts
{
  path: '',
  loadComponent: () => import('./pages/home/home').then(m => m.Home),
}
```

### Verificar Chunks Generados

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
- etc.
```

### Budgets de Producción

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

### Análisis de Bundles

```bash
npm run build:analyze
```

Esto genera un mapa visual del tamaño de cada módulo.

### Optimizaciones Implementadas

1. **ChangeDetectionStrategy.OnPush** - En componentes principales
2. **TrackBy en @for** - Para listas de álbumes
3. **takeUntilDestroyed** - Para subscripciones RxJS
4. **Tree Shaking** - Automático en producción
5. **Minificación** - Scripts y estilos
6. **Inlining Critical CSS** - Para First Contentful Paint

---

## Build de Producción

### Comando de Build

```bash
npm run build:prod
```

### Configuración de Producción

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

### Verificación Post-Build

1. **Sin errores ni warnings**
   ```bash
   npm run build:prod 2>&1 | grep -E "(error|warning)"
   ```

2. **Tamaño de bundles**
   ```bash
   ls -la dist/Proyecto_Disc_and_Records/browser/*.js
   ```

3. **Assets copiados**
   ```bash
   ls -la dist/Proyecto_Disc_and_Records/browser/assets/
   ```

### Despliegue

El build genera archivos estáticos en `dist/Proyecto_Disc_and_Records/browser/`.

Para SPA routing, configurar el servidor para redirigir todas las rutas a `index.html`:

**Nginx:**
```nginx
location / {
  try_files $uri $uri/ /index.html;
}
```

**Docker:**
Ver `nginx.prod.conf` para configuración completa.

---

## Lighthouse Performance

### Objetivo: Score > 80

Métricas clave a optimizar:
- **FCP (First Contentful Paint)** < 1.8s
- **LCP (Largest Contentful Paint)** < 2.5s
- **TBT (Total Blocking Time)** < 200ms
- **CLS (Cumulative Layout Shift)** < 0.1

### Ejecutar Lighthouse

1. Chrome DevTools → Lighthouse tab
2. Seleccionar "Performance"
3. Ejecutar auditoría

### Mejoras Aplicadas

- [x] Lazy loading de rutas
- [x] Optimización de imágenes (Deezer provee múltiples tamaños)
- [x] CSS crítico inline
- [x] Preconnect a Deezer API
- [x] Tree shaking
- [x] Minificación de código

---

## Ejecución de Tests

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

### Solo un archivo específico
```bash
ng test --include="**/home.spec.ts"
```

---

*Documentación generada: Enero 2026*
*Versión Angular: 20.3.0*
