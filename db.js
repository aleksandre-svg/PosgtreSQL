const { Pool } = require("pg");

const pool = new Pool({
  user: "postgres",
  host: "localhost",
  database: "users",
  password: "daviti55",
  port: 5432,
});

module.exports = pool;