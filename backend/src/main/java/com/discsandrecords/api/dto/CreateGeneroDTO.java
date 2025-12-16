package com.discsandrecords.api.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;

public record CreateGeneroDTO(
    @NotBlank(message = "El nombre del género no puede estar vacío")
    @Size(max = 50, message = "El nombre del género no puede tener más de 50 caracteres")
    String nombreGenero,
    
    String descripcion,
    
    @Size(max = 7, message = "El color debe ser un código hexadecimal válido")
    String color
) {}
