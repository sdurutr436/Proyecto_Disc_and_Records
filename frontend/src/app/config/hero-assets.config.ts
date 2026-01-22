/**
 * Configuración de assets del Hero Section
 *
 * Este archivo centraliza la configuración de las imágenes
 * del hero para facilitar el mantenimiento y la adición
 * de nuevas imágenes.
 *
 * Estructura de carpetas (inspirado en Expedition 33):
 * - clair: imágenes para modo claro
 * - obscur: imágenes para modo oscuro
 * - renoir: imágenes para modo contraste/grayscale
 */

/**
 * Tipo de tema para el hero
 */
export type HeroTheme = 'light' | 'dark' | 'grayscale';

/**
 * Tamaños disponibles para las imágenes responsive
 */
export type HeroSize = 'small' | 'medium' | 'large' | 'extra_large';

/**
 * Representa un asset de héroe (silueta de artista)
 */
export interface HeroAsset {
  /** Nombre identificador del artista */
  name: string;
  /** Carpeta del artista dentro del tema */
  folder: string;
  /** Prefijo del archivo (antes del tamaño) */
  filePrefix: string;
  /** Texto alternativo para accesibilidad */
  alt: string;
}

/**
 * Imagen del hero con sus variantes responsive
 */
export interface HeroImage {
  name: string;
  alt: string;
  srcSmall: string;
  srcMedium: string;
  srcLarge: string;
  srcExtraLarge: string;
}

/**
 * Ruta base de las imágenes del hero
 */
export const HERO_ASSETS_BASE_PATH = 'assets/images/hero';

/**
 * Mapeo de temas a carpetas del sistema de archivos
 */
export const HERO_THEME_FOLDERS: Record<HeroTheme, string> = {
  light: 'clair',
  dark: 'obscur',
  grayscale: 'renoir'
};

/**
 * Assets disponibles por tema
 *
 * Para añadir nuevas imágenes:
 * 1. Añade las imágenes en la carpeta correspondiente (clair/obscur/renoir)
 * 2. Crea una subcarpeta con el nombre del artista
 * 3. Nombra los archivos: {prefijo}_{small|medium|large|extra_large}.webp
 * 4. Añade la entrada aquí con folder, filePrefix y alt
 */
export const HERO_ASSETS_BY_THEME: Record<HeroTheme, HeroAsset[]> = {
  light: [
    {
      name: 'freddie-mercury',
      folder: 'freddie_mercury',
      filePrefix: 'freddie_mercury_light',
      alt: 'Silueta de Freddie Mercury'
    }
  ],
  dark: [
    {
      name: 'freddie-mercury',
      folder: 'freddie_mercury',
      filePrefix: 'freddie',
      alt: 'Silueta de Freddie Mercury'
    }
  ],
  grayscale: [
    {
      name: 'freddie-mercury',
      folder: 'freddie_mercury',
      filePrefix: 'freddie_mercury_gray',
      alt: 'Silueta de Freddie Mercury'
    }
  ]
};

/**
 * Construye la ruta base de un asset
 */
export function buildAssetBasePath(asset: HeroAsset, theme: HeroTheme): string {
  const themeFolder = HERO_THEME_FOLDERS[theme];
  return `${HERO_ASSETS_BASE_PATH}/${themeFolder}/${asset.folder}/${asset.filePrefix}`;
}

/**
 * Construye un objeto HeroImage completo con todas las rutas responsive
 */
export function buildHeroImage(asset: HeroAsset, theme: HeroTheme): HeroImage {
  const basePath = buildAssetBasePath(asset, theme);
  return {
    name: asset.name,
    alt: asset.alt,
    srcSmall: `${basePath}_small.webp`,
    srcMedium: `${basePath}_medium.webp`,
    srcLarge: `${basePath}_large.webp`,
    srcExtraLarge: `${basePath}_extra_large.webp`
  };
}
