import {
  DefaultValueAccessor,
  FormBuilder,
  FormControlDirective,
  FormGroupDirective,
  NgControlStatus,
  NgControlStatusGroup,
  ReactiveFormsModule,
  Validators,
  ɵNgNoValidate
} from "./chunk-I3ETSPUB.js";
import {
  CommonModule,
  Component,
  HostListener,
  Input,
  NgIf,
  NgTemplateOutlet,
  Output,
  effect,
  input,
  output,
  setClassMetadata,
  signal,
  ɵsetClassDebugInfo,
  ɵɵadvance,
  ɵɵattribute,
  ɵɵclassProp,
  ɵɵconditional,
  ɵɵconditionalCreate,
  ɵɵdefineComponent,
  ɵɵdirectiveInject,
  ɵɵelement,
  ɵɵelementContainer,
  ɵɵelementEnd,
  ɵɵelementStart,
  ɵɵgetCurrentView,
  ɵɵlistener,
  ɵɵnamespaceSVG,
  ɵɵnextContext,
  ɵɵprojection,
  ɵɵprojectionDef,
  ɵɵproperty,
  ɵɵreference,
  ɵɵresetView,
  ɵɵresolveDocument,
  ɵɵrestoreView,
  ɵɵtemplate,
  ɵɵtemplateRefExtractor,
  ɵɵtext,
  ɵɵtextInterpolate,
  ɵɵtextInterpolate1
} from "./chunk-MWU7IQTJ.js";

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
  }, dependencies: [CommonModule, ReactiveFormsModule, DefaultValueAccessor, NgControlStatus, FormControlDirective], styles: ['@charset "UTF-8";\n\n\n\n.form-input[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  gap: 0.5rem;\n  width: 100%;\n}\n.form-input__label[_ngcontent-%COMP%] {\n  font-size: 0.875rem;\n  font-weight: 500;\n  color: var(--text-primary);\n  display: flex;\n  align-items: center;\n  gap: 0.25rem;\n  margin-bottom: 0.5rem;\n}\n.form-input__required[_ngcontent-%COMP%] {\n  color: #E04A4A;\n  font-weight: 600;\n  font-size: 1.125rem;\n  line-height: 1;\n  margin-left: 2px;\n}\n.form-input__input[_ngcontent-%COMP%] {\n  font-family: "Space Grotesk", sans-serif;\n  font-size: 1rem;\n  padding: 0.5rem 1rem;\n  border: 3px solid var(--border-color);\n  border-radius: 5px;\n  background-color: var(--bg-primary);\n  color: var(--text-primary);\n  box-shadow: 4px 4px 0px var(--shadow-color);\n  transition: all 150ms ease-in-out;\n  width: 100%;\n  outline: none;\n}\n.form-input__input[_ngcontent-%COMP%]::placeholder {\n  color: var(--text-placeholder);\n  opacity: 1;\n}\n.form-input__input[_ngcontent-%COMP%]:focus {\n  border-color: var(--color-primary);\n  box-shadow: 4px 4px 0px #ED9C05;\n}\n.form-input__input[_ngcontent-%COMP%]:hover:not(:disabled):not(.form-input__input--error):not(.form-input__input--success) {\n  box-shadow: 2px 2px 0px var(--shadow-color);\n  transform: translate(2px, 2px);\n}\n.form-input__input--error[_ngcontent-%COMP%] {\n  border-color: #E04A4A;\n  box-shadow: 4px 4px 0px #E04A4A;\n}\n.form-input__input--error[_ngcontent-%COMP%]:hover:not(:disabled) {\n  box-shadow: 2px 2px 0px #E04A4A;\n  transform: translate(2px, 2px);\n}\n.form-input__input--error[_ngcontent-%COMP%]:focus {\n  box-shadow: 4px 4px 0px #E04A4A;\n  transform: none;\n}\n.form-input__input--success[_ngcontent-%COMP%] {\n  border-color: #AAD661;\n  box-shadow: 4px 4px 0px #AAD661;\n}\n.form-input__input--success[_ngcontent-%COMP%]:hover:not(:disabled) {\n  box-shadow: 2px 2px 0px #AAD661;\n  transform: translate(2px, 2px);\n}\n.form-input__input--success[_ngcontent-%COMP%]:focus {\n  box-shadow: 4px 4px 0px #AAD661;\n  transform: none;\n}\n.form-input__input[_ngcontent-%COMP%]:disabled {\n  opacity: 0.5;\n  cursor: not-allowed;\n  background-color: var(--bg-secondary);\n}\n.form-input__input[_ngcontent-%COMP%]:disabled:hover {\n  box-shadow: 4px 4px 0px var(--shadow-color);\n  transform: none;\n}\n.form-input__error[_ngcontent-%COMP%] {\n  font-size: 0.75rem;\n  color: #E04A4A;\n  font-weight: 500;\n  display: flex;\n  align-items: center;\n  gap: 0.25rem;\n}\n.form-input__error[_ngcontent-%COMP%]::before {\n  content: "\\26a0";\n  font-size: 1rem;\n}\n.form-input__help[_ngcontent-%COMP%] {\n  font-size: 0.75rem;\n  color: var(--text-secondary);\n  font-style: italic;\n}\n/*# sourceMappingURL=form-input.css.map */'] });
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
`, styles: ['@charset "UTF-8";\n\n/* src/app/components/shared/form-input/form-input.scss */\n.form-input {\n  display: flex;\n  flex-direction: column;\n  gap: 0.5rem;\n  width: 100%;\n}\n.form-input__label {\n  font-size: 0.875rem;\n  font-weight: 500;\n  color: var(--text-primary);\n  display: flex;\n  align-items: center;\n  gap: 0.25rem;\n  margin-bottom: 0.5rem;\n}\n.form-input__required {\n  color: #E04A4A;\n  font-weight: 600;\n  font-size: 1.125rem;\n  line-height: 1;\n  margin-left: 2px;\n}\n.form-input__input {\n  font-family: "Space Grotesk", sans-serif;\n  font-size: 1rem;\n  padding: 0.5rem 1rem;\n  border: 3px solid var(--border-color);\n  border-radius: 5px;\n  background-color: var(--bg-primary);\n  color: var(--text-primary);\n  box-shadow: 4px 4px 0px var(--shadow-color);\n  transition: all 150ms ease-in-out;\n  width: 100%;\n  outline: none;\n}\n.form-input__input::placeholder {\n  color: var(--text-placeholder);\n  opacity: 1;\n}\n.form-input__input:focus {\n  border-color: var(--color-primary);\n  box-shadow: 4px 4px 0px #ED9C05;\n}\n.form-input__input:hover:not(:disabled):not(.form-input__input--error):not(.form-input__input--success) {\n  box-shadow: 2px 2px 0px var(--shadow-color);\n  transform: translate(2px, 2px);\n}\n.form-input__input--error {\n  border-color: #E04A4A;\n  box-shadow: 4px 4px 0px #E04A4A;\n}\n.form-input__input--error:hover:not(:disabled) {\n  box-shadow: 2px 2px 0px #E04A4A;\n  transform: translate(2px, 2px);\n}\n.form-input__input--error:focus {\n  box-shadow: 4px 4px 0px #E04A4A;\n  transform: none;\n}\n.form-input__input--success {\n  border-color: #AAD661;\n  box-shadow: 4px 4px 0px #AAD661;\n}\n.form-input__input--success:hover:not(:disabled) {\n  box-shadow: 2px 2px 0px #AAD661;\n  transform: translate(2px, 2px);\n}\n.form-input__input--success:focus {\n  box-shadow: 4px 4px 0px #AAD661;\n  transform: none;\n}\n.form-input__input:disabled {\n  opacity: 0.5;\n  cursor: not-allowed;\n  background-color: var(--bg-secondary);\n}\n.form-input__input:disabled:hover {\n  box-shadow: 4px 4px 0px var(--shadow-color);\n  transform: none;\n}\n.form-input__error {\n  font-size: 0.75rem;\n  color: #E04A4A;\n  font-weight: 500;\n  display: flex;\n  align-items: center;\n  gap: 0.25rem;\n}\n.form-input__error::before {\n  content: "\\26a0";\n  font-size: 1rem;\n}\n.form-input__help {\n  font-size: 0.75rem;\n  color: var(--text-secondary);\n  font-style: italic;\n}\n/*# sourceMappingURL=form-input.css.map */\n'] }]
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

// src/app/components/shared/login-form/login-form.ts
var LoginForm = class _LoginForm {
  formBuilder;
  /**
   * FormGroup - Contenedor de controles del formulario
   * Agrupa email y password en una sola entidad
   * Proporciona métodos para validar todo el formulario de una vez
   */
  loginForm;
  /**
   * Estado de envío
   * Signal que indica si el formulario está siendo procesado
   * Desactiva el botón de submit mientras se envía la solicitud
   */
  isSubmitting = signal(false, ...ngDevMode ? [{ debugName: "isSubmitting" }] : []);
  // ============================================
  // OUTPUTS PARA NAVEGACIÓN ENTRE MODALES
  // ============================================
  /**
   * Emite cuando el usuario hace click en "¿Olvidaste tu contraseña?"
   */
  onForgotPassword = output();
  /**
   * Emite cuando el usuario hace click en "¿No tienes cuenta? Crea una"
   */
  onRegister = output();
  /**
   * Constructor
   * Inyecta FormBuilder para crear el FormGroup de forma declarativa
   */
  constructor(formBuilder) {
    this.formBuilder = formBuilder;
    this.loginForm = this.formBuilder.group({
      email: [
        "",
        [
          Validators.required,
          Validators.email
        ]
      ],
      password: [
        "",
        [
          Validators.required,
          Validators.minLength(8)
        ]
      ]
    });
  }
  /**
   * Getters para acceder a los FormControls
   * Devuelven los controles tipados evitando null
   * Usados en el template: [formControl]="emailControl"
   */
  get emailControl() {
    return this.loginForm.get("email");
  }
  get passwordControl() {
    return this.loginForm.get("password");
  }
  /**
   * Manejo del submit
   *
   * ANTES (Template-driven):
   * - Validación manual en cada método onChange
   * - Estado disperso en múltiples signals
   * - Lógica repetida para validar
   *
   * DESPUÉS (Reactivo):
   * - Validación automática en FormGroup
   * - Un solo check: if (this.loginForm.valid)
   * - Acceso simplificado a errores: this.loginForm.get('email')?.errors
   */
  onSubmit() {
    this.loginForm.markAllAsTouched();
    if (this.loginForm.valid) {
      this.isSubmitting.set(true);
      const formData = this.loginForm.value;
      console.log("Login:", formData);
      setTimeout(() => {
        this.isSubmitting.set(false);
        alert("\xA1Inicio de sesi\xF3n exitoso!");
      }, 1e3);
    }
  }
  static \u0275fac = function LoginForm_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _LoginForm)(\u0275\u0275directiveInject(FormBuilder));
  };
  static \u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _LoginForm, selectors: [["app-login-form"]], outputs: { onForgotPassword: "onForgotPassword", onRegister: "onRegister" }, decls: 17, vars: 10, consts: [["method", "post", "novalidate", "", 1, "login-form", 3, "ngSubmit", "formGroup"], [1, "login-form__fieldset"], [1, "login-form__legend"], [1, "login-form__field"], ["label", "Correo electr\xF3nico", "type", "email", "id", "login-email", "placeholder", "tu@email.com", "helpText", "Introduce el correo con el que te registraste", 3, "control", "required", "autocomplete"], ["label", "Contrase\xF1a", "type", "password", "id", "login-password", "placeholder", "\u2022\u2022\u2022\u2022\u2022\u2022\u2022\u2022", "helpText", "M\xEDnimo 8 caracteres", 3, "control", "required", "autocomplete"], ["type", "submit", 1, "login-form__submit", 3, "disabled"], [1, "login-form__footer"], ["type", "button", 1, "login-form__link-btn", 3, "click"], [1, "login-form__footer-text"]], template: function LoginForm_Template(rf, ctx) {
    if (rf & 1) {
      \u0275\u0275elementStart(0, "form", 0);
      \u0275\u0275listener("ngSubmit", function LoginForm_Template_form_ngSubmit_0_listener() {
        return ctx.onSubmit();
      });
      \u0275\u0275elementStart(1, "fieldset", 1)(2, "legend", 2);
      \u0275\u0275text(3, "Inicia sesi\xF3n en tu cuenta");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(4, "div", 3);
      \u0275\u0275element(5, "app-form-input", 4);
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(6, "div", 3);
      \u0275\u0275element(7, "app-form-input", 5);
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(8, "button", 6);
      \u0275\u0275text(9);
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(10, "div", 7)(11, "button", 8);
      \u0275\u0275listener("click", function LoginForm_Template_button_click_11_listener() {
        return ctx.onForgotPassword.emit();
      });
      \u0275\u0275text(12, " \xBFOlvidaste tu contrase\xF1a? ");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(13, "p", 9);
      \u0275\u0275text(14, " \xBFNo tienes cuenta? ");
      \u0275\u0275elementStart(15, "button", 8);
      \u0275\u0275listener("click", function LoginForm_Template_button_click_15_listener() {
        return ctx.onRegister.emit();
      });
      \u0275\u0275text(16, " Crea una ");
      \u0275\u0275elementEnd()()()();
    }
    if (rf & 2) {
      \u0275\u0275property("formGroup", ctx.loginForm);
      \u0275\u0275advance(5);
      \u0275\u0275property("control", ctx.emailControl)("required", true)("autocomplete", "email");
      \u0275\u0275advance(2);
      \u0275\u0275property("control", ctx.passwordControl)("required", true)("autocomplete", "current-password");
      \u0275\u0275advance();
      \u0275\u0275property("disabled", ctx.loginForm.invalid || ctx.isSubmitting());
      \u0275\u0275attribute("aria-busy", ctx.isSubmitting());
      \u0275\u0275advance();
      \u0275\u0275textInterpolate1(" ", ctx.isSubmitting() ? "INICIANDO SESI\xD3N..." : "INICIAR SESI\xD3N", " ");
    }
  }, dependencies: [CommonModule, ReactiveFormsModule, \u0275NgNoValidate, NgControlStatusGroup, FormGroupDirective, FormInput], styles: ['@charset "UTF-8";\n\n\n\n.login-form[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  gap: 1rem;\n  width: 100%;\n}\n.login-form__fieldset[_ngcontent-%COMP%] {\n  border: 2px solid var(--border-color);\n  border-radius: 3px;\n  padding: 1rem;\n  margin: 0;\n  display: flex;\n  flex-direction: column;\n  gap: 1rem;\n  background-color: var(--bg-secondary);\n}\n.login-form__legend[_ngcontent-%COMP%] {\n  font-size: 1.125rem;\n  font-weight: 600;\n  color: var(--text-primary);\n  padding: 0 0.5rem;\n  text-transform: uppercase;\n  letter-spacing: 0.05em;\n}\n.login-form__field[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  gap: 0.5rem;\n  width: 100%;\n}\n.login-form__label[_ngcontent-%COMP%] {\n  font-size: 0.875rem;\n  font-weight: 500;\n  color: var(--text-primary);\n  display: flex;\n  align-items: center;\n  gap: 0.25rem;\n}\n.login-form__required[_ngcontent-%COMP%] {\n  color: #E04A4A;\n  font-weight: 600;\n  font-size: 1.125rem;\n  line-height: 1;\n}\n.login-form__input[_ngcontent-%COMP%] {\n  font-family: "Space Grotesk", sans-serif;\n  font-size: 1rem;\n  padding: 0.5rem 1rem;\n  border: 3px solid var(--border-color);\n  border-radius: 5px;\n  background-color: var(--bg-primary);\n  color: var(--text-primary);\n  box-shadow: 4px 4px 0px var(--shadow-color);\n  transition: all 150ms ease-in-out;\n  width: 100%;\n  outline: none;\n}\n.login-form__input[_ngcontent-%COMP%]::placeholder {\n  color: var(--text-placeholder);\n  opacity: 1;\n}\n.login-form__input[_ngcontent-%COMP%]:focus {\n  border-color: var(--color-primary);\n  box-shadow: 4px 4px 0px #ED9C05;\n}\n.login-form__input[_ngcontent-%COMP%]:hover:not(:disabled) {\n  box-shadow: 2px 2px 0px var(--shadow-color);\n  transform: translate(2px, 2px);\n}\n.login-form__input--error[_ngcontent-%COMP%] {\n  border-color: #E04A4A;\n  box-shadow: 4px 4px 0px #E04A4A;\n}\n.login-form__input--error[_ngcontent-%COMP%]:focus {\n  box-shadow: 4px 4px 0px #E04A4A;\n}\n.login-form__error[_ngcontent-%COMP%], \n.login-form__help[_ngcontent-%COMP%] {\n  font-size: 0.75rem;\n  min-height: 1.5em;\n  display: flex;\n  align-items: center;\n  gap: 0.25rem;\n  margin: 0;\n}\n.login-form__error[_ngcontent-%COMP%] {\n  color: #E04A4A;\n  font-weight: 500;\n}\n.login-form__error[_ngcontent-%COMP%]::before {\n  content: "\\26a0";\n  font-size: 1rem;\n}\n.login-form__help[_ngcontent-%COMP%] {\n  color: var(--text-secondary);\n  font-style: italic;\n}\n.login-form__submit[_ngcontent-%COMP%] {\n  font-family: "Space Grotesk", sans-serif;\n  font-size: 1rem;\n  font-weight: 600;\n  padding: 1rem 2rem;\n  border: 3px solid var(--border-color);\n  border-radius: 5px;\n  background-color: var(--color-primary);\n  color: var(--text-dark);\n  box-shadow: 4px 4px 0px var(--shadow-color);\n  transition: all 150ms ease-in-out;\n  cursor: pointer;\n  text-transform: uppercase;\n  letter-spacing: 0.05em;\n  width: 100%;\n  margin-top: 1rem;\n}\n.login-form__submit[_ngcontent-%COMP%]:hover:not(:disabled):not(.button--disabled) {\n  box-shadow: 2px 2px 0px var(--shadow-color);\n  transform: translate(2px, 2px);\n}\n.login-form__submit[_ngcontent-%COMP%]:active:not(:disabled):not(.button--disabled) {\n  box-shadow: 0px 0px 0px var(--shadow-color);\n  transform: translate(4px, 4px);\n}\n.login-form__submit[_ngcontent-%COMP%]:focus-visible {\n  outline: 3px solid var(--color-accent);\n  outline-offset: 2px;\n}\n.login-form__submit[_ngcontent-%COMP%]:disabled {\n  opacity: 0.6;\n  cursor: not-allowed;\n  pointer-events: none;\n  box-shadow: 4px 4px 0px var(--shadow-color);\n  transform: none;\n}\n.login-form__footer[_ngcontent-%COMP%] {\n  text-align: center;\n  margin-top: 0.5rem;\n  display: flex;\n  flex-direction: column;\n  gap: 0.5rem;\n}\n.login-form__footer-text[_ngcontent-%COMP%] {\n  font-size: 0.875rem;\n  color: var(--text-secondary);\n  margin: 0;\n}\n.login-form__link-btn[_ngcontent-%COMP%] {\n  background: none;\n  border: none;\n  padding: 0;\n  font-family: "Space Grotesk", sans-serif;\n  font-size: 0.875rem;\n  color: var(--color-primary);\n  text-decoration: none;\n  cursor: pointer;\n  transition: color 150ms ease-in-out;\n  font-weight: 600;\n}\n.login-form__link-btn[_ngcontent-%COMP%]:hover {\n  color: var(--color-secondary);\n  text-decoration: underline;\n}\n.login-form__link-btn[_ngcontent-%COMP%]:focus-visible {\n  outline: 2px solid var(--color-primary);\n  outline-offset: 2px;\n  border-radius: 2px;\n}\n/*# sourceMappingURL=login-form.css.map */'] });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(LoginForm, [{
    type: Component,
    args: [{ selector: "app-login-form", imports: [CommonModule, ReactiveFormsModule, FormInput], template: `<form [formGroup]="loginForm" (ngSubmit)="onSubmit()" class="login-form" method="post" novalidate>\r
  <!-- Fieldset para agrupar campos de autenticaci\xF3n -->\r
  <fieldset class="login-form__fieldset">\r
    <legend class="login-form__legend">Inicia sesi\xF3n en tu cuenta</legend>\r
