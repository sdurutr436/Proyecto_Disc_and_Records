package com.discsandrecords.api.dto;

import java.math.BigDecimal;

import io.swagger.v3.oas.annotations.media.Schema;

/**
 * DTO para estadísticas de un álbum
 * 
 * Contiene métricas calculadas desde las reseñas del backend,
 * NO desde Deezer (como fans).
 * 
 * @param albumId ID del álbum
 * @param reviewCount Número de reseñas (usuarios que han escrito texto)
 * @param ratingCount Número de puntuaciones (usuarios que han calificado)
 * @param averageRating Puntuación media (1-5), null si no hay puntuaciones
 * @param listenedCount Número de usuarios que han marcado como escuchado
 */
@Schema(description = "Estadísticas de un álbum calculadas desde reseñas de usuarios")
public record AlbumStatsDTO(
    @Schema(description = "ID del álbum", example = "12345")
    Long albumId,
    
    @Schema(description = "Número de reseñas escritas", example = "42")
    long reviewCount,
    
    @Schema(description = "Número de usuarios que han puntuado", example = "150")
    long ratingCount,
    
    @Schema(description = "Puntuación media (1-5)", example = "4.25")
    BigDecimal averageRating,
    
    @Schema(description = "Usuarios que han marcado como escuchado", example = "230")
    long listenedCount
) {}
