package com.discsandrecords.api.services;

import static org.assertj.core.api.Assertions.assertThat;
import static org.assertj.core.api.Assertions.assertThatThrownBy;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.ArgumentMatchers.anyLong;
import static org.mockito.Mockito.never;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;

import java.math.BigDecimal;
import java.util.List;
import java.util.Optional;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Nested;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import com.discsandrecords.api.dto.AlbumResponseDTO;
import com.discsandrecords.api.dto.CreateAlbumDTO;
import com.discsandrecords.api.entities.Album;
import com.discsandrecords.api.entities.Artista;
import com.discsandrecords.api.exceptions.BusinessRuleException;
import com.discsandrecords.api.exceptions.ResourceNotFoundException;
import com.discsandrecords.api.repositories.AlbumRepository;
import com.discsandrecords.api.repositories.ArtistaRepository;
import com.discsandrecords.api.repositories.UsuarioAlbumRepository;

/**
 * Tests unitarios para AlbumService
 * 
 * Verificamos la lógica de negocio de gestión de álbumes:
 * - CRUD básico
 * - Validaciones de negocio (año de salida)
 * - Búsquedas y filtros
 */
@ExtendWith(MockitoExtension.class)
@DisplayName("AlbumService - Tests Unitarios")
class AlbumServiceTest {

    @Mock
    private AlbumRepository albumRepository;

    @Mock
    private ArtistaRepository artistaRepository;

    @Mock
    private UsuarioAlbumRepository usuarioAlbumRepository;

    @InjectMocks
    private AlbumService albumService;

    private Artista artistaExistente;
    private Album albumExistente;
    private CreateAlbumDTO createAlbumDTO;

    @BeforeEach
    void setUp() {
        artistaExistente = Artista.builder()
                .id(1L)
                .nombreArtista("The Beatles")
                .puntuacionMedia(new BigDecimal("4.50"))
                .build();

        albumExistente = Album.builder()
                .id(1L)
                .tituloAlbum("Abbey Road")
                .anioSalida(1969)
                .portadaUrl("https://example.com/abbey-road.jpg")
                .artista(artistaExistente)
                .puntuacionMedia(new BigDecimal("4.80"))
                .build();

        createAlbumDTO = new CreateAlbumDTO(
                "Abbey Road",
                1969,
                "https://example.com/abbey-road.jpg",
                1L
        );
    }

    // ==========================================
    // TESTS DE OBTENER
    // ==========================================

    @Nested
    @DisplayName("Obtener Álbumes")
    class ObtenerTests {

        @Test
        @DisplayName("Debería listar todos los álbumes")
        void listarTodos_ConAlbumes_RetornaLista() {
            // Given
            Album album2 = Album.builder()
                    .id(2L)
                    .tituloAlbum("Let It Be")
                    .anioSalida(1970)
                    .artista(artistaExistente)
                    .build();
            
            when(albumRepository.findAll()).thenReturn(List.of(albumExistente, album2));

            // When
            List<AlbumResponseDTO> resultado = albumService.listarTodos();

            // Then
            assertThat(resultado).hasSize(2);
            assertThat(resultado.get(0).tituloAlbum()).isEqualTo("Abbey Road");
            assertThat(resultado.get(1).tituloAlbum()).isEqualTo("Let It Be");
        }

        @Test
        @DisplayName("Debería retornar lista vacía si no hay álbumes")
        void listarTodos_SinAlbumes_RetornaListaVacia() {
            // Given
            when(albumRepository.findAll()).thenReturn(List.of());

            // When
            List<AlbumResponseDTO> resultado = albumService.listarTodos();

            // Then
            assertThat(resultado).isEmpty();
        }

        @Test
        @DisplayName("Debería obtener álbum por ID")
        void obtenerPorId_IdExistente_RetornaAlbum() {
            // Given
            when(albumRepository.findById(1L)).thenReturn(Optional.of(albumExistente));

            // When
            AlbumResponseDTO resultado = albumService.obtenerPorId(1L);

            // Then
            assertThat(resultado).isNotNull();
            assertThat(resultado.id()).isEqualTo(1L);
            assertThat(resultado.tituloAlbum()).isEqualTo("Abbey Road");
            assertThat(resultado.anioSalida()).isEqualTo(1969);
            assertThat(resultado.artista().nombreArtista()).isEqualTo("The Beatles");
        }

        @Test
        @DisplayName("Debería lanzar excepción si el álbum no existe")
        void obtenerPorId_IdNoExistente_LanzaExcepcion() {
            // Given
            when(albumRepository.findById(999L)).thenReturn(Optional.empty());

            // When/Then
            assertThatThrownBy(() -> albumService.obtenerPorId(999L))
                    .isInstanceOf(ResourceNotFoundException.class)
                    .hasMessageContaining("Álbum")
                    .hasMessageContaining("999");
        }

