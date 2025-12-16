package com.discsandrecords.api.controllers;

import com.discsandrecords.api.dto.*;
import com.discsandrecords.api.services.CancionService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.net.URI;
import java.util.List;

@RestController
@RequestMapping("/api/canciones")
@Tag(name = "Canciones", description = "API para gestión de canciones")
public class CancionController {

    private final CancionService cancionService;

    public CancionController(CancionService cancionService) {
        this.cancionService = cancionService;
    }

    @GetMapping
    @Operation(summary = "Listar todas las canciones")
    public ResponseEntity<List<CancionResponseDTO>> listarTodas() {
        return ResponseEntity.ok(cancionService.listarTodas());
    }

    @GetMapping("/paginado")
    @Operation(summary = "Listar canciones con paginación")
    public ResponseEntity<PageResponseDTO<CancionResponseDTO>> listarPaginado(
            @Parameter(description = "Número de página (0-indexed)") @RequestParam(defaultValue = "0") int page,
            @Parameter(description = "Tamaño de página") @RequestParam(defaultValue = "10") int size,
            @Parameter(description = "Campo por el que ordenar") @RequestParam(defaultValue = "id") String sortBy,
            @Parameter(description = "Dirección del orden (asc/desc)") @RequestParam(defaultValue = "asc") String sortDir) {
        Sort sort = sortDir.equalsIgnoreCase("desc") ? Sort.by(sortBy).descending() : Sort.by(sortBy).ascending();
        Pageable pageable = PageRequest.of(page, size, sort);
        return ResponseEntity.ok(cancionService.listarTodasPaginado(pageable));
    }

    @GetMapping("/{id}")
    @Operation(summary = "Obtener canción por ID")
    public ResponseEntity<CancionResponseDTO> obtenerPorId(@PathVariable Long id) {
        return ResponseEntity.ok(cancionService.obtenerPorId(id));
    }

    @GetMapping("/buscar")
    @Operation(summary = "Buscar canciones por título")
    public ResponseEntity<List<CancionResponseDTO>> buscarPorTitulo(@RequestParam String titulo) {
        return ResponseEntity.ok(cancionService.buscarPorTitulo(titulo));
    }

    @GetMapping("/artista/{idArtista}")
    @Operation(summary = "Listar canciones de un artista")
    public ResponseEntity<List<CancionResponseDTO>> listarPorArtista(@PathVariable Long idArtista) {
        return ResponseEntity.ok(cancionService.listarPorArtista(idArtista));
    }

    @PostMapping
    @Operation(summary = "Crear una nueva canción")
    public ResponseEntity<CancionResponseDTO> crear(@RequestBody @Valid CreateCancionDTO dto) {
        CancionResponseDTO creada = cancionService.crear(dto);
        return ResponseEntity
                .created(URI.create("/api/canciones/" + creada.id()))
                .body(creada);
    }

    @PutMapping("/{id}")
    @Operation(summary = "Actualizar una canción existente")
    public ResponseEntity<CancionResponseDTO> actualizar(
            @PathVariable Long id,
            @RequestBody @Valid CreateCancionDTO dto) {
        return ResponseEntity.ok(cancionService.actualizar(id, dto));
    }

    @DeleteMapping("/{id}")
    @Operation(summary = "Eliminar una canción")
    public ResponseEntity<Void> eliminar(@PathVariable Long id) {
        cancionService.eliminar(id);
        return ResponseEntity.noContent().build();
    }
}
