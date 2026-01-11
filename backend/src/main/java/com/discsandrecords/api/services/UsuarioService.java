package com.discsandrecords.api.services;

import java.util.List;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.discsandrecords.api.dto.CreateUsuarioDTO;
import com.discsandrecords.api.dto.PageResponseDTO;
import com.discsandrecords.api.dto.UpdateUsuarioDTO;
import com.discsandrecords.api.dto.UsuarioEstadisticasDTO;
import com.discsandrecords.api.dto.UsuarioResponseDTO;
import com.discsandrecords.api.entities.Usuario;
import com.discsandrecords.api.exceptions.DuplicateResourceException;
import com.discsandrecords.api.exceptions.ResourceNotFoundException;
import com.discsandrecords.api.repositories.UsuarioAlbumRepository;
import com.discsandrecords.api.repositories.UsuarioCancionRepository;
import com.discsandrecords.api.repositories.UsuarioRepository;

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
    private final UsuarioAlbumRepository usuarioAlbumRepository;
    private final UsuarioCancionRepository usuarioCancionRepository;
    private final PasswordEncoder passwordEncoder;

    /**
     * Constructor con inyección de dependencias
     *
     * @param usuarioRepository Repositorio de usuarios
     * @param usuarioAlbumRepository Repositorio de reseñas de álbumes
     * @param usuarioCancionRepository Repositorio de reseñas de canciones
     * @param passwordEncoder Encoder BCrypt para contraseñas
     */
    public UsuarioService(UsuarioRepository usuarioRepository,
                          UsuarioAlbumRepository usuarioAlbumRepository,
                          UsuarioCancionRepository usuarioCancionRepository,
                          PasswordEncoder passwordEncoder) {
        this.usuarioRepository = usuarioRepository;
        this.usuarioAlbumRepository = usuarioAlbumRepository;
        this.usuarioCancionRepository = usuarioCancionRepository;
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

    // ==========================================
    // ESTADÍSTICAS DE USUARIO
    // ==========================================

    /**
     * Obtiene las estadísticas del perfil de un usuario
     *
     * ESTADÍSTICAS:
     * - Total de álbumes escuchados
     * - Total de canciones escuchadas
     * - Total de reseñas de álbumes
     * - Total de reseñas de canciones
     * - Puntuación media que el usuario da
     * - Top 5 géneros más escuchados
     *
     * @param usuarioId ID del usuario
     * @return DTO con todas las estadísticas
     * @throws ResourceNotFoundException si el usuario no existe
     */
    @Transactional(readOnly = true)
    public UsuarioEstadisticasDTO obtenerEstadisticas(Long usuarioId) {
        // Verificar que el usuario existe
        if (!usuarioRepository.existsById(usuarioId)) {
            throw new ResourceNotFoundException("Usuario", "id", usuarioId);
        }

        // Contadores básicos
        Long totalAlbumesEscuchados = usuarioAlbumRepository.contarEscuchadosPorUsuario(usuarioId);
        Long totalCancionesEscuchadas = usuarioCancionRepository.contarEscuchadasPorUsuario(usuarioId);
        Long totalResenasAlbumes = usuarioAlbumRepository.contarResenasPorUsuario(usuarioId);
        Long totalResenasCanciones = usuarioCancionRepository.contarResenasPorUsuario(usuarioId);

        // Puntuación media que da el usuario (de álbumes)
        Double puntuacionMediaDada = usuarioAlbumRepository.calcularPuntuacionMediaPorUsuario(usuarioId);

        // Top 5 géneros más escuchados
        List<Object[]> generosRaw = usuarioAlbumRepository.generosMasEscuchadosPorUsuario(
                usuarioId, 
                PageRequest.of(0, 5)
        );

        List<UsuarioEstadisticasDTO.GeneroConteoDTO> generosMasEscuchados = generosRaw.stream()
                .map(row -> new UsuarioEstadisticasDTO.GeneroConteoDTO(
                        (Long) row[0],      // generoId
                        (String) row[1],    // nombreGenero
                        (String) row[2],    // color
                        (Long) row[3]       // conteo
                ))
                .toList();

        return new UsuarioEstadisticasDTO(
                totalAlbumesEscuchados != null ? totalAlbumesEscuchados : 0L,
                totalCancionesEscuchadas != null ? totalCancionesEscuchadas : 0L,
                totalResenasAlbumes != null ? totalResenasAlbumes : 0L,
                totalResenasCanciones != null ? totalResenasCanciones : 0L,
                puntuacionMediaDada,
                generosMasEscuchados
        );
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
