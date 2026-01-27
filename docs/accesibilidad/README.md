# Análisis de Accesibilidad

## Seccion 1: Fundamentos de accesibilidad:

### ¿Por qué es necesaria la accesibilidad web?

La accesibilidad web garantiza que personas con discapacidades visuales, auditivas, motoras o cognitivas puedan navegar e interactuar sin barreras. Este enfoque mejora la experiencia de usuario para todos, independientemente del contexto o dispositivo. Además, cumplir con estos estándares es ahora una obligación legal en España y Europa, convirtiendo la inclusión digital en un requisito técnico indispensable para cualquier desarrollo profesional.

### Principios WCAG 2.1

1. **Perceptible**: La información y los componentes de la interfaz deben presentarse de manera que los usuarios puedan percibirlos a través de sus sentidos disponibles, evitando que el contenido sea invisible para los usuarios.

> Ejemplo: Todas las imágenes de álbumes incluyen texto alternativo con formato "título por artista", permitiendo a usuarios de lectores de pantalla identificar el contenido sin verlo.

2. **Operable**: Los elementos de la interfaz y la navegación deben ser manejables, garantizando que cualquier usuario pueda interactuar con ellos mediante teclado, ratón o tecnologías de asistencia sin bloqueos.

> Ejemplo: El carrusel de álbumes es completamente navegable con teclado mediante Tab, Enter, Space y flechas de dirección, sin depender del ratón. Los botones tienen áreas de toque de mínimo 44x44px en dispositivos táctiles.

3. **Comprensible**: La información y el funcionamiento de la interfaz deben ser claros y predecibles, asegurando que los usuarios entiendan tanto el contenido como la forma de navegar por él.

> Ejemplo: Los mensajes de error en formularios son específicos ("El correo electrónico no es válido") en lugar de genéricos, y se marcan con role="alert" para anuncio automático por lectores de pantalla.

4. **Robusto**: El contenido debe crearse con estándares web sólidos para que pueda ser interpretado de manera fiable por una amplia variedad de navegadores y tecnologías de asistencia, presentes y futuras.

> Ejemplo: Uso de HTML5 semántico (header, nav, main, footer) con roles ARIA apropiados, garantizando interpretación correcta por tecnologías de asistencia actuales y futuras.

### Niveles de conformidad

#### Nivel A (Básico):
Establece los requisitos mínimos indispensables para que el contenido no bloquee el acceso a los usuarios.

#### Nivel AA (Intermedio):
Elimina las barreras de usabilidad más comunes y es el estándar exigido por la legislación vigente.

#### Nivel AAA (Avanzado):
Representa el máximo grado de accesibilidad con requisitos muy estrictos destinados a contextos especializados.

> Alcanzar el Nivel AA para garantizar tanto el cumplimiento legal como una experiencia de usuario sólida.

---

## Seccion 2: Componentes multimedia implementados

**Tipo de componente:** Carrusel horizontal.

**Descripción del componente:** Carrusel de álbumes musicales con cards tipo polaroid con imagen en la mitad superior para identificación visual, que representan dependiendo del contexto del carrusel, álbumes en tendencia o reseñados recientemente.

**Características de accesibilidad implementadas:**
- Tabulación en orden lógico a través de los títulos y artistas de los álbumes. Posibilidad de entrar haciendo uso del botón Enter.

- Etiquetas ARIA descriptivas, con títulos semánticos proporcionando contexto sobre el tipo de carrusel.

- Estados visibles claros cuando se está haciendo _focus_ en un elemento.

- Estructura semántica, cada card es un article con imagen, titulo y enlace, y las imágenes tienen _alt_ descriptivo; y el contenedor del carrusel también con un h2 descriptivo.

- Diseño responsivo con _touch targets_, scroll nativo en móviles y adaptación del número de elementos según el _viewport_.

---

## Seccion 3: Auditoría automatizada

### Auditoria Lighthouse inicial

#### Capturas iniciales de auditoria Lighthouse:

![Lighthouse inicial desktop](capturas/lighthouse/main/lighthouse_inicial_main_desktop.png)

![Lighthouse inicial móvil](capturas/lighthouse/main/lighthouse_inicial_main_movil.png)

#### Capturas iniciales de auditoria WAVE:

![WAVE inicial general](capturas/wave/main/wave_inicial_main_desktop.png)

#### Capturas iniciales de auditoria 

![TAWDIS inicial general](capturas/tawdis/main/tawdis_inicial_main.png)

#### Tabla informativa

| Herramienta | Puntuación/Errores | Captura |
|-------------|-------------------|---------|
| Lighthouse Móvil | 100/100 | ![Lighthouse inicial](capturas/lighthouse/main/lighthouse_inicial_main_movil.png) |
| Lighthouse Desktop | 100/100 | ![Lighthouse inicial desktop](capturas/lighthouse/main/lighthouse_inicial_main_desktop.png) |
| WAVE | 0 errores graves, 1 error contraste, 3 alertas | ![WAVE inicial general](capturas/wave/main/wave_inicial_main_desktop.png) |
| TAW | 1 problemas | ![TAWDIS inicial general](capturas/tawdis/main/tawdis_inicial_main.png) |


#### Errores más graves:

- Lighthouse: No tiene errores presentables.

- WAVE: Error de contraste encontrado en H1 de información atrayente:

![WAVE Problema de contraste](capturas/wave/main/wave_inicial_main_desktop.png)

Las alertas que se presentan son de elementos escondidos.

- TAWDIS: Error de idioma declarado frente al idioma real.

---

## Seccion 4: Análisis y corrección de errores:

| Tipología | Comprobación | WCAG | Resultado | Incidencias |
|-----------|--------------|------|-----------|-------------|
| 1.1.1 - Contenido no textual | Controles de formulario sin etiquetar | H44, H65 | Falla | 1 |
| 1.1.1 - Contenido no textual | Imágenes que pueden requerir descripción | H45 | Desconocido | 53 |
| 1.3.1 - Información y relaciones | Controles de formulario sin etiquetar | H44, H65 | Falla | 1 |
| 1.3.1 - Información y relaciones | Contenido generado desde CSS | F87 | Desconocido | 2 |
| 1.3.2 - Secuencia con significado | Posicionamiento absoluto | C27 | Desconocido | 4 |