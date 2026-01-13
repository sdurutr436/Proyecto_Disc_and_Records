package com.discsandrecords.api.controllers;

import java.net.URI;
import java.net.http.HttpClient;
import java.net.http.HttpRequest;
import java.net.http.HttpResponse;
import java.time.Duration;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.discsandrecords.api.services.DeezerCacheService;
import com.discsandrecords.api.services.DeezerCacheService.CachedResponse;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.servlet.http.HttpServletRequest;

/**
 * DeezerProxyController - Proxy inteligente para la API de Deezer
 * 
 * FUNCIONALIDADES:
 * 1. Proxy: Evita problemas de CORS haciendo las llamadas desde el servidor
 * 2. Caché: Almacena respuestas con TTLs según tipo de endpoint
 * 3. Rate Limiting: Controla requests por segundo hacia Deezer
 * 4. Cooldown: Si Deezer responde 403/429, evita "tormentas" de requests
 * 
 * TTLs:
 * - search/*: 90 segundos
 * - album/{id}, tracks: 6 horas
 * - chart/*: 10 minutos
 * 
 * @see https://developers.deezer.com/api
 */
@RestController
@RequestMapping("/api/deezer")
@Tag(name = "Deezer Proxy", description = "Proxy inteligente para acceder a la API pública de Deezer con caché y rate limiting")
public class DeezerProxyController {

    private static final Logger log = LoggerFactory.getLogger(DeezerProxyController.class);
    private static final String DEEZER_API_BASE = "https://api.deezer.com";
    
    private static final HttpClient httpClient = HttpClient.newBuilder()
            .connectTimeout(Duration.ofSeconds(10))
            .build();

    private final DeezerCacheService cacheService;

    public DeezerProxyController(DeezerCacheService cacheService) {
        this.cacheService = cacheService;
    }

