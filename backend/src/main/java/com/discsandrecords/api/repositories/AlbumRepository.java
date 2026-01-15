package com.discsandrecords.api.repositories;

import java.util.List;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.discsandrecords.api.entities.Album;

/**
 * AlbumRepository - Repositorio JPA para Álbumes
 * 
 * Contiene métodos derivados y @Query personalizadas para:
 * - Búsquedas por artista, título y año
 * - Estadísticas (conteo, rankings)
 * - Consultas avanzadas con joins
 */
@Repository
public interface AlbumRepository extends JpaRepository<Album, Long> {
    
    // ==========================================
    // MÉTODOS DERIVADOS (Query Methods)
    // ==========================================
    
    List<Album> findByArtistaId(Long artistaId);
    Page<Album> findByArtistaId(Long artistaId, Pageable pageable);
    List<Album> findByTituloAlbumContainingIgnoreCase(String titulo);
    long countByArtistaId(Long artistaId);
    
    // ==========================================
    // QUERIES PERSONALIZADAS - BÚSQUEDA
    // ==========================================
    
    /**
     * Buscar álbumes por rango de año de salida
     */
    @Query("SELECT a FROM Album a WHERE a.anioSalida BETWEEN :anioInicio AND :anioFin ORDER BY a.anioSalida DESC")
    List<Album> findByAnioSalidaBetween(@Param("anioInicio") Integer anioInicio, @Param("anioFin") Integer anioFin);
    
    /**
     * Búsqueda combinada por título y artista (OR)
     */
    @Query("SELECT a FROM Album a WHERE LOWER(a.tituloAlbum) LIKE LOWER(CONCAT('%', :termino, '%')) " +
           "OR LOWER(a.artista.nombreArtista) LIKE LOWER(CONCAT('%', :termino, '%'))")
    List<Album> buscarPorTermino(@Param("termino") String termino);
    
    /**
     * Álbumes de un año específico
     */
    @Query("SELECT a FROM Album a WHERE a.anioSalida = :anio ORDER BY a.tituloAlbum")
    List<Album> findByAnioSalida(@Param("anio") Integer anio);
    
    // ==========================================
    // QUERIES PERSONALIZADAS - ESTADÍSTICAS
    // ==========================================
    
    /**
     * Contar álbumes por año de salida
     */
    @Query("SELECT a.anioSalida, COUNT(a) FROM Album a GROUP BY a.anioSalida ORDER BY a.anioSalida DESC")
    List<Object[]> contarPorAnio();
    
    /**
     * Top N artistas con más álbumes
     */
    @Query("SELECT a.artista.nombreArtista, COUNT(a) as total FROM Album a GROUP BY a.artista.id, a.artista.nombreArtista ORDER BY total DESC")
    List<Object[]> artistasConMasAlbumes(Pageable pageable);
    
    /**
     * Álbumes más recientes (por año de salida)
     */
    @Query("SELECT a FROM Album a ORDER BY a.anioSalida DESC, a.id DESC")
    List<Album> findMasRecientes(Pageable pageable);
    
    /**
     * Álbumes mejor puntuados
     */
    @Query("SELECT a FROM Album a WHERE a.puntuacionMedia IS NOT NULL ORDER BY a.puntuacionMedia DESC")
    List<Album> findMejorPuntuados(Pageable pageable);
    
    /**
     * Promedio de puntuación de todos los álbumes
     */
    @Query("SELECT AVG(a.puntuacionMedia) FROM Album a WHERE a.puntuacionMedia IS NOT NULL")
    Double promedioPuntuacionGeneral();
    
    /**
     * Contar álbumes por rango de puntuación
     */
    @Query("SELECT " +
           "SUM(CASE WHEN a.puntuacionMedia >= 4 THEN 1 ELSE 0 END), " +
           "SUM(CASE WHEN a.puntuacionMedia >= 3 AND a.puntuacionMedia < 4 THEN 1 ELSE 0 END), " +
           "SUM(CASE WHEN a.puntuacionMedia < 3 THEN 1 ELSE 0 END) " +
           "FROM Album a WHERE a.puntuacionMedia IS NOT NULL")
    Object[] distribucionPorPuntuacion();
    
    // ==========================================
    // INSERT CON ID MANUAL (para Deezer)
    // ==========================================
    
    /**
     * Insertar álbum con ID específico (bypass SERIAL/IDENTITY)
     * Usado para importar álbumes de Deezer con su ID original
     */
    @Modifying(flushAutomatically = true, clearAutomatically = true)
    @Query(value = "INSERT INTO albumes (id, titulo_album, anio_salida, portada_url, id_artista) " +
           "VALUES (:id, :titulo, :anio, :portada, :artistaId) " +
           "ON CONFLICT (id) DO NOTHING", nativeQuery = true)
    void insertarConId(@Param("id") Long id, 
                       @Param("titulo") String titulo, 
                       @Param("anio") Integer anio, 
                       @Param("portada") String portada, 
                       @Param("artistaId") Long artistaId);
}
