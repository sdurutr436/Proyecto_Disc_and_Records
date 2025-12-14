package com.discsandrecords.api.controllers;

import com.discsandrecords.api.dto.*;
import com.discsandrecords.api.entities.Cancion;
import com.discsandrecords.api.entities.Artista;
import com.discsandrecords.api.repositories.CancionRepository;
import com.discsandrecords.api.repositories.ArtistaRepository;
import jakarta.validation.Valid;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.net.URI;
import java.util.List;

@RestController
@RequestMapping("/api/canciones")
public class CancionController {

    private final CancionRepository cancionRepository;
    private final ArtistaRepository artistaRepository;

    public CancionController(CancionRepository cancionRepository, ArtistaRepository artistaRepository) {
        this.cancionRepository = cancionRepository;
        this.artistaRepository = artistaRepository;
    }

    @GetMapping
    public ResponseEntity<List<CancionResponseDTO>> listarTodas() {
        List<CancionResponseDTO> canciones = cancionRepository.findAll().stream()
                .map(this::toResponseDTO)
                .toList();
        return ResponseEntity.ok(canciones);
    }

    @GetMapping("/{id}")
    public ResponseEntity<CancionResponseDTO> obtenerPorId(@PathVariable Long id) {
        return cancionRepository.findById(id)
                .map(this::toResponseDTO)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @GetMapping("/buscar")
    public ResponseEntity<List<CancionResponseDTO>> buscarPorTitulo(@RequestParam String titulo) {
        List<CancionResponseDTO> canciones = cancionRepository.findByTituloCancionContainingIgnoreCase(titulo)
                .stream()
                .map(this::toResponseDTO)
                .toList();
        return ResponseEntity.ok(canciones);
    }

    @GetMapping("/artista/{idArtista}")
    public ResponseEntity<List<CancionResponseDTO>> listarPorArtista(@PathVariable Long idArtista) {
        List<CancionResponseDTO> canciones = cancionRepository.findByArtistaId(idArtista)
                .stream()
                .map(this::toResponseDTO)
                .toList();
        return ResponseEntity.ok(canciones);
    }

    @PostMapping
    public ResponseEntity<CancionResponseDTO> crear(@RequestBody @Valid CreateCancionDTO dto) {
        Artista artista = artistaRepository.findById(dto.idArtista())
                .orElseThrow(() -> new IllegalArgumentException("Artista no encontrado"));

        Cancion cancion = Cancion.builder()
                .tituloCancion(dto.tituloCancion())
                .anioSalida(dto.anioSalida())
                .artista(artista)
                .build();

        Cancion guardada = cancionRepository.save(cancion);

        return ResponseEntity
                .created(URI.create("/api/canciones/" + guardada.getId()))
                .body(toResponseDTO(guardada));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> eliminar(@PathVariable Long id) {
        if (!cancionRepository.existsById(id)) {
            return ResponseEntity.notFound().build();
        }

        cancionRepository.deleteById(id);
        return ResponseEntity.noContent().build();
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
