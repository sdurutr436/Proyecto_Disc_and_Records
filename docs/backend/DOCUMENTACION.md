# Modelo Entidad-Relación y Backend Implementado: Discs & Records

> **Proyecto:** Discs & Records
> **Tipo:** Aplicación web estilo Letterboxd para música
> **Fecha:** 15 de diciembre de 2025

---

## Resumen del Sistema
Sistema de catalogación, valoración y reseña de música donde los usuarios pueden:
- Marcar canciones y álbumes como "escuchados".
- Asignar puntuaciones (1-5).
- Escribir reseñas.
- Explorar contenido por artista, género y endpoints de consulta (búsqueda/paginación).

---

## Entidades Principales

### 1. Usuario
| Atributo | Tipo | Restricciones |
|----------|------|---------------|
| ID_Usuario | INT | PK, AUTO_INCREMENT |
| Nombre_usuario | VARCHAR(50) | UNIQUE, NOT NULL |
| Mail | VARCHAR(100) | UNIQUE, NOT NULL |
| Contraseña | VARCHAR(255) | NOT NULL (hasheada) |
| Avatar | VARCHAR(255) | NULL (URL o ruta) |
| Biografia | TEXT | NULL (opcional) |
| Fecha_registro | TIMESTAMP | DEFAULT CURRENT_TIMESTAMP |

**Descripción:**
Representa a los usuarios registrados. La API incluye endpoints de lectura pública y operaciones protegidas con roles (ADMIN/MODERATOR) o restricciones por usuario autenticado, según el controlador.

---

### 2. Artista
| Atributo | Tipo | Restricciones |
|----------|------|---------------|
| ID_Artista | INT | PK, AUTO_INCREMENT |
| Nombre_artista | VARCHAR(100) | NOT NULL |
| Puntuacion_media | DECIMAL(3,2) | NULL (calculado) |

**Descripción:**
Representa artistas musicales. Existen endpoints para listado, búsqueda por nombre, detalle por ID y rutas anidadas para acceder a álbumes y canciones del artista.

---

### 3. Canción
| Atributo | Tipo | Restricciones |
|----------|------|---------------|
| ID_Cancion | INT | PK, AUTO_INCREMENT |
| Titulo_cancion | VARCHAR(150) | NOT NULL |
| Anio_salida | YEAR | NULL (opcional) |
| Puntuacion_media | DECIMAL(3,2) | NULL (calculado) |
| ID_Artista | INT | FK → Artista, NOT NULL |

**Descripción:**
Representa canciones individuales. Se observan endpoints con búsqueda por título, consulta por artista y operaciones CRUD protegidas por roles.

---

### 4. Álbum
| Atributo | Tipo | Restricciones |
|----------|------|---------------|
| ID_Album | INT | PK, AUTO_INCREMENT |
| Titulo_album | VARCHAR(150) | NOT NULL |
| Anio_salida | YEAR | NOT NULL |
| Portada_URL | VARCHAR(255) | NULL |
| Puntuacion_media | DECIMAL(3,2) | NULL (calculado) |
| ID_Artista | INT | FK → Artista, NOT NULL |

**Descripción:**
Representa álbumes musicales. La API incluye endpoints de búsqueda por título, consulta por artista y operaciones de creación/actualización/borrado protegidas por roles.

---

### 5. Género
| Atributo | Tipo | Restricciones |
|----------|------|---------------|
| ID_Genero | INT | PK, AUTO_INCREMENT |
| Nombre_genero | VARCHAR(50) | UNIQUE, NOT NULL |
| Descripcion | TEXT | NULL (opcional) |
| Color | VARCHAR(7) | NULL (hex color para UI) |

**Descripción:**
Catálogo de géneros musicales con endpoints públicos de lectura y endpoints protegidos para operaciones de mantenimiento (según roles).

---

## Tablas de Relación (Intermedias)

### 6. Usuario_Cancion
| Atributo | Tipo | Restricciones |
|----------|------|---------------|
| ID_Usuario | INT | FK → Usuario, NOT NULL |
| ID_Cancion | INT | FK → Cancion, NOT NULL |
| Escuchada | BOOLEAN | DEFAULT TRUE |
| Puntuacion | TINYINT | NULL, CHECK (1-5) |
| Texto_resena | TEXT | NULL (opcional) |
| Fecha_agregada | TIMESTAMP | DEFAULT CURRENT_TIMESTAMP |
| Fecha_resena | TIMESTAMP | NULL |

**PK Compuesta:** (ID_Usuario, ID_Cancion)

