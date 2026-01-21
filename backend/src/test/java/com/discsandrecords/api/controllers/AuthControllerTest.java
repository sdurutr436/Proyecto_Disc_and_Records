package com.discsandrecords.api.controllers;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Nested;
import org.junit.jupiter.api.Test;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.when;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.autoconfigure.security.servlet.SecurityAutoConfiguration;
import org.springframework.boot.autoconfigure.security.servlet.UserDetailsServiceAutoConfiguration;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.http.MediaType;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.test.web.servlet.MockMvc;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

import com.discsandrecords.api.dto.AuthResponseDTO;
import com.discsandrecords.api.dto.LoginRequestDTO;
import com.discsandrecords.api.dto.RegisterRequestDTO;
import com.discsandrecords.api.exceptions.DuplicateResourceException;
import com.discsandrecords.api.security.JwtAuthenticationFilter;
import com.discsandrecords.api.security.JwtService;
import com.discsandrecords.api.services.AuthService;
import com.fasterxml.jackson.databind.ObjectMapper;

/**
 * Tests de integración para AuthController
 * 
 * Usamos @WebMvcTest para cargar solo el contexto web
 * y probar los endpoints HTTP sin levantar toda la aplicación.
 */
@WebMvcTest(
        controllers = AuthController.class,
        excludeAutoConfiguration = {
                SecurityAutoConfiguration.class,
                UserDetailsServiceAutoConfiguration.class
        }
)
@AutoConfigureMockMvc(addFilters = false)
@SuppressWarnings("removal")
@DisplayName("AuthController - Tests de Integración")
class AuthControllerTest {

    @Autowired
    private MockMvc mockMvc;

    @Autowired
    private ObjectMapper objectMapper;

    @MockBean
    private AuthService authService;

    @MockBean
    private JwtService jwtService;

    @MockBean
    private JwtAuthenticationFilter jwtAuthenticationFilter;

    private RegisterRequestDTO registroValido;
    private LoginRequestDTO loginValido;
    private AuthResponseDTO authResponseExitoso;

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

