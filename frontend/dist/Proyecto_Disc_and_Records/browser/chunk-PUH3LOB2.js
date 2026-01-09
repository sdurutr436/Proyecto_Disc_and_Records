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
  ɵɵsanitizeUrl,
  ɵɵtext
} from "./chunk-PFYGRVXA.js";

// src/app/pages/settings/profile/profile.ts
function SettingsProfileComponent_Conditional_1_Template(rf, ctx) {
  if (rf & 1) {
    const _r1 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "app-alert", 20);
    \u0275\u0275listener("dismissed", function SettingsProfileComponent_Conditional_1_Template_app_alert_dismissed_0_listener() {
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
function SettingsProfileComponent_Conditional_2_Template(rf, ctx) {
  if (rf & 1) {
    const _r3 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "app-alert", 21);
    \u0275\u0275listener("dismissed", function SettingsProfileComponent_Conditional_2_Template_app_alert_dismissed_0_listener() {
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
var SettingsProfileComponent = class _SettingsProfileComponent {
  isLoading = signal(false, ...ngDevMode ? [{ debugName: "isLoading" }] : []);
  successMessage = signal(null, ...ngDevMode ? [{ debugName: "successMessage" }] : []);
  errorMessage = signal(null, ...ngDevMode ? [{ debugName: "errorMessage" }] : []);
  // Foto de perfil actual (mock)
  currentAvatar = signal("assets/profile-placeholder.jpg", ...ngDevMode ? [{ debugName: "currentAvatar" }] : []);
  // Formulario de perfil
  profileForm = new FormGroup({
    username: new FormControl("PerreteGordete", {
      nonNullable: true,
      validators: [
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(20),
        Validators.pattern(/^[a-zA-Z0-9_]+$/)
      ]
    })
  });
  /**
   * Maneja el cambio de foto de perfil
   */
  onAvatarChange(event) {
    const input = event.target;
    if (input.files && input.files[0]) {
      const file = input.files[0];
      if (file.size > 2 * 1024 * 1024) {
        this.errorMessage.set("La imagen no puede superar los 2MB");
        setTimeout(() => this.errorMessage.set(null), 3e3);
        return;
      }
      if (!file.type.match(/image\/(jpeg|jpg|png|gif)/)) {
        this.errorMessage.set("Solo se permiten im\xE1genes JPG, PNG o GIF");
        setTimeout(() => this.errorMessage.set(null), 3e3);
        return;
      }
      const reader = new FileReader();
      reader.onload = (e) => {
        if (e.target?.result) {
          this.currentAvatar.set(e.target.result);
          this.successMessage.set("Foto de perfil actualizada (temporal)");
          setTimeout(() => this.successMessage.set(null), 3e3);
        }
      };
      reader.readAsDataURL(file);
    }
  }
  /**
   * Guarda los cambios del perfil
   */
  onSubmit() {
    if (this.profileForm.invalid) {
      this.errorMessage.set("Por favor, corrige los errores del formulario");
      setTimeout(() => this.errorMessage.set(null), 3e3);
      return;
    }
    this.isLoading.set(true);
    setTimeout(() => {
      this.isLoading.set(false);
      this.successMessage.set("Perfil actualizado correctamente");
      setTimeout(() => this.successMessage.set(null), 3e3);
      console.log("Perfil guardado:", {
        username: this.profileForm.value.username,
        avatar: this.currentAvatar()
      });
    }, 1e3);
  }
  static \u0275fac = function SettingsProfileComponent_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _SettingsProfileComponent)();
  };
  static \u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _SettingsProfileComponent, selectors: [["app-settings-profile"]], decls: 29, vars: 8, consts: [[1, "settings-profile"], ["type", "success", 3, "message", "dismissible"], ["type", "error", 3, "message", "dismissible"], [1, "settings-profile__header"], [1, "settings-profile__title"], [1, "settings-profile__subtitle"], [1, "settings-profile__section"], [1, "settings-profile__section-title"], [1, "settings-profile__avatar"], [1, "settings-profile__avatar-preview"], ["alt", "Avatar actual", 1, "settings-profile__avatar-image", 3, "src"], [1, "settings-profile__avatar-info"], ["for", "avatar-upload", 1, "settings-profile__avatar-label"], ["variant", "secondary", "type", "button", 3, "disabled"], ["id", "avatar-upload", "type", "file", "accept", "image/*", 1, "settings-profile__avatar-input", 3, "change"], [1, "settings-profile__hint"], [1, "settings-profile__form", 3, "formGroup"], ["label", "Usuario", "type", "text", "placeholder", "Ingresa tu nombre de usuario", "hint", "Solo letras, n\xFAmeros y guiones bajos. M\xEDnimo 3 caracteres.", 3, "control", "required"], [1, "settings-profile__actions"], ["variant", "primary", "type", "button", 3, "click", "disabled"], ["type", "success", 3, "dismissed", "message", "dismissible"], ["type", "error", 3, "dismissed", "message", "dismissible"]], template: function SettingsProfileComponent_Template(rf, ctx) {
    if (rf & 1) {
      \u0275\u0275elementStart(0, "div", 0);
      \u0275\u0275conditionalCreate(1, SettingsProfileComponent_Conditional_1_Template, 1, 2, "app-alert", 1);
      \u0275\u0275conditionalCreate(2, SettingsProfileComponent_Conditional_2_Template, 1, 2, "app-alert", 2);
      \u0275\u0275elementStart(3, "header", 3)(4, "h2", 4);
      \u0275\u0275text(5, "Informaci\xF3n del Perfil");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(6, "p", 5);
      \u0275\u0275text(7, "Personaliza c\xF3mo te ven los dem\xE1s usuarios");
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(8, "section", 6)(9, "h3", 7);
      \u0275\u0275text(10, "Foto de Perfil");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(11, "div", 8)(12, "div", 9);
      \u0275\u0275element(13, "img", 10);
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(14, "div", 11)(15, "label", 12)(16, "app-button", 13);
      \u0275\u0275text(17, " Cambiar Foto ");
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(18, "input", 14);
      \u0275\u0275listener("change", function SettingsProfileComponent_Template_input_change_18_listener($event) {
        return ctx.onAvatarChange($event);
      });
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(19, "p", 15);
      \u0275\u0275text(20, "JPG, PNG o GIF. M\xE1ximo 2MB.");
      \u0275\u0275elementEnd()()()();
      \u0275\u0275elementStart(21, "section", 6)(22, "h3", 7);
      \u0275\u0275text(23, "Nombre de Usuario");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(24, "form", 16);
      \u0275\u0275element(25, "app-form-input", 17);
      \u0275\u0275elementStart(26, "div", 18)(27, "app-button", 19);
      \u0275\u0275listener("click", function SettingsProfileComponent_Template_app_button_click_27_listener() {
        return ctx.onSubmit();
      });
      \u0275\u0275text(28, " Guardar Cambios ");
      \u0275\u0275elementEnd()()()()();
    }
    if (rf & 2) {
      \u0275\u0275advance();
      \u0275\u0275conditional(ctx.successMessage() ? 1 : -1);
      \u0275\u0275advance();
      \u0275\u0275conditional(ctx.errorMessage() ? 2 : -1);
      \u0275\u0275advance(11);
      \u0275\u0275property("src", ctx.currentAvatar(), \u0275\u0275sanitizeUrl);
      \u0275\u0275advance(3);
      \u0275\u0275property("disabled", ctx.isLoading());
      \u0275\u0275advance(8);
      \u0275\u0275property("formGroup", ctx.profileForm);
      \u0275\u0275advance();
      \u0275\u0275property("control", ctx.profileForm.controls.username)("required", true);
      \u0275\u0275advance(2);
      \u0275\u0275property("disabled", ctx.profileForm.controls.username.invalid || ctx.isLoading());
    }
  }, dependencies: [CommonModule, ReactiveFormsModule, \u0275NgNoValidate, NgControlStatusGroup, FormGroupDirective, Alert, Button, FormInput], styles: ['@charset "UTF-8";\n\n\n\n.settings[_ngcontent-%COMP%] {\n  min-height: 100vh;\n  padding: 3rem 0;\n}\n.settings__container[_ngcontent-%COMP%] {\n  max-width: 1440px;\n  margin: 0 auto;\n  padding: 0 2rem;\n}\n@media (max-width: 320px) {\n  .settings__container[_ngcontent-%COMP%] {\n    padding: 0 1rem;\n  }\n}\n.settings__layout[_ngcontent-%COMP%] {\n  display: grid;\n  grid-template-columns: 280px 1fr;\n  gap: 4rem;\n  margin-top: 3rem;\n}\n@media (max-width: 768px) {\n  .settings__layout[_ngcontent-%COMP%] {\n    grid-template-columns: 1fr;\n    gap: 2rem;\n  }\n}\n.settings__sidebar[_ngcontent-%COMP%] {\n  position: sticky;\n  top: 8rem;\n  height: fit-content;\n  padding: 3rem;\n  padding-left: 0;\n  padding-top: 0;\n  background-color: var(--bg-primary);\n  border-right: 4px solid var(--border-color);\n  border-bottom: 4px solid var(--border-color);\n  box-shadow: none;\n}\n@media (max-width: 768px) {\n  .settings__sidebar[_ngcontent-%COMP%] {\n    position: static;\n    padding: 2rem;\n    border: 4px solid var(--border-color);\n    box-shadow: 6px 6px 0px #01131B;\n  }\n}\n.settings__title[_ngcontent-%COMP%] {\n  font-size: 2.625rem;\n  line-height: 3rem;\n  font-weight: 900;\n  color: var(--text-dark);\n  margin: 0 0 3rem 0;\n  text-transform: uppercase;\n  letter-spacing: -0.02em;\n}\n@media (max-width: 320px) {\n  .settings__title[_ngcontent-%COMP%] {\n    font-size: 1.625rem;\n    line-height: 3rem;\n  }\n}\n.settings__nav[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  gap: 0.5rem;\n}\n.settings__nav-item[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  padding: 1rem 2rem;\n  background-color: var(--bg-primary);\n  border: 2px solid var(--border-color);\n  cursor: pointer;\n  transition: all 150ms ease-in-out;\n  font-weight: 600;\n  text-decoration: none;\n  color: var(--text-dark);\n  font-size: 0.9375rem;\n  line-height: 1.5rem;\n}\n.settings__nav-item[_ngcontent-%COMP%]:hover {\n  background-color: var(--bg-secondary);\n  transform: translateX(4px);\n  box-shadow: 4px 4px 0px #01131B;\n}\n.settings__nav-item--active[_ngcontent-%COMP%] {\n  background-color: var(--color-primary);\n  color: var(--bg-primary);\n  border-color: var(--text-dark);\n  transform: translateX(4px);\n  box-shadow: 4px 4px 0px #01131B;\n}\n.settings__sidebar-footer[_ngcontent-%COMP%] {\n  margin-top: 3rem;\n  padding-top: 2rem;\n  border-top: 2px solid var(--border-color);\n}\n.settings__back-link[_ngcontent-%COMP%] {\n  display: inline-flex;\n  align-items: center;\n  gap: 0.5rem;\n  color: var(--text-secondary);\n  text-decoration: none;\n  font-weight: 600;\n  font-size: 0.9375rem;\n  line-height: 1.5rem;\n  transition: all 150ms ease-in-out;\n}\n.settings__back-link[_ngcontent-%COMP%]:hover {\n  color: var(--color-primary);\n  transform: translateX(-4px);\n}\n.settings__content[_ngcontent-%COMP%] {\n  animation: _ngcontent-%COMP%_fadeIn 300ms ease-in-out ease;\n}\n@keyframes _ngcontent-%COMP%_fadeIn {\n  from {\n    opacity: 0;\n    transform: translateY(-10px);\n  }\n  to {\n    opacity: 1;\n    transform: translateY(0);\n  }\n}\n.settings__tab[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  gap: 3rem;\n}\n.settings__tab-header[_ngcontent-%COMP%] {\n  padding-bottom: 2rem;\n  border-bottom: 2px solid var(--border-color);\n}\n.settings__tab-title[_ngcontent-%COMP%] {\n  font-size: 2.625rem;\n  line-height: 3rem;\n  font-weight: 900;\n  color: var(--text-dark);\n  margin: 0 0 0.5rem 0;\n}\n.settings__tab-description[_ngcontent-%COMP%] {\n  color: var(--text-secondary);\n  margin: 0;\n}\n.settings__message[_ngcontent-%COMP%] {\n  padding: 2rem;\n  margin-bottom: 2rem;\n  border: 4px solid var(--border-color);\n  font-weight: 600;\n  animation: _ngcontent-%COMP%_slideDown 300ms ease-in-out ease;\n}\n.settings__message--success[_ngcontent-%COMP%] {\n  background-color: color-mix(in srgb, var(--color-success) 10%, transparent);\n  border-color: var(--color-success);\n  color: var(--color-success);\n}\n.settings__message--error[_ngcontent-%COMP%] {\n  background-color: color-mix(in srgb, var(--color-error) 10%, transparent);\n  border-color: var(--color-error);\n  color: var(--color-error);\n}\n@keyframes _ngcontent-%COMP%_slideDown {\n  from {\n    opacity: 0;\n    transform: translateY(-10px);\n  }\n  to {\n    opacity: 1;\n    transform: translateY(0);\n  }\n}\n.settings__divider[_ngcontent-%COMP%] {\n  height: 2px;\n  background-color: var(--border-color);\n  border: none;\n  margin: 3rem 0;\n}\n.settings__divider--small[_ngcontent-%COMP%] {\n  margin: 2rem 0;\n}\n.settings__section[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n}\n.settings__avatar-section[_ngcontent-%COMP%] {\n  display: flex;\n  gap: 2rem;\n  align-items: center;\n}\n@media (max-width: 768px) {\n  .settings__avatar-section[_ngcontent-%COMP%] {\n    flex-direction: column;\n    text-align: center;\n  }\n}\n.settings__avatar-preview[_ngcontent-%COMP%] {\n  flex-shrink: 0;\n}\n.settings__avatar-image[_ngcontent-%COMP%] {\n  width: 15rem;\n  height: 15rem;\n  object-fit: cover;\n  border: 4px solid var(--border-color);\n  box-shadow: 6px 6px 0px #01131B;\n  background-color: var(--bg-secondary);\n}\n@media (max-width: 768px) {\n  .settings__avatar-image[_ngcontent-%COMP%] {\n    width: 12rem;\n    height: 12rem;\n  }\n}\n.settings__avatar-actions[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  gap: 1rem;\n}\n.settings__avatar-info[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  gap: 1rem;\n}\n.settings__avatar-label[_ngcontent-%COMP%] {\n  cursor: pointer;\n}\n.settings__avatar-input[_ngcontent-%COMP%] {\n  display: none;\n}\n.settings__avatar-hint[_ngcontent-%COMP%] {\n  font-size: 0.9375rem;\n  line-height: 1.5rem;\n  color: var(--text-muted);\n  margin: 0;\n}\n.settings__form[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  gap: 2rem;\n  width: 100%;\n}\n.settings__form-actions[_ngcontent-%COMP%] {\n  display: flex;\n  gap: 1rem;\n  justify-content: flex-start;\n  margin-top: 1rem;\n}\n@media (max-width: 320px) {\n  .settings__form-actions[_ngcontent-%COMP%] {\n    flex-direction: column;\n  }\n  .settings__form-actions[_ngcontent-%COMP%]   app-button[_ngcontent-%COMP%] {\n    width: 100%;\n  }\n}\n.settings__field-hint[_ngcontent-%COMP%] {\n  font-size: 0.875rem;\n  line-height: 1.5rem;\n  color: var(--text-muted);\n  margin: 0.5rem 0;\n}\n.settings__password-requirements[_ngcontent-%COMP%] {\n  padding: 2rem;\n  background-color: var(--bg-secondary);\n  border: 2px solid var(--border-color);\n  border-radius: 0;\n}\n.settings__requirements-title[_ngcontent-%COMP%] {\n  font-size: 0.9375rem;\n  line-height: 1.5rem;\n  font-weight: 600;\n  color: var(--text-dark);\n  margin: 0 0 1rem 0;\n}\n.settings__requirements-list[_ngcontent-%COMP%] {\n  list-style: none;\n  padding: 0;\n  margin: 0;\n  display: flex;\n  flex-direction: column;\n  gap: 0.5rem;\n}\n.settings__requirements-list[_ngcontent-%COMP%]   li[_ngcontent-%COMP%] {\n  font-size: 0.9375rem;\n  line-height: 1.5rem;\n  color: var(--text-muted);\n  display: flex;\n  align-items: center;\n  gap: 0.5rem;\n  transition: color 0.2s ease;\n}\n.settings__requirements-list[_ngcontent-%COMP%]   li.settings__requirement--met[_ngcontent-%COMP%] {\n  color: var(--color-success);\n  font-weight: 600;\n}\n.settings__requirement-icon[_ngcontent-%COMP%] {\n  font-weight: bold;\n  width: 1.25rem;\n  text-align: center;\n}\n.settings__preferences[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  gap: 2rem;\n}\n.settings__preference-item[_ngcontent-%COMP%] {\n  display: flex;\n  justify-content: space-between;\n  align-items: flex-start;\n  gap: 2rem;\n  padding-bottom: 2rem;\n  border-bottom: 2px solid var(--border-color);\n}\n.settings__preference-item[_ngcontent-%COMP%]:last-child {\n  border-bottom: none;\n  padding-bottom: 0;\n}\n.settings__preference-item--full[_ngcontent-%COMP%] {\n  flex-direction: column;\n  align-items: stretch;\n}\n.settings__preference-info[_ngcontent-%COMP%] {\n  flex: 1;\n}\n.settings__preference-title[_ngcontent-%COMP%] {\n  font-weight: 600;\n  color: var(--text-dark);\n  margin: 0 0 0.5rem 0;\n}\n.settings__preference-desc[_ngcontent-%COMP%] {\n  font-size: 0.9375rem;\n  line-height: 1.5rem;\n  color: var(--text-secondary);\n  margin: 0;\n}\n.settings__toggle[_ngcontent-%COMP%] {\n  position: relative;\n  display: inline-block;\n  width: 6rem;\n  height: 2.5rem;\n  flex-shrink: 0;\n}\n.settings__toggle[_ngcontent-%COMP%]   input[_ngcontent-%COMP%] {\n  opacity: 0;\n  width: 0;\n  height: 0;\n}\n.settings__toggle[_ngcontent-%COMP%]   input[_ngcontent-%COMP%]:checked    + .settings__toggle-slider[_ngcontent-%COMP%] {\n  background-color: var(--color-primary);\n}\n.settings__toggle[_ngcontent-%COMP%]   input[_ngcontent-%COMP%]:checked    + .settings__toggle-slider[_ngcontent-%COMP%]::before {\n  transform: translateX(2.5rem);\n}\n.settings__toggle[_ngcontent-%COMP%]   input[_ngcontent-%COMP%]:focus    + .settings__toggle-slider[_ngcontent-%COMP%] {\n  box-shadow: 0 0 0 3px color-mix(in srgb, var(--color-primary) 20%, transparent);\n}\n.settings__toggle-slider[_ngcontent-%COMP%] {\n  position: absolute;\n  cursor: pointer;\n  top: 0;\n  left: 0;\n  right: 0;\n  bottom: 0;\n  background-color: var(--text-muted);\n  transition: 300ms ease-in-out;\n  border: 2px solid var(--border-color);\n}\n.settings__toggle-slider[_ngcontent-%COMP%]::before {\n  position: absolute;\n  content: "";\n  height: 2rem;\n  width: 2rem;\n  left: 0.5rem;\n  bottom: 0.5rem;\n  background-color: var(--bg-primary);\n  transition: 300ms ease-in-out;\n  border: 2px solid var(--text-dark);\n}\n.settings__radio-group[_ngcontent-%COMP%] {\n  display: flex;\n  gap: 1rem;\n  flex-wrap: wrap;\n}\n.settings__radio[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 0.5rem;\n  cursor: pointer;\n  padding: 1rem 2rem;\n  border: 2px solid var(--border-color);\n  background-color: var(--bg-primary);\n  transition: all 150ms ease-in-out;\n}\n.settings__radio[_ngcontent-%COMP%]:hover {\n  background-color: var(--bg-secondary);\n  transform: translateY(-2px);\n  box-shadow: 4px 4px 0px #01131B;\n}\n.settings__radio[_ngcontent-%COMP%]   input[type=radio][_ngcontent-%COMP%] {\n  appearance: none;\n  width: 1.25rem;\n  height: 1.25rem;\n  border: 3px solid var(--text-dark);\n  background-color: var(--bg-primary);\n  cursor: pointer;\n  position: relative;\n}\n.settings__radio[_ngcontent-%COMP%]   input[type=radio][_ngcontent-%COMP%]:checked {\n  background-color: var(--color-primary);\n  border-color: var(--text-dark);\n}\n.settings__radio[_ngcontent-%COMP%]   input[type=radio][_ngcontent-%COMP%]:checked::after {\n  content: "";\n  position: absolute;\n  width: 0.5rem;\n  height: 0.5rem;\n  background-color: var(--text-dark);\n  top: 50%;\n  left: 50%;\n  transform: translate(-50%, -50%);\n}\n.settings__radio-label[_ngcontent-%COMP%] {\n  font-size: 0.9375rem;\n  line-height: 1.5rem;\n  font-weight: 600;\n  color: var(--text-dark);\n}\n.settings__security-info[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  gap: 2rem;\n}\n.settings__info-item[_ngcontent-%COMP%] {\n  display: flex;\n  justify-content: space-between;\n  align-items: center;\n  padding: 2rem;\n  background-color: var(--bg-secondary);\n  border: 2px solid var(--border-color);\n}\n@media (max-width: 320px) {\n  .settings__info-item[_ngcontent-%COMP%] {\n    flex-direction: column;\n    align-items: flex-start;\n    gap: 0.5rem;\n  }\n}\n.settings__info-label[_ngcontent-%COMP%] {\n  font-size: 0.9375rem;\n  line-height: 1.5rem;\n  font-weight: 600;\n  color: var(--text-secondary);\n}\n.settings__info-value[_ngcontent-%COMP%] {\n  color: var(--text-dark);\n  font-weight: 600;\n}\n.settings__section--danger[_ngcontent-%COMP%] {\n  border: 3px solid var(--color-error);\n  padding: 2rem;\n  background-color: color-mix(in srgb, var(--color-error) 5%, transparent);\n}\n.settings__danger-zone[_ngcontent-%COMP%] {\n  display: flex;\n  justify-content: space-between;\n  align-items: center;\n  gap: 2rem;\n}\n@media (max-width: 768px) {\n  .settings__danger-zone[_ngcontent-%COMP%] {\n    flex-direction: column;\n    align-items: stretch;\n  }\n}\n.settings__danger-info[_ngcontent-%COMP%] {\n  flex: 1;\n}\n.settings__danger-title[_ngcontent-%COMP%] {\n  font-weight: 700;\n  color: var(--color-error);\n  margin: 0 0 0.5rem 0;\n}\n.settings__danger-desc[_ngcontent-%COMP%] {\n  font-size: 0.9375rem;\n  line-height: 1.5rem;\n  color: var(--text-secondary);\n  margin: 0;\n}\n.settings__danger-button[_ngcontent-%COMP%] {\n  flex-shrink: 0;\n}\n.settings__modal-content[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  gap: 2rem;\n}\n.settings__modal-text[_ngcontent-%COMP%] {\n  color: var(--text-primary);\n  margin: 0;\n}\n.settings__modal-text--warning[_ngcontent-%COMP%] {\n  color: var(--color-error);\n  font-weight: 700;\n  font-size: 1rem;\n  line-height: 3rem;\n}\n.settings__modal-list[_ngcontent-%COMP%] {\n  list-style: none;\n  padding: 0 0 0 2rem;\n  margin: 0;\n}\n.settings__modal-list[_ngcontent-%COMP%]   li[_ngcontent-%COMP%] {\n  color: var(--text-secondary);\n  margin-bottom: 0.5rem;\n  position: relative;\n}\n.settings__modal-list[_ngcontent-%COMP%]   li[_ngcontent-%COMP%]::before {\n  content: "\\2022";\n  position: absolute;\n  left: -2rem;\n  color: var(--color-primary);\n  font-weight: bold;\n}\n.settings__modal-actions[_ngcontent-%COMP%] {\n  display: flex;\n  gap: 1rem;\n  justify-content: flex-end;\n}\n@media (max-width: 320px) {\n  .settings__modal-actions[_ngcontent-%COMP%] {\n    flex-direction: column-reverse;\n  }\n}\n.settings__back-button[_ngcontent-%COMP%] {\n  display: flex;\n  justify-content: center;\n  padding-top: 4rem;\n  margin-top: 4rem;\n  border-top: 2px solid var(--border-color);\n}\n.settings__footer[_ngcontent-%COMP%] {\n  display: flex;\n  justify-content: center;\n  gap: 1rem;\n  padding-top: 2rem;\n  border-top: 2px solid var(--border-color);\n}\n/*# sourceMappingURL=profile.css.map */'] });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(SettingsProfileComponent, [{
    type: Component,
    args: [{ selector: "app-settings-profile", standalone: true, imports: [CommonModule, ReactiveFormsModule, Alert, Button, FormInput], template: '<div class="settings-profile">\r\n  <!-- Mensajes de estado con componentes Alert -->\r\n  @if (successMessage()) {\r\n    <app-alert\r\n      type="success"\r\n      [message]="successMessage()!"\r\n      [dismissible]="true"\r\n      (dismissed)="successMessage.set(null)"\r\n    />\r\n  }\r\n  @if (errorMessage()) {\r\n    <app-alert\r\n      type="error"\r\n      [message]="errorMessage()!"\r\n      [dismissible]="true"\r\n      (dismissed)="errorMessage.set(null)"\r\n    />\r\n  }\r\n\r\n  <header class="settings-profile__header">\r\n    <h2 class="settings-profile__title">Informaci\xF3n del Perfil</h2>\r\n    <p class="settings-profile__subtitle">Personaliza c\xF3mo te ven los dem\xE1s usuarios</p>\r\n  </header>\r\n\r\n  <!-- Foto de perfil -->\r\n  <section class="settings-profile__section">\r\n    <h3 class="settings-profile__section-title">Foto de Perfil</h3>\r\n    <div class="settings-profile__avatar">\r\n      <div class="settings-profile__avatar-preview">\r\n        <img [src]="currentAvatar()" alt="Avatar actual" class="settings-profile__avatar-image" />\r\n      </div>\r\n      <div class="settings-profile__avatar-info">\r\n        <label for="avatar-upload" class="settings-profile__avatar-label">\r\n          <app-button\r\n            variant="secondary"\r\n            type="button"\r\n            [disabled]="isLoading()"\r\n          >\r\n            Cambiar Foto\r\n          </app-button>\r\n        </label>\r\n        <input\r\n          id="avatar-upload"\r\n          type="file"\r\n          accept="image/*"\r\n          (change)="onAvatarChange($event)"\r\n          class="settings-profile__avatar-input"\r\n        />\r\n        <p class="settings-profile__hint">JPG, PNG o GIF. M\xE1ximo 2MB.</p>\r\n      </div>\r\n    </div>\r\n  </section>\r\n\r\n  <!-- Nombre de usuario -->\r\n  <section class="settings-profile__section">\r\n    <h3 class="settings-profile__section-title">Nombre de Usuario</h3>\r\n    <form [formGroup]="profileForm" class="settings-profile__form">\r\n      <app-form-input\r\n        [control]="profileForm.controls.username"\r\n        label="Usuario"\r\n        type="text"\r\n        placeholder="Ingresa tu nombre de usuario"\r\n        [required]="true"\r\n        hint="Solo letras, n\xFAmeros y guiones bajos. M\xEDnimo 3 caracteres."\r\n      />\r\n\r\n      <div class="settings-profile__actions">\r\n        <app-button\r\n          variant="primary"\r\n          type="button"\r\n          [disabled]="profileForm.controls.username.invalid || isLoading()"\r\n          (click)="onSubmit()"\r\n        >\r\n          Guardar Cambios\r\n        </app-button>\r\n      </div>\r\n    </form>\r\n  </section>\r\n</div>\r\n', styles: ['@charset "UTF-8";\n\n/* src/app/pages/settings/profile/profile.scss */\n.settings {\n  min-height: 100vh;\n  padding: 3rem 0;\n}\n.settings__container {\n  max-width: 1440px;\n  margin: 0 auto;\n  padding: 0 2rem;\n}\n@media (max-width: 320px) {\n  .settings__container {\n    padding: 0 1rem;\n  }\n}\n.settings__layout {\n  display: grid;\n  grid-template-columns: 280px 1fr;\n  gap: 4rem;\n  margin-top: 3rem;\n}\n@media (max-width: 768px) {\n  .settings__layout {\n    grid-template-columns: 1fr;\n    gap: 2rem;\n  }\n}\n.settings__sidebar {\n  position: sticky;\n  top: 8rem;\n  height: fit-content;\n  padding: 3rem;\n  padding-left: 0;\n  padding-top: 0;\n  background-color: var(--bg-primary);\n  border-right: 4px solid var(--border-color);\n  border-bottom: 4px solid var(--border-color);\n  box-shadow: none;\n}\n@media (max-width: 768px) {\n  .settings__sidebar {\n    position: static;\n    padding: 2rem;\n    border: 4px solid var(--border-color);\n    box-shadow: 6px 6px 0px #01131B;\n  }\n}\n.settings__title {\n  font-size: 2.625rem;\n  line-height: 3rem;\n  font-weight: 900;\n  color: var(--text-dark);\n  margin: 0 0 3rem 0;\n  text-transform: uppercase;\n  letter-spacing: -0.02em;\n}\n@media (max-width: 320px) {\n  .settings__title {\n    font-size: 1.625rem;\n    line-height: 3rem;\n  }\n}\n.settings__nav {\n  display: flex;\n  flex-direction: column;\n  gap: 0.5rem;\n}\n.settings__nav-item {\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  padding: 1rem 2rem;\n  background-color: var(--bg-primary);\n  border: 2px solid var(--border-color);\n  cursor: pointer;\n  transition: all 150ms ease-in-out;\n  font-weight: 600;\n  text-decoration: none;\n  color: var(--text-dark);\n  font-size: 0.9375rem;\n  line-height: 1.5rem;\n}\n.settings__nav-item:hover {\n  background-color: var(--bg-secondary);\n  transform: translateX(4px);\n  box-shadow: 4px 4px 0px #01131B;\n}\n.settings__nav-item--active {\n  background-color: var(--color-primary);\n  color: var(--bg-primary);\n  border-color: var(--text-dark);\n  transform: translateX(4px);\n  box-shadow: 4px 4px 0px #01131B;\n}\n.settings__sidebar-footer {\n  margin-top: 3rem;\n  padding-top: 2rem;\n  border-top: 2px solid var(--border-color);\n}\n.settings__back-link {\n  display: inline-flex;\n  align-items: center;\n  gap: 0.5rem;\n  color: var(--text-secondary);\n  text-decoration: none;\n  font-weight: 600;\n  font-size: 0.9375rem;\n  line-height: 1.5rem;\n  transition: all 150ms ease-in-out;\n}\n.settings__back-link:hover {\n  color: var(--color-primary);\n  transform: translateX(-4px);\n}\n.settings__content {\n  animation: fadeIn 300ms ease-in-out ease;\n}\n@keyframes fadeIn {\n  from {\n    opacity: 0;\n    transform: translateY(-10px);\n  }\n  to {\n    opacity: 1;\n    transform: translateY(0);\n  }\n}\n.settings__tab {\n  display: flex;\n  flex-direction: column;\n  gap: 3rem;\n}\n.settings__tab-header {\n  padding-bottom: 2rem;\n  border-bottom: 2px solid var(--border-color);\n}\n.settings__tab-title {\n  font-size: 2.625rem;\n  line-height: 3rem;\n  font-weight: 900;\n  color: var(--text-dark);\n  margin: 0 0 0.5rem 0;\n}\n.settings__tab-description {\n  color: var(--text-secondary);\n  margin: 0;\n}\n.settings__message {\n  padding: 2rem;\n  margin-bottom: 2rem;\n  border: 4px solid var(--border-color);\n  font-weight: 600;\n  animation: slideDown 300ms ease-in-out ease;\n}\n.settings__message--success {\n  background-color: color-mix(in srgb, var(--color-success) 10%, transparent);\n  border-color: var(--color-success);\n  color: var(--color-success);\n}\n.settings__message--error {\n  background-color: color-mix(in srgb, var(--color-error) 10%, transparent);\n  border-color: var(--color-error);\n  color: var(--color-error);\n}\n@keyframes slideDown {\n  from {\n    opacity: 0;\n    transform: translateY(-10px);\n  }\n  to {\n    opacity: 1;\n    transform: translateY(0);\n  }\n}\n.settings__divider {\n  height: 2px;\n  background-color: var(--border-color);\n  border: none;\n  margin: 3rem 0;\n}\n.settings__divider--small {\n  margin: 2rem 0;\n}\n.settings__section {\n  display: flex;\n  flex-direction: column;\n}\n.settings__avatar-section {\n  display: flex;\n  gap: 2rem;\n  align-items: center;\n}\n@media (max-width: 768px) {\n  .settings__avatar-section {\n    flex-direction: column;\n    text-align: center;\n  }\n}\n.settings__avatar-preview {\n  flex-shrink: 0;\n}\n.settings__avatar-image {\n  width: 15rem;\n  height: 15rem;\n  object-fit: cover;\n  border: 4px solid var(--border-color);\n  box-shadow: 6px 6px 0px #01131B;\n  background-color: var(--bg-secondary);\n}\n@media (max-width: 768px) {\n  .settings__avatar-image {\n    width: 12rem;\n    height: 12rem;\n  }\n}\n.settings__avatar-actions {\n  display: flex;\n  flex-direction: column;\n  gap: 1rem;\n}\n.settings__avatar-info {\n  display: flex;\n  flex-direction: column;\n  gap: 1rem;\n}\n.settings__avatar-label {\n  cursor: pointer;\n}\n.settings__avatar-input {\n  display: none;\n}\n.settings__avatar-hint {\n  font-size: 0.9375rem;\n  line-height: 1.5rem;\n  color: var(--text-muted);\n  margin: 0;\n}\n.settings__form {\n  display: flex;\n  flex-direction: column;\n  gap: 2rem;\n  width: 100%;\n}\n.settings__form-actions {\n  display: flex;\n  gap: 1rem;\n  justify-content: flex-start;\n  margin-top: 1rem;\n}\n@media (max-width: 320px) {\n  .settings__form-actions {\n    flex-direction: column;\n  }\n  .settings__form-actions app-button {\n    width: 100%;\n  }\n}\n.settings__field-hint {\n  font-size: 0.875rem;\n  line-height: 1.5rem;\n  color: var(--text-muted);\n  margin: 0.5rem 0;\n}\n.settings__password-requirements {\n  padding: 2rem;\n  background-color: var(--bg-secondary);\n  border: 2px solid var(--border-color);\n  border-radius: 0;\n}\n.settings__requirements-title {\n  font-size: 0.9375rem;\n  line-height: 1.5rem;\n  font-weight: 600;\n  color: var(--text-dark);\n  margin: 0 0 1rem 0;\n}\n.settings__requirements-list {\n  list-style: none;\n  padding: 0;\n  margin: 0;\n  display: flex;\n  flex-direction: column;\n  gap: 0.5rem;\n}\n.settings__requirements-list li {\n  font-size: 0.9375rem;\n  line-height: 1.5rem;\n  color: var(--text-muted);\n  display: flex;\n  align-items: center;\n  gap: 0.5rem;\n  transition: color 0.2s ease;\n}\n.settings__requirements-list li.settings__requirement--met {\n  color: var(--color-success);\n  font-weight: 600;\n}\n.settings__requirement-icon {\n  font-weight: bold;\n  width: 1.25rem;\n  text-align: center;\n}\n.settings__preferences {\n  display: flex;\n  flex-direction: column;\n  gap: 2rem;\n}\n.settings__preference-item {\n  display: flex;\n  justify-content: space-between;\n  align-items: flex-start;\n  gap: 2rem;\n  padding-bottom: 2rem;\n  border-bottom: 2px solid var(--border-color);\n}\n.settings__preference-item:last-child {\n  border-bottom: none;\n  padding-bottom: 0;\n}\n.settings__preference-item--full {\n  flex-direction: column;\n  align-items: stretch;\n}\n.settings__preference-info {\n  flex: 1;\n}\n.settings__preference-title {\n  font-weight: 600;\n  color: var(--text-dark);\n  margin: 0 0 0.5rem 0;\n}\n.settings__preference-desc {\n  font-size: 0.9375rem;\n  line-height: 1.5rem;\n  color: var(--text-secondary);\n  margin: 0;\n}\n.settings__toggle {\n  position: relative;\n  display: inline-block;\n  width: 6rem;\n  height: 2.5rem;\n  flex-shrink: 0;\n}\n.settings__toggle input {\n  opacity: 0;\n  width: 0;\n  height: 0;\n}\n.settings__toggle input:checked + .settings__toggle-slider {\n  background-color: var(--color-primary);\n}\n.settings__toggle input:checked + .settings__toggle-slider::before {\n  transform: translateX(2.5rem);\n}\n.settings__toggle input:focus + .settings__toggle-slider {\n  box-shadow: 0 0 0 3px color-mix(in srgb, var(--color-primary) 20%, transparent);\n}\n.settings__toggle-slider {\n  position: absolute;\n  cursor: pointer;\n  top: 0;\n  left: 0;\n  right: 0;\n  bottom: 0;\n  background-color: var(--text-muted);\n  transition: 300ms ease-in-out;\n  border: 2px solid var(--border-color);\n}\n.settings__toggle-slider::before {\n  position: absolute;\n  content: "";\n  height: 2rem;\n  width: 2rem;\n  left: 0.5rem;\n  bottom: 0.5rem;\n  background-color: var(--bg-primary);\n  transition: 300ms ease-in-out;\n  border: 2px solid var(--text-dark);\n}\n.settings__radio-group {\n  display: flex;\n  gap: 1rem;\n  flex-wrap: wrap;\n}\n.settings__radio {\n  display: flex;\n  align-items: center;\n  gap: 0.5rem;\n  cursor: pointer;\n  padding: 1rem 2rem;\n  border: 2px solid var(--border-color);\n  background-color: var(--bg-primary);\n  transition: all 150ms ease-in-out;\n}\n.settings__radio:hover {\n  background-color: var(--bg-secondary);\n  transform: translateY(-2px);\n  box-shadow: 4px 4px 0px #01131B;\n}\n.settings__radio input[type=radio] {\n  appearance: none;\n  width: 1.25rem;\n  height: 1.25rem;\n  border: 3px solid var(--text-dark);\n  background-color: var(--bg-primary);\n  cursor: pointer;\n  position: relative;\n}\n.settings__radio input[type=radio]:checked {\n  background-color: var(--color-primary);\n  border-color: var(--text-dark);\n}\n.settings__radio input[type=radio]:checked::after {\n  content: "";\n  position: absolute;\n  width: 0.5rem;\n  height: 0.5rem;\n  background-color: var(--text-dark);\n  top: 50%;\n  left: 50%;\n  transform: translate(-50%, -50%);\n}\n.settings__radio-label {\n  font-size: 0.9375rem;\n  line-height: 1.5rem;\n  font-weight: 600;\n  color: var(--text-dark);\n}\n.settings__security-info {\n  display: flex;\n  flex-direction: column;\n  gap: 2rem;\n}\n.settings__info-item {\n  display: flex;\n  justify-content: space-between;\n  align-items: center;\n  padding: 2rem;\n  background-color: var(--bg-secondary);\n  border: 2px solid var(--border-color);\n}\n@media (max-width: 320px) {\n  .settings__info-item {\n    flex-direction: column;\n    align-items: flex-start;\n    gap: 0.5rem;\n  }\n}\n.settings__info-label {\n  font-size: 0.9375rem;\n  line-height: 1.5rem;\n  font-weight: 600;\n  color: var(--text-secondary);\n}\n.settings__info-value {\n  color: var(--text-dark);\n  font-weight: 600;\n}\n.settings__section--danger {\n  border: 3px solid var(--color-error);\n  padding: 2rem;\n  background-color: color-mix(in srgb, var(--color-error) 5%, transparent);\n}\n.settings__danger-zone {\n  display: flex;\n  justify-content: space-between;\n  align-items: center;\n  gap: 2rem;\n}\n@media (max-width: 768px) {\n  .settings__danger-zone {\n    flex-direction: column;\n    align-items: stretch;\n  }\n}\n.settings__danger-info {\n  flex: 1;\n}\n.settings__danger-title {\n  font-weight: 700;\n  color: var(--color-error);\n  margin: 0 0 0.5rem 0;\n}\n.settings__danger-desc {\n  font-size: 0.9375rem;\n  line-height: 1.5rem;\n  color: var(--text-secondary);\n  margin: 0;\n}\n.settings__danger-button {\n  flex-shrink: 0;\n}\n.settings__modal-content {\n  display: flex;\n  flex-direction: column;\n  gap: 2rem;\n}\n.settings__modal-text {\n  color: var(--text-primary);\n  margin: 0;\n}\n.settings__modal-text--warning {\n  color: var(--color-error);\n  font-weight: 700;\n  font-size: 1rem;\n  line-height: 3rem;\n}\n.settings__modal-list {\n  list-style: none;\n  padding: 0 0 0 2rem;\n  margin: 0;\n}\n.settings__modal-list li {\n  color: var(--text-secondary);\n  margin-bottom: 0.5rem;\n  position: relative;\n}\n.settings__modal-list li::before {\n  content: "\\2022";\n  position: absolute;\n  left: -2rem;\n  color: var(--color-primary);\n  font-weight: bold;\n}\n.settings__modal-actions {\n  display: flex;\n  gap: 1rem;\n  justify-content: flex-end;\n}\n@media (max-width: 320px) {\n  .settings__modal-actions {\n    flex-direction: column-reverse;\n  }\n}\n.settings__back-button {\n  display: flex;\n  justify-content: center;\n  padding-top: 4rem;\n  margin-top: 4rem;\n  border-top: 2px solid var(--border-color);\n}\n.settings__footer {\n  display: flex;\n  justify-content: center;\n  gap: 1rem;\n  padding-top: 2rem;\n  border-top: 2px solid var(--border-color);\n}\n/*# sourceMappingURL=profile.css.map */\n'] }]
  }], null, null);
})();
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(SettingsProfileComponent, { className: "SettingsProfileComponent", filePath: "src/app/pages/settings/profile/profile.ts", lineNumber: 15 });
})();
export {
  SettingsProfileComponent as default
};
//# sourceMappingURL=chunk-PUH3LOB2.js.map
