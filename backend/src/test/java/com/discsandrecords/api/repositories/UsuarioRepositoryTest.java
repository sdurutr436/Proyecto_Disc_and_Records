package com.discsandrecords.api.repositories;

import static org.assertj.core.api.Assertions.assertThat;

import java.util.List;
import java.util.Optional;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;
import org.springframework.boot.test.autoconfigure.orm.jpa.TestEntityManager;
import org.springframework.test.annotation.DirtiesContext;

import com.discsandrecords.api.entities.Role;
import com.discsandrecords.api.entities.Usuario;

/**
 * Tests de repositorio para UsuarioRepository
 * 
 * Usa @DataJpaTest para cargar solo el contexto de JPA
 * con una base de datos H2 en memoria.
 * 
 * @DirtiesContext limpia el contexto entre tests para evitar
 * conflictos con data.sql precargado
 */
@DataJpaTest
@DirtiesContext(classMode = DirtiesContext.ClassMode.BEFORE_EACH_TEST_METHOD)
@DisplayName("UsuarioRepository - Tests de Persistencia")
class UsuarioRepositoryTest {

    @Autowired
    private TestEntityManager entityManager;

    @Autowired
    private UsuarioRepository usuarioRepository;

    private Usuario usuarioTest;

    @BeforeEach
    void setUp() {
        usuarioTest = Usuario.builder()
                .nombreUsuario("testuser")
                .mail("test@example.com")
                .contrasena("hashedPassword")
                .role(Role.ROLE_USER)
                .activo(true)
                .build();
        
        entityManager.persistAndFlush(usuarioTest);
    }

    // ==========================================
    // TESTS DE BÚSQUEDA
    // ==========================================

    @Test
    @DisplayName("Debería encontrar usuario por email")
    void findByMail_EmailExistente_RetornaUsuario() {
        // When
        Optional<Usuario> resultado = usuarioRepository.findByMail("test@example.com");

        // Then
        assertThat(resultado).isPresent();
        assertThat(resultado.get().getNombreUsuario()).isEqualTo("testuser");
    }

    @Test
    @DisplayName("Debería retornar vacío si el email no existe")
    void findByMail_EmailNoExistente_RetornaVacio() {
        // When
        Optional<Usuario> resultado = usuarioRepository.findByMail("noexiste@example.com");

        // Then
        assertThat(resultado).isEmpty();
    }

    @Test
    @DisplayName("Debería encontrar usuario por nombre de usuario")
    void findByNombreUsuario_NombreExistente_RetornaUsuario() {
        // When
        Optional<Usuario> resultado = usuarioRepository.findByNombreUsuario("testuser");

        // Then
        assertThat(resultado).isPresent();
        assertThat(resultado.get().getMail()).isEqualTo("test@example.com");
    }

    // ==========================================
    // TESTS DE EXISTENCIA
    // ==========================================

    @Test
    @DisplayName("Debería confirmar que existe por email")
    void existsByMail_EmailExistente_RetornaTrue() {
        // When
        boolean existe = usuarioRepository.existsByMail("test@example.com");

        // Then
        assertThat(existe).isTrue();
    }

    @Test
    @DisplayName("Debería confirmar que no existe por email")
    void existsByMail_EmailNoExistente_RetornaFalse() {
        // When
        boolean existe = usuarioRepository.existsByMail("noexiste@example.com");

        // Then
        assertThat(existe).isFalse();
    }

    @Test
    @DisplayName("Debería confirmar que existe por nombre de usuario")
    void existsByNombreUsuario_NombreExistente_RetornaTrue() {
        // When
        boolean existe = usuarioRepository.existsByNombreUsuario("testuser");

        // Then
        assertThat(existe).isTrue();
    }

    // ==========================================
    // TESTS DE @QUERY PERSONALIZADAS
    // ==========================================

    @Test
    @DisplayName("Debería listar usuarios activos")
    void findActivos_ConUsuariosActivos_RetornaLista() {
        // Given - contar activos antes de agregar inactivo
        long activosAntes = usuarioRepository.contarActivos();
        
        Usuario inactivo = Usuario.builder()
                .nombreUsuario("inactivo_" + System.currentTimeMillis())
                .mail("inactivo_" + System.currentTimeMillis() + "@example.com")
                .contrasena("hash")
                .role(Role.ROLE_USER)
                .activo(false)
                .build();
        entityManager.persistAndFlush(inactivo);

        // When
        List<Usuario> activos = usuarioRepository.findActivos();

        // Then - la cantidad de activos no debe haber cambiado
        assertThat(activos).hasSize((int) activosAntes);
        assertThat(activos).allMatch(Usuario::isActivo);
    }

    @Test
    @DisplayName("Debería listar usuarios por rol")
    void findByRole_ConUsuarioAdmin_RetornaLista() {
        // Given - usar nombres únicos para evitar conflicto con data.sql
        Usuario admin = Usuario.builder()
                .nombreUsuario("testadmin_" + System.currentTimeMillis())
                .mail("testadmin_" + System.currentTimeMillis() + "@example.com")
                .contrasena("hash")
                .role(Role.ROLE_ADMIN)
                .activo(true)
                .build();
        entityManager.persistAndFlush(admin);

        // When
        List<Usuario> admins = usuarioRepository.findByRole(Role.ROLE_ADMIN);

        // Then
        assertThat(admins).isNotEmpty();
        assertThat(admins).anyMatch(u -> u.getRole() == Role.ROLE_ADMIN);
    }

    @Test
    @DisplayName("Debería buscar usuarios por término")
    void buscarPorTermino_TerminoCoincide_RetornaUsuarios() {
        // When
        List<Usuario> resultado = usuarioRepository.buscarPorTermino("test");

        // Then
        assertThat(resultado).hasSize(1);
        assertThat(resultado.get(0).getNombreUsuario()).isEqualTo("testuser");
    }

    @Test
    @DisplayName("Debería contar usuarios activos")
    void contarActivos_ConUsuariosActivos_RetornaConteo() {
        // Given - contar antes
        long activosAntes = usuarioRepository.contarActivos();
        
        // Agregar un usuario activo
        Usuario nuevoActivo = Usuario.builder()
                .nombreUsuario("nuevoactivo_" + System.currentTimeMillis())
                .mail("nuevoactivo_" + System.currentTimeMillis() + "@example.com")
                .contrasena("hash")
                .role(Role.ROLE_USER)
                .activo(true)
                .build();
        entityManager.persistAndFlush(nuevoActivo);

        // When
        long activosDespues = usuarioRepository.contarActivos();

        // Then - debe haber uno más
        assertThat(activosDespues).isEqualTo(activosAntes + 1);
    }

    @Test
    @DisplayName("Debería contar total de usuarios")
    void contarTotalUsuarios_ConUsuarios_RetornaConteo() {
        // Given - contar antes
        long totalAntes = usuarioRepository.contarTotalUsuarios();
        
        Usuario otro = Usuario.builder()
                .nombreUsuario("otro_" + System.currentTimeMillis())
                .mail("otro_" + System.currentTimeMillis() + "@example.com")
                .contrasena("hash")
                .role(Role.ROLE_USER)
                .activo(true)
                .build();
        entityManager.persistAndFlush(otro);

        // When
        long totalDespues = usuarioRepository.contarTotalUsuarios();

        // Then - debe haber uno más
        assertThat(totalDespues).isEqualTo(totalAntes + 1);
    }
}
