package com.discsandrecords.api.services;

import static org.assertj.core.api.Assertions.assertThat;
import static org.assertj.core.api.Assertions.assertThatThrownBy;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.ArgumentMatchers.anyString;
import static org.mockito.Mockito.never;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;

import java.util.Optional;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Nested;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.password.PasswordEncoder;

import com.discsandrecords.api.dto.AuthResponseDTO;
import com.discsandrecords.api.dto.LoginRequestDTO;
import com.discsandrecords.api.dto.RegisterRequestDTO;
import com.discsandrecords.api.entities.Role;
import com.discsandrecords.api.entities.Usuario;
import com.discsandrecords.api.exceptions.DuplicateResourceException;
import com.discsandrecords.api.repositories.UsuarioRepository;
import com.discsandrecords.api.security.JwtService;

/**
 * Tests unitarios para AuthService
 * 
 * Verificamos la lógica de negocio de autenticación:
 * - Registro de usuarios
 * - Login y generación de tokens
 * - Manejo de errores (duplicados, credenciales inválidas)
 */
@ExtendWith(MockitoExtension.class)
@DisplayName("AuthService - Tests Unitarios")
class AuthServiceTest {

    @Mock
    private UsuarioRepository usuarioRepository;

    @Mock
    private PasswordEncoder passwordEncoder;

    @Mock
    private JwtService jwtService;

    @Mock
    private AuthenticationManager authenticationManager;

    @InjectMocks
    private AuthService authService;

    private RegisterRequestDTO registroValido;
    private LoginRequestDTO loginValido;
    private Usuario usuarioExistente;

    @BeforeEach
    void setUp() {
        registroValido = new RegisterRequestDTO(
                "testuser",
                "test@example.com",
                "password123"
        );

        loginValido = new LoginRequestDTO(
                "test@example.com",
                "password123"
        );

        usuarioExistente = Usuario.builder()
                .id(1L)
                .nombreUsuario("testuser")
                .mail("test@example.com")
                .contrasena("hashedPassword")
                .role(Role.ROLE_USER)
                .activo(true)
                .build();
    }

    // ==========================================
    // TESTS DE REGISTRO
    // ==========================================

    @Nested
    @DisplayName("Registro de Usuarios")
    class RegistroTests {

        @Test
        @DisplayName("Debería registrar usuario exitosamente")
        void registrar_UsuarioValido_RetornaToken() {
            // Given
            when(usuarioRepository.existsByNombreUsuario(anyString())).thenReturn(false);
            when(usuarioRepository.existsByMail(anyString())).thenReturn(false);
            when(passwordEncoder.encode(anyString())).thenReturn("hashedPassword");
            when(usuarioRepository.save(any(Usuario.class))).thenReturn(usuarioExistente);
            when(jwtService.generateToken(any(Usuario.class))).thenReturn("jwt.token.here");

            // When
            AuthResponseDTO resultado = authService.registrar(registroValido);

            // Then
            assertThat(resultado).isNotNull();
            assertThat(resultado.token()).isEqualTo("jwt.token.here");
            assertThat(resultado.nombreUsuario()).isEqualTo("testuser");
            assertThat(resultado.mail()).isEqualTo("test@example.com");
            assertThat(resultado.role()).isEqualTo("ROLE_USER");

            verify(usuarioRepository).existsByNombreUsuario("testuser");
            verify(usuarioRepository).existsByMail("test@example.com");
            verify(passwordEncoder).encode("password123");
            verify(usuarioRepository).save(any(Usuario.class));
            verify(jwtService).generateToken(any(Usuario.class));
        }

        @Test
        @DisplayName("Debería lanzar excepción si el nombre de usuario ya existe")
        void registrar_NombreUsuarioExistente_LanzaExcepcion() {
            // Given
            when(usuarioRepository.existsByNombreUsuario("testuser")).thenReturn(true);

            // When/Then
            assertThatThrownBy(() -> authService.registrar(registroValido))
                    .isInstanceOf(DuplicateResourceException.class)
                    .hasMessageContaining("nombreUsuario");

            verify(usuarioRepository, never()).save(any(Usuario.class));
        }

        @Test
        @DisplayName("Debería lanzar excepción si el email ya existe")
        void registrar_EmailExistente_LanzaExcepcion() {
            // Given
            when(usuarioRepository.existsByNombreUsuario(anyString())).thenReturn(false);
            when(usuarioRepository.existsByMail("test@example.com")).thenReturn(true);

            // When/Then
            assertThatThrownBy(() -> authService.registrar(registroValido))
                    .isInstanceOf(DuplicateResourceException.class)
                    .hasMessageContaining("mail");

            verify(usuarioRepository, never()).save(any(Usuario.class));
        }

