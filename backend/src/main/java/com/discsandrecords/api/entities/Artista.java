package com.discsandrecords.api.entities;

import jakarta.persistence.*;
import lombok.*;
import java.math.BigDecimal;

@Entity
@Table(name = "artistas")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Artista {

    /**
     * ID del artista.
     * Puede ser:
     * - Un ID generado automáticamente por la BD (para artistas creados localmente)
     * - Un ID de Deezer (cuando se importa desde la API de Deezer)
     */
    @Id
    private Long id;

    @Column(nullable = false, length = 100)
    private String nombreArtista;

    @Column(precision = 3, scale = 2)
    private BigDecimal puntuacionMedia;
}
