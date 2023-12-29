document.addEventListener('DOMContentLoaded', function () {
  const form = document.getElementById('contactForm');
  const sendLocationCheckbox = document.getElementById('sendLocation');

  form.addEventListener('submit', function (event) {
    event.preventDefault();

    if (sendLocationCheckbox.checked) {
      // Get geolocation if checkbox is checked
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(function (position) {
          // Print location coordinates to console
          console.log('Latitude:', position.coords.latitude);
          console.log('Longitude:', position.coords.longitude);

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
