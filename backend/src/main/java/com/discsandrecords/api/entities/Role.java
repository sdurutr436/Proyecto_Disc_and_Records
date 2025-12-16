package com.discsandrecords.api.entities;

/**
 * Role - Enumeración de Roles de Usuario
 *
 * PROPÓSITO:
 * Define los diferentes niveles de acceso disponibles en el sistema.
 * Cada rol determina qué operaciones puede realizar un usuario.
 *
 * ROLES DISPONIBLES:
 * - ROLE_USER: Usuario estándar con permisos básicos (leer, crear reseñas propias)
 * - ROLE_MODERATOR: Usuario con permisos intermedios (moderar contenido)
 * - ROLE_ADMIN: Administrador con acceso completo al sistema
 *
 * CONVENCIÓN:
 * Spring Security requiere que los roles empiecen con "ROLE_" para usar
 * hasRole() en lugar de hasAuthority(). Esto es una convención de Spring.
 *
 * @see Usuario
 * @see com.discsandrecords.api.security.SecurityConfig
 */
public enum Role {

    /**
     * Usuario estándar
     * Permisos:
     * - Leer artistas, álbumes, canciones, géneros
     * - Crear/editar/eliminar sus propias reseñas
     * - Actualizar su propio perfil
     */
    ROLE_USER,

    /**
     * Moderador
     * Permisos de ROLE_USER más:
     * - Eliminar reseñas inapropiadas de otros usuarios
     * - Gestionar reportes de contenido
     */
    ROLE_MODERATOR,

    /**
     * Administrador
     * Acceso completo:
     * - Todos los permisos de ROLE_MODERATOR
     * - CRUD completo de artistas, álbumes, canciones, géneros
     * - Gestión de usuarios (crear, editar, eliminar, cambiar roles)
     * - Acceso a endpoints de administración
     */
    ROLE_ADMIN
}
