package com.discsandrecords.api.controllers;

import java.math.BigDecimal;
import java.util.List;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Nested;
import org.junit.jupiter.api.Test;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.ArgumentMatchers.eq;
import static org.mockito.Mockito.doNothing;
import static org.mockito.Mockito.doThrow;
import static org.mockito.Mockito.when;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.autoconfigure.security.servlet.SecurityAutoConfiguration;
import org.springframework.boot.autoconfigure.security.servlet.UserDetailsServiceAutoConfiguration;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.data.domain.Pageable;
import org.springframework.http.MediaType;
import org.springframework.security.test.context.support.WithMockUser;
import org.springframework.test.web.servlet.MockMvc;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.delete;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.put;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.header;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

import com.discsandrecords.api.dto.AlbumResponseDTO;
import com.discsandrecords.api.dto.ArtistaResponseDTO;
import com.discsandrecords.api.dto.CreateAlbumDTO;
import com.discsandrecords.api.dto.PageResponseDTO;
import com.discsandrecords.api.exceptions.ResourceNotFoundException;
import com.discsandrecords.api.security.JwtAuthenticationFilter;
import com.discsandrecords.api.security.JwtService;
import com.discsandrecords.api.services.AlbumService;
import com.fasterxml.jackson.databind.ObjectMapper;

/**
 * Tests de integración para AlbumController
 * 
 * Prueba endpoints públicos y protegidos con diferentes roles.
 */
@WebMvcTest(
        controllers = AlbumController.class,
        excludeAutoConfiguration = {
                SecurityAutoConfiguration.class,
                UserDetailsServiceAutoConfiguration.class
        }
)
@AutoConfigureMockMvc(addFilters = false)
@SuppressWarnings("removal")
@DisplayName("AlbumController - Tests de Integración")
class AlbumControllerTest {

    @Autowired
    private MockMvc mockMvc;

    @Autowired
    private ObjectMapper objectMapper;

    @MockBean
    private AlbumService albumService;

    @MockBean
    private JwtService jwtService;

    @MockBean
    private JwtAuthenticationFilter jwtAuthenticationFilter;

    private AlbumResponseDTO albumResponse;
    private ArtistaResponseDTO artistaResponse;
    private CreateAlbumDTO createAlbumDTO;

    @BeforeEach
    void setUp() {
        artistaResponse = new ArtistaResponseDTO(1L, "The Beatles", new BigDecimal("4.50"));
        albumResponse = new AlbumResponseDTO(
                1L,
                "Abbey Road",
                1969,
                "https://example.com/abbey-road.jpg",
                new BigDecimal("4.75"),
                artistaResponse
        );
        createAlbumDTO = new CreateAlbumDTO(
                "Abbey Road",
                1969,
                "https://example.com/abbey-road.jpg",
                1L
        );
    }

    // ==========================================
    // TESTS ENDPOINTS PÚBLICOS (GET)
    // ==========================================

    @Nested
    @DisplayName("GET /api/albumes - Listar todos")
    class ListarTodosTests {

        @Test
        @DisplayName("Debería listar todos los álbumes sin autenticación")
        void listarTodos_SinAuth_Retorna200() throws Exception {
            when(albumService.listarTodos()).thenReturn(List.of(albumResponse));

            mockMvc.perform(get("/api/albumes"))
                    .andExpect(status().isOk())
                    .andExpect(jsonPath("$[0].id").value(1))
                    .andExpect(jsonPath("$[0].tituloAlbum").value("Abbey Road"))
                    .andExpect(jsonPath("$[0].anioSalida").value(1969))
                    .andExpect(jsonPath("$[0].artista.nombreArtista").value("The Beatles"));
        }

        @Test
        @DisplayName("Debería retornar lista vacía cuando no hay álbumes")
        void listarTodos_SinAlbumes_RetornaListaVacia() throws Exception {
            when(albumService.listarTodos()).thenReturn(List.of());

            mockMvc.perform(get("/api/albumes"))
                    .andExpect(status().isOk())
                    .andExpect(jsonPath("$").isArray())
                    .andExpect(jsonPath("$").isEmpty());
        }
    }

    @Nested
    @DisplayName("GET /api/albumes/paginado - Con paginación")
    class ListarPaginadoTests {

