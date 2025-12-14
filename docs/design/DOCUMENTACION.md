# Sección 1: Arquitectura CSS y Comunicación Visual

> **Proyecto:** Discs & Records  
> **Fase:** 1 - Fundamentos y Arquitectura CSS  
> **Entrega:** 18 de diciembre de 2025  
> **Showcase desplegado:** https://styles-disc-n-records-showcase.netlify.app/showcase.html

---

## 1.1 Principios de la Comunicación Visual

### Del mockup redondeado al Neobrutalismo: Justificación del cambio de diseño

El diseño original de "Discs & Records" ya contemplaba un estilo **"blocky"** con formas cuadradas y bordes marcados. Sin embargo, durante el desarrollo del mockup, opté por suavizar el diseño hacia formas más redondeadas y convencionales. Tras trabajar con esta versión, me di cuenta de que **no me terminaba de convencer**: perdía personalidad y se parecía demasiado a otras aplicaciones del sector.

Fue entonces cuando descubrí el **neobrutalismo** como tendencia de diseño web. Al investigar, me di cuenta de que este estilo se utiliza frecuentemente en **páginas con estética retro** —precisamente lo que buscaba transmitir con mi paleta de colores 70s. El neobrutalismo encajaba perfectamente con la idea original que tenía para el proyecto.

Por eso decidí **volver al concepto inicial** de diseño "blocky", pero ahora con un enfoque más definido y consciente:

- **Bordes gruesos y sólidos** (3px) que recuerdan a las fundas de discos de vinilo
- **Sombras offset sin blur** (4px 4px 0px) que evocan la profundidad de los surcos del vinilo
- **Colores vibrantes de los 70s** que reflejan la energía de esa época dorada de la música
- **Formas más cuadradas** con radios sutiles (5px) que mantienen el carácter brutal sin ser agresivos

Lo importante es que este cambio estético **no altera la estructura funcional** que ya tenía definida: la posición de los botones, los tipos de cards, los carruseles y la navegación se mantienen exactamente igual. Solo evoluciona el aspecto visual hacia esa estética retro-brutal que mejor representa la identidad de "Discs & Records".

![Showcase paleta de colores nueva](./img-fase1/showcase-paleta-colores-light.png)

![Showcase paleta de colores nueva: frios](./img-fase1/showcase-modo-oscuro-light.png)

![Showcase tipografía](./img-fase1/showcase-tipografia-light.png)

![Showcase botones](./img-fase1/showcase-botones-neobrutalistas-light.png)

![Showcase Inputs](./img-fase1/showcase-inputs-light.png)

![Showcase controles de seleccion](./img-fase1/showcase-controles-seleccion-light.png)

![Showcase navegación](./img-fase1/showcase-navegacion-light.png)

![Showcase badges](./img-fase1/showcase-badges-tags-light.png)

![Showcase barra de progreso](./img-fase1/showcase-progress-bars-light.png)

![Showcase alertas neon](./img-fase1/showcase-alertas-neon-light.png)

---

### Jerarquía

La jerarquía visual se establece mediante una escala tipográfica bien definida y el uso estratégico del espacio. Establezco varios niveles de prioridad visual:

- **Nivel 1 - Título principal:** El texto **"Puntúa todas tus canciones y álbumes favoritos en un solo lugar"** utiliza un tamaño grande (~4.25rem/68px), peso regular y posición centrada para captar inmediatamente la atención. Este es el punto focal de la página invitando al usuario a realizar la acción principal de la aplicación web.

