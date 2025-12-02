# Sección 1: Arquitectura CSS y comunicación visual.

## Principios de la comunicación visual: Mockup inicial y página tipo showcase.

### Jerarquía
La jerarquía visual se establece mediante una escala tipográfica bien definida y el uso estratégico del espacio, para ello, se establecen varios niveles de prioridad visual:

- **Nivel 1 - Título principal:** El texto **"Puntúa todas tus canciones y álbumes favoritos en un solo lugar"** utiliza un tamaño grande (~4.25rem/68px), peso regular y posición centrada para captar inmediatamente la atención. Este es el punto focal de la página invitando al usuario a realizar la acción pricipal de la aplicación web.
- **Nivel 2 - Call-to-Action primario:** El botón "COMIENZA AQUÍ" destaca con fondo naranja dorado (#ED9C05), texto en mayúsculas y sombra estilo neon de forma original. Este botón justo en medio y debajo del lema, crea urgencia visual al usuario, invitandolo a crear cuenta para tener su propio registro.
- **Nivel 3 - Títulos de sección:** "ÁLBUMES EN TENDENCIA" usa una tipografía decorativa (Monoton) con estilo retro 70s y tamaño intermedio (~2.625rem/42px), diferenciándose del contenido principal, creado contraste con el resto de la página. Esta tipografía es difícil de leer en textos largos, por lo que la decisión de diseño aquí ha sido usarlo en palabras cortas o frases de 3 o 4 palabras.
- **Nivel 4 - Navegación:** Los botones "REGISTRARSE" e "INICIAR SESIÓN" tienen menor jerarquía visual, integrados en la barra superior con fondo semi-transparente; los cuales no impiden a usuarios que ya hayan comenzado sus registros, perderse. Los botones son grandes con el fin de ser accesibles.
- **Nivel 5 - Elementos de apoyo:** *Labels* como "Busca lo que más te guste" y controles del carrusel (flechas) usan tamaños menores para no competir con el contenido principal.

![Principio 1 de la comunicación visual: Jerarquía](img/pagina_principal-vistazo_jeraraquia.png)

---

### Contraste
El contraste se aplica de múltiples formas para diferenciar elementos y mejorar la legibilidad:

- **Contraste cromático:** La paleta cálida 70s (naranjas #ED9C05, #CA6703, #BB3F03, rojo vino #9D2227) sobre fondos claros (#FBFAF2, beige #E7D8AB) crea una separación visual clara. El header con degradado naranja contrasta fuertemente con el contenido beige inferior. Se alterna a una paleta fría para el modo oscuro, que sigue recordando a los colores de los años 70s (verde menta #93CFBB, teales #0A9295, #015F72) sobre fondo azul noche (#01131B) para mantener la identidad pero adaptar el contraste.
- **Contraste de tamaño:** La diferencia entre el título principal (4.25rem) y el texto de párrafo (1rem) es de 4:1, generando una jerarquía clara e inmediata. Esto busca hacer que el usuario entienda con el lema el propósito principal de la página.
- **Contraste de peso:** Los botones usan texto en mayúsculas con peso medio, mientras que el cuerpo de texto usa peso regular.
- **Contraste figura-fondo:** El logo circular negro "DISCS & RECORDS" sobre las franjas de colores arcoíris crea un punto focal fuerte en la navegación.

![Principio 2 de la comunicación visual: Contraste - Modo claro](img/pagina_principal-vistazo_jeraraquia.png)

![Principio 2 de la comunicación visual: Contraste - Modo oscuro](img/pagina_principal-vistazo_modo_oscuro.png)

---

### Alineación
La estrategia de alineación combina múltiples técnicas según el contexto de cada vista:

**En la página de perfil de usuario:**
- **Layout de dos columnas:** La vista de perfil utiliza un layout asimétrico donde la información del usuario (avatar, nombre, estadísticas de géneros) ocupa aproximadamente 1/3 del ancho a la izquierda, mientras que el contenido principal (tabs y grid de álbumes) ocupa 2/3 a la derecha.
- **Alineación izquierda en el sidebar:** El nombre de usuario "PerreteGordete", los géneros más escuchados y las barras de progreso se alinean a la izquierda, facilitando la lectura vertical de la información.
- **Grid para álbumes:** Los álbumes del usuario se organizan en un CSS Grid de 5 columnas con `grid-template-columns: repeat(auto-fit, minmax(250px, 1fr))`, permitiendo una distribución uniforme y responsiva.
- **Tabs centrados:** Los botones "Reseñas", "Álbumes" y "Canciones" se agrupan y centran sobre el grid de contenido, indicando claramente las opciones de navegación.

![Principio 3 de la comunicación visual: Alineación - Perfil de usuario](img/perfil_usuario-alineacion.png)

**En elementos globales:**
- **Alineación del header:** Los elementos de navegación (logo, botones) se distribuyen usando flexbox con `justify-content: space-between`, manteniendo equilibrio visual en todas las páginas.
- **Centrado de contenido hero:** En la página principal, el título y CTA se centran horizontalmente creando un eje visual.
- **Contenedor con borde:** El grid de álbumes está envuelto en un contenedor con borde naranja/rojo (#CA6703) que delimita visualmente el área de contenido.

![Principio 3 de la comunicación visual: Alineación - Global](img/pagina_principal-vistazo_alineacion.png)

---

### Proximidad
El espaciado agrupa elementos relacionados y separa secciones distintas:

- **Grupo Hero:** El título, subtítulo, botón CTA y buscador están agrupados con espaciado reducido entre ellos (~1-2rem), indicando que pertenecen a la misma unidad funcional.
- **Separación de secciones:** Entre el área hero y "Álbumes en tendencia" hay un espaciado mayor (~3-4rem), indicando cambio de contexto.
- **Cards de álbumes:** Los álbumes mantienen un `gap` consistente de 2rem ($espaciado-m) entre ellos, sugiriendo que son elementos del mismo tipo pero independientes.
- **Navegación agrupada:** Los botones "REGISTRARSE" e "INICIAR SESIÓN" comparten el mismo contenedor visual (barra naranja), indicando que son acciones relacionadas de autenticación.
- **Franjas decorativas:** Las líneas de colores en el header están muy próximas entre sí (sin gap), formando un único elemento decorativo cohesivo.

![Principio 4 de la comunicación visual: Proximidad](img/carruseles-ejemplo-proximidad.png)

---

### Repetición
La coherencia visual se logra repitiendo patrones en toda la interfaz:

- **Paleta de colores:** Los mismos naranjas y tierras (#ED9C05, #CA6703, #BB3F03, #9D2227) aparecen en el header, botones, títulos decorativos y acentos, creando unidad visual.
- **Bordes neobrutalistas:** Los elementos interactivos (botones, cards, inputs) comparten el mismo estilo de borde negro sólido y sombras offset (4px 4px 0px), reforzando la estética retro-brutal.
- **Tipografía consistente:** Space Grotesk se usa en todo el UI, con Monoton reservado solo para títulos decorativos de sección.
- **Forma de las cards:** Todos los álbumes usan el mismo formato cuadrado con bordes redondeados y el contenedor rojo de borde grueso se repite como patrón de agrupación.
- **Iconografía:** Las flechas del carrusel usan el mismo estilo circular con borde, manteniendo coherencia con los demás elementos interactivos.
- **Espaciado modular:** Se repiten los mismos valores de espaciado ($espaciado-s: 1rem, $espaciado-m: 2rem, $espaciado-l: 3rem) en toda la aplicación.



---

## Metodología CSS:
**ITCSS (Inverted Triangle CSS)** - Organización de estilos desde lo más genérico hasta lo más específico:

1. **Settings:** Variables y configuración (sin output CSS)
2. **Tools:** Mixins y funciones (sin output CSS)
3. **Generic:** Reset y normalize
4. **Elements:** Estilos base de elementos HTML
5. **Layout:** Estructuras y sistemas de grid
6. **Components:** Componentes de UI reutilizables
7. **Utilities:** Clases de utilidad con !important

Esta metodología evita problemas de especificidad y facilita el mantenimiento del código.

---

## Organización de archivos:
```
styles/
├── 00-settings/
│   └── _variables.scss      # Tokens de diseño (colores, tipografía, espaciado, breakpoints, sombras)
├── 01-tools/
│   └── _mixins.scss         # Mixins reutilizables (tipografía, temas, media queries)
├── 02-generic/
│   └── _reset.scss          # CSS Reset agresivo
├── 03-elements/
│   └── (estilos base HTML)  # Estilos para h1-h6, p, a, button, input, etc.
├── 04-layout/
│   └── _grid.scss           # Sistema de grid (CSS Grid + Flexbox)
├── 05-components/
│   └── (componentes UI)     # Cards, modales, alertas, navegación, etc.
├── 06-utilities/
│   └── (utilidades)         # Clases helper (.text-center, .mt-1, .hidden, etc.)
└── styles.scss              # Archivo principal que importa todo en orden ITCSS
```

---

## Sistema de Design Tokens:
Los design tokens centralizan todos los valores de diseño en variables SCSS:

### Colores
| Token | Valor Light | Valor Dark | Uso |
|-------|-------------|------------|-----|
| `$color-primario` | #ED9C05 (naranja dorado) | #93CFBB (verde menta) | Acciones principales, CTAs |
| `$color-secundario` | #CA6703 (naranja quemado) | #0A9295 (teal vibrante) | Acciones secundarias |
| `$color-contraste` | #BB3F03 (naranja rojizo) | #015F72 (teal profundo) | Acentos, hover states |
| `$color-acentuado` | #9D2227 (rojo vino) | #01131B (azul noche) | Alertas, énfasis |
| `$color-fondo` | #FBFAF2 (crema) | #01131B (azul noche) | Fondos principales |

### Tipografía
| Token | Valor | Uso |
|-------|-------|-----|
| `$fuente-principal` | 'Space Grotesk' | Todo el UI |
| `$fuente-secundaria` | 'Monoton' | Títulos decorativos |
| `$tamanio-fuente-h1` | 4.25rem (68px) | Títulos principales |
| `$tamanio-fuente-h2` | 2.625rem (42px) | Subtítulos de sección |
| `$tamanio-fuente-parrafo` | 1rem (16px) | Cuerpo de texto |

### Espaciado
| Token | Valor | Uso |
|-------|-------|-----|
| `$espaciado-xs` | 0.5rem (8px) | Padding interno mínimo |
| `$espaciado-s` | 1rem (16px) | Separación entre elementos cercanos |
| `$espaciado-m` | 2rem (32px) | Gap de grid, márgenes de sección |
| `$espaciado-l` | 3rem (48px) | Separación entre secciones |
| `$espaciado-xl` | 4rem (64px) | Espaciado hero, grandes bloques |

### Sombras Neobrutalistas
```scss
$sombra-brutal-s: 4px 4px 0px $color-letra-oscura;   // Elementos pequeños
$sombra-brutal-m: 6px 6px 0px $color-letra-oscura;   // Botones, cards
$sombra-vinilo-m: múltiples capas de colores;        // Efecto disco retro
$sombra-sunset-m: 4px 4px 0px $color-contraste-light; // CTAs cálidos
```

---

## Mixins y funciones:

### `@mixin font-size-line($tipo)`
Aplica tamaño de fuente y altura de línea según el tipo de elemento.
```scss
@include font-size-line('h1');  // Aplica 4.25rem y line-height 4.5rem
@include font-size-line('parrafo');  // Aplica 1rem y line-height 1.5rem
```

### `@mixin theme-colors($modo)`
Aplica colores de fondo y texto según el tema.
```scss
@include theme-colors('light');  // Fondo crema, texto oscuro
@include theme-colors('dark');   // Fondo azul noche, texto claro
```

### `@mixin respond-to($breakpoint)`
Media queries basadas en breakpoints predefinidos.
```scss
@include respond-to('tablet') {
  // Estilos para tablet y menor
}
```

### `@mixin alert-accesible-dark`
Mejora la accesibilidad de alertas en modo oscuro usando el color menta como fondo.
```scss
@include alert-accesible-dark;  // Fondo menta #93CFBB, texto oscuro
```

---

## ViewEncapsulation en Angular:
Angular ofrece tres modos de encapsulación de estilos:

### `ViewEncapsulation.Emulated` (por defecto)
- Simula Shadow DOM añadiendo atributos únicos a los elementos
- Los estilos del componente no afectan a otros componentes
- **Uso recomendado:** Componentes con estilos específicos

### `ViewEncapsulation.None`
- Los estilos se aplican globalmente
- Útil para estilos que deben afectar a toda la aplicación
- **Uso recomendado:** Componentes de layout o temas globales

### `ViewEncapsulation.ShadowDom`
- Usa Shadow DOM nativo del navegador
- Aislamiento completo de estilos
- **Uso recomendado:** Web components reutilizables

### Estrategia del proyecto:
- **Estilos globales** (`styles.scss`): Variables, reset, grid, utilities
- **Estilos de componentes**: `ViewEncapsulation.Emulated` para mantener estilos encapsulados
- **Acceso a variables globales**: Usar `@use` para importar variables en componentes que lo necesiten

---
---
---

# CÓDIGO PARA DEMOS INTERACTIVAS EN GITHUB

> **Nota:** GitHub no permite estilos ni scripts inline en Markdown por seguridad. 
> Sin embargo, puedes usar estos fragmentos HTML en archivos `.html` independientes 
> o en GitHub Pages para mostrar demos funcionales.

---

=== Codigo para BOTONES NEOBRUTALISTAS ===

```html
<!-- Guardar como: demos/botones.html -->
<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="UTF-8">
  <title>Demo Botones - Discs & Records</title>
  <link href="https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@400;600&display=swap" rel="stylesheet">
  <style>
    :root {
      --color-fondo-light: #FBFAF2;
      --color-letra-oscura: #01131B;
      --color-letra-blanca: #FBFAF2;
      --color-primario-light: #ED9C05;
      --color-secundario-light: #CA6703;
      --color-contraste-light: #BB3F03;
      --color-acentuado-light: #9D2227;
    }
    body {
      font-family: 'Space Grotesk', sans-serif;
      background: var(--color-fondo-light);
      padding: 2rem;
      display: flex;
      gap: 1rem;
      flex-wrap: wrap;
    }
    .btn {
      font-family: inherit;
      font-size: 1rem;
      font-weight: 600;
      padding: 0.75rem 1.5rem;
      border: 3px solid var(--color-letra-oscura);
      border-radius: 5px;
      cursor: pointer;
      transition: all 0.1s ease;
      text-transform: uppercase;
      letter-spacing: 0.05em;
    }
    .btn-primario {
      background: var(--color-primario-light);
      color: var(--color-letra-oscura);
      box-shadow: 4px 4px 0px var(--color-letra-oscura);
    }
    .btn-primario:hover {
      box-shadow: 2px 2px 0px var(--color-letra-oscura);
      transform: translate(2px, 2px);
    }
    .btn-primario:active {
      box-shadow: 0px 0px 0px var(--color-letra-oscura);
      transform: translate(4px, 4px);
    }
    .btn-secundario {
      background: var(--color-secundario-light);
      color: var(--color-letra-blanca);
      box-shadow: 4px 4px 0px var(--color-letra-oscura);
    }
    .btn-contraste {
      background: var(--color-contraste-light);
      color: var(--color-letra-blanca);
      box-shadow: 4px 4px 0px var(--color-letra-oscura);
    }
    .btn-acentuado {
      background: var(--color-acentuado-light);
      color: var(--color-letra-blanca);
      box-shadow: 4px 4px 0px var(--color-letra-oscura);
    }
    .btn-vinilo {
      background: var(--color-primario-light);
      color: var(--color-letra-oscura);
      box-shadow: 
        2px 2px 0px var(--color-acentuado-light),
        4px 4px 0px var(--color-contraste-light),
        6px 6px 0px var(--color-secundario-light);
    }
  </style>
</head>
<body>
  <button class="btn btn-primario">Primario</button>
  <button class="btn btn-secundario">Secundario</button>
  <button class="btn btn-contraste">Contraste</button>
  <button class="btn btn-acentuado">Acentuado</button>
  <button class="btn btn-vinilo">Efecto Vinilo</button>
</body>
</html>
```

---

=== Codigo para INPUTS ===

```html
<!-- Guardar como: demos/inputs.html -->
<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="UTF-8">
  <title>Demo Inputs - Discs & Records</title>
  <link href="https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@400;600&display=swap" rel="stylesheet">
  <style>
    :root {
      --color-fondo-light: #FBFAF2;
      --color-letra-oscura: #01131B;
      --color-letra-desactivado: rgba(1, 19, 27, 0.5);
      --color-primario-light: #ED9C05;
      --color-error: #E04A4A;
      --color-exito: #AAD661;
    }
    body {
      font-family: 'Space Grotesk', sans-serif;
      background: var(--color-fondo-light);
      padding: 2rem;
      display: flex;
      gap: 2rem;
      flex-wrap: wrap;
    }
    .input-group {
      display: flex;
      flex-direction: column;
      gap: 0.5rem;
    }
    .label {
      font-size: 0.875rem;
      color: var(--color-letra-desactivado);
    }
    .input {
      font-family: inherit;
      font-size: 1rem;
      padding: 0.75rem 1rem;
      border: 3px solid var(--color-letra-oscura);
      border-radius: 5px;
      background: var(--color-fondo-light);
      box-shadow: 4px 4px 0px var(--color-letra-oscura);
      outline: none;
      transition: all 0.1s ease;
      width: 250px;
    }
    .input:focus {
      box-shadow: 2px 2px 0px var(--color-primario-light);
      border-color: var(--color-primario-light);
    }
    .input::placeholder {
      color: var(--color-letra-desactivado);
    }
    .input-error {
      border-color: var(--color-error);
      box-shadow: 4px 4px 0px var(--color-error);
    }
    .input-success {
      border-color: var(--color-exito);
      box-shadow: 4px 4px 0px var(--color-exito);
    }
  </style>
</head>
<body>
  <div class="input-group">
    <label class="label">Input normal</label>
    <input type="text" class="input" placeholder="Una canción, un álbum...">
  </div>
  <div class="input-group">
    <label class="label">Input con error</label>
    <input type="text" class="input input-error" value="Texto inválido">
  </div>
  <div class="input-group">
    <label class="label">Input válido</label>
    <input type="text" class="input input-success" value="Correcto!">
  </div>
</body>
</html>
```

---

=== Codigo para CARDS ===

```html
<!-- Guardar como: demos/cards.html -->
<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="UTF-8">
  <title>Demo Cards - Discs & Records</title>
  <link href="https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@400;600&display=swap" rel="stylesheet">
  <style>
    :root {
      --color-fondo-light: #FBFAF2;
      --color-fondo-light-secundario: #E7D8AB;
      --color-letra-oscura: #01131B;
      --color-letra-desactivado: rgba(1, 19, 27, 0.5);
      --color-primario-light: #ED9C05;
      --color-secundario-light: #CA6703;
      --color-contraste-light: #BB3F03;
      --color-acentuado-light: #9D2227;
    }
    body {
      font-family: 'Space Grotesk', sans-serif;
      background: var(--color-fondo-light);
      padding: 2rem;
      display: flex;
      gap: 2rem;
      flex-wrap: wrap;
    }
    .card {
      background: var(--color-fondo-light);
      border: 3px solid var(--color-letra-oscura);
      border-radius: 5px;
      padding: 1rem;
      box-shadow: 6px 6px 0px var(--color-letra-oscura);
      max-width: 200px;
    }
    .card-vinilo {
      box-shadow: 
        2px 2px 0px var(--color-acentuado-light),
        4px 4px 0px var(--color-contraste-light),
        6px 6px 0px var(--color-secundario-light),
        8px 8px 0px var(--color-primario-light);
    }
    .card-img {
      width: 100%;
      height: 120px;
      background: var(--color-fondo-light-secundario);
      border: 2px solid var(--color-letra-oscura);
      border-radius: 3px;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 3rem;
    }
    .card-title {
      font-size: 1.125rem;
      font-weight: 600;
      margin: 1rem 0 0.25rem;
    }
    .card-text {
      color: var(--color-letra-desactivado);
      font-size: 0.875rem;
    }
    .badge {
      display: inline-block;
      padding: 0.25rem 0.5rem;
      font-size: 0.625rem;
      font-weight: 600;
      text-transform: uppercase;
      border: 2px solid var(--color-letra-oscura);
      border-radius: 3px;
      box-shadow: 2px 2px 0px var(--color-letra-oscura);
      margin-top: 0.75rem;
      background: var(--color-primario-light);
    }
  </style>
</head>
<body>
  <div class="card">
    <div class="card-img">💿</div>
    <h3 class="card-title">Rumours</h3>
    <p class="card-text">Fleetwood Mac • 1977</p>
    <span class="badge">Rock</span>
  </div>
  <div class="card card-vinilo">
    <div class="card-img">🎵</div>
    <h3 class="card-title">Thriller</h3>
    <p class="card-text">Michael Jackson • 1982</p>
    <span class="badge">Pop</span>
  </div>
</body>
</html>
```

---

=== Codigo para ALERTAS NEON ===

```html
<!-- Guardar como: demos/alertas.html -->
<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="UTF-8">
  <title>Demo Alertas - Discs & Records</title>
  <link href="https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@400;500&display=swap" rel="stylesheet">
  <style>
    :root {
      --color-fondo-light: #FBFAF2;
      --color-error: #E04A4A;
      --color-advertencia-light: #FFC047;
      --color-exito: #AAD661;
      --color-informacion: #0A9295;
    }
    body {
      font-family: 'Space Grotesk', sans-serif;
      background: var(--color-fondo-light);
      padding: 2rem;
      display: flex;
      flex-direction: column;
      gap: 1rem;
      max-width: 500px;
    }
    .alert {
      padding: 1rem;
      border: 3px solid;
      border-radius: 5px;
      font-weight: 500;
    }
    .alert-error {
      background: rgba(224, 74, 74, 0.1);
      border-color: var(--color-error);
      color: var(--color-error);
      box-shadow: 0px 0px 10px var(--color-error), 0px 0px 20px rgba(224, 74, 74, 0.3);
    }
    .alert-warning {
      background: rgba(255, 192, 71, 0.1);
      border-color: var(--color-advertencia-light);
      color: #8B6914;
      box-shadow: 0px 0px 10px var(--color-advertencia-light), 0px 0px 20px rgba(255, 192, 71, 0.3);
    }
    .alert-success {
      background: rgba(170, 214, 97, 0.1);
      border-color: var(--color-exito);
      color: #5A7A1E;
      box-shadow: 0px 0px 10px var(--color-exito), 0px 0px 20px rgba(170, 214, 97, 0.3);
    }
    .alert-info {
      background: rgba(10, 146, 149, 0.1);
      border-color: var(--color-informacion);
      color: var(--color-informacion);
      box-shadow: 0px 0px 10px var(--color-informacion), 0px 0px 20px rgba(10, 146, 149, 0.3);
    }
  </style>
</head>
<body>
  <div class="alert alert-error">❌ Error: No se pudo guardar la canción.</div>
  <div class="alert alert-warning">⚠️ Advertencia: Este álbum ya está en tu lista.</div>
  <div class="alert alert-success">✅ Éxito: Tu reseña ha sido publicada.</div>
  <div class="alert alert-info">ℹ️ Info: Nuevo álbum disponible.</div>
</body>
</html>
```

---

=== Codigo para BADGES/TAGS ===

```html
<!-- Guardar como: demos/badges.html -->
<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="UTF-8">
  <title>Demo Badges - Discs & Records</title>
  <link href="https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@600&display=swap" rel="stylesheet">
  <style>
    :root {
      --color-fondo-light: #FBFAF2;
      --color-letra-oscura: #01131B;
      --color-letra-blanca: #FBFAF2;
      --color-primario-light: #ED9C05;
      --color-secundario-light: #CA6703;
      --color-contraste-light: #BB3F03;
      --color-acentuado-light: #9D2227;
    }
    body {
      font-family: 'Space Grotesk', sans-serif;
      background: var(--color-fondo-light);
      padding: 2rem;
      display: flex;
      gap: 1rem;
      flex-wrap: wrap;
    }
    .badge {
      display: inline-block;
      padding: 0.25rem 0.75rem;
      font-size: 0.75rem;
      font-weight: 600;
      text-transform: uppercase;
      border: 2px solid var(--color-letra-oscura);
      border-radius: 3px;
      box-shadow: 2px 2px 0px var(--color-letra-oscura);
    }
    .badge-primario { background: var(--color-primario-light); color: var(--color-letra-oscura); }
    .badge-secundario { background: var(--color-secundario-light); color: var(--color-letra-blanca); }
    .badge-contraste { background: var(--color-contraste-light); color: var(--color-letra-blanca); }
    .badge-acentuado { background: var(--color-acentuado-light); color: var(--color-letra-blanca); }
  </style>
</head>
<body>
  <span class="badge badge-primario">Rock</span>
  <span class="badge badge-secundario">Jazz</span>
  <span class="badge badge-contraste">Disco</span>
  <span class="badge badge-acentuado">Funk</span>
</body>
</html>
```

---

=== Codigo para PALETA DE COLORES ===

```html
<!-- Guardar como: demos/paleta-colores.html -->
<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="UTF-8">
  <title>Demo Paleta - Discs & Records</title>
  <link href="https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@600&display=swap" rel="stylesheet">
  <style>
    :root {
      --color-fondo-light: #FBFAF2;
      --color-letra-oscura: #01131B;
    }
    body {
      font-family: 'Space Grotesk', sans-serif;
      background: var(--color-fondo-light);
      padding: 2rem;
    }
    h3 {
      margin-bottom: 1rem;
      color: var(--color-letra-oscura);
    }
    .color-grid {
      display: grid;
      grid-template-columns: repeat(4, 120px);
      gap: 1rem;
      margin-bottom: 2rem;
    }
    .color-swatch {
      aspect-ratio: 1;
      border: 3px solid var(--color-letra-oscura);
      border-radius: 5px;
      box-shadow: 4px 4px 0px var(--color-letra-oscura);
      display: flex;
      flex-direction: column;
      justify-content: flex-end;
      overflow: hidden;
    }
    .color-swatch span {
      background: var(--color-fondo-light);
      padding: 0.25rem 0.5rem;
      font-size: 0.5rem;
      font-weight: 600;
      border-top: 2px solid var(--color-letra-oscura);
    }
  </style>
</head>
<body>
  <h3>Modo Light (Cálidos)</h3>
  <div class="color-grid">
    <div class="color-swatch" style="background: #ED9C05;"><span>Primario #ED9C05</span></div>
    <div class="color-swatch" style="background: #CA6703;"><span>Secundario #CA6703</span></div>
    <div class="color-swatch" style="background: #BB3F03;"><span>Contraste #BB3F03</span></div>
    <div class="color-swatch" style="background: #9D2227;"><span>Acentuado #9D2227</span></div>
  </div>
  
  <h3>Modo Dark (Fríos)</h3>
  <div class="color-grid">
    <div class="color-swatch" style="background: #93CFBB;"><span>Primario #93CFBB</span></div>
    <div class="color-swatch" style="background: #0A9295;"><span>Secundario #0A9295</span></div>
    <div class="color-swatch" style="background: #015F72;"><span>Contraste #015F72</span></div>
    <div class="color-swatch" style="background: #01131B;"><span style="color: white;">Acentuado #01131B</span></div>
  </div>
</body>
</html>
```

---

=== Codigo para NAVEGACIÓN ===

```html
<!-- Guardar como: demos/navegacion.html -->
<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="UTF-8">
  <title>Demo Navegación - Discs & Records</title>
  <link href="https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@500&display=swap" rel="stylesheet">
  <style>
    :root {
      --color-fondo-light: #FBFAF2;
      --color-fondo-light-secundario: #E7D8AB;
      --color-letra-oscura: #01131B;
      --color-primario-light: #ED9C05;
    }
    body {
      font-family: 'Space Grotesk', sans-serif;
      background: var(--color-fondo-light);
      padding: 2rem;
    }
    .nav {
      display: flex;
      gap: 0;
      border: 3px solid var(--color-letra-oscura);
      border-radius: 5px;
      box-shadow: 4px 4px 0px var(--color-letra-oscura);
      background: var(--color-fondo-light);
      width: fit-content;
      overflow: hidden;
    }
    .nav-item {
      padding: 0.75rem 1.5rem;
      border-right: 3px solid var(--color-letra-oscura);
      cursor: pointer;
      font-weight: 500;
      transition: background 0.1s;
    }
    .nav-item:last-child {
      border-right: none;
    }
    .nav-item:hover {
      background: var(--color-fondo-light-secundario);
    }
    .nav-item.active {
      background: var(--color-primario-light);
    }
  </style>
</head>
<body>
  <nav class="nav">
    <div class="nav-item active">Inicio</div>
    <div class="nav-item">Álbumes</div>
    <div class="nav-item">Canciones</div>
    <div class="nav-item">Artistas</div>
    <div class="nav-item">Mi perfil</div>
  </nav>
</body>
</html>
```

---

=== Codigo para PROGRESS BARS ===

```html
<!-- Guardar como: demos/progress.html -->
<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="UTF-8">
  <title>Demo Progress - Discs & Records</title>
  <link href="https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@400&display=swap" rel="stylesheet">
  <style>
    :root {
      --color-fondo-light: #FBFAF2;
      --color-fondo-light-secundario: #E7D8AB;
      --color-letra-oscura: #01131B;
      --color-primario-light: #ED9C05;
      --color-secundario-light: #CA6703;
      --color-contraste-light: #BB3F03;
    }
    body {
      font-family: 'Space Grotesk', sans-serif;
      background: var(--color-fondo-light);
      padding: 2rem;
      max-width: 400px;
    }
    .label {
      font-size: 0.875rem;
      color: rgba(1, 19, 27, 0.6);
      margin-bottom: 0.5rem;
      display: block;
    }
    .progress {
      height: 24px;
      background: var(--color-fondo-light-secundario);
      border: 3px solid var(--color-letra-oscura);
      border-radius: 5px;
      box-shadow: 4px 4px 0px var(--color-letra-oscura);
      overflow: hidden;
      margin-bottom: 1.5rem;
    }
    .progress-bar {
      height: 100%;
      background: var(--color-primario-light);
      border-radius: 3px;
    }
    .progress-bar-gradient {
      background: linear-gradient(90deg, 
        var(--color-primario-light) 0%, 
        var(--color-secundario-light) 50%, 
        var(--color-contraste-light) 100%
      );
    }
  </style>
</head>
<body>
  <span class="label">Progreso simple (60%)</span>
  <div class="progress">
    <div class="progress-bar" style="width: 60%;"></div>
  </div>
  
  <span class="label">Progreso gradiente 70s (80%)</span>
  <div class="progress">
    <div class="progress-bar progress-bar-gradient" style="width: 80%;"></div>
  </div>
</body>
</html>
```

---

> **💡 Tip para GitHub Pages:** Puedes crear una carpeta `demos/` en tu repositorio con estos archivos HTML y activar GitHub Pages para tener demos interactivas online.