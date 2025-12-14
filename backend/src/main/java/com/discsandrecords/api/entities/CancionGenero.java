package com.discsandrecords.api.entities;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "cancion_genero")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
@IdClass(CancionGeneroId.class)
public class CancionGenero {

    @Id
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "id_cancion", nullable = false)
    private Cancion cancion;

    @Id
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "id_genero", nullable = false)
    private Genero genero;
}
