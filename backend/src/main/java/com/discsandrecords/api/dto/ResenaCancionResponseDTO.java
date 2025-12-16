package com.discsandrecords.api.dto;

import java.time.Instant;

public record ResenaCancionResponseDTO(
    Long usuarioId,
    String nombreUsuario,
    String avatarUsuario,
    Long cancionId,
    String tituloCancion,
    Integer puntuacion,
    String textoResena,
    Instant fechaResena,
    Boolean escuchado
) {}
