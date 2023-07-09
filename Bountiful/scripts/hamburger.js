const hamburger = document.querySelector('.hamburger');
const navContainer = document.querySelector('.nav-closed');
const header = document.querySelector('header');
const mainSection = document.querySelector('main');
const footerSection = document.querySelector('footer');

hamburger.addEventListener('click', function() {
  this.classList.toggle('active');
  navContainer.classList.toggle('nav-open');
  mainSection.classList.toggle('main-up');
  footerSection.classList.toggle('footer-up');
});