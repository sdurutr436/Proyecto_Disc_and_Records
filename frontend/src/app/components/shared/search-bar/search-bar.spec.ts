import { ComponentFixture, TestBed, fakeAsync, tick, discardPeriodicTasks } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { By } from '@angular/platform-browser';
import { signal } from '@angular/core';

import { SearchBar } from './search-bar';
import { AlbumStateService } from '../../../services/album-state.service';

/**
 * Tests unitarios para SearchBar
 *
 * Cobertura:
 * - Creación del componente
 * - Inputs: instant, placeholder, debounceMs, minChars, navigateOnSearch
 * - Outputs: onSearch, onSearchInstant
 * - Signals: searchTerm, isSearching
 * - Métodos: handleSearch, handleKeyPress, updateSearchTerm, clearSearch
 * - Debounce behavior
 * - Navegación a /search
 * - Integración con AlbumStateService
 */
describe('SearchBar', () => {
  let component: SearchBar;
  let fixture: ComponentFixture<SearchBar>;
  let routerSpy: jasmine.SpyObj<Router>;
  let albumStateSpy: jasmine.SpyObj<AlbumStateService>;

  beforeEach(async () => {
    routerSpy = jasmine.createSpyObj('Router', ['navigate']);
    albumStateSpy = jasmine.createSpyObj('AlbumStateService', ['search', 'clearFilters']);

    await TestBed.configureTestingModule({
      imports: [SearchBar, FormsModule],
      providers: [
        { provide: Router, useValue: routerSpy },
        { provide: AlbumStateService, useValue: albumStateSpy }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(SearchBar);
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

    it('debería tener valores por defecto correctos', () => {
      expect(component.instant).toBe(false);
      expect(component.placeholder).toBe('Busca artistas, álbumes...');
      expect(component.debounceMs).toBe(300);
      expect(component.minChars).toBe(0);
      expect(component.navigateOnSearch).toBe(true);
    });

    it('debería inicializar signals con valores correctos', () => {
      expect(component.searchTerm()).toBe('');
      expect(component.isSearching()).toBe(false);
    });
  });

  // ===========================================================================
  // INPUTS
  // ===========================================================================

  describe('Inputs', () => {
    it('debería aceptar placeholder personalizado', () => {
      // Crear fixture fresco con el placeholder antes del primer detectChanges
      const freshFixture = TestBed.createComponent(SearchBar);
      const freshComponent = freshFixture.componentInstance;
      freshComponent.placeholder = 'Buscar canciones...';
      freshFixture.detectChanges();

      const inputEl = freshFixture.debugElement.query(By.css('.search-bar__input'));
      expect(inputEl.nativeElement.placeholder).toBe('Buscar canciones...');
    });

    it('debería aceptar instant=true', () => {
      component.instant = true;
      expect(component.instant).toBe(true);
    });

    it('debería aceptar debounceMs personalizado', () => {
      component.debounceMs = 500;
      expect(component.debounceMs).toBe(500);
    });

    it('debería aceptar minChars personalizado', () => {
      component.minChars = 3;
      expect(component.minChars).toBe(3);
    });

    it('debería aceptar navigateOnSearch=false', () => {
      component.navigateOnSearch = false;
      expect(component.navigateOnSearch).toBe(false);
    });
  });

  // ===========================================================================
  // SIGNALS
  // ===========================================================================

  describe('Signals', () => {
    it('debería actualizar searchTerm signal', () => {
      component.updateSearchTerm('test query');
      expect(component.searchTerm()).toBe('test query');
    });

    it('debería actualizar isSearching durante búsqueda', fakeAsync(() => {
      component.updateSearchTerm('test');
      component.handleSearch();

      expect(component.isSearching()).toBe(true);

      tick(500);

      expect(component.isSearching()).toBe(false);
    }));
  });

  // ===========================================================================
  // MÉTODO updateSearchTerm
  // ===========================================================================

  describe('updateSearchTerm', () => {
    it('debería actualizar el signal searchTerm', () => {
      component.updateSearchTerm('Pink Floyd');
      expect(component.searchTerm()).toBe('Pink Floyd');
    });

    it('debería aceptar cadena vacía', () => {
      component.updateSearchTerm('algo');
      component.updateSearchTerm('');
      expect(component.searchTerm()).toBe('');
    });
  });

  // ===========================================================================
  // MÉTODO handleSearch
  // ===========================================================================

  describe('handleSearch', () => {
    it('debería emitir onSearch con el término', fakeAsync(() => {
      const searchSpy = spyOn(component.onSearch, 'emit');
      component.updateSearchTerm('The Beatles');

      component.handleSearch();

      expect(searchSpy).toHaveBeenCalledWith('The Beatles');
      tick(500);
    }));

    it('debería NO emitir si el término está vacío', () => {
      const searchSpy = spyOn(component.onSearch, 'emit');
      component.updateSearchTerm('   ');

      component.handleSearch();

      expect(searchSpy).not.toHaveBeenCalled();
    });

    it('debería llamar a albumState.search', fakeAsync(() => {
      component.updateSearchTerm('Queen');
      component.handleSearch();

      expect(albumStateSpy.search).toHaveBeenCalledWith('Queen');
      tick(500);
    }));

    it('debería navegar a /search cuando navigateOnSearch=true', fakeAsync(() => {
      component.navigateOnSearch = true;
      component.updateSearchTerm('AC/DC');

      component.handleSearch();

      expect(routerSpy.navigate).toHaveBeenCalledWith(['/search'], { queryParams: { q: 'AC/DC' } });
      tick(500);
    }));

    it('debería NO navegar cuando navigateOnSearch=false', fakeAsync(() => {
      component.navigateOnSearch = false;
      component.updateSearchTerm('Metallica');

      component.handleSearch();

      expect(routerSpy.navigate).not.toHaveBeenCalled();
      tick(500);
    }));

    it('debería establecer isSearching=true durante la búsqueda', fakeAsync(() => {
      component.updateSearchTerm('Led Zeppelin');
      component.handleSearch();

      expect(component.isSearching()).toBe(true);

      tick(500);

      expect(component.isSearching()).toBe(false);
    }));

    it('debería hacer trim del término antes de buscar', fakeAsync(() => {
      const searchSpy = spyOn(component.onSearch, 'emit');
      component.updateSearchTerm('  Nirvana  ');

      component.handleSearch();

      expect(searchSpy).toHaveBeenCalledWith('Nirvana');
      tick(500);
    }));
  });

  // ===========================================================================
  // MÉTODO handleKeyPress
  // ===========================================================================

  describe('handleKeyPress', () => {
    it('debería llamar handleSearch cuando se presiona Enter', fakeAsync(() => {
      const handleSearchSpy = spyOn(component, 'handleSearch');
      const event = new KeyboardEvent('keypress', { key: 'Enter' });

      component.handleKeyPress(event);

      expect(handleSearchSpy).toHaveBeenCalled();
    }));

    it('debería NO llamar handleSearch con otras teclas', () => {
      const handleSearchSpy = spyOn(component, 'handleSearch');
      const event = new KeyboardEvent('keypress', { key: 'a' });

      component.handleKeyPress(event);

      expect(handleSearchSpy).not.toHaveBeenCalled();
    });

    it('debería NO llamar handleSearch con tecla Escape', () => {
      const handleSearchSpy = spyOn(component, 'handleSearch');
      const event = new KeyboardEvent('keypress', { key: 'Escape' });

      component.handleKeyPress(event);

      expect(handleSearchSpy).not.toHaveBeenCalled();
    });
  });

  // ===========================================================================
  // MÉTODO clearSearch
  // ===========================================================================

  describe('clearSearch', () => {
    it('debería limpiar el searchTerm', () => {
      component.updateSearchTerm('algo');
      component.clearSearch();

      expect(component.searchTerm()).toBe('');
    });

    it('debería emitir onSearch con cadena vacía', () => {
      const searchSpy = spyOn(component.onSearch, 'emit');
      component.clearSearch();

      expect(searchSpy).toHaveBeenCalledWith('');
    });

    it('debería emitir onSearchInstant con cadena vacía', () => {
      const instantSpy = spyOn(component.onSearchInstant, 'emit');
      component.clearSearch();

      expect(instantSpy).toHaveBeenCalledWith('');
    });

    it('debería llamar a albumState.clearFilters', () => {
      component.clearSearch();

      expect(albumStateSpy.clearFilters).toHaveBeenCalled();
    });

    it('debería establecer isSearching=false', () => {
      component.clearSearch();

      expect(component.isSearching()).toBe(false);
    });
  });

  // ===========================================================================
  // DEBOUNCE BEHAVIOR (INSTANT MODE)
  // ===========================================================================

  describe('Debounce en modo instant', () => {
    beforeEach(() => {
      component.instant = true;
      // Reinicializar para que setupDebounce use instant=true
      component.ngOnInit();
    });

    it('debería emitir onSearchInstant después del debounce', fakeAsync(() => {
      const instantSpy = spyOn(component.onSearchInstant, 'emit');

      component.updateSearchTerm('test');

      // Antes del debounce no debe haber emitido
      expect(instantSpy).not.toHaveBeenCalled();

      tick(300); // debounceMs por defecto

      expect(instantSpy).toHaveBeenCalledWith('test');
      tick(500); // Limpiar el setTimeout interno
      discardPeriodicTasks();
    }));

    it('debería solo emitir el último valor después de múltiples cambios rápidos', fakeAsync(() => {
      const instantSpy = spyOn(component.onSearchInstant, 'emit');

      component.updateSearchTerm('a');
      tick(100);
      component.updateSearchTerm('ab');
      tick(100);
      component.updateSearchTerm('abc');
      tick(300);

      // El último valor emitido debe ser 'abc'
      expect(instantSpy).toHaveBeenCalledWith('abc');
      tick(500);
      discardPeriodicTasks();
    }));

    it('debería emitir cadena vacía cuando se borra todo', fakeAsync(() => {
      const instantSpy = spyOn(component.onSearchInstant, 'emit');

      component.updateSearchTerm('test');
      tick(300);
      instantSpy.calls.reset();

      component.updateSearchTerm('');
      tick(300);

      // El filter() bloquea strings vacíos pero emite '' para resetear
      expect(instantSpy).toHaveBeenCalledWith('');
      discardPeriodicTasks();
    }));

    it('debería llamar albumState.search en modo instant', fakeAsync(() => {
      component.updateSearchTerm('Pink Floyd');
      tick(300);

      expect(albumStateSpy.search).toHaveBeenCalledWith('Pink Floyd');
      tick(500);
      discardPeriodicTasks();
    }));
  });

  // ===========================================================================
  // TEMPLATE BINDINGS
  // ===========================================================================

  describe('Template bindings', () => {
    it('debería mostrar el valor del input', () => {
      component.updateSearchTerm('Depeche Mode');
      fixture.detectChanges();

      const inputEl = fixture.debugElement.query(By.css('.search-bar__input'));
      expect(inputEl.nativeElement.value).toBe('Depeche Mode');
    });

    it('debería mostrar botón de limpiar cuando hay texto y no está buscando', () => {
      component.updateSearchTerm('texto');
      fixture.detectChanges();

      const clearBtn = fixture.debugElement.query(By.css('.search-bar__clear'));
      expect(clearBtn).toBeTruthy();
    });

    it('debería ocultar botón de limpiar cuando no hay texto', () => {
      component.updateSearchTerm('');
      fixture.detectChanges();

      const clearBtn = fixture.debugElement.query(By.css('.search-bar__clear'));
      expect(clearBtn).toBeNull();
    });

    it('debería deshabilitar botón de búsqueda cuando no hay texto', () => {
      component.updateSearchTerm('');
      fixture.detectChanges();

      const searchBtn = fixture.debugElement.query(By.css('.search-bar__button'));
      expect(searchBtn.nativeElement.disabled).toBe(true);
    });

    it('debería habilitar botón de búsqueda cuando hay texto', () => {
      component.updateSearchTerm('texto válido');
      fixture.detectChanges();

      const searchBtn = fixture.debugElement.query(By.css('.search-bar__button'));
      expect(searchBtn.nativeElement.disabled).toBe(false);
    });

    it('debería deshabilitar botón cuando está buscando', fakeAsync(() => {
      component.updateSearchTerm('algo');
      fixture.detectChanges();
      component.handleSearch();
      fixture.detectChanges();

      const searchBtn = fixture.debugElement.query(By.css('.search-bar__button'));
      expect(searchBtn.nativeElement.disabled).toBe(true);

      tick(500);
    }));
  });

  // ===========================================================================
  // SPINNER DE CARGA
  // ===========================================================================

  describe('Spinner de carga', () => {
    it('debería mostrar spinner cuando isSearching=true', fakeAsync(() => {
      component.updateSearchTerm('test');
      component.handleSearch();
      fixture.detectChanges();

      const spinner = fixture.debugElement.query(By.css('.search-bar__loading'));
      expect(spinner).toBeTruthy();

      tick(500);
    }));

    it('debería ocultar spinner cuando isSearching=false', () => {
      fixture.detectChanges();

      const spinner = fixture.debugElement.query(By.css('.search-bar__loading'));
      expect(spinner).toBeNull();
    });

    it('debería ocultar botón clear cuando está buscando', fakeAsync(() => {
      component.updateSearchTerm('test');
      fixture.detectChanges();
      component.handleSearch();
      fixture.detectChanges();

      const clearBtn = fixture.debugElement.query(By.css('.search-bar__clear'));
      expect(clearBtn).toBeNull();

      tick(500);
    }));
  });

  // ===========================================================================
  // ACCESIBILIDAD
  // ===========================================================================

  describe('Accesibilidad', () => {
    it('debería tener aria-label en el input', () => {
      const inputEl = fixture.debugElement.query(By.css('.search-bar__input'));
      expect(inputEl.nativeElement.getAttribute('aria-label')).toBe('Buscar en la colección');
    });

    it('debería tener aria-label en botón de limpiar', () => {
      component.updateSearchTerm('algo');
      fixture.detectChanges();

      const clearBtn = fixture.debugElement.query(By.css('.search-bar__clear'));
      expect(clearBtn.nativeElement.getAttribute('aria-label')).toBe('Limpiar búsqueda');
    });

    it('debería tener aria-label en botón de buscar', () => {
      const searchBtn = fixture.debugElement.query(By.css('.search-bar__button'));
      expect(searchBtn.nativeElement.getAttribute('aria-label')).toBe('Buscar');
    });

    it('debería establecer aria-busy durante búsqueda', fakeAsync(() => {
      component.updateSearchTerm('test');
      component.handleSearch();
      fixture.detectChanges();

      const inputEl = fixture.debugElement.query(By.css('.search-bar__input'));
      expect(inputEl.nativeElement.getAttribute('aria-busy')).toBe('true');

      tick(500);
    }));
  });

  // ===========================================================================
  // INTERACCIONES DE USUARIO
  // ===========================================================================

  describe('Interacciones de usuario', () => {
    it('debería buscar al hacer click en botón de búsqueda', fakeAsync(() => {
      const searchSpy = spyOn(component.onSearch, 'emit');
      component.updateSearchTerm('Daft Punk');
      fixture.detectChanges();

      const searchBtn = fixture.debugElement.query(By.css('.search-bar__button'));
      searchBtn.nativeElement.click();

      expect(searchSpy).toHaveBeenCalledWith('Daft Punk');
      tick(500);
    }));

    it('debería limpiar al hacer click en botón clear', () => {
      component.updateSearchTerm('texto para borrar');
      fixture.detectChanges();

      const clearBtn = fixture.debugElement.query(By.css('.search-bar__clear'));
      clearBtn.nativeElement.click();

      expect(component.searchTerm()).toBe('');
    });

    it('debería actualizar término al escribir en input', () => {
      const inputEl = fixture.debugElement.query(By.css('.search-bar__input'));
      inputEl.nativeElement.value = 'Nuevo texto';
      inputEl.nativeElement.dispatchEvent(new Event('input'));

      expect(component.searchTerm()).toBe('Nuevo texto');
    });
  });

  // ===========================================================================
  // CICLO DE VIDA
  // ===========================================================================

  describe('Ciclo de vida', () => {
    it('debería limpiar suscripciones en ngOnDestroy', () => {
      // No debería lanzar errores
      expect(() => component.ngOnDestroy()).not.toThrow();
    });

    it('debería completar destroy$ subject en ngOnDestroy', fakeAsync(() => {
      // Simular que hay búsquedas pendientes
      component.instant = true;
      component.ngOnInit();
      component.updateSearchTerm('test');

      // Destruir antes de que complete el debounce
      component.ngOnDestroy();

      // Verificar que el componente no emite después del destroy
      const instantSpy = spyOn(component.onSearchInstant, 'emit');
      tick(500);

      // El spy no debería haber sido llamado porque el destroy completó el subject
      expect(instantSpy).not.toHaveBeenCalled();
      discardPeriodicTasks();
    }));
  });
});
