const form = document.querySelector('form');

form.addEventListener('submit', (event) => {
  event.preventDefault();

const formData = {
  name: form.elements.name.value,
  email: form.elements.email.value,
  city: form.elements.city.value,
  state: form.elements.state.value,
  coordinates: form.elements.coordinates.value
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

