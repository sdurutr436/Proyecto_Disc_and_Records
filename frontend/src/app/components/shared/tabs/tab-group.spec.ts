import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Component } from '@angular/core';
import { TabGroup } from './tab-group';
import { TabPanel } from './tab-panel';

@Component({
  standalone: true,
  imports: [TabGroup, TabPanel],
  template: `
    <app-tab-group>
      <app-tab-panel id="tab1" label="Tab 1">Content 1</app-tab-panel>
      <app-tab-panel id="tab2" label="Tab 2">Content 2</app-tab-panel>
      <app-tab-panel id="tab3" label="Tab 3" [disabled]="true">Content 3</app-tab-panel>
    </app-tab-group>
  `
})
class TestHostComponent {}

describe('TabGroup', () => {
  let component: TabGroup;
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
    expect(component.tabPanels.length).toBe(3);
  });

  it('should have tabs signal populated', () => {
    expect(component.tabs().length).toBe(3);
    expect(component.tabs()[0].id).toBe('tab1');
    expect(component.tabs()[0].label).toBe('Tab 1');
  });

  it('should set first tab as active by default', () => {
    expect(component.activeTabId()).toBe('tab1');
  });

  it('should have default layoutMode as wrap', () => {
    expect(component.layoutMode()).toBe('wrap');
  });

  describe('selectTab()', () => {
    it('should change active tab', () => {
      component.selectTab('tab2');
      expect(component.activeTabId()).toBe('tab2');
    });

    it('should not select disabled tab', () => {
      component.selectTab('tab3');
      expect(component.activeTabId()).toBe('tab1');
    });
  });

  describe('isActive()', () => {
    it('should return true for active tab', () => {
      expect(component.isActive('tab1')).toBeTrue();
      expect(component.isActive('tab2')).toBeFalse();
    });

    it('should update when tab changes', () => {
      component.selectTab('tab2');
      expect(component.isActive('tab1')).toBeFalse();
      expect(component.isActive('tab2')).toBeTrue();
    });
  });
});

describe('TabGroup with initialActiveTab', () => {
  let component: TabGroup;
  let fixture: ComponentFixture<TabGroup>;

  beforeEach(async () => {
    @Component({
      standalone: true,
      imports: [TabGroup, TabPanel],
      template: `
        <app-tab-group [initialActiveTab]="'tab2'">
          <app-tab-panel id="tab1" label="Tab 1">Content 1</app-tab-panel>
          <app-tab-panel id="tab2" label="Tab 2">Content 2</app-tab-panel>
        </app-tab-group>
      `
    })
    class TestInitialTabComponent {}

    await TestBed.configureTestingModule({
      imports: [TestInitialTabComponent]
    }).compileComponents();

    const hostFixture = TestBed.createComponent(TestInitialTabComponent);
    hostFixture.detectChanges();

    component = hostFixture.debugElement.children[0].componentInstance;
  });

  it('should set initial active tab from input', () => {
    expect(component.activeTabId()).toBe('tab2');
  });
});
