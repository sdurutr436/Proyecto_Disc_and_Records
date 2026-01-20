import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { StyleGuide } from './style-guide';
import { NotificationService } from '../../services/notification';
import { LoadingService } from '../../services/loading';
import { StyleGuideNavigationService } from '../../services/style-guide-navigation';

describe('StyleGuide', () => {
  let component: StyleGuide;
  let fixture: ComponentFixture<StyleGuide>;
  let notificationService: jasmine.SpyObj<NotificationService>;
  let loadingService: jasmine.SpyObj<LoadingService>;

  beforeEach(async () => {
    notificationService = jasmine.createSpyObj('NotificationService', ['show']);
    loadingService = jasmine.createSpyObj('LoadingService', ['start', 'stop']);

    await TestBed.configureTestingModule({
      imports: [StyleGuide, ReactiveFormsModule],
      providers: [
        provideHttpClient(),
        provideHttpClientTesting(),
        { provide: NotificationService, useValue: notificationService },
        { provide: LoadingService, useValue: loadingService },
        StyleGuideNavigationService
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(StyleGuide);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  describe('Initialization', () => {
    it('should create', () => {
      expect(component).toBeTruthy();
    });

    it('should initialize form controls', () => {
      expect(component.demoInputControl).toBeTruthy();
      expect(component.demoInputErrorControl).toBeTruthy();
      expect(component.demoInputSuccessControl).toBeTruthy();
    });

    it('should have error control marked as touched', () => {
      expect(component.demoInputErrorControl.touched).toBeTrue();
    });

    it('should have success control marked as touched with value', () => {
      expect(component.demoInputSuccessControl.touched).toBeTrue();
      expect(component.demoInputSuccessControl.value).toBe('valor-válido');
    });

    it('should initialize sidebar as closed', () => {
      expect(component.sidebarOpen()).toBeFalse();
    });
  });

  describe('Sidebar', () => {
    it('should toggle sidebar open and close', () => {
      expect(component.sidebarOpen()).toBeFalse();

      component.toggleSidebar();
      expect(component.sidebarOpen()).toBeTrue();

      component.toggleSidebar();
      expect(component.sidebarOpen()).toBeFalse();
    });

    it('should close sidebar', () => {
      component.toggleSidebar(); // Open
      expect(component.sidebarOpen()).toBeTrue();

      component.closeSidebar();
      expect(component.sidebarOpen()).toBeFalse();
    });
  });

  describe('Section Navigation', () => {
    it('should have menu items', () => {
      expect(component.menuItems.length).toBe(5);
      expect(component.menuItems[0].id).toBe('foundations');
      expect(component.menuItems[1].id).toBe('atoms');
      expect(component.menuItems[2].id).toBe('molecules');
      expect(component.menuItems[3].id).toBe('organisms');
      expect(component.menuItems[4].id).toBe('layout');
    });

    it('should select section', () => {
      component.selectSection('atoms');
      expect(component.activeSection()).toBe('atoms');

      component.selectSection('organisms');
      expect(component.activeSection()).toBe('organisms');
    });
  });

  describe('Button Loading', () => {
    it('should start with no loading buttons', () => {
      expect(component.buttonLoading1).toBeFalse();
      expect(component.buttonLoading2).toBeFalse();
      expect(component.buttonLoading3).toBeFalse();
    });

    it('should simulate loading for btn1', fakeAsync(() => {
      component.simulateLoading('btn1');
      expect(component.buttonLoading1).toBeTrue();

      tick(2000);
      expect(component.buttonLoading1).toBeFalse();
    }));

    it('should simulate loading for btn2', fakeAsync(() => {
      component.simulateLoading('btn2');
      expect(component.buttonLoading2).toBeTrue();

      tick(2000);
      expect(component.buttonLoading2).toBeFalse();
    }));

    it('should simulate loading for btn3', fakeAsync(() => {
      component.simulateLoading('btn3');
      expect(component.buttonLoading3).toBeTrue();

      tick(2000);
      expect(component.buttonLoading3).toBeFalse();
    }));
  });

  describe('Global Spinner', () => {
    it('should show and hide global spinner', fakeAsync(() => {
      component.showGlobalSpinner();

      expect(loadingService.start).toHaveBeenCalledWith('Cargando datos...');

      tick(2000);
      expect(loadingService.stop).toHaveBeenCalled();
    }));
  });

  describe('Progress Bar Demo', () => {
    it('should start with progress at 0', () => {
      expect(component.demoProgress).toBe(0);
      expect(component.isProgressRunning).toBeFalse();
    });

    it('should start progress demo', fakeAsync(() => {
      component.startProgressDemo();
      expect(component.isProgressRunning).toBeTrue();

      // Tick through intervals
      tick(300);
      expect(component.demoProgress).toBeGreaterThan(0);

      // Complete progress - needs more time due to random increments
      tick(10000);
      expect(component.demoProgress).toBe(100);
      expect(component.isProgressRunning).toBeFalse();
    }));

    it('should not restart progress if already running', fakeAsync(() => {
      component.startProgressDemo();
      tick(300); // Let it progress a bit

      component.startProgressDemo(); // Try to start again - should be ignored
      expect(component.isProgressRunning).toBeTrue();

      tick(10000);
      expect(component.demoProgress).toBe(100);
    }));

    it('should reset progress demo', () => {
      component.demoProgress = 50;
      component.isProgressRunning = true;

      component.resetProgressDemo();

      expect(component.demoProgress).toBe(0);
      expect(component.isProgressRunning).toBeFalse();
    });
  });

  describe('Card Profile Actions', () => {
    it('should have profile actions', () => {
      expect(component.profileActions.length).toBe(4);
      expect(component.profileActions[0].label).toBe('Agregar a mi lista');
      expect(component.profileActions[0].variant).toBe('primary');
    });

    it('should have user genres', () => {
      expect(component.userGenres.length).toBe(5);
      expect(component.userGenres).toContain('Rock 35%');
    });
  });

  describe('Form Options', () => {
    it('should have genre options', () => {
      expect(component.genreOptions.length).toBeGreaterThan(0);
      expect(component.genreOptions.find(o => o.value === 'rock')).toBeTruthy();
    });

    it('should have privacy options', () => {
      expect(component.privacyOptions.length).toBe(3);
      expect(component.privacyOptions.find(o => o.value === 'public')).toBeTruthy();
      expect(component.privacyOptions.find(o => o.value === 'private')).toBeTruthy();
    });
  });

  describe('Breadcrumbs Data', () => {
    it('should have simple breadcrumbs', () => {
      expect(component.breadcrumbsSimple.length).toBe(3);
      expect(component.breadcrumbsSimple[0].label).toBe('Inicio');
    });

    it('should have breadcrumbs with icons', () => {
      expect(component.breadcrumbsWithIcons.length).toBe(4);
      expect(component.breadcrumbsWithIcons[0].icon).toBe('🏠');
    });

    it('should have long breadcrumbs', () => {
      expect(component.breadcrumbsLong.length).toBe(5);
    });
  });

  describe('Carousel Data', () => {
    it('should have trending albums', () => {
      expect(component.trendingAlbums.length).toBe(8);
      expect(component.trendingAlbums[0].title).toBe('Abbey Road');
      expect(component.trendingAlbums[0].artist).toBe('The Beatles');
    });

    it('should have trending songs', () => {
      expect(component.trendingSongs.length).toBe(8);
      expect(component.trendingSongs[0].title).toBe('Bohemian Rhapsody');
      expect(component.trendingSongs[0].artist).toBe('Queen');
    });
  });

  describe('Static Notifications (Toast)', () => {
    it('should start with no static notifications', () => {
      expect(component.staticNotifications.length).toBe(0);
    });

    it('should show success toast', fakeAsync(() => {
      component.showToast('success');

      expect(component.staticNotifications.length).toBe(1);
      expect(component.staticNotifications[0].type).toBe('success');
      expect(component.staticNotifications[0].title).toBe('¡Guardado!');

      tick(3000);
      expect(component.staticNotifications.length).toBe(0);
    }));

    it('should show error toast', fakeAsync(() => {
      component.showToast('error');

      expect(component.staticNotifications.length).toBe(1);
      expect(component.staticNotifications[0].type).toBe('error');
      expect(component.staticNotifications[0].title).toBe('Error de conexión');

      tick(5000);
      expect(component.staticNotifications.length).toBe(0);
    }));

    it('should show warning toast', fakeAsync(() => {
      component.showToast('warning');

      expect(component.staticNotifications.length).toBe(1);
      expect(component.staticNotifications[0].type).toBe('warning');

      tick(7000);
      expect(component.staticNotifications.length).toBe(0);
    }));

    it('should show info toast', fakeAsync(() => {
      component.showToast('info');

      expect(component.staticNotifications.length).toBe(1);
      expect(component.staticNotifications[0].type).toBe('info');

      tick(4000);
      expect(component.staticNotifications.length).toBe(0);
    }));

    it('should support multiple notifications', fakeAsync(() => {
      component.showToast('success');
      component.showToast('error');
      component.showToast('info');

      expect(component.staticNotifications.length).toBe(3);

      tick(3000);
      expect(component.staticNotifications.length).toBe(2); // success removed

      tick(1000);
      expect(component.staticNotifications.length).toBe(1); // info removed

      tick(1000);
      expect(component.staticNotifications.length).toBe(0); // error removed
    }));

    it('should remove specific notification by id', () => {
      component.showToast('success');
      component.showToast('error');

      const successId = component.staticNotifications[0].id;

      component.removeStaticNotification(successId);

      expect(component.staticNotifications.length).toBe(1);
      expect(component.staticNotifications[0].type).toBe('error');
    });

    it('should handle removing non-existent notification', () => {
      component.showToast('success');

      component.removeStaticNotification(9999);

      expect(component.staticNotifications.length).toBe(1);
    });
  });

  describe('Dynamic Notifications', () => {
    it('should show dynamic success notification', () => {
      component.showDynamicNotification('success');

      expect(notificationService.show).toHaveBeenCalledWith(
        jasmine.objectContaining({
          type: 'success',
          title: '¡Éxito!',
          duration: 5000,
          position: 'bottom-right'
        })
      );
    });

    it('should show dynamic error notification', () => {
      component.showDynamicNotification('error');

      expect(notificationService.show).toHaveBeenCalledWith(
        jasmine.objectContaining({
          type: 'error',
          title: 'Error'
        })
      );
    });

    it('should show dynamic warning notification', () => {
      component.showDynamicNotification('warning');

      expect(notificationService.show).toHaveBeenCalledWith(
        jasmine.objectContaining({
          type: 'warning',
          title: 'Advertencia'
        })
      );
    });

    it('should show dynamic info notification', () => {
      component.showDynamicNotification('info');

      expect(notificationService.show).toHaveBeenCalledWith(
        jasmine.objectContaining({
          type: 'info',
          title: 'Información'
        })
      );
    });
  });

  describe('Modal', () => {
    it('should start with modal closed', () => {
      expect(component.isModalOpen()).toBeFalse();
    });

    it('should open modal', () => {
      component.openModal();
      expect(component.isModalOpen()).toBeTrue();
    });

    it('should close modal', () => {
      component.openModal();
      expect(component.isModalOpen()).toBeTrue();

      component.closeModal();
      expect(component.isModalOpen()).toBeFalse();
    });
  });

  describe('Accordion', () => {
    it('should have accordion items', () => {
      expect(component.accordionItems.length).toBe(4);
      expect(component.accordionItems[0].title).toBe('¿Qué es Disc and Records?');
    });

    it('should have unique ids for accordion items', () => {
      const ids = component.accordionItems.map(item => item.id);
      const uniqueIds = new Set(ids);
      expect(uniqueIds.size).toBe(ids.length);
    });
  });

  describe('Carousel Controls', () => {
    it('should start with opacity at 1', () => {
      expect(component.carouselOpacity).toBe(1);
    });

    it('should toggle carousel highlight when carousel exists', () => {
      const mockCarousel = { toggleHighlight: jasmine.createSpy('toggleHighlight') };
      component.demoCarousel = mockCarousel;

      component.toggleCarouselHighlight();

      expect(mockCarousel.toggleHighlight).toHaveBeenCalled();
    });

    it('should not throw when carousel does not exist', () => {
      component.demoCarousel = undefined;

      expect(() => component.toggleCarouselHighlight()).not.toThrow();
    });

    it('should update carousel opacity', () => {
      const mockCarousel = { setOpacity: jasmine.createSpy('setOpacity') };
      component.demoCarousel = mockCarousel;

      const event = { target: { value: '0.5' } } as unknown as Event;
      component.updateCarouselOpacity(event);

      expect(component.carouselOpacity).toBe(0.5);
      expect(mockCarousel.setOpacity).toHaveBeenCalledWith(0.5);
    });
  });

  describe('Button Click Handler', () => {
    it('should log button click', () => {
      spyOn(console, 'log');

      component.onButtonClick('primary', 'md');

      expect(console.log).toHaveBeenCalledWith('Botón primary md clickeado');
    });
  });

  describe('Notification Height Getter', () => {
    it('should return default height when no components', () => {
      const height = component.getNotificationHeight(0);
      expect(height).toBe(92);
    });

    it('should return default height for invalid index', () => {
      const height = component.getNotificationHeight(-1);
      expect(height).toBe(92);
    });
  });
});
