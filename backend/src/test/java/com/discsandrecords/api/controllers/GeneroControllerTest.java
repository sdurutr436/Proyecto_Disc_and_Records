package com.discsandrecords.api.controllers;

import static org.mockito.ArgumentMatchers.any;
import static org.mockito.ArgumentMatchers.eq;
import static org.mockito.Mockito.doNothing;
import static org.mockito.Mockito.doThrow;
import static org.mockito.Mockito.when;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

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

import com.discsandrecords.api.dto.CreateGeneroDTO;
import com.discsandrecords.api.dto.GeneroResponseDTO;
import com.discsandrecords.api.dto.PageResponseDTO;
import com.discsandrecords.api.exceptions.ResourceNotFoundException;
import com.discsandrecords.api.security.JwtService;
import com.discsandrecords.api.services.GeneroService;
import com.fasterxml.jackson.databind.ObjectMapper;

/**
 * Tests de integración para GeneroController
 * 
 * Prueba endpoints públicos y protegidos con diferentes roles.
 */
@WebMvcTest(GeneroController.class)
@AutoConfigureMockMvc(addFilters = false)
@DisplayName("GeneroController - Tests de Integración")
class GeneroControllerTest {

    @Autowired
    private MockMvc mockMvc;

    @Autowired
    private ObjectMapper objectMapper;

    @MockBean
    private GeneroService generoService;

    @MockBean
    private JwtService jwtService;

    private GeneroResponseDTO generoResponse;
    private CreateGeneroDTO createGeneroDTO;

    @BeforeEach
    void setUp() {
        generoResponse = new GeneroResponseDTO(1L, "Rock", "Música rock clásica", "#FF5733");
        createGeneroDTO = new CreateGeneroDTO("Rock", "Música rock clásica", "#FF5733");
    }

    // ==========================================
    // TESTS ENDPOINTS PÚBLICOS (GET)
    // ==========================================

    @Nested
    @DisplayName("GET /api/generos - Listar todos")
    class ListarTodosTests {

        @Test
        @DisplayName("Debería listar todos los géneros sin autenticación")
        void listarTodos_SinAuth_Retorna200() throws Exception {
            when(generoService.listarTodos()).thenReturn(List.of(generoResponse));

            mockMvc.perform(get("/api/generos"))
                    .andExpect(status().isOk())
                    .andExpect(jsonPath("$[0].id").value(1))
                    .andExpect(jsonPath("$[0].nombreGenero").value("Rock"))
                    .andExpect(jsonPath("$[0].descripcion").value("Música rock clásica"))
                    .andExpect(jsonPath("$[0].color").value("#FF5733"));
        }

        @Test
        @DisplayName("Debería retornar lista vacía cuando no hay géneros")
        void listarTodos_SinGeneros_RetornaListaVacia() throws Exception {
            when(generoService.listarTodos()).thenReturn(List.of());

            mockMvc.perform(get("/api/generos"))
                    .andExpect(status().isOk())
                    .andExpect(jsonPath("$").isArray())
                    .andExpect(jsonPath("$").isEmpty());
        }
    }

    @Nested
    @DisplayName("GET /api/generos/paginado - Listar con paginación")
    class ListarPaginadoTests {

        @Test
        @DisplayName("Debería retornar página de géneros")
        void listarPaginado_Retorna200() throws Exception {
            PageResponseDTO<GeneroResponseDTO> pageResponse = new PageResponseDTO<>(
                    List.of(generoResponse), 0, 10, 1, 1, true, true
            );
            when(generoService.listarTodosPaginado(any(Pageable.class))).thenReturn(pageResponse);

            mockMvc.perform(get("/api/generos/paginado")
                            .param("page", "0")
                            .param("size", "10"))
                    .andExpect(status().isOk())
                    .andExpect(jsonPath("$.content[0].nombreGenero").value("Rock"))
                    .andExpect(jsonPath("$.totalElements").value(1))
                    .andExpect(jsonPath("$.first").value(true));
        }
    }

    @Nested
    @DisplayName("GET /api/generos/{id} - Obtener por ID")
    class ObtenerPorIdTests {

        @Test
        @DisplayName("Debería retornar género existente")
        void obtenerPorId_GeneroExiste_Retorna200() throws Exception {
            when(generoService.obtenerPorId(1L)).thenReturn(generoResponse);

            mockMvc.perform(get("/api/generos/1"))
                    .andExpect(status().isOk())
                    .andExpect(jsonPath("$.id").value(1))
                    .andExpect(jsonPath("$.nombreGenero").value("Rock"));
        }

