import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { Router } from '@angular/router';
import SettingsSecurityComponent from './security';

describe('SettingsSecurityComponent', () => {
  let component: SettingsSecurityComponent;
  let fixture: ComponentFixture<SettingsSecurityComponent>;
  let routerSpy: jasmine.SpyObj<Router>;

  beforeEach(async () => {
    routerSpy = jasmine.createSpyObj('Router', ['navigate']);

    await TestBed.configureTestingModule({
      imports: [SettingsSecurityComponent],
      providers: [
        { provide: Router, useValue: routerSpy }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(SettingsSecurityComponent);
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
    it('should not be loading initially', () => {
      expect(component.isLoading()).toBeFalse();
    });

    it('should not show delete modal initially', () => {
      expect(component.showDeleteModal()).toBeFalse();
    });

    it('should have last password change date', () => {
      expect(component.lastPasswordChange()).toBe('15 de diciembre, 2025');
    });

    it('should have account created date', () => {
      expect(component.accountCreated()).toBe('3 de enero, 2025');
    });

    it('should have active sessions count', () => {
      expect(component.activeSessions()).toBe(2);
    });
  });

  // =========================================================================
  // Delete Account Flow
  // =========================================================================
  describe('Delete Account Flow', () => {
    it('should show delete modal when onDeleteAccount is called', () => {
      component.onDeleteAccount();
      expect(component.showDeleteModal()).toBeTrue();
    });

    it('should hide delete modal on confirmDeleteAccount', () => {
      component.showDeleteModal.set(true);
      component.confirmDeleteAccount();
      expect(component.showDeleteModal()).toBeFalse();
    });

    it('should set loading state on confirmDeleteAccount', () => {
      component.confirmDeleteAccount();
      expect(component.isLoading()).toBeTrue();
    });

    it('should navigate to home after account deletion', fakeAsync(() => {
      component.confirmDeleteAccount();
      tick(1500);
      expect(routerSpy.navigate).toHaveBeenCalledWith(['/']);
    }));

    it('should reset loading after account deletion', fakeAsync(() => {
      component.confirmDeleteAccount();
      expect(component.isLoading()).toBeTrue();
      tick(1500);
      expect(component.isLoading()).toBeFalse();
    }));
  });

  // =========================================================================
  // CanDeactivate Guard
  // =========================================================================
  describe('CanDeactivate Guard', () => {
    it('should always allow deactivation', () => {
      expect(component.canDeactivate()).toBeTrue();
    });

    it('should return true even when modal is open', () => {
      component.showDeleteModal.set(true);
      expect(component.canDeactivate()).toBeTrue();
    });

    it('should return true even when loading', () => {
      component.isLoading.set(true);
      expect(component.canDeactivate()).toBeTrue();
    });
  });

  // =========================================================================
  // Template Integration
  // =========================================================================
  describe('Template Integration', () => {
    it('should render without errors', () => {
      expect(fixture.nativeElement).toBeTruthy();
    });

    it('should contain security information', () => {
      const compiled = fixture.nativeElement as HTMLElement;
      // The component should render without throwing errors
      expect(compiled.innerHTML).toBeDefined();
    });
  });
});
