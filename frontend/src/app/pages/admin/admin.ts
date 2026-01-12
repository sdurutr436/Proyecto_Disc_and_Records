import { Component, signal, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { Button } from '../../components/shared/button/button';
import { Tabs, Tab } from '../../components/shared/tabs/tabs';
import { AlbumStateService } from '../../services/album-state.service';
import { Album } from '../../models/data.models';

interface Stats {
  totalAlbums: number;
  totalUsers: number;
  totalReviews: number;
  totalGenres: number;
}

@Component({
  selector: 'app-admin',
  imports: [CommonModule, RouterLink, Button, Tabs],
  templateUrl: './admin.html',
  styleUrl: './admin.scss',
  standalone: true,
})
export default class AdminComponent implements OnInit {
  private albumState = inject(AlbumStateService);

  activeTab = signal<string>('albums');

  tabs: Tab[] = [
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

  albums = signal<Album[]>([]);
  users = signal<any[]>([]);
  genres = signal<any[]>([]);
  reviews = signal<any[]>([]);

  ngOnInit() {
    this.loadData();
  }

  onTabChange(tabId: string | number) {
    this.activeTab.set(tabId as string);
  }

  loadData() {
    // Los álbumes se cargan a través de Deezer automáticamente
    // El admin panel mostrará estadísticas cuando haya datos

    // Actualizar estadísticas desde los signals del servicio
    const albums = this.albumState.albums();
    this.albums.set(albums);

    this.stats.set({
      totalAlbums: albums.length,
      totalUsers: 0, // TODO: Implementar servicio de usuarios
      totalReviews: 0, // TODO: Implementar servicio de reseñas
      totalGenres: 0, // TODO: Implementar servicio de géneros
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
