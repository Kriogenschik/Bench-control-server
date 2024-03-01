const Pool = require("pg").Pool;

const pool = new Pool({
  user: "postgres",
  password: "molchun",
  host: "localhost",
  port: 5432,
  database: "BenchDB",
});

module.exports = pool;
