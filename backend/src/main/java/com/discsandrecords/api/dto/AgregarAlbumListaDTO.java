package com.discsandrecords.api.dto;

import jakarta.validation.constraints.NotNull;

/**
 * DTO para añadir un álbum a la lista del usuario
 */
public record AgregarAlbumListaDTO(
    @NotNull(message = "El ID del usuario es requerido")
    Long usuarioId,
    
    @NotNull(message = "El ID del álbum es requerido")
    Long albumId
) {}
