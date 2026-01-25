import type { Knex } from 'knex';
import dotenv from 'dotenv';
import path from 'path';

dotenv.config();

const config: { [key: string]: Knex.Config } = {
  development: {
    client: 'mysql2',
    connection: {
      host: process.env.DB_HOST || 'localhost',
      port: parseInt(process.env.DB_PORT || '3306'),
      user: process.env.DB_USER || 'root',
      password: process.env.DB_PASSWORD || '',
      database: process.env.DB_NAME || 'lendsqr_wallet',
      ssl: process.env.DB_HOST?.includes('psdb.cloud') ? { rejectUnauthorized: true } : undefined,
    },
    migrations: {
      directory: path.join(__dirname, '../database/migrations'),
      extension: 'js',
       loadExtensions: ['.js'], 
      tableName: 'knex_migrations',
    },
    pool: {
      min: 2,
      max: 10,
    },
    acquireConnectionTimeout: 10000,
  },

  production: {
    client: 'mysql2',
    connection: {
      host: process.env.DB_HOST,
      port: parseInt(process.env.DB_PORT || '3306'),
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
     ssl: {
  rejectUnauthorized: false,
}
    },
    migrations: {
      directory: path.join(__dirname, '../database/migrations'),
      extension: 'js',
      loadExtensions: ['.js'],
      tableName: 'knex_migrations',
    },
    pool: {
      min: 2,
      max: 20,
    },
  },
};

export default config;