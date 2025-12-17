import { Component, signal, inject, ViewChild, effect } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Button } from '../../components/shared/button/button';
import { Card, CardAction } from '../../components/shared/card/card';
import { Badge } from '../../components/shared/badge/badge';
import { FormInput } from '../../components/shared/form-input/form-input';
import { FormTextarea } from '../../components/shared/form-textarea/form-textarea';
import { FormSelect, SelectOption } from '../../components/shared/form-select/form-select';
import { FormCheckbox } from '../../components/shared/form-checkbox/form-checkbox';
import { FormRadioGroup, RadioOption } from '../../components/shared/form-radio-group/form-radio-group';
import { Breadcrumbs, BreadcrumbItem } from '../../components/shared/breadcrumbs/breadcrumbs';
import { Alert } from '../../components/shared/alert/alert';
import { Notification } from '../../components/shared/notification/notification';
import { Carousel } from '../../components/shared/carousel/carousel';
import { LoginForm } from '../../components/shared/login-form/login-form';
import { RegisterForm } from '../../components/shared/register-form/register-form';
import { ForgotPasswordForm } from '../../components/shared/forgot-password-form/forgot-password-form';
import { Modal } from '../../components/shared/modal/modal';
import { Accordion, AccordionItem } from '../../components/shared/accordion/accordion';
import { Tabs, Tab } from '../../components/shared/tabs/tabs';
import { Tooltip } from '../../components/shared/tooltip/tooltip';
import { Spinner } from '../../components/shared/spinner/spinner';
import { ProgressBar } from '../../components/shared/progress-bar/progress-bar';
import { NotificationService } from '../../services/notification';
import { LoadingService } from '../../services/loading';
import { StyleGuideNavigationService, StyleGuideSection } from '../../services/style-guide-navigation';

@Component({
  selector: 'app-style-guide',
  standalone: true,
  imports: [
    CommonModule,
    Button,
    Card,
    Badge,
    FormInput,
    FormTextarea,
    FormSelect,
    FormCheckbox,
    FormRadioGroup,
    Breadcrumbs,
    Alert,
    Notification,
    Carousel,
    LoginForm,
    RegisterForm,
    ForgotPasswordForm,
    Modal,
    Accordion,
    Tabs,
    Tooltip,
    Spinner,
    ProgressBar
  ],
  templateUrl: './style-guide.html',
  styleUrl: './style-guide.scss',
})
export class StyleGuide {
  // Inyectar servicios
  private notificationService = inject(NotificationService);
  private loadingService = inject(LoadingService);
  private styleGuideNav = inject(StyleGuideNavigationService);

  // Usar el signal del servicio compartido
  activeSection = this.styleGuideNav.activeSection;

  // Sidebar para navegación de secciones
  sidebarOpen = signal(false);

  toggleSidebar(): void {
    this.sidebarOpen.update((open) => !open);
  }

  closeSidebar(): void {
    this.sidebarOpen.set(false);
  }

  // Opciones del menu
  menuItems: { id: StyleGuideSection; label: string }[] = [
    { id: 'foundations', label: 'Fundamentos' },
    { id: 'atoms', label: 'Atomos' },
    { id: 'molecules', label: 'Moleculas' },
    { id: 'organisms', label: 'Organismos' },
    { id: 'layout', label: 'Layout' }
  ];

  // Cambiar sección
  selectSection(section: StyleGuideSection): void {
    this.activeSection.set(section);
  }

  // Referencias a carouseles para manipulacion DOM
  @ViewChild('demoCarousel') demoCarousel?: any;
  carouselOpacity: number = 1;

  // Estados de loading para botones
  buttonLoading1 = false;
  buttonLoading2 = false;
  buttonLoading3 = false;

  // Estado para demo de progress bar
  demoProgress = 0;
  isProgressRunning = false;

  onButtonClick(variant: string, size: string): void {
    console.log(`Botón ${variant} ${size} clickeado`);
  }

  /**
   * Simula una operación de carga en un botón
   */
  simulateLoading(buttonId: string): void {
    switch (buttonId) {
      case 'btn1':
        this.buttonLoading1 = true;
        setTimeout(() => (this.buttonLoading1 = false), 2000);
        break;
      case 'btn2':
        this.buttonLoading2 = true;
        setTimeout(() => (this.buttonLoading2 = false), 2000);
        break;
      case 'btn3':
        this.buttonLoading3 = true;
        setTimeout(() => (this.buttonLoading3 = false), 2000);
        break;
    }
  }

