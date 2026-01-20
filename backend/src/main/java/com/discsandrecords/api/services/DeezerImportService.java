package com.discsandrecords.api.services;

import java.net.URI;
import java.net.http.HttpClient;
import java.net.http.HttpRequest;
import java.net.http.HttpResponse;
import java.time.Duration;
import java.time.Instant;
import java.util.Optional;
import java.util.concurrent.ConcurrentHashMap;
import java.util.concurrent.locks.ReentrantLock;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.discsandrecords.api.dto.AlbumResponseDTO;
import com.discsandrecords.api.dto.ArtistaResponseDTO;
import com.discsandrecords.api.entities.Album;
import com.discsandrecords.api.entities.Artista;
import com.discsandrecords.api.exceptions.BusinessRuleException;
import com.discsandrecords.api.repositories.AlbumRepository;
import com.discsandrecords.api.repositories.ArtistaRepository;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;

/**
 * DeezerImportService - Servicio de Importación de Deezer
 * 
 * PATRÓN: Hidratación Anticipada (Eager Hydration)
 * 
 * Este servicio maneja la importación de álbumes y artistas desde Deezer
 * a la base de datos local. Es el "puente" entre los datos efímeros de
 * búsqueda y los datos persistentes para gestión de listas.
 * 
 * CARACTERÍSTICAS:
 * 1. Thread-safe: Usa locks por deezerId para evitar duplicados en concurrencia
 * 2. Idempotente: Si el álbum ya existe, lo devuelve sin re-importar
 * 3. Cascada: Importa automáticamente el artista si no existe
 * 4. Defensivo: Valida y sanitiza todos los datos de Deezer
 * 5. Transaccional: Garantiza consistencia de datos
 * 
 * FLUJO:
 * 1. Frontend hace clic en card de álbum de Deezer
 * 2. Llama a GET /api/albumes/deezer/{deezerId}
 * 3. Este servicio verifica si existe en BD
 * 4. Si NO existe: llama a Deezer API, mapea, guarda, devuelve
 * 5. Si SÍ existe: devuelve el existente
 * 6. Frontend recibe DTO con ID interno y navega a /album/{id_local}
 */
@Service
public class DeezerImportService {

    private static final Logger log = LoggerFactory.getLogger(DeezerImportService.class);
    private static final String DEEZER_API_BASE = "https://api.deezer.com";
    
    // Locks por deezerId para evitar importaciones concurrentes del mismo álbum
    private final ConcurrentHashMap<String, ReentrantLock> albumLocks = new ConcurrentHashMap<>();
    private final ConcurrentHashMap<String, ReentrantLock> artistaLocks = new ConcurrentHashMap<>();
    
    // Límites para truncamiento de datos
    private static final int MAX_TITULO_LENGTH = 150;
    private static final int MAX_NOMBRE_ARTISTA_LENGTH = 100;
    private static final int MAX_SELLO_LENGTH = 100;
    private static final int MAX_URL_LENGTH = 255;
    
    private final HttpClient httpClient;
    private final ObjectMapper objectMapper;
    private final AlbumRepository albumRepository;
    private final ArtistaRepository artistaRepository;

    public DeezerImportService(AlbumRepository albumRepository, ArtistaRepository artistaRepository) {
        this.albumRepository = albumRepository;
        this.artistaRepository = artistaRepository;
        this.objectMapper = new ObjectMapper();
        this.httpClient = HttpClient.newBuilder()
                .connectTimeout(Duration.ofSeconds(10))
                .build();
    }

    // ==========================================================================
    // IMPORTACIÓN DE ÁLBUM (Método Principal)
    // ==========================================================================

