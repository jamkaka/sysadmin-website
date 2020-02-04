////////////////
// SMOOTH SCROLLING
////////////////
$(".header__navigation a, header__slidedown-btn").click(function(event) {
  event.preventDefault();
  const headerHeight =
    $(".brand-logo").height() +
    parseInt(
      $(".header__navigation--opaque")
        .css("padding-top")
        .slice(0, -2)
    ) +
    parseInt(
      $(".header__navigation--opaque")
        .css("padding-bottom")
        .slice(0, -2)
    );

  if (this.hash !== "") {
    const hash = this.hash;
    $("html, body").animate(
      {
        scrollTop: $(hash).offset().top - headerHeight
      },
      800
    );
  }
});
////////////////
// ACCORDION
////////////////
let activeAccordionTab = null;
$(document).click(accordionHandler);

function accordionHandler(event) {
  // clicked DOM element
  const clickedElement = $(event.target);
  if (clickedElement.hasClass("accordion-toggler")) {
    // set properly clicked tab.
    const clickedAccordionTab = clickedElement.hasClass(
      "accordion__single__tab"
    )
      ? clickedElement
      : clickedElement.parent();
    // get proper content
    const clickedAccordionContent = clickedAccordionTab.siblings(0);
    if (activeAccordionTab === null) {
      clickedAccordionContent.slideDown();
      clickedAccordionTab.addClass("accordion__single__tab--is-active");
      activeAccordionTab = clickedAccordionTab;
    } else if (clickedAccordionTab[0] === activeAccordionTab[0]) {
      // slide down old content
      clickedAccordionContent.slideUp();
      clickedAccordionTab.removeClass("accordion__single__tab--is-active");
      // clean active accordion
      activeAccordionTab = null;
    } else {
      // slideup old content
      activeAccordionTab.siblings(0).slideUp();
      activeAccordionTab.removeClass("accordion__single__tab--is-active");
      // change active accordion
      activeAccordionTab = clickedAccordionTab;
      // slide down new content
      clickedAccordionContent.slideDown();
      clickedAccordionTab.addClass("accordion__single__tab--is-active");
    }
  }
}
////////////////
// CHANGE NAV OPACITY WHEN SCROLLING
////////////////
$(document).scroll(headerOpacityChanger);

function headerOpacityChanger(event) {
  const opaqueHeader = $(".header__navigation--opaque");
  const headerHeight = $(".header").outerHeight();

  const headerWrapper = $(".header__invisible-header-wrapper");
  // getting Y coordinates to begin changing opacity.
  const startAnimatingOpactity = $(".heading-secondary").offset().top;
  const scrollCount = document.documentElement.scrollTop;

  if (scrollCount > startAnimatingOpactity) {
    headerWrapper.fadeIn(300);
  } else {
    headerWrapper.fadeOut(300);
  }
}

////////////////
// MODAL SECTION
////////////////
const fixedNav = $(".header__navigation--opaque");
const websitePart = $(".full-website");
let activeModal = {};
let activeModalContent = {};

$(window).click(modalToggle);

function modalToggle(event) {
  // clicked DOM element
  const clickedElement = $(event.target);
  // display modal
  if (clickedElement.hasClass("modal-trigger")) {
    const modal = $(`#${clickedElement.attr("data-target")}`);
    const modalContent = $(
      `#${clickedElement.attr("data-target")} .modal__content`
    );
    [activeModal, activeModalContent] = [modal, modalContent];
    // styling part
    // hide nav
    fixedNav.slideUp();
    // blur background
    websitePart.css({ filter: "blur(4px)" });
    // show modal
    modal.css({ visibility: "visible", opacity: "1" });
    modalContent.css({ transform: "translate(-50%,-50%) scale(1)" });
  }
  // hide modal
  if (
    clickedElement.hasClass("modal") ||
    clickedElement.hasClass("modal__content__header__close-btn")
  ) {
    activeModal.css({ opacity: "0", visibility: "hidden" });
    activeModalContent.css({ transform: "translate(-50%,-50%) scale(0)" });
    websitePart.css({ filter: "" });
    fixedNav.delay(300).slideDown("slow");
  }
}

////////////////
// HAMBURGER MENU
////////////////
$(".header__hamburger-menu, .dropdown-menu__link").click(function() {
  $(".header__hamburger-menu").toggleClass("header__hamburger-menu--is-active");
  $(".dropdown-menu").slideToggle("slow");
});
