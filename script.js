'use strict';

// Modal
const modal = document.querySelector('.modal');
const overlay = document.querySelector('.overlay');
const btnCloseModal = document.querySelector('.btn--close-modal');
const btnsOpenModal = document.querySelectorAll('.btn--show-modal');
const btnScrollTo = document.querySelector('.btn--scroll-to');
const section1 = document.querySelector('#section--1');

// Tabs
const tabsContainer = document.querySelector('.operations__tab-container');
const tabs = document.querySelectorAll('.operations__tab');
const tabsContent = document.querySelectorAll('.operations__content');

// Navs
const nav = document.querySelector('.nav');
///////////////////////////////////////
// Modal window

const openModal = function (e) {
  e.preventDefault();
  modal.classList.remove('hidden');
  overlay.classList.remove('hidden');
};

const closeModal = function () {
  modal.classList.add('hidden');
  overlay.classList.add('hidden');
};

btnsOpenModal.forEach(btn => btn.addEventListener('click', openModal));

// for (let i = 0; i < btnsOpenModal.length; i++)
//   btnsOpenModal[i].addEventListener('click', openModal);

btnCloseModal.addEventListener('click', closeModal);
overlay.addEventListener('click', closeModal);

document.addEventListener('keydown', function (e) {
  if (e.key === 'Escape' && !modal.classList.contains('hidden')) {
    closeModal();
  }
});

// ////////////////////
// Button scrolling

btnScrollTo.addEventListener('click', e => {
  // const s1Coords = section1.getBoundingClientRect();

  // Scrolling
  // window.scrollTo({
  //   left: s1Coords.left + window.pageXOffset,
  //   top: s1Coords.top + window.pageYOffset,
  //   behavior: 'smooth',
  // });

  section1.scrollIntoView({ behavior: 'smooth' });
});

//////// Page Navigation ////////

// document.querySelectorAll('.nav__link').forEach(el =>
//   el.addEventListener('click', function (e) {
//     e.preventDefault();
//     const id = this.getAttribute('href');
//     console.log(id);

//     // returned id will be a string
//     document.querySelector(id).scrollIntoView({ behavior: 'smooth' });
//   })
// );

// Add event listener to common parent element
// Determine what element originated the event

document.querySelector('.nav__links').addEventListener('click', function (e) {
  // console.log(e.target);
  e.preventDefault();

  //Matching strategy
  if (e.target.classList.contains('nav__link')) {
    //
    const id = e.target.getAttribute('href');
    // returned id will be a string
    document.querySelector(id).scrollIntoView({ behavior: 'smooth' });
  }
});

// //////// Tabbed components ///////////

// Use event delegation to listen on the tabs
tabsContainer.addEventListener('click', function (e) {
  e.preventDefault();

  // Matching
  const clicked = e.target.closest('.operations__tab');
  // console.log(clicked);

  if (!clicked) {
    return;
  }
  // Active tab
  tabs.forEach(tab => tab.classList.remove('operations__tab--active'));
  clicked.classList.add('operations__tab--active');

  // Activate content area

  tabsContent.forEach(content =>
    content.classList.remove('operations__content--active')
  );

  document
    .querySelector(`.operations__content--${clicked.dataset.tab}`)
    .classList.add('operations__content--active');
});

/////////// Menu fade animation ///////////
// Again, using event delegation
// mouseenter does not bubble, use mouseover

const handleHover = function (e) {
  // console.log(this);
  if (e.target.classList.contains('nav__link')) {
    const link = e.target;
    // console.log(link);
    const siblings = link.closest('.nav').querySelectorAll('.nav__link');
    // console.log(siblings);
    //  we can also use query selector on an element like siblings instead of document
    const logo = link.closest('.nav').querySelector('img');

    siblings.forEach(el => {
      if (el !== link) {
        el.style.opacity = this;
      }
      logo.style.opacity = this;
    });
  }
};

// nav.addEventListener('mouseover', e => handleHover(e, 0.5)); // re-written as below
nav.addEventListener('mouseover', handleHover.bind(0.5));

// nav.addEventListener('mouseover', e => handleHover(e, 1)); // re-written as below
nav.addEventListener('mouseout', handleHover.bind(1));

//////////// Sticky navigation: Intersection Observer API //////////////

// const observerCallback = function (entries, observer) {
//   entries.forEach(entry => {
//     console.log(entry);
//   });
// };

// const observerOptions = {
//   root: null,
//   threshold: [0, 0.2],
// };

// const observer = new IntersectionObserver(observerCallback, observerOptions);
// observer.observe(section1);

const header = document.querySelector('.header');
const navHeight = nav.getBoundingClientRect().height;
console.log(navHeight);

const stickyNav = function (entries) {
  const [entry] = entries;
  // console.log(entry);

  if (!entry.isIntersecting) {
    nav.classList.add('sticky');
  } else {
    nav.classList.remove('sticky');
  }
};

