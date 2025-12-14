package com.discsandrecords.api.entities;

import jakarta.persistence.*;
import lombok.*;
import java.time.Instant;

@Entity
@Table(name = "usuario_cancion")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
@IdClass(UsuarioCancionId.class)
public class UsuarioCancion {

    @Id
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "id_usuario", nullable = false)
    private Usuario usuario;

    @Id
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "id_cancion", nullable = false)
    private Cancion cancion;

    @Column(nullable = false)
    private Boolean escuchada = true;

    @Column
    private Integer puntuacion; // 1-5

    @Column(columnDefinition = "TEXT")
    private String textoResena;

    @Column(nullable = false, updatable = false)
    private Instant fechaAgregada;

    @Column
    private Instant fechaResena;

    @PrePersist
    protected void onCreate() {
        fechaAgregada = Instant.now();
    }
}
