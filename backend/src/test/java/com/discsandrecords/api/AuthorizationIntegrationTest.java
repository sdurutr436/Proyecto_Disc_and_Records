package com.discsandrecords.api;

import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Nested;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.security.test.context.support.WithMockUser;
import org.springframework.test.web.servlet.MockMvc;

/**
 * Tests de Autorización por Roles
 * 
 * Verifica que los endpoints protegidos rechacen acceso
 * a usuarios sin los permisos adecuados.
 * 
 * Usa @SpringBootTest para cargar el contexto completo
 * incluyendo la configuración de seguridad.
 * 
 * IMPORTANTE: Estos tests verifican la capa de AUTORIZACIÓN,
 * no la lógica de negocio. Por eso esperamos 403 Forbidden
 * cuando un usuario no tiene permisos, independientemente
 * de si el recurso existe o no.
 */
@SpringBootTest
@AutoConfigureMockMvc
@DisplayName("Tests de Autorización - Control de Acceso por Roles")
class AuthorizationIntegrationTest {

    @Autowired
    private MockMvc mockMvc;

    // ==========================================
    // TESTS SIN AUTENTICACIÓN (ANÓNIMO)
    // ==========================================

    @Nested
    @DisplayName("Usuario Anónimo (sin autenticación)")
    class AnonimoTests {

        @Test
        @DisplayName("Anónimo PUEDE acceder a GET /api/albumes")
        void anonimo_PuedeVerAlbumes() throws Exception {
            mockMvc.perform(get("/api/albumes"))
                    .andExpect(status().isOk());
        }

        @Test
        @DisplayName("Anónimo PUEDE acceder a GET /api/usuarios")
        void anonimo_PuedeVerUsuarios() throws Exception {
            mockMvc.perform(get("/api/usuarios"))
                    .andExpect(status().isOk());
        }

        @Test
        @DisplayName("Anónimo PUEDE acceder a GET /api/generos")
        void anonimo_PuedeVerGeneros() throws Exception {
            mockMvc.perform(get("/api/generos"))
                    .andExpect(status().isOk());
        }

        @Test
        @DisplayName("Anónimo NO puede acceder a POST /api/albumes - Retorna 403")
        void anonimo_NoPuedeCrearAlbum() throws Exception {
            mockMvc.perform(post("/api/albumes")
                            .contentType(MediaType.APPLICATION_JSON)
                            .content("{}"))
                    .andExpect(status().isForbidden());
        }

        @Test
        @DisplayName("Anónimo NO puede acceder a DELETE /api/albumes/1 - Retorna 403")
        void anonimo_NoPuedeEliminarAlbum() throws Exception {
            mockMvc.perform(delete("/api/albumes/1"))
                    .andExpect(status().isForbidden());
        }

        @Test
        @DisplayName("Anónimo NO puede acceder a POST /api/usuarios - Retorna 403")
        void anonimo_NoPuedeCrearUsuario() throws Exception {
            mockMvc.perform(post("/api/usuarios")
                            .contentType(MediaType.APPLICATION_JSON)
                            .content("{}"))
                    .andExpect(status().isForbidden());
        }

        @Test
        @DisplayName("Anónimo NO puede acceder a /api/auth/me - Retorna 403")
        void anonimo_NoPuedeAccederAuthMe() throws Exception {
            mockMvc.perform(get("/api/auth/me"))
                    .andExpect(status().isForbidden());
        }

        @Test
        @DisplayName("Login es público (sin auth)")
        void login_EsPublico() throws Exception {
            // Login es público, solo verificamos que no sea 403
            // Puede devolver 401 (credenciales inválidas) o 400 (datos inválidos)
            mockMvc.perform(post("/api/auth/login")
                            .contentType(MediaType.APPLICATION_JSON)
                            .content("{\"mail\":\"test@test.com\",\"contrasena\":\"password\"}"))
                    .andExpect(result -> {
                        int status = result.getResponse().getStatus();
                        if (status == 403) {
                            throw new AssertionError("Login debería ser público, no 403");
                        }
                    });
        }

        @Test
        @DisplayName("Registro es público (sin auth)")
        void register_EsPublico() throws Exception {
            // Register es público
            mockMvc.perform(post("/api/auth/register")
                            .contentType(MediaType.APPLICATION_JSON)
                            .content("{\"nombreUsuario\":\"testuser\",\"mail\":\"test@test.com\",\"contrasena\":\"password\"}"))
                    .andExpect(result -> {
                        int status = result.getResponse().getStatus();
                        if (status == 403) {
                            throw new AssertionError("Register debería ser público, no 403");
                        }
                    });
        }
    }

    // ==========================================
    // TESTS CON ROL USER
    // ==========================================

    @Nested
    @DisplayName("Usuario con rol USER")
    @WithMockUser(roles = "USER")
    class UserRoleTests {

        @Test
        @DisplayName("USER PUEDE ver álbumes")
        void user_PuedeVerAlbumes() throws Exception {
            mockMvc.perform(get("/api/albumes"))
                    .andExpect(status().isOk());
        }

