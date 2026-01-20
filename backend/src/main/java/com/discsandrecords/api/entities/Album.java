package com.discsandrecords.api.entities;

import jakarta.persistence.*;
import lombok.*;
import java.math.BigDecimal;
import java.time.Instant;

@Entity
@Table(name = "albumes", indexes = {
    @Index(name = "idx_album_deezer_id", columnList = "deezer_id", unique = true)
})
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Album {

    /**
     * ID interno del álbum (auto-generado).
     * Este es el ID que se usa en todas las relaciones y URLs locales.
     */
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    /**
     * ID externo de Deezer.
     * - NULL si el álbum fue creado manualmente en la plataforma.
     * - Valor único si fue importado desde Deezer.
     * 
     * Este campo permite:
     * 1. Buscar rápidamente si un álbum de Deezer ya existe (findByDeezerId)
     * 2. Evitar duplicados al importar
     * 3. Mantener trazabilidad del origen
     */
    @Column(name = "deezer_id", unique = true, length = 50)
    private String deezerId;

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

    /**
     * Fecha en que el álbum fue importado desde Deezer.
     * NULL si fue creado manualmente.
     */
    @Column(name = "fecha_importacion")
    private Instant fechaImportacion;

    /**
     * Número de tracks del álbum (metadata de Deezer).
     */
    @Column(name = "num_tracks")
    private Integer numTracks;

    /**
     * Duración total en segundos (metadata de Deezer).
     */
    @Column(name = "duracion_total")
    private Integer duracionTotal;

    /**
     * Sello discográfico (metadata de Deezer).
     */
    @Column(length = 100)
    private String sello;

    /**
     * Indica si el álbum fue importado desde Deezer.
     */
    public boolean isImportadoDeDeezer() {
        return this.deezerId != null;
    }
}
