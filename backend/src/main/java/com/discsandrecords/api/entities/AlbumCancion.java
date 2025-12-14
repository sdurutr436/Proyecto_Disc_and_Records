package com.discsandrecords.api.entities;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "album_cancion")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
@IdClass(AlbumCancionId.class)
public class AlbumCancion {

    @Id
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "id_album", nullable = false)
    private Album album;

    @Id
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "id_cancion", nullable = false)
    private Cancion cancion;

    @Column
    private Integer numeroPista; // Orden en el álbum
}
