package com.discsandrecords.api.services;

import java.util.List;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.discsandrecords.api.dto.CreateGeneroDTO;
import com.discsandrecords.api.dto.GeneroResponseDTO;
import com.discsandrecords.api.entities.Genero;
import com.discsandrecords.api.exceptions.DuplicateResourceException;
import com.discsandrecords.api.exceptions.ResourceNotFoundException;
import com.discsandrecords.api.repositories.GeneroRepository;

@Service
@Transactional
public class GeneroService {

    private final GeneroRepository generoRepository;

    public GeneroService(GeneroRepository generoRepository) {
        this.generoRepository = generoRepository;
    }

    @Transactional(readOnly = true)
    public List<GeneroResponseDTO> listarTodos() {
        return generoRepository.findAll().stream()
                .map(this::toResponseDTO)
                .toList();
    }

    @Transactional(readOnly = true)
    public GeneroResponseDTO obtenerPorId(Long id) {
        Genero genero = generoRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Género", "id", id));
        return toResponseDTO(genero);
    }

    @Transactional(readOnly = true)
    public List<GeneroResponseDTO> buscarPorNombre(String nombre) {
        return generoRepository.findByNombreGeneroContainingIgnoreCase(nombre)
                .stream()
                .map(this::toResponseDTO)
                .toList();
    }

    public GeneroResponseDTO crear(CreateGeneroDTO dto) {
        // Verificar si ya existe un género con el mismo nombre
        if (generoRepository.existsByNombreGeneroIgnoreCase(dto.nombreGenero())) {
            throw new DuplicateResourceException("Género", "nombreGenero", dto.nombreGenero());
        }

        Genero genero = Genero.builder()
                .nombreGenero(dto.nombreGenero())
                .descripcion(dto.descripcion())
                .color(dto.color())
                .build();

        Genero guardado = generoRepository.save(genero);
        return toResponseDTO(guardado);
    }

    public GeneroResponseDTO actualizar(Long id, CreateGeneroDTO dto) {
        Genero genero = generoRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Género", "id", id));

        // Verificar que el nuevo nombre no esté en uso por otro género
        generoRepository.findByNombreGeneroIgnoreCase(dto.nombreGenero())
                .ifPresent(existente -> {
                    if (!existente.getId().equals(id)) {
                        throw new DuplicateResourceException("Género", "nombreGenero", dto.nombreGenero());
                    }
                });

        genero.setNombreGenero(dto.nombreGenero());
        genero.setDescripcion(dto.descripcion());
        genero.setColor(dto.color());

        Genero actualizado = generoRepository.save(genero);
        return toResponseDTO(actualizado);
    }

    public void eliminar(Long id) {
        Genero genero = generoRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Género", "id", id));

        // TODO: Verificar si hay álbumes o canciones asociadas cuando se implementen esas relaciones
        generoRepository.delete(genero);
    }

    private GeneroResponseDTO toResponseDTO(Genero genero) {
        return new GeneroResponseDTO(
                genero.getId(),
                genero.getNombreGenero(),
                genero.getDescripcion(),
                genero.getColor()
        );
    }
}
