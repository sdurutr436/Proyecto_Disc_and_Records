import {
  Spinner
} from "./chunk-VQZYH7QQ.js";
import {
  SearchBar
} from "./chunk-47J45JCQ.js";
import {
  RatingComponent
} from "./chunk-MMIPL7I2.js";
import {
  Card
} from "./chunk-XPYEI6RS.js";
import {
  ActivatedRoute,
  Router
} from "./chunk-BFARIXWD.js";
import "./chunk-AVQDXX3C.js";
import {
  Button
} from "./chunk-QEXKGZ6Y.js";
import "./chunk-MBYWNRDU.js";
import {
  CommonModule,
  Component,
  __spreadProps,
  __spreadValues,
  computed,
  setClassMetadata,
  signal,
  ɵsetClassDebugInfo,
  ɵɵadvance,
  ɵɵclassProp,
  ɵɵconditional,
  ɵɵconditionalCreate,
  ɵɵdefineComponent,
  ɵɵdirectiveInject,
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
  ɵɵsanitizeUrl,
  ɵɵtext,
  ɵɵtextInterpolate,
  ɵɵtextInterpolate1,
  ɵɵtextInterpolate2,
  ɵɵtextInterpolate3
} from "./chunk-PFYGRVXA.js";

// src/app/pages/search-results/search-results.ts
var _forTrack0 = ($index, $item) => $item.id;
function SearchResultsComponent_Conditional_34_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "section", 12);
    \u0275\u0275element(1, "app-spinner");
    \u0275\u0275elementStart(2, "p");
    \u0275\u0275text(3, "Buscando...");
    \u0275\u0275elementEnd()();
  }
}
function SearchResultsComponent_Conditional_35_Conditional_0_For_3_Conditional_1_Conditional_3_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 21);
    \u0275\u0275element(1, "app-rating", 22);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const result_r2 = \u0275\u0275nextContext(2).$implicit;
    \u0275\u0275advance();
    \u0275\u0275property("rating", result_r2.rating)("showValue", true);
  }
}
function SearchResultsComponent_Conditional_35_Conditional_0_For_3_Conditional_1_Template(rf, ctx) {
  if (rf & 1) {
    const _r1 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "app-card", 19);
    \u0275\u0275listener("click", function SearchResultsComponent_Conditional_35_Conditional_0_For_3_Conditional_1_Template_app_card_click_0_listener() {
      \u0275\u0275restoreView(_r1);
      const result_r2 = \u0275\u0275nextContext().$implicit;
      const ctx_r2 = \u0275\u0275nextContext(3);
      return \u0275\u0275resetView(ctx_r2.viewResult(result_r2));
    });
    \u0275\u0275elementStart(1, "div", 20);
    \u0275\u0275text(2);
    \u0275\u0275elementEnd();
    \u0275\u0275conditionalCreate(3, SearchResultsComponent_Conditional_35_Conditional_0_For_3_Conditional_1_Conditional_3_Template, 2, 2, "div", 21);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const result_r2 = \u0275\u0275nextContext().$implicit;
    const ctx_r2 = \u0275\u0275nextContext(3);
    \u0275\u0275property("title", result_r2.title)("titleLink", "/" + result_r2.type + "/" + result_r2.id)("subtitle", result_r2.subtitle || "")("imageUrl", result_r2.imageUrl)("imageAlt", result_r2.title)("variant", result_r2.type === "album" ? "vinilo" : "normal");
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate2(" ", ctx_r2.getResultIcon(result_r2.type), " ", ctx_r2.getResultTypeLabel(result_r2.type), " ");
    \u0275\u0275advance();
    \u0275\u0275conditional(result_r2.rating ? 3 : -1);
  }
}
function SearchResultsComponent_Conditional_35_Conditional_0_For_3_Conditional_2_Conditional_8_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "p", 29);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const result_r2 = \u0275\u0275nextContext(2).$implicit;
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(result_r2.subtitle);
  }
}
function SearchResultsComponent_Conditional_35_Conditional_0_For_3_Conditional_2_Conditional_9_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "p", 30);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const result_r2 = \u0275\u0275nextContext(2).$implicit;
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(result_r2.description);
  }
}
function SearchResultsComponent_Conditional_35_Conditional_0_For_3_Conditional_2_Conditional_10_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 31);
    \u0275\u0275element(1, "app-rating", 32);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const result_r2 = \u0275\u0275nextContext(2).$implicit;
    \u0275\u0275advance();
    \u0275\u0275property("rating", result_r2.rating);
  }
}
function SearchResultsComponent_Conditional_35_Conditional_0_For_3_Conditional_2_Template(rf, ctx) {
  if (rf & 1) {
    const _r4 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 23);
    \u0275\u0275listener("click", function SearchResultsComponent_Conditional_35_Conditional_0_For_3_Conditional_2_Template_div_click_0_listener() {
      \u0275\u0275restoreView(_r4);
      const result_r2 = \u0275\u0275nextContext().$implicit;
      const ctx_r2 = \u0275\u0275nextContext(3);
      return \u0275\u0275resetView(ctx_r2.viewResult(result_r2));
    });
    \u0275\u0275elementStart(1, "div", 24);
    \u0275\u0275element(2, "img", 25);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "div", 26)(4, "div", 27);
    \u0275\u0275text(5);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(6, "h3", 28);
    \u0275\u0275text(7);
    \u0275\u0275elementEnd();
    \u0275\u0275conditionalCreate(8, SearchResultsComponent_Conditional_35_Conditional_0_For_3_Conditional_2_Conditional_8_Template, 2, 1, "p", 29);
    \u0275\u0275conditionalCreate(9, SearchResultsComponent_Conditional_35_Conditional_0_For_3_Conditional_2_Conditional_9_Template, 2, 1, "p", 30);
    \u0275\u0275conditionalCreate(10, SearchResultsComponent_Conditional_35_Conditional_0_For_3_Conditional_2_Conditional_10_Template, 2, 1, "div", 31);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const result_r2 = \u0275\u0275nextContext().$implicit;
    const ctx_r2 = \u0275\u0275nextContext(3);
    \u0275\u0275advance(2);
    \u0275\u0275property("src", result_r2.imageUrl, \u0275\u0275sanitizeUrl)("alt", result_r2.title);
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate2(" ", ctx_r2.getResultIcon(result_r2.type), " ", ctx_r2.getResultTypeLabel(result_r2.type), " ");
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(result_r2.title);
    \u0275\u0275advance();
    \u0275\u0275conditional(result_r2.subtitle ? 8 : -1);
    \u0275\u0275advance();
    \u0275\u0275conditional(result_r2.description ? 9 : -1);
    \u0275\u0275advance();
    \u0275\u0275conditional(result_r2.rating ? 10 : -1);
  }
}
function SearchResultsComponent_Conditional_35_Conditional_0_For_3_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "article", 16);
    \u0275\u0275conditionalCreate(1, SearchResultsComponent_Conditional_35_Conditional_0_For_3_Conditional_1_Template, 4, 9, "app-card", 17);
    \u0275\u0275conditionalCreate(2, SearchResultsComponent_Conditional_35_Conditional_0_For_3_Conditional_2_Template, 11, 8, "div", 18);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const result_r2 = ctx.$implicit;
    \u0275\u0275advance();
    \u0275\u0275conditional(result_r2.type === "album" || result_r2.type === "artist" ? 1 : -1);
    \u0275\u0275advance();
    \u0275\u0275conditional(result_r2.type === "user" || result_r2.type === "review" ? 2 : -1);
  }
}
function SearchResultsComponent_Conditional_35_Conditional_0_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "section", 13)(1, "div", 15);
    \u0275\u0275repeaterCreate(2, SearchResultsComponent_Conditional_35_Conditional_0_For_3_Template, 3, 2, "article", 16, _forTrack0);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const ctx_r2 = \u0275\u0275nextContext(2);
    \u0275\u0275advance(2);
    \u0275\u0275repeater(ctx_r2.filteredResults());
  }
}
function SearchResultsComponent_Conditional_35_Conditional_1_Conditional_9_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span");
    \u0275\u0275text(1, " en la categor\xEDa de ");
    \u0275\u0275elementStart(2, "strong");
    \u0275\u0275text(3);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const ctx_r2 = \u0275\u0275nextContext(3);
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate1("", ctx_r2.getResultTypeLabel(ctx_r2.activeFilter()), "s");
  }
}
function SearchResultsComponent_Conditional_35_Conditional_1_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 14)(1, "div", 33);
    \u0275\u0275text(2, "\u{1F50D}");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "h2", 34);
    \u0275\u0275text(4, "No se encontraron resultados");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(5, "p", 35);
    \u0275\u0275text(6, " No encontramos ning\xFAn resultado para ");
    \u0275\u0275elementStart(7, "strong");
    \u0275\u0275text(8);
    \u0275\u0275elementEnd();
    \u0275\u0275conditionalCreate(9, SearchResultsComponent_Conditional_35_Conditional_1_Conditional_9_Template, 4, 1, "span");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(10, "p", 36);
    \u0275\u0275text(11, " Intenta con otro t\xE9rmino de b\xFAsqueda o cambia el filtro ");
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const ctx_r2 = \u0275\u0275nextContext(2);
    \u0275\u0275advance(8);
    \u0275\u0275textInterpolate1('"', ctx_r2.searchTerm(), '"');
    \u0275\u0275advance();
    \u0275\u0275conditional(ctx_r2.activeFilter() !== "all" ? 9 : -1);
  }
}
function SearchResultsComponent_Conditional_35_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275conditionalCreate(0, SearchResultsComponent_Conditional_35_Conditional_0_Template, 4, 0, "section", 13);
    \u0275\u0275conditionalCreate(1, SearchResultsComponent_Conditional_35_Conditional_1_Template, 12, 2, "div", 14);
  }
  if (rf & 2) {
    const ctx_r2 = \u0275\u0275nextContext();
    \u0275\u0275conditional(ctx_r2.filteredResults().length > 0 ? 0 : -1);
    \u0275\u0275advance();
    \u0275\u0275conditional(ctx_r2.filteredResults().length === 0 ? 1 : -1);
  }
}
var SearchResultsComponent = class _SearchResultsComponent {
  route;
  router;
  searchTerm = signal("", ...ngDevMode ? [{ debugName: "searchTerm" }] : []);
  activeFilter = signal("all", ...ngDevMode ? [{ debugName: "activeFilter" }] : []);
  isLoading = signal(false, ...ngDevMode ? [{ debugName: "isLoading" }] : []);
  // Mock data - En producción vendría del backend
  allResults = signal([
    {
      id: 1,
      type: "album",
      title: "Random Access Memories",
      subtitle: "Daft Punk",
      imageUrl: "https://via.placeholder.com/200",
      rating: 5,
      reviewCount: 342
    },
    {
      id: 2,
      type: "album",
      title: "The Dark Side of the Moon",
      subtitle: "Pink Floyd",
      imageUrl: "https://via.placeholder.com/200",
      rating: 5,
      reviewCount: 521
    },
    {
      id: 3,
      type: "artist",
      title: "Daft Punk",
      subtitle: "Artista",
      imageUrl: "https://via.placeholder.com/200",
      description: "D\xFAo franc\xE9s de m\xFAsica electr\xF3nica"
    },
    {
      id: 4,
      type: "user",
      title: "PerreteGordete",
      subtitle: "Usuario",
      imageUrl: "https://via.placeholder.com/200",
      description: "Miembro desde Enero 2025"
    },
    {
      id: 5,
      type: "review",
      title: 'Rese\xF1a de "Thriller"',
      subtitle: "por MusicLover123",
      imageUrl: "https://via.placeholder.com/200",
      rating: 4,
      description: "El rey del pop en su m\xE1ximo esplendor. Temas inolvidables que han marcado generaciones..."
    },
    {
      id: 6,
      type: "album",
      title: "Avantasia",
      subtitle: "Avantasia",
      imageUrl: "https://via.placeholder.com/200",
      rating: 5,
      reviewCount: 89
    },
    {
      id: 7,
      type: "album",
      title: "Hammer King",
      subtitle: "Hammer King",
      imageUrl: "https://via.placeholder.com/200",
      rating: 4,
      reviewCount: 45
    },
    {
      id: 8,
      type: "artist",
      title: "Pink Floyd",
      subtitle: "Artista",
      imageUrl: "https://via.placeholder.com/200",
      description: "Banda brit\xE1nica de rock progresivo"
    }
  ], ...ngDevMode ? [{ debugName: "allResults" }] : []);
  // Computed: filtrar resultados según el filtro activo
  filteredResults = computed(() => {
    const filter = this.activeFilter();
    const results = this.allResults();
    if (filter === "all") {
      return results;
    }
    return results.filter((item) => {
      switch (filter) {
        case "albums":
          return item.type === "album";
        case "artists":
          return item.type === "artist";
        case "users":
          return item.type === "user";
        case "reviews":
          return item.type === "review";
        default:
          return true;
      }
    });
  }, ...ngDevMode ? [{ debugName: "filteredResults" }] : []);
  // Computed: contar resultados por tipo
  resultsCount = computed(() => {
    const results = this.allResults();
    return {
      all: results.length,
      albums: results.filter((r) => r.type === "album").length,
      artists: results.filter((r) => r.type === "artist").length,
      users: results.filter((r) => r.type === "user").length,
      reviews: results.filter((r) => r.type === "review").length
    };
  }, ...ngDevMode ? [{ debugName: "resultsCount" }] : []);
  constructor(route, router) {
    this.route = route;
    this.router = router;
  }
  ngOnInit() {
    this.route.queryParams.subscribe((params) => {
      const query = params["q"] || "";
      this.searchTerm.set(query);
      const filter = params["filter"];
      if (filter && ["albums", "artists", "users", "reviews"].includes(filter)) {
        this.activeFilter.set(filter);
      } else {
        this.activeFilter.set("all");
      }
      if (query) {
        this.performSearch(query);
      }
    });
    const navState = history.state;
    if (navState?.previousSearch) {
      console.log("Volviendo de:", navState.previousSearch);
    }
  }
  performSearch(query) {
    this.isLoading.set(true);
    setTimeout(() => {
      this.isLoading.set(false);
    }, 500);
  }
  setFilter(filter) {
    this.activeFilter.set(filter);
  }
  isFilterActive(filter) {
    return this.activeFilter() === filter;
  }
  getResultIcon(type) {
    switch (type) {
      case "album":
        return "\u{1F4BF}";
      case "artist":
        return "\u{1F3A4}";
      case "user":
        return "\u{1F464}";
      case "review":
        return "\u{1F4DD}";
      default:
        return "\u{1F50D}";
    }
  }
  getResultTypeLabel(type) {
    switch (type) {
      case "album":
        return "\xC1lbum";
      case "artist":
        return "Artista";
      case "user":
        return "Usuario";
      case "review":
        return "Rese\xF1a";
      default:
        return "";
    }
  }
  // ============================================
  // NAVEGACIÓN PROGRAMÁTICA
  // ============================================
  /**
   * Navegar al resultado con NavigationExtras state
   * Pasa información del contexto de búsqueda para uso en la página destino
   */
  viewResult(result) {
    const extras = {
      state: {
        fromSearch: true,
        searchTerm: this.searchTerm(),
        resultPosition: this.filteredResults().indexOf(result) + 1,
        totalResults: this.filteredResults().length
      }
    };
    switch (result.type) {
      case "album":
        this.router.navigate(["/album", result.id], __spreadProps(__spreadValues({}, extras), {
          fragment: "info"
        }));
        break;
      case "artist":
        this.router.navigate(["/artist", result.id], extras);
        break;
      case "user":
        this.router.navigate(["/profile", result.id], extras);
        break;
      case "review":
        this.router.navigate(["/album", result.id], __spreadProps(__spreadValues({}, extras), {
          fragment: "reviews"
        }));
        break;
    }
  }
  /**
   * Nueva búsqueda con queryParamsHandling para preservar parámetros
   */
  newSearch(query) {
    if (query.trim()) {
      const extras = {
        queryParams: { q: query },
        // 'merge' preserva otros query params existentes
        queryParamsHandling: "merge",
        // No añadir al historial cada búsqueda intermedia
        replaceUrl: false
      };
      this.router.navigate(["/search"], extras);
    }
  }
  /**
   * Aplicar filtro actualizando query params
   */
  applyFilterWithQueryParams(filter) {
    this.setFilter(filter);
    const extras = {
      queryParams: { filter: filter === "all" ? null : filter },
      queryParamsHandling: "merge",
      replaceUrl: true
      // Reemplazar en historial, no apilar
    };
    this.router.navigate([], extras);
  }
  goBack() {
    this.router.navigate(["/"]);
  }
  static \u0275fac = function SearchResultsComponent_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _SearchResultsComponent)(\u0275\u0275directiveInject(ActivatedRoute), \u0275\u0275directiveInject(Router));
  };
  static \u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _SearchResultsComponent, selectors: [["app-search-results"]], decls: 36, vars: 31, consts: [[1, "search-results"], [1, "search-results__header"], ["variant", "secondary", "size", "md", "type", "button", 3, "click"], [1, "search-results__header-content"], [1, "search-results__title"], [1, "search-results__query"], [1, "search-results__count"], [1, "search-results__search-bar"], [3, "onSearch"], [1, "search-results__filters"], ["type", "button", 1, "search-results__filter", 3, "click", "variant", "fullWidth"], [1, "search-results__filter-count"], [1, "search-results__loading"], [1, "search-results__content"], [1, "search-results__empty"], [1, "search-results__grid"], [1, "search-results__item"], ["cardType", "polaroid", "hoverEffect", "lift", 1, "search-results__card", 3, "title", "titleLink", "subtitle", "imageUrl", "imageAlt", "variant"], [1, "search-results__custom-card"], ["cardType", "polaroid", "hoverEffect", "lift", 1, "search-results__card", 3, "click", "title", "titleLink", "subtitle", "imageUrl", "imageAlt", "variant"], [1, "search-results__badge"], [1, "search-results__rating"], ["size", "small", 3, "rating", "showValue"], [1, "search-results__custom-card", 3, "click"], [1, "search-results__custom-image"], [3, "src", "alt"], [1, "search-results__custom-content"], [1, "search-results__custom-badge"], [1, "search-results__custom-title"], [1, "search-results__custom-subtitle"], [1, "search-results__custom-description"], [1, "search-results__custom-rating"], ["size", "medium", 3, "rating"], [1, "search-results__empty-icon"], [1, "search-results__empty-title"], [1, "search-results__empty-text"], [1, "search-results__empty-suggestion"]], template: function SearchResultsComponent_Template(rf, ctx) {
    if (rf & 1) {
      \u0275\u0275elementStart(0, "main", 0)(1, "header", 1)(2, "app-button", 2);
      \u0275\u0275listener("click", function SearchResultsComponent_Template_app_button_click_2_listener() {
        return ctx.goBack();
      });
      \u0275\u0275text(3, " \u2190 Volver ");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(4, "div", 3)(5, "h1", 4);
      \u0275\u0275text(6, " Resultados para: ");
      \u0275\u0275elementStart(7, "span", 5);
      \u0275\u0275text(8);
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(9, "p", 6);
      \u0275\u0275text(10);
      \u0275\u0275elementEnd()()();
      \u0275\u0275elementStart(11, "section", 7)(12, "app-search-bar", 8);
      \u0275\u0275listener("onSearch", function SearchResultsComponent_Template_app_search_bar_onSearch_12_listener($event) {
        return ctx.newSearch($event);
      });
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(13, "nav", 9)(14, "app-button", 10);
      \u0275\u0275listener("click", function SearchResultsComponent_Template_app_button_click_14_listener() {
        return ctx.setFilter("all");
      });
      \u0275\u0275text(15, " Todos ");
      \u0275\u0275elementStart(16, "span", 11);
      \u0275\u0275text(17);
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(18, "app-button", 10);
      \u0275\u0275listener("click", function SearchResultsComponent_Template_app_button_click_18_listener() {
        return ctx.setFilter("albums");
      });
      \u0275\u0275text(19, " \u{1F4BF} \xC1lbumes ");
      \u0275\u0275elementStart(20, "span", 11);
      \u0275\u0275text(21);
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(22, "app-button", 10);
      \u0275\u0275listener("click", function SearchResultsComponent_Template_app_button_click_22_listener() {
        return ctx.setFilter("artists");
      });
      \u0275\u0275text(23, " \u{1F3A4} Artistas ");
      \u0275\u0275elementStart(24, "span", 11);
      \u0275\u0275text(25);
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(26, "app-button", 10);
      \u0275\u0275listener("click", function SearchResultsComponent_Template_app_button_click_26_listener() {
        return ctx.setFilter("users");
      });
      \u0275\u0275text(27, " \u{1F464} Usuarios ");
      \u0275\u0275elementStart(28, "span", 11);
      \u0275\u0275text(29);
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(30, "app-button", 10);
      \u0275\u0275listener("click", function SearchResultsComponent_Template_app_button_click_30_listener() {
        return ctx.setFilter("reviews");
      });
      \u0275\u0275text(31, " \u{1F4DD} Rese\xF1as ");
      \u0275\u0275elementStart(32, "span", 11);
      \u0275\u0275text(33);
      \u0275\u0275elementEnd()()();
      \u0275\u0275conditionalCreate(34, SearchResultsComponent_Conditional_34_Template, 4, 0, "section", 12);
      \u0275\u0275conditionalCreate(35, SearchResultsComponent_Conditional_35_Template, 2, 2);
      \u0275\u0275elementEnd();
    }
    if (rf & 2) {
      \u0275\u0275advance(8);
      \u0275\u0275textInterpolate1('"', ctx.searchTerm(), '"');
      \u0275\u0275advance(2);
      \u0275\u0275textInterpolate3(" ", ctx.filteredResults().length, " resultado", ctx.filteredResults().length !== 1 ? "s" : "", " encontrado", ctx.filteredResults().length !== 1 ? "s" : "", " ");
      \u0275\u0275advance(4);
      \u0275\u0275classProp("search-results__filter--active", ctx.isFilterActive("all"));
      \u0275\u0275property("variant", ctx.isFilterActive("all") ? "primary" : "ghost")("fullWidth", true);
      \u0275\u0275advance(3);
      \u0275\u0275textInterpolate1("(", ctx.resultsCount().all, ")");
      \u0275\u0275advance();
      \u0275\u0275classProp("search-results__filter--active", ctx.isFilterActive("albums"));
      \u0275\u0275property("variant", ctx.isFilterActive("albums") ? "primary" : "ghost")("fullWidth", true);
      \u0275\u0275advance(3);
      \u0275\u0275textInterpolate1("(", ctx.resultsCount().albums, ")");
      \u0275\u0275advance();
      \u0275\u0275classProp("search-results__filter--active", ctx.isFilterActive("artists"));
      \u0275\u0275property("variant", ctx.isFilterActive("artists") ? "primary" : "ghost")("fullWidth", true);
      \u0275\u0275advance(3);
      \u0275\u0275textInterpolate1("(", ctx.resultsCount().artists, ")");
      \u0275\u0275advance();
      \u0275\u0275classProp("search-results__filter--active", ctx.isFilterActive("users"));
      \u0275\u0275property("variant", ctx.isFilterActive("users") ? "primary" : "ghost")("fullWidth", true);
      \u0275\u0275advance(3);
      \u0275\u0275textInterpolate1("(", ctx.resultsCount().users, ")");
      \u0275\u0275advance();
      \u0275\u0275classProp("search-results__filter--active", ctx.isFilterActive("reviews"));
      \u0275\u0275property("variant", ctx.isFilterActive("reviews") ? "primary" : "ghost")("fullWidth", true);
      \u0275\u0275advance(3);
      \u0275\u0275textInterpolate1("(", ctx.resultsCount().reviews, ")");
      \u0275\u0275advance();
      \u0275\u0275conditional(ctx.isLoading() ? 34 : -1);
      \u0275\u0275advance();
      \u0275\u0275conditional(!ctx.isLoading() ? 35 : -1);
    }
  }, dependencies: [CommonModule, Card, SearchBar, Button, Spinner, RatingComponent], styles: ['@charset "UTF-8";\n\n\n\n.search-results[_ngcontent-%COMP%] {\n  width: 100%;\n  min-height: 100vh;\n  background-color: var(--bg-primary);\n}\n.search-results__header[_ngcontent-%COMP%] {\n  padding: 2rem;\n  background-color: var(--bg-secondary);\n  border-bottom: 4px solid var(--border-color);\n  display: flex;\n  align-items: center;\n  gap: 2rem;\n}\n@media (max-width: 768px) {\n  .search-results__header[_ngcontent-%COMP%] {\n    padding: 2rem 1rem;\n    flex-direction: column;\n    align-items: flex-start;\n    gap: 1rem;\n  }\n}\n.search-results__header-content[_ngcontent-%COMP%] {\n  flex: 1;\n}\n.search-results__title[_ngcontent-%COMP%] {\n  font-size: 1.625rem;\n  line-height: 3rem;\n  font-weight: 700;\n  color: var(--text-primary);\n  margin: 0 0 0.5rem 0;\n}\n@media (max-width: 768px) {\n  .search-results__title[_ngcontent-%COMP%] {\n    font-size: 1rem;\n    line-height: 3rem;\n  }\n}\n.search-results__query[_ngcontent-%COMP%] {\n  color: var(--color-primary);\n  font-family: "Monoton";\n}\n.search-results__count[_ngcontent-%COMP%] {\n  font-size: 0.9375rem;\n  line-height: 1.5rem;\n  color: var(--text-secondary);\n  margin: 0;\n  font-weight: 600;\n}\n.search-results__search-bar[_ngcontent-%COMP%] {\n  padding: 2rem;\n  background-color: var(--bg-primary);\n  border-bottom: 2px solid var(--border-color);\n  display: flex;\n  justify-content: center;\n}\n@media (max-width: 768px) {\n  .search-results__search-bar[_ngcontent-%COMP%] {\n    padding: 2rem 1rem;\n  }\n}\n.search-results__filters[_ngcontent-%COMP%] {\n  display: flex;\n  gap: 0;\n  background-color: var(--bg-secondary);\n  border-bottom: 4px solid var(--border-color);\n  overflow-x: auto;\n  -webkit-overflow-scrolling: touch;\n}\n.search-results__filters[_ngcontent-%COMP%]::-webkit-scrollbar {\n  height: 4px;\n}\n.search-results__filters[_ngcontent-%COMP%]::-webkit-scrollbar-track {\n  background: var(--bg-primary);\n}\n.search-results__filters[_ngcontent-%COMP%]::-webkit-scrollbar-thumb {\n  background: var(--color-primary);\n  border-radius: 5px;\n}\n.search-results__filter[_ngcontent-%COMP%] {\n  flex: 1;\n  min-width: fit-content;\n  white-space: nowrap;\n}\n@media (max-width: 768px) {\n  .search-results__filter[_ngcontent-%COMP%] {\n    font-size: 0.9375rem;\n    line-height: 1.5rem;\n    flex: 0 0 auto;\n  }\n}\n.search-results__filter-count[_ngcontent-%COMP%] {\n  font-size: 0.875rem;\n  line-height: 1.5rem;\n  opacity: 0.7;\n}\n.search-results__loading[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n  justify-content: center;\n  padding: 4rem 2rem;\n  gap: 1rem;\n}\n.search-results__loading[_ngcontent-%COMP%]   p[_ngcontent-%COMP%] {\n  font-size: 1rem;\n  line-height: 3rem;\n  color: var(--text-secondary);\n  font-weight: 600;\n}\n.search-results__content[_ngcontent-%COMP%] {\n  padding: 2rem;\n}\n@media (max-width: 768px) {\n  .search-results__content[_ngcontent-%COMP%] {\n    padding: 2rem 1rem;\n  }\n}\n.search-results__grid[_ngcontent-%COMP%] {\n  display: grid;\n  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));\n  gap: 2rem;\n  max-width: 1400px;\n  margin: 0 auto;\n}\n@media (max-width: 1024px) {\n  .search-results__grid[_ngcontent-%COMP%] {\n    grid-template-columns: repeat(auto-fill, minmax(160px, 1fr));\n    gap: 2rem;\n  }\n}\n@media (max-width: 768px) {\n  .search-results__grid[_ngcontent-%COMP%] {\n    grid-template-columns: repeat(2, 1fr);\n    gap: 1rem;\n  }\n}\n.search-results__item[_ngcontent-%COMP%] {\n  position: relative;\n}\n.search-results__card[_ngcontent-%COMP%] {\n  cursor: pointer;\n}\n.search-results__badge[_ngcontent-%COMP%] {\n  position: absolute;\n  top: 1rem;\n  left: 1rem;\n  background-color: var(--bg-primary);\n  color: var(--text-primary);\n  padding: 0.5rem 1rem;\n  font-size: 0.875rem;\n  line-height: 1.5rem;\n  font-weight: 600;\n  text-transform: uppercase;\n  border: 2px solid var(--border-color);\n  box-shadow: 2px 2px 0px #01131B;\n  z-index: 2;\n}\n.search-results__rating[_ngcontent-%COMP%] {\n  position: absolute;\n  bottom: 1rem;\n  right: 1rem;\n  background-color: var(--color-primary);\n  color: var(--text-dark);\n  padding: 0.5rem 1rem;\n  border-radius: 20px;\n  font-size: 0.875rem;\n  line-height: 1.5rem;\n  font-weight: 600;\n  box-shadow: 0 2px 8px color-mix(in srgb, var(--shadow-color) 20%, transparent);\n  z-index: 10;\n}\n.search-results__custom-card[_ngcontent-%COMP%] {\n  background-color: var(--bg-secondary);\n  border: 4px solid var(--border-color);\n  box-shadow: 4px 4px 0px #01131B;\n  cursor: pointer;\n  transition: all 300ms ease-in-out;\n  overflow: hidden;\n}\n.search-results__custom-card[_ngcontent-%COMP%]:hover:not(:disabled):not(.button--disabled) {\n  box-shadow: 4px 4px 0px #01131B;\n  transform: translate(2px, 2px);\n}\n.search-results__custom-card[_ngcontent-%COMP%]:active:not(:disabled):not(.button--disabled) {\n  box-shadow: 0px 0px 0px #01131B;\n  transform: translate(4px, 4px);\n}\n.search-results__custom-image[_ngcontent-%COMP%] {\n  width: 100%;\n  height: 200px;\n  overflow: hidden;\n  border-bottom: 2px solid var(--border-color);\n  background-color: var(--bg-primary);\n}\n.search-results__custom-image[_ngcontent-%COMP%]   img[_ngcontent-%COMP%] {\n  width: 100%;\n  height: 100%;\n  object-fit: cover;\n}\n.search-results__custom-content[_ngcontent-%COMP%] {\n  padding: 1rem;\n}\n.search-results__custom-badge[_ngcontent-%COMP%] {\n  display: inline-block;\n  background-color: var(--bg-primary);\n  color: var(--text-primary);\n  padding: 0.5rem 0.5rem;\n  font-size: 0.75rem;\n  line-height: 1rem;\n  font-weight: 700;\n  border: 2px solid var(--border-color);\n  margin-bottom: 1rem;\n  text-transform: uppercase;\n}\n.search-results__custom-title[_ngcontent-%COMP%] {\n  font-size: 1.125rem;\n  line-height: 1.75rem;\n  font-weight: 700;\n  color: var(--text-primary);\n  margin: 0 0 0.5rem 0;\n  overflow: hidden;\n  text-overflow: ellipsis;\n  white-space: nowrap;\n}\n.search-results__custom-subtitle[_ngcontent-%COMP%] {\n  font-size: 0.9375rem;\n  line-height: 1.5rem;\n  color: var(--text-secondary);\n  margin: 0 0 0.5rem 0;\n}\n.search-results__custom-description[_ngcontent-%COMP%] {\n  font-size: 0.9375rem;\n  line-height: 1.5rem;\n  color: var(--text-primary);\n  margin: 0;\n  line-height: 1.5;\n  overflow: hidden;\n  display: -webkit-box;\n  -webkit-line-clamp: 2;\n  line-clamp: 2;\n  -webkit-box-orient: vertical;\n}\n.search-results__custom-rating[_ngcontent-%COMP%] {\n  display: flex;\n  gap: 0.5rem;\n  margin-top: 1rem;\n}\n.search-results__custom-rating[_ngcontent-%COMP%]   .star[_ngcontent-%COMP%] {\n  color: var(--text-placeholder);\n  font-size: 1rem;\n}\n.search-results__custom-rating[_ngcontent-%COMP%]   .star--filled[_ngcontent-%COMP%] {\n  color: var(--color-primary);\n}\n.search-results__empty[_ngcontent-%COMP%] {\n  max-width: 600px;\n  margin: 4rem auto;\n  padding: 3rem 2rem;\n  text-align: center;\n  background-color: var(--bg-secondary);\n  border: 4px solid var(--border-color);\n  box-shadow: 6px 6px 0px #01131B;\n}\n@media (max-width: 768px) {\n  .search-results__empty[_ngcontent-%COMP%] {\n    margin: 2rem 1rem;\n    padding: 2rem 1rem;\n  }\n}\n.search-results__empty-icon[_ngcontent-%COMP%] {\n  font-size: 5rem;\n  margin-bottom: 2rem;\n  opacity: 0.5;\n}\n.search-results__empty-title[_ngcontent-%COMP%] {\n  font-size: 1.625rem;\n  line-height: 3rem;\n  font-weight: 700;\n  color: var(--text-primary);\n  margin: 0 0 1rem 0;\n}\n@media (max-width: 768px) {\n  .search-results__empty-title[_ngcontent-%COMP%] {\n    font-size: 1rem;\n    line-height: 3rem;\n  }\n}\n.search-results__empty-text[_ngcontent-%COMP%] {\n  font-size: 1rem;\n  line-height: 1.5rem;\n  color: var(--text-secondary);\n  margin: 0 0 1rem 0;\n  line-height: 1.6;\n}\n.search-results__empty-text[_ngcontent-%COMP%]   strong[_ngcontent-%COMP%] {\n  color: var(--color-primary);\n}\n.search-results__empty-suggestion[_ngcontent-%COMP%] {\n  font-size: 0.9375rem;\n  line-height: 1.5rem;\n  color: var(--text-placeholder);\n  margin: 0;\n  font-style: italic;\n}\n@keyframes _ngcontent-%COMP%_fadeIn {\n  from {\n    opacity: 0;\n    transform: translateY(20px);\n  }\n  to {\n    opacity: 1;\n    transform: translateY(0);\n  }\n}\n.search-results__item[_ngcontent-%COMP%] {\n  animation: _ngcontent-%COMP%_fadeIn 0.4s ease-out;\n}\n/*# sourceMappingURL=search-results.css.map */'] });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(SearchResultsComponent, [{
    type: Component,
    args: [{ selector: "app-search-results", standalone: true, imports: [CommonModule, Card, SearchBar, Button, Spinner, RatingComponent], template: `<main class="search-results">\r
  <!-- ============================================ -->\r
  <!-- HEADER: T\xE9rmino de b\xFAsqueda y bot\xF3n volver   -->\r
  <!-- ============================================ -->\r
  <header class="search-results__header">\r
    <app-button\r
      variant="secondary"\r
      size="md"\r
      type="button"\r
      (click)="goBack()"\r
    >\r
      \u2190 Volver\r
    </app-button>\r
    <div class="search-results__header-content">\r
      <h1 class="search-results__title">\r
        Resultados para: <span class="search-results__query">"{{ searchTerm() }}"</span>\r
      </h1>\r
      <p class="search-results__count">\r
        {{ filteredResults().length }} resultado{{ filteredResults().length !== 1 ? 's' : '' }} encontrado{{ filteredResults().length !== 1 ? 's' : '' }}\r
      </p>\r
    </div>\r
  </header>\r
\r
  <!-- ============================================ -->\r
  <!-- BARRA DE B\xDASQUEDA INTEGRADA                  -->\r
  <!-- ============================================ -->\r
  <section class="search-results__search-bar">\r
    <app-search-bar\r
      (onSearch)="newSearch($event)"\r
    ></app-search-bar>\r
  </section>\r
\r
  <!-- ============================================ -->\r
  <!-- FILTROS DE TIPO DE CONTENIDO                 -->\r
  <!-- ============================================ -->\r
  <nav class="search-results__filters">\r
    <app-button\r
      [variant]="isFilterActive('all') ? 'primary' : 'ghost'"\r
      type="button"\r
      [fullWidth]="true"\r
      (click)="setFilter('all')"\r
      [class.search-results__filter--active]="isFilterActive('all')"\r
      class="search-results__filter"\r
    >\r
      Todos <span class="search-results__filter-count">({{ resultsCount().all }})</span>\r
    </app-button>\r
    <app-button\r
      [variant]="isFilterActive('albums') ? 'primary' : 'ghost'"\r
      type="button"\r
      [fullWidth]="true"\r
      (click)="setFilter('albums')"\r
      [class.search-results__filter--active]="isFilterActive('albums')"\r
      class="search-results__filter"\r
    >\r
      \u{1F4BF} \xC1lbumes <span class="search-results__filter-count">({{ resultsCount().albums }})</span>\r
    </app-button>\r
    <app-button\r
      [variant]="isFilterActive('artists') ? 'primary' : 'ghost'"\r
      type="button"\r
      [fullWidth]="true"\r
      (click)="setFilter('artists')"\r
      [class.search-results__filter--active]="isFilterActive('artists')"\r
      class="search-results__filter"\r
    >\r
      \u{1F3A4} Artistas <span class="search-results__filter-count">({{ resultsCount().artists }})</span>\r
    </app-button>\r
    <app-button\r
      [variant]="isFilterActive('users') ? 'primary' : 'ghost'"\r
      type="button"\r
      [fullWidth]="true"\r
      (click)="setFilter('users')"\r
      [class.search-results__filter--active]="isFilterActive('users')"\r
      class="search-results__filter"\r
    >\r
      \u{1F464} Usuarios <span class="search-results__filter-count">({{ resultsCount().users }})</span>\r
    </app-button>\r
    <app-button\r
      [variant]="isFilterActive('reviews') ? 'primary' : 'ghost'"\r
      type="button"\r
      [fullWidth]="true"\r
      (click)="setFilter('reviews')"\r
      [class.search-results__filter--active]="isFilterActive('reviews')"\r
      class="search-results__filter"\r
    >\r
      \u{1F4DD} Rese\xF1as <span class="search-results__filter-count">({{ resultsCount().reviews }})</span>\r
    </app-button>\r
  </nav>\r
\r
  <!-- ============================================ -->\r
  <!-- LOADING STATE                                -->\r
  <!-- ============================================ -->\r
  @if (isLoading()) {\r
    <section class="search-results__loading">\r
      <app-spinner></app-spinner>\r
      <p>Buscando...</p>\r
    </section>\r
  }\r
\r
  <!-- ============================================ -->\r
  <!-- RESULTADOS                                   -->\r
  <!-- ============================================ -->\r
  @if (!isLoading()) {\r
    @if (filteredResults().length > 0) {\r
      <section class="search-results__content">\r
        <div class="search-results__grid">\r
          @for (result of filteredResults(); track result.id) {\r
            <article class="search-results__item">\r
              <!-- Card para \xE1lbumes y artistas -->\r
              @if (result.type === 'album' || result.type === 'artist') {\r
                <app-card\r
                  [title]="result.title"\r
                  [titleLink]="'/' + result.type + '/' + result.id"\r
                  [subtitle]="result.subtitle || ''"\r
                  [imageUrl]="result.imageUrl"\r
                  [imageAlt]="result.title"\r
                  [variant]="result.type === 'album' ? 'vinilo' : 'normal'"\r
                  cardType="polaroid"\r
                  hoverEffect="lift"\r
                  (click)="viewResult(result)"\r
                  class="search-results__card"\r
                >\r
                  <div class="search-results__badge">\r
                    {{ getResultIcon(result.type) }} {{ getResultTypeLabel(result.type) }}\r
                  </div>\r
                  @if (result.rating) {\r
                    <div class="search-results__rating">\r
                      <app-rating [rating]="result.rating" [showValue]="true" size="small" />\r
                    </div>\r
                  }\r
                </app-card>\r
              }\r
\r
              <!-- Card especial para usuarios y rese\xF1as -->\r
              @if (result.type === 'user' || result.type === 'review') {\r
                <div class="search-results__custom-card" (click)="viewResult(result)">\r
                  <div class="search-results__custom-image">\r
                    <img [src]="result.imageUrl" [alt]="result.title" />\r
                  </div>\r
                  <div class="search-results__custom-content">\r
                    <div class="search-results__custom-badge">\r
                      {{ getResultIcon(result.type) }} {{ getResultTypeLabel(result.type) }}\r
                    </div>\r
                    <h3 class="search-results__custom-title">{{ result.title }}</h3>\r
                    @if (result.subtitle) {\r
                      <p class="search-results__custom-subtitle">{{ result.subtitle }}</p>\r
                    }\r
                    @if (result.description) {\r
                      <p class="search-results__custom-description">{{ result.description }}</p>\r
                    }\r
                    @if (result.rating) {\r
                      <div class="search-results__custom-rating">\r
                        <app-rating [rating]="result.rating!" size="medium" />\r
                      </div>\r
                    }\r
                  </div>\r
                </div>\r
              }\r
            </article>\r
          }\r
        </div>\r
      </section>\r
    }\r
\r
    <!-- ============================================ -->\r
    <!-- NO RESULTS STATE                             -->\r
    <!-- ============================================ -->\r
    @if (filteredResults().length === 0) {\r
      <div class="search-results__empty">\r
        <div class="search-results__empty-icon">\u{1F50D}</div>\r
        <h2 class="search-results__empty-title">No se encontraron resultados</h2>\r
        <p class="search-results__empty-text">\r
          No encontramos ning\xFAn resultado para <strong>"{{ searchTerm() }}"</strong>\r
          @if (activeFilter() !== 'all') {\r
            <span> en la categor\xEDa de <strong>{{ getResultTypeLabel(activeFilter()) }}s</strong></span>\r
          }\r
        </p>\r
        <p class="search-results__empty-suggestion">\r
          Intenta con otro t\xE9rmino de b\xFAsqueda o cambia el filtro\r
        </p>\r
      </div>\r
    }\r
  }\r
</main>\r
`, styles: ['@charset "UTF-8";\n\n/* src/app/pages/search-results/search-results.scss */\n.search-results {\n  width: 100%;\n  min-height: 100vh;\n  background-color: var(--bg-primary);\n}\n.search-results__header {\n  padding: 2rem;\n  background-color: var(--bg-secondary);\n  border-bottom: 4px solid var(--border-color);\n  display: flex;\n  align-items: center;\n  gap: 2rem;\n}\n@media (max-width: 768px) {\n  .search-results__header {\n    padding: 2rem 1rem;\n    flex-direction: column;\n    align-items: flex-start;\n    gap: 1rem;\n  }\n}\n.search-results__header-content {\n  flex: 1;\n}\n.search-results__title {\n  font-size: 1.625rem;\n  line-height: 3rem;\n  font-weight: 700;\n  color: var(--text-primary);\n  margin: 0 0 0.5rem 0;\n}\n@media (max-width: 768px) {\n  .search-results__title {\n    font-size: 1rem;\n    line-height: 3rem;\n  }\n}\n.search-results__query {\n  color: var(--color-primary);\n  font-family: "Monoton";\n}\n.search-results__count {\n  font-size: 0.9375rem;\n  line-height: 1.5rem;\n  color: var(--text-secondary);\n  margin: 0;\n  font-weight: 600;\n}\n.search-results__search-bar {\n  padding: 2rem;\n  background-color: var(--bg-primary);\n  border-bottom: 2px solid var(--border-color);\n  display: flex;\n  justify-content: center;\n}\n@media (max-width: 768px) {\n  .search-results__search-bar {\n    padding: 2rem 1rem;\n  }\n}\n.search-results__filters {\n  display: flex;\n  gap: 0;\n  background-color: var(--bg-secondary);\n  border-bottom: 4px solid var(--border-color);\n  overflow-x: auto;\n  -webkit-overflow-scrolling: touch;\n}\n.search-results__filters::-webkit-scrollbar {\n  height: 4px;\n}\n.search-results__filters::-webkit-scrollbar-track {\n  background: var(--bg-primary);\n}\n.search-results__filters::-webkit-scrollbar-thumb {\n  background: var(--color-primary);\n  border-radius: 5px;\n}\n.search-results__filter {\n  flex: 1;\n  min-width: fit-content;\n  white-space: nowrap;\n}\n@media (max-width: 768px) {\n  .search-results__filter {\n    font-size: 0.9375rem;\n    line-height: 1.5rem;\n    flex: 0 0 auto;\n  }\n}\n.search-results__filter-count {\n  font-size: 0.875rem;\n  line-height: 1.5rem;\n  opacity: 0.7;\n}\n.search-results__loading {\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n  justify-content: center;\n  padding: 4rem 2rem;\n  gap: 1rem;\n}\n.search-results__loading p {\n  font-size: 1rem;\n  line-height: 3rem;\n  color: var(--text-secondary);\n  font-weight: 600;\n}\n.search-results__content {\n  padding: 2rem;\n}\n@media (max-width: 768px) {\n  .search-results__content {\n    padding: 2rem 1rem;\n  }\n}\n.search-results__grid {\n  display: grid;\n  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));\n  gap: 2rem;\n  max-width: 1400px;\n  margin: 0 auto;\n}\n@media (max-width: 1024px) {\n  .search-results__grid {\n    grid-template-columns: repeat(auto-fill, minmax(160px, 1fr));\n    gap: 2rem;\n  }\n}\n@media (max-width: 768px) {\n  .search-results__grid {\n    grid-template-columns: repeat(2, 1fr);\n    gap: 1rem;\n  }\n}\n.search-results__item {\n  position: relative;\n}\n.search-results__card {\n  cursor: pointer;\n}\n.search-results__badge {\n  position: absolute;\n  top: 1rem;\n  left: 1rem;\n  background-color: var(--bg-primary);\n  color: var(--text-primary);\n  padding: 0.5rem 1rem;\n  font-size: 0.875rem;\n  line-height: 1.5rem;\n  font-weight: 600;\n  text-transform: uppercase;\n  border: 2px solid var(--border-color);\n  box-shadow: 2px 2px 0px #01131B;\n  z-index: 2;\n}\n.search-results__rating {\n  position: absolute;\n  bottom: 1rem;\n  right: 1rem;\n  background-color: var(--color-primary);\n  color: var(--text-dark);\n  padding: 0.5rem 1rem;\n  border-radius: 20px;\n  font-size: 0.875rem;\n  line-height: 1.5rem;\n  font-weight: 600;\n  box-shadow: 0 2px 8px color-mix(in srgb, var(--shadow-color) 20%, transparent);\n  z-index: 10;\n}\n.search-results__custom-card {\n  background-color: var(--bg-secondary);\n  border: 4px solid var(--border-color);\n  box-shadow: 4px 4px 0px #01131B;\n  cursor: pointer;\n  transition: all 300ms ease-in-out;\n  overflow: hidden;\n}\n.search-results__custom-card:hover:not(:disabled):not(.button--disabled) {\n  box-shadow: 4px 4px 0px #01131B;\n  transform: translate(2px, 2px);\n}\n.search-results__custom-card:active:not(:disabled):not(.button--disabled) {\n  box-shadow: 0px 0px 0px #01131B;\n  transform: translate(4px, 4px);\n}\n.search-results__custom-image {\n  width: 100%;\n  height: 200px;\n  overflow: hidden;\n  border-bottom: 2px solid var(--border-color);\n  background-color: var(--bg-primary);\n}\n.search-results__custom-image img {\n  width: 100%;\n  height: 100%;\n  object-fit: cover;\n}\n.search-results__custom-content {\n  padding: 1rem;\n}\n.search-results__custom-badge {\n  display: inline-block;\n  background-color: var(--bg-primary);\n  color: var(--text-primary);\n  padding: 0.5rem 0.5rem;\n  font-size: 0.75rem;\n  line-height: 1rem;\n  font-weight: 700;\n  border: 2px solid var(--border-color);\n  margin-bottom: 1rem;\n  text-transform: uppercase;\n}\n.search-results__custom-title {\n  font-size: 1.125rem;\n  line-height: 1.75rem;\n  font-weight: 700;\n  color: var(--text-primary);\n  margin: 0 0 0.5rem 0;\n  overflow: hidden;\n  text-overflow: ellipsis;\n  white-space: nowrap;\n}\n.search-results__custom-subtitle {\n  font-size: 0.9375rem;\n  line-height: 1.5rem;\n  color: var(--text-secondary);\n  margin: 0 0 0.5rem 0;\n}\n.search-results__custom-description {\n  font-size: 0.9375rem;\n  line-height: 1.5rem;\n  color: var(--text-primary);\n  margin: 0;\n  line-height: 1.5;\n  overflow: hidden;\n  display: -webkit-box;\n  -webkit-line-clamp: 2;\n  line-clamp: 2;\n  -webkit-box-orient: vertical;\n}\n.search-results__custom-rating {\n  display: flex;\n  gap: 0.5rem;\n  margin-top: 1rem;\n}\n.search-results__custom-rating .star {\n  color: var(--text-placeholder);\n  font-size: 1rem;\n}\n.search-results__custom-rating .star--filled {\n  color: var(--color-primary);\n}\n.search-results__empty {\n  max-width: 600px;\n  margin: 4rem auto;\n  padding: 3rem 2rem;\n  text-align: center;\n  background-color: var(--bg-secondary);\n  border: 4px solid var(--border-color);\n  box-shadow: 6px 6px 0px #01131B;\n}\n@media (max-width: 768px) {\n  .search-results__empty {\n    margin: 2rem 1rem;\n    padding: 2rem 1rem;\n  }\n}\n.search-results__empty-icon {\n  font-size: 5rem;\n  margin-bottom: 2rem;\n  opacity: 0.5;\n}\n.search-results__empty-title {\n  font-size: 1.625rem;\n  line-height: 3rem;\n  font-weight: 700;\n  color: var(--text-primary);\n  margin: 0 0 1rem 0;\n}\n@media (max-width: 768px) {\n  .search-results__empty-title {\n    font-size: 1rem;\n    line-height: 3rem;\n  }\n}\n.search-results__empty-text {\n  font-size: 1rem;\n  line-height: 1.5rem;\n  color: var(--text-secondary);\n  margin: 0 0 1rem 0;\n  line-height: 1.6;\n}\n.search-results__empty-text strong {\n  color: var(--color-primary);\n}\n.search-results__empty-suggestion {\n  font-size: 0.9375rem;\n  line-height: 1.5rem;\n  color: var(--text-placeholder);\n  margin: 0;\n  font-style: italic;\n}\n@keyframes fadeIn {\n  from {\n    opacity: 0;\n    transform: translateY(20px);\n  }\n  to {\n    opacity: 1;\n    transform: translateY(0);\n  }\n}\n.search-results__item {\n  animation: fadeIn 0.4s ease-out;\n}\n/*# sourceMappingURL=search-results.css.map */\n'] }]
  }], () => [{ type: ActivatedRoute }, { type: Router }], null);
})();
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(SearchResultsComponent, { className: "SearchResultsComponent", filePath: "src/app/pages/search-results/search-results.ts", lineNumber: 30 });
})();
export {
  SearchResultsComponent as default
};
//# sourceMappingURL=chunk-ANFFWIVC.js.map
