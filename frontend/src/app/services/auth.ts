import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { firstValueFrom } from 'rxjs';
import { AppStateService, User } from './app-state';
import { EventBusService, EventType } from './event-bus';
import { NotificationStreamService } from './notification-stream';
import { API_CONFIG, API_ENDPOINTS, STORAGE_KEYS } from '../config/api.config';

/**
 * Interfaz de credenciales de login
 */
export interface LoginCredentials {
  email: string;
  password: string;
}

/**
 * Interfaz de datos de registro
 */
export interface RegisterData {
  username: string;
  email: string;
  password: string;
}

/**
 * Interfaz de respuesta de autenticación
 */
export interface AuthResponse {
  success: boolean;
  message: string;
  user?: User;
  token?: string;
}

/**
 * AuthService - Servicio de Autenticación
 *
 * PROPÓSITO:
 * - Centralizar toda la lógica de autenticación
 * - Gestionar sesiones de usuario
 * - Comunicarse con el backend
 * - Coordinar con otros servicios (AppState, EventBus, Notifications)
 *
 * ARQUITECTURA:
 * - Usa HttpClient directamente (no hereda de BaseHttpService)
 * - Los interceptores se encargan de añadir headers y manejar errores
 * - Métodos HTTP listos para producción
 * - Datos mock para desarrollo
 *
 * PATRÓN: SEPARACIÓN DE RESPONSABILIDADES
 *
 * ANTES (Anti-patrón):
 * ```typescript
 * export class LoginComponent {
 *   onSubmit() {
 *     // Componente hace validación
 *     if (!this.validateForm()) return;
 *
 *     // Componente hace llamada HTTP
 *     this.http.post('/api/login', data).subscribe(response => {
 *       // Componente gestiona estado global
 *       this.appState.setUser(response.user);
 *
 *       // Componente navega
 *       this.router.navigate(['/dashboard']);
 *
 *       // Componente muestra notificación
 *       this.notificationService.show('Bienvenido');
 *     });
 *   }
 * }
 * ```
 *
 * DESPUÉS (Patrón correcto):
 * ```typescript
 * export class LoginComponent {
 *   private authService = inject(AuthService);
 *
 *   async onSubmit() {
 *     // Componente solo delega al servicio
 *     const result = await this.authService.login({
 *       email: this.email(),
 *       password: this.password()
 *     });
 *
 *     if (result.success) {
 *       this.router.navigate(['/dashboard']);
 *     }
 *   }
 * }
 * ```
 *
 * RESPONSABILIDADES DEL SERVICIO:
 * - Lógica de autenticación (login, logout, register)
 * - Comunicación con backend
 * - Gestión de tokens/sesiones
 * - Coordinación con AppState
 * - Emisión de eventos
 * - Notificaciones al usuario
 *
 * RESPONSABILIDADES DEL COMPONENTE:
 * - Presentación del formulario
 * - Captura de datos del usuario
 * - Navegación entre páginas
 * - Mostrar estado de carga
 */
