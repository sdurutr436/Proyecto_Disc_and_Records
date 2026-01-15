package com.discsandrecords.api.services;

import java.time.Instant;
import java.util.List;
import java.util.Optional;

import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.discsandrecords.api.dto.AgregarAlbumDeezerDTO;
import com.discsandrecords.api.dto.AgregarAlbumListaDTO;
import com.discsandrecords.api.dto.AlbumEnListaDTO;
import com.discsandrecords.api.dto.PuntuarAlbumDTO;
import com.discsandrecords.api.entities.Album;
import com.discsandrecords.api.entities.Artista;
import com.discsandrecords.api.entities.Usuario;
import com.discsandrecords.api.entities.UsuarioAlbum;
import com.discsandrecords.api.exceptions.BusinessRuleException;
import com.discsandrecords.api.exceptions.ResourceNotFoundException;
import com.discsandrecords.api.repositories.AlbumRepository;
import com.discsandrecords.api.repositories.ArtistaRepository;
import com.discsandrecords.api.repositories.UsuarioAlbumRepository;
import com.discsandrecords.api.repositories.UsuarioRepository;

/**
 * ListaAlbumService - Gestión de la Lista de Álbumes del Usuario
 * 
 * REGLAS DE NEGOCIO:
 * 1. Un usuario puede añadir álbumes a su lista (implica que lo ha "escuchado")
 * 2. Solo puede puntuar si el álbum está en su lista
 * 3. Solo puede reseñar si el álbum está en su lista
 * 4. Al quitar de la lista:
 *    - La reseña se oculta (no visible públicamente)
 *    - La puntuación NO cuenta para la media global
 *    - Los datos NO se eliminan - se pueden restaurar
 * 5. La media del álbum solo cuenta puntuaciones de usuarios con el álbum en lista
 * 
 * INTEGRACIÓN CON DEEZER:
 * - Los álbumes de Deezer se auto-crean en la BD local cuando se añaden a una lista
 * - Esto permite que los usuarios guarden cualquier álbum de Deezer sin pre-existir
 */
@Service
@Transactional
public class ListaAlbumService {

    private static final int PUNTUACION_MINIMA = 1;
    private static final int PUNTUACION_MAXIMA = 5;

    private final UsuarioAlbumRepository usuarioAlbumRepository;
    private final UsuarioRepository usuarioRepository;
    private final AlbumRepository albumRepository;
    private final ArtistaRepository artistaRepository;
    private final AlbumService albumService;

    public ListaAlbumService(UsuarioAlbumRepository usuarioAlbumRepository,
                             UsuarioRepository usuarioRepository,
                             AlbumRepository albumRepository,
                             ArtistaRepository artistaRepository,
                             AlbumService albumService) {
        this.usuarioAlbumRepository = usuarioAlbumRepository;
        this.usuarioRepository = usuarioRepository;
        this.albumRepository = albumRepository;
        this.artistaRepository = artistaRepository;
        this.albumService = albumService;
    }

    // ==================== LISTA DE ÁLBUMES ====================

    /**
     * Obtener álbumes en la lista del usuario
     */
    @Transactional(readOnly = true)
    public List<AlbumEnListaDTO> obtenerListaUsuario(Long usuarioId) {
        if (!usuarioRepository.existsById(usuarioId)) {
            throw new ResourceNotFoundException("Usuario", "id", usuarioId);
        }

        return usuarioAlbumRepository.findAlbumesEnLista(usuarioId).stream()
                .map(this::toAlbumEnListaDTO)
                .toList();
    }

    /**
     * Obtener álbumes en la lista con paginación
     */
    @Transactional(readOnly = true)
    public List<AlbumEnListaDTO> obtenerListaUsuario(Long usuarioId, int page, int size) {
        if (!usuarioRepository.existsById(usuarioId)) {
            throw new ResourceNotFoundException("Usuario", "id", usuarioId);
        }

        return usuarioAlbumRepository.findAlbumesEnLista(usuarioId, PageRequest.of(page, size)).stream()
                .map(this::toAlbumEnListaDTO)
                .toList();
    }

    /**
     * Verificar si un álbum está en la lista del usuario
     */
    @Transactional(readOnly = true)
    public boolean estaEnLista(Long usuarioId, Long albumId) {
        return usuarioAlbumRepository.existeEnLista(usuarioId, albumId);
    }

    /**
     * Obtener el estado del álbum para un usuario (incluye puntuación y si tiene reseña)
     */
    @Transactional(readOnly = true)
    public Optional<AlbumEnListaDTO> obtenerEstadoAlbum(Long usuarioId, Long albumId) {
        return usuarioAlbumRepository.findByUsuarioAndAlbum(usuarioId, albumId)
                .filter(ua -> ua.getEscuchado())
                .map(this::toAlbumEnListaDTO);
    }