- **Nivel 2 - Call-to-Action primario:** El botón "COMIENZA AQUÍ" destaca con fondo naranja dorado (#ED9C05), texto en mayúsculas y sombra brutal offset. Este botón justo en medio y debajo del lema, crea urgencia visual al usuario, invitándolo a crear cuenta para tener su propio registro.

- **Nivel 3 - Títulos de sección:** "ÁLBUMES EN TENDENCIA" usa una tipografía decorativa (Monoton) con estilo retro 70s y tamaño intermedio (~2.625rem/42px), diferenciándose del contenido principal, creando contraste con el resto de la página. Esta tipografía es difícil de leer en textos largos, por lo que la decisión de diseño aquí ha sido usarla solo en palabras cortas o frases de 3-4 palabras.

- **Nivel 4 - Navegación:** Los botones "REGISTRARSE" e "INICIAR SESIÓN" tienen menor jerarquía visual, integrados en la barra superior con fondo semi-transparente. Los botones son grandes con el fin de ser accesibles.

- **Nivel 5 - Elementos de apoyo:** *Labels* como "Busca lo que más te guste" y controles del carrusel (flechas) usan tamaños menores para no competir con el contenido principal.

![Principio 1: Jerarquía - Vista general con niveles señalados](img-fase1/pagina_principal-vistazo_jeraraquia.png)

---

### Contraste

El contraste se aplica de múltiples formas para diferenciar elementos y mejorar la legibilidad:

- **Contraste cromático:** La paleta cálida 70s (naranjas #ED9C05, #CA6703, #BB3F03, rojo vino #9D2227) sobre fondos claros (#FBFAF2, beige #E7D8AB) crea una separación visual clara. El header con degradado naranja contrasta fuertemente con el contenido beige inferior. Se alterna a una paleta fría para el modo oscuro (verde menta #93CFBB, teales #0A9295, #015F72) sobre fondo azul noche (#01131B).

- **Contraste de tamaño:** La diferencia entre el título principal (4.25rem) y el texto de párrafo (1rem) es de 4:1, generando una jerarquía clara e inmediata.

- **Contraste de peso:** Los botones usan texto en mayúsculas con peso medio (600), mientras que el cuerpo de texto usa peso regular (400).

- **Contraste figura-fondo:** El logo circular negro "DISCS & RECORDS" sobre las franjas de colores arcoíris crea un punto focal fuerte en la navegación.

- **Contraste neobrutalista:** Los bordes negros sólidos (3px) contra fondos de colores vivos crean una separación visual muy marcada, característica del estilo.

![Principio 2: Contraste - Modo claro](img-fase1/pagina_principal-vistazo_jeraraquia.png)

![Principio 2: Contraste - Modo oscuro](img-fase1/pagina_principal-vistazo_modo_oscuro.png)

---

### Alineación

La estrategia de alineación combina múltiples técnicas según el contexto de cada vista:

**En la página de perfil de usuario:**

- **Layout de dos columnas:** La vista de perfil utiliza un layout asimétrico donde la información del usuario (avatar, nombre, estadísticas de géneros) ocupa aproximadamente 1/3 del ancho a la izquierda, mientras que el contenido principal (tabs y grid de álbumes) ocupa 2/3 a la derecha.

- **Alineación izquierda en el sidebar:** El nombre de usuario, los géneros más escuchados y las barras de progreso se alinean a la izquierda, facilitando la lectura vertical de la información.

- **Grid para álbumes:** Los álbumes del usuario se organizan en un CSS Grid responsivo con `grid-template-columns: repeat(auto-fit, minmax(250px, 1fr))`.

- **Tabs centrados:** Los botones "Reseñas", "Álbumes" y "Canciones" se agrupan y centran sobre el grid de contenido.

![Principio 3: Alineación - Página de perfil](img-fase1/perfil_usuario-alineacion.png)

**En elementos globales:**

- **Alineación del header:** Los elementos de navegación (logo, botones) se distribuyen usando flexbox con `justify-content: space-between`.

- **Centrado de contenido hero:** En la página principal, el título y CTA se centran horizontalmente creando un eje visual central.

- **Contenedores neobrutalistas:** Los grids de álbumes están envueltos en contenedores con borde naranja/rojo grueso (#CA6703) que delimitan visualmente el área de contenido.

![Principio 3: Alineación - Elementos globales](img-fase1/perfil_usuario-alineacion.png)

---

### Proximidad

El espaciado agrupa elementos relacionados y separa secciones distintas:

- **Grupo Hero:** El título, subtítulo, botón CTA y buscador están agrupados con espaciado reducido entre ellos (~1-2rem), indicando que pertenecen a la misma unidad funcional.

- **Separación de secciones:** Entre el área hero y "Álbumes en tendencia" hay un espaciado mayor (~3-4rem), indicando cambio de contexto.

- **Cards de álbumes:** Los álbumes mantienen un `gap` consistente de 2rem ($espaciado-m) entre ellos, sugiriendo que son elementos del mismo tipo pero independientes.

- **Navegación agrupada:** Los botones de autenticación comparten el mismo contenedor visual (barra naranja), indicando que son acciones relacionadas.

- **Franjas decorativas:** Las líneas de colores en el header están muy próximas entre sí (sin gap), formando un único elemento decorativo cohesivo.

![Principio 4: Proximidad - Carruseles y secciones](img-fase1/carruseles-ejemplo-proximidad.png)

---

### Repetición

La coherencia visual se logra repitiendo patrones en toda la interfaz:

- **Paleta de colores:** Los mismos naranjas y tierras (#ED9C05, #CA6703, #BB3F03, #9D2227) aparecen en el header, botones, títulos decorativos y acentos, creando unidad visual.

- **Bordes neobrutalistas:** Los elementos interactivos (botones, cards, inputs) comparten el mismo estilo de borde negro sólido (3px) y sombras offset (4px 4px 0px), reforzando la estética retro-brutal.

- **Tipografía consistente:** Space Grotesk se usa en todo el UI, con Monoton reservado solo para títulos decorativos de sección.

- **Forma de las cards:** Todos los álbumes/canciones usan el mismo formato cuadrado con bordes redondeados sutiles (5px) y sombras consistentes.

- **Iconografía:** Las flechas del carrusel usan el mismo estilo circular con borde, manteniendo coherencia con los demás elementos interactivos.

- **Espaciado modular:** Se repiten los mismos valores de espaciado ($espaciado-s: 1rem, $espaciado-m: 2rem, $espaciado-l: 3rem) en toda la aplicación.

![Principio 5: Repetición - Patrones visuales consistentes](img-fase1/carruseles-ejemplo-proximidad.png)

---

## 1.2 Metodología CSS: ITCSS

He elegido **ITCSS (Inverted Triangle CSS)** como metodología de organización en lugar de BEM. Esta decisión se basa en varios factores:

### ¿Por qué ITCSS y no BEM?

**ITCSS** organiza los estilos desde lo más genérico hasta lo más específico, formando un "triángulo invertido" de especificidad:

```
       ╱╲
      ╱  ╲  Settings (variables) - Sin output CSS
     ╱    ╲
    ╱      ╲ Tools (mixins) - Sin output CSS
   ╱        ╲
  ╱          ╲ Generic (reset) - Especificidad muy baja
 ╱            ╲
╱──────────────╲ Elements (base HTML) - Especificidad baja
╲──────────────╱
 ╲            ╱ Layout (estructuras) - Especificidad media
  ╲          ╱
   ╲        ╱ Components (UI) - Especificidad media-alta
    ╲      ╱
     ╲    ╱ Utilities (!important) - Especificidad máxima
      ╲  ╱
       ╲╱
```

**Ventajas de ITCSS para este proyecto:**

1. **Evita guerras de especificidad:** Al importar en orden de menor a mayor especificidad, los estilos posteriores siempre pueden sobrescribir a los anteriores sin necesidad de `!important` (excepto en utilities).

2. **Escalabilidad:** Puedo añadir nuevos componentes sin preocuparme de conflictos con estilos existentes.

3. **Compatibilidad con Angular:** Los componentes Angular con `ViewEncapsulation.Emulated` generan sus propios selectores encapsulados, que conviven perfectamente con la estructura ITCSS global.

4. **Claridad organizativa:** Cada carpeta tiene un propósito claro y un nivel de especificidad definido.

**¿Por qué no BEM?**

BEM (Block-Element-Modifier) es excelente para nombrar clases, pero ITCSS es una metodología de **organización de archivos**, no de nomenclatura. De hecho, puedo usar convenciones tipo BEM dentro de mis componentes ITCSS si lo necesito:

```scss
// En 05-components/_card.scss
.card { }
.card__title { }
.card__image { }
.card--featured { }
```

Sin embargo, en Angular la encapsulación de estilos por componente reduce la necesidad de BEM estricto, ya que cada componente tiene su propio scope.

---

## 1.3 Organización de Archivos

```
frontend/src/styles/
├── 00-settings/
│   └── _variables.scss      # Design tokens: colores, tipografía, espaciado, 
│                            # breakpoints, sombras, bordes, transiciones
│
├── 01-tools/
│   └── _mixins.scss         # Mixins reutilizables: tipografía, temas, 
│                            # media queries, accesibilidad
│
├── 02-generic/
│   └── _reset.scss          # CSS Reset agresivo (box-sizing, márgenes, etc.)
│
├── 03-elements/
│   └── _base.scss           # Estilos base para elementos HTML sin clases:
│                            # h1-h6, p, a, button, input, table, etc.
│
├── 04-layout/
│   └── _grid.scss           # Sistema de grid (CSS Grid + Flexbox)
│
└── styles.scss              # Archivo principal - importa todo en orden ITCSS
```

### ¿Por qué este orden?

| Capa | Especificidad | Propósito |
|------|---------------|-----------|
| **00-settings** | Ninguna | Solo variables SCSS, no genera CSS |
| **01-tools** | Ninguna | Solo mixins/funciones, no genera CSS |
| **02-generic** | Muy baja (`*`, `html`, `body`) | Reset universal, base limpia |
| **03-elements** | Baja (`h1`, `p`, `a`, `button`) | Estilos por defecto para HTML |
| **04-layout** | Media (`.grid`, `.container`) | Estructuras de página |

Este orden garantiza que los estilos más específicos siempre puedan sobrescribir a los más genéricos sin conflictos.

---

## 1.4 Sistema de Design Tokens

Los design tokens son variables SCSS que centralizan todos los valores de diseño, sirviendo como **única fuente de verdad** para colores, tipografía, espaciado y demás propiedades visuales.

### Colores

#### Paleta principal - Modo Light (Cálidos 70s)

| Token | Valor | Muestra | Uso |
|-------|-------|---------|-----|
| `$color-primario-light` | #ED9C05 | 🟠 | CTAs principales, acciones primarias |
| `$color-secundario-light` | #CA6703 | 🟠 | Acciones secundarias, bordes de contenedores |
| `$color-contraste-light` | #BB3F03 | 🟠 | Hover states, acentos |
| `$color-acentuado-light` | #9D2227 | 🔴 | Alertas, énfasis, badges |

**¿Por qué estos colores?** La paleta de naranjas y tierras evoca directamente la estética de los años 70: portadas de álbumes, discotecas con luces cálidas, y la calidez nostálgica de los vinilos. Estos colores transmiten energía, pasión por la música y un carácter retro distintivo.

#### Paleta principal - Modo Dark (Fríos 70s)

| Token | Valor | Muestra | Uso |
|-------|-------|---------|-----|
| `$color-primario-dark` | #93CFBB | 🟢 | CTAs principales |
| `$color-secundario-dark` | #0A9295 | 🔵 | Acciones secundarias |
| `$color-contraste-dark` | #015F72 | 🔵 | Hover states |
| `$color-acentuado-dark` | #01131B | ⚫ | Fondos, énfasis |

**¿Por qué estos colores?** Para el modo oscuro, mantengo la estética 70s pero con tonos fríos (teales y verdes menta) que recuerdan a las luces de neón de las discotecas nocturnas y los equipos de audio vintage.

#### Fondos

| Token Light | Token Dark | Valores | Uso |
|-------------|------------|---------|-----|
| `$color-fondo-light` | `$color-fondo-oscuro` | #FBFAF2 / #01131B | Fondo principal |
| `$color-fondo-light-secundario` | `$color-fondo-oscuro-secundario` | #E7D8AB / #013946 | Fondos de cards, secciones alternas |

#### Colores semánticos (estados)

| Token | Valor | Uso |
|-------|-------|-----|
| `$color-error` | #E04A4A | Errores, validaciones fallidas |
| `$color-advertencia-light` | #FFC047 | Advertencias (modo light) |
| `$color-advertencia-dark` | #FEF84A | Advertencias (modo dark) |
| `$color-exito` | #AAD661 | Confirmaciones, éxito |
| `$color-informacion` | #0A9295 | Información, tips |

![Design Tokens: Paleta de colores completa](img-fase1/showcase-paleta-colores-light.png)

---

### Tipografía

#### Familias tipográficas

| Token | Valor | Uso |
|-------|-------|-----|
| `$fuente-principal` | 'Space Grotesk', sans-serif | Todo el UI, cuerpo de texto, botones |
| `$fuente-secundaria` | 'Monoton' | Solo títulos decorativos de sección |

**¿Por qué Space Grotesk?** Es una fuente geométrica sans-serif con personalidad retro-moderna que combina excelente legibilidad con un carácter distintivo. Sus formas redondeadas pero precisas encajan con la estética neobrutalista.

**¿Por qué Monoton?** Es una fuente display inspirada en los carteles de las discotecas de los 70s. Solo la uso para títulos cortos ("ÁLBUMES EN TENDENCIA") porque su legibilidad es limitada en textos largos.

#### Escala tipográfica

| Token | Tamaño | Line-height | Uso |
|-------|--------|-------------|-----|
| `$tamanio-fuente-h1` | 4.25rem (68px) | 4.5rem | Títulos principales, hero |
| `$tamanio-fuente-h2` | 2.625rem (42px) | 3rem | Títulos de sección |
| `$tamanio-fuente-h3` | 1.625rem (26px) | 3rem | Subtítulos |
| `$tamanio-fuente-h4` | 1rem (16px) | 3rem | Títulos menores |
| `$tamanio-fuente-parrafo` | 1rem (16px) | 1.5rem | Cuerpo de texto |
| `$tamanio-fuente-texto-pequeno-s` | 0.875rem (14px) | 1.5rem | Labels, captions |
| `$tamanio-fuente-texto-pequeno-xs` | 0.75rem (12px) | 1rem | Texto muy pequeño |

**¿Por qué esta escala?** Utilizo una escala aproximada con ratio 1.25 (Major Third) que proporciona suficiente contraste entre niveles sin saltos demasiado bruscos. El h1 es intencionadamente grande (4.25rem) para crear impacto en el hero.

---

### Espaciado

| Token | Valor | Uso |
|-------|-------|-----|
| `$espaciado-xs` | 0.5rem (8px) | Padding interno mínimo, separación entre elementos muy cercanos |
| `$espaciado-s` | 1rem (16px) | Separación entre elementos cercanos, padding de botones |
| `$espaciado-m` | 2rem (32px) | Gap de grid, márgenes de sección |
| `$espaciado-l` | 3rem (48px) | Separación entre secciones |
| `$espaciado-xl` | 4rem (64px) | Espaciado hero, grandes bloques |
| `$espaciado-xxl` | 5rem (80px) | Espaciado extra grande |

**¿Por qué esta escala?** Basada en múltiplos de 8px (0.5rem) que es un estándar de diseño que facilita la alineación y mantiene consistencia. Los valores más usados son `$espaciado-s` (botones, inputs) y `$espaciado-m` (grid gaps).

---

### Breakpoints

| Token | Valor | Dispositivo |
|-------|-------|-------------|
| `$breakpoint-mobile` | 320px | Móvil pequeño |
| `$breakpoint-tablet` | 768px | Tablet |
| `$breakpoint-desktop` | 1024px | Desktop |
| `$breakpoint-large-desktop` | 1200px | Desktop grande |
| `$breakpoint-ultra-wide` | 1600px | Ultra wide |

**¿Por qué estos breakpoints?** Son los puntos de quiebre más comunes que cubren la mayoría de dispositivos.

---

### Sombras Neobrutalistas

Las sombras son un elemento clave del estilo neobrutalista. En lugar de sombras difusas (blur), uso sombras **sólidas y offset** que crean un efecto de profundidad "retro".

#### Sombras base (negras)

```scss
$sombra-brutal-xs: 2px 2px 0px $color-letra-oscura;  // Elementos muy pequeños
$sombra-brutal-s: 4px 4px 0px $color-letra-oscura;   // Botones, inputs
$sombra-brutal-m: 6px 6px 0px $color-letra-oscura;   // Cards
$sombra-brutal-l: 8px 8px 0px $color-letra-oscura;   // Contenedores grandes
```

#### Sombras "Vinilo" (múltiples capas de colores)

```scss
$sombra-vinilo-m: 
  2px 2px 0px $color-acentuado-light,
  4px 4px 0px $color-contraste-light,
  6px 6px 0px $color-secundario-light;
```

Estas sombras con múltiples capas de colores de la paleta 70s crean un efecto de "disco de vinilo" con profundidad tridimensional.

#### Sombras de interacción

```scss
$sombra-brutal-hover: 2px 2px 0px $color-letra-oscura;  // Al hacer hover (se reduce)
$sombra-brutal-active: 0px 0px 0px $color-letra-oscura; // Al pulsar (desaparece)
```

El patrón de interacción es: la sombra se reduce al hacer hover y desaparece al pulsar, simulando que el elemento "se hunde" en la página.

#### Sombras Neon (estados)

Para alertas y estados, uso sombras con blur que crean un efecto de luz de neón:

```scss
$sombra-neon-error: 0px 0px 10px $color-error, 0px 0px 20px $color-error;
$sombra-neon-exito: 0px 0px 10px $color-exito, 0px 0px 20px $color-exito;
```

![Design Tokens: Sombras neobrutalistas](img-fase1/showcase-botones-neobrutalistas-light.png)

---

### Bordes y Border Radius

#### Bordes

| Token | Valor | Uso |
|-------|-------|-----|
| `$borde-brutal-thin` | 2px solid $color-letra-oscura | Separadores, elementos sutiles |
| `$borde-brutal-medium` | 3px solid $color-letra-oscura | Botones, inputs, cards |
| `$borde-brutal-thick` | 4px solid $color-letra-oscura | Contenedores principales |

#### Border Radius

| Token | Valor | Uso |
|-------|-------|-----|
| `$radio-ninguno` | 0px | Estilo brutalist puro |
| `$radio-xs` | 3px | Radio mínimo |
| `$radio-s` | 5px | Radio principal (botones, cards) |
| `$radio-m` | 8px | Radio medio |
| `$radio-l` | 12px | Radio grande |
| `$radio-redondo` | 50% | Elementos circulares (avatares) |
| `$radio-pildora` | 9999px | Botones tipo píldora |

**¿Por qué radios tan sutiles?** El neobrutalismo tiende a formas más cuadradas, pero un radio de 5px suaviza ligeramente las esquinas sin perder el carácter brutal. Es un balance entre accesibilidad visual y estética.

---

### Transiciones

| Token | Valor | Uso |
|-------|-------|-----|
| `$transicion-rapida` | 150ms ease-in-out | Hover, focus |
| `$transicion-base` | 300ms ease-in-out | Transiciones estándar |
| `$transicion-lenta` | 500ms ease-in-out | Modales, acordeones |
| `$transicion-muy-lenta` | 700ms ease-in-out | Animaciones decorativas |

#### Curvas de timing especiales

```scss
$ease-brutal: cubic-bezier(0.25, 0.46, 0.45, 0.94);   // Transición "snappy"
$ease-bounce: cubic-bezier(0.68, -0.55, 0.265, 1.55); // Efecto rebote retro
```

---

## 1.5 Mixins y Funciones

### `@mixin font-size-line($tipo)`

Aplica tamaño de fuente y altura de línea según el tipo de elemento.

```scss
// Definición
@mixin font-size-line($tipo) {
  font-size: vars.$tamanio-fuente-#{$tipo};
  line-height: vars.$altura-linea-#{$tipo};
}

// Uso
h1 {
  @include font-size-line('h1');  // Aplica 4.25rem y line-height 4.5rem
}

p {
  @include font-size-line('parrafo');  // Aplica 1rem y line-height 1.5rem
}
```

---

### `@mixin theme-colors($modo)`

Aplica colores de fondo y texto según el tema (light/dark).

```scss
// Definición
@mixin theme-colors($modo: 'light') {
  @if $modo == 'light' {
    background-color: vars.$color-fondo-light;
    color: vars.$color-letra-principal-light;
  } @else if $modo == 'dark' {
    background-color: vars.$color-fondo-oscuro;
    color: vars.$color-letra-principal-dark;
  }
}

// Uso
body {
  @include theme-colors('light');
}

.dark-mode {
  @include theme-colors('dark');
}
```

---

### `@mixin respond-to($breakpoint)`

Media queries basadas en los breakpoints predefinidos.

```scss
// Definición
@mixin respond-to($breakpoint) {
  @if $breakpoint == 'mobile' {
    @media (max-width: vars.$breakpoint-mobile) { @content; }
  } @else if $breakpoint == 'tablet' {
    @media (max-width: vars.$breakpoint-tablet) { @content; }
  } @else if $breakpoint == 'desktop' {
    @media (max-width: vars.$breakpoint-desktop) { @content; }
  }
  // ... más breakpoints
}

// Uso
.hero-title {
  font-size: 4.25rem;
  
  @include respond-to('tablet') {
    font-size: 2.5rem;  // Reduce en tablet
  }
  
  @include respond-to('mobile') {
    font-size: 1.75rem; // Reduce más en móvil
  }
}
```

---

### `@mixin alert-accesible-dark`

Mejora la accesibilidad de alertas en modo oscuro usando el color menta como fondo para garantizar contraste suficiente.

```scss
// Definición
@mixin alert-accesible-dark {
  background-color: vars.$color-primario-dark;  // Verde menta #93CFBB
  color: vars.$color-letra-oscura;              // Texto oscuro para contraste
}

// Uso
.alert--info {
  @include alert-accesible-dark;  // Garantiza ratio de contraste 4.5:1+
}
```

---

## 1.6 ViewEncapsulation en Angular

Angular ofrece tres modos de encapsulación de estilos para componentes:

### Opciones disponibles

#### `ViewEncapsulation.Emulated` (por defecto)

- Simula Shadow DOM añadiendo atributos únicos (`_ngcontent-xxx`) a los elementos
- Los estilos del componente **no afectan** a otros componentes
- **Ventaja:** Encapsulación sin soporte de Shadow DOM nativo
- **Desventaja:** Genera selectores más largos en el CSS final

#### `ViewEncapsulation.None`

- Los estilos se aplican **globalmente** sin encapsulación
- Útil para componentes de layout o temas que deben afectar a toda la aplicación
- **Ventaja:** Estilos compartidos fácilmente
- **Desventaja:** Riesgo de colisiones de estilos

#### `ViewEncapsulation.ShadowDom`

- Usa Shadow DOM **nativo** del navegador
- Aislamiento completo de estilos
- **Ventaja:** Encapsulación real
- **Desventaja:** Requiere soporte del navegador, dificulta el styling externo

### Estrategia del proyecto

Para este proyecto, uso una **estrategia híbrida**:

| Tipo de estilos | Estrategia | Justificación |
|-----------------|------------|---------------|
| **Variables, reset, grid** | `styles.scss` (global) | Deben estar disponibles en toda la app |
| **Estilos de componentes** | `ViewEncapsulation.Emulated` (default) | Cada componente gestiona sus propios estilos |
| **Componentes de layout** | Evaluar `ViewEncapsulation.None` | Si necesitan afectar a componentes hijos |

#### Acceso a variables globales desde componentes

Para usar las variables globales en un componente Angular con encapsulación:

```scss
// En el .scss del componente
@use '../../../styles/00-settings/variables' as vars;

.mi-componente {
  background-color: vars.$color-fondo-light;
  padding: vars.$espaciado-m;
  border: vars.$borde-brutal-medium;
}
```

Esta estrategia me permite:
1. Mantener una **única fuente de verdad** para los design tokens
2. **Encapsular** los estilos específicos de cada componente
3. Evitar **conflictos** entre componentes
4. Facilitar el **mantenimiento** y la escalabilidad

---

## Showcase Interactivo

Para visualizar todos los componentes del sistema de diseño en acción, he creado un showcase interactivo desplegado en Netlify:

🔗 **[Ver Showcase](https://styles-disc-n-records-showcase.netlify.app/showcase.html)**

El showcase incluye ejemplos de:
- Botones (primarios, secundarios, con efecto vinilo)
- Inputs y formularios
- Cards de álbumes y canciones
- Alertas con efecto neon
- Badges y tags
- Paleta de colores completa
- Barras de progreso
- Sistema de navegación

---

## Resumen de Entregables Fase 1

| Entregable | Ubicación | Estado |
|------------|-----------|--------|
| Estructura ITCSS | `frontend/src/styles/` | ✅ |
| Design tokens | `00-settings/_variables.scss` | ✅ |
| Mixins | `01-tools/_mixins.scss` | ✅ |
| Reset CSS | `02-generic/_reset.scss` | ✅ |
| Estilos base HTML | `03-elements/_base.scss` | ✅ |
| Sistema de grid | `04-layout/_grid.scss` | ✅ |
| Documentación | `docs/design/DOCUMENTACION.md` | ✅ |
| Capturas de Figma | `docs/design/img-fase1/` | ✅ |

---

# Sección 2: HTML Semántico y Estructura

> **Proyecto:** Discs & Records  
> **Fase:** 2 - HTML Semántico y Accesibilidad  

---

## 2.1 Elementos Semánticos Utilizados

El proyecto utiliza elementos HTML5 semánticos para estructurar el contenido de manera significativa, mejorando la accesibilidad y el SEO.

### `<header>` - Encabezado de la aplicación

**Uso:** Contiene el logotipo, navegación principal y botones de autenticación.

**Ejemplo del proyecto:**

```html
<header class="header">
  <!-- Sección superior con logo y botones -->
  <div class="header__top">
    <div class="header__top-container">
      <!-- Logo central con barras de colores -->
      <div class="header__logo-wrapper">
        <div class="header__stripes" aria-hidden="true"></div>
        <img src="/assets/logo.png" alt="Discs & Records" class="header__logo" />
      </div>

      <!-- Botones de autenticación -->
      <div class="header__buttons">
        <button class="header__btn header__btn--left">REGISTRARSE</button>
        <button class="header__btn header__btn--right">INICIAR SESIÓN</button>
      </div>
    </div>
  </div>

  <!-- Navegación principal -->
  <nav class="header__nav header__nav--desktop" aria-label="Navegación principal">
    <ul class="header__nav-list">
      <li class="header__nav-item">
        <a href="#" class="header__nav-link">MI LISTA</a>
      </li>
      <li class="header__nav-item">
        <a href="#" class="header__nav-link">ARTISTAS</a>
      </li>
      <li class="header__nav-item">
        <a href="#" class="header__nav-link">PRÓXIMAMENTE</a>
      </li>
    </ul>
  </nav>
</header>
```

---

### `<nav>` - Navegación

**Uso:** Agrupa enlaces de navegación principal. Siempre incluimos `aria-label` para contexto adicional.

**Ejemplo del proyecto:**

```html
<nav class="header__nav header__nav--desktop" aria-label="Navegación principal">
  <ul class="header__nav-list">
    <li class="header__nav-item">
      <a href="#" class="header__nav-link">MI LISTA</a>
    </li>
    <li class="header__nav-item">
      <a href="#" class="header__nav-link">ARTISTAS</a>
    </li>
  </ul>
</nav>
```

**Nota:** En móvil, tenemos una navegación secundaria con dropdown, también usando `<nav>` con diferente `aria-label`.

---

### `<main>` - Contenido principal

**Uso:** Envuelve el contenido principal único de cada página. Solo debe haber un `<main>` por página.

**Ejemplo del proyecto:**

```html
<!-- app.html -->
<app-header></app-header>

<app-main>
  <router-outlet></router-outlet>
</app-main>

<app-footer></app-footer>
```

```html
<!-- main.html -->
<main class="main">
  <div class="main__container">
    <ng-content></ng-content>
  </div>
</main>
```

---

### `<aside>` - Contenido complementario

**Uso:** Sidebar con información relacionada pero no esencial para el contenido principal.

**Ejemplo del proyecto:**

```html
<aside class="sidebar">
  <div class="sidebar__content">
    <!-- Navegación rápida -->
    <nav class="sidebar__nav" aria-label="Navegación rápida">
      <ul class="sidebar__nav-list">
        <li><a href="#" class="sidebar__nav-link">Inicio</a></li>
        <li><a href="#" class="sidebar__nav-link">Descubrir</a></li>
      </ul>
    </nav>
    
    <!-- Sección de tendencias -->
    <div class="sidebar__section">
      <h3 class="sidebar__title">Tendencias</h3>
      <div class="sidebar__trending">
        <div class="sidebar__trending-item">
          <span class="sidebar__trending-number">#1</span>
          <span class="sidebar__trending-text">Abbey Road</span>
        </div>
      </div>
    </div>
  </div>
</aside>
```

---

### `<section>` - Secciones temáticas

**Uso:** Agrupa contenido relacionado temáticamente. Cada sección debe tener un heading.

**Ejemplo esperado en el proyecto:**

```html
<section class="albums-section">
  <h2 class="albums-section__title">Álbumes en Tendencia</h2>
  <div class="albums-section__grid">
    <!-- Cards de álbumes -->
  </div>
</section>

<section class="reviews-section">
  <h2 class="reviews-section__title">Reseñas Recientes</h2>
  <div class="reviews-section__list">
    <!-- Lista de reseñas -->
  </div>
</section>
```

---

### `<article>` - Contenido autónomo

**Uso:** Contenido que podría distribuirse o reutilizarse independientemente (reseñas, posts, cards de álbumes).

**Ejemplo esperado en el proyecto:**

```html
<article class="album-card">
  <img src="album-cover.jpg" alt="Portada de Abbey Road" class="album-card__image" />
  <h3 class="album-card__title">Abbey Road</h3>
  <p class="album-card__artist">The Beatles</p>
  <div class="album-card__rating">
    <span class="album-card__stars">★★★★★</span>
    <span class="album-card__score">4.8</span>
  </div>
</article>

<article class="review">
  <header class="review__header">
    <h3 class="review__title">Una obra maestra atemporal</h3>
    <p class="review__meta">Por @usuario • Hace 2 días</p>
  </header>
  <p class="review__content">
    Abbey Road representa la culminación artística de The Beatles...
  </p>
</article>
```

---

### `<footer>` - Pie de página

**Uso:** Información institucional, enlaces secundarios, información de contacto.

**Ejemplo del proyecto:**

```html
<footer class="footer">
  <div class="footer__content">
    <div class="footer__stripes" aria-hidden="true"></div>
    
    <!-- Columna izquierda: enlaces institucionales -->
    <div class="footer__buttons-left">
      <button class="footer__btn footer__btn--left-top">API de Desarrollo</button>
      <button class="footer__btn footer__btn--left-middle">Mi perfil</button>
      <button class="footer__btn footer__btn--left-bottom">Contacto</button>
    </div>
    
    <!-- Centro: Logo -->
    <div class="footer__logo-wrapper">
      <img src="/assets/logo.png" alt="Discs & Records" class="footer__logo" />
    </div>
    
    <!-- Columna derecha: enlaces adicionales -->
    <div class="footer__buttons-right">
      <button class="footer__btn footer__btn--right-top">Sobre nosotros</button>
      <button class="footer__btn footer__btn--right-middle">Mi perfil</button>
      <button class="footer__btn footer__btn--right-bottom">Privacidad</button>
    </div>
  </div>
</footer>
```

---

## 2.2 Jerarquía de Headings

### Reglas de la jerarquía

1. **Un solo `<h1>` por página** - Representa el título principal del contenido
2. **No saltar niveles** - Siempre seguir el orden h1 → h2 → h3 → h4 → h5 → h6
3. **Los headings representan estructura** - No usar headings solo por estética
4. **Cada `<section>` debe tener un heading** - Para contexto semántico

---

### Diagrama de jerarquía del proyecto

```
Página: Inicio (Home)
│
├─ <h1> "Discs & Records" ─────────────────────── Título principal de la aplicación
│
├─ <section> Álbumes en Tendencia
│  └─ <h2> "Álbumes en Tendencia" ──────────────── Título de sección
│     ├─ <article> Card de álbum
│     │  └─ <h3> "Abbey Road" ───────────────────── Título del álbum
│     ├─ <article> Card de álbum
│     │  └─ <h3> "Dark Side of the Moon" ────────── Título del álbum
│     └─ <article> Card de álbum
│        └─ <h3> "Thriller" ──────────────────────── Título del álbum
│
├─ <section> Reseñas Recientes
│  └─ <h2> "Reseñas Recientes" ─────────────────── Título de sección
│     ├─ <article> Reseña
│     │  └─ <h3> "Una obra maestra atemporal" ───── Título de reseña
│     └─ <article> Reseña
│        └─ <h3> "Revolucionario para su época" ─── Título de reseña
│
└─ <aside> Sidebar
   ├─ <h2> "Navegación Rápida" ─────────────────── Título del sidebar
   └─ <h3> "Tendencias" ────────────────────────── Subsección del sidebar
```

---

### Ejemplo de implementación correcta

```html
<!DOCTYPE html>
<html lang="es">
<head>
  <title>Discs & Records - Inicio</title>
</head>
<body>
  <header>
    <!-- Navegación sin headings -->
  </header>

  <main>
    <h1>Descubre y valora tu música favorita</h1>

    <section class="albums-section">
      <h2>Álbumes en Tendencia</h2>
      <div class="albums-grid">
        <article class="album-card">
          <h3>Abbey Road</h3>
          <p>The Beatles • 1969</p>
        </article>
        <article class="album-card">
          <h3>Dark Side of the Moon</h3>
          <p>Pink Floyd • 1973</p>
        </article>
      </div>
    </section>

    <section class="reviews-section">
      <h2>Reseñas Recientes</h2>
      <article class="review">
        <h3>Una obra maestra atemporal</h3>
        <p class="review__meta">Reseña de Abbey Road por @usuario</p>
        <p class="review__content">...</p>
      </article>
    </section>

    <aside class="sidebar">
      <h2>Explorar</h2>
      <nav>
        <h3>Géneros</h3>
        <ul>
          <li><a href="#">Rock</a></li>
          <li><a href="#">Pop</a></li>
        </ul>
      </nav>
      
      <h3>Tendencias</h3>
      <div class="trending-list">
        <!-- Lista de tendencias -->
      </div>
    </aside>
  </main>

  <footer>
    <!-- Enlaces y copyright sin headings -->
  </footer>
</body>
</html>
```

---

### Ejemplo de jerarquía INCORRECTA (nunca hacer esto)

```html
<!-- ❌ INCORRECTO: Saltamos de h1 a h3 -->
<h1>Título Principal</h1>
<h3>Subtítulo</h3> <!-- ❌ Falta el h2 -->

<!-- ❌ INCORRECTO: Múltiples h1 en la misma página -->
<h1>Título Principal</h1>
<section>
  <h1>Otra sección</h1> <!-- ❌ Solo debe haber un h1 -->
</section>

<!-- ❌ INCORRECTO: Usar headings solo por estilo -->
<h2>Texto grande</h2>
<p>Contenido normal</p>
<h4>Texto mediano</h4> <!-- ❌ No hay jerarquía real -->
```

---

## 2.3 Estructura de Formularios

### Elementos clave de los formularios

1. **`<form>`** - Contenedor principal del formulario
2. **`<fieldset>`** - Agrupa campos relacionados lógicamente
3. **`<legend>`** - Describe el propósito del fieldset
4. **`<label>`** - Asociado a inputs mediante `for` e `id`
5. **Atributos ARIA** - Para mejorar accesibilidad

---

### Ejemplo del componente `register-form`

```html
<form class="register-form" (submit)="onSubmit($event)" method="post" novalidate>
  
  <!-- Fieldset 1: Información de cuenta -->
  <fieldset class="register-form__fieldset">
    <legend class="register-form__legend">Crea tu cuenta</legend>
    
    <!-- Campo de nombre de usuario -->
    <div class="register-form__field">
      <label for="register-username" class="register-form__label">
        Nombre de usuario
        <span class="register-form__required" aria-label="Campo requerido">*</span>
      </label>
      <input
        id="register-username"
        type="text"
        name="username"
        placeholder="tunombredeusuario"
        required
        class="register-form__input"
        [attr.aria-invalid]="usernameError()"
        [attr.aria-describedby]="usernameError() ? 'username-error' : 'username-help'"
        autocomplete="username" />
      
      <!-- Mensaje de error -->
      <p 
        *ngIf="usernameError()" 
        id="username-error"
        class="register-form__error"
        role="alert">
        {{ usernameErrorMessage() }}
      </p>
      
      <!-- Texto de ayuda -->
      <p 
        *ngIf="!usernameError()" 
        id="username-help"
        class="register-form__help">
        Este será tu nombre visible en Discs & Records
      </p>
    </div>
    
    <!-- Campo de correo electrónico -->
    <div class="register-form__field">
      <label for="register-email" class="register-form__label">
        Correo electrónico
        <span class="register-form__required" aria-label="Campo requerido">*</span>
      </label>
      <input
        id="register-email"
        type="email"
        name="email"
        placeholder="tu@email.com"
        required
        class="register-form__input"
        [attr.aria-invalid]="emailError()"
        [attr.aria-describedby]="emailError() ? 'email-error' : 'email-help'"
        autocomplete="email" />
      
      <!-- Mensaje de error -->
      <p 
        *ngIf="emailError()" 
        id="email-error"
        class="register-form__error"
        role="alert">
        {{ emailErrorMessage() }}
      </p>
      
      <!-- Texto de ayuda -->
      <p 
        *ngIf="!emailError()" 
        id="email-help"
        class="register-form__help">
        Lo usaremos para enviarte actualizaciones de tus álbumes favoritos
      </p>
    </div>
  </fieldset>
  
  <!-- Fieldset 2: Seguridad -->
  <fieldset class="register-form__fieldset">
    <legend class="register-form__legend">Seguridad</legend>
    
    <!-- Campo de contraseña -->
    <div class="register-form__field">
      <label for="register-password" class="register-form__label">
        Contraseña
        <span class="register-form__required" aria-label="Campo requerido">*</span>
      </label>
      <input
        id="register-password"
        type="password"
        name="password"
        placeholder="••••••••"
        required
        class="register-form__input"
        autocomplete="new-password" />
    </div>
  </fieldset>

  <!-- Botón de envío -->
  <button type="submit" class="register-form__submit">
    Crear cuenta
  </button>
</form>
```

---

### Componente reutilizable `form-input`

Este componente encapsula la lógica de label + input + mensajes, facilitando la creación de formularios accesibles.

```html
<!-- form-input.html -->
<div class="form-input-wrapper">
  <!-- Label con asociación al input mediante 'for' -->
  <label 
    [for]="inputId" 
    class="form-input__label"
    [class.form-input__label--required]="required">
    {{ label }}
    <span class="form-input__required-indicator" *ngIf="required" aria-label="Campo requerido">*</span>
  </label>
  
  <!-- Input con todos los atributos necesarios -->
  <input 
    [id]="inputId"
    [type]="type"
    [name]="name"
    [placeholder]="placeholder"
    [required]="required"
    [disabled]="disabled"
    class="form-input__field"
    [class.form-input__field--error]="hasError"
    [class.form-input__field--success]="hasSuccess"
    [attr.aria-describedby]="(helpText || errorMessage) ? inputId + '-description' : null"
    [attr.aria-invalid]="hasError"
    [attr.aria-required]="required" />
  
  <!-- Mensaje de error (solo se muestra si hay error) -->
  <p 
    *ngIf="hasError && errorMessage" 
    [id]="inputId + '-description'"
    class="form-input__error"
    role="alert">
    {{ errorMessage }}
  </p>
  
  <!-- Texto de ayuda (solo se muestra si no hay error) -->
  <p 
    *ngIf="!hasError && helpText" 
    [id]="inputId + '-description'"
    class="form-input__help">
    {{ helpText }}
  </p>
</div>
```

---

### Explicación de la estructura

#### 1. **Uso de `<fieldset>` y `<legend>`**

```html
<fieldset class="register-form__fieldset">
  <legend class="register-form__legend">Crea tu cuenta</legend>
  <!-- Campos relacionados -->
</fieldset>
```

- **`<fieldset>`**: Agrupa campos lógicamente relacionados (por ejemplo, "Información de cuenta" vs "Seguridad")
- **`<legend>`**: Proporciona un título descriptivo para el grupo de campos
- **Beneficio**: Los lectores de pantalla anuncian el contexto del fieldset cuando el usuario navega por él

#### 2. **Asociación `<label>` con `<input>` mediante `for` e `id`**

```html
<label for="register-username" class="register-form__label">
  Nombre de usuario
</label>
<input id="register-username" type="text" name="username" />
```

- El atributo `for` del label debe coincidir exactamente con el `id` del input
- **Beneficio**: Al hacer clic en el label, el input recibe foco automáticamente
- **Accesibilidad**: Los lectores de pantalla asocian el texto del label con el campo

#### 3. **Indicadores de campos requeridos**

```html
<label for="register-username">
  Nombre de usuario
  <span class="register-form__required" aria-label="Campo requerido">*</span>
</label>
```

- El asterisco `*` indica visualmente que el campo es obligatorio
- `aria-label="Campo requerido"` proporciona contexto para lectores de pantalla
- El atributo `required` en el input activa la validación nativa del navegador

#### 4. **Atributos ARIA para accesibilidad**

```html
<input
  id="register-username"
  [attr.aria-invalid]="usernameError()"
  [attr.aria-describedby]="usernameError() ? 'username-error' : 'username-help'" />

<p id="username-error" class="register-form__error" role="alert">
  El nombre de usuario debe tener al menos 3 caracteres
</p>
```

- **`aria-invalid`**: Indica si el campo tiene un error de validación
- **`aria-describedby`**: Vincula el input con un elemento que lo describe (mensaje de error o ayuda)
- **`role="alert"`**: Anuncia inmediatamente el error a los lectores de pantalla

#### 5. **Mensajes de error y ayuda**

```html
<!-- Mensaje de error (prioridad alta) -->
<p 
  *ngIf="usernameError()" 
  id="username-error"
  class="register-form__error"
  role="alert">
  {{ usernameErrorMessage() }}
</p>

<!-- Texto de ayuda (solo si no hay error) -->
<p 
  *ngIf="!usernameError()" 
  id="username-help"
  class="register-form__help">
  Este será tu nombre visible en Discs & Records
</p>
```

- Los mensajes de error se muestran solo cuando hay un problema
- Los textos de ayuda guían al usuario sobre qué introducir
- Ambos están vinculados al input mediante `aria-describedby`

---

### Ventajas de esta estructura

✅ **Accesibilidad mejorada**: Lectores de pantalla pueden navegar y entender el formulario  
✅ **Validación clara**: Los errores están asociados visualmente y semánticamente con los campos  
✅ **Experiencia de usuario**: Labels clicables, mensajes de ayuda contextuales  
✅ **SEO y semántica**: HTML estructurado correctamente  
✅ **Mantenibilidad**: Componente reutilizable `form-input` reduce duplicación

---
