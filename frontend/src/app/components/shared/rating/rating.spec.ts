import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RatingComponent } from './rating';
import { Component, signal, viewChild } from '@angular/core';

@Component({
  standalone: true,
  imports: [RatingComponent],
  template: `
    <app-rating
      [rating]="rating()"
      [maxStars]="maxStars()"
      [size]="size()"
      [showValue]="showValue()"
      [interactive]="interactive()"
      (ratingChange)="onRatingChange($event)"
    />
  `
})
class TestHostComponent {
  ratingComp = viewChild(RatingComponent);
  rating = signal(3);
  maxStars = signal(5);
  size = signal<'small' | 'medium' | 'large'>('medium');
  showValue = signal(false);
  interactive = signal(false);
  lastRating = 0;

  onRatingChange(value: number) {
    this.lastRating = value;
  }
}

describe('RatingComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TestHostComponent]
    }).compileComponents();
  });

  describe('Con Host Component', () => {
    let hostFixture: ComponentFixture<TestHostComponent>;
    let hostComponent: TestHostComponent;

    beforeEach(() => {
      hostFixture = TestBed.createComponent(TestHostComponent);
      hostComponent = hostFixture.componentInstance;
      hostFixture.detectChanges();
    });

    it('debería crear rating', () => {
      expect(hostComponent.ratingComp()).toBeTruthy();
    });

    it('debería recibir rating del host', () => {
      expect(hostComponent.ratingComp()!.rating()).toBe(3);
    });

    it('debería recibir maxStars del host', () => {
      expect(hostComponent.ratingComp()!.maxStars()).toBe(5);
    });

    it('debería recibir size del host', () => {
      expect(hostComponent.ratingComp()!.size()).toBe('medium');
    });

    it('debería recibir showValue del host', () => {
      expect(hostComponent.ratingComp()!.showValue()).toBeFalse();
    });

    it('debería recibir interactive del host', () => {
      expect(hostComponent.ratingComp()!.interactive()).toBeFalse();
    });

    describe('getStars', () => {
      it('debería generar array con 5 estrellas por defecto', () => {
        const stars = hostComponent.ratingComp()!['getStars']();
        expect(stars.length).toBe(5);
        expect(stars).toEqual([1, 2, 3, 4, 5]);
      });

      it('debería generar 10 estrellas cuando maxStars es 10', () => {
        hostComponent.maxStars.set(10);
        hostFixture.detectChanges();

        const stars = hostComponent.ratingComp()!['getStars']();
        expect(stars.length).toBe(10);
      });

      it('debería generar 3 estrellas cuando maxStars es 3', () => {
        hostComponent.maxStars.set(3);
        hostFixture.detectChanges();

        const stars = hostComponent.ratingComp()!['getStars']();
        expect(stars.length).toBe(3);
      });
    });

    describe('displayRating', () => {
      it('debería retornar rating cuando no hay hover', () => {
        expect(hostComponent.ratingComp()!['displayRating']()).toBe(3);
      });

      it('debería retornar hoveredStar cuando hay hover', () => {
        hostComponent.interactive.set(true);
        hostFixture.detectChanges();

        hostComponent.ratingComp()!['onStarHover'](5);
        expect(hostComponent.ratingComp()!['displayRating']()).toBe(5);
      });
    });

    describe('Modo no interactivo', () => {
      it('onStarClick no debería emitir', () => {
        hostComponent.lastRating = 0;
        hostComponent.ratingComp()!['onStarClick'](4);
        expect(hostComponent.lastRating).toBe(0);
      });

      it('onStarHover no debería cambiar hoveredStar', () => {
        hostComponent.ratingComp()!['onStarHover'](4);
        expect(hostComponent.ratingComp()!['hoveredStar']()).toBe(0);
      });

      it('onMouseLeave no debería cambiar hoveredStar previamente establecido', () => {
        hostComponent.ratingComp()!['hoveredStar'].set(3);
        hostComponent.ratingComp()!['onMouseLeave']();
        expect(hostComponent.ratingComp()!['hoveredStar']()).toBe(3);
      });
    });

    describe('Modo interactivo', () => {
      beforeEach(() => {
        hostComponent.interactive.set(true);
        hostFixture.detectChanges();
      });

      it('debería emitir ratingChange al hacer click', () => {
        hostComponent.ratingComp()!['onStarClick'](4);
        expect(hostComponent.lastRating).toBe(4);
      });

      it('debería actualizar hoveredStar en hover', () => {
        hostComponent.ratingComp()!['onStarHover'](4);
        expect(hostComponent.ratingComp()!['hoveredStar']()).toBe(4);
      });

      it('debería resetear hoveredStar en mouseLeave', () => {
        hostComponent.ratingComp()!['onStarHover'](4);
        expect(hostComponent.ratingComp()!['hoveredStar']()).toBe(4);

        hostComponent.ratingComp()!['onMouseLeave']();
        expect(hostComponent.ratingComp()!['hoveredStar']()).toBe(0);
      });
    });

    describe('Tamaños', () => {
      it('debería aceptar size small', () => {
        hostComponent.size.set('small');
        hostFixture.detectChanges();
        expect(hostComponent.ratingComp()!.size()).toBe('small');
      });

      it('debería aceptar size large', () => {
        hostComponent.size.set('large');
        hostFixture.detectChanges();
        expect(hostComponent.ratingComp()!.size()).toBe('large');
      });
    });

    describe('showValue', () => {
      it('debería poder activar showValue', () => {
        hostComponent.showValue.set(true);
        hostFixture.detectChanges();
        expect(hostComponent.ratingComp()!.showValue()).toBeTrue();
      });
    });
  });
});
