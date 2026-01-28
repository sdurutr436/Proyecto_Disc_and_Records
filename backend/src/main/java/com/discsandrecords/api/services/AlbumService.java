package com.discsandrecords.api.services;

import java.math.BigDecimal;
import java.math.RoundingMode;
import java.util.List;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.discsandrecords.api.dto.AlbumResponseDTO;
import com.discsandrecords.api.dto.AlbumStatsDTO;
import com.discsandrecords.api.dto.ArtistaResponseDTO;
import com.discsandrecords.api.dto.CreateAlbumDTO;
import com.discsandrecords.api.dto.PageResponseDTO;
import com.discsandrecords.api.entities.Album;
import com.discsandrecords.api.entities.Artista;
import com.discsandrecords.api.exceptions.BusinessRuleException;
import com.discsandrecords.api.exceptions.ResourceNotFoundException;
import com.discsandrecords.api.repositories.AlbumRepository;
import com.discsandrecords.api.repositories.ArtistaRepository;
import com.discsandrecords.api.repositories.UsuarioAlbumRepository;

@Service
@Transactional
public class AlbumService {

    private final AlbumRepository albumRepository;
    private final ArtistaRepository artistaRepository;
    private final UsuarioAlbumRepository usuarioAlbumRepository;

    public AlbumService(AlbumRepository albumRepository, 
                        ArtistaRepository artistaRepository,
                        UsuarioAlbumRepository usuarioAlbumRepository) {
        this.albumRepository = albumRepository;
        this.artistaRepository = artistaRepository;
        this.usuarioAlbumRepository = usuarioAlbumRepository;
    }

    @Transactional(readOnly = true)
    public List<AlbumResponseDTO> listarTodos() {
        return albumRepository.findAll().stream()
                .map(this::toResponseDTO)
                .toList();
    }

    @Transactional(readOnly = true)
    public PageResponseDTO<AlbumResponseDTO> listarTodosPaginado(Pageable pageable) {
        Page<AlbumResponseDTO> page = albumRepository.findAll(pageable)
                .map(this::toResponseDTO);
        return PageResponseDTO.from(page);
    }

    @Transactional(readOnly = true)
    public AlbumResponseDTO obtenerPorId(Long id) {
        Album album = albumRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Álbum", "id", id));
        return toResponseDTO(album);
    }

    @Transactional(readOnly = true)
    public List<AlbumResponseDTO> buscarPorTitulo(String titulo) {
        return albumRepository.findByTituloAlbumContainingIgnoreCase(titulo)
                .stream()
                .map(this::toResponseDTO)
                .toList();
    }

    @Transactional(readOnly = true)
    public List<AlbumResponseDTO> listarPorArtista(Long idArtista) {
        // Verificar que el artista existe
        if (!artistaRepository.existsById(idArtista)) {
            throw new ResourceNotFoundException("Artista", "id", idArtista);
        }
        
        return albumRepository.findByArtistaId(idArtista)
                .stream()
                .map(this::toResponseDTO)
                .toList();
    }

    public AlbumResponseDTO crear(CreateAlbumDTO dto) {
        Artista artista = artistaRepository.findById(dto.idArtista())
                .orElseThrow(() -> new ResourceNotFoundException("Artista", "id", dto.idArtista()));

        // REGLA DE NEGOCIO: Validar año de salida (no puede ser futuro más de 1 año)
        int anioActual = java.time.Year.now().getValue();
        if (dto.anioSalida() > anioActual + 1) {
            throw new BusinessRuleException(
                    "El año de salida no puede ser más de 1 año en el futuro",
                    "ANIO_INVALIDO"
            );
        }

        Album album = Album.builder()
                .tituloAlbum(dto.tituloAlbum())
                .anioSalida(dto.anioSalida())
                .portadaUrl(dto.portadaUrl())
                .artista(artista)
                .build();

        Album guardado = albumRepository.save(album);
        return toResponseDTO(guardado);
    }

