import {
  CommonModule,
  Component,
  Input,
  NgForOf,
  input,
  setClassMetadata,
  signal,
  ɵsetClassDebugInfo,
  ɵɵadvance,
  ɵɵattribute,
  ɵɵclassProp,
  ɵɵdefineComponent,
  ɵɵelement,
  ɵɵelementEnd,
  ɵɵelementStart,
  ɵɵgetCurrentView,
  ɵɵlistener,
  ɵɵnamespaceHTML,
  ɵɵnamespaceSVG,
  ɵɵnextContext,
  ɵɵproperty,
  ɵɵresetView,
  ɵɵrestoreView,
  ɵɵsanitizeHtml,
  ɵɵtemplate,
  ɵɵtext,
  ɵɵtextInterpolate
} from "./chunk-MWU7IQTJ.js";

// src/app/components/shared/accordion/accordion.ts
function Accordion_div_1_Template(rf, ctx) {
  if (rf & 1) {
    const _r1 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 2)(1, "button", 3);
    \u0275\u0275listener("click", function Accordion_div_1_Template_button_click_1_listener() {
      const item_r2 = \u0275\u0275restoreView(_r1).$implicit;
      const ctx_r2 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r2.toggle(item_r2.id));
    });
    \u0275\u0275elementStart(2, "span", 4);
    \u0275\u0275text(3);
    \u0275\u0275elementEnd();
    \u0275\u0275namespaceSVG();
    \u0275\u0275elementStart(4, "svg", 5);
    \u0275\u0275element(5, "polyline", 6);
    \u0275\u0275elementEnd()();
    \u0275\u0275namespaceHTML();
    \u0275\u0275elementStart(6, "div", 7);
    \u0275\u0275element(7, "div", 8);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const item_r2 = ctx.$implicit;
    const ctx_r2 = \u0275\u0275nextContext();
    \u0275\u0275classProp("accordion__item--open", ctx_r2.isOpen(item_r2.id));
    \u0275\u0275advance();
    \u0275\u0275attribute("aria-expanded", ctx_r2.isOpen(item_r2.id))("aria-controls", "accordion-content-" + item_r2.id);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(item_r2.title);
    \u0275\u0275advance();
    \u0275\u0275classProp("accordion__icon--open", ctx_r2.isOpen(item_r2.id));
    \u0275\u0275advance(2);
    \u0275\u0275classProp("accordion__content--open", ctx_r2.isOpen(item_r2.id));
    \u0275\u0275property("id", "accordion-content-" + item_r2.id);
    \u0275\u0275attribute("aria-labelledby", "accordion-header-" + item_r2.id);
    \u0275\u0275advance();
    \u0275\u0275property("innerHTML", item_r2.content, \u0275\u0275sanitizeHtml);
  }
}
var Accordion = class _Accordion {
  /**
   * Array de items del accordion
   */
  items = input.required(...ngDevMode ? [{ debugName: "items" }] : []);
  /**
   * Modo del accordion:
   * - 'single': solo un item abierto a la vez
   * - 'multiple': múltiples items pueden estar abiertos simultáneamente
   */
  mode = input("single", ...ngDevMode ? [{ debugName: "mode" }] : []);
  /**
   * IDs de los items que están abiertos actualmente
   */
  openItems = signal(/* @__PURE__ */ new Set(), ...ngDevMode ? [{ debugName: "openItems" }] : []);
  constructor() {
  }
  /**
   * Toggle de un item del accordion
   */
  toggle(itemId) {
    const currentOpen = new Set(this.openItems());
    if (currentOpen.has(itemId)) {
      currentOpen.delete(itemId);
    } else {
      if (this.mode() === "single") {
        currentOpen.clear();
      }
      currentOpen.add(itemId);
    }
    this.openItems.set(currentOpen);
  }
  /**
   * Verificar si un item está abierto
   */
  isOpen(itemId) {
    return this.openItems().has(itemId);
  }
  static \u0275fac = function Accordion_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _Accordion)();
  };
  static \u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _Accordion, selectors: [["app-accordion"]], inputs: { items: [1, "items"], mode: [1, "mode"] }, decls: 2, vars: 1, consts: [[1, "accordion"], ["class", "accordion__item", 3, "accordion__item--open", 4, "ngFor", "ngForOf"], [1, "accordion__item"], ["type", "button", 1, "accordion__header", 3, "click"], [1, "accordion__title"], ["width", "20", "height", "20", "viewBox", "0 0 20 20", "fill", "none", "stroke", "currentColor", "stroke-width", "2", "stroke-linecap", "round", "stroke-linejoin", "round", "aria-hidden", "true", 1, "accordion__icon"], ["points", "6 9 12 15 18 9"], ["role", "region", 1, "accordion__content", 3, "id"], [1, "accordion__content-inner", 3, "innerHTML"]], template: function Accordion_Template(rf, ctx) {
    if (rf & 1) {
      \u0275\u0275elementStart(0, "div", 0);
      \u0275\u0275template(1, Accordion_div_1_Template, 8, 12, "div", 1);
      \u0275\u0275elementEnd();
    }
    if (rf & 2) {
      \u0275\u0275advance();
      \u0275\u0275property("ngForOf", ctx.items());
    }
  }, dependencies: [CommonModule, NgForOf], styles: ['@charset "UTF-8";\n\n\n\n.accordion[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  gap: 1rem;\n  width: 100%;\n}\n.accordion__item[_ngcontent-%COMP%] {\n  border: 3px solid var(--border-color);\n  border-radius: 5px;\n  background-color: var(--bg-primary);\n  overflow: hidden;\n  transition: box-shadow 0.2s ease;\n}\n.accordion__item[_ngcontent-%COMP%]:hover {\n  box-shadow: 4px 4px 0px var(--shadow-color);\n}\n.accordion__item--open[_ngcontent-%COMP%] {\n  box-shadow: 6px 6px 0px var(--shadow-color);\n  border-color: var(--color-primary);\n}\n.accordion__header[_ngcontent-%COMP%] {\n  width: 100%;\n  display: flex;\n  justify-content: space-between;\n  align-items: center;\n  padding: 2rem;\n  background-color: var(--bg-secondary);\n  border: none;\n  cursor: pointer;\n  transition: background-color 0.2s ease;\n  gap: 2rem;\n}\n.accordion__item--open[_ngcontent-%COMP%]   .accordion__header[_ngcontent-%COMP%] {\n  background-color: var(--color-primary);\n  border-bottom: 2px solid var(--border-color);\n}\n.accordion__header[_ngcontent-%COMP%]:hover {\n  background-color: var(--color-primary);\n}\n.accordion__header[_ngcontent-%COMP%]:active {\n  transform: translateY(1px);\n}\n.accordion__header[_ngcontent-%COMP%]:focus-visible {\n  outline: 3px solid var(--color-accent);\n  outline-offset: 2px;\n}\n.accordion__title[_ngcontent-%COMP%] {\n  font-family: "Space Grotesk", sans-serif;\n  font-size: 0.9375rem;\n  font-weight: 700;\n  color: var(--text-primary);\n  text-align: left;\n  text-transform: uppercase;\n  letter-spacing: 0.05em;\n}\n.accordion__icon[_ngcontent-%COMP%] {\n  color: var(--text-primary);\n  flex-shrink: 0;\n  transition: transform 0.3s cubic-bezier(0.4, 0, 0.2, 1);\n}\n.accordion__icon--open[_ngcontent-%COMP%] {\n  transform: rotate(180deg);\n}\n.accordion__content[_ngcontent-%COMP%] {\n  max-height: 0;\n  overflow: hidden;\n  transition: max-height 0.4s cubic-bezier(0.4, 0, 0.2, 1), opacity 0.3s ease;\n  opacity: 0;\n}\n.accordion__content--open[_ngcontent-%COMP%] {\n  max-height: 100rem;\n  opacity: 1;\n}\n.accordion__content-inner[_ngcontent-%COMP%] {\n  padding: 2rem;\n  font-family: "Space Grotesk", sans-serif;\n  font-size: 0.875rem;\n  line-height: 1.6;\n  color: var(--text-primary);\n}\n@media (max-width: 767px) {\n  .accordion__header[_ngcontent-%COMP%] {\n    padding: 1rem;\n  }\n  .accordion__title[_ngcontent-%COMP%] {\n    font-size: 0.875rem;\n  }\n  .accordion__content-inner[_ngcontent-%COMP%] {\n    padding: 1rem;\n    font-size: 0.75rem;\n  }\n  .accordion__icon[_ngcontent-%COMP%] {\n    width: 1rem;\n    height: 1rem;\n  }\n}\n/*# sourceMappingURL=accordion.css.map */'] });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(Accordion, [{
    type: Component,
    args: [{ selector: "app-accordion", standalone: true, imports: [CommonModule], template: `<div class="accordion">\r
  <!-- Iterar sobre cada item del accordion -->\r
  <div\r
    *ngFor="let item of items()"\r
    class="accordion__item"\r
    [class.accordion__item--open]="isOpen(item.id)">\r
\r
    <!-- Header: clickeable para expandir/colapsar -->\r
    <button\r
      class="accordion__header"\r
      (click)="toggle(item.id)"\r
      [attr.aria-expanded]="isOpen(item.id)"\r
      [attr.aria-controls]="'accordion-content-' + item.id"\r
      type="button">\r
\r
      <span class="accordion__title">{{ item.title }}</span>\r
\r
      <!-- Icono de flecha que rota al abrir -->\r
      <svg\r
        class="accordion__icon"\r
        [class.accordion__icon--open]="isOpen(item.id)"\r
        width="20"\r
        height="20"\r
        viewBox="0 0 20 20"\r
        fill="none"\r
        stroke="currentColor"\r
        stroke-width="2"\r
        stroke-linecap="round"\r
        stroke-linejoin="round"\r
        aria-hidden="true">\r
        <polyline points="6 9 12 15 18 9"></polyline>\r
      </svg>\r
    </button>\r
\r
    <!-- Contenido: se expande/colapsa con animaci\xF3n -->\r
    <div\r
      [id]="'accordion-content-' + item.id"\r
      class="accordion__content"\r
      [class.accordion__content--open]="isOpen(item.id)"\r
      role="region"\r
      [attr.aria-labelledby]="'accordion-header-' + item.id">\r
\r
      <div class="accordion__content-inner" [innerHTML]="item.content">\r
      </div>\r
    </div>\r
  </div>\r
</div>\r
`, styles: ['@charset "UTF-8";\n\n/* src/app/components/shared/accordion/accordion.scss */\n.accordion {\n  display: flex;\n  flex-direction: column;\n  gap: 1rem;\n  width: 100%;\n}\n.accordion__item {\n  border: 3px solid var(--border-color);\n  border-radius: 5px;\n  background-color: var(--bg-primary);\n  overflow: hidden;\n  transition: box-shadow 0.2s ease;\n}\n.accordion__item:hover {\n  box-shadow: 4px 4px 0px var(--shadow-color);\n}\n.accordion__item--open {\n  box-shadow: 6px 6px 0px var(--shadow-color);\n  border-color: var(--color-primary);\n}\n.accordion__header {\n  width: 100%;\n  display: flex;\n  justify-content: space-between;\n  align-items: center;\n  padding: 2rem;\n  background-color: var(--bg-secondary);\n  border: none;\n  cursor: pointer;\n  transition: background-color 0.2s ease;\n  gap: 2rem;\n}\n.accordion__item--open .accordion__header {\n  background-color: var(--color-primary);\n  border-bottom: 2px solid var(--border-color);\n}\n.accordion__header:hover {\n  background-color: var(--color-primary);\n}\n.accordion__header:active {\n  transform: translateY(1px);\n}\n.accordion__header:focus-visible {\n  outline: 3px solid var(--color-accent);\n  outline-offset: 2px;\n}\n.accordion__title {\n  font-family: "Space Grotesk", sans-serif;\n  font-size: 0.9375rem;\n  font-weight: 700;\n  color: var(--text-primary);\n  text-align: left;\n  text-transform: uppercase;\n  letter-spacing: 0.05em;\n}\n.accordion__icon {\n  color: var(--text-primary);\n  flex-shrink: 0;\n  transition: transform 0.3s cubic-bezier(0.4, 0, 0.2, 1);\n}\n.accordion__icon--open {\n  transform: rotate(180deg);\n}\n.accordion__content {\n  max-height: 0;\n  overflow: hidden;\n  transition: max-height 0.4s cubic-bezier(0.4, 0, 0.2, 1), opacity 0.3s ease;\n  opacity: 0;\n}\n.accordion__content--open {\n  max-height: 100rem;\n  opacity: 1;\n}\n.accordion__content-inner {\n  padding: 2rem;\n  font-family: "Space Grotesk", sans-serif;\n  font-size: 0.875rem;\n  line-height: 1.6;\n  color: var(--text-primary);\n}\n@media (max-width: 767px) {\n  .accordion__header {\n    padding: 1rem;\n  }\n  .accordion__title {\n    font-size: 0.875rem;\n  }\n  .accordion__content-inner {\n    padding: 1rem;\n    font-size: 0.75rem;\n  }\n  .accordion__icon {\n    width: 1rem;\n    height: 1rem;\n  }\n}\n/*# sourceMappingURL=accordion.css.map */\n'] }]
  }], () => [], { items: [{ type: Input, args: [{ isSignal: true, alias: "items", required: true }] }], mode: [{ type: Input, args: [{ isSignal: true, alias: "mode", required: false }] }] });
})();
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(Accordion, { className: "Accordion", filePath: "src/app/components/shared/accordion/accordion.ts", lineNumber: 18 });
})();

export {
  Accordion
};
//# sourceMappingURL=chunk-6BFMFJEW.js.map
