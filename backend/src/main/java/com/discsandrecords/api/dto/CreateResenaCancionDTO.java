package com.discsandrecords.api.dto;

import jakarta.validation.constraints.*;

public record CreateResenaCancionDTO(
    @NotNull(message = "El ID de usuario es obligatorio")
    Long idUsuario,
    
    @NotNull(message = "El ID de canción es obligatorio")
    Long idCancion,
    
    @Min(value = 1, message = "La puntuación mínima es 1")
    @Max(value = 5, message = "La puntuación máxima es 5")
    Integer puntuacion,
    
    String textoResena
) {}
