// Get the current year
const currentYear = new Date().getFullYear();

// code to display current year in footer
const yearSpan = document.querySelector('#year');
yearSpan.textContent = currentYear;

// code to display last modified date in footer
const lastModifiedSpan = document.querySelector('#lastModified');
const lastModified = new Date(document.lastModified);
const formattedDate = lastModified.toLocaleString();
lastModifiedSpan.textContent = formattedDate;

