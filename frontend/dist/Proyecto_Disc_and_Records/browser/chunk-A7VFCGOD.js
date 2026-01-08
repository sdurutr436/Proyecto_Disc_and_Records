import {
  FormsModule
} from "./chunk-I3ETSPUB.js";
import {
  Router
} from "./chunk-N6XJ4GTA.js";
import {
  Component,
  EventEmitter,
  Output,
  inject,
  setClassMetadata,
  signal,
  ɵsetClassDebugInfo,
  ɵɵadvance,
  ɵɵconditional,
  ɵɵconditionalCreate,
  ɵɵdefineComponent,
  ɵɵdomElement,
  ɵɵdomElementEnd,
  ɵɵdomElementStart,
  ɵɵdomListener,
  ɵɵdomProperty,
  ɵɵgetCurrentView,
  ɵɵnamespaceSVG,
  ɵɵnextContext,
  ɵɵresetView,
  ɵɵrestoreView,
  ɵɵtext
} from "./chunk-MWU7IQTJ.js";

// src/app/components/shared/search-bar/search-bar.ts
function SearchBar_Conditional_3_Template(rf, ctx) {
  if (rf & 1) {
    const _r1 = \u0275\u0275getCurrentView();
    \u0275\u0275domElementStart(0, "button", 8);
    \u0275\u0275domListener("click", function SearchBar_Conditional_3_Template_button_click_0_listener() {
      \u0275\u0275restoreView(_r1);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.clearSearch());
    });
    \u0275\u0275text(1, " \u2715 ");
    \u0275\u0275domElementEnd();
  }
}
var SearchBar = class _SearchBar {
  onSearch = new EventEmitter();
  router = inject(Router);
  searchTerm = signal("", ...ngDevMode ? [{ debugName: "searchTerm" }] : []);
  /**
   * Emitir evento de búsqueda al presionar Enter o hacer clic en el botón
   */
  handleSearch() {
    const term = this.searchTerm().trim();
    if (term) {
      this.onSearch.emit(term);
      this.router.navigate(["/search"], { queryParams: { q: term } });
    }
  }
  /**
   * Manejar tecla Enter en el input
   */
  handleKeyPress(event) {
    if (event.key === "Enter") {
      this.handleSearch();
    }
  }
  /**
   * Actualizar el término de búsqueda
   */
  updateSearchTerm(value) {
    this.searchTerm.set(value);
  }
  /**
   * Limpiar búsqueda
   */
  clearSearch() {
    this.searchTerm.set("");
    this.onSearch.emit("");
  }
  static \u0275fac = function SearchBar_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _SearchBar)();
  };
  static \u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _SearchBar, selectors: [["app-search-bar"]], outputs: { onSearch: "onSearch" }, decls: 8, vars: 3, consts: [[1, "search-bar"], [1, "search-bar__container"], ["type", "text", "placeholder", "Busca artistas, \xE1lbumes...", "aria-label", "Buscar en la colecci\xF3n", 1, "search-bar__input", 3, "input", "keypress", "value"], ["type", "button", "aria-label", "Limpiar b\xFAsqueda", 1, "search-bar__clear"], ["type", "button", "aria-label", "Buscar", 1, "search-bar__button", 3, "click", "disabled"], ["width", "20", "height", "20", "viewBox", "0 0 24 24", "fill", "none", "stroke", "currentColor", "stroke-width", "2", "stroke-linecap", "round", "stroke-linejoin", "round", 1, "search-bar__icon"], ["cx", "11", "cy", "11", "r", "8"], ["d", "m21 21-4.35-4.35"], ["type", "button", "aria-label", "Limpiar b\xFAsqueda", 1, "search-bar__clear", 3, "click"]], template: function SearchBar_Template(rf, ctx) {
    if (rf & 1) {
      \u0275\u0275domElementStart(0, "div", 0)(1, "div", 1)(2, "input", 2);
      \u0275\u0275domListener("input", function SearchBar_Template_input_input_2_listener($event) {
        return ctx.updateSearchTerm($event.target.value);
      })("keypress", function SearchBar_Template_input_keypress_2_listener($event) {
        return ctx.handleKeyPress($event);
      });
      \u0275\u0275domElementEnd();
      \u0275\u0275conditionalCreate(3, SearchBar_Conditional_3_Template, 2, 0, "button", 3);
      \u0275\u0275domElementStart(4, "button", 4);
      \u0275\u0275domListener("click", function SearchBar_Template_button_click_4_listener() {
        return ctx.handleSearch();
      });
      \u0275\u0275namespaceSVG();
      \u0275\u0275domElementStart(5, "svg", 5);
      \u0275\u0275domElement(6, "circle", 6)(7, "path", 7);
      \u0275\u0275domElementEnd()()()();
    }
    if (rf & 2) {
      \u0275\u0275advance(2);
      \u0275\u0275domProperty("value", ctx.searchTerm());
      \u0275\u0275advance();
      \u0275\u0275conditional(ctx.searchTerm() ? 3 : -1);
      \u0275\u0275advance();
      \u0275\u0275domProperty("disabled", !ctx.searchTerm().trim());
    }
  }, dependencies: [FormsModule], styles: ['@charset "UTF-8";\n\n\n\n.search-bar[_ngcontent-%COMP%] {\n  width: 100%;\n  min-width: 300px;\n  max-width: 600px;\n  margin: 0 auto;\n}\n.search-bar__container[_ngcontent-%COMP%] {\n  position: relative;\n  display: flex;\n  align-items: center;\n  gap: 0;\n  background-color: var(--bg-primary);\n  border: 2px solid var(--border-color);\n  border-radius: 50px;\n  padding: 0.25rem;\n  transition: all 0.3s ease;\n  width: 100%;\n}\n.search-bar__container[_ngcontent-%COMP%]:focus-within {\n  border-color: var(--color-primary);\n  box-shadow: 0 0 0 3px color-mix(in srgb, var(--color-primary) 10%, transparent);\n}\n.search-bar__input[_ngcontent-%COMP%] {\n  flex: 1;\n  min-width: 0;\n  border: none;\n  background: transparent;\n  padding: 0.75rem 1.25rem;\n  font-family: "Space Grotesk", sans-serif;\n  font-size: 1rem;\n  color: var(--text-primary);\n  outline: none;\n}\n.search-bar__input[_ngcontent-%COMP%]::placeholder {\n  color: var(--text-placeholder);\n  opacity: 0.7;\n}\n.search-bar__input[_ngcontent-%COMP%]:focus {\n  outline: none;\n}\n.search-bar__clear[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  width: 32px;\n  height: 32px;\n  border: none;\n  background: transparent;\n  color: var(--text-secondary);\n  cursor: pointer;\n  border-radius: 50%;\n  transition: all 0.2s ease;\n  font-size: 1.25rem;\n  padding: 0;\n}\n.search-bar__clear[_ngcontent-%COMP%]:hover {\n  background-color: var(--color-error);\n  color: var(--text-white);\n}\n.search-bar__clear[_ngcontent-%COMP%]:active {\n  transform: scale(0.95);\n}\n.search-bar__button[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  width: 44px;\n  height: 44px;\n  border: none;\n  background-color: var(--color-primary);\n  color: var(--text-dark);\n  border-radius: 50%;\n  cursor: pointer;\n  transition: all 0.3s ease;\n  padding: 0;\n}\n.search-bar__button[_ngcontent-%COMP%]:hover:not(:disabled) {\n  background-color: var(--color-secondary);\n  transform: scale(1.05);\n}\n.search-bar__button[_ngcontent-%COMP%]:active:not(:disabled) {\n  transform: scale(0.98);\n}\n.search-bar__button[_ngcontent-%COMP%]:disabled {\n  opacity: 0.5;\n  cursor: not-allowed;\n}\n.search-bar__icon[_ngcontent-%COMP%] {\n  width: 20px;\n  height: 20px;\n}\n@media (max-width: 768px) {\n  .search-bar[_ngcontent-%COMP%] {\n    max-width: 100%;\n  }\n  .search-bar__input[_ngcontent-%COMP%] {\n    padding: 0.625rem 1rem;\n    font-size: 0.9375rem;\n  }\n  .search-bar__button[_ngcontent-%COMP%] {\n    width: 40px;\n    height: 40px;\n  }\n}\n/*# sourceMappingURL=search-bar.css.map */'] });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(SearchBar, [{
    type: Component,
    args: [{ selector: "app-search-bar", standalone: true, imports: [FormsModule], template: '<div class="search-bar">\r\n  <div class="search-bar__container">\r\n    <!-- Input de b\xFAsqueda -->\r\n    <input\r\n      type="text"\r\n      class="search-bar__input"\r\n      [value]="searchTerm()"\r\n      (input)="updateSearchTerm($any($event.target).value)"\r\n      (keypress)="handleKeyPress($event)"\r\n      placeholder="Busca artistas, \xE1lbumes..."\r\n      aria-label="Buscar en la colecci\xF3n"\r\n    />\r\n\r\n    <!-- Bot\xF3n de limpiar (solo visible si hay texto) -->\r\n    @if (searchTerm()) {\r\n      <button\r\n        type="button"\r\n        class="search-bar__clear"\r\n        (click)="clearSearch()"\r\n        aria-label="Limpiar b\xFAsqueda"\r\n      >\r\n        \u2715\r\n      </button>\r\n    }\r\n\r\n    <!-- Bot\xF3n de b\xFAsqueda -->\r\n    <button\r\n      type="button"\r\n      class="search-bar__button"\r\n      (click)="handleSearch()"\r\n      [disabled]="!searchTerm().trim()"\r\n      aria-label="Buscar"\r\n    >\r\n      <!-- Icono de lupa -->\r\n      <svg class="search-bar__icon" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">\r\n        <circle cx="11" cy="11" r="8"></circle>\r\n        <path d="m21 21-4.35-4.35"></path>\r\n      </svg>\r\n    </button>\r\n  </div>\r\n</div>\r\n', styles: ['@charset "UTF-8";\n\n/* src/app/components/shared/search-bar/search-bar.scss */\n.search-bar {\n  width: 100%;\n  min-width: 300px;\n  max-width: 600px;\n  margin: 0 auto;\n}\n.search-bar__container {\n  position: relative;\n  display: flex;\n  align-items: center;\n  gap: 0;\n  background-color: var(--bg-primary);\n  border: 2px solid var(--border-color);\n  border-radius: 50px;\n  padding: 0.25rem;\n  transition: all 0.3s ease;\n  width: 100%;\n}\n.search-bar__container:focus-within {\n  border-color: var(--color-primary);\n  box-shadow: 0 0 0 3px color-mix(in srgb, var(--color-primary) 10%, transparent);\n}\n.search-bar__input {\n  flex: 1;\n  min-width: 0;\n  border: none;\n  background: transparent;\n  padding: 0.75rem 1.25rem;\n  font-family: "Space Grotesk", sans-serif;\n  font-size: 1rem;\n  color: var(--text-primary);\n  outline: none;\n}\n.search-bar__input::placeholder {\n  color: var(--text-placeholder);\n  opacity: 0.7;\n}\n.search-bar__input:focus {\n  outline: none;\n}\n.search-bar__clear {\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  width: 32px;\n  height: 32px;\n  border: none;\n  background: transparent;\n  color: var(--text-secondary);\n  cursor: pointer;\n  border-radius: 50%;\n  transition: all 0.2s ease;\n  font-size: 1.25rem;\n  padding: 0;\n}\n.search-bar__clear:hover {\n  background-color: var(--color-error);\n  color: var(--text-white);\n}\n.search-bar__clear:active {\n  transform: scale(0.95);\n}\n.search-bar__button {\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  width: 44px;\n  height: 44px;\n  border: none;\n  background-color: var(--color-primary);\n  color: var(--text-dark);\n  border-radius: 50%;\n  cursor: pointer;\n  transition: all 0.3s ease;\n  padding: 0;\n}\n.search-bar__button:hover:not(:disabled) {\n  background-color: var(--color-secondary);\n  transform: scale(1.05);\n}\n.search-bar__button:active:not(:disabled) {\n  transform: scale(0.98);\n}\n.search-bar__button:disabled {\n  opacity: 0.5;\n  cursor: not-allowed;\n}\n.search-bar__icon {\n  width: 20px;\n  height: 20px;\n}\n@media (max-width: 768px) {\n  .search-bar {\n    max-width: 100%;\n  }\n  .search-bar__input {\n    padding: 0.625rem 1rem;\n    font-size: 0.9375rem;\n  }\n  .search-bar__button {\n    width: 40px;\n    height: 40px;\n  }\n}\n/*# sourceMappingURL=search-bar.css.map */\n'] }]
  }], null, { onSearch: [{
    type: Output
  }] });
})();
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(SearchBar, { className: "SearchBar", filePath: "src/app/components/shared/search-bar/search-bar.ts", lineNumber: 12 });
})();

export {
  SearchBar
};
//# sourceMappingURL=chunk-A7VFCGOD.js.map