\r
    <!-- Campo de correo electr\xF3nico - Componente At\xF3mico -->\r
    <div class="login-form__field">\r
      <app-form-input\r
        [control]="emailControl"\r
        label="Correo electr\xF3nico"\r
        type="email"\r
        id="login-email"\r
        placeholder="tu@email.com"\r
        helpText="Introduce el correo con el que te registraste"\r
        [required]="true"\r
        [autocomplete]="'email'">\r
      </app-form-input>\r
    </div>\r
\r
    <!-- Campo de contrase\xF1a - Componente At\xF3mico -->\r
    <div class="login-form__field">\r
      <app-form-input\r
        [control]="passwordControl"\r
        label="Contrase\xF1a"\r
        type="password"\r
        id="login-password"\r
        placeholder="\u2022\u2022\u2022\u2022\u2022\u2022\u2022\u2022"\r
        helpText="M\xEDnimo 8 caracteres"\r
        [required]="true"\r
        [autocomplete]="'current-password'">\r
      </app-form-input>\r
    </div>\r
  </fieldset>\r
\r
  <!-- Bot\xF3n de submit -->\r
  <button\r
    type="submit"\r
    class="login-form__submit"\r
    [disabled]="loginForm.invalid || isSubmitting()"\r
    [attr.aria-busy]="isSubmitting()">\r
    {{ isSubmitting() ? 'INICIANDO SESI\xD3N...' : 'INICIAR SESI\xD3N' }}\r
  </button>\r
\r
  <!-- Links de navegaci\xF3n -->\r
  <div class="login-form__footer">\r
    <button\r
      type="button"\r
      class="login-form__link-btn"\r
      (click)="onForgotPassword.emit()">\r
      \xBFOlvidaste tu contrase\xF1a?\r
    </button>\r
    <p class="login-form__footer-text">\r
      \xBFNo tienes cuenta?\r
      <button\r
        type="button"\r
        class="login-form__link-btn"\r
        (click)="onRegister.emit()">\r
        Crea una\r
      </button>\r
    </p>\r
  </div>\r
