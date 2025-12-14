package com.discsandrecords.api.controllers;

import com.discsandrecords.api.dto.*;
import com.discsandrecords.api.entities.Usuario;
import com.discsandrecords.api.repositories.UsuarioRepository;
import jakarta.validation.Valid;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.net.URI;
import java.util.List;

@RestController
@RequestMapping("/api/usuarios")
public class UsuarioController {

    private final UsuarioRepository repository;

    public UsuarioController(UsuarioRepository repository) {
        this.repository = repository;
    }

    @GetMapping
    public ResponseEntity<List<UsuarioResponseDTO>> listarTodos() {
        List<UsuarioResponseDTO> usuarios = repository.findAll().stream()
                .map(this::toResponseDTO)
                .toList();
        return ResponseEntity.ok(usuarios);
    }

    @GetMapping("/{id}")
    public ResponseEntity<UsuarioResponseDTO> obtenerPorId(@PathVariable Long id) {
        return repository.findById(id)
                .map(this::toResponseDTO)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @GetMapping("/username/{nombreUsuario}")
    public ResponseEntity<UsuarioResponseDTO> obtenerPorNombreUsuario(@PathVariable String nombreUsuario) {
        return repository.findByNombreUsuario(nombreUsuario)
                .map(this::toResponseDTO)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @PostMapping
    public ResponseEntity<UsuarioResponseDTO> crear(@RequestBody @Valid CreateUsuarioDTO dto) {
        // Verificar si ya existe el usuario o email
        if (repository.existsByNombreUsuario(dto.nombreUsuario())) {
            throw new IllegalArgumentException("El nombre de usuario ya existe");
        }
        if (repository.existsByMail(dto.mail())) {
            throw new IllegalArgumentException("El email ya está registrado");
        }

        // TODO: Hashear contraseña con BCrypt antes de guardar
        Usuario usuario = Usuario.builder()
                .nombreUsuario(dto.nombreUsuario())
                .mail(dto.mail())
                .contrasena(dto.contrasena()) // IMPORTANTE: Debe hashearse
                .avatar(dto.avatar())
                .biografia(dto.biografia())
                .build();

        Usuario guardado = repository.save(usuario);

        return ResponseEntity
                .created(URI.create("/api/usuarios/" + guardado.getId()))
                .body(toResponseDTO(guardado));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> eliminar(@PathVariable Long id) {
        if (!repository.existsById(id)) {
            return ResponseEntity.notFound().build();
        }

        repository.deleteById(id);
        return ResponseEntity.noContent().build();
    }

    private UsuarioResponseDTO toResponseDTO(Usuario usuario) {
        return new UsuarioResponseDTO(
                usuario.getId(),
                usuario.getNombreUsuario(),
                usuario.getMail(),
                usuario.getAvatar(),
                usuario.getBiografia(),
                usuario.getFechaRegistro()
        );
    }
}