@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private http = inject(HttpClient);
  private appState = inject(AppStateService);
  private eventBus = inject(EventBusService);
  private notificationStream = inject(NotificationStreamService);

  // Flag para determinar si usar API real o mock
  // Cambiar a true cuando el backend esté disponible
  private readonly USE_REAL_API = false;

  /**
   * WORKFLOW: Login de Usuario
   *
   * 1. Componente llama a login()
   * 2. Servicio valida datos (opcional, si no se valida antes)
   * 3. Servicio hace llamada a backend (o mock)
   * 4. Si éxito:
   *    a. Actualiza AppState con usuario
   *    b. Persiste token si existe
   *    c. Emite evento USER_LOGIN
   *    d. Muestra notificación de bienvenida
   * 5. Retorna resultado al componente
   * 6. Componente navega a dashboard
   *
   * @param credentials - Email y contraseña
   * @returns Promesa con resultado de autenticación
   *
   * @example
   * ```typescript
   * const result = await authService.login({
   *   email: 'user@example.com',
   *   password: 'password123'
   * });
   *
   * if (result.success) {
   *   router.navigate(['/dashboard']);
   * }
   * ```
   */
  async login(credentials: LoginCredentials): Promise<AuthResponse> {
    try {
      // Usar API real o mock según configuración
      const response = this.USE_REAL_API
        ? await this.loginHttp(credentials)
        : await this.simulateBackendLogin(credentials);

      if (response.success && response.user) {
        // 1. Actualizar estado global
        this.appState.setUser(response.user);

        // 2. Guardar token si existe
        if (response.token) {
          this.saveAuthToken(response.token);
        }

        // 3. Emitir evento de login
        this.eventBus.emit({
          type: EventType.USER_LOGIN,
          payload: {
            userId: response.user.id,
            username: response.user.username,
          },
          source: 'AuthService',
        });

        // 4. Notificación de bienvenida
        this.notificationStream.success(
          'Bienvenido',
          `¡Hola ${response.user.username}! Has iniciado sesión correctamente`
        );

        return response;
      }

      // Login falló
      this.notificationStream.error(
        'Error de autenticación',
        response.message || 'Credenciales incorrectas'
      );

      return response;
    } catch (error: any) {
      // Error de red o del servidor
      console.error('Login error:', error);
      this.notificationStream.error(
        'Error',
        'No se pudo conectar con el servidor. Intenta de nuevo.'
      );

      return {
        success: false,
        message: error.message || 'Error desconocido',
      };
    }
  }

  /**
   * WORKFLOW: Registro de Usuario
   *
   * 1. Componente llama a register()
   * 2. Servicio hace llamada a backend
   * 3. Si éxito:
   *    a. Opcionalmente inicia sesión automáticamente
   *    b. O simplemente notifica éxito
   * 4. Retorna resultado
   *
   * @param data - Datos de registro
   * @returns Promesa con resultado
   */
  async register(data: RegisterData): Promise<AuthResponse> {
    try {
      // Usar API real o mock según configuración
      const response = this.USE_REAL_API
        ? await this.registerHttp(data)
        : await this.simulateBackendRegister(data);

      if (response.success) {
        // Notificación de éxito
        this.notificationStream.success(
          'Cuenta creada',
          'Tu cuenta ha sido creada exitosamente. Ya puedes iniciar sesión.'
        );

        // Opcionalmente: login automático
        if (response.user && response.token) {
          this.appState.setUser(response.user);
          this.saveAuthToken(response.token);

          this.eventBus.emit({
            type: EventType.USER_LOGIN,
            payload: { userId: response.user.id },
            source: 'AuthService',
          });
        }

        return response;
      }

      // Registro falló
      this.notificationStream.error(
        'Error en registro',
        response.message || 'No se pudo crear la cuenta'
      );

      return response;
    } catch (error: any) {
      console.error('Register error:', error);
      this.notificationStream.error(
        'Error',
        'No se pudo conectar con el servidor'
      );

      return {
        success: false,
        message: error.message || 'Error desconocido',
      };
    }
  }

  /**
   * WORKFLOW: Logout
   *
   * 1. Componente llama a logout()
   * 2. Servicio limpia estado de usuario en AppState
   * 3. Servicio elimina token guardado
   * 4. Emite evento USER_LOGOUT
   * 5. Muestra notificación
   * 6. Componente navega a login
   */
  logout(): void {
    const username = this.appState.userName();

    // 1. Limpiar estado
    this.appState.logout();

    // 2. Eliminar token
    this.clearAuthToken();

    // 3. Emitir evento
    this.eventBus.emit({
      type: EventType.USER_LOGOUT,
      source: 'AuthService',
    });

    // 4. Notificación
    this.notificationStream.info(
      'Sesión cerrada',
      `Hasta pronto, ${username}`
    );
  }

  /**
   * Verificar si hay una sesión activa
   * Útil para guards de rutas
   *
   * @returns true si hay usuario autenticado
   */
  isAuthenticated(): boolean {
    return this.appState.isAuthenticated();
  }

  /**
   * Obtener usuario actual
   *
   * @returns Usuario o null
   */
  getCurrentUser() {
    return this.appState.currentUser();
  }

  /**
   * Recuperar contraseña
   * Envía email con instrucciones
   *
   * @param email - Email del usuario
   * @returns Promesa con resultado
   */
  async requestPasswordReset(email: string): Promise<AuthResponse> {
    try {
      // TODO: Llamada real a backend
      const response = await this.simulatePasswordReset(email);

      if (response.success) {
        this.notificationStream.success(
          'Email enviado',
          'Revisa tu correo para instrucciones de recuperación'
        );
      } else {
        this.notificationStream.error(
          'Error',
          response.message || 'No se pudo enviar el email'
        );
      }

      return response;
    } catch (error: any) {
      this.notificationStream.error('Error', 'No se pudo procesar la solicitud');
      return {
        success: false,
        message: error.message,
      };
    }
  }

  /**
   * MÉTODOS PRIVADOS: Gestión de tokens
   */

  private saveAuthToken(token: string): void {
    try {
      localStorage.setItem(STORAGE_KEYS.authToken, token);
    } catch (error) {
      console.error('Error guardando token:', error);
    }
  }

  private getAuthToken(): string | null {
    try {
      return localStorage.getItem(STORAGE_KEYS.authToken);
    } catch (error) {
      console.error('Error leyendo token:', error);
      return null;
    }
  }

  private clearAuthToken(): void {
    try {
      localStorage.removeItem(STORAGE_KEYS.authToken);
    } catch (error) {
      console.error('Error eliminando token:', error);
    }
  }

  /**
   * MÉTODOS HTTP (Listos para producción)
   */

  /**
   * [HTTP] Login de usuario con API real
   *
   * Endpoint: POST /api/auth/login
   * Body: { email, password }
   * Response: { success, user, token, message }
   */
  private async loginHttp(credentials: LoginCredentials): Promise<AuthResponse> {
    const url = `${API_CONFIG.baseUrl}${API_ENDPOINTS.auth.login}`;

    // firstValueFrom convierte Observable a Promise
    return firstValueFrom(
      this.http.post<AuthResponse>(url, credentials)
    );
  }

  /**
   * [HTTP] Registro de usuario con API real
   *
   * Endpoint: POST /api/auth/register
   * Body: { username, email, password }
   * Response: { success, user, token, message }
   */
  private async registerHttp(data: RegisterData): Promise<AuthResponse> {
    const url = `${API_CONFIG.baseUrl}${API_ENDPOINTS.auth.register}`;

    return firstValueFrom(
      this.http.post<AuthResponse>(url, data)
    );
  }

  /**
   * [HTTP] Recuperación de contraseña con API real
   *
   * Endpoint: POST /api/auth/forgot-password
   * Body: { email }
   * Response: { success, message }
   */
  private async requestPasswordResetHttp(email: string): Promise<AuthResponse> {
    const url = `${API_CONFIG.baseUrl}${API_ENDPOINTS.auth.forgotPassword}`;

    return firstValueFrom(
      this.http.post<AuthResponse>(url, { email })
    );
  }

  /**
   * MÉTODOS PRIVADOS: Simulación de backend
   * TODO: Eliminar cuando el backend esté disponible
   */

  private async simulateBackendLogin(
    credentials: LoginCredentials
  ): Promise<AuthResponse> {
    // Simular delay de red
    await this.delay(1000);

    // Simular validación de credenciales
    if (credentials.email === 'demo@example.com' && credentials.password === 'Demo1234!') {
      return {
        success: true,
        message: 'Login exitoso',
        user: {
          id: 1,
          username: 'DemoUser',
          email: credentials.email,
          avatarUrl: '/assets/avatar-placeholder.png',
          preferences: {
            language: 'es',
            notifications: true,
            autoplay: false,
            volume: 70,
          },
        },
        token: 'fake-jwt-token-' + Date.now(),
      };
    }

    return {
      success: false,
      message: 'Email o contraseña incorrectos',
    };
  }

  private async simulateBackendRegister(
    data: RegisterData
  ): Promise<AuthResponse> {
    await this.delay(1500);

    // Simular verificación de email duplicado
    if (data.email === 'taken@example.com') {
      return {
        success: false,
        message: 'Este email ya está registrado',
      };
    }

    return {
      success: true,
      message: 'Registro exitoso',
      user: {
        id: Math.floor(Math.random() * 1000),
        username: data.username,
        email: data.email,
        preferences: {
          language: 'es',
          notifications: true,
          autoplay: false,
          volume: 70,
        },
      },
      token: 'fake-jwt-token-' + Date.now(),
    };
  }

  private async simulatePasswordReset(email: string): Promise<AuthResponse> {
    await this.delay(1000);

    return {
      success: true,
      message: 'Email de recuperación enviado',
    };
  }

  private delay(ms: number): Promise<void> {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }
}
