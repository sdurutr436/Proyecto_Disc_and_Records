import { Injectable } from '@angular/core';
import { AbstractControl, AsyncValidatorFn, ValidationErrors } from '@angular/forms';
import { Observable, of, timer, defer } from 'rxjs';
import { map, switchMap, take, catchError, delay } from 'rxjs/operators';

/**
 * Servicio de Validadores Asíncronos para Disc and Records
 *
 * Proporciona validadores asíncronos como servicio inyectable,
 * permitiendo configuración centralizada y acceso a HttpClient.
 *
 * VENTAJAS:
 * - Inyección de dependencias (HttpClient, otros servicios)
 * - Configuración centralizada del debounce
 * - Fácil testing con mocks
 * - Reutilización en múltiples componentes
 *
 * @example
 * ```typescript
 * constructor(
 *   private fb: FormBuilder,
 *   private asyncValidators: AsyncValidatorsService
 * ) {
 *   this.form = this.fb.group({
 *     email: ['', {
 *       validators: [Validators.required, Validators.email],
 *       asyncValidators: [this.asyncValidators.emailUnique()],
 *       updateOn: 'blur'
 *     }]
 *   });
 * }
 * ```
 */
@Injectable({
  providedIn: 'root'
})
export class AsyncValidatorsService {

  /**
   * Tiempo de debounce por defecto (ms)
   * Evita múltiples llamadas API mientras el usuario escribe
   */
  private readonly defaultDebounceTime = 500;

  /**
   * Emails simulados como ya registrados
   * En producción: llamada HTTP real
   */
  private readonly registeredEmails = [
    'admin@discandrecords.com',
    'test@example.com',
    'usuario@discandrecords.com',
    'demo@demo.com',
    'soporte@discandrecords.com'
  ];

  /**
   * Usernames simulados como ya tomados
   * En producción: llamada HTTP real
   */
  private readonly takenUsernames = [
    'admin',
    'administrator',
    'root',
    'superuser',
    'discandrecords',
    'moderator',
    'support',
    'help',
    'info'
  ];

  /**
   * Validador de Email Único
   *
   * Retorna un AsyncValidatorFn que verifica si el email ya está registrado.
   *
   * @param excludeUserId - ID de usuario a excluir (para edición de perfil)
   * @param debounceMs - Tiempo de debounce personalizado (default: 500ms)
   *
   * @returns AsyncValidatorFn para usar en FormControl
   *
   * @example
   * ```typescript
   * email: ['', {
   *   validators: [Validators.required, Validators.email],
   *   asyncValidators: [this.asyncValidators.emailUnique()],
   *   updateOn: 'blur'
   * }]
   * ```
   */
  emailUnique(excludeUserId?: string, debounceMs?: number): AsyncValidatorFn {
    const debounce = debounceMs ?? this.defaultDebounceTime;

    return (control: AbstractControl): Observable<ValidationErrors | null> => {
      const email = control.value?.trim().toLowerCase();

      if (!email) {
        return of(null);
      }

      return defer(() => timer(debounce)).pipe(
        switchMap(() => this.checkEmailAvailability(email, excludeUserId)),
        take(1)
      );
    };
  }

  /**
   * Validador de Username Disponible
   *
   * Retorna un AsyncValidatorFn que verifica si el username está disponible.
   *
   * @param debounceMs - Tiempo de debounce personalizado (default: 500ms)
   *
   * @returns AsyncValidatorFn para usar en FormControl
   *
   * @example
   * ```typescript
   * username: ['', {
   *   validators: [Validators.required, Validators.minLength(3)],
   *   asyncValidators: [this.asyncValidators.usernameAvailable()],
   *   updateOn: 'blur'
   * }]
   * ```
   */
  usernameAvailable(debounceMs?: number): AsyncValidatorFn {
    const debounce = debounceMs ?? this.defaultDebounceTime;

    return (control: AbstractControl): Observable<ValidationErrors | null> => {
      const username = control.value?.trim().toLowerCase();

      if (!username || username.length < 3) {
        return of(null);
      }

      return defer(() => timer(debounce)).pipe(
        switchMap(() => this.checkUsernameAvailability(username)),
        take(1)
      );
    };
  }

  /**
   * Verificar disponibilidad de email
   *
   * SIMULACIÓN: En producción sería una llamada HTTP:
   * return this.http.get<boolean>(`/api/users/email-exists/${email}`)
   *
   * @param email - Email a verificar
   * @param excludeUserId - ID de usuario a excluir
   * @returns Observable con null (disponible) o { emailTaken: true }
   */
  private checkEmailAvailability(
    email: string,
    excludeUserId?: string
  ): Observable<ValidationErrors | null> {
    // Simular delay de respuesta API (300-800ms)
    const apiDelay = 300 + Math.random() * 500;

    return of(this.registeredEmails.includes(email)).pipe(
      delay(apiDelay),
      map(exists => exists ? { emailTaken: true } : null),
      catchError(() => of(null)) // Error de red no bloquea
    );
  }

  /**
   * Verificar disponibilidad de username
   *
   * SIMULACIÓN: En producción sería una llamada HTTP:
   * return this.http.get<{ available: boolean }>(`/api/usernames/${username}`)
   *
   * @param username - Username a verificar
   * @returns Observable con null (disponible) o { usernameTaken: true }
   */
  private checkUsernameAvailability(
    username: string
  ): Observable<ValidationErrors | null> {
    // Simular delay de respuesta API
    const apiDelay = 200 + Math.random() * 400;

    return of(this.takenUsernames.includes(username)).pipe(
      delay(apiDelay),
      map(isTaken => isTaken ? { usernameTaken: true } : null),
      catchError(() => of(null))
    );
  }

  /**
   * Verificar disponibilidad de nombre de artista (específico Disc and Records)
   *
   * @param debounceMs - Tiempo de debounce
   * @returns AsyncValidatorFn
   *
   * @example
   * ```typescript
   * artistName: ['', {
   *   asyncValidators: [this.asyncValidators.artistNameAvailable()],
   *   updateOn: 'blur'
   * }]
   * ```
   */
  artistNameAvailable(debounceMs?: number): AsyncValidatorFn {
    const debounce = debounceMs ?? this.defaultDebounceTime;

    // Artistas simulados existentes en la base de datos
    const existingArtists = [
      'the beatles',
      'queen',
      'pink floyd',
      'led zeppelin',
      'the rolling stones'
    ];

    return (control: AbstractControl): Observable<ValidationErrors | null> => {
      const artistName = control.value?.trim().toLowerCase();

      if (!artistName || artistName.length < 2) {
        return of(null);
      }

      return defer(() => timer(debounce)).pipe(
        switchMap(() =>
          of(existingArtists.includes(artistName)).pipe(
            delay(300 + Math.random() * 300),
            map(exists => exists ? { artistExists: true } : null),
            catchError(() => of(null))
          )
        ),
        take(1)
      );
    };
  }
}