        @Test
        @DisplayName("Debería retornar 404 para género inexistente")
        void obtenerPorId_GeneroNoExiste_Retorna404() throws Exception {
            when(generoService.obtenerPorId(999L))
                    .thenThrow(new ResourceNotFoundException("Género no encontrado con id: 999"));

            mockMvc.perform(get("/api/generos/999"))
                    .andExpect(status().isNotFound());
        }
    }

    @Nested
    @DisplayName("GET /api/generos/buscar - Buscar por nombre")
    class BuscarPorNombreTests {

        @Test
        @DisplayName("Debería encontrar géneros por nombre")
        void buscarPorNombre_Encuentra_Retorna200() throws Exception {
            when(generoService.buscarPorNombre("Rock")).thenReturn(List.of(generoResponse));

            mockMvc.perform(get("/api/generos/buscar")
                            .param("nombre", "Rock"))
                    .andExpect(status().isOk())
                    .andExpect(jsonPath("$[0].nombreGenero").value("Rock"));
        }
    }

    // ==========================================
    // TESTS ENDPOINTS PROTEGIDOS (POST/PUT/DELETE)
    // ==========================================

    @Nested
    @DisplayName("POST /api/generos - Crear género")
    class CrearGeneroTests {

        @Test
        @DisplayName("Debería crear género con datos válidos")
        void crear_DatosValidos_Retorna201() throws Exception {
            when(generoService.crear(any(CreateGeneroDTO.class))).thenReturn(generoResponse);

            mockMvc.perform(post("/api/generos")
                            .contentType(MediaType.APPLICATION_JSON)
                            .content(objectMapper.writeValueAsString(createGeneroDTO)))
                    .andExpect(status().isCreated())
                    .andExpect(header().string("Location", "/api/generos/1"))
                    .andExpect(jsonPath("$.nombreGenero").value("Rock"));
        }

        @Test
        @DisplayName("Debería retornar 400 con nombre vacío")
        void crear_NombreVacio_Retorna400() throws Exception {
            CreateGeneroDTO dtoInvalido = new CreateGeneroDTO("", null, null);

            mockMvc.perform(post("/api/generos")
                            .contentType(MediaType.APPLICATION_JSON)
                            .content(objectMapper.writeValueAsString(dtoInvalido)))
                    .andExpect(status().isBadRequest());
        }
    }

    @Nested
    @DisplayName("PUT /api/generos/{id} - Actualizar género")
    class ActualizarGeneroTests {

        @Test
        @DisplayName("Debería actualizar género existente")
        void actualizar_GeneroExiste_Retorna200() throws Exception {
            GeneroResponseDTO actualizado = new GeneroResponseDTO(1L, "Rock Clásico", "Rock de los 60s y 70s", "#FF0000");
            when(generoService.actualizar(eq(1L), any(CreateGeneroDTO.class))).thenReturn(actualizado);

            mockMvc.perform(put("/api/generos/1")
                            .contentType(MediaType.APPLICATION_JSON)
                            .content(objectMapper.writeValueAsString(
                                    new CreateGeneroDTO("Rock Clásico", "Rock de los 60s y 70s", "#FF0000"))))
                    .andExpect(status().isOk())
                    .andExpect(jsonPath("$.nombreGenero").value("Rock Clásico"));
        }

        @Test
        @DisplayName("Debería retornar 404 para género inexistente")
        void actualizar_GeneroNoExiste_Retorna404() throws Exception {
            when(generoService.actualizar(eq(999L), any(CreateGeneroDTO.class)))
                    .thenThrow(new ResourceNotFoundException("Género no encontrado con id: 999"));

            mockMvc.perform(put("/api/generos/999")
                            .contentType(MediaType.APPLICATION_JSON)
                            .content(objectMapper.writeValueAsString(createGeneroDTO)))
                    .andExpect(status().isNotFound());
        }
    }

    @Nested
    @DisplayName("DELETE /api/generos/{id} - Eliminar género")
    class EliminarGeneroTests {

        @Test
        @DisplayName("Debería eliminar género existente")
        void eliminar_GeneroExiste_Retorna204() throws Exception {
            doNothing().when(generoService).eliminar(1L);

            mockMvc.perform(delete("/api/generos/1"))
                    .andExpect(status().isNoContent());
        }

        @Test
        @DisplayName("Debería retornar 404 para género inexistente")
        void eliminar_GeneroNoExiste_Retorna404() throws Exception {
            doThrow(new ResourceNotFoundException("Género no encontrado con id: 999"))
                    .when(generoService).eliminar(999L);

            mockMvc.perform(delete("/api/generos/999"))
                    .andExpect(status().isNotFound());
        }
    }
}
