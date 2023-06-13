const url = 'https://brotherblazzard.github.io/canvas-content/latter-day-prophets.json';
let prophetsData = []; // Store the fetched data globally
let isFilterActive = false; // Track the filter status

async function getProphetData() {
  const response = await fetch(url);
  const data = await response.json();
  prophetsData = data.prophets; // Store the fetched data
  displayProphets(prophetsData);
}

function displayProphets(prophets) {
  const cards = document.querySelector('div.cards');
  cards.innerHTML = ''; // Clear existing cards

  prophets.forEach(prophet => {
    if (!isFilterActive || (isFilterActive && parseInt(prophet.length) >= 10)) {
      let card = document.createElement('section');
      let h2 = document.createElement('h2');
      let portrait = document.createElement('img');
      let birthDate = document.createElement('p');
      let deathOrCurrentAge = document.createElement('p');
      let birthPlace = document.createElement('p');
      let numOfChildren = document.createElement('p');
      let lengthOfService = document.createElement('p');

      h2.textContent = `${prophet.name} ${prophet.lastname} - ${prophet.order}${getOrdinalNumber(prophet.order)} Latter-day President`;

      portrait.setAttribute('src', prophet.imageurl);
      portrait.setAttribute('alt', `Portrait of ${prophet.name} ${prophet.lastname}`);
      portrait.setAttribute('loading', 'lazy');
      portrait.setAttribute('width', '340');
      portrait.setAttribute('height', '440');

      birthDate.textContent = `Birth Date: ${prophet.birthdate}`;
      deathOrCurrentAge.textContent = prophet.death ? `Age at Death: ${getAgeAtDeath(prophet.birthdate, prophet.death)}` : `Current Age: ${getCurrentAge(prophet.birthdate)}`;
      birthPlace.textContent = `Birth Place: ${prophet.birthplace}`;
      numOfChildren.textContent = `Number of Children: ${prophet.numofchildren}`;
      lengthOfService.textContent = `Length of Service: ${prophet.length} years`;

      card.appendChild(h2);
      card.appendChild(portrait);
      card.appendChild(birthDate);
      card.appendChild(deathOrCurrentAge);
      card.appendChild(birthPlace);
      card.appendChild(numOfChildren);
      card.appendChild(lengthOfService);

      cards.appendChild(card);
    }
  });
}

const noFilterButton = document.getElementById('no-filter-button');
const overDecadeButton = document.getElementById('over-decade-button');

noFilterButton.addEventListener('click', () => {
  isFilterActive = false; // Turn off the filter
  noFilterButton.disabled = true; // Disable the button
  overDecadeButton.disabled = false; // Enable the button
  displayProphets(prophetsData);
});

overDecadeButton.addEventListener('click', () => {
  isFilterActive = true; // Turn on the filter
  noFilterButton.disabled = false; // Enable the button
  overDecadeButton.disabled = true; // Disable the button
  displayProphets(prophetsData);
});

function getOrdinalNumber(number) {
  const suffixes = ['th', 'st', 'nd', 'rd'];
  const suffix = number % 10 < 4 && (number % 100 < 10 || number % 100 >= 20) ? suffixes[number % 10] : suffixes[0];
  return suffix;
}

function getCurrentAge(birthdate) {
    const birthYear = new Date(birthdate).getFullYear();
    const currentYear = new Date().getFullYear();
    return currentYear - birthYear;
  }
  
  function getAgeAtDeath(birthdate, deathdate) {
    const birthYear = new Date(birthdate).getFullYear();
    const deathYear = new Date(deathdate).getFullYear();
    return deathYear - birthYear;
  }
  
  getProphetData();