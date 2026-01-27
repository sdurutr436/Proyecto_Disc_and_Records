package com.discsandrecords.api.dto;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;

/**
 * DTO para actualizar solo el email del usuario
 */
public record UpdateEmailDTO(
    @NotBlank(message = "El email es requerido")
    @Email(message = "El email debe ser válido")
    String mail
) {}
