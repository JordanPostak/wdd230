const fruitDataUrl = "fruit-data.json";
const outputArea = document.getElementById("output-area");
const submitBtn = document.getElementById("submit-btn");

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

      // Format and display output
      const currentDate = new Date().toLocaleDateString();
      const output = `
        <h2>Order Details:</h2>
        <p><strong>First Name:</strong> ${firstName}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Phone Number:</strong> ${phone}</p>
        <p><strong>Selected Fruits:</strong> ${selectedFruits.join(", ")}</p>
        <p><strong>Special Instructions:</strong> ${specialInstructions}</p>
        <h2>Nutrition Information:</h2>
        <p><strong>Total Carbohydrates:</strong> ${totalCarbohydrates.toFixed(2)} g</p>
        <p><strong>Total Protein:</strong> ${totalProtein.toFixed(2)} g</p>
        <p><strong>Total Fat:</strong> ${totalFat.toFixed(2)} g</p>
        <p><strong>Total Sugar:</strong> ${totalSugar.toFixed(2)} g</p>
        <p><strong>Total Calories:</strong> ${totalCalories.toFixed(2)}</p>
        <p><strong>Order Date:</strong> ${currentDate}</p>
      `;
      outputArea.innerHTML = output;
    });
});