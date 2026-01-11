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

import com.discsandrecords.api.dto.AlbumResponseDTO;
import com.discsandrecords.api.dto.ArtistaResponseDTO;
import com.discsandrecords.api.dto.CancionResponseDTO;
import com.discsandrecords.api.dto.CreateArtistaDTO;
import com.discsandrecords.api.dto.PageResponseDTO;
import com.discsandrecords.api.services.ArtistaService;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;

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
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Artista encontrado"),
            @ApiResponse(responseCode = "404", description = "Artista no encontrado")
    })
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
    @ApiResponses(value = {
            @ApiResponse(responseCode = "201", description = "Artista creado exitosamente"),
            @ApiResponse(responseCode = "400", description = "Datos de validación inválidos"),
            @ApiResponse(responseCode = "401", description = "No autenticado"),
            @ApiResponse(responseCode = "403", description = "Sin permisos suficientes")
    })
    @PreAuthorize("hasAnyRole('ADMIN', 'MODERATOR')")
    public ResponseEntity<ArtistaResponseDTO> crear(@RequestBody @Valid CreateArtistaDTO dto) {
        ArtistaResponseDTO creado = artistaService.crear(dto);
        return ResponseEntity
                .created(URI.create("/api/artistas/" + creado.id()))
                .body(creado);
    }

    @PutMapping("/{id}")
    @Operation(summary = "Actualizar un artista existente (Admin/Moderator)")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Artista actualizado"),
            @ApiResponse(responseCode = "400", description = "Datos de validación inválidos"),
            @ApiResponse(responseCode = "401", description = "No autenticado"),
            @ApiResponse(responseCode = "403", description = "Sin permisos suficientes"),
            @ApiResponse(responseCode = "404", description = "Artista no encontrado")
    })
    @PreAuthorize("hasAnyRole('ADMIN', 'MODERATOR')")
    public ResponseEntity<ArtistaResponseDTO> actualizar(
            @PathVariable Long id,
            @RequestBody @Valid CreateArtistaDTO dto) {
        return ResponseEntity.ok(artistaService.actualizar(id, dto));
    }

    @DeleteMapping("/{id}")
    @Operation(summary = "Eliminar un artista (Admin)")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "204", description = "Artista eliminado"),
            @ApiResponse(responseCode = "401", description = "No autenticado"),
            @ApiResponse(responseCode = "403", description = "Sin permisos suficientes"),
            @ApiResponse(responseCode = "404", description = "Artista no encontrado")
    })
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
