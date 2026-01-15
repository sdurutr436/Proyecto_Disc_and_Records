package com.discsandrecords.api.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;

/**
 * DTO para añadir un álbum de Deezer a la lista del usuario.
 * Incluye datos del álbum para auto-crearlo si no existe en la BD local.
 * 
 * FLUJO:
 * 1. Frontend envía datos completos del álbum de Deezer
 * 2. Backend verifica si el álbum existe en BD local
 * 3. Si no existe, lo crea automáticamente con los datos proporcionados
 * 4. Luego añade el álbum a la lista del usuario
 */
public record AgregarAlbumDeezerDTO(
    @NotNull(message = "El ID del usuario es requerido")
    Long usuarioId,
    
    @NotNull(message = "El ID del álbum de Deezer es requerido")
    Long albumId,
    
    // Datos del álbum de Deezer (para auto-crear si no existe)
    @NotBlank(message = "El título del álbum es requerido")
    String tituloAlbum,
    
    String portadaUrl,
    
    Integer anioSalida,
    
    // Datos del artista (para auto-crear si no existe)
    @NotNull(message = "El ID del artista de Deezer es requerido")
    Long artistaId,
    
    @NotBlank(message = "El nombre del artista es requerido")
    String nombreArtista
) {}
