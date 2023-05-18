function displayBannerOnSpecificDays() {
    const banner = document.querySelector('.banner');
    const currentDate = new Date();
    const currentDay = currentDate.getDay();
  
    if (currentDay === 1 || currentDay === 2) {
      banner.style.display = 'block';
    } else {
      banner.style.display = 'none';
    }
  }
  
  // Call the function to display the banner on specific days
  displayBannerOnSpecificDays();