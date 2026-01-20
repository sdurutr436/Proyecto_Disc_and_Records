import { TestBed, fakeAsync, tick } from '@angular/core/testing';
import { MockDeezerService } from './mock-deezer.service';

describe('MockDeezerService', () => {
  let service: MockDeezerService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MockDeezerService);
  });

  describe('initial state', () => {
    it('should be created', () => {
      expect(service).toBeTruthy();
    });
  });

  describe('getChart()', () => {
    it('should return chart data', fakeAsync(() => {
      let result: any;
      service.getChart().subscribe(chart => result = chart);
      tick(300);
      expect(result).toBeTruthy();
    }));

    it('should include albums in chart', fakeAsync(() => {
      let result: any;
      service.getChart().subscribe(chart => result = chart);
      tick(300);
      expect(result.albums).toBeDefined();
    }));

    it('should include artists in chart', fakeAsync(() => {
      let result: any;
      service.getChart().subscribe(chart => result = chart);
      tick(300);
      expect(result.artists).toBeDefined();
    }));

    it('should include tracks in chart', fakeAsync(() => {
      let result: any;
      service.getChart().subscribe(chart => result = chart);
      tick(300);
      expect(result.tracks).toBeDefined();
    }));
  });

  describe('getChartAlbums()', () => {
    it('should return albums array', fakeAsync(() => {
      let result: any[];
      service.getChartAlbums().subscribe(albums => result = albums);
      tick(300);
      expect(Array.isArray(result!)).toBeTrue();
    }));

    it('should respect limit parameter', fakeAsync(() => {
      let result: any[];
      service.getChartAlbums(5).subscribe(albums => result = albums);
      tick(300);
      expect(result!.length).toBeLessThanOrEqual(5);
    }));
  });

  describe('getChartArtists()', () => {
    it('should return artists array', fakeAsync(() => {
      let result: any[];
      service.getChartArtists().subscribe(artists => result = artists);
      tick(300);
      expect(Array.isArray(result!)).toBeTrue();
    }));

    it('should respect limit parameter', fakeAsync(() => {
      let result: any[];
      service.getChartArtists(3).subscribe(artists => result = artists);
      tick(300);
      expect(result!.length).toBeLessThanOrEqual(3);
    }));
  });

  describe('getChartTracks()', () => {
    it('should return tracks array', fakeAsync(() => {
      let result: any[];
      service.getChartTracks().subscribe(tracks => result = tracks);
      tick(300);
      expect(Array.isArray(result!)).toBeTrue();
    }));

    it('should respect limit parameter', fakeAsync(() => {
      let result: any[];
      service.getChartTracks(10).subscribe(tracks => result = tracks);
      tick(300);
      expect(result!.length).toBeLessThanOrEqual(10);
    }));
  });

  describe('getAlbumById()', () => {
    it('should return album by id', fakeAsync(() => {
      let result: any;
      service.getAlbumById('101').subscribe(album => result = album);
      tick(300);
      expect(result).toBeTruthy();
    }));

    it('should return null for non-existent id', fakeAsync(() => {
      let result: any = 'initial';
      service.getAlbumById('non-existent-id-12345').subscribe(album => result = album);
      tick(300);
      expect(result).toBeNull();
    }));
  });

  describe('getAlbumTracks()', () => {
    it('should return tracks array', fakeAsync(() => {
      let result: any[];
      service.getAlbumTracks('1').subscribe(tracks => result = tracks);
      tick(300);
      expect(Array.isArray(result!)).toBeTrue();
    }));
  });

  describe('getArtistById()', () => {
    it('should return artist by id', fakeAsync(() => {
      let result: any;
      service.getArtistById('1').subscribe(artist => result = artist);
      tick(300);
      expect(result).toBeTruthy();
    }));

    it('should return null for non-existent id', fakeAsync(() => {
      let result: any = 'initial';
      service.getArtistById('non-existent-artist-999').subscribe(artist => result = artist);
      tick(300);
      expect(result).toBeNull();
    }));
  });

  describe('getArtistAlbums()', () => {
    it('should return albums array', fakeAsync(() => {
      let result: any[];
      service.getArtistAlbums('1').subscribe(albums => result = albums);
      tick(300);
      expect(Array.isArray(result!)).toBeTrue();
    }));

    it('should respect limit parameter', fakeAsync(() => {
      let result: any[];
      service.getArtistAlbums('1', 2).subscribe(albums => result = albums);
      tick(300);
      expect(result!.length).toBeLessThanOrEqual(2);
    }));
  });

  describe('getArtistTopTracks()', () => {
    it('should return tracks array', fakeAsync(() => {
      let result: any[];
      service.getArtistTopTracks('1').subscribe(tracks => result = tracks);
      tick(300);
      expect(Array.isArray(result!)).toBeTrue();
    }));

    it('should respect limit parameter', fakeAsync(() => {
      let result: any[];
      service.getArtistTopTracks('1', 5).subscribe(tracks => result = tracks);
      tick(300);
      expect(result!.length).toBeLessThanOrEqual(5);
    }));
  });

  describe('getTrackById()', () => {
    it('should return track by id', fakeAsync(() => {
      let result: any;
      service.getTrackById('1001').subscribe(track => result = track);
      tick(300);
      expect(result).toBeTruthy();
    }));

    it('should return null for non-existent id', fakeAsync(() => {
      let result: any = 'initial';
      service.getTrackById('non-existent-track-xyz').subscribe(track => result = track);
      tick(300);
      expect(result).toBeNull();
    }));
  });

  describe('searchAlbums()', () => {
    it('should return search results', fakeAsync(() => {
      let result: any[];
      service.searchAlbums('test').subscribe(albums => result = albums);
      tick(300);
      expect(Array.isArray(result!)).toBeTrue();
    }));

    it('should respect limit parameter', fakeAsync(() => {
      let result: any[];
      service.searchAlbums('test', 3).subscribe(albums => result = albums);
      tick(300);
      expect(result!.length).toBeLessThanOrEqual(3);
    }));
  });

  describe('searchArtists()', () => {
    it('should return search results', fakeAsync(() => {
      let result: any[];
      service.searchArtists('test').subscribe(artists => result = artists);
      tick(300);
      expect(Array.isArray(result!)).toBeTrue();
    }));

    it('should respect limit parameter', fakeAsync(() => {
      let result: any[];
      service.searchArtists('test', 2).subscribe(artists => result = artists);
      tick(300);
      expect(result!.length).toBeLessThanOrEqual(2);
    }));
  });

  describe('searchTracks()', () => {
    it('should return search results', fakeAsync(() => {
      let result: any[];
      service.searchTracks('test').subscribe(tracks => result = tracks);
      tick(300);
      expect(Array.isArray(result!)).toBeTrue();
    }));

    it('should respect limit parameter', fakeAsync(() => {
      let result: any[];
      service.searchTracks('test', 4).subscribe(tracks => result = tracks);
      tick(300);
      expect(result!.length).toBeLessThanOrEqual(4);
    }));
  });

  describe('getAlbumReviews()', () => {
    it('should return reviews array', fakeAsync(() => {
      let result: any[];
      service.getAlbumReviews('1').subscribe(reviews => result = reviews);
      tick(300);
      expect(Array.isArray(result!)).toBeTrue();
    }));
  });

  describe('getAlbumStats()', () => {
    it('should return album stats', fakeAsync(() => {
      let result: any;
      service.getAlbumStats('1').subscribe(stats => result = stats);
      tick(300);
      expect(result).toBeTruthy();
    }));

    it('should include reviewCount in stats', fakeAsync(() => {
      let result: any;
      service.getAlbumStats('1').subscribe(stats => result = stats);
      tick(300);
      expect(result.reviewCount).toBeDefined();
    }));
  });

  describe('formatDuration()', () => {
    it('should format seconds to mm:ss', () => {
      expect(service.formatDuration(125)).toBe('2:05');
    });

    it('should handle exact minutes', () => {
      expect(service.formatDuration(180)).toBe('3:00');
    });

    it('should handle zero', () => {
      expect(service.formatDuration(0)).toBe('0:00');
    });

    it('should handle single digit seconds', () => {
      expect(service.formatDuration(65)).toBe('1:05');
    });
  });

  describe('getBestAlbumCover()', () => {
    it('should prefer cover_big by default', () => {
      const album = {
        id: 1,
        title: 'Test',
        cover: 'cover.jpg',
        cover_medium: 'medium.jpg',
        cover_big: 'big.jpg',
        cover_xl: 'xl.jpg'
      } as any;
      expect(service.getBestAlbumCover(album)).toBe('big.jpg');
    });

    it('should use cover_xl when preferBig is false and cover_big missing', () => {
      const album = {
        id: 1,
        title: 'Test',
        cover: 'cover.jpg',
        cover_xl: 'xl.jpg'
      } as any;
      expect(service.getBestAlbumCover(album, false)).toBe('xl.jpg');
    });

    it('should fallback to placeholder when no covers available', () => {
      const album = { id: 1, title: 'Test' } as any;
      expect(service.getBestAlbumCover(album)).toContain('placeholder');
    });
  });
});
