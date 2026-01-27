package com.discsandrecords.api.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;

/**
 * DTO para cambiar la contraseña del usuario
 */
public record ChangePasswordDTO(
    @NotBlank(message = "La contraseña actual es requerida")
    String contrasenaActual,
    
    @NotBlank(message = "La nueva contraseña es requerida")
    @Size(min = 6, max = 100, message = "La contraseña debe tener entre 6 y 100 caracteres")
    String contrasenaNueva
) {}
