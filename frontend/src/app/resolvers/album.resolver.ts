import { inject } from '@angular/core';
import { Router, ResolveFn } from '@angular/router';
import { Observable, of, catchError, finalize, tap, switchMap } from 'rxjs';
import { Album } from '../models/data.models';
import { AlbumService } from '../services/album.service';
import { LoadingService } from '../services/loading';
import { NotificationStreamService } from '../services/notification-stream';
import { BreadcrumbService } from '../services/breadcrumb.service';

/**
 * Resolver funcional para precargar datos de álbum antes de activar la ruta
 *
 * PATRÓN: HIDRATACIÓN ANTICIPADA (Eager Hydration)
 *
 * FLUJO ACTUALIZADO:
 * 1. Si el ID es numérico → Buscar primero en BD local
 * 2. Si no existe en BD local → Intentar importar desde Deezer
 * 3. Si la importación falla → Error 404
 *
 * IMPORTANTE:
 * - Los IDs en las rutas /album/:id DEBEN ser IDs internos (locales)
 * - La importación desde Deezer ocurre ANTES de navegar (en AlbumNavigationService)
 * - Este resolver solo carga datos de la BD local
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
  const breadcrumbService = inject(BreadcrumbService);
  const router = inject(Router);

  const albumId = route.paramMap.get('id');

  if (!albumId) {
    notificationStream.error('ID inválido', 'El ID del álbum no es válido');
    router.navigate(['/404']);
    return of(null);
  }

  // Validar que el ID sea numérico (ID local)
  const numericId = parseInt(albumId, 10);
  if (isNaN(numericId)) {
    console.warn(`ID no numérico detectado: ${albumId}. Redirigiendo a 404.`);
    notificationStream.error(
      'ID inválido',
      'El ID del álbum debe ser numérico. ¿Intentaste usar un ID de Deezer directamente?'
    );
    router.navigate(['/404']);
    return of(null);
  }

  // Iniciar loading state global
  loadingService.start('Cargando álbum...');

  // Cargar desde BD local
  return albumService.getAlbumByIdLocal(numericId).pipe(
    switchMap((album) => {
      if (album) {
        // Álbum encontrado en BD local
        breadcrumbService.updateCurrentBreadcrumb(album.title);
        loadingService.stop();
        return of(album);
      }

      // No encontrado en BD local
      // Esto puede pasar si alguien accede directamente a /album/{id} sin importar
      console.warn(`Álbum ${numericId} no encontrado en BD local`);

      // Intentar interpretar como ID de Deezer (fallback para compatibilidad)
      console.log(`Intentando importar ${albumId} como álbum de Deezer...`);
      loadingService.start('Importando álbum...');

      return albumService.importFromDeezer(albumId).pipe(
        tap((importedAlbum) => {
          if (importedAlbum) {
            breadcrumbService.updateCurrentBreadcrumb(importedAlbum.title);
            // Si el ID local es diferente al solicitado, redirigir
            if (importedAlbum.id !== albumId) {
              console.log(`Redirigiendo de /album/${albumId} a /album/${importedAlbum.id}`);
              router.navigate(['/album', importedAlbum.id], { replaceUrl: true });
            }
          }
        }),
        catchError((importError) => {
          console.error('No se pudo importar como álbum de Deezer:', importError);
          notificationStream.error(
            'Álbum no encontrado',
            'El álbum solicitado no existe en nuestra base de datos ni en Deezer.'
          );
          router.navigate(['/404']);
          return of(null);
        })
      );
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

