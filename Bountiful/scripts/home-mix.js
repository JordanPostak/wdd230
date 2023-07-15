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

// Add click event listener to each stacked post-it
const stackedPostits = document.querySelectorAll(".postit1.stacked, .postit2.stacked, .postit3.stacked, .postit4.stacked, .postit5.stacked, .postit6.stacked");
stackedPostits.forEach(postit => {
  postit.addEventListener("click", () => {
    // Toggle the "expanded" class on the clicked post-it
    postit.classList.toggle("expanded");

    // Collapse other post-its
    stackedPostits.forEach(p => {
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
    <h5>${mix.mixName}</h5>
    <h6>${mix.selectedFruits.join(", ")}</h6>
    <h7>Protein: ${mix.totalProtein.toFixed(2)} g, Fat: ${mix.totalFat.toFixed(2)} g, Sugar: ${mix.totalSugar.toFixed(2)} g, Calories: ${mix.totalCalories.toFixed(2)}</h7>
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

    // Add click event listener to each stacked post-it
    const stackedPostits = document.querySelectorAll(".stacked");
    stackedPostits.forEach(postit => {
    postit.addEventListener("click", () => {
        // Add or remove "unstacked" class
        postit.classList.toggle("unstacked");

        // Collapse other post-its
        stackedPostits.forEach(p => {
        if (p !== postit && p.classList.contains("unstacked")) {
            p.classList.add("stacked");
            p.classList.remove("unstacked");
        }
        });
    });
    });
});