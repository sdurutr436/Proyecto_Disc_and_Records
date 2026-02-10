# 3) Desarrollo en entorno servidor

Objetivo: Implementar la lógica de negocio y exponer los datos y exponerlos de forma segura mediante servicios web.

## 1. Endpoint nuevo:

Se presenta un endpoint nuevo que rescata las estadísticas generales de la página. Algo así como un menú de administración para ver los álbumes que se han añadido gracias a la hidratación de la página con al API de Deezer, los usuarios que están registrados y cuantas reseñas existen en la página web.

La separación de responsabilidades está clara:

EstadisticasControlador -> EstadisticasServicio -> EstadisticasRepository

## 2. Seguridad y calidad:

El endpoint se encuentra protegido por rol especifico. En mi aplicación web hay roles de usuarios, de moderador y de administrador. Solo los administradores tienen acceso a dicho panel. Es parecido al que está hecho sin funcionalidad de admin, pero más sencillo.

Pruebas realizadas al endpoint: 