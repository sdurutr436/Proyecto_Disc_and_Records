# Discs & Records - Backend API

## Descripción
API REST para Discs & Records, una plataforma estilo Letterboxd para música donde los usuarios pueden:
- Marcar canciones y álbumes como escuchados
- Valorar música con puntuaciones de 1-5 estrellas
- Escribir reseñas
- Explorar contenido por artista, género y tendencias

## Tecnologías
- **Spring Boot 3.5.6**
- **Java 21**
- **Maven**
- **H2 Database** (desarrollo)
- **JPA/Hibernate**
- **Lombok**
- **SpringDoc OpenAPI** (Swagger)

## Requisitos Previos
- JDK 21 o superior
- Maven 3.9+ (incluido mvnw)

## Configuración y Ejecución

### Opción 1: Con Maven Wrapper (Recomendado)
```bash
cd backend

# En Linux/Mac
./mvnw spring-boot:run

# En Windows
mvnw.cmd spring-boot:run
```

### Opción 2: Con Maven instalado
```bash
cd backend
mvn spring-boot:run
```

La aplicación arrancará en `http://localhost:8080`

## Endpoints Principales

### Artistas
- `GET /api/artistas` - Listar todos los artistas
- `GET /api/artistas/{id}` - Obtener artista por ID
- `GET /api/artistas/buscar?nombre={nombre}` - Buscar artistas
- `POST /api/artistas` - Crear nuevo artista
- `DELETE /api/artistas/{id}` - Eliminar artista

### Álbumes
- `GET /api/albumes` - Listar todos los álbumes
- `GET /api/albumes/{id}` - Obtener álbum por ID
- `GET /api/albumes/buscar?titulo={titulo}` - Buscar álbumes
- `GET /api/albumes/artista/{idArtista}` - Álbumes de un artista
- `POST /api/albumes` - Crear nuevo álbum
- `DELETE /api/albumes/{id}` - Eliminar álbum

### Canciones
- `GET /api/canciones` - Listar todas las canciones
- `GET /api/canciones/{id}` - Obtener canción por ID
- `GET /api/canciones/buscar?titulo={titulo}` - Buscar canciones
- `GET /api/canciones/artista/{idArtista}` - Canciones de un artista
- `POST /api/canciones` - Crear nueva canción
- `DELETE /api/canciones/{id}` - Eliminar canción

### Usuarios
- `GET /api/usuarios` - Listar todos los usuarios
- `GET /api/usuarios/{id}` - Obtener usuario por ID
- `GET /api/usuarios/username/{nombreUsuario}` - Obtener por nombre de usuario
- `POST /api/usuarios` - Registrar nuevo usuario
- `DELETE /api/usuarios/{id}` - Eliminar usuario

## Documentación API (Swagger)

Una vez iniciada la aplicación, accede a:
- **Swagger UI**: http://localhost:8080/swagger-ui.html
- **API Docs (JSON)**: http://localhost:8080/api-docs

## Base de Datos H2 Console

Para inspeccionar la base de datos en desarrollo:
- **URL**: http://localhost:8080/h2-console
- **JDBC URL**: `jdbc:h2:mem:discsandrecords`
- **Username**: `sa`
- **Password**: `sa`

## Estructura del Proyecto

```
backend/
├── src/
│   ├── main/
│   │   ├── java/com/discsandrecords/api/
│   │   │   ├── controllers/      # REST Controllers
│   │   │   ├── dto/               # Data Transfer Objects
│   │   │   ├── entities/          # JPA Entities
│   │   │   ├── repositories/      # Spring Data Repositories
│   │   │   ├── exceptions/        # Exception Handlers
│   │   │   └── DiscsAndRecordsApplication.java
│   │   └── resources/
│   │       ├── application.properties
│   │       └── data.sql           # Datos de prueba
├── pom.xml
└── README.md
```

## Modelo de Datos

### Entidades Principales
- **Usuario**: Usuarios registrados de la plataforma
- **Artista**: Artistas musicales
- **Cancion**: Canciones individuales
- **Album**: Álbumes musicales
- **Genero**: Catálogo de géneros musicales

### Tablas de Relación
- **UsuarioCancion**: Canciones escuchadas/reseñadas por usuarios
- **UsuarioAlbum**: Álbumes escuchados/reseñados por usuarios
- **CancionGenero**: Relación N:M entre canciones y géneros
- **AlbumGenero**: Relación N:M entre álbumes y géneros
- **AlbumCancion**: Relación N:M entre álbumes y canciones

Ver documentación completa en `/docs/backend/DOCUMENTACION.md`

## Próximas Implementaciones

- [ ] Autenticación con Spring Security y JWT
- [ ] Endpoints de reseñas (Usuario_Cancion / Usuario_Album)
- [ ] Cálculo de puntuaciones medias
- [ ] Estadísticas de usuario (géneros favoritos)
- [ ] Feed de trending (más reseñados recientemente)
- [ ] Migración a PostgreSQL para producción
- [ ] Validaciones de negocio en Services
- [ ] Tests unitarios y de integración

## Licencia
MIT
