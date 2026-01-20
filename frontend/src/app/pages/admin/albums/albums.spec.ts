import { ComponentFixture, TestBed } from '@angular/core/testing';
import AdminAlbumsComponent from './albums';

interface Album {
  id: string;
  title: string;
  artist: string;
  year: number;
  genre: string;
}

describe('AdminAlbumsComponent', () => {
  let component: AdminAlbumsComponent;
  let fixture: ComponentFixture<AdminAlbumsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AdminAlbumsComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(AdminAlbumsComponent);
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
    it('should have empty albums array initially', () => {
      expect(component.albums()).toEqual([]);
    });
  });

  // =========================================================================
  // Album Actions
  // =========================================================================
  describe('Album Actions', () => {
    it('should call createAlbum without errors', () => {
      const consoleSpy = spyOn(console, 'log');
      component.createAlbum();
      expect(consoleSpy).toHaveBeenCalledWith('Crear álbum');
    });

    it('should call editAlbum without errors', () => {
      const consoleSpy = spyOn(console, 'log');
      component.editAlbum('album-123');
      expect(consoleSpy).toHaveBeenCalledWith('Editar álbum:', 'album-123');
    });

    it('should call deleteAlbum without errors', () => {
      const consoleSpy = spyOn(console, 'log');
      component.deleteAlbum('album-456');
      expect(consoleSpy).toHaveBeenCalledWith('Eliminar álbum:', 'album-456');
    });

    it('should handle editAlbum with different ids', () => {
      const consoleSpy = spyOn(console, 'log');
      component.editAlbum('1');
      component.editAlbum('2');
      component.editAlbum('3');
      expect(consoleSpy).toHaveBeenCalledTimes(3);
    });
  });

  // =========================================================================
  // Albums Signal
  // =========================================================================
  describe('Albums Signal', () => {
    it('should allow setting albums', () => {
      const mockAlbums: Album[] = [
        { id: '1', title: 'Album 1', artist: 'Artist 1', year: 2020, genre: 'Rock' },
        { id: '2', title: 'Album 2', artist: 'Artist 2', year: 2021, genre: 'Pop' }
      ];
      component.albums.set(mockAlbums);
      expect(component.albums().length).toBe(2);
    });

    it('should allow updating albums', () => {
      const mockAlbum: Album = { id: '1', title: 'Test Album', artist: 'Test Artist', year: 2022, genre: 'Jazz' };
      component.albums.set([mockAlbum]);
      component.albums.update(albums => [...albums, { id: '2', title: 'Album 2', artist: 'Artist 2', year: 2023, genre: 'Blues' }]);
      expect(component.albums().length).toBe(2);
    });

    it('should allow filtering albums by genre', () => {
      const mockAlbums: Album[] = [
        { id: '1', title: 'Rock Album', artist: 'Artist 1', year: 2020, genre: 'Rock' },
        { id: '2', title: 'Pop Album', artist: 'Artist 2', year: 2021, genre: 'Pop' },
        { id: '3', title: 'Rock Album 2', artist: 'Artist 3', year: 2022, genre: 'Rock' }
      ];
      component.albums.set(mockAlbums);
      const rockAlbums = component.albums().filter(a => a.genre === 'Rock');
      expect(rockAlbums.length).toBe(2);
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
