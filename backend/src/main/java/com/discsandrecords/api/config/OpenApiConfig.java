package com.discsandrecords.api.config;

import java.util.List;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import io.swagger.v3.oas.models.Components;
import io.swagger.v3.oas.models.OpenAPI;
import io.swagger.v3.oas.models.info.Contact;
import io.swagger.v3.oas.models.info.Info;
import io.swagger.v3.oas.models.info.License;
import io.swagger.v3.oas.models.security.SecurityRequirement;
import io.swagger.v3.oas.models.security.SecurityScheme;
import io.swagger.v3.oas.models.servers.Server;

/**
 * OpenApiConfig - Configuración de SpringDoc OpenAPI (Swagger)
 *
 * PROPÓSITO:
 * - Configurar la documentación interactiva de la API
 * - Añadir soporte para autenticación JWT en Swagger UI
 * - Proporcionar información del proyecto (versión, contacto, licencia)
 *
 * USO:
 * Acceder a Swagger UI en: http://localhost:8080/swagger-ui.html
 * Acceder a OpenAPI JSON en: http://localhost:8080/api-docs
 *
 * AUTENTICACIÓN EN SWAGGER:
 * 1. Hacer login con POST /api/auth/login
 * 2. Copiar el token de la respuesta
 * 3. Click en "Authorize" (candado)
 * 4. Pegar el token (sin "Bearer ")
 * 5. Las peticiones incluirán el header Authorization automáticamente
 */
@Configuration
public class OpenApiConfig {

    @Value("${server.port:8080}")
    private String serverPort;

    /**
     * Configura OpenAPI con información del proyecto y seguridad JWT
     *
     * @return Configuración de OpenAPI
     */
    @Bean
    public OpenAPI customOpenAPI() {
        final String securitySchemeName = "bearerAuth";

        return new OpenAPI()
                // Información del proyecto
                .info(new Info()
                        .title("Discs & Records API")
                        .version("1.0.0")
                        .description("""
                                API REST para la plataforma Discs & Records.
                                
                                ## Descripción
                                Plataforma estilo Letterboxd para música donde los usuarios pueden:
                                - 🎵 Marcar álbumes y canciones como escuchados
                                - ⭐ Asignar puntuaciones de 1-5 estrellas
                                - ✍️ Escribir reseñas personales
                                - 📊 Ver estadísticas de géneros favoritos
                                - 🔍 Explorar música por artista, género y tendencias
                                
                                ## Autenticación
                                Esta API usa **JWT (JSON Web Tokens)** para autenticación.
                                
                                1. Registrarse: `POST /api/auth/register`
                                2. Login: `POST /api/auth/login` → Obtener token
                                3. Usar el token en el header: `Authorization: Bearer <token>`
                                
                                En Swagger UI, click en **Authorize** 🔒 y pegar el token.
                                
                                ## Roles
                                - **USER**: Usuario registrado (por defecto)
                                - **MODERATOR**: Puede moderar contenido
                                - **ADMIN**: Acceso completo
                                """)
                        .contact(new Contact()
                                .name("Discs & Records Team")
                                .email("contact@discsandrecords.com")
                                .url("https://github.com/sdurutr436/Proyecto_Disc_and_Records"))
                        .license(new License()
                                .name("MIT License")
                                .url("https://opensource.org/licenses/MIT")))

                // Servidores disponibles
                .servers(List.of(
                        new Server()
                                .url("http://localhost:" + serverPort)
                                .description("Servidor de desarrollo local"),
                        new Server()
                                .url("https://discs-n-records-ksgvk.ondigitalocean.app")
                                .description("Servidor de producción (DigitalOcean)")))

                // Configuración de seguridad JWT
                .addSecurityItem(new SecurityRequirement()
                        .addList(securitySchemeName))
                .components(new Components()
                        .addSecuritySchemes(securitySchemeName,
                                new SecurityScheme()
                                        .name(securitySchemeName)
                                        .type(SecurityScheme.Type.HTTP)
                                        .scheme("bearer")
                                        .bearerFormat("JWT")
                                        .description("Token JWT obtenido del endpoint /api/auth/login")));
    }
}
