import { AbstractControl, AsyncValidatorFn, ValidationErrors } from '@angular/forms';
import { Observable, of, timer } from 'rxjs';
import { map, switchMap, take, catchError } from 'rxjs/operators';

/**
 * Validadores Asíncronos para Disc and Records
 *
 * Los validadores asíncronos retornan Observable<ValidationErrors | null>
 * y se ejecutan DESPUÉS de los validadores síncronos.
 *
 * CARACTERÍSTICAS:
 * - Incluyen debounce para evitar múltiples llamadas API
 * - Manejan errores de red de forma graceful
 * - Muestran estado 'pending' mientras validan
 *
 * CASOS DE USO EN DISC AND RECORDS:
 * - Verificar email único en registro
 * - Comprobar disponibilidad de username
 * - Validar existencia de artista/álbum en base de datos
 */

/**
 * Lista simulada de emails ya registrados en el sistema
 * En producción, esto sería una llamada HTTP real al backend
 */
const REGISTERED_EMAILS = [
  'admin@discandrecords.com',
  'test@example.com',
  'usuario@discandrecords.com',
  'demo@demo.com'
];

/**
 * Lista simulada de usernames ya tomados
 * En producción, esto sería una llamada HTTP real al backend
 */
const TAKEN_USERNAMES = [
  'admin',
  'administrator',
  'root',
  'superuser',
  'discandrecords',
  'moderator',
  'support'
];

/**
 * Validador Asíncrono: Email Único
 *
 * Verifica que el email no esté ya registrado en el sistema.
 * Incluye debounce de 500ms para evitar spam de llamadas.
 *
 * @param excludeUserId - ID del usuario actual (para edición de perfil)
 *                        Si se proporciona, excluye ese usuario de la verificación
 *
 * @example
 * ```typescript
 * // En registro (nuevo usuario)
 * email: ['', {
 *   validators: [Validators.required, Validators.email],
 *   asyncValidators: [emailUnique()],
 *   updateOn: 'blur'
 * }]
 *
 * // En edición de perfil (excluir usuario actual)
 * email: ['', {
 *   asyncValidators: [emailUnique(this.currentUserId)],
 *   updateOn: 'blur'
 * }]
 * ```
 *
 * @returns AsyncValidatorFn que retorna:
 *   - null: email disponible
 *   - { emailTaken: true }: email ya registrado
 */
export function emailUnique(excludeUserId?: string): AsyncValidatorFn {
  return (control: AbstractControl): Observable<ValidationErrors | null> => {
    const email = control.value?.trim().toLowerCase();

    // Si está vacío, dejar que required lo maneje
    if (!email) {
      return of(null);
    }

    // Simular debounce (500ms) + llamada API (800ms)
    return timer(500).pipe(
      switchMap(() => {
        // SIMULACIÓN: En producción sería:
        // return this.http.get<boolean>(`/api/users/email-exists/${email}?excludeId=${excludeUserId || ''}`)
        //   .pipe(
        //     map(exists => exists ? { emailTaken: true } : null),
        //     catchError(() => of(null))
        //   );

        // Simulación local con delay para imitar latencia de red
        return of(REGISTERED_EMAILS.includes(email)).pipe(
          // Simular delay de respuesta API (300-800ms)
          switchMap(exists =>
            timer(300 + Math.random() * 500).pipe(
              map(() => exists ? { emailTaken: true } : null)
            )
          ),
          catchError(() => of(null)) // Error de red no bloquea el formulario
        );
      }),
      take(1) // Completar el observable después de la primera emisión
    );
  };
}

/**
 * Validador Asíncrono: Username Disponible
 *
 * Verifica que el nombre de usuario esté disponible.
 * Solo valida si el username tiene al menos 3 caracteres.
 * Incluye debounce de 300ms para evitar spam de llamadas.
 *
 * @example
 * ```typescript
 * username: ['', {
 *   validators: [Validators.required, Validators.minLength(3)],
 *   asyncValidators: [usernameAvailable()],
 *   updateOn: 'blur'
 * }]
 * ```
 *
 * @returns AsyncValidatorFn que retorna:
 *   - null: username disponible
 *   - { usernameTaken: true }: username ya registrado
 */
export function usernameAvailable(): AsyncValidatorFn {
  return (control: AbstractControl): Observable<ValidationErrors | null> => {
    const username = control.value?.trim().toLowerCase();

    // Si está vacío o muy corto, dejar que otros validadores lo manejen
    if (!username || username.length < 3) {
      return of(null);
    }

    // Simular debounce (300ms) + llamada API
    return timer(300).pipe(
      switchMap(() => {
        // SIMULACIÓN: En producción sería:
        // return this.http.get<{ available: boolean }>(`/api/usernames/${username}`)
        //   .pipe(
        //     map(response => response.available ? null : { usernameTaken: true }),
        //     catchError(() => of(null))
        //   );

        // Simulación local
        const isTaken = TAKEN_USERNAMES.includes(username);

        return timer(200 + Math.random() * 400).pipe(
          map(() => isTaken ? { usernameTaken: true } : null),
          catchError(() => of(null))
        );
      }),
      take(1)
    );
  };
}

/**
 * Obtener mensajes amigables para errores de validación asíncrona
 *
 * @param error - Nombre del error
 * @returns Mensaje de error para mostrar al usuario
 *
 * @example
 * ```html
 * @if (email?.errors?.['emailTaken'] && !email?.pending) {
 *   <span class="error">{{ getAsyncErrorMessage('emailTaken') }}</span>
 * }
 * ```
 */
export function getAsyncErrorMessage(error: string): string {
  const messages: { [key: string]: string } = {
    'emailTaken': 'Este email ya está registrado. ¿Olvidaste tu contraseña?',
    'usernameTaken': 'Este nombre de usuario no está disponible. Prueba otro.'
  };
  return messages[error] || 'Error de validación';
}
