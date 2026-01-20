import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import RoadmapComponent from './roadmap';

describe('RoadmapComponent', () => {
  let component: RoadmapComponent;
  let fixture: ComponentFixture<RoadmapComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RoadmapComponent],
      schemas: [NO_ERRORS_SCHEMA]
    }).compileComponents();

    fixture = TestBed.createComponent(RoadmapComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  describe('Creación', () => {
    it('debería crear el componente', () => {
      expect(component).toBeTruthy();
    });
  });

  describe('Renderizado', () => {
    it('debería compilar template sin errores', () => {
      expect(() => fixture.detectChanges()).not.toThrow();
    });

    it('debería tener elemento nativo', () => {
      expect(fixture.nativeElement).toBeTruthy();
    });
  });
});
