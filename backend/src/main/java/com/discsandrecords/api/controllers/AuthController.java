package com.discsandrecords.api.controllers;

import com.discsandrecords.api.dto.AuthResponseDTO;
import com.discsandrecords.api.dto.LoginRequestDTO;
import com.discsandrecords.api.dto.RegisterRequestDTO;
import com.discsandrecords.api.services.AuthService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

/**
 * AuthController - Controlador de Autenticación
 *
 * PROPÓSITO:
 * Expone los endpoints de autenticación:
 * - POST /api/auth/register - Registro de nuevos usuarios
 * - POST /api/auth/login - Login y obtención de token JWT
 *
 * SEGURIDAD:
 * - Todos los endpoints de este controlador son públicos
 * - Se configuran como permitAll() en SecurityConfig
 * - Los datos sensibles (contraseñas) nunca se exponen en respuestas
 *
 * FORMATO DE RESPUESTA:
 * - Éxito: AuthResponseDTO con token JWT y datos del usuario
 * - Error: ErrorResponse con código y mensaje
 *
 * USO DEL TOKEN:
 * El token retornado debe incluirse en el header Authorization de
 * las siguientes peticiones:
 * 
 * Authorization: Bearer <token>
 *
 * @see AuthService
 * @see LoginRequestDTO
 * @see RegisterRequestDTO
 * @see AuthResponseDTO
 */
@RestController
@RequestMapping("/api/auth")
@Tag(name = "Autenticación", description = "Endpoints de registro y login")
public class AuthController {

    private final AuthService authService;

    /**
     * Constructor con inyección del servicio de autenticación
     *
     * @param authService Servicio de autenticación
     */
    public AuthController(AuthService authService) {
        this.authService = authService;
    }

    // ==========================================
    // REGISTRO
    // ==========================================

    /**
     * Registra un nuevo usuario en el sistema
     *
     * ENDPOINT: POST /api/auth/register
     *
     * VALIDACIONES:
     * - nombreUsuario: obligatorio, único
     * - mail: obligatorio, formato email válido, único
     * - contrasena: obligatorio, mínimo 8 caracteres
     *
     * RESPUESTAS:
     * - 201: Usuario registrado, retorna token JWT
     * - 400: Datos de validación inválidos
     * - 409: Usuario o email ya existen
     *
     * @param request DTO con datos de registro
     * @return ResponseEntity con AuthResponseDTO (201) o error
     */
    @Operation(
            summary = "Registrar nuevo usuario",
            description = "Crea una nueva cuenta de usuario y retorna un token JWT para login automático"
    )
    @ApiResponses(value = {
            @ApiResponse(
                    responseCode = "201",
                    description = "Usuario registrado exitosamente",
                    content = @Content(schema = @Schema(implementation = AuthResponseDTO.class))
            ),
            @ApiResponse(
                    responseCode = "400",
                    description = "Datos de registro inválidos"
            ),
            @ApiResponse(
                    responseCode = "409",
                    description = "El nombre de usuario o email ya existen"
            )
    })
    @PostMapping("/register")
    public ResponseEntity<AuthResponseDTO> registrar(@Valid @RequestBody RegisterRequestDTO request) {
        AuthResponseDTO response = authService.registrar(request);
        return new ResponseEntity<>(response, HttpStatus.CREATED);
    }

    // ==========================================
    // LOGIN
    // ==========================================

    /**
     * Autentica un usuario y retorna token JWT
     *
     * ENDPOINT: POST /api/auth/login
     *
     * VALIDACIONES:
     * - mail: obligatorio, formato email válido
     * - contrasena: obligatorio
     *
     * PROCESO:
     * 1. Verifica credenciales contra base de datos
     * 2. Si son válidas, genera token JWT
     * 3. Retorna token con datos del usuario
     *
     * RESPUESTAS:
     * - 200: Login exitoso, retorna token JWT
     * - 400: Datos de validación inválidos
     * - 401: Credenciales incorrectas
     *
     * SEGURIDAD:
     * - El mensaje de error no revela si el email existe
     * - La contraseña nunca se incluye en la respuesta
     *
     * @param request DTO con credenciales (mail, contrasena)
     * @return ResponseEntity con AuthResponseDTO (200) o error
     */
    @Operation(
            summary = "Iniciar sesión",
            description = "Autentica al usuario con email y contraseña, retorna token JWT"
    )
    @ApiResponses(value = {
            @ApiResponse(
                    responseCode = "200",
                    description = "Login exitoso",
                    content = @Content(schema = @Schema(implementation = AuthResponseDTO.class))
            ),
            @ApiResponse(
                    responseCode = "400",
                    description = "Datos de login inválidos"
            ),
            @ApiResponse(
                    responseCode = "401",
                    description = "Credenciales incorrectas"
            )
    })
    @PostMapping("/login")
    public ResponseEntity<AuthResponseDTO> login(@Valid @RequestBody LoginRequestDTO request) {
        AuthResponseDTO response = authService.login(request);
        return ResponseEntity.ok(response);
    }
}
