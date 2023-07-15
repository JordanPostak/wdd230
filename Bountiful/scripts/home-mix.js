const fruitDataUrl = "fruit-data.json";
const mixDataKey = "fruitMixes";
const specialtyDrinkCountKey = "specialtyDrinkCount";
const outputArea = document.getElementById("output-area");

// Function to update the specialty drink count and store it in local storage
function updateSpecialtyDrinkCount(count) {
  localStorage.setItem(specialtyDrinkCountKey, count.toString());
}

// Function to get the specialty drink count from local storage
function getSpecialtyDrinkCount() {
  const count = localStorage.getItem(specialtyDrinkCountKey);
  return count ? parseInt(count, 10) : 0;
}

// Populate fruit select options from JSON data
fetch(fruitDataUrl)
  .then(response => response.json())
  .then(data => {
    const fruitOptions = document.querySelectorAll(".fruit-option");
    data.forEach(fruit => {
      const option = document.createElement("option");
      option.value = fruit.name;
      option.textContent = fruit.name;
      fruitOptions.forEach(select => {
        select.appendChild(option.cloneNode(true));
      });
    });
  });

// Display the specialty drink count on the home page when the page loads
window.addEventListener("load", function () {
  const specialtyDrinkCount = getSpecialtyDrinkCount();
  // Update the information card with the specialty drink count
  const specialtyDrinkCountElement = document.getElementById("specialty-drink-count");
  specialtyDrinkCountElement.textContent = specialtyDrinkCount.toString();
});

// Function to generate post-it div for each mix with a random postit class
function generatePostIt(mix) {
  const postitClasses = ["postit1", "postit2", "postit3", "postit4", "postit5", "postit6"];
  const randomClass = postitClasses[Math.floor(Math.random() * postitClasses.length)];

  const mixContainer = document.createElement("div");
  mixContainer.classList.add(randomClass); // Add the randomly selected post-it class
  mixContainer.innerHTML = `
    <h5>${mix.mixName}</h5>
    <h6>${mix.selectedFruits.join(", ")}</h6>
  `;
  return mixContainer;
}

// Function to display the specialty drink count and mix data on the home page
function displayMixes() {
  const specialtyDrinkCount = getSpecialtyDrinkCount();
  const specialtyDrinkCountElement = document.getElementById("specialty-drink-count");
  specialtyDrinkCountElement.textContent = specialtyDrinkCount.toString();

  const mixData = JSON.parse(localStorage.getItem(mixDataKey)) || [];
  const mixesContainer = document.getElementById("mixes-container");

  mixData.forEach(mix => {
    const mixContainer = generatePostIt(mix);
    mixesContainer.appendChild(mixContainer);
  });
}

// Display the specialty drink count and mix data on the home page when the page loads
window.addEventListener("load", function () {
  displayMixes();
});