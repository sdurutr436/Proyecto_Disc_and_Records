package com.discsandrecords.api.controllers;

import java.net.URI;
import java.util.List;

import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.discsandrecords.api.dto.CreateGeneroDTO;
import com.discsandrecords.api.dto.GeneroResponseDTO;
import com.discsandrecords.api.dto.PageResponseDTO;
import com.discsandrecords.api.services.GeneroService;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;

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
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Género encontrado"),
            @ApiResponse(responseCode = "404", description = "Género no encontrado")
    })
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
    @ApiResponses(value = {
            @ApiResponse(responseCode = "201", description = "Género creado exitosamente"),
            @ApiResponse(responseCode = "400", description = "Datos de validación inválidos"),
            @ApiResponse(responseCode = "401", description = "No autenticado"),
            @ApiResponse(responseCode = "403", description = "Sin permisos suficientes"),
            @ApiResponse(responseCode = "409", description = "Género ya existe")
    })
    @PreAuthorize("hasAnyRole('ADMIN', 'MODERATOR')")
    public ResponseEntity<GeneroResponseDTO> crear(@RequestBody @Valid CreateGeneroDTO dto) {
        GeneroResponseDTO creado = generoService.crear(dto);
        return ResponseEntity
                .created(URI.create("/api/generos/" + creado.id()))
                .body(creado);
    }

    @PutMapping("/{id}")
    @Operation(summary = "Actualizar un género existente (Admin/Moderator)")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Género actualizado"),
            @ApiResponse(responseCode = "400", description = "Datos de validación inválidos"),
            @ApiResponse(responseCode = "401", description = "No autenticado"),
            @ApiResponse(responseCode = "403", description = "Sin permisos suficientes"),
            @ApiResponse(responseCode = "404", description = "Género no encontrado")
    })
    @PreAuthorize("hasAnyRole('ADMIN', 'MODERATOR')")
    public ResponseEntity<GeneroResponseDTO> actualizar(
            @PathVariable Long id,
            @RequestBody @Valid CreateGeneroDTO dto) {
        return ResponseEntity.ok(generoService.actualizar(id, dto));
    }

    @DeleteMapping("/{id}")
    @Operation(summary = "Eliminar un género (Admin)")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "204", description = "Género eliminado"),
            @ApiResponse(responseCode = "401", description = "No autenticado"),
            @ApiResponse(responseCode = "403", description = "Sin permisos suficientes"),
            @ApiResponse(responseCode = "404", description = "Género no encontrado")
    })
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<Void> eliminar(@PathVariable Long id) {
        generoService.eliminar(id);
        return ResponseEntity.noContent().build();
    }
}