        authResponseExitoso = new AuthResponseDTO(
                "jwt.token.aqui",
                1L,
                "testuser",
                "test@example.com",
                "ROLE_USER"
        );
    }

    // ==========================================
    // TESTS DE REGISTRO
    // ==========================================

    @Nested
    @DisplayName("POST /api/auth/register")
    class RegistroEndpointTests {

        @Test
        @DisplayName("Debería registrar usuario y retornar 201")
        void registrar_DatosValidos_Retorna201() throws Exception {
            // Given
            when(authService.registrar(any(RegisterRequestDTO.class))).thenReturn(authResponseExitoso);

            // When/Then
            mockMvc.perform(post("/api/auth/register")
                            .contentType(MediaType.APPLICATION_JSON)
                            .content(objectMapper.writeValueAsString(registroValido)))
                    .andExpect(status().isCreated())
                    .andExpect(jsonPath("$.token").value("jwt.token.aqui"))
                    .andExpect(jsonPath("$.nombreUsuario").value("testuser"))
                    .andExpect(jsonPath("$.mail").value("test@example.com"))
                    .andExpect(jsonPath("$.role").value("ROLE_USER"))
                    .andExpect(jsonPath("$.tipo").value("Bearer"));
        }

        @Test
        @DisplayName("Debería retornar 400 con nombre de usuario vacío")
        void registrar_NombreUsuarioVacio_Retorna400() throws Exception {
            // Given
            RegisterRequestDTO dtoInvalido = new RegisterRequestDTO(
                    "",
                    "test@example.com",
                    "password123"
            );

            // When/Then
            mockMvc.perform(post("/api/auth/register")
                            .contentType(MediaType.APPLICATION_JSON)
                            .content(objectMapper.writeValueAsString(dtoInvalido)))
                    .andExpect(status().isBadRequest());
        }

        @Test
        @DisplayName("Debería retornar 400 con email inválido")
        void registrar_EmailInvalido_Retorna400() throws Exception {
            // Given
            RegisterRequestDTO dtoInvalido = new RegisterRequestDTO(
                    "testuser",
                    "email-invalido",
                    "password123"
            );

            // When/Then
            mockMvc.perform(post("/api/auth/register")
                            .contentType(MediaType.APPLICATION_JSON)
                            .content(objectMapper.writeValueAsString(dtoInvalido)))
                    .andExpect(status().isBadRequest());
        }

        @Test
        @DisplayName("Debería retornar 400 con contraseña corta")
        void registrar_ContrasenaMuyCorta_Retorna400() throws Exception {
            // Given
            RegisterRequestDTO dtoInvalido = new RegisterRequestDTO(
                    "testuser",
                    "test@example.com",
                    "123"  // Menos de 8 caracteres
            );

            // When/Then
            mockMvc.perform(post("/api/auth/register")
                            .contentType(MediaType.APPLICATION_JSON)
                            .content(objectMapper.writeValueAsString(dtoInvalido)))
                    .andExpect(status().isBadRequest());
        }

        @Test
        @DisplayName("Debería retornar 409 si el usuario ya existe")
        void registrar_UsuarioExistente_Retorna409() throws Exception {
            // Given
            when(authService.registrar(any(RegisterRequestDTO.class)))
                    .thenThrow(new DuplicateResourceException("Usuario", "nombreUsuario", "testuser"));

            // When/Then
            mockMvc.perform(post("/api/auth/register")
                            .contentType(MediaType.APPLICATION_JSON)
                            .content(objectMapper.writeValueAsString(registroValido)))
                    .andExpect(status().isConflict());
        }
    }

    // ==========================================
    // TESTS DE LOGIN
    // ==========================================

    @Nested
    @DisplayName("POST /api/auth/login")
    class LoginEndpointTests {

        @Test
        @DisplayName("Debería hacer login y retornar 200 con token")
        void login_CredencialesValidas_Retorna200() throws Exception {
            // Given
            when(authService.login(any(LoginRequestDTO.class))).thenReturn(authResponseExitoso);

            // When/Then
            mockMvc.perform(post("/api/auth/login")
                            .contentType(MediaType.APPLICATION_JSON)
                            .content(objectMapper.writeValueAsString(loginValido)))
                    .andExpect(status().isOk())
                    .andExpect(jsonPath("$.token").value("jwt.token.aqui"))
                    .andExpect(jsonPath("$.nombreUsuario").value("testuser"))
                    .andExpect(jsonPath("$.mail").value("test@example.com"))
                    .andExpect(jsonPath("$.role").value("ROLE_USER"));
        }

        @Test
        @DisplayName("Debería retornar 400 con email vacío")
        void login_EmailVacio_Retorna400() throws Exception {
            // Given
            LoginRequestDTO dtoInvalido = new LoginRequestDTO(
                    "",
                    "password123"
            );

            // When/Then
            mockMvc.perform(post("/api/auth/login")
                            .contentType(MediaType.APPLICATION_JSON)
                            .content(objectMapper.writeValueAsString(dtoInvalido)))
                    .andExpect(status().isBadRequest());
        }

        @Test
        @DisplayName("Debería retornar 400 con contraseña vacía")
        void login_ContrasenaVacia_Retorna400() throws Exception {
            // Given
            LoginRequestDTO dtoInvalido = new LoginRequestDTO(
                    "test@example.com",
                    ""
            );

            // When/Then
            mockMvc.perform(post("/api/auth/login")
                            .contentType(MediaType.APPLICATION_JSON)
                            .content(objectMapper.writeValueAsString(dtoInvalido)))
                    .andExpect(status().isBadRequest());
        }

        @Test
        @DisplayName("Debería retornar 401 con credenciales inválidas")
        void login_CredencialesInvalidas_Retorna401() throws Exception {
            // Given
            when(authService.login(any(LoginRequestDTO.class)))
                    .thenThrow(new BadCredentialsException("Credenciales inválidas"));

            // When/Then
            mockMvc.perform(post("/api/auth/login")
                            .contentType(MediaType.APPLICATION_JSON)
                            .content(objectMapper.writeValueAsString(loginValido)))
                    .andExpect(status().isUnauthorized());
        }
    }
}
