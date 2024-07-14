import express from "express";
import dotenv from "dotenv";
import masterDataRouter from "./src/routes/masterData";
import {connectDatabase} from "./db"
import { errorHandlerMiddleware } from "./src/middleware/errorHandler";


dotenv.config();
const app = express();
const baseURL = process.env.BASE_URL
//const connectionString = process.env.DB_CONNECTION_STRING as string;


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

app.use(`${baseURL}/getMasterSchoolData`, masterDataRouter);
app.use(errorHandlerMiddleware)

export default app;
