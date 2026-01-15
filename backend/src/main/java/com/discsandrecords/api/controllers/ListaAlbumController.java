package com.discsandrecords.api.controllers;

import java.net.URI;
import java.util.List;
import java.util.Map;

import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.discsandrecords.api.dto.AgregarAlbumDeezerDTO;
import com.discsandrecords.api.dto.AgregarAlbumListaDTO;
import com.discsandrecords.api.dto.AlbumEnListaDTO;
import com.discsandrecords.api.dto.PuntuarAlbumDTO;
import com.discsandrecords.api.services.ListaAlbumService;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;

/**
 * ListaAlbumController - Gestión de la Lista de Álbumes del Usuario
 * 
 * ENDPOINTS:
 * - GET /api/usuarios/{id}/lista - Obtener lista de álbumes del usuario
 * - GET /api/usuarios/{id}/lista/{albumId} - Verificar si álbum está en lista
 * - POST /api/usuarios/{id}/lista - Añadir álbum a la lista
 * - DELETE /api/usuarios/{id}/lista/{albumId} - Quitar álbum de la lista
 * - POST /api/usuarios/{id}/lista/{albumId}/puntuacion - Puntuar álbum
 * - DELETE /api/usuarios/{id}/lista/{albumId}/puntuacion - Quitar puntuación
 * 
 * POLÍTICAS DE ACCESO:
 * - GET (lectura): Público - cualquiera puede ver la lista de un usuario
 * - POST/DELETE: Solo el propio usuario o ADMIN
 */
@RestController
@RequestMapping("/api/usuarios/{usuarioId}/lista")
@Tag(name = "Lista de Álbumes", description = "API para gestión de la lista de álbumes del usuario")
public class ListaAlbumController {

    private final ListaAlbumService listaAlbumService;

    public ListaAlbumController(ListaAlbumService listaAlbumService) {
        this.listaAlbumService = listaAlbumService;
    }

    // ==================== LECTURA (PÚBLICO) ====================

