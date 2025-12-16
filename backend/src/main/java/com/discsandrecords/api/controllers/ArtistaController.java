package com.discsandrecords.api.controllers;

import com.discsandrecords.api.dto.*;
import com.discsandrecords.api.services.ArtistaService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.net.URI;
import java.util.List;

@RestController
@RequestMapping("/api/artistas")
@Tag(name = "Artistas", description = "API para gestión de artistas")
public class ArtistaController {

    private final ArtistaService artistaService;

    public ArtistaController(ArtistaService artistaService) {
        this.artistaService = artistaService;
    }

    @GetMapping
    @Operation(summary = "Listar todos los artistas")
    public ResponseEntity<List<ArtistaResponseDTO>> listarTodos() {
        return ResponseEntity.ok(artistaService.listarTodos());
    }

    @GetMapping("/{id}")
    @Operation(summary = "Obtener artista por ID")
    public ResponseEntity<ArtistaResponseDTO> obtenerPorId(@PathVariable Long id) {
        return ResponseEntity.ok(artistaService.obtenerPorId(id));
    }

    @GetMapping("/buscar")
    @Operation(summary = "Buscar artistas por nombre")
    public ResponseEntity<List<ArtistaResponseDTO>> buscarPorNombre(@RequestParam String nombre) {
        return ResponseEntity.ok(artistaService.buscarPorNombre(nombre));
    }

    @PostMapping
    @Operation(summary = "Crear un nuevo artista")
    public ResponseEntity<ArtistaResponseDTO> crear(@RequestBody @Valid CreateArtistaDTO dto) {
        ArtistaResponseDTO creado = artistaService.crear(dto);
        return ResponseEntity
                .created(URI.create("/api/artistas/" + creado.id()))
                .body(creado);
    }

    @PutMapping("/{id}")
    @Operation(summary = "Actualizar un artista existente")
    public ResponseEntity<ArtistaResponseDTO> actualizar(
            @PathVariable Long id,
            @RequestBody @Valid CreateArtistaDTO dto) {
        return ResponseEntity.ok(artistaService.actualizar(id, dto));
    }

    @DeleteMapping("/{id}")
    @Operation(summary = "Eliminar un artista")
    public ResponseEntity<Void> eliminar(@PathVariable Long id) {
        artistaService.eliminar(id);
        return ResponseEntity.noContent().build();
    }
}
