import { Component, inject, signal, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { Button } from '../../../components/shared/button/button';
import { Badge } from '../../../components/shared/badge/badge';
import { Card } from '../../../components/shared/card/card';
import { Spinner } from '../../../components/shared/spinner/spinner';
import { LoadingService } from '../../../services/loading';

interface Album {
  id: number;
  title: string;
  artist: string;
  year: number;
  genre: string;
  coverUrl: string;
  rating: number;
  description: string;
  tracks: Track[];
  reviews: Review[];
}

interface Track {
  number: number;
  title: string;
  duration: string;
}

interface Review {
  id: number;
  user: string;
  rating: number;
  comment: string;
  date: string;
}

@Component({
  selector: 'app-album-detail',
  imports: [CommonModule, Button, Badge, Card, Spinner],
  templateUrl: './album-detail.html',
  styleUrl: './album-detail.scss'
})
export class AlbumDetail implements OnInit {
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private loadingService = inject(LoadingService);

  album = signal<Album | null>(null);
  isLoading = this.loadingService.isLoading;
  albumId = signal<number>(0);

  ngOnInit() {
    // Obtener ID desde los parámetros de ruta
    this.route.paramMap.subscribe(params => {
      const id = params.get('id');
      if (id) {
        this.albumId.set(+id);
        this.loadAlbumDetail(+id);
      }
    });
  }

  private async loadAlbumDetail(id: number) {
    this.loadingService.start('Cargando álbum...');

    // Simulación de carga de datos
    await new Promise(resolve => setTimeout(resolve, 800));

    const mockAlbum: Album = {
      id,
      title: 'The Dark Side of the Moon',
      artist: 'Pink Floyd',
      year: 1973,
      genre: 'Progressive Rock',
      coverUrl: 'https://via.placeholder.com/400x400?text=Dark+Side',
      rating: 4.8,
      description: 'The Dark Side of the Moon es el octavo álbum de estudio de la banda británica de rock progresivo Pink Floyd, lanzado el 1 de marzo de 1973. Es uno de los álbumes más vendidos de todos los tiempos y uno de los más influyentes en la historia del rock.',
      tracks: [
        { number: 1, title: 'Speak to Me', duration: '1:13' },
        { number: 2, title: 'Breathe', duration: '2:43' },
        { number: 3, title: 'On the Run', duration: '3:36' },
        { number: 4, title: 'Time', duration: '6:53' },
        { number: 5, title: 'The Great Gig in the Sky', duration: '4:36' },
        { number: 6, title: 'Money', duration: '6:23' },
        { number: 7, title: 'Us and Them', duration: '7:49' },
        { number: 8, title: 'Any Colour You Like', duration: '3:26' },
        { number: 9, title: 'Brain Damage', duration: '3:49' },
        { number: 10, title: 'Eclipse', duration: '2:03' }
      ],
      reviews: [
        {
          id: 1,
          user: 'MusicLover',
          rating: 5,
          comment: 'Una obra maestra absoluta del rock progresivo. Cada canción fluye perfectamente hacia la siguiente.',
          date: '2025-01-15'
        },
        {
          id: 2,
          user: 'RockFan92',
          rating: 5,
          comment: 'Simplemente perfecto. La producción, las letras, la atmósfera... Todo es impecable.',
          date: '2025-02-10'
        },
        {
          id: 3,
          user: 'ProgressiveHead',
          rating: 5,
          comment: 'El álbum que define el género. Un viaje sonoro inolvidable.',
          date: '2025-03-05'
        }
      ]
    };

    this.album.set(mockAlbum);
    this.loadingService.stop();
  }

  editAlbum() {
    this.router.navigate(['/albums', this.albumId(), 'edit']);
  }

  goBack() {
    this.router.navigate(['/albums']);
  }

  addToFavorites() {
    console.log('Añadido a favoritos:', this.album()?.title);
  }
}
