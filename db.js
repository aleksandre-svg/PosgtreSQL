require("dotenv").config();
const { Pool } = require("pg");

const pool = new Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  password: process.env.DB_PASSWORD,
  port: Number(process.env.DB_PORT),
  // Change this:
  ssl: false 
});

// Add this to catch errors before they crash the server
pool.on('error', (err) => {
  console.error('Unexpected error on idle client', err);
});

module.exports = pool;