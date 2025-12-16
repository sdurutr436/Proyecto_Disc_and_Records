package com.discsandrecords.api;

import static org.assertj.core.api.Assertions.assertThat;

import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.context.ApplicationContext;

/**
 * Test principal de la aplicación
 * 
 * Verifica que el contexto de Spring Boot se carga correctamente
 */
@SpringBootTest
@DisplayName("DiscsAndRecordsApplication - Contexto de Aplicación")
class DiscsAndRecordsApplicationTests {

    @Autowired
    private ApplicationContext applicationContext;

    @Test
    @DisplayName("El contexto de Spring Boot debería cargar correctamente")
    void contextLoads() {
        assertThat(applicationContext).isNotNull();
    }

    @Test
    @DisplayName("Debería tener todos los beans de servicios configurados")
    void serviceBeansLoaded() {
        assertThat(applicationContext.containsBean("authService")).isTrue();
        assertThat(applicationContext.containsBean("albumService")).isTrue();
        assertThat(applicationContext.containsBean("artistaService")).isTrue();
        assertThat(applicationContext.containsBean("cancionService")).isTrue();
        assertThat(applicationContext.containsBean("generoService")).isTrue();
        assertThat(applicationContext.containsBean("usuarioService")).isTrue();
    }

    @Test
    @DisplayName("Debería tener los componentes de seguridad configurados")
    void securityBeansLoaded() {
        assertThat(applicationContext.containsBean("jwtService")).isTrue();
        assertThat(applicationContext.containsBean("jwtAuthenticationFilter")).isTrue();
        assertThat(applicationContext.containsBean("securityFilterChain")).isTrue();
    }
}
