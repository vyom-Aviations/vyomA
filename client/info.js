document.addEventListener('DOMContentLoaded', function () {
  const form = document.getElementById('contactForm');
  const sendLocationCheckbox = document.getElementById('sendLocation');

  form.addEventListener('submit', function (event) {
    event.preventDefault();

    if (sendLocationCheckbox.checked) {
      // Get geolocation if checkbox is checked
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(function (position) {
          // Display location coordinates in a modal
          const modal = document.getElementById('locationModal');
          const latitudeElement = document.getElementById('latitude');
          const longitudeElement = document.getElementById('longitude');

          latitudeElement.textContent = 'Latitude: ' + position.coords.latitude;
          longitudeElement.textContent = 'Longitude: ' + position.coords.longitude;

          modal.style.display = 'block';

          // Append latitude and longitude to the form data
          const latitudeInput = document.createElement('input');
          latitudeInput.type = 'hidden';
          latitudeInput.name = 'latitude';
          latitudeInput.value = position.coords.latitude;

          const longitudeInput = document.createElement('input');
          longitudeInput.type = 'hidden';
          longitudeInput.name = 'longitude';
          longitudeInput.value = position.coords.longitude;

          form.appendChild(latitudeInput);
          form.appendChild(longitudeInput);

          // Submit the form with geolocation data
          form.submit();
        }, function (error) {
          console.error('Error getting geolocation:', error.message);
        });
      } else {
        console.error('Geolocation is not supported by this browser.');
      }
    } else {
      // If the checkbox is not checked, prevent form submission and redirect
      alert('Please check the "Send location to server" checkbox before submitting.');
      window.location.href = 'info.html'; // Redirect to another website
    }
  });
});