**Descripción:**
Representa la lista de canciones escuchadas/reseñadas por usuario.

---

### 7. Usuario_Album
| Atributo | Tipo | Restricciones |
|----------|------|---------------|
| ID_Usuario | INT | FK → Usuario, NOT NULL |
| ID_Album | INT | FK → Album, NOT NULL |
| Escuchado | BOOLEAN | DEFAULT TRUE |
| Puntuacion | TINYINT | NULL, CHECK (1-5) |
| Texto_resena | TEXT | NULL (opcional) |
| Fecha_agregada | TIMESTAMP | DEFAULT CURRENT_TIMESTAMP |
| Fecha_resena | TIMESTAMP | NULL |

**PK Compuesta:** (ID_Usuario, ID_Album)

**Descripción:**
Representa la lista de álbumes escuchados/reseñados por usuario.

---

### 8. Cancion_Genero
| Atributo | Tipo | Restricciones |
|----------|------|---------------|
| ID_Cancion | INT | FK → Cancion, NOT NULL |
| ID_Genero | INT | FK → Genero, NOT NULL |

**PK Compuesta:** (ID_Cancion, ID_Genero)

---

### 9. Album_Genero
| Atributo | Tipo | Restricciones |
|----------|------|---------------|
| ID_Album | INT | FK → Album, NOT NULL |
| ID_Genero | INT | FK → Genero, NOT NULL |

**PK Compuesta:** (ID_Album, ID_Genero)

---

### 10. Album_Cancion
| Atributo | Tipo | Restricciones |
|----------|------|---------------|
| ID_Album | INT | FK → Album, NOT NULL |
| ID_Cancion | INT | FK → Cancion, NOT NULL |
| Numero_pista | TINYINT | NULL (orden en el álbum) |

**PK Compuesta:** (ID_Album, ID_Cancion)

---

## Diagrama Entidad-Relación (ER)

### Diagrama Visual (Mermaid)

```mermaid
erDiagram
    USUARIO {
        INT id PK
        VARCHAR nombre_usuario UK
        VARCHAR mail UK
        VARCHAR contrasena
        VARCHAR avatar
        TEXT biografia
        TIMESTAMP fecha_registro
        VARCHAR rol
    }
    
    ARTISTA {
        INT id PK
        VARCHAR nombre_artista
        DECIMAL puntuacion_media
    }
    
    ALBUM {
        INT id PK
        VARCHAR titulo_album
        YEAR anio_salida
        VARCHAR portada_url
        DECIMAL puntuacion_media
        INT id_artista FK
    }
    
    CANCION {
        INT id PK
        VARCHAR titulo_cancion
        YEAR anio_salida
        DECIMAL puntuacion_media
        INT id_artista FK
    }
    
    GENERO {
        INT id PK
        VARCHAR nombre_genero UK
        TEXT descripcion
        VARCHAR color
    }
    
    USUARIO_CANCION {
        INT id_usuario FK
        INT id_cancion FK
        BOOLEAN escuchada
        TINYINT puntuacion
        TEXT texto_resena
        TIMESTAMP fecha_agregada
        TIMESTAMP fecha_resena
    }
    
    USUARIO_ALBUM {
        INT id_usuario FK
        INT id_album FK
        BOOLEAN escuchado
        TINYINT puntuacion
        TEXT texto_resena
        TIMESTAMP fecha_agregada
        TIMESTAMP fecha_resena
    }
    
    CANCION_GENERO {
        INT id_cancion FK
        INT id_genero FK
    }
    
    ALBUM_GENERO {
        INT id_album FK
        INT id_genero FK
    }
    
    ALBUM_CANCION {
        INT id_album FK
        INT id_cancion FK
        TINYINT numero_pista
    }

    ARTISTA ||--o{ ALBUM : "tiene"
    ARTISTA ||--o{ CANCION : "interpreta"
    USUARIO ||--o{ USUARIO_CANCION : "escucha"
    CANCION ||--o{ USUARIO_CANCION : "resenada_por"
    USUARIO ||--o{ USUARIO_ALBUM : "escucha"
    ALBUM ||--o{ USUARIO_ALBUM : "resenado_por"
    ALBUM ||--o{ ALBUM_CANCION : "contiene"
    CANCION ||--o{ ALBUM_CANCION : "pertenece_a"
    CANCION ||--o{ CANCION_GENERO : "tiene"
    GENERO ||--o{ CANCION_GENERO : "categoriza"
    ALBUM ||--o{ ALBUM_GENERO : "tiene"
    GENERO ||--o{ ALBUM_GENERO : "categoriza"
```

