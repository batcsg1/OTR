import { pool } from "./db.js";

class Database {
  constructor() {}

  create = async (model, data) => {
    const conn = await pool.getConnection();

    try {
      const columns = Object.keys(data);
      const values = Object.values(data);

      if (columns.length === 0) {
        console.log("No data provided for insert.");
        return;
      }

      const placeholders = columns.map(() => "?").join(", ");

      const sql = `
        INSERT INTO ${model} (${columns.join(", ")})
        VALUES (${placeholders})
      `;

      const insert = await conn.query(sql, values);

      console.log(insert);
      return insert;
    } catch (error) {
      const err = error?.sqlMessage;
      console.error("Error creating record:", err);
      return err;
    } finally {
      if (conn) await conn.release();
    }
  };

  read = async (model, options = {}) => {
    const conn = await pool.getConnection();

    try {
      const { select, where } = options;

      /* ---------- SELECT ---------- */
      const selectClause = select
        ? Object.keys(select)
            .filter((k) => select[k])
            .join(", ")
        : "*";

      let sql = `SELECT ${selectClause} FROM ${model}`;

      const values = [];

      /* ---------- WHERE ---------- */
      if (where && Object.keys(where).length) {
        const clauses = [];

        for (const [key, value] of Object.entries(where)) {
          console.log(key);
          console.log(value);

          if (value.equals) {
            clauses.push(`${key} = ?`);
            values.push(value.equals);
          }

          if (value.contains) {
            clauses.push(`${key} LIKE ?`);
            values.push(`%${value.contains}%`);
          }
        }

        sql += ` WHERE ${clauses.join(" AND ")}`;
      }

      const data = await conn.query(sql, values);
      console.log(data);
      return data;
    } catch (error) {
      console.error("Error reading record:", error);
      return error;
    } finally {
      if (conn) await conn.release();
    }
  };

  update = async (model, where, data) => {
    const conn = await pool.getConnection();

    try {
      // Build SET clause
      const setColumns = Object.keys(data);
      const setValues = Object.values(data);
      const setClause = setColumns.map((col) => `${col} = ?`).join(", ");

      // Build WHERE clause
      const whereColumns = Object.keys(where);
      const whereValues = Object.values(where);
      const whereClause = whereColumns.map((col) => `${col} = ?`).join(" AND ");

      const sql = `
        UPDATE ${model}
        SET ${setClause}
        WHERE ${whereClause}
      `;

      const update = await conn.query(sql, [...setValues, ...whereValues]);

      console.log("Update result:", update);

      return update;
    } catch (error) {
      const err = error?.sqlMessage;
      console.error("Error updating record:", err);
      return err;
    } finally {
      if (conn) await conn.release();
    }
  };

  remove = async (model, where) => {
    const conn = await pool.getConnection();

    try {
      // Build WHERE clause
      const whereColumns = Object.keys(where);
      const whereValues = Object.values(where);
      const whereClause = whereColumns.map((col) => `${col} = ?`).join(" AND ");

      const sql = `
        DELETE FROM ${model} 
        WHERE ${whereClause}
      `;

      const remove = await conn.query(sql, whereValues);

      console.log("Remove result:", remove);

      return remove;
    } catch (error) {
      const err = error?.sqlMessage;
      console.error("Error deleting record:", err);
      return err;
    } finally {
      if (conn) await conn.release();
    }
  };
}

export default Database;


