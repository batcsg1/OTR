import mariadb from "mariadb";
import dotenv from "dotenv";
dotenv.config({ path: "../docker/.env" });

const config = {
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  user: process.env.DB_DATABASE_USER ?? "root",
  password: process.env.DB_ROOT_PASSWORD,
  database: process.env.DB_DATABASE_NAME,
};

export const pool = mariadb.createPool(config)


