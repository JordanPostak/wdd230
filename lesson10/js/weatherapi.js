// select HTML elements in the document
const currentTemp = document.querySelector('#current-temp');
const weatherIcon = document.querySelector('#weather-icon');
const captionDesc = document.querySelector('figcaption');

const apiKey = '15cceac47631850b455872b6c555a9ef';
const url = `http://api.openweathermap.org/data/2.5/weather?q=Fairbanks,us&appid=${apiKey}`;

// defined asynchronous function to fetch data from the API
async function apiFetch() {
  try {
    const response = await fetch(url);
    if (response.ok) {
      const data = await response.json();
      console.log(data); 

      // Extract relevant information from the data object
      const temperatureKelvin = data.main.temp;
      const temperatureFahrenheit = convertKelvinToFahrenheit(temperatureKelvin);
      const weatherDescription = capitalizeWords(data.weather[0].description); // Capitalize the weather description
      const iconCode = data.weather[0].icon;

      // Update HTML elements with the retrieved data
      currentTemp.textContent = `${temperatureFahrenheit.toFixed(2)} °F`;
      weatherIcon.src = `https://openweathermap.org/img/w/${iconCode}.png`;
      captionDesc.textContent = weatherDescription;
    } else {
      throw Error(await response.text());
    }
  } catch (error) {
    console.log(error);
  }
}

function capitalizeWords(sentence) {
  const words = sentence.split(' ');
  const capitalizedWords = words.map(word => {
    const firstLetter = word.charAt(0).toUpperCase();
    const restOfWord = word.slice(1);
    return firstLetter + restOfWord;
  });
  return capitalizedWords.join(' ');
}

// Helper function to convert temperature from Kelvin to Fahrenheit
function convertKelvinToFahrenheit(temperatureKelvin) {
  return (temperatureKelvin - 273.15) * 9 / 5 + 32;
}

apiFetch();