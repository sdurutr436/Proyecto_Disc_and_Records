import {
  ForgotPasswordForm,
  LoginForm,
  RegisterForm
} from "./chunk-VN6ZFLCS.js";
import {
  Spinner
} from "./chunk-VQZYH7QQ.js";
import {
  Router,
  RouterLink,
  RouterOutlet,
  bootstrapApplication,
  provideRouter
} from "./chunk-BFARIXWD.js";
import {
  Modal
} from "./chunk-2MIYCLYX.js";
import "./chunk-CWMH7DMM.js";
import "./chunk-AVQDXX3C.js";
import "./chunk-MBYWNRDU.js";
import {
  CommonModule,
  Component,
  HostListener,
  Injectable,
  inject,
  provideBrowserGlobalErrorListeners,
  provideZoneChangeDetection,
  setClassMetadata,
  signal,
  ɵsetClassDebugInfo,
  ɵɵadvance,
  ɵɵattribute,
  ɵɵclassProp,
  ɵɵconditional,
  ɵɵconditionalCreate,
  ɵɵdefineComponent,
  ɵɵdefineInjectable,
  ɵɵelement,
  ɵɵelementEnd,
  ɵɵelementStart,
  ɵɵlistener,
  ɵɵnamespaceHTML,
  ɵɵnamespaceSVG,
  ɵɵprojection,
  ɵɵprojectionDef,
  ɵɵproperty,
  ɵɵresolveDocument,
  ɵɵtext,
  ɵɵtextInterpolate1
} from "./chunk-PFYGRVXA.js";

// src/app/app.routes.ts
var routes = [
  {
    path: "",
    loadComponent: () => import("./chunk-TN5M6M7U.js").then((m) => m.Home),
    title: "Inicio - Discs & Records"
  },
  {
    path: "search",
    loadComponent: () => import("./chunk-ANFFWIVC.js"),
    title: "Resultados de B\xFAsqueda - Discs & Records"
  },
  {
    path: "profile",
    loadComponent: () => import("./chunk-7ZWSDGYL.js"),
    title: "Perfil de Usuario - Discs & Records"
  },
  {
    path: "settings",
    loadComponent: () => import("./chunk-3YU3Z6BU.js"),
    title: "Ajustes de Perfil - Discs & Records",
    children: [
      {
        path: "",
        redirectTo: "profile",
        pathMatch: "full"
      },
      {
        path: "profile",
        loadComponent: () => import("./chunk-PUH3LOB2.js"),
        title: "Perfil - Ajustes"
      },
      {
        path: "account",
        loadComponent: () => import("./chunk-Q6YBFPMG.js"),
        title: "Cuenta - Ajustes"
      },
      {
        path: "preferences",
        loadComponent: () => import("./chunk-ONQ4T5KF.js"),
        title: "Preferencias - Ajustes"
      },
      {
        path: "security",
        loadComponent: () => import("./chunk-2CPZDFGW.js"),
        title: "Seguridad - Ajustes"
      }
    ]
  },
  {
    path: "style-guide",
    loadComponent: () => import("./chunk-FW3ZXBD3.js").then((m) => m.StyleGuide),
    title: "Gu\xEDa de Estilo - Discs & Records"
  },
  {
    path: "album/:id",
    loadComponent: () => import("./chunk-7MFA2CER.js").then((m) => m.DetailComponent),
    title: "Detalle de \xC1lbum - Discs & Records"
  },
  {
    path: "artist/:id",
    loadComponent: () => import("./chunk-7MFA2CER.js").then((m) => m.DetailComponent),
    title: "Detalle de Artista - Discs & Records"
  },
  {
    path: "song/:id",
    loadComponent: () => import("./chunk-7MFA2CER.js").then((m) => m.DetailComponent),
    title: "Detalle de Canci\xF3n - Discs & Records"
  },
  {
    path: "admin",
    loadComponent: () => import("./chunk-GQN5462T.js"),
    title: "Panel de Administraci\xF3n - Discs & Records",
    children: [
      {
        path: "",
        redirectTo: "albums",
        pathMatch: "full"
      },
      {
        path: "albums",
        loadComponent: () => import("./chunk-ZDMDLCYT.js"),
        title: "Gesti\xF3n de \xC1lbumes - Admin"
      },
      {
        path: "users",
        loadComponent: () => import("./chunk-ZCAAHLUS.js"),
        title: "Gesti\xF3n de Usuarios - Admin"
      },
      {
        path: "genres",
        loadComponent: () => import("./chunk-SOEW43JQ.js"),
        title: "Gesti\xF3n de G\xE9neros - Admin"
      },
      {
        path: "reviews",
        loadComponent: () => import("./chunk-REVWSAG4.js"),
        title: "Moderaci\xF3n de Rese\xF1as - Admin"
      }
    ]
  },
  {
    path: "404",
    loadComponent: () => import("./chunk-4YLQEIZ4.js"),
    title: "404 - P\xE1gina No Encontrada"
  },
  {
    path: "**",
    loadComponent: () => import("./chunk-4YLQEIZ4.js"),
    title: "404 - P\xE1gina No Encontrada"
  }
];

// src/app/app.config.ts
var appConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes)
  ]
};

// src/app/services/theme.ts
var ThemeService = class _ThemeService {
  STORAGE_KEY = "app-theme";
  /**
   * Signal reactivo para el tema actual
   */
  currentTheme = signal("light", ...ngDevMode ? [{ debugName: "currentTheme" }] : []);
  constructor() {
    this.loadTheme();
  }
  /**
   * Detectar preferencia de tema del sistema
   */
  detectSystemPreference() {
    if (typeof window === "undefined")
      return "light";
    const prefersDark = window.matchMedia("(prefers-color-scheme: dark)");
    return prefersDark.matches ? "dark-gray" : "light";
  }
  /**
   * Cargar tema desde localStorage o usar preferencia del sistema
   */
  loadTheme() {
    const savedTheme = this.getFromLocalStorage();
    if (savedTheme) {
      this.setTheme(savedTheme);
    } else {
      const systemTheme = this.detectSystemPreference();
      this.setTheme(systemTheme);
    }
    if (typeof window !== "undefined") {
      window.matchMedia("(prefers-color-scheme: dark)").addEventListener("change", (e) => {
        if (!this.getFromLocalStorage()) {
          this.setTheme(e.matches ? "dark-gray" : "light");
        }
      });
    }
  }
  /**
   * Cambiar el tema actual
   */
  setTheme(theme) {
    this.currentTheme.set(theme);
    this.applyTheme(theme);
  }
  /**
   * Rotación entre los 3 modos: light -> dark -> dark-gray -> light...
   */
  toggleTheme() {
    const currentTheme = this.currentTheme();
    let newTheme;
    switch (currentTheme) {
      case "light":
        newTheme = "dark";
        break;
      case "dark":
        newTheme = "dark-gray";
        break;
      case "dark-gray":
        newTheme = "light";
        break;
      default:
        newTheme = "light";
    }
    this.setTheme(newTheme);
    this.saveToLocalStorage(newTheme);
  }
  /**
   * Aplicar tema al documento
   */
  applyTheme(theme) {
    if (typeof document === "undefined")
      return;
    const root = document.documentElement;
    if (theme === "dark") {
      root.setAttribute("data-theme", "dark");
    } else if (theme === "dark-gray") {
      root.setAttribute("data-theme", "dark-gray");
    } else {
      root.removeAttribute("data-theme");
    }
  }
  /**
   * Guardar tema en localStorage
   */
  saveToLocalStorage(theme) {
    if (typeof localStorage === "undefined")
      return;
    localStorage.setItem(this.STORAGE_KEY, theme);
  }
  /**
   * Obtener tema desde localStorage
   */
  getFromLocalStorage() {
    if (typeof localStorage === "undefined")
      return null;
    const saved = localStorage.getItem(this.STORAGE_KEY);
    if (saved === "light" || saved === "dark" || saved === "dark-gray") {
      return saved;
    }
    return null;
  }
  static \u0275fac = function ThemeService_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _ThemeService)();
  };
  static \u0275prov = /* @__PURE__ */ \u0275\u0275defineInjectable({ token: _ThemeService, factory: _ThemeService.\u0275fac, providedIn: "root" });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(ThemeService, [{
    type: Injectable,
    args: [{
      providedIn: "root"
    }]
  }], () => [], null);
})();

