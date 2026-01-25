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
    console.log('Dropping all tables...');
    
    // Drop all tables in the correct order (foreign keys first)
    await connection.query('DROP TABLE IF EXISTS transactions');
    await connection.query('DROP TABLE IF EXISTS wallets');
    await connection.query('DROP TABLE IF EXISTS users');
    await connection.query('DROP TABLE IF EXISTS knex_migrations_lock');
    await connection.query('DROP TABLE IF EXISTS knex_migrations');
    
    console.log('All tables dropped successfully! Migrations will recreate them.');
  } catch (error) {
    console.log('Error dropping tables:', error.message);
  } finally {
    await connection.end();
  }
}

fixMigrations().catch(console.error);