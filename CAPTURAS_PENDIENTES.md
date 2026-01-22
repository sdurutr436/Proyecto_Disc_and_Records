## 🔴 URGENTE: Sección 7 - Accesibilidad

La sección 7 está **INCOMPLETA**. Faltan todas las capturas de tests de accesibilidad:

### 7.1 Lighthouse Accessibility

| Archivo Necesario | Descripción |
|-------------------|-------------|
| `lighthouse-accessibility-home.png` | Lighthouse Accessibility score para Home |
| `lighthouse-accessibility-profile.png` | Lighthouse Accessibility score para Profile |
| `lighthouse-accessibility-detail.png` | Lighthouse Accessibility score para Detail |

**Instrucciones:**
1. Abre Chrome → https://discs-n-records-ksgvk.ondigitalocean.app/
2. F12 → Pestaña "Lighthouse"
3. Selecciona solo "Accessibility" 
4. Genera informe
5. Captura el resultado (puntuación + issues)
6. Guarda en: `docs/design/validaciones-finales/`

---

### 7.2 Lighthouse Performance (Opcional pero recomendado)

| Archivo Necesario | Descripción |
|-------------------|-------------|
| `lighthouse-performance-home.png` | Performance score para Home |

**Instrucciones:** Mismo proceso que Accessibility pero seleccionando "Performance"

---

### 7.3 WAVE Accessibility

| Archivo Necesario | Descripción |
|-------------------|-------------|
| `wave-home.png` | Resultado WAVE para Home |
| `wave-profile.png` | Resultado WAVE para Profile |

**Instrucciones:**
1. Ve a https://wave.webaim.org/
2. Introduce la URL: `https://discs-n-records-ksgvk.ondigitalocean.app/`
3. Captura el panel lateral con los resultados
4. Repite para `/profile`
5. Guarda en: `docs/design/validaciones-finales/`

---

### 7.4 axe DevTools (Opcional pero suma puntos)

| Archivo Necesario | Descripción |
|-------------------|-------------|
| `axe-devtools-home.png` | Análisis axe DevTools |

**Instrucciones:**
1. Instala extensión "axe DevTools" en Chrome
2. F12 → Pestaña "axe DevTools"
3. Analiza la página
4. Captura resultados
5. Guarda en: `docs/design/validaciones-finales/`

---

### 7.5 Test Cross-Browser

| Archivo Necesario | Navegador | Página |
|-------------------|-----------|--------|
| `chrome-home.png` | Chrome | Home |
| `firefox-home.png` | Firefox | Home |
| `edge-home.png` | Edge | Home |

**Instrucciones:** Abre la app en cada navegador y haz una captura rápida para demostrar compatibilidad.

Guarda en: `docs/design/validaciones-finales/`

---

### 7.6 Test Navegación por Teclado

| Archivo Necesario | Descripción |
|-------------------|-------------|
| `keyboard-nav-focus.png` | Captura mostrando el focus visible en elementos interactivos |
| `keyboard-nav-skip-link.png` | Skip link activo (si existe) |

**Instrucciones:**
1. Navega con Tab por la página
2. Captura cuando el focus esté en un botón/link visible
3. Guarda en: `docs/design/validaciones-finales/`

---

### 7.7 Test con Lector de Pantalla (Opcional pero muy recomendado)

| Archivo Necesario | Descripción |
|-------------------|-------------|
| `nvda-reading.png` o `nvda-video.mp4` | NVDA leyendo la página |

**Instrucciones:**
1. Descarga NVDA (gratuito): https://www.nvaccess.org/download/
2. Actívalo y navega por la página
3. Graba un video corto o haz captura del visor de habla

---

## 🟡 Verificación: Imágenes que SÍ existen

