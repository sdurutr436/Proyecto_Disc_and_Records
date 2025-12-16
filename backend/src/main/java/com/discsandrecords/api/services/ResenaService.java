package com.discsandrecords.api.services;

import com.discsandrecords.api.dto.*;
import com.discsandrecords.api.entities.*;
import com.discsandrecords.api.exceptions.BusinessRuleException;
import com.discsandrecords.api.exceptions.DuplicateResourceException;
import com.discsandrecords.api.exceptions.ResourceNotFoundException;
import com.discsandrecords.api.repositories.*;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.Instant;
import java.util.List;

@Service
@Transactional
public class ResenaService {

    private static final int PUNTUACION_MINIMA = 1;
    private static final int PUNTUACION_MAXIMA = 5;

    private final UsuarioAlbumRepository usuarioAlbumRepository;
    private final UsuarioCancionRepository usuarioCancionRepository;
    private final UsuarioRepository usuarioRepository;
    private final AlbumRepository albumRepository;
    private final CancionRepository cancionRepository;
    private final AlbumService albumService;
    private final CancionService cancionService;

    public ResenaService(UsuarioAlbumRepository usuarioAlbumRepository,
                         UsuarioCancionRepository usuarioCancionRepository,
                         UsuarioRepository usuarioRepository,
                         AlbumRepository albumRepository,
                         CancionRepository cancionRepository,
                         AlbumService albumService,
                         CancionService cancionService) {
        this.usuarioAlbumRepository = usuarioAlbumRepository;
        this.usuarioCancionRepository = usuarioCancionRepository;
        this.usuarioRepository = usuarioRepository;
        this.albumRepository = albumRepository;
        this.cancionRepository = cancionRepository;
        this.albumService = albumService;
        this.cancionService = cancionService;
    }

    // ==================== RESEÑAS DE ÁLBUMES ====================

    @Transactional(readOnly = true)
    public List<ResenaAlbumResponseDTO> listarResenasAlbum(Long albumId) {
        if (!albumRepository.existsById(albumId)) {
            throw new ResourceNotFoundException("Álbum", "id", albumId);
        }

        return usuarioAlbumRepository.findByAlbumId(albumId).stream()
                .filter(ua -> ua.getTextoResena() != null)
                .map(this::toResenaAlbumDTO)
                .toList();
    }

    @Transactional(readOnly = true)
    public List<ResenaAlbumResponseDTO> listarResenasUsuario(Long usuarioId) {
        if (!usuarioRepository.existsById(usuarioId)) {
            throw new ResourceNotFoundException("Usuario", "id", usuarioId);
        }

        return usuarioAlbumRepository.findResenasAlbumesByUsuarioId(usuarioId).stream()
                .map(this::toResenaAlbumDTO)
                .toList();
    }

    @Transactional(readOnly = true)
    public ResenaAlbumResponseDTO obtenerResenaAlbum(Long usuarioId, Long albumId) {
        UsuarioAlbumId id = new UsuarioAlbumId(usuarioId, albumId);
        UsuarioAlbum resena = usuarioAlbumRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Reseña de álbum no encontrada"));
        return toResenaAlbumDTO(resena);
    }

    public ResenaAlbumResponseDTO crearResenaAlbum(CreateResenaAlbumDTO dto) {
        Usuario usuario = usuarioRepository.findById(dto.usuarioId())
                .orElseThrow(() -> new ResourceNotFoundException("Usuario", "id", dto.usuarioId()));

        Album album = albumRepository.findById(dto.albumId())
                .orElseThrow(() -> new ResourceNotFoundException("Álbum", "id", dto.albumId()));

        // REGLA DE NEGOCIO: Un usuario solo puede tener una reseña por álbum
        UsuarioAlbumId id = new UsuarioAlbumId(dto.usuarioId(), dto.albumId());
        if (usuarioAlbumRepository.existsById(id)) {
            throw new DuplicateResourceException("Reseña", "usuario-álbum", 
                    dto.usuarioId() + "-" + dto.albumId());
        }

        // REGLA DE NEGOCIO: Validar rango de puntuación
        validarPuntuacion(dto.puntuacion());

        UsuarioAlbum resena = UsuarioAlbum.builder()
                .usuario(usuario)
                .album(album)
                .escuchado(true)
                .puntuacion(dto.puntuacion())
                .textoResena(dto.textoResena())
                .fechaResena(Instant.now())
                .build();

        UsuarioAlbum guardada = usuarioAlbumRepository.save(resena);

        // Recalcular puntuación media del álbum
        albumService.recalcularPuntuacionMedia(album.getId());

        return toResenaAlbumDTO(guardada);
    }

    public ResenaAlbumResponseDTO actualizarResenaAlbum(Long usuarioId, Long albumId, UpdateResenaDTO dto) {
        UsuarioAlbumId id = new UsuarioAlbumId(usuarioId, albumId);
        UsuarioAlbum resena = usuarioAlbumRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Reseña de álbum no encontrada"));

        // REGLA DE NEGOCIO: Validar rango de puntuación si se proporciona
        if (dto.puntuacion() != null) {
            validarPuntuacion(dto.puntuacion());
            resena.setPuntuacion(dto.puntuacion());
        }

        if (dto.textoResena() != null) {
            resena.setTextoResena(dto.textoResena());
        }

        resena.setFechaResena(Instant.now());

        UsuarioAlbum actualizada = usuarioAlbumRepository.save(resena);

        // Recalcular puntuación media del álbum
        albumService.recalcularPuntuacionMedia(albumId);

        return toResenaAlbumDTO(actualizada);
    }

