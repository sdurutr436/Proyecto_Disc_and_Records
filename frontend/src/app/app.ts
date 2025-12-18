import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Header } from './components/layout/header/header';
import { Footer } from './components/layout/footer/footer';
import { Main } from './components/layout/main/main';
import { Spinner } from './components/shared/spinner/spinner';
import { Breadcrumb } from './components/shared/breadcrumb/breadcrumb';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, Header, Footer, Main, Spinner, Breadcrumb],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {}
