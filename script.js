'use strict';

const modal = document.querySelector('.modal');
const overlay = document.querySelector('.overlay');
const btnCloseModal = document.querySelector('.btn--close-modal');
const btnsOpenModal = document.querySelectorAll('.btn--show-modal');
const btnScrollTo = document.querySelector('.btn--scroll-to');
const section1 = document.querySelector('#section--1');

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

///////////////// DOM the Traversing ///////////////

const h1 = document.querySelector('h1');

// Going downwards: child.
// querySelector also works on elements
console.log(h1.querySelectorAll('.highlight'));
console.log(h1.childNodes);
console.log(h1.children); //This is better than childNodes

h1.firstElementChild.style.color = 'white';
h1.lastElementChild.style.color = 'rebeccapurple';

// Going upwards
console.log(h1.parentElement);
console.log(h1.parentNode);

h1.closest('.header').style.background = 'var(--gradient-secondary)';
h1.closest('h1').style.background = 'var(--gradient-primary)';

// Going sideways: siblings
console.log(h1.previousElementSibling);
console.log(h1.nextElementSibling);

console.log(h1.parentElement.children);

[...h1.parentElement.children].forEach(el => {
  if (el !== h1) {
    el.style.transform = 'scale(0.5)';
  }
});

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
