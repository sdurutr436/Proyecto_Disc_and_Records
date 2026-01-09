import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Button } from '../../../components/shared/button/button';

interface User {
  id: string;
  username: string;
  email: string;
  role: 'admin' | 'user';
  createdAt: Date;
}

@Component({
  selector: 'app-admin-users',
  standalone: true,
  imports: [CommonModule, Button],
  templateUrl: './users.html',
  styleUrl: './users.scss'
})
export default class AdminUsersComponent {
  users = signal<User[]>([]);

  editUser(id: string): void {
    console.log('Editar usuario:', id);
    // TODO: Implementar lógica de edición
  }

  deleteUser(id: string): void {
    console.log('Eliminar usuario:', id);
    // TODO: Implementar lógica de eliminación
  }
}
