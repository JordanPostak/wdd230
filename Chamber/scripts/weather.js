// Select HTML elements in the document
const weatherIconElement = document.getElementById('weather-icon');
const conditionElement = document.getElementById('weather-condition');

const apiKey = '15cceac47631850b455872b6c555a9ef';
const url = `https://api.openweathermap.org/data/2.5/weather?q=Sandpoint,us&appid=${apiKey}&units=imperial`;

// Defined asynchronous function to fetch data from the API
async function apiFetch() {
  try {
    const response = await fetch(url);
    if (response.ok) {
      const data = await response.json();
      console.log(data);

      // Extract relevant information from the data object
      const temperature = Math.round(data.main.temp);
      const windSpeed = Math.round(data.wind.speed);
      const iconCode = data.weather[0].icon;
      const condition = capitalizeFirstLetter(data.weather[0].description);

      // Update HTML elements with the retrieved data
      document.getElementById('temperature').innerHTML = `${temperature}&deg;F`;
      document.getElementById('wind-speed').textContent = windSpeed;
      conditionElement.textContent = condition;
      weatherIconElement.src = `https://openweathermap.org/img/w/${iconCode}.png`;
    } else {
      throw Error(await response.text()); 
    }
  } catch (error) {
    console.log('An error occurred while fetching weather data:', error);
  }
}

// Function to capitalize the first letter of each word
function capitalizeFirstLetter(string) {
  return string.replace(/\b\w/g, (match) => match.toUpperCase());
}

apiFetch(); 