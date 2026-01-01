import mariadb from "mariadb";
import dotenv from "dotenv";
dotenv.config({ path: "../docker/.env" });

export const connection = async () => {
    try {
        const db = await mariadb.createConnection({
            host: process.env.DB_HOST,
            port: process.env.DB_PORT,
            user: process.env.DB_DATABASE_USER ?? "root",
            password: process.env.DB_ROOT_PASSWORD,
            database: process.env.DB_DATABASE_NAME
        });
        console.log("Database connection established");
        return db;
    } catch (error) {
        console.log("Error connecting to the database:", error);
        return error;
    }
}

export const pool = async () => {
    try {
        const db = mariadb.createPool({
            host: process.env.DB_HOST,
            port: process.env.DB_PORT,
            user: process.env.DB_DATABASE_USER ?? "root",
            password: process.env.DB_ROOT_PASSWORD,
            database: process.env.DB_DATABASE_NAME
        });
        console.log("Database pool established");
        return db;
    } catch (error) {
        console.log("Error establishing pool to the database:", error);
        return error;
    }
}


