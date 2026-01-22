# Capturas de Pantalla Requeridas para Fase 7

Este directorio debe contener las siguientes capturas de pantalla para completar la documentacion de la Fase 7.

## Lista de Capturas

| Archivo | Descripcion | Comando/Ubicacion |
|---------|-------------|-------------------|
| `cobertura-codigo.png` | Reporte HTML de cobertura | Abrir `frontend/coverage/lcov-report/index.html` |
| `tests-passing.png` | Terminal con tests exitosos | `npm run test:ci` |
| `build-production.png` | Output del build de produccion | `ng build --configuration production` |
| `lazy-chunks.png` | Detalle de lazy chunks generados | Misma salida del build |
| `cross-browser-chrome.png` | Tests en Chrome Headless | `npm test` (karma.conf) |
| `cross-browser-firefox.png` | Tests en Firefox Headless | Configurar Firefox en karma |
| `lighthouse-performance.png` | Auditoria Lighthouse | Chrome DevTools > Lighthouse |
| `source-map-explorer.png` | Treemap de bundles | `npm run build:analyze` |
| `digitalocean-deploy.png` | Dashboard DigitalOcean | Portal App Platform |
| `app-produccion.png` | App funcionando | URL de produccion |

## Notas

- Todas las capturas deben ser en formato PNG
- Resolucion recomendada: 1920x1080 o superior
- Recortar para mostrar solo la informacion relevante
- No incluir informacion sensible (tokens, credenciales)
