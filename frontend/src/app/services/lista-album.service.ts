import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { API_CONFIG } from '../config/api.config';
import {
  AlbumEnLista,
  AgregarAlbumListaDTO,
  PuntuarAlbumDTO,
  EstadoAlbumUsuario,
  CreateResenaAlbumDTO,
  ResenaAlbumResponse
} from '../models/data.models';
import { environment } from '../../environments/environment';
import { AppStateService } from './app-state';
import { NotificationStreamService } from './notification-stream';

/**
 * ListaAlbumService - Gestión de la lista de álbumes del usuario
 *
 * FUNCIONALIDADES:
 * - Añadir/quitar álbumes de la lista
 * - Puntuar álbumes (requiere estar en lista)
 * - Escribir reseñas (requiere estar en lista)
 * - Consultar estado del álbum para el usuario actual
 *
 * REGLAS DE NEGOCIO:
 * - Solo se puede puntuar si el álbum está en la lista
 * - Solo se puede reseñar si el álbum está en la lista
 * - Al quitar de la lista, la reseña se oculta pero no se pierde
 */
@Injectable({
  providedIn: 'root'
})
export class ListaAlbumService {
  private http = inject(HttpClient);
  private appState = inject(AppStateService);
  private notifications = inject(NotificationStreamService);

  private get baseUrl(): string {
    return `${API_CONFIG.baseUrl}/usuarios`;
  }

  // ==========================================================================
  // LISTA DE ÁLBUMES
  // ==========================================================================

  /**
   * Obtener la lista de álbumes del usuario
   */
  getListaUsuario(usuarioId: number, page = 0, size = 20): Observable<AlbumEnLista[]> {
    if (environment.useMockData) {
      return of([]); // En modo mock, lista vacía
    }

    return this.http.get<AlbumEnLista[]>(
      `${this.baseUrl}/${usuarioId}/lista`,
      { params: { page: String(page), size: String(size) } }
    ).pipe(
      catchError(error => {
        console.error('Error obteniendo lista de álbumes:', error);
        return of([]);
      })
    );
  }

  /**
   * Verificar si un álbum está en la lista del usuario
   */
  estaEnLista(usuarioId: number, albumId: number): Observable<boolean> {
    if (environment.useMockData) {
      return of(false);
    }

    return this.http.get<{ enLista: boolean }>(
      `${this.baseUrl}/${usuarioId}/lista/${albumId}/existe`
    ).pipe(
      map(response => response.enLista),
      catchError(() => of(false))
    );
  }

  /**
   * Obtener estado completo del álbum para el usuario
   */
  getEstadoAlbum(usuarioId: number, albumId: number): Observable<EstadoAlbumUsuario | null> {
    if (environment.useMockData) {
      return of(null);
    }

    return this.http.get<AlbumEnLista>(
      `${this.baseUrl}/${usuarioId}/lista/${albumId}`
    ).pipe(
      map(album => ({
        enLista: true,
        puntuacion: album.puntuacion,
        tieneResena: album.tieneResena,
        fechaAgregada: album.fechaAgregada
      })),
      catchError(() => of(null))
    );
  }

  /**
   * Añadir álbum a la lista del usuario
   */
  agregarALista(albumId: number): Observable<AlbumEnLista | null> {
    const user = this.appState.currentUser();
    if (!user) {
      this.notifications.warning('Sesión requerida', 'Debes iniciar sesión para añadir álbumes a tu lista');
      return of(null);
    }

    if (environment.useMockData) {
      this.notifications.success('Añadido', 'Álbum añadido a tu lista');
      return of(null);
    }

    const dto: AgregarAlbumListaDTO = {
      usuarioId: user.id,
      albumId
    };

    return this.http.post<AlbumEnLista>(
      `${this.baseUrl}/${user.id}/lista`,
      dto
    ).pipe(
      tap(() => {
        this.notifications.success('Añadido', 'Álbum añadido a tu lista');
      }),
      catchError(error => {
        const mensaje = error.error?.message || 'No se pudo añadir el álbum';
        this.notifications.error('Error', mensaje);
        return of(null);
      })
    );
  }

  /**
   * Quitar álbum de la lista del usuario
   */
  quitarDeLista(albumId: number): Observable<boolean> {
    const user = this.appState.currentUser();
    if (!user) {
      return of(false);
    }

    if (environment.useMockData) {
      this.notifications.info('Quitado', 'Álbum quitado de tu lista');
      return of(true);
    }

    return this.http.delete<void>(
      `${this.baseUrl}/${user.id}/lista/${albumId}`
    ).pipe(
      tap(() => {
        this.notifications.info('Quitado', 'Álbum quitado de tu lista');
      }),
      map(() => true),
      catchError(error => {
        const mensaje = error.error?.message || 'No se pudo quitar el álbum';
        this.notifications.error('Error', mensaje);
        return of(false);
      })
    );
  }

