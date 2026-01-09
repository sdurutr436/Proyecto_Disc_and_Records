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
  Alert
} from "./chunk-ZDDBZNTN.js";
import {
  FormControl,
  FormGroup,
  FormGroupDirective,
  NgControlStatusGroup,
  ReactiveFormsModule,
  Validators,
  ɵNgNoValidate
} from "./chunk-AVQDXX3C.js";
import {
  Button
} from "./chunk-QEXKGZ6Y.js";
import "./chunk-MBYWNRDU.js";
import {
  CommonModule,
  Component,
  computed,
  setClassMetadata,
  signal,
  ɵsetClassDebugInfo,
  ɵɵadvance,
  ɵɵconditional,
  ɵɵconditionalCreate,
  ɵɵdefineComponent,
  ɵɵelement,
  ɵɵelementEnd,
  ɵɵelementStart,
  ɵɵgetCurrentView,
  ɵɵlistener,
  ɵɵnextContext,
  ɵɵproperty,
  ɵɵresetView,
  ɵɵrestoreView,
  ɵɵtext,
  ɵɵtextInterpolate
} from "./chunk-PFYGRVXA.js";

// src/app/pages/settings/account/account.ts
function SettingsAccountComponent_Conditional_1_Template(rf, ctx) {
  if (rf & 1) {
    const _r1 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "app-alert", 19);
    \u0275\u0275listener("dismissed", function SettingsAccountComponent_Conditional_1_Template_app_alert_dismissed_0_listener() {
      \u0275\u0275restoreView(_r1);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.successMessage.set(null));
    });
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275property("message", ctx_r1.successMessage())("dismissible", true);
  }
}
function SettingsAccountComponent_Conditional_2_Template(rf, ctx) {
  if (rf & 1) {
    const _r3 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "app-alert", 20);
    \u0275\u0275listener("dismissed", function SettingsAccountComponent_Conditional_2_Template_app_alert_dismissed_0_listener() {
      \u0275\u0275restoreView(_r3);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.errorMessage.set(null));
    });
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275property("message", ctx_r1.errorMessage())("dismissible", true);
  }
}
function SettingsAccountComponent_Conditional_22_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275element(0, "app-progress-bar", 21);
    \u0275\u0275elementStart(1, "p", 22);
    \u0275\u0275text(2);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275property("value", ctx_r1.passwordStrength())("showLabel", true)("variant", ctx_r1.passwordStrengthVariant());
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(ctx_r1.passwordStrengthLabel());
  }
}
var SettingsAccountComponent = class _SettingsAccountComponent {
  isLoading = signal(false, ...ngDevMode ? [{ debugName: "isLoading" }] : []);
  successMessage = signal(null, ...ngDevMode ? [{ debugName: "successMessage" }] : []);
  errorMessage = signal(null, ...ngDevMode ? [{ debugName: "errorMessage" }] : []);
  showPasswordModal = signal(false, ...ngDevMode ? [{ debugName: "showPasswordModal" }] : []);
  // Formulario de email separado
  emailForm = new FormGroup({
    email: new FormControl("perrete@example.com", {
      nonNullable: true,
      validators: [Validators.required, Validators.email]
    })
  });
  // Formulario de contraseña separado
  passwordForm = new FormGroup({
    currentPassword: new FormControl("", {
      nonNullable: true,
      validators: [Validators.required]
    }),
    newPassword: new FormControl("", {
      nonNullable: true,
      validators: [Validators.required, Validators.minLength(8)]
    }),
    confirmPassword: new FormControl("", {
      nonNullable: true,
      validators: [Validators.required]
    })
  }, { validators: this.passwordMatchValidator });
  /**
   * Validador de coincidencia de contraseñas
   */
  passwordMatchValidator(group) {
    const newPassword = group.get("newPassword")?.value;
    const confirmPassword = group.get("confirmPassword")?.value;
    return newPassword === confirmPassword ? null : { passwordMismatch: true };
  }
  /**
   * Calcula la fortaleza de la contraseña (0-100)
   */
  passwordStrength = computed(() => {
    const password = this.passwordForm.controls.newPassword.value;
    if (!password)
      return 0;
    let strength = 0;
    if (password.length >= 8)
      strength += 25;
    if (/[A-Z]/.test(password))
      strength += 25;
    if (/[a-z]/.test(password))
      strength += 25;
    if (/[0-9]/.test(password))
      strength += 15;
    if (/[^a-zA-Z0-9]/.test(password))
      strength += 10;
    return Math.min(strength, 100);
  }, ...ngDevMode ? [{ debugName: "passwordStrength" }] : []);
  /**
   * Etiqueta de fortaleza
   */
  passwordStrengthLabel = computed(() => {
    const strength = this.passwordStrength();
    if (strength < 25)
      return "Muy d\xE9bil";
    if (strength < 50)
      return "D\xE9bil";
    if (strength < 75)
      return "Aceptable";
    return "Fuerte";
  }, ...ngDevMode ? [{ debugName: "passwordStrengthLabel" }] : []);
  /**
   * Variante de color para el progress bar
   */
  passwordStrengthVariant = computed(() => {
    const strength = this.passwordStrength();
    if (strength < 50)
      return "error";
    if (strength < 75)
      return "warning";
    return "success";
  }, ...ngDevMode ? [{ debugName: "passwordStrengthVariant" }] : []);
  /**
   * Guarda los cambios del email
   */
  onSubmitEmail() {
    if (this.emailForm.invalid) {
      this.errorMessage.set("Por favor, ingresa un email v\xE1lido");
      setTimeout(() => this.errorMessage.set(null), 3e3);
      return;
    }
    this.isLoading.set(true);
    setTimeout(() => {
      this.isLoading.set(false);
      this.successMessage.set("Email actualizado correctamente");
      this.emailForm.markAsPristine();
      setTimeout(() => this.successMessage.set(null), 3e3);
    }, 1e3);
  }
  /**
   * Inicia el cambio de contraseña
   */
  onPasswordChange() {
    if (this.passwordForm.invalid) {
      if (this.passwordForm.hasError("passwordMismatch")) {
        this.errorMessage.set("Las contrase\xF1as no coinciden");
      } else {
        this.errorMessage.set("Por favor, completa todos los campos correctamente");
      }
      setTimeout(() => this.errorMessage.set(null), 3e3);
      return;
    }
    this.showPasswordModal.set(true);
  }
  /**
   * Confirma el cambio de contraseña
   */
  confirmPasswordChange() {
    this.showPasswordModal.set(false);
    this.isLoading.set(true);
    setTimeout(() => {
      this.isLoading.set(false);
      this.successMessage.set("Contrase\xF1a actualizada correctamente");
      this.passwordForm.reset();
      setTimeout(() => this.successMessage.set(null), 3e3);
    }, 1e3);
  }
  static \u0275fac = function SettingsAccountComponent_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _SettingsAccountComponent)();
  };
  static \u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _SettingsAccountComponent, selectors: [["app-settings-account"]], decls: 35, vars: 16, consts: [[1, "settings-account"], ["type", "success", 3, "message", "dismissible"], ["type", "error", 3, "message", "dismissible"], [1, "settings-account__header"], [1, "settings-account__title"], [1, "settings-account__subtitle"], [1, "settings-account__section"], [1, "settings-account__section-title"], [1, "settings-account__form", 3, "formGroup"], ["label", "Email", "type", "email", "placeholder", "tu@email.com", "hint", "Recibir\xE1s notificaciones importantes en este correo.", 3, "control", "required"], [1, "settings-account__actions"], ["variant", "primary", "type", "button", 3, "click", "disabled"], ["label", "Contrase\xF1a Actual", "type", "password", "placeholder", "Ingresa tu contrase\xF1a actual", 3, "control", "required"], ["label", "Nueva Contrase\xF1a", "type", "password", "placeholder", "Ingresa la nueva contrase\xF1a", 3, "control", "required"], ["label", "Confirmar Nueva Contrase\xF1a", "type", "password", "placeholder", "Confirma la nueva contrase\xF1a", 3, "control", "required"], ["title", "Confirmar cambio de contrase\xF1a", 3, "onClose", "isOpen"], ["modal-footer", "", 1, "settings-account__modal-actions"], ["variant", "ghost", 3, "click"], ["variant", "primary", 3, "click"], ["type", "success", 3, "dismissed", "message", "dismissible"], ["type", "error", 3, "dismissed", "message", "dismissible"], [3, "value", "showLabel", "variant"], [1, "settings-account__strength-label"]], template: function SettingsAccountComponent_Template(rf, ctx) {
    if (rf & 1) {
      \u0275\u0275elementStart(0, "div", 0);
      \u0275\u0275conditionalCreate(1, SettingsAccountComponent_Conditional_1_Template, 1, 2, "app-alert", 1);
      \u0275\u0275conditionalCreate(2, SettingsAccountComponent_Conditional_2_Template, 1, 2, "app-alert", 2);
      \u0275\u0275elementStart(3, "header", 3)(4, "h2", 4);
      \u0275\u0275text(5, "Informaci\xF3n de Cuenta");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(6, "p", 5);
      \u0275\u0275text(7, "Gestiona tu email y contrase\xF1a");
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(8, "section", 6)(9, "h3", 7);
      \u0275\u0275text(10, "Correo Electr\xF3nico");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(11, "form", 8);
      \u0275\u0275element(12, "app-form-input", 9);
      \u0275\u0275elementStart(13, "div", 10)(14, "app-button", 11);
      \u0275\u0275listener("click", function SettingsAccountComponent_Template_app_button_click_14_listener() {
        return ctx.onSubmitEmail();
      });
      \u0275\u0275text(15, " Actualizar Email ");
      \u0275\u0275elementEnd()()()();
      \u0275\u0275elementStart(16, "section", 6)(17, "h3", 7);
      \u0275\u0275text(18, "Cambiar Contrase\xF1a");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(19, "form", 8);
      \u0275\u0275element(20, "app-form-input", 12)(21, "app-form-input", 13);
      \u0275\u0275conditionalCreate(22, SettingsAccountComponent_Conditional_22_Template, 3, 4);
      \u0275\u0275element(23, "app-form-input", 14);
      \u0275\u0275elementStart(24, "div", 10)(25, "app-button", 11);
      \u0275\u0275listener("click", function SettingsAccountComponent_Template_app_button_click_25_listener() {
        return ctx.onPasswordChange();
      });
      \u0275\u0275text(26, " Cambiar Contrase\xF1a ");
      \u0275\u0275elementEnd()()()()();
      \u0275\u0275elementStart(27, "app-modal", 15);
      \u0275\u0275listener("onClose", function SettingsAccountComponent_Template_app_modal_onClose_27_listener() {
        return ctx.showPasswordModal.set(false);
      });
      \u0275\u0275elementStart(28, "p");
      \u0275\u0275text(29, "\xBFEst\xE1s seguro de que deseas cambiar tu contrase\xF1a? Deber\xE1s usarla en tu pr\xF3ximo inicio de sesi\xF3n.");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(30, "div", 16)(31, "app-button", 17);
      \u0275\u0275listener("click", function SettingsAccountComponent_Template_app_button_click_31_listener() {
        return ctx.showPasswordModal.set(false);
      });
      \u0275\u0275text(32, " Cancelar ");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(33, "app-button", 18);
      \u0275\u0275listener("click", function SettingsAccountComponent_Template_app_button_click_33_listener() {
        return ctx.confirmPasswordChange();
      });
      \u0275\u0275text(34, " Confirmar ");
      \u0275\u0275elementEnd()()();
    }
    if (rf & 2) {
      \u0275\u0275advance();
      \u0275\u0275conditional(ctx.successMessage() ? 1 : -1);
      \u0275\u0275advance();
      \u0275\u0275conditional(ctx.errorMessage() ? 2 : -1);
      \u0275\u0275advance(9);
      \u0275\u0275property("formGroup", ctx.emailForm);
      \u0275\u0275advance();
      \u0275\u0275property("control", ctx.emailForm.controls.email)("required", true);
      \u0275\u0275advance(2);
      \u0275\u0275property("disabled", ctx.emailForm.controls.email.invalid || ctx.isLoading());
      \u0275\u0275advance(5);
      \u0275\u0275property("formGroup", ctx.passwordForm);
      \u0275\u0275advance();
      \u0275\u0275property("control", ctx.passwordForm.controls.currentPassword)("required", true);
      \u0275\u0275advance();
      \u0275\u0275property("control", ctx.passwordForm.controls.newPassword)("required", true);
      \u0275\u0275advance();
      \u0275\u0275conditional(ctx.passwordForm.controls.newPassword.value.length > 0 ? 22 : -1);
      \u0275\u0275advance();
      \u0275\u0275property("control", ctx.passwordForm.controls.confirmPassword)("required", true);
      \u0275\u0275advance(2);
      \u0275\u0275property("disabled", ctx.passwordForm.invalid || ctx.isLoading());
      \u0275\u0275advance(2);
      \u0275\u0275property("isOpen", ctx.showPasswordModal());
    }
  }, dependencies: [CommonModule, ReactiveFormsModule, \u0275NgNoValidate, NgControlStatusGroup, FormGroupDirective, Alert, Button, FormInput, Modal, ProgressBar], styles: ['@charset "UTF-8";\n\n\n\n/*# sourceMappingURL=account.css.map */'] });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(SettingsAccountComponent, [{
    type: Component,
    args: [{ selector: "app-settings-account", standalone: true, imports: [CommonModule, ReactiveFormsModule, Alert, Button, FormInput, Modal, ProgressBar], template: '<div class="settings-account">\r\n  <!-- Mensajes de estado con componente Alert -->\r\n  @if (successMessage()) {\r\n    <app-alert\r\n      type="success"\r\n      [message]="successMessage()!"\r\n      [dismissible]="true"\r\n      (dismissed)="successMessage.set(null)"\r\n    />\r\n  }\r\n  @if (errorMessage()) {\r\n    <app-alert\r\n      type="error"\r\n      [message]="errorMessage()!"\r\n      [dismissible]="true"\r\n      (dismissed)="errorMessage.set(null)"\r\n    />\r\n  }\r\n\r\n  <header class="settings-account__header">\r\n    <h2 class="settings-account__title">Informaci\xF3n de Cuenta</h2>\r\n    <p class="settings-account__subtitle">Gestiona tu email y contrase\xF1a</p>\r\n  </header>\r\n\r\n  <!-- Email -->\r\n  <section class="settings-account__section">\r\n    <h3 class="settings-account__section-title">Correo Electr\xF3nico</h3>\r\n    <form [formGroup]="emailForm" class="settings-account__form">\r\n      <app-form-input\r\n        [control]="emailForm.controls.email"\r\n        label="Email"\r\n        type="email"\r\n        placeholder="tu@email.com"\r\n        [required]="true"\r\n        hint="Recibir\xE1s notificaciones importantes en este correo."\r\n      />\r\n\r\n      <div class="settings-account__actions">\r\n        <app-button\r\n          variant="primary"\r\n          type="button"\r\n          [disabled]="emailForm.controls.email.invalid || isLoading()"\r\n          (click)="onSubmitEmail()"\r\n        >\r\n          Actualizar Email\r\n        </app-button>\r\n      </div>\r\n    </form>\r\n  </section>\r\n\r\n  <!-- Cambio de contrase\xF1a -->\r\n  <section class="settings-account__section">\r\n    <h3 class="settings-account__section-title">Cambiar Contrase\xF1a</h3>\r\n    <form [formGroup]="passwordForm" class="settings-account__form">\r\n      <app-form-input\r\n        [control]="passwordForm.controls.currentPassword"\r\n        label="Contrase\xF1a Actual"\r\n        type="password"\r\n        placeholder="Ingresa tu contrase\xF1a actual"\r\n        [required]="true"\r\n      />\r\n\r\n      <app-form-input\r\n        [control]="passwordForm.controls.newPassword"\r\n        label="Nueva Contrase\xF1a"\r\n        type="password"\r\n        placeholder="Ingresa la nueva contrase\xF1a"\r\n        [required]="true"\r\n      />\r\n\r\n      <!-- Indicador de fortaleza con ProgressBar -->\r\n      @if (passwordForm.controls.newPassword.value.length > 0) {\r\n        <app-progress-bar\r\n          [value]="passwordStrength()"\r\n          [showLabel]="true"\r\n          [variant]="passwordStrengthVariant()"\r\n        />\r\n        <p class="settings-account__strength-label">{{ passwordStrengthLabel() }}</p>\r\n      }\r\n\r\n      <app-form-input\r\n        [control]="passwordForm.controls.confirmPassword"\r\n        label="Confirmar Nueva Contrase\xF1a"\r\n        type="password"\r\n        placeholder="Confirma la nueva contrase\xF1a"\r\n        [required]="true"\r\n      />\r\n\r\n      <div class="settings-account__actions">\r\n        <app-button\r\n          variant="primary"\r\n          type="button"\r\n          [disabled]="passwordForm.invalid || isLoading()"\r\n          (click)="onPasswordChange()"\r\n        >\r\n          Cambiar Contrase\xF1a\r\n        </app-button>\r\n      </div>\r\n    </form>\r\n  </section>\r\n</div>\r\n\r\n<!-- Modal de confirmaci\xF3n usando componente Modal -->\r\n<app-modal\r\n  [isOpen]="showPasswordModal()"\r\n  title="Confirmar cambio de contrase\xF1a"\r\n  (onClose)="showPasswordModal.set(false)"\r\n>\r\n  <p>\xBFEst\xE1s seguro de que deseas cambiar tu contrase\xF1a? Deber\xE1s usarla en tu pr\xF3ximo inicio de sesi\xF3n.</p>\r\n\r\n  <div modal-footer class="settings-account__modal-actions">\r\n    <app-button variant="ghost" (click)="showPasswordModal.set(false)">\r\n      Cancelar\r\n    </app-button>\r\n    <app-button variant="primary" (click)="confirmPasswordChange()">\r\n      Confirmar\r\n    </app-button>\r\n  </div>\r\n</app-modal>\r\n', styles: ['@charset "UTF-8";\n\n/* src/app/pages/settings/account/account.scss */\n/*# sourceMappingURL=account.css.map */\n'] }]
  }], null, null);
})();
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(SettingsAccountComponent, { className: "SettingsAccountComponent", filePath: "src/app/pages/settings/account/account.ts", lineNumber: 17 });
})();
export {
  SettingsAccountComponent as default
};
//# sourceMappingURL=chunk-Q6YBFPMG.js.map
