function initializeCarousel(carouselElement) {
  const slides = carouselElement.querySelectorAll('.carousel-slide');
  let currentSlide = 0;

  function showSlide(index) {
    slides.forEach((slide) => {
      slide.classList.remove('active');
    });

    slides[index].classList.add('active');
  }

  function nextSlide() {
    currentSlide++;
    if (currentSlide >= slides.length) {
      currentSlide = 0;
    }
    showSlide(currentSlide);
  }

  // Change slide every 5 seconds (5000 milliseconds)
  setInterval(nextSlide, 5000);

  // Show the initial slide
  showSlide(currentSlide);
}

// Initialize carousels
const eventsCarousel = document.querySelector('.events-section');
initializeCarousel(eventsCarousel);

const anotherCarousel = document.querySelector('.news-section');
initializeCarousel(anotherCarousel);