</form>\r
`, styles: ['@charset "UTF-8";\n\n/* src/app/components/shared/login-form/login-form.scss */\n.login-form {\n  display: flex;\n  flex-direction: column;\n  gap: 1rem;\n  width: 100%;\n}\n.login-form__fieldset {\n  border: 2px solid var(--border-color);\n  border-radius: 3px;\n  padding: 1rem;\n  margin: 0;\n  display: flex;\n  flex-direction: column;\n  gap: 1rem;\n  background-color: var(--bg-secondary);\n}\n.login-form__legend {\n  font-size: 1.125rem;\n  font-weight: 600;\n  color: var(--text-primary);\n  padding: 0 0.5rem;\n  text-transform: uppercase;\n  letter-spacing: 0.05em;\n}\n.login-form__field {\n  display: flex;\n  flex-direction: column;\n  gap: 0.5rem;\n  width: 100%;\n}\n.login-form__label {\n  font-size: 0.875rem;\n  font-weight: 500;\n  color: var(--text-primary);\n  display: flex;\n  align-items: center;\n  gap: 0.25rem;\n}\n.login-form__required {\n  color: #E04A4A;\n  font-weight: 600;\n  font-size: 1.125rem;\n  line-height: 1;\n}\n.login-form__input {\n  font-family: "Space Grotesk", sans-serif;\n  font-size: 1rem;\n  padding: 0.5rem 1rem;\n  border: 3px solid var(--border-color);\n  border-radius: 5px;\n  background-color: var(--bg-primary);\n  color: var(--text-primary);\n  box-shadow: 4px 4px 0px var(--shadow-color);\n  transition: all 150ms ease-in-out;\n  width: 100%;\n  outline: none;\n}\n.login-form__input::placeholder {\n  color: var(--text-placeholder);\n  opacity: 1;\n}\n.login-form__input:focus {\n  border-color: var(--color-primary);\n  box-shadow: 4px 4px 0px #ED9C05;\n}\n.login-form__input:hover:not(:disabled) {\n  box-shadow: 2px 2px 0px var(--shadow-color);\n  transform: translate(2px, 2px);\n}\n.login-form__input--error {\n  border-color: #E04A4A;\n  box-shadow: 4px 4px 0px #E04A4A;\n}\n.login-form__input--error:focus {\n  box-shadow: 4px 4px 0px #E04A4A;\n}\n.login-form__error,\n.login-form__help {\n  font-size: 0.75rem;\n  min-height: 1.5em;\n  display: flex;\n  align-items: center;\n  gap: 0.25rem;\n  margin: 0;\n}\n.login-form__error {\n  color: #E04A4A;\n  font-weight: 500;\n}\n.login-form__error::before {\n  content: "\\26a0";\n  font-size: 1rem;\n}\n.login-form__help {\n  color: var(--text-secondary);\n  font-style: italic;\n}\n.login-form__submit {\n  font-family: "Space Grotesk", sans-serif;\n  font-size: 1rem;\n  font-weight: 600;\n  padding: 1rem 2rem;\n  border: 3px solid var(--border-color);\n  border-radius: 5px;\n  background-color: var(--color-primary);\n  color: var(--text-dark);\n  box-shadow: 4px 4px 0px var(--shadow-color);\n  transition: all 150ms ease-in-out;\n  cursor: pointer;\n  text-transform: uppercase;\n  letter-spacing: 0.05em;\n  width: 100%;\n  margin-top: 1rem;\n}\n.login-form__submit:hover:not(:disabled):not(.button--disabled) {\n  box-shadow: 2px 2px 0px var(--shadow-color);\n  transform: translate(2px, 2px);\n}\n.login-form__submit:active:not(:disabled):not(.button--disabled) {\n  box-shadow: 0px 0px 0px var(--shadow-color);\n  transform: translate(4px, 4px);\n}\n.login-form__submit:focus-visible {\n  outline: 3px solid var(--color-accent);\n  outline-offset: 2px;\n}\n.login-form__submit:disabled {\n  opacity: 0.6;\n  cursor: not-allowed;\n  pointer-events: none;\n  box-shadow: 4px 4px 0px var(--shadow-color);\n  transform: none;\n}\n.login-form__footer {\n  text-align: center;\n  margin-top: 0.5rem;\n  display: flex;\n  flex-direction: column;\n  gap: 0.5rem;\n}\n.login-form__footer-text {\n  font-size: 0.875rem;\n  color: var(--text-secondary);\n  margin: 0;\n}\n.login-form__link-btn {\n  background: none;\n  border: none;\n  padding: 0;\n  font-family: "Space Grotesk", sans-serif;\n  font-size: 0.875rem;\n  color: var(--color-primary);\n  text-decoration: none;\n  cursor: pointer;\n  transition: color 150ms ease-in-out;\n  font-weight: 600;\n}\n.login-form__link-btn:hover {\n  color: var(--color-secondary);\n  text-decoration: underline;\n}\n.login-form__link-btn:focus-visible {\n  outline: 2px solid var(--color-primary);\n  outline-offset: 2px;\n  border-radius: 2px;\n}\n/*# sourceMappingURL=login-form.css.map */\n'] }]
  }], () => [{ type: FormBuilder }], { onForgotPassword: [{ type: Output, args: ["onForgotPassword"] }], onRegister: [{ type: Output, args: ["onRegister"] }] });
})();
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(LoginForm, { className: "LoginForm", filePath: "src/app/components/shared/login-form/login-form.ts", lineNumber: 43 });
})();

// src/app/components/shared/register-form/register-form.ts
function RegisterForm_Conditional_15_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "p", 8);
    \u0275\u0275text(1, " Las contrase\xF1as no coinciden ");
    \u0275\u0275elementEnd();
  }
}
var RegisterForm = class _RegisterForm {
  formBuilder;
  /**
   * FormGroup - Contenedor de controles del formulario de registro
   */
  registerForm;
  /**
   * Estado de envío
   */
  isSubmitting = signal(false, ...ngDevMode ? [{ debugName: "isSubmitting" }] : []);
  // ============================================
  // OUTPUTS PARA NAVEGACIÓN ENTRE MODALES
  // ============================================
  /**
   * Emite cuando el usuario hace click en "¿Ya tienes cuenta? Inicia sesión"
   */
  onLogin = output();
  /**
   * Constructor
   */
  constructor(formBuilder) {
    this.formBuilder = formBuilder;
    this.registerForm = this.buildForm();
  }
  /**
   * Construcción del formulario
   * Separado en método para mayor claridad
   *
   * REGLAS DE VALIDACIÓN:
   * - username: alfanuméricos + guiones bajos, 3-20 caracteres
   * - email: formato email válido
   * - password: 8+ caracteres, con mayúscula y carácter especial
   * - confirmPassword: debe coincidir con password
   */
  buildForm() {
    return this.formBuilder.group(
      {
        username: [
          "",
          [
            Validators.required,
            Validators.minLength(3),
            Validators.maxLength(20),
            Validators.pattern(/^[a-zA-Z0-9_]+$/)
          ]
        ],
        email: [
          "",
          [
            Validators.required,
            Validators.email
          ]
        ],
        password: [
          "",
          [
            Validators.required,
            Validators.minLength(8),
            /**
             * Patrón de contraseña fuerte
             * (?=.*[A-Z]) - Lookahead: contiene al menos una mayúscula
             * (?=.*[!@#$%^&*]) - Lookahead: contiene al menos un carácter especial
             */
            Validators.pattern(/^(?=.*[A-Z])(?=.*[!@#$%^&*])/)
          ]
        ],
        confirmPassword: [
          "",
          [Validators.required]
        ]
      },
      /**
       * VALIDADOR DE GRUPO
       * Se aplica a nivel de FormGroup (no a un campo individual)
       * Permite validar relaciones entre múltiples campos
       *
       * En este caso: validar que password y confirmPassword coincidan
       */
      { validators: this.passwordMatchValidator() }
    );
  }
  /**
   * Getters para acceder a los FormControls
   * Devuelven los controles tipados evitando null
   * Usados en el template: [formControl]="usernameControl"
   */
  get usernameControl() {
    return this.registerForm.get("username");
  }
  get emailControl() {
    return this.registerForm.get("email");
  }
  get passwordControl() {
    return this.registerForm.get("password");
  }
  get confirmPasswordControl() {
    return this.registerForm.get("confirmPassword");
  }
  /**
   * Validador Custom: Coincidencia de contraseñas
   *
   * PROPÓSITO:
   * Verificar que el campo password y confirmPassword tengan el mismo valor
   *
   * TIPO: Validador de grupo (FormGroup level)
   * Acceso: group.get('password') y group.get('confirmPassword')
   *
   * RETORNA:
   * - null: contraseñas coinciden (válido)
   * - { passwordMismatch: true }: no coinciden (inválido)
   *
   * NOTA: En el template, acceder con:
   * registerForm.hasError('passwordMismatch')
   */
  passwordMatchValidator() {
    return (group) => {
      const password = group.get("password")?.value;
      const confirmPassword = group.get("confirmPassword")?.value;
      if (!password || !confirmPassword) {
        return null;
      }
      return password === confirmPassword ? null : { passwordMismatch: true };
    };
  }
  /**
   * Manejo del submit
   *
   * FLUJO:
   * 1. Marcar todos los campos como tocados (para mostrar errores)
   * 2. Verificar si el formulario es válido (todos los campos + validadores de grupo)
   * 3. Si es válido: obtener valores y procesar
   * 4. Si es inválido: mostrar errores (ya están visibles por markAllAsTouched)
   */
  onSubmit() {
    this.registerForm.markAllAsTouched();
    if (this.registerForm.valid) {
      this.isSubmitting.set(true);
      const formData = this.registerForm.value;
      console.log("Registro:", formData);
      setTimeout(() => {
        this.isSubmitting.set(false);
        alert("\xA1Registro exitoso! Bienvenido a Discs & Records");
      }, 1500);
    }
  }
  static \u0275fac = function RegisterForm_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _RegisterForm)(\u0275\u0275directiveInject(FormBuilder));
  };
  static \u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _RegisterForm, selectors: [["app-register-form"]], outputs: { onLogin: "onLogin" }, decls: 23, vars: 17, consts: [["method", "post", "novalidate", "", 1, "register-form", 3, "ngSubmit", "formGroup"], [1, "register-form__fieldset"], [1, "register-form__legend"], [1, "register-form__field"], ["label", "Nombre de usuario", "type", "text", "id", "register-username", "placeholder", "tunombredeusuario", "helpText", "3-20 caracteres (letras, n\xFAmeros, guiones bajos)", 3, "control", "required", "autocomplete"], ["label", "Correo electr\xF3nico", "type", "email", "id", "register-email", "placeholder", "tu@email.com", "helpText", "Usaremos este correo para tu cuenta", 3, "control", "required", "autocomplete"], ["label", "Contrase\xF1a", "type", "password", "id", "register-password", "placeholder", "\u2022\u2022\u2022\u2022\u2022\u2022\u2022\u2022", "helpText", "8+ caracteres, may\xFAscula y especial (!@#$%...)", 3, "control", "required", "autocomplete"], ["label", "Confirmar contrase\xF1a", "type", "password", "id", "register-confirm-password", "placeholder", "\u2022\u2022\u2022\u2022\u2022\u2022\u2022\u2022", "helpText", "Vuelve a escribir tu contrase\xF1a", 3, "control", "required", "autocomplete"], ["role", "alert", 1, "register-form__error"], ["type", "submit", 1, "register-form__submit", 3, "disabled"], [1, "register-form__footer"], [1, "register-form__footer-text"], ["type", "button", 1, "register-form__link-btn", 3, "click"]], template: function RegisterForm_Template(rf, ctx) {
    if (rf & 1) {
      \u0275\u0275elementStart(0, "form", 0);
      \u0275\u0275listener("ngSubmit", function RegisterForm_Template_form_ngSubmit_0_listener() {
        return ctx.onSubmit();
      });
      \u0275\u0275elementStart(1, "fieldset", 1)(2, "legend", 2);
      \u0275\u0275text(3, "Crea tu cuenta");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(4, "div", 3);
      \u0275\u0275element(5, "app-form-input", 4);
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(6, "div", 3);
      \u0275\u0275element(7, "app-form-input", 5);
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(8, "fieldset", 1)(9, "legend", 2);
      \u0275\u0275text(10, "Seguridad");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(11, "div", 3);
      \u0275\u0275element(12, "app-form-input", 6);
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(13, "div", 3);
      \u0275\u0275element(14, "app-form-input", 7);
      \u0275\u0275conditionalCreate(15, RegisterForm_Conditional_15_Template, 2, 0, "p", 8);
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(16, "button", 9);
      \u0275\u0275text(17);
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(18, "div", 10)(19, "p", 11);
      \u0275\u0275text(20, " \xBFYa tienes cuenta? ");
      \u0275\u0275elementStart(21, "button", 12);
      \u0275\u0275listener("click", function RegisterForm_Template_button_click_21_listener() {
        return ctx.onLogin.emit();
      });
      \u0275\u0275text(22, " Inicia sesi\xF3n ");
      \u0275\u0275elementEnd()()()();
    }
    if (rf & 2) {
      \u0275\u0275property("formGroup", ctx.registerForm);
      \u0275\u0275advance(5);
      \u0275\u0275property("control", ctx.usernameControl)("required", true)("autocomplete", "username");
      \u0275\u0275advance(2);
      \u0275\u0275property("control", ctx.emailControl)("required", true)("autocomplete", "email");
      \u0275\u0275advance(5);
      \u0275\u0275property("control", ctx.passwordControl)("required", true)("autocomplete", "new-password");
      \u0275\u0275advance(2);
      \u0275\u0275property("control", ctx.confirmPasswordControl)("required", true)("autocomplete", "new-password");
      \u0275\u0275advance();
      \u0275\u0275conditional(ctx.registerForm.hasError("passwordMismatch") && ctx.confirmPasswordControl.touched ? 15 : -1);
      \u0275\u0275advance();
      \u0275\u0275property("disabled", ctx.registerForm.invalid || ctx.isSubmitting());
      \u0275\u0275attribute("aria-busy", ctx.isSubmitting());
      \u0275\u0275advance();
      \u0275\u0275textInterpolate1(" ", ctx.isSubmitting() ? "CREANDO CUENTA..." : "CREAR CUENTA", " ");
    }
  }, dependencies: [CommonModule, ReactiveFormsModule, \u0275NgNoValidate, NgControlStatusGroup, FormGroupDirective, FormInput], styles: ['@charset "UTF-8";\n\n\n\n.register-form[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  gap: 1rem;\n  width: 100%;\n}\n.register-form__fieldset[_ngcontent-%COMP%] {\n  border: 2px solid var(--border-color);\n  border-radius: 3px;\n  padding: 1rem;\n  margin: 0;\n  display: flex;\n  flex-direction: column;\n  gap: 1rem;\n  background-color: var(--bg-secondary);\n}\n.register-form__legend[_ngcontent-%COMP%] {\n  font-size: 1.125rem;\n  font-weight: 600;\n  color: var(--text-primary);\n  padding: 0 0.5rem;\n  text-transform: uppercase;\n  letter-spacing: 0.05em;\n}\n.register-form__field[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  gap: 0.5rem;\n  width: 100%;\n}\n.register-form__label[_ngcontent-%COMP%] {\n  font-size: 0.875rem;\n  font-weight: 500;\n  color: var(--text-primary);\n  display: flex;\n  align-items: center;\n  gap: 0.25rem;\n}\n.register-form__required[_ngcontent-%COMP%] {\n  color: #E04A4A;\n  font-weight: 600;\n  font-size: 1.125rem;\n  line-height: 1;\n}\n.register-form__input[_ngcontent-%COMP%] {\n  width: 100%;\n  padding: 0.5rem 1rem;\n  font-family: "Space Grotesk", sans-serif;\n  font-size: 1rem;\n  color: var(--text-primary);\n  background-color: var(--bg-primary);\n  border: 3px solid var(--border-color);\n  border-radius: 5px;\n  box-shadow: 4px 4px 0px var(--shadow-color);\n  transition: all 150ms ease-in-out;\n  outline: none;\n}\n.register-form__input[_ngcontent-%COMP%]::placeholder {\n  color: var(--text-secondary);\n}\n.register-form__input[_ngcontent-%COMP%]:focus {\n  border-color: var(--color-primary);\n  box-shadow: 4px 4px 0px #ED9C05;\n}\n.register-form__input[_ngcontent-%COMP%]:hover:not(:disabled) {\n  transform: translate(-1px, -1px);\n  box-shadow: 3px 3px 0px var(--border-color);\n}\n.register-form__input[_ngcontent-%COMP%]:disabled {\n  opacity: 0.5;\n  cursor: not-allowed;\n  background-color: var(--bg-secondary);\n}\n.register-form__input[_ngcontent-%COMP%]:disabled:hover {\n  box-shadow: 4px 4px 0px var(--shadow-color);\n  transform: none;\n}\n.register-form__input--error[_ngcontent-%COMP%] {\n  border-color: #E04A4A;\n  box-shadow: 4px 4px 0px #E04A4A;\n}\n.register-form__input--error[_ngcontent-%COMP%]:focus {\n  box-shadow: 4px 4px 0px #E04A4A;\n}\n.register-form__error[_ngcontent-%COMP%] {\n  font-size: 0.75rem;\n  color: #E04A4A;\n  font-weight: 500;\n  display: flex;\n  align-items: center;\n  gap: 0.25rem;\n  min-height: 1.5em;\n  margin: 0;\n}\n.register-form__error[_ngcontent-%COMP%]::before {\n  content: "\\26a0";\n  font-size: 1rem;\n}\n.register-form__help[_ngcontent-%COMP%] {\n  font-size: 0.75rem;\n  color: var(--text-secondary);\n  font-style: italic;\n  min-height: 1.5em;\n  margin: 0;\n  display: flex;\n  align-items: center;\n}\n.register-form__submit[_ngcontent-%COMP%] {\n  font-family: "Space Grotesk", sans-serif;\n  font-size: 1rem;\n  font-weight: 600;\n  padding: 1rem 2rem;\n  border: 3px solid var(--border-color);\n  border-radius: 5px;\n  background-color: var(--color-primary);\n  color: var(--text-dark);\n  box-shadow: 4px 4px 0px var(--shadow-color);\n  transition: all 150ms ease-in-out;\n  cursor: pointer;\n  text-transform: uppercase;\n  letter-spacing: 0.05em;\n  width: 100%;\n  margin-top: 1rem;\n}\n.register-form__submit[_ngcontent-%COMP%]:hover:not(:disabled):not(.button--disabled) {\n  box-shadow: 2px 2px 0px var(--shadow-color);\n  transform: translate(2px, 2px);\n}\n.register-form__submit[_ngcontent-%COMP%]:active:not(:disabled):not(.button--disabled) {\n  box-shadow: 0px 0px 0px var(--shadow-color);\n  transform: translate(4px, 4px);\n}\n.register-form__submit[_ngcontent-%COMP%]:focus-visible {\n  outline: 3px solid var(--color-accent);\n  outline-offset: 2px;\n}\n.register-form__submit[_ngcontent-%COMP%]:disabled {\n  opacity: 0.6;\n  cursor: not-allowed;\n  pointer-events: none;\n  box-shadow: 4px 4px 0px var(--shadow-color);\n  transform: none;\n}\n.register-form__footer[_ngcontent-%COMP%] {\n  text-align: center;\n  margin-top: 0.5rem;\n}\n.register-form__footer-text[_ngcontent-%COMP%] {\n  font-size: 0.875rem;\n  color: var(--text-secondary);\n  margin: 0;\n}\n.register-form__link-btn[_ngcontent-%COMP%] {\n  background: none;\n  border: none;\n  padding: 0;\n  font-family: "Space Grotesk", sans-serif;\n  font-size: 0.875rem;\n  color: var(--color-primary);\n  text-decoration: none;\n  cursor: pointer;\n  transition: color 150ms ease-in-out;\n  font-weight: 600;\n}\n.register-form__link-btn[_ngcontent-%COMP%]:hover {\n  color: var(--color-secondary);\n  text-decoration: underline;\n}\n.register-form__link-btn[_ngcontent-%COMP%]:focus-visible {\n  outline: 2px solid var(--color-primary);\n  outline-offset: 2px;\n  border-radius: 2px;\n}\n/*# sourceMappingURL=register-form.css.map */'] });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(RegisterForm, [{
    type: Component,
    args: [{ selector: "app-register-form", imports: [CommonModule, ReactiveFormsModule, FormInput], template: `<form [formGroup]="registerForm" (ngSubmit)="onSubmit()" class="register-form" method="post" novalidate>\r
  <!-- Fieldset 1: Informaci\xF3n de cuenta -->\r
  <fieldset class="register-form__fieldset">\r
    <legend class="register-form__legend">Crea tu cuenta</legend>\r
