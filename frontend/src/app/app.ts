import { Component, OnInit, inject } from '@angular/core';
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

  async ngOnInit(): Promise<void> {
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
