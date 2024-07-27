import { Request, Response, NextFunction } from "express";
import { db } from "../../db";
import sql from "mssql";

const getLoginDetails = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const email = req.query.email;
    const password = req.query.password // Assuming email and password are passed in query param
    if (!email || !password) {
      return res
        .status(400)
        .send({ message: "Email and Password are required" });
    }
    const loginDetailsByEmail = await db
      .request()
      .input("email", sql.NVarChar, email)
      .execute("proc_getLoginDetailsByEmail");
    if (password === loginDetailsByEmail?.recordset[0]?.password) {
      return res.send(loginDetailsByEmail?.recordset || []);
    } else {
      return res.status(401).json({ message: "Invalid email or password" });
    }
  } catch (error) {
    next({
      error,
      message: "function getLoginDetails Failed!!",
      page: "src/controllers/login.ts",
    });
  }
};

const getLoginDetailsByEmail = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const email = req.query.email; // Assuming email is passed in query param

    if (!email) {
      return res.status(400).send({ message: "Email is required" });
    }

    const result = await db
      .request()
      .input("email", sql.NVarChar, email)
      .execute("proc_getLoginDetailsByEmail");
    res.send(result?.recordset || []);
  } catch (error) {
    next({
      error,
      message: "function getLoginDetailsByEmail Failed!!",
      page: "src/controllers/login.ts",
    });
  }
};

export { getLoginDetails, getLoginDetailsByEmail };
