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
    console.log('Resetting migration records...');
    
    // Drop and recreate the migration tracking tables
    await connection.query('DROP TABLE IF EXISTS knex_migrations_lock');
    await connection.query('DROP TABLE IF EXISTS knex_migrations');
    
    console.log('Migration records reset successfully!');
  } catch (error) {
    console.log('Error resetting migrations:', error.message);
  } finally {
    await connection.end();
  }
}

fixMigrations().catch(console.error);