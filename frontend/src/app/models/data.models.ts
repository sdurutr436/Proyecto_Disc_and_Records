/**
 * Modelos de datos de la aplicación
 *
 * IMPORTANTE: Estos modelos reflejan exactamente los DTOs del backend
 * para garantizar compatibilidad en las peticiones HTTP.
 *
 * Backend: Spring Boot - com.discsandrecords.api.dto
 * Endpoints: /api/albumes, /api/artistas, /api/resenas, etc.
 */

// =============================================================================
// MODELOS BACKEND (DTOs exactos)
// =============================================================================

/**
 * Respuesta del backend para artistas
 * Mapea: ArtistaResponseDTO.java
 */
export interface ArtistaResponse {
  id: number;
  nombreArtista: string;
  puntuacionMedia: number | null;
}

/**
 * Respuesta del backend para álbumes
 * Mapea: AlbumResponseDTO.java
 */
export interface AlbumResponse {
  id: number;
  tituloAlbum: string;
  anioSalida: number;
  portadaUrl: string | null;
  puntuacionMedia: number | null;
  artista: ArtistaResponse;
}

/**
 * Respuesta del backend para canciones
 * Mapea: CancionResponseDTO.java
 */
export interface CancionResponse {
  id: number;
  tituloCancion: string;
  anioSalida: number;
  puntuacionMedia: number | null;
  artista: ArtistaResponse;
}

/**
 * Respuesta del backend para reseñas de álbumes
 * Mapea: ResenaAlbumResponseDTO.java
 */
export interface ResenaAlbumResponse {
  usuarioId: number;
  nombreUsuario: string;
  avatarUsuario: string | null;
  albumId: number;
  tituloAlbum: string;
  portadaUrl: string | null;
  puntuacion: number;
  textoResena: string;
  fechaResena: string; // ISO string, convertir a Date en frontend
  escuchado: boolean;
}

/**
 * Respuesta del backend para reseñas de canciones
 * Mapea: ResenaCancionResponseDTO.java
 */
export interface ResenaCancionResponse {
  usuarioId: number;
  nombreUsuario: string;
  avatarUsuario: string | null;
  cancionId: number;
  tituloCancion: string;
  puntuacion: number;
  textoResena: string;
  fechaResena: string;
  escuchado: boolean;
}

/**
 * Respuesta del backend para usuarios
 * Mapea: UsuarioResponseDTO.java
 */
export interface UsuarioResponse {
  id: number;
  nombreUsuario: string;
  mail: string;
  avatar: string | null;
  biografia: string | null;
  fechaRegistro: string;
}

/**
 * Respuesta de autenticación
 * Mapea: AuthResponseDTO.java
 */
export interface AuthResponse {
  token: string;
  tipo: string;
  id: number;
  nombreUsuario: string;
  mail: string;
  role: string;
}

/**
 * Respuesta paginada genérica
 * Mapea: PageResponseDTO.java
 */
export interface PageResponse<T> {
  content: T[];
  page: number;
  size: number;
  totalElements: number;
  totalPages: number;
  first: boolean;
  last: boolean;
}

/**
 * Respuesta de género
 * Mapea: GeneroResponseDTO.java
 */
export interface GeneroResponse {
  id: number;
  nombreGenero: string;
}

// =============================================================================
// DTOs PARA CREAR/ACTUALIZAR (Request bodies)
// =============================================================================

/**
 * DTO para crear álbum
 * Mapea: CreateAlbumDTO.java
 */
export interface CreateAlbumDTO {
  tituloAlbum: string;
  anioSalida: number;
  portadaUrl?: string;
  idArtista: number; // Backend usa idArtista, no artistaId
}

/**
 * DTO para crear artista
 * Mapea: CreateArtistaDTO.java
 */
export interface CreateArtistaDTO {
  nombreArtista: string;
}

/**
 * DTO para crear canción
 * Mapea: CreateCancionDTO.java
 */
export interface CreateCancionDTO {
  tituloCancion: string;
  anioSalida: number;
  idArtista: number; // Backend usa idArtista, no artistaId
}

/**
 * DTO para crear reseña de álbum
 * Mapea: CreateResenaAlbumDTO.java
 */
export interface CreateResenaAlbumDTO {
  usuarioId: number;
  albumId: number;
  puntuacion: number;
  textoResena: string;
}

/**
 * DTO para crear reseña de canción
 * Mapea: CreateResenaCancionDTO.java
 */
export interface CreateResenaCancionDTO {
  usuarioId: number;
  cancionId: number;
  puntuacion: number;
  textoResena: string;
}

/**
 * DTO para actualizar reseña
 * Mapea: UpdateResenaDTO.java
 */
export interface UpdateResenaDTO {
  puntuacion?: number;
  textoResena?: string;
}

/**
 * DTO para login
 * Mapea: LoginRequestDTO.java
 */
export interface LoginRequestDTO {
  mail: string;
  contrasena: string;
}

/**
 * DTO para registro
 * Mapea: RegisterRequestDTO.java
 */
export interface RegisterRequestDTO {
  nombreUsuario: string;
  mail: string;
  contrasena: string;
}

/**
 * DTO para actualizar usuario
 * Mapea: UpdateUsuarioDTO.java
 */
export interface UpdateUsuarioDTO {
  nombreUsuario?: string;
  avatar?: string;
  biografia?: string;
}

// =============================================================================
// MODELOS FRONTEND (Para uso interno en componentes)
// Estos son aliases más amigables o modelos con transformaciones
// =============================================================================

