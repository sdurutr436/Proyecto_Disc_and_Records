# Discs & Records

Plataforma web full-stack para la gestión, valoración y reseña de álbumes y canciones musicales.

## Descripción del Proyecto

Discs & Records es una aplicación web que permite a los usuarios gestionar su colección musical, valorar álbumes y canciones con un sistema de 1 a 5 estrellas, escribir reseñas personales y explorar música mediante integración con la API de Deezer. El proyecto combina un frontend moderno en Angular con un backend robusto en Spring Boot.

## Características Principales

- Búsqueda e importación de álbumes desde Deezer API
- Sistema de autenticación y autorización con JWT
- Gestión de álbumes, canciones, artistas y géneros
- Sistema de valoraciones (1-5 estrellas) y reseñas
- Listas personalizadas de álbumes
- Estadísticas de usuario (géneros favoritos, álbumes escuchados)
- Panel de administración completo
- Sistema de roles (ADMIN, MODERATOR, USER)
- Proxy cache para optimizar llamadas a Deezer API

## Stack Tecnológico

### Frontend

- Angular 20.3.9
- TypeScript 5.9
- SCSS con arquitectura ITCSS
- RxJS para programación reactiva
- Nginx para servir la aplicación en producción

### Backend

- Spring Boot 3.5.6
- Java 21
- Maven como gestor de dependencias
- JPA/Hibernate para ORM
- Spring Security + JWT para autenticación
- MariaDB/MySQL (producción) / H2 (desarrollo)
- SpringDoc OpenAPI (Swagger) para documentación de API

### DevOps

- Docker y Docker Compose
- GitHub Actions para CI/CD
- DigitalOcean App Platform para despliegue

## Requisitos Previos

- Node.js 18+ y npm
- JDK 21
- Maven 3.9+ (incluido wrapper)
- Docker y Docker Compose (opcional)
- Git

## Instalación y Configuración

### Clonar el Repositorio

```bash
git clone https://github.com/sdurutr436/Proyecto_Disc_and_Records.git
cd Proyecto_Disc_and_Records
```

### Opción 1: Ejecución Local (Sin Docker)

#### Backend

```bash
cd backend

# Con Maven Wrapper (Windows)
mvnw.cmd spring-boot:run

# Con Maven Wrapper (Linux/Mac)
./mvnw spring-boot:run
```

El backend estará disponible en http://localhost:8080
- Swagger UI: http://localhost:8080/swagger-ui.html
- H2 Console: http://localhost:8080/h2-console

#### Frontend

```bash
cd frontend
npm install
npm start
```

El frontend estará disponible en http://localhost:4200

### Opción 2: Ejecución con Docker

1. Copia el archivo de variables de entorno de ejemplo:
```bash
cp .env.example .env
```

2. Iniciar contenedores:
```bash
docker-compose up --build
```

## Estructura del Proyecto

- **backend/**: Aplicación Spring Boot
- **frontend/**: Aplicación Angular
- **docs/**: Documentación del proyecto (diseño, backend, devops)
- **docker-compose.yml**: Orquestación de contenedores

## Documentación API

La documentación interactiva de los endpoints está disponible a través de Swagger UI una vez iniciada la aplicación:
URL: http://localhost:8080/swagger-ui.html

Principales recursos:
- Auth: Registro e inicio de sesión
- Álbumes: Gestión y búsqueda
- Usuarios: Perfiles y estadísticas
- Listas: Gestión de colecciones personales

## Despliegue

El proyecto está configurado para un despliegue continuo en DigitalOcean App Platform utilizando Docker.
URL de Producción: https://discs-n-records-ksgvk.ondigitalocean.app/

## Contribución

1. Fork el proyecto
2. Crea una rama para tu feature (`git checkout -b feature/AmazingFeature`)
3. Commit tus cambios (`git commit -m 'Add some AmazingFeature'`)
4. Push a la rama (`git push origin feature/AmazingFeature`)
5. Abre un Pull Request

## Licencia

Distribuido bajo la Licencia MIT. Ver `LICENSE` para más información.

## Autor

sdurutr436 - 2025
