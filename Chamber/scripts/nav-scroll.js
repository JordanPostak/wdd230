// Get the navbar element and other elements to hide/show
const navbar = document.getElementById("navbar");
const logo = document.querySelector(".navbar-logo");
const headerH1 = document.querySelector(".horizontal h1");
const headerH2 = document.querySelector(".horizontal h2");
const facebookLogo = document.querySelector(".facebook-logo");
const linkedinLogo = document.querySelector(".linkedin-logo");
const date = document.getElementById("date");
const banner = document.querySelector(".banner");

// Listen for the scroll event
window.addEventListener("scroll", function() {
  // Check if the user has scrolled past the top of the page
  if (window.pageYOffset > 0) {
    // Add a class to make the background clear
    navbar.classList.add("scrolled");
    // Add classes to hide elements
  } else {
    // Remove the classes if the user is at the top
    navbar.classList.remove("scrolled");
    // Remove classes to show elements
  }
});