import { Component, OnInit, inject, Renderer2 } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Header } from './components/layout/header/header';
import { Footer } from './components/layout/footer/footer';
import { Main } from './components/layout/main/main';
import { Spinner } from './components/shared/spinner/spinner';
import { AuthService } from './services/auth';
import { environment } from '../environments/environment';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, Header, Footer, Main, Spinner],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App implements OnInit {
  private authService = inject(AuthService);
  private renderer = inject(Renderer2);

  async ngOnInit(): Promise<void> {
    // Establecer el idioma de la página de forma programática para accesibilidad
    // Detecta el idioma desde el navegador o usa español como predeterminado
    const userLanguage = navigator.language.split('-')[0] || 'es';
    this.renderer.setAttribute(document.documentElement, 'lang', userLanguage);

    // En modo mock, no intentar restaurar sesión (backend no disponible)
    if (environment.useMockData) {
      console.log('🎭 Modo mock activo: omitiendo restauración de sesión');
      return;
    }

    // Restaurar sesión al cargar la aplicación
    // Esto obtiene los datos actualizados del usuario desde el servidor
    await this.authService.restoreSession();
  }
}
