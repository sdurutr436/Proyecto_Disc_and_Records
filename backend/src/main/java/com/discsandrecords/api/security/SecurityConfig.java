package com.discsandrecords.api.security;

import java.util.Arrays;
import java.util.List;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.AuthenticationProvider;
import org.springframework.security.authentication.dao.DaoAuthenticationProvider;
import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
import org.springframework.security.config.annotation.method.configuration.EnableMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configurers.AbstractHttpConfigurer;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;

/**
 * SecurityConfig - Configuración Central de Seguridad
 *
 * PROPÓSITO:
 * Define toda la configuración de Spring Security para la API:
 * - Cadena de filtros de seguridad
 * - Autenticación y autorización
 * - CORS para peticiones del frontend
 * - Codificación de contraseñas
 *
 * ARQUITECTURA:
 * ┌─────────────────────────────────────────────────────────────┐
 * │                    PETICIÓN HTTP                           │
 * └─────────────────────────────────────────────────────────────┘
 *                              │
 *                              ▼
 * ┌─────────────────────────────────────────────────────────────┐
 * │              CORS Filter (si aplica)                       │
 * └─────────────────────────────────────────────────────────────┘
 *                              │
 *                              ▼
 * ┌─────────────────────────────────────────────────────────────┐
 * │           JwtAuthenticationFilter                          │
 * │  - Extrae y valida JWT                                     │
 * │  - Establece SecurityContext                               │
 * └─────────────────────────────────────────────────────────────┘
 *                              │
 *                              ▼
 * ┌─────────────────────────────────────────────────────────────┐
 * │           Authorization Filter                             │
 * │  - Verifica permisos según URL y método                    │
 * └─────────────────────────────────────────────────────────────┘
 *                              │
 *                              ▼
 * ┌─────────────────────────────────────────────────────────────┐
 * │              CONTROLLER                                    │
 * └─────────────────────────────────────────────────────────────┘
 *
 * POLÍTICAS DE ACCESO:
 * - Público: /api/auth/**, /api/discos (GET), /api/artistas (GET), etc.
 * - Autenticado: Operaciones que requieren usuario logueado
 * - Admin: Operaciones CRUD sensibles
 *
 * @see JwtAuthenticationFilter
 * @see JwtService
 */
@Configuration
@EnableWebSecurity
@EnableMethodSecurity(prePostEnabled = true) // Habilita @PreAuthorize y @PostAuthorize
public class SecurityConfig {

    private final JwtAuthenticationFilter jwtAuthenticationFilter;
    private final UserDetailsService userDetailsService;
    private final PasswordEncoder passwordEncoder;

    public SecurityConfig(JwtAuthenticationFilter jwtAuthenticationFilter,
                          UserDetailsService userDetailsService,
                          PasswordEncoder passwordEncoder) {
        this.jwtAuthenticationFilter = jwtAuthenticationFilter;
        this.userDetailsService = userDetailsService;
        this.passwordEncoder = passwordEncoder;
    }

    // ==========================================
    // CADENA DE FILTROS DE SEGURIDAD
    // ==========================================

    /**
     * Configura la cadena de filtros de seguridad
     *
     * CONFIGURACIÓN:
     * 1. CSRF: Deshabilitado (usamos JWT stateless)
     * 2. CORS: Habilitado con configuración personalizada
     * 3. Sesiones: STATELESS (sin estado, cada petición lleva JWT)
     * 4. Autorización: Define qué rutas son públicas/privadas
     * 5. Filtro JWT: Se añade antes del filtro de autenticación estándar
     *
     * @param http Configurador de seguridad HTTP
     * @return Cadena de filtros configurada
     * @throws Exception Si hay error en la configuración
     */
    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
        http
                // 1. Deshabilitar CSRF (no necesario para APIs stateless con JWT)
                .csrf(AbstractHttpConfigurer::disable)

                // 2. Configurar CORS
                .cors(cors -> cors.configurationSource(corsConfigurationSource()))

                // 3. Política de sesiones: STATELESS
                .sessionManagement(session ->
                        session.sessionCreationPolicy(SessionCreationPolicy.STATELESS)
                )

