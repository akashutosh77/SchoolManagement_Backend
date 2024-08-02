import sql from "mssql";
import dotenv from "dotenv";

dotenv.config();


const config: sql.config = {
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  server: process.env.DB_SERVER || "",
  database: process.env.DB_NAME,
  options: {
    trustServerCertificate: true,
  },
};
const pool = new sql.ConnectionPool(config);

async function connectDatabase() {
  try {
    await pool.connect();
    console.log("Database connected successfully");
  } catch (error) {
    console.log("Connection failed:", error);
  }
}

export {pool as db, connectDatabase}