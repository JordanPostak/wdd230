var scrollToTopBtn = document.getElementById("scrollToTopBtn");
var rootElement = document.documentElement;

function handleScroll() {
  if (window.scrollY > 200) {
    scrollToTopBtn.classList.add("show");
  } else {
    scrollToTopBtn.classList.remove("show");
  }
}

function scrollToTop() {
  rootElement.scrollTo({
    top: 0,
    behavior: "smooth"
  });
}

window.addEventListener("scroll", handleScroll);
scrollToTopBtn.addEventListener("click", scrollToTop);