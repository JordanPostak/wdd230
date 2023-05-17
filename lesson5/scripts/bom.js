// Get references to the input, button, and list elements
const input = document.getElementById('favchap');
const button = document.querySelector('button');
const list = document.getElementById('list');

// Add a click event listener to the Add Chapter button
button.addEventListener('click', function() {
  // Check if the input is not blank
  if (input.value.trim() !== '') {
    // Create an li element
    const li = document.createElement('li');

    // Create a delete button
    const deleteButton = document.createElement('button');
    deleteButton.textContent = '❌';
    deleteButton.classList.add('delete');

    // Set the li element's text content with the input value
    li.textContent = input.value;

    // Append the li element with the delete button
    li.appendChild(deleteButton);

    // Append the list element with the li element
    list.appendChild(li);

    // Add an event listener to the delete button
    deleteButton.addEventListener('click', function() {
      // Remove the li element when clicked
      list.removeChild(li);
    });

    // Reset the input value to an empty string
    input.value = '';

    // Send focus back to the input element
    input.focus();
  }
  
});