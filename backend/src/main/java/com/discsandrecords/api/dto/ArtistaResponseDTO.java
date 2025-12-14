package com.discsandrecords.api.dto;

import java.math.BigDecimal;

public record ArtistaResponseDTO(
    Long id,
    String nombreArtista,
    BigDecimal puntuacionMedia
) {}
