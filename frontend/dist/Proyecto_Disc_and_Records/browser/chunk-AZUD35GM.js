import {
  Router
} from "./chunk-N6XJ4GTA.js";
import {
  Button
} from "./chunk-HICAVZQE.js";
import {
  CommonModule,
  Component,
  setClassMetadata,
  signal,
  ɵsetClassDebugInfo,
  ɵɵadvance,
  ɵɵdefineComponent,
  ɵɵdirectiveInject,
  ɵɵelement,
  ɵɵelementEnd,
  ɵɵelementStart,
  ɵɵgetCurrentView,
  ɵɵlistener,
  ɵɵnextContext,
  ɵɵproperty,
  ɵɵrepeater,
  ɵɵrepeaterCreate,
  ɵɵresetView,
  ɵɵrestoreView,
  ɵɵsanitizeHtml,
  ɵɵtext,
  ɵɵtextInterpolate
} from "./chunk-MWU7IQTJ.js";

// src/app/pages/not-found/not-found.ts
var _forTrack0 = ($index, $item) => $item.route;
function NotFoundComponent_For_16_Template(rf, ctx) {
  if (rf & 1) {
    const _r1 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "article", 11);
    \u0275\u0275listener("click", function NotFoundComponent_For_16_Template_article_click_0_listener() {
      const link_r2 = \u0275\u0275restoreView(_r1).$implicit;
      const ctx_r2 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r2.navigateTo(link_r2.route));
    });
    \u0275\u0275element(1, "div", 12);
    \u0275\u0275elementStart(2, "h3", 13);
    \u0275\u0275text(3);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(4, "p", 14);
    \u0275\u0275text(5);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const link_r2 = ctx.$implicit;
    \u0275\u0275advance();
    \u0275\u0275property("innerHTML", link_r2.icon, \u0275\u0275sanitizeHtml);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(link_r2.label);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(link_r2.description);
  }
}
var NotFoundComponent = class _NotFoundComponent {
  router;
  // Mensajes simples y directos
  errorMessages = [
    "P\xE1gina no encontrada",
    "Esta p\xE1gina no existe",
    "No encontramos lo que buscas",
    "Ruta no disponible"
  ];
  errorSubtitles = [
    "La p\xE1gina que intentas visitar no est\xE1 disponible",
    "Verifica la URL o regresa a la p\xE1gina principal",
    "Puede que la p\xE1gina haya sido movida o eliminada",
    "Utiliza las opciones de abajo para continuar navegando"
  ];
  currentMessage = signal("", ...ngDevMode ? [{ debugName: "currentMessage" }] : []);
  currentSubtitle = signal("", ...ngDevMode ? [{ debugName: "currentSubtitle" }] : []);
  // SVG icons para enlaces rápidos
  icons = {
    home: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path><polyline points="9 22 9 12 15 12 15 22"></polyline></svg>',
    search: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="11" cy="11" r="8"></circle><path d="m21 21-4.35-4.35"></path></svg>',
    user: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"></path><circle cx="12" cy="7" r="4"></circle></svg>',
    palette: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="13.5" cy="6.5" r=".5"></circle><circle cx="17.5" cy="10.5" r=".5"></circle><circle cx="8.5" cy="7.5" r=".5"></circle><circle cx="6.5" cy="12.5" r=".5"></circle><path d="M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10c.926 0 1.648-.746 1.648-1.688 0-.437-.18-.835-.437-1.125-.29-.289-.438-.652-.438-1.125a1.64 1.64 0 0 1 1.668-1.668h1.996c3.051 0 5.555-2.503 5.555-5.554C21.965 6.012 17.461 2 12 2z"></path></svg>'
  };
  // Enlaces rápidos para ayudar al usuario
  quickLinks = [
    {
      label: "Inicio",
      icon: this.icons.home,
      route: "/",
      description: "Volver a la p\xE1gina principal"
    },
    {
      label: "Buscar",
      icon: this.icons.search,
      route: "/search",
      description: "Buscar \xE1lbumes y artistas"
    },
    {
      label: "Mi Perfil",
      icon: this.icons.user,
      route: "/profile",
      description: "Ver mi perfil y rese\xF1as"
    },
    {
      label: "Gu\xEDa de Estilo",
      icon: this.icons.palette,
      route: "/style-guide",
      description: "Ver componentes y dise\xF1o"
    }
  ];
  constructor(router) {
    this.router = router;
  }
  ngOnInit() {
    const randomMessage = this.errorMessages[Math.floor(Math.random() * this.errorMessages.length)];
    const randomSubtitle = this.errorSubtitles[Math.floor(Math.random() * this.errorSubtitles.length)];
    this.currentMessage.set(randomMessage);
    this.currentSubtitle.set(randomSubtitle);
  }
  navigateTo(route) {
    this.router.navigate([route]);
  }
  goBack() {
    window.history.back();
  }
  static \u0275fac = function NotFoundComponent_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _NotFoundComponent)(\u0275\u0275directiveInject(Router));
  };
  static \u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _NotFoundComponent, selectors: [["app-not-found"]], decls: 17, vars: 2, consts: [[1, "not-found"], [1, "not-found__container"], [1, "not-found__error-code"], [1, "not-found__title"], [1, "not-found__subtitle"], [1, "not-found__actions"], ["variant", "primary", "size", "lg", 3, "clicked"], ["variant", "secondary", "size", "lg", 3, "clicked"], [1, "not-found__divider"], [1, "not-found__quick-links"], [1, "not-found__link-card"], [1, "not-found__link-card", 3, "click"], [1, "not-found__link-icon", 3, "innerHTML"], [1, "not-found__link-title"], [1, "not-found__link-description"]], template: function NotFoundComponent_Template(rf, ctx) {
    if (rf & 1) {
      \u0275\u0275elementStart(0, "div", 0)(1, "div", 1)(2, "div", 2);
      \u0275\u0275text(3, "404");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(4, "h1", 3);
      \u0275\u0275text(5);
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(6, "p", 4);
      \u0275\u0275text(7);
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(8, "div", 5)(9, "app-button", 6);
      \u0275\u0275listener("clicked", function NotFoundComponent_Template_app_button_clicked_9_listener() {
        return ctx.navigateTo("/");
      });
      \u0275\u0275text(10, " Volver al Inicio ");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(11, "app-button", 7);
      \u0275\u0275listener("clicked", function NotFoundComponent_Template_app_button_clicked_11_listener() {
        return ctx.goBack();
      });
      \u0275\u0275text(12, " P\xE1gina Anterior ");
      \u0275\u0275elementEnd()();
      \u0275\u0275element(13, "div", 8);
      \u0275\u0275elementStart(14, "div", 9);
      \u0275\u0275repeaterCreate(15, NotFoundComponent_For_16_Template, 6, 3, "article", 10, _forTrack0);
      \u0275\u0275elementEnd()()();
    }
    if (rf & 2) {
      \u0275\u0275advance(5);
      \u0275\u0275textInterpolate(ctx.currentMessage());
      \u0275\u0275advance(2);
      \u0275\u0275textInterpolate(ctx.currentSubtitle());
      \u0275\u0275advance(8);
      \u0275\u0275repeater(ctx.quickLinks);
    }
  }, dependencies: [CommonModule, Button], styles: ['@charset "UTF-8";\n\n\n\n.not-found[_ngcontent-%COMP%] {\n  min-height: 100vh;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  background-color: var(--bg-primary);\n  padding: 2rem;\n}\n@media (max-width: 768px) {\n  .not-found[_ngcontent-%COMP%] {\n    padding: 1rem;\n  }\n}\n.not-found__container[_ngcontent-%COMP%] {\n  max-width: 800px;\n  width: 100%;\n  text-align: center;\n}\n.not-found__error-code[_ngcontent-%COMP%] {\n  font-size: 12rem;\n  font-weight: 900;\n  font-family: "Monoton";\n  color: var(--color-primary);\n  text-shadow: 6px 6px 0px #01131B;\n  line-height: 1;\n  margin-bottom: 2rem;\n}\n@media (max-width: 768px) {\n  .not-found__error-code[_ngcontent-%COMP%] {\n    font-size: 8rem;\n    text-shadow: 4px 4px 0px #01131B;\n    margin-bottom: 2rem;\n  }\n}\n.not-found__title[_ngcontent-%COMP%] {\n  font-size: 2.625rem;\n  line-height: 3rem;\n  font-weight: 700;\n  color: var(--text-primary);\n  margin: 0 0 1rem 0;\n  line-height: 1.2;\n}\n@media (max-width: 768px) {\n  .not-found__title[_ngcontent-%COMP%] {\n    font-size: 1.625rem;\n    line-height: 3rem;\n  }\n}\n.not-found__subtitle[_ngcontent-%COMP%] {\n  font-size: 1rem;\n  line-height: 1.5rem;\n  color: var(--text-secondary);\n  margin: 0 0 3rem 0;\n  line-height: 1.6;\n  max-width: 600px;\n  margin-left: auto;\n  margin-right: auto;\n}\n@media (max-width: 768px) {\n  .not-found__subtitle[_ngcontent-%COMP%] {\n    font-size: 0.9375rem;\n    line-height: 1.5rem;\n    margin-bottom: 2rem;\n  }\n}\n.not-found__actions[_ngcontent-%COMP%] {\n  display: flex;\n  gap: 1rem;\n  justify-content: center;\n  flex-wrap: wrap;\n  margin-bottom: 3rem;\n}\n@media (max-width: 768px) {\n  .not-found__actions[_ngcontent-%COMP%] {\n    flex-direction: column;\n    margin-bottom: 2rem;\n  }\n}\n.not-found__divider[_ngcontent-%COMP%] {\n  height: 2px;\n  background-color: var(--border-color);\n  margin: 3rem auto;\n  max-width: 200px;\n}\n@media (max-width: 768px) {\n  .not-found__divider[_ngcontent-%COMP%] {\n    margin: 2rem auto;\n  }\n}\n.not-found__quick-links[_ngcontent-%COMP%] {\n  display: grid;\n  grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));\n  gap: 1rem;\n  max-width: 700px;\n  margin: 0 auto;\n}\n@media (max-width: 768px) {\n  .not-found__quick-links[_ngcontent-%COMP%] {\n    grid-template-columns: 1fr 1fr;\n    gap: 0.5rem;\n  }\n}\n@media (max-width: 480px) {\n  .not-found__quick-links[_ngcontent-%COMP%] {\n    grid-template-columns: 1fr;\n  }\n}\n.not-found__link-card[_ngcontent-%COMP%] {\n  background-color: var(--bg-secondary);\n  border: 4px solid var(--border-color);\n  padding: 2rem 1rem;\n  cursor: pointer;\n  transition: all 150ms ease-in-out;\n  box-shadow: 4px 4px 0px #01131B;\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n  text-align: center;\n  gap: 0.5rem;\n}\n.not-found__link-card[_ngcontent-%COMP%]:hover:not(:disabled):not(.button--disabled) {\n  box-shadow: 2px 2px 0px #01131B;\n  transform: translate(2px, 2px);\n}\n.not-found__link-card[_ngcontent-%COMP%]:active:not(:disabled):not(.button--disabled) {\n  box-shadow: 0px 0px 0px #01131B;\n  transform: translate(4px, 4px);\n}\n.not-found__link-card[_ngcontent-%COMP%]:hover {\n  background-color: var(--color-primary);\n}\n.not-found__link-card[_ngcontent-%COMP%]:hover   .not-found__link-icon[_ngcontent-%COMP%], \n.not-found__link-card[_ngcontent-%COMP%]:hover   .not-found__link-title[_ngcontent-%COMP%], \n.not-found__link-card[_ngcontent-%COMP%]:hover   .not-found__link-description[_ngcontent-%COMP%] {\n  color: var(--text-dark);\n}\n.not-found__link-card[_ngcontent-%COMP%]:hover   .not-found__link-icon[_ngcontent-%COMP%] {\n  transform: scale(1.1);\n}\n@media (max-width: 768px) {\n  .not-found__link-card[_ngcontent-%COMP%] {\n    padding: 1rem 0.5rem;\n    gap: 0.5rem;\n  }\n}\n.not-found__link-icon[_ngcontent-%COMP%] {\n  width: 2rem;\n  height: 2rem;\n  color: var(--color-primary);\n  transition: all 300ms ease-in-out;\n}\n.not-found__link-icon[_ngcontent-%COMP%]   svg[_ngcontent-%COMP%] {\n  width: 100%;\n  height: 100%;\n}\n@media (max-width: 768px) {\n  .not-found__link-icon[_ngcontent-%COMP%] {\n    width: 1.5rem;\n    height: 1.5rem;\n  }\n}\n.not-found__link-title[_ngcontent-%COMP%] {\n  font-size: 1.125rem;\n  line-height: 1.75rem;\n  font-weight: 700;\n  color: var(--text-primary);\n  margin: 0;\n  line-height: 1.2;\n  transition: all 150ms ease-in-out;\n}\n@media (max-width: 768px) {\n  .not-found__link-title[_ngcontent-%COMP%] {\n    font-size: 1rem;\n    line-height: 1.5rem;\n  }\n}\n.not-found__link-description[_ngcontent-%COMP%] {\n  font-size: 0.875rem;\n  line-height: 1.5rem;\n  color: var(--text-secondary);\n  margin: 0;\n  line-height: 1.4;\n  transition: all 150ms ease-in-out;\n}\n@media (max-width: 768px) {\n  .not-found__link-description[_ngcontent-%COMP%] {\n    font-size: 0.75rem;\n    line-height: 1rem;\n  }\n}\n@keyframes _ngcontent-%COMP%_fadeIn {\n  from {\n    opacity: 0;\n    transform: translateY(20px);\n  }\n  to {\n    opacity: 1;\n    transform: translateY(0);\n  }\n}\n.not-found__error-code[_ngcontent-%COMP%] {\n  animation: _ngcontent-%COMP%_fadeIn 0.5s ease-out;\n}\n.not-found__title[_ngcontent-%COMP%] {\n  animation: _ngcontent-%COMP%_fadeIn 0.7s ease-out;\n}\n.not-found__subtitle[_ngcontent-%COMP%] {\n  animation: _ngcontent-%COMP%_fadeIn 0.9s ease-out;\n}\n.not-found__actions[_ngcontent-%COMP%] {\n  animation: _ngcontent-%COMP%_fadeIn 1.1s ease-out;\n}\n.not-found__quick-links[_ngcontent-%COMP%] {\n  animation: _ngcontent-%COMP%_fadeIn 1.3s ease-out;\n}\n/*# sourceMappingURL=not-found.css.map */'] });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(NotFoundComponent, [{
    type: Component,
    args: [{ selector: "app-not-found", standalone: true, imports: [CommonModule, Button], template: `<div class="not-found">\r
  <!-- ============================================ -->\r
  <!-- CONTENIDO PRINCIPAL                          -->\r
  <!-- ============================================ -->\r
  <div class="not-found__container">\r
\r
    <!-- Gran 404 simple -->\r
    <div class="not-found__error-code">404</div>\r
\r
    <!-- Mensaje principal -->\r
    <h1 class="not-found__title">{{ currentMessage() }}</h1>\r
    <p class="not-found__subtitle">{{ currentSubtitle() }}</p>\r
\r
    <!-- Botones de acci\xF3n -->\r
    <div class="not-found__actions">\r
      <app-button\r
        variant="primary"\r
        size="lg"\r
        (clicked)="navigateTo('/')"\r
      >\r
        Volver al Inicio\r
      </app-button>\r
\r
      <app-button\r
        variant="secondary"\r
        size="lg"\r
        (clicked)="goBack()"\r
      >\r
        P\xE1gina Anterior\r
      </app-button>\r
    </div>\r
\r
    <!-- Separador -->\r
    <div class="not-found__divider"></div>\r
\r
    <!-- Enlaces r\xE1pidos -->\r
    <div class="not-found__quick-links">\r
      @for (link of quickLinks; track link.route) {\r
        <article class="not-found__link-card" (click)="navigateTo(link.route)">\r
          <div class="not-found__link-icon" [innerHTML]="link.icon"></div>\r
          <h3 class="not-found__link-title">{{ link.label }}</h3>\r
          <p class="not-found__link-description">{{ link.description }}</p>\r
        </article>\r
      }\r
    </div>\r
  </div>\r
</div>\r
`, styles: ['@charset "UTF-8";\n\n/* src/app/pages/not-found/not-found.scss */\n.not-found {\n  min-height: 100vh;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  background-color: var(--bg-primary);\n  padding: 2rem;\n}\n@media (max-width: 768px) {\n  .not-found {\n    padding: 1rem;\n  }\n}\n.not-found__container {\n  max-width: 800px;\n  width: 100%;\n  text-align: center;\n}\n.not-found__error-code {\n  font-size: 12rem;\n  font-weight: 900;\n  font-family: "Monoton";\n  color: var(--color-primary);\n  text-shadow: 6px 6px 0px #01131B;\n  line-height: 1;\n  margin-bottom: 2rem;\n}\n@media (max-width: 768px) {\n  .not-found__error-code {\n    font-size: 8rem;\n    text-shadow: 4px 4px 0px #01131B;\n    margin-bottom: 2rem;\n  }\n}\n.not-found__title {\n  font-size: 2.625rem;\n  line-height: 3rem;\n  font-weight: 700;\n  color: var(--text-primary);\n  margin: 0 0 1rem 0;\n  line-height: 1.2;\n}\n@media (max-width: 768px) {\n  .not-found__title {\n    font-size: 1.625rem;\n    line-height: 3rem;\n  }\n}\n.not-found__subtitle {\n  font-size: 1rem;\n  line-height: 1.5rem;\n  color: var(--text-secondary);\n  margin: 0 0 3rem 0;\n  line-height: 1.6;\n  max-width: 600px;\n  margin-left: auto;\n  margin-right: auto;\n}\n@media (max-width: 768px) {\n  .not-found__subtitle {\n    font-size: 0.9375rem;\n    line-height: 1.5rem;\n    margin-bottom: 2rem;\n  }\n}\n.not-found__actions {\n  display: flex;\n  gap: 1rem;\n  justify-content: center;\n  flex-wrap: wrap;\n  margin-bottom: 3rem;\n}\n@media (max-width: 768px) {\n  .not-found__actions {\n    flex-direction: column;\n    margin-bottom: 2rem;\n  }\n}\n.not-found__divider {\n  height: 2px;\n  background-color: var(--border-color);\n  margin: 3rem auto;\n  max-width: 200px;\n}\n@media (max-width: 768px) {\n  .not-found__divider {\n    margin: 2rem auto;\n  }\n}\n.not-found__quick-links {\n  display: grid;\n  grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));\n  gap: 1rem;\n  max-width: 700px;\n  margin: 0 auto;\n}\n@media (max-width: 768px) {\n  .not-found__quick-links {\n    grid-template-columns: 1fr 1fr;\n    gap: 0.5rem;\n  }\n}\n@media (max-width: 480px) {\n  .not-found__quick-links {\n    grid-template-columns: 1fr;\n  }\n}\n.not-found__link-card {\n  background-color: var(--bg-secondary);\n  border: 4px solid var(--border-color);\n  padding: 2rem 1rem;\n  cursor: pointer;\n  transition: all 150ms ease-in-out;\n  box-shadow: 4px 4px 0px #01131B;\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n  text-align: center;\n  gap: 0.5rem;\n}\n.not-found__link-card:hover:not(:disabled):not(.button--disabled) {\n  box-shadow: 2px 2px 0px #01131B;\n  transform: translate(2px, 2px);\n}\n.not-found__link-card:active:not(:disabled):not(.button--disabled) {\n  box-shadow: 0px 0px 0px #01131B;\n  transform: translate(4px, 4px);\n}\n.not-found__link-card:hover {\n  background-color: var(--color-primary);\n}\n.not-found__link-card:hover .not-found__link-icon,\n.not-found__link-card:hover .not-found__link-title,\n.not-found__link-card:hover .not-found__link-description {\n  color: var(--text-dark);\n}\n.not-found__link-card:hover .not-found__link-icon {\n  transform: scale(1.1);\n}\n@media (max-width: 768px) {\n  .not-found__link-card {\n    padding: 1rem 0.5rem;\n    gap: 0.5rem;\n  }\n}\n.not-found__link-icon {\n  width: 2rem;\n  height: 2rem;\n  color: var(--color-primary);\n  transition: all 300ms ease-in-out;\n}\n.not-found__link-icon svg {\n  width: 100%;\n  height: 100%;\n}\n@media (max-width: 768px) {\n  .not-found__link-icon {\n    width: 1.5rem;\n    height: 1.5rem;\n  }\n}\n.not-found__link-title {\n  font-size: 1.125rem;\n  line-height: 1.75rem;\n  font-weight: 700;\n  color: var(--text-primary);\n  margin: 0;\n  line-height: 1.2;\n  transition: all 150ms ease-in-out;\n}\n@media (max-width: 768px) {\n  .not-found__link-title {\n    font-size: 1rem;\n    line-height: 1.5rem;\n  }\n}\n.not-found__link-description {\n  font-size: 0.875rem;\n  line-height: 1.5rem;\n  color: var(--text-secondary);\n  margin: 0;\n  line-height: 1.4;\n  transition: all 150ms ease-in-out;\n}\n@media (max-width: 768px) {\n  .not-found__link-description {\n    font-size: 0.75rem;\n    line-height: 1rem;\n  }\n}\n@keyframes fadeIn {\n  from {\n    opacity: 0;\n    transform: translateY(20px);\n  }\n  to {\n    opacity: 1;\n    transform: translateY(0);\n  }\n}\n.not-found__error-code {\n  animation: fadeIn 0.5s ease-out;\n}\n.not-found__title {\n  animation: fadeIn 0.7s ease-out;\n}\n.not-found__subtitle {\n  animation: fadeIn 0.9s ease-out;\n}\n.not-found__actions {\n  animation: fadeIn 1.1s ease-out;\n}\n.not-found__quick-links {\n  animation: fadeIn 1.3s ease-out;\n}\n/*# sourceMappingURL=not-found.css.map */\n'] }]
  }], () => [{ type: Router }], null);
})();
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(NotFoundComponent, { className: "NotFoundComponent", filePath: "src/app/pages/not-found/not-found.ts", lineNumber: 20 });
})();
export {
  NotFoundComponent as default
};
//# sourceMappingURL=chunk-AZUD35GM.js.map
