import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Breadcrumbs, BreadcrumbItem } from './breadcrumbs';
import { Component, signal, viewChild } from '@angular/core';
import { RouterTestingModule } from '@angular/router/testing';

@Component({
  standalone: true,
  imports: [Breadcrumbs, RouterTestingModule],
  template: `
    <app-breadcrumbs
      [items]="items()"
      [separator]="separator()"
    />
  `
})
class TestHostComponent {
  breadcrumbs = viewChild(Breadcrumbs);
  items = signal<BreadcrumbItem[]>([
    { label: 'Home', url: '/' },
    { label: 'Products', url: '/products' },
    { label: 'Detail' }
  ]);
  separator = signal('>');
}

describe('Breadcrumbs', () => {
  let component: Breadcrumbs;
  let fixture: ComponentFixture<Breadcrumbs>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Breadcrumbs, RouterTestingModule]
    }).compileComponents();
  });

  describe('Creación', () => {
    it('debería crear el componente', () => {
      fixture = TestBed.createComponent(Breadcrumbs);
      component = fixture.componentInstance;
      expect(component).toBeTruthy();
    });
  });

  describe('Estado inicial', () => {
    beforeEach(() => {
      fixture = TestBed.createComponent(Breadcrumbs);
      component = fixture.componentInstance;
    });

    it('debería tener items vacío por defecto', () => {
      expect(component.items).toEqual([]);
    });

    it('debería tener separator > por defecto', () => {
      expect(component.separator).toBe('>');
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

    it('debería crear breadcrumbs dentro del host', () => {
      expect(hostComponent.breadcrumbs()).toBeTruthy();
    });

    it('debería recibir items del host', () => {
      expect(hostComponent.breadcrumbs()!.items.length).toBe(3);
    });

    it('debería recibir separator del host', () => {
      expect(hostComponent.breadcrumbs()!.separator).toBe('>');
    });

    describe('Items', () => {
      it('debería aceptar items con url', () => {
        const items = hostComponent.breadcrumbs()!.items;
        expect(items[0].url).toBe('/');
        expect(items[1].url).toBe('/products');
      });

      it('debería aceptar items sin url (último item)', () => {
        const items = hostComponent.breadcrumbs()!.items;
        expect(items[2].url).toBeUndefined();
      });

      it('debería aceptar items con icon', () => {
        hostComponent.items.set([
          { label: 'Home', url: '/', icon: 'home' },
          { label: 'Detail' }
        ]);
        hostFixture.detectChanges();

        const items = hostComponent.breadcrumbs()!.items;
        expect(items[0].icon).toBe('home');
      });
    });

    describe('Separator', () => {
      it('debería aceptar separator /', () => {
        hostComponent.separator.set('/');
        hostFixture.detectChanges();
        expect(hostComponent.breadcrumbs()!.separator).toBe('/');
      });

      it('debería aceptar separator →', () => {
        hostComponent.separator.set('→');
        hostFixture.detectChanges();
        expect(hostComponent.breadcrumbs()!.separator).toBe('→');
      });

      it('debería aceptar separator chevron', () => {
        hostComponent.separator.set('»');
        hostFixture.detectChanges();
        expect(hostComponent.breadcrumbs()!.separator).toBe('»');
      });
    });

    describe('Actualización dinámica', () => {
      it('debería actualizar items cuando cambian', () => {
        hostComponent.items.set([
          { label: 'New Home', url: '/' }
        ]);
        hostFixture.detectChanges();

        expect(hostComponent.breadcrumbs()!.items.length).toBe(1);
        expect(hostComponent.breadcrumbs()!.items[0].label).toBe('New Home');
      });

      it('debería manejar items vacíos', () => {
        hostComponent.items.set([]);
        hostFixture.detectChanges();

        expect(hostComponent.breadcrumbs()!.items.length).toBe(0);
      });
    });
  });
});
