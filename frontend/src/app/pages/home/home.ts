import { Component, inject } from '@angular/core';
import { Router, NavigationExtras } from '@angular/router';
import { Button } from '../../components/shared/button/button';

/**
 * COMPONENTE HOME - FASE 4: NAVEGACIÓN PROGRAMÁTICA
 *
 * EJEMPLOS DE NAVEGACIÓN:
 *
 * 1. NAVEGACIÓN SIMPLE:
 *    router.navigate(['/albums'])
 *
 * 2. NAVEGACIÓN CON PARÁMETROS:
 *    router.navigate(['/albums', albumId])
 *
 * 3. NAVEGACIÓN CON QUERY PARAMS:
 *    router.navigate(['/albums'], { queryParams: { genre: 'rock' } })
 *
 * 4. NAVEGACIÓN CON FRAGMENT:
 *    router.navigate(['/about'], { fragment: 'team' })
 *
 * 5. NAVEGACIÓN CON ESTADO:
 *    router.navigate(['/albums'], { state: { from: 'home' } })
 *
 * 6. NAVEGACIÓN RELATIVA:
 *    router.navigate(['../albums'], { relativeTo: this.route })
 */

@Component({
  selector: 'app-home',
  imports: [Button],
  templateUrl: './home.html',
  styleUrl: './home.scss'
})
export class Home {
  private router = inject(Router);

  /**
   * Ejemplo 1: Navegación simple
   */
  goToAlbums() {
    this.router.navigate(['/albums']);
  }

  /**
   * Ejemplo 2: Navegación con parámetros de ruta
   */
  goToAlbumDetail(albumId: number) {
    this.router.navigate(['/albums', albumId]);
  }

  /**
   * Ejemplo 3: Navegación con query params
   * URL resultante: /albums?genre=rock&year=1973
   */
  goToAlbumsFiltered() {
    const navigationExtras: NavigationExtras = {
      queryParams: {
        genre: 'rock',
        year: 1973
      }
    };

    this.router.navigate(['/albums'], navigationExtras);
  }

  /**
   * Ejemplo 4: Navegación con fragment (anchor)
   * URL resultante: /about#team
   */
  goToAboutTeam() {
    this.router.navigate(['/about'], {
      fragment: 'team'
    });
  }

  /**
   * Ejemplo 5: Navegación con estado
   * El estado se pasa sin modificar la URL
   * Útil para pasar datos entre componentes sin exponerlos en la URL
   */
  goToAlbumsWithState() {
    this.router.navigate(['/albums'], {
      state: {
        from: 'home',
        timestamp: Date.now(),
        message: 'Navegación desde Home'
      }
    });
  }

  /**
   * Ejemplo 6: Navegación con múltiples opciones combinadas
   */
  goToAlbumDetailAdvanced(albumId: number) {
    const navigationExtras: NavigationExtras = {
      queryParams: {
        ref: 'home',
        highlight: 'reviews'
      },
      fragment: 'reviews',
      state: {
        previousPage: 'home'
      },
      queryParamsHandling: 'merge' // Preserva query params existentes
    };

    this.router.navigate(['/albums', albumId], navigationExtras);
  }

  /**
   * Ejemplo 7: Navegación programática a ruta externa
   */
  goToStyleGuide() {
    this.router.navigate(['/style-guide']);
  }

  /**
   * Ejemplo 8: Navegación a nueva creación de álbum
   */
  createNewAlbum() {
    this.router.navigate(['/albums', 'new']);
  }

  /**
   * Ejemplo 9: Verificar si podemos navegar (si el usuario está autenticado)
   */
  async tryNavigateToProtectedRoute() {
    try {
      await this.router.navigate(['/albums', 'new']);
      console.log('Navegación exitosa');
    } catch (error) {
      console.error('Error de navegación:', error);
    }
  }

  /**
   * Ejemplo 10: Obtener la URL actual
   */
  getCurrentUrl(): string {
    return this.router.url;
  }
}
