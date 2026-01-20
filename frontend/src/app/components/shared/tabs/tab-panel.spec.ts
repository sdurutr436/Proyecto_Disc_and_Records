import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Component } from '@angular/core';
import { TabPanel } from './tab-panel';

@Component({
  standalone: true,
  imports: [TabPanel],
  template: `<app-tab-panel id="test" label="Test Tab">Test Content</app-tab-panel>`
})
class TestHostComponent {}

describe('TabPanel', () => {
  let component: TabPanel;
  let fixture: ComponentFixture<TabPanel>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TabPanel]
    }).compileComponents();

    fixture = TestBed.createComponent(TabPanel);
    fixture.componentRef.setInput('id', 'test-panel');
    fixture.componentRef.setInput('label', 'Test Label');
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have required id input', () => {
    expect(component.id()).toBe('test-panel');
  });

  it('should have required label input', () => {
    expect(component.label()).toBe('Test Label');
  });

  it('should be inactive by default', () => {
    expect(component.isActive()).toBeFalse();
  });

  it('should have disabled false by default', () => {
    expect(component.disabled()).toBeFalse();
  });

  it('should set active state via setActive()', () => {
    component.setActive(true);
    expect(component.isActive()).toBeTrue();

    component.setActive(false);
    expect(component.isActive()).toBeFalse();
  });

  it('should toggle _isActive signal', () => {
    expect(component._isActive()).toBeFalse();

    component.setActive(true);
    expect(component._isActive()).toBeTrue();
  });

  it('should render panel with correct attributes', () => {
    fixture.detectChanges();
    const panelEl = fixture.nativeElement.querySelector('.tab-panel');
    expect(panelEl).toBeTruthy();
    expect(panelEl.getAttribute('role')).toBe('tabpanel');
    expect(panelEl.getAttribute('id')).toBe('panel-test-panel');
  });

  it('should hide panel when not active', () => {
    fixture.detectChanges();
    const panelEl = fixture.nativeElement.querySelector('.tab-panel');
    expect(panelEl.style.display).toBe('none');
  });

  it('should show panel when active', () => {
    component.setActive(true);
    fixture.detectChanges();
    const panelEl = fixture.nativeElement.querySelector('.tab-panel');
    expect(panelEl.style.display).toBe('block');
    expect(panelEl.classList.contains('tab-panel--active')).toBeTrue();
  });
});

describe('TabPanel with disabled', () => {
  let component: TabPanel;
  let fixture: ComponentFixture<TabPanel>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TabPanel]
    }).compileComponents();

    fixture = TestBed.createComponent(TabPanel);
    fixture.componentRef.setInput('id', 'disabled-panel');
    fixture.componentRef.setInput('label', 'Disabled Label');
    fixture.componentRef.setInput('disabled', true);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be disabled', () => {
    expect(component.disabled()).toBeTrue();
  });
});
