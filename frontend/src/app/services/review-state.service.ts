import { Injectable, signal, computed, inject, DestroyRef } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { Observable, Subject, tap, catchError, of, finalize, switchMap, map } from 'rxjs';
import { Review, ResenaAlbumResponse, CreateResenaAlbumDTO, UpdateResenaDTO, mapResenaToLegacy } from '../models/data.models';
import { BaseHttpService } from './base-http.service';
import { API_ENDPOINTS } from '../config/api.config';
import { NotificationStreamService } from './notification-stream';
import { EventBusService, EventType } from './event-bus';
import { AppStateService } from './app-state';

/**
 * ReviewStateService - Servicio de Estado Reactivo para Reseñas
 *
 * PROPÓSITO:
 * - Gestionar reseñas de álbumes con actualizaciones en tiempo real
 * - CRUD de reseñas con sincronización automática de listas
 * - Optimistic updates para mejor UX
 * - Integración con sistema de notificaciones
 *
 * BACKEND ENDPOINTS (ResenaController):
 * - GET /api/resenas/albumes/{albumId} - Listar reseñas de un álbum
 * - GET /api/resenas/albumes/usuario/{usuarioId} - Reseñas de un usuario
 * - GET /api/resenas/albumes/{albumId}/usuario/{usuarioId} - Reseña específica
 * - POST /api/resenas/albumes - Crear reseña (autenticado)
 * - PUT /api/resenas/albumes/{albumId}/usuario/{usuarioId} - Actualizar (autor/admin)
 * - DELETE /api/resenas/albumes/{albumId}/usuario/{usuarioId} - Eliminar (autor/admin)
 */
@Injectable({
  providedIn: 'root'
})
export class ReviewStateService extends BaseHttpService {
  private destroyRef = inject(DestroyRef);
  private notifications = inject(NotificationStreamService);
  private eventBus = inject(EventBusService);
  private appState = inject(AppStateService);

  // ==========================================================================
  // ESTADO (Signals)
  // ==========================================================================

  /** Mapa de reseñas por albumId */
  private _reviewsByAlbum = signal<Map<string, Review[]>>(new Map());

  /** Reseñas del usuario actual */
  private _userReviews = signal<Review[]>([]);
  readonly userReviews = this._userReviews.asReadonly();

  /** Estado de carga por álbum */
  private _loadingAlbums = signal<Set<string>>(new Set());

  /** Estado de envío de reseña */
  private _isSubmitting = signal<boolean>(false);
  readonly isSubmitting = this._isSubmitting.asReadonly();

  /** Error actual */
  private _error = signal<string | null>(null);
  readonly error = this._error.asReadonly();

  /** Trigger para recargar reseñas de un álbum */
  private refreshTrigger$ = new Subject<string>();

  // ==========================================================================
  // COMPUTED
  // ==========================================================================

  /** Total de reseñas del usuario */
  readonly userReviewsCount = computed(() => this._userReviews().length);

  /** Promedio de puntuaciones del usuario */
  readonly userAverageRating = computed(() => {
    const reviews = this._userReviews();
    if (reviews.length === 0) return 0;
    const sum = reviews.reduce((acc, r) => acc + r.rating, 0);
    return Math.round((sum / reviews.length) * 10) / 10;
  });

  constructor() {
    super();
    this.setupRefreshSubscription();
    this.loadUserReviewsOnAuth();
  }

  /**
   * Configura la suscripción para refrescar reseñas
   */
  private setupRefreshSubscription(): void {
    this.refreshTrigger$.pipe(
      switchMap(albumId => this.fetchReviewsForAlbum(albumId)),
      takeUntilDestroyed(this.destroyRef)
    ).subscribe();
  }

  /**
   * Carga las reseñas del usuario cuando se autentica
   */
  private loadUserReviewsOnAuth(): void {
    // Escuchar evento de login para cargar reseñas del usuario
    this.eventBus.on(EventType.USER_LOGIN)
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe(() => {
        const user = this.appState.currentUser();
        if (user?.id) {
          this.loadUserReviews(user.id);
        }
      });
  }

  // ==========================================================================
  // MÉTODOS PÚBLICOS - LECTURA
  // ==========================================================================

