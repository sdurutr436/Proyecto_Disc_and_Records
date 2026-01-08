import {
  CommonModule,
  Component,
  DomSanitizer,
  Input,
  inject,
  setClassMetadata,
  ɵsetClassDebugInfo,
  ɵɵadvance,
  ɵɵclassMap,
  ɵɵclassProp,
  ɵɵconditional,
  ɵɵconditionalCreate,
  ɵɵdefineComponent,
  ɵɵdomElement,
  ɵɵdomElementEnd,
  ɵɵdomElementStart,
  ɵɵdomListener,
  ɵɵdomProperty,
  ɵɵgetCurrentView,
  ɵɵnextContext,
  ɵɵrepeater,
  ɵɵrepeaterCreate,
  ɵɵrepeaterTrackByIdentity,
  ɵɵresetView,
  ɵɵrestoreView,
  ɵɵsanitizeHtml,
  ɵɵsanitizeUrl,
  ɵɵtext,
  ɵɵtextInterpolate,
  ɵɵtextInterpolate1
} from "./chunk-MWU7IQTJ.js";

// src/app/components/shared/card/card.ts
var _forTrack0 = ($index, $item) => $item.label;
function Card_Conditional_1_Conditional_2_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275domElement(0, "img", 1);
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext(2);
    \u0275\u0275domProperty("src", ctx_r0.imageUrl, \u0275\u0275sanitizeUrl)("alt", ctx_r0.imageAlt);
  }
}
function Card_Conditional_1_Conditional_3_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275domElement(0, "span", 2);
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext(2);
    \u0275\u0275domProperty("innerHTML", ctx_r0.safePlaceholderIcon, \u0275\u0275sanitizeHtml);
  }
}
function Card_Conditional_1_Conditional_4_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275domElementStart(0, "span", 3);
    \u0275\u0275text(1, "\u{1F3B5}");
    \u0275\u0275domElementEnd();
  }
}
function Card_Conditional_1_Conditional_6_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275domElementStart(0, "h3", 5);
    \u0275\u0275text(1);
    \u0275\u0275domElementEnd();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext(2);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(ctx_r0.title);
  }
}
function Card_Conditional_1_Conditional_7_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275domElementStart(0, "p", 6);
    \u0275\u0275text(1);
    \u0275\u0275domElementEnd();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext(2);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(ctx_r0.subtitle);
  }
}
function Card_Conditional_1_Conditional_9_For_2_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275domElementStart(0, "span", 11);
    \u0275\u0275text(1);
    \u0275\u0275domElementEnd();
  }
  if (rf & 2) {
    const badge_r2 = ctx.$implicit;
    const \u0275$index_33_r3 = ctx.$index;
    \u0275\u0275classProp("card__badge--alt", \u0275$index_33_r3 % 2 !== 0);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", badge_r2, " ");
  }
}
function Card_Conditional_1_Conditional_9_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275domElementStart(0, "div", 8);
    \u0275\u0275repeaterCreate(1, Card_Conditional_1_Conditional_9_For_2_Template, 2, 3, "span", 10, \u0275\u0275repeaterTrackByIdentity);
    \u0275\u0275domElementEnd();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext(2);
    \u0275\u0275advance();
    \u0275\u0275repeater(ctx_r0.badges);
  }
}
function Card_Conditional_1_Conditional_10_For_2_Conditional_1_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275domElement(0, "span", 14);
  }
  if (rf & 2) {
    const action_r5 = \u0275\u0275nextContext().$implicit;
    \u0275\u0275domProperty("innerHTML", action_r5.icon, \u0275\u0275sanitizeHtml);
  }
}
function Card_Conditional_1_Conditional_10_For_2_Template(rf, ctx) {
  if (rf & 1) {
    const _r4 = \u0275\u0275getCurrentView();
    \u0275\u0275domElementStart(0, "button", 13);
    \u0275\u0275domListener("click", function Card_Conditional_1_Conditional_10_For_2_Template_button_click_0_listener($event) {
      const action_r5 = \u0275\u0275restoreView(_r4).$implicit;
      const ctx_r0 = \u0275\u0275nextContext(3);
      return \u0275\u0275resetView(ctx_r0.onActionClick(action_r5, $event));
    });
    \u0275\u0275conditionalCreate(1, Card_Conditional_1_Conditional_10_For_2_Conditional_1_Template, 1, 1, "span", 14);
    \u0275\u0275domElementStart(2, "span", 15);
    \u0275\u0275text(3);
    \u0275\u0275domElementEnd()();
  }
  if (rf & 2) {
    const action_r5 = ctx.$implicit;
    \u0275\u0275classMap("card__action card__action--" + action_r5.variant);
    \u0275\u0275advance();
    \u0275\u0275conditional(action_r5.icon ? 1 : -1);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(action_r5.label);
  }
}
function Card_Conditional_1_Conditional_10_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275domElementStart(0, "div", 9);
    \u0275\u0275repeaterCreate(1, Card_Conditional_1_Conditional_10_For_2_Template, 4, 4, "button", 12, _forTrack0);
    \u0275\u0275domElementEnd();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext(2);
    \u0275\u0275advance();
    \u0275\u0275repeater(ctx_r0.actions);
  }
}
function Card_Conditional_1_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275domElementStart(0, "section", 0)(1, "div");
    \u0275\u0275conditionalCreate(2, Card_Conditional_1_Conditional_2_Template, 1, 2, "img", 1)(3, Card_Conditional_1_Conditional_3_Template, 1, 1, "span", 2)(4, Card_Conditional_1_Conditional_4_Template, 2, 0, "span", 3);
    \u0275\u0275domElementEnd();
    \u0275\u0275domElementStart(5, "div", 4);
    \u0275\u0275conditionalCreate(6, Card_Conditional_1_Conditional_6_Template, 2, 1, "h3", 5);
    \u0275\u0275conditionalCreate(7, Card_Conditional_1_Conditional_7_Template, 2, 1, "p", 6);
    \u0275\u0275domElementEnd()();
    \u0275\u0275domElementStart(8, "section", 7);
    \u0275\u0275conditionalCreate(9, Card_Conditional_1_Conditional_9_Template, 3, 0, "div", 8);
    \u0275\u0275conditionalCreate(10, Card_Conditional_1_Conditional_10_Template, 3, 0, "div", 9);
    \u0275\u0275domElementEnd();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext();
    \u0275\u0275advance();
    \u0275\u0275classMap(ctx_r0.imageClasses);
    \u0275\u0275advance();
    \u0275\u0275conditional(ctx_r0.imageUrl ? 2 : ctx_r0.placeholderIcon ? 3 : 4);
    \u0275\u0275advance(4);
    \u0275\u0275conditional(ctx_r0.title ? 6 : -1);
    \u0275\u0275advance();
    \u0275\u0275conditional(ctx_r0.subtitle ? 7 : -1);
    \u0275\u0275advance(2);
    \u0275\u0275conditional(ctx_r0.badges.length > 0 ? 9 : -1);
    \u0275\u0275advance();
    \u0275\u0275conditional(ctx_r0.actions.length > 0 ? 10 : -1);
  }
}
function Card_Conditional_2_Conditional_1_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275domElement(0, "img", 1);
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext(2);
    \u0275\u0275domProperty("src", ctx_r0.imageUrl, \u0275\u0275sanitizeUrl)("alt", ctx_r0.imageAlt);
  }
}
function Card_Conditional_2_Conditional_2_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275domElement(0, "span", 2);
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext(2);
    \u0275\u0275domProperty("innerHTML", ctx_r0.safePlaceholderIcon, \u0275\u0275sanitizeHtml);
  }
}
function Card_Conditional_2_Conditional_3_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275domElementStart(0, "span", 3);
    \u0275\u0275text(1, "\u{1F3B5}");
    \u0275\u0275domElementEnd();
  }
}
function Card_Conditional_2_Conditional_6_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275domElementStart(0, "a", 17);
    \u0275\u0275text(1);
    \u0275\u0275domElementEnd();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext(2);
    \u0275\u0275domProperty("href", ctx_r0.titleLink, \u0275\u0275sanitizeUrl);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", ctx_r0.title, " ");
  }
}
function Card_Conditional_2_Conditional_7_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275domElementStart(0, "h3", 5);
    \u0275\u0275text(1);
    \u0275\u0275domElementEnd();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext(2);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(ctx_r0.title);
  }
}
function Card_Conditional_2_Conditional_8_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275domElementStart(0, "a", 18);
    \u0275\u0275text(1);
    \u0275\u0275domElementEnd();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext(2);
    \u0275\u0275domProperty("href", ctx_r0.subtitleLink, \u0275\u0275sanitizeUrl);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", ctx_r0.subtitle, " ");
  }
}
function Card_Conditional_2_Conditional_9_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275domElementStart(0, "p", 6);
    \u0275\u0275text(1);
    \u0275\u0275domElementEnd();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext(2);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(ctx_r0.subtitle);
  }
}
function Card_Conditional_2_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275domElementStart(0, "section");
    \u0275\u0275conditionalCreate(1, Card_Conditional_2_Conditional_1_Template, 1, 2, "img", 1)(2, Card_Conditional_2_Conditional_2_Template, 1, 1, "span", 2)(3, Card_Conditional_2_Conditional_3_Template, 2, 0, "span", 3);
    \u0275\u0275domElementEnd();
    \u0275\u0275domElementStart(4, "section", 16)(5, "div", 4);
    \u0275\u0275conditionalCreate(6, Card_Conditional_2_Conditional_6_Template, 2, 2, "a", 17)(7, Card_Conditional_2_Conditional_7_Template, 2, 1, "h3", 5);
    \u0275\u0275conditionalCreate(8, Card_Conditional_2_Conditional_8_Template, 2, 2, "a", 18)(9, Card_Conditional_2_Conditional_9_Template, 2, 1, "p", 6);
    \u0275\u0275domElementEnd()();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext();
    \u0275\u0275classMap(ctx_r0.imageClasses);
    \u0275\u0275advance();
    \u0275\u0275conditional(ctx_r0.imageUrl ? 1 : ctx_r0.placeholderIcon ? 2 : 3);
    \u0275\u0275advance(5);
    \u0275\u0275conditional(ctx_r0.title && ctx_r0.titleLink ? 6 : ctx_r0.title ? 7 : -1);
    \u0275\u0275advance(2);
    \u0275\u0275conditional(ctx_r0.subtitle && ctx_r0.subtitleLink ? 8 : ctx_r0.subtitle ? 9 : -1);
  }
}
var Card = class _Card {
  sanitizer = inject(DomSanitizer);
  // Contenido
  title = "";
  subtitle = "";
  imageUrl = "";
  imageAlt = "";
  placeholderIcon = "";
  // SVG string for custom placeholder
  // Getter para sanitizar el SVG
  get safePlaceholderIcon() {
    return this.sanitizer.bypassSecurityTrustHtml(this.placeholderIcon);
  }
  // Configuración de imagen
  imageShape = "square";
  imageSize = "medium";
  // Variantes de diseño
  variant = "normal";
  hoverEffect = "lift";
  layout = "vertical";
  // Tipo de card
  cardType = "polaroid";
  // Acciones y badges
  actions = [];
  badges = [];
  // Links para variante polaroid
  titleLink = "";
  subtitleLink = "";
  get cardClasses() {
    const classes = ["card"];
    if (this.variant === "vinilo") {
      classes.push("card--vinilo");
    }
    if (this.hoverEffect === "lift") {
      classes.push("card--hover-lift");
    }
    classes.push(`card--${this.cardType}`);
    classes.push(`card--${this.layout}`);
    return classes.join(" ");
  }
  get imageClasses() {
    const classes = ["card__image"];
    classes.push(`card__image--${this.imageShape}`);
    classes.push(`card__image--${this.imageSize}`);
    return classes.join(" ");
  }
  onActionClick(action, event) {
    event.preventDefault();
    event.stopPropagation();
    if (action.callback) {
      action.callback();
    }
  }
  static \u0275fac = function Card_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _Card)();
  };
  static \u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _Card, selectors: [["app-card"]], inputs: { title: "title", subtitle: "subtitle", imageUrl: "imageUrl", imageAlt: "imageAlt", placeholderIcon: "placeholderIcon", imageShape: "imageShape", imageSize: "imageSize", variant: "variant", hoverEffect: "hoverEffect", layout: "layout", cardType: "cardType", actions: "actions", badges: "badges", titleLink: "titleLink", subtitleLink: "subtitleLink" }, decls: 3, vars: 3, consts: [[1, "card__left"], [3, "src", "alt"], [1, "card__placeholder", "card__placeholder--svg", 3, "innerHTML"], [1, "card__placeholder"], [1, "card__text"], [1, "card__title"], [1, "card__subtitle"], [1, "card__right"], [1, "card__badges"], [1, "card__actions"], [1, "card__badge", 3, "card__badge--alt"], [1, "card__badge"], ["type", "button", 3, "class"], ["type", "button", 3, "click"], [1, "card__action-icon", 3, "innerHTML"], [1, "card__action-label"], [1, "card__content"], [1, "card__title", "card__title--link", 3, "href"], [1, "card__subtitle", "card__subtitle--link", 3, "href"]], template: function Card_Template(rf, ctx) {
    if (rf & 1) {
      \u0275\u0275domElementStart(0, "article");
      \u0275\u0275conditionalCreate(1, Card_Conditional_1_Template, 11, 7)(2, Card_Conditional_2_Template, 10, 5);
      \u0275\u0275domElementEnd();
    }
    if (rf & 2) {
      \u0275\u0275classMap(ctx.cardClasses);
      \u0275\u0275advance();
      \u0275\u0275conditional(ctx.cardType === "profile" ? 1 : 2);
    }
  }, dependencies: [CommonModule], styles: ['@charset "UTF-8";\n\n\n\n.card[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  background-color: var(--bg-secondary);\n  border: 4px solid var(--border-color);\n  border-radius: 5px;\n  box-shadow: 4px 4px 0px var(--shadow-color);\n  transition: all 150ms ease-in-out;\n  overflow: hidden;\n  width: 100%;\n  max-width: 280px;\n}\n.card--polaroid.card--hover-lift[_ngcontent-%COMP%]:hover {\n  transform: translate(2px, 2px);\n  box-shadow: 2px 2px 0px var(--shadow-color);\n}\n.card--vinilo[_ngcontent-%COMP%] {\n  box-shadow:\n    2px 2px 0px var(--color-accent),\n    4px 4px 0px var(--color-secondary),\n    6px 6px 0px var(--color-primary);\n}\n.card--vinilo.card--polaroid.card--hover-lift[_ngcontent-%COMP%]:hover {\n  transform: translate(2px, 2px);\n  box-shadow:\n    1px 1px 0px var(--color-accent),\n    2px 2px 0px var(--color-secondary),\n    3px 3px 0px var(--color-primary);\n}\n.card--polaroid[_ngcontent-%COMP%] {\n  max-width: 220px;\n}\n.card--profile[_ngcontent-%COMP%] {\n  max-width: 100%;\n  flex-direction: row;\n  align-items: stretch;\n}\n.card--profile[_ngcontent-%COMP%]   .card__left[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  flex-shrink: 0;\n  width: 15.625rem;\n  border-right: 2px solid var(--border-color);\n}\n.card--profile[_ngcontent-%COMP%]   .card__image[_ngcontent-%COMP%] {\n  width: 100%;\n  min-width: 100%;\n  max-width: 100%;\n  height: 15.625rem;\n  flex-shrink: 0;\n  border-right: none;\n  border-top: none;\n  border-bottom: 2px solid var(--border-color);\n  aspect-ratio: 1;\n}\n.card--profile[_ngcontent-%COMP%]   .card__text[_ngcontent-%COMP%] {\n  flex: 1;\n  padding: 2rem;\n  display: flex;\n  flex-direction: column;\n  justify-content: center;\n  border-right: none;\n}\n.card--profile[_ngcontent-%COMP%]   .card__right[_ngcontent-%COMP%] {\n  flex: 1;\n  display: flex;\n  flex-direction: column;\n  justify-content: space-between;\n}\n.card--profile[_ngcontent-%COMP%]   .card__badges[_ngcontent-%COMP%] {\n  flex: 1;\n  margin: 0;\n  padding: 2rem;\n  border-top: none;\n  border-left: none;\n  display: flex;\n  flex-direction: row;\n  flex-wrap: wrap;\n  align-items: flex-start;\n  align-content: flex-start;\n  gap: 0.5rem;\n}\n.card--profile[_ngcontent-%COMP%]   .card__actions[_ngcontent-%COMP%] {\n  flex: 0 0 auto;\n  margin: 0;\n  padding: 2rem;\n  border-top: 2px solid var(--border-color);\n  border-left: none;\n  display: flex;\n  flex-direction: row;\n  flex-wrap: wrap;\n  justify-content: flex-start;\n  gap: 0.5rem;\n  width: 100%;\n}\n@media (max-width: 1024px) {\n  .card--profile[_ngcontent-%COMP%]   .card__left[_ngcontent-%COMP%] {\n    width: 11.25rem;\n  }\n  .card--profile[_ngcontent-%COMP%]   .card__image[_ngcontent-%COMP%] {\n    height: 11.25rem;\n  }\n}\n@media (max-width: 768px) {\n  .card--profile[_ngcontent-%COMP%] {\n    flex-direction: column;\n  }\n  .card--profile[_ngcontent-%COMP%]   .card__left[_ngcontent-%COMP%] {\n    width: 100%;\n    border-right: none;\n    border-bottom: none;\n  }\n  .card--profile[_ngcontent-%COMP%]   .card__image[_ngcontent-%COMP%] {\n    width: 100%;\n    min-width: 100%;\n    max-width: 100%;\n    height: auto;\n    max-height: 12.5rem;\n    border-right: none;\n    border-bottom: 2px solid var(--border-color);\n    aspect-ratio: auto;\n  }\n  .card--profile[_ngcontent-%COMP%]   .card__text[_ngcontent-%COMP%] {\n    width: 100%;\n    border-right: none;\n    border-bottom: 2px solid var(--border-color);\n  }\n  .card--profile[_ngcontent-%COMP%]   .card__right[_ngcontent-%COMP%] {\n    width: 100%;\n  }\n  .card--profile[_ngcontent-%COMP%]   .card__badges[_ngcontent-%COMP%] {\n    justify-content: center;\n    border-bottom: 2px solid var(--border-color);\n  }\n  .card--profile[_ngcontent-%COMP%]   .card__actions[_ngcontent-%COMP%] {\n    flex-direction: column;\n    border-top: none;\n  }\n}\n.card--profile.card--vertical[_ngcontent-%COMP%] {\n  flex-direction: column;\n  max-width: 18.75rem;\n}\n.card--profile.card--vertical[_ngcontent-%COMP%]   .card__left[_ngcontent-%COMP%] {\n  width: 100%;\n  border-right: none;\n  border-bottom: none;\n}\n.card--profile.card--vertical[_ngcontent-%COMP%]   .card__image[_ngcontent-%COMP%] {\n  width: 100%;\n  height: auto;\n  max-height: 15.625rem;\n  border-bottom: 2px solid var(--border-color);\n  aspect-ratio: 1;\n}\n.card--profile.card--vertical[_ngcontent-%COMP%]   .card__text[_ngcontent-%COMP%] {\n  border-bottom: 2px solid var(--border-color);\n  text-align: center;\n}\n.card--profile.card--vertical[_ngcontent-%COMP%]   .card__right[_ngcontent-%COMP%] {\n  width: 100%;\n}\n.card--profile.card--vertical[_ngcontent-%COMP%]   .card__badges[_ngcontent-%COMP%] {\n  justify-content: center;\n  border-bottom: 2px solid var(--border-color);\n}\n.card--profile.card--vertical[_ngcontent-%COMP%]   .card__actions[_ngcontent-%COMP%] {\n  flex-direction: column;\n  border-top: none;\n}\n@media (max-width: 768px) {\n  .card--profile.card--vertical[_ngcontent-%COMP%] {\n    max-width: 100%;\n  }\n}\n.card--vertical[_ngcontent-%COMP%] {\n  flex-direction: column;\n}\n.card__image[_ngcontent-%COMP%] {\n  width: 100%;\n  aspect-ratio: 1;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  overflow: hidden;\n  background-color: var(--bg-secondary);\n  position: relative;\n}\n.card__image[_ngcontent-%COMP%]   img[_ngcontent-%COMP%] {\n  width: 100%;\n  height: 100%;\n  object-fit: cover;\n}\n.card__image--circle[_ngcontent-%COMP%]   img[_ngcontent-%COMP%] {\n  border-radius: 50%;\n  padding: 0.5rem;\n}\n.card__image--square[_ngcontent-%COMP%]   img[_ngcontent-%COMP%] {\n  border-radius: 0;\n}\n.card__image--small[_ngcontent-%COMP%] {\n  aspect-ratio: 1;\n  max-height: 120px;\n}\n.card__image--medium[_ngcontent-%COMP%] {\n  aspect-ratio: 1;\n  max-height: 200px;\n}\n.card__image--large[_ngcontent-%COMP%] {\n  aspect-ratio: 1;\n  max-height: 300px;\n}\n.card__placeholder[_ngcontent-%COMP%] {\n  font-size: 4rem;\n  opacity: 0.3;\n}\n.card__placeholder--svg[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  width: 100%;\n  height: 100%;\n}\n.card__placeholder--svg[_ngcontent-%COMP%]   svg[_ngcontent-%COMP%] {\n  width: 4rem;\n  height: 4rem;\n  stroke: var(--text-primary);\n  opacity: 0.4;\n}\n.card__content[_ngcontent-%COMP%] {\n  background-color: var(--bg-secondary);\n  padding: 2rem;\n  display: flex;\n  flex-direction: column;\n  gap: 0.5rem;\n  flex-grow: 1;\n  border-top: 2px solid var(--border-color);\n}\n.card__text[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  gap: 0.5rem;\n  text-align: center;\n}\n.card--profile[_ngcontent-%COMP%]   .card__text[_ngcontent-%COMP%] {\n  text-align: left;\n}\n.card__title[_ngcontent-%COMP%] {\n  font-size: 1rem;\n  font-weight: 700;\n  color: var(--text-primary);\n  margin: 0;\n  line-height: 1.2;\n  overflow: hidden;\n  text-overflow: ellipsis;\n  white-space: nowrap;\n  transition: all 300ms ease-in-out;\n}\n.card__title--link[_ngcontent-%COMP%] {\n  text-decoration: none;\n  color: inherit;\n  display: block;\n}\n.card__title--link[_ngcontent-%COMP%]:hover {\n  color: var(--color-primary);\n  animation: _ngcontent-%COMP%_scroll-text 3s linear infinite;\n  white-space: nowrap;\n  overflow: visible;\n}\n.card__subtitle[_ngcontent-%COMP%] {\n  font-size: 1rem;\n  color: var(--text-primary);\n  opacity: 0.7;\n  margin: 0;\n  line-height: 1.3;\n  overflow: hidden;\n  text-overflow: ellipsis;\n  white-space: nowrap;\n  transition: all 300ms ease-in-out;\n}\n.card__subtitle--link[_ngcontent-%COMP%] {\n  text-decoration: none;\n  color: inherit;\n  display: block;\n}\n.card__subtitle--link[_ngcontent-%COMP%]:hover {\n  color: #CA6703;\n  animation: _ngcontent-%COMP%_scroll-text 3s linear infinite;\n  white-space: nowrap;\n  overflow: visible;\n}\n@keyframes _ngcontent-%COMP%_scroll-text {\n  0% {\n    transform: translateX(0);\n  }\n  100% {\n    transform: translateX(-50%);\n  }\n}\n.card__badges[_ngcontent-%COMP%] {\n  display: flex;\n  flex-wrap: wrap;\n  gap: 0.5rem;\n  margin-top: 0.5rem;\n  padding-top: 1rem;\n  border-top: 2px solid var(--border-color);\n}\n.card__badge[_ngcontent-%COMP%] {\n  display: inline-block;\n  padding: 4px 0.5rem;\n  font-size: 0.75rem;\n  font-weight: 600;\n  text-transform: uppercase;\n  background-color: var(--color-primary);\n  color: var(--text-dark);\n  border: 2px solid var(--border-color);\n  border-radius: 3px;\n  box-shadow: 2px 2px 0px var(--border-color);\n  line-height: 1;\n}\n.card__badge--alt[_ngcontent-%COMP%] {\n  background-color: var(--color-secondary);\n}\n.card__actions[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  gap: 0.5rem;\n  margin-top: 1rem;\n  padding-top: 1rem;\n  width: 100%;\n  border-top: 2px solid var(--border-color);\n}\n.card__action[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  gap: 0.5rem;\n  width: 100%;\n  padding: 0.5rem 1rem;\n  font-size: 1rem;\n  font-weight: 600;\n  font-family: inherit;\n  border: 3px solid var(--border-color);\n  border-radius: 9999px;\n  box-shadow: 2px 2px 0px var(--border-color);\n  cursor: pointer;\n  transition: all 150ms ease-in-out;\n  min-height: 40px;\n}\n.card__action[_ngcontent-%COMP%]:hover {\n  transform: translate(-1px, -1px);\n  box-shadow: 3px 3px 0px var(--border-color);\n}\n.card__action[_ngcontent-%COMP%]:active {\n  transform: translate(1px, 1px);\n  box-shadow: 1px 1px 0px var(--border-color);\n}\n.card__action--primary[_ngcontent-%COMP%] {\n  background-color: var(--color-primary);\n  color: var(--text-dark);\n}\n.card__action--secondary[_ngcontent-%COMP%] {\n  background-color: var(--color-secondary);\n  color: var(--text-dark);\n}\n.card__action--contrast[_ngcontent-%COMP%] {\n  background-color: var(--color-accent);\n  color: var(--text-dark);\n}\n.card__action--accent[_ngcontent-%COMP%] {\n  background-color: var(--color-accent);\n  color: var(--text-dark);\n}\n.card__action-icon[_ngcontent-%COMP%] {\n  font-size: 1.25rem;\n  line-height: 1;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n}\n.card__action-label[_ngcontent-%COMP%] {\n  line-height: 1;\n}\n@media (max-width: 768px) {\n  .card[_ngcontent-%COMP%] {\n    max-width: 100%;\n  }\n  .card--polaroid[_ngcontent-%COMP%] {\n    max-width: 180px;\n  }\n  .card--profile[_ngcontent-%COMP%] {\n    max-width: 100%;\n  }\n  .card__content[_ngcontent-%COMP%] {\n    padding: 1rem;\n  }\n  .card__title[_ngcontent-%COMP%] {\n    font-size: 1.125rem;\n  }\n  .card__subtitle[_ngcontent-%COMP%] {\n    font-size: 0.875rem;\n  }\n  .card__action[_ngcontent-%COMP%] {\n    padding: 0.5rem;\n    font-size: 0.875rem;\n    min-height: 36px;\n  }\n}\n/*# sourceMappingURL=card.css.map */'] });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(Card, [{
    type: Component,
    args: [{ selector: "app-card", imports: [CommonModule], template: `<article [class]="cardClasses">\r
  <!-- Variante Profile: Imagen + T\xEDtulo en columna izquierda -->\r
  @if (cardType === 'profile') {\r
    <!-- Columna izquierda: imagen con t\xEDtulo debajo -->\r
    <section class="card__left">\r
      <div [class]="imageClasses">\r
        @if (imageUrl) {\r
          <img [src]="imageUrl" [alt]="imageAlt" />\r
        } @else if (placeholderIcon) {\r
          <span class="card__placeholder card__placeholder--svg" [innerHTML]="safePlaceholderIcon"></span>\r
        } @else {\r
          <span class="card__placeholder">\u{1F3B5}</span>\r
        }\r
      </div>\r
      <div class="card__text">\r
        @if (title) {\r
          <h3 class="card__title">{{ title }}</h3>\r
        }\r
        @if (subtitle) {\r
          <p class="card__subtitle">{{ subtitle }}</p>\r
        }\r
      </div>\r
    </section>\r
\r
    <!-- Columna derecha: badges arriba, botones abajo -->\r
    <section class="card__right">\r
      @if (badges.length > 0) {\r
        <div class="card__badges">\r
          @for (badge of badges; track badge; let i = $index) {\r
            <span\r
              class="card__badge"\r
              [class.card__badge--alt]="i % 2 !== 0">\r
              {{ badge }}\r
            </span>\r
          }\r
        </div>\r
      }\r
      @if (actions.length > 0) {\r
        <div class="card__actions">\r
          @for (action of actions; track action.label) {\r
            <button\r
              type="button"\r
              [class]="'card__action card__action--' + action.variant"\r
              (click)="onActionClick(action, $event)">\r
              @if (action.icon) {\r
                <span class="card__action-icon" [innerHTML]="action.icon"></span>\r
              }\r
              <span class="card__action-label">{{ action.label }}</span>\r
            </button>\r
          }\r
        </div>\r
      }\r
    </section>\r
  } @else {\r
    <!-- Variante Polaroid: estructura original -->\r
    <section [class]="imageClasses">\r
      @if (imageUrl) {\r
        <img [src]="imageUrl" [alt]="imageAlt" />\r
      } @else if (placeholderIcon) {\r
        <span class="card__placeholder card__placeholder--svg" [innerHTML]="safePlaceholderIcon"></span>\r
      } @else {\r
        <span class="card__placeholder">\u{1F3B5}</span>\r
      }\r
    </section>\r
\r
    <section class="card__content">\r
      <div class="card__text">\r
        @if (title && titleLink) {\r
          <a [href]="titleLink" class="card__title card__title--link">\r
            {{ title }}\r
          </a>\r
        } @else if (title) {\r
          <h3 class="card__title">{{ title }}</h3>\r
        }\r
\r
        @if (subtitle && subtitleLink) {\r
          <a [href]="subtitleLink" class="card__subtitle card__subtitle--link">\r
            {{ subtitle }}\r
          </a>\r
        } @else if (subtitle) {\r
          <p class="card__subtitle">{{ subtitle }}</p>\r
        }\r
      </div>\r
    </section>\r
  }\r
</article>\r
`, styles: ['@charset "UTF-8";\n\n/* src/app/components/shared/card/card.scss */\n.card {\n  display: flex;\n  flex-direction: column;\n  background-color: var(--bg-secondary);\n  border: 4px solid var(--border-color);\n  border-radius: 5px;\n  box-shadow: 4px 4px 0px var(--shadow-color);\n  transition: all 150ms ease-in-out;\n  overflow: hidden;\n  width: 100%;\n  max-width: 280px;\n}\n.card--polaroid.card--hover-lift:hover {\n  transform: translate(2px, 2px);\n  box-shadow: 2px 2px 0px var(--shadow-color);\n}\n.card--vinilo {\n  box-shadow:\n    2px 2px 0px var(--color-accent),\n    4px 4px 0px var(--color-secondary),\n    6px 6px 0px var(--color-primary);\n}\n.card--vinilo.card--polaroid.card--hover-lift:hover {\n  transform: translate(2px, 2px);\n  box-shadow:\n    1px 1px 0px var(--color-accent),\n    2px 2px 0px var(--color-secondary),\n    3px 3px 0px var(--color-primary);\n}\n.card--polaroid {\n  max-width: 220px;\n}\n.card--profile {\n  max-width: 100%;\n  flex-direction: row;\n  align-items: stretch;\n}\n.card--profile .card__left {\n  display: flex;\n  flex-direction: column;\n  flex-shrink: 0;\n  width: 15.625rem;\n  border-right: 2px solid var(--border-color);\n}\n.card--profile .card__image {\n  width: 100%;\n  min-width: 100%;\n  max-width: 100%;\n  height: 15.625rem;\n  flex-shrink: 0;\n  border-right: none;\n  border-top: none;\n  border-bottom: 2px solid var(--border-color);\n  aspect-ratio: 1;\n}\n.card--profile .card__text {\n  flex: 1;\n  padding: 2rem;\n  display: flex;\n  flex-direction: column;\n  justify-content: center;\n  border-right: none;\n}\n.card--profile .card__right {\n  flex: 1;\n  display: flex;\n  flex-direction: column;\n  justify-content: space-between;\n}\n.card--profile .card__badges {\n  flex: 1;\n  margin: 0;\n  padding: 2rem;\n  border-top: none;\n  border-left: none;\n  display: flex;\n  flex-direction: row;\n  flex-wrap: wrap;\n  align-items: flex-start;\n  align-content: flex-start;\n  gap: 0.5rem;\n}\n.card--profile .card__actions {\n  flex: 0 0 auto;\n  margin: 0;\n  padding: 2rem;\n  border-top: 2px solid var(--border-color);\n  border-left: none;\n  display: flex;\n  flex-direction: row;\n  flex-wrap: wrap;\n  justify-content: flex-start;\n  gap: 0.5rem;\n  width: 100%;\n}\n@media (max-width: 1024px) {\n  .card--profile .card__left {\n    width: 11.25rem;\n  }\n  .card--profile .card__image {\n    height: 11.25rem;\n  }\n}\n@media (max-width: 768px) {\n  .card--profile {\n    flex-direction: column;\n  }\n  .card--profile .card__left {\n    width: 100%;\n    border-right: none;\n    border-bottom: none;\n  }\n  .card--profile .card__image {\n    width: 100%;\n    min-width: 100%;\n    max-width: 100%;\n    height: auto;\n    max-height: 12.5rem;\n    border-right: none;\n    border-bottom: 2px solid var(--border-color);\n    aspect-ratio: auto;\n  }\n  .card--profile .card__text {\n    width: 100%;\n    border-right: none;\n    border-bottom: 2px solid var(--border-color);\n  }\n  .card--profile .card__right {\n    width: 100%;\n  }\n  .card--profile .card__badges {\n    justify-content: center;\n    border-bottom: 2px solid var(--border-color);\n  }\n  .card--profile .card__actions {\n    flex-direction: column;\n    border-top: none;\n  }\n}\n.card--profile.card--vertical {\n  flex-direction: column;\n  max-width: 18.75rem;\n}\n.card--profile.card--vertical .card__left {\n  width: 100%;\n  border-right: none;\n  border-bottom: none;\n}\n.card--profile.card--vertical .card__image {\n  width: 100%;\n  height: auto;\n  max-height: 15.625rem;\n  border-bottom: 2px solid var(--border-color);\n  aspect-ratio: 1;\n}\n.card--profile.card--vertical .card__text {\n  border-bottom: 2px solid var(--border-color);\n  text-align: center;\n}\n.card--profile.card--vertical .card__right {\n  width: 100%;\n}\n.card--profile.card--vertical .card__badges {\n  justify-content: center;\n  border-bottom: 2px solid var(--border-color);\n}\n.card--profile.card--vertical .card__actions {\n  flex-direction: column;\n  border-top: none;\n}\n@media (max-width: 768px) {\n  .card--profile.card--vertical {\n    max-width: 100%;\n  }\n}\n.card--vertical {\n  flex-direction: column;\n}\n.card__image {\n  width: 100%;\n  aspect-ratio: 1;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  overflow: hidden;\n  background-color: var(--bg-secondary);\n  position: relative;\n}\n.card__image img {\n  width: 100%;\n  height: 100%;\n  object-fit: cover;\n}\n.card__image--circle img {\n  border-radius: 50%;\n  padding: 0.5rem;\n}\n.card__image--square img {\n  border-radius: 0;\n}\n.card__image--small {\n  aspect-ratio: 1;\n  max-height: 120px;\n}\n.card__image--medium {\n  aspect-ratio: 1;\n  max-height: 200px;\n}\n.card__image--large {\n  aspect-ratio: 1;\n  max-height: 300px;\n}\n.card__placeholder {\n  font-size: 4rem;\n  opacity: 0.3;\n}\n.card__placeholder--svg {\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  width: 100%;\n  height: 100%;\n}\n.card__placeholder--svg svg {\n  width: 4rem;\n  height: 4rem;\n  stroke: var(--text-primary);\n  opacity: 0.4;\n}\n.card__content {\n  background-color: var(--bg-secondary);\n  padding: 2rem;\n  display: flex;\n  flex-direction: column;\n  gap: 0.5rem;\n  flex-grow: 1;\n  border-top: 2px solid var(--border-color);\n}\n.card__text {\n  display: flex;\n  flex-direction: column;\n  gap: 0.5rem;\n  text-align: center;\n}\n.card--profile .card__text {\n  text-align: left;\n}\n.card__title {\n  font-size: 1rem;\n  font-weight: 700;\n  color: var(--text-primary);\n  margin: 0;\n  line-height: 1.2;\n  overflow: hidden;\n  text-overflow: ellipsis;\n  white-space: nowrap;\n  transition: all 300ms ease-in-out;\n}\n.card__title--link {\n  text-decoration: none;\n  color: inherit;\n  display: block;\n}\n.card__title--link:hover {\n  color: var(--color-primary);\n  animation: scroll-text 3s linear infinite;\n  white-space: nowrap;\n  overflow: visible;\n}\n.card__subtitle {\n  font-size: 1rem;\n  color: var(--text-primary);\n  opacity: 0.7;\n  margin: 0;\n  line-height: 1.3;\n  overflow: hidden;\n  text-overflow: ellipsis;\n  white-space: nowrap;\n  transition: all 300ms ease-in-out;\n}\n.card__subtitle--link {\n  text-decoration: none;\n  color: inherit;\n  display: block;\n}\n.card__subtitle--link:hover {\n  color: #CA6703;\n  animation: scroll-text 3s linear infinite;\n  white-space: nowrap;\n  overflow: visible;\n}\n@keyframes scroll-text {\n  0% {\n    transform: translateX(0);\n  }\n  100% {\n    transform: translateX(-50%);\n  }\n}\n.card__badges {\n  display: flex;\n  flex-wrap: wrap;\n  gap: 0.5rem;\n  margin-top: 0.5rem;\n  padding-top: 1rem;\n  border-top: 2px solid var(--border-color);\n}\n.card__badge {\n  display: inline-block;\n  padding: 4px 0.5rem;\n  font-size: 0.75rem;\n  font-weight: 600;\n  text-transform: uppercase;\n  background-color: var(--color-primary);\n  color: var(--text-dark);\n  border: 2px solid var(--border-color);\n  border-radius: 3px;\n  box-shadow: 2px 2px 0px var(--border-color);\n  line-height: 1;\n}\n.card__badge--alt {\n  background-color: var(--color-secondary);\n}\n.card__actions {\n  display: flex;\n  flex-direction: column;\n  gap: 0.5rem;\n  margin-top: 1rem;\n  padding-top: 1rem;\n  width: 100%;\n  border-top: 2px solid var(--border-color);\n}\n.card__action {\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  gap: 0.5rem;\n  width: 100%;\n  padding: 0.5rem 1rem;\n  font-size: 1rem;\n  font-weight: 600;\n  font-family: inherit;\n  border: 3px solid var(--border-color);\n  border-radius: 9999px;\n  box-shadow: 2px 2px 0px var(--border-color);\n  cursor: pointer;\n  transition: all 150ms ease-in-out;\n  min-height: 40px;\n}\n.card__action:hover {\n  transform: translate(-1px, -1px);\n  box-shadow: 3px 3px 0px var(--border-color);\n}\n.card__action:active {\n  transform: translate(1px, 1px);\n  box-shadow: 1px 1px 0px var(--border-color);\n}\n.card__action--primary {\n  background-color: var(--color-primary);\n  color: var(--text-dark);\n}\n.card__action--secondary {\n  background-color: var(--color-secondary);\n  color: var(--text-dark);\n}\n.card__action--contrast {\n  background-color: var(--color-accent);\n  color: var(--text-dark);\n}\n.card__action--accent {\n  background-color: var(--color-accent);\n  color: var(--text-dark);\n}\n.card__action-icon {\n  font-size: 1.25rem;\n  line-height: 1;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n}\n.card__action-label {\n  line-height: 1;\n}\n@media (max-width: 768px) {\n  .card {\n    max-width: 100%;\n  }\n  .card--polaroid {\n    max-width: 180px;\n  }\n  .card--profile {\n    max-width: 100%;\n  }\n  .card__content {\n    padding: 1rem;\n  }\n  .card__title {\n    font-size: 1.125rem;\n  }\n  .card__subtitle {\n    font-size: 0.875rem;\n  }\n  .card__action {\n    padding: 0.5rem;\n    font-size: 0.875rem;\n    min-height: 36px;\n  }\n}\n/*# sourceMappingURL=card.css.map */\n'] }]
  }], null, { title: [{
    type: Input
  }], subtitle: [{
    type: Input
  }], imageUrl: [{
    type: Input
  }], imageAlt: [{
    type: Input
  }], placeholderIcon: [{
    type: Input
  }], imageShape: [{
    type: Input
  }], imageSize: [{
    type: Input
  }], variant: [{
    type: Input
  }], hoverEffect: [{
    type: Input
  }], layout: [{
    type: Input
  }], cardType: [{
    type: Input
  }], actions: [{
    type: Input
  }], badges: [{
    type: Input
  }], titleLink: [{
    type: Input
  }], subtitleLink: [{
    type: Input
  }] });
})();
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(Card, { className: "Card", filePath: "src/app/components/shared/card/card.ts", lineNumber: 20 });
})();

export {
  Card
};
//# sourceMappingURL=chunk-CKLDZOBG.js.map