                // 4. Configurar autorización de rutas
                .authorizeHttpRequests(auth -> auth
                        // ============ RUTAS PÚBLICAS ============
                        // Autenticación (login, registro)
                        .requestMatchers("/api/auth/**").permitAll()

                        // Documentación OpenAPI/Swagger
                        .requestMatchers(
                                "/v3/api-docs/**",
                                "/swagger-ui/**",
                                "/swagger-ui.html"
                        ).permitAll()

                        // Consola H2 (solo desarrollo)
                        .requestMatchers("/h2-console/**").permitAll()

                        // ============ RUTAS DE LECTURA PÚBLICA ============
                        // Cualquiera puede ver discos, artistas, géneros, etc.
                        .requestMatchers(HttpMethod.GET, "/api/discos/**").permitAll()
                        .requestMatchers(HttpMethod.GET, "/api/artistas/**").permitAll()
                        .requestMatchers(HttpMethod.GET, "/api/generos/**").permitAll()
                        .requestMatchers(HttpMethod.GET, "/api/resenas/**").permitAll()

                        // Usuarios: solo lectura pública (perfil público)
                        .requestMatchers(HttpMethod.GET, "/api/usuarios/**").permitAll()

                        // ============ RUTAS PROTEGIDAS ============
                        // Todas las demás rutas requieren autenticación
                        .anyRequest().authenticated()
                )

                // 5. Configurar proveedor de autenticación
                .authenticationProvider(authenticationProvider())

                // 6. Añadir filtro JWT antes del filtro de autenticación estándar
                .addFilterBefore(jwtAuthenticationFilter, UsernamePasswordAuthenticationFilter.class);

        // Permitir frames para H2 Console (solo desarrollo)
        http.headers(headers -> headers.frameOptions(frame -> frame.sameOrigin()));

        return http.build();
    }

    // ==========================================
    // CONFIGURACIÓN CORS
    // ==========================================

    /**
     * Configura CORS para permitir peticiones del frontend
     *
     * NOTA: En producción, especificar dominios exactos en lugar de "*"
     *
     * @return Fuente de configuración CORS
     */
    @Bean
    public CorsConfigurationSource corsConfigurationSource() {
        CorsConfiguration configuration = new CorsConfiguration();

        // Orígenes permitidos (frontend Angular)
        // TODO: En producción, cambiar por dominio específico
        configuration.setAllowedOrigins(List.of(
                "http://localhost:4200",  // Angular dev server
                "http://localhost:3000"   // Posible otro frontend
        ));

        // Métodos HTTP permitidos
        configuration.setAllowedMethods(Arrays.asList(
                "GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"
        ));

        // Headers permitidos
        configuration.setAllowedHeaders(Arrays.asList(
                "Authorization",
                "Content-Type",
                "X-Requested-With",
                "Accept",
                "Origin"
        ));

        // Permitir credenciales (cookies, Authorization header)
        configuration.setAllowCredentials(true);

        // Tiempo de cache para preflight requests (1 hora)
        configuration.setMaxAge(3600L);

        // Aplicar configuración a todas las rutas
        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
        source.registerCorsConfiguration("/**", configuration);

        return source;
    }

    // ==========================================
    // BEANS DE AUTENTICACIÓN
    // ==========================================

    /**
     * Proveedor de autenticación que usa UserDetailsService y PasswordEncoder
     *
     * PROCESO:
     * 1. Recibe credenciales (email + contraseña)
     * 2. Carga usuario por email (UserDetailsService)
     * 3. Verifica contraseña con BCrypt (PasswordEncoder)
     * 4. Retorna Authentication si es válido
     *
     * @return Proveedor de autenticación configurado
     */
    @Bean
    public AuthenticationProvider authenticationProvider() {
        DaoAuthenticationProvider authProvider = new DaoAuthenticationProvider();
        authProvider.setUserDetailsService(userDetailsService);
        authProvider.setPasswordEncoder(this.passwordEncoder);
        return authProvider;
    }

    /**
     * AuthenticationManager para uso en AuthService
     *
     * @param config Configuración de autenticación
     * @return AuthenticationManager
     * @throws Exception Si hay error obteniendo el manager
     */
    @Bean
    public AuthenticationManager authenticationManager(AuthenticationConfiguration config) throws Exception {
        return config.getAuthenticationManager();
    }
}
