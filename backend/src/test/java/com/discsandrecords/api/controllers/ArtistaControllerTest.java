package com.discsandrecords.api.controllers;

import static org.mockito.ArgumentMatchers.any;
import static org.mockito.ArgumentMatchers.eq;
import static org.mockito.Mockito.doNothing;
import static org.mockito.Mockito.doThrow;
import static org.mockito.Mockito.when;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

import java.math.BigDecimal;
import java.util.List;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Nested;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.data.domain.Pageable;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;

import com.discsandrecords.api.dto.ArtistaResponseDTO;
import com.discsandrecords.api.dto.CreateArtistaDTO;
import com.discsandrecords.api.dto.PageResponseDTO;
import com.discsandrecords.api.exceptions.ResourceNotFoundException;
import com.discsandrecords.api.security.JwtService;
import com.discsandrecords.api.services.ArtistaService;
import com.fasterxml.jackson.databind.ObjectMapper;

/**
 * Tests de integración para ArtistaController
 * 
 * Prueba endpoints públicos y protegidos con diferentes roles.
 */
@WebMvcTest(ArtistaController.class)
@AutoConfigureMockMvc(addFilters = false)
@DisplayName("ArtistaController - Tests de Integración")
class ArtistaControllerTest {

    @Autowired
    private MockMvc mockMvc;

    @Autowired
    private ObjectMapper objectMapper;

    @MockBean
    private ArtistaService artistaService;

    @MockBean
    private JwtService jwtService;

    private ArtistaResponseDTO artistaResponse;
    private CreateArtistaDTO createArtistaDTO;

    @BeforeEach
    void setUp() {
        artistaResponse = new ArtistaResponseDTO(1L, "The Beatles", new BigDecimal("4.50"));
        createArtistaDTO = new CreateArtistaDTO("The Beatles");
    }

    // ==========================================
    // TESTS ENDPOINTS PÚBLICOS (GET)
    // ==========================================

    @Nested
    @DisplayName("GET /api/artistas - Listar todos")
    class ListarTodosTests {

        @Test
        @DisplayName("Debería listar todos los artistas sin autenticación")
        void listarTodos_SinAuth_Retorna200() throws Exception {
            when(artistaService.listarTodos()).thenReturn(List.of(artistaResponse));

            mockMvc.perform(get("/api/artistas"))
                    .andExpect(status().isOk())
                    .andExpect(jsonPath("$[0].id").value(1))
                    .andExpect(jsonPath("$[0].nombreArtista").value("The Beatles"))
                    .andExpect(jsonPath("$[0].puntuacionMedia").value(4.50));
        }

        @Test
        @DisplayName("Debería retornar lista vacía cuando no hay artistas")
        void listarTodos_SinArtistas_RetornaListaVacia() throws Exception {
            when(artistaService.listarTodos()).thenReturn(List.of());

            mockMvc.perform(get("/api/artistas"))
                    .andExpect(status().isOk())
                    .andExpect(jsonPath("$").isArray())
                    .andExpect(jsonPath("$").isEmpty());
        }
    }

    @Nested
    @DisplayName("GET /api/artistas/paginado - Listar con paginación")
    class ListarPaginadoTests {

        @Test
        @DisplayName("Debería retornar página de artistas")
        void listarPaginado_Retorna200() throws Exception {
            PageResponseDTO<ArtistaResponseDTO> pageResponse = new PageResponseDTO<>(
                    List.of(artistaResponse), 0, 10, 1, 1, true, true
            );
            when(artistaService.listarTodosPaginado(any(Pageable.class))).thenReturn(pageResponse);

            mockMvc.perform(get("/api/artistas/paginado")
                            .param("page", "0")
                            .param("size", "10"))
                    .andExpect(status().isOk())
                    .andExpect(jsonPath("$.content[0].nombreArtista").value("The Beatles"))
                    .andExpect(jsonPath("$.totalElements").value(1))
                    .andExpect(jsonPath("$.first").value(true));
        }
    }

    @Nested
    @DisplayName("GET /api/artistas/{id} - Obtener por ID")
    class ObtenerPorIdTests {

        @Test
        @DisplayName("Debería retornar artista existente")
        void obtenerPorId_ArtistaExiste_Retorna200() throws Exception {
            when(artistaService.obtenerPorId(1L)).thenReturn(artistaResponse);

            mockMvc.perform(get("/api/artistas/1"))
                    .andExpect(status().isOk())
                    .andExpect(jsonPath("$.id").value(1))
                    .andExpect(jsonPath("$.nombreArtista").value("The Beatles"));
        }

