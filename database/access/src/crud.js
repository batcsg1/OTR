import { pool } from "./db.js";

export const create = async (model, data) => {
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
    const err = error?.sqlMessage
    console.error("Error creating record:", err);
    return err;
  } finally {
    if (conn) await conn.release();
  }
};

export const read = async (model, select = {}, where = {}) => {
  const conn = await pool.getConnection();

  try {
    
    // Build select clause
    const columns = Object.keys(select).filter(key => select[key]);
    const selectClause = columns.length > 0 ? columns.join(", ") : "*";

    // Build WHERE clause if provided
    let sql = `SELECT ${selectClause} FROM ${model}`;
    const values = [];

    if (Object.keys(where).length > 0) {
      const whereClause = Object.keys(where)
        .map(col => `${col} = ?`)
        .join(" AND ");
      sql += ` WHERE ${whereClause}`;
      values.push(...Object.values(where));
    }

    const data = await conn.query(sql, values);

    console.log(data);
    return data;
  } catch (error) {
    const err = error?.sqlMessage
    console.error("Error reading record:", err);
    return err;
  } finally {
    if (conn) await conn.release();
  }
};

export const update = async (model, where, data) => {
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
    const err = error?.sqlMessage
    console.error("Error updating record:", err);
    return err;
  } finally {
    if (conn) await conn.release();
  }
};

export const remove = async (model, where) => {
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
    const err = error?.sqlMessage
    console.error("Error deleting record:", err);
    return err;
  } finally {
    if (conn) await conn.release();
  }
}

// const country = {
//   data: {
//     name: "Canada Updated",
//   },
// };

// const { data } = country;

// await create("country", data);
const query = {
    select: { code: true},
    where: { code: 'CA'}
}

const { select, where } = query;

await read("country", select, where);

await remove("country", where)

// await update(
//   "country",
//   where,
//   data
// );
