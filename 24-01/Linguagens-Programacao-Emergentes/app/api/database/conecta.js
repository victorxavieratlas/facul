import { Sequelize } from "sequelize";

export const sequelize = new Sequelize(
  'api_next_2024', 'root', 'password', {
  host: 'localhost',
  dialect: 'mysql',
  port: 3306
});