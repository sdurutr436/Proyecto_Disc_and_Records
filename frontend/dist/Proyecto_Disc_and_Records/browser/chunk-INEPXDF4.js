import {
  CommonModule,
  Component,
  Input,
  input,
  setClassMetadata,
  ɵsetClassDebugInfo,
  ɵɵadvance,
  ɵɵclassMap,
  ɵɵclassProp,
  ɵɵconditional,
  ɵɵconditionalCreate,
  ɵɵdefineComponent,
  ɵɵdomElementEnd,
  ɵɵdomElementStart,
  ɵɵnextContext,
  ɵɵrepeater,
  ɵɵrepeaterCreate,
  ɵɵrepeaterTrackByIdentity,
  ɵɵtext,
  ɵɵtextInterpolate
} from "./chunk-MWU7IQTJ.js";

// src/app/components/shared/rating/rating.ts
function RatingComponent_For_2_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275domElementStart(0, "span", 3);
    \u0275\u0275text(1, " \u2605 ");
    \u0275\u0275domElementEnd();
  }
  if (rf & 2) {
    const star_r1 = ctx.$implicit;
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275classProp("rating__star--filled", star_r1 <= ctx_r1.rating());
  }
}
function RatingComponent_Conditional_3_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275domElementStart(0, "span", 2);
    \u0275\u0275text(1);
    \u0275\u0275domElementEnd();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(ctx_r1.rating());
  }
}
var RatingComponent = class _RatingComponent {
  /**
   * Valor de rating (0-5)
   */
  rating = input.required(...ngDevMode ? [{ debugName: "rating" }] : []);
  /**
   * Número máximo de estrellas a mostrar
   */
  maxStars = input(5, ...ngDevMode ? [{ debugName: "maxStars" }] : []);
  /**
   * Tamaño del rating
   */
  size = input("medium", ...ngDevMode ? [{ debugName: "size" }] : []);
  /**
   * Mostrar el valor numérico junto a las estrellas
   */
  showValue = input(false, ...ngDevMode ? [{ debugName: "showValue" }] : []);
  /**
   * Obtiene array de números para iterar estrellas
   */
  getStars() {
    return Array.from({ length: this.maxStars() }, (_, i) => i + 1);
  }
  static \u0275fac = function RatingComponent_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _RatingComponent)();
  };
  static \u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _RatingComponent, selectors: [["app-rating"]], inputs: { rating: [1, "rating"], maxStars: [1, "maxStars"], size: [1, "size"], showValue: [1, "showValue"] }, decls: 4, vars: 3, consts: [[1, "rating"], ["aria-hidden", "true", 1, "rating__star", 3, "rating__star--filled"], [1, "rating__value"], ["aria-hidden", "true", 1, "rating__star"]], template: function RatingComponent_Template(rf, ctx) {
    if (rf & 1) {
      \u0275\u0275domElementStart(0, "div", 0);
      \u0275\u0275repeaterCreate(1, RatingComponent_For_2_Template, 2, 2, "span", 1, \u0275\u0275repeaterTrackByIdentity);
      \u0275\u0275conditionalCreate(3, RatingComponent_Conditional_3_Template, 2, 1, "span", 2);
      \u0275\u0275domElementEnd();
    }
    if (rf & 2) {
      \u0275\u0275classMap("rating--" + ctx.size());
      \u0275\u0275advance();
      \u0275\u0275repeater(ctx.getStars());
      \u0275\u0275advance(2);
      \u0275\u0275conditional(ctx.showValue() ? 3 : -1);
    }
  }, dependencies: [CommonModule], styles: ['@charset "UTF-8";\n\n\n\n.rating[_ngcontent-%COMP%] {\n  display: inline-flex;\n  align-items: center;\n  gap: 0.25rem;\n}\n.rating__star[_ngcontent-%COMP%] {\n  color: var(--text-muted);\n  transition: color 0.2s ease;\n}\n.rating__star--filled[_ngcontent-%COMP%] {\n  color: var(--color-primary);\n}\n.rating__value[_ngcontent-%COMP%] {\n  margin-left: 0.5rem;\n  font-weight: 600;\n  color: var(--text-dark);\n}\n.rating--small[_ngcontent-%COMP%]   .rating__star[_ngcontent-%COMP%] {\n  font-size: 0.875rem;\n}\n.rating--small[_ngcontent-%COMP%]   .rating__value[_ngcontent-%COMP%] {\n  font-size: 0.75rem;\n}\n.rating--medium[_ngcontent-%COMP%]   .rating__star[_ngcontent-%COMP%] {\n  font-size: 1rem;\n}\n.rating--medium[_ngcontent-%COMP%]   .rating__value[_ngcontent-%COMP%] {\n  font-size: 0.875rem;\n}\n.rating--large[_ngcontent-%COMP%]   .rating__star[_ngcontent-%COMP%] {\n  font-size: 1.25rem;\n}\n.rating--large[_ngcontent-%COMP%]   .rating__value[_ngcontent-%COMP%] {\n  font-size: 1rem;\n}\n/*# sourceMappingURL=rating.css.map */'] });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(RatingComponent, [{
    type: Component,
    args: [{ selector: "app-rating", standalone: true, imports: [CommonModule], template: `<div class="rating" [class]="'rating--' + size()">\r
  @for (star of getStars(); track star) {\r
    <span\r
      class="rating__star"\r
      [class.rating__star--filled]="star <= rating()"\r
      aria-hidden="true"\r
    >\r
      \u2605\r
    </span>\r
  }\r
  @if (showValue()) {\r
    <span class="rating__value">{{ rating() }}</span>\r
  }\r
</div>\r
`, styles: ['@charset "UTF-8";\n\n/* src/app/components/shared/rating/rating.scss */\n.rating {\n  display: inline-flex;\n  align-items: center;\n  gap: 0.25rem;\n}\n.rating__star {\n  color: var(--text-muted);\n  transition: color 0.2s ease;\n}\n.rating__star--filled {\n  color: var(--color-primary);\n}\n.rating__value {\n  margin-left: 0.5rem;\n  font-weight: 600;\n  color: var(--text-dark);\n}\n.rating--small .rating__star {\n  font-size: 0.875rem;\n}\n.rating--small .rating__value {\n  font-size: 0.75rem;\n}\n.rating--medium .rating__star {\n  font-size: 1rem;\n}\n.rating--medium .rating__value {\n  font-size: 0.875rem;\n}\n.rating--large .rating__star {\n  font-size: 1.25rem;\n}\n.rating--large .rating__value {\n  font-size: 1rem;\n}\n/*# sourceMappingURL=rating.css.map */\n'] }]
  }], null, { rating: [{ type: Input, args: [{ isSignal: true, alias: "rating", required: true }] }], maxStars: [{ type: Input, args: [{ isSignal: true, alias: "maxStars", required: false }] }], size: [{ type: Input, args: [{ isSignal: true, alias: "size", required: false }] }], showValue: [{ type: Input, args: [{ isSignal: true, alias: "showValue", required: false }] }] });
})();
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(RatingComponent, { className: "RatingComponent", filePath: "src/app/components/shared/rating/rating.ts", lineNumber: 11 });
})();

export {
  RatingComponent
};
//# sourceMappingURL=chunk-INEPXDF4.js.map
