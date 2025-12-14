package com.discsandrecords.api.dto;

import jakarta.validation.constraints.*;

public record CreateAlbumDTO(
    @NotBlank(message = "El título del álbum no puede estar vacío")
    @Size(max = 150, message = "El título no puede exceder 150 caracteres")
    String tituloAlbum,
    
    @NotNull(message = "El año de salida es obligatorio")
    @Min(value = 1900, message = "El año debe ser mayor o igual a 1900")
    @Max(value = 2100, message = "El año debe ser menor o igual a 2100")
    Integer anioSalida,
    
    String portadaUrl,
    
    @NotNull(message = "El ID del artista es obligatorio")
    Long idArtista
) {}
