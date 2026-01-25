"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const config = {
    development: {
        client: 'mysql2',
        connection: {
            host: process.env.DB_HOST || 'localhost',
            port: parseInt(process.env.DB_PORT || '3306'),
            user: process.env.DB_USER || 'root',
            password: process.env.DB_PASSWORD || '',
            database: process.env.DB_NAME || 'lendsqr_wallet',
        },
        migrations: {
            directory: './src/database/migrations',
            extension: 'ts',
        },
        pool: {
            min: 2,
            max: 10,
        },
    },
    production: {
        client: 'mysql2',
        connection: process.env.DATABASE_URL,
        migrations: {
            directory: './dist/database/migrations',
            extension: 'js',
        },
        pool: {
            min: 2,
            max: 10,
        },
    },
};
exports.default = config;
//# sourceMappingURL=knexfile.js.map