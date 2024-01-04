const container = document.querySelector(".container")
const coffees = [
  { name: "Fire-related disasters", image: "../public/images/fire.png" },
  { name: "Flood", image: "../public/images/flood.png" },
  { name: "Earthquake", image: "../public/images/earthquake.png" },
  { name: "Food Supplies", image: "../public/images/food.png" },
  { name: "Medical Emergency", image: "../public/images/medical.png" },
  { name: "All-In-One Supply", image: "../public/images/ain.png" },
]

const showCoffees = () => {
  let output = ""
  coffees.forEach(
    ({ name, image }) =>
      (output += `
              <div class="card">
                <img class="card--avatar" src=${image} />
                <h1 class="card--title">${name}</h1>
                <a class="card--link" href="../public/info.html">Contact</a>
              </div>
              `)
  )
  container.innerHTML = output
}

document.addEventListener("DOMContentLoaded", showCoffees)


if ("serviceWorker" in navigator) {
  window.addEventListener("load", function() {
    navigator.serviceWorker
      .register("/serviceWorker.js")
      .then(res => console.log("service worker registered"))
      .catch(err => console.log("service worker not registered", err))
  })
}