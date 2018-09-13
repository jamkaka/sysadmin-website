////////////////
// SMOOTH SCROLLING
////////////////

// JQUERY
$(".header__navigation a, header__slidedown-btn").click(function(event) {
  // malo elegancki sposob, ale dziala -> wysokosc headera sie zmienia, bo strona jest responsywna, ale zamiast grzebac w css'ie i zmieniac style zeby odpowiednio dopasowac to dodam wysokosc najwyzszego elementu -> .brand-logo i paddingu-top/bottom nav'a.
  event.preventDefault();
  const headerHeight = $('.brand-logo').height() + parseInt($('.header__navigation--opaque').css('padding-top').slice(0,-2)) +  parseInt($('.header__navigation--opaque').css('padding-bottom').slice(0,-2));

  if (this.hash !== "") {
    const hash = this.hash;
    $("html, body").animate(
      {
        scrollTop: ($(hash).offset().top-headerHeight)
      },
      800
    );
  }
});

////////////////
// ACCORDION
////////////////

// VANILLA JS
// let activeAccordionTab = null;
// document.addEventListener('click',accordionHandler);
// // this in event handler is e.currentTarget but only if you create new function, not if you use a callback to listener.
// function accordionHandler(e) {
//   if(e.target.classList.contains('accordion-toggler')){
//     // set properly clicked tab.
//     const clickedAccordionTab = e.target.classList.contains('accordion__single__tab') ? e.target : e.target.parentElement;
//     const iconToChange = clickedAccordionTab.firstElementChild;
//     const clickedAccordionContent = clickedAccordionTab.nextElementSibling;
//     // check if object empty
//     if(activeAccordionTab === null) {
//       activeAccordionTab = clickedAccordionTab;
//       clickedAccordionContent.style.maxHeight = clickedAccordionContent.scrollHeight + "px";
//       iconToChange.classList.add('toggler-icon--is-active');
//     } else if(clickedAccordionTab === activeAccordionTab) {
//       activeAccordionTab = null;
//       clickedAccordionContent.style.maxHeight = "";
//       iconToChange.classList.remove('toggler-icon--is-active');
//     } else {
//       activeAccordionTab.nextElementSibling.style.maxHeight="";
//       // change icon
//       activeAccordionTab.firstElementChild.classList.remove('toggler-icon--is-active');
//       activeAccordionTab=clickedAccordionTab;
//       clickedAccordionContent.style.maxHeight = clickedAccordionContent.scrollHeight + "px";
//       iconToChange.classList.add('toggler-icon--is-active');
//     }
//   }
// }

// JQUERY
let activeAccordionTab = null;
$(document).click(accordionHandler);

function accordionHandler(event) {
  // clicked DOM element
  const clickedElement = $(event.target);
  if(clickedElement.hasClass('accordion-toggler')){
    // set properly clicked tab.
    const clickedAccordionTab = clickedElement.hasClass('accordion__single__tab') ? clickedElement : clickedElement.parent();
    // get proper content
    const clickedAccordionContent = clickedAccordionTab.siblings(0);  
    if(activeAccordionTab === null) {
      clickedAccordionContent.slideDown();
      clickedAccordionTab.addClass('accordion__single__tab--is-active');
      activeAccordionTab = clickedAccordionTab;
    } else if(clickedAccordionTab[0] === activeAccordionTab[0]) {
      // slide down old content
      clickedAccordionContent.slideUp();
      clickedAccordionTab.removeClass('accordion__single__tab--is-active');
      // clean active accordion
      activeAccordionTab = null;
    } else {
      // slideup old content
      activeAccordionTab.siblings(0).slideUp();
      activeAccordionTab.removeClass('accordion__single__tab--is-active'); 
      // change active accordion
      activeAccordionTab=clickedAccordionTab;
      // slide down new content
      clickedAccordionContent.slideDown();
      clickedAccordionTab.addClass('accordion__single__tab--is-active');
    }
  }
}


////////////////
// CHANGE NAV OPACITY WHEN SCROLLING
////////////////

// VANILLA JS
// need to use this function as offsetTop refers to the nearest positioned element -> offsetParent property.
// offsetParent property of relevant anchor element is div. 
// function offset(el) {
//   var rect = el.getBoundingClientRect(),
//   scrollLeft = window.pageXOffset || document.documentElement.scrollLeft,
//   scrollTop = window.pageYOffset || document.documentElement.scrollTop;
//   return { top: rect.top + scrollTop, left: rect.left + scrollLeft }
// }
// document.addEventListener("scroll", e => {
//   const opaqueHeader = document.querySelector(".header__navigation--opaque");
//   const headerHeight = document.querySelector('.header').offsetHeight;
//   const startAnimatingOpactity = offset(document.querySelector('.heading-secondary')).top;
//   const scrollCount = document.documentElement.scrollTop;
//   if (scrollCount > startAnimatingOpactity) {
//     opaqueHeader.style.visibility = "visible";
//     opaqueHeader.style.opacity = (scrollCount - startAnimatingOpactity) / ((headerHeight-opaqueHeader.offsetHeight)-startAnimatingOpactity);
//     scrollCount > headerHeight - opaqueHeader.offsetHeight ? opaqueHeader.style.opacity = 1: '';
//   } else {
//     opaqueHeader.style.opacity = "0";
//     opaqueHeader.style.visibility = "hidden";
//   }
// });

