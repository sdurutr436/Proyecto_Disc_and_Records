import {
  CommonModule,
  Component,
  Input,
  LoadingService,
  inject,
  setClassMetadata,
  signal,
  ɵsetClassDebugInfo,
  ɵɵadvance,
  ɵɵclassMap,
  ɵɵconditional,
  ɵɵconditionalCreate,
  ɵɵdefineComponent,
  ɵɵdomElement,
  ɵɵdomElementEnd,
  ɵɵdomElementStart,
  ɵɵnamespaceSVG,
  ɵɵnextContext,
  ɵɵtext,
  ɵɵtextInterpolate
} from "./chunk-MWU7IQTJ.js";

// src/app/components/shared/spinner/spinner.ts
function Spinner_Conditional_0_Conditional_14_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275domElementStart(0, "p", 13);
    \u0275\u0275text(1);
    \u0275\u0275domElementEnd();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext(2);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(ctx_r0.displayMessage);
  }
}
function Spinner_Conditional_0_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275domElementStart(0, "div")(1, "div", 1)(2, "div");
    \u0275\u0275namespaceSVG();
    \u0275\u0275domElementStart(3, "svg", 2);
    \u0275\u0275domElement(4, "ellipse", 3)(5, "ellipse", 4)(6, "ellipse", 5)(7, "ellipse", 6)(8, "ellipse", 7)(9, "ellipse", 8)(10, "ellipse", 9)(11, "ellipse", 10)(12, "circle", 11)(13, "circle", 12);
    \u0275\u0275domElementEnd()();
    \u0275\u0275conditionalCreate(14, Spinner_Conditional_0_Conditional_14_Template, 2, 1, "p", 13);
    \u0275\u0275domElementEnd()();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext();
    \u0275\u0275classMap(ctx_r0.overlayClasses);
    \u0275\u0275advance(2);
    \u0275\u0275classMap(ctx_r0.spinnerClasses);
    \u0275\u0275advance(12);
    \u0275\u0275conditional(ctx_r0.displayMessage ? 14 : -1);
  }
}
function Spinner_Conditional_1_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275domElementStart(0, "div");
    \u0275\u0275namespaceSVG();
    \u0275\u0275domElementStart(1, "svg", 2);
    \u0275\u0275domElement(2, "ellipse", 3)(3, "ellipse", 4)(4, "ellipse", 5)(5, "ellipse", 6)(6, "ellipse", 7)(7, "ellipse", 8)(8, "ellipse", 9)(9, "ellipse", 10)(10, "circle", 11)(11, "circle", 12);
    \u0275\u0275domElementEnd()();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext();
    \u0275\u0275classMap(ctx_r0.spinnerClasses);
  }
}
var Spinner = class _Spinner {
  loadingService = inject(LoadingService);
  /**
   * Controla la visibilidad del spinner
   * Si no se proporciona, usa el estado global del LoadingService
   */
  show;
  /**
   * Modo de visualización
   * - global: Overlay de pantalla completa
   * - inline: Spinner dentro de contenedor
   * - button: Spinner pequeño para botones
   */
  mode = "inline";
  /**
   * Tamaño del spinner
   */
  size = "md";
  /**
   * Mensaje a mostrar (solo en modo global)
   */
  message;
  /**
   * ID para loading local (opcional)
   * Si se proporciona, el spinner se vincula al estado local de ese ID
   */
  localId;
  /**
   * Color del spinner
   */
  color = "primary";
  /** Suscripción para limpieza */
  subscription;
  /** Estado local para cuando se usa localId */
  localLoading = signal(false, ...ngDevMode ? [{ debugName: "localLoading" }] : []);
  ngOnInit() {
    if (this.localId) {
      this.subscription = this.loadingService.localStates$.subscribe((states) => {
        this.localLoading.set(states.get(this.localId) ?? false);
      });
    }
  }
  ngOnDestroy() {
    this.subscription?.unsubscribe();
  }
  /**
   * Determina si el spinner debe mostrarse
   */
  get isVisible() {
    if (this.show !== void 0) {
      return this.show;
    }
    if (this.localId) {
      return this.localLoading();
    }
    return this.loadingService.isLoading();
  }
  /**
   * Obtiene el mensaje a mostrar
   */
  get displayMessage() {
    return this.message ?? this.loadingService.message();
  }
  /**
   * Clases CSS dinámicas
   */
  get spinnerClasses() {
    const classes = ["spinner"];
    classes.push(`spinner--${this.mode}`);
    classes.push(`spinner--${this.size}`);
    classes.push(`spinner--${this.color}`);
    return classes.join(" ");
  }
  /**
   * Clases para el overlay (solo modo global)
   */
  get overlayClasses() {
    return this.isVisible ? "spinner-overlay spinner-overlay--visible" : "spinner-overlay";
  }
  static \u0275fac = function Spinner_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _Spinner)();
  };
  static \u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _Spinner, selectors: [["app-spinner"]], inputs: { show: "show", mode: "mode", size: "size", message: "message", localId: "localId", color: "color" }, decls: 2, vars: 2, consts: [[3, "class"], [1, "spinner-container"], ["viewBox", "0 0 100 100", "xmlns", "http://www.w3.org/2000/svg", 1, "spinner__flower"], ["cx", "50", "cy", "20", "rx", "12", "ry", "18", 1, "flower__petal"], ["cx", "50", "cy", "20", "rx", "12", "ry", "18", "transform", "rotate(45 50 50)", 1, "flower__petal"], ["cx", "50", "cy", "20", "rx", "12", "ry", "18", "transform", "rotate(90 50 50)", 1, "flower__petal"], ["cx", "50", "cy", "20", "rx", "12", "ry", "18", "transform", "rotate(135 50 50)", 1, "flower__petal"], ["cx", "50", "cy", "20", "rx", "12", "ry", "18", "transform", "rotate(180 50 50)", 1, "flower__petal"], ["cx", "50", "cy", "20", "rx", "12", "ry", "18", "transform", "rotate(225 50 50)", 1, "flower__petal"], ["cx", "50", "cy", "20", "rx", "12", "ry", "18", "transform", "rotate(270 50 50)", 1, "flower__petal"], ["cx", "50", "cy", "20", "rx", "12", "ry", "18", "transform", "rotate(315 50 50)", 1, "flower__petal"], ["cx", "50", "cy", "50", "r", "14", 1, "flower__center"], ["cx", "50", "cy", "50", "r", "3", 1, "flower__center-dot"], [1, "spinner__message"]], template: function Spinner_Template(rf, ctx) {
    if (rf & 1) {
      \u0275\u0275conditionalCreate(0, Spinner_Conditional_0_Template, 15, 5, "div", 0);
      \u0275\u0275conditionalCreate(1, Spinner_Conditional_1_Template, 12, 2, "div", 0);
    }
    if (rf & 2) {
      \u0275\u0275conditional(ctx.mode === "global" ? 0 : -1);
      \u0275\u0275advance();
      \u0275\u0275conditional(ctx.mode !== "global" && ctx.isVisible ? 1 : -1);
    }
  }, dependencies: [CommonModule], styles: ['@charset "UTF-8";\n\n\n\n.spinner-overlay[_ngcontent-%COMP%] {\n  position: fixed;\n  top: 0;\n  left: 0;\n  width: 100%;\n  height: 100%;\n  background-color: rgba(0, 0, 0, 0.7);\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  z-index: 10;\n  opacity: 0;\n  visibility: hidden;\n  transition: all 300ms ease-in-out;\n}\n.spinner-overlay--visible[_ngcontent-%COMP%] {\n  opacity: 1;\n  visibility: visible;\n}\n.spinner-container[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  gap: 2rem;\n  align-items: center;\n  padding: 4rem;\n  background-color: var(--bg-primary);\n  border: 3px solid var(--border-color);\n  border-radius: 5px;\n  box-shadow: 4px 4px 0px var(--shadow-color);\n}\n.spinner__message[_ngcontent-%COMP%] {\n  font-size: 0.9375rem;\n  font-weight: 700;\n  color: var(--text-primary);\n  text-transform: uppercase;\n  letter-spacing: 0.05em;\n  margin: 0;\n}\n.spinner[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  display: inline-flex;\n}\n.spinner__flower[_ngcontent-%COMP%] {\n  animation: _ngcontent-%COMP%_flower-spin 2s linear infinite;\n}\n.flower__petal[_ngcontent-%COMP%] {\n  fill: var(--color-primary);\n  stroke: var(--border-color);\n  stroke-width: 1.5;\n}\n.flower__center[_ngcontent-%COMP%] {\n  fill: var(--color-secondary);\n  stroke: var(--border-color);\n  stroke-width: 2;\n}\n.flower__center-dot[_ngcontent-%COMP%] {\n  fill: var(--text-dark);\n}\n@keyframes _ngcontent-%COMP%_flower-spin {\n  0% {\n    transform: rotate(0deg);\n  }\n  100% {\n    transform: rotate(360deg);\n  }\n}\n.spinner--sm[_ngcontent-%COMP%]   .spinner__flower[_ngcontent-%COMP%] {\n  width: 24px;\n  height: 24px;\n}\n.spinner--md[_ngcontent-%COMP%]   .spinner__flower[_ngcontent-%COMP%] {\n  width: 44px;\n  height: 44px;\n}\n.spinner--lg[_ngcontent-%COMP%]   .spinner__flower[_ngcontent-%COMP%] {\n  width: 64px;\n  height: 64px;\n}\n.spinner--global[_ngcontent-%COMP%]   .spinner__flower[_ngcontent-%COMP%] {\n  width: 100px;\n  height: 100px;\n}\n.spinner--inline[_ngcontent-%COMP%] {\n  display: inline-flex;\n}\n.spinner--button[_ngcontent-%COMP%]   .spinner__flower[_ngcontent-%COMP%] {\n  width: 20px;\n  height: 20px;\n}\n.spinner--primary[_ngcontent-%COMP%]   .flower__petal[_ngcontent-%COMP%] {\n  fill: var(--color-primary);\n}\n.spinner--primary[_ngcontent-%COMP%]   .flower__center[_ngcontent-%COMP%] {\n  fill: var(--color-secondary);\n}\n.spinner--secondary[_ngcontent-%COMP%]   .flower__petal[_ngcontent-%COMP%] {\n  fill: var(--color-secondary);\n}\n.spinner--secondary[_ngcontent-%COMP%]   .flower__center[_ngcontent-%COMP%] {\n  fill: var(--color-primary);\n}\n.spinner--white[_ngcontent-%COMP%]   .flower__petal[_ngcontent-%COMP%] {\n  fill: #FBFAF2;\n  stroke: color-mix(in srgb, var(--text-white) 50%, transparent);\n}\n.spinner--white[_ngcontent-%COMP%]   .flower__center[_ngcontent-%COMP%] {\n  fill: var(--color-primary);\n  stroke: #FBFAF2;\n}\n.spinner--white[_ngcontent-%COMP%]   .flower__center-dot[_ngcontent-%COMP%] {\n  fill: #FBFAF2;\n}\n@media (max-width: 767px) {\n  .spinner-container[_ngcontent-%COMP%] {\n    padding: 3rem;\n  }\n  .spinner--global[_ngcontent-%COMP%]   .spinner__flower[_ngcontent-%COMP%] {\n    width: 72px;\n    height: 72px;\n  }\n  .spinner__message[_ngcontent-%COMP%] {\n    font-size: 0.875rem;\n  }\n}\n/*# sourceMappingURL=spinner.css.map */'] });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(Spinner, [{
    type: Component,
    args: [{ selector: "app-spinner", standalone: true, imports: [CommonModule], template: `<!-- Spinner Global con Overlay -->\r
@if (mode === 'global') {\r
<div [class]="overlayClasses">\r
  <div class="spinner-container">\r
    <div [class]="spinnerClasses">\r
      <svg class="spinner__flower" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">\r
        <!-- P\xE9talos de la margarita -->\r
        <ellipse cx="50" cy="20" rx="12" ry="18" class="flower__petal"/>\r
        <ellipse cx="50" cy="20" rx="12" ry="18" class="flower__petal" transform="rotate(45 50 50)"/>\r
        <ellipse cx="50" cy="20" rx="12" ry="18" class="flower__petal" transform="rotate(90 50 50)"/>\r
        <ellipse cx="50" cy="20" rx="12" ry="18" class="flower__petal" transform="rotate(135 50 50)"/>\r
        <ellipse cx="50" cy="20" rx="12" ry="18" class="flower__petal" transform="rotate(180 50 50)"/>\r
        <ellipse cx="50" cy="20" rx="12" ry="18" class="flower__petal" transform="rotate(225 50 50)"/>\r
        <ellipse cx="50" cy="20" rx="12" ry="18" class="flower__petal" transform="rotate(270 50 50)"/>\r
        <ellipse cx="50" cy="20" rx="12" ry="18" class="flower__petal" transform="rotate(315 50 50)"/>\r
        <!-- Centro de la flor -->\r
        <circle cx="50" cy="50" r="14" class="flower__center"/>\r
        <!-- Puntos decorativos en el centro -->\r
        <circle cx="50" cy="50" r="3" class="flower__center-dot"/>\r
      </svg>\r
    </div>\r
    @if (displayMessage) {\r
    <p class="spinner__message">{{ displayMessage }}</p>\r
    }\r
  </div>\r
</div>\r
}\r
\r
<!-- Spinner Inline o Button -->\r
@if (mode !== 'global' && isVisible) {\r
<div [class]="spinnerClasses">\r
  <svg class="spinner__flower" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">\r
    <!-- P\xE9talos de la margarita -->\r
    <ellipse cx="50" cy="20" rx="12" ry="18" class="flower__petal"/>\r
    <ellipse cx="50" cy="20" rx="12" ry="18" class="flower__petal" transform="rotate(45 50 50)"/>\r
    <ellipse cx="50" cy="20" rx="12" ry="18" class="flower__petal" transform="rotate(90 50 50)"/>\r
    <ellipse cx="50" cy="20" rx="12" ry="18" class="flower__petal" transform="rotate(135 50 50)"/>\r
    <ellipse cx="50" cy="20" rx="12" ry="18" class="flower__petal" transform="rotate(180 50 50)"/>\r
    <ellipse cx="50" cy="20" rx="12" ry="18" class="flower__petal" transform="rotate(225 50 50)"/>\r
    <ellipse cx="50" cy="20" rx="12" ry="18" class="flower__petal" transform="rotate(270 50 50)"/>\r
    <ellipse cx="50" cy="20" rx="12" ry="18" class="flower__petal" transform="rotate(315 50 50)"/>\r
    <!-- Centro de la flor -->\r
    <circle cx="50" cy="50" r="14" class="flower__center"/>\r
    <!-- Puntos decorativos en el centro -->\r
    <circle cx="50" cy="50" r="3" class="flower__center-dot"/>\r
  </svg>\r
</div>\r
}\r
`, styles: ['@charset "UTF-8";\n\n/* src/app/components/shared/spinner/spinner.scss */\n.spinner-overlay {\n  position: fixed;\n  top: 0;\n  left: 0;\n  width: 100%;\n  height: 100%;\n  background-color: rgba(0, 0, 0, 0.7);\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  z-index: 10;\n  opacity: 0;\n  visibility: hidden;\n  transition: all 300ms ease-in-out;\n}\n.spinner-overlay--visible {\n  opacity: 1;\n  visibility: visible;\n}\n.spinner-container {\n  display: flex;\n  flex-direction: column;\n  gap: 2rem;\n  align-items: center;\n  padding: 4rem;\n  background-color: var(--bg-primary);\n  border: 3px solid var(--border-color);\n  border-radius: 5px;\n  box-shadow: 4px 4px 0px var(--shadow-color);\n}\n.spinner__message {\n  font-size: 0.9375rem;\n  font-weight: 700;\n  color: var(--text-primary);\n  text-transform: uppercase;\n  letter-spacing: 0.05em;\n  margin: 0;\n}\n.spinner {\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  display: inline-flex;\n}\n.spinner__flower {\n  animation: flower-spin 2s linear infinite;\n}\n.flower__petal {\n  fill: var(--color-primary);\n  stroke: var(--border-color);\n  stroke-width: 1.5;\n}\n.flower__center {\n  fill: var(--color-secondary);\n  stroke: var(--border-color);\n  stroke-width: 2;\n}\n.flower__center-dot {\n  fill: var(--text-dark);\n}\n@keyframes flower-spin {\n  0% {\n    transform: rotate(0deg);\n  }\n  100% {\n    transform: rotate(360deg);\n  }\n}\n.spinner--sm .spinner__flower {\n  width: 24px;\n  height: 24px;\n}\n.spinner--md .spinner__flower {\n  width: 44px;\n  height: 44px;\n}\n.spinner--lg .spinner__flower {\n  width: 64px;\n  height: 64px;\n}\n.spinner--global .spinner__flower {\n  width: 100px;\n  height: 100px;\n}\n.spinner--inline {\n  display: inline-flex;\n}\n.spinner--button .spinner__flower {\n  width: 20px;\n  height: 20px;\n}\n.spinner--primary .flower__petal {\n  fill: var(--color-primary);\n}\n.spinner--primary .flower__center {\n  fill: var(--color-secondary);\n}\n.spinner--secondary .flower__petal {\n  fill: var(--color-secondary);\n}\n.spinner--secondary .flower__center {\n  fill: var(--color-primary);\n}\n.spinner--white .flower__petal {\n  fill: #FBFAF2;\n  stroke: color-mix(in srgb, var(--text-white) 50%, transparent);\n}\n.spinner--white .flower__center {\n  fill: var(--color-primary);\n  stroke: #FBFAF2;\n}\n.spinner--white .flower__center-dot {\n  fill: #FBFAF2;\n}\n@media (max-width: 767px) {\n  .spinner-container {\n    padding: 3rem;\n  }\n  .spinner--global .spinner__flower {\n    width: 72px;\n    height: 72px;\n  }\n  .spinner__message {\n    font-size: 0.875rem;\n  }\n}\n/*# sourceMappingURL=spinner.css.map */\n'] }]
  }], null, { show: [{
    type: Input
  }], mode: [{
    type: Input
  }], size: [{
    type: Input
  }], message: [{
    type: Input
  }], localId: [{
    type: Input
  }], color: [{
    type: Input
  }] });
})();
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(Spinner, { className: "Spinner", filePath: "src/app/components/shared/spinner/spinner.ts", lineNumber: 41 });
})();

export {
  Spinner
};
//# sourceMappingURL=chunk-2MFY2W42.js.map
