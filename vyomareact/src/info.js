const form = document.querySelector('#myForm');

form.addEventListener('submit', (event) => {
  event.preventDefault();

  const formData = {
    name: form.name.value,
    email: form.email.value,
    city: form.city.value,
    state: form.state.value,
    coordinates: form.coordinates.value
  };

  fetch('/form', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(formData)
  })
    .then(response => response.text())
    .then(data => {
      console.log(data); // Output: "Form data inserted successfully"
      // Do something with the response, such as displaying a success message to the user
    })
    .catch(error => {
      console.error('Error:', error);
      // Handle the error, such as displaying an error message to the user
    });
});