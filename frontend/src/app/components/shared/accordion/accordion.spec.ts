import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { Accordion, AccordionItem } from './accordion';
import { Component, signal, viewChild } from '@angular/core';

@Component({
  standalone: true,
  imports: [Accordion],
  template: `<app-accordion [items]="items()" [mode]="mode()" />`
})
class TestHostComponent {
  accordion = viewChild(Accordion);
  items = signal<AccordionItem[]>([
    { id: 1, title: 'Item 1', content: 'Content 1' },
    { id: 2, title: 'Item 2', content: 'Content 2' },
    { id: 3, title: 'Item 3', content: 'Content 3' }
  ]);
  mode = signal<'single' | 'multiple'>('single');
}

describe('Accordion', () => {
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

    it('debería crear el accordion', () => {
      expect(hostComponent.accordion()).toBeTruthy();
    });

    it('debería recibir items del host', () => {
      expect(hostComponent.accordion()!.items().length).toBe(3);
    });

    it('debería tener openItems vacío inicialmente', () => {
      expect(hostComponent.accordion()!.openItems().size).toBe(0);
    });

    it('debería tener focusedIndex en 0', () => {
      expect(hostComponent.accordion()!.focusedIndex()).toBe(0);
    });

    describe('Toggle', () => {
      it('debería abrir un item cerrado', () => {
        hostComponent.accordion()!.toggle(1);
        expect(hostComponent.accordion()!.openItems().has(1)).toBeTrue();
      });

      it('debería cerrar un item abierto', () => {
        const accordion = hostComponent.accordion()!;
        accordion.toggle(1);
        expect(accordion.openItems().has(1)).toBeTrue();
        accordion.toggle(1);
        expect(accordion.openItems().has(1)).toBeFalse();
      });

      it('debería abrir item con id string', () => {
        hostComponent.items.set([
          { id: 'item-1', title: 'Item 1', content: 'Content 1' }
        ]);
        hostFixture.detectChanges();

        hostComponent.accordion()!.toggle('item-1');
        expect(hostComponent.accordion()!.openItems().has('item-1')).toBeTrue();
      });
    });

    describe('isOpen', () => {
      it('debería retornar false para item cerrado', () => {
        expect(hostComponent.accordion()!.isOpen(1)).toBeFalse();
      });

      it('debería retornar true para item abierto', () => {
        hostComponent.accordion()!.toggle(1);
        expect(hostComponent.accordion()!.isOpen(1)).toBeTrue();
      });
    });

    describe('Modo single', () => {
      it('debería cerrar otros items al abrir uno nuevo', () => {
        const accordion = hostComponent.accordion()!;
        accordion.toggle(1);
        expect(accordion.isOpen(1)).toBeTrue();

        accordion.toggle(2);
        expect(accordion.isOpen(1)).toBeFalse();
        expect(accordion.isOpen(2)).toBeTrue();
      });
    });

    describe('Modo multiple', () => {
      it('debería permitir múltiples items abiertos', () => {
        hostComponent.mode.set('multiple');
        hostFixture.detectChanges();

        const accordion = hostComponent.accordion()!;
        accordion.toggle(1);
        accordion.toggle(2);

        expect(accordion.isOpen(1)).toBeTrue();
        expect(accordion.isOpen(2)).toBeTrue();
      });
    });

    describe('Navegación por teclado', () => {
      it('navigateUp debería manejar headers vacíos sin error', () => {
        expect(() => hostComponent.accordion()!.navigateUp(0)).not.toThrow();
      });

      it('navigateDown debería manejar headers vacíos sin error', () => {
        expect(() => hostComponent.accordion()!.navigateDown(0)).not.toThrow();
      });

      it('navigateToFirst debería manejar headers vacíos sin error', () => {
        expect(() => hostComponent.accordion()!.navigateToFirst()).not.toThrow();
      });

      it('navigateToLast debería manejar headers vacíos sin error', () => {
        expect(() => hostComponent.accordion()!.navigateToLast()).not.toThrow();
      });
    });

    describe('onHeaderKeydown', () => {
      it('debería manejar ArrowUp', () => {
        const event = new KeyboardEvent('keydown', { key: 'ArrowUp' });
        spyOn(event, 'preventDefault');
        spyOn(hostComponent.accordion()!, 'navigateUp');

        hostComponent.accordion()!.onHeaderKeydown(event, 1, 'item-1');

        expect(event.preventDefault).toHaveBeenCalled();
        expect(hostComponent.accordion()!.navigateUp).toHaveBeenCalledWith(1);
      });

      it('debería manejar ArrowDown', () => {
        const event = new KeyboardEvent('keydown', { key: 'ArrowDown' });
        spyOn(event, 'preventDefault');
        spyOn(hostComponent.accordion()!, 'navigateDown');

        hostComponent.accordion()!.onHeaderKeydown(event, 1, 'item-1');

        expect(event.preventDefault).toHaveBeenCalled();
        expect(hostComponent.accordion()!.navigateDown).toHaveBeenCalledWith(1);
      });

      it('debería manejar Home', () => {
        const event = new KeyboardEvent('keydown', { key: 'Home' });
        spyOn(event, 'preventDefault');
        spyOn(hostComponent.accordion()!, 'navigateToFirst');

        hostComponent.accordion()!.onHeaderKeydown(event, 1, 'item-1');

        expect(event.preventDefault).toHaveBeenCalled();
        expect(hostComponent.accordion()!.navigateToFirst).toHaveBeenCalled();
      });

      it('debería manejar End', () => {
        const event = new KeyboardEvent('keydown', { key: 'End' });
        spyOn(event, 'preventDefault');
        spyOn(hostComponent.accordion()!, 'navigateToLast');

        hostComponent.accordion()!.onHeaderKeydown(event, 1, 'item-1');

        expect(event.preventDefault).toHaveBeenCalled();
        expect(hostComponent.accordion()!.navigateToLast).toHaveBeenCalled();
      });

      it('debería manejar Enter', () => {
        const event = new KeyboardEvent('keydown', { key: 'Enter' });
        spyOn(event, 'preventDefault');
        spyOn(hostComponent.accordion()!, 'toggle');

        hostComponent.accordion()!.onHeaderKeydown(event, 1, 'item-1');

        expect(event.preventDefault).toHaveBeenCalled();
        expect(hostComponent.accordion()!.toggle).toHaveBeenCalledWith('item-1');
      });

      it('debería manejar Space', () => {
        const event = new KeyboardEvent('keydown', { key: ' ' });
        spyOn(event, 'preventDefault');
        spyOn(hostComponent.accordion()!, 'toggle');

        hostComponent.accordion()!.onHeaderKeydown(event, 1, 'item-1');

        expect(event.preventDefault).toHaveBeenCalled();
        expect(hostComponent.accordion()!.toggle).toHaveBeenCalledWith('item-1');
      });

      it('debería ignorar otras teclas', () => {
        const event = new KeyboardEvent('keydown', { key: 'Tab' });
        spyOn(event, 'preventDefault');

        hostComponent.accordion()!.onHeaderKeydown(event, 1, 'item-1');

        expect(event.preventDefault).not.toHaveBeenCalled();
      });
    });

    describe('onHeaderFocus', () => {
      it('debería actualizar focusedIndex', () => {
        hostComponent.accordion()!.onHeaderFocus(2);
        expect(hostComponent.accordion()!.focusedIndex()).toBe(2);
      });
    });

    describe('getTabIndex', () => {
      it('debería retornar 0 para el índice enfocado', () => {
        hostComponent.accordion()!.focusedIndex.set(1);
        expect(hostComponent.accordion()!.getTabIndex(1)).toBe(0);
      });

      it('debería retornar -1 para índices no enfocados', () => {
        hostComponent.accordion()!.focusedIndex.set(0);
        expect(hostComponent.accordion()!.getTabIndex(1)).toBe(-1);
        expect(hostComponent.accordion()!.getTabIndex(2)).toBe(-1);
      });
    });

    describe('Items con isOpen inicial', () => {
      it('debería poder abrir múltiples items en modo multiple', fakeAsync(() => {
        hostComponent.mode.set('multiple');
        hostFixture.detectChanges();
        
        const accordion = hostComponent.accordion()!;
        
        accordion.toggle(1);
        hostFixture.detectChanges();
        tick();
        
        accordion.toggle(3);
        hostFixture.detectChanges();
        tick();

        expect(accordion.openItems().has(1)).toBeTrue();
        expect(accordion.openItems().has(3)).toBeTrue();
        expect(accordion.openItems().has(2)).toBeFalse();
      }));
    });
  });
});
