import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Button } from '../../../components/shared/button/button';
import { Alert } from '../../../components/shared/alert/alert';

interface Genre {
  id: string;
  name: string;
  description: string;
  albumCount: number;
}

@Component({
  selector: 'app-admin-genres',
  standalone: true,
  imports: [CommonModule, Button, Alert],
  templateUrl: './genres.html',
  styleUrl: './genres.scss'
})
export default class AdminGenresComponent {
  genres = signal<Genre[]>([]);

  createGenre(): void {
    console.log('Crear género');
    // TODO: Implementar lógica de creación
  }

  editGenre(id: string): void {
    console.log('Editar género:', id);
    // TODO: Implementar lógica de edición
  }

  deleteGenre(id: string): void {
    console.log('Eliminar género:', id);
    // TODO: Implementar lógica de eliminación
  }
}
