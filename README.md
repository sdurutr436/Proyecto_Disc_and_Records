# Discs & Records

> Plataforma web estilo Letterboxd para música - Valora, reseña y colecciona tus álbumes y canciones favoritas:

**DOMINOS DESPLEGADOS:**
https://discs-n-records-ksgvk.ondigitalocean.app/
https://discs-n-records-ksgvk.ondigitalocean.app/style-guide

## 📖 Descripción

**Discs & Records** es una aplicación web full-stack que permite a los usuarios:
- 🎵 Marcar canciones y álbumes como "escuchados"
- ⭐ Asignar puntuaciones de 1-5 estrellas
- ✍️ Escribir reseñas personales
- 📊 Ver estadísticas de géneros favoritos
- 🔍 Explorar música por artista, género y tendencias

Inspirado en Letterboxd, pero enfocado en la música, con una estética **neobrutalista retro 70s**.

---

## 🏗️ Arquitectura

El proyecto está dividido en dos partes:

```
Proyecto_Disc_and_Records/
├── frontend/          # Angular 20 + SCSS (Arquitectura CSS BEM/ITCSS)
└── backend/           # Spring Boot 3.5.6 + Maven + H2/PostgreSQL
```

### Frontend
- **Framework**: Angular 20.3.9
- **Estilos**: SCSS con arquitectura ITCSS (Settings, Tools, Generic, Elements, Layout)
- **Diseño**: Neobrutalismo con paleta de colores retro 70s
- **Componentes**: Sistema de diseño modular (buttons, cards, forms, etc.)

### Backend
- **Framework**: Spring Boot 3.5.6
- **Lenguaje**: Java 21
- **Gestor de dependencias**: Maven
- **Base de datos**: H2 (desarrollo) / PostgreSQL (producción futura)
- **ORM**: JPA/Hibernate
- **Documentación API**: SpringDoc OpenAPI (Swagger)

---

## 🚀 Inicio Rápido

### Prerrequisitos
- **Node.js** 18+ y npm (para frontend)
- **JDK 21** (para backend)
- **Maven** 3.9+ (incluido wrapper)

### 1. Clonar el repositorio
```bash
git clone https://github.com/sdurutr436/Proyecto_Disc_and_Records.git
cd Proyecto_Disc_and_Records
```

### 2. Ejecutar el Backend

```bash
cd backend

# Con Maven Wrapper (Windows)
mvnw.cmd spring-boot:run

# Con Maven Wrapper (Linux/Mac)
./mvnw spring-boot:run
```

El backend estará disponible en `http://localhost:8080`
- **Swagger UI**: http://localhost:8080/swagger-ui.html
- **H2 Console**: http://localhost:8080/h2-console

### 3. Ejecutar el Frontend

```bash
cd frontend
npm install
npm start
```

El frontend estará disponible en `http://localhost:4200`

---

## 📚 Documentación

