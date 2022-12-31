//////////////////////////////////////////////////////////////////
const currYear = document.querySelector(".current-year");
const header = document.querySelector(".header");
const navBtn = document.querySelector(".btn-mobile-nav");
const allLinks = document.querySelectorAll("a:link");
const sectionWhichObs = document.querySelector(".section-hero");

// Toggling navigation

navBtn.addEventListener("click", function () {
  header.classList.toggle("nav-open");
  // document.body.classList.toggle("stop-scrolling");
  if (header.classList.contains("nav-open")) disableScroll();
  else enableScroll();
});

//disable scrolling
function disableScroll() {
  // Get the current page scroll position
  scrollTop = window.pageYOffset || document.documentElement.scrollTop;
  (scrollLeft = window.pageXOffset || document.documentElement.scrollLeft),
    // if any scroll is attempted, set this to the previous value
    (window.onscroll = function () {
      window.scrollTo(scrollLeft, scrollTop);
    });
}
// Enable scrolling
function enableScroll() {
  window.onscroll = function () {};
}

//Adding Current year to footer

const year = new Date().getFullYear();
currYear.textContent = year;

//Adding smoothscroll on links beacuse smoothscroll css does not work on seferi
allLinks.forEach((link) => {
  link.addEventListener("click", function (e) {
    e.preventDefault();
    const href = link.getAttribute("href");

    if (href === "#") {
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    }

    if (href !== "#" && href.startsWith("#")) {
      const scrollEle = document.querySelector(href);
      scrollEle.scrollIntoView({ behavior: "smooth" });
    }

    //Close mobile navigation
    if (link.classList.contains("main-nav-link")) {
      header.classList.toggle("nav-open");
      if (header.classList.contains("nav-open")) disableScroll();
      else enableScroll();
    }
  });
});

//Sticky navigation

// const headerHeight = sectionWhichObs.getBoundingClientRect().height;
// console.log(headerHeight);

const headerCallback = function (entries) {
  const [entry] = entries;

  if (!entry.isIntersecting) {
    document.body.classList.add("sticky");
    // header.classList.add("sticky");
    // sectionWhichObs.style.marginTop = "8.6rem";
  } else {
    document.body.classList.remove("sticky");
    // header.classList.remove("sticky");
    // sectionWhichObs.style.marginTop = "0";
  }
};

headerOptions = {
  root: null,
  threshold: 0,
  rootMargin: `-${86}px`,
};

const headerObserver = new IntersectionObserver(headerCallback, headerOptions);

headerObserver.observe(sectionWhichObs);

///////////////////////////////////////////////////////////
// Fixing flexbox gap property missing in some Safari versions
function checkFlexGap() {
  var flex = document.createElement("div");
  flex.style.display = "flex";
  flex.style.flexDirection = "column";
  flex.style.rowGap = "1px";

  flex.appendChild(document.createElement("div"));
  flex.appendChild(document.createElement("div"));

  document.body.appendChild(flex);
  var isSupported = flex.scrollHeight === 1;
  flex.parentNode.removeChild(flex);
  // console.log(isSupported);

  if (!isSupported) document.body.classList.add("no-flexbox-gap");
}
checkFlexGap();

// https://unpkg.com/smoothscroll-polyfill@0.4.4/dist/smoothscroll.min.js
