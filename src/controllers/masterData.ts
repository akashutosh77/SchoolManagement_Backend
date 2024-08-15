import { Request, Response, NextFunction } from "express";
import { db } from "../../db";
import sql from "mssql";

const getMasterData = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const schoolId = req.query.schoolId;
    const result = await db
      .request()
      .input("schoolId", sql.Int, schoolId)
      .execute("proc_getMasterData");
    res.send(result?.recordsets || []);
  } catch (error) {
    next({
      error,
      message: "function getMasterData Failed!!",
      page: "src/controllers/masterData.ts",
    });
  }
};

export { getMasterData };
