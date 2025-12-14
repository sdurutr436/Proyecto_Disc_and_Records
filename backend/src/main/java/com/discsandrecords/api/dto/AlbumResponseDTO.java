package com.discsandrecords.api.dto;

import java.math.BigDecimal;

public record AlbumResponseDTO(
    Long id,
    String tituloAlbum,
    Integer anioSalida,
    String portadaUrl,
    BigDecimal puntuacionMedia,
    ArtistaResponseDTO artista
) {}
