import express from "express";
import dotenv from "dotenv";
import masterDataRouter from "./src/routes/masterData";
import {connectDatabase} from "./db"
import { errorHandlerMiddleware } from "./src/middleware/errorHandler";
import loginRouter from "./src/routes/login";
import attendanceRouter from "./src/routes/attendance/attendance";

const envFile = process.env.NODE_ENV === 'production' ? '.env.production' : '.env.local';
dotenv.config({ path: envFile });
const app = express();
const baseURL = process.env.BASE_URL



app.use(express.json());
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization"
  );
  res.setHeader(
    "Access-Control-Allow-Methods",
    "Get, POST, PATCH, PUT, DELETE, OPTIONS"
  );
  next();
});

// Establish database connection
connectDatabase();

app.use(`${baseURL}/getMasterData`, masterDataRouter);
app.use(`${baseURL}/getLoginDetails`, loginRouter);
app.use(`${baseURL}`, loginRouter);
app.use(`${baseURL}`, attendanceRouter);
app.use(errorHandlerMiddleware)

export default app;