// src/app/components/layout/header/header.ts
var Header = class _Header {
  router = inject(Router);
  isMenuOpen = signal(false, ...ngDevMode ? [{ debugName: "isMenuOpen" }] : []);
  themeService = inject(ThemeService);
  /**
   * Estado del modal activo
   * Controla cuál de los 3 modales de autenticación está visible
   */
  activeModal = signal("none", ...ngDevMode ? [{ debugName: "activeModal" }] : []);
  ngOnInit() {
    if (typeof window !== "undefined") {
      window.addEventListener("open-register-modal", this.handleOpenRegisterModal);
    }
  }
  ngOnDestroy() {
    if (typeof window !== "undefined") {
      window.removeEventListener("open-register-modal", this.handleOpenRegisterModal);
    }
  }
  /**
   * Manejador del evento personalizado
   */
  handleOpenRegisterModal = () => {
    this.openRegisterModal();
  };
  // ============================================
  // MÉTODOS DE NAVEGACIÓN
  // ============================================
  /**
   * Navegar a la página principal
   */
  navigateToHome() {
    this.router.navigate(["/"]);
  }
  // ============================================
  // MÉTODOS DEL MENÚ MÓVIL
  // ============================================
  toggleMenu() {
    this.isMenuOpen.set(!this.isMenuOpen());
  }
  closeMenu() {
    this.isMenuOpen.set(false);
  }
  /**
   * Toggle entre tema claro y oscuro
   */
  toggleTheme() {
    this.themeService.toggleTheme();
  }
  // ============================================
  // MÉTODOS DE MODALES DE AUTENTICACIÓN
  // ============================================
  /**
   * Abrir modal de login
   */
  openLoginModal() {
    this.activeModal.set("login");
  }
  /**
   * Abrir modal de registro
   */
  openRegisterModal() {
    this.activeModal.set("register");
  }
  /**
   * Abrir modal de recuperar contraseña
   */
  openForgotPasswordModal() {
    this.activeModal.set("forgot-password");
  }
  /**
   * Cerrar cualquier modal activo
   */
  closeAuthModal() {
    this.activeModal.set("none");
  }
  /**
   * Navegar de un modal a otro
   * Usado por los links dentro de los formularios
   */
  navigateToModal(modalType) {
    this.activeModal.set(modalType);
  }
  // ============================================
  // EVENT LISTENERS
  // ============================================
  /**
   * Cerrar menú al presionar ESC
   */
  onEscapeKey() {
    if (this.isMenuOpen()) {
      this.closeMenu();
    }
  }
  /**
   * Cerrar menú al hacer click fuera del menú móvil
   */
  onDocumentClick(event) {
    if (!this.isMenuOpen())
      return;
    const target = event.target;
    const mobileNav = target.closest(".header-nav__mobile");
    if (!mobileNav) {
      this.closeMenu();
    }
  }
  static \u0275fac = function Header_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _Header)();
  };
  static \u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _Header, selectors: [["app-header"]], hostBindings: function Header_HostBindings(rf, ctx) {
    if (rf & 1) {
      \u0275\u0275listener("keydown.escape", function Header_keydown_escape_HostBindingHandler() {
        return ctx.onEscapeKey();
      }, \u0275\u0275resolveDocument)("click", function Header_click_HostBindingHandler($event) {
        return ctx.onDocumentClick($event);
      }, \u0275\u0275resolveDocument);
    }
  }, decls: 17, vars: 3, consts: [[1, "header"], [1, "header__top"], [1, "header__top-container"], ["aria-hidden", "true", 1, "header__stripes"], ["type", "button", "aria-label", "Ir a la p\xE1gina principal", 1, "header__logo-wrapper", 3, "click"], ["src", "/assets/logo.png", "alt", "Discs & Records", 1, "header__logo"], [1, "header__buttons"], ["type", "button", 1, "header__btn", "header__btn--left", 3, "click"], ["type", "button", 1, "header__btn", "header__btn--right", 3, "click"], [3, "onClose", "isOpen"], [3, "onForgotPassword", "onRegister"], [3, "onLogin"], [3, "onBackToLogin"]], template: function Header_Template(rf, ctx) {
    if (rf & 1) {
      \u0275\u0275elementStart(0, "header", 0)(1, "div", 1)(2, "div", 2);
      \u0275\u0275element(3, "div", 3);
      \u0275\u0275elementStart(4, "button", 4);
      \u0275\u0275listener("click", function Header_Template_button_click_4_listener() {
        return ctx.navigateToHome();
      });
      \u0275\u0275element(5, "img", 5);
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(6, "div", 6)(7, "button", 7);
      \u0275\u0275listener("click", function Header_Template_button_click_7_listener() {
        return ctx.openRegisterModal();
      });
      \u0275\u0275text(8, " REGISTRARSE ");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(9, "button", 8);
      \u0275\u0275listener("click", function Header_Template_button_click_9_listener() {
        return ctx.openLoginModal();
      });
      \u0275\u0275text(10, " INICIAR SESI\xD3N ");
      \u0275\u0275elementEnd()()()()();
      \u0275\u0275elementStart(11, "app-modal", 9);
      \u0275\u0275listener("onClose", function Header_Template_app_modal_onClose_11_listener() {
        return ctx.closeAuthModal();
      });
      \u0275\u0275elementStart(12, "app-login-form", 10);
      \u0275\u0275listener("onForgotPassword", function Header_Template_app_login_form_onForgotPassword_12_listener() {
        return ctx.navigateToModal("forgot-password");
      })("onRegister", function Header_Template_app_login_form_onRegister_12_listener() {
        return ctx.navigateToModal("register");
      });
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(13, "app-modal", 9);
      \u0275\u0275listener("onClose", function Header_Template_app_modal_onClose_13_listener() {
        return ctx.closeAuthModal();
      });
      \u0275\u0275elementStart(14, "app-register-form", 11);
      \u0275\u0275listener("onLogin", function Header_Template_app_register_form_onLogin_14_listener() {
        return ctx.navigateToModal("login");
      });
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(15, "app-modal", 9);
      \u0275\u0275listener("onClose", function Header_Template_app_modal_onClose_15_listener() {
        return ctx.closeAuthModal();
      });
      \u0275\u0275elementStart(16, "app-forgot-password-form", 12);
      \u0275\u0275listener("onBackToLogin", function Header_Template_app_forgot_password_form_onBackToLogin_16_listener() {
        return ctx.navigateToModal("login");
      });
      \u0275\u0275elementEnd()();
    }
    if (rf & 2) {
      \u0275\u0275advance(11);
      \u0275\u0275property("isOpen", ctx.activeModal() === "login");
      \u0275\u0275advance(2);
      \u0275\u0275property("isOpen", ctx.activeModal() === "register");
      \u0275\u0275advance(2);
      \u0275\u0275property("isOpen", ctx.activeModal() === "forgot-password");
    }
  }, dependencies: [CommonModule, Modal, LoginForm, RegisterForm, ForgotPasswordForm], styles: ['@charset "UTF-8";\n\n\n\n.header[_ngcontent-%COMP%] {\n  width: 100%;\n  background-color: var(--bg-primary);\n  position: relative;\n  z-index: 1;\n}\n.header__top[_ngcontent-%COMP%] {\n  width: 100%;\n  background-color: var(--header-bg);\n  padding: 2rem 0;\n  position: relative;\n  z-index: 1;\n  overflow: hidden;\n}\n.header__top-container[_ngcontent-%COMP%] {\n  max-width: 1440px;\n  margin: 0 auto;\n  padding: 0.25rem 0.5rem;\n  display: flex;\n  flex-direction: row;\n  gap: 0;\n  align-items: center;\n  justify-content: center;\n  position: relative;\n}\n.header__logo-wrapper[_ngcontent-%COMP%] {\n  position: relative;\n  z-index: 2;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  width: 140px;\n  height: 140px;\n  border-radius: 50%;\n  flex-shrink: 0;\n  margin: 0;\n  order: 2;\n  background: transparent;\n  border: none;\n  padding: 0;\n  cursor: pointer;\n  transition: transform 0.3s ease;\n}\n.header__logo-wrapper[_ngcontent-%COMP%]:hover {\n  transform: scale(1.05);\n}\n.header__logo-wrapper[_ngcontent-%COMP%]:active {\n  transform: scale(0.98);\n}\n.header__logo-wrapper[_ngcontent-%COMP%]:focus {\n  outline: 2px solid var(--color-primary);\n  outline-offset: 4px;\n}\n.header__stripes[_ngcontent-%COMP%] {\n  position: absolute;\n  top: 50%;\n  left: 50%;\n  transform: translate(-50%, -50%) rotate(135deg);\n  width: 1500px;\n  height: 3000px;\n  z-index: 1;\n  pointer-events: none;\n}\n.header__stripes[_ngcontent-%COMP%]::before {\n  content: "";\n  position: absolute;\n  width: 100%;\n  height: 100%;\n  background:\n    linear-gradient(\n      to bottom,\n      transparent 0,\n      transparent calc(50% - 1.875rem - 8px),\n      #AAD661 calc(50% - 1.875rem - 8px),\n      #AAD661 calc(50% - 1.125rem - 8px),\n      transparent calc(50% - 1.125rem - 8px),\n      transparent calc(50% - 1.125rem - 4px),\n      #0A9295 calc(50% - 1.125rem - 4px),\n      #0A9295 calc(50% - 0.375rem - 4px),\n      transparent calc(50% - 0.375rem - 4px),\n      transparent calc(50% - 0.375rem),\n      #FFC047 calc(50% - 0.375rem),\n      #FFC047 calc(50% + 0.375rem),\n      transparent calc(50% + 0.375rem),\n      transparent calc(50% + 0.375rem + 4px),\n      #FEF84A calc(50% + 0.375rem + 4px),\n      #FEF84A calc(50% + 1.125rem + 4px),\n      transparent calc(50% + 1.125rem + 4px),\n      transparent calc(50% + 1.125rem + 8px),\n      #E04A4A calc(50% + 1.125rem + 8px),\n      #E04A4A calc(50% + 1.875rem + 8px),\n      transparent calc(50% + 1.875rem + 8px),\n      transparent 100%);\n}\n.header__logo[_ngcontent-%COMP%] {\n  display: block;\n  height: 16rem;\n  width: auto;\n  position: relative;\n  z-index: 2;\n  transition: transform 0.3s ease;\n}\n.header__logo[_ngcontent-%COMP%]:hover {\n  transform: rotate(25deg);\n}\n.header__buttons[_ngcontent-%COMP%] {\n  display: contents;\n}\n.header__btn[_ngcontent-%COMP%] {\n  font-family: "Space Grotesk", sans-serif;\n  font-size: 0.875rem;\n  font-weight: 800;\n  padding: 1rem 4rem;\n  border: 3px solid var(--border-color);\n  border-radius: 9999px;\n  background-color: var(--bg-secondary);\n  color: var(--text-primary);\n  cursor: pointer;\n  transition: all 0.2s ease;\n  text-transform: uppercase;\n  letter-spacing: 0.05em;\n  box-shadow: 4px 4px 0px var(--shadow-color);\n  position: relative;\n  z-index: 2;\n  white-space: nowrap;\n  min-width: 20rem;\n  margin: 0;\n}\n.header__btn[_ngcontent-%COMP%]:hover:not(:disabled):not(.button--disabled) {\n  box-shadow: 2px 2px 0px var(--shadow-color);\n  transform: translate(2px, 2px);\n}\n.header__btn[_ngcontent-%COMP%]:active:not(:disabled):not(.button--disabled) {\n  box-shadow: 0px 0px 0px var(--shadow-color);\n  transform: translate(4px, 4px);\n}\n.header__btn[_ngcontent-%COMP%]:focus-visible {\n  outline: 3px solid var(--color-accent);\n  outline-offset: 2px;\n}\n.header__btn--left[_ngcontent-%COMP%] {\n  order: 1;\n  margin-right: 6px;\n  border-top-right-radius: 0;\n  border-bottom-right-radius: 0;\n}\n.header__btn--right[_ngcontent-%COMP%] {\n  order: 3;\n  margin-left: 6px;\n  z-index: 0;\n  border-top-left-radius: 0;\n  border-bottom-left-radius: 0;\n}\n@media (max-width: 767px) {\n  .header__top-container[_ngcontent-%COMP%] {\n    flex-direction: column;\n    gap: 1rem;\n    padding: 1rem;\n  }\n  .header__logo-wrapper[_ngcontent-%COMP%] {\n    width: 80px;\n    height: 80px;\n    order: 1;\n  }\n  .header__logo[_ngcontent-%COMP%] {\n    height: 10rem;\n  }\n  .header__stripes[_ngcontent-%COMP%] {\n    transform: translate(-50%, -50%) rotate(0deg);\n    width: 100%;\n    height: 100vh;\n    z-index: 0;\n  }\n  .header__stripes[_ngcontent-%COMP%]::before {\n    background:\n      linear-gradient(\n        to right,\n        transparent 0,\n        transparent calc(50% - 1.875rem - 8px),\n        #AAD661 calc(50% - 1.875rem - 8px),\n        #AAD661 calc(50% - 1.125rem - 8px),\n        transparent calc(50% - 1.125rem - 8px),\n        transparent calc(50% - 1.125rem - 4px),\n        #0A9295 calc(50% - 1.125rem - 4px),\n        #0A9295 calc(50% - 0.375rem - 4px),\n        transparent calc(50% - 0.375rem - 4px),\n        transparent calc(50% - 0.375rem),\n        #FFC047 calc(50% - 0.375rem),\n        #FFC047 calc(50% + 0.375rem),\n        transparent calc(50% + 0.375rem),\n        transparent calc(50% + 0.375rem + 4px),\n        #FEF84A calc(50% + 0.375rem + 4px),\n        #FEF84A calc(50% + 1.125rem + 4px),\n        transparent calc(50% + 1.125rem + 4px),\n        transparent calc(50% + 1.125rem + 8px),\n        #E04A4A calc(50% + 1.125rem + 8px),\n        #E04A4A calc(50% + 1.875rem + 8px),\n        transparent calc(50% + 1.875rem + 8px),\n        transparent 100%);\n  }\n  .header__buttons[_ngcontent-%COMP%] {\n    display: flex;\n    width: 100%;\n    gap: 0;\n    order: 2;\n    justify-content: center;\n  }\n  .header__btn[_ngcontent-%COMP%] {\n    flex: 1;\n    min-width: auto;\n    font-size: 0.75rem;\n    padding: 0.5rem 2rem;\n    max-width: 50%;\n    z-index: 1;\n    border-radius: 5px;\n  }\n  .header__btn--left[_ngcontent-%COMP%] {\n    order: 1;\n    border-right: none;\n    border-top-right-radius: 0;\n    border-bottom-right-radius: 0;\n    border-top-left-radius: 9999px;\n    border-bottom-left-radius: 9999px;\n    margin-right: 0;\n  }\n  .header__btn--right[_ngcontent-%COMP%] {\n    order: 2;\n    border-left: none;\n    border-top-left-radius: 0;\n    border-bottom-left-radius: 0;\n    border-top-right-radius: 9999px;\n    border-bottom-right-radius: 9999px;\n    margin-left: -3px;\n  }\n}\n/*# sourceMappingURL=header.css.map */'] });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(Header, [{
    type: Component,
    args: [{ selector: "app-header", imports: [CommonModule, Modal, LoginForm, RegisterForm, ForgotPasswordForm], template: `<!-- Parte superior del header (logo y botones) - se va con scroll -->\r
<header class="header">\r
  <div class="header__top">\r
    <div class="header__top-container">\r
      <!-- Barras de colores FUERA del logo-wrapper -->\r
      <div class="header__stripes" aria-hidden="true"></div>\r
\r
      <!-- Logo central - clickeable para ir al home -->\r
      <button\r
        class="header__logo-wrapper"\r
        (click)="navigateToHome()"\r
        type="button"\r
        aria-label="Ir a la p\xE1gina principal">\r
        <img src="/assets/logo.png" alt="Discs & Records" class="header__logo" />\r
      </button>\r
\r
      <!-- Botones debajo del logo -->\r
      <div class="header__buttons">\r
        <button\r
          class="header__btn header__btn--left"\r
          (click)="openRegisterModal()"\r
          type="button">\r
          REGISTRARSE\r
        </button>\r
        <button\r
          class="header__btn header__btn--right"\r
          (click)="openLoginModal()"\r
          type="button">\r
          INICIAR SESI\xD3N\r
        </button>\r
      </div>\r
    </div>\r
  </div>\r
</header>\r
\r
<!-- ========================================\r
     MODALES DE AUTENTICACI\xD3N\r
     ======================================== -->\r
\r
<!-- Modal de Login -->\r
<app-modal\r
  [isOpen]="activeModal() === 'login'"\r
  (onClose)="closeAuthModal()">\r
  <app-login-form\r
    (onForgotPassword)="navigateToModal('forgot-password')"\r
    (onRegister)="navigateToModal('register')">\r
  </app-login-form>\r
</app-modal>\r
\r
<!-- Modal de Registro -->\r
<app-modal\r
  [isOpen]="activeModal() === 'register'"\r
  (onClose)="closeAuthModal()">\r
  <app-register-form\r
    (onLogin)="navigateToModal('login')">\r
  </app-register-form>\r
</app-modal>\r
\r
<!-- Modal de Recuperar Contrase\xF1a -->\r
<app-modal\r
  [isOpen]="activeModal() === 'forgot-password'"\r
  (onClose)="closeAuthModal()">\r
  <app-forgot-password-form\r
    (onBackToLogin)="navigateToModal('login')">\r
  </app-forgot-password-form>\r
</app-modal>\r
`, styles: ['@charset "UTF-8";\n\n/* src/app/components/layout/header/header.scss */\n.header {\n  width: 100%;\n  background-color: var(--bg-primary);\n  position: relative;\n  z-index: 1;\n}\n.header__top {\n  width: 100%;\n  background-color: var(--header-bg);\n  padding: 2rem 0;\n  position: relative;\n  z-index: 1;\n  overflow: hidden;\n}\n.header__top-container {\n  max-width: 1440px;\n  margin: 0 auto;\n  padding: 0.25rem 0.5rem;\n  display: flex;\n  flex-direction: row;\n  gap: 0;\n  align-items: center;\n  justify-content: center;\n  position: relative;\n}\n.header__logo-wrapper {\n  position: relative;\n  z-index: 2;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  width: 140px;\n  height: 140px;\n  border-radius: 50%;\n  flex-shrink: 0;\n  margin: 0;\n  order: 2;\n  background: transparent;\n  border: none;\n  padding: 0;\n  cursor: pointer;\n  transition: transform 0.3s ease;\n}\n.header__logo-wrapper:hover {\n  transform: scale(1.05);\n}\n.header__logo-wrapper:active {\n  transform: scale(0.98);\n}\n.header__logo-wrapper:focus {\n  outline: 2px solid var(--color-primary);\n  outline-offset: 4px;\n}\n.header__stripes {\n  position: absolute;\n  top: 50%;\n  left: 50%;\n  transform: translate(-50%, -50%) rotate(135deg);\n  width: 1500px;\n  height: 3000px;\n  z-index: 1;\n  pointer-events: none;\n}\n.header__stripes::before {\n  content: "";\n  position: absolute;\n  width: 100%;\n  height: 100%;\n  background:\n    linear-gradient(\n      to bottom,\n      transparent 0,\n      transparent calc(50% - 1.875rem - 8px),\n      #AAD661 calc(50% - 1.875rem - 8px),\n      #AAD661 calc(50% - 1.125rem - 8px),\n      transparent calc(50% - 1.125rem - 8px),\n      transparent calc(50% - 1.125rem - 4px),\n      #0A9295 calc(50% - 1.125rem - 4px),\n      #0A9295 calc(50% - 0.375rem - 4px),\n      transparent calc(50% - 0.375rem - 4px),\n      transparent calc(50% - 0.375rem),\n      #FFC047 calc(50% - 0.375rem),\n      #FFC047 calc(50% + 0.375rem),\n      transparent calc(50% + 0.375rem),\n      transparent calc(50% + 0.375rem + 4px),\n      #FEF84A calc(50% + 0.375rem + 4px),\n      #FEF84A calc(50% + 1.125rem + 4px),\n      transparent calc(50% + 1.125rem + 4px),\n      transparent calc(50% + 1.125rem + 8px),\n      #E04A4A calc(50% + 1.125rem + 8px),\n      #E04A4A calc(50% + 1.875rem + 8px),\n      transparent calc(50% + 1.875rem + 8px),\n      transparent 100%);\n}\n.header__logo {\n  display: block;\n  height: 16rem;\n  width: auto;\n  position: relative;\n  z-index: 2;\n  transition: transform 0.3s ease;\n}\n.header__logo:hover {\n  transform: rotate(25deg);\n}\n.header__buttons {\n  display: contents;\n}\n.header__btn {\n  font-family: "Space Grotesk", sans-serif;\n  font-size: 0.875rem;\n  font-weight: 800;\n  padding: 1rem 4rem;\n  border: 3px solid var(--border-color);\n  border-radius: 9999px;\n  background-color: var(--bg-secondary);\n  color: var(--text-primary);\n  cursor: pointer;\n  transition: all 0.2s ease;\n  text-transform: uppercase;\n  letter-spacing: 0.05em;\n  box-shadow: 4px 4px 0px var(--shadow-color);\n  position: relative;\n  z-index: 2;\n  white-space: nowrap;\n  min-width: 20rem;\n  margin: 0;\n}\n.header__btn:hover:not(:disabled):not(.button--disabled) {\n  box-shadow: 2px 2px 0px var(--shadow-color);\n  transform: translate(2px, 2px);\n}\n.header__btn:active:not(:disabled):not(.button--disabled) {\n  box-shadow: 0px 0px 0px var(--shadow-color);\n  transform: translate(4px, 4px);\n}\n.header__btn:focus-visible {\n  outline: 3px solid var(--color-accent);\n  outline-offset: 2px;\n}\n.header__btn--left {\n  order: 1;\n  margin-right: 6px;\n  border-top-right-radius: 0;\n  border-bottom-right-radius: 0;\n}\n.header__btn--right {\n  order: 3;\n  margin-left: 6px;\n  z-index: 0;\n  border-top-left-radius: 0;\n  border-bottom-left-radius: 0;\n}\n@media (max-width: 767px) {\n  .header__top-container {\n    flex-direction: column;\n    gap: 1rem;\n    padding: 1rem;\n  }\n  .header__logo-wrapper {\n    width: 80px;\n    height: 80px;\n    order: 1;\n  }\n  .header__logo {\n    height: 10rem;\n  }\n  .header__stripes {\n    transform: translate(-50%, -50%) rotate(0deg);\n    width: 100%;\n    height: 100vh;\n    z-index: 0;\n  }\n  .header__stripes::before {\n    background:\n      linear-gradient(\n        to right,\n        transparent 0,\n        transparent calc(50% - 1.875rem - 8px),\n        #AAD661 calc(50% - 1.875rem - 8px),\n        #AAD661 calc(50% - 1.125rem - 8px),\n        transparent calc(50% - 1.125rem - 8px),\n        transparent calc(50% - 1.125rem - 4px),\n        #0A9295 calc(50% - 1.125rem - 4px),\n        #0A9295 calc(50% - 0.375rem - 4px),\n        transparent calc(50% - 0.375rem - 4px),\n        transparent calc(50% - 0.375rem),\n        #FFC047 calc(50% - 0.375rem),\n        #FFC047 calc(50% + 0.375rem),\n        transparent calc(50% + 0.375rem),\n        transparent calc(50% + 0.375rem + 4px),\n        #FEF84A calc(50% + 0.375rem + 4px),\n        #FEF84A calc(50% + 1.125rem + 4px),\n        transparent calc(50% + 1.125rem + 4px),\n        transparent calc(50% + 1.125rem + 8px),\n        #E04A4A calc(50% + 1.125rem + 8px),\n        #E04A4A calc(50% + 1.875rem + 8px),\n        transparent calc(50% + 1.875rem + 8px),\n        transparent 100%);\n  }\n  .header__buttons {\n    display: flex;\n    width: 100%;\n    gap: 0;\n    order: 2;\n    justify-content: center;\n  }\n  .header__btn {\n    flex: 1;\n    min-width: auto;\n    font-size: 0.75rem;\n    padding: 0.5rem 2rem;\n    max-width: 50%;\n    z-index: 1;\n    border-radius: 5px;\n  }\n  .header__btn--left {\n    order: 1;\n    border-right: none;\n    border-top-right-radius: 0;\n    border-bottom-right-radius: 0;\n    border-top-left-radius: 9999px;\n    border-bottom-left-radius: 9999px;\n    margin-right: 0;\n  }\n  .header__btn--right {\n    order: 2;\n    border-left: none;\n    border-top-left-radius: 0;\n    border-bottom-left-radius: 0;\n    border-top-right-radius: 9999px;\n    border-bottom-right-radius: 9999px;\n    margin-left: -3px;\n  }\n}\n/*# sourceMappingURL=header.css.map */\n'] }]
  }], null, { onEscapeKey: [{
    type: HostListener,
    args: ["document:keydown.escape"]
  }], onDocumentClick: [{
    type: HostListener,
    args: ["document:click", ["$event"]]
  }] });
})();
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(Header, { className: "Header", filePath: "src/app/components/layout/header/header.ts", lineNumber: 21 });
})();

