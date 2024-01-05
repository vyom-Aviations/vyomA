// form.js

document.getElementById("myForm").addEventListener("submit", function(event) {
  event.preventDefault(); // Prevent form submission

  const formData = new FormData(this);

  fetch("/form", {
    method: "POST",
    body: formData
  })
  .then(response => response.text())
  .then(data => {
    console.log(data); // Log the response from the backend
  })
  .catch(error => {
    console.error("Error:", error);
  });
});