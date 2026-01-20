INFORME DE INCIDENCIA TÉCNICA
PROYECTO: Discs and Records
FECHA: 21 de Enero de 2026
ENTORNO: Producción (DigitalOcean App Platform / Managed MySQL)

1. DESCRIPCIÓN DEL PROBLEMA
Se detectó un error HTTP 500 en el endpoint "/api/albumes/paginado" tras el despliegue en producción. La aplicación no podía recuperar el listado de álbumes, aunque la conexión con la API externa de Deezer funcionaba correctamente.

2. ANÁLISIS DE CAUSA RAÍZ
El problema evolucionó en tres fases distintas:

Fase A: Desincronización de Esquema (Origen)
El log inicial mostró la excepción "SQLSyntaxErrorException: Unknown column 'deezer_id'". La entidad Java 'Album' incluía un nuevo campo 'deezer_id' que no existía en la tabla física de la base de datos. La configuración 'spring.jpa.hibernate.ddl-auto=update' no logró aplicar la alteración de la tabla automáticamente durante el arranque.

Fase B: Corrupción por Restricciones Duplicadas
Para forzar la actualización del esquema, se modificó la configuración a 'create-drop'. Sin embargo, este despliegue falló. Hibernate intentó recrear las tablas pero colisionó con restricciones de clave foránea (Foreign Keys) preexistentes en la base de datos que no se limpiaron correctamente, generando errores del tipo "Error 1826: Duplicate foreign key constraint name".

Fase C: Estado Inconsistente (Estado Zombie)
Como el proceso de 'create-drop' falló a mitad de ejecución, la base de datos quedó en un estado corrupto: la tabla 'albumes' fue eliminada pero no pudo ser recreada. Al revertir la configuración a 'update', la aplicación arrancaba pero fallaba inmediatamente al intentar acceder a una tabla inexistente ("Table 'defaultdb.albumes' doesn't exist").

3. ACCIONES REALIZADAS (INTENTOS FALLIDOS)
- Cambio de estrategia DDL a 'create-drop': Fallido por conflicto de nombres de FK.
- Reversión a estrategia DDL 'update': Fallido por ausencia de tabla base.

4. SOLUCIÓN APLICADA (INTERVENCIÓN MANUAL)
Dada la imposibilidad de que Hibernate resolviera el conflicto automáticamente, se procedió a un reseteo manual del esquema:

4.1. Conexión Remota
Se estableció una conexión directa a la base de datos gestionada de DigitalOcean utilizando el cliente SQLTools en VS Code (Puerto 25060, SSL habilitado).

4.2. Autorización de Red
Se añadió la IP pública del equipo de desarrollo a la lista de "Trusted Sources" en el panel de seguridad de DigitalOcean para permitir la conexión externa.

4.3. Saneamiento de Base de Datos
Se ejecutó un script SQL de limpieza profunda para eliminar el esquema corrupto y sus restricciones huérfanas:
   - SET FOREIGN_KEY_CHECKS = 0;
   - DROP DATABASE IF EXISTS defaultdb;
   - CREATE DATABASE defaultdb;
   - SET FOREIGN_KEY_CHECKS = 1;

5. ESTADO ACTUAL
La base de datos se encuentra limpia y vacía. Se ha configurado la aplicación con 'spring.jpa.hibernate.ddl-auto=update' y se ha procedido a un nuevo despliegue. Se espera que Hibernate genere el esquema completo desde cero (incluyendo la columna 'deezer_id') al no encontrar tablas previas que generen conflicto.