> **Visualización:** GitHub, GitLab y VS Code (con extensión) renderizan Mermaid automáticamente.

### Cardinalidades (Notación Crow's Foot)

```
Usuario (1) ────── (N) Usuario_Cancion (N) ────── (1) Cancion
Usuario (1) ────── (N) Usuario_Album (N) ────── (1) Album

Artista (1) ────── (N) Cancion
Artista (1) ────── (N) Album

Album (N) ────── (M) Cancion  [a través de Album_Cancion]

Cancion (N) ────── (M) Genero  [a través de Cancion_Genero]
Album (N) ────── (M) Genero  [a través de Album_Genero]
```

### Notación de Cardinalidades

- **1:N** → Un registro en A se relaciona con muchos en B, pero cada registro en B pertenece a un único A
- **N:M** → Muchos registros en A se relacionan con muchos en B (requiere tabla intermedia)

---

## Funcionalidades del Perfil de Usuario

### Tres pestañas principales:

**1. Canciones Escuchadas**
```sql
SELECT * FROM Usuario_Cancion 
WHERE ID_Usuario = ?
ORDER BY Fecha_agregada DESC;
```

**2. Álbumes Escuchados**
```sql
SELECT * FROM Usuario_Album 
WHERE ID_Usuario = ?
ORDER BY Fecha_agregada DESC;
```

**3. Reseñas (Autoconstruida)**
```sql
SELECT 'cancion' AS tipo, c.Titulo_cancion AS titulo, 
       uc.Puntuacion, uc.Texto_resena, uc.Fecha_resena
FROM Usuario_Cancion uc
JOIN Cancion c ON uc.ID_Cancion = c.ID_Cancion
WHERE uc.ID_Usuario = ? AND uc.Texto_resena IS NOT NULL

UNION ALL

SELECT 'album' AS tipo, a.Titulo_album AS titulo,
       ua.Puntuacion, ua.Texto_resena, ua.Fecha_resena
FROM Usuario_Album ua
JOIN Album a ON ua.ID_Album = a.ID_Album
WHERE ua.ID_Usuario = ? AND ua.Texto_resena IS NOT NULL

ORDER BY Fecha_resena DESC;
```

---

## Queries Útiles

### Calcular puntuación media de un artista
```sql
SELECT 
    (SELECT AVG(uc.Puntuacion) FROM Usuario_Cancion uc
     JOIN Cancion c ON uc.ID_Cancion = c.ID_Cancion
     WHERE c.ID_Artista = ? AND uc.Puntuacion IS NOT NULL) +
    (SELECT AVG(ua.Puntuacion) FROM Usuario_Album ua
     JOIN Album a ON ua.ID_Album = a.ID_Album
     WHERE a.ID_Artista = ? AND ua.Puntuacion IS NOT NULL)
) / 2 AS Puntuacion_media_artista;
```

### Géneros más escuchados por un usuario
```sql
SELECT g.Nombre_genero, COUNT(*) AS veces_escuchado
FROM Genero g
JOIN Cancion_Genero cg ON g.ID_Genero = cg.ID_Genero
JOIN Usuario_Cancion uc ON cg.ID_Cancion = uc.ID_Cancion
WHERE uc.ID_Usuario = ?
GROUP BY g.ID_Genero
ORDER BY veces_escuchado DESC
LIMIT 5;
```

### Álbumes en tendencia (más reseñados recientemente)
```sql
SELECT a.*, COUNT(ua.ID_Usuario) AS num_reviews
FROM Album a
JOIN Usuario_Album ua ON a.ID_Album = ua.ID_Album
WHERE ua.Fecha_resena >= DATE_SUB(NOW(), INTERVAL 7 DAY)
  AND ua.Texto_resena IS NOT NULL
GROUP BY a.ID_Album
ORDER BY num_reviews DESC
LIMIT 10;
```

---

## Implementación Backend (según código existente)

### API REST: controladores y endpoints
El backend está organizado por controladores REST por dominio (Artista, Álbum, Canción, Usuario, Género, Reseñas) con endpoints de lectura pública, paginación y endpoints protegidos por roles.

Ejemplo de control de acceso por roles (patrón observado en controladores):
```java
@PreAuthorize("hasAnyRole("ADMIN", "MODERATOR")")
public ResponseEntity<AlbumResponseDTO> crear(@Valid @RequestBody CreateAlbumDTO dto) {
    AlbumResponseDTO creado = albumService.crear(dto);
    return ResponseEntity.created(URI.create("/api/albumes/" + creado.id())).body(creado);
}
```

