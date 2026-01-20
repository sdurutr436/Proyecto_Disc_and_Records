-- ============================================================================
-- MIGRACIÓN: Hidratación Anticipada (Eager Hydration)
-- ============================================================================
-- Fecha: 2026-01-20
-- Descripción: Añade columnas para soportar el patrón de hidratación anticipada
--              que permite la transición de Deezer a BD local.
-- ============================================================================

-- ============================================================================
-- TABLA: artistas
-- ============================================================================

-- Añadir columna deezer_id para artistas importados de Deezer
ALTER TABLE artistas 
ADD COLUMN IF NOT EXISTS deezer_id VARCHAR(50) UNIQUE;

-- Añadir columna imagen_url para foto del artista
ALTER TABLE artistas 
ADD COLUMN IF NOT EXISTS imagen_url VARCHAR(255);

-- Añadir columna fecha_importacion para tracking
ALTER TABLE artistas 
ADD COLUMN IF NOT EXISTS fecha_importacion TIMESTAMP;

-- Crear índice para búsqueda rápida por deezer_id
CREATE INDEX IF NOT EXISTS idx_artista_deezer_id 
ON artistas(deezer_id) 
WHERE deezer_id IS NOT NULL;

-- ============================================================================
-- TABLA: albumes
-- ============================================================================

-- Añadir columna deezer_id para álbumes importados de Deezer
ALTER TABLE albumes 
ADD COLUMN IF NOT EXISTS deezer_id VARCHAR(50) UNIQUE;

-- Añadir columna fecha_importacion para tracking
ALTER TABLE albumes 
ADD COLUMN IF NOT EXISTS fecha_importacion TIMESTAMP;

-- Añadir columna num_tracks (metadata de Deezer)
ALTER TABLE albumes 
ADD COLUMN IF NOT EXISTS num_tracks INTEGER;

-- Añadir columna duracion_total en segundos (metadata de Deezer)
ALTER TABLE albumes 
ADD COLUMN IF NOT EXISTS duracion_total INTEGER;

-- Añadir columna sello discográfico (metadata de Deezer)
ALTER TABLE albumes 
ADD COLUMN IF NOT EXISTS sello VARCHAR(100);

-- Crear índice para búsqueda rápida por deezer_id
CREATE INDEX IF NOT EXISTS idx_album_deezer_id 
ON albumes(deezer_id) 
WHERE deezer_id IS NOT NULL;

-- ============================================================================
-- SECUENCIAS (Si no existen)
-- ============================================================================

-- Crear secuencia para artistas si no existe
DO $$
BEGIN
    IF NOT EXISTS (SELECT 1 FROM pg_sequences WHERE schemaname = 'public' AND sequencename = 'artista_id_seq') THEN
        CREATE SEQUENCE artista_id_seq START WITH 1 INCREMENT BY 1;
        -- Ajustar al máximo ID existente
        PERFORM setval('artista_id_seq', COALESCE((SELECT MAX(id) FROM artistas), 0) + 1, false);
    END IF;
END $$;

-- Crear secuencia para álbumes si no existe
DO $$
BEGIN
    IF NOT EXISTS (SELECT 1 FROM pg_sequences WHERE schemaname = 'public' AND sequencename = 'album_id_seq') THEN
        CREATE SEQUENCE album_id_seq START WITH 1 INCREMENT BY 1;
        -- Ajustar al máximo ID existente
        PERFORM setval('album_id_seq', COALESCE((SELECT MAX(id) FROM albumes), 0) + 1, false);
    END IF;
END $$;

-- ============================================================================
-- ACTUALIZAR IDs EXISTENTES (Opcional)
-- Si hay álbumes/artistas que fueron importados con ID de Deezer como ID primario,
-- migrarlos para usar el nuevo esquema (ID interno + deezer_id separado)
-- ============================================================================

-- NOTA: Esta parte es opcional y depende de cómo se manejaron los datos anteriormente.
-- Descomentar y ajustar según necesidad.

/*
-- Para álbumes que tienen ID de Deezer como ID primario (IDs muy grandes)
-- Copiar el ID actual a deezer_id y generar nuevo ID interno

-- Paso 1: Marcar álbumes que parecen ser de Deezer (IDs > 100000)
UPDATE albumes 
SET deezer_id = CAST(id AS VARCHAR)
WHERE id > 100000 AND deezer_id IS NULL;

-- Paso 2: Similar para artistas
UPDATE artistas 
SET deezer_id = CAST(id AS VARCHAR)
WHERE id > 100000 AND deezer_id IS NULL;
*/

-- ============================================================================
-- VERIFICACIÓN
-- ============================================================================

-- Verificar que las columnas existen
DO $$
DECLARE
    cols_artistas TEXT[];
    cols_albumes TEXT[];
BEGIN
    SELECT array_agg(column_name) INTO cols_artistas
    FROM information_schema.columns 
    WHERE table_name = 'artistas' 
    AND column_name IN ('deezer_id', 'imagen_url', 'fecha_importacion');
    
    SELECT array_agg(column_name) INTO cols_albumes
    FROM information_schema.columns 
    WHERE table_name = 'albumes' 
    AND column_name IN ('deezer_id', 'fecha_importacion', 'num_tracks', 'duracion_total', 'sello');
    
    RAISE NOTICE 'Columnas añadidas a artistas: %', cols_artistas;
    RAISE NOTICE 'Columnas añadidas a albumes: %', cols_albumes;
END $$;

-- ============================================================================
-- FIN DE LA MIGRACIÓN
-- ============================================================================
