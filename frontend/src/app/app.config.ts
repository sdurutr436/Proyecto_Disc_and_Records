import { ApplicationConfig, provideBrowserGlobalErrorListeners, provideZoneChangeDetection } from '@angular/core';
import { provideRouter, withPreloading, withDebugTracing, withComponentInputBinding } from '@angular/router';

import { routes } from './app.routes';
import { NetworkAwarePreloadingStrategy } from './services/network-aware-preloading-strategy';

/**
 * Configuración de la aplicación Angular
 *
 * LAZY LOADING & PRELOADING:
 * - Lazy Loading: Todos los componentes usan loadComponent() en app.routes.ts
 * - Preloading: NetworkAwarePreloadingStrategy (adaptativa según conexión)
 * - withComponentInputBinding: Permite usar route params como @Input() en componentes
 * - withDebugTracing: Descomentarlo solo para debug de rutas (producción: deshabilitado)
 *
 * ESTRATEGIAS DISPONIBLES:
 *
 * 1. NetworkAwarePreloadingStrategy (✅ ACTUAL)
 *    - Precarga adaptativa según conexión del usuario
 *    - 4G/WiFi: precarga todo marcado con preload:true
 *    - 3G: solo precarga rutas critical:true
 *    - 2G/slow-2g: no precarga nada
 *    - saveData:true: respeta preferencia de ahorro de datos
 *
 * 2. CustomPreloadingStrategy (alternativa)
 *    - Precarga selectiva con delays configurables
 *    - Útil para testing o desarrollo
 *    - import { CustomPreloadingStrategy } from './custom-preloading-strategy';
 *
 * 3. PreloadAllModules (no recomendada)
 *    - Precarga TODOS los módulos lazy sin discriminar
 *    - Puede degradar performance en conexiones lentas
 *    - import { PreloadAllModules } from '@angular/router';
 */
export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(
      routes,
      withPreloading(NetworkAwarePreloadingStrategy), // ✅ Estrategia de precarga adaptativa
      withComponentInputBinding(),                    // ✅ Binding de parámetros de ruta
      // withDebugTracing()                            // 🔧 Descomentar solo para debugging
    )
  ]
};

