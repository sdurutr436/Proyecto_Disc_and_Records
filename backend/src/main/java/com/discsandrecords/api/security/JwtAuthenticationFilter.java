package com.discsandrecords.api.security;

import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.lang.NonNull;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import java.io.IOException;

/**
 * JwtAuthenticationFilter - Filtro de Autenticación JWT
 *
 * PROPÓSITO:
 * Intercepta cada petición HTTP para validar el token JWT y establecer
 * la autenticación en el SecurityContext de Spring Security.
 *
 * POSICIÓN EN LA CADENA:
 * Este filtro se ejecuta ANTES del UsernamePasswordAuthenticationFilter
 * de Spring Security. Si el token es válido, la petición continúa
 * como autenticada; si no, continúa sin autenticación (puede fallar
 * si el endpoint requiere autenticación).
 *
 * FLUJO DE EJECUCIÓN:
 * 1. Obtener header "Authorization" de la petición
 * 2. Verificar que existe y empieza con "Bearer "
 * 3. Extraer el token (quitar prefijo "Bearer ")
 * 4. Extraer username (email) del token
 * 5. Si hay username y no hay autenticación existente:
 *    a. Cargar UserDetails desde la base de datos
 *    b. Validar token contra UserDetails
 *    c. Si es válido, crear Authentication y ponerla en SecurityContext
 * 6. Continuar con la cadena de filtros
 *
 * SEGURIDAD:
 * - Usa OncePerRequestFilter para garantizar una sola ejecución por petición
 * - No guarda el token, solo lo valida
 * - Las excepciones de JWT se manejan en el catch (token inválido/expirado)
 *
 * @see JwtService
 * @see SecurityConfig
 */
@Component
public class JwtAuthenticationFilter extends OncePerRequestFilter {

    /**
     * Prefijo estándar para tokens Bearer en el header Authorization
     */
    private static final String BEARER_PREFIX = "Bearer ";

    /**
     * Nombre del header HTTP que contiene el token
     */
    private static final String AUTHORIZATION_HEADER = "Authorization";

    private final JwtService jwtService;
    private final UserDetailsService userDetailsService;

    /**
     * Constructor con inyección de dependencias
     *
     * @param jwtService Servicio para operaciones JWT
     * @param userDetailsService Servicio para cargar usuarios (implementado por UsuarioService)
     */
    public JwtAuthenticationFilter(JwtService jwtService, UserDetailsService userDetailsService) {
        this.jwtService = jwtService;
        this.userDetailsService = userDetailsService;
    }

    /**
     * Método principal del filtro - se ejecuta para cada petición
     *
     * @param request Petición HTTP entrante
     * @param response Respuesta HTTP
     * @param filterChain Cadena de filtros para continuar el procesamiento
     * @throws ServletException Si ocurre un error de servlet
     * @throws IOException Si ocurre un error de I/O
     */
    @Override
    protected void doFilterInternal(
            @NonNull HttpServletRequest request,
            @NonNull HttpServletResponse response,
            @NonNull FilterChain filterChain
    ) throws ServletException, IOException {

        // 1. Obtener el header Authorization
        final String authHeader = request.getHeader(AUTHORIZATION_HEADER);

        // 2. Verificar si existe y tiene el prefijo correcto
        if (authHeader == null || !authHeader.startsWith(BEARER_PREFIX)) {
            // No hay token, continuar sin autenticación
            // Spring Security decidirá si permite la petición según la configuración
            filterChain.doFilter(request, response);
            return;
        }

        // 3. Extraer el token (quitar "Bearer ")
        final String jwt = authHeader.substring(BEARER_PREFIX.length());

        try {
            // 4. Extraer username (email) del token
            final String userEmail = jwtService.extractUsername(jwt);

            // 5. Validar solo si hay username y NO hay autenticación existente
            // (evita re-autenticar si ya hay una sesión activa)
            if (userEmail != null && SecurityContextHolder.getContext().getAuthentication() == null) {

                // 5a. Cargar el usuario desde la base de datos
                UserDetails userDetails = this.userDetailsService.loadUserByUsername(userEmail);

                // 5b. Validar el token
                if (jwtService.isTokenValid(jwt, userDetails)) {

                    // 5c. Crear el objeto de autenticación
                    UsernamePasswordAuthenticationToken authToken = new UsernamePasswordAuthenticationToken(
                            userDetails,
                            null, // No necesitamos credenciales, ya autenticamos con JWT
                            userDetails.getAuthorities()
                    );

                    // Añadir detalles de la petición (IP, session, etc.)
                    authToken.setDetails(new WebAuthenticationDetailsSource().buildDetails(request));

                    // Establecer la autenticación en el contexto de seguridad
                    SecurityContextHolder.getContext().setAuthentication(authToken);
                }
            }
        } catch (Exception e) {
            // Token inválido, expirado, o error de parsing
            // No hacemos nada, simplemente continuamos sin autenticación
            // Spring Security manejará el acceso según la configuración
            logger.debug("Error procesando token JWT: " + e.getMessage());
        }

        // 6. Continuar con la cadena de filtros
        filterChain.doFilter(request, response);
    }
}
