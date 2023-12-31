import React, { useEffect } from "react";

const Coffees = () => {
  const coffees = [
    { name: "Fire", image: "images/fire.png" },
    { name: "Flood", image: "images/flood.png" },
    { name: "Earthquake", image: "images/earthquake.png" },
    { name: "Medical Emergency", image: "images/medical.png" },
    { name: "Food/Famine Supplies", image: "images/food.png" },
    { name: "All-In-One Medical Kit", image: "images/ain.png" },
  ];

  useEffect(() => {
    showCoffees();
  }, []);

  const showCoffees = () => {
    return coffees.map(({ name, image }) => (
      <div className="card">
        <img className="card--avatar" src={image} alt={name} />
        <h1 className="card--title">{name}</h1>
        <a className="card--link" href="info.html">
          Contact
        </a>
      </div>
    ));
  };

  return <div className="container">{showCoffees()}</div>;
};

export default Coffees;

function App() {

const [backendData, setBackendData] = useState([{}])

useEffect(() => {
  fetch('/api').then(
    response => response.json()
  ).then(
  data => {
    setBackendData(data)
  }
  )
}, [])}