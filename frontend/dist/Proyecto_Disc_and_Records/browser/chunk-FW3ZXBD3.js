import {
  Badge
} from "./chunk-BBSFSO2S.js";
import {
  Accordion
} from "./chunk-ZYX7ICOI.js";
import {
  ForgotPasswordForm,
  LoginForm,
  RegisterForm
} from "./chunk-VN6ZFLCS.js";
import {
  Carousel
} from "./chunk-RVU2UK5P.js";
import {
  Spinner
} from "./chunk-VQZYH7QQ.js";
import {
  Card
} from "./chunk-XPYEI6RS.js";
import {
  RouterLink,
  RouterModule
} from "./chunk-BFARIXWD.js";
import {
  ProgressBar
} from "./chunk-KYCLBY5B.js";
import {
  Modal
} from "./chunk-2MIYCLYX.js";
import {
  FormInput
} from "./chunk-CWMH7DMM.js";
import {
  FormCheckbox,
  FormRadioGroup,
  FormSelect
} from "./chunk-BQDVMKT3.js";
import {
  Alert
} from "./chunk-ZDDBZNTN.js";
import {
  FormControl,
  NG_VALUE_ACCESSOR,
  ReactiveFormsModule,
  Validators
} from "./chunk-AVQDXX3C.js";
import {
  Button
} from "./chunk-QEXKGZ6Y.js";
import {
  LoadingService
} from "./chunk-MBYWNRDU.js";
import {
  ApplicationRef,
  CommonModule,
  Component,
  ContentChildren,
  ElementRef,
  EnvironmentInjector,
  EventEmitter,
  HostListener,
  Injectable,
  Input,
  NgForOf,
  NgIf,
  NgStyle,
  Output,
  Renderer2,
  Subject,
  ViewChild,
  ViewChildren,
  __objRest,
  __spreadProps,
  __spreadValues,
  createComponent,
  effect,
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
  ɵɵcontentQuery,
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
  ɵɵresetView,
  ɵɵresolveWindow,
  ɵɵrestoreView,
  ɵɵsanitizeHtml,
  ɵɵstyleProp,
  ɵɵtemplate,
  ɵɵtext,
  ɵɵtextInterpolate,
  ɵɵtextInterpolate1,
  ɵɵviewQuery
} from "./chunk-PFYGRVXA.js";

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
    args: [{ selector: "app-notification", standalone: true, imports: [CommonModule], template: '<div [class]="notificationClasses" [ngStyle]="stackStyles" role="alert" (mouseenter)="onMouseEnter()" (mouseleave)="onMouseLeave()">\r\n  <div class="notification__icon">{{ defaultIcon }}</div>\r\n\r\n  <div class="notification__content">\r\n    @if (title) {\r\n    <h3 class="notification__title">{{ title }}</h3>\r\n    }\r\n    @if (message) {\r\n    <p class="notification__message">{{ message }}</p>\r\n    }\r\n  </div>\r\n\r\n  <button\r\n    type="button"\r\n    class="notification__dismiss"\r\n    (click)="onDismiss()"\r\n    aria-label="Cerrar notificaci\xF3n"\r\n  >\r\n    \u2715\r\n  </button>\r\n\r\n  @if (autoDismiss && duration > 0) {\r\n  <div class="notification__progress" [class.notification__progress--paused]="isPaused()"></div>\r\n  }\r\n</div>\r\n', styles: ['@charset "UTF-8";\n\n/* src/app/components/shared/notification/notification.scss */\n.notification {\n  position: fixed;\n  z-index: 9;\n  display: flex;\n  align-items: flex-start;\n  gap: 1rem;\n  padding: 1rem 2rem;\n  border: 3px solid var(--border-color);\n  border-radius: 5px;\n  box-shadow: 6px 6px 0px var(--shadow-color);\n  min-width: 300px;\n  max-width: 400px;\n  min-height: 60px;\n  margin: 0;\n  opacity: 0;\n  transform: translateX(100%);\n  transition: all 300ms ease-in-out;\n}\n@media (max-width: 767px) {\n  .notification {\n    min-width: 280px;\n    max-width: calc(100vw - 2rem);\n  }\n}\n.notification__icon {\n  flex-shrink: 0;\n  width: 24px;\n  height: 24px;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  font-size: 19.2px;\n  font-weight: 700;\n  line-height: 1;\n}\n.notification__content {\n  flex: 1;\n  display: flex;\n  flex-direction: column;\n  gap: 0.5rem;\n}\n.notification__title {\n  font-size: 1rem;\n  font-weight: 700;\n  margin: 0;\n  line-height: 1.2;\n}\n.notification__message {\n  font-size: 0.9375rem;\n  margin: 0;\n  line-height: 1.4;\n}\n.notification__dismiss {\n  flex-shrink: 0;\n  width: 24px;\n  height: 24px;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  font-size: 19.2px;\n  font-weight: 700;\n  line-height: 1;\n  background: transparent;\n  border: none;\n  cursor: pointer;\n  padding: 0;\n  opacity: 0.7;\n  color: inherit;\n  transition: all 150ms ease-in-out;\n  opacity: 0.8;\n}\n.notification__dismiss:hover {\n  opacity: 1;\n  transform: scale(1.1);\n}\n.notification__dismiss:focus {\n  outline: 2px solid currentColor;\n  outline-offset: 2px;\n}\n.notification--top-right {\n  top: 20px;\n  right: 20px;\n  left: auto;\n  bottom: auto;\n}\n.notification--top-left {\n  top: 20px;\n  left: 20px;\n  right: auto;\n  bottom: auto;\n  transform: translateX(-100%);\n}\n.notification--bottom-right {\n  bottom: 20px;\n  right: 20px;\n  left: auto;\n  top: auto;\n}\n.notification--bottom-left {\n  bottom: 20px;\n  left: 20px;\n  right: auto;\n  top: auto;\n  transform: translateX(-100%);\n}\n.notification--visible {\n  opacity: 1;\n  transform: translateX(0);\n}\n.notification--success {\n  background-color: #AAD661;\n  border-color: var(--border-color);\n  color: var(--text-dark);\n}\n.notification--error {\n  background-color: #E04A4A;\n  border-color: var(--border-color);\n  color: var(--text-white);\n}\n.notification--warning {\n  background-color: #FFC047;\n  border-color: var(--border-color);\n  color: var(--text-dark);\n}\n.notification--info {\n  background-color: #0A9295;\n  border-color: var(--border-color);\n  color: var(--text-white);\n}\n.notification__progress {\n  position: absolute;\n  bottom: 0;\n  left: 0;\n  height: 4px;\n  width: 100%;\n  background-color: currentColor;\n  opacity: 0.3;\n  transform-origin: left;\n  animation: notification-progress var(--notification-duration, 5000ms) linear forwards;\n}\n.notification__progress--paused {\n  animation-play-state: paused;\n}\n@keyframes notification-progress {\n  from {\n    transform: scaleX(1);\n  }\n  to {\n    transform: scaleX(0);\n  }\n}\n/*# sourceMappingURL=notification.css.map */\n'] }]
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

