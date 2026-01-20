import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { Modal } from './modal';
import { Component, signal, viewChild } from '@angular/core';

@Component({
  standalone: true,
  imports: [Modal],
  template: `
    <app-modal
      [isOpen]="isOpen()"
      [title]="title()"
      (onClose)="onModalClose()">
      <p>Modal content</p>
    </app-modal>
  `
})
class TestHostComponent {
  modal = viewChild(Modal);
  isOpen = signal(false);
  title = signal('Test Modal');
  closeCalled = false;

  onModalClose() {
    this.closeCalled = true;
  }
}

describe('Modal', () => {
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

    afterEach(fakeAsync(() => {
      if (hostComponent.modal()?.isVisible()) {
        hostComponent.isOpen.set(false);
        hostFixture.detectChanges();
        tick(100);
      }
    }));

    it('debería crear modal', () => {
      expect(hostComponent.modal()).toBeTruthy();
    });

    it('debería tener isVisible en false inicialmente', () => {
      expect(hostComponent.modal()!.isVisible()).toBeFalse();
    });

    it('debería recibir title del host', () => {
      expect(hostComponent.modal()!.title()).toBe('Test Modal');
    });

    describe('open', () => {
      it('debería establecer isVisible en true', fakeAsync(() => {
        hostComponent.modal()!.open();
        expect(hostComponent.modal()!.isVisible()).toBeTrue();
        tick(100);
      }));
    });

    describe('close', () => {
      it('debería establecer isVisible en false', fakeAsync(() => {
        hostComponent.modal()!.open();
        tick(50);

        hostComponent.modal()!.close();
        expect(hostComponent.modal()!.isVisible()).toBeFalse();
        tick(50);
      }));

      it('debería emitir evento onClose', fakeAsync(() => {
        hostComponent.modal()!.open();
        tick(50);

        hostComponent.modal()!.close();
        expect(hostComponent.closeCalled).toBeTrue();
        tick(50);
      }));
    });

    describe('Sincronización con isOpen', () => {
      it('debería sincronizar isVisible con isOpen via effect', fakeAsync(() => {
        expect(hostComponent.modal()!.isVisible()).toBeFalse();

        hostComponent.isOpen.set(true);
        hostFixture.detectChanges();
        tick(50);

        expect(hostComponent.modal()!.isVisible()).toBeTrue();
        tick(50);
      }));

      it('debería cerrar sin emitir cuando isOpen cambia a false', fakeAsync(() => {
        hostComponent.isOpen.set(true);
        hostFixture.detectChanges();
        tick(50);

        hostComponent.closeCalled = false;
        hostComponent.isOpen.set(false);
        hostFixture.detectChanges();
        tick(50);

        expect(hostComponent.closeCalled).toBeFalse();
      }));
    });

    describe('Focus management', () => {
      it('debería restaurar foco al elemento anterior', fakeAsync(() => {
        const button = document.createElement('button');
        document.body.appendChild(button);
        button.focus();

        hostComponent.modal()!.open();
        tick(50);

        hostComponent.modal()!.close();
        tick(50);

        expect(document.activeElement).toBe(button);

        document.body.removeChild(button);
      }));
    });
  });
});
