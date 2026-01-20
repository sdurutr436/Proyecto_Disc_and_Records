import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Tabs, Tab } from './tabs';
import { Component, signal, viewChild } from '@angular/core';
import { NO_ERRORS_SCHEMA } from '@angular/core';

@Component({
  standalone: true,
  imports: [Tabs],
  template: `
    <app-tabs
      [tabs]="tabs()"
      [activeTabId]="activeTabId()"
      (tabChange)="onTabChange($event)"
    />
  `,
  schemas: [NO_ERRORS_SCHEMA]
})
class TestHostComponent {
  tabsComp = viewChild(Tabs);
  tabs = signal<Tab[]>([
    { id: 'tab1', label: 'Tab 1' },
    { id: 'tab2', label: 'Tab 2' },
    { id: 'tab3', label: 'Tab 3', disabled: true }
  ]);
  activeTabId = signal<string | number>('tab1');
  lastTabChange: string | number = '';

  onTabChange(tabId: string | number) {
    this.lastTabChange = tabId;
  }
}

describe('Tabs', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Tabs, TestHostComponent],
      schemas: [NO_ERRORS_SCHEMA]
    }).compileComponents();
  });

  describe('Con Host Component', () => {
    let hostFixture: ComponentFixture<TestHostComponent>;
    let hostComponent: TestHostComponent;

    beforeEach(async () => {
      hostFixture = TestBed.createComponent(TestHostComponent);
      hostComponent = hostFixture.componentInstance;
      hostFixture.detectChanges();
    });

    it('debería crear tabs dentro del host', () => {
      expect(hostComponent.tabsComp()).toBeTruthy();
    });

    it('debería recibir tabs del host', () => {
      expect(hostComponent.tabsComp()!.tabs().length).toBe(3);
    });

    it('debería recibir activeTabId del host', () => {
      expect(hostComponent.tabsComp()!.activeTabId()).toBe('tab1');
    });

    describe('selectTab', () => {
      it('debería emitir tabChange para tab habilitado', () => {
        hostComponent.tabsComp()!.selectTab('tab2');
        expect(hostComponent.lastTabChange).toBe('tab2');
      });

      it('no debería emitir tabChange para tab deshabilitado', () => {
        hostComponent.lastTabChange = '';
        hostComponent.tabsComp()!.selectTab('tab3');
        expect(hostComponent.lastTabChange).toBe('');
      });

      it('no debería emitir cuando está arrastrando', () => {
        const tabs = hostComponent.tabsComp()!;
        (tabs as any).isDragging = true;
        hostComponent.lastTabChange = '';

        tabs.selectTab('tab2');

        expect(hostComponent.lastTabChange).toBe('');
      });
    });

    describe('isActive', () => {
      it('debería retornar true para tab activo', () => {
        expect(hostComponent.tabsComp()!.isActive('tab1')).toBeTrue();
      });

      it('debería retornar false para tab inactivo', () => {
        expect(hostComponent.tabsComp()!.isActive('tab2')).toBeFalse();
      });
    });

    describe('onTabFocus', () => {
      it('debería actualizar focusedIndex', () => {
        hostComponent.tabsComp()!.onTabFocus(2);
        expect(hostComponent.tabsComp()!.focusedIndex()).toBe(2);
      });
    });

    describe('getTabIndex', () => {
      it('debería retornar 0 para tab activo', () => {
        // tab1 es el activo (índice 0)
        expect(hostComponent.tabsComp()!.getTabIndex(0)).toBe(0);
      });

      it('debería retornar -1 para tabs no activos', () => {
        expect(hostComponent.tabsComp()!.getTabIndex(1)).toBe(-1);
        expect(hostComponent.tabsComp()!.getTabIndex(2)).toBe(-1);
      });
    });

    describe('Navegación por teclado', () => {
      describe('onTabKeydown', () => {
        it('debería manejar ArrowLeft', () => {
          const event = new KeyboardEvent('keydown', { key: 'ArrowLeft' });
          spyOn(event, 'preventDefault');

          hostComponent.tabsComp()!.onTabKeydown(event, 1);

          expect(event.preventDefault).toHaveBeenCalled();
        });

        it('debería manejar ArrowRight', () => {
          const event = new KeyboardEvent('keydown', { key: 'ArrowRight' });
          spyOn(event, 'preventDefault');

          hostComponent.tabsComp()!.onTabKeydown(event, 0);

          expect(event.preventDefault).toHaveBeenCalled();
        });

        it('debería manejar Home', () => {
          const event = new KeyboardEvent('keydown', { key: 'Home' });
          spyOn(event, 'preventDefault');

          hostComponent.tabsComp()!.onTabKeydown(event, 1);

          expect(event.preventDefault).toHaveBeenCalled();
        });

        it('debería manejar End', () => {
          const event = new KeyboardEvent('keydown', { key: 'End' });
          spyOn(event, 'preventDefault');

          hostComponent.tabsComp()!.onTabKeydown(event, 0);

          expect(event.preventDefault).toHaveBeenCalled();
        });

        it('debería ignorar otras teclas', () => {
          const event = new KeyboardEvent('keydown', { key: 'Tab' });
          spyOn(event, 'preventDefault');

          hostComponent.tabsComp()!.onTabKeydown(event, 0);

          expect(event.preventDefault).not.toHaveBeenCalled();
        });
      });
    });

    describe('Actualización dinámica', () => {
      it('debería actualizar activeTabId', () => {
        hostComponent.activeTabId.set('tab2');
        hostFixture.detectChanges();

        expect(hostComponent.tabsComp()!.activeTabId()).toBe('tab2');
        expect(hostComponent.tabsComp()!.isActive('tab2')).toBeTrue();
      });

      it('debería actualizar tabs', () => {
        hostComponent.tabs.set([
          { id: 'new1', label: 'New Tab 1' },
          { id: 'new2', label: 'New Tab 2' }
        ]);
        hostFixture.detectChanges();

        expect(hostComponent.tabsComp()!.tabs().length).toBe(2);
      });
    });

    describe('Tabs con IDs numéricos', () => {
      it('debería aceptar tabs con id numérico', () => {
        hostComponent.tabs.set([
          { id: 1, label: 'Tab 1' },
          { id: 2, label: 'Tab 2' }
        ]);
        hostComponent.activeTabId.set(1);
        hostFixture.detectChanges();

        expect(hostComponent.tabsComp()!.isActive(1)).toBeTrue();
      });
    });

    describe('Tab con propiedades adicionales', () => {
      it('debería aceptar tabs sin icono', () => {
        hostComponent.tabs.set([
          { id: 'tab1', label: 'Tab 1' },
          { id: 'tab2', label: 'Tab 2' }
        ]);
        hostFixture.detectChanges();

        expect(hostComponent.tabsComp()!.tabs()[0]).toEqual(
          jasmine.objectContaining({ id: 'tab1', label: 'Tab 1' })
        );
      });
    });
  });

  describe('ngOnDestroy', () => {
    let hostFixture: ComponentFixture<TestHostComponent>;
    let hostComponent: TestHostComponent;

    beforeEach(async () => {
      hostFixture = TestBed.createComponent(TestHostComponent);
      hostComponent = hostFixture.componentInstance;
      hostFixture.detectChanges();
    });

    it('debería limpiar listeners sin error', () => {
      expect(() => hostComponent.tabsComp()!.ngOnDestroy()).not.toThrow();
    });
  });
});
