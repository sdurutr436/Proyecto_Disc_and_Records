package com.discsandrecords.api.dto;

public record GeneroResponseDTO(
    Long id,
    String nombreGenero,
    String descripcion,
    String color
) {}
