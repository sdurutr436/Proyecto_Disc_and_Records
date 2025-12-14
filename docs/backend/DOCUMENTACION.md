# Modelo Entidad-Relación: Discs & Records

> **Proyecto:** Discs & Records  
> **Tipo:** Aplicación web estilo Letterboxd para música  
> **Fecha:** 15 de diciembre de 2025

---

## Resumen del Sistema

Sistema de catalogación, valoración y reseña de música donde los usuarios pueden:
- Marcar canciones y álbumes como "escuchados"
- Asignar puntuaciones (1-5)
- Escribir reseñas
- Ver estadísticas personales de géneros favoritos
- Explorar contenido por artista, género, trending, etc.

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
Representa a los usuarios registrados de la plataforma. Cada usuario puede mantener listas personales de canciones y álbumes escuchados con sus respectivas valoraciones.

---

### 2. Artista

| Atributo | Tipo | Restricciones |
|----------|------|---------------|
| ID_Artista | INT | PK, AUTO_INCREMENT |
| Nombre_artista | VARCHAR(100) | NOT NULL |
| Puntuacion_media | DECIMAL(3,2) | NULL (calculado) |

**Descripción:**  
Representa artistas musicales. La puntuación media se calcula a partir de las valoraciones de todas las canciones y álbumes asociados al artista.

**Notas de diseño:**
- No se permiten colaboraciones múltiples en una misma canción/álbum
- Si un tema es un cover o colaboración, se crea una entrada separada con diferente ID

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
Representa canciones individuales. Cada canción pertenece a un único artista y puede estar en múltiples álbumes (recopilatorios, ediciones especiales, etc.).

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
Representa álbumes musicales completos. Cada álbum pertenece a un único artista y contiene múltiples canciones.

---

### 5. Género

| Atributo | Tipo | Restricciones |
|----------|------|---------------|
| ID_Genero | INT | PK, AUTO_INCREMENT |
| Nombre_genero | VARCHAR(50) | UNIQUE, NOT NULL |
| Descripcion | TEXT | NULL (opcional) |
| Color | VARCHAR(7) | NULL (hex color para UI) |

**Descripción:**  
Catálogo predefinido de géneros musicales. Se utiliza para clasificación, filtros y estadísticas de usuario.

**Ejemplos:** Rock, Pop, Jazz, Hip-Hop, Electronic, Classical, Blues, Reggae, Metal, Folk, etc.

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
Representa la "lista de canciones" de cada usuario. Cuando un usuario marca una canción como escuchada, opcionalmente puede asignarle puntuación y escribir una reseña.

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
Representa la "lista de álbumes" de cada usuario. Funciona igual que Usuario_Cancion pero para álbumes completos.

---

### 8. Cancion_Genero

| Atributo | Tipo | Restricciones |
|----------|------|---------------|
| ID_Cancion | INT | FK → Cancion, NOT NULL |
| ID_Genero | INT | FK → Genero, NOT NULL |

**PK Compuesta:** (ID_Cancion, ID_Genero)

**Descripción:**  
Relación N:M entre canciones y géneros. Una canción puede pertenecer a múltiples géneros (ej: "Bohemian Rhapsody" → Rock, Progressive Rock, Opera).

---

### 9. Album_Genero

| Atributo | Tipo | Restricciones |
|----------|------|---------------|
| ID_Album | INT | FK → Album, NOT NULL |
| ID_Genero | INT | FK → Genero, NOT NULL |

**PK Compuesta:** (ID_Album, ID_Genero)

**Descripción:**  
Relación N:M entre álbumes y géneros. Un álbum puede tener múltiples géneros asociados.

---

### 10. Album_Cancion

| Atributo | Tipo | Restricciones |
|----------|------|---------------|
| ID_Album | INT | FK → Album, NOT NULL |
| ID_Cancion | INT | FK → Cancion, NOT NULL |
| Numero_pista | TINYINT | NULL (orden en el álbum) |

**PK Compuesta:** (ID_Album, ID_Cancion)

**Descripción:**  
Relación N:M entre álbumes y canciones. Permite que una canción aparezca en múltiples álbumes (recopilatorios, ediciones especiales, etc.).

---

## Diagrama de Relaciones

### Cardinalidades

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

## Decisiones de Diseño

### ✅ Simplificaciones (MVP)
- **No colaboraciones:** Un artista por canción/álbum
- **No playlists temáticas:** Solo listas "escuchadas"
- **No sistema social:** Sin seguidores, likes, comentarios en reseñas
- **No historial de reproducción:** Solo marca "escuchado" (no registro de cada play)

### 🔮 Posibles Extensiones Futuras
- Playlists personalizadas con nombre
- Sistema de seguidores y feed social
- Likes/reacciones en reseñas
- Comentarios en reseñas
- Historial detallado de reproducción
- Artistas colaborativos (N:M)
- Recomendaciones basadas en ML

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

## Notas Finales

Este modelo E-R proporciona una base sólida para un MVP estilo Letterboxd enfocado en música, permitiendo:
- ✅ Gestión de usuarios y perfiles personalizados
- ✅ Catalogación completa de artistas, álbumes y canciones
- ✅ Sistema de valoraciones y reseñas opcionales
- ✅ Clasificación por géneros múltiples
- ✅ Estadísticas personales de escucha
- ✅ Feed de reseñas y trending

El diseño es escalable y permite añadir funcionalidades sociales y colaborativas en futuras iteraciones sin necesidad de refactorización importante.
