import { inject } from '@angular/core';
import { Router, ResolveFn } from '@angular/router';
import { Observable, of, catchError, finalize, tap } from 'rxjs';
import { Song } from '../models/data.models';
import { SongService } from '../services/song.service';
import { LoadingService } from '../services/loading';
import { NotificationStreamService } from '../services/notification-stream';
import { BreadcrumbService } from '../services/breadcrumb.service';

/**
 * Resolver funcional para precargar datos de canción antes de activar la ruta
 *
 * Características:
 * - Integra LoadingService para mostrar estado de carga durante navegación
 * - Manejo de errores: redirige a 404 si la canción no existe
 * - Notifica al usuario en caso de error
 * - Compatible con Angular 19+ (functional resolver)
 *
 * Uso en rutas:
 * ```typescript
 * {
 *   path: 'song/:id',
 *   loadComponent: () => import('./detail/detail').then(m => m.Detail),
 *   resolve: { song: songResolver }
 * }
 * ```
 *
 * Acceso en componente:
 * ```typescript
 * const song = this.route.snapshot.data['song'] as Song;
 * ```
 */
export const songResolver: ResolveFn<Song | null> = (route, state): Observable<Song | null> => {
  const songService = inject(SongService);
  const loadingService = inject(LoadingService);
  const notificationStream = inject(NotificationStreamService);
  const breadcrumbService = inject(BreadcrumbService);
  const router = inject(Router);

  const songId = route.paramMap.get('id');

  if (!songId) {
    notificationStream.error('ID inválido', 'El ID de la canción no es válido');
    router.navigate(['/404']);
    return of(null);
  }

  // Iniciar loading state global
  loadingService.start('Cargando canción...');

  return songService.getSongById(songId).pipe(
    tap((song) => {
      // Actualizar breadcrumb con el título real de la canción
      if (song) {
        breadcrumbService.updateCurrentBreadcrumb(song.title);
      }
      // Datos cargados exitosamente
      loadingService.stop();
    }),
    catchError((error) => {
      console.error('Error loading song:', error);

      // Notificar error al usuario
      notificationStream.error(
        'Error',
        'No se pudo cargar la canción. Redirigiendo...'
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
