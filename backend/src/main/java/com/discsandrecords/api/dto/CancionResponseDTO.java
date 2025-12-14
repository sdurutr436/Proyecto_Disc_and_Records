package com.discsandrecords.api.dto;

import java.math.BigDecimal;

public record CancionResponseDTO(
    Long id,
    String tituloCancion,
    Integer anioSalida,
    BigDecimal puntuacionMedia,
    ArtistaResponseDTO artista
) {}