\r
    <!-- Campo de nombre de usuario - Componente At\xF3mico -->\r
    <div class="register-form__field">\r
      <app-form-input\r
        [control]="usernameControl"\r
        label="Nombre de usuario"\r
        type="text"\r
        id="register-username"\r
        placeholder="tunombredeusuario"\r
        helpText="3-20 caracteres (letras, n\xFAmeros, guiones bajos)"\r
        [required]="true"\r
        [autocomplete]="'username'">\r
      </app-form-input>\r
    </div>\r
\r
    <!-- Campo de correo electr\xF3nico - Componente At\xF3mico -->\r
    <div class="register-form__field">\r
      <app-form-input\r
        [control]="emailControl"\r
        label="Correo electr\xF3nico"\r
        type="email"\r
        id="register-email"\r
        placeholder="tu@email.com"\r
        helpText="Usaremos este correo para tu cuenta"\r
        [required]="true"\r
        [autocomplete]="'email'">\r
      </app-form-input>\r
    </div>\r
  </fieldset>\r
\r
  <!-- Fieldset 2: Seguridad -->\r
  <fieldset class="register-form__fieldset">\r
    <legend class="register-form__legend">Seguridad</legend>\r
\r
    <!-- Campo de contrase\xF1a - Componente At\xF3mico -->\r
    <div class="register-form__field">\r
      <app-form-input\r
        [control]="passwordControl"\r
        label="Contrase\xF1a"\r
        type="password"\r
        id="register-password"\r
        placeholder="\u2022\u2022\u2022\u2022\u2022\u2022\u2022\u2022"\r
        helpText="8+ caracteres, may\xFAscula y especial (!@#$%...)"\r
        [required]="true"\r
        [autocomplete]="'new-password'">\r
      </app-form-input>\r
    </div>\r
\r
    <!-- Campo de confirmaci\xF3n de contrase\xF1a - Componente At\xF3mico -->\r
    <div class="register-form__field">\r
      <app-form-input\r
        [control]="confirmPasswordControl"\r
        label="Confirmar contrase\xF1a"\r
        type="password"\r
        id="register-confirm-password"\r
        placeholder="\u2022\u2022\u2022\u2022\u2022\u2022\u2022\u2022"\r
        helpText="Vuelve a escribir tu contrase\xF1a"\r
        [required]="true"\r
        [autocomplete]="'new-password'">\r
      </app-form-input>\r
\r
      <!-- Error de password mismatch a nivel de formulario -->\r
      @if (registerForm.hasError('passwordMismatch') && confirmPasswordControl.touched) {\r
      <p class="register-form__error" role="alert">\r
        Las contrase\xF1as no coinciden\r
      </p>\r
      }\r
    </div>\r
  </fieldset>\r
\r
  <!-- Bot\xF3n de submit -->\r
  <button\r
    type="submit"\r
    class="register-form__submit"\r
    [disabled]="registerForm.invalid || isSubmitting()"\r
    [attr.aria-busy]="isSubmitting()">\r
    {{ isSubmitting() ? 'CREANDO CUENTA...' : 'CREAR CUENTA' }}\r
  </button>\r
\r
  <!-- Link de inicio de sesi\xF3n -->\r
  <div class="register-form__footer">\r
    <p class="register-form__footer-text">\r
      \xBFYa tienes cuenta?\r
      <button\r
        type="button"\r
        class="register-form__link-btn"\r
        (click)="onLogin.emit()">\r
        Inicia sesi\xF3n\r
      </button>\r
    </p>\r
  </div>\r
