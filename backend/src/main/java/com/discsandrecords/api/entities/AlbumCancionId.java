package com.discsandrecords.api.entities;

import lombok.*;
import java.io.Serializable;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class AlbumCancionId implements Serializable {
    private Long album;
    private Long cancion;
}
