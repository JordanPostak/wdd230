document.addEventListener('DOMContentLoaded', function() {
    const dateElement = document.getElementById('date');

    const options = { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' };
    const currentDate = new Date().toLocaleDateString('en-US', options);

    dateElement.textContent = currentDate;

     const currentYear = new Date().getFullYear();

     const yearSpan = document.querySelector("#year");
 
     yearSpan.textContent = currentYear;
 
     const lastModified = document.lastModified;
 
     document.querySelector("#lastModified").innerHTML = "Last updated: " + lastModified;
})