</form>\r
`, styles: ['@charset "UTF-8";\n\n/* src/app/components/shared/register-form/register-form.scss */\n.register-form {\n  display: flex;\n  flex-direction: column;\n  gap: 1rem;\n  width: 100%;\n}\n.register-form__fieldset {\n  border: 2px solid var(--border-color);\n  border-radius: 3px;\n  padding: 1rem;\n  margin: 0;\n  display: flex;\n  flex-direction: column;\n  gap: 1rem;\n  background-color: var(--bg-secondary);\n}\n.register-form__legend {\n  font-size: 1.125rem;\n  font-weight: 600;\n  color: var(--text-primary);\n  padding: 0 0.5rem;\n  text-transform: uppercase;\n  letter-spacing: 0.05em;\n}\n.register-form__field {\n  display: flex;\n  flex-direction: column;\n  gap: 0.5rem;\n  width: 100%;\n}\n.register-form__label {\n  font-size: 0.875rem;\n  font-weight: 500;\n  color: var(--text-primary);\n  display: flex;\n  align-items: center;\n  gap: 0.25rem;\n}\n.register-form__required {\n  color: #E04A4A;\n  font-weight: 600;\n  font-size: 1.125rem;\n  line-height: 1;\n}\n.register-form__input {\n  width: 100%;\n  padding: 0.5rem 1rem;\n  font-family: "Space Grotesk", sans-serif;\n  font-size: 1rem;\n  color: var(--text-primary);\n  background-color: var(--bg-primary);\n  border: 3px solid var(--border-color);\n  border-radius: 5px;\n  box-shadow: 4px 4px 0px var(--shadow-color);\n  transition: all 150ms ease-in-out;\n  outline: none;\n}\n.register-form__input::placeholder {\n  color: var(--text-secondary);\n}\n.register-form__input:focus {\n  border-color: var(--color-primary);\n  box-shadow: 4px 4px 0px #ED9C05;\n}\n.register-form__input:hover:not(:disabled) {\n  transform: translate(-1px, -1px);\n  box-shadow: 3px 3px 0px var(--border-color);\n}\n.register-form__input:disabled {\n  opacity: 0.5;\n  cursor: not-allowed;\n  background-color: var(--bg-secondary);\n}\n.register-form__input:disabled:hover {\n  box-shadow: 4px 4px 0px var(--shadow-color);\n  transform: none;\n}\n.register-form__input--error {\n  border-color: #E04A4A;\n  box-shadow: 4px 4px 0px #E04A4A;\n}\n.register-form__input--error:focus {\n  box-shadow: 4px 4px 0px #E04A4A;\n}\n.register-form__error {\n  font-size: 0.75rem;\n  color: #E04A4A;\n  font-weight: 500;\n  display: flex;\n  align-items: center;\n  gap: 0.25rem;\n  min-height: 1.5em;\n  margin: 0;\n}\n.register-form__error::before {\n  content: "\\26a0";\n  font-size: 1rem;\n}\n.register-form__help {\n  font-size: 0.75rem;\n  color: var(--text-secondary);\n  font-style: italic;\n  min-height: 1.5em;\n  margin: 0;\n  display: flex;\n  align-items: center;\n}\n.register-form__submit {\n  font-family: "Space Grotesk", sans-serif;\n  font-size: 1rem;\n  font-weight: 600;\n  padding: 1rem 2rem;\n  border: 3px solid var(--border-color);\n  border-radius: 5px;\n  background-color: var(--color-primary);\n  color: var(--text-dark);\n  box-shadow: 4px 4px 0px var(--shadow-color);\n  transition: all 150ms ease-in-out;\n  cursor: pointer;\n  text-transform: uppercase;\n  letter-spacing: 0.05em;\n  width: 100%;\n  margin-top: 1rem;\n}\n.register-form__submit:hover:not(:disabled):not(.button--disabled) {\n  box-shadow: 2px 2px 0px var(--shadow-color);\n  transform: translate(2px, 2px);\n}\n.register-form__submit:active:not(:disabled):not(.button--disabled) {\n  box-shadow: 0px 0px 0px var(--shadow-color);\n  transform: translate(4px, 4px);\n}\n.register-form__submit:focus-visible {\n  outline: 3px solid var(--color-accent);\n  outline-offset: 2px;\n}\n.register-form__submit:disabled {\n  opacity: 0.6;\n  cursor: not-allowed;\n  pointer-events: none;\n  box-shadow: 4px 4px 0px var(--shadow-color);\n  transform: none;\n}\n.register-form__footer {\n  text-align: center;\n  margin-top: 0.5rem;\n}\n.register-form__footer-text {\n  font-size: 0.875rem;\n  color: var(--text-secondary);\n  margin: 0;\n}\n.register-form__link-btn {\n  background: none;\n  border: none;\n  padding: 0;\n  font-family: "Space Grotesk", sans-serif;\n  font-size: 0.875rem;\n  color: var(--color-primary);\n  text-decoration: none;\n  cursor: pointer;\n  transition: color 150ms ease-in-out;\n  font-weight: 600;\n}\n.register-form__link-btn:hover {\n  color: var(--color-secondary);\n  text-decoration: underline;\n}\n.register-form__link-btn:focus-visible {\n  outline: 2px solid var(--color-primary);\n  outline-offset: 2px;\n  border-radius: 2px;\n}\n/*# sourceMappingURL=register-form.css.map */\n'] }]
  }], () => [{ type: FormBuilder }], { onLogin: [{ type: Output, args: ["onLogin"] }] });
})();
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(RegisterForm, { className: "RegisterForm", filePath: "src/app/components/shared/register-form/register-form.ts", lineNumber: 41 });
})();

// src/app/components/shared/forgot-password-form/forgot-password-form.ts
function ForgotPasswordForm_form_0_Template(rf, ctx) {
  if (rf & 1) {
    const _r1 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "form", 2);
    \u0275\u0275listener("ngSubmit", function ForgotPasswordForm_form_0_Template_form_ngSubmit_0_listener() {
      \u0275\u0275restoreView(_r1);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.onSubmit());
    });
    \u0275\u0275elementStart(1, "fieldset", 3)(2, "legend", 4);
    \u0275\u0275text(3, "Recupera tu contrase\xF1a");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(4, "p", 5);
    \u0275\u0275text(5, " Introduce tu correo electr\xF3nico y te enviaremos un enlace para restablecer tu contrase\xF1a. ");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(6, "div", 6);
    \u0275\u0275element(7, "app-form-input", 7);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(8, "button", 8);
    \u0275\u0275text(9);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(10, "div", 9)(11, "button", 10);
    \u0275\u0275listener("click", function ForgotPasswordForm_form_0_Template_button_click_11_listener() {
      \u0275\u0275restoreView(_r1);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.onBackToLogin.emit());
    });
    \u0275\u0275text(12, " \u2190 Volver al inicio de sesi\xF3n ");
    \u0275\u0275elementEnd()()();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275property("formGroup", ctx_r1.forgotForm);
    \u0275\u0275advance(7);
    \u0275\u0275property("control", ctx_r1.emailControl)("required", true)("autocomplete", "email");
    \u0275\u0275advance();
    \u0275\u0275property("disabled", ctx_r1.forgotForm.invalid || ctx_r1.isSubmitting());
    \u0275\u0275attribute("aria-busy", ctx_r1.isSubmitting());
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", ctx_r1.isSubmitting() ? "ENVIANDO..." : "ENVIAR ENLACE", " ");
  }
}
function ForgotPasswordForm_div_1_Template(rf, ctx) {
  if (rf & 1) {
    const _r3 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 11)(1, "div", 12)(2, "div", 13);
    \u0275\u0275text(3, "\u2713");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(4, "h2", 14);
    \u0275\u0275text(5, " \xA1Revisa tu correo! ");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(6, "p", 15);
    \u0275\u0275text(7, " Hemos enviado un enlace de recuperaci\xF3n a ");
    \u0275\u0275elementStart(8, "strong");
    \u0275\u0275text(9);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(10, "p", 16);
    \u0275\u0275text(11, " El enlace expirar\xE1 en 1 hora. Si no recibes el correo, revisa tu carpeta de spam. ");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(12, "button", 17);
    \u0275\u0275listener("click", function ForgotPasswordForm_div_1_Template_button_click_12_listener() {
      \u0275\u0275restoreView(_r3);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.sendAnother());
    });
    \u0275\u0275text(13, " ENVIAR OTRO CORREO ");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(14, "div", 9)(15, "button", 10);
    \u0275\u0275listener("click", function ForgotPasswordForm_div_1_Template_button_click_15_listener() {
      \u0275\u0275restoreView(_r3);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.onBackToLogin.emit());
    });
    \u0275\u0275text(16, " \u2190 Volver al inicio de sesi\xF3n ");
    \u0275\u0275elementEnd()()()();
  }
  if (rf & 2) {
    let tmp_1_0;
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275advance(9);
    \u0275\u0275textInterpolate((tmp_1_0 = ctx_r1.forgotForm.get("email")) == null ? null : tmp_1_0.value);
  }
}
var ForgotPasswordForm = class _ForgotPasswordForm {
  formBuilder;
  /**
   * FormGroup - Contenedor del formulario de recuperación
   */
  forgotForm;
  /**
   * Estado de envío
   */
  isSubmitting = signal(false, ...ngDevMode ? [{ debugName: "isSubmitting" }] : []);
  /**
   * Estado de email enviado
   * Cuando es true, muestra confirmación y opción para enviar otro
   */
  emailSent = signal(false, ...ngDevMode ? [{ debugName: "emailSent" }] : []);
  // ============================================
  // OUTPUTS PARA NAVEGACIÓN ENTRE MODALES
  // ============================================
  /**
   * Emite cuando el usuario hace click en "Volver al inicio de sesión"
   */
  onBackToLogin = output();
  /**
   * Constructor
   */
  constructor(formBuilder) {
    this.formBuilder = formBuilder;
    this.forgotForm = this.formBuilder.group({
      email: [
        "",
        [
          Validators.required,
          Validators.email
        ]
      ]
    });
  }
  /**
   * Manejo del submit
   */
  onSubmit() {
    this.forgotForm.markAllAsTouched();
    if (this.forgotForm.valid) {
      this.isSubmitting.set(true);
      const formData = this.forgotForm.value;
      console.log("Recuperar contrase\xF1a para:", formData.email);
      setTimeout(() => {
        this.isSubmitting.set(false);
        this.emailSent.set(true);
      }, 1500);
    }
  }
  /**
   * Getter para acceder al FormControl de email
   * Devuelve el control tipado evitando null
   * Usado en el template: [formControl]="emailControl"
   */
  get emailControl() {
    return this.forgotForm.get("email");
  }
  /**
   * Resetear formulario para enviar otro email
   *
   * FLUJO:
   * 1. Limpiar el valor del input
   * 2. Resetear el estado del FormGroup
   * 3. Ocultar el mensaje de confirmación
   *
   * NOTA: reset() también marca como untouched y valid
   */
  sendAnother() {
    this.forgotForm.reset();
    this.emailSent.set(false);
  }
  static \u0275fac = function ForgotPasswordForm_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _ForgotPasswordForm)(\u0275\u0275directiveInject(FormBuilder));
  };
  static \u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _ForgotPasswordForm, selectors: [["app-forgot-password-form"]], outputs: { onBackToLogin: "onBackToLogin" }, decls: 2, vars: 2, consts: [["class", "forgot-password-form", "method", "post", "novalidate", "", 3, "formGroup", "ngSubmit", 4, "ngIf"], ["class", "forgot-password-form forgot-password-form--success", 4, "ngIf"], ["method", "post", "novalidate", "", 1, "forgot-password-form", 3, "ngSubmit", "formGroup"], [1, "forgot-password-form__fieldset"], [1, "forgot-password-form__legend"], [1, "forgot-password-form__description"], [1, "forgot-password-form__field"], ["label", "Correo electr\xF3nico", "type", "email", "id", "forgot-email", "placeholder", "tu@email.com", "helpText", "Usa el mismo correo con el que te registraste", 3, "control", "required", "autocomplete"], ["type", "submit", 1, "forgot-password-form__submit", 3, "disabled"], [1, "forgot-password-form__footer"], ["type", "button", 1, "forgot-password-form__link-btn", 3, "click"], [1, "forgot-password-form", "forgot-password-form--success"], [1, "forgot-password-form__success-content"], ["aria-hidden", "true", 1, "forgot-password-form__success-icon"], [1, "forgot-password-form__success-title"], [1, "forgot-password-form__success-message"], [1, "forgot-password-form__success-info"], ["type", "button", 1, "forgot-password-form__submit", "forgot-password-form__submit--secondary", 3, "click"]], template: function ForgotPasswordForm_Template(rf, ctx) {
    if (rf & 1) {
      \u0275\u0275template(0, ForgotPasswordForm_form_0_Template, 13, 7, "form", 0)(1, ForgotPasswordForm_div_1_Template, 17, 1, "div", 1);
    }
    if (rf & 2) {
      \u0275\u0275property("ngIf", !ctx.emailSent());
      \u0275\u0275advance();
      \u0275\u0275property("ngIf", ctx.emailSent());
    }
  }, dependencies: [CommonModule, NgIf, ReactiveFormsModule, \u0275NgNoValidate, NgControlStatusGroup, FormGroupDirective, FormInput], styles: ['@charset "UTF-8";\n\n\n\n.forgot-password-form[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  gap: 1rem;\n  width: 100%;\n}\n.forgot-password-form__fieldset[_ngcontent-%COMP%] {\n  border: 2px solid var(--border-color);\n  border-radius: 3px;\n  padding: 1rem;\n  margin: 0;\n  display: flex;\n  flex-direction: column;\n  gap: 1rem;\n  background-color: var(--bg-secondary);\n}\n.forgot-password-form__legend[_ngcontent-%COMP%] {\n  font-size: 1.125rem;\n  font-weight: 600;\n  color: var(--text-primary);\n  padding: 0 0.5rem;\n  text-transform: uppercase;\n  letter-spacing: 0.05em;\n}\n.forgot-password-form__description[_ngcontent-%COMP%] {\n  font-size: 0.875rem;\n  color: var(--text-secondary);\n  margin: 0;\n  line-height: 1.5;\n}\n.forgot-password-form__field[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  gap: 0.5rem;\n  width: 100%;\n}\n.forgot-password-form__label[_ngcontent-%COMP%] {\n  font-size: 0.875rem;\n  font-weight: 500;\n  color: var(--text-primary);\n  display: flex;\n  align-items: center;\n  gap: 0.25rem;\n}\n.forgot-password-form__required[_ngcontent-%COMP%] {\n  color: #E04A4A;\n  font-weight: 600;\n  font-size: 1.125rem;\n  line-height: 1;\n}\n.forgot-password-form__input[_ngcontent-%COMP%] {\n  width: 100%;\n  padding: 0.5rem 1rem;\n  font-family: "Space Grotesk", sans-serif;\n  font-size: 1rem;\n  color: var(--text-primary);\n  background-color: var(--bg-primary);\n  border: 3px solid var(--border-color);\n  border-radius: 5px;\n  box-shadow: 4px 4px 0px var(--shadow-color);\n  transition: all 150ms ease-in-out;\n  outline: none;\n}\n.forgot-password-form__input[_ngcontent-%COMP%]::placeholder {\n  color: var(--text-secondary);\n}\n.forgot-password-form__input[_ngcontent-%COMP%]:focus {\n  border-color: var(--color-primary);\n  box-shadow: 4px 4px 0px #ED9C05;\n}\n.forgot-password-form__input[_ngcontent-%COMP%]:hover:not(:disabled) {\n  transform: translate(-1px, -1px);\n  box-shadow: 3px 3px 0px var(--border-color);\n}\n.forgot-password-form__input[_ngcontent-%COMP%]:disabled {\n  opacity: 0.5;\n  cursor: not-allowed;\n  background-color: var(--bg-secondary);\n}\n.forgot-password-form__input[_ngcontent-%COMP%]:disabled:hover {\n  box-shadow: 4px 4px 0px var(--shadow-color);\n  transform: none;\n}\n.forgot-password-form__input--error[_ngcontent-%COMP%] {\n  border-color: #E04A4A;\n  box-shadow: 4px 4px 0px #E04A4A;\n}\n.forgot-password-form__input--error[_ngcontent-%COMP%]:focus {\n  box-shadow: 4px 4px 0px #E04A4A;\n}\n.forgot-password-form__input--error[_ngcontent-%COMP%]:focus {\n  box-shadow: 4px 4px 0px #E04A4A;\n}\n.forgot-password-form__error[_ngcontent-%COMP%] {\n  font-size: 0.75rem;\n  color: #E04A4A;\n  font-weight: 500;\n  display: flex;\n  align-items: center;\n  gap: 0.25rem;\n  min-height: 1.5em;\n  margin: 0;\n}\n.forgot-password-form__error[_ngcontent-%COMP%]::before {\n  content: "\\26a0";\n  font-size: 1rem;\n}\n.forgot-password-form__help[_ngcontent-%COMP%] {\n  font-size: 0.75rem;\n  color: var(--text-secondary);\n  font-style: italic;\n  min-height: 1.5em;\n  margin: 0;\n  display: flex;\n  align-items: center;\n}\n.forgot-password-form__submit[_ngcontent-%COMP%] {\n  font-family: "Space Grotesk", sans-serif;\n  font-size: 1rem;\n  font-weight: 600;\n  padding: 1rem 2rem;\n  border: 3px solid var(--border-color);\n  border-radius: 5px;\n  background-color: var(--color-primary);\n  color: var(--text-dark);\n  box-shadow: 4px 4px 0px var(--shadow-color);\n  transition: all 150ms ease-in-out;\n  cursor: pointer;\n  text-transform: uppercase;\n  letter-spacing: 0.05em;\n  width: 100%;\n  margin-top: 1rem;\n}\n.forgot-password-form__submit[_ngcontent-%COMP%]:hover:not(:disabled):not(.button--disabled) {\n  box-shadow: 2px 2px 0px var(--shadow-color);\n  transform: translate(2px, 2px);\n}\n.forgot-password-form__submit[_ngcontent-%COMP%]:active:not(:disabled):not(.button--disabled) {\n  box-shadow: 0px 0px 0px var(--shadow-color);\n  transform: translate(4px, 4px);\n}\n.forgot-password-form__submit[_ngcontent-%COMP%]:focus-visible {\n  outline: 3px solid var(--color-accent);\n  outline-offset: 2px;\n}\n.forgot-password-form__submit[_ngcontent-%COMP%]:disabled {\n  opacity: 0.6;\n  cursor: not-allowed;\n  pointer-events: none;\n  box-shadow: 4px 4px 0px var(--shadow-color);\n  transform: none;\n}\n.forgot-password-form__submit--secondary[_ngcontent-%COMP%] {\n  background-color: var(--bg-secondary);\n  border-color: var(--border-color);\n}\n.forgot-password-form__submit--secondary[_ngcontent-%COMP%]:hover:not(:disabled) {\n  background-color: var(--color-secondary);\n}\n.forgot-password-form__footer[_ngcontent-%COMP%] {\n  text-align: center;\n  margin-top: 0.5rem;\n}\n.forgot-password-form__link-btn[_ngcontent-%COMP%] {\n  background: none;\n  border: none;\n  padding: 0;\n  font-family: "Space Grotesk", sans-serif;\n  font-size: 0.875rem;\n  color: var(--color-primary);\n  text-decoration: none;\n  cursor: pointer;\n  transition: color 150ms ease-in-out;\n  font-weight: 600;\n}\n.forgot-password-form__link-btn[_ngcontent-%COMP%]:hover {\n  color: var(--color-secondary);\n  text-decoration: underline;\n}\n.forgot-password-form__link-btn[_ngcontent-%COMP%]:focus-visible {\n  outline: 2px solid var(--color-primary);\n  outline-offset: 2px;\n  border-radius: 2px;\n}\n.forgot-password-form--success[_ngcontent-%COMP%] {\n  text-align: center;\n}\n.forgot-password-form__success-content[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  gap: 2rem;\n  align-items: center;\n}\n.forgot-password-form__success-icon[_ngcontent-%COMP%] {\n  width: 60px;\n  height: 60px;\n  border-radius: 50%;\n  background-color: #AAD661;\n  color: var(--text-dark);\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  font-size: 2rem;\n  font-weight: 700;\n  border: 3px solid var(--border-color);\n  box-shadow: 4px 4px 0px var(--shadow-color);\n}\n.forgot-password-form__success-title[_ngcontent-%COMP%] {\n  font-size: 1rem;\n  font-weight: 700;\n  color: var(--text-primary);\n  margin: 0;\n  text-transform: uppercase;\n  letter-spacing: 0.05em;\n}\n.forgot-password-form__success-message[_ngcontent-%COMP%] {\n  font-size: 0.875rem;\n  color: var(--text-primary);\n  margin: 0;\n  line-height: 1.5;\n}\n.forgot-password-form__success-message[_ngcontent-%COMP%]   strong[_ngcontent-%COMP%] {\n  font-weight: 600;\n  color: var(--color-primary);\n}\n.forgot-password-form__success-info[_ngcontent-%COMP%] {\n  font-size: 0.75rem;\n  color: var(--text-secondary);\n  margin: 0;\n}\n.forgot-password-form__success-info[_ngcontent-%COMP%] {\n  font-size: 0.875rem;\n  color: var(--text-secondary);\n  margin: 0;\n  line-height: 1.5;\n  padding: 1rem;\n  background-color: var(--bg-secondary);\n  border: 2px solid var(--border-color);\n  border-radius: 5px;\n  width: 100%;\n}\n/*# sourceMappingURL=forgot-password-form.css.map */'] });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(ForgotPasswordForm, [{
    type: Component,
    args: [{ selector: "app-forgot-password-form", imports: [CommonModule, ReactiveFormsModule, FormInput], template: `<!-- Vista cuando NO se ha enviado el email -->\r