### img-fase1/ ✅ COMPLETO
- [x] `showcase-paleta-colores-light.png`
- [x] `showcase-modo-oscuro-light.png`
- [x] `showcase-tipografia-light.png`
- [x] `showcase-botones-neobrutalistas-light.png`
- [x] `showcase-inputs-light.png`
- [x] `showcase-controles-seleccion-light.png`
- [x] `showcase-navegacion-light.png`
- [x] `showcase-badges-tags-light.png`
- [x] `showcase-progress-bars-light.png`
- [x] `showcase-alertas-neon-light.png`
- [x] `pagina_principal-vistazo_jeraraquia.png`
- [x] `pagina_principal-vistazo_modo_oscuro.png`
- [x] `perfil_usuario-alineacion.png`
- [x] `carruseles-ejemplo-proximidad.png`

### img-fase3/ ✅ COMPLETO
- [x] `header-escritorio.png`
- [x] `header-movil.png`
- [x] `botones-variantes-tamanios.png`
- [x] `botones-estados-completo.png`
- [x] `botones-combinaciones-completo.png`
- [x] `card-variantes-carrusel.png`
- [x] `card-variantes-perfiles-propios.png`
- [x] `card-variante-horizontal.png`
- [x] `text-area.png`
- [x] `select-options.png`
- [x] `checkbox.png`
- [x] `radiobuttons.png`
- [x] `breadcrumbs.png`
- [x] `elementos-feedback.png`
- [x] `carrusel-tipo1.png`
- [x] `formulario-login.png`
- [x] `formulario-crear-cuenta.png`
- [x] `formulario-recuperar-contrasenia.png`

### img-fase6/ ✅ COMPLETO
- [x] `home-light.png`
- [x] `home-dark.png`
- [x] `home-grayscale.png`
- [x] `profile-light.png`
- [x] `profile-dark.png`
- [x] `profile-grayscale.png`
- [x] `details-light.png`
- [x] `details-dark.png`
- [x] `details-grayscale.png`

### validaciones-finales/ ⚠️ INCOMPLETO
- [x] `html-w3c.png`
- [x] `css-w3c.png`
- [ ] `lighthouse-accessibility-*.png` ❌
- [ ] `lighthouse-performance-*.png` ❌
- [ ] `wave-*.png` ❌

---

## 📋 Resumen Ejecutivo

| Carpeta | Estado | Capturas Pendientes |
|---------|--------|---------------------|
| `img-fase1/` | ✅ Completo | 0 |
| `img-fase3/` | ✅ Completo | 0 |
| `img-fase4/` | ❌ VACÍA | **7 capturas responsive** |
| `img-fase6/` | ✅ Completo | 0 |
| `validaciones-finales/` | ⚠️ Incompleto | **~10 capturas accesibilidad** |

### Total capturas pendientes: ~17

---

## ✅ Checklist de Capturas

### Fase 4 - Responsive (7 capturas)
- [ ] `home-mobile.png` (375px)
- [ ] `home-tablet.png` (768px)
- [ ] `home-desktop.png` (1280px)
- [ ] `profile-mobile.png` (375px)
- [ ] `profile-desktop.png` (1280px)
- [ ] `detail-mobile.png` (375px)
- [ ] `detail-desktop.png` (1280px)

### Sección 7 - Accesibilidad (~10 capturas)
- [ ] `lighthouse-accessibility-home.png`
- [ ] `lighthouse-accessibility-profile.png`
- [ ] `lighthouse-accessibility-detail.png`
- [ ] `lighthouse-performance-home.png`
- [ ] `wave-home.png`
- [ ] `wave-profile.png`
- [ ] `chrome-home.png`
- [ ] `firefox-home.png`
- [ ] `edge-home.png`
- [ ] `keyboard-nav-focus.png`

### Opcional (suma puntos)
- [ ] `axe-devtools-home.png`
- [ ] `nvda-reading.png` o video

---

## 🎯 Prioridad de Capturas

1. **CRÍTICO:** `img-fase4/` responsive (sin estas, la sección 4 queda sin evidencia visual)
2. **CRÍTICO:** Lighthouse Accessibility (requerido para RA5)
3. **IMPORTANTE:** WAVE (complementa Lighthouse)
4. **IMPORTANTE:** Cross-browser (Chrome/Firefox/Edge)
5. **OPCIONAL:** axe DevTools, NVDA

---

*Última actualización: 22 de enero de 2026*
