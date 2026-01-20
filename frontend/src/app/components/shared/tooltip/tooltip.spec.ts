import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { Tooltip } from './tooltip';
import { Component, signal, viewChild } from '@angular/core';

@Component({
  standalone: true,
  imports: [Tooltip],
  template: `
    <app-tooltip
      [text]="text()"
      [position]="position()"
      [showDelay]="showDelay()"
      [hideDelay]="hideDelay()">
      <button>Hover me</button>
    </app-tooltip>
  `
})
class TestHostComponent {
  tooltip = viewChild(Tooltip);
  text = signal('Test tooltip');
  position = signal<'top' | 'bottom' | 'left' | 'right'>('top');
  showDelay = signal(300);
  hideDelay = signal(0);
}

describe('Tooltip', () => {
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

    it('debería crear tooltip', () => {
      expect(hostComponent.tooltip()).toBeTruthy();
    });

    it('debería tener isVisible en false', () => {
      expect(hostComponent.tooltip()!.isVisible()).toBeFalse();
    });

    it('debería generar un tooltipId único', () => {
      expect(hostComponent.tooltip()!.tooltipId).toMatch(/^tooltip-\d+$/);
    });

    it('debería recibir text del host', () => {
      expect(hostComponent.tooltip()!.text()).toBe('Test tooltip');
    });

    it('debería recibir position del host', () => {
      expect(hostComponent.tooltip()!.position()).toBe('top');
    });

    describe('Mouse events', () => {
      it('onMouseEnter debería programar mostrar el tooltip', fakeAsync(() => {
        hostComponent.tooltip()!.onMouseEnter();
        expect(hostComponent.tooltip()!.isVisible()).toBeFalse();

        tick(300);
        expect(hostComponent.tooltip()!.isVisible()).toBeTrue();
      }));

      it('onMouseLeave debería programar ocultar el tooltip', fakeAsync(() => {
        const tooltip = hostComponent.tooltip()!;
        tooltip.onMouseEnter();
        tick(300);
        expect(tooltip.isVisible()).toBeTrue();

        tooltip.onMouseLeave();
        tick(0);
        expect(tooltip.isVisible()).toBeFalse();
      }));

      it('onMouseLeave debería cancelar showTimeout si se sale antes', fakeAsync(() => {
        const tooltip = hostComponent.tooltip()!;
        tooltip.onMouseEnter();
        tick(100);
        tooltip.onMouseLeave();
        tick(200);

        expect(tooltip.isVisible()).toBeFalse();
      }));
    });

    describe('Focus events', () => {
      it('onFocusIn debería programar mostrar el tooltip', fakeAsync(() => {
        hostComponent.tooltip()!.onFocusIn();
        expect(hostComponent.tooltip()!.isVisible()).toBeFalse();

        tick(300);
        expect(hostComponent.tooltip()!.isVisible()).toBeTrue();
      }));

      it('onFocusOut debería programar ocultar el tooltip', fakeAsync(() => {
        const tooltip = hostComponent.tooltip()!;
        tooltip.onFocusIn();
        tick(300);
        expect(tooltip.isVisible()).toBeTrue();

        tooltip.onFocusOut();
        tick(0);
        expect(tooltip.isVisible()).toBeFalse();
      }));
    });

    describe('ngOnDestroy', () => {
      it('debería limpiar timeouts pendientes sin error', fakeAsync(() => {
        hostComponent.tooltip()!.onMouseEnter();
        tick(100);

        expect(() => hostComponent.tooltip()!.ngOnDestroy()).not.toThrow();

        tick(200);
      }));
    });

    describe('showDelay personalizado', () => {
      it('debería usar showDelay del host', fakeAsync(() => {
        hostComponent.showDelay.set(500);
        hostFixture.detectChanges();

        const tooltip = hostComponent.tooltip()!;
        tooltip.onMouseEnter();

        tick(300);
        expect(tooltip.isVisible()).toBeFalse();

        tick(200);
        expect(tooltip.isVisible()).toBeTrue();
      }));
    });

    describe('hideDelay personalizado', () => {
      it('debería usar hideDelay del host', fakeAsync(() => {
        hostComponent.hideDelay.set(100);
        hostFixture.detectChanges();

        const tooltip = hostComponent.tooltip()!;
        tooltip.onMouseEnter();
        tick(300);
        expect(tooltip.isVisible()).toBeTrue();

        tooltip.onMouseLeave();
        tick(50);
        expect(tooltip.isVisible()).toBeTrue();

        tick(50);
        expect(tooltip.isVisible()).toBeFalse();
      }));
    });

    describe('Posiciones', () => {
      it('debería aceptar position top', () => {
        hostComponent.position.set('top');
        hostFixture.detectChanges();
        expect(hostComponent.tooltip()!.position()).toBe('top');
      });

      it('debería aceptar position bottom', () => {
        hostComponent.position.set('bottom');
        hostFixture.detectChanges();
        expect(hostComponent.tooltip()!.position()).toBe('bottom');
      });

      it('debería aceptar position left', () => {
        hostComponent.position.set('left');
        hostFixture.detectChanges();
        expect(hostComponent.tooltip()!.position()).toBe('left');
      });

      it('debería aceptar position right', () => {
        hostComponent.position.set('right');
        hostFixture.detectChanges();
        expect(hostComponent.tooltip()!.position()).toBe('right');
      });
    });
  });
});
