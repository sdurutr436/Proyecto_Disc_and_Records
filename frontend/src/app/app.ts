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
    // Detecta el idioma desde el navegador o usa español como predeterminado
    const userLanguage = navigator.language.split('-')[0] || 'es';
    this.renderer.setAttribute(document.documentElement, 'lang', userLanguage);

    // NOTA: La restauración de sesión se maneja automáticamente en authInitGuard
    // No es necesario llamarla aquí para evitar llamadas duplicadas
  }
}
