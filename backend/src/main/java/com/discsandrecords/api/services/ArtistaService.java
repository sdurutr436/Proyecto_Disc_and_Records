package com.discsandrecords.api.services;

import java.util.List;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.discsandrecords.api.dto.AlbumResponseDTO;
import com.discsandrecords.api.dto.ArtistaResponseDTO;
import com.discsandrecords.api.dto.CancionResponseDTO;
import com.discsandrecords.api.dto.CreateArtistaDTO;
import com.discsandrecords.api.dto.PageResponseDTO;
import com.discsandrecords.api.entities.Album;
import com.discsandrecords.api.entities.Artista;
import com.discsandrecords.api.entities.Cancion;
import com.discsandrecords.api.exceptions.BusinessRuleException;
import com.discsandrecords.api.exceptions.DuplicateResourceException;
import com.discsandrecords.api.exceptions.ResourceNotFoundException;
import com.discsandrecords.api.repositories.AlbumRepository;
import com.discsandrecords.api.repositories.ArtistaRepository;
import com.discsandrecords.api.repositories.CancionRepository;

@Service
@Transactional
public class ArtistaService {

    private final ArtistaRepository artistaRepository;
    private final AlbumRepository albumRepository;
    private final CancionRepository cancionRepository;

    public ArtistaService(ArtistaRepository artistaRepository, AlbumRepository albumRepository, CancionRepository cancionRepository) {
        this.artistaRepository = artistaRepository;
        this.albumRepository = albumRepository;
        this.cancionRepository = cancionRepository;
    }

    @Transactional(readOnly = true)
    public List<ArtistaResponseDTO> listarTodos() {
        return artistaRepository.findAll().stream()
                .map(this::toResponseDTO)
                .toList();
    }

    @Transactional(readOnly = true)
    public PageResponseDTO<ArtistaResponseDTO> listarTodosPaginado(Pageable pageable) {
        Page<ArtistaResponseDTO> page = artistaRepository.findAll(pageable)
                .map(this::toResponseDTO);
        return PageResponseDTO.from(page);
    }

    @Transactional(readOnly = true)
    public ArtistaResponseDTO obtenerPorId(Long id) {
        Artista artista = artistaRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Artista", "id", id));
        return toResponseDTO(artista);
    }

    @Transactional(readOnly = true)
    public List<ArtistaResponseDTO> buscarPorNombre(String nombre) {
        return artistaRepository.findByNombreArtistaContainingIgnoreCase(nombre)
                .stream()
                .map(this::toResponseDTO)
                .toList();
    }

    @Transactional(readOnly = true)
    public List<AlbumResponseDTO> obtenerAlbumesPorArtista(Long artistaId) {
        Artista artista = artistaRepository.findById(artistaId)
                .orElseThrow(() -> new ResourceNotFoundException("Artista", "id", artistaId));
        return albumRepository.findByArtistaId(artistaId).stream()
                .map(this::albumToResponseDTO)
                .toList();
    }

    @Transactional(readOnly = true)
    public PageResponseDTO<AlbumResponseDTO> obtenerAlbumesPorArtistaPaginado(Long artistaId, Pageable pageable) {
        Artista artista = artistaRepository.findById(artistaId)
                .orElseThrow(() -> new ResourceNotFoundException("Artista", "id", artistaId));
        Page<AlbumResponseDTO> page = albumRepository.findByArtistaId(artistaId, pageable)
                .map(this::albumToResponseDTO);
        return PageResponseDTO.from(page);
    }

    @Transactional(readOnly = true)
    public List<CancionResponseDTO> obtenerCancionesPorArtista(Long artistaId) {
        Artista artista = artistaRepository.findById(artistaId)
                .orElseThrow(() -> new ResourceNotFoundException("Artista", "id", artistaId));
        return cancionRepository.findByArtistaId(artistaId).stream()
                .map(this::cancionToResponseDTO)
                .toList();
    }

    @Transactional(readOnly = true)
    public PageResponseDTO<CancionResponseDTO> obtenerCancionesPorArtistaPaginado(Long artistaId, Pageable pageable) {
        Artista artista = artistaRepository.findById(artistaId)
                .orElseThrow(() -> new ResourceNotFoundException("Artista", "id", artistaId));
        Page<CancionResponseDTO> page = cancionRepository.findByArtistaId(artistaId, pageable)
                .map(this::cancionToResponseDTO);
        return PageResponseDTO.from(page);
    }

    public ArtistaResponseDTO crear(CreateArtistaDTO dto) {
        // Verificar si ya existe un artista con el mismo nombre
        if (artistaRepository.existsByNombreArtistaIgnoreCase(dto.nombreArtista())) {
            throw new DuplicateResourceException("Artista", "nombreArtista", dto.nombreArtista());
        }

        Artista artista = Artista.builder()
                .nombreArtista(dto.nombreArtista())
                .build();

        Artista guardado = artistaRepository.save(artista);
        return toResponseDTO(guardado);
    }

    public ArtistaResponseDTO actualizar(Long id, CreateArtistaDTO dto) {
        Artista artista = artistaRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Artista", "id", id));

        // Verificar que el nuevo nombre no esté en uso por otro artista
        artistaRepository.findByNombreArtistaIgnoreCase(dto.nombreArtista())
                .ifPresent(existente -> {
                    if (!existente.getId().equals(id)) {
                        throw new DuplicateResourceException("Artista", "nombreArtista", dto.nombreArtista());
                    }
                });

        artista.setNombreArtista(dto.nombreArtista());
        Artista actualizado = artistaRepository.save(artista);
        return toResponseDTO(actualizado);
    }

    public void eliminar(Long id) {
        Artista artista = artistaRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Artista", "id", id));

        // REGLA DE NEGOCIO: No permitir eliminar artistas con álbumes asociados
        long albumesCount = albumRepository.countByArtistaId(id);
        if (albumesCount > 0) {
            throw new BusinessRuleException(
                    String.format("No se puede eliminar el artista '%s' porque tiene %d álbumes asociados. Elimine primero los álbumes.",
                            artista.getNombreArtista(), albumesCount),
                    "ARTISTA_CON_ALBUMES"
            );
        }

        artistaRepository.delete(artista);
    }

    private ArtistaResponseDTO toResponseDTO(Artista artista) {
        return new ArtistaResponseDTO(
                artista.getId(),
                artista.getNombreArtista() != null ? artista.getNombreArtista() : "Artista desconocido",
                artista.getPuntuacionMedia()
        );
    }

    /**
     * Mapeo DEFENSIVO: Tolerante a nulos para datos legacy o importaciones incompletas.
     */
    private AlbumResponseDTO albumToResponseDTO(Album album) {
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
                album.getDeezerId(),
                album.getGenero()
        );
    }

    /**
     * Mapeo DEFENSIVO: Tolerante a nulos para datos legacy.
     */
    private CancionResponseDTO cancionToResponseDTO(Cancion cancion) {
        ArtistaResponseDTO artistaDTO = null;
        if (cancion.getArtista() != null) {
            artistaDTO = new ArtistaResponseDTO(
                    cancion.getArtista().getId(),
                    cancion.getArtista().getNombreArtista(),
                    cancion.getArtista().getPuntuacionMedia()
            );
        }
        
        return new CancionResponseDTO(
                cancion.getId(),
                cancion.getTituloCancion() != null ? cancion.getTituloCancion() : "Sin título",
                cancion.getAnioSalida(),
                cancion.getPuntuacionMedia(),
                artistaDTO
        );
    }
}
