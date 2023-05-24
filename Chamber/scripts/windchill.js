// Get the temperature and wind speed values from the HTML document
var temperatureElement = document.getElementById("temperature");
var windSpeedElement = document.getElementById("wind-speed");

// Extract the values from the elements and convert them to numbers
var temperature = parseFloat(temperatureElement.innerText); // Use innerText instead of textContent
var windSpeed = parseFloat(windSpeedElement.innerText); // Use innerText instead of textContent

// Check if the input values meet the specification limits
if (temperature <= 50 && windSpeed > 3.0) {
  // Calculate the wind chill factor
  var windChill = 35.74 + (0.6215 * temperature) - (35.75 * Math.pow(windSpeed, 0.16)) + (0.4275 * temperature * Math.pow(windSpeed, 0.16));
  
  // Display the wind chill value in the HTML document
  var windChillElement = document.getElementById("wind-chill");
  windChillElement.innerText = windChill.toFixed(2) + "°F"; // Use innerText instead of textContent
} else {
  // Display "N/A" if the input values do not meet the requirements
  var windChillElement = document.getElementById("wind-chill");
  windChillElement.innerText = "N/A"; // Use innerText instead of textContent
}