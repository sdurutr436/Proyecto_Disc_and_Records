import { Injectable, computed, inject } from '@angular/core';
import { ThemeService } from './theme';
import {
  HeroTheme,
  HeroImage,
  HERO_ASSETS_BY_THEME,
  buildHeroImage
} from '../config/hero-assets.config';

// Re-exportar tipos para uso externo
export type { HeroTheme, HeroImage } from '../config/hero-assets.config';

/**
 * HeroService - Gestiona el carrusel de imágenes del hero backdrop
 *
 * Las imágenes están organizadas por tema (Expedition 33):
 * - clair: imágenes para modo claro
 * - obscur: imágenes para modo oscuro
 * - renoir: imágenes para modo contraste/grayscale
 *
 * La configuración de assets está externalizada en:
 * @see config/hero-assets.config.ts
 */
@Injectable({
  providedIn: 'root'
})
export class HeroService {
  private readonly themeService = inject(ThemeService);

  /** Índice seleccionado para cada tema (se genera al inicializar) */
  private readonly selectedIndices: Record<HeroTheme, number> = {
    light: this.getRandomIndex('light'),
    dark: this.getRandomIndex('dark'),
    grayscale: this.getRandomIndex('grayscale')
  };

  /** Tema actual derivado del ThemeService */
  private readonly currentTheme = computed((): HeroTheme => {
    const theme = this.themeService.currentTheme();
    if (theme === 'dark') return 'dark';
    if (theme === 'grayscale') return 'grayscale';
    return 'light';
  });

  /** Asset actual según el tema */
  readonly currentHero = computed((): HeroImage => {
    const theme = this.currentTheme();
    const assets = HERO_ASSETS_BY_THEME[theme];
    const index = this.selectedIndices[theme];
    const asset = assets[index];
    return buildHeroImage(asset, theme);
  });

  /** Lista de assets del tema actual */
  readonly currentAssets = computed(() => {
    const theme = this.currentTheme();
    return HERO_ASSETS_BY_THEME[theme].map(asset => buildHeroImage(asset, theme));
  });

  constructor() {
    this.preloadCurrentImage();
  }

  /**
   * Obtiene un índice aleatorio para el tema especificado
   */
  private getRandomIndex(theme: HeroTheme): number {
    const assets = HERO_ASSETS_BY_THEME[theme];
    return Math.floor(Math.random() * assets.length);
  }

  /**
   * Precarga la imagen actual para el tema activo (LCP optimization)
   * Usa link preload para máxima prioridad - ADAPTATIVO según viewport
   */
  private preloadCurrentImage(): void {
    const hero = this.currentHero();

    if (typeof document === 'undefined' || typeof window === 'undefined') {
      return;
    }

    // Determinar qué imagen precargar según el viewport (móvil primero)
    const viewportWidth = window.innerWidth;
    let imageSrc: string;
    let imageSrcset: string;

    if (viewportWidth <= 479) {
      imageSrc = hero.srcSmall;
      imageSrcset = `${hero.srcSmall} 480w`;
    } else if (viewportWidth <= 767) {
      imageSrc = hero.srcMedium;
      imageSrcset = `${hero.srcMedium} 768w`;
    } else if (viewportWidth <= 1199) {
      imageSrc = hero.srcLarge;
      imageSrcset = `${hero.srcLarge} 1200w`;
    } else {
      imageSrc = hero.srcExtraLarge;
      imageSrcset = `${hero.srcExtraLarge} 1920w`;
    }

    // Crear link preload con srcset para imágenes responsive
    const preloadLink = document.createElement('link');
    preloadLink.rel = 'preload';
    preloadLink.as = 'image';
    preloadLink.href = imageSrc;
    preloadLink.type = 'image/webp';
    preloadLink.fetchPriority = 'high';
    // Añadir imagesrcset para mejor compatibilidad
    preloadLink.setAttribute('imagesrcset',
      `${hero.srcSmall} 480w, ${hero.srcMedium} 768w, ${hero.srcLarge} 1200w, ${hero.srcExtraLarge} 1920w`
    );
    preloadLink.setAttribute('imagesizes', '100vw');
    document.head.appendChild(preloadLink);

    // También precargar con Image para navegadores que no soportan link preload
    const img = new Image();
    img.fetchPriority = 'high';
    img.src = imageSrc;
  }

  /**
   * Fuerza una nueva selección aleatoria para todos los temas
   */
  shuffleAll(): void {
    this.selectedIndices.light = this.getRandomIndex('light');
    this.selectedIndices.dark = this.getRandomIndex('dark');
    this.selectedIndices.grayscale = this.getRandomIndex('grayscale');
  }
}
