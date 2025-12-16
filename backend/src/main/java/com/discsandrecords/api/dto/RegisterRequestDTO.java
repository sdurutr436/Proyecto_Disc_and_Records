package com.discsandrecords.api.dto;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;

/**
 * RegisterRequestDTO - DTO para solicitud de registro
 *
 * PROPÓSITO:
 * Transporta los datos necesarios para crear una nueva cuenta de usuario.
 * Incluye validaciones para garantizar la integridad de los datos.
 *
 * DIFERENCIA CON CreateUsuarioDTO:
 * - RegisterRequestDTO: Usado por usuarios públicos para registrarse
 * - CreateUsuarioDTO: Usado por administradores para crear usuarios (puede incluir rol)
 *
 * VALIDACIONES:
 * - nombreUsuario: 3-50 caracteres, requerido
 * - mail: Formato email válido, requerido
 * - contrasena: Mínimo 8 caracteres (más seguro que 6), requerido
 *
 * @see com.discsandrecords.api.security.AuthController
 */
public record RegisterRequestDTO(
    @NotBlank(message = "El nombre de usuario no puede estar vacío")
    @Size(min = 3, max = 50, message = "El nombre de usuario debe tener entre 3 y 50 caracteres")
    String nombreUsuario,

    @NotBlank(message = "El email no puede estar vacío")
    @Email(message = "El email debe ser válido")
    String mail,

    @NotBlank(message = "La contraseña no puede estar vacía")
    @Size(min = 8, message = "La contraseña debe tener al menos 8 caracteres")
    String contrasena
) {}
