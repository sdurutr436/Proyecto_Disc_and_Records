# 1) Desarrollo en entorno cliente:

## 1. Routing y Navegación (RA7 + RA5.d)

Nueva Ruta: Define e implementa una nueva ruta en el sistema de routing de Angular: Implementada la ruta ("/prueba").

Integración: Modifica los componentes estructurales (Header y Footer) para incluir la navegación hacia esta nueva sección:
- Se modifica en lugar del Header (que no incluye el menú de navegación) el main para alojar un nuevo botón (reutilización de unos que ya tenía que no se usaban que estaban comentados de hace meses).
- Se modifica en el footer uno de los botones laterales izquierdos que llevan hacia la ruta.

![Botón en menú de navegación](img-prueba/01-boton-nav.png)

![Botón de navegación en footer](img-prueba/02-boton-footer.png)

Lazy Loading: Se valorará positivamente la carga perezosa del módulo/componente.

```bash
  {
    path: 'prueba',
    loadComponent: () => import('./pages/prueba/prueba'),
    title: 'Prueba técnica - Discs & Records',
    data: { preload: false, breadcrumb: 'Prueba' }
  },
```

Se hace con lo de loadComponent: ()

## 2. Arquitectura de Componentes (RA6 + RA4)

Solo se ha creado 1 componente. Una card distinta a la card que ya existe que recoge desde el backend la información de la base de datos. Esta card es información estadística de la página web. Se recogen en las cards la información sobre los usuarios, las reseñas totales que hay, los usuarios y álbumes que se han integrado en la base de datos. Tiene sistema fallback integrado si fallase la conexión con el servidor para mostrar datos de mock.

Se ha creado vacio un servicio para conectar esta página al backend. Todo para que no de problemas de desarrollo durante la maquetación en interfaces web.

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
  - BEM: La nomenclatura 

    



# Documentación externa consultada:

## Frontend:

Angular 17: https://v17.angular.io/guide/standalone-components
Angular 21: https://angular.dev/guide/components
Angular 20: https://v20.angular.dev/overview
Lucide libreria: https://lucide.dev/icons/

HECHO POR SERGIO DURÁN UTRERA