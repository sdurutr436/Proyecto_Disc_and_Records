import { Injectable } from '@angular/core';
import { PreloadingStrategy, Route } from '@angular/router';
import { Observable, of } from 'rxjs';

/**
 * Estrategia de precarga adaptativa basada en condiciones de red
 *
 * COMPORTAMIENTO:
 * - Conexión rápida (4G/WiFi): Precarga todo (PreloadAllModules)
 * - Conexión lenta (3G/2G): Solo precarga rutas críticas
 * - Sin conexión / datos guardados: No precarga nada
 *
 * DETECCIÓN:
 * Usa Network Information API para determinar velocidad de conexión
 */
@Injectable({ providedIn: 'root' })
export class NetworkAwarePreloadingStrategy implements PreloadingStrategy {

  preload(route: Route, load: () => Observable<any>): Observable<any> {
    // Detectar tipo de conexión (solo en navegadores compatibles)
    const connection = (navigator as any).connection ||
                       (navigator as any).mozConnection ||
                       (navigator as any).webkitConnection;

    if (!connection) {
      // Si no soporta Network API, precargar rutas críticas solamente
      return this.shouldPreloadOnUnknownNetwork(route) ? load() : of(null);
    }

    const effectiveType = connection.effectiveType; // '4g', '3g', '2g', 'slow-2g'
    const saveData = connection.saveData; // true si usuario activó "ahorrar datos"

    console.log(`[Network] Tipo de conexión: ${effectiveType}, Ahorro de datos: ${saveData}`);

    // No precargar si usuario tiene "ahorrar datos" activado
    if (saveData) {
      console.log(`[Network] Ahorro de datos activado - no precargando '${route.path}'`);
      return of(null);
    }

    // Conexión rápida: precargar todo
    if (effectiveType === '4g') {
      console.log(`[Network] Conexión 4G - precargando '${route.path}'`);
      return load();
    }

    // Conexión media: solo rutas críticas
    if (effectiveType === '3g') {
      const isCritical = route.data && route.data['critical'];
      if (isCritical) {
        console.log(`[Network] Conexión 3G - precargando ruta crítica '${route.path}'`);
        return load();
      }
      return of(null);
    }

    // Conexión lenta: no precargar
    console.log(`[Network] Conexión lenta (${effectiveType}) - no precargando '${route.path}'`);
    return of(null);
  }

  /**
   * Decide qué precargar cuando no se conoce el tipo de red
   */
  private shouldPreloadOnUnknownNetwork(route: Route): boolean {
    // Solo precargar rutas marcadas como críticas
    return !!(route.data && route.data['critical'] === true);
  }
}