<form\r
  *ngIf="!emailSent()"\r
  [formGroup]="forgotForm"\r
  class="forgot-password-form"\r
  (ngSubmit)="onSubmit()"\r
  method="post"\r
  novalidate>\r
\r
  <fieldset class="forgot-password-form__fieldset">\r
    <legend class="forgot-password-form__legend">Recupera tu contrase\xF1a</legend>\r
\r
    <!-- Descripci\xF3n -->\r
    <p class="forgot-password-form__description">\r
      Introduce tu correo electr\xF3nico y te enviaremos un enlace para restablecer tu contrase\xF1a.\r
    </p>\r
\r
    <!-- Campo de correo electr\xF3nico - Componente At\xF3mico -->\r
    <div class="forgot-password-form__field">\r
      <app-form-input\r
        [control]="emailControl"\r
        label="Correo electr\xF3nico"\r
        type="email"\r
        id="forgot-email"\r
        placeholder="tu@email.com"\r
        helpText="Usa el mismo correo con el que te registraste"\r
        [required]="true"\r
        [autocomplete]="'email'">\r
      </app-form-input>\r
    </div>\r
  </fieldset>\r
\r
  <!-- Bot\xF3n de submit -->\r
  <button\r
    type="submit"\r
    class="forgot-password-form__submit"\r
    [disabled]="forgotForm.invalid || isSubmitting()"\r
    [attr.aria-busy]="isSubmitting()">\r
    {{ isSubmitting() ? 'ENVIANDO...' : 'ENVIAR ENLACE' }}\r
  </button>\r
\r
  <!-- Link de volver al login -->\r
  <div class="forgot-password-form__footer">\r
    <button\r
      type="button"\r
      class="forgot-password-form__link-btn"\r
      (click)="onBackToLogin.emit()">\r
      \u2190 Volver al inicio de sesi\xF3n\r
    </button>\r
  </div>\r
</form>\r
\r
<!-- Vista de confirmaci\xF3n cuando se ha enviado el email -->\r
<div *ngIf="emailSent()" class="forgot-password-form forgot-password-form--success">\r
  <div class="forgot-password-form__success-content">\r
    <!-- Icono de \xE9xito -->\r
    <div class="forgot-password-form__success-icon" aria-hidden="true">\u2713</div>\r
\r
    <!-- T\xEDtulo -->\r
    <h2 class="forgot-password-form__success-title">\r
      \xA1Revisa tu correo!\r
    </h2>\r
\r
    <!-- Mensaje -->\r
    <p class="forgot-password-form__success-message">\r
      Hemos enviado un enlace de recuperaci\xF3n a <strong>{{ forgotForm.get('email')?.value }}</strong>\r
    </p>\r
\r
    <p class="forgot-password-form__success-info">\r
      El enlace expirar\xE1 en 1 hora. Si no recibes el correo, revisa tu carpeta de spam.\r
    </p>\r
\r
    <!-- Bot\xF3n para enviar otro correo -->\r
    <button\r
      type="button"\r
      class="forgot-password-form__submit forgot-password-form__submit--secondary"\r
      (click)="sendAnother()">\r
      ENVIAR OTRO CORREO\r
    </button>\r
\r
    <!-- Link de volver al login -->\r
    <div class="forgot-password-form__footer">\r
      <button\r
        type="button"\r
        class="forgot-password-form__link-btn"\r
        (click)="onBackToLogin.emit()">\r
        \u2190 Volver al inicio de sesi\xF3n\r
      </button>\r
    </div>\r
  </div>\r
