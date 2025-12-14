package com.discsandrecords.api.entities;

import jakarta.persistence.*;
import lombok.*;
import java.time.Instant;

@Entity
@Table(name = "usuarios")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Usuario {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false, unique = true, length = 50)
    private String nombreUsuario;

    @Column(nullable = false, unique = true, length = 100)
    private String mail;

    @Column(nullable = false)
    private String contrasena; // Se debe hashear con BCrypt

    @Column(length = 255)
    private String avatar;

    @Column(columnDefinition = "TEXT")
    private String biografia;

    @Column(nullable = false, updatable = false)
    private Instant fechaRegistro;

    @PrePersist
    protected void onCreate() {
        fechaRegistro = Instant.now();
    }
}
