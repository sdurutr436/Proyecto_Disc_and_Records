import {
  FormInput
} from "./chunk-CWMH7DMM.js";
import {
  FormBuilder,
  FormGroupDirective,
  NgControlStatusGroup,
  ReactiveFormsModule,
  Validators,
  ɵNgNoValidate
} from "./chunk-AVQDXX3C.js";
import {
  CommonModule,
  Component,
  NgIf,
  Output,
  output,
  setClassMetadata,
  signal,
  ɵsetClassDebugInfo,
  ɵɵadvance,
  ɵɵattribute,
  ɵɵconditional,
  ɵɵconditionalCreate,
  ɵɵdefineComponent,
  ɵɵdirectiveInject,
  ɵɵelement,
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
  ɵɵtextInterpolate,
  ɵɵtextInterpolate1
} from "./chunk-PFYGRVXA.js";

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

export {
  LoginForm,
  RegisterForm,
  ForgotPasswordForm
};
//# sourceMappingURL=chunk-VN6ZFLCS.js.map