    public void eliminarResenaAlbum(Long usuarioId, Long albumId) {
        UsuarioAlbumId id = new UsuarioAlbumId(usuarioId, albumId);
        
        if (!usuarioAlbumRepository.existsById(id)) {
            throw new ResourceNotFoundException("Reseña de álbum no encontrada");
        }

        usuarioAlbumRepository.deleteById(id);

        // Recalcular puntuación media del álbum
        albumService.recalcularPuntuacionMedia(albumId);
    }

    // ==================== RESEÑAS DE CANCIONES ====================

    @Transactional(readOnly = true)
    public List<ResenaCancionResponseDTO> listarResenasCancion(Long cancionId) {
        if (!cancionRepository.existsById(cancionId)) {
            throw new ResourceNotFoundException("Canción", "id", cancionId);
        }

        return usuarioCancionRepository.findByCancionId(cancionId).stream()
                .filter(uc -> uc.getTextoResena() != null)
                .map(this::toResenaCancionDTO)
                .toList();
    }

    @Transactional(readOnly = true)
    public List<ResenaCancionResponseDTO> listarResenasCanccionesUsuario(Long usuarioId) {
        if (!usuarioRepository.existsById(usuarioId)) {
            throw new ResourceNotFoundException("Usuario", "id", usuarioId);
        }

        return usuarioCancionRepository.findResenasCancipnesByUsuarioId(usuarioId).stream()
                .map(this::toResenaCancionDTO)
                .toList();
    }

    public ResenaCancionResponseDTO crearResenaCancion(CreateResenaCancionDTO dto) {
        Usuario usuario = usuarioRepository.findById(dto.usuarioId())
                .orElseThrow(() -> new ResourceNotFoundException("Usuario", "id", dto.usuarioId()));

        Cancion cancion = cancionRepository.findById(dto.cancionId())
                .orElseThrow(() -> new ResourceNotFoundException("Canción", "id", dto.cancionId()));

        // REGLA DE NEGOCIO: Un usuario solo puede tener una reseña por canción
        UsuarioCancionId id = new UsuarioCancionId(dto.usuarioId(), dto.cancionId());
        if (usuarioCancionRepository.existsById(id)) {
            throw new DuplicateResourceException("Reseña", "usuario-canción", 
                    dto.usuarioId() + "-" + dto.cancionId());
        }

        // REGLA DE NEGOCIO: Validar rango de puntuación
        validarPuntuacion(dto.puntuacion());

        UsuarioCancion resena = UsuarioCancion.builder()
                .usuario(usuario)
                .cancion(cancion)
                .escuchada(true)
                .puntuacion(dto.puntuacion())
                .textoResena(dto.textoResena())
                .fechaResena(Instant.now())
                .build();

        UsuarioCancion guardada = usuarioCancionRepository.save(resena);

        // Recalcular puntuación media de la canción
        cancionService.recalcularPuntuacionMedia(cancion.getId());

        return toResenaCancionDTO(guardada);
    }

    public ResenaCancionResponseDTO actualizarResenaCancion(Long usuarioId, Long cancionId, UpdateResenaDTO dto) {
        UsuarioCancionId id = new UsuarioCancionId(usuarioId, cancionId);
        UsuarioCancion resena = usuarioCancionRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Reseña de canción no encontrada"));

        if (dto.puntuacion() != null) {
            validarPuntuacion(dto.puntuacion());
            resena.setPuntuacion(dto.puntuacion());
        }

        if (dto.textoResena() != null) {
            resena.setTextoResena(dto.textoResena());
        }

        resena.setFechaResena(Instant.now());

        UsuarioCancion actualizada = usuarioCancionRepository.save(resena);

        // Recalcular puntuación media de la canción
        cancionService.recalcularPuntuacionMedia(cancionId);

        return toResenaCancionDTO(actualizada);
    }

    public void eliminarResenaCancion(Long usuarioId, Long cancionId) {
        UsuarioCancionId id = new UsuarioCancionId(usuarioId, cancionId);
        
        if (!usuarioCancionRepository.existsById(id)) {
            throw new ResourceNotFoundException("Reseña de canción no encontrada");
        }

        usuarioCancionRepository.deleteById(id);

        // Recalcular puntuación media de la canción
        cancionService.recalcularPuntuacionMedia(cancionId);
    }

    // ==================== MÉTODOS AUXILIARES ====================

    private void validarPuntuacion(Integer puntuacion) {
        if (puntuacion != null && (puntuacion < PUNTUACION_MINIMA || puntuacion > PUNTUACION_MAXIMA)) {
            throw new BusinessRuleException(
                    String.format("La puntuación debe estar entre %d y %d", PUNTUACION_MINIMA, PUNTUACION_MAXIMA),
                    "PUNTUACION_INVALIDA"
            );
        }
    }

    private ResenaAlbumResponseDTO toResenaAlbumDTO(UsuarioAlbum ua) {
        return new ResenaAlbumResponseDTO(
                ua.getUsuario().getId(),
                ua.getUsuario().getNombreUsuario(),
                ua.getUsuario().getAvatar(),
                ua.getAlbum().getId(),
                ua.getAlbum().getTituloAlbum(),
                ua.getAlbum().getPortadaUrl(),
                ua.getPuntuacion(),
                ua.getTextoResena(),
                ua.getFechaResena(),
                ua.getEscuchado()
        );
    }

    private ResenaCancionResponseDTO toResenaCancionDTO(UsuarioCancion uc) {
        return new ResenaCancionResponseDTO(
                uc.getUsuario().getId(),
                uc.getUsuario().getNombreUsuario(),
                uc.getUsuario().getAvatar(),
                uc.getCancion().getId(),
                uc.getCancion().getTituloCancion(),
                uc.getPuntuacion(),
                uc.getTextoResena(),
                uc.getFechaResena(),
                uc.getEscuchada()
        );
    }
}
