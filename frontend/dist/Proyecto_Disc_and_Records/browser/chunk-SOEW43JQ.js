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
  ɵɵelementEnd,
  ɵɵelementStart,
  ɵɵgetCurrentView,
  ɵɵlistener,
  ɵɵnextContext,
  ɵɵrepeater,
  ɵɵrepeaterCreate,
  ɵɵresetView,
  ɵɵrestoreView,
  ɵɵtext,
  ɵɵtextInterpolate
} from "./chunk-PFYGRVXA.js";

// src/app/pages/admin/genres/genres.ts
var _forTrack0 = ($index, $item) => $item.id;
function AdminGenresComponent_Conditional_6_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 3)(1, "p", 5);
    \u0275\u0275text(2, "No hay g\xE9neros registrados");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "p", 6);
    \u0275\u0275text(4, "Crea el primer g\xE9nero musical");
    \u0275\u0275elementEnd()();
  }
}
function AdminGenresComponent_Conditional_7_For_14_Template(rf, ctx) {
  if (rf & 1) {
    const _r1 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "tr")(1, "td");
    \u0275\u0275text(2);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "td");
    \u0275\u0275text(4);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(5, "td");
    \u0275\u0275text(6);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(7, "td", 8)(8, "app-button", 9);
    \u0275\u0275listener("click", function AdminGenresComponent_Conditional_7_For_14_Template_app_button_click_8_listener() {
      const genre_r2 = \u0275\u0275restoreView(_r1).$implicit;
      const ctx_r2 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r2.editGenre(genre_r2.id));
    });
    \u0275\u0275text(9, " Editar ");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(10, "app-button", 10);
    \u0275\u0275listener("click", function AdminGenresComponent_Conditional_7_For_14_Template_app_button_click_10_listener() {
      const genre_r2 = \u0275\u0275restoreView(_r1).$implicit;
      const ctx_r2 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r2.deleteGenre(genre_r2.id));
    });
    \u0275\u0275text(11, " Eliminar ");
    \u0275\u0275elementEnd()()();
  }
  if (rf & 2) {
    const genre_r2 = ctx.$implicit;
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(genre_r2.name);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(genre_r2.description);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(genre_r2.albumCount);
  }
}
function AdminGenresComponent_Conditional_7_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 4)(1, "table", 7)(2, "thead")(3, "tr")(4, "th");
    \u0275\u0275text(5, "Nombre");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(6, "th");
    \u0275\u0275text(7, "Descripci\xF3n");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(8, "th");
    \u0275\u0275text(9, "\xC1lbumes");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(10, "th");
    \u0275\u0275text(11, "Acciones");
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(12, "tbody");
    \u0275\u0275repeaterCreate(13, AdminGenresComponent_Conditional_7_For_14_Template, 12, 3, "tr", null, _forTrack0);
    \u0275\u0275elementEnd()()();
  }
  if (rf & 2) {
    const ctx_r2 = \u0275\u0275nextContext();
    \u0275\u0275advance(13);
    \u0275\u0275repeater(ctx_r2.genres());
  }
}
var AdminGenresComponent = class _AdminGenresComponent {
  genres = signal([], ...ngDevMode ? [{ debugName: "genres" }] : []);
  createGenre() {
    console.log("Crear g\xE9nero");
  }
  editGenre(id) {
    console.log("Editar g\xE9nero:", id);
  }
  deleteGenre(id) {
    console.log("Eliminar g\xE9nero:", id);
  }
  static \u0275fac = function AdminGenresComponent_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _AdminGenresComponent)();
  };
  static \u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _AdminGenresComponent, selectors: [["app-admin-genres"]], decls: 8, vars: 1, consts: [[1, "content-section"], [1, "section-header"], ["variant", "primary", 3, "click"], [1, "empty-state"], [1, "genres-table"], [1, "empty-text"], [1, "empty-hint"], [1, "data-table"], [1, "actions"], ["variant", "secondary", "size", "sm", 3, "click"], ["variant", "danger", "size", "sm", 3, "click"]], template: function AdminGenresComponent_Template(rf, ctx) {
    if (rf & 1) {
      \u0275\u0275elementStart(0, "div", 0)(1, "div", 1)(2, "h2");
      \u0275\u0275text(3, "Gesti\xF3n de G\xE9neros");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(4, "app-button", 2);
      \u0275\u0275listener("click", function AdminGenresComponent_Template_app_button_click_4_listener() {
        return ctx.createGenre();
      });
      \u0275\u0275text(5, " + Nuevo G\xE9nero ");
      \u0275\u0275elementEnd()();
      \u0275\u0275conditionalCreate(6, AdminGenresComponent_Conditional_6_Template, 5, 0, "div", 3)(7, AdminGenresComponent_Conditional_7_Template, 15, 0, "div", 4);
      \u0275\u0275elementEnd();
    }
    if (rf & 2) {
      \u0275\u0275advance(6);
      \u0275\u0275conditional(ctx.genres().length === 0 ? 6 : 7);
    }
  }, dependencies: [CommonModule, Button], styles: ['@charset "UTF-8";\n\n\n\n.content-section[_ngcontent-%COMP%] {\n  background: var(--bg-secondary);\n  border-radius: 8px;\n  padding: 2rem;\n}\n.section-header[_ngcontent-%COMP%] {\n  display: flex;\n  justify-content: space-between;\n  align-items: center;\n  margin-bottom: 2rem;\n}\n.section-header[_ngcontent-%COMP%]   h2[_ngcontent-%COMP%] {\n  font-size: 1.625rem;\n  font-weight: 600;\n  color: var(--text-primary);\n  margin: 0;\n}\n.empty-state[_ngcontent-%COMP%] {\n  text-align: center;\n  padding: 4rem;\n  color: var(--text-secondary);\n}\n.empty-state[_ngcontent-%COMP%]   .empty-text[_ngcontent-%COMP%] {\n  font-size: 1rem;\n  margin-bottom: 0.5rem;\n}\n.empty-state[_ngcontent-%COMP%]   .empty-hint[_ngcontent-%COMP%] {\n  font-size: 0.875rem;\n  opacity: 0.7;\n}\n.data-table[_ngcontent-%COMP%] {\n  width: 100%;\n  border-collapse: collapse;\n}\n.data-table[_ngcontent-%COMP%]   th[_ngcontent-%COMP%], \n.data-table[_ngcontent-%COMP%]   td[_ngcontent-%COMP%] {\n  padding: 1rem;\n  text-align: left;\n  border-bottom: 1px solid var(--border-color);\n}\n.data-table[_ngcontent-%COMP%]   th[_ngcontent-%COMP%] {\n  font-weight: 600;\n  color: var(--text-secondary);\n  font-size: 0.875rem;\n  text-transform: uppercase;\n}\n.data-table[_ngcontent-%COMP%]   td[_ngcontent-%COMP%] {\n  color: var(--text-primary);\n}\n.data-table[_ngcontent-%COMP%]   .actions[_ngcontent-%COMP%] {\n  display: flex;\n  gap: 0.5rem;\n}\n/*# sourceMappingURL=genres.css.map */'] });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(AdminGenresComponent, [{
    type: Component,
    args: [{ selector: "app-admin-genres", standalone: true, imports: [CommonModule, Button], template: '<div class="content-section">\r\n  <div class="section-header">\r\n    <h2>Gesti\xF3n de G\xE9neros</h2>\r\n    <app-button (click)="createGenre()" variant="primary">\r\n      + Nuevo G\xE9nero\r\n    </app-button>\r\n  </div>\r\n\r\n  @if (genres().length === 0) {\r\n    <div class="empty-state">\r\n      <p class="empty-text">No hay g\xE9neros registrados</p>\r\n      <p class="empty-hint">Crea el primer g\xE9nero musical</p>\r\n    </div>\r\n  } @else {\r\n    <div class="genres-table">\r\n      <table class="data-table">\r\n        <thead>\r\n          <tr>\r\n            <th>Nombre</th>\r\n            <th>Descripci\xF3n</th>\r\n            <th>\xC1lbumes</th>\r\n            <th>Acciones</th>\r\n          </tr>\r\n        </thead>\r\n        <tbody>\r\n          @for (genre of genres(); track genre.id) {\r\n            <tr>\r\n              <td>{{ genre.name }}</td>\r\n              <td>{{ genre.description }}</td>\r\n              <td>{{ genre.albumCount }}</td>\r\n              <td class="actions">\r\n                <app-button variant="secondary" size="sm" (click)="editGenre(genre.id)">\r\n                  Editar\r\n                </app-button>\r\n                <app-button variant="danger" size="sm" (click)="deleteGenre(genre.id)">\r\n                  Eliminar\r\n                </app-button>\r\n              </td>\r\n            </tr>\r\n          }\r\n        </tbody>\r\n      </table>\r\n    </div>\r\n  }\r\n</div>\r\n', styles: ['@charset "UTF-8";\n\n/* src/app/pages/admin/genres/genres.scss */\n.content-section {\n  background: var(--bg-secondary);\n  border-radius: 8px;\n  padding: 2rem;\n}\n.section-header {\n  display: flex;\n  justify-content: space-between;\n  align-items: center;\n  margin-bottom: 2rem;\n}\n.section-header h2 {\n  font-size: 1.625rem;\n  font-weight: 600;\n  color: var(--text-primary);\n  margin: 0;\n}\n.empty-state {\n  text-align: center;\n  padding: 4rem;\n  color: var(--text-secondary);\n}\n.empty-state .empty-text {\n  font-size: 1rem;\n  margin-bottom: 0.5rem;\n}\n.empty-state .empty-hint {\n  font-size: 0.875rem;\n  opacity: 0.7;\n}\n.data-table {\n  width: 100%;\n  border-collapse: collapse;\n}\n.data-table th,\n.data-table td {\n  padding: 1rem;\n  text-align: left;\n  border-bottom: 1px solid var(--border-color);\n}\n.data-table th {\n  font-weight: 600;\n  color: var(--text-secondary);\n  font-size: 0.875rem;\n  text-transform: uppercase;\n}\n.data-table td {\n  color: var(--text-primary);\n}\n.data-table .actions {\n  display: flex;\n  gap: 0.5rem;\n}\n/*# sourceMappingURL=genres.css.map */\n'] }]
  }], null, null);
})();
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(AdminGenresComponent, { className: "AdminGenresComponent", filePath: "src/app/pages/admin/genres/genres.ts", lineNumber: 19 });
})();
export {
  AdminGenresComponent as default
};
//# sourceMappingURL=chunk-SOEW43JQ.js.map
