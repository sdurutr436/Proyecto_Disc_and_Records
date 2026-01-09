import {
  CommonModule,
  Component,
  Input,
  setClassMetadata,
  ɵsetClassDebugInfo,
  ɵɵadvance,
  ɵɵclassProp,
  ɵɵdefineComponent,
  ɵɵdomElementEnd,
  ɵɵdomElementStart,
  ɵɵprojection,
  ɵɵprojectionDef,
  ɵɵtext,
  ɵɵtextInterpolate1
} from "./chunk-PFYGRVXA.js";

// src/app/components/shared/badge/badge.ts
var _c0 = ["*"];
var Badge = class _Badge {
  variant = "primary";
  size = "md";
  text = "";
  removable = false;
  static \u0275fac = function Badge_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _Badge)();
  };
  static \u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _Badge, selectors: [["app-badge"]], inputs: { variant: "variant", size: "size", text: "text", removable: "removable" }, ngContentSelectors: _c0, decls: 3, vars: 19, consts: [[1, "badge"]], template: function Badge_Template(rf, ctx) {
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
  }, dependencies: [CommonModule], styles: ['@charset "UTF-8";\n\n\n\n.badge[_ngcontent-%COMP%] {\n  display: inline-flex;\n  align-items: center;\n  justify-content: center;\n  gap: 0.5rem;\n  font-family: "Space Grotesk", sans-serif;\n  font-weight: 700;\n  text-transform: uppercase;\n  letter-spacing: 0.05em;\n  border: 2px solid var(--border-color);\n  white-space: nowrap;\n  transition: all 150ms ease-in-out;\n  padding: 4px 1rem;\n  font-size: 0.75rem;\n  border-radius: 3px;\n  box-shadow: 2px 2px 0px var(--shadow-color);\n}\n.badge--sm[_ngcontent-%COMP%] {\n  padding: 2px 0.5rem;\n  font-size: 0.625rem;\n  box-shadow: 1px 1px 0px var(--shadow-color);\n}\n.badge--md[_ngcontent-%COMP%] {\n  padding: 4px 1rem;\n  font-size: 0.75rem;\n  box-shadow: 2px 2px 0px var(--shadow-color);\n}\n.badge--lg[_ngcontent-%COMP%] {\n  padding: 0.5rem 2rem;\n  font-size: 0.875rem;\n  box-shadow: 3px 3px 0px var(--shadow-color);\n}\n.badge--primary[_ngcontent-%COMP%] {\n  background-color: var(--color-primary);\n  color: var(--text-dark);\n  border-color: var(--border-color);\n}\n.badge--secondary[_ngcontent-%COMP%] {\n  background-color: var(--bg-secondary);\n  color: var(--text-primary);\n  border-color: var(--border-color);\n}\n.badge--success[_ngcontent-%COMP%] {\n  background-color: var(--color-success);\n  color: var(--text-white);\n  border-color: var(--border-color);\n}\n.badge--warning[_ngcontent-%COMP%] {\n  background-color: var(--color-warning);\n  color: var(--text-dark);\n  border-color: var(--border-color);\n}\n.badge--error[_ngcontent-%COMP%] {\n  background-color: var(--color-error);\n  color: var(--text-white);\n  border-color: var(--border-color);\n}\n.badge--info[_ngcontent-%COMP%] {\n  background-color: var(--color-info);\n  color: var(--text-white);\n  border-color: var(--border-color);\n}\n/*# sourceMappingURL=badge.css.map */'] });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(Badge, [{
    type: Component,
    args: [{ selector: "app-badge", standalone: true, imports: [CommonModule], template: `<span\r
  class="badge"\r
  [class.badge--primary]="variant === 'primary'"\r
  [class.badge--secondary]="variant === 'secondary'"\r
  [class.badge--success]="variant === 'success'"\r
  [class.badge--warning]="variant === 'warning'"\r
  [class.badge--error]="variant === 'error'"\r
  [class.badge--info]="variant === 'info'"\r
  [class.badge--sm]="size === 'sm'"\r
  [class.badge--md]="size === 'md'"\r
  [class.badge--lg]="size === 'lg'">\r
  {{ text }}<ng-content></ng-content>\r
</span>\r
`, styles: ['@charset "UTF-8";\n\n/* src/app/components/shared/badge/badge.scss */\n.badge {\n  display: inline-flex;\n  align-items: center;\n  justify-content: center;\n  gap: 0.5rem;\n  font-family: "Space Grotesk", sans-serif;\n  font-weight: 700;\n  text-transform: uppercase;\n  letter-spacing: 0.05em;\n  border: 2px solid var(--border-color);\n  white-space: nowrap;\n  transition: all 150ms ease-in-out;\n  padding: 4px 1rem;\n  font-size: 0.75rem;\n  border-radius: 3px;\n  box-shadow: 2px 2px 0px var(--shadow-color);\n}\n.badge--sm {\n  padding: 2px 0.5rem;\n  font-size: 0.625rem;\n  box-shadow: 1px 1px 0px var(--shadow-color);\n}\n.badge--md {\n  padding: 4px 1rem;\n  font-size: 0.75rem;\n  box-shadow: 2px 2px 0px var(--shadow-color);\n}\n.badge--lg {\n  padding: 0.5rem 2rem;\n  font-size: 0.875rem;\n  box-shadow: 3px 3px 0px var(--shadow-color);\n}\n.badge--primary {\n  background-color: var(--color-primary);\n  color: var(--text-dark);\n  border-color: var(--border-color);\n}\n.badge--secondary {\n  background-color: var(--bg-secondary);\n  color: var(--text-primary);\n  border-color: var(--border-color);\n}\n.badge--success {\n  background-color: var(--color-success);\n  color: var(--text-white);\n  border-color: var(--border-color);\n}\n.badge--warning {\n  background-color: var(--color-warning);\n  color: var(--text-dark);\n  border-color: var(--border-color);\n}\n.badge--error {\n  background-color: var(--color-error);\n  color: var(--text-white);\n  border-color: var(--border-color);\n}\n.badge--info {\n  background-color: var(--color-info);\n  color: var(--text-white);\n  border-color: var(--border-color);\n}\n/*# sourceMappingURL=badge.css.map */\n'] }]
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

export {
  Badge
};
//# sourceMappingURL=chunk-BBSFSO2S.js.map
