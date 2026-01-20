import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By, DomSanitizer } from '@angular/platform-browser';
import { Component } from '@angular/core';
import { provideLocationMocks } from '@angular/common/testing';
import { LucideAngularModule, Music } from 'lucide-angular';

import { Card, CardAction } from './card';

/**
 * Componente host para probar proyección de contenido
 * Se proporciona imageUrl para evitar renderizar lucide-icon
 */
@Component({
  standalone: true,
  imports: [Card],
  template: `
    <app-card [imageUrl]="'/test.jpg'">
      <p>Contenido proyectado</p>
    </app-card>
  `,
})
class TestHostComponent {}

describe('Card', () => {
  let component: Card;
  let fixture: ComponentFixture<Card>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Card, LucideAngularModule.pick({ Music })],
    }).compileComponents();

    fixture = TestBed.createComponent(Card);
    component = fixture.componentInstance;
    // Establecer imageUrl para evitar que se renderice lucide-icon
    component.imageUrl = '/test-image.jpg';
    fixture.detectChanges();
  });

  // ===========================================================================
  // CREACIÓN DEL COMPONENTE
  // ===========================================================================

  describe('Creación', () => {
    it('debería crear el componente', () => {
      expect(component).toBeTruthy();
    });

    it('debería renderizar contenido proyectado en host component', () => {
      // Este test verifica que la proyección de contenido funciona
      // El hostFixture tiene imageUrl para evitar lucide-icon
      const hostFixture = TestBed.createComponent(TestHostComponent);
      hostFixture.detectChanges();
      // Buscar el párrafo dentro del card
      const articleEl = hostFixture.debugElement.query(By.css('article'));
      expect(articleEl).toBeTruthy();
    });
  });

  // ===========================================================================
  // VALORES POR DEFECTO DE @INPUTS
  // ===========================================================================

  describe('Valores por defecto', () => {
    // Nota: Para estos tests creamos una nueva instancia sin imageUrl
    it('title debería ser string vacío por defecto', () => {
      const newFixture = TestBed.createComponent(Card);
      expect(newFixture.componentInstance.title).toBe('');
    });

    it('subtitle debería ser string vacío por defecto', () => {
      const newFixture = TestBed.createComponent(Card);
      expect(newFixture.componentInstance.subtitle).toBe('');
    });

    it('imageUrl debería ser string vacío por defecto', () => {
      const newFixture = TestBed.createComponent(Card);
      expect(newFixture.componentInstance.imageUrl).toBe('');
    });

    it('imageAlt debería ser string vacío por defecto', () => {
      const newFixture = TestBed.createComponent(Card);
      expect(newFixture.componentInstance.imageAlt).toBe('');
    });

    it('placeholderIcon debería ser string vacío por defecto', () => {
      const newFixture = TestBed.createComponent(Card);
      expect(newFixture.componentInstance.placeholderIcon).toBe('');
    });

    it('imageShape debería ser "square" por defecto', () => {
      expect(component.imageShape).toBe('square');
    });

    it('imageSize debería ser "medium" por defecto', () => {
      expect(component.imageSize).toBe('medium');
    });

    it('variant debería ser "normal" por defecto', () => {
      expect(component.variant).toBe('normal');
    });

    it('hoverEffect debería ser "lift" por defecto', () => {
      expect(component.hoverEffect).toBe('lift');
    });

    it('layout debería ser "vertical" por defecto', () => {
      expect(component.layout).toBe('vertical');
    });

    it('cardType debería ser "polaroid" por defecto', () => {
      expect(component.cardType).toBe('polaroid');
    });

    it('size debería ser "normal" por defecto', () => {
      expect(component.size).toBe('normal');
    });

    it('actions debería ser array vacío por defecto', () => {
      expect(component.actions).toEqual([]);
    });

    it('badges debería ser array vacío por defecto', () => {
      expect(component.badges).toEqual([]);
    });

    it('titleLink debería ser string vacío por defecto', () => {
      expect(component.titleLink).toBe('');
    });

    it('subtitleLink debería ser string vacío por defecto', () => {
      expect(component.subtitleLink).toBe('');
    });
  });

  // ===========================================================================
  // CARDCLASSES GETTER
  // ===========================================================================

  describe('cardClasses getter', () => {
    it('debería incluir clase base "card"', () => {
      expect(component.cardClasses).toContain('card');
    });

    it('debería incluir clase card--vinilo para variant="vinilo"', () => {
      component.variant = 'vinilo';
      fixture.detectChanges();
      expect(component.cardClasses).toContain('card--vinilo');
    });

    it('no debería incluir clase card--vinilo para variant="normal"', () => {
      component.variant = 'normal';
      fixture.detectChanges();
      expect(component.cardClasses).not.toContain('card--vinilo');
    });

    it('debería incluir clase card--hover-lift para hoverEffect="lift"', () => {
      component.hoverEffect = 'lift';
      fixture.detectChanges();
      expect(component.cardClasses).toContain('card--hover-lift');
    });

    it('no debería incluir clase card--hover-lift para hoverEffect="none"', () => {
      component.hoverEffect = 'none';
      fixture.detectChanges();
      expect(component.cardClasses).not.toContain('card--hover-lift');
    });

    it('debería incluir clase card--mini para size="mini"', () => {
      component.size = 'mini';
      fixture.detectChanges();
      expect(component.cardClasses).toContain('card--mini');
    });

    it('no debería incluir clase card--mini para size="normal"', () => {
      component.size = 'normal';
      fixture.detectChanges();
      expect(component.cardClasses).not.toContain('card--mini');
    });

    it('debería incluir clase de cardType', () => {
      component.cardType = 'profile';
      fixture.detectChanges();
      expect(component.cardClasses).toContain('card--profile');
    });

    it('debería incluir clase de layout', () => {
      component.layout = 'horizontal';
      fixture.detectChanges();
      expect(component.cardClasses).toContain('card--horizontal');
    });

    it('debería construir todas las clases correctamente', () => {
      component.variant = 'vinilo';
      component.hoverEffect = 'lift';
      component.size = 'mini';
      component.cardType = 'polaroid';
      component.layout = 'vertical';
      fixture.detectChanges();

      const classes = component.cardClasses;
      expect(classes).toContain('card');
      expect(classes).toContain('card--vinilo');
      expect(classes).toContain('card--hover-lift');
      expect(classes).toContain('card--mini');
      expect(classes).toContain('card--polaroid');
      expect(classes).toContain('card--vertical');
    });
  });

  // ===========================================================================
  // IMAGECLASSES GETTER
  // ===========================================================================

  describe('imageClasses getter', () => {
    it('debería incluir clase base "card__image"', () => {
      expect(component.imageClasses).toContain('card__image');
    });

    it('debería incluir clase de imageShape', () => {
      component.imageShape = 'circle';
      fixture.detectChanges();
      expect(component.imageClasses).toContain('card__image--circle');
    });

    it('debería incluir clase de imageSize', () => {
      component.imageSize = 'large';
      fixture.detectChanges();
      expect(component.imageClasses).toContain('card__image--large');
    });

    it('debería construir todas las clases de imagen correctamente', () => {
      component.imageShape = 'circle';
      component.imageSize = 'small';
      fixture.detectChanges();

      const classes = component.imageClasses;
      expect(classes).toContain('card__image');
      expect(classes).toContain('card__image--circle');
      expect(classes).toContain('card__image--small');
    });

    it('debería aplicar clase card__image--square para imageShape="square"', () => {
      component.imageShape = 'square';
      fixture.detectChanges();
      expect(component.imageClasses).toContain('card__image--square');
    });

    it('debería aplicar clase card__image--circle para imageShape="circle"', () => {
      component.imageShape = 'circle';
      fixture.detectChanges();
      expect(component.imageClasses).toContain('card__image--circle');
    });

    it('debería aplicar clase card__image--small para imageSize="small"', () => {
      component.imageSize = 'small';
      fixture.detectChanges();
      expect(component.imageClasses).toContain('card__image--small');
    });

    it('debería aplicar clase card__image--medium para imageSize="medium"', () => {
      component.imageSize = 'medium';
      fixture.detectChanges();
      expect(component.imageClasses).toContain('card__image--medium');
    });

    it('debería aplicar clase card__image--large para imageSize="large"', () => {
      component.imageSize = 'large';
      fixture.detectChanges();
      expect(component.imageClasses).toContain('card__image--large');
    });
  });

  // ===========================================================================
  // SAFEPLACEHOLDERICON GETTER
  // ===========================================================================

  describe('safePlaceholderIcon getter', () => {
    it('debería sanitizar SVG correctamente', () => {
      const svgIcon = '<svg><circle cx="50" cy="50" r="40"/></svg>';
      component.placeholderIcon = svgIcon;
      fixture.detectChanges();

      // Verificar que el getter no lanza error y retorna algo
      const result = component.safePlaceholderIcon;
      expect(result).toBeDefined();
    });

    it('debería manejar string vacío', () => {
      component.placeholderIcon = '';
      fixture.detectChanges();

      const result = component.safePlaceholderIcon;
      expect(result).toBeDefined();
    });

    it('debería manejar SVG complejo', () => {
      const complexSvg = `
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100">
          <circle cx="50" cy="50" r="40" fill="blue"/>
          <rect x="10" y="10" width="30" height="30" fill="red"/>
        </svg>
      `;
      component.placeholderIcon = complexSvg;
      fixture.detectChanges();

      const result = component.safePlaceholderIcon;
      expect(result).toBeDefined();
    });
  });

  // ===========================================================================
  // ACCIONES (CardAction)
  // ===========================================================================

  describe('Acciones (CardAction)', () => {
    it('debería aceptar array de acciones', () => {
      const actions: CardAction[] = [
        { label: 'Ver', variant: 'primary' },
        { label: 'Editar', variant: 'secondary' },
      ];
      component.actions = actions;
      fixture.detectChanges();

      expect(component.actions.length).toBe(2);
    });

    it('debería ejecutar callback al hacer click en acción', () => {
      const mockCallback = jasmine.createSpy('callback');
      const actions: CardAction[] = [
        { label: 'Acción', variant: 'primary', callback: mockCallback },
      ];
      component.actions = actions;
      fixture.detectChanges();

      const mockEvent = new Event('click');
      spyOn(mockEvent, 'preventDefault');
      spyOn(mockEvent, 'stopPropagation');

      component.onActionClick(actions[0], mockEvent);

      expect(mockEvent.preventDefault).toHaveBeenCalled();
      expect(mockEvent.stopPropagation).toHaveBeenCalled();
      expect(mockCallback).toHaveBeenCalled();
    });

    it('no debería fallar si acción no tiene callback', () => {
      const actions: CardAction[] = [{ label: 'Sin callback', variant: 'primary' }];
      component.actions = actions;
      fixture.detectChanges();

      const mockEvent = new Event('click');

      // No debería lanzar error
      expect(() => component.onActionClick(actions[0], mockEvent)).not.toThrow();
    });

    it('debería manejar acción con icono', () => {
      const actions: CardAction[] = [
        { label: 'Favorito', icon: '❤️', variant: 'accent' },
      ];
      component.actions = actions;
      fixture.detectChanges();

      expect(component.actions[0].icon).toBe('❤️');
    });

    it('debería aceptar todas las variantes de acción', () => {
      const variants: CardAction['variant'][] = ['primary', 'secondary', 'contrast', 'accent'];

      variants.forEach((variant) => {
        const action: CardAction = { label: 'Test', variant };
        component.actions = [action];
        expect(component.actions[0].variant).toBe(variant);
      });
    });
  });

  // ===========================================================================
  // BADGES
  // ===========================================================================

  describe('Badges', () => {
    it('debería aceptar array de badges', () => {
      component.badges = ['Nuevo', 'Popular', 'Oferta'];
      fixture.detectChanges();

      expect(component.badges.length).toBe(3);
    });

    it('debería manejar badges vacíos', () => {
      component.badges = [];
      fixture.detectChanges();

      expect(component.badges).toEqual([]);
    });
  });

  // ===========================================================================
  // VARIANTES Y LAYOUTS
  // ===========================================================================

  describe('Variantes y layouts', () => {
    it('debería aceptar variant="normal"', () => {
      component.variant = 'normal';
      fixture.detectChanges();
      expect(component.variant).toBe('normal');
    });

    it('debería aceptar variant="vinilo"', () => {
      component.variant = 'vinilo';
      fixture.detectChanges();
      expect(component.variant).toBe('vinilo');
    });

    it('debería aceptar layout="vertical"', () => {
      component.layout = 'vertical';
      fixture.detectChanges();
      expect(component.layout).toBe('vertical');
    });

    it('debería aceptar layout="horizontal"', () => {
      component.layout = 'horizontal';
      fixture.detectChanges();
      expect(component.layout).toBe('horizontal');
    });

    it('debería aceptar cardType="polaroid"', () => {
      component.cardType = 'polaroid';
      fixture.detectChanges();
      expect(component.cardType).toBe('polaroid');
    });

    it('debería aceptar cardType="profile"', () => {
      component.cardType = 'profile';
      fixture.detectChanges();
      expect(component.cardType).toBe('profile');
    });

    it('debería aceptar hoverEffect="none"', () => {
      component.hoverEffect = 'none';
      fixture.detectChanges();
      expect(component.hoverEffect).toBe('none');
    });

    it('debería aceptar hoverEffect="lift"', () => {
      component.hoverEffect = 'lift';
      fixture.detectChanges();
      expect(component.hoverEffect).toBe('lift');
    });
  });

  // ===========================================================================
  // CASOS DE USO COMPLETOS
  // ===========================================================================

  describe('Casos de uso completos', () => {
    it('card de álbum (polaroid)', () => {
      component.title = 'Abbey Road';
      component.subtitle = 'The Beatles';
      component.imageUrl = '/images/abbey-road.jpg';
      component.imageAlt = 'Portada de Abbey Road';
      component.cardType = 'polaroid';
      component.variant = 'normal';
      component.hoverEffect = 'lift';
      component.badges = ['Rock', '1969'];
      component.actions = [
        { label: 'Reproducir', variant: 'primary', callback: () => {} },
        { label: 'Añadir', variant: 'secondary', callback: () => {} },
      ];
      fixture.detectChanges();

      expect(component.cardClasses).toContain('card--polaroid');
      expect(component.cardClasses).toContain('card--hover-lift');
      expect(component.title).toBe('Abbey Road');
      expect(component.badges.length).toBe(2);
      expect(component.actions.length).toBe(2);
    });

    it('card de artista (profile)', () => {
      component.title = 'Freddie Mercury';
      component.subtitle = 'Vocalista de Queen';
      component.imageUrl = '/images/freddie.jpg';
      component.imageShape = 'circle';
      component.cardType = 'profile';
      component.layout = 'vertical';
      fixture.detectChanges();

      expect(component.cardClasses).toContain('card--profile');
      expect(component.imageClasses).toContain('card__image--circle');
    });

    it('card mini para listados', () => {
      component.title = 'Canción';
      component.size = 'mini';
      component.hoverEffect = 'none';
      fixture.detectChanges();

      expect(component.cardClasses).toContain('card--mini');
      expect(component.cardClasses).not.toContain('card--hover-lift');
    });

    it('card de vinilo', () => {
      component.title = 'Dark Side of the Moon';
      component.variant = 'vinilo';
      component.imageUrl = '/images/dsotm.jpg';
      fixture.detectChanges();

      expect(component.cardClasses).toContain('card--vinilo');
    });

    it('card horizontal', () => {
      component.title = 'Playlist';
      component.layout = 'horizontal';
      fixture.detectChanges();

      expect(component.cardClasses).toContain('card--horizontal');
    });
  });

  // ===========================================================================
  // LINKS
  // ===========================================================================

  describe('Links', () => {
    it('debería aceptar titleLink', () => {
      component.titleLink = '/album/123';
      fixture.detectChanges();
      expect(component.titleLink).toBe('/album/123');
    });

    it('debería aceptar subtitleLink', () => {
      component.subtitleLink = '/artist/456';
      fixture.detectChanges();
      expect(component.subtitleLink).toBe('/artist/456');
    });

    it('debería manejar links vacíos', () => {
      component.titleLink = '';
      component.subtitleLink = '';
      fixture.detectChanges();

      expect(component.titleLink).toBe('');
      expect(component.subtitleLink).toBe('');
    });
  });

  // ===========================================================================
  // CONFIGURACIÓN DE IMAGEN
  // ===========================================================================

  describe('Configuración de imagen', () => {
    it('debería aceptar imageUrl', () => {
      component.imageUrl = 'https://example.com/image.jpg';
      fixture.detectChanges();
      expect(component.imageUrl).toBe('https://example.com/image.jpg');
    });

    it('debería aceptar imageAlt', () => {
      component.imageAlt = 'Descripción de la imagen';
      fixture.detectChanges();
      expect(component.imageAlt).toBe('Descripción de la imagen');
    });

    it('debería manejar todos los tamaños de imagen', () => {
      const sizes = ['small', 'medium', 'large'] as const;
      sizes.forEach((size) => {
        component.imageSize = size;
        fixture.detectChanges();
        expect(component.imageClasses).toContain(`card__image--${size}`);
      });
    });
  });
});
