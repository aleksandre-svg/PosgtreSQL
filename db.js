require("dotenv").config();
const { Pool } = require("pg");

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  // If your DATABASE_URL uses 'postgres.railway.internal', set SSL to false
  // If it uses 'railway.proxy.rlwy.net', set SSL to { rejectUnauthorized: false }
  ssl: process.env.DATABASE_URL.includes("internal") 
       ? false 
       : { rejectUnauthorized: false },
});

module.exports = pool;