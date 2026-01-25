// scripts/fix-migrations.js
const mysql = require('mysql2/promise');
require('dotenv').config();

async function fixMigrations() {
  const connection = await mysql.createConnection({
    host: process.env.DB_HOST,
    port: process.env.DB_PORT || 3306,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    ssl: {
      rejectUnauthorized: false,
    },
  });

  try {
    console.log('Fixing migration records...');
    
    // Update .ts extensions to .js
    await connection.query(`
      UPDATE knex_migrations 
      SET name = REPLACE(name, '.ts', '.js')
      WHERE name LIKE '%.ts'
    `);
    
    console.log('Migration records fixed successfully!');
  } catch (error) {
    console.log('No migration table found yet, skipping fix...');
  } finally {
    await connection.end();
  }
}

fixMigrations().catch(console.error);