    /**
     * Añadir álbum a la lista del usuario
     * Si ya existía (quitado previamente), lo restaura
     */
    public AlbumEnListaDTO agregarALista(AgregarAlbumListaDTO dto) {
        Usuario usuario = usuarioRepository.findById(dto.usuarioId())
                .orElseThrow(() -> new ResourceNotFoundException("Usuario", "id", dto.usuarioId()));

        Album album = albumRepository.findById(dto.albumId())
                .orElseThrow(() -> new ResourceNotFoundException("Álbum", "id", dto.albumId()));

        // Verificar si ya existe el registro (aunque esté oculto)
        Optional<UsuarioAlbum> existente = usuarioAlbumRepository.findByUsuarioAndAlbum(dto.usuarioId(), dto.albumId());

        UsuarioAlbum usuarioAlbum;
        if (existente.isPresent()) {
            // Restaurar registro existente
            usuarioAlbum = existente.get();
            if (usuarioAlbum.getEscuchado()) {
                throw new BusinessRuleException("El álbum ya está en tu lista", "ALBUM_YA_EN_LISTA");
            }
            usuarioAlbum.setEscuchado(true);
            usuarioAlbum.setFechaQuitado(null);
        } else {
            // Crear nuevo registro
            usuarioAlbum = UsuarioAlbum.builder()
                    .usuario(usuario)
                    .album(album)
                    .escuchado(true)
                    .build();
        }

        UsuarioAlbum guardado = usuarioAlbumRepository.save(usuarioAlbum);

        // Recalcular media si tenía puntuación previa
        if (guardado.getPuntuacion() != null) {
            albumService.recalcularPuntuacionMedia(album.getId());
        }

        return toAlbumEnListaDTO(guardado);
    }

    /**
     * Añadir álbum de Deezer a la lista del usuario.
     * AUTO-CREA el álbum y artista si no existen en la BD local.
     * 
     * Este método permite que cualquier álbum de Deezer se pueda agregar
     * a la lista sin necesidad de que exista previamente en nuestra BD.
     */
    public AlbumEnListaDTO agregarAlbumDeezer(AgregarAlbumDeezerDTO dto) {
        Usuario usuario = usuarioRepository.findById(dto.usuarioId())
                .orElseThrow(() -> new ResourceNotFoundException("Usuario", "id", dto.usuarioId()));

        // Buscar o crear el álbum
        Album album = albumRepository.findById(dto.albumId())
                .orElseGet(() -> crearAlbumDesdeDTO(dto));

        // Verificar si ya existe el registro (aunque esté oculto)
        Optional<UsuarioAlbum> existente = usuarioAlbumRepository.findByUsuarioAndAlbum(dto.usuarioId(), dto.albumId());

        UsuarioAlbum usuarioAlbum;
        if (existente.isPresent()) {
            usuarioAlbum = existente.get();
            if (usuarioAlbum.getEscuchado()) {
                throw new BusinessRuleException("El álbum ya está en tu lista", "ALBUM_YA_EN_LISTA");
            }
            usuarioAlbum.setEscuchado(true);
            usuarioAlbum.setFechaQuitado(null);
        } else {
            usuarioAlbum = UsuarioAlbum.builder()
                    .usuario(usuario)
                    .album(album)
                    .escuchado(true)
                    .build();
        }

        UsuarioAlbum guardado = usuarioAlbumRepository.save(usuarioAlbum);

        if (guardado.getPuntuacion() != null) {
            albumService.recalcularPuntuacionMedia(album.getId());
        }

        return toAlbumEnListaDTO(guardado);
    }

    /**
     * Crea un álbum en la BD local desde los datos de Deezer.
     * También crea el artista si no existe.
     * 
     * Usa INSERT nativo para permitir IDs manuales (Deezer IDs)
     * ya que PostgreSQL SERIAL/IDENTITY ignora el ID en JPA save().
     */
    private Album crearAlbumDesdeDTO(AgregarAlbumDeezerDTO dto) {
        // Buscar o crear el artista usando INSERT nativo
        if (!artistaRepository.existsById(dto.artistaId())) {
            artistaRepository.insertarConId(dto.artistaId(), dto.nombreArtista());
        }
        
        Artista artista = artistaRepository.findById(dto.artistaId())
                .orElseThrow(() -> new RuntimeException("Error creando artista de Deezer: " + dto.artistaId()));

        // Crear el álbum usando INSERT nativo
        Integer anio = dto.anioSalida() != null ? dto.anioSalida() : java.time.Year.now().getValue();
        albumRepository.insertarConId(dto.albumId(), dto.tituloAlbum(), anio, dto.portadaUrl(), dto.artistaId());

        // Recuperar el álbum creado
        return albumRepository.findById(dto.albumId())
                .orElseThrow(() -> new RuntimeException("Error creando álbum de Deezer: " + dto.albumId()));
    }

