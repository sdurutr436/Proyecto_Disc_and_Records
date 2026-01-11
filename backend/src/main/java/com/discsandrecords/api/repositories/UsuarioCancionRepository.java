package com.discsandrecords.api.repositories;

import java.time.Instant;
import java.util.List;

import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.discsandrecords.api.entities.UsuarioCancion;
import com.discsandrecords.api.entities.UsuarioCancionId;

/**
 * UsuarioCancionRepository - Repositorio JPA para Reseñas de Canciones
 * 
 * Contiene métodos derivados y @Query personalizadas para:
 * - Gestión de reseñas y puntuaciones
 * - Estadísticas y rankings
 * - Análisis de actividad de usuarios
 */
@Repository
public interface UsuarioCancionRepository extends JpaRepository<UsuarioCancion, UsuarioCancionId> {
    
    // ==========================================
    // MÉTODOS DERIVADOS (Query Methods)
    // ==========================================
    
    List<UsuarioCancion> findByUsuarioId(Long usuarioId);
    List<UsuarioCancion> findByCancionId(Long cancionId);
    long countByCancionId(Long cancionId);
    long countByUsuarioId(Long usuarioId);
    
    // ==========================================
    // QUERIES PERSONALIZADAS - RESEÑAS
    // ==========================================
    
    /**
     * Obtener reseñas de canciones por usuario (con texto)
     */
    @Query("SELECT uc FROM UsuarioCancion uc WHERE uc.usuario.id = :usuarioId AND uc.textoResena IS NOT NULL ORDER BY uc.fechaResena DESC")
    List<UsuarioCancion> findResenasCancionesByUsuarioId(@Param("usuarioId") Long usuarioId);
    
    /**
     * Obtener todas las reseñas de una canción (con texto)
     */
    @Query("SELECT uc FROM UsuarioCancion uc WHERE uc.cancion.id = :cancionId AND uc.textoResena IS NOT NULL ORDER BY uc.fechaResena DESC")
    List<UsuarioCancion> findResenasPorCancionId(@Param("cancionId") Long cancionId);
    
    /**
     * Reseñas recientes (últimas N)
     */
    @Query("SELECT uc FROM UsuarioCancion uc WHERE uc.textoResena IS NOT NULL ORDER BY uc.fechaResena DESC")
    List<UsuarioCancion> findResenasRecientes(Pageable pageable);
    
    /**
     * Reseñas por rango de fecha
     */
    @Query("SELECT uc FROM UsuarioCancion uc WHERE uc.fechaResena BETWEEN :fechaInicio AND :fechaFin ORDER BY uc.fechaResena DESC")
    List<UsuarioCancion> findResenasPorFecha(@Param("fechaInicio") Instant fechaInicio, @Param("fechaFin") Instant fechaFin);
    
    /**
     * Canciones escuchadas por un usuario
     */
    @Query("SELECT uc FROM UsuarioCancion uc WHERE uc.usuario.id = :usuarioId AND uc.escuchada = true ORDER BY uc.fechaAgregada DESC")
    List<UsuarioCancion> findEscuchadasPorUsuario(@Param("usuarioId") Long usuarioId);
    
    // ==========================================
    // QUERIES PERSONALIZADAS - ESTADÍSTICAS
    // ==========================================
    
    /**
     * Calcular puntuación media de una canción
     */
    @Query("SELECT AVG(uc.puntuacion) FROM UsuarioCancion uc WHERE uc.cancion.id = :cancionId AND uc.puntuacion IS NOT NULL")
    Double calcularPuntuacionMedia(@Param("cancionId") Long cancionId);
    
    /**
     * Contar reseñas (con texto) de una canción
     */
    @Query("SELECT COUNT(uc) FROM UsuarioCancion uc WHERE uc.cancion.id = :cancionId AND uc.textoResena IS NOT NULL")
    Long contarResenasPorCancion(@Param("cancionId") Long cancionId);
    
    /**
     * Top canciones mejor puntuadas
     */
    @Query("SELECT uc.cancion.tituloCancion, AVG(uc.puntuacion) as promedio, COUNT(uc) as total " +
           "FROM UsuarioCancion uc WHERE uc.puntuacion IS NOT NULL " +
           "GROUP BY uc.cancion.id, uc.cancion.tituloCancion HAVING COUNT(uc) >= 1 ORDER BY promedio DESC")
    List<Object[]> cancionesMejorPuntuadas(Pageable pageable);
    
    /**
     * Distribución de puntuaciones (cuántas de cada nota)
     */
    @Query("SELECT uc.puntuacion, COUNT(uc) FROM UsuarioCancion uc WHERE uc.puntuacion IS NOT NULL GROUP BY uc.puntuacion ORDER BY uc.puntuacion")
    List<Object[]> distribucionPuntuaciones();
    
    /**
     * Usuarios más activos en reseñas de canciones
     */
    @Query("SELECT uc.usuario.nombreUsuario, COUNT(uc) as total FROM UsuarioCancion uc " +
           "WHERE uc.textoResena IS NOT NULL GROUP BY uc.usuario.id, uc.usuario.nombreUsuario ORDER BY total DESC")
    List<Object[]> usuariosMasActivos(Pageable pageable);
    
    /**
     * Total de reseñas en el sistema
     */
    @Query("SELECT COUNT(uc) FROM UsuarioCancion uc WHERE uc.textoResena IS NOT NULL")
    Long contarTotalResenas();
    
    /**
     * Total de canciones escuchadas
     */
    @Query("SELECT COUNT(uc) FROM UsuarioCancion uc WHERE uc.escuchada = true")
    Long contarTotalEscuchadas();
    
    /**
     * Contar canciones escuchadas por un usuario específico
     */
    @Query("SELECT COUNT(uc) FROM UsuarioCancion uc WHERE uc.usuario.id = :usuarioId AND uc.escuchada = true")
    Long contarEscuchadasPorUsuario(@Param("usuarioId") Long usuarioId);
    
    /**
     * Contar reseñas (con texto) de un usuario
     */
    @Query("SELECT COUNT(uc) FROM UsuarioCancion uc WHERE uc.usuario.id = :usuarioId AND uc.textoResena IS NOT NULL")
    Long contarResenasPorUsuario(@Param("usuarioId") Long usuarioId);
}
