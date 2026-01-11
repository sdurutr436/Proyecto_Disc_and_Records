package com.discsandrecords.api.dto;

import java.util.List;

/**
 * DTO para estadísticas del perfil de usuario
 *
 * PROPÓSITO:
 * Agrupa todas las estadísticas relevantes del perfil de un usuario
 * para mostrar en la página de perfil del frontend.
 *
 * ESTADÍSTICAS INCLUIDAS:
 * - Contadores básicos (álbumes, canciones, reseñas)
 * - Géneros más escuchados (para gráfico de barras)
 * - Puntuación media de las reseñas del usuario
 *
 * @param totalAlbumesEscuchados Número total de álbumes marcados como escuchados
 * @param totalCancionesEscuchadas Número total de canciones marcadas como escuchadas
 * @param totalResenasAlbumes Número de reseñas escritas para álbumes
 * @param totalResenasCanciones Número de reseñas escritas para canciones
 * @param puntuacionMediaDada Puntuación promedio que el usuario da (1-5)
 * @param generosMasEscuchados Lista de géneros ordenados por frecuencia
 */
public record UsuarioEstadisticasDTO(
        Long totalAlbumesEscuchados,
        Long totalCancionesEscuchadas,
        Long totalResenasAlbumes,
        Long totalResenasCanciones,
        Double puntuacionMediaDada,
        List<GeneroConteoDTO> generosMasEscuchados
) {
    /**
     * DTO interno para conteo de géneros
     *
     * @param generoId ID del género
     * @param nombreGenero Nombre del género
     * @param color Color hex del género (para UI)
     * @param conteo Número de veces escuchado
     */
    public record GeneroConteoDTO(
            Long generoId,
            String nombreGenero,
            String color,
            Long conteo
    ) {}
}
