import { TestBed, fakeAsync, tick, discardPeriodicTasks } from '@angular/core/testing';
import { HeroService, HeroAsset } from './hero.service';

describe('HeroService', () => {
  let service: HeroService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [HeroService]
    });
  });

  afterEach(() => {
    if (service) {
      service.ngOnDestroy();
    }
  });

  it('should be created', () => {
    service = TestBed.inject(HeroService);
    expect(service).toBeTruthy();
  });

  it('should have 5 hero assets', () => {
    service = TestBed.inject(HeroService);
    expect(service.allAssets().length).toBe(5);
  });

  it('should start with the first hero asset', () => {
    service = TestBed.inject(HeroService);
    const hero = service.currentHero();
    expect(hero.name).toBe('david-bowie');
  });

  it('should advance to next hero with next()', () => {
    service = TestBed.inject(HeroService);
    service.next();
    expect(service.currentHero().name).toBe('elvis-presley');
  });

  it('should go back to previous hero with previous()', () => {
    service = TestBed.inject(HeroService);
    service.next(); // Go to elvis
    service.previous(); // Back to david
    expect(service.currentHero().name).toBe('david-bowie');
  });

  it('should wrap around when going past last hero', () => {
    service = TestBed.inject(HeroService);
    // Advance through all heroes
    service.next(); // elvis
    service.next(); // freddie
    service.next(); // michael
    service.next(); // prince
    service.next(); // back to david
    expect(service.currentHero().name).toBe('david-bowie');
  });

  it('should wrap around when going before first hero', () => {
    service = TestBed.inject(HeroService);
    service.previous(); // Should go to prince (last)
    expect(service.currentHero().name).toBe('prince');
  });

  it('should go to specific index with goTo()', () => {
    service = TestBed.inject(HeroService);
    service.goTo(2); // freddie-mercury
    expect(service.currentHero().name).toBe('freddie-mercury');
  });

  it('should not change index for invalid goTo() values', () => {
    service = TestBed.inject(HeroService);
    const initialHero = service.currentHero().name;
    service.goTo(-1);
    expect(service.currentHero().name).toBe(initialHero);
    service.goTo(100);
    expect(service.currentHero().name).toBe(initialHero);
  });

  it('should auto-rotate every 8 seconds', fakeAsync(() => {
    service = TestBed.inject(HeroService);
    expect(service.currentHero().name).toBe('david-bowie');

    tick(8000);
    expect(service.currentHero().name).toBe('elvis-presley');

    tick(8000);
    expect(service.currentHero().name).toBe('freddie-mercury');

    discardPeriodicTasks();
  }));

  it('should pause rotation', fakeAsync(() => {
    service = TestBed.inject(HeroService);
    service.pause();

    tick(16000); // Wait 2 rotations
    expect(service.currentHero().name).toBe('david-bowie'); // Should not have changed

    discardPeriodicTasks();
  }));

  it('should resume rotation after pause', fakeAsync(() => {
    service = TestBed.inject(HeroService);
    service.pause();
    service.resume();

    tick(8000);
    expect(service.currentHero().name).toBe('elvis-presley');

    discardPeriodicTasks();
  }));

  it('should have correct asset structure', () => {
    service = TestBed.inject(HeroService);
    const assets = service.allAssets();

    assets.forEach((asset: HeroAsset) => {
      expect(asset.name).toBeTruthy();
      expect(asset.src).toContain('assets/images/hero/');
      expect(asset.src).toContain('.webp');
      expect(asset.alt).toContain('Silueta');
    });
  });

  it('should have all expected artists', () => {
    service = TestBed.inject(HeroService);
    const names = service.allAssets().map(a => a.name);

    expect(names).toContain('david-bowie');
    expect(names).toContain('elvis-presley');
    expect(names).toContain('freddie-mercury');
    expect(names).toContain('michael-jackson');
    expect(names).toContain('prince');
  });
});
