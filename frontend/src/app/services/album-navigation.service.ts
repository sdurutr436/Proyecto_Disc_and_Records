import { Injectable, inject, signal } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, of, throwError } from 'rxjs';
import { catchError, finalize, tap } from 'rxjs/operators';
import { Album } from '../models/data.models';
import { AlbumService } from './album.service';
import { NotificationStreamService } from './notification-stream';

/**
 * AlbumNavigationService - Servicio de Navegación de Álbumes
 *
 * PATRÓN: Hidratación Anticipada (Eager Hydration)
 *
 * Este servicio maneja la navegación a vistas de detalle de álbumes,
 * distinguiendo entre álbumes locales (ya en BD) y álbumes de Deezer
 * (que necesitan ser importados primero).
 *
 * FLUJO:
 * 1. Usuario hace clic en card de álbum
 * 2. Card llama a navigateToAlbum(id, source)
 * 3. Si source='deezer': Importar primero, luego navegar con ID local
 * 4. Si source='local': Navegar directamente con el ID dado
 * 5. Vista de detalle SIEMPRE carga desde /api/albumes/{id_local}
 *
 * ESTADOS:
 * - isImporting: Signal que indica si hay una importación en curso
 * - Usado para mostrar spinner en la UI durante la importación
 */
@Injectable({
  providedIn: 'root'
})
export class AlbumNavigationService {
  private router = inject(Router);
  private albumService = inject(AlbumService);
  private notifications = inject(NotificationStreamService);

  /** Signal que indica si hay una importación en curso */
  isImporting = signal<boolean>(false);

  /** ID del álbum que se está importando actualmente (para UI) */
  importingAlbumId = signal<string | null>(null);

  /**
   * Navega a la vista de detalle de un álbum.
   *
   * Para álbumes de Deezer:
   * 1. Muestra spinner de importación
   * 2. Llama al backend para importar/recuperar
   * 3. Navega usando el ID interno devuelto
   *
   * Para álbumes locales:
   * 1. Navega directamente con el ID dado
   *
   * @param albumId ID del álbum (string para compatibilidad)
   * @param source Origen del álbum: 'deezer' | 'local'
   * @returns Observable que completa cuando la navegación termina
   */
  navigateToAlbum(albumId: string, source: 'deezer' | 'local' = 'deezer'): Observable<Album | null> {
    // Validación básica
    if (!albumId || albumId.trim() === '') {
      console.error('ID de álbum vacío');
      return of(null);
    }

    // Si es local, verificar que sea numérico y navegar directamente
    if (source === 'local') {
      const numericId = parseInt(albumId, 10);
      if (isNaN(numericId)) {
        console.error('ID local debe ser numérico:', albumId);
        this.notifications.error('Error', 'ID de álbum inválido');
        return of(null);
      }

      this.router.navigate(['/album', albumId]);
      return of(null);
    }

    // Para Deezer: importar primero
    return this.importAndNavigate(albumId);
  }

  /**
   * Importa un álbum de Deezer y navega a su detalle.
   *
   * @param deezerId ID del álbum en Deezer
   * @returns Observable del álbum importado
   */
  private importAndNavigate(deezerId: string): Observable<Album | null> {
    // Marcar inicio de importación
    this.isImporting.set(true);
    this.importingAlbumId.set(deezerId);

    console.log(`🔄 Importando álbum Deezer: ${deezerId}`);

    return this.albumService.importFromDeezer(deezerId).pipe(
      tap(album => {
        console.log(`✅ Álbum importado, navegando a /album/${album.id}`);
        // Navegar usando el ID interno (local)
        this.router.navigate(['/album', album.id]);
      }),
      catchError(error => {
        console.error('❌ Error al importar álbum:', error);

        // Mostrar notificación de error
        const message = error.message || 'No se pudo importar el álbum. Intenta más tarde.';
        this.notifications.error('Error de importación', message);

        return of(null);
      }),
      finalize(() => {
        // Limpiar estado de importación
        this.isImporting.set(false);
        this.importingAlbumId.set(null);
      })
    );
  }

  /**
   * Determina si un ID parece ser de Deezer o local.
   *
   * Heurística:
   * - Los IDs de Deezer son números grandes (> 1000000 típicamente)
   * - Los IDs locales empiezan desde 1 y son secuenciales
   * - Si no podemos determinar, asumimos Deezer (más seguro)
   *
   * NOTA: Esta es una heurística, no es 100% confiable.
   * Preferir usar el parámetro `source` explícito cuando sea posible.
   *
   * @param id ID a analizar
   * @returns 'deezer' | 'local' | 'unknown'
   */
  detectSource(id: string): 'deezer' | 'local' | 'unknown' {
    const numericId = parseInt(id, 10);

    if (isNaN(numericId)) {
      return 'unknown';
    }

    // Heurística: IDs locales típicamente son menores a 10000
    // IDs de Deezer son mucho más grandes
    // NOTA: Esto es una aproximación, no es 100% confiable
    if (numericId < 10000) {
      return 'local';
    }

    return 'deezer';
  }

  /**
   * Navega inteligentemente detectando el origen del ID.
   *
   * PRECAUCIÓN: Usa heurística para detectar el origen.
   * Preferir navigateToAlbum() con source explícito.
   *
   * @param albumId ID del álbum
   */
  navigateToAlbumSmart(albumId: string): Observable<Album | null> {
    const source = this.detectSource(albumId);

    if (source === 'unknown') {
      this.notifications.error('Error', 'ID de álbum inválido');
      return of(null);
    }

    // Por seguridad, si es ambiguo, intentar importar
    // (el backend devolverá el existente si ya existe)
    return this.navigateToAlbum(albumId, source === 'local' ? 'local' : 'deezer');
  }
}
