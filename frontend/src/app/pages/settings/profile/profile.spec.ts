import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA, signal } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import SettingsProfileComponent from './profile';
import { AppStateService } from '../../../services/app-state';

describe('SettingsProfileComponent', () => {
  let component: SettingsProfileComponent;
  let fixture: ComponentFixture<SettingsProfileComponent>;
  let mockAppState: any;

  beforeEach(async () => {
    mockAppState = {
      currentUser: signal({
        id: 1,
        username: 'testuser',
        avatarUrl: 'https://example.com/avatar.jpg'
      }),
      updateUser: jasmine.createSpy('updateUser')
    };

    await TestBed.configureTestingModule({
      imports: [SettingsProfileComponent, ReactiveFormsModule],
      providers: [
        { provide: AppStateService, useValue: mockAppState }
      ],
      schemas: [NO_ERRORS_SCHEMA]
    }).compileComponents();

    fixture = TestBed.createComponent(SettingsProfileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  describe('Creación', () => {
    it('debería crear el componente', () => {
      expect(component).toBeTruthy();
    });
  });

  describe('Estado inicial', () => {
    it('debería tener isLoading en false', () => {
      expect(component.isLoading()).toBeFalse();
    });

    it('debería tener successMessage en null', () => {
      expect(component.successMessage()).toBeNull();
    });

    it('debería tener errorMessage en null', () => {
      expect(component.errorMessage()).toBeNull();
    });
  });

  describe('ngOnInit', () => {
    it('debería cargar username del usuario actual', () => {
      expect(component.profileForm.get('username')?.value).toBe('testuser');
    });

    it('debería cargar avatar del usuario actual', () => {
      expect(component.currentAvatar()).toBe('https://example.com/avatar.jpg');
    });

    it('debería marcar formulario como pristine', () => {
      expect(component.profileForm.pristine).toBeTrue();
    });
  });

  describe('profileForm', () => {
    it('debería existir', () => {
      expect(component.profileForm).toBeTruthy();
    });

    it('debería tener control username', () => {
      expect(component.profileForm.get('username')).toBeTruthy();
    });

    it('debería requerir username', () => {
      component.profileForm.patchValue({ username: '' });
      expect(component.profileForm.get('username')?.hasError('required')).toBeTrue();
    });

    it('debería requerir mínimo 3 caracteres', () => {
      component.profileForm.patchValue({ username: 'ab' });
      expect(component.profileForm.get('username')?.hasError('minlength')).toBeTrue();
    });

    it('debería requerir máximo 20 caracteres', () => {
      component.profileForm.patchValue({ username: 'a'.repeat(21) });
      expect(component.profileForm.get('username')?.hasError('maxlength')).toBeTrue();
    });

    it('debería solo permitir alfanuméricos y underscore', () => {
      component.profileForm.patchValue({ username: 'user@name' });
      expect(component.profileForm.get('username')?.hasError('pattern')).toBeTrue();
    });

    it('debería ser válido con username correcto', () => {
      component.profileForm.patchValue({ username: 'valid_user123' });
      expect(component.profileForm.get('username')?.valid).toBeTrue();
    });
  });

  describe('onAvatarChange', () => {
    it('debería rechazar archivos mayores a 2MB', () => {
      const file = new File([''], 'test.jpg', { type: 'image/jpeg' });
      Object.defineProperty(file, 'size', { value: 3 * 1024 * 1024 });

      const event = { target: { files: [file] } } as unknown as Event;
      component.onAvatarChange(event);

      expect(component.errorMessage()).toContain('2MB');
    });

    it('debería rechazar tipos de archivo no permitidos', () => {
      const file = new File([''], 'test.pdf', { type: 'application/pdf' });
      Object.defineProperty(file, 'size', { value: 1024 });

      const event = { target: { files: [file] } } as unknown as Event;
      component.onAvatarChange(event);

      expect(component.errorMessage()).toContain('JPG, PNG o GIF');
    });
  });

  describe('CanComponentDeactivate', () => {
    it('debería implementar canDeactivate', () => {
      expect(component.canDeactivate).toBeDefined();
    });

    it('debería permitir salir si formulario está pristine', () => {
      component.profileForm.markAsPristine();
      expect(component.canDeactivate()).toBeTrue();
    });
  });
});