    /**
     * Endpoint para obtener estadísticas del proxy
     * NOTA: Este endpoint debe estar ANTES del wildcard /** para tener prioridad
     */
    @GetMapping("/stats")
    @Operation(
        summary = "Estadísticas del proxy",
        description = "Devuelve estadísticas de caché, rate limiting y cooldown"
    )
    public ResponseEntity<String> getStats() {
        var stats = cacheService.getStats();
        String json = String.format("""
            {
                "cacheHits": %d,
                "cacheMisses": %d,
                "rateLimitBlocks": %d,
                "cooldownBlocks": %d,
                "searchCacheSize": %d,
                "albumCacheSize": %d,
                "chartCacheSize": %d,
                "inCooldown": %b,
                "cooldownRemainingSeconds": %d
            }
            """,
            stats.cacheHits(),
            stats.cacheMisses(),
            stats.rateLimitBlocks(),
            stats.cooldownBlocks(),
            stats.searchCacheSize(),
            stats.albumCacheSize(),
            stats.chartCacheSize(),
            cacheService.isInCooldown(),
            cacheService.getCooldownRemainingSeconds()
        );

        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_JSON);
        return new ResponseEntity<>(json, headers, HttpStatus.OK);
    }

    /**
     * Proxy genérico para cualquier endpoint de Deezer.
     * Captura todo lo que venga después de /api/deezer/
     * 
     * Ejemplo: GET /api/deezer/chart/0/albums?limit=50
     *       -> GET https://api.deezer.com/chart/0/albums?limit=50
     * 
     * FLUJO:
     * 1. Si estamos en cooldown → 503 inmediato
     * 2. Si hay respuesta en caché → devolver sin llamar a Deezer
     * 3. Si excedemos rate limit → 429
     * 4. Llamar a Deezer y cachear respuesta
     * 5. Si Deezer responde 403/429 → activar cooldown
     */
    @GetMapping("/**")
    @Operation(
        summary = "Proxy para Deezer API",
        description = "Redirige peticiones a la API pública de Deezer con caché y rate limiting"
    )
    public ResponseEntity<String> proxyDeezer(HttpServletRequest request) {
        String requestId = request.getHeader("X-Request-ID");
        String logPrefix = requestId != null ? "[" + requestId + "] " : "";

        try {
            // Construir URL completa de Deezer
            String requestUri = request.getRequestURI();
            String deezerPath = requestUri.replaceFirst("/api/deezer", "");
            String queryString = request.getQueryString();
            String fullUrl = DEEZER_API_BASE + deezerPath;
            String cacheKey = deezerPath + (queryString != null ? "?" + queryString : "");
            
            if (queryString != null && !queryString.isEmpty()) {
                fullUrl += "?" + queryString;
            }

            // 1. COOLDOWN CHECK
            if (cacheService.isInCooldown()) {
                long remaining = cacheService.getCooldownRemainingSeconds();
                log.warn("{}COOLDOWN: Bloqueando request a {} ({}s restantes)", 
                        logPrefix, truncatePath(deezerPath), remaining);
                return buildCooldownResponse(remaining);
            }

            // 2. CACHE CHECK
            CachedResponse cached = cacheService.getCached(cacheKey);
            if (cached != null) {
                log.debug("{}CACHE HIT: {}", logPrefix, truncatePath(deezerPath));
                return buildSuccessResponse(cached.body(), cached.statusCode());
            }

            // 3. RATE LIMIT CHECK
            if (!cacheService.canMakeRequest()) {
                log.warn("{}RATE LIMIT: Bloqueando request a {}", logPrefix, truncatePath(deezerPath));
                return buildRateLimitResponse();
            }

            // 4. LLAMAR A DEEZER
            log.debug("{}PROXY: {} -> {}", logPrefix, truncatePath(deezerPath), truncateUrl(fullUrl));
            
            HttpRequest deezerRequest = HttpRequest.newBuilder()
                    .uri(URI.create(fullUrl))
                    .header("Accept", "application/json")
                    .header("User-Agent", "DiscsAndRecords/1.0")
                    .timeout(Duration.ofSeconds(30))
                    .GET()
                    .build();

            HttpResponse<String> response = httpClient.send(deezerRequest, 
                    HttpResponse.BodyHandlers.ofString());

            int statusCode = response.statusCode();

            // 5. MANEJAR RATE LIMIT DE DEEZER
            if (statusCode == 403 || statusCode == 429) {
                log.error("{}DEEZER RATE LIMIT: Status {} para {}", logPrefix, statusCode, truncatePath(deezerPath));
                cacheService.activateCooldown();
                return buildCooldownResponse(cacheService.getCooldownRemainingSeconds());
            }

            // 6. CACHEAR Y DEVOLVER
            cacheService.cache(cacheKey, response.body(), statusCode);
            
            return buildSuccessResponse(response.body(), statusCode);

        } catch (Exception e) {
            log.error("{}ERROR en proxy Deezer: {}", logPrefix, e.getMessage());
            return buildErrorResponse(e.getMessage());
        }
    }

    // ==========================================================================
    // RESPONSE BUILDERS
    // ==========================================================================

    private ResponseEntity<String> buildSuccessResponse(String body, int statusCode) {
        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_JSON);
        return new ResponseEntity<>(body, headers, HttpStatus.valueOf(statusCode));
    }

    private ResponseEntity<String> buildRateLimitResponse() {
        String errorJson = """
            {
                "error": {
                    "type": "RateLimitExceeded",
                    "message": "Demasiadas peticiones. Por favor, espera unos segundos.",
                    "code": "RATE_LIMIT",
                    "retryAfterSeconds": 5
                }
            }
            """;
        
        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_JSON);
        headers.set("Retry-After", "5");
        return new ResponseEntity<>(errorJson, headers, HttpStatus.TOO_MANY_REQUESTS);
    }

    private ResponseEntity<String> buildCooldownResponse(long remainingSeconds) {
        String errorJson = String.format("""
            {
                "error": {
                    "type": "ServiceCooldown",
                    "message": "El servicio está temporalmente en pausa. Inténtalo en %d segundos.",
                    "code": "COOLDOWN",
                    "retryAfterSeconds": %d
                }
            }
            """, remainingSeconds, remainingSeconds);
        
        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_JSON);
        headers.set("Retry-After", String.valueOf(remainingSeconds));
        return new ResponseEntity<>(errorJson, headers, HttpStatus.SERVICE_UNAVAILABLE);
    }

    private ResponseEntity<String> buildErrorResponse(String message) {
        String errorJson = String.format("""
            {
                "error": {
                    "type": "ProxyError",
                    "message": "%s",
                    "code": "PROXY_ERROR"
                }
            }
            """, message.replace("\"", "\\\"").replace("\n", " "));
        
        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_JSON);
        return new ResponseEntity<>(errorJson, headers, HttpStatus.BAD_GATEWAY);
    }

    // ==========================================================================
    // UTILIDADES
    // ==========================================================================

    private String truncatePath(String path) {
        if (path.length() > 50) {
            return path.substring(0, 50) + "...";
        }
        return path;
    }

    private String truncateUrl(String url) {
        if (url.length() > 80) {
            return url.substring(0, 80) + "...";
        }
        return url;
    }
}
