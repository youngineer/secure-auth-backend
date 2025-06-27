import { Sequelize } from "sequelize-typescript";
import path from "path";
import dotenv from "dotenv";

// Load environment variables from a .env file
dotenv.config();

const config = {
  env: process.env.NODE_ENV || "development",
  debug: process.env.APP_DEBUG === "true",
  port: parseInt(process.env.DB_PORT || "3000"),
  getDatabaseConfig: () => ({
    database: process.env.DB_NAME,
    username: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    host: process.env.DB_HOST,
    port: parseInt(process.env.DB_PORT || "3306"),
  }),
};

const sequelize = new Sequelize({
  ...config.getDatabaseConfig(),
  dialect: "mysql",
  models: [path.join(__dirname, "models")], 
});

export default sequelize;
