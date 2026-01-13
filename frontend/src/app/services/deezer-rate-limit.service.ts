import { Injectable, signal, computed } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';

/**
 * DeezerRateLimitService - Gestión de rate limiting y cooldown de Deezer
 *
 * PROPÓSITO:
 * - Detectar cuando el backend responde con 429/503 (cooldown de Deezer)
 * - Notificar a los componentes para que paren el infinite scroll
 * - Manejar reintentos con exponential backoff
 * - Evitar "tormentas" de requests durante el cooldown
 *
 * USO:
 * ```typescript
 * // En componente
 * if (this.rateLimitService.isInCooldown()) {
 *   // No hacer requests, mostrar mensaje
 * }
 *
 * // Después de un error 429/503
 * this.rateLimitService.handleRateLimitError(error);
 * ```
 */
@Injectable({
  providedIn: 'root'
})
export class DeezerRateLimitService {

  // ==========================================================================
  // ESTADO
  // ==========================================================================

  /** Indica si estamos en cooldown */
  private _inCooldown = signal<boolean>(false);

  /** Segundos restantes de cooldown */
  private _cooldownRemaining = signal<number>(0);

  /** Timestamp hasta el que estamos en cooldown */
  private cooldownUntil: number | null = null;

  /** Intervalo para actualizar el contador */
  private countdownInterval: ReturnType<typeof setInterval> | null = null;

  // ==========================================================================
  // SIGNALS PÚBLICOS
  // ==========================================================================

  /** Indica si estamos en cooldown (readonly) */
  readonly inCooldown = this._inCooldown.asReadonly();

  /** Segundos restantes de cooldown (readonly) */
  readonly cooldownRemaining = this._cooldownRemaining.asReadonly();

  /** Mensaje de estado para mostrar al usuario */
  readonly statusMessage = computed(() => {
    if (!this._inCooldown()) {
      return null;
    }
    const remaining = this._cooldownRemaining();
    if (remaining > 0) {
      return `Demasiadas búsquedas. Reintentando en ${remaining}s...`;
    }
    return 'Reconectando...';
  });

  // ==========================================================================
  // MÉTODOS PÚBLICOS
  // ==========================================================================

  /**
   * Verifica si estamos en cooldown
   */
  isInCooldown(): boolean {
    return this._inCooldown();
  }

  /**
   * Maneja un error de rate limit (429) o cooldown (503)
   * @param error Error HTTP
   * @returns true si era un error de rate limit, false si no
   */
  handleRateLimitError(error: HttpErrorResponse): boolean {
    if (error.status !== 429 && error.status !== 503) {
      return false;
    }

    // Extraer tiempo de espera del header Retry-After o del body
    let retryAfterSeconds = 5; // Default

    if (error.headers?.has('Retry-After')) {
      const retryAfter = error.headers.get('Retry-After');
      retryAfterSeconds = parseInt(retryAfter || '5', 10);
    } else if (error.error?.error?.retryAfterSeconds) {
      retryAfterSeconds = error.error.error.retryAfterSeconds;
    }

    this.startCooldown(retryAfterSeconds);
    return true;
  }

  /**
   * Inicia el modo cooldown manualmente
   * @param seconds Segundos de cooldown
   */
  startCooldown(seconds: number): void {
    // Limpiar cualquier intervalo anterior
    this.clearCountdown();

    this.cooldownUntil = Date.now() + (seconds * 1000);
    this._inCooldown.set(true);
    this._cooldownRemaining.set(seconds);

    console.warn(`⚠️ Deezer cooldown activado: ${seconds}s`);

    // Actualizar contador cada segundo
    this.countdownInterval = setInterval(() => {
      const remaining = Math.max(0, Math.ceil((this.cooldownUntil! - Date.now()) / 1000));
      this._cooldownRemaining.set(remaining);

      if (remaining <= 0) {
        this.endCooldown();
      }
    }, 1000);
  }

  /**
   * Termina el cooldown manualmente (para testing)
   */
  endCooldown(): void {
    this.clearCountdown();
    this._inCooldown.set(false);
    this._cooldownRemaining.set(0);
    this.cooldownUntil = null;
    console.info('✅ Deezer cooldown finalizado');
  }

  // ==========================================================================
  // MÉTODOS PRIVADOS
  // ==========================================================================

  private clearCountdown(): void {
    if (this.countdownInterval) {
      clearInterval(this.countdownInterval);
      this.countdownInterval = null;
    }
  }
}