        @Test
        @DisplayName("Debería listar álbumes paginados con parámetros por defecto")
        void listarPaginado_ParametrosDefecto_Retorna200() throws Exception {
            PageResponseDTO<AlbumResponseDTO> pageResponse = new PageResponseDTO<>(
                    List.of(albumResponse), 0, 10, 1, 1, true, true
            );
            when(albumService.listarTodosPaginado(any(Pageable.class))).thenReturn(pageResponse);

            mockMvc.perform(get("/api/albumes/paginado"))
                    .andExpect(status().isOk())
                    .andExpect(jsonPath("$.content[0].tituloAlbum").value("Abbey Road"))
                    .andExpect(jsonPath("$.page").value(0))
                    .andExpect(jsonPath("$.size").value(10))
                    .andExpect(jsonPath("$.totalElements").value(1));
        }

        @Test
        @DisplayName("Debería aceptar parámetros de paginación personalizados")
        void listarPaginado_ParametrosCustom_Retorna200() throws Exception {
            PageResponseDTO<AlbumResponseDTO> pageResponse = new PageResponseDTO<>(
                    List.of(albumResponse), 1, 5, 10, 2, false, false
            );
            when(albumService.listarTodosPaginado(any(Pageable.class))).thenReturn(pageResponse);

            mockMvc.perform(get("/api/albumes/paginado")
                            .param("page", "1")
                            .param("size", "5")
                            .param("sortBy", "anioSalida")
                            .param("sortDir", "desc"))
                    .andExpect(status().isOk())
                    .andExpect(jsonPath("$.page").value(1))
                    .andExpect(jsonPath("$.size").value(5));
        }
    }

    @Nested
    @DisplayName("GET /api/albumes/{id} - Obtener por ID")
    class ObtenerPorIdTests {

        @Test
        @DisplayName("Debería obtener álbum existente por ID")
        void obtenerPorId_Existente_Retorna200() throws Exception {
            when(albumService.obtenerPorId(1L)).thenReturn(albumResponse);

            mockMvc.perform(get("/api/albumes/1"))
                    .andExpect(status().isOk())
                    .andExpect(jsonPath("$.id").value(1))
                    .andExpect(jsonPath("$.tituloAlbum").value("Abbey Road"))
                    .andExpect(jsonPath("$.artista.nombreArtista").value("The Beatles"));
        }

        @Test
        @DisplayName("Debería retornar 404 para álbum inexistente")
        void obtenerPorId_NoExiste_Retorna404() throws Exception {
            when(albumService.obtenerPorId(999L))
                    .thenThrow(new ResourceNotFoundException("Álbum", "id", 999L));

            mockMvc.perform(get("/api/albumes/999"))
                    .andExpect(status().isNotFound())
                    .andExpect(jsonPath("$.error").value("NOT_FOUND"));
        }
    }

    @Nested
    @DisplayName("GET /api/albumes/buscar - Buscar por título")
    class BuscarPorTituloTests {

        @Test
        @DisplayName("Debería buscar álbumes por título")
        void buscarPorTitulo_Encontrado_Retorna200() throws Exception {
            when(albumService.buscarPorTitulo("Abbey")).thenReturn(List.of(albumResponse));

            mockMvc.perform(get("/api/albumes/buscar")
                            .param("titulo", "Abbey"))
                    .andExpect(status().isOk())
                    .andExpect(jsonPath("$[0].tituloAlbum").value("Abbey Road"));
        }

        @Test
        @DisplayName("Debería retornar lista vacía si no encuentra coincidencias")
        void buscarPorTitulo_NoEncontrado_RetornaVacio() throws Exception {
            when(albumService.buscarPorTitulo("XYZ")).thenReturn(List.of());

            mockMvc.perform(get("/api/albumes/buscar")
                            .param("titulo", "XYZ"))
                    .andExpect(status().isOk())
                    .andExpect(jsonPath("$").isEmpty());
        }
    }

    @Nested
    @DisplayName("GET /api/albumes/artista/{idArtista} - Por artista")
    class ListarPorArtistaTests {

        @Test
        @DisplayName("Debería listar álbumes de un artista")
        void listarPorArtista_Existente_Retorna200() throws Exception {
            when(albumService.listarPorArtista(1L)).thenReturn(List.of(albumResponse));

            mockMvc.perform(get("/api/albumes/artista/1"))
                    .andExpect(status().isOk())
                    .andExpect(jsonPath("$[0].artista.id").value(1));
        }

        @Test
        @DisplayName("Debería retornar 404 si artista no existe")
        void listarPorArtista_NoExiste_Retorna404() throws Exception {
            when(albumService.listarPorArtista(999L))
                    .thenThrow(new ResourceNotFoundException("Artista", "id", 999L));

            mockMvc.perform(get("/api/albumes/artista/999"))
                    .andExpect(status().isNotFound());
        }
    }

    // ==========================================
    // TESTS ENDPOINTS PROTEGIDOS (POST/PUT/DELETE)
    // ==========================================

