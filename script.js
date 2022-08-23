'use strict';

///////////////////////////////////////
// Modal window

const modal = document.querySelector('.modal');
const overlay = document.querySelector('.overlay');
const btnCloseModal = document.querySelector('.btn--close-modal');
const btnsOpenModal = document.querySelectorAll('.btn--show-modal');

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

// // Lectures //

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

const btnScrollTo = document.querySelector('.btn--scroll-to');
const section1 = document.querySelector('#section--1');

btnScrollTo.addEventListener('click', e => {
  const s1Coords = section1.getBoundingClientRect();

  // Scrolling
  // window.scrollTo({
  //   left: s1Coords.left + window.pageXOffset,
  //   top: s1Coords.top + window.pageYOffset,
  //   behavior: 'smooth',
  // });

  section1.scrollIntoView({ behavior: 'smooth' });
});
