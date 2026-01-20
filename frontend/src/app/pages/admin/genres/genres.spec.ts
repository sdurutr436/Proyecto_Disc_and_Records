import { ComponentFixture, TestBed } from '@angular/core/testing';
import AdminGenresComponent from './genres';

interface Genre {
  id: string;
  name: string;
  description: string;
  albumCount: number;
}

describe('AdminGenresComponent', () => {
  let component: AdminGenresComponent;
  let fixture: ComponentFixture<AdminGenresComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AdminGenresComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(AdminGenresComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  // =========================================================================
  // Initial State
  // =========================================================================
  describe('Initial State', () => {
    it('should have empty genres array initially', () => {
      expect(component.genres()).toEqual([]);
    });
  });

  // =========================================================================
  // Genre Actions
  // =========================================================================
  describe('Genre Actions', () => {
    it('should call createGenre without errors', () => {
      const consoleSpy = spyOn(console, 'log');
      component.createGenre();
      expect(consoleSpy).toHaveBeenCalledWith('Crear género');
    });

    it('should call editGenre without errors', () => {
      const consoleSpy = spyOn(console, 'log');
      component.editGenre('genre-123');
      expect(consoleSpy).toHaveBeenCalledWith('Editar género:', 'genre-123');
    });

    it('should call deleteGenre without errors', () => {
      const consoleSpy = spyOn(console, 'log');
      component.deleteGenre('genre-456');
      expect(consoleSpy).toHaveBeenCalledWith('Eliminar género:', 'genre-456');
    });

    it('should handle editGenre with different ids', () => {
      const consoleSpy = spyOn(console, 'log');
      component.editGenre('rock');
      component.editGenre('pop');
      component.editGenre('jazz');
      expect(consoleSpy).toHaveBeenCalledTimes(3);
    });
  });

  // =========================================================================
  // Genres Signal
  // =========================================================================
  describe('Genres Signal', () => {
    it('should allow setting genres', () => {
      const mockGenres: Genre[] = [
        { id: '1', name: 'Rock', description: 'Rock music', albumCount: 150 },
        { id: '2', name: 'Pop', description: 'Pop music', albumCount: 200 }
      ];
      component.genres.set(mockGenres);
      expect(component.genres().length).toBe(2);
    });

    it('should allow updating genres', () => {
      const mockGenre: Genre = { id: '1', name: 'Jazz', description: 'Jazz music', albumCount: 80 };
      component.genres.set([mockGenre]);
      component.genres.update(genres => [...genres, { id: '2', name: 'Blues', description: 'Blues music', albumCount: 50 }]);
      expect(component.genres().length).toBe(2);
    });

    it('should calculate total album count', () => {
      const mockGenres: Genre[] = [
        { id: '1', name: 'Rock', description: 'Rock music', albumCount: 150 },
        { id: '2', name: 'Pop', description: 'Pop music', albumCount: 200 },
        { id: '3', name: 'Jazz', description: 'Jazz music', albumCount: 50 }
      ];
      component.genres.set(mockGenres);
      const totalAlbums = component.genres().reduce((sum, g) => sum + g.albumCount, 0);
      expect(totalAlbums).toBe(400);
    });

    it('should sort genres by album count', () => {
      const mockGenres: Genre[] = [
        { id: '1', name: 'Rock', description: 'Rock music', albumCount: 150 },
        { id: '2', name: 'Pop', description: 'Pop music', albumCount: 200 },
        { id: '3', name: 'Jazz', description: 'Jazz music', albumCount: 50 }
      ];
      component.genres.set(mockGenres);
      const sorted = [...component.genres()].sort((a, b) => b.albumCount - a.albumCount);
      expect(sorted[0].name).toBe('Pop');
      expect(sorted[2].name).toBe('Jazz');
    });
  });

  // =========================================================================
  // Template Integration
  // =========================================================================
  describe('Template Integration', () => {
    it('should render without errors', () => {
      expect(fixture.nativeElement).toBeTruthy();
    });
  });
});
