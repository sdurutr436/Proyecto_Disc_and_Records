import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { Button } from '../../components/shared/button/button';

interface AdminTab {
  id: string;
  label: string;
}

interface Stats {
  totalAlbums: number;
  totalUsers: number;
  totalReviews: number;
  totalGenres: number;
}

@Component({
  selector: 'app-admin',
  imports: [CommonModule, RouterLink, RouterLinkActive, RouterOutlet, Button],
  templateUrl: './admin.html',
  styleUrl: './admin.scss',
  standalone: true,
})
export default class AdminComponent {
  // Tabs de navegación - ahora con rutas
  tabs: AdminTab[] = [
    { id: 'albums', label: 'Álbumes' },
    { id: 'users', label: 'Usuarios' },
    { id: 'genres', label: 'Géneros' },
    { id: 'reviews', label: 'Reseñas' },
  ];

  stats = signal<Stats>({
    totalAlbums: 0,
    totalUsers: 0,
    totalReviews: 0,
    totalGenres: 0,
  });

  constructor() {
    // TODO: Cargar datos reales desde el backend
    this.loadMockData();
  }

  loadMockData() {
    // TODO: Implementar llamadas al backend
    this.stats.set({
      totalAlbums: 0,
      totalUsers: 0,
      totalReviews: 0,
      totalGenres: 0,
    });
  }
}
