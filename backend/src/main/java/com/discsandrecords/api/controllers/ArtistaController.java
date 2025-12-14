package com.discsandrecords.api.controllers;

import com.discsandrecords.api.dto.*;
import com.discsandrecords.api.entities.Artista;
import com.discsandrecords.api.repositories.ArtistaRepository;
import jakarta.validation.Valid;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.net.URI;
import java.util.List;

@RestController
@RequestMapping("/api/artistas")
public class ArtistaController {

    private final ArtistaRepository repository;

    public ArtistaController(ArtistaRepository repository) {
        this.repository = repository;
    }

    @GetMapping
    public ResponseEntity<List<ArtistaResponseDTO>> listarTodos() {
        List<ArtistaResponseDTO> artistas = repository.findAll().stream()
                .map(this::toResponseDTO)
                .toList();
        return ResponseEntity.ok(artistas);
    }

    @GetMapping("/{id}")
    public ResponseEntity<ArtistaResponseDTO> obtenerPorId(@PathVariable Long id) {
        return repository.findById(id)
                .map(this::toResponseDTO)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @GetMapping("/buscar")
    public ResponseEntity<List<ArtistaResponseDTO>> buscarPorNombre(@RequestParam String nombre) {
        List<ArtistaResponseDTO> artistas = repository.findByNombreArtistaContainingIgnoreCase(nombre)
                .stream()
                .map(this::toResponseDTO)
                .toList();
        return ResponseEntity.ok(artistas);
    }

    @PostMapping
    public ResponseEntity<ArtistaResponseDTO> crear(@RequestBody @Valid CreateArtistaDTO dto) {
        Artista artista = Artista.builder()
                .nombreArtista(dto.nombreArtista())
                .build();

        Artista guardado = repository.save(artista);

        return ResponseEntity
                .created(URI.create("/api/artistas/" + guardado.getId()))
                .body(toResponseDTO(guardado));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> eliminar(@PathVariable Long id) {
        if (!repository.existsById(id)) {
            return ResponseEntity.notFound().build();
        }

        repository.deleteById(id);
        return ResponseEntity.noContent().build();
    }

    private ArtistaResponseDTO toResponseDTO(Artista artista) {
        return new ArtistaResponseDTO(
                artista.getId(),
                artista.getNombreArtista(),
                artista.getPuntuacionMedia()
        );
    }
}
