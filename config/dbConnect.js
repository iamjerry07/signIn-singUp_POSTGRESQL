const { Pool } = require('pg');

// Replace these with your PostgreSQL credentials
const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'postgres',
  password: 'Jerryhubc',
  port: 5432, // PostgreSQL default port
});


module.exports = pool; 