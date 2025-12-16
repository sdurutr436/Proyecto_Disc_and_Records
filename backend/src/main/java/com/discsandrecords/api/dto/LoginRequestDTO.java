package com.discsandrecords.api.dto;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;

/**
 * LoginRequestDTO - DTO para solicitud de inicio de sesión
 *
 * PROPÓSITO:
 * Transporta las credenciales del usuario desde el cliente al servidor
 * para el proceso de autenticación.
 *
 * CAMPOS:
 * - mail: Email del usuario (identificador de login)
 * - contrasena: Contraseña en texto plano (se comparará con hash)
 *
 * SEGURIDAD:
 * - La contraseña viaja en texto plano, por lo que SIEMPRE usar HTTPS
 * - El servidor nunca almacena ni loguea la contraseña en texto plano
 *
 * @see com.discsandrecords.api.security.AuthController
 */
public record LoginRequestDTO(
    @NotBlank(message = "El email no puede estar vacío")
    @Email(message = "El email debe ser válido")
    String mail,

    @NotBlank(message = "La contraseña no puede estar vacía")
    String contrasena
) {}