  /**
   * Obtiene las reseñas de un álbum (con caché)
   * @param albumId - ID del álbum
   * @returns Array de reseñas para ese álbum
   */
  getReviewsForAlbum(albumId: string): Review[] {
    const cached = this._reviewsByAlbum().get(albumId);

    // Si no hay caché, cargar del servidor
    if (!cached) {
      this.loadReviewsForAlbum(albumId);
      return [];
    }

    return cached;
  }

  /**
   * Carga reseñas de un álbum desde el servidor
   */
  loadReviewsForAlbum(albumId: string): void {
    const loadingSet = this._loadingAlbums();
    if (loadingSet.has(albumId)) return; // Ya está cargando

    this._loadingAlbums.update(set => new Set([...set, albumId]));

    this.fetchReviewsForAlbum(albumId).pipe(
      takeUntilDestroyed(this.destroyRef)
    ).subscribe();
  }

  /**
   * Carga las reseñas del usuario actual
   */
  loadUserReviews(userId: number): void {
    this.get<ResenaAlbumResponse[]>(API_ENDPOINTS.resenas.albumesByUsuario(userId)).pipe(
      tap(reviews => {
        this._userReviews.set(reviews.map(r => mapResenaToLegacy(r)));
      }),
      catchError(err => {
        console.error('Error loading user reviews:', err);
        return of([]);
      }),
      takeUntilDestroyed(this.destroyRef)
    ).subscribe();
  }

  /**
   * Verifica si el usuario actual ya reseñó un álbum
   */
  hasUserReviewed(albumId: string): boolean {
    const user = this.appState.currentUser();
    if (!user) return false;

    return this._userReviews().some(r => {
      // Comparar con el albumId del review
      const reviewAlbumId = (r as any).albumId?.toString() || '';
      return reviewAlbumId === albumId;
    });
  }

  /**
   * Obtiene la reseña del usuario para un álbum específico
   */
  getUserReviewForAlbum(albumId: string): Review | null {
    const user = this.appState.currentUser();
    if (!user) return null;

    return this._userReviews().find(r => {
      const reviewAlbumId = (r as any).albumId?.toString() || '';
      return reviewAlbumId === albumId;
    }) || null;
  }

  /**
   * Verifica si está cargando reseñas de un álbum
   */
  isLoadingAlbum(albumId: string): boolean {
    return this._loadingAlbums().has(albumId);
  }

  // ==========================================================================
  // MÉTODOS PÚBLICOS - CRUD
  // ==========================================================================

  /**
   * Crear una nueva reseña
   * Actualiza automáticamente las listas locales
   */
  createReview(albumId: string, rating: number, content: string): Observable<Review> {
    const user = this.appState.currentUser();
    if (!user) {
      this.notifications.error('Error', 'Debes iniciar sesión para reseñar');
      throw new Error('Usuario no autenticado');
    }

    this._isSubmitting.set(true);
    this._error.set(null);

    const dto: CreateResenaAlbumDTO = {
      usuarioId: user.id,
      albumId: parseInt(albumId),
      puntuacion: rating,
      textoResena: content
    };

    return this.post<ResenaAlbumResponse>(API_ENDPOINTS.resenas.albumCreate, dto).pipe(
      map(backendReview => mapResenaToLegacy(backendReview)),
      tap(review => {
        // Añadir a reseñas del usuario
        this._userReviews.update(reviews => [review, ...reviews]);

        // Añadir a caché del álbum
        this._reviewsByAlbum.update(map => {
          const newMap = new Map(map);
          const albumReviews = newMap.get(albumId) || [];
          newMap.set(albumId, [review, ...albumReviews]);
          return newMap;
        });

        // Notificar éxito
        this.notifications.success('Reseña publicada', 'Tu reseña se ha publicado correctamente');

        // Emitir evento
        this.eventBus.emit({
          type: EventType.ALBUM_RATED,
          payload: { albumId, rating, userId: user.id }
        });
      }),
      catchError(err => {
        const message = err?.error?.message || 'No se pudo publicar la reseña';
        this._error.set(message);
        this.notifications.error('Error', message);
        throw err;
      }),
      finalize(() => this._isSubmitting.set(false))
    );
  }

