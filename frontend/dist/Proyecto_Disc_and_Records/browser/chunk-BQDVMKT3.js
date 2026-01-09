import {
  NG_VALUE_ACCESSOR
} from "./chunk-AVQDXX3C.js";
import {
  CommonModule,
  Component,
  Input,
  NgForOf,
  NgIf,
  forwardRef,
  setClassMetadata,
  ɵsetClassDebugInfo,
  ɵɵProvidersFeature,
  ɵɵadvance,
  ɵɵclassMap,
  ɵɵdefineComponent,
  ɵɵelement,
  ɵɵelementEnd,
  ɵɵelementStart,
  ɵɵgetCurrentView,
  ɵɵlistener,
  ɵɵnamespaceSVG,
  ɵɵnextContext,
  ɵɵproperty,
  ɵɵresetView,
  ɵɵrestoreView,
  ɵɵtemplate,
  ɵɵtext,
  ɵɵtextInterpolate,
  ɵɵtextInterpolate1
} from "./chunk-PFYGRVXA.js";

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
  }, dependencies: [CommonModule, NgIf], styles: ['@charset "UTF-8";\n\n\n\n.form-checkbox[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  gap: 0.5rem;\n}\n.form-checkbox__label[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 1rem;\n  cursor: pointer;\n  -webkit-user-select: none;\n  user-select: none;\n}\n.form-checkbox__input[_ngcontent-%COMP%] {\n  position: absolute;\n  opacity: 0;\n  width: 0;\n  height: 0;\n}\n.form-checkbox__input[_ngcontent-%COMP%]:focus    + .form-checkbox__box[_ngcontent-%COMP%] {\n  outline: 2px solid #ED9C05;\n  outline-offset: 2px;\n}\n.form-checkbox__box[_ngcontent-%COMP%] {\n  width: 2.5rem;\n  height: 2.5rem;\n  min-width: 2.5rem;\n  min-height: 2.5rem;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  border: 2px solid var(--border-color);\n  border-radius: 3px;\n  background-color: var(--bg-secondary);\n  box-shadow: 2px 2px 0px var(--border-color);\n  transition: all 150ms ease-in-out;\n}\n.form-checkbox__check[_ngcontent-%COMP%] {\n  width: 2.5rem;\n  height: 2.5rem;\n  color: var(--text-primary);\n}\n.form-checkbox__text[_ngcontent-%COMP%] {\n  font-size: 0.9375rem;\n  color: var(--text-primary);\n  font-weight: 500;\n}\n.form-checkbox__error[_ngcontent-%COMP%] {\n  font-size: 0.875rem;\n  color: #E04A4A;\n  font-weight: 600;\n  margin: 0;\n  padding-left: calc(20px + 1rem);\n}\n.form-checkbox[_ngcontent-%COMP%]:not(.form-checkbox--disabled)   .form-checkbox__label[_ngcontent-%COMP%]:hover   .form-checkbox__box[_ngcontent-%COMP%] {\n  transform: translate(-1px, -1px);\n  box-shadow: 3px 3px 0px var(--border-color);\n}\n.form-checkbox--checked[_ngcontent-%COMP%]   .form-checkbox__box[_ngcontent-%COMP%] {\n  background-color: var(--color-primary);\n  border-color: var(--border-color);\n}\n.form-checkbox--disabled[_ngcontent-%COMP%] {\n  opacity: 0.5;\n  cursor: not-allowed;\n}\n.form-checkbox--disabled[_ngcontent-%COMP%]   .form-checkbox__label[_ngcontent-%COMP%] {\n  cursor: not-allowed;\n}\n.form-checkbox--error[_ngcontent-%COMP%]   .form-checkbox__box[_ngcontent-%COMP%] {\n  border-color: #E04A4A;\n  box-shadow: 2px 2px 0px #E04A4A;\n}\n.form-checkbox--error[_ngcontent-%COMP%]   .form-checkbox__box[_ngcontent-%COMP%]:hover {\n  box-shadow: 3px 3px 0px #E04A4A;\n}\n/*# sourceMappingURL=form-checkbox.css.map */'] });
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
    ], template: '<div [class]="wrapperClasses">\r\n  <label class="form-checkbox__label">\r\n    <input\r\n      type="checkbox"\r\n      [id]="id"\r\n      [checked]="checked"\r\n      [disabled]="disabled"\r\n      (change)="onCheckboxChange($event)"\r\n      class="form-checkbox__input"\r\n    />\r\n    <span class="form-checkbox__box">\r\n      <svg *ngIf="checked" class="form-checkbox__check" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">\r\n        <path d="M5 12L10 17L19 7" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/>\r\n      </svg>\r\n    </span>\r\n    <span class="form-checkbox__text">{{ label }}</span>\r\n  </label>\r\n\r\n  <p *ngIf="error" class="form-checkbox__error">{{ error }}</p>\r\n</div>\r\n', styles: ['@charset "UTF-8";\n\n/* src/app/components/shared/form-checkbox/form-checkbox.scss */\n.form-checkbox {\n  display: flex;\n  flex-direction: column;\n  gap: 0.5rem;\n}\n.form-checkbox__label {\n  display: flex;\n  align-items: center;\n  gap: 1rem;\n  cursor: pointer;\n  -webkit-user-select: none;\n  user-select: none;\n}\n.form-checkbox__input {\n  position: absolute;\n  opacity: 0;\n  width: 0;\n  height: 0;\n}\n.form-checkbox__input:focus + .form-checkbox__box {\n  outline: 2px solid #ED9C05;\n  outline-offset: 2px;\n}\n.form-checkbox__box {\n  width: 2.5rem;\n  height: 2.5rem;\n  min-width: 2.5rem;\n  min-height: 2.5rem;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  border: 2px solid var(--border-color);\n  border-radius: 3px;\n  background-color: var(--bg-secondary);\n  box-shadow: 2px 2px 0px var(--border-color);\n  transition: all 150ms ease-in-out;\n}\n.form-checkbox__check {\n  width: 2.5rem;\n  height: 2.5rem;\n  color: var(--text-primary);\n}\n.form-checkbox__text {\n  font-size: 0.9375rem;\n  color: var(--text-primary);\n  font-weight: 500;\n}\n.form-checkbox__error {\n  font-size: 0.875rem;\n  color: #E04A4A;\n  font-weight: 600;\n  margin: 0;\n  padding-left: calc(20px + 1rem);\n}\n.form-checkbox:not(.form-checkbox--disabled) .form-checkbox__label:hover .form-checkbox__box {\n  transform: translate(-1px, -1px);\n  box-shadow: 3px 3px 0px var(--border-color);\n}\n.form-checkbox--checked .form-checkbox__box {\n  background-color: var(--color-primary);\n  border-color: var(--border-color);\n}\n.form-checkbox--disabled {\n  opacity: 0.5;\n  cursor: not-allowed;\n}\n.form-checkbox--disabled .form-checkbox__label {\n  cursor: not-allowed;\n}\n.form-checkbox--error .form-checkbox__box {\n  border-color: #E04A4A;\n  box-shadow: 2px 2px 0px #E04A4A;\n}\n.form-checkbox--error .form-checkbox__box:hover {\n  box-shadow: 3px 3px 0px #E04A4A;\n}\n/*# sourceMappingURL=form-checkbox.css.map */\n'] }]
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
  }, dependencies: [CommonModule, NgForOf, NgIf], styles: ['@charset "UTF-8";\n\n\n\n.form-radio-group[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  gap: 1rem;\n}\n.form-radio-group__label[_ngcontent-%COMP%] {\n  font-size: 0.9375rem;\n  font-weight: 700;\n  color: var(--text-primary);\n  margin: 0;\n}\n.form-radio-group__options[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  gap: 1rem;\n}\n.form-radio-group__option[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 1rem;\n  cursor: pointer;\n  -webkit-user-select: none;\n  user-select: none;\n}\n.form-radio-group__input[_ngcontent-%COMP%] {\n  position: absolute;\n  opacity: 0;\n  width: 0;\n  height: 0;\n}\n.form-radio-group__input[_ngcontent-%COMP%]:focus    + .form-radio-group__radio[_ngcontent-%COMP%] {\n  outline: 2px solid #ED9C05;\n  outline-offset: 2px;\n}\n.form-radio-group__radio[_ngcontent-%COMP%] {\n  width: 2.5rem;\n  height: 2.5rem;\n  min-width: 2.5rem;\n  min-height: 2.5rem;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  border: 2px solid var(--border-color);\n  border-radius: 50%;\n  background-color: var(--bg-secondary);\n  box-shadow: 2px 2px 0px var(--border-color);\n  transition: all 150ms ease-in-out;\n}\n.form-radio-group__dot[_ngcontent-%COMP%] {\n  width: 10px;\n  height: 10px;\n  border-radius: 50%;\n  background-color: var(--text-primary);\n  transition: all 150ms ease-in-out;\n}\n.form-radio-group__text[_ngcontent-%COMP%] {\n  font-size: 0.9375rem;\n  color: var(--text-primary);\n  font-weight: 500;\n}\n.form-radio-group__error[_ngcontent-%COMP%] {\n  font-size: 0.875rem;\n  color: #E04A4A;\n  font-weight: 600;\n  margin: 0;\n}\n.form-radio-group[_ngcontent-%COMP%]:not(.form-radio-group--disabled)   .form-radio-group__option[_ngcontent-%COMP%]:hover   .form-radio-group__radio[_ngcontent-%COMP%] {\n  transform: translate(-1px, -1px);\n  box-shadow: 3px 3px 0px var(--border-color);\n}\n.form-radio-group__input[_ngcontent-%COMP%]:checked    + .form-radio-group__radio[_ngcontent-%COMP%] {\n  background-color: var(--color-primary);\n  border-color: var(--border-color);\n}\n.form-radio-group--disabled[_ngcontent-%COMP%] {\n  opacity: 0.5;\n  cursor: not-allowed;\n}\n.form-radio-group--disabled[_ngcontent-%COMP%]   .form-radio-group__option[_ngcontent-%COMP%] {\n  cursor: not-allowed;\n}\n.form-radio-group--inline[_ngcontent-%COMP%]   .form-radio-group__options[_ngcontent-%COMP%] {\n  flex-direction: row;\n  flex-wrap: wrap;\n}\n.form-radio-group--error[_ngcontent-%COMP%]   .form-radio-group__radio[_ngcontent-%COMP%] {\n  border-color: #E04A4A;\n  box-shadow: 2px 2px 0px #E04A4A;\n}\n.form-radio-group--error[_ngcontent-%COMP%]   .form-radio-group__radio[_ngcontent-%COMP%]:hover {\n  box-shadow: 3px 3px 0px #E04A4A;\n}\n/*# sourceMappingURL=form-radio-group.css.map */'] });
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
    ], template: '<div [class]="wrapperClasses">\r\n  <p *ngIf="label" class="form-radio-group__label">{{ label }}</p>\r\n\r\n  <div class="form-radio-group__options">\r\n    <label\r\n      *ngFor="let option of options; let i = index"\r\n      class="form-radio-group__option"\r\n    >\r\n      <input\r\n        type="radio"\r\n        [name]="name"\r\n        [value]="option.value"\r\n        [checked]="isChecked(option.value)"\r\n        [disabled]="disabled"\r\n        (change)="onRadioChange($event)"\r\n        class="form-radio-group__input"\r\n      />\r\n      <span class="form-radio-group__radio">\r\n        <span *ngIf="isChecked(option.value)" class="form-radio-group__dot"></span>\r\n      </span>\r\n      <span class="form-radio-group__text">{{ option.label }}</span>\r\n    </label>\r\n  </div>\r\n\r\n  <p *ngIf="error" class="form-radio-group__error">{{ error }}</p>\r\n</div>\r\n', styles: ['@charset "UTF-8";\n\n/* src/app/components/shared/form-radio-group/form-radio-group.scss */\n.form-radio-group {\n  display: flex;\n  flex-direction: column;\n  gap: 1rem;\n}\n.form-radio-group__label {\n  font-size: 0.9375rem;\n  font-weight: 700;\n  color: var(--text-primary);\n  margin: 0;\n}\n.form-radio-group__options {\n  display: flex;\n  flex-direction: column;\n  gap: 1rem;\n}\n.form-radio-group__option {\n  display: flex;\n  align-items: center;\n  gap: 1rem;\n  cursor: pointer;\n  -webkit-user-select: none;\n  user-select: none;\n}\n.form-radio-group__input {\n  position: absolute;\n  opacity: 0;\n  width: 0;\n  height: 0;\n}\n.form-radio-group__input:focus + .form-radio-group__radio {\n  outline: 2px solid #ED9C05;\n  outline-offset: 2px;\n}\n.form-radio-group__radio {\n  width: 2.5rem;\n  height: 2.5rem;\n  min-width: 2.5rem;\n  min-height: 2.5rem;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  border: 2px solid var(--border-color);\n  border-radius: 50%;\n  background-color: var(--bg-secondary);\n  box-shadow: 2px 2px 0px var(--border-color);\n  transition: all 150ms ease-in-out;\n}\n.form-radio-group__dot {\n  width: 10px;\n  height: 10px;\n  border-radius: 50%;\n  background-color: var(--text-primary);\n  transition: all 150ms ease-in-out;\n}\n.form-radio-group__text {\n  font-size: 0.9375rem;\n  color: var(--text-primary);\n  font-weight: 500;\n}\n.form-radio-group__error {\n  font-size: 0.875rem;\n  color: #E04A4A;\n  font-weight: 600;\n  margin: 0;\n}\n.form-radio-group:not(.form-radio-group--disabled) .form-radio-group__option:hover .form-radio-group__radio {\n  transform: translate(-1px, -1px);\n  box-shadow: 3px 3px 0px var(--border-color);\n}\n.form-radio-group__input:checked + .form-radio-group__radio {\n  background-color: var(--color-primary);\n  border-color: var(--border-color);\n}\n.form-radio-group--disabled {\n  opacity: 0.5;\n  cursor: not-allowed;\n}\n.form-radio-group--disabled .form-radio-group__option {\n  cursor: not-allowed;\n}\n.form-radio-group--inline .form-radio-group__options {\n  flex-direction: row;\n  flex-wrap: wrap;\n}\n.form-radio-group--error .form-radio-group__radio {\n  border-color: #E04A4A;\n  box-shadow: 2px 2px 0px #E04A4A;\n}\n.form-radio-group--error .form-radio-group__radio:hover {\n  box-shadow: 3px 3px 0px #E04A4A;\n}\n/*# sourceMappingURL=form-radio-group.css.map */\n'] }]
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

export {
  FormCheckbox,
  FormRadioGroup,
  FormSelect
};
//# sourceMappingURL=chunk-BQDVMKT3.js.map
