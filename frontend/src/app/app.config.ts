import { ApplicationConfig, provideBrowserGlobalErrorListeners, provideZoneChangeDetection } from '@angular/core';
import { provideRouter, withPreloading, withDebugTracing, withComponentInputBinding } from '@angular/router';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { LUCIDE_ICONS, LucideIconProvider, Disc3, LayoutGrid, ArrowLeft, Search, Heart, Music, BarChart3, Star, MessageSquare, List, Users } from 'lucide-angular';

import { routes } from './app.routes';
import { NetworkAwarePreloadingStrategy } from './services/network-aware-preloading-strategy';
import {
  headersInterceptor,
  authInterceptor,
  loggingInterceptor,
  errorInterceptor
} from './interceptors';

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
 *
 * HTTP CLIENT CONFIGURATION:
 * - provideHttpClient(): Configuración moderna de HttpClient (standalone)
 * - withInterceptors(): Cadena de interceptores en orden de ejecución
 *
 * ORDEN DE INTERCEPTORES (IMPORTANTE):
 * 1. headersInterceptor: Añade headers comunes (Content-Type, Accept, etc.)
 * 2. authInterceptor: Añade token de autenticación si existe
 * 3. loggingInterceptor: Registra peticiones/respuestas (solo desarrollo)
 * 4. errorInterceptor: Maneja errores globalmente (ÚLTIMO para capturar todo)
 */
export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideZoneChangeDetection({ eventCoalescing: true }),

    // Configuración de Router
    provideRouter(
      routes,
      withPreloading(NetworkAwarePreloadingStrategy), // ✅ Estrategia de precarga adaptativa
      withComponentInputBinding(),                    // ✅ Binding de parámetros de ruta
      // withDebugTracing()                            // 🔧 Descomentar solo para debugging
    ),

    // Configuración de HttpClient con interceptores
    provideHttpClient(
      withInterceptors([
        headersInterceptor,   // 1️⃣ Headers comunes
        authInterceptor,      // 2️⃣ Autenticación
        loggingInterceptor,   // 3️⃣ Logging (desarrollo)
        errorInterceptor      // 4️⃣ Manejo de errores (último)
      ])
    ),

    // Iconos Lucide
    { provide: LUCIDE_ICONS, multi: true, useValue: new LucideIconProvider({ Disc3, LayoutGrid, ArrowLeft, Search, Heart, Music, BarChart3, Star, MessageSquare, List, Users }) }
  ]
};

