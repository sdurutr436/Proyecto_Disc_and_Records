import { Injectable, signal, computed } from '@angular/core';

/**
 * Representa un asset de héroe (silueta de artista)
 */
export interface HeroAsset {
  /** Nombre identificador del artista */
  name: string;
  /** Ruta al archivo de imagen */
  src: string;
  /** Texto alternativo para accesibilidad */
  alt: string;
}

/**
 * HeroService - Gestiona la silueta estática del hero backdrop
 *
 * Inspirado en Letterboxd: silueta permanente y sutil.
 * Sin rotación automática - se selecciona aleatoriamente al cargar.
 *
 * La silueta se muestra muy atenuada:
 * - Modo claro: silueta naranja suave
 * - Modo oscuro: silueta más clara que el fondo
 * - Escala de grises: silueta blanca sutil
 */
@Injectable({
  providedIn: 'root'
})
export class HeroService {
  /** Lista de assets de siluetas de artistas disponibles */
  private readonly assets: HeroAsset[] = [
    {
      name: 'david-bowie',
      src: 'assets/images/hero/david_bowie_1.webp',
      alt: 'Silueta de David Bowie'
    },
    {
      name: 'david-bowie-2',
      src: 'assets/images/hero/david_bowie_2.webp',
      alt: 'Silueta de David Bowie'
    },
    {
      name: 'freddie-mercury',
      src: 'assets/images/hero/freddie_mercury.webp',
      alt: 'Silueta de Freddie Mercury'
    },
    {
      name: 'jimi-hendrix',
      src: 'assets/images/hero/jimmy_hendrix.webp',
      alt: 'Silueta de Jimi Hendrix'
    },
    {
      name: 'prince',
      src: 'assets/images/hero/prince.webp',
      alt: 'Silueta de Prince'
    }
  ];

  /** Índice seleccionado aleatoriamente al iniciar */
  private readonly selectedIndex = signal(this.getRandomIndex());

  /** Asset actual (estático, no cambia después de carga) */
  readonly currentHero = computed(() => this.assets[this.selectedIndex()]);

  /** Lista completa de assets (solo lectura) */
  readonly allAssets = computed(() => [...this.assets]);

  constructor() {
    this.preloadCurrentImage();
  }

  /**
   * Obtiene un índice aleatorio para seleccionar la silueta inicial
   */
  private getRandomIndex(): number {
    return Math.floor(Math.random() * this.assets.length);
  }

  /**
   * Precarga solo la imagen seleccionada
   */
  private preloadCurrentImage(): void {
    const img = new Image();
    img.src = this.assets[this.selectedIndex()].src;
  }
}
