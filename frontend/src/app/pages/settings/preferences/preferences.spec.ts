import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import SettingsPreferencesComponent from './preferences';

describe('SettingsPreferencesComponent', () => {
  let component: SettingsPreferencesComponent;
  let fixture: ComponentFixture<SettingsPreferencesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SettingsPreferencesComponent, ReactiveFormsModule],
      schemas: [NO_ERRORS_SCHEMA]
    }).compileComponents();

    fixture = TestBed.createComponent(SettingsPreferencesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  describe('Creación', () => {
    it('debería crear el componente', () => {
      expect(component).toBeTruthy();
    });
  });

  describe('Estado inicial', () => {
    it('debería tener successMessage en null', () => {
      expect(component.successMessage()).toBeNull();
    });
  });

  describe('visibilityOptions', () => {
    it('debería tener 3 opciones', () => {
      expect(component.visibilityOptions.length).toBe(3);
    });

    it('debería incluir public', () => {
      expect(component.visibilityOptions.find(o => o.value === 'public')).toBeTruthy();
    });

    it('debería incluir friends', () => {
      expect(component.visibilityOptions.find(o => o.value === 'friends')).toBeTruthy();
    });

    it('debería incluir private', () => {
      expect(component.visibilityOptions.find(o => o.value === 'private')).toBeTruthy();
    });
  });

  describe('languageOptions', () => {
    it('debería tener 2 opciones', () => {
      expect(component.languageOptions.length).toBe(2);
    });

    it('debería incluir español', () => {
      expect(component.languageOptions.find(o => o.value === 'es')).toBeTruthy();
    });

    it('debería incluir inglés', () => {
      expect(component.languageOptions.find(o => o.value === 'en')).toBeTruthy();
    });
  });

  describe('preferencesForm', () => {
    it('debería existir', () => {
      expect(component.preferencesForm).toBeTruthy();
    });

    it('debería tener emailNotifications en true por defecto', () => {
      expect(component.preferencesForm.get('emailNotifications')?.value).toBeTrue();
    });

    it('debería tener reviewNotifications en true por defecto', () => {
      expect(component.preferencesForm.get('reviewNotifications')?.value).toBeTrue();
    });

    it('debería tener profileVisibility en public por defecto', () => {
      expect(component.preferencesForm.get('profileVisibility')?.value).toBe('public');
    });

    it('debería tener language en es por defecto', () => {
      expect(component.preferencesForm.get('language')?.value).toBe('es');
    });
  });

  describe('onSubmit', () => {
    it('debería mostrar mensaje de éxito', () => {
      component.onSubmit();
      expect(component.successMessage()).toBe('Preferencias guardadas correctamente');
    });

    it('debería marcar formulario como pristine', () => {
      component.preferencesForm.markAsDirty();
      component.onSubmit();
      expect(component.preferencesForm.pristine).toBeTrue();
    });
  });

  describe('CanComponentDeactivate', () => {
    it('debería implementar canDeactivate', () => {
      expect(component.canDeactivate).toBeDefined();
    });

    it('debería permitir salir si formulario está pristine', () => {
      component.preferencesForm.markAsPristine();
      expect(component.canDeactivate()).toBeTrue();
    });
  });
});
