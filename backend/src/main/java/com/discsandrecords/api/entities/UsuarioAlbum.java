package com.discsandrecords.api.entities;

import jakarta.persistence.*;
import lombok.*;
import java.time.Instant;

/**
 * UsuarioAlbum - Relación Usuario-Álbum con reseña y puntuación
 * 
 * REGLAS DE NEGOCIO:
 * 1. Un usuario puede añadir un álbum a su lista (escuchado = true)
 * 2. Solo puede puntuar/reseñar si el álbum está en su lista
 * 3. Si quita el álbum de su lista (escuchado = false):
 *    - Su reseña se oculta (no se muestra públicamente)
 *    - Su puntuación NO cuenta para la media global
 *    - Los datos NO se pierden - puede volver a añadirlo
 * 4. La media del álbum se calcula solo con usuarios que tienen escuchado = true
 */
@Entity
@Table(name = "usuario_album")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
@IdClass(UsuarioAlbumId.class)
public class UsuarioAlbum {

    @Id
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "id_usuario", nullable = false)
    private Usuario usuario;

    @Id
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "id_album", nullable = false)
    private Album album;

    /**
     * Indica si el álbum está en la lista del usuario.
     * - true: El álbum está en su lista (lo ha "escuchado")
     * - false: El álbum fue quitado de la lista pero se conservan los datos
     * 
     * Cuando escuchado = false:
     * - La reseña NO se muestra públicamente
     * - La puntuación NO cuenta para la media del álbum
     */
    @Column(nullable = false)
    @Builder.Default
    private Boolean escuchado = true;

    /**
     * Puntuación del usuario (1-5)
     * Solo válida si escuchado = true
     */
    @Column
    private Integer puntuacion;

    /**
     * Texto de la reseña del usuario
     * Solo visible públicamente si escuchado = true
     */
    @Column(columnDefinition = "TEXT")
    private String textoResena;

    /**
     * Fecha en que el usuario añadió el álbum a su lista
     */
    @Column(nullable = false, updatable = false)
    private Instant fechaAgregada;

    /**
     * Fecha de la última actualización de la reseña
     */
    @Column
    private Instant fechaResena;

    /**
     * Fecha en que se quitó de la lista (null si está activo)
     */
    @Column
    private Instant fechaQuitado;

    @PrePersist
    protected void onCreate() {
        fechaAgregada = Instant.now();
    }
}
