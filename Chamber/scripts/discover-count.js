// Retrieve the current date and time
const currentDate = new Date();

// Retrieve the previous visit timestamp from local storage
const previousVisitTimestamp = localStorage.getItem('previousVisit');

if (previousVisitTimestamp) {
  // Calculate the time difference in milliseconds
  const timeDifference = currentDate - new Date(previousVisitTimestamp);

  // Convert the time difference to days and round to a whole number
  const daysBetweenVisits = Math.round(timeDifference / (1000 * 60 * 60 * 24));

  // Update the designated HTML element with the number of days between visits
  const daysBetweenVisitsElement = document.getElementById('days-between-visits');
  if (daysBetweenVisits === 0) {
    daysBetweenVisitsElement.textContent = `You last visited us today. Welcome back!`;
  } else {
    daysBetweenVisitsElement.textContent = `You last visited us ${daysBetweenVisits} days ago. Welcome back!`;
  }
}

// Store the current visit timestamp in local storage
localStorage.setItem('previousVisit', currentDate.toString());