        @Test
        @DisplayName("Debería hashear la contraseña antes de guardar")
        void registrar_ContraseñaHasheada_NoGuardaTextoPlano() {
            // Given
            when(usuarioRepository.existsByNombreUsuario(anyString())).thenReturn(false);
            when(usuarioRepository.existsByMail(anyString())).thenReturn(false);
            when(passwordEncoder.encode("password123")).thenReturn("$2a$10$hashedValue");
            when(usuarioRepository.save(any(Usuario.class))).thenAnswer(invocation -> {
                Usuario u = invocation.getArgument(0);
                // Verificar que la contraseña está hasheada
                assertThat(u.getContrasena()).isEqualTo("$2a$10$hashedValue");
                assertThat(u.getContrasena()).isNotEqualTo("password123");
                u.setId(1L);
                return u;
            });
            when(jwtService.generateToken(any(Usuario.class))).thenReturn("token");

            // When
            authService.registrar(registroValido);

            // Then
            verify(passwordEncoder).encode("password123");
        }

        @Test
        @DisplayName("Debería asignar rol USER por defecto")
        void registrar_SinRolEspecificado_AsignaRoleUser() {
            // Given
            when(usuarioRepository.existsByNombreUsuario(anyString())).thenReturn(false);
            when(usuarioRepository.existsByMail(anyString())).thenReturn(false);
            when(passwordEncoder.encode(anyString())).thenReturn("hash");
            when(usuarioRepository.save(any(Usuario.class))).thenAnswer(invocation -> {
                Usuario u = invocation.getArgument(0);
                assertThat(u.getRole()).isEqualTo(Role.ROLE_USER);
                u.setId(1L);
                return u;
            });
            when(jwtService.generateToken(any(Usuario.class))).thenReturn("token");

            // When
            authService.registrar(registroValido);

            // Then - verificación en el mock answer
        }
    }

    // ==========================================
    // TESTS DE LOGIN
    // ==========================================

    @Nested
    @DisplayName("Login de Usuarios")
    class LoginTests {

        @Test
        @DisplayName("Debería hacer login exitosamente y retornar token")
        void login_CredencialesValidas_RetornaToken() {
            // Given
            when(authenticationManager.authenticate(any(UsernamePasswordAuthenticationToken.class)))
                    .thenReturn(new UsernamePasswordAuthenticationToken("test@example.com", "password123"));
            when(usuarioRepository.findByMail("test@example.com")).thenReturn(Optional.of(usuarioExistente));
            when(jwtService.generateToken(usuarioExistente)).thenReturn("jwt.token.login");

            // When
            AuthResponseDTO resultado = authService.login(loginValido);

            // Then
            assertThat(resultado).isNotNull();
            assertThat(resultado.token()).isEqualTo("jwt.token.login");
            assertThat(resultado.id()).isEqualTo(1L);
            assertThat(resultado.nombreUsuario()).isEqualTo("testuser");
            assertThat(resultado.mail()).isEqualTo("test@example.com");
        }

        @Test
        @DisplayName("Debería lanzar excepción con credenciales inválidas")
        void login_CredencialesInvalidas_LanzaExcepcion() {
            // Given
            when(authenticationManager.authenticate(any(UsernamePasswordAuthenticationToken.class)))
                    .thenThrow(new BadCredentialsException("Bad credentials"));

            // When/Then
            assertThatThrownBy(() -> authService.login(loginValido))
                    .isInstanceOf(BadCredentialsException.class)
                    .hasMessage("Credenciales inválidas");

            verify(jwtService, never()).generateToken(any(Usuario.class));
        }

        @Test
        @DisplayName("Debería lanzar excepción si el usuario está inactivo")
        void login_UsuarioInactivo_LanzaExcepcion() {
            // Given
            usuarioExistente.setActivo(false);
            when(authenticationManager.authenticate(any(UsernamePasswordAuthenticationToken.class)))
                    .thenReturn(new UsernamePasswordAuthenticationToken("test@example.com", "password123"));
            when(usuarioRepository.findByMail("test@example.com")).thenReturn(Optional.of(usuarioExistente));

            // When/Then
            assertThatThrownBy(() -> authService.login(loginValido))
                    .isInstanceOf(BadCredentialsException.class)
                    .hasMessage("La cuenta está desactivada");

            verify(jwtService, never()).generateToken(any(Usuario.class));
        }

        @Test
        @DisplayName("Debería retornar el rol correcto del usuario")
        void login_UsuarioAdmin_RetornaRolAdmin() {
            // Given
            usuarioExistente.setRole(Role.ROLE_ADMIN);
            when(authenticationManager.authenticate(any(UsernamePasswordAuthenticationToken.class)))
                    .thenReturn(new UsernamePasswordAuthenticationToken("test@example.com", "password123"));
            when(usuarioRepository.findByMail("test@example.com")).thenReturn(Optional.of(usuarioExistente));
            when(jwtService.generateToken(usuarioExistente)).thenReturn("admin.token");

            // When
            AuthResponseDTO resultado = authService.login(loginValido);

            // Then
            assertThat(resultado.role()).isEqualTo("ROLE_ADMIN");
        }
    }
}
