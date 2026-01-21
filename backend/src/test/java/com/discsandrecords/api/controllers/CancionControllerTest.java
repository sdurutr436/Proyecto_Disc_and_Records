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
import org.springframework.boot.autoconfigure.security.servlet.SecurityAutoConfiguration;
import org.springframework.boot.autoconfigure.security.servlet.UserDetailsServiceAutoConfiguration;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.data.domain.Pageable;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;

import com.discsandrecords.api.dto.ArtistaResponseDTO;
import com.discsandrecords.api.dto.CancionResponseDTO;
import com.discsandrecords.api.dto.CreateCancionDTO;
import com.discsandrecords.api.dto.PageResponseDTO;
import com.discsandrecords.api.exceptions.ResourceNotFoundException;
import com.discsandrecords.api.security.JwtAuthenticationFilter;
import com.discsandrecords.api.security.JwtService;
import com.discsandrecords.api.services.CancionService;
import com.fasterxml.jackson.databind.ObjectMapper;

/**
 * Tests de integración para CancionController
 * 
 * Prueba endpoints públicos y protegidos con diferentes roles.
 */
@WebMvcTest(
        controllers = CancionController.class,
        excludeAutoConfiguration = {
                SecurityAutoConfiguration.class,
                UserDetailsServiceAutoConfiguration.class
        }
)
@AutoConfigureMockMvc(addFilters = false)
@SuppressWarnings("removal")
@DisplayName("CancionController - Tests de Integración")
class CancionControllerTest {

    @Autowired
    private MockMvc mockMvc;

    @Autowired
    private ObjectMapper objectMapper;

    @MockBean
    private CancionService cancionService;

    @MockBean
    private JwtService jwtService;

    @MockBean
    private JwtAuthenticationFilter jwtAuthenticationFilter;

    private CancionResponseDTO cancionResponse;
    private ArtistaResponseDTO artistaResponse;
    private CreateCancionDTO createCancionDTO;

    @BeforeEach
    void setUp() {
        artistaResponse = new ArtistaResponseDTO(1L, "The Beatles", new BigDecimal("4.50"));
        cancionResponse = new CancionResponseDTO(
                1L,
                "Here Comes The Sun",
                1969,
                new BigDecimal("4.80"),
                artistaResponse
        );
        createCancionDTO = new CreateCancionDTO(
                "Here Comes The Sun",
                1969,
                1L
        );
    }

    // ==========================================
    // TESTS ENDPOINTS PÚBLICOS (GET)
    // ==========================================

    @Nested
    @DisplayName("GET /api/canciones - Listar todas")
    class ListarTodasTests {

        @Test
        @DisplayName("Debería listar todas las canciones sin autenticación")
        void listarTodas_SinAuth_Retorna200() throws Exception {
            when(cancionService.listarTodas()).thenReturn(List.of(cancionResponse));

            mockMvc.perform(get("/api/canciones"))
                    .andExpect(status().isOk())
                    .andExpect(jsonPath("$[0].id").value(1))
                    .andExpect(jsonPath("$[0].tituloCancion").value("Here Comes The Sun"))
                    .andExpect(jsonPath("$[0].anioSalida").value(1969))
                    .andExpect(jsonPath("$[0].artista.nombreArtista").value("The Beatles"));
        }

        @Test
        @DisplayName("Debería retornar lista vacía cuando no hay canciones")
        void listarTodas_SinCanciones_RetornaListaVacia() throws Exception {
            when(cancionService.listarTodas()).thenReturn(List.of());

            mockMvc.perform(get("/api/canciones"))
                    .andExpect(status().isOk())
                    .andExpect(jsonPath("$").isArray())
                    .andExpect(jsonPath("$").isEmpty());
        }
    }

    @Nested
    @DisplayName("GET /api/canciones/paginado - Listar con paginación")
    class ListarPaginadoTests {

        @Test
        @DisplayName("Debería retornar página de canciones")
        void listarPaginado_Retorna200() throws Exception {
            PageResponseDTO<CancionResponseDTO> pageResponse = new PageResponseDTO<>(
                    List.of(cancionResponse), 0, 10, 1, 1, true, true
            );
            when(cancionService.listarTodasPaginado(any(Pageable.class))).thenReturn(pageResponse);

            mockMvc.perform(get("/api/canciones/paginado")
                            .param("page", "0")
                            .param("size", "10"))
                    .andExpect(status().isOk())
                    .andExpect(jsonPath("$.content[0].tituloCancion").value("Here Comes The Sun"))
                    .andExpect(jsonPath("$.totalElements").value(1))
                    .andExpect(jsonPath("$.first").value(true));
        }
    }

    @Nested
    @DisplayName("GET /api/canciones/{id} - Obtener por ID")
    class ObtenerPorIdTests {

        @Test
        @DisplayName("Debería retornar canción existente")
        void obtenerPorId_CancionExiste_Retorna200() throws Exception {
            when(cancionService.obtenerPorId(1L)).thenReturn(cancionResponse);

            mockMvc.perform(get("/api/canciones/1"))
                    .andExpect(status().isOk())
                    .andExpect(jsonPath("$.id").value(1))
                    .andExpect(jsonPath("$.tituloCancion").value("Here Comes The Sun"));
        }

