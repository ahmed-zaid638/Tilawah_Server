// src/config/config.js
// This file will help when using sequelize-cli to generate migrations and seeders
const path = require('path');
const envPath = path.resolve(__dirname, `../../.env.${process.env.NODE_ENV || 'development'}`); // Adjust the path based on your structure
require('dotenv').config({ path: envPath });

const config = {
    development: {
        username: process.env.DB_USER || 'tilawah',
        password: process.env.DB_PASS || 'tilawah-pw',
        database: process.env.DB_NAME || 'tilawah',
        host: process.env.DB_HOST || '127.0.0.1',
        dialect: 'postgres',
    },
    production: {
        username: process.env.DB_USER || 'root',
        password: process.env.DB_PASS || '',
        database: process.env.DB_NAME || 'database_production',
        host: process.env.DB_HOST || '127.0.0.1',
        dialect: 'postgres',
    },
};

module.exports = config;
