package com.discsandrecords.api.repositories;

import java.time.Instant;
import java.util.List;

import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.discsandrecords.api.entities.UsuarioAlbum;
import com.discsandrecords.api.entities.UsuarioAlbumId;

/**
 * UsuarioAlbumRepository - Repositorio JPA para Reseñas de Álbumes
 * 
 * Contiene métodos derivados y @Query personalizadas para:
 * - Gestión de reseñas y puntuaciones
 * - Estadísticas y rankings
 * - Análisis de actividad de usuarios
 */
@Repository
public interface UsuarioAlbumRepository extends JpaRepository<UsuarioAlbum, UsuarioAlbumId> {
    
    // ==========================================
    // MÉTODOS DERIVADOS (Query Methods)
    // ==========================================
    
    List<UsuarioAlbum> findByUsuarioId(Long usuarioId);
    List<UsuarioAlbum> findByAlbumId(Long albumId);
    long countByAlbumId(Long albumId);
    long countByUsuarioId(Long usuarioId);
    
    // ==========================================
    // QUERIES PERSONALIZADAS - RESEÑAS
    // ==========================================
    
    /**
     * Obtener reseñas de álbumes por usuario (con texto)
     */
    @Query("SELECT ua FROM UsuarioAlbum ua WHERE ua.usuario.id = :usuarioId AND ua.textoResena IS NOT NULL ORDER BY ua.fechaResena DESC")
    List<UsuarioAlbum> findResenasAlbumesByUsuarioId(@Param("usuarioId") Long usuarioId);
    
    /**
     * Obtener todas las reseñas de un álbum (con texto)
     */
    @Query("SELECT ua FROM UsuarioAlbum ua WHERE ua.album.id = :albumId AND ua.textoResena IS NOT NULL ORDER BY ua.fechaResena DESC")
    List<UsuarioAlbum> findResenasPorAlbumId(@Param("albumId") Long albumId);
    
    /**
     * Reseñas recientes (últimas N)
     */
    @Query("SELECT ua FROM UsuarioAlbum ua WHERE ua.textoResena IS NOT NULL ORDER BY ua.fechaResena DESC")
    List<UsuarioAlbum> findResenasRecientes(Pageable pageable);
    
    /**
     * Reseñas por rango de fecha
     */
    @Query("SELECT ua FROM UsuarioAlbum ua WHERE ua.fechaResena BETWEEN :fechaInicio AND :fechaFin ORDER BY ua.fechaResena DESC")
    List<UsuarioAlbum> findResenasPorFecha(@Param("fechaInicio") Instant fechaInicio, @Param("fechaFin") Instant fechaFin);
    
    /**
     * Álbumes escuchados por un usuario
     */
    @Query("SELECT ua FROM UsuarioAlbum ua WHERE ua.usuario.id = :usuarioId AND ua.escuchado = true ORDER BY ua.fechaAgregada DESC")
    List<UsuarioAlbum> findEscuchadosPorUsuario(@Param("usuarioId") Long usuarioId);
    
    /**
     * Contar álbumes escuchados por un usuario específico
     */
    @Query("SELECT COUNT(ua) FROM UsuarioAlbum ua WHERE ua.usuario.id = :usuarioId AND ua.escuchado = true")
    Long contarEscuchadosPorUsuario(@Param("usuarioId") Long usuarioId);
    
    /**
     * Contar reseñas (con texto) de un usuario
     */
    @Query("SELECT COUNT(ua) FROM UsuarioAlbum ua WHERE ua.usuario.id = :usuarioId AND ua.textoResena IS NOT NULL")
    Long contarResenasPorUsuario(@Param("usuarioId") Long usuarioId);
    
    // ==========================================
    // QUERIES PERSONALIZADAS - ESTADÍSTICAS
    // ==========================================
    
    /**
     * Calcular puntuación media de un álbum
     */
    @Query("SELECT AVG(ua.puntuacion) FROM UsuarioAlbum ua WHERE ua.album.id = :albumId AND ua.puntuacion IS NOT NULL")
    Double calcularPuntuacionMedia(@Param("albumId") Long albumId);
    
    /**
     * Contar reseñas (con texto) de un álbum
     */
    @Query("SELECT COUNT(ua) FROM UsuarioAlbum ua WHERE ua.album.id = :albumId AND ua.textoResena IS NOT NULL")
    Long contarResenasPorAlbum(@Param("albumId") Long albumId);
    
    /**
     * Top álbumes mejor puntuados
     */
    @Query("SELECT ua.album.tituloAlbum, AVG(ua.puntuacion) as promedio, COUNT(ua) as total " +
           "FROM UsuarioAlbum ua WHERE ua.puntuacion IS NOT NULL " +
           "GROUP BY ua.album.id, ua.album.tituloAlbum HAVING COUNT(ua) >= 1 ORDER BY promedio DESC")
    List<Object[]> albumesMejorPuntuados(Pageable pageable);
    
    /**
     * Distribución de puntuaciones (cuántas de cada nota)
     */
    @Query("SELECT ua.puntuacion, COUNT(ua) FROM UsuarioAlbum ua WHERE ua.puntuacion IS NOT NULL GROUP BY ua.puntuacion ORDER BY ua.puntuacion")
    List<Object[]> distribucionPuntuaciones();
    
    /**
     * Usuarios más activos en reseñas de álbumes
     */
    @Query("SELECT ua.usuario.nombreUsuario, COUNT(ua) as total FROM UsuarioAlbum ua " +
           "WHERE ua.textoResena IS NOT NULL GROUP BY ua.usuario.id, ua.usuario.nombreUsuario ORDER BY total DESC")
    List<Object[]> usuariosMasActivos(Pageable pageable);
    
    /**
     * Total de reseñas en el sistema
     */
    @Query("SELECT COUNT(ua) FROM UsuarioAlbum ua WHERE ua.textoResena IS NOT NULL")
    Long contarTotalResenas();
    
    /**
     * Total de álbumes escuchados
     */
    @Query("SELECT COUNT(ua) FROM UsuarioAlbum ua WHERE ua.escuchado = true")
    Long contarTotalEscuchados();
    
    /**
     * Puntuación media dada por un usuario (en todos sus álbumes)
     */
    @Query("SELECT AVG(ua.puntuacion) FROM UsuarioAlbum ua WHERE ua.usuario.id = :usuarioId AND ua.puntuacion IS NOT NULL")
    Double calcularPuntuacionMediaPorUsuario(@Param("usuarioId") Long usuarioId);
    
    /**
     * Géneros más escuchados por un usuario
     * Retorna: [generoId, nombreGenero, color, conteo]
     */
    @Query("SELECT ag.genero.id, ag.genero.nombreGenero, ag.genero.color, COUNT(ua) as conteo " +
           "FROM UsuarioAlbum ua " +
           "JOIN AlbumGenero ag ON ua.album.id = ag.album.id " +
           "WHERE ua.usuario.id = :usuarioId AND ua.escuchado = true " +
           "GROUP BY ag.genero.id, ag.genero.nombreGenero, ag.genero.color " +
           "ORDER BY conteo DESC")
    List<Object[]> generosMasEscuchadosPorUsuario(@Param("usuarioId") Long usuarioId, Pageable pageable);
}
