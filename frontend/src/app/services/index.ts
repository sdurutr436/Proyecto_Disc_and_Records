/**
 * Servicios de Estado Reactivo
 *
 * Este módulo exporta todos los servicios relacionados con
 * la gestión de estado reactivo usando Angular Signals.
 *
 * @example
 * ```typescript
 * import { AlbumStateService, ReviewStateService } from '@app/services';
 * ```
 */

// Estado de álbumes
export { AlbumStateService } from './album-state.service';

// Estado de reviews
export { ReviewStateService } from './review-state.service';

// Servicios de datos
export { AlbumService } from './album.service';
export { ArtistService } from './artist.service';
export { SongService } from './song.service';
export { DeezerService } from './deezer.service';
export { ListaAlbumService } from './lista-album.service';

// Servicios existentes (re-exportar para conveniencia)
// NOTA: Los nombres de archivo usan el formato corto sin ".service"
export { AppStateService } from './app-state';
export { AuthService } from './auth';
export { EventBusService, EventType } from './event-bus';
export { LoadingService } from './loading';
export { ThemeService } from './theme';
