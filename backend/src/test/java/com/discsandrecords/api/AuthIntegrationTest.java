package com.discsandrecords.api;

import static org.assertj.core.api.Assertions.assertThat;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Nested;
import org.junit.jupiter.api.Order;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.TestMethodOrder;
import org.junit.jupiter.api.MethodOrderer;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.MvcResult;

import com.discsandrecords.api.dto.LoginRequestDTO;
import com.discsandrecords.api.dto.RegisterRequestDTO;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;

/**
 * Tests de integración completos
 * 
 * Levanta el contexto completo de Spring Boot con H2 en memoria
 * para probar el flujo real de la aplicación.
 */
@SpringBootTest(webEnvironment = SpringBootTest.WebEnvironment.RANDOM_PORT)
@AutoConfigureMockMvc
@TestMethodOrder(MethodOrderer.OrderAnnotation.class)
@DisplayName("Integración - Flujo Completo de Autenticación")
class AuthIntegrationTest {

    @Autowired
    private MockMvc mockMvc;

    @Autowired
    private ObjectMapper objectMapper;

    private static String jwtToken;

    // ==========================================
    // FLUJO DE REGISTRO Y LOGIN
    // ==========================================

    @Test
    @Order(1)
    @DisplayName("1. Debería registrar un nuevo usuario")
    void registrar_NuevoUsuario_ExitosoConToken() throws Exception {
        // Given
        RegisterRequestDTO request = new RegisterRequestDTO(
                "integrationuser",
                "integration@test.com",
                "password123"
        );

        // When/Then
        MvcResult result = mockMvc.perform(post("/api/auth/register")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(request)))
                .andExpect(status().isCreated())
                .andExpect(jsonPath("$.token").exists())
                .andExpect(jsonPath("$.nombreUsuario").value("integrationuser"))
                .andExpect(jsonPath("$.mail").value("integration@test.com"))
                .andExpect(jsonPath("$.role").value("ROLE_USER"))
                .andReturn();

        // Guardar token para tests posteriores
        String responseBody = result.getResponse().getContentAsString();
        JsonNode jsonNode = objectMapper.readTree(responseBody);
        jwtToken = jsonNode.get("token").asText();

        assertThat(jwtToken).isNotBlank();
    }

    @Test
    @Order(2)
    @DisplayName("2. Debería rechazar registro duplicado")
    void registrar_UsuarioExistente_Retorna409() throws Exception {
        // Given - mismo usuario que el test anterior
        RegisterRequestDTO request = new RegisterRequestDTO(
                "integrationuser",
                "integration@test.com",
                "password123"
        );

        // When/Then
        mockMvc.perform(post("/api/auth/register")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(request)))
                .andExpect(status().isConflict());
    }

    @Test
    @Order(3)
    @DisplayName("3. Debería hacer login con credenciales correctas")
    void login_CredencialesCorrectas_ExitosoConToken() throws Exception {
        // Given
        LoginRequestDTO request = new LoginRequestDTO(
                "integration@test.com",
                "password123"
        );

        // When/Then
        MvcResult result = mockMvc.perform(post("/api/auth/login")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(request)))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.token").exists())
                .andExpect(jsonPath("$.nombreUsuario").value("integrationuser"))
                .andReturn();

        // Actualizar token
        String responseBody = result.getResponse().getContentAsString();
        JsonNode jsonNode = objectMapper.readTree(responseBody);
        jwtToken = jsonNode.get("token").asText();
    }

    @Test
    @Order(4)
    @DisplayName("4. Debería rechazar login con contraseña incorrecta")
    void login_ContrasenaIncorrecta_Retorna401() throws Exception {
        // Given
        LoginRequestDTO request = new LoginRequestDTO(
                "integration@test.com",
                "wrongpassword"
        );

        // When/Then
        mockMvc.perform(post("/api/auth/login")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(request)))
                .andExpect(status().isUnauthorized());
    }

    @Test
    @Order(5)
    @DisplayName("5. Debería rechazar login con email inexistente")
    void login_EmailNoExiste_Retorna401() throws Exception {
        // Given
        LoginRequestDTO request = new LoginRequestDTO(
                "noexiste@test.com",
                "password123"
        );

        // When/Then
        mockMvc.perform(post("/api/auth/login")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(request)))
                .andExpect(status().isUnauthorized());
    }

    // ==========================================
    // TESTS DE ENDPOINTS PROTEGIDOS
    // ==========================================

    @Nested
    @DisplayName("Acceso a endpoints protegidos")
    class EndpointsProtegidosTests {

        @Test
        @DisplayName("Debería acceder a endpoint público sin token")
        void endpointPublico_SinToken_Retorna200() throws Exception {
            // GET /api/generos es público
            mockMvc.perform(get("/api/generos"))
                    .andExpect(status().isOk());
        }

        @Test
        @DisplayName("Debería rechazar acceso a endpoint protegido sin token")
        void endpointProtegido_SinToken_Retorna401o403() throws Exception {
            // POST /api/generos requiere autenticación
            mockMvc.perform(post("/api/generos")
                            .contentType(MediaType.APPLICATION_JSON)
                            .content("{\"nombreGenero\": \"Test\"}"))
                    .andExpect(status().is4xxClientError());
        }
    }
}
