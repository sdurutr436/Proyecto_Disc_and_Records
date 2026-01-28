package com.discsandrecords.api.dto;

import java.math.BigDecimal;

public record AlbumResponseDTO(
    Long id,
    String tituloAlbum,
    Integer anioSalida,
    String portadaUrl,
    BigDecimal puntuacionMedia,
    ArtistaResponseDTO artista,
    String deezerId, // ID original de Deezer para cargar metadata adicional
    String genero // Género musical (metadata de Deezer)
) {}
