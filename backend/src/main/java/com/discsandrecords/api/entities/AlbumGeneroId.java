package com.discsandrecords.api.entities;

import java.io.Serializable;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class AlbumGeneroId implements Serializable {
    private Long album;
    private Long genero;
}