// src/app/components/layout/footer/footer.ts
var Footer = class _Footer {
  static \u0275fac = function Footer_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _Footer)();
  };
  static \u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _Footer, selectors: [["app-footer"]], decls: 19, vars: 0, consts: [[1, "footer"], [1, "footer__content"], ["aria-hidden", "true", 1, "footer__stripes"], [1, "footer__buttons-left"], ["routerLink", "/404", 1, "footer__btn", "footer__btn--left-top"], ["routerLink", "/profile", 1, "footer__btn", "footer__btn--left-middle"], ["routerLink", "/404", 1, "footer__btn", "footer__btn--left-bottom"], [1, "footer__logo-wrapper"], ["src", "/assets/logo.png", "alt", "Discs & Records", 1, "footer__logo"], [1, "footer__buttons-right"], ["routerLink", "/404", 1, "footer__btn", "footer__btn--right-top"], ["routerLink", "/profile", 1, "footer__btn", "footer__btn--right-middle"], ["routerLink", "/404", 1, "footer__btn", "footer__btn--right-bottom"]], template: function Footer_Template(rf, ctx) {
    if (rf & 1) {
      \u0275\u0275elementStart(0, "footer", 0)(1, "div", 1);
      \u0275\u0275element(2, "div", 2);
      \u0275\u0275elementStart(3, "div", 3)(4, "a", 4);
      \u0275\u0275text(5, "API de Desarrollo");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(6, "a", 5);
      \u0275\u0275text(7, "Mi perfil");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(8, "a", 6);
      \u0275\u0275text(9, "Contacto");
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(10, "div", 7);
      \u0275\u0275element(11, "img", 8);
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(12, "div", 9)(13, "a", 10);
      \u0275\u0275text(14, "Sobre nosotros");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(15, "a", 11);
      \u0275\u0275text(16, "Mi perfil");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(17, "a", 12);
      \u0275\u0275text(18, "Privacidad");
      \u0275\u0275elementEnd()()()();
    }
  }, dependencies: [RouterLink], styles: ['@charset "UTF-8";\n\n\n\n.footer[_ngcontent-%COMP%] {\n  width: 100%;\n  background-color: var(--header-bg);\n  border-top: 4px solid var(--border-color);\n  margin-top: auto;\n  padding: 4rem 0;\n  overflow: hidden;\n  position: relative;\n  z-index: 2;\n  transition: padding 300ms ease-in-out;\n}\n.footer__content[_ngcontent-%COMP%] {\n  max-width: 1440px;\n  margin: 0 auto;\n  padding: 0 2rem;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  gap: 0;\n  position: relative;\n  transition:\n    flex-direction 300ms ease-in-out,\n    gap 300ms ease-in-out,\n    padding 300ms ease-in-out;\n}\n.footer__stripes[_ngcontent-%COMP%] {\n  position: absolute;\n  top: 50%;\n  left: 50%;\n  transform: translate(-50%, -50%) rotate(135deg);\n  width: 1500px;\n  height: 3000px;\n  z-index: 0;\n  pointer-events: none;\n}\n.footer__stripes[_ngcontent-%COMP%]::before {\n  content: "";\n  position: absolute;\n  width: 100%;\n  height: 100%;\n  background:\n    linear-gradient(\n      to bottom,\n      transparent 0,\n      transparent calc(50% - 1.875rem - 8px),\n      #AAD661 calc(50% - 1.875rem - 8px),\n      #AAD661 calc(50% - 1.125rem - 8px),\n      transparent calc(50% - 1.125rem - 8px),\n      transparent calc(50% - 1.125rem - 4px),\n      #0A9295 calc(50% - 1.125rem - 4px),\n      #0A9295 calc(50% - 0.375rem - 4px),\n      transparent calc(50% - 0.375rem - 4px),\n      transparent calc(50% - 0.375rem),\n      #FFC047 calc(50% - 0.375rem),\n      #FFC047 calc(50% + 0.375rem),\n      transparent calc(50% + 0.375rem),\n      transparent calc(50% + 0.375rem + 4px),\n      #FEF84A calc(50% + 0.375rem + 4px),\n      #FEF84A calc(50% + 1.125rem + 4px),\n      transparent calc(50% + 1.125rem + 4px),\n      transparent calc(50% + 1.125rem + 8px),\n      #E04A4A calc(50% + 1.125rem + 8px),\n      #E04A4A calc(50% + 1.875rem + 8px),\n      transparent calc(50% + 1.875rem + 8px),\n      transparent 100%);\n}\n.footer__buttons-left[_ngcontent-%COMP%], \n.footer__buttons-right[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  gap: 0;\n  position: relative;\n  z-index: 1;\n}\n.footer__buttons-left[_ngcontent-%COMP%] {\n  align-items: flex-end;\n}\n.footer__buttons-right[_ngcontent-%COMP%] {\n  align-items: flex-start;\n}\n.footer__logo-wrapper[_ngcontent-%COMP%] {\n  position: absolute;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  z-index: 2;\n  left: 50%;\n  transform: translateX(-50%);\n  transition: all 300ms ease-in-out;\n}\n.footer__logo[_ngcontent-%COMP%] {\n  display: block;\n  height: 13rem;\n  width: auto;\n  position: relative;\n  transition: transform 150ms ease-in-out;\n}\n.footer__logo[_ngcontent-%COMP%]:hover {\n  transform: rotate(25deg);\n}\n.footer__btn[_ngcontent-%COMP%] {\n  display: inline-block;\n  font-family: "Space Grotesk", sans-serif;\n  font-size: 0.875rem;\n  font-weight: 600;\n  padding: 0.5rem 3rem;\n  border: 3px solid var(--border-color);\n  background-color: var(--bg-secondary);\n  color: var(--text-primary);\n  cursor: pointer;\n  transition:\n    all 150ms ease-in-out,\n    border-radius 300ms ease-in-out,\n    width 300ms ease-in-out,\n    min-width 300ms ease-in-out;\n  text-transform: uppercase;\n  letter-spacing: 0.02em;\n  box-shadow: 6px 6px 0px #01131B;\n  position: relative;\n  white-space: nowrap;\n  min-width: 400px;\n  text-align: center;\n  text-decoration: none;\n}\n.footer__btn[_ngcontent-%COMP%]:hover {\n  box-shadow: 4px 4px 0px #01131B;\n  transform: translate(2px, 2px);\n}\n.footer__btn[_ngcontent-%COMP%]:active {\n  box-shadow: 0px 0px 0px #01131B;\n  transform: translate(4px, 4px);\n}\n.footer__btn[_ngcontent-%COMP%]:focus-visible {\n  outline: 3px solid var(--color-accent);\n  outline-offset: 2px;\n}\n.footer__btn--left-top[_ngcontent-%COMP%] {\n  border-radius: 9999px 0 0 0;\n  border-right: none;\n}\n.footer__btn--left-middle[_ngcontent-%COMP%] {\n  background-color: var(--color-primary);\n  min-width: 440px;\n  border-right: none;\n  border-radius: 9999px 0 0 9999px;\n  border-top: 3px solid var(--border-color);\n  border-top-color: var(--border-color);\n}\n.footer__btn--left-bottom[_ngcontent-%COMP%] {\n  border-right: none;\n  border-radius: 0 0 0 9999px;\n  border-top: 3px solid var(--border-color);\n}\n.footer__btn--right-top[_ngcontent-%COMP%] {\n  border-radius: 0 9999px 0 0;\n  border-left: none;\n}\n.footer__btn--right-middle[_ngcontent-%COMP%] {\n  background-color: var(--color-primary);\n  min-width: 440px;\n  border-left: none;\n  border-radius: 0 9999px 9999px 0;\n  border-top: 3px solid var(--border-color);\n  border-top-color: var(--border-color);\n}\n.footer__btn--right-bottom[_ngcontent-%COMP%] {\n  border-left: none;\n  border-radius: 0 0 9999px 0;\n  border-top: 3px solid var(--border-color);\n}\n@media (max-width: 767px) {\n  .footer[_ngcontent-%COMP%] {\n    padding: 0.5rem 0;\n  }\n  .footer__content[_ngcontent-%COMP%] {\n    flex-direction: column;\n    gap: 0;\n    padding: 0.5rem;\n  }\n  .footer__logo-wrapper[_ngcontent-%COMP%] {\n    position: relative;\n    left: auto;\n    transform: none;\n    order: 1;\n    z-index: 1;\n    margin-bottom: 0.5rem;\n    margin-top: 0;\n  }\n  .footer__logo[_ngcontent-%COMP%] {\n    height: 8rem;\n  }\n  .footer__stripes[_ngcontent-%COMP%] {\n    transform: translate(-50%, -50%) rotate(0deg);\n    width: 100%;\n    height: 100vh;\n    z-index: 0;\n  }\n  .footer__stripes[_ngcontent-%COMP%]::before {\n    background:\n      linear-gradient(\n        to right,\n        transparent 0,\n        transparent calc(50% - 1.875rem - 8px),\n        #AAD661 calc(50% - 1.875rem - 8px),\n        #AAD661 calc(50% - 1.125rem - 8px),\n        transparent calc(50% - 1.125rem - 8px),\n        transparent calc(50% - 1.125rem - 4px),\n        #0A9295 calc(50% - 1.125rem - 4px),\n        #0A9295 calc(50% - 0.375rem - 4px),\n        transparent calc(50% - 0.375rem - 4px),\n        transparent calc(50% - 0.375rem),\n        #FFC047 calc(50% - 0.375rem),\n        #FFC047 calc(50% + 0.375rem),\n        transparent calc(50% + 0.375rem),\n        transparent calc(50% + 0.375rem + 4px),\n        #FEF84A calc(50% + 0.375rem + 4px),\n        #FEF84A calc(50% + 1.125rem + 4px),\n        transparent calc(50% + 1.125rem + 4px),\n        transparent calc(50% + 1.125rem + 8px),\n        #E04A4A calc(50% + 1.125rem + 8px),\n        #E04A4A calc(50% + 1.875rem + 8px),\n        transparent calc(50% + 1.875rem + 8px),\n        transparent 100%);\n  }\n  .footer__buttons-left[_ngcontent-%COMP%] {\n    width: 100%;\n    order: 2;\n    z-index: 1;\n    align-items: stretch;\n  }\n  .footer__buttons-right[_ngcontent-%COMP%] {\n    width: 100%;\n    order: 2;\n    z-index: 1;\n    align-items: stretch;\n  }\n  .footer__btn[_ngcontent-%COMP%] {\n    width: 100%;\n    min-width: auto;\n    padding: 0.5rem 2rem;\n    font-size: 0.75rem;\n    border: 3px solid var(--border-color);\n    border-radius: 0;\n    margin: 0;\n    margin-top: 0.5rem;\n  }\n  .footer__btn--left-top[_ngcontent-%COMP%] {\n    border-radius: 9999px 9999px 0 0;\n    border-top: 3px solid var(--border-color);\n    margin-top: 0;\n  }\n  .footer__btn--left-middle[_ngcontent-%COMP%] {\n    border-radius: 5px;\n  }\n  .footer__btn--left-bottom[_ngcontent-%COMP%] {\n    border-radius: 9999px;\n  }\n  .footer__btn--right-top[_ngcontent-%COMP%] {\n    border-radius: 9999px;\n  }\n  .footer__btn--right-middle[_ngcontent-%COMP%] {\n    border-radius: 5px;\n  }\n  .footer__btn--right-bottom[_ngcontent-%COMP%] {\n    border-radius: 0 0 9999px 9999px;\n  }\n}\n/*# sourceMappingURL=footer.css.map */'] });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(Footer, [{
    type: Component,
    args: [{ selector: "app-footer", imports: [RouterLink], template: '<footer class="footer">\r\n  <div class="footer__content">\r\n    <!-- STRIPES AQU\xCD, fuera del logo-wrapper -->\r\n    <div class="footer__stripes" aria-hidden="true"></div>\r\n\r\n    <!-- Columna izquierda: 3 botones apilados -->\r\n    <div class="footer__buttons-left">\r\n      <a routerLink="/404" class="footer__btn footer__btn--left-top">API de Desarrollo</a>\r\n      <a routerLink="/profile" class="footer__btn footer__btn--left-middle">Mi perfil</a>\r\n      <a routerLink="/404" class="footer__btn footer__btn--left-bottom">Contacto</a>\r\n    </div>\r\n\r\n    <!-- Centro: Logo SIN barras de colores dentro -->\r\n    <div class="footer__logo-wrapper">\r\n      <img src="/assets/logo.png" alt="Discs & Records" class="footer__logo" />\r\n    </div>\r\n\r\n    <!-- Columna derecha: 3 botones apilados -->\r\n    <div class="footer__buttons-right">\r\n      <a routerLink="/404" class="footer__btn footer__btn--right-top">Sobre nosotros</a>\r\n      <a routerLink="/profile" class="footer__btn footer__btn--right-middle">Mi perfil</a>\r\n      <a routerLink="/404" class="footer__btn footer__btn--right-bottom">Privacidad</a>\r\n    </div>\r\n  </div>\r\n</footer>\r\n', styles: ['@charset "UTF-8";\n\n/* src/app/components/layout/footer/footer.scss */\n.footer {\n  width: 100%;\n  background-color: var(--header-bg);\n  border-top: 4px solid var(--border-color);\n  margin-top: auto;\n  padding: 4rem 0;\n  overflow: hidden;\n  position: relative;\n  z-index: 2;\n  transition: padding 300ms ease-in-out;\n}\n.footer__content {\n  max-width: 1440px;\n  margin: 0 auto;\n  padding: 0 2rem;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  gap: 0;\n  position: relative;\n  transition:\n    flex-direction 300ms ease-in-out,\n    gap 300ms ease-in-out,\n    padding 300ms ease-in-out;\n}\n.footer__stripes {\n  position: absolute;\n  top: 50%;\n  left: 50%;\n  transform: translate(-50%, -50%) rotate(135deg);\n  width: 1500px;\n  height: 3000px;\n  z-index: 0;\n  pointer-events: none;\n}\n.footer__stripes::before {\n  content: "";\n  position: absolute;\n  width: 100%;\n  height: 100%;\n  background:\n    linear-gradient(\n      to bottom,\n      transparent 0,\n      transparent calc(50% - 1.875rem - 8px),\n      #AAD661 calc(50% - 1.875rem - 8px),\n      #AAD661 calc(50% - 1.125rem - 8px),\n      transparent calc(50% - 1.125rem - 8px),\n      transparent calc(50% - 1.125rem - 4px),\n      #0A9295 calc(50% - 1.125rem - 4px),\n      #0A9295 calc(50% - 0.375rem - 4px),\n      transparent calc(50% - 0.375rem - 4px),\n      transparent calc(50% - 0.375rem),\n      #FFC047 calc(50% - 0.375rem),\n      #FFC047 calc(50% + 0.375rem),\n      transparent calc(50% + 0.375rem),\n      transparent calc(50% + 0.375rem + 4px),\n      #FEF84A calc(50% + 0.375rem + 4px),\n      #FEF84A calc(50% + 1.125rem + 4px),\n      transparent calc(50% + 1.125rem + 4px),\n      transparent calc(50% + 1.125rem + 8px),\n      #E04A4A calc(50% + 1.125rem + 8px),\n      #E04A4A calc(50% + 1.875rem + 8px),\n      transparent calc(50% + 1.875rem + 8px),\n      transparent 100%);\n}\n.footer__buttons-left,\n.footer__buttons-right {\n  display: flex;\n  flex-direction: column;\n  gap: 0;\n  position: relative;\n  z-index: 1;\n}\n.footer__buttons-left {\n  align-items: flex-end;\n}\n.footer__buttons-right {\n  align-items: flex-start;\n}\n.footer__logo-wrapper {\n  position: absolute;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  z-index: 2;\n  left: 50%;\n  transform: translateX(-50%);\n  transition: all 300ms ease-in-out;\n}\n.footer__logo {\n  display: block;\n  height: 13rem;\n  width: auto;\n  position: relative;\n  transition: transform 150ms ease-in-out;\n}\n.footer__logo:hover {\n  transform: rotate(25deg);\n}\n.footer__btn {\n  display: inline-block;\n  font-family: "Space Grotesk", sans-serif;\n  font-size: 0.875rem;\n  font-weight: 600;\n  padding: 0.5rem 3rem;\n  border: 3px solid var(--border-color);\n  background-color: var(--bg-secondary);\n  color: var(--text-primary);\n  cursor: pointer;\n  transition:\n    all 150ms ease-in-out,\n    border-radius 300ms ease-in-out,\n    width 300ms ease-in-out,\n    min-width 300ms ease-in-out;\n  text-transform: uppercase;\n  letter-spacing: 0.02em;\n  box-shadow: 6px 6px 0px #01131B;\n  position: relative;\n  white-space: nowrap;\n  min-width: 400px;\n  text-align: center;\n  text-decoration: none;\n}\n.footer__btn:hover {\n  box-shadow: 4px 4px 0px #01131B;\n  transform: translate(2px, 2px);\n}\n.footer__btn:active {\n  box-shadow: 0px 0px 0px #01131B;\n  transform: translate(4px, 4px);\n}\n.footer__btn:focus-visible {\n  outline: 3px solid var(--color-accent);\n  outline-offset: 2px;\n}\n.footer__btn--left-top {\n  border-radius: 9999px 0 0 0;\n  border-right: none;\n}\n.footer__btn--left-middle {\n  background-color: var(--color-primary);\n  min-width: 440px;\n  border-right: none;\n  border-radius: 9999px 0 0 9999px;\n  border-top: 3px solid var(--border-color);\n  border-top-color: var(--border-color);\n}\n.footer__btn--left-bottom {\n  border-right: none;\n  border-radius: 0 0 0 9999px;\n  border-top: 3px solid var(--border-color);\n}\n.footer__btn--right-top {\n  border-radius: 0 9999px 0 0;\n  border-left: none;\n}\n.footer__btn--right-middle {\n  background-color: var(--color-primary);\n  min-width: 440px;\n  border-left: none;\n  border-radius: 0 9999px 9999px 0;\n  border-top: 3px solid var(--border-color);\n  border-top-color: var(--border-color);\n}\n.footer__btn--right-bottom {\n  border-left: none;\n  border-radius: 0 0 9999px 0;\n  border-top: 3px solid var(--border-color);\n}\n@media (max-width: 767px) {\n  .footer {\n    padding: 0.5rem 0;\n  }\n  .footer__content {\n    flex-direction: column;\n    gap: 0;\n    padding: 0.5rem;\n  }\n  .footer__logo-wrapper {\n    position: relative;\n    left: auto;\n    transform: none;\n    order: 1;\n    z-index: 1;\n    margin-bottom: 0.5rem;\n    margin-top: 0;\n  }\n  .footer__logo {\n    height: 8rem;\n  }\n  .footer__stripes {\n    transform: translate(-50%, -50%) rotate(0deg);\n    width: 100%;\n    height: 100vh;\n    z-index: 0;\n  }\n  .footer__stripes::before {\n    background:\n      linear-gradient(\n        to right,\n        transparent 0,\n        transparent calc(50% - 1.875rem - 8px),\n        #AAD661 calc(50% - 1.875rem - 8px),\n        #AAD661 calc(50% - 1.125rem - 8px),\n        transparent calc(50% - 1.125rem - 8px),\n        transparent calc(50% - 1.125rem - 4px),\n        #0A9295 calc(50% - 1.125rem - 4px),\n        #0A9295 calc(50% - 0.375rem - 4px),\n        transparent calc(50% - 0.375rem - 4px),\n        transparent calc(50% - 0.375rem),\n        #FFC047 calc(50% - 0.375rem),\n        #FFC047 calc(50% + 0.375rem),\n        transparent calc(50% + 0.375rem),\n        transparent calc(50% + 0.375rem + 4px),\n        #FEF84A calc(50% + 0.375rem + 4px),\n        #FEF84A calc(50% + 1.125rem + 4px),\n        transparent calc(50% + 1.125rem + 4px),\n        transparent calc(50% + 1.125rem + 8px),\n        #E04A4A calc(50% + 1.125rem + 8px),\n        #E04A4A calc(50% + 1.875rem + 8px),\n        transparent calc(50% + 1.875rem + 8px),\n        transparent 100%);\n  }\n  .footer__buttons-left {\n    width: 100%;\n    order: 2;\n    z-index: 1;\n    align-items: stretch;\n  }\n  .footer__buttons-right {\n    width: 100%;\n    order: 2;\n    z-index: 1;\n    align-items: stretch;\n  }\n  .footer__btn {\n    width: 100%;\n    min-width: auto;\n    padding: 0.5rem 2rem;\n    font-size: 0.75rem;\n    border: 3px solid var(--border-color);\n    border-radius: 0;\n    margin: 0;\n    margin-top: 0.5rem;\n  }\n  .footer__btn--left-top {\n    border-radius: 9999px 9999px 0 0;\n    border-top: 3px solid var(--border-color);\n    margin-top: 0;\n  }\n  .footer__btn--left-middle {\n    border-radius: 5px;\n  }\n  .footer__btn--left-bottom {\n    border-radius: 9999px;\n  }\n  .footer__btn--right-top {\n    border-radius: 9999px;\n  }\n  .footer__btn--right-middle {\n    border-radius: 5px;\n  }\n  .footer__btn--right-bottom {\n    border-radius: 0 0 9999px 9999px;\n  }\n}\n/*# sourceMappingURL=footer.css.map */\n'] }]
  }], null, null);
})();
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(Footer, { className: "Footer", filePath: "src/app/components/layout/footer/footer.ts", lineNumber: 10 });
})();

