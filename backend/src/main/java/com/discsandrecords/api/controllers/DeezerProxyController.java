package com.discsandrecords.api.controllers;

import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.servlet.http.HttpServletRequest;

import java.net.URI;
import java.net.http.HttpClient;
import java.net.http.HttpRequest;
import java.net.http.HttpResponse;
import java.time.Duration;

/**
 * Controlador proxy para la API de Deezer.
 * 
 * Evita problemas de CORS haciendo las llamadas desde el servidor.
 * Deezer no permite llamadas directas desde navegadores (sin CORS headers).
 * 
 * @see https://developers.deezer.com/api
 */
@RestController
@RequestMapping("/api/deezer")
@Tag(name = "Deezer Proxy", description = "Proxy para acceder a la API pública de Deezer")
public class DeezerProxyController {

    private static final String DEEZER_API_BASE = "https://api.deezer.com";
    private static final HttpClient httpClient = HttpClient.newBuilder()
            .connectTimeout(Duration.ofSeconds(10))
            .build();

    /**
     * Proxy genérico para cualquier endpoint de Deezer.
     * Captura todo lo que venga después de /api/deezer/
     * 
     * Ejemplo: GET /api/deezer/chart/0/albums?limit=50
     *       -> GET https://api.deezer.com/chart/0/albums?limit=50
     */
    @GetMapping("/**")
    @Operation(
        summary = "Proxy para Deezer API",
        description = "Redirige peticiones a la API pública de Deezer evitando problemas de CORS"
    )
    public ResponseEntity<String> proxyDeezer(HttpServletRequest request) {
        try {
            // Extraer el path después de /api/deezer
            String requestUri = request.getRequestURI();
            String deezerPath = requestUri.replaceFirst("/api/deezer", "");
            
            // Añadir query string si existe
            String queryString = request.getQueryString();
            String fullUrl = DEEZER_API_BASE + deezerPath;
            if (queryString != null && !queryString.isEmpty()) {
                fullUrl += "?" + queryString;
            }

            // Hacer la petición a Deezer
            HttpRequest deezerRequest = HttpRequest.newBuilder()
                    .uri(URI.create(fullUrl))
                    .header("Accept", "application/json")
                    .header("User-Agent", "DiscsAndRecords/1.0")
                    .timeout(Duration.ofSeconds(30))
                    .GET()
                    .build();

            HttpResponse<String> response = httpClient.send(deezerRequest, 
                    HttpResponse.BodyHandlers.ofString());

            // Preparar headers de respuesta
            HttpHeaders headers = new HttpHeaders();
            headers.setContentType(MediaType.APPLICATION_JSON);
            
            // Devolver la respuesta de Deezer
            return new ResponseEntity<>(
                    response.body(), 
                    headers, 
                    HttpStatus.valueOf(response.statusCode())
            );

        } catch (Exception e) {
            // Log del error
            System.err.println("Error en proxy Deezer: " + e.getMessage());
            
            // Devolver error JSON
            String errorJson = String.format(
                "{\"error\": {\"type\": \"ProxyError\", \"message\": \"%s\"}}", 
                e.getMessage().replace("\"", "\\\"")
            );
            
            HttpHeaders headers = new HttpHeaders();
            headers.setContentType(MediaType.APPLICATION_JSON);
            
            return new ResponseEntity<>(errorJson, headers, HttpStatus.BAD_GATEWAY);
        }
    }
}
