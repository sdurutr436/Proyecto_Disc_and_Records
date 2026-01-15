package com.discsandrecords.api.dto;

import java.time.Instant;

/**
 * DTO para representar un álbum en la lista del usuario
 */
public record AlbumEnListaDTO(
    Long albumId,
    String titulo,
    String portadaUrl,
    String artista,
    Integer anio,
    Integer puntuacion,
    boolean tieneResena,
    Instant fechaAgregada,
    Instant fechaResena
) {}