        @Test
        @DisplayName("Debería retornar 404 para artista inexistente")
        void obtenerPorId_ArtistaNoExiste_Retorna404() throws Exception {
            when(artistaService.obtenerPorId(999L))
                    .thenThrow(new ResourceNotFoundException("Artista no encontrado con id: 999"));

            mockMvc.perform(get("/api/artistas/999"))
                    .andExpect(status().isNotFound());
        }
    }

    @Nested
    @DisplayName("GET /api/artistas/buscar - Buscar por nombre")
    class BuscarPorNombreTests {

        @Test
        @DisplayName("Debería encontrar artistas por nombre")
        void buscarPorNombre_Encuentra_Retorna200() throws Exception {
            when(artistaService.buscarPorNombre("Beatles")).thenReturn(List.of(artistaResponse));

            mockMvc.perform(get("/api/artistas/buscar")
                            .param("nombre", "Beatles"))
                    .andExpect(status().isOk())
                    .andExpect(jsonPath("$[0].nombreArtista").value("The Beatles"));
        }
    }

    // ==========================================
    // TESTS ENDPOINTS PROTEGIDOS (POST/PUT/DELETE)
    // ==========================================

    @Nested
    @DisplayName("POST /api/artistas - Crear artista")
    class CrearArtistaTests {

        @Test
        @DisplayName("Debería crear artista con datos válidos")
        void crear_DatosValidos_Retorna201() throws Exception {
            when(artistaService.crear(any(CreateArtistaDTO.class))).thenReturn(artistaResponse);

            mockMvc.perform(post("/api/artistas")
                            .contentType(MediaType.APPLICATION_JSON)
                            .content(objectMapper.writeValueAsString(createArtistaDTO)))
                    .andExpect(status().isCreated())
                    .andExpect(header().string("Location", "/api/artistas/1"))
                    .andExpect(jsonPath("$.nombreArtista").value("The Beatles"));
        }

        @Test
        @DisplayName("Debería retornar 400 con nombre vacío")
        void crear_NombreVacio_Retorna400() throws Exception {
            CreateArtistaDTO dtoInvalido = new CreateArtistaDTO("");

            mockMvc.perform(post("/api/artistas")
                            .contentType(MediaType.APPLICATION_JSON)
                            .content(objectMapper.writeValueAsString(dtoInvalido)))
                    .andExpect(status().isBadRequest());
        }
    }

    @Nested
    @DisplayName("PUT /api/artistas/{id} - Actualizar artista")
    class ActualizarArtistaTests {

        @Test
        @DisplayName("Debería actualizar artista existente")
        void actualizar_ArtistaExiste_Retorna200() throws Exception {
            ArtistaResponseDTO actualizado = new ArtistaResponseDTO(1L, "The Beatles (Updated)", new BigDecimal("4.75"));
            when(artistaService.actualizar(eq(1L), any(CreateArtistaDTO.class))).thenReturn(actualizado);

            mockMvc.perform(put("/api/artistas/1")
                            .contentType(MediaType.APPLICATION_JSON)
                            .content(objectMapper.writeValueAsString(new CreateArtistaDTO("The Beatles (Updated)"))))
                    .andExpect(status().isOk())
                    .andExpect(jsonPath("$.nombreArtista").value("The Beatles (Updated)"));
        }

        @Test
        @DisplayName("Debería retornar 404 para artista inexistente")
        void actualizar_ArtistaNoExiste_Retorna404() throws Exception {
            when(artistaService.actualizar(eq(999L), any(CreateArtistaDTO.class)))
                    .thenThrow(new ResourceNotFoundException("Artista no encontrado con id: 999"));

            mockMvc.perform(put("/api/artistas/999")
                            .contentType(MediaType.APPLICATION_JSON)
                            .content(objectMapper.writeValueAsString(createArtistaDTO)))
                    .andExpect(status().isNotFound());
        }
    }

    @Nested
    @DisplayName("DELETE /api/artistas/{id} - Eliminar artista")
    class EliminarArtistaTests {

        @Test
        @DisplayName("Debería eliminar artista existente")
        void eliminar_ArtistaExiste_Retorna204() throws Exception {
            doNothing().when(artistaService).eliminar(1L);

            mockMvc.perform(delete("/api/artistas/1"))
                    .andExpect(status().isNoContent());
        }

        @Test
        @DisplayName("Debería retornar 404 para artista inexistente")
        void eliminar_ArtistaNoExiste_Retorna404() throws Exception {
            doThrow(new ResourceNotFoundException("Artista no encontrado con id: 999"))
                    .when(artistaService).eliminar(999L);

            mockMvc.perform(delete("/api/artistas/999"))
                    .andExpect(status().isNotFound());
        }
    }
}
