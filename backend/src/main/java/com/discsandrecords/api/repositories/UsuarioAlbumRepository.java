package com.discsandrecords.api.repositories;

import java.time.Instant;
import java.util.List;
import java.util.Optional;

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
 * REGLAS DE NEGOCIO:
 * - Las reseñas/puntuaciones solo son visibles si escuchado = true
 * - La media del álbum solo cuenta usuarios con escuchado = true
 * - Al quitar de lista, los datos se conservan pero no son públicos
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
    
    /**
     * Verificar si un usuario tiene un álbum en su lista (escuchado = true)
     */
    @Query("SELECT CASE WHEN COUNT(ua) > 0 THEN true ELSE false END FROM UsuarioAlbum ua " +
           "WHERE ua.usuario.id = :usuarioId AND ua.album.id = :albumId AND ua.escuchado = true")
    boolean existeEnLista(@Param("usuarioId") Long usuarioId, @Param("albumId") Long albumId);
    
    /**
     * Obtener registro incluso si está oculto (para restaurar)
     */
    @Query("SELECT ua FROM UsuarioAlbum ua WHERE ua.usuario.id = :usuarioId AND ua.album.id = :albumId")
    Optional<UsuarioAlbum> findByUsuarioAndAlbum(@Param("usuarioId") Long usuarioId, @Param("albumId") Long albumId);
    
    // ==========================================
    // QUERIES - LISTA DE ÁLBUMES DEL USUARIO
    // ==========================================
    
    /**
     * Álbumes en la lista del usuario (escuchado = true)
     */
    @Query("SELECT ua FROM UsuarioAlbum ua WHERE ua.usuario.id = :usuarioId AND ua.escuchado = true ORDER BY ua.fechaAgregada DESC")
    List<UsuarioAlbum> findAlbumesEnLista(@Param("usuarioId") Long usuarioId);
    
    /**
     * Álbumes en la lista del usuario con paginación
     */
    @Query("SELECT ua FROM UsuarioAlbum ua WHERE ua.usuario.id = :usuarioId AND ua.escuchado = true ORDER BY ua.fechaAgregada DESC")
    List<UsuarioAlbum> findAlbumesEnLista(@Param("usuarioId") Long usuarioId, Pageable pageable);
    
    /**
     * Contar álbumes en la lista del usuario
     */
    @Query("SELECT COUNT(ua) FROM UsuarioAlbum ua WHERE ua.usuario.id = :usuarioId AND ua.escuchado = true")
    Long contarAlbumesEnLista(@Param("usuarioId") Long usuarioId);
    
    // ==========================================
    // QUERIES - RESEÑAS PÚBLICAS (escuchado = true)
    // ==========================================
    
    /**
     * Reseñas de un usuario (solo visibles - escuchado = true y con texto)
     */
    @Query("SELECT ua FROM UsuarioAlbum ua WHERE ua.usuario.id = :usuarioId " +
           "AND ua.escuchado = true AND ua.textoResena IS NOT NULL ORDER BY ua.fechaResena DESC")
    List<UsuarioAlbum> findResenasVisiblesByUsuario(@Param("usuarioId") Long usuarioId);
    
    /**
     * Reseñas de un álbum (solo visibles - escuchado = true y con texto)
     * Ordenadas de más nueva a más antigua
     */
    @Query("SELECT ua FROM UsuarioAlbum ua WHERE ua.album.id = :albumId " +
           "AND ua.escuchado = true AND ua.textoResena IS NOT NULL ORDER BY ua.fechaResena DESC")
    List<UsuarioAlbum> findResenasVisiblesByAlbum(@Param("albumId") Long albumId);
    
    /**
     * Reseñas recientes visibles (para home/feed)
     */
    @Query("SELECT ua FROM UsuarioAlbum ua WHERE ua.escuchado = true " +
           "AND ua.textoResena IS NOT NULL ORDER BY ua.fechaResena DESC")
    List<UsuarioAlbum> findResenasRecientesVisibles(Pageable pageable);
    
    // ==========================================
    // QUERIES - ESTADÍSTICAS (solo escuchado = true)
    // ==========================================
    
    /**
     * Calcular puntuación media de un álbum
     * SOLO cuenta usuarios que tienen el álbum en su lista (escuchado = true)
     */
    @Query("SELECT AVG(ua.puntuacion) FROM UsuarioAlbum ua " +
           "WHERE ua.album.id = :albumId AND ua.escuchado = true AND ua.puntuacion IS NOT NULL")
    Double calcularPuntuacionMedia(@Param("albumId") Long albumId);
    
    /**
     * Contar puntuaciones válidas de un álbum (escuchado = true)
     */
    @Query("SELECT COUNT(ua) FROM UsuarioAlbum ua " +
           "WHERE ua.album.id = :albumId AND ua.escuchado = true AND ua.puntuacion IS NOT NULL")
    Long contarPuntuacionesValidas(@Param("albumId") Long albumId);
    
    /**
     * Contar reseñas visibles de un álbum
     */
    @Query("SELECT COUNT(ua) FROM UsuarioAlbum ua " +
           "WHERE ua.album.id = :albumId AND ua.escuchado = true AND ua.textoResena IS NOT NULL")
    Long contarResenasVisibles(@Param("albumId") Long albumId);
    
    /**
     * Contar usuarios que tienen un álbum en su lista
     */
    @Query("SELECT COUNT(ua) FROM UsuarioAlbum ua WHERE ua.album.id = :albumId AND ua.escuchado = true")
    Long contarUsuariosConAlbum(@Param("albumId") Long albumId);
    
    /**
     * Contar reseñas visibles del usuario
     */
    @Query("SELECT COUNT(ua) FROM UsuarioAlbum ua " +
           "WHERE ua.usuario.id = :usuarioId AND ua.escuchado = true AND ua.textoResena IS NOT NULL")
    Long contarResenasVisiblesPorUsuario(@Param("usuarioId") Long usuarioId);
    
    // ==========================================
    // QUERIES LEGACY (mantener compatibilidad)
    // ==========================================
    
    @Query("SELECT ua FROM UsuarioAlbum ua WHERE ua.usuario.id = :usuarioId AND ua.textoResena IS NOT NULL ORDER BY ua.fechaResena DESC")
    List<UsuarioAlbum> findResenasAlbumesByUsuarioId(@Param("usuarioId") Long usuarioId);
    
    @Query("SELECT ua FROM UsuarioAlbum ua WHERE ua.album.id = :albumId AND ua.textoResena IS NOT NULL ORDER BY ua.fechaResena DESC")
    List<UsuarioAlbum> findResenasPorAlbumId(@Param("albumId") Long albumId);
    
    @Query("SELECT ua FROM UsuarioAlbum ua WHERE ua.textoResena IS NOT NULL ORDER BY ua.fechaResena DESC")
    List<UsuarioAlbum> findResenasRecientes(Pageable pageable);
    
    @Query("SELECT ua FROM UsuarioAlbum ua WHERE ua.fechaResena BETWEEN :fechaInicio AND :fechaFin ORDER BY ua.fechaResena DESC")
    List<UsuarioAlbum> findResenasPorFecha(@Param("fechaInicio") Instant fechaInicio, @Param("fechaFin") Instant fechaFin);
    
    @Query("SELECT ua FROM UsuarioAlbum ua WHERE ua.usuario.id = :usuarioId AND ua.escuchado = true ORDER BY ua.fechaAgregada DESC")
    List<UsuarioAlbum> findEscuchadosPorUsuario(@Param("usuarioId") Long usuarioId);
    
    @Query("SELECT COUNT(ua) FROM UsuarioAlbum ua WHERE ua.usuario.id = :usuarioId AND ua.escuchado = true")
    Long contarEscuchadosPorUsuario(@Param("usuarioId") Long usuarioId);
    
    @Query("SELECT COUNT(ua) FROM UsuarioAlbum ua WHERE ua.usuario.id = :usuarioId AND ua.textoResena IS NOT NULL")
    Long contarResenasPorUsuario(@Param("usuarioId") Long usuarioId);
    
    @Query("SELECT COUNT(ua) FROM UsuarioAlbum ua WHERE ua.album.id = :albumId AND ua.textoResena IS NOT NULL")
    Long contarResenasPorAlbum(@Param("albumId") Long albumId);
    
    @Query("SELECT COUNT(ua) FROM UsuarioAlbum ua WHERE ua.album.id = :albumId AND ua.puntuacion IS NOT NULL")
    Long contarPuntuacionesPorAlbum(@Param("albumId") Long albumId);
    
    @Query("SELECT COUNT(ua) FROM UsuarioAlbum ua WHERE ua.album.id = :albumId AND ua.escuchado = true")
    Long contarEscuchadosPorAlbum(@Param("albumId") Long albumId);
    
    @Query("SELECT ua.album.tituloAlbum, AVG(ua.puntuacion) as promedio, COUNT(ua) as total " +
           "FROM UsuarioAlbum ua WHERE ua.puntuacion IS NOT NULL AND ua.escuchado = true " +
           "GROUP BY ua.album.id, ua.album.tituloAlbum HAVING COUNT(ua) >= 1 ORDER BY promedio DESC")
    List<Object[]> albumesMejorPuntuados(Pageable pageable);
    
    @Query("SELECT ua.puntuacion, COUNT(ua) FROM UsuarioAlbum ua WHERE ua.puntuacion IS NOT NULL AND ua.escuchado = true GROUP BY ua.puntuacion ORDER BY ua.puntuacion")
    List<Object[]> distribucionPuntuaciones();
    
    @Query("SELECT ua.usuario.nombreUsuario, COUNT(ua) as total FROM UsuarioAlbum ua " +
           "WHERE ua.textoResena IS NOT NULL AND ua.escuchado = true GROUP BY ua.usuario.id, ua.usuario.nombreUsuario ORDER BY total DESC")
    List<Object[]> usuariosMasActivos(Pageable pageable);
    
    @Query("SELECT COUNT(ua) FROM UsuarioAlbum ua WHERE ua.textoResena IS NOT NULL AND ua.escuchado = true")
    Long contarTotalResenas();
    
    @Query("SELECT COUNT(ua) FROM UsuarioAlbum ua WHERE ua.escuchado = true")
    Long contarTotalEscuchados();
    
    @Query("SELECT AVG(ua.puntuacion) FROM UsuarioAlbum ua WHERE ua.usuario.id = :usuarioId AND ua.puntuacion IS NOT NULL AND ua.escuchado = true")
    Double calcularPuntuacionMediaPorUsuario(@Param("usuarioId") Long usuarioId);
    
    @Query("SELECT ag.genero.id, ag.genero.nombreGenero, ag.genero.color, COUNT(ua) as conteo " +
           "FROM UsuarioAlbum ua " +
           "JOIN AlbumGenero ag ON ua.album.id = ag.album.id " +
           "WHERE ua.usuario.id = :usuarioId AND ua.escuchado = true " +
           "GROUP BY ag.genero.id, ag.genero.nombreGenero, ag.genero.color " +
           "ORDER BY conteo DESC")
    List<Object[]> generosMasEscuchadosPorUsuario(@Param("usuarioId") Long usuarioId, Pageable pageable);
}
