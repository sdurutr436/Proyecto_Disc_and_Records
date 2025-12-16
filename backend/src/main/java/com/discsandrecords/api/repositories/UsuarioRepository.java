package com.discsandrecords.api.repositories;

import java.time.Instant;
import java.util.List;
import java.util.Optional;

import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.discsandrecords.api.entities.Role;
import com.discsandrecords.api.entities.Usuario;

/**
 * UsuarioRepository - Repositorio JPA para Usuarios
 * 
 * Contiene métodos derivados y @Query personalizadas para:
 * - Autenticación (buscar por email, username)
 * - Estadísticas de usuarios
 * - Filtrado por rol y fecha de registro
 */
@Repository
public interface UsuarioRepository extends JpaRepository<Usuario, Long> {
    
    // ==========================================
    // MÉTODOS DERIVADOS - AUTENTICACIÓN
    // ==========================================
    
    Optional<Usuario> findByNombreUsuario(String nombreUsuario);
    Optional<Usuario> findByMail(String mail);
    boolean existsByNombreUsuario(String nombreUsuario);
    boolean existsByMail(String mail);
    
    // ==========================================
    // QUERIES PERSONALIZADAS - BÚSQUEDA
    // ==========================================
    
    /**
     * Buscar usuarios por rol
     */
    @Query("SELECT u FROM Usuario u WHERE u.role = :role")
    List<Usuario> findByRole(@Param("role") Role role);
    
    /**
     * Buscar usuarios activos
     */
    @Query("SELECT u FROM Usuario u WHERE u.activo = true ORDER BY u.nombreUsuario")
    List<Usuario> findActivos();
    
    /**
     * Buscar usuarios inactivos
     */
    @Query("SELECT u FROM Usuario u WHERE u.activo = false ORDER BY u.nombreUsuario")
    List<Usuario> findInactivos();
    
    /**
     * Buscar usuarios registrados después de una fecha
     */
    @Query("SELECT u FROM Usuario u WHERE u.fechaRegistro >= :fecha ORDER BY u.fechaRegistro DESC")
    List<Usuario> findRegistradosDespuesDe(@Param("fecha") Instant fecha);
    
    /**
     * Buscar usuarios por nombre o email (búsqueda combinada)
     */
    @Query("SELECT u FROM Usuario u WHERE " +
           "LOWER(u.nombreUsuario) LIKE LOWER(CONCAT('%', :termino, '%')) OR " +
           "LOWER(u.mail) LIKE LOWER(CONCAT('%', :termino, '%'))")
    List<Usuario> buscarPorTermino(@Param("termino") String termino);
    
    // ==========================================
    // QUERIES PERSONALIZADAS - ESTADÍSTICAS
    // ==========================================
    
    /**
     * Contar usuarios por rol
     */
    @Query("SELECT u.role, COUNT(u) FROM Usuario u GROUP BY u.role")
    List<Object[]> contarPorRol();
    
    /**
     * Usuarios más activos (con más reseñas de álbumes)
     */
    @Query("SELECT u.nombreUsuario, COUNT(ua) as totalResenas FROM Usuario u " +
           "LEFT JOIN UsuarioAlbum ua ON ua.usuario.id = u.id AND ua.textoResena IS NOT NULL " +
           "GROUP BY u.id, u.nombreUsuario ORDER BY totalResenas DESC")
    List<Object[]> usuariosMasActivosAlbumes(Pageable pageable);
    
    /**
     * Usuarios más activos (con más reseñas de canciones)
     */
    @Query("SELECT u.nombreUsuario, COUNT(uc) as totalResenas FROM Usuario u " +
           "LEFT JOIN UsuarioCancion uc ON uc.usuario.id = u.id AND uc.textoResena IS NOT NULL " +
           "GROUP BY u.id, u.nombreUsuario ORDER BY totalResenas DESC")
    List<Object[]> usuariosMasActivosCanciones(Pageable pageable);
    
    /**
     * Usuarios más recientes
     */
    @Query("SELECT u FROM Usuario u ORDER BY u.fechaRegistro DESC")
    List<Usuario> findMasRecientes(Pageable pageable);
    
    /**
     * Total de usuarios activos
     */
    @Query("SELECT COUNT(u) FROM Usuario u WHERE u.activo = true")
    Long contarActivos();
    
    /**
     * Total de usuarios
     */
    @Query("SELECT COUNT(u) FROM Usuario u")
    Long contarTotalUsuarios();
}
