import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Button } from '../../../components/shared/button/button';
import { Alert } from '../../../components/shared/alert/alert';

interface Album {
  id: string;
  title: string;
  artist: string;
  year: number;
  genre: string;
}

@Component({
  selector: 'app-admin-albums',
  standalone: true,
  imports: [CommonModule, Button, Alert],
  templateUrl: './albums.html',
  styleUrl: './albums.scss'
})
export default class AdminAlbumsComponent {
  albums = signal<Album[]>([]);

  createAlbum(): void {
    console.log('Crear álbum');
    // TODO: Implementar lógica de creación
  }

  editAlbum(id: string): void {
    console.log('Editar álbum:', id);
    // TODO: Implementar lógica de edición
  }

  deleteAlbum(id: string): void {
    console.log('Eliminar álbum:', id);
    // TODO: Implementar lógica de eliminación
  }
}
