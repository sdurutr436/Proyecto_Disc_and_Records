package com.discsandrecords.api.controllers;

import com.discsandrecords.api.dto.*;
import com.discsandrecords.api.services.ArtistaService;
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
 * ArtistaController - Controlador de Gestión de Artistas
 *
 * POLÍTICAS DE ACCESO:
 * - GET (lectura): Público - cualquiera puede ver artistas
 * - POST (crear): Solo ADMIN o MODERATOR
 * - PUT (actualizar): Solo ADMIN o MODERATOR
 * - DELETE: Solo ADMIN
 *
 * @see ArtistaService
 */
@RestController
@RequestMapping("/api/artistas")
@Tag(name = "Artistas", description = "API para gestión de artistas")
public class ArtistaController {

    private final ArtistaService artistaService;

    public ArtistaController(ArtistaService artistaService) {
        this.artistaService = artistaService;
    }

    // ==========================================
    // ENDPOINTS PÚBLICOS (LECTURA)
    // ==========================================

    @GetMapping
    @Operation(summary = "Listar todos los artistas")
    public ResponseEntity<List<ArtistaResponseDTO>> listarTodos() {
        return ResponseEntity.ok(artistaService.listarTodos());
    }

    @GetMapping("/paginado")
    @Operation(summary = "Listar artistas con paginación")
    public ResponseEntity<PageResponseDTO<ArtistaResponseDTO>> listarPaginado(
            @Parameter(description = "Número de página (0-indexed)") @RequestParam(defaultValue = "0") int page,
            @Parameter(description = "Tamaño de página") @RequestParam(defaultValue = "10") int size,
            @Parameter(description = "Campo por el que ordenar") @RequestParam(defaultValue = "id") String sortBy,
            @Parameter(description = "Dirección del orden (asc/desc)") @RequestParam(defaultValue = "asc") String sortDir) {
        Sort sort = sortDir.equalsIgnoreCase("desc") ? Sort.by(sortBy).descending() : Sort.by(sortBy).ascending();
        Pageable pageable = PageRequest.of(page, size, sort);
        return ResponseEntity.ok(artistaService.listarTodosPaginado(pageable));
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

    // ==========================================
    // ENDPOINTS PROTEGIDOS
    // ==========================================

    @PostMapping
    @Operation(summary = "Crear un nuevo artista (Admin/Moderator)")
    @PreAuthorize("hasAnyRole('ADMIN', 'MODERATOR')")
    public ResponseEntity<ArtistaResponseDTO> crear(@RequestBody @Valid CreateArtistaDTO dto) {
        ArtistaResponseDTO creado = artistaService.crear(dto);
        return ResponseEntity
                .created(URI.create("/api/artistas/" + creado.id()))
                .body(creado);
    }

    @PutMapping("/{id}")
    @Operation(summary = "Actualizar un artista existente (Admin/Moderator)")
    @PreAuthorize("hasAnyRole('ADMIN', 'MODERATOR')")
    public ResponseEntity<ArtistaResponseDTO> actualizar(
            @PathVariable Long id,
            @RequestBody @Valid CreateArtistaDTO dto) {
        return ResponseEntity.ok(artistaService.actualizar(id, dto));
    }

    @DeleteMapping("/{id}")
    @Operation(summary = "Eliminar un artista (Admin)")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<Void> eliminar(@PathVariable Long id) {
        artistaService.eliminar(id);
        return ResponseEntity.noContent().build();
    }

    // ==========================================
    // RUTAS ANIDADAS (PÚBLICAS)
    // ==========================================

    @GetMapping("/{id}/albums")
    @Operation(summary = "Obtener álbumes de un artista")
    public ResponseEntity<List<AlbumResponseDTO>> obtenerAlbumesPorArtista(@PathVariable Long id) {
        return ResponseEntity.ok(artistaService.obtenerAlbumesPorArtista(id));
    }

    @GetMapping("/{id}/albums/paginado")
    @Operation(summary = "Obtener álbumes de un artista con paginación")
    public ResponseEntity<PageResponseDTO<AlbumResponseDTO>> obtenerAlbumesPorArtistaPaginado(
            @PathVariable Long id,
            @Parameter(description = "Número de página (0-indexed)") @RequestParam(defaultValue = "0") int page,
            @Parameter(description = "Tamaño de página") @RequestParam(defaultValue = "10") int size,
            @Parameter(description = "Campo por el que ordenar") @RequestParam(defaultValue = "id") String sortBy,
            @Parameter(description = "Dirección del orden (asc/desc)") @RequestParam(defaultValue = "asc") String sortDir) {
        Sort sort = sortDir.equalsIgnoreCase("desc") ? Sort.by(sortBy).descending() : Sort.by(sortBy).ascending();
        Pageable pageable = PageRequest.of(page, size, sort);
        return ResponseEntity.ok(artistaService.obtenerAlbumesPorArtistaPaginado(id, pageable));
    }

    @GetMapping("/{id}/canciones")
    @Operation(summary = "Obtener canciones de un artista")
    public ResponseEntity<List<CancionResponseDTO>> obtenerCancionesPorArtista(@PathVariable Long id) {
        return ResponseEntity.ok(artistaService.obtenerCancionesPorArtista(id));
    }

    @GetMapping("/{id}/canciones/paginado")
    @Operation(summary = "Obtener canciones de un artista con paginación")
    public ResponseEntity<PageResponseDTO<CancionResponseDTO>> obtenerCancionesPorArtistaPaginado(
            @PathVariable Long id,
            @Parameter(description = "Número de página (0-indexed)") @RequestParam(defaultValue = "0") int page,
            @Parameter(description = "Tamaño de página") @RequestParam(defaultValue = "10") int size,
            @Parameter(description = "Campo por el que ordenar") @RequestParam(defaultValue = "id") String sortBy,
            @Parameter(description = "Dirección del orden (asc/desc)") @RequestParam(defaultValue = "asc") String sortDir) {
        Sort sort = sortDir.equalsIgnoreCase("desc") ? Sort.by(sortBy).descending() : Sort.by(sortBy).ascending();
        Pageable pageable = PageRequest.of(page, size, sort);
        return ResponseEntity.ok(artistaService.obtenerCancionesPorArtistaPaginado(id, pageable));
    }
}
