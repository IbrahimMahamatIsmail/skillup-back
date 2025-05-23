const { Pool } = require('pg');
require('dotenv').config();

const db = new Pool({
  user: process.env.PGUSER,
  host: process.env.PGHOST,
  database: process.env.PGDATABASE,
  password: process.env.PGPASSWORD,
  port: process.env.PGPORT,
  ssl: process.env.PGSSL === 'true' ? { rejectUnauthorized: false } : false
});
console.log('SkillUp Database PostgreSQL connected successfully on port', process.env.PGPORT);

module.exports = db;