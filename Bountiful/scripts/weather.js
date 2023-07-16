// Select HTML elements in the document
const weatherIconElement = document.getElementById('weather-icon');
const conditionElement = document.getElementById('weather-condition');
const humidityElement = document.getElementById('humidity');
const forecastContainer = document.getElementById('forecast-container');

const apiKey = '15cceac47631850b455872b6c555a9ef';
const url = `https://api.openweathermap.org/data/2.5/weather?q=Carlsbad,us&appid=${apiKey}&units=imperial`;
const forecastUrl = `https://api.openweathermap.org/data/2.5/forecast?q=Carlsbad,us&appid=${apiKey}&units=imperial`;

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

        // Extract humidity data
        const humidity = data.main.humidity;
        humidityElement.textContent = humidity;

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

// Defined asynchronous function to fetch forecast data from the API
async function fetchForecast() {
    try {
      const forecastResponse = await fetch(forecastUrl);
      if (forecastResponse.ok) {
        const forecastData = await forecastResponse.json();
        console.log(forecastData);
  
        // Group forecast data by date
        const groupedForecast = {};
        for (const forecast of forecastData.list) {
          const date = forecast.dt_txt.split(' ')[0];
          if (!groupedForecast[date]) {
            groupedForecast[date] = [];
          }
          groupedForecast[date].push(forecast);
        }
  
        // Clear previous forecast data
        forecastContainer.innerHTML = '';
  
        // Keep track of the number of forecast days displayed
        let numForecastDaysDisplayed = 0;
  
        // Loop through the grouped forecast data and extract the relevant information
        for (const date in groupedForecast) {
          const forecastsForDate = groupedForecast[date];
  
          // Find the forecast data for 12:00 PM (assuming it is the forecast for the day)
          const forecastForDay = forecastsForDate.find(forecast => forecast.dt_txt.endsWith('12:00:00'));
  
          if (forecastForDay) {
            const forecastDay = new Date(forecastForDay.dt * 1000).toLocaleDateString('en-US', { weekday: 'short' });
            const forecastTemperature = Math.round(forecastForDay.main.temp);
            // Replace the incorrect icon code with the correct one for the day weather condition
            const forecastIconCode = forecastForDay.weather[0].icon;
            const forecastCondition = capitalizeFirstLetter(forecastForDay.weather[0].description);
  
            // Create elements for each forecast day
            const forecastElement = document.createElement('div');
            forecastElement.classList.add('forecast-day');
  
            forecastElement.innerHTML = `
            <h2>_ _ _ _ _ _ _ _ _</h2>
              <h2>${forecastDay}</h2>
              <img src="https://openweathermap.org/img/w/${forecastIconCode}.png" alt="Weather Icon">
              <p>${forecastTemperature}&deg;F</p>
              <p>${forecastCondition}</p>
            `;
  
            // Add the forecast element to the forecast container
            forecastContainer.appendChild(forecastElement);
  
            // Increment the count of forecast days displayed
            numForecastDaysDisplayed++;
  
            // Stop displaying forecast after 3 days
            if (numForecastDaysDisplayed === 3) {
              break;
            }
          }
        }
      } else {
        throw Error(await forecastResponse.text());
      }
    } catch (error) {
      console.log('An error occurred while fetching forecast data:', error);
    }
  }

apiFetch();
fetchForecast();  