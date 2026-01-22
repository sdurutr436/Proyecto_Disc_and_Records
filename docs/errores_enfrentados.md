ERRORES ENFRENTADOS - DISCS & RECORDS

Registro cronológico de incidencias técnicas y sus soluciones

---

ENTRADA #1 - 21 de Enero de 2026

PROBLEMA DE BASE DE DATOS / BACKEND

Bug: HTTP 500 en /api/albumes/paginado - Desincronización de esquema Hibernate

Entorno: Producción (DigitalOcean App Platform / Managed MySQL)

Descripción del Problema

Se detectó un error HTTP 500 en el endpoint '/api/albumes/paginado' tras el despliegue en producción. La aplicación no podía recuperar el listado de álbumes, aunque la conexión con la API externa de Deezer funcionaba correctamente.

Análisis de Causa Raíz

El problema evolucionó en tres fases distintas:

Fase A: Desincronización de Esquema (Origen)

El log inicial mostró la excepción 'SQLSyntaxErrorException: Unknown column deezer_id'. La entidad Java 'Album' incluía un nuevo campo 'deezer_id' que no existía en la tabla física de la base de datos. La configuración 'spring.jpa.hibernate.ddl-auto=update' no logró aplicar la alteración de la tabla automáticamente durante el arranque.

Fase B: Corrupción por Restricciones Duplicadas

Para forzar la actualización del esquema, se modificó la configuración a 'create-drop'. Sin embargo, este despliegue falló. Hibernate intentó recrear las tablas pero colisionó con restricciones de clave foránea (Foreign Keys) preexistentes en la base de datos que no se limpiaron correctamente, generando errores del tipo 'Error 1826: Duplicate foreign key constraint name'.

Fase C: Estado Inconsistente (Estado Zombie)

Como el proceso de 'create-drop' falló a mitad de ejecución, la base de datos quedó en un estado corrupto: la tabla 'albumes' fue eliminada pero no pudo ser recreada. Al revertir la configuración a 'update', la aplicación arrancaba pero fallaba inmediatamente al intentar acceder a una tabla inexistente ('Table defaultdb.albumes does not exist').

Solución Aplicada (Intervención Manual)

Dada la imposibilidad de que Hibernate resolviera el conflicto automáticamente, se procedió a un reseteo manual del esquema:

1. Conexión Remota: Se estableció una conexión directa a la base de datos gestionada de DigitalOcean utilizando el cliente SQLTools en VS Code (Puerto 25060, SSL habilitado).

2. Autorización de Red: Se añadió la IP pública del equipo de desarrollo a la lista de 'Trusted Sources' en el panel de seguridad de DigitalOcean para permitir la conexión externa.

3. Saneamiento de Base de Datos: Se ejecutó un script SQL de limpieza profunda:

SET FOREIGN_KEY_CHECKS = 0;
DROP DATABASE IF EXISTS defaultdb;
CREATE DATABASE defaultdb;
SET FOREIGN_KEY_CHECKS = 1;

Estado Final

La base de datos se encuentra limpia. Hibernate generó el esquema completo desde cero (incluyendo la columna 'deezer_id') al no encontrar tablas previas que generen conflicto.

---

ENTRADA #2 - 22 de Enero de 2026

PROBLEMA DE UI/UX - FRONTEND

Bug: Sticky Nav no funciona - position: sticky roto

Entorno: Frontend Angular (SCSS)

Descripción del Problema

El menú de navegación principal ('.main-nav') dejó de pegarse al top de la página durante el scroll. A pesar de tener 'position: sticky' aplicado correctamente, el nav se comportaba como 'position: relative' y desaparecía al hacer scroll.

Comportamiento observado: Al mover el 'nav' FUERA del 'body' en DevTools, el sticky funcionaba perfectamente. Esto confirmó que el problema estaba en la cadena de ancestros CSS.

Análisis de Causa Raíz

Se identificaron TRES CAUSAS que rompían el comportamiento de 'position: sticky':

Causa 1: overflow-x: hidden en html

En 'styles.scss':

html {
  overflow-x: hidden; // ROTO - Esto crea un nuevo contexto de scroll implícito
}

Cuando se aplica 'overflow' (hidden, scroll o auto) al elemento 'html', el navegador crea automáticamente 'overflow-y: auto', lo cual genera un NUEVO CONTEXTO DE SCROLL. El sticky se pega a ese contenedor en lugar del viewport.