    /**
     * Importa o recupera un álbum por su ID de Deezer.
     * 
     * THREAD-SAFE: Usa lock por deezerId para evitar duplicados.
     * IDEMPOTENTE: Si ya existe, lo devuelve sin modificar.
     * 
     * @param deezerId ID del álbum en Deezer (ej: "302127")
     * @return DTO del álbum local (con ID interno)
     * @throws BusinessRuleException si Deezer falla o datos inválidos
     */
    @Transactional
    public AlbumResponseDTO importarORecuperarAlbum(String deezerId) {
        log.info("Importación solicitada para álbum Deezer ID: {}", deezerId);
        
        // Validar formato de deezerId
        if (deezerId == null || deezerId.isBlank()) {
            throw new BusinessRuleException("El ID de Deezer no puede estar vacío", "DEEZER_ID_INVALIDO");
        }
        
        // 1. Verificar si ya existe (sin lock, lectura rápida)
        Optional<Album> existente = albumRepository.findByDeezerId(deezerId);
        if (existente.isPresent()) {
            log.debug("Álbum Deezer {} ya existe en BD con ID local {}", deezerId, existente.get().getId());
            return toAlbumResponseDTO(existente.get());
        }
        
        // 2. Obtener lock para este deezerId específico
        ReentrantLock lock = albumLocks.computeIfAbsent(deezerId, k -> new ReentrantLock());
        lock.lock();
        
        try {
            // 3. Double-check después de obtener lock (otro hilo pudo importar)
            existente = albumRepository.findByDeezerId(deezerId);
            if (existente.isPresent()) {
                log.debug("Álbum Deezer {} importado por otro hilo, ID local {}", deezerId, existente.get().getId());
                return toAlbumResponseDTO(existente.get());
            }
            
            // 4. Llamar a Deezer API
            JsonNode deezerData = fetchFromDeezer("/album/" + deezerId);
            
            // 5. Validar respuesta de Deezer
            if (deezerData.has("error")) {
                String errorMsg = deezerData.path("error").path("message").asText("Error desconocido de Deezer");
                log.error("Deezer API error para álbum {}: {}", deezerId, errorMsg);
                throw new BusinessRuleException("No se pudo obtener el álbum de Deezer: " + errorMsg, "DEEZER_API_ERROR");
            }
            
            // 6. Importar artista primero (cascada)
            JsonNode artistNode = deezerData.path("artist");
            if (artistNode.isMissingNode() || artistNode.isNull()) {
                throw new BusinessRuleException("El álbum de Deezer no tiene artista asociado", "DEEZER_DATOS_INCOMPLETOS");
            }
            
            Artista artista = importarORecuperarArtistaInterno(
                    String.valueOf(artistNode.path("id").asLong()),
                    artistNode
            );
            
            // 7. Crear álbum con mapeo defensivo
            Album album = mapearAlbumDesdeDeezer(deezerData, artista, deezerId);
            
            // 8. Persistir con manejo de DataIntegrityViolationException
            try {
                album = albumRepository.save(album);
                log.info("Álbum importado exitosamente: {} (ID local: {}, Deezer ID: {})", 
                        album.getTituloAlbum(), album.getId(), deezerId);
            } catch (DataIntegrityViolationException e) {
                // Otro hilo insertó justo antes - recuperar el existente
                log.warn("Conflicto de integridad para álbum Deezer {}, recuperando existente", deezerId);
                existente = albumRepository.findByDeezerId(deezerId);
                if (existente.isPresent()) {
                    return toAlbumResponseDTO(existente.get());
                }
                throw new BusinessRuleException("Error de concurrencia al importar álbum", "IMPORT_CONCURRENCY_ERROR");
            }
            
            return toAlbumResponseDTO(album);
            
        } finally {
            lock.unlock();
            // Limpiar lock si no hay otros esperando
            albumLocks.remove(deezerId, lock);
        }
    }

    // ==========================================================================
    // IMPORTACIÓN DE ARTISTA
    // ==========================================================================

    /**
     * Importa o recupera un artista por su ID de Deezer.
     * 
     * @param deezerId ID del artista en Deezer
     * @return DTO del artista local
     */
    @Transactional
    public ArtistaResponseDTO importarORecuperarArtista(String deezerId) {
        log.info("Importación solicitada para artista Deezer ID: {}", deezerId);
        
        if (deezerId == null || deezerId.isBlank()) {
            throw new BusinessRuleException("El ID de Deezer del artista no puede estar vacío", "DEEZER_ID_INVALIDO");
        }
        
        Optional<Artista> existente = artistaRepository.findByDeezerId(deezerId);
        if (existente.isPresent()) {
            return toArtistaResponseDTO(existente.get());
        }
        
        // Obtener datos de Deezer
        JsonNode deezerData = fetchFromDeezer("/artist/" + deezerId);
        
        if (deezerData.has("error")) {
            throw new BusinessRuleException("No se pudo obtener el artista de Deezer", "DEEZER_API_ERROR");
        }
        
        Artista artista = importarORecuperarArtistaInterno(deezerId, deezerData);
        return toArtistaResponseDTO(artista);
    }