// src/app/components/layout/main/main.ts
var _c0 = ["*"];
function Main_Conditional_26_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275namespaceSVG();
    \u0275\u0275elementStart(0, "svg", 9);
    \u0275\u0275element(1, "circle", 24)(2, "line", 25)(3, "line", 26)(4, "line", 27)(5, "line", 28)(6, "line", 29)(7, "line", 30)(8, "line", 31)(9, "line", 32);
    \u0275\u0275elementEnd();
  }
}
function Main_Conditional_27_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275namespaceSVG();
    \u0275\u0275elementStart(0, "svg", 9);
    \u0275\u0275element(1, "path", 33);
    \u0275\u0275elementEnd();
  }
}
function Main_Conditional_28_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275namespaceSVG();
    \u0275\u0275elementStart(0, "svg", 9);
    \u0275\u0275element(1, "circle", 34)(2, "path", 35);
    \u0275\u0275elementEnd();
  }
}
function Main_Conditional_61_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275namespaceSVG();
    \u0275\u0275elementStart(0, "svg", 9);
    \u0275\u0275element(1, "circle", 24)(2, "line", 25)(3, "line", 26)(4, "line", 27)(5, "line", 28)(6, "line", 29)(7, "line", 30)(8, "line", 31)(9, "line", 32);
    \u0275\u0275elementEnd();
  }
}
function Main_Conditional_62_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275namespaceSVG();
    \u0275\u0275elementStart(0, "svg", 9);
    \u0275\u0275element(1, "path", 33);
    \u0275\u0275elementEnd();
  }
}
function Main_Conditional_63_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275namespaceSVG();
    \u0275\u0275elementStart(0, "svg", 9);
    \u0275\u0275element(1, "circle", 34)(2, "path", 35);
    \u0275\u0275elementEnd();
  }
}
var Main = class _Main {
  themeService = inject(ThemeService);
  // Menú móvil del nav
  isMenuOpen = signal(false, ...ngDevMode ? [{ debugName: "isMenuOpen" }] : []);
  toggleMenu() {
    this.isMenuOpen.update((open) => !open);
  }
  closeMenu() {
    this.isMenuOpen.set(false);
  }
  toggleTheme() {
    this.themeService.toggleTheme();
  }
  /**
   * Obtener el label de accesibilidad para el botón de tema
   */
  getThemeLabel() {
    const current = this.themeService.currentTheme();
    switch (current) {
      case "light":
        return "Cambiar a modo oscuro azul";
      case "dark":
        return "Cambiar a modo oscuro escala de grises";
      case "dark-gray":
        return "Cambiar a modo claro";
      default:
        return "Cambiar tema";
    }
  }
  /**
   * Obtener el texto descriptivo del tema actual (para móvil)
   */
  getThemeText() {
    const current = this.themeService.currentTheme();
    switch (current) {
      case "light":
        return "MODO CLARO";
      case "dark":
        return "MODO OSCURO AZUL";
      case "dark-gray":
        return "MODO OSCURO GRIS";
      default:
        return "MODO CLARO";
    }
  }
  /**
   * Cerrar menú móvil al presionar ESC
   */
  onEscapeKey() {
    if (this.isMenuOpen()) {
      this.closeMenu();
    }
  }
  static \u0275fac = function Main_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _Main)();
  };
  static \u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _Main, selectors: [["app-main"]], hostBindings: function Main_HostBindings(rf, ctx) {
    if (rf & 1) {
      \u0275\u0275listener("keydown.escape", function Main_keydown_escape_HostBindingHandler() {
        return ctx.onEscapeKey();
      }, \u0275\u0275resolveDocument);
    }
  }, ngContentSelectors: _c0, decls: 68, vars: 14, consts: [["aria-label", "Navegaci\xF3n principal", 1, "main-nav"], [1, "main-nav__desktop"], [1, "main-nav__list"], [1, "main-nav__item"], ["href", "#", 1, "main-nav__link"], ["routerLink", "/style-guide", 1, "main-nav__link"], ["routerLink", "/admin", 1, "main-nav__link"], [1, "main-nav__item", "main-nav__item--theme"], ["type", "button", 1, "main-nav__theme-toggle", 3, "click"], ["width", "20", "height", "20", "viewBox", "0 0 24 24", "fill", "none", "stroke", "currentColor", "stroke-width", "2", "stroke-linecap", "round", "stroke-linejoin", "round", 1, "main-nav__theme-icon"], [1, "main-nav__mobile"], ["aria-controls", "mobile-menu", 1, "main-nav__toggle", 3, "click"], [1, "main-nav__toggle-text"], ["width", "16", "height", "16", "viewBox", "0 0 16 16", "fill", "none", "xmlns", "http://www.w3.org/2000/svg", "aria-hidden", "true", 1, "main-nav__toggle-icon"], ["d", "M4 6L8 10L12 6", "stroke", "currentColor", "stroke-width", "2", "stroke-linecap", "round", "stroke-linejoin", "round"], ["id", "mobile-menu", 1, "main-nav__menu"], ["href", "#", 1, "main-nav__link", 3, "click"], ["routerLink", "/style-guide", 1, "main-nav__link", 3, "click"], ["routerLink", "/admin", 1, "main-nav__link", 3, "click"], ["type", "button", 1, "main-nav__theme-toggle", "main-nav__theme-toggle--mobile", 3, "click"], [1, "main-nav__theme-label"], [1, "main-content-wrapper"], [1, "main"], [1, "main__container"], ["cx", "12", "cy", "12", "r", "5"], ["x1", "12", "y1", "1", "x2", "12", "y2", "3"], ["x1", "12", "y1", "21", "x2", "12", "y2", "23"], ["x1", "4.22", "y1", "4.22", "x2", "5.64", "y2", "5.64"], ["x1", "18.36", "y1", "18.36", "x2", "19.78", "y2", "19.78"], ["x1", "1", "y1", "12", "x2", "3", "y2", "12"], ["x1", "21", "y1", "12", "x2", "23", "y2", "12"], ["x1", "4.22", "y1", "19.78", "x2", "5.64", "y2", "18.36"], ["x1", "18.36", "y1", "5.64", "x2", "19.78", "y2", "4.22"], ["d", "M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"], ["cx", "12", "cy", "12", "r", "10"], ["d", "M12 2 A10 10 0 0 1 12 22 A10 10 0 0 0 12 2", "fill", "currentColor"]], template: function Main_Template(rf, ctx) {
    if (rf & 1) {
      \u0275\u0275projectionDef();
      \u0275\u0275elementStart(0, "nav", 0)(1, "div", 1)(2, "ul", 2)(3, "li", 3)(4, "a", 4);
      \u0275\u0275text(5, "MI LISTA");
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(6, "li", 3)(7, "a", 4);
      \u0275\u0275text(8, "ARTISTAS");
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(9, "li", 3)(10, "a", 4);
      \u0275\u0275text(11, "PR\xD3XIMAMENTE");
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(12, "li", 3)(13, "a", 4);
      \u0275\u0275text(14, "\xC1LBUMES");
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(15, "li", 3)(16, "a", 4);
      \u0275\u0275text(17, "CANCIONES");
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(18, "li", 3)(19, "a", 5);
      \u0275\u0275text(20, "GU\xCDA DE ESTILOS");
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(21, "li", 3)(22, "a", 6);
      \u0275\u0275text(23, "ADMIN");
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(24, "li", 7)(25, "button", 8);
      \u0275\u0275listener("click", function Main_Template_button_click_25_listener() {
        return ctx.toggleTheme();
      });
      \u0275\u0275conditionalCreate(26, Main_Conditional_26_Template, 10, 0, ":svg:svg", 9);
      \u0275\u0275conditionalCreate(27, Main_Conditional_27_Template, 2, 0, ":svg:svg", 9);
      \u0275\u0275conditionalCreate(28, Main_Conditional_28_Template, 3, 0, ":svg:svg", 9);
      \u0275\u0275elementEnd()()()();
      \u0275\u0275elementStart(29, "div", 10)(30, "button", 11);
      \u0275\u0275listener("click", function Main_Template_button_click_30_listener() {
        return ctx.toggleMenu();
      });
      \u0275\u0275elementStart(31, "span", 12);
      \u0275\u0275text(32, "OPCIONES");
      \u0275\u0275elementEnd();
      \u0275\u0275namespaceSVG();
      \u0275\u0275elementStart(33, "svg", 13);
      \u0275\u0275element(34, "path", 14);
      \u0275\u0275elementEnd()();
      \u0275\u0275namespaceHTML();
      \u0275\u0275elementStart(35, "ul", 15)(36, "li", 3)(37, "a", 16);
      \u0275\u0275listener("click", function Main_Template_a_click_37_listener() {
        return ctx.closeMenu();
      });
      \u0275\u0275text(38, "MI LISTA");
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(39, "li", 3)(40, "a", 16);
      \u0275\u0275listener("click", function Main_Template_a_click_40_listener() {
        return ctx.closeMenu();
      });
      \u0275\u0275text(41, "ARTISTAS");
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(42, "li", 3)(43, "a", 16);
      \u0275\u0275listener("click", function Main_Template_a_click_43_listener() {
        return ctx.closeMenu();
      });
      \u0275\u0275text(44, "PR\xD3XIMAMENTE");
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(45, "li", 3)(46, "a", 16);
      \u0275\u0275listener("click", function Main_Template_a_click_46_listener() {
        return ctx.closeMenu();
      });
      \u0275\u0275text(47, "\xC1LBUMES");
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(48, "li", 3)(49, "a", 16);
      \u0275\u0275listener("click", function Main_Template_a_click_49_listener() {
        return ctx.closeMenu();
      });
      \u0275\u0275text(50, "CANCIONES");
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(51, "li", 3)(52, "a", 17);
      \u0275\u0275listener("click", function Main_Template_a_click_52_listener() {
        return ctx.closeMenu();
      });
      \u0275\u0275text(53, "GU\xCDA DE ESTILOS");
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(54, "li", 3)(55, "a", 18);
      \u0275\u0275listener("click", function Main_Template_a_click_55_listener() {
        return ctx.closeMenu();
      });
      \u0275\u0275text(56, "ADMIN");
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(57, "li", 7)(58, "button", 19);
      \u0275\u0275listener("click", function Main_Template_button_click_58_listener() {
        return ctx.toggleTheme();
      });
      \u0275\u0275elementStart(59, "span", 20);
      \u0275\u0275text(60);
      \u0275\u0275elementEnd();
      \u0275\u0275conditionalCreate(61, Main_Conditional_61_Template, 10, 0, ":svg:svg", 9);
      \u0275\u0275conditionalCreate(62, Main_Conditional_62_Template, 2, 0, ":svg:svg", 9);
      \u0275\u0275conditionalCreate(63, Main_Conditional_63_Template, 3, 0, ":svg:svg", 9);
      \u0275\u0275elementEnd()()()()();
      \u0275\u0275elementStart(64, "div", 21)(65, "main", 22)(66, "div", 23);
      \u0275\u0275projection(67);
      \u0275\u0275elementEnd()()();
    }
    if (rf & 2) {
      \u0275\u0275advance(25);
      \u0275\u0275attribute("aria-label", ctx.getThemeLabel());
      \u0275\u0275advance();
      \u0275\u0275conditional(ctx.themeService.currentTheme() === "light" ? 26 : -1);
      \u0275\u0275advance();
      \u0275\u0275conditional(ctx.themeService.currentTheme() === "dark" ? 27 : -1);
      \u0275\u0275advance();
      \u0275\u0275conditional(ctx.themeService.currentTheme() === "dark-gray" ? 28 : -1);
      \u0275\u0275advance(2);
      \u0275\u0275attribute("aria-expanded", ctx.isMenuOpen());
      \u0275\u0275advance(3);
      \u0275\u0275classProp("main-nav__toggle-icon--open", ctx.isMenuOpen());
      \u0275\u0275advance(2);
      \u0275\u0275classProp("main-nav__menu--open", ctx.isMenuOpen());
      \u0275\u0275advance(23);
      \u0275\u0275attribute("aria-label", ctx.getThemeLabel());
      \u0275\u0275advance(2);
      \u0275\u0275textInterpolate1(" ", ctx.getThemeText(), " ");
      \u0275\u0275advance();
      \u0275\u0275conditional(ctx.themeService.currentTheme() === "light" ? 61 : -1);
      \u0275\u0275advance();
      \u0275\u0275conditional(ctx.themeService.currentTheme() === "dark" ? 62 : -1);
      \u0275\u0275advance();
      \u0275\u0275conditional(ctx.themeService.currentTheme() === "dark-gray" ? 63 : -1);
    }
  }, dependencies: [CommonModule, RouterLink], styles: ['@charset "UTF-8";\n\n\n\n.main-nav[_ngcontent-%COMP%] {\n  position: sticky;\n  top: 0;\n  z-index: 2;\n  width: 100%;\n  background-color: var(--nav-bg);\n  border-top: 4px solid var(--border-color);\n  border-bottom: 4px solid var(--border-color);\n  z-index: 4;\n}\n.main-nav__desktop[_ngcontent-%COMP%] {\n  display: block;\n}\n.main-nav__list[_ngcontent-%COMP%] {\n  max-width: 1440px;\n  margin: 0 auto;\n  padding: 0;\n  list-style: none;\n  display: flex;\n  justify-content: center;\n  align-items: stretch;\n}\n.main-nav__item[_ngcontent-%COMP%] {\n  flex: 0 0 auto;\n  border-right: 2px solid var(--border-color);\n}\n.main-nav__item[_ngcontent-%COMP%]:last-child {\n  border-right: none;\n}\n.main-nav__link[_ngcontent-%COMP%] {\n  display: block;\n  padding: 1rem 3rem;\n  text-decoration: none;\n  color: var(--text-primary);\n  font-family: "Space Grotesk", sans-serif;\n  font-weight: 600;\n  font-size: 0.875rem;\n  background-color: transparent;\n  transition: background-color 0.2s ease;\n  text-transform: uppercase;\n  letter-spacing: 0.05em;\n  white-space: nowrap;\n}\n.main-nav__link[_ngcontent-%COMP%]:hover {\n  background-color: var(--color-primary);\n}\n.main-nav__link[_ngcontent-%COMP%]:focus-visible {\n  outline: 3px solid #BB3F03;\n  outline-offset: -3px;\n}\n.main-nav__item--theme[_ngcontent-%COMP%] {\n  border-right: none;\n}\n.main-nav__theme-toggle[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  gap: 0.5rem;\n  padding: 1rem 3rem;\n  background-color: transparent;\n  border: none;\n  cursor: pointer;\n  color: var(--text-primary);\n  font-family: "Space Grotesk", sans-serif;\n  font-weight: 600;\n  font-size: 0.875rem;\n  transition: all 0.2s ease;\n  height: 100%;\n  width: 100%;\n}\n.main-nav__theme-toggle[_ngcontent-%COMP%]:hover {\n  background-color: var(--color-primary);\n}\n.main-nav__theme-toggle[_ngcontent-%COMP%]:focus-visible {\n  outline: 3px solid #BB3F03;\n  outline-offset: -3px;\n}\n.main-nav__theme-icon[_ngcontent-%COMP%] {\n  width: 1.25rem;\n  height: 1.25rem;\n  transition: transform 300ms ease-in-out;\n  flex-shrink: 0;\n}\n.main-nav__theme-label[_ngcontent-%COMP%] {\n  display: none;\n  text-transform: uppercase;\n  letter-spacing: 0.05em;\n}\n.main-nav__theme-toggle--mobile[_ngcontent-%COMP%] {\n  width: 100%;\n  justify-content: center;\n  padding: 1rem 3rem;\n  gap: 1rem;\n}\n.main-nav__theme-toggle--mobile[_ngcontent-%COMP%]   .main-nav__theme-label[_ngcontent-%COMP%] {\n  display: block;\n}\n.main-nav__mobile[_ngcontent-%COMP%] {\n  display: none;\n}\n.main-nav__toggle[_ngcontent-%COMP%] {\n  display: flex;\n  width: 100%;\n  background-color: transparent;\n  padding: 1rem;\n  border: none;\n  cursor: pointer;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  gap: 1rem;\n  transition: background-color 0.2s ease;\n  font-family: "Space Grotesk", sans-serif;\n}\n.main-nav__toggle[_ngcontent-%COMP%]:hover {\n  background-color: var(--color-primary);\n}\n.main-nav__toggle[_ngcontent-%COMP%]:focus-visible {\n  outline: 3px solid #BB3F03;\n  outline-offset: -3px;\n}\n.main-nav__toggle-text[_ngcontent-%COMP%] {\n  font-size: 0.875rem;\n  font-weight: 700;\n  color: var(--text-primary);\n  text-transform: uppercase;\n  letter-spacing: 0.05em;\n}\n.main-nav__toggle-icon[_ngcontent-%COMP%] {\n  transition: transform 0.3s ease;\n  color: var(--text-primary);\n}\n.main-nav__toggle-icon--open[_ngcontent-%COMP%] {\n  transform: rotate(180deg);\n}\n.main-nav__menu[_ngcontent-%COMP%] {\n  list-style: none;\n  margin: 0;\n  padding: 0;\n  max-height: 0;\n  overflow: hidden;\n  background-color: var(--color-secondary);\n  transition: max-height 0.4s cubic-bezier(0.4, 0, 0.2, 1), opacity 0.3s ease;\n  opacity: 0;\n}\n.main-nav__menu--open[_ngcontent-%COMP%] {\n  max-height: 25rem;\n  border-top: 2px solid var(--border-color);\n  opacity: 1;\n}\n.main[_ngcontent-%COMP%] {\n  flex: 1;\n  display: flex;\n  flex-direction: column;\n  background-color: var(--bg-primary);\n  min-height: calc(100vh - 70px);\n  width: 100%;\n}\n.main__container[_ngcontent-%COMP%] {\n  max-width: 1440px;\n  margin: 0 auto;\n  padding: 3rem 2rem;\n  width: 100%;\n  display: flex;\n  flex-direction: column;\n  gap: 3rem;\n}\n@media (min-width: 768px) {\n  .main__container[_ngcontent-%COMP%] {\n    padding: 4rem 3rem;\n  }\n}\n@media (min-width: 1024px) {\n  .main__container[_ngcontent-%COMP%] {\n    padding: 4rem 4rem;\n  }\n}\n@media (min-width: 768px) and (max-width: 1023px) {\n  .main-nav__list[_ngcontent-%COMP%] {\n    justify-content: center;\n  }\n  .main-nav__link[_ngcontent-%COMP%] {\n    padding: 1rem 2rem;\n    font-size: 0.75rem;\n  }\n  .main-nav__theme-toggle[_ngcontent-%COMP%] {\n    padding: 1rem 2rem;\n  }\n}\n@media (max-width: 767px) {\n  .main-nav__desktop[_ngcontent-%COMP%] {\n    display: none;\n  }\n  .main-nav__mobile[_ngcontent-%COMP%] {\n    display: block;\n  }\n  .main-nav__list[_ngcontent-%COMP%] {\n    flex-direction: column;\n    padding: 0;\n  }\n  .main-nav__item[_ngcontent-%COMP%] {\n    border-right: none;\n    border-bottom: 2px solid var(--border-color);\n  }\n  .main-nav__item[_ngcontent-%COMP%]:last-child {\n    border-bottom: none;\n  }\n  .main-nav__link[_ngcontent-%COMP%] {\n    padding: 0.5rem 2rem;\n    text-align: center;\n  }\n}\n.main-content-wrapper[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: flex-start;\n  width: 100%;\n  min-height: calc(100vh - 70px);\n}\n/*# sourceMappingURL=main.css.map */'] });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(Main, [{
    type: Component,
    args: [{ selector: "app-main", imports: [CommonModule, RouterLink], template: `<!-- ============================================ -->\r
<!-- 1. NAVEGACI\xD3N SUPERIOR (STICKY / FIXED)      -->\r
<!--    z-index: 100 | Height: 70px               -->\r
<!-- ============================================ -->\r
<nav class="main-nav" aria-label="Navegaci\xF3n principal">\r
  <!-- Desktop: barra horizontal -->\r
  <div class="main-nav__desktop">\r
    <ul class="main-nav__list">\r
      <li class="main-nav__item">\r
        <a href="#" class="main-nav__link">MI LISTA</a>\r
      </li>\r
      <li class="main-nav__item">\r
        <a href="#" class="main-nav__link">ARTISTAS</a>\r
      </li>\r
      <li class="main-nav__item">\r
        <a href="#" class="main-nav__link">PR\xD3XIMAMENTE</a>\r
      </li>\r
      <li class="main-nav__item">\r
        <a href="#" class="main-nav__link">\xC1LBUMES</a>\r
      </li>\r
      <li class="main-nav__item">\r
        <a href="#" class="main-nav__link">CANCIONES</a>\r
      </li>\r
      <li class="main-nav__item">\r
        <a routerLink="/style-guide" class="main-nav__link">GU\xCDA DE ESTILOS</a>\r
      </li>\r
      <li class="main-nav__item">\r
        <a routerLink="/admin" class="main-nav__link">ADMIN</a>\r
      </li>\r
\r
      <!-- Theme Switcher Desktop -->\r
      <li class="main-nav__item main-nav__item--theme">\r
        <button\r
          class="main-nav__theme-toggle"\r
          (click)="toggleTheme()"\r
          [attr.aria-label]="getThemeLabel()"\r
          type="button">\r
\r
          <!-- Icono Sol (modo claro) -->\r
          @if (themeService.currentTheme() === 'light') {\r
            <svg class="main-nav__theme-icon" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">\r
              <circle cx="12" cy="12" r="5"></circle>\r
              <line x1="12" y1="1" x2="12" y2="3"></line>\r
              <line x1="12" y1="21" x2="12" y2="23"></line>\r
              <line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line>\r
              <line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line>\r
              <line x1="1" y1="12" x2="3" y2="12"></line>\r
              <line x1="21" y1="12" x2="23" y2="12"></line>\r
              <line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line>\r
              <line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line>\r
            </svg>\r
          }\r
\r
          <!-- Icono Luna (modo oscuro azul) -->\r
          @if (themeService.currentTheme() === 'dark') {\r
            <svg class="main-nav__theme-icon" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">\r
              <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path>\r
            </svg>\r
          }\r
\r
          <!-- Icono Medialuna/Contraste (modo oscuro escala de grises) -->\r
          @if (themeService.currentTheme() === 'dark-gray') {\r
            <svg class="main-nav__theme-icon" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">\r
              <circle cx="12" cy="12" r="10"></circle>\r
              <path d="M12 2 A10 10 0 0 1 12 22 A10 10 0 0 0 12 2" fill="currentColor"></path>\r
            </svg>\r
          }\r
        </button>\r
      </li>\r
    </ul>\r
  </div>\r
\r
  <!-- M\xF3vil: barra "Opciones" + men\xFA desplegable -->\r
  <div class="main-nav__mobile">\r
    <button\r
      class="main-nav__toggle"\r
      (click)="toggleMenu()"\r
      [attr.aria-expanded]="isMenuOpen()"\r
      aria-controls="mobile-menu">\r
      <span class="main-nav__toggle-text">OPCIONES</span>\r
      <svg\r
        class="main-nav__toggle-icon"\r
        [class.main-nav__toggle-icon--open]="isMenuOpen()"\r
        width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">\r
        <path d="M4 6L8 10L12 6" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>\r
      </svg>\r
    </button>\r
\r
    <ul\r
      id="mobile-menu"\r
      class="main-nav__menu"\r
      [class.main-nav__menu--open]="isMenuOpen()">\r
      <li class="main-nav__item"><a href="#" class="main-nav__link" (click)="closeMenu()">MI LISTA</a></li>\r
      <li class="main-nav__item"><a href="#" class="main-nav__link" (click)="closeMenu()">ARTISTAS</a></li>\r
      <li class="main-nav__item"><a href="#" class="main-nav__link" (click)="closeMenu()">PR\xD3XIMAMENTE</a></li>\r
      <li class="main-nav__item"><a href="#" class="main-nav__link" (click)="closeMenu()">\xC1LBUMES</a></li>\r
      <li class="main-nav__item"><a href="#" class="main-nav__link" (click)="closeMenu()">CANCIONES</a></li>\r
      <li class="main-nav__item"><a routerLink="/style-guide" class="main-nav__link" (click)="closeMenu()">GU\xCDA DE ESTILOS</a></li>\r
      <li class="main-nav__item"><a routerLink="/admin" class="main-nav__link" (click)="closeMenu()">ADMIN</a></li>\r
\r
      <!-- Theme Switcher M\xF3vil -->\r
      <li class="main-nav__item main-nav__item--theme">\r
        <button\r
          class="main-nav__theme-toggle main-nav__theme-toggle--mobile"\r
          (click)="toggleTheme()"\r
          [attr.aria-label]="getThemeLabel()"\r
          type="button">\r
          <span class="main-nav__theme-label">\r
            {{ getThemeText() }}\r
          </span>\r
          @if (themeService.currentTheme() === 'light') {\r
            <svg class="main-nav__theme-icon" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">\r
              <circle cx="12" cy="12" r="5"></circle>\r
              <line x1="12" y1="1" x2="12" y2="3"></line>\r
              <line x1="12" y1="21" x2="12" y2="23"></line>\r
              <line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line>\r
              <line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line>\r
              <line x1="1" y1="12" x2="3" y2="12"></line>\r
              <line x1="21" y1="12" x2="23" y2="12"></line>\r
              <line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line>\r
              <line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line>\r
            </svg>\r
          }\r
          @if (themeService.currentTheme() === 'dark') {\r
            <svg class="main-nav__theme-icon" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">\r
              <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path>\r
            </svg>\r
          }\r
          @if (themeService.currentTheme() === 'dark-gray') {\r
            <svg class="main-nav__theme-icon" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">\r
              <circle cx="12" cy="12" r="10"></circle>\r
              <path d="M12 2 A10 10 0 0 1 12 22 A10 10 0 0 0 12 2" fill="currentColor"></path>\r
            </svg>\r
          }\r
        </button>\r
      </li>\r
    </ul>\r
  </div>\r
</nav>\r
\r
<!-- ============================================ -->\r
<!-- CONTENT WRAPPER (Flex Container)             -->\r
<!-- ============================================ -->\r
<div class="main-content-wrapper">\r
  <!-- ============================================ -->\r
  <!-- MAIN (CONTENIDO CON SCROLL)                  -->\r
  <!-- ============================================ -->\r
  <main class="main">\r
    <div class="main__container">\r
      <!-- Aqu\xED se inyecta el contenido de tus p\xE1ginas (StyleGuide, Home, etc.) -->\r
      <ng-content></ng-content>\r
      <!-- O si usas routing: <router-outlet></router-outlet> -->\r
    </div>\r
  </main>\r
</div>\r
\r
\r
`, styles: ['@charset "UTF-8";\n\n/* src/app/components/layout/main/main.scss */\n.main-nav {\n  position: sticky;\n  top: 0;\n  z-index: 2;\n  width: 100%;\n  background-color: var(--nav-bg);\n  border-top: 4px solid var(--border-color);\n  border-bottom: 4px solid var(--border-color);\n  z-index: 4;\n}\n.main-nav__desktop {\n  display: block;\n}\n.main-nav__list {\n  max-width: 1440px;\n  margin: 0 auto;\n  padding: 0;\n  list-style: none;\n  display: flex;\n  justify-content: center;\n  align-items: stretch;\n}\n.main-nav__item {\n  flex: 0 0 auto;\n  border-right: 2px solid var(--border-color);\n}\n.main-nav__item:last-child {\n  border-right: none;\n}\n.main-nav__link {\n  display: block;\n  padding: 1rem 3rem;\n  text-decoration: none;\n  color: var(--text-primary);\n  font-family: "Space Grotesk", sans-serif;\n  font-weight: 600;\n  font-size: 0.875rem;\n  background-color: transparent;\n  transition: background-color 0.2s ease;\n  text-transform: uppercase;\n  letter-spacing: 0.05em;\n  white-space: nowrap;\n}\n.main-nav__link:hover {\n  background-color: var(--color-primary);\n}\n.main-nav__link:focus-visible {\n  outline: 3px solid #BB3F03;\n  outline-offset: -3px;\n}\n.main-nav__item--theme {\n  border-right: none;\n}\n.main-nav__theme-toggle {\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  gap: 0.5rem;\n  padding: 1rem 3rem;\n  background-color: transparent;\n  border: none;\n  cursor: pointer;\n  color: var(--text-primary);\n  font-family: "Space Grotesk", sans-serif;\n  font-weight: 600;\n  font-size: 0.875rem;\n  transition: all 0.2s ease;\n  height: 100%;\n  width: 100%;\n}\n.main-nav__theme-toggle:hover {\n  background-color: var(--color-primary);\n}\n.main-nav__theme-toggle:focus-visible {\n  outline: 3px solid #BB3F03;\n  outline-offset: -3px;\n}\n.main-nav__theme-icon {\n  width: 1.25rem;\n  height: 1.25rem;\n  transition: transform 300ms ease-in-out;\n  flex-shrink: 0;\n}\n.main-nav__theme-label {\n  display: none;\n  text-transform: uppercase;\n  letter-spacing: 0.05em;\n}\n.main-nav__theme-toggle--mobile {\n  width: 100%;\n  justify-content: center;\n  padding: 1rem 3rem;\n  gap: 1rem;\n}\n.main-nav__theme-toggle--mobile .main-nav__theme-label {\n  display: block;\n}\n.main-nav__mobile {\n  display: none;\n}\n.main-nav__toggle {\n  display: flex;\n  width: 100%;\n  background-color: transparent;\n  padding: 1rem;\n  border: none;\n  cursor: pointer;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  gap: 1rem;\n  transition: background-color 0.2s ease;\n  font-family: "Space Grotesk", sans-serif;\n}\n.main-nav__toggle:hover {\n  background-color: var(--color-primary);\n}\n.main-nav__toggle:focus-visible {\n  outline: 3px solid #BB3F03;\n  outline-offset: -3px;\n}\n.main-nav__toggle-text {\n  font-size: 0.875rem;\n  font-weight: 700;\n  color: var(--text-primary);\n  text-transform: uppercase;\n  letter-spacing: 0.05em;\n}\n.main-nav__toggle-icon {\n  transition: transform 0.3s ease;\n  color: var(--text-primary);\n}\n.main-nav__toggle-icon--open {\n  transform: rotate(180deg);\n}\n.main-nav__menu {\n  list-style: none;\n  margin: 0;\n  padding: 0;\n  max-height: 0;\n  overflow: hidden;\n  background-color: var(--color-secondary);\n  transition: max-height 0.4s cubic-bezier(0.4, 0, 0.2, 1), opacity 0.3s ease;\n  opacity: 0;\n}\n.main-nav__menu--open {\n  max-height: 25rem;\n  border-top: 2px solid var(--border-color);\n  opacity: 1;\n}\n.main {\n  flex: 1;\n  display: flex;\n  flex-direction: column;\n  background-color: var(--bg-primary);\n  min-height: calc(100vh - 70px);\n  width: 100%;\n}\n.main__container {\n  max-width: 1440px;\n  margin: 0 auto;\n  padding: 3rem 2rem;\n  width: 100%;\n  display: flex;\n  flex-direction: column;\n  gap: 3rem;\n}\n@media (min-width: 768px) {\n  .main__container {\n    padding: 4rem 3rem;\n  }\n}\n@media (min-width: 1024px) {\n  .main__container {\n    padding: 4rem 4rem;\n  }\n}\n@media (min-width: 768px) and (max-width: 1023px) {\n  .main-nav__list {\n    justify-content: center;\n  }\n  .main-nav__link {\n    padding: 1rem 2rem;\n    font-size: 0.75rem;\n  }\n  .main-nav__theme-toggle {\n    padding: 1rem 2rem;\n  }\n}\n@media (max-width: 767px) {\n  .main-nav__desktop {\n    display: none;\n  }\n  .main-nav__mobile {\n    display: block;\n  }\n  .main-nav__list {\n    flex-direction: column;\n    padding: 0;\n  }\n  .main-nav__item {\n    border-right: none;\n    border-bottom: 2px solid var(--border-color);\n  }\n  .main-nav__item:last-child {\n    border-bottom: none;\n  }\n  .main-nav__link {\n    padding: 0.5rem 2rem;\n    text-align: center;\n  }\n}\n.main-content-wrapper {\n  display: flex;\n  align-items: flex-start;\n  width: 100%;\n  min-height: calc(100vh - 70px);\n}\n/*# sourceMappingURL=main.css.map */\n'] }]
  }], null, { onEscapeKey: [{
    type: HostListener,
    args: ["document:keydown.escape"]
  }] });
})();
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(Main, { className: "Main", filePath: "src/app/components/layout/main/main.ts", lineNumber: 12 });
})();

