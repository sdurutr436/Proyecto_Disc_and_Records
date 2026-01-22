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
   * Precarga la imagen actual para el tema activo
   */
  private preloadCurrentImage(): void {
    const hero = this.currentHero();
    const img = new Image();
    img.src = hero.srcMedium;
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
