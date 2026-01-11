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

import com.discsandrecords.api.dto.CreateUsuarioDTO;
import com.discsandrecords.api.dto.PageResponseDTO;
import com.discsandrecords.api.dto.UpdateUsuarioDTO;
import com.discsandrecords.api.dto.UsuarioEstadisticasDTO;
import com.discsandrecords.api.dto.UsuarioResponseDTO;
import com.discsandrecords.api.services.UsuarioService;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;

/**
 * UsuarioController - Controlador de Gestión de Usuarios
 *
 * POLÍTICAS DE ACCESO:
 * - GET (lectura): Público - cualquiera puede ver perfiles
 * - POST (crear): Solo ADMIN - registro público va por AuthController
 * - PUT (actualizar): ADMIN o el propio usuario
 * - DELETE: Solo ADMIN
 *
 * @see UsuarioService
 */
@RestController
@RequestMapping("/api/usuarios")
@Tag(name = "Usuarios", description = "API para gestión de usuarios")
public class UsuarioController {

    private final UsuarioService usuarioService;

    public UsuarioController(UsuarioService usuarioService) {
        this.usuarioService = usuarioService;
    }

    // ==========================================
    // ENDPOINTS PÚBLICOS (LECTURA)
    // ==========================================

    @GetMapping
    @Operation(summary = "Listar todos los usuarios")
    public ResponseEntity<List<UsuarioResponseDTO>> listarTodos() {
        return ResponseEntity.ok(usuarioService.listarTodos());
    }

    @GetMapping("/paginado")
    @Operation(summary = "Listar usuarios con paginación")
    public ResponseEntity<PageResponseDTO<UsuarioResponseDTO>> listarPaginado(
            @Parameter(description = "Número de página (0-indexed)") @RequestParam(defaultValue = "0") int page,
            @Parameter(description = "Tamaño de página") @RequestParam(defaultValue = "10") int size,
            @Parameter(description = "Campo por el que ordenar") @RequestParam(defaultValue = "id") String sortBy,
            @Parameter(description = "Dirección del orden (asc/desc)") @RequestParam(defaultValue = "asc") String sortDir) {
        Sort sort = sortDir.equalsIgnoreCase("desc") ? Sort.by(sortBy).descending() : Sort.by(sortBy).ascending();
        Pageable pageable = PageRequest.of(page, size, sort);
        return ResponseEntity.ok(usuarioService.listarTodosPaginado(pageable));
    }

    @GetMapping("/{id}")
    @Operation(summary = "Obtener usuario por ID")
    public ResponseEntity<UsuarioResponseDTO> obtenerPorId(@PathVariable Long id) {
        return ResponseEntity.ok(usuarioService.obtenerPorId(id));
    }

    @GetMapping("/username/{nombreUsuario}")
    @Operation(summary = "Obtener usuario por nombre de usuario")
    public ResponseEntity<UsuarioResponseDTO> obtenerPorNombreUsuario(@PathVariable String nombreUsuario) {
        return ResponseEntity.ok(usuarioService.obtenerPorNombreUsuario(nombreUsuario));
    }

    /**
     * Obtiene las estadísticas del perfil de un usuario
     *
     * ENDPOINT: GET /api/usuarios/{id}/estadisticas
     *
     * ESTADÍSTICAS INCLUIDAS:
     * - Total álbumes escuchados
     * - Total canciones escuchadas
     * - Total reseñas escritas
     * - Puntuación media dada
     * - Top 5 géneros más escuchados (con color para UI)
     *
     * @param id ID del usuario
     * @return DTO con estadísticas del usuario
     */
    @GetMapping("/{id}/estadisticas")
    @Operation(summary = "Obtener estadísticas del perfil de un usuario")
    public ResponseEntity<UsuarioEstadisticasDTO> obtenerEstadisticas(@PathVariable Long id) {
        return ResponseEntity.ok(usuarioService.obtenerEstadisticas(id));
    }

    // ==========================================
    // ENDPOINTS PROTEGIDOS (ADMIN)
    // ==========================================

    /**
     * Crear usuario - Solo administradores
     * Para registro público usar POST /api/auth/register
     */
    @PostMapping
    @Operation(summary = "Crear un nuevo usuario (Admin)")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<UsuarioResponseDTO> crear(@RequestBody @Valid CreateUsuarioDTO dto) {
        UsuarioResponseDTO creado = usuarioService.crear(dto);
        return ResponseEntity
                .created(URI.create("/api/usuarios/" + creado.id()))
                .body(creado);
    }

    /**
     * Actualizar usuario - Admin o el propio usuario
     * #id se compara con el ID del usuario autenticado
     */
    @PutMapping("/{id}")
    @Operation(summary = "Actualizar un usuario existente")
    @PreAuthorize("hasRole('ADMIN') or #id == authentication.principal.id")
    public ResponseEntity<UsuarioResponseDTO> actualizar(
            @PathVariable Long id,
            @RequestBody @Valid UpdateUsuarioDTO dto) {
        return ResponseEntity.ok(usuarioService.actualizar(id, dto));
    }

    /**
     * Eliminar usuario - Solo administradores
     */
    @DeleteMapping("/{id}")
    @Operation(summary = "Eliminar un usuario (Admin)")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<Void> eliminar(@PathVariable Long id) {
        usuarioService.eliminar(id);
        return ResponseEntity.noContent().build();
    }
}
