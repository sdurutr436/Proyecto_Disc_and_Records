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
- **Spring Security + JWT** (autenticación)
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

### Opción 3: Con Docker
```bash
docker-compose up backend
```

La aplicación arrancará en `http://localhost:8080`

## Autenticación JWT

La API utiliza autenticación basada en JWT (JSON Web Tokens).

### Registro de usuario
```bash
curl -X POST http://localhost:8080/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "nombreUsuario": "miusuario",
    "mail": "usuario@ejemplo.com",
    "contrasena": "password123"
  }'
```

**Respuesta exitosa (201):**
```json
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "id": 1,
  "nombreUsuario": "miusuario",
  "mail": "usuario@ejemplo.com",
  "role": "ROLE_USER"
}
```

### Login
```bash
curl -X POST http://localhost:8080/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "mail": "usuario@ejemplo.com",
    "contrasena": "password123"
  }'
```

### Usar el token en peticiones protegidas
```bash
curl -X POST http://localhost:8080/api/albumes \
  -H "Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..." \
  -H "Content-Type: application/json" \
  -d '{
    "tituloAlbum": "Abbey Road",
    "anioSalida": 1969,
    "idArtista": 1
  }'
```

### Recuperar sesión (obtener usuario actual)
```bash
curl http://localhost:8080/api/auth/me \
  -H "Authorization: Bearer <token>"
```

### Roles y permisos

| Rol | Descripción |
|-----|-------------|
| `ROLE_USER` | Usuario estándar. Puede ver contenido y escribir reseñas. |
| `ROLE_MODERATOR` | Puede crear y editar álbumes, canciones y artistas. |
| `ROLE_ADMIN` | Acceso completo. Puede eliminar contenido y gestionar usuarios. |

### Endpoints públicos vs protegidos

| Método | Endpoint | Acceso |
|--------|----------|--------|
| GET | `/api/albumes/**` | Público |
| GET | `/api/artistas/**` | Público |
| GET | `/api/usuarios/**` | Público |
| GET | `/api/generos/**` | Público |
| POST | `/api/auth/login` | Público |
| POST | `/api/auth/register` | Público |
| GET | `/api/auth/me` | Autenticado |
| POST | `/api/albumes` | ADMIN, MODERATOR |
| PUT | `/api/albumes/{id}` | ADMIN, MODERATOR |
| DELETE | `/api/albumes/{id}` | ADMIN |
| POST | `/api/usuarios` | ADMIN |
| DELETE | `/api/usuarios/{id}` | ADMIN |

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

## Tests

Ejecutar todos los tests:
```bash
# Windows
mvnw.cmd test

# Linux/Mac
./mvnw test
```

Ejecutar tests específicos:
```bash
# Tests de integración de autenticación
mvnw.cmd test -Dtest=AuthIntegrationTest

# Tests de autorización por roles
mvnw.cmd test -Dtest=AuthorizationIntegrationTest

# Tests de controladores
mvnw.cmd test -Dtest=AlbumControllerTest,UsuarioControllerTest
```

### Cobertura de tests

| Área | Tests |
|------|-------|
| Autenticación | Login, registro, validación de tokens |
| Autorización | Acceso por roles (USER, MODERATOR, ADMIN) |
| Controladores | CRUD de álbumes, usuarios |
| Repositorios | Queries personalizadas |
| Servicios | Lógica de negocio |

## Códigos de respuesta HTTP

| Código | Descripción |
|--------|-------------|
| 200 | OK - Operación exitosa |
| 201 | Created - Recurso creado |
| 204 | No Content - Eliminación exitosa |
| 400 | Bad Request - Datos inválidos |
| 401 | Unauthorized - Token inválido o ausente |
| 403 | Forbidden - Sin permisos suficientes |
| 404 | Not Found - Recurso no encontrado |
| 409 | Conflict - Recurso duplicado |
| 500 | Internal Server Error |

## Formato de errores

Todos los errores retornan JSON estructurado:
```json
{
  "error": "NOT_FOUND",
  "message": "Álbum no encontrado con id: 999",
  "timestamp": "2026-01-11T12:00:00Z"
}
```

## Licencia
MIT
