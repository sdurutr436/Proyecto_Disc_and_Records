package com.discsandrecords.api.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;

/**
 * PasswordEncoderConfig - Configuración del Encoder de Contraseñas
 *
 * PROPÓSITO:
 * Separa la definición del PasswordEncoder de SecurityConfig para evitar
 * dependencias circulares entre beans de seguridad.
 *
 * BCrypt:
 * - Algoritmo de hashing diseñado específicamente para contraseñas
 * - Incluye salt automático (no necesita gestionarlo manualmente)
 * - Factor de trabajo configurable (default: 10)
 * - Resistente a ataques de fuerza bruta y rainbow tables
 *
 * @see org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder
 */
@Configuration
public class PasswordEncoderConfig {

    /**
     * Bean de encoder de contraseñas con BCrypt
     *
     * @return PasswordEncoder con BCrypt
     */
    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }
}