</div>\r
`, styles: ['@charset "UTF-8";\n\n/* src/app/components/shared/forgot-password-form/forgot-password-form.scss */\n.forgot-password-form {\n  display: flex;\n  flex-direction: column;\n  gap: 1rem;\n  width: 100%;\n}\n.forgot-password-form__fieldset {\n  border: 2px solid var(--border-color);\n  border-radius: 3px;\n  padding: 1rem;\n  margin: 0;\n  display: flex;\n  flex-direction: column;\n  gap: 1rem;\n  background-color: var(--bg-secondary);\n}\n.forgot-password-form__legend {\n  font-size: 1.125rem;\n  font-weight: 600;\n  color: var(--text-primary);\n  padding: 0 0.5rem;\n  text-transform: uppercase;\n  letter-spacing: 0.05em;\n}\n.forgot-password-form__description {\n  font-size: 0.875rem;\n  color: var(--text-secondary);\n  margin: 0;\n  line-height: 1.5;\n}\n.forgot-password-form__field {\n  display: flex;\n  flex-direction: column;\n  gap: 0.5rem;\n  width: 100%;\n}\n.forgot-password-form__label {\n  font-size: 0.875rem;\n  font-weight: 500;\n  color: var(--text-primary);\n  display: flex;\n  align-items: center;\n  gap: 0.25rem;\n}\n.forgot-password-form__required {\n  color: #E04A4A;\n  font-weight: 600;\n  font-size: 1.125rem;\n  line-height: 1;\n}\n.forgot-password-form__input {\n  width: 100%;\n  padding: 0.5rem 1rem;\n  font-family: "Space Grotesk", sans-serif;\n  font-size: 1rem;\n  color: var(--text-primary);\n  background-color: var(--bg-primary);\n  border: 3px solid var(--border-color);\n  border-radius: 5px;\n  box-shadow: 4px 4px 0px var(--shadow-color);\n  transition: all 150ms ease-in-out;\n  outline: none;\n}\n.forgot-password-form__input::placeholder {\n  color: var(--text-secondary);\n}\n.forgot-password-form__input:focus {\n  border-color: var(--color-primary);\n  box-shadow: 4px 4px 0px #ED9C05;\n}\n.forgot-password-form__input:hover:not(:disabled) {\n  transform: translate(-1px, -1px);\n  box-shadow: 3px 3px 0px var(--border-color);\n}\n.forgot-password-form__input:disabled {\n  opacity: 0.5;\n  cursor: not-allowed;\n  background-color: var(--bg-secondary);\n}\n.forgot-password-form__input:disabled:hover {\n  box-shadow: 4px 4px 0px var(--shadow-color);\n  transform: none;\n}\n.forgot-password-form__input--error {\n  border-color: #E04A4A;\n  box-shadow: 4px 4px 0px #E04A4A;\n}\n.forgot-password-form__input--error:focus {\n  box-shadow: 4px 4px 0px #E04A4A;\n}\n.forgot-password-form__input--error:focus {\n  box-shadow: 4px 4px 0px #E04A4A;\n}\n.forgot-password-form__error {\n  font-size: 0.75rem;\n  color: #E04A4A;\n  font-weight: 500;\n  display: flex;\n  align-items: center;\n  gap: 0.25rem;\n  min-height: 1.5em;\n  margin: 0;\n}\n.forgot-password-form__error::before {\n  content: "\\26a0";\n  font-size: 1rem;\n}\n.forgot-password-form__help {\n  font-size: 0.75rem;\n  color: var(--text-secondary);\n  font-style: italic;\n  min-height: 1.5em;\n  margin: 0;\n  display: flex;\n  align-items: center;\n}\n.forgot-password-form__submit {\n  font-family: "Space Grotesk", sans-serif;\n  font-size: 1rem;\n  font-weight: 600;\n  padding: 1rem 2rem;\n  border: 3px solid var(--border-color);\n  border-radius: 5px;\n  background-color: var(--color-primary);\n  color: var(--text-dark);\n  box-shadow: 4px 4px 0px var(--shadow-color);\n  transition: all 150ms ease-in-out;\n  cursor: pointer;\n  text-transform: uppercase;\n  letter-spacing: 0.05em;\n  width: 100%;\n  margin-top: 1rem;\n}\n.forgot-password-form__submit:hover:not(:disabled):not(.button--disabled) {\n  box-shadow: 2px 2px 0px var(--shadow-color);\n  transform: translate(2px, 2px);\n}\n.forgot-password-form__submit:active:not(:disabled):not(.button--disabled) {\n  box-shadow: 0px 0px 0px var(--shadow-color);\n  transform: translate(4px, 4px);\n}\n.forgot-password-form__submit:focus-visible {\n  outline: 3px solid var(--color-accent);\n  outline-offset: 2px;\n}\n.forgot-password-form__submit:disabled {\n  opacity: 0.6;\n  cursor: not-allowed;\n  pointer-events: none;\n  box-shadow: 4px 4px 0px var(--shadow-color);\n  transform: none;\n}\n.forgot-password-form__submit--secondary {\n  background-color: var(--bg-secondary);\n  border-color: var(--border-color);\n}\n.forgot-password-form__submit--secondary:hover:not(:disabled) {\n  background-color: var(--color-secondary);\n}\n.forgot-password-form__footer {\n  text-align: center;\n  margin-top: 0.5rem;\n}\n.forgot-password-form__link-btn {\n  background: none;\n  border: none;\n  padding: 0;\n  font-family: "Space Grotesk", sans-serif;\n  font-size: 0.875rem;\n  color: var(--color-primary);\n  text-decoration: none;\n  cursor: pointer;\n  transition: color 150ms ease-in-out;\n  font-weight: 600;\n}\n.forgot-password-form__link-btn:hover {\n  color: var(--color-secondary);\n  text-decoration: underline;\n}\n.forgot-password-form__link-btn:focus-visible {\n  outline: 2px solid var(--color-primary);\n  outline-offset: 2px;\n  border-radius: 2px;\n}\n.forgot-password-form--success {\n  text-align: center;\n}\n.forgot-password-form__success-content {\n  display: flex;\n  flex-direction: column;\n  gap: 2rem;\n  align-items: center;\n}\n.forgot-password-form__success-icon {\n  width: 60px;\n  height: 60px;\n  border-radius: 50%;\n  background-color: #AAD661;\n  color: var(--text-dark);\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  font-size: 2rem;\n  font-weight: 700;\n  border: 3px solid var(--border-color);\n  box-shadow: 4px 4px 0px var(--shadow-color);\n}\n.forgot-password-form__success-title {\n  font-size: 1rem;\n  font-weight: 700;\n  color: var(--text-primary);\n  margin: 0;\n  text-transform: uppercase;\n  letter-spacing: 0.05em;\n}\n.forgot-password-form__success-message {\n  font-size: 0.875rem;\n  color: var(--text-primary);\n  margin: 0;\n  line-height: 1.5;\n}\n.forgot-password-form__success-message strong {\n  font-weight: 600;\n  color: var(--color-primary);\n}\n.forgot-password-form__success-info {\n  font-size: 0.75rem;\n  color: var(--text-secondary);\n  margin: 0;\n}\n.forgot-password-form__success-info {\n  font-size: 0.875rem;\n  color: var(--text-secondary);\n  margin: 0;\n  line-height: 1.5;\n  padding: 1rem;\n  background-color: var(--bg-secondary);\n  border: 2px solid var(--border-color);\n  border-radius: 5px;\n  width: 100%;\n}\n/*# sourceMappingURL=forgot-password-form.css.map */\n'] }]
  }], () => [{ type: FormBuilder }], { onBackToLogin: [{ type: Output, args: ["onBackToLogin"] }] });
})();
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(ForgotPasswordForm, { className: "ForgotPasswordForm", filePath: "src/app/components/shared/forgot-password-form/forgot-password-form.ts", lineNumber: 34 });
})();

// src/app/components/shared/modal/modal.ts
var _c0 = ["*", [["", "modal-footer", ""]]];
var _c1 = ["*", "[modal-footer]"];
function Modal_ng_template_0_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275namespaceSVG();
    \u0275\u0275elementStart(0, "svg", 2);
    \u0275\u0275element(1, "line", 3)(2, "line", 4);
    \u0275\u0275elementEnd();
  }
}
function Modal_Conditional_2_Conditional_2_ng_container_4_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementContainer(0);
  }
}
function Modal_Conditional_2_Conditional_2_Template(rf, ctx) {
  if (rf & 1) {
    const _r3 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 7)(1, "h2", 11);
    \u0275\u0275text(2);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "button", 12);
    \u0275\u0275listener("click", function Modal_Conditional_2_Conditional_2_Template_button_click_3_listener() {
      \u0275\u0275restoreView(_r3);
      const ctx_r1 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r1.close());
    });
    \u0275\u0275template(4, Modal_Conditional_2_Conditional_2_ng_container_4_Template, 1, 0, "ng-container", 13);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext(2);
    const closeIcon_r4 = \u0275\u0275reference(1);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate1(" ", ctx_r1.title(), " ");
    \u0275\u0275advance(2);
    \u0275\u0275property("ngTemplateOutlet", closeIcon_r4);
  }
}
function Modal_Conditional_2_Conditional_3_ng_container_1_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementContainer(0);
  }
}
function Modal_Conditional_2_Conditional_3_Template(rf, ctx) {
  if (rf & 1) {
    const _r5 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "button", 14);
    \u0275\u0275listener("click", function Modal_Conditional_2_Conditional_3_Template_button_click_0_listener() {
      \u0275\u0275restoreView(_r5);
      const ctx_r1 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r1.close());
    });
    \u0275\u0275template(1, Modal_Conditional_2_Conditional_3_ng_container_1_Template, 1, 0, "ng-container", 13);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    \u0275\u0275nextContext(2);
    const closeIcon_r4 = \u0275\u0275reference(1);
    \u0275\u0275advance();
    \u0275\u0275property("ngTemplateOutlet", closeIcon_r4);
  }
}
function Modal_Conditional_2_Template(rf, ctx) {
  if (rf & 1) {
    const _r1 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 5);
    \u0275\u0275listener("click", function Modal_Conditional_2_Template_div_click_0_listener($event) {
      \u0275\u0275restoreView(_r1);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.onOverlayClick($event));
    });
    \u0275\u0275elementStart(1, "div", 6);
    \u0275\u0275conditionalCreate(2, Modal_Conditional_2_Conditional_2_Template, 5, 2, "div", 7);
    \u0275\u0275conditionalCreate(3, Modal_Conditional_2_Conditional_3_Template, 2, 1, "button", 8);
    \u0275\u0275elementStart(4, "div", 9);
    \u0275\u0275projection(5);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(6, "div", 10);
    \u0275\u0275projection(7, 1);
    \u0275\u0275elementEnd()()();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275attribute("aria-labelledby", ctx_r1.title() ? "modal-title" : null);
    \u0275\u0275advance(2);
    \u0275\u0275conditional(ctx_r1.title() ? 2 : -1);
    \u0275\u0275advance();
    \u0275\u0275conditional(!ctx_r1.title() ? 3 : -1);
  }
}
var Modal = class _Modal {
  /**
   * Señal para controlar si el modal está abierto.
   * Se puede pasar desde el componente padre.
   */
  isOpen = input(false, ...ngDevMode ? [{ debugName: "isOpen" }] : []);
  /**
   * Título del modal (opcional)
   */
  title = input("", ...ngDevMode ? [{ debugName: "title" }] : []);
  /**
   * Evento que se emite cuando el modal se cierra
   */
  onClose = output();
  /**
   * Signal interna para controlar animaciones
   */
  isVisible = signal(false, ...ngDevMode ? [{ debugName: "isVisible" }] : []);
  /**
   * Flag para distinguir cierre por usuario vs cierre por input
   */
  closedByUser = false;
  constructor() {
    effect(() => {
      if (this.isOpen()) {
        this.open();
      } else {
        this.closeWithoutEmit();
      }
    });
  }
  /**
   * Abrir modal
   */
  open() {
    this.isVisible.set(true);
    this.closedByUser = false;
    document.body.style.overflow = "hidden";
  }
  /**
   * Cerrar modal (por acción del usuario)
   */
  close() {
    this.isVisible.set(false);
    document.body.style.overflow = "";
    this.onClose.emit();
  }
  /**
   * Cerrar modal sin emitir evento (por cambio de input)
   */
  closeWithoutEmit() {
    this.isVisible.set(false);
    document.body.style.overflow = "";
  }
  /**
   * Cerrar al hacer click en el overlay (fuera del contenido)
   */
  onOverlayClick(event) {
    const target = event.target;
    if (target.classList.contains("modal__overlay")) {
      this.close();
    }
  }
  /**
   * Cerrar modal al presionar ESC
   */
  onEscapeKey() {
    if (this.isVisible()) {
      this.close();
    }
  }
  /**
   * Trap focus: prevenir que el foco salga del modal
   */
  onKeydown(event) {
    if (!this.isVisible() || event.key !== "Tab")
      return;
    const modalElement = document.querySelector(".modal__content");
    if (!modalElement)
      return;
    const focusableElements = modalElement.querySelectorAll('a[href], button:not([disabled]), textarea:not([disabled]), input:not([disabled]), select:not([disabled]), [tabindex]:not([tabindex="-1"])');
    const firstElement = focusableElements[0];
    const lastElement = focusableElements[focusableElements.length - 1];
    if (event.shiftKey && document.activeElement === firstElement) {
      event.preventDefault();
      lastElement?.focus();
    } else if (!event.shiftKey && document.activeElement === lastElement) {
      event.preventDefault();
      firstElement?.focus();
    }
  }
  static \u0275fac = function Modal_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _Modal)();
  };
  static \u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _Modal, selectors: [["app-modal"]], hostBindings: function Modal_HostBindings(rf, ctx) {
    if (rf & 1) {
      \u0275\u0275listener("keydown.escape", function Modal_keydown_escape_HostBindingHandler() {
        return ctx.onEscapeKey();
      }, \u0275\u0275resolveDocument)("keydown", function Modal_keydown_HostBindingHandler($event) {
        return ctx.onKeydown($event);
      });
    }
  }, inputs: { isOpen: [1, "isOpen"], title: [1, "title"] }, outputs: { onClose: "onClose" }, ngContentSelectors: _c1, decls: 3, vars: 1, consts: [["closeIcon", ""], ["role", "dialog", "aria-modal", "true", 1, "modal__overlay"], ["width", "24", "height", "24", "viewBox", "0 0 24 24", "fill", "none", "stroke", "currentColor", "stroke-width", "2", "stroke-linecap", "round", "stroke-linejoin", "round"], ["x1", "18", "y1", "6", "x2", "6", "y2", "18"], ["x1", "6", "y1", "6", "x2", "18", "y2", "18"], ["role", "dialog", "aria-modal", "true", 1, "modal__overlay", 3, "click"], [1, "modal__content"], [1, "modal__header"], ["aria-label", "Cerrar modal", "type", "button", 1, "modal__close", "modal__close--floating"], [1, "modal__body"], [1, "modal__footer"], ["id", "modal-title", 1, "modal__title"], ["aria-label", "Cerrar modal", "type", "button", 1, "modal__close", 3, "click"], [4, "ngTemplateOutlet"], ["aria-label", "Cerrar modal", "type", "button", 1, "modal__close", "modal__close--floating", 3, "click"]], template: function Modal_Template(rf, ctx) {
    if (rf & 1) {
      \u0275\u0275projectionDef(_c0);
      \u0275\u0275template(0, Modal_ng_template_0_Template, 3, 0, "ng-template", null, 0, \u0275\u0275templateRefExtractor);
      \u0275\u0275conditionalCreate(2, Modal_Conditional_2_Template, 8, 3, "div", 1);
    }
    if (rf & 2) {
      \u0275\u0275advance(2);
      \u0275\u0275conditional(ctx.isVisible() ? 2 : -1);
    }
  }, dependencies: [CommonModule, NgTemplateOutlet], styles: ['@charset "UTF-8";\n\n\n\n.modal__overlay[_ngcontent-%COMP%] {\n  position: fixed;\n  top: 0;\n  left: 0;\n  width: 100%;\n  height: 100%;\n  background-color: rgba(0, 0, 0, 0.7);\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  z-index: 6;\n  padding: 2rem;\n  -webkit-backdrop-filter: blur(3px);\n  backdrop-filter: blur(3px);\n  animation: _ngcontent-%COMP%_modal-fadeIn 300ms ease;\n}\n@keyframes _ngcontent-%COMP%_modal-fadeIn {\n  from {\n    opacity: 0;\n  }\n  to {\n    opacity: 1;\n  }\n}\n.modal__content[_ngcontent-%COMP%] {\n  background-color: var(--bg-primary);\n  border: 4px solid var(--border-color);\n  border-radius: 8px;\n  box-shadow: 8px 8px 0px var(--shadow-color);\n  max-width: 36rem;\n  width: 100%;\n  max-height: 90vh;\n  overflow: hidden;\n  display: flex;\n  flex-direction: column;\n  gap: 0;\n  animation: _ngcontent-%COMP%_modal-slideUp 300ms cubic-bezier(0.25, 0.46, 0.45, 0.94);\n}\n@keyframes _ngcontent-%COMP%_modal-slideUp {\n  from {\n    transform: translateY(2rem);\n    opacity: 0;\n  }\n  to {\n    transform: translateY(0);\n    opacity: 1;\n  }\n}\n.modal__header[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: row;\n  gap: 2rem;\n  justify-content: space-between;\n  align-items: center;\n  padding: 2rem;\n  border-bottom: 3px solid var(--border-color);\n  background-color: var(--color-primary);\n}\n.modal__title[_ngcontent-%COMP%] {\n  font-family: "Space Grotesk", sans-serif;\n  font-size: 1.125rem;\n  font-weight: 800;\n  color: var(--text-primary);\n  margin: 0;\n  text-transform: uppercase;\n  letter-spacing: 0.05em;\n}\n.modal__close[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  background: none;\n  border: none;\n  cursor: pointer;\n  padding: 0.5rem;\n  color: var(--text-primary);\n  border-radius: 5px;\n  transition: all 150ms ease-in-out;\n  flex-shrink: 0;\n}\n.modal__close[_ngcontent-%COMP%]:hover {\n  background-color: var(--bg-secondary);\n  transform: scale(1.1);\n}\n.modal__close[_ngcontent-%COMP%]:active {\n  transform: scale(0.95);\n}\n.modal__close[_ngcontent-%COMP%]:focus-visible {\n  outline: 3px solid var(--color-accent);\n  outline-offset: 2px;\n}\n.modal__close[_ngcontent-%COMP%]   svg[_ngcontent-%COMP%] {\n  width: 1.5rem;\n  height: 1.5rem;\n}\n.modal__close--floating[_ngcontent-%COMP%] {\n  position: absolute;\n  top: 1rem;\n  right: 1rem;\n  background-color: var(--bg-primary);\n  border: 2px solid var(--border-color);\n  box-shadow: 2px 2px 0px var(--shadow-color);\n  z-index: 10;\n}\n.modal__close--floating[_ngcontent-%COMP%]:hover {\n  background-color: var(--bg-secondary);\n  box-shadow: 1px 1px 0px var(--shadow-color);\n  transform: translate(1px, 1px);\n}\n.modal__body[_ngcontent-%COMP%] {\n  padding: 2rem;\n  overflow-y: auto;\n  flex: 1;\n  color: var(--text-primary);\n  font-family: "Space Grotesk", sans-serif;\n  font-size: 0.9375rem;\n  line-height: 1.6;\n}\n.modal__body[_ngcontent-%COMP%]   .login-form[_ngcontent-%COMP%], \n.modal__body[_ngcontent-%COMP%]   .register-form[_ngcontent-%COMP%], \n.modal__body[_ngcontent-%COMP%]   .forgot-password-form[_ngcontent-%COMP%] {\n  border: none;\n  box-shadow: none;\n  padding: 0;\n  max-width: 100%;\n}\n.modal__footer[_ngcontent-%COMP%] {\n  padding: 2rem;\n  border-top: 3px solid var(--border-color);\n  background-color: var(--bg-secondary);\n  display: flex;\n  flex-direction: row;\n  gap: 1rem;\n  justify-content: flex-end;\n}\n.modal__footer[_ngcontent-%COMP%]:empty {\n  display: none;\n}\n@media (max-width: 767px) {\n  .modal__overlay[_ngcontent-%COMP%] {\n    padding: 1rem;\n  }\n  .modal__content[_ngcontent-%COMP%] {\n    max-height: 95vh;\n  }\n  .modal__header[_ngcontent-%COMP%] {\n    padding: 1rem;\n  }\n  .modal__body[_ngcontent-%COMP%] {\n    padding: 2rem;\n    font-size: 0.875rem;\n  }\n  .modal__footer[_ngcontent-%COMP%] {\n    padding: 1rem;\n    flex-direction: column;\n  }\n}\n/*# sourceMappingURL=modal.css.map */'] });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(Modal, [{
    type: Component,
    args: [{ selector: "app-modal", imports: [CommonModule], template: `<!-- Template reutilizable para el icono de cerrar -->\r
