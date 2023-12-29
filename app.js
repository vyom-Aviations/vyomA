const container = document.querySelector(".container");
const coffees = [
  { name: "Fire", image: "images/fire.png" },
  { name: "Flood", image: "images/flood.png" },
  { name: "Earthquake", image: "images/earthquake.png" },
  { name: "Medical Emergency", image: "images/medical.png" },
  { name: "Food/Famine Supplies", image: "images/food.png" },
  { name: "All-In-One Medical Kit", image: "images/ain.png" },
];
const showCoffees = () => {
  let output = "";
  coffees.forEach(
    ({ name, image }) =>
      (output += `
              <div class="card">
                <img class="card--avatar" src=${image} />
                <h1 class="card--title">${name}</h1>
                <a class="card--link" href="info.html">Contact</a>
              </div>
              `)
  );
  container.innerHTML = output;
};

document.addEventListener("DOMContentLoaded", showCoffees);
if ("serviceWorker" in navigator) {
  window.addEventListener("load", function () {
    navigator.serviceWorker
      .register("/serviceWorker.js")
      .then((res) => console.log("service worker registered"))
      .catch((err) => console.log("service worker not registered", err));
  });
}

