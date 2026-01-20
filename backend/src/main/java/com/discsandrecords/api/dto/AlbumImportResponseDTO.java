package com.discsandrecords.api.dto;

import java.math.BigDecimal;

/**
 * DTO de respuesta para importación de álbum desde Deezer.
 * 
 * Extiende AlbumResponseDTO con información adicional:
 * - deezerId: ID original de Deezer
 * - wasImported: true si fue importado en esta llamada, false si ya existía
 * - metadata adicional del álbum
 * 
 * Usado por: GET /api/albumes/deezer/{deezerId}
 */
public record AlbumImportResponseDTO(
    /** ID interno del álbum (para usar en rutas locales) */
    Long id,
    
    /** Título del álbum */
    String tituloAlbum,
    
    /** Año de lanzamiento */
    Integer anioSalida,
    
    /** URL de la portada */
    String portadaUrl,
    
    /** Puntuación media de reseñas (null si no hay reseñas) */
    BigDecimal puntuacionMedia,
    
    /** Datos del artista */
    ArtistaResponseDTO artista,
    
    /** ID original de Deezer */
    String deezerId,
    
    /** true si el álbum fue importado en esta llamada, false si ya existía */
    boolean wasImported,
    
    /** Número de tracks (metadata de Deezer) */
    Integer numTracks,
    
    /** Duración total en segundos (metadata de Deezer) */
    Integer duracionTotal,
    
    /** Sello discográfico (metadata de Deezer) */
    String sello
) {
    /**
     * Factory method para crear desde AlbumResponseDTO básico.
     */
    public static AlbumImportResponseDTO from(
            AlbumResponseDTO albumDTO, 
            String deezerId, 
            boolean wasImported,
            Integer numTracks,
            Integer duracionTotal,
            String sello) {
        return new AlbumImportResponseDTO(
            albumDTO.id(),
            albumDTO.tituloAlbum(),
            albumDTO.anioSalida(),
            albumDTO.portadaUrl(),
            albumDTO.puntuacionMedia(),
            albumDTO.artista(),
            deezerId,
            wasImported,
            numTracks,
            duracionTotal,
            sello
        );
    }
}
