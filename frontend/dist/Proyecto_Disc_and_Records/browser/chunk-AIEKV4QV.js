import {
  RatingComponent
} from "./chunk-INEPXDF4.js";
import {
  Card
} from "./chunk-CKLDZOBG.js";
import {
  Button
} from "./chunk-HICAVZQE.js";
import {
  CommonModule,
  Component,
  setClassMetadata,
  signal,
  ɵsetClassDebugInfo,
  ɵɵadvance,
  ɵɵclassProp,
  ɵɵconditional,
  ɵɵconditionalCreate,
  ɵɵdefineComponent,
  ɵɵelement,
  ɵɵelementEnd,
  ɵɵelementStart,
  ɵɵgetCurrentView,
  ɵɵlistener,
  ɵɵnextContext,
  ɵɵproperty,
  ɵɵpureFunction1,
  ɵɵpureFunction2,
  ɵɵrepeater,
  ɵɵrepeaterCreate,
  ɵɵresetView,
  ɵɵrestoreView,
  ɵɵsanitizeUrl,
  ɵɵtext,
  ɵɵtextInterpolate
} from "./chunk-MWU7IQTJ.js";

// src/app/pages/profile/profile.ts
var _c0 = (a0) => ({ label: "Editar Perfil", variant: "primary", callback: a0 });
var _c1 = (a0) => ({ label: "Compartir", variant: "secondary", callback: a0 });
var _c2 = (a0, a1) => [a0, a1];
var _forTrack0 = ($index, $item) => $item.id;
function ProfileComponent_Conditional_24_For_2_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "article", 15)(1, "div", 16);
    \u0275\u0275element(2, "img", 17);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "div", 18)(4, "header", 19)(5, "h3", 20);
    \u0275\u0275text(6);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(7, "p", 21);
    \u0275\u0275text(8);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(9, "div", 22);
    \u0275\u0275element(10, "app-rating", 23);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(11, "p", 24);
    \u0275\u0275text(12);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(13, "time", 25);
    \u0275\u0275text(14);
    \u0275\u0275elementEnd()()();
  }
  if (rf & 2) {
    const review_r1 = ctx.$implicit;
    \u0275\u0275advance(2);
    \u0275\u0275property("src", review_r1.albumImageUrl, \u0275\u0275sanitizeUrl)("alt", review_r1.albumTitle);
    \u0275\u0275advance(4);
    \u0275\u0275textInterpolate(review_r1.albumTitle);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(review_r1.albumArtist);
    \u0275\u0275advance(2);
    \u0275\u0275property("rating", review_r1.rating);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(review_r1.reviewText);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(review_r1.date);
  }
}
function ProfileComponent_Conditional_24_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 13);
    \u0275\u0275repeaterCreate(1, ProfileComponent_Conditional_24_For_2_Template, 15, 7, "article", 15, _forTrack0);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275advance();
    \u0275\u0275repeater(ctx_r1.reviews());
  }
}
function ProfileComponent_Conditional_25_For_2_Conditional_1_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 28);
    \u0275\u0275element(1, "app-rating", 29);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const album_r4 = \u0275\u0275nextContext().$implicit;
    \u0275\u0275advance();
    \u0275\u0275property("rating", album_r4.rating)("showValue", true);
  }
}
function ProfileComponent_Conditional_25_For_2_Template(rf, ctx) {
  if (rf & 1) {
    const _r3 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "app-card", 27);
    \u0275\u0275listener("click", function ProfileComponent_Conditional_25_For_2_Template_app_card_click_0_listener() {
      const album_r4 = \u0275\u0275restoreView(_r3).$implicit;
      const ctx_r1 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r1.viewAlbum(album_r4.id));
    });
    \u0275\u0275conditionalCreate(1, ProfileComponent_Conditional_25_For_2_Conditional_1_Template, 2, 2, "div", 28);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const album_r4 = ctx.$implicit;
    \u0275\u0275property("title", album_r4.title)("titleLink", "/album/" + album_r4.id)("subtitle", album_r4.artist)("subtitleLink", "/artist/" + album_r4.artist)("imageUrl", album_r4.imageUrl)("imageAlt", album_r4.title + " por " + album_r4.artist);
    \u0275\u0275advance();
    \u0275\u0275conditional(album_r4.rating ? 1 : -1);
  }
}
function ProfileComponent_Conditional_25_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 14);
    \u0275\u0275repeaterCreate(1, ProfileComponent_Conditional_25_For_2_Template, 2, 7, "app-card", 26, _forTrack0);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275advance();
    \u0275\u0275repeater(ctx_r1.albums());
  }
}
var ProfileComponent = class _ProfileComponent {
  // Tab activo
  activeTab = signal("reviews", ...ngDevMode ? [{ debugName: "activeTab" }] : []);
  // Datos del usuario
  userProfile = {
    name: "PerreteGordete",
    avatarUrl: "assets/profile-placeholder.jpg",
    memberSince: "Enero 2025",
    totalReviews: 42,
    totalAlbums: 156
  };
  // Géneros favoritos (badges)
  favoriteGenres = [
    "Heavy Metal 50%",
    "J-Pop 25%",
    "Pop Internacional 7%",
    "Metal 8%",
    "Rock 10%"
  ];
  // Mock data - Reseñas
  reviews = signal([
    {
      id: 1,
      albumTitle: "Random Access Memories",
      albumArtist: "Daft Punk",
      albumImageUrl: "https://via.placeholder.com/200",
      rating: 5,
      reviewText: "Una obra maestra del pop electr\xF3nico. Cada pista es un viaje.",
      date: "2025-12-15"
    },
    {
      id: 2,
      albumTitle: "The Dark Side of the Moon",
      albumArtist: "Pink Floyd",
      albumImageUrl: "https://via.placeholder.com/200",
      rating: 5,
      reviewText: "\xC1lbum conceptual perfecto. Producci\xF3n impecable.",
      date: "2025-12-10"
    },
    {
      id: 3,
      albumTitle: "Thriller",
      albumArtist: "Michael Jackson",
      albumImageUrl: "https://via.placeholder.com/200",
      rating: 4,
      reviewText: "El rey del pop en su m\xE1ximo esplendor. Temas inolvidables.",
      date: "2025-12-05"
    }
  ], ...ngDevMode ? [{ debugName: "reviews" }] : []);
  // Mock data - Álbumes escuchados
  albums = signal([
    {
      id: 1,
      title: "Avantasia",
      artist: "Avantasia",
      imageUrl: "https://via.placeholder.com/200",
      rating: 5,
      listenedDate: "2025-12-20"
    },
    {
      id: 2,
      title: "De Aqu\xED No Sales Vivo",
      artist: "Calle 13",
      imageUrl: "https://via.placeholder.com/200",
      rating: 4,
      listenedDate: "2025-12-18"
    },
    {
      id: 3,
      title: "Black Sabbath",
      artist: "Black Sabbath",
      imageUrl: "https://via.placeholder.com/200",
      rating: 5,
      listenedDate: "2025-12-15"
    },
    {
      id: 4,
      title: "Los Funkcheros Cabrones",
      artist: "Varios",
      imageUrl: "https://via.placeholder.com/200",
      rating: 3,
      listenedDate: "2025-12-12"
    },
    {
      id: 5,
      title: "Hammer King",
      artist: "Hammer King",
      imageUrl: "https://via.placeholder.com/200",
      rating: 4,
      listenedDate: "2025-12-10"
    },
    {
      id: 6,
      title: "Holy Diver",
      artist: "Dio",
      imageUrl: "https://via.placeholder.com/200",
      rating: 5,
      listenedDate: "2025-12-08"
    },
    {
      id: 7,
      title: "Random Access Memories",
      artist: "Daft Punk",
      imageUrl: "https://via.placeholder.com/200",
      rating: 5,
      listenedDate: "2025-12-05"
    },
    {
      id: 8,
      title: "The Last Stand",
      artist: "Sabaton",
      imageUrl: "https://via.placeholder.com/200",
      rating: 4,
      listenedDate: "2025-12-01"
    }
  ], ...ngDevMode ? [{ debugName: "albums" }] : []);
  // Cambiar tab activo
  setActiveTab(tab) {
    this.activeTab.set(tab);
  }
  // Verificar si un tab está activo
  isTabActive(tab) {
    return this.activeTab() === tab;
  }
  // Handlers para las acciones
  viewReview(reviewId) {
    console.log("Ver rese\xF1a:", reviewId);
  }
  viewAlbum(albumId) {
    console.log("Ver \xE1lbum:", albumId);
  }
  editProfile = () => {
    console.log("Editar perfil");
  };
  shareProfile = () => {
    console.log("Compartir perfil");
  };
  static \u0275fac = function ProfileComponent_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _ProfileComponent)();
  };
  static \u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _ProfileComponent, selectors: [["app-profile"]], decls: 26, vars: 27, consts: [[1, "profile"], [1, "profile__container"], [1, "profile__sidebar"], ["cardType", "profile", "variant", "normal", 3, "title", "subtitle", "imageUrl", "imageAlt", "badges", "actions"], [1, "profile__stats"], [1, "profile__stat"], [1, "profile__stat-value"], [1, "profile__stat-label"], [1, "profile__content"], [1, "profile__tabs"], ["type", "button", 1, "profile__tab", 3, "click", "variant", "fullWidth"], ["variant", "ghost", "type", "button", 1, "profile__tab", "profile__tab--disabled", 3, "fullWidth", "disabled"], [1, "profile__tab-content"], [1, "profile__reviews"], [1, "profile__albums"], [1, "profile__review-card"], [1, "profile__review-image"], [3, "src", "alt"], [1, "profile__review-content"], [1, "profile__review-header"], [1, "profile__review-title"], [1, "profile__review-artist"], [1, "profile__review-rating"], ["size", "medium", 3, "rating"], [1, "profile__review-text"], [1, "profile__review-date"], ["variant", "vinilo", "cardType", "polaroid", "hoverEffect", "lift", 1, "profile__album-card", 3, "title", "titleLink", "subtitle", "subtitleLink", "imageUrl", "imageAlt"], ["variant", "vinilo", "cardType", "polaroid", "hoverEffect", "lift", 1, "profile__album-card", 3, "click", "title", "titleLink", "subtitle", "subtitleLink", "imageUrl", "imageAlt"], [1, "profile__album-rating"], ["size", "small", 3, "rating", "showValue"]], template: function ProfileComponent_Template(rf, ctx) {
    if (rf & 1) {
      \u0275\u0275elementStart(0, "main", 0)(1, "div", 1)(2, "aside", 2);
      \u0275\u0275element(3, "app-card", 3);
      \u0275\u0275elementStart(4, "div", 4)(5, "div", 5)(6, "span", 6);
      \u0275\u0275text(7);
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(8, "span", 7);
      \u0275\u0275text(9, "Rese\xF1as");
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(10, "div", 5)(11, "span", 6);
      \u0275\u0275text(12);
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(13, "span", 7);
      \u0275\u0275text(14, "\xC1lbumes");
      \u0275\u0275elementEnd()()()();
      \u0275\u0275elementStart(15, "main", 8)(16, "nav", 9)(17, "app-button", 10);
      \u0275\u0275listener("click", function ProfileComponent_Template_app_button_click_17_listener() {
        return ctx.setActiveTab("reviews");
      });
      \u0275\u0275text(18, " Rese\xF1as ");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(19, "app-button", 10);
      \u0275\u0275listener("click", function ProfileComponent_Template_app_button_click_19_listener() {
        return ctx.setActiveTab("albums");
      });
      \u0275\u0275text(20, " \xC1lbumes ");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(21, "app-button", 11);
      \u0275\u0275text(22, " Canciones ");
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(23, "div", 12);
      \u0275\u0275conditionalCreate(24, ProfileComponent_Conditional_24_Template, 3, 0, "div", 13);
      \u0275\u0275conditionalCreate(25, ProfileComponent_Conditional_25_Template, 3, 0, "div", 14);
      \u0275\u0275elementEnd()()()();
    }
    if (rf & 2) {
      \u0275\u0275advance(3);
      \u0275\u0275property("title", ctx.userProfile.name)("subtitle", "Miembro desde " + ctx.userProfile.memberSince)("imageUrl", ctx.userProfile.avatarUrl)("imageAlt", "Avatar de " + ctx.userProfile.name)("badges", ctx.favoriteGenres)("actions", \u0275\u0275pureFunction2(24, _c2, \u0275\u0275pureFunction1(20, _c0, ctx.editProfile), \u0275\u0275pureFunction1(22, _c1, ctx.shareProfile)));
      \u0275\u0275advance(4);
      \u0275\u0275textInterpolate(ctx.userProfile.totalReviews);
      \u0275\u0275advance(5);
      \u0275\u0275textInterpolate(ctx.userProfile.totalAlbums);
      \u0275\u0275advance(5);
      \u0275\u0275classProp("profile__tab--active", ctx.isTabActive("reviews"));
      \u0275\u0275property("variant", ctx.isTabActive("reviews") ? "primary" : "ghost")("fullWidth", true);
      \u0275\u0275advance(2);
      \u0275\u0275classProp("profile__tab--active", ctx.isTabActive("albums"));
      \u0275\u0275property("variant", ctx.isTabActive("albums") ? "primary" : "ghost")("fullWidth", true);
      \u0275\u0275advance(2);
      \u0275\u0275property("fullWidth", true)("disabled", true);
      \u0275\u0275advance(3);
      \u0275\u0275conditional(ctx.activeTab() === "reviews" ? 24 : -1);
      \u0275\u0275advance();
      \u0275\u0275conditional(ctx.activeTab() === "albums" ? 25 : -1);
    }
  }, dependencies: [CommonModule, Card, Button, RatingComponent], styles: ['@charset "UTF-8";\n\n\n\n.profile[_ngcontent-%COMP%] {\n  width: 100%;\n  min-height: 100vh;\n  padding: 2rem;\n  background-color: var(--bg-primary);\n}\n@media (max-width: 768px) {\n  .profile[_ngcontent-%COMP%] {\n    padding: 1rem;\n  }\n}\n.profile__container[_ngcontent-%COMP%] {\n  max-width: 1400px;\n  margin: 0 auto;\n  display: grid;\n  grid-template-columns: 1fr 2fr;\n  gap: 2rem;\n}\n@media (max-width: 1024px) {\n  .profile__container[_ngcontent-%COMP%] {\n    grid-template-columns: 1fr;\n  }\n}\n.profile__sidebar[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  gap: 2rem;\n}\n.profile__stats[_ngcontent-%COMP%] {\n  display: flex;\n  gap: 1rem;\n  padding: 2rem;\n  background-color: var(--bg-secondary);\n  border: 4px solid var(--border-color);\n  box-shadow: 4px 4px 0px #01131B;\n}\n.profile__stat[_ngcontent-%COMP%] {\n  flex: 1;\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n  gap: 0.5rem;\n  padding: 1rem;\n  background-color: var(--bg-primary);\n  border: 2px solid var(--border-color);\n  text-align: center;\n}\n.profile__stat-value[_ngcontent-%COMP%] {\n  font-size: 2.625rem;\n  line-height: 3rem;\n  font-weight: 700;\n  color: var(--color-primary);\n  line-height: 1;\n}\n.profile__stat-label[_ngcontent-%COMP%] {\n  font-size: 0.9375rem;\n  line-height: 1.5rem;\n  color: var(--text-secondary);\n  text-transform: uppercase;\n  font-weight: 600;\n  letter-spacing: 0.05em;\n}\n.profile__content[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  gap: 0;\n}\n.profile__tabs[_ngcontent-%COMP%] {\n  display: flex;\n  gap: 0;\n  border-bottom: 4px solid var(--border-color);\n  background-color: var(--bg-secondary);\n  padding: 0;\n}\n.profile__tab[_ngcontent-%COMP%] {\n  flex: 1;\n}\n@media (max-width: 768px) {\n  .profile__tab[_ngcontent-%COMP%] {\n    font-size: 0.9375rem;\n    line-height: 1.5rem;\n  }\n}\n.profile__tab-content[_ngcontent-%COMP%] {\n  min-height: 400px;\n  padding: 2rem;\n  background-color: var(--bg-primary);\n  border: 4px solid var(--border-color);\n  border-top: none;\n}\n@media (max-width: 768px) {\n  .profile__tab-content[_ngcontent-%COMP%] {\n    padding: 1rem;\n  }\n}\n.profile__reviews[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  gap: 2rem;\n}\n.profile__review-card[_ngcontent-%COMP%] {\n  display: grid;\n  grid-template-columns: 150px 1fr;\n  gap: 2rem;\n  padding: 2rem;\n  background-color: var(--bg-secondary);\n  border: 4px solid var(--border-color);\n  box-shadow: 4px 4px 0px #01131B;\n  transition: all 300ms ease-in-out;\n}\n.profile__review-card[_ngcontent-%COMP%]:hover:not(:disabled):not(.button--disabled) {\n  box-shadow: 4px 4px 0px #01131B;\n  transform: translate(2px, 2px);\n}\n.profile__review-card[_ngcontent-%COMP%]:active:not(:disabled):not(.button--disabled) {\n  box-shadow: 0px 0px 0px #01131B;\n  transform: translate(4px, 4px);\n}\n@media (max-width: 768px) {\n  .profile__review-card[_ngcontent-%COMP%] {\n    grid-template-columns: 100px 1fr;\n    gap: 1rem;\n    padding: 1rem;\n  }\n}\n.profile__review-image[_ngcontent-%COMP%] {\n  width: 150px;\n  height: 150px;\n  border: 4px solid var(--border-color);\n  overflow: hidden;\n  background-color: var(--bg-primary);\n  flex-shrink: 0;\n}\n.profile__review-image[_ngcontent-%COMP%]   img[_ngcontent-%COMP%] {\n  width: 100%;\n  height: 100%;\n  object-fit: cover;\n}\n@media (max-width: 768px) {\n  .profile__review-image[_ngcontent-%COMP%] {\n    width: 100px;\n    height: 100px;\n  }\n}\n.profile__review-content[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  gap: 1rem;\n}\n.profile__review-header[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  gap: 0.5rem;\n}\n.profile__review-title[_ngcontent-%COMP%] {\n  font-size: 1rem;\n  line-height: 3rem;\n  font-weight: 700;\n  color: var(--text-primary);\n  margin: 0;\n}\n.profile__review-artist[_ngcontent-%COMP%] {\n  font-size: 1rem;\n  line-height: 1.5rem;\n  color: var(--text-secondary);\n  margin: 0;\n}\n.profile__review-rating[_ngcontent-%COMP%] {\n  display: flex;\n  gap: 0.5rem;\n  margin-top: 0.5rem;\n}\n.profile__review-rating[_ngcontent-%COMP%]   .star[_ngcontent-%COMP%] {\n  color: var(--text-placeholder);\n  font-size: 1rem;\n}\n.profile__review-rating[_ngcontent-%COMP%]   .star--filled[_ngcontent-%COMP%] {\n  color: var(--color-primary);\n}\n.profile__review-text[_ngcontent-%COMP%] {\n  font-size: 1rem;\n  line-height: 1.5rem;\n  color: var(--text-primary);\n  margin: 0;\n  line-height: 1.6;\n}\n.profile__review-date[_ngcontent-%COMP%] {\n  font-size: 0.875rem;\n  line-height: 1.5rem;\n  color: var(--text-placeholder);\n  font-style: italic;\n}\n.profile__albums[_ngcontent-%COMP%] {\n  display: grid;\n  grid-template-columns: repeat(auto-fill, minmax(180px, 1fr));\n  gap: 2rem;\n}\n@media (max-width: 1024px) {\n  .profile__albums[_ngcontent-%COMP%] {\n    grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));\n    gap: 1rem;\n  }\n}\n@media (max-width: 768px) {\n  .profile__albums[_ngcontent-%COMP%] {\n    grid-template-columns: repeat(2, 1fr);\n  }\n}\n.profile__album-card[_ngcontent-%COMP%] {\n  cursor: pointer;\n  position: relative;\n}\n.profile__album-rating[_ngcontent-%COMP%] {\n  position: absolute;\n  bottom: 1rem;\n  right: 1rem;\n  background-color: var(--color-primary);\n  color: var(--text-dark);\n  padding: 0.5rem 1rem;\n  border-radius: 20px;\n  font-size: 0.875rem;\n  line-height: 1.5rem;\n  font-weight: 600;\n  box-shadow: 0 2px 8px color-mix(in srgb, var(--shadow-color) 20%, transparent);\n  z-index: 10;\n}\n@keyframes _ngcontent-%COMP%_slideIn {\n  from {\n    opacity: 0;\n    transform: translateY(20px);\n  }\n  to {\n    opacity: 1;\n    transform: translateY(0);\n  }\n}\n.profile__tab-content[_ngcontent-%COMP%] {\n  animation: _ngcontent-%COMP%_slideIn 0.4s ease-out;\n}\n/*# sourceMappingURL=profile.css.map */'] });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(ProfileComponent, [{
    type: Component,
    args: [{ selector: "app-profile", standalone: true, imports: [CommonModule, Card, Button, RatingComponent], template: `<main class="profile">\r
  <div class="profile__container">\r
    <!-- ============================================ -->\r
    <!-- COLUMNA IZQUIERDA: Card de Perfil (1/3)      -->\r
    <!-- ============================================ -->\r
    <aside class="profile__sidebar">\r
      <app-card\r
        [title]="userProfile.name"\r
        [subtitle]="'Miembro desde ' + userProfile.memberSince"\r
        [imageUrl]="userProfile.avatarUrl"\r
        [imageAlt]="'Avatar de ' + userProfile.name"\r
        cardType="profile"\r
        variant="normal"\r
        [badges]="favoriteGenres"\r
        [actions]="[\r
          { label: 'Editar Perfil', variant: 'primary', callback: editProfile },\r
          { label: 'Compartir', variant: 'secondary', callback: shareProfile }\r
        ]"\r
      >\r
      </app-card>\r
\r
      <!-- Estad\xEDsticas adicionales -->\r
      <div class="profile__stats">\r
        <div class="profile__stat">\r
          <span class="profile__stat-value">{{ userProfile.totalReviews }}</span>\r
          <span class="profile__stat-label">Rese\xF1as</span>\r
        </div>\r
        <div class="profile__stat">\r
          <span class="profile__stat-value">{{ userProfile.totalAlbums }}</span>\r
          <span class="profile__stat-label">\xC1lbumes</span>\r
        </div>\r
      </div>\r
    </aside>\r
\r
    <!-- ============================================ -->\r
    <!-- COLUMNA DERECHA: Tabs + Contenido (2/3)      -->\r
    <!-- ============================================ -->\r
    <main class="profile__content">\r
      <!-- Tabs de navegaci\xF3n -->\r
      <nav class="profile__tabs">\r
        <app-button\r
          [variant]="isTabActive('reviews') ? 'primary' : 'ghost'"\r
          type="button"\r
          [fullWidth]="true"\r
          (click)="setActiveTab('reviews')"\r
          [class.profile__tab--active]="isTabActive('reviews')"\r
          class="profile__tab"\r
        >\r
          Rese\xF1as\r
        </app-button>\r
        <app-button\r
          [variant]="isTabActive('albums') ? 'primary' : 'ghost'"\r
          type="button"\r
          [fullWidth]="true"\r
          (click)="setActiveTab('albums')"\r
          [class.profile__tab--active]="isTabActive('albums')"\r
          class="profile__tab"\r
        >\r
          \xC1lbumes\r
        </app-button>\r
        <app-button\r
          variant="ghost"\r
          type="button"\r
          [fullWidth]="true"\r
          [disabled]="true"\r
          class="profile__tab profile__tab--disabled"\r
        >\r
          Canciones\r
        </app-button>\r
      </nav>\r
\r
      <!-- Contenido seg\xFAn tab activo -->\r
      <div class="profile__tab-content">\r
        <!-- VISTA: RESE\xD1AS -->\r
        @if (activeTab() === 'reviews') {\r
          <div class="profile__reviews">\r
            @for (review of reviews(); track review.id) {\r
              <article class="profile__review-card">\r
                <div class="profile__review-image">\r
                  <img [src]="review.albumImageUrl" [alt]="review.albumTitle" />\r
                </div>\r
                <div class="profile__review-content">\r
                  <header class="profile__review-header">\r
                    <h3 class="profile__review-title">{{ review.albumTitle }}</h3>\r
                    <p class="profile__review-artist">{{ review.albumArtist }}</p>\r
                    <div class="profile__review-rating">\r
                      <app-rating [rating]="review.rating" size="medium" />\r
                    </div>\r
                  </header>\r
                  <p class="profile__review-text">{{ review.reviewText }}</p>\r
                  <time class="profile__review-date">{{ review.date }}</time>\r
                </div>\r
              </article>\r
            }\r
          </div>\r
        }\r
\r
        <!-- VISTA: \xC1LBUMES -->\r
        @if (activeTab() === 'albums') {\r
          <div class="profile__albums">\r
            @for (album of albums(); track album.id) {\r
              <app-card\r
                [title]="album.title"\r
                [titleLink]="'/album/' + album.id"\r
                [subtitle]="album.artist"\r
                [subtitleLink]="'/artist/' + album.artist"\r
                [imageUrl]="album.imageUrl"\r
                [imageAlt]="album.title + ' por ' + album.artist"\r
                variant="vinilo"\r
                cardType="polaroid"\r
                hoverEffect="lift"\r
                (click)="viewAlbum(album.id)"\r
                class="profile__album-card"\r
              >\r
                @if (album.rating) {\r
                  <div class="profile__album-rating">\r
                    <app-rating [rating]="album.rating" [showValue]="true" size="small" />\r
                  </div>\r
                }\r
              </app-card>\r
            }\r
          </div>\r
        }\r
      </div>\r
    </main>\r
  </div>\r
</main>\r
`, styles: ['@charset "UTF-8";\n\n/* src/app/pages/profile/profile.scss */\n.profile {\n  width: 100%;\n  min-height: 100vh;\n  padding: 2rem;\n  background-color: var(--bg-primary);\n}\n@media (max-width: 768px) {\n  .profile {\n    padding: 1rem;\n  }\n}\n.profile__container {\n  max-width: 1400px;\n  margin: 0 auto;\n  display: grid;\n  grid-template-columns: 1fr 2fr;\n  gap: 2rem;\n}\n@media (max-width: 1024px) {\n  .profile__container {\n    grid-template-columns: 1fr;\n  }\n}\n.profile__sidebar {\n  display: flex;\n  flex-direction: column;\n  gap: 2rem;\n}\n.profile__stats {\n  display: flex;\n  gap: 1rem;\n  padding: 2rem;\n  background-color: var(--bg-secondary);\n  border: 4px solid var(--border-color);\n  box-shadow: 4px 4px 0px #01131B;\n}\n.profile__stat {\n  flex: 1;\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n  gap: 0.5rem;\n  padding: 1rem;\n  background-color: var(--bg-primary);\n  border: 2px solid var(--border-color);\n  text-align: center;\n}\n.profile__stat-value {\n  font-size: 2.625rem;\n  line-height: 3rem;\n  font-weight: 700;\n  color: var(--color-primary);\n  line-height: 1;\n}\n.profile__stat-label {\n  font-size: 0.9375rem;\n  line-height: 1.5rem;\n  color: var(--text-secondary);\n  text-transform: uppercase;\n  font-weight: 600;\n  letter-spacing: 0.05em;\n}\n.profile__content {\n  display: flex;\n  flex-direction: column;\n  gap: 0;\n}\n.profile__tabs {\n  display: flex;\n  gap: 0;\n  border-bottom: 4px solid var(--border-color);\n  background-color: var(--bg-secondary);\n  padding: 0;\n}\n.profile__tab {\n  flex: 1;\n}\n@media (max-width: 768px) {\n  .profile__tab {\n    font-size: 0.9375rem;\n    line-height: 1.5rem;\n  }\n}\n.profile__tab-content {\n  min-height: 400px;\n  padding: 2rem;\n  background-color: var(--bg-primary);\n  border: 4px solid var(--border-color);\n  border-top: none;\n}\n@media (max-width: 768px) {\n  .profile__tab-content {\n    padding: 1rem;\n  }\n}\n.profile__reviews {\n  display: flex;\n  flex-direction: column;\n  gap: 2rem;\n}\n.profile__review-card {\n  display: grid;\n  grid-template-columns: 150px 1fr;\n  gap: 2rem;\n  padding: 2rem;\n  background-color: var(--bg-secondary);\n  border: 4px solid var(--border-color);\n  box-shadow: 4px 4px 0px #01131B;\n  transition: all 300ms ease-in-out;\n}\n.profile__review-card:hover:not(:disabled):not(.button--disabled) {\n  box-shadow: 4px 4px 0px #01131B;\n  transform: translate(2px, 2px);\n}\n.profile__review-card:active:not(:disabled):not(.button--disabled) {\n  box-shadow: 0px 0px 0px #01131B;\n  transform: translate(4px, 4px);\n}\n@media (max-width: 768px) {\n  .profile__review-card {\n    grid-template-columns: 100px 1fr;\n    gap: 1rem;\n    padding: 1rem;\n  }\n}\n.profile__review-image {\n  width: 150px;\n  height: 150px;\n  border: 4px solid var(--border-color);\n  overflow: hidden;\n  background-color: var(--bg-primary);\n  flex-shrink: 0;\n}\n.profile__review-image img {\n  width: 100%;\n  height: 100%;\n  object-fit: cover;\n}\n@media (max-width: 768px) {\n  .profile__review-image {\n    width: 100px;\n    height: 100px;\n  }\n}\n.profile__review-content {\n  display: flex;\n  flex-direction: column;\n  gap: 1rem;\n}\n.profile__review-header {\n  display: flex;\n  flex-direction: column;\n  gap: 0.5rem;\n}\n.profile__review-title {\n  font-size: 1rem;\n  line-height: 3rem;\n  font-weight: 700;\n  color: var(--text-primary);\n  margin: 0;\n}\n.profile__review-artist {\n  font-size: 1rem;\n  line-height: 1.5rem;\n  color: var(--text-secondary);\n  margin: 0;\n}\n.profile__review-rating {\n  display: flex;\n  gap: 0.5rem;\n  margin-top: 0.5rem;\n}\n.profile__review-rating .star {\n  color: var(--text-placeholder);\n  font-size: 1rem;\n}\n.profile__review-rating .star--filled {\n  color: var(--color-primary);\n}\n.profile__review-text {\n  font-size: 1rem;\n  line-height: 1.5rem;\n  color: var(--text-primary);\n  margin: 0;\n  line-height: 1.6;\n}\n.profile__review-date {\n  font-size: 0.875rem;\n  line-height: 1.5rem;\n  color: var(--text-placeholder);\n  font-style: italic;\n}\n.profile__albums {\n  display: grid;\n  grid-template-columns: repeat(auto-fill, minmax(180px, 1fr));\n  gap: 2rem;\n}\n@media (max-width: 1024px) {\n  .profile__albums {\n    grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));\n    gap: 1rem;\n  }\n}\n@media (max-width: 768px) {\n  .profile__albums {\n    grid-template-columns: repeat(2, 1fr);\n  }\n}\n.profile__album-card {\n  cursor: pointer;\n  position: relative;\n}\n.profile__album-rating {\n  position: absolute;\n  bottom: 1rem;\n  right: 1rem;\n  background-color: var(--color-primary);\n  color: var(--text-dark);\n  padding: 0.5rem 1rem;\n  border-radius: 20px;\n  font-size: 0.875rem;\n  line-height: 1.5rem;\n  font-weight: 600;\n  box-shadow: 0 2px 8px color-mix(in srgb, var(--shadow-color) 20%, transparent);\n  z-index: 10;\n}\n@keyframes slideIn {\n  from {\n    opacity: 0;\n    transform: translateY(20px);\n  }\n  to {\n    opacity: 1;\n    transform: translateY(0);\n  }\n}\n.profile__tab-content {\n  animation: slideIn 0.4s ease-out;\n}\n/*# sourceMappingURL=profile.css.map */\n'] }]
  }], null, null);
})();
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(ProfileComponent, { className: "ProfileComponent", filePath: "src/app/pages/profile/profile.ts", lineNumber: 35 });
})();
export {
  ProfileComponent as default
};
//# sourceMappingURL=chunk-AIEKV4QV.js.map
