import path from 'path';
import { Sequelize } from 'sequelize-typescript';
import config from '../config/config';

const env = process.env.NODE_ENV || 'development';
const dbConfig = (config as any)[env];
console.log(JSON.stringify(dbConfig, null,));
const sequelize = new Sequelize({
  ...dbConfig,
  models: [path.join(__dirname, '/*.model.ts')], // Automatically loads all models
});

export default sequelize;