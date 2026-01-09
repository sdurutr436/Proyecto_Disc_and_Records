import {
  Accordion
} from "./chunk-ZYX7ICOI.js";
import {
  Spinner
} from "./chunk-VQZYH7QQ.js";
import {
  ActivatedRoute,
  Router,
  RouterModule
} from "./chunk-BFARIXWD.js";
import {
  DefaultValueAccessor,
  FormsModule,
  NgControlStatus,
  NgModel
} from "./chunk-AVQDXX3C.js";
import {
  Button
} from "./chunk-QEXKGZ6Y.js";
import "./chunk-MBYWNRDU.js";
import {
  CommonModule,
  Component,
  ViewportScroller,
  __spreadProps,
  __spreadValues,
  computed,
  setClassMetadata,
  signal,
  ɵsetClassDebugInfo,
  ɵɵadvance,
  ɵɵattribute,
  ɵɵclassMap,
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
  ɵɵpureFunction0,
  ɵɵrepeater,
  ɵɵrepeaterCreate,
  ɵɵrepeaterTrackByIdentity,
  ɵɵresetView,
  ɵɵrestoreView,
  ɵɵsanitizeUrl,
  ɵɵtext,
  ɵɵtextInterpolate,
  ɵɵtextInterpolate1,
  ɵɵtextInterpolate2,
  ɵɵtwoWayBindingSet,
  ɵɵtwoWayListener,
  ɵɵtwoWayProperty
} from "./chunk-PFYGRVXA.js";

