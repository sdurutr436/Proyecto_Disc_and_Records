package com.discsandrecords.api.services;

import java.time.Duration;
import java.time.Instant;
import java.util.concurrent.atomic.AtomicInteger;
import java.util.concurrent.atomic.AtomicReference;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import com.github.benmanes.caffeine.cache.Cache;
import com.github.benmanes.caffeine.cache.Caffeine;

/**
 * DeezerCacheService - Servicio de caché y rate limiting para el proxy de Deezer
 *
 * FUNCIONALIDADES:
 * 1. CACHÉ: Almacena respuestas por URL completa con TTLs configurables
 *    - search/*: 90 segundos (búsquedas cambian poco)
 *    - album/{id}, tracks: 6 horas (datos estáticos)
 *    - chart/*: 10 minutos (se actualiza periódicamente)
 * 
 * 2. RATE LIMITING: Controla requests por segundo hacia Deezer
 *    - Máximo configurable (default: 40 req/5s = 8 req/s)
 *    - Deezer tiene límite de 50 req/5s, dejamos margen
 * 
 * 3. COOLDOWN: Si Deezer responde 403/429, entramos en modo cooldown
 *    - Durante X segundos no reenviamos requests
 *    - Respondemos 503 inmediatamente para evitar "tormentas"
 *
 * CONFIGURACIÓN via application.properties:
 * - deezer.cache.search-ttl-seconds=90
 * - deezer.cache.album-ttl-hours=6
 * - deezer.cache.chart-ttl-minutes=10
 * - deezer.rate-limit.requests-per-window=40
 * - deezer.rate-limit.window-seconds=5
 * - deezer.cooldown.duration-seconds=60
 */
@Service
public class DeezerCacheService {

    private static final Logger log = LoggerFactory.getLogger(DeezerCacheService.class);

    // ==========================================================================
    // CONFIGURACIÓN
    // ==========================================================================

    @Value("${deezer.cache.search-ttl-seconds:90}")
    private int searchTtlSeconds;

    @Value("${deezer.cache.album-ttl-hours:6}")
    private int albumTtlHours;

    @Value("${deezer.cache.chart-ttl-minutes:10}")
    private int chartTtlMinutes;

    @Value("${deezer.rate-limit.requests-per-window:40}")
    private int requestsPerWindow;

    @Value("${deezer.rate-limit.window-seconds:5}")
    private int windowSeconds;

    @Value("${deezer.cooldown.duration-seconds:60}")
    private int cooldownDurationSeconds;

    // ==========================================================================
    // CACHÉ (múltiples instancias con diferentes TTLs)
    // ==========================================================================

    /** Caché para búsquedas (TTL corto: 90s) */
    private final Cache<String, CachedResponse> searchCache;

    /** Caché para álbumes y tracks (TTL largo: 6h) */
    private final Cache<String, CachedResponse> albumCache;

    /** Caché para charts (TTL medio: 10min) */
    private final Cache<String, CachedResponse> chartCache;

    // ==========================================================================
    // RATE LIMITING
    // ==========================================================================

    /** Contador de requests en la ventana actual */
    private final AtomicInteger requestCount = new AtomicInteger(0);

    /** Inicio de la ventana actual */
    private final AtomicReference<Instant> windowStart = new AtomicReference<>(Instant.now());

    // ==========================================================================
    // COOLDOWN
    // ==========================================================================

    /** Instante hasta el cual estamos en cooldown (null si no) */
    private final AtomicReference<Instant> cooldownUntil = new AtomicReference<>(null);

    // ==========================================================================
    // ESTADÍSTICAS
    // ==========================================================================

    private final AtomicInteger cacheHits = new AtomicInteger(0);
    private final AtomicInteger cacheMisses = new AtomicInteger(0);
    private final AtomicInteger rateLimitBlocks = new AtomicInteger(0);
    private final AtomicInteger cooldownBlocks = new AtomicInteger(0);

    // ==========================================================================
    // CONSTRUCTOR
    // ==========================================================================

    public DeezerCacheService() {
        // Inicializar cachés con TTLs por defecto (se sobrescribirán si hay config)
        this.searchCache = Caffeine.newBuilder()
                .expireAfterWrite(Duration.ofSeconds(90))
                .maximumSize(500)
                .build();

        this.albumCache = Caffeine.newBuilder()
                .expireAfterWrite(Duration.ofHours(6))
                .maximumSize(1000)
                .build();

        this.chartCache = Caffeine.newBuilder()
                .expireAfterWrite(Duration.ofMinutes(10))
                .maximumSize(100)
                .build();

        log.info("DeezerCacheService inicializado - Search TTL: 90s, Album TTL: 6h, Chart TTL: 10min");
    }

    // ==========================================================================
    // CACHÉ METHODS
    // ==========================================================================

    /**
     * Obtiene respuesta cacheada para una URL
     * @param url URL completa (path + query string)
     * @return CachedResponse si existe en caché, null si no
     */
    public CachedResponse getCached(String url) {
        Cache<String, CachedResponse> cache = selectCache(url);
        CachedResponse cached = cache.getIfPresent(url);
        
        if (cached != null) {
            cacheHits.incrementAndGet();
            log.debug("Cache HIT para: {}", truncateUrl(url));
            return cached;
        }
        
        cacheMisses.incrementAndGet();
        log.debug("Cache MISS para: {}", truncateUrl(url));
        return null;
    }

