package com.discsandrecords.api.repositories;

import java.util.List;
import java.util.Optional;

import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.discsandrecords.api.entities.Artista;

/**
 * ArtistaRepository - Repositorio JPA para Artistas
 * 
 * Contiene métodos derivados y @Query personalizadas para:
 * - Búsquedas por nombre
 * - Estadísticas (conteo de álbumes, canciones)
 * - Rankings y consultas avanzadas
 */
@Repository
public interface ArtistaRepository extends JpaRepository<Artista, Long> {
    
    // ==========================================
    // MÉTODOS DERIVADOS (Query Methods)
    // ==========================================
    
    Optional<Artista> findByNombreArtista(String nombreArtista);
    Optional<Artista> findByNombreArtistaIgnoreCase(String nombreArtista);
    List<Artista> findByNombreArtistaContainingIgnoreCase(String nombre);
    boolean existsByNombreArtistaIgnoreCase(String nombreArtista);
    
    // ==========================================
    // QUERIES PERSONALIZADAS - BÚSQUEDA
    // ==========================================
    
    /**
     * Buscar artistas que tengan al menos un álbum (usando subquery)
     */
    @Query("SELECT a FROM Artista a WHERE a.id IN (SELECT DISTINCT al.artista.id FROM Album al)")
    List<Artista> findArtistasConAlbumes();
    
    /**
     * Buscar artistas que tengan al menos una canción (usando subquery)
     */
    @Query("SELECT a FROM Artista a WHERE a.id IN (SELECT DISTINCT c.artista.id FROM Cancion c)")
    List<Artista> findArtistasConCanciones();
    
    /**
     * Buscar artistas sin álbumes
     */
    @Query("SELECT a FROM Artista a WHERE a.id NOT IN (SELECT DISTINCT al.artista.id FROM Album al)")
    List<Artista> findArtistasSinAlbumes();
    
    // ==========================================
    // QUERIES PERSONALIZADAS - ESTADÍSTICAS
    // ==========================================
    
    /**
     * Contar álbumes por artista
     */
    @Query("SELECT a.nombreArtista, COUNT(al) as totalAlbumes FROM Artista a " +
           "LEFT JOIN Album al ON al.artista.id = a.id " +
           "GROUP BY a.id, a.nombreArtista ORDER BY totalAlbumes DESC")
    List<Object[]> contarAlbumesPorArtista();
    
    /**
     * Contar canciones por artista
     */
    @Query("SELECT a.nombreArtista, COUNT(c) as totalCanciones FROM Artista a " +
           "LEFT JOIN Cancion c ON c.artista.id = a.id " +
           "GROUP BY a.id, a.nombreArtista ORDER BY totalCanciones DESC")
    List<Object[]> contarCancionesPorArtista();
    
    /**
     * Top artistas con más contenido (álbumes + canciones)
     */
    @Query("SELECT a.nombreArtista, " +
           "(SELECT COUNT(al) FROM Album al WHERE al.artista.id = a.id) as albumes, " +
           "(SELECT COUNT(c) FROM Cancion c WHERE c.artista.id = a.id) as canciones " +
           "FROM Artista a ORDER BY (SELECT COUNT(al) FROM Album al WHERE al.artista.id = a.id) + " +
           "(SELECT COUNT(c) FROM Cancion c WHERE c.artista.id = a.id) DESC")
    List<Object[]> artistasConMasContenido(Pageable pageable);
    
    /**
     * Artistas más recientes (últimos añadidos)
     */
    @Query("SELECT a FROM Artista a ORDER BY a.id DESC")
    List<Artista> findMasRecientes(Pageable pageable);
    
    /**
     * Artistas mejor puntuados
     */
    @Query("SELECT a FROM Artista a WHERE a.puntuacionMedia IS NOT NULL ORDER BY a.puntuacionMedia DESC")
    List<Artista> findMejorPuntuados(Pageable pageable);
    
    /**
     * Estadísticas de un artista específico (álbumes y canciones)
     */
    @Query("SELECT a.nombreArtista, " +
           "(SELECT COUNT(al) FROM Album al WHERE al.artista.id = a.id), " +
           "(SELECT COUNT(c) FROM Cancion c WHERE c.artista.id = a.id) " +
           "FROM Artista a WHERE a.id = :artistaId")
    Object[] obtenerEstadisticas(@Param("artistaId") Long artistaId);
    
    // ==========================================
    // INSERT CON ID MANUAL (para Deezer)
    // ==========================================
    
    /**
     * Insertar artista con ID específico (bypass SERIAL/IDENTITY)
     * Usado para importar artistas de Deezer con su ID original
     */
    @Modifying
    @Query(value = "INSERT INTO artistas (id, nombre_artista) VALUES (:id, :nombre) " +
           "ON CONFLICT (id) DO NOTHING", nativeQuery = true)
    void insertarConId(@Param("id") Long id, @Param("nombre") String nombre);
}