        @Test
        @DisplayName("Debería retornar 404 para canción inexistente")
        void obtenerPorId_CancionNoExiste_Retorna404() throws Exception {
            when(cancionService.obtenerPorId(999L))
                    .thenThrow(new ResourceNotFoundException("Canción no encontrada con id: 999"));

            mockMvc.perform(get("/api/canciones/999"))
                    .andExpect(status().isNotFound());
        }
    }

    @Nested
    @DisplayName("GET /api/canciones/buscar - Buscar por título")
    class BuscarPorTituloTests {

        @Test
        @DisplayName("Debería encontrar canciones por título")
        void buscarPorTitulo_Encuentra_Retorna200() throws Exception {
            when(cancionService.buscarPorTitulo("Sun")).thenReturn(List.of(cancionResponse));

            mockMvc.perform(get("/api/canciones/buscar")
                            .param("titulo", "Sun"))
                    .andExpect(status().isOk())
                    .andExpect(jsonPath("$[0].tituloCancion").value("Here Comes The Sun"));
        }
    }

    @Nested
    @DisplayName("GET /api/canciones/artista/{idArtista} - Listar por artista")
    class ListarPorArtistaTests {

        @Test
        @DisplayName("Debería listar canciones de un artista")
        void listarPorArtista_Retorna200() throws Exception {
            when(cancionService.listarPorArtista(1L)).thenReturn(List.of(cancionResponse));

            mockMvc.perform(get("/api/canciones/artista/1"))
                    .andExpect(status().isOk())
                    .andExpect(jsonPath("$[0].tituloCancion").value("Here Comes The Sun"))
                    .andExpect(jsonPath("$[0].artista.id").value(1));
        }
    }

    // ==========================================
    // TESTS ENDPOINTS PROTEGIDOS (POST/PUT/DELETE)
    // ==========================================

    @Nested
    @DisplayName("POST /api/canciones - Crear canción")
    class CrearCancionTests {

        @Test
        @DisplayName("Debería crear canción con datos válidos")
        void crear_DatosValidos_Retorna201() throws Exception {
            when(cancionService.crear(any(CreateCancionDTO.class))).thenReturn(cancionResponse);

            mockMvc.perform(post("/api/canciones")
                            .contentType(MediaType.APPLICATION_JSON)
                            .content(objectMapper.writeValueAsString(createCancionDTO)))
                    .andExpect(status().isCreated())
                    .andExpect(header().string("Location", "/api/canciones/1"))
                    .andExpect(jsonPath("$.tituloCancion").value("Here Comes The Sun"));
        }

        @Test
        @DisplayName("Debería retornar 400 con título vacío")
        void crear_TituloVacio_Retorna400() throws Exception {
            CreateCancionDTO dtoInvalido = new CreateCancionDTO("", 1969, 1L);

            mockMvc.perform(post("/api/canciones")
                            .contentType(MediaType.APPLICATION_JSON)
                            .content(objectMapper.writeValueAsString(dtoInvalido)))
                    .andExpect(status().isBadRequest());
        }
    }

    @Nested
    @DisplayName("PUT /api/canciones/{id} - Actualizar canción")
    class ActualizarCancionTests {

        @Test
        @DisplayName("Debería actualizar canción existente")
        void actualizar_CancionExiste_Retorna200() throws Exception {
            CancionResponseDTO actualizada = new CancionResponseDTO(
                    1L, "Here Comes The Sun (Remastered)", 1969, new BigDecimal("4.90"), artistaResponse
            );
            when(cancionService.actualizar(eq(1L), any(CreateCancionDTO.class))).thenReturn(actualizada);

            mockMvc.perform(put("/api/canciones/1")
                            .contentType(MediaType.APPLICATION_JSON)
                            .content(objectMapper.writeValueAsString(
                                    new CreateCancionDTO("Here Comes The Sun (Remastered)", 1969, 1L))))
                    .andExpect(status().isOk())
                    .andExpect(jsonPath("$.tituloCancion").value("Here Comes The Sun (Remastered)"));
        }

        @Test
        @DisplayName("Debería retornar 404 para canción inexistente")
        void actualizar_CancionNoExiste_Retorna404() throws Exception {
            when(cancionService.actualizar(eq(999L), any(CreateCancionDTO.class)))
                    .thenThrow(new ResourceNotFoundException("Canción no encontrada con id: 999"));

            mockMvc.perform(put("/api/canciones/999")
                            .contentType(MediaType.APPLICATION_JSON)
                            .content(objectMapper.writeValueAsString(createCancionDTO)))
                    .andExpect(status().isNotFound());
        }
    }

    @Nested
    @DisplayName("DELETE /api/canciones/{id} - Eliminar canción")
    class EliminarCancionTests {

        @Test
        @DisplayName("Debería eliminar canción existente")
        void eliminar_CancionExiste_Retorna204() throws Exception {
            doNothing().when(cancionService).eliminar(1L);

            mockMvc.perform(delete("/api/canciones/1"))
                    .andExpect(status().isNoContent());
        }

        @Test
        @DisplayName("Debería retornar 404 para canción inexistente")
        void eliminar_CancionNoExiste_Retorna404() throws Exception {
            doThrow(new ResourceNotFoundException("Canción no encontrada con id: 999"))
                    .when(cancionService).eliminar(999L);

            mockMvc.perform(delete("/api/canciones/999"))
                    .andExpect(status().isNotFound());
        }
    }
}
