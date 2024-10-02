// src/config/config.ts
export interface DbConfig {
  username: string;
  password: string;
  database: string;
  host: string;
  dialect: 'postgres';
  logging?: boolean;
}

interface Config {
  development: DbConfig;
  production: DbConfig;
}

const config: Config = {
  development: {
    username: process.env.DB_USER || 'default_dev_user',
    password: process.env.DB_PASS || 'default_dev_password',
    database: process.env.DB_NAME || 'default_dev_database',
    host: process.env.DB_HOST || 'localhost',
    dialect: 'postgres',
  },
  production: {
    username: process.env.DB_USER || 'default_prod_user',
    password: process.env.DB_PASS || 'default_prod_password',
    database: process.env.DB_NAME || 'default_prod_database',
    host: process.env.DB_HOST || 'your_prod_host',
    dialect: 'postgres',
    logging: false, // Disable logging in production
  },
};

export default config;
