import {
  CommonModule,
  DomSanitizer,
  ForgotPasswordForm,
  FormsModule,
  LoadingService,
  LoginForm,
  Modal,
  NG_VALUE_ACCESSOR,
  NgForOf,
  NgIf,
  NgStyle,
  RegisterForm,
  RouterLink,
  RouterModule,
  Spinner
} from "./chunk-I3P4YWK5.js";
import {
  ApplicationRef,
  Component,
  ElementRef,
  EnvironmentInjector,
  EventEmitter,
  HostListener,
  Injectable,
  Input,
  Output,
  Renderer2,
  Subject,
  ViewChild,
  ViewChildren,
  __objRest,
  __spreadProps,
  __spreadValues,
  createComponent,
  forwardRef,
  inject,
  input,
  setClassMetadata,
  signal,
  ɵsetClassDebugInfo,
  ɵɵProvidersFeature,
  ɵɵadvance,
  ɵɵattribute,
  ɵɵclassMap,
  ɵɵclassProp,
  ɵɵconditional,
  ɵɵconditionalCreate,
  ɵɵdefineComponent,
  ɵɵdefineInjectable,
  ɵɵdirectiveInject,
  ɵɵdomElement,
  ɵɵdomElementEnd,
  ɵɵdomElementStart,
  ɵɵdomListener,
  ɵɵdomProperty,
  ɵɵelement,
  ɵɵelementEnd,
  ɵɵelementStart,
  ɵɵgetCurrentView,
  ɵɵinject,
  ɵɵlistener,
  ɵɵloadQuery,
  ɵɵnamespaceHTML,
  ɵɵnamespaceSVG,
  ɵɵnextContext,
  ɵɵprojection,
  ɵɵprojectionDef,
  ɵɵproperty,
  ɵɵpureFunction0,
  ɵɵqueryRefresh,
  ɵɵrepeater,
  ɵɵrepeaterCreate,
  ɵɵrepeaterTrackByIdentity,
  ɵɵresetView,
  ɵɵrestoreView,
  ɵɵsanitizeHtml,
  ɵɵsanitizeUrl,
  ɵɵstyleProp,
  ɵɵtemplate,
  ɵɵtext,
  ɵɵtextInterpolate,
  ɵɵtextInterpolate1,
  ɵɵviewQuery
} from "./chunk-LS3LZYZQ.js";

// src/app/components/shared/button/button.ts
var _c0 = ["*", "*"];
function Button_Conditional_0_Conditional_1_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275domElement(0, "span", 3);
  }
}
function Button_Conditional_0_Template(rf, ctx) {
  if (rf & 1) {
    const _r1 = \u0275\u0275getCurrentView();
    \u0275\u0275domElementStart(0, "a", 2);
    \u0275\u0275domListener("click", function Button_Conditional_0_Template_a_click_0_listener($event) {
      \u0275\u0275restoreView(_r1);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.onClick($event));
    });
    \u0275\u0275conditionalCreate(1, Button_Conditional_0_Conditional_1_Template, 1, 0, "span", 3);
    \u0275\u0275domElementStart(2, "span");
    \u0275\u0275projection(3);
    \u0275\u0275domElementEnd()();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275classMap(ctx_r1.buttonClasses);
    \u0275\u0275domProperty("href", ctx_r1.href, \u0275\u0275sanitizeUrl);
    \u0275\u0275attribute("aria-disabled", ctx_r1.isDisabled)("tabindex", ctx_r1.isDisabled ? -1 : 0);
    \u0275\u0275advance();
    \u0275\u0275conditional(ctx_r1.isLoading ? 1 : -1);
    \u0275\u0275advance();
    \u0275\u0275classProp("button__content--hidden", ctx_r1.isLoading);
  }
}
function Button_Conditional_1_Conditional_1_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275domElement(0, "span", 3);
  }
}
function Button_Conditional_1_Template(rf, ctx) {
  if (rf & 1) {
    const _r3 = \u0275\u0275getCurrentView();
    \u0275\u0275domElementStart(0, "button", 4);
    \u0275\u0275domListener("click", function Button_Conditional_1_Template_button_click_0_listener($event) {
      \u0275\u0275restoreView(_r3);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.onClick($event));
    });
    \u0275\u0275conditionalCreate(1, Button_Conditional_1_Conditional_1_Template, 1, 0, "span", 3);
    \u0275\u0275domElementStart(2, "span");
    \u0275\u0275projection(3, 1);
    \u0275\u0275domElementEnd()();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275classMap(ctx_r1.buttonClasses);
    \u0275\u0275domProperty("type", ctx_r1.type)("disabled", ctx_r1.isDisabled);
    \u0275\u0275advance();
    \u0275\u0275conditional(ctx_r1.isLoading ? 1 : -1);
    \u0275\u0275advance();
    \u0275\u0275classProp("button__content--hidden", ctx_r1.isLoading);
  }
}
var Button = class _Button {
  loadingService = inject(LoadingService);
  subscription;
  variant = "primary";
  size = "md";
  disabled = false;
  type = "button";
  href;
  fullWidth = false;
  /**
   * Estado de carga local del botón
   * Si es true, muestra spinner y deshabilita el botón
   */
  loading = false;
  /**
   * ID para vincular con LoadingService
   * Si se proporciona, el botón usa el estado del servicio
   */
  loadingId;
  clicked = new EventEmitter();
  /** Estado interno de loading cuando se usa loadingId */
  serviceLoading = signal(false, ...ngDevMode ? [{ debugName: "serviceLoading" }] : []);
  ngOnInit() {
    if (this.loadingId) {
      this.subscription = this.loadingService.localStates$.subscribe((states) => {
        this.serviceLoading.set(states.get(this.loadingId) ?? false);
      });
    }
  }
  ngOnDestroy() {
    this.subscription?.unsubscribe();
  }
  onClick(event) {
    if (!this.isDisabled) {
      this.clicked.emit(event);
    }
  }
  get isLink() {
    return !!this.href;
  }
  /**
   * Determina si el botón está en estado de carga
   */
  get isLoading() {
    if (this.loadingId) {
      return this.serviceLoading();
    }
    return this.loading;
  }
  /**
   * Determina si el botón debe estar deshabilitado
   */
  get isDisabled() {
    return this.disabled || this.isLoading;
  }
  get buttonClasses() {
    const classes = ["button"];
    classes.push(`button--${this.variant}`);
    classes.push(`button--${this.size}`);
    if (this.isDisabled) {
      classes.push("button--disabled");
    }
    if (this.isLoading) {
      classes.push("button--loading");
    }
    if (this.fullWidth) {
      classes.push("button--full-width");
    }
    return classes.join(" ");
  }
  static \u0275fac = function Button_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _Button)();
  };
  static \u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _Button, selectors: [["app-button"]], inputs: { variant: "variant", size: "size", disabled: "disabled", type: "type", href: "href", fullWidth: "fullWidth", loading: "loading", loadingId: "loadingId" }, outputs: { clicked: "clicked" }, ngContentSelectors: _c0, decls: 2, vars: 2, consts: [[3, "href", "class"], [3, "type", "class", "disabled"], [3, "click", "href"], [1, "button__spinner"], [3, "click", "type", "disabled"]], template: function Button_Template(rf, ctx) {
    if (rf & 1) {
      \u0275\u0275projectionDef(_c0);
      \u0275\u0275conditionalCreate(0, Button_Conditional_0_Template, 4, 8, "a", 0);
      \u0275\u0275conditionalCreate(1, Button_Conditional_1_Template, 4, 7, "button", 1);
    }
    if (rf & 2) {
      \u0275\u0275conditional(ctx.isLink ? 0 : -1);
      \u0275\u0275advance();
      \u0275\u0275conditional(!ctx.isLink ? 1 : -1);
    }
  }, dependencies: [CommonModule], styles: [`@charset "UTF-8";



.button[_ngcontent-%COMP%] {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  font-family: "Space Grotesk", sans-serif;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  text-decoration: none;
  cursor: pointer;
  border: 3px solid var(--border-color);
  border-radius: 9999px;
  transition: all 150ms ease-in-out;
  white-space: nowrap;
  box-sizing: border-box;
  box-shadow: 4px 4px 0px var(--shadow-color);
  position: relative;
  padding: 1rem 3rem;
  font-size: 0.875rem;
  min-height: 44px;
}
.button[_ngcontent-%COMP%]:focus-visible {
  outline: 3px solid var(--color-accent);
  outline-offset: 2px;
}
.button--primary[_ngcontent-%COMP%] {
  background-color: var(--color-primary);
  color: var(--text-dark);
  border-color: var(--border-color);
  box-shadow: 4px 4px 0px var(--shadow-color);
}
.button--primary[_ngcontent-%COMP%]:hover:not(.button--disabled) {
  background-color: var(--color-secondary);
  box-shadow: 2px 2px 0px var(--shadow-color);
  transform: translate(2px, 2px);
}
.button--primary[_ngcontent-%COMP%]:active:not(.button--disabled) {
  box-shadow: 0px 0px 0px var(--shadow-color);
  transform: translate(4px, 4px);
}
.button--secondary[_ngcontent-%COMP%] {
  background-color: var(--bg-secondary);
  color: var(--text-primary);
  border-color: var(--border-color);
  box-shadow: 4px 4px 0px var(--shadow-color);
}
.button--secondary[_ngcontent-%COMP%]:hover:not(.button--disabled) {
  background-color: var(--bg-primary);
  box-shadow: 2px 2px 0px var(--shadow-color);
  transform: translate(2px, 2px);
}
.button--secondary[_ngcontent-%COMP%]:active:not(.button--disabled) {
  box-shadow: 0px 0px 0px var(--shadow-color);
  transform: translate(4px, 4px);
}
.button--ghost[_ngcontent-%COMP%] {
  background-color: transparent;
  color: var(--text-primary);
  border-color: var(--border-color);
  box-shadow: none;
}
.button--ghost[_ngcontent-%COMP%]:hover:not(.button--disabled) {
  background-color: var(--bg-secondary);
  box-shadow: 2px 2px 0px var(--shadow-color);
}
.button--ghost[_ngcontent-%COMP%]:active:not(.button--disabled) {
  background-color: var(--color-primary);
  transform: translate(1px, 1px);
}
.button--danger[_ngcontent-%COMP%] {
  background-color: #E04A4A;
  color: #FBFAF2;
  border-color: var(--border-color);
  box-shadow: 4px 4px 0px var(--shadow-color);
}
.button--danger[_ngcontent-%COMP%]:hover:not(.button--disabled) {
  background-color: var(--color-accent);
  box-shadow: 2px 2px 0px var(--shadow-color);
  transform: translate(2px, 2px);
}
.button--danger[_ngcontent-%COMP%]:active:not(.button--disabled) {
  box-shadow: 0px 0px 0px var(--shadow-color);
  transform: translate(4px, 4px);
}
.button--sm[_ngcontent-%COMP%] {
  padding: 0.5rem 2rem;
  font-size: 0.75rem;
  min-height: 36px;
}
.button--md[_ngcontent-%COMP%] {
  padding: 1rem 3rem;
  font-size: 0.875rem;
  min-height: 44px;
}
.button--lg[_ngcontent-%COMP%] {
  padding: 2rem 4rem;
  font-size: 0.9375rem;
  min-height: 52px;
}
.button--disabled[_ngcontent-%COMP%] {
  opacity: 0.5;
  cursor: not-allowed;
  pointer-events: none;
  box-shadow: none;
}
.button--loading[_ngcontent-%COMP%] {
  position: relative;
  cursor: wait;
  pointer-events: none;
}
.button--loading[_ngcontent-%COMP%]   .button__content[_ngcontent-%COMP%] {
  visibility: hidden;
}
.button__spinner[_ngcontent-%COMP%] {
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  width: 22px;
  height: 22px;
  animation: _ngcontent-%COMP%_button-flower-spin 1.5s linear infinite;
  background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 100 100' xmlns='http://www.w3.org/2000/svg'%3E%3Cellipse cx='50' cy='20' rx='12' ry='18' fill='%23333' stroke='%23222' stroke-width='1.5'/%3E%3Cellipse cx='50' cy='20' rx='12' ry='18' fill='%23333' stroke='%23222' stroke-width='1.5' transform='rotate(45 50 50)'/%3E%3Cellipse cx='50' cy='20' rx='12' ry='18' fill='%23333' stroke='%23222' stroke-width='1.5' transform='rotate(90 50 50)'/%3E%3Cellipse cx='50' cy='20' rx='12' ry='18' fill='%23333' stroke='%23222' stroke-width='1.5' transform='rotate(135 50 50)'/%3E%3Cellipse cx='50' cy='20' rx='12' ry='18' fill='%23333' stroke='%23222' stroke-width='1.5' transform='rotate(180 50 50)'/%3E%3Cellipse cx='50' cy='20' rx='12' ry='18' fill='%23333' stroke='%23222' stroke-width='1.5' transform='rotate(225 50 50)'/%3E%3Cellipse cx='50' cy='20' rx='12' ry='18' fill='%23333' stroke='%23222' stroke-width='1.5' transform='rotate(270 50 50)'/%3E%3Cellipse cx='50' cy='20' rx='12' ry='18' fill='%23333' stroke='%23222' stroke-width='1.5' transform='rotate(315 50 50)'/%3E%3Ccircle cx='50' cy='50' r='14' fill='%23fff' stroke='%23222' stroke-width='2'/%3E%3Ccircle cx='50' cy='50' r='3' fill='%23333'/%3E%3C/svg%3E");
  background-size: contain;
  background-repeat: no-repeat;
}
.button__content--hidden[_ngcontent-%COMP%] {
  visibility: hidden;
}
@keyframes _ngcontent-%COMP%_button-flower-spin {
  0% {
    transform: translate(-50%, -50%) rotate(0deg);
  }
  100% {
    transform: translate(-50%, -50%) rotate(360deg);
  }
}
.button--sm[_ngcontent-%COMP%]   .button__spinner[_ngcontent-%COMP%] {
  width: 16px;
  height: 16px;
}
.button--lg[_ngcontent-%COMP%]   .button__spinner[_ngcontent-%COMP%] {
  width: 28px;
  height: 28px;
}
.button--full-width[_ngcontent-%COMP%] {
  width: 100%;
}
@media (max-width: 767px) {
  .button[_ngcontent-%COMP%] {
    padding: 0.5rem 2rem;
    font-size: 0.75rem;
  }
  .button--lg[_ngcontent-%COMP%] {
    padding: 1rem 3rem;
    font-size: 0.875rem;
  }
}
/*# sourceMappingURL=button.css.map */`] });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(Button, [{
    type: Component,
    args: [{ selector: "app-button", standalone: true, imports: [CommonModule], template: '<!-- Bot\xF3n como enlace si tiene href -->\n@if (isLink) {\n<a\n  [href]="href"\n  [class]="buttonClasses"\n  [attr.aria-disabled]="isDisabled"\n  [attr.tabindex]="isDisabled ? -1 : 0"\n  (click)="onClick($event)">\n  @if (isLoading) {\n  <span class="button__spinner"></span>\n  }\n  <span [class.button__content--hidden]="isLoading">\n    <ng-content></ng-content>\n  </span>\n</a>\n}\n\n<!-- Bot\xF3n normal si no tiene href -->\n@if (!isLink) {\n<button\n  [type]="type"\n  [class]="buttonClasses"\n  [disabled]="isDisabled"\n  (click)="onClick($event)">\n  @if (isLoading) {\n  <span class="button__spinner"></span>\n  }\n  <span [class.button__content--hidden]="isLoading">\n    <ng-content></ng-content>\n  </span>\n</button>\n}\n', styles: [`@charset "UTF-8";

/* src/app/components/shared/button/button.scss */
.button {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  font-family: "Space Grotesk", sans-serif;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  text-decoration: none;
  cursor: pointer;
  border: 3px solid var(--border-color);
  border-radius: 9999px;
  transition: all 150ms ease-in-out;
  white-space: nowrap;
  box-sizing: border-box;
  box-shadow: 4px 4px 0px var(--shadow-color);
  position: relative;
  padding: 1rem 3rem;
  font-size: 0.875rem;
  min-height: 44px;
}
.button:focus-visible {
  outline: 3px solid var(--color-accent);
  outline-offset: 2px;
}
.button--primary {
  background-color: var(--color-primary);
  color: var(--text-dark);
  border-color: var(--border-color);
  box-shadow: 4px 4px 0px var(--shadow-color);
}
.button--primary:hover:not(.button--disabled) {
  background-color: var(--color-secondary);
  box-shadow: 2px 2px 0px var(--shadow-color);
  transform: translate(2px, 2px);
}
.button--primary:active:not(.button--disabled) {
  box-shadow: 0px 0px 0px var(--shadow-color);
  transform: translate(4px, 4px);
}
.button--secondary {
  background-color: var(--bg-secondary);
  color: var(--text-primary);
  border-color: var(--border-color);
  box-shadow: 4px 4px 0px var(--shadow-color);
}
.button--secondary:hover:not(.button--disabled) {
  background-color: var(--bg-primary);
  box-shadow: 2px 2px 0px var(--shadow-color);
  transform: translate(2px, 2px);
}
.button--secondary:active:not(.button--disabled) {
  box-shadow: 0px 0px 0px var(--shadow-color);
  transform: translate(4px, 4px);
}
.button--ghost {
  background-color: transparent;
  color: var(--text-primary);
  border-color: var(--border-color);
  box-shadow: none;
}
.button--ghost:hover:not(.button--disabled) {
  background-color: var(--bg-secondary);
  box-shadow: 2px 2px 0px var(--shadow-color);
}
.button--ghost:active:not(.button--disabled) {
  background-color: var(--color-primary);
  transform: translate(1px, 1px);
}
.button--danger {
  background-color: #E04A4A;
  color: #FBFAF2;
  border-color: var(--border-color);
  box-shadow: 4px 4px 0px var(--shadow-color);
}
.button--danger:hover:not(.button--disabled) {
  background-color: var(--color-accent);
  box-shadow: 2px 2px 0px var(--shadow-color);
  transform: translate(2px, 2px);
}
.button--danger:active:not(.button--disabled) {
  box-shadow: 0px 0px 0px var(--shadow-color);
  transform: translate(4px, 4px);
}
.button--sm {
  padding: 0.5rem 2rem;
  font-size: 0.75rem;
  min-height: 36px;
}
.button--md {
  padding: 1rem 3rem;
  font-size: 0.875rem;
  min-height: 44px;
}
.button--lg {
  padding: 2rem 4rem;
  font-size: 0.9375rem;
  min-height: 52px;
}
.button--disabled {
  opacity: 0.5;
  cursor: not-allowed;
  pointer-events: none;
  box-shadow: none;
}
.button--loading {
  position: relative;
  cursor: wait;
  pointer-events: none;
}
.button--loading .button__content {
  visibility: hidden;
}
.button__spinner {
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  width: 22px;
  height: 22px;
  animation: button-flower-spin 1.5s linear infinite;
  background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 100 100' xmlns='http://www.w3.org/2000/svg'%3E%3Cellipse cx='50' cy='20' rx='12' ry='18' fill='%23333' stroke='%23222' stroke-width='1.5'/%3E%3Cellipse cx='50' cy='20' rx='12' ry='18' fill='%23333' stroke='%23222' stroke-width='1.5' transform='rotate(45 50 50)'/%3E%3Cellipse cx='50' cy='20' rx='12' ry='18' fill='%23333' stroke='%23222' stroke-width='1.5' transform='rotate(90 50 50)'/%3E%3Cellipse cx='50' cy='20' rx='12' ry='18' fill='%23333' stroke='%23222' stroke-width='1.5' transform='rotate(135 50 50)'/%3E%3Cellipse cx='50' cy='20' rx='12' ry='18' fill='%23333' stroke='%23222' stroke-width='1.5' transform='rotate(180 50 50)'/%3E%3Cellipse cx='50' cy='20' rx='12' ry='18' fill='%23333' stroke='%23222' stroke-width='1.5' transform='rotate(225 50 50)'/%3E%3Cellipse cx='50' cy='20' rx='12' ry='18' fill='%23333' stroke='%23222' stroke-width='1.5' transform='rotate(270 50 50)'/%3E%3Cellipse cx='50' cy='20' rx='12' ry='18' fill='%23333' stroke='%23222' stroke-width='1.5' transform='rotate(315 50 50)'/%3E%3Ccircle cx='50' cy='50' r='14' fill='%23fff' stroke='%23222' stroke-width='2'/%3E%3Ccircle cx='50' cy='50' r='3' fill='%23333'/%3E%3C/svg%3E");
  background-size: contain;
  background-repeat: no-repeat;
}
.button__content--hidden {
  visibility: hidden;
}
@keyframes button-flower-spin {
  0% {
    transform: translate(-50%, -50%) rotate(0deg);
  }
  100% {
    transform: translate(-50%, -50%) rotate(360deg);
  }
}
.button--sm .button__spinner {
  width: 16px;
  height: 16px;
}
.button--lg .button__spinner {
  width: 28px;
  height: 28px;
}
.button--full-width {
  width: 100%;
}
@media (max-width: 767px) {
  .button {
    padding: 0.5rem 2rem;
    font-size: 0.75rem;
  }
  .button--lg {
    padding: 1rem 3rem;
    font-size: 0.875rem;
  }
}
/*# sourceMappingURL=button.css.map */
`] }]
  }], null, { variant: [{
    type: Input
  }], size: [{
    type: Input
  }], disabled: [{
    type: Input
  }], type: [{
    type: Input
  }], href: [{
    type: Input
  }], fullWidth: [{
    type: Input
  }], loading: [{
    type: Input
  }], loadingId: [{
    type: Input
  }], clicked: [{
    type: Output
  }] });
})();
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(Button, { className: "Button", filePath: "src/app/components/shared/button/button.ts", lineNumber: 13 });
})();

// src/app/components/shared/card/card.ts
var _forTrack0 = ($index, $item) => $item.label;
function Card_Conditional_1_Conditional_2_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275domElement(0, "img", 1);
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext(2);
    \u0275\u0275domProperty("src", ctx_r0.imageUrl, \u0275\u0275sanitizeUrl)("alt", ctx_r0.imageAlt);
  }
}
function Card_Conditional_1_Conditional_3_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275domElement(0, "span", 2);
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext(2);
    \u0275\u0275domProperty("innerHTML", ctx_r0.safePlaceholderIcon, \u0275\u0275sanitizeHtml);
  }
}
function Card_Conditional_1_Conditional_4_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275domElementStart(0, "span", 3);
    \u0275\u0275text(1, "\u{1F3B5}");
    \u0275\u0275domElementEnd();
  }
}
function Card_Conditional_1_Conditional_6_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275domElementStart(0, "h3", 5);
    \u0275\u0275text(1);
    \u0275\u0275domElementEnd();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext(2);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(ctx_r0.title);
  }
}
function Card_Conditional_1_Conditional_7_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275domElementStart(0, "p", 6);
    \u0275\u0275text(1);
    \u0275\u0275domElementEnd();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext(2);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(ctx_r0.subtitle);
  }
}
function Card_Conditional_1_Conditional_9_For_2_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275domElementStart(0, "span", 11);
    \u0275\u0275text(1);
    \u0275\u0275domElementEnd();
  }
  if (rf & 2) {
    const badge_r2 = ctx.$implicit;
    const \u0275$index_33_r3 = ctx.$index;
    \u0275\u0275classProp("card__badge--alt", \u0275$index_33_r3 % 2 !== 0);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", badge_r2, " ");
  }
}
function Card_Conditional_1_Conditional_9_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275domElementStart(0, "div", 8);
    \u0275\u0275repeaterCreate(1, Card_Conditional_1_Conditional_9_For_2_Template, 2, 3, "span", 10, \u0275\u0275repeaterTrackByIdentity);
    \u0275\u0275domElementEnd();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext(2);
    \u0275\u0275advance();
    \u0275\u0275repeater(ctx_r0.badges);
  }
}
function Card_Conditional_1_Conditional_10_For_2_Conditional_1_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275domElement(0, "span", 14);
  }
  if (rf & 2) {
    const action_r5 = \u0275\u0275nextContext().$implicit;
    \u0275\u0275domProperty("innerHTML", action_r5.icon, \u0275\u0275sanitizeHtml);
  }
}
function Card_Conditional_1_Conditional_10_For_2_Template(rf, ctx) {
  if (rf & 1) {
    const _r4 = \u0275\u0275getCurrentView();
    \u0275\u0275domElementStart(0, "button", 13);
    \u0275\u0275domListener("click", function Card_Conditional_1_Conditional_10_For_2_Template_button_click_0_listener($event) {
      const action_r5 = \u0275\u0275restoreView(_r4).$implicit;
      const ctx_r0 = \u0275\u0275nextContext(3);
      return \u0275\u0275resetView(ctx_r0.onActionClick(action_r5, $event));
    });
    \u0275\u0275conditionalCreate(1, Card_Conditional_1_Conditional_10_For_2_Conditional_1_Template, 1, 1, "span", 14);
    \u0275\u0275domElementStart(2, "span", 15);
    \u0275\u0275text(3);
    \u0275\u0275domElementEnd()();
  }
  if (rf & 2) {
    const action_r5 = ctx.$implicit;
    \u0275\u0275classMap("card__action card__action--" + action_r5.variant);
    \u0275\u0275advance();
    \u0275\u0275conditional(action_r5.icon ? 1 : -1);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(action_r5.label);
  }
}
function Card_Conditional_1_Conditional_10_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275domElementStart(0, "div", 9);
    \u0275\u0275repeaterCreate(1, Card_Conditional_1_Conditional_10_For_2_Template, 4, 4, "button", 12, _forTrack0);
    \u0275\u0275domElementEnd();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext(2);
    \u0275\u0275advance();
    \u0275\u0275repeater(ctx_r0.actions);
  }
}
function Card_Conditional_1_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275domElementStart(0, "section", 0)(1, "div");
    \u0275\u0275conditionalCreate(2, Card_Conditional_1_Conditional_2_Template, 1, 2, "img", 1)(3, Card_Conditional_1_Conditional_3_Template, 1, 1, "span", 2)(4, Card_Conditional_1_Conditional_4_Template, 2, 0, "span", 3);
    \u0275\u0275domElementEnd();
    \u0275\u0275domElementStart(5, "div", 4);
    \u0275\u0275conditionalCreate(6, Card_Conditional_1_Conditional_6_Template, 2, 1, "h3", 5);
    \u0275\u0275conditionalCreate(7, Card_Conditional_1_Conditional_7_Template, 2, 1, "p", 6);
    \u0275\u0275domElementEnd()();
    \u0275\u0275domElementStart(8, "section", 7);
    \u0275\u0275conditionalCreate(9, Card_Conditional_1_Conditional_9_Template, 3, 0, "div", 8);
    \u0275\u0275conditionalCreate(10, Card_Conditional_1_Conditional_10_Template, 3, 0, "div", 9);
    \u0275\u0275domElementEnd();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext();
    \u0275\u0275advance();
    \u0275\u0275classMap(ctx_r0.imageClasses);
    \u0275\u0275advance();
    \u0275\u0275conditional(ctx_r0.imageUrl ? 2 : ctx_r0.placeholderIcon ? 3 : 4);
    \u0275\u0275advance(4);
    \u0275\u0275conditional(ctx_r0.title ? 6 : -1);
    \u0275\u0275advance();
    \u0275\u0275conditional(ctx_r0.subtitle ? 7 : -1);
    \u0275\u0275advance(2);
    \u0275\u0275conditional(ctx_r0.badges.length > 0 ? 9 : -1);
    \u0275\u0275advance();
    \u0275\u0275conditional(ctx_r0.actions.length > 0 ? 10 : -1);
  }
}
function Card_Conditional_2_Conditional_1_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275domElement(0, "img", 1);
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext(2);
    \u0275\u0275domProperty("src", ctx_r0.imageUrl, \u0275\u0275sanitizeUrl)("alt", ctx_r0.imageAlt);
  }
}
function Card_Conditional_2_Conditional_2_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275domElement(0, "span", 2);
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext(2);
    \u0275\u0275domProperty("innerHTML", ctx_r0.safePlaceholderIcon, \u0275\u0275sanitizeHtml);
  }
}
function Card_Conditional_2_Conditional_3_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275domElementStart(0, "span", 3);
    \u0275\u0275text(1, "\u{1F3B5}");
    \u0275\u0275domElementEnd();
  }
}
function Card_Conditional_2_Conditional_6_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275domElementStart(0, "a", 17);
    \u0275\u0275text(1);
    \u0275\u0275domElementEnd();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext(2);
    \u0275\u0275domProperty("href", ctx_r0.titleLink, \u0275\u0275sanitizeUrl);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", ctx_r0.title, " ");
  }
}
function Card_Conditional_2_Conditional_7_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275domElementStart(0, "h3", 5);
    \u0275\u0275text(1);
    \u0275\u0275domElementEnd();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext(2);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(ctx_r0.title);
  }
}
function Card_Conditional_2_Conditional_8_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275domElementStart(0, "a", 18);
    \u0275\u0275text(1);
    \u0275\u0275domElementEnd();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext(2);
    \u0275\u0275domProperty("href", ctx_r0.subtitleLink, \u0275\u0275sanitizeUrl);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", ctx_r0.subtitle, " ");
  }
}
function Card_Conditional_2_Conditional_9_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275domElementStart(0, "p", 6);
    \u0275\u0275text(1);
    \u0275\u0275domElementEnd();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext(2);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(ctx_r0.subtitle);
  }
}
function Card_Conditional_2_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275domElementStart(0, "section");
    \u0275\u0275conditionalCreate(1, Card_Conditional_2_Conditional_1_Template, 1, 2, "img", 1)(2, Card_Conditional_2_Conditional_2_Template, 1, 1, "span", 2)(3, Card_Conditional_2_Conditional_3_Template, 2, 0, "span", 3);
    \u0275\u0275domElementEnd();
    \u0275\u0275domElementStart(4, "section", 16)(5, "div", 4);
    \u0275\u0275conditionalCreate(6, Card_Conditional_2_Conditional_6_Template, 2, 2, "a", 17)(7, Card_Conditional_2_Conditional_7_Template, 2, 1, "h3", 5);
    \u0275\u0275conditionalCreate(8, Card_Conditional_2_Conditional_8_Template, 2, 2, "a", 18)(9, Card_Conditional_2_Conditional_9_Template, 2, 1, "p", 6);
    \u0275\u0275domElementEnd()();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext();
    \u0275\u0275classMap(ctx_r0.imageClasses);
    \u0275\u0275advance();
    \u0275\u0275conditional(ctx_r0.imageUrl ? 1 : ctx_r0.placeholderIcon ? 2 : 3);
    \u0275\u0275advance(5);
    \u0275\u0275conditional(ctx_r0.title && ctx_r0.titleLink ? 6 : ctx_r0.title ? 7 : -1);
    \u0275\u0275advance(2);
    \u0275\u0275conditional(ctx_r0.subtitle && ctx_r0.subtitleLink ? 8 : ctx_r0.subtitle ? 9 : -1);
  }
}
var Card = class _Card {
  sanitizer = inject(DomSanitizer);
  // Contenido
  title = "";
  subtitle = "";
  imageUrl = "";
  imageAlt = "";
  placeholderIcon = "";
  // SVG string for custom placeholder
  // Getter para sanitizar el SVG
  get safePlaceholderIcon() {
    return this.sanitizer.bypassSecurityTrustHtml(this.placeholderIcon);
  }
  // Configuración de imagen
  imageShape = "square";
  imageSize = "medium";
  // Variantes de diseño
  variant = "normal";
  hoverEffect = "lift";
  layout = "vertical";
  // Tipo de card
  cardType = "polaroid";
  // Acciones y badges
  actions = [];
  badges = [];
  // Links para variante polaroid
  titleLink = "";
  subtitleLink = "";
  get cardClasses() {
    const classes = ["card"];
    if (this.variant === "vinilo") {
      classes.push("card--vinilo");
    }
    if (this.hoverEffect === "lift") {
      classes.push("card--hover-lift");
    }
    classes.push(`card--${this.cardType}`);
    classes.push(`card--${this.layout}`);
    return classes.join(" ");
  }
  get imageClasses() {
    const classes = ["card__image"];
    classes.push(`card__image--${this.imageShape}`);
    classes.push(`card__image--${this.imageSize}`);
    return classes.join(" ");
  }
  onActionClick(action, event) {
    event.preventDefault();
    event.stopPropagation();
    if (action.callback) {
      action.callback();
    }
  }
  static \u0275fac = function Card_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _Card)();
  };
  static \u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _Card, selectors: [["app-card"]], inputs: { title: "title", subtitle: "subtitle", imageUrl: "imageUrl", imageAlt: "imageAlt", placeholderIcon: "placeholderIcon", imageShape: "imageShape", imageSize: "imageSize", variant: "variant", hoverEffect: "hoverEffect", layout: "layout", cardType: "cardType", actions: "actions", badges: "badges", titleLink: "titleLink", subtitleLink: "subtitleLink" }, decls: 3, vars: 3, consts: [[1, "card__left"], [3, "src", "alt"], [1, "card__placeholder", "card__placeholder--svg", 3, "innerHTML"], [1, "card__placeholder"], [1, "card__text"], [1, "card__title"], [1, "card__subtitle"], [1, "card__right"], [1, "card__badges"], [1, "card__actions"], [1, "card__badge", 3, "card__badge--alt"], [1, "card__badge"], ["type", "button", 3, "class"], ["type", "button", 3, "click"], [1, "card__action-icon", 3, "innerHTML"], [1, "card__action-label"], [1, "card__content"], [1, "card__title", "card__title--link", 3, "href"], [1, "card__subtitle", "card__subtitle--link", 3, "href"]], template: function Card_Template(rf, ctx) {
    if (rf & 1) {
      \u0275\u0275domElementStart(0, "article");
      \u0275\u0275conditionalCreate(1, Card_Conditional_1_Template, 11, 7)(2, Card_Conditional_2_Template, 10, 5);
      \u0275\u0275domElementEnd();
    }
    if (rf & 2) {
      \u0275\u0275classMap(ctx.cardClasses);
      \u0275\u0275advance();
      \u0275\u0275conditional(ctx.cardType === "profile" ? 1 : 2);
    }
  }, dependencies: [CommonModule], styles: ['@charset "UTF-8";\n\n\n\n.card[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  background-color: var(--bg-secondary);\n  border: 4px solid var(--border-color);\n  border-radius: 5px;\n  box-shadow: 4px 4px 0px var(--shadow-color);\n  transition: all 150ms ease-in-out;\n  overflow: hidden;\n  width: 100%;\n  max-width: 280px;\n}\n.card--polaroid.card--hover-lift[_ngcontent-%COMP%]:hover {\n  transform: translate(2px, 2px);\n  box-shadow: 2px 2px 0px var(--shadow-color);\n}\n.card--vinilo[_ngcontent-%COMP%] {\n  box-shadow:\n    2px 2px 0px var(--color-accent),\n    4px 4px 0px var(--color-secondary),\n    6px 6px 0px var(--color-primary);\n}\n.card--vinilo.card--polaroid.card--hover-lift[_ngcontent-%COMP%]:hover {\n  transform: translate(2px, 2px);\n  box-shadow:\n    1px 1px 0px var(--color-accent),\n    2px 2px 0px var(--color-secondary),\n    3px 3px 0px var(--color-primary);\n}\n.card--polaroid[_ngcontent-%COMP%] {\n  max-width: 220px;\n}\n.card--profile[_ngcontent-%COMP%] {\n  max-width: 100%;\n  flex-direction: row;\n  align-items: stretch;\n}\n.card--profile[_ngcontent-%COMP%]   .card__left[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  flex-shrink: 0;\n  width: 15.625rem;\n  border-right: 2px solid var(--border-color);\n}\n.card--profile[_ngcontent-%COMP%]   .card__image[_ngcontent-%COMP%] {\n  width: 100%;\n  min-width: 100%;\n  max-width: 100%;\n  height: 15.625rem;\n  flex-shrink: 0;\n  border-right: none;\n  border-top: none;\n  border-bottom: 2px solid var(--border-color);\n  aspect-ratio: 1;\n}\n.card--profile[_ngcontent-%COMP%]   .card__text[_ngcontent-%COMP%] {\n  flex: 1;\n  padding: 2rem;\n  display: flex;\n  flex-direction: column;\n  justify-content: center;\n  border-right: none;\n}\n.card--profile[_ngcontent-%COMP%]   .card__right[_ngcontent-%COMP%] {\n  flex: 1;\n  display: flex;\n  flex-direction: column;\n  justify-content: space-between;\n}\n.card--profile[_ngcontent-%COMP%]   .card__badges[_ngcontent-%COMP%] {\n  flex: 1;\n  margin: 0;\n  padding: 2rem;\n  border-top: none;\n  border-left: none;\n  display: flex;\n  flex-direction: row;\n  flex-wrap: wrap;\n  align-items: flex-start;\n  align-content: flex-start;\n  gap: 0.5rem;\n}\n.card--profile[_ngcontent-%COMP%]   .card__actions[_ngcontent-%COMP%] {\n  flex: 0 0 auto;\n  margin: 0;\n  padding: 2rem;\n  border-top: 2px solid var(--border-color);\n  border-left: none;\n  display: flex;\n  flex-direction: row;\n  flex-wrap: wrap;\n  justify-content: flex-start;\n  gap: 0.5rem;\n  width: 100%;\n}\n@media (max-width: 1024px) {\n  .card--profile[_ngcontent-%COMP%]   .card__left[_ngcontent-%COMP%] {\n    width: 11.25rem;\n  }\n  .card--profile[_ngcontent-%COMP%]   .card__image[_ngcontent-%COMP%] {\n    height: 11.25rem;\n  }\n}\n@media (max-width: 768px) {\n  .card--profile[_ngcontent-%COMP%] {\n    flex-direction: column;\n  }\n  .card--profile[_ngcontent-%COMP%]   .card__left[_ngcontent-%COMP%] {\n    width: 100%;\n    border-right: none;\n    border-bottom: none;\n  }\n  .card--profile[_ngcontent-%COMP%]   .card__image[_ngcontent-%COMP%] {\n    width: 100%;\n    min-width: 100%;\n    max-width: 100%;\n    height: auto;\n    max-height: 12.5rem;\n    border-right: none;\n    border-bottom: 2px solid var(--border-color);\n    aspect-ratio: auto;\n  }\n  .card--profile[_ngcontent-%COMP%]   .card__text[_ngcontent-%COMP%] {\n    width: 100%;\n    border-right: none;\n    border-bottom: 2px solid var(--border-color);\n  }\n  .card--profile[_ngcontent-%COMP%]   .card__right[_ngcontent-%COMP%] {\n    width: 100%;\n  }\n  .card--profile[_ngcontent-%COMP%]   .card__badges[_ngcontent-%COMP%] {\n    justify-content: center;\n    border-bottom: 2px solid var(--border-color);\n  }\n  .card--profile[_ngcontent-%COMP%]   .card__actions[_ngcontent-%COMP%] {\n    flex-direction: column;\n    border-top: none;\n  }\n}\n.card--profile.card--vertical[_ngcontent-%COMP%] {\n  flex-direction: column;\n  max-width: 18.75rem;\n}\n.card--profile.card--vertical[_ngcontent-%COMP%]   .card__left[_ngcontent-%COMP%] {\n  width: 100%;\n  border-right: none;\n  border-bottom: none;\n}\n.card--profile.card--vertical[_ngcontent-%COMP%]   .card__image[_ngcontent-%COMP%] {\n  width: 100%;\n  height: auto;\n  max-height: 15.625rem;\n  border-bottom: 2px solid var(--border-color);\n  aspect-ratio: 1;\n}\n.card--profile.card--vertical[_ngcontent-%COMP%]   .card__text[_ngcontent-%COMP%] {\n  border-bottom: 2px solid var(--border-color);\n  text-align: center;\n}\n.card--profile.card--vertical[_ngcontent-%COMP%]   .card__right[_ngcontent-%COMP%] {\n  width: 100%;\n}\n.card--profile.card--vertical[_ngcontent-%COMP%]   .card__badges[_ngcontent-%COMP%] {\n  justify-content: center;\n  border-bottom: 2px solid var(--border-color);\n}\n.card--profile.card--vertical[_ngcontent-%COMP%]   .card__actions[_ngcontent-%COMP%] {\n  flex-direction: column;\n  border-top: none;\n}\n@media (max-width: 768px) {\n  .card--profile.card--vertical[_ngcontent-%COMP%] {\n    max-width: 100%;\n  }\n}\n.card--vertical[_ngcontent-%COMP%] {\n  flex-direction: column;\n}\n.card__image[_ngcontent-%COMP%] {\n  width: 100%;\n  aspect-ratio: 1;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  overflow: hidden;\n  background-color: var(--bg-secondary);\n  position: relative;\n}\n.card__image[_ngcontent-%COMP%]   img[_ngcontent-%COMP%] {\n  width: 100%;\n  height: 100%;\n  object-fit: cover;\n}\n.card__image--circle[_ngcontent-%COMP%]   img[_ngcontent-%COMP%] {\n  border-radius: 50%;\n  padding: 0.5rem;\n}\n.card__image--square[_ngcontent-%COMP%]   img[_ngcontent-%COMP%] {\n  border-radius: 0;\n}\n.card__image--small[_ngcontent-%COMP%] {\n  aspect-ratio: 1;\n  max-height: 120px;\n}\n.card__image--medium[_ngcontent-%COMP%] {\n  aspect-ratio: 1;\n  max-height: 200px;\n}\n.card__image--large[_ngcontent-%COMP%] {\n  aspect-ratio: 1;\n  max-height: 300px;\n}\n.card__placeholder[_ngcontent-%COMP%] {\n  font-size: 4rem;\n  opacity: 0.3;\n}\n.card__placeholder--svg[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  width: 100%;\n  height: 100%;\n}\n.card__placeholder--svg[_ngcontent-%COMP%]   svg[_ngcontent-%COMP%] {\n  width: 4rem;\n  height: 4rem;\n  stroke: var(--text-primary);\n  opacity: 0.4;\n}\n.card__content[_ngcontent-%COMP%] {\n  background-color: var(--bg-secondary);\n  padding: 2rem;\n  display: flex;\n  flex-direction: column;\n  gap: 0.5rem;\n  flex-grow: 1;\n  border-top: 2px solid var(--border-color);\n}\n.card__text[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  gap: 0.5rem;\n  text-align: center;\n}\n.card--profile[_ngcontent-%COMP%]   .card__text[_ngcontent-%COMP%] {\n  text-align: left;\n}\n.card__title[_ngcontent-%COMP%] {\n  font-size: 1rem;\n  font-weight: 700;\n  color: var(--text-primary);\n  margin: 0;\n  line-height: 1.2;\n  overflow: hidden;\n  text-overflow: ellipsis;\n  white-space: nowrap;\n  transition: all 300ms ease-in-out;\n}\n.card__title--link[_ngcontent-%COMP%] {\n  text-decoration: none;\n  color: inherit;\n  display: block;\n}\n.card__title--link[_ngcontent-%COMP%]:hover {\n  color: var(--color-primary);\n  animation: _ngcontent-%COMP%_scroll-text 3s linear infinite;\n  white-space: nowrap;\n  overflow: visible;\n}\n.card__subtitle[_ngcontent-%COMP%] {\n  font-size: 1rem;\n  color: var(--text-primary);\n  opacity: 0.7;\n  margin: 0;\n  line-height: 1.3;\n  overflow: hidden;\n  text-overflow: ellipsis;\n  white-space: nowrap;\n  transition: all 300ms ease-in-out;\n}\n.card__subtitle--link[_ngcontent-%COMP%] {\n  text-decoration: none;\n  color: inherit;\n  display: block;\n}\n.card__subtitle--link[_ngcontent-%COMP%]:hover {\n  color: #CA6703;\n  animation: _ngcontent-%COMP%_scroll-text 3s linear infinite;\n  white-space: nowrap;\n  overflow: visible;\n}\n@keyframes _ngcontent-%COMP%_scroll-text {\n  0% {\n    transform: translateX(0);\n  }\n  100% {\n    transform: translateX(-50%);\n  }\n}\n.card__badges[_ngcontent-%COMP%] {\n  display: flex;\n  flex-wrap: wrap;\n  gap: 0.5rem;\n  margin-top: 0.5rem;\n  padding-top: 1rem;\n  border-top: 2px solid var(--border-color);\n}\n.card__badge[_ngcontent-%COMP%] {\n  display: inline-block;\n  padding: 4px 0.5rem;\n  font-size: 0.75rem;\n  font-weight: 600;\n  text-transform: uppercase;\n  background-color: var(--color-primary);\n  color: var(--text-dark);\n  border: 2px solid var(--border-color);\n  border-radius: 3px;\n  box-shadow: 2px 2px 0px var(--border-color);\n  line-height: 1;\n}\n.card__badge--alt[_ngcontent-%COMP%] {\n  background-color: var(--color-secondary);\n}\n.card__actions[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  gap: 0.5rem;\n  margin-top: 1rem;\n  padding-top: 1rem;\n  width: 100%;\n  border-top: 2px solid var(--border-color);\n}\n.card__action[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  gap: 0.5rem;\n  width: 100%;\n  padding: 0.5rem 1rem;\n  font-size: 1rem;\n  font-weight: 600;\n  font-family: inherit;\n  border: 3px solid var(--border-color);\n  border-radius: 9999px;\n  box-shadow: 2px 2px 0px var(--border-color);\n  cursor: pointer;\n  transition: all 150ms ease-in-out;\n  min-height: 40px;\n}\n.card__action[_ngcontent-%COMP%]:hover {\n  transform: translate(-1px, -1px);\n  box-shadow: 3px 3px 0px var(--border-color);\n}\n.card__action[_ngcontent-%COMP%]:active {\n  transform: translate(1px, 1px);\n  box-shadow: 1px 1px 0px var(--border-color);\n}\n.card__action--primary[_ngcontent-%COMP%] {\n  background-color: var(--color-primary);\n  color: var(--text-dark);\n}\n.card__action--secondary[_ngcontent-%COMP%] {\n  background-color: var(--color-secondary);\n  color: var(--text-dark);\n}\n.card__action--contrast[_ngcontent-%COMP%] {\n  background-color: var(--color-accent);\n  color: var(--text-dark);\n}\n.card__action--accent[_ngcontent-%COMP%] {\n  background-color: var(--color-accent);\n  color: var(--text-dark);\n}\n.card__action-icon[_ngcontent-%COMP%] {\n  font-size: 1.25rem;\n  line-height: 1;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n}\n.card__action-label[_ngcontent-%COMP%] {\n  line-height: 1;\n}\n@media (max-width: 768px) {\n  .card[_ngcontent-%COMP%] {\n    max-width: 100%;\n  }\n  .card--polaroid[_ngcontent-%COMP%] {\n    max-width: 180px;\n  }\n  .card--profile[_ngcontent-%COMP%] {\n    max-width: 100%;\n  }\n  .card__content[_ngcontent-%COMP%] {\n    padding: 1rem;\n  }\n  .card__title[_ngcontent-%COMP%] {\n    font-size: 1.125rem;\n  }\n  .card__subtitle[_ngcontent-%COMP%] {\n    font-size: 0.875rem;\n  }\n  .card__action[_ngcontent-%COMP%] {\n    padding: 0.5rem;\n    font-size: 0.875rem;\n    min-height: 36px;\n  }\n}\n/*# sourceMappingURL=card.css.map */'] });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(Card, [{
    type: Component,
    args: [{ selector: "app-card", imports: [CommonModule], template: `<article [class]="cardClasses">
  <!-- Variante Profile: Imagen + T\xEDtulo en columna izquierda -->
  @if (cardType === 'profile') {
    <!-- Columna izquierda: imagen con t\xEDtulo debajo -->
    <section class="card__left">
      <div [class]="imageClasses">
        @if (imageUrl) {
          <img [src]="imageUrl" [alt]="imageAlt" />
        } @else if (placeholderIcon) {
          <span class="card__placeholder card__placeholder--svg" [innerHTML]="safePlaceholderIcon"></span>
        } @else {
          <span class="card__placeholder">\u{1F3B5}</span>
        }
      </div>
      <div class="card__text">
        @if (title) {
          <h3 class="card__title">{{ title }}</h3>
        }
        @if (subtitle) {
          <p class="card__subtitle">{{ subtitle }}</p>
        }
      </div>
    </section>

    <!-- Columna derecha: badges arriba, botones abajo -->
    <section class="card__right">
      @if (badges.length > 0) {
        <div class="card__badges">
          @for (badge of badges; track badge; let i = $index) {
            <span
              class="card__badge"
              [class.card__badge--alt]="i % 2 !== 0">
              {{ badge }}
            </span>
          }
        </div>
      }
      @if (actions.length > 0) {
        <div class="card__actions">
          @for (action of actions; track action.label) {
            <button
              type="button"
              [class]="'card__action card__action--' + action.variant"
              (click)="onActionClick(action, $event)">
              @if (action.icon) {
                <span class="card__action-icon" [innerHTML]="action.icon"></span>
              }
              <span class="card__action-label">{{ action.label }}</span>
            </button>
          }
        </div>
      }
    </section>
  } @else {
    <!-- Variante Polaroid: estructura original -->
    <section [class]="imageClasses">
      @if (imageUrl) {
        <img [src]="imageUrl" [alt]="imageAlt" />
      } @else if (placeholderIcon) {
        <span class="card__placeholder card__placeholder--svg" [innerHTML]="safePlaceholderIcon"></span>
      } @else {
        <span class="card__placeholder">\u{1F3B5}</span>
      }
    </section>

    <section class="card__content">
      <div class="card__text">
        @if (title && titleLink) {
          <a [href]="titleLink" class="card__title card__title--link">
            {{ title }}
          </a>
        } @else if (title) {
          <h3 class="card__title">{{ title }}</h3>
        }

        @if (subtitle && subtitleLink) {
          <a [href]="subtitleLink" class="card__subtitle card__subtitle--link">
            {{ subtitle }}
          </a>
        } @else if (subtitle) {
          <p class="card__subtitle">{{ subtitle }}</p>
        }
      </div>
    </section>
  }
</article>
`, styles: ['@charset "UTF-8";\n\n/* src/app/components/shared/card/card.scss */\n.card {\n  display: flex;\n  flex-direction: column;\n  background-color: var(--bg-secondary);\n  border: 4px solid var(--border-color);\n  border-radius: 5px;\n  box-shadow: 4px 4px 0px var(--shadow-color);\n  transition: all 150ms ease-in-out;\n  overflow: hidden;\n  width: 100%;\n  max-width: 280px;\n}\n.card--polaroid.card--hover-lift:hover {\n  transform: translate(2px, 2px);\n  box-shadow: 2px 2px 0px var(--shadow-color);\n}\n.card--vinilo {\n  box-shadow:\n    2px 2px 0px var(--color-accent),\n    4px 4px 0px var(--color-secondary),\n    6px 6px 0px var(--color-primary);\n}\n.card--vinilo.card--polaroid.card--hover-lift:hover {\n  transform: translate(2px, 2px);\n  box-shadow:\n    1px 1px 0px var(--color-accent),\n    2px 2px 0px var(--color-secondary),\n    3px 3px 0px var(--color-primary);\n}\n.card--polaroid {\n  max-width: 220px;\n}\n.card--profile {\n  max-width: 100%;\n  flex-direction: row;\n  align-items: stretch;\n}\n.card--profile .card__left {\n  display: flex;\n  flex-direction: column;\n  flex-shrink: 0;\n  width: 15.625rem;\n  border-right: 2px solid var(--border-color);\n}\n.card--profile .card__image {\n  width: 100%;\n  min-width: 100%;\n  max-width: 100%;\n  height: 15.625rem;\n  flex-shrink: 0;\n  border-right: none;\n  border-top: none;\n  border-bottom: 2px solid var(--border-color);\n  aspect-ratio: 1;\n}\n.card--profile .card__text {\n  flex: 1;\n  padding: 2rem;\n  display: flex;\n  flex-direction: column;\n  justify-content: center;\n  border-right: none;\n}\n.card--profile .card__right {\n  flex: 1;\n  display: flex;\n  flex-direction: column;\n  justify-content: space-between;\n}\n.card--profile .card__badges {\n  flex: 1;\n  margin: 0;\n  padding: 2rem;\n  border-top: none;\n  border-left: none;\n  display: flex;\n  flex-direction: row;\n  flex-wrap: wrap;\n  align-items: flex-start;\n  align-content: flex-start;\n  gap: 0.5rem;\n}\n.card--profile .card__actions {\n  flex: 0 0 auto;\n  margin: 0;\n  padding: 2rem;\n  border-top: 2px solid var(--border-color);\n  border-left: none;\n  display: flex;\n  flex-direction: row;\n  flex-wrap: wrap;\n  justify-content: flex-start;\n  gap: 0.5rem;\n  width: 100%;\n}\n@media (max-width: 1024px) {\n  .card--profile .card__left {\n    width: 11.25rem;\n  }\n  .card--profile .card__image {\n    height: 11.25rem;\n  }\n}\n@media (max-width: 768px) {\n  .card--profile {\n    flex-direction: column;\n  }\n  .card--profile .card__left {\n    width: 100%;\n    border-right: none;\n    border-bottom: none;\n  }\n  .card--profile .card__image {\n    width: 100%;\n    min-width: 100%;\n    max-width: 100%;\n    height: auto;\n    max-height: 12.5rem;\n    border-right: none;\n    border-bottom: 2px solid var(--border-color);\n    aspect-ratio: auto;\n  }\n  .card--profile .card__text {\n    width: 100%;\n    border-right: none;\n    border-bottom: 2px solid var(--border-color);\n  }\n  .card--profile .card__right {\n    width: 100%;\n  }\n  .card--profile .card__badges {\n    justify-content: center;\n    border-bottom: 2px solid var(--border-color);\n  }\n  .card--profile .card__actions {\n    flex-direction: column;\n    border-top: none;\n  }\n}\n.card--profile.card--vertical {\n  flex-direction: column;\n  max-width: 18.75rem;\n}\n.card--profile.card--vertical .card__left {\n  width: 100%;\n  border-right: none;\n  border-bottom: none;\n}\n.card--profile.card--vertical .card__image {\n  width: 100%;\n  height: auto;\n  max-height: 15.625rem;\n  border-bottom: 2px solid var(--border-color);\n  aspect-ratio: 1;\n}\n.card--profile.card--vertical .card__text {\n  border-bottom: 2px solid var(--border-color);\n  text-align: center;\n}\n.card--profile.card--vertical .card__right {\n  width: 100%;\n}\n.card--profile.card--vertical .card__badges {\n  justify-content: center;\n  border-bottom: 2px solid var(--border-color);\n}\n.card--profile.card--vertical .card__actions {\n  flex-direction: column;\n  border-top: none;\n}\n@media (max-width: 768px) {\n  .card--profile.card--vertical {\n    max-width: 100%;\n  }\n}\n.card--vertical {\n  flex-direction: column;\n}\n.card__image {\n  width: 100%;\n  aspect-ratio: 1;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  overflow: hidden;\n  background-color: var(--bg-secondary);\n  position: relative;\n}\n.card__image img {\n  width: 100%;\n  height: 100%;\n  object-fit: cover;\n}\n.card__image--circle img {\n  border-radius: 50%;\n  padding: 0.5rem;\n}\n.card__image--square img {\n  border-radius: 0;\n}\n.card__image--small {\n  aspect-ratio: 1;\n  max-height: 120px;\n}\n.card__image--medium {\n  aspect-ratio: 1;\n  max-height: 200px;\n}\n.card__image--large {\n  aspect-ratio: 1;\n  max-height: 300px;\n}\n.card__placeholder {\n  font-size: 4rem;\n  opacity: 0.3;\n}\n.card__placeholder--svg {\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  width: 100%;\n  height: 100%;\n}\n.card__placeholder--svg svg {\n  width: 4rem;\n  height: 4rem;\n  stroke: var(--text-primary);\n  opacity: 0.4;\n}\n.card__content {\n  background-color: var(--bg-secondary);\n  padding: 2rem;\n  display: flex;\n  flex-direction: column;\n  gap: 0.5rem;\n  flex-grow: 1;\n  border-top: 2px solid var(--border-color);\n}\n.card__text {\n  display: flex;\n  flex-direction: column;\n  gap: 0.5rem;\n  text-align: center;\n}\n.card--profile .card__text {\n  text-align: left;\n}\n.card__title {\n  font-size: 1rem;\n  font-weight: 700;\n  color: var(--text-primary);\n  margin: 0;\n  line-height: 1.2;\n  overflow: hidden;\n  text-overflow: ellipsis;\n  white-space: nowrap;\n  transition: all 300ms ease-in-out;\n}\n.card__title--link {\n  text-decoration: none;\n  color: inherit;\n  display: block;\n}\n.card__title--link:hover {\n  color: var(--color-primary);\n  animation: scroll-text 3s linear infinite;\n  white-space: nowrap;\n  overflow: visible;\n}\n.card__subtitle {\n  font-size: 1rem;\n  color: var(--text-primary);\n  opacity: 0.7;\n  margin: 0;\n  line-height: 1.3;\n  overflow: hidden;\n  text-overflow: ellipsis;\n  white-space: nowrap;\n  transition: all 300ms ease-in-out;\n}\n.card__subtitle--link {\n  text-decoration: none;\n  color: inherit;\n  display: block;\n}\n.card__subtitle--link:hover {\n  color: #CA6703;\n  animation: scroll-text 3s linear infinite;\n  white-space: nowrap;\n  overflow: visible;\n}\n@keyframes scroll-text {\n  0% {\n    transform: translateX(0);\n  }\n  100% {\n    transform: translateX(-50%);\n  }\n}\n.card__badges {\n  display: flex;\n  flex-wrap: wrap;\n  gap: 0.5rem;\n  margin-top: 0.5rem;\n  padding-top: 1rem;\n  border-top: 2px solid var(--border-color);\n}\n.card__badge {\n  display: inline-block;\n  padding: 4px 0.5rem;\n  font-size: 0.75rem;\n  font-weight: 600;\n  text-transform: uppercase;\n  background-color: var(--color-primary);\n  color: var(--text-dark);\n  border: 2px solid var(--border-color);\n  border-radius: 3px;\n  box-shadow: 2px 2px 0px var(--border-color);\n  line-height: 1;\n}\n.card__badge--alt {\n  background-color: var(--color-secondary);\n}\n.card__actions {\n  display: flex;\n  flex-direction: column;\n  gap: 0.5rem;\n  margin-top: 1rem;\n  padding-top: 1rem;\n  width: 100%;\n  border-top: 2px solid var(--border-color);\n}\n.card__action {\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  gap: 0.5rem;\n  width: 100%;\n  padding: 0.5rem 1rem;\n  font-size: 1rem;\n  font-weight: 600;\n  font-family: inherit;\n  border: 3px solid var(--border-color);\n  border-radius: 9999px;\n  box-shadow: 2px 2px 0px var(--border-color);\n  cursor: pointer;\n  transition: all 150ms ease-in-out;\n  min-height: 40px;\n}\n.card__action:hover {\n  transform: translate(-1px, -1px);\n  box-shadow: 3px 3px 0px var(--border-color);\n}\n.card__action:active {\n  transform: translate(1px, 1px);\n  box-shadow: 1px 1px 0px var(--border-color);\n}\n.card__action--primary {\n  background-color: var(--color-primary);\n  color: var(--text-dark);\n}\n.card__action--secondary {\n  background-color: var(--color-secondary);\n  color: var(--text-dark);\n}\n.card__action--contrast {\n  background-color: var(--color-accent);\n  color: var(--text-dark);\n}\n.card__action--accent {\n  background-color: var(--color-accent);\n  color: var(--text-dark);\n}\n.card__action-icon {\n  font-size: 1.25rem;\n  line-height: 1;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n}\n.card__action-label {\n  line-height: 1;\n}\n@media (max-width: 768px) {\n  .card {\n    max-width: 100%;\n  }\n  .card--polaroid {\n    max-width: 180px;\n  }\n  .card--profile {\n    max-width: 100%;\n  }\n  .card__content {\n    padding: 1rem;\n  }\n  .card__title {\n    font-size: 1.125rem;\n  }\n  .card__subtitle {\n    font-size: 0.875rem;\n  }\n  .card__action {\n    padding: 0.5rem;\n    font-size: 0.875rem;\n    min-height: 36px;\n  }\n}\n/*# sourceMappingURL=card.css.map */\n'] }]
  }], null, { title: [{
    type: Input
  }], subtitle: [{
    type: Input
  }], imageUrl: [{
    type: Input
  }], imageAlt: [{
    type: Input
  }], placeholderIcon: [{
    type: Input
  }], imageShape: [{
    type: Input
  }], imageSize: [{
    type: Input
  }], variant: [{
    type: Input
  }], hoverEffect: [{
    type: Input
  }], layout: [{
    type: Input
  }], cardType: [{
    type: Input
  }], actions: [{
    type: Input
  }], badges: [{
    type: Input
  }], titleLink: [{
    type: Input
  }], subtitleLink: [{
    type: Input
  }] });
})();
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(Card, { className: "Card", filePath: "src/app/components/shared/card/card.ts", lineNumber: 20 });
})();

// src/app/components/shared/badge/badge.ts
var _c02 = ["*"];
var Badge = class _Badge {
  variant = "primary";
  size = "md";
  text = "";
  removable = false;
  static \u0275fac = function Badge_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _Badge)();
  };
  static \u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _Badge, selectors: [["app-badge"]], inputs: { variant: "variant", size: "size", text: "text", removable: "removable" }, ngContentSelectors: _c02, decls: 3, vars: 19, consts: [[1, "badge"]], template: function Badge_Template(rf, ctx) {
    if (rf & 1) {
      \u0275\u0275projectionDef();
      \u0275\u0275domElementStart(0, "span", 0);
      \u0275\u0275text(1);
      \u0275\u0275projection(2);
      \u0275\u0275domElementEnd();
    }
    if (rf & 2) {
      \u0275\u0275classProp("badge--primary", ctx.variant === "primary")("badge--secondary", ctx.variant === "secondary")("badge--success", ctx.variant === "success")("badge--warning", ctx.variant === "warning")("badge--error", ctx.variant === "error")("badge--info", ctx.variant === "info")("badge--sm", ctx.size === "sm")("badge--md", ctx.size === "md")("badge--lg", ctx.size === "lg");
      \u0275\u0275advance();
      \u0275\u0275textInterpolate1(" ", ctx.text);
    }
  }, dependencies: [CommonModule], styles: ['@charset "UTF-8";\n\n\n\n.badge[_ngcontent-%COMP%] {\n  display: inline-flex;\n  align-items: center;\n  justify-content: center;\n  gap: 0.5rem;\n  font-family: "Space Grotesk", sans-serif;\n  font-weight: 700;\n  text-transform: uppercase;\n  letter-spacing: 0.05em;\n  border: 2px solid var(--border-color);\n  white-space: nowrap;\n  transition: all 150ms ease-in-out;\n  padding: 4px 1rem;\n  font-size: 0.75rem;\n  border-radius: 3px;\n  box-shadow: 2px 2px 0px var(--shadow-color);\n}\n.badge--sm[_ngcontent-%COMP%] {\n  padding: 2px 0.5rem;\n  font-size: 0.625rem;\n  box-shadow: 1px 1px 0px var(--shadow-color);\n}\n.badge--md[_ngcontent-%COMP%] {\n  padding: 4px 1rem;\n  font-size: 0.75rem;\n  box-shadow: 2px 2px 0px var(--shadow-color);\n}\n.badge--lg[_ngcontent-%COMP%] {\n  padding: 0.5rem 2rem;\n  font-size: 0.875rem;\n  box-shadow: 3px 3px 0px var(--shadow-color);\n}\n.badge--primary[_ngcontent-%COMP%] {\n  background-color: var(--color-primary);\n  color: var(--text-dark);\n  border-color: var(--border-color);\n}\n.badge--secondary[_ngcontent-%COMP%] {\n  background-color: var(--bg-secondary);\n  color: var(--text-primary);\n  border-color: var(--border-color);\n}\n.badge--success[_ngcontent-%COMP%] {\n  background-color: var(--color-success);\n  color: #fff;\n  border-color: var(--border-color);\n}\n.badge--warning[_ngcontent-%COMP%] {\n  background-color: var(--color-warning);\n  color: #000;\n  border-color: var(--border-color);\n}\n.badge--error[_ngcontent-%COMP%] {\n  background-color: var(--color-error);\n  color: #fff;\n  border-color: var(--border-color);\n}\n.badge--info[_ngcontent-%COMP%] {\n  background-color: var(--color-info);\n  color: #fff;\n  border-color: var(--border-color);\n}\n/*# sourceMappingURL=badge.css.map */'] });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(Badge, [{
    type: Component,
    args: [{ selector: "app-badge", standalone: true, imports: [CommonModule], template: `<span
  class="badge"
  [class.badge--primary]="variant === 'primary'"
  [class.badge--secondary]="variant === 'secondary'"
  [class.badge--success]="variant === 'success'"
  [class.badge--warning]="variant === 'warning'"
  [class.badge--error]="variant === 'error'"
  [class.badge--info]="variant === 'info'"
  [class.badge--sm]="size === 'sm'"
  [class.badge--md]="size === 'md'"
  [class.badge--lg]="size === 'lg'">
  {{ text }}<ng-content></ng-content>
</span>
`, styles: ['@charset "UTF-8";\n\n/* src/app/components/shared/badge/badge.scss */\n.badge {\n  display: inline-flex;\n  align-items: center;\n  justify-content: center;\n  gap: 0.5rem;\n  font-family: "Space Grotesk", sans-serif;\n  font-weight: 700;\n  text-transform: uppercase;\n  letter-spacing: 0.05em;\n  border: 2px solid var(--border-color);\n  white-space: nowrap;\n  transition: all 150ms ease-in-out;\n  padding: 4px 1rem;\n  font-size: 0.75rem;\n  border-radius: 3px;\n  box-shadow: 2px 2px 0px var(--shadow-color);\n}\n.badge--sm {\n  padding: 2px 0.5rem;\n  font-size: 0.625rem;\n  box-shadow: 1px 1px 0px var(--shadow-color);\n}\n.badge--md {\n  padding: 4px 1rem;\n  font-size: 0.75rem;\n  box-shadow: 2px 2px 0px var(--shadow-color);\n}\n.badge--lg {\n  padding: 0.5rem 2rem;\n  font-size: 0.875rem;\n  box-shadow: 3px 3px 0px var(--shadow-color);\n}\n.badge--primary {\n  background-color: var(--color-primary);\n  color: var(--text-dark);\n  border-color: var(--border-color);\n}\n.badge--secondary {\n  background-color: var(--bg-secondary);\n  color: var(--text-primary);\n  border-color: var(--border-color);\n}\n.badge--success {\n  background-color: var(--color-success);\n  color: #fff;\n  border-color: var(--border-color);\n}\n.badge--warning {\n  background-color: var(--color-warning);\n  color: #000;\n  border-color: var(--border-color);\n}\n.badge--error {\n  background-color: var(--color-error);\n  color: #fff;\n  border-color: var(--border-color);\n}\n.badge--info {\n  background-color: var(--color-info);\n  color: #fff;\n  border-color: var(--border-color);\n}\n/*# sourceMappingURL=badge.css.map */\n'] }]
  }], null, { variant: [{
    type: Input
  }], size: [{
    type: Input
  }], text: [{
    type: Input
  }], removable: [{
    type: Input
  }] });
})();
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(Badge, { className: "Badge", filePath: "src/app/components/shared/badge/badge.ts", lineNumber: 14 });
})();

// src/app/components/shared/form-input/form-input.ts
function FormInput_span_3_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span", 6);
    \u0275\u0275text(1, "*");
    \u0275\u0275elementEnd();
  }
}
function FormInput_Conditional_5_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "p", 4);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext();
    \u0275\u0275property("id", ctx_r0.inputId + "-description");
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", ctx_r0.errorMessage, " ");
  }
}
function FormInput_Conditional_6_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "p", 5);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext();
    \u0275\u0275property("id", ctx_r0.inputId + "-description");
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", ctx_r0.helpText, " ");
  }
}
var nextUniqueId = 0;
var FormInput = class _FormInput {
  // Propiedades del input
  label = "";
  type = "text";
  name = "";
  placeholder = "";
  required = false;
  disabled = false;
  value = "";
  // Mensajes de ayuda y error
  helpText = "";
  errorMessage = "";
  // Estado del input
  hasError = false;
  hasSuccess = false;
  // ID único para asociar label e input
  inputId = `form-input-${nextUniqueId++}`;
  // Signal para el valor actual (opcional, para reactividad)
  currentValue = signal(this.value, ...ngDevMode ? [{ debugName: "currentValue" }] : []);
  ngOnInit() {
    this.currentValue.set(this.value);
  }
  onInputChange(event) {
    const target = event.target;
    this.currentValue.set(target.value);
  }
  static \u0275fac = function FormInput_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _FormInput)();
  };
  static \u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _FormInput, selectors: [["app-form-input"]], inputs: { label: "label", type: "type", name: "name", placeholder: "placeholder", required: "required", disabled: "disabled", value: "value", helpText: "helpText", errorMessage: "errorMessage", hasError: "hasError", hasSuccess: "hasSuccess" }, decls: 7, vars: 23, consts: [[1, "form-input-wrapper"], [1, "form-input__label", 3, "for"], ["class", "form-input__required-indicator", "aria-label", "Campo requerido", 4, "ngIf"], [1, "form-input__field", 3, "input", "id", "type", "name", "placeholder", "required", "disabled", "value"], ["role", "alert", 1, "form-input__error", 3, "id"], [1, "form-input__help", 3, "id"], ["aria-label", "Campo requerido", 1, "form-input__required-indicator"]], template: function FormInput_Template(rf, ctx) {
    if (rf & 1) {
      \u0275\u0275elementStart(0, "div", 0)(1, "label", 1);
      \u0275\u0275text(2);
      \u0275\u0275template(3, FormInput_span_3_Template, 2, 0, "span", 2);
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(4, "input", 3);
      \u0275\u0275listener("input", function FormInput_Template_input_input_4_listener($event) {
        return ctx.onInputChange($event);
      });
      \u0275\u0275elementEnd();
      \u0275\u0275conditionalCreate(5, FormInput_Conditional_5_Template, 2, 2, "p", 4);
      \u0275\u0275conditionalCreate(6, FormInput_Conditional_6_Template, 2, 2, "p", 5);
      \u0275\u0275elementEnd();
    }
    if (rf & 2) {
      \u0275\u0275advance();
      \u0275\u0275classProp("form-input__label--required", ctx.required);
      \u0275\u0275property("for", ctx.inputId);
      \u0275\u0275advance();
      \u0275\u0275textInterpolate1(" ", ctx.label, " ");
      \u0275\u0275advance();
      \u0275\u0275property("ngIf", ctx.required);
      \u0275\u0275advance();
      \u0275\u0275classProp("form-input__field--error", ctx.hasError)("form-input__field--success", ctx.hasSuccess)("form-input__field--disabled", ctx.disabled);
      \u0275\u0275property("id", ctx.inputId)("type", ctx.type)("name", ctx.name)("placeholder", ctx.placeholder)("required", ctx.required)("disabled", ctx.disabled)("value", ctx.currentValue());
      \u0275\u0275attribute("aria-describedby", ctx.helpText || ctx.errorMessage ? ctx.inputId + "-description" : null)("aria-invalid", ctx.hasError)("aria-required", ctx.required);
      \u0275\u0275advance();
      \u0275\u0275conditional(ctx.hasError && ctx.errorMessage ? 5 : -1);
      \u0275\u0275advance();
      \u0275\u0275conditional(!ctx.hasError && ctx.helpText ? 6 : -1);
    }
  }, dependencies: [CommonModule, NgIf, FormsModule], styles: ['@charset "UTF-8";\n\n\n\n.form-input-wrapper[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  gap: 0.5rem;\n  width: 100%;\n}\n.form-input__label[_ngcontent-%COMP%] {\n  font-size: 0.875rem;\n  font-weight: 500;\n  color: var(--text-primary);\n  display: flex;\n  align-items: center;\n  gap: 0.25rem;\n}\n.form-input__label--required[_ngcontent-%COMP%] {\n  font-weight: 600;\n}\n.form-input__required-indicator[_ngcontent-%COMP%] {\n  color: #E04A4A;\n  font-weight: 600;\n  font-size: 1.125rem;\n  line-height: 1;\n}\n.form-input__field[_ngcontent-%COMP%] {\n  font-family: "Space Grotesk", sans-serif;\n  font-size: 1rem;\n  padding: 0.5rem 1rem;\n  border: 3px solid var(--border-color);\n  border-radius: 5px;\n  background-color: var(--bg-primary);\n  color: var(--text-primary);\n  box-shadow: 4px 4px 0px var(--shadow-color);\n  transition: all 150ms ease-in-out;\n  width: 100%;\n  outline: none;\n}\n.form-input__field[_ngcontent-%COMP%]::placeholder {\n  color: var(--text-placeholder);\n  opacity: 1;\n}\n.form-input__field[_ngcontent-%COMP%]:focus {\n  border-color: var(--color-primary);\n  box-shadow: 4px 4px 0px #ED9C05;\n}\n.form-input__field[_ngcontent-%COMP%]:hover:not(:disabled):not(.form-input__field--error):not(.form-input__field--success) {\n  box-shadow: 2px 2px 0px var(--shadow-color);\n  transform: translate(2px, 2px);\n}\n.form-input__field--error[_ngcontent-%COMP%] {\n  border-color: #E04A4A;\n  box-shadow: 4px 4px 0px #E04A4A;\n}\n.form-input__field--error[_ngcontent-%COMP%]:hover:not(:disabled) {\n  box-shadow: 2px 2px 0px #E04A4A;\n  transform: translate(2px, 2px);\n}\n.form-input__field--error[_ngcontent-%COMP%]:focus {\n  box-shadow: 4px 4px 0px #E04A4A;\n  transform: none;\n}\n.form-input__field--success[_ngcontent-%COMP%] {\n  border-color: #AAD661;\n  box-shadow: 4px 4px 0px #AAD661;\n}\n.form-input__field--success[_ngcontent-%COMP%]:hover:not(:disabled) {\n  box-shadow: 2px 2px 0px #AAD661;\n  transform: translate(2px, 2px);\n}\n.form-input__field--success[_ngcontent-%COMP%]:focus {\n  box-shadow: 4px 4px 0px #AAD661;\n  transform: none;\n}\n.form-input__field--disabled[_ngcontent-%COMP%] {\n  opacity: 0.5;\n  cursor: not-allowed;\n  background-color: var(--bg-secondary);\n}\n.form-input__field--disabled[_ngcontent-%COMP%]:hover {\n  box-shadow: 4px 4px 0px var(--shadow-color);\n  transform: none;\n}\n.form-input__error[_ngcontent-%COMP%] {\n  font-size: 0.75rem;\n  color: #E04A4A;\n  font-weight: 500;\n  display: flex;\n  align-items: center;\n  gap: 0.25rem;\n}\n.form-input__error[_ngcontent-%COMP%]::before {\n  content: "\\26a0";\n  font-size: 1rem;\n}\n.form-input__help[_ngcontent-%COMP%] {\n  font-size: 0.75rem;\n  color: var(--text-secondary);\n  font-style: italic;\n}\n/*# sourceMappingURL=form-input.css.map */'] });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(FormInput, [{
    type: Component,
    args: [{ selector: "app-form-input", imports: [CommonModule, FormsModule], template: `<div class="form-input-wrapper">
  <!-- Label con asociaci\xF3n al input mediante 'for' -->
  <label 
    [for]="inputId" 
    class="form-input__label"
    [class.form-input__label--required]="required">
    {{ label }}
    <span class="form-input__required-indicator" *ngIf="required" aria-label="Campo requerido">*</span>
  </label>
  
  <!-- Input con todos los atributos necesarios -->
  <input 
    [id]="inputId"
    [type]="type"
    [name]="name"
    [placeholder]="placeholder"
    [required]="required"
    [disabled]="disabled"
    [value]="currentValue()"
    (input)="onInputChange($event)"
    class="form-input__field"
    [class.form-input__field--error]="hasError"
    [class.form-input__field--success]="hasSuccess"
    [class.form-input__field--disabled]="disabled"
    [attr.aria-describedby]="(helpText || errorMessage) ? inputId + '-description' : null"
    [attr.aria-invalid]="hasError"
    [attr.aria-required]="required" />
  
  <!-- Mensaje de error (solo se muestra si hay error) -->
  @if (hasError && errorMessage) {
  <p
    [id]="inputId + '-description'"
    class="form-input__error"
    role="alert">
    {{ errorMessage }}
  </p>
  }
  
  <!-- Texto de ayuda (solo se muestra si no hay error) -->
  @if (!hasError && helpText) {
  <p
    [id]="inputId + '-description'"
    class="form-input__help">
    {{ helpText }}
  </p>
  }
</div>
`, styles: ['@charset "UTF-8";\n\n/* src/app/components/shared/form-input/form-input.scss */\n.form-input-wrapper {\n  display: flex;\n  flex-direction: column;\n  gap: 0.5rem;\n  width: 100%;\n}\n.form-input__label {\n  font-size: 0.875rem;\n  font-weight: 500;\n  color: var(--text-primary);\n  display: flex;\n  align-items: center;\n  gap: 0.25rem;\n}\n.form-input__label--required {\n  font-weight: 600;\n}\n.form-input__required-indicator {\n  color: #E04A4A;\n  font-weight: 600;\n  font-size: 1.125rem;\n  line-height: 1;\n}\n.form-input__field {\n  font-family: "Space Grotesk", sans-serif;\n  font-size: 1rem;\n  padding: 0.5rem 1rem;\n  border: 3px solid var(--border-color);\n  border-radius: 5px;\n  background-color: var(--bg-primary);\n  color: var(--text-primary);\n  box-shadow: 4px 4px 0px var(--shadow-color);\n  transition: all 150ms ease-in-out;\n  width: 100%;\n  outline: none;\n}\n.form-input__field::placeholder {\n  color: var(--text-placeholder);\n  opacity: 1;\n}\n.form-input__field:focus {\n  border-color: var(--color-primary);\n  box-shadow: 4px 4px 0px #ED9C05;\n}\n.form-input__field:hover:not(:disabled):not(.form-input__field--error):not(.form-input__field--success) {\n  box-shadow: 2px 2px 0px var(--shadow-color);\n  transform: translate(2px, 2px);\n}\n.form-input__field--error {\n  border-color: #E04A4A;\n  box-shadow: 4px 4px 0px #E04A4A;\n}\n.form-input__field--error:hover:not(:disabled) {\n  box-shadow: 2px 2px 0px #E04A4A;\n  transform: translate(2px, 2px);\n}\n.form-input__field--error:focus {\n  box-shadow: 4px 4px 0px #E04A4A;\n  transform: none;\n}\n.form-input__field--success {\n  border-color: #AAD661;\n  box-shadow: 4px 4px 0px #AAD661;\n}\n.form-input__field--success:hover:not(:disabled) {\n  box-shadow: 2px 2px 0px #AAD661;\n  transform: translate(2px, 2px);\n}\n.form-input__field--success:focus {\n  box-shadow: 4px 4px 0px #AAD661;\n  transform: none;\n}\n.form-input__field--disabled {\n  opacity: 0.5;\n  cursor: not-allowed;\n  background-color: var(--bg-secondary);\n}\n.form-input__field--disabled:hover {\n  box-shadow: 4px 4px 0px var(--shadow-color);\n  transform: none;\n}\n.form-input__error {\n  font-size: 0.75rem;\n  color: #E04A4A;\n  font-weight: 500;\n  display: flex;\n  align-items: center;\n  gap: 0.25rem;\n}\n.form-input__error::before {\n  content: "\\26a0";\n  font-size: 1rem;\n}\n.form-input__help {\n  font-size: 0.75rem;\n  color: var(--text-secondary);\n  font-style: italic;\n}\n/*# sourceMappingURL=form-input.css.map */\n'] }]
  }], null, { label: [{
    type: Input
  }], type: [{
    type: Input
  }], name: [{
    type: Input
  }], placeholder: [{
    type: Input
  }], required: [{
    type: Input
  }], disabled: [{
    type: Input
  }], value: [{
    type: Input
  }], helpText: [{
    type: Input
  }], errorMessage: [{
    type: Input
  }], hasError: [{
    type: Input
  }], hasSuccess: [{
    type: Input
  }] });
})();
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(FormInput, { className: "FormInput", filePath: "src/app/components/shared/form-input/form-input.ts", lineNumber: 13 });
})();

// src/app/components/shared/form-textarea/form-textarea.ts
function FormTextarea_label_1_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "label", 4);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext();
    \u0275\u0275property("for", ctx_r0.id);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", ctx_r0.label, " ");
  }
}
function FormTextarea_p_3_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "p", 5);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext();
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(ctx_r0.hint);
  }
}
function FormTextarea_p_4_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "p", 6);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext();
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(ctx_r0.error);
  }
}
var FormTextarea = class _FormTextarea {
  label = "";
  id = "";
  placeholder = "";
  rows = 4;
  disabled = false;
  error = "";
  hint = "";
  value = "";
  isFocused = false;
  // ControlValueAccessor implementation
  onChange = () => {
  };
  onTouched = () => {
  };
  writeValue(value) {
    this.value = value || "";
  }
  registerOnChange(fn) {
    this.onChange = fn;
  }
  registerOnTouched(fn) {
    this.onTouched = fn;
  }
  setDisabledState(isDisabled) {
    this.disabled = isDisabled;
  }
  onInputChange(event) {
    const target = event.target;
    this.value = target.value;
    this.onChange(this.value);
  }
  onFocus() {
    this.isFocused = true;
  }
  onBlur() {
    this.isFocused = false;
    this.onTouched();
  }
  get wrapperClasses() {
    let classes = "form-textarea";
    if (this.error)
      classes += " form-textarea--error";
    if (this.disabled)
      classes += " form-textarea--disabled";
    if (this.isFocused)
      classes += " form-textarea--focused";
    return classes;
  }
  static \u0275fac = function FormTextarea_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _FormTextarea)();
  };
  static \u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _FormTextarea, selectors: [["app-form-textarea"]], inputs: { label: "label", id: "id", placeholder: "placeholder", rows: "rows", disabled: "disabled", error: "error", hint: "hint" }, features: [\u0275\u0275ProvidersFeature([
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => _FormTextarea),
      multi: true
    }
  ])], decls: 5, vars: 10, consts: [["class", "form-textarea__label", 3, "for", 4, "ngIf"], [1, "form-textarea__field", 3, "input", "focus", "blur", "id", "placeholder", "rows", "disabled", "value"], ["class", "form-textarea__hint", 4, "ngIf"], ["class", "form-textarea__error", 4, "ngIf"], [1, "form-textarea__label", 3, "for"], [1, "form-textarea__hint"], [1, "form-textarea__error"]], template: function FormTextarea_Template(rf, ctx) {
    if (rf & 1) {
      \u0275\u0275elementStart(0, "div");
      \u0275\u0275template(1, FormTextarea_label_1_Template, 2, 2, "label", 0);
      \u0275\u0275elementStart(2, "textarea", 1);
      \u0275\u0275listener("input", function FormTextarea_Template_textarea_input_2_listener($event) {
        return ctx.onInputChange($event);
      })("focus", function FormTextarea_Template_textarea_focus_2_listener() {
        return ctx.onFocus();
      })("blur", function FormTextarea_Template_textarea_blur_2_listener() {
        return ctx.onBlur();
      });
      \u0275\u0275elementEnd();
      \u0275\u0275template(3, FormTextarea_p_3_Template, 2, 1, "p", 2)(4, FormTextarea_p_4_Template, 2, 1, "p", 3);
      \u0275\u0275elementEnd();
    }
    if (rf & 2) {
      \u0275\u0275classMap(ctx.wrapperClasses);
      \u0275\u0275advance();
      \u0275\u0275property("ngIf", ctx.label);
      \u0275\u0275advance();
      \u0275\u0275property("id", ctx.id)("placeholder", ctx.placeholder)("rows", ctx.rows)("disabled", ctx.disabled)("value", ctx.value);
      \u0275\u0275advance();
      \u0275\u0275property("ngIf", ctx.hint && !ctx.error);
      \u0275\u0275advance();
      \u0275\u0275property("ngIf", ctx.error);
    }
  }, dependencies: [CommonModule, NgIf], styles: ['@charset "UTF-8";\n\n\n\n.form-textarea[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  gap: 0.5rem;\n  width: 100%;\n}\n.form-textarea__label[_ngcontent-%COMP%] {\n  font-size: 0.875rem;\n  font-weight: 500;\n  color: var(--text-primary);\n  display: flex;\n  align-items: center;\n  gap: 0.25rem;\n}\n.form-textarea__field[_ngcontent-%COMP%] {\n  width: 100%;\n  padding: 0.5rem 1rem;\n  font-family: "Space Grotesk", sans-serif;\n  font-size: 1rem;\n  color: var(--text-primary);\n  background-color: var(--bg-primary);\n  border: 3px solid var(--border-color);\n  border-radius: 5px;\n  box-shadow: 4px 4px 0px var(--shadow-color);\n  transition: all 150ms ease-in-out;\n  outline: none;\n  line-height: 1.4;\n  resize: vertical;\n  min-height: 80px;\n}\n.form-textarea__field[_ngcontent-%COMP%]::placeholder {\n  color: var(--text-secondary);\n}\n.form-textarea__field[_ngcontent-%COMP%]:focus {\n  border-color: var(--color-primary);\n  box-shadow: 4px 4px 0px #ED9C05;\n}\n.form-textarea__field[_ngcontent-%COMP%]:hover:not(:disabled) {\n  transform: translate(-1px, -1px);\n  box-shadow: 3px 3px 0px var(--border-color);\n}\n.form-textarea__field[_ngcontent-%COMP%]:disabled {\n  opacity: 0.5;\n  cursor: not-allowed;\n  background-color: var(--bg-secondary);\n}\n.form-textarea__field[_ngcontent-%COMP%]:disabled:hover {\n  box-shadow: 4px 4px 0px var(--shadow-color);\n  transform: none;\n}\n.form-textarea__hint[_ngcontent-%COMP%] {\n  font-size: 0.75rem;\n  color: var(--text-secondary);\n  font-style: italic;\n  min-height: 1.5em;\n  margin: 0;\n  display: flex;\n  align-items: center;\n}\n.form-textarea__error[_ngcontent-%COMP%] {\n  font-size: 0.75rem;\n  color: #E04A4A;\n  font-weight: 500;\n  display: flex;\n  align-items: center;\n  gap: 0.25rem;\n  min-height: 1.5em;\n  margin: 0;\n}\n.form-textarea__error[_ngcontent-%COMP%]::before {\n  content: "\\26a0";\n  font-size: 1rem;\n}\n.form-textarea--error[_ngcontent-%COMP%]   .form-textarea__field[_ngcontent-%COMP%] {\n  border-color: #E04A4A;\n  box-shadow: 4px 4px 0px #E04A4A;\n}\n.form-textarea--error[_ngcontent-%COMP%]   .form-textarea__field[_ngcontent-%COMP%]:focus {\n  box-shadow: 4px 4px 0px #E04A4A;\n}\n/*# sourceMappingURL=form-textarea.css.map */'] });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(FormTextarea, [{
    type: Component,
    args: [{ selector: "app-form-textarea", standalone: true, imports: [CommonModule], providers: [
      {
        provide: NG_VALUE_ACCESSOR,
        useExisting: forwardRef(() => FormTextarea),
        multi: true
      }
    ], template: '<div [class]="wrapperClasses">\r\n  <label *ngIf="label" [for]="id" class="form-textarea__label">\r\n    {{ label }}\r\n  </label>\r\n\r\n  <textarea\r\n    [id]="id"\r\n    [placeholder]="placeholder"\r\n    [rows]="rows"\r\n    [disabled]="disabled"\r\n    [value]="value"\r\n    (input)="onInputChange($event)"\r\n    (focus)="onFocus()"\r\n    (blur)="onBlur()"\r\n    class="form-textarea__field"\r\n  ></textarea>\r\n\r\n  <p *ngIf="hint && !error" class="form-textarea__hint">{{ hint }}</p>\r\n  <p *ngIf="error" class="form-textarea__error">{{ error }}</p>\r\n</div>\r\n', styles: ['@charset "UTF-8";\n\n/* src/app/components/shared/form-textarea/form-textarea.scss */\n.form-textarea {\n  display: flex;\n  flex-direction: column;\n  gap: 0.5rem;\n  width: 100%;\n}\n.form-textarea__label {\n  font-size: 0.875rem;\n  font-weight: 500;\n  color: var(--text-primary);\n  display: flex;\n  align-items: center;\n  gap: 0.25rem;\n}\n.form-textarea__field {\n  width: 100%;\n  padding: 0.5rem 1rem;\n  font-family: "Space Grotesk", sans-serif;\n  font-size: 1rem;\n  color: var(--text-primary);\n  background-color: var(--bg-primary);\n  border: 3px solid var(--border-color);\n  border-radius: 5px;\n  box-shadow: 4px 4px 0px var(--shadow-color);\n  transition: all 150ms ease-in-out;\n  outline: none;\n  line-height: 1.4;\n  resize: vertical;\n  min-height: 80px;\n}\n.form-textarea__field::placeholder {\n  color: var(--text-secondary);\n}\n.form-textarea__field:focus {\n  border-color: var(--color-primary);\n  box-shadow: 4px 4px 0px #ED9C05;\n}\n.form-textarea__field:hover:not(:disabled) {\n  transform: translate(-1px, -1px);\n  box-shadow: 3px 3px 0px var(--border-color);\n}\n.form-textarea__field:disabled {\n  opacity: 0.5;\n  cursor: not-allowed;\n  background-color: var(--bg-secondary);\n}\n.form-textarea__field:disabled:hover {\n  box-shadow: 4px 4px 0px var(--shadow-color);\n  transform: none;\n}\n.form-textarea__hint {\n  font-size: 0.75rem;\n  color: var(--text-secondary);\n  font-style: italic;\n  min-height: 1.5em;\n  margin: 0;\n  display: flex;\n  align-items: center;\n}\n.form-textarea__error {\n  font-size: 0.75rem;\n  color: #E04A4A;\n  font-weight: 500;\n  display: flex;\n  align-items: center;\n  gap: 0.25rem;\n  min-height: 1.5em;\n  margin: 0;\n}\n.form-textarea__error::before {\n  content: "\\26a0";\n  font-size: 1rem;\n}\n.form-textarea--error .form-textarea__field {\n  border-color: #E04A4A;\n  box-shadow: 4px 4px 0px #E04A4A;\n}\n.form-textarea--error .form-textarea__field:focus {\n  box-shadow: 4px 4px 0px #E04A4A;\n}\n/*# sourceMappingURL=form-textarea.css.map */\n'] }]
  }], null, { label: [{
    type: Input
  }], id: [{
    type: Input
  }], placeholder: [{
    type: Input
  }], rows: [{
    type: Input
  }], disabled: [{
    type: Input
  }], error: [{
    type: Input
  }], hint: [{
    type: Input
  }] });
})();
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(FormTextarea, { className: "FormTextarea", filePath: "src/app/components/shared/form-textarea/form-textarea.ts", lineNumber: 19 });
})();

// src/app/components/shared/form-select/form-select.ts
function FormSelect_label_1_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "label", 8);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext();
    \u0275\u0275property("for", ctx_r0.id);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", ctx_r0.label, " ");
  }
}
function FormSelect_option_6_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "option", 9);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const option_r2 = ctx.$implicit;
    \u0275\u0275property("value", option_r2.value);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", option_r2.label, " ");
  }
}
function FormSelect_p_9_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "p", 10);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext();
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(ctx_r0.hint);
  }
}
function FormSelect_p_10_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "p", 11);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext();
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(ctx_r0.error);
  }
}
var FormSelect = class _FormSelect {
  label = "";
  id = "";
  placeholder = "Selecciona una opci\xF3n";
  options = [];
  disabled = false;
  error = "";
  hint = "";
  value = "";
  isFocused = false;
  // ControlValueAccessor implementation
  onChange = () => {
  };
  onTouched = () => {
  };
  writeValue(value) {
    this.value = value || "";
  }
  registerOnChange(fn) {
    this.onChange = fn;
  }
  registerOnTouched(fn) {
    this.onTouched = fn;
  }
  setDisabledState(isDisabled) {
    this.disabled = isDisabled;
  }
  onSelectChange(event) {
    const target = event.target;
    this.value = target.value;
    this.onChange(this.value);
  }
  onFocus() {
    this.isFocused = true;
  }
  onBlur() {
    this.isFocused = false;
    this.onTouched();
  }
  get wrapperClasses() {
    let classes = "form-select";
    if (this.error)
      classes += " form-select--error";
    if (this.disabled)
      classes += " form-select--disabled";
    if (this.isFocused)
      classes += " form-select--focused";
    return classes;
  }
  static \u0275fac = function FormSelect_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _FormSelect)();
  };
  static \u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _FormSelect, selectors: [["app-form-select"]], inputs: { label: "label", id: "id", placeholder: "placeholder", options: "options", disabled: "disabled", error: "error", hint: "hint" }, features: [\u0275\u0275ProvidersFeature([
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => _FormSelect),
      multi: true
    }
  ])], decls: 11, vars: 10, consts: [["class", "form-select__label", 3, "for", 4, "ngIf"], [1, "form-select__wrapper"], [1, "form-select__field", 3, "change", "focus", "blur", "id", "disabled", "value"], ["value", "", "disabled", "", "selected", ""], [3, "value", 4, "ngFor", "ngForOf"], [1, "form-select__arrow"], ["class", "form-select__hint", 4, "ngIf"], ["class", "form-select__error", 4, "ngIf"], [1, "form-select__label", 3, "for"], [3, "value"], [1, "form-select__hint"], [1, "form-select__error"]], template: function FormSelect_Template(rf, ctx) {
    if (rf & 1) {
      \u0275\u0275elementStart(0, "div");
      \u0275\u0275template(1, FormSelect_label_1_Template, 2, 2, "label", 0);
      \u0275\u0275elementStart(2, "div", 1)(3, "select", 2);
      \u0275\u0275listener("change", function FormSelect_Template_select_change_3_listener($event) {
        return ctx.onSelectChange($event);
      })("focus", function FormSelect_Template_select_focus_3_listener() {
        return ctx.onFocus();
      })("blur", function FormSelect_Template_select_blur_3_listener() {
        return ctx.onBlur();
      });
      \u0275\u0275elementStart(4, "option", 3);
      \u0275\u0275text(5);
      \u0275\u0275elementEnd();
      \u0275\u0275template(6, FormSelect_option_6_Template, 2, 2, "option", 4);
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(7, "span", 5);
      \u0275\u0275text(8, "\u25BC");
      \u0275\u0275elementEnd()();
      \u0275\u0275template(9, FormSelect_p_9_Template, 2, 1, "p", 6)(10, FormSelect_p_10_Template, 2, 1, "p", 7);
      \u0275\u0275elementEnd();
    }
    if (rf & 2) {
      \u0275\u0275classMap(ctx.wrapperClasses);
      \u0275\u0275advance();
      \u0275\u0275property("ngIf", ctx.label);
      \u0275\u0275advance(2);
      \u0275\u0275property("id", ctx.id)("disabled", ctx.disabled)("value", ctx.value);
      \u0275\u0275advance(2);
      \u0275\u0275textInterpolate(ctx.placeholder);
      \u0275\u0275advance();
      \u0275\u0275property("ngForOf", ctx.options);
      \u0275\u0275advance(3);
      \u0275\u0275property("ngIf", ctx.hint && !ctx.error);
      \u0275\u0275advance();
      \u0275\u0275property("ngIf", ctx.error);
    }
  }, dependencies: [CommonModule, NgForOf, NgIf], styles: ['@charset "UTF-8";\n\n\n\n.form-select[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  gap: 0.5rem;\n  width: 100%;\n}\n.form-select__label[_ngcontent-%COMP%] {\n  font-size: 0.875rem;\n  font-weight: 500;\n  color: var(--text-primary);\n  display: flex;\n  align-items: center;\n  gap: 0.25rem;\n}\n.form-select__wrapper[_ngcontent-%COMP%] {\n  position: relative;\n  width: 100%;\n}\n.form-select__field[_ngcontent-%COMP%] {\n  width: 100%;\n  padding: 0.5rem 1rem;\n  font-family: "Space Grotesk", sans-serif;\n  font-size: 1rem;\n  color: var(--text-primary);\n  background-color: var(--bg-primary);\n  border: 3px solid var(--border-color);\n  border-radius: 5px;\n  box-shadow: 4px 4px 0px var(--shadow-color);\n  transition: all 150ms ease-in-out;\n  outline: none;\n  padding-right: 3rem;\n  appearance: none;\n  cursor: pointer;\n}\n.form-select__field[_ngcontent-%COMP%]::placeholder {\n  color: var(--text-secondary);\n}\n.form-select__field[_ngcontent-%COMP%]:focus {\n  border-color: var(--color-primary);\n  box-shadow: 4px 4px 0px #ED9C05;\n}\n.form-select__field[_ngcontent-%COMP%]:hover:not(:disabled) {\n  transform: translate(-1px, -1px);\n  box-shadow: 3px 3px 0px var(--border-color);\n}\n.form-select__field[_ngcontent-%COMP%]:disabled {\n  opacity: 0.5;\n  cursor: not-allowed;\n  background-color: var(--bg-secondary);\n}\n.form-select__field[_ngcontent-%COMP%]:disabled:hover {\n  box-shadow: 4px 4px 0px var(--shadow-color);\n  transform: none;\n}\n.form-select__field[_ngcontent-%COMP%]   option[_ngcontent-%COMP%] {\n  background-color: var(--bg-primary);\n  color: var(--text-primary);\n  padding: 1rem;\n}\n.form-select__arrow[_ngcontent-%COMP%] {\n  position: absolute;\n  right: 1rem;\n  top: 50%;\n  transform: translateY(-50%);\n  pointer-events: none;\n  font-size: 0.75rem;\n  color: var(--text-primary);\n  transition: transform 150ms ease-in-out;\n}\n.form-select--focused[_ngcontent-%COMP%]   .form-select__arrow[_ngcontent-%COMP%] {\n  transform: translateY(-50%) rotate(180deg);\n}\n.form-select__hint[_ngcontent-%COMP%] {\n  font-size: 0.75rem;\n  color: var(--text-secondary);\n  font-style: italic;\n  min-height: 1.5em;\n  margin: 0;\n  display: flex;\n  align-items: center;\n}\n.form-select__error[_ngcontent-%COMP%] {\n  font-size: 0.75rem;\n  color: #E04A4A;\n  font-weight: 500;\n  display: flex;\n  align-items: center;\n  gap: 0.25rem;\n  min-height: 1.5em;\n  margin: 0;\n}\n.form-select__error[_ngcontent-%COMP%]::before {\n  content: "\\26a0";\n  font-size: 1rem;\n}\n.form-select--error[_ngcontent-%COMP%]   .form-select__field[_ngcontent-%COMP%] {\n  border-color: #E04A4A;\n  box-shadow: 4px 4px 0px #E04A4A;\n}\n.form-select--error[_ngcontent-%COMP%]   .form-select__field[_ngcontent-%COMP%]:focus {\n  box-shadow: 4px 4px 0px #E04A4A;\n}\n/*# sourceMappingURL=form-select.css.map */'] });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(FormSelect, [{
    type: Component,
    args: [{ selector: "app-form-select", standalone: true, imports: [CommonModule], providers: [
      {
        provide: NG_VALUE_ACCESSOR,
        useExisting: forwardRef(() => FormSelect),
        multi: true
      }
    ], template: '<div [class]="wrapperClasses">\r\n  <label *ngIf="label" [for]="id" class="form-select__label">\r\n    {{ label }}\r\n  </label>\r\n\r\n  <div class="form-select__wrapper">\r\n    <select\r\n      [id]="id"\r\n      [disabled]="disabled"\r\n      [value]="value"\r\n      (change)="onSelectChange($event)"\r\n      (focus)="onFocus()"\r\n      (blur)="onBlur()"\r\n      class="form-select__field"\r\n    >\r\n      <option value="" disabled selected>{{ placeholder }}</option>\r\n      <option *ngFor="let option of options" [value]="option.value">\r\n        {{ option.label }}\r\n      </option>\r\n    </select>\r\n    <span class="form-select__arrow">\u25BC</span>\r\n  </div>\r\n\r\n  <p *ngIf="hint && !error" class="form-select__hint">{{ hint }}</p>\r\n  <p *ngIf="error" class="form-select__error">{{ error }}</p>\r\n</div>\r\n', styles: ['@charset "UTF-8";\n\n/* src/app/components/shared/form-select/form-select.scss */\n.form-select {\n  display: flex;\n  flex-direction: column;\n  gap: 0.5rem;\n  width: 100%;\n}\n.form-select__label {\n  font-size: 0.875rem;\n  font-weight: 500;\n  color: var(--text-primary);\n  display: flex;\n  align-items: center;\n  gap: 0.25rem;\n}\n.form-select__wrapper {\n  position: relative;\n  width: 100%;\n}\n.form-select__field {\n  width: 100%;\n  padding: 0.5rem 1rem;\n  font-family: "Space Grotesk", sans-serif;\n  font-size: 1rem;\n  color: var(--text-primary);\n  background-color: var(--bg-primary);\n  border: 3px solid var(--border-color);\n  border-radius: 5px;\n  box-shadow: 4px 4px 0px var(--shadow-color);\n  transition: all 150ms ease-in-out;\n  outline: none;\n  padding-right: 3rem;\n  appearance: none;\n  cursor: pointer;\n}\n.form-select__field::placeholder {\n  color: var(--text-secondary);\n}\n.form-select__field:focus {\n  border-color: var(--color-primary);\n  box-shadow: 4px 4px 0px #ED9C05;\n}\n.form-select__field:hover:not(:disabled) {\n  transform: translate(-1px, -1px);\n  box-shadow: 3px 3px 0px var(--border-color);\n}\n.form-select__field:disabled {\n  opacity: 0.5;\n  cursor: not-allowed;\n  background-color: var(--bg-secondary);\n}\n.form-select__field:disabled:hover {\n  box-shadow: 4px 4px 0px var(--shadow-color);\n  transform: none;\n}\n.form-select__field option {\n  background-color: var(--bg-primary);\n  color: var(--text-primary);\n  padding: 1rem;\n}\n.form-select__arrow {\n  position: absolute;\n  right: 1rem;\n  top: 50%;\n  transform: translateY(-50%);\n  pointer-events: none;\n  font-size: 0.75rem;\n  color: var(--text-primary);\n  transition: transform 150ms ease-in-out;\n}\n.form-select--focused .form-select__arrow {\n  transform: translateY(-50%) rotate(180deg);\n}\n.form-select__hint {\n  font-size: 0.75rem;\n  color: var(--text-secondary);\n  font-style: italic;\n  min-height: 1.5em;\n  margin: 0;\n  display: flex;\n  align-items: center;\n}\n.form-select__error {\n  font-size: 0.75rem;\n  color: #E04A4A;\n  font-weight: 500;\n  display: flex;\n  align-items: center;\n  gap: 0.25rem;\n  min-height: 1.5em;\n  margin: 0;\n}\n.form-select__error::before {\n  content: "\\26a0";\n  font-size: 1rem;\n}\n.form-select--error .form-select__field {\n  border-color: #E04A4A;\n  box-shadow: 4px 4px 0px #E04A4A;\n}\n.form-select--error .form-select__field:focus {\n  box-shadow: 4px 4px 0px #E04A4A;\n}\n/*# sourceMappingURL=form-select.css.map */\n'] }]
  }], null, { label: [{
    type: Input
  }], id: [{
    type: Input
  }], placeholder: [{
    type: Input
  }], options: [{
    type: Input
  }], disabled: [{
    type: Input
  }], error: [{
    type: Input
  }], hint: [{
    type: Input
  }] });
})();
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(FormSelect, { className: "FormSelect", filePath: "src/app/components/shared/form-select/form-select.ts", lineNumber: 24 });
})();

// src/app/components/shared/form-checkbox/form-checkbox.ts
function FormCheckbox__svg_svg_4_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275namespaceSVG();
    \u0275\u0275elementStart(0, "svg", 6);
    \u0275\u0275element(1, "path", 7);
    \u0275\u0275elementEnd();
  }
}
function FormCheckbox_p_7_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "p", 8);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext();
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(ctx_r0.error);
  }
}
var FormCheckbox = class _FormCheckbox {
  label = "";
  id = "";
  disabled = false;
  error = "";
  checked = false;
  // ControlValueAccessor implementation
  onChange = () => {
  };
  onTouched = () => {
  };
  writeValue(value) {
    this.checked = !!value;
  }
  registerOnChange(fn) {
    this.onChange = fn;
  }
  registerOnTouched(fn) {
    this.onTouched = fn;
  }
  setDisabledState(isDisabled) {
    this.disabled = isDisabled;
  }
  onCheckboxChange(event) {
    const target = event.target;
    this.checked = target.checked;
    this.onChange(this.checked);
    this.onTouched();
  }
  get wrapperClasses() {
    let classes = "form-checkbox";
    if (this.error)
      classes += " form-checkbox--error";
    if (this.disabled)
      classes += " form-checkbox--disabled";
    if (this.checked)
      classes += " form-checkbox--checked";
    return classes;
  }
  static \u0275fac = function FormCheckbox_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _FormCheckbox)();
  };
  static \u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _FormCheckbox, selectors: [["app-form-checkbox"]], inputs: { label: "label", id: "id", disabled: "disabled", error: "error" }, features: [\u0275\u0275ProvidersFeature([
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => _FormCheckbox),
      multi: true
    }
  ])], decls: 8, vars: 8, consts: [[1, "form-checkbox__label"], ["type", "checkbox", 1, "form-checkbox__input", 3, "change", "id", "checked", "disabled"], [1, "form-checkbox__box"], ["class", "form-checkbox__check", "viewBox", "0 0 24 24", "fill", "none", "xmlns", "http://www.w3.org/2000/svg", 4, "ngIf"], [1, "form-checkbox__text"], ["class", "form-checkbox__error", 4, "ngIf"], ["viewBox", "0 0 24 24", "fill", "none", "xmlns", "http://www.w3.org/2000/svg", 1, "form-checkbox__check"], ["d", "M5 12L10 17L19 7", "stroke", "currentColor", "stroke-width", "3", "stroke-linecap", "round", "stroke-linejoin", "round"], [1, "form-checkbox__error"]], template: function FormCheckbox_Template(rf, ctx) {
    if (rf & 1) {
      \u0275\u0275elementStart(0, "div")(1, "label", 0)(2, "input", 1);
      \u0275\u0275listener("change", function FormCheckbox_Template_input_change_2_listener($event) {
        return ctx.onCheckboxChange($event);
      });
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(3, "span", 2);
      \u0275\u0275template(4, FormCheckbox__svg_svg_4_Template, 2, 0, "svg", 3);
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(5, "span", 4);
      \u0275\u0275text(6);
      \u0275\u0275elementEnd()();
      \u0275\u0275template(7, FormCheckbox_p_7_Template, 2, 1, "p", 5);
      \u0275\u0275elementEnd();
    }
    if (rf & 2) {
      \u0275\u0275classMap(ctx.wrapperClasses);
      \u0275\u0275advance(2);
      \u0275\u0275property("id", ctx.id)("checked", ctx.checked)("disabled", ctx.disabled);
      \u0275\u0275advance(2);
      \u0275\u0275property("ngIf", ctx.checked);
      \u0275\u0275advance(2);
      \u0275\u0275textInterpolate(ctx.label);
      \u0275\u0275advance();
      \u0275\u0275property("ngIf", ctx.error);
    }
  }, dependencies: [CommonModule, NgIf], styles: ['@charset "UTF-8";\n\n\n\n.form-checkbox[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  gap: 0.5rem;\n}\n.form-checkbox__label[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 1rem;\n  cursor: pointer;\n  -webkit-user-select: none;\n  user-select: none;\n}\n.form-checkbox__input[_ngcontent-%COMP%] {\n  position: absolute;\n  opacity: 0;\n  width: 0;\n  height: 0;\n}\n.form-checkbox__input[_ngcontent-%COMP%]:focus    + .form-checkbox__box[_ngcontent-%COMP%] {\n  outline: 2px solid #ED9C05;\n  outline-offset: 2px;\n}\n.form-checkbox__box[_ngcontent-%COMP%] {\n  width: 20px;\n  height: 20px;\n  min-width: 20px;\n  min-height: 20px;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  border: 2px solid var(--border-color);\n  border-radius: 3px;\n  background-color: var(--bg-secondary);\n  box-shadow: 2px 2px 0px var(--border-color);\n  transition: all 150ms ease-in-out;\n}\n.form-checkbox__check[_ngcontent-%COMP%] {\n  width: 14px;\n  height: 14px;\n  color: var(--text-primary);\n}\n.form-checkbox__text[_ngcontent-%COMP%] {\n  font-size: 0.9375rem;\n  color: var(--text-primary);\n  font-weight: 500;\n}\n.form-checkbox__error[_ngcontent-%COMP%] {\n  font-size: 0.875rem;\n  color: #E04A4A;\n  font-weight: 600;\n  margin: 0;\n  padding-left: calc(20px + 1rem);\n}\n.form-checkbox[_ngcontent-%COMP%]:not(.form-checkbox--disabled)   .form-checkbox__label[_ngcontent-%COMP%]:hover   .form-checkbox__box[_ngcontent-%COMP%] {\n  transform: translate(-1px, -1px);\n  box-shadow: 3px 3px 0px var(--border-color);\n}\n.form-checkbox--checked[_ngcontent-%COMP%]   .form-checkbox__box[_ngcontent-%COMP%] {\n  background-color: var(--color-primary);\n  border-color: var(--border-color);\n}\n.form-checkbox--disabled[_ngcontent-%COMP%] {\n  opacity: 0.5;\n  cursor: not-allowed;\n}\n.form-checkbox--disabled[_ngcontent-%COMP%]   .form-checkbox__label[_ngcontent-%COMP%] {\n  cursor: not-allowed;\n}\n.form-checkbox--error[_ngcontent-%COMP%]   .form-checkbox__box[_ngcontent-%COMP%] {\n  border-color: #E04A4A;\n  box-shadow: 2px 2px 0px #E04A4A;\n}\n.form-checkbox--error[_ngcontent-%COMP%]   .form-checkbox__box[_ngcontent-%COMP%]:hover {\n  box-shadow: 3px 3px 0px #E04A4A;\n}\n/*# sourceMappingURL=form-checkbox.css.map */'] });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(FormCheckbox, [{
    type: Component,
    args: [{ selector: "app-form-checkbox", standalone: true, imports: [CommonModule], providers: [
      {
        provide: NG_VALUE_ACCESSOR,
        useExisting: forwardRef(() => FormCheckbox),
        multi: true
      }
    ], template: '<div [class]="wrapperClasses">\r\n  <label class="form-checkbox__label">\r\n    <input\r\n      type="checkbox"\r\n      [id]="id"\r\n      [checked]="checked"\r\n      [disabled]="disabled"\r\n      (change)="onCheckboxChange($event)"\r\n      class="form-checkbox__input"\r\n    />\r\n    <span class="form-checkbox__box">\r\n      <svg *ngIf="checked" class="form-checkbox__check" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">\r\n        <path d="M5 12L10 17L19 7" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/>\r\n      </svg>\r\n    </span>\r\n    <span class="form-checkbox__text">{{ label }}</span>\r\n  </label>\r\n\r\n  <p *ngIf="error" class="form-checkbox__error">{{ error }}</p>\r\n</div>\r\n', styles: ['@charset "UTF-8";\n\n/* src/app/components/shared/form-checkbox/form-checkbox.scss */\n.form-checkbox {\n  display: flex;\n  flex-direction: column;\n  gap: 0.5rem;\n}\n.form-checkbox__label {\n  display: flex;\n  align-items: center;\n  gap: 1rem;\n  cursor: pointer;\n  -webkit-user-select: none;\n  user-select: none;\n}\n.form-checkbox__input {\n  position: absolute;\n  opacity: 0;\n  width: 0;\n  height: 0;\n}\n.form-checkbox__input:focus + .form-checkbox__box {\n  outline: 2px solid #ED9C05;\n  outline-offset: 2px;\n}\n.form-checkbox__box {\n  width: 20px;\n  height: 20px;\n  min-width: 20px;\n  min-height: 20px;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  border: 2px solid var(--border-color);\n  border-radius: 3px;\n  background-color: var(--bg-secondary);\n  box-shadow: 2px 2px 0px var(--border-color);\n  transition: all 150ms ease-in-out;\n}\n.form-checkbox__check {\n  width: 14px;\n  height: 14px;\n  color: var(--text-primary);\n}\n.form-checkbox__text {\n  font-size: 0.9375rem;\n  color: var(--text-primary);\n  font-weight: 500;\n}\n.form-checkbox__error {\n  font-size: 0.875rem;\n  color: #E04A4A;\n  font-weight: 600;\n  margin: 0;\n  padding-left: calc(20px + 1rem);\n}\n.form-checkbox:not(.form-checkbox--disabled) .form-checkbox__label:hover .form-checkbox__box {\n  transform: translate(-1px, -1px);\n  box-shadow: 3px 3px 0px var(--border-color);\n}\n.form-checkbox--checked .form-checkbox__box {\n  background-color: var(--color-primary);\n  border-color: var(--border-color);\n}\n.form-checkbox--disabled {\n  opacity: 0.5;\n  cursor: not-allowed;\n}\n.form-checkbox--disabled .form-checkbox__label {\n  cursor: not-allowed;\n}\n.form-checkbox--error .form-checkbox__box {\n  border-color: #E04A4A;\n  box-shadow: 2px 2px 0px #E04A4A;\n}\n.form-checkbox--error .form-checkbox__box:hover {\n  box-shadow: 3px 3px 0px #E04A4A;\n}\n/*# sourceMappingURL=form-checkbox.css.map */\n'] }]
  }], null, { label: [{
    type: Input
  }], id: [{
    type: Input
  }], disabled: [{
    type: Input
  }], error: [{
    type: Input
  }] });
})();
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(FormCheckbox, { className: "FormCheckbox", filePath: "src/app/components/shared/form-checkbox/form-checkbox.ts", lineNumber: 19 });
})();

// src/app/components/shared/form-radio-group/form-radio-group.ts
function FormRadioGroup_p_1_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "p", 4);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext();
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(ctx_r0.label);
  }
}
function FormRadioGroup_label_3_span_3_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275element(0, "span", 10);
  }
}
function FormRadioGroup_label_3_Template(rf, ctx) {
  if (rf & 1) {
    const _r2 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "label", 5)(1, "input", 6);
    \u0275\u0275listener("change", function FormRadioGroup_label_3_Template_input_change_1_listener($event) {
      \u0275\u0275restoreView(_r2);
      const ctx_r0 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r0.onRadioChange($event));
    });
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(2, "span", 7);
    \u0275\u0275template(3, FormRadioGroup_label_3_span_3_Template, 1, 0, "span", 8);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(4, "span", 9);
    \u0275\u0275text(5);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const option_r3 = ctx.$implicit;
    const ctx_r0 = \u0275\u0275nextContext();
    \u0275\u0275advance();
    \u0275\u0275property("name", ctx_r0.name)("value", option_r3.value)("checked", ctx_r0.isChecked(option_r3.value))("disabled", ctx_r0.disabled);
    \u0275\u0275advance(2);
    \u0275\u0275property("ngIf", ctx_r0.isChecked(option_r3.value));
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(option_r3.label);
  }
}
function FormRadioGroup_p_4_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "p", 11);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext();
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(ctx_r0.error);
  }
}
var FormRadioGroup = class _FormRadioGroup {
  label = "";
  name = "";
  options = [];
  disabled = false;
  error = "";
  inline = false;
  value = "";
  // ControlValueAccessor implementation
  onChange = () => {
  };
  onTouched = () => {
  };
  writeValue(value) {
    this.value = value || "";
  }
  registerOnChange(fn) {
    this.onChange = fn;
  }
  registerOnTouched(fn) {
    this.onTouched = fn;
  }
  setDisabledState(isDisabled) {
    this.disabled = isDisabled;
  }
  onRadioChange(event) {
    const target = event.target;
    this.value = target.value;
    this.onChange(this.value);
    this.onTouched();
  }
  isChecked(optionValue) {
    return this.value === optionValue;
  }
  get wrapperClasses() {
    let classes = "form-radio-group";
    if (this.error)
      classes += " form-radio-group--error";
    if (this.disabled)
      classes += " form-radio-group--disabled";
    if (this.inline)
      classes += " form-radio-group--inline";
    return classes;
  }
  static \u0275fac = function FormRadioGroup_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _FormRadioGroup)();
  };
  static \u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _FormRadioGroup, selectors: [["app-form-radio-group"]], inputs: { label: "label", name: "name", options: "options", disabled: "disabled", error: "error", inline: "inline" }, features: [\u0275\u0275ProvidersFeature([
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => _FormRadioGroup),
      multi: true
    }
  ])], decls: 5, vars: 5, consts: [["class", "form-radio-group__label", 4, "ngIf"], [1, "form-radio-group__options"], ["class", "form-radio-group__option", 4, "ngFor", "ngForOf"], ["class", "form-radio-group__error", 4, "ngIf"], [1, "form-radio-group__label"], [1, "form-radio-group__option"], ["type", "radio", 1, "form-radio-group__input", 3, "change", "name", "value", "checked", "disabled"], [1, "form-radio-group__radio"], ["class", "form-radio-group__dot", 4, "ngIf"], [1, "form-radio-group__text"], [1, "form-radio-group__dot"], [1, "form-radio-group__error"]], template: function FormRadioGroup_Template(rf, ctx) {
    if (rf & 1) {
      \u0275\u0275elementStart(0, "div");
      \u0275\u0275template(1, FormRadioGroup_p_1_Template, 2, 1, "p", 0);
      \u0275\u0275elementStart(2, "div", 1);
      \u0275\u0275template(3, FormRadioGroup_label_3_Template, 6, 6, "label", 2);
      \u0275\u0275elementEnd();
      \u0275\u0275template(4, FormRadioGroup_p_4_Template, 2, 1, "p", 3);
      \u0275\u0275elementEnd();
    }
    if (rf & 2) {
      \u0275\u0275classMap(ctx.wrapperClasses);
      \u0275\u0275advance();
      \u0275\u0275property("ngIf", ctx.label);
      \u0275\u0275advance(2);
      \u0275\u0275property("ngForOf", ctx.options);
      \u0275\u0275advance();
      \u0275\u0275property("ngIf", ctx.error);
    }
  }, dependencies: [CommonModule, NgForOf, NgIf], styles: ['@charset "UTF-8";\n\n\n\n.form-radio-group[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  gap: 1rem;\n}\n.form-radio-group__label[_ngcontent-%COMP%] {\n  font-size: 0.9375rem;\n  font-weight: 700;\n  color: var(--text-primary);\n  margin: 0;\n}\n.form-radio-group__options[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  gap: 1rem;\n}\n.form-radio-group__option[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 1rem;\n  cursor: pointer;\n  -webkit-user-select: none;\n  user-select: none;\n}\n.form-radio-group__input[_ngcontent-%COMP%] {\n  position: absolute;\n  opacity: 0;\n  width: 0;\n  height: 0;\n}\n.form-radio-group__input[_ngcontent-%COMP%]:focus    + .form-radio-group__radio[_ngcontent-%COMP%] {\n  outline: 2px solid #ED9C05;\n  outline-offset: 2px;\n}\n.form-radio-group__radio[_ngcontent-%COMP%] {\n  width: 20px;\n  height: 20px;\n  min-width: 20px;\n  min-height: 20px;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  border: 2px solid var(--border-color);\n  border-radius: 50%;\n  background-color: var(--bg-secondary);\n  box-shadow: 2px 2px 0px var(--border-color);\n  transition: all 150ms ease-in-out;\n}\n.form-radio-group__dot[_ngcontent-%COMP%] {\n  width: 10px;\n  height: 10px;\n  border-radius: 50%;\n  background-color: var(--text-primary);\n  transition: all 150ms ease-in-out;\n}\n.form-radio-group__text[_ngcontent-%COMP%] {\n  font-size: 0.9375rem;\n  color: var(--text-primary);\n  font-weight: 500;\n}\n.form-radio-group__error[_ngcontent-%COMP%] {\n  font-size: 0.875rem;\n  color: #E04A4A;\n  font-weight: 600;\n  margin: 0;\n}\n.form-radio-group[_ngcontent-%COMP%]:not(.form-radio-group--disabled)   .form-radio-group__option[_ngcontent-%COMP%]:hover   .form-radio-group__radio[_ngcontent-%COMP%] {\n  transform: translate(-1px, -1px);\n  box-shadow: 3px 3px 0px var(--border-color);\n}\n.form-radio-group__input[_ngcontent-%COMP%]:checked    + .form-radio-group__radio[_ngcontent-%COMP%] {\n  background-color: var(--color-primary);\n  border-color: var(--border-color);\n}\n.form-radio-group--disabled[_ngcontent-%COMP%] {\n  opacity: 0.5;\n  cursor: not-allowed;\n}\n.form-radio-group--disabled[_ngcontent-%COMP%]   .form-radio-group__option[_ngcontent-%COMP%] {\n  cursor: not-allowed;\n}\n.form-radio-group--inline[_ngcontent-%COMP%]   .form-radio-group__options[_ngcontent-%COMP%] {\n  flex-direction: row;\n  flex-wrap: wrap;\n}\n.form-radio-group--error[_ngcontent-%COMP%]   .form-radio-group__radio[_ngcontent-%COMP%] {\n  border-color: #E04A4A;\n  box-shadow: 2px 2px 0px #E04A4A;\n}\n.form-radio-group--error[_ngcontent-%COMP%]   .form-radio-group__radio[_ngcontent-%COMP%]:hover {\n  box-shadow: 3px 3px 0px #E04A4A;\n}\n/*# sourceMappingURL=form-radio-group.css.map */'] });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(FormRadioGroup, [{
    type: Component,
    args: [{ selector: "app-form-radio-group", standalone: true, imports: [CommonModule], providers: [
      {
        provide: NG_VALUE_ACCESSOR,
        useExisting: forwardRef(() => FormRadioGroup),
        multi: true
      }
    ], template: '<div [class]="wrapperClasses">\r\n  <p *ngIf="label" class="form-radio-group__label">{{ label }}</p>\r\n\r\n  <div class="form-radio-group__options">\r\n    <label\r\n      *ngFor="let option of options; let i = index"\r\n      class="form-radio-group__option"\r\n    >\r\n      <input\r\n        type="radio"\r\n        [name]="name"\r\n        [value]="option.value"\r\n        [checked]="isChecked(option.value)"\r\n        [disabled]="disabled"\r\n        (change)="onRadioChange($event)"\r\n        class="form-radio-group__input"\r\n      />\r\n      <span class="form-radio-group__radio">\r\n        <span *ngIf="isChecked(option.value)" class="form-radio-group__dot"></span>\r\n      </span>\r\n      <span class="form-radio-group__text">{{ option.label }}</span>\r\n    </label>\r\n  </div>\r\n\r\n  <p *ngIf="error" class="form-radio-group__error">{{ error }}</p>\r\n</div>\r\n', styles: ['@charset "UTF-8";\n\n/* src/app/components/shared/form-radio-group/form-radio-group.scss */\n.form-radio-group {\n  display: flex;\n  flex-direction: column;\n  gap: 1rem;\n}\n.form-radio-group__label {\n  font-size: 0.9375rem;\n  font-weight: 700;\n  color: var(--text-primary);\n  margin: 0;\n}\n.form-radio-group__options {\n  display: flex;\n  flex-direction: column;\n  gap: 1rem;\n}\n.form-radio-group__option {\n  display: flex;\n  align-items: center;\n  gap: 1rem;\n  cursor: pointer;\n  -webkit-user-select: none;\n  user-select: none;\n}\n.form-radio-group__input {\n  position: absolute;\n  opacity: 0;\n  width: 0;\n  height: 0;\n}\n.form-radio-group__input:focus + .form-radio-group__radio {\n  outline: 2px solid #ED9C05;\n  outline-offset: 2px;\n}\n.form-radio-group__radio {\n  width: 20px;\n  height: 20px;\n  min-width: 20px;\n  min-height: 20px;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  border: 2px solid var(--border-color);\n  border-radius: 50%;\n  background-color: var(--bg-secondary);\n  box-shadow: 2px 2px 0px var(--border-color);\n  transition: all 150ms ease-in-out;\n}\n.form-radio-group__dot {\n  width: 10px;\n  height: 10px;\n  border-radius: 50%;\n  background-color: var(--text-primary);\n  transition: all 150ms ease-in-out;\n}\n.form-radio-group__text {\n  font-size: 0.9375rem;\n  color: var(--text-primary);\n  font-weight: 500;\n}\n.form-radio-group__error {\n  font-size: 0.875rem;\n  color: #E04A4A;\n  font-weight: 600;\n  margin: 0;\n}\n.form-radio-group:not(.form-radio-group--disabled) .form-radio-group__option:hover .form-radio-group__radio {\n  transform: translate(-1px, -1px);\n  box-shadow: 3px 3px 0px var(--border-color);\n}\n.form-radio-group__input:checked + .form-radio-group__radio {\n  background-color: var(--color-primary);\n  border-color: var(--border-color);\n}\n.form-radio-group--disabled {\n  opacity: 0.5;\n  cursor: not-allowed;\n}\n.form-radio-group--disabled .form-radio-group__option {\n  cursor: not-allowed;\n}\n.form-radio-group--inline .form-radio-group__options {\n  flex-direction: row;\n  flex-wrap: wrap;\n}\n.form-radio-group--error .form-radio-group__radio {\n  border-color: #E04A4A;\n  box-shadow: 2px 2px 0px #E04A4A;\n}\n.form-radio-group--error .form-radio-group__radio:hover {\n  box-shadow: 3px 3px 0px #E04A4A;\n}\n/*# sourceMappingURL=form-radio-group.css.map */\n'] }]
  }], null, { label: [{
    type: Input
  }], name: [{
    type: Input
  }], options: [{
    type: Input
  }], disabled: [{
    type: Input
  }], error: [{
    type: Input
  }], inline: [{
    type: Input
  }] });
})();
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(FormRadioGroup, { className: "FormRadioGroup", filePath: "src/app/components/shared/form-radio-group/form-radio-group.ts", lineNumber: 24 });
})();

// src/app/components/shared/breadcrumbs/breadcrumbs.ts
function Breadcrumbs_li_2_a_1_span_1_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275element(0, "span", 10);
  }
  if (rf & 2) {
    const item_r1 = \u0275\u0275nextContext(2).$implicit;
    \u0275\u0275property("innerHTML", item_r1.icon, \u0275\u0275sanitizeHtml);
  }
}
function Breadcrumbs_li_2_a_1_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "a", 7);
    \u0275\u0275template(1, Breadcrumbs_li_2_a_1_span_1_Template, 1, 1, "span", 8);
    \u0275\u0275elementStart(2, "span", 9);
    \u0275\u0275text(3);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const item_r1 = \u0275\u0275nextContext().$implicit;
    \u0275\u0275property("routerLink", item_r1.url);
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", item_r1.icon);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(item_r1.label);
  }
}
function Breadcrumbs_li_2_span_2_span_1_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275element(0, "span", 10);
  }
  if (rf & 2) {
    const item_r1 = \u0275\u0275nextContext(2).$implicit;
    \u0275\u0275property("innerHTML", item_r1.icon, \u0275\u0275sanitizeHtml);
  }
}
function Breadcrumbs_li_2_span_2_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span", 11);
    \u0275\u0275template(1, Breadcrumbs_li_2_span_2_span_1_Template, 1, 1, "span", 8);
    \u0275\u0275elementStart(2, "span", 9);
    \u0275\u0275text(3);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const item_r1 = \u0275\u0275nextContext().$implicit;
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", item_r1.icon);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(item_r1.label);
  }
}
function Breadcrumbs_li_2_span_3_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span", 12);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext(2);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(ctx_r1.separator);
  }
}
function Breadcrumbs_li_2_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "li", 3);
    \u0275\u0275template(1, Breadcrumbs_li_2_a_1_Template, 4, 3, "a", 4)(2, Breadcrumbs_li_2_span_2_Template, 4, 2, "span", 5)(3, Breadcrumbs_li_2_span_3_Template, 2, 1, "span", 6);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const item_r1 = ctx.$implicit;
    const isLast_r3 = ctx.last;
    \u0275\u0275classProp("breadcrumbs__item--active", isLast_r3);
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", !isLast_r3 && item_r1.url);
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", isLast_r3 || !item_r1.url);
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", !isLast_r3);
  }
}
var Breadcrumbs = class _Breadcrumbs {
  items = [];
  separator = "/";
  static \u0275fac = function Breadcrumbs_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _Breadcrumbs)();
  };
  static \u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _Breadcrumbs, selectors: [["app-breadcrumbs"]], inputs: { items: "items", separator: "separator" }, decls: 3, vars: 1, consts: [["aria-label", "Navegaci\xF3n por migas de pan", 1, "breadcrumbs"], [1, "breadcrumbs__list"], ["class", "breadcrumbs__item", 3, "breadcrumbs__item--active", 4, "ngFor", "ngForOf"], [1, "breadcrumbs__item"], ["class", "breadcrumbs__link", 3, "routerLink", 4, "ngIf"], ["class", "breadcrumbs__text", 4, "ngIf"], ["class", "breadcrumbs__separator", 4, "ngIf"], [1, "breadcrumbs__link", 3, "routerLink"], ["class", "breadcrumbs__icon", 3, "innerHTML", 4, "ngIf"], [1, "breadcrumbs__label"], [1, "breadcrumbs__icon", 3, "innerHTML"], [1, "breadcrumbs__text"], [1, "breadcrumbs__separator"]], template: function Breadcrumbs_Template(rf, ctx) {
    if (rf & 1) {
      \u0275\u0275elementStart(0, "nav", 0)(1, "ol", 1);
      \u0275\u0275template(2, Breadcrumbs_li_2_Template, 4, 5, "li", 2);
      \u0275\u0275elementEnd()();
    }
    if (rf & 2) {
      \u0275\u0275advance(2);
      \u0275\u0275property("ngForOf", ctx.items);
    }
  }, dependencies: [CommonModule, NgForOf, NgIf, RouterModule, RouterLink], styles: ['@charset "UTF-8";\n\n\n\n.breadcrumbs[_ngcontent-%COMP%] {\n  width: 100%;\n  padding: 0.5rem 0;\n}\n.breadcrumbs__list[_ngcontent-%COMP%] {\n  display: flex;\n  flex-wrap: wrap;\n  align-items: center;\n  gap: 0.5rem;\n  list-style: none;\n  padding: 0;\n  margin: 0;\n}\n.breadcrumbs__item[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 0.5rem;\n}\n.breadcrumbs__item--active[_ngcontent-%COMP%]   .breadcrumbs__text[_ngcontent-%COMP%] {\n  font-weight: 700;\n  color: var(--text-primary);\n}\n.breadcrumbs__link[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 4px;\n  text-decoration: none;\n  color: var(--text-primary);\n  font-size: 0.9375rem;\n  font-weight: 500;\n  transition: all 150ms ease-in-out;\n  padding: 2px 4px;\n  border-radius: 3px;\n}\n.breadcrumbs__link[_ngcontent-%COMP%]:hover {\n  color: var(--color-primary);\n  background-color: var(--bg-secondary);\n}\n.breadcrumbs__link[_ngcontent-%COMP%]:focus {\n  outline: 2px solid var(--color-primary);\n  outline-offset: 2px;\n}\n.breadcrumbs__text[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 4px;\n  font-size: 0.9375rem;\n  font-weight: 500;\n  color: var(--text-primary);\n  opacity: 0.7;\n}\n.breadcrumbs__icon[_ngcontent-%COMP%] {\n  font-size: 1rem;\n  line-height: 1;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n}\n.breadcrumbs__label[_ngcontent-%COMP%] {\n  white-space: nowrap;\n  overflow: hidden;\n  text-overflow: ellipsis;\n  max-width: 200px;\n}\n@media (max-width: 768px) {\n  .breadcrumbs__label[_ngcontent-%COMP%] {\n    max-width: 120px;\n  }\n}\n.breadcrumbs__separator[_ngcontent-%COMP%] {\n  font-size: 0.875rem;\n  color: var(--text-primary);\n  opacity: 0.5;\n  -webkit-user-select: none;\n  user-select: none;\n}\n/*# sourceMappingURL=breadcrumbs.css.map */'] });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(Breadcrumbs, [{
    type: Component,
    args: [{ selector: "app-breadcrumbs", standalone: true, imports: [CommonModule, RouterModule], template: '<nav class="breadcrumbs" aria-label="Navegaci\xF3n por migas de pan">\r\n  <ol class="breadcrumbs__list">\r\n    <li\r\n      *ngFor="let item of items; let i = index; let isLast = last"\r\n      class="breadcrumbs__item"\r\n      [class.breadcrumbs__item--active]="isLast"\r\n    >\r\n      <!-- Link para items no activos -->\r\n      <a\r\n        *ngIf="!isLast && item.url"\r\n        [routerLink]="item.url"\r\n        class="breadcrumbs__link"\r\n      >\r\n        <span *ngIf="item.icon" class="breadcrumbs__icon" [innerHTML]="item.icon"></span>\r\n        <span class="breadcrumbs__label">{{ item.label }}</span>\r\n      </a>\r\n\r\n      <!-- Texto plano para item activo o sin url -->\r\n      <span *ngIf="isLast || !item.url" class="breadcrumbs__text">\r\n        <span *ngIf="item.icon" class="breadcrumbs__icon" [innerHTML]="item.icon"></span>\r\n        <span class="breadcrumbs__label">{{ item.label }}</span>\r\n      </span>\r\n\r\n      <!-- Separador (no en el \xFAltimo item) -->\r\n      <span *ngIf="!isLast" class="breadcrumbs__separator">{{ separator }}</span>\r\n    </li>\r\n  </ol>\r\n</nav>\r\n', styles: ['@charset "UTF-8";\n\n/* src/app/components/shared/breadcrumbs/breadcrumbs.scss */\n.breadcrumbs {\n  width: 100%;\n  padding: 0.5rem 0;\n}\n.breadcrumbs__list {\n  display: flex;\n  flex-wrap: wrap;\n  align-items: center;\n  gap: 0.5rem;\n  list-style: none;\n  padding: 0;\n  margin: 0;\n}\n.breadcrumbs__item {\n  display: flex;\n  align-items: center;\n  gap: 0.5rem;\n}\n.breadcrumbs__item--active .breadcrumbs__text {\n  font-weight: 700;\n  color: var(--text-primary);\n}\n.breadcrumbs__link {\n  display: flex;\n  align-items: center;\n  gap: 4px;\n  text-decoration: none;\n  color: var(--text-primary);\n  font-size: 0.9375rem;\n  font-weight: 500;\n  transition: all 150ms ease-in-out;\n  padding: 2px 4px;\n  border-radius: 3px;\n}\n.breadcrumbs__link:hover {\n  color: var(--color-primary);\n  background-color: var(--bg-secondary);\n}\n.breadcrumbs__link:focus {\n  outline: 2px solid var(--color-primary);\n  outline-offset: 2px;\n}\n.breadcrumbs__text {\n  display: flex;\n  align-items: center;\n  gap: 4px;\n  font-size: 0.9375rem;\n  font-weight: 500;\n  color: var(--text-primary);\n  opacity: 0.7;\n}\n.breadcrumbs__icon {\n  font-size: 1rem;\n  line-height: 1;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n}\n.breadcrumbs__label {\n  white-space: nowrap;\n  overflow: hidden;\n  text-overflow: ellipsis;\n  max-width: 200px;\n}\n@media (max-width: 768px) {\n  .breadcrumbs__label {\n    max-width: 120px;\n  }\n}\n.breadcrumbs__separator {\n  font-size: 0.875rem;\n  color: var(--text-primary);\n  opacity: 0.5;\n  -webkit-user-select: none;\n  user-select: none;\n}\n/*# sourceMappingURL=breadcrumbs.css.map */\n'] }]
  }], null, { items: [{
    type: Input
  }], separator: [{
    type: Input
  }] });
})();
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(Breadcrumbs, { className: "Breadcrumbs", filePath: "src/app/components/shared/breadcrumbs/breadcrumbs.ts", lineNumber: 18 });
})();

// src/app/components/shared/alert/alert.ts
function Alert_div_0_h3_4_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "h3", 7);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext(2);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(ctx_r0.title);
  }
}
function Alert_div_0_p_5_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "p", 8);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext(2);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(ctx_r0.message);
  }
}
function Alert_div_0_button_6_Template(rf, ctx) {
  if (rf & 1) {
    const _r2 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "button", 9);
    \u0275\u0275listener("click", function Alert_div_0_button_6_Template_button_click_0_listener() {
      \u0275\u0275restoreView(_r2);
      const ctx_r0 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r0.onDismiss());
    });
    \u0275\u0275text(1, " \u2715 ");
    \u0275\u0275elementEnd();
  }
}
function Alert_div_0_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 1)(1, "div", 2);
    \u0275\u0275text(2);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "div", 3);
    \u0275\u0275template(4, Alert_div_0_h3_4_Template, 2, 1, "h3", 4)(5, Alert_div_0_p_5_Template, 2, 1, "p", 5);
    \u0275\u0275elementEnd();
    \u0275\u0275template(6, Alert_div_0_button_6_Template, 2, 0, "button", 6);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext();
    \u0275\u0275classMap(ctx_r0.alertClasses);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(ctx_r0.defaultIcon);
    \u0275\u0275advance(2);
    \u0275\u0275property("ngIf", ctx_r0.title);
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", ctx_r0.message);
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", ctx_r0.dismissible);
  }
}
var Alert = class _Alert {
  type = "info";
  title = "";
  message = "";
  icon = "";
  dismissible = false;
  dismissed = new EventEmitter();
  isVisible = true;
  onDismiss() {
    this.isVisible = false;
    this.dismissed.emit();
  }
  get alertClasses() {
    let classes = "alert";
    classes += ` alert--${this.type}`;
    if (!this.isVisible)
      classes += " alert--hidden";
    return classes;
  }
  get defaultIcon() {
    if (this.icon)
      return this.icon;
    switch (this.type) {
      case "success":
        return "\u2713";
      case "error":
        return "\u2715";
      case "warning":
        return "\u26A0";
      case "info":
        return "\u2139";
      default:
        return "\u2139";
    }
  }
  static \u0275fac = function Alert_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _Alert)();
  };
  static \u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _Alert, selectors: [["app-alert"]], inputs: { type: "type", title: "title", message: "message", icon: "icon", dismissible: "dismissible" }, outputs: { dismissed: "dismissed" }, decls: 1, vars: 1, consts: [["role", "alert", 3, "class", 4, "ngIf"], ["role", "alert"], [1, "alert__icon"], [1, "alert__content"], ["class", "alert__title", 4, "ngIf"], ["class", "alert__message", 4, "ngIf"], ["type", "button", "class", "alert__dismiss", "aria-label", "Cerrar alerta", 3, "click", 4, "ngIf"], [1, "alert__title"], [1, "alert__message"], ["type", "button", "aria-label", "Cerrar alerta", 1, "alert__dismiss", 3, "click"]], template: function Alert_Template(rf, ctx) {
    if (rf & 1) {
      \u0275\u0275template(0, Alert_div_0_Template, 7, 6, "div", 0);
    }
    if (rf & 2) {
      \u0275\u0275property("ngIf", ctx.isVisible);
    }
  }, dependencies: [CommonModule, NgIf], styles: ['@charset "UTF-8";\n\n\n\n.alert[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: flex-start;\n  gap: 1rem;\n  padding: 1rem 2rem;\n  background-color: var(--bg-secondary);\n  border: 3px solid var(--border-color);\n  border-radius: 5px;\n  box-shadow: 4px 4px 0px var(--shadow-color);\n  transition: all 300ms ease-in-out;\n  width: 100%;\n}\n.alert__icon[_ngcontent-%COMP%] {\n  flex-shrink: 0;\n  width: 24px;\n  height: 24px;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  font-size: 19.2px;\n  font-weight: 700;\n  line-height: 1;\n}\n.alert__content[_ngcontent-%COMP%] {\n  flex: 1;\n  display: flex;\n  flex-direction: column;\n  gap: 0.5rem;\n}\n.alert__title[_ngcontent-%COMP%] {\n  font-size: 1rem;\n  font-weight: 700;\n  margin: 0;\n  line-height: 1.2;\n}\n.alert__message[_ngcontent-%COMP%] {\n  font-size: 0.9375rem;\n  margin: 0;\n  line-height: 1.4;\n}\n.alert__dismiss[_ngcontent-%COMP%] {\n  flex-shrink: 0;\n  width: 24px;\n  height: 24px;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  font-size: 19.2px;\n  font-weight: 700;\n  line-height: 1;\n  background: transparent;\n  border: none;\n  cursor: pointer;\n  padding: 0;\n  opacity: 0.7;\n  color: inherit;\n  transition: all 150ms ease-in-out;\n}\n.alert__dismiss[_ngcontent-%COMP%]:hover {\n  opacity: 1;\n  transform: scale(1.1);\n}\n.alert__dismiss[_ngcontent-%COMP%]:focus {\n  outline: 2px solid currentColor;\n  outline-offset: 2px;\n}\n.alert--success[_ngcontent-%COMP%] {\n  background-color: #AAD661;\n  border-color: var(--border-color);\n  color: var(--text-dark);\n  color: var(--text-primary);\n}\n.alert--error[_ngcontent-%COMP%] {\n  background-color: #E04A4A;\n  border-color: var(--border-color);\n  color: var(--text-white);\n}\n.alert--warning[_ngcontent-%COMP%] {\n  background-color: #FFC047;\n  border-color: var(--border-color);\n  color: var(--text-dark);\n  color: var(--text-primary);\n}\n.alert--info[_ngcontent-%COMP%] {\n  background-color: #0A9295;\n  border-color: var(--border-color);\n  color: var(--text-white);\n}\n.alert--hidden[_ngcontent-%COMP%] {\n  opacity: 0;\n  transform: translateY(-10px);\n  pointer-events: none;\n}\n/*# sourceMappingURL=alert.css.map */'] });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(Alert, [{
    type: Component,
    args: [{ selector: "app-alert", standalone: true, imports: [CommonModule], template: '<div *ngIf="isVisible" [class]="alertClasses" role="alert">\r\n  <div class="alert__icon">{{ defaultIcon }}</div>\r\n\r\n  <div class="alert__content">\r\n    <h3 *ngIf="title" class="alert__title">{{ title }}</h3>\r\n    <p *ngIf="message" class="alert__message">{{ message }}</p>\r\n  </div>\r\n\r\n  <button\r\n    *ngIf="dismissible"\r\n    type="button"\r\n    class="alert__dismiss"\r\n    (click)="onDismiss()"\r\n    aria-label="Cerrar alerta"\r\n  >\r\n    \u2715\r\n  </button>\r\n</div>\r\n', styles: ['@charset "UTF-8";\n\n/* src/app/components/shared/alert/alert.scss */\n.alert {\n  display: flex;\n  align-items: flex-start;\n  gap: 1rem;\n  padding: 1rem 2rem;\n  background-color: var(--bg-secondary);\n  border: 3px solid var(--border-color);\n  border-radius: 5px;\n  box-shadow: 4px 4px 0px var(--shadow-color);\n  transition: all 300ms ease-in-out;\n  width: 100%;\n}\n.alert__icon {\n  flex-shrink: 0;\n  width: 24px;\n  height: 24px;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  font-size: 19.2px;\n  font-weight: 700;\n  line-height: 1;\n}\n.alert__content {\n  flex: 1;\n  display: flex;\n  flex-direction: column;\n  gap: 0.5rem;\n}\n.alert__title {\n  font-size: 1rem;\n  font-weight: 700;\n  margin: 0;\n  line-height: 1.2;\n}\n.alert__message {\n  font-size: 0.9375rem;\n  margin: 0;\n  line-height: 1.4;\n}\n.alert__dismiss {\n  flex-shrink: 0;\n  width: 24px;\n  height: 24px;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  font-size: 19.2px;\n  font-weight: 700;\n  line-height: 1;\n  background: transparent;\n  border: none;\n  cursor: pointer;\n  padding: 0;\n  opacity: 0.7;\n  color: inherit;\n  transition: all 150ms ease-in-out;\n}\n.alert__dismiss:hover {\n  opacity: 1;\n  transform: scale(1.1);\n}\n.alert__dismiss:focus {\n  outline: 2px solid currentColor;\n  outline-offset: 2px;\n}\n.alert--success {\n  background-color: #AAD661;\n  border-color: var(--border-color);\n  color: var(--text-dark);\n  color: var(--text-primary);\n}\n.alert--error {\n  background-color: #E04A4A;\n  border-color: var(--border-color);\n  color: var(--text-white);\n}\n.alert--warning {\n  background-color: #FFC047;\n  border-color: var(--border-color);\n  color: var(--text-dark);\n  color: var(--text-primary);\n}\n.alert--info {\n  background-color: #0A9295;\n  border-color: var(--border-color);\n  color: var(--text-white);\n}\n.alert--hidden {\n  opacity: 0;\n  transform: translateY(-10px);\n  pointer-events: none;\n}\n/*# sourceMappingURL=alert.css.map */\n'] }]
  }], null, { type: [{
    type: Input
  }], title: [{
    type: Input
  }], message: [{
    type: Input
  }], icon: [{
    type: Input
  }], dismissible: [{
    type: Input
  }], dismissed: [{
    type: Output
  }] });
})();
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(Alert, { className: "Alert", filePath: "src/app/components/shared/alert/alert.ts", lineNumber: 11 });
})();

// src/app/components/shared/notification/notification.ts
function Notification_Conditional_4_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "h3", 3);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext();
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(ctx_r0.title);
  }
}
function Notification_Conditional_5_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "p", 4);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext();
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(ctx_r0.message);
  }
}
function Notification_Conditional_8_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275element(0, "div", 7);
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext();
    \u0275\u0275classProp("notification__progress--paused", ctx_r0.isPaused());
  }
}
var Notification = class _Notification {
  elementRef;
  /**
   * INPUTS: Configuración de la notificación
   * Estos valores son inyectados por NotificationService con setInput()
   */
  /** Tipo de notificación: determina color e icono */
  type = "info";
  /** Título principal de la notificación */
  title = "";
  /** Mensaje descriptivo */
  message = "";
  /** Icono personalizado (opcional, si no se proporciona usa defaultIcon) */
  icon = "";
  /** Posición en la pantalla */
  position = "top-right";
  /** Si debe cerrarse automáticamente */
  autoDismiss = true;
  /** Duración en ms antes de auto-dismiss */
  duration = 5e3;
  /**
   * Índice de apilado para notificaciones estáticas (usadas en templates)
   * El servicio dinámico NO usa esto - calcula posiciones él mismo
   * -1 significa que no se usa apilado estático
   */
  stackIndex = -1;
  /**
   * Callback para obtener la altura real de esta notificación
   * Usado por el sistema de apilado para cálculos dinámicos
   */
  getHeightAt;
  /**
   * OUTPUT: Evento emitido cuando se cierra la notificación
   * NotificationService se subscribe a este evento para eliminar del DOM
   */
  dismissed = new EventEmitter();
  /**
   * ESTADO INTERNO: Control de visibilidad para animaciones
   * Signal moderno de Angular para reactividad
   */
  isVisible = signal(false, ...ngDevMode ? [{ debugName: "isVisible" }] : []);
  /**
   * ESTADO INTERNO: Control de pausa del timer
   * True cuando el mouse está sobre la notificación
   */
  isPaused = signal(false, ...ngDevMode ? [{ debugName: "isPaused" }] : []);
  /**
   * Altura real del elemento (medida después del render)
   */
  measuredHeight = 0;
  /**
   * TIMER: ID del timeout para auto-dismiss
   * Lo guardamos para poder cancelarlo si se cierra manualmente
   */
  timeoutId;
  /**
   * TIMER: Tiempo restante en ms
   * Se usa para reanudar el timer después de pausar
   */
  remainingTime = 0;
  /**
   * TIMER: Timestamp cuando se pausa
   * Se usa para calcular el tiempo transcurrido
   */
  pausedAt = 0;
  constructor(elementRef) {
    this.elementRef = elementRef;
  }
  /**
   * LIFECYCLE: Después de que la vista se renderice
   * Medimos la altura real del elemento
   */
  ngAfterViewInit() {
    const notificationEl = this.elementRef.nativeElement.querySelector(".notification");
    if (notificationEl) {
      this.measuredHeight = notificationEl.getBoundingClientRect().height;
    }
  }
  /**
   * Obtener la altura medida del elemento
   */
  getHeight() {
    return this.measuredHeight || 92;
  }
  /**
   * LIFECYCLE: Inicialización del componente
   *
   * WORKFLOW:
   * 1. Espera 10ms y activa animación de entrada (isVisible = true)
   * 2. Si autoDismiss está activado, configura timer
   * 3. Cuando expira el timer, llama a onDismiss()
   */
  ngOnInit() {
    setTimeout(() => {
      this.isVisible.set(true);
    }, 10);
    this.remainingTime = this.duration;
    if (this.autoDismiss && this.duration > 0) {
      this.startTimer();
    }
  }
  /**
   * LIFECYCLE: Limpieza del componente
   * Cancela el timer si existe para evitar memory leaks
   */
  ngOnDestroy() {
    if (this.timeoutId) {
      clearTimeout(this.timeoutId);
    }
  }
  /**
   * HANDLER: Cerrar notificación
   *
   * WORKFLOW:
   * 1. Desactiva visibilidad para animación de salida
   * 2. Espera 300ms (duración de la animación CSS)
   * 3. Emite evento dismissed
   * 4. Cancela timer si existe
   * 5. NotificationService recibe el evento y elimina del DOM
   *
   * Puede ser llamado por:
   * - Click del usuario en el botón ✕
   * - Timer de auto-dismiss
   */
  onDismiss() {
    this.isVisible.set(false);
    setTimeout(() => {
      this.dismissed.emit();
      if (this.timeoutId) {
        clearTimeout(this.timeoutId);
      }
    }, 300);
  }
  /**
   * COMPUTED: Clases CSS dinámicas
   * Genera string de clases según el estado del componente
   *
   * @returns String con todas las clases CSS
   *
   * @example
   * "notification notification--success notification--top-right notification--visible"
   */
  get notificationClasses() {
    let classes = "notification";
    classes += ` notification--${this.type}`;
    classes += ` notification--${this.position}`;
    if (this.isVisible()) {
      classes += " notification--visible";
    }
    return classes;
  }
  /**
   * COMPUTED: Estilos inline para posicionamiento de apilado estático
   * Solo se aplica si stackIndex >= 0 (notificaciones en template)
   * Las notificaciones dinámicas (servicio) no usan esto
   *
   * @returns Objeto de estilos para [ngStyle]
   */
  get stackStyles() {
    if (this.stackIndex < 0) {
      return {};
    }
    const INITIAL_OFFSET = 20;
    const GAP = 12;
    let offset = INITIAL_OFFSET;
    if (this.getHeightAt) {
      for (let i = 0; i < this.stackIndex; i++) {
        offset += this.getHeightAt(i) + GAP;
      }
    } else {
      const ESTIMATED_HEIGHT = 92;
      offset = INITIAL_OFFSET + this.stackIndex * (ESTIMATED_HEIGHT + GAP);
    }
    if (this.position.startsWith("top")) {
      return { "top": `${offset}px` };
    } else {
      return { "bottom": `${offset}px` };
    }
  }
  /**
   * COMPUTED: Icono por defecto según tipo
   * Si no se proporciona icono personalizado, usa estos
   *
   * @returns Emoji/símbolo para mostrar
   */
  get defaultIcon() {
    if (this.icon) {
      return this.icon;
    }
    switch (this.type) {
      case "success":
        return "\u2713";
      // Check mark
      case "error":
        return "\u2715";
      // X mark
      case "warning":
        return "\u26A0";
      // Warning triangle
      case "info":
        return "\u2139";
      // Info symbol
      default:
        return "\u2139";
    }
  }
  /**
   * MÉTODO PRIVADO: Iniciar timer de auto-dismiss
   */
  startTimer() {
    this.timeoutId = window.setTimeout(() => {
      this.onDismiss();
    }, this.remainingTime);
  }
  /**
   * MÉTODO PRIVADO: Pausar timer
   * Guarda el tiempo restante para poder reanudar después
   */
  pauseTimer() {
    if (this.timeoutId) {
      clearTimeout(this.timeoutId);
      this.timeoutId = void 0;
      this.pausedAt = Date.now();
    }
  }
  /**
   * MÉTODO PRIVADO: Reanudar timer
   * Calcula el tiempo que pasó desde la pausa y ajusta remainingTime
   */
  resumeTimer() {
    if (this.pausedAt > 0) {
      const elapsed = Date.now() - this.pausedAt;
      this.remainingTime = Math.max(0, this.remainingTime - elapsed);
      this.pausedAt = 0;
      if (this.remainingTime > 0) {
        this.startTimer();
      }
    }
  }
  /**
   * HANDLER: Mouse entra en la notificación
   * Pausa el timer de auto-dismiss
   */
  onMouseEnter() {
    if (this.autoDismiss) {
      this.isPaused.set(true);
      this.pauseTimer();
    }
  }
  /**
   * HANDLER: Mouse sale de la notificación
   * Reanuda el timer de auto-dismiss
   */
  onMouseLeave() {
    if (this.autoDismiss) {
      this.isPaused.set(false);
      this.resumeTimer();
    }
  }
  static \u0275fac = function Notification_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _Notification)(\u0275\u0275directiveInject(ElementRef));
  };
  static \u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _Notification, selectors: [["app-notification"]], inputs: { type: "type", title: "title", message: "message", icon: "icon", position: "position", autoDismiss: "autoDismiss", duration: "duration", stackIndex: "stackIndex", getHeightAt: "getHeightAt" }, outputs: { dismissed: "dismissed" }, decls: 9, vars: 7, consts: [["role", "alert", 3, "mouseenter", "mouseleave", "ngStyle"], [1, "notification__icon"], [1, "notification__content"], [1, "notification__title"], [1, "notification__message"], ["type", "button", "aria-label", "Cerrar notificaci\xF3n", 1, "notification__dismiss", 3, "click"], [1, "notification__progress", 3, "notification__progress--paused"], [1, "notification__progress"]], template: function Notification_Template(rf, ctx) {
    if (rf & 1) {
      \u0275\u0275elementStart(0, "div", 0);
      \u0275\u0275listener("mouseenter", function Notification_Template_div_mouseenter_0_listener() {
        return ctx.onMouseEnter();
      })("mouseleave", function Notification_Template_div_mouseleave_0_listener() {
        return ctx.onMouseLeave();
      });
      \u0275\u0275elementStart(1, "div", 1);
      \u0275\u0275text(2);
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(3, "div", 2);
      \u0275\u0275conditionalCreate(4, Notification_Conditional_4_Template, 2, 1, "h3", 3);
      \u0275\u0275conditionalCreate(5, Notification_Conditional_5_Template, 2, 1, "p", 4);
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(6, "button", 5);
      \u0275\u0275listener("click", function Notification_Template_button_click_6_listener() {
        return ctx.onDismiss();
      });
      \u0275\u0275text(7, " \u2715 ");
      \u0275\u0275elementEnd();
      \u0275\u0275conditionalCreate(8, Notification_Conditional_8_Template, 1, 2, "div", 6);
      \u0275\u0275elementEnd();
    }
    if (rf & 2) {
      \u0275\u0275classMap(ctx.notificationClasses);
      \u0275\u0275property("ngStyle", ctx.stackStyles);
      \u0275\u0275advance(2);
      \u0275\u0275textInterpolate(ctx.defaultIcon);
      \u0275\u0275advance(2);
      \u0275\u0275conditional(ctx.title ? 4 : -1);
      \u0275\u0275advance();
      \u0275\u0275conditional(ctx.message ? 5 : -1);
      \u0275\u0275advance(3);
      \u0275\u0275conditional(ctx.autoDismiss && ctx.duration > 0 ? 8 : -1);
    }
  }, dependencies: [CommonModule, NgStyle], styles: ['@charset "UTF-8";\n\n\n\n.notification[_ngcontent-%COMP%] {\n  position: fixed;\n  z-index: 9;\n  display: flex;\n  align-items: flex-start;\n  gap: 1rem;\n  padding: 1rem 2rem;\n  border: 3px solid var(--border-color);\n  border-radius: 5px;\n  box-shadow: 6px 6px 0px var(--shadow-color);\n  min-width: 300px;\n  max-width: 400px;\n  min-height: 60px;\n  margin: 0;\n  opacity: 0;\n  transform: translateX(100%);\n  transition: all 300ms ease-in-out;\n}\n@media (max-width: 767px) {\n  .notification[_ngcontent-%COMP%] {\n    min-width: 280px;\n    max-width: calc(100vw - 2rem);\n  }\n}\n.notification__icon[_ngcontent-%COMP%] {\n  flex-shrink: 0;\n  width: 24px;\n  height: 24px;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  font-size: 19.2px;\n  font-weight: 700;\n  line-height: 1;\n}\n.notification__content[_ngcontent-%COMP%] {\n  flex: 1;\n  display: flex;\n  flex-direction: column;\n  gap: 0.5rem;\n}\n.notification__title[_ngcontent-%COMP%] {\n  font-size: 1rem;\n  font-weight: 700;\n  margin: 0;\n  line-height: 1.2;\n}\n.notification__message[_ngcontent-%COMP%] {\n  font-size: 0.9375rem;\n  margin: 0;\n  line-height: 1.4;\n}\n.notification__dismiss[_ngcontent-%COMP%] {\n  flex-shrink: 0;\n  width: 24px;\n  height: 24px;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  font-size: 19.2px;\n  font-weight: 700;\n  line-height: 1;\n  background: transparent;\n  border: none;\n  cursor: pointer;\n  padding: 0;\n  opacity: 0.7;\n  color: inherit;\n  transition: all 150ms ease-in-out;\n  opacity: 0.8;\n}\n.notification__dismiss[_ngcontent-%COMP%]:hover {\n  opacity: 1;\n  transform: scale(1.1);\n}\n.notification__dismiss[_ngcontent-%COMP%]:focus {\n  outline: 2px solid currentColor;\n  outline-offset: 2px;\n}\n.notification--top-right[_ngcontent-%COMP%] {\n  top: 20px;\n  right: 20px;\n  left: auto;\n  bottom: auto;\n}\n.notification--top-left[_ngcontent-%COMP%] {\n  top: 20px;\n  left: 20px;\n  right: auto;\n  bottom: auto;\n  transform: translateX(-100%);\n}\n.notification--bottom-right[_ngcontent-%COMP%] {\n  bottom: 20px;\n  right: 20px;\n  left: auto;\n  top: auto;\n}\n.notification--bottom-left[_ngcontent-%COMP%] {\n  bottom: 20px;\n  left: 20px;\n  right: auto;\n  top: auto;\n  transform: translateX(-100%);\n}\n.notification--visible[_ngcontent-%COMP%] {\n  opacity: 1;\n  transform: translateX(0);\n}\n.notification--success[_ngcontent-%COMP%] {\n  background-color: #AAD661;\n  border-color: var(--border-color);\n  color: var(--text-dark);\n}\n.notification--error[_ngcontent-%COMP%] {\n  background-color: #E04A4A;\n  border-color: var(--border-color);\n  color: var(--text-white);\n}\n.notification--warning[_ngcontent-%COMP%] {\n  background-color: #FFC047;\n  border-color: var(--border-color);\n  color: var(--text-dark);\n}\n.notification--info[_ngcontent-%COMP%] {\n  background-color: #0A9295;\n  border-color: var(--border-color);\n  color: var(--text-white);\n}\n.notification__progress[_ngcontent-%COMP%] {\n  position: absolute;\n  bottom: 0;\n  left: 0;\n  height: 4px;\n  width: 100%;\n  background-color: currentColor;\n  opacity: 0.3;\n  transform-origin: left;\n  animation: _ngcontent-%COMP%_notification-progress var(--notification-duration, 5000ms) linear forwards;\n}\n.notification__progress--paused[_ngcontent-%COMP%] {\n  animation-play-state: paused;\n}\n@keyframes _ngcontent-%COMP%_notification-progress {\n  from {\n    transform: scaleX(1);\n  }\n  to {\n    transform: scaleX(0);\n  }\n}\n/*# sourceMappingURL=notification.css.map */'] });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(Notification, [{
    type: Component,
    args: [{ selector: "app-notification", standalone: true, imports: [CommonModule], template: '<div [class]="notificationClasses" [ngStyle]="stackStyles" role="alert" (mouseenter)="onMouseEnter()" (mouseleave)="onMouseLeave()">\n  <div class="notification__icon">{{ defaultIcon }}</div>\n\n  <div class="notification__content">\n    @if (title) {\n    <h3 class="notification__title">{{ title }}</h3>\n    }\n    @if (message) {\n    <p class="notification__message">{{ message }}</p>\n    }\n  </div>\n\n  <button\n    type="button"\n    class="notification__dismiss"\n    (click)="onDismiss()"\n    aria-label="Cerrar notificaci\xF3n"\n  >\n    \u2715\n  </button>\n\n  @if (autoDismiss && duration > 0) {\n  <div class="notification__progress" [class.notification__progress--paused]="isPaused()"></div>\n  }\n</div>\n', styles: ['@charset "UTF-8";\n\n/* src/app/components/shared/notification/notification.scss */\n.notification {\n  position: fixed;\n  z-index: 9;\n  display: flex;\n  align-items: flex-start;\n  gap: 1rem;\n  padding: 1rem 2rem;\n  border: 3px solid var(--border-color);\n  border-radius: 5px;\n  box-shadow: 6px 6px 0px var(--shadow-color);\n  min-width: 300px;\n  max-width: 400px;\n  min-height: 60px;\n  margin: 0;\n  opacity: 0;\n  transform: translateX(100%);\n  transition: all 300ms ease-in-out;\n}\n@media (max-width: 767px) {\n  .notification {\n    min-width: 280px;\n    max-width: calc(100vw - 2rem);\n  }\n}\n.notification__icon {\n  flex-shrink: 0;\n  width: 24px;\n  height: 24px;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  font-size: 19.2px;\n  font-weight: 700;\n  line-height: 1;\n}\n.notification__content {\n  flex: 1;\n  display: flex;\n  flex-direction: column;\n  gap: 0.5rem;\n}\n.notification__title {\n  font-size: 1rem;\n  font-weight: 700;\n  margin: 0;\n  line-height: 1.2;\n}\n.notification__message {\n  font-size: 0.9375rem;\n  margin: 0;\n  line-height: 1.4;\n}\n.notification__dismiss {\n  flex-shrink: 0;\n  width: 24px;\n  height: 24px;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  font-size: 19.2px;\n  font-weight: 700;\n  line-height: 1;\n  background: transparent;\n  border: none;\n  cursor: pointer;\n  padding: 0;\n  opacity: 0.7;\n  color: inherit;\n  transition: all 150ms ease-in-out;\n  opacity: 0.8;\n}\n.notification__dismiss:hover {\n  opacity: 1;\n  transform: scale(1.1);\n}\n.notification__dismiss:focus {\n  outline: 2px solid currentColor;\n  outline-offset: 2px;\n}\n.notification--top-right {\n  top: 20px;\n  right: 20px;\n  left: auto;\n  bottom: auto;\n}\n.notification--top-left {\n  top: 20px;\n  left: 20px;\n  right: auto;\n  bottom: auto;\n  transform: translateX(-100%);\n}\n.notification--bottom-right {\n  bottom: 20px;\n  right: 20px;\n  left: auto;\n  top: auto;\n}\n.notification--bottom-left {\n  bottom: 20px;\n  left: 20px;\n  right: auto;\n  top: auto;\n  transform: translateX(-100%);\n}\n.notification--visible {\n  opacity: 1;\n  transform: translateX(0);\n}\n.notification--success {\n  background-color: #AAD661;\n  border-color: var(--border-color);\n  color: var(--text-dark);\n}\n.notification--error {\n  background-color: #E04A4A;\n  border-color: var(--border-color);\n  color: var(--text-white);\n}\n.notification--warning {\n  background-color: #FFC047;\n  border-color: var(--border-color);\n  color: var(--text-dark);\n}\n.notification--info {\n  background-color: #0A9295;\n  border-color: var(--border-color);\n  color: var(--text-white);\n}\n.notification__progress {\n  position: absolute;\n  bottom: 0;\n  left: 0;\n  height: 4px;\n  width: 100%;\n  background-color: currentColor;\n  opacity: 0.3;\n  transform-origin: left;\n  animation: notification-progress var(--notification-duration, 5000ms) linear forwards;\n}\n.notification__progress--paused {\n  animation-play-state: paused;\n}\n@keyframes notification-progress {\n  from {\n    transform: scaleX(1);\n  }\n  to {\n    transform: scaleX(0);\n  }\n}\n/*# sourceMappingURL=notification.css.map */\n'] }]
  }], () => [{ type: ElementRef }], { type: [{
    type: Input
  }], title: [{
    type: Input
  }], message: [{
    type: Input
  }], icon: [{
    type: Input
  }], position: [{
    type: Input
  }], autoDismiss: [{
    type: Input
  }], duration: [{
    type: Input
  }], stackIndex: [{
    type: Input
  }], getHeightAt: [{
    type: Input
  }], dismissed: [{
    type: Output
  }] });
})();
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(Notification, { className: "Notification", filePath: "src/app/components/shared/notification/notification.ts", lineNumber: 58 });
})();

// src/app/components/shared/carousel/carousel.ts
var _c03 = ["carouselTrack"];
var _c1 = ["*"];
function Carousel_Conditional_1_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275domElementStart(0, "h2", 2);
    \u0275\u0275text(1);
    \u0275\u0275domElementEnd();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext();
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(ctx_r0.title);
  }
}
function Carousel_Conditional_3_Template(rf, ctx) {
  if (rf & 1) {
    const _r2 = \u0275\u0275getCurrentView();
    \u0275\u0275domElementStart(0, "button", 7);
    \u0275\u0275domListener("click", function Carousel_Conditional_3_Template_button_click_0_listener() {
      \u0275\u0275restoreView(_r2);
      const ctx_r0 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r0.scrollLeft());
    });
    \u0275\u0275text(1, " \u2039 ");
    \u0275\u0275domElementEnd();
  }
}
function Carousel_Conditional_7_Template(rf, ctx) {
  if (rf & 1) {
    const _r3 = \u0275\u0275getCurrentView();
    \u0275\u0275domElementStart(0, "button", 8);
    \u0275\u0275domListener("click", function Carousel_Conditional_7_Template_button_click_0_listener() {
      \u0275\u0275restoreView(_r3);
      const ctx_r0 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r0.scrollRight());
    });
    \u0275\u0275text(1, " \u203A ");
    \u0275\u0275domElementEnd();
  }
}
var Carousel = class _Carousel {
  title = "";
  itemsToShow = 4;
  // Cuántas cards mostrar a la vez
  carouselTrack;
  currentIndex = 0;
  canScrollLeft = false;
  canScrollRight = true;
  ngAfterViewInit() {
    setTimeout(() => {
      this.updateScrollButtons();
    }, 300);
    if (typeof window !== "undefined") {
      window.addEventListener("resize", () => this.updateScrollButtons());
    }
  }
  scrollLeft() {
    const track = this.carouselTrack.nativeElement;
    const scrollAmount = track.offsetWidth / this.itemsToShow;
    track.scrollBy({
      left: -scrollAmount,
      behavior: "smooth"
    });
    setTimeout(() => {
      this.updateScrollButtons();
    }, 300);
  }
  scrollRight() {
    const track = this.carouselTrack.nativeElement;
    const scrollAmount = track.offsetWidth / this.itemsToShow;
    track.scrollBy({
      left: scrollAmount,
      behavior: "smooth"
    });
    setTimeout(() => {
      this.updateScrollButtons();
    }, 300);
  }
  updateScrollButtons() {
    if (!this.carouselTrack)
      return;
    const track = this.carouselTrack.nativeElement;
    this.canScrollLeft = track.scrollLeft > 10;
    const maxScroll = track.scrollWidth - track.clientWidth;
    this.canScrollRight = track.scrollLeft < maxScroll - 10;
  }
  /**
   * MANIPULACIÓN DOM AVANZADA: Modificar estilos dinámicamente
   * Añade un efecto de highlight al track del carousel
   */
  toggleHighlight() {
    if (!this.carouselTrack)
      return;
    const track = this.carouselTrack.nativeElement;
    if (track.style.boxShadow === "") {
      track.style.boxShadow = "0 0 20px rgba(255, 215, 0, 0.6)";
      track.style.border = "2px solid gold";
      track.style.transition = "all 0.3s ease";
    } else {
      track.style.boxShadow = "";
      track.style.border = "";
    }
  }
  /**
   * MANIPULACIÓN DOM: Cambiar opacidad dinámicamente
   */
  setOpacity(value) {
    if (!this.carouselTrack)
      return;
    this.carouselTrack.nativeElement.style.opacity = value.toString();
    this.carouselTrack.nativeElement.style.transition = "opacity 0.3s ease";
  }
  static \u0275fac = function Carousel_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _Carousel)();
  };
  static \u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _Carousel, selectors: [["app-carousel"]], viewQuery: function Carousel_Query(rf, ctx) {
    if (rf & 1) {
      \u0275\u0275viewQuery(_c03, 5);
    }
    if (rf & 2) {
      let _t;
      \u0275\u0275queryRefresh(_t = \u0275\u0275loadQuery()) && (ctx.carouselTrack = _t.first);
    }
  }, inputs: { title: "title", itemsToShow: "itemsToShow" }, ngContentSelectors: _c1, decls: 8, vars: 3, consts: [["carouselTrack", ""], [1, "carousel"], [1, "carousel__title"], [1, "carousel__container"], ["type", "button", "aria-label", "Ver items anteriores", 1, "carousel__nav", "carousel__nav--prev"], [1, "carousel__track"], ["type", "button", "aria-label", "Ver items siguientes", 1, "carousel__nav", "carousel__nav--next"], ["type", "button", "aria-label", "Ver items anteriores", 1, "carousel__nav", "carousel__nav--prev", 3, "click"], ["type", "button", "aria-label", "Ver items siguientes", 1, "carousel__nav", "carousel__nav--next", 3, "click"]], template: function Carousel_Template(rf, ctx) {
    if (rf & 1) {
      \u0275\u0275projectionDef();
      \u0275\u0275domElementStart(0, "div", 1);
      \u0275\u0275conditionalCreate(1, Carousel_Conditional_1_Template, 2, 1, "h2", 2);
      \u0275\u0275domElementStart(2, "div", 3);
      \u0275\u0275conditionalCreate(3, Carousel_Conditional_3_Template, 2, 0, "button", 4);
      \u0275\u0275domElementStart(4, "div", 5, 0);
      \u0275\u0275projection(6);
      \u0275\u0275domElementEnd();
      \u0275\u0275conditionalCreate(7, Carousel_Conditional_7_Template, 2, 0, "button", 6);
      \u0275\u0275domElementEnd()();
    }
    if (rf & 2) {
      \u0275\u0275advance();
      \u0275\u0275conditional(ctx.title ? 1 : -1);
      \u0275\u0275advance(2);
      \u0275\u0275conditional(ctx.canScrollLeft ? 3 : -1);
      \u0275\u0275advance(4);
      \u0275\u0275conditional(ctx.canScrollRight ? 7 : -1);
    }
  }, styles: ['@charset "UTF-8";\n\n\n\n[_nghost-%COMP%] {\n  display: block;\n  width: 100%;\n  max-width: 100%;\n  min-width: 0;\n}\n.carousel[_ngcontent-%COMP%] {\n  width: 100%;\n  max-width: 100%;\n  min-width: 0;\n  box-sizing: border-box;\n  margin-bottom: 4rem;\n  background-color: var(--bg-secondary);\n  border: 4px solid var(--border-color);\n  border-radius: 8px;\n  box-shadow: 6px 6px 0px var(--shadow-color);\n  padding: 3rem;\n}\n@media (max-width: 767px) {\n  .carousel[_ngcontent-%COMP%] {\n    padding: 2rem;\n  }\n}\n@media (min-width: 768px) and (max-width: 1023px) {\n  .carousel[_ngcontent-%COMP%] {\n    padding: 2rem;\n  }\n}\n.carousel__title[_ngcontent-%COMP%] {\n  font-family: "Monoton", cursive;\n  font-size: 2.5rem;\n  font-weight: 400;\n  text-transform: uppercase;\n  letter-spacing: 0.05em;\n  letter-spacing: 0.1em;\n  margin: 0 0 2rem 0;\n  color: var(--text-primary);\n  text-shadow: 3px 3px 0px var(--color-primary), 6px 6px 0px var(--color-secondary);\n  padding-bottom: 1rem;\n}\n@media (max-width: 767px) {\n  .carousel__title[_ngcontent-%COMP%] {\n    font-size: 1.5rem;\n    text-shadow: 2px 2px 0px var(--color-primary);\n  }\n}\n@media (min-width: 768px) and (max-width: 1023px) {\n  .carousel__title[_ngcontent-%COMP%] {\n    font-size: 2rem;\n    text-shadow: 2px 2px 0px var(--color-primary), 4px 4px 0px var(--color-secondary);\n  }\n}\n.carousel__container[_ngcontent-%COMP%] {\n  position: relative;\n  width: 100%;\n  overflow: visible;\n}\n@media (max-width: 767px) {\n  .carousel__container[_ngcontent-%COMP%] {\n    overflow: visible;\n  }\n}\n.carousel__track[_ngcontent-%COMP%] {\n  width: 100%;\n  display: flex;\n  flex-direction: row;\n  gap: 1rem;\n  overflow-x: auto;\n  overflow-y: visible;\n  scroll-behavior: smooth;\n  min-height: 280px;\n  padding: 1rem 0.5rem 3rem 0.5rem;\n  scrollbar-width: none;\n  -ms-overflow-style: none;\n  align-items: flex-start;\n}\n.carousel__track[_ngcontent-%COMP%]::-webkit-scrollbar {\n  display: none;\n}\n@media (min-width: 768px) and (max-width: 1023px) {\n  .carousel__track[_ngcontent-%COMP%] {\n    gap: 0.5rem;\n    padding: 0.5rem 0.5rem 2rem 0.5rem;\n    min-height: 250px;\n  }\n}\n@media (max-width: 767px) {\n  .carousel__track[_ngcontent-%COMP%] {\n    gap: 0.5rem;\n    padding: 0.5rem 0.5rem 1rem 0.5rem;\n    min-height: 230px;\n  }\n}\n.carousel__track[_ngcontent-%COMP%]    > *[_ngcontent-%COMP%] {\n  flex: 0 0 200px;\n  width: 200px;\n  min-width: 200px;\n  max-width: 200px;\n}\n@media (min-width: 768px) and (max-width: 1023px) {\n  .carousel__track[_ngcontent-%COMP%]    > *[_ngcontent-%COMP%] {\n    flex: 0 0 170px;\n    width: 170px;\n    min-width: 170px;\n    max-width: 170px;\n  }\n}\n@media (max-width: 767px) {\n  .carousel__track[_ngcontent-%COMP%]    > *[_ngcontent-%COMP%] {\n    flex: 0 0 150px;\n    width: 150px;\n    min-width: 150px;\n    max-width: 150px;\n  }\n}\n.carousel__nav[_ngcontent-%COMP%] {\n  position: absolute;\n  top: 50%;\n  transform: translateY(-50%);\n  width: 48px;\n  height: 48px;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  background-color: var(--bg-primary);\n  border: 3px solid var(--border-color);\n  border-radius: 5px;\n  box-shadow: 4px 4px 0px var(--shadow-color);\n  cursor: pointer;\n  font-size: 2rem;\n  font-weight: 700;\n  line-height: 1;\n  color: var(--text-primary);\n  transition: all 150ms ease-in-out;\n  z-index: 1;\n}\n.carousel__nav[_ngcontent-%COMP%]:hover {\n  background-color: var(--color-primary);\n  transform: translateY(-50%) translateY(-2px);\n  box-shadow: 6px 6px 0px var(--shadow-color);\n}\n.carousel__nav[_ngcontent-%COMP%]:active {\n  transform: translateY(-50%) translateY(0);\n  box-shadow: 2px 2px 0px var(--shadow-color);\n}\n.carousel__nav[_ngcontent-%COMP%]:focus-visible {\n  outline: 3px solid var(--border-color);\n  outline-offset: 2px;\n}\n.carousel__nav--prev[_ngcontent-%COMP%] {\n  left: 0.5rem;\n}\n.carousel__nav--next[_ngcontent-%COMP%] {\n  right: 0.5rem;\n}\n@media (min-width: 768px) and (max-width: 1023px) {\n  .carousel__nav[_ngcontent-%COMP%] {\n    width: 44px;\n    height: 44px;\n    font-size: 1.75rem;\n  }\n}\n@media (max-width: 767px) {\n  .carousel__nav[_ngcontent-%COMP%] {\n    width: 40px;\n    height: 40px;\n    font-size: 1.5rem;\n  }\n}\n/*# sourceMappingURL=carousel.css.map */'] });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(Carousel, [{
    type: Component,
    args: [{ selector: "app-carousel", standalone: true, imports: [], template: '<div class="carousel">\r\n  <!-- T\xEDtulo del carrusel -->\r\n  @if (title) {\r\n    <h2 class="carousel__title">{{ title }}</h2>\r\n  }\r\n\r\n  <!-- Contenedor del carrusel con navegaci\xF3n -->\r\n  <div class="carousel__container">\r\n    <!-- Bot\xF3n anterior -->\r\n    @if (canScrollLeft) {\r\n      <button\r\n        type="button"\r\n        class="carousel__nav carousel__nav--prev"\r\n        (click)="scrollLeft()"\r\n        aria-label="Ver items anteriores"\r\n      >\r\n        \u2039\r\n      </button>\r\n    }\r\n\r\n    <!-- Track de items -->\r\n    <div class="carousel__track" #carouselTrack>\r\n      <ng-content></ng-content>\r\n    </div>\r\n\r\n    <!-- Bot\xF3n siguiente -->\r\n    @if (canScrollRight) {\r\n      <button\r\n        type="button"\r\n        class="carousel__nav carousel__nav--next"\r\n        (click)="scrollRight()"\r\n        aria-label="Ver items siguientes"\r\n      >\r\n        \u203A\r\n      </button>\r\n    }\r\n  </div>\r\n</div>\r\n', styles: ['@charset "UTF-8";\n\n/* src/app/components/shared/carousel/carousel.scss */\n:host {\n  display: block;\n  width: 100%;\n  max-width: 100%;\n  min-width: 0;\n}\n.carousel {\n  width: 100%;\n  max-width: 100%;\n  min-width: 0;\n  box-sizing: border-box;\n  margin-bottom: 4rem;\n  background-color: var(--bg-secondary);\n  border: 4px solid var(--border-color);\n  border-radius: 8px;\n  box-shadow: 6px 6px 0px var(--shadow-color);\n  padding: 3rem;\n}\n@media (max-width: 767px) {\n  .carousel {\n    padding: 2rem;\n  }\n}\n@media (min-width: 768px) and (max-width: 1023px) {\n  .carousel {\n    padding: 2rem;\n  }\n}\n.carousel__title {\n  font-family: "Monoton", cursive;\n  font-size: 2.5rem;\n  font-weight: 400;\n  text-transform: uppercase;\n  letter-spacing: 0.05em;\n  letter-spacing: 0.1em;\n  margin: 0 0 2rem 0;\n  color: var(--text-primary);\n  text-shadow: 3px 3px 0px var(--color-primary), 6px 6px 0px var(--color-secondary);\n  padding-bottom: 1rem;\n}\n@media (max-width: 767px) {\n  .carousel__title {\n    font-size: 1.5rem;\n    text-shadow: 2px 2px 0px var(--color-primary);\n  }\n}\n@media (min-width: 768px) and (max-width: 1023px) {\n  .carousel__title {\n    font-size: 2rem;\n    text-shadow: 2px 2px 0px var(--color-primary), 4px 4px 0px var(--color-secondary);\n  }\n}\n.carousel__container {\n  position: relative;\n  width: 100%;\n  overflow: visible;\n}\n@media (max-width: 767px) {\n  .carousel__container {\n    overflow: visible;\n  }\n}\n.carousel__track {\n  width: 100%;\n  display: flex;\n  flex-direction: row;\n  gap: 1rem;\n  overflow-x: auto;\n  overflow-y: visible;\n  scroll-behavior: smooth;\n  min-height: 280px;\n  padding: 1rem 0.5rem 3rem 0.5rem;\n  scrollbar-width: none;\n  -ms-overflow-style: none;\n  align-items: flex-start;\n}\n.carousel__track::-webkit-scrollbar {\n  display: none;\n}\n@media (min-width: 768px) and (max-width: 1023px) {\n  .carousel__track {\n    gap: 0.5rem;\n    padding: 0.5rem 0.5rem 2rem 0.5rem;\n    min-height: 250px;\n  }\n}\n@media (max-width: 767px) {\n  .carousel__track {\n    gap: 0.5rem;\n    padding: 0.5rem 0.5rem 1rem 0.5rem;\n    min-height: 230px;\n  }\n}\n.carousel__track > * {\n  flex: 0 0 200px;\n  width: 200px;\n  min-width: 200px;\n  max-width: 200px;\n}\n@media (min-width: 768px) and (max-width: 1023px) {\n  .carousel__track > * {\n    flex: 0 0 170px;\n    width: 170px;\n    min-width: 170px;\n    max-width: 170px;\n  }\n}\n@media (max-width: 767px) {\n  .carousel__track > * {\n    flex: 0 0 150px;\n    width: 150px;\n    min-width: 150px;\n    max-width: 150px;\n  }\n}\n.carousel__nav {\n  position: absolute;\n  top: 50%;\n  transform: translateY(-50%);\n  width: 48px;\n  height: 48px;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  background-color: var(--bg-primary);\n  border: 3px solid var(--border-color);\n  border-radius: 5px;\n  box-shadow: 4px 4px 0px var(--shadow-color);\n  cursor: pointer;\n  font-size: 2rem;\n  font-weight: 700;\n  line-height: 1;\n  color: var(--text-primary);\n  transition: all 150ms ease-in-out;\n  z-index: 1;\n}\n.carousel__nav:hover {\n  background-color: var(--color-primary);\n  transform: translateY(-50%) translateY(-2px);\n  box-shadow: 6px 6px 0px var(--shadow-color);\n}\n.carousel__nav:active {\n  transform: translateY(-50%) translateY(0);\n  box-shadow: 2px 2px 0px var(--shadow-color);\n}\n.carousel__nav:focus-visible {\n  outline: 3px solid var(--border-color);\n  outline-offset: 2px;\n}\n.carousel__nav--prev {\n  left: 0.5rem;\n}\n.carousel__nav--next {\n  right: 0.5rem;\n}\n@media (min-width: 768px) and (max-width: 1023px) {\n  .carousel__nav {\n    width: 44px;\n    height: 44px;\n    font-size: 1.75rem;\n  }\n}\n@media (max-width: 767px) {\n  .carousel__nav {\n    width: 40px;\n    height: 40px;\n    font-size: 1.5rem;\n  }\n}\n/*# sourceMappingURL=carousel.css.map */\n'] }]
  }], null, { title: [{
    type: Input
  }], itemsToShow: [{
    type: Input
  }], carouselTrack: [{
    type: ViewChild,
    args: ["carouselTrack"]
  }] });
})();
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(Carousel, { className: "Carousel", filePath: "src/app/components/shared/carousel/carousel.ts", lineNumber: 10 });
})();

// src/app/components/shared/accordion/accordion.ts
function Accordion_div_1_Template(rf, ctx) {
  if (rf & 1) {
    const _r1 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 2)(1, "button", 3);
    \u0275\u0275listener("click", function Accordion_div_1_Template_button_click_1_listener() {
      const item_r2 = \u0275\u0275restoreView(_r1).$implicit;
      const ctx_r2 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r2.toggle(item_r2.id));
    });
    \u0275\u0275elementStart(2, "span", 4);
    \u0275\u0275text(3);
    \u0275\u0275elementEnd();
    \u0275\u0275namespaceSVG();
    \u0275\u0275elementStart(4, "svg", 5);
    \u0275\u0275element(5, "polyline", 6);
    \u0275\u0275elementEnd()();
    \u0275\u0275namespaceHTML();
    \u0275\u0275elementStart(6, "div", 7)(7, "div", 8);
    \u0275\u0275text(8);
    \u0275\u0275elementEnd()()();
  }
  if (rf & 2) {
    const item_r2 = ctx.$implicit;
    const ctx_r2 = \u0275\u0275nextContext();
    \u0275\u0275classProp("accordion__item--open", ctx_r2.isOpen(item_r2.id));
    \u0275\u0275advance();
    \u0275\u0275attribute("aria-expanded", ctx_r2.isOpen(item_r2.id))("aria-controls", "accordion-content-" + item_r2.id);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(item_r2.title);
    \u0275\u0275advance();
    \u0275\u0275classProp("accordion__icon--open", ctx_r2.isOpen(item_r2.id));
    \u0275\u0275advance(2);
    \u0275\u0275classProp("accordion__content--open", ctx_r2.isOpen(item_r2.id));
    \u0275\u0275property("id", "accordion-content-" + item_r2.id);
    \u0275\u0275attribute("aria-labelledby", "accordion-header-" + item_r2.id);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate1(" ", item_r2.content, " ");
  }
}
var Accordion = class _Accordion {
  /**
   * Array de items del accordion
   */
  items = input.required(...ngDevMode ? [{ debugName: "items" }] : []);
  /**
   * Modo del accordion:
   * - 'single': solo un item abierto a la vez
   * - 'multiple': múltiples items pueden estar abiertos simultáneamente
   */
  mode = input("single", ...ngDevMode ? [{ debugName: "mode" }] : []);
  /**
   * IDs de los items que están abiertos actualmente
   */
  openItems = signal(/* @__PURE__ */ new Set(), ...ngDevMode ? [{ debugName: "openItems" }] : []);
  constructor() {
  }
  /**
   * Toggle de un item del accordion
   */
  toggle(itemId) {
    const currentOpen = new Set(this.openItems());
    if (currentOpen.has(itemId)) {
      currentOpen.delete(itemId);
    } else {
      if (this.mode() === "single") {
        currentOpen.clear();
      }
      currentOpen.add(itemId);
    }
    this.openItems.set(currentOpen);
  }
  /**
   * Verificar si un item está abierto
   */
  isOpen(itemId) {
    return this.openItems().has(itemId);
  }
  static \u0275fac = function Accordion_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _Accordion)();
  };
  static \u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _Accordion, selectors: [["app-accordion"]], inputs: { items: [1, "items"], mode: [1, "mode"] }, decls: 2, vars: 1, consts: [[1, "accordion"], ["class", "accordion__item", 3, "accordion__item--open", 4, "ngFor", "ngForOf"], [1, "accordion__item"], ["type", "button", 1, "accordion__header", 3, "click"], [1, "accordion__title"], ["width", "20", "height", "20", "viewBox", "0 0 20 20", "fill", "none", "stroke", "currentColor", "stroke-width", "2", "stroke-linecap", "round", "stroke-linejoin", "round", "aria-hidden", "true", 1, "accordion__icon"], ["points", "6 9 12 15 18 9"], ["role", "region", 1, "accordion__content", 3, "id"], [1, "accordion__content-inner"]], template: function Accordion_Template(rf, ctx) {
    if (rf & 1) {
      \u0275\u0275elementStart(0, "div", 0);
      \u0275\u0275template(1, Accordion_div_1_Template, 9, 12, "div", 1);
      \u0275\u0275elementEnd();
    }
    if (rf & 2) {
      \u0275\u0275advance();
      \u0275\u0275property("ngForOf", ctx.items());
    }
  }, dependencies: [CommonModule, NgForOf], styles: ['@charset "UTF-8";\n\n\n\n.accordion[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  gap: 1rem;\n  width: 100%;\n}\n.accordion__item[_ngcontent-%COMP%] {\n  border: 3px solid var(--border-color);\n  border-radius: 5px;\n  background-color: var(--bg-primary);\n  overflow: hidden;\n  transition: box-shadow 0.2s ease;\n}\n.accordion__item[_ngcontent-%COMP%]:hover {\n  box-shadow: 4px 4px 0px var(--shadow-color);\n}\n.accordion__item--open[_ngcontent-%COMP%] {\n  box-shadow: 6px 6px 0px var(--shadow-color);\n  border-color: var(--color-primary);\n}\n.accordion__header[_ngcontent-%COMP%] {\n  width: 100%;\n  display: flex;\n  justify-content: space-between;\n  align-items: center;\n  padding: 2rem;\n  background-color: var(--bg-secondary);\n  border: none;\n  cursor: pointer;\n  transition: background-color 0.2s ease;\n  gap: 2rem;\n}\n.accordion__item--open[_ngcontent-%COMP%]   .accordion__header[_ngcontent-%COMP%] {\n  background-color: var(--color-primary);\n  border-bottom: 2px solid var(--border-color);\n}\n.accordion__header[_ngcontent-%COMP%]:hover {\n  background-color: var(--color-primary);\n}\n.accordion__header[_ngcontent-%COMP%]:active {\n  transform: translateY(1px);\n}\n.accordion__header[_ngcontent-%COMP%]:focus-visible {\n  outline: 3px solid var(--color-accent);\n  outline-offset: 2px;\n}\n.accordion__title[_ngcontent-%COMP%] {\n  font-family: "Space Grotesk", sans-serif;\n  font-size: 0.9375rem;\n  font-weight: 700;\n  color: var(--text-primary);\n  text-align: left;\n  text-transform: uppercase;\n  letter-spacing: 0.05em;\n}\n.accordion__icon[_ngcontent-%COMP%] {\n  color: var(--text-primary);\n  flex-shrink: 0;\n  transition: transform 0.3s cubic-bezier(0.4, 0, 0.2, 1);\n}\n.accordion__icon--open[_ngcontent-%COMP%] {\n  transform: rotate(180deg);\n}\n.accordion__content[_ngcontent-%COMP%] {\n  max-height: 0;\n  overflow: hidden;\n  transition: max-height 0.4s cubic-bezier(0.4, 0, 0.2, 1), opacity 0.3s ease;\n  opacity: 0;\n}\n.accordion__content--open[_ngcontent-%COMP%] {\n  max-height: 100rem;\n  opacity: 1;\n}\n.accordion__content-inner[_ngcontent-%COMP%] {\n  padding: 2rem;\n  font-family: "Space Grotesk", sans-serif;\n  font-size: 0.875rem;\n  line-height: 1.6;\n  color: var(--text-primary);\n}\n@media (max-width: 767px) {\n  .accordion__header[_ngcontent-%COMP%] {\n    padding: 1rem;\n  }\n  .accordion__title[_ngcontent-%COMP%] {\n    font-size: 0.875rem;\n  }\n  .accordion__content-inner[_ngcontent-%COMP%] {\n    padding: 1rem;\n    font-size: 0.75rem;\n  }\n  .accordion__icon[_ngcontent-%COMP%] {\n    width: 1rem;\n    height: 1rem;\n  }\n}\n/*# sourceMappingURL=accordion.css.map */'] });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(Accordion, [{
    type: Component,
    args: [{ selector: "app-accordion", imports: [CommonModule], template: `<div class="accordion">
  <!-- Iterar sobre cada item del accordion -->
  <div
    *ngFor="let item of items()"
    class="accordion__item"
    [class.accordion__item--open]="isOpen(item.id)">

    <!-- Header: clickeable para expandir/colapsar -->
    <button
      class="accordion__header"
      (click)="toggle(item.id)"
      [attr.aria-expanded]="isOpen(item.id)"
      [attr.aria-controls]="'accordion-content-' + item.id"
      type="button">

      <span class="accordion__title">{{ item.title }}</span>

      <!-- Icono de flecha que rota al abrir -->
      <svg
        class="accordion__icon"
        [class.accordion__icon--open]="isOpen(item.id)"
        width="20"
        height="20"
        viewBox="0 0 20 20"
        fill="none"
        stroke="currentColor"
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
        aria-hidden="true">
        <polyline points="6 9 12 15 18 9"></polyline>
      </svg>
    </button>

    <!-- Contenido: se expande/colapsa con animaci\xF3n -->
    <div
      [id]="'accordion-content-' + item.id"
      class="accordion__content"
      [class.accordion__content--open]="isOpen(item.id)"
      role="region"
      [attr.aria-labelledby]="'accordion-header-' + item.id">

      <div class="accordion__content-inner">
        {{ item.content }}
      </div>
    </div>
  </div>
</div>
`, styles: ['@charset "UTF-8";\n\n/* src/app/components/shared/accordion/accordion.scss */\n.accordion {\n  display: flex;\n  flex-direction: column;\n  gap: 1rem;\n  width: 100%;\n}\n.accordion__item {\n  border: 3px solid var(--border-color);\n  border-radius: 5px;\n  background-color: var(--bg-primary);\n  overflow: hidden;\n  transition: box-shadow 0.2s ease;\n}\n.accordion__item:hover {\n  box-shadow: 4px 4px 0px var(--shadow-color);\n}\n.accordion__item--open {\n  box-shadow: 6px 6px 0px var(--shadow-color);\n  border-color: var(--color-primary);\n}\n.accordion__header {\n  width: 100%;\n  display: flex;\n  justify-content: space-between;\n  align-items: center;\n  padding: 2rem;\n  background-color: var(--bg-secondary);\n  border: none;\n  cursor: pointer;\n  transition: background-color 0.2s ease;\n  gap: 2rem;\n}\n.accordion__item--open .accordion__header {\n  background-color: var(--color-primary);\n  border-bottom: 2px solid var(--border-color);\n}\n.accordion__header:hover {\n  background-color: var(--color-primary);\n}\n.accordion__header:active {\n  transform: translateY(1px);\n}\n.accordion__header:focus-visible {\n  outline: 3px solid var(--color-accent);\n  outline-offset: 2px;\n}\n.accordion__title {\n  font-family: "Space Grotesk", sans-serif;\n  font-size: 0.9375rem;\n  font-weight: 700;\n  color: var(--text-primary);\n  text-align: left;\n  text-transform: uppercase;\n  letter-spacing: 0.05em;\n}\n.accordion__icon {\n  color: var(--text-primary);\n  flex-shrink: 0;\n  transition: transform 0.3s cubic-bezier(0.4, 0, 0.2, 1);\n}\n.accordion__icon--open {\n  transform: rotate(180deg);\n}\n.accordion__content {\n  max-height: 0;\n  overflow: hidden;\n  transition: max-height 0.4s cubic-bezier(0.4, 0, 0.2, 1), opacity 0.3s ease;\n  opacity: 0;\n}\n.accordion__content--open {\n  max-height: 100rem;\n  opacity: 1;\n}\n.accordion__content-inner {\n  padding: 2rem;\n  font-family: "Space Grotesk", sans-serif;\n  font-size: 0.875rem;\n  line-height: 1.6;\n  color: var(--text-primary);\n}\n@media (max-width: 767px) {\n  .accordion__header {\n    padding: 1rem;\n  }\n  .accordion__title {\n    font-size: 0.875rem;\n  }\n  .accordion__content-inner {\n    padding: 1rem;\n    font-size: 0.75rem;\n  }\n  .accordion__icon {\n    width: 1rem;\n    height: 1rem;\n  }\n}\n/*# sourceMappingURL=accordion.css.map */\n'] }]
  }], () => [], { items: [{ type: Input, args: [{ isSignal: true, alias: "items", required: true }] }], mode: [{ type: Input, args: [{ isSignal: true, alias: "mode", required: false }] }] });
})();
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(Accordion, { className: "Accordion", filePath: "src/app/components/shared/accordion/accordion.ts", lineNumber: 17 });
})();

// src/app/components/shared/tabs/tabs.ts
var _c04 = ["tabsNav"];
function Tabs_button_3_Template(rf, ctx) {
  if (rf & 1) {
    const _r1 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "button", 6);
    \u0275\u0275listener("click", function Tabs_button_3_Template_button_click_0_listener() {
      const tab_r2 = \u0275\u0275restoreView(_r1).$implicit;
      const ctx_r2 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r2.selectTab(tab_r2.id));
    });
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const tab_r2 = ctx.$implicit;
    const ctx_r2 = \u0275\u0275nextContext();
    \u0275\u0275classProp("tabs__tab--active", ctx_r2.isActive(tab_r2.id))("tabs__tab--disabled", tab_r2.disabled);
    \u0275\u0275property("disabled", tab_r2.disabled);
    \u0275\u0275attribute("role", "tab")("aria-selected", ctx_r2.isActive(tab_r2.id))("aria-controls", "tabpanel-" + tab_r2.id)("tabindex", ctx_r2.isActive(tab_r2.id) ? 0 : -1);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", tab_r2.label, " ");
  }
}
var Tabs = class _Tabs {
  // ========================================================================
  // INPUTS & STATE
  // ========================================================================
  /** Signal Input: Lista de pestañas a renderizar. Requerido. */
  tabs = input.required(...ngDevMode ? [{ debugName: "tabs" }] : []);
  /** Signal Input: ID de la pestaña que debe estar activa al inicio. Opcional. */
  initialActiveTab = input(void 0, ...ngDevMode ? [{ debugName: "initialActiveTab" }] : []);
  /** Signal: Almacena el ID de la pestaña actualmente activa. */
  activeTabId = signal(null, ...ngDevMode ? [{ debugName: "activeTabId" }] : []);
  // ========================================================================
  // DOM ELEMENTS & SCROLL LOGIC
  // ========================================================================
  /** Referencia al contenedor de navegación para manipular el scroll nativo. */
  tabsNav;
  /** Inyectamos Renderer2 para añadir listeners de forma segura (best practice en Angular). */
  renderer = inject(Renderer2);
  /** Almacena las funciones de limpieza de los event listeners para evitar memory leaks. */
  listeners = [];
  // Variables de estado para la lógica de "drag-to-scroll"
  isDown = false;
  // ¿El botón del ratón está presionado?
  startX = 0;
  // Posición X inicial del ratón al hacer click
  scrollLeft = 0;
  // Posición de scroll inicial al hacer click
  isDragging = false;
  // ¿Se considera que el usuario está arrastrando? (vs click simple)
  // ========================================================================
  // LIFECYCLE HOOKS
  // ========================================================================
  constructor() {
    setTimeout(() => {
      this.initializeActiveTab();
    });
  }
  /**
   * Configura los eventos nativos del DOM una vez que la vista está inicializada.
   * Se usa para la lógica de scroll que no es fácil de manejar solo con templates.
   */
  ngAfterViewInit() {
    this.setupScrollBehavior();
  }
  /**
   * Limpia los event listeners cuando el componente se destruye.
   */
  ngOnDestroy() {
    this.listeners.forEach((unlisten) => unlisten());
  }
  // ========================================================================
  // PUBLIC API (MÉTODOS USADOS EN EL TEMPLATE)
  // ========================================================================
  /**
   * Cambia la pestaña activa.
   * @param tabId - El ID de la pestaña a seleccionar.
   */
  selectTab(tabId) {
    if (this.isDragging)
      return;
    const tab = this.tabs().find((t) => t.id === tabId);
    if (tab && !tab.disabled) {
      this.activeTabId.set(tabId);
    }
  }
  /**
   * Comprueba si una pestaña específica está activa.
   * @param tabId - El ID de la pestaña a verificar.
   */
  isActive(tabId) {
    return this.activeTabId() === tabId;
  }
  /**
   * Devuelve el contenido de la pestaña activa actual.
   */
  getActiveContent() {
    const activeId = this.activeTabId();
    const activeTab = this.tabs().find((t) => t.id === activeId);
    return activeTab?.content || "";
  }
  // ========================================================================
  // PRIVATE METHODS & LOGIC
  // ========================================================================
  /**
   * Lógica inicial para determinar qué pestaña mostrar primero.
   */
  initializeActiveTab() {
    const initial = this.initialActiveTab();
    const tabsList = this.tabs();
    if (initial !== void 0) {
      this.activeTabId.set(initial);
    } else if (tabsList.length > 0) {
      const firstEnabled = tabsList.find((t) => !t.disabled);
      if (firstEnabled) {
        this.activeTabId.set(firstEnabled.id);
      }
    }
  }
  /**
   * Configura todos los listeners para drag-to-scroll y wheel-scroll.
   */
  setupScrollBehavior() {
    if (!this.tabsNav)
      return;
    const slider = this.tabsNav.nativeElement;
    this.listeners.push(this.renderer.listen(slider, "mousedown", (e) => {
      this.isDown = true;
      this.isDragging = false;
      slider.classList.add("active");
      this.startX = e.pageX - slider.offsetLeft;
      this.scrollLeft = slider.scrollLeft;
    }));
    const stopDragging = () => {
      this.isDown = false;
      slider.classList.remove("active");
      setTimeout(() => this.isDragging = false, 50);
    };
    this.listeners.push(this.renderer.listen(slider, "mouseleave", stopDragging));
    this.listeners.push(this.renderer.listen(slider, "mouseup", stopDragging));
    this.listeners.push(this.renderer.listen(slider, "mousemove", (e) => {
      if (!this.isDown)
        return;
      e.preventDefault();
      const x = e.pageX - slider.offsetLeft;
      const walk = (x - this.startX) * 2;
      slider.scrollLeft = this.scrollLeft - walk;
      if (Math.abs(walk) > 5) {
        this.isDragging = true;
      }
    }));
    const wheelHandler = (e) => {
      if (Math.abs(e.deltaY) > Math.abs(e.deltaX)) {
        e.preventDefault();
        slider.scrollLeft += e.deltaY;
      }
    };
    slider.addEventListener("wheel", wheelHandler, { passive: false });
    this.listeners.push(() => {
      slider.removeEventListener("wheel", wheelHandler);
    });
  }
  // ========================================================================
  // KEYBOARD NAVIGATION
  // ========================================================================
  onArrowLeft() {
    this.navigateTabs(-1);
  }
  onArrowRight() {
    this.navigateTabs(1);
  }
  /**
   * Lógica centralizada para navegación circular (wrap-around) saltando deshabilitados.
   * @param direction - 1 para siguiente, -1 para anterior.
   */
  navigateTabs(direction) {
    const tabsList = this.tabs();
    const currentId = this.activeTabId();
    const currentIndex = tabsList.findIndex((t) => t.id === currentId);
    if (currentIndex === -1)
      return;
    let nextIndex = currentIndex + direction;
    if (nextIndex < 0)
      nextIndex = tabsList.length - 1;
    if (nextIndex >= tabsList.length)
      nextIndex = 0;
    let attempts = 0;
    while (tabsList[nextIndex]?.disabled && attempts < tabsList.length) {
      nextIndex += direction;
      if (nextIndex < 0)
        nextIndex = tabsList.length - 1;
      if (nextIndex >= tabsList.length)
        nextIndex = 0;
      attempts++;
    }
    if (!tabsList[nextIndex]?.disabled) {
      this.selectTab(tabsList[nextIndex].id);
    }
  }
  static \u0275fac = function Tabs_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _Tabs)();
  };
  static \u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _Tabs, selectors: [["app-tabs"]], viewQuery: function Tabs_Query(rf, ctx) {
    if (rf & 1) {
      \u0275\u0275viewQuery(_c04, 5);
    }
    if (rf & 2) {
      let _t;
      \u0275\u0275queryRefresh(_t = \u0275\u0275loadQuery()) && (ctx.tabsNav = _t.first);
    }
  }, hostBindings: function Tabs_HostBindings(rf, ctx) {
    if (rf & 1) {
      \u0275\u0275listener("keydown.arrowleft", function Tabs_keydown_arrowleft_HostBindingHandler() {
        return ctx.onArrowLeft();
      })("keydown.arrowright", function Tabs_keydown_arrowright_HostBindingHandler() {
        return ctx.onArrowRight();
      });
    }
  }, inputs: { tabs: [1, "tabs"], initialActiveTab: [1, "initialActiveTab"] }, decls: 7, vars: 4, consts: [["tabsNav", ""], [1, "tabs"], ["role", "tablist", 1, "tabs__nav"], ["class", "tabs__tab", "type", "button", 3, "tabs__tab--active", "tabs__tab--disabled", "disabled", "click", 4, "ngFor", "ngForOf"], ["role", "tabpanel", 1, "tabs__panel"], [1, "tabs__content"], ["type", "button", 1, "tabs__tab", 3, "click", "disabled"]], template: function Tabs_Template(rf, ctx) {
    if (rf & 1) {
      \u0275\u0275elementStart(0, "div", 1)(1, "div", 2, 0);
      \u0275\u0275template(3, Tabs_button_3_Template, 2, 10, "button", 3);
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(4, "div", 4)(5, "div", 5);
      \u0275\u0275text(6);
      \u0275\u0275elementEnd()()();
    }
    if (rf & 2) {
      \u0275\u0275advance(3);
      \u0275\u0275property("ngForOf", ctx.tabs());
      \u0275\u0275advance();
      \u0275\u0275attribute("id", "tabpanel-" + ctx.activeTabId())("aria-labelledby", "tab-" + ctx.activeTabId());
      \u0275\u0275advance(2);
      \u0275\u0275textInterpolate1(" ", ctx.getActiveContent(), " ");
    }
  }, dependencies: [CommonModule, NgForOf], styles: ['@charset "UTF-8";\n\n\n\n[_nghost-%COMP%] {\n  display: block;\n  width: 100%;\n  max-width: 100%;\n  min-width: 0;\n}\n.tabs[_ngcontent-%COMP%] {\n  width: 100%;\n  border: 3px solid var(--border-color);\n  border-radius: 5px;\n  background-color: var(--bg-primary);\n  overflow: hidden;\n}\n.tabs__nav[_ngcontent-%COMP%] {\n  display: flex;\n  background-color: var(--bg-secondary);\n  border-bottom: 3px solid var(--border-color);\n  overflow-x: auto;\n  overflow-y: hidden;\n  scrollbar-width: none;\n  -ms-overflow-style: none;\n}\n.tabs__nav[_ngcontent-%COMP%]::-webkit-scrollbar {\n  display: none;\n}\n.tabs__tab[_ngcontent-%COMP%] {\n  flex: 0 0 auto;\n  padding: 2rem 3rem;\n  border: none;\n  border-right: 2px solid var(--border-color);\n  background-color: transparent;\n  color: var(--text-primary);\n  font-family: "Space Grotesk", sans-serif;\n  font-size: 0.9375rem;\n  font-weight: 600;\n  cursor: pointer;\n  transition: all 0.2s ease;\n  position: relative;\n  white-space: nowrap;\n  text-transform: uppercase;\n  letter-spacing: 0.05em;\n}\n.tabs__tab[_ngcontent-%COMP%]:last-child {\n  border-right: none;\n}\n.tabs__tab[_ngcontent-%COMP%]:hover:not(.tabs__tab--disabled):not(.tabs__tab--active) {\n  background-color: var(--color-primary);\n  color: var(--text-dark);\n}\n.tabs__tab[_ngcontent-%COMP%]:focus-visible {\n  outline: 3px solid var(--color-accent);\n  outline-offset: 2px;\n}\n.tabs__tab--active[_ngcontent-%COMP%] {\n  background-color: var(--color-primary);\n  color: var(--text-dark);\n  font-weight: 800;\n  box-shadow: inset 0 -4px 0 0 var(--text-dark);\n}\n.tabs__tab--active[_ngcontent-%COMP%]::after {\n  content: "";\n  position: absolute;\n  bottom: -2px;\n  left: 0;\n  right: 0;\n  height: 4px;\n  background-color: var(--color-primary);\n}\n.tabs__tab--disabled[_ngcontent-%COMP%] {\n  opacity: 0.4;\n  cursor: not-allowed;\n  pointer-events: none;\n}\n.tabs__panel[_ngcontent-%COMP%] {\n  padding: 3rem;\n  min-height: 12rem;\n  animation: _ngcontent-%COMP%_fadeIn 0.3s ease;\n}\n@keyframes _ngcontent-%COMP%_fadeIn {\n  from {\n    opacity: 0;\n    transform: translateY(0.5rem);\n  }\n  to {\n    opacity: 1;\n    transform: translateY(0);\n  }\n}\n.tabs__content[_ngcontent-%COMP%] {\n  font-family: "Space Grotesk", sans-serif;\n  font-size: 0.9375rem;\n  line-height: 1.6;\n  color: var(--text-primary);\n}\n@media (max-width: 767px) {\n  .tabs__tab[_ngcontent-%COMP%] {\n    padding: 1rem 2rem;\n    font-size: 0.875rem;\n  }\n  .tabs__panel[_ngcontent-%COMP%] {\n    padding: 2rem;\n    min-height: 8rem;\n  }\n  .tabs__content[_ngcontent-%COMP%] {\n    font-size: 0.875rem;\n  }\n}\n/*# sourceMappingURL=tabs.css.map */'] });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(Tabs, [{
    type: Component,
    args: [{ selector: "app-tabs", imports: [CommonModule], template: `<div class="tabs">
  <div class="tabs__nav" role="tablist" #tabsNav>
    <button
      *ngFor="let tab of tabs()"
      class="tabs__tab"
      [class.tabs__tab--active]="isActive(tab.id)"
      [class.tabs__tab--disabled]="tab.disabled"
      [attr.role]="'tab'"
      [attr.aria-selected]="isActive(tab.id)"
      [attr.aria-controls]="'tabpanel-' + tab.id"
      [attr.tabindex]="isActive(tab.id) ? 0 : -1"
      [disabled]="tab.disabled"
      (click)="selectTab(tab.id)"
      type="button">
      {{ tab.label }}
    </button>
  </div>

  <!-- Panel de contenido (sin cambios) -->
  <div
    class="tabs__panel"
    role="tabpanel"
    [attr.id]="'tabpanel-' + activeTabId()"
    [attr.aria-labelledby]="'tab-' + activeTabId()">
    <div class="tabs__content">
      {{ getActiveContent() }}
    </div>
  </div>
</div>
`, styles: ['@charset "UTF-8";\n\n/* src/app/components/shared/tabs/tabs.scss */\n:host {\n  display: block;\n  width: 100%;\n  max-width: 100%;\n  min-width: 0;\n}\n.tabs {\n  width: 100%;\n  border: 3px solid var(--border-color);\n  border-radius: 5px;\n  background-color: var(--bg-primary);\n  overflow: hidden;\n}\n.tabs__nav {\n  display: flex;\n  background-color: var(--bg-secondary);\n  border-bottom: 3px solid var(--border-color);\n  overflow-x: auto;\n  overflow-y: hidden;\n  scrollbar-width: none;\n  -ms-overflow-style: none;\n}\n.tabs__nav::-webkit-scrollbar {\n  display: none;\n}\n.tabs__tab {\n  flex: 0 0 auto;\n  padding: 2rem 3rem;\n  border: none;\n  border-right: 2px solid var(--border-color);\n  background-color: transparent;\n  color: var(--text-primary);\n  font-family: "Space Grotesk", sans-serif;\n  font-size: 0.9375rem;\n  font-weight: 600;\n  cursor: pointer;\n  transition: all 0.2s ease;\n  position: relative;\n  white-space: nowrap;\n  text-transform: uppercase;\n  letter-spacing: 0.05em;\n}\n.tabs__tab:last-child {\n  border-right: none;\n}\n.tabs__tab:hover:not(.tabs__tab--disabled):not(.tabs__tab--active) {\n  background-color: var(--color-primary);\n  color: var(--text-dark);\n}\n.tabs__tab:focus-visible {\n  outline: 3px solid var(--color-accent);\n  outline-offset: 2px;\n}\n.tabs__tab--active {\n  background-color: var(--color-primary);\n  color: var(--text-dark);\n  font-weight: 800;\n  box-shadow: inset 0 -4px 0 0 var(--text-dark);\n}\n.tabs__tab--active::after {\n  content: "";\n  position: absolute;\n  bottom: -2px;\n  left: 0;\n  right: 0;\n  height: 4px;\n  background-color: var(--color-primary);\n}\n.tabs__tab--disabled {\n  opacity: 0.4;\n  cursor: not-allowed;\n  pointer-events: none;\n}\n.tabs__panel {\n  padding: 3rem;\n  min-height: 12rem;\n  animation: fadeIn 0.3s ease;\n}\n@keyframes fadeIn {\n  from {\n    opacity: 0;\n    transform: translateY(0.5rem);\n  }\n  to {\n    opacity: 1;\n    transform: translateY(0);\n  }\n}\n.tabs__content {\n  font-family: "Space Grotesk", sans-serif;\n  font-size: 0.9375rem;\n  line-height: 1.6;\n  color: var(--text-primary);\n}\n@media (max-width: 767px) {\n  .tabs__tab {\n    padding: 1rem 2rem;\n    font-size: 0.875rem;\n  }\n  .tabs__panel {\n    padding: 2rem;\n    min-height: 8rem;\n  }\n  .tabs__content {\n    font-size: 0.875rem;\n  }\n}\n/*# sourceMappingURL=tabs.css.map */\n'] }]
  }], () => [], { tabs: [{ type: Input, args: [{ isSignal: true, alias: "tabs", required: true }] }], initialActiveTab: [{ type: Input, args: [{ isSignal: true, alias: "initialActiveTab", required: false }] }], tabsNav: [{
    type: ViewChild,
    args: ["tabsNav"]
  }], onArrowLeft: [{
    type: HostListener,
    args: ["keydown.arrowleft"]
  }], onArrowRight: [{
    type: HostListener,
    args: ["keydown.arrowright"]
  }] });
})();
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(Tabs, { className: "Tabs", filePath: "src/app/components/shared/tabs/tabs.ts", lineNumber: 42 });
})();

// src/app/components/shared/tooltip/tooltip.ts
var _c05 = ["*"];
function Tooltip_Conditional_2_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275domElementStart(0, "div", 2);
    \u0275\u0275text(1);
    \u0275\u0275domElement(2, "div", 3);
    \u0275\u0275domElementEnd();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext();
    \u0275\u0275classProp("tooltip--top", ctx_r0.position() === "top")("tooltip--bottom", ctx_r0.position() === "bottom")("tooltip--left", ctx_r0.position() === "left")("tooltip--right", ctx_r0.position() === "right");
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", ctx_r0.text(), " ");
  }
}
var Tooltip = class _Tooltip {
  /**
   * Texto del tooltip
   */
  text = input.required(...ngDevMode ? [{ debugName: "text" }] : []);
  /**
   * Posición del tooltip relativa al elemento
   */
  position = input("top", ...ngDevMode ? [{ debugName: "position" }] : []);
  /**
   * Delay en milisegundos antes de mostrar el tooltip
   */
  showDelay = input(300, ...ngDevMode ? [{ debugName: "showDelay" }] : []);
  /**
   * Delay en milisegundos antes de ocultar el tooltip
   */
  hideDelay = input(0, ...ngDevMode ? [{ debugName: "hideDelay" }] : []);
  /**
   * Signal para controlar la visibilidad del tooltip
   */
  isVisible = signal(false, ...ngDevMode ? [{ debugName: "isVisible" }] : []);
  showTimeout;
  hideTimeout;
  /**
   * Mostrar tooltip al hacer hover
   */
  onMouseEnter() {
    if (this.hideTimeout) {
      clearTimeout(this.hideTimeout);
      this.hideTimeout = null;
    }
    this.showTimeout = setTimeout(() => {
      this.isVisible.set(true);
    }, this.showDelay());
  }
  /**
   * Ocultar tooltip al quitar el hover
   */
  onMouseLeave() {
    if (this.showTimeout) {
      clearTimeout(this.showTimeout);
      this.showTimeout = null;
    }
    this.hideTimeout = setTimeout(() => {
      this.isVisible.set(false);
    }, this.hideDelay());
  }
  /**
   * Limpiar timeouts al destruir el componente
   */
  ngOnDestroy() {
    if (this.showTimeout)
      clearTimeout(this.showTimeout);
    if (this.hideTimeout)
      clearTimeout(this.hideTimeout);
  }
  static \u0275fac = function Tooltip_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _Tooltip)();
  };
  static \u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _Tooltip, selectors: [["app-tooltip"]], hostBindings: function Tooltip_HostBindings(rf, ctx) {
    if (rf & 1) {
      \u0275\u0275listener("mouseenter", function Tooltip_mouseenter_HostBindingHandler() {
        return ctx.onMouseEnter();
      })("mouseleave", function Tooltip_mouseleave_HostBindingHandler() {
        return ctx.onMouseLeave();
      });
    }
  }, inputs: { text: [1, "text"], position: [1, "position"], showDelay: [1, "showDelay"], hideDelay: [1, "hideDelay"] }, ngContentSelectors: _c05, decls: 3, vars: 1, consts: [[1, "tooltip-wrapper"], ["role", "tooltip", 1, "tooltip", 3, "tooltip--top", "tooltip--bottom", "tooltip--left", "tooltip--right"], ["role", "tooltip", 1, "tooltip"], [1, "tooltip__arrow"]], template: function Tooltip_Template(rf, ctx) {
    if (rf & 1) {
      \u0275\u0275projectionDef();
      \u0275\u0275domElementStart(0, "div", 0);
      \u0275\u0275projection(1);
      \u0275\u0275conditionalCreate(2, Tooltip_Conditional_2_Template, 3, 9, "div", 1);
      \u0275\u0275domElementEnd();
    }
    if (rf & 2) {
      \u0275\u0275advance(2);
      \u0275\u0275conditional(ctx.isVisible() ? 2 : -1);
    }
  }, dependencies: [CommonModule], styles: ['@charset "UTF-8";\n\n\n\n.tooltip-wrapper[_ngcontent-%COMP%] {\n  position: relative;\n  display: inline-block;\n}\n.tooltip[_ngcontent-%COMP%] {\n  position: absolute;\n  z-index: 8;\n  padding: 1rem 2rem;\n  background-color: var(--bg-secondary);\n  color: var(--text-primary);\n  font-family: "Space Grotesk", sans-serif;\n  font-size: 0.875rem;\n  font-weight: 600;\n  line-height: 1.4;\n  border: 2px solid var(--border-color);\n  border-radius: 3px;\n  box-shadow: 4px 4px 0px var(--shadow-color);\n  white-space: nowrap;\n  pointer-events: none;\n  animation: _ngcontent-%COMP%_tooltipFadeIn 0.2s ease;\n}\n@keyframes _ngcontent-%COMP%_tooltipFadeIn {\n  from {\n    opacity: 0;\n    transform: scale(0.95);\n  }\n  to {\n    opacity: 1;\n    transform: scale(1);\n  }\n}\n.tooltip__arrow[_ngcontent-%COMP%] {\n  position: absolute;\n  width: 0;\n  height: 0;\n  border-style: solid;\n}\n.tooltip--top[_ngcontent-%COMP%] {\n  bottom: calc(100% + 8px);\n  left: 50%;\n  transform: translateX(-50%);\n}\n.tooltip--top[_ngcontent-%COMP%]   .tooltip__arrow[_ngcontent-%COMP%] {\n  top: 100%;\n  left: 50%;\n  transform: translateX(-50%);\n  border-width: 6px 6px 0 6px;\n  border-color: var(--bg-secondary) transparent transparent transparent;\n}\n.tooltip--bottom[_ngcontent-%COMP%] {\n  top: calc(100% + 8px);\n  left: 50%;\n  transform: translateX(-50%);\n}\n.tooltip--bottom[_ngcontent-%COMP%]   .tooltip__arrow[_ngcontent-%COMP%] {\n  bottom: 100%;\n  left: 50%;\n  transform: translateX(-50%);\n  border-width: 0 6px 6px 6px;\n  border-color: transparent transparent var(--bg-secondary) transparent;\n}\n.tooltip--left[_ngcontent-%COMP%] {\n  right: calc(100% + 8px);\n  top: 50%;\n  transform: translateY(-50%);\n}\n.tooltip--left[_ngcontent-%COMP%]   .tooltip__arrow[_ngcontent-%COMP%] {\n  left: 100%;\n  top: 50%;\n  transform: translateY(-50%);\n  border-width: 6px 0 6px 6px;\n  border-color: transparent transparent transparent var(--bg-secondary);\n}\n.tooltip--right[_ngcontent-%COMP%] {\n  left: calc(100% + 8px);\n  top: 50%;\n  transform: translateY(-50%);\n}\n.tooltip--right[_ngcontent-%COMP%]   .tooltip__arrow[_ngcontent-%COMP%] {\n  right: 100%;\n  top: 50%;\n  transform: translateY(-50%);\n  border-width: 6px 6px 6px 0;\n  border-color: transparent var(--bg-secondary) transparent transparent;\n}\n@media (max-width: 320px) {\n  .tooltip[_ngcontent-%COMP%] {\n    white-space: normal;\n    max-width: 200px;\n    font-size: 0.75rem;\n    padding: 0.5rem 1rem;\n  }\n}\n/*# sourceMappingURL=tooltip.css.map */'] });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(Tooltip, [{
    type: Component,
    args: [{ selector: "app-tooltip", imports: [CommonModule], template: `<div class="tooltip-wrapper">
  <!-- Contenido sobre el que se hace hover -->
  <ng-content></ng-content>

  <!-- Tooltip flotante -->
  @if (isVisible()) {
  <div
    class="tooltip"
    [class.tooltip--top]="position() === 'top'"
    [class.tooltip--bottom]="position() === 'bottom'"
    [class.tooltip--left]="position() === 'left'"
    [class.tooltip--right]="position() === 'right'"
    role="tooltip">
    {{ text() }}
    
    <!-- Flecha del tooltip -->
    <div class="tooltip__arrow"></div>
  </div>
  }
</div>
`, styles: ['@charset "UTF-8";\n\n/* src/app/components/shared/tooltip/tooltip.scss */\n.tooltip-wrapper {\n  position: relative;\n  display: inline-block;\n}\n.tooltip {\n  position: absolute;\n  z-index: 8;\n  padding: 1rem 2rem;\n  background-color: var(--bg-secondary);\n  color: var(--text-primary);\n  font-family: "Space Grotesk", sans-serif;\n  font-size: 0.875rem;\n  font-weight: 600;\n  line-height: 1.4;\n  border: 2px solid var(--border-color);\n  border-radius: 3px;\n  box-shadow: 4px 4px 0px var(--shadow-color);\n  white-space: nowrap;\n  pointer-events: none;\n  animation: tooltipFadeIn 0.2s ease;\n}\n@keyframes tooltipFadeIn {\n  from {\n    opacity: 0;\n    transform: scale(0.95);\n  }\n  to {\n    opacity: 1;\n    transform: scale(1);\n  }\n}\n.tooltip__arrow {\n  position: absolute;\n  width: 0;\n  height: 0;\n  border-style: solid;\n}\n.tooltip--top {\n  bottom: calc(100% + 8px);\n  left: 50%;\n  transform: translateX(-50%);\n}\n.tooltip--top .tooltip__arrow {\n  top: 100%;\n  left: 50%;\n  transform: translateX(-50%);\n  border-width: 6px 6px 0 6px;\n  border-color: var(--bg-secondary) transparent transparent transparent;\n}\n.tooltip--bottom {\n  top: calc(100% + 8px);\n  left: 50%;\n  transform: translateX(-50%);\n}\n.tooltip--bottom .tooltip__arrow {\n  bottom: 100%;\n  left: 50%;\n  transform: translateX(-50%);\n  border-width: 0 6px 6px 6px;\n  border-color: transparent transparent var(--bg-secondary) transparent;\n}\n.tooltip--left {\n  right: calc(100% + 8px);\n  top: 50%;\n  transform: translateY(-50%);\n}\n.tooltip--left .tooltip__arrow {\n  left: 100%;\n  top: 50%;\n  transform: translateY(-50%);\n  border-width: 6px 0 6px 6px;\n  border-color: transparent transparent transparent var(--bg-secondary);\n}\n.tooltip--right {\n  left: calc(100% + 8px);\n  top: 50%;\n  transform: translateY(-50%);\n}\n.tooltip--right .tooltip__arrow {\n  right: 100%;\n  top: 50%;\n  transform: translateY(-50%);\n  border-width: 6px 6px 6px 0;\n  border-color: transparent var(--bg-secondary) transparent transparent;\n}\n@media (max-width: 320px) {\n  .tooltip {\n    white-space: normal;\n    max-width: 200px;\n    font-size: 0.75rem;\n    padding: 0.5rem 1rem;\n  }\n}\n/*# sourceMappingURL=tooltip.css.map */\n'] }]
  }], null, { text: [{ type: Input, args: [{ isSignal: true, alias: "text", required: true }] }], position: [{ type: Input, args: [{ isSignal: true, alias: "position", required: false }] }], showDelay: [{ type: Input, args: [{ isSignal: true, alias: "showDelay", required: false }] }], hideDelay: [{ type: Input, args: [{ isSignal: true, alias: "hideDelay", required: false }] }], onMouseEnter: [{
    type: HostListener,
    args: ["mouseenter"]
  }], onMouseLeave: [{
    type: HostListener,
    args: ["mouseleave"]
  }] });
})();
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(Tooltip, { className: "Tooltip", filePath: "src/app/components/shared/tooltip/tooltip.ts", lineNumber: 12 });
})();

// src/app/components/shared/progress-bar/progress-bar.ts
function ProgressBar_Conditional_3_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275domElementStart(0, "span", 3);
    \u0275\u0275text(1);
    \u0275\u0275domElementEnd();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext();
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", ctx_r0.labelText, " ");
  }
}
var ProgressBar = class _ProgressBar {
  loadingService = inject(LoadingService);
  /**
   * Valor del progreso (0-100)
   */
  value = 0;
  /**
   * Si es true, muestra animación indeterminada
   */
  indeterminate = false;
  /**
   * Si es true, muestra el porcentaje como texto
   */
  showLabel = false;
  /**
   * Tamaño de la barra
   */
  size = "md";
  /**
   * Variante de color
   */
  variant = "primary";
  /**
   * Si es true, usa el valor del LoadingService
   */
  useService = false;
  /**
   * Texto personalizado para la etiqueta
   */
  label;
  /**
   * Si es true, muestra barra con rayas animadas
   */
  striped = false;
  /**
   * Obtiene el valor actual del progreso
   */
  get currentValue() {
    if (this.useService) {
      const serviceValue = this.loadingService.progress();
      return serviceValue >= 0 ? serviceValue : 0;
    }
    return Math.min(100, Math.max(0, this.value));
  }
  /**
   * Determina si debe mostrar modo indeterminado
   */
  get isIndeterminate() {
    if (this.useService) {
      return this.loadingService.progress() < 0;
    }
    return this.indeterminate;
  }
  /**
   * Texto de la etiqueta
   */
  get labelText() {
    if (this.label) {
      return this.label;
    }
    return `${Math.round(this.currentValue)}%`;
  }
  /**
   * Clases CSS dinámicas para el contenedor
   */
  get containerClasses() {
    const classes = ["progress-bar"];
    classes.push(`progress-bar--${this.size}`);
    classes.push(`progress-bar--${this.variant}`);
    if (this.isIndeterminate) {
      classes.push("progress-bar--indeterminate");
    }
    if (this.striped) {
      classes.push("progress-bar--striped");
    }
    return classes.join(" ");
  }
  /**
   * Estilo inline para el ancho de la barra
   */
  get progressStyle() {
    if (this.isIndeterminate) {
      return {};
    }
    return {
      width: `${this.currentValue}%`
    };
  }
  static \u0275fac = function ProgressBar_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _ProgressBar)();
  };
  static \u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _ProgressBar, selectors: [["app-progress-bar"]], inputs: { value: "value", indeterminate: "indeterminate", showLabel: "showLabel", size: "size", variant: "variant", useService: "useService", label: "label", striped: "striped" }, decls: 4, vars: 8, consts: [["role", "progressbar"], [1, "progress-bar__track"], [1, "progress-bar__fill"], [1, "progress-bar__label"]], template: function ProgressBar_Template(rf, ctx) {
    if (rf & 1) {
      \u0275\u0275domElementStart(0, "div", 0)(1, "div", 1);
      \u0275\u0275domElement(2, "div", 2);
      \u0275\u0275domElementEnd();
      \u0275\u0275conditionalCreate(3, ProgressBar_Conditional_3_Template, 2, 1, "span", 3);
      \u0275\u0275domElementEnd();
    }
    if (rf & 2) {
      \u0275\u0275classMap(ctx.containerClasses);
      \u0275\u0275attribute("aria-valuenow", ctx.isIndeterminate ? null : ctx.currentValue)("aria-valuemin", 0)("aria-valuemax", 100);
      \u0275\u0275advance(2);
      \u0275\u0275styleProp("width", ctx.isIndeterminate ? 30 : ctx.currentValue, "%");
      \u0275\u0275advance();
      \u0275\u0275conditional(ctx.showLabel && !ctx.isIndeterminate ? 3 : -1);
    }
  }, dependencies: [CommonModule], styles: ['@charset "UTF-8";\n\n\n\n[_nghost-%COMP%] {\n  display: block;\n  width: 100%;\n  max-width: 100%;\n  min-width: 0;\n}\n.progress-bar[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: row;\n  gap: 1rem;\n  align-items: center;\n  width: 100%;\n}\n.progress-bar__track[_ngcontent-%COMP%] {\n  flex: 1;\n  height: 20px;\n  background-color: var(--bg-primary);\n  border: 3px solid var(--border-color) solid var(--border-color);\n  overflow: hidden;\n  position: relative;\n  box-shadow: inset 0 2px 4px rgba(0, 0, 0, 0.1);\n}\n.progress-bar__fill[_ngcontent-%COMP%] {\n  height: 100%;\n  background-color: var(--color-primary);\n  transition: width 0.3s ease-out;\n  position: relative;\n  min-width: 4px;\n}\n.progress-bar__label[_ngcontent-%COMP%] {\n  font-size: 0.75rem;\n  font-weight: 700;\n  color: var(--text-primary);\n  min-width: 40px;\n  text-align: right;\n  font-family: 1rem;\n}\n.progress-bar--sm[_ngcontent-%COMP%]   .progress-bar__track[_ngcontent-%COMP%] {\n  height: 12px;\n  border-width: 2px solid var(--border-color);\n}\n.progress-bar--sm[_ngcontent-%COMP%]   .progress-bar__label[_ngcontent-%COMP%] {\n  font-size: 0.75rem;\n  min-width: 32px;\n}\n.progress-bar--md[_ngcontent-%COMP%]   .progress-bar__track[_ngcontent-%COMP%] {\n  height: 20px;\n}\n.progress-bar--lg[_ngcontent-%COMP%]   .progress-bar__track[_ngcontent-%COMP%] {\n  height: 28px;\n}\n.progress-bar--lg[_ngcontent-%COMP%]   .progress-bar__label[_ngcontent-%COMP%] {\n  font-size: 0.875rem;\n  min-width: 48px;\n}\n.progress-bar--primary[_ngcontent-%COMP%]   .progress-bar__fill[_ngcontent-%COMP%] {\n  background-color: var(--color-primary);\n}\n.progress-bar--secondary[_ngcontent-%COMP%]   .progress-bar__fill[_ngcontent-%COMP%] {\n  background-color: var(--color-secondary);\n}\n.progress-bar--success[_ngcontent-%COMP%]   .progress-bar__fill[_ngcontent-%COMP%] {\n  background-color: #AAD661;\n}\n.progress-bar--warning[_ngcontent-%COMP%]   .progress-bar__fill[_ngcontent-%COMP%] {\n  background-color: #FFC047;\n}\n.progress-bar--error[_ngcontent-%COMP%]   .progress-bar__fill[_ngcontent-%COMP%] {\n  background-color: #E04A4A;\n}\n.progress-bar--indeterminate[_ngcontent-%COMP%]   .progress-bar__fill[_ngcontent-%COMP%] {\n  width: 30% !important;\n  animation: _ngcontent-%COMP%_indeterminate 1.5s ease-in-out infinite;\n}\n@keyframes _ngcontent-%COMP%_indeterminate {\n  0% {\n    transform: translateX(-100%);\n  }\n  100% {\n    transform: translateX(400%);\n  }\n}\n.progress-bar--striped[_ngcontent-%COMP%]   .progress-bar__fill[_ngcontent-%COMP%] {\n  background-image:\n    linear-gradient(\n      45deg,\n      rgba(255, 255, 255, 0.15) 25%,\n      transparent 25%,\n      transparent 50%,\n      rgba(255, 255, 255, 0.15) 50%,\n      rgba(255, 255, 255, 0.15) 75%,\n      transparent 75%,\n      transparent);\n  background-size: 24px 24px;\n  animation: _ngcontent-%COMP%_stripe-move 1s linear infinite;\n}\n@keyframes _ngcontent-%COMP%_stripe-move {\n  0% {\n    background-position: 0 0;\n  }\n  100% {\n    background-position: 24px 0;\n  }\n}\n@media (max-width: 768px) {\n  .progress-bar--lg[_ngcontent-%COMP%]   .progress-bar__track[_ngcontent-%COMP%] {\n    height: 16px;\n  }\n  .progress-bar--lg[_ngcontent-%COMP%]   .progress-bar__label[_ngcontent-%COMP%] {\n    font-size: 0.75rem;\n  }\n}\n/*# sourceMappingURL=progress-bar.css.map */'] });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(ProgressBar, [{
    type: Component,
    args: [{ selector: "app-progress-bar", standalone: true, imports: [CommonModule], template: '<div [class]="containerClasses" role="progressbar"\n     [attr.aria-valuenow]="isIndeterminate ? null : currentValue"\n     [attr.aria-valuemin]="0"\n     [attr.aria-valuemax]="100">\n\n  <div class="progress-bar__track">\n    <div class="progress-bar__fill" [style.width.%]="isIndeterminate ? 30 : currentValue"></div>\n  </div>\n\n  @if (showLabel && !isIndeterminate) {\n  <span class="progress-bar__label">\n    {{ labelText }}\n  </span>\n  }\n</div>\n', styles: ['@charset "UTF-8";\n\n/* src/app/components/shared/progress-bar/progress-bar.scss */\n:host {\n  display: block;\n  width: 100%;\n  max-width: 100%;\n  min-width: 0;\n}\n.progress-bar {\n  display: flex;\n  flex-direction: row;\n  gap: 1rem;\n  align-items: center;\n  width: 100%;\n}\n.progress-bar__track {\n  flex: 1;\n  height: 20px;\n  background-color: var(--bg-primary);\n  border: 3px solid var(--border-color) solid var(--border-color);\n  overflow: hidden;\n  position: relative;\n  box-shadow: inset 0 2px 4px rgba(0, 0, 0, 0.1);\n}\n.progress-bar__fill {\n  height: 100%;\n  background-color: var(--color-primary);\n  transition: width 0.3s ease-out;\n  position: relative;\n  min-width: 4px;\n}\n.progress-bar__label {\n  font-size: 0.75rem;\n  font-weight: 700;\n  color: var(--text-primary);\n  min-width: 40px;\n  text-align: right;\n  font-family: 1rem;\n}\n.progress-bar--sm .progress-bar__track {\n  height: 12px;\n  border-width: 2px solid var(--border-color);\n}\n.progress-bar--sm .progress-bar__label {\n  font-size: 0.75rem;\n  min-width: 32px;\n}\n.progress-bar--md .progress-bar__track {\n  height: 20px;\n}\n.progress-bar--lg .progress-bar__track {\n  height: 28px;\n}\n.progress-bar--lg .progress-bar__label {\n  font-size: 0.875rem;\n  min-width: 48px;\n}\n.progress-bar--primary .progress-bar__fill {\n  background-color: var(--color-primary);\n}\n.progress-bar--secondary .progress-bar__fill {\n  background-color: var(--color-secondary);\n}\n.progress-bar--success .progress-bar__fill {\n  background-color: #AAD661;\n}\n.progress-bar--warning .progress-bar__fill {\n  background-color: #FFC047;\n}\n.progress-bar--error .progress-bar__fill {\n  background-color: #E04A4A;\n}\n.progress-bar--indeterminate .progress-bar__fill {\n  width: 30% !important;\n  animation: indeterminate 1.5s ease-in-out infinite;\n}\n@keyframes indeterminate {\n  0% {\n    transform: translateX(-100%);\n  }\n  100% {\n    transform: translateX(400%);\n  }\n}\n.progress-bar--striped .progress-bar__fill {\n  background-image:\n    linear-gradient(\n      45deg,\n      rgba(255, 255, 255, 0.15) 25%,\n      transparent 25%,\n      transparent 50%,\n      rgba(255, 255, 255, 0.15) 50%,\n      rgba(255, 255, 255, 0.15) 75%,\n      transparent 75%,\n      transparent);\n  background-size: 24px 24px;\n  animation: stripe-move 1s linear infinite;\n}\n@keyframes stripe-move {\n  0% {\n    background-position: 0 0;\n  }\n  100% {\n    background-position: 24px 0;\n  }\n}\n@media (max-width: 768px) {\n  .progress-bar--lg .progress-bar__track {\n    height: 16px;\n  }\n  .progress-bar--lg .progress-bar__label {\n    font-size: 0.75rem;\n  }\n}\n/*# sourceMappingURL=progress-bar.css.map */\n'] }]
  }], null, { value: [{
    type: Input
  }], indeterminate: [{
    type: Input
  }], showLabel: [{
    type: Input
  }], size: [{
    type: Input
  }], variant: [{
    type: Input
  }], useService: [{
    type: Input
  }], label: [{
    type: Input
  }], striped: [{
    type: Input
  }] });
})();
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(ProgressBar, { className: "ProgressBar", filePath: "src/app/components/shared/progress-bar/progress-bar.ts", lineNumber: 36 });
})();

// src/app/services/notification.ts
var NotificationService = class _NotificationService {
  appRef;
  injector;
  /**
   * Lista de notificaciones activas en el DOM
   * Almacena ComponentRef para poder destruirlas después
   */
  notifications = [];
  /**
   * Subject para emitir eventos de notificaciones
   * Permite a otros servicios/componentes escuchar cuando se muestran notificaciones
   */
  notificationSubject = new Subject();
  /**
   * Observable público para subscripciones externas
   */
  notification$ = this.notificationSubject.asObservable();
  constructor(appRef, injector) {
    this.appRef = appRef;
    this.injector = injector;
  }
  /**
   * MÉTODO PRINCIPAL: Mostrar notificación
   *
   * WORKFLOW:
   * 1. Crear componente dinámicamente con createComponent()
   * 2. Configurar inputs del componente (type, title, message, etc.)
   * 3. Subscribirse al evento dismissed del componente
   * 4. Añadir al árbol de Angular (attachView)
   * 5. Manipular DOM: appendChild al body
   * 6. Emitir evento en el Subject para observadores
   * 7. Guardar referencia para limpieza posterior
   *
   * @param config - Configuración de la notificación
   *
   * @example
   * ```typescript
   * notificationService.show({
   *   type: 'success',
   *   title: 'Guardado',
   *   message: 'Los cambios se guardaron correctamente',
   *   duration: 5000,
   *   position: 'top-right'
   * });
   * ```
   */
  show(config) {
    const componentRef = createComponent(Notification, {
      environmentInjector: this.injector
    });
    componentRef.setInput("type", config.type);
    componentRef.setInput("title", config.title);
    componentRef.setInput("message", config.message);
    componentRef.setInput("position", config.position || "top-right");
    componentRef.setInput("duration", config.duration || 5e3);
    componentRef.setInput("autoDismiss", config.autoDismiss !== false);
    if (config.icon) {
      componentRef.setInput("icon", config.icon);
    }
    componentRef.instance.dismissed.subscribe(() => {
      this.remove(componentRef);
    });
    this.appRef.attachView(componentRef.hostView);
    const domElem = componentRef.hostView.rootNodes[0];
    domElem.style.setProperty("--notification-duration", `${config.duration || 5e3}ms`);
    domElem.style.position = "fixed";
    if (config.position?.includes("right")) {
      domElem.style.right = "2rem";
    } else {
      domElem.style.left = "2rem";
    }
    domElem.style.visibility = "hidden";
    document.body.appendChild(domElem);
    this.notificationSubject.next(config);
    this.notifications.push(componentRef);
    requestAnimationFrame(() => {
      componentRef.changeDetectorRef.detectChanges();
      requestAnimationFrame(() => {
        this.updatePositions();
        domElem.style.visibility = "visible";
      });
    });
  }
  /**
   * MÉTODO PRIVADO: Eliminar notificación del DOM
   *
   * WORKFLOW:
   * 1. Obtener elemento HTML del ComponentRef
   * 2. Manipular DOM: removeChild del parent
   * 3. Desconectar de Angular (detachView)
   * 4. Destruir componente (destroy)
   * 5. Remover de la lista de notificaciones activas
   *
   * @param componentRef - Referencia al componente a eliminar
   */
  remove(componentRef) {
    const domElem = componentRef.hostView.rootNodes[0];
    if (domElem && domElem.parentNode) {
      domElem.parentNode.removeChild(domElem);
    }
    this.appRef.detachView(componentRef.hostView);
    componentRef.destroy();
    const index = this.notifications.indexOf(componentRef);
    if (index !== -1) {
      this.notifications.splice(index, 1);
    }
    if (this.notifications.length > 0) {
      this.updatePositions();
    }
  }
  /**
   * MÉTODO PRIVADO: Actualizar posiciones de todas las notificaciones
   *
   * LÓGICA DE APILAMIENTO:
   * - Top positions (top-right, top-left):
   *   * Más antigua arriba (índice 0)
   *   * Más nueva abajo (último índice)
   *   * Cada notificación se desplaza hacia abajo sumando alturas
   * - Bottom positions (bottom-right, bottom-left):
   *   * Más antigua abajo (índice 0)
   *   * Más nueva arriba (último índice)
   *   * Cada notificación se desplaza hacia arriba sumando alturas
   *
   * WORKFLOW:
   * 1. Agrupar notificaciones por posición
   * 2. Para cada grupo, calcular offset acumulativo
   * 3. Aplicar offset como inline style al DOM
   */
  updatePositions() {
    const grouped = {};
    this.notifications.forEach((ref) => {
      const position = ref.instance.position || "top-right";
      if (!grouped[position])
        grouped[position] = [];
      grouped[position].push(ref);
    });
    const INITIAL_OFFSET = 20;
    const GAP = 12;
    const DEFAULT_HEIGHT = 80;
    Object.keys(grouped).forEach((posKey) => {
      const group = grouped[posKey];
      let currentOffset = INITIAL_OFFSET;
      group.forEach((ref, index) => {
        const hostElem = ref.hostView.rootNodes[0];
        if (!hostElem) {
          return;
        }
        const domElem = hostElem.querySelector(".notification");
        if (!domElem) {
          return;
        }
        const rect = domElem.getBoundingClientRect();
        const elementHeight = rect.height > 0 ? rect.height : DEFAULT_HEIGHT;
        domElem.style.transition = "top 0.3s ease, bottom 0.3s ease";
        if (posKey.startsWith("top")) {
          domElem.style.top = `${currentOffset}px`;
          domElem.style.bottom = "auto";
        } else {
          domElem.style.bottom = `${currentOffset}px`;
          domElem.style.top = "auto";
        }
        currentOffset += elementHeight + GAP;
      });
    });
  }
  /**
   * Limpiar todas las notificaciones activas
   * Útil al navegar entre páginas o al cerrar sesión
   *
   * @example
   * ```typescript
   * // Al cerrar sesión
   * notificationService.clearAll();
   * ```
   */
  clearAll() {
    this.notifications.forEach((ref) => {
      const domElem = ref.hostView.rootNodes[0];
      if (domElem && domElem.parentNode) {
        domElem.parentNode.removeChild(domElem);
      }
      this.appRef.detachView(ref.hostView);
      ref.destroy();
    });
    this.notifications = [];
  }
  // ==========================================================================
  // MÉTODOS DE CONVENIENCIA
  // Proporcionan API simple para los casos más comunes
  // ==========================================================================
  /**
   * Mostrar notificación de ÉXITO
   *
   * @param title - Título de la notificación
   * @param message - Mensaje descriptivo
   * @param duration - Duración en ms (default: 5000)
   *
   * @example
   * ```typescript
   * notificationService.success('Guardado', 'Los cambios se guardaron correctamente');
   * ```
   */
  success(title, message, duration = 5e3) {
    this.show({
      type: "success",
      title,
      message,
      duration,
      position: "top-right"
    });
  }
  /**
   * Mostrar notificación de ERROR
   * Por defecto dura más tiempo (8000ms) para asegurar que el usuario la vea
   *
   * @param title - Título del error
   * @param message - Mensaje descriptivo del error
   * @param duration - Duración en ms (default: 8000)
   *
   * @example
   * ```typescript
   * notificationService.error('Error', 'No se pudo guardar el álbum', 10000);
   * ```
   */
  error(title, message, duration = 8e3) {
    this.show({
      type: "error",
      title,
      message,
      duration,
      position: "top-right"
    });
  }
  /**
   * Mostrar notificación de ADVERTENCIA
   *
   * @param title - Título de la advertencia
   * @param message - Mensaje descriptivo
   * @param duration - Duración en ms (default: 6000)
   *
   * @example
   * ```typescript
   * notificationService.warning('Atención', 'Este álbum ya está en favoritos');
   * ```
   */
  warning(title, message, duration = 6e3) {
    this.show({
      type: "warning",
      title,
      message,
      duration,
      position: "top-right"
    });
  }
  /**
   * Mostrar notificación INFORMATIVA
   *
   * @param title - Título de la información
   * @param message - Mensaje descriptivo
   * @param duration - Duración en ms (default: 5000)
   *
   * @example
   * ```typescript
   * notificationService.info('Actualización', 'Hay 3 álbumes nuevos disponibles');
   * ```
   */
  info(title, message, duration = 5e3) {
    this.show({
      type: "info",
      title,
      message,
      duration,
      position: "top-right"
    });
  }
  /**
   * Mostrar notificación PERSISTENTE (sin auto-dismiss)
   * El usuario debe cerrarla manualmente
   *
   * @param type - Tipo de notificación
   * @param title - Título
   * @param message - Mensaje
   *
   * @example
   * ```typescript
   * // Para errores críticos que requieren acción del usuario
   * notificationService.persistent('error', 'Conexión perdida', 'No se puede conectar al servidor');
   * ```
   */
  persistent(type, title, message) {
    this.show({
      type,
      title,
      message,
      autoDismiss: false
      // No se cierra automáticamente
    });
  }
  /**
   * Obtener número de notificaciones activas
   * Útil para debugging o mostrar contador
   *
   * @returns Cantidad de notificaciones en pantalla
   */
  getActiveCount() {
    return this.notifications.length;
  }
  static \u0275fac = function NotificationService_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _NotificationService)(\u0275\u0275inject(ApplicationRef), \u0275\u0275inject(EnvironmentInjector));
  };
  static \u0275prov = /* @__PURE__ */ \u0275\u0275defineInjectable({ token: _NotificationService, factory: _NotificationService.\u0275fac, providedIn: "root" });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(NotificationService, [{
    type: Injectable,
    args: [{
      providedIn: "root"
    }]
  }], () => [{ type: ApplicationRef }, { type: EnvironmentInjector }], null);
})();

// src/app/services/style-guide-navigation.ts
var StyleGuideNavigationService = class _StyleGuideNavigationService {
  // Sección activa
  activeSection = signal("foundations", ...ngDevMode ? [{ debugName: "activeSection" }] : []);
  // Cambiar sección
  setSection(section) {
    this.activeSection.set(section);
  }
  static \u0275fac = function StyleGuideNavigationService_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _StyleGuideNavigationService)();
  };
  static \u0275prov = /* @__PURE__ */ \u0275\u0275defineInjectable({ token: _StyleGuideNavigationService, factory: _StyleGuideNavigationService.\u0275fac, providedIn: "root" });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(StyleGuideNavigationService, [{
    type: Injectable,
    args: [{
      providedIn: "root"
    }]
  }], null, null);
})();

// src/app/pages/style-guide/style-guide.ts
var _c06 = ["demoCarousel"];
var _c12 = () => ["Progressive Rock", "Psychedelic"];
var _c2 = () => ["Hard Rock", "Blues Rock", "Heavy Metal"];
var _c3 = () => ["Rock", "Pop Rock"];
var _forTrack02 = ($index, $item) => $item.id;
function StyleGuide_Conditional_27_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "section", 11)(1, "h2");
    \u0275\u0275text(2, "Fundamentos del Sistema de Dise\xF1o");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "p", 13);
    \u0275\u0275text(4, " Variables CSS, tipograf\xEDa, colores y espaciado que definen la identidad visual de Disc and Records. ");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(5, "div", 14)(6, "h3");
    \u0275\u0275text(7, "Tipograf\xEDa");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(8, "div", 15)(9, "div", 16)(10, "h4");
    \u0275\u0275text(11, "Space Grotesk");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(12, "span", 17);
    \u0275\u0275text(13, "Fuente Principal");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(14, "div", 18)(15, "div", 19)(16, "span", 20);
    \u0275\u0275text(17, "Heading 1 (68px)");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(18, "h1");
    \u0275\u0275text(19, "Disc and Records");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(20, "div", 19)(21, "span", 20);
    \u0275\u0275text(22, "Heading 2 (42px)");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(23, "h2");
    \u0275\u0275text(24, "La m\xFAsica que marc\xF3 una \xE9poca");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(25, "div", 19)(26, "span", 20);
    \u0275\u0275text(27, "Heading 3 (26px)");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(28, "h3");
    \u0275\u0275text(29, "Explora nuestra colecci\xF3n");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(30, "div", 19)(31, "span", 20);
    \u0275\u0275text(32, "P\xE1rrafo (16px)");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(33, "p");
    \u0275\u0275text(34, "Textos de cuerpo, descripciones de productos, contenido general. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Perfecta legibilidad para lectura extendida.");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(35, "div", 19)(36, "span", 20);
    \u0275\u0275text(37, "Peque\xF1o (14px)");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(38, "p", 21);
    \u0275\u0275text(39, "Subt\xEDtulos, notas y textos secundarios");
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(40, "div", 22)(41, "strong");
    \u0275\u0275text(42, "Uso:");
    \u0275\u0275elementEnd();
    \u0275\u0275text(43, " Textos generales, t\xEDtulos, botones, navegaci\xF3n, formularios ");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(44, "div", 15)(45, "div", 16)(46, "h4");
    \u0275\u0275text(47, "Monoton");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(48, "span", 23);
    \u0275\u0275text(49, "Fuente Display");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(50, "div", 24)(51, "div", 19)(52, "span", 20);
    \u0275\u0275text(53, "Grande (64px)");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(54, "div", 25);
    \u0275\u0275text(55, "D&R");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(56, "div", 19)(57, "span", 20);
    \u0275\u0275text(58, "Mediano (48px)");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(59, "div", 26);
    \u0275\u0275text(60, "RETRO");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(61, "div", 19)(62, "span", 20);
    \u0275\u0275text(63, "Peque\xF1o (32px)");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(64, "div", 27);
    \u0275\u0275text(65, "70s VIBES");
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(66, "div", 22)(67, "strong");
    \u0275\u0275text(68, "Uso:");
    \u0275\u0275elementEnd();
    \u0275\u0275text(69, " Logo, t\xEDtulos decorativos, elementos destacados con est\xE9tica retro/70s ");
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(70, "div", 14)(71, "h3");
    \u0275\u0275text(72, "Paleta de Colores 70s");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(73, "p", 13);
    \u0275\u0275text(74, " Colores principales del modo claro (c\xE1lidos) y oscuro (fr\xEDos). Ambas paletas siempre visibles. ");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(75, "h4", 28);
    \u0275\u0275text(76, "Modo Light (C\xE1lidos)");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(77, "div", 29)(78, "div", 30);
    \u0275\u0275element(79, "div", 31);
    \u0275\u0275elementStart(80, "div", 32)(81, "div", 33);
    \u0275\u0275text(82, "Primario");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(83, "div", 34);
    \u0275\u0275text(84, "#ED9C05");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(85, "code");
    \u0275\u0275text(86, "$color-primario-light");
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(87, "div", 30);
    \u0275\u0275element(88, "div", 35);
    \u0275\u0275elementStart(89, "div", 32)(90, "div", 33);
    \u0275\u0275text(91, "Secundario");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(92, "div", 34);
    \u0275\u0275text(93, "#CA6703");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(94, "code");
    \u0275\u0275text(95, "$color-secundario-light");
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(96, "div", 30);
    \u0275\u0275element(97, "div", 36);
    \u0275\u0275elementStart(98, "div", 32)(99, "div", 33);
    \u0275\u0275text(100, "Contraste");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(101, "div", 34);
    \u0275\u0275text(102, "#BB3F03");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(103, "code");
    \u0275\u0275text(104, "$color-contraste-light");
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(105, "div", 30);
    \u0275\u0275element(106, "div", 37);
    \u0275\u0275elementStart(107, "div", 32)(108, "div", 33);
    \u0275\u0275text(109, "Acentuado");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(110, "div", 34);
    \u0275\u0275text(111, "#9D2227");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(112, "code");
    \u0275\u0275text(113, "$color-acentuado-light");
    \u0275\u0275elementEnd()()()();
    \u0275\u0275elementStart(114, "h4", 28);
    \u0275\u0275text(115, "Modo Dark (Fr\xEDos)");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(116, "div", 29)(117, "div", 30);
    \u0275\u0275element(118, "div", 38);
    \u0275\u0275elementStart(119, "div", 32)(120, "div", 33);
    \u0275\u0275text(121, "Primario");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(122, "div", 34);
    \u0275\u0275text(123, "#93CFBB");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(124, "code");
    \u0275\u0275text(125, "$color-primario-dark");
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(126, "div", 30);
    \u0275\u0275element(127, "div", 39);
    \u0275\u0275elementStart(128, "div", 32)(129, "div", 33);
    \u0275\u0275text(130, "Secundario");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(131, "div", 34);
    \u0275\u0275text(132, "#0A9295");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(133, "code");
    \u0275\u0275text(134, "$color-secundario-dark");
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(135, "div", 30);
    \u0275\u0275element(136, "div", 40);
    \u0275\u0275elementStart(137, "div", 32)(138, "div", 33);
    \u0275\u0275text(139, "Contraste");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(140, "div", 34);
    \u0275\u0275text(141, "#015F72");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(142, "code");
    \u0275\u0275text(143, "$color-contraste-dark");
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(144, "div", 30);
    \u0275\u0275element(145, "div", 41);
    \u0275\u0275elementStart(146, "div", 32)(147, "div", 33);
    \u0275\u0275text(148, "Acentuado");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(149, "div", 34);
    \u0275\u0275text(150, "#01131B");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(151, "code");
    \u0275\u0275text(152, "$color-acentuado-dark");
    \u0275\u0275elementEnd()()()();
    \u0275\u0275elementStart(153, "h4", 28);
    \u0275\u0275text(154, "Fondos y Textos");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(155, "div", 29)(156, "div", 30);
    \u0275\u0275element(157, "div", 42);
    \u0275\u0275elementStart(158, "div", 32)(159, "div", 33);
    \u0275\u0275text(160, "Fondo Light");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(161, "div", 34);
    \u0275\u0275text(162, "#FBFAF2");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(163, "code");
    \u0275\u0275text(164, "$color-fondo-light");
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(165, "div", 30);
    \u0275\u0275element(166, "div", 43);
    \u0275\u0275elementStart(167, "div", 32)(168, "div", 33);
    \u0275\u0275text(169, "Fondo Light 2\xBA");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(170, "div", 34);
    \u0275\u0275text(171, "#E7D8AB");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(172, "code");
    \u0275\u0275text(173, "$color-fondo-light-secundario");
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(174, "div", 30);
    \u0275\u0275element(175, "div", 41);
    \u0275\u0275elementStart(176, "div", 32)(177, "div", 33);
    \u0275\u0275text(178, "Fondo Oscuro");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(179, "div", 34);
    \u0275\u0275text(180, "#01131B");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(181, "code");
    \u0275\u0275text(182, "$color-fondo-oscuro");
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(183, "div", 30);
    \u0275\u0275element(184, "div", 44);
    \u0275\u0275elementStart(185, "div", 32)(186, "div", 33);
    \u0275\u0275text(187, "Fondo Oscuro 2\xBA");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(188, "div", 34);
    \u0275\u0275text(189, "#013946");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(190, "code");
    \u0275\u0275text(191, "$color-fondo-oscuro-secundario");
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(192, "div", 30);
    \u0275\u0275element(193, "div", 42);
    \u0275\u0275elementStart(194, "div", 32)(195, "div", 33);
    \u0275\u0275text(196, "Letra Blanca");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(197, "div", 34);
    \u0275\u0275text(198, "#FBFAF2");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(199, "code");
    \u0275\u0275text(200, "$color-letra-blanca");
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(201, "div", 30);
    \u0275\u0275element(202, "div", 41);
    \u0275\u0275elementStart(203, "div", 32)(204, "div", 33);
    \u0275\u0275text(205, "Letra Oscura");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(206, "div", 34);
    \u0275\u0275text(207, "#01131B");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(208, "code");
    \u0275\u0275text(209, "$color-letra-oscura");
    \u0275\u0275elementEnd()()()()();
    \u0275\u0275elementStart(210, "div", 14)(211, "h3");
    \u0275\u0275text(212, "Colores Sem\xE1nticos");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(213, "div", 45)(214, "div", 30);
    \u0275\u0275element(215, "div", 46);
    \u0275\u0275elementStart(216, "div", 32)(217, "div", 33);
    \u0275\u0275text(218, "Error");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(219, "div", 34);
    \u0275\u0275text(220, "#E04A4A");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(221, "code");
    \u0275\u0275text(222, "$color-error");
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(223, "div", 30);
    \u0275\u0275element(224, "div", 47);
    \u0275\u0275elementStart(225, "div", 32)(226, "div", 33);
    \u0275\u0275text(227, "Advertencia Light");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(228, "div", 34);
    \u0275\u0275text(229, "#FFC047");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(230, "code");
    \u0275\u0275text(231, "$color-advertencia-light");
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(232, "div", 30);
    \u0275\u0275element(233, "div", 48);
    \u0275\u0275elementStart(234, "div", 32)(235, "div", 33);
    \u0275\u0275text(236, "Advertencia Dark");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(237, "div", 34);
    \u0275\u0275text(238, "#FEF84A");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(239, "code");
    \u0275\u0275text(240, "$color-advertencia-dark");
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(241, "div", 30);
    \u0275\u0275element(242, "div", 49);
    \u0275\u0275elementStart(243, "div", 32)(244, "div", 33);
    \u0275\u0275text(245, "\xC9xito");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(246, "div", 34);
    \u0275\u0275text(247, "#AAD661");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(248, "code");
    \u0275\u0275text(249, "$color-exito");
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(250, "div", 30);
    \u0275\u0275element(251, "div", 39);
    \u0275\u0275elementStart(252, "div", 32)(253, "div", 33);
    \u0275\u0275text(254, "Informaci\xF3n");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(255, "div", 34);
    \u0275\u0275text(256, "#0A9295");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(257, "code");
    \u0275\u0275text(258, "$color-informacion");
    \u0275\u0275elementEnd()()()()();
    \u0275\u0275elementStart(259, "div", 14)(260, "h3");
    \u0275\u0275text(261, "Sombras Brutales");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(262, "p", 13);
    \u0275\u0275text(263, " Sombras s\xF3lidas sin blur, caracter\xEDsticas del estilo neobrutalist y la est\xE9tica retro 70s. ");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(264, "div", 50)(265, "div", 51)(266, "div", 52);
    \u0275\u0275text(267, " Box ");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(268, "code");
    \u0275\u0275text(269, "brutal-xs");
    \u0275\u0275element(270, "br");
    \u0275\u0275text(271, "2px 2px 0px");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(272, "div", 51)(273, "div", 53);
    \u0275\u0275text(274, " Box ");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(275, "code");
    \u0275\u0275text(276, "brutal-s");
    \u0275\u0275element(277, "br");
    \u0275\u0275text(278, "4px 4px 0px");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(279, "div", 51)(280, "div", 54);
    \u0275\u0275text(281, " Box ");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(282, "code");
    \u0275\u0275text(283, "brutal-m");
    \u0275\u0275element(284, "br");
    \u0275\u0275text(285, "6px 6px 0px");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(286, "div", 51)(287, "div", 55);
    \u0275\u0275text(288, " Box ");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(289, "code");
    \u0275\u0275text(290, "brutal-l");
    \u0275\u0275element(291, "br");
    \u0275\u0275text(292, "8px 8px 0px");
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(293, "h4", 56);
    \u0275\u0275text(294, "Sombras Efecto Vinilo");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(295, "p", 13);
    \u0275\u0275text(296, " Sombras multicapa con colores de la paleta 70s, efecto 3D retro. ");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(297, "div", 50)(298, "div", 51)(299, "div", 57);
    \u0275\u0275text(300, " Box ");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(301, "code");
    \u0275\u0275text(302, "vinilo-s");
    \u0275\u0275element(303, "br");
    \u0275\u0275text(304, "2 capas");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(305, "div", 51)(306, "div", 58);
    \u0275\u0275text(307, " Box ");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(308, "code");
    \u0275\u0275text(309, "vinilo-m");
    \u0275\u0275element(310, "br");
    \u0275\u0275text(311, "3 capas");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(312, "div", 51)(313, "div", 59);
    \u0275\u0275text(314, " Box ");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(315, "code");
    \u0275\u0275text(316, "vinilo-l");
    \u0275\u0275element(317, "br");
    \u0275\u0275text(318, "4 capas");
    \u0275\u0275elementEnd()()()();
    \u0275\u0275elementStart(319, "div", 14)(320, "h3");
    \u0275\u0275text(321, "Espaciado");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(322, "p", 13);
    \u0275\u0275text(323, " Sistema de espaciado coherente para mantener ritmo visual en toda la aplicaci\xF3n. ");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(324, "div", 60)(325, "div", 61)(326, "div", 62);
    \u0275\u0275element(327, "div", 63);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(328, "div", 64)(329, "div", 65);
    \u0275\u0275text(330, "XS");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(331, "div", 66);
    \u0275\u0275text(332, "0.5rem (8px)");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(333, "code");
    \u0275\u0275text(334, "$espaciado-xs");
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(335, "div", 61)(336, "div", 62);
    \u0275\u0275element(337, "div", 67);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(338, "div", 64)(339, "div", 65);
    \u0275\u0275text(340, "S");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(341, "div", 66);
    \u0275\u0275text(342, "1rem (16px)");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(343, "code");
    \u0275\u0275text(344, "$espaciado-s");
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(345, "div", 61)(346, "div", 62);
    \u0275\u0275element(347, "div", 68);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(348, "div", 64)(349, "div", 65);
    \u0275\u0275text(350, "M");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(351, "div", 66);
    \u0275\u0275text(352, "2rem (32px)");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(353, "code");
    \u0275\u0275text(354, "$espaciado-m");
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(355, "div", 61)(356, "div", 62);
    \u0275\u0275element(357, "div", 69);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(358, "div", 64)(359, "div", 65);
    \u0275\u0275text(360, "L");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(361, "div", 66);
    \u0275\u0275text(362, "3rem (48px)");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(363, "code");
    \u0275\u0275text(364, "$espaciado-l");
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(365, "div", 61)(366, "div", 62);
    \u0275\u0275element(367, "div", 70);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(368, "div", 64)(369, "div", 65);
    \u0275\u0275text(370, "XL");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(371, "div", 66);
    \u0275\u0275text(372, "4rem (64px)");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(373, "code");
    \u0275\u0275text(374, "$espaciado-xl");
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(375, "div", 61)(376, "div", 62);
    \u0275\u0275element(377, "div", 71);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(378, "div", 64)(379, "div", 65);
    \u0275\u0275text(380, "XXL");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(381, "div", 66);
    \u0275\u0275text(382, "5rem (80px)");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(383, "code");
    \u0275\u0275text(384, "$espaciado-xxl");
    \u0275\u0275elementEnd()()()()()();
  }
}
function StyleGuide_Conditional_28_Template(rf, ctx) {
  if (rf & 1) {
    const _r1 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "section", 11)(1, "h2");
    \u0275\u0275text(2, "\xC1tomos");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "p", 13);
    \u0275\u0275text(4, " Los elementos m\xE1s b\xE1sicos: botones, spinners, barras de progreso y badges. ");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(5, "div", 14)(6, "h3");
    \u0275\u0275text(7, "Botones - Variantes");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(8, "div", 50)(9, "div", 72)(10, "app-button", 73);
    \u0275\u0275listener("clicked", function StyleGuide_Conditional_28_Template_app_button_clicked_10_listener() {
      \u0275\u0275restoreView(_r1);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.onButtonClick("primary", "md"));
    });
    \u0275\u0275text(11, " Primary ");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(12, "code");
    \u0275\u0275text(13, 'variant="primary"');
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(14, "div", 72)(15, "app-button", 74);
    \u0275\u0275listener("clicked", function StyleGuide_Conditional_28_Template_app_button_clicked_15_listener() {
      \u0275\u0275restoreView(_r1);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.onButtonClick("secondary", "md"));
    });
    \u0275\u0275text(16, " Secondary ");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(17, "code");
    \u0275\u0275text(18, 'variant="secondary"');
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(19, "div", 72)(20, "app-button", 75);
    \u0275\u0275listener("clicked", function StyleGuide_Conditional_28_Template_app_button_clicked_20_listener() {
      \u0275\u0275restoreView(_r1);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.onButtonClick("ghost", "md"));
    });
    \u0275\u0275text(21, " Ghost ");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(22, "code");
    \u0275\u0275text(23, 'variant="ghost"');
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(24, "div", 72)(25, "app-button", 76);
    \u0275\u0275listener("clicked", function StyleGuide_Conditional_28_Template_app_button_clicked_25_listener() {
      \u0275\u0275restoreView(_r1);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.onButtonClick("danger", "md"));
    });
    \u0275\u0275text(26, " Danger ");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(27, "code");
    \u0275\u0275text(28, 'variant="danger"');
    \u0275\u0275elementEnd()()()();
    \u0275\u0275elementStart(29, "div", 14)(30, "h3");
    \u0275\u0275text(31, "Botones - Tama\xF1os");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(32, "div", 50)(33, "div", 72)(34, "app-button", 77);
    \u0275\u0275listener("clicked", function StyleGuide_Conditional_28_Template_app_button_clicked_34_listener() {
      \u0275\u0275restoreView(_r1);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.onButtonClick("primary", "sm"));
    });
    \u0275\u0275text(35, " Small ");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(36, "code");
    \u0275\u0275text(37, 'size="sm"');
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(38, "div", 72)(39, "app-button", 78);
    \u0275\u0275listener("clicked", function StyleGuide_Conditional_28_Template_app_button_clicked_39_listener() {
      \u0275\u0275restoreView(_r1);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.onButtonClick("primary", "md"));
    });
    \u0275\u0275text(40, " Medium ");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(41, "code");
    \u0275\u0275text(42, 'size="md"');
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(43, "div", 72)(44, "app-button", 79);
    \u0275\u0275listener("clicked", function StyleGuide_Conditional_28_Template_app_button_clicked_44_listener() {
      \u0275\u0275restoreView(_r1);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.onButtonClick("primary", "lg"));
    });
    \u0275\u0275text(45, " Large ");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(46, "code");
    \u0275\u0275text(47, 'size="lg"');
    \u0275\u0275elementEnd()()()();
    \u0275\u0275elementStart(48, "div", 14)(49, "h3");
    \u0275\u0275text(50, "Botones - Estados");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(51, "div", 50)(52, "div", 72)(53, "app-button");
    \u0275\u0275text(54, "Normal");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(55, "code");
    \u0275\u0275text(56, "Estado por defecto");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(57, "div", 72)(58, "app-button", 80);
    \u0275\u0275text(59, "Disabled");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(60, "code");
    \u0275\u0275text(61, '[disabled]="true"');
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(62, "div", 72)(63, "app-button", 81);
    \u0275\u0275text(64, "Como enlace");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(65, "code");
    \u0275\u0275text(66, 'href="#"');
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(67, "div", 72)(68, "app-button", 82);
    \u0275\u0275text(69, "Loading");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(70, "code");
    \u0275\u0275text(71, '[loading]="true"');
    \u0275\u0275elementEnd()()()();
    \u0275\u0275elementStart(72, "div", 14)(73, "h3");
    \u0275\u0275text(74, "Botones - Full Width");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(75, "div", 83)(76, "div", 84)(77, "app-button", 85);
    \u0275\u0275listener("clicked", function StyleGuide_Conditional_28_Template_app_button_clicked_77_listener() {
      \u0275\u0275restoreView(_r1);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.onButtonClick("primary", "md"));
    });
    \u0275\u0275text(78, " Bot\xF3n a ancho completo ");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(79, "code");
    \u0275\u0275text(80, '[fullWidth]="true"');
    \u0275\u0275elementEnd()()()();
    \u0275\u0275elementStart(81, "div", 14)(82, "h3");
    \u0275\u0275text(83, "Spinner");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(84, "div", 50)(85, "div", 72);
    \u0275\u0275element(86, "app-spinner", 86);
    \u0275\u0275elementStart(87, "code");
    \u0275\u0275text(88, 'size="sm"');
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(89, "div", 72);
    \u0275\u0275element(90, "app-spinner", 87);
    \u0275\u0275elementStart(91, "code");
    \u0275\u0275text(92, 'size="md"');
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(93, "div", 72);
    \u0275\u0275element(94, "app-spinner", 88);
    \u0275\u0275elementStart(95, "code");
    \u0275\u0275text(96, 'size="lg"');
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(97, "div", 89)(98, "div", 72);
    \u0275\u0275element(99, "app-spinner", 90);
    \u0275\u0275elementStart(100, "code");
    \u0275\u0275text(101, 'color="primary"');
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(102, "div", 72);
    \u0275\u0275element(103, "app-spinner", 91);
    \u0275\u0275elementStart(104, "code");
    \u0275\u0275text(105, 'color="secondary"');
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(106, "div", 92);
    \u0275\u0275element(107, "app-spinner", 93);
    \u0275\u0275elementStart(108, "code", 94);
    \u0275\u0275text(109, 'color="white"');
    \u0275\u0275elementEnd()()()();
    \u0275\u0275elementStart(110, "div", 14)(111, "h3");
    \u0275\u0275text(112, "Spinner Global");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(113, "p", 13);
    \u0275\u0275text(114, " El spinner global muestra un overlay sobre toda la aplicaci\xF3n. ");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(115, "div", 50)(116, "div", 72)(117, "app-button", 95);
    \u0275\u0275listener("clicked", function StyleGuide_Conditional_28_Template_app_button_clicked_117_listener() {
      \u0275\u0275restoreView(_r1);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.showGlobalSpinner());
    });
    \u0275\u0275text(118, " Mostrar Spinner Global (2s) ");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(119, "code");
    \u0275\u0275text(120, "loadingService.start()");
    \u0275\u0275elementEnd()()()();
    \u0275\u0275elementStart(121, "div", 14)(122, "h3");
    \u0275\u0275text(123, "Barra de Progreso");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(124, "div", 83)(125, "div", 84);
    \u0275\u0275element(126, "app-progress-bar", 96);
    \u0275\u0275elementStart(127, "code");
    \u0275\u0275text(128, 'value="25" size="sm"');
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(129, "div", 84);
    \u0275\u0275element(130, "app-progress-bar", 97);
    \u0275\u0275elementStart(131, "code");
    \u0275\u0275text(132, 'value="50" size="md" showLabel');
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(133, "div", 84);
    \u0275\u0275element(134, "app-progress-bar", 98);
    \u0275\u0275elementStart(135, "code");
    \u0275\u0275text(136, 'value="75" size="lg" showLabel');
    \u0275\u0275elementEnd()()()();
    \u0275\u0275elementStart(137, "div", 14)(138, "h3");
    \u0275\u0275text(139, "Progress Bar - Variantes de Color");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(140, "div", 83)(141, "div", 84);
    \u0275\u0275element(142, "app-progress-bar", 99);
    \u0275\u0275elementStart(143, "code");
    \u0275\u0275text(144, 'variant="primary"');
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(145, "div", 84);
    \u0275\u0275element(146, "app-progress-bar", 100);
    \u0275\u0275elementStart(147, "code");
    \u0275\u0275text(148, 'variant="success"');
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(149, "div", 84);
    \u0275\u0275element(150, "app-progress-bar", 101);
    \u0275\u0275elementStart(151, "code");
    \u0275\u0275text(152, 'variant="warning"');
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(153, "div", 84);
    \u0275\u0275element(154, "app-progress-bar", 102);
    \u0275\u0275elementStart(155, "code");
    \u0275\u0275text(156, 'variant="error"');
    \u0275\u0275elementEnd()()()();
    \u0275\u0275elementStart(157, "div", 14)(158, "h3");
    \u0275\u0275text(159, "Progress Bar - Estados Especiales");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(160, "div", 83)(161, "div", 84);
    \u0275\u0275element(162, "app-progress-bar", 103);
    \u0275\u0275elementStart(163, "code");
    \u0275\u0275text(164, 'indeterminate="true" (animaci\xF3n continua)');
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(165, "div", 84);
    \u0275\u0275element(166, "app-progress-bar", 104);
    \u0275\u0275elementStart(167, "code");
    \u0275\u0275text(168, 'striped="true" (rayas animadas)');
    \u0275\u0275elementEnd()()()();
    \u0275\u0275elementStart(169, "div", 14)(170, "h3");
    \u0275\u0275text(171, "Demo Interactivo");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(172, "p", 13);
    \u0275\u0275text(173, " Simula una operaci\xF3n de carga con progreso. ");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(174, "div", 83)(175, "div", 84);
    \u0275\u0275element(176, "app-progress-bar", 105);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(177, "div", 89)(178, "div", 72)(179, "app-button", 106);
    \u0275\u0275listener("clicked", function StyleGuide_Conditional_28_Template_app_button_clicked_179_listener() {
      \u0275\u0275restoreView(_r1);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.startProgressDemo());
    });
    \u0275\u0275text(180);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(181, "div", 72)(182, "app-button", 107);
    \u0275\u0275listener("clicked", function StyleGuide_Conditional_28_Template_app_button_clicked_182_listener() {
      \u0275\u0275restoreView(_r1);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.resetProgressDemo());
    });
    \u0275\u0275text(183, " Reiniciar ");
    \u0275\u0275elementEnd()()()()();
    \u0275\u0275elementStart(184, "div", 14)(185, "h3");
    \u0275\u0275text(186, "Badges - Variantes");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(187, "div", 50)(188, "div", 72)(189, "app-badge", 108);
    \u0275\u0275text(190, "Primary");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(191, "code");
    \u0275\u0275text(192, 'variant="primary"');
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(193, "div", 72)(194, "app-badge", 109);
    \u0275\u0275text(195, "Secondary");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(196, "code");
    \u0275\u0275text(197, 'variant="secondary"');
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(198, "div", 72)(199, "app-badge", 110);
    \u0275\u0275text(200, "Success");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(201, "code");
    \u0275\u0275text(202, 'variant="success"');
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(203, "div", 72)(204, "app-badge", 111);
    \u0275\u0275text(205, "Warning");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(206, "code");
    \u0275\u0275text(207, 'variant="warning"');
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(208, "div", 72)(209, "app-badge", 112);
    \u0275\u0275text(210, "Error");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(211, "code");
    \u0275\u0275text(212, 'variant="error"');
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(213, "div", 72)(214, "app-badge", 113);
    \u0275\u0275text(215, "Info");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(216, "code");
    \u0275\u0275text(217, 'variant="info"');
    \u0275\u0275elementEnd()()()();
    \u0275\u0275elementStart(218, "div", 14)(219, "h3");
    \u0275\u0275text(220, "Badges - Tama\xF1os");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(221, "div", 50)(222, "div", 72)(223, "app-badge", 114);
    \u0275\u0275text(224, "Small");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(225, "code");
    \u0275\u0275text(226, 'size="sm"');
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(227, "div", 72)(228, "app-badge", 115);
    \u0275\u0275text(229, "Medium");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(230, "code");
    \u0275\u0275text(231, 'size="md"');
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(232, "div", 72)(233, "app-badge", 116);
    \u0275\u0275text(234, "Large");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(235, "code");
    \u0275\u0275text(236, 'size="lg"');
    \u0275\u0275elementEnd()()()();
    \u0275\u0275elementStart(237, "div", 14)(238, "h3");
    \u0275\u0275text(239, "Badges - Uso Pr\xE1ctico");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(240, "div", 50)(241, "div", 72)(242, "div", 117)(243, "app-badge", 108);
    \u0275\u0275text(244, "Rock");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(245, "app-badge", 109);
    \u0275\u0275text(246, "Jazz");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(247, "app-badge", 113);
    \u0275\u0275text(248, "Pop");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(249, "code");
    \u0275\u0275text(250, "G\xE9neros musicales");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(251, "div", 72)(252, "div", 118)(253, "span", 119);
    \u0275\u0275text(254, "Estado:");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(255, "app-badge", 110);
    \u0275\u0275text(256, "Disponible");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(257, "code");
    \u0275\u0275text(258, "Indicador de estado");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(259, "div", 72)(260, "div", 118)(261, "span", 119);
    \u0275\u0275text(262, "Notificaciones");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(263, "app-badge", 120);
    \u0275\u0275text(264, "5");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(265, "code");
    \u0275\u0275text(266, "Contador");
    \u0275\u0275elementEnd()()()();
    \u0275\u0275elementStart(267, "div", 14)(268, "h3");
    \u0275\u0275text(269, "Enlaces");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(270, "div", 50)(271, "div", 72)(272, "a", 121);
    \u0275\u0275text(273, "Enlace est\xE1ndar");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(274, "code");
    \u0275\u0275text(275, 'class="link"');
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(276, "div", 72)(277, "a", 122);
    \u0275\u0275text(278, "Enlace primario");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(279, "code");
    \u0275\u0275text(280, 'class="link link--primary"');
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(281, "div", 72)(282, "a", 123);
    \u0275\u0275text(283, "Enlace subrayado");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(284, "code");
    \u0275\u0275text(285, 'class="link link--underlined"');
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(286, "div", 72)(287, "a", 124);
    \u0275\u0275text(288, "Enlace con flecha \u2192");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(289, "code");
    \u0275\u0275text(290, 'class="link link--arrow"');
    \u0275\u0275elementEnd()()()();
    \u0275\u0275elementStart(291, "div", 14)(292, "h3");
    \u0275\u0275text(293, "Toggle Switch");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(294, "div", 50)(295, "div", 72)(296, "label", 125);
    \u0275\u0275element(297, "input", 126);
    \u0275\u0275elementStart(298, "span", 127);
    \u0275\u0275text(299, "Activar opci\xF3n");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(300, "code");
    \u0275\u0275text(301, "Toggle desactivado");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(302, "div", 72)(303, "label", 125);
    \u0275\u0275element(304, "input", 128);
    \u0275\u0275elementStart(305, "span", 127);
    \u0275\u0275text(306, "Opci\xF3n activada");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(307, "code");
    \u0275\u0275text(308, "Toggle activado");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(309, "div", 72)(310, "label", 129);
    \u0275\u0275element(311, "input", 130);
    \u0275\u0275elementStart(312, "span", 127);
    \u0275\u0275text(313, "Toggle deshabilitado");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(314, "code");
    \u0275\u0275text(315, "Toggle disabled");
    \u0275\u0275elementEnd()()()();
    \u0275\u0275elementStart(316, "div", 14)(317, "h3");
    \u0275\u0275text(318, "Checkbox");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(319, "div", 83)(320, "div", 72)(321, "label", 131);
    \u0275\u0275element(322, "input", 132);
    \u0275\u0275elementStart(323, "span", 133);
    \u0275\u0275text(324, "Opci\xF3n 1");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(325, "code");
    \u0275\u0275text(326, "Checkbox sin marcar");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(327, "div", 72)(328, "label", 131);
    \u0275\u0275element(329, "input", 134);
    \u0275\u0275elementStart(330, "span", 133);
    \u0275\u0275text(331, "Opci\xF3n 2 (marcada)");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(332, "code");
    \u0275\u0275text(333, "Checkbox marcado");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(334, "div", 72)(335, "label", 135);
    \u0275\u0275element(336, "input", 136);
    \u0275\u0275elementStart(337, "span", 133);
    \u0275\u0275text(338, "Opci\xF3n deshabilitada");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(339, "code");
    \u0275\u0275text(340, "Checkbox disabled");
    \u0275\u0275elementEnd()()()();
    \u0275\u0275elementStart(341, "div", 14)(342, "h3");
    \u0275\u0275text(343, "Radio Buttons");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(344, "div", 83)(345, "div", 72)(346, "label", 137);
    \u0275\u0275element(347, "input", 138);
    \u0275\u0275elementStart(348, "span", 139);
    \u0275\u0275text(349, "Opci\xF3n A (seleccionada)");
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(350, "div", 72)(351, "label", 137);
    \u0275\u0275element(352, "input", 140);
    \u0275\u0275elementStart(353, "span", 139);
    \u0275\u0275text(354, "Opci\xF3n B");
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(355, "div", 72)(356, "label", 137);
    \u0275\u0275element(357, "input", 140);
    \u0275\u0275elementStart(358, "span", 139);
    \u0275\u0275text(359, "Opci\xF3n C");
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(360, "div", 72)(361, "label", 141);
    \u0275\u0275element(362, "input", 142);
    \u0275\u0275elementStart(363, "span", 139);
    \u0275\u0275text(364, "Opci\xF3n deshabilitada");
    \u0275\u0275elementEnd()()()()()();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275advance(58);
    \u0275\u0275property("disabled", true);
    \u0275\u0275advance(10);
    \u0275\u0275property("loading", true);
    \u0275\u0275advance(9);
    \u0275\u0275property("fullWidth", true);
    \u0275\u0275advance(9);
    \u0275\u0275property("show", true);
    \u0275\u0275advance(4);
    \u0275\u0275property("show", true);
    \u0275\u0275advance(4);
    \u0275\u0275property("show", true);
    \u0275\u0275advance(5);
    \u0275\u0275property("show", true);
    \u0275\u0275advance(4);
    \u0275\u0275property("show", true);
    \u0275\u0275advance(4);
    \u0275\u0275property("show", true);
    \u0275\u0275advance(19);
    \u0275\u0275property("value", 25);
    \u0275\u0275advance(4);
    \u0275\u0275property("value", 50)("showLabel", true);
    \u0275\u0275advance(4);
    \u0275\u0275property("value", 75)("showLabel", true);
    \u0275\u0275advance(8);
    \u0275\u0275property("value", 60)("showLabel", true);
    \u0275\u0275advance(4);
    \u0275\u0275property("value", 60)("showLabel", true);
    \u0275\u0275advance(4);
    \u0275\u0275property("value", 60)("showLabel", true);
    \u0275\u0275advance(4);
    \u0275\u0275property("value", 60)("showLabel", true);
    \u0275\u0275advance(8);
    \u0275\u0275property("indeterminate", true);
    \u0275\u0275advance(4);
    \u0275\u0275property("value", 75)("striped", true)("showLabel", true);
    \u0275\u0275advance(10);
    \u0275\u0275property("value", ctx_r1.demoProgress)("showLabel", true)("variant", ctx_r1.demoProgress === 100 ? "success" : "primary");
    \u0275\u0275advance(3);
    \u0275\u0275property("disabled", ctx_r1.isProgressRunning);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", ctx_r1.isProgressRunning ? "En progreso..." : "Iniciar Demo", " ");
    \u0275\u0275advance(2);
    \u0275\u0275property("disabled", ctx_r1.demoProgress === 0);
  }
}
function StyleGuide_Conditional_29_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "section", 11)(1, "h2");
    \u0275\u0275text(2, "Mol\xE9culas");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "p", 13);
    \u0275\u0275text(4, " Combinaciones de \xE1tomos: cards, formularios individuales, breadcrumbs, alerts y tooltips. ");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(5, "div", 14)(6, "h3");
    \u0275\u0275text(7, "Input - Estados");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(8, "div", 143)(9, "div", 72);
    \u0275\u0275element(10, "app-form-input", 144);
    \u0275\u0275elementStart(11, "code");
    \u0275\u0275text(12, "Input normal con ayuda");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(13, "div", 72);
    \u0275\u0275element(14, "app-form-input", 145);
    \u0275\u0275elementStart(15, "code");
    \u0275\u0275text(16, "Input con error");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(17, "div", 72);
    \u0275\u0275element(18, "app-form-input", 146);
    \u0275\u0275elementStart(19, "code");
    \u0275\u0275text(20, "Input con \xE9xito");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(21, "div", 72);
    \u0275\u0275element(22, "app-form-input", 147);
    \u0275\u0275elementStart(23, "code");
    \u0275\u0275text(24, "Input deshabilitado");
    \u0275\u0275elementEnd()()()();
    \u0275\u0275elementStart(25, "div", 14)(26, "h3");
    \u0275\u0275text(27, "Input - Tipos");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(28, "div", 143)(29, "div", 72);
    \u0275\u0275element(30, "app-form-input", 148);
    \u0275\u0275elementStart(31, "code");
    \u0275\u0275text(32, 'type="text"');
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(33, "div", 72);
    \u0275\u0275element(34, "app-form-input", 149);
    \u0275\u0275elementStart(35, "code");
    \u0275\u0275text(36, 'type="email"');
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(37, "div", 72);
    \u0275\u0275element(38, "app-form-input", 150);
    \u0275\u0275elementStart(39, "code");
    \u0275\u0275text(40, 'type="password"');
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(41, "div", 72);
    \u0275\u0275element(42, "app-form-input", 151);
    \u0275\u0275elementStart(43, "code");
    \u0275\u0275text(44, 'type="number"');
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(45, "div", 72);
    \u0275\u0275element(46, "app-form-input", 152);
    \u0275\u0275elementStart(47, "code");
    \u0275\u0275text(48, 'type="tel"');
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(49, "div", 72);
    \u0275\u0275element(50, "app-form-input", 153);
    \u0275\u0275elementStart(51, "code");
    \u0275\u0275text(52, 'type="date"');
    \u0275\u0275elementEnd()()()();
    \u0275\u0275elementStart(53, "div", 14)(54, "h3");
    \u0275\u0275text(55, "Cards - Variante Polaroid");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(56, "div", 154)(57, "div", 155);
    \u0275\u0275element(58, "app-card", 156);
    \u0275\u0275elementStart(59, "code");
    \u0275\u0275text(60, "\xC1lbum con placeholder");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(61, "div", 155);
    \u0275\u0275element(62, "app-card", 157);
    \u0275\u0275elementStart(63, "code");
    \u0275\u0275text(64, "Canci\xF3n (circular)");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(65, "div", 155);
    \u0275\u0275element(66, "app-card", 158);
    \u0275\u0275elementStart(67, "code");
    \u0275\u0275text(68, "Efecto vinilo");
    \u0275\u0275elementEnd()()()();
    \u0275\u0275elementStart(69, "div", 14)(70, "h3");
    \u0275\u0275text(71, "Cards - Variante Profile");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(72, "h4", 159);
    \u0275\u0275text(73, "Layout Vertical");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(74, "div", 50)(75, "div", 72);
    \u0275\u0275element(76, "app-card", 160);
    \u0275\u0275elementStart(77, "code");
    \u0275\u0275text(78, "Perfil vertical con g\xE9neros");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(79, "div", 72);
    \u0275\u0275element(80, "app-card", 161);
    \u0275\u0275elementStart(81, "code");
    \u0275\u0275text(82, "\xC1lbum con badges y acciones");
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(83, "h4", 162);
    \u0275\u0275text(84, "Layout Horizontal (Responsive)");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(85, "div", 83)(86, "div", 84);
    \u0275\u0275element(87, "app-card", 163);
    \u0275\u0275elementStart(88, "code");
    \u0275\u0275text(89, "Card horizontal con m\xFAltiples badges y acciones (se vuelve vertical en m\xF3vil)");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(90, "div", 84);
    \u0275\u0275element(91, "app-card", 164);
    \u0275\u0275elementStart(92, "code");
    \u0275\u0275text(93, "Card horizontal con efecto vinilo");
    \u0275\u0275elementEnd()()()();
    \u0275\u0275elementStart(94, "div", 14)(95, "h3");
    \u0275\u0275text(96, "Textarea");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(97, "div", 143)(98, "div", 72);
    \u0275\u0275element(99, "app-form-textarea", 165);
    \u0275\u0275elementStart(100, "code");
    \u0275\u0275text(101, "Textarea normal");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(102, "div", 72);
    \u0275\u0275element(103, "app-form-textarea", 166);
    \u0275\u0275elementStart(104, "code");
    \u0275\u0275text(105, "Textarea con error");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(106, "div", 72);
    \u0275\u0275element(107, "app-form-textarea", 167);
    \u0275\u0275elementStart(108, "code");
    \u0275\u0275text(109, "Textarea deshabilitado");
    \u0275\u0275elementEnd()()()();
    \u0275\u0275elementStart(110, "div", 14)(111, "h3");
    \u0275\u0275text(112, "Select");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(113, "div", 143)(114, "div", 72);
    \u0275\u0275element(115, "app-form-select", 168);
    \u0275\u0275elementStart(116, "code");
    \u0275\u0275text(117, "Select normal");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(118, "div", 72);
    \u0275\u0275element(119, "app-form-select", 169);
    \u0275\u0275elementStart(120, "code");
    \u0275\u0275text(121, "Select con error");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(122, "div", 72);
    \u0275\u0275element(123, "app-form-select", 170);
    \u0275\u0275elementStart(124, "code");
    \u0275\u0275text(125, "Select deshabilitado");
    \u0275\u0275elementEnd()()()();
    \u0275\u0275elementStart(126, "div", 14)(127, "h3");
    \u0275\u0275text(128, "Checkbox");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(129, "div", 143)(130, "div", 72);
    \u0275\u0275element(131, "app-form-checkbox", 171);
    \u0275\u0275elementStart(132, "code");
    \u0275\u0275text(133, "Checkbox normal");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(134, "div", 72);
    \u0275\u0275element(135, "app-form-checkbox", 172);
    \u0275\u0275elementStart(136, "code");
    \u0275\u0275text(137, "Checkbox con error");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(138, "div", 72);
    \u0275\u0275element(139, "app-form-checkbox", 173);
    \u0275\u0275elementStart(140, "code");
    \u0275\u0275text(141, "Checkbox deshabilitado");
    \u0275\u0275elementEnd()()()();
    \u0275\u0275elementStart(142, "div", 14)(143, "h3");
    \u0275\u0275text(144, "Radio Group");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(145, "div", 143)(146, "div", 72);
    \u0275\u0275element(147, "app-form-radio-group", 174);
    \u0275\u0275elementStart(148, "code");
    \u0275\u0275text(149, "Radio group normal");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(150, "div", 72);
    \u0275\u0275element(151, "app-form-radio-group", 175);
    \u0275\u0275elementStart(152, "code");
    \u0275\u0275text(153, "Radio group con error");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(154, "div", 72);
    \u0275\u0275element(155, "app-form-radio-group", 176);
    \u0275\u0275elementStart(156, "code");
    \u0275\u0275text(157, "Radio group inline");
    \u0275\u0275elementEnd()()()();
    \u0275\u0275elementStart(158, "div", 14)(159, "h3");
    \u0275\u0275text(160, "Breadcrumbs");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(161, "div", 83)(162, "div", 84);
    \u0275\u0275element(163, "app-breadcrumbs", 177);
    \u0275\u0275elementStart(164, "code");
    \u0275\u0275text(165, "Breadcrumbs simple");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(166, "div", 84);
    \u0275\u0275element(167, "app-breadcrumbs", 177);
    \u0275\u0275elementStart(168, "code");
    \u0275\u0275text(169, "Breadcrumbs con iconos");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(170, "div", 84);
    \u0275\u0275element(171, "app-breadcrumbs", 177);
    \u0275\u0275elementStart(172, "code");
    \u0275\u0275text(173, "Breadcrumbs largo (con truncado en m\xF3vil)");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(174, "div", 84);
    \u0275\u0275element(175, "app-breadcrumbs", 178);
    \u0275\u0275elementStart(176, "code");
    \u0275\u0275text(177, "Breadcrumbs con separador custom (\u203A)");
    \u0275\u0275elementEnd()()()();
    \u0275\u0275elementStart(178, "div", 14)(179, "h3");
    \u0275\u0275text(180, "Alerts");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(181, "div", 83)(182, "div", 84);
    \u0275\u0275element(183, "app-alert", 179);
    \u0275\u0275elementStart(184, "code");
    \u0275\u0275text(185, "Alert de \xE9xito");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(186, "div", 84);
    \u0275\u0275element(187, "app-alert", 180);
    \u0275\u0275elementStart(188, "code");
    \u0275\u0275text(189, "Alert de error");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(190, "div", 84);
    \u0275\u0275element(191, "app-alert", 181);
    \u0275\u0275elementStart(192, "code");
    \u0275\u0275text(193, "Alert de advertencia");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(194, "div", 84);
    \u0275\u0275element(195, "app-alert", 182);
    \u0275\u0275elementStart(196, "code");
    \u0275\u0275text(197, "Alert de informaci\xF3n");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(198, "div", 84);
    \u0275\u0275element(199, "app-alert", 183);
    \u0275\u0275elementStart(200, "code");
    \u0275\u0275text(201, "Alert con bot\xF3n cerrar");
    \u0275\u0275elementEnd()()()();
    \u0275\u0275elementStart(202, "div", 14)(203, "h3");
    \u0275\u0275text(204, "Tooltip - Posiciones");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(205, "div", 184)(206, "div", 72)(207, "app-tooltip", 185)(208, "app-button");
    \u0275\u0275text(209, "Top");
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(210, "div", 72)(211, "app-tooltip", 186)(212, "app-button");
    \u0275\u0275text(213, "Bottom");
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(214, "div", 72)(215, "app-tooltip", 187)(216, "app-button");
    \u0275\u0275text(217, "Left");
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(218, "div", 72)(219, "app-tooltip", 188)(220, "app-button");
    \u0275\u0275text(221, "Right");
    \u0275\u0275elementEnd()()()()()();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275advance(14);
    \u0275\u0275property("hasError", true);
    \u0275\u0275advance(4);
    \u0275\u0275property("hasSuccess", true);
    \u0275\u0275advance(4);
    \u0275\u0275property("disabled", true);
    \u0275\u0275advance(54);
    \u0275\u0275property("badges", ctx_r1.userGenres)("actions", ctx_r1.profileActions);
    \u0275\u0275advance(4);
    \u0275\u0275property("badges", \u0275\u0275pureFunction0(29, _c12))("actions", ctx_r1.profileActions.slice(0, 2));
    \u0275\u0275advance(7);
    \u0275\u0275property("badges", \u0275\u0275pureFunction0(30, _c2))("actions", ctx_r1.profileActions);
    \u0275\u0275advance(4);
    \u0275\u0275property("badges", \u0275\u0275pureFunction0(31, _c3))("actions", ctx_r1.profileActions.slice(0, 2));
    \u0275\u0275advance(8);
    \u0275\u0275property("rows", 4);
    \u0275\u0275advance(4);
    \u0275\u0275property("rows", 4);
    \u0275\u0275advance(4);
    \u0275\u0275property("rows", 4)("disabled", true);
    \u0275\u0275advance(8);
    \u0275\u0275property("options", ctx_r1.genreOptions);
    \u0275\u0275advance(4);
    \u0275\u0275property("options", ctx_r1.genreOptions);
    \u0275\u0275advance(4);
    \u0275\u0275property("options", ctx_r1.genreOptions)("disabled", true);
    \u0275\u0275advance(16);
    \u0275\u0275property("disabled", true);
    \u0275\u0275advance(8);
    \u0275\u0275property("options", ctx_r1.privacyOptions);
    \u0275\u0275advance(4);
    \u0275\u0275property("options", ctx_r1.privacyOptions);
    \u0275\u0275advance(4);
    \u0275\u0275property("options", ctx_r1.privacyOptions)("inline", true);
    \u0275\u0275advance(8);
    \u0275\u0275property("items", ctx_r1.breadcrumbsSimple);
    \u0275\u0275advance(4);
    \u0275\u0275property("items", ctx_r1.breadcrumbsWithIcons);
    \u0275\u0275advance(4);
    \u0275\u0275property("items", ctx_r1.breadcrumbsLong);
    \u0275\u0275advance(4);
    \u0275\u0275property("items", ctx_r1.breadcrumbsSimple);
    \u0275\u0275advance(24);
    \u0275\u0275property("dismissible", true);
  }
}
function StyleGuide_Conditional_30_app_card_114_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275element(0, "app-card", 208);
  }
  if (rf & 2) {
    const album_r4 = ctx.$implicit;
    \u0275\u0275property("title", album_r4.title)("subtitle", album_r4.artist + " \u2022 " + album_r4.year);
  }
}
function StyleGuide_Conditional_30_app_card_119_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275element(0, "app-card", 209);
  }
  if (rf & 2) {
    const song_r5 = ctx.$implicit;
    \u0275\u0275property("title", song_r5.title)("subtitle", song_r5.artist);
  }
}
function StyleGuide_Conditional_30_app_card_132_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275element(0, "app-card", 208);
  }
  if (rf & 2) {
    const album_r6 = ctx.$implicit;
    \u0275\u0275property("title", album_r6.title)("subtitle", album_r6.artist);
  }
}
function StyleGuide_Conditional_30_Template(rf, ctx) {
  if (rf & 1) {
    const _r3 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "section", 11)(1, "h2");
    \u0275\u0275text(2, "Organismos");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "p", 13);
    \u0275\u0275text(4, " Componentes complejos: formularios completos, modales, accordions, tabs y carruseles. ");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(5, "div", 14)(6, "h3");
    \u0275\u0275text(7, "Notifications (Toast)");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(8, "p", 13);
    \u0275\u0275text(9, " Las notificaciones aparecen flotando en las esquinas de la pantalla. ");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(10, "div", 50)(11, "div", 72)(12, "app-button", 189);
    \u0275\u0275listener("click", function StyleGuide_Conditional_30_Template_app_button_click_12_listener() {
      \u0275\u0275restoreView(_r3);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.showToast("success"));
    });
    \u0275\u0275text(13, " Notificaci\xF3n de \xE9xito ");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(14, "div", 72)(15, "app-button", 190);
    \u0275\u0275listener("click", function StyleGuide_Conditional_30_Template_app_button_click_15_listener() {
      \u0275\u0275restoreView(_r3);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.showToast("error"));
    });
    \u0275\u0275text(16, " Notificaci\xF3n de error ");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(17, "div", 72)(18, "app-button", 191);
    \u0275\u0275listener("click", function StyleGuide_Conditional_30_Template_app_button_click_18_listener() {
      \u0275\u0275restoreView(_r3);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.showToast("warning"));
    });
    \u0275\u0275text(19, " Notificaci\xF3n de advertencia ");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(20, "div", 72)(21, "app-button", 192);
    \u0275\u0275listener("click", function StyleGuide_Conditional_30_Template_app_button_click_21_listener() {
      \u0275\u0275restoreView(_r3);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.showToast("info"));
    });
    \u0275\u0275text(22, " Notificaci\xF3n de informaci\xF3n ");
    \u0275\u0275elementEnd()()()();
    \u0275\u0275elementStart(23, "div", 14)(24, "h3");
    \u0275\u0275text(25, "Notificaciones Din\xE1micas (Manipulaci\xF3n DOM)");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(26, "p", 13);
    \u0275\u0275text(27, " Notificaciones creadas din\xE1micamente usando ");
    \u0275\u0275elementStart(28, "code");
    \u0275\u0275text(29, "createComponent()");
    \u0275\u0275elementEnd();
    \u0275\u0275text(30, " y ");
    \u0275\u0275elementStart(31, "code");
    \u0275\u0275text(32, "appendChild()");
    \u0275\u0275elementEnd();
    \u0275\u0275text(33, ". ");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(34, "div", 50)(35, "div", 72)(36, "app-button", 189);
    \u0275\u0275listener("click", function StyleGuide_Conditional_30_Template_app_button_click_36_listener() {
      \u0275\u0275restoreView(_r3);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.showDynamicNotification("success"));
    });
    \u0275\u0275text(37, " Crear notificaci\xF3n en el DOM ");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(38, "code");
    \u0275\u0275text(39, "createElement + appendChild");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(40, "div", 72)(41, "app-button", 190);
    \u0275\u0275listener("click", function StyleGuide_Conditional_30_Template_app_button_click_41_listener() {
      \u0275\u0275restoreView(_r3);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.showDynamicNotification("error"));
    });
    \u0275\u0275text(42, " Error con creaci\xF3n din\xE1mica ");
    \u0275\u0275elementEnd()()()();
    \u0275\u0275elementStart(43, "div", 14)(44, "h3");
    \u0275\u0275text(45, "Formulario de Login");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(46, "div", 83)(47, "div", 193);
    \u0275\u0275element(48, "app-login-form");
    \u0275\u0275elementStart(49, "code");
    \u0275\u0275text(50, "Formulario de inicio de sesi\xF3n con validaci\xF3n");
    \u0275\u0275elementEnd()()()();
    \u0275\u0275elementStart(51, "div", 14)(52, "h3");
    \u0275\u0275text(53, "Formulario de Registro");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(54, "div", 83)(55, "div", 193);
    \u0275\u0275element(56, "app-register-form");
    \u0275\u0275elementStart(57, "code");
    \u0275\u0275text(58, "Formulario de registro con validaci\xF3n completa");
    \u0275\u0275elementEnd()()()();
    \u0275\u0275elementStart(59, "div", 14)(60, "h3");
    \u0275\u0275text(61, "Formulario de Recuperaci\xF3n de Contrase\xF1a");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(62, "div", 83)(63, "div", 193);
    \u0275\u0275element(64, "app-forgot-password-form");
    \u0275\u0275elementStart(65, "code");
    \u0275\u0275text(66, "Formulario para recuperar contrase\xF1a");
    \u0275\u0275elementEnd()()()();
    \u0275\u0275elementStart(67, "div", 14)(68, "h3");
    \u0275\u0275text(69, "Modal");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(70, "p", 13);
    \u0275\u0275text(71, " Componente modal con overlay, cierre con ESC, click fuera y trap focus. ");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(72, "div", 50)(73, "div", 72)(74, "app-button", 95);
    \u0275\u0275listener("clicked", function StyleGuide_Conditional_30_Template_app_button_clicked_74_listener() {
      \u0275\u0275restoreView(_r3);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.openModal());
    });
    \u0275\u0275text(75, " Abrir Modal ");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(76, "code");
    \u0275\u0275text(77, "Modal con signal isOpen");
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(78, "app-modal", 194);
    \u0275\u0275listener("onClose", function StyleGuide_Conditional_30_Template_app_modal_onClose_78_listener() {
      \u0275\u0275restoreView(_r3);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.closeModal());
    });
    \u0275\u0275elementStart(79, "p");
    \u0275\u0275text(80, "\xBFEst\xE1s seguro de que quieres eliminar este \xE1lbum de tu colecci\xF3n?");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(81, "p");
    \u0275\u0275text(82, "Esta acci\xF3n no se puede deshacer.");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(83, "div", 195)(84, "app-button", 76);
    \u0275\u0275listener("clicked", function StyleGuide_Conditional_30_Template_app_button_clicked_84_listener() {
      \u0275\u0275restoreView(_r3);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.closeModal());
    });
    \u0275\u0275text(85, " Eliminar ");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(86, "app-button", 74);
    \u0275\u0275listener("clicked", function StyleGuide_Conditional_30_Template_app_button_clicked_86_listener() {
      \u0275\u0275restoreView(_r3);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.closeModal());
    });
    \u0275\u0275text(87, " Cancelar ");
    \u0275\u0275elementEnd()()()();
    \u0275\u0275elementStart(88, "div", 14)(89, "h3");
    \u0275\u0275text(90, "Accordion - Modo Single");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(91, "p", 13);
    \u0275\u0275text(92, " Solo puede haber un item abierto a la vez. ");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(93, "div", 83)(94, "div", 84);
    \u0275\u0275element(95, "app-accordion", 196);
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(96, "div", 14)(97, "h3");
    \u0275\u0275text(98, "Accordion - Modo Multiple");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(99, "div", 83)(100, "div", 84);
    \u0275\u0275element(101, "app-accordion", 197);
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(102, "div", 14)(103, "h3");
    \u0275\u0275text(104, "Tabs (Pesta\xF1as)");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(105, "p", 13);
    \u0275\u0275text(106, " Navegaci\xF3n por teclado (flechas izquierda/derecha) y soporte para tabs deshabilitados. ");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(107, "div", 83)(108, "div", 84);
    \u0275\u0275element(109, "app-tabs", 198);
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(110, "div", 14)(111, "h3");
    \u0275\u0275text(112, "Carrusel de \xC1lbumes");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(113, "app-carousel", 199);
    \u0275\u0275template(114, StyleGuide_Conditional_30_app_card_114_Template, 1, 2, "app-card", 200);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(115, "div", 14)(116, "h3");
    \u0275\u0275text(117, "Carrusel de Canciones");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(118, "app-carousel", 201);
    \u0275\u0275template(119, StyleGuide_Conditional_30_app_card_119_Template, 1, 2, "app-card", 202);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(120, "div", 14)(121, "h3");
    \u0275\u0275text(122, "Manipulaci\xF3n de Estilos Din\xE1micos (DOM)");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(123, "p", 13);
    \u0275\u0275text(124, " Este carousel demuestra manipulaci\xF3n directa del DOM modificando estilos con ");
    \u0275\u0275elementStart(125, "code");
    \u0275\u0275text(126, "nativeElement.style");
    \u0275\u0275elementEnd();
    \u0275\u0275text(127, ". ");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(128, "div", 83)(129, "div", 84)(130, "app-carousel", 203, 0);
    \u0275\u0275template(132, StyleGuide_Conditional_30_app_card_132_Template, 1, 2, "app-card", 200);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(133, "div", 204)(134, "app-button", 205);
    \u0275\u0275listener("clicked", function StyleGuide_Conditional_30_Template_app_button_clicked_134_listener() {
      \u0275\u0275restoreView(_r3);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.toggleCarouselHighlight());
    });
    \u0275\u0275text(135, " Toggle Highlight (boxShadow + border) ");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(136, "label", 206)(137, "span");
    \u0275\u0275text(138, "Opacidad:");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(139, "input", 207);
    \u0275\u0275listener("input", function StyleGuide_Conditional_30_Template_input_input_139_listener($event) {
      \u0275\u0275restoreView(_r3);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.updateCarouselOpacity($event));
    });
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(140, "span");
    \u0275\u0275text(141);
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(142, "code");
    \u0275\u0275text(143, "Modifica: boxShadow, border, opacity con nativeElement.style");
    \u0275\u0275elementEnd()()()()();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275advance(78);
    \u0275\u0275property("isOpen", ctx_r1.isModalOpen());
    \u0275\u0275advance(17);
    \u0275\u0275property("items", ctx_r1.accordionItems);
    \u0275\u0275advance(6);
    \u0275\u0275property("items", ctx_r1.accordionItems);
    \u0275\u0275advance(8);
    \u0275\u0275property("tabs", ctx_r1.tabsExample)("initialActiveTab", "overview");
    \u0275\u0275advance(5);
    \u0275\u0275property("ngForOf", ctx_r1.trendingAlbums);
    \u0275\u0275advance(5);
    \u0275\u0275property("ngForOf", ctx_r1.trendingSongs);
    \u0275\u0275advance(13);
    \u0275\u0275property("ngForOf", ctx_r1.trendingAlbums.slice(0, 5));
    \u0275\u0275advance(7);
    \u0275\u0275property("value", ctx_r1.carouselOpacity);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(ctx_r1.carouselOpacity);
  }
}
function StyleGuide_Conditional_31_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "section", 11)(1, "h2");
    \u0275\u0275text(2, "Componentes de Layout");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "p", 13);
    \u0275\u0275text(4, " Estructura principal de la aplicaci\xF3n basada en el sistema de dise\xF1o 70s Neobrutalist. Estos componentes heredan las variables, sombras, colores y tipograf\xEDa de los Fundamentos. Los componentes de layout se visualizan directamente en esta p\xE1gina. ");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(5, "div", 14)(6, "h3");
    \u0275\u0275text(7, "Componentes Disponibles");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(8, "p", 13);
    \u0275\u0275text(9, " Cada componente usa mixins y variables del sistema de dise\xF1o. Observa la p\xE1gina actual para ver estos componentes en acci\xF3n. ");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(10, "div", 143)(11, "div", 210)(12, "div", 211);
    \u0275\u0275namespaceSVG();
    \u0275\u0275elementStart(13, "svg", 212);
    \u0275\u0275element(14, "rect", 213)(15, "line", 214);
    \u0275\u0275elementEnd();
    \u0275\u0275namespaceHTML();
    \u0275\u0275elementStart(16, "span", 215);
    \u0275\u0275text(17, "app-header");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(18, "p", 216);
    \u0275\u0275text(19, "Cabecera con logo central, franjas 70s y botones de autenticaci\xF3n.");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(20, "div", 217)(21, "code");
    \u0275\u0275text(22, "--header-bg");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(23, "code");
    \u0275\u0275text(24, "$borde-brutal-thick");
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(25, "div", 210)(26, "div", 211);
    \u0275\u0275namespaceSVG();
    \u0275\u0275elementStart(27, "svg", 212);
    \u0275\u0275element(28, "line", 218)(29, "line", 219)(30, "line", 220);
    \u0275\u0275elementEnd();
    \u0275\u0275namespaceHTML();
    \u0275\u0275elementStart(31, "span", 215);
    \u0275\u0275text(32, "main-nav");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(33, "p", 216);
    \u0275\u0275text(34, "Barra de navegaci\xF3n sticky con enlaces y toggle de tema.");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(35, "div", 217)(36, "code");
    \u0275\u0275text(37, "--nav-bg");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(38, "code");
    \u0275\u0275text(39, "$z-nav");
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(40, "div", 210)(41, "div", 211);
    \u0275\u0275namespaceSVG();
    \u0275\u0275elementStart(42, "svg", 212);
    \u0275\u0275element(43, "rect", 213)(44, "line", 221);
    \u0275\u0275elementEnd();
    \u0275\u0275namespaceHTML();
    \u0275\u0275elementStart(45, "span", 215);
    \u0275\u0275text(46, "app-footer");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(47, "p", 216);
    \u0275\u0275text(48, "Pie de p\xE1gina sim\xE9trico con logo central y botones de navegaci\xF3n.");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(49, "div", 217)(50, "code");
    \u0275\u0275text(51, "--header-bg");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(52, "code");
    \u0275\u0275text(53, "$radio-pildora");
    \u0275\u0275elementEnd()()()()();
    \u0275\u0275elementStart(54, "div", 14)(55, "h3");
    \u0275\u0275text(56, "Sistema de Breakpoints");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(57, "p", 13);
    \u0275\u0275text(58, " Puntos de quiebre responsive definidos en ");
    \u0275\u0275elementStart(59, "code");
    \u0275\u0275text(60, "_variables.scss");
    \u0275\u0275elementEnd();
    \u0275\u0275text(61, ". El layout se adapta autom\xE1ticamente a cada tama\xF1o de pantalla. ");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(62, "div", 222)(63, "div", 223);
    \u0275\u0275element(64, "app-card", 224);
    \u0275\u0275elementStart(65, "code", 225);
    \u0275\u0275text(66, "$breakpoint-mobile");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(67, "div", 223);
    \u0275\u0275element(68, "app-card", 226);
    \u0275\u0275elementStart(69, "code", 225);
    \u0275\u0275text(70, "$breakpoint-tablet");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(71, "div", 223);
    \u0275\u0275element(72, "app-card", 227);
    \u0275\u0275elementStart(73, "code", 225);
    \u0275\u0275text(74, "$breakpoint-desktop");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(75, "div", 223);
    \u0275\u0275element(76, "app-card", 228);
    \u0275\u0275elementStart(77, "code", 225);
    \u0275\u0275text(78, "$breakpoint-large-desktop");
    \u0275\u0275elementEnd()()()();
    \u0275\u0275elementStart(79, "div", 14)(80, "h3");
    \u0275\u0275text(81, "Escala de Z-Index");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(82, "p", 13);
    \u0275\u0275text(83, " Jerarqu\xEDa visual controlada para evitar conflictos de superposici\xF3n. Definida centralmente en ");
    \u0275\u0275elementStart(84, "code");
    \u0275\u0275text(85, "$variables.scss");
    \u0275\u0275elementEnd();
    \u0275\u0275text(86, ". ");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(87, "div", 229)(88, "div", 230)(89, "span", 231);
    \u0275\u0275text(90, "10");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(91, "span", 232);
    \u0275\u0275text(92, "$z-spinner");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(93, "span", 233);
    \u0275\u0275text(94, "Loading global");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(95, "div", 234)(96, "span", 231);
    \u0275\u0275text(97, "9");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(98, "span", 232);
    \u0275\u0275text(99, "$z-notification");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(100, "span", 233);
    \u0275\u0275text(101, "Toast notifications");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(102, "div", 235)(103, "span", 231);
    \u0275\u0275text(104, "8");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(105, "span", 232);
    \u0275\u0275text(106, "$z-tooltip");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(107, "span", 233);
    \u0275\u0275text(108, "Tooltips");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(109, "div", 236)(110, "span", 231);
    \u0275\u0275text(111, "7");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(112, "span", 232);
    \u0275\u0275text(113, "$z-popover");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(114, "span", 233);
    \u0275\u0275text(115, "Dropdowns, popovers");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(116, "div", 237)(117, "span", 231);
    \u0275\u0275text(118, "6");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(119, "span", 232);
    \u0275\u0275text(120, "$z-modal");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(121, "span", 233);
    \u0275\u0275text(122, "Modales");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(123, "div", 238)(124, "span", 231);
    \u0275\u0275text(125, "5");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(126, "span", 232);
    \u0275\u0275text(127, "$z-overlay");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(128, "span", 233);
    \u0275\u0275text(129, "Backdrops");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(130, "div", 239)(131, "span", 231);
    \u0275\u0275text(132, "4");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(133, "span", 232);
    \u0275\u0275text(134, "$z-nav");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(135, "span", 233);
    \u0275\u0275text(136, "Navegaci\xF3n principal");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(137, "div", 240)(138, "span", 231);
    \u0275\u0275text(139, "3");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(140, "span", 232);
    \u0275\u0275text(141, "$z-fixed");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(142, "span", 233);
    \u0275\u0275text(143, "Sidebar, alertas fijas");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(144, "div", 241)(145, "span", 231);
    \u0275\u0275text(146, "2");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(147, "span", 232);
    \u0275\u0275text(148, "$z-sticky");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(149, "span", 233);
    \u0275\u0275text(150, "Elementos sticky");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(151, "div", 242)(152, "span", 231);
    \u0275\u0275text(153, "1");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(154, "span", 232);
    \u0275\u0275text(155, "$z-dropdown");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(156, "span", 233);
    \u0275\u0275text(157, "Dropdowns simples");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(158, "div", 243)(159, "span", 231);
    \u0275\u0275text(160, "0");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(161, "span", 232);
    \u0275\u0275text(162, "$z-base");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(163, "span", 233);
    \u0275\u0275text(164, "Contenido base");
    \u0275\u0275elementEnd()()()();
    \u0275\u0275elementStart(165, "div", 14)(166, "h3");
    \u0275\u0275text(167, "Variables CSS del Layout");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(168, "p", 13);
    \u0275\u0275text(169, " Variables CSS personalizadas que controlan el tema y se heredan en todos los componentes de layout. ");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(170, "div", 143)(171, "div", 244)(172, "span", 245);
    \u0275\u0275text(173, "--bg-primary");
    \u0275\u0275elementEnd();
    \u0275\u0275element(174, "div", 246);
    \u0275\u0275elementStart(175, "span", 247);
    \u0275\u0275text(176, "Fondo principal");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(177, "div", 244)(178, "span", 245);
    \u0275\u0275text(179, "--bg-secondary");
    \u0275\u0275elementEnd();
    \u0275\u0275element(180, "div", 248);
    \u0275\u0275elementStart(181, "span", 247);
    \u0275\u0275text(182, "Fondo secundario");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(183, "div", 244)(184, "span", 245);
    \u0275\u0275text(185, "--header-bg");
    \u0275\u0275elementEnd();
    \u0275\u0275element(186, "div", 249);
    \u0275\u0275elementStart(187, "span", 247);
    \u0275\u0275text(188, "Fondo del header");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(189, "div", 244)(190, "span", 245);
    \u0275\u0275text(191, "--nav-bg");
    \u0275\u0275elementEnd();
    \u0275\u0275element(192, "div", 250);
    \u0275\u0275elementStart(193, "span", 247);
    \u0275\u0275text(194, "Fondo de navegaci\xF3n");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(195, "div", 244)(196, "span", 245);
    \u0275\u0275text(197, "--color-primary");
    \u0275\u0275elementEnd();
    \u0275\u0275element(198, "div", 251);
    \u0275\u0275elementStart(199, "span", 247);
    \u0275\u0275text(200, "Color de acci\xF3n principal");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(201, "div", 244)(202, "span", 245);
    \u0275\u0275text(203, "--shadow-color");
    \u0275\u0275elementEnd();
    \u0275\u0275element(204, "div", 252);
    \u0275\u0275elementStart(205, "span", 247);
    \u0275\u0275text(206, "Color de sombras brutales");
    \u0275\u0275elementEnd()()()()();
  }
  if (rf & 2) {
    \u0275\u0275advance(64);
    \u0275\u0275property("placeholderIcon", '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="5" y="2" width="14" height="20" rx="2" ry="2"></rect><line x1="12" y1="18" x2="12.01" y2="18"></line></svg>');
    \u0275\u0275advance(4);
    \u0275\u0275property("placeholderIcon", '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="4" y="2" width="16" height="20" rx="2" ry="2"></rect><line x1="12" y1="18" x2="12.01" y2="18"></line></svg>');
    \u0275\u0275advance(4);
    \u0275\u0275property("placeholderIcon", '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="3" width="20" height="14" rx="2" ry="2"></rect><line x1="8" y1="21" x2="16" y2="21"></line><line x1="12" y1="17" x2="12" y2="21"></line></svg>');
    \u0275\u0275advance(4);
    \u0275\u0275property("placeholderIcon", '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="3" width="20" height="14" rx="2" ry="2"></rect><polyline points="8 21 12 17 16 21"></polyline></svg>');
  }
}
function StyleGuide_For_33_Template(rf, ctx) {
  if (rf & 1) {
    const _r7 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "app-notification", 253);
    \u0275\u0275listener("dismissed", function StyleGuide_For_33_Template_app_notification_dismissed_0_listener() {
      const notification_r8 = \u0275\u0275restoreView(_r7).$implicit;
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.removeStaticNotification(notification_r8.id));
    });
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const notification_r8 = ctx.$implicit;
    const \u0275$index_2273_r9 = ctx.$index;
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275property("type", notification_r8.type)("title", notification_r8.title)("message", notification_r8.message)("stackIndex", \u0275$index_2273_r9)("getHeightAt", ctx_r1.getNotificationHeight)("autoDismiss", true)("duration", 5e3);
  }
}
var StyleGuide = class _StyleGuide {
  // Inyectar servicios
  notificationService = inject(NotificationService);
  loadingService = inject(LoadingService);
  styleGuideNav = inject(StyleGuideNavigationService);
  // Usar el signal del servicio compartido
  activeSection = this.styleGuideNav.activeSection;
  // Sidebar para navegación de secciones
  sidebarOpen = signal(false, ...ngDevMode ? [{ debugName: "sidebarOpen" }] : []);
  toggleSidebar() {
    this.sidebarOpen.update((open) => !open);
  }
  closeSidebar() {
    this.sidebarOpen.set(false);
  }
  // Opciones del menu
  menuItems = [
    { id: "foundations", label: "Fundamentos" },
    { id: "atoms", label: "Atomos" },
    { id: "molecules", label: "Moleculas" },
    { id: "organisms", label: "Organismos" },
    { id: "layout", label: "Layout" }
  ];
  // Cambiar sección
  selectSection(section) {
    this.activeSection.set(section);
  }
  // Referencias a carouseles para manipulacion DOM
  demoCarousel;
  carouselOpacity = 1;
  // Estados de loading para botones
  buttonLoading1 = false;
  buttonLoading2 = false;
  buttonLoading3 = false;
  // Estado para demo de progress bar
  demoProgress = 0;
  isProgressRunning = false;
  onButtonClick(variant, size) {
    console.log(`Bot\xF3n ${variant} ${size} clickeado`);
  }
  /**
   * Simula una operación de carga en un botón
   */
  simulateLoading(buttonId) {
    switch (buttonId) {
      case "btn1":
        this.buttonLoading1 = true;
        setTimeout(() => this.buttonLoading1 = false, 2e3);
        break;
      case "btn2":
        this.buttonLoading2 = true;
        setTimeout(() => this.buttonLoading2 = false, 2e3);
        break;
      case "btn3":
        this.buttonLoading3 = true;
        setTimeout(() => this.buttonLoading3 = false, 2e3);
        break;
    }
  }
  /**
   * Muestra el spinner global durante 2 segundos
   */
  showGlobalSpinner() {
    this.loadingService.start("Cargando datos...");
    setTimeout(() => {
      this.loadingService.stop();
    }, 2e3);
  }
  /**
   * Inicia demo de barra de progreso
   */
  startProgressDemo() {
    if (this.isProgressRunning)
      return;
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
  resetProgressDemo() {
    this.demoProgress = 0;
    this.isProgressRunning = false;
  }
  // Ejemplos de acciones para cards de perfil
  profileActions = [
    { label: "Agregar a mi lista", icon: "+", variant: "primary", callback: () => console.log("Agregado") },
    { label: "Eliminar de mi lista", icon: "\u2212", variant: "secondary", callback: () => console.log("Eliminado") },
    { label: "Enviar solicitud de amistad", icon: "\u{1F464}+", variant: "accent", callback: () => console.log("Solicitud enviada") },
    { label: "Editar mi perfil", icon: "\u270F\uFE0F", variant: "contrast", callback: () => console.log("Editando perfil") }
  ];
  userGenres = ["Rock 35%", "Jazz 25%", "Funk 20%", "Soul 15%", "Disco 5%"];
  // Datos para form-select
  genreOptions = [
    { value: "rock", label: "Rock" },
    { value: "jazz", label: "Jazz" },
    { value: "funk", label: "Funk" },
    { value: "soul", label: "Soul" },
    { value: "disco", label: "Disco" },
    { value: "pop", label: "Pop" },
    { value: "classical", label: "Cl\xE1sica" }
  ];
  // Datos para form-radio-group
  privacyOptions = [
    { value: "public", label: "P\xFAblico" },
    { value: "friends", label: "Solo amigos" },
    { value: "private", label: "Privado" }
  ];
  // Datos para breadcrumbs
  breadcrumbsSimple = [
    { label: "Inicio", url: "/" },
    { label: "Mi colecci\xF3n", url: "/collection" },
    { label: "\xC1lbumes" }
  ];
  breadcrumbsWithIcons = [
    { label: "Inicio", url: "/", icon: "\u{1F3E0}" },
    { label: "Explorar", url: "/explore", icon: "\u{1F50D}" },
    { label: "Artistas", url: "/artists", icon: "\u{1F3A4}" },
    { label: "Pink Floyd" }
  ];
  breadcrumbsLong = [
    { label: "Inicio", url: "/" },
    { label: "Mi colecci\xF3n", url: "/collection" },
    { label: "\xC1lbumes", url: "/collection/albums" },
    { label: "Rock", url: "/collection/albums/rock" },
    { label: "The Dark Side of the Moon" }
  ];
  // Datos para carruseles - Álbumes
  trendingAlbums = [
    { title: "Abbey Road", artist: "The Beatles", year: "1969", genre: "Rock" },
    { title: "Dark Side of the Moon", artist: "Pink Floyd", year: "1973", genre: "Progressive Rock" },
    { title: "Rumours", artist: "Fleetwood Mac", year: "1977", genre: "Rock" },
    { title: "Thriller", artist: "Michael Jackson", year: "1982", genre: "Pop" },
    { title: "Back in Black", artist: "AC/DC", year: "1980", genre: "Hard Rock" },
    { title: "The Wall", artist: "Pink Floyd", year: "1979", genre: "Progressive Rock" },
    { title: "Led Zeppelin IV", artist: "Led Zeppelin", year: "1971", genre: "Rock" },
    { title: "Hotel California", artist: "Eagles", year: "1976", genre: "Rock" }
  ];
  // Datos para carruseles - Canciones
  trendingSongs = [
    { title: "Bohemian Rhapsody", artist: "Queen", duration: "5:55" },
    { title: "Stairway to Heaven", artist: "Led Zeppelin", duration: "8:02" },
    { title: "Imagine", artist: "John Lennon", duration: "3:03" },
    { title: "Smells Like Teen Spirit", artist: "Nirvana", duration: "5:01" },
    { title: "Billie Jean", artist: "Michael Jackson", duration: "4:54" },
    { title: "Hey Jude", artist: "The Beatles", duration: "7:11" },
    { title: "Like a Rolling Stone", artist: "Bob Dylan", duration: "6:13" },
    { title: "Hotel California", artist: "Eagles", duration: "6:30" }
  ];
  // Control para mostrar notificaciones estáticas (Toast)
  // Array que permite múltiples notificaciones del mismo tipo
  staticNotifications = [];
  notificationIdCounter = 0;
  // Referencia a las notificaciones renderizadas para medir alturas
  notificationComponents;
  /**
   * Callback para obtener la altura real de una notificación por su índice.
   * Usado para el cálculo dinámico del apilado.
   */
  getNotificationHeight = (index) => {
    if (!this.notificationComponents)
      return 92;
    const components = this.notificationComponents.toArray();
    if (index < 0 || index >= components.length)
      return 92;
    return components[index].getHeight();
  };
  // Control para Modal
  isModalOpen = signal(false, ...ngDevMode ? [{ debugName: "isModalOpen" }] : []);
  // Datos para Accordion
  accordionItems = [
    {
      id: 1,
      title: "\xBFQu\xE9 es Disc and Records?",
      content: "Una plataforma social para amantes de la m\xFAsica donde puedes descubrir, coleccionar y compartir tus \xE1lbumes y canciones favoritas."
    },
    {
      id: 2,
      title: "\xBFC\xF3mo a\xF1ado m\xFAsica a mi colecci\xF3n?",
      content: 'Navega por nuestro cat\xE1logo, busca tus artistas favoritos y haz clic en el bot\xF3n "A\xF1adir a mi lista" en cualquier \xE1lbum o canci\xF3n.'
    },
    {
      id: 3,
      title: "\xBFPuedo compartir mis listas de reproducci\xF3n?",
      content: "S\xED, puedes hacer p\xFAblicas tus listas y compartirlas con tus amigos o la comunidad. Tambi\xE9n puedes colaborar en listas compartidas."
    },
    {
      id: 4,
      title: "\xBFHay una aplicaci\xF3n m\xF3vil?",
      content: "Actualmente estamos en desarrollo. Por ahora, nuestra web es totalmente responsive y funciona perfectamente en dispositivos m\xF3viles."
    }
  ];
  // Datos para Tabs
  tabsExample = [
    { id: "overview", label: "Resumen", content: "Informaci\xF3n general del \xE1lbum, a\xF1o de lanzamiento y g\xE9neros musicales." },
    { id: "tracklist", label: "Lista de Canciones", content: "Todas las canciones del \xE1lbum con duraci\xF3n y colaboradores." },
    { id: "reviews", label: "Rese\xF1as", content: "Opiniones de la comunidad y cr\xEDticas profesionales sobre este \xE1lbum." },
    { id: "similar", label: "Similares", content: "\xC1lbumes y artistas similares que te podr\xEDan gustar." }
  ];
  // Métodos para manejar notificaciones estáticas (Toast)
  // Cada llamada añade una nueva notificación al array
  showToast(type) {
    const messages = {
      success: { title: "\xA1Guardado!", message: "Tu lista de reproducci\xF3n se ha actualizado.", duration: 3e3 },
      error: { title: "Error de conexi\xF3n", message: "No se pudo cargar la informaci\xF3n del \xE1lbum.", duration: 5e3 },
      warning: { title: "Sesi\xF3n pr\xF3xima a expirar", message: "Tu sesi\xF3n caducar\xE1 en 2 minutos.", duration: 7e3 },
      info: { title: "Nueva funcionalidad", message: "Ahora puedes exportar tus listas de reproducci\xF3n.", duration: 4e3 }
    };
    const notificationId = ++this.notificationIdCounter;
    const _a = messages[type], { duration } = _a, messageData = __objRest(_a, ["duration"]);
    this.staticNotifications.push(__spreadValues({
      id: notificationId,
      type
    }, messageData));
    setTimeout(() => {
      this.removeStaticNotification(notificationId);
    }, duration);
  }
  // Elimina una notificación específica por su ID
  removeStaticNotification(id) {
    const index = this.staticNotifications.findIndex((n) => n.id === id);
    if (index !== -1) {
      this.staticNotifications.splice(index, 1);
    }
  }
  // Métodos para notificaciones dinámicas (MANIPULACIÓN DOM AVANZADA)
  showDynamicNotification(type) {
    const messages = {
      success: { title: "\xA1\xC9xito!", message: "Notificaci\xF3n creada din\xE1micamente en el DOM" },
      error: { title: "Error", message: "Esta notificaci\xF3n fue creada con createElement" },
      warning: { title: "Advertencia", message: "Se cre\xF3 el componente en tiempo de ejecuci\xF3n" },
      info: { title: "Informaci\xF3n", message: "El componente se a\xF1adi\xF3 al body con appendChild" }
    };
    this.notificationService.show(__spreadProps(__spreadValues({
      type
    }, messages[type]), {
      duration: 5e3,
      position: "bottom-right"
    }));
  }
  // Métodos para Modal
  openModal() {
    this.isModalOpen.set(true);
  }
  closeModal() {
    this.isModalOpen.set(false);
  }
  // Métodos para manipulación DOM de estilos (carousel)
  toggleCarouselHighlight() {
    if (this.demoCarousel) {
      this.demoCarousel.toggleHighlight();
    }
  }
  updateCarouselOpacity(event) {
    const input2 = event.target;
    this.carouselOpacity = parseFloat(input2.value);
    if (this.demoCarousel) {
      this.demoCarousel.setOpacity(this.carouselOpacity);
    }
  }
  static \u0275fac = function StyleGuide_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _StyleGuide)();
  };
  static \u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _StyleGuide, selectors: [["app-style-guide"]], viewQuery: function StyleGuide_Query(rf, ctx) {
    if (rf & 1) {
      \u0275\u0275viewQuery(_c06, 5);
      \u0275\u0275viewQuery(Notification, 5);
    }
    if (rf & 2) {
      let _t;
      \u0275\u0275queryRefresh(_t = \u0275\u0275loadQuery()) && (ctx.demoCarousel = _t.first);
      \u0275\u0275queryRefresh(_t = \u0275\u0275loadQuery()) && (ctx.notificationComponents = _t);
    }
  }, decls: 34, vars: 18, consts: [["demoCarousel", ""], [1, "style-guide"], [1, "style-guide__sidebar"], ["aria-haspopup", "menu", "aria-label", "Men\xFA de secciones de la gu\xEDa de estilos", 1, "style-guide__sidebar-toggle", 3, "click"], ["aria-hidden", "true", 1, "style-guide__sidebar-icon"], ["role", "menu", 1, "style-guide__sidebar-menu"], ["role", "none", 1, "style-guide__sidebar-item"], ["type", "button", "role", "menuitem", 1, "style-guide__sidebar-link", 3, "click"], [1, "style-guide__container"], [1, "style-guide__header"], [1, "style-guide__intro"], [1, "style-guide__section"], ["position", "top-right", 3, "type", "title", "message", "stackIndex", "getHeightAt", "autoDismiss", "duration"], [1, "showcase__description"], [1, "showcase"], [1, "font-showcase"], [1, "font-showcase__header"], [1, "font-showcase__tag"], [1, "font-showcase__samples", 2, "font-family", "'Space Grotesk', sans-serif"], [1, "font-showcase__sample"], [1, "font-showcase__label"], [1, "text-small"], [1, "font-showcase__usage"], [1, "font-showcase__tag", "font-showcase__tag--accent"], [1, "font-showcase__samples", 2, "font-family", "'Monoton', cursive"], [1, "monoton-sample", "monoton-sample--lg"], [1, "monoton-sample", "monoton-sample--md"], [1, "monoton-sample", "monoton-sample--sm"], [1, "color-section-title"], [1, "color-grid"], [1, "color-card"], [1, "color-card__swatch", 2, "background-color", "#ED9C05"], [1, "color-card__info"], [1, "color-card__name"], [1, "color-card__hex"], [1, "color-card__swatch", 2, "background-color", "#CA6703"], [1, "color-card__swatch", 2, "background-color", "#BB3F03"], [1, "color-card__swatch", 2, "background-color", "#9D2227"], [1, "color-card__swatch", 2, "background-color", "#93CFBB"], [1, "color-card__swatch", 2, "background-color", "#0A9295"], [1, "color-card__swatch", 2, "background-color", "#015F72"], [1, "color-card__swatch", 2, "background-color", "#01131B"], [1, "color-card__swatch", 2, "background-color", "#FBFAF2"], [1, "color-card__swatch", 2, "background-color", "#E7D8AB"], [1, "color-card__swatch", 2, "background-color", "#013946"], [1, "color-grid", "color-grid--semantic"], [1, "color-card__swatch", 2, "background-color", "#E04A4A"], [1, "color-card__swatch", 2, "background-color", "#FFC047"], [1, "color-card__swatch", 2, "background-color", "#FEF84A"], [1, "color-card__swatch", 2, "background-color", "#AAD661"], [1, "showcase__row"], [1, "shadow-demo"], [1, "shadow-demo__box", "shadow-demo__box--xs"], [1, "shadow-demo__box", "shadow-demo__box--s"], [1, "shadow-demo__box", "shadow-demo__box--m"], [1, "shadow-demo__box", "shadow-demo__box--l"], [2, "margin-top", "2rem"], [1, "shadow-demo__box", "shadow-demo__box--vinyl-s"], [1, "shadow-demo__box", "shadow-demo__box--vinyl-m"], [1, "shadow-demo__box", "shadow-demo__box--vinyl-l"], [1, "spacing-grid"], [1, "spacing-card"], [1, "spacing-card__visual"], [1, "spacing-card__block", 2, "width", "0.5rem", "height", "0.5rem"], [1, "spacing-card__info"], [1, "spacing-card__name"], [1, "spacing-card__value"], [1, "spacing-card__block", 2, "width", "1rem", "height", "1rem"], [1, "spacing-card__block", 2, "width", "2rem", "height", "2rem"], [1, "spacing-card__block", 2, "width", "3rem", "height", "3rem"], [1, "spacing-card__block", 2, "width", "4rem", "height", "4rem"], [1, "spacing-card__block", 2, "width", "5rem", "height", "5rem"], [1, "showcase__item"], ["variant", "primary", 3, "clicked"], ["variant", "secondary", 3, "clicked"], ["variant", "ghost", 3, "clicked"], ["variant", "danger", 3, "clicked"], ["size", "sm", 3, "clicked"], ["size", "md", 3, "clicked"], ["size", "lg", 3, "clicked"], [3, "disabled"], ["href", "#"], [3, "loading"], [1, "showcase__column"], [1, "showcase__item", "showcase__item--full"], [3, "clicked", "fullWidth"], ["mode", "inline", "size", "sm", 3, "show"], ["mode", "inline", "size", "md", 3, "show"], ["mode", "inline", "size", "lg", 3, "show"], [1, "showcase__row", 2, "margin-top", "1rem"], ["mode", "inline", "color", "primary", 3, "show"], ["mode", "inline", "color", "secondary", 3, "show"], [1, "showcase__item", 2, "background", "var(--color-border)", "padding", "1rem"], ["mode", "inline", "color", "white", 3, "show"], [2, "color", "white"], [3, "clicked"], ["size", "sm", 3, "value"], ["size", "md", 3, "value", "showLabel"], ["size", "lg", 3, "value", "showLabel"], ["variant", "primary", 3, "value", "showLabel"], ["variant", "success", 3, "value", "showLabel"], ["variant", "warning", 3, "value", "showLabel"], ["variant", "error", 3, "value", "showLabel"], [3, "indeterminate"], [3, "value", "striped", "showLabel"], ["size", "lg", 3, "value", "showLabel", "variant"], [3, "clicked", "disabled"], ["variant", "secondary", 3, "clicked", "disabled"], ["variant", "primary"], ["variant", "secondary"], ["variant", "success"], ["variant", "warning"], ["variant", "error"], ["variant", "info"], ["size", "sm", "variant", "primary"], ["size", "md", "variant", "primary"], ["size", "lg", "variant", "primary"], [2, "display", "flex", "gap", "0.5rem", "flex-wrap", "wrap"], [2, "display", "flex", "gap", "0.5rem", "align-items", "center"], [2, "font-weight", "600"], ["variant", "error", "size", "sm"], ["href", "#", 1, "link"], ["href", "#", 1, "link", "link--primary"], ["href", "#", 1, "link", "link--underlined"], ["href", "#", 1, "link", "link--arrow"], [1, "toggle-wrapper"], ["type", "checkbox", 1, "toggle"], [1, "toggle-label"], ["type", "checkbox", "checked", "", 1, "toggle"], [1, "toggle-wrapper", "toggle-wrapper--disabled"], ["type", "checkbox", "disabled", "", 1, "toggle"], [1, "checkbox-wrapper"], ["type", "checkbox", 1, "checkbox"], [1, "checkbox-label"], ["type", "checkbox", "checked", "", 1, "checkbox"], [1, "checkbox-wrapper", "checkbox-wrapper--disabled"], ["type", "checkbox", "disabled", "", 1, "checkbox"], [1, "radio-wrapper"], ["type", "radio", "name", "demo-radio", "checked", "", 1, "radio"], [1, "radio-label"], ["type", "radio", "name", "demo-radio", 1, "radio"], [1, "radio-wrapper", "radio-wrapper--disabled"], ["type", "radio", "name", "demo-radio-disabled", "disabled", "", 1, "radio"], [1, "showcase__grid", "showcase__grid--forms"], ["label", "Email", "type", "email", "placeholder", "tu@email.com", "helpText", "Nunca compartiremos tu email"], ["label", "Usuario", "type", "text", "placeholder", "Tu nombre de usuario", "errorMessage", "Este usuario ya existe", 3, "hasError"], ["label", "Contrase\xF1a", "type", "password", "placeholder", "\u2022\u2022\u2022\u2022\u2022\u2022\u2022\u2022", "helpText", "Contrase\xF1a segura", 3, "hasSuccess"], ["label", "Campo deshabilitado", "type", "text", "placeholder", "No disponible", 3, "disabled"], ["label", "Texto", "type", "text", "placeholder", "Escribe algo..."], ["label", "Email", "type", "email", "placeholder", "correo@ejemplo.com"], ["label", "Contrase\xF1a", "type", "password", "placeholder", "Tu contrase\xF1a"], ["label", "N\xFAmero", "type", "number", "placeholder", "123"], ["label", "Tel\xE9fono", "type", "tel", "placeholder", "+34 600 000 000"], ["label", "Fecha", "type", "date"], [1, "showcase__row", "showcase__row--cards-polaroid"], [1, "showcase__item", "showcase__item--card-polaroid"], ["title", "Rumours", "subtitle", "Fleetwood Mac", "imageShape", "square", "imageSize", "medium", "variant", "normal", "cardType", "polaroid", "titleLink", "#album", "subtitleLink", "#artist"], ["title", "Bohemian Rhapsody", "subtitle", "Queen", "imageShape", "circle", "imageSize", "medium", "variant", "normal", "cardType", "polaroid", "titleLink", "#song", "subtitleLink", "#artist"], ["title", "Hotel California", "subtitle", "Eagles", "imageShape", "square", "imageSize", "medium", "variant", "vinilo", "cardType", "polaroid", "titleLink", "#album", "subtitleLink", "#artist"], [2, "margin-bottom", "1rem", "font-size", "1.125rem", "color", "var(--text-secondary)"], ["title", "JohnDoe", "imageShape", "square", "imageSize", "large", "variant", "normal", "cardType", "profile", "layout", "vertical", 3, "badges", "actions"], ["title", "Dark Side of the Moon", "subtitle", "Pink Floyd \u2022 1973", "imageShape", "square", "imageSize", "large", "variant", "vinilo", "cardType", "profile", "layout", "vertical", 3, "badges", "actions"], [2, "margin", "2rem 0 1rem", "font-size", "1.125rem", "color", "var(--text-secondary)"], ["title", "Led Zeppelin IV", "subtitle", "Led Zeppelin \u2022 1971", "imageShape", "square", "imageSize", "large", "variant", "normal", "cardType", "profile", "layout", "horizontal", 3, "badges", "actions"], ["title", "Abbey Road", "subtitle", "The Beatles \u2022 1969", "imageShape", "square", "imageSize", "large", "variant", "vinilo", "cardType", "profile", "layout", "horizontal", 3, "badges", "actions"], ["label", "Descripci\xF3n", "id", "textarea-normal", "placeholder", "Escribe tu descripci\xF3n aqu\xED...", "hint", "M\xE1ximo 500 caracteres", 3, "rows"], ["label", "Biograf\xEDa", "id", "textarea-error", "placeholder", "Escribe tu biograf\xEDa...", "error", "Este campo es obligatorio", 3, "rows"], ["label", "Comentario", "id", "textarea-disabled", "placeholder", "No disponible", 3, "rows", "disabled"], ["label", "G\xE9nero musical", "id", "select-normal", "placeholder", "Selecciona tu g\xE9nero favorito", "hint", "Elige el g\xE9nero que m\xE1s te gusta", 3, "options"], ["label", "G\xE9nero musical", "id", "select-error", "placeholder", "Selecciona tu g\xE9nero favorito", "error", "Debes seleccionar un g\xE9nero", 3, "options"], ["label", "G\xE9nero musical", "id", "select-disabled", "placeholder", "No disponible", 3, "options", "disabled"], ["label", "Acepto los t\xE9rminos y condiciones", "id", "checkbox-normal"], ["label", "Suscribirme al newsletter", "id", "checkbox-error", "error", "Debes aceptar para continuar"], ["label", "Opci\xF3n no disponible", "id", "checkbox-disabled", 3, "disabled"], ["label", "Privacidad del perfil", "name", "privacy", 3, "options"], ["label", "Privacidad del perfil", "name", "privacy-error", "error", "Debes seleccionar una opci\xF3n", 3, "options"], ["label", "Privacidad del perfil", "name", "privacy-inline", 3, "options", "inline"], [3, "items"], ["separator", "\u203A", 3, "items"], ["type", "success", "title", "\xA1\xC9xito!", "message", "Tu \xE1lbum se ha agregado correctamente a tu colecci\xF3n."], ["type", "error", "title", "Error", "message", "No se pudo conectar con el servidor. Por favor, int\xE9ntalo de nuevo."], ["type", "warning", "title", "Advertencia", "message", "Tu sesi\xF3n caducar\xE1 en 5 minutos. Guarda tus cambios."], ["type", "info", "title", "Informaci\xF3n", "message", "Tenemos nueva m\xFAsica disponible en tu secci\xF3n de recomendados."], ["type", "warning", "title", "Cambios pendientes", "message", "Tienes cambios sin guardar. \xBFDeseas salir de todas formas?", 3, "dismissible"], [1, "showcase__grid", 2, "gap", "3rem", "padding", "2rem"], ["text", "Tooltip arriba", "position", "top"], ["text", "Tooltip abajo", "position", "bottom"], ["text", "Tooltip izquierda", "position", "left"], ["text", "Tooltip derecha", "position", "right"], ["variant", "primary", "size", "md", 3, "click"], ["variant", "danger", "size", "md", 3, "click"], ["variant", "secondary", "size", "md", 3, "click"], ["variant", "ghost", "size", "md", 3, "click"], [1, "showcase__item", "showcase__item--centered"], ["title", "Confirmar acci\xF3n", 3, "onClose", "isOpen"], [2, "display", "flex", "gap", "1rem", "margin-top", "1.5rem"], ["mode", "single", 3, "items"], ["mode", "multiple", 3, "items"], [3, "tabs", "initialActiveTab"], ["title", "\xC1LBUMES EN TENDENCIA"], ["imageShape", "square", "imageSize", "medium", "variant", "normal", "cardType", "polaroid", "titleLink", "#album", "subtitleLink", "#artist", 3, "title", "subtitle", 4, "ngFor", "ngForOf"], ["title", "CANCIONES EN TENDENCIA"], ["imageShape", "circle", "imageSize", "medium", "variant", "normal", "cardType", "polaroid", "titleLink", "#song", "subtitleLink", "#artist", 3, "title", "subtitle", 4, "ngFor", "ngForOf"], ["title", "DEMO - MANIPULACI\xD3N DE ESTILOS"], [1, "style-guide__carousel-demo-controls"], ["variant", "secondary", "size", "sm", 3, "clicked"], [1, "style-guide__carousel-demo-opacity"], ["type", "range", "min", "0", "max", "1", "step", "0.1", 1, "style-guide__carousel-demo-range", 3, "input", "value"], ["imageShape", "square", "imageSize", "medium", "variant", "normal", "cardType", "polaroid", "titleLink", "#album", "subtitleLink", "#artist", 3, "title", "subtitle"], ["imageShape", "circle", "imageSize", "medium", "variant", "normal", "cardType", "polaroid", "titleLink", "#song", "subtitleLink", "#artist", 3, "title", "subtitle"], [1, "layout-info-card"], [1, "layout-info-card__header"], ["viewBox", "0 0 24 24", "fill", "none", "stroke", "currentColor", "stroke-width", "2", "stroke-linecap", "round", "stroke-linejoin", "round", 1, "layout-info-card__icon"], ["x", "3", "y", "3", "width", "18", "height", "18", "rx", "2", "ry", "2"], ["x1", "3", "y1", "9", "x2", "21", "y2", "9"], [1, "layout-info-card__name"], [1, "layout-info-card__desc"], [1, "layout-info-card__vars"], ["x1", "3", "y1", "12", "x2", "21", "y2", "12"], ["x1", "3", "y1", "6", "x2", "21", "y2", "6"], ["x1", "3", "y1", "18", "x2", "21", "y2", "18"], ["x1", "3", "y1", "15", "x2", "21", "y2", "15"], [1, "showcase__row", "showcase__row--wrap"], [1, "showcase__item", "showcase__item--breakpoint"], ["title", "Mobile", "subtitle", "320px+", "imageShape", "square", "imageSize", "medium", "variant", "normal", "cardType", "polaroid", 3, "placeholderIcon"], [1, "showcase__code"], ["title", "Tablet", "subtitle", "768px+", "imageShape", "square", "imageSize", "medium", "variant", "normal", "cardType", "polaroid", 3, "placeholderIcon"], ["title", "Desktop", "subtitle", "1024px+", "imageShape", "square", "imageSize", "medium", "variant", "vinilo", "cardType", "polaroid", 3, "placeholderIcon"], ["title", "Large Desktop", "subtitle", "1200px+", "imageShape", "square", "imageSize", "medium", "variant", "vinilo", "cardType", "polaroid", 3, "placeholderIcon"], [1, "z-index-scale"], [1, "z-index-scale__item", "z-index-scale__item--10"], [1, "z-index-scale__level"], [1, "z-index-scale__name"], [1, "z-index-scale__desc"], [1, "z-index-scale__item", "z-index-scale__item--9"], [1, "z-index-scale__item", "z-index-scale__item--8"], [1, "z-index-scale__item", "z-index-scale__item--7"], [1, "z-index-scale__item", "z-index-scale__item--6"], [1, "z-index-scale__item", "z-index-scale__item--5"], [1, "z-index-scale__item", "z-index-scale__item--4"], [1, "z-index-scale__item", "z-index-scale__item--3"], [1, "z-index-scale__item", "z-index-scale__item--2"], [1, "z-index-scale__item", "z-index-scale__item--1"], [1, "z-index-scale__item", "z-index-scale__item--0"], [1, "css-var-card"], [1, "css-var-card__name"], [1, "css-var-card__swatch", 2, "background-color", "var(--bg-primary)"], [1, "css-var-card__desc"], [1, "css-var-card__swatch", 2, "background-color", "var(--bg-secondary)"], [1, "css-var-card__swatch", 2, "background-color", "var(--header-bg)"], [1, "css-var-card__swatch", 2, "background-color", "var(--nav-bg)"], [1, "css-var-card__swatch", 2, "background-color", "var(--color-primary)"], [1, "css-var-card__swatch", 2, "background-color", "var(--shadow-color)"], ["position", "top-right", 3, "dismissed", "type", "title", "message", "stackIndex", "getHeightAt", "autoDismiss", "duration"]], template: function StyleGuide_Template(rf, ctx) {
    if (rf & 1) {
      \u0275\u0275elementStart(0, "div", 1)(1, "aside", 2)(2, "button", 3);
      \u0275\u0275listener("click", function StyleGuide_Template_button_click_2_listener($event) {
        ctx.toggleSidebar();
        return $event.stopPropagation();
      });
      \u0275\u0275elementStart(3, "span", 4);
      \u0275\u0275text(4, "\u2630");
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(5, "ul", 5)(6, "li", 6)(7, "button", 7);
      \u0275\u0275listener("click", function StyleGuide_Template_button_click_7_listener() {
        ctx.selectSection("foundations");
        return ctx.closeSidebar();
      });
      \u0275\u0275text(8, "Fundamentos");
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(9, "li", 6)(10, "button", 7);
      \u0275\u0275listener("click", function StyleGuide_Template_button_click_10_listener() {
        ctx.selectSection("atoms");
        return ctx.closeSidebar();
      });
      \u0275\u0275text(11, "\xC1tomos");
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(12, "li", 6)(13, "button", 7);
      \u0275\u0275listener("click", function StyleGuide_Template_button_click_13_listener() {
        ctx.selectSection("molecules");
        return ctx.closeSidebar();
      });
      \u0275\u0275text(14, "Mol\xE9culas");
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(15, "li", 6)(16, "button", 7);
      \u0275\u0275listener("click", function StyleGuide_Template_button_click_16_listener() {
        ctx.selectSection("organisms");
        return ctx.closeSidebar();
      });
      \u0275\u0275text(17, "Organismos");
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(18, "li", 6)(19, "button", 7);
      \u0275\u0275listener("click", function StyleGuide_Template_button_click_19_listener() {
        ctx.selectSection("layout");
        return ctx.closeSidebar();
      });
      \u0275\u0275text(20, "Layout");
      \u0275\u0275elementEnd()()()();
      \u0275\u0275elementStart(21, "div", 8)(22, "header", 9)(23, "h1");
      \u0275\u0275text(24, "Gu\xEDa de Estilo");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(25, "p", 10);
      \u0275\u0275text(26, "Sistema de componentes reutilizables para Disc and Records");
      \u0275\u0275elementEnd()();
      \u0275\u0275conditionalCreate(27, StyleGuide_Conditional_27_Template, 385, 0, "section", 11);
      \u0275\u0275conditionalCreate(28, StyleGuide_Conditional_28_Template, 365, 32, "section", 11);
      \u0275\u0275conditionalCreate(29, StyleGuide_Conditional_29_Template, 222, 32, "section", 11);
      \u0275\u0275conditionalCreate(30, StyleGuide_Conditional_30_Template, 144, 10, "section", 11);
      \u0275\u0275conditionalCreate(31, StyleGuide_Conditional_31_Template, 207, 4, "section", 11);
      \u0275\u0275elementEnd();
      \u0275\u0275repeaterCreate(32, StyleGuide_For_33_Template, 1, 7, "app-notification", 12, _forTrack02);
      \u0275\u0275elementEnd();
    }
    if (rf & 2) {
      \u0275\u0275advance();
      \u0275\u0275classProp("style-guide__sidebar--open", ctx.sidebarOpen());
      \u0275\u0275advance();
      \u0275\u0275attribute("aria-expanded", ctx.sidebarOpen());
      \u0275\u0275advance(5);
      \u0275\u0275classProp("style-guide__sidebar-link--active", ctx.activeSection() === "foundations");
      \u0275\u0275advance(3);
      \u0275\u0275classProp("style-guide__sidebar-link--active", ctx.activeSection() === "atoms");
      \u0275\u0275advance(3);
      \u0275\u0275classProp("style-guide__sidebar-link--active", ctx.activeSection() === "molecules");
      \u0275\u0275advance(3);
      \u0275\u0275classProp("style-guide__sidebar-link--active", ctx.activeSection() === "organisms");
      \u0275\u0275advance(3);
      \u0275\u0275classProp("style-guide__sidebar-link--active", ctx.activeSection() === "layout");
      \u0275\u0275advance(8);
      \u0275\u0275conditional(ctx.activeSection() === "foundations" ? 27 : -1);
      \u0275\u0275advance();
      \u0275\u0275conditional(ctx.activeSection() === "atoms" ? 28 : -1);
      \u0275\u0275advance();
      \u0275\u0275conditional(ctx.activeSection() === "molecules" ? 29 : -1);
      \u0275\u0275advance();
      \u0275\u0275conditional(ctx.activeSection() === "organisms" ? 30 : -1);
      \u0275\u0275advance();
      \u0275\u0275conditional(ctx.activeSection() === "layout" ? 31 : -1);
      \u0275\u0275advance();
      \u0275\u0275repeater(ctx.staticNotifications);
    }
  }, dependencies: [
    CommonModule,
    NgForOf,
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
  ], styles: ['@charset "UTF-8";\n\n\n\n.style-guide[_ngcontent-%COMP%] {\n  min-height: 100vh;\n  background-color: var(--bg-primary);\n  padding-top: 0;\n  position: relative;\n}\n.style-guide__sidebar[_ngcontent-%COMP%] {\n  position: fixed;\n  left: 2rem;\n  bottom: 2rem;\n  z-index: 3;\n  display: flex;\n  flex-direction: column-reverse;\n  align-items: flex-start;\n  gap: 1rem;\n  pointer-events: none;\n}\n@media (max-width: 768px) {\n  .style-guide__sidebar[_ngcontent-%COMP%] {\n    left: 1rem;\n    bottom: 1rem;\n  }\n}\n.style-guide__sidebar-toggle[_ngcontent-%COMP%] {\n  display: inline-flex;\n  align-items: center;\n  justify-content: center;\n  gap: 0.5rem;\n  font-family: "Space Grotesk", sans-serif;\n  font-weight: 600;\n  text-transform: uppercase;\n  letter-spacing: 0.05em;\n  text-decoration: none;\n  cursor: pointer;\n  border: 3px solid var(--border-color);\n  border-radius: 9999px;\n  transition: all 150ms ease-in-out;\n  white-space: nowrap;\n  box-sizing: border-box;\n  background-color: var(--color-primary);\n  border: 4px solid var(--border-color);\n  box-shadow: 6px 6px 0px var(--shadow-color);\n  width: 60px;\n  height: 60px;\n  min-height: 44px;\n  padding: 0;\n  font-size: 1.75rem;\n  position: relative;\n  z-index: 2;\n  pointer-events: auto;\n}\n.style-guide__sidebar-toggle[_ngcontent-%COMP%]:focus-visible {\n  outline: 3px solid var(--color-accent);\n  outline-offset: 2px;\n}\n.style-guide__sidebar-toggle[_ngcontent-%COMP%]:hover {\n  background-color: var(--color-secondary);\n  box-shadow: 3px 3px 0px var(--shadow-color);\n  transform: translate(3px, 3px);\n}\n.style-guide__sidebar-toggle[_ngcontent-%COMP%]:active {\n  box-shadow: 0px 0px 0px var(--shadow-color);\n  transform: translate(6px, 6px);\n}\n.style-guide__sidebar-toggle[_ngcontent-%COMP%]:focus-visible {\n  outline: 3px solid #BB3F03;\n  outline-offset: 4px;\n}\n.style-guide__sidebar-icon[_ngcontent-%COMP%] {\n  font-size: 1.75rem;\n  line-height: 1;\n  flex-shrink: 0;\n}\n.style-guide__sidebar-menu[_ngcontent-%COMP%] {\n  list-style: none;\n  margin: 0;\n  padding: 0;\n  display: flex;\n  flex-direction: column;\n  align-items: flex-start;\n  gap: 0.5rem;\n  pointer-events: auto;\n  opacity: 0;\n  visibility: hidden;\n  transform: translateY(20px) scale(0.9);\n  transform-origin: bottom left;\n  transition:\n    opacity 0.3s ease,\n    transform 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275),\n    visibility 0.3s;\n}\n.style-guide__sidebar--open[_ngcontent-%COMP%]   .style-guide__sidebar-menu[_ngcontent-%COMP%] {\n  opacity: 1;\n  visibility: visible;\n  transform: translateY(0) scale(1);\n}\n.style-guide__sidebar-item[_ngcontent-%COMP%] {\n  list-style: none;\n}\n.style-guide__sidebar-link[_ngcontent-%COMP%] {\n  display: inline-flex;\n  align-items: center;\n  justify-content: center;\n  gap: 0.5rem;\n  font-family: "Space Grotesk", sans-serif;\n  font-weight: 600;\n  text-transform: uppercase;\n  letter-spacing: 0.05em;\n  text-decoration: none;\n  cursor: pointer;\n  border: 3px solid var(--border-color);\n  border-radius: 9999px;\n  transition: all 150ms ease-in-out;\n  white-space: nowrap;\n  box-sizing: border-box;\n  background-color: var(--bg-primary);\n  color: var(--text-primary);\n  border: 3px solid var(--border-color);\n  box-shadow: 4px 4px 0px var(--shadow-color);\n  min-width: 180px;\n  padding: 1rem 2rem;\n  font-size: 0.875rem;\n  min-height: 44px;\n  position: relative;\n}\n.style-guide__sidebar-link[_ngcontent-%COMP%]:focus-visible {\n  outline: 3px solid var(--color-accent);\n  outline-offset: 2px;\n}\n.style-guide__sidebar-link[_ngcontent-%COMP%]:hover {\n  background-color: var(--bg-secondary);\n  color: var(--text-primary);\n  box-shadow: 2px 2px 0px var(--shadow-color);\n  transform: translate(2px, 2px);\n}\n.style-guide__sidebar-link[_ngcontent-%COMP%]:active {\n  box-shadow: 0px 0px 0px var(--shadow-color);\n  transform: translate(4px, 4px);\n}\n.style-guide__sidebar-link[_ngcontent-%COMP%]:focus-visible {\n  outline: 3px solid #BB3F03;\n  outline-offset: 2px;\n}\n.style-guide__sidebar-link--active[_ngcontent-%COMP%] {\n  background-color: var(--color-primary);\n  color: var(--text-primary);\n  font-weight: 700;\n  border-color: var(--text-primary);\n}\n.style-guide__container[_ngcontent-%COMP%] {\n  flex: 1;\n  padding: 4rem;\n  width: 100%;\n  min-height: calc(100vh - 70px);\n  overflow-y: auto;\n}\n@media (max-width: 768px) {\n  .style-guide__container[_ngcontent-%COMP%] {\n    padding: 3rem;\n    min-height: calc(100vh - 60px);\n  }\n}\n@media (max-width: 480px) {\n  .style-guide__container[_ngcontent-%COMP%] {\n    padding: 2rem;\n  }\n}\n.style-guide__header[_ngcontent-%COMP%] {\n  text-align: center;\n  margin-bottom: 4rem;\n  padding: 4rem 0;\n  border-bottom: 3px solid var(--border-color) solid var(--text-primary);\n}\n.style-guide__header[_ngcontent-%COMP%]   h1[_ngcontent-%COMP%] {\n  font-size: 3rem;\n  color: var(--color-primary);\n  margin-bottom: 1rem;\n  text-transform: uppercase;\n  letter-spacing: 0.05em;\n}\n@media (max-width: 768px) {\n  .style-guide__header[_ngcontent-%COMP%]   h1[_ngcontent-%COMP%] {\n    font-size: 2rem;\n  }\n}\n.style-guide__intro[_ngcontent-%COMP%] {\n  font-size: 1.25rem;\n  color: var(--text-primary);\n  max-width: 600px;\n  margin: 0 auto;\n}\n@media (max-width: 768px) {\n  .style-guide__intro[_ngcontent-%COMP%] {\n    font-size: 1rem;\n  }\n}\n.style-guide__section[_ngcontent-%COMP%] {\n  margin-bottom: 4rem;\n  padding: 3rem;\n  background-color: var(--bg-secondary);\n  border: 3px solid var(--border-color) solid var(--border-color);\n  border-radius: 8px;\n  box-shadow: 4px 4px 0px var(--shadow-color);\n}\n.style-guide__section[_ngcontent-%COMP%]   h2[_ngcontent-%COMP%] {\n  font-size: 2rem;\n  color: var(--color-secondary);\n  margin-bottom: 3rem;\n  padding-bottom: 1rem;\n  border-bottom: 2px solid var(--text-primary);\n  text-transform: uppercase;\n}\n@media (max-width: 768px) {\n  .style-guide__section[_ngcontent-%COMP%]   h2[_ngcontent-%COMP%] {\n    font-size: 1.5rem;\n  }\n}\n.style-guide__section--placeholder[_ngcontent-%COMP%] {\n  text-align: center;\n  padding: 4rem;\n  opacity: 0.6;\n}\n.style-guide__section--placeholder[_ngcontent-%COMP%]   h2[_ngcontent-%COMP%] {\n  border-bottom: none;\n}\n.style-guide__section--placeholder[_ngcontent-%COMP%]   p[_ngcontent-%COMP%] {\n  color: var(--text-primary);\n  font-size: 1.125rem;\n}\n.showcase[_ngcontent-%COMP%] {\n  margin-bottom: 3rem;\n}\n.showcase[_ngcontent-%COMP%]:last-child {\n  margin-bottom: 0;\n}\n.showcase[_ngcontent-%COMP%]   h3[_ngcontent-%COMP%] {\n  font-size: 1.5rem;\n  color: var(--text-primary);\n  margin-bottom: 2rem;\n  text-transform: uppercase;\n  letter-spacing: 0.05em;\n}\n@media (max-width: 768px) {\n  .showcase[_ngcontent-%COMP%]   h3[_ngcontent-%COMP%] {\n    font-size: 1.25rem;\n  }\n}\n.showcase__row[_ngcontent-%COMP%] {\n  display: flex;\n  gap: 2rem;\n  flex-wrap: wrap;\n  align-items: flex-start;\n}\n@media (max-width: 768px) {\n  .showcase__row[_ngcontent-%COMP%] {\n    gap: 1rem;\n  }\n}\n@media (max-width: 480px) {\n  .showcase__row[_ngcontent-%COMP%] {\n    flex-direction: column;\n  }\n  .showcase__row[_ngcontent-%COMP%]   .showcase__item[_ngcontent-%COMP%] {\n    width: 100%;\n  }\n}\n.showcase__row--cards-polaroid[_ngcontent-%COMP%] {\n  justify-content: flex-start;\n}\n.showcase__row--cards-polaroid[_ngcontent-%COMP%]   .showcase__item--card-polaroid[_ngcontent-%COMP%] {\n  flex: 0 0 auto;\n  width: auto;\n}\n.showcase__row--cards-polaroid[_ngcontent-%COMP%]   .showcase__item--card-polaroid[_ngcontent-%COMP%]   app-card[_ngcontent-%COMP%] {\n  display: block;\n  width: 220px;\n  max-width: 220px;\n}\n@media (max-width: 768px) {\n  .showcase__row--cards-polaroid[_ngcontent-%COMP%] {\n    justify-content: center;\n  }\n}\n@media (max-width: 480px) {\n  .showcase__row--cards-polaroid[_ngcontent-%COMP%]   .showcase__item--card-polaroid[_ngcontent-%COMP%] {\n    width: 100%;\n    max-width: 100%;\n  }\n  .showcase__row--cards-polaroid[_ngcontent-%COMP%]   .showcase__item--card-polaroid[_ngcontent-%COMP%]   app-card[_ngcontent-%COMP%] {\n    width: 100%;\n    max-width: 100%;\n  }\n}\n.showcase__column[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  gap: 2rem;\n  width: 100%;\n}\n.showcase__grid[_ngcontent-%COMP%] {\n  display: grid;\n  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));\n  gap: 3rem 2rem;\n  align-items: start;\n}\n@media (max-width: 768px) {\n  .showcase__grid[_ngcontent-%COMP%] {\n    grid-template-columns: 1fr;\n    gap: 2rem;\n  }\n}\n.showcase__grid--forms[_ngcontent-%COMP%] {\n  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));\n  align-items: flex-start;\n  gap: 4rem;\n}\n@media (max-width: 1024px) {\n  .showcase__grid--forms[_ngcontent-%COMP%] {\n    grid-template-columns: repeat(2, 1fr);\n    gap: 3rem;\n  }\n}\n@media (max-width: 600px) {\n  .showcase__grid--forms[_ngcontent-%COMP%] {\n    grid-template-columns: 1fr;\n    gap: 2rem;\n  }\n}\n.showcase__item[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  gap: 0.5rem;\n  align-items: flex-start;\n  min-width: 0;\n  max-width: 100%;\n}\n.showcase__item--full[_ngcontent-%COMP%] {\n  width: 100%;\n  min-width: 0;\n}\n.showcase__item[_ngcontent-%COMP%]    > *[_ngcontent-%COMP%] {\n  max-width: 100%;\n}\n.showcase__item[_ngcontent-%COMP%]   code[_ngcontent-%COMP%] {\n  font-family: "Courier New", monospace;\n  font-size: 0.875rem;\n  padding: 0.5rem 1rem;\n  background-color: var(--bg-primary);\n  border: 1px solid var(--border-color);\n  border-radius: 5px;\n  color: var(--text-primary);\n  white-space: nowrap;\n  overflow: auto;\n  max-width: 100%;\n}\n@media (max-width: 768px) {\n  .showcase__item[_ngcontent-%COMP%]   code[_ngcontent-%COMP%] {\n    font-size: 0.75rem;\n    padding: 4px 6px;\n    white-space: normal;\n    word-break: break-all;\n  }\n}\napp-carousel[_ngcontent-%COMP%] {\n  display: block;\n  width: 100%;\n  max-width: 100%;\n  min-width: 0;\n}\napp-carousel[_ngcontent-%COMP%]   .carousel__track[_ngcontent-%COMP%]    > app-card[_ngcontent-%COMP%] {\n  display: block;\n  flex: 0 0 220px !important;\n  width: 220px !important;\n  min-width: 220px !important;\n  max-width: 220px !important;\n}\n@media (max-width: 768px) {\n  app-carousel[_ngcontent-%COMP%]   .carousel__track[_ngcontent-%COMP%]    > app-card[_ngcontent-%COMP%] {\n    flex: 0 0 170px !important;\n    width: 170px !important;\n    min-width: 170px !important;\n    max-width: 170px !important;\n  }\n}\n@media (max-width: 480px) {\n  app-carousel[_ngcontent-%COMP%]   .carousel__track[_ngcontent-%COMP%]    > app-card[_ngcontent-%COMP%] {\n    flex: 0 0 150px !important;\n    width: 150px !important;\n    min-width: 150px !important;\n    max-width: 150px !important;\n  }\n}\napp-form-input[_ngcontent-%COMP%], \napp-form-textarea[_ngcontent-%COMP%], \napp-form-select[_ngcontent-%COMP%], \napp-form-checkbox[_ngcontent-%COMP%], \napp-form-radio-group[_ngcontent-%COMP%] {\n  display: block;\n  width: 100%;\n  max-width: 100%;\n}\n.showcase__row[_ngcontent-%COMP%]   app-card[_ngcontent-%COMP%], \n.showcase__column[_ngcontent-%COMP%]   app-card[_ngcontent-%COMP%], \n.showcase__item[_ngcontent-%COMP%]   app-card[_ngcontent-%COMP%] {\n  display: block;\n  width: 100%;\n  max-width: 100%;\n  min-width: 0;\n}\napp-alert[_ngcontent-%COMP%] {\n  display: block;\n  width: 100%;\n}\napp-breadcrumbs[_ngcontent-%COMP%] {\n  display: block;\n  width: 100%;\n  overflow: hidden;\n}\n.style-guide__carousel-demo-controls[_ngcontent-%COMP%] {\n  display: flex;\n  flex-wrap: wrap;\n  gap: 1rem;\n  margin-top: 1rem;\n  align-items: center;\n}\n.style-guide__carousel-demo-opacity[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 0.5rem;\n  flex-wrap: wrap;\n}\n.style-guide__carousel-demo-range[_ngcontent-%COMP%] {\n  width: 150px;\n  max-width: 100%;\n}\n@media (max-width: 768px) {\n  .style-guide__carousel-demo-controls[_ngcontent-%COMP%] {\n    align-items: stretch;\n  }\n  .style-guide__carousel-demo-range[_ngcontent-%COMP%] {\n    width: 100%;\n  }\n}\n.color-swatch[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n  justify-content: center;\n  gap: 0.5rem;\n  padding: 3rem;\n  min-height: 100px;\n  border: 3px solid var(--border-color);\n  transition: transform 0.2s ease;\n}\n.color-swatch[_ngcontent-%COMP%]:hover {\n  transform: translateY(-2px);\n}\n.color-swatch__name[_ngcontent-%COMP%] {\n  font-weight: 700;\n  font-size: 0.875rem;\n  text-transform: uppercase;\n}\n.color-swatch[_ngcontent-%COMP%]   code[_ngcontent-%COMP%] {\n  font-size: 0.75rem;\n  background: rgba(255, 255, 255, 0.8);\n  padding: 2px 6px;\n  border-radius: 2px;\n  color: #000;\n}\n.color-swatch--primary[_ngcontent-%COMP%] {\n  background-color: var(--color-accent-primary);\n  color: var(--color-text-on-accent);\n}\n.color-swatch--secondary[_ngcontent-%COMP%] {\n  background-color: var(--color-accent-secondary);\n  color: var(--color-text-primary);\n}\n.color-swatch--bg[_ngcontent-%COMP%] {\n  background-color: var(--color-bg-primary);\n  color: var(--color-text-primary);\n}\n.color-swatch--bg-secondary[_ngcontent-%COMP%] {\n  background-color: var(--color-bg-secondary);\n  color: var(--color-text-primary);\n}\n.color-swatch--text[_ngcontent-%COMP%] {\n  background-color: var(--color-text-primary);\n  color: var(--color-bg-primary);\n}\n.color-swatch--border[_ngcontent-%COMP%] {\n  background-color: var(--color-border);\n  color: var(--color-bg-primary);\n}\n.color-swatch--success[_ngcontent-%COMP%] {\n  background-color: var(--color-success);\n  color: #fff;\n}\n.color-swatch--warning[_ngcontent-%COMP%] {\n  background-color: var(--color-warning);\n  color: #000;\n}\n.color-swatch--error[_ngcontent-%COMP%] {\n  background-color: var(--color-error);\n  color: #fff;\n}\n.color-swatch--info[_ngcontent-%COMP%] {\n  background-color: var(--color-info);\n  color: #fff;\n}\n.showcase__grid--colors[_ngcontent-%COMP%] {\n  grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));\n}\n.shadow-sample[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  width: 100px;\n  height: 100px;\n  background-color: var(--color-bg-primary);\n  border: 3px solid var(--color-border);\n  font-weight: 600;\n  text-transform: uppercase;\n}\n.shadow-sample--sm[_ngcontent-%COMP%] {\n  box-shadow: 2px 2px 0 var(--color-border);\n}\n.shadow-sample--md[_ngcontent-%COMP%] {\n  box-shadow: 4px 4px 0 var(--color-border);\n}\n.shadow-sample--lg[_ngcontent-%COMP%] {\n  box-shadow: 6px 6px 0 var(--color-border);\n}\n.spacing-samples[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  gap: 1rem;\n  width: 100%;\n}\n.spacing-sample[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  height: 40px;\n  min-width: 40px;\n  background-color: var(--color-accent-primary);\n  color: var(--color-text-on-accent);\n  font-weight: 600;\n  font-size: 0.75rem;\n  border: 2px solid var(--color-border);\n}\n.spacing-sample[_ngcontent-%COMP%]   span[_ngcontent-%COMP%] {\n  white-space: nowrap;\n}\n.typography-sample[_ngcontent-%COMP%] {\n  background-color: var(--color-bg-primary);\n  padding: 3rem;\n  border: 2px solid var(--color-border);\n}\n.typography-sample[_ngcontent-%COMP%]   h1[_ngcontent-%COMP%], \n.typography-sample[_ngcontent-%COMP%]   h2[_ngcontent-%COMP%], \n.typography-sample[_ngcontent-%COMP%]   h3[_ngcontent-%COMP%], \n.typography-sample[_ngcontent-%COMP%]   h4[_ngcontent-%COMP%] {\n  margin-bottom: 1rem;\n}\n.typography-sample[_ngcontent-%COMP%]   p[_ngcontent-%COMP%] {\n  margin-bottom: 0.5rem;\n}\n.layout-diagram[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  gap: 3px;\n  border: 4px solid var(--border-color);\n  background-color: var(--border-color);\n  max-width: 600px;\n  margin: 0 auto;\n  border-radius: 8px;\n  overflow: hidden;\n  box-shadow: 4px 4px 0px var(--shadow-color);\n}\n.layout-diagram__header[_ngcontent-%COMP%], \n.layout-diagram__footer[_ngcontent-%COMP%] {\n  background-color: var(--color-primary);\n  color: var(--text-dark);\n  padding: 2rem;\n  text-align: center;\n  font-weight: 700;\n  text-transform: uppercase;\n  letter-spacing: 0.05em;\n}\n.layout-diagram__body[_ngcontent-%COMP%] {\n  display: flex;\n  gap: 3px;\n  min-height: 200px;\n}\n.layout-diagram__sidebar[_ngcontent-%COMP%] {\n  flex: 0 0 150px;\n  background-color: var(--bg-secondary);\n  padding: 2rem;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  font-weight: 600;\n  text-transform: uppercase;\n}\n@media (max-width: 768px) {\n  .layout-diagram__sidebar[_ngcontent-%COMP%] {\n    flex: 0 0 80px;\n    font-size: 0.75rem;\n  }\n}\n.layout-diagram__main[_ngcontent-%COMP%] {\n  flex: 1;\n  background-color: var(--bg-primary);\n  padding: 2rem;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  font-weight: 600;\n  text-transform: uppercase;\n}\n.showcase__grid--breakpoints[_ngcontent-%COMP%] {\n  grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));\n}\n.breakpoint-card[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n  gap: 0.5rem;\n  padding: 2rem;\n  background-color: var(--bg-primary);\n  border: 3px solid var(--border-color);\n  border-radius: 5px;\n  text-align: center;\n  box-shadow: 3px 3px 0px var(--shadow-color);\n  transition: all 150ms ease-in-out;\n}\n.breakpoint-card[_ngcontent-%COMP%]:hover {\n  transform: translate(-2px, -2px);\n  box-shadow: 5px 5px 0px var(--shadow-color);\n}\n.breakpoint-card__name[_ngcontent-%COMP%] {\n  font-weight: 700;\n  font-size: 1rem;\n  text-transform: uppercase;\n  color: var(--text-primary);\n}\n.breakpoint-card__value[_ngcontent-%COMP%] {\n  font-size: 1.5rem;\n  font-weight: 600;\n  color: var(--color-primary);\n}\n.breakpoint-card[_ngcontent-%COMP%]   code[_ngcontent-%COMP%] {\n  font-size: 0.75rem;\n}\n.showcase__item--centered[_ngcontent-%COMP%] {\n  align-items: center;\n  width: 100%;\n  margin: 0 auto;\n}\n.font-showcase[_ngcontent-%COMP%] {\n  background-color: var(--bg-secondary);\n  border: 3px solid var(--border-color);\n  border-radius: 8px;\n  padding: 3rem;\n  margin-bottom: 3rem;\n}\n.font-showcase[_ngcontent-%COMP%]:last-child {\n  margin-bottom: 0;\n}\n.font-showcase__header[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  justify-content: space-between;\n  margin-bottom: 2rem;\n  padding-bottom: 1rem;\n  border-bottom: 2px solid var(--border-color);\n}\n.font-showcase__header[_ngcontent-%COMP%]   h4[_ngcontent-%COMP%] {\n  font-size: 1.5rem;\n  margin: 0;\n  color: var(--text-primary);\n  text-transform: uppercase;\n}\n.font-showcase__tag[_ngcontent-%COMP%] {\n  display: inline-block;\n  padding: 4px 1rem;\n  background-color: var(--color-primary);\n  color: var(--text-dark);\n  border: 2px solid var(--border-color);\n  border-radius: 3px;\n  font-size: 0.75rem;\n  font-weight: 600;\n  text-transform: uppercase;\n}\n.font-showcase__tag--accent[_ngcontent-%COMP%] {\n  background-color: var(--color-secondary);\n}\n.font-showcase__samples[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  gap: 2rem;\n  margin-bottom: 2rem;\n}\n.font-showcase__sample[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  gap: 0.5rem;\n}\n.font-showcase__sample[_ngcontent-%COMP%]   h1[_ngcontent-%COMP%], \n.font-showcase__sample[_ngcontent-%COMP%]   h2[_ngcontent-%COMP%], \n.font-showcase__sample[_ngcontent-%COMP%]   h3[_ngcontent-%COMP%], \n.font-showcase__sample[_ngcontent-%COMP%]   p[_ngcontent-%COMP%], \n.font-showcase__sample[_ngcontent-%COMP%]   div[_ngcontent-%COMP%] {\n  margin: 0;\n  color: var(--text-primary);\n}\n.font-showcase__label[_ngcontent-%COMP%] {\n  font-size: 0.75rem;\n  color: var(--text-secondary);\n  font-weight: 600;\n  text-transform: uppercase;\n  letter-spacing: 0.05em;\n}\n.font-showcase__usage[_ngcontent-%COMP%] {\n  padding: 1rem 2rem;\n  background-color: var(--bg-primary);\n  border: 2px solid var(--border-color);\n  border-radius: 5px;\n  font-size: 0.875rem;\n  color: var(--text-primary);\n}\n.font-showcase__usage[_ngcontent-%COMP%]   strong[_ngcontent-%COMP%] {\n  color: var(--color-primary);\n}\n.monoton-sample[_ngcontent-%COMP%] {\n  color: var(--color-primary);\n}\n.monoton-sample--lg[_ngcontent-%COMP%] {\n  font-size: 4rem;\n}\n.monoton-sample--md[_ngcontent-%COMP%] {\n  font-size: 3rem;\n}\n.monoton-sample--sm[_ngcontent-%COMP%] {\n  font-size: 2rem;\n}\n.color-section-title[_ngcontent-%COMP%] {\n  font-size: 1.125rem;\n  color: var(--text-primary);\n  margin: 3rem 0 2rem 0;\n  text-transform: uppercase;\n  font-weight: 600;\n  letter-spacing: 0.05em;\n}\n.color-grid[_ngcontent-%COMP%] {\n  display: grid;\n  grid-template-columns: repeat(4, 1fr);\n  gap: 2rem;\n  margin-bottom: 3rem;\n}\n@media (max-width: 1024px) {\n  .color-grid[_ngcontent-%COMP%] {\n    grid-template-columns: repeat(3, 1fr);\n  }\n}\n@media (max-width: 768px) {\n  .color-grid[_ngcontent-%COMP%] {\n    grid-template-columns: repeat(2, 1fr);\n    gap: 1rem;\n  }\n}\n.color-grid--semantic[_ngcontent-%COMP%] {\n  grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));\n}\n.color-card[_ngcontent-%COMP%] {\n  background-color: var(--bg-secondary);\n  border: 3px solid var(--border-color);\n  border-radius: 5px;\n  box-shadow: 4px 4px 0px var(--shadow-color);\n  overflow: hidden;\n  transition: transform 0.2s ease, box-shadow 0.2s ease;\n  display: flex;\n  flex-direction: column;\n  height: 100%;\n}\n.color-card[_ngcontent-%COMP%]:hover {\n  transform: translate(-2px, -2px);\n  box-shadow: 6px 6px 0px var(--shadow-color);\n}\n.color-card__swatch[_ngcontent-%COMP%] {\n  width: 100%;\n  height: 120px;\n  border-bottom: 3px solid var(--border-color);\n}\n.color-card__info[_ngcontent-%COMP%] {\n  padding: 1rem;\n  display: flex;\n  flex-direction: column;\n  gap: 4px;\n  flex: 1;\n}\n.color-card__name[_ngcontent-%COMP%] {\n  font-weight: 700;\n  font-size: 0.875rem;\n  color: var(--text-primary);\n  text-transform: uppercase;\n}\n.color-card__hex[_ngcontent-%COMP%] {\n  font-size: 0.75rem;\n  color: var(--text-secondary);\n  font-family: "Courier New", monospace;\n}\n.color-card[_ngcontent-%COMP%]   code[_ngcontent-%COMP%] {\n  font-size: 0.625rem;\n  padding: 2px 4px;\n  background-color: var(--bg-primary);\n  border: 1px solid var(--border-color);\n  border-radius: 3px;\n  color: var(--text-primary);\n  font-family: "Courier New", monospace;\n  margin-top: auto;\n}\n.shadow-demo[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n  gap: 1rem;\n  padding: 2rem;\n}\n.shadow-demo__box[_ngcontent-%COMP%] {\n  width: 100px;\n  height: 100px;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  background-color: var(--color-primary);\n  color: var(--text-dark);\n  border: 3px solid var(--border-color);\n  border-radius: 5px;\n  font-weight: 700;\n  font-size: 1rem;\n}\n.shadow-demo__box--xs[_ngcontent-%COMP%] {\n  box-shadow: 2px 2px 0px #01131B;\n}\n.shadow-demo__box--s[_ngcontent-%COMP%] {\n  box-shadow: 4px 4px 0px #01131B;\n}\n.shadow-demo__box--m[_ngcontent-%COMP%] {\n  box-shadow: 6px 6px 0px #01131B;\n}\n.shadow-demo__box--l[_ngcontent-%COMP%] {\n  box-shadow: 8px 8px 0px #01131B;\n}\n.shadow-demo__box--vinyl-s[_ngcontent-%COMP%] {\n  box-shadow: 2px 2px 0px var(--vinyl-shadow-layer-1), 4px 4px 0px var(--vinyl-shadow-layer-2);\n}\n.shadow-demo__box--vinyl-m[_ngcontent-%COMP%] {\n  box-shadow:\n    2px 2px 0px var(--vinyl-shadow-layer-1),\n    4px 4px 0px var(--vinyl-shadow-layer-2),\n    6px 6px 0px var(--vinyl-shadow-layer-3);\n}\n.shadow-demo__box--vinyl-l[_ngcontent-%COMP%] {\n  box-shadow:\n    2px 2px 0px var(--vinyl-shadow-layer-1),\n    4px 4px 0px var(--vinyl-shadow-layer-2),\n    6px 6px 0px var(--vinyl-shadow-layer-3),\n    8px 8px 0px var(--vinyl-shadow-layer-4);\n}\n.shadow-demo[_ngcontent-%COMP%]   code[_ngcontent-%COMP%] {\n  text-align: center;\n}\n.spacing-grid[_ngcontent-%COMP%] {\n  display: grid;\n  grid-template-columns: repeat(auto-fit, minmax(160px, 1fr));\n  gap: 2rem;\n}\n@media (max-width: 768px) {\n  .spacing-grid[_ngcontent-%COMP%] {\n    grid-template-columns: repeat(2, 1fr);\n    gap: 1rem;\n  }\n}\n@media (max-width: 480px) {\n  .spacing-grid[_ngcontent-%COMP%] {\n    grid-template-columns: 1fr;\n  }\n}\n.spacing-card[_ngcontent-%COMP%] {\n  background-color: var(--bg-secondary);\n  border: 3px solid var(--border-color);\n  border-radius: 5px;\n  padding: 2rem;\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n  gap: 1rem;\n  box-shadow: 3px 3px 0px var(--shadow-color);\n}\n.spacing-card__visual[_ngcontent-%COMP%] {\n  width: 100%;\n  height: 100px;\n  background-color: var(--bg-primary);\n  border: 2px dashed var(--border-color);\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  border-radius: 3px;\n}\n.spacing-card__block[_ngcontent-%COMP%] {\n  background-color: var(--color-primary);\n  border: 2px solid var(--border-color);\n  border-radius: 3px;\n}\n.spacing-card__info[_ngcontent-%COMP%] {\n  text-align: center;\n  display: flex;\n  flex-direction: column;\n  gap: 4px;\n  width: 100%;\n}\n.spacing-card__name[_ngcontent-%COMP%] {\n  font-weight: 700;\n  font-size: 1rem;\n  color: var(--text-primary);\n  text-transform: uppercase;\n}\n.spacing-card__value[_ngcontent-%COMP%] {\n  font-size: 0.75rem;\n  color: var(--text-secondary);\n  font-family: "Courier New", monospace;\n}\n.spacing-card[_ngcontent-%COMP%]   code[_ngcontent-%COMP%] {\n  font-size: 0.625rem;\n  padding: 4px 6px;\n  background-color: var(--bg-primary);\n  border: 1px solid var(--border-color);\n  border-radius: 3px;\n  color: var(--text-primary);\n}\n.link[_ngcontent-%COMP%] {\n  font-size: 1rem;\n  line-height: 1.5rem;\n  color: var(--color-primary);\n  text-decoration: none;\n  font-weight: 500;\n  position: relative;\n  display: inline-flex;\n  align-items: center;\n  gap: 0.5rem;\n  transition: all 150ms ease-in-out;\n}\n.link[_ngcontent-%COMP%]:hover {\n  color: var(--color-secondary);\n  transform: translateY(-1px);\n}\n.link[_ngcontent-%COMP%]:active {\n  transform: translateY(0);\n}\n.link[_ngcontent-%COMP%]:focus-visible {\n  outline: 2px solid var(--color-accent);\n  outline-offset: 2px;\n  border-radius: 3px;\n}\n.link--primary[_ngcontent-%COMP%] {\n  color: var(--color-primary);\n  font-weight: 600;\n}\n.link--primary[_ngcontent-%COMP%]:hover {\n  color: var(--color-secondary);\n}\n.link--underlined[_ngcontent-%COMP%]::after {\n  content: "";\n  position: absolute;\n  bottom: -2px;\n  left: 0;\n  width: 0;\n  height: 2px;\n  background-color: var(--color-primary);\n  transition: width 150ms ease-in-out;\n}\n.link--underlined[_ngcontent-%COMP%]:hover::after {\n  width: 100%;\n}\n.link--arrow[_ngcontent-%COMP%]:hover {\n  gap: calc(0.5rem + 2px);\n}\n.toggle-wrapper[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 1rem;\n  cursor: pointer;\n  -webkit-user-select: none;\n  user-select: none;\n}\n.toggle-wrapper--disabled[_ngcontent-%COMP%] {\n  opacity: 0.6;\n  cursor: not-allowed;\n  pointer-events: none;\n}\n.toggle[_ngcontent-%COMP%] {\n  width: 60px;\n  height: 30px;\n  background-color: var(--bg-secondary);\n  border: 3px solid var(--border-color);\n  border-radius: 5px;\n  box-shadow: 2px 2px 0px var(--shadow-color);\n  cursor: pointer;\n  position: relative;\n  appearance: none;\n  transition: background-color 300ms ease-in-out;\n}\n.toggle[_ngcontent-%COMP%]::after {\n  content: "";\n  position: absolute;\n  width: 20px;\n  height: 20px;\n  background-color: var(--bg-primary);\n  border: 2px solid var(--border-color);\n  border-radius: 3px;\n  top: 2px;\n  left: 2px;\n  transition: transform 300ms ease-in-out cubic-bezier(0.25, 0.46, 0.45, 0.94);\n}\n.toggle[_ngcontent-%COMP%]:checked {\n  background-color: var(--color-primary);\n}\n.toggle[_ngcontent-%COMP%]:checked::after {\n  transform: translateX(30px);\n}\n.toggle[_ngcontent-%COMP%]:focus-visible {\n  outline: 2px solid var(--color-accent);\n  outline-offset: 2px;\n}\n.toggle[_ngcontent-%COMP%]:not(:disabled):hover {\n  box-shadow: 3px 3px 0px var(--shadow-color);\n}\n.toggle[_ngcontent-%COMP%]:disabled {\n  opacity: 0.5;\n  cursor: not-allowed;\n  pointer-events: none;\n}\n.toggle-label[_ngcontent-%COMP%] {\n  font-size: 1rem;\n  line-height: 1.5rem;\n  color: var(--text-primary);\n  font-weight: 500;\n}\n.checkbox-wrapper[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 0.5rem;\n  cursor: pointer;\n  -webkit-user-select: none;\n  user-select: none;\n}\n.checkbox-wrapper--disabled[_ngcontent-%COMP%] {\n  opacity: 0.6;\n  cursor: not-allowed;\n  pointer-events: none;\n}\n.checkbox[_ngcontent-%COMP%] {\n  width: 24px;\n  height: 24px;\n  border: 3px solid var(--border-color);\n  border-radius: 3px;\n  background-color: var(--bg-primary);\n  box-shadow: 2px 2px 0px var(--shadow-color);\n  cursor: pointer;\n  appearance: none;\n  position: relative;\n  transition: all 150ms ease-in-out;\n  flex-shrink: 0;\n}\n.checkbox[_ngcontent-%COMP%]:checked {\n  background-color: var(--color-primary);\n}\n.checkbox[_ngcontent-%COMP%]:checked::after {\n  content: "\\2713";\n  position: absolute;\n  top: 50%;\n  left: 50%;\n  transform: translate(-50%, -50%);\n  font-weight: 700;\n  font-size: 1rem;\n  color: var(--text-dark);\n}\n.checkbox[_ngcontent-%COMP%]:focus-visible {\n  outline: 2px solid var(--color-accent);\n  outline-offset: 2px;\n}\n.checkbox[_ngcontent-%COMP%]:not(:disabled):hover {\n  box-shadow: 3px 3px 0px var(--shadow-color);\n  transform: translate(-1px, -1px);\n}\n.checkbox[_ngcontent-%COMP%]:disabled {\n  opacity: 0.5;\n  cursor: not-allowed;\n  pointer-events: none;\n}\n.checkbox-label[_ngcontent-%COMP%] {\n  font-size: 1rem;\n  line-height: 1.5rem;\n  color: var(--text-primary);\n  font-weight: 400;\n}\n.radio-wrapper[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 0.5rem;\n  cursor: pointer;\n  -webkit-user-select: none;\n  user-select: none;\n}\n.radio-wrapper--disabled[_ngcontent-%COMP%] {\n  opacity: 0.6;\n  cursor: not-allowed;\n  pointer-events: none;\n}\n.radio[_ngcontent-%COMP%] {\n  width: 24px;\n  height: 24px;\n  border: 3px solid var(--border-color);\n  border-radius: 50%;\n  background-color: var(--bg-primary);\n  box-shadow: 2px 2px 0px var(--shadow-color);\n  cursor: pointer;\n  appearance: none;\n  position: relative;\n  transition: all 150ms ease-in-out;\n  flex-shrink: 0;\n}\n.radio[_ngcontent-%COMP%]:checked {\n  background-color: var(--color-primary);\n}\n.radio[_ngcontent-%COMP%]:checked::after {\n  content: "";\n  position: absolute;\n  top: 50%;\n  left: 50%;\n  transform: translate(-50%, -50%);\n  width: 8px;\n  height: 8px;\n  background-color: var(--text-dark);\n  border-radius: 50%;\n}\n.radio[_ngcontent-%COMP%]:focus-visible {\n  outline: 2px solid var(--color-accent);\n  outline-offset: 2px;\n}\n.radio[_ngcontent-%COMP%]:not(:disabled):hover {\n  box-shadow: 3px 3px 0px var(--shadow-color);\n  transform: translate(-1px, -1px);\n}\n.radio[_ngcontent-%COMP%]:disabled {\n  opacity: 0.5;\n  cursor: not-allowed;\n  pointer-events: none;\n}\n.radio-label[_ngcontent-%COMP%] {\n  font-size: 1rem;\n  line-height: 1.5rem;\n  color: var(--text-primary);\n  font-weight: 400;\n}\n.layout-info-card[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  gap: 0.5rem;\n  padding: 2rem;\n  background-color: var(--bg-primary);\n  border: 3px solid var(--border-color);\n  border-radius: 5px;\n  box-shadow: 4px 4px 0px var(--shadow-color);\n  transition: all 150ms ease-in-out;\n}\n.layout-info-card[_ngcontent-%COMP%]:hover {\n  transform: translate(-2px, -2px);\n  box-shadow: 6px 6px 0px var(--shadow-color);\n}\n.layout-info-card__header[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 1rem;\n  padding-bottom: 0.5rem;\n  border-bottom: 2px solid var(--border-color);\n}\n.layout-info-card__icon[_ngcontent-%COMP%] {\n  width: 32px;\n  height: 32px;\n  stroke: var(--color-primary);\n  flex-shrink: 0;\n}\n.layout-info-card__name[_ngcontent-%COMP%] {\n  font-family: "Courier New", monospace;\n  font-size: 0.875rem;\n  font-weight: 700;\n  color: var(--text-primary);\n}\n.layout-info-card__desc[_ngcontent-%COMP%] {\n  font-size: 0.875rem;\n  color: var(--text-secondary);\n  line-height: 1.5rem;\n  margin: 0;\n}\n.layout-info-card__vars[_ngcontent-%COMP%] {\n  display: flex;\n  flex-wrap: wrap;\n  gap: 0.5rem;\n  margin-top: auto;\n}\n.layout-info-card__vars[_ngcontent-%COMP%]   code[_ngcontent-%COMP%] {\n  font-size: 0.75rem;\n  padding: 2px 0.5rem;\n  background-color: var(--bg-secondary);\n  border: 1px solid var(--border-color);\n  border-radius: 3px;\n  color: var(--color-primary);\n}\n.showcase__row--wrap[_ngcontent-%COMP%] {\n  display: flex;\n  flex-wrap: wrap;\n  gap: 3rem;\n  justify-content: center;\n  align-items: flex-start;\n}\n.showcase__item--breakpoint[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n  gap: 1rem;\n}\n.showcase__item--breakpoint[_ngcontent-%COMP%]   app-card[_ngcontent-%COMP%] {\n  width: 180px;\n}\n.showcase__item--breakpoint[_ngcontent-%COMP%]   code[_ngcontent-%COMP%] {\n  font-size: 0.75rem;\n  padding: 0.5rem 1rem;\n  background-color: var(--bg-secondary);\n  border: 2px solid var(--border-color);\n  border-radius: 3px;\n  color: var(--color-primary);\n  font-weight: 600;\n}\n.showcase__code[_ngcontent-%COMP%] {\n  display: block;\n  text-align: center;\n}\n.z-index-scale[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  gap: 4px;\n  max-width: 600px;\n  margin: 0 auto;\n}\n.z-index-scale__item[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 1rem;\n  padding: 0.5rem 1rem;\n  background-color: var(--bg-secondary);\n  border: 2px solid var(--border-color);\n  border-radius: 3px;\n  transition: all 150ms ease-in-out;\n}\n.z-index-scale__item[_ngcontent-%COMP%]:hover {\n  transform: translateX(4px);\n  box-shadow: 2px 2px 0px var(--shadow-color);\n}\n.z-index-scale__item--10[_ngcontent-%COMP%] {\n  background-color: rgba(224, 74, 74, 0.3);\n}\n.z-index-scale__item--9[_ngcontent-%COMP%] {\n  background-color: rgba(224, 74, 74, 0.2);\n}\n.z-index-scale__item--8[_ngcontent-%COMP%] {\n  background-color: rgba(255, 192, 71, 0.3);\n}\n.z-index-scale__item--7[_ngcontent-%COMP%] {\n  background-color: rgba(255, 192, 71, 0.2);\n}\n.z-index-scale__item--6[_ngcontent-%COMP%] {\n  background-color: rgba(237, 156, 5, 0.3);\n}\n.z-index-scale__item--5[_ngcontent-%COMP%] {\n  background-color: rgba(237, 156, 5, 0.2);\n}\n.z-index-scale__item--4[_ngcontent-%COMP%] {\n  background-color: rgba(170, 214, 97, 0.3);\n}\n.z-index-scale__item--3[_ngcontent-%COMP%] {\n  background-color: rgba(170, 214, 97, 0.2);\n}\n.z-index-scale__item--2[_ngcontent-%COMP%] {\n  background-color: rgba(10, 146, 149, 0.2);\n}\n.z-index-scale__item--1[_ngcontent-%COMP%] {\n  background-color: rgba(10, 146, 149, 0.1);\n}\n.z-index-scale__item--0[_ngcontent-%COMP%] {\n  background-color: var(--bg-primary);\n}\n.z-index-scale__level[_ngcontent-%COMP%] {\n  width: 30px;\n  height: 30px;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  background-color: var(--color-primary);\n  border: 2px solid var(--border-color);\n  border-radius: 3px;\n  font-weight: 700;\n  font-size: 0.875rem;\n  color: var(--text-dark);\n  flex-shrink: 0;\n}\n.z-index-scale__name[_ngcontent-%COMP%] {\n  flex: 1;\n  font-family: "Courier New", monospace;\n  font-size: 0.875rem;\n  font-weight: 600;\n  color: var(--text-primary);\n}\n.z-index-scale__desc[_ngcontent-%COMP%] {\n  font-size: 0.75rem;\n  color: var(--text-secondary);\n  text-align: right;\n}\n@media (max-width: 768px) {\n  .z-index-scale__desc[_ngcontent-%COMP%] {\n    display: none;\n  }\n}\n.css-var-card[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n  gap: 0.5rem;\n  padding: 2rem;\n  background-color: var(--bg-primary);\n  border: 3px solid var(--border-color);\n  border-radius: 5px;\n  box-shadow: 3px 3px 0px var(--shadow-color);\n  transition: all 150ms ease-in-out;\n}\n.css-var-card[_ngcontent-%COMP%]:hover {\n  transform: translate(-2px, -2px);\n  box-shadow: 5px 5px 0px var(--shadow-color);\n}\n.css-var-card__name[_ngcontent-%COMP%] {\n  font-family: "Courier New", monospace;\n  font-size: 0.75rem;\n  font-weight: 600;\n  color: var(--color-primary);\n  text-align: center;\n}\n.css-var-card__swatch[_ngcontent-%COMP%] {\n  width: 60px;\n  height: 60px;\n  border: 3px solid var(--border-color);\n  border-radius: 3px;\n  box-shadow: 2px 2px 0px var(--shadow-color);\n}\n.css-var-card__desc[_ngcontent-%COMP%] {\n  font-size: 0.75rem;\n  color: var(--text-secondary);\n  text-align: center;\n}\n/*# sourceMappingURL=style-guide.css.map */'] });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(StyleGuide, [{
    type: Component,
    args: [{ selector: "app-style-guide", standalone: true, imports: [
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
    ], template: `<div class="style-guide">
  <!-- ============================================ -->
  <!-- SIDEBAR FLOTANTE PARA NAVEGACI\xD3N DE SECCIONES -->
  <!-- ============================================ -->
  <aside class="style-guide__sidebar" [class.style-guide__sidebar--open]="sidebarOpen()">
    <!-- Bot\xF3n toggle -->
    <button class="style-guide__sidebar-toggle"
            (click)="toggleSidebar(); $event.stopPropagation()"
            [attr.aria-expanded]="sidebarOpen()"
            aria-haspopup="menu"
            aria-label="Men\xFA de secciones de la gu\xEDa de estilos">
      <span class="style-guide__sidebar-icon" aria-hidden="true">\u2630</span>
    </button>

    <!-- Men\xFA desplegable -->
    <ul class="style-guide__sidebar-menu" role="menu">
      <li class="style-guide__sidebar-item" role="none">
        <button type="button" role="menuitem"
                class="style-guide__sidebar-link"
                [class.style-guide__sidebar-link--active]="activeSection() === 'foundations'"
                (click)="selectSection('foundations'); closeSidebar()">Fundamentos</button>
      </li>
      <li class="style-guide__sidebar-item" role="none">
        <button type="button" role="menuitem"
                class="style-guide__sidebar-link"
                [class.style-guide__sidebar-link--active]="activeSection() === 'atoms'"
                (click)="selectSection('atoms'); closeSidebar()">\xC1tomos</button>
      </li>
      <li class="style-guide__sidebar-item" role="none">
        <button type="button" role="menuitem"
                class="style-guide__sidebar-link"
                [class.style-guide__sidebar-link--active]="activeSection() === 'molecules'"
                (click)="selectSection('molecules'); closeSidebar()">Mol\xE9culas</button>
      </li>
      <li class="style-guide__sidebar-item" role="none">
        <button type="button" role="menuitem"
                class="style-guide__sidebar-link"
                [class.style-guide__sidebar-link--active]="activeSection() === 'organisms'"
                (click)="selectSection('organisms'); closeSidebar()">Organismos</button>
      </li>
      <li class="style-guide__sidebar-item" role="none">
        <button type="button" role="menuitem"
                class="style-guide__sidebar-link"
                [class.style-guide__sidebar-link--active]="activeSection() === 'layout'"
                (click)="selectSection('layout'); closeSidebar()">Layout</button>
      </li>
    </ul>
  </aside>

  <div class="style-guide__container">
    <header class="style-guide__header">
      <h1>Gu\xEDa de Estilo</h1>
      <p class="style-guide__intro">Sistema de componentes reutilizables para Disc and Records</p>
    </header>

    <!-- ============================================ -->
    <!-- SECCI\xD3N 1: FUNDAMENTOS -->
    <!-- ============================================ -->
    @if (activeSection() === 'foundations') {
      <section class="style-guide__section">
        <h2>Fundamentos del Sistema de Dise\xF1o</h2>
        <p class="showcase__description">
          Variables CSS, tipograf\xEDa, colores y espaciado que definen la identidad visual de Disc and Records.
        </p>

        <!-- Tipograf\xEDa -->
        <div class="showcase">
          <h3>Tipograf\xEDa</h3>

          <!-- Space Grotesk - Fuente principal -->
          <div class="font-showcase">
            <div class="font-showcase__header">
              <h4>Space Grotesk</h4>
              <span class="font-showcase__tag">Fuente Principal</span>
            </div>
            <div class="font-showcase__samples" style="font-family: 'Space Grotesk', sans-serif;">
              <div class="font-showcase__sample">
                <span class="font-showcase__label">Heading 1 (68px)</span>
                <h1>Disc and Records</h1>
              </div>
              <div class="font-showcase__sample">
                <span class="font-showcase__label">Heading 2 (42px)</span>
                <h2>La m\xFAsica que marc\xF3 una \xE9poca</h2>
              </div>
              <div class="font-showcase__sample">
                <span class="font-showcase__label">Heading 3 (26px)</span>
                <h3>Explora nuestra colecci\xF3n</h3>
              </div>
              <div class="font-showcase__sample">
                <span class="font-showcase__label">P\xE1rrafo (16px)</span>
                <p>Textos de cuerpo, descripciones de productos, contenido general. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Perfecta legibilidad para lectura extendida.</p>
              </div>
              <div class="font-showcase__sample">
                <span class="font-showcase__label">Peque\xF1o (14px)</span>
                <p class="text-small">Subt\xEDtulos, notas y textos secundarios</p>
              </div>
            </div>
            <div class="font-showcase__usage">
              <strong>Uso:</strong> Textos generales, t\xEDtulos, botones, navegaci\xF3n, formularios
            </div>
          </div>

          <!-- Monoton - Fuente secundaria -->
          <div class="font-showcase">
            <div class="font-showcase__header">
              <h4>Monoton</h4>
              <span class="font-showcase__tag font-showcase__tag--accent">Fuente Display</span>
            </div>
            <div class="font-showcase__samples" style="font-family: 'Monoton', cursive;">
              <div class="font-showcase__sample">
                <span class="font-showcase__label">Grande (64px)</span>
                <div class="monoton-sample monoton-sample--lg">D&R</div>
              </div>
              <div class="font-showcase__sample">
                <span class="font-showcase__label">Mediano (48px)</span>
                <div class="monoton-sample monoton-sample--md">RETRO</div>
              </div>
              <div class="font-showcase__sample">
                <span class="font-showcase__label">Peque\xF1o (32px)</span>
                <div class="monoton-sample monoton-sample--sm">70s VIBES</div>
              </div>
            </div>
            <div class="font-showcase__usage">
              <strong>Uso:</strong> Logo, t\xEDtulos decorativos, elementos destacados con est\xE9tica retro/70s
            </div>
          </div>
        </div>

        <!-- Colores -->
        <div class="showcase">
          <h3>Paleta de Colores 70s</h3>
          <p class="showcase__description">
            Colores principales del modo claro (c\xE1lidos) y oscuro (fr\xEDos). Ambas paletas siempre visibles.
          </p>

          <!-- Modo Light - C\xE1lidos -->
          <h4 class="color-section-title">Modo Light (C\xE1lidos)</h4>
          <div class="color-grid">
            <div class="color-card">
              <div class="color-card__swatch" style="background-color: #ED9C05;"></div>
              <div class="color-card__info">
                <div class="color-card__name">Primario</div>
                <div class="color-card__hex">#ED9C05</div>
                <code>$color-primario-light</code>
              </div>
            </div>
            <div class="color-card">
              <div class="color-card__swatch" style="background-color: #CA6703;"></div>
              <div class="color-card__info">
                <div class="color-card__name">Secundario</div>
                <div class="color-card__hex">#CA6703</div>
                <code>$color-secundario-light</code>
              </div>
            </div>
            <div class="color-card">
              <div class="color-card__swatch" style="background-color: #BB3F03;"></div>
              <div class="color-card__info">
                <div class="color-card__name">Contraste</div>
                <div class="color-card__hex">#BB3F03</div>
                <code>$color-contraste-light</code>
              </div>
            </div>
            <div class="color-card">
              <div class="color-card__swatch" style="background-color: #9D2227;"></div>
              <div class="color-card__info">
                <div class="color-card__name">Acentuado</div>
                <div class="color-card__hex">#9D2227</div>
                <code>$color-acentuado-light</code>
              </div>
            </div>
          </div>

          <!-- Modo Dark - Fr\xEDos -->
          <h4 class="color-section-title">Modo Dark (Fr\xEDos)</h4>
          <div class="color-grid">
            <div class="color-card">
              <div class="color-card__swatch" style="background-color: #93CFBB;"></div>
              <div class="color-card__info">
                <div class="color-card__name">Primario</div>
                <div class="color-card__hex">#93CFBB</div>
                <code>$color-primario-dark</code>
              </div>
            </div>
            <div class="color-card">
              <div class="color-card__swatch" style="background-color: #0A9295;"></div>
              <div class="color-card__info">
                <div class="color-card__name">Secundario</div>
                <div class="color-card__hex">#0A9295</div>
                <code>$color-secundario-dark</code>
              </div>
            </div>
            <div class="color-card">
              <div class="color-card__swatch" style="background-color: #015F72;"></div>
              <div class="color-card__info">
                <div class="color-card__name">Contraste</div>
                <div class="color-card__hex">#015F72</div>
                <code>$color-contraste-dark</code>
              </div>
            </div>
            <div class="color-card">
              <div class="color-card__swatch" style="background-color: #01131B;"></div>
              <div class="color-card__info">
                <div class="color-card__name">Acentuado</div>
                <div class="color-card__hex">#01131B</div>
                <code>$color-acentuado-dark</code>
              </div>
            </div>
          </div>

          <!-- Fondos y Textos -->
          <h4 class="color-section-title">Fondos y Textos</h4>
          <div class="color-grid">
            <div class="color-card">
              <div class="color-card__swatch" style="background-color: #FBFAF2;"></div>
              <div class="color-card__info">
                <div class="color-card__name">Fondo Light</div>
                <div class="color-card__hex">#FBFAF2</div>
                <code>$color-fondo-light</code>
              </div>
            </div>
            <div class="color-card">
              <div class="color-card__swatch" style="background-color: #E7D8AB;"></div>
              <div class="color-card__info">
                <div class="color-card__name">Fondo Light 2\xBA</div>
                <div class="color-card__hex">#E7D8AB</div>
                <code>$color-fondo-light-secundario</code>
              </div>
            </div>
            <div class="color-card">
              <div class="color-card__swatch" style="background-color: #01131B;"></div>
              <div class="color-card__info">
                <div class="color-card__name">Fondo Oscuro</div>
                <div class="color-card__hex">#01131B</div>
                <code>$color-fondo-oscuro</code>
              </div>
            </div>
            <div class="color-card">
              <div class="color-card__swatch" style="background-color: #013946;"></div>
              <div class="color-card__info">
                <div class="color-card__name">Fondo Oscuro 2\xBA</div>
                <div class="color-card__hex">#013946</div>
                <code>$color-fondo-oscuro-secundario</code>
              </div>
            </div>
            <div class="color-card">
              <div class="color-card__swatch" style="background-color: #FBFAF2;"></div>
              <div class="color-card__info">
                <div class="color-card__name">Letra Blanca</div>
                <div class="color-card__hex">#FBFAF2</div>
                <code>$color-letra-blanca</code>
              </div>
            </div>
            <div class="color-card">
              <div class="color-card__swatch" style="background-color: #01131B;"></div>
              <div class="color-card__info">
                <div class="color-card__name">Letra Oscura</div>
                <div class="color-card__hex">#01131B</div>
                <code>$color-letra-oscura</code>
              </div>
            </div>
          </div>
        </div>

        <!-- Colores sem\xE1nticos -->
        <div class="showcase">
          <h3>Colores Sem\xE1nticos</h3>
          <div class="color-grid color-grid--semantic">
            <div class="color-card">
              <div class="color-card__swatch" style="background-color: #E04A4A;"></div>
              <div class="color-card__info">
                <div class="color-card__name">Error</div>
                <div class="color-card__hex">#E04A4A</div>
                <code>$color-error</code>
              </div>
            </div>
            <div class="color-card">
              <div class="color-card__swatch" style="background-color: #FFC047;"></div>
              <div class="color-card__info">
                <div class="color-card__name">Advertencia Light</div>
                <div class="color-card__hex">#FFC047</div>
                <code>$color-advertencia-light</code>
              </div>
            </div>
            <div class="color-card">
              <div class="color-card__swatch" style="background-color: #FEF84A;"></div>
              <div class="color-card__info">
                <div class="color-card__name">Advertencia Dark</div>
                <div class="color-card__hex">#FEF84A</div>
                <code>$color-advertencia-dark</code>
              </div>
            </div>
            <div class="color-card">
              <div class="color-card__swatch" style="background-color: #AAD661;"></div>
              <div class="color-card__info">
                <div class="color-card__name">\xC9xito</div>
                <div class="color-card__hex">#AAD661</div>
                <code>$color-exito</code>
              </div>
            </div>
            <div class="color-card">
              <div class="color-card__swatch" style="background-color: #0A9295;"></div>
              <div class="color-card__info">
                <div class="color-card__name">Informaci\xF3n</div>
                <div class="color-card__hex">#0A9295</div>
                <code>$color-informacion</code>
              </div>
            </div>
          </div>
        </div>

        <!-- Sombras -->
        <div class="showcase">
          <h3>Sombras Brutales</h3>
          <p class="showcase__description">
            Sombras s\xF3lidas sin blur, caracter\xEDsticas del estilo neobrutalist y la est\xE9tica retro 70s.
          </p>
          <div class="showcase__row">
            <div class="shadow-demo">
              <div class="shadow-demo__box shadow-demo__box--xs">
                Box
              </div>
              <code>brutal-xs<br/>2px 2px 0px</code>
            </div>
            <div class="shadow-demo">
              <div class="shadow-demo__box shadow-demo__box--s">
                Box
              </div>
              <code>brutal-s<br/>4px 4px 0px</code>
            </div>
            <div class="shadow-demo">
              <div class="shadow-demo__box shadow-demo__box--m">
                Box
              </div>
              <code>brutal-m<br/>6px 6px 0px</code>
            </div>
            <div class="shadow-demo">
              <div class="shadow-demo__box shadow-demo__box--l">
                Box
              </div>
              <code>brutal-l<br/>8px 8px 0px</code>
            </div>
          </div>

          <h4 style="margin-top: 2rem;">Sombras Efecto Vinilo</h4>
          <p class="showcase__description">
            Sombras multicapa con colores de la paleta 70s, efecto 3D retro.
          </p>
          <div class="showcase__row">
            <div class="shadow-demo">
              <div class="shadow-demo__box shadow-demo__box--vinyl-s">
                Box
              </div>
              <code>vinilo-s<br/>2 capas</code>
            </div>
            <div class="shadow-demo">
              <div class="shadow-demo__box shadow-demo__box--vinyl-m">
                Box
              </div>
              <code>vinilo-m<br/>3 capas</code>
            </div>
            <div class="shadow-demo">
              <div class="shadow-demo__box shadow-demo__box--vinyl-l">
                Box
              </div>
              <code>vinilo-l<br/>4 capas</code>
            </div>
          </div>
        </div>

        <!-- Espaciado -->
        <div class="showcase">
          <h3>Espaciado</h3>
          <p class="showcase__description">
            Sistema de espaciado coherente para mantener ritmo visual en toda la aplicaci\xF3n.
          </p>
          <div class="spacing-grid">
            <div class="spacing-card">
              <div class="spacing-card__visual">
                <div class="spacing-card__block" style="width: 0.5rem; height: 0.5rem;"></div>
              </div>
              <div class="spacing-card__info">
                <div class="spacing-card__name">XS</div>
                <div class="spacing-card__value">0.5rem (8px)</div>
                <code>$espaciado-xs</code>
              </div>
            </div>
            <div class="spacing-card">
              <div class="spacing-card__visual">
                <div class="spacing-card__block" style="width: 1rem; height: 1rem;"></div>
              </div>
              <div class="spacing-card__info">
                <div class="spacing-card__name">S</div>
                <div class="spacing-card__value">1rem (16px)</div>
                <code>$espaciado-s</code>
              </div>
            </div>
            <div class="spacing-card">
              <div class="spacing-card__visual">
                <div class="spacing-card__block" style="width: 2rem; height: 2rem;"></div>
              </div>
              <div class="spacing-card__info">
                <div class="spacing-card__name">M</div>
                <div class="spacing-card__value">2rem (32px)</div>
                <code>$espaciado-m</code>
              </div>
            </div>
            <div class="spacing-card">
              <div class="spacing-card__visual">
                <div class="spacing-card__block" style="width: 3rem; height: 3rem;"></div>
              </div>
              <div class="spacing-card__info">
                <div class="spacing-card__name">L</div>
                <div class="spacing-card__value">3rem (48px)</div>
                <code>$espaciado-l</code>
              </div>
            </div>
            <div class="spacing-card">
              <div class="spacing-card__visual">
                <div class="spacing-card__block" style="width: 4rem; height: 4rem;"></div>
              </div>
              <div class="spacing-card__info">
                <div class="spacing-card__name">XL</div>
                <div class="spacing-card__value">4rem (64px)</div>
                <code>$espaciado-xl</code>
              </div>
            </div>
            <div class="spacing-card">
              <div class="spacing-card__visual">
                <div class="spacing-card__block" style="width: 5rem; height: 5rem;"></div>
              </div>
              <div class="spacing-card__info">
                <div class="spacing-card__name">XXL</div>
                <div class="spacing-card__value">5rem (80px)</div>
                <code>$espaciado-xxl</code>
              </div>
            </div>
          </div>
        </div>
      </section>
    }

    <!-- ============================================ -->
    <!-- SECCI\xD3N 2: \xC1TOMOS -->
    <!-- ============================================ -->
    @if (activeSection() === 'atoms') {
      <section class="style-guide__section">
        <h2>\xC1tomos</h2>
        <p class="showcase__description">
          Los elementos m\xE1s b\xE1sicos: botones, spinners, barras de progreso y badges.
        </p>

        <!-- Botones: Variantes -->
        <div class="showcase">
          <h3>Botones - Variantes</h3>
          <div class="showcase__row">
            <div class="showcase__item">
              <app-button variant="primary" (clicked)="onButtonClick('primary', 'md')">
                Primary
              </app-button>
              <code>variant="primary"</code>
            </div>
            <div class="showcase__item">
              <app-button variant="secondary" (clicked)="onButtonClick('secondary', 'md')">
                Secondary
              </app-button>
              <code>variant="secondary"</code>
            </div>
            <div class="showcase__item">
              <app-button variant="ghost" (clicked)="onButtonClick('ghost', 'md')">
                Ghost
              </app-button>
              <code>variant="ghost"</code>
            </div>
            <div class="showcase__item">
              <app-button variant="danger" (clicked)="onButtonClick('danger', 'md')">
                Danger
              </app-button>
              <code>variant="danger"</code>
            </div>
          </div>
        </div>

        <!-- Botones: Tama\xF1os -->
        <div class="showcase">
          <h3>Botones - Tama\xF1os</h3>
          <div class="showcase__row">
            <div class="showcase__item">
              <app-button size="sm" (clicked)="onButtonClick('primary', 'sm')">
                Small
              </app-button>
              <code>size="sm"</code>
            </div>
            <div class="showcase__item">
              <app-button size="md" (clicked)="onButtonClick('primary', 'md')">
                Medium
              </app-button>
              <code>size="md"</code>
            </div>
            <div class="showcase__item">
              <app-button size="lg" (clicked)="onButtonClick('primary', 'lg')">
                Large
              </app-button>
              <code>size="lg"</code>
            </div>
          </div>
        </div>

        <!-- Botones: Estados -->
        <div class="showcase">
          <h3>Botones - Estados</h3>
          <div class="showcase__row">
            <div class="showcase__item">
              <app-button>Normal</app-button>
              <code>Estado por defecto</code>
            </div>
            <div class="showcase__item">
              <app-button [disabled]="true">Disabled</app-button>
              <code>[disabled]="true"</code>
            </div>
            <div class="showcase__item">
              <app-button href="#">Como enlace</app-button>
              <code>href="#"</code>
            </div>
            <div class="showcase__item">
              <app-button [loading]="true">Loading</app-button>
              <code>[loading]="true"</code>
            </div>
          </div>
        </div>

        <!-- Botones: Full Width -->
        <div class="showcase">
          <h3>Botones - Full Width</h3>
          <div class="showcase__column">
            <div class="showcase__item showcase__item--full">
              <app-button [fullWidth]="true" (clicked)="onButtonClick('primary', 'md')">
                Bot\xF3n a ancho completo
              </app-button>
              <code>[fullWidth]="true"</code>
            </div>
          </div>
        </div>

        <!-- Spinner -->
        <div class="showcase">
          <h3>Spinner</h3>
          <div class="showcase__row">
            <div class="showcase__item">
              <app-spinner [show]="true" mode="inline" size="sm"></app-spinner>
              <code>size="sm"</code>
            </div>
            <div class="showcase__item">
              <app-spinner [show]="true" mode="inline" size="md"></app-spinner>
              <code>size="md"</code>
            </div>
            <div class="showcase__item">
              <app-spinner [show]="true" mode="inline" size="lg"></app-spinner>
              <code>size="lg"</code>
            </div>
          </div>
          <div class="showcase__row" style="margin-top: 1rem;">
            <div class="showcase__item">
              <app-spinner [show]="true" mode="inline" color="primary"></app-spinner>
              <code>color="primary"</code>
            </div>
            <div class="showcase__item">
              <app-spinner [show]="true" mode="inline" color="secondary"></app-spinner>
              <code>color="secondary"</code>
            </div>
            <div class="showcase__item" style="background: var(--color-border); padding: 1rem;">
              <app-spinner [show]="true" mode="inline" color="white"></app-spinner>
              <code style="color: white;">color="white"</code>
            </div>
          </div>
        </div>

        <!-- Spinner Global -->
        <div class="showcase">
          <h3>Spinner Global</h3>
          <p class="showcase__description">
            El spinner global muestra un overlay sobre toda la aplicaci\xF3n.
          </p>
          <div class="showcase__row">
            <div class="showcase__item">
              <app-button (clicked)="showGlobalSpinner()">
                Mostrar Spinner Global (2s)
              </app-button>
              <code>loadingService.start()</code>
            </div>
          </div>
        </div>

        <!-- Progress Bar -->
        <div class="showcase">
          <h3>Barra de Progreso</h3>
          <div class="showcase__column">
            <div class="showcase__item showcase__item--full">
              <app-progress-bar [value]="25" size="sm"></app-progress-bar>
              <code>value="25" size="sm"</code>
            </div>
            <div class="showcase__item showcase__item--full">
              <app-progress-bar [value]="50" size="md" [showLabel]="true"></app-progress-bar>
              <code>value="50" size="md" showLabel</code>
            </div>
            <div class="showcase__item showcase__item--full">
              <app-progress-bar [value]="75" size="lg" [showLabel]="true"></app-progress-bar>
              <code>value="75" size="lg" showLabel</code>
            </div>
          </div>
        </div>

        <!-- Progress Bar Variantes -->
        <div class="showcase">
          <h3>Progress Bar - Variantes de Color</h3>
          <div class="showcase__column">
            <div class="showcase__item showcase__item--full">
              <app-progress-bar [value]="60" variant="primary" [showLabel]="true"></app-progress-bar>
              <code>variant="primary"</code>
            </div>
            <div class="showcase__item showcase__item--full">
              <app-progress-bar [value]="60" variant="success" [showLabel]="true"></app-progress-bar>
              <code>variant="success"</code>
            </div>
            <div class="showcase__item showcase__item--full">
              <app-progress-bar [value]="60" variant="warning" [showLabel]="true"></app-progress-bar>
              <code>variant="warning"</code>
            </div>
            <div class="showcase__item showcase__item--full">
              <app-progress-bar [value]="60" variant="error" [showLabel]="true"></app-progress-bar>
              <code>variant="error"</code>
            </div>
          </div>
        </div>

        <!-- Progress Bar Estados Especiales -->
        <div class="showcase">
          <h3>Progress Bar - Estados Especiales</h3>
          <div class="showcase__column">
            <div class="showcase__item showcase__item--full">
              <app-progress-bar [indeterminate]="true"></app-progress-bar>
              <code>indeterminate="true" (animaci\xF3n continua)</code>
            </div>
            <div class="showcase__item showcase__item--full">
              <app-progress-bar [value]="75" [striped]="true" [showLabel]="true"></app-progress-bar>
              <code>striped="true" (rayas animadas)</code>
            </div>
          </div>
        </div>

        <!-- Progress Demo Interactivo -->
        <div class="showcase">
          <h3>Demo Interactivo</h3>
          <p class="showcase__description">
            Simula una operaci\xF3n de carga con progreso.
          </p>
          <div class="showcase__column">
            <div class="showcase__item showcase__item--full">
              <app-progress-bar
                [value]="demoProgress"
                [showLabel]="true"
                [variant]="demoProgress === 100 ? 'success' : 'primary'"
                size="lg">
              </app-progress-bar>
            </div>
            <div class="showcase__row" style="margin-top: 1rem;">
              <div class="showcase__item">
                <app-button
                  [disabled]="isProgressRunning"
                  (clicked)="startProgressDemo()">
                  {{ isProgressRunning ? 'En progreso...' : 'Iniciar Demo' }}
                </app-button>
              </div>
              <div class="showcase__item">
                <app-button
                  variant="secondary"
                  (clicked)="resetProgressDemo()"
                  [disabled]="demoProgress === 0">
                  Reiniciar
                </app-button>
              </div>
            </div>
          </div>
        </div>

        <!-- Badges -->
        <div class="showcase">
          <h3>Badges - Variantes</h3>
          <div class="showcase__row">
            <div class="showcase__item">
              <app-badge variant="primary">Primary</app-badge>
              <code>variant="primary"</code>
            </div>
            <div class="showcase__item">
              <app-badge variant="secondary">Secondary</app-badge>
              <code>variant="secondary"</code>
            </div>
            <div class="showcase__item">
              <app-badge variant="success">Success</app-badge>
              <code>variant="success"</code>
            </div>
            <div class="showcase__item">
              <app-badge variant="warning">Warning</app-badge>
              <code>variant="warning"</code>
            </div>
            <div class="showcase__item">
              <app-badge variant="error">Error</app-badge>
              <code>variant="error"</code>
            </div>
            <div class="showcase__item">
              <app-badge variant="info">Info</app-badge>
              <code>variant="info"</code>
            </div>
          </div>
        </div>

        <!-- Badges - Tama\xF1os -->
        <div class="showcase">
          <h3>Badges - Tama\xF1os</h3>
          <div class="showcase__row">
            <div class="showcase__item">
              <app-badge size="sm" variant="primary">Small</app-badge>
              <code>size="sm"</code>
            </div>
            <div class="showcase__item">
              <app-badge size="md" variant="primary">Medium</app-badge>
              <code>size="md"</code>
            </div>
            <div class="showcase__item">
              <app-badge size="lg" variant="primary">Large</app-badge>
              <code>size="lg"</code>
            </div>
          </div>
        </div>

        <!-- Badges - Uso pr\xE1ctico -->
        <div class="showcase">
          <h3>Badges - Uso Pr\xE1ctico</h3>
          <div class="showcase__row">
            <div class="showcase__item">
              <div style="display: flex; gap: 0.5rem; flex-wrap: wrap;">
                <app-badge variant="primary">Rock</app-badge>
                <app-badge variant="secondary">Jazz</app-badge>
                <app-badge variant="info">Pop</app-badge>
              </div>
              <code>G\xE9neros musicales</code>
            </div>
            <div class="showcase__item">
              <div style="display: flex; gap: 0.5rem; align-items: center;">
                <span style="font-weight: 600;">Estado:</span>
                <app-badge variant="success">Disponible</app-badge>
              </div>
              <code>Indicador de estado</code>
            </div>
            <div class="showcase__item">
              <div style="display: flex; gap: 0.5rem; align-items: center;">
                <span style="font-weight: 600;">Notificaciones</span>
                <app-badge variant="error" size="sm">5</app-badge>
              </div>
              <code>Contador</code>
            </div>
          </div>
        </div>

        <!-- Enlaces / Links -->
        <div class="showcase">
          <h3>Enlaces</h3>
          <div class="showcase__row">
            <div class="showcase__item">
              <a href="#" class="link">Enlace est\xE1ndar</a>
              <code>class="link"</code>
            </div>
            <div class="showcase__item">
              <a href="#" class="link link--primary">Enlace primario</a>
              <code>class="link link--primary"</code>
            </div>
            <div class="showcase__item">
              <a href="#" class="link link--underlined">Enlace subrayado</a>
              <code>class="link link--underlined"</code>
            </div>
            <div class="showcase__item">
              <a href="#" class="link link--arrow">Enlace con flecha \u2192</a>
              <code>class="link link--arrow"</code>
            </div>
          </div>
        </div>

        <!-- Toggle Switch -->
        <div class="showcase">
          <h3>Toggle Switch</h3>
          <div class="showcase__row">
            <div class="showcase__item">
              <label class="toggle-wrapper">
                <input type="checkbox" class="toggle" />
                <span class="toggle-label">Activar opci\xF3n</span>
              </label>
              <code>Toggle desactivado</code>
            </div>
            <div class="showcase__item">
              <label class="toggle-wrapper">
                <input type="checkbox" class="toggle" checked />
                <span class="toggle-label">Opci\xF3n activada</span>
              </label>
              <code>Toggle activado</code>
            </div>
            <div class="showcase__item">
              <label class="toggle-wrapper toggle-wrapper--disabled">
                <input type="checkbox" class="toggle" disabled />
                <span class="toggle-label">Toggle deshabilitado</span>
              </label>
              <code>Toggle disabled</code>
            </div>
          </div>
        </div>

        <!-- Checkbox y Radio -->
        <div class="showcase">
          <h3>Checkbox</h3>
          <div class="showcase__column">
            <div class="showcase__item">
              <label class="checkbox-wrapper">
                <input type="checkbox" class="checkbox" />
                <span class="checkbox-label">Opci\xF3n 1</span>
              </label>
              <code>Checkbox sin marcar</code>
            </div>
            <div class="showcase__item">
              <label class="checkbox-wrapper">
                <input type="checkbox" class="checkbox" checked />
                <span class="checkbox-label">Opci\xF3n 2 (marcada)</span>
              </label>
              <code>Checkbox marcado</code>
            </div>
            <div class="showcase__item">
              <label class="checkbox-wrapper checkbox-wrapper--disabled">
                <input type="checkbox" class="checkbox" disabled />
                <span class="checkbox-label">Opci\xF3n deshabilitada</span>
              </label>
              <code>Checkbox disabled</code>
            </div>
          </div>
        </div>

        <!-- Radio Buttons -->
        <div class="showcase">
          <h3>Radio Buttons</h3>
          <div class="showcase__column">
            <div class="showcase__item">
              <label class="radio-wrapper">
                <input type="radio" name="demo-radio" class="radio" checked />
                <span class="radio-label">Opci\xF3n A (seleccionada)</span>
              </label>
            </div>
            <div class="showcase__item">
              <label class="radio-wrapper">
                <input type="radio" name="demo-radio" class="radio" />
                <span class="radio-label">Opci\xF3n B</span>
              </label>
            </div>
            <div class="showcase__item">
              <label class="radio-wrapper">
                <input type="radio" name="demo-radio" class="radio" />
                <span class="radio-label">Opci\xF3n C</span>
              </label>
            </div>
            <div class="showcase__item">
              <label class="radio-wrapper radio-wrapper--disabled">
                <input type="radio" name="demo-radio-disabled" class="radio" disabled />
                <span class="radio-label">Opci\xF3n deshabilitada</span>
              </label>
            </div>
          </div>
        </div>
      </section>
    }

    <!-- ============================================ -->
    <!-- SECCI\xD3N 3: MOL\xC9CULAS -->
    <!-- ============================================ -->
    @if (activeSection() === 'molecules') {
      <section class="style-guide__section">
        <h2>Mol\xE9culas</h2>
        <p class="showcase__description">
          Combinaciones de \xE1tomos: cards, formularios individuales, breadcrumbs, alerts y tooltips.
        </p>

        <!-- Form Input -->
        <div class="showcase">
          <h3>Input - Estados</h3>
          <div class="showcase__grid showcase__grid--forms">
            <div class="showcase__item">
              <app-form-input
                label="Email"
                type="email"
                placeholder="tu@email.com"
                helpText="Nunca compartiremos tu email"
              ></app-form-input>
              <code>Input normal con ayuda</code>
            </div>

            <div class="showcase__item">
              <app-form-input
                label="Usuario"
                type="text"
                placeholder="Tu nombre de usuario"
                [hasError]="true"
                errorMessage="Este usuario ya existe"
              ></app-form-input>
              <code>Input con error</code>
            </div>

            <div class="showcase__item">
              <app-form-input
                label="Contrase\xF1a"
                type="password"
                placeholder="\u2022\u2022\u2022\u2022\u2022\u2022\u2022\u2022"
                [hasSuccess]="true"
                helpText="Contrase\xF1a segura"
              ></app-form-input>
              <code>Input con \xE9xito</code>
            </div>

            <div class="showcase__item">
              <app-form-input
                label="Campo deshabilitado"
                type="text"
                placeholder="No disponible"
                [disabled]="true"
              ></app-form-input>
              <code>Input deshabilitado</code>
            </div>
          </div>
        </div>

        <!-- Form Input - Tipos -->
        <div class="showcase">
          <h3>Input - Tipos</h3>
          <div class="showcase__grid showcase__grid--forms">
            <div class="showcase__item">
              <app-form-input
                label="Texto"
                type="text"
                placeholder="Escribe algo..."
              ></app-form-input>
              <code>type="text"</code>
            </div>

            <div class="showcase__item">
              <app-form-input
                label="Email"
                type="email"
                placeholder="correo@ejemplo.com"
              ></app-form-input>
              <code>type="email"</code>
            </div>

            <div class="showcase__item">
              <app-form-input
                label="Contrase\xF1a"
                type="password"
                placeholder="Tu contrase\xF1a"
              ></app-form-input>
              <code>type="password"</code>
            </div>

            <div class="showcase__item">
              <app-form-input
                label="N\xFAmero"
                type="number"
                placeholder="123"
              ></app-form-input>
              <code>type="number"</code>
            </div>

            <div class="showcase__item">
              <app-form-input
                label="Tel\xE9fono"
                type="tel"
                placeholder="+34 600 000 000"
              ></app-form-input>
              <code>type="tel"</code>
            </div>

            <div class="showcase__item">
              <app-form-input
                label="Fecha"
                type="date"
              ></app-form-input>
              <code>type="date"</code>
            </div>
          </div>
        </div>

        <!-- Cards Polaroid -->
        <div class="showcase">
          <h3>Cards - Variante Polaroid</h3>
          <div class="showcase__row showcase__row--cards-polaroid">
            <div class="showcase__item showcase__item--card-polaroid">
              <app-card
                title="Rumours"
                subtitle="Fleetwood Mac"
                imageShape="square"
                imageSize="medium"
                variant="normal"
                cardType="polaroid"
                titleLink="#album"
                subtitleLink="#artist">
              </app-card>
              <code>\xC1lbum con placeholder</code>
            </div>

            <div class="showcase__item showcase__item--card-polaroid">
              <app-card
                title="Bohemian Rhapsody"
                subtitle="Queen"
                imageShape="circle"
                imageSize="medium"
                variant="normal"
                cardType="polaroid"
                titleLink="#song"
                subtitleLink="#artist">
              </app-card>
              <code>Canci\xF3n (circular)</code>
            </div>

            <div class="showcase__item showcase__item--card-polaroid">
              <app-card
                title="Hotel California"
                subtitle="Eagles"
                imageShape="square"
                imageSize="medium"
                variant="vinilo"
                cardType="polaroid"
                titleLink="#album"
                subtitleLink="#artist">
              </app-card>
              <code>Efecto vinilo</code>
            </div>
          </div>
        </div>

        <!-- Cards Profile -->
        <div class="showcase">
          <h3>Cards - Variante Profile</h3>

          <!-- Profile Vertical -->
          <h4 style="margin-bottom: 1rem; font-size: 1.125rem; color: var(--text-secondary);">Layout Vertical</h4>
          <div class="showcase__row">
            <div class="showcase__item">
              <app-card
                title="JohnDoe"
                imageShape="square"
                imageSize="large"
                variant="normal"
                cardType="profile"
                layout="vertical"
                [badges]="userGenres"
                [actions]="profileActions">
              </app-card>
              <code>Perfil vertical con g\xE9neros</code>
            </div>

            <div class="showcase__item">
              <app-card
                title="Dark Side of the Moon"
                subtitle="Pink Floyd \u2022 1973"
                imageShape="square"
                imageSize="large"
                variant="vinilo"
                cardType="profile"
                layout="vertical"
                [badges]="['Progressive Rock', 'Psychedelic']"
                [actions]="profileActions.slice(0, 2)">
              </app-card>
              <code>\xC1lbum con badges y acciones</code>
            </div>
          </div>

          <!-- Profile Horizontal -->
          <h4 style="margin: 2rem 0 1rem; font-size: 1.125rem; color: var(--text-secondary);">Layout Horizontal (Responsive)</h4>
          <div class="showcase__column">
            <div class="showcase__item showcase__item--full">
              <app-card
                title="Led Zeppelin IV"
                subtitle="Led Zeppelin \u2022 1971"
                imageShape="square"
                imageSize="large"
                variant="normal"
                cardType="profile"
                layout="horizontal"
                [badges]="['Hard Rock', 'Blues Rock', 'Heavy Metal']"
                [actions]="profileActions">
              </app-card>
              <code>Card horizontal con m\xFAltiples badges y acciones (se vuelve vertical en m\xF3vil)</code>
            </div>

            <div class="showcase__item showcase__item--full">
              <app-card
                title="Abbey Road"
                subtitle="The Beatles \u2022 1969"
                imageShape="square"
                imageSize="large"
                variant="vinilo"
                cardType="profile"
                layout="horizontal"
                [badges]="['Rock', 'Pop Rock']"
                [actions]="profileActions.slice(0, 2)">
              </app-card>
              <code>Card horizontal con efecto vinilo</code>
            </div>
          </div>
        </div>

        <!-- Textarea -->
        <div class="showcase">
          <h3>Textarea</h3>
          <div class="showcase__grid showcase__grid--forms">
            <div class="showcase__item">
              <app-form-textarea
                label="Descripci\xF3n"
                id="textarea-normal"
                placeholder="Escribe tu descripci\xF3n aqu\xED..."
                [rows]="4"
                hint="M\xE1ximo 500 caracteres"
              ></app-form-textarea>
              <code>Textarea normal</code>
            </div>

            <div class="showcase__item">
              <app-form-textarea
                label="Biograf\xEDa"
                id="textarea-error"
                placeholder="Escribe tu biograf\xEDa..."
                [rows]="4"
                error="Este campo es obligatorio"
              ></app-form-textarea>
              <code>Textarea con error</code>
            </div>

            <div class="showcase__item">
              <app-form-textarea
                label="Comentario"
                id="textarea-disabled"
                placeholder="No disponible"
                [rows]="4"
                [disabled]="true"
              ></app-form-textarea>
              <code>Textarea deshabilitado</code>
            </div>
          </div>
        </div>

        <!-- Select -->
        <div class="showcase">
          <h3>Select</h3>
          <div class="showcase__grid showcase__grid--forms">
            <div class="showcase__item">
              <app-form-select
                label="G\xE9nero musical"
                id="select-normal"
                placeholder="Selecciona tu g\xE9nero favorito"
                [options]="genreOptions"
                hint="Elige el g\xE9nero que m\xE1s te gusta"
              ></app-form-select>
              <code>Select normal</code>
            </div>

            <div class="showcase__item">
              <app-form-select
                label="G\xE9nero musical"
                id="select-error"
                placeholder="Selecciona tu g\xE9nero favorito"
                [options]="genreOptions"
                error="Debes seleccionar un g\xE9nero"
              ></app-form-select>
              <code>Select con error</code>
            </div>

            <div class="showcase__item">
              <app-form-select
                label="G\xE9nero musical"
                id="select-disabled"
                placeholder="No disponible"
                [options]="genreOptions"
                [disabled]="true"
              ></app-form-select>
              <code>Select deshabilitado</code>
            </div>
          </div>
        </div>

        <!-- Checkbox -->
        <div class="showcase">
          <h3>Checkbox</h3>
          <div class="showcase__grid showcase__grid--forms">
            <div class="showcase__item">
              <app-form-checkbox
                label="Acepto los t\xE9rminos y condiciones"
                id="checkbox-normal"
              ></app-form-checkbox>
              <code>Checkbox normal</code>
            </div>

            <div class="showcase__item">
              <app-form-checkbox
                label="Suscribirme al newsletter"
                id="checkbox-error"
                error="Debes aceptar para continuar"
              ></app-form-checkbox>
              <code>Checkbox con error</code>
            </div>

            <div class="showcase__item">
              <app-form-checkbox
                label="Opci\xF3n no disponible"
                id="checkbox-disabled"
                [disabled]="true"
              ></app-form-checkbox>
              <code>Checkbox deshabilitado</code>
            </div>
          </div>
        </div>

        <!-- Radio Group -->
        <div class="showcase">
          <h3>Radio Group</h3>
          <div class="showcase__grid showcase__grid--forms">
            <div class="showcase__item">
              <app-form-radio-group
                label="Privacidad del perfil"
                name="privacy"
                [options]="privacyOptions"
              ></app-form-radio-group>
              <code>Radio group normal</code>
            </div>

            <div class="showcase__item">
              <app-form-radio-group
                label="Privacidad del perfil"
                name="privacy-error"
                [options]="privacyOptions"
                error="Debes seleccionar una opci\xF3n"
              ></app-form-radio-group>
              <code>Radio group con error</code>
            </div>

            <div class="showcase__item">
              <app-form-radio-group
                label="Privacidad del perfil"
                name="privacy-inline"
                [options]="privacyOptions"
                [inline]="true"
              ></app-form-radio-group>
              <code>Radio group inline</code>
            </div>
          </div>
        </div>

        <!-- Breadcrumbs -->
        <div class="showcase">
          <h3>Breadcrumbs</h3>
          <div class="showcase__column">
            <div class="showcase__item showcase__item--full">
              <app-breadcrumbs [items]="breadcrumbsSimple"></app-breadcrumbs>
              <code>Breadcrumbs simple</code>
            </div>

            <div class="showcase__item showcase__item--full">
              <app-breadcrumbs [items]="breadcrumbsWithIcons"></app-breadcrumbs>
              <code>Breadcrumbs con iconos</code>
            </div>

            <div class="showcase__item showcase__item--full">
              <app-breadcrumbs [items]="breadcrumbsLong"></app-breadcrumbs>
              <code>Breadcrumbs largo (con truncado en m\xF3vil)</code>
            </div>

            <div class="showcase__item showcase__item--full">
              <app-breadcrumbs
                [items]="breadcrumbsSimple"
                separator="\u203A"
              ></app-breadcrumbs>
              <code>Breadcrumbs con separador custom (\u203A)</code>
            </div>
          </div>
        </div>

        <!-- Alerts -->
        <div class="showcase">
          <h3>Alerts</h3>
          <div class="showcase__column">
            <div class="showcase__item showcase__item--full">
              <app-alert
                type="success"
                title="\xA1\xC9xito!"
                message="Tu \xE1lbum se ha agregado correctamente a tu colecci\xF3n."
              ></app-alert>
              <code>Alert de \xE9xito</code>
            </div>

            <div class="showcase__item showcase__item--full">
              <app-alert
                type="error"
                title="Error"
                message="No se pudo conectar con el servidor. Por favor, int\xE9ntalo de nuevo."
              ></app-alert>
              <code>Alert de error</code>
            </div>

            <div class="showcase__item showcase__item--full">
              <app-alert
                type="warning"
                title="Advertencia"
                message="Tu sesi\xF3n caducar\xE1 en 5 minutos. Guarda tus cambios."
              ></app-alert>
              <code>Alert de advertencia</code>
            </div>

            <div class="showcase__item showcase__item--full">
              <app-alert
                type="info"
                title="Informaci\xF3n"
                message="Tenemos nueva m\xFAsica disponible en tu secci\xF3n de recomendados."
              ></app-alert>
              <code>Alert de informaci\xF3n</code>
            </div>

            <div class="showcase__item showcase__item--full">
              <app-alert
                type="warning"
                title="Cambios pendientes"
                message="Tienes cambios sin guardar. \xBFDeseas salir de todas formas?"
                [dismissible]="true"
              ></app-alert>
              <code>Alert con bot\xF3n cerrar</code>
            </div>
          </div>
        </div>

        <!-- Tooltip -->
        <div class="showcase">
          <h3>Tooltip - Posiciones</h3>
          <div class="showcase__grid" style="gap: 3rem; padding: 2rem;">
            <div class="showcase__item">
              <app-tooltip text="Tooltip arriba" position="top">
                <app-button>Top</app-button>
              </app-tooltip>
            </div>

            <div class="showcase__item">
              <app-tooltip text="Tooltip abajo" position="bottom">
                <app-button>Bottom</app-button>
              </app-tooltip>
            </div>

            <div class="showcase__item">
              <app-tooltip text="Tooltip izquierda" position="left">
                <app-button>Left</app-button>
              </app-tooltip>
            </div>

            <div class="showcase__item">
              <app-tooltip text="Tooltip derecha" position="right">
                <app-button>Right</app-button>
              </app-tooltip>
            </div>
          </div>
        </div>
      </section>
    }

    <!-- ============================================ -->
    <!-- SECCI\xD3N 4: ORGANISMOS -->
    <!-- ============================================ -->
    @if (activeSection() === 'organisms') {
      <section class="style-guide__section">
        <h2>Organismos</h2>
        <p class="showcase__description">
          Componentes complejos: formularios completos, modales, accordions, tabs y carruseles.
        </p>

        <!-- Notifications Toast -->
        <div class="showcase">
          <h3>Notifications (Toast)</h3>
          <p class="showcase__description">
            Las notificaciones aparecen flotando en las esquinas de la pantalla.
          </p>
          <div class="showcase__row">
            <div class="showcase__item">
              <app-button
                (click)="showToast('success')"
                variant="primary"
                size="md"
              >
                Notificaci\xF3n de \xE9xito
              </app-button>
            </div>

            <div class="showcase__item">
              <app-button
                (click)="showToast('error')"
                variant="danger"
                size="md"
              >
                Notificaci\xF3n de error
              </app-button>
            </div>

            <div class="showcase__item">
              <app-button
                (click)="showToast('warning')"
                variant="secondary"
                size="md"
              >
                Notificaci\xF3n de advertencia
              </app-button>
            </div>

            <div class="showcase__item">
              <app-button
                (click)="showToast('info')"
                variant="ghost"
                size="md"
              >
                Notificaci\xF3n de informaci\xF3n
              </app-button>
            </div>
          </div>
        </div>

        <!-- Notifications DOM Manipulation -->
        <div class="showcase">
          <h3>Notificaciones Din\xE1micas (Manipulaci\xF3n DOM)</h3>
          <p class="showcase__description">
            Notificaciones creadas din\xE1micamente usando <code>createComponent()</code> y <code>appendChild()</code>.
          </p>
          <div class="showcase__row">
            <div class="showcase__item">
              <app-button
                (click)="showDynamicNotification('success')"
                variant="primary"
                size="md"
              >
                Crear notificaci\xF3n en el DOM
              </app-button>
              <code>createElement + appendChild</code>
            </div>

            <div class="showcase__item">
              <app-button
                (click)="showDynamicNotification('error')"
                variant="danger"
                size="md"
              >
                Error con creaci\xF3n din\xE1mica
              </app-button>
            </div>
          </div>
        </div>

        <!-- Formularios Completos -->
        <div class="showcase">
          <h3>Formulario de Login</h3>
          <div class="showcase__column">
            <div class="showcase__item showcase__item--centered">
              <app-login-form></app-login-form>
              <code>Formulario de inicio de sesi\xF3n con validaci\xF3n</code>
            </div>
          </div>
        </div>

        <div class="showcase">
          <h3>Formulario de Registro</h3>
          <div class="showcase__column">
            <div class="showcase__item showcase__item--centered">
              <app-register-form></app-register-form>
              <code>Formulario de registro con validaci\xF3n completa</code>
            </div>
          </div>
        </div>

        <div class="showcase">
          <h3>Formulario de Recuperaci\xF3n de Contrase\xF1a</h3>
          <div class="showcase__column">
            <div class="showcase__item showcase__item--centered">
              <app-forgot-password-form></app-forgot-password-form>
              <code>Formulario para recuperar contrase\xF1a</code>
            </div>
          </div>
        </div>

        <!-- Modal -->
        <div class="showcase">
          <h3>Modal</h3>
          <p class="showcase__description">
            Componente modal con overlay, cierre con ESC, click fuera y trap focus.
          </p>
          <div class="showcase__row">
            <div class="showcase__item">
              <app-button (clicked)="openModal()">
                Abrir Modal
              </app-button>
              <code>Modal con signal isOpen</code>
            </div>
          </div>

          <app-modal
            [isOpen]="isModalOpen()"
            title="Confirmar acci\xF3n"
            (onClose)="closeModal()">
            <p>\xBFEst\xE1s seguro de que quieres eliminar este \xE1lbum de tu colecci\xF3n?</p>
            <p>Esta acci\xF3n no se puede deshacer.</p>
            <div style="display: flex; gap: 1rem; margin-top: 1.5rem;">
              <app-button variant="danger" (clicked)="closeModal()">
                Eliminar
              </app-button>
              <app-button variant="secondary" (clicked)="closeModal()">
                Cancelar
              </app-button>
            </div>
          </app-modal>
        </div>

        <!-- Accordion -->
        <div class="showcase">
          <h3>Accordion - Modo Single</h3>
          <p class="showcase__description">
            Solo puede haber un item abierto a la vez.
          </p>
          <div class="showcase__column">
            <div class="showcase__item showcase__item--full">
              <app-accordion [items]="accordionItems" mode="single"></app-accordion>
            </div>
          </div>
        </div>

        <div class="showcase">
          <h3>Accordion - Modo Multiple</h3>
          <div class="showcase__column">
            <div class="showcase__item showcase__item--full">
              <app-accordion [items]="accordionItems" mode="multiple"></app-accordion>
            </div>
          </div>
        </div>

        <!-- Tabs (Original) -->
        <div class="showcase">
          <h3>Tabs (Pesta\xF1as)</h3>
          <p class="showcase__description">
            Navegaci\xF3n por teclado (flechas izquierda/derecha) y soporte para tabs deshabilitados.
          </p>
          <div class="showcase__column">
            <div class="showcase__item showcase__item--full">
              <app-tabs [tabs]="tabsExample" [initialActiveTab]="'overview'"></app-tabs>
            </div>
          </div>
        </div>

        <!-- Carrusel -->
        <div class="showcase">
          <h3>Carrusel de \xC1lbumes</h3>
          <app-carousel title="\xC1LBUMES EN TENDENCIA">
            <app-card
              *ngFor="let album of trendingAlbums"
              [title]="album.title"
              [subtitle]="album.artist + ' \u2022 ' + album.year"
              imageShape="square"
              imageSize="medium"
              variant="normal"
              cardType="polaroid"
              titleLink="#album"
              subtitleLink="#artist">
            </app-card>
          </app-carousel>
        </div>

        <div class="showcase">
          <h3>Carrusel de Canciones</h3>
          <app-carousel title="CANCIONES EN TENDENCIA">
            <app-card
              *ngFor="let song of trendingSongs"
              [title]="song.title"
              [subtitle]="song.artist"
              imageShape="circle"
              imageSize="medium"
              variant="normal"
              cardType="polaroid"
              titleLink="#song"
              subtitleLink="#artist">
            </app-card>
          </app-carousel>
        </div>

        <!-- Carrusel con manipulaci\xF3n DOM -->
        <div class="showcase">
          <h3>Manipulaci\xF3n de Estilos Din\xE1micos (DOM)</h3>
          <p class="showcase__description">
            Este carousel demuestra manipulaci\xF3n directa del DOM modificando estilos con <code>nativeElement.style</code>.
          </p>
          <div class="showcase__column">
            <div class="showcase__item showcase__item--full">
              <app-carousel #demoCarousel title="DEMO - MANIPULACI\xD3N DE ESTILOS">
                <app-card
                  *ngFor="let album of trendingAlbums.slice(0, 5)"
                  [title]="album.title"
                  [subtitle]="album.artist"
                  imageShape="square"
                  imageSize="medium"
                  variant="normal"
                  cardType="polaroid"
                  titleLink="#album"
                  subtitleLink="#artist">
                </app-card>
              </app-carousel>

              <div class="style-guide__carousel-demo-controls">
                <app-button (clicked)="toggleCarouselHighlight()" variant="secondary" size="sm">
                  Toggle Highlight (boxShadow + border)
                </app-button>

                <label class="style-guide__carousel-demo-opacity">
                  <span>Opacidad:</span>
                  <input
                    type="range"
                    min="0"
                    max="1"
                    step="0.1"
                    [value]="carouselOpacity"
                    (input)="updateCarouselOpacity($event)"
                    class="style-guide__carousel-demo-range"
                  />
                  <span>{{ carouselOpacity }}</span>
                </label>
              </div>
              <code>Modifica: boxShadow, border, opacity con nativeElement.style</code>
            </div>
          </div>
        </div>
      </section>
    }

    <!-- ============================================ -->
    <!-- SECCI\xD3N 5: LAYOUT -->
    <!-- ============================================ -->
    @if (activeSection() === 'layout') {
      <section class="style-guide__section">
        <h2>Componentes de Layout</h2>
        <p class="showcase__description">
          Estructura principal de la aplicaci\xF3n basada en el sistema de dise\xF1o 70s Neobrutalist.
          Estos componentes heredan las variables, sombras, colores y tipograf\xEDa de los Fundamentos.
          Los componentes de layout se visualizan directamente en esta p\xE1gina.
        </p>

        <!-- Componentes de Layout - Listado con SVG Icons -->
        <div class="showcase">
          <h3>Componentes Disponibles</h3>
          <p class="showcase__description">
            Cada componente usa mixins y variables del sistema de dise\xF1o.
            Observa la p\xE1gina actual para ver estos componentes en acci\xF3n.
          </p>
          <div class="showcase__grid showcase__grid--forms">
            <div class="layout-info-card">
              <div class="layout-info-card__header">
                <svg class="layout-info-card__icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                  <rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect>
                  <line x1="3" y1="9" x2="21" y2="9"></line>
                </svg>
                <span class="layout-info-card__name">app-header</span>
              </div>
              <p class="layout-info-card__desc">Cabecera con logo central, franjas 70s y botones de autenticaci\xF3n.</p>
              <div class="layout-info-card__vars">
                <code>--header-bg</code>
                <code>$borde-brutal-thick</code>
              </div>
            </div>

            <div class="layout-info-card">
              <div class="layout-info-card__header">
                <svg class="layout-info-card__icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                  <line x1="3" y1="12" x2="21" y2="12"></line>
                  <line x1="3" y1="6" x2="21" y2="6"></line>
                  <line x1="3" y1="18" x2="21" y2="18"></line>
                </svg>
                <span class="layout-info-card__name">main-nav</span>
              </div>
              <p class="layout-info-card__desc">Barra de navegaci\xF3n sticky con enlaces y toggle de tema.</p>
              <div class="layout-info-card__vars">
                <code>--nav-bg</code>
                <code>$z-nav</code>
              </div>
            </div>

            <div class="layout-info-card">
              <div class="layout-info-card__header">
                <svg class="layout-info-card__icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                  <rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect>
                  <line x1="3" y1="15" x2="21" y2="15"></line>
                </svg>
                <span class="layout-info-card__name">app-footer</span>
              </div>
              <p class="layout-info-card__desc">Pie de p\xE1gina sim\xE9trico con logo central y botones de navegaci\xF3n.</p>
              <div class="layout-info-card__vars">
                <code>--header-bg</code>
                <code>$radio-pildora</code>
              </div>
            </div>
          </div>
        </div>

        <!-- Breakpoints con Cards Polaroid -->
        <div class="showcase">
          <h3>Sistema de Breakpoints</h3>
          <p class="showcase__description">
            Puntos de quiebre responsive definidos en <code>_variables.scss</code>.
            El layout se adapta autom\xE1ticamente a cada tama\xF1o de pantalla.
          </p>
          <div class="showcase__row showcase__row--wrap">
            <div class="showcase__item showcase__item--breakpoint">
              <app-card
                title="Mobile"
                subtitle="320px+"
                imageShape="square"
                imageSize="medium"
                variant="normal"
                cardType="polaroid"
                [placeholderIcon]="'<svg viewBox=&quot;0 0 24 24&quot; fill=&quot;none&quot; stroke=&quot;currentColor&quot; stroke-width=&quot;2&quot; stroke-linecap=&quot;round&quot; stroke-linejoin=&quot;round&quot;><rect x=&quot;5&quot; y=&quot;2&quot; width=&quot;14&quot; height=&quot;20&quot; rx=&quot;2&quot; ry=&quot;2&quot;></rect><line x1=&quot;12&quot; y1=&quot;18&quot; x2=&quot;12.01&quot; y2=&quot;18&quot;></line></svg>'">
              </app-card>
              <code class="showcase__code">$breakpoint-mobile</code>
            </div>

            <div class="showcase__item showcase__item--breakpoint">
              <app-card
                title="Tablet"
                subtitle="768px+"
                imageShape="square"
                imageSize="medium"
                variant="normal"
                cardType="polaroid"
                [placeholderIcon]="'<svg viewBox=&quot;0 0 24 24&quot; fill=&quot;none&quot; stroke=&quot;currentColor&quot; stroke-width=&quot;2&quot; stroke-linecap=&quot;round&quot; stroke-linejoin=&quot;round&quot;><rect x=&quot;4&quot; y=&quot;2&quot; width=&quot;16&quot; height=&quot;20&quot; rx=&quot;2&quot; ry=&quot;2&quot;></rect><line x1=&quot;12&quot; y1=&quot;18&quot; x2=&quot;12.01&quot; y2=&quot;18&quot;></line></svg>'">
              </app-card>
              <code class="showcase__code">$breakpoint-tablet</code>
            </div>

            <div class="showcase__item showcase__item--breakpoint">
              <app-card
                title="Desktop"
                subtitle="1024px+"
                imageShape="square"
                imageSize="medium"
                variant="vinilo"
                cardType="polaroid"
                [placeholderIcon]="'<svg viewBox=&quot;0 0 24 24&quot; fill=&quot;none&quot; stroke=&quot;currentColor&quot; stroke-width=&quot;2&quot; stroke-linecap=&quot;round&quot; stroke-linejoin=&quot;round&quot;><rect x=&quot;2&quot; y=&quot;3&quot; width=&quot;20&quot; height=&quot;14&quot; rx=&quot;2&quot; ry=&quot;2&quot;></rect><line x1=&quot;8&quot; y1=&quot;21&quot; x2=&quot;16&quot; y2=&quot;21&quot;></line><line x1=&quot;12&quot; y1=&quot;17&quot; x2=&quot;12&quot; y2=&quot;21&quot;></line></svg>'">
              </app-card>
              <code class="showcase__code">$breakpoint-desktop</code>
            </div>

            <div class="showcase__item showcase__item--breakpoint">
              <app-card
                title="Large Desktop"
                subtitle="1200px+"
                imageShape="square"
                imageSize="medium"
                variant="vinilo"
                cardType="polaroid"
                [placeholderIcon]="'<svg viewBox=&quot;0 0 24 24&quot; fill=&quot;none&quot; stroke=&quot;currentColor&quot; stroke-width=&quot;2&quot; stroke-linecap=&quot;round&quot; stroke-linejoin=&quot;round&quot;><rect x=&quot;2&quot; y=&quot;3&quot; width=&quot;20&quot; height=&quot;14&quot; rx=&quot;2&quot; ry=&quot;2&quot;></rect><polyline points=&quot;8 21 12 17 16 21&quot;></polyline></svg>'">
              </app-card>
              <code class="showcase__code">$breakpoint-large-desktop</code>
            </div>
          </div>
        </div>

        <!-- Z-Index Scale -->
        <div class="showcase">
          <h3>Escala de Z-Index</h3>
          <p class="showcase__description">
            Jerarqu\xEDa visual controlada para evitar conflictos de superposici\xF3n.
            Definida centralmente en <code>$variables.scss</code>.
          </p>
          <div class="z-index-scale">
            <div class="z-index-scale__item z-index-scale__item--10">
              <span class="z-index-scale__level">10</span>
              <span class="z-index-scale__name">$z-spinner</span>
              <span class="z-index-scale__desc">Loading global</span>
            </div>
            <div class="z-index-scale__item z-index-scale__item--9">
              <span class="z-index-scale__level">9</span>
              <span class="z-index-scale__name">$z-notification</span>
              <span class="z-index-scale__desc">Toast notifications</span>
            </div>
            <div class="z-index-scale__item z-index-scale__item--8">
              <span class="z-index-scale__level">8</span>
              <span class="z-index-scale__name">$z-tooltip</span>
              <span class="z-index-scale__desc">Tooltips</span>
            </div>
            <div class="z-index-scale__item z-index-scale__item--7">
              <span class="z-index-scale__level">7</span>
              <span class="z-index-scale__name">$z-popover</span>
              <span class="z-index-scale__desc">Dropdowns, popovers</span>
            </div>
            <div class="z-index-scale__item z-index-scale__item--6">
              <span class="z-index-scale__level">6</span>
              <span class="z-index-scale__name">$z-modal</span>
              <span class="z-index-scale__desc">Modales</span>
            </div>
            <div class="z-index-scale__item z-index-scale__item--5">
              <span class="z-index-scale__level">5</span>
              <span class="z-index-scale__name">$z-overlay</span>
              <span class="z-index-scale__desc">Backdrops</span>
            </div>
            <div class="z-index-scale__item z-index-scale__item--4">
              <span class="z-index-scale__level">4</span>
              <span class="z-index-scale__name">$z-nav</span>
              <span class="z-index-scale__desc">Navegaci\xF3n principal</span>
            </div>
            <div class="z-index-scale__item z-index-scale__item--3">
              <span class="z-index-scale__level">3</span>
              <span class="z-index-scale__name">$z-fixed</span>
              <span class="z-index-scale__desc">Sidebar, alertas fijas</span>
            </div>
            <div class="z-index-scale__item z-index-scale__item--2">
              <span class="z-index-scale__level">2</span>
              <span class="z-index-scale__name">$z-sticky</span>
              <span class="z-index-scale__desc">Elementos sticky</span>
            </div>
            <div class="z-index-scale__item z-index-scale__item--1">
              <span class="z-index-scale__level">1</span>
              <span class="z-index-scale__name">$z-dropdown</span>
              <span class="z-index-scale__desc">Dropdowns simples</span>
            </div>
            <div class="z-index-scale__item z-index-scale__item--0">
              <span class="z-index-scale__level">0</span>
              <span class="z-index-scale__name">$z-base</span>
              <span class="z-index-scale__desc">Contenido base</span>
            </div>
          </div>
        </div>

        <!-- Variables CSS de Layout -->
        <div class="showcase">
          <h3>Variables CSS del Layout</h3>
          <p class="showcase__description">
            Variables CSS personalizadas que controlan el tema y se heredan en todos los componentes de layout.
          </p>
          <div class="showcase__grid showcase__grid--forms">
            <div class="css-var-card">
              <span class="css-var-card__name">--bg-primary</span>
              <div class="css-var-card__swatch" style="background-color: var(--bg-primary);"></div>
              <span class="css-var-card__desc">Fondo principal</span>
            </div>
            <div class="css-var-card">
              <span class="css-var-card__name">--bg-secondary</span>
              <div class="css-var-card__swatch" style="background-color: var(--bg-secondary);"></div>
              <span class="css-var-card__desc">Fondo secundario</span>
            </div>
            <div class="css-var-card">
              <span class="css-var-card__name">--header-bg</span>
              <div class="css-var-card__swatch" style="background-color: var(--header-bg);"></div>
              <span class="css-var-card__desc">Fondo del header</span>
            </div>
            <div class="css-var-card">
              <span class="css-var-card__name">--nav-bg</span>
              <div class="css-var-card__swatch" style="background-color: var(--nav-bg);"></div>
              <span class="css-var-card__desc">Fondo de navegaci\xF3n</span>
            </div>
            <div class="css-var-card">
              <span class="css-var-card__name">--color-primary</span>
              <div class="css-var-card__swatch" style="background-color: var(--color-primary);"></div>
              <span class="css-var-card__desc">Color de acci\xF3n principal</span>
            </div>
            <div class="css-var-card">
              <span class="css-var-card__name">--shadow-color</span>
              <div class="css-var-card__swatch" style="background-color: var(--shadow-color);"></div>
              <span class="css-var-card__desc">Color de sombras brutales</span>
            </div>
          </div>
        </div>
      </section>
    }
  </div>

  <!-- Notificaciones flotantes est\xE1ticas (Toast) -->
  @for (notification of staticNotifications; track notification.id; let i = $index) {
    <app-notification
      [type]="notification.type"
      [title]="notification.title"
      [message]="notification.message"
      position="top-right"
      [stackIndex]="i"
      [getHeightAt]="getNotificationHeight"
      [autoDismiss]="true"
      [duration]="5000"
      (dismissed)="removeStaticNotification(notification.id)"
    ></app-notification>
  }
</div>
`, styles: ['@charset "UTF-8";\n\n/* src/app/pages/style-guide/style-guide.scss */\n.style-guide {\n  min-height: 100vh;\n  background-color: var(--bg-primary);\n  padding-top: 0;\n  position: relative;\n}\n.style-guide__sidebar {\n  position: fixed;\n  left: 2rem;\n  bottom: 2rem;\n  z-index: 3;\n  display: flex;\n  flex-direction: column-reverse;\n  align-items: flex-start;\n  gap: 1rem;\n  pointer-events: none;\n}\n@media (max-width: 768px) {\n  .style-guide__sidebar {\n    left: 1rem;\n    bottom: 1rem;\n  }\n}\n.style-guide__sidebar-toggle {\n  display: inline-flex;\n  align-items: center;\n  justify-content: center;\n  gap: 0.5rem;\n  font-family: "Space Grotesk", sans-serif;\n  font-weight: 600;\n  text-transform: uppercase;\n  letter-spacing: 0.05em;\n  text-decoration: none;\n  cursor: pointer;\n  border: 3px solid var(--border-color);\n  border-radius: 9999px;\n  transition: all 150ms ease-in-out;\n  white-space: nowrap;\n  box-sizing: border-box;\n  background-color: var(--color-primary);\n  border: 4px solid var(--border-color);\n  box-shadow: 6px 6px 0px var(--shadow-color);\n  width: 60px;\n  height: 60px;\n  min-height: 44px;\n  padding: 0;\n  font-size: 1.75rem;\n  position: relative;\n  z-index: 2;\n  pointer-events: auto;\n}\n.style-guide__sidebar-toggle:focus-visible {\n  outline: 3px solid var(--color-accent);\n  outline-offset: 2px;\n}\n.style-guide__sidebar-toggle:hover {\n  background-color: var(--color-secondary);\n  box-shadow: 3px 3px 0px var(--shadow-color);\n  transform: translate(3px, 3px);\n}\n.style-guide__sidebar-toggle:active {\n  box-shadow: 0px 0px 0px var(--shadow-color);\n  transform: translate(6px, 6px);\n}\n.style-guide__sidebar-toggle:focus-visible {\n  outline: 3px solid #BB3F03;\n  outline-offset: 4px;\n}\n.style-guide__sidebar-icon {\n  font-size: 1.75rem;\n  line-height: 1;\n  flex-shrink: 0;\n}\n.style-guide__sidebar-menu {\n  list-style: none;\n  margin: 0;\n  padding: 0;\n  display: flex;\n  flex-direction: column;\n  align-items: flex-start;\n  gap: 0.5rem;\n  pointer-events: auto;\n  opacity: 0;\n  visibility: hidden;\n  transform: translateY(20px) scale(0.9);\n  transform-origin: bottom left;\n  transition:\n    opacity 0.3s ease,\n    transform 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275),\n    visibility 0.3s;\n}\n.style-guide__sidebar--open .style-guide__sidebar-menu {\n  opacity: 1;\n  visibility: visible;\n  transform: translateY(0) scale(1);\n}\n.style-guide__sidebar-item {\n  list-style: none;\n}\n.style-guide__sidebar-link {\n  display: inline-flex;\n  align-items: center;\n  justify-content: center;\n  gap: 0.5rem;\n  font-family: "Space Grotesk", sans-serif;\n  font-weight: 600;\n  text-transform: uppercase;\n  letter-spacing: 0.05em;\n  text-decoration: none;\n  cursor: pointer;\n  border: 3px solid var(--border-color);\n  border-radius: 9999px;\n  transition: all 150ms ease-in-out;\n  white-space: nowrap;\n  box-sizing: border-box;\n  background-color: var(--bg-primary);\n  color: var(--text-primary);\n  border: 3px solid var(--border-color);\n  box-shadow: 4px 4px 0px var(--shadow-color);\n  min-width: 180px;\n  padding: 1rem 2rem;\n  font-size: 0.875rem;\n  min-height: 44px;\n  position: relative;\n}\n.style-guide__sidebar-link:focus-visible {\n  outline: 3px solid var(--color-accent);\n  outline-offset: 2px;\n}\n.style-guide__sidebar-link:hover {\n  background-color: var(--bg-secondary);\n  color: var(--text-primary);\n  box-shadow: 2px 2px 0px var(--shadow-color);\n  transform: translate(2px, 2px);\n}\n.style-guide__sidebar-link:active {\n  box-shadow: 0px 0px 0px var(--shadow-color);\n  transform: translate(4px, 4px);\n}\n.style-guide__sidebar-link:focus-visible {\n  outline: 3px solid #BB3F03;\n  outline-offset: 2px;\n}\n.style-guide__sidebar-link--active {\n  background-color: var(--color-primary);\n  color: var(--text-primary);\n  font-weight: 700;\n  border-color: var(--text-primary);\n}\n.style-guide__container {\n  flex: 1;\n  padding: 4rem;\n  width: 100%;\n  min-height: calc(100vh - 70px);\n  overflow-y: auto;\n}\n@media (max-width: 768px) {\n  .style-guide__container {\n    padding: 3rem;\n    min-height: calc(100vh - 60px);\n  }\n}\n@media (max-width: 480px) {\n  .style-guide__container {\n    padding: 2rem;\n  }\n}\n.style-guide__header {\n  text-align: center;\n  margin-bottom: 4rem;\n  padding: 4rem 0;\n  border-bottom: 3px solid var(--border-color) solid var(--text-primary);\n}\n.style-guide__header h1 {\n  font-size: 3rem;\n  color: var(--color-primary);\n  margin-bottom: 1rem;\n  text-transform: uppercase;\n  letter-spacing: 0.05em;\n}\n@media (max-width: 768px) {\n  .style-guide__header h1 {\n    font-size: 2rem;\n  }\n}\n.style-guide__intro {\n  font-size: 1.25rem;\n  color: var(--text-primary);\n  max-width: 600px;\n  margin: 0 auto;\n}\n@media (max-width: 768px) {\n  .style-guide__intro {\n    font-size: 1rem;\n  }\n}\n.style-guide__section {\n  margin-bottom: 4rem;\n  padding: 3rem;\n  background-color: var(--bg-secondary);\n  border: 3px solid var(--border-color) solid var(--border-color);\n  border-radius: 8px;\n  box-shadow: 4px 4px 0px var(--shadow-color);\n}\n.style-guide__section h2 {\n  font-size: 2rem;\n  color: var(--color-secondary);\n  margin-bottom: 3rem;\n  padding-bottom: 1rem;\n  border-bottom: 2px solid var(--text-primary);\n  text-transform: uppercase;\n}\n@media (max-width: 768px) {\n  .style-guide__section h2 {\n    font-size: 1.5rem;\n  }\n}\n.style-guide__section--placeholder {\n  text-align: center;\n  padding: 4rem;\n  opacity: 0.6;\n}\n.style-guide__section--placeholder h2 {\n  border-bottom: none;\n}\n.style-guide__section--placeholder p {\n  color: var(--text-primary);\n  font-size: 1.125rem;\n}\n.showcase {\n  margin-bottom: 3rem;\n}\n.showcase:last-child {\n  margin-bottom: 0;\n}\n.showcase h3 {\n  font-size: 1.5rem;\n  color: var(--text-primary);\n  margin-bottom: 2rem;\n  text-transform: uppercase;\n  letter-spacing: 0.05em;\n}\n@media (max-width: 768px) {\n  .showcase h3 {\n    font-size: 1.25rem;\n  }\n}\n.showcase__row {\n  display: flex;\n  gap: 2rem;\n  flex-wrap: wrap;\n  align-items: flex-start;\n}\n@media (max-width: 768px) {\n  .showcase__row {\n    gap: 1rem;\n  }\n}\n@media (max-width: 480px) {\n  .showcase__row {\n    flex-direction: column;\n  }\n  .showcase__row .showcase__item {\n    width: 100%;\n  }\n}\n.showcase__row--cards-polaroid {\n  justify-content: flex-start;\n}\n.showcase__row--cards-polaroid .showcase__item--card-polaroid {\n  flex: 0 0 auto;\n  width: auto;\n}\n.showcase__row--cards-polaroid .showcase__item--card-polaroid app-card {\n  display: block;\n  width: 220px;\n  max-width: 220px;\n}\n@media (max-width: 768px) {\n  .showcase__row--cards-polaroid {\n    justify-content: center;\n  }\n}\n@media (max-width: 480px) {\n  .showcase__row--cards-polaroid .showcase__item--card-polaroid {\n    width: 100%;\n    max-width: 100%;\n  }\n  .showcase__row--cards-polaroid .showcase__item--card-polaroid app-card {\n    width: 100%;\n    max-width: 100%;\n  }\n}\n.showcase__column {\n  display: flex;\n  flex-direction: column;\n  gap: 2rem;\n  width: 100%;\n}\n.showcase__grid {\n  display: grid;\n  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));\n  gap: 3rem 2rem;\n  align-items: start;\n}\n@media (max-width: 768px) {\n  .showcase__grid {\n    grid-template-columns: 1fr;\n    gap: 2rem;\n  }\n}\n.showcase__grid--forms {\n  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));\n  align-items: flex-start;\n  gap: 4rem;\n}\n@media (max-width: 1024px) {\n  .showcase__grid--forms {\n    grid-template-columns: repeat(2, 1fr);\n    gap: 3rem;\n  }\n}\n@media (max-width: 600px) {\n  .showcase__grid--forms {\n    grid-template-columns: 1fr;\n    gap: 2rem;\n  }\n}\n.showcase__item {\n  display: flex;\n  flex-direction: column;\n  gap: 0.5rem;\n  align-items: flex-start;\n  min-width: 0;\n  max-width: 100%;\n}\n.showcase__item--full {\n  width: 100%;\n  min-width: 0;\n}\n.showcase__item > * {\n  max-width: 100%;\n}\n.showcase__item code {\n  font-family: "Courier New", monospace;\n  font-size: 0.875rem;\n  padding: 0.5rem 1rem;\n  background-color: var(--bg-primary);\n  border: 1px solid var(--border-color);\n  border-radius: 5px;\n  color: var(--text-primary);\n  white-space: nowrap;\n  overflow: auto;\n  max-width: 100%;\n}\n@media (max-width: 768px) {\n  .showcase__item code {\n    font-size: 0.75rem;\n    padding: 4px 6px;\n    white-space: normal;\n    word-break: break-all;\n  }\n}\napp-carousel {\n  display: block;\n  width: 100%;\n  max-width: 100%;\n  min-width: 0;\n}\napp-carousel .carousel__track > app-card {\n  display: block;\n  flex: 0 0 220px !important;\n  width: 220px !important;\n  min-width: 220px !important;\n  max-width: 220px !important;\n}\n@media (max-width: 768px) {\n  app-carousel .carousel__track > app-card {\n    flex: 0 0 170px !important;\n    width: 170px !important;\n    min-width: 170px !important;\n    max-width: 170px !important;\n  }\n}\n@media (max-width: 480px) {\n  app-carousel .carousel__track > app-card {\n    flex: 0 0 150px !important;\n    width: 150px !important;\n    min-width: 150px !important;\n    max-width: 150px !important;\n  }\n}\napp-form-input,\napp-form-textarea,\napp-form-select,\napp-form-checkbox,\napp-form-radio-group {\n  display: block;\n  width: 100%;\n  max-width: 100%;\n}\n.showcase__row app-card,\n.showcase__column app-card,\n.showcase__item app-card {\n  display: block;\n  width: 100%;\n  max-width: 100%;\n  min-width: 0;\n}\napp-alert {\n  display: block;\n  width: 100%;\n}\napp-breadcrumbs {\n  display: block;\n  width: 100%;\n  overflow: hidden;\n}\n.style-guide__carousel-demo-controls {\n  display: flex;\n  flex-wrap: wrap;\n  gap: 1rem;\n  margin-top: 1rem;\n  align-items: center;\n}\n.style-guide__carousel-demo-opacity {\n  display: flex;\n  align-items: center;\n  gap: 0.5rem;\n  flex-wrap: wrap;\n}\n.style-guide__carousel-demo-range {\n  width: 150px;\n  max-width: 100%;\n}\n@media (max-width: 768px) {\n  .style-guide__carousel-demo-controls {\n    align-items: stretch;\n  }\n  .style-guide__carousel-demo-range {\n    width: 100%;\n  }\n}\n.color-swatch {\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n  justify-content: center;\n  gap: 0.5rem;\n  padding: 3rem;\n  min-height: 100px;\n  border: 3px solid var(--border-color);\n  transition: transform 0.2s ease;\n}\n.color-swatch:hover {\n  transform: translateY(-2px);\n}\n.color-swatch__name {\n  font-weight: 700;\n  font-size: 0.875rem;\n  text-transform: uppercase;\n}\n.color-swatch code {\n  font-size: 0.75rem;\n  background: rgba(255, 255, 255, 0.8);\n  padding: 2px 6px;\n  border-radius: 2px;\n  color: #000;\n}\n.color-swatch--primary {\n  background-color: var(--color-accent-primary);\n  color: var(--color-text-on-accent);\n}\n.color-swatch--secondary {\n  background-color: var(--color-accent-secondary);\n  color: var(--color-text-primary);\n}\n.color-swatch--bg {\n  background-color: var(--color-bg-primary);\n  color: var(--color-text-primary);\n}\n.color-swatch--bg-secondary {\n  background-color: var(--color-bg-secondary);\n  color: var(--color-text-primary);\n}\n.color-swatch--text {\n  background-color: var(--color-text-primary);\n  color: var(--color-bg-primary);\n}\n.color-swatch--border {\n  background-color: var(--color-border);\n  color: var(--color-bg-primary);\n}\n.color-swatch--success {\n  background-color: var(--color-success);\n  color: #fff;\n}\n.color-swatch--warning {\n  background-color: var(--color-warning);\n  color: #000;\n}\n.color-swatch--error {\n  background-color: var(--color-error);\n  color: #fff;\n}\n.color-swatch--info {\n  background-color: var(--color-info);\n  color: #fff;\n}\n.showcase__grid--colors {\n  grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));\n}\n.shadow-sample {\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  width: 100px;\n  height: 100px;\n  background-color: var(--color-bg-primary);\n  border: 3px solid var(--color-border);\n  font-weight: 600;\n  text-transform: uppercase;\n}\n.shadow-sample--sm {\n  box-shadow: 2px 2px 0 var(--color-border);\n}\n.shadow-sample--md {\n  box-shadow: 4px 4px 0 var(--color-border);\n}\n.shadow-sample--lg {\n  box-shadow: 6px 6px 0 var(--color-border);\n}\n.spacing-samples {\n  display: flex;\n  flex-direction: column;\n  gap: 1rem;\n  width: 100%;\n}\n.spacing-sample {\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  height: 40px;\n  min-width: 40px;\n  background-color: var(--color-accent-primary);\n  color: var(--color-text-on-accent);\n  font-weight: 600;\n  font-size: 0.75rem;\n  border: 2px solid var(--color-border);\n}\n.spacing-sample span {\n  white-space: nowrap;\n}\n.typography-sample {\n  background-color: var(--color-bg-primary);\n  padding: 3rem;\n  border: 2px solid var(--color-border);\n}\n.typography-sample h1,\n.typography-sample h2,\n.typography-sample h3,\n.typography-sample h4 {\n  margin-bottom: 1rem;\n}\n.typography-sample p {\n  margin-bottom: 0.5rem;\n}\n.layout-diagram {\n  display: flex;\n  flex-direction: column;\n  gap: 3px;\n  border: 4px solid var(--border-color);\n  background-color: var(--border-color);\n  max-width: 600px;\n  margin: 0 auto;\n  border-radius: 8px;\n  overflow: hidden;\n  box-shadow: 4px 4px 0px var(--shadow-color);\n}\n.layout-diagram__header,\n.layout-diagram__footer {\n  background-color: var(--color-primary);\n  color: var(--text-dark);\n  padding: 2rem;\n  text-align: center;\n  font-weight: 700;\n  text-transform: uppercase;\n  letter-spacing: 0.05em;\n}\n.layout-diagram__body {\n  display: flex;\n  gap: 3px;\n  min-height: 200px;\n}\n.layout-diagram__sidebar {\n  flex: 0 0 150px;\n  background-color: var(--bg-secondary);\n  padding: 2rem;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  font-weight: 600;\n  text-transform: uppercase;\n}\n@media (max-width: 768px) {\n  .layout-diagram__sidebar {\n    flex: 0 0 80px;\n    font-size: 0.75rem;\n  }\n}\n.layout-diagram__main {\n  flex: 1;\n  background-color: var(--bg-primary);\n  padding: 2rem;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  font-weight: 600;\n  text-transform: uppercase;\n}\n.showcase__grid--breakpoints {\n  grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));\n}\n.breakpoint-card {\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n  gap: 0.5rem;\n  padding: 2rem;\n  background-color: var(--bg-primary);\n  border: 3px solid var(--border-color);\n  border-radius: 5px;\n  text-align: center;\n  box-shadow: 3px 3px 0px var(--shadow-color);\n  transition: all 150ms ease-in-out;\n}\n.breakpoint-card:hover {\n  transform: translate(-2px, -2px);\n  box-shadow: 5px 5px 0px var(--shadow-color);\n}\n.breakpoint-card__name {\n  font-weight: 700;\n  font-size: 1rem;\n  text-transform: uppercase;\n  color: var(--text-primary);\n}\n.breakpoint-card__value {\n  font-size: 1.5rem;\n  font-weight: 600;\n  color: var(--color-primary);\n}\n.breakpoint-card code {\n  font-size: 0.75rem;\n}\n.showcase__item--centered {\n  align-items: center;\n  width: 100%;\n  margin: 0 auto;\n}\n.font-showcase {\n  background-color: var(--bg-secondary);\n  border: 3px solid var(--border-color);\n  border-radius: 8px;\n  padding: 3rem;\n  margin-bottom: 3rem;\n}\n.font-showcase:last-child {\n  margin-bottom: 0;\n}\n.font-showcase__header {\n  display: flex;\n  align-items: center;\n  justify-content: space-between;\n  margin-bottom: 2rem;\n  padding-bottom: 1rem;\n  border-bottom: 2px solid var(--border-color);\n}\n.font-showcase__header h4 {\n  font-size: 1.5rem;\n  margin: 0;\n  color: var(--text-primary);\n  text-transform: uppercase;\n}\n.font-showcase__tag {\n  display: inline-block;\n  padding: 4px 1rem;\n  background-color: var(--color-primary);\n  color: var(--text-dark);\n  border: 2px solid var(--border-color);\n  border-radius: 3px;\n  font-size: 0.75rem;\n  font-weight: 600;\n  text-transform: uppercase;\n}\n.font-showcase__tag--accent {\n  background-color: var(--color-secondary);\n}\n.font-showcase__samples {\n  display: flex;\n  flex-direction: column;\n  gap: 2rem;\n  margin-bottom: 2rem;\n}\n.font-showcase__sample {\n  display: flex;\n  flex-direction: column;\n  gap: 0.5rem;\n}\n.font-showcase__sample h1,\n.font-showcase__sample h2,\n.font-showcase__sample h3,\n.font-showcase__sample p,\n.font-showcase__sample div {\n  margin: 0;\n  color: var(--text-primary);\n}\n.font-showcase__label {\n  font-size: 0.75rem;\n  color: var(--text-secondary);\n  font-weight: 600;\n  text-transform: uppercase;\n  letter-spacing: 0.05em;\n}\n.font-showcase__usage {\n  padding: 1rem 2rem;\n  background-color: var(--bg-primary);\n  border: 2px solid var(--border-color);\n  border-radius: 5px;\n  font-size: 0.875rem;\n  color: var(--text-primary);\n}\n.font-showcase__usage strong {\n  color: var(--color-primary);\n}\n.monoton-sample {\n  color: var(--color-primary);\n}\n.monoton-sample--lg {\n  font-size: 4rem;\n}\n.monoton-sample--md {\n  font-size: 3rem;\n}\n.monoton-sample--sm {\n  font-size: 2rem;\n}\n.color-section-title {\n  font-size: 1.125rem;\n  color: var(--text-primary);\n  margin: 3rem 0 2rem 0;\n  text-transform: uppercase;\n  font-weight: 600;\n  letter-spacing: 0.05em;\n}\n.color-grid {\n  display: grid;\n  grid-template-columns: repeat(4, 1fr);\n  gap: 2rem;\n  margin-bottom: 3rem;\n}\n@media (max-width: 1024px) {\n  .color-grid {\n    grid-template-columns: repeat(3, 1fr);\n  }\n}\n@media (max-width: 768px) {\n  .color-grid {\n    grid-template-columns: repeat(2, 1fr);\n    gap: 1rem;\n  }\n}\n.color-grid--semantic {\n  grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));\n}\n.color-card {\n  background-color: var(--bg-secondary);\n  border: 3px solid var(--border-color);\n  border-radius: 5px;\n  box-shadow: 4px 4px 0px var(--shadow-color);\n  overflow: hidden;\n  transition: transform 0.2s ease, box-shadow 0.2s ease;\n  display: flex;\n  flex-direction: column;\n  height: 100%;\n}\n.color-card:hover {\n  transform: translate(-2px, -2px);\n  box-shadow: 6px 6px 0px var(--shadow-color);\n}\n.color-card__swatch {\n  width: 100%;\n  height: 120px;\n  border-bottom: 3px solid var(--border-color);\n}\n.color-card__info {\n  padding: 1rem;\n  display: flex;\n  flex-direction: column;\n  gap: 4px;\n  flex: 1;\n}\n.color-card__name {\n  font-weight: 700;\n  font-size: 0.875rem;\n  color: var(--text-primary);\n  text-transform: uppercase;\n}\n.color-card__hex {\n  font-size: 0.75rem;\n  color: var(--text-secondary);\n  font-family: "Courier New", monospace;\n}\n.color-card code {\n  font-size: 0.625rem;\n  padding: 2px 4px;\n  background-color: var(--bg-primary);\n  border: 1px solid var(--border-color);\n  border-radius: 3px;\n  color: var(--text-primary);\n  font-family: "Courier New", monospace;\n  margin-top: auto;\n}\n.shadow-demo {\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n  gap: 1rem;\n  padding: 2rem;\n}\n.shadow-demo__box {\n  width: 100px;\n  height: 100px;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  background-color: var(--color-primary);\n  color: var(--text-dark);\n  border: 3px solid var(--border-color);\n  border-radius: 5px;\n  font-weight: 700;\n  font-size: 1rem;\n}\n.shadow-demo__box--xs {\n  box-shadow: 2px 2px 0px #01131B;\n}\n.shadow-demo__box--s {\n  box-shadow: 4px 4px 0px #01131B;\n}\n.shadow-demo__box--m {\n  box-shadow: 6px 6px 0px #01131B;\n}\n.shadow-demo__box--l {\n  box-shadow: 8px 8px 0px #01131B;\n}\n.shadow-demo__box--vinyl-s {\n  box-shadow: 2px 2px 0px var(--vinyl-shadow-layer-1), 4px 4px 0px var(--vinyl-shadow-layer-2);\n}\n.shadow-demo__box--vinyl-m {\n  box-shadow:\n    2px 2px 0px var(--vinyl-shadow-layer-1),\n    4px 4px 0px var(--vinyl-shadow-layer-2),\n    6px 6px 0px var(--vinyl-shadow-layer-3);\n}\n.shadow-demo__box--vinyl-l {\n  box-shadow:\n    2px 2px 0px var(--vinyl-shadow-layer-1),\n    4px 4px 0px var(--vinyl-shadow-layer-2),\n    6px 6px 0px var(--vinyl-shadow-layer-3),\n    8px 8px 0px var(--vinyl-shadow-layer-4);\n}\n.shadow-demo code {\n  text-align: center;\n}\n.spacing-grid {\n  display: grid;\n  grid-template-columns: repeat(auto-fit, minmax(160px, 1fr));\n  gap: 2rem;\n}\n@media (max-width: 768px) {\n  .spacing-grid {\n    grid-template-columns: repeat(2, 1fr);\n    gap: 1rem;\n  }\n}\n@media (max-width: 480px) {\n  .spacing-grid {\n    grid-template-columns: 1fr;\n  }\n}\n.spacing-card {\n  background-color: var(--bg-secondary);\n  border: 3px solid var(--border-color);\n  border-radius: 5px;\n  padding: 2rem;\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n  gap: 1rem;\n  box-shadow: 3px 3px 0px var(--shadow-color);\n}\n.spacing-card__visual {\n  width: 100%;\n  height: 100px;\n  background-color: var(--bg-primary);\n  border: 2px dashed var(--border-color);\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  border-radius: 3px;\n}\n.spacing-card__block {\n  background-color: var(--color-primary);\n  border: 2px solid var(--border-color);\n  border-radius: 3px;\n}\n.spacing-card__info {\n  text-align: center;\n  display: flex;\n  flex-direction: column;\n  gap: 4px;\n  width: 100%;\n}\n.spacing-card__name {\n  font-weight: 700;\n  font-size: 1rem;\n  color: var(--text-primary);\n  text-transform: uppercase;\n}\n.spacing-card__value {\n  font-size: 0.75rem;\n  color: var(--text-secondary);\n  font-family: "Courier New", monospace;\n}\n.spacing-card code {\n  font-size: 0.625rem;\n  padding: 4px 6px;\n  background-color: var(--bg-primary);\n  border: 1px solid var(--border-color);\n  border-radius: 3px;\n  color: var(--text-primary);\n}\n.link {\n  font-size: 1rem;\n  line-height: 1.5rem;\n  color: var(--color-primary);\n  text-decoration: none;\n  font-weight: 500;\n  position: relative;\n  display: inline-flex;\n  align-items: center;\n  gap: 0.5rem;\n  transition: all 150ms ease-in-out;\n}\n.link:hover {\n  color: var(--color-secondary);\n  transform: translateY(-1px);\n}\n.link:active {\n  transform: translateY(0);\n}\n.link:focus-visible {\n  outline: 2px solid var(--color-accent);\n  outline-offset: 2px;\n  border-radius: 3px;\n}\n.link--primary {\n  color: var(--color-primary);\n  font-weight: 600;\n}\n.link--primary:hover {\n  color: var(--color-secondary);\n}\n.link--underlined::after {\n  content: "";\n  position: absolute;\n  bottom: -2px;\n  left: 0;\n  width: 0;\n  height: 2px;\n  background-color: var(--color-primary);\n  transition: width 150ms ease-in-out;\n}\n.link--underlined:hover::after {\n  width: 100%;\n}\n.link--arrow:hover {\n  gap: calc(0.5rem + 2px);\n}\n.toggle-wrapper {\n  display: flex;\n  align-items: center;\n  gap: 1rem;\n  cursor: pointer;\n  -webkit-user-select: none;\n  user-select: none;\n}\n.toggle-wrapper--disabled {\n  opacity: 0.6;\n  cursor: not-allowed;\n  pointer-events: none;\n}\n.toggle {\n  width: 60px;\n  height: 30px;\n  background-color: var(--bg-secondary);\n  border: 3px solid var(--border-color);\n  border-radius: 5px;\n  box-shadow: 2px 2px 0px var(--shadow-color);\n  cursor: pointer;\n  position: relative;\n  appearance: none;\n  transition: background-color 300ms ease-in-out;\n}\n.toggle::after {\n  content: "";\n  position: absolute;\n  width: 20px;\n  height: 20px;\n  background-color: var(--bg-primary);\n  border: 2px solid var(--border-color);\n  border-radius: 3px;\n  top: 2px;\n  left: 2px;\n  transition: transform 300ms ease-in-out cubic-bezier(0.25, 0.46, 0.45, 0.94);\n}\n.toggle:checked {\n  background-color: var(--color-primary);\n}\n.toggle:checked::after {\n  transform: translateX(30px);\n}\n.toggle:focus-visible {\n  outline: 2px solid var(--color-accent);\n  outline-offset: 2px;\n}\n.toggle:not(:disabled):hover {\n  box-shadow: 3px 3px 0px var(--shadow-color);\n}\n.toggle:disabled {\n  opacity: 0.5;\n  cursor: not-allowed;\n  pointer-events: none;\n}\n.toggle-label {\n  font-size: 1rem;\n  line-height: 1.5rem;\n  color: var(--text-primary);\n  font-weight: 500;\n}\n.checkbox-wrapper {\n  display: flex;\n  align-items: center;\n  gap: 0.5rem;\n  cursor: pointer;\n  -webkit-user-select: none;\n  user-select: none;\n}\n.checkbox-wrapper--disabled {\n  opacity: 0.6;\n  cursor: not-allowed;\n  pointer-events: none;\n}\n.checkbox {\n  width: 24px;\n  height: 24px;\n  border: 3px solid var(--border-color);\n  border-radius: 3px;\n  background-color: var(--bg-primary);\n  box-shadow: 2px 2px 0px var(--shadow-color);\n  cursor: pointer;\n  appearance: none;\n  position: relative;\n  transition: all 150ms ease-in-out;\n  flex-shrink: 0;\n}\n.checkbox:checked {\n  background-color: var(--color-primary);\n}\n.checkbox:checked::after {\n  content: "\\2713";\n  position: absolute;\n  top: 50%;\n  left: 50%;\n  transform: translate(-50%, -50%);\n  font-weight: 700;\n  font-size: 1rem;\n  color: var(--text-dark);\n}\n.checkbox:focus-visible {\n  outline: 2px solid var(--color-accent);\n  outline-offset: 2px;\n}\n.checkbox:not(:disabled):hover {\n  box-shadow: 3px 3px 0px var(--shadow-color);\n  transform: translate(-1px, -1px);\n}\n.checkbox:disabled {\n  opacity: 0.5;\n  cursor: not-allowed;\n  pointer-events: none;\n}\n.checkbox-label {\n  font-size: 1rem;\n  line-height: 1.5rem;\n  color: var(--text-primary);\n  font-weight: 400;\n}\n.radio-wrapper {\n  display: flex;\n  align-items: center;\n  gap: 0.5rem;\n  cursor: pointer;\n  -webkit-user-select: none;\n  user-select: none;\n}\n.radio-wrapper--disabled {\n  opacity: 0.6;\n  cursor: not-allowed;\n  pointer-events: none;\n}\n.radio {\n  width: 24px;\n  height: 24px;\n  border: 3px solid var(--border-color);\n  border-radius: 50%;\n  background-color: var(--bg-primary);\n  box-shadow: 2px 2px 0px var(--shadow-color);\n  cursor: pointer;\n  appearance: none;\n  position: relative;\n  transition: all 150ms ease-in-out;\n  flex-shrink: 0;\n}\n.radio:checked {\n  background-color: var(--color-primary);\n}\n.radio:checked::after {\n  content: "";\n  position: absolute;\n  top: 50%;\n  left: 50%;\n  transform: translate(-50%, -50%);\n  width: 8px;\n  height: 8px;\n  background-color: var(--text-dark);\n  border-radius: 50%;\n}\n.radio:focus-visible {\n  outline: 2px solid var(--color-accent);\n  outline-offset: 2px;\n}\n.radio:not(:disabled):hover {\n  box-shadow: 3px 3px 0px var(--shadow-color);\n  transform: translate(-1px, -1px);\n}\n.radio:disabled {\n  opacity: 0.5;\n  cursor: not-allowed;\n  pointer-events: none;\n}\n.radio-label {\n  font-size: 1rem;\n  line-height: 1.5rem;\n  color: var(--text-primary);\n  font-weight: 400;\n}\n.layout-info-card {\n  display: flex;\n  flex-direction: column;\n  gap: 0.5rem;\n  padding: 2rem;\n  background-color: var(--bg-primary);\n  border: 3px solid var(--border-color);\n  border-radius: 5px;\n  box-shadow: 4px 4px 0px var(--shadow-color);\n  transition: all 150ms ease-in-out;\n}\n.layout-info-card:hover {\n  transform: translate(-2px, -2px);\n  box-shadow: 6px 6px 0px var(--shadow-color);\n}\n.layout-info-card__header {\n  display: flex;\n  align-items: center;\n  gap: 1rem;\n  padding-bottom: 0.5rem;\n  border-bottom: 2px solid var(--border-color);\n}\n.layout-info-card__icon {\n  width: 32px;\n  height: 32px;\n  stroke: var(--color-primary);\n  flex-shrink: 0;\n}\n.layout-info-card__name {\n  font-family: "Courier New", monospace;\n  font-size: 0.875rem;\n  font-weight: 700;\n  color: var(--text-primary);\n}\n.layout-info-card__desc {\n  font-size: 0.875rem;\n  color: var(--text-secondary);\n  line-height: 1.5rem;\n  margin: 0;\n}\n.layout-info-card__vars {\n  display: flex;\n  flex-wrap: wrap;\n  gap: 0.5rem;\n  margin-top: auto;\n}\n.layout-info-card__vars code {\n  font-size: 0.75rem;\n  padding: 2px 0.5rem;\n  background-color: var(--bg-secondary);\n  border: 1px solid var(--border-color);\n  border-radius: 3px;\n  color: var(--color-primary);\n}\n.showcase__row--wrap {\n  display: flex;\n  flex-wrap: wrap;\n  gap: 3rem;\n  justify-content: center;\n  align-items: flex-start;\n}\n.showcase__item--breakpoint {\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n  gap: 1rem;\n}\n.showcase__item--breakpoint app-card {\n  width: 180px;\n}\n.showcase__item--breakpoint code {\n  font-size: 0.75rem;\n  padding: 0.5rem 1rem;\n  background-color: var(--bg-secondary);\n  border: 2px solid var(--border-color);\n  border-radius: 3px;\n  color: var(--color-primary);\n  font-weight: 600;\n}\n.showcase__code {\n  display: block;\n  text-align: center;\n}\n.z-index-scale {\n  display: flex;\n  flex-direction: column;\n  gap: 4px;\n  max-width: 600px;\n  margin: 0 auto;\n}\n.z-index-scale__item {\n  display: flex;\n  align-items: center;\n  gap: 1rem;\n  padding: 0.5rem 1rem;\n  background-color: var(--bg-secondary);\n  border: 2px solid var(--border-color);\n  border-radius: 3px;\n  transition: all 150ms ease-in-out;\n}\n.z-index-scale__item:hover {\n  transform: translateX(4px);\n  box-shadow: 2px 2px 0px var(--shadow-color);\n}\n.z-index-scale__item--10 {\n  background-color: rgba(224, 74, 74, 0.3);\n}\n.z-index-scale__item--9 {\n  background-color: rgba(224, 74, 74, 0.2);\n}\n.z-index-scale__item--8 {\n  background-color: rgba(255, 192, 71, 0.3);\n}\n.z-index-scale__item--7 {\n  background-color: rgba(255, 192, 71, 0.2);\n}\n.z-index-scale__item--6 {\n  background-color: rgba(237, 156, 5, 0.3);\n}\n.z-index-scale__item--5 {\n  background-color: rgba(237, 156, 5, 0.2);\n}\n.z-index-scale__item--4 {\n  background-color: rgba(170, 214, 97, 0.3);\n}\n.z-index-scale__item--3 {\n  background-color: rgba(170, 214, 97, 0.2);\n}\n.z-index-scale__item--2 {\n  background-color: rgba(10, 146, 149, 0.2);\n}\n.z-index-scale__item--1 {\n  background-color: rgba(10, 146, 149, 0.1);\n}\n.z-index-scale__item--0 {\n  background-color: var(--bg-primary);\n}\n.z-index-scale__level {\n  width: 30px;\n  height: 30px;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  background-color: var(--color-primary);\n  border: 2px solid var(--border-color);\n  border-radius: 3px;\n  font-weight: 700;\n  font-size: 0.875rem;\n  color: var(--text-dark);\n  flex-shrink: 0;\n}\n.z-index-scale__name {\n  flex: 1;\n  font-family: "Courier New", monospace;\n  font-size: 0.875rem;\n  font-weight: 600;\n  color: var(--text-primary);\n}\n.z-index-scale__desc {\n  font-size: 0.75rem;\n  color: var(--text-secondary);\n  text-align: right;\n}\n@media (max-width: 768px) {\n  .z-index-scale__desc {\n    display: none;\n  }\n}\n.css-var-card {\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n  gap: 0.5rem;\n  padding: 2rem;\n  background-color: var(--bg-primary);\n  border: 3px solid var(--border-color);\n  border-radius: 5px;\n  box-shadow: 3px 3px 0px var(--shadow-color);\n  transition: all 150ms ease-in-out;\n}\n.css-var-card:hover {\n  transform: translate(-2px, -2px);\n  box-shadow: 5px 5px 0px var(--shadow-color);\n}\n.css-var-card__name {\n  font-family: "Courier New", monospace;\n  font-size: 0.75rem;\n  font-weight: 600;\n  color: var(--color-primary);\n  text-align: center;\n}\n.css-var-card__swatch {\n  width: 60px;\n  height: 60px;\n  border: 3px solid var(--border-color);\n  border-radius: 3px;\n  box-shadow: 2px 2px 0px var(--shadow-color);\n}\n.css-var-card__desc {\n  font-size: 0.75rem;\n  color: var(--text-secondary);\n  text-align: center;\n}\n/*# sourceMappingURL=style-guide.css.map */\n'] }]
  }], null, { demoCarousel: [{
    type: ViewChild,
    args: ["demoCarousel"]
  }], notificationComponents: [{
    type: ViewChildren,
    args: [Notification]
  }] });
})();
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(StyleGuide, { className: "StyleGuide", filePath: "src/app/pages/style-guide/style-guide.ts", lineNumber: 58 });
})();
export {
  StyleGuide
};
//# sourceMappingURL=chunk-3FP33M7R.js.map
