import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
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
  imports: [CommonModule, RouterLink, Button],
  templateUrl: './admin.html',
  styleUrl: './admin.scss',
  standalone: true,
})
export default class AdminComponent {
  activeTab = signal<string>('albums');

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

  // Mock data para demo
  albums = signal<any[]>([]);
  users = signal<any[]>([]);
  genres = signal<any[]>([]);
  reviews = signal<any[]>([]);

  constructor() {
    // TODO: Cargar datos reales desde el backend
    this.loadMockData();
  }

  setActiveTab(tabId: string) {
    this.activeTab.set(tabId);
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

  // Métodos CRUD para álbumes
  createAlbum() {
    console.log('Crear álbum');
    // TODO: Implementar lógica de creación
  }

  editAlbum(id: string) {
    console.log('Editar álbum:', id);
    // TODO: Implementar lógica de edición
  }

  deleteAlbum(id: string) {
    console.log('Eliminar álbum:', id);
    // TODO: Implementar lógica de eliminación
  }

  // Métodos CRUD para usuarios
  editUser(id: string) {
    console.log('Editar usuario:', id);
    // TODO: Implementar lógica de edición
  }

  deleteUser(id: string) {
    console.log('Eliminar usuario:', id);
    // TODO: Implementar lógica de eliminación
  }

  // Métodos CRUD para géneros
  createGenre() {
    console.log('Crear género');
    // TODO: Implementar lógica de creación
  }

  editGenre(id: string) {
    console.log('Editar género:', id);
    // TODO: Implementar lógica de edición
  }

  deleteGenre(id: string) {
    console.log('Eliminar género:', id);
    // TODO: Implementar lógica de eliminación
  }

  // Métodos para reseñas
  approveReview(id: string) {
    console.log('Aprobar reseña:', id);
    // TODO: Implementar lógica de aprobación
  }

  deleteReview(id: string) {
    console.log('Eliminar reseña:', id);
    // TODO: Implementar lógica de eliminación
  }
}
