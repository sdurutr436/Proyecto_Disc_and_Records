import {
  Badge
} from "./chunk-BBSFSO2S.js";
import {
  Router
} from "./chunk-BFARIXWD.js";
import {
  Modal
} from "./chunk-2MIYCLYX.js";
import {
  Alert
} from "./chunk-ZDDBZNTN.js";
import {
  Button
} from "./chunk-QEXKGZ6Y.js";
import "./chunk-MBYWNRDU.js";
import {
  CommonModule,
  Component,
  inject,
  setClassMetadata,
  signal,
  ɵsetClassDebugInfo,
  ɵɵadvance,
  ɵɵdefineComponent,
  ɵɵelement,
  ɵɵelementEnd,
  ɵɵelementStart,
  ɵɵlistener,
  ɵɵproperty,
  ɵɵtext,
  ɵɵtextInterpolate
} from "./chunk-PFYGRVXA.js";

// src/app/pages/settings/security/security.ts
var SettingsSecurityComponent = class _SettingsSecurityComponent {
  router = inject(Router);
  isLoading = signal(false, ...ngDevMode ? [{ debugName: "isLoading" }] : []);
  showDeleteModal = signal(false, ...ngDevMode ? [{ debugName: "showDeleteModal" }] : []);
  // Información de seguridad
  lastPasswordChange = signal("15 de diciembre, 2025", ...ngDevMode ? [{ debugName: "lastPasswordChange" }] : []);
  accountCreated = signal("3 de enero, 2025", ...ngDevMode ? [{ debugName: "accountCreated" }] : []);
  activeSessions = signal(2, ...ngDevMode ? [{ debugName: "activeSessions" }] : []);
  /**
   * Muestra modal de confirmación para eliminar cuenta
   */
  onDeleteAccount() {
    this.showDeleteModal.set(true);
  }
  /**
   * Confirma la eliminación de cuenta
   */
  confirmDeleteAccount() {
    this.showDeleteModal.set(false);
    this.isLoading.set(true);
    setTimeout(() => {
      this.isLoading.set(false);
      console.log("Cuenta eliminada");
      this.router.navigate(["/"]);
    }, 1500);
  }
  static \u0275fac = function SettingsSecurityComponent_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _SettingsSecurityComponent)();
  };
  static \u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _SettingsSecurityComponent, selectors: [["app-settings-security"]], decls: 38, vars: 5, consts: [[1, "settings-security"], [1, "settings-security__header"], [1, "settings-security__title"], [1, "settings-security__subtitle"], [1, "settings-security__section"], [1, "settings-security__section-title"], [1, "settings-security__info-grid"], [1, "settings-security__info-item"], [1, "settings-security__info-label"], [1, "settings-security__info-value"], ["variant", "info", 3, "text"], [1, "settings-security__section", "settings-security__section--danger"], ["type", "warning", "title", "Eliminar Cuenta", "message", "Una vez eliminada, no podr\xE1s recuperar tu cuenta ni tus rese\xF1as. Esta acci\xF3n es irreversible."], [1, "settings-security__actions"], ["variant", "danger", "type", "button", 3, "click", "disabled"], ["title", "\xBFEliminar tu cuenta?", 3, "onClose", "isOpen"], ["type", "error", "title", "\u26A0\uFE0F Esta acci\xF3n es irreversible", "message", "Si eliminas tu cuenta, perder\xE1s permanentemente todas tus rese\xF1as, historial de \xE1lbumes guardados, listas de reproducci\xF3n y comentarios."], ["modal-footer", "", 1, "settings-security__modal-actions"], ["variant", "ghost", 3, "click"], ["variant", "danger", 3, "click"]], template: function SettingsSecurityComponent_Template(rf, ctx) {
    if (rf & 1) {
      \u0275\u0275elementStart(0, "div", 0)(1, "header", 1)(2, "h2", 2);
      \u0275\u0275text(3, "Seguridad");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(4, "p", 3);
      \u0275\u0275text(5, "Informaci\xF3n de tu cuenta y acciones cr\xEDticas");
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(6, "section", 4)(7, "h3", 5);
      \u0275\u0275text(8, "Informaci\xF3n de Seguridad");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(9, "div", 6)(10, "div", 7)(11, "span", 8);
      \u0275\u0275text(12, "Cuenta creada");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(13, "span", 9);
      \u0275\u0275text(14);
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(15, "div", 7)(16, "span", 8);
      \u0275\u0275text(17, "\xDAltimo cambio de contrase\xF1a");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(18, "span", 9);
      \u0275\u0275text(19);
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(20, "div", 7)(21, "span", 8);
      \u0275\u0275text(22, "Sesiones activas");
      \u0275\u0275elementEnd();
      \u0275\u0275element(23, "app-badge", 10);
      \u0275\u0275elementEnd()()();
      \u0275\u0275elementStart(24, "section", 11)(25, "h3", 5);
      \u0275\u0275text(26, "Zona de Peligro");
      \u0275\u0275elementEnd();
      \u0275\u0275element(27, "app-alert", 12);
      \u0275\u0275elementStart(28, "div", 13)(29, "app-button", 14);
      \u0275\u0275listener("click", function SettingsSecurityComponent_Template_app_button_click_29_listener() {
        return ctx.onDeleteAccount();
      });
      \u0275\u0275text(30, " Eliminar Cuenta ");
      \u0275\u0275elementEnd()()()();
      \u0275\u0275elementStart(31, "app-modal", 15);
      \u0275\u0275listener("onClose", function SettingsSecurityComponent_Template_app_modal_onClose_31_listener() {
        return ctx.showDeleteModal.set(false);
      });
      \u0275\u0275element(32, "app-alert", 16);
      \u0275\u0275elementStart(33, "div", 17)(34, "app-button", 18);
      \u0275\u0275listener("click", function SettingsSecurityComponent_Template_app_button_click_34_listener() {
        return ctx.showDeleteModal.set(false);
      });
      \u0275\u0275text(35, " Cancelar ");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(36, "app-button", 19);
      \u0275\u0275listener("click", function SettingsSecurityComponent_Template_app_button_click_36_listener() {
        return ctx.confirmDeleteAccount();
      });
      \u0275\u0275text(37, " S\xED, Eliminar Cuenta ");
      \u0275\u0275elementEnd()()();
    }
    if (rf & 2) {
      \u0275\u0275advance(14);
      \u0275\u0275textInterpolate(ctx.accountCreated());
      \u0275\u0275advance(5);
      \u0275\u0275textInterpolate(ctx.lastPasswordChange());
      \u0275\u0275advance(4);
      \u0275\u0275property("text", ctx.activeSessions().toString());
      \u0275\u0275advance(6);
      \u0275\u0275property("disabled", ctx.isLoading());
      \u0275\u0275advance(2);
      \u0275\u0275property("isOpen", ctx.showDeleteModal());
    }
  }, dependencies: [CommonModule, Alert, Badge, Button, Modal], styles: ['@charset "UTF-8";\n\n\n\n/*# sourceMappingURL=security.css.map */'] });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(SettingsSecurityComponent, [{
    type: Component,
    args: [{ selector: "app-settings-security", standalone: true, imports: [CommonModule, Alert, Badge, Button, Modal], template: '<div class="settings-security">\r\n  <header class="settings-security__header">\r\n    <h2 class="settings-security__title">Seguridad</h2>\r\n    <p class="settings-security__subtitle">Informaci\xF3n de tu cuenta y acciones cr\xEDticas</p>\r\n  </header>\r\n\r\n  <!-- Info de seguridad -->\r\n  <section class="settings-security__section">\r\n    <h3 class="settings-security__section-title">Informaci\xF3n de Seguridad</h3>\r\n\r\n    <div class="settings-security__info-grid">\r\n      <div class="settings-security__info-item">\r\n        <span class="settings-security__info-label">Cuenta creada</span>\r\n        <span class="settings-security__info-value">{{ accountCreated() }}</span>\r\n      </div>\r\n      <div class="settings-security__info-item">\r\n        <span class="settings-security__info-label">\xDAltimo cambio de contrase\xF1a</span>\r\n        <span class="settings-security__info-value">{{ lastPasswordChange() }}</span>\r\n      </div>\r\n      <div class="settings-security__info-item">\r\n        <span class="settings-security__info-label">Sesiones activas</span>\r\n        <app-badge [text]="activeSessions().toString()" variant="info" />\r\n      </div>\r\n    </div>\r\n  </section>\r\n\r\n  <!-- Zona de peligro -->\r\n  <section class="settings-security__section settings-security__section--danger">\r\n    <h3 class="settings-security__section-title">Zona de Peligro</h3>\r\n\r\n    <app-alert\r\n      type="warning"\r\n      title="Eliminar Cuenta"\r\n      message="Una vez eliminada, no podr\xE1s recuperar tu cuenta ni tus rese\xF1as. Esta acci\xF3n es irreversible."\r\n    />\r\n\r\n    <div class="settings-security__actions">\r\n      <app-button\r\n        variant="danger"\r\n        type="button"\r\n        [disabled]="isLoading()"\r\n        (click)="onDeleteAccount()"\r\n      >\r\n        Eliminar Cuenta\r\n      </app-button>\r\n    </div>\r\n  </section>\r\n</div>\r\n\r\n<!-- Modal de confirmaci\xF3n usando componente Modal -->\r\n<app-modal\r\n  [isOpen]="showDeleteModal()"\r\n  title="\xBFEliminar tu cuenta?"\r\n  (onClose)="showDeleteModal.set(false)"\r\n>\r\n  <app-alert\r\n    type="error"\r\n    title="\u26A0\uFE0F Esta acci\xF3n es irreversible"\r\n    message="Si eliminas tu cuenta, perder\xE1s permanentemente todas tus rese\xF1as, historial de \xE1lbumes guardados, listas de reproducci\xF3n y comentarios."\r\n  />\r\n\r\n  <div modal-footer class="settings-security__modal-actions">\r\n    <app-button variant="ghost" (click)="showDeleteModal.set(false)">\r\n      Cancelar\r\n    </app-button>\r\n    <app-button variant="danger" (click)="confirmDeleteAccount()">\r\n      S\xED, Eliminar Cuenta\r\n    </app-button>\r\n  </div>\r\n</app-modal>\r\n', styles: ['@charset "UTF-8";\n\n/* src/app/pages/settings/security/security.scss */\n/*# sourceMappingURL=security.css.map */\n'] }]
  }], null, null);
})();
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(SettingsSecurityComponent, { className: "SettingsSecurityComponent", filePath: "src/app/pages/settings/security/security.ts", lineNumber: 16 });
})();
export {
  SettingsSecurityComponent as default
};
//# sourceMappingURL=chunk-2CPZDFGW.js.map
