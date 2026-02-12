import { Component, OnInit, inject, Renderer2 } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Header } from './components/layout/header/header';
import { Footer } from './components/layout/footer/footer';
import { Main } from './components/layout/main/main';
import { Spinner } from './components/shared/spinner/spinner';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, Header, Footer, Main, Spinner],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App implements OnInit {
  private renderer = inject(Renderer2);

  ngOnInit(): void {
    // Establecer el idioma de la página de forma programática para accesibilidad
    // El contenido de la aplicación es siempre en español (WCAG 3.1.1 - H57)
    this.renderer.setAttribute(document.documentElement, 'lang', 'es');

    // NOTA: La restauración de sesión se maneja automáticamente en authInitGuard
    // No es necesario llamarla aquí para evitar llamadas duplicadas
  }
}
