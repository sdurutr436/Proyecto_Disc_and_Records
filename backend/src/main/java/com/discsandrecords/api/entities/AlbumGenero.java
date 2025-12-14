package com.discsandrecords.api.entities;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "album_genero")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
@IdClass(AlbumGeneroId.class)
public class AlbumGenero {

    @Id
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "id_album", nullable = false)
    private Album album;

    @Id
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "id_genero", nullable = false)
    private Genero genero;
}
