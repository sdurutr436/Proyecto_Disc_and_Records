package com.discsandrecords.api.dto;

import jakarta.validation.constraints.Max;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotNull;

/**
 * DTO para puntuar un álbum
 */
public record PuntuarAlbumDTO(
    @NotNull(message = "El ID del usuario es requerido")
    Long usuarioId,
    
    @NotNull(message = "El ID del álbum es requerido")
    Long albumId,
    
    @NotNull(message = "La puntuación es requerida")
    @Min(value = 1, message = "La puntuación mínima es 1")
    @Max(value = 5, message = "La puntuación máxima es 5")
    Integer puntuacion
) {}
