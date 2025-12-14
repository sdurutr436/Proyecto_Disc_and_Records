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

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false, length = 100)
    private String nombreArtista;

    @Column(precision = 3, scale = 2)
    private BigDecimal puntuacionMedia;
}
