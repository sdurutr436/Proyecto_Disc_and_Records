package com.discsandrecords.api.dto;

import java.time.Instant;

public record UsuarioResponseDTO(
    Long id,
    String nombreUsuario,
    String mail,
    String avatar,
    String biografia,
    Instant fechaRegistro
) {}
