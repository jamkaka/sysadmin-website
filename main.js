/* smooth scrolling */
$(".header__navigation a").click(function(event) {
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

// const accordions = document.querySelectorAll(".accordion");
// const accordionContents = document.querySelectorAll(".accordion-content");
// let toggledAccordion = {};

// accordions.forEach(accordionItem => {
//   accordionItem.addEventListener("click", e => {

//     const clickedTab = e.target;
//     // add + sign
//     clickedTab.classList.add("is-open");
//     const clickedTabContent = clickedTab.nextElementSibling;

//     accordionContents.forEach(accordionContent => {
//       if (
//         accordionContent !== clickedTabContent ||
//         accordionContent === toggledAccordion.content
//       ) {
//         accordionContent.style.maxHeight = null;
//         if (accordionContent === toggledAccordion.content) {
//           toggledAccordion.tab.classList.remove("is-open");
//           toggledAccordion = {};
//         }
//       } else {
//         accordionContent.style.maxHeight = accordionContent.scrollHeight + "px";
//         toggledAccordion = {
//           tab: clickedTab,
//           content: clickedTabContent
//         };
//       }
//     });
//   });
// });
let activeAccordionTab = null;
document.addEventListener('click',accordionHandler);
// this in event handler is e.currentTarget but only if you create new function, not if you use a callback to listener.
function accordionHandler(e) {
  if(e.target.classList.contains('accordion-toggler')){
    // set properly clicked tab.
    const clickedAccordionTab = e.target.classList.contains('accordion__single__tab') ? e.target : e.target.parentElement;
    const iconToChange = clickedAccordionTab.firstElementChild;
    const clickedAccordionContent = clickedAccordionTab.nextElementSibling;
    // check if object empty
    if(activeAccordionTab === null) {
      activeAccordionTab = clickedAccordionTab;
      clickedAccordionContent.style.maxHeight = clickedAccordionContent.scrollHeight + "px";
      iconToChange.classList.add('toggler-icon--is-active');
    } else if(clickedAccordionTab === activeAccordionTab) {
      activeAccordionTab = null;
      clickedAccordionContent.style.maxHeight = "";
      iconToChange.classList.remove('toggler-icon--is-active');
    } else {
      activeAccordionTab.nextElementSibling.style.maxHeight="";
      // change icon
      activeAccordionTab.firstElementChild.classList.remove('toggler-icon--is-active');
      activeAccordionTab=clickedAccordionTab;
      clickedAccordionContent.style.maxHeight = clickedAccordionContent.scrollHeight + "px";
      iconToChange.classList.add('toggler-icon--is-active');
    }
  }
}




// accordionTabs.forEach((singleAccordionTab) => {
//   singleAccordionTab.addEventListener('click', (e)=> {
//     const adjacentAccordionContent = e.target.nextElementSibling;
//     console.log(adjacentAccordionContent.scrollHeight);
//     adjacentAccordionContent.style.maxHeight=adjacentAccordionContent.scrollHeight + "px";
//   })
// })

// need to use this function as offsetTop refers to the nearest positioned element -> offsetParent property.
// offsetParent property of relevant anchor element is div.
function offset(el) {
  var rect = el.getBoundingClientRect(),
  scrollLeft = window.pageXOffset || document.documentElement.scrollLeft,
  scrollTop = window.pageYOffset || document.documentElement.scrollTop;
  return { top: rect.top + scrollTop, left: rect.left + scrollLeft }
}


// change nav opacity when scrolling
document.addEventListener("scroll", e => {
  const opaqueHeader = document.querySelector(".header__navigation--opaque");
  const headerHeight = document.querySelector('.header').offsetHeight;
  const startAnimatingOpactity = offset(document.querySelector('#scroll-opacity-event-anchor')).top;
  const scrollCount = document.documentElement.scrollTop;
  if (scrollCount > startAnimatingOpactity) {
    opaqueHeader.style.visibility = "visible";
    opaqueHeader.style.opacity = (scrollCount - startAnimatingOpactity) / ((headerHeight-opaqueHeader.offsetHeight)-startAnimatingOpactity);
    scrollCount > headerHeight - opaqueHeader.offsetHeight ? opaqueHeader.style.opacity = 1: '';
  } else {
    opaqueHeader.style.opacity = "0";
    opaqueHeader.style.visibility = "hidden";
  }
});
////////////////
// MODAL SECTION
const fixedNav = document.querySelector(".header__navigation--opaque")
let activeModal = {};
let activeModalContent = {};

window.addEventListener("click", e => {
  // display modal
  if(e.target.classList.contains('modal-trigger')) {
    const modal = document.getElementById(e.target.dataset.target);
    const modalContent = document.querySelector(`#${e.target.dataset.target} .modal__content`);
    activeModal = modal;
    activeModalContent = modalContent;
    // styling part
    fixedNav.style.transform = "translateY(-5.9rem)"
    document.querySelector('.full-website').style.filter = "blur(4px)";
    modal.style.visibility = "visible";
    modal.style.opacity = "1";
    modalContent.style.transform = "translate(-50%,-50%) scale(1)";
  }
  // hide modal
  if (e.target.classList.contains("modal") || e.target.classList.contains('modal__content__header__close-btn')) {
    activeModalContent.style.transform = "translate(-50%,-50%) scale(0)";
    activeModal.style.opacity = "0";
    activeModal.style.visibility = "hidden";
    document.querySelector('.full-website').style.filter = "";
    fixedNav.style.transform = "translateY(0)"
  }
});


$(".header__hamburger-menu, .dropdown-menu__link").click(function() {
  $(".dropdown-menu").slideToggle("slow");
});
