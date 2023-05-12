document.addEventListener('DOMContentLoaded', function() {
    const dateElement = document.getElementById('date');

    const options = { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' };
    const currentDate = new Date().toLocaleDateString('en-US', options);

    dateElement.textContent = currentDate;
})