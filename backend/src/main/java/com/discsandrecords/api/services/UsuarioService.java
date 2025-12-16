package com.discsandrecords.api.services;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;

import com.discsandrecords.api.dto.*;
import com.discsandrecords.api.entities.Usuario;
import com.discsandrecords.api.exceptions.DuplicateResourceException;
import com.discsandrecords.api.exceptions.ResourceNotFoundException;
import com.discsandrecords.api.repositories.UsuarioRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

/**
 * UsuarioService - Servicio de Gestión de Usuarios
 *
 * PROPÓSITO:
 * Centraliza la lógica de negocio para operaciones CRUD de usuarios.
 * También implementa UserDetailsService para integración con Spring Security.
 *
 * RESPONSABILIDADES:
 * - Listar usuarios (paginado y completo)
 * - Obtener usuario por ID o nombre
 * - Crear usuarios con contraseña hasheada
 * - Actualizar usuarios
 * - Eliminar usuarios
 * - Cargar usuarios para autenticación (UserDetailsService)
 *
 * SEGURIDAD:
 * - Todas las contraseñas se hashean con BCrypt antes de guardar
 * - Implementa UserDetailsService para autenticación JWT
 * - El email se usa como "username" para login
 *
 * @see UserDetailsService
 * @see AuthService
 */
@Service
@Transactional
public class UsuarioService implements UserDetailsService {

    private final UsuarioRepository usuarioRepository;
    private final PasswordEncoder passwordEncoder;

    /**
     * Constructor con inyección de dependencias
     *
     * @param usuarioRepository Repositorio de usuarios
     * @param passwordEncoder Encoder BCrypt para contraseñas
     */
    public UsuarioService(UsuarioRepository usuarioRepository, PasswordEncoder passwordEncoder) {
        this.usuarioRepository = usuarioRepository;
        this.passwordEncoder = passwordEncoder;
    }

    // ==========================================
    // IMPLEMENTACIÓN DE UserDetailsService
    // ==========================================

    /**
     * Carga un usuario por su "username" (email en este sistema)
     *
     * SPRING SECURITY:
     * Este método es llamado automáticamente por Spring Security durante
     * la autenticación. El "username" es el email del usuario.
     *
     * @param email Email del usuario (usado como username)
     * @return UserDetails del usuario encontrado
     * @throws UsernameNotFoundException si el usuario no existe
     */
    @Override
    @Transactional(readOnly = true)
    public UserDetails loadUserByUsername(String email) throws UsernameNotFoundException {
        return usuarioRepository.findByMail(email)
                .orElseThrow(() -> new UsernameNotFoundException(
                        "Usuario no encontrado con email: " + email
                ));
    }

    // ==========================================
    // OPERACIONES CRUD
    // ==========================================

    @Transactional(readOnly = true)
    public List<UsuarioResponseDTO> listarTodos() {
        return usuarioRepository.findAll().stream()
                .map(this::toResponseDTO)
                .toList();
    }

    @Transactional(readOnly = true)
    public PageResponseDTO<UsuarioResponseDTO> listarTodosPaginado(Pageable pageable) {
        Page<UsuarioResponseDTO> page = usuarioRepository.findAll(pageable)
                .map(this::toResponseDTO);
        return PageResponseDTO.from(page);
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

    /**
     * Crea un nuevo usuario con contraseña hasheada
     *
     * PROCESO:
     * 1. Verificar unicidad de nombre de usuario
     * 2. Verificar unicidad de email
     * 3. Hashear contraseña con BCrypt
     * 4. Guardar usuario en base de datos
     *
     * NOTA: Este método es para creación administrativa.
     * Para registro público, usar AuthService.registrar()
     *
     * @param dto Datos del nuevo usuario
     * @return UsuarioResponseDTO con datos del usuario creado
     * @throws DuplicateResourceException si usuario o email ya existen
     */
    public UsuarioResponseDTO crear(CreateUsuarioDTO dto) {
        // Verificar si ya existe el nombre de usuario
        if (usuarioRepository.existsByNombreUsuario(dto.nombreUsuario())) {
            throw new DuplicateResourceException("Usuario", "nombreUsuario", dto.nombreUsuario());
        }

        // Verificar si ya existe el email
        if (usuarioRepository.existsByMail(dto.mail())) {
            throw new DuplicateResourceException("Usuario", "mail", dto.mail());
        }

        // Crear usuario con contraseña hasheada
        Usuario usuario = Usuario.builder()
                .nombreUsuario(dto.nombreUsuario())
                .mail(dto.mail())
                .contrasena(passwordEncoder.encode(dto.contrasena())) // BCrypt hash
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
