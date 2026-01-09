import {
  CommonModule,
  Component,
  EventEmitter,
  Input,
  NgIf,
  Output,
  setClassMetadata,
  ɵsetClassDebugInfo,
  ɵɵadvance,
  ɵɵclassMap,
  ɵɵdefineComponent,
  ɵɵelementEnd,
  ɵɵelementStart,
  ɵɵgetCurrentView,
  ɵɵlistener,
  ɵɵnextContext,
  ɵɵproperty,
  ɵɵresetView,
  ɵɵrestoreView,
  ɵɵtemplate,
  ɵɵtext,
  ɵɵtextInterpolate
} from "./chunk-PFYGRVXA.js";

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

export {
  Alert
};
//# sourceMappingURL=chunk-ZDDBZNTN.js.map
