package com.discsandrecords.api.entities;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "generos")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Genero {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false, unique = true, length = 50)
    private String nombreGenero;

    @Column(columnDefinition = "TEXT")
    private String descripcion;

    @Column(length = 7)
    private String color; // Hex color para UI
}