    /**
     * Quitar álbum de la lista del usuario
     * NO elimina los datos - solo oculta reseña y puntuación
     */
    public void quitarDeLista(Long usuarioId, Long albumId) {
        UsuarioAlbum usuarioAlbum = usuarioAlbumRepository.findByUsuarioAndAlbum(usuarioId, albumId)
                .orElseThrow(() -> new ResourceNotFoundException("El álbum no está en tu lista"));

        if (!usuarioAlbum.getEscuchado()) {
            throw new BusinessRuleException("El álbum no está en tu lista", "ALBUM_NO_EN_LISTA");
        }

        usuarioAlbum.setEscuchado(false);
        usuarioAlbum.setFechaQuitado(Instant.now());
        usuarioAlbumRepository.save(usuarioAlbum);

        // Recalcular media del álbum (la puntuación del usuario ya no cuenta)
        albumService.recalcularPuntuacionMedia(albumId);
    }

    // ==================== PUNTUACIÓN ====================

    /**
     * Puntuar un álbum
     * REGLA: El álbum debe estar en la lista del usuario
     */
    public AlbumEnListaDTO puntuarAlbum(PuntuarAlbumDTO dto) {
        // Verificar que el álbum está en la lista
        UsuarioAlbum usuarioAlbum = usuarioAlbumRepository.findByUsuarioAndAlbum(dto.usuarioId(), dto.albumId())
                .orElseThrow(() -> new BusinessRuleException(
                        "Debes añadir el álbum a tu lista antes de puntuarlo",
                        "ALBUM_NO_EN_LISTA"));

        if (!usuarioAlbum.getEscuchado()) {
            throw new BusinessRuleException(
                    "Debes añadir el álbum a tu lista antes de puntuarlo",
                    "ALBUM_NO_EN_LISTA");
        }

        // Validar puntuación
        validarPuntuacion(dto.puntuacion());

        usuarioAlbum.setPuntuacion(dto.puntuacion());
        UsuarioAlbum guardado = usuarioAlbumRepository.save(usuarioAlbum);

        // Recalcular media del álbum
        albumService.recalcularPuntuacionMedia(dto.albumId());

        return toAlbumEnListaDTO(guardado);
    }

    /**
     * Quitar puntuación de un álbum (mantiene el álbum en la lista)
     */
    public AlbumEnListaDTO quitarPuntuacion(Long usuarioId, Long albumId) {
        UsuarioAlbum usuarioAlbum = usuarioAlbumRepository.findByUsuarioAndAlbum(usuarioId, albumId)
                .orElseThrow(() -> new ResourceNotFoundException("El álbum no está en tu lista"));

        if (!usuarioAlbum.getEscuchado()) {
            throw new BusinessRuleException("El álbum no está en tu lista", "ALBUM_NO_EN_LISTA");
        }

        usuarioAlbum.setPuntuacion(null);
        UsuarioAlbum guardado = usuarioAlbumRepository.save(usuarioAlbum);

        // Recalcular media del álbum
        albumService.recalcularPuntuacionMedia(albumId);

        return toAlbumEnListaDTO(guardado);
    }

    // ==================== ESTADÍSTICAS ====================

    /**
     * Contar álbumes en la lista del usuario
     */
    @Transactional(readOnly = true)
    public Long contarAlbumesEnLista(Long usuarioId) {
        return usuarioAlbumRepository.contarAlbumesEnLista(usuarioId);
    }

    // ==================== MÉTODOS AUXILIARES ====================

    private void validarPuntuacion(Integer puntuacion) {
        if (puntuacion == null) {
            throw new BusinessRuleException("La puntuación es requerida", "PUNTUACION_REQUERIDA");
        }
        if (puntuacion < PUNTUACION_MINIMA || puntuacion > PUNTUACION_MAXIMA) {
            throw new BusinessRuleException(
                    String.format("La puntuación debe estar entre %d y %d", PUNTUACION_MINIMA, PUNTUACION_MAXIMA),
                    "PUNTUACION_INVALIDA");
        }
    }

    private AlbumEnListaDTO toAlbumEnListaDTO(UsuarioAlbum ua) {
        return new AlbumEnListaDTO(
                ua.getAlbum().getId(),
                ua.getAlbum().getTituloAlbum(),
                ua.getAlbum().getPortadaUrl(),
                ua.getAlbum().getArtista() != null ? ua.getAlbum().getArtista().getNombreArtista() : null,
                ua.getAlbum().getAnioSalida(),
                ua.getPuntuacion(),
                ua.getTextoResena() != null,
                ua.getFechaAgregada(),
                ua.getFechaResena()
        );
    }
}
