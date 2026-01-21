package com.discsandrecords.api.controllers;

import java.time.Instant;

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
import org.springframework.mock.web.MockMultipartFile;
import org.springframework.security.test.context.support.WithMockUser;
import org.springframework.test.web.servlet.MockMvc;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.multipart;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

import com.discsandrecords.api.dto.UsuarioResponseDTO;
import com.discsandrecords.api.security.JwtAuthenticationFilter;
import com.discsandrecords.api.security.JwtService;
import com.discsandrecords.api.services.UsuarioService;

/**
 * Tests de integración para UsuarioController
 *
 * COBERTURA:
 * 1. Upload válido retorna 200 OK y JSON actualizado
 * 2. Upload > 200KB retorna 400 Bad Request
 * 3. Upload de .pdf retorna 400/415
 */
@WebMvcTest(
        controllers = UsuarioController.class,
        excludeAutoConfiguration = {
                SecurityAutoConfiguration.class,
                UserDetailsServiceAutoConfiguration.class
        }
)
@AutoConfigureMockMvc(addFilters = false)
@DisplayName("UsuarioController - Tests de Integración")
@SuppressWarnings("removal")
class UsuarioControllerTest {

    @Autowired
    private MockMvc mockMvc;

    @MockBean
    private UsuarioService usuarioService;

    @MockBean
    private JwtService jwtService;

    @MockBean
    private JwtAuthenticationFilter jwtAuthenticationFilter;

    private UsuarioResponseDTO usuarioResponseMock;

    @BeforeEach
    void setUp() {
        usuarioResponseMock = new UsuarioResponseDTO(
                1L,
                "testuser",
                "test@example.com",
                "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNk+M9QDwADhgGAWjR9awAAAABJRU5ErkJggg==",
                "Biografía de prueba",
                Instant.now()
        );
    }

    // ==========================================
    // TESTS DE AVATAR UPLOAD
    // ==========================================

    @Nested
    @DisplayName("POST /api/usuarios/me/avatar")
    class AvatarUploadTests {

        /**
         * Test 1: Upload válido retorna 200 OK y JSON actualizado
         */
        @Test
        @DisplayName("Upload válido retorna 200 OK y JSON con avatar Base64")
        @WithMockUser(username = "test@example.com", roles = "USER")
        void subirAvatar_ArchivoValido_Retorna200() throws Exception {
            // Given - Crear imagen PNG válida pequeña (1x1 pixel)
            byte[] imagenPng = new byte[]{
                    (byte) 0x89, 0x50, 0x4E, 0x47, 0x0D, 0x0A, 0x1A, 0x0A,
                    0x00, 0x00, 0x00, 0x0D, 0x49, 0x48, 0x44, 0x52,
                    0x00, 0x00, 0x00, 0x01, 0x00, 0x00, 0x00, 0x01,
                    0x08, 0x02, 0x00, 0x00, 0x00, (byte) 0x90, 0x77, 0x53,
                    (byte) 0xDE, 0x00, 0x00, 0x00, 0x0C, 0x49, 0x44, 0x41,
                    0x54, 0x08, (byte) 0xD7, 0x63, (byte) 0xF8, 0x0F, 0x00,
                    0x00, 0x01, 0x01, 0x00, 0x05, 0x1C, (byte) 0xA0, (byte) 0xC3,
                    0x00, 0x00, 0x00, 0x00, 0x49, 0x45, 0x4E, 0x44,
                    (byte) 0xAE, 0x42, 0x60, (byte) 0x82
            };

            MockMultipartFile archivo = new MockMultipartFile(
                    "file",
                    "avatar.png",
                    MediaType.IMAGE_PNG_VALUE,
                    imagenPng
            );

            when(usuarioService.actualizarAvatar(any(), any())).thenReturn(usuarioResponseMock);

            // When/Then
            mockMvc.perform(multipart("/api/usuarios/me/avatar")
                            .file(archivo)
                            .principal(() -> "test@example.com"))
                    .andExpect(status().isOk())
                    .andExpect(jsonPath("$.nombreUsuario").value("testuser"))
                    .andExpect(jsonPath("$.avatar").exists());
        }