  // ==========================================================================
  // PUNTUACIÓN
  // ==========================================================================

  /**
   * Puntuar un álbum (debe estar en la lista)
   */
  puntuarAlbum(albumId: number, puntuacion: number): Observable<AlbumEnLista | null> {
    const user = this.appState.currentUser();
    if (!user) {
      this.notifications.warning('Sesión requerida', 'Debes iniciar sesión para puntuar');
      return of(null);
    }

    if (environment.useMockData) {
      this.notifications.success('Puntuado', `Has dado ${puntuacion} estrellas`);
      return of(null);
    }

    const dto: PuntuarAlbumDTO = {
      usuarioId: user.id,
      albumId,
      puntuacion
    };

    return this.http.post<AlbumEnLista>(
      `${this.baseUrl}/${user.id}/lista/${albumId}/puntuacion`,
      dto
    ).pipe(
      tap(() => {
        this.notifications.success('Puntuado', `Has dado ${puntuacion} estrellas`);
      }),
      catchError(error => {
        const mensaje = error.error?.message || 'Debes añadir el álbum a tu lista antes de puntuarlo';
        this.notifications.error('Error', mensaje);
        return of(null);
      })
    );
  }

  /**
   * Quitar puntuación de un álbum
   */
  quitarPuntuacion(albumId: number): Observable<AlbumEnLista | null> {
    const user = this.appState.currentUser();
    if (!user) {
      return of(null);
    }

    if (environment.useMockData) {
      return of(null);
    }

    return this.http.delete<AlbumEnLista>(
      `${this.baseUrl}/${user.id}/lista/${albumId}/puntuacion`
    ).pipe(
      catchError(() => of(null))
    );
  }

  // ==========================================================================
  // RESEÑAS
  // ==========================================================================

  /**
   * Escribir o actualizar reseña de un álbum (debe estar en la lista)
   */
  escribirResena(albumId: number, textoResena: string, puntuacion?: number): Observable<ResenaAlbumResponse | null> {
    const user = this.appState.currentUser();
    if (!user) {
      this.notifications.warning('Sesión requerida', 'Debes iniciar sesión para escribir una reseña');
      return of(null);
    }

    if (environment.useMockData) {
      this.notifications.success('Reseña guardada', 'Tu reseña ha sido publicada');
      return of(null);
    }

    const dto: CreateResenaAlbumDTO = {
      usuarioId: user.id,
      albumId,
      puntuacion: puntuacion ?? 0,
      textoResena
    };

    return this.http.post<ResenaAlbumResponse>(
      `${API_CONFIG.baseUrl}/resenas/albumes`,
      dto
    ).pipe(
      tap(() => {
        this.notifications.success('Reseña guardada', 'Tu reseña ha sido publicada');
      }),
      catchError(error => {
        const mensaje = error.error?.message || 'Debes añadir el álbum a tu lista antes de reseñarlo';
        this.notifications.error('Error', mensaje);
        return of(null);
      })
    );
  }

  /**
   * Obtener reseñas de un álbum (ordenadas de más nueva a más antigua)
   */
  getResenasAlbum(albumId: number): Observable<ResenaAlbumResponse[]> {
    if (environment.useMockData) {
      return of([]);
    }

    return this.http.get<ResenaAlbumResponse[]>(
      `${API_CONFIG.baseUrl}/resenas/albumes/${albumId}`
    ).pipe(
      catchError(() => of([]))
    );
  }

  /**
   * Obtener reseñas del usuario
   */
  getResenasUsuario(usuarioId: number): Observable<ResenaAlbumResponse[]> {
    if (environment.useMockData) {
      return of([]);
    }

    return this.http.get<ResenaAlbumResponse[]>(
      `${API_CONFIG.baseUrl}/resenas/albumes/usuario/${usuarioId}`
    ).pipe(
      catchError(() => of([]))
    );
  }

  // ==========================================================================
  // ESTADÍSTICAS
  // ==========================================================================

  /**
   * Contar álbumes en la lista del usuario
   */
  contarAlbumes(usuarioId: number): Observable<number> {
    if (environment.useMockData) {
      return of(0);
    }

    return this.http.get<{ total: number }>(
      `${this.baseUrl}/${usuarioId}/lista/count`
    ).pipe(
      map(response => response.total),
      catchError(() => of(0))
    );
  }
}
