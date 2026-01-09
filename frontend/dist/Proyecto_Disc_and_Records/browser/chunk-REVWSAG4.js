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
  ɵɵclassMap,
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
  ɵɵpureFunction0,
  ɵɵrepeater,
  ɵɵrepeaterCreate,
  ɵɵrepeaterTrackByIdentity,
  ɵɵresetView,
  ɵɵrestoreView,
  ɵɵtext,
  ɵɵtextInterpolate,
  ɵɵtextInterpolate1
} from "./chunk-PFYGRVXA.js";

// src/app/pages/admin/reviews/reviews.ts
var _c0 = () => [1, 2, 3, 4, 5];
var _forTrack0 = ($index, $item) => $item.id;
function AdminReviewsComponent_Conditional_4_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 2)(1, "p", 4);
    \u0275\u0275text(2, "No hay rese\xF1as pendientes");
    \u0275\u0275elementEnd()();
  }
}
function AdminReviewsComponent_Conditional_5_For_2_For_9_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span", 18);
    \u0275\u0275text(1, "\u2605");
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const star_r2 = ctx.$implicit;
    const review_r3 = \u0275\u0275nextContext().$implicit;
    \u0275\u0275classProp("filled", star_r2 <= review_r3.rating);
  }
}
function AdminReviewsComponent_Conditional_5_For_2_Conditional_19_Template(rf, ctx) {
  if (rf & 1) {
    const _r4 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "app-button", 19);
    \u0275\u0275listener("click", function AdminReviewsComponent_Conditional_5_For_2_Conditional_19_Template_app_button_click_0_listener() {
      \u0275\u0275restoreView(_r4);
      const review_r3 = \u0275\u0275nextContext().$implicit;
      const ctx_r4 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r4.approveReview(review_r3.id));
    });
    \u0275\u0275text(1, " Aprobar ");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(2, "app-button", 20);
    \u0275\u0275listener("click", function AdminReviewsComponent_Conditional_5_For_2_Conditional_19_Template_app_button_click_2_listener() {
      \u0275\u0275restoreView(_r4);
      const review_r3 = \u0275\u0275nextContext().$implicit;
      const ctx_r4 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r4.rejectReview(review_r3.id));
    });
    \u0275\u0275text(3, " Rechazar ");
    \u0275\u0275elementEnd();
  }
}
function AdminReviewsComponent_Conditional_5_For_2_Template(rf, ctx) {
  if (rf & 1) {
    const _r1 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 5)(1, "div", 6)(2, "div", 7)(3, "span", 8);
    \u0275\u0275text(4);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(5, "span", 9);
    \u0275\u0275text(6);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(7, "div", 10);
    \u0275\u0275repeaterCreate(8, AdminReviewsComponent_Conditional_5_For_2_For_9_Template, 2, 2, "span", 11, \u0275\u0275repeaterTrackByIdentity);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(10, "p", 12);
    \u0275\u0275text(11);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(12, "div", 13)(13, "span", 14);
    \u0275\u0275text(14);
    \u0275\u0275pipe(15, "date");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(16, "span", 15);
    \u0275\u0275text(17);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(18, "div", 16);
    \u0275\u0275conditionalCreate(19, AdminReviewsComponent_Conditional_5_For_2_Conditional_19_Template, 4, 0);
    \u0275\u0275elementStart(20, "app-button", 17);
    \u0275\u0275listener("click", function AdminReviewsComponent_Conditional_5_For_2_Template_app_button_click_20_listener() {
      const review_r3 = \u0275\u0275restoreView(_r1).$implicit;
      const ctx_r4 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r4.deleteReview(review_r3.id));
    });
    \u0275\u0275text(21, " Eliminar ");
    \u0275\u0275elementEnd()()();
  }
  if (rf & 2) {
    const review_r3 = ctx.$implicit;
    \u0275\u0275advance(4);
    \u0275\u0275textInterpolate(review_r3.albumTitle);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate1("por ", review_r3.username);
    \u0275\u0275advance(2);
    \u0275\u0275repeater(\u0275\u0275pureFunction0(11, _c0));
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate(review_r3.content);
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate(\u0275\u0275pipeBind2(15, 8, review_r3.createdAt, "dd/MM/yyyy HH:mm"));
    \u0275\u0275advance(2);
    \u0275\u0275classMap(review_r3.status);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", review_r3.status === "pending" ? "Pendiente" : review_r3.status === "approved" ? "Aprobada" : "Rechazada", " ");
    \u0275\u0275advance(2);
    \u0275\u0275conditional(review_r3.status === "pending" ? 19 : -1);
  }
}
function AdminReviewsComponent_Conditional_5_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 3);
    \u0275\u0275repeaterCreate(1, AdminReviewsComponent_Conditional_5_For_2_Template, 22, 12, "div", 5, _forTrack0);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r4 = \u0275\u0275nextContext();
    \u0275\u0275advance();
    \u0275\u0275repeater(ctx_r4.reviews());
  }
}
var AdminReviewsComponent = class _AdminReviewsComponent {
  reviews = signal([], ...ngDevMode ? [{ debugName: "reviews" }] : []);
  approveReview(id) {
    console.log("Aprobar rese\xF1a:", id);
  }
  rejectReview(id) {
    console.log("Rechazar rese\xF1a:", id);
  }
  deleteReview(id) {
    console.log("Eliminar rese\xF1a:", id);
  }
  static \u0275fac = function AdminReviewsComponent_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _AdminReviewsComponent)();
  };
  static \u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _AdminReviewsComponent, selectors: [["app-admin-reviews"]], decls: 6, vars: 1, consts: [[1, "content-section"], [1, "section-header"], [1, "empty-state"], [1, "reviews-list"], [1, "empty-text"], [1, "review-card"], [1, "review-header"], [1, "review-info"], [1, "album-title"], [1, "username"], [1, "review-rating"], [1, "star", 3, "filled"], [1, "review-content"], [1, "review-footer"], [1, "review-date"], [1, "review-status"], [1, "review-actions"], ["variant", "danger", "size", "sm", 3, "click"], [1, "star"], ["variant", "primary", "size", "sm", 3, "click"], ["variant", "secondary", "size", "sm", 3, "click"]], template: function AdminReviewsComponent_Template(rf, ctx) {
    if (rf & 1) {
      \u0275\u0275elementStart(0, "div", 0)(1, "div", 1)(2, "h2");
      \u0275\u0275text(3, "Moderaci\xF3n de Rese\xF1as");
      \u0275\u0275elementEnd()();
      \u0275\u0275conditionalCreate(4, AdminReviewsComponent_Conditional_4_Template, 3, 0, "div", 2)(5, AdminReviewsComponent_Conditional_5_Template, 3, 0, "div", 3);
      \u0275\u0275elementEnd();
    }
    if (rf & 2) {
      \u0275\u0275advance(4);
      \u0275\u0275conditional(ctx.reviews().length === 0 ? 4 : 5);
    }
  }, dependencies: [CommonModule, Button, DatePipe], styles: ['@charset "UTF-8";\n\n\n\n.content-section[_ngcontent-%COMP%] {\n  background: var(--bg-secondary);\n  border-radius: 8px;\n  padding: 2rem;\n}\n.section-header[_ngcontent-%COMP%] {\n  display: flex;\n  justify-content: space-between;\n  align-items: center;\n  margin-bottom: 2rem;\n}\n.section-header[_ngcontent-%COMP%]   h2[_ngcontent-%COMP%] {\n  font-size: 1.625rem;\n  font-weight: 600;\n  color: var(--text-primary);\n  margin: 0;\n}\n.empty-state[_ngcontent-%COMP%] {\n  text-align: center;\n  padding: 4rem;\n  color: var(--text-secondary);\n}\n.empty-state[_ngcontent-%COMP%]   .empty-text[_ngcontent-%COMP%] {\n  font-size: 1rem;\n  margin-bottom: 0.5rem;\n}\n.reviews-list[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  gap: 1rem;\n}\n.review-card[_ngcontent-%COMP%] {\n  background: var(--bg-tertiary);\n  border-radius: 8px;\n  padding: 1rem;\n  border: 1px solid var(--border-color);\n}\n.review-header[_ngcontent-%COMP%] {\n  display: flex;\n  justify-content: space-between;\n  align-items: flex-start;\n  margin-bottom: 0.5rem;\n}\n.review-info[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  gap: 0.5rem;\n}\n.review-info[_ngcontent-%COMP%]   .album-title[_ngcontent-%COMP%] {\n  font-weight: 600;\n  color: var(--text-primary);\n}\n.review-info[_ngcontent-%COMP%]   .username[_ngcontent-%COMP%] {\n  font-size: 0.875rem;\n  color: var(--text-secondary);\n}\n.review-rating[_ngcontent-%COMP%]   .star[_ngcontent-%COMP%] {\n  color: var(--text-secondary);\n  font-size: 1rem;\n}\n.review-rating[_ngcontent-%COMP%]   .star.filled[_ngcontent-%COMP%] {\n  color: #FFC047;\n}\n.review-content[_ngcontent-%COMP%] {\n  color: var(--text-primary);\n  line-height: 1.5;\n  margin-bottom: 0.5rem;\n}\n.review-footer[_ngcontent-%COMP%] {\n  display: flex;\n  justify-content: space-between;\n  align-items: center;\n  margin-bottom: 0.5rem;\n  font-size: 0.875rem;\n}\n.review-footer[_ngcontent-%COMP%]   .review-date[_ngcontent-%COMP%] {\n  color: var(--text-secondary);\n}\n.review-footer[_ngcontent-%COMP%]   .review-status[_ngcontent-%COMP%] {\n  padding: 0.5rem 1rem;\n  border-radius: 4px;\n  font-weight: 600;\n  text-transform: uppercase;\n  font-size: 0.75rem;\n}\n.review-footer[_ngcontent-%COMP%]   .review-status.pending[_ngcontent-%COMP%] {\n  background: #FFC047;\n  color: #000;\n}\n.review-footer[_ngcontent-%COMP%]   .review-status.approved[_ngcontent-%COMP%] {\n  background: #AAD661;\n  color: white;\n}\n.review-footer[_ngcontent-%COMP%]   .review-status.rejected[_ngcontent-%COMP%] {\n  background: #E04A4A;\n  color: white;\n}\n.review-actions[_ngcontent-%COMP%] {\n  display: flex;\n  gap: 0.5rem;\n  justify-content: flex-end;\n}\n/*# sourceMappingURL=reviews.css.map */'] });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(AdminReviewsComponent, [{
    type: Component,
    args: [{ selector: "app-admin-reviews", standalone: true, imports: [CommonModule, Button], template: `<div class="content-section">\r
  <div class="section-header">\r
    <h2>Moderaci\xF3n de Rese\xF1as</h2>\r
  </div>\r
\r
  @if (reviews().length === 0) {\r
    <div class="empty-state">\r
      <p class="empty-text">No hay rese\xF1as pendientes</p>\r
    </div>\r
  } @else {\r
    <div class="reviews-list">\r
      @for (review of reviews(); track review.id) {\r
        <div class="review-card">\r
          <div class="review-header">\r
            <div class="review-info">\r
              <span class="album-title">{{ review.albumTitle }}</span>\r
              <span class="username">por {{ review.username }}</span>\r
            </div>\r
            <div class="review-rating">\r
              @for (star of [1, 2, 3, 4, 5]; track star) {\r
                <span class="star" [class.filled]="star <= review.rating">\u2605</span>\r
              }\r
            </div>\r
          </div>\r
          <p class="review-content">{{ review.content }}</p>\r
          <div class="review-footer">\r
            <span class="review-date">{{ review.createdAt | date:'dd/MM/yyyy HH:mm' }}</span>\r
            <span class="review-status" [class]="review.status">\r
              {{ review.status === 'pending' ? 'Pendiente' : review.status === 'approved' ? 'Aprobada' : 'Rechazada' }}\r
            </span>\r
          </div>\r
          <div class="review-actions">\r
            @if (review.status === 'pending') {\r
              <app-button variant="primary" size="sm" (click)="approveReview(review.id)">\r
                Aprobar\r
              </app-button>\r
              <app-button variant="secondary" size="sm" (click)="rejectReview(review.id)">\r
                Rechazar\r
              </app-button>\r
            }\r
            <app-button variant="danger" size="sm" (click)="deleteReview(review.id)">\r
              Eliminar\r
            </app-button>\r
          </div>\r
        </div>\r
      }\r
    </div>\r
  }\r
</div>\r
`, styles: ['@charset "UTF-8";\n\n/* src/app/pages/admin/reviews/reviews.scss */\n.content-section {\n  background: var(--bg-secondary);\n  border-radius: 8px;\n  padding: 2rem;\n}\n.section-header {\n  display: flex;\n  justify-content: space-between;\n  align-items: center;\n  margin-bottom: 2rem;\n}\n.section-header h2 {\n  font-size: 1.625rem;\n  font-weight: 600;\n  color: var(--text-primary);\n  margin: 0;\n}\n.empty-state {\n  text-align: center;\n  padding: 4rem;\n  color: var(--text-secondary);\n}\n.empty-state .empty-text {\n  font-size: 1rem;\n  margin-bottom: 0.5rem;\n}\n.reviews-list {\n  display: flex;\n  flex-direction: column;\n  gap: 1rem;\n}\n.review-card {\n  background: var(--bg-tertiary);\n  border-radius: 8px;\n  padding: 1rem;\n  border: 1px solid var(--border-color);\n}\n.review-header {\n  display: flex;\n  justify-content: space-between;\n  align-items: flex-start;\n  margin-bottom: 0.5rem;\n}\n.review-info {\n  display: flex;\n  flex-direction: column;\n  gap: 0.5rem;\n}\n.review-info .album-title {\n  font-weight: 600;\n  color: var(--text-primary);\n}\n.review-info .username {\n  font-size: 0.875rem;\n  color: var(--text-secondary);\n}\n.review-rating .star {\n  color: var(--text-secondary);\n  font-size: 1rem;\n}\n.review-rating .star.filled {\n  color: #FFC047;\n}\n.review-content {\n  color: var(--text-primary);\n  line-height: 1.5;\n  margin-bottom: 0.5rem;\n}\n.review-footer {\n  display: flex;\n  justify-content: space-between;\n  align-items: center;\n  margin-bottom: 0.5rem;\n  font-size: 0.875rem;\n}\n.review-footer .review-date {\n  color: var(--text-secondary);\n}\n.review-footer .review-status {\n  padding: 0.5rem 1rem;\n  border-radius: 4px;\n  font-weight: 600;\n  text-transform: uppercase;\n  font-size: 0.75rem;\n}\n.review-footer .review-status.pending {\n  background: #FFC047;\n  color: #000;\n}\n.review-footer .review-status.approved {\n  background: #AAD661;\n  color: white;\n}\n.review-footer .review-status.rejected {\n  background: #E04A4A;\n  color: white;\n}\n.review-actions {\n  display: flex;\n  gap: 0.5rem;\n  justify-content: flex-end;\n}\n/*# sourceMappingURL=reviews.css.map */\n'] }]
  }], null, null);
})();
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(AdminReviewsComponent, { className: "AdminReviewsComponent", filePath: "src/app/pages/admin/reviews/reviews.ts", lineNumber: 22 });
})();
export {
  AdminReviewsComponent as default
};
//# sourceMappingURL=chunk-REVWSAG4.js.map
