import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Button } from '../../components/shared/button/button';
import { Card, CardAction } from '../../components/shared/card/card';
import { FormTextarea } from '../../components/shared/form-textarea/form-textarea';
import { FormSelect, SelectOption } from '../../components/shared/form-select/form-select';
import { FormCheckbox } from '../../components/shared/form-checkbox/form-checkbox';
import { FormRadioGroup, RadioOption } from '../../components/shared/form-radio-group/form-radio-group';
import { Breadcrumbs, BreadcrumbItem } from '../../components/shared/breadcrumbs/breadcrumbs';
import { Alert } from '../../components/shared/alert/alert';
import { Notification } from '../../components/shared/notification/notification';
import { Carousel } from '../../components/shared/carousel/carousel';

@Component({
  selector: 'app-style-guide',
  standalone: true,
  imports: [CommonModule, Button, Card, FormTextarea, FormSelect, FormCheckbox, FormRadioGroup, Breadcrumbs, Alert, Notification, Carousel],
  templateUrl: './style-guide.html',
  styleUrl: './style-guide.scss',
})
export class StyleGuide {
  onButtonClick(variant: string, size: string): void {
    console.log(`Botón ${variant} ${size} clickeado`);
  }

  // Ejemplos de acciones para cards de perfil
  profileActions: CardAction[] = [
    { label: 'Agregar a mi lista', icon: '+', variant: 'primary', callback: () => console.log('Agregado') },
    { label: 'Eliminar de mi lista', icon: '−', variant: 'secondary', callback: () => console.log('Eliminado') },
    { label: 'Enviar solicitud de amistad', icon: '👤+', variant: 'accent', callback: () => console.log('Solicitud enviada') },
    { label: 'Editar mi perfil', icon: '✏️', variant: 'contrast', callback: () => console.log('Editando perfil') }
  ];

  userGenres: string[] = ['Rock 35%', 'Jazz 25%', 'Funk 20%', 'Soul 15%', 'Disco 5%'];

  // Datos para form-select
  genreOptions: SelectOption[] = [
    { value: 'rock', label: 'Rock' },
    { value: 'jazz', label: 'Jazz' },
    { value: 'funk', label: 'Funk' },
    { value: 'soul', label: 'Soul' },
    { value: 'disco', label: 'Disco' },
    { value: 'pop', label: 'Pop' },
    { value: 'classical', label: 'Clásica' }
  ];

  // Datos para form-radio-group
  privacyOptions: RadioOption[] = [
    { value: 'public', label: 'Público' },
    { value: 'friends', label: 'Solo amigos' },
    { value: 'private', label: 'Privado' }
  ];

  // Datos para breadcrumbs
  breadcrumbsSimple: BreadcrumbItem[] = [
    { label: 'Inicio', url: '/' },
    { label: 'Mi colección', url: '/collection' },
    { label: 'Álbumes' }
  ];

  breadcrumbsWithIcons: BreadcrumbItem[] = [
    { label: 'Inicio', url: '/', icon: '🏠' },
    { label: 'Explorar', url: '/explore', icon: '🔍' },
    { label: 'Artistas', url: '/artists', icon: '🎤' },
    { label: 'Pink Floyd' }
  ];

  breadcrumbsLong: BreadcrumbItem[] = [
    { label: 'Inicio', url: '/' },
    { label: 'Mi colección', url: '/collection' },
    { label: 'Álbumes', url: '/collection/albums' },
    { label: 'Rock', url: '/collection/albums/rock' },
    { label: 'The Dark Side of the Moon' }
  ];

  // Datos para carruseles - Álbumes
  trendingAlbums = [
    { title: 'Abbey Road', artist: 'The Beatles', year: '1969', genre: 'Rock' },
    { title: 'Dark Side of the Moon', artist: 'Pink Floyd', year: '1973', genre: 'Progressive Rock' },
    { title: 'Rumours', artist: 'Fleetwood Mac', year: '1977', genre: 'Rock' },
    { title: 'Thriller', artist: 'Michael Jackson', year: '1982', genre: 'Pop' },
    { title: 'Back in Black', artist: 'AC/DC', year: '1980', genre: 'Hard Rock' },
    { title: 'The Wall', artist: 'Pink Floyd', year: '1979', genre: 'Progressive Rock' },
    { title: 'Led Zeppelin IV', artist: 'Led Zeppelin', year: '1971', genre: 'Rock' },
    { title: 'Hotel California', artist: 'Eagles', year: '1976', genre: 'Rock' }
  ];

  // Datos para carruseles - Canciones
  trendingSongs = [
    { title: 'Bohemian Rhapsody', artist: 'Queen', duration: '5:55' },
    { title: 'Stairway to Heaven', artist: 'Led Zeppelin', duration: '8:02' },
    { title: 'Imagine', artist: 'John Lennon', duration: '3:03' },
    { title: 'Smells Like Teen Spirit', artist: 'Nirvana', duration: '5:01' },
    { title: 'Billie Jean', artist: 'Michael Jackson', duration: '4:54' },
    { title: 'Hey Jude', artist: 'The Beatles', duration: '7:11' },
    { title: 'Like a Rolling Stone', artist: 'Bob Dylan', duration: '6:13' },
    { title: 'Hotel California', artist: 'Eagles', duration: '6:30' }
  ];

  // Control para mostrar notificaciones
  showNotificationSuccess: boolean = false;
  showNotificationError: boolean = false;
  showNotificationWarning: boolean = false;
  showNotificationInfo: boolean = false;

  // Métodos para manejar notificaciones
  showToast(type: 'success' | 'error' | 'warning' | 'info'): void {
    switch(type) {
      case 'success':
        this.showNotificationSuccess = true;
        break;
      case 'error':
        this.showNotificationError = true;
        break;
      case 'warning':
        this.showNotificationWarning = true;
        break;
      case 'info':
        this.showNotificationInfo = true;
        break;
    }
  }

  hideNotification(type: 'success' | 'error' | 'warning' | 'info'): void {
    switch(type) {
      case 'success':
        this.showNotificationSuccess = false;
        break;
      case 'error':
        this.showNotificationError = false;
        break;
      case 'warning':
        this.showNotificationWarning = false;
        break;
      case 'info':
        this.showNotificationInfo = false;
        break;
    }
  }
}

