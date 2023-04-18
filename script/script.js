// Event listener, waits for the DOM content to be loaded before executing the following function
document.addEventListener('DOMContentLoaded', function() {

    // Creates a new Date object and retrieves the current year from it
    const currentYear = new Date().getFullYear();

    // Retrieves the HTML element with the ID "year" and stores it in the "yearSpan" variable
    const yearSpan = document.querySelector("#year");

    // Sets the text content of the "yearSpan" element to the current year retrieved earlier
    yearSpan.textContent = currentYear;

    // Retrieves the "lastModified" property of the document and stores it in the "lastModified" variable
    const lastModified = document.lastModified;

    // Retrieves the HTML element with the ID "lastModified" and sets its innerHTML to a string that says "Last updated: " followed by the date and time when the document was last modified
    document.querySelector("#lastModified").innerHTML = "Last updated: " + lastModified;
});

