const fruitDataUrl = "fruit-data.json";
const outputArea = document.getElementById("output-area");
const submitBtn = document.getElementById("submit-btn");

const mixDataKey = "fruitMixes"; 
const specialtyDrinkCountKey = "specialtyDrinkCount"; 

let requiredFields = [];

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

submitBtn.addEventListener("click", function() {
  // Get user input values
  const firstName = document.getElementById("first-name").value;
  const email = document.getElementById("email").value;
  const phone = document.getElementById("phone").value;
  const specialInstructions = document.getElementById("special-instructions").value;
  const selectedFruits = Array.from(document.querySelectorAll(".fruit-option")).map(select => select.value);
  const mixName = document.getElementById("mix-name").value;

// Clear the requiredFields array before checking each required field
requiredFields = [];

// Check if each required field is filled
if (!firstName) requiredFields.push("First Name");
if (!email) requiredFields.push("Email Address");
if (!phone) requiredFields.push("Phone Number");
if (selectedFruits.length === 0) requiredFields.push("Fruits");
if (!mixName) requiredFields.push("Mix Name");

// If there are required fields not filled, show a popup message with their names
if (requiredFields.length > 0) {
  const errorMessage = "Please fill in the remaining required fields:\n" + requiredFields.join("\n");
  alert(errorMessage);
  return;
}

// If all required fields are filled, apply the animation
submitBtn.classList.add("animated");
setTimeout(() => {
  submitBtn.classList.remove("animated");
}, 2000);

 // Scroll to the output area
 outputArea.scrollIntoView({ behavior: "smooth" });

  // Calculate total nutrition values
  let totalCarbohydrates = 0;
  let totalProtein = 0;
  let totalFat = 0;
  let totalSugar = 0;
  let totalCalories = 0;

  fetch(fruitDataUrl)
    .then(response => response.json())
    .then(data => {
      selectedFruits.forEach(selectedFruit => {
        const fruit = data.find(fruit => fruit.name === selectedFruit);
        if (fruit) {
          totalCarbohydrates += fruit.nutritions.carbohydrates;
          totalProtein += fruit.nutritions.protein;
          totalFat += fruit.nutritions.fat;
          totalSugar += fruit.nutritions.sugar;
          totalCalories += fruit.nutritions.calories;
        }
      });

      // Create an object to represent the mix
      const mix = {
        firstName,
        email,
        phone,
        selectedFruits,
        specialInstructions,
        totalCarbohydrates,
        totalProtein,
        totalFat,
        totalSugar,
        totalCalories,
        orderDate: new Date().toLocaleDateString(),
        mixName,
      };

      // Save the mix data to local storage
      let mixData = JSON.parse(localStorage.getItem(mixDataKey)) || [];
      mixData.push(mix);
      localStorage.setItem(mixDataKey, JSON.stringify(mixData));

      // Update the specialty drink count
      const specialtyDrinkCount = getSpecialtyDrinkCount();
      updateSpecialtyDrinkCount(specialtyDrinkCount + 1);

      // Format and display output to the output area on the fresh page
      const currentDate = new Date().toLocaleDateString();
      const output = `
        <h2>New Mix Details:</h2>
        <p><strong>Creation Date:</strong> ${currentDate}</p>
        <p><strong>First Name:</strong> ${firstName}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Phone Number:</strong> ${phone}</p>
        <h2>______________</h2>
        <h2>${mixName}</h2>
        <p><strong>Selected Fruits:</strong> ${selectedFruits.join(", ")}</p>
        <p><strong>Special Instructions:</strong> ${specialInstructions}</p>
        <h2>______________</h2>
        <h2>Nutrition Information:</h2>
        <p><strong>Total Carbohydrates:</strong> ${totalCarbohydrates.toFixed(2)} g</p>
        <p><strong>Total Protein:</strong> ${totalProtein.toFixed(2)} g</p>
        <p><strong>Total Fat:</strong> ${totalFat.toFixed(2)} g</p>
        <p><strong>Total Sugar:</strong> ${totalSugar.toFixed(2)} g</p>
        <p><strong>Total Calories:</strong> ${totalCalories.toFixed(2)}</p>
      `;
      outputArea.innerHTML = output;
    });
});





