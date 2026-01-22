# 📋 Diario de Bitácora - Incidencias Técnicas

> **Proyecto:** Discs and Records  
> **Repositorio:** [GitHub](https://github.com/sdurutr436/Proyecto_Disc_and_Records)

---

## 📅 Entrada #1 — 21 de Enero de 2026

### 🚨 Error HTTP 500 en Producción - Desincronización de Base de Datos

**Entorno:** Producción (DigitalOcean App Platform / Managed MySQL)

#### Descripción del Problema

Se detectó un error HTTP 500 en el endpoint `/api/albumes/paginado` tras el despliegue en producción. La aplicación no podía recuperar el listado de álbumes, aunque la conexión con la API externa de Deezer funcionaba correctamente.

#### Análisis de Causa Raíz

El problema evolucionó en **tres fases distintas**:

##### Fase A: Desincronización de Esquema (Origen)

El log inicial mostró la excepción:

```
SQLSyntaxErrorException: Unknown column 'deezer_id'
```

La entidad Java `Album` incluía un nuevo campo `deezer_id` que no existía en la tabla física de la base de datos. La configuración `spring.jpa.hibernate.ddl-auto=update` no logró aplicar la alteración de la tabla automáticamente durante el arranque.

##### Fase B: Corrupción por Restricciones Duplicadas

Para forzar la actualización del esquema, se modificó la configuración a `create-drop`. Sin embargo, este despliegue falló. Hibernate intentó recrear las tablas pero colisionó con restricciones de clave foránea (Foreign Keys) preexistentes que no se limpiaron correctamente:

```
Error 1826: Duplicate foreign key constraint name
```

##### Fase C: Estado Inconsistente (Estado Zombie)

Como el proceso de `create-drop` falló a mitad de ejecución, la base de datos quedó en un estado corrupto: la tabla `albumes` fue eliminada pero no pudo ser recreada. Al revertir la configuración a `update`, la aplicación arrancaba pero fallaba inmediatamente:

```
Table 'defaultdb.albumes' doesn't exist
```

#### Acciones Realizadas (Intentos Fallidos)

| Acción | Resultado |
|--------|-----------|
| Cambio de estrategia DDL a `create-drop` | ❌ Conflicto de nombres de FK |
| Reversión a estrategia DDL `update` | ❌ Ausencia de tabla base |

#### ✅ Solución Aplicada (Intervención Manual)

Dada la imposibilidad de que Hibernate resolviera el conflicto automáticamente, se procedió a un **reseteo manual del esquema**:

1. **Conexión Remota:** Se estableció conexión directa a la base de datos gestionada de DigitalOcean usando SQLTools en VS Code (Puerto 25060, SSL habilitado).

2. **Autorización de Red:** Se añadió la IP pública del equipo de desarrollo a la lista de "Trusted Sources" en el panel de seguridad de DigitalOcean.

3. **Saneamiento de Base de Datos:**

```sql
SET FOREIGN_KEY_CHECKS = 0;
DROP DATABASE IF EXISTS defaultdb;
CREATE DATABASE defaultdb;
SET FOREIGN_KEY_CHECKS = 1;
```

#### Estado Final

✅ Base de datos limpia y vacía. Configuración con `spring.jpa.hibernate.ddl-auto=update`. Hibernate generó el esquema completo desde cero al no encontrar tablas previas.

---

## 📅 Entrada #2 — 22 de Enero de 2026

### 🚨 Bug: Sticky Nav no funciona - position: sticky roto

**Entorno:** Frontend Angular (SCSS)

#### Descripción del Problema

El menú de navegación principal (`.main-nav`) dejó de pegarse al top de la página durante el scroll. A pesar de tener `position: sticky` aplicado correctamente, el nav se comportaba como `position: relative` y desaparecía al hacer scroll.

**Comportamiento observado:** Al mover el `nav` **fuera** del `body` en DevTools, el sticky funcionaba perfectamente. Esto confirmó que el problema estaba en la cadena de ancestros CSS.

#### Análisis de Causa Raíz

Se identificaron **tres causas** que rompían el comportamiento de `position: sticky`:

##### Causa 1: `overflow-x: hidden` en `html`

En `styles.scss`:

```scss
// ❌ ROTO - Esto crea un nuevo contexto de scroll implícito
html {
  overflow-x: hidden;
}
```

Cuando se aplica `overflow` (hidden, scroll o auto) al elemento `html`, el navegador crea automáticamente `overflow-y: auto`, lo cual genera un **nuevo contexto de scroll**. El sticky se pega a ese contenedor en lugar del viewport.

##### Causa 2: `height: 100%` en `html, body`

En `_reset.scss`:

```scss
// ❌ ROTO - Limita la altura del contenedor de scroll
html, body {
  height: 100%;
}
```

Con altura fija, el contenido que excede esa altura se comporta de manera diferente y puede romper el sticky.

##### Causa 3: `display: flex` en `app-root` (Angular)

En `app.scss`:

```scss
// ❌ ROTO - Cada hijo flex es un "bloque" separado
:host {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
}
```

En un contenedor flex vertical, cada hijo es un bloque independiente. El sticky solo funciona **dentro de su propio bloque**, no del scroll general del body. El nav estaba dentro de `app-main` (un hijo flex), así que el sticky se aplicaba relativo a `app-main`, no al viewport.

#### ✅ Solución Aplicada

##### Fix 1: Quitar `overflow-x: hidden` de `html`

```scss
// ✅ CORRECTO
html {
  font-size: 16px;
  scroll-behavior: smooth;
  /* NO usar overflow-x:hidden aquí - ROMPE position:sticky */
}

body {
  overflow-x: hidden; // Seguro en body
}
```

##### Fix 2: Cambiar `height` a `min-height`

```scss
// ✅ CORRECTO
html, body {
  width: 100%;
  min-height: 100%;  // En lugar de height: 100%
}
```

##### Fix 3: Usar `display: contents` en componentes Angular

```scss
// ✅ CORRECTO - "Aplana" la jerarquía DOM para CSS
:host {
  display: contents;
}

app-main {
  display: contents;
}
```

`display: contents` hace que el elemento "desaparezca" del layout y sus hijos se comportan como si fueran hijos directos del padre. Esto permite que el sticky funcione correctamente relativo al body.

##### Fix 4: Separar `main` y `nav` de overflow global

```scss
// ✅ CORRECTO
section, article, aside, header, footer {
  max-width: 100%;
  overflow-x: hidden;
}

/* main y nav NO deben tener overflow para permitir sticky */
main, nav {
  max-width: 100%;
}
```

#### Archivos Modificados

- `frontend/src/styles.scss`
- `frontend/src/app/app.scss`
- `frontend/src/styles/02-generic/_reset.scss`
- `frontend/src/styles/03-elements/_base.scss`

#### Estado Final

✅ El sticky nav funciona correctamente y acompaña al usuario durante el scroll.

---

## 📅 Entrada #3 — 22 de Enero de 2026

### 🎨 Mejora: Transiciones suaves entre temas

**Entorno:** Frontend Angular (SCSS)

#### Descripción del Problema

Al cambiar entre temas (light/dark/grayscale), los colores cambiaban de forma abrupta ("POP"), sin ninguna animación de transición. Esto resultaba en una experiencia de usuario agresiva.

#### Solución Aplicada

##### 1. Crear mixin reutilizable para transiciones de tema

En `_mixins.scss`:

```scss
// Mixin para transiciones suaves de tema
// Uso: @include theme-transition; 
// O:   @include theme-transition(background-color, color, border-color);
@mixin theme-transition($properties...) {
  $transition-list: ();
  $default-props: (background-color, color, border-color, fill, stroke);
  
  @if length($properties) == 0 {
    @each $prop in $default-props {
      $transition-list: append($transition-list, #{$prop} vars.$transicion-base, comma);
    }
  } @else {
    @each $prop in $properties {
      $transition-list: append($transition-list, #{$prop} vars.$transicion-base, comma);
    }
  }
  
  transition: $transition-list;
}
```

##### 2. Aplicar transiciones globales a elementos clave

En `styles.scss`:

```scss
/* Elementos que heredan transiciones de tema */
h1, h2, h3, h4, h5, h6,
p, span, label,
nav, header, footer, main, section, article, aside,
div, ul, li,
button, input, textarea, select,
a, svg {
  transition: 
    background-color $transicion-base,
    color $transicion-base,
    border-color $transicion-base,
    fill $transicion-base,
    stroke $transicion-base;
}
```

##### 3. Usar el mixin en clases de utilidad

```scss
.text-primary {
  color: var(--text-primary);
  @include mix.theme-transition(color);
}

.bg-app {
  background-color: var(--bg-primary);
  @include mix.theme-transition(background-color);
}
```

#### Variables de Transición Utilizadas

| Variable | Valor | Uso |
|----------|-------|-----|
| `$transicion-rapida` | 150ms ease-in-out | Hover, focus |
| `$transicion-base` | 300ms ease-in-out | Cambios de tema |
| `$transicion-lenta` | 500ms ease-in-out | Modales, acordeones |

#### Archivos Modificados

- `frontend/src/styles.scss`
- `frontend/src/styles/01-tools/_mixins.scss`

#### Estado Final

✅ Las transiciones entre temas son suaves (300ms) y el mixin `theme-transition` está disponible para reutilización en cualquier componente.

---

## 📚 Lecciones Aprendidas

### CSS / Sticky

1. **Nunca usar `overflow` en `html`** - Rompe `position: sticky` en toda la página
2. **Preferir `min-height` sobre `height`** para html/body
3. **`display: contents`** es la solución para jerarquías Angular que rompen sticky
4. Los ancestros con `overflow: hidden/auto/scroll` crean nuevos contextos de scroll

### Transiciones de Tema

1. Crear **mixins reutilizables** para patrones comunes
2. Aplicar transiciones **globalmente** a elementos base
3. Usar **variables SCSS** para tiempos consistentes

### Base de Datos / Hibernate

1. `ddl-auto=update` puede fallar silenciosamente
2. `ddl-auto=create-drop` puede dejar estado corrupto si falla
3. Tener siempre acceso directo a la BD para intervención manual
