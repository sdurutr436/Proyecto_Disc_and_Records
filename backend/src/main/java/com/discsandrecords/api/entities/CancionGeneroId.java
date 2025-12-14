package com.discsandrecords.api.entities;

import java.io.Serializable;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class CancionGeneroId implements Serializable {
    private Long cancion;
    private Long genero;
}