    @Nested
    @DisplayName("POST /api/albumes - Crear álbum")
    class CrearAlbumTests {

        @Test
        @WithMockUser(roles = "ADMIN")
        @DisplayName("ADMIN puede crear álbum - Retorna 201")
        void crear_ComoAdmin_Retorna201() throws Exception {
            when(albumService.crear(any(CreateAlbumDTO.class))).thenReturn(albumResponse);

            mockMvc.perform(post("/api/albumes")
                            .contentType(MediaType.APPLICATION_JSON)
                            .content(objectMapper.writeValueAsString(createAlbumDTO)))
                    .andExpect(status().isCreated())
                    .andExpect(header().string("Location", "/api/albumes/1"))
                    .andExpect(jsonPath("$.tituloAlbum").value("Abbey Road"));
        }

        @Test
        @WithMockUser(roles = "MODERATOR")
        @DisplayName("MODERATOR puede crear álbum - Retorna 201")
        void crear_ComoModerator_Retorna201() throws Exception {
            when(albumService.crear(any(CreateAlbumDTO.class))).thenReturn(albumResponse);

            mockMvc.perform(post("/api/albumes")
                            .contentType(MediaType.APPLICATION_JSON)
                            .content(objectMapper.writeValueAsString(createAlbumDTO)))
                    .andExpect(status().isCreated());
        }

        @Test
        @DisplayName("Debería rechazar creación con datos inválidos - 400")
        @WithMockUser(roles = "ADMIN")
        void crear_DatosInvalidos_Retorna400() throws Exception {
            CreateAlbumDTO invalido = new CreateAlbumDTO("", null, null, null);

            mockMvc.perform(post("/api/albumes")
                            .contentType(MediaType.APPLICATION_JSON)
                            .content(objectMapper.writeValueAsString(invalido)))
                    .andExpect(status().isBadRequest())
                    .andExpect(jsonPath("$.error").value("VALIDATION_ERROR"));
        }
    }

    @Nested
    @DisplayName("PUT /api/albumes/{id} - Actualizar álbum")
    class ActualizarAlbumTests {

        @Test
        @WithMockUser(roles = "ADMIN")
        @DisplayName("ADMIN puede actualizar álbum - Retorna 200")
        void actualizar_ComoAdmin_Retorna200() throws Exception {
            AlbumResponseDTO actualizado = new AlbumResponseDTO(
                    1L, "Abbey Road (Remaster)", 1969, null, new BigDecimal("4.80"), artistaResponse
            );
            when(albumService.actualizar(eq(1L), any(CreateAlbumDTO.class))).thenReturn(actualizado);

            mockMvc.perform(put("/api/albumes/1")
                            .contentType(MediaType.APPLICATION_JSON)
                            .content(objectMapper.writeValueAsString(createAlbumDTO)))
                    .andExpect(status().isOk())
                    .andExpect(jsonPath("$.tituloAlbum").value("Abbey Road (Remaster)"));
        }

        @Test
        @WithMockUser(roles = "ADMIN")
        @DisplayName("Actualizar álbum inexistente - Retorna 404")
        void actualizar_NoExiste_Retorna404() throws Exception {
            when(albumService.actualizar(eq(999L), any(CreateAlbumDTO.class)))
                    .thenThrow(new ResourceNotFoundException("Álbum", "id", 999L));

            mockMvc.perform(put("/api/albumes/999")
                            .contentType(MediaType.APPLICATION_JSON)
                            .content(objectMapper.writeValueAsString(createAlbumDTO)))
                    .andExpect(status().isNotFound());
        }
    }

    @Nested
    @DisplayName("DELETE /api/albumes/{id} - Eliminar álbum")
    class EliminarAlbumTests {

        @Test
        @WithMockUser(roles = "ADMIN")
        @DisplayName("ADMIN puede eliminar álbum - Retorna 204")
        void eliminar_ComoAdmin_Retorna204() throws Exception {
            doNothing().when(albumService).eliminar(1L);

            mockMvc.perform(delete("/api/albumes/1"))
                    .andExpect(status().isNoContent());
        }

        @Test
        @WithMockUser(roles = "ADMIN")
        @DisplayName("Eliminar álbum inexistente - Retorna 404")
        void eliminar_NoExiste_Retorna404() throws Exception {
            doThrow(new ResourceNotFoundException("Álbum", "id", 999L))
                    .when(albumService).eliminar(999L);

            mockMvc.perform(delete("/api/albumes/999"))
                    .andExpect(status().isNotFound());
        }
    }
}
