package com.discsandrecords.api.dto;

/**
 * AuthResponseDTO - DTO de respuesta de autenticación
 *
 * PROPÓSITO:
 * Transporta el token JWT y datos básicos del usuario autenticado
 * como respuesta a login o registro exitoso.
 *
 * CONTENIDO:
 * - token: JWT firmado para autenticación en futuras peticiones
 * - tipo: Tipo de token (siempre "Bearer" para JWT)
 * - id: ID del usuario autenticado
 * - nombreUsuario: Nombre de usuario para mostrar en UI
 * - mail: Email del usuario
 * - role: Rol asignado al usuario
 *
 * USO EN CLIENTE:
 * El cliente debe:
 * 1. Almacenar el token de forma segura (localStorage, sessionStorage, o cookie HttpOnly)
 * 2. Incluir el token en el header Authorization de cada petición:
 *    Authorization: Bearer <token>
 *
 * @see com.discsandrecords.api.security.JwtService
 */
public record AuthResponseDTO(
    String token,
    String tipo,
    Long id,
    String nombreUsuario,
    String mail,
    String role
) {
    /**
     * Constructor con tipo "Bearer" por defecto
     */
    public AuthResponseDTO(String token, Long id, String nombreUsuario, String mail, String role) {
        this(token, "Bearer", id, nombreUsuario, mail, role);
    }
}
