import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { Component } from '@angular/core';
import { ResponsiveTabs } from './responsive-tabs';
import { TabPanel } from './tab-panel';

@Component({
  standalone: true,
  imports: [ResponsiveTabs, TabPanel],
  template: `
    <app-responsive-tabs [breakpoint]="768">
      <app-tab-panel id="panel1" label="Panel 1">Content 1</app-tab-panel>
      <app-tab-panel id="panel2" label="Panel 2">Content 2</app-tab-panel>
    </app-responsive-tabs>
  `
})
class TestHostComponent {}

describe('ResponsiveTabs', () => {
  let component: ResponsiveTabs;
  let fixture: ComponentFixture<TestHostComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TestHostComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(TestHostComponent);
    fixture.detectChanges();

    component = fixture.debugElement.children[0].componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should detect tab panels', () => {
    expect(component.tabPanels).toBeTruthy();
    expect(component.tabPanels.length).toBe(2);
  });

  it('should have tabs signal populated', () => {
    expect(component.tabs().length).toBe(2);
    expect(component.tabs()[0].id).toBe('panel1');
    expect(component.tabs()[0].label).toBe('Panel 1');
  });

  it('should have default breakpoint of 768', () => {
    expect(component.breakpoint()).toBe(768);
  });

  it('should set first tab as active by default', () => {
    expect(component.activeTabId()).toBe('panel1');
  });

  it('should set display mode based on viewport', () => {
    // displayMode is set based on window width
    expect(['tabs', 'accordion']).toContain(component.displayMode());
  });

  it('should start with first accordion open initially', () => {
    // El primer panel se inicializa como activo
    expect(component.openAccordions().has('panel1')).toBeTrue();
  });

  describe('selectTab()', () => {
    it('should change active tab', () => {
      component.selectTab('panel2');
      expect(component.activeTabId()).toBe('panel2');
    });
  });

  describe('Accordion Mode', () => {
    it('should toggle accordion', () => {
      component.toggleAccordion('panel2');
      expect(component.openAccordions().has('panel2')).toBeTrue();

      component.toggleAccordion('panel2');
      expect(component.openAccordions().has('panel2')).toBeFalse();
    });

    it('should only allow one accordion open (single mode)', () => {
      component.toggleAccordion('panel1');
      component.toggleAccordion('panel2');
      // Single mode - only panel2 should be open
      expect(component.openAccordions().has('panel1')).toBeFalse();
      expect(component.openAccordions().has('panel2')).toBeTrue();
    });

    it('should check if accordion is open', () => {
      component.toggleAccordion('panel2');
      expect(component.isAccordionOpen('panel1')).toBeFalse();
      expect(component.isAccordionOpen('panel2')).toBeTrue();
    });
  });

  describe('isActive()', () => {
    it('should return true for active tab', () => {
      expect(component.isActive('panel1')).toBeTrue();
      expect(component.isActive('panel2')).toBeFalse();
    });

    it('should update when tab changes', () => {
      component.selectTab('panel2');
      expect(component.isActive('panel1')).toBeFalse();
      expect(component.isActive('panel2')).toBeTrue();
    });
  });
});

describe('ResponsiveTabs with initialActiveTab', () => {
  let component: ResponsiveTabs;

  beforeEach(async () => {
    @Component({
      standalone: true,
      imports: [ResponsiveTabs, TabPanel],
      template: `
        <app-responsive-tabs [initialActiveTab]="'panel2'">
          <app-tab-panel id="panel1" label="Panel 1">Content 1</app-tab-panel>
          <app-tab-panel id="panel2" label="Panel 2">Content 2</app-tab-panel>
        </app-responsive-tabs>
      `
    })
    class TestInitialTabComponent {}

    await TestBed.configureTestingModule({
      imports: [TestInitialTabComponent]
    }).compileComponents();

    const fixture = TestBed.createComponent(TestInitialTabComponent);
    fixture.detectChanges();

    component = fixture.debugElement.children[0].componentInstance;
  });

  it('should set initial active tab from input', () => {
    expect(component.activeTabId()).toBe('panel2');
  });
});
