package com.discsandrecords.api.dto;

public record EstadisticasPlataformaDTO(
    long totalAlbumes,
    long totalArtistas,
    long totalCanciones,
    long totalGeneros,
    long totalUsuarios,
    long totalResenas
) {}
