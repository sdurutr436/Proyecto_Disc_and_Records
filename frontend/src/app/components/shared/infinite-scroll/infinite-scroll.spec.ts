import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { InfiniteScrollComponent } from './infinite-scroll';
import { Component, viewChild, signal, PLATFORM_ID } from '@angular/core';

@Component({
  standalone: true,
  imports: [InfiniteScrollComponent],
  template: `
    <app-infinite-scroll
      [loading]="loading()"
      [hasMore]="hasMore()"
      [threshold]="threshold()"
      [loadingText]="loadingText()"
      [endText]="endText()"
      [showEndMessage]="showEndMessage()"
      [disabled]="disabled()"
      (loadMore)="onLoadMore()"
    />
  `
})
class TestHostComponent {
  infiniteScroll = viewChild(InfiniteScrollComponent);
  loading = signal(false);
  hasMore = signal(true);
  threshold = signal(100);
  loadingText = signal('Cargando más...');
  endText = signal('No hay más resultados');
  showEndMessage = signal(true);
  disabled = signal(false);
  loadMoreCount = 0;

  onLoadMore() {
    this.loadMoreCount++;
  }
}

describe('InfiniteScrollComponent', () => {
  let component: InfiniteScrollComponent;
  let fixture: ComponentFixture<InfiniteScrollComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [InfiniteScrollComponent],
      providers: [
        { provide: PLATFORM_ID, useValue: 'browser' }
      ]
    }).compileComponents();
  });

  describe('Creación', () => {
    it('debería crear el componente', () => {
      fixture = TestBed.createComponent(InfiniteScrollComponent);
      component = fixture.componentInstance;
      expect(component).toBeTruthy();
    });
  });

  describe('Estado inicial', () => {
    beforeEach(() => {
      fixture = TestBed.createComponent(InfiniteScrollComponent);
      component = fixture.componentInstance;
    });

    it('debería tener loading false por defecto', () => {
      expect(component.loading).toBeFalse();
    });

    it('debería tener hasMore true por defecto', () => {
      expect(component.hasMore).toBeTrue();
    });

    it('debería tener threshold 100 por defecto', () => {
      expect(component.threshold).toBe(100);
    });

    it('debería tener loadingText por defecto', () => {
      expect(component.loadingText).toBe('Cargando más...');
    });

    it('debería tener endText por defecto', () => {
      expect(component.endText).toBe('No hay más resultados');
    });

    it('debería tener showEndMessage true por defecto', () => {
      expect(component.showEndMessage).toBeTrue();
    });

    it('debería tener disabled false por defecto', () => {
      expect(component.disabled).toBeFalse();
    });

    it('debería tener error null por defecto', () => {
      expect(component.error()).toBeNull();
    });
  });

  describe('Métodos públicos', () => {
    beforeEach(() => {
      fixture = TestBed.createComponent(InfiniteScrollComponent);
      component = fixture.componentInstance;
    });

    describe('setError', () => {
      it('debería establecer mensaje de error', () => {
        component.setError('Error de red');
        expect(component.error()).toBe('Error de red');
      });
    });

    describe('retry', () => {
      it('debería limpiar error y emitir loadMore', () => {
        spyOn(component.loadMore, 'emit');
        component.setError('Error');

        component.retry();

        expect(component.error()).toBeNull();
        expect(component.loadMore.emit).toHaveBeenCalled();
      });
    });
  });

  describe('ngOnDestroy', () => {
    beforeEach(() => {
      fixture = TestBed.createComponent(InfiniteScrollComponent);
      component = fixture.componentInstance;
      fixture.detectChanges();
    });

    it('debería desconectar observer sin error', () => {
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

    it('debería crear infinite-scroll dentro del host', () => {
      expect(hostComponent.infiniteScroll()).toBeTruthy();
    });

    it('debería recibir loading del host', () => {
      hostComponent.loading.set(true);
      hostFixture.detectChanges();
      expect(hostComponent.infiniteScroll()!.loading).toBeTrue();
    });

    it('debería recibir hasMore del host', () => {
      hostComponent.hasMore.set(false);
      hostFixture.detectChanges();
      expect(hostComponent.infiniteScroll()!.hasMore).toBeFalse();
    });

    it('debería recibir threshold del host', () => {
      hostComponent.threshold.set(200);
      hostFixture.detectChanges();
      expect(hostComponent.infiniteScroll()!.threshold).toBe(200);
    });

    it('debería recibir loadingText del host', () => {
      hostComponent.loadingText.set('Loading...');
      hostFixture.detectChanges();
      expect(hostComponent.infiniteScroll()!.loadingText).toBe('Loading...');
    });

    it('debería recibir endText del host', () => {
      hostComponent.endText.set('No more items');
      hostFixture.detectChanges();
      expect(hostComponent.infiniteScroll()!.endText).toBe('No more items');
    });

    it('debería recibir showEndMessage del host', () => {
      hostComponent.showEndMessage.set(false);
      hostFixture.detectChanges();
      expect(hostComponent.infiniteScroll()!.showEndMessage).toBeFalse();
    });

    it('debería recibir disabled del host', () => {
      hostComponent.disabled.set(true);
      hostFixture.detectChanges();
      expect(hostComponent.infiniteScroll()!.disabled).toBeTrue();
    });

    describe('Error handling', () => {
      it('debería establecer y mostrar error', () => {
        hostComponent.infiniteScroll()!.setError('Network error');
        hostFixture.detectChanges();

        expect(hostComponent.infiniteScroll()!.error()).toBe('Network error');
      });

      it('debería reintentar y emitir loadMore', () => {
        hostComponent.infiniteScroll()!.setError('Error');
        hostComponent.loadMoreCount = 0;

        hostComponent.infiniteScroll()!.retry();

        expect(hostComponent.loadMoreCount).toBe(1);
        expect(hostComponent.infiniteScroll()!.error()).toBeNull();
      });
    });
  });

  describe('Server-side rendering', () => {
    it('debería manejar plataforma no-browser sin error', async () => {
      await TestBed.resetTestingModule();
      await TestBed.configureTestingModule({
        imports: [InfiniteScrollComponent],
        providers: [
          { provide: PLATFORM_ID, useValue: 'server' }
        ]
      }).compileComponents();

      const ssrFixture = TestBed.createComponent(InfiniteScrollComponent);
      const ssrComponent = ssrFixture.componentInstance;

      expect(() => ssrFixture.detectChanges()).not.toThrow();
      expect(ssrComponent).toBeTruthy();
    });
  });
});
