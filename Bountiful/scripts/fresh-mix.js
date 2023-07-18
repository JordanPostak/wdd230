const dataUrl = "https://brotherblazzard.github.io/canvas-content/fruit.json";
const dataKey = "fruitMixes";
const drinkCountKey = "specialtyDrinkCount";
let inputHasFocus = false; // Flag to indicate whether any input field has focus

// Function to update the specialty drink count and store it in local storage
function updateSpecialtyDrinkCount(count) {
  localStorage.setItem(drinkCountKey, count.toString());
}

// Function to get the specialty drink count from local storage
function getSpecialtyDrinkCount() {
  const count = localStorage.getItem(drinkCountKey);
  return count ? parseInt(count, 10) : 0;
}

// Populate fruit select options from JSON data
fetch(dataUrl)
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

// Add click event listener to each stacked post-it
const stacked = document.querySelectorAll(".postit1.stacked, .postit2.stacked, .postit3.stacked, .postit4.stacked, .postit5.stacked, .postit6.stacked");
stacked.forEach(postit => {
  postit.addEventListener("click", () => {
    // Toggle the "expanded" class on the clicked post-it
    postit.classList.toggle("expanded");

    // Collapse other post-its
    stacked.forEach(p => {
      if (p !== postit && p.classList.contains("expanded")) {
        p.classList.remove("expanded");
      }
    });
  });
});

// Function to generate post-it div for each mix with a random postit class
function generatePostIt(mix) {
  const postitClasses = ["postit1", "postit2", "postit3", "postit4", "postit5", "postit6"];
  const randomClass = postitClasses[Math.floor(Math.random() * postitClasses.length)];

  const mixContainer = document.createElement("div");
  mixContainer.classList.add(randomClass, "stacked"); // Add the randomly selected post-it class and the "stacked" id
  mixContainer.innerHTML = `
  <div class="postit-top">
    <h5>${mix.mixName}</h5>
    <button class="add" style="visibility: hidden;">Add 1</button>
  </div>
  <h6>${mix.selectedFruits.join(", ")}</h6>
  <h7>${mix.totalProtein.toFixed(2)} g Protein, ${mix.totalFat.toFixed(2)} g Fat, ${mix.totalSugar.toFixed(2)} g Sugar, ${mix.totalCalories.toFixed(2)} Calories</h7>
`;
  return mixContainer;
}

// Function to display the specialty drink count and mix data on the fresh page
function displayMixes() {
  const specialtyDrinkCount = getSpecialtyDrinkCount();
  const specialtyDrinkCountElement = document.getElementById("specialty-drink-count");
  specialtyDrinkCountElement.textContent = specialtyDrinkCount.toString();

  const mixData = JSON.parse(localStorage.getItem(dataKey)) || [];
  console.log(mixData);
  const mixesContainer = document.getElementById("mixes-container");

  mixData.forEach(mix => {
    const mixContainer = generatePostIt(mix);
    mixesContainer.appendChild(mixContainer);
  });
}

// Display the specialty drink count and mix data on the home page when the page loads
window.addEventListener("load", function () {
  displayMixes();

      // Add click event listener to each stacked post-it
  const stacked = document.querySelectorAll(".stacked");
  stacked.forEach(postit => {
    postit.addEventListener("click", () => {

      if (inputHasFocus) {
        // If any input field has focus, don't toggle "unstacked" class
        return;
      }
      // Toggle the "unstacked" class on the clicked post-it
      postit.classList.toggle("unstacked");

      // Show or hide the "Add" button based on the "unstacked" class
      const addButton = postit.querySelector(".add");
      if (addButton) {
        addButton.style.visibility = postit.classList.contains("unstacked") ? "visible" : "hidden";
      }

      // Collapse other post-its and hide their "Add" buttons
      stacked.forEach(p => {
        if (p !== postit) {
          p.classList.add("stacked");
          p.classList.remove("unstacked");
          const otherAddButton = p.querySelector(".add");
          if (otherAddButton) {
            otherAddButton.style.visibility = "hidden";
          }
        }
      });
    });
  });
});