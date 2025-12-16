package com.discsandrecords.api.controllers;

import com.discsandrecords.api.dto.*;
import com.discsandrecords.api.services.ResenaService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.net.URI;
import java.util.List;

@RestController
@RequestMapping("/api/resenas")
@Tag(name = "Reseñas", description = "API para gestión de reseñas de álbumes y canciones")
public class ResenaController {

    private final ResenaService resenaService;

    public ResenaController(ResenaService resenaService) {
        this.resenaService = resenaService;
    }

    // ==================== RESEÑAS DE ÁLBUMES ====================

    @GetMapping("/albumes/{albumId}")
    @Operation(summary = "Listar reseñas de un álbum")
    public ResponseEntity<List<ResenaAlbumResponseDTO>> listarResenasAlbum(@PathVariable Long albumId) {
        return ResponseEntity.ok(resenaService.listarResenasAlbum(albumId));
    }

    @GetMapping("/albumes/usuario/{usuarioId}")
    @Operation(summary = "Listar reseñas de álbumes de un usuario")
    public ResponseEntity<List<ResenaAlbumResponseDTO>> listarResenasAlbumUsuario(@PathVariable Long usuarioId) {
        return ResponseEntity.ok(resenaService.listarResenasUsuario(usuarioId));
    }

    @GetMapping("/albumes/{albumId}/usuario/{usuarioId}")
    @Operation(summary = "Obtener reseña específica de un álbum por usuario")
    public ResponseEntity<ResenaAlbumResponseDTO> obtenerResenaAlbum(
            @PathVariable Long albumId,
            @PathVariable Long usuarioId) {
        return ResponseEntity.ok(resenaService.obtenerResenaAlbum(usuarioId, albumId));
    }

    @PostMapping("/albumes")
    @Operation(summary = "Crear una nueva reseña de álbum")
    public ResponseEntity<ResenaAlbumResponseDTO> crearResenaAlbum(
            @RequestBody @Valid CreateResenaAlbumDTO dto) {
        ResenaAlbumResponseDTO creada = resenaService.crearResenaAlbum(dto);
        return ResponseEntity
                .created(URI.create("/api/resenas/albumes/" + dto.albumId() + "/usuario/" + dto.usuarioId()))
                .body(creada);
    }

    @PutMapping("/albumes/{albumId}/usuario/{usuarioId}")
    @Operation(summary = "Actualizar una reseña de álbum")
    public ResponseEntity<ResenaAlbumResponseDTO> actualizarResenaAlbum(
            @PathVariable Long albumId,
            @PathVariable Long usuarioId,
            @RequestBody @Valid UpdateResenaDTO dto) {
        return ResponseEntity.ok(resenaService.actualizarResenaAlbum(usuarioId, albumId, dto));
    }

    @DeleteMapping("/albumes/{albumId}/usuario/{usuarioId}")
    @Operation(summary = "Eliminar una reseña de álbum")
    public ResponseEntity<Void> eliminarResenaAlbum(
            @PathVariable Long albumId,
            @PathVariable Long usuarioId) {
        resenaService.eliminarResenaAlbum(usuarioId, albumId);
        return ResponseEntity.noContent().build();
    }

    // ==================== RESEÑAS DE CANCIONES ====================

    @GetMapping("/canciones/{cancionId}")
    @Operation(summary = "Listar reseñas de una canción")
    public ResponseEntity<List<ResenaCancionResponseDTO>> listarResenasCancion(@PathVariable Long cancionId) {
        return ResponseEntity.ok(resenaService.listarResenasCancion(cancionId));
    }

    @GetMapping("/canciones/usuario/{usuarioId}")
    @Operation(summary = "Listar reseñas de canciones de un usuario")
    public ResponseEntity<List<ResenaCancionResponseDTO>> listarResenasCancionesUsuario(@PathVariable Long usuarioId) {
        return ResponseEntity.ok(resenaService.listarResenasCanccionesUsuario(usuarioId));
    }

    @PostMapping("/canciones")
    @Operation(summary = "Crear una nueva reseña de canción")
    public ResponseEntity<ResenaCancionResponseDTO> crearResenaCancion(
            @RequestBody @Valid CreateResenaCancionDTO dto) {
        ResenaCancionResponseDTO creada = resenaService.crearResenaCancion(dto);
        return ResponseEntity
                .created(URI.create("/api/resenas/canciones/" + dto.cancionId() + "/usuario/" + dto.usuarioId()))
                .body(creada);
    }

    @PutMapping("/canciones/{cancionId}/usuario/{usuarioId}")
    @Operation(summary = "Actualizar una reseña de canción")
    public ResponseEntity<ResenaCancionResponseDTO> actualizarResenaCancion(
            @PathVariable Long cancionId,
            @PathVariable Long usuarioId,
            @RequestBody @Valid UpdateResenaDTO dto) {
        return ResponseEntity.ok(resenaService.actualizarResenaCancion(usuarioId, cancionId, dto));
    }

    @DeleteMapping("/canciones/{cancionId}/usuario/{usuarioId}")
    @Operation(summary = "Eliminar una reseña de canción")
    public ResponseEntity<Void> eliminarResenaCancion(
            @PathVariable Long cancionId,
            @PathVariable Long usuarioId) {
        resenaService.eliminarResenaCancion(usuarioId, cancionId);
        return ResponseEntity.noContent().build();
    }
}
