import { ApplicationConfig, provideBrowserGlobalErrorListeners, provideZoneChangeDetection } from '@angular/core';
import { provideRouter, withPreloading, PreloadAllModules } from '@angular/router';

import { routes } from './app.routes';

/**
 * CONFIGURACIÓN DE LA APLICACIÓN - FASE 4
 *
 * ESTRATEGIA DE PRECARGA:
 * Se usa PreloadAllModules para cargar todos los módulos lazy-loaded
 * en segundo plano después de la carga inicial.
 *
 * VENTAJAS:
 * - Carga inicial más rápida (solo carga home)
 * - Navegación instantánea después (todo precargado)
 * - Mejor experiencia de usuario
 *
 * ALTERNATIVAS:
 * - NoPreloading: No precarga nada (carga bajo demanda)
 * - PreloadAllModules: Precarga todo (usado aquí)
 * - Estrategia personalizada: Precarga solo rutas específicas
 *
 * VERIFICAR CHUNKING:
 * Al hacer build de producción:
 * ng build --configuration production
 *
 * Deberías ver múltiples archivos .js generados:
 * - main.js (código principal)
 * - chunk-*.js (módulos lazy-loaded)
 */

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(
      routes,
      withPreloading(PreloadAllModules) // Estrategia de precarga
    )
  ]
};
