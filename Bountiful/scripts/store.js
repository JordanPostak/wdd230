document.addEventListener("DOMContentLoaded", function () {
    const mixDataKey = "fruitMixes";
  
    // Function to create individual fruit elements
    function createFruitOption(fruit) {
      const option = document.createElement("option");
      option.value = fruit.id;
      option.textContent = fruit.name;
      return option;
    }
  
    // Function to create frozen mix elements
    function createFrozenMixOption(mix) {
      const option = document.createElement("option");
      option.value = mix.id;
      option.textContent = mix.mixName;
      return option;
    }
  
    // Populate the individual fruits and frozen fruit mixes in the store
  const fruitDataUrl = "https://brotherblazzard.github.io/canvas-content/fruit.json";
  fetch(fruitDataUrl)
    .then(response => response.json())
    .then(data => {
        const fruitSelect = document.getElementById("fruit-item-info");
        const mixSelect = document.getElementById("mix-item");
        const customMixSelect = document.getElementById("mix-custom-item");
  
        data.forEach(fruit => {
          const fruitOption = createFruitOption(fruit);
          fruitSelect.appendChild(fruitOption);
        });
  
        const frozenMixes = [
            {
              id: 1,
              mixName: "Tropical Paradise",
              selectedFruits: ["Pineapple", "Mango", "Coconut"],
              specialInstructions: "Blend all fruits together with ice.",
              totalCarbohydrates: 35,
              totalProtein: 2,
              totalFat: 1,
              totalSugar: 28,
              totalCalories: 130
            },
            {
              id: 2,
              mixName: "Berry Blast",
              selectedFruits: ["Strawberry", "Blueberry", "Raspberry"],
              specialInstructions: "Blend all berries with yogurt and honey.",
              totalCarbohydrates: 25,
              totalProtein: 3,
              totalFat: 0.5,
              totalSugar: 22,
              totalCalories: 110
            },
            {
              id: 3,
              mixName: "Green Goddess",
              selectedFruits: ["Spinach", "Kiwi", "Green Apple"],
              specialInstructions: "Blend greens with fresh lime juice and water.",
              totalCarbohydrates: 20,
              totalProtein: 2.5,
              totalFat: 0.3,
              totalSugar: 18,
              totalCalories: 100
            },
            {
              id: 4,
              mixName: "Citrus Sunrise",
              selectedFruits: ["Orange", "Grapefruit", "Lemon"],
              specialInstructions: "Blend citrus fruits with a splash of orange juice.",
              totalCarbohydrates: 28,
              totalProtein: 1.8,
              totalFat: 0.2,
              totalSugar: 24,
              totalCalories: 115
            },
            {
              id: 5,
              mixName: "Minty Melon",
              selectedFruits: ["Watermelon", "Cantaloupe", "Honeydew"],
              specialInstructions: "Blend melons with fresh mint leaves and ice.",
              totalCarbohydrates: 32,
              totalProtein: 1.5,
              totalFat: 0.4,
              totalSugar: 26,
              totalCalories: 120
            }
          ];
  
        frozenMixes.forEach(mix => {
          const mixOption = createFrozenMixOption(mix);
          mixSelect.appendChild(mixOption);
        });
  
        // Function to generate individual fruit details
        function showFruitDetails(fruitId) {
          const fruit = data.find(item => item.id === parseInt(fruitId, 10));
          if (fruit) {
            const fruitDetails = document.querySelector(".fruit-item-details");
            fruitDetails.innerHTML = `
              <h2>${fruit.name}</h2>
              <p>Genus: ${fruit.genus}</p>
              <p>Family: ${fruit.family}</p>
              <p>Carbohydrates: ${fruit.nutritions.carbohydrates} g</p>
              <p>Protein: ${fruit.nutritions.protein} g</p>
              <p>Fat: ${fruit.nutritions.fat} g</p>
              <p>Sugar: ${fruit.nutritions.sugar} g</p>
              <p>Calories: ${fruit.nutritions.calories}</p>
              <button class="order-button" data-id="${fruit.id}">Add</button>
              <input type="number" min="1" value="1" class="quantity-input" />
            `;
          }
        }
  
        // Function to generate frozen mix details
      function showFrozenMixDetails(mixId) {
        const mix = frozenMixes.find(item => item.id === parseInt(mixId, 10));
        if (mix) {
          const mixDetails = document.querySelector(".frozen-item-details");
          mixDetails.innerHTML = `
            <h2>${mix.mixName}</h2>
            <p>Selected Fruits: ${mix.selectedFruits.join(", ")}</p>
            <p>Special Instructions: ${mix.specialInstructions}</p>
            <p>Total Carbohydrates: ${mix.totalCarbohydrates.toFixed(2)} g</p>
            <p>Total Protein: ${mix.totalProtein.toFixed(2)} g</p>
            <p>Total Fat: ${mix.totalFat.toFixed(2)} g</p>
            <p>Total Sugar: ${mix.totalSugar.toFixed(2)} g</p>
            <p>Total Calories: ${mix.totalCalories.toFixed(2)}</p>
            <button class="order-button" data-id="${mix.id}">Add</button>
            <input type="number" min="1" value="1" class="quantity-input" />
          `;
        }
      }

      // Event listener for individual fruit selection
      fruitSelect.addEventListener("change", function () {
        const selectedFruitId = this.value;
        showFruitDetails(selectedFruitId);
      });

      // Event listener for frozen mix selection
      mixSelect.addEventListener("change", function () {
        const selectedMixId = this.value;
        showFrozenMixDetails(selectedMixId);
      });

      // Event listener for adding items to the cart
      function addToCart(itemId, quantity) {
        // You can implement the cart functionality here.
        // For example, add the selected item and quantity to the cart object.
        // You can store the cart data in local storage or send it to a server.
        // You can also update the UI to show the items in the cart.
        console.log(`Added item with ID ${itemId} to the cart. Quantity: ${quantity}`);
      }

      // Event listener for individual fruit add to cart button
      document.querySelector(".fruit-items").addEventListener("click", function (event) {
        if (event.target.classList.contains("order-button")) {
          const selectedFruitId = event.target.dataset.id;
          const quantityInput = event.target.parentElement.querySelector(".quantity-input");
          const quantity = parseInt(quantityInput.value, 10);
          addToCart(selectedFruitId, quantity);
          // Clear the displayed details after adding to cart
          const fruitDetails = document.querySelector(".fruit-item-details");
          fruitDetails.innerHTML = "";
        }
      });

      // Event listener for frozen mix add to cart button
      document.querySelector(".frozen-mixes").addEventListener("click", function (event) {
        if (event.target.classList.contains("order-button")) {
          const selectedMixId = event.target.dataset.id;
          const quantityInput = event.target.parentElement.querySelector(".quantity-input");
          const quantity = parseInt(quantityInput.value, 10);
          addToCart(selectedMixId, quantity);
          // Clear the displayed details after adding to cart
          const mixDetails = document.querySelector(".frozen-item-details");
          mixDetails.innerHTML = "";
        }
      });
    })
    .catch(error => {
      console.error("Error fetching data:", error);
    });
});