package com.discsandrecords.api.controllers;

import com.discsandrecords.api.dto.*;
import com.discsandrecords.api.services.GeneroService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.net.URI;
import java.util.List;

/**
 * GeneroController - Controlador de Gestión de Géneros Musicales
 *
 * POLÍTICAS DE ACCESO:
 * - GET (lectura): Público - cualquiera puede ver géneros
 * - POST (crear): Solo ADMIN o MODERATOR
 * - PUT (actualizar): Solo ADMIN o MODERATOR
 * - DELETE: Solo ADMIN
 *
 * @see GeneroService
 */
@RestController
@RequestMapping("/api/generos")
@Tag(name = "Géneros", description = "API para gestión de géneros musicales")
public class GeneroController {

    private final GeneroService generoService;

    public GeneroController(GeneroService generoService) {
        this.generoService = generoService;
    }

    // ==========================================
    // ENDPOINTS PÚBLICOS (LECTURA)
    // ==========================================

    @GetMapping
    @Operation(summary = "Listar todos los géneros")
    public ResponseEntity<List<GeneroResponseDTO>> listarTodos() {
        return ResponseEntity.ok(generoService.listarTodos());
    }

    @GetMapping("/paginado")
    @Operation(summary = "Listar géneros con paginación")
    public ResponseEntity<PageResponseDTO<GeneroResponseDTO>> listarPaginado(
            @Parameter(description = "Número de página (0-indexed)") @RequestParam(defaultValue = "0") int page,
            @Parameter(description = "Tamaño de página") @RequestParam(defaultValue = "10") int size,
            @Parameter(description = "Campo por el que ordenar") @RequestParam(defaultValue = "id") String sortBy,
            @Parameter(description = "Dirección del orden (asc/desc)") @RequestParam(defaultValue = "asc") String sortDir) {
        Sort sort = sortDir.equalsIgnoreCase("desc") ? Sort.by(sortBy).descending() : Sort.by(sortBy).ascending();
        Pageable pageable = PageRequest.of(page, size, sort);
        return ResponseEntity.ok(generoService.listarTodosPaginado(pageable));
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

    // ==========================================
    // ENDPOINTS PROTEGIDOS
    // ==========================================

    @PostMapping
    @Operation(summary = "Crear un nuevo género (Admin/Moderator)")
    @PreAuthorize("hasAnyRole('ADMIN', 'MODERATOR')")
    public ResponseEntity<GeneroResponseDTO> crear(@RequestBody @Valid CreateGeneroDTO dto) {
        GeneroResponseDTO creado = generoService.crear(dto);
        return ResponseEntity
                .created(URI.create("/api/generos/" + creado.id()))
                .body(creado);
    }

    @PutMapping("/{id}")
    @Operation(summary = "Actualizar un género existente (Admin/Moderator)")
    @PreAuthorize("hasAnyRole('ADMIN', 'MODERATOR')")
    public ResponseEntity<GeneroResponseDTO> actualizar(
            @PathVariable Long id,
            @RequestBody @Valid CreateGeneroDTO dto) {
        return ResponseEntity.ok(generoService.actualizar(id, dto));
    }

    @DeleteMapping("/{id}")
    @Operation(summary = "Eliminar un género (Admin)")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<Void> eliminar(@PathVariable Long id) {
        generoService.eliminar(id);
        return ResponseEntity.noContent().build();
    }
}