const headerObserver = new IntersectionObserver(stickyNav, {
  root: null,
  threshold: 0,
  rootMargin: `-${navHeight}px`,
  // rootMargin: '-90px', //height of the navi, not a good idea to have this hardcoded
}); // constructor function
headerObserver.observe(header);

///////////// REVEAL Hidden Sections /////////////

const allSections = document.querySelectorAll('.section');

const revealSection = function (entries, observer) {
  const [entry] = entries;
  // console.log(entry);

  if (!entry.isIntersecting) {
    return;
  }

  entry.target.classList.remove('section--hidden');
  observer.unobserve(entry.target);
};

const sectionObserver = new IntersectionObserver(revealSection, {
  root: null,
  threshold: [0.15],
});

allSections.forEach(function (section) {
  sectionObserver.observe(section);
  section.classList.add('section--hidden');
});

//////////// LAZY Loading Images ////////////
// Images sometimes load slower on webapages, and then affecting performance
// important that the images have a low resolution to work properly
// Lazy loading images could help with boosting performance

const imgTargets = document.querySelectorAll('img[data-src]');
// console.log(imgTargets);
const loadImg = function (entries, observer) {
  const [entry] = entries;
  // console.log(entry);

  if (!entry.isIntersecting) {
    return;
  }
  // replace src with data-src
  entry.target.src = entry.target.dataset.src;
  // once the original image has loaded, it will emit the load event
  // We can then listen for it and do something
  entry.target.addEventListener('load', () => {
    // remove the blur on the images after loading
    entry.target.classList.remove('lazy-img');
  });
};

const imgObserver = new IntersectionObserver(loadImg, {
  root: null,
  threshold: 0,
  rootMargin: '-200px',
});

imgTargets.forEach(img => imgObserver.observe(img));

// ///////////////// DOM the Traversing ///////////////

// const h1 = document.querySelector('h1');

// // Going downwards: child.
// // querySelector also works on elements
// console.log(h1.querySelectorAll('.highlight'));
// console.log(h1.childNodes);
// console.log(h1.children); //This is better than childNodes

// h1.firstElementChild.style.color = 'white';
// h1.lastElementChild.style.color = 'rebeccapurple';

// // Going upwards
// console.log(h1.parentElement);
// console.log(h1.parentNode);

// h1.closest('.header').style.background = 'var(--gradient-secondary)';
// h1.closest('h1').style.background = 'var(--gradient-primary)';

// // Going sideways: siblings
// console.log(h1.previousElementSibling);
// console.log(h1.nextElementSibling);

// console.log(h1.parentElement.children);

// [...h1.parentElement.children].forEach(el => {
//   if (el !== h1) {
//     el.style.transform = 'scale(0.5)';
//   }
// });

// // Lectures /////

// // console.log(document.getElementsByClassName('btn'));
// const message = document.createElement('div');

// message.classList.add('cookie-message');
// // message.textContent = 'We use cookies for improved functionality and analytics';

// message.innerHTML =
//   'We use cookies for improved functionality and analytics<button class="btn">Got it!</button>';

// const header = document.querySelector('.header');
// header.before(message);

// // styles
// message.style.backgroundColor = 'rebeccapurple';
// message.style.width = '100%';
// message.style.height =
//   Number.parseFloat(getComputedStyle(message).height) + 30 + 'px';

// // change setproperty
// document.documentElement.style.setProperty('--color-primary', 'orangered');

// // Attributes
// const logo = document.querySelector('.nav__logo');
// console.log(logo.src);
// console.log(logo.getAttribute('src'));
// logo.setAttribute('company', 'Bankist');
// console.log(logo);

// // Classes
// logo.classList.add('c', 'j'); //multiple classes
// logo.classList.remove('c', 'j'); //multiple classes
// logo.classList.toggle('c');
// logo.classList.contains('c');

// Random color generator
// // rgb(255, 255, 255);

// const randomNum = (min, max) =>
//   Math.trunc(Math.random() * (max - min + 1) + min);
// const randomColor = () =>
//   `rgb(${randomNum(0, 255)}, ${randomNum(0, 255)}, ${randomNum(0, 255)})`;
// // console.log(randomColor());

// document.querySelector('.nav__link').addEventListener('click', function (e) {
//   // Remember, the this keyword refers to the element on which the event handler is attached
//   // Remember not to use an arrow function for the this keyword.
//   this.style.backgroundColor = randomColor();
//   // console.log(randomColor());
// });

// document.querySelector('.nav__links').addEventListener('click', function (e) {
//   // Remember, the this keyword refers to the element on which the event handler is attached
//   // Remember not to use an arrow function for the this keyword.
//   this.style.backgroundColor = randomColor();
//   // console.log(randomColor());
// });
