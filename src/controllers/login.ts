import { Request, Response, NextFunction } from "express";
import { db } from "../../db";
import sql from 'mssql';

const getLoginDetails = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const  email = req.query.email;
    const  password = req.query.password; // Assuming email and password are passed in the request body
    if (!email || !password) {
      return res.status(400).send({ message: "Email and Password are required" });
    }

    const result = await db.request()
      .input('email', sql.NVarChar, email)
      .input('password', sql.NVarChar, password)
      .execute('proc_getLoginDetails');

    res.send(result?.recordset || []);
  } catch (error) {
    next({
      error,
      message: "function getLoginDetails Failed!!",
      page: "src/controllers/login.ts",
    });
  }
};

export { getLoginDetails };
