import {
  SearchBar
} from "./chunk-A7VFCGOD.js";
import {
  RatingComponent
} from "./chunk-INEPXDF4.js";
import {
  Carousel
} from "./chunk-3EPKXEVM.js";
import {
  Card
} from "./chunk-CKLDZOBG.js";
import "./chunk-I3ETSPUB.js";
import "./chunk-N6XJ4GTA.js";
import {
  Button
} from "./chunk-HICAVZQE.js";
import {
  Component,
  Output,
  output,
  setClassMetadata,
  signal,
  ɵsetClassDebugInfo,
  ɵɵadvance,
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
  ɵɵrepeater,
  ɵɵrepeaterCreate,
  ɵɵresetView,
  ɵɵrestoreView,
  ɵɵtext,
  ɵɵtextInterpolate1
} from "./chunk-MWU7IQTJ.js";

// src/app/pages/home/home.ts
var _forTrack0 = ($index, $item) => $item.id;
function Home_For_14_Conditional_1_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 13);
    \u0275\u0275element(1, "app-rating", 14);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const album_r2 = \u0275\u0275nextContext().$implicit;
    \u0275\u0275advance();
    \u0275\u0275property("rating", album_r2.rating)("showValue", true);
  }
}
function Home_For_14_Template(rf, ctx) {
  if (rf & 1) {
    const _r1 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "app-card", 12);
    \u0275\u0275listener("click", function Home_For_14_Template_app_card_click_0_listener() {
      const album_r2 = \u0275\u0275restoreView(_r1).$implicit;
      const ctx_r2 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r2.viewAlbumDetails(album_r2.id));
    });
    \u0275\u0275conditionalCreate(1, Home_For_14_Conditional_1_Template, 2, 2, "div", 13);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const album_r2 = ctx.$implicit;
    \u0275\u0275property("title", album_r2.title)("titleLink", "/album/" + album_r2.id)("subtitle", album_r2.artist)("subtitleLink", "/artist/" + album_r2.artist)("imageUrl", album_r2.imageUrl)("imageAlt", album_r2.title + " por " + album_r2.artist);
    \u0275\u0275advance();
    \u0275\u0275conditional(album_r2.rating ? 1 : -1);
  }
}
function Home_For_18_Conditional_1_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 15);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const album_r5 = \u0275\u0275nextContext().$implicit;
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" \u{1F4AC} ", album_r5.reviewCount, " rese\xF1as ");
  }
}
function Home_For_18_Template(rf, ctx) {
  if (rf & 1) {
    const _r4 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "app-card", 12);
    \u0275\u0275listener("click", function Home_For_18_Template_app_card_click_0_listener() {
      const album_r5 = \u0275\u0275restoreView(_r4).$implicit;
      const ctx_r2 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r2.viewAlbumDetails(album_r5.id));
    });
    \u0275\u0275conditionalCreate(1, Home_For_18_Conditional_1_Template, 2, 1, "div", 15);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const album_r5 = ctx.$implicit;
    \u0275\u0275property("title", album_r5.title)("titleLink", "/album/" + album_r5.id)("subtitle", album_r5.artist)("subtitleLink", "/artist/" + album_r5.artist)("imageUrl", album_r5.imageUrl)("imageAlt", album_r5.title + " por " + album_r5.artist);
    \u0275\u0275advance();
    \u0275\u0275conditional(album_r5.reviewCount ? 1 : -1);
  }
}
var Home = class _Home {
  // Output para comunicación con el componente padre (si se necesita)
  registerRequest = output();
  // Mock data para los carruseles
  trendingAlbums = signal([
    {
      id: 1,
      title: "Random Access Memories",
      artist: "Daft Punk",
      imageUrl: "/assets/album-placeholder.jpg",
      rating: 4.5
    },
    {
      id: 2,
      title: "The Dark Side of the Moon",
      artist: "Pink Floyd",
      imageUrl: "/assets/album-placeholder.jpg",
      rating: 5
    },
    {
      id: 3,
      title: "Abbey Road",
      artist: "The Beatles",
      imageUrl: "/assets/album-placeholder.jpg",
      rating: 4.8
    },
    {
      id: 4,
      title: "Thriller",
      artist: "Michael Jackson",
      imageUrl: "/assets/album-placeholder.jpg",
      rating: 4.7
    },
    {
      id: 5,
      title: "Back in Black",
      artist: "AC/DC",
      imageUrl: "/assets/album-placeholder.jpg",
      rating: 4.6
    },
    {
      id: 6,
      title: "The Wall",
      artist: "Pink Floyd",
      imageUrl: "/assets/album-placeholder.jpg",
      rating: 4.9
    }
  ], ...ngDevMode ? [{ debugName: "trendingAlbums" }] : []);
  recentReviews = signal([
    {
      id: 7,
      title: "OK Computer",
      artist: "Radiohead",
      imageUrl: "/assets/album-placeholder.jpg",
      reviewCount: 156
    },
    {
      id: 8,
      title: "Rumours",
      artist: "Fleetwood Mac",
      imageUrl: "/assets/album-placeholder.jpg",
      reviewCount: 203
    },
    {
      id: 9,
      title: "Nevermind",
      artist: "Nirvana",
      imageUrl: "/assets/album-placeholder.jpg",
      reviewCount: 189
    },
    {
      id: 10,
      title: "Led Zeppelin IV",
      artist: "Led Zeppelin",
      imageUrl: "/assets/album-placeholder.jpg",
      reviewCount: 167
    },
    {
      id: 11,
      title: "The Joshua Tree",
      artist: "U2",
      imageUrl: "/assets/album-placeholder.jpg",
      reviewCount: 145
    },
    {
      id: 12,
      title: "Hotel California",
      artist: "Eagles",
      imageUrl: "/assets/album-placeholder.jpg",
      reviewCount: 178
    }
  ], ...ngDevMode ? [{ debugName: "recentReviews" }] : []);
  /**
   * Manejar búsqueda
   */
  handleSearch(searchTerm) {
    console.log("Buscando:", searchTerm);
  }
  /**
   * Abrir modal de registro
   * Por ahora solo emite evento, pero esto debería integrarse con el Header
   */
  openRegisterModal() {
    if (typeof window !== "undefined") {
      window.dispatchEvent(new CustomEvent("open-register-modal"));
    }
  }
  /**
   * Ver detalles del álbum
   */
  viewAlbumDetails(albumId) {
    console.log("Ver \xE1lbum:", albumId);
  }
  static \u0275fac = function Home_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _Home)();
  };
  static \u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _Home, selectors: [["app-home"]], outputs: { registerRequest: "registerRequest" }, decls: 19, vars: 0, consts: [[1, "home"], [1, "home__hero"], [1, "home__hero-content"], [1, "home__slogan"], [1, "home__slogan-highlight"], ["variant", "primary", "size", "lg", 1, "home__cta-button", 3, "clicked"], [1, "home__search"], [3, "onSearch"], [1, "home__section"], ["title", "\xDALTIMOS \xC1LBUMES EN TENDENCIA"], ["variant", "vinilo", "cardType", "polaroid", "hoverEffect", "lift", 1, "home__album-card", 3, "title", "titleLink", "subtitle", "subtitleLink", "imageUrl", "imageAlt"], ["title", "\xDALTIMOS \xC1LBUMES RESE\xD1ADOS"], ["variant", "vinilo", "cardType", "polaroid", "hoverEffect", "lift", 1, "home__album-card", 3, "click", "title", "titleLink", "subtitle", "subtitleLink", "imageUrl", "imageAlt"], [1, "home__rating"], ["size", "small", 3, "rating", "showValue"], [1, "home__reviews"]], template: function Home_Template(rf, ctx) {
    if (rf & 1) {
      \u0275\u0275elementStart(0, "div", 0)(1, "section", 1)(2, "div", 2)(3, "h1", 3);
      \u0275\u0275text(4, " Punt\xFAa todos tus \xE1lbumes favoritos ");
      \u0275\u0275elementStart(5, "span", 4);
      \u0275\u0275text(6, "en un solo lugar");
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(7, "app-button", 5);
      \u0275\u0275listener("clicked", function Home_Template_app_button_clicked_7_listener() {
        return ctx.openRegisterModal();
      });
      \u0275\u0275text(8, " COMIENZA AQU\xCD ");
      \u0275\u0275elementEnd()()();
      \u0275\u0275elementStart(9, "section", 6)(10, "app-search-bar", 7);
      \u0275\u0275listener("onSearch", function Home_Template_app_search_bar_onSearch_10_listener($event) {
        return ctx.handleSearch($event);
      });
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(11, "section", 8)(12, "app-carousel", 9);
      \u0275\u0275repeaterCreate(13, Home_For_14_Template, 2, 7, "app-card", 10, _forTrack0);
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(15, "section", 8)(16, "app-carousel", 11);
      \u0275\u0275repeaterCreate(17, Home_For_18_Template, 2, 7, "app-card", 10, _forTrack0);
      \u0275\u0275elementEnd()()();
    }
    if (rf & 2) {
      \u0275\u0275advance(13);
      \u0275\u0275repeater(ctx.trendingAlbums());
      \u0275\u0275advance(4);
      \u0275\u0275repeater(ctx.recentReviews());
    }
  }, dependencies: [Carousel, Card, SearchBar, Button, RatingComponent], styles: ['@charset "UTF-8";\n\n\n\n.home[_ngcontent-%COMP%] {\n  width: 100%;\n  padding: 0;\n}\n.home__hero[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  min-height: 50vh;\n  padding: 3rem 2rem;\n  background-color: var(--bg-primary);\n  text-align: center;\n  border-bottom: 2px solid var(--border-color);\n}\n.home__hero-content[_ngcontent-%COMP%] {\n  max-width: 800px;\n  width: 100%;\n}\n.home__slogan[_ngcontent-%COMP%] {\n  font-family: "Space Grotesk", sans-serif;\n  font-size: 4.25rem;\n  line-height: 4.5rem;\n  font-weight: 700;\n  color: var(--text-primary);\n  margin-bottom: 2rem;\n}\n@media (max-width: 768px) {\n  .home__slogan[_ngcontent-%COMP%] {\n    font-size: 2.625rem;\n    line-height: 3rem;\n  }\n}\n.home__slogan-highlight[_ngcontent-%COMP%] {\n  display: block;\n  color: var(--color-primary);\n  font-family: "Monoton";\n  font-size: 4rem;\n  margin-top: 0.5rem;\n  text-shadow: 2px 2px 0 var(--shadow-color);\n}\n@media (max-width: 768px) {\n  .home__slogan-highlight[_ngcontent-%COMP%] {\n    font-size: 2.5rem;\n  }\n}\n.home__cta-button[_ngcontent-%COMP%] {\n  margin-top: 1.5rem;\n}\n.home__search[_ngcontent-%COMP%] {\n  padding: 2rem;\n  background-color: var(--bg-primary);\n  display: flex;\n  justify-content: center;\n  border-bottom: 2px solid var(--border-color);\n}\n@media (max-width: 768px) {\n  .home__search[_ngcontent-%COMP%] {\n    padding: 1.5rem 1rem;\n  }\n}\n.home__section[_ngcontent-%COMP%] {\n  padding: 3rem 2rem;\n  background-color: var(--bg-primary);\n}\n.home__section[_ngcontent-%COMP%]:nth-child(even) {\n  background-color: var(--bg-secondary);\n}\n@media (max-width: 768px) {\n  .home__section[_ngcontent-%COMP%] {\n    padding: 2rem 1rem;\n  }\n}\n.home__album-card[_ngcontent-%COMP%] {\n  cursor: pointer;\n  transition: transform 0.3s ease;\n  min-width: 200px;\n  max-width: 250px;\n}\n@media (max-width: 768px) {\n  .home__album-card[_ngcontent-%COMP%] {\n    min-width: 160px;\n    max-width: 200px;\n  }\n}\n.home__rating[_ngcontent-%COMP%], \n.home__reviews[_ngcontent-%COMP%] {\n  position: absolute;\n  bottom: 0.75rem;\n  right: 0.75rem;\n  background-color: var(--color-primary);\n  color: var(--text-dark);\n  padding: 0.375rem 0.75rem;\n  border-radius: 20px;\n  font-size: 0.875rem;\n  font-weight: 600;\n  box-shadow: 0 2px 8px color-mix(in srgb, var(--shadow-color) 20%, transparent);\n  z-index: 10;\n}\n.home__reviews[_ngcontent-%COMP%] {\n  background-color: var(--color-secondary);\n}\n@keyframes _ngcontent-%COMP%_fadeIn {\n  from {\n    opacity: 0;\n    transform: translateY(20px);\n  }\n  to {\n    opacity: 1;\n    transform: translateY(0);\n  }\n}\n.home__hero-content[_ngcontent-%COMP%], \n.home__search[_ngcontent-%COMP%], \n.home__section[_ngcontent-%COMP%] {\n  animation: _ngcontent-%COMP%_fadeIn 0.6s ease-out;\n}\n.home__section[_ngcontent-%COMP%] {\n  animation-delay: 0.2s;\n}\n/*# sourceMappingURL=home.css.map */'] });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(Home, [{
    type: Component,
    args: [{ selector: "app-home", imports: [Carousel, Card, SearchBar, Button, RatingComponent], template: `<div class="home">\r
  <!-- ============================================ -->\r
  <!-- SECCI\xD3N HERO: Eslogan y CTA                  -->\r
  <!-- ============================================ -->\r
  <section class="home__hero">\r
    <div class="home__hero-content">\r
      <!-- Eslogan principal -->\r
      <h1 class="home__slogan">\r
        Punt\xFAa todos tus \xE1lbumes favoritos\r
        <span class="home__slogan-highlight">en un solo lugar</span>\r
      </h1>\r
\r
      <!-- Bot\xF3n de llamada a la acci\xF3n -->\r
      <app-button\r
        variant="primary"\r
        size="lg"\r
        (clicked)="openRegisterModal()"\r
        class="home__cta-button"\r
      >\r
        COMIENZA AQU\xCD\r
      </app-button>\r
    </div>\r
  </section>\r
\r
  <!-- ============================================ -->\r
  <!-- SECCI\xD3N DE B\xDASQUEDA                          -->\r
  <!-- ============================================ -->\r
  <section class="home__search">\r
    <app-search-bar\r
      (onSearch)="handleSearch($event)"\r
    ></app-search-bar>\r
  </section>\r
\r
  <!-- ============================================ -->\r
  <!-- CARRUSEL: \xC1LBUMES EN TENDENCIA               -->\r
  <!-- ============================================ -->\r
  <section class="home__section">\r
    <app-carousel title="\xDALTIMOS \xC1LBUMES EN TENDENCIA">\r
      @for (album of trendingAlbums(); track album.id) {\r
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
          (click)="viewAlbumDetails(album.id)"\r
          class="home__album-card"\r
        >\r
          <!-- Badge de rating si est\xE1 disponible -->\r
          @if (album.rating) {\r
            <div class="home__rating">\r
              <app-rating [rating]="album.rating" [showValue]="true" size="small" />\r
            </div>\r
          }\r
        </app-card>\r
      }\r
    </app-carousel>\r
  </section>\r
\r
  <!-- ============================================ -->\r
  <!-- CARRUSEL: \xC1LBUMES RESE\xD1ADOS                  -->\r
  <!-- ============================================ -->\r
  <section class="home__section">\r
    <app-carousel title="\xDALTIMOS \xC1LBUMES RESE\xD1ADOS">\r
      @for (album of recentReviews(); track album.id) {\r
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
          (click)="viewAlbumDetails(album.id)"\r
          class="home__album-card"\r
        >\r
          <!-- Badge de n\xFAmero de rese\xF1as -->\r
          @if (album.reviewCount) {\r
            <div class="home__reviews">\r
              \u{1F4AC} {{ album.reviewCount }} rese\xF1as\r
            </div>\r
          }\r
        </app-card>\r
      }\r
    </app-carousel>\r
  </section>\r
</div>\r
`, styles: ['@charset "UTF-8";\n\n/* src/app/pages/home/home.scss */\n.home {\n  width: 100%;\n  padding: 0;\n}\n.home__hero {\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  min-height: 50vh;\n  padding: 3rem 2rem;\n  background-color: var(--bg-primary);\n  text-align: center;\n  border-bottom: 2px solid var(--border-color);\n}\n.home__hero-content {\n  max-width: 800px;\n  width: 100%;\n}\n.home__slogan {\n  font-family: "Space Grotesk", sans-serif;\n  font-size: 4.25rem;\n  line-height: 4.5rem;\n  font-weight: 700;\n  color: var(--text-primary);\n  margin-bottom: 2rem;\n}\n@media (max-width: 768px) {\n  .home__slogan {\n    font-size: 2.625rem;\n    line-height: 3rem;\n  }\n}\n.home__slogan-highlight {\n  display: block;\n  color: var(--color-primary);\n  font-family: "Monoton";\n  font-size: 4rem;\n  margin-top: 0.5rem;\n  text-shadow: 2px 2px 0 var(--shadow-color);\n}\n@media (max-width: 768px) {\n  .home__slogan-highlight {\n    font-size: 2.5rem;\n  }\n}\n.home__cta-button {\n  margin-top: 1.5rem;\n}\n.home__search {\n  padding: 2rem;\n  background-color: var(--bg-primary);\n  display: flex;\n  justify-content: center;\n  border-bottom: 2px solid var(--border-color);\n}\n@media (max-width: 768px) {\n  .home__search {\n    padding: 1.5rem 1rem;\n  }\n}\n.home__section {\n  padding: 3rem 2rem;\n  background-color: var(--bg-primary);\n}\n.home__section:nth-child(even) {\n  background-color: var(--bg-secondary);\n}\n@media (max-width: 768px) {\n  .home__section {\n    padding: 2rem 1rem;\n  }\n}\n.home__album-card {\n  cursor: pointer;\n  transition: transform 0.3s ease;\n  min-width: 200px;\n  max-width: 250px;\n}\n@media (max-width: 768px) {\n  .home__album-card {\n    min-width: 160px;\n    max-width: 200px;\n  }\n}\n.home__rating,\n.home__reviews {\n  position: absolute;\n  bottom: 0.75rem;\n  right: 0.75rem;\n  background-color: var(--color-primary);\n  color: var(--text-dark);\n  padding: 0.375rem 0.75rem;\n  border-radius: 20px;\n  font-size: 0.875rem;\n  font-weight: 600;\n  box-shadow: 0 2px 8px color-mix(in srgb, var(--shadow-color) 20%, transparent);\n  z-index: 10;\n}\n.home__reviews {\n  background-color: var(--color-secondary);\n}\n@keyframes fadeIn {\n  from {\n    opacity: 0;\n    transform: translateY(20px);\n  }\n  to {\n    opacity: 1;\n    transform: translateY(0);\n  }\n}\n.home__hero-content,\n.home__search,\n.home__section {\n  animation: fadeIn 0.6s ease-out;\n}\n.home__section {\n  animation-delay: 0.2s;\n}\n/*# sourceMappingURL=home.css.map */\n'] }]
  }], null, { registerRequest: [{ type: Output, args: ["registerRequest"] }] });
})();
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(Home, { className: "Home", filePath: "src/app/pages/home/home.ts", lineNumber: 24 });
})();
export {
  Home
};
//# sourceMappingURL=chunk-HSQCKOYP.js.map
