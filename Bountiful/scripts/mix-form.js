let inputHasFocus = false; // Flag to indicate whether any input field has focus

const stacked = document.querySelectorAll(".stacked");

stacked.forEach(postit => {
  // Add a click event listener to the input and textarea elements to stop event propagation
  const inputFields = postit.querySelectorAll("input, textarea");
  inputFields.forEach(input => {
    input.addEventListener("click", event => {
      event.stopPropagation();
      inputHasFocus = true; // Set the inputHasFocus flag to true when any input field is clicked
    });
  });

  postit.addEventListener("click", () => {
    if (inputHasFocus) {
      // If any input field has focus, don't toggle "unstacked" class
      inputHasFocus = false; // Reset the inputHasFocus flag when clicking outside the input fields
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
