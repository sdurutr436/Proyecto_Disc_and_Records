import {
  Component,
  Input,
  ViewChild,
  setClassMetadata,
  ɵsetClassDebugInfo,
  ɵɵadvance,
  ɵɵconditional,
  ɵɵconditionalCreate,
  ɵɵdefineComponent,
  ɵɵdomElementEnd,
  ɵɵdomElementStart,
  ɵɵdomListener,
  ɵɵgetCurrentView,
  ɵɵloadQuery,
  ɵɵnextContext,
  ɵɵprojection,
  ɵɵprojectionDef,
  ɵɵqueryRefresh,
  ɵɵresetView,
  ɵɵrestoreView,
  ɵɵtext,
  ɵɵtextInterpolate,
  ɵɵviewQuery
} from "./chunk-MWU7IQTJ.js";

// src/app/components/shared/carousel/carousel.ts
var _c0 = ["carouselTrack"];
var _c1 = ["*"];
function Carousel_Conditional_1_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275domElementStart(0, "h2", 2);
    \u0275\u0275text(1);
    \u0275\u0275domElementEnd();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext();
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(ctx_r0.title);
  }
}
function Carousel_Conditional_3_Template(rf, ctx) {
  if (rf & 1) {
    const _r2 = \u0275\u0275getCurrentView();
    \u0275\u0275domElementStart(0, "button", 7);
    \u0275\u0275domListener("click", function Carousel_Conditional_3_Template_button_click_0_listener() {
      \u0275\u0275restoreView(_r2);
      const ctx_r0 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r0.scrollLeft());
    });
    \u0275\u0275text(1, " \u2039 ");
    \u0275\u0275domElementEnd();
  }
}
function Carousel_Conditional_7_Template(rf, ctx) {
  if (rf & 1) {
    const _r3 = \u0275\u0275getCurrentView();
    \u0275\u0275domElementStart(0, "button", 8);
    \u0275\u0275domListener("click", function Carousel_Conditional_7_Template_button_click_0_listener() {
      \u0275\u0275restoreView(_r3);
      const ctx_r0 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r0.scrollRight());
    });
    \u0275\u0275text(1, " \u203A ");
    \u0275\u0275domElementEnd();
  }
}
var Carousel = class _Carousel {
  title = "";
  itemsToShow = 4;
  // Cuántas cards mostrar a la vez
  carouselTrack;
  currentIndex = 0;
  canScrollLeft = false;
  canScrollRight = true;
  ngAfterViewInit() {
    setTimeout(() => {
      this.updateScrollButtons();
    }, 300);
    if (typeof window !== "undefined") {
      window.addEventListener("resize", () => this.updateScrollButtons());
    }
  }
  scrollLeft() {
    const track = this.carouselTrack.nativeElement;
    const scrollAmount = track.offsetWidth / this.itemsToShow;
    track.scrollBy({
      left: -scrollAmount,
      behavior: "smooth"
    });
    setTimeout(() => {
      this.updateScrollButtons();
    }, 300);
  }
  scrollRight() {
    const track = this.carouselTrack.nativeElement;
    const scrollAmount = track.offsetWidth / this.itemsToShow;
    track.scrollBy({
      left: scrollAmount,
      behavior: "smooth"
    });
    setTimeout(() => {
      this.updateScrollButtons();
    }, 300);
  }
  updateScrollButtons() {
    if (!this.carouselTrack)
      return;
    const track = this.carouselTrack.nativeElement;
    this.canScrollLeft = track.scrollLeft > 10;
    const maxScroll = track.scrollWidth - track.clientWidth;
    this.canScrollRight = track.scrollLeft < maxScroll - 10;
  }
  /**
   * MANIPULACIÓN DOM AVANZADA: Modificar estilos dinámicamente
   * Añade un efecto de highlight al track del carousel
   * NOTA: Mejor práctica es usar clases CSS en lugar de manipular estilos inline
   */
  toggleHighlight() {
    if (!this.carouselTrack)
      return;
    const track = this.carouselTrack.nativeElement;
    track.classList.toggle("carousel-track--highlighted");
  }
  /**
   * MANIPULACIÓN DOM: Cambiar opacidad dinámicamente
   */
  setOpacity(value) {
    if (!this.carouselTrack)
      return;
    this.carouselTrack.nativeElement.style.opacity = value.toString();
    this.carouselTrack.nativeElement.style.transition = "opacity 0.3s ease";
  }
  static \u0275fac = function Carousel_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _Carousel)();
  };
  static \u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _Carousel, selectors: [["app-carousel"]], viewQuery: function Carousel_Query(rf, ctx) {
    if (rf & 1) {
      \u0275\u0275viewQuery(_c0, 5);
    }
    if (rf & 2) {
      let _t;
      \u0275\u0275queryRefresh(_t = \u0275\u0275loadQuery()) && (ctx.carouselTrack = _t.first);
    }
  }, inputs: { title: "title", itemsToShow: "itemsToShow" }, ngContentSelectors: _c1, decls: 8, vars: 3, consts: [["carouselTrack", ""], [1, "carousel"], [1, "carousel__title"], [1, "carousel__container"], ["type", "button", "aria-label", "Ver items anteriores", 1, "carousel__nav", "carousel__nav--prev"], [1, "carousel__track"], ["type", "button", "aria-label", "Ver items siguientes", 1, "carousel__nav", "carousel__nav--next"], ["type", "button", "aria-label", "Ver items anteriores", 1, "carousel__nav", "carousel__nav--prev", 3, "click"], ["type", "button", "aria-label", "Ver items siguientes", 1, "carousel__nav", "carousel__nav--next", 3, "click"]], template: function Carousel_Template(rf, ctx) {
    if (rf & 1) {
      \u0275\u0275projectionDef();
      \u0275\u0275domElementStart(0, "div", 1);
      \u0275\u0275conditionalCreate(1, Carousel_Conditional_1_Template, 2, 1, "h2", 2);
      \u0275\u0275domElementStart(2, "div", 3);
      \u0275\u0275conditionalCreate(3, Carousel_Conditional_3_Template, 2, 0, "button", 4);
      \u0275\u0275domElementStart(4, "div", 5, 0);
      \u0275\u0275projection(6);
      \u0275\u0275domElementEnd();
      \u0275\u0275conditionalCreate(7, Carousel_Conditional_7_Template, 2, 0, "button", 6);
      \u0275\u0275domElementEnd()();
    }
    if (rf & 2) {
      \u0275\u0275advance();
      \u0275\u0275conditional(ctx.title ? 1 : -1);
      \u0275\u0275advance(2);
      \u0275\u0275conditional(ctx.canScrollLeft ? 3 : -1);
      \u0275\u0275advance(4);
      \u0275\u0275conditional(ctx.canScrollRight ? 7 : -1);
    }
  }, styles: ['@charset "UTF-8";\n\n\n\n[_nghost-%COMP%] {\n  display: block;\n  width: 100%;\n  max-width: 100%;\n  min-width: 0;\n}\n.carousel[_ngcontent-%COMP%] {\n  width: 100%;\n  max-width: 100%;\n  min-width: 0;\n  box-sizing: border-box;\n  margin-bottom: 4rem;\n  background-color: var(--bg-secondary);\n  border: 4px solid var(--border-color);\n  border-radius: 8px;\n  box-shadow: 6px 6px 0px var(--shadow-color);\n  padding: 3rem;\n}\n@media (max-width: 767px) {\n  .carousel[_ngcontent-%COMP%] {\n    padding: 2rem;\n  }\n}\n@media (min-width: 768px) and (max-width: 1023px) {\n  .carousel[_ngcontent-%COMP%] {\n    padding: 2rem;\n  }\n}\n.carousel__title[_ngcontent-%COMP%] {\n  font-family: "Monoton", cursive;\n  font-size: 2.5rem;\n  font-weight: 400;\n  text-transform: uppercase;\n  letter-spacing: 0.05em;\n  letter-spacing: 0.1em;\n  margin: 0 0 2rem 0;\n  color: var(--text-primary);\n  text-shadow: 3px 3px 0px var(--color-primary), 6px 6px 0px var(--color-secondary);\n  padding-bottom: 1rem;\n}\n@media (max-width: 767px) {\n  .carousel__title[_ngcontent-%COMP%] {\n    font-size: 1.5rem;\n    text-shadow: 2px 2px 0px var(--color-primary);\n  }\n}\n@media (min-width: 768px) and (max-width: 1023px) {\n  .carousel__title[_ngcontent-%COMP%] {\n    font-size: 2rem;\n    text-shadow: 2px 2px 0px var(--color-primary), 4px 4px 0px var(--color-secondary);\n  }\n}\n.carousel__container[_ngcontent-%COMP%] {\n  position: relative;\n  width: 100%;\n  overflow: visible;\n}\n@media (max-width: 767px) {\n  .carousel__container[_ngcontent-%COMP%] {\n    overflow: visible;\n  }\n}\n.carousel__track[_ngcontent-%COMP%] {\n  width: 100%;\n  display: flex;\n  flex-direction: row;\n  gap: 1rem;\n  overflow-x: auto;\n  overflow-y: visible;\n  scroll-behavior: smooth;\n  min-height: 280px;\n  padding: 1rem 0.5rem 3rem 0.5rem;\n  scrollbar-width: none;\n  -ms-overflow-style: none;\n  align-items: flex-start;\n}\n.carousel__track[_ngcontent-%COMP%]::-webkit-scrollbar {\n  display: none;\n}\n@media (min-width: 768px) and (max-width: 1023px) {\n  .carousel__track[_ngcontent-%COMP%] {\n    gap: 0.5rem;\n    padding: 0.5rem 0.5rem 2rem 0.5rem;\n    min-height: 250px;\n  }\n}\n@media (max-width: 767px) {\n  .carousel__track[_ngcontent-%COMP%] {\n    gap: 0.5rem;\n    padding: 0.5rem 0.5rem 1rem 0.5rem;\n    min-height: 230px;\n  }\n}\n.carousel__track[_ngcontent-%COMP%]    > *[_ngcontent-%COMP%] {\n  flex: 0 0 200px;\n  width: 200px;\n  min-width: 200px;\n  max-width: 200px;\n}\n@media (min-width: 768px) and (max-width: 1023px) {\n  .carousel__track[_ngcontent-%COMP%]    > *[_ngcontent-%COMP%] {\n    flex: 0 0 170px;\n    width: 170px;\n    min-width: 170px;\n    max-width: 170px;\n  }\n}\n@media (max-width: 767px) {\n  .carousel__track[_ngcontent-%COMP%]    > *[_ngcontent-%COMP%] {\n    flex: 0 0 150px;\n    width: 150px;\n    min-width: 150px;\n    max-width: 150px;\n  }\n}\n.carousel__track--highlighted[_ngcontent-%COMP%] {\n  box-shadow: 0 0 20px var(--color-primary);\n  border: 2px solid var(--color-primary);\n  transition: all 0.3s ease;\n}\n.carousel__nav[_ngcontent-%COMP%] {\n  position: absolute;\n  top: 50%;\n  transform: translateY(-50%);\n  width: 48px;\n  height: 48px;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  background-color: var(--bg-primary);\n  border: 3px solid var(--border-color);\n  border-radius: 5px;\n  box-shadow: 4px 4px 0px var(--shadow-color);\n  cursor: pointer;\n  font-size: 2rem;\n  font-weight: 700;\n  line-height: 1;\n  color: var(--text-primary);\n  transition: all 150ms ease-in-out;\n  z-index: 1;\n}\n.carousel__nav[_ngcontent-%COMP%]:hover {\n  background-color: var(--color-primary);\n  transform: translateY(-50%) translateY(-2px);\n  box-shadow: 6px 6px 0px var(--shadow-color);\n}\n.carousel__nav[_ngcontent-%COMP%]:active {\n  transform: translateY(-50%) translateY(0);\n  box-shadow: 2px 2px 0px var(--shadow-color);\n}\n.carousel__nav[_ngcontent-%COMP%]:focus-visible {\n  outline: 3px solid var(--border-color);\n  outline-offset: 2px;\n}\n.carousel__nav--prev[_ngcontent-%COMP%] {\n  left: 0.5rem;\n}\n.carousel__nav--next[_ngcontent-%COMP%] {\n  right: 0.5rem;\n}\n@media (min-width: 768px) and (max-width: 1023px) {\n  .carousel__nav[_ngcontent-%COMP%] {\n    width: 44px;\n    height: 44px;\n    font-size: 1.75rem;\n  }\n}\n@media (max-width: 767px) {\n  .carousel__nav[_ngcontent-%COMP%] {\n    width: 40px;\n    height: 40px;\n    font-size: 1.5rem;\n  }\n}\n/*# sourceMappingURL=carousel.css.map */'] });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(Carousel, [{
    type: Component,
    args: [{ selector: "app-carousel", standalone: true, imports: [], template: '<div class="carousel">\r\n  <!-- T\xEDtulo del carrusel -->\r\n  @if (title) {\r\n    <h2 class="carousel__title">{{ title }}</h2>\r\n  }\r\n\r\n  <!-- Contenedor del carrusel con navegaci\xF3n -->\r\n  <div class="carousel__container">\r\n    <!-- Bot\xF3n anterior -->\r\n    @if (canScrollLeft) {\r\n      <button\r\n        type="button"\r\n        class="carousel__nav carousel__nav--prev"\r\n        (click)="scrollLeft()"\r\n        aria-label="Ver items anteriores"\r\n      >\r\n        \u2039\r\n      </button>\r\n    }\r\n\r\n    <!-- Track de items -->\r\n    <div class="carousel__track" #carouselTrack>\r\n      <ng-content></ng-content>\r\n    </div>\r\n\r\n    <!-- Bot\xF3n siguiente -->\r\n    @if (canScrollRight) {\r\n      <button\r\n        type="button"\r\n        class="carousel__nav carousel__nav--next"\r\n        (click)="scrollRight()"\r\n        aria-label="Ver items siguientes"\r\n      >\r\n        \u203A\r\n      </button>\r\n    }\r\n  </div>\r\n</div>\r\n', styles: ['@charset "UTF-8";\n\n/* src/app/components/shared/carousel/carousel.scss */\n:host {\n  display: block;\n  width: 100%;\n  max-width: 100%;\n  min-width: 0;\n}\n.carousel {\n  width: 100%;\n  max-width: 100%;\n  min-width: 0;\n  box-sizing: border-box;\n  margin-bottom: 4rem;\n  background-color: var(--bg-secondary);\n  border: 4px solid var(--border-color);\n  border-radius: 8px;\n  box-shadow: 6px 6px 0px var(--shadow-color);\n  padding: 3rem;\n}\n@media (max-width: 767px) {\n  .carousel {\n    padding: 2rem;\n  }\n}\n@media (min-width: 768px) and (max-width: 1023px) {\n  .carousel {\n    padding: 2rem;\n  }\n}\n.carousel__title {\n  font-family: "Monoton", cursive;\n  font-size: 2.5rem;\n  font-weight: 400;\n  text-transform: uppercase;\n  letter-spacing: 0.05em;\n  letter-spacing: 0.1em;\n  margin: 0 0 2rem 0;\n  color: var(--text-primary);\n  text-shadow: 3px 3px 0px var(--color-primary), 6px 6px 0px var(--color-secondary);\n  padding-bottom: 1rem;\n}\n@media (max-width: 767px) {\n  .carousel__title {\n    font-size: 1.5rem;\n    text-shadow: 2px 2px 0px var(--color-primary);\n  }\n}\n@media (min-width: 768px) and (max-width: 1023px) {\n  .carousel__title {\n    font-size: 2rem;\n    text-shadow: 2px 2px 0px var(--color-primary), 4px 4px 0px var(--color-secondary);\n  }\n}\n.carousel__container {\n  position: relative;\n  width: 100%;\n  overflow: visible;\n}\n@media (max-width: 767px) {\n  .carousel__container {\n    overflow: visible;\n  }\n}\n.carousel__track {\n  width: 100%;\n  display: flex;\n  flex-direction: row;\n  gap: 1rem;\n  overflow-x: auto;\n  overflow-y: visible;\n  scroll-behavior: smooth;\n  min-height: 280px;\n  padding: 1rem 0.5rem 3rem 0.5rem;\n  scrollbar-width: none;\n  -ms-overflow-style: none;\n  align-items: flex-start;\n}\n.carousel__track::-webkit-scrollbar {\n  display: none;\n}\n@media (min-width: 768px) and (max-width: 1023px) {\n  .carousel__track {\n    gap: 0.5rem;\n    padding: 0.5rem 0.5rem 2rem 0.5rem;\n    min-height: 250px;\n  }\n}\n@media (max-width: 767px) {\n  .carousel__track {\n    gap: 0.5rem;\n    padding: 0.5rem 0.5rem 1rem 0.5rem;\n    min-height: 230px;\n  }\n}\n.carousel__track > * {\n  flex: 0 0 200px;\n  width: 200px;\n  min-width: 200px;\n  max-width: 200px;\n}\n@media (min-width: 768px) and (max-width: 1023px) {\n  .carousel__track > * {\n    flex: 0 0 170px;\n    width: 170px;\n    min-width: 170px;\n    max-width: 170px;\n  }\n}\n@media (max-width: 767px) {\n  .carousel__track > * {\n    flex: 0 0 150px;\n    width: 150px;\n    min-width: 150px;\n    max-width: 150px;\n  }\n}\n.carousel__track--highlighted {\n  box-shadow: 0 0 20px var(--color-primary);\n  border: 2px solid var(--color-primary);\n  transition: all 0.3s ease;\n}\n.carousel__nav {\n  position: absolute;\n  top: 50%;\n  transform: translateY(-50%);\n  width: 48px;\n  height: 48px;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  background-color: var(--bg-primary);\n  border: 3px solid var(--border-color);\n  border-radius: 5px;\n  box-shadow: 4px 4px 0px var(--shadow-color);\n  cursor: pointer;\n  font-size: 2rem;\n  font-weight: 700;\n  line-height: 1;\n  color: var(--text-primary);\n  transition: all 150ms ease-in-out;\n  z-index: 1;\n}\n.carousel__nav:hover {\n  background-color: var(--color-primary);\n  transform: translateY(-50%) translateY(-2px);\n  box-shadow: 6px 6px 0px var(--shadow-color);\n}\n.carousel__nav:active {\n  transform: translateY(-50%) translateY(0);\n  box-shadow: 2px 2px 0px var(--shadow-color);\n}\n.carousel__nav:focus-visible {\n  outline: 3px solid var(--border-color);\n  outline-offset: 2px;\n}\n.carousel__nav--prev {\n  left: 0.5rem;\n}\n.carousel__nav--next {\n  right: 0.5rem;\n}\n@media (min-width: 768px) and (max-width: 1023px) {\n  .carousel__nav {\n    width: 44px;\n    height: 44px;\n    font-size: 1.75rem;\n  }\n}\n@media (max-width: 767px) {\n  .carousel__nav {\n    width: 40px;\n    height: 40px;\n    font-size: 1.5rem;\n  }\n}\n/*# sourceMappingURL=carousel.css.map */\n'] }]
  }], null, { title: [{
    type: Input
  }], itemsToShow: [{
    type: Input
  }], carouselTrack: [{
    type: ViewChild,
    args: ["carouselTrack"]
  }] });
})();
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(Carousel, { className: "Carousel", filePath: "src/app/components/shared/carousel/carousel.ts", lineNumber: 10 });
})();

export {
  Carousel
};
//# sourceMappingURL=chunk-3EPKXEVM.js.map
