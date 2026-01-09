import {
  RouterLink,
  RouterLinkActive,
  RouterOutlet
} from "./chunk-BFARIXWD.js";
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
  ɵɵdefineComponent,
  ɵɵelement,
  ɵɵelementEnd,
  ɵɵelementStart,
  ɵɵproperty,
  ɵɵpureFunction1,
  ɵɵrepeater,
  ɵɵrepeaterCreate,
  ɵɵtext,
  ɵɵtextInterpolate,
  ɵɵtextInterpolate1
} from "./chunk-PFYGRVXA.js";

// src/app/pages/admin/admin.ts
var _c0 = (a0) => ["/admin", a0];
var _forTrack0 = ($index, $item) => $item.id;
function AdminComponent_For_35_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "a", 12);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const tab_r1 = ctx.$implicit;
    \u0275\u0275property("routerLink", \u0275\u0275pureFunction1(2, _c0, tab_r1.id));
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", tab_r1.label, " ");
  }
}
var AdminComponent = class _AdminComponent {
  // Tabs de navegación - ahora con rutas
  tabs = [
    { id: "albums", label: "\xC1lbumes" },
    { id: "users", label: "Usuarios" },
    { id: "genres", label: "G\xE9neros" },
    { id: "reviews", label: "Rese\xF1as" }
  ];
  stats = signal({
    totalAlbums: 0,
    totalUsers: 0,
    totalReviews: 0,
    totalGenres: 0
  }, ...ngDevMode ? [{ debugName: "stats" }] : []);
  constructor() {
    this.loadMockData();
  }
  loadMockData() {
    this.stats.set({
      totalAlbums: 0,
      totalUsers: 0,
      totalReviews: 0,
      totalGenres: 0
    });
  }
  static \u0275fac = function AdminComponent_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _AdminComponent)();
  };
  static \u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _AdminComponent, selectors: [["app-admin"]], decls: 38, vars: 4, consts: [[1, "admin-container"], [1, "admin-header"], [1, "header-content"], [1, "admin-title"], ["routerLink", "/", 1, "back-button"], ["variant", "secondary", "size", "sm"], [1, "stats-section"], [1, "stat-card"], [1, "stat-content"], [1, "stat-label"], [1, "stat-value"], [1, "admin-tabs"], ["routerLinkActive", "active", 1, "tab-button", 3, "routerLink"], [1, "admin-content"]], template: function AdminComponent_Template(rf, ctx) {
    if (rf & 1) {
      \u0275\u0275elementStart(0, "div", 0)(1, "header", 1)(2, "div", 2)(3, "h1", 3);
      \u0275\u0275text(4, "Panel de Administraci\xF3n");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(5, "a", 4)(6, "app-button", 5);
      \u0275\u0275text(7, "\u2190 Volver al sitio");
      \u0275\u0275elementEnd()()()();
      \u0275\u0275elementStart(8, "section", 6)(9, "div", 7)(10, "div", 8)(11, "p", 9);
      \u0275\u0275text(12, "\xC1lbumes");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(13, "p", 10);
      \u0275\u0275text(14);
      \u0275\u0275elementEnd()()();
      \u0275\u0275elementStart(15, "div", 7)(16, "div", 8)(17, "p", 9);
      \u0275\u0275text(18, "Usuarios");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(19, "p", 10);
      \u0275\u0275text(20);
      \u0275\u0275elementEnd()()();
      \u0275\u0275elementStart(21, "div", 7)(22, "div", 8)(23, "p", 9);
      \u0275\u0275text(24, "Rese\xF1as");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(25, "p", 10);
      \u0275\u0275text(26);
      \u0275\u0275elementEnd()()();
      \u0275\u0275elementStart(27, "div", 7)(28, "div", 8)(29, "p", 9);
      \u0275\u0275text(30, "G\xE9neros");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(31, "p", 10);
      \u0275\u0275text(32);
      \u0275\u0275elementEnd()()()();
      \u0275\u0275elementStart(33, "nav", 11);
      \u0275\u0275repeaterCreate(34, AdminComponent_For_35_Template, 2, 4, "a", 12, _forTrack0);
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(36, "main", 13);
      \u0275\u0275element(37, "router-outlet");
      \u0275\u0275elementEnd()();
    }
    if (rf & 2) {
      \u0275\u0275advance(14);
      \u0275\u0275textInterpolate(ctx.stats().totalAlbums);
      \u0275\u0275advance(6);
      \u0275\u0275textInterpolate(ctx.stats().totalUsers);
      \u0275\u0275advance(6);
      \u0275\u0275textInterpolate(ctx.stats().totalReviews);
      \u0275\u0275advance(6);
      \u0275\u0275textInterpolate(ctx.stats().totalGenres);
      \u0275\u0275advance(2);
      \u0275\u0275repeater(ctx.tabs);
    }
  }, dependencies: [CommonModule, RouterLink, RouterLinkActive, RouterOutlet, Button], styles: ['@charset "UTF-8";\n\n\n\n.admin-container[_ngcontent-%COMP%] {\n  min-height: 100vh;\n  background: var(--bg-primary);\n  padding-bottom: 4rem;\n}\n.admin-header[_ngcontent-%COMP%] {\n  background: var(--bg-secondary);\n  border-bottom: 4px solid var(--border-color);\n  box-shadow: 6px 6px 0px #01131B;\n  padding: 2rem;\n}\n.header-content[_ngcontent-%COMP%] {\n  max-width: 1440px;\n  margin: 0 auto;\n  display: flex;\n  justify-content: space-between;\n  align-items: center;\n  gap: 2rem;\n}\n.admin-title[_ngcontent-%COMP%] {\n  font-size: 2.625rem;\n  font-weight: 700;\n  color: var(--text-primary);\n  margin: 0;\n}\n.back-button[_ngcontent-%COMP%] {\n  text-decoration: none;\n}\n.stats-section[_ngcontent-%COMP%] {\n  max-width: 1440px;\n  margin: 0 auto;\n  padding: 3rem 2rem;\n  display: grid;\n  grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));\n  gap: 2rem;\n}\n.stat-card[_ngcontent-%COMP%] {\n  background: var(--bg-secondary);\n  border: 4px solid var(--border-color);\n  box-shadow: 4px 4px 0px #01131B;\n  padding: 2rem;\n  transition: 300ms ease-in-out;\n}\n.stat-card[_ngcontent-%COMP%]:hover {\n  box-shadow: 6px 6px 0px #01131B;\n  transform: translateY(-2px);\n}\n.stat-content[_ngcontent-%COMP%] {\n  flex: 1;\n}\n.stat-label[_ngcontent-%COMP%] {\n  font-size: 0.875rem;\n  color: var(--text-secondary);\n  margin: 0 0 0.5rem 0;\n  text-transform: uppercase;\n  letter-spacing: 0.02em;\n  font-weight: 600;\n}\n.stat-value[_ngcontent-%COMP%] {\n  font-size: 1.625rem;\n  font-weight: 700;\n  color: var(--text-primary);\n  margin: 0;\n}\n.admin-tabs[_ngcontent-%COMP%] {\n  max-width: 1440px;\n  margin: 0 auto;\n  padding: 0 2rem;\n  display: flex;\n  gap: 1rem;\n  border-bottom: 2px solid var(--border-color);\n  overflow-x: auto;\n}\n.tab-button[_ngcontent-%COMP%] {\n  padding: 2rem 3rem;\n  background: transparent;\n  border: none;\n  border-bottom: 3px solid transparent;\n  color: var(--text-secondary);\n  font-size: 1rem;\n  font-weight: 600;\n  cursor: pointer;\n  transition: 150ms ease-in-out;\n  white-space: nowrap;\n}\n.tab-button[_ngcontent-%COMP%]:hover {\n  color: var(--text-primary);\n  background: var(--bg-tertiary);\n}\n.tab-button.active[_ngcontent-%COMP%] {\n  color: var(--color-primary);\n  border-bottom-color: var(--color-primary);\n  background: var(--bg-tertiary);\n}\n.admin-content[_ngcontent-%COMP%] {\n  max-width: 1440px;\n  margin: 0 auto;\n  padding: 3rem 2rem;\n}\n.content-section[_ngcontent-%COMP%] {\n  background: var(--bg-secondary);\n  border: 4px solid var(--border-color);\n  box-shadow: 6px 6px 0px #01131B;\n  padding: 3rem;\n  min-height: 400px;\n}\n.section-header[_ngcontent-%COMP%] {\n  display: flex;\n  justify-content: space-between;\n  align-items: center;\n  margin-bottom: 3rem;\n  padding-bottom: 2rem;\n  border-bottom: 2px solid var(--border-color);\n}\n.section-header[_ngcontent-%COMP%]   h2[_ngcontent-%COMP%] {\n  font-size: 1.625rem;\n  font-weight: 700;\n  color: var(--text-primary);\n  margin: 0;\n}\n.empty-state[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n  justify-content: center;\n  padding: 5rem;\n  text-align: center;\n}\n.empty-text[_ngcontent-%COMP%] {\n  font-size: 1rem;\n  font-weight: 600;\n  color: var(--text-secondary);\n  margin: 0 0 0.5rem 0;\n}\n.empty-hint[_ngcontent-%COMP%] {\n  font-size: 0.875rem;\n  color: var(--text-tertiary);\n  margin: 0;\n}\n@media (max-width: 768px) {\n  .header-content[_ngcontent-%COMP%] {\n    flex-direction: column;\n    align-items: flex-start;\n  }\n  .stats-section[_ngcontent-%COMP%] {\n    grid-template-columns: repeat(auto-fit, minmax(160px, 1fr));\n    gap: 1rem;\n  }\n  .stat-card[_ngcontent-%COMP%] {\n    text-align: center;\n  }\n  .admin-tabs[_ngcontent-%COMP%] {\n    padding: 0 1rem;\n  }\n  .tab-button[_ngcontent-%COMP%] {\n    padding: 1rem 2rem;\n  }\n  .admin-content[_ngcontent-%COMP%] {\n    padding: 2rem 1rem;\n  }\n  .content-section[_ngcontent-%COMP%] {\n    padding: 2rem;\n  }\n  .section-header[_ngcontent-%COMP%] {\n    flex-direction: column;\n    align-items: flex-start;\n    gap: 2rem;\n  }\n}\n/*# sourceMappingURL=admin.css.map */'] });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(AdminComponent, [{
    type: Component,
    args: [{ selector: "app-admin", imports: [CommonModule, RouterLink, RouterLinkActive, RouterOutlet, Button], standalone: true, template: `<div class="admin-container">\r
  <!-- Header -->\r
  <header class="admin-header">\r
    <div class="header-content">\r
      <h1 class="admin-title">Panel de Administraci\xF3n</h1>\r
      <a routerLink="/" class="back-button">\r
        <app-button variant="secondary" size="sm">\u2190 Volver al sitio</app-button>\r
      </a>\r
    </div>\r
  </header>\r
\r
  <!-- Stats Dashboard -->\r
  <section class="stats-section">\r
    <div class="stat-card">\r
      <div class="stat-content">\r
        <p class="stat-label">\xC1lbumes</p>\r
        <p class="stat-value">{{ stats().totalAlbums }}</p>\r
      </div>\r
    </div>\r
\r
    <div class="stat-card">\r
      <div class="stat-content">\r
        <p class="stat-label">Usuarios</p>\r
        <p class="stat-value">{{ stats().totalUsers }}</p>\r
      </div>\r
    </div>\r
\r
    <div class="stat-card">\r
      <div class="stat-content">\r
        <p class="stat-label">Rese\xF1as</p>\r
        <p class="stat-value">{{ stats().totalReviews }}</p>\r
      </div>\r
    </div>\r
\r
    <div class="stat-card">\r
      <div class="stat-content">\r
        <p class="stat-label">G\xE9neros</p>\r
        <p class="stat-value">{{ stats().totalGenres }}</p>\r
      </div>\r
    </div>\r
  </section>\r
\r
  <!-- Tabs Navigation -->\r
  <nav class="admin-tabs">\r
    @for (tab of tabs; track tab.id) {\r
      <a\r
        class="tab-button"\r
        [routerLink]="['/admin', tab.id]"\r
        routerLinkActive="active"\r
      >\r
        {{ tab.label }}\r
      </a>\r
    }\r
  </nav>\r
\r
  <!-- Content Area - Router Outlet para rutas hijas -->\r
  <main class="admin-content">\r
    <router-outlet></router-outlet>\r
  </main>\r
</div>\r
`, styles: ['@charset "UTF-8";\n\n/* src/app/pages/admin/admin.scss */\n.admin-container {\n  min-height: 100vh;\n  background: var(--bg-primary);\n  padding-bottom: 4rem;\n}\n.admin-header {\n  background: var(--bg-secondary);\n  border-bottom: 4px solid var(--border-color);\n  box-shadow: 6px 6px 0px #01131B;\n  padding: 2rem;\n}\n.header-content {\n  max-width: 1440px;\n  margin: 0 auto;\n  display: flex;\n  justify-content: space-between;\n  align-items: center;\n  gap: 2rem;\n}\n.admin-title {\n  font-size: 2.625rem;\n  font-weight: 700;\n  color: var(--text-primary);\n  margin: 0;\n}\n.back-button {\n  text-decoration: none;\n}\n.stats-section {\n  max-width: 1440px;\n  margin: 0 auto;\n  padding: 3rem 2rem;\n  display: grid;\n  grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));\n  gap: 2rem;\n}\n.stat-card {\n  background: var(--bg-secondary);\n  border: 4px solid var(--border-color);\n  box-shadow: 4px 4px 0px #01131B;\n  padding: 2rem;\n  transition: 300ms ease-in-out;\n}\n.stat-card:hover {\n  box-shadow: 6px 6px 0px #01131B;\n  transform: translateY(-2px);\n}\n.stat-content {\n  flex: 1;\n}\n.stat-label {\n  font-size: 0.875rem;\n  color: var(--text-secondary);\n  margin: 0 0 0.5rem 0;\n  text-transform: uppercase;\n  letter-spacing: 0.02em;\n  font-weight: 600;\n}\n.stat-value {\n  font-size: 1.625rem;\n  font-weight: 700;\n  color: var(--text-primary);\n  margin: 0;\n}\n.admin-tabs {\n  max-width: 1440px;\n  margin: 0 auto;\n  padding: 0 2rem;\n  display: flex;\n  gap: 1rem;\n  border-bottom: 2px solid var(--border-color);\n  overflow-x: auto;\n}\n.tab-button {\n  padding: 2rem 3rem;\n  background: transparent;\n  border: none;\n  border-bottom: 3px solid transparent;\n  color: var(--text-secondary);\n  font-size: 1rem;\n  font-weight: 600;\n  cursor: pointer;\n  transition: 150ms ease-in-out;\n  white-space: nowrap;\n}\n.tab-button:hover {\n  color: var(--text-primary);\n  background: var(--bg-tertiary);\n}\n.tab-button.active {\n  color: var(--color-primary);\n  border-bottom-color: var(--color-primary);\n  background: var(--bg-tertiary);\n}\n.admin-content {\n  max-width: 1440px;\n  margin: 0 auto;\n  padding: 3rem 2rem;\n}\n.content-section {\n  background: var(--bg-secondary);\n  border: 4px solid var(--border-color);\n  box-shadow: 6px 6px 0px #01131B;\n  padding: 3rem;\n  min-height: 400px;\n}\n.section-header {\n  display: flex;\n  justify-content: space-between;\n  align-items: center;\n  margin-bottom: 3rem;\n  padding-bottom: 2rem;\n  border-bottom: 2px solid var(--border-color);\n}\n.section-header h2 {\n  font-size: 1.625rem;\n  font-weight: 700;\n  color: var(--text-primary);\n  margin: 0;\n}\n.empty-state {\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n  justify-content: center;\n  padding: 5rem;\n  text-align: center;\n}\n.empty-text {\n  font-size: 1rem;\n  font-weight: 600;\n  color: var(--text-secondary);\n  margin: 0 0 0.5rem 0;\n}\n.empty-hint {\n  font-size: 0.875rem;\n  color: var(--text-tertiary);\n  margin: 0;\n}\n@media (max-width: 768px) {\n  .header-content {\n    flex-direction: column;\n    align-items: flex-start;\n  }\n  .stats-section {\n    grid-template-columns: repeat(auto-fit, minmax(160px, 1fr));\n    gap: 1rem;\n  }\n  .stat-card {\n    text-align: center;\n  }\n  .admin-tabs {\n    padding: 0 1rem;\n  }\n  .tab-button {\n    padding: 1rem 2rem;\n  }\n  .admin-content {\n    padding: 2rem 1rem;\n  }\n  .content-section {\n    padding: 2rem;\n  }\n  .section-header {\n    flex-direction: column;\n    align-items: flex-start;\n    gap: 2rem;\n  }\n}\n/*# sourceMappingURL=admin.css.map */\n'] }]
  }], () => [], null);
})();
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(AdminComponent, { className: "AdminComponent", filePath: "src/app/pages/admin/admin.ts", lineNumber: 25 });
})();
export {
  AdminComponent as default
};
//# sourceMappingURL=chunk-GQN5462T.js.map