    /**
     * Guarda respuesta en caché (solo si status 200)
     * @param url URL completa
     * @param body Cuerpo de la respuesta
     * @param statusCode Código de estado HTTP
     */
    public void cache(String url, String body, int statusCode) {
        // Solo cachear respuestas exitosas
        if (statusCode != 200) {
            log.debug("No cacheando respuesta con status {} para: {}", statusCode, truncateUrl(url));
            return;
        }

        Cache<String, CachedResponse> cache = selectCache(url);
        cache.put(url, new CachedResponse(body, statusCode, Instant.now()));
        log.debug("Cacheada respuesta para: {}", truncateUrl(url));
    }

    /**
     * Selecciona la caché apropiada según el tipo de URL
     */
    private Cache<String, CachedResponse> selectCache(String url) {
        if (url.contains("/search/")) {
            return searchCache;
        } else if (url.contains("/album/") || url.contains("/artist/") || url.contains("/track/")) {
            return albumCache;
        } else if (url.contains("/chart")) {
            return chartCache;
        }
        // Default: usar caché de búsqueda (TTL corto)
        return searchCache;
    }

    // ==========================================================================
    // RATE LIMITING
    // ==========================================================================

    /**
     * Verifica si podemos hacer una request a Deezer
     * @return true si podemos, false si excedemos el límite
     */
    public boolean canMakeRequest() {
        Instant now = Instant.now();
        Instant windowStartInstant = windowStart.get();
        
        // ¿Estamos en una nueva ventana?
        if (Duration.between(windowStartInstant, now).getSeconds() >= windowSeconds) {
            // Nueva ventana: resetear contador
            windowStart.set(now);
            requestCount.set(0);
        }
        
        int count = requestCount.incrementAndGet();
        
        if (count > requestsPerWindow) {
            rateLimitBlocks.incrementAndGet();
            log.warn("Rate limit alcanzado: {}/{} requests en {}s", count, requestsPerWindow, windowSeconds);
            return false;
        }
        
        return true;
    }

    /**
     * Decrementa el contador si una request fue cancelada o cacheada
     */
    public void releaseRequest() {
        requestCount.decrementAndGet();
    }

    // ==========================================================================
    // COOLDOWN
    // ==========================================================================

    /**
     * Activa el modo cooldown (cuando Deezer responde 403/429)
     */
    public void activateCooldown() {
        Instant until = Instant.now().plusSeconds(cooldownDurationSeconds);
        cooldownUntil.set(until);
        log.warn("⚠️ COOLDOWN ACTIVADO hasta {} ({}s) - Deezer respondió con rate limit", 
                until, cooldownDurationSeconds);
    }

    /**
     * Verifica si estamos en modo cooldown
     * @return true si estamos en cooldown, false si no
     */
    public boolean isInCooldown() {
        Instant until = cooldownUntil.get();
        if (until == null) {
            return false;
        }
        
        if (Instant.now().isAfter(until)) {
            // Cooldown expiró
            cooldownUntil.set(null);
            log.info("✅ Cooldown finalizado - Reanudando requests a Deezer");
            return false;
        }
        
        cooldownBlocks.incrementAndGet();
        return true;
    }

    /**
     * Obtiene segundos restantes de cooldown
     */
    public long getCooldownRemainingSeconds() {
        Instant until = cooldownUntil.get();
        if (until == null) {
            return 0;
        }
        long remaining = Duration.between(Instant.now(), until).getSeconds();
        return Math.max(0, remaining);
    }

    // ==========================================================================
    // ESTADÍSTICAS
    // ==========================================================================

    /**
     * Obtiene estadísticas del servicio
     */
    public CacheStats getStats() {
        return new CacheStats(
                cacheHits.get(),
                cacheMisses.get(),
                rateLimitBlocks.get(),
                cooldownBlocks.get(),
                searchCache.estimatedSize(),
                albumCache.estimatedSize(),
                chartCache.estimatedSize()
        );
    }

    /**
     * Limpia todas las cachés (para testing)
     */
    public void clearAllCaches() {
        searchCache.invalidateAll();
        albumCache.invalidateAll();
        chartCache.invalidateAll();
        log.info("Todas las cachés limpiadas");
    }

    // ==========================================================================
    // UTILIDADES
    // ==========================================================================

    /**
     * Trunca URL para logs (evitar logs muy largos)
     */
    private String truncateUrl(String url) {
        if (url.length() > 80) {
            return url.substring(0, 80) + "...";
        }
        return url;
    }

    // ==========================================================================
    // RECORDS PARA DATOS
    // ==========================================================================

    /**
     * Respuesta cacheada
     */
    public record CachedResponse(String body, int statusCode, Instant cachedAt) {}

    /**
     * Estadísticas del servicio
     */
    public record CacheStats(
            int cacheHits,
            int cacheMisses,
            int rateLimitBlocks,
            int cooldownBlocks,
            long searchCacheSize,
            long albumCacheSize,
            long chartCacheSize
    ) {}
}
