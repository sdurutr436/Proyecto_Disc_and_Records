package com.discsandrecords.api.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;

public record CreateArtistaDTO(
    @NotBlank(message = "El nombre del artista no puede estar vacío")
    @Size(max = 100, message = "El nombre del artista no puede exceder 100 caracteres")
    String nombreArtista
) {}
