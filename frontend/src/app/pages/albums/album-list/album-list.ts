import { Component, inject, signal, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { Card } from '../../../components/shared/card/card';
import { Badge } from '../../../components/shared/badge/badge';
import { Button } from '../../../components/shared/button/button';
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
}

@Component({
  selector: 'app-album-list',
  imports: [CommonModule, Card, Badge, Button, Spinner],
  templateUrl: './album-list.html',
  styleUrl: './album-list.scss'
})
export class AlbumList implements OnInit {
  private router = inject(Router);
  private loadingService = inject(LoadingService);

  albums = signal<Album[]>([]);
  isLoading = this.loadingService.isLoading;

  ngOnInit() {
    this.loadAlbums();
  }

  private async loadAlbums() {
    this.loadingService.start('Cargando álbumes...');

    // Simulación de carga de datos
    await new Promise(resolve => setTimeout(resolve, 1000));

    const mockAlbums: Album[] = [
      {
        id: 1,
        title: 'The Dark Side of the Moon',
        artist: 'Pink Floyd',
        year: 1973,
        genre: 'Progressive Rock',
        coverUrl: 'https://via.placeholder.com/300x300?text=Dark+Side',
        rating: 4.8
      },
      {
        id: 2,
        title: 'Abbey Road',
        artist: 'The Beatles',
        year: 1969,
        genre: 'Rock',
        coverUrl: 'https://via.placeholder.com/300x300?text=Abbey+Road',
        rating: 4.9
      },
      {
        id: 3,
        title: 'Thriller',
        artist: 'Michael Jackson',
        year: 1982,
        genre: 'Pop',
        coverUrl: 'https://via.placeholder.com/300x300?text=Thriller',
        rating: 4.7
      },
      {
        id: 4,
        title: 'Back in Black',
        artist: 'AC/DC',
        year: 1980,
        genre: 'Hard Rock',
        coverUrl: 'https://via.placeholder.com/300x300?text=Back+in+Black',
        rating: 4.6
      },
      {
        id: 5,
        title: 'Rumours',
        artist: 'Fleetwood Mac',
        year: 1977,
        genre: 'Rock',
        coverUrl: 'https://via.placeholder.com/300x300?text=Rumours',
        rating: 4.7
      },
      {
        id: 6,
        title: 'The Wall',
        artist: 'Pink Floyd',
        year: 1979,
        genre: 'Progressive Rock',
        coverUrl: 'https://via.placeholder.com/300x300?text=The+Wall',
        rating: 4.8
      }
    ];

    this.albums.set(mockAlbums);
    this.loadingService.stop();
  }

  viewAlbumDetail(albumId: number) {
    this.router.navigate(['/albums', albumId]);
  }

  editAlbum(albumId: number) {
    this.router.navigate(['/albums', albumId, 'edit']);
  }
}
