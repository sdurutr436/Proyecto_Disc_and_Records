package com.discsandrecords.api.dto;

import jakarta.validation.constraints.*;

public record CreateResenaAlbumDTO(
    @NotNull(message = "El ID de usuario es obligatorio")
    Long idUsuario,
    
    @NotNull(message = "El ID de álbum es obligatorio")
    Long idAlbum,
    
    @Min(value = 1, message = "La puntuación mínima es 1")
    @Max(value = 5, message = "La puntuación máxima es 5")
    Integer puntuacion,
    
    String textoResena
) {}