// JQUERY
$(document).scroll(headerOpacityChanger);
  
function headerOpacityChanger(event) {
  const opaqueHeader = $(".header__navigation--opaque");
  const headerHeight = $('.header').outerHeight();

  const headerWrapper = $('.header__invisible-header-wrapper');
  // getting Y coordinates to begin changing opacity.
  const startAnimatingOpactity = $('.heading-secondary').offset().top;
  const scrollCount = document.documentElement.scrollTop;

  if (scrollCount > startAnimatingOpactity) {
    console.log('imin');
    headerWrapper.fadeIn(300);
    // const opacityPercantage = (scrollCount - startAnimatingOpactity) / ((headerHeight-opaqueHeader.outerHeight())-startAnimatingOpactity); 
    // opaqueHeader.css({visibility: 'visible', opacity: opacityPercantage});
    // additional condition to keep opacity at 1. 
    // scrollCount > headerHeight - opaqueHeader.outerHeight() ? opaqueHeader.css({opacity: 1}): '';
  } else {
    headerWrapper.fadeOut(300);
  }
  // else {
  //   opaqueHeader.css({opacity: 0, visibility: 'hidden'});
  // }
}

////////////////
// MODAL SECTION
////////////////

// VANILLA JS
// const fixedNav = document.querySelector(".header__navigation--opaque")
// let activeModal = {};
// let activeModalContent = {};

// window.addEventListener("click", e => {
//   // display modal
//   if(e.target.classList.contains('modal-trigger')) {
//     const modal = document.getElementById(e.target.dataset.target);
//     const modalContent = document.querySelector(`#${e.target.dataset.target} .modal__content`);
//     activeModal = modal;
//     activeModalContent = modalContent;
//     // styling part
//     fixedNav.style.transform = "translateY(-5.9rem)"
//     document.querySelector('.full-website').style.filter = "blur(4px)";
//     modal.style.visibility = "visible";
//     modal.style.opacity = "1";
//     modalContent.style.transform = "translate(-50%,-50%) scale(1)";
//   }
//   // hide modal
//   if (e.target.classList.contains("modal") || e.target.classList.contains('modal__content__header__close-btn')) {
//     activeModalContent.style.transform = "translate(-50%,-50%) scale(0)";
//     activeModal.style.opacity = "0";
//     activeModal.style.visibility = "hidden";
//     document.querySelector('.full-website').style.filter = "";
//     fixedNav.style.transform = "translateY(0)"
//   }
// });

// JQUERY
const fixedNav = $('.header__navigation--opaque');
const websitePart = $('.full-website');
let activeModal = {};
let activeModalContent = {};

$(window).click(modalToggle);
  
function modalToggle(event) {
  // clicked DOM element
  const clickedElement = $(event.target);
  // display modal
  if(clickedElement.hasClass('modal-trigger')) {
    const modal = $(`#${clickedElement.attr('data-target')}`);
    const modalContent = $(`#${clickedElement.attr('data-target')} .modal__content`);
    [activeModal, activeModalContent] = [modal, modalContent];
    // styling part
    // hide nav
    fixedNav.slideUp();
    // blur background
    websitePart.css({filter: 'blur(4px)'});
    // show modal
    modal.css({visibility: 'visible', opacity: '1'})
    modalContent.css({transform: 'translate(-50%,-50%) scale(1)'})
  }
  // hide modal
  if (clickedElement.hasClass("modal") || clickedElement.hasClass('modal__content__header__close-btn')) {
    activeModal.css({opacity: '0', visibility: 'hidden'})
    activeModalContent.css({transform: 'translate(-50%,-50%) scale(0)'});
    websitePart.css({filter: ''});
    fixedNav.delay(300).slideDown("slow");
  }
}

////////////////
// HAMBURGER MENU
////////////////

// JQUERY
$(".header__hamburger-menu, .dropdown-menu__link").click(function() {
  $('.header__hamburger-menu').toggleClass('header__hamburger-menu--is-active');
  $('.dropdown-menu').slideToggle("slow");
});
