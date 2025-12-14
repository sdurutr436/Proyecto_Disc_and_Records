package com.discsandrecords.api.controllers;

import com.discsandrecords.api.dto.*;
import com.discsandrecords.api.entities.Album;
import com.discsandrecords.api.entities.Artista;
import com.discsandrecords.api.repositories.AlbumRepository;
import com.discsandrecords.api.repositories.ArtistaRepository;
import jakarta.validation.Valid;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.net.URI;
import java.util.List;

@RestController
@RequestMapping("/api/albumes")
public class AlbumController {

    private final AlbumRepository albumRepository;
    private final ArtistaRepository artistaRepository;

    public AlbumController(AlbumRepository albumRepository, ArtistaRepository artistaRepository) {
        this.albumRepository = albumRepository;
        this.artistaRepository = artistaRepository;
    }

    @GetMapping
    public ResponseEntity<List<AlbumResponseDTO>> listarTodos() {
        List<AlbumResponseDTO> albumes = albumRepository.findAll().stream()
                .map(this::toResponseDTO)
                .toList();
        return ResponseEntity.ok(albumes);
    }

    @GetMapping("/{id}")
    public ResponseEntity<AlbumResponseDTO> obtenerPorId(@PathVariable Long id) {
        return albumRepository.findById(id)
                .map(this::toResponseDTO)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @GetMapping("/buscar")
    public ResponseEntity<List<AlbumResponseDTO>> buscarPorTitulo(@RequestParam String titulo) {
        List<AlbumResponseDTO> albumes = albumRepository.findByTituloAlbumContainingIgnoreCase(titulo)
                .stream()
                .map(this::toResponseDTO)
                .toList();
        return ResponseEntity.ok(albumes);
    }

    @GetMapping("/artista/{idArtista}")
    public ResponseEntity<List<AlbumResponseDTO>> listarPorArtista(@PathVariable Long idArtista) {
        List<AlbumResponseDTO> albumes = albumRepository.findByArtistaId(idArtista)
                .stream()
                .map(this::toResponseDTO)
                .toList();
        return ResponseEntity.ok(albumes);
    }

    @PostMapping
    public ResponseEntity<AlbumResponseDTO> crear(@RequestBody @Valid CreateAlbumDTO dto) {
        Artista artista = artistaRepository.findById(dto.idArtista())
                .orElseThrow(() -> new IllegalArgumentException("Artista no encontrado"));

        Album album = Album.builder()
                .tituloAlbum(dto.tituloAlbum())
                .anioSalida(dto.anioSalida())
                .portadaUrl(dto.portadaUrl())
                .artista(artista)
                .build();

        Album guardado = albumRepository.save(album);

        return ResponseEntity
                .created(URI.create("/api/albumes/" + guardado.getId()))
                .body(toResponseDTO(guardado));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> eliminar(@PathVariable Long id) {
        if (!albumRepository.existsById(id)) {
            return ResponseEntity.notFound().build();
        }

        albumRepository.deleteById(id);
        return ResponseEntity.noContent().build();
    }

    private AlbumResponseDTO toResponseDTO(Album album) {
        ArtistaResponseDTO artistaDTO = new ArtistaResponseDTO(
                album.getArtista().getId(),
                album.getArtista().getNombreArtista(),
                album.getArtista().getPuntuacionMedia()
        );

        return new AlbumResponseDTO(
                album.getId(),
                album.getTituloAlbum(),
                album.getAnioSalida(),
                album.getPortadaUrl(),
                album.getPuntuacionMedia(),
                artistaDTO
        );
    }
}
