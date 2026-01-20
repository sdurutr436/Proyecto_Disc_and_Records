import { TestBed } from '@angular/core/testing';
import { StyleGuideNavigationService, StyleGuideSection } from './style-guide-navigation';

describe('StyleGuideNavigationService', () => {
  let service: StyleGuideNavigationService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(StyleGuideNavigationService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('initial state', () => {
    it('should start with foundations section', () => {
      expect(service.activeSection()).toBe('foundations');
    });
  });

  describe('setSection()', () => {
    it('should change to atoms section', () => {
      service.setSection('atoms');
      expect(service.activeSection()).toBe('atoms');
    });

    it('should change to molecules section', () => {
      service.setSection('molecules');
      expect(service.activeSection()).toBe('molecules');
    });

    it('should change to organisms section', () => {
      service.setSection('organisms');
      expect(service.activeSection()).toBe('organisms');
    });

    it('should change to layout section', () => {
      service.setSection('layout');
      expect(service.activeSection()).toBe('layout');
    });

    it('should change back to foundations section', () => {
      service.setSection('atoms');
      service.setSection('foundations');
      expect(service.activeSection()).toBe('foundations');
    });
  });

  describe('activeSection signal', () => {
    it('should be reactive', () => {
      const values: StyleGuideSection[] = [];

      // Track initial value
      values.push(service.activeSection());

      service.setSection('atoms');
      values.push(service.activeSection());

      service.setSection('molecules');
      values.push(service.activeSection());

      expect(values).toEqual(['foundations', 'atoms', 'molecules']);
    });
  });
});
