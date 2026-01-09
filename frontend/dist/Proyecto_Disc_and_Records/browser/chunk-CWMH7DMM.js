import {
  DefaultValueAccessor,
  FormControlDirective,
  NgControlStatus,
  ReactiveFormsModule
} from "./chunk-AVQDXX3C.js";
import {
  CommonModule,
  Component,
  Input,
  setClassMetadata,
  ɵsetClassDebugInfo,
  ɵɵadvance,
  ɵɵattribute,
  ɵɵclassProp,
  ɵɵconditional,
  ɵɵconditionalCreate,
  ɵɵdefineComponent,
  ɵɵelement,
  ɵɵelementEnd,
  ɵɵelementStart,
  ɵɵnextContext,
  ɵɵproperty,
  ɵɵtext,
  ɵɵtextInterpolate1
} from "./chunk-PFYGRVXA.js";

// src/app/components/shared/form-input/form-input.ts
function FormInput_Conditional_3_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span", 2);
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
  // FormControl reactivo (requerido)
  control;
  // Propiedades del input
  label = "";
  type = "text";
  id = "";
  placeholder = "";
  required = false;
  disabled = false;
  autocomplete = "";
  // Mensajes de ayuda
  helpText = "";
  // ID único para asociar label e input
  inputId = "";
  ngOnInit() {
    this.inputId = this.id || `form-input-${nextUniqueId++}`;
  }
  // Computed para verificar si el control tiene errores y ha sido tocado
  get hasError() {
    return !!(this.control && this.control.invalid && this.control.touched);
  }
  // Computed para verificar si el control es válido
  get hasSuccess() {
    return !!(this.control && this.control.valid && this.control.touched);
  }
  // Obtener el primer mensaje de error del control
  get errorMessage() {
    if (!this.control || !this.control.errors || !this.control.touched) {
      return "";
    }
    const errors = this.control.errors;
    if (errors["required"]) {
      return `${this.label} es requerido`;
    }
    if (errors["email"]) {
      return "Email debe ser v\xE1lido (ej: usuario@dominio.com)";
    }
    if (errors["minlength"]) {
      return `M\xEDnimo ${errors["minlength"].requiredLength} caracteres`;
    }
    if (errors["maxlength"]) {
      return `M\xE1ximo ${errors["maxlength"].requiredLength} caracteres`;
    }
    if (errors["pattern"]) {
      return "Formato inv\xE1lido";
    }
    if (errors["passwordStrength"]) {
      return errors["passwordStrength"];
    }
    if (errors["emailTaken"]) {
      return "Este email ya est\xE1 registrado";
    }
    if (errors["usernameTaken"]) {
      return "Este nombre de usuario ya est\xE1 en uso";
    }
    return "Campo inv\xE1lido";
  }
  static \u0275fac = function FormInput_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _FormInput)();
  };
  static \u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _FormInput, selectors: [["app-form-input"]], inputs: { control: "control", label: "label", type: "type", id: "id", placeholder: "placeholder", required: "required", disabled: "disabled", autocomplete: "autocomplete", helpText: "helpText" }, decls: 7, vars: 16, consts: [[1, "form-input"], [1, "form-input__label", 3, "for"], ["aria-label", "Campo requerido", 1, "form-input__required"], [1, "form-input__input", 3, "id", "type", "formControl", "placeholder"], ["role", "alert", 1, "form-input__error", 3, "id"], [1, "form-input__help", 3, "id"]], template: function FormInput_Template(rf, ctx) {
    if (rf & 1) {
      \u0275\u0275elementStart(0, "div", 0)(1, "label", 1);
      \u0275\u0275text(2);
      \u0275\u0275conditionalCreate(3, FormInput_Conditional_3_Template, 2, 0, "span", 2);
      \u0275\u0275elementEnd();
      \u0275\u0275element(4, "input", 3);
      \u0275\u0275conditionalCreate(5, FormInput_Conditional_5_Template, 2, 2, "p", 4);
      \u0275\u0275conditionalCreate(6, FormInput_Conditional_6_Template, 2, 2, "p", 5);
      \u0275\u0275elementEnd();
    }
    if (rf & 2) {
      \u0275\u0275advance();
      \u0275\u0275property("for", ctx.inputId);
      \u0275\u0275advance();
      \u0275\u0275textInterpolate1(" ", ctx.label, " ");
      \u0275\u0275advance();
      \u0275\u0275conditional(ctx.required ? 3 : -1);
      \u0275\u0275advance();
      \u0275\u0275classProp("form-input__input--error", ctx.hasError)("form-input__input--success", ctx.hasSuccess);
      \u0275\u0275property("id", ctx.inputId)("type", ctx.type)("formControl", ctx.control)("placeholder", ctx.placeholder);
      \u0275\u0275attribute("autocomplete", ctx.autocomplete || null)("aria-invalid", ctx.hasError)("aria-describedby", ctx.hasError || ctx.helpText ? ctx.inputId + "-description" : null);
      \u0275\u0275advance();
      \u0275\u0275conditional(ctx.hasError && ctx.errorMessage ? 5 : -1);
      \u0275\u0275advance();
      \u0275\u0275conditional(!ctx.hasError && ctx.helpText ? 6 : -1);
    }
  }, dependencies: [CommonModule, ReactiveFormsModule, DefaultValueAccessor, NgControlStatus, FormControlDirective], styles: ['@charset "UTF-8";\n\n\n\n.form-input[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  gap: 0.5rem;\n  width: 100%;\n}\n.form-input__label[_ngcontent-%COMP%] {\n  font-size: 0.875rem;\n  font-weight: 500;\n  color: var(--text-primary);\n  display: flex;\n  align-items: center;\n  gap: 0.25rem;\n  margin-bottom: 0.5rem;\n}\n.form-input__required[_ngcontent-%COMP%] {\n  color: #E04A4A;\n  font-weight: 600;\n  font-size: 1.125rem;\n  line-height: 1;\n  margin-left: 2px;\n}\n.form-input__input[_ngcontent-%COMP%] {\n  font-family: "Space Grotesk", sans-serif;\n  font-size: 1rem;\n  padding: 0.5rem 1rem;\n  border: 3px solid var(--border-color);\n  border-radius: 5px;\n  background-color: var(--bg-primary);\n  color: var(--text-primary);\n  box-shadow: 4px 4px 0px #01131B;\n  transition: all 150ms ease-in-out;\n  width: 100%;\n  outline: none;\n}\n.form-input__input[_ngcontent-%COMP%]::placeholder {\n  color: var(--text-placeholder);\n  opacity: 1;\n}\n.form-input__input[_ngcontent-%COMP%]:focus {\n  border-color: var(--color-primary);\n  box-shadow: 4px 4px 0px #ED9C05;\n}\n.form-input__input[_ngcontent-%COMP%]:hover:not(:disabled):not(.form-input__input--error):not(.form-input__input--success) {\n  box-shadow: 2px 2px 0px #01131B;\n  transform: translate(2px, 2px);\n}\n.form-input__input--error[_ngcontent-%COMP%] {\n  border-color: #E04A4A;\n  box-shadow: 4px 4px 0px #E04A4A;\n}\n.form-input__input--error[_ngcontent-%COMP%]:hover:not(:disabled) {\n  box-shadow: 2px 2px 0px #E04A4A;\n  transform: translate(2px, 2px);\n}\n.form-input__input--error[_ngcontent-%COMP%]:focus {\n  box-shadow: 4px 4px 0px #E04A4A;\n  transform: none;\n}\n.form-input__input--success[_ngcontent-%COMP%] {\n  border-color: #AAD661;\n  box-shadow: 4px 4px 0px #AAD661;\n}\n.form-input__input--success[_ngcontent-%COMP%]:hover:not(:disabled) {\n  box-shadow: 2px 2px 0px #AAD661;\n  transform: translate(2px, 2px);\n}\n.form-input__input--success[_ngcontent-%COMP%]:focus {\n  box-shadow: 4px 4px 0px #AAD661;\n  transform: none;\n}\n.form-input__input[_ngcontent-%COMP%]:disabled {\n  opacity: 0.5;\n  cursor: not-allowed;\n  background-color: var(--bg-secondary);\n}\n.form-input__input[_ngcontent-%COMP%]:disabled:hover {\n  box-shadow: 4px 4px 0px var(--shadow-color);\n  transform: none;\n}\n.form-input__error[_ngcontent-%COMP%] {\n  font-size: 0.75rem;\n  color: #E04A4A;\n  font-weight: 500;\n  display: flex;\n  align-items: center;\n  gap: 0.25rem;\n}\n.form-input__error[_ngcontent-%COMP%]::before {\n  content: "\\26a0";\n  font-size: 1rem;\n}\n.form-input__help[_ngcontent-%COMP%] {\n  font-size: 0.75rem;\n  color: var(--text-secondary);\n  font-style: italic;\n}\n/*# sourceMappingURL=form-input.css.map */'] });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(FormInput, [{
    type: Component,
    args: [{ selector: "app-form-input", standalone: true, imports: [CommonModule, ReactiveFormsModule], template: `<div class="form-input">\r
  <!-- Label con asociaci\xF3n al input mediante 'for' -->\r
  <label\r
    [for]="inputId"\r
    class="form-input__label">\r
    {{ label }}\r
    @if (required) {\r
      <span class="form-input__required" aria-label="Campo requerido">*</span>\r
    }\r
  </label>\r
\r
  <!-- Input con FormControl reactivo -->\r
  <input\r
    [id]="inputId"\r
    [type]="type"\r
    [formControl]="control"\r
    [placeholder]="placeholder"\r
    [attr.autocomplete]="autocomplete || null"\r
    class="form-input__input"\r
    [class.form-input__input--error]="hasError"\r
    [class.form-input__input--success]="hasSuccess"\r
    [attr.aria-invalid]="hasError"\r
    [attr.aria-describedby]="hasError || helpText ? inputId + '-description' : null" />\r
\r
  <!-- Mensaje de error (solo si hay error) -->\r
  @if (hasError && errorMessage) {\r
    <p\r
      [id]="inputId + '-description'"\r
      class="form-input__error"\r
      role="alert">\r
      {{ errorMessage }}\r
    </p>\r
  }\r
\r
  <!-- Texto de ayuda (solo si no hay error) -->\r
  @if (!hasError && helpText) {\r
    <p\r
      [id]="inputId + '-description'"\r
      class="form-input__help">\r
      {{ helpText }}\r
    </p>\r
  }\r
</div>\r
`, styles: ['@charset "UTF-8";\n\n/* src/app/components/shared/form-input/form-input.scss */\n.form-input {\n  display: flex;\n  flex-direction: column;\n  gap: 0.5rem;\n  width: 100%;\n}\n.form-input__label {\n  font-size: 0.875rem;\n  font-weight: 500;\n  color: var(--text-primary);\n  display: flex;\n  align-items: center;\n  gap: 0.25rem;\n  margin-bottom: 0.5rem;\n}\n.form-input__required {\n  color: #E04A4A;\n  font-weight: 600;\n  font-size: 1.125rem;\n  line-height: 1;\n  margin-left: 2px;\n}\n.form-input__input {\n  font-family: "Space Grotesk", sans-serif;\n  font-size: 1rem;\n  padding: 0.5rem 1rem;\n  border: 3px solid var(--border-color);\n  border-radius: 5px;\n  background-color: var(--bg-primary);\n  color: var(--text-primary);\n  box-shadow: 4px 4px 0px #01131B;\n  transition: all 150ms ease-in-out;\n  width: 100%;\n  outline: none;\n}\n.form-input__input::placeholder {\n  color: var(--text-placeholder);\n  opacity: 1;\n}\n.form-input__input:focus {\n  border-color: var(--color-primary);\n  box-shadow: 4px 4px 0px #ED9C05;\n}\n.form-input__input:hover:not(:disabled):not(.form-input__input--error):not(.form-input__input--success) {\n  box-shadow: 2px 2px 0px #01131B;\n  transform: translate(2px, 2px);\n}\n.form-input__input--error {\n  border-color: #E04A4A;\n  box-shadow: 4px 4px 0px #E04A4A;\n}\n.form-input__input--error:hover:not(:disabled) {\n  box-shadow: 2px 2px 0px #E04A4A;\n  transform: translate(2px, 2px);\n}\n.form-input__input--error:focus {\n  box-shadow: 4px 4px 0px #E04A4A;\n  transform: none;\n}\n.form-input__input--success {\n  border-color: #AAD661;\n  box-shadow: 4px 4px 0px #AAD661;\n}\n.form-input__input--success:hover:not(:disabled) {\n  box-shadow: 2px 2px 0px #AAD661;\n  transform: translate(2px, 2px);\n}\n.form-input__input--success:focus {\n  box-shadow: 4px 4px 0px #AAD661;\n  transform: none;\n}\n.form-input__input:disabled {\n  opacity: 0.5;\n  cursor: not-allowed;\n  background-color: var(--bg-secondary);\n}\n.form-input__input:disabled:hover {\n  box-shadow: 4px 4px 0px var(--shadow-color);\n  transform: none;\n}\n.form-input__error {\n  font-size: 0.75rem;\n  color: #E04A4A;\n  font-weight: 500;\n  display: flex;\n  align-items: center;\n  gap: 0.25rem;\n}\n.form-input__error::before {\n  content: "\\26a0";\n  font-size: 1rem;\n}\n.form-input__help {\n  font-size: 0.75rem;\n  color: var(--text-secondary);\n  font-style: italic;\n}\n/*# sourceMappingURL=form-input.css.map */\n'] }]
  }], null, { control: [{
    type: Input
  }], label: [{
    type: Input
  }], type: [{
    type: Input
  }], id: [{
    type: Input
  }], placeholder: [{
    type: Input
  }], required: [{
    type: Input
  }], disabled: [{
    type: Input
  }], autocomplete: [{
    type: Input
  }], helpText: [{
    type: Input
  }] });
})();
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(FormInput, { className: "FormInput", filePath: "src/app/components/shared/form-input/form-input.ts", lineNumber: 32 });
})();

export {
  FormInput
};
//# sourceMappingURL=chunk-CWMH7DMM.js.map
