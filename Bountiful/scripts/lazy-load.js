

// Function to check if an element is in the viewport
function isInViewport(element) {
  const rect = element.getBoundingClientRect();
  return (
    rect.top >= 0 &&
    rect.left >= 0 &&
    rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
    rect.right <= (window.innerWidth || document.documentElement.clientWidth)
  );
}

// Function to load the high-resolution image
function loadHighResImage(image) {
  const highResSrc = image.dataset.src;
  if (highResSrc && !image.src) {
    image.src = highResSrc;
    image.classList.add('loaded');
  }
}

// Function to load the blurred background image
function loadBlurredBackground(element) {
  const blurredSrc = element.style.backgroundImage;
  if (blurredSrc) {
    element.style.backgroundImage = '';
    element.style.backgroundImage = blurredSrc;
    element.classList.add('loaded');
  }
}

// Function to handle lazy loading for images and blurred backgrounds
function lazyLoadImages() {
  const images = document.querySelectorAll('img[data-src]');
  const blurLoads = document.querySelectorAll('.blur-load:not(.loaded)');

  images.forEach((image) => {
    if (isInViewport(image)) {
      loadHighResImage(image);
    }
  });

  blurLoads.forEach((element) => {
    if (isInViewport(element)) {
      loadBlurredBackground(element);
    }
  });
}


// Call the lazyLoadImages function on page load and scroll
document.addEventListener('DOMContentLoaded', lazyLoadImages);
document.addEventListener('scroll', lazyLoadImages);