  /**
   * Muestra el spinner global durante 2 segundos
   */
  showGlobalSpinner(): void {
    this.loadingService.start('Cargando datos...');
    setTimeout(() => {
      this.loadingService.stop();
    }, 2000);
  }

  /**
   * Inicia demo de barra de progreso
   */
  startProgressDemo(): void {
    if (this.isProgressRunning) return;

    this.demoProgress = 0;
    this.isProgressRunning = true;

    const interval = setInterval(() => {
      this.demoProgress += Math.random() * 15;

      if (this.demoProgress >= 100) {
        this.demoProgress = 100;
        this.isProgressRunning = false;
        clearInterval(interval);
      }
    }, 300);
  }

  /**
   * Reinicia la demo de progreso
   */
  resetProgressDemo(): void {
    this.demoProgress = 0;
    this.isProgressRunning = false;
  }

  // Ejemplos de acciones para cards de perfil
  profileActions: CardAction[] = [
    { label: 'Agregar a mi lista', icon: '+', variant: 'primary', callback: () => console.log('Agregado') },
    { label: 'Eliminar de mi lista', icon: '−', variant: 'secondary', callback: () => console.log('Eliminado') },
    { label: 'Enviar solicitud de amistad', icon: '👤+', variant: 'accent', callback: () => console.log('Solicitud enviada') },
    { label: 'Editar mi perfil', icon: '✏️', variant: 'contrast', callback: () => console.log('Editando perfil') }
  ];

  userGenres: string[] = ['Rock 35%', 'Jazz 25%', 'Funk 20%', 'Soul 15%', 'Disco 5%'];

  // Datos para form-select
  genreOptions: SelectOption[] = [
    { value: 'rock', label: 'Rock' },
    { value: 'jazz', label: 'Jazz' },
    { value: 'funk', label: 'Funk' },
    { value: 'soul', label: 'Soul' },
    { value: 'disco', label: 'Disco' },
    { value: 'pop', label: 'Pop' },
    { value: 'classical', label: 'Clásica' }
  ];

  // Datos para form-radio-group
  privacyOptions: RadioOption[] = [
    { value: 'public', label: 'Público' },
    { value: 'friends', label: 'Solo amigos' },
    { value: 'private', label: 'Privado' }
  ];

  // Datos para breadcrumbs
  breadcrumbsSimple: BreadcrumbItem[] = [
    { label: 'Inicio', url: '/' },
    { label: 'Mi colección', url: '/collection' },
    { label: 'Álbumes' }
  ];

  breadcrumbsWithIcons: BreadcrumbItem[] = [
    { label: 'Inicio', url: '/', icon: '🏠' },
    { label: 'Explorar', url: '/explore', icon: '🔍' },
    { label: 'Artistas', url: '/artists', icon: '🎤' },
    { label: 'Pink Floyd' }
  ];

  breadcrumbsLong: BreadcrumbItem[] = [
    { label: 'Inicio', url: '/' },
    { label: 'Mi colección', url: '/collection' },
    { label: 'Álbumes', url: '/collection/albums' },
    { label: 'Rock', url: '/collection/albums/rock' },
    { label: 'The Dark Side of the Moon' }
  ];

  // Datos para carruseles - Álbumes
  trendingAlbums = [
    { title: 'Abbey Road', artist: 'The Beatles', year: '1969', genre: 'Rock' },
    { title: 'Dark Side of the Moon', artist: 'Pink Floyd', year: '1973', genre: 'Progressive Rock' },
    { title: 'Rumours', artist: 'Fleetwood Mac', year: '1977', genre: 'Rock' },
    { title: 'Thriller', artist: 'Michael Jackson', year: '1982', genre: 'Pop' },
    { title: 'Back in Black', artist: 'AC/DC', year: '1980', genre: 'Hard Rock' },
    { title: 'The Wall', artist: 'Pink Floyd', year: '1979', genre: 'Progressive Rock' },
    { title: 'Led Zeppelin IV', artist: 'Led Zeppelin', year: '1971', genre: 'Rock' },
    { title: 'Hotel California', artist: 'Eagles', year: '1976', genre: 'Rock' }
  ];

  // Datos para carruseles - Canciones
  trendingSongs = [
    { title: 'Bohemian Rhapsody', artist: 'Queen', duration: '5:55' },
    { title: 'Stairway to Heaven', artist: 'Led Zeppelin', duration: '8:02' },
    { title: 'Imagine', artist: 'John Lennon', duration: '3:03' },
    { title: 'Smells Like Teen Spirit', artist: 'Nirvana', duration: '5:01' },
    { title: 'Billie Jean', artist: 'Michael Jackson', duration: '4:54' },
    { title: 'Hey Jude', artist: 'The Beatles', duration: '7:11' },
    { title: 'Like a Rolling Stone', artist: 'Bob Dylan', duration: '6:13' },
    { title: 'Hotel California', artist: 'Eagles', duration: '6:30' }
  ];