    @GetMapping
    @Operation(summary = "Obtener lista de álbumes del usuario")
    public ResponseEntity<List<AlbumEnListaDTO>> obtenerLista(
            @PathVariable Long usuarioId,
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "20") int size) {
        
        List<AlbumEnListaDTO> lista = size > 0 
            ? listaAlbumService.obtenerListaUsuario(usuarioId, page, size)
            : listaAlbumService.obtenerListaUsuario(usuarioId);
        
        return ResponseEntity.ok(lista);
    }

    @GetMapping("/{albumId}")
    @Operation(summary = "Verificar si un álbum está en la lista y obtener su estado")
    public ResponseEntity<AlbumEnListaDTO> obtenerEstadoAlbum(
            @PathVariable Long usuarioId,
            @PathVariable Long albumId) {
        
        return listaAlbumService.obtenerEstadoAlbum(usuarioId, albumId)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @GetMapping("/{albumId}/existe")
    @Operation(summary = "Verificar si un álbum está en la lista (solo boolean)")
    public ResponseEntity<Map<String, Boolean>> estaEnLista(
            @PathVariable Long usuarioId,
            @PathVariable Long albumId) {
        
        boolean enLista = listaAlbumService.estaEnLista(usuarioId, albumId);
        return ResponseEntity.ok(Map.of("enLista", enLista));
    }

    @GetMapping("/count")
    @Operation(summary = "Contar álbumes en la lista del usuario")
    public ResponseEntity<Map<String, Long>> contarAlbumes(@PathVariable Long usuarioId) {
        Long count = listaAlbumService.contarAlbumesEnLista(usuarioId);
        return ResponseEntity.ok(Map.of("total", count));
    }

    // ==================== GESTIÓN DE LISTA (PROTEGIDO) ====================

    @PostMapping
    @Operation(summary = "Añadir un álbum a la lista (Autenticado)")
    @PreAuthorize("isAuthenticated() and (#usuarioId == authentication.principal.id or hasRole('ADMIN'))")
    public ResponseEntity<AlbumEnListaDTO> agregarALista(
            @PathVariable Long usuarioId,
            @RequestBody @Valid AgregarAlbumListaDTO dto) {
        
        // Asegurar que el usuarioId del path coincide con el del body
        AgregarAlbumListaDTO dtoFinal = new AgregarAlbumListaDTO(usuarioId, dto.albumId());
        AlbumEnListaDTO resultado = listaAlbumService.agregarALista(dtoFinal);
        
        return ResponseEntity
                .created(URI.create("/api/usuarios/" + usuarioId + "/lista/" + dto.albumId()))
                .body(resultado);
    }

    /**
     * Endpoint para añadir álbumes de Deezer que aún no existen en la BD local.
     * Auto-crea el álbum y artista si es necesario.
     */
    @PostMapping("/deezer")
    @Operation(summary = "Añadir un álbum de Deezer a la lista (auto-crea si no existe)")
    @PreAuthorize("isAuthenticated() and (#usuarioId == authentication.principal.id or hasRole('ADMIN'))")
    public ResponseEntity<AlbumEnListaDTO> agregarAlbumDeezer(
            @PathVariable Long usuarioId,
            @RequestBody @Valid AgregarAlbumDeezerDTO dto) {
        
        // Asegurar que el usuarioId del path coincide con el del body
        AgregarAlbumDeezerDTO dtoFinal = new AgregarAlbumDeezerDTO(
            usuarioId, 
            dto.albumId(), 
            dto.tituloAlbum(), 
            dto.portadaUrl(), 
            dto.anioSalida(), 
            dto.artistaId(), 
            dto.nombreArtista()
        );
        AlbumEnListaDTO resultado = listaAlbumService.agregarAlbumDeezer(dtoFinal);
        
        return ResponseEntity
                .created(URI.create("/api/usuarios/" + usuarioId + "/lista/" + dto.albumId()))
                .body(resultado);
    }

    @DeleteMapping("/{albumId}")
    @Operation(summary = "Quitar un álbum de la lista (Autenticado)")
    @PreAuthorize("isAuthenticated() and (#usuarioId == authentication.principal.id or hasRole('ADMIN'))")
    public ResponseEntity<Void> quitarDeLista(
            @PathVariable Long usuarioId,
            @PathVariable Long albumId) {
        
        listaAlbumService.quitarDeLista(usuarioId, albumId);
        return ResponseEntity.noContent().build();
    }

    // ==================== PUNTUACIÓN (PROTEGIDO) ====================

    @PostMapping("/{albumId}/puntuacion")
    @Operation(summary = "Puntuar un álbum (debe estar en la lista)")
    @PreAuthorize("isAuthenticated() and (#usuarioId == authentication.principal.id or hasRole('ADMIN'))")
    public ResponseEntity<AlbumEnListaDTO> puntuarAlbum(
            @PathVariable Long usuarioId,
            @PathVariable Long albumId,
            @RequestBody @Valid PuntuarAlbumDTO dto) {
        
        // Asegurar que los IDs del path coinciden con los del body
        PuntuarAlbumDTO dtoFinal = new PuntuarAlbumDTO(usuarioId, albumId, dto.puntuacion());
        AlbumEnListaDTO resultado = listaAlbumService.puntuarAlbum(dtoFinal);
        
        return ResponseEntity.ok(resultado);
    }

    @DeleteMapping("/{albumId}/puntuacion")
    @Operation(summary = "Quitar puntuación de un álbum")
    @PreAuthorize("isAuthenticated() and (#usuarioId == authentication.principal.id or hasRole('ADMIN'))")
    public ResponseEntity<AlbumEnListaDTO> quitarPuntuacion(
            @PathVariable Long usuarioId,
            @PathVariable Long albumId) {
        
        AlbumEnListaDTO resultado = listaAlbumService.quitarPuntuacion(usuarioId, albumId);
        return ResponseEntity.ok(resultado);
    }
}
