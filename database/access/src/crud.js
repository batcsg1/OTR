import { pool } from "./db.js";

export const get = async (model) => {
    const db = await pool();
    try {
        const rows = await db.query(`SELECT * FROM ${model}`);
        console.log(rows);
        return rows;
    } catch (error) {
        console.log("Error retrieving data", error);
        return error;
    } finally {
        if (db) await db.end();
    }
}

await get('country');