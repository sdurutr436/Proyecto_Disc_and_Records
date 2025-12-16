package com.discsandrecords.api.services;

import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.discsandrecords.api.dto.AuthResponseDTO;
import com.discsandrecords.api.dto.LoginRequestDTO;
import com.discsandrecords.api.dto.RegisterRequestDTO;
import com.discsandrecords.api.entities.Role;
import com.discsandrecords.api.entities.Usuario;
import com.discsandrecords.api.exceptions.DuplicateResourceException;
import com.discsandrecords.api.repositories.UsuarioRepository;
import com.discsandrecords.api.security.JwtService;

/**
 * AuthService - Servicio de Autenticación y Registro
 *
 * PROPÓSITO:
 * Centraliza la lógica de negocio para autenticación de usuarios:
 * - Registro de nuevos usuarios
 * - Login y generación de tokens JWT
 *
 * FLUJO DE REGISTRO:
 * 1. Validar que no existan duplicados (email, username)
 * 2. Hashear la contraseña con BCrypt
 * 3. Crear el usuario con rol por defecto (USER)
 * 4. Guardar en base de datos
 * 5. Generar y retornar token JWT
 *
 * FLUJO DE LOGIN:
 * 1. Autenticar credenciales (email + contraseña)
 * 2. Si es válido, cargar usuario de la BD
 * 3. Generar y retornar token JWT
 *
 * SEGURIDAD:
 * - Contraseñas hasheadas con BCrypt (nunca en texto plano)
 * - Tokens JWT firmados y con expiración
 * - Manejo de excepciones sin exponer información sensible
 *
 * @see JwtService
 * @see SecurityConfig
 */
@Service
@Transactional
public class AuthService {

    private final UsuarioRepository usuarioRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtService jwtService;
    private final AuthenticationManager authenticationManager;

    /**
     * Constructor con inyección de dependencias
     *
     * @param usuarioRepository Repositorio de usuarios
     * @param passwordEncoder Encoder BCrypt para contraseñas
     * @param jwtService Servicio de gestión JWT
     * @param authenticationManager Manager de autenticación de Spring
     */
    public AuthService(UsuarioRepository usuarioRepository,
                       PasswordEncoder passwordEncoder,
                       JwtService jwtService,
                       AuthenticationManager authenticationManager) {
        this.usuarioRepository = usuarioRepository;
        this.passwordEncoder = passwordEncoder;
        this.jwtService = jwtService;
        this.authenticationManager = authenticationManager;
    }

    // ==========================================
    // REGISTRO DE USUARIOS
    // ==========================================

    /**
     * Registra un nuevo usuario en el sistema
     *
     * PROCESO:
     * 1. Verificar que el nombre de usuario no exista
     * 2. Verificar que el email no exista
     * 3. Crear usuario con contraseña hasheada
     * 4. Asignar rol por defecto (ROLE_USER)
     * 5. Guardar en base de datos
     * 6. Generar token JWT para login automático
     *
     * @param request DTO con datos de registro (nombreUsuario, mail, contrasena)
     * @return AuthResponseDTO con token JWT y datos del usuario
     * @throws DuplicateResourceException si el usuario o email ya existen
     */
    public AuthResponseDTO registrar(RegisterRequestDTO request) {
        // 1. Verificar nombre de usuario único
        if (usuarioRepository.existsByNombreUsuario(request.nombreUsuario())) {
            throw new DuplicateResourceException("Usuario", "nombreUsuario", request.nombreUsuario());
        }

        // 2. Verificar email único
        if (usuarioRepository.existsByMail(request.mail())) {
            throw new DuplicateResourceException("Usuario", "mail", request.mail());
        }

        // 3-5. Crear y guardar usuario
        Usuario usuario = Usuario.builder()
                .nombreUsuario(request.nombreUsuario())
                .mail(request.mail())
                .contrasena(passwordEncoder.encode(request.contrasena())) // HASHEADO
                .role(Role.ROLE_USER) // Rol por defecto
                .activo(true)
                .build();

        Usuario guardado = usuarioRepository.save(usuario);

        // 6. Generar token JWT
        String token = jwtService.generateToken(guardado);

        // Retornar respuesta con token
        return new AuthResponseDTO(
                token,
                guardado.getId(),
                guardado.getNombreUsuario(),
                guardado.getMail(),
                guardado.getRole().name()
        );
    }

    // ==========================================
    // LOGIN DE USUARIOS
    // ==========================================

    /**
     * Autentica un usuario y genera token JWT
     *
     * PROCESO:
     * 1. Intentar autenticar con AuthenticationManager
     * 2. Si es exitoso, cargar usuario de la BD
     * 3. Generar token JWT
     *
     * SEGURIDAD:
     * - AuthenticationManager verifica credenciales contra UserDetailsService
     * - BadCredentialsException si las credenciales son inválidas
     * - No revela si el email existe o no (mismo error para ambos casos)
     *
     * @param request DTO con credenciales (mail, contrasena)
     * @return AuthResponseDTO con token JWT y datos del usuario
     * @throws BadCredentialsException si las credenciales son inválidas
     */
    public AuthResponseDTO login(LoginRequestDTO request) {
        try {
            // 1. Autenticar credenciales
            authenticationManager.authenticate(
                    new UsernamePasswordAuthenticationToken(
                            request.mail(),
                            request.contrasena()
                    )
            );
        } catch (AuthenticationException e) {
            // Mensaje genérico para no revelar información
            throw new BadCredentialsException("Credenciales inválidas");
        }

        // 2. Cargar usuario (ya sabemos que existe porque pasó autenticación)
        Usuario usuario = usuarioRepository.findByMail(request.mail())
                .orElseThrow(() -> new BadCredentialsException("Credenciales inválidas"));

        // 3. Verificar que el usuario esté activo
        if (!usuario.isActivo()) {
            throw new BadCredentialsException("La cuenta está desactivada");
        }

        // 4. Generar token JWT
        String token = jwtService.generateToken(usuario);

        // Retornar respuesta con token
        return new AuthResponseDTO(
                token,
                usuario.getId(),
                usuario.getNombreUsuario(),
                usuario.getMail(),
                usuario.getRole().name()
        );
    }
}