### Autenticación y autorización (Spring Security + JWT)
El backend incorpora autenticación con JWT, con endpoints de login/registro y tests automatizados que validan respuestas exitosas y errores típicos (validación y credenciales).

Ejemplo de comportamiento esperado en tests (MockMvc):
```java
mockMvc.perform(post("/api/auth/login")
        .contentType(MediaType.APPLICATION_JSON)
        .content(objectMapper.writeValueAsString(loginValido)))
    .andExpect(status().isOk())
    .andExpect(jsonPath("$.token").value("jwt.token.aqui"));
```

### Observabilidad mínima (Actuator + healthchecks)
El proyecto incluye Spring Boot Actuator y expone `/actuator/health`, utilizado por los healthchecks de Docker Compose y por el Dockerfile del backend para validación de readiness.

Ejemplo de healthcheck en contenedor (Dockerfile):
```dockerfile
HEALTHCHECK --interval=30s --timeout=10s --start-period=120s --retries=10 \
  CMD curl -f http://localhost:8080/actuator/health || exit 1
```

### Logging de peticiones HTTP (Interceptor)
Existe un interceptor `LoggingInterceptor` que registra información de las peticiones y genera un identificador `X-Request-ID` por request para trazabilidad.

Ejemplo del patrón implementado:
```java
private static final String REQUEST_ID_HEADER = "X-Request-ID";

@Override
public boolean preHandle(HttpServletRequest request, HttpServletResponse response, Object handler) {
    String requestId = UUID.randomUUID().toString();
    request.setAttribute(REQUEST_ID_HEADER, requestId);
    return true;
}
```

### Entorno Docker y perfiles
El backend soporta perfil `docker` (`SPRING_PROFILES_ACTIVE=docker`) y está preparado para funcionar con MariaDB en contenedores mediante variables de entorno (`SPRING_DATASOURCE_URL`, usuario/contraseña, etc.).

---

## Decisiones de Diseño

### Simplificaciones (MVP)
- **No colaboraciones:** Un artista por canción/álbum
- **No playlists temáticas:** Solo listas "escuchadas"
- **No sistema social:** Sin seguidores, likes, comentarios en reseñas
- **No historial de reproducción:** Solo marca "escuchado" (no registro de cada play)

---

## Índices Recomendados

```sql
-- Para búsquedas rápidas
CREATE INDEX idx_cancion_artista ON Cancion(ID_Artista);
CREATE INDEX idx_album_artista ON Album(ID_Artista);
CREATE INDEX idx_usuario_cancion_fecha ON Usuario_Cancion(ID_Usuario, Fecha_agregada);
CREATE INDEX idx_usuario_album_fecha ON Usuario_Album(ID_Usuario, Fecha_agregada);

-- Para filtros por género
CREATE INDEX idx_cancion_genero ON Cancion_Genero(ID_Genero);
CREATE INDEX idx_album_genero ON Album_Genero(ID_Genero);

-- Para búsquedas por nombre
CREATE INDEX idx_artista_nombre ON Artista(Nombre_artista);
CREATE INDEX idx_cancion_titulo ON Cancion(Titulo_cancion);
CREATE INDEX idx_album_titulo ON Album(Titulo_album);
```

---

## Constraints y Validaciones

```sql
-- Puntuaciones válidas (1-5 estrellas)
ALTER TABLE Usuario_Cancion 
ADD CONSTRAINT chk_puntuacion_cancion CHECK (Puntuacion BETWEEN 1 AND 5);

ALTER TABLE Usuario_Album 
ADD CONSTRAINT chk_puntuacion_album CHECK (Puntuacion BETWEEN 1 AND 5);

-- Email válido
ALTER TABLE Usuario 
ADD CONSTRAINT chk_email_formato CHECK (Mail LIKE '%_@__%.__%');

-- Año de salida válido
ALTER TABLE Cancion 
ADD CONSTRAINT chk_anio_cancion CHECK (Anio_salida BETWEEN 1900 AND YEAR(CURDATE()));

ALTER TABLE Album 
ADD CONSTRAINT chk_anio_album CHECK (Anio_salida BETWEEN 1900 AND YEAR(CURDATE()));
```

---

## Notas
- Este documento mantiene la estructura del modelo E-R y añade únicamente elementos observados como implementados en el backend según el ingest disponible.
- Los elementos no implementados (semáforo rojo) quedan fuera de esta documentación por el momento.
