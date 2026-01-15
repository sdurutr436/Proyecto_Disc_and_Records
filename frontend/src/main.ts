import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { App } from './app/app';
import { environment } from './environments/environment';

// Banner informativo en consola
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
