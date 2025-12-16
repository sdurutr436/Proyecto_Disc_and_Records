package com.discsandrecords.api.services;

import java.math.BigDecimal;
import java.math.RoundingMode;
import java.util.List;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.discsandrecords.api.dto.ArtistaResponseDTO;
import com.discsandrecords.api.dto.CancionResponseDTO;
import com.discsandrecords.api.dto.CreateCancionDTO;
import com.discsandrecords.api.dto.PageResponseDTO;
import com.discsandrecords.api.entities.Artista;
import com.discsandrecords.api.entities.Cancion;
import com.discsandrecords.api.exceptions.BusinessRuleException;
import com.discsandrecords.api.exceptions.ResourceNotFoundException;
import com.discsandrecords.api.repositories.ArtistaRepository;
import com.discsandrecords.api.repositories.CancionRepository;
import com.discsandrecords.api.repositories.UsuarioCancionRepository;

@Service
@Transactional
public class CancionService {

    private final CancionRepository cancionRepository;
    private final ArtistaRepository artistaRepository;
    private final UsuarioCancionRepository usuarioCancionRepository;

    public CancionService(CancionRepository cancionRepository, 
                          ArtistaRepository artistaRepository,
                          UsuarioCancionRepository usuarioCancionRepository) {
        this.cancionRepository = cancionRepository;
        this.artistaRepository = artistaRepository;
        this.usuarioCancionRepository = usuarioCancionRepository;
    }

    @Transactional(readOnly = true)
    public List<CancionResponseDTO> listarTodas() {
        return cancionRepository.findAll().stream()
                .map(this::toResponseDTO)
                .toList();
    }

    @Transactional(readOnly = true)
    public PageResponseDTO<CancionResponseDTO> listarTodasPaginado(Pageable pageable) {
        Page<CancionResponseDTO> page = cancionRepository.findAll(pageable)
                .map(this::toResponseDTO);
        return PageResponseDTO.from(page);
    }

    @Transactional(readOnly = true)
    public CancionResponseDTO obtenerPorId(Long id) {
        Cancion cancion = cancionRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Canción", "id", id));
        return toResponseDTO(cancion);
    }

    @Transactional(readOnly = true)
    public List<CancionResponseDTO> buscarPorTitulo(String titulo) {
        return cancionRepository.findByTituloCancionContainingIgnoreCase(titulo)
                .stream()
                .map(this::toResponseDTO)
                .toList();
    }

    @Transactional(readOnly = true)
    public List<CancionResponseDTO> listarPorArtista(Long idArtista) {
        // Verificar que el artista existe
        if (!artistaRepository.existsById(idArtista)) {
            throw new ResourceNotFoundException("Artista", "id", idArtista);
        }
        
        return cancionRepository.findByArtistaId(idArtista)
                .stream()
                .map(this::toResponseDTO)
                .toList();
    }

    public CancionResponseDTO crear(CreateCancionDTO dto) {
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

        Cancion cancion = Cancion.builder()
                .tituloCancion(dto.tituloCancion())
                .anioSalida(dto.anioSalida())
                .artista(artista)
                .build();

        Cancion guardada = cancionRepository.save(cancion);
        return toResponseDTO(guardada);
    }

    public CancionResponseDTO actualizar(Long id, CreateCancionDTO dto) {
        Cancion cancion = cancionRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Canción", "id", id));

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

        cancion.setTituloCancion(dto.tituloCancion());
        cancion.setAnioSalida(dto.anioSalida());
        cancion.setArtista(artista);

        Cancion actualizada = cancionRepository.save(cancion);
        return toResponseDTO(actualizada);
    }

    public void eliminar(Long id) {
        Cancion cancion = cancionRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Canción", "id", id));

        // REGLA DE NEGOCIO: No permitir eliminar canciones con reseñas
        long resenasCount = usuarioCancionRepository.countByCancionId(id);
        if (resenasCount > 0) {
            throw new BusinessRuleException(
                    String.format("No se puede eliminar la canción '%s' porque tiene %d reseñas asociadas.",
                            cancion.getTituloCancion(), resenasCount),
                    "CANCION_CON_RESENAS"
            );
        }

        cancionRepository.delete(cancion);
    }

    /**
     * Recalcula la puntuación media de una canción basándose en las reseñas.
     */
    public void recalcularPuntuacionMedia(Long cancionId) {
        Cancion cancion = cancionRepository.findById(cancionId)
                .orElseThrow(() -> new ResourceNotFoundException("Canción", "id", cancionId));

        Double promedio = usuarioCancionRepository.calcularPuntuacionMedia(cancionId);
        
        if (promedio != null) {
            cancion.setPuntuacionMedia(BigDecimal.valueOf(promedio).setScale(2, RoundingMode.HALF_UP));
        } else {
            cancion.setPuntuacionMedia(null);
        }
        
        cancionRepository.save(cancion);
    }

    private CancionResponseDTO toResponseDTO(Cancion cancion) {
        ArtistaResponseDTO artistaDTO = new ArtistaResponseDTO(
                cancion.getArtista().getId(),
                cancion.getArtista().getNombreArtista(),
                cancion.getArtista().getPuntuacionMedia()
        );

        return new CancionResponseDTO(
                cancion.getId(),
                cancion.getTituloCancion(),
                cancion.getAnioSalida(),
                cancion.getPuntuacionMedia(),
                artistaDTO
        );
    }
}
