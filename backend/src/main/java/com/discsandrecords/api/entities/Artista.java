package com.discsandrecords.api.entities;

import jakarta.persistence.*;
import lombok.*;
import java.math.BigDecimal;
import java.time.Instant;

@Entity
@Table(name = "artistas")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Artista {

    /**
     * ID interno del artista (auto-generado).
     * Este es el ID que se usa en todas las relaciones y URLs locales.
     */
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    /**
     * ID externo de Deezer.
     * - NULL si el artista fue creado manualmente.
     * - Valor único si fue importado desde Deezer.
     */
    @Column(name = "deezer_id", unique = true, length = 50)
    private String deezerId;

    @Column(nullable = false, length = 100)
    private String nombreArtista;

    @Column(precision = 3, scale = 2)
    private BigDecimal puntuacionMedia;

    /**
     * URL de la imagen del artista (de Deezer).
     */
    @Column(name = "imagen_url", length = 255)
    private String imagenUrl;

    /**
     * Fecha en que el artista fue importado desde Deezer.
     */
    @Column(name = "fecha_importacion")
    private Instant fechaImportacion;

    /**
     * Indica si el artista fue importado desde Deezer.
     */
    public boolean isImportadoDeDeezer() {
        return this.deezerId != null;
    }
}
