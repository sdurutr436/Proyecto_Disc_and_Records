package com.discsandrecords.api.controllers;

import com.discsandrecords.api.dto.*;
import com.discsandrecords.api.services.AlbumService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.net.URI;
import java.util.List;

@RestController
@RequestMapping("/api/albumes")
@Tag(name = "Álbumes", description = "API para gestión de álbumes")
public class AlbumController {

    private final AlbumService albumService;

    public AlbumController(AlbumService albumService) {
        this.albumService = albumService;
    }

    @GetMapping
    @Operation(summary = "Listar todos los álbumes")
    public ResponseEntity<List<AlbumResponseDTO>> listarTodos() {
        return ResponseEntity.ok(albumService.listarTodos());
    }

    @GetMapping("/{id}")
    @Operation(summary = "Obtener álbum por ID")
    public ResponseEntity<AlbumResponseDTO> obtenerPorId(@PathVariable Long id) {
        return ResponseEntity.ok(albumService.obtenerPorId(id));
    }

    @GetMapping("/buscar")
    @Operation(summary = "Buscar álbumes por título")
    public ResponseEntity<List<AlbumResponseDTO>> buscarPorTitulo(@RequestParam String titulo) {
        return ResponseEntity.ok(albumService.buscarPorTitulo(titulo));
    }

    @GetMapping("/artista/{idArtista}")
    @Operation(summary = "Listar álbumes de un artista")
    public ResponseEntity<List<AlbumResponseDTO>> listarPorArtista(@PathVariable Long idArtista) {
        return ResponseEntity.ok(albumService.listarPorArtista(idArtista));
    }

    @PostMapping
    @Operation(summary = "Crear un nuevo álbum")
    public ResponseEntity<AlbumResponseDTO> crear(@RequestBody @Valid CreateAlbumDTO dto) {
        AlbumResponseDTO creado = albumService.crear(dto);
        return ResponseEntity
                .created(URI.create("/api/albumes/" + creado.id()))
                .body(creado);
    }

    @PutMapping("/{id}")
    @Operation(summary = "Actualizar un álbum existente")
    public ResponseEntity<AlbumResponseDTO> actualizar(
            @PathVariable Long id,
            @RequestBody @Valid CreateAlbumDTO dto) {
        return ResponseEntity.ok(albumService.actualizar(id, dto));
    }

    @DeleteMapping("/{id}")
    @Operation(summary = "Eliminar un álbum")
    public ResponseEntity<Void> eliminar(@PathVariable Long id) {
        albumService.eliminar(id);
        return ResponseEntity.noContent().build();
    }
}