- **[Documentación de Diseño CSS](/docs/design/DOCUMENTACION.md)** - Principios visuales, arquitectura CSS, showcase
- **[Documentación Backend](/docs/backend/DOCUMENTACION.md)** - Modelo E-R, entidades, relaciones, queries
- **[Proxy Deezer](/docs/backend/DEEZER_PROXY.md)** - Caché, rate limiting y cooldown para API de Deezer
- **[Decisiones de Diseño](/DECISIONES_DISEÑO.md)** - Decisiones pendientes y propuestas
- **[Showcase Netlify](https://styles-disc-n-records-showcase.netlify.app/showcase.html)** - Demostración de componentes

---

## 🗄️ Modelo de Datos

### Entidades Principales
- **Usuario**: Perfiles de usuarios con biografía y avatar
- **Artista**: Artistas musicales con puntuación media
- **Cancion**: Canciones individuales con año de salida
- **Album**: Álbumes con portada y puntuación
- **Genero**: Catálogo de géneros musicales

### Relaciones Clave
- `Usuario ←→ Cancion` (vía `Usuario_Cancion`) - Lista de canciones escuchadas + reseñas
- `Usuario ←→ Album` (vía `Usuario_Album`) - Lista de álbumes escuchados + reseñas
- `Artista → Cancion` (1:N) - Un artista tiene muchas canciones
- `Artista → Album` (1:N) - Un artista tiene muchos álbumes
- `Album ←→ Cancion` (N:M) - Canciones pueden estar en varios álbumes

Ver diagrama E-R completo en [docs/backend/DOCUMENTACION.md](/docs/backend/DOCUMENTACION.md)

---

## 🎨 Estilo Visual

### Paleta de Colores
**Modo claro (70s warm)**:
- Naranjas: `#ED9C05`, `#CA6703`, `#BB3F03`
- Rojo vino: `#9D2227`
- Fondos: `#FBFAF2`, `#E7D8AB`

**Modo oscuro (70s cool)**:
- Verde menta: `#93CFBB`
- Teales: `#0A9295`, `#015F72`
- Fondo: `#01131B`

### Tipografía
- **Principal**: Work Sans (400, 600)
- **Decorativa**: Monoton (títulos sección)

### Estilo Neobrutalista
- Bordes gruesos (3px) sólidos negros
- Sombras offset sin blur (4px 4px 0px)
- Formas cuadradas con border-radius sutil (5px)

---

## 🛠️ Stack Tecnológico Completo

### Frontend
- Angular 20.3.9
- TypeScript 5.9
- SCSS (Arquitectura ITCSS)
- RxJS

### Backend
- Spring Boot 3.5.6
- Java 21
- Maven
- JPA/Hibernate
- H2 Database
- Lombok
- SpringDoc OpenAPI

### DevOps
- Git
- Netlify (showcase frontend)
- Docker (futuro)

---

## 📋 Roadmap

### ✅ Fase 1: Fundamentos (Completado)
- [x] Arquitectura CSS y sistema de diseño
- [x] Modelo E-R y documentación
- [x] Estructura base backend con Spring Boot
- [x] Entidades JPA y repositories
- [x] Controllers REST con ResponseEntity
- [x] Datos de prueba

### 🚧 Fase 2: Core Features (En progreso)
- [ ] Endpoints de reseñas (Usuario_Cancion/Usuario_Album)
- [ ] Autenticación y autorización (Spring Security + JWT)
- [ ] Integración frontend-backend
- [ ] Cálculo automático de puntuaciones medias
- [ ] Feed de trending

### 🔮 Fase 3: Features Avanzados (Futuro)
- [ ] Sistema de playlists personalizadas
- [ ] Features sociales (seguidores, likes, comentarios)
- [ ] Búsqueda avanzada con filtros
- [ ] Recomendaciones basadas en ML
- [ ] Migración a PostgreSQL
- [ ] Despliegue en producción

---

## 🧪 Testing

### Backend
```bash
cd backend
./mvnw test
```

### Frontend
```bash
cd frontend
npm test
```

---

## 👥 Contribución

Este es un proyecto educativo de DAW (Desarrollo de Aplicaciones Web). Si encuentras bugs o tienes sugerencias:

1. Fork el repositorio
2. Crea una rama (`git checkout -b feature/nueva-funcionalidad`)
3. Commit tus cambios (`git commit -am 'Añadir nueva funcionalidad'`)
4. Push a la rama (`git push origin feature/nueva-funcionalidad`)
5. Abre un Pull Request

---

## 📄 Licencia

MIT License - Ver archivo LICENSE para más detalles

---

## 👤 Autor

**sdurutr436**
- GitHub: [@sdurutr436](https://github.com/sdurutr436)
- Proyecto: Discs & Records
- Año: 2025

---

## 🙏 Agradecimientos

- Inspiración: [Letterboxd](https://letterboxd.com/)
- Tendencia de diseño: Neobrutalismo
- Estética: Década de los 70s

```bash
ng e2e
```

Angular CLI does not come with an end-to-end testing framework by default. You can choose one that suits your needs.

## Additional Resources

For more information on using the Angular CLI, including detailed command references, visit the [Angular CLI Overview and Command Reference](https://angular.dev/tools/cli) page.
