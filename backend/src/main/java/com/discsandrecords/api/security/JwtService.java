package com.discsandrecords.api.security;

import io.jsonwebtoken.*;
import io.jsonwebtoken.io.Decoders;
import io.jsonwebtoken.security.Keys;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Service;

import javax.crypto.SecretKey;
import java.util.Date;
import java.util.HashMap;
import java.util.Map;
import java.util.function.Function;

/**
 * JwtService - Servicio de Gestión de JSON Web Tokens
 *
 * PROPÓSITO:
 * Centraliza todas las operaciones relacionadas con JWT:
 * - Generación de tokens
 * - Validación de tokens
 * - Extracción de claims (datos del token)
 *
 * ESTRUCTURA JWT:
 * Un JWT tiene 3 partes separadas por puntos:
 * 1. Header: Algoritmo y tipo de token
 * 2. Payload: Claims (datos) - subject, expiration, roles, etc.
 * 3. Signature: Firma digital para verificar integridad
 *
 * SEGURIDAD:
 * - Usa algoritmo HS256 (HMAC-SHA256) para firmar
 * - La clave secreta debe ser de al menos 256 bits
 * - Los tokens tienen expiración configurable
 * - La clave secreta NUNCA debe exponerse en logs o respuestas
 *
 * CONFIGURACIÓN:
 * Las propiedades se leen de application.properties:
 * - jwt.secret: Clave secreta en Base64
 * - jwt.expiration: Tiempo de expiración en milisegundos
 *
 * @see JwtAuthenticationFilter
 * @see AuthService
 */
@Service
public class JwtService {

    /**
     * Clave secreta para firmar tokens
     * Debe ser una cadena Base64 de al menos 256 bits (32 caracteres decodificados)
     */
    @Value("${jwt.secret}")
    private String secretKey;

    /**
     * Tiempo de expiración del token en milisegundos
     * Por defecto: 24 horas (86400000 ms)
     */
    @Value("${jwt.expiration}")
    private long jwtExpiration;

    // ==========================================
    // GENERACIÓN DE TOKENS
    // ==========================================

    /**
     * Genera un token JWT para un usuario
     *
     * @param userDetails Detalles del usuario (implementación de UserDetails)
     * @return Token JWT firmado como String
     */
    public String generateToken(UserDetails userDetails) {
        return generateToken(new HashMap<>(), userDetails);
    }

    /**
     * Genera un token JWT con claims adicionales
     *
     * CLAIMS INCLUIDOS:
     * - sub (subject): Email del usuario
     * - iat (issued at): Fecha de emisión
     * - exp (expiration): Fecha de expiración
     * - Claims adicionales pasados como parámetro
     *
     * @param extraClaims Claims adicionales a incluir en el token
     * @param userDetails Detalles del usuario
     * @return Token JWT firmado
     */
    public String generateToken(Map<String, Object> extraClaims, UserDetails userDetails) {
        return Jwts.builder()
                .claims(extraClaims)
                .subject(userDetails.getUsername())
                .issuedAt(new Date(System.currentTimeMillis()))
                .expiration(new Date(System.currentTimeMillis() + jwtExpiration))
                .signWith(getSigningKey(), Jwts.SIG.HS256)
                .compact();
    }

    // ==========================================
    // VALIDACIÓN DE TOKENS
    // ==========================================

    /**
     * Valida si un token es válido para un usuario específico
     *
     * VALIDACIONES:
     * 1. El subject del token coincide con el username del usuario
     * 2. El token no ha expirado
     * 3. La firma es válida (implícito en extractAllClaims)
     *
     * @param token Token JWT a validar
     * @param userDetails Usuario contra el que validar
     * @return true si el token es válido para el usuario
     */
    public boolean isTokenValid(String token, UserDetails userDetails) {
        final String username = extractUsername(token);
        return (username.equals(userDetails.getUsername())) && !isTokenExpired(token);
    }

    /**
     * Verifica si un token ha expirado
     *
     * @param token Token JWT a verificar
     * @return true si el token ha expirado
     */
    private boolean isTokenExpired(String token) {
        return extractExpiration(token).before(new Date());
    }

    // ==========================================
    // EXTRACCIÓN DE CLAIMS
    // ==========================================

    /**
     * Extrae el username (email) del token
     *
     * @param token Token JWT
     * @return Email del usuario (subject del token)
     */
    public String extractUsername(String token) {
        return extractClaim(token, Claims::getSubject);
    }

    /**
     * Extrae la fecha de expiración del token
     *
     * @param token Token JWT
     * @return Fecha de expiración
     */
    private Date extractExpiration(String token) {
        return extractClaim(token, Claims::getExpiration);
    }

    /**
     * Extrae un claim específico del token
     *
     * PATRÓN: Method Reference
     * Permite extraer cualquier claim usando una función extractora
     *
     * @param token Token JWT
     * @param claimsResolver Función para extraer el claim deseado
     * @param <T> Tipo del claim a extraer
     * @return Valor del claim extraído
     */
    public <T> T extractClaim(String token, Function<Claims, T> claimsResolver) {
        final Claims claims = extractAllClaims(token);
        return claimsResolver.apply(claims);
    }

    /**
     * Extrae todos los claims del token
     *
     * PROCESO:
     * 1. Parsea el token usando la clave de firma
     * 2. Verifica la firma automáticamente
     * 3. Retorna el payload (claims)
     *
     * @param token Token JWT
     * @return Todos los claims del token
     * @throws JwtException si el token es inválido o la firma no coincide
     */
    private Claims extractAllClaims(String token) {
        return Jwts.parser()
                .verifyWith(getSigningKey())
                .build()
                .parseSignedClaims(token)
                .getPayload();
    }

    // ==========================================
    // UTILIDADES INTERNAS
    // ==========================================

    /**
     * Obtiene la clave de firma a partir del secreto
     *
     * PROCESO:
     * 1. Decodifica la clave secreta de Base64
     * 2. Genera una SecretKey para HMAC-SHA256
     *
     * @return SecretKey para firmar/verificar tokens
     */
    private SecretKey getSigningKey() {
        byte[] keyBytes = Decoders.BASE64.decode(secretKey);
        return Keys.hmacShaKeyFor(keyBytes);
    }
}
