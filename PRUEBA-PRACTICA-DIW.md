# 2) Diseño de interfaces web:

1. Arquitectura de Estilos y Preprocesadores
  - Evolución cromatica: 2 nuevas variables de color (solo en modo claro) definidas:

    ```bash
      /* COLORES NUEVOS PRÁCTICA */
      $color-light-practica: hsl(25, 100%, 49%);
      $color-light-practica2: hsl(7, 100%, 50%);
    ```

  - Integración ITCSS:
    - Variables ubicadas en _variables.scss e invocadas en _css-variables.scss

      ```bash
        /* COLORES NUEVOS PRÁCTICA */
        --color-practica1: #{$color-light-practica};
        --color-practica2: #{$color-light-practica2};
      ```

    - Parciales generados:
      - En la capa layout he generado 1 parcial nuevo:
        - `_grid-estadisticas` para la posición de los elementos dentro de estadísticas.
      - Y en la de components:
        - `_stats-card` para los estilos de la nueva card que presenta las estadísticas.
    
2. Metodología y Naming
  - BEM: Se ha seguido la estructura de la metodologia BEM con anidación hasta un primer nivel nada más.

3. Layout y responsive design:

4. Semántica:
  - Se ha seguido la siguiente semántica para el componente de `stats-card`:
    <article>
      <div>
        <lucide-icon>
      <p>
      <h3>

    La card en si es un ``article`` para contener elementos heterogéneos, y en el interior tengo un div que contiene los estilos del icono de lucie (sin el div, se rompe el borde que trae lucide, al contenerlo en un div, puedo darle fondo del mismo color que el contenedor div para que eso no pase).

    Parrafo y h3 quedan a la misma altura que el `div` para contenerse en el interior del `article`.

  - Se ha seguido la siguiente semántica para la página de estadísticas:

    Todo se encuentra contenido en una sección de estadísticas. Para amoldar el resto de componentes (un header simple HTML puro para iniciar el contenido y presentarlo). Además de cargar los datos de mock en caso de que no carguen las estadísticas del endpoint que se propone.
  
  He procurado usar `div` solo para pelearme con el diseño de los iconos de Lucide. No los vuelvo a tocar. El resto de componentes se sigue estructura semántica lo más descriptiva posible (article para agrupamiento, section para elementos homogeneos, y div para cajón de sastre).

5. Justificación de decisiones:

  **Arquitectura: ¿Por qué has colocado tus variables en la capa Settings y tus estilos en Components?**

  Coloco las variables en settings porque es menos específico, porque es algo más bajo en nivel y lo que tiene son las variables de las que dependen todo el resto del código CSS. En components coloco los estilos de los componentes por ser menos específicos y beber de las variables y adaptarse a la disposición del layout que es la capa que va justo por encima (o debajo depende de como se mire el triangulo). Se invoca más tarde para que no pise los estilos más generales.

  **¿Qué pasaría si importaras Components antes que Settings en el manifiesto?**

  Explotaría todo. Las variables no se le inyectaría el código y angular por seguridad avisaría indicando que hay errores de compilación, y que las variables a las que se intenta acceder, no existen. Es un error común cuando no se entiende la estructura ITCSS.

  **Explica una ventaja real que te haya aportado usar BEM en este examen frente a usar selectores de etiqueta anidados (ej: div > button).**

  A la hora de invocar los estilos es mucho más sencillo. Simplemente imagino que es lo que sigue. Por ejemplo, para este proyecto cuando llamo a estadisticas, puedo ir desglosando lo que quiero:

  `` <h1 class="estadisticas__title">Estadísticas</h1> ``

  Ese __title, me permite sin tener que usar selectores anidados, indicar que quiero los estilos del h1.

# Documentación consultada:

Angular 17: https://v17.angular.io/guide/standalone-components
Angular 21: https://angular.dev/guide/components
Angular 20: https://v20.angular.dev/overview
Lucide libreria: https://lucide.dev/icons/