  /**
   * Actualizar una reseña existente
   */
  updateReview(albumId: string, rating?: number, content?: string): Observable<Review> {
    const user = this.appState.currentUser();
    if (!user) {
      throw new Error('Usuario no autenticado');
    }

    this._isSubmitting.set(true);
    this._error.set(null);

    const dto: UpdateResenaDTO = {};
    if (rating !== undefined) dto.puntuacion = rating;
    if (content !== undefined) dto.textoResena = content;

    return this.put<ResenaAlbumResponse>(
      API_ENDPOINTS.resenas.albumUpdate(parseInt(albumId), user.id),
      dto
    ).pipe(
      map(backendReview => mapResenaToLegacy(backendReview)),
      tap(updatedReview => {
        // Actualizar en reseñas del usuario
        this._userReviews.update(reviews =>
          reviews.map(r => {
            const rAlbumId = (r as any).albumId?.toString();
            return rAlbumId === albumId ? updatedReview : r;
          })
        );

        // Actualizar en caché del álbum
        this._reviewsByAlbum.update(reviewMap => {
          const newMap = new Map(reviewMap);
          const albumReviews = newMap.get(albumId) || [];
          newMap.set(albumId, albumReviews.map(r =>
            r.userId === user.id.toString() ? updatedReview : r
          ));
          return newMap;
        });

        this.notifications.success('Reseña actualizada', 'Tu reseña se ha actualizado correctamente');
      }),
      catchError(err => {
        const message = err?.error?.message || 'No se pudo actualizar la reseña';
        this._error.set(message);
        this.notifications.error('Error', message);
        throw err;
      }),
      finalize(() => this._isSubmitting.set(false))
    );
  }

  /**
   * Eliminar una reseña
   */
  deleteReview(albumId: string): Observable<void> {
    const user = this.appState.currentUser();
    if (!user) {
      throw new Error('Usuario no autenticado');
    }

    this._isSubmitting.set(true);

    return this.http.delete<void>(
      this.buildUrl(API_ENDPOINTS.resenas.albumDelete(parseInt(albumId), user.id))
    ).pipe(
      tap(() => {
        // Remover de reseñas del usuario
        this._userReviews.update(reviews =>
          reviews.filter(r => {
            const rAlbumId = (r as any).albumId?.toString();
            return rAlbumId !== albumId;
          })
        );

        // Remover de caché del álbum
        this._reviewsByAlbum.update(map => {
          const newMap = new Map(map);
          const albumReviews = newMap.get(albumId) || [];
          newMap.set(albumId, albumReviews.filter(r => r.userId !== user.id.toString()));
          return newMap;
        });

        this.notifications.success('Reseña eliminada', 'Tu reseña se ha eliminado correctamente');
      }),
      catchError(err => {
        this.notifications.error('Error', 'No se pudo eliminar la reseña');
        throw err;
      }),
      finalize(() => this._isSubmitting.set(false))
    );
  }

  /**
   * Refrescar reseñas de un álbum (forzar recarga)
   */
  refreshAlbumReviews(albumId: string): void {
    this.refreshTrigger$.next(albumId);
  }

  // ==========================================================================
  // MÉTODOS PRIVADOS
  // ==========================================================================

  /**
   * Fetch de reseñas desde el backend
   */
  private fetchReviewsForAlbum(albumId: string): Observable<Review[]> {
    return this.get<ResenaAlbumResponse[]>(API_ENDPOINTS.resenas.albumesByAlbum(parseInt(albumId))).pipe(
      tap(reviews => {
        const mappedReviews = reviews.map(r => mapResenaToLegacy(r));

        // Guardar en caché
        this._reviewsByAlbum.update(map => {
          const newMap = new Map(map);
          newMap.set(albumId, mappedReviews);
          return newMap;
        });
      }),
      catchError(err => {
        console.error(`Error fetching reviews for album ${albumId}:`, err);
        // Devolver array vacío si el backend no responde
        return of([]);
      }),
      finalize(() => {
        this._loadingAlbums.update(set => {
          const newSet = new Set(set);
          newSet.delete(albumId);
          return newSet;
        });
      }),
      // Mapear a Review[]
      tap(() => {}),
      switchMap(() => of(this._reviewsByAlbum().get(albumId) || []))
    );
  }
}
