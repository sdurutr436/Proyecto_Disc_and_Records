package com.discsandrecords.api.repositories;

import java.util.List;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.discsandrecords.api.entities.Cancion;

/**
 * CancionRepository - Repositorio JPA para Canciones
 * 
 * Contiene métodos derivados y @Query personalizadas para:
 * - Búsquedas por artista, título y año
 * - Estadísticas (conteos, rankings)
 * - Consultas avanzadas con filtros combinados
 */
@Repository
public interface CancionRepository extends JpaRepository<Cancion, Long> {
    
    // ==========================================
    // MÉTODOS DERIVADOS (Query Methods)
    // ==========================================
    
    List<Cancion> findByArtistaId(Long artistaId);
    Page<Cancion> findByArtistaId(Long artistaId, Pageable pageable);
    List<Cancion> findByTituloCancionContainingIgnoreCase(String titulo);
    long countByArtistaId(Long artistaId);
    
    // ==========================================
    // QUERIES PERSONALIZADAS - BÚSQUEDA
    // ==========================================
    
    /**
     * Buscar canciones por rango de año de salida
     */
    @Query("SELECT c FROM Cancion c WHERE c.anioSalida BETWEEN :anioInicio AND :anioFin ORDER BY c.anioSalida DESC")
    List<Cancion> findByAnioSalidaBetween(@Param("anioInicio") Integer anioInicio, @Param("anioFin") Integer anioFin);
    
    /**
     * Búsqueda combinada por título o artista
     */
    @Query("SELECT c FROM Cancion c WHERE " +
           "LOWER(c.tituloCancion) LIKE LOWER(CONCAT('%', :termino, '%')) OR " +
           "LOWER(c.artista.nombreArtista) LIKE LOWER(CONCAT('%', :termino, '%'))")
    List<Cancion> buscarPorTermino(@Param("termino") String termino);
    
    /**
     * Canciones de un año específico
     */
    @Query("SELECT c FROM Cancion c WHERE c.anioSalida = :anio ORDER BY c.tituloCancion")
    List<Cancion> findByAnioSalida(@Param("anio") Integer anio);
    
    // ==========================================
    // QUERIES PERSONALIZADAS - ESTADÍSTICAS
    // ==========================================
    
    /**
     * Contar canciones por año de salida
     */
    @Query("SELECT c.anioSalida, COUNT(c) FROM Cancion c WHERE c.anioSalida IS NOT NULL GROUP BY c.anioSalida ORDER BY c.anioSalida DESC")
    List<Object[]> contarPorAnio();
    
    /**
     * Contar canciones por artista
     */
    @Query("SELECT c.artista.nombreArtista, COUNT(c) FROM Cancion c GROUP BY c.artista.id, c.artista.nombreArtista ORDER BY COUNT(c) DESC")
    List<Object[]> contarPorArtista();
    
    /**
     * Canciones más recientes (por año de salida)
     */
    @Query("SELECT c FROM Cancion c WHERE c.anioSalida IS NOT NULL ORDER BY c.anioSalida DESC, c.id DESC")
    List<Cancion> findMasRecientes(Pageable pageable);
    
    /**
     * Canciones mejor puntuadas
     */
    @Query("SELECT c FROM Cancion c WHERE c.puntuacionMedia IS NOT NULL ORDER BY c.puntuacionMedia DESC")
    List<Cancion> findMejorPuntuadas(Pageable pageable);
    
    /**
     * Promedio de puntuación de todas las canciones
     */
    @Query("SELECT AVG(c.puntuacionMedia) FROM Cancion c WHERE c.puntuacionMedia IS NOT NULL")
    Double promedioPuntuacionGeneral();
    
    /**
     * Total de canciones en el sistema
     */
    @Query("SELECT COUNT(c) FROM Cancion c")
    Long contarTotal();
}
