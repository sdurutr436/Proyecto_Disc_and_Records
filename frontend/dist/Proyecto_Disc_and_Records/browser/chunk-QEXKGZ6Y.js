import {
  LoadingService
} from "./chunk-MBYWNRDU.js";
import {
  CommonModule,
  Component,
  EventEmitter,
  Input,
  Output,
  inject,
  setClassMetadata,
  signal,
  ɵsetClassDebugInfo,
  ɵɵadvance,
  ɵɵattribute,
  ɵɵclassMap,
  ɵɵclassProp,
  ɵɵconditional,
  ɵɵconditionalCreate,
  ɵɵdefineComponent,
  ɵɵdomElement,
  ɵɵdomElementEnd,
  ɵɵdomElementStart,
  ɵɵdomListener,
  ɵɵdomProperty,
  ɵɵgetCurrentView,
  ɵɵnextContext,
  ɵɵprojection,
  ɵɵprojectionDef,
  ɵɵresetView,
  ɵɵrestoreView,
  ɵɵsanitizeUrl
} from "./chunk-PFYGRVXA.js";

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
  box-shadow: 4px 4px 0px #01131B;
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
  box-shadow: 4px 4px 0px #01131B;
}
.button--primary[_ngcontent-%COMP%]:hover:not(.button--disabled) {
  background-color: var(--color-secondary);
  box-shadow: 2px 2px 0px #01131B;
  transform: translate(2px, 2px);
}
.button--primary[_ngcontent-%COMP%]:active:not(.button--disabled) {
  box-shadow: 0px 0px 0px #01131B;
  transform: translate(4px, 4px);
}
.button--secondary[_ngcontent-%COMP%] {
  background-color: var(--bg-secondary);
  color: var(--text-primary);
  border-color: var(--border-color);
  box-shadow: 4px 4px 0px #01131B;
}
.button--secondary[_ngcontent-%COMP%]:hover:not(.button--disabled) {
  background-color: var(--bg-primary);
  box-shadow: 2px 2px 0px #01131B;
  transform: translate(2px, 2px);
}
.button--secondary[_ngcontent-%COMP%]:active:not(.button--disabled) {
  box-shadow: 0px 0px 0px #01131B;
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
  box-shadow: 2px 2px 0px #01131B;
}
.button--ghost[_ngcontent-%COMP%]:active:not(.button--disabled) {
  background-color: var(--color-primary);
  transform: translate(2px, 2px);
}
.button--danger[_ngcontent-%COMP%] {
  background-color: #E04A4A;
  color: #FBFAF2;
  border-color: var(--border-color);
  box-shadow: 4px 4px 0px #01131B;
}
.button--danger[_ngcontent-%COMP%]:hover:not(.button--disabled) {
  background-color: var(--color-accent);
  box-shadow: 2px 2px 0px #01131B;
  transform: translate(2px, 2px);
}
.button--danger[_ngcontent-%COMP%]:active:not(.button--disabled) {
  box-shadow: 0px 0px 0px #01131B;
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
  width: 3.5rem;
  height: 3.5rem;
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
  width: 1.25rem;
  height: 1.25rem;
}
.button--lg[_ngcontent-%COMP%]   .button__spinner[_ngcontent-%COMP%] {
  width: 4.5rem;
  height: 4.5rem;
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
    args: [{ selector: "app-button", standalone: true, imports: [CommonModule], template: '<!-- Bot\xF3n como enlace si tiene href -->\r\n@if (isLink) {\r\n<a\r\n  [href]="href"\r\n  [class]="buttonClasses"\r\n  [attr.aria-disabled]="isDisabled"\r\n  [attr.tabindex]="isDisabled ? -1 : 0"\r\n  (click)="onClick($event)">\r\n  @if (isLoading) {\r\n  <span class="button__spinner"></span>\r\n  }\r\n  <span [class.button__content--hidden]="isLoading">\r\n    <ng-content></ng-content>\r\n  </span>\r\n</a>\r\n}\r\n\r\n<!-- Bot\xF3n normal si no tiene href -->\r\n@if (!isLink) {\r\n<button\r\n  [type]="type"\r\n  [class]="buttonClasses"\r\n  [disabled]="isDisabled"\r\n  (click)="onClick($event)">\r\n  @if (isLoading) {\r\n  <span class="button__spinner"></span>\r\n  }\r\n  <span [class.button__content--hidden]="isLoading">\r\n    <ng-content></ng-content>\r\n  </span>\r\n</button>\r\n}\r\n', styles: [`@charset "UTF-8";

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
  box-shadow: 4px 4px 0px #01131B;
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
  box-shadow: 4px 4px 0px #01131B;
}
.button--primary:hover:not(.button--disabled) {
  background-color: var(--color-secondary);
  box-shadow: 2px 2px 0px #01131B;
  transform: translate(2px, 2px);
}
.button--primary:active:not(.button--disabled) {
  box-shadow: 0px 0px 0px #01131B;
  transform: translate(4px, 4px);
}
.button--secondary {
  background-color: var(--bg-secondary);
  color: var(--text-primary);
  border-color: var(--border-color);
  box-shadow: 4px 4px 0px #01131B;
}
.button--secondary:hover:not(.button--disabled) {
  background-color: var(--bg-primary);
  box-shadow: 2px 2px 0px #01131B;
  transform: translate(2px, 2px);
}
.button--secondary:active:not(.button--disabled) {
  box-shadow: 0px 0px 0px #01131B;
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
  box-shadow: 2px 2px 0px #01131B;
}
.button--ghost:active:not(.button--disabled) {
  background-color: var(--color-primary);
  transform: translate(2px, 2px);
}
.button--danger {
  background-color: #E04A4A;
  color: #FBFAF2;
  border-color: var(--border-color);
  box-shadow: 4px 4px 0px #01131B;
}
.button--danger:hover:not(.button--disabled) {
  background-color: var(--color-accent);
  box-shadow: 2px 2px 0px #01131B;
  transform: translate(2px, 2px);
}
.button--danger:active:not(.button--disabled) {
  box-shadow: 0px 0px 0px #01131B;
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
  width: 3.5rem;
  height: 3.5rem;
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
  width: 1.25rem;
  height: 1.25rem;
}
.button--lg .button__spinner {
  width: 4.5rem;
  height: 4.5rem;
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

export {
  Button
};
//# sourceMappingURL=chunk-QEXKGZ6Y.js.map
