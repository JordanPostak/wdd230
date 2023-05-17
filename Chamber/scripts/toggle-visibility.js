// Function to toggle visibility of event cards
function toggleEventCards() {
    var eventCard1 = document.getElementById("eventCard1");
    var eventCard2 = document.getElementById("eventCard2");
    
    // Toggle visibility by adding/removing CSS class
    eventCard1.classList.toggle("hidden");
    eventCard2.classList.toggle("hidden");
  }
  
  // Set interval to toggle event cards every 5 seconds
  setInterval(toggleEventCards, 5000);