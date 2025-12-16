package com.discsandrecords.api.config;

import java.io.IOException;
import java.time.Instant;
import java.util.UUID;

import org.springframework.stereotype.Component;
import org.springframework.web.servlet.HandlerInterceptor;

import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

/**
 * Interceptor para loguear todas las peticiones HTTP
 * Registra: método, URI, IP cliente, status code, tiempo de ejecución
 */
@Component
public class LoggingInterceptor implements HandlerInterceptor {

    private static final Logger logger = LoggerFactory.getLogger(LoggingInterceptor.class);
    private static final String REQUEST_ID_HEADER = "X-Request-ID";
    private static final String START_TIME_ATTRIBUTE = "startTime";

    /**
     * Antes de procesar la petición
     */
    @Override
    public boolean preHandle(HttpServletRequest request, HttpServletResponse response, Object handler) throws Exception {
        // Generar ID único para la petición
        String requestId = UUID.randomUUID().toString();
        request.setAttribute(REQUEST_ID_HEADER, requestId);
        request.setAttribute(START_TIME_ATTRIBUTE, System.currentTimeMillis());

        String method = request.getMethod();
        String uri = request.getRequestURI();
        String queryString = request.getQueryString();
        String clientIP = getClientIP(request);

        String fullURI = queryString != null ? uri + "?" + queryString : uri;

        logger.info("[{}] Incoming {} request to {} from IP: {}", 
                requestId, method, fullURI, clientIP);

        return true;
    }

    /**
     * Después de procesar la petición
     */
    @Override
    public void afterCompletion(HttpServletRequest request, HttpServletResponse response, 
                                 Object handler, Exception ex) throws Exception {
        String requestId = (String) request.getAttribute(REQUEST_ID_HEADER);
        Long startTime = (Long) request.getAttribute(START_TIME_ATTRIBUTE);
        
        long executionTime = System.currentTimeMillis() - startTime;
        String method = request.getMethod();
        String uri = request.getRequestURI();
        int status = response.getStatus();

        if (ex != null) {
            logger.error("[{}] {} {} - Status: {} - Time: {}ms - Error: {}", 
                    requestId, method, uri, status, executionTime, ex.getMessage());
        } else {
            // Color verde para 2xx, amarillo para 3xx/4xx, rojo para 5xx
            String statusIndicator = status < 300 ? "✓" : (status < 400 ? "→" : (status < 500 ? "⚠" : "✗"));
            logger.info("[{}] {} {} - Status: {} {} - Time: {}ms", 
                    requestId, method, uri, status, statusIndicator, executionTime);
        }
    }

    /**
     * Obtener IP real del cliente (considerando proxies)
     */
    private String getClientIP(HttpServletRequest request) {
        String xForwardedFor = request.getHeader("X-Forwarded-For");
        if (xForwardedFor != null && !xForwardedFor.isEmpty()) {
            return xForwardedFor.split(",")[0].trim();
        }
        
        String xRealIP = request.getHeader("X-Real-IP");
        if (xRealIP != null && !xRealIP.isEmpty()) {
            return xRealIP;
        }
        
        return request.getRemoteAddr();
    }
}
