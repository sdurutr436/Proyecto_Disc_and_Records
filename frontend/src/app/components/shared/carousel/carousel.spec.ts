import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { Carousel } from './carousel';
import { Component, viewChild } from '@angular/core';
import { ChangeDetectorRef, Renderer2 } from '@angular/core';

@Component({
  standalone: true,
  imports: [Carousel],
  template: `
    <app-carousel [title]="title" [itemsToShow]="itemsToShow" [rows]="rows">
      <div>Item 1</div>
      <div>Item 2</div>
      <div>Item 3</div>
    </app-carousel>
  `
})
class TestHostComponent {
  carousel = viewChild(Carousel);
  title = 'Test Carousel';
  itemsToShow = 4;
  rows = 1;
}

describe('Carousel', () => {
  let component: Carousel;
  let fixture: ComponentFixture<Carousel>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Carousel]
    }).compileComponents();
  });

  describe('Creación', () => {
    it('debería crear el componente', () => {
      fixture = TestBed.createComponent(Carousel);
      component = fixture.componentInstance;
      expect(component).toBeTruthy();
    });
  });

  describe('Estado inicial', () => {
    beforeEach(() => {
      fixture = TestBed.createComponent(Carousel);
      component = fixture.componentInstance;
    });

    it('debería tener title vacío por defecto', () => {
      expect(component.title).toBe('');
    });

    it('debería tener itemsToShow 4 por defecto', () => {
      expect(component.itemsToShow).toBe(4);
    });

    it('debería tener rows 1 por defecto', () => {
      expect(component.rows).toBe(1);
    });

    it('debería tener currentIndex 0', () => {
      expect(component.currentIndex).toBe(0);
    });

    it('debería tener canScrollLeft false', () => {
      expect(component.canScrollLeft).toBeFalse();
    });

    it('debería tener canScrollRight true', () => {
      expect(component.canScrollRight).toBeTrue();
    });
  });

  describe('Métodos de scroll', () => {
    beforeEach(() => {
      fixture = TestBed.createComponent(Carousel);
      component = fixture.componentInstance;
      fixture.detectChanges();
    });

    describe('scrollLeft', () => {
      it('debería manejar carouselTrack undefined sin error', () => {
        (component as any).carouselTrack = undefined;
        expect(() => component.scrollLeft()).not.toThrow();
      });
    });

    describe('scrollRight', () => {
      it('debería manejar carouselTrack undefined sin error', () => {
        (component as any).carouselTrack = undefined;
        expect(() => component.scrollRight()).not.toThrow();
      });
    });
  });

  describe('toggleHighlight', () => {
    beforeEach(() => {
      fixture = TestBed.createComponent(Carousel);
      component = fixture.componentInstance;
      fixture.detectChanges();
    });

    it('debería manejar carouselTrack undefined sin error', () => {
      (component as any).carouselTrack = undefined;
      expect(() => component.toggleHighlight()).not.toThrow();
    });
  });

  describe('setOpacity', () => {
    beforeEach(() => {
      fixture = TestBed.createComponent(Carousel);
      component = fixture.componentInstance;
      fixture.detectChanges();
    });

    it('debería manejar carouselTrack undefined sin error', () => {
      (component as any).carouselTrack = undefined;
      expect(() => component.setOpacity(0.5)).not.toThrow();
    });
  });

  describe('ngOnDestroy', () => {
    beforeEach(() => {
      fixture = TestBed.createComponent(Carousel);
      component = fixture.componentInstance;
      fixture.detectChanges();
    });

    it('debería limpiar observers sin error', () => {
      expect(() => component.ngOnDestroy()).not.toThrow();
    });

    it('debería manejar carouselTrack undefined sin error', () => {
      (component as any).carouselTrack = undefined;
      expect(() => component.ngOnDestroy()).not.toThrow();
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

    it('debería crear carousel dentro del host', () => {
      expect(hostComponent.carousel()).toBeTruthy();
    });

    it('debería recibir title del host', () => {
      expect(hostComponent.carousel()!.title).toBe('Test Carousel');
    });

    it('debería recibir itemsToShow del host', () => {
      expect(hostComponent.carousel()!.itemsToShow).toBe(4);
    });

    it('debería recibir rows del host', () => {
      expect(hostComponent.carousel()!.rows).toBe(1);
    });

    describe('Actualización dinámica', () => {
      it('debería actualizar title', () => {
        hostComponent.title = 'New Title';
        hostFixture.detectChanges();
        expect(hostComponent.carousel()!.title).toBe('New Title');
      });

      it('debería actualizar itemsToShow', () => {
        hostComponent.itemsToShow = 6;
        hostFixture.detectChanges();
        expect(hostComponent.carousel()!.itemsToShow).toBe(6);
      });

      it('debería actualizar rows', () => {
        hostComponent.rows = 2;
        hostFixture.detectChanges();
        expect(hostComponent.carousel()!.rows).toBe(2);
      });
    });

    describe('Funcionalidad de scroll', () => {
      it('debería poder ejecutar scrollLeft', () => {
        expect(() => hostComponent.carousel()!.scrollLeft()).not.toThrow();
      });

      it('debería poder ejecutar scrollRight', () => {
        expect(() => hostComponent.carousel()!.scrollRight()).not.toThrow();
      });
    });

    describe('Métodos de estilo', () => {
      it('debería poder ejecutar toggleHighlight', () => {
        expect(() => hostComponent.carousel()!.toggleHighlight()).not.toThrow();
      });

      it('debería poder ejecutar setOpacity', () => {
        expect(() => hostComponent.carousel()!.setOpacity(0.8)).not.toThrow();
      });

      it('debería aceptar diferentes valores de opacidad', () => {
        const carousel = hostComponent.carousel()!;
        expect(() => carousel.setOpacity(0)).not.toThrow();
        expect(() => carousel.setOpacity(0.5)).not.toThrow();
        expect(() => carousel.setOpacity(1)).not.toThrow();
      });
    });
  });
});
