import {
  CommonModule,
  Component,
  HostListener,
  Input,
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
  ɵɵconditional,
  ɵɵconditionalCreate,
  ɵɵdefineComponent,
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
  ɵɵtextInterpolate1
} from "./chunk-PFYGRVXA.js";

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
  Modal
};
//# sourceMappingURL=chunk-2MIYCLYX.js.map