<ng-template #closeIcon>\r
  <svg\r
    width="24"\r
    height="24"\r
    viewBox="0 0 24 24"\r
    fill="none"\r
    stroke="currentColor"\r
    stroke-width="2"\r
    stroke-linecap="round"\r
    stroke-linejoin="round">\r
    <line x1="18" y1="6" x2="6" y2="18"></line>\r
    <line x1="6" y1="6" x2="18" y2="18"></line>\r
  </svg>\r
</ng-template>\r
\r
<!-- Modal overlay: s\xF3lo visible cuando isVisible() es true -->\r
@if (isVisible()) {\r
<div\r
  class="modal__overlay"\r
  (click)="onOverlayClick($event)"\r
  role="dialog"\r
  aria-modal="true"\r
  [attr.aria-labelledby]="title() ? 'modal-title' : null">\r
\r
  <!-- Contenido del modal -->\r
  <div class="modal__content">\r
    <!-- Header del modal (solo si hay t\xEDtulo) -->\r
    @if (title()) {\r
    <div class="modal__header">\r
      <h2\r
        id="modal-title"\r
        class="modal__title">\r
        {{ title() }}\r
      </h2>\r
      <button\r
        class="modal__close"\r
        (click)="close()"\r
        aria-label="Cerrar modal"\r
        type="button">\r
        <ng-container *ngTemplateOutlet="closeIcon"></ng-container>\r
      </button>\r
    </div>\r
    }\r
    <!-- Bot\xF3n cerrar flotante (cuando no hay header) -->\r
    @if (!title()) {\r
    <button\r
      class="modal__close modal__close--floating"\r
      (click)="close()"\r
      aria-label="Cerrar modal"\r
      type="button">\r
      <ng-container *ngTemplateOutlet="closeIcon"></ng-container>\r
    </button>\r
    }\r
\r
    <!-- Body del modal: contenido din\xE1mico proyectado -->\r
    <div class="modal__body">\r
      <ng-content></ng-content>\r
    </div>\r
\r
    <!-- Footer del modal (opcional) -->\r
    <div class="modal__footer">\r
      <ng-content select="[modal-footer]"></ng-content>\r
    </div>\r
  </div>\r
</div>\r
}\r
`, styles: ['@charset "UTF-8";\n\n/* src/app/components/shared/modal/modal.scss */\n.modal__overlay {\n  position: fixed;\n  top: 0;\n  left: 0;\n  width: 100%;\n  height: 100%;\n  background-color: rgba(0, 0, 0, 0.7);\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  z-index: 6;\n  padding: 2rem;\n  -webkit-backdrop-filter: blur(3px);\n  backdrop-filter: blur(3px);\n  animation: modal-fadeIn 300ms ease;\n}\n@keyframes modal-fadeIn {\n  from {\n    opacity: 0;\n  }\n  to {\n    opacity: 1;\n  }\n}\n.modal__content {\n  background-color: var(--bg-primary);\n  border: 4px solid var(--border-color);\n  border-radius: 8px;\n  box-shadow: 8px 8px 0px var(--shadow-color);\n  max-width: 36rem;\n  width: 100%;\n  max-height: 90vh;\n  overflow: hidden;\n  display: flex;\n  flex-direction: column;\n  gap: 0;\n  animation: modal-slideUp 300ms cubic-bezier(0.25, 0.46, 0.45, 0.94);\n}\n@keyframes modal-slideUp {\n  from {\n    transform: translateY(2rem);\n    opacity: 0;\n  }\n  to {\n    transform: translateY(0);\n    opacity: 1;\n  }\n}\n.modal__header {\n  display: flex;\n  flex-direction: row;\n  gap: 2rem;\n  justify-content: space-between;\n  align-items: center;\n  padding: 2rem;\n  border-bottom: 3px solid var(--border-color);\n  background-color: var(--color-primary);\n}\n.modal__title {\n  font-family: "Space Grotesk", sans-serif;\n  font-size: 1.125rem;\n  font-weight: 800;\n  color: var(--text-primary);\n  margin: 0;\n  text-transform: uppercase;\n  letter-spacing: 0.05em;\n}\n.modal__close {\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  background: none;\n  border: none;\n  cursor: pointer;\n  padding: 0.5rem;\n  color: var(--text-primary);\n  border-radius: 5px;\n  transition: all 150ms ease-in-out;\n  flex-shrink: 0;\n}\n.modal__close:hover {\n  background-color: var(--bg-secondary);\n  transform: scale(1.1);\n}\n.modal__close:active {\n  transform: scale(0.95);\n}\n.modal__close:focus-visible {\n  outline: 3px solid var(--color-accent);\n  outline-offset: 2px;\n}\n.modal__close svg {\n  width: 1.5rem;\n  height: 1.5rem;\n}\n.modal__close--floating {\n  position: absolute;\n  top: 1rem;\n  right: 1rem;\n  background-color: var(--bg-primary);\n  border: 2px solid var(--border-color);\n  box-shadow: 2px 2px 0px var(--shadow-color);\n  z-index: 10;\n}\n.modal__close--floating:hover {\n  background-color: var(--bg-secondary);\n  box-shadow: 1px 1px 0px var(--shadow-color);\n  transform: translate(1px, 1px);\n}\n.modal__body {\n  padding: 2rem;\n  overflow-y: auto;\n  flex: 1;\n  color: var(--text-primary);\n  font-family: "Space Grotesk", sans-serif;\n  font-size: 0.9375rem;\n  line-height: 1.6;\n}\n.modal__body .login-form,\n.modal__body .register-form,\n.modal__body .forgot-password-form {\n  border: none;\n  box-shadow: none;\n  padding: 0;\n  max-width: 100%;\n}\n.modal__footer {\n  padding: 2rem;\n  border-top: 3px solid var(--border-color);\n  background-color: var(--bg-secondary);\n  display: flex;\n  flex-direction: row;\n  gap: 1rem;\n  justify-content: flex-end;\n}\n.modal__footer:empty {\n  display: none;\n}\n@media (max-width: 767px) {\n  .modal__overlay {\n    padding: 1rem;\n  }\n  .modal__content {\n    max-height: 95vh;\n  }\n  .modal__header {\n    padding: 1rem;\n  }\n  .modal__body {\n    padding: 2rem;\n    font-size: 0.875rem;\n  }\n  .modal__footer {\n    padding: 1rem;\n    flex-direction: column;\n  }\n}\n/*# sourceMappingURL=modal.css.map */\n'] }]
  }], () => [], { isOpen: [{ type: Input, args: [{ isSignal: true, alias: "isOpen", required: false }] }], title: [{ type: Input, args: [{ isSignal: true, alias: "title", required: false }] }], onClose: [{ type: Output, args: ["onClose"] }], onEscapeKey: [{
    type: HostListener,
    args: ["document:keydown.escape"]
  }], onKeydown: [{
    type: HostListener,
    args: ["keydown", ["$event"]]
  }] });
})();
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(Modal, { className: "Modal", filePath: "src/app/components/shared/modal/modal.ts", lineNumber: 10 });
})();

export {
  FormInput,
  LoginForm,
  RegisterForm,
  ForgotPasswordForm,
  Modal
};
//# sourceMappingURL=chunk-FAPEGSYD.js.map