  // Control para mostrar notificaciones estáticas (Toast)
  // Array que permite múltiples notificaciones del mismo tipo
  staticNotifications: Array<{
    id: number;
    type: 'success' | 'error' | 'warning' | 'info';
    title: string;
    message: string;
  }> = [];
  private notificationIdCounter = 0;

  // Control para Modal
  isModalOpen = signal(false);

  // Datos para Accordion
  accordionItems: AccordionItem[] = [
    {
      id: 1,
      title: '¿Qué es Disc and Records?',
      content: 'Una plataforma social para amantes de la música donde puedes descubrir, coleccionar y compartir tus álbumes y canciones favoritas.'
    },
    {
      id: 2,
      title: '¿Cómo añado música a mi colección?',
      content: 'Navega por nuestro catálogo, busca tus artistas favoritos y haz clic en el botón "Añadir a mi lista" en cualquier álbum o canción.'
    },
    {
      id: 3,
      title: '¿Puedo compartir mis listas de reproducción?',
      content: 'Sí, puedes hacer públicas tus listas y compartirlas con tus amigos o la comunidad. También puedes colaborar en listas compartidas.'
    },
    {
      id: 4,
      title: '¿Hay una aplicación móvil?',
      content: 'Actualmente estamos en desarrollo. Por ahora, nuestra web es totalmente responsive y funciona perfectamente en dispositivos móviles.'
    }
  ];

  // Datos para Tabs
  tabsExample: Tab[] = [
    { id: 'overview', label: 'Resumen', content: 'Información general del álbum, año de lanzamiento y géneros musicales.' },
    { id: 'tracklist', label: 'Lista de Canciones', content: 'Todas las canciones del álbum con duración y colaboradores.' },
    { id: 'reviews', label: 'Reseñas', content: 'Opiniones de la comunidad y críticas profesionales sobre este álbum.' },
    { id: 'similar', label: 'Similares', content: 'Álbumes y artistas similares que te podrían gustar.' }
  ];

  // Métodos para manejar notificaciones estáticas (Toast)
  // Cada llamada añade una nueva notificación al array
  showToast(type: 'success' | 'error' | 'warning' | 'info'): void {
    const messages = {
      success: { title: '¡Guardado!', message: 'Tu lista de reproducción se ha actualizado.' },
      error: { title: 'Error de conexión', message: 'No se pudo cargar la información del álbum.' },
      warning: { title: 'Sesión próxima a expirar', message: 'Tu sesión caducará en 2 minutos.' },
      info: { title: 'Nueva funcionalidad', message: 'Ahora puedes exportar tus listas de reproducción.' }
    };

    this.staticNotifications.push({
      id: ++this.notificationIdCounter,
      type,
      ...messages[type]
    });
  }

  // Elimina una notificación específica por su ID
  removeStaticNotification(id: number): void {
    const index = this.staticNotifications.findIndex(n => n.id === id);
    if (index !== -1) {
      this.staticNotifications.splice(index, 1);
    }
  }

  // Métodos para notificaciones dinámicas (MANIPULACIÓN DOM AVANZADA)
  showDynamicNotification(type: 'success' | 'error' | 'warning' | 'info'): void {
    const messages = {
      success: { title: '¡Éxito!', message: 'Notificación creada dinámicamente en el DOM' },
      error: { title: 'Error', message: 'Esta notificación fue creada con createElement' },
      warning: { title: 'Advertencia', message: 'Se creó el componente en tiempo de ejecución' },
      info: { title: 'Información', message: 'El componente se añadió al body con appendChild' }
    };

    this.notificationService.show({
      type,
      ...messages[type],
      duration: 0,
      autoDismiss: false,
      position: 'bottom-right'
    });
  }

  // Métodos para Modal
  openModal(): void {
    this.isModalOpen.set(true);
  }

  closeModal(): void {
    this.isModalOpen.set(false);
  }

  // Métodos para manipulación DOM de estilos (carousel)
  toggleCarouselHighlight(): void {
    if (this.demoCarousel) {
      this.demoCarousel.toggleHighlight();
    }
  }

  updateCarouselOpacity(event: Event): void {
    const input = event.target as HTMLInputElement;
    this.carouselOpacity = parseFloat(input.value);
    if (this.demoCarousel) {
      this.demoCarousel.setOpacity(this.carouselOpacity);
    }
  }
}