// src/app/pages/detail/detail.ts
var _c0 = () => [1, 2, 3, 4, 5];
function DetailComponent_Conditional_1_For_13_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span", 39);
    \u0275\u0275text(1, " \u2605 ");
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const star_r4 = ctx.$implicit;
    const itemData_r2 = \u0275\u0275nextContext();
    \u0275\u0275classProp("rating-display__star--filled", star_r4 <= itemData_r2.averageRating);
  }
}
function DetailComponent_Conditional_1_For_67_Template(rf, ctx) {
  if (rf & 1) {
    const _r5 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "button", 40);
    \u0275\u0275listener("click", function DetailComponent_Conditional_1_For_67_Template_button_click_0_listener() {
      const star_r6 = \u0275\u0275restoreView(_r5).$implicit;
      const ctx_r2 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r2.setRating(star_r6));
    })("mouseenter", function DetailComponent_Conditional_1_For_67_Template_button_mouseenter_0_listener() {
      const star_r6 = \u0275\u0275restoreView(_r5).$implicit;
      const ctx_r2 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r2.hoverStar(star_r6));
    })("mouseleave", function DetailComponent_Conditional_1_For_67_Template_button_mouseleave_0_listener() {
      \u0275\u0275restoreView(_r5);
      const ctx_r2 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r2.resetHover());
    });
    \u0275\u0275text(1, " \u2605 ");
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const star_r6 = ctx.$implicit;
    const ctx_r2 = \u0275\u0275nextContext(2);
    \u0275\u0275classMap(ctx_r2.getStarClass(star_r6));
    \u0275\u0275attribute("aria-label", "Puntuar con " + star_r6 + " estrellas");
  }
}
function DetailComponent_Conditional_1_Conditional_68_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "p", 31);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r2 = \u0275\u0275nextContext(2);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate2(" Has puntuado este \xE1lbum con ", ctx_r2.userRating(), " estrella", ctx_r2.userRating() !== 1 ? "s" : "", " ");
  }
}
function DetailComponent_Conditional_1_Conditional_69_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "p", 31);
    \u0275\u0275text(1, " Haz clic en una estrella para puntuar ");
    \u0275\u0275elementEnd();
  }
}
function DetailComponent_Conditional_1_Conditional_71_Template(rf, ctx) {
  if (rf & 1) {
    const _r7 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "app-button", 41);
    \u0275\u0275listener("clicked", function DetailComponent_Conditional_1_Conditional_71_Template_app_button_clicked_0_listener() {
      \u0275\u0275restoreView(_r7);
      const ctx_r2 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r2.toggleReviewForm());
    });
    \u0275\u0275text(1, " Escribir una rese\xF1a ");
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    \u0275\u0275property("fullWidth", true);
  }
}
function DetailComponent_Conditional_1_Conditional_72_Conditional_7_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span", 46);
    \u0275\u0275text(1, " (m\xEDnimo 50) ");
    \u0275\u0275elementEnd();
  }
}
function DetailComponent_Conditional_1_Conditional_72_Template(rf, ctx) {
  if (rf & 1) {
    const _r8 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 34)(1, "h3", 42);
    \u0275\u0275text(2, "Escribe tu rese\xF1a");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "textarea", 43);
    \u0275\u0275twoWayListener("ngModelChange", function DetailComponent_Conditional_1_Conditional_72_Template_textarea_ngModelChange_3_listener($event) {
      \u0275\u0275restoreView(_r8);
      const ctx_r2 = \u0275\u0275nextContext(2);
      \u0275\u0275twoWayBindingSet(ctx_r2.reviewText, $event) || (ctx_r2.reviewText = $event);
      return \u0275\u0275resetView($event);
    });
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(4, "div", 44)(5, "span", 45);
    \u0275\u0275text(6);
    \u0275\u0275conditionalCreate(7, DetailComponent_Conditional_1_Conditional_72_Conditional_7_Template, 2, 0, "span", 46);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(8, "div", 47)(9, "app-button", 48);
    \u0275\u0275listener("clicked", function DetailComponent_Conditional_1_Conditional_72_Template_app_button_clicked_9_listener() {
      \u0275\u0275restoreView(_r8);
      const ctx_r2 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r2.cancelReview());
    });
    \u0275\u0275text(10, " Cancelar ");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(11, "app-button", 49);
    \u0275\u0275listener("clicked", function DetailComponent_Conditional_1_Conditional_72_Template_app_button_clicked_11_listener() {
      \u0275\u0275restoreView(_r8);
      const ctx_r2 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r2.submitReview());
    });
    \u0275\u0275text(12, " Publicar rese\xF1a ");
    \u0275\u0275elementEnd()()()();
  }
  if (rf & 2) {
    const ctx_r2 = \u0275\u0275nextContext(2);
    \u0275\u0275advance(3);
    \u0275\u0275twoWayProperty("ngModel", ctx_r2.reviewText);
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate1(" ", ctx_r2.reviewText().length, " caracteres ");
    \u0275\u0275advance();
    \u0275\u0275conditional(ctx_r2.reviewText().length < 50 ? 7 : -1);
    \u0275\u0275advance(4);
    \u0275\u0275property("disabled", !ctx_r2.canSubmitReview());
  }
}
function DetailComponent_Conditional_1_Conditional_78_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 37);
    \u0275\u0275element(1, "app-spinner");
    \u0275\u0275elementStart(2, "p");
    \u0275\u0275text(3, "Cargando rese\xF1as...");
    \u0275\u0275elementEnd()();
  }
}
function DetailComponent_Conditional_1_Conditional_79_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 38)(1, "p", 50);
    \u0275\u0275text(2, "No hay rese\xF1as a\xFAn");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "p", 51);
    \u0275\u0275text(4, " S\xE9 el primero en compartir tu opini\xF3n sobre este \xE1lbum ");
    \u0275\u0275elementEnd()();
  }
}
function DetailComponent_Conditional_1_Conditional_80_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275element(0, "app-accordion", 26);
  }
  if (rf & 2) {
    const ctx_r2 = \u0275\u0275nextContext(2);
    \u0275\u0275property("items", ctx_r2.reviewsAccordionItems());
  }
}
function DetailComponent_Conditional_1_Template(rf, ctx) {
  if (rf & 1) {
    const _r1 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 1)(1, "aside", 3)(2, "div", 4)(3, "div", 5);
    \u0275\u0275element(4, "img", 6);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(5, "div", 7)(6, "h1", 8);
    \u0275\u0275text(7);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(8, "p", 9);
    \u0275\u0275listener("click", function DetailComponent_Conditional_1_Template_p_click_8_listener() {
      const itemData_r2 = \u0275\u0275restoreView(_r1);
      const ctx_r2 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r2.goToArtist(itemData_r2.artistId));
    });
    \u0275\u0275text(9);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(10, "div", 10)(11, "div", 11);
    \u0275\u0275repeaterCreate(12, DetailComponent_Conditional_1_For_13_Template, 2, 2, "span", 12, \u0275\u0275repeaterTrackByIdentity);
    \u0275\u0275elementStart(14, "span", 13);
    \u0275\u0275text(15);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(16, "p", 14);
    \u0275\u0275text(17);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(18, "div", 15)(19, "div", 16)(20, "span", 17);
    \u0275\u0275text(21, "A\xF1o");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(22, "span", 18);
    \u0275\u0275text(23);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(24, "div", 16)(25, "span", 17);
    \u0275\u0275text(26, "G\xE9nero");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(27, "span", 18);
    \u0275\u0275text(28);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(29, "div", 16)(30, "span", 17);
    \u0275\u0275text(31, "Canciones");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(32, "span", 18);
    \u0275\u0275text(33);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(34, "div", 16)(35, "span", 17);
    \u0275\u0275text(36, "Duraci\xF3n");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(37, "span", 18);
    \u0275\u0275text(38);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(39, "div", 16)(40, "span", 17);
    \u0275\u0275text(41, "Sello");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(42, "span", 18);
    \u0275\u0275text(43);
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(44, "div", 19)(45, "p");
    \u0275\u0275text(46);
    \u0275\u0275elementEnd()()()()();
    \u0275\u0275elementStart(47, "main", 20)(48, "nav", 21)(49, "button", 22);
    \u0275\u0275listener("click", function DetailComponent_Conditional_1_Template_button_click_49_listener() {
      \u0275\u0275restoreView(_r1);
      const ctx_r2 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r2.navigateToSection("info"));
    });
    \u0275\u0275text(50, " Informaci\xF3n ");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(51, "button", 22);
    \u0275\u0275listener("click", function DetailComponent_Conditional_1_Template_button_click_51_listener() {
      \u0275\u0275restoreView(_r1);
      const ctx_r2 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r2.navigateToSection("tracks"));
    });
    \u0275\u0275text(52, " Canciones ");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(53, "button", 22);
    \u0275\u0275listener("click", function DetailComponent_Conditional_1_Template_button_click_53_listener() {
      \u0275\u0275restoreView(_r1);
      const ctx_r2 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r2.navigateToSection("reviews"));
    });
    \u0275\u0275text(54, " Rese\xF1as ");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(55, "button", 23);
    \u0275\u0275listener("click", function DetailComponent_Conditional_1_Template_button_click_55_listener() {
      \u0275\u0275restoreView(_r1);
      const ctx_r2 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r2.shareReviewsLink());
    });
    \u0275\u0275text(56, " \u{1F517} Compartir ");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(57, "section", 24)(58, "h2", 25);
    \u0275\u0275text(59, "Lista de canciones");
    \u0275\u0275elementEnd();
    \u0275\u0275element(60, "app-accordion", 26);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(61, "section", 27)(62, "h2", 25);
    \u0275\u0275text(63, "Tu puntuaci\xF3n");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(64, "div", 28)(65, "div", 29);
    \u0275\u0275repeaterCreate(66, DetailComponent_Conditional_1_For_67_Template, 2, 3, "button", 30, \u0275\u0275repeaterTrackByIdentity);
    \u0275\u0275elementEnd();
    \u0275\u0275conditionalCreate(68, DetailComponent_Conditional_1_Conditional_68_Template, 2, 2, "p", 31)(69, DetailComponent_Conditional_1_Conditional_69_Template, 2, 0, "p", 31);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(70, "section", 32);
    \u0275\u0275conditionalCreate(71, DetailComponent_Conditional_1_Conditional_71_Template, 2, 1, "app-button", 33)(72, DetailComponent_Conditional_1_Conditional_72_Template, 13, 4, "div", 34);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(73, "section", 35)(74, "h2", 25);
    \u0275\u0275text(75, " Rese\xF1as de la comunidad ");
    \u0275\u0275elementStart(76, "span", 36);
    \u0275\u0275text(77);
    \u0275\u0275elementEnd()();
    \u0275\u0275conditionalCreate(78, DetailComponent_Conditional_1_Conditional_78_Template, 4, 0, "div", 37)(79, DetailComponent_Conditional_1_Conditional_79_Template, 5, 0, "div", 38)(80, DetailComponent_Conditional_1_Conditional_80_Template, 1, 1, "app-accordion", 26);
    \u0275\u0275elementEnd()()();
  }
  if (rf & 2) {
    const itemData_r2 = ctx;
    const ctx_r2 = \u0275\u0275nextContext();
    \u0275\u0275advance(4);
    \u0275\u0275property("src", itemData_r2.coverUrl, \u0275\u0275sanitizeUrl)("alt", itemData_r2.title);
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate(itemData_r2.title);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate1(" ", itemData_r2.artist, " ");
    \u0275\u0275advance(3);
    \u0275\u0275repeater(\u0275\u0275pureFunction0(17, _c0));
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate1(" ", itemData_r2.averageRating, "/5 ");
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate1(" ", itemData_r2.totalReviews, " rese\xF1as ");
    \u0275\u0275advance(6);
    \u0275\u0275textInterpolate(itemData_r2.releaseYear);
    \u0275\u0275advance(5);
    \u0275\u0275textInterpolate(itemData_r2.genre);
    \u0275\u0275advance(5);
    \u0275\u0275textInterpolate(itemData_r2.tracks);
    \u0275\u0275advance(5);
    \u0275\u0275textInterpolate(itemData_r2.duration);
    \u0275\u0275advance(5);
    \u0275\u0275textInterpolate(itemData_r2.label);
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate(itemData_r2.description);
    \u0275\u0275advance(14);
    \u0275\u0275property("items", ctx_r2.tracklistAccordionItems());
    \u0275\u0275advance(6);
    \u0275\u0275repeater(\u0275\u0275pureFunction0(18, _c0));
    \u0275\u0275advance(2);
    \u0275\u0275conditional(ctx_r2.hasUserRated() ? 68 : 69);
    \u0275\u0275advance(3);
    \u0275\u0275conditional(!ctx_r2.isWritingReview() ? 71 : 72);
    \u0275\u0275advance(6);
    \u0275\u0275textInterpolate1("(", ctx_r2.reviews().length, ")");
    \u0275\u0275advance();
    \u0275\u0275conditional(ctx_r2.isLoadingReviews() ? 78 : ctx_r2.reviews().length === 0 ? 79 : 80);
  }
}
function DetailComponent_Conditional_2_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 2);
    \u0275\u0275element(1, "app-spinner");
    \u0275\u0275elementStart(2, "p");
    \u0275\u0275text(3, "Cargando \xE1lbum...");
    \u0275\u0275elementEnd()();
  }
}
var DetailComponent = class _DetailComponent {
  route;
  router;
  viewportScroller;
  fragmentSubscription;
  // Signals
  item = signal(null, ...ngDevMode ? [{ debugName: "item" }] : []);
  trackList = signal([], ...ngDevMode ? [{ debugName: "trackList" }] : []);
  tracklistAccordionItems = signal([], ...ngDevMode ? [{ debugName: "tracklistAccordionItems" }] : []);
  reviews = signal([], ...ngDevMode ? [{ debugName: "reviews" }] : []);
  reviewsAccordionItems = signal([], ...ngDevMode ? [{ debugName: "reviewsAccordionItems" }] : []);
  userRating = signal(0, ...ngDevMode ? [{ debugName: "userRating" }] : []);
  hoveredStar = signal(0, ...ngDevMode ? [{ debugName: "hoveredStar" }] : []);
  reviewText = signal("", ...ngDevMode ? [{ debugName: "reviewText" }] : []);
  isWritingReview = signal(false, ...ngDevMode ? [{ debugName: "isWritingReview" }] : []);
  isLoadingReviews = signal(false, ...ngDevMode ? [{ debugName: "isLoadingReviews" }] : []);
  // Computed
  hasUserRated = computed(() => this.userRating() > 0, ...ngDevMode ? [{ debugName: "hasUserRated" }] : []);
  canSubmitReview = computed(() => this.reviewText().trim().length >= 50 && this.userRating() > 0, ...ngDevMode ? [{ debugName: "canSubmitReview" }] : []);
  displayRating = computed(() => this.hoveredStar() > 0 ? this.hoveredStar() : this.userRating(), ...ngDevMode ? [{ debugName: "displayRating" }] : []);
  constructor(route, router, viewportScroller) {
    this.route = route;
    this.router = router;
    this.viewportScroller = viewportScroller;
  }
  ngOnInit() {
    const itemId = this.route.snapshot.paramMap.get("id");
    if (itemId) {
      this.loadItemData(itemId);
      this.loadReviews(itemId);
    }
    const navigationState = history.state;
    if (navigationState?.fromSearch) {
      console.log("Navegaci\xF3n desde b\xFAsqueda:", navigationState.searchTerm);
    }
    this.fragmentSubscription = this.route.fragment.subscribe((fragment) => {
      if (fragment) {
        setTimeout(() => this.scrollToSection(fragment), 100);
      }
    });
  }
  ngOnDestroy() {
    this.fragmentSubscription?.unsubscribe();
  }
  loadItemData(itemId) {
    this.item.set({
      id: itemId,
      title: "The Dark Side of the Moon",
      artist: "Pink Floyd",
      artistId: "artist-1",
      coverUrl: "https://picsum.photos/seed/album1/400/400",
      releaseYear: 1973,
      genre: "Progressive Rock",
      tracks: 10,
      duration: "42:59",
      label: "Harvest Records",
      description: "The Dark Side of the Moon es el octavo \xE1lbum de estudio de la banda brit\xE1nica de rock progresivo Pink Floyd. Fue lanzado el 1 de marzo de 1973 y es uno de los \xE1lbumes m\xE1s vendidos e influyentes de todos los tiempos.",
      averageRating: 4.7,
      totalReviews: 1248
    });
    const tracks = [
      { id: "track-1", number: 1, title: "Speak to Me", duration: "1:30" },
      { id: "track-2", number: 2, title: "Breathe", duration: "2:43" },
      { id: "track-3", number: 3, title: "On the Run", duration: "3:36" },
      { id: "track-4", number: 4, title: "Time", duration: "6:53" },
      { id: "track-5", number: 5, title: "The Great Gig in the Sky", duration: "4:36" },
      { id: "track-6", number: 6, title: "Money", duration: "6:23" },
      { id: "track-7", number: 7, title: "Us and Them", duration: "7:49" },
      { id: "track-8", number: 8, title: "Any Colour You Like", duration: "3:26" },
      { id: "track-9", number: 9, title: "Brain Damage", duration: "3:49" },
      { id: "track-10", number: 10, title: "Eclipse", duration: "2:03" }
    ];
    this.trackList.set(tracks);
    const tracklistItems = [{
      id: "tracklist",
      title: `Lista de canciones (${tracks.length})`,
      content: this.generateTracklistHTML(tracks),
      isOpen: true
    }];
    this.tracklistAccordionItems.set(tracklistItems);
  }
  generateTracklistHTML(tracks) {
    return tracks.map((track) => `<div class="track-item" data-track-id="${track.id}">
        <span class="track-item__number">${track.number}.</span>
        <span class="track-item__title">${track.title}</span>
        <span class="track-item__duration">${track.duration}</span>
      </div>`).join("");
  }
  loadReviews(itemId) {
    this.isLoadingReviews.set(true);
    setTimeout(() => {
      const loadedReviews = [
        {
          id: "1",
          userId: "user-1",
          userName: "Carlos M\xE9ndez",
          userAvatar: "https://picsum.photos/seed/user1/100/100",
          rating: 5,
          content: "Una obra maestra absoluta. Cada canci\xF3n fluye perfectamente hacia la siguiente. El uso de sintetizadores y efectos de sonido fue revolucionario para su \xE9poca. Time y Money son mis favoritas.",
          date: /* @__PURE__ */ new Date("2024-01-15"),
          likes: 42
        },
        {
          id: "2",
          userId: "user-2",
          userName: "Mar\xEDa Garc\xEDa",
          userAvatar: "https://picsum.photos/seed/user2/100/100",
          rating: 5,
          content: "Este \xE1lbum cambi\xF3 mi vida. La primera vez que lo escuch\xE9 completo fue una experiencia trascendental. Breathe, The Great Gig in the Sky y Eclipse son perfectas.",
          date: /* @__PURE__ */ new Date("2024-01-10"),
          likes: 38
        },
        {
          id: "3",
          userId: "user-3",
          userName: "Pedro S\xE1nchez",
          userAvatar: "https://picsum.photos/seed/user3/100/100",
          rating: 4,
          content: "Excelente \xE1lbum conceptual. La producci\xF3n es impecable. Aunque algunos pasajes instrumentales se me hacen un poco largos, la cohesi\xF3n general es impresionante.",
          date: /* @__PURE__ */ new Date("2024-01-05"),
          likes: 15
        }
      ];
      this.reviews.set(loadedReviews);
      const reviewsItems = [{
        id: "reviews",
        title: `Rese\xF1as (${loadedReviews.length})`,
        content: this.generateReviewsHTML(loadedReviews),
        isOpen: true
      }];
      this.reviewsAccordionItems.set(reviewsItems);
      this.isLoadingReviews.set(false);
    }, 500);
  }
  generateReviewsHTML(reviews) {
    return reviews.map((review) => {
      const stars = "\u2605".repeat(review.rating) + "\u2606".repeat(5 - review.rating);
      const dateStr = review.date.toLocaleDateString("es-ES", { year: "numeric", month: "long", day: "numeric" });
      return `<div class="review-card">
        <div class="review-card__header">
          <img src="${review.userAvatar}" alt="${review.userName}" class="review-card__avatar" />
          <div class="review-card__user-info">
            <h5 class="review-card__user-name">${review.userName}</h5>
            <div class="review-card__meta">
              <span class="review-card__rating">${stars}</span>
              <span class="review-card__date">${dateStr}</span>
            </div>
          </div>
        </div>
        <p class="review-card__content">${review.content}</p>
        <div class="review-card__footer">
          <button class="review-card__like-btn">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
            </svg>
            <span>${review.likes}</span>
          </button>
        </div>
      </div>`;
    }).join("");
  }
  // Rating system
  setRating(rating) {
    this.userRating.set(rating);
    console.log("Rating set:", rating);
  }
  hoverStar(star) {
    this.hoveredStar.set(star);
  }
  resetHover() {
    this.hoveredStar.set(0);
  }
  getStarClass(starNumber) {
    const rating = this.displayRating();
    if (starNumber <= rating) {
      return "star--filled";
    }
    return "star--empty";
  }
  // Review system
  toggleReviewForm() {
    this.isWritingReview.set(!this.isWritingReview());
  }
  submitReview() {
    if (!this.canSubmitReview())
      return;
    const newReview = {
      id: Date.now().toString(),
      userId: "current-user",
      userName: "Usuario Actual",
      userAvatar: "https://picsum.photos/seed/currentuser/100/100",
      rating: this.userRating(),
      content: this.reviewText(),
      date: /* @__PURE__ */ new Date(),
      likes: 0
    };
    console.log("Submitting review:", newReview);
    this.reviews.update((reviews) => [newReview, ...reviews]);
    this.reviewText.set("");
    this.isWritingReview.set(false);
  }
  cancelReview() {
    this.reviewText.set("");
    this.isWritingReview.set(false);
  }
  likeReview(reviewId) {
    this.reviews.update((reviews) => reviews.map((review) => review.id === reviewId ? __spreadProps(__spreadValues({}, review), { likes: review.likes + 1 }) : review));
  }
  // ============================================
  // NAVEGACIÓN PROGRAMÁTICA
  // ============================================
  /**
   * Scroll a una sección específica usando fragments
   * Ejemplo: /album/123#reviews -> scroll a sección reviews
   */
  scrollToSection(sectionId) {
    this.viewportScroller.scrollToAnchor(sectionId);
  }
  /**
   * Navegar a sección con fragment (actualiza URL)
   */
  navigateToSection(section) {
    const extras = {
      fragment: section,
      // No añadir al historial para cada sección
      replaceUrl: true
    };
    this.router.navigate([], extras);
  }
  /**
   * Navegar al artista con estado adicional
   */
  goToArtist(artistId) {
    const extras = {
      state: {
        fromAlbum: this.item()?.id,
        albumTitle: this.item()?.title
      }
    };
    this.router.navigate(["/artist", artistId], extras);
  }
  /**
   * Navegar al perfil de usuario con estado
   */
  goToUser(userId) {
    const extras = {
      state: {
        fromReview: true,
        albumId: this.item()?.id
      }
    };
    this.router.navigate(["/profile", userId], extras);
  }
  /**
   * Compartir enlace directo a las reseñas
   */
  shareReviewsLink() {
    const url = `${window.location.origin}/album/${this.item()?.id}#reviews`;
    navigator.clipboard.writeText(url);
  }
  static \u0275fac = function DetailComponent_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _DetailComponent)(\u0275\u0275directiveInject(ActivatedRoute), \u0275\u0275directiveInject(Router), \u0275\u0275directiveInject(ViewportScroller));
  };
  static \u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _DetailComponent, selectors: [["app-detail"]], decls: 3, vars: 1, consts: [[1, "detail"], [1, "detail__container"], [1, "loading-state", "loading-state--fullpage"], [1, "detail__sidebar"], [1, "detail-card"], [1, "detail-card__cover"], [1, "detail-card__image", 3, "src", "alt"], [1, "detail-card__info"], [1, "detail-card__title"], [1, "detail-card__artist", 3, "click"], [1, "detail-card__rating"], [1, "rating-display"], [1, "rating-display__star", 3, "rating-display__star--filled"], [1, "rating-display__value"], [1, "rating-display__count"], [1, "detail-card__details"], [1, "detail-item"], [1, "detail-item__label"], [1, "detail-item__value"], [1, "detail-card__description"], [1, "detail__content"], [1, "detail__nav"], ["type", "button", 1, "detail__nav-item", 3, "click"], ["type", "button", "title", "Copiar enlace a rese\xF1as", 1, "detail__nav-item", "detail__nav-item--share", 3, "click"], ["id", "tracks", 1, "tracklist-section"], [1, "section-title"], ["mode", "single", 3, "items"], ["id", "info", 1, "rating-section"], [1, "rating-input"], [1, "rating-input__stars"], ["type", "button", 1, "star", 3, "class"], [1, "rating-input__message"], [1, "review-form-section"], ["variant", "primary", "size", "lg", 3, "fullWidth"], [1, "review-form"], ["id", "reviews", 1, "reviews-section"], [1, "section-title__count"], [1, "loading-state"], [1, "empty-state"], [1, "rating-display__star"], ["type", "button", 1, "star", 3, "click", "mouseenter", "mouseleave"], ["variant", "primary", "size", "lg", 3, "clicked", "fullWidth"], [1, "review-form__title"], ["placeholder", "Comparte tu opini\xF3n sobre este \xE1lbum (m\xEDnimo 50 caracteres)...", "rows", "6", 1, "review-form__textarea", 3, "ngModelChange", "ngModel"], [1, "review-form__footer"], [1, "review-form__counter"], [1, "review-form__counter--warning"], [1, "review-form__actions"], ["variant", "secondary", "size", "md", 3, "clicked"], ["variant", "primary", "size", "md", 3, "clicked", "disabled"], [1, "empty-state__title"], [1, "empty-state__subtitle"]], template: function DetailComponent_Template(rf, ctx) {
    if (rf & 1) {
      \u0275\u0275elementStart(0, "div", 0);
      \u0275\u0275conditionalCreate(1, DetailComponent_Conditional_1_Template, 81, 19, "div", 1)(2, DetailComponent_Conditional_2_Template, 4, 0, "div", 2);
      \u0275\u0275elementEnd();
    }
    if (rf & 2) {
      let tmp_0_0;
      \u0275\u0275advance();
      \u0275\u0275conditional((tmp_0_0 = ctx.item()) ? 1 : 2, tmp_0_0);
    }
  }, dependencies: [
    CommonModule,
    FormsModule,
    DefaultValueAccessor,
    NgControlStatus,
    NgModel,
    RouterModule,
    Accordion,
    Button,
    Spinner
  ], styles: ['@charset "UTF-8";\n\n\n\n.detail[_ngcontent-%COMP%] {\n  min-height: 100vh;\n  padding: 2rem;\n  background-color: var(--bg-primary);\n}\n@media (max-width: 768px) {\n  .detail[_ngcontent-%COMP%] {\n    padding: 1rem;\n  }\n}\n.detail__container[_ngcontent-%COMP%] {\n  max-width: 1440px;\n  margin: 0 auto;\n  display: grid;\n  grid-template-columns: 1fr 2fr;\n  gap: 2rem;\n}\n@media (max-width: 1024px) {\n  .detail__container[_ngcontent-%COMP%] {\n    grid-template-columns: 1fr;\n    gap: 2rem;\n  }\n}\n.detail__sidebar[_ngcontent-%COMP%] {\n  position: sticky;\n  top: 1rem;\n  height: fit-content;\n}\n@media (max-width: 1024px) {\n  .detail__sidebar[_ngcontent-%COMP%] {\n    position: static;\n  }\n}\n.detail__content[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  gap: 2rem;\n}\n.detail__nav[_ngcontent-%COMP%] {\n  display: flex;\n  flex-wrap: wrap;\n  gap: 0.5rem;\n  padding: 1rem;\n  background-color: var(--bg-secondary);\n  border: 4px solid var(--border-color);\n  box-shadow: 4px 4px 0px #01131B;\n  position: sticky;\n  top: 1rem;\n  z-index: 10;\n}\n.detail__nav-item[_ngcontent-%COMP%] {\n  padding: 0.5rem 1rem;\n  background-color: var(--bg-primary);\n  border: 2px solid var(--border-color);\n  font-weight: 600;\n  cursor: pointer;\n  transition: all 150ms ease-in-out;\n  font-size: 0.9375rem;\n  line-height: 1.5rem;\n}\n.detail__nav-item[_ngcontent-%COMP%]:hover {\n  background-color: var(--color-primary);\n  color: var(--bg-primary);\n  transform: translateY(-2px);\n  box-shadow: 4px 4px 0px #01131B;\n}\n.detail__nav-item--share[_ngcontent-%COMP%] {\n  margin-left: auto;\n  background-color: var(--bg-tertiary);\n}\n.detail__nav-item--share[_ngcontent-%COMP%]:hover {\n  background-color: var(--color-secondary);\n}\n.detail-card[_ngcontent-%COMP%] {\n  background-color: var(--bg-secondary);\n  border: 4px solid var(--border-color);\n  box-shadow: 6px 6px 0px #01131B;\n  overflow: hidden;\n}\n.detail-card__cover[_ngcontent-%COMP%] {\n  width: 100%;\n  aspect-ratio: 1;\n  overflow: hidden;\n  border-bottom: 4px solid var(--border-color);\n}\n.detail-card__image[_ngcontent-%COMP%] {\n  width: 100%;\n  height: 100%;\n  object-fit: cover;\n  display: block;\n  transition: transform 300ms ease-in-out;\n}\n.detail-card__image[_ngcontent-%COMP%]:hover {\n  transform: scale(1.05);\n}\n.detail-card__info[_ngcontent-%COMP%] {\n  padding: 2rem;\n}\n@media (max-width: 768px) {\n  .detail-card__info[_ngcontent-%COMP%] {\n    padding: 1rem;\n  }\n}\n.detail-card__title[_ngcontent-%COMP%] {\n  font-size: 1rem;\n  line-height: 3rem;\n  font-weight: 900;\n  color: var(--text-primary);\n  margin: 0 0 0.5rem 0;\n  line-height: 1.2;\n  font-family: "Monoton";\n}\n@media (max-width: 768px) {\n  .detail-card__title[_ngcontent-%COMP%] {\n    font-size: 1.125rem;\n    line-height: 1.75rem;\n  }\n}\n.detail-card__artist[_ngcontent-%COMP%] {\n  font-size: 1rem;\n  line-height: 1.5rem;\n  color: var(--color-primary);\n  margin: 0 0 1rem 0;\n  cursor: pointer;\n  transition: all 150ms ease-in-out;\n  display: inline-block;\n  border-bottom: 2px solid transparent;\n}\n.detail-card__artist[_ngcontent-%COMP%]:hover {\n  color: var(--color-secondary);\n  border-bottom-color: var(--color-secondary);\n}\n.detail-card__rating[_ngcontent-%COMP%] {\n  margin-bottom: 1rem;\n  padding: 0.75rem;\n  background-color: var(--bg-primary);\n  border: 2px solid var(--border-color);\n}\n.detail-card__details[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  gap: 0.5rem;\n  margin-bottom: 1rem;\n}\n.detail-card__description[_ngcontent-%COMP%] {\n  font-size: 0.9375rem;\n  color: var(--text-secondary);\n  line-height: 1.6;\n}\n.detail-card__description[_ngcontent-%COMP%]   p[_ngcontent-%COMP%] {\n  margin: 0;\n}\n.rating-display[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 0.5rem;\n  margin-bottom: 0.5rem;\n}\n.rating-display__star[_ngcontent-%COMP%] {\n  font-size: 1.5rem;\n  color: var(--border-color);\n  transition: color 150ms ease-in-out;\n}\n.rating-display__star--filled[_ngcontent-%COMP%] {\n  color: var(--color-secondary);\n}\n.rating-display__value[_ngcontent-%COMP%] {\n  font-size: 1.125rem;\n  font-weight: 700;\n  color: var(--text-primary);\n  margin-left: 0.5rem;\n}\n.rating-display__count[_ngcontent-%COMP%] {\n  font-size: 0.875rem;\n  color: var(--text-secondary);\n  margin: 0;\n}\n.detail-item[_ngcontent-%COMP%] {\n  display: flex;\n  justify-content: space-between;\n  align-items: center;\n  padding: 0.5rem 0;\n  border-bottom: 1px solid var(--border-color);\n}\n.detail-item[_ngcontent-%COMP%]:last-child {\n  border-bottom: none;\n}\n.detail-item__label[_ngcontent-%COMP%] {\n  font-size: 0.9375rem;\n  font-weight: 600;\n  color: var(--text-secondary);\n}\n.detail-item__value[_ngcontent-%COMP%] {\n  font-size: 0.9375rem;\n  font-weight: 700;\n  color: var(--text-primary);\n}\n.section-title[_ngcontent-%COMP%] {\n  font-size: 1.125rem;\n  font-weight: 700;\n  color: var(--text-primary);\n  margin: 0 0 1rem 0;\n  font-family: "Monoton";\n}\n.section-title__count[_ngcontent-%COMP%] {\n  color: var(--text-secondary);\n  font-weight: 400;\n}\n.rating-section[_ngcontent-%COMP%] {\n  background-color: var(--bg-secondary);\n  border: 4px solid var(--border-color);\n  box-shadow: 6px 6px 0px #01131B;\n  padding: 2rem;\n}\n@media (max-width: 768px) {\n  .rating-section[_ngcontent-%COMP%] {\n    padding: 1rem;\n  }\n}\n.rating-input[_ngcontent-%COMP%] {\n  text-align: center;\n}\n.rating-input__stars[_ngcontent-%COMP%] {\n  display: flex;\n  gap: 0.5rem;\n  justify-content: center;\n  margin-bottom: 1rem;\n}\n.rating-input__message[_ngcontent-%COMP%] {\n  font-size: 0.9375rem;\n  line-height: 1.5rem;\n  color: var(--text-secondary);\n  margin: 0;\n}\n.star[_ngcontent-%COMP%] {\n  background: none;\n  border: none;\n  font-size: 2.5rem;\n  cursor: pointer;\n  transition: all 150ms ease-in-out;\n  padding: 0.5rem;\n  color: var(--border-color);\n}\n@media (max-width: 768px) {\n  .star[_ngcontent-%COMP%] {\n    font-size: 2rem;\n  }\n}\n.star--empty[_ngcontent-%COMP%] {\n  color: var(--border-color);\n}\n.star--empty[_ngcontent-%COMP%]:hover {\n  color: var(--color-secondary);\n  transform: scale(1.2);\n}\n.star--filled[_ngcontent-%COMP%] {\n  color: var(--color-secondary);\n}\n.star--filled[_ngcontent-%COMP%]:hover {\n  transform: scale(1.2);\n}\n.star[_ngcontent-%COMP%]:focus {\n  outline: 2px solid var(--color-primary);\n  outline-offset: 4px;\n}\n.review-form-section[_ngcontent-%COMP%] {\n  background-color: var(--bg-secondary);\n  border: 4px solid var(--border-color);\n  box-shadow: 6px 6px 0px #01131B;\n  padding: 2rem;\n}\n@media (max-width: 768px) {\n  .review-form-section[_ngcontent-%COMP%] {\n    padding: 1rem;\n  }\n}\n.review-form__title[_ngcontent-%COMP%] {\n  font-size: 1.125rem;\n  line-height: 1.75rem;\n  font-weight: 700;\n  color: var(--text-primary);\n  margin: 0 0 1rem 0;\n}\n.review-form__textarea[_ngcontent-%COMP%] {\n  width: 100%;\n  min-height: 150px;\n  padding: 1rem;\n  font-size: 0.9375rem;\n  color: var(--text-primary);\n  background-color: var(--bg-primary);\n  border: 2px solid var(--border-color);\n  font-family: "Space Grotesk", sans-serif;\n  resize: vertical;\n  margin-bottom: 1rem;\n  transition: all 150ms ease-in-out;\n}\n.review-form__textarea[_ngcontent-%COMP%]:focus {\n  outline: none;\n  border-color: var(--color-primary);\n  box-shadow: 2px 2px 0px #01131B;\n}\n.review-form__textarea[_ngcontent-%COMP%]::placeholder {\n  color: var(--text-secondary);\n}\n.review-form__footer[_ngcontent-%COMP%] {\n  display: flex;\n  justify-content: space-between;\n  align-items: center;\n  gap: 1rem;\n}\n@media (max-width: 768px) {\n  .review-form__footer[_ngcontent-%COMP%] {\n    flex-direction: column;\n    align-items: stretch;\n  }\n}\n.review-form__counter[_ngcontent-%COMP%] {\n  font-size: 0.875rem;\n  color: var(--text-secondary);\n}\n.review-form__counter--warning[_ngcontent-%COMP%] {\n  color: var(--color-accent);\n  font-weight: 600;\n}\n.review-form__actions[_ngcontent-%COMP%] {\n  display: flex;\n  gap: 1rem;\n}\n@media (max-width: 768px) {\n  .review-form__actions[_ngcontent-%COMP%] {\n    width: 100%;\n  }\n  .review-form__actions[_ngcontent-%COMP%]   button[_ngcontent-%COMP%] {\n    flex: 1;\n  }\n}\n.reviews-section[_ngcontent-%COMP%] {\n  background-color: var(--bg-secondary);\n  border: 4px solid var(--border-color);\n  box-shadow: 6px 6px 0px #01131B;\n  padding: 1.5rem;\n}\n@media (max-width: 768px) {\n  .reviews-section[_ngcontent-%COMP%] {\n    padding: 1rem;\n  }\n}\n.reviews-section[_ngcontent-%COMP%]   .section-title[_ngcontent-%COMP%] {\n  margin: 0 0 1rem 0;\n}\n.reviews-section[_ngcontent-%COMP%]   [_ngcontent-%COMP%]:deep(.review-card) {\n  background-color: var(--bg-primary);\n  border: 2px solid var(--border-color);\n  padding: 1rem;\n  margin-bottom: 1rem;\n  transition: all 150ms ease-in-out;\n}\n.reviews-section[_ngcontent-%COMP%]   [_ngcontent-%COMP%]:deep(.review-card):last-child {\n  margin-bottom: 0;\n}\n.reviews-section[_ngcontent-%COMP%]   [_ngcontent-%COMP%]:deep(.review-card):hover {\n  box-shadow: 2px 2px 0px #01131B;\n}\n.reviews-section[_ngcontent-%COMP%]   [_ngcontent-%COMP%]:deep(.review-card__header) {\n  display: flex;\n  gap: 1rem;\n  margin-bottom: 1rem;\n}\n.reviews-section[_ngcontent-%COMP%]   [_ngcontent-%COMP%]:deep(.review-card__avatar) {\n  width: 48px;\n  height: 48px;\n  border-radius: 50%;\n  border: 2px solid var(--border-color);\n  object-fit: cover;\n  cursor: pointer;\n  transition: transform 150ms ease-in-out;\n}\n.reviews-section[_ngcontent-%COMP%]   [_ngcontent-%COMP%]:deep(.review-card__avatar):hover {\n  transform: scale(1.1);\n}\n.reviews-section[_ngcontent-%COMP%]   [_ngcontent-%COMP%]:deep(.review-card__user-info) {\n  flex: 1;\n}\n.reviews-section[_ngcontent-%COMP%]   [_ngcontent-%COMP%]:deep(.review-card__user-name) {\n  font-size: 1rem;\n  font-weight: 700;\n  color: var(--text-primary);\n  margin: 0 0 0.25rem 0;\n  cursor: pointer;\n  display: inline-block;\n  transition: color 150ms ease-in-out;\n}\n.reviews-section[_ngcontent-%COMP%]   [_ngcontent-%COMP%]:deep(.review-card__user-name):hover {\n  color: var(--color-primary);\n}\n.reviews-section[_ngcontent-%COMP%]   [_ngcontent-%COMP%]:deep(.review-card__meta) {\n  display: flex;\n  gap: 1rem;\n  align-items: center;\n  flex-wrap: wrap;\n}\n.reviews-section[_ngcontent-%COMP%]   [_ngcontent-%COMP%]:deep(.review-card__rating) {\n  font-size: 0.9375rem;\n  color: var(--color-secondary);\n}\n.reviews-section[_ngcontent-%COMP%]   [_ngcontent-%COMP%]:deep(.review-card__date) {\n  font-size: 0.875rem;\n  color: var(--text-secondary);\n}\n.reviews-section[_ngcontent-%COMP%]   [_ngcontent-%COMP%]:deep(.review-card__content)   p[_ngcontent-%COMP%] {\n  font-size: 0.9375rem;\n  line-height: 1.6;\n  color: var(--text-primary);\n  margin: 0 0 1rem 0;\n}\n.reviews-section[_ngcontent-%COMP%]   [_ngcontent-%COMP%]:deep(.review-card__footer) {\n  display: flex;\n  justify-content: flex-end;\n}\n.reviews-section[_ngcontent-%COMP%]   [_ngcontent-%COMP%]:deep(.review-card__like-btn) {\n  display: flex;\n  align-items: center;\n  gap: 0.5rem;\n  padding: 0.5rem 1rem;\n  background-color: transparent;\n  border: 2px solid var(--border-color);\n  color: var(--text-primary);\n  font-size: 0.875rem;\n  font-weight: 600;\n  cursor: pointer;\n  transition: all 150ms ease-in-out;\n}\n.reviews-section[_ngcontent-%COMP%]   [_ngcontent-%COMP%]:deep(.review-card__like-btn)   svg[_ngcontent-%COMP%] {\n  width: 16px;\n  height: 16px;\n}\n.reviews-section[_ngcontent-%COMP%]   [_ngcontent-%COMP%]:deep(.review-card__like-btn):hover {\n  background-color: var(--color-primary);\n  color: var(--text-dark);\n  transform: translateY(-2px);\n}\n.reviews-section[_ngcontent-%COMP%]   [_ngcontent-%COMP%]:deep(.review-card__like-btn):active {\n  transform: translateY(0);\n}\n.reviews-list[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  gap: 1rem;\n}\n.review-card[_ngcontent-%COMP%] {\n  background-color: var(--bg-primary);\n  border: 2px solid var(--border-color);\n  padding: 1rem;\n  transition: all 150ms ease-in-out;\n}\n.review-card[_ngcontent-%COMP%]:hover {\n  box-shadow: 2px 2px 0px #01131B;\n}\n.review-card__header[_ngcontent-%COMP%] {\n  display: flex;\n  gap: 1rem;\n  margin-bottom: 1rem;\n}\n.review-card__avatar[_ngcontent-%COMP%] {\n  width: 48px;\n  height: 48px;\n  border-radius: 50%;\n  border: 2px solid var(--border-color);\n  object-fit: cover;\n  cursor: pointer;\n  transition: transform 150ms ease-in-out;\n}\n.review-card__avatar[_ngcontent-%COMP%]:hover {\n  transform: scale(1.1);\n}\n.review-card__user-info[_ngcontent-%COMP%] {\n  flex: 1;\n}\n.review-card__user-name[_ngcontent-%COMP%] {\n  font-size: 1rem;\n  font-weight: 700;\n  color: var(--text-primary);\n  margin: 0 0 0.25rem 0;\n  cursor: pointer;\n  display: inline-block;\n  transition: color 150ms ease-in-out;\n}\n.review-card__user-name[_ngcontent-%COMP%]:hover {\n  color: var(--color-primary);\n}\n.review-card__meta[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 1rem;\n}\n.review-card__rating[_ngcontent-%COMP%] {\n  display: flex;\n  gap: 0.25rem;\n}\n.review-card__star[_ngcontent-%COMP%] {\n  font-size: 1rem;\n  color: var(--border-color);\n}\n.review-card__star--filled[_ngcontent-%COMP%] {\n  color: var(--color-secondary);\n}\n.review-card__date[_ngcontent-%COMP%] {\n  font-size: 0.875rem;\n  color: var(--text-secondary);\n}\n.review-card__content[_ngcontent-%COMP%] {\n  margin-bottom: 1rem;\n}\n.review-card__content[_ngcontent-%COMP%]   p[_ngcontent-%COMP%] {\n  font-size: 0.9375rem;\n  color: var(--text-primary);\n  line-height: 1.6;\n  margin: 0;\n}\n.review-card__footer[_ngcontent-%COMP%] {\n  display: flex;\n  justify-content: flex-end;\n}\n.review-card__like-btn[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 0.5rem;\n  background: none;\n  border: none;\n  cursor: pointer;\n  padding: 0.5rem 1rem;\n  font-size: 0.9375rem;\n  color: var(--text-secondary);\n  transition: all 150ms ease-in-out;\n}\n.review-card__like-btn[_ngcontent-%COMP%]:hover {\n  color: var(--color-accent);\n}\n.review-card__like-btn[_ngcontent-%COMP%]:hover   .review-card__like-icon[_ngcontent-%COMP%] {\n  transform: scale(1.2);\n}\n.review-card__like-icon[_ngcontent-%COMP%] {\n  font-size: 1.25rem;\n  transition: transform 150ms ease-in-out;\n}\n.review-card__like-count[_ngcontent-%COMP%] {\n  font-weight: 600;\n}\n.loading-state[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n  justify-content: center;\n  padding: 3rem 1rem;\n  text-align: center;\n}\n.loading-state--fullpage[_ngcontent-%COMP%] {\n  min-height: 100vh;\n}\n.loading-state[_ngcontent-%COMP%]   p[_ngcontent-%COMP%] {\n  margin-top: 1rem;\n  font-size: 1rem;\n  color: var(--text-secondary);\n}\n.empty-state[_ngcontent-%COMP%] {\n  text-align: center;\n  padding: 3rem 1rem;\n}\n.empty-state__title[_ngcontent-%COMP%] {\n  font-size: 1.125rem;\n  font-weight: 700;\n  color: var(--text-primary);\n  margin: 0 0 0.5rem 0;\n}\n.empty-state__subtitle[_ngcontent-%COMP%] {\n  font-size: 0.9375rem;\n  color: var(--text-secondary);\n  margin: 0;\n}\n.spinner[_ngcontent-%COMP%] {\n  width: 48px;\n  height: 48px;\n  border: 4px solid var(--border-color);\n  border-top-color: var(--color-primary);\n  border-radius: 50%;\n  animation: _ngcontent-%COMP%_spin 1s linear infinite;\n}\n@keyframes _ngcontent-%COMP%_spin {\n  to {\n    transform: rotate(360deg);\n  }\n}\n.btn[_ngcontent-%COMP%] {\n  padding: 0.75rem 1.5rem;\n  font-size: 0.9375rem;\n  font-weight: 700;\n  font-family: "Space Grotesk", sans-serif;\n  border: 4px solid var(--border-color);\n  cursor: pointer;\n  transition: all 150ms ease-in-out;\n  text-align: center;\n  text-decoration: none;\n  display: inline-block;\n}\n.btn--primary[_ngcontent-%COMP%] {\n  background-color: var(--color-primary);\n  color: var(--text-dark);\n  box-shadow: 4px 4px 0px #01131B;\n}\n.btn--primary[_ngcontent-%COMP%]:hover:not(:disabled) {\n  transform: translate(2px, 2px);\n  box-shadow: 2px 2px 0px #01131B;\n}\n.btn--primary[_ngcontent-%COMP%]:disabled {\n  opacity: 0.5;\n  cursor: not-allowed;\n}\n.btn--secondary[_ngcontent-%COMP%] {\n  background-color: var(--bg-secondary);\n  color: var(--text-primary);\n  box-shadow: 4px 4px 0px #01131B;\n}\n.btn--secondary[_ngcontent-%COMP%]:hover:not(:disabled) {\n  transform: translate(2px, 2px);\n  box-shadow: 2px 2px 0px #01131B;\n  background-color: var(--color-secondary);\n  color: var(--text-dark);\n}\n.btn--block[_ngcontent-%COMP%] {\n  width: 100%;\n  display: block;\n}\n.tracklist-section[_ngcontent-%COMP%] {\n  background-color: var(--bg-secondary);\n  border: 4px solid var(--border-color);\n  box-shadow: 6px 6px 0px #01131B;\n  padding: 1.5rem;\n}\n@media (max-width: 768px) {\n  .tracklist-section[_ngcontent-%COMP%] {\n    padding: 1rem;\n  }\n}\n.tracklist-section[_ngcontent-%COMP%]   .section-title[_ngcontent-%COMP%] {\n  margin: 0 0 1rem 0;\n}\n.tracklist-section[_ngcontent-%COMP%]   [_ngcontent-%COMP%]:deep(.track-item) {\n  display: grid;\n  grid-template-columns: 40px 1fr auto;\n  gap: 1rem;\n  align-items: center;\n  padding: 0.75rem;\n  border-bottom: 1px solid var(--border-color);\n  cursor: pointer;\n  transition: all 150ms ease-in-out;\n}\n.tracklist-section[_ngcontent-%COMP%]   [_ngcontent-%COMP%]:deep(.track-item):last-child {\n  border-bottom: none;\n}\n.tracklist-section[_ngcontent-%COMP%]   [_ngcontent-%COMP%]:deep(.track-item):hover {\n  background-color: var(--color-primary);\n  color: var(--text-dark);\n}\n@media (max-width: 768px) {\n  .tracklist-section[_ngcontent-%COMP%]   [_ngcontent-%COMP%]:deep(.track-item) {\n    grid-template-columns: 30px 1fr auto;\n    gap: 0.5rem;\n    padding: 0.5rem;\n  }\n}\n.tracklist-section[_ngcontent-%COMP%]   [_ngcontent-%COMP%]:deep(.track-item__number) {\n  font-size: 0.9375rem;\n  font-weight: 700;\n  color: var(--text-secondary);\n  text-align: center;\n  transition: color 150ms ease-in-out;\n}\n.tracklist-section[_ngcontent-%COMP%]   [_ngcontent-%COMP%]:deep(.track-item__title) {\n  font-size: 0.9375rem;\n  font-weight: 600;\n  color: var(--text-primary);\n  transition: color 150ms ease-in-out;\n}\n.tracklist-section[_ngcontent-%COMP%]   [_ngcontent-%COMP%]:deep(.track-item__duration) {\n  font-size: 0.875rem;\n  color: var(--text-secondary);\n  font-family: "Courier New", monospace;\n  transition: color 150ms ease-in-out;\n}\n/*# sourceMappingURL=detail.css.map */'] });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(DetailComponent, [{
    type: Component,
    args: [{ selector: "app-detail", standalone: true, imports: [
      CommonModule,
      FormsModule,
      RouterModule,
      Accordion,
      Button,
      Spinner
    ], template: `<div class="detail">\r
  @if (item(); as itemData) {\r
    <div class="detail__container">\r
\r
      <!-- COLUMNA IZQUIERDA: INFO DEL \xC1LBUM (1/3) -->\r
      <aside class="detail__sidebar">\r
        <div class="detail-card">\r
          <!-- Cover del \xE1lbum -->\r
          <div class="detail-card__cover">\r
            <img\r
              [src]="itemData.coverUrl"\r
              [alt]="itemData.title"\r
              class="detail-card__image"\r
            />\r
          </div>\r
\r
          <!-- Info b\xE1sica -->\r
          <div class="detail-card__info">\r
            <h1 class="detail-card__title">{{ itemData.title }}</h1>\r
            <p class="detail-card__artist" (click)="goToArtist(itemData.artistId)">\r
              {{ itemData.artist }}\r
            </p>\r
\r
            <!-- Rating promedio -->\r
            <div class="detail-card__rating">\r
              <div class="rating-display">\r
                @for (star of [1, 2, 3, 4, 5]; track star) {\r
                  <span\r
                    class="rating-display__star"\r
                    [class.rating-display__star--filled]="star <= itemData.averageRating"\r
                  >\r
                    \u2605\r
                  </span>\r
                }\r
                <span class="rating-display__value">\r
                  {{ itemData.averageRating }}/5\r
                </span>\r
              </div>\r
              <p class="rating-display__count">\r
                {{ itemData.totalReviews }} rese\xF1as\r
              </p>\r
            </div>\r
\r
            <!-- Detalles -->\r
            <div class="detail-card__details">\r
              <div class="detail-item">\r
                <span class="detail-item__label">A\xF1o</span>\r
                <span class="detail-item__value">{{ itemData.releaseYear }}</span>\r
              </div>\r
              <div class="detail-item">\r
                <span class="detail-item__label">G\xE9nero</span>\r
                <span class="detail-item__value">{{ itemData.genre }}</span>\r
              </div>\r
              <div class="detail-item">\r
                <span class="detail-item__label">Canciones</span>\r
                <span class="detail-item__value">{{ itemData.tracks }}</span>\r
              </div>\r
              <div class="detail-item">\r
                <span class="detail-item__label">Duraci\xF3n</span>\r
                <span class="detail-item__value">{{ itemData.duration }}</span>\r
              </div>\r
              <div class="detail-item">\r
                <span class="detail-item__label">Sello</span>\r
                <span class="detail-item__value">{{ itemData.label }}</span>\r
              </div>\r
            </div>\r
\r
            <!-- Descripci\xF3n -->\r
            <div class="detail-card__description">\r
              <p>{{ itemData.description }}</p>\r
            </div>\r
          </div>\r
        </div>\r
      </aside>\r
\r
      <!-- COLUMNA DERECHA: RESE\xD1AS Y PUNTUACI\xD3N (2/3) -->\r
      <main class="detail__content">\r
\r
        <!-- Navegaci\xF3n interna por secciones (usa fragments) -->\r
        <nav class="detail__nav">\r
          <button\r
            type="button"\r
            class="detail__nav-item"\r
            (click)="navigateToSection('info')"\r
          >\r
            Informaci\xF3n\r
          </button>\r
          <button\r
            type="button"\r
            class="detail__nav-item"\r
            (click)="navigateToSection('tracks')"\r
          >\r
            Canciones\r
          </button>\r
          <button\r
            type="button"\r
            class="detail__nav-item"\r
            (click)="navigateToSection('reviews')"\r
          >\r
            Rese\xF1as\r
          </button>\r
          <button\r
            type="button"\r
            class="detail__nav-item detail__nav-item--share"\r
            (click)="shareReviewsLink()"\r
            title="Copiar enlace a rese\xF1as"\r
          >\r
            \u{1F517} Compartir\r
          </button>\r
        </nav>\r
\r
        <!-- SECCI\xD3N: LISTA DE CANCIONES -->\r
        <section id="tracks" class="tracklist-section">\r
          <h2 class="section-title">Lista de canciones</h2>\r
          <app-accordion\r
            [items]="tracklistAccordionItems()"\r
            mode="single">\r
          </app-accordion>\r
        </section>\r
\r
        <!-- SECCI\xD3N: TU PUNTUACI\xD3N -->\r
        <section id="info" class="rating-section">\r
          <h2 class="section-title">Tu puntuaci\xF3n</h2>\r
\r
          <div class="rating-input">\r
            <div class="rating-input__stars">\r
              @for (star of [1, 2, 3, 4, 5]; track star) {\r
                <button\r
                  type="button"\r
                  class="star"\r
                  [class]="getStarClass(star)"\r
                  (click)="setRating(star)"\r
                  (mouseenter)="hoverStar(star)"\r
                  (mouseleave)="resetHover()"\r
                  [attr.aria-label]="'Puntuar con ' + star + ' estrellas'"\r
                >\r
                  \u2605\r
                </button>\r
              }\r
            </div>\r
\r
            @if (hasUserRated()) {\r
              <p class="rating-input__message">\r
                Has puntuado este \xE1lbum con {{ userRating() }} estrella{{ userRating() !== 1 ? 's' : '' }}\r
              </p>\r
            } @else {\r
              <p class="rating-input__message">\r
                Haz clic en una estrella para puntuar\r
              </p>\r
            }\r
          </div>\r
        </section>\r
\r
        <!-- SECCI\xD3N: ESCRIBIR RESE\xD1A -->\r
        <section class="review-form-section">\r
          @if (!isWritingReview()) {\r
            <app-button\r
              variant="primary"\r
              size="lg"\r
              [fullWidth]="true"\r
              (clicked)="toggleReviewForm()"\r
            >\r
              Escribir una rese\xF1a\r
            </app-button>\r
          } @else {\r
            <div class="review-form">\r
              <h3 class="review-form__title">Escribe tu rese\xF1a</h3>\r
\r
              <textarea\r
                class="review-form__textarea"\r
                [(ngModel)]="reviewText"\r
                placeholder="Comparte tu opini\xF3n sobre este \xE1lbum (m\xEDnimo 50 caracteres)..."\r
                rows="6"\r
              ></textarea>\r
\r
              <div class="review-form__footer">\r
                <span class="review-form__counter">\r
                  {{ reviewText().length }} caracteres\r
                  @if (reviewText().length < 50) {\r
                    <span class="review-form__counter--warning">\r
                      (m\xEDnimo 50)\r
                    </span>\r
                  }\r
                </span>\r
\r
                <div class="review-form__actions">\r
                  <app-button\r
                    variant="secondary"\r
                    size="md"\r
                    (clicked)="cancelReview()"\r
                  >\r
                    Cancelar\r
                  </app-button>\r
                  <app-button\r
                    variant="primary"\r
                    size="md"\r
                    [disabled]="!canSubmitReview()"\r
                    (clicked)="submitReview()"\r
                  >\r
                    Publicar rese\xF1a\r
                  </app-button>\r
                </div>\r
              </div>\r
            </div>\r
          }\r
        </section>\r
\r
        <!-- SECCI\xD3N: LISTA DE RESE\xD1AS -->\r
        <section id="reviews" class="reviews-section">\r
          <h2 class="section-title">\r
            Rese\xF1as de la comunidad\r
            <span class="section-title__count">({{ reviews().length }})</span>\r
          </h2>\r
\r
          @if (isLoadingReviews()) {\r
            <div class="loading-state">\r
              <app-spinner></app-spinner>\r
              <p>Cargando rese\xF1as...</p>\r
            </div>\r
          } @else if (reviews().length === 0) {\r
            <div class="empty-state">\r
              <p class="empty-state__title">No hay rese\xF1as a\xFAn</p>\r
              <p class="empty-state__subtitle">\r
                S\xE9 el primero en compartir tu opini\xF3n sobre este \xE1lbum\r
              </p>\r
            </div>\r
          } @else {\r
            <app-accordion\r
              [items]="reviewsAccordionItems()"\r
              mode="single">\r
            </app-accordion>\r
          }\r
        </section>\r
\r
      </main>\r
    </div>\r
  } @else {\r
    <div class="loading-state loading-state--fullpage">\r
      <app-spinner></app-spinner>\r
      <p>Cargando \xE1lbum...</p>\r
    </div>\r
  }\r
</div>\r
`, styles: ['@charset "UTF-8";\n\n/* src/app/pages/detail/detail.scss */\n.detail {\n  min-height: 100vh;\n  padding: 2rem;\n  background-color: var(--bg-primary);\n}\n@media (max-width: 768px) {\n  .detail {\n    padding: 1rem;\n  }\n}\n.detail__container {\n  max-width: 1440px;\n  margin: 0 auto;\n  display: grid;\n  grid-template-columns: 1fr 2fr;\n  gap: 2rem;\n}\n@media (max-width: 1024px) {\n  .detail__container {\n    grid-template-columns: 1fr;\n    gap: 2rem;\n  }\n}\n.detail__sidebar {\n  position: sticky;\n  top: 1rem;\n  height: fit-content;\n}\n@media (max-width: 1024px) {\n  .detail__sidebar {\n    position: static;\n  }\n}\n.detail__content {\n  display: flex;\n  flex-direction: column;\n  gap: 2rem;\n}\n.detail__nav {\n  display: flex;\n  flex-wrap: wrap;\n  gap: 0.5rem;\n  padding: 1rem;\n  background-color: var(--bg-secondary);\n  border: 4px solid var(--border-color);\n  box-shadow: 4px 4px 0px #01131B;\n  position: sticky;\n  top: 1rem;\n  z-index: 10;\n}\n.detail__nav-item {\n  padding: 0.5rem 1rem;\n  background-color: var(--bg-primary);\n  border: 2px solid var(--border-color);\n  font-weight: 600;\n  cursor: pointer;\n  transition: all 150ms ease-in-out;\n  font-size: 0.9375rem;\n  line-height: 1.5rem;\n}\n.detail__nav-item:hover {\n  background-color: var(--color-primary);\n  color: var(--bg-primary);\n  transform: translateY(-2px);\n  box-shadow: 4px 4px 0px #01131B;\n}\n.detail__nav-item--share {\n  margin-left: auto;\n  background-color: var(--bg-tertiary);\n}\n.detail__nav-item--share:hover {\n  background-color: var(--color-secondary);\n}\n.detail-card {\n  background-color: var(--bg-secondary);\n  border: 4px solid var(--border-color);\n  box-shadow: 6px 6px 0px #01131B;\n  overflow: hidden;\n}\n.detail-card__cover {\n  width: 100%;\n  aspect-ratio: 1;\n  overflow: hidden;\n  border-bottom: 4px solid var(--border-color);\n}\n.detail-card__image {\n  width: 100%;\n  height: 100%;\n  object-fit: cover;\n  display: block;\n  transition: transform 300ms ease-in-out;\n}\n.detail-card__image:hover {\n  transform: scale(1.05);\n}\n.detail-card__info {\n  padding: 2rem;\n}\n@media (max-width: 768px) {\n  .detail-card__info {\n    padding: 1rem;\n  }\n}\n.detail-card__title {\n  font-size: 1rem;\n  line-height: 3rem;\n  font-weight: 900;\n  color: var(--text-primary);\n  margin: 0 0 0.5rem 0;\n  line-height: 1.2;\n  font-family: "Monoton";\n}\n@media (max-width: 768px) {\n  .detail-card__title {\n    font-size: 1.125rem;\n    line-height: 1.75rem;\n  }\n}\n.detail-card__artist {\n  font-size: 1rem;\n  line-height: 1.5rem;\n  color: var(--color-primary);\n  margin: 0 0 1rem 0;\n  cursor: pointer;\n  transition: all 150ms ease-in-out;\n  display: inline-block;\n  border-bottom: 2px solid transparent;\n}\n.detail-card__artist:hover {\n  color: var(--color-secondary);\n  border-bottom-color: var(--color-secondary);\n}\n.detail-card__rating {\n  margin-bottom: 1rem;\n  padding: 0.75rem;\n  background-color: var(--bg-primary);\n  border: 2px solid var(--border-color);\n}\n.detail-card__details {\n  display: flex;\n  flex-direction: column;\n  gap: 0.5rem;\n  margin-bottom: 1rem;\n}\n.detail-card__description {\n  font-size: 0.9375rem;\n  color: var(--text-secondary);\n  line-height: 1.6;\n}\n.detail-card__description p {\n  margin: 0;\n}\n.rating-display {\n  display: flex;\n  align-items: center;\n  gap: 0.5rem;\n  margin-bottom: 0.5rem;\n}\n.rating-display__star {\n  font-size: 1.5rem;\n  color: var(--border-color);\n  transition: color 150ms ease-in-out;\n}\n.rating-display__star--filled {\n  color: var(--color-secondary);\n}\n.rating-display__value {\n  font-size: 1.125rem;\n  font-weight: 700;\n  color: var(--text-primary);\n  margin-left: 0.5rem;\n}\n.rating-display__count {\n  font-size: 0.875rem;\n  color: var(--text-secondary);\n  margin: 0;\n}\n.detail-item {\n  display: flex;\n  justify-content: space-between;\n  align-items: center;\n  padding: 0.5rem 0;\n  border-bottom: 1px solid var(--border-color);\n}\n.detail-item:last-child {\n  border-bottom: none;\n}\n.detail-item__label {\n  font-size: 0.9375rem;\n  font-weight: 600;\n  color: var(--text-secondary);\n}\n.detail-item__value {\n  font-size: 0.9375rem;\n  font-weight: 700;\n  color: var(--text-primary);\n}\n.section-title {\n  font-size: 1.125rem;\n  font-weight: 700;\n  color: var(--text-primary);\n  margin: 0 0 1rem 0;\n  font-family: "Monoton";\n}\n.section-title__count {\n  color: var(--text-secondary);\n  font-weight: 400;\n}\n.rating-section {\n  background-color: var(--bg-secondary);\n  border: 4px solid var(--border-color);\n  box-shadow: 6px 6px 0px #01131B;\n  padding: 2rem;\n}\n@media (max-width: 768px) {\n  .rating-section {\n    padding: 1rem;\n  }\n}\n.rating-input {\n  text-align: center;\n}\n.rating-input__stars {\n  display: flex;\n  gap: 0.5rem;\n  justify-content: center;\n  margin-bottom: 1rem;\n}\n.rating-input__message {\n  font-size: 0.9375rem;\n  line-height: 1.5rem;\n  color: var(--text-secondary);\n  margin: 0;\n}\n.star {\n  background: none;\n  border: none;\n  font-size: 2.5rem;\n  cursor: pointer;\n  transition: all 150ms ease-in-out;\n  padding: 0.5rem;\n  color: var(--border-color);\n}\n@media (max-width: 768px) {\n  .star {\n    font-size: 2rem;\n  }\n}\n.star--empty {\n  color: var(--border-color);\n}\n.star--empty:hover {\n  color: var(--color-secondary);\n  transform: scale(1.2);\n}\n.star--filled {\n  color: var(--color-secondary);\n}\n.star--filled:hover {\n  transform: scale(1.2);\n}\n.star:focus {\n  outline: 2px solid var(--color-primary);\n  outline-offset: 4px;\n}\n.review-form-section {\n  background-color: var(--bg-secondary);\n  border: 4px solid var(--border-color);\n  box-shadow: 6px 6px 0px #01131B;\n  padding: 2rem;\n}\n@media (max-width: 768px) {\n  .review-form-section {\n    padding: 1rem;\n  }\n}\n.review-form__title {\n  font-size: 1.125rem;\n  line-height: 1.75rem;\n  font-weight: 700;\n  color: var(--text-primary);\n  margin: 0 0 1rem 0;\n}\n.review-form__textarea {\n  width: 100%;\n  min-height: 150px;\n  padding: 1rem;\n  font-size: 0.9375rem;\n  color: var(--text-primary);\n  background-color: var(--bg-primary);\n  border: 2px solid var(--border-color);\n  font-family: "Space Grotesk", sans-serif;\n  resize: vertical;\n  margin-bottom: 1rem;\n  transition: all 150ms ease-in-out;\n}\n.review-form__textarea:focus {\n  outline: none;\n  border-color: var(--color-primary);\n  box-shadow: 2px 2px 0px #01131B;\n}\n.review-form__textarea::placeholder {\n  color: var(--text-secondary);\n}\n.review-form__footer {\n  display: flex;\n  justify-content: space-between;\n  align-items: center;\n  gap: 1rem;\n}\n@media (max-width: 768px) {\n  .review-form__footer {\n    flex-direction: column;\n    align-items: stretch;\n  }\n}\n.review-form__counter {\n  font-size: 0.875rem;\n  color: var(--text-secondary);\n}\n.review-form__counter--warning {\n  color: var(--color-accent);\n  font-weight: 600;\n}\n.review-form__actions {\n  display: flex;\n  gap: 1rem;\n}\n@media (max-width: 768px) {\n  .review-form__actions {\n    width: 100%;\n  }\n  .review-form__actions button {\n    flex: 1;\n  }\n}\n.reviews-section {\n  background-color: var(--bg-secondary);\n  border: 4px solid var(--border-color);\n  box-shadow: 6px 6px 0px #01131B;\n  padding: 1.5rem;\n}\n@media (max-width: 768px) {\n  .reviews-section {\n    padding: 1rem;\n  }\n}\n.reviews-section .section-title {\n  margin: 0 0 1rem 0;\n}\n.reviews-section :deep(.review-card) {\n  background-color: var(--bg-primary);\n  border: 2px solid var(--border-color);\n  padding: 1rem;\n  margin-bottom: 1rem;\n  transition: all 150ms ease-in-out;\n}\n.reviews-section :deep(.review-card):last-child {\n  margin-bottom: 0;\n}\n.reviews-section :deep(.review-card):hover {\n  box-shadow: 2px 2px 0px #01131B;\n}\n.reviews-section :deep(.review-card__header) {\n  display: flex;\n  gap: 1rem;\n  margin-bottom: 1rem;\n}\n.reviews-section :deep(.review-card__avatar) {\n  width: 48px;\n  height: 48px;\n  border-radius: 50%;\n  border: 2px solid var(--border-color);\n  object-fit: cover;\n  cursor: pointer;\n  transition: transform 150ms ease-in-out;\n}\n.reviews-section :deep(.review-card__avatar):hover {\n  transform: scale(1.1);\n}\n.reviews-section :deep(.review-card__user-info) {\n  flex: 1;\n}\n.reviews-section :deep(.review-card__user-name) {\n  font-size: 1rem;\n  font-weight: 700;\n  color: var(--text-primary);\n  margin: 0 0 0.25rem 0;\n  cursor: pointer;\n  display: inline-block;\n  transition: color 150ms ease-in-out;\n}\n.reviews-section :deep(.review-card__user-name):hover {\n  color: var(--color-primary);\n}\n.reviews-section :deep(.review-card__meta) {\n  display: flex;\n  gap: 1rem;\n  align-items: center;\n  flex-wrap: wrap;\n}\n.reviews-section :deep(.review-card__rating) {\n  font-size: 0.9375rem;\n  color: var(--color-secondary);\n}\n.reviews-section :deep(.review-card__date) {\n  font-size: 0.875rem;\n  color: var(--text-secondary);\n}\n.reviews-section :deep(.review-card__content) p {\n  font-size: 0.9375rem;\n  line-height: 1.6;\n  color: var(--text-primary);\n  margin: 0 0 1rem 0;\n}\n.reviews-section :deep(.review-card__footer) {\n  display: flex;\n  justify-content: flex-end;\n}\n.reviews-section :deep(.review-card__like-btn) {\n  display: flex;\n  align-items: center;\n  gap: 0.5rem;\n  padding: 0.5rem 1rem;\n  background-color: transparent;\n  border: 2px solid var(--border-color);\n  color: var(--text-primary);\n  font-size: 0.875rem;\n  font-weight: 600;\n  cursor: pointer;\n  transition: all 150ms ease-in-out;\n}\n.reviews-section :deep(.review-card__like-btn) svg {\n  width: 16px;\n  height: 16px;\n}\n.reviews-section :deep(.review-card__like-btn):hover {\n  background-color: var(--color-primary);\n  color: var(--text-dark);\n  transform: translateY(-2px);\n}\n.reviews-section :deep(.review-card__like-btn):active {\n  transform: translateY(0);\n}\n.reviews-list {\n  display: flex;\n  flex-direction: column;\n  gap: 1rem;\n}\n.review-card {\n  background-color: var(--bg-primary);\n  border: 2px solid var(--border-color);\n  padding: 1rem;\n  transition: all 150ms ease-in-out;\n}\n.review-card:hover {\n  box-shadow: 2px 2px 0px #01131B;\n}\n.review-card__header {\n  display: flex;\n  gap: 1rem;\n  margin-bottom: 1rem;\n}\n.review-card__avatar {\n  width: 48px;\n  height: 48px;\n  border-radius: 50%;\n  border: 2px solid var(--border-color);\n  object-fit: cover;\n  cursor: pointer;\n  transition: transform 150ms ease-in-out;\n}\n.review-card__avatar:hover {\n  transform: scale(1.1);\n}\n.review-card__user-info {\n  flex: 1;\n}\n.review-card__user-name {\n  font-size: 1rem;\n  font-weight: 700;\n  color: var(--text-primary);\n  margin: 0 0 0.25rem 0;\n  cursor: pointer;\n  display: inline-block;\n  transition: color 150ms ease-in-out;\n}\n.review-card__user-name:hover {\n  color: var(--color-primary);\n}\n.review-card__meta {\n  display: flex;\n  align-items: center;\n  gap: 1rem;\n}\n.review-card__rating {\n  display: flex;\n  gap: 0.25rem;\n}\n.review-card__star {\n  font-size: 1rem;\n  color: var(--border-color);\n}\n.review-card__star--filled {\n  color: var(--color-secondary);\n}\n.review-card__date {\n  font-size: 0.875rem;\n  color: var(--text-secondary);\n}\n.review-card__content {\n  margin-bottom: 1rem;\n}\n.review-card__content p {\n  font-size: 0.9375rem;\n  color: var(--text-primary);\n  line-height: 1.6;\n  margin: 0;\n}\n.review-card__footer {\n  display: flex;\n  justify-content: flex-end;\n}\n.review-card__like-btn {\n  display: flex;\n  align-items: center;\n  gap: 0.5rem;\n  background: none;\n  border: none;\n  cursor: pointer;\n  padding: 0.5rem 1rem;\n  font-size: 0.9375rem;\n  color: var(--text-secondary);\n  transition: all 150ms ease-in-out;\n}\n.review-card__like-btn:hover {\n  color: var(--color-accent);\n}\n.review-card__like-btn:hover .review-card__like-icon {\n  transform: scale(1.2);\n}\n.review-card__like-icon {\n  font-size: 1.25rem;\n  transition: transform 150ms ease-in-out;\n}\n.review-card__like-count {\n  font-weight: 600;\n}\n.loading-state {\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n  justify-content: center;\n  padding: 3rem 1rem;\n  text-align: center;\n}\n.loading-state--fullpage {\n  min-height: 100vh;\n}\n.loading-state p {\n  margin-top: 1rem;\n  font-size: 1rem;\n  color: var(--text-secondary);\n}\n.empty-state {\n  text-align: center;\n  padding: 3rem 1rem;\n}\n.empty-state__title {\n  font-size: 1.125rem;\n  font-weight: 700;\n  color: var(--text-primary);\n  margin: 0 0 0.5rem 0;\n}\n.empty-state__subtitle {\n  font-size: 0.9375rem;\n  color: var(--text-secondary);\n  margin: 0;\n}\n.spinner {\n  width: 48px;\n  height: 48px;\n  border: 4px solid var(--border-color);\n  border-top-color: var(--color-primary);\n  border-radius: 50%;\n  animation: spin 1s linear infinite;\n}\n@keyframes spin {\n  to {\n    transform: rotate(360deg);\n  }\n}\n.btn {\n  padding: 0.75rem 1.5rem;\n  font-size: 0.9375rem;\n  font-weight: 700;\n  font-family: "Space Grotesk", sans-serif;\n  border: 4px solid var(--border-color);\n  cursor: pointer;\n  transition: all 150ms ease-in-out;\n  text-align: center;\n  text-decoration: none;\n  display: inline-block;\n}\n.btn--primary {\n  background-color: var(--color-primary);\n  color: var(--text-dark);\n  box-shadow: 4px 4px 0px #01131B;\n}\n.btn--primary:hover:not(:disabled) {\n  transform: translate(2px, 2px);\n  box-shadow: 2px 2px 0px #01131B;\n}\n.btn--primary:disabled {\n  opacity: 0.5;\n  cursor: not-allowed;\n}\n.btn--secondary {\n  background-color: var(--bg-secondary);\n  color: var(--text-primary);\n  box-shadow: 4px 4px 0px #01131B;\n}\n.btn--secondary:hover:not(:disabled) {\n  transform: translate(2px, 2px);\n  box-shadow: 2px 2px 0px #01131B;\n  background-color: var(--color-secondary);\n  color: var(--text-dark);\n}\n.btn--block {\n  width: 100%;\n  display: block;\n}\n.tracklist-section {\n  background-color: var(--bg-secondary);\n  border: 4px solid var(--border-color);\n  box-shadow: 6px 6px 0px #01131B;\n  padding: 1.5rem;\n}\n@media (max-width: 768px) {\n  .tracklist-section {\n    padding: 1rem;\n  }\n}\n.tracklist-section .section-title {\n  margin: 0 0 1rem 0;\n}\n.tracklist-section :deep(.track-item) {\n  display: grid;\n  grid-template-columns: 40px 1fr auto;\n  gap: 1rem;\n  align-items: center;\n  padding: 0.75rem;\n  border-bottom: 1px solid var(--border-color);\n  cursor: pointer;\n  transition: all 150ms ease-in-out;\n}\n.tracklist-section :deep(.track-item):last-child {\n  border-bottom: none;\n}\n.tracklist-section :deep(.track-item):hover {\n  background-color: var(--color-primary);\n  color: var(--text-dark);\n}\n@media (max-width: 768px) {\n  .tracklist-section :deep(.track-item) {\n    grid-template-columns: 30px 1fr auto;\n    gap: 0.5rem;\n    padding: 0.5rem;\n  }\n}\n.tracklist-section :deep(.track-item__number) {\n  font-size: 0.9375rem;\n  font-weight: 700;\n  color: var(--text-secondary);\n  text-align: center;\n  transition: color 150ms ease-in-out;\n}\n.tracklist-section :deep(.track-item__title) {\n  font-size: 0.9375rem;\n  font-weight: 600;\n  color: var(--text-primary);\n  transition: color 150ms ease-in-out;\n}\n.tracklist-section :deep(.track-item__duration) {\n  font-size: 0.875rem;\n  color: var(--text-secondary);\n  font-family: "Courier New", monospace;\n  transition: color 150ms ease-in-out;\n}\n/*# sourceMappingURL=detail.css.map */\n'] }]
  }], () => [{ type: ActivatedRoute }, { type: Router }, { type: ViewportScroller }], null);
})();
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(DetailComponent, { className: "DetailComponent", filePath: "src/app/pages/detail/detail.ts", lineNumber: 59 });
})();
export {
  DetailComponent
};
//# sourceMappingURL=chunk-7MFA2CER.js.map
