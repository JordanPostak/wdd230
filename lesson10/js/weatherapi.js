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

      // Capitalize each word of the weather description
      const capitalizedDesc = data.weather[0].description.split(' ').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');

      // Update the HTML elements with the data
      currentTemp.textContent = data.main.temp.toFixed(2);
      weatherIcon.setAttribute('src', `http://openweathermap.org/img/w/${data.weather[0].icon}.png`);
      captionDesc.textContent = capitalizedDesc;
    } else {
      throw Error(await response.text());
    }
  } catch (error) {
    console.log(error);
  }
}

apiFetch();