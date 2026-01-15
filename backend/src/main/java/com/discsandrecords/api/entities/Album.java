package com.discsandrecords.api.entities;

import jakarta.persistence.*;
import lombok.*;
import java.math.BigDecimal;

@Entity
@Table(name = "albumes")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Album {

    /**
     * ID del álbum.
     * Puede ser:
     * - Un ID generado automáticamente por la BD (para álbumes creados localmente)
     * - Un ID de Deezer (cuando se importa desde la API de Deezer)
     * 
     * Usamos GenerationType.SEQUENCE para permitir ambos casos.
     */
    @Id
    private Long id;

    @Column(nullable = false, length = 150)
    private String tituloAlbum;

    @Column(nullable = false)
    private Integer anioSalida;

    @Column(length = 255)
    private String portadaUrl;

    @Column(precision = 3, scale = 2)
    private BigDecimal puntuacionMedia;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "id_artista", nullable = false)
    private Artista artista;
}
