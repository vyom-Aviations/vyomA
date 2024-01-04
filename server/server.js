const express = require('express');
const mysql = require('mysql');

const app = express();

// Create a MySQL connection
const connection = mysql.createConnection({
  host: 'localhost', // replace with your MySQL host
  user: 'root', // replace with your MySQL user
  password: 'mysqlkilo', // replace with your MySQL password
  database: 'vyom' // replace with your MySQL database name
});

// Connect to the MySQL server
connection.connect((error) => {
  if (error) {
    console.error('Error connecting to MySQL:', error);
    return;
  }

  console.log('Connected to MySQL server');
});

// Create an API endpoint to handle form submissions
app.post('/form', (req, res) => {
  const { name, email, city, state, coordinates } = req.body;

  // Insert the form data into the respective tables in MySQL
  const query = `INSERT INTO users (name, email) VALUES (?, ?);
                 INSERT INTO addresses (city, state) VALUES (?, ?);
                 INSERT INTO locations (coordinates) VALUES (?);`;

  connection.query(query, [name, email, city, state, coordinates], (error, results) => {
    if (error) {
      console.error('Error inserting form data into MySQL:', error);
      res.status(500).send('Internal Server Error');
      return;
    }

    res.send('Form data inserted successfully');
  });
});

// Create another API endpoint
app.get('/api', (req, res) => {
  res.json({ "users": ["userOne", "userTwo", "userThree"] });
});

// Start the server
app.listen(3000, () => {
  console.log('Server listening on port 3000');
});