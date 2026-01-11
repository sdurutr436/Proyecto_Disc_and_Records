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

import com.discsandrecords.api.dto.CancionResponseDTO;
import com.discsandrecords.api.dto.CreateCancionDTO;
import com.discsandrecords.api.dto.PageResponseDTO;
import com.discsandrecords.api.services.CancionService;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;

/**
 * CancionController - Controlador de Gestión de Canciones
 *
 * POLÍTICAS DE ACCESO:
 * - GET (lectura): Público - cualquiera puede ver canciones
 * - POST (crear): Solo ADMIN o MODERATOR
 * - PUT (actualizar): Solo ADMIN o MODERATOR
 * - DELETE: Solo ADMIN
 *
 * @see CancionService
 */
@RestController
@RequestMapping("/api/canciones")
@Tag(name = "Canciones", description = "API para gestión de canciones")
public class CancionController {

    private final CancionService cancionService;

    public CancionController(CancionService cancionService) {
        this.cancionService = cancionService;
    }

    // ==========================================
    // ENDPOINTS PÚBLICOS (LECTURA)
    // ==========================================

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
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Canción encontrada"),
            @ApiResponse(responseCode = "404", description = "Canción no encontrada")
    })
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

    // ==========================================
    // ENDPOINTS PROTEGIDOS
    // ==========================================

    @PostMapping
    @Operation(summary = "Crear una nueva canción (Admin/Moderator)")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "201", description = "Canción creada exitosamente"),
            @ApiResponse(responseCode = "400", description = "Datos de validación inválidos"),
            @ApiResponse(responseCode = "401", description = "No autenticado"),
            @ApiResponse(responseCode = "403", description = "Sin permisos suficientes")
    })
    @PreAuthorize("hasAnyRole('ADMIN', 'MODERATOR')")
    public ResponseEntity<CancionResponseDTO> crear(@RequestBody @Valid CreateCancionDTO dto) {
        CancionResponseDTO creada = cancionService.crear(dto);
        return ResponseEntity
                .created(URI.create("/api/canciones/" + creada.id()))
                .body(creada);
    }

    @PutMapping("/{id}")
    @Operation(summary = "Actualizar una canción existente (Admin/Moderator)")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Canción actualizada"),
            @ApiResponse(responseCode = "400", description = "Datos de validación inválidos"),
            @ApiResponse(responseCode = "401", description = "No autenticado"),
            @ApiResponse(responseCode = "403", description = "Sin permisos suficientes"),
            @ApiResponse(responseCode = "404", description = "Canción no encontrada")
    })
    @PreAuthorize("hasAnyRole('ADMIN', 'MODERATOR')")
    public ResponseEntity<CancionResponseDTO> actualizar(
            @PathVariable Long id,
            @RequestBody @Valid CreateCancionDTO dto) {
        return ResponseEntity.ok(cancionService.actualizar(id, dto));
    }

    @DeleteMapping("/{id}")
    @Operation(summary = "Eliminar una canción (Admin)")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "204", description = "Canción eliminada"),
            @ApiResponse(responseCode = "401", description = "No autenticado"),
            @ApiResponse(responseCode = "403", description = "Sin permisos suficientes"),
            @ApiResponse(responseCode = "404", description = "Canción no encontrada")
    })
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<Void> eliminar(@PathVariable Long id) {
        cancionService.eliminar(id);
        return ResponseEntity.noContent().build();
    }
}
