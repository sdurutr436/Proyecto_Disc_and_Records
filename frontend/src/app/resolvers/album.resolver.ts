import { inject } from '@angular/core';
import { ResolveFn, ActivatedRouteSnapshot } from '@angular/router';
import { LoadingService } from '../services/loading';

/**
 * Interfaz para datos de álbum
 */
interface Album {
  id: number;
  title: string;
  artist: string;
  year: number;
  genre: string;
  coverUrl: string;
  rating: number;
  description: string;
}

/**
 * AlbumResolver - Resolver para precargar datos del álbum antes de activar la ruta
 *
 * PROPÓSITO:
 * - Cargar datos necesarios ANTES de mostrar el componente
 * - Evitar mostrar componente sin datos (loading states)
 * - Centralizar lógica de carga de datos
 * - Manejar errores de carga antes de renderizar
 *
 * FLUJO:
 * 1. Usuario navega a /albums/123
 * 2. Resolver se ejecuta automáticamente
 * 3. Carga datos del álbum con ID 123
 * 4. Una vez cargados, activa la ruta y pasa datos al componente
 * 5. Componente recibe datos via ActivatedRoute.data
 *
 * USO EN RUTA:
 * ```typescript
 * {
 *   path: 'albums/:id',
 *   component: AlbumDetailComponent,
 *   resolve: { album: albumResolver }
 * }
 * ```
 *
 * USO EN COMPONENTE:
 * ```typescript
 * export class AlbumDetailComponent {
 *   private route = inject(ActivatedRoute);
 *
 *   ngOnInit() {
 *     this.route.data.subscribe(data => {
 *       const album = data['album']; // Datos precargados
 *       console.log('Álbum cargado:', album);
 *     });
 *   }
 * }
 * ```
 *
 * VENTAJAS VS CARGAR EN COMPONENTE:
 * ✅ Datos disponibles inmediatamente al renderizar
 * ✅ No necesitas gestionar loading states en cada componente
 * ✅ Reutilizable para múltiples componentes
 * ✅ Manejo centralizado de errores
 * ✅ Mejor UX (no parpadeo de contenido)
 *
 * DESVENTAJAS:
 * ❌ Retrasa navegación hasta que datos estén listos
 * ❌ Para datos lentos, considerar cargar en componente con skeleton
 *
 * NOTA:
 * Este es un resolver funcional (función en lugar de clase)
 * que es el enfoque recomendado en Angular moderno
 */
export const albumResolver: ResolveFn<Album> = async (route: ActivatedRouteSnapshot) => {
  const loadingService = inject(LoadingService);

  // Obtener ID del álbum desde los parámetros de ruta
  const albumId = route.paramMap.get('id');

  if (!albumId) {
    throw new Error('ID de álbum no proporcionado');
  }

  console.log(`[AlbumResolver] Cargando álbum con ID: ${albumId}`);

  // Mostrar loading global mientras se resuelve
  loadingService.start('Cargando álbum...');

  try {
    // Simulación de llamada HTTP
    // En producción, esto sería: await http.get(`/api/albums/${albumId}`)
    await new Promise(resolve => setTimeout(resolve, 800));

    const mockAlbum: Album = {
      id: +albumId,
      title: 'The Dark Side of the Moon',
      artist: 'Pink Floyd',
      year: 1973,
      genre: 'Progressive Rock',
      coverUrl: 'https://via.placeholder.com/400x400?text=Dark+Side',
      rating: 4.8,
      description: 'The Dark Side of the Moon es el octavo álbum de estudio de la banda británica de rock progresivo Pink Floyd, lanzado el 1 de marzo de 1973.'
    };

    console.log('[AlbumResolver] Álbum cargado exitosamente:', mockAlbum.title);

    loadingService.stop();
    return mockAlbum;

  } catch (error) {
    console.error('[AlbumResolver] Error al cargar álbum:', error);
    loadingService.stop();

    // En producción, podrías redirigir a una página de error
    // o devolver un álbum por defecto
    throw error;
  }
};

/**
 * AlbumsListResolver - Resolver para precargar lista de álbumes
 *
 * USO:
 * ```typescript
 * {
 *   path: 'albums',
 *   component: AlbumListComponent,
 *   resolve: { albums: albumsListResolver }
 * }
 * ```
 */
export const albumsListResolver: ResolveFn<Album[]> = async () => {
  const loadingService = inject(LoadingService);

  console.log('[AlbumsListResolver] Cargando lista de álbumes...');

  loadingService.start('Cargando álbumes...');

  try {
    // Simulación de llamada HTTP
    await new Promise(resolve => setTimeout(resolve, 600));

    const mockAlbums: Album[] = [
      {
        id: 1,
        title: 'The Dark Side of the Moon',
        artist: 'Pink Floyd',
        year: 1973,
        genre: 'Progressive Rock',
        coverUrl: 'https://via.placeholder.com/300x300?text=Dark+Side',
        rating: 4.8,
        description: 'Álbum conceptual icónico'
      },
      {
        id: 2,
        title: 'Abbey Road',
        artist: 'The Beatles',
        year: 1969,
        genre: 'Rock',
        coverUrl: 'https://via.placeholder.com/300x300?text=Abbey+Road',
        rating: 4.9,
        description: 'Último álbum grabado por The Beatles'
      },
      {
        id: 3,
        title: 'Thriller',
        artist: 'Michael Jackson',
        year: 1982,
        genre: 'Pop',
        coverUrl: 'https://via.placeholder.com/300x300?text=Thriller',
        rating: 4.7,
        description: 'Álbum más vendido de todos los tiempos'
      }
    ];

    console.log(`[AlbumsListResolver] ${mockAlbums.length} álbumes cargados`);

    loadingService.stop();
    return mockAlbums;

  } catch (error) {
    console.error('[AlbumsListResolver] Error al cargar álbumes:', error);
    loadingService.stop();
    throw error;
  }
};
