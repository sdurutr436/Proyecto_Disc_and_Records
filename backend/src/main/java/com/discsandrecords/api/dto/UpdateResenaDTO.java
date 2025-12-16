package com.discsandrecords.api.dto;

import jakarta.validation.constraints.Max;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.Size;

public record UpdateResenaDTO(
    @Min(value = 1, message = "La puntuación mínima es 1")
    @Max(value = 5, message = "La puntuación máxima es 5")
    Integer puntuacion,
    
    @Size(max = 5000, message = "La reseña no puede tener más de 5000 caracteres")
    String textoResena
) {}
