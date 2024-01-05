const express = require('express');
const mysql = require('mysql');
const https = require('https');
const fs = require('fs');
const winston = require('winston');
const helmet = require('helmet');

const app = express();

require('dotenv').config(); // Load environment variables from .env file

const logger = winston.createLogger({
  level: 'info',
  format: winston.format.simple(),
  transports: [
    new winston.transports.Console(),
    new winston.transports.File({ filename: 'logs.log' })
  ]
});

const pool = mysql.createPool({
  connectionLimit: 10,
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE
});

pool.getConnection((error, connection) => {
  if (error) {
    logger.error('Error connecting to MySQL:', error);
    return;
  }

  logger.info('Connected to MySQL server');
  connection.release();
});

const rateLimit = require('express-rate-limit');

const limiter = rateLimit({
  windowMs: process.env.RATE_LIMIT_WINDOW_MS,
  max: process.env.RATE_LIMIT_MAX
});

app.use(limiter);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(helmet());

app.post('/form', (req, res) => {
  const { name, email, city, state, coordinates } = req.body;

  const query = `INSERT INTO users (name, email) VALUES (?, ?);
                 INSERT INTO addresses (city, state) VALUES (?, ?);
                 INSERT INTO locations (coordinates) VALUES (?);`;

  pool.getConnection((error, connection) => {
    if (error) {
      logger.error('Error getting connection from pool:', error);
      res.status(500).send('Internal Server Error');
      return;
    }

    connection.query(query, [name, email, city, state, coordinates], (error, results) => {
      connection.release();

      if (error) {
        logger.error('Error inserting form data into MySQL:', error);
        res.status(500).send('Error inserting form data into MySQL: ' + error.message);
        return;
      }

      res.send('Form data inserted successfully');
    });
  });
});

app.get('/api', (req, res) => {
  pool.getConnection((error, connection) => {
    if (error) {
      logger.error('Error getting connection from pool:', error);
      res.status(500).send('Internal Server Error');
      return;
    }

    connection.query('SELECT * FROM users', (error, results) => {
      connection.release();

      if (error) {
        logger.error('Error fetching users from MySQL:', error);
        res.status(500).send('Error fetching users from MySQL: ' + error.message);
        return;
      }

      res.json(results);
    });
  });
});

const options = {
  key: fs.readFileSync(process.env.PRIVATE_KEY_PATH),
  cert: fs.readFileSync(process.env.CERTIFICATE_PATH)
};

https.createServer(options, app).listen(3000, () => {
  logger.info('Server listening on port 3000');
});