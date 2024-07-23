import { Request, Response, NextFunction } from "express";
import { db } from "../../db";

const getMasterSchoolData = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const result = await db.query("EXEC proc_getMasterSchoolData");
    res.send(result?.recordsets || []);
  } catch (error) {
    next({
      error,
      message: "function getMasterSchoolData Failed!!",
      page: "src/controllers/masterData.ts",
    });
  }
};

export { getMasterSchoolData };
