package com.discsandrecords.api.dto;

import java.time.Instant;

public record ResenaAlbumResponseDTO(
    Long usuarioId,
    String nombreUsuario,
    String avatarUsuario,
    Long albumId,
    String tituloAlbum,
    String portadaUrl,
    Integer puntuacion,
    String textoResena,
    Instant fechaResena,
    Boolean escuchado
) {}
