// Get the spotlight view container
const spotlightView = document.getElementById('spotlightView');

// Retrieve the JSON data
fetch('data.json')
  .then(response => response.json())
  .then(data => {
    // Filter the businesses based on silver or gold status
    const silverGoldMembers = data.businesses.filter(member => member.membershipLevel === 'Silver' || member.membershipLevel === 'Gold');
    
    // Randomly select two members
    const selectedMembers = getRandomMembers(silverGoldMembers, 3);
    
    // Get the existing spotlight cards
    const spotlightCards = document.querySelectorAll('.spotlight-card');
    
    // Iterate over the existing cards and update them with dynamic content
    spotlightCards.forEach((card, index) => {
      const member = selectedMembers[index];
      const image = card.querySelector('img');
      const heading = card.querySelector('h3');
      const paragraph = card.querySelector('p');
      const link = card.querySelector('a');
      
      image.src = member.image;
      image.alt = member.name;
      heading.textContent = member.name;
      paragraph.innerHTML = `<strong>Membership Level:</strong> ${member.membershipLevel}<br>
                             <strong>Address:</strong> ${member.address}<br>
                             <strong>Phone:</strong> ${member.phone}<br>
                             <strong>Website:</strong><br> <a href="${member.website}" target="_blank">${member.website}</a>`;
    });
  })
  .catch(error => console.error(error));

// Function to randomly select members
function getRandomMembers(members, count) {
  const randomMembers = [];
  while (randomMembers.length < count) {
    const randomIndex = Math.floor(Math.random() * members.length);
    const member = members[randomIndex];
    if (!randomMembers.includes(member)) {
      randomMembers.push(member);
    }
  }
  return randomMembers;
}