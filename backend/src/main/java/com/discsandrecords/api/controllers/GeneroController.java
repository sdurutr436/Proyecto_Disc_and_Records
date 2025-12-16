package com.discsandrecords.api.controllers;

import com.discsandrecords.api.dto.*;
import com.discsandrecords.api.services.GeneroService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.net.URI;
import java.util.List;

@RestController
@RequestMapping("/api/generos")
@Tag(name = "Géneros", description = "API para gestión de géneros musicales")
public class GeneroController {

    private final GeneroService generoService;

    public GeneroController(GeneroService generoService) {
        this.generoService = generoService;
    }

    @GetMapping
    @Operation(summary = "Listar todos los géneros")
    public ResponseEntity<List<GeneroResponseDTO>> listarTodos() {
        return ResponseEntity.ok(generoService.listarTodos());
    }

    @GetMapping("/{id}")
    @Operation(summary = "Obtener género por ID")
    public ResponseEntity<GeneroResponseDTO> obtenerPorId(@PathVariable Long id) {
        return ResponseEntity.ok(generoService.obtenerPorId(id));
    }

    @GetMapping("/buscar")
    @Operation(summary = "Buscar géneros por nombre")
    public ResponseEntity<List<GeneroResponseDTO>> buscarPorNombre(@RequestParam String nombre) {
        return ResponseEntity.ok(generoService.buscarPorNombre(nombre));
    }

    @PostMapping
    @Operation(summary = "Crear un nuevo género")
    public ResponseEntity<GeneroResponseDTO> crear(@RequestBody @Valid CreateGeneroDTO dto) {
        GeneroResponseDTO creado = generoService.crear(dto);
        return ResponseEntity
                .created(URI.create("/api/generos/" + creado.id()))
                .body(creado);
    }

    @PutMapping("/{id}")
    @Operation(summary = "Actualizar un género existente")
    public ResponseEntity<GeneroResponseDTO> actualizar(
            @PathVariable Long id,
            @RequestBody @Valid CreateGeneroDTO dto) {
        return ResponseEntity.ok(generoService.actualizar(id, dto));
    }

    @DeleteMapping("/{id}")
    @Operation(summary = "Eliminar un género")
    public ResponseEntity<Void> eliminar(@PathVariable Long id) {
        generoService.eliminar(id);
        return ResponseEntity.noContent().build();
    }
}