    /**
     * Método interno para importar artista (usado por importación de álbum).
     */
    private Artista importarORecuperarArtistaInterno(String deezerId, JsonNode artistData) {
        // Verificar si ya existe
        Optional<Artista> existente = artistaRepository.findByDeezerId(deezerId);
        if (existente.isPresent()) {
            return existente.get();
        }
        
        // Lock para evitar duplicados
        ReentrantLock lock = artistaLocks.computeIfAbsent(deezerId, k -> new ReentrantLock());
        lock.lock();
        
        try {
            // Double-check
            existente = artistaRepository.findByDeezerId(deezerId);
            if (existente.isPresent()) {
                return existente.get();
            }
            
            // Mapear y guardar
            Artista artista = mapearArtistaDesdeDeezer(artistData, deezerId);
            
            try {
                artista = artistaRepository.save(artista);
                log.info("Artista importado: {} (ID local: {}, Deezer ID: {})", 
                        artista.getNombreArtista(), artista.getId(), deezerId);
            } catch (DataIntegrityViolationException e) {
                log.warn("Conflicto de integridad para artista Deezer {}, recuperando existente", deezerId);
                existente = artistaRepository.findByDeezerId(deezerId);
                if (existente.isPresent()) {
                    return existente.get();
                }
                throw new BusinessRuleException("Error de concurrencia al importar artista", "IMPORT_CONCURRENCY_ERROR");
            }
            
            return artista;
            
        } finally {
            lock.unlock();
            artistaLocks.remove(deezerId, lock);
        }
    }

    // ==========================================================================
    // LLAMADAS A DEEZER API
    // ==========================================================================

    /**
     * Realiza una llamada GET a la API de Deezer.
     * 
     * @param endpoint Endpoint de Deezer (ej: "/album/302127")
     * @return JsonNode con la respuesta
     * @throws BusinessRuleException si la llamada falla
     */
    private JsonNode fetchFromDeezer(String endpoint) {
        String url = DEEZER_API_BASE + endpoint;
        log.debug("Llamando a Deezer API: {}", url);
        
        try {
            HttpRequest request = HttpRequest.newBuilder()
                    .uri(URI.create(url))
                    .header("Accept", "application/json")
                    .header("User-Agent", "DiscsAndRecords/1.0")
                    .timeout(Duration.ofSeconds(15))
                    .GET()
                    .build();
            
            HttpResponse<String> response = httpClient.send(request, HttpResponse.BodyHandlers.ofString());
            
            int statusCode = response.statusCode();
            
            // Manejar rate limiting de Deezer
            if (statusCode == 429 || statusCode == 403) {
                log.error("Deezer rate limit alcanzado (status {})", statusCode);
                throw new BusinessRuleException(
                        "Deezer no responde temporalmente. Por favor, intenta más tarde.",
                        "DEEZER_RATE_LIMIT"
                );
            }
            
            if (statusCode != 200) {
                log.error("Deezer API respondió con status {}", statusCode);
                throw new BusinessRuleException(
                        "Error al comunicarse con Deezer (código: " + statusCode + ")",
                        "DEEZER_API_ERROR"
                );
            }
            
            return objectMapper.readTree(response.body());
            
        } catch (BusinessRuleException e) {
            throw e; // Re-throw business exceptions
        } catch (Exception e) {
            log.error("Error al llamar a Deezer API: {}", e.getMessage());
            throw new BusinessRuleException(
                    "No se pudo conectar con Deezer: " + e.getMessage(),
                    "DEEZER_CONNECTION_ERROR"
            );
        }
    }

    // ==========================================================================
    // MAPEO DEFENSIVO (Deezer → Entidad)
    // ==========================================================================

    /**
     * Mapea datos de Deezer a entidad Album con validación defensiva.
     * 
     * Maneja:
     * - Títulos muy largos → Truncar
     * - Fechas inválidas → Año actual
     * - URLs inválidas → null
     * - Datos faltantes → Valores por defecto
     */
    private Album mapearAlbumDesdeDeezer(JsonNode data, Artista artista, String deezerId) {
        // Título (obligatorio, truncar si excede)
        String titulo = data.path("title").asText("Sin título");
        titulo = truncar(titulo, MAX_TITULO_LENGTH);
        
        // Año de salida (extraer de release_date o usar año actual)
        int anioSalida = extraerAnio(data.path("release_date").asText(""));
        
        // URL de portada (validar formato)
        String portadaUrl = data.path("cover_xl").asText(null);
        if (portadaUrl == null || portadaUrl.isBlank()) {
            portadaUrl = data.path("cover_big").asText(null);
        }
        if (portadaUrl == null || portadaUrl.isBlank()) {
            portadaUrl = data.path("cover_medium").asText(null);
        }
        portadaUrl = validarUrl(portadaUrl);
        
        // Metadata adicional
        Integer numTracks = data.path("nb_tracks").asInt(0);
        Integer duracion = data.path("duration").asInt(0);
        String sello = truncar(data.path("label").asText(null), MAX_SELLO_LENGTH);
        
        return Album.builder()
                .deezerId(deezerId)
                .tituloAlbum(titulo)
                .anioSalida(anioSalida)
                .portadaUrl(portadaUrl)
                .artista(artista)
                .fechaImportacion(Instant.now())
                .numTracks(numTracks > 0 ? numTracks : null)
                .duracionTotal(duracion > 0 ? duracion : null)
                .sello(sello)
                .puntuacionMedia(null) // Se calcula desde reseñas locales
                .build();
    }

