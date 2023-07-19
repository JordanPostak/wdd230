

// Initialize cart object
let cart = JSON.parse(localStorage.getItem("cart")) || {};

// Function to save the cart data to local storage
function saveCart() {
  localStorage.setItem("cart", JSON.stringify(cart));
}

async function fetchFruitData() {
  try {
    const response = await fetch(fruitDataUrl);
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching fruit data:", error);
    return null;
  }
}

async function addToCart(itemId, quantity) {
  if (cart[itemId]) {
    // If the item is already in the cart, update the quantity
    cart[itemId] += quantity;
  } else {
    // If the item is not in the cart, add it with the given quantity
    cart[itemId] = quantity;
  }

  // Save the updated cart data
  saveCart();

  // Update the UI to show the cart contents
  displayCart();
}

async function getItemDetails(itemId) {
  const fruitData = await fetchFruitData();
  if (!fruitData) {
    console.error("Error fetching fruit data. Cannot get item details.");
    return null;
  }

  // First, try to find the item in the fruitData
  let itemDetails = fruitData.find((fruit) => fruit.id === parseInt(itemId, 10));

  // If not found in fruitData, try to find it in frozenMixes
  if (!itemDetails) {
    itemDetails = frozenMixes.find((mix) => mix.id === parseInt(itemId, 10));
  }

  // If still not found, try to find it in mixData (from local storage)
  if (!itemDetails) {
    const mixData = JSON.parse(localStorage.getItem(mixDataKey)) || [];
    itemDetails = mixData.find((mix) => mix.id === parseInt(itemId, 10));
  }

  return itemDetails;
}

function displayCart() {
  const cartOutputArea = document.querySelector(".cart-output-area");
  cartOutputArea.innerHTML = "";

  if (Object.keys(cart).length === 0) {
    // If the cart is empty, display a message
    cartOutputArea.innerHTML = "<p>Your cart is empty.</p>";
  } else {
    // If the cart has items, display each item and its quantity
    for (const itemId in cart) {
      const itemQuantity = cart[itemId];
      // Use the itemId to get the item details from the data (fruitData or frozenMixes)
      // Replace the following line with the correct logic based on your data structure
      const itemDetails = getItemDetails(itemId);

      if (itemDetails) {
        const cartItemDiv = document.createElement("div");
        cartItemDiv.classList.add("cart-item");
        cartItemDiv.innerHTML = `
          <h3>${itemDetails.name}</h3>
          <p>Quantity: ${itemQuantity}</p>
        `;
        cartOutputArea.appendChild(cartItemDiv);
      }
    }
  }
}

// Display the specialty drink count and mix data on the home page when the page loads
window.addEventListener("load", function () {
  displayMixes();
  displayCart(); // Call displayCart to show the cart contents on page load
});

// Function to add click event listeners to the buttons
function setupClickListeners() {
  // Click event listener for individual fruit add to cart button
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

  // Click event listener for frozen mix add to cart button
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
}

// Call the setupClickListeners function to add the click event listeners
setupClickListeners();