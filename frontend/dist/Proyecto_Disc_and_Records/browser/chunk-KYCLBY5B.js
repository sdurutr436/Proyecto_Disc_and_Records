import {
  LoadingService
} from "./chunk-MBYWNRDU.js";
import {
  CommonModule,
  Component,
  Input,
  inject,
  setClassMetadata,
  ɵsetClassDebugInfo,
  ɵɵadvance,
  ɵɵattribute,
  ɵɵclassMap,
  ɵɵconditional,
  ɵɵconditionalCreate,
  ɵɵdefineComponent,
  ɵɵdomElement,
  ɵɵdomElementEnd,
  ɵɵdomElementStart,
  ɵɵnextContext,
  ɵɵstyleProp,
  ɵɵtext,
  ɵɵtextInterpolate1
} from "./chunk-PFYGRVXA.js";

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
  }, dependencies: [CommonModule], styles: ['@charset "UTF-8";\n\n\n\n[_nghost-%COMP%] {\n  display: block;\n  width: 100%;\n  max-width: 100%;\n  min-width: 0;\n}\n.progress-bar[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: row;\n  gap: 1rem;\n  align-items: center;\n  width: 100%;\n}\n.progress-bar__track[_ngcontent-%COMP%] {\n  flex: 1;\n  height: 20px;\n  background-color: var(--bg-primary);\n  border: 3px solid var(--border-color) solid var(--border-color);\n  overflow: hidden;\n  position: relative;\n  box-shadow: inset 0 2px 4px color-mix(in srgb, var(--shadow-color) 10%, transparent);\n}\n.progress-bar__fill[_ngcontent-%COMP%] {\n  height: 100%;\n  background-color: var(--color-primary);\n  transition: width 0.3s ease-out;\n  position: relative;\n  min-width: 4px;\n}\n.progress-bar__label[_ngcontent-%COMP%] {\n  font-size: 0.75rem;\n  font-weight: 700;\n  color: var(--text-primary);\n  min-width: 40px;\n  text-align: right;\n  font-family: 1rem;\n}\n.progress-bar--sm[_ngcontent-%COMP%]   .progress-bar__track[_ngcontent-%COMP%] {\n  height: 12px;\n  border-width: 2px solid var(--border-color);\n}\n.progress-bar--sm[_ngcontent-%COMP%]   .progress-bar__label[_ngcontent-%COMP%] {\n  font-size: 0.75rem;\n  min-width: 32px;\n}\n.progress-bar--md[_ngcontent-%COMP%]   .progress-bar__track[_ngcontent-%COMP%] {\n  height: 20px;\n}\n.progress-bar--lg[_ngcontent-%COMP%]   .progress-bar__track[_ngcontent-%COMP%] {\n  height: 28px;\n}\n.progress-bar--lg[_ngcontent-%COMP%]   .progress-bar__label[_ngcontent-%COMP%] {\n  font-size: 0.875rem;\n  min-width: 48px;\n}\n.progress-bar--primary[_ngcontent-%COMP%]   .progress-bar__fill[_ngcontent-%COMP%] {\n  background-color: var(--color-primary);\n}\n.progress-bar--secondary[_ngcontent-%COMP%]   .progress-bar__fill[_ngcontent-%COMP%] {\n  background-color: var(--color-secondary);\n}\n.progress-bar--success[_ngcontent-%COMP%]   .progress-bar__fill[_ngcontent-%COMP%] {\n  background-color: #AAD661;\n}\n.progress-bar--warning[_ngcontent-%COMP%]   .progress-bar__fill[_ngcontent-%COMP%] {\n  background-color: #FFC047;\n}\n.progress-bar--error[_ngcontent-%COMP%]   .progress-bar__fill[_ngcontent-%COMP%] {\n  background-color: #E04A4A;\n}\n.progress-bar--indeterminate[_ngcontent-%COMP%]   .progress-bar__fill[_ngcontent-%COMP%] {\n  width: 30% !important;\n  animation: _ngcontent-%COMP%_indeterminate 1.5s ease-in-out infinite;\n}\n@keyframes _ngcontent-%COMP%_indeterminate {\n  0% {\n    transform: translateX(-100%);\n  }\n  100% {\n    transform: translateX(400%);\n  }\n}\n.progress-bar--striped[_ngcontent-%COMP%]   .progress-bar__fill[_ngcontent-%COMP%] {\n  background-image:\n    linear-gradient(\n      45deg,\n      color-mix(in srgb, var(--text-white) 15%, transparent) 25%,\n      transparent 25%,\n      transparent 50%,\n      color-mix(in srgb, var(--text-white) 15%, transparent) 50%,\n      color-mix(in srgb, var(--text-white) 15%, transparent) 75%,\n      transparent 75%,\n      transparent);\n  background-size: 24px 24px;\n  animation: _ngcontent-%COMP%_stripe-move 1s linear infinite;\n}\n@keyframes _ngcontent-%COMP%_stripe-move {\n  0% {\n    background-position: 0 0;\n  }\n  100% {\n    background-position: 24px 0;\n  }\n}\n@media (max-width: 768px) {\n  .progress-bar--lg[_ngcontent-%COMP%]   .progress-bar__track[_ngcontent-%COMP%] {\n    height: 16px;\n  }\n  .progress-bar--lg[_ngcontent-%COMP%]   .progress-bar__label[_ngcontent-%COMP%] {\n    font-size: 0.75rem;\n  }\n}\n/*# sourceMappingURL=progress-bar.css.map */'] });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(ProgressBar, [{
    type: Component,
    args: [{ selector: "app-progress-bar", standalone: true, imports: [CommonModule], template: '<div [class]="containerClasses" role="progressbar"\r\n     [attr.aria-valuenow]="isIndeterminate ? null : currentValue"\r\n     [attr.aria-valuemin]="0"\r\n     [attr.aria-valuemax]="100">\r\n\r\n  <div class="progress-bar__track">\r\n    <div class="progress-bar__fill" [style.width.%]="isIndeterminate ? 30 : currentValue"></div>\r\n  </div>\r\n\r\n  @if (showLabel && !isIndeterminate) {\r\n  <span class="progress-bar__label">\r\n    {{ labelText }}\r\n  </span>\r\n  }\r\n</div>\r\n', styles: ['@charset "UTF-8";\n\n/* src/app/components/shared/progress-bar/progress-bar.scss */\n:host {\n  display: block;\n  width: 100%;\n  max-width: 100%;\n  min-width: 0;\n}\n.progress-bar {\n  display: flex;\n  flex-direction: row;\n  gap: 1rem;\n  align-items: center;\n  width: 100%;\n}\n.progress-bar__track {\n  flex: 1;\n  height: 20px;\n  background-color: var(--bg-primary);\n  border: 3px solid var(--border-color) solid var(--border-color);\n  overflow: hidden;\n  position: relative;\n  box-shadow: inset 0 2px 4px color-mix(in srgb, var(--shadow-color) 10%, transparent);\n}\n.progress-bar__fill {\n  height: 100%;\n  background-color: var(--color-primary);\n  transition: width 0.3s ease-out;\n  position: relative;\n  min-width: 4px;\n}\n.progress-bar__label {\n  font-size: 0.75rem;\n  font-weight: 700;\n  color: var(--text-primary);\n  min-width: 40px;\n  text-align: right;\n  font-family: 1rem;\n}\n.progress-bar--sm .progress-bar__track {\n  height: 12px;\n  border-width: 2px solid var(--border-color);\n}\n.progress-bar--sm .progress-bar__label {\n  font-size: 0.75rem;\n  min-width: 32px;\n}\n.progress-bar--md .progress-bar__track {\n  height: 20px;\n}\n.progress-bar--lg .progress-bar__track {\n  height: 28px;\n}\n.progress-bar--lg .progress-bar__label {\n  font-size: 0.875rem;\n  min-width: 48px;\n}\n.progress-bar--primary .progress-bar__fill {\n  background-color: var(--color-primary);\n}\n.progress-bar--secondary .progress-bar__fill {\n  background-color: var(--color-secondary);\n}\n.progress-bar--success .progress-bar__fill {\n  background-color: #AAD661;\n}\n.progress-bar--warning .progress-bar__fill {\n  background-color: #FFC047;\n}\n.progress-bar--error .progress-bar__fill {\n  background-color: #E04A4A;\n}\n.progress-bar--indeterminate .progress-bar__fill {\n  width: 30% !important;\n  animation: indeterminate 1.5s ease-in-out infinite;\n}\n@keyframes indeterminate {\n  0% {\n    transform: translateX(-100%);\n  }\n  100% {\n    transform: translateX(400%);\n  }\n}\n.progress-bar--striped .progress-bar__fill {\n  background-image:\n    linear-gradient(\n      45deg,\n      color-mix(in srgb, var(--text-white) 15%, transparent) 25%,\n      transparent 25%,\n      transparent 50%,\n      color-mix(in srgb, var(--text-white) 15%, transparent) 50%,\n      color-mix(in srgb, var(--text-white) 15%, transparent) 75%,\n      transparent 75%,\n      transparent);\n  background-size: 24px 24px;\n  animation: stripe-move 1s linear infinite;\n}\n@keyframes stripe-move {\n  0% {\n    background-position: 0 0;\n  }\n  100% {\n    background-position: 24px 0;\n  }\n}\n@media (max-width: 768px) {\n  .progress-bar--lg .progress-bar__track {\n    height: 16px;\n  }\n  .progress-bar--lg .progress-bar__label {\n    font-size: 0.75rem;\n  }\n}\n/*# sourceMappingURL=progress-bar.css.map */\n'] }]
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

export {
  ProgressBar
};
//# sourceMappingURL=chunk-KYCLBY5B.js.map
