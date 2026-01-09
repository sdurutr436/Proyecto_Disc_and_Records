import { Injectable } from '@angular/core';
import { PreloadingStrategy, Route } from '@angular/router';
import { Observable, of, timer } from 'rxjs';
import { mergeMap } from 'rxjs/operators';

/**
 * Estrategia de precarga personalizada para optimizar la carga de módulos
 *
 * ESTRATEGIA:
 * 1. Precarga inmediata: Rutas marcadas con data: { preload: true }
 * 2. Precarga retrasada: Rutas con data: { preload: true, delay: 3000 }
 * 3. Sin precarga: Rutas sin flag (lazy puro - solo cuando se navega)
 *
 * USO EN RUTAS:
 * ```typescript
 * {
 *   path: 'admin',
 *   loadComponent: () => import('./pages/admin/admin'),
 *   data: { preload: true, delay: 2000 } // Precarga después de 2s
 * }
 * ```
 */

@Injectable({ providedIn: 'root' })
export class CustomPreloadingStrategy implements PreloadingStrategy {

  preload(route: Route, load: () => Observable<any>): Observable<any> {
    // Si la ruta tiene data.preload = true, precargar
    if (route.data && route.data['preload']) {
      const delay = route.data['delay'] || 0;

      console.log(`[Preload] Cargando ruta '${route.path}' con delay de ${delay}ms`);

      // Si hay delay, esperar antes de precargar
      if (delay > 0) {
        return timer(delay).pipe(
          mergeMap(() => load())
        );
      }

      // Precarga inmediata
      return load();
    }

    // No precargar esta ruta
    return of(null);
  }
}
