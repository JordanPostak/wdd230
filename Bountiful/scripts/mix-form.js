// Add click event listener to each stacked post-it
const stackedPostits = document.querySelectorAll(".stacked");

stackedPostits.forEach(postit => {
  // Add focus event listener to input fields inside the post-it
  const inputs = postit.querySelectorAll("input, textarea");
  inputs.forEach(input => {
    input.addEventListener("focus", () => {
      inputHasFocus = true;
    });
    input.addEventListener("blur", () => {
      inputHasFocus = false;
    });
  });
});
