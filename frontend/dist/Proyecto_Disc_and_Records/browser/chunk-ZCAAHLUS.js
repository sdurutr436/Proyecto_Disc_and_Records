import {
  Button
} from "./chunk-QEXKGZ6Y.js";
import "./chunk-MBYWNRDU.js";
import {
  CommonModule,
  Component,
  DatePipe,
  setClassMetadata,
  signal,
  ɵsetClassDebugInfo,
  ɵɵadvance,
  ɵɵclassProp,
  ɵɵconditional,
  ɵɵconditionalCreate,
  ɵɵdefineComponent,
  ɵɵelementEnd,
  ɵɵelementStart,
  ɵɵgetCurrentView,
  ɵɵlistener,
  ɵɵnextContext,
  ɵɵpipe,
  ɵɵpipeBind2,
  ɵɵrepeater,
  ɵɵrepeaterCreate,
  ɵɵresetView,
  ɵɵrestoreView,
  ɵɵtext,
  ɵɵtextInterpolate,
  ɵɵtextInterpolate1
} from "./chunk-PFYGRVXA.js";

// src/app/pages/admin/users/users.ts
var _forTrack0 = ($index, $item) => $item.id;
function AdminUsersComponent_Conditional_4_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 2)(1, "p", 4);
    \u0275\u0275text(2, "No hay usuarios registrados");
    \u0275\u0275elementEnd()();
  }
}
function AdminUsersComponent_Conditional_5_For_16_Template(rf, ctx) {
  if (rf & 1) {
    const _r1 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "tr")(1, "td");
    \u0275\u0275text(2);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "td");
    \u0275\u0275text(4);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(5, "td")(6, "span", 6);
    \u0275\u0275text(7);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(8, "td");
    \u0275\u0275text(9);
    \u0275\u0275pipe(10, "date");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(11, "td", 7)(12, "app-button", 8);
    \u0275\u0275listener("click", function AdminUsersComponent_Conditional_5_For_16_Template_app_button_click_12_listener() {
      const user_r2 = \u0275\u0275restoreView(_r1).$implicit;
      const ctx_r2 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r2.editUser(user_r2.id));
    });
    \u0275\u0275text(13, " Editar ");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(14, "app-button", 9);
    \u0275\u0275listener("click", function AdminUsersComponent_Conditional_5_For_16_Template_app_button_click_14_listener() {
      const user_r2 = \u0275\u0275restoreView(_r1).$implicit;
      const ctx_r2 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r2.deleteUser(user_r2.id));
    });
    \u0275\u0275text(15, " Eliminar ");
    \u0275\u0275elementEnd()()();
  }
  if (rf & 2) {
    const user_r2 = ctx.$implicit;
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(user_r2.username);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(user_r2.email);
    \u0275\u0275advance(2);
    \u0275\u0275classProp("admin", user_r2.role === "admin");
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", user_r2.role, " ");
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(\u0275\u0275pipeBind2(10, 6, user_r2.createdAt, "dd/MM/yyyy"));
  }
}
function AdminUsersComponent_Conditional_5_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 3)(1, "table", 5)(2, "thead")(3, "tr")(4, "th");
    \u0275\u0275text(5, "Usuario");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(6, "th");
    \u0275\u0275text(7, "Email");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(8, "th");
    \u0275\u0275text(9, "Rol");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(10, "th");
    \u0275\u0275text(11, "Fecha Registro");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(12, "th");
    \u0275\u0275text(13, "Acciones");
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(14, "tbody");
    \u0275\u0275repeaterCreate(15, AdminUsersComponent_Conditional_5_For_16_Template, 16, 9, "tr", null, _forTrack0);
    \u0275\u0275elementEnd()()();
  }
  if (rf & 2) {
    const ctx_r2 = \u0275\u0275nextContext();
    \u0275\u0275advance(15);
    \u0275\u0275repeater(ctx_r2.users());
  }
}
var AdminUsersComponent = class _AdminUsersComponent {
  users = signal([], ...ngDevMode ? [{ debugName: "users" }] : []);
  editUser(id) {
    console.log("Editar usuario:", id);
  }
  deleteUser(id) {
    console.log("Eliminar usuario:", id);
  }
  static \u0275fac = function AdminUsersComponent_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _AdminUsersComponent)();
  };
  static \u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _AdminUsersComponent, selectors: [["app-admin-users"]], decls: 6, vars: 1, consts: [[1, "content-section"], [1, "section-header"], [1, "empty-state"], [1, "users-table"], [1, "empty-text"], [1, "data-table"], [1, "role-badge"], [1, "actions"], ["variant", "secondary", "size", "sm", 3, "click"], ["variant", "danger", "size", "sm", 3, "click"]], template: function AdminUsersComponent_Template(rf, ctx) {
    if (rf & 1) {
      \u0275\u0275elementStart(0, "div", 0)(1, "div", 1)(2, "h2");
      \u0275\u0275text(3, "Gesti\xF3n de Usuarios");
      \u0275\u0275elementEnd()();
      \u0275\u0275conditionalCreate(4, AdminUsersComponent_Conditional_4_Template, 3, 0, "div", 2)(5, AdminUsersComponent_Conditional_5_Template, 17, 0, "div", 3);
      \u0275\u0275elementEnd();
    }
    if (rf & 2) {
      \u0275\u0275advance(4);
      \u0275\u0275conditional(ctx.users().length === 0 ? 4 : 5);
    }
  }, dependencies: [CommonModule, Button, DatePipe], styles: ['@charset "UTF-8";\n\n\n\n.content-section[_ngcontent-%COMP%] {\n  background: var(--bg-secondary);\n  border-radius: 8px;\n  padding: 2rem;\n}\n.section-header[_ngcontent-%COMP%] {\n  display: flex;\n  justify-content: space-between;\n  align-items: center;\n  margin-bottom: 2rem;\n}\n.section-header[_ngcontent-%COMP%]   h2[_ngcontent-%COMP%] {\n  font-size: 1.625rem;\n  font-weight: 600;\n  color: var(--text-primary);\n  margin: 0;\n}\n.empty-state[_ngcontent-%COMP%] {\n  text-align: center;\n  padding: 4rem;\n  color: var(--text-secondary);\n}\n.empty-state[_ngcontent-%COMP%]   .empty-text[_ngcontent-%COMP%] {\n  font-size: 1rem;\n  margin-bottom: 0.5rem;\n}\n.data-table[_ngcontent-%COMP%] {\n  width: 100%;\n  border-collapse: collapse;\n}\n.data-table[_ngcontent-%COMP%]   th[_ngcontent-%COMP%], \n.data-table[_ngcontent-%COMP%]   td[_ngcontent-%COMP%] {\n  padding: 1rem;\n  text-align: left;\n  border-bottom: 1px solid var(--border-color);\n}\n.data-table[_ngcontent-%COMP%]   th[_ngcontent-%COMP%] {\n  font-weight: 600;\n  color: var(--text-secondary);\n  font-size: 0.875rem;\n  text-transform: uppercase;\n}\n.data-table[_ngcontent-%COMP%]   td[_ngcontent-%COMP%] {\n  color: var(--text-primary);\n}\n.data-table[_ngcontent-%COMP%]   .actions[_ngcontent-%COMP%] {\n  display: flex;\n  gap: 0.5rem;\n}\n.role-badge[_ngcontent-%COMP%] {\n  display: inline-block;\n  padding: 0.5rem 1rem;\n  border-radius: 4px;\n  font-size: 0.75rem;\n  font-weight: 600;\n  text-transform: uppercase;\n  background: var(--bg-tertiary);\n  color: var(--text-secondary);\n}\n.role-badge.admin[_ngcontent-%COMP%] {\n  background: var(--color-primary);\n  color: white;\n}\n/*# sourceMappingURL=users.css.map */'] });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(AdminUsersComponent, [{
    type: Component,
    args: [{ selector: "app-admin-users", standalone: true, imports: [CommonModule, Button], template: `<div class="content-section">\r
  <div class="section-header">\r
    <h2>Gesti\xF3n de Usuarios</h2>\r
  </div>\r
\r
  @if (users().length === 0) {\r
    <div class="empty-state">\r
      <p class="empty-text">No hay usuarios registrados</p>\r
    </div>\r
  } @else {\r
    <div class="users-table">\r
      <table class="data-table">\r
        <thead>\r
          <tr>\r
            <th>Usuario</th>\r
            <th>Email</th>\r
            <th>Rol</th>\r
            <th>Fecha Registro</th>\r
            <th>Acciones</th>\r
          </tr>\r
        </thead>\r
        <tbody>\r
          @for (user of users(); track user.id) {\r
            <tr>\r
              <td>{{ user.username }}</td>\r
              <td>{{ user.email }}</td>\r
              <td>\r
                <span class="role-badge" [class.admin]="user.role === 'admin'">\r
                  {{ user.role }}\r
                </span>\r
              </td>\r
              <td>{{ user.createdAt | date:'dd/MM/yyyy' }}</td>\r
              <td class="actions">\r
                <app-button variant="secondary" size="sm" (click)="editUser(user.id)">\r
                  Editar\r
                </app-button>\r
                <app-button variant="danger" size="sm" (click)="deleteUser(user.id)">\r
                  Eliminar\r
                </app-button>\r
              </td>\r
            </tr>\r
          }\r
        </tbody>\r
      </table>\r
    </div>\r
  }\r
</div>\r
`, styles: ['@charset "UTF-8";\n\n/* src/app/pages/admin/users/users.scss */\n.content-section {\n  background: var(--bg-secondary);\n  border-radius: 8px;\n  padding: 2rem;\n}\n.section-header {\n  display: flex;\n  justify-content: space-between;\n  align-items: center;\n  margin-bottom: 2rem;\n}\n.section-header h2 {\n  font-size: 1.625rem;\n  font-weight: 600;\n  color: var(--text-primary);\n  margin: 0;\n}\n.empty-state {\n  text-align: center;\n  padding: 4rem;\n  color: var(--text-secondary);\n}\n.empty-state .empty-text {\n  font-size: 1rem;\n  margin-bottom: 0.5rem;\n}\n.data-table {\n  width: 100%;\n  border-collapse: collapse;\n}\n.data-table th,\n.data-table td {\n  padding: 1rem;\n  text-align: left;\n  border-bottom: 1px solid var(--border-color);\n}\n.data-table th {\n  font-weight: 600;\n  color: var(--text-secondary);\n  font-size: 0.875rem;\n  text-transform: uppercase;\n}\n.data-table td {\n  color: var(--text-primary);\n}\n.data-table .actions {\n  display: flex;\n  gap: 0.5rem;\n}\n.role-badge {\n  display: inline-block;\n  padding: 0.5rem 1rem;\n  border-radius: 4px;\n  font-size: 0.75rem;\n  font-weight: 600;\n  text-transform: uppercase;\n  background: var(--bg-tertiary);\n  color: var(--text-secondary);\n}\n.role-badge.admin {\n  background: var(--color-primary);\n  color: white;\n}\n/*# sourceMappingURL=users.css.map */\n'] }]
  }], null, null);
})();
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(AdminUsersComponent, { className: "AdminUsersComponent", filePath: "src/app/pages/admin/users/users.ts", lineNumber: 20 });
})();
export {
  AdminUsersComponent as default
};
//# sourceMappingURL=chunk-ZCAAHLUS.js.map
