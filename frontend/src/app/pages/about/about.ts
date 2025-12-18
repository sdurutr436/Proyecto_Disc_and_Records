import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-about',
  imports: [CommonModule],
  templateUrl: './about.html',
  styleUrl: './about.scss'
})
export class About {
  features = [
    {
      title: 'Descubre Música',
      description: 'Explora miles de álbumes y artistas de todos los géneros y épocas.',
      icon: 'disc'
    },
    {
      title: 'Guarda Favoritos',
      description: 'Crea tu colección personal de álbumes favoritos.',
      icon: 'heart'
    },
    {
      title: 'Comparte Opiniones',
      description: 'Califica y reseña álbumes, comparte tu experiencia musical.',
      icon: 'message'
    },
    {
      title: 'Conecta con otros',
      description: 'Descubre qué escucha la comunidad y sigue a otros melómanos.',
      icon: 'users'
    }
  ];

  team = [
    {
      name: 'Sergio',
      role: 'Desarrollador Full Stack',
      description: 'Arquitectura y desarrollo del proyecto'
    }
  ];
}
