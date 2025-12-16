package com.discsandrecords.api.repositories;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.discsandrecords.api.entities.Genero;

/**
 * GeneroRepository - Repositorio JPA para Géneros Musicales
 * 
 * Contiene métodos derivados y @Query personalizadas para:
 * - Búsquedas por nombre
 * - Ordenación y filtrado
 * 
 * NOTA: Las estadísticas de artistas por género requieren la tabla intermedia
 * artista_genero que se gestiona desde el lado de la relación ManyToMany.
 */
@Repository
public interface GeneroRepository extends JpaRepository<Genero, Long> {
    
    // ==========================================
    // MÉTODOS DERIVADOS (Query Methods)
    // ==========================================
    
    Optional<Genero> findByNombreGenero(String nombreGenero);
    Optional<Genero> findByNombreGeneroIgnoreCase(String nombreGenero);
    List<Genero> findByNombreGeneroContainingIgnoreCase(String nombre);
    boolean existsByNombreGeneroIgnoreCase(String nombreGenero);
    
    // ==========================================
    // QUERIES PERSONALIZADAS
    // ==========================================
    
    /**
     * Géneros ordenados alfabéticamente
     */
    @Query("SELECT g FROM Genero g ORDER BY g.nombreGenero ASC")
    List<Genero> findAllOrdenadosAlfabeticamente();
    
    /**
     * Géneros con descripción
     */
    @Query("SELECT g FROM Genero g WHERE g.descripcion IS NOT NULL AND g.descripcion <> '' ORDER BY g.nombreGenero")
    List<Genero> findConDescripcion();
    
    /**
     * Géneros sin descripción (para completar)
     */
    @Query("SELECT g FROM Genero g WHERE g.descripcion IS NULL OR g.descripcion = '' ORDER BY g.nombreGenero")
    List<Genero> findSinDescripcion();
    
    /**
     * Géneros con color definido
     */
    @Query("SELECT g FROM Genero g WHERE g.color IS NOT NULL ORDER BY g.nombreGenero")
    List<Genero> findConColor();
    
    /**
     * Contar total de géneros
     */
    @Query("SELECT COUNT(g) FROM Genero g")
    Long contarTotal();
    
    /**
     * Buscar géneros por inicial
     */
    @Query("SELECT g FROM Genero g WHERE LOWER(g.nombreGenero) LIKE LOWER(CONCAT(:inicial, '%')) ORDER BY g.nombreGenero")
    List<Genero> findByInicial(@Param("inicial") String inicial);
}