// src/app/app.ts
var App = class _App {
  static \u0275fac = function App_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _App)();
  };
  static \u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _App, selectors: [["app-root"]], decls: 5, vars: 0, consts: [["mode", "global"]], template: function App_Template(rf, ctx) {
    if (rf & 1) {
      \u0275\u0275element(0, "app-header");
      \u0275\u0275elementStart(1, "app-main");
      \u0275\u0275element(2, "router-outlet");
      \u0275\u0275elementEnd();
      \u0275\u0275element(3, "app-footer")(4, "app-spinner", 0);
    }
  }, dependencies: [RouterOutlet, Header, Footer, Main, Spinner], styles: ['@charset "UTF-8";\n\n\n\n[_nghost-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  min-height: 100vh;\n  background-color: var(--bg-primary);\n  color: var(--text-primary);\n  font-family: "Space Grotesk", sans-serif;\n}\nrouter-outlet[_ngcontent-%COMP%]    + *[_ngcontent-%COMP%] {\n  flex: 1;\n}\n/*# sourceMappingURL=app.css.map */'] });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(App, [{
    type: Component,
    args: [{ selector: "app-root", standalone: true, imports: [RouterOutlet, Header, Footer, Main, Spinner], template: '<app-header></app-header>\r\n\r\n<app-main>\r\n  <router-outlet></router-outlet>\r\n</app-main>\r\n\r\n<app-footer></app-footer>\r\n\r\n<!-- Spinner Global - Se muestra cuando LoadingService.isLoading() es true -->\r\n<app-spinner mode="global"></app-spinner>\r\n', styles: ['@charset "UTF-8";\n\n/* src/app/app.scss */\n:host {\n  display: flex;\n  flex-direction: column;\n  min-height: 100vh;\n  background-color: var(--bg-primary);\n  color: var(--text-primary);\n  font-family: "Space Grotesk", sans-serif;\n}\nrouter-outlet + * {\n  flex: 1;\n}\n/*# sourceMappingURL=app.css.map */\n'] }]
  }], null, null);
})();
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(App, { className: "App", filePath: "src/app/app.ts", lineNumber: 15 });
})();

// src/main.ts
bootstrapApplication(App, appConfig).catch((err) => console.error(err));
//# sourceMappingURL=main.js.map
