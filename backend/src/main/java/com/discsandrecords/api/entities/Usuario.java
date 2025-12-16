package com.discsandrecords.api.entities;

import jakarta.persistence.*;
import lombok.*;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import java.time.Instant;
import java.util.Collection;
import java.util.List;

/**
 * Usuario - Entidad de Usuario del Sistema
 *
 * PROPÓSITO:
 * Representa un usuario registrado en la plataforma Discs & Records.
 * Implementa UserDetails de Spring Security para integración con autenticación JWT.
 *
 * IMPLEMENTACIÓN UserDetails:
 * Spring Security requiere que la entidad de usuario implemente UserDetails
 * para poder utilizarla en el proceso de autenticación y autorización.
 * Los métodos de UserDetails proporcionan:
 * - getAuthorities(): roles/permisos del usuario
 * - getUsername(): identificador único para login (usamos email)
 * - getPassword(): contraseña hasheada
 * - isAccountNonExpired(), isAccountNonLocked(), etc.: estados de la cuenta
 *
 * SEGURIDAD:
 * - La contraseña se almacena hasheada con BCrypt (nunca en texto plano)
 * - El campo 'role' define el nivel de acceso del usuario
 * - Los métodos de estado de cuenta están preparados para futuras funcionalidades
 *
 * @see Role
 * @see com.discsandrecords.api.security.JwtService
 */
@Entity
@Table(name = "usuarios")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Usuario implements UserDetails {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    /**
     * Nombre de usuario único
     * Usado para mostrar en la plataforma (no para login)
     */
    @Column(nullable = false, unique = true, length = 50)
    private String nombreUsuario;

    /**
     * Email del usuario - IDENTIFICADOR DE LOGIN
     * Spring Security usará este campo como "username" para autenticación
     */
    @Column(nullable = false, unique = true, length = 100)
    private String mail;

    /**
     * Contraseña hasheada con BCrypt
     * NUNCA almacenar contraseñas en texto plano
     */
    @Column(nullable = false)
    private String contrasena;

    /**
     * Rol del usuario en el sistema
     * Determina el nivel de acceso y permisos
     */
    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    @Builder.Default
    private Role role = Role.ROLE_USER;

    @Column(length = 255)
    private String avatar;

    @Column(columnDefinition = "TEXT")
    private String biografia;

    @Column(nullable = false, updatable = false)
    private Instant fechaRegistro;

    /**
     * Estado de la cuenta
     * Permite deshabilitar usuarios sin eliminarlos
     */
    @Column(nullable = false)
    @Builder.Default
    private boolean activo = true;

    @PrePersist
    protected void onCreate() {
        fechaRegistro = Instant.now();
    }

    // ==========================================
    // IMPLEMENTACIÓN UserDetails (Spring Security)
    // ==========================================

    /**
     * Retorna los roles/permisos del usuario
     * Spring Security usa esto para autorización
     */
    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        return List.of(new SimpleGrantedAuthority(role.name()));
    }

    /**
     * Retorna la contraseña hasheada
     * Usado por Spring Security para verificación
     */
    @Override
    public String getPassword() {
        return contrasena;
    }

    /**
     * Retorna el identificador de login (email)
     * Spring Security usa esto como "username"
     */
    @Override
    public String getUsername() {
        return mail;
    }

    /**
     * Indica si la cuenta no ha expirado
     * Retorna true si la cuenta está activa
     */
    @Override
    public boolean isAccountNonExpired() {
        return activo;
    }

    /**
     * Indica si la cuenta no está bloqueada
     * Preparado para funcionalidad futura de bloqueo
     */
    @Override
    public boolean isAccountNonLocked() {
        return activo;
    }

    /**
     * Indica si las credenciales no han expirado
     * Preparado para política de rotación de contraseñas
     */
    @Override
    public boolean isCredentialsNonExpired() {
        return true;
    }

    /**
     * Indica si el usuario está habilitado
     * Permite deshabilitar cuentas sin eliminarlas
     */
    @Override
    public boolean isEnabled() {
        return activo;
    }
}
