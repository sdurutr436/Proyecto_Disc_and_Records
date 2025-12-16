package com.discsandrecords.api.services;

import java.util.List;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.discsandrecords.api.dto.ArtistaResponseDTO;
import com.discsandrecords.api.dto.CreateArtistaDTO;
import com.discsandrecords.api.entities.Artista;
import com.discsandrecords.api.exceptions.BusinessRuleException;
import com.discsandrecords.api.exceptions.DuplicateResourceException;
import com.discsandrecords.api.exceptions.ResourceNotFoundException;
import com.discsandrecords.api.repositories.AlbumRepository;
import com.discsandrecords.api.repositories.ArtistaRepository;

@Service
@Transactional
public class ArtistaService {

    private final ArtistaRepository artistaRepository;
    private final AlbumRepository albumRepository;

    public ArtistaService(ArtistaRepository artistaRepository, AlbumRepository albumRepository) {
        this.artistaRepository = artistaRepository;
        this.albumRepository = albumRepository;
    }

    @Transactional(readOnly = true)
    public List<ArtistaResponseDTO> listarTodos() {
        return artistaRepository.findAll().stream()
                .map(this::toResponseDTO)
                .toList();
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
                artista.getNombreArtista(),
                artista.getPuntuacionMedia()
        );
    }
}
