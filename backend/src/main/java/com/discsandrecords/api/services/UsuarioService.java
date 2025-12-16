package com.discsandrecords.api.services;

import com.discsandrecords.api.dto.*;
import com.discsandrecords.api.entities.Usuario;
import com.discsandrecords.api.exceptions.DuplicateResourceException;
import com.discsandrecords.api.exceptions.ResourceNotFoundException;
import com.discsandrecords.api.repositories.UsuarioRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@Transactional
public class UsuarioService {

    private final UsuarioRepository usuarioRepository;

    public UsuarioService(UsuarioRepository usuarioRepository) {
        this.usuarioRepository = usuarioRepository;
    }

    @Transactional(readOnly = true)
    public List<UsuarioResponseDTO> listarTodos() {
        return usuarioRepository.findAll().stream()
                .map(this::toResponseDTO)
                .toList();
    }

    @Transactional(readOnly = true)
    public UsuarioResponseDTO obtenerPorId(Long id) {
        Usuario usuario = usuarioRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Usuario", "id", id));
        return toResponseDTO(usuario);
    }

    @Transactional(readOnly = true)
    public UsuarioResponseDTO obtenerPorNombreUsuario(String nombreUsuario) {
        Usuario usuario = usuarioRepository.findByNombreUsuario(nombreUsuario)
                .orElseThrow(() -> new ResourceNotFoundException("Usuario", "nombreUsuario", nombreUsuario));
        return toResponseDTO(usuario);
    }

    public UsuarioResponseDTO crear(CreateUsuarioDTO dto) {
        // Verificar si ya existe el nombre de usuario
        if (usuarioRepository.existsByNombreUsuario(dto.nombreUsuario())) {
            throw new DuplicateResourceException("Usuario", "nombreUsuario", dto.nombreUsuario());
        }

        // Verificar si ya existe el email
        if (usuarioRepository.existsByMail(dto.mail())) {
            throw new DuplicateResourceException("Usuario", "mail", dto.mail());
        }

        // TODO: Hashear contraseña con BCrypt cuando se implemente seguridad
        Usuario usuario = Usuario.builder()
                .nombreUsuario(dto.nombreUsuario())
                .mail(dto.mail())
                .contrasena(dto.contrasena()) // IMPORTANTE: Debe hashearse en producción
                .avatar(dto.avatar())
                .biografia(dto.biografia())
                .build();

        Usuario guardado = usuarioRepository.save(usuario);
        return toResponseDTO(guardado);
    }

    public UsuarioResponseDTO actualizar(Long id, UpdateUsuarioDTO dto) {
        Usuario usuario = usuarioRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Usuario", "id", id));

        // Si se cambia el email, verificar que no esté en uso
        if (dto.mail() != null && !dto.mail().equals(usuario.getMail())) {
            if (usuarioRepository.existsByMail(dto.mail())) {
                throw new DuplicateResourceException("Usuario", "mail", dto.mail());
            }
            usuario.setMail(dto.mail());
        }

        // Actualizar campos opcionales si se proporcionan
        if (dto.avatar() != null) {
            usuario.setAvatar(dto.avatar());
        }
        if (dto.biografia() != null) {
            usuario.setBiografia(dto.biografia());
        }

        Usuario actualizado = usuarioRepository.save(usuario);
        return toResponseDTO(actualizado);
    }

    public void eliminar(Long id) {
        Usuario usuario = usuarioRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Usuario", "id", id));

        // TODO: Considerar qué hacer con las reseñas del usuario (soft delete, anonimizar, etc.)
        usuarioRepository.delete(usuario);
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
