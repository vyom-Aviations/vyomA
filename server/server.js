const express = require('express');
const mysql = require('mysql');

const app = express();

require('dotenv').config(); // Load environment variables from .env file

const connection = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE
});

// Connect to the MySQL server
connection.connect((error) => {
  if (error) {
    console.error('Error connecting to MySQL:', error);
    return;
  }

  console.log('Connected to MySQL server');
});

const rateLimit = require('express-rate-limit');

// Create a rate limiter with a maximum of 100 requests per hour
const limiter = rateLimit({
  windowMs: 60 * 60 * 1000, // 1 hour
  max: 100
});

// Apply the rate limiter to all routes
app.use(limiter);

// Middleware to parse JSON-encoded bodies
app.use(express.json());

// Middleware to parse URL-encoded bodies
app.use(express.urlencoded({ extended: true }));

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
  // Fetch data from the database or perform other operations as needed
  // Example: Fetch users from the database
  connection.query('SELECT * FROM users', (error, results) => {
    if (error) {
      console.error('Error fetching users from MySQL:', error);
      res.status(500).send('Internal Server Error');
      return;
    }

    res.json(results);
  });
});

// Start the server
app.listen(3000, () => {
  console.log('Server listening on port 3000');
});