// src/app/components/shared/tabs/tabs.ts
var _c0 = ["tabsNav"];
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
      \u0275\u0275viewQuery(_c0, 5);
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
    args: [{ selector: "app-tabs", imports: [CommonModule], template: `<div class="tabs">\r
  <div class="tabs__nav" role="tablist" #tabsNav>\r
    <button\r
      *ngFor="let tab of tabs()"\r
      class="tabs__tab"\r
      [class.tabs__tab--active]="isActive(tab.id)"\r
      [class.tabs__tab--disabled]="tab.disabled"\r
      [attr.role]="'tab'"\r
      [attr.aria-selected]="isActive(tab.id)"\r
      [attr.aria-controls]="'tabpanel-' + tab.id"\r
      [attr.tabindex]="isActive(tab.id) ? 0 : -1"\r
      [disabled]="tab.disabled"\r
      (click)="selectTab(tab.id)"\r
      type="button">\r
      {{ tab.label }}\r
    </button>\r
  </div>\r
\r
  <!-- Panel de contenido (sin cambios) -->\r
  <div\r
    class="tabs__panel"\r
    role="tabpanel"\r
    [attr.id]="'tabpanel-' + activeTabId()"\r
    [attr.aria-labelledby]="'tab-' + activeTabId()">\r
    <div class="tabs__content">\r
      {{ getActiveContent() }}\r
    </div>\r
  </div>\r
</div>\r
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

// src/app/components/shared/tabs/tab-panel.ts
var _c02 = ["*"];
var TabPanel = class _TabPanel {
  /** ID único del panel */
  id = input.required(...ngDevMode ? [{ debugName: "id" }] : []);
  /** Label que se mostrará en la pestaña */
  label = input.required(...ngDevMode ? [{ debugName: "label" }] : []);
  /** Si la pestaña está deshabilitada */
  disabled = input(false, ...ngDevMode ? [{ debugName: "disabled" }] : []);
  /** Signal para controlar visibilidad (controlado por el padre) */
  _isActive = signal(false, ...ngDevMode ? [{ debugName: "_isActive" }] : []);
  /** Getter público para el estado activo (readonly) */
  isActive = this._isActive.asReadonly();
  /** Método para que el padre controle la visibilidad */
  setActive(value) {
    this._isActive.set(value);
  }
  static \u0275fac = function TabPanel_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _TabPanel)();
  };
  static \u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _TabPanel, selectors: [["app-tab-panel"]], inputs: { id: [1, "id"], label: [1, "label"], disabled: [1, "disabled"] }, ngContentSelectors: _c02, decls: 2, vars: 6, consts: [["role", "tabpanel", 1, "tab-panel"]], template: function TabPanel_Template(rf, ctx) {
    if (rf & 1) {
      \u0275\u0275projectionDef();
      \u0275\u0275domElementStart(0, "div", 0);
      \u0275\u0275projection(1);
      \u0275\u0275domElementEnd();
    }
    if (rf & 2) {
      \u0275\u0275styleProp("display", ctx._isActive() ? "block" : "none");
      \u0275\u0275classProp("tab-panel--active", ctx._isActive());
      \u0275\u0275attribute("id", "panel-" + ctx.id())("aria-labelledby", "tab-" + ctx.id());
    }
  }, dependencies: [CommonModule], styles: ["\n\n.tab-panel[_ngcontent-%COMP%] {\n  animation: _ngcontent-%COMP%_fadeIn 0.3s ease;\n}\n@keyframes _ngcontent-%COMP%_fadeIn {\n  from {\n    opacity: 0;\n    transform: translateY(0.5rem);\n  }\n  to {\n    opacity: 1;\n    transform: translateY(0);\n  }\n}\n/*# sourceMappingURL=tab-panel.css.map */"] });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(TabPanel, [{
    type: Component,
    args: [{ selector: "app-tab-panel", standalone: true, imports: [CommonModule], template: `
    <div
      class="tab-panel"
      [class.tab-panel--active]="_isActive()"
      [attr.id]="'panel-' + id()"
      [style.display]="_isActive() ? 'block' : 'none'"
      role="tabpanel"
      [attr.aria-labelledby]="'tab-' + id()">
      <ng-content></ng-content>
    </div>
  `, styles: ["/* angular:styles/component:scss;dca8b574cb285b8f9738193fe7fb448fc1cae9d9fe2a9f52fadf882c66edbba8;C:/Users/Sergio/Documents/DAW_2/Proyecto_Disc_and_Records/frontend/src/app/components/shared/tabs/tab-panel.ts */\n.tab-panel {\n  animation: fadeIn 0.3s ease;\n}\n@keyframes fadeIn {\n  from {\n    opacity: 0;\n    transform: translateY(0.5rem);\n  }\n  to {\n    opacity: 1;\n    transform: translateY(0);\n  }\n}\n/*# sourceMappingURL=tab-panel.css.map */\n"] }]
  }], null, { id: [{ type: Input, args: [{ isSignal: true, alias: "id", required: true }] }], label: [{ type: Input, args: [{ isSignal: true, alias: "label", required: true }] }], disabled: [{ type: Input, args: [{ isSignal: true, alias: "disabled", required: false }] }] });
})();
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(TabPanel, { className: "TabPanel", filePath: "src/app/components/shared/tabs/tab-panel.ts", lineNumber: 51 });
})();

// src/app/components/shared/tabs/responsive-tabs.ts
var _c03 = ["tabsNav"];
var _c1 = ["*"];
var _forTrack0 = ($index, $item) => $item.id;
function ResponsiveTabs_For_4_Template(rf, ctx) {
  if (rf & 1) {
    const _r1 = \u0275\u0275getCurrentView();
    \u0275\u0275domElementStart(0, "button", 7);
    \u0275\u0275domListener("click", function ResponsiveTabs_For_4_Template_button_click_0_listener() {
      const tab_r2 = \u0275\u0275restoreView(_r1).$implicit;
      const ctx_r2 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r2.selectTab(tab_r2.id));
    });
    \u0275\u0275text(1);
    \u0275\u0275domElementEnd();
  }
  if (rf & 2) {
    const tab_r2 = ctx.$implicit;
    const ctx_r2 = \u0275\u0275nextContext();
    \u0275\u0275classProp("responsive-tabs__tab--active", ctx_r2.isActive(tab_r2.id))("responsive-tabs__tab--disabled", tab_r2.disabled);
    \u0275\u0275domProperty("disabled", tab_r2.disabled);
    \u0275\u0275attribute("id", "tab-" + tab_r2.id)("aria-selected", ctx_r2.isActive(tab_r2.id))("aria-controls", "panel-" + tab_r2.id)("tabindex", ctx_r2.isActive(tab_r2.id) ? 0 : -1);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", tab_r2.label, " ");
  }
}
function ResponsiveTabs_For_7_Template(rf, ctx) {
  if (rf & 1) {
    const _r4 = \u0275\u0275getCurrentView();
    \u0275\u0275domElementStart(0, "button", 8);
    \u0275\u0275domListener("click", function ResponsiveTabs_For_7_Template_button_click_0_listener() {
      const tab_r5 = \u0275\u0275restoreView(_r4).$implicit;
      const ctx_r2 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r2.toggleAccordion(tab_r5.id));
    });
    \u0275\u0275domElementStart(1, "span", 9)(2, "span", 10);
    \u0275\u0275text(3);
    \u0275\u0275domElementEnd();
    \u0275\u0275text(4);
    \u0275\u0275domElementEnd();
    \u0275\u0275domElementStart(5, "span", 11);
    \u0275\u0275namespaceSVG();
    \u0275\u0275domElementStart(6, "svg", 12);
    \u0275\u0275domElement(7, "path", 13);
    \u0275\u0275domElementEnd()()();
  }
  if (rf & 2) {
    const tab_r5 = ctx.$implicit;
    const \u0275$index_11_r6 = ctx.$index;
    const ctx_r2 = \u0275\u0275nextContext();
    \u0275\u0275classProp("responsive-tabs__accordion-header--active", ctx_r2.isAccordionOpen(tab_r5.id))("responsive-tabs__accordion-header--disabled", tab_r5.disabled);
    \u0275\u0275domProperty("disabled", tab_r5.disabled);
    \u0275\u0275attribute("aria-expanded", ctx_r2.isAccordionOpen(tab_r5.id))("aria-controls", "accordion-panel-" + tab_r5.id);
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate1("", \u0275$index_11_r6 + 1, ".");
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", tab_r5.label, " ");
    \u0275\u0275advance();
    \u0275\u0275classProp("responsive-tabs__accordion-icon--open", ctx_r2.isAccordionOpen(tab_r5.id));
  }
}
var ResponsiveTabs = class _ResponsiveTabs {
  /** Query de todos los TabPanel hijos */
  tabPanels;
  /** Referencia al contenedor de navegación */
  tabsNav;
  /** Breakpoint para cambiar a accordion (en px) */
  breakpoint = input(768, ...ngDevMode ? [{ debugName: "breakpoint" }] : []);
  /** ID de la pestaña activa inicialmente */
  initialActiveTab = input(void 0, ...ngDevMode ? [{ debugName: "initialActiveTab" }] : []);
  /** Signal: modo actual (tabs o accordion) */
  displayMode = signal("tabs", ...ngDevMode ? [{ debugName: "displayMode" }] : []);
  /** Signal: ID del tab/accordion activo */
  activeTabId = signal("", ...ngDevMode ? [{ debugName: "activeTabId" }] : []);
  /** Signal: IDs de accordions abiertos (modo accordion permite múltiples) */
  openAccordions = signal(/* @__PURE__ */ new Set(), ...ngDevMode ? [{ debugName: "openAccordions" }] : []);
  /** Lista de tabs para el template */
  tabs = signal([], ...ngDevMode ? [{ debugName: "tabs" }] : []);
  renderer = inject(Renderer2);
  listeners = [];
  // Variables para drag-to-scroll
  isDown = false;
  startX = 0;
  scrollLeft = 0;
  isDragging = false;
  constructor() {
    this.checkViewport();
    effect(() => {
      const mode = this.displayMode();
      const activeId = this.activeTabId();
      const openSet = this.openAccordions();
      this.syncPanelVisibility(mode, activeId, openSet);
    });
  }
  onResize() {
    this.checkViewport();
  }
  ngAfterContentInit() {
    this.initializeTabs();
    this.tabPanels.changes.subscribe(() => {
      this.initializeTabs();
    });
  }
  ngAfterViewInit() {
    this.setupScrollBehavior();
  }
  ngOnDestroy() {
    this.listeners.forEach((unlisten) => unlisten());
  }
  /**
   * Detecta el viewport y establece el modo de visualización
   */
  checkViewport() {
    const isMobile = window.innerWidth <= this.breakpoint();
    this.displayMode.set(isMobile ? "accordion" : "tabs");
  }
  /**
   * Inicializa la lista de tabs desde los TabPanel proyectados
   */
  initializeTabs() {
    const panels = this.tabPanels.toArray();
    this.tabs.set(panels.map((panel) => ({
      id: panel.id(),
      label: panel.label(),
      disabled: panel.disabled()
    })));
    const initial = this.initialActiveTab();
    if (initial && panels.some((p) => p.id() === initial)) {
      this.activeTabId.set(initial);
      this.openAccordions.update((set) => {
        set.add(initial);
        return new Set(set);
      });
    } else if (panels.length > 0) {
      const firstEnabled = panels.find((p) => !p.disabled());
      if (firstEnabled) {
        this.activeTabId.set(firstEnabled.id());
        this.openAccordions.update((set) => {
          set.add(firstEnabled.id());
          return new Set(set);
        });
      }
    }
    setTimeout(() => {
      this.syncPanelVisibility(this.displayMode(), this.activeTabId(), this.openAccordions());
    }, 0);
  }
  /**
   * Seleccionar una pestana (modo tabs)
   */
  selectTab(tabId) {
    if (this.isDragging)
      return;
    const tab = this.tabs().find((t) => t.id === tabId);
    if (tab && !tab.disabled) {
      this.activeTabId.set(tabId);
      this.syncPanelVisibility(this.displayMode(), tabId, this.openAccordions());
    }
  }
  /**
   * Toggle accordion (modo accordion)
   */
  toggleAccordion(tabId) {
    const tab = this.tabs().find((t) => t.id === tabId);
    if (!tab || tab.disabled)
      return;
    this.openAccordions.update((set) => {
      if (set.has(tabId)) {
        set.delete(tabId);
      } else {
        set.add(tabId);
      }
      return new Set(set);
    });
    this.activeTabId.set(tabId);
  }
  /**
   * Verificar si una pestaña está activa (modo tabs)
   */
  isActive(tabId) {
    return this.activeTabId() === tabId;
  }
  /**
   * Verificar si un accordion está abierto (modo accordion)
   */
  isAccordionOpen(tabId) {
    return this.openAccordions().has(tabId);
  }
  /**
   * Verificar si un panel debe mostrarse (depende del modo)
   */
  isPanelVisible(panelId) {
    if (this.displayMode() === "tabs") {
      return this.activeTabId() === panelId;
    } else {
      return this.openAccordions().has(panelId);
    }
  }
  /**
   * Configura el comportamiento de scroll horizontal (modo tabs)
   */
  setupScrollBehavior() {
    if (!this.tabsNav)
      return;
    const slider = this.tabsNav.nativeElement;
    if (this.displayMode() !== "tabs")
      return;
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
  }
  /**
   * Sincroniza la visibilidad de los TabPanel según el modo y estado actual
   */
  syncPanelVisibility(mode, activeId, openSet) {
    if (!this.tabPanels)
      return;
    this.tabPanels.forEach((panel) => {
      if (mode === "tabs") {
        panel.setActive(panel.id() === activeId);
      } else {
        panel.setActive(openSet.has(panel.id()));
      }
    });
  }
  static \u0275fac = function ResponsiveTabs_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _ResponsiveTabs)();
  };
  static \u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _ResponsiveTabs, selectors: [["app-responsive-tabs"]], contentQueries: function ResponsiveTabs_ContentQueries(rf, ctx, dirIndex) {
    if (rf & 1) {
      \u0275\u0275contentQuery(dirIndex, TabPanel, 4);
    }
    if (rf & 2) {
      let _t;
      \u0275\u0275queryRefresh(_t = \u0275\u0275loadQuery()) && (ctx.tabPanels = _t);
    }
  }, viewQuery: function ResponsiveTabs_Query(rf, ctx) {
    if (rf & 1) {
      \u0275\u0275viewQuery(_c03, 5);
    }
    if (rf & 2) {
      let _t;
      \u0275\u0275queryRefresh(_t = \u0275\u0275loadQuery()) && (ctx.tabsNav = _t.first);
    }
  }, hostBindings: function ResponsiveTabs_HostBindings(rf, ctx) {
    if (rf & 1) {
      \u0275\u0275listener("resize", function ResponsiveTabs_resize_HostBindingHandler() {
        return ctx.onResize();
      }, \u0275\u0275resolveWindow);
    }
  }, inputs: { breakpoint: [1, "breakpoint"], initialActiveTab: [1, "initialActiveTab"] }, ngContentSelectors: _c1, decls: 10, vars: 0, consts: [["tabsNav", ""], [1, "responsive-tabs"], ["role", "tablist", 1, "responsive-tabs__nav"], ["role", "tab", "type", "button", 1, "responsive-tabs__tab", 3, "responsive-tabs__tab--active", "responsive-tabs__tab--disabled", "disabled"], [1, "responsive-tabs__accordion-nav"], ["type", "button", 1, "responsive-tabs__accordion-header", 3, "responsive-tabs__accordion-header--active", "responsive-tabs__accordion-header--disabled", "disabled"], [1, "responsive-tabs__content"], ["role", "tab", "type", "button", 1, "responsive-tabs__tab", 3, "click", "disabled"], ["type", "button", 1, "responsive-tabs__accordion-header", 3, "click", "disabled"], [1, "responsive-tabs__accordion-title"], [1, "responsive-tabs__accordion-number"], [1, "responsive-tabs__accordion-icon"], ["width", "16", "height", "16", "viewBox", "0 0 16 16", "fill", "currentColor"], ["d", "M4 6l4 4 4-4", "stroke", "currentColor", "stroke-width", "2", "fill", "none"]], template: function ResponsiveTabs_Template(rf, ctx) {
    if (rf & 1) {
      \u0275\u0275projectionDef();
      \u0275\u0275domElementStart(0, "div", 1)(1, "nav", 2, 0);
      \u0275\u0275repeaterCreate(3, ResponsiveTabs_For_4_Template, 2, 10, "button", 3, _forTrack0);
      \u0275\u0275domElementEnd();
      \u0275\u0275domElementStart(5, "div", 4);
      \u0275\u0275repeaterCreate(6, ResponsiveTabs_For_7_Template, 8, 11, "button", 5, _forTrack0);
      \u0275\u0275domElementEnd();
      \u0275\u0275domElementStart(8, "div", 6);
      \u0275\u0275projection(9);
      \u0275\u0275domElementEnd()();
    }
    if (rf & 2) {
      \u0275\u0275advance(3);
      \u0275\u0275repeater(ctx.tabs());
      \u0275\u0275advance(3);
      \u0275\u0275repeater(ctx.tabs());
    }
  }, dependencies: [CommonModule], styles: ['@charset "UTF-8";\n\n\n\n[_nghost-%COMP%] {\n  display: block;\n  width: 100%;\n  max-width: 100%;\n  min-width: 0;\n  display: block;\n  width: 100%;\n}\n.responsive-tabs[_ngcontent-%COMP%] {\n  width: 100%;\n  border: 3px solid var(--border-color);\n  border-radius: 5px;\n  background-color: var(--bg-primary);\n  box-shadow: 4px 4px 0px #01131B;\n  overflow: hidden;\n}\n.responsive-tabs--desktop[_ngcontent-%COMP%] {\n  display: block;\n}\n@media (max-width: 768px) {\n  .responsive-tabs--desktop[_ngcontent-%COMP%] {\n    display: none;\n  }\n}\n.responsive-tabs__nav[_ngcontent-%COMP%] {\n  display: flex;\n  flex-wrap: wrap;\n  background-color: var(--bg-secondary);\n  border-bottom: 2px solid var(--border-color);\n}\n.responsive-tabs__tab[_ngcontent-%COMP%] {\n  flex: 0 0 auto;\n  padding: 2rem 3rem;\n  border: none;\n  border-bottom: 3px solid transparent;\n  background-color: transparent;\n  color: var(--text-secondary);\n  font-family: "Space Grotesk", sans-serif;\n  font-size: 1rem;\n  font-weight: 600;\n  cursor: pointer;\n  transition: 150ms ease-in-out;\n  position: relative;\n  white-space: nowrap;\n  text-transform: uppercase;\n  letter-spacing: 0.05em;\n}\n.responsive-tabs__tab[_ngcontent-%COMP%]:hover:not(:disabled):not(.responsive-tabs__tab--active) {\n  background-color: var(--bg-tertiary);\n  color: var(--text-primary);\n}\n.responsive-tabs__tab[_ngcontent-%COMP%]:focus-visible {\n  outline: 3px solid var(--color-accent);\n  outline-offset: 2px;\n}\n.responsive-tabs__tab--active[_ngcontent-%COMP%] {\n  background-color: var(--bg-tertiary);\n  color: var(--color-primary);\n  font-weight: 800;\n  border-bottom-color: var(--color-primary);\n}\n.responsive-tabs__tab--disabled[_ngcontent-%COMP%] {\n  opacity: 0.4;\n  cursor: not-allowed;\n  pointer-events: none;\n}\n.responsive-tabs__content[_ngcontent-%COMP%] {\n  padding: 3rem;\n  min-height: 12rem;\n}\n.responsive-tabs--mobile[_ngcontent-%COMP%] {\n  display: none;\n}\n@media (max-width: 768px) {\n  .responsive-tabs--mobile[_ngcontent-%COMP%] {\n    display: block;\n  }\n}\n.responsive-tabs__accordion-item[_ngcontent-%COMP%] {\n  margin-bottom: 0;\n}\n.responsive-tabs__accordion-item[_ngcontent-%COMP%]:first-child   .responsive-tabs__accordion-header[_ngcontent-%COMP%] {\n  border-top-left-radius: 5px;\n  border-top-right-radius: 5px;\n}\n.responsive-tabs__accordion-item[_ngcontent-%COMP%]:not(:first-child)   .responsive-tabs__accordion-header[_ngcontent-%COMP%] {\n  border-top: none;\n}\n.responsive-tabs__accordion-header[_ngcontent-%COMP%] {\n  display: flex;\n  justify-content: space-between;\n  align-items: center;\n  width: 100%;\n  padding: 1rem 2rem;\n  font-family: "Space Grotesk", sans-serif;\n  font-size: 0.9375rem;\n  font-weight: 600;\n  text-align: left;\n  color: var(--text-primary);\n  background-color: var(--bg-secondary);\n  cursor: pointer;\n  transition: all 0.2s ease;\n  border: 3px solid var(--border-color);\n  text-transform: uppercase;\n  letter-spacing: 0.05em;\n}\n.responsive-tabs__accordion-header[_ngcontent-%COMP%]:hover:not(:disabled) {\n  background-color: var(--color-primary);\n  color: var(--text-dark);\n}\n.responsive-tabs__accordion-header[_ngcontent-%COMP%]:focus-visible {\n  outline: 3px solid var(--color-accent);\n  outline-offset: 2px;\n}\n.responsive-tabs__accordion-header--active[_ngcontent-%COMP%] {\n  background-color: var(--color-primary);\n  color: var(--text-dark);\n}\n.responsive-tabs__accordion-header--disabled[_ngcontent-%COMP%] {\n  opacity: 0.4;\n  cursor: not-allowed;\n  pointer-events: none;\n}\n.responsive-tabs__accordion-title[_ngcontent-%COMP%] {\n  flex: 1;\n  display: flex;\n  align-items: center;\n  gap: 0.5rem;\n}\n.responsive-tabs__accordion-number[_ngcontent-%COMP%] {\n  font-weight: 700;\n  opacity: 0.7;\n}\n.responsive-tabs__accordion-icon[_ngcontent-%COMP%] {\n  display: inline-flex;\n  align-items: center;\n  justify-content: center;\n  width: 1.5rem;\n  height: 1.5rem;\n  transition: transform 300ms ease-in-out;\n}\n.responsive-tabs__accordion-icon--open[_ngcontent-%COMP%] {\n  transform: rotate(180deg);\n}\n.responsive-tabs__accordion-icon[_ngcontent-%COMP%]   svg[_ngcontent-%COMP%] {\n  width: 1rem;\n  height: 1rem;\n}\n.responsive-tabs__accordion-panels[_ngcontent-%COMP%] {\n  border: 3px solid var(--border-color);\n  border-top: none;\n  background-color: var(--bg-primary);\n  padding: 3rem;\n}\n.tab-panel[_ngcontent-%COMP%] {\n  display: none;\n  animation: _ngcontent-%COMP%_fadeIn 0.3s ease;\n}\n.tab-panel--active[_ngcontent-%COMP%] {\n  display: block;\n}\n@keyframes _ngcontent-%COMP%_fadeIn {\n  from {\n    opacity: 0;\n    transform: translateY(0.5rem);\n  }\n  to {\n    opacity: 1;\n    transform: translateY(0);\n  }\n}\n/*# sourceMappingURL=responsive-tabs.css.map */'] });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(ResponsiveTabs, [{
    type: Component,
    args: [{ selector: "app-responsive-tabs", standalone: true, imports: [CommonModule], template: `<div class="responsive-tabs">\r
  <!-- NAVEGACION TABS (Desktop) - Se oculta en movil via CSS -->\r
  <nav class="responsive-tabs__nav" role="tablist" #tabsNav>\r
    @for (tab of tabs(); track tab.id) {\r
      <button\r
        class="responsive-tabs__tab"\r
        [class.responsive-tabs__tab--active]="isActive(tab.id)"\r
        [class.responsive-tabs__tab--disabled]="tab.disabled"\r
        [attr.id]="'tab-' + tab.id"\r
        role="tab"\r
        [attr.aria-selected]="isActive(tab.id)"\r
        [attr.aria-controls]="'panel-' + tab.id"\r
        [attr.tabindex]="isActive(tab.id) ? 0 : -1"\r
        [disabled]="tab.disabled"\r
        (click)="selectTab(tab.id)"\r
        type="button">\r
        {{ tab.label }}\r
      </button>\r
    }\r
  </nav>\r
\r
  <!-- NAVEGACION ACCORDION (Movil) - Se oculta en desktop via CSS -->\r
  <div class="responsive-tabs__accordion-nav">\r
    @for (tab of tabs(); track tab.id; let i = $index) {\r
      <button\r
        class="responsive-tabs__accordion-header"\r
        [class.responsive-tabs__accordion-header--active]="isAccordionOpen(tab.id)"\r
        [class.responsive-tabs__accordion-header--disabled]="tab.disabled"\r
        [attr.aria-expanded]="isAccordionOpen(tab.id)"\r
        [attr.aria-controls]="'accordion-panel-' + tab.id"\r
        [disabled]="tab.disabled"\r
        (click)="toggleAccordion(tab.id)"\r
        type="button">\r
        <span class="responsive-tabs__accordion-title">\r
          <span class="responsive-tabs__accordion-number">{{ i + 1 }}.</span>\r
          {{ tab.label }}\r
        </span>\r
        <span class="responsive-tabs__accordion-icon"\r
              [class.responsive-tabs__accordion-icon--open]="isAccordionOpen(tab.id)">\r
          <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">\r
            <path d="M4 6l4 4 4-4" stroke="currentColor" stroke-width="2" fill="none"/>\r
          </svg>\r
        </span>\r
      </button>\r
    }\r
  </div>\r
\r
  <!-- CONTENIDO - Siempre presente, visibilidad controlada por TabPanel -->\r
  <div class="responsive-tabs__content">\r
    <ng-content></ng-content>\r
  </div>\r
</div>\r
`, styles: ['@charset "UTF-8";\n\n/* src/app/components/shared/tabs/responsive-tabs.scss */\n:host {\n  display: block;\n  width: 100%;\n  max-width: 100%;\n  min-width: 0;\n  display: block;\n  width: 100%;\n}\n.responsive-tabs {\n  width: 100%;\n  border: 3px solid var(--border-color);\n  border-radius: 5px;\n  background-color: var(--bg-primary);\n  box-shadow: 4px 4px 0px #01131B;\n  overflow: hidden;\n}\n.responsive-tabs--desktop {\n  display: block;\n}\n@media (max-width: 768px) {\n  .responsive-tabs--desktop {\n    display: none;\n  }\n}\n.responsive-tabs__nav {\n  display: flex;\n  flex-wrap: wrap;\n  background-color: var(--bg-secondary);\n  border-bottom: 2px solid var(--border-color);\n}\n.responsive-tabs__tab {\n  flex: 0 0 auto;\n  padding: 2rem 3rem;\n  border: none;\n  border-bottom: 3px solid transparent;\n  background-color: transparent;\n  color: var(--text-secondary);\n  font-family: "Space Grotesk", sans-serif;\n  font-size: 1rem;\n  font-weight: 600;\n  cursor: pointer;\n  transition: 150ms ease-in-out;\n  position: relative;\n  white-space: nowrap;\n  text-transform: uppercase;\n  letter-spacing: 0.05em;\n}\n.responsive-tabs__tab:hover:not(:disabled):not(.responsive-tabs__tab--active) {\n  background-color: var(--bg-tertiary);\n  color: var(--text-primary);\n}\n.responsive-tabs__tab:focus-visible {\n  outline: 3px solid var(--color-accent);\n  outline-offset: 2px;\n}\n.responsive-tabs__tab--active {\n  background-color: var(--bg-tertiary);\n  color: var(--color-primary);\n  font-weight: 800;\n  border-bottom-color: var(--color-primary);\n}\n.responsive-tabs__tab--disabled {\n  opacity: 0.4;\n  cursor: not-allowed;\n  pointer-events: none;\n}\n.responsive-tabs__content {\n  padding: 3rem;\n  min-height: 12rem;\n}\n.responsive-tabs--mobile {\n  display: none;\n}\n@media (max-width: 768px) {\n  .responsive-tabs--mobile {\n    display: block;\n  }\n}\n.responsive-tabs__accordion-item {\n  margin-bottom: 0;\n}\n.responsive-tabs__accordion-item:first-child .responsive-tabs__accordion-header {\n  border-top-left-radius: 5px;\n  border-top-right-radius: 5px;\n}\n.responsive-tabs__accordion-item:not(:first-child) .responsive-tabs__accordion-header {\n  border-top: none;\n}\n.responsive-tabs__accordion-header {\n  display: flex;\n  justify-content: space-between;\n  align-items: center;\n  width: 100%;\n  padding: 1rem 2rem;\n  font-family: "Space Grotesk", sans-serif;\n  font-size: 0.9375rem;\n  font-weight: 600;\n  text-align: left;\n  color: var(--text-primary);\n  background-color: var(--bg-secondary);\n  cursor: pointer;\n  transition: all 0.2s ease;\n  border: 3px solid var(--border-color);\n  text-transform: uppercase;\n  letter-spacing: 0.05em;\n}\n.responsive-tabs__accordion-header:hover:not(:disabled) {\n  background-color: var(--color-primary);\n  color: var(--text-dark);\n}\n.responsive-tabs__accordion-header:focus-visible {\n  outline: 3px solid var(--color-accent);\n  outline-offset: 2px;\n}\n.responsive-tabs__accordion-header--active {\n  background-color: var(--color-primary);\n  color: var(--text-dark);\n}\n.responsive-tabs__accordion-header--disabled {\n  opacity: 0.4;\n  cursor: not-allowed;\n  pointer-events: none;\n}\n.responsive-tabs__accordion-title {\n  flex: 1;\n  display: flex;\n  align-items: center;\n  gap: 0.5rem;\n}\n.responsive-tabs__accordion-number {\n  font-weight: 700;\n  opacity: 0.7;\n}\n.responsive-tabs__accordion-icon {\n  display: inline-flex;\n  align-items: center;\n  justify-content: center;\n  width: 1.5rem;\n  height: 1.5rem;\n  transition: transform 300ms ease-in-out;\n}\n.responsive-tabs__accordion-icon--open {\n  transform: rotate(180deg);\n}\n.responsive-tabs__accordion-icon svg {\n  width: 1rem;\n  height: 1rem;\n}\n.responsive-tabs__accordion-panels {\n  border: 3px solid var(--border-color);\n  border-top: none;\n  background-color: var(--bg-primary);\n  padding: 3rem;\n}\n.tab-panel {\n  display: none;\n  animation: fadeIn 0.3s ease;\n}\n.tab-panel--active {\n  display: block;\n}\n@keyframes fadeIn {\n  from {\n    opacity: 0;\n    transform: translateY(0.5rem);\n  }\n  to {\n    opacity: 1;\n    transform: translateY(0);\n  }\n}\n/*# sourceMappingURL=responsive-tabs.css.map */\n'] }]
  }], () => [], { tabPanels: [{
    type: ContentChildren,
    args: [TabPanel]
  }], tabsNav: [{
    type: ViewChild,
    args: ["tabsNav"]
  }], breakpoint: [{ type: Input, args: [{ isSignal: true, alias: "breakpoint", required: false }] }], initialActiveTab: [{ type: Input, args: [{ isSignal: true, alias: "initialActiveTab", required: false }] }], onResize: [{
    type: HostListener,
    args: ["window:resize"]
  }] });
})();
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(ResponsiveTabs, { className: "ResponsiveTabs", filePath: "src/app/components/shared/tabs/responsive-tabs.ts", lineNumber: 46 });
})();

// src/app/components/shared/tooltip/tooltip.ts
var _c04 = ["*"];
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
  }, inputs: { text: [1, "text"], position: [1, "position"], showDelay: [1, "showDelay"], hideDelay: [1, "hideDelay"] }, ngContentSelectors: _c04, decls: 3, vars: 1, consts: [[1, "tooltip-wrapper"], ["role", "tooltip", 1, "tooltip", 3, "tooltip--top", "tooltip--bottom", "tooltip--left", "tooltip--right"], ["role", "tooltip", 1, "tooltip"], [1, "tooltip__arrow"]], template: function Tooltip_Template(rf, ctx) {
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
  }, dependencies: [CommonModule], styles: ['@charset "UTF-8";\n\n\n\n.tooltip-wrapper[_ngcontent-%COMP%] {\n  position: relative;\n  display: inline-block;\n}\n.tooltip[_ngcontent-%COMP%] {\n  position: absolute;\n  z-index: 8;\n  padding: 1rem 2rem;\n  background-color: var(--bg-secondary);\n  color: var(--text-primary);\n  font-family: "Space Grotesk", sans-serif;\n  font-size: 0.875rem;\n  font-weight: 600;\n  line-height: 1.4;\n  border: 2px solid var(--border-color);\n  border-radius: 3px;\n  box-shadow: 4px 4px 0px var(--shadow-color);\n  white-space: nowrap;\n  pointer-events: none;\n  animation: _ngcontent-%COMP%_tooltipFadeIn 0.2s ease;\n}\n@keyframes _ngcontent-%COMP%_tooltipFadeIn {\n  from {\n    opacity: 0;\n    transform: scale(0.95);\n  }\n  to {\n    opacity: 1;\n    transform: scale(1);\n  }\n}\n.tooltip__arrow[_ngcontent-%COMP%] {\n  position: absolute;\n  width: 0;\n  height: 0;\n  border-style: solid;\n}\n.tooltip--top[_ngcontent-%COMP%] {\n  bottom: calc(100% + 8px);\n  left: 50%;\n  transform: translateX(-50%);\n}\n.tooltip--top[_ngcontent-%COMP%]   .tooltip__arrow[_ngcontent-%COMP%] {\n  top: 100%;\n  left: 50%;\n  transform: translateX(-50%);\n  border-width: 1.5rem 1.5rem 0 1.5rem;\n  border-color: var(--bg-secondary) transparent transparent transparent;\n}\n.tooltip--bottom[_ngcontent-%COMP%] {\n  top: calc(100% + 8px);\n  left: 50%;\n  transform: translateX(-50%);\n}\n.tooltip--bottom[_ngcontent-%COMP%]   .tooltip__arrow[_ngcontent-%COMP%] {\n  bottom: 100%;\n  left: 50%;\n  transform: translateX(-50%);\n  border-width: 0 6px 6px 6px;\n  border-color: transparent transparent var(--bg-secondary) transparent;\n}\n.tooltip--left[_ngcontent-%COMP%] {\n  right: calc(100% + 8px);\n  top: 50%;\n  transform: translateY(-50%);\n}\n.tooltip--left[_ngcontent-%COMP%]   .tooltip__arrow[_ngcontent-%COMP%] {\n  left: 100%;\n  top: 50%;\n  transform: translateY(-50%);\n  border-width: 1.5rem 0 1.5rem 1.5rem;\n  border-color: transparent transparent transparent var(--bg-secondary);\n}\n.tooltip--right[_ngcontent-%COMP%] {\n  left: calc(100% + 8px);\n  top: 50%;\n  transform: translateY(-50%);\n}\n.tooltip--right[_ngcontent-%COMP%]   .tooltip__arrow[_ngcontent-%COMP%] {\n  right: 100%;\n  top: 50%;\n  transform: translateY(-50%);\n  border-width: 1.5rem 1.5rem 1.5rem 0;\n  border-color: transparent var(--bg-secondary) transparent transparent;\n}\n@media (max-width: 320px) {\n  .tooltip[_ngcontent-%COMP%] {\n    white-space: normal;\n    max-width: calc(220px - 3rem);\n    font-size: 0.75rem;\n    padding: 0.5rem 1rem;\n  }\n}\n/*# sourceMappingURL=tooltip.css.map */'] });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(Tooltip, [{
    type: Component,
    args: [{ selector: "app-tooltip", imports: [CommonModule], template: `<div class="tooltip-wrapper">\r
  <!-- Contenido sobre el que se hace hover -->\r
  <ng-content></ng-content>\r
\r
  <!-- Tooltip flotante -->\r
  @if (isVisible()) {\r
  <div\r
    class="tooltip"\r
    [class.tooltip--top]="position() === 'top'"\r
    [class.tooltip--bottom]="position() === 'bottom'"\r
    [class.tooltip--left]="position() === 'left'"\r
    [class.tooltip--right]="position() === 'right'"\r
    role="tooltip">\r
    {{ text() }}\r
    \r
    <!-- Flecha del tooltip -->\r
    <div class="tooltip__arrow"></div>\r
  </div>\r
  }\r
</div>\r
`, styles: ['@charset "UTF-8";\n\n/* src/app/components/shared/tooltip/tooltip.scss */\n.tooltip-wrapper {\n  position: relative;\n  display: inline-block;\n}\n.tooltip {\n  position: absolute;\n  z-index: 8;\n  padding: 1rem 2rem;\n  background-color: var(--bg-secondary);\n  color: var(--text-primary);\n  font-family: "Space Grotesk", sans-serif;\n  font-size: 0.875rem;\n  font-weight: 600;\n  line-height: 1.4;\n  border: 2px solid var(--border-color);\n  border-radius: 3px;\n  box-shadow: 4px 4px 0px var(--shadow-color);\n  white-space: nowrap;\n  pointer-events: none;\n  animation: tooltipFadeIn 0.2s ease;\n}\n@keyframes tooltipFadeIn {\n  from {\n    opacity: 0;\n    transform: scale(0.95);\n  }\n  to {\n    opacity: 1;\n    transform: scale(1);\n  }\n}\n.tooltip__arrow {\n  position: absolute;\n  width: 0;\n  height: 0;\n  border-style: solid;\n}\n.tooltip--top {\n  bottom: calc(100% + 8px);\n  left: 50%;\n  transform: translateX(-50%);\n}\n.tooltip--top .tooltip__arrow {\n  top: 100%;\n  left: 50%;\n  transform: translateX(-50%);\n  border-width: 1.5rem 1.5rem 0 1.5rem;\n  border-color: var(--bg-secondary) transparent transparent transparent;\n}\n.tooltip--bottom {\n  top: calc(100% + 8px);\n  left: 50%;\n  transform: translateX(-50%);\n}\n.tooltip--bottom .tooltip__arrow {\n  bottom: 100%;\n  left: 50%;\n  transform: translateX(-50%);\n  border-width: 0 6px 6px 6px;\n  border-color: transparent transparent var(--bg-secondary) transparent;\n}\n.tooltip--left {\n  right: calc(100% + 8px);\n  top: 50%;\n  transform: translateY(-50%);\n}\n.tooltip--left .tooltip__arrow {\n  left: 100%;\n  top: 50%;\n  transform: translateY(-50%);\n  border-width: 1.5rem 0 1.5rem 1.5rem;\n  border-color: transparent transparent transparent var(--bg-secondary);\n}\n.tooltip--right {\n  left: calc(100% + 8px);\n  top: 50%;\n  transform: translateY(-50%);\n}\n.tooltip--right .tooltip__arrow {\n  right: 100%;\n  top: 50%;\n  transform: translateY(-50%);\n  border-width: 1.5rem 1.5rem 1.5rem 0;\n  border-color: transparent var(--bg-secondary) transparent transparent;\n}\n@media (max-width: 320px) {\n  .tooltip {\n    white-space: normal;\n    max-width: calc(220px - 3rem);\n    font-size: 0.75rem;\n    padding: 0.5rem 1rem;\n  }\n}\n/*# sourceMappingURL=tooltip.css.map */\n'] }]
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
var _c05 = ["demoCarousel"];
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
    \u0275\u0275element(175, "div", 44);
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
    \u0275\u0275element(184, "div", 45);
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
    \u0275\u0275element(193, "div", 46);
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
    \u0275\u0275element(202, "div", 44);
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
    \u0275\u0275elementStart(213, "div", 47)(214, "div", 30);
    \u0275\u0275element(215, "div", 48);
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
    \u0275\u0275element(224, "div", 49);
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
    \u0275\u0275element(233, "div", 50);
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
    \u0275\u0275element(242, "div", 51);
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
    \u0275\u0275element(251, "div", 52);
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
    \u0275\u0275elementStart(264, "div", 53)(265, "div", 54)(266, "div", 55);
    \u0275\u0275text(267, " Box ");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(268, "code");
    \u0275\u0275text(269, "brutal-xs");
    \u0275\u0275element(270, "br");
    \u0275\u0275text(271, "2px 2px 0px");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(272, "div", 54)(273, "div", 56);
    \u0275\u0275text(274, " Box ");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(275, "code");
    \u0275\u0275text(276, "brutal-s");
    \u0275\u0275element(277, "br");
    \u0275\u0275text(278, "4px 4px 0px");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(279, "div", 54)(280, "div", 57);
    \u0275\u0275text(281, " Box ");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(282, "code");
    \u0275\u0275text(283, "brutal-m");
    \u0275\u0275element(284, "br");
    \u0275\u0275text(285, "6px 6px 0px");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(286, "div", 54)(287, "div", 58);
    \u0275\u0275text(288, " Box ");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(289, "code");
    \u0275\u0275text(290, "brutal-l");
    \u0275\u0275element(291, "br");
    \u0275\u0275text(292, "8px 8px 0px");
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(293, "h4", 59);
    \u0275\u0275text(294, "Sombras Efecto Vinilo");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(295, "p", 13);
    \u0275\u0275text(296, " Sombras multicapa con colores de la paleta 70s, efecto 3D retro. ");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(297, "div", 53)(298, "div", 54)(299, "div", 60);
    \u0275\u0275text(300, " Box ");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(301, "code");
    \u0275\u0275text(302, "vinilo-s");
    \u0275\u0275element(303, "br");
    \u0275\u0275text(304, "2 capas");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(305, "div", 54)(306, "div", 61);
    \u0275\u0275text(307, " Box ");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(308, "code");
    \u0275\u0275text(309, "vinilo-m");
    \u0275\u0275element(310, "br");
    \u0275\u0275text(311, "3 capas");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(312, "div", 54)(313, "div", 62);
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
    \u0275\u0275elementStart(324, "div", 63)(325, "div", 64)(326, "div", 65);
    \u0275\u0275element(327, "div", 66);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(328, "div", 67)(329, "div", 68);
    \u0275\u0275text(330, "XS");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(331, "div", 69);
    \u0275\u0275text(332, "0.5rem (8px)");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(333, "code");
    \u0275\u0275text(334, "$espaciado-xs");
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(335, "div", 64)(336, "div", 65);
    \u0275\u0275element(337, "div", 70);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(338, "div", 67)(339, "div", 68);
    \u0275\u0275text(340, "S");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(341, "div", 69);
    \u0275\u0275text(342, "1rem (16px)");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(343, "code");
    \u0275\u0275text(344, "$espaciado-s");
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(345, "div", 64)(346, "div", 65);
    \u0275\u0275element(347, "div", 71);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(348, "div", 67)(349, "div", 68);
    \u0275\u0275text(350, "M");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(351, "div", 69);
    \u0275\u0275text(352, "2rem (32px)");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(353, "code");
    \u0275\u0275text(354, "$espaciado-m");
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(355, "div", 64)(356, "div", 65);
    \u0275\u0275element(357, "div", 72);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(358, "div", 67)(359, "div", 68);
    \u0275\u0275text(360, "L");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(361, "div", 69);
    \u0275\u0275text(362, "3rem (48px)");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(363, "code");
    \u0275\u0275text(364, "$espaciado-l");
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(365, "div", 64)(366, "div", 65);
    \u0275\u0275element(367, "div", 73);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(368, "div", 67)(369, "div", 68);
    \u0275\u0275text(370, "XL");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(371, "div", 69);
    \u0275\u0275text(372, "4rem (64px)");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(373, "code");
    \u0275\u0275text(374, "$espaciado-xl");
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(375, "div", 64)(376, "div", 65);
    \u0275\u0275element(377, "div", 74);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(378, "div", 67)(379, "div", 68);
    \u0275\u0275text(380, "XXL");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(381, "div", 69);
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
    \u0275\u0275elementStart(8, "div", 53)(9, "div", 75)(10, "app-button", 76);
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
    \u0275\u0275elementStart(14, "div", 75)(15, "app-button", 77);
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
    \u0275\u0275elementStart(19, "div", 75)(20, "app-button", 78);
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
    \u0275\u0275elementStart(24, "div", 75)(25, "app-button", 79);
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
    \u0275\u0275elementStart(32, "div", 53)(33, "div", 75)(34, "app-button", 80);
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
    \u0275\u0275elementStart(38, "div", 75)(39, "app-button", 81);
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
    \u0275\u0275elementStart(43, "div", 75)(44, "app-button", 82);
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
    \u0275\u0275elementStart(51, "div", 53)(52, "div", 75)(53, "app-button");
    \u0275\u0275text(54, "Normal");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(55, "code");
    \u0275\u0275text(56, "Estado por defecto");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(57, "div", 75)(58, "app-button", 83);
    \u0275\u0275text(59, "Disabled");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(60, "code");
    \u0275\u0275text(61, '[disabled]="true"');
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(62, "div", 75)(63, "app-button", 84);
    \u0275\u0275text(64, "Como enlace");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(65, "code");
    \u0275\u0275text(66, 'href="#"');
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(67, "div", 75)(68, "app-button", 85);
    \u0275\u0275text(69, "Loading");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(70, "code");
    \u0275\u0275text(71, '[loading]="true"');
    \u0275\u0275elementEnd()()()();
    \u0275\u0275elementStart(72, "div", 14)(73, "h3");
    \u0275\u0275text(74, "Botones - Full Width");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(75, "div", 86)(76, "div", 87)(77, "app-button", 88);
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
    \u0275\u0275elementStart(84, "div", 53)(85, "div", 75);
    \u0275\u0275element(86, "app-spinner", 89);
    \u0275\u0275elementStart(87, "code");
    \u0275\u0275text(88, 'size="sm"');
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(89, "div", 75);
    \u0275\u0275element(90, "app-spinner", 90);
    \u0275\u0275elementStart(91, "code");
    \u0275\u0275text(92, 'size="md"');
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(93, "div", 75);
    \u0275\u0275element(94, "app-spinner", 91);
    \u0275\u0275elementStart(95, "code");
    \u0275\u0275text(96, 'size="lg"');
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(97, "div", 92)(98, "div", 75);
    \u0275\u0275element(99, "app-spinner", 93);
    \u0275\u0275elementStart(100, "code");
    \u0275\u0275text(101, 'color="primary"');
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(102, "div", 75);
    \u0275\u0275element(103, "app-spinner", 94);
    \u0275\u0275elementStart(104, "code");
    \u0275\u0275text(105, 'color="secondary"');
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(106, "div", 95);
    \u0275\u0275element(107, "app-spinner", 96);
    \u0275\u0275elementStart(108, "code", 97);
    \u0275\u0275text(109, 'color="white"');
    \u0275\u0275elementEnd()()()();
    \u0275\u0275elementStart(110, "div", 14)(111, "h3");
    \u0275\u0275text(112, "Spinner Global");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(113, "p", 13);
    \u0275\u0275text(114, " El spinner global muestra un overlay sobre toda la aplicaci\xF3n. ");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(115, "div", 53)(116, "div", 75)(117, "app-button", 98);
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
    \u0275\u0275elementStart(124, "div", 86)(125, "div", 87);
    \u0275\u0275element(126, "app-progress-bar", 99);
    \u0275\u0275elementStart(127, "code");
    \u0275\u0275text(128, 'value="25" size="sm"');
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(129, "div", 87);
    \u0275\u0275element(130, "app-progress-bar", 100);
    \u0275\u0275elementStart(131, "code");
    \u0275\u0275text(132, 'value="50" size="md" showLabel');
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(133, "div", 87);
    \u0275\u0275element(134, "app-progress-bar", 101);
    \u0275\u0275elementStart(135, "code");
    \u0275\u0275text(136, 'value="75" size="lg" showLabel');
    \u0275\u0275elementEnd()()()();
    \u0275\u0275elementStart(137, "div", 14)(138, "h3");
    \u0275\u0275text(139, "Progress Bar - Variantes de Color");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(140, "div", 86)(141, "div", 87);
    \u0275\u0275element(142, "app-progress-bar", 102);
    \u0275\u0275elementStart(143, "code");
    \u0275\u0275text(144, 'variant="primary"');
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(145, "div", 87);
    \u0275\u0275element(146, "app-progress-bar", 103);
    \u0275\u0275elementStart(147, "code");
    \u0275\u0275text(148, 'variant="success"');
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(149, "div", 87);
    \u0275\u0275element(150, "app-progress-bar", 104);
    \u0275\u0275elementStart(151, "code");
    \u0275\u0275text(152, 'variant="warning"');
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(153, "div", 87);
    \u0275\u0275element(154, "app-progress-bar", 105);
    \u0275\u0275elementStart(155, "code");
    \u0275\u0275text(156, 'variant="error"');
    \u0275\u0275elementEnd()()()();
    \u0275\u0275elementStart(157, "div", 14)(158, "h3");
    \u0275\u0275text(159, "Progress Bar - Estados Especiales");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(160, "div", 86)(161, "div", 87);
    \u0275\u0275element(162, "app-progress-bar", 106);
    \u0275\u0275elementStart(163, "code");
    \u0275\u0275text(164, 'indeterminate="true" (animaci\xF3n continua)');
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(165, "div", 87);
    \u0275\u0275element(166, "app-progress-bar", 107);
    \u0275\u0275elementStart(167, "code");
    \u0275\u0275text(168, 'striped="true" (rayas animadas)');
    \u0275\u0275elementEnd()()()();
    \u0275\u0275elementStart(169, "div", 14)(170, "h3");
    \u0275\u0275text(171, "Demo Interactivo");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(172, "p", 13);
    \u0275\u0275text(173, " Simula una operaci\xF3n de carga con progreso. ");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(174, "div", 86)(175, "div", 87);
    \u0275\u0275element(176, "app-progress-bar", 108);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(177, "div", 92)(178, "div", 75)(179, "app-button", 109);
    \u0275\u0275listener("clicked", function StyleGuide_Conditional_28_Template_app_button_clicked_179_listener() {
      \u0275\u0275restoreView(_r1);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.startProgressDemo());
    });
    \u0275\u0275text(180);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(181, "div", 75)(182, "app-button", 110);
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
    \u0275\u0275elementStart(187, "div", 53)(188, "div", 75)(189, "app-badge", 111);
    \u0275\u0275text(190, "Primary");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(191, "code");
    \u0275\u0275text(192, 'variant="primary"');
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(193, "div", 75)(194, "app-badge", 112);
    \u0275\u0275text(195, "Secondary");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(196, "code");
    \u0275\u0275text(197, 'variant="secondary"');
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(198, "div", 75)(199, "app-badge", 113);
    \u0275\u0275text(200, "Success");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(201, "code");
    \u0275\u0275text(202, 'variant="success"');
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(203, "div", 75)(204, "app-badge", 114);
    \u0275\u0275text(205, "Warning");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(206, "code");
    \u0275\u0275text(207, 'variant="warning"');
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(208, "div", 75)(209, "app-badge", 115);
    \u0275\u0275text(210, "Error");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(211, "code");
    \u0275\u0275text(212, 'variant="error"');
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(213, "div", 75)(214, "app-badge", 116);
    \u0275\u0275text(215, "Info");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(216, "code");
    \u0275\u0275text(217, 'variant="info"');
    \u0275\u0275elementEnd()()()();
    \u0275\u0275elementStart(218, "div", 14)(219, "h3");
    \u0275\u0275text(220, "Badges - Tama\xF1os");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(221, "div", 53)(222, "div", 75)(223, "app-badge", 117);
    \u0275\u0275text(224, "Small");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(225, "code");
    \u0275\u0275text(226, 'size="sm"');
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(227, "div", 75)(228, "app-badge", 118);
    \u0275\u0275text(229, "Medium");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(230, "code");
    \u0275\u0275text(231, 'size="md"');
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(232, "div", 75)(233, "app-badge", 119);
    \u0275\u0275text(234, "Large");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(235, "code");
    \u0275\u0275text(236, 'size="lg"');
    \u0275\u0275elementEnd()()()();
    \u0275\u0275elementStart(237, "div", 14)(238, "h3");
    \u0275\u0275text(239, "Badges - Uso Pr\xE1ctico");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(240, "div", 53)(241, "div", 75)(242, "div", 120)(243, "app-badge", 111);
    \u0275\u0275text(244, "Rock");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(245, "app-badge", 112);
    \u0275\u0275text(246, "Jazz");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(247, "app-badge", 116);
    \u0275\u0275text(248, "Pop");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(249, "code");
    \u0275\u0275text(250, "G\xE9neros musicales");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(251, "div", 75)(252, "div", 121)(253, "span", 122);
    \u0275\u0275text(254, "Estado:");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(255, "app-badge", 113);
    \u0275\u0275text(256, "Disponible");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(257, "code");
    \u0275\u0275text(258, "Indicador de estado");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(259, "div", 75)(260, "div", 121)(261, "span", 122);
    \u0275\u0275text(262, "Notificaciones");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(263, "app-badge", 123);
    \u0275\u0275text(264, "5");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(265, "code");
    \u0275\u0275text(266, "Contador");
    \u0275\u0275elementEnd()()()();
    \u0275\u0275elementStart(267, "div", 14)(268, "h3");
    \u0275\u0275text(269, "Enlaces");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(270, "div", 53)(271, "div", 75)(272, "a", 124);
    \u0275\u0275text(273, "Enlace est\xE1ndar");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(274, "code");
    \u0275\u0275text(275, 'class="link"');
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(276, "div", 75)(277, "a", 125);
    \u0275\u0275text(278, "Enlace primario");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(279, "code");
    \u0275\u0275text(280, 'class="link link--primary"');
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(281, "div", 75)(282, "a", 126);
    \u0275\u0275text(283, "Enlace subrayado");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(284, "code");
    \u0275\u0275text(285, 'class="link link--underlined"');
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(286, "div", 75)(287, "a", 127);
    \u0275\u0275text(288, "Enlace con flecha \u2192");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(289, "code");
    \u0275\u0275text(290, 'class="link link--arrow"');
    \u0275\u0275elementEnd()()()();
    \u0275\u0275elementStart(291, "div", 14)(292, "h3");
    \u0275\u0275text(293, "Toggle Switch");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(294, "div", 53)(295, "div", 75)(296, "label", 128);
    \u0275\u0275element(297, "input", 129);
    \u0275\u0275elementStart(298, "span", 130);
    \u0275\u0275text(299, "Activar opci\xF3n");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(300, "code");
    \u0275\u0275text(301, "Toggle desactivado");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(302, "div", 75)(303, "label", 128);
    \u0275\u0275element(304, "input", 131);
    \u0275\u0275elementStart(305, "span", 130);
    \u0275\u0275text(306, "Opci\xF3n activada");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(307, "code");
    \u0275\u0275text(308, "Toggle activado");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(309, "div", 75)(310, "label", 132);
    \u0275\u0275element(311, "input", 133);
    \u0275\u0275elementStart(312, "span", 130);
    \u0275\u0275text(313, "Toggle deshabilitado");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(314, "code");
    \u0275\u0275text(315, "Toggle disabled");
    \u0275\u0275elementEnd()()()();
    \u0275\u0275elementStart(316, "div", 14)(317, "h3");
    \u0275\u0275text(318, "Checkbox");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(319, "div", 86)(320, "div", 75)(321, "label", 134);
    \u0275\u0275element(322, "input", 135);
    \u0275\u0275elementStart(323, "span", 136);
    \u0275\u0275text(324, "Opci\xF3n 1");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(325, "code");
    \u0275\u0275text(326, "Checkbox sin marcar");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(327, "div", 75)(328, "label", 134);
    \u0275\u0275element(329, "input", 137);
    \u0275\u0275elementStart(330, "span", 136);
    \u0275\u0275text(331, "Opci\xF3n 2 (marcada)");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(332, "code");
    \u0275\u0275text(333, "Checkbox marcado");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(334, "div", 75)(335, "label", 138);
    \u0275\u0275element(336, "input", 139);
    \u0275\u0275elementStart(337, "span", 136);
    \u0275\u0275text(338, "Opci\xF3n deshabilitada");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(339, "code");
    \u0275\u0275text(340, "Checkbox disabled");
    \u0275\u0275elementEnd()()()();
    \u0275\u0275elementStart(341, "div", 14)(342, "h3");
    \u0275\u0275text(343, "Radio Buttons");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(344, "div", 86)(345, "div", 75)(346, "label", 140);
    \u0275\u0275element(347, "input", 141);
    \u0275\u0275elementStart(348, "span", 142);
    \u0275\u0275text(349, "Opci\xF3n A (seleccionada)");
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(350, "div", 75)(351, "label", 140);
    \u0275\u0275element(352, "input", 143);
    \u0275\u0275elementStart(353, "span", 142);
    \u0275\u0275text(354, "Opci\xF3n B");
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(355, "div", 75)(356, "label", 140);
    \u0275\u0275element(357, "input", 143);
    \u0275\u0275elementStart(358, "span", 142);
    \u0275\u0275text(359, "Opci\xF3n C");
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(360, "div", 75)(361, "label", 144);
    \u0275\u0275element(362, "input", 145);
    \u0275\u0275elementStart(363, "span", 142);
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
    \u0275\u0275elementStart(8, "div", 146)(9, "div", 75);
    \u0275\u0275element(10, "app-form-input", 147);
    \u0275\u0275elementStart(11, "code");
    \u0275\u0275text(12, "Input normal con ayuda");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(13, "div", 75);
    \u0275\u0275element(14, "app-form-input", 148);
    \u0275\u0275elementStart(15, "code");
    \u0275\u0275text(16, "Input con error (campo requerido vac\xEDo)");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(17, "div", 75);
    \u0275\u0275element(18, "app-form-input", 149);
    \u0275\u0275elementStart(19, "code");
    \u0275\u0275text(20, "Input con \xE9xito (campo v\xE1lido)");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(21, "div", 75);
    \u0275\u0275element(22, "app-form-input", 150);
    \u0275\u0275elementStart(23, "code");
    \u0275\u0275text(24, "Input deshabilitado");
    \u0275\u0275elementEnd()()()();
    \u0275\u0275elementStart(25, "div", 14)(26, "h3");
    \u0275\u0275text(27, "Input - Tipos");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(28, "div", 146)(29, "div", 75);
    \u0275\u0275element(30, "app-form-input", 151);
    \u0275\u0275elementStart(31, "code");
    \u0275\u0275text(32, 'type="text"');
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(33, "div", 75);
    \u0275\u0275element(34, "app-form-input", 152);
    \u0275\u0275elementStart(35, "code");
    \u0275\u0275text(36, 'type="email"');
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(37, "div", 75);
    \u0275\u0275element(38, "app-form-input", 153);
    \u0275\u0275elementStart(39, "code");
    \u0275\u0275text(40, 'type="password"');
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(41, "div", 75);
    \u0275\u0275element(42, "app-form-input", 154);
    \u0275\u0275elementStart(43, "code");
    \u0275\u0275text(44, 'type="number"');
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(45, "div", 75);
    \u0275\u0275element(46, "app-form-input", 155);
    \u0275\u0275elementStart(47, "code");
    \u0275\u0275text(48, 'type="tel"');
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(49, "div", 75);
    \u0275\u0275element(50, "app-form-input", 156);
    \u0275\u0275elementStart(51, "code");
    \u0275\u0275text(52, 'type="date"');
    \u0275\u0275elementEnd()()()();
    \u0275\u0275elementStart(53, "div", 14)(54, "h3");
    \u0275\u0275text(55, "Cards - Variante Polaroid");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(56, "div", 157)(57, "div", 158);
    \u0275\u0275element(58, "app-card", 159);
    \u0275\u0275elementStart(59, "code");
    \u0275\u0275text(60, "\xC1lbum con placeholder");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(61, "div", 158);
    \u0275\u0275element(62, "app-card", 160);
    \u0275\u0275elementStart(63, "code");
    \u0275\u0275text(64, "Canci\xF3n (circular)");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(65, "div", 158);
    \u0275\u0275element(66, "app-card", 161);
    \u0275\u0275elementStart(67, "code");
    \u0275\u0275text(68, "Efecto vinilo");
    \u0275\u0275elementEnd()()()();
    \u0275\u0275elementStart(69, "div", 14)(70, "h3");
    \u0275\u0275text(71, "Cards - Variante Profile");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(72, "h4", 162);
    \u0275\u0275text(73, "Layout Vertical");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(74, "div", 53)(75, "div", 75);
    \u0275\u0275element(76, "app-card", 163);
    \u0275\u0275elementStart(77, "code");
    \u0275\u0275text(78, "Perfil vertical con g\xE9neros");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(79, "div", 75);
    \u0275\u0275element(80, "app-card", 164);
    \u0275\u0275elementStart(81, "code");
    \u0275\u0275text(82, "\xC1lbum con badges y acciones");
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(83, "h4", 165);
    \u0275\u0275text(84, "Layout Horizontal (Responsive)");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(85, "div", 86)(86, "div", 87);
    \u0275\u0275element(87, "app-card", 166);
    \u0275\u0275elementStart(88, "code");
    \u0275\u0275text(89, "Card horizontal con m\xFAltiples badges y acciones (se vuelve vertical en m\xF3vil)");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(90, "div", 87);
    \u0275\u0275element(91, "app-card", 167);
    \u0275\u0275elementStart(92, "code");
    \u0275\u0275text(93, "Card horizontal con efecto vinilo");
    \u0275\u0275elementEnd()()()();
    \u0275\u0275elementStart(94, "div", 14)(95, "h3");
    \u0275\u0275text(96, "Textarea");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(97, "div", 146)(98, "div", 75);
    \u0275\u0275element(99, "app-form-textarea", 168);
    \u0275\u0275elementStart(100, "code");
    \u0275\u0275text(101, "Textarea normal");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(102, "div", 75);
    \u0275\u0275element(103, "app-form-textarea", 169);
    \u0275\u0275elementStart(104, "code");
    \u0275\u0275text(105, "Textarea con error");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(106, "div", 75);
    \u0275\u0275element(107, "app-form-textarea", 170);
    \u0275\u0275elementStart(108, "code");
    \u0275\u0275text(109, "Textarea deshabilitado");
    \u0275\u0275elementEnd()()()();
    \u0275\u0275elementStart(110, "div", 14)(111, "h3");
    \u0275\u0275text(112, "Select");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(113, "div", 146)(114, "div", 75);
    \u0275\u0275element(115, "app-form-select", 171);
    \u0275\u0275elementStart(116, "code");
    \u0275\u0275text(117, "Select normal");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(118, "div", 75);
    \u0275\u0275element(119, "app-form-select", 172);
    \u0275\u0275elementStart(120, "code");
    \u0275\u0275text(121, "Select con error");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(122, "div", 75);
    \u0275\u0275element(123, "app-form-select", 173);
    \u0275\u0275elementStart(124, "code");
    \u0275\u0275text(125, "Select deshabilitado");
    \u0275\u0275elementEnd()()()();
    \u0275\u0275elementStart(126, "div", 14)(127, "h3");
    \u0275\u0275text(128, "Checkbox");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(129, "div", 146)(130, "div", 75);
    \u0275\u0275element(131, "app-form-checkbox", 174);
    \u0275\u0275elementStart(132, "code");
    \u0275\u0275text(133, "Checkbox normal");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(134, "div", 75);
    \u0275\u0275element(135, "app-form-checkbox", 175);
    \u0275\u0275elementStart(136, "code");
    \u0275\u0275text(137, "Checkbox con error");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(138, "div", 75);
    \u0275\u0275element(139, "app-form-checkbox", 176);
    \u0275\u0275elementStart(140, "code");
    \u0275\u0275text(141, "Checkbox deshabilitado");
    \u0275\u0275elementEnd()()()();
    \u0275\u0275elementStart(142, "div", 14)(143, "h3");
    \u0275\u0275text(144, "Radio Group");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(145, "div", 146)(146, "div", 75);
    \u0275\u0275element(147, "app-form-radio-group", 177);
    \u0275\u0275elementStart(148, "code");
    \u0275\u0275text(149, "Radio group normal");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(150, "div", 75);
    \u0275\u0275element(151, "app-form-radio-group", 178);
    \u0275\u0275elementStart(152, "code");
    \u0275\u0275text(153, "Radio group con error");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(154, "div", 75);
    \u0275\u0275element(155, "app-form-radio-group", 179);
    \u0275\u0275elementStart(156, "code");
    \u0275\u0275text(157, "Radio group inline");
    \u0275\u0275elementEnd()()()();
    \u0275\u0275elementStart(158, "div", 14)(159, "h3");
    \u0275\u0275text(160, "Breadcrumbs");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(161, "div", 86)(162, "div", 87);
    \u0275\u0275element(163, "app-breadcrumbs", 180);
    \u0275\u0275elementStart(164, "code");
    \u0275\u0275text(165, "Breadcrumbs simple");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(166, "div", 87);
    \u0275\u0275element(167, "app-breadcrumbs", 180);
    \u0275\u0275elementStart(168, "code");
    \u0275\u0275text(169, "Breadcrumbs con iconos");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(170, "div", 87);
    \u0275\u0275element(171, "app-breadcrumbs", 180);
    \u0275\u0275elementStart(172, "code");
    \u0275\u0275text(173, "Breadcrumbs largo (con truncado en m\xF3vil)");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(174, "div", 87);
    \u0275\u0275element(175, "app-breadcrumbs", 181);
    \u0275\u0275elementStart(176, "code");
    \u0275\u0275text(177, "Breadcrumbs con separador custom (\u203A)");
    \u0275\u0275elementEnd()()()();
    \u0275\u0275elementStart(178, "div", 14)(179, "h3");
    \u0275\u0275text(180, "Alerts");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(181, "div", 86)(182, "div", 87);
    \u0275\u0275element(183, "app-alert", 182);
    \u0275\u0275elementStart(184, "code");
    \u0275\u0275text(185, "Alert de \xE9xito");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(186, "div", 87);
    \u0275\u0275element(187, "app-alert", 183);
    \u0275\u0275elementStart(188, "code");
    \u0275\u0275text(189, "Alert de error");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(190, "div", 87);
    \u0275\u0275element(191, "app-alert", 184);
    \u0275\u0275elementStart(192, "code");
    \u0275\u0275text(193, "Alert de advertencia");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(194, "div", 87);
    \u0275\u0275element(195, "app-alert", 185);
    \u0275\u0275elementStart(196, "code");
    \u0275\u0275text(197, "Alert de informaci\xF3n");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(198, "div", 87);
    \u0275\u0275element(199, "app-alert", 186);
    \u0275\u0275elementStart(200, "code");
    \u0275\u0275text(201, "Alert con bot\xF3n cerrar");
    \u0275\u0275elementEnd()()()();
    \u0275\u0275elementStart(202, "div", 14)(203, "h3");
    \u0275\u0275text(204, "Tooltip - Posiciones");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(205, "div", 187)(206, "div", 75)(207, "app-tooltip", 188)(208, "app-button");
    \u0275\u0275text(209, "Top");
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(210, "div", 75)(211, "app-tooltip", 189)(212, "app-button");
    \u0275\u0275text(213, "Bottom");
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(214, "div", 75)(215, "app-tooltip", 190)(216, "app-button");
    \u0275\u0275text(217, "Left");
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(218, "div", 75)(219, "app-tooltip", 191)(220, "app-button");
    \u0275\u0275text(221, "Right");
    \u0275\u0275elementEnd()()()()()();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275advance(14);
    \u0275\u0275property("control", ctx_r1.demoInputErrorControl)("required", true);
    \u0275\u0275advance(4);
    \u0275\u0275property("control", ctx_r1.demoInputSuccessControl)("required", true);
    \u0275\u0275advance(4);
    \u0275\u0275property("disabled", true);
    \u0275\u0275advance(54);
    \u0275\u0275property("badges", ctx_r1.userGenres)("actions", ctx_r1.profileActions);
    \u0275\u0275advance(4);
    \u0275\u0275property("badges", \u0275\u0275pureFunction0(31, _c12))("actions", ctx_r1.profileActions.slice(0, 2));
    \u0275\u0275advance(7);
    \u0275\u0275property("badges", \u0275\u0275pureFunction0(32, _c2))("actions", ctx_r1.profileActions);
    \u0275\u0275advance(4);
    \u0275\u0275property("badges", \u0275\u0275pureFunction0(33, _c3))("actions", ctx_r1.profileActions.slice(0, 2));
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
function StyleGuide_Conditional_30_app_card_139_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275element(0, "app-card", 215);
  }
  if (rf & 2) {
    const album_r4 = ctx.$implicit;
    \u0275\u0275property("title", album_r4.title)("subtitle", album_r4.artist + " \u2022 " + album_r4.year);
  }
}
function StyleGuide_Conditional_30_app_card_144_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275element(0, "app-card", 216);
  }
  if (rf & 2) {
    const song_r5 = ctx.$implicit;
    \u0275\u0275property("title", song_r5.title)("subtitle", song_r5.artist);
  }
}
function StyleGuide_Conditional_30_app_card_157_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275element(0, "app-card", 215);
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
    \u0275\u0275elementStart(10, "div", 53)(11, "div", 75)(12, "app-button", 192);
    \u0275\u0275listener("click", function StyleGuide_Conditional_30_Template_app_button_click_12_listener() {
      \u0275\u0275restoreView(_r3);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.showToast("success"));
    });
    \u0275\u0275text(13, " Notificaci\xF3n de \xE9xito ");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(14, "div", 75)(15, "app-button", 193);
    \u0275\u0275listener("click", function StyleGuide_Conditional_30_Template_app_button_click_15_listener() {
      \u0275\u0275restoreView(_r3);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.showToast("error"));
    });
    \u0275\u0275text(16, " Notificaci\xF3n de error ");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(17, "div", 75)(18, "app-button", 194);
    \u0275\u0275listener("click", function StyleGuide_Conditional_30_Template_app_button_click_18_listener() {
      \u0275\u0275restoreView(_r3);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.showToast("warning"));
    });
    \u0275\u0275text(19, " Notificaci\xF3n de advertencia ");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(20, "div", 75)(21, "app-button", 195);
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
    \u0275\u0275elementStart(34, "div", 53)(35, "div", 75)(36, "app-button", 192);
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
    \u0275\u0275elementStart(40, "div", 75)(41, "app-button", 193);
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
    \u0275\u0275elementStart(46, "div", 86)(47, "div", 196);
    \u0275\u0275element(48, "app-login-form");
    \u0275\u0275elementStart(49, "code");
    \u0275\u0275text(50, "Formulario de inicio de sesi\xF3n con validaci\xF3n");
    \u0275\u0275elementEnd()()()();
    \u0275\u0275elementStart(51, "div", 14)(52, "h3");
    \u0275\u0275text(53, "Formulario de Registro");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(54, "div", 86)(55, "div", 196);
    \u0275\u0275element(56, "app-register-form");
    \u0275\u0275elementStart(57, "code");
    \u0275\u0275text(58, "Formulario de registro con validaci\xF3n completa");
    \u0275\u0275elementEnd()()()();
    \u0275\u0275elementStart(59, "div", 14)(60, "h3");
    \u0275\u0275text(61, "Formulario de Recuperaci\xF3n de Contrase\xF1a");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(62, "div", 86)(63, "div", 196);
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
    \u0275\u0275elementStart(72, "div", 53)(73, "div", 75)(74, "app-button", 98);
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
    \u0275\u0275elementStart(78, "app-modal", 197);
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
    \u0275\u0275elementStart(83, "div", 198)(84, "app-button", 79);
    \u0275\u0275listener("clicked", function StyleGuide_Conditional_30_Template_app_button_clicked_84_listener() {
      \u0275\u0275restoreView(_r3);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.closeModal());
    });
    \u0275\u0275text(85, " Eliminar ");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(86, "app-button", 77);
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
    \u0275\u0275elementStart(93, "div", 86)(94, "div", 87);
    \u0275\u0275element(95, "app-accordion", 199);
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(96, "div", 14)(97, "h3");
    \u0275\u0275text(98, "Accordion - Modo Multiple");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(99, "div", 86)(100, "div", 87);
    \u0275\u0275element(101, "app-accordion", 200);
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(102, "div", 14)(103, "h3");
    \u0275\u0275text(104, "Responsive Tabs (Pesta\xF1as Adaptativas)");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(105, "p", 13);
    \u0275\u0275text(106, " Tabs en desktop que se convierten en accordion en m\xF3vil. Navegaci\xF3n por teclado y dise\xF1o neobrutalista. ");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(107, "div", 86)(108, "div", 87)(109, "app-responsive-tabs", 201)(110, "app-tab-panel", 202)(111, "h4");
    \u0275\u0275text(112, "Descripci\xF3n del Producto");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(113, "p");
    \u0275\u0275text(114, "Este es el contenido de la pesta\xF1a de descripci\xF3n. Las tabs se adaptan autom\xE1ticamente al tama\xF1o de pantalla.");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(115, "app-tab-panel", 203)(116, "h4");
    \u0275\u0275text(117, "Especificaciones T\xE9cnicas");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(118, "ul")(119, "li");
    \u0275\u0275text(120, "Caracter\xEDstica 1: Responsive design");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(121, "li");
    \u0275\u0275text(122, "Caracter\xEDstica 2: Accordion en m\xF3vil");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(123, "li");
    \u0275\u0275text(124, "Caracter\xEDstica 3: Navegaci\xF3n por teclado");
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(125, "app-tab-panel", 204)(126, "h4");
    \u0275\u0275text(127, "Rese\xF1as de Usuarios");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(128, "p");
    \u0275\u0275text(129, "Aqu\xED aparecer\xEDan las rese\xF1as de los usuarios sobre el producto.");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(130, "app-tab-panel", 205)(131, "h4");
    \u0275\u0275text(132, "Informaci\xF3n de Soporte");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(133, "p");
    \u0275\u0275text(134, "Contacta con nuestro equipo de soporte para cualquier consulta.");
    \u0275\u0275elementEnd()()()()()();
    \u0275\u0275elementStart(135, "div", 14)(136, "h3");
    \u0275\u0275text(137, "Carrusel de \xC1lbumes");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(138, "app-carousel", 206);
    \u0275\u0275template(139, StyleGuide_Conditional_30_app_card_139_Template, 1, 2, "app-card", 207);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(140, "div", 14)(141, "h3");
    \u0275\u0275text(142, "Carrusel de Canciones");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(143, "app-carousel", 208);
    \u0275\u0275template(144, StyleGuide_Conditional_30_app_card_144_Template, 1, 2, "app-card", 209);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(145, "div", 14)(146, "h3");
    \u0275\u0275text(147, "Manipulaci\xF3n de Estilos Din\xE1micos (DOM)");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(148, "p", 13);
    \u0275\u0275text(149, " Este carousel demuestra manipulaci\xF3n directa del DOM modificando estilos con ");
    \u0275\u0275elementStart(150, "code");
    \u0275\u0275text(151, "nativeElement.style");
    \u0275\u0275elementEnd();
    \u0275\u0275text(152, ". ");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(153, "div", 86)(154, "div", 87)(155, "app-carousel", 210, 0);
    \u0275\u0275template(157, StyleGuide_Conditional_30_app_card_157_Template, 1, 2, "app-card", 207);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(158, "div", 211)(159, "app-button", 212);
    \u0275\u0275listener("click", function StyleGuide_Conditional_30_Template_app_button_click_159_listener() {
      \u0275\u0275restoreView(_r3);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.toggleCarouselHighlight());
    });
    \u0275\u0275text(160, " Toggle Highlight (boxShadow + border) ");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(161, "label", 213)(162, "span");
    \u0275\u0275text(163, "Opacidad:");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(164, "input", 214);
    \u0275\u0275listener("input", function StyleGuide_Conditional_30_Template_input_input_164_listener($event) {
      \u0275\u0275restoreView(_r3);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.updateCarouselOpacity($event));
    });
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(165, "span");
    \u0275\u0275text(166);
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(167, "code");
    \u0275\u0275text(168, "Modifica: boxShadow, border, opacity con nativeElement.style");
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
    \u0275\u0275property("breakpoint", 768);
    \u0275\u0275advance(30);
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
    \u0275\u0275elementStart(10, "div", 146)(11, "div", 217)(12, "div", 218);
    \u0275\u0275namespaceSVG();
    \u0275\u0275elementStart(13, "svg", 219);
    \u0275\u0275element(14, "rect", 220)(15, "line", 221);
    \u0275\u0275elementEnd();
    \u0275\u0275namespaceHTML();
    \u0275\u0275elementStart(16, "span", 222);
    \u0275\u0275text(17, "app-header");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(18, "p", 223);
    \u0275\u0275text(19, "Cabecera con logo central, franjas 70s y botones de autenticaci\xF3n.");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(20, "div", 224)(21, "code");
    \u0275\u0275text(22, "--header-bg");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(23, "code");
    \u0275\u0275text(24, "$borde-brutal-thick");
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(25, "div", 217)(26, "div", 218);
    \u0275\u0275namespaceSVG();
    \u0275\u0275elementStart(27, "svg", 219);
    \u0275\u0275element(28, "line", 225)(29, "line", 226)(30, "line", 227);
    \u0275\u0275elementEnd();
    \u0275\u0275namespaceHTML();
    \u0275\u0275elementStart(31, "span", 222);
    \u0275\u0275text(32, "main-nav");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(33, "p", 223);
    \u0275\u0275text(34, "Barra de navegaci\xF3n sticky con enlaces y toggle de tema.");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(35, "div", 224)(36, "code");
    \u0275\u0275text(37, "--nav-bg");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(38, "code");
    \u0275\u0275text(39, "$z-nav");
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(40, "div", 217)(41, "div", 218);
    \u0275\u0275namespaceSVG();
    \u0275\u0275elementStart(42, "svg", 219);
    \u0275\u0275element(43, "rect", 220)(44, "line", 228);
    \u0275\u0275elementEnd();
    \u0275\u0275namespaceHTML();
    \u0275\u0275elementStart(45, "span", 222);
    \u0275\u0275text(46, "app-footer");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(47, "p", 223);
    \u0275\u0275text(48, "Pie de p\xE1gina sim\xE9trico con logo central y botones de navegaci\xF3n.");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(49, "div", 224)(50, "code");
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
    \u0275\u0275elementStart(62, "div", 229)(63, "div", 230);
    \u0275\u0275element(64, "app-card", 231);
    \u0275\u0275elementStart(65, "code", 232);
    \u0275\u0275text(66, "$breakpoint-mobile");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(67, "div", 230);
    \u0275\u0275element(68, "app-card", 233);
    \u0275\u0275elementStart(69, "code", 232);
    \u0275\u0275text(70, "$breakpoint-tablet");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(71, "div", 230);
    \u0275\u0275element(72, "app-card", 234);
    \u0275\u0275elementStart(73, "code", 232);
    \u0275\u0275text(74, "$breakpoint-desktop");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(75, "div", 230);
    \u0275\u0275element(76, "app-card", 235);
    \u0275\u0275elementStart(77, "code", 232);
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
    \u0275\u0275elementStart(87, "div", 236)(88, "div", 237)(89, "span", 238);
    \u0275\u0275text(90, "10");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(91, "span", 239);
    \u0275\u0275text(92, "$z-spinner");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(93, "span", 240);
    \u0275\u0275text(94, "Loading global");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(95, "div", 241)(96, "span", 238);
    \u0275\u0275text(97, "9");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(98, "span", 239);
    \u0275\u0275text(99, "$z-notification");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(100, "span", 240);
    \u0275\u0275text(101, "Toast notifications");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(102, "div", 242)(103, "span", 238);
    \u0275\u0275text(104, "8");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(105, "span", 239);
    \u0275\u0275text(106, "$z-tooltip");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(107, "span", 240);
    \u0275\u0275text(108, "Tooltips");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(109, "div", 243)(110, "span", 238);
    \u0275\u0275text(111, "7");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(112, "span", 239);
    \u0275\u0275text(113, "$z-popover");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(114, "span", 240);
    \u0275\u0275text(115, "Dropdowns, popovers");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(116, "div", 244)(117, "span", 238);
    \u0275\u0275text(118, "6");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(119, "span", 239);
    \u0275\u0275text(120, "$z-modal");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(121, "span", 240);
    \u0275\u0275text(122, "Modales");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(123, "div", 245)(124, "span", 238);
    \u0275\u0275text(125, "5");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(126, "span", 239);
    \u0275\u0275text(127, "$z-overlay");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(128, "span", 240);
    \u0275\u0275text(129, "Backdrops");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(130, "div", 246)(131, "span", 238);
    \u0275\u0275text(132, "4");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(133, "span", 239);
    \u0275\u0275text(134, "$z-nav");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(135, "span", 240);
    \u0275\u0275text(136, "Navegaci\xF3n principal");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(137, "div", 247)(138, "span", 238);
    \u0275\u0275text(139, "3");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(140, "span", 239);
    \u0275\u0275text(141, "$z-fixed");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(142, "span", 240);
    \u0275\u0275text(143, "Sidebar, alertas fijas");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(144, "div", 248)(145, "span", 238);
    \u0275\u0275text(146, "2");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(147, "span", 239);
    \u0275\u0275text(148, "$z-sticky");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(149, "span", 240);
    \u0275\u0275text(150, "Elementos sticky");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(151, "div", 249)(152, "span", 238);
    \u0275\u0275text(153, "1");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(154, "span", 239);
    \u0275\u0275text(155, "$z-dropdown");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(156, "span", 240);
    \u0275\u0275text(157, "Dropdowns simples");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(158, "div", 250)(159, "span", 238);
    \u0275\u0275text(160, "0");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(161, "span", 239);
    \u0275\u0275text(162, "$z-base");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(163, "span", 240);
    \u0275\u0275text(164, "Contenido base");
    \u0275\u0275elementEnd()()()();
    \u0275\u0275elementStart(165, "div", 14)(166, "h3");
    \u0275\u0275text(167, "Variables CSS del Layout");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(168, "p", 13);
    \u0275\u0275text(169, " Variables CSS personalizadas que controlan el tema y se heredan en todos los componentes de layout. ");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(170, "div", 146)(171, "div", 251)(172, "span", 252);
    \u0275\u0275text(173, "--bg-primary");
    \u0275\u0275elementEnd();
    \u0275\u0275element(174, "div", 253);
    \u0275\u0275elementStart(175, "span", 254);
    \u0275\u0275text(176, "Fondo principal");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(177, "div", 251)(178, "span", 252);
    \u0275\u0275text(179, "--bg-secondary");
    \u0275\u0275elementEnd();
    \u0275\u0275element(180, "div", 255);
    \u0275\u0275elementStart(181, "span", 254);
    \u0275\u0275text(182, "Fondo secundario");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(183, "div", 251)(184, "span", 252);
    \u0275\u0275text(185, "--header-bg");
    \u0275\u0275elementEnd();
    \u0275\u0275element(186, "div", 256);
    \u0275\u0275elementStart(187, "span", 254);
    \u0275\u0275text(188, "Fondo del header");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(189, "div", 251)(190, "span", 252);
    \u0275\u0275text(191, "--nav-bg");
    \u0275\u0275elementEnd();
    \u0275\u0275element(192, "div", 257);
    \u0275\u0275elementStart(193, "span", 254);
    \u0275\u0275text(194, "Fondo de navegaci\xF3n");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(195, "div", 251)(196, "span", 252);
    \u0275\u0275text(197, "--color-primary");
    \u0275\u0275elementEnd();
    \u0275\u0275element(198, "div", 258);
    \u0275\u0275elementStart(199, "span", 254);
    \u0275\u0275text(200, "Color de acci\xF3n principal");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(201, "div", 251)(202, "span", 252);
    \u0275\u0275text(203, "--shadow-color");
    \u0275\u0275elementEnd();
    \u0275\u0275element(204, "div", 259);
    \u0275\u0275elementStart(205, "span", 254);
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
    \u0275\u0275elementStart(0, "app-notification", 260);
    \u0275\u0275listener("dismissed", function StyleGuide_For_33_Template_app_notification_dismissed_0_listener() {
      const notification_r8 = \u0275\u0275restoreView(_r7).$implicit;
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.removeStaticNotification(notification_r8.id));
    });
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const notification_r8 = ctx.$implicit;
    const \u0275$index_2313_r9 = ctx.$index;
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275property("type", notification_r8.type)("title", notification_r8.title)("message", notification_r8.message)("stackIndex", \u0275$index_2313_r9)("getHeightAt", ctx_r1.getNotificationHeight)("autoDismiss", true)("duration", 5e3);
  }
}
var StyleGuide = class _StyleGuide {
  // Inyectar servicios
  notificationService = inject(NotificationService);
  loadingService = inject(LoadingService);
  styleGuideNav = inject(StyleGuideNavigationService);
  // FormControls para demostración de inputs
  demoInputControl = new FormControl("");
  demoInputErrorControl = new FormControl("", [Validators.required]);
  demoInputSuccessControl = new FormControl("valor-v\xE1lido", [Validators.required]);
  constructor() {
    this.demoInputErrorControl.markAsTouched();
    this.demoInputSuccessControl.markAsTouched();
  }
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
      \u0275\u0275viewQuery(_c05, 5);
      \u0275\u0275viewQuery(Notification, 5);
    }
    if (rf & 2) {
      let _t;
      \u0275\u0275queryRefresh(_t = \u0275\u0275loadQuery()) && (ctx.demoCarousel = _t.first);
      \u0275\u0275queryRefresh(_t = \u0275\u0275loadQuery()) && (ctx.notificationComponents = _t);
    }
  }, decls: 34, vars: 18, consts: [["demoCarousel", ""], [1, "style-guide"], [1, "style-guide__sidebar"], ["aria-haspopup", "menu", "aria-label", "Men\xFA de secciones de la gu\xEDa de estilos", 1, "style-guide__sidebar-toggle", 3, "click"], ["aria-hidden", "true", 1, "style-guide__sidebar-icon"], ["role", "menu", 1, "style-guide__sidebar-menu"], ["role", "none", 1, "style-guide__sidebar-item"], ["type", "button", "role", "menuitem", 1, "style-guide__sidebar-link", 3, "click"], [1, "style-guide__container"], [1, "style-guide__header"], [1, "style-guide__intro"], [1, "style-guide__section"], ["position", "top-right", 3, "type", "title", "message", "stackIndex", "getHeightAt", "autoDismiss", "duration"], [1, "showcase__description"], [1, "showcase"], [1, "font-showcase"], [1, "font-showcase__header"], [1, "font-showcase__tag"], [1, "font-showcase__samples", 2, "font-family", "'Space Grotesk', sans-serif"], [1, "font-showcase__sample"], [1, "font-showcase__label"], [1, "text-small"], [1, "font-showcase__usage"], [1, "font-showcase__tag", "font-showcase__tag--accent"], [1, "font-showcase__samples", 2, "font-family", "'Monoton', cursive"], [1, "monoton-sample", "monoton-sample--lg"], [1, "monoton-sample", "monoton-sample--md"], [1, "monoton-sample", "monoton-sample--sm"], [1, "color-section-title"], [1, "color-grid"], [1, "color-card"], [1, "color-card__swatch", 2, "background-color", "var(--color-primary)"], [1, "color-card__info"], [1, "color-card__name"], [1, "color-card__hex"], [1, "color-card__swatch", 2, "background-color", "var(--color-secondary)"], [1, "color-card__swatch", 2, "background-color", "var(--color-contrast)"], [1, "color-card__swatch", 2, "background-color", "var(--color-accent)"], [1, "color-card__swatch", 2, "background-color", "var(--color-stripe-1)"], [1, "color-card__swatch", 2, "background-color", "var(--color-stripe-2)"], [1, "color-card__swatch", 2, "background-color", "#015F72"], [1, "color-card__swatch", 2, "background-color", "#01131B"], [1, "color-card__swatch", 2, "background-color", "var(--bg-primary)"], [1, "color-card__swatch", 2, "background-color", "var(--bg-secondary)"], [1, "color-card__swatch", 2, "background-color", "var(--text-dark)"], [1, "color-card__swatch", 2, "background-color", "#013946"], [1, "color-card__swatch", 2, "background-color", "var(--text-white)"], [1, "color-grid", "color-grid--semantic"], [1, "color-card__swatch", 2, "background-color", "var(--color-error)"], [1, "color-card__swatch", 2, "background-color", "var(--color-warning)"], [1, "color-card__swatch", 2, "background-color", "#FEF84A"], [1, "color-card__swatch", 2, "background-color", "var(--color-success)"], [1, "color-card__swatch", 2, "background-color", "var(--color-info)"], [1, "showcase__row"], [1, "shadow-demo"], [1, "shadow-demo__box", "shadow-demo__box--xs"], [1, "shadow-demo__box", "shadow-demo__box--s"], [1, "shadow-demo__box", "shadow-demo__box--m"], [1, "shadow-demo__box", "shadow-demo__box--l"], [2, "margin-top", "2rem"], [1, "shadow-demo__box", "shadow-demo__box--vinyl-s"], [1, "shadow-demo__box", "shadow-demo__box--vinyl-m"], [1, "shadow-demo__box", "shadow-demo__box--vinyl-l"], [1, "spacing-grid"], [1, "spacing-card"], [1, "spacing-card__visual"], [1, "spacing-card__block", 2, "width", "0.5rem", "height", "0.5rem"], [1, "spacing-card__info"], [1, "spacing-card__name"], [1, "spacing-card__value"], [1, "spacing-card__block", 2, "width", "1rem", "height", "1rem"], [1, "spacing-card__block", 2, "width", "2rem", "height", "2rem"], [1, "spacing-card__block", 2, "width", "3rem", "height", "3rem"], [1, "spacing-card__block", 2, "width", "4rem", "height", "4rem"], [1, "spacing-card__block", 2, "width", "5rem", "height", "5rem"], [1, "showcase__item"], ["variant", "primary", 3, "clicked"], ["variant", "secondary", 3, "clicked"], ["variant", "ghost", 3, "clicked"], ["variant", "danger", 3, "clicked"], ["size", "sm", 3, "clicked"], ["size", "md", 3, "clicked"], ["size", "lg", 3, "clicked"], [3, "disabled"], ["href", "#"], [3, "loading"], [1, "showcase__column"], [1, "showcase__item", "showcase__item--full"], [3, "clicked", "fullWidth"], ["mode", "inline", "size", "sm", 3, "show"], ["mode", "inline", "size", "md", 3, "show"], ["mode", "inline", "size", "lg", 3, "show"], [1, "showcase__row", 2, "margin-top", "1rem"], ["mode", "inline", "color", "primary", 3, "show"], ["mode", "inline", "color", "secondary", 3, "show"], [1, "showcase__item", 2, "background", "var(--color-border)", "padding", "1rem"], ["mode", "inline", "color", "white", 3, "show"], [2, "color", "white"], [3, "clicked"], ["size", "sm", 3, "value"], ["size", "md", 3, "value", "showLabel"], ["size", "lg", 3, "value", "showLabel"], ["variant", "primary", 3, "value", "showLabel"], ["variant", "success", 3, "value", "showLabel"], ["variant", "warning", 3, "value", "showLabel"], ["variant", "error", 3, "value", "showLabel"], [3, "indeterminate"], [3, "value", "striped", "showLabel"], ["size", "lg", 3, "value", "showLabel", "variant"], [3, "clicked", "disabled"], ["variant", "secondary", 3, "clicked", "disabled"], ["variant", "primary"], ["variant", "secondary"], ["variant", "success"], ["variant", "warning"], ["variant", "error"], ["variant", "info"], ["size", "sm", "variant", "primary"], ["size", "md", "variant", "primary"], ["size", "lg", "variant", "primary"], [2, "display", "flex", "gap", "0.5rem", "flex-wrap", "wrap"], [2, "display", "flex", "gap", "0.5rem", "align-items", "center"], [2, "font-weight", "600"], ["variant", "error", "size", "sm"], ["href", "#", 1, "link"], ["href", "#", 1, "link", "link--primary"], ["href", "#", 1, "link", "link--underlined"], ["href", "#", 1, "link", "link--arrow"], [1, "toggle-wrapper"], ["type", "checkbox", 1, "toggle"], [1, "toggle-label"], ["type", "checkbox", "checked", "", 1, "toggle"], [1, "toggle-wrapper", "toggle-wrapper--disabled"], ["type", "checkbox", "disabled", "", 1, "toggle"], [1, "checkbox-wrapper"], ["type", "checkbox", 1, "checkbox"], [1, "checkbox-label"], ["type", "checkbox", "checked", "", 1, "checkbox"], [1, "checkbox-wrapper", "checkbox-wrapper--disabled"], ["type", "checkbox", "disabled", "", 1, "checkbox"], [1, "radio-wrapper"], ["type", "radio", "name", "demo-radio", "checked", "", 1, "radio"], [1, "radio-label"], ["type", "radio", "name", "demo-radio", 1, "radio"], [1, "radio-wrapper", "radio-wrapper--disabled"], ["type", "radio", "name", "demo-radio-disabled", "disabled", "", 1, "radio"], [1, "showcase__grid", "showcase__grid--forms"], ["label", "Email", "type", "email", "placeholder", "tu@email.com", "helpText", "Nunca compartiremos tu email"], ["label", "Usuario", "type", "text", "placeholder", "Tu nombre de usuario", "helpText", "Este campo es requerido", 3, "control", "required"], ["label", "Contrase\xF1a", "type", "password", "placeholder", "\u2022\u2022\u2022\u2022\u2022\u2022\u2022\u2022", "helpText", "Contrase\xF1a segura", 3, "control", "required"], ["label", "Campo deshabilitado", "type", "text", "placeholder", "No disponible", 3, "disabled"], ["label", "Texto", "type", "text", "placeholder", "Escribe algo..."], ["label", "Email", "type", "email", "placeholder", "correo@ejemplo.com"], ["label", "Contrase\xF1a", "type", "password", "placeholder", "Tu contrase\xF1a"], ["label", "N\xFAmero", "type", "number", "placeholder", "123"], ["label", "Tel\xE9fono", "type", "tel", "placeholder", "+34 600 000 000"], ["label", "Fecha", "type", "date"], [1, "showcase__row", "showcase__row--cards-polaroid"], [1, "showcase__item", "showcase__item--card-polaroid"], ["title", "Rumours", "subtitle", "Fleetwood Mac", "imageShape", "square", "imageSize", "medium", "variant", "normal", "cardType", "polaroid", "titleLink", "#album", "subtitleLink", "#artist"], ["title", "Bohemian Rhapsody", "subtitle", "Queen", "imageShape", "circle", "imageSize", "medium", "variant", "normal", "cardType", "polaroid", "titleLink", "#song", "subtitleLink", "#artist"], ["title", "Hotel California", "subtitle", "Eagles", "imageShape", "square", "imageSize", "medium", "variant", "vinilo", "cardType", "polaroid", "titleLink", "#album", "subtitleLink", "#artist"], [2, "margin-bottom", "1rem", "font-size", "1.125rem", "color", "var(--text-secondary)"], ["title", "JohnDoe", "imageShape", "square", "imageSize", "large", "variant", "normal", "cardType", "profile", "layout", "vertical", 3, "badges", "actions"], ["title", "Dark Side of the Moon", "subtitle", "Pink Floyd \u2022 1973", "imageShape", "square", "imageSize", "large", "variant", "vinilo", "cardType", "profile", "layout", "vertical", 3, "badges", "actions"], [2, "margin", "2rem 0 1rem", "font-size", "1.125rem", "color", "var(--text-secondary)"], ["title", "Led Zeppelin IV", "subtitle", "Led Zeppelin \u2022 1971", "imageShape", "square", "imageSize", "large", "variant", "normal", "cardType", "profile", "layout", "horizontal", 3, "badges", "actions"], ["title", "Abbey Road", "subtitle", "The Beatles \u2022 1969", "imageShape", "square", "imageSize", "large", "variant", "vinilo", "cardType", "profile", "layout", "horizontal", 3, "badges", "actions"], ["label", "Descripci\xF3n", "id", "textarea-normal", "placeholder", "Escribe tu descripci\xF3n aqu\xED...", "hint", "M\xE1ximo 500 caracteres", 3, "rows"], ["label", "Biograf\xEDa", "id", "textarea-error", "placeholder", "Escribe tu biograf\xEDa...", "error", "Este campo es obligatorio", 3, "rows"], ["label", "Comentario", "id", "textarea-disabled", "placeholder", "No disponible", 3, "rows", "disabled"], ["label", "G\xE9nero musical", "id", "select-normal", "placeholder", "Selecciona tu g\xE9nero favorito", "hint", "Elige el g\xE9nero que m\xE1s te gusta", 3, "options"], ["label", "G\xE9nero musical", "id", "select-error", "placeholder", "Selecciona tu g\xE9nero favorito", "error", "Debes seleccionar un g\xE9nero", 3, "options"], ["label", "G\xE9nero musical", "id", "select-disabled", "placeholder", "No disponible", 3, "options", "disabled"], ["label", "Acepto los t\xE9rminos y condiciones", "id", "checkbox-normal"], ["label", "Suscribirme al newsletter", "id", "checkbox-error", "error", "Debes aceptar para continuar"], ["label", "Opci\xF3n no disponible", "id", "checkbox-disabled", 3, "disabled"], ["label", "Privacidad del perfil", "name", "privacy", 3, "options"], ["label", "Privacidad del perfil", "name", "privacy-error", "error", "Debes seleccionar una opci\xF3n", 3, "options"], ["label", "Privacidad del perfil", "name", "privacy-inline", 3, "options", "inline"], [3, "items"], ["separator", "\u203A", 3, "items"], ["type", "success", "title", "\xA1\xC9xito!", "message", "Tu \xE1lbum se ha agregado correctamente a tu colecci\xF3n."], ["type", "error", "title", "Error", "message", "No se pudo conectar con el servidor. Por favor, int\xE9ntalo de nuevo."], ["type", "warning", "title", "Advertencia", "message", "Tu sesi\xF3n caducar\xE1 en 5 minutos. Guarda tus cambios."], ["type", "info", "title", "Informaci\xF3n", "message", "Tenemos nueva m\xFAsica disponible en tu secci\xF3n de recomendados."], ["type", "warning", "title", "Cambios pendientes", "message", "Tienes cambios sin guardar. \xBFDeseas salir de todas formas?", 3, "dismissible"], [1, "showcase__grid", 2, "gap", "3rem", "padding", "2rem"], ["text", "Tooltip arriba", "position", "top"], ["text", "Tooltip abajo", "position", "bottom"], ["text", "Tooltip izquierda", "position", "left"], ["text", "Tooltip derecha", "position", "right"], ["variant", "primary", "size", "md", 3, "click"], ["variant", "danger", "size", "md", 3, "click"], ["variant", "secondary", "size", "md", 3, "click"], ["variant", "ghost", "size", "md", 3, "click"], [1, "showcase__item", "showcase__item--centered"], ["title", "Confirmar acci\xF3n", 3, "onClose", "isOpen"], [2, "display", "flex", "gap", "1rem", "margin-top", "1.5rem"], ["mode", "single", 3, "items"], ["mode", "multiple", 3, "items"], [3, "breakpoint"], ["id", "descripcion", "label", "Descripci\xF3n"], ["id", "especificaciones", "label", "Especificaciones"], ["id", "resenias", "label", "Rese\xF1as"], ["id", "soporte", "label", "Soporte"], ["title", "\xC1LBUMES EN TENDENCIA"], ["imageShape", "square", "imageSize", "medium", "variant", "normal", "cardType", "polaroid", "titleLink", "#album", "subtitleLink", "#artist", 3, "title", "subtitle", 4, "ngFor", "ngForOf"], ["title", "CANCIONES EN TENDENCIA"], ["imageShape", "circle", "imageSize", "medium", "variant", "normal", "cardType", "polaroid", "titleLink", "#song", "subtitleLink", "#artist", 3, "title", "subtitle", 4, "ngFor", "ngForOf"], ["title", "DEMO - MANIPULACI\xD3N DE ESTILOS"], [1, "style-guide__carousel-demo-controls"], ["variant", "secondary", "size", "sm", 3, "click"], [1, "style-guide__carousel-demo-opacity"], ["type", "range", "min", "0", "max", "1", "step", "0.1", 1, "style-guide__carousel-demo-range", 3, "input", "value"], ["imageShape", "square", "imageSize", "medium", "variant", "normal", "cardType", "polaroid", "titleLink", "#album", "subtitleLink", "#artist", 3, "title", "subtitle"], ["imageShape", "circle", "imageSize", "medium", "variant", "normal", "cardType", "polaroid", "titleLink", "#song", "subtitleLink", "#artist", 3, "title", "subtitle"], [1, "layout-info-card"], [1, "layout-info-card__header"], ["viewBox", "0 0 24 24", "fill", "none", "stroke", "currentColor", "stroke-width", "2", "stroke-linecap", "round", "stroke-linejoin", "round", 1, "layout-info-card__icon"], ["x", "3", "y", "3", "width", "18", "height", "18", "rx", "2", "ry", "2"], ["x1", "3", "y1", "9", "x2", "21", "y2", "9"], [1, "layout-info-card__name"], [1, "layout-info-card__desc"], [1, "layout-info-card__vars"], ["x1", "3", "y1", "12", "x2", "21", "y2", "12"], ["x1", "3", "y1", "6", "x2", "21", "y2", "6"], ["x1", "3", "y1", "18", "x2", "21", "y2", "18"], ["x1", "3", "y1", "15", "x2", "21", "y2", "15"], [1, "showcase__row", "showcase__row--wrap"], [1, "showcase__item", "showcase__item--breakpoint"], ["title", "Mobile", "subtitle", "320px+", "imageShape", "square", "imageSize", "medium", "variant", "normal", "cardType", "polaroid", 3, "placeholderIcon"], [1, "showcase__code"], ["title", "Tablet", "subtitle", "768px+", "imageShape", "square", "imageSize", "medium", "variant", "normal", "cardType", "polaroid", 3, "placeholderIcon"], ["title", "Desktop", "subtitle", "1024px+", "imageShape", "square", "imageSize", "medium", "variant", "vinilo", "cardType", "polaroid", 3, "placeholderIcon"], ["title", "Large Desktop", "subtitle", "1200px+", "imageShape", "square", "imageSize", "medium", "variant", "vinilo", "cardType", "polaroid", 3, "placeholderIcon"], [1, "z-index-scale"], [1, "z-index-scale__item", "z-index-scale__item--10"], [1, "z-index-scale__level"], [1, "z-index-scale__name"], [1, "z-index-scale__desc"], [1, "z-index-scale__item", "z-index-scale__item--9"], [1, "z-index-scale__item", "z-index-scale__item--8"], [1, "z-index-scale__item", "z-index-scale__item--7"], [1, "z-index-scale__item", "z-index-scale__item--6"], [1, "z-index-scale__item", "z-index-scale__item--5"], [1, "z-index-scale__item", "z-index-scale__item--4"], [1, "z-index-scale__item", "z-index-scale__item--3"], [1, "z-index-scale__item", "z-index-scale__item--2"], [1, "z-index-scale__item", "z-index-scale__item--1"], [1, "z-index-scale__item", "z-index-scale__item--0"], [1, "css-var-card"], [1, "css-var-card__name"], [1, "css-var-card__swatch", 2, "background-color", "var(--bg-primary)"], [1, "css-var-card__desc"], [1, "css-var-card__swatch", 2, "background-color", "var(--bg-secondary)"], [1, "css-var-card__swatch", 2, "background-color", "var(--header-bg)"], [1, "css-var-card__swatch", 2, "background-color", "var(--nav-bg)"], [1, "css-var-card__swatch", 2, "background-color", "var(--color-primary)"], [1, "css-var-card__swatch", 2, "background-color", "var(--shadow-color)"], ["position", "top-right", 3, "dismissed", "type", "title", "message", "stackIndex", "getHeightAt", "autoDismiss", "duration"]], template: function StyleGuide_Template(rf, ctx) {
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
      \u0275\u0275conditionalCreate(29, StyleGuide_Conditional_29_Template, 222, 34, "section", 11);
      \u0275\u0275conditionalCreate(30, StyleGuide_Conditional_30_Template, 169, 9, "section", 11);
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
    ReactiveFormsModule,
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
    ResponsiveTabs,
    TabPanel,
    Tooltip,
    Spinner,
    ProgressBar
  ], styles: ['@charset "UTF-8";\n\n\n\n.style-guide[_ngcontent-%COMP%] {\n  min-height: 100vh;\n  background-color: var(--bg-primary);\n  padding-top: 0;\n  position: relative;\n}\n.style-guide__sidebar[_ngcontent-%COMP%] {\n  position: fixed;\n  left: 2rem;\n  bottom: 2rem;\n  z-index: 3;\n  display: flex;\n  flex-direction: column-reverse;\n  align-items: flex-start;\n  gap: 1rem;\n  pointer-events: none;\n}\n@media (max-width: 768px) {\n  .style-guide__sidebar[_ngcontent-%COMP%] {\n    left: 1rem;\n    bottom: 1rem;\n  }\n}\n.style-guide__sidebar-toggle[_ngcontent-%COMP%] {\n  display: inline-flex;\n  align-items: center;\n  justify-content: center;\n  gap: 0.5rem;\n  font-family: "Space Grotesk", sans-serif;\n  font-weight: 600;\n  text-transform: uppercase;\n  letter-spacing: 0.05em;\n  text-decoration: none;\n  cursor: pointer;\n  border: 3px solid var(--border-color);\n  border-radius: 9999px;\n  transition: all 150ms ease-in-out;\n  white-space: nowrap;\n  box-sizing: border-box;\n  background-color: var(--color-primary);\n  border: 4px solid var(--border-color);\n  box-shadow: 6px 6px 0px #01131B;\n  width: 48px;\n  height: 48px;\n  min-height: 44px;\n  padding: 0;\n  font-size: 1.5rem;\n  position: relative;\n  z-index: 2;\n  pointer-events: auto;\n}\n.style-guide__sidebar-toggle[_ngcontent-%COMP%]:focus-visible {\n  outline: 3px solid var(--color-accent);\n  outline-offset: 2px;\n}\n.style-guide__sidebar-toggle[_ngcontent-%COMP%]:hover {\n  background-color: var(--color-secondary);\n  box-shadow: 2px 2px 0px #01131B;\n  transform: translate(3px, 3px);\n}\n.style-guide__sidebar-toggle[_ngcontent-%COMP%]:active {\n  box-shadow: 0px 0px 0px #01131B;\n  transform: translate(6px, 6px);\n}\n.style-guide__sidebar-toggle[_ngcontent-%COMP%]:focus-visible {\n  outline: 3px solid #BB3F03;\n  outline-offset: 4px;\n}\n.style-guide__sidebar-icon[_ngcontent-%COMP%] {\n  font-size: 1.75rem;\n  line-height: 1;\n  flex-shrink: 0;\n}\n.style-guide__sidebar-menu[_ngcontent-%COMP%] {\n  list-style: none;\n  margin: 0;\n  padding: 0;\n  display: flex;\n  flex-direction: column;\n  align-items: flex-start;\n  gap: 0.5rem;\n  pointer-events: auto;\n  opacity: 0;\n  visibility: hidden;\n  transform: translateY(20px) scale(0.9);\n  transform-origin: bottom left;\n  transition:\n    opacity 300ms ease-in-out,\n    transform 300ms ease-in-out cubic-bezier(0.175, 0.885, 0.32, 1.275),\n    visibility 300ms ease-in-out;\n}\n.style-guide__sidebar--open[_ngcontent-%COMP%]   .style-guide__sidebar-menu[_ngcontent-%COMP%] {\n  opacity: 1;\n  visibility: visible;\n  transform: translateY(0) scale(1);\n}\n.style-guide__sidebar-item[_ngcontent-%COMP%] {\n  list-style: none;\n}\n.style-guide__sidebar-link[_ngcontent-%COMP%] {\n  display: inline-flex;\n  align-items: center;\n  justify-content: center;\n  gap: 0.5rem;\n  font-family: "Space Grotesk", sans-serif;\n  font-weight: 600;\n  text-transform: uppercase;\n  letter-spacing: 0.05em;\n  text-decoration: none;\n  cursor: pointer;\n  border: 3px solid var(--border-color);\n  border-radius: 9999px;\n  transition: all 150ms ease-in-out;\n  white-space: nowrap;\n  box-sizing: border-box;\n  background-color: var(--bg-primary);\n  color: var(--text-primary);\n  border: 3px solid var(--border-color);\n  box-shadow: 4px 4px 0px #01131B;\n  min-width: 150px;\n  padding: 1rem 2rem;\n  font-size: 0.875rem;\n  min-height: 44px;\n  position: relative;\n}\n.style-guide__sidebar-link[_ngcontent-%COMP%]:focus-visible {\n  outline: 3px solid var(--color-accent);\n  outline-offset: 2px;\n}\n.style-guide__sidebar-link[_ngcontent-%COMP%]:hover {\n  background-color: var(--bg-secondary);\n  color: var(--text-primary);\n  box-shadow: 1px 1px 0px #01131B;\n  transform: translate(2px, 2px);\n}\n.style-guide__sidebar-link[_ngcontent-%COMP%]:active {\n  box-shadow: 0px 0px 0px #01131B;\n  transform: translate(4px, 4px);\n}\n.style-guide__sidebar-link[_ngcontent-%COMP%]:focus-visible {\n  outline: 3px solid #BB3F03;\n  outline-offset: 2px;\n}\n.style-guide__sidebar-link--active[_ngcontent-%COMP%] {\n  background-color: var(--color-primary);\n  color: var(--text-primary);\n  font-weight: 700;\n  border-color: var(--text-primary);\n}\n.style-guide__container[_ngcontent-%COMP%] {\n  flex: 1;\n  padding: 4rem;\n  width: 100%;\n  min-height: calc(100vh - 7rem);\n  overflow-y: auto;\n}\n@media (max-width: 768px) {\n  .style-guide__container[_ngcontent-%COMP%] {\n    padding: 3rem;\n    min-height: calc(100vh - 6rem);\n  }\n}\n@media (max-width: 320px) {\n  .style-guide__container[_ngcontent-%COMP%] {\n    padding: 2rem;\n  }\n}\n.style-guide__header[_ngcontent-%COMP%] {\n  text-align: center;\n  margin-bottom: 4rem;\n  padding: 4rem 0;\n  border-bottom: 3px solid var(--border-color) solid var(--text-primary);\n}\n.style-guide__header[_ngcontent-%COMP%]   h1[_ngcontent-%COMP%] {\n  font-size: 2.625rem;\n  color: var(--color-primary);\n  margin-bottom: 1rem;\n  text-transform: uppercase;\n  letter-spacing: 0.05em;\n}\n@media (max-width: 768px) {\n  .style-guide__header[_ngcontent-%COMP%]   h1[_ngcontent-%COMP%] {\n    font-size: 1.625rem;\n  }\n}\n.style-guide__intro[_ngcontent-%COMP%] {\n  font-size: 1.125rem;\n  color: var(--text-primary);\n  max-width: 600px;\n  margin: 0 auto;\n}\n@media (max-width: 768px) {\n  .style-guide__intro[_ngcontent-%COMP%] {\n    font-size: 1rem;\n  }\n}\n.style-guide__section[_ngcontent-%COMP%] {\n  margin-bottom: 4rem;\n  padding: 3rem;\n  background-color: var(--bg-secondary);\n  border: 3px solid var(--border-color) solid var(--border-color);\n  border-radius: 8px;\n  box-shadow: 4px 4px 0px #01131B;\n}\n.style-guide__section[_ngcontent-%COMP%]   h2[_ngcontent-%COMP%] {\n  font-size: 1.625rem;\n  color: var(--color-secondary);\n  margin-bottom: 3rem;\n  padding-bottom: 1rem;\n  border-bottom: 2px solid var(--border-color);\n  text-transform: uppercase;\n}\n@media (max-width: 768px) {\n  .style-guide__section[_ngcontent-%COMP%]   h2[_ngcontent-%COMP%] {\n    font-size: 1rem;\n  }\n}\n.style-guide__section--placeholder[_ngcontent-%COMP%] {\n  text-align: center;\n  padding: 4rem;\n  opacity: 0.6;\n}\n.style-guide__section--placeholder[_ngcontent-%COMP%]   h2[_ngcontent-%COMP%] {\n  border-bottom: none;\n}\n.style-guide__section--placeholder[_ngcontent-%COMP%]   p[_ngcontent-%COMP%] {\n  color: var(--text-primary);\n  font-size: 1.125rem;\n}\n.showcase[_ngcontent-%COMP%] {\n  margin-bottom: 3rem;\n}\n.showcase[_ngcontent-%COMP%]:last-child {\n  margin-bottom: 0;\n}\n.showcase[_ngcontent-%COMP%]   h3[_ngcontent-%COMP%] {\n  font-size: 1rem;\n  color: var(--text-primary);\n  margin-bottom: 2rem;\n  text-transform: uppercase;\n  letter-spacing: 0.05em;\n}\n@media (max-width: 768px) {\n  .showcase[_ngcontent-%COMP%]   h3[_ngcontent-%COMP%] {\n    font-size: 1.125rem;\n  }\n}\n.showcase__row[_ngcontent-%COMP%] {\n  display: flex;\n  gap: 2rem;\n  flex-wrap: wrap;\n  align-items: flex-start;\n}\n@media (max-width: 768px) {\n  .showcase__row[_ngcontent-%COMP%] {\n    gap: 1rem;\n  }\n}\n@media (max-width: 320px) {\n  .showcase__row[_ngcontent-%COMP%] {\n    flex-direction: column;\n  }\n  .showcase__row[_ngcontent-%COMP%]   .showcase__item[_ngcontent-%COMP%] {\n    width: 100%;\n  }\n}\n.showcase__row--cards-polaroid[_ngcontent-%COMP%] {\n  justify-content: flex-start;\n}\n.showcase__row--cards-polaroid[_ngcontent-%COMP%]   .showcase__item--card-polaroid[_ngcontent-%COMP%] {\n  flex: 0 0 auto;\n  width: auto;\n}\n.showcase__row--cards-polaroid[_ngcontent-%COMP%]   .showcase__item--card-polaroid[_ngcontent-%COMP%]   app-card[_ngcontent-%COMP%] {\n  display: block;\n  width: 220px;\n  max-width: 220px;\n}\n@media (max-width: 768px) {\n  .showcase__row--cards-polaroid[_ngcontent-%COMP%] {\n    justify-content: center;\n  }\n}\n@media (max-width: 320px) {\n  .showcase__row--cards-polaroid[_ngcontent-%COMP%]   .showcase__item--card-polaroid[_ngcontent-%COMP%] {\n    width: 100%;\n    max-width: 100%;\n  }\n  .showcase__row--cards-polaroid[_ngcontent-%COMP%]   .showcase__item--card-polaroid[_ngcontent-%COMP%]   app-card[_ngcontent-%COMP%] {\n    width: 100%;\n    max-width: 100%;\n  }\n}\n.showcase__column[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  gap: 2rem;\n  width: 100%;\n}\n.showcase__grid[_ngcontent-%COMP%] {\n  display: grid;\n  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));\n  gap: 3rem 2rem;\n  align-items: start;\n}\n@media (max-width: 768px) {\n  .showcase__grid[_ngcontent-%COMP%] {\n    grid-template-columns: 1fr;\n    gap: 2rem;\n  }\n}\n.showcase__grid--forms[_ngcontent-%COMP%] {\n  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));\n  align-items: flex-start;\n  gap: 4rem;\n}\n@media (max-width: 1024px) {\n  .showcase__grid--forms[_ngcontent-%COMP%] {\n    grid-template-columns: repeat(2, 1fr);\n    gap: 3rem;\n  }\n}\n@media (max-width: 768px) {\n  .showcase__grid--forms[_ngcontent-%COMP%] {\n    grid-template-columns: 1fr;\n    gap: 2rem;\n  }\n}\n.showcase__item[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  gap: 0.5rem;\n  align-items: flex-start;\n  min-width: 0;\n  max-width: 100%;\n}\n.showcase__item--full[_ngcontent-%COMP%] {\n  width: 100%;\n  min-width: 0;\n}\n.showcase__item[_ngcontent-%COMP%]    > *[_ngcontent-%COMP%] {\n  max-width: 100%;\n}\n.showcase__item[_ngcontent-%COMP%]   code[_ngcontent-%COMP%] {\n  font-family: "Courier New", monospace;\n  font-size: 0.875rem;\n  padding: 0.5rem 1rem;\n  background-color: var(--bg-primary);\n  border: 2px solid var(--border-color);\n  border-radius: 5px;\n  color: var(--text-primary);\n  white-space: nowrap;\n  overflow: auto;\n  max-width: 100%;\n}\n@media (max-width: 768px) {\n  .showcase__item[_ngcontent-%COMP%]   code[_ngcontent-%COMP%] {\n    font-size: 0.75rem;\n    padding: 0.5rem;\n    white-space: normal;\n    word-break: break-all;\n  }\n}\napp-carousel[_ngcontent-%COMP%] {\n  display: block;\n  width: 100%;\n  max-width: 100%;\n  min-width: 0;\n}\napp-carousel[_ngcontent-%COMP%]   .carousel__track[_ngcontent-%COMP%]    > app-card[_ngcontent-%COMP%] {\n  display: block;\n  flex: 0 0 220px !important;\n  width: 220px !important;\n  min-width: 220px !important;\n  max-width: 220px !important;\n}\n@media (max-width: 768px) {\n  app-carousel[_ngcontent-%COMP%]   .carousel__track[_ngcontent-%COMP%]    > app-card[_ngcontent-%COMP%] {\n    flex: 0 0 169.4px !important;\n    width: 169.4px !important;\n    min-width: 169.4px !important;\n    max-width: 169.4px !important;\n  }\n}\n@media (max-width: 320px) {\n  app-carousel[_ngcontent-%COMP%]   .carousel__track[_ngcontent-%COMP%]    > app-card[_ngcontent-%COMP%] {\n    flex: 0 0 149.6px !important;\n    width: 149.6px !important;\n    min-width: 149.6px !important;\n    max-width: 149.6px !important;\n  }\n}\napp-form-input[_ngcontent-%COMP%], \napp-form-textarea[_ngcontent-%COMP%], \napp-form-select[_ngcontent-%COMP%], \napp-form-checkbox[_ngcontent-%COMP%], \napp-form-radio-group[_ngcontent-%COMP%] {\n  display: block;\n  width: 100%;\n  max-width: 100%;\n}\n.showcase__row[_ngcontent-%COMP%]   app-card[_ngcontent-%COMP%], \n.showcase__column[_ngcontent-%COMP%]   app-card[_ngcontent-%COMP%], \n.showcase__item[_ngcontent-%COMP%]   app-card[_ngcontent-%COMP%] {\n  display: block;\n  width: 100%;\n  max-width: 100%;\n  min-width: 0;\n}\napp-alert[_ngcontent-%COMP%] {\n  display: block;\n  width: 100%;\n}\napp-breadcrumbs[_ngcontent-%COMP%] {\n  display: block;\n  width: 100%;\n  overflow: hidden;\n}\n.style-guide__carousel-demo-controls[_ngcontent-%COMP%] {\n  display: flex;\n  flex-wrap: wrap;\n  gap: 1rem;\n  margin-top: 1rem;\n  align-items: center;\n}\n.style-guide__carousel-demo-opacity[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 0.5rem;\n  flex-wrap: wrap;\n}\n.style-guide__carousel-demo-range[_ngcontent-%COMP%] {\n  width: 149.6px;\n  max-width: 100%;\n}\n@media (max-width: 768px) {\n  .style-guide__carousel-demo-controls[_ngcontent-%COMP%] {\n    align-items: stretch;\n  }\n  .style-guide__carousel-demo-range[_ngcontent-%COMP%] {\n    width: 100%;\n  }\n}\n.color-swatch[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n  justify-content: center;\n  gap: 0.5rem;\n  padding: 3rem;\n  min-height: 10rem;\n  border: 3px solid var(--border-color);\n}\n.color-swatch__name[_ngcontent-%COMP%] {\n  font-weight: 700;\n  font-size: 0.875rem;\n  text-transform: uppercase;\n}\n.color-swatch[_ngcontent-%COMP%]   code[_ngcontent-%COMP%] {\n  font-size: 0.75rem;\n  background: color-mix(in srgb, var(--text-white) 80%, transparent);\n  padding: 0.5rem;\n  border-radius: 3px;\n  color: var(--text-dark);\n}\n.color-swatch--primary[_ngcontent-%COMP%] {\n  background-color: var(--color-accent-primary);\n  color: var(--color-text-on-accent);\n}\n.color-swatch--secondary[_ngcontent-%COMP%] {\n  background-color: var(--color-accent-secondary);\n  color: var(--color-text-primary);\n}\n.color-swatch--bg[_ngcontent-%COMP%] {\n  background-color: var(--color-bg-primary);\n  color: var(--color-text-primary);\n}\n.color-swatch--bg-secondary[_ngcontent-%COMP%] {\n  background-color: var(--color-bg-secondary);\n  color: var(--color-text-primary);\n}\n.color-swatch--text[_ngcontent-%COMP%] {\n  background-color: var(--color-text-primary);\n  color: var(--color-bg-primary);\n}\n.color-swatch--border[_ngcontent-%COMP%] {\n  background-color: var(--color-border);\n  color: var(--color-bg-primary);\n}\n.color-swatch--success[_ngcontent-%COMP%] {\n  background-color: var(--color-success);\n  color: var(--text-white);\n}\n.color-swatch--warning[_ngcontent-%COMP%] {\n  background-color: var(--color-warning);\n  color: var(--text-dark);\n}\n.color-swatch--error[_ngcontent-%COMP%] {\n  background-color: var(--color-error);\n  color: var(--text-white);\n}\n.color-swatch--info[_ngcontent-%COMP%] {\n  background-color: var(--color-info);\n  color: var(--text-white);\n}\n.showcase__grid--colors[_ngcontent-%COMP%] {\n  grid-template-columns: repeat(auto-fit, minmax(149.6px, 1fr));\n}\n.shadow-sample[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  width: 10rem;\n  height: 10rem;\n  background-color: var(--color-bg-primary);\n  border: 3px solid var(--border-color);\n  font-weight: 600;\n  text-transform: uppercase;\n}\n.shadow-sample--sm[_ngcontent-%COMP%] {\n  box-shadow: 2px 2px 0px #01131B;\n}\n.shadow-sample--md[_ngcontent-%COMP%] {\n  box-shadow: 4px 4px 0px #01131B;\n}\n.shadow-sample--lg[_ngcontent-%COMP%] {\n  box-shadow: 6px 6px 0px #01131B;\n}\n.spacing-samples[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  gap: 1rem;\n  width: 100%;\n}\n.spacing-sample[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  height: 4.5rem;\n  min-width: 4.5rem;\n  background-color: var(--color-accent-primary);\n  color: var(--color-text-on-accent);\n  font-weight: 600;\n  font-size: 0.75rem;\n  border: 2px solid var(--border-color);\n}\n.spacing-sample[_ngcontent-%COMP%]   span[_ngcontent-%COMP%] {\n  white-space: nowrap;\n}\n.typography-sample[_ngcontent-%COMP%] {\n  background-color: var(--color-bg-primary);\n  padding: 3rem;\n  border: 2px solid var(--border-color);\n}\n.typography-sample[_ngcontent-%COMP%]   h1[_ngcontent-%COMP%], \n.typography-sample[_ngcontent-%COMP%]   h2[_ngcontent-%COMP%], \n.typography-sample[_ngcontent-%COMP%]   h3[_ngcontent-%COMP%], \n.typography-sample[_ngcontent-%COMP%]   h4[_ngcontent-%COMP%] {\n  margin-bottom: 1rem;\n}\n.typography-sample[_ngcontent-%COMP%]   p[_ngcontent-%COMP%] {\n  margin-bottom: 0.5rem;\n}\n.layout-diagram[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  gap: 0.5rem;\n  border: 4px solid var(--border-color);\n  background-color: var(--border-color);\n  max-width: 600px;\n  margin: 0 auto;\n  border-radius: 8px;\n  overflow: hidden;\n  box-shadow: 4px 4px 0px #01131B;\n}\n.layout-diagram__header[_ngcontent-%COMP%], \n.layout-diagram__footer[_ngcontent-%COMP%] {\n  background-color: var(--color-primary);\n  color: var(--text-dark);\n  padding: 2rem;\n  text-align: center;\n  font-weight: 700;\n  text-transform: uppercase;\n  letter-spacing: 0.05em;\n}\n.layout-diagram__body[_ngcontent-%COMP%] {\n  display: flex;\n  gap: 0.5rem;\n  min-height: 150px;\n}\n.layout-diagram__sidebar[_ngcontent-%COMP%] {\n  flex: 0 0 149.6px;\n  background-color: var(--bg-secondary);\n  padding: 2rem;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  font-weight: 600;\n  text-transform: uppercase;\n}\n@media (max-width: 768px) {\n  .layout-diagram__sidebar[_ngcontent-%COMP%] {\n    flex: 0 0 7rem;\n    font-size: 0.75rem;\n  }\n}\n.layout-diagram__main[_ngcontent-%COMP%] {\n  flex: 1;\n  background-color: var(--bg-primary);\n  padding: 2rem;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  font-weight: 600;\n  text-transform: uppercase;\n}\n.showcase__grid--breakpoints[_ngcontent-%COMP%] {\n  grid-template-columns: repeat(auto-fit, minmax(18rem, 1fr));\n}\n.breakpoint-card[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n  gap: 0.5rem;\n  padding: 2rem;\n  background-color: var(--bg-primary);\n  border: 3px solid var(--border-color);\n  border-radius: 5px;\n  text-align: center;\n  box-shadow: 2px 2px 0px #01131B;\n}\n.breakpoint-card__name[_ngcontent-%COMP%] {\n  font-weight: 700;\n  font-size: 1rem;\n  text-transform: uppercase;\n  color: var(--text-primary);\n}\n.breakpoint-card__value[_ngcontent-%COMP%] {\n  font-size: 1rem;\n  font-weight: 600;\n  color: var(--color-primary);\n}\n.breakpoint-card[_ngcontent-%COMP%]   code[_ngcontent-%COMP%] {\n  font-size: 0.75rem;\n}\n.showcase__item--centered[_ngcontent-%COMP%] {\n  align-items: center;\n  width: 100%;\n  margin: 0 auto;\n}\n.font-showcase[_ngcontent-%COMP%] {\n  background-color: var(--bg-secondary);\n  border: 3px solid var(--border-color);\n  border-radius: 8px;\n  padding: 3rem;\n  margin-bottom: 3rem;\n}\n.font-showcase[_ngcontent-%COMP%]:last-child {\n  margin-bottom: 0;\n}\n.font-showcase__header[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  justify-content: space-between;\n  margin-bottom: 2rem;\n  padding-bottom: 1rem;\n  border-bottom: 2px solid var(--border-color);\n}\n.font-showcase__header[_ngcontent-%COMP%]   h4[_ngcontent-%COMP%] {\n  font-size: 1rem;\n  margin: 0;\n  color: var(--text-primary);\n  text-transform: uppercase;\n}\n.font-showcase__tag[_ngcontent-%COMP%] {\n  display: inline-block;\n  padding: 0.5rem 1rem;\n  background-color: var(--color-primary);\n  color: var(--text-dark);\n  border: 2px solid var(--border-color);\n  border-radius: 3px;\n  font-size: 0.75rem;\n  font-weight: 600;\n  text-transform: uppercase;\n}\n.font-showcase__tag--accent[_ngcontent-%COMP%] {\n  background-color: var(--color-secondary);\n}\n.font-showcase__samples[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  gap: 2rem;\n  margin-bottom: 2rem;\n}\n.font-showcase__sample[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  gap: 0.5rem;\n}\n.font-showcase__sample[_ngcontent-%COMP%]   h1[_ngcontent-%COMP%], \n.font-showcase__sample[_ngcontent-%COMP%]   h2[_ngcontent-%COMP%], \n.font-showcase__sample[_ngcontent-%COMP%]   h3[_ngcontent-%COMP%], \n.font-showcase__sample[_ngcontent-%COMP%]   p[_ngcontent-%COMP%], \n.font-showcase__sample[_ngcontent-%COMP%]   div[_ngcontent-%COMP%] {\n  margin: 0;\n  color: var(--text-primary);\n}\n.font-showcase__label[_ngcontent-%COMP%] {\n  font-size: 0.75rem;\n  color: var(--text-secondary);\n  font-weight: 600;\n  text-transform: uppercase;\n  letter-spacing: 0.05em;\n}\n.font-showcase__usage[_ngcontent-%COMP%] {\n  padding: 1rem 2rem;\n  background-color: var(--bg-primary);\n  border: 2px solid var(--border-color);\n  border-radius: 5px;\n  font-size: 0.875rem;\n  color: var(--text-primary);\n}\n.font-showcase__usage[_ngcontent-%COMP%]   strong[_ngcontent-%COMP%] {\n  color: var(--color-primary);\n}\n.monoton-sample[_ngcontent-%COMP%] {\n  color: var(--color-primary);\n}\n.monoton-sample--lg[_ngcontent-%COMP%] {\n  font-size: 5.6525rem;\n}\n.monoton-sample--md[_ngcontent-%COMP%] {\n  font-size: 2.625rem;\n}\n.monoton-sample--sm[_ngcontent-%COMP%] {\n  font-size: 1.625rem;\n}\n.color-section-title[_ngcontent-%COMP%] {\n  font-size: 1.125rem;\n  color: var(--text-primary);\n  margin: 3rem 0 2rem 0;\n  text-transform: uppercase;\n  font-weight: 600;\n  letter-spacing: 0.05em;\n}\n.color-grid[_ngcontent-%COMP%] {\n  display: grid;\n  grid-template-columns: repeat(4, 1fr);\n  gap: 2rem;\n  margin-bottom: 3rem;\n}\n@media (max-width: 1024px) {\n  .color-grid[_ngcontent-%COMP%] {\n    grid-template-columns: repeat(3, 1fr);\n  }\n}\n@media (max-width: 768px) {\n  .color-grid[_ngcontent-%COMP%] {\n    grid-template-columns: repeat(2, 1fr);\n    gap: 1rem;\n  }\n}\n.color-grid--semantic[_ngcontent-%COMP%] {\n  grid-template-columns: repeat(auto-fit, minmax(18rem, 1fr));\n}\n.color-card[_ngcontent-%COMP%] {\n  background-color: var(--bg-secondary);\n  border: 3px solid var(--border-color);\n  border-radius: 5px;\n  box-shadow: 4px 4px 0px #01131B;\n  overflow: hidden;\n  transition: transform 150ms ease-in-out ease, box-shadow 150ms ease-in-out ease;\n  display: flex;\n  flex-direction: column;\n  height: 100%;\n}\n.color-card[_ngcontent-%COMP%]:hover {\n  transform: translate(-2px, -2px);\n  box-shadow: 6px 6px 0px #01131B;\n}\n.color-card__swatch[_ngcontent-%COMP%] {\n  width: 100%;\n  height: 12rem;\n  border-bottom: 3px solid var(--border-color);\n}\n.color-card__info[_ngcontent-%COMP%] {\n  padding: 1rem;\n  display: flex;\n  flex-direction: column;\n  gap: 0.5rem;\n  flex: 1;\n}\n.color-card__name[_ngcontent-%COMP%] {\n  font-weight: 700;\n  font-size: 0.875rem;\n  color: var(--text-primary);\n  text-transform: uppercase;\n}\n.color-card__hex[_ngcontent-%COMP%] {\n  font-size: 0.75rem;\n  color: var(--text-secondary);\n  font-family: "Courier New", monospace;\n}\n.color-card[_ngcontent-%COMP%]   code[_ngcontent-%COMP%] {\n  font-size: 0.6225rem;\n  padding: 0.5rem 0.5rem;\n  background-color: var(--bg-primary);\n  border: 1px solid var(--border-color);\n  border-radius: 3px;\n  color: var(--text-primary);\n  font-family: "Courier New", monospace;\n  margin-top: auto;\n}\n.shadow-demo[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n  gap: 1rem;\n  padding: 2rem;\n}\n.shadow-demo__box[_ngcontent-%COMP%] {\n  width: 10rem;\n  height: 10rem;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  background-color: var(--color-primary);\n  color: var(--text-dark);\n  border: 3px solid var(--border-color);\n  border-radius: 5px;\n  font-weight: 700;\n  font-size: 1rem;\n}\n.shadow-demo__box--xs[_ngcontent-%COMP%] {\n  box-shadow: 2px 2px 0px #01131B;\n}\n.shadow-demo__box--s[_ngcontent-%COMP%] {\n  box-shadow: 4px 4px 0px #01131B;\n}\n.shadow-demo__box--m[_ngcontent-%COMP%] {\n  box-shadow: 6px 6px 0px #01131B;\n}\n.shadow-demo__box--l[_ngcontent-%COMP%] {\n  box-shadow: 8px 8px 0px #01131B;\n}\n.shadow-demo__box--vinyl-s[_ngcontent-%COMP%] {\n  box-shadow: 0.5rem 0.5rem 0px var(--vinyl-shadow-layer-1), 1rem 1rem 0px var(--vinyl-shadow-layer-2);\n}\n.shadow-demo__box--vinyl-m[_ngcontent-%COMP%] {\n  box-shadow:\n    0.5rem 0.5rem 0px var(--vinyl-shadow-layer-1),\n    1rem 1rem 0px var(--vinyl-shadow-layer-2),\n    1.5rem 1.5rem 0px var(--vinyl-shadow-layer-3);\n}\n.shadow-demo__box--vinyl-l[_ngcontent-%COMP%] {\n  box-shadow:\n    0.5rem 0.5rem 0px var(--vinyl-shadow-layer-1),\n    1rem 1rem 0px var(--vinyl-shadow-layer-2),\n    1.5rem 1.5rem 0px var(--vinyl-shadow-layer-3),\n    2rem 2rem 0px var(--vinyl-shadow-layer-4);\n}\n.shadow-demo[_ngcontent-%COMP%]   code[_ngcontent-%COMP%] {\n  text-align: center;\n}\n.spacing-grid[_ngcontent-%COMP%] {\n  display: grid;\n  grid-template-columns: repeat(auto-fit, minmax(16rem, 1fr));\n  gap: 2rem;\n}\n@media (max-width: 768px) {\n  .spacing-grid[_ngcontent-%COMP%] {\n    grid-template-columns: repeat(2, 1fr);\n    gap: 1rem;\n  }\n}\n@media (max-width: 320px) {\n  .spacing-grid[_ngcontent-%COMP%] {\n    grid-template-columns: 1fr;\n  }\n}\n.spacing-card[_ngcontent-%COMP%] {\n  background-color: var(--bg-secondary);\n  border: 3px solid var(--border-color);\n  border-radius: 5px;\n  padding: 2rem;\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n  gap: 1rem;\n  box-shadow: 2px 2px 0px #01131B;\n}\n.spacing-card__visual[_ngcontent-%COMP%] {\n  width: 100%;\n  height: 10rem;\n  background-color: var(--bg-primary);\n  border: 2px solid var(--border-color) dashed var(--border-color);\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  border-radius: 3px;\n}\n.spacing-card__block[_ngcontent-%COMP%] {\n  background-color: var(--color-primary);\n  border: 2px solid var(--border-color);\n  border-radius: 3px;\n}\n.spacing-card__info[_ngcontent-%COMP%] {\n  text-align: center;\n  display: flex;\n  flex-direction: column;\n  gap: 0.5rem;\n  width: 100%;\n}\n.spacing-card__name[_ngcontent-%COMP%] {\n  font-weight: 700;\n  font-size: 1rem;\n  color: var(--text-primary);\n  text-transform: uppercase;\n}\n.spacing-card__value[_ngcontent-%COMP%] {\n  font-size: 0.75rem;\n  color: var(--text-secondary);\n  font-family: "Courier New", monospace;\n}\n.spacing-card[_ngcontent-%COMP%]   code[_ngcontent-%COMP%] {\n  font-size: 0.6225rem;\n  padding: 0.5rem 0.75rem;\n  background-color: var(--bg-primary);\n  border: 1px solid var(--border-color);\n  border-radius: 3px;\n  color: var(--text-primary);\n}\n.link[_ngcontent-%COMP%] {\n  font-size: 1rem;\n  line-height: 1.5rem;\n  color: var(--color-primary);\n  text-decoration: none;\n  font-weight: 500;\n  position: relative;\n  display: inline-flex;\n  align-items: center;\n  gap: 0.5rem;\n  transition: all 150ms ease-in-out;\n}\n.link[_ngcontent-%COMP%]:hover {\n  color: var(--color-secondary);\n  transform: translateY(-1px);\n}\n.link[_ngcontent-%COMP%]:active {\n  transform: translateY(0);\n}\n.link[_ngcontent-%COMP%]:focus-visible {\n  outline: 2px solid var(--border-color) var(--color-accent);\n  outline-offset: 0.5rem;\n  border-radius: 3px;\n}\n.link--primary[_ngcontent-%COMP%] {\n  color: var(--color-primary);\n  font-weight: 600;\n}\n.link--primary[_ngcontent-%COMP%]:hover {\n  color: var(--color-secondary);\n}\n.link--underlined[_ngcontent-%COMP%]::after {\n  content: "";\n  position: absolute;\n  bottom: -2px;\n  left: 0;\n  width: 0;\n  height: 2px;\n  background-color: var(--color-primary);\n  transition: width 150ms ease-in-out;\n}\n.link--underlined[_ngcontent-%COMP%]:hover::after {\n  width: 100%;\n}\n.link--arrow[_ngcontent-%COMP%]:hover {\n  gap: calc(0.5rem + 0.5rem);\n}\n.toggle-wrapper[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 1rem;\n  cursor: pointer;\n  -webkit-user-select: none;\n  user-select: none;\n}\n.toggle-wrapper--disabled[_ngcontent-%COMP%] {\n  opacity: 0.6;\n  cursor: not-allowed;\n  pointer-events: none;\n}\n.toggle[_ngcontent-%COMP%] {\n  width: 50px;\n  height: 26px;\n  background-color: var(--bg-secondary);\n  border: 3px solid var(--border-color);\n  border-radius: 5px;\n  box-shadow: 2px 2px 0px #01131B;\n  cursor: pointer;\n  position: relative;\n  appearance: none;\n  transition: background-color 300ms ease-in-out;\n}\n.toggle[_ngcontent-%COMP%]::after {\n  content: "";\n  position: absolute;\n  width: 18px;\n  height: 18px;\n  background-color: var(--bg-primary);\n  border: 2px solid var(--border-color);\n  border-radius: 3px;\n  top: 2px;\n  left: 2px;\n  transition: transform 300ms ease-in-out cubic-bezier(0.25, 0.46, 0.45, 0.94);\n}\n.toggle[_ngcontent-%COMP%]:checked {\n  background-color: var(--color-primary);\n}\n.toggle[_ngcontent-%COMP%]:checked::after {\n  transform: translateX(24px);\n}\n.toggle[_ngcontent-%COMP%]:focus-visible {\n  outline: 2px solid var(--border-color) var(--color-accent);\n  outline-offset: 0.5rem;\n}\n.toggle[_ngcontent-%COMP%]:not(:disabled):hover {\n  box-shadow: 2px 2px 0px #01131B;\n}\n.toggle[_ngcontent-%COMP%]:disabled {\n  opacity: 0.5;\n  cursor: not-allowed;\n  pointer-events: none;\n}\n.toggle-label[_ngcontent-%COMP%] {\n  font-size: 1rem;\n  line-height: 1.5rem;\n  color: var(--text-primary);\n  font-weight: 500;\n}\n.checkbox-wrapper[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 0.5rem;\n  cursor: pointer;\n  -webkit-user-select: none;\n  user-select: none;\n}\n.checkbox-wrapper--disabled[_ngcontent-%COMP%] {\n  opacity: 0.6;\n  cursor: not-allowed;\n  pointer-events: none;\n}\n.checkbox[_ngcontent-%COMP%] {\n  width: 20px;\n  height: 20px;\n  border: 3px solid var(--border-color);\n  border-radius: 3px;\n  background-color: var(--bg-primary);\n  box-shadow: 2px 2px 0px #01131B;\n  cursor: pointer;\n  appearance: none;\n  position: relative;\n  transition: all 150ms ease-in-out;\n  flex-shrink: 0;\n}\n.checkbox[_ngcontent-%COMP%]:checked {\n  background-color: var(--color-primary);\n}\n.checkbox[_ngcontent-%COMP%]:checked::after {\n  content: "\\2713";\n  position: absolute;\n  top: 50%;\n  left: 50%;\n  transform: translate(-50%, -50%);\n  font-weight: 700;\n  font-size: 1rem;\n  color: var(--text-dark);\n}\n.checkbox[_ngcontent-%COMP%]:focus-visible {\n  outline: 2px solid var(--border-color) var(--color-accent);\n  outline-offset: 0.5rem;\n}\n.checkbox[_ngcontent-%COMP%]:not(:disabled):hover {\n  box-shadow: 2px 2px 0px #01131B;\n  transform: translate(-1px, -1px);\n}\n.checkbox[_ngcontent-%COMP%]:disabled {\n  opacity: 0.5;\n  cursor: not-allowed;\n  pointer-events: none;\n}\n.checkbox-label[_ngcontent-%COMP%] {\n  font-size: 1rem;\n  line-height: 1.5rem;\n  color: var(--text-primary);\n  font-weight: 400;\n}\n.radio-wrapper[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 0.5rem;\n  cursor: pointer;\n  -webkit-user-select: none;\n  user-select: none;\n}\n.radio-wrapper--disabled[_ngcontent-%COMP%] {\n  opacity: 0.6;\n  cursor: not-allowed;\n  pointer-events: none;\n}\n.radio[_ngcontent-%COMP%] {\n  width: 20px;\n  height: 20px;\n  border: 3px solid var(--border-color);\n  border-radius: 50%;\n  background-color: var(--bg-primary);\n  box-shadow: 2px 2px 0px #01131B;\n  cursor: pointer;\n  appearance: none;\n  position: relative;\n  transition: all 150ms ease-in-out;\n  flex-shrink: 0;\n}\n.radio[_ngcontent-%COMP%]:checked {\n  background-color: var(--color-primary);\n}\n.radio[_ngcontent-%COMP%]:checked::after {\n  content: "";\n  position: absolute;\n  top: 50%;\n  left: 50%;\n  transform: translate(-50%, -50%);\n  width: 1rem;\n  height: 1rem;\n  background-color: var(--text-dark);\n  border-radius: 50%;\n}\n.radio[_ngcontent-%COMP%]:focus-visible {\n  outline: 2px solid var(--border-color) var(--color-accent);\n  outline-offset: 0.5rem;\n}\n.radio[_ngcontent-%COMP%]:not(:disabled):hover {\n  box-shadow: 2px 2px 0px #01131B;\n  transform: translate(-1px, -1px);\n}\n.radio[_ngcontent-%COMP%]:disabled {\n  opacity: 0.5;\n  cursor: not-allowed;\n  pointer-events: none;\n}\n.radio-label[_ngcontent-%COMP%] {\n  font-size: 1rem;\n  line-height: 1.5rem;\n  color: var(--text-primary);\n  font-weight: 400;\n}\n.layout-info-card[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  gap: 0.5rem;\n  padding: 2rem;\n  background-color: var(--bg-primary);\n  border: 3px solid var(--border-color);\n  border-radius: 5px;\n  box-shadow: 4px 4px 0px #01131B;\n  transition: all 150ms ease-in-out;\n}\n.layout-info-card[_ngcontent-%COMP%]:hover {\n  transform: translate(-2px, -2px);\n  box-shadow: 6px 6px 0px #01131B;\n}\n.layout-info-card__header[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 1rem;\n  padding-bottom: 0.5rem;\n  border-bottom: 2px solid var(--border-color);\n}\n.layout-info-card__icon[_ngcontent-%COMP%] {\n  width: 4rem;\n  height: 4rem;\n  stroke: var(--color-primary);\n  flex-shrink: 0;\n}\n.layout-info-card__name[_ngcontent-%COMP%] {\n  font-family: "Courier New", monospace;\n  font-size: 0.875rem;\n  font-weight: 700;\n  color: var(--text-primary);\n}\n.layout-info-card__desc[_ngcontent-%COMP%] {\n  font-size: 0.875rem;\n  color: var(--text-secondary);\n  line-height: 1.5rem;\n  margin: 0;\n}\n.layout-info-card__vars[_ngcontent-%COMP%] {\n  display: flex;\n  flex-wrap: wrap;\n  gap: 0.5rem;\n  margin-top: auto;\n}\n.layout-info-card__vars[_ngcontent-%COMP%]   code[_ngcontent-%COMP%] {\n  font-size: 0.75rem;\n  padding: 0.5rem 0.5rem;\n  background-color: var(--bg-secondary);\n  border: 1px solid var(--border-color);\n  border-radius: 3px;\n  color: var(--color-primary);\n}\n.showcase__row--wrap[_ngcontent-%COMP%] {\n  display: flex;\n  flex-wrap: wrap;\n  gap: 3rem;\n  justify-content: center;\n  align-items: flex-start;\n}\n.showcase__item--breakpoint[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n  gap: 1rem;\n}\n.showcase__item--breakpoint[_ngcontent-%COMP%]   app-card[_ngcontent-%COMP%] {\n  width: 18rem;\n}\n.showcase__item--breakpoint[_ngcontent-%COMP%]   code[_ngcontent-%COMP%] {\n  font-size: 0.75rem;\n  padding: 0.5rem 1rem;\n  background-color: var(--bg-secondary);\n  border: 2px solid var(--border-color);\n  border-radius: 3px;\n  color: var(--color-primary);\n  font-weight: 600;\n}\n.showcase__code[_ngcontent-%COMP%] {\n  display: block;\n  text-align: center;\n}\n.z-index-scale[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  gap: 0.5rem;\n  max-width: 600px;\n  margin: 0 auto;\n}\n.z-index-scale__item[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 1rem;\n  padding: 0.5rem 1rem;\n  background-color: var(--bg-secondary);\n  border: 2px solid var(--border-color);\n  border-radius: 3px;\n  transition: all 150ms ease-in-out;\n}\n.z-index-scale__item[_ngcontent-%COMP%]:hover {\n  transform: translateX(4px);\n  box-shadow: 2px 2px 0px #01131B;\n}\n.z-index-scale__item--10[_ngcontent-%COMP%] {\n  background-color: color-mix(in srgb, #E04A4A 30%, transparent);\n}\n.z-index-scale__item--9[_ngcontent-%COMP%] {\n  background-color: color-mix(in srgb, #E04A4A 20%, transparent);\n}\n.z-index-scale__item--8[_ngcontent-%COMP%] {\n  background-color: color-mix(in srgb, #FFC047 30%, transparent);\n}\n.z-index-scale__item--7[_ngcontent-%COMP%] {\n  background-color: color-mix(in srgb, #FFC047 20%, transparent);\n}\n.z-index-scale__item--6[_ngcontent-%COMP%] {\n  background-color: color-mix(in srgb, #ED9C05 30%, transparent);\n}\n.z-index-scale__item--5[_ngcontent-%COMP%] {\n  background-color: color-mix(in srgb, #ED9C05 20%, transparent);\n}\n.z-index-scale__item--4[_ngcontent-%COMP%] {\n  background-color: color-mix(in srgb, #AAD661 30%, transparent);\n}\n.z-index-scale__item--3[_ngcontent-%COMP%] {\n  background-color: color-mix(in srgb, #AAD661 20%, transparent);\n}\n.z-index-scale__item--2[_ngcontent-%COMP%] {\n  background-color: color-mix(in srgb, #0A9295 20%, transparent);\n}\n.z-index-scale__item--1[_ngcontent-%COMP%] {\n  background-color: color-mix(in srgb, #0A9295 10%, transparent);\n}\n.z-index-scale__item--0[_ngcontent-%COMP%] {\n  background-color: var(--bg-primary);\n}\n.z-index-scale__level[_ngcontent-%COMP%] {\n  width: 4.5rem;\n  height: 4.5rem;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  background-color: var(--color-primary);\n  border: 2px solid var(--border-color);\n  border-radius: 3px;\n  font-weight: 700;\n  font-size: 0.875rem;\n  color: var(--text-dark);\n  flex-shrink: 0;\n}\n.z-index-scale__name[_ngcontent-%COMP%] {\n  flex: 1;\n  font-family: "Courier New", monospace;\n  font-size: 0.875rem;\n  font-weight: 600;\n  color: var(--text-primary);\n}\n.z-index-scale__desc[_ngcontent-%COMP%] {\n  font-size: 0.75rem;\n  color: var(--text-secondary);\n  text-align: right;\n}\n@media (max-width: 768px) {\n  .z-index-scale__desc[_ngcontent-%COMP%] {\n    display: none;\n  }\n}\n.css-var-card[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n  gap: 0.5rem;\n  padding: 2rem;\n  background-color: var(--bg-primary);\n  border: 3px solid var(--border-color);\n  border-radius: 5px;\n  box-shadow: 2px 2px 0px #01131B;\n  transition: all 150ms ease-in-out;\n}\n.css-var-card[_ngcontent-%COMP%]:hover {\n  transform: translate(-2px, -2px);\n  box-shadow: 6px 6px 0px #01131B;\n}\n.css-var-card__name[_ngcontent-%COMP%] {\n  font-family: "Courier New", monospace;\n  font-size: 0.75rem;\n  font-weight: 600;\n  color: var(--color-primary);\n  text-align: center;\n}\n.css-var-card__swatch[_ngcontent-%COMP%] {\n  width: 8rem;\n  height: 8rem;\n  border: 3px solid var(--border-color);\n  border-radius: 3px;\n  box-shadow: 2px 2px 0px #01131B;\n}\n.css-var-card__desc[_ngcontent-%COMP%] {\n  font-size: 0.75rem;\n  color: var(--text-secondary);\n  text-align: center;\n}\n/*# sourceMappingURL=style-guide.css.map */'] });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(StyleGuide, [{
    type: Component,
    args: [{ selector: "app-style-guide", standalone: true, imports: [
      CommonModule,
      ReactiveFormsModule,
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
      ResponsiveTabs,
      TabPanel,
      Tooltip,
      Spinner,
      ProgressBar
    ], template: `<div class="style-guide">\r
  <!-- ============================================ -->\r
  <!-- SIDEBAR FLOTANTE PARA NAVEGACI\xD3N DE SECCIONES -->\r
  <!-- ============================================ -->\r
  <aside class="style-guide__sidebar" [class.style-guide__sidebar--open]="sidebarOpen()">\r
    <!-- Bot\xF3n toggle -->\r
    <button class="style-guide__sidebar-toggle"\r
            (click)="toggleSidebar(); $event.stopPropagation()"\r
            [attr.aria-expanded]="sidebarOpen()"\r
            aria-haspopup="menu"\r
            aria-label="Men\xFA de secciones de la gu\xEDa de estilos">\r
      <span class="style-guide__sidebar-icon" aria-hidden="true">\u2630</span>\r
    </button>\r
\r
    <!-- Men\xFA desplegable -->\r
    <ul class="style-guide__sidebar-menu" role="menu">\r
      <li class="style-guide__sidebar-item" role="none">\r
        <button type="button" role="menuitem"\r
                class="style-guide__sidebar-link"\r
                [class.style-guide__sidebar-link--active]="activeSection() === 'foundations'"\r
                (click)="selectSection('foundations'); closeSidebar()">Fundamentos</button>\r
      </li>\r
      <li class="style-guide__sidebar-item" role="none">\r
        <button type="button" role="menuitem"\r
                class="style-guide__sidebar-link"\r
                [class.style-guide__sidebar-link--active]="activeSection() === 'atoms'"\r
                (click)="selectSection('atoms'); closeSidebar()">\xC1tomos</button>\r
      </li>\r
      <li class="style-guide__sidebar-item" role="none">\r
        <button type="button" role="menuitem"\r
                class="style-guide__sidebar-link"\r
                [class.style-guide__sidebar-link--active]="activeSection() === 'molecules'"\r
                (click)="selectSection('molecules'); closeSidebar()">Mol\xE9culas</button>\r
      </li>\r
      <li class="style-guide__sidebar-item" role="none">\r
        <button type="button" role="menuitem"\r
                class="style-guide__sidebar-link"\r
                [class.style-guide__sidebar-link--active]="activeSection() === 'organisms'"\r
                (click)="selectSection('organisms'); closeSidebar()">Organismos</button>\r
      </li>\r
      <li class="style-guide__sidebar-item" role="none">\r
        <button type="button" role="menuitem"\r
                class="style-guide__sidebar-link"\r
                [class.style-guide__sidebar-link--active]="activeSection() === 'layout'"\r
                (click)="selectSection('layout'); closeSidebar()">Layout</button>\r
      </li>\r
    </ul>\r
  </aside>\r
\r
  <div class="style-guide__container">\r
    <header class="style-guide__header">\r
      <h1>Gu\xEDa de Estilo</h1>\r
      <p class="style-guide__intro">Sistema de componentes reutilizables para Disc and Records</p>\r
    </header>\r
\r
    <!-- ============================================ -->\r
    <!-- SECCI\xD3N 1: FUNDAMENTOS -->\r
    <!-- ============================================ -->\r
    @if (activeSection() === 'foundations') {\r
      <section class="style-guide__section">\r
        <h2>Fundamentos del Sistema de Dise\xF1o</h2>\r
        <p class="showcase__description">\r
          Variables CSS, tipograf\xEDa, colores y espaciado que definen la identidad visual de Disc and Records.\r
        </p>\r
\r
        <!-- Tipograf\xEDa -->\r
        <div class="showcase">\r
          <h3>Tipograf\xEDa</h3>\r
\r
          <!-- Space Grotesk - Fuente principal -->\r
          <div class="font-showcase">\r
            <div class="font-showcase__header">\r
              <h4>Space Grotesk</h4>\r
              <span class="font-showcase__tag">Fuente Principal</span>\r
            </div>\r
            <div class="font-showcase__samples" style="font-family: 'Space Grotesk', sans-serif;">\r
              <div class="font-showcase__sample">\r
                <span class="font-showcase__label">Heading 1 (68px)</span>\r
                <h1>Disc and Records</h1>\r
              </div>\r
              <div class="font-showcase__sample">\r
                <span class="font-showcase__label">Heading 2 (42px)</span>\r
                <h2>La m\xFAsica que marc\xF3 una \xE9poca</h2>\r
              </div>\r
              <div class="font-showcase__sample">\r
                <span class="font-showcase__label">Heading 3 (26px)</span>\r
                <h3>Explora nuestra colecci\xF3n</h3>\r
              </div>\r
              <div class="font-showcase__sample">\r
                <span class="font-showcase__label">P\xE1rrafo (16px)</span>\r
                <p>Textos de cuerpo, descripciones de productos, contenido general. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Perfecta legibilidad para lectura extendida.</p>\r
              </div>\r
              <div class="font-showcase__sample">\r
                <span class="font-showcase__label">Peque\xF1o (14px)</span>\r
                <p class="text-small">Subt\xEDtulos, notas y textos secundarios</p>\r
              </div>\r
            </div>\r
            <div class="font-showcase__usage">\r
              <strong>Uso:</strong> Textos generales, t\xEDtulos, botones, navegaci\xF3n, formularios\r
            </div>\r
          </div>\r
\r
          <!-- Monoton - Fuente secundaria -->\r
          <div class="font-showcase">\r
            <div class="font-showcase__header">\r
              <h4>Monoton</h4>\r
              <span class="font-showcase__tag font-showcase__tag--accent">Fuente Display</span>\r
            </div>\r
            <div class="font-showcase__samples" style="font-family: 'Monoton', cursive;">\r
              <div class="font-showcase__sample">\r
                <span class="font-showcase__label">Grande (64px)</span>\r
                <div class="monoton-sample monoton-sample--lg">D&R</div>\r
              </div>\r
              <div class="font-showcase__sample">\r
                <span class="font-showcase__label">Mediano (48px)</span>\r
                <div class="monoton-sample monoton-sample--md">RETRO</div>\r
              </div>\r
              <div class="font-showcase__sample">\r
                <span class="font-showcase__label">Peque\xF1o (32px)</span>\r
                <div class="monoton-sample monoton-sample--sm">70s VIBES</div>\r
              </div>\r
            </div>\r
            <div class="font-showcase__usage">\r
              <strong>Uso:</strong> Logo, t\xEDtulos decorativos, elementos destacados con est\xE9tica retro/70s\r
            </div>\r
          </div>\r
        </div>\r
\r
        <!-- Colores -->\r
        <div class="showcase">\r
          <h3>Paleta de Colores 70s</h3>\r
          <p class="showcase__description">\r
            Colores principales del modo claro (c\xE1lidos) y oscuro (fr\xEDos). Ambas paletas siempre visibles.\r
          </p>\r
\r
          <!-- Modo Light - C\xE1lidos -->\r
          <h4 class="color-section-title">Modo Light (C\xE1lidos)</h4>\r
          <div class="color-grid">\r
            <div class="color-card">\r
              <div class="color-card__swatch" style="background-color: var(--color-primary);"></div>\r
              <div class="color-card__info">\r
                <div class="color-card__name">Primario</div>\r
                <div class="color-card__hex">#ED9C05</div>\r
                <code>$color-primario-light</code>\r
              </div>\r
            </div>\r
            <div class="color-card">\r
              <div class="color-card__swatch" style="background-color: var(--color-secondary);"></div>\r
              <div class="color-card__info">\r
                <div class="color-card__name">Secundario</div>\r
                <div class="color-card__hex">#CA6703</div>\r
                <code>$color-secundario-light</code>\r
              </div>\r
            </div>\r
            <div class="color-card">\r
              <div class="color-card__swatch" style="background-color: var(--color-contrast);"></div>\r
              <div class="color-card__info">\r
                <div class="color-card__name">Contraste</div>\r
                <div class="color-card__hex">#BB3F03</div>\r
                <code>$color-contraste-light</code>\r
              </div>\r
            </div>\r
            <div class="color-card">\r
              <div class="color-card__swatch" style="background-color: var(--color-accent);"></div>\r
              <div class="color-card__info">\r
                <div class="color-card__name">Acentuado</div>\r
                <div class="color-card__hex">#9D2227</div>\r
                <code>$color-acentuado-light</code>\r
              </div>\r
            </div>\r
          </div>\r
\r
          <!-- Modo Dark - Fr\xEDos -->\r
          <h4 class="color-section-title">Modo Dark (Fr\xEDos)</h4>\r
          <div class="color-grid">\r
            <div class="color-card">\r
              <div class="color-card__swatch" style="background-color: var(--color-stripe-1);"></div>\r
              <div class="color-card__info">\r
                <div class="color-card__name">Primario</div>\r
                <div class="color-card__hex">#93CFBB</div>\r
                <code>$color-primario-dark</code>\r
              </div>\r
            </div>\r
            <div class="color-card">\r
              <div class="color-card__swatch" style="background-color: var(--color-stripe-2);"></div>\r
              <div class="color-card__info">\r
                <div class="color-card__name">Secundario</div>\r
                <div class="color-card__hex">#0A9295</div>\r
                <code>$color-secundario-dark</code>\r
              </div>\r
            </div>\r
            <div class="color-card">\r
              <div class="color-card__swatch" style="background-color: #015F72;"></div>\r
              <div class="color-card__info">\r
                <div class="color-card__name">Contraste</div>\r
                <div class="color-card__hex">#015F72</div>\r
                <code>$color-contraste-dark</code>\r
              </div>\r
            </div>\r
            <div class="color-card">\r
              <div class="color-card__swatch" style="background-color: #01131B;"></div>\r
              <div class="color-card__info">\r
                <div class="color-card__name">Acentuado</div>\r
                <div class="color-card__hex">#01131B</div>\r
                <code>$color-acentuado-dark</code>\r
              </div>\r
            </div>\r
          </div>\r
\r
          <!-- Fondos y Textos -->\r
          <h4 class="color-section-title">Fondos y Textos</h4>\r
          <div class="color-grid">\r
            <div class="color-card">\r
              <div class="color-card__swatch" style="background-color: var(--bg-primary);"></div>\r
              <div class="color-card__info">\r
                <div class="color-card__name">Fondo Light</div>\r
                <div class="color-card__hex">#FBFAF2</div>\r
                <code>$color-fondo-light</code>\r
              </div>\r
            </div>\r
            <div class="color-card">\r
              <div class="color-card__swatch" style="background-color: var(--bg-secondary);"></div>\r
              <div class="color-card__info">\r
                <div class="color-card__name">Fondo Light 2\xBA</div>\r
                <div class="color-card__hex">#E7D8AB</div>\r
                <code>$color-fondo-light-secundario</code>\r
              </div>\r
            </div>\r
            <div class="color-card">\r
              <div class="color-card__swatch" style="background-color: var(--text-dark);"></div>\r
              <div class="color-card__info">\r
                <div class="color-card__name">Fondo Oscuro</div>\r
                <div class="color-card__hex">#01131B</div>\r
                <code>$color-fondo-oscuro</code>\r
              </div>\r
            </div>\r
            <div class="color-card">\r
              <div class="color-card__swatch" style="background-color: #013946;"></div>\r
              <div class="color-card__info">\r
                <div class="color-card__name">Fondo Oscuro 2\xBA</div>\r
                <div class="color-card__hex">#013946</div>\r
                <code>$color-fondo-oscuro-secundario</code>\r
              </div>\r
            </div>\r
            <div class="color-card">\r
              <div class="color-card__swatch" style="background-color: var(--text-white);"></div>\r
              <div class="color-card__info">\r
                <div class="color-card__name">Letra Blanca</div>\r
                <div class="color-card__hex">#FBFAF2</div>\r
                <code>$color-letra-blanca</code>\r
              </div>\r
            </div>\r
            <div class="color-card">\r
              <div class="color-card__swatch" style="background-color: var(--text-dark);"></div>\r
              <div class="color-card__info">\r
                <div class="color-card__name">Letra Oscura</div>\r
                <div class="color-card__hex">#01131B</div>\r
                <code>$color-letra-oscura</code>\r
              </div>\r
            </div>\r
          </div>\r
        </div>\r
\r
        <!-- Colores sem\xE1nticos -->\r
        <div class="showcase">\r
          <h3>Colores Sem\xE1nticos</h3>\r
          <div class="color-grid color-grid--semantic">\r
            <div class="color-card">\r
              <div class="color-card__swatch" style="background-color: var(--color-error);"></div>\r
              <div class="color-card__info">\r
                <div class="color-card__name">Error</div>\r
                <div class="color-card__hex">#E04A4A</div>\r
                <code>$color-error</code>\r
              </div>\r
            </div>\r
            <div class="color-card">\r
              <div class="color-card__swatch" style="background-color: var(--color-warning);"></div>\r
              <div class="color-card__info">\r
                <div class="color-card__name">Advertencia Light</div>\r
                <div class="color-card__hex">#FFC047</div>\r
                <code>$color-advertencia-light</code>\r
              </div>\r
            </div>\r
            <div class="color-card">\r
              <div class="color-card__swatch" style="background-color: #FEF84A;"></div>\r
              <div class="color-card__info">\r
                <div class="color-card__name">Advertencia Dark</div>\r
                <div class="color-card__hex">#FEF84A</div>\r
                <code>$color-advertencia-dark</code>\r
              </div>\r
            </div>\r
            <div class="color-card">\r
              <div class="color-card__swatch" style="background-color: var(--color-success);"></div>\r
              <div class="color-card__info">\r
                <div class="color-card__name">\xC9xito</div>\r
                <div class="color-card__hex">#AAD661</div>\r
                <code>$color-exito</code>\r
              </div>\r
            </div>\r
            <div class="color-card">\r
              <div class="color-card__swatch" style="background-color: var(--color-info);"></div>\r
              <div class="color-card__info">\r
                <div class="color-card__name">Informaci\xF3n</div>\r
                <div class="color-card__hex">#0A9295</div>\r
                <code>$color-informacion</code>\r
              </div>\r
            </div>\r
          </div>\r
        </div>\r
\r
        <!-- Sombras -->\r
        <div class="showcase">\r
          <h3>Sombras Brutales</h3>\r
          <p class="showcase__description">\r
            Sombras s\xF3lidas sin blur, caracter\xEDsticas del estilo neobrutalist y la est\xE9tica retro 70s.\r
          </p>\r
          <div class="showcase__row">\r
            <div class="shadow-demo">\r
              <div class="shadow-demo__box shadow-demo__box--xs">\r
                Box\r
              </div>\r
              <code>brutal-xs<br/>2px 2px 0px</code>\r
            </div>\r
            <div class="shadow-demo">\r
              <div class="shadow-demo__box shadow-demo__box--s">\r
                Box\r
              </div>\r
              <code>brutal-s<br/>4px 4px 0px</code>\r
            </div>\r
            <div class="shadow-demo">\r
              <div class="shadow-demo__box shadow-demo__box--m">\r
                Box\r
              </div>\r
              <code>brutal-m<br/>6px 6px 0px</code>\r
            </div>\r
            <div class="shadow-demo">\r
              <div class="shadow-demo__box shadow-demo__box--l">\r
                Box\r
              </div>\r
              <code>brutal-l<br/>8px 8px 0px</code>\r
            </div>\r
          </div>\r
\r
          <h4 style="margin-top: 2rem;">Sombras Efecto Vinilo</h4>\r
          <p class="showcase__description">\r
            Sombras multicapa con colores de la paleta 70s, efecto 3D retro.\r
          </p>\r
          <div class="showcase__row">\r
            <div class="shadow-demo">\r
              <div class="shadow-demo__box shadow-demo__box--vinyl-s">\r
                Box\r
              </div>\r
              <code>vinilo-s<br/>2 capas</code>\r
            </div>\r
            <div class="shadow-demo">\r
              <div class="shadow-demo__box shadow-demo__box--vinyl-m">\r
                Box\r
              </div>\r
              <code>vinilo-m<br/>3 capas</code>\r
            </div>\r
            <div class="shadow-demo">\r
              <div class="shadow-demo__box shadow-demo__box--vinyl-l">\r
                Box\r
              </div>\r
              <code>vinilo-l<br/>4 capas</code>\r
            </div>\r
          </div>\r
        </div>\r
\r
        <!-- Espaciado -->\r
        <div class="showcase">\r
          <h3>Espaciado</h3>\r
          <p class="showcase__description">\r
            Sistema de espaciado coherente para mantener ritmo visual en toda la aplicaci\xF3n.\r
          </p>\r
          <div class="spacing-grid">\r
            <div class="spacing-card">\r
              <div class="spacing-card__visual">\r
                <div class="spacing-card__block" style="width: 0.5rem; height: 0.5rem;"></div>\r
              </div>\r
              <div class="spacing-card__info">\r
                <div class="spacing-card__name">XS</div>\r
                <div class="spacing-card__value">0.5rem (8px)</div>\r
                <code>$espaciado-xs</code>\r
              </div>\r
            </div>\r
            <div class="spacing-card">\r
              <div class="spacing-card__visual">\r
                <div class="spacing-card__block" style="width: 1rem; height: 1rem;"></div>\r
              </div>\r
              <div class="spacing-card__info">\r
                <div class="spacing-card__name">S</div>\r
                <div class="spacing-card__value">1rem (16px)</div>\r
                <code>$espaciado-s</code>\r
              </div>\r
            </div>\r
            <div class="spacing-card">\r
              <div class="spacing-card__visual">\r
                <div class="spacing-card__block" style="width: 2rem; height: 2rem;"></div>\r
              </div>\r
              <div class="spacing-card__info">\r
                <div class="spacing-card__name">M</div>\r
                <div class="spacing-card__value">2rem (32px)</div>\r
                <code>$espaciado-m</code>\r
              </div>\r
            </div>\r
            <div class="spacing-card">\r
              <div class="spacing-card__visual">\r
                <div class="spacing-card__block" style="width: 3rem; height: 3rem;"></div>\r
              </div>\r
              <div class="spacing-card__info">\r
                <div class="spacing-card__name">L</div>\r
                <div class="spacing-card__value">3rem (48px)</div>\r
                <code>$espaciado-l</code>\r
              </div>\r
            </div>\r
            <div class="spacing-card">\r
              <div class="spacing-card__visual">\r
                <div class="spacing-card__block" style="width: 4rem; height: 4rem;"></div>\r
              </div>\r
              <div class="spacing-card__info">\r
                <div class="spacing-card__name">XL</div>\r
                <div class="spacing-card__value">4rem (64px)</div>\r
                <code>$espaciado-xl</code>\r
              </div>\r
            </div>\r
            <div class="spacing-card">\r
              <div class="spacing-card__visual">\r
                <div class="spacing-card__block" style="width: 5rem; height: 5rem;"></div>\r
              </div>\r
              <div class="spacing-card__info">\r
                <div class="spacing-card__name">XXL</div>\r
                <div class="spacing-card__value">5rem (80px)</div>\r
                <code>$espaciado-xxl</code>\r
              </div>\r
            </div>\r
          </div>\r
        </div>\r
      </section>\r
    }\r
\r
    <!-- ============================================ -->\r
    <!-- SECCI\xD3N 2: \xC1TOMOS -->\r
    <!-- ============================================ -->\r
    @if (activeSection() === 'atoms') {\r
      <section class="style-guide__section">\r
        <h2>\xC1tomos</h2>\r
        <p class="showcase__description">\r
          Los elementos m\xE1s b\xE1sicos: botones, spinners, barras de progreso y badges.\r
        </p>\r
\r
        <!-- Botones: Variantes -->\r
        <div class="showcase">\r
          <h3>Botones - Variantes</h3>\r
          <div class="showcase__row">\r
            <div class="showcase__item">\r
              <app-button variant="primary" (clicked)="onButtonClick('primary', 'md')">\r
                Primary\r
              </app-button>\r
              <code>variant="primary"</code>\r
            </div>\r
            <div class="showcase__item">\r
              <app-button variant="secondary" (clicked)="onButtonClick('secondary', 'md')">\r
                Secondary\r
              </app-button>\r
              <code>variant="secondary"</code>\r
            </div>\r
            <div class="showcase__item">\r
              <app-button variant="ghost" (clicked)="onButtonClick('ghost', 'md')">\r
                Ghost\r
              </app-button>\r
              <code>variant="ghost"</code>\r
            </div>\r
            <div class="showcase__item">\r
              <app-button variant="danger" (clicked)="onButtonClick('danger', 'md')">\r
                Danger\r
              </app-button>\r
              <code>variant="danger"</code>\r
            </div>\r
          </div>\r
        </div>\r
\r
        <!-- Botones: Tama\xF1os -->\r
        <div class="showcase">\r
          <h3>Botones - Tama\xF1os</h3>\r
          <div class="showcase__row">\r
            <div class="showcase__item">\r
              <app-button size="sm" (clicked)="onButtonClick('primary', 'sm')">\r
                Small\r
              </app-button>\r
              <code>size="sm"</code>\r
            </div>\r
            <div class="showcase__item">\r
              <app-button size="md" (clicked)="onButtonClick('primary', 'md')">\r
                Medium\r
              </app-button>\r
              <code>size="md"</code>\r
            </div>\r
            <div class="showcase__item">\r
              <app-button size="lg" (clicked)="onButtonClick('primary', 'lg')">\r
                Large\r
              </app-button>\r
              <code>size="lg"</code>\r
            </div>\r
          </div>\r
        </div>\r
\r
        <!-- Botones: Estados -->\r
        <div class="showcase">\r
          <h3>Botones - Estados</h3>\r
          <div class="showcase__row">\r
            <div class="showcase__item">\r
              <app-button>Normal</app-button>\r
              <code>Estado por defecto</code>\r
            </div>\r
            <div class="showcase__item">\r
              <app-button [disabled]="true">Disabled</app-button>\r
              <code>[disabled]="true"</code>\r
            </div>\r
            <div class="showcase__item">\r
              <app-button href="#">Como enlace</app-button>\r
              <code>href="#"</code>\r
            </div>\r
            <div class="showcase__item">\r
              <app-button [loading]="true">Loading</app-button>\r
              <code>[loading]="true"</code>\r
            </div>\r
          </div>\r
        </div>\r
\r
        <!-- Botones: Full Width -->\r
        <div class="showcase">\r
          <h3>Botones - Full Width</h3>\r
          <div class="showcase__column">\r
            <div class="showcase__item showcase__item--full">\r
              <app-button [fullWidth]="true" (clicked)="onButtonClick('primary', 'md')">\r
                Bot\xF3n a ancho completo\r
              </app-button>\r
              <code>[fullWidth]="true"</code>\r
            </div>\r
          </div>\r
        </div>\r
\r
        <!-- Spinner -->\r
        <div class="showcase">\r
          <h3>Spinner</h3>\r
          <div class="showcase__row">\r
            <div class="showcase__item">\r
              <app-spinner [show]="true" mode="inline" size="sm"></app-spinner>\r
              <code>size="sm"</code>\r
            </div>\r
            <div class="showcase__item">\r
              <app-spinner [show]="true" mode="inline" size="md"></app-spinner>\r
              <code>size="md"</code>\r
            </div>\r
            <div class="showcase__item">\r
              <app-spinner [show]="true" mode="inline" size="lg"></app-spinner>\r
              <code>size="lg"</code>\r
            </div>\r
          </div>\r
          <div class="showcase__row" style="margin-top: 1rem;">\r
            <div class="showcase__item">\r
              <app-spinner [show]="true" mode="inline" color="primary"></app-spinner>\r
              <code>color="primary"</code>\r
            </div>\r
            <div class="showcase__item">\r
              <app-spinner [show]="true" mode="inline" color="secondary"></app-spinner>\r
              <code>color="secondary"</code>\r
            </div>\r
            <div class="showcase__item" style="background: var(--color-border); padding: 1rem;">\r
              <app-spinner [show]="true" mode="inline" color="white"></app-spinner>\r
              <code style="color: white;">color="white"</code>\r
            </div>\r
          </div>\r
        </div>\r
\r
        <!-- Spinner Global -->\r
        <div class="showcase">\r
          <h3>Spinner Global</h3>\r
          <p class="showcase__description">\r
            El spinner global muestra un overlay sobre toda la aplicaci\xF3n.\r
          </p>\r
          <div class="showcase__row">\r
            <div class="showcase__item">\r
              <app-button (clicked)="showGlobalSpinner()">\r
                Mostrar Spinner Global (2s)\r
              </app-button>\r
              <code>loadingService.start()</code>\r
            </div>\r
          </div>\r
        </div>\r
\r
        <!-- Progress Bar -->\r
        <div class="showcase">\r
          <h3>Barra de Progreso</h3>\r
          <div class="showcase__column">\r
            <div class="showcase__item showcase__item--full">\r
              <app-progress-bar [value]="25" size="sm"></app-progress-bar>\r
              <code>value="25" size="sm"</code>\r
            </div>\r
            <div class="showcase__item showcase__item--full">\r
              <app-progress-bar [value]="50" size="md" [showLabel]="true"></app-progress-bar>\r
              <code>value="50" size="md" showLabel</code>\r
            </div>\r
            <div class="showcase__item showcase__item--full">\r
              <app-progress-bar [value]="75" size="lg" [showLabel]="true"></app-progress-bar>\r
              <code>value="75" size="lg" showLabel</code>\r
            </div>\r
          </div>\r
        </div>\r
\r
        <!-- Progress Bar Variantes -->\r
        <div class="showcase">\r
          <h3>Progress Bar - Variantes de Color</h3>\r
          <div class="showcase__column">\r
            <div class="showcase__item showcase__item--full">\r
              <app-progress-bar [value]="60" variant="primary" [showLabel]="true"></app-progress-bar>\r
              <code>variant="primary"</code>\r
            </div>\r
            <div class="showcase__item showcase__item--full">\r
              <app-progress-bar [value]="60" variant="success" [showLabel]="true"></app-progress-bar>\r
              <code>variant="success"</code>\r
            </div>\r
            <div class="showcase__item showcase__item--full">\r
              <app-progress-bar [value]="60" variant="warning" [showLabel]="true"></app-progress-bar>\r
              <code>variant="warning"</code>\r
            </div>\r
            <div class="showcase__item showcase__item--full">\r
              <app-progress-bar [value]="60" variant="error" [showLabel]="true"></app-progress-bar>\r
              <code>variant="error"</code>\r
            </div>\r
          </div>\r
        </div>\r
\r
        <!-- Progress Bar Estados Especiales -->\r
        <div class="showcase">\r
          <h3>Progress Bar - Estados Especiales</h3>\r
          <div class="showcase__column">\r
            <div class="showcase__item showcase__item--full">\r
              <app-progress-bar [indeterminate]="true"></app-progress-bar>\r
              <code>indeterminate="true" (animaci\xF3n continua)</code>\r
            </div>\r
            <div class="showcase__item showcase__item--full">\r
              <app-progress-bar [value]="75" [striped]="true" [showLabel]="true"></app-progress-bar>\r
              <code>striped="true" (rayas animadas)</code>\r
            </div>\r
          </div>\r
        </div>\r
\r
        <!-- Progress Demo Interactivo -->\r
        <div class="showcase">\r
          <h3>Demo Interactivo</h3>\r
          <p class="showcase__description">\r
            Simula una operaci\xF3n de carga con progreso.\r
          </p>\r
          <div class="showcase__column">\r
            <div class="showcase__item showcase__item--full">\r
              <app-progress-bar\r
                [value]="demoProgress"\r
                [showLabel]="true"\r
                [variant]="demoProgress === 100 ? 'success' : 'primary'"\r
                size="lg">\r
              </app-progress-bar>\r
            </div>\r
            <div class="showcase__row" style="margin-top: 1rem;">\r
              <div class="showcase__item">\r
                <app-button\r
                  [disabled]="isProgressRunning"\r
                  (clicked)="startProgressDemo()">\r
                  {{ isProgressRunning ? 'En progreso...' : 'Iniciar Demo' }}\r
                </app-button>\r
              </div>\r
              <div class="showcase__item">\r
                <app-button\r
                  variant="secondary"\r
                  (clicked)="resetProgressDemo()"\r
                  [disabled]="demoProgress === 0">\r
                  Reiniciar\r
                </app-button>\r
              </div>\r
            </div>\r
          </div>\r
        </div>\r
\r
        <!-- Badges -->\r
        <div class="showcase">\r
          <h3>Badges - Variantes</h3>\r
          <div class="showcase__row">\r
            <div class="showcase__item">\r
              <app-badge variant="primary">Primary</app-badge>\r
              <code>variant="primary"</code>\r
            </div>\r
            <div class="showcase__item">\r
              <app-badge variant="secondary">Secondary</app-badge>\r
              <code>variant="secondary"</code>\r
            </div>\r
            <div class="showcase__item">\r
              <app-badge variant="success">Success</app-badge>\r
              <code>variant="success"</code>\r
            </div>\r
            <div class="showcase__item">\r
              <app-badge variant="warning">Warning</app-badge>\r
              <code>variant="warning"</code>\r
            </div>\r
            <div class="showcase__item">\r
              <app-badge variant="error">Error</app-badge>\r
              <code>variant="error"</code>\r
            </div>\r
            <div class="showcase__item">\r
              <app-badge variant="info">Info</app-badge>\r
              <code>variant="info"</code>\r
            </div>\r
          </div>\r
        </div>\r
\r
        <!-- Badges - Tama\xF1os -->\r
        <div class="showcase">\r
          <h3>Badges - Tama\xF1os</h3>\r
          <div class="showcase__row">\r
            <div class="showcase__item">\r
              <app-badge size="sm" variant="primary">Small</app-badge>\r
              <code>size="sm"</code>\r
            </div>\r
            <div class="showcase__item">\r
              <app-badge size="md" variant="primary">Medium</app-badge>\r
              <code>size="md"</code>\r
            </div>\r
            <div class="showcase__item">\r
              <app-badge size="lg" variant="primary">Large</app-badge>\r
              <code>size="lg"</code>\r
            </div>\r
          </div>\r
        </div>\r
\r
        <!-- Badges - Uso pr\xE1ctico -->\r
        <div class="showcase">\r
          <h3>Badges - Uso Pr\xE1ctico</h3>\r
          <div class="showcase__row">\r
            <div class="showcase__item">\r
              <div style="display: flex; gap: 0.5rem; flex-wrap: wrap;">\r
                <app-badge variant="primary">Rock</app-badge>\r
                <app-badge variant="secondary">Jazz</app-badge>\r
                <app-badge variant="info">Pop</app-badge>\r
              </div>\r
              <code>G\xE9neros musicales</code>\r
            </div>\r
            <div class="showcase__item">\r
              <div style="display: flex; gap: 0.5rem; align-items: center;">\r
                <span style="font-weight: 600;">Estado:</span>\r
                <app-badge variant="success">Disponible</app-badge>\r
              </div>\r
              <code>Indicador de estado</code>\r
            </div>\r
            <div class="showcase__item">\r
              <div style="display: flex; gap: 0.5rem; align-items: center;">\r
                <span style="font-weight: 600;">Notificaciones</span>\r
                <app-badge variant="error" size="sm">5</app-badge>\r
              </div>\r
              <code>Contador</code>\r
            </div>\r
          </div>\r
        </div>\r
\r
        <!-- Enlaces / Links -->\r
        <div class="showcase">\r
          <h3>Enlaces</h3>\r
          <div class="showcase__row">\r
            <div class="showcase__item">\r
              <a href="#" class="link">Enlace est\xE1ndar</a>\r
              <code>class="link"</code>\r
            </div>\r
            <div class="showcase__item">\r
              <a href="#" class="link link--primary">Enlace primario</a>\r
              <code>class="link link--primary"</code>\r
            </div>\r
            <div class="showcase__item">\r
              <a href="#" class="link link--underlined">Enlace subrayado</a>\r
              <code>class="link link--underlined"</code>\r
            </div>\r
            <div class="showcase__item">\r
              <a href="#" class="link link--arrow">Enlace con flecha \u2192</a>\r
              <code>class="link link--arrow"</code>\r
            </div>\r
          </div>\r
        </div>\r
\r
        <!-- Toggle Switch -->\r
        <div class="showcase">\r
          <h3>Toggle Switch</h3>\r
          <div class="showcase__row">\r
            <div class="showcase__item">\r
              <label class="toggle-wrapper">\r
                <input type="checkbox" class="toggle" />\r
                <span class="toggle-label">Activar opci\xF3n</span>\r
              </label>\r
              <code>Toggle desactivado</code>\r
            </div>\r
            <div class="showcase__item">\r
              <label class="toggle-wrapper">\r
                <input type="checkbox" class="toggle" checked />\r
                <span class="toggle-label">Opci\xF3n activada</span>\r
              </label>\r
              <code>Toggle activado</code>\r
            </div>\r
            <div class="showcase__item">\r
              <label class="toggle-wrapper toggle-wrapper--disabled">\r
                <input type="checkbox" class="toggle" disabled />\r
                <span class="toggle-label">Toggle deshabilitado</span>\r
              </label>\r
              <code>Toggle disabled</code>\r
            </div>\r
          </div>\r
        </div>\r
\r
        <!-- Checkbox y Radio -->\r
        <div class="showcase">\r
          <h3>Checkbox</h3>\r
          <div class="showcase__column">\r
            <div class="showcase__item">\r
              <label class="checkbox-wrapper">\r
                <input type="checkbox" class="checkbox" />\r
                <span class="checkbox-label">Opci\xF3n 1</span>\r
              </label>\r
              <code>Checkbox sin marcar</code>\r
            </div>\r
            <div class="showcase__item">\r
              <label class="checkbox-wrapper">\r
                <input type="checkbox" class="checkbox" checked />\r
                <span class="checkbox-label">Opci\xF3n 2 (marcada)</span>\r
              </label>\r
              <code>Checkbox marcado</code>\r
            </div>\r
            <div class="showcase__item">\r
              <label class="checkbox-wrapper checkbox-wrapper--disabled">\r
                <input type="checkbox" class="checkbox" disabled />\r
                <span class="checkbox-label">Opci\xF3n deshabilitada</span>\r
              </label>\r
              <code>Checkbox disabled</code>\r
            </div>\r
          </div>\r
        </div>\r
\r
        <!-- Radio Buttons -->\r
        <div class="showcase">\r
          <h3>Radio Buttons</h3>\r
          <div class="showcase__column">\r
            <div class="showcase__item">\r
              <label class="radio-wrapper">\r
                <input type="radio" name="demo-radio" class="radio" checked />\r
                <span class="radio-label">Opci\xF3n A (seleccionada)</span>\r
              </label>\r
            </div>\r
            <div class="showcase__item">\r
              <label class="radio-wrapper">\r
                <input type="radio" name="demo-radio" class="radio" />\r
                <span class="radio-label">Opci\xF3n B</span>\r
              </label>\r
            </div>\r
            <div class="showcase__item">\r
              <label class="radio-wrapper">\r
                <input type="radio" name="demo-radio" class="radio" />\r
                <span class="radio-label">Opci\xF3n C</span>\r
              </label>\r
            </div>\r
            <div class="showcase__item">\r
              <label class="radio-wrapper radio-wrapper--disabled">\r
                <input type="radio" name="demo-radio-disabled" class="radio" disabled />\r
                <span class="radio-label">Opci\xF3n deshabilitada</span>\r
              </label>\r
            </div>\r
          </div>\r
        </div>\r
      </section>\r
    }\r
\r
    <!-- ============================================ -->\r
    <!-- SECCI\xD3N 3: MOL\xC9CULAS -->\r
    <!-- ============================================ -->\r
    @if (activeSection() === 'molecules') {\r
      <section class="style-guide__section">\r
        <h2>Mol\xE9culas</h2>\r
        <p class="showcase__description">\r
          Combinaciones de \xE1tomos: cards, formularios individuales, breadcrumbs, alerts y tooltips.\r
        </p>\r
\r
        <!-- Form Input -->\r
        <div class="showcase">\r
          <h3>Input - Estados</h3>\r
          <div class="showcase__grid showcase__grid--forms">\r
            <div class="showcase__item">\r
              <app-form-input\r
                label="Email"\r
                type="email"\r
                placeholder="tu@email.com"\r
                helpText="Nunca compartiremos tu email"\r
              ></app-form-input>\r
              <code>Input normal con ayuda</code>\r
            </div>\r
\r
            <div class="showcase__item">\r
              <app-form-input\r
                [control]="demoInputErrorControl"\r
                label="Usuario"\r
                type="text"\r
                placeholder="Tu nombre de usuario"\r
                helpText="Este campo es requerido"\r
                [required]="true"\r
              ></app-form-input>\r
              <code>Input con error (campo requerido vac\xEDo)</code>\r
            </div>\r
\r
            <div class="showcase__item">\r
              <app-form-input\r
                [control]="demoInputSuccessControl"\r
                label="Contrase\xF1a"\r
                type="password"\r
                placeholder="\u2022\u2022\u2022\u2022\u2022\u2022\u2022\u2022"\r
                helpText="Contrase\xF1a segura"\r
                [required]="true"\r
              ></app-form-input>\r
              <code>Input con \xE9xito (campo v\xE1lido)</code>\r
            </div>\r
\r
            <div class="showcase__item">\r
              <app-form-input\r
                label="Campo deshabilitado"\r
                type="text"\r
                placeholder="No disponible"\r
                [disabled]="true"\r
              ></app-form-input>\r
              <code>Input deshabilitado</code>\r
            </div>\r
          </div>\r
        </div>\r
\r
        <!-- Form Input - Tipos -->\r
        <div class="showcase">\r
          <h3>Input - Tipos</h3>\r
          <div class="showcase__grid showcase__grid--forms">\r
            <div class="showcase__item">\r
              <app-form-input\r
                label="Texto"\r
                type="text"\r
                placeholder="Escribe algo..."\r
              ></app-form-input>\r
              <code>type="text"</code>\r
            </div>\r
\r
            <div class="showcase__item">\r
              <app-form-input\r
                label="Email"\r
                type="email"\r
                placeholder="correo@ejemplo.com"\r
              ></app-form-input>\r
              <code>type="email"</code>\r
            </div>\r
\r
            <div class="showcase__item">\r
              <app-form-input\r
                label="Contrase\xF1a"\r
                type="password"\r
                placeholder="Tu contrase\xF1a"\r
              ></app-form-input>\r
              <code>type="password"</code>\r
            </div>\r
\r
            <div class="showcase__item">\r
              <app-form-input\r
                label="N\xFAmero"\r
                type="number"\r
                placeholder="123"\r
              ></app-form-input>\r
              <code>type="number"</code>\r
            </div>\r
\r
            <div class="showcase__item">\r
              <app-form-input\r
                label="Tel\xE9fono"\r
                type="tel"\r
                placeholder="+34 600 000 000"\r
              ></app-form-input>\r
              <code>type="tel"</code>\r
            </div>\r
\r
            <div class="showcase__item">\r
              <app-form-input\r
                label="Fecha"\r
                type="date"\r
              ></app-form-input>\r
              <code>type="date"</code>\r
            </div>\r
          </div>\r
        </div>\r
\r
        <!-- Cards Polaroid -->\r
        <div class="showcase">\r
          <h3>Cards - Variante Polaroid</h3>\r
          <div class="showcase__row showcase__row--cards-polaroid">\r
            <div class="showcase__item showcase__item--card-polaroid">\r
              <app-card\r
                title="Rumours"\r
                subtitle="Fleetwood Mac"\r
                imageShape="square"\r
                imageSize="medium"\r
                variant="normal"\r
                cardType="polaroid"\r
                titleLink="#album"\r
                subtitleLink="#artist">\r
              </app-card>\r
              <code>\xC1lbum con placeholder</code>\r
            </div>\r
\r
            <div class="showcase__item showcase__item--card-polaroid">\r
              <app-card\r
                title="Bohemian Rhapsody"\r
                subtitle="Queen"\r
                imageShape="circle"\r
                imageSize="medium"\r
                variant="normal"\r
                cardType="polaroid"\r
                titleLink="#song"\r
                subtitleLink="#artist">\r
              </app-card>\r
              <code>Canci\xF3n (circular)</code>\r
            </div>\r
\r
            <div class="showcase__item showcase__item--card-polaroid">\r
              <app-card\r
                title="Hotel California"\r
                subtitle="Eagles"\r
                imageShape="square"\r
                imageSize="medium"\r
                variant="vinilo"\r
                cardType="polaroid"\r
                titleLink="#album"\r
                subtitleLink="#artist">\r
              </app-card>\r
              <code>Efecto vinilo</code>\r
            </div>\r
          </div>\r
        </div>\r
\r
        <!-- Cards Profile -->\r
        <div class="showcase">\r
          <h3>Cards - Variante Profile</h3>\r
\r
          <!-- Profile Vertical -->\r
          <h4 style="margin-bottom: 1rem; font-size: 1.125rem; color: var(--text-secondary);">Layout Vertical</h4>\r
          <div class="showcase__row">\r
            <div class="showcase__item">\r
              <app-card\r
                title="JohnDoe"\r
                imageShape="square"\r
                imageSize="large"\r
                variant="normal"\r
                cardType="profile"\r
                layout="vertical"\r
                [badges]="userGenres"\r
                [actions]="profileActions">\r
              </app-card>\r
              <code>Perfil vertical con g\xE9neros</code>\r
            </div>\r
\r
            <div class="showcase__item">\r
              <app-card\r
                title="Dark Side of the Moon"\r
                subtitle="Pink Floyd \u2022 1973"\r
                imageShape="square"\r
                imageSize="large"\r
                variant="vinilo"\r
                cardType="profile"\r
                layout="vertical"\r
                [badges]="['Progressive Rock', 'Psychedelic']"\r
                [actions]="profileActions.slice(0, 2)">\r
              </app-card>\r
              <code>\xC1lbum con badges y acciones</code>\r
            </div>\r
          </div>\r
\r
          <!-- Profile Horizontal -->\r
          <h4 style="margin: 2rem 0 1rem; font-size: 1.125rem; color: var(--text-secondary);">Layout Horizontal (Responsive)</h4>\r
          <div class="showcase__column">\r
            <div class="showcase__item showcase__item--full">\r
              <app-card\r
                title="Led Zeppelin IV"\r
                subtitle="Led Zeppelin \u2022 1971"\r
                imageShape="square"\r
                imageSize="large"\r
                variant="normal"\r
                cardType="profile"\r
                layout="horizontal"\r
                [badges]="['Hard Rock', 'Blues Rock', 'Heavy Metal']"\r
                [actions]="profileActions">\r
              </app-card>\r
              <code>Card horizontal con m\xFAltiples badges y acciones (se vuelve vertical en m\xF3vil)</code>\r
            </div>\r
\r
            <div class="showcase__item showcase__item--full">\r
              <app-card\r
                title="Abbey Road"\r
                subtitle="The Beatles \u2022 1969"\r
                imageShape="square"\r
                imageSize="large"\r
                variant="vinilo"\r
                cardType="profile"\r
                layout="horizontal"\r
                [badges]="['Rock', 'Pop Rock']"\r
                [actions]="profileActions.slice(0, 2)">\r
              </app-card>\r
              <code>Card horizontal con efecto vinilo</code>\r
            </div>\r
          </div>\r
        </div>\r
\r
        <!-- Textarea -->\r
        <div class="showcase">\r
          <h3>Textarea</h3>\r
          <div class="showcase__grid showcase__grid--forms">\r
            <div class="showcase__item">\r
              <app-form-textarea\r
                label="Descripci\xF3n"\r
                id="textarea-normal"\r
                placeholder="Escribe tu descripci\xF3n aqu\xED..."\r
                [rows]="4"\r
                hint="M\xE1ximo 500 caracteres"\r
              ></app-form-textarea>\r
              <code>Textarea normal</code>\r
            </div>\r
\r
            <div class="showcase__item">\r
              <app-form-textarea\r
                label="Biograf\xEDa"\r
                id="textarea-error"\r
                placeholder="Escribe tu biograf\xEDa..."\r
                [rows]="4"\r
                error="Este campo es obligatorio"\r
              ></app-form-textarea>\r
              <code>Textarea con error</code>\r
            </div>\r
\r
            <div class="showcase__item">\r
              <app-form-textarea\r
                label="Comentario"\r
                id="textarea-disabled"\r
                placeholder="No disponible"\r
                [rows]="4"\r
                [disabled]="true"\r
              ></app-form-textarea>\r
              <code>Textarea deshabilitado</code>\r
            </div>\r
          </div>\r
        </div>\r
\r
        <!-- Select -->\r
        <div class="showcase">\r
          <h3>Select</h3>\r
          <div class="showcase__grid showcase__grid--forms">\r
            <div class="showcase__item">\r
              <app-form-select\r
                label="G\xE9nero musical"\r
                id="select-normal"\r
                placeholder="Selecciona tu g\xE9nero favorito"\r
                [options]="genreOptions"\r
                hint="Elige el g\xE9nero que m\xE1s te gusta"\r
              ></app-form-select>\r
              <code>Select normal</code>\r
            </div>\r
\r
            <div class="showcase__item">\r
              <app-form-select\r
                label="G\xE9nero musical"\r
                id="select-error"\r
                placeholder="Selecciona tu g\xE9nero favorito"\r
                [options]="genreOptions"\r
                error="Debes seleccionar un g\xE9nero"\r
              ></app-form-select>\r
              <code>Select con error</code>\r
            </div>\r
\r
            <div class="showcase__item">\r
              <app-form-select\r
                label="G\xE9nero musical"\r
                id="select-disabled"\r
                placeholder="No disponible"\r
                [options]="genreOptions"\r
                [disabled]="true"\r
              ></app-form-select>\r
              <code>Select deshabilitado</code>\r
            </div>\r
          </div>\r
        </div>\r
\r
        <!-- Checkbox -->\r
        <div class="showcase">\r
          <h3>Checkbox</h3>\r
          <div class="showcase__grid showcase__grid--forms">\r
            <div class="showcase__item">\r
              <app-form-checkbox\r
                label="Acepto los t\xE9rminos y condiciones"\r
                id="checkbox-normal"\r
              ></app-form-checkbox>\r
              <code>Checkbox normal</code>\r
            </div>\r
\r
            <div class="showcase__item">\r
              <app-form-checkbox\r
                label="Suscribirme al newsletter"\r
                id="checkbox-error"\r
                error="Debes aceptar para continuar"\r
              ></app-form-checkbox>\r
              <code>Checkbox con error</code>\r
            </div>\r
\r
            <div class="showcase__item">\r
              <app-form-checkbox\r
                label="Opci\xF3n no disponible"\r
                id="checkbox-disabled"\r
                [disabled]="true"\r
              ></app-form-checkbox>\r
              <code>Checkbox deshabilitado</code>\r
            </div>\r
          </div>\r
        </div>\r
\r
        <!-- Radio Group -->\r
        <div class="showcase">\r
          <h3>Radio Group</h3>\r
          <div class="showcase__grid showcase__grid--forms">\r
            <div class="showcase__item">\r
              <app-form-radio-group\r
                label="Privacidad del perfil"\r
                name="privacy"\r
                [options]="privacyOptions"\r
              ></app-form-radio-group>\r
              <code>Radio group normal</code>\r
            </div>\r
\r
            <div class="showcase__item">\r
              <app-form-radio-group\r
                label="Privacidad del perfil"\r
                name="privacy-error"\r
                [options]="privacyOptions"\r
                error="Debes seleccionar una opci\xF3n"\r
              ></app-form-radio-group>\r
              <code>Radio group con error</code>\r
            </div>\r
\r
            <div class="showcase__item">\r
              <app-form-radio-group\r
                label="Privacidad del perfil"\r
                name="privacy-inline"\r
                [options]="privacyOptions"\r
                [inline]="true"\r
              ></app-form-radio-group>\r
              <code>Radio group inline</code>\r
            </div>\r
          </div>\r
        </div>\r
\r
        <!-- Breadcrumbs -->\r
        <div class="showcase">\r
          <h3>Breadcrumbs</h3>\r
          <div class="showcase__column">\r
            <div class="showcase__item showcase__item--full">\r
              <app-breadcrumbs [items]="breadcrumbsSimple"></app-breadcrumbs>\r
              <code>Breadcrumbs simple</code>\r
            </div>\r
\r
            <div class="showcase__item showcase__item--full">\r
              <app-breadcrumbs [items]="breadcrumbsWithIcons"></app-breadcrumbs>\r
              <code>Breadcrumbs con iconos</code>\r
            </div>\r
\r
            <div class="showcase__item showcase__item--full">\r
              <app-breadcrumbs [items]="breadcrumbsLong"></app-breadcrumbs>\r
              <code>Breadcrumbs largo (con truncado en m\xF3vil)</code>\r
            </div>\r
\r
            <div class="showcase__item showcase__item--full">\r
              <app-breadcrumbs\r
                [items]="breadcrumbsSimple"\r
                separator="\u203A"\r
              ></app-breadcrumbs>\r
              <code>Breadcrumbs con separador custom (\u203A)</code>\r
            </div>\r
          </div>\r
        </div>\r
\r
        <!-- Alerts -->\r
        <div class="showcase">\r
          <h3>Alerts</h3>\r
          <div class="showcase__column">\r
            <div class="showcase__item showcase__item--full">\r
              <app-alert\r
                type="success"\r
                title="\xA1\xC9xito!"\r
                message="Tu \xE1lbum se ha agregado correctamente a tu colecci\xF3n."\r
              ></app-alert>\r
              <code>Alert de \xE9xito</code>\r
            </div>\r
\r
            <div class="showcase__item showcase__item--full">\r
              <app-alert\r
                type="error"\r
                title="Error"\r
                message="No se pudo conectar con el servidor. Por favor, int\xE9ntalo de nuevo."\r
              ></app-alert>\r
              <code>Alert de error</code>\r
            </div>\r
\r
            <div class="showcase__item showcase__item--full">\r
              <app-alert\r
                type="warning"\r
                title="Advertencia"\r
                message="Tu sesi\xF3n caducar\xE1 en 5 minutos. Guarda tus cambios."\r
              ></app-alert>\r
              <code>Alert de advertencia</code>\r
            </div>\r
\r
            <div class="showcase__item showcase__item--full">\r
              <app-alert\r
                type="info"\r
                title="Informaci\xF3n"\r
                message="Tenemos nueva m\xFAsica disponible en tu secci\xF3n de recomendados."\r
              ></app-alert>\r
              <code>Alert de informaci\xF3n</code>\r
            </div>\r
\r
            <div class="showcase__item showcase__item--full">\r
              <app-alert\r
                type="warning"\r
                title="Cambios pendientes"\r
                message="Tienes cambios sin guardar. \xBFDeseas salir de todas formas?"\r
                [dismissible]="true"\r
              ></app-alert>\r
              <code>Alert con bot\xF3n cerrar</code>\r
            </div>\r
          </div>\r
        </div>\r
\r
        <!-- Tooltip -->\r
        <div class="showcase">\r
          <h3>Tooltip - Posiciones</h3>\r
          <div class="showcase__grid" style="gap: 3rem; padding: 2rem;">\r
            <div class="showcase__item">\r
              <app-tooltip text="Tooltip arriba" position="top">\r
                <app-button>Top</app-button>\r
              </app-tooltip>\r
            </div>\r
\r
            <div class="showcase__item">\r
              <app-tooltip text="Tooltip abajo" position="bottom">\r
                <app-button>Bottom</app-button>\r
              </app-tooltip>\r
            </div>\r
\r
            <div class="showcase__item">\r
              <app-tooltip text="Tooltip izquierda" position="left">\r
                <app-button>Left</app-button>\r
              </app-tooltip>\r
            </div>\r
\r
            <div class="showcase__item">\r
              <app-tooltip text="Tooltip derecha" position="right">\r
                <app-button>Right</app-button>\r
              </app-tooltip>\r
            </div>\r
          </div>\r
        </div>\r
      </section>\r
    }\r
\r
    <!-- ============================================ -->\r
    <!-- SECCI\xD3N 4: ORGANISMOS -->\r
    <!-- ============================================ -->\r
    @if (activeSection() === 'organisms') {\r
      <section class="style-guide__section">\r
        <h2>Organismos</h2>\r
        <p class="showcase__description">\r
          Componentes complejos: formularios completos, modales, accordions, tabs y carruseles.\r
        </p>\r
\r
        <!-- Notifications Toast -->\r
        <div class="showcase">\r
          <h3>Notifications (Toast)</h3>\r
          <p class="showcase__description">\r
            Las notificaciones aparecen flotando en las esquinas de la pantalla.\r
          </p>\r
          <div class="showcase__row">\r
            <div class="showcase__item">\r
              <app-button\r
                (click)="showToast('success')"\r
                variant="primary"\r
                size="md"\r
              >\r
                Notificaci\xF3n de \xE9xito\r
              </app-button>\r
            </div>\r
\r
            <div class="showcase__item">\r
              <app-button\r
                (click)="showToast('error')"\r
                variant="danger"\r
                size="md"\r
              >\r
                Notificaci\xF3n de error\r
              </app-button>\r
            </div>\r
\r
            <div class="showcase__item">\r
              <app-button\r
                (click)="showToast('warning')"\r
                variant="secondary"\r
                size="md"\r
              >\r
                Notificaci\xF3n de advertencia\r
              </app-button>\r
            </div>\r
\r
            <div class="showcase__item">\r
              <app-button\r
                (click)="showToast('info')"\r
                variant="ghost"\r
                size="md"\r
              >\r
                Notificaci\xF3n de informaci\xF3n\r
              </app-button>\r
            </div>\r
          </div>\r
        </div>\r
\r
        <!-- Notifications DOM Manipulation -->\r
        <div class="showcase">\r
          <h3>Notificaciones Din\xE1micas (Manipulaci\xF3n DOM)</h3>\r
          <p class="showcase__description">\r
            Notificaciones creadas din\xE1micamente usando <code>createComponent()</code> y <code>appendChild()</code>.\r
          </p>\r
          <div class="showcase__row">\r
            <div class="showcase__item">\r
              <app-button\r
                (click)="showDynamicNotification('success')"\r
                variant="primary"\r
                size="md"\r
              >\r
                Crear notificaci\xF3n en el DOM\r
              </app-button>\r
              <code>createElement + appendChild</code>\r
            </div>\r
\r
            <div class="showcase__item">\r
              <app-button\r
                (click)="showDynamicNotification('error')"\r
                variant="danger"\r
                size="md"\r
              >\r
                Error con creaci\xF3n din\xE1mica\r
              </app-button>\r
            </div>\r
          </div>\r
        </div>\r
\r
        <!-- Formularios Completos -->\r
        <div class="showcase">\r
          <h3>Formulario de Login</h3>\r
          <div class="showcase__column">\r
            <div class="showcase__item showcase__item--centered">\r
              <app-login-form></app-login-form>\r
              <code>Formulario de inicio de sesi\xF3n con validaci\xF3n</code>\r
            </div>\r
          </div>\r
        </div>\r
\r
        <div class="showcase">\r
          <h3>Formulario de Registro</h3>\r
          <div class="showcase__column">\r
            <div class="showcase__item showcase__item--centered">\r
              <app-register-form></app-register-form>\r
              <code>Formulario de registro con validaci\xF3n completa</code>\r
            </div>\r
          </div>\r
        </div>\r
\r
        <div class="showcase">\r
          <h3>Formulario de Recuperaci\xF3n de Contrase\xF1a</h3>\r
          <div class="showcase__column">\r
            <div class="showcase__item showcase__item--centered">\r
              <app-forgot-password-form></app-forgot-password-form>\r
              <code>Formulario para recuperar contrase\xF1a</code>\r
            </div>\r
          </div>\r
        </div>\r
\r
        <!-- Modal -->\r
        <div class="showcase">\r
          <h3>Modal</h3>\r
          <p class="showcase__description">\r
            Componente modal con overlay, cierre con ESC, click fuera y trap focus.\r
          </p>\r
          <div class="showcase__row">\r
            <div class="showcase__item">\r
              <app-button (clicked)="openModal()">\r
                Abrir Modal\r
              </app-button>\r
              <code>Modal con signal isOpen</code>\r
            </div>\r
          </div>\r
\r
          <app-modal\r
            [isOpen]="isModalOpen()"\r
            title="Confirmar acci\xF3n"\r
            (onClose)="closeModal()">\r
            <p>\xBFEst\xE1s seguro de que quieres eliminar este \xE1lbum de tu colecci\xF3n?</p>\r
            <p>Esta acci\xF3n no se puede deshacer.</p>\r
            <div style="display: flex; gap: 1rem; margin-top: 1.5rem;">\r
              <app-button variant="danger" (clicked)="closeModal()">\r
                Eliminar\r
              </app-button>\r
              <app-button variant="secondary" (clicked)="closeModal()">\r
                Cancelar\r
              </app-button>\r
            </div>\r
          </app-modal>\r
        </div>\r
\r
        <!-- Accordion -->\r
        <div class="showcase">\r
          <h3>Accordion - Modo Single</h3>\r
          <p class="showcase__description">\r
            Solo puede haber un item abierto a la vez.\r
          </p>\r
          <div class="showcase__column">\r
            <div class="showcase__item showcase__item--full">\r
              <app-accordion [items]="accordionItems" mode="single"></app-accordion>\r
            </div>\r
          </div>\r
        </div>\r
\r
        <div class="showcase">\r
          <h3>Accordion - Modo Multiple</h3>\r
          <div class="showcase__column">\r
            <div class="showcase__item showcase__item--full">\r
              <app-accordion [items]="accordionItems" mode="multiple"></app-accordion>\r
            </div>\r
          </div>\r
        </div>\r
\r
        <!-- Responsive Tabs (Nuevas) -->\r
        <div class="showcase">\r
          <h3>Responsive Tabs (Pesta\xF1as Adaptativas)</h3>\r
          <p class="showcase__description">\r
            Tabs en desktop que se convierten en accordion en m\xF3vil. Navegaci\xF3n por teclado y dise\xF1o neobrutalista.\r
          </p>\r
          <div class="showcase__column">\r
            <div class="showcase__item showcase__item--full">\r
              <app-responsive-tabs [breakpoint]="768">\r
                <app-tab-panel id="descripcion" label="Descripci\xF3n">\r
                  <h4>Descripci\xF3n del Producto</h4>\r
                  <p>Este es el contenido de la pesta\xF1a de descripci\xF3n. Las tabs se adaptan autom\xE1ticamente al tama\xF1o de pantalla.</p>\r
                </app-tab-panel>\r
                <app-tab-panel id="especificaciones" label="Especificaciones">\r
                  <h4>Especificaciones T\xE9cnicas</h4>\r
                  <ul>\r
                    <li>Caracter\xEDstica 1: Responsive design</li>\r
                    <li>Caracter\xEDstica 2: Accordion en m\xF3vil</li>\r
                    <li>Caracter\xEDstica 3: Navegaci\xF3n por teclado</li>\r
                  </ul>\r
                </app-tab-panel>\r
                <app-tab-panel id="resenias" label="Rese\xF1as">\r
                  <h4>Rese\xF1as de Usuarios</h4>\r
                  <p>Aqu\xED aparecer\xEDan las rese\xF1as de los usuarios sobre el producto.</p>\r
                </app-tab-panel>\r
                <app-tab-panel id="soporte" label="Soporte">\r
                  <h4>Informaci\xF3n de Soporte</h4>\r
                  <p>Contacta con nuestro equipo de soporte para cualquier consulta.</p>\r
                </app-tab-panel>\r
              </app-responsive-tabs>\r
            </div>\r
          </div>\r
        </div>\r
\r
        <!-- Carrusel -->\r
        <div class="showcase">\r
          <h3>Carrusel de \xC1lbumes</h3>\r
          <app-carousel title="\xC1LBUMES EN TENDENCIA">\r
            <app-card\r
              *ngFor="let album of trendingAlbums"\r
              [title]="album.title"\r
              [subtitle]="album.artist + ' \u2022 ' + album.year"\r
              imageShape="square"\r
              imageSize="medium"\r
              variant="normal"\r
              cardType="polaroid"\r
              titleLink="#album"\r
              subtitleLink="#artist">\r
            </app-card>\r
          </app-carousel>\r
        </div>\r
\r
        <div class="showcase">\r
          <h3>Carrusel de Canciones</h3>\r
          <app-carousel title="CANCIONES EN TENDENCIA">\r
            <app-card\r
              *ngFor="let song of trendingSongs"\r
              [title]="song.title"\r
              [subtitle]="song.artist"\r
              imageShape="circle"\r
              imageSize="medium"\r
              variant="normal"\r
              cardType="polaroid"\r
              titleLink="#song"\r
              subtitleLink="#artist">\r
            </app-card>\r
          </app-carousel>\r
        </div>\r
\r
        <!-- Carrusel con manipulaci\xF3n DOM -->\r
        <div class="showcase">\r
          <h3>Manipulaci\xF3n de Estilos Din\xE1micos (DOM)</h3>\r
          <p class="showcase__description">\r
            Este carousel demuestra manipulaci\xF3n directa del DOM modificando estilos con <code>nativeElement.style</code>.\r
          </p>\r
          <div class="showcase__column">\r
            <div class="showcase__item showcase__item--full">\r
              <app-carousel #demoCarousel title="DEMO - MANIPULACI\xD3N DE ESTILOS">\r
                <app-card\r
                  *ngFor="let album of trendingAlbums.slice(0, 5)"\r
                  [title]="album.title"\r
                  [subtitle]="album.artist"\r
                  imageShape="square"\r
                  imageSize="medium"\r
                  variant="normal"\r
                  cardType="polaroid"\r
                  titleLink="#album"\r
                  subtitleLink="#artist">\r
                </app-card>\r
              </app-carousel>\r
\r
              <div class="style-guide__carousel-demo-controls">\r
                <app-button (click)="toggleCarouselHighlight()" variant="secondary" size="sm">\r
                  Toggle Highlight (boxShadow + border)\r
                </app-button>\r
\r
                <label class="style-guide__carousel-demo-opacity">\r
                  <span>Opacidad:</span>\r
                  <input\r
                    type="range"\r
                    min="0"\r
                    max="1"\r
                    step="0.1"\r
                    [value]="carouselOpacity"\r
                    (input)="updateCarouselOpacity($event)"\r
                    class="style-guide__carousel-demo-range"\r
                  />\r
                  <span>{{ carouselOpacity }}</span>\r
                </label>\r
              </div>\r
              <code>Modifica: boxShadow, border, opacity con nativeElement.style</code>\r
            </div>\r
          </div>\r
        </div>\r
      </section>\r
    }\r
\r
    <!-- ============================================ -->\r
    <!-- SECCI\xD3N 5: LAYOUT -->\r
    <!-- ============================================ -->\r
    @if (activeSection() === 'layout') {\r
      <section class="style-guide__section">\r
        <h2>Componentes de Layout</h2>\r
        <p class="showcase__description">\r
          Estructura principal de la aplicaci\xF3n basada en el sistema de dise\xF1o 70s Neobrutalist.\r
          Estos componentes heredan las variables, sombras, colores y tipograf\xEDa de los Fundamentos.\r
          Los componentes de layout se visualizan directamente en esta p\xE1gina.\r
        </p>\r
\r
        <!-- Componentes de Layout - Listado con SVG Icons -->\r
        <div class="showcase">\r
          <h3>Componentes Disponibles</h3>\r
          <p class="showcase__description">\r
            Cada componente usa mixins y variables del sistema de dise\xF1o.\r
            Observa la p\xE1gina actual para ver estos componentes en acci\xF3n.\r
          </p>\r
          <div class="showcase__grid showcase__grid--forms">\r
            <div class="layout-info-card">\r
              <div class="layout-info-card__header">\r
                <svg class="layout-info-card__icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">\r
                  <rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect>\r
                  <line x1="3" y1="9" x2="21" y2="9"></line>\r
                </svg>\r
                <span class="layout-info-card__name">app-header</span>\r
              </div>\r
              <p class="layout-info-card__desc">Cabecera con logo central, franjas 70s y botones de autenticaci\xF3n.</p>\r
              <div class="layout-info-card__vars">\r
                <code>--header-bg</code>\r
                <code>$borde-brutal-thick</code>\r
              </div>\r
            </div>\r
\r
            <div class="layout-info-card">\r
              <div class="layout-info-card__header">\r
                <svg class="layout-info-card__icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">\r
                  <line x1="3" y1="12" x2="21" y2="12"></line>\r
                  <line x1="3" y1="6" x2="21" y2="6"></line>\r
                  <line x1="3" y1="18" x2="21" y2="18"></line>\r
                </svg>\r
                <span class="layout-info-card__name">main-nav</span>\r
              </div>\r
              <p class="layout-info-card__desc">Barra de navegaci\xF3n sticky con enlaces y toggle de tema.</p>\r
              <div class="layout-info-card__vars">\r
                <code>--nav-bg</code>\r
                <code>$z-nav</code>\r
              </div>\r
            </div>\r
\r
            <div class="layout-info-card">\r
              <div class="layout-info-card__header">\r
                <svg class="layout-info-card__icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">\r
                  <rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect>\r
                  <line x1="3" y1="15" x2="21" y2="15"></line>\r
                </svg>\r
                <span class="layout-info-card__name">app-footer</span>\r
              </div>\r
              <p class="layout-info-card__desc">Pie de p\xE1gina sim\xE9trico con logo central y botones de navegaci\xF3n.</p>\r
              <div class="layout-info-card__vars">\r
                <code>--header-bg</code>\r
                <code>$radio-pildora</code>\r
              </div>\r
            </div>\r
          </div>\r
        </div>\r
\r
        <!-- Breakpoints con Cards Polaroid -->\r
        <div class="showcase">\r
          <h3>Sistema de Breakpoints</h3>\r
          <p class="showcase__description">\r
            Puntos de quiebre responsive definidos en <code>_variables.scss</code>.\r
            El layout se adapta autom\xE1ticamente a cada tama\xF1o de pantalla.\r
          </p>\r
          <div class="showcase__row showcase__row--wrap">\r
            <div class="showcase__item showcase__item--breakpoint">\r
              <app-card\r
                title="Mobile"\r
                subtitle="320px+"\r
                imageShape="square"\r
                imageSize="medium"\r
                variant="normal"\r
                cardType="polaroid"\r
                [placeholderIcon]="'<svg viewBox=&quot;0 0 24 24&quot; fill=&quot;none&quot; stroke=&quot;currentColor&quot; stroke-width=&quot;2&quot; stroke-linecap=&quot;round&quot; stroke-linejoin=&quot;round&quot;><rect x=&quot;5&quot; y=&quot;2&quot; width=&quot;14&quot; height=&quot;20&quot; rx=&quot;2&quot; ry=&quot;2&quot;></rect><line x1=&quot;12&quot; y1=&quot;18&quot; x2=&quot;12.01&quot; y2=&quot;18&quot;></line></svg>'">\r
              </app-card>\r
              <code class="showcase__code">$breakpoint-mobile</code>\r
            </div>\r
\r
            <div class="showcase__item showcase__item--breakpoint">\r
              <app-card\r
                title="Tablet"\r
                subtitle="768px+"\r
                imageShape="square"\r
                imageSize="medium"\r
                variant="normal"\r
                cardType="polaroid"\r
                [placeholderIcon]="'<svg viewBox=&quot;0 0 24 24&quot; fill=&quot;none&quot; stroke=&quot;currentColor&quot; stroke-width=&quot;2&quot; stroke-linecap=&quot;round&quot; stroke-linejoin=&quot;round&quot;><rect x=&quot;4&quot; y=&quot;2&quot; width=&quot;16&quot; height=&quot;20&quot; rx=&quot;2&quot; ry=&quot;2&quot;></rect><line x1=&quot;12&quot; y1=&quot;18&quot; x2=&quot;12.01&quot; y2=&quot;18&quot;></line></svg>'">\r
              </app-card>\r
              <code class="showcase__code">$breakpoint-tablet</code>\r
            </div>\r
\r
            <div class="showcase__item showcase__item--breakpoint">\r
              <app-card\r
                title="Desktop"\r
                subtitle="1024px+"\r
                imageShape="square"\r
                imageSize="medium"\r
                variant="vinilo"\r
                cardType="polaroid"\r
                [placeholderIcon]="'<svg viewBox=&quot;0 0 24 24&quot; fill=&quot;none&quot; stroke=&quot;currentColor&quot; stroke-width=&quot;2&quot; stroke-linecap=&quot;round&quot; stroke-linejoin=&quot;round&quot;><rect x=&quot;2&quot; y=&quot;3&quot; width=&quot;20&quot; height=&quot;14&quot; rx=&quot;2&quot; ry=&quot;2&quot;></rect><line x1=&quot;8&quot; y1=&quot;21&quot; x2=&quot;16&quot; y2=&quot;21&quot;></line><line x1=&quot;12&quot; y1=&quot;17&quot; x2=&quot;12&quot; y2=&quot;21&quot;></line></svg>'">\r
              </app-card>\r
              <code class="showcase__code">$breakpoint-desktop</code>\r
            </div>\r
\r
            <div class="showcase__item showcase__item--breakpoint">\r
              <app-card\r
                title="Large Desktop"\r
                subtitle="1200px+"\r
                imageShape="square"\r
                imageSize="medium"\r
                variant="vinilo"\r
                cardType="polaroid"\r
                [placeholderIcon]="'<svg viewBox=&quot;0 0 24 24&quot; fill=&quot;none&quot; stroke=&quot;currentColor&quot; stroke-width=&quot;2&quot; stroke-linecap=&quot;round&quot; stroke-linejoin=&quot;round&quot;><rect x=&quot;2&quot; y=&quot;3&quot; width=&quot;20&quot; height=&quot;14&quot; rx=&quot;2&quot; ry=&quot;2&quot;></rect><polyline points=&quot;8 21 12 17 16 21&quot;></polyline></svg>'">\r
              </app-card>\r
              <code class="showcase__code">$breakpoint-large-desktop</code>\r
            </div>\r
          </div>\r
        </div>\r
\r
        <!-- Z-Index Scale -->\r
        <div class="showcase">\r
          <h3>Escala de Z-Index</h3>\r
          <p class="showcase__description">\r
            Jerarqu\xEDa visual controlada para evitar conflictos de superposici\xF3n.\r
            Definida centralmente en <code>$variables.scss</code>.\r
          </p>\r
          <div class="z-index-scale">\r
            <div class="z-index-scale__item z-index-scale__item--10">\r
              <span class="z-index-scale__level">10</span>\r
              <span class="z-index-scale__name">$z-spinner</span>\r
              <span class="z-index-scale__desc">Loading global</span>\r
            </div>\r
            <div class="z-index-scale__item z-index-scale__item--9">\r
              <span class="z-index-scale__level">9</span>\r
              <span class="z-index-scale__name">$z-notification</span>\r
              <span class="z-index-scale__desc">Toast notifications</span>\r
            </div>\r
            <div class="z-index-scale__item z-index-scale__item--8">\r
              <span class="z-index-scale__level">8</span>\r
              <span class="z-index-scale__name">$z-tooltip</span>\r
              <span class="z-index-scale__desc">Tooltips</span>\r
            </div>\r
            <div class="z-index-scale__item z-index-scale__item--7">\r
              <span class="z-index-scale__level">7</span>\r
              <span class="z-index-scale__name">$z-popover</span>\r
              <span class="z-index-scale__desc">Dropdowns, popovers</span>\r
            </div>\r
            <div class="z-index-scale__item z-index-scale__item--6">\r
              <span class="z-index-scale__level">6</span>\r
              <span class="z-index-scale__name">$z-modal</span>\r
              <span class="z-index-scale__desc">Modales</span>\r
            </div>\r
            <div class="z-index-scale__item z-index-scale__item--5">\r
              <span class="z-index-scale__level">5</span>\r
              <span class="z-index-scale__name">$z-overlay</span>\r
              <span class="z-index-scale__desc">Backdrops</span>\r
            </div>\r
            <div class="z-index-scale__item z-index-scale__item--4">\r
              <span class="z-index-scale__level">4</span>\r
              <span class="z-index-scale__name">$z-nav</span>\r
              <span class="z-index-scale__desc">Navegaci\xF3n principal</span>\r
            </div>\r
            <div class="z-index-scale__item z-index-scale__item--3">\r
              <span class="z-index-scale__level">3</span>\r
              <span class="z-index-scale__name">$z-fixed</span>\r
              <span class="z-index-scale__desc">Sidebar, alertas fijas</span>\r
            </div>\r
            <div class="z-index-scale__item z-index-scale__item--2">\r
              <span class="z-index-scale__level">2</span>\r
              <span class="z-index-scale__name">$z-sticky</span>\r
              <span class="z-index-scale__desc">Elementos sticky</span>\r
            </div>\r
            <div class="z-index-scale__item z-index-scale__item--1">\r
              <span class="z-index-scale__level">1</span>\r
              <span class="z-index-scale__name">$z-dropdown</span>\r
              <span class="z-index-scale__desc">Dropdowns simples</span>\r
            </div>\r
            <div class="z-index-scale__item z-index-scale__item--0">\r
              <span class="z-index-scale__level">0</span>\r
              <span class="z-index-scale__name">$z-base</span>\r
              <span class="z-index-scale__desc">Contenido base</span>\r
            </div>\r
          </div>\r
        </div>\r
\r
        <!-- Variables CSS de Layout -->\r
        <div class="showcase">\r
          <h3>Variables CSS del Layout</h3>\r
          <p class="showcase__description">\r
            Variables CSS personalizadas que controlan el tema y se heredan en todos los componentes de layout.\r
          </p>\r
          <div class="showcase__grid showcase__grid--forms">\r
            <div class="css-var-card">\r
              <span class="css-var-card__name">--bg-primary</span>\r
              <div class="css-var-card__swatch" style="background-color: var(--bg-primary);"></div>\r
              <span class="css-var-card__desc">Fondo principal</span>\r
            </div>\r
            <div class="css-var-card">\r
              <span class="css-var-card__name">--bg-secondary</span>\r
              <div class="css-var-card__swatch" style="background-color: var(--bg-secondary);"></div>\r
              <span class="css-var-card__desc">Fondo secundario</span>\r
            </div>\r
            <div class="css-var-card">\r
              <span class="css-var-card__name">--header-bg</span>\r
              <div class="css-var-card__swatch" style="background-color: var(--header-bg);"></div>\r
              <span class="css-var-card__desc">Fondo del header</span>\r
            </div>\r
            <div class="css-var-card">\r
              <span class="css-var-card__name">--nav-bg</span>\r
              <div class="css-var-card__swatch" style="background-color: var(--nav-bg);"></div>\r
              <span class="css-var-card__desc">Fondo de navegaci\xF3n</span>\r
            </div>\r
            <div class="css-var-card">\r
              <span class="css-var-card__name">--color-primary</span>\r
              <div class="css-var-card__swatch" style="background-color: var(--color-primary);"></div>\r
              <span class="css-var-card__desc">Color de acci\xF3n principal</span>\r
            </div>\r
            <div class="css-var-card">\r
              <span class="css-var-card__name">--shadow-color</span>\r
              <div class="css-var-card__swatch" style="background-color: var(--shadow-color);"></div>\r
              <span class="css-var-card__desc">Color de sombras brutales</span>\r
            </div>\r
          </div>\r
        </div>\r
      </section>\r
    }\r
  </div>\r
\r
  <!-- Notificaciones flotantes est\xE1ticas (Toast) -->\r
  @for (notification of staticNotifications; track notification.id; let i = $index) {\r
    <app-notification\r
      [type]="notification.type"\r
      [title]="notification.title"\r
      [message]="notification.message"\r
      position="top-right"\r
      [stackIndex]="i"\r
      [getHeightAt]="getNotificationHeight"\r
      [autoDismiss]="true"\r
      [duration]="5000"\r
      (dismissed)="removeStaticNotification(notification.id)"\r
    ></app-notification>\r
  }\r
</div>\r
`, styles: ['@charset "UTF-8";\n\n/* src/app/pages/style-guide/style-guide.scss */\n.style-guide {\n  min-height: 100vh;\n  background-color: var(--bg-primary);\n  padding-top: 0;\n  position: relative;\n}\n.style-guide__sidebar {\n  position: fixed;\n  left: 2rem;\n  bottom: 2rem;\n  z-index: 3;\n  display: flex;\n  flex-direction: column-reverse;\n  align-items: flex-start;\n  gap: 1rem;\n  pointer-events: none;\n}\n@media (max-width: 768px) {\n  .style-guide__sidebar {\n    left: 1rem;\n    bottom: 1rem;\n  }\n}\n.style-guide__sidebar-toggle {\n  display: inline-flex;\n  align-items: center;\n  justify-content: center;\n  gap: 0.5rem;\n  font-family: "Space Grotesk", sans-serif;\n  font-weight: 600;\n  text-transform: uppercase;\n  letter-spacing: 0.05em;\n  text-decoration: none;\n  cursor: pointer;\n  border: 3px solid var(--border-color);\n  border-radius: 9999px;\n  transition: all 150ms ease-in-out;\n  white-space: nowrap;\n  box-sizing: border-box;\n  background-color: var(--color-primary);\n  border: 4px solid var(--border-color);\n  box-shadow: 6px 6px 0px #01131B;\n  width: 48px;\n  height: 48px;\n  min-height: 44px;\n  padding: 0;\n  font-size: 1.5rem;\n  position: relative;\n  z-index: 2;\n  pointer-events: auto;\n}\n.style-guide__sidebar-toggle:focus-visible {\n  outline: 3px solid var(--color-accent);\n  outline-offset: 2px;\n}\n.style-guide__sidebar-toggle:hover {\n  background-color: var(--color-secondary);\n  box-shadow: 2px 2px 0px #01131B;\n  transform: translate(3px, 3px);\n}\n.style-guide__sidebar-toggle:active {\n  box-shadow: 0px 0px 0px #01131B;\n  transform: translate(6px, 6px);\n}\n.style-guide__sidebar-toggle:focus-visible {\n  outline: 3px solid #BB3F03;\n  outline-offset: 4px;\n}\n.style-guide__sidebar-icon {\n  font-size: 1.75rem;\n  line-height: 1;\n  flex-shrink: 0;\n}\n.style-guide__sidebar-menu {\n  list-style: none;\n  margin: 0;\n  padding: 0;\n  display: flex;\n  flex-direction: column;\n  align-items: flex-start;\n  gap: 0.5rem;\n  pointer-events: auto;\n  opacity: 0;\n  visibility: hidden;\n  transform: translateY(20px) scale(0.9);\n  transform-origin: bottom left;\n  transition:\n    opacity 300ms ease-in-out,\n    transform 300ms ease-in-out cubic-bezier(0.175, 0.885, 0.32, 1.275),\n    visibility 300ms ease-in-out;\n}\n.style-guide__sidebar--open .style-guide__sidebar-menu {\n  opacity: 1;\n  visibility: visible;\n  transform: translateY(0) scale(1);\n}\n.style-guide__sidebar-item {\n  list-style: none;\n}\n.style-guide__sidebar-link {\n  display: inline-flex;\n  align-items: center;\n  justify-content: center;\n  gap: 0.5rem;\n  font-family: "Space Grotesk", sans-serif;\n  font-weight: 600;\n  text-transform: uppercase;\n  letter-spacing: 0.05em;\n  text-decoration: none;\n  cursor: pointer;\n  border: 3px solid var(--border-color);\n  border-radius: 9999px;\n  transition: all 150ms ease-in-out;\n  white-space: nowrap;\n  box-sizing: border-box;\n  background-color: var(--bg-primary);\n  color: var(--text-primary);\n  border: 3px solid var(--border-color);\n  box-shadow: 4px 4px 0px #01131B;\n  min-width: 150px;\n  padding: 1rem 2rem;\n  font-size: 0.875rem;\n  min-height: 44px;\n  position: relative;\n}\n.style-guide__sidebar-link:focus-visible {\n  outline: 3px solid var(--color-accent);\n  outline-offset: 2px;\n}\n.style-guide__sidebar-link:hover {\n  background-color: var(--bg-secondary);\n  color: var(--text-primary);\n  box-shadow: 1px 1px 0px #01131B;\n  transform: translate(2px, 2px);\n}\n.style-guide__sidebar-link:active {\n  box-shadow: 0px 0px 0px #01131B;\n  transform: translate(4px, 4px);\n}\n.style-guide__sidebar-link:focus-visible {\n  outline: 3px solid #BB3F03;\n  outline-offset: 2px;\n}\n.style-guide__sidebar-link--active {\n  background-color: var(--color-primary);\n  color: var(--text-primary);\n  font-weight: 700;\n  border-color: var(--text-primary);\n}\n.style-guide__container {\n  flex: 1;\n  padding: 4rem;\n  width: 100%;\n  min-height: calc(100vh - 7rem);\n  overflow-y: auto;\n}\n@media (max-width: 768px) {\n  .style-guide__container {\n    padding: 3rem;\n    min-height: calc(100vh - 6rem);\n  }\n}\n@media (max-width: 320px) {\n  .style-guide__container {\n    padding: 2rem;\n  }\n}\n.style-guide__header {\n  text-align: center;\n  margin-bottom: 4rem;\n  padding: 4rem 0;\n  border-bottom: 3px solid var(--border-color) solid var(--text-primary);\n}\n.style-guide__header h1 {\n  font-size: 2.625rem;\n  color: var(--color-primary);\n  margin-bottom: 1rem;\n  text-transform: uppercase;\n  letter-spacing: 0.05em;\n}\n@media (max-width: 768px) {\n  .style-guide__header h1 {\n    font-size: 1.625rem;\n  }\n}\n.style-guide__intro {\n  font-size: 1.125rem;\n  color: var(--text-primary);\n  max-width: 600px;\n  margin: 0 auto;\n}\n@media (max-width: 768px) {\n  .style-guide__intro {\n    font-size: 1rem;\n  }\n}\n.style-guide__section {\n  margin-bottom: 4rem;\n  padding: 3rem;\n  background-color: var(--bg-secondary);\n  border: 3px solid var(--border-color) solid var(--border-color);\n  border-radius: 8px;\n  box-shadow: 4px 4px 0px #01131B;\n}\n.style-guide__section h2 {\n  font-size: 1.625rem;\n  color: var(--color-secondary);\n  margin-bottom: 3rem;\n  padding-bottom: 1rem;\n  border-bottom: 2px solid var(--border-color);\n  text-transform: uppercase;\n}\n@media (max-width: 768px) {\n  .style-guide__section h2 {\n    font-size: 1rem;\n  }\n}\n.style-guide__section--placeholder {\n  text-align: center;\n  padding: 4rem;\n  opacity: 0.6;\n}\n.style-guide__section--placeholder h2 {\n  border-bottom: none;\n}\n.style-guide__section--placeholder p {\n  color: var(--text-primary);\n  font-size: 1.125rem;\n}\n.showcase {\n  margin-bottom: 3rem;\n}\n.showcase:last-child {\n  margin-bottom: 0;\n}\n.showcase h3 {\n  font-size: 1rem;\n  color: var(--text-primary);\n  margin-bottom: 2rem;\n  text-transform: uppercase;\n  letter-spacing: 0.05em;\n}\n@media (max-width: 768px) {\n  .showcase h3 {\n    font-size: 1.125rem;\n  }\n}\n.showcase__row {\n  display: flex;\n  gap: 2rem;\n  flex-wrap: wrap;\n  align-items: flex-start;\n}\n@media (max-width: 768px) {\n  .showcase__row {\n    gap: 1rem;\n  }\n}\n@media (max-width: 320px) {\n  .showcase__row {\n    flex-direction: column;\n  }\n  .showcase__row .showcase__item {\n    width: 100%;\n  }\n}\n.showcase__row--cards-polaroid {\n  justify-content: flex-start;\n}\n.showcase__row--cards-polaroid .showcase__item--card-polaroid {\n  flex: 0 0 auto;\n  width: auto;\n}\n.showcase__row--cards-polaroid .showcase__item--card-polaroid app-card {\n  display: block;\n  width: 220px;\n  max-width: 220px;\n}\n@media (max-width: 768px) {\n  .showcase__row--cards-polaroid {\n    justify-content: center;\n  }\n}\n@media (max-width: 320px) {\n  .showcase__row--cards-polaroid .showcase__item--card-polaroid {\n    width: 100%;\n    max-width: 100%;\n  }\n  .showcase__row--cards-polaroid .showcase__item--card-polaroid app-card {\n    width: 100%;\n    max-width: 100%;\n  }\n}\n.showcase__column {\n  display: flex;\n  flex-direction: column;\n  gap: 2rem;\n  width: 100%;\n}\n.showcase__grid {\n  display: grid;\n  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));\n  gap: 3rem 2rem;\n  align-items: start;\n}\n@media (max-width: 768px) {\n  .showcase__grid {\n    grid-template-columns: 1fr;\n    gap: 2rem;\n  }\n}\n.showcase__grid--forms {\n  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));\n  align-items: flex-start;\n  gap: 4rem;\n}\n@media (max-width: 1024px) {\n  .showcase__grid--forms {\n    grid-template-columns: repeat(2, 1fr);\n    gap: 3rem;\n  }\n}\n@media (max-width: 768px) {\n  .showcase__grid--forms {\n    grid-template-columns: 1fr;\n    gap: 2rem;\n  }\n}\n.showcase__item {\n  display: flex;\n  flex-direction: column;\n  gap: 0.5rem;\n  align-items: flex-start;\n  min-width: 0;\n  max-width: 100%;\n}\n.showcase__item--full {\n  width: 100%;\n  min-width: 0;\n}\n.showcase__item > * {\n  max-width: 100%;\n}\n.showcase__item code {\n  font-family: "Courier New", monospace;\n  font-size: 0.875rem;\n  padding: 0.5rem 1rem;\n  background-color: var(--bg-primary);\n  border: 2px solid var(--border-color);\n  border-radius: 5px;\n  color: var(--text-primary);\n  white-space: nowrap;\n  overflow: auto;\n  max-width: 100%;\n}\n@media (max-width: 768px) {\n  .showcase__item code {\n    font-size: 0.75rem;\n    padding: 0.5rem;\n    white-space: normal;\n    word-break: break-all;\n  }\n}\napp-carousel {\n  display: block;\n  width: 100%;\n  max-width: 100%;\n  min-width: 0;\n}\napp-carousel .carousel__track > app-card {\n  display: block;\n  flex: 0 0 220px !important;\n  width: 220px !important;\n  min-width: 220px !important;\n  max-width: 220px !important;\n}\n@media (max-width: 768px) {\n  app-carousel .carousel__track > app-card {\n    flex: 0 0 169.4px !important;\n    width: 169.4px !important;\n    min-width: 169.4px !important;\n    max-width: 169.4px !important;\n  }\n}\n@media (max-width: 320px) {\n  app-carousel .carousel__track > app-card {\n    flex: 0 0 149.6px !important;\n    width: 149.6px !important;\n    min-width: 149.6px !important;\n    max-width: 149.6px !important;\n  }\n}\napp-form-input,\napp-form-textarea,\napp-form-select,\napp-form-checkbox,\napp-form-radio-group {\n  display: block;\n  width: 100%;\n  max-width: 100%;\n}\n.showcase__row app-card,\n.showcase__column app-card,\n.showcase__item app-card {\n  display: block;\n  width: 100%;\n  max-width: 100%;\n  min-width: 0;\n}\napp-alert {\n  display: block;\n  width: 100%;\n}\napp-breadcrumbs {\n  display: block;\n  width: 100%;\n  overflow: hidden;\n}\n.style-guide__carousel-demo-controls {\n  display: flex;\n  flex-wrap: wrap;\n  gap: 1rem;\n  margin-top: 1rem;\n  align-items: center;\n}\n.style-guide__carousel-demo-opacity {\n  display: flex;\n  align-items: center;\n  gap: 0.5rem;\n  flex-wrap: wrap;\n}\n.style-guide__carousel-demo-range {\n  width: 149.6px;\n  max-width: 100%;\n}\n@media (max-width: 768px) {\n  .style-guide__carousel-demo-controls {\n    align-items: stretch;\n  }\n  .style-guide__carousel-demo-range {\n    width: 100%;\n  }\n}\n.color-swatch {\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n  justify-content: center;\n  gap: 0.5rem;\n  padding: 3rem;\n  min-height: 10rem;\n  border: 3px solid var(--border-color);\n}\n.color-swatch__name {\n  font-weight: 700;\n  font-size: 0.875rem;\n  text-transform: uppercase;\n}\n.color-swatch code {\n  font-size: 0.75rem;\n  background: color-mix(in srgb, var(--text-white) 80%, transparent);\n  padding: 0.5rem;\n  border-radius: 3px;\n  color: var(--text-dark);\n}\n.color-swatch--primary {\n  background-color: var(--color-accent-primary);\n  color: var(--color-text-on-accent);\n}\n.color-swatch--secondary {\n  background-color: var(--color-accent-secondary);\n  color: var(--color-text-primary);\n}\n.color-swatch--bg {\n  background-color: var(--color-bg-primary);\n  color: var(--color-text-primary);\n}\n.color-swatch--bg-secondary {\n  background-color: var(--color-bg-secondary);\n  color: var(--color-text-primary);\n}\n.color-swatch--text {\n  background-color: var(--color-text-primary);\n  color: var(--color-bg-primary);\n}\n.color-swatch--border {\n  background-color: var(--color-border);\n  color: var(--color-bg-primary);\n}\n.color-swatch--success {\n  background-color: var(--color-success);\n  color: var(--text-white);\n}\n.color-swatch--warning {\n  background-color: var(--color-warning);\n  color: var(--text-dark);\n}\n.color-swatch--error {\n  background-color: var(--color-error);\n  color: var(--text-white);\n}\n.color-swatch--info {\n  background-color: var(--color-info);\n  color: var(--text-white);\n}\n.showcase__grid--colors {\n  grid-template-columns: repeat(auto-fit, minmax(149.6px, 1fr));\n}\n.shadow-sample {\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  width: 10rem;\n  height: 10rem;\n  background-color: var(--color-bg-primary);\n  border: 3px solid var(--border-color);\n  font-weight: 600;\n  text-transform: uppercase;\n}\n.shadow-sample--sm {\n  box-shadow: 2px 2px 0px #01131B;\n}\n.shadow-sample--md {\n  box-shadow: 4px 4px 0px #01131B;\n}\n.shadow-sample--lg {\n  box-shadow: 6px 6px 0px #01131B;\n}\n.spacing-samples {\n  display: flex;\n  flex-direction: column;\n  gap: 1rem;\n  width: 100%;\n}\n.spacing-sample {\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  height: 4.5rem;\n  min-width: 4.5rem;\n  background-color: var(--color-accent-primary);\n  color: var(--color-text-on-accent);\n  font-weight: 600;\n  font-size: 0.75rem;\n  border: 2px solid var(--border-color);\n}\n.spacing-sample span {\n  white-space: nowrap;\n}\n.typography-sample {\n  background-color: var(--color-bg-primary);\n  padding: 3rem;\n  border: 2px solid var(--border-color);\n}\n.typography-sample h1,\n.typography-sample h2,\n.typography-sample h3,\n.typography-sample h4 {\n  margin-bottom: 1rem;\n}\n.typography-sample p {\n  margin-bottom: 0.5rem;\n}\n.layout-diagram {\n  display: flex;\n  flex-direction: column;\n  gap: 0.5rem;\n  border: 4px solid var(--border-color);\n  background-color: var(--border-color);\n  max-width: 600px;\n  margin: 0 auto;\n  border-radius: 8px;\n  overflow: hidden;\n  box-shadow: 4px 4px 0px #01131B;\n}\n.layout-diagram__header,\n.layout-diagram__footer {\n  background-color: var(--color-primary);\n  color: var(--text-dark);\n  padding: 2rem;\n  text-align: center;\n  font-weight: 700;\n  text-transform: uppercase;\n  letter-spacing: 0.05em;\n}\n.layout-diagram__body {\n  display: flex;\n  gap: 0.5rem;\n  min-height: 150px;\n}\n.layout-diagram__sidebar {\n  flex: 0 0 149.6px;\n  background-color: var(--bg-secondary);\n  padding: 2rem;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  font-weight: 600;\n  text-transform: uppercase;\n}\n@media (max-width: 768px) {\n  .layout-diagram__sidebar {\n    flex: 0 0 7rem;\n    font-size: 0.75rem;\n  }\n}\n.layout-diagram__main {\n  flex: 1;\n  background-color: var(--bg-primary);\n  padding: 2rem;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  font-weight: 600;\n  text-transform: uppercase;\n}\n.showcase__grid--breakpoints {\n  grid-template-columns: repeat(auto-fit, minmax(18rem, 1fr));\n}\n.breakpoint-card {\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n  gap: 0.5rem;\n  padding: 2rem;\n  background-color: var(--bg-primary);\n  border: 3px solid var(--border-color);\n  border-radius: 5px;\n  text-align: center;\n  box-shadow: 2px 2px 0px #01131B;\n}\n.breakpoint-card__name {\n  font-weight: 700;\n  font-size: 1rem;\n  text-transform: uppercase;\n  color: var(--text-primary);\n}\n.breakpoint-card__value {\n  font-size: 1rem;\n  font-weight: 600;\n  color: var(--color-primary);\n}\n.breakpoint-card code {\n  font-size: 0.75rem;\n}\n.showcase__item--centered {\n  align-items: center;\n  width: 100%;\n  margin: 0 auto;\n}\n.font-showcase {\n  background-color: var(--bg-secondary);\n  border: 3px solid var(--border-color);\n  border-radius: 8px;\n  padding: 3rem;\n  margin-bottom: 3rem;\n}\n.font-showcase:last-child {\n  margin-bottom: 0;\n}\n.font-showcase__header {\n  display: flex;\n  align-items: center;\n  justify-content: space-between;\n  margin-bottom: 2rem;\n  padding-bottom: 1rem;\n  border-bottom: 2px solid var(--border-color);\n}\n.font-showcase__header h4 {\n  font-size: 1rem;\n  margin: 0;\n  color: var(--text-primary);\n  text-transform: uppercase;\n}\n.font-showcase__tag {\n  display: inline-block;\n  padding: 0.5rem 1rem;\n  background-color: var(--color-primary);\n  color: var(--text-dark);\n  border: 2px solid var(--border-color);\n  border-radius: 3px;\n  font-size: 0.75rem;\n  font-weight: 600;\n  text-transform: uppercase;\n}\n.font-showcase__tag--accent {\n  background-color: var(--color-secondary);\n}\n.font-showcase__samples {\n  display: flex;\n  flex-direction: column;\n  gap: 2rem;\n  margin-bottom: 2rem;\n}\n.font-showcase__sample {\n  display: flex;\n  flex-direction: column;\n  gap: 0.5rem;\n}\n.font-showcase__sample h1,\n.font-showcase__sample h2,\n.font-showcase__sample h3,\n.font-showcase__sample p,\n.font-showcase__sample div {\n  margin: 0;\n  color: var(--text-primary);\n}\n.font-showcase__label {\n  font-size: 0.75rem;\n  color: var(--text-secondary);\n  font-weight: 600;\n  text-transform: uppercase;\n  letter-spacing: 0.05em;\n}\n.font-showcase__usage {\n  padding: 1rem 2rem;\n  background-color: var(--bg-primary);\n  border: 2px solid var(--border-color);\n  border-radius: 5px;\n  font-size: 0.875rem;\n  color: var(--text-primary);\n}\n.font-showcase__usage strong {\n  color: var(--color-primary);\n}\n.monoton-sample {\n  color: var(--color-primary);\n}\n.monoton-sample--lg {\n  font-size: 5.6525rem;\n}\n.monoton-sample--md {\n  font-size: 2.625rem;\n}\n.monoton-sample--sm {\n  font-size: 1.625rem;\n}\n.color-section-title {\n  font-size: 1.125rem;\n  color: var(--text-primary);\n  margin: 3rem 0 2rem 0;\n  text-transform: uppercase;\n  font-weight: 600;\n  letter-spacing: 0.05em;\n}\n.color-grid {\n  display: grid;\n  grid-template-columns: repeat(4, 1fr);\n  gap: 2rem;\n  margin-bottom: 3rem;\n}\n@media (max-width: 1024px) {\n  .color-grid {\n    grid-template-columns: repeat(3, 1fr);\n  }\n}\n@media (max-width: 768px) {\n  .color-grid {\n    grid-template-columns: repeat(2, 1fr);\n    gap: 1rem;\n  }\n}\n.color-grid--semantic {\n  grid-template-columns: repeat(auto-fit, minmax(18rem, 1fr));\n}\n.color-card {\n  background-color: var(--bg-secondary);\n  border: 3px solid var(--border-color);\n  border-radius: 5px;\n  box-shadow: 4px 4px 0px #01131B;\n  overflow: hidden;\n  transition: transform 150ms ease-in-out ease, box-shadow 150ms ease-in-out ease;\n  display: flex;\n  flex-direction: column;\n  height: 100%;\n}\n.color-card:hover {\n  transform: translate(-2px, -2px);\n  box-shadow: 6px 6px 0px #01131B;\n}\n.color-card__swatch {\n  width: 100%;\n  height: 12rem;\n  border-bottom: 3px solid var(--border-color);\n}\n.color-card__info {\n  padding: 1rem;\n  display: flex;\n  flex-direction: column;\n  gap: 0.5rem;\n  flex: 1;\n}\n.color-card__name {\n  font-weight: 700;\n  font-size: 0.875rem;\n  color: var(--text-primary);\n  text-transform: uppercase;\n}\n.color-card__hex {\n  font-size: 0.75rem;\n  color: var(--text-secondary);\n  font-family: "Courier New", monospace;\n}\n.color-card code {\n  font-size: 0.6225rem;\n  padding: 0.5rem 0.5rem;\n  background-color: var(--bg-primary);\n  border: 1px solid var(--border-color);\n  border-radius: 3px;\n  color: var(--text-primary);\n  font-family: "Courier New", monospace;\n  margin-top: auto;\n}\n.shadow-demo {\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n  gap: 1rem;\n  padding: 2rem;\n}\n.shadow-demo__box {\n  width: 10rem;\n  height: 10rem;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  background-color: var(--color-primary);\n  color: var(--text-dark);\n  border: 3px solid var(--border-color);\n  border-radius: 5px;\n  font-weight: 700;\n  font-size: 1rem;\n}\n.shadow-demo__box--xs {\n  box-shadow: 2px 2px 0px #01131B;\n}\n.shadow-demo__box--s {\n  box-shadow: 4px 4px 0px #01131B;\n}\n.shadow-demo__box--m {\n  box-shadow: 6px 6px 0px #01131B;\n}\n.shadow-demo__box--l {\n  box-shadow: 8px 8px 0px #01131B;\n}\n.shadow-demo__box--vinyl-s {\n  box-shadow: 0.5rem 0.5rem 0px var(--vinyl-shadow-layer-1), 1rem 1rem 0px var(--vinyl-shadow-layer-2);\n}\n.shadow-demo__box--vinyl-m {\n  box-shadow:\n    0.5rem 0.5rem 0px var(--vinyl-shadow-layer-1),\n    1rem 1rem 0px var(--vinyl-shadow-layer-2),\n    1.5rem 1.5rem 0px var(--vinyl-shadow-layer-3);\n}\n.shadow-demo__box--vinyl-l {\n  box-shadow:\n    0.5rem 0.5rem 0px var(--vinyl-shadow-layer-1),\n    1rem 1rem 0px var(--vinyl-shadow-layer-2),\n    1.5rem 1.5rem 0px var(--vinyl-shadow-layer-3),\n    2rem 2rem 0px var(--vinyl-shadow-layer-4);\n}\n.shadow-demo code {\n  text-align: center;\n}\n.spacing-grid {\n  display: grid;\n  grid-template-columns: repeat(auto-fit, minmax(16rem, 1fr));\n  gap: 2rem;\n}\n@media (max-width: 768px) {\n  .spacing-grid {\n    grid-template-columns: repeat(2, 1fr);\n    gap: 1rem;\n  }\n}\n@media (max-width: 320px) {\n  .spacing-grid {\n    grid-template-columns: 1fr;\n  }\n}\n.spacing-card {\n  background-color: var(--bg-secondary);\n  border: 3px solid var(--border-color);\n  border-radius: 5px;\n  padding: 2rem;\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n  gap: 1rem;\n  box-shadow: 2px 2px 0px #01131B;\n}\n.spacing-card__visual {\n  width: 100%;\n  height: 10rem;\n  background-color: var(--bg-primary);\n  border: 2px solid var(--border-color) dashed var(--border-color);\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  border-radius: 3px;\n}\n.spacing-card__block {\n  background-color: var(--color-primary);\n  border: 2px solid var(--border-color);\n  border-radius: 3px;\n}\n.spacing-card__info {\n  text-align: center;\n  display: flex;\n  flex-direction: column;\n  gap: 0.5rem;\n  width: 100%;\n}\n.spacing-card__name {\n  font-weight: 700;\n  font-size: 1rem;\n  color: var(--text-primary);\n  text-transform: uppercase;\n}\n.spacing-card__value {\n  font-size: 0.75rem;\n  color: var(--text-secondary);\n  font-family: "Courier New", monospace;\n}\n.spacing-card code {\n  font-size: 0.6225rem;\n  padding: 0.5rem 0.75rem;\n  background-color: var(--bg-primary);\n  border: 1px solid var(--border-color);\n  border-radius: 3px;\n  color: var(--text-primary);\n}\n.link {\n  font-size: 1rem;\n  line-height: 1.5rem;\n  color: var(--color-primary);\n  text-decoration: none;\n  font-weight: 500;\n  position: relative;\n  display: inline-flex;\n  align-items: center;\n  gap: 0.5rem;\n  transition: all 150ms ease-in-out;\n}\n.link:hover {\n  color: var(--color-secondary);\n  transform: translateY(-1px);\n}\n.link:active {\n  transform: translateY(0);\n}\n.link:focus-visible {\n  outline: 2px solid var(--border-color) var(--color-accent);\n  outline-offset: 0.5rem;\n  border-radius: 3px;\n}\n.link--primary {\n  color: var(--color-primary);\n  font-weight: 600;\n}\n.link--primary:hover {\n  color: var(--color-secondary);\n}\n.link--underlined::after {\n  content: "";\n  position: absolute;\n  bottom: -2px;\n  left: 0;\n  width: 0;\n  height: 2px;\n  background-color: var(--color-primary);\n  transition: width 150ms ease-in-out;\n}\n.link--underlined:hover::after {\n  width: 100%;\n}\n.link--arrow:hover {\n  gap: calc(0.5rem + 0.5rem);\n}\n.toggle-wrapper {\n  display: flex;\n  align-items: center;\n  gap: 1rem;\n  cursor: pointer;\n  -webkit-user-select: none;\n  user-select: none;\n}\n.toggle-wrapper--disabled {\n  opacity: 0.6;\n  cursor: not-allowed;\n  pointer-events: none;\n}\n.toggle {\n  width: 50px;\n  height: 26px;\n  background-color: var(--bg-secondary);\n  border: 3px solid var(--border-color);\n  border-radius: 5px;\n  box-shadow: 2px 2px 0px #01131B;\n  cursor: pointer;\n  position: relative;\n  appearance: none;\n  transition: background-color 300ms ease-in-out;\n}\n.toggle::after {\n  content: "";\n  position: absolute;\n  width: 18px;\n  height: 18px;\n  background-color: var(--bg-primary);\n  border: 2px solid var(--border-color);\n  border-radius: 3px;\n  top: 2px;\n  left: 2px;\n  transition: transform 300ms ease-in-out cubic-bezier(0.25, 0.46, 0.45, 0.94);\n}\n.toggle:checked {\n  background-color: var(--color-primary);\n}\n.toggle:checked::after {\n  transform: translateX(24px);\n}\n.toggle:focus-visible {\n  outline: 2px solid var(--border-color) var(--color-accent);\n  outline-offset: 0.5rem;\n}\n.toggle:not(:disabled):hover {\n  box-shadow: 2px 2px 0px #01131B;\n}\n.toggle:disabled {\n  opacity: 0.5;\n  cursor: not-allowed;\n  pointer-events: none;\n}\n.toggle-label {\n  font-size: 1rem;\n  line-height: 1.5rem;\n  color: var(--text-primary);\n  font-weight: 500;\n}\n.checkbox-wrapper {\n  display: flex;\n  align-items: center;\n  gap: 0.5rem;\n  cursor: pointer;\n  -webkit-user-select: none;\n  user-select: none;\n}\n.checkbox-wrapper--disabled {\n  opacity: 0.6;\n  cursor: not-allowed;\n  pointer-events: none;\n}\n.checkbox {\n  width: 20px;\n  height: 20px;\n  border: 3px solid var(--border-color);\n  border-radius: 3px;\n  background-color: var(--bg-primary);\n  box-shadow: 2px 2px 0px #01131B;\n  cursor: pointer;\n  appearance: none;\n  position: relative;\n  transition: all 150ms ease-in-out;\n  flex-shrink: 0;\n}\n.checkbox:checked {\n  background-color: var(--color-primary);\n}\n.checkbox:checked::after {\n  content: "\\2713";\n  position: absolute;\n  top: 50%;\n  left: 50%;\n  transform: translate(-50%, -50%);\n  font-weight: 700;\n  font-size: 1rem;\n  color: var(--text-dark);\n}\n.checkbox:focus-visible {\n  outline: 2px solid var(--border-color) var(--color-accent);\n  outline-offset: 0.5rem;\n}\n.checkbox:not(:disabled):hover {\n  box-shadow: 2px 2px 0px #01131B;\n  transform: translate(-1px, -1px);\n}\n.checkbox:disabled {\n  opacity: 0.5;\n  cursor: not-allowed;\n  pointer-events: none;\n}\n.checkbox-label {\n  font-size: 1rem;\n  line-height: 1.5rem;\n  color: var(--text-primary);\n  font-weight: 400;\n}\n.radio-wrapper {\n  display: flex;\n  align-items: center;\n  gap: 0.5rem;\n  cursor: pointer;\n  -webkit-user-select: none;\n  user-select: none;\n}\n.radio-wrapper--disabled {\n  opacity: 0.6;\n  cursor: not-allowed;\n  pointer-events: none;\n}\n.radio {\n  width: 20px;\n  height: 20px;\n  border: 3px solid var(--border-color);\n  border-radius: 50%;\n  background-color: var(--bg-primary);\n  box-shadow: 2px 2px 0px #01131B;\n  cursor: pointer;\n  appearance: none;\n  position: relative;\n  transition: all 150ms ease-in-out;\n  flex-shrink: 0;\n}\n.radio:checked {\n  background-color: var(--color-primary);\n}\n.radio:checked::after {\n  content: "";\n  position: absolute;\n  top: 50%;\n  left: 50%;\n  transform: translate(-50%, -50%);\n  width: 1rem;\n  height: 1rem;\n  background-color: var(--text-dark);\n  border-radius: 50%;\n}\n.radio:focus-visible {\n  outline: 2px solid var(--border-color) var(--color-accent);\n  outline-offset: 0.5rem;\n}\n.radio:not(:disabled):hover {\n  box-shadow: 2px 2px 0px #01131B;\n  transform: translate(-1px, -1px);\n}\n.radio:disabled {\n  opacity: 0.5;\n  cursor: not-allowed;\n  pointer-events: none;\n}\n.radio-label {\n  font-size: 1rem;\n  line-height: 1.5rem;\n  color: var(--text-primary);\n  font-weight: 400;\n}\n.layout-info-card {\n  display: flex;\n  flex-direction: column;\n  gap: 0.5rem;\n  padding: 2rem;\n  background-color: var(--bg-primary);\n  border: 3px solid var(--border-color);\n  border-radius: 5px;\n  box-shadow: 4px 4px 0px #01131B;\n  transition: all 150ms ease-in-out;\n}\n.layout-info-card:hover {\n  transform: translate(-2px, -2px);\n  box-shadow: 6px 6px 0px #01131B;\n}\n.layout-info-card__header {\n  display: flex;\n  align-items: center;\n  gap: 1rem;\n  padding-bottom: 0.5rem;\n  border-bottom: 2px solid var(--border-color);\n}\n.layout-info-card__icon {\n  width: 4rem;\n  height: 4rem;\n  stroke: var(--color-primary);\n  flex-shrink: 0;\n}\n.layout-info-card__name {\n  font-family: "Courier New", monospace;\n  font-size: 0.875rem;\n  font-weight: 700;\n  color: var(--text-primary);\n}\n.layout-info-card__desc {\n  font-size: 0.875rem;\n  color: var(--text-secondary);\n  line-height: 1.5rem;\n  margin: 0;\n}\n.layout-info-card__vars {\n  display: flex;\n  flex-wrap: wrap;\n  gap: 0.5rem;\n  margin-top: auto;\n}\n.layout-info-card__vars code {\n  font-size: 0.75rem;\n  padding: 0.5rem 0.5rem;\n  background-color: var(--bg-secondary);\n  border: 1px solid var(--border-color);\n  border-radius: 3px;\n  color: var(--color-primary);\n}\n.showcase__row--wrap {\n  display: flex;\n  flex-wrap: wrap;\n  gap: 3rem;\n  justify-content: center;\n  align-items: flex-start;\n}\n.showcase__item--breakpoint {\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n  gap: 1rem;\n}\n.showcase__item--breakpoint app-card {\n  width: 18rem;\n}\n.showcase__item--breakpoint code {\n  font-size: 0.75rem;\n  padding: 0.5rem 1rem;\n  background-color: var(--bg-secondary);\n  border: 2px solid var(--border-color);\n  border-radius: 3px;\n  color: var(--color-primary);\n  font-weight: 600;\n}\n.showcase__code {\n  display: block;\n  text-align: center;\n}\n.z-index-scale {\n  display: flex;\n  flex-direction: column;\n  gap: 0.5rem;\n  max-width: 600px;\n  margin: 0 auto;\n}\n.z-index-scale__item {\n  display: flex;\n  align-items: center;\n  gap: 1rem;\n  padding: 0.5rem 1rem;\n  background-color: var(--bg-secondary);\n  border: 2px solid var(--border-color);\n  border-radius: 3px;\n  transition: all 150ms ease-in-out;\n}\n.z-index-scale__item:hover {\n  transform: translateX(4px);\n  box-shadow: 2px 2px 0px #01131B;\n}\n.z-index-scale__item--10 {\n  background-color: color-mix(in srgb, #E04A4A 30%, transparent);\n}\n.z-index-scale__item--9 {\n  background-color: color-mix(in srgb, #E04A4A 20%, transparent);\n}\n.z-index-scale__item--8 {\n  background-color: color-mix(in srgb, #FFC047 30%, transparent);\n}\n.z-index-scale__item--7 {\n  background-color: color-mix(in srgb, #FFC047 20%, transparent);\n}\n.z-index-scale__item--6 {\n  background-color: color-mix(in srgb, #ED9C05 30%, transparent);\n}\n.z-index-scale__item--5 {\n  background-color: color-mix(in srgb, #ED9C05 20%, transparent);\n}\n.z-index-scale__item--4 {\n  background-color: color-mix(in srgb, #AAD661 30%, transparent);\n}\n.z-index-scale__item--3 {\n  background-color: color-mix(in srgb, #AAD661 20%, transparent);\n}\n.z-index-scale__item--2 {\n  background-color: color-mix(in srgb, #0A9295 20%, transparent);\n}\n.z-index-scale__item--1 {\n  background-color: color-mix(in srgb, #0A9295 10%, transparent);\n}\n.z-index-scale__item--0 {\n  background-color: var(--bg-primary);\n}\n.z-index-scale__level {\n  width: 4.5rem;\n  height: 4.5rem;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  background-color: var(--color-primary);\n  border: 2px solid var(--border-color);\n  border-radius: 3px;\n  font-weight: 700;\n  font-size: 0.875rem;\n  color: var(--text-dark);\n  flex-shrink: 0;\n}\n.z-index-scale__name {\n  flex: 1;\n  font-family: "Courier New", monospace;\n  font-size: 0.875rem;\n  font-weight: 600;\n  color: var(--text-primary);\n}\n.z-index-scale__desc {\n  font-size: 0.75rem;\n  color: var(--text-secondary);\n  text-align: right;\n}\n@media (max-width: 768px) {\n  .z-index-scale__desc {\n    display: none;\n  }\n}\n.css-var-card {\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n  gap: 0.5rem;\n  padding: 2rem;\n  background-color: var(--bg-primary);\n  border: 3px solid var(--border-color);\n  border-radius: 5px;\n  box-shadow: 2px 2px 0px #01131B;\n  transition: all 150ms ease-in-out;\n}\n.css-var-card:hover {\n  transform: translate(-2px, -2px);\n  box-shadow: 6px 6px 0px #01131B;\n}\n.css-var-card__name {\n  font-family: "Courier New", monospace;\n  font-size: 0.75rem;\n  font-weight: 600;\n  color: var(--color-primary);\n  text-align: center;\n}\n.css-var-card__swatch {\n  width: 8rem;\n  height: 8rem;\n  border: 3px solid var(--border-color);\n  border-radius: 3px;\n  box-shadow: 2px 2px 0px #01131B;\n}\n.css-var-card__desc {\n  font-size: 0.75rem;\n  color: var(--text-secondary);\n  text-align: center;\n}\n/*# sourceMappingURL=style-guide.css.map */\n'] }]
  }], () => [], { demoCarousel: [{
    type: ViewChild,
    args: ["demoCarousel"]
  }], notificationComponents: [{
    type: ViewChildren,
    args: [Notification]
  }] });
})();
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(StyleGuide, { className: "StyleGuide", filePath: "src/app/pages/style-guide/style-guide.ts", lineNumber: 64 });
})();
export {
  StyleGuide
};
//# sourceMappingURL=chunk-FW3ZXBD3.js.map