/**
 * @deprecated Usar AlbumResponse directamente
 * Mantenido para retrocompatibilidad durante migración
 */
export interface Album {
  id: string;
  title: string;
  artist: string;
  artistId: string;
  coverUrl: string;
  releaseYear: number;
  genre: string;
  tracks: number;
  duration: string;
  label: string;
  description: string;
  averageRating: number;
  totalReviews: number;
}

/**
 * Estadísticas de un álbum desde el backend propio
 * (NO de Deezer - estas son métricas de usuarios reales)
 */
export interface AlbumStats {
  albumId?: number;
  reviewCount: number;
  ratingCount: number;
  averageRating: number | null;
  listenedCount: number;
}

/**
 * @deprecated Usar ArtistaResponse directamente
 */
export interface Artist {
  id: string;
  name: string;
  bio: string;
  photoUrl: string;
  genre: string;
  activeYears: string;
  albums: number;
  monthlyListeners: number;
}

/**
 * @deprecated Usar CancionResponse directamente
 */
export interface Song {
  id: string;
  title: string;
  artist: string;
  artistId: string;
  album: string;
  albumId: string;
  duration: string;
  releaseYear: number;
  genre: string;
  coverUrl: string;
  description: string;
  averageRating: number;
  totalReviews: number;
  // Campos opcionales de Spotify
  previewUrl?: string;
  spotifyUrl?: string;
  trackNumber?: number;
  discNumber?: number;
  explicit?: boolean;
  popularity?: number;
}

/**
 * Track dentro de un álbum (no hay DTO backend aún)
 */
export interface Track {
  id: string;
  number: number;
  title: string;
  duration: string;
}

/**
 * @deprecated Usar ResenaAlbumResponse directamente
 */
export interface Review {
  id: string;
  albumId?: string;
  userId: string;
  userName?: string;
  username?: string;
  userAvatar: string;
  rating: number;
  content: string;
  date: Date | string;
  likes: number;
}

/**
 * Resultados de búsqueda global
 */
export interface SearchResults {
  albums: AlbumResponse[];
  artists: ArtistaResponse[];
  songs: CancionResponse[];
  totalResults: number;
}

// =============================================================================
// UTILIDADES DE MAPEO
// =============================================================================

/**
 * Convierte AlbumResponse del backend a Album del frontend (legacy)
 * Usar solo para retrocompatibilidad durante migración
 */
export function mapAlbumResponseToLegacy(album: AlbumResponse): Album {
  return {
    id: String(album.id),
    title: album.tituloAlbum,
    artist: album.artista.nombreArtista,
    artistId: String(album.artista.id),
    coverUrl: album.portadaUrl || 'assets/album-placeholder.svg',
    releaseYear: album.anioSalida,
    genre: '', // No disponible en DTO actual
    tracks: 0, // No disponible en DTO actual
    duration: '', // No disponible en DTO actual
    label: '', // No disponible en DTO actual
    description: '', // No disponible en DTO actual
    averageRating: album.puntuacionMedia ?? 0,
    totalReviews: 0 // No disponible en DTO actual
  };
}

/**
 * Convierte ArtistaResponse del backend a Artist del frontend (legacy)
 */
export function mapArtistaResponseToLegacy(artista: ArtistaResponse): Artist {
  return {
    id: String(artista.id),
    name: artista.nombreArtista,
    bio: '', // No disponible en DTO actual
    photoUrl: 'assets/artist-placeholder.svg',
    genre: '', // No disponible en DTO actual
    activeYears: '', // No disponible en DTO actual
    albums: 0, // No disponible en DTO actual
    monthlyListeners: 0 // No disponible en DTO actual
  };
}

/**
 * Convierte ResenaAlbumResponse del backend a Review del frontend (legacy)
 */
export function mapResenaToLegacy(resena: ResenaAlbumResponse): Review {
  return {
    id: `${resena.usuarioId}-${resena.albumId}`, // Clave compuesta
    userId: String(resena.usuarioId),
    userName: resena.nombreUsuario,
    userAvatar: resena.avatarUsuario || 'assets/profile-placeholder.svg',
    rating: resena.puntuacion,
    content: resena.textoResena,
    date: new Date(resena.fechaResena),
    likes: 0 // No disponible en DTO actual
  };
}

// =============================================================================
// MODELOS LISTA DE ÁLBUMES DEL USUARIO
// =============================================================================

/**
 * Álbum en la lista del usuario
 * Mapea: AlbumEnListaDTO.java
 */
export interface AlbumEnLista {
  albumId: number;
  titulo: string;
  portadaUrl: string | null;
  artista: string | null;
  anio: number;
  puntuacion: number | null;
  tieneResena: boolean;
  fechaAgregada: string;
  fechaResena: string | null;
}

/**
 * DTO para añadir álbum a la lista
 * Mapea: AgregarAlbumListaDTO.java
 */
export interface AgregarAlbumListaDTO {
  usuarioId: number;
  albumId: number;
}

/**
 * DTO para puntuar un álbum
 * Mapea: PuntuarAlbumDTO.java
 */
export interface PuntuarAlbumDTO {
  usuarioId: number;
  albumId: number;
  puntuacion: number;
}

/**
 * Estado del álbum para el usuario actual
 */
export interface EstadoAlbumUsuario {
  enLista: boolean;
  puntuacion: number | null;
  tieneResena: boolean;
  fechaAgregada: string | null;
}

