const blurDivs = document.querySelectorAll(".blur-load");

blurDivs.forEach((div) => {
  const img = div.querySelector("img");

  function loaded() {
    div.classList.add("loaded");
    setTimeout(() => {
      div.style.backgroundImage = "none";
    }, 200); // Adjust the delay (in milliseconds) to fit your needs
  }

  if (img.complete) {
    loaded();
  } else {
    img.addEventListener("load", loaded);
  }
});

const imagesToLoad = document.querySelectorAll("img[data-src]");

const imgOptions = {
  threshold: 1,
  rootMargin: "0px 0px 50px 0px",
};

const loadImages = (image) => {
  image.setAttribute("src", image.getAttribute("data-src"));
  image.onload = () => {
    image.removeAttribute("data-src");
    image.parentNode.classList.add("loaded");
  };
};

if ("IntersectionObserver" in window) {
  const imgObserver = new IntersectionObserver((items, observer) => {
    items.forEach((item) => {
      if (item.isIntersecting) {
        loadImages(item.target);
        observer.unobserve(item.target);
      }
    });
  }, imgOptions);

  imagesToLoad.forEach((img) => {
    imgObserver.observe(img);
  });
} else {
  imagesToLoad.forEach((img) => {
    loadImages(img);
  });
}