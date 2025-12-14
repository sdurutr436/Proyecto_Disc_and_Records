package com.discsandrecords.api.dto;

import jakarta.validation.constraints.*;

public record CreateCancionDTO(
    @NotBlank(message = "El título de la canción no puede estar vacío")
    @Size(max = 150, message = "El título no puede exceder 150 caracteres")
    String tituloCancion,
    
    @Min(value = 1900, message = "El año debe ser mayor o igual a 1900")
    @Max(value = 2100, message = "El año debe ser menor o igual a 2100")
    Integer anioSalida,
    
    @NotNull(message = "El ID del artista es obligatorio")
    Long idArtista
) {}