        @Test
        @DisplayName("Debería buscar álbumes por título")
        void buscarPorTitulo_TituloExistente_RetornaAlbumes() {
            // Given
            when(albumRepository.findByTituloAlbumContainingIgnoreCase("Abbey"))
                    .thenReturn(List.of(albumExistente));

            // When
            List<AlbumResponseDTO> resultado = albumService.buscarPorTitulo("Abbey");

            // Then
            assertThat(resultado).hasSize(1);
            assertThat(resultado.get(0).tituloAlbum()).isEqualTo("Abbey Road");
        }
    }

    // ==========================================
    // TESTS DE CREAR
    // ==========================================

    @Nested
    @DisplayName("Crear Álbumes")
    class CrearTests {

        @Test
        @DisplayName("Debería crear álbum exitosamente")
        void crear_DatosValidos_RetornaAlbumCreado() {
            // Given
            when(artistaRepository.findById(1L)).thenReturn(Optional.of(artistaExistente));
            when(albumRepository.save(any(Album.class))).thenReturn(albumExistente);

            // When
            AlbumResponseDTO resultado = albumService.crear(createAlbumDTO);

            // Then
            assertThat(resultado).isNotNull();
            assertThat(resultado.tituloAlbum()).isEqualTo("Abbey Road");
            assertThat(resultado.anioSalida()).isEqualTo(1969);
            verify(albumRepository).save(any(Album.class));
        }

        @Test
        @DisplayName("Debería lanzar excepción si el artista no existe")
        void crear_ArtistaNoExistente_LanzaExcepcion() {
            // Given
            CreateAlbumDTO dtoConArtistaInvalido = new CreateAlbumDTO(
                    "Nuevo Album",
                    2024,
                    null,
                    999L
            );
            when(artistaRepository.findById(999L)).thenReturn(Optional.empty());

            // When/Then
            assertThatThrownBy(() -> albumService.crear(dtoConArtistaInvalido))
                    .isInstanceOf(ResourceNotFoundException.class)
                    .hasMessageContaining("Artista");

            verify(albumRepository, never()).save(any(Album.class));
        }

        @Test
        @DisplayName("Debería lanzar excepción si el año es más de 1 año en el futuro")
        void crear_AnioMuyFuturo_LanzaExcepcion() {
            // Given
            int anioInvalido = java.time.Year.now().getValue() + 2;
            CreateAlbumDTO dtoConAnioInvalido = new CreateAlbumDTO(
                    "Nuevo Album",
                    anioInvalido,
                    null,
                    1L
            );
            when(artistaRepository.findById(1L)).thenReturn(Optional.of(artistaExistente));

            // When/Then
            assertThatThrownBy(() -> albumService.crear(dtoConAnioInvalido))
                    .isInstanceOf(BusinessRuleException.class)
                    .hasMessageContaining("año de salida");

            verify(albumRepository, never()).save(any(Album.class));
        }

        @Test
        @DisplayName("Debería permitir año actual + 1")
        void crear_AnioProximo_CreaExitosamente() {
            // Given
            int anioValido = java.time.Year.now().getValue() + 1;
            CreateAlbumDTO dtoAnioProximo = new CreateAlbumDTO(
                    "Próximo Album",
                    anioValido,
                    null,
                    1L
            );
            Album albumFuturo = Album.builder()
                    .id(2L)
                    .tituloAlbum("Próximo Album")
                    .anioSalida(anioValido)
                    .artista(artistaExistente)
                    .build();
                    
            when(artistaRepository.findById(1L)).thenReturn(Optional.of(artistaExistente));
            when(albumRepository.save(any(Album.class))).thenReturn(albumFuturo);

            // When
            AlbumResponseDTO resultado = albumService.crear(dtoAnioProximo);

            // Then
            assertThat(resultado).isNotNull();
            assertThat(resultado.anioSalida()).isEqualTo(anioValido);
        }
    }

    // ==========================================
    // TESTS DE LISTAR POR ARTISTA
    // ==========================================

    @Nested
    @DisplayName("Listar por Artista")
    class ListarPorArtistaTests {

        @Test
        @DisplayName("Debería listar álbumes por artista")
        void listarPorArtista_ArtistaConAlbumes_RetornaAlbumes() {
            // Given
            when(artistaRepository.existsById(1L)).thenReturn(true);
            when(albumRepository.findByArtistaId(1L)).thenReturn(List.of(albumExistente));

            // When
            List<AlbumResponseDTO> resultado = albumService.listarPorArtista(1L);

            // Then
            assertThat(resultado).hasSize(1);
            assertThat(resultado.get(0).tituloAlbum()).isEqualTo("Abbey Road");
        }

        @Test
        @DisplayName("Debería lanzar excepción si el artista no existe")
        void listarPorArtista_ArtistaNoExistente_LanzaExcepcion() {
            // Given
            when(artistaRepository.existsById(999L)).thenReturn(false);

            // When/Then
            assertThatThrownBy(() -> albumService.listarPorArtista(999L))
                    .isInstanceOf(ResourceNotFoundException.class)
                    .hasMessageContaining("Artista");

            verify(albumRepository, never()).findByArtistaId(anyLong());
        }
    }
}
