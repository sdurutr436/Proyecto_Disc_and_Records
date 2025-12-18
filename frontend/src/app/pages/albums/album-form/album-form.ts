import { Component, inject, signal, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Button } from '../../../components/shared/button/button';
import { Card } from '../../../components/shared/card/card';

@Component({
  selector: 'app-album-form',
  imports: [
    CommonModule,
    ReactiveFormsModule,
    Button,
    Card
  ],
  templateUrl: './album-form.html',
  styleUrl: './album-form.scss'
})
export class AlbumForm implements OnInit {
  private formBuilder = inject(FormBuilder);
  private route = inject(ActivatedRoute);
  private router = inject(Router);

  albumForm!: FormGroup;
  isEditMode = signal(false);
  albumId = signal<number | null>(null);
  hasUnsavedChanges = signal(false);

  genreOptions = [
    { value: 'rock', label: 'Rock' },
    { value: 'pop', label: 'Pop' },
    { value: 'jazz', label: 'Jazz' },
    { value: 'classical', label: 'Clásica' },
    { value: 'electronic', label: 'Electrónica' },
    { value: 'hip-hop', label: 'Hip Hop' },
    { value: 'country', label: 'Country' },
    { value: 'reggae', label: 'Reggae' }
  ];

  ngOnInit() {
    this.initializeForm();

    // Detectar si estamos en modo edición
    this.route.paramMap.subscribe(params => {
      const id = params.get('id');
      if (id) {
        this.isEditMode.set(true);
        this.albumId.set(+id);
        this.loadAlbumData(+id);
      }
    });

    // Detectar cambios en el formulario
    this.albumForm.valueChanges.subscribe(() => {
      this.hasUnsavedChanges.set(this.albumForm.dirty);
    });
  }

  private initializeForm() {
    this.albumForm = this.formBuilder.group({
      title: ['', [Validators.required, Validators.minLength(1), Validators.maxLength(200)]],
      artist: ['', [Validators.required, Validators.minLength(1), Validators.maxLength(200)]],
      year: ['', [Validators.required, Validators.min(1900), Validators.max(new Date().getFullYear())]],
      genre: ['', Validators.required],
      description: ['', [Validators.maxLength(1000)]],
      coverUrl: ['', [Validators.pattern(/^https?:\/\/.+/)]]
    });
  }

  private async loadAlbumData(id: number) {
    // Simulación de carga de datos
    await new Promise(resolve => setTimeout(resolve, 500));

    const mockData = {
      title: 'The Dark Side of the Moon',
      artist: 'Pink Floyd',
      year: 1973,
      genre: 'rock',
      description: 'Un álbum conceptual sobre la experiencia humana',
      coverUrl: 'https://via.placeholder.com/400x400?text=Dark+Side'
    };

    this.albumForm.patchValue(mockData);
    this.albumForm.markAsPristine();
    this.hasUnsavedChanges.set(false);
  }

  async onSubmit() {
    if (this.albumForm.invalid) {
      this.albumForm.markAllAsTouched();
      return;
    }

    const formData = this.albumForm.value;
    console.log('Guardando álbum:', formData);

    // Simulación de guardado
    await new Promise(resolve => setTimeout(resolve, 1000));

    this.albumForm.markAsPristine();
    this.hasUnsavedChanges.set(false);

    // Redirigir después de guardar
    if (this.isEditMode()) {
      this.router.navigate(['/albums', this.albumId()]);
    } else {
      this.router.navigate(['/albums']);
    }
  }

  cancel() {
    if (this.hasUnsavedChanges()) {
      const confirmLeave = confirm('Tienes cambios sin guardar. ¿Seguro que quieres salir?');
      if (!confirmLeave) {
        return;
      }
    }

    if (this.isEditMode()) {
      this.router.navigate(['/albums', this.albumId()]);
    } else {
      this.router.navigate(['/albums']);
    }
  }

  // Método para el guard CanDeactivate
  canDeactivate(): boolean {
    if (this.hasUnsavedChanges()) {
      return confirm('Tienes cambios sin guardar. ¿Seguro que quieres salir?');
    }
    return true;
  }
}
