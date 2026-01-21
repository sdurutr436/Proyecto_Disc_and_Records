import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Component } from '@angular/core';
import { By } from '@angular/platform-browser';

import { Badge, BadgeVariant, BadgeSize } from './badge';

/**
 * Componente host para probar proyección de contenido
 */
@Component({
  standalone: true,
  imports: [Badge],
  template: `<app-badge>Projected Content</app-badge>`,
})
class TestHostComponent {}

/**
 * Componente host para probar combinación de text + ng-content
 */
@Component({
  standalone: true,
  imports: [Badge],
  template: `<app-badge [text]="'Prefix: '">Suffix</app-badge>`,
})
class TestHostCombinedComponent {}

describe('Badge', () => {
  let component: Badge;
  let fixture: ComponentFixture<Badge>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Badge],
    }).compileComponents();

    fixture = TestBed.createComponent(Badge);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  // ===========================================================================
  // CREACIÓN DEL COMPONENTE
  // ===========================================================================

  describe('Creación', () => {
    it('debería crear el componente', () => {
      expect(component).toBeTruthy();
    });

    it('debería renderizar un elemento span', () => {
      const spanEl = fixture.debugElement.query(By.css('span.badge'));
      expect(spanEl).toBeTruthy();
    });

    it('debería renderizar contenido proyectado', () => {
      const hostFixture = TestBed.createComponent(TestHostComponent);
      hostFixture.detectChanges();
      const badgeEl = hostFixture.debugElement.query(By.css('.badge'));
      expect(badgeEl.nativeElement.textContent).toContain('Projected Content');
    });

    it('debería renderizar text input junto con contenido proyectado', () => {
      const hostFixture = TestBed.createComponent(TestHostCombinedComponent);
      hostFixture.detectChanges();
      const badgeEl = hostFixture.debugElement.query(By.css('.badge'));
      expect(badgeEl.nativeElement.textContent).toContain('Prefix:');
      expect(badgeEl.nativeElement.textContent).toContain('Suffix');
    });
  });

  // ===========================================================================
  // VALORES POR DEFECTO DE @INPUTS
  // ===========================================================================

  describe('Valores por defecto', () => {
    it('variant debería ser "primary" por defecto', () => {
      expect(component.variant).toBe('primary');
    });

    it('size debería ser "md" por defecto', () => {
      expect(component.size).toBe('md');
    });

    it('text debería ser string vacío por defecto', () => {
      expect(component.text).toBe('');
    });

    it('removable debería ser false por defecto', () => {
      expect(component.removable).toBe(false);
    });
  });

  // ===========================================================================
  // VARIANTES DE ESTILO
  // ===========================================================================

  describe('Variantes de estilo', () => {
    const variants: BadgeVariant[] = ['primary', 'secondary', 'success', 'warning', 'error', 'info'];

    variants.forEach((variant) => {
      it(`debería aplicar clase badge--${variant} para variant="${variant}"`, () => {
        component.variant = variant;
        fixture.detectChanges();
        const badgeEl = fixture.debugElement.query(By.css('.badge'));
        expect(badgeEl.nativeElement.classList).toContain(`badge--${variant}`);
      });
    });

    it('debería tener solo una clase de variante activa', () => {
      component.variant = 'success';
      fixture.detectChanges();
      const badgeEl = fixture.debugElement.query(By.css('.badge'));
      const classList = badgeEl.nativeElement.classList;

      expect(classList).toContain('badge--success');
      expect(classList).not.toContain('badge--primary');
      expect(classList).not.toContain('badge--secondary');
      expect(classList).not.toContain('badge--warning');
      expect(classList).not.toContain('badge--error');
      expect(classList).not.toContain('badge--info');
    });
  });

  // ===========================================================================
  // TAMAÑOS
  // ===========================================================================

  describe('Tamaños', () => {
    const sizes: BadgeSize[] = ['sm', 'md', 'lg'];

    sizes.forEach((size) => {
      it(`debería aplicar clase badge--${size} para size="${size}"`, () => {
        component.size = size;
        fixture.detectChanges();
        const badgeEl = fixture.debugElement.query(By.css('.badge'));
        expect(badgeEl.nativeElement.classList).toContain(`badge--${size}`);
      });
    });

    it('debería tener solo una clase de tamaño activa', () => {
      component.size = 'lg';
      fixture.detectChanges();
      const badgeEl = fixture.debugElement.query(By.css('.badge'));
      const classList = badgeEl.nativeElement.classList;

      expect(classList).toContain('badge--lg');
      expect(classList).not.toContain('badge--sm');
      expect(classList).not.toContain('badge--md');
    });
  });

  // ===========================================================================
  // PROPIEDAD TEXT
  // ===========================================================================

  describe('Propiedad text', () => {
    it('debería mostrar el texto proporcionado', () => {
      component.text = 'New';
      fixture.detectChanges();
      const badgeEl = fixture.debugElement.query(By.css('.badge'));
      expect(badgeEl.nativeElement.textContent).toContain('New');
    });

    it('debería manejar texto vacío', () => {
      component.text = '';
      fixture.detectChanges();
      const badgeEl = fixture.debugElement.query(By.css('.badge'));
      expect(badgeEl).toBeTruthy();
    });

    it('debería manejar texto largo', () => {
      component.text = 'Este es un texto muy largo para un badge';
      fixture.detectChanges();
      const badgeEl = fixture.debugElement.query(By.css('.badge'));
      expect(badgeEl.nativeElement.textContent).toContain('Este es un texto muy largo para un badge');
    });

    it('debería manejar caracteres especiales', () => {
      component.text = '¡Nuevo! 🎉';
      fixture.detectChanges();
      const badgeEl = fixture.debugElement.query(By.css('.badge'));
      expect(badgeEl.nativeElement.textContent).toContain('¡Nuevo! 🎉');
    });

    it('debería manejar números como string', () => {
      component.text = '42';
      fixture.detectChanges();
      const badgeEl = fixture.debugElement.query(By.css('.badge'));
      expect(badgeEl.nativeElement.textContent).toContain('42');
    });
  });

  // ===========================================================================
  // PROPIEDAD REMOVABLE
  // ===========================================================================

  describe('Propiedad removable', () => {
    it('debería aceptar valor true', () => {
      component.removable = true;
      fixture.detectChanges();
      expect(component.removable).toBe(true);
    });

    it('debería aceptar valor false', () => {
      component.removable = false;
      fixture.detectChanges();
      expect(component.removable).toBe(false);
    });

    // Nota: El template actual no usa 'removable', pero el input está definido.
    // Este test documenta que el input existe y es funcional.
    it('debería mantener el estado removable para uso futuro', () => {
      component.removable = true;
      fixture.detectChanges();
      // El componente debería funcionar sin errores aunque removable no se use en template
      expect(component).toBeTruthy();
    });
  });

  // ===========================================================================
  // COMBINACIONES DE ESTADOS
  // ===========================================================================

  describe('Combinaciones de estados', () => {
    it('debería aplicar múltiples clases correctamente', () => {
      component.variant = 'error';
      component.size = 'lg';
      fixture.detectChanges();

      const badgeEl = fixture.debugElement.query(By.css('.badge'));
      const classList = badgeEl.nativeElement.classList;

      expect(classList).toContain('badge');
      expect(classList).toContain('badge--error');
      expect(classList).toContain('badge--lg');
    });

    it('debería funcionar con todos los inputs establecidos', () => {
      component.variant = 'warning';
      component.size = 'sm';
      component.text = 'Alert';
      component.removable = true;
      fixture.detectChanges();

      const badgeEl = fixture.debugElement.query(By.css('.badge'));
      expect(badgeEl.nativeElement.textContent).toContain('Alert');
      expect(badgeEl.nativeElement.classList).toContain('badge--warning');
      expect(badgeEl.nativeElement.classList).toContain('badge--sm');
    });
  });

  // ===========================================================================
  // TIPOS EXPORTADOS
  // ===========================================================================

  describe('Tipos exportados', () => {
    it('BadgeVariant debería aceptar todos los valores válidos', () => {
      const variants: BadgeVariant[] = ['primary', 'secondary', 'success', 'warning', 'error', 'info'];
      variants.forEach((v) => {
        component.variant = v;
        expect(component.variant).toBe(v);
      });
    });

    it('BadgeSize debería aceptar todos los valores válidos', () => {
      const sizes: BadgeSize[] = ['sm', 'md', 'lg'];
      sizes.forEach((s) => {
        component.size = s;
        expect(component.size).toBe(s);
      });
    });
  });
});