Causa 2: height: 100% en html, body

En '_reset.scss':

html, body {
  height: 100%; // ROTO - Limita la altura del contenedor de scroll
}

Con altura fija, el contenido que excede esa altura se comporta de manera diferente y puede romper el sticky.

Causa 3: display: flex en app-root (Angular)

En 'app.scss':

:host {
  display: flex;          // ROTO - Cada hijo flex es un 'bloque' separado
  flex-direction: column;
  min-height: 100vh;
}

En un contenedor flex vertical, cada hijo es un bloque independiente. El sticky solo funciona DENTRO DE SU PROPIO BLOQUE, no del scroll general del body. El nav estaba dentro de 'app-main' (un hijo flex), así que el sticky se aplicaba relativo a 'app-main', no al viewport.

Solución Aplicada

Fix 1: Quitar overflow-x: hidden de html

html {
  font-size: 16px;
  scroll-behavior: smooth;
  /* NO usar overflow-x:hidden aquí - ROMPE position:sticky */
}

body {
  overflow-x: hidden; // Seguro en body
}

Fix 2: Cambiar height a min-height

html, body {
  width: 100%;
  min-height: 100%;  // En lugar de height: 100%
}

Fix 3: Usar display: contents en componentes Angular

:host {
  display: contents; // CORRECTO - 'Aplana' la jerarquía DOM para CSS
}

app-main {
  display: contents;
}

'display: contents' hace que el elemento 'desaparezca' del layout y sus hijos se comportan como si fueran hijos directos del padre. Esto permite que el sticky funcione correctamente relativo al body.

Fix 4: Separar main y nav de overflow global

section, article, aside, header, footer {
  max-width: 100%;
  overflow-x: hidden;
}

/* main y nav NO deben tener overflow para permitir sticky */
main, nav {
  max-width: 100%;
}

Archivos Modificados

- frontend/src/styles.scss
- frontend/src/app/app.scss
- frontend/src/styles/02-generic/_reset.scss
- frontend/src/styles/03-elements/_base.scss

Estado Final

El sticky nav funciona correctamente y acompaña al usuario durante el scroll.

---

ENTRADA #3 - 22 de Enero de 2026

MEJORA DE UI/UX - FRONTEND

Mejora: Transiciones suaves entre temas

Entorno: Frontend Angular (SCSS)

Descripción del Problema

Al cambiar entre temas (light/dark/grayscale), los colores cambiaban de forma abrupta ('POP'), sin ninguna animación de transición. Esto resultaba en una experiencia de usuario agresiva.

Solución Aplicada

1. Crear mixin reutilizable para transiciones de tema

En '_mixins.scss':

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

2. Aplicar transiciones globales a elementos clave

En 'styles.scss':

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

3. Usar el mixin en clases de utilidad

.text-primary {
  color: var(--text-primary);
  @include mix.theme-transition(color);
}

.bg-app {
  background-color: var(--bg-primary);
  @include mix.theme-transition(background-color);
}

Variables de Transición Utilizadas

- $transicion-rapida: 150ms ease-in-out (Hover, focus)
- $transicion-base: 300ms ease-in-out (Cambios de tema)
- $transicion-lenta: 500ms ease-in-out (Modales, acordeones)

Archivos Modificados

- frontend/src/styles.scss
- frontend/src/styles/01-tools/_mixins.scss

Estado Final

Las transiciones entre temas son suaves (300ms) y el mixin 'theme-transition' está disponible para reutilización en cualquier componente.

---

LECCIONES APRENDIDAS

CSS / Sticky

1. Nunca usar 'overflow' en 'html' - Rompe 'position: sticky' en toda la página
2. Preferir 'min-height' sobre 'height' para html/body
3. 'display: contents' es la solución para jerarquías Angular que rompen sticky
4. Los ancestros con 'overflow: hidden/auto/scroll' crean nuevos contextos de scroll

Transiciones de Tema

1. Crear 'mixins reutilizables' para patrones comunes reduce código duplicado
2. Aplicar transiciones 'globalmente' a elementos base asegura consistencia visual
3. Usar 'variables SCSS' para tiempos permite ajustar la velocidad de toda la app desde un solo punto

Base de Datos / Backend

1. 'ddl-auto=update' puede fallar silenciosamente
2. 'ddl-auto=create-drop' puede dejar estado corrupto si falla a mitad de proceso
3. Tener siempre acceso directo a la BD para intervención manual es crítico en producción
