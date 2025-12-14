import { Component } from '@angular/core';
import { Button } from '../../components/shared/button/button';
import { Card, CardAction } from '../../components/shared/card/card';
import { FormTextarea } from '../../components/shared/form-textarea/form-textarea';
import { FormSelect, SelectOption } from '../../components/shared/form-select/form-select';
import { FormCheckbox } from '../../components/shared/form-checkbox/form-checkbox';
import { FormRadioGroup, RadioOption } from '../../components/shared/form-radio-group/form-radio-group';

@Component({
  selector: 'app-style-guide',
  imports: [Button, Card, FormTextarea, FormSelect, FormCheckbox, FormRadioGroup],
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
}

