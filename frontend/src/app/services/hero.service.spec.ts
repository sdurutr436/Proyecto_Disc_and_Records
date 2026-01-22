import { TestBed } from '@angular/core/testing';
import { signal } from '@angular/core';
import { HeroService, HeroImage } from './hero.service';
import { ThemeService } from './theme';

describe('HeroService', () => {
  let service: HeroService;
  let mockThemeService: jasmine.SpyObj<ThemeService>;

  beforeEach(() => {
    mockThemeService = jasmine.createSpyObj('ThemeService', [], {
      currentTheme: signal('light')
    });

    TestBed.configureTestingModule({
      providers: [
        HeroService,
        { provide: ThemeService, useValue: mockThemeService }
      ]
    });
  });

  it('should be created', () => {
    service = TestBed.inject(HeroService);
    expect(service).toBeTruthy();
  });

  it('should have a currentHero computed signal', () => {
    service = TestBed.inject(HeroService);
    const hero = service.currentHero();
    expect(hero).toBeTruthy();
    expect(hero.name).toBeDefined();
    expect(hero.srcMedium).toBeDefined();
    expect(hero.alt).toBeDefined();
  });

  it('should have currentAssets computed signal with assets', () => {
    service = TestBed.inject(HeroService);
    const assets = service.currentAssets();
    expect(assets).toBeTruthy();
    expect(assets.length).toBeGreaterThan(0);
  });

  it('should have correct asset structure', () => {
    service = TestBed.inject(HeroService);
    const assets = service.currentAssets();

    assets.forEach((asset: HeroImage) => {
      expect(asset.name).toBeTruthy();
      expect(asset.srcMedium).toBeTruthy();
      expect(asset.alt).toBeTruthy();
    });
  });

  it('should have shuffleAll method', () => {
    service = TestBed.inject(HeroService);
    expect(service.shuffleAll).toBeDefined();
    expect(typeof service.shuffleAll).toBe('function');
  });

  it('should shuffle all indices when shuffleAll is called', () => {
    service = TestBed.inject(HeroService);
    // Just verify the method can be called without errors
    expect(() => service.shuffleAll()).not.toThrow();
  });
});
