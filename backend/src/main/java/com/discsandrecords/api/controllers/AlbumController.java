package com.discsandrecords.api.controllers;

import com.discsandrecords.api.dto.*;
import com.discsandrecords.api.services.AlbumService;
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
 * AlbumController - Controlador de Gestión de Álbumes
 *
 * POLÍTICAS DE ACCESO:
 * - GET (lectura): Público - cualquiera puede ver álbumes
 * - POST (crear): Solo ADMIN o MODERATOR
 * - PUT (actualizar): Solo ADMIN o MODERATOR
 * - DELETE: Solo ADMIN
 *
 * @see AlbumService
 */
@RestController
@RequestMapping("/api/albumes")
@Tag(name = "Álbumes", description = "API para gestión de álbumes")
public class AlbumController {

    private final AlbumService albumService;

    public AlbumController(AlbumService albumService) {
        this.albumService = albumService;
    }

    // ==========================================
    // ENDPOINTS PÚBLICOS (LECTURA)
    // ==========================================

    @GetMapping
    @Operation(summary = "Listar todos los álbumes")
    public ResponseEntity<List<AlbumResponseDTO>> listarTodos() {
        return ResponseEntity.ok(albumService.listarTodos());
    }

    @GetMapping("/paginado")
    @Operation(summary = "Listar álbumes con paginación")
    public ResponseEntity<PageResponseDTO<AlbumResponseDTO>> listarPaginado(
            @Parameter(description = "Número de página (0-indexed)") @RequestParam(defaultValue = "0") int page,
            @Parameter(description = "Tamaño de página") @RequestParam(defaultValue = "10") int size,
            @Parameter(description = "Campo por el que ordenar") @RequestParam(defaultValue = "id") String sortBy,
            @Parameter(description = "Dirección del orden (asc/desc)") @RequestParam(defaultValue = "asc") String sortDir) {
        Sort sort = sortDir.equalsIgnoreCase("desc") ? Sort.by(sortBy).descending() : Sort.by(sortBy).ascending();
        Pageable pageable = PageRequest.of(page, size, sort);
        return ResponseEntity.ok(albumService.listarTodosPaginado(pageable));
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

    // ==========================================
    // ENDPOINTS PROTEGIDOS
    // ==========================================

    @PostMapping
    @Operation(summary = "Crear un nuevo álbum (Admin/Moderator)")
    @PreAuthorize("hasAnyRole('ADMIN', 'MODERATOR')")
    public ResponseEntity<AlbumResponseDTO> crear(@RequestBody @Valid CreateAlbumDTO dto) {
        AlbumResponseDTO creado = albumService.crear(dto);
        return ResponseEntity
                .created(URI.create("/api/albumes/" + creado.id()))
                .body(creado);
    }

    @PutMapping("/{id}")
    @Operation(summary = "Actualizar un álbum existente (Admin/Moderator)")
    @PreAuthorize("hasAnyRole('ADMIN', 'MODERATOR')")
    public ResponseEntity<AlbumResponseDTO> actualizar(
            @PathVariable Long id,
            @RequestBody @Valid CreateAlbumDTO dto) {
        return ResponseEntity.ok(albumService.actualizar(id, dto));
    }

    @DeleteMapping("/{id}")
    @Operation(summary = "Eliminar un álbum (Admin)")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<Void> eliminar(@PathVariable Long id) {
        albumService.eliminar(id);
        return ResponseEntity.noContent().build();
    }
}