        @Test
        @DisplayName("USER PUEDE ver usuarios")
        void user_PuedeVerUsuarios() throws Exception {
            mockMvc.perform(get("/api/usuarios"))
                    .andExpect(status().isOk());
        }

        @Test
        @DisplayName("USER PUEDE acceder a /api/auth/me")
        void user_PuedeAccederAuthMe() throws Exception {
            // /api/auth/me requiere autenticación pero no rol específico
            // Puede fallar por otras razones (usuario no en BD) pero no por 403
            mockMvc.perform(get("/api/auth/me"))
                    .andExpect(result -> {
                        int status = result.getResponse().getStatus();
                        if (status == 403) {
                            throw new AssertionError("/api/auth/me debería ser accesible para USER, no 403");
                        }
                    });
        }
    }

    // ==========================================
    // TESTS CON ROL MODERATOR
    // ==========================================

    @Nested
    @DisplayName("Usuario con rol MODERATOR")
    @WithMockUser(roles = "MODERATOR")
    class ModeratorRoleTests {

        @Test
        @DisplayName("MODERATOR PUEDE ver álbumes")
        void moderator_PuedeVerAlbumes() throws Exception {
            mockMvc.perform(get("/api/albumes"))
                    .andExpect(status().isOk());
        }

        @Test
        @DisplayName("MODERATOR PUEDE acceder a POST /api/albumes (no 403)")
        void moderator_PuedeAccederCrearAlbum() throws Exception {
            // MODERATOR tiene permiso para crear álbumes
            // Verificamos que NO sea 403 (puede ser 400/404 por validación)
            mockMvc.perform(post("/api/albumes")
                            .contentType(MediaType.APPLICATION_JSON)
                            .content("{\"titulo\":\"Test\",\"anio\":2024,\"portadaUrl\":\"http://test.com/img.jpg\",\"artistaId\":1}"))
                    .andExpect(result -> {
                        int status = result.getResponse().getStatus();
                        if (status == 403) {
                            throw new AssertionError("MODERATOR debería poder crear álbumes, no 403");
                        }
                    });
        }

        @Test
        @DisplayName("MODERATOR PUEDE acceder a PUT /api/albumes/1 (no 403)")
        void moderator_PuedeAccederActualizarAlbum() throws Exception {
            mockMvc.perform(put("/api/albumes/1")
                            .contentType(MediaType.APPLICATION_JSON)
                            .content("{\"titulo\":\"Test\",\"anio\":2024,\"portadaUrl\":\"http://test.com/img.jpg\",\"artistaId\":1}"))
                    .andExpect(result -> {
                        int status = result.getResponse().getStatus();
                        if (status == 403) {
                            throw new AssertionError("MODERATOR debería poder actualizar álbumes, no 403");
                        }
                    });
        }
    }

    // ==========================================
    // TESTS CON ROL ADMIN
    // ==========================================

    @Nested
    @DisplayName("Usuario con rol ADMIN")
    @WithMockUser(roles = "ADMIN")
    class AdminRoleTests {

        @Test
        @DisplayName("ADMIN PUEDE acceder a POST /api/albumes (no 403)")
        void admin_PuedeAccederCrearAlbum() throws Exception {
            mockMvc.perform(post("/api/albumes")
                            .contentType(MediaType.APPLICATION_JSON)
                            .content("{\"titulo\":\"Test\",\"anio\":2024,\"portadaUrl\":\"http://test.com/img.jpg\",\"artistaId\":1}"))
                    .andExpect(result -> {
                        int status = result.getResponse().getStatus();
                        if (status == 403) {
                            throw new AssertionError("ADMIN debería poder crear álbumes, no 403");
                        }
                    });
        }

        @Test
        @DisplayName("ADMIN PUEDE acceder a DELETE /api/albumes/1 (no 403)")
        void admin_PuedeAccederEliminarAlbum() throws Exception {
            mockMvc.perform(delete("/api/albumes/1"))
                    .andExpect(result -> {
                        int status = result.getResponse().getStatus();
                        if (status == 403) {
                            throw new AssertionError("ADMIN debería poder eliminar álbumes, no 403");
                        }
                    });
        }

        @Test
        @DisplayName("ADMIN PUEDE acceder a POST /api/usuarios (no 403)")
        void admin_PuedeAccederCrearUsuario() throws Exception {
            mockMvc.perform(post("/api/usuarios")
                            .contentType(MediaType.APPLICATION_JSON)
                            .content("{\"nombreUsuario\":\"admin\",\"mail\":\"admin@test.com\",\"contrasena\":\"password\"}"))
                    .andExpect(result -> {
                        int status = result.getResponse().getStatus();
                        if (status == 403) {
                            throw new AssertionError("ADMIN debería poder crear usuarios, no 403");
                        }
                    });
        }

        @Test
        @DisplayName("ADMIN PUEDE acceder a DELETE /api/usuarios/1 (no 403)")
        void admin_PuedeAccederEliminarUsuario() throws Exception {
            mockMvc.perform(delete("/api/usuarios/1"))
                    .andExpect(result -> {
                        int status = result.getResponse().getStatus();
                        if (status == 403) {
                            throw new AssertionError("ADMIN debería poder eliminar usuarios, no 403");
                        }
                    });
        }
    }
}