    public AlbumResponseDTO actualizar(Long id, CreateAlbumDTO dto) {
        Album album = albumRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Álbum", "id", id));

        Artista artista = artistaRepository.findById(dto.idArtista())
                .orElseThrow(() -> new ResourceNotFoundException("Artista", "id", dto.idArtista()));

        // REGLA DE NEGOCIO: Validar año de salida
        int anioActual = java.time.Year.now().getValue();
        if (dto.anioSalida() > anioActual + 1) {
            throw new BusinessRuleException(
                    "El año de salida no puede ser más de 1 año en el futuro",
                    "ANIO_INVALIDO"
            );
        }

        album.setTituloAlbum(dto.tituloAlbum());
        album.setAnioSalida(dto.anioSalida());
        album.setPortadaUrl(dto.portadaUrl());
        album.setArtista(artista);

        Album actualizado = albumRepository.save(album);
        return toResponseDTO(actualizado);
    }

    public void eliminar(Long id) {
        Album album = albumRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Álbum", "id", id));

        // REGLA DE NEGOCIO: No permitir eliminar álbumes con reseñas
        long resenasCount = usuarioAlbumRepository.countByAlbumId(id);
        if (resenasCount > 0) {
            throw new BusinessRuleException(
                    String.format("No se puede eliminar el álbum '%s' porque tiene %d reseñas asociadas.",
                            album.getTituloAlbum(), resenasCount),
                    "ALBUM_CON_RESENAS"
            );
        }

        albumRepository.delete(album);
    }

    /**
     * Obtiene las estadísticas de un álbum (reviews, ratings, listeners).
     * Estas métricas vienen del backend propio, NO de Deezer (fans).
     * 
     * @param albumId ID del álbum (puede ser de Deezer)
     * @return Estadísticas del álbum
     */
    @Transactional(readOnly = true)
    public AlbumStatsDTO obtenerEstadisticas(Long albumId) {
        // Obtener estadísticas aunque el álbum no exista en nuestra BD
        // (para álbumes de Deezer que aún no hemos guardado)
        Long reviewCount = usuarioAlbumRepository.contarResenasPorAlbum(albumId);
        Long ratingCount = usuarioAlbumRepository.contarPuntuacionesPorAlbum(albumId);
        Long listenedCount = usuarioAlbumRepository.contarEscuchadosPorAlbum(albumId);
        Double avgRating = usuarioAlbumRepository.calcularPuntuacionMedia(albumId);
        
        BigDecimal averageRating = avgRating != null 
            ? BigDecimal.valueOf(avgRating).setScale(2, RoundingMode.HALF_UP)
            : null;
        
        return new AlbumStatsDTO(
            albumId,
            reviewCount != null ? reviewCount : 0,
            ratingCount != null ? ratingCount : 0,
            averageRating,
            listenedCount != null ? listenedCount : 0
        );
    }

    /**
     * Recalcula la puntuación media de un álbum basándose en las reseñas.
     * Este método se llama después de crear/actualizar/eliminar una reseña.
     */
    public void recalcularPuntuacionMedia(Long albumId) {
        Album album = albumRepository.findById(albumId)
                .orElseThrow(() -> new ResourceNotFoundException("Álbum", "id", albumId));

        Double promedio = usuarioAlbumRepository.calcularPuntuacionMedia(albumId);
        
        if (promedio != null) {
            album.setPuntuacionMedia(BigDecimal.valueOf(promedio).setScale(2, RoundingMode.HALF_UP));
        } else {
            album.setPuntuacionMedia(null);
        }
        
        albumRepository.save(album);
    }

    /**
     * Mapeo DEFENSIVO: Tolerante a nulos para datos legacy o importaciones incompletas.
     * Maneja casos donde artista, campos de Deezer u otros campos pueden ser null.
     */
    private AlbumResponseDTO toResponseDTO(Album album) {
        // Mapeo null-safe del artista
        ArtistaResponseDTO artistaDTO = null;
        if (album.getArtista() != null) {
            artistaDTO = new ArtistaResponseDTO(
                    album.getArtista().getId(),
                    album.getArtista().getNombreArtista(),
                    album.getArtista().getPuntuacionMedia()
            );
        }

        return new AlbumResponseDTO(
                album.getId(),
                album.getTituloAlbum() != null ? album.getTituloAlbum() : "Sin título",
                album.getAnioSalida(),
                album.getPortadaUrl(),
                album.getPuntuacionMedia(),
                artistaDTO,
                album.getDeezerId(), // Incluir deezerId para cargar metadata adicional
                album.getGenero() // Incluir género
        );
    }
}