    /**
     * Mapea datos de Deezer a entidad Artista con validación defensiva.
     */
    private Artista mapearArtistaDesdeDeezer(JsonNode data, String deezerId) {
        String nombre = data.path("name").asText("Artista Desconocido");
        nombre = truncar(nombre, MAX_NOMBRE_ARTISTA_LENGTH);
        
        String imagenUrl = data.path("picture_xl").asText(null);
        if (imagenUrl == null || imagenUrl.isBlank()) {
            imagenUrl = data.path("picture_big").asText(null);
        }
        if (imagenUrl == null || imagenUrl.isBlank()) {
            imagenUrl = data.path("picture_medium").asText(null);
        }
        imagenUrl = validarUrl(imagenUrl);
        
        return Artista.builder()
                .deezerId(deezerId)
                .nombreArtista(nombre)
                .imagenUrl(imagenUrl)
                .fechaImportacion(Instant.now())
                .puntuacionMedia(null)
                .build();
    }

    // ==========================================================================
    // UTILIDADES DE VALIDACIÓN Y SANITIZACIÓN
    // ==========================================================================

    /**
     * Trunca un string a la longitud máxima especificada.
     */
    private String truncar(String valor, int maxLength) {
        if (valor == null) return null;
        if (valor.length() <= maxLength) return valor;
        
        log.debug("Truncando valor de {} a {} caracteres", valor.length(), maxLength);
        return valor.substring(0, maxLength);
    }

    /**
     * Extrae el año de una fecha en formato "YYYY-MM-DD".
     * Si falla, devuelve el año actual.
     */
    private int extraerAnio(String releaseDate) {
        if (releaseDate == null || releaseDate.isBlank()) {
            return java.time.Year.now().getValue();
        }
        
        try {
            // Formato esperado: "2024-01-15" o "2024"
            String yearPart = releaseDate.split("-")[0];
            int year = Integer.parseInt(yearPart);
            
            // Validar rango razonable (1900-2100)
            if (year < 1900 || year > 2100) {
                return java.time.Year.now().getValue();
            }
            
            return year;
        } catch (Exception e) {
            log.warn("No se pudo parsear fecha '{}', usando año actual", releaseDate);
            return java.time.Year.now().getValue();
        }
    }

    /**
     * Valida formato básico de URL.
     * Devuelve null si es inválida.
     */
    private String validarUrl(String url) {
        if (url == null || url.isBlank()) {
            return null;
        }
        
        // Validar que empieza con http/https
        if (!url.startsWith("http://") && !url.startsWith("https://")) {
            log.debug("URL inválida (no empieza con http): {}", url);
            return null;
        }
        
        // Truncar si excede longitud máxima
        if (url.length() > MAX_URL_LENGTH) {
            log.debug("URL truncada de {} a {} caracteres", url.length(), MAX_URL_LENGTH);
            return url.substring(0, MAX_URL_LENGTH);
        }
        
        return url;
    }

    // ==========================================================================
    // CONVERSIÓN A DTOs
    // ==========================================================================

    private AlbumResponseDTO toAlbumResponseDTO(Album album) {
        ArtistaResponseDTO artistaDTO = new ArtistaResponseDTO(
                album.getArtista().getId(),
                album.getArtista().getNombreArtista(),
                album.getArtista().getPuntuacionMedia()
        );

        return new AlbumResponseDTO(
                album.getId(),
                album.getTituloAlbum(),
                album.getAnioSalida(),
                album.getPortadaUrl(),
                album.getPuntuacionMedia(),
                artistaDTO
        );
    }

    private ArtistaResponseDTO toArtistaResponseDTO(Artista artista) {
        return new ArtistaResponseDTO(
                artista.getId(),
                artista.getNombreArtista(),
                artista.getPuntuacionMedia()
        );
    }
}
