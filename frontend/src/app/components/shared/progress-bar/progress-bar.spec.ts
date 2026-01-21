import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ProgressBar } from './progress-bar';
import { Component, signal, viewChild } from '@angular/core';
import { LoadingService } from '../../../services/loading';

@Component({
  standalone: true,
  imports: [ProgressBar],
  template: `
    <app-progress-bar
      [value]="value()"
      [indeterminate]="indeterminate()"
      [showLabel]="showLabel()"
      [size]="size()"
      [variant]="variant()"
      [useService]="useService()"
      [label]="label()"
      [striped]="striped()"
    />
  `
})
class TestHostComponent {
  progressBar = viewChild(ProgressBar);
  value = signal(0);
  indeterminate = signal(false);
  showLabel = signal(false);
  size = signal<'sm' | 'md' | 'lg'>('md');
  variant = signal<'primary' | 'secondary' | 'success' | 'warning' | 'error'>('primary');
  useService = signal(false);
  label = signal<string | undefined>(undefined);
  striped = signal(false);
}

describe('ProgressBar', () => {
  let component: ProgressBar;
  let fixture: ComponentFixture<ProgressBar>;
  let mockLoadingService: jasmine.SpyObj<LoadingService>;

  beforeEach(async () => {
    mockLoadingService = jasmine.createSpyObj('LoadingService', [], {
      progress: signal(50)
    });

    await TestBed.configureTestingModule({
      imports: [ProgressBar],
      providers: [
        { provide: LoadingService, useValue: mockLoadingService }
      ]
    }).compileComponents();
  });

  describe('Creación', () => {
    it('debería crear el componente', () => {
      fixture = TestBed.createComponent(ProgressBar);
      component = fixture.componentInstance;
      expect(component).toBeTruthy();
    });
  });

  describe('Estado inicial', () => {
    beforeEach(() => {
      fixture = TestBed.createComponent(ProgressBar);
      component = fixture.componentInstance;
    });

    it('debería tener value 0 por defecto', () => {
      expect(component.value).toBe(0);
    });

    it('debería tener indeterminate false por defecto', () => {
      expect(component.indeterminate).toBeFalse();
    });

    it('debería tener showLabel false por defecto', () => {
      expect(component.showLabel).toBeFalse();
    });

    it('debería tener size md por defecto', () => {
      expect(component.size).toBe('md');
    });

    it('debería tener variant primary por defecto', () => {
      expect(component.variant).toBe('primary');
    });

    it('debería tener useService false por defecto', () => {
      expect(component.useService).toBeFalse();
    });

    it('debería tener striped false por defecto', () => {
      expect(component.striped).toBeFalse();
    });
  });

  describe('Con Host Component', () => {
    let hostFixture: ComponentFixture<TestHostComponent>;
    let hostComponent: TestHostComponent;

    beforeEach(async () => {
      hostFixture = TestBed.createComponent(TestHostComponent);
      hostComponent = hostFixture.componentInstance;
      hostFixture.detectChanges();
    });

    it('debería crear progress-bar dentro del host', () => {
      expect(hostComponent.progressBar()).toBeTruthy();
    });

    describe('Value', () => {
      it('debería recibir value del host', () => {
        hostComponent.value.set(75);
        hostFixture.detectChanges();
        expect(hostComponent.progressBar()!.value).toBe(75);
      });

      it('debería aceptar value 0', () => {
        hostComponent.value.set(0);
        hostFixture.detectChanges();
        expect(hostComponent.progressBar()!.value).toBe(0);
      });

      it('debería aceptar value 100', () => {
        hostComponent.value.set(100);
        hostFixture.detectChanges();
        expect(hostComponent.progressBar()!.value).toBe(100);
      });
    });

    describe('Indeterminate', () => {
      it('debería activar modo indeterminado', () => {
        hostComponent.indeterminate.set(true);
        hostFixture.detectChanges();
        expect(hostComponent.progressBar()!.indeterminate).toBeTrue();
      });
    });

    describe('ShowLabel', () => {
      it('debería mostrar label cuando showLabel es true', () => {
        hostComponent.showLabel.set(true);
        hostFixture.detectChanges();
        expect(hostComponent.progressBar()!.showLabel).toBeTrue();
      });
    });

    describe('Tamaños', () => {
      it('debería aceptar size sm', () => {
        hostComponent.size.set('sm');
        hostFixture.detectChanges();
        expect(hostComponent.progressBar()!.size).toBe('sm');
      });

      it('debería aceptar size lg', () => {
        hostComponent.size.set('lg');
        hostFixture.detectChanges();
        expect(hostComponent.progressBar()!.size).toBe('lg');
      });
    });

    describe('Variantes', () => {
      it('debería aceptar variant secondary', () => {
        hostComponent.variant.set('secondary');
        hostFixture.detectChanges();
        expect(hostComponent.progressBar()!.variant).toBe('secondary');
      });

      it('debería aceptar variant success', () => {
        hostComponent.variant.set('success');
        hostFixture.detectChanges();
        expect(hostComponent.progressBar()!.variant).toBe('success');
      });

      it('debería aceptar variant warning', () => {
        hostComponent.variant.set('warning');
        hostFixture.detectChanges();
        expect(hostComponent.progressBar()!.variant).toBe('warning');
      });

      it('debería aceptar variant error', () => {
        hostComponent.variant.set('error');
        hostFixture.detectChanges();
        expect(hostComponent.progressBar()!.variant).toBe('error');
      });
    });

    describe('Label personalizado', () => {
      it('debería aceptar label personalizado', () => {
        hostComponent.label.set('Cargando...');
        hostFixture.detectChanges();
        expect(hostComponent.progressBar()!.label).toBe('Cargando...');
      });
    });

    describe('Striped', () => {
      it('debería activar modo striped', () => {
        hostComponent.striped.set(true);
        hostFixture.detectChanges();
        expect(hostComponent.progressBar()!.striped).toBeTrue();
      });
    });

    describe('useService', () => {
      it('debería usar LoadingService cuando useService es true', () => {
        hostComponent.useService.set(true);
        hostFixture.detectChanges();
        expect(hostComponent.progressBar()!.useService).toBeTrue();
      });
    });
  });
});
