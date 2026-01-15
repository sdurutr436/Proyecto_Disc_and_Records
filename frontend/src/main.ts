import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { App } from './app/app';
import { environment } from './environments/environment';

// =============================================================================
// 🧹 LIMPIEZA DE DATOS MOCK AL CAMBIAR A PRODUCCIÓN
// =============================================================================
const MOCK_FLAG_KEY = 'app-mock-mode';
const MOCK_DATA_KEYS = [
  'app-user',
  'app-favorites',
  'app-preferences',
  'app-auth-token'
];

/**
 * Limpia datos mock de localStorage cuando se cambia de modo mock a producción.
 * Esto evita que usuarios/datos falsos persistan al hacer deploy.
 */
function cleanupMockDataIfNeeded(): void {
  if (typeof localStorage === 'undefined') return;

  const wasMockMode = localStorage.getItem(MOCK_FLAG_KEY) === 'true';

  if (environment.useMockData) {
    // Estamos en modo mock: marcar localStorage
    localStorage.setItem(MOCK_FLAG_KEY, 'true');
  } else if (wasMockMode) {
    // Cambiamos de mock a producción: limpiar datos mock
    console.log('🧹 Limpiando datos mock de sesiones anteriores...');

    MOCK_DATA_KEYS.forEach(key => {
      localStorage.removeItem(key);
    });

    localStorage.removeItem(MOCK_FLAG_KEY);
    console.log('✅ Datos mock eliminados. Usando backend real.');
  }
}

// Ejecutar limpieza antes de iniciar la app
cleanupMockDataIfNeeded();

// =============================================================================
// 🎵 BOOTSTRAP DE LA APLICACIÓN
// =============================================================================

// Banner informativo en consola (solo desarrollo)
if (!environment.production) {
  console.log(`
╔═══════════════════════════════════════════════════════════════╗
║           🎵 Discs & Records - Frontend                       ║
╠═══════════════════════════════════════════════════════════════╣
║  Modo: ${environment.useMockData ? '🎭 MOCK (datos estáticos)' : '🌐 PRODUCCIÓN (backend real)'}           ║
║                                                               ║
║  ${environment.useMockData
  ? 'ℹ️  Para usar backend real:'
  : 'ℹ️  Para usar datos mock:'}                                ║
║  ${environment.useMockData
  ? '    Cambia useMockData a false en environment.ts'
  : '    Cambia useMockData a true en environment.ts'}          ║
╚═══════════════════════════════════════════════════════════════╝
  `);
}

bootstrapApplication(App, appConfig)
  .catch((err) => console.error(err));
