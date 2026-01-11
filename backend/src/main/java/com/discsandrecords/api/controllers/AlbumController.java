package com.discsandrecords.api.controllers;

import com.discsandrecords.api.dto.*;
import com.discsandrecords.api.services.AlbumService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
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
    @Operation(summary = "Listar todos los álbumes", description = "Obtiene la lista completa de álbumes sin paginación")
    @ApiResponse(responseCode = "200", description = "Lista de álbumes obtenida correctamente")
    public ResponseEntity<List<AlbumResponseDTO>> listarTodos() {
        return ResponseEntity.ok(albumService.listarTodos());
    }

    @GetMapping("/paginado")
    @Operation(summary = "Listar álbumes con paginación", description = "Obtiene álbumes paginados con ordenación configurable")
    @ApiResponse(responseCode = "200", description = "Página de álbumes obtenida correctamente")
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
    @Operation(summary = "Obtener álbum por ID", description = "Busca un álbum específico por su identificador")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Álbum encontrado"),
            @ApiResponse(responseCode = "404", description = "Álbum no encontrado", 
                    content = @Content(schema = @Schema(example = "{\"error\":\"NOT_FOUND\",\"message\":\"Álbum no encontrado con id: 999\"}")))
    })
    public ResponseEntity<AlbumResponseDTO> obtenerPorId(@PathVariable Long id) {
        return ResponseEntity.ok(albumService.obtenerPorId(id));
    }

    @GetMapping("/buscar")
    @Operation(summary = "Buscar álbumes por título", description = "Búsqueda parcial por título (case-insensitive)")
    @ApiResponse(responseCode = "200", description = "Resultados de búsqueda")
    public ResponseEntity<List<AlbumResponseDTO>> buscarPorTitulo(@RequestParam String titulo) {
        return ResponseEntity.ok(albumService.buscarPorTitulo(titulo));
    }

    @GetMapping("/artista/{idArtista}")
    @Operation(summary = "Listar álbumes de un artista", description = "Obtiene todos los álbumes de un artista específico")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Lista de álbumes del artista"),
            @ApiResponse(responseCode = "404", description = "Artista no encontrado")
    })
    public ResponseEntity<List<AlbumResponseDTO>> listarPorArtista(@PathVariable Long idArtista) {
        return ResponseEntity.ok(albumService.listarPorArtista(idArtista));
    }

    // ==========================================
    // ENDPOINTS PROTEGIDOS
    // ==========================================

    @PostMapping
    @Operation(summary = "Crear un nuevo álbum (Admin/Moderator)", description = "Crea un álbum asociado a un artista existente. Requiere rol ADMIN o MODERATOR.")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "201", description = "Álbum creado correctamente"),
            @ApiResponse(responseCode = "400", description = "Datos de entrada inválidos"),
            @ApiResponse(responseCode = "403", description = "Acceso denegado - requiere rol ADMIN o MODERATOR"),
            @ApiResponse(responseCode = "404", description = "Artista no encontrado")
    })
    @PreAuthorize("hasAnyRole('ADMIN', 'MODERATOR')")
    public ResponseEntity<AlbumResponseDTO> crear(@RequestBody @Valid CreateAlbumDTO dto) {
        AlbumResponseDTO creado = albumService.crear(dto);
        return ResponseEntity
                .created(URI.create("/api/albumes/" + creado.id()))
                .body(creado);
    }

    @PutMapping("/{id}")
    @Operation(summary = "Actualizar un álbum existente (Admin/Moderator)", description = "Modifica los datos de un álbum. Requiere rol ADMIN o MODERATOR.")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Álbum actualizado correctamente"),
            @ApiResponse(responseCode = "400", description = "Datos de entrada inválidos"),
            @ApiResponse(responseCode = "403", description = "Acceso denegado"),
            @ApiResponse(responseCode = "404", description = "Álbum no encontrado")
    })
    @PreAuthorize("hasAnyRole('ADMIN', 'MODERATOR')")
    public ResponseEntity<AlbumResponseDTO> actualizar(
            @PathVariable Long id,
            @RequestBody @Valid CreateAlbumDTO dto) {
        return ResponseEntity.ok(albumService.actualizar(id, dto));
    }

    @DeleteMapping("/{id}")
    @Operation(summary = "Eliminar un álbum (Admin)", description = "Elimina permanentemente un álbum. Requiere rol ADMIN.")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "204", description = "Álbum eliminado correctamente"),
            @ApiResponse(responseCode = "403", description = "Acceso denegado - requiere rol ADMIN"),
            @ApiResponse(responseCode = "404", description = "Álbum no encontrado")
    })
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<Void> eliminar(@PathVariable Long id) {
        albumService.eliminar(id);
        return ResponseEntity.noContent().build();
    }
}
