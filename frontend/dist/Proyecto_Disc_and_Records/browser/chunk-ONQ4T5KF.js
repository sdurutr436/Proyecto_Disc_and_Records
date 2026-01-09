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
  FormControlName,
  FormGroup,
  FormGroupDirective,
  NgControlStatus,
  NgControlStatusGroup,
  ReactiveFormsModule,
  ɵNgNoValidate
} from "./chunk-AVQDXX3C.js";
import {
  Button
} from "./chunk-QEXKGZ6Y.js";
import "./chunk-MBYWNRDU.js";
import {
  CommonModule,
  Component,
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
  ɵɵtext
} from "./chunk-PFYGRVXA.js";

// src/app/pages/settings/preferences/preferences.ts
function SettingsPreferencesComponent_Conditional_1_Template(rf, ctx) {
  if (rf & 1) {
    const _r1 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "app-alert", 14);
    \u0275\u0275listener("dismissed", function SettingsPreferencesComponent_Conditional_1_Template_app_alert_dismissed_0_listener() {
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
var SettingsPreferencesComponent = class _SettingsPreferencesComponent {
  successMessage = signal(null, ...ngDevMode ? [{ debugName: "successMessage" }] : []);
  // Opciones para radio group de visibilidad
  visibilityOptions = [
    { value: "public", label: "P\xFAblico - Cualquier usuario puede ver tu perfil" },
    { value: "friends", label: "Solo Amigos - Solo tus amigos pueden verte" },
    { value: "private", label: "Privado - Nadie puede ver tu perfil" }
  ];
  // Opciones para select de idioma
  languageOptions = [
    { value: "es", label: "Espa\xF1ol" },
    { value: "en", label: "English" }
  ];
  // Formulario reactivo
  preferencesForm = new FormGroup({
    emailNotifications: new FormControl(true, { nonNullable: true }),
    reviewNotifications: new FormControl(true, { nonNullable: true }),
    profileVisibility: new FormControl("public", { nonNullable: true }),
    language: new FormControl("es", { nonNullable: true })
  });
  /**
   * Guarda las preferencias
   */
  onSubmit() {
    if (this.preferencesForm.valid) {
      console.log("Preferencias guardadas:", this.preferencesForm.value);
      this.successMessage.set("Preferencias guardadas correctamente");
      this.preferencesForm.markAsPristine();
      setTimeout(() => this.successMessage.set(null), 3e3);
    }
  }
  static \u0275fac = function SettingsPreferencesComponent_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _SettingsPreferencesComponent)();
  };
  static \u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _SettingsPreferencesComponent, selectors: [["app-settings-preferences"]], decls: 24, vars: 5, consts: [[1, "settings-preferences"], ["type", "success", 3, "message", "dismissible"], [1, "settings-preferences__header"], [1, "settings-preferences__title"], [1, "settings-preferences__subtitle"], [1, "settings-preferences__form", 3, "formGroup"], [1, "settings-preferences__section"], [1, "settings-preferences__section-title"], ["formControlName", "emailNotifications", "label", "Notificaciones por Email - Recibe actualizaciones sobre tu actividad", "id", "emailNotifications"], ["formControlName", "reviewNotifications", "label", "Notificaciones de Rese\xF1as - Recibe alertas cuando comenten tus rese\xF1as", "id", "reviewNotifications"], ["formControlName", "profileVisibility", "label", "Visibilidad del Perfil", "name", "profileVisibility", 3, "options"], ["formControlName", "language", "label", "Idioma de la interfaz", 3, "options"], [1, "settings-preferences__actions"], ["variant", "primary", "type", "button", 3, "click", "disabled"], ["type", "success", 3, "dismissed", "message", "dismissible"]], template: function SettingsPreferencesComponent_Template(rf, ctx) {
    if (rf & 1) {
      \u0275\u0275elementStart(0, "div", 0);
      \u0275\u0275conditionalCreate(1, SettingsPreferencesComponent_Conditional_1_Template, 1, 2, "app-alert", 1);
      \u0275\u0275elementStart(2, "header", 2)(3, "h2", 3);
      \u0275\u0275text(4, "Preferencias");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(5, "p", 4);
      \u0275\u0275text(6, "Personaliza tu experiencia en la plataforma");
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(7, "form", 5)(8, "section", 6)(9, "h3", 7);
      \u0275\u0275text(10, "Notificaciones");
      \u0275\u0275elementEnd();
      \u0275\u0275element(11, "app-form-checkbox", 8)(12, "app-form-checkbox", 9);
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(13, "section", 6)(14, "h3", 7);
      \u0275\u0275text(15, "Privacidad del Perfil");
      \u0275\u0275elementEnd();
      \u0275\u0275element(16, "app-form-radio-group", 10);
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(17, "section", 6)(18, "h3", 7);
      \u0275\u0275text(19, "Idioma");
      \u0275\u0275elementEnd();
      \u0275\u0275element(20, "app-form-select", 11);
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(21, "div", 12)(22, "app-button", 13);
      \u0275\u0275listener("click", function SettingsPreferencesComponent_Template_app_button_click_22_listener() {
        return ctx.onSubmit();
      });
      \u0275\u0275text(23, " Guardar Preferencias ");
      \u0275\u0275elementEnd()()()();
    }
    if (rf & 2) {
      \u0275\u0275advance();
      \u0275\u0275conditional(ctx.successMessage() ? 1 : -1);
      \u0275\u0275advance(6);
      \u0275\u0275property("formGroup", ctx.preferencesForm);
      \u0275\u0275advance(9);
      \u0275\u0275property("options", ctx.visibilityOptions);
      \u0275\u0275advance(4);
      \u0275\u0275property("options", ctx.languageOptions);
      \u0275\u0275advance(2);
      \u0275\u0275property("disabled", ctx.preferencesForm.pristine);
    }
  }, dependencies: [
    CommonModule,
    ReactiveFormsModule,
    \u0275NgNoValidate,
    NgControlStatus,
    NgControlStatusGroup,
    FormGroupDirective,
    FormControlName,
    Alert,
    Button,
    FormCheckbox,
    FormRadioGroup,
    FormSelect
  ], styles: ['@charset "UTF-8";\n\n\n\n/*# sourceMappingURL=preferences.css.map */'] });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(SettingsPreferencesComponent, [{
    type: Component,
    args: [{ selector: "app-settings-preferences", standalone: true, imports: [
      CommonModule,
      ReactiveFormsModule,
      Alert,
      Button,
      FormCheckbox,
      FormRadioGroup,
      FormSelect
    ], template: '<div class="settings-preferences">\r\n  <!-- Mensajes de estado con componente Alert -->\r\n  @if (successMessage()) {\r\n    <app-alert\r\n      type="success"\r\n      [message]="successMessage()!"\r\n      [dismissible]="true"\r\n      (dismissed)="successMessage.set(null)"\r\n    />\r\n  }\r\n\r\n  <header class="settings-preferences__header">\r\n    <h2 class="settings-preferences__title">Preferencias</h2>\r\n    <p class="settings-preferences__subtitle">Personaliza tu experiencia en la plataforma</p>\r\n  </header>\r\n\r\n  <!-- Formulario con reactive forms -->\r\n  <form [formGroup]="preferencesForm" class="settings-preferences__form">\r\n    <!-- Notificaciones -->\r\n    <section class="settings-preferences__section">\r\n      <h3 class="settings-preferences__section-title">Notificaciones</h3>\r\n\r\n      <app-form-checkbox\r\n        formControlName="emailNotifications"\r\n        label="Notificaciones por Email - Recibe actualizaciones sobre tu actividad"\r\n        id="emailNotifications"\r\n      />\r\n\r\n      <app-form-checkbox\r\n        formControlName="reviewNotifications"\r\n        label="Notificaciones de Rese\xF1as - Recibe alertas cuando comenten tus rese\xF1as"\r\n        id="reviewNotifications"\r\n      />\r\n    </section>\r\n\r\n    <!-- Privacidad -->\r\n    <section class="settings-preferences__section">\r\n      <h3 class="settings-preferences__section-title">Privacidad del Perfil</h3>\r\n\r\n      <app-form-radio-group\r\n        formControlName="profileVisibility"\r\n        label="Visibilidad del Perfil"\r\n        name="profileVisibility"\r\n        [options]="visibilityOptions"\r\n      />\r\n    </section>\r\n\r\n    <!-- Idioma -->\r\n    <section class="settings-preferences__section">\r\n      <h3 class="settings-preferences__section-title">Idioma</h3>\r\n\r\n      <app-form-select\r\n        formControlName="language"\r\n        label="Idioma de la interfaz"\r\n        [options]="languageOptions"\r\n      />\r\n    </section>\r\n\r\n    <!-- Acciones -->\r\n    <div class="settings-preferences__actions">\r\n      <app-button\r\n        variant="primary"\r\n        type="button"\r\n        [disabled]="preferencesForm.pristine"\r\n        (click)="onSubmit()"\r\n      >\r\n        Guardar Preferencias\r\n      </app-button>\r\n    </div>\r\n  </form>\r\n</div>\r\n', styles: ['@charset "UTF-8";\n\n/* src/app/pages/settings/preferences/preferences.scss */\n/*# sourceMappingURL=preferences.css.map */\n'] }]
  }], null, null);
})();
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(SettingsPreferencesComponent, { className: "SettingsPreferencesComponent", filePath: "src/app/pages/settings/preferences/preferences.ts", lineNumber: 25 });
})();
export {
  SettingsPreferencesComponent as default
};
//# sourceMappingURL=chunk-ONQ4T5KF.js.map
