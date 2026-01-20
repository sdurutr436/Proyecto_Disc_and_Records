import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { Notification } from './notification';
import { Component, viewChild, signal } from '@angular/core';

@Component({
  standalone: true,
  imports: [Notification],
  template: `
    <app-notification
      [type]="type()"
      [title]="title()"
      [message]="message()"
      [position]="position()"
      [autoDismiss]="autoDismiss()"
      [duration]="duration()"
      (dismissed)="onDismissed()"
    />
  `
})
class TestHostComponent {
  notification = viewChild(Notification);
  type = signal<'success' | 'error' | 'warning' | 'info'>('info');
  title = signal('Test Title');
  message = signal('Test message');
  position = signal<'top-right' | 'top-left' | 'bottom-right' | 'bottom-left'>('top-right');
  autoDismiss = signal(true);
  duration = signal(5000);
  dismissedCount = 0;

  onDismissed() {
    this.dismissedCount++;
  }
}

describe('Notification', () => {
  let component: Notification;
  let fixture: ComponentFixture<Notification>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Notification]
    }).compileComponents();
  });

  describe('Creación', () => {
    it('debería crear el componente', () => {
      fixture = TestBed.createComponent(Notification);
      component = fixture.componentInstance;
      expect(component).toBeTruthy();
    });
  });

  describe('Estado inicial', () => {
    beforeEach(() => {
      fixture = TestBed.createComponent(Notification);
      component = fixture.componentInstance;
    });

    it('debería tener type info por defecto', () => {
      expect(component.type).toBe('info');
    });

    it('debería tener title vacío por defecto', () => {
      expect(component.title).toBe('');
    });

    it('debería tener message vacío por defecto', () => {
      expect(component.message).toBe('');
    });

    it('debería tener position top-right por defecto', () => {
      expect(component.position).toBe('top-right');
    });

    it('debería tener autoDismiss true por defecto', () => {
      expect(component.autoDismiss).toBeTrue();
    });

    it('debería tener duration 5000 por defecto', () => {
      expect(component.duration).toBe(5000);
    });

    it('debería tener stackIndex -1 por defecto', () => {
      expect(component.stackIndex).toBe(-1);
    });

    it('debería tener isVisible false por defecto', () => {
      expect(component.isVisible()).toBeFalse();
    });

    it('debería tener isPaused false por defecto', () => {
      expect(component.isPaused()).toBeFalse();
    });
  });

  describe('Tipos', () => {
    beforeEach(() => {
      fixture = TestBed.createComponent(Notification);
      component = fixture.componentInstance;
    });

    it('debería aceptar type success', () => {
      component.type = 'success';
      expect(component.type).toBe('success');
    });

    it('debería aceptar type error', () => {
      component.type = 'error';
      expect(component.type).toBe('error');
    });

    it('debería aceptar type warning', () => {
      component.type = 'warning';
      expect(component.type).toBe('warning');
    });

    it('debería aceptar type info', () => {
      component.type = 'info';
      expect(component.type).toBe('info');
    });
  });

  describe('Posiciones', () => {
    beforeEach(() => {
      fixture = TestBed.createComponent(Notification);
      component = fixture.componentInstance;
    });

    it('debería aceptar position top-right', () => {
      component.position = 'top-right';
      expect(component.position).toBe('top-right');
    });

    it('debería aceptar position top-left', () => {
      component.position = 'top-left';
      expect(component.position).toBe('top-left');
    });

    it('debería aceptar position bottom-right', () => {
      component.position = 'bottom-right';
      expect(component.position).toBe('bottom-right');
    });

    it('debería aceptar position bottom-left', () => {
      component.position = 'bottom-left';
      expect(component.position).toBe('bottom-left');
    });
  });

  describe('Signals', () => {
    beforeEach(() => {
      fixture = TestBed.createComponent(Notification);
      component = fixture.componentInstance;
    });

    it('debería poder cambiar isVisible', () => {
      component.isVisible.set(true);
      expect(component.isVisible()).toBeTrue();
    });

    it('debería poder cambiar isPaused', () => {
      component.isPaused.set(true);
      expect(component.isPaused()).toBeTrue();
    });
  });

  describe('Evento dismissed', () => {
    beforeEach(() => {
      fixture = TestBed.createComponent(Notification);
      component = fixture.componentInstance;
    });

    it('debería emitir evento dismissed', () => {
      spyOn(component.dismissed, 'emit');
      component.dismissed.emit();
      expect(component.dismissed.emit).toHaveBeenCalled();
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

    it('debería crear notification dentro del host', () => {
      expect(hostComponent.notification()).toBeTruthy();
    });

    it('debería recibir type del host', () => {
      expect(hostComponent.notification()!.type).toBe('info');
    });

    it('debería recibir title del host', () => {
      expect(hostComponent.notification()!.title).toBe('Test Title');
    });

    it('debería recibir message del host', () => {
      expect(hostComponent.notification()!.message).toBe('Test message');
    });

    it('debería recibir position del host', () => {
      expect(hostComponent.notification()!.position).toBe('top-right');
    });

    it('debería recibir autoDismiss del host', () => {
      expect(hostComponent.notification()!.autoDismiss).toBeTrue();
    });

    it('debería recibir duration del host', () => {
      expect(hostComponent.notification()!.duration).toBe(5000);
    });

    describe('Actualización dinámica', () => {
      it('debería actualizar type', () => {
        hostComponent.type.set('success');
        hostFixture.detectChanges();
        expect(hostComponent.notification()!.type).toBe('success');
      });

      it('debería actualizar title', () => {
        hostComponent.title.set('New Title');
        hostFixture.detectChanges();
        expect(hostComponent.notification()!.title).toBe('New Title');
      });

      it('debería actualizar message', () => {
        hostComponent.message.set('New message');
        hostFixture.detectChanges();
        expect(hostComponent.notification()!.message).toBe('New message');
      });

      it('debería actualizar position', () => {
        hostComponent.position.set('bottom-left');
        hostFixture.detectChanges();
        expect(hostComponent.notification()!.position).toBe('bottom-left');
      });

      it('debería actualizar duration', () => {
        hostComponent.duration.set(3000);
        hostFixture.detectChanges();
        expect(hostComponent.notification()!.duration).toBe(3000);
      });

      it('debería desactivar autoDismiss', () => {
        hostComponent.autoDismiss.set(false);
        hostFixture.detectChanges();
        expect(hostComponent.notification()!.autoDismiss).toBeFalse();
      });
    });
  });

  describe('Icon', () => {
    beforeEach(() => {
      fixture = TestBed.createComponent(Notification);
      component = fixture.componentInstance;
    });

    it('debería tener icon vacío por defecto', () => {
      expect(component.icon).toBe('');
    });

    it('debería aceptar icon personalizado', () => {
      component.icon = 'custom-icon';
      expect(component.icon).toBe('custom-icon');
    });
  });

  describe('getHeightAt callback', () => {
    beforeEach(() => {
      fixture = TestBed.createComponent(Notification);
      component = fixture.componentInstance;
    });

    it('debería aceptar getHeightAt callback', () => {
      const callback = (index: number) => index * 50;
      component.getHeightAt = callback;
      expect(component.getHeightAt).toBe(callback);
      expect(component.getHeightAt(2)).toBe(100);
    });
  });
});
