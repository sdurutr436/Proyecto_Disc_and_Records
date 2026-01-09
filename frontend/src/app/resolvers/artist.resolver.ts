import { inject } from '@angular/core';
import { Router, ResolveFn } from '@angular/router';
import { Observable, of, catchError, finalize, tap } from 'rxjs';
import { Artist } from '../models/data.models';
import { ArtistService } from '../services/artist.service';
import { LoadingService } from '../services/loading';
import { NotificationStreamService } from '../services/notification-stream';

/**
 * Resolver funcional para precargar datos de artista antes de activar la ruta
 *
 * Características:
 * - Integra LoadingService para mostrar estado de carga durante navegación
 * - Manejo de errores: redirige a 404 si el artista no existe
 * - Notifica al usuario en caso de error
 * - Compatible con Angular 19+ (functional resolver)
 *
 * Uso en rutas:
 * ```typescript
 * {
 *   path: 'artist/:id',
 *   loadComponent: () => import('./detail/detail').then(m => m.Detail),
 *   resolve: { artist: artistResolver }
 * }
 * ```
 *
 * Acceso en componente:
 * ```typescript
 * const artist = this.route.snapshot.data['artist'] as Artist;
 * ```
 */
export const artistResolver: ResolveFn<Artist | null> = (route, state): Observable<Artist | null> => {
  const artistService = inject(ArtistService);
  const loadingService = inject(LoadingService);
  const notificationStream = inject(NotificationStreamService);
  const router = inject(Router);

  const artistId = route.paramMap.get('id');

  if (!artistId) {
    notificationStream.error('ID inválido', 'El ID del artista no es válido');
    router.navigate(['/404']);
    return of(null);
  }

  // Iniciar loading state global
  loadingService.start('Cargando artista...');

  return artistService.getArtistById(artistId).pipe(
    tap(() => {
      // Datos cargados exitosamente
      loadingService.stop();
    }),
    catchError((error) => {
      console.error('Error loading artist:', error);

      // Notificar error al usuario
      notificationStream.error(
        'Error',
        'No se pudo cargar el artista. Redirigiendo...'
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
