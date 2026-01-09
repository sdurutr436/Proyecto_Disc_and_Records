import { inject } from '@angular/core';
import { Router, ResolveFn } from '@angular/router';
import { Observable, of, catchError, finalize, tap } from 'rxjs';
import { Album } from '../models/data.models';
import { AlbumService } from '../services/album.service';
import { LoadingService } from '../services/loading';
import { NotificationStreamService } from '../services/notification-stream';

/**
 * Resolver funcional para precargar datos de álbum antes de activar la ruta
 *
 * Características:
 * - Integra LoadingService para mostrar estado de carga durante navegación
 * - Manejo de errores: redirige a 404 si el álbum no existe
 * - Notifica al usuario en caso de error
 * - Compatible con Angular 19+ (functional resolver)
 *
 * Uso en rutas:
 * ```typescript
 * {
 *   path: 'album/:id',
 *   loadComponent: () => import('./detail/detail').then(m => m.Detail),
 *   resolve: { album: albumResolver }
 * }
 * ```
 *
 * Acceso en componente:
 * ```typescript
 * const album = this.route.snapshot.data['album'] as Album;
 * ```
 */
export const albumResolver: ResolveFn<Album | null> = (route, state): Observable<Album | null> => {
  const albumService = inject(AlbumService);
  const loadingService = inject(LoadingService);
  const notificationStream = inject(NotificationStreamService);
  const router = inject(Router);

  const albumId = route.paramMap.get('id');

  if (!albumId) {
    notificationStream.error('ID inválido', 'El ID del álbum no es válido');
    router.navigate(['/404']);
    return of(null);
  }

  // Iniciar loading state global
  loadingService.start('Cargando álbum...');

  return albumService.getAlbumById(albumId).pipe(
    tap(() => {
      // Datos cargados exitosamente
      loadingService.stop();
    }),
    catchError((error) => {
      console.error('Error loading album:', error);

      // Notificar error al usuario
      notificationStream.error(
        'Error',
        'No se pudo cargar el álbum. Redirigiendo...'
      );

      // Redirigir a página 404
      setTimeout(() => {
        router.navigate(['/404']);
      }, 500);

      loadingService.stop();
      return of(null);
    }),
    finalize(() => {
      // Asegurar que el loading se detenga siempre
      loadingService.stop();
    })
  );
};