        /**
         * Test 2: Upload > 200KB retorna 400 Bad Request
         */
        @Test
        @DisplayName("Upload > 200KB retorna 400 Bad Request")
        @WithMockUser(username = "test@example.com", roles = "USER")
        void subirAvatar_ArchivoMuyGrande_Retorna400() throws Exception {
            // Given - Crear archivo mayor a 200KB
            byte[] archivoGrande = new byte[250 * 1024]; // 250KB

            MockMultipartFile archivo = new MockMultipartFile(
                    "file",
                    "imagen-grande.png",
                    MediaType.IMAGE_PNG_VALUE,
                    archivoGrande
            );

            // When/Then
            mockMvc.perform(multipart("/api/usuarios/me/avatar")
                            .file(archivo)
                            .principal(() -> "test@example.com"))
                    .andExpect(status().isBadRequest())
                    .andExpect(jsonPath("$.message").value("El archivo excede el tamaño máximo de 200KB"));
        }

        /**
         * Test 3: Upload de .pdf retorna 415 Unsupported Media Type
         */
        @Test
        @DisplayName("Upload de PDF retorna 415 Unsupported Media Type")
        @WithMockUser(username = "test@example.com", roles = "USER")
        void subirAvatar_ArchivoPdf_Retorna415() throws Exception {
            // Given - Crear archivo PDF (cabecera básica)
            byte[] pdfContent = "%PDF-1.4\n1 0 obj\n<<>>\nendobj\ntrailer\n<<>>\n".getBytes();

            MockMultipartFile archivo = new MockMultipartFile(
                    "file",
                    "documento.pdf",
                    "application/pdf",
                    pdfContent
            );

            // When/Then
            mockMvc.perform(multipart("/api/usuarios/me/avatar")
                            .file(archivo)
                            .principal(() -> "test@example.com"))
                    .andExpect(status().isUnsupportedMediaType())
                    .andExpect(jsonPath("$.message").value("Tipo de archivo no soportado. Use: JPEG, PNG, WebP o GIF"));
        }

        /**
         * Test adicional: Upload de archivo de texto retorna 415
         */
        @Test
        @DisplayName("Upload de archivo de texto retorna 415")
        @WithMockUser(username = "test@example.com", roles = "USER")
        void subirAvatar_ArchivoTexto_Retorna415() throws Exception {
            // Given
            MockMultipartFile archivo = new MockMultipartFile(
                    "file",
                    "documento.txt",
                    MediaType.TEXT_PLAIN_VALUE,
                    "Este es un archivo de texto".getBytes()
            );

            // When/Then
            mockMvc.perform(multipart("/api/usuarios/me/avatar")
                            .file(archivo)
                            .principal(() -> "test@example.com"))
                    .andExpect(status().isUnsupportedMediaType());
        }

        /**
         * Test adicional: Upload de JPEG válido retorna 200
         */
        @Test
        @DisplayName("Upload de JPEG válido retorna 200")
        @WithMockUser(username = "test@example.com", roles = "USER")
        void subirAvatar_Jpeg_Retorna200() throws Exception {
            // Given - Cabecera básica de JPEG
            byte[] jpegHeader = new byte[]{
                    (byte) 0xFF, (byte) 0xD8, (byte) 0xFF, (byte) 0xE0,
                    0x00, 0x10, 0x4A, 0x46, 0x49, 0x46, 0x00, 0x01
            };

            MockMultipartFile archivo = new MockMultipartFile(
                    "file",
                    "avatar.jpg",
                    MediaType.IMAGE_JPEG_VALUE,
                    jpegHeader
            );

            when(usuarioService.actualizarAvatar(any(), any())).thenReturn(usuarioResponseMock);

            // When/Then
            mockMvc.perform(multipart("/api/usuarios/me/avatar")
                            .file(archivo)
                            .principal(() -> "test@example.com"))
                    .andExpect(status().isOk());
        }

        /**
         * Test adicional: Upload de WebP válido retorna 200
         */
        @Test
        @DisplayName("Upload de WebP válido retorna 200")
        @WithMockUser(username = "test@example.com", roles = "USER")
        void subirAvatar_Webp_Retorna200() throws Exception {
            // Given - Cabecera básica de WebP
            byte[] webpHeader = "RIFF....WEBP".getBytes();

            MockMultipartFile archivo = new MockMultipartFile(
                    "file",
                    "avatar.webp",
                    "image/webp",
                    webpHeader
            );

            when(usuarioService.actualizarAvatar(any(), any())).thenReturn(usuarioResponseMock);

            // When/Then
            mockMvc.perform(multipart("/api/usuarios/me/avatar")
                            .file(archivo)
                            .principal(() -> "test@example.com"))
                    .andExpect(status().isOk());
        }
